import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

const todayNy = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
const todayMmDd = todayNy.slice(5);

// ── v2.9 canonical layout ──────────────────────────────────────────
const CANONICAL = {
  zh: {
    keyStatLabels: ["冲突天数", "评分变化", "油价", "霍尔木兹"],
    keyStatUnitsFixed: ["2月28日起", "较上期"],
    keyStatDefaultUnits34: ["危机峰下", "<10% 常态"],
    keyStatColors: ["#ff851b", "#ff4136", "#ff4136", "#ffdc00"],
    riskFactorNames: ["军事升级烈度", "霍尔木兹航运扰动", "能源冲击", "大国介入深度", "降级/谈判前景"],
    situations: [
      { title: "军事行动", icon: "Military" },
      { title: "航运 / 霍尔木兹", icon: "Shipping" },
      { title: "能源市场", icon: "Energy" },
      { title: "领导层信号", icon: "Leadership" },
    ],
  },
  en: {
    keyStatLabels: ["Conflict Days", "Score Change", "Oil", "Hormuz"],
    keyStatUnitsFixed: ["Since Feb 28", "vs Prev"],
    keyStatDefaultUnits34: ["Below crisis peak", "<10% of normal"],
    keyStatColors: ["#ff851b", "#ff4136", "#ff4136", "#ffdc00"],
    riskFactorNames: ["Military Escalation Intensity", "Hormuz Disruption", "Energy Shock", "Great Power Involvement", "De-escalation Probability"],
    situations: [
      { title: "Military Action", icon: "Military" },
      { title: "Shipping / Hormuz", icon: "Shipping" },
      { title: "Energy Market", icon: "Energy" },
      { title: "Leadership Signals", icon: "Leadership" },
    ],
  },
};

// ── JSON Schema for structured output ──────────────────────────────
const dashboardSchema = {
  type: "object",
  properties: {
    date:              { type: "string" },
    version:           { type: "string" },
    riskScore:         { type: "number" },
    prevRiskScore:     { type: "number" },
    investmentSignal:  { type: "string" },
    keyChange:         { type: "string" },
    keyStats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" }, value: { type: "string" },
          unit:  { type: "string" }, color: { type: "string" },
        },
        required: ["label", "value", "unit", "color"],
        additionalProperties: false,
      },
    },
    warPhase: {
      type: "object",
      properties: {
        level:       { type: "string" },
        targetLevel: { type: "string" },
        title:       { type: "string" },
        subTitle:    { type: "string" },
        points:      { type: "array", items: { type: "string" } },
        note:        { type: "string" },
      },
      required: ["level", "targetLevel", "title", "subTitle", "points", "note"],
      additionalProperties: false,
    },
    riskFactors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name:        { type: "string" },
          score:       { type: "number" },
          prev:        { type: "number" },
          weight:      { type: "number" },
          description: { type: "string" },
          status:      { type: "string" },
          change:      { type: "string" },
          evidence:    { type: "string" },
        },
        required: ["name", "score", "prev", "weight", "description", "status", "change", "evidence"],
        additionalProperties: false,
      },
    },
    events: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id:           { type: "string" },
          title:        { type: "string" },
          description:  { type: "string" },
          verification: { type: "string" },
          timestamp:    { type: "string" },
          significance: { type: "string" },
          highlight:    { type: "boolean" },
          critical:     { type: "boolean" },
        },
        required: ["id", "title", "description", "verification", "timestamp", "significance", "highlight", "critical"],
        additionalProperties: false,
      },
    },
    scoreTrend: {
      type: "array",
      items: {
        type: "object",
        properties: {
          date:   { type: "string" },
          score:  { type: "number" },
          active: { type: "boolean" },
        },
        required: ["date", "score", "active"],
        additionalProperties: false,
      },
    },
    situations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title:    { type: "string" },
          icon:     { type: "string" },
          tag:      { type: "string" },
          tagColor: { type: "string" },
          points:   { type: "array", items: { type: "string" } },
        },
        required: ["title", "icon", "tag", "tagColor", "points"],
        additionalProperties: false,
      },
    },
    coreContradiction: {
      type: "object",
      properties: {
        political: { type: "array", items: { type: "string" } },
        military:  { type: "array", items: { type: "string" } },
      },
      required: ["political", "military"],
      additionalProperties: false,
    },
  },
  required: [
    "date", "version", "riskScore", "prevRiskScore", "investmentSignal",
    "keyChange", "keyStats", "warPhase", "riskFactors", "events",
    "scoreTrend", "situations", "coreContradiction",
  ],
  additionalProperties: false,
};

const outputSchema = {
  type: "object",
  properties: {
    reportMarkdownZh: { type: "string" },
    dataZh: dashboardSchema,
    dataEn: dashboardSchema,
  },
  required: ["reportMarkdownZh", "dataZh", "dataEn"],
  additionalProperties: false,
};

// ── Read previous day data from data.ts ────────────────────────────
const dataFilePath = path.join(process.cwd(), "src", "data.ts");
let dataTsSnapshot = "";
try { dataTsSnapshot = await readFile(dataFilePath, "utf8"); } catch { /* ok */ }

function extractPrevData(snapshot) {
  const dateM = snapshot.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/);
  const versionM = snapshot.match(/version:\s*"(v\d+\.\d+)"/);
  const scoreM = snapshot.match(/riskScore:\s*(\d+)/);
  const prevScoreM = snapshot.match(/prevRiskScore:\s*(\d+)/);
  const trendM = snapshot.match(/scoreTrend:\s*\[([\s\S]*?)\]/);
  const dayM = snapshot.match(/value:\s*"D(\d+)"/);
  const factorsM = snapshot.match(/riskFactors:\s*\[([\s\S]*?)\],\s*events/);

  let trendStr = "[]";
  if (trendM) {
    const points = [...trendM[1].matchAll(/date:\s*"([^"]+)".*?score:\s*(\d+)/g)];
    trendStr = JSON.stringify(points.map(p => ({ date: p[1], score: Number(p[2]) })));
  }

  let factorScores = "";
  if (factorsM) {
    const names = [...factorsM[1].matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
    const scores = [...factorsM[1].matchAll(/\bscore:\s*([\d.]+)/g)].map(m => Number(m[1]));
    factorScores = names.map((n, i) => `${n}: ${scores[i] ?? "?"}`).join(", ");
  }

  return {
    date: dateM?.[1] || "",
    version: versionM?.[1] || "v2.9",
    riskScore: Number(scoreM?.[1]) || 64,
    prevRiskScore: Number(prevScoreM?.[1]) || 56,
    conflictDay: Number(dayM?.[1]) || 40,
    scoreTrend: trendStr,
    factorScores,
  };
}

const prev = extractPrevData(dataTsSnapshot);
const conflictStartDate = "2026-02-28";
const msPerDay = 86400000;
const correctConflictDay = Math.round((new Date(todayNy) - new Date(conflictStartDate)) / msPerDay);
const prevTrendLast4 = JSON.parse(prev.scoreTrend).slice(-4);

console.log(`Previous: ${prev.date} ${prev.version}, riskScore=${prev.riskScore}, D${prev.conflictDay}`);
console.log(`Today conflict day: D${correctConflictDay}`);

// ── Prompt ──────────────────────────────────────────────────────────
const systemPrompt = `你是 AION Geo-Conflict Monitor 的结构化数据引擎。用网络搜索获取近 24h 美伊相关公开信息后，按 JSON Schema 输出结构化日报。

## 前一天数据（必须作为基准，不可忽略）
- 日期: ${prev.date}，版本: ${prev.version}
- 冲突天数: D${prev.conflictDay}（冲突起始日 ${conflictStartDate}，**今天是 D${correctConflictDay}**）
- 综合评分: ${prev.riskScore}（上期: ${prev.prevRiskScore}）
- 五维因子分: ${prev.factorScores}
- 近5日趋势: ${prev.scoreTrend}

## 评分标准（Scoring Rubric）——必须严格对照打分

每个因子 1–5 分（整数），必须根据下列条件对号入座，不可凭感觉。
若 24h 内无充分多源证据支持变化，**默认沿用前一天分数**。

### 1. 军事升级烈度
- 1 = 无任何军事活动或威胁言论
- 2 = 口头威胁/小规模兵力调动/防御部署，无实际交火
- 3 = 有限打击或代理冲突（如无人机事件、零星交火），未扩大
- 4 = 直接交火/多战线活跃/重大军事行动（如导弹互射、大规模空袭）
- 5 = 全面战争状态/大规模地面入侵/核威胁

### 2. 霍尔木兹航运扰动
- 1 = 完全正常通行，无任何限制
- 2 = 偶发骚扰或警告，流量基本正常（>90%）
- 3 = 许可制或部分限制，流量降至 50–90%
- 4 = 严重受限/扣押事件，流量降至 <50%，主要班轮暂停
- 5 = 完全封锁，商业航运停止

### 3. 能源冲击
- 1 = 油价在正常区间波动（<$75），供应链正常
- 2 = 油价温和上涨（$75–85），市场紧张但可控
- 3 = 油价显著上涨（$85–100），供应担忧明显
- 4 = 油价危机水平（$100–120），供应中断或恐慌性买入
- 5 = 油价极端飙升（>$120），全球能源危机

### 4. 大国介入深度
- 1 = 大国未介入，仅外交关注
- 2 = 大国发表声明/制裁调整，无实质军事介入
- 3 = 大国提供军事援助/情报共享/联合军演
- 4 = 大国直接军事部署/参与作战行动
- 5 = 多个大国直接军事对抗/全球联盟对峙

### 5. 降级/谈判前景
- 1 = 正式和平协议签署或全面停火生效
- 2 = 实质性谈判进展，双方释放善意信号
- 3 = 谈判渠道存在但进展有限，停火脆弱
- 4 = 谈判停滞或破裂风险高，双方立场强硬
- 5 = 完全无谈判渠道，双方拒绝对话

### 评分纪律
- 每个因子的 evidence 字段必须写出具体依据（引用的事件/报道来源）
- 同一事件须 ≥2 个独立来源才能驱动评分变化
- 仅有单源报道时：维持前一天分数，verification 标记为 "single"
- 评分变化幅度限制：单日单因子变化不超过 ±1 分（除非有重大突发且多源确认）

## 规则
- date 必须是 "${todayNy}"
- version: "${prev.version}" 的下一个版本（小版本号 +1）
- keyStats[0] 冲突天数: 必须是 "D${correctConflictDay}"（不要自己算，用这个值）
- keyStats[1] 评分变化: 今日 riskScore 与前一天 ${prev.riskScore} 的差值（如 ↑3 或 ↓2 或 持平）
- keyStats 恰好 4 项，顺序：冲突天数、评分变化、油价、霍尔木兹。每项 unit 非空
- riskFactors 恰好 5 项，顺序：军事升级烈度、霍尔木兹航运扰动、能源冲击、大国介入深度、降级谈判前景。weight 一律 0.2。riskScore = round(avg(scores) × 20)
- riskFactors 的 prev 字段必须等于前一天对应因子的 score
- events 1–5 条。verification 只能是 confirmed/partial/single。highlight/critical 不需要时设 false
- warPhase 所有字段非空；level 和 targetLevel 必须是描述性短语（如中文"脆弱停火"/"代理延续"，英文"Fragile Ceasefire"/"Proxy War"），绝不能是纯数字；points 1–3 条
- situations 恰好 4 张卡，顺序：军事行动、航运/霍尔木兹、能源市场、领导层信号。每张 points 1–3 条非空
- coreContradiction.political 和 .military 各 1–2 条非空
- scoreTrend 恰好 5 个点：前 4 个点取自前一天趋势的后 4 个（${JSON.stringify(prevTrendLast4)}），第 5 个是今天 date="${todayMmDd}" active=true score=今日riskScore
- keyChange、investmentSignal 非空
- change 字段：有变化填 up/down/structural，无变化填 "none"
- dataZh 中文、dataEn 英文，结构完全一致，仅文案语言不同，数值相同
- reportMarkdownZh 为中文日报全文 markdown 字符串

## 信源
重大事件须 ≥2 独立报道或 1 份一级官方声明；单源须 verification="single" 且不驱动评分。`;

// ── OpenAI call ────────────────────────────────────────────────────
async function callOpenAI(payload) {
  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = await resp.text();
  if (!resp.ok) throw new Error(`OpenAI ${resp.status}: ${body}`);
  return JSON.parse(body);
}

// ── Helpers ─────────────────────────────────────────────────────────
function extractText(resp) {
  if (typeof resp?.output_text === "string" && resp.output_text.trim()) {
    return resp.output_text.trim();
  }
  const items = Array.isArray(resp?.output) ? resp.output : [];
  for (const item of items) {
    const contents = Array.isArray(item?.content) ? item.content : [];
    for (const c of contents) {
      if (typeof c?.text === "string" && c.text.trim()) return c.text.trim();
    }
  }
  return "";
}

function parsePayload(raw) {
  const text = extractText(raw);
  if (!text) return null;
  try { return JSON.parse(text); } catch {}
  const cleaned = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function extractFactorScores(p) {
  return (p?.dataZh?.riskFactors || []).map(f => Number(f.score) || 3);
}

// ── Main ───────────────────────────────────────────────────────────
const ENSEMBLE_N = 3;
console.log(`Generating AION daily report for ${todayNy} (${ENSEMBLE_N}x ensemble) ...`);

function makePayload() {
  return {
    model: OPENAI_MODEL,
    input: [{ role: "system", content: systemPrompt }, { role: "user", content: `请生成 ${todayNy} 的 AION 日报。` }],
    tools: [{ type: "web_search_preview" }],
    text: {
      format: {
        type: "json_schema",
        name: "aion_daily_report",
        strict: true,
        schema: outputSchema,
      },
    },
  };
}

async function singleCall(idx) {
  try {
    const raw = await callOpenAI(makePayload());
    const p = parsePayload(raw);
    if (p) { console.log(`  Call ${idx + 1}: OK, factors = [${extractFactorScores(p).join(", ")}]`); return p; }
  } catch (err) {
    console.warn(`  Call ${idx + 1} failed: ${err.message}`);
  }
  try {
    const fallbackPayload = makePayload();
    delete fallbackPayload.tools;
    const raw = await callOpenAI(fallbackPayload);
    const p = parsePayload(raw);
    if (p) { console.log(`  Call ${idx + 1} (no-web fallback): OK, factors = [${extractFactorScores(p).join(", ")}]`); return p; }
  } catch (err2) {
    console.warn(`  Call ${idx + 1} fallback also failed: ${err2.message}`);
  }
  return null;
}

const results = await Promise.all(Array.from({ length: ENSEMBLE_N }, (_, i) => singleCall(i)));
const validResults = results.filter(Boolean);

if (validResults.length === 0) {
  const debugDir = path.join(process.cwd(), "reports", "daily");
  await mkdir(debugDir, { recursive: true });
  await writeFile(path.join(debugDir, `${todayNy}.ensemble-fail.json`), JSON.stringify(results, null, 2), "utf8");
  throw new Error("All ensemble calls failed (see reports/daily/ for debug)");
}

// Compute median factor scores across all valid results
const allFactorSets = validResults.map(extractFactorScores);
const medianFactors = Array.from({ length: 5 }, (_, fi) => median(allFactorSets.map(set => set[fi] ?? 3)));
const medianTotal = medianFactors.reduce((a, b) => a + b, 0);
console.log(`Ensemble median factors: [${medianFactors.join(", ")}], total=${medianTotal}`);

// Pick the result whose factor total is closest to the median total as the content source
let payload = validResults[0];
let bestDist = Infinity;
for (const r of validResults) {
  const total = extractFactorScores(r).reduce((a, b) => a + b, 0);
  const dist = Math.abs(total - medianTotal);
  if (dist < bestDist) { bestDist = dist; payload = r; }
}

// Guardrails: detect high variance and clamp to previous day if needed
const prevScores = prev.factorScores
  ? prev.factorScores.split(", ").map(s => Number(s.split(": ")[1]) || 3)
  : [3, 3, 3, 3, 3];
const factorNames = ["军事升级烈度", "霍尔木兹航运扰动", "能源冲击", "大国介入深度", "降级/谈判前景"];

const finalFactors = medianFactors.map((med, i) => {
  const col = allFactorSets.map(set => set[i] ?? 3);
  const range = Math.max(...col) - Math.min(...col);
  const delta = Math.abs(med - prevScores[i]);

  if (range > 2) {
    console.warn(`  ⚠ Factor ${i} "${factorNames[i]}": high variance (range=${range}, values=[${col.join(",")}]) → clamping to prev=${prevScores[i]}`);
    return prevScores[i];
  }
  if (delta > 1 && validResults.length < 3) {
    console.warn(`  ⚠ Factor ${i} "${factorNames[i]}": large change (Δ=${delta}) with only ${validResults.length} samples → clamping to prev=${prevScores[i]}`);
    return prevScores[i];
  }
  return med;
});

const finalRiskScore = Math.round(finalFactors.reduce((a, b) => a + b, 0) / 5 * 20);
const totalDelta = Math.abs(finalRiskScore - prev.riskScore);
if (totalDelta > 20) {
  console.warn(`  ⚠ Large riskScore swing: ${prev.riskScore} → ${finalRiskScore} (Δ=${totalDelta})`);
}

console.log(`Final factors: [${finalFactors.join(", ")}], riskScore=${finalRiskScore} (prev=${prev.riskScore}, Δ=${finalRiskScore - prev.riskScore})`);

// Override factor scores with final (guardrailed) values
for (const lang of ["dataZh", "dataEn"]) {
  if (payload[lang]?.riskFactors) {
    payload[lang].riskFactors.forEach((f, i) => { f.score = finalFactors[i]; });
  }
}
console.log("Ensemble scoring complete.");

// ── Post-process: enforce v2.9 canonical layout ────────────────────
function s(v, fb = "") { return typeof v === "string" ? v : fb; }
function n(v, fb = 0) { const x = Number(v); return Number.isFinite(x) ? x : fb; }
function clip(v, max) { const t = s(v).trim(); return t.length <= max ? t : t.slice(0, max - 1) + "…"; }

function enforceLayout(d, lang) {
  const c = CANONICAL[lang];
  d.date = todayNy;

  // riskFactors — force prev from previous day's actual scores (must come before keyStats)
  const rf = Array.isArray(d.riskFactors) ? d.riskFactors : [];
  const prevFactorScores = prev.factorScores
    ? prev.factorScores.split(", ").map(s => Number(s.split(": ")[1]) || 3)
    : [3, 3, 3, 3, 3];
  d.riskFactors = c.riskFactorNames.map((name, i) => {
    const src = rf[i] || {};
    const validStatus = ["NORMAL", "AT CEILING", "FAST", "SLOW"];
    const validChange = ["up", "down", "structural"];
    const out = {
      name,
      score: n(src.score, 3),
      prev: prevFactorScores[i] ?? 3,
      weight: 0.2,
      description: s(src.description),
      status: validStatus.includes(src.status) ? src.status : "FAST",
      ...(validChange.includes(src.change) ? { change: src.change } : {}),
    };
    if (src.evidence) out._evidence = s(src.evidence);
    return out;
  });

  // riskScore from factors; prevRiskScore from previous day
  const avg = d.riskFactors.reduce((sum, f) => sum + f.score, 0) / 5;
  d.riskScore = Math.round(avg * 20);
  d.prevRiskScore = prev.riskScore;

  // keyStats — must come AFTER riskScore is finalized
  const ks = Array.isArray(d.keyStats) ? d.keyStats : [];
  const scoreDelta = d.riskScore - prev.riskScore;
  d.keyStats = c.keyStatLabels.map((label, i) => {
    let value = s(ks[i]?.value, "-");
    if (i === 0) value = `D${correctConflictDay}`;
    if (i === 1) value = scoreDelta > 0 ? `↑${scoreDelta}` : scoreDelta < 0 ? `↓${Math.abs(scoreDelta)}` : (lang === "zh" ? "持平" : "Flat");
    return {
      label,
      value,
      unit: i < 2 ? c.keyStatUnitsFixed[i] : (s(ks[i]?.unit).trim() || c.keyStatDefaultUnits34[i - 2]),
      color: s(ks[i]?.color, c.keyStatColors[i]),
    };
  });

  // situations
  const sit = Array.isArray(d.situations) ? d.situations : [];
  d.situations = c.situations.map((meta, i) => ({
    title: meta.title,
    icon: meta.icon,
    tag: s(sit[i]?.tag),
    tagColor: s(sit[i]?.tagColor, "orange"),
    points: (Array.isArray(sit[i]?.points) ? sit[i].points : []).filter(Boolean).slice(0, 3),
  }));

  // scoreTrend: use previous day's last 4 points + today (never trust model for history)
  const historyPoints = prevTrendLast4.map(p => ({ date: p.date, score: p.score }));
  while (historyPoints.length < 4) {
    const h = historyPoints[0] || { date: todayMmDd, score: prev.riskScore };
    const [mm, dd] = h.date.split("-").map(Number);
    const dt = new Date(Date.UTC(2026, mm - 1, dd));
    dt.setUTCDate(dt.getUTCDate() - 1);
    const pd = `${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
    historyPoints.unshift({ date: pd, score: prev.riskScore });
  }
  d.scoreTrend = [
    ...historyPoints.slice(-4),
    { date: todayMmDd, score: d.riskScore, active: true },
  ];

  // events: clean up booleans
  d.events = (Array.isArray(d.events) ? d.events : []).slice(0, 5).map((e, i) => {
    const obj = {
      id: s(e.id, `EVT-${String(i + 1).padStart(2, "0")}`),
      title: s(e.title),
      description: s(e.description),
      verification: ["confirmed", "partial", "single"].includes(e.verification) ? e.verification : "single",
      timestamp: s(e.timestamp),
      significance: s(e.significance),
    };
    if (e.highlight === true) obj.highlight = true;
    if (e.critical === true) obj.critical = true;
    return obj;
  });

  // warPhase: ensure non-empty; reject pure-numeric level/targetLevel
  const wp = d.warPhase || {};
  const validPhaseStr = (v) => { const t = s(v).trim(); return t && !/^\d+$/.test(t) ? t : ""; };
  d.warPhase = {
    level: validPhaseStr(wp.level) || (lang === "zh" ? "阶段评估" : "Phase assessment"),
    targetLevel: validPhaseStr(wp.targetLevel) || (lang === "zh" ? "动态跟踪" : "Tracking"),
    title: s(wp.title) || (lang === "zh" ? "美伊地缘风险监测" : "US–Iran geo-risk snapshot"),
    subTitle: s(wp.subTitle) || (lang === "zh" ? "基于公开报道综合研判" : "Synthesized from public sources"),
    points: (Array.isArray(wp.points) ? wp.points : []).filter(Boolean).slice(0, 3),
    note: s(wp.note) || (lang === "zh" ? "监测用途，不构成投资建议。" : "For monitoring only; not investment advice."),
  };
  if (!d.warPhase.points.length) {
    d.warPhase.points = [s(d.riskFactors[0]?.description) || (lang === "zh" ? "详见下方事件卡片。" : "See event cards below.")];
  }

  // coreContradiction
  const cc = d.coreContradiction || {};
  d.coreContradiction = {
    political: (Array.isArray(cc.political) ? cc.political : []).filter(Boolean).slice(0, 2),
    military: (Array.isArray(cc.military) ? cc.military : []).filter(Boolean).slice(0, 2),
  };
  if (!d.coreContradiction.political.length) {
    d.coreContradiction.political = [s(d.riskFactors[4]?.description) || (lang === "zh" ? "外交路径仍存变数。" : "Diplomatic path uncertain.")];
  }
  if (!d.coreContradiction.military.length) {
    d.coreContradiction.military = [s(d.riskFactors[0]?.description) || (lang === "zh" ? "军事通道未关闭。" : "Military channels remain open.")];
  }

  // investmentSignal / keyChange
  if (!s(d.investmentSignal).trim()) d.investmentSignal = lang === "zh" ? "维持风险平衡敞口。" : "Maintain balanced exposure.";
  if (!s(d.keyChange).trim()) d.keyChange = lang === "zh" ? "24h要点：详见事件与因子。" : "24h: See events and factors.";

  // situations points fallback
  d.situations = d.situations.map((sit, i) => {
    if (!sit.points.length) {
      sit.points = [s(d.riskFactors[i]?.description) || (lang === "zh" ? "详见风险因子。" : "See risk factors.")];
    }
    return sit;
  });

  return d;
}

// Sync EN numeric fields from ZH
function syncEnFromZh(zh, en) {
  en.riskScore = zh.riskScore;
  en.prevRiskScore = zh.prevRiskScore;
  en.scoreTrend = JSON.parse(JSON.stringify(zh.scoreTrend));
  en.keyStats = en.keyStats.map((row, i) => {
    if (i === 0) return { ...row, value: zh.keyStats[i]?.value ?? row.value };
    return row;
  });
  en.riskFactors = en.riskFactors.map((f, i) => {
    const { change: _, ...rest } = f;
    const out = { ...rest, score: zh.riskFactors[i].score, prev: zh.riskFactors[i].prev, weight: zh.riskFactors[i].weight };
    if (zh.riskFactors[i].change) out.change = zh.riskFactors[i].change;
    return out;
  });
}

// Version: bump from previous
const version = `v${prev.version.match(/(\d+)\.(\d+)/)?.[1] || 2}.${(Number(prev.version.match(/\d+\.(\d+)/)?.[1]) || 9) + 1}`;

payload.dataZh.version = version;
payload.dataEn.version = version;

enforceLayout(payload.dataZh, "zh");
enforceLayout(payload.dataEn, "en");
syncEnFromZh(payload.dataZh, payload.dataEn);

// ── Validate ───────────────────────────────────────────────────────
function validate(d, label) {
  const e = [];
  if (d.date !== todayNy) e.push("date");
  if (!/^v\d+\.\d+$/.test(d.version)) e.push("version");
  if (d.keyStats?.length !== 4) e.push("keyStats.length");
  if (d.riskFactors?.length !== 5) e.push("riskFactors.length");
  if (!d.events?.length) e.push("events empty");
  if (d.situations?.length !== 4) e.push("situations.length");
  if (d.scoreTrend?.length !== 5) e.push("scoreTrend.length");
  if (!s(d.warPhase?.title).trim()) e.push("warPhase.title");
  if (!s(d.investmentSignal).trim()) e.push("investmentSignal");
  if (!s(d.keyChange).trim()) e.push("keyChange");
  if (!d.coreContradiction?.political?.length) e.push("coreContradiction.political");
  if (!d.coreContradiction?.military?.length) e.push("coreContradiction.military");
  if (d.situations?.some(sit => !sit.points?.length)) e.push("situation points empty");
  const avgCheck = d.riskFactors.reduce((sum, f) => sum + f.score, 0) / 5;
  if (Math.abs(d.riskScore - Math.round(avgCheck * 20)) > 1) e.push("riskScore mismatch");
  if (e.length) throw new Error(`${label} validation failed: ${e.join(", ")}`);
}

validate(payload.dataZh, "dataZh");
validate(payload.dataEn, "dataEn");
console.log("Validation passed.");

// Log evidence then strip from output (evidence is for audit only, not for data.ts)
for (const f of payload.dataZh.riskFactors) {
  if (f._evidence) { console.log(`  [evidence] ${f.name}: ${f._evidence}`); delete f._evidence; }
}
for (const f of payload.dataEn.riskFactors) { delete f._evidence; }

// ── Write report markdown ──────────────────────────────────────────
const outDir = path.join(process.cwd(), "reports", "daily");
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, `${todayNy}.md`), payload.reportMarkdownZh + "\n", "utf8");

// ── Write data.ts ──────────────────────────────────────────────────
function findObjectEnd(text, start) {
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth === 0) return i;
  }
  return -1;
}

function toTsLiteral(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, "$1:");
}

function replaceExport(src, prefix, nextPrefix, literal) {
  const start = src.indexOf(prefix);
  if (start === -1) throw new Error(`Cannot find: ${prefix}`);
  const braceStart = src.indexOf("{", start);
  const braceEnd = findObjectEnd(src, braceStart);
  if (braceEnd === -1) throw new Error(`Cannot parse object for: ${prefix}`);
  const next = src.indexOf(nextPrefix, braceEnd);
  if (next === -1) throw new Error(`Cannot find boundary: ${nextPrefix}`);
  return src.slice(0, start) + `${prefix}${literal};\n\n` + src.slice(next);
}

function replaceTranslation(src, locale, key, value) {
  const locStart = src.indexOf(`${locale}: {`);
  if (locStart === -1) throw new Error(`Cannot find locale: ${locale}`);
  const bStart = src.indexOf("{", locStart);
  const bEnd = findObjectEnd(src, bStart);
  if (bEnd === -1) throw new Error(`Cannot parse locale: ${locale}`);
  const block = src.slice(bStart, bEnd + 1);
  const escaped = JSON.stringify(value);
  const re = new RegExp(`(^\\s*${key}:\\s*)(?:"(?:\\\\.|[^"\\\\])*"|\\n\\s*"(?:\\\\.|[^"\\\\])*")(,?)`, "m");
  if (!re.test(block)) throw new Error(`Cannot find key: ${locale}.${key}`);
  return src.slice(0, bStart) + block.replace(re, `$1${escaped}$2`) + src.slice(bEnd + 1);
}

let dataTs = await readFile(dataFilePath, "utf8");
dataTs = replaceExport(dataTs, "export const DATA_ZH: DashboardData = ", "export const DATA_EN: DashboardData = ", toTsLiteral(payload.dataZh));
dataTs = replaceExport(dataTs, "export const DATA_EN: DashboardData = ", "export const TRANSLATIONS = ", toTsLiteral(payload.dataEn));

// ── Synthesize TRANSLATIONS from dashboard data ────────────────────
const zh = payload.dataZh;
const en = payload.dataEn;
const [, mo, da] = todayNy.split("-").map(Number);
const monthShort = new Date(Date.UTC(2026, mo - 1, da)).toLocaleString("en-US", { month: "short", timeZone: "UTC" });

const translations = {
  zh: {
    node406: `${mo}月${da}日节点`,
    systemInfo: `AION 智能分析系统 · 地缘冲突模块 ${version} · Daily`,
    bannerSignal: `综合评分 ${zh.riskScore}（${s(zh.keyStats[1]?.value, "—")}）：${clip(zh.keyChange, 140)}`,
    bannerWarning: clip(s(zh.investmentSignal).replace(/^[「"]|[」"]$/g, ""), 120) || "保留风险对冲。",
    deescalationIntent: clip(zh.coreContradiction.political[0] || zh.riskFactors[4]?.description, 80),
    structuralRisk: clip(zh.riskFactors[1]?.description || "", 100) || "咽喉与航运条件仍影响流量。",
    contradictionNote: clip([zh.coreContradiction.political[0], zh.coreContradiction.military[0]].filter(Boolean).join("；"), 160),
    dayCount: `${s(zh.keyStats[0]?.value, "D?").replace("D", "第")}天`,
  },
  en: {
    node406: `${monthShort} ${da} Node`,
    systemInfo: `AION Intelligence System · Geo-Conflict Module ${version} · Daily`,
    bannerSignal: `Composite ${en.riskScore} (${s(en.keyStats[1]?.value, "—")}): ${clip(en.keyChange, 140)}`,
    bannerWarning: clip(en.investmentSignal, 120) || "Keep hedges.",
    deescalationIntent: clip(en.coreContradiction.political[0] || en.riskFactors[4]?.description, 80),
    structuralRisk: clip(en.riskFactors[1]?.description || "", 100) || "Chokepoint conditions still matter.",
    contradictionNote: clip([en.coreContradiction.political[0], en.coreContradiction.military[0]].filter(Boolean).join("; "), 160),
    dayCount: s(en.keyStats[0]?.value, "D?").replace("D", "Day "),
  },
};

const trKeys = ["node406", "systemInfo", "bannerSignal", "bannerWarning", "deescalationIntent", "structuralRisk", "contradictionNote", "dayCount"];
for (const key of trKeys) {
  dataTs = replaceTranslation(dataTs, "zh", key, translations.zh[key]);
  dataTs = replaceTranslation(dataTs, "en", key, translations.en[key]);
}

await writeFile(dataFilePath, dataTs, "utf8");
console.log("Done. Updated src/data.ts and wrote report.");
