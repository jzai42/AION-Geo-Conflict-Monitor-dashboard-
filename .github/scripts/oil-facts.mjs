/**
 * Option A hybrid oil feed — deterministic prices, LLM narrative only.
 *
 * Concrete provider: Yahoo Finance unofficial v8 chart API
 *   WTI  CL=F  https://query1.finance.yahoo.com/v8/finance/chart/CL=F
 *   Brent BZ=F https://query1.finance.yahoo.com/v8/finance/chart/BZ=F
 *
 * Not a licensed market-data product. See PR body for ToS / GitHub Actions egress risk.
 * Feature flag AION_OIL_FEED=off|shadow|on (default off).
 */

import { parseOilKeyStatValue } from "./oil-quality.mjs";

export const OIL_FEED_MODES = Object.freeze(["off", "shadow", "on"]);
export const OIL_PROVIDER_ID = "yahoo-chart";
export const OIL_PROVIDER_LABEL = "Yahoo Finance v8 chart (unofficial, delayed NYMEX/ICE futures)";
export const YAHOO_CHART_HOSTS = Object.freeze([
  "https://query1.finance.yahoo.com",
  "https://query2.finance.yahoo.com",
]);
export const YAHOO_OIL_SYMBOLS = Object.freeze({ wti: "CL=F", brent: "BZ=F" });
export const YAHOO_CHART_UA = "Mozilla/5.0 (compatible; AION-oil-facts/1.0; research dashboard)";

function asFinite(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : null;
}

export function parseOilFeedMode(raw) {
  const v = String(raw ?? "off").trim().toLowerCase();
  if (v === "on" || v === "1" || v === "true" || v === "yes") return "on";
  if (v === "shadow") return "shadow";
  return "off";
}

export function formatUsd2(n) {
  const x = asFinite(n);
  if (x == null) return null;
  return x.toFixed(2);
}

export function formatOilKeyStatValue(facts) {
  const wti = facts?.wti;
  const brent = facts?.brent;
  const wtiLo = formatUsd2(wti?.low ?? wti?.last);
  const wtiHi = formatUsd2(wti?.high ?? wti?.last);
  const brentLo = formatUsd2(brent?.low ?? brent?.last);
  const brentHi = formatUsd2(brent?.high ?? brent?.last);
  if (!wtiLo || !wtiHi || !brentLo || !brentHi) return null;
  return `WTI $${wtiLo}–$${wtiHi} · Brent $${brentLo}–$${brentHi}`;
}

export function normalizeOilLeg(leg) {
  if (!leg || typeof leg !== "object") return null;
  const last = asFinite(leg.last) ?? asFinite(leg.close) ?? asFinite(leg.price);
  if (last == null || !(last > 0) || last > 400) return null;
  let low = asFinite(leg.low) ?? last;
  let high = asFinite(leg.high) ?? last;
  if (low > high) [low, high] = [high, low];
  if (last < low) low = last;
  if (last > high) high = last;
  if (!(low > 0) || high > 400) return null;
  return {
    last,
    low,
    high,
    prevClose: asFinite(leg.prevClose) ?? asFinite(leg.previousClose),
    symbol: typeof leg.symbol === "string" ? leg.symbol : undefined,
  };
}

/** Parse Yahoo v8 chart JSON into a single WTI/Brent leg. */
export function parseYahooChartPayload(json, { symbol } = {}) {
  const err = json?.chart?.error;
  if (err) return null;
  const result = json?.chart?.result?.[0];
  if (!result) return null;
  const meta = result.meta || {};
  const quote = result.indicators?.quote?.[0] || {};
  const lastClose = Array.isArray(quote.close) ? quote.close.filter((n) => Number.isFinite(Number(n))).at(-1) : null;
  const lastHigh = Array.isArray(quote.high) ? quote.high.filter((n) => Number.isFinite(Number(n))).at(-1) : null;
  const lastLow = Array.isArray(quote.low) ? quote.low.filter((n) => Number.isFinite(Number(n))).at(-1) : null;
  const prevBar = Array.isArray(quote.close)
    ? quote.close.filter((n) => Number.isFinite(Number(n))).at(-2)
    : null;
  return normalizeOilLeg({
    symbol: meta.symbol || symbol,
    last: asFinite(meta.regularMarketPrice) ?? asFinite(lastClose),
    high: asFinite(meta.regularMarketDayHigh) ?? asFinite(lastHigh),
    low: asFinite(meta.regularMarketDayLow) ?? asFinite(lastLow),
    prevClose: asFinite(meta.previousClose) ?? asFinite(prevBar) ?? asFinite(meta.chartPreviousClose),
  });
}

export function yahooChartUrl(host, symbol) {
  // Keep CL=F / BZ=F unencoded — Yahoo's chart path uses a literal '='.
  return `${host}/v8/finance/chart/${symbol}?interval=1d&range=5d`;
}

async function fetchJson(url, { fetchImpl = fetch, timeoutMs = 10000, headers } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, {
      signal: ac.signal,
      headers: {
        "User-Agent": YAHOO_CHART_UA,
        Accept: "application/json",
        ...(headers || {}),
      },
    });
    if (!res?.ok) {
      throw new Error(`HTTP ${res?.status ?? "?"} ${url}`);
    }
    if (typeof res.json === "function") return await res.json();
    const text = typeof res.text === "function" ? await res.text() : "";
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchYahooLeg(symbol, opts = {}) {
  let lastErr;
  const hosts = opts.hosts || YAHOO_CHART_HOSTS;
  for (const host of hosts) {
    const url = yahooChartUrl(host, symbol);
    try {
      const json = await fetchJson(url, opts);
      const parsed = parseYahooChartPayload(json, { symbol });
      if (parsed) return { ...parsed, symbol, url };
      lastErr = new Error(`unparseable yahoo chart for ${symbol} at ${url}`);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(`yahoo fetch failed for ${symbol}`);
}

export async function fetchOilFacts(opts = {}) {
  const [wtiRaw, brentRaw] = await Promise.all([
    fetchYahooLeg(YAHOO_OIL_SYMBOLS.wti, opts),
    fetchYahooLeg(YAHOO_OIL_SYMBOLS.brent, opts),
  ]);
  const wti = normalizeOilLeg(wtiRaw);
  const brent = normalizeOilLeg(brentRaw);
  if (!wti || !brent) throw new Error("yahoo chart missing WTI or Brent leg");
  const facts = {
    ok: true,
    provider: OIL_PROVIDER_ID,
    providerLabel: OIL_PROVIDER_LABEL,
    wti: { ...wti, symbol: YAHOO_OIL_SYMBOLS.wti },
    brent: { ...brent, symbol: YAHOO_OIL_SYMBOLS.brent },
    asOfUnix: asFinite(wtiRaw.asOfUnix) ?? asFinite(brentRaw.asOfUnix),
    sourceUrls: [wtiRaw.url, brentRaw.url].filter(Boolean),
    stale: false,
    fromPrior: false,
  };
  facts.keyStatValue = formatOilKeyStatValue(facts);
  if (!facts.keyStatValue) throw new Error("failed to format oil keyStat value");
  facts.asOfIso = new Date().toISOString();
  return facts;
}

export function parsePriorOilFromStore(store) {
  const o = store?.latest?.oilPrice;
  if (!o || typeof o !== "object") return null;
  if (o.keyStatValue && parseOilKeyStatValue(o.keyStatValue)) {
    const parsed = parseOilKeyStatValue(o.keyStatValue);
    return {
      keyStatValue: o.keyStatValue,
      wti: parsed.wti.high,
      brent: parsed.brent.high,
      wtiLow: parsed.wti.low,
      wtiHigh: parsed.wti.high,
      brentLow: parsed.brent.low,
      brentHigh: parsed.brent.high,
      updatedAt: o.updatedAt || o.asOfIso,
      source: "score-history",
    };
  }
  const wtiLast = asFinite(o.wti);
  const brentLast = asFinite(o.brent);
  if (!(wtiLast > 0) && !(brentLast > 0)) return null;
  const wti = normalizeOilLeg({
    last: wtiLast || brentLast,
    low: asFinite(o.wtiLow) ?? wtiLast,
    high: asFinite(o.wtiHigh) ?? wtiLast,
  });
  const brent = normalizeOilLeg({
    last: brentLast || wtiLast,
    low: asFinite(o.brentLow) ?? brentLast,
    high: asFinite(o.brentHigh) ?? brentLast,
  });
  if (!wti || !brent) return null;
  return {
    keyStatValue: formatOilKeyStatValue({ wti, brent }),
    wti: wti.last,
    brent: brent.last,
    wtiLow: wti.low,
    wtiHigh: wti.high,
    brentLow: brent.low,
    brentHigh: brent.high,
    updatedAt: o.updatedAt || o.asOfIso,
    source: "score-history",
  };
}

/** First `WTI $…` keyStats value in generated `src/data.ts`. */
export function parsePriorOilFromDataTs(source) {
  const text = typeof source === "string" ? source : "";
  const matches = [...text.matchAll(/value:\s*"(WTI \$[^"]+)"/g)];
  if (!matches.length) return null;
  const keyStatValue = matches[0][1];
  const parsed = parseOilKeyStatValue(keyStatValue);
  if (!parsed) return null;
  return {
    keyStatValue,
    wti: parsed.wti.high,
    brent: parsed.brent.high,
    wtiLow: parsed.wti.low,
    wtiHigh: parsed.wti.high,
    brentLow: parsed.brent.low,
    brentHigh: parsed.brent.high,
    source: "data.ts",
  };
}

export function factsFromPrior(prior, err) {
  if (!prior) return null;
  const parsed = parseOilKeyStatValue(prior.keyStatValue);
  const wti = parsed
    ? { last: parsed.wti.high, low: parsed.wti.low, high: parsed.wti.high }
    : normalizeOilLeg({
      last: prior.wti,
      low: prior.wtiLow ?? prior.wti,
      high: prior.wtiHigh ?? prior.wti,
    });
  const brent = parsed
    ? { last: parsed.brent.high, low: parsed.brent.low, high: parsed.brent.high }
    : normalizeOilLeg({
      last: prior.brent,
      low: prior.brentLow ?? prior.brent,
      high: prior.brentHigh ?? prior.brent,
    });
  if (!wti || !brent) return null;
  const keyStatValue = prior.keyStatValue || formatOilKeyStatValue({ wti, brent });
  if (!keyStatValue) return null;
  return {
    ok: false,
    provider: OIL_PROVIDER_ID,
    providerLabel: OIL_PROVIDER_LABEL,
    wti,
    brent,
    keyStatValue,
    stale: true,
    fromPrior: true,
    priorSource: prior.source || "unknown",
    error: err ? String(err.message || err) : "oil fetch failed",
    asOfIso: prior.updatedAt || null,
    sourceUrls: [],
  };
}

/**
 * off: skip network.
 * shadow: fetch for log-compare; on failure do not inject prior (production unchanged).
 * on: fetch; on failure inject prior close and continue (never abort the day for fetch alone).
 */
export async function resolveOilFactsForRun({
  mode,
  fetchImpl,
  priorFromStore,
  priorFromDataTs,
  timeoutMs,
} = {}) {
  const feedMode = parseOilFeedMode(mode);
  if (feedMode === "off") {
    return { mode: feedMode, facts: null, usedPrior: false, fetchFailed: false };
  }
  try {
    const facts = await fetchOilFacts({ fetchImpl, timeoutMs });
    return { mode: feedMode, facts, usedPrior: false, fetchFailed: false };
  } catch (err) {
    const error = String(err?.message || err);
    if (feedMode === "shadow") {
      return { mode: feedMode, facts: null, usedPrior: false, fetchFailed: true, error };
    }
    const prior = priorFromStore || priorFromDataTs || null;
    const facts = factsFromPrior(prior, err);
    return {
      mode: feedMode,
      facts,
      usedPrior: Boolean(facts),
      fetchFailed: true,
      error,
      noPrior: !facts,
    };
  }
}

export function applyOilFactsToPayload(payload, facts) {
  const value = facts?.keyStatValue;
  if (!payload || !value) {
    return { overwritten: false, previous: { zh: null, en: null }, value: null };
  }
  const previous = {
    zh: payload.dataZh?.keyStats?.[2]?.value ?? null,
    en: payload.dataEn?.keyStats?.[2]?.value ?? null,
  };
  for (const lang of ["dataZh", "dataEn"]) {
    const d = payload[lang];
    if (!d) continue;
    if (!Array.isArray(d.keyStats)) d.keyStats = [];
    while (d.keyStats.length < 3) d.keyStats.push({});
    d.keyStats[2] = { ...(d.keyStats[2] || {}), value };
  }
  return { overwritten: true, previous, value };
}

export function buildOilFactPromptBlock(resolution) {
  if (resolution?.mode !== "on") return "";
  const facts = resolution.facts;
  if (resolution.fetchFailed) {
    const priorLine = facts?.keyStatValue
      ? `脚本已注入**上一期收盘/卡片区间**（来源 ${facts.priorSource || "prior"}）：\`${facts.keyStatValue}\``
      : "无可用上一期油价；keyStats[2] 不得臆造精确现价。";
    return `

## OIL FACTS（降级 · 上一期收盘 · 脚本注入 · 不可改写数字）
- 实时 ${OIL_PROVIDER_LABEL} **拉取失败**：${resolution.error || "unknown"}。
- ${priorLine}
- **禁止**因油价接口失败而停止撰写本日其余部分。
- 能源因子 \`sourceVerification\` **必须**为 \`unverified\`；叙事写明价格为上一期存档、未经当日核实。
- **keyStats[2].value** 必须逐字使用上述区间（若有）；脚本会在模型返回后再次覆盖。`;
  }
  if (!facts?.keyStatValue) return "";
  const wti = facts.wti || {};
  const brent = facts.brent || {};
  return `

## IMMUTABLE OIL FACTS（脚本注入 · 唯一价格源 · 禁止另编）
- Provider: ${facts.providerLabel || OIL_PROVIDER_LABEL} · asOf: ${facts.asOfIso || "n/a"}
- WTI (${wti.symbol || "CL=F"}): last=$${formatUsd2(wti.last)} session=$${formatUsd2(wti.low)}–$${formatUsd2(wti.high)} prevClose=$${formatUsd2(wti.prevClose) ?? "—"}
- Brent (${brent.symbol || "BZ=F"}): last=$${formatUsd2(brent.last)} session=$${formatUsd2(brent.low)}–$${formatUsd2(brent.high)} prevClose=$${formatUsd2(brent.prevClose) ?? "—"}
- **keyStats[2].value 必须逐字为**：\`${facts.keyStatValue}\`
- 能源冲击分数对照**上述美元区间**与既有 rubric；只写趋势/叙事/接地 URL，**不得**用搜索结果覆盖这些数字。
- 脚本会在模型 JSON 返回后**强制覆盖** keyStats[2]；另编区间会被丢弃。检索仅用于能源市场叙事与 URL。`;
}

export function oilFactsToHistoryRecord(facts, mode, resolution) {
  if (!facts?.keyStatValue) return null;
  return {
    provider: facts.provider || OIL_PROVIDER_ID,
    mode: parseOilFeedMode(mode),
    ok: Boolean(facts.ok) && !facts.fromPrior,
    stale: Boolean(facts.stale || facts.fromPrior),
    fromPrior: Boolean(facts.fromPrior),
    fetchFailed: Boolean(resolution?.fetchFailed),
    asOf: facts.asOfIso || null,
    wti: facts.wti?.last ?? null,
    brent: facts.brent?.last ?? null,
    wtiLow: facts.wti?.low ?? null,
    wtiHigh: facts.wti?.high ?? null,
    brentLow: facts.brent?.low ?? null,
    brentHigh: facts.brent?.high ?? null,
    keyStatValue: facts.keyStatValue,
    updatedAt: new Date().toISOString(),
  };
}

export function summarizeOilResolution(resolution) {
  if (!resolution) return "oil-feed: n/a";
  const f = resolution.facts;
  return `oil-feed mode=${resolution.mode} fetchFailed=${Boolean(resolution.fetchFailed)} usedPrior=${Boolean(resolution.usedPrior)} value=${f?.keyStatValue ?? "—"} err=${resolution.error || "ok"}`;
}
