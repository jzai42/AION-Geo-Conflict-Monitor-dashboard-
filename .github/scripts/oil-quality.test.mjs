import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseOilKeyStatValue,
  impliedEnergyBandFromUsd,
  oilEnergyCompatibility,
  parseMarkdownEnergyScore,
  syncMarkdownEnergyScore,
  evaluateOilQuality,
  pickBetterOilVerdict,
} from "./oil-quality.mjs";

const SNAPSHOT_2026_09_15 = "WTI $70.10–$72.45 · Brent $73.80–$76.10";

// 1) Parse dashboard-canonical range (intentional WTI/Brent ranges, not a UI bug).
{
  const p = parseOilKeyStatValue(SNAPSHOT_2026_09_15);
  assert.ok(p, "parse 2026-09-15 keyStats[2]");
  assert.equal(p.wti.low, 70.1);
  assert.equal(p.wti.high, 72.45);
  assert.equal(p.brent.low, 73.8);
  assert.equal(p.brent.high, 76.1);
}

// 2) Rubric bands from existing product prompt.
{
  assert.equal(impliedEnergyBandFromUsd(70), 1);
  assert.equal(impliedEnergyBandFromUsd(80), 2);
  assert.equal(impliedEnergyBandFromUsd(90), 3);
  assert.equal(impliedEnergyBandFromUsd(105.83), 4);
  assert.equal(impliedEnergyBandFromUsd(120), 4);
  assert.equal(impliedEnergyBandFromUsd(121), 5);
}

// 3) Owner incident: $70s card vs energy score 4 (~$100–120) must abort, not live-publish.
{
  const parsed = parseOilKeyStatValue(SNAPSHOT_2026_09_15);
  const compat = oilEnergyCompatibility(4, parsed);
  assert.equal(compat.hardFail, true);
  assert.equal(compat.compatible, false);
  assert.ok(compat.implied.mid < 75, "mid is in <$75 band");

  const v = evaluateOilQuality({
    keyStatValue: SNAPSHOT_2026_09_15,
    energyScore: 4,
    markdown: "### 3）五维评分\n- **能源冲击：3** — 区间落入 $70–77\n\n### 4）地缘冲突综合分\n",
    energyEvidence: "油价回落（Reuters）。无链接。",
    webSources: [],
  });
  assert.equal(v.publish, "abort");
  assert.equal(v.hardFail, true);
  assert.equal(v.markdownMismatch, true);
  assert.equal(v.hasOilSourceUrl, false);
}

// 4) Crisis-band oil with score 4 + grounded URL → clean live.
{
  const v = evaluateOilQuality({
    keyStatValue: "WTI $104.20–$107.10 · Brent $107.80–$110.55",
    energyScore: 4,
    markdown: "### 3）五维评分\n- **能源冲击：4** — 危机带（Reuters）。\n\n### 4）地缘冲突综合分\n",
    energyEvidence: "Reuters settle band ~$105–109 https://www.reuters.com/markets/commodities/oil-2026-09-15",
    webSources: [{ title: "Oil prices", uri: "https://www.reuters.com/business/energy/oil" }],
  });
  assert.equal(v.publish, "live");
  assert.equal(v.parseOk, true);
  assert.equal(v.hasOilSourceUrl, true);
  assert.equal(v.markdownMismatch, false);
}

// 5) No oil URL → degraded (never confirmed-clean live).
{
  const v = evaluateOilQuality({
    keyStatValue: "WTI $88.00–$91.00 · Brent $92.10–$94.80",
    energyScore: 3,
    markdown: "### 3）五维评分\n- **能源冲击：3** — $85–100 档。\n\n### 4）地缘冲突综合分\n",
    energyEvidence: "区间主体落在 $85–100（通讯社综述，未附 URL）。",
    webSources: [],
  });
  assert.equal(v.publish, "degraded");
  assert.equal(v.hasOilSourceUrl, false);
  assert.ok(v.reasons.includes("missing-oil-source-url"));
}

// 6) Unparseable oil is degraded, not a hard abort (honest "no reliable print").
{
  const v = evaluateOilQuality({
    keyStatValue: "搜索未获可靠现价",
    energyScore: 3,
    markdown: "",
    energyEvidence: "",
    webSources: [],
  });
  assert.equal(v.parseOk, false);
  assert.equal(v.publish, "degraded");
  assert.equal(v.hardFail, false);
}

// 7) Markdown sync: reportMarkdown energy score must match JSON after post-process.
{
  const md = "### 3）五维评分\n- **能源冲击：3** — 测试\n\n### 4）地缘冲突综合分\n";
  assert.equal(parseMarkdownEnergyScore(md), 3);
  const synced = syncMarkdownEnergyScore(md, 4);
  assert.equal(synced.changed, true);
  assert.equal(parseMarkdownEnergyScore(synced.markdown), 4);
}

// 7b) 2026-09-15 report format: score inside bold (`**能源冲击：3**`).
{
  const md = `### 3）五维评分（AION）
- **军事升级烈度：5** — x
- **霍尔木兹航运扰动：4** — x
- **能源冲击：3** — 区间落入 $70–77 美元
- **大国介入深度：4** — x
- **降级/谈判前景：4.5** — x

### 4）地缘冲突综合分
`;
  assert.equal(parseMarkdownEnergyScore(md), 3);
  const synced = syncMarkdownEnergyScore(md, 4);
  assert.equal(parseMarkdownEnergyScore(synced.markdown), 4);
}

// 7c) Live 2026-09-15 report file: markdown energy 3 vs data.ts energy 4 would have shipped.
{
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const md = readFileSync(path.join(repoRoot, "reports/daily/2026-09-15.md"), "utf8");
  assert.equal(parseMarkdownEnergyScore(md), 3);
  const v = evaluateOilQuality({
    keyStatValue: SNAPSHOT_2026_09_15,
    energyScore: 4,
    markdown: md,
    energyEvidence: "油价因以色列承诺不攻击能源设施而大幅回落",
    webSources: [],
  });
  assert.equal(v.publish, "abort");
  assert.equal(v.markdownMismatch, true);
}

// 8) Prefer a live candidate over an aborting $70s/score-4 candidate.
{
  const bad = evaluateOilQuality({
    keyStatValue: SNAPSHOT_2026_09_15,
    energyScore: 4,
    energyEvidence: "x",
    webSources: [],
  });
  const good = evaluateOilQuality({
    keyStatValue: "WTI $105.00–$107.00 · Brent $108.00–$110.00",
    energyScore: 4,
    energyEvidence: "https://www.bloomberg.com/news/articles/oil",
    webSources: [],
  });
  assert.equal(pickBetterOilVerdict(bad, good), "challenger");
  assert.equal(good.publish, "live");
}

// 9) Hyphen / slash variants still parse.
{
  const p = parseOilKeyStatValue("WTI $70.10-$72.45 / Brent $73.80-$76.10");
  assert.equal(p.wti.high, 72.45);
  assert.equal(p.brent.low, 73.8);
}

console.log("oil-quality.test.mjs: all assertions passed");
