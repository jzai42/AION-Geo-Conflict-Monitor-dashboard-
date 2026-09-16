import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseOilFeedMode,
  formatOilKeyStatValue,
  parseYahooChartPayload,
  fetchOilFacts,
  resolveOilFactsForRun,
  applyOilFactsToPayload,
  parsePriorOilFromDataTs,
  parsePriorOilFromStore,
  factsFromPrior,
  buildOilFactPromptBlock,
  oilFactsToHistoryRecord,
  YAHOO_OIL_SYMBOLS,
} from "./oil-facts.mjs";
import { evaluateOilQuality, parseOilKeyStatValue } from "./oil-quality.mjs";

const SNAPSHOT_2026_09_15 = "WTI $70.10–$72.45 · Brent $73.80–$76.10";
const API_BAND = "WTI $104.23–$105.63 · Brent $107.51–$108.59";

function yahooFixture({ price, high, low, prev, symbol }) {
  return {
    chart: {
      result: [{
        meta: {
          symbol,
          regularMarketPrice: price,
          regularMarketDayHigh: high,
          regularMarketDayLow: low,
          chartPreviousClose: prev,
          regularMarketTime: 1_700_000_000,
        },
        timestamp: [1_700_000_000],
        indicators: { quote: [{ close: [prev, price], high: [high], low: [low] }] },
      }],
      error: null,
    },
  };
}

const WTI_OK = yahooFixture({ symbol: "CL=F", price: 104.86, high: 105.63, low: 104.23, prev: 105.83 });
const BRENT_OK = yahooFixture({ symbol: "BZ=F", price: 108.2, high: 108.59, low: 107.51, prev: 108.75 });

function mockFetch(table, { fail } = {}) {
  let calls = 0;
  const fetchImpl = async (url) => {
    calls += 1;
    if (fail) throw new Error("network down");
    const body = Object.entries(table).find(([k]) => String(url).includes(k))?.[1];
    if (!body) return { ok: false, status: 404, json: async () => ({}) };
    if (body instanceof Error) throw body;
    return { ok: true, status: 200, json: async () => body };
  };
  fetchImpl.calls = () => calls;
  return fetchImpl;
}

// 1) Flag default is off; unknown values do not enable the feed.
{
  assert.equal(parseOilFeedMode(undefined), "off");
  assert.equal(parseOilFeedMode(""), "off");
  assert.equal(parseOilFeedMode("bogus"), "off");
  assert.equal(parseOilFeedMode("ON"), "on");
  assert.equal(parseOilFeedMode("shadow"), "shadow");
}

// 2) Canonical keyStats[2] string from session range.
{
  const s = formatOilKeyStatValue({
    wti: { low: 104.23, high: 105.63, last: 104.86 },
    brent: { low: 107.51, high: 108.59, last: 108.2 },
  });
  assert.equal(s, API_BAND);
  assert.ok(parseOilKeyStatValue(s));
}

// 3) Yahoo chart parser uses day high/low + last.
{
  const wti = parseYahooChartPayload(WTI_OK, { symbol: "CL=F" });
  assert.equal(wti.last, 104.86);
  assert.equal(wti.low, 104.23);
  assert.equal(wti.high, 105.63);
  assert.equal(wti.prevClose, 105.83);
  assert.equal(parseYahooChartPayload({ chart: { result: [], error: { code: "Not Found" } } }), null);
}

// 4) fetchOilFacts mock OK.
{
  const fetchImpl = mockFetch({ "CL=F": WTI_OK, "BZ=F": BRENT_OK });
  const facts = await fetchOilFacts({ fetchImpl });
  assert.equal(facts.ok, true);
  assert.equal(facts.provider, "yahoo-chart");
  assert.equal(facts.keyStatValue, API_BAND);
  assert.equal(facts.wti.symbol, YAHOO_OIL_SYMBOLS.wti);
  assert.equal(facts.fromPrior, false);
}

// 5) fetchOilFacts mock fail.
{
  const fetchImpl = mockFetch({}, { fail: true });
  await assert.rejects(() => fetchOilFacts({ fetchImpl }), /network down/);
}

// 6) resolve: off never hits the network.
{
  const fetchImpl = mockFetch({ "CL=F": WTI_OK, "BZ=F": BRENT_OK });
  const r = await resolveOilFactsForRun({ mode: "off", fetchImpl });
  assert.equal(r.mode, "off");
  assert.equal(r.facts, null);
  assert.equal(fetchImpl.calls(), 0);
}

// 7) resolve: on + fetch fail + prior from score-history → inject prior, do not throw.
{
  const prior = parsePriorOilFromStore({
    latest: { oilPrice: { keyStatValue: SNAPSHOT_2026_09_15, wti: 72.45, brent: 76.1 } },
  });
  const r = await resolveOilFactsForRun({
    mode: "on",
    fetchImpl: mockFetch({}, { fail: true }),
    priorFromStore: prior,
  });
  assert.equal(r.fetchFailed, true);
  assert.equal(r.usedPrior, true);
  assert.equal(r.facts.fromPrior, true);
  assert.equal(r.facts.stale, true);
  assert.equal(r.facts.keyStatValue, SNAPSHOT_2026_09_15);
}

// 8) resolve: shadow + fetch fail does not inject prior (production prices unchanged).
{
  const r = await resolveOilFactsForRun({
    mode: "shadow",
    fetchImpl: mockFetch({}, { fail: true }),
    priorFromStore: { keyStatValue: SNAPSHOT_2026_09_15, source: "score-history" },
  });
  assert.equal(r.fetchFailed, true);
  assert.equal(r.usedPrior, false);
  assert.equal(r.facts, null);
}

// 9) Overwrite keyStats[2] on both languages; oil-quality gate still works on API band.
{
  const payload = {
    dataZh: {
      keyStats: [{}, {}, { value: SNAPSHOT_2026_09_15 }],
      riskFactors: [{}, {}, { evidence: "Reuters settle https://www.reuters.com/markets/commodities/oil-2026-09-16", sourceVerification: "confirmed" }],
    },
    dataEn: {
      keyStats: [{}, {}, { value: SNAPSHOT_2026_09_15 }],
      riskFactors: [{}, {}, {}],
    },
  };
  const facts = await fetchOilFacts({ fetchImpl: mockFetch({ "CL=F": WTI_OK, "BZ=F": BRENT_OK }) });
  const applied = applyOilFactsToPayload(payload, facts);
  assert.equal(applied.overwritten, true);
  assert.equal(applied.previous.zh, SNAPSHOT_2026_09_15);
  assert.equal(payload.dataZh.keyStats[2].value, API_BAND);
  assert.equal(payload.dataEn.keyStats[2].value, API_BAND);

  const live = evaluateOilQuality({
    keyStatValue: payload.dataZh.keyStats[2].value,
    energyScore: 4,
    markdown: "### 3）五维评分\n- **能源冲击：4** — 危机带。\n\n### 4）地缘冲突综合分\n",
    energyEvidence: payload.dataZh.riskFactors[2].evidence,
    webSources: [],
  });
  assert.equal(live.publish, "live");
  assert.equal(live.hardFail, false);
  assert.ok(live.implied.mid > 100);

  // Pre-overwrite $70s vs score 4 remains an abort (PR #1 gate unchanged).
  const abort = evaluateOilQuality({
    keyStatValue: SNAPSHOT_2026_09_15,
    energyScore: 4,
    energyEvidence: "no url",
    webSources: [],
  });
  assert.equal(abort.publish, "abort");
}

// 10) Prior from live data.ts snapshot (must parse whatever card is currently shipped).
{
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const src = readFileSync(path.join(repoRoot, "src/data.ts"), "utf8");
  const prior = parsePriorOilFromDataTs(src);
  assert.ok(prior, "parse data.ts oil card");
  assert.ok(prior.keyStatValue.startsWith("WTI $"), "canonical WTI card");
  assert.equal(prior.source, "data.ts");
  const facts = factsFromPrior(prior, new Error("HTTP 429"));
  assert.equal(facts.fromPrior, true);
  assert.match(facts.error, /429/);
}

// 11) Prompt: on+ok injects immutable Fact; on+fail injects prior / unverified; off/shadow empty.
{
  const ok = await resolveOilFactsForRun({
    mode: "on",
    fetchImpl: mockFetch({ "CL=F": WTI_OK, "BZ=F": BRENT_OK }),
  });
  const okBlock = buildOilFactPromptBlock(ok);
  assert.match(okBlock, /IMMUTABLE OIL FACTS/);
  assert.ok(okBlock.includes(API_BAND));

  const fail = await resolveOilFactsForRun({
    mode: "on",
    fetchImpl: mockFetch({}, { fail: true }),
    priorFromDataTs: { keyStatValue: SNAPSHOT_2026_09_15, source: "data.ts" },
  });
  const failBlock = buildOilFactPromptBlock(fail);
  assert.match(failBlock, /上一期收盘/);
  assert.match(failBlock, /unverified/);
  assert.match(failBlock, /禁止.*停止撰写/);

  assert.equal(buildOilFactPromptBlock({ mode: "shadow", facts: ok.facts }), "");
  assert.equal(buildOilFactPromptBlock({ mode: "off" }), "");
}

// 12) History record is compact and secret-free.
{
  const facts = await fetchOilFacts({ fetchImpl: mockFetch({ "CL=F": WTI_OK, "BZ=F": BRENT_OK }) });
  const rec = oilFactsToHistoryRecord(facts, "on", { fetchFailed: false });
  assert.equal(rec.provider, "yahoo-chart");
  assert.equal(rec.mode, "on");
  assert.equal(rec.ok, true);
  assert.equal(rec.keyStatValue, API_BAND);
  assert.equal(rec.stale, false);
}

console.log("oil-facts.test.mjs: all assertions passed");
