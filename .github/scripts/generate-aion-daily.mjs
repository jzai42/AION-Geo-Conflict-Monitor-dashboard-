import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

// ── CONFIG ─────────────────────────────────────────────────────────
const CONFIG = {
  conflictStartDate: "2026-02-28",
  ensembleN: 1,
  oilDemoUrl: "https://api.oilpriceapi.com/v1/demo/prices",
  geminiMaxAttempts: 4,
  geminiRetryBaseMs: 1500,
  geminiRetryMaxMs: 12000,
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-pro";
if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY)");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const todayNy = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
const todayMmDd = todayNy.slice(5);
const correctConflictDay = Math.round((new Date(todayNy) - new Date(CONFIG.conflictStartDate)) / 86400000);

const PATHS = {
  history: path.join(process.cwd(), "src", "score-history.json"),
  dataTs:  path.join(process.cwd(), "src", "data.ts"),
  reports: path.join(process.cwd(), "reports", "daily"),
};

// ── CANONICAL layout ───────────────────────────────────────────────
const CANONICAL = {
  zh: {
    keyStatLabels: ["冲突天数", "评分变化", "油价", "霍尔木兹"],
    keyStatUnitsFixed: ["2月28日起", "较上期"],
    keyStatDefaultUnits34: ["危机峰下", "通行状态"],
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
    keyStatDefaultUnits34: ["Below crisis peak", "Passage Status"],
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

// ── Utility functions ──────────────────────────────────────────────
function s(v, fb = "") { return typeof v === "string" ? v : fb; }
function n(v, fb = 0) { const x = Number(v); return Number.isFinite(x) ? x : fb; }
function clip(v, max) { const t = s(v).trim(); return t.length <= max ? t : t.slice(0, max - 1) + "…"; }

function addDaysIso(iso, delta) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + delta);
  return dt.toISOString().slice(0, 10);
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function errorMessage(err) {
  if (!err) return "Unknown error";
  if (typeof err.message === "string" && err.message.trim()) return err.message;
  try { return JSON.stringify(err); } catch { return String(err); }
}

function isRetriableGeminiError(msg) {
  return /503|UNAVAILABLE|RESOURCE_EXHAUSTED|429|rate limit|overloaded|timeout|ETIMEDOUT|ECONNRESET/i.test(msg);
}

function isRetriableOpenAIError(msg) {
  return /429|500|502|503|504|rate limit|overloaded|timeout|ETIMEDOUT|ECONNRESET/i.test(msg);
}

/** WTI + Brent spot from OilPriceAPI demo (no key; ~20 req/h per IP). */
async function fetchOilPrices() {
  try {
    const resp = await fetch(CONFIG.oilDemoUrl);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const body = await resp.json();
    const arr = body?.data?.prices;
    if (!Array.isArray(arr)) return { ok: false, wti: null, brent: null, updatedAt: null };
    const byCode = Object.fromEntries(arr.map(p => [p.code, p]));
    const wti = byCode.WTI_USD?.price;
    const brent = byCode.BRENT_CRUDE_USD?.price;
    const wtiNum = Number(wti);
    const brentNum = Number(brent);
    const wtiOk = Number.isFinite(wtiNum) && wtiNum > 0;
    const brentOk = Number.isFinite(brentNum) && brentNum > 0;
    if (!wtiOk && !brentOk) return { ok: false, wti: null, brent: null, updatedAt: null };
    const updatedAt = byCode.WTI_USD?.updated_at || byCode.BRENT_CRUDE_USD?.updated_at || null;
    return {
      ok: true,
      wti: wtiOk ? wtiNum : null,
      brent: brentOk ? brentNum : null,
      updatedAt,
    };
  } catch (err) {
    console.warn(`Oil price fetch failed: ${err.message}`);
    return { ok: false, wti: null, brent: null, updatedAt: null };
  }
}

// ── Score history (single source of truth) ─────────────────────────
async function loadHistory() {
  try {
    return JSON.parse(await readFile(PATHS.history, "utf8"));
  } catch {
    return { version: 2, latest: null, history: [] };
  }
}

async function saveHistory(data) {
  await writeFile(PATHS.history, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function lookupScore(historyMap, iso, fallback) {
  if (historyMap.has(iso)) return historyMap.get(iso);
  for (let j = 1; j <= 30; j++) {
    const p = addDaysIso(iso, -j);
    if (historyMap.has(p)) return historyMap.get(p);
  }
  return fallback;
}

function buildFiveDayTrend(historyArr, todayIso, fallback) {
  const map = new Map(historyArr.map(p => [p.date, p.score]));
  return Array.from({ length: 5 }, (_, i) => {
    const iso = addDaysIso(todayIso, i - 4);
    return { date: iso.slice(5), score: lookupScore(map, iso, fallback) };
  });
}

/** Exact calendar-day composite in history, or null */
function scoreForDate(historyArr, iso) {
  const row = (historyArr || []).find(p => p && p.date === iso);
  return row != null && Number.isFinite(Number(row.score)) ? Math.round(Number(row.score)) : null;
}

// ── Load prev from score-history.json ──────────────────────────────
const store = await loadHistory();

// Migrate v1 → v2 if needed
if (store.version === 1 && Array.isArray(store.points)) {
  const pts = store.points.filter(p => p?.date && Number.isFinite(p.score));
  store.history = pts;
  store.latest = null;
  store.version = 2;
  delete store.points;
}

const prev = store.latest || {
  date: "",
  appVersion: "v2.9",
  riskScore: 64,
  prevRiskScore: 56,
  conflictDay: 40,
  factorScores: [3, 3, 3, 3, 3],
};

const prevVersion = prev.appVersion || "v2.9";
const vMajor = Number(prevVersion.match(/(\d+)\./)?.[1]) || 2;
const vMinor = Number(prevVersion.match(/\.(\d+)/)?.[1]) || 9;
const version = `v${vMajor}.${vMinor + 1}`;

const prevFactorScores = Array.isArray(prev.factorScores) ? prev.factorScores : [3, 3, 3, 3, 3];

/** 昨日（日历）收盘综合分 — 用于「较上期」与 prevRiskScore；勿用 latest.riskScore（同日重跑会与今日相同 → 误显示持平） */
const yesterdayIso = addDaysIso(todayNy, -1);
const histMapPrior = new Map((store.history || []).map(p => [p.date, p.score]));
const priorDayComposite = scoreForDate(store.history, yesterdayIso)
  ?? lookupScore(histMapPrior, yesterdayIso, prev.riskScore);

const prevTrendLast4 = buildFiveDayTrend(store.history, addDaysIso(todayNy, -1), priorDayComposite).slice(-4);

console.log(`Previous: ${prev.date} ${prevVersion}, latest.riskScore=${prev.riskScore}, D${prev.conflictDay}`);
console.log(`Prior calendar day ${yesterdayIso} composite (for 较上期): ${priorDayComposite}`);
console.log(`Today: ${todayNy}, D${correctConflictDay}, version=${version}`);
console.log(`History: ${store.history.length} points; prevTrendLast4: ${JSON.stringify(prevTrendLast4)}`);

const oilSnapshot = await fetchOilPrices();
if (oilSnapshot.ok) {
  console.log(`Oil (live demo): WTI=${oilSnapshot.wti} Brent=${oilSnapshot.brent} @ ${oilSnapshot.updatedAt ?? "?"}`);
} else {
  console.warn("Oil: demo API unavailable or invalid; energy factor relies on web search + rubric only.");
}

const prevOil = prev.oilPrice;
let oilPromptBlock = "";
if (oilSnapshot.ok) {
  const lines = [];
  if (oilSnapshot.wti != null) lines.push(`- WTI 原油现价: $${oilSnapshot.wti.toFixed(2)}/桶`);
  if (oilSnapshot.brent != null) lines.push(`- Brent 原油现价: $${oilSnapshot.brent.toFixed(2)}/桶`);
  lines.push(`- 数据时间 (API): ${oilSnapshot.updatedAt ?? "unknown"}`);
  oilPromptBlock = `

## 实时市场数据（脚本自动获取，权威参考）
${lines.join("\n")}
- **「能源冲击」因子评分必须严格按上述 WTI/Brent 现货价格对照下方 rubric 美元区间；不得用搜索结果中可能过时或冲突的油价数字替代本段。**
- evidence 中须写明本段 WTI/Brent 数值作为油价依据。
- keyStats[2]「油价」展示值由脚本在生成后覆盖为实时报价，模型可填占位。`;
} else if (prevOil && (prevOil.wti > 0 || prevOil.brent > 0)) {
  oilPromptBlock = `

## 油价参考（实时接口不可用）
- 上一期存档: ${JSON.stringify({ wti: prevOil.wti, brent: prevOil.brent, updatedAt: prevOil.updatedAt })}
- 仍须按 rubric 结合当日新闻评估「能源冲击」；evidence 注明信息来源。`;
}

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
    keyStats:          { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" }, unit: { type: "string" }, color: { type: "string" } }, required: ["label", "value", "unit", "color"], additionalProperties: false } },
    warPhase:          { type: "object", properties: { level: { type: "string" }, targetLevel: { type: "string" }, title: { type: "string" }, subTitle: { type: "string" }, points: { type: "array", items: { type: "string" } }, note: { type: "string" } }, required: ["level", "targetLevel", "title", "subTitle", "points", "note"], additionalProperties: false },
    riskFactors:       { type: "array", items: { type: "object", properties: { name: { type: "string" }, score: { type: "number" }, prev: { type: "number" }, weight: { type: "number" }, description: { type: "string" }, status: { type: "string" }, change: { type: "string" }, evidence: { type: "string" }, sourceVerification: { type: "string", enum: ["confirmed", "partial", "unverified"] } }, required: ["name", "score", "prev", "weight", "description", "status", "change", "evidence", "sourceVerification"], additionalProperties: false } },
    events:            { type: "array", items: { type: "object", properties: { id: { type: "string" }, title: { type: "string" }, description: { type: "string" }, verification: { type: "string" }, timestamp: { type: "string" }, significance: { type: "string" }, highlight: { type: "boolean" }, critical: { type: "boolean" } }, required: ["id", "title", "description", "verification", "timestamp", "significance", "highlight", "critical"], additionalProperties: false } },
    scoreTrend:        { type: "array", items: { type: "object", properties: { date: { type: "string" }, score: { type: "number" }, active: { type: "boolean" } }, required: ["date", "score", "active"], additionalProperties: false } },
    situations:        { type: "array", items: { type: "object", properties: { title: { type: "string" }, icon: { type: "string" }, tag: { type: "string" }, tagColor: { type: "string" }, points: { type: "array", items: { type: "string" } } }, required: ["title", "icon", "tag", "tagColor", "points"], additionalProperties: false } },
    coreContradiction: { type: "object", properties: { political: { type: "array", items: { type: "string" } }, military: { type: "array", items: { type: "string" } } }, required: ["political", "military"], additionalProperties: false },
  },
  required: ["date", "version", "riskScore", "prevRiskScore", "investmentSignal", "keyChange", "keyStats", "warPhase", "riskFactors", "events", "scoreTrend", "situations", "coreContradiction"],
  additionalProperties: false,
};

const outputSchema = {
  type: "object",
  properties: { reportMarkdownZh: { type: "string" }, dataZh: dashboardSchema, dataEn: dashboardSchema },
  required: ["reportMarkdownZh", "dataZh", "dataEn"],
  additionalProperties: false,
};

// ── Prompt ──────────────────────────────────────────────────────────
const factorNamesZh = CANONICAL.zh.riskFactorNames;
const prevFactorStr = factorNamesZh.map((name, i) => `${name}: ${prevFactorScores[i]}`).join(", ");

const systemPrompt = `你是 AION Geo-Conflict Monitor 的结构化数据引擎。用 Google 搜索接地获取近 24h 美伊相关公开信息后，按 JSON Schema 输出结构化日报。

## 前一天数据（必须作为基准，不可忽略）
- 日期: ${prev.date}，版本: ${prevVersion}
- 冲突天数: D${prev.conflictDay}（冲突起始日 ${CONFIG.conflictStartDate}，**今天是 D${correctConflictDay}**）
- **昨日(${yesterdayIso})收盘综合分**（用于「较上期」）: ${priorDayComposite}（来自 score-history history；勿用与今日同日的 latest.riskScore 当作上期）
- 五维因子分: ${prevFactorStr}
- 近日综合评分历史: ${JSON.stringify(store.history.slice(-10))}

## 评分标准（Scoring Rubric）——必须严格对照打分

每个因子 1–5 分（整数），必须根据下列条件对号入座，不可凭感觉。
若 24h 内无充分多源证据支持变化，**默认沿用前一天分数**。

### 1. ${factorNamesZh[0]}
- 1 = 无任何军事活动或威胁言论
- 2 = 口头威胁/小规模兵力调动/防御部署，无实际交火
- 3 = 有限打击或代理冲突（如无人机事件、零星交火），未扩大
- 4 = 直接交火/多战线活跃/重大军事行动（如导弹互射、大规模空袭）
- 5 = 全面战争状态/大规模地面入侵/核威胁

### 2. ${factorNamesZh[1]}
- 1 = 完全正常通行，无任何限制
- 2 = 偶发骚扰或警告，流量基本正常（>90%）
- 3 = 许可制或部分限制，流量降至 50–90%
- 4 = 严重受限/扣押事件，流量降至 <50%，主要班轮暂停
- 5 = 完全封锁，商业航运停止

### 3. ${factorNamesZh[2]}
- 1 = 油价在正常区间波动（<$75），供应链正常
- 2 = 油价温和上涨（$75–85），市场紧张但可控
- 3 = 油价显著上涨（$85–100），供应担忧明显
- 4 = 油价危机水平（$100–120），供应中断或恐慌性买入
- 5 = 油价极端飙升（>$120），全球能源危机

### 4. ${factorNamesZh[3]}
- 1 = 大国未介入，仅外交关注
- 2 = 大国发表声明/制裁调整，无实质军事介入
- 3 = 大国提供军事援助/情报共享/联合军演
- 4 = 大国直接军事部署/参与作战行动
- 5 = 多个大国直接军事对抗/全球联盟对峙

### 5. ${factorNamesZh[4]}
- 1 = 正式和平协议签署或全面停火生效
- 2 = 实质性谈判进展，双方释放善意信号
- 3 = 谈判渠道存在但进展有限，停火脆弱
- 4 = 谈判停滞或破裂风险高，双方立场强硬
- 5 = 完全无谈判渠道，双方拒绝对话

### 评分纪律与交叉验证（必须遵守）
- 每个因子的 **evidence** 必须写清：依据的事实、以及**媒体/机构名称**（至少列出 Google 搜索接地用到的来源）。
- **sourceVerification** 字段只能是 \`confirmed\`、\`partial\`、\`unverified\`（含义与界面中文一致：**已证实 / 部分证实 / 未证实**）：
  - \`confirmed\`（已证实）：对「同一条实质性信息」已通过 Google 搜索接地找到 **至少两家相互独立的一级权威来源**，且事实表述一致（时间、主体、核心结论不矛盾）。**两家须为不同媒体机构**（例如 AP + Reuters；同一通讯社两篇不同稿件不算，除非另一条为白宫/UN/外交部等**官方一手声明**）。一级权威来源示例：AP、Reuters、AFP、BBC、NYT、WSJ、Financial Times、Al Jazeera English、Washington Post、政府/军方/外交部官网、联合国官方发布。社交媒体、论坛、匿名爆料、内容农场不得作为权威来源。
  - \`partial\`（部分证实）：仅有一家一级权威 + 一家次要来源互证不足，或两家一级但表述**部分**一致、关键细节未对齐；**脚本会将该因子分数强制与昨日持平**（不因部分互证上调/下调），evidence 首句须点明「部分证实：」及缺口。
  - \`unverified\`（未证实）：**仅一条**权威来源，或第二来源与第一条明显矛盾，或无法互证；**脚本强制该因子分数与昨日持平**，evidence 首句须写「未证实：」说明。能源冲击见下条例外。
- **能源冲击（第 3 项）**：若上方「实时市场数据」脚本已提供 WTI/Brent，油价档位以 **API 现货价 + rubric** 为准，可标 \`confirmed\`（evidence 写明 API 数值 + 可选一条权威新闻互证市场背景）；若**无** API 油价，则与普通因子相同，须 \`confirmed\` 才能相对昨日改分。
- 评分变化幅度限制：单日单因子变化不超过 ±1 分（除非有重大突发且 **sourceVerification=confirmed**）

### 事件卡片 verification（events）
- \`confirmed\`：≥2 家一级权威媒体报道同一事实，或 **1 份** 一级官方声明（白宫/UN/外交部官网等）且与事实直接对应。
- **油价 / 原油现货**：若本脚本已提供上方「实时市场数据」WTI/Brent，且事件主题涉及油价或现价，则 **实时 API 即视为已证实依据**，verification 填 **confirmed**（不要求双媒体；脚本也会自动将此类事件标为 confirmed）。
- \`partial\`：仅一家权威 + 一家次要来源，或两家表述部分一致（非油价现价类、且无 API 锚定）。
- \`single\`：仅单源且**非**「有 API 锚定的油价现价」类事件。

## 规则
- date 必须是 "${todayNy}"
- version: "${prevVersion}" 的下一个版本（小版本号 +1）
- keyStats[0] 冲突天数: 必须是 "D${correctConflictDay}"（不要自己算，用这个值）
- keyStats[1] 评分变化: 今日 riskScore 与 **昨日收盘综合分 ${priorDayComposite}** 的差值（如 ↑3 或 ↓2 或 持平）；脚本以此为准
- keyStats 恰好 4 项，顺序：冲突天数、评分变化、油价、霍尔木兹。每项 unit 非空
- keyStats[3] 霍尔木兹：**value** 为航道通行强度摘要（如「严重受限」）；**unit** 固定为「通行状态」。勿用「-」或仅百分比作主行（脚本会将空值/- 兜底为「严重受限」+「通行状态」）
- riskFactors 恰好 5 项，顺序：${factorNamesZh.join("、")}。weight 一律 0.2。riskScore = round(avg(scores) × 20)
- 每个 riskFactor 必须包含 **sourceVerification**（confirmed / partial / unverified），规则见上文「交叉验证」
- riskFactors 的 prev 字段必须等于前一天对应因子的 score
- events 1–5 条。verification 只能是 confirmed/partial/single。highlight/critical 不需要时设 false
- warPhase 所有字段非空；level 和 targetLevel 必须是描述性短语（如中文"脆弱停火"/"代理延续"，英文"Fragile Ceasefire"/"Proxy War"），绝不能是纯数字；points 1–3 条
- situations 恰好 4 张卡，顺序：军事行动、航运/霍尔木兹、能源市场、领导层信号。每张 points 1–3 条非空
- coreContradiction.political 和 .military 各 1–2 条非空
- scoreTrend 恰好 5 个点：脚本会按存档写入；模型可填占位，最终以脚本为准
- keyChange、investmentSignal 非空
- change 字段：有变化填 up/down/structural，无变化填 "none"
- dataZh 中文、dataEn 英文，结构完全一致，仅文案语言不同，数值相同
- reportMarkdownZh 为中文日报全文 markdown 字符串

## 信源与互证
重大事件须满足「双权威互证」或「一级官方声明」；单源事件须 verification="single"（**油价现价且已引用脚本实时 WTI/Brent 的除外**，见上文）。${oilPromptBlock}`;

// ── Gemini (2.5 Flash + Google Search 接地) ─────────────────────────
function extractText(resp) {
  if (resp == null) return "";
  if (typeof resp.text === "string" && resp.text.trim()) return resp.text.trim();
  const parts = resp?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    const t = parts.map(p => (typeof p?.text === "string" ? p.text : "")).join("");
    if (t.trim()) return t.trim();
  }
  return "";
}

/** 从 Gemini 接地响应提取搜索词与网页 chunk（uri/title）；无接地时为空 */
function extractGroundingMeta(raw) {
  const cand = raw?.candidates?.[0];
  const meta = cand?.groundingMetadata || cand?.grounding_metadata;
  if (!meta) return { webSources: [], webSearchQueries: [] };
  const queries = meta.webSearchQueries || meta.web_search_queries;
  const chunks = meta.groundingChunks || meta.grounding_chunks;
  const webSearchQueries = Array.isArray(queries) ? queries.filter(q => typeof q === "string" && q.trim()) : [];
  const webSources = [];
  const seen = new Set();
  if (Array.isArray(chunks)) {
    for (const ch of chunks) {
      const web = ch?.web || ch?.Web;
      const uri = web?.uri || web?.url;
      if (!uri || seen.has(uri)) continue;
      seen.add(uri);
      const title = typeof web?.title === "string" ? web.title.trim() : "";
      webSources.push({ title: title || uri, uri: String(uri) });
    }
  }
  return { webSources: webSources.slice(0, 32), webSearchQueries };
}

/** Gemini：Google 搜索接地与 responseMimeType: application/json 不能同时使用，接地时改为纯文本 JSON + 解析。 */
async function callGemini(withWeb) {
  const config = { systemInstruction: systemPrompt };
  if (withWeb) {
    config.tools = [{ googleSearch: {} }];
  } else {
    config.responseMimeType = "application/json";
    config.responseJsonSchema = outputSchema;
  }
  const userText = withWeb
    ? `请生成 ${todayNy} 的 AION 日报。\n\n**输出**：只输出一个 JSON 对象（不要 markdown 围栏、不要前后说明），顶层键为 reportMarkdownZh、dataZh、dataEn，结构与系统提示中的 Schema 完全一致。`
    : `请生成 ${todayNy} 的 AION 日报。`;
  return genai.models.generateContent({
    model: GEMINI_MODEL,
    contents: userText,
    config,
  });
}

async function callGeminiWithRetry(withWeb, idx) {
  for (let attempt = 1; attempt <= CONFIG.geminiMaxAttempts; attempt++) {
    try {
      return await callGemini(withWeb);
    } catch (err) {
      const msg = errorMessage(err);
      const retriable = isRetriableGeminiError(msg);
      const exhausted = attempt >= CONFIG.geminiMaxAttempts;
      if (!retriable || exhausted) {
        throw new Error(msg);
      }
      const exp = CONFIG.geminiRetryBaseMs * (2 ** (attempt - 1));
      const backoffMs = Math.min(CONFIG.geminiRetryMaxMs, exp) + Math.floor(Math.random() * 500);
      console.warn(`  Call ${idx + 1}${withWeb ? "" : " (no-grounding)"} retry ${attempt}/${CONFIG.geminiMaxAttempts - 1} after ${backoffMs}ms: ${msg}`);
      await sleep(backoffMs);
    }
  }
  throw new Error("Retry loop exited unexpectedly");
}

async function callOpenAI() {
  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `请生成 ${todayNy} 的 AION 日报。\n\n输出仅为 JSON 对象，键为 reportMarkdownZh、dataZh、dataEn。` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "aion_daily_report",
          strict: true,
          schema: outputSchema,
        },
      },
    }),
  });

  const raw = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(JSON.stringify(raw?.error || { code: resp.status, message: `HTTP ${resp.status}` }));
  }

  return {
    text: raw?.choices?.[0]?.message?.content ?? "",
    provider: "openai",
  };
}

async function callOpenAIWithRetry() {
  for (let attempt = 1; attempt <= CONFIG.geminiMaxAttempts; attempt++) {
    try {
      return await callOpenAI();
    } catch (err) {
      const msg = errorMessage(err);
      const retriable = isRetriableOpenAIError(msg);
      const exhausted = attempt >= CONFIG.geminiMaxAttempts;
      if (!retriable || exhausted) throw new Error(msg);
      const exp = CONFIG.geminiRetryBaseMs * (2 ** (attempt - 1));
      const backoffMs = Math.min(CONFIG.geminiRetryMaxMs, exp) + Math.floor(Math.random() * 500);
      console.warn(`  OpenAI fallback retry ${attempt}/${CONFIG.geminiMaxAttempts - 1} after ${backoffMs}ms: ${msg}`);
      await sleep(backoffMs);
    }
  }
  throw new Error("OpenAI retry loop exited unexpectedly");
}

function parsePayload(raw) {
  const text = extractText(raw);
  if (!text) return null;
  try { return JSON.parse(text); } catch {}
  try { return JSON.parse(text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim()); } catch { return null; }
}

function extractFactorScores(p) {
  return (p?.dataZh?.riskFactors || []).map(f => Number(f.score) || 3);
}

function buildFallbackPayload(todayIso) {
  const fallbackFactors = CANONICAL.zh.riskFactorNames.map((name, i) => ({
    name,
    score: prevFactorScores[i] ?? 3,
    prev: prevFactorScores[i] ?? 3,
    weight: 0.2,
    description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
    status: "SLOW",
    change: "none",
    evidence: "Fallback: Gemini API unavailable (503/UNAVAILABLE).",
    sourceVerification: "unverified",
  }));

  const fallbackEventsZh = [{
    id: "EVT-FALLBACK-01",
    title: "模型服务高负载，已启用自动兜底",
    description: "本次自动生成遇到上游模型服务不可用（503/UNAVAILABLE），系统已沿用上一期结构并保持评分稳定，等待下一轮任务自动刷新。",
    verification: "single",
    timestamp: `${todayIso}（当日公开报道）`,
    significance: "保障日报流水线可用性，避免因上游拥堵导致中断。",
    highlight: false,
    critical: false,
  }];
  const fallbackEventsEn = [{
    id: "EVT-FALLBACK-01",
    title: "Model overload fallback activated",
    description: "Upstream model returned 503/UNAVAILABLE. The pipeline falls back to prior-day structure and stable scores until the next run.",
    verification: "single",
    timestamp: `${todayIso} (same-day reporting)`,
    significance: "Keeps the daily pipeline available during transient upstream outages.",
    highlight: false,
    critical: false,
  }];

  const fallbackSituationsZh = CANONICAL.zh.situations.map(sit => ({
    title: sit.title,
    icon: sit.icon,
    tag: "Service Fallback",
    tagColor: "orange",
    points: ["模型暂不可用，当前卡片内容沿用上一期结构。"],
  }));
  const fallbackSituationsEn = CANONICAL.en.situations.map(sit => ({
    title: sit.title,
    icon: sit.icon,
    tag: "Service Fallback",
    tagColor: "orange",
    points: ["Model temporarily unavailable; cards keep prior-day structure."],
  }));

  const make = (lang) => ({
    date: todayIso,
    version,
    riskScore: priorDayComposite,
    prevRiskScore: priorDayComposite,
    investmentSignal: lang === "zh" ? "模型服务拥堵，维持风险中性敞口。" : "Model congested; keep neutral risk exposure.",
    keyChange: lang === "zh" ? "上游模型暂不可用，本期沿用上一期基线。" : "Upstream model unavailable; baseline carried over.",
    keyStats: [
      { label: CANONICAL[lang].keyStatLabels[0], value: `D${correctConflictDay}`, unit: CANONICAL[lang].keyStatUnitsFixed[0], color: CANONICAL[lang].keyStatColors[0] },
      { label: CANONICAL[lang].keyStatLabels[1], value: lang === "zh" ? "持平" : "Flat", unit: CANONICAL[lang].keyStatUnitsFixed[1], color: CANONICAL[lang].keyStatColors[1] },
      { label: CANONICAL[lang].keyStatLabels[2], value: "-", unit: CANONICAL[lang].keyStatDefaultUnits34[0], color: CANONICAL[lang].keyStatColors[2] },
      { label: CANONICAL[lang].keyStatLabels[3], value: lang === "zh" ? "严重受限" : "Severely Restricted", unit: CANONICAL[lang].keyStatDefaultUnits34[1], color: CANONICAL[lang].keyStatColors[3] },
    ],
    warPhase: {
      level: lang === "zh" ? "服务兜底阶段" : "Fallback mode",
      targetLevel: lang === "zh" ? "等待自动刷新" : "Await next run",
      title: lang === "zh" ? "模型服务高负载，已切换兜底输出" : "Model overloaded; fallback output enabled",
      subTitle: lang === "zh" ? "本期保留结构与分数连续性" : "Structure and score continuity preserved",
      points: [lang === "zh" ? "下一次定时任务将自动重试并恢复正常生成。" : "Next scheduled run will retry automatically."],
      note: lang === "zh" ? "兜底内容仅用于连续性展示，不构成投资建议。" : "Fallback output is for continuity only, not investment advice.",
    },
    riskFactors: fallbackFactors,
    events: lang === "zh" ? fallbackEventsZh : fallbackEventsEn,
    scoreTrend: [],
    situations: lang === "zh" ? fallbackSituationsZh : fallbackSituationsEn,
    coreContradiction: {
      political: [lang === "zh" ? "上游模型服务可用性波动导致当期生成降级。" : "Upstream model availability fluctuation forced degraded generation."],
      military: [lang === "zh" ? "风险分数暂沿用上一期，等待下一次自动刷新。" : "Risk scores are carried over until the next refresh."],
    },
  });

  return {
    reportMarkdownZh: `# AION 日报（自动兜底）\n\n- 日期：${todayIso}\n- 说明：上游模型服务暂不可用（503/UNAVAILABLE），本期沿用上一期基线并保持结构完整。\n- 处理：系统将于下一次定时任务自动重试。\n`,
    dataZh: make("zh"),
    dataEn: make("en"),
  };
}

// ── Ensemble call ──────────────────────────────────────────────────
console.log(`Generating AION daily report for ${todayNy} (${CONFIG.ensembleN}x ensemble) ...`);

async function singleCall(idx) {
  for (const withWeb of [true, false]) {
    try {
      const raw = await callGeminiWithRetry(withWeb, idx);
      const p = parsePayload(raw);
      if (p) {
        const { webSources, webSearchQueries } = extractGroundingMeta(raw);
        const srcHint = webSources.length ? `, grounding=${webSources.length} urls` : "";
        console.log(`  Call ${idx + 1}${withWeb ? "" : " (no-grounding)"}: factors=[${extractFactorScores(p).join(",")}]${srcHint}`);
        return { parsed: p, grounding: { webSources, webSearchQueries } };
      }
    } catch (err) {
      console.warn(`  Call ${idx + 1}${withWeb ? "" : " (no-grounding)"} failed: ${errorMessage(err)}`);
    }
  }
  return null;
}

const results = [];
for (let i = 0; i < CONFIG.ensembleN; i++) {
  // 串行执行可降低并发尖峰导致的 503 / UNAVAILABLE 概率
  results.push(await singleCall(i));
}
const validResults = results.filter(Boolean);

if (!validResults.length) {
  await mkdir(PATHS.reports, { recursive: true });
  await writeFile(path.join(PATHS.reports, `${todayNy}.ensemble-fail.json`), JSON.stringify(results, null, 2), "utf8");
  console.warn("All Gemini calls failed; trying OpenAI fallback...");
  try {
    const oaRaw = await callOpenAIWithRetry();
    const oaParsed = parsePayload(oaRaw);
    if (!oaParsed) throw new Error("OpenAI returned non-JSON or schema-mismatched output");
    console.log(`  OpenAI fallback succeeded: model=${OPENAI_MODEL}`);
    validResults.push({
      parsed: oaParsed,
      grounding: { webSources: [], webSearchQueries: [] },
    });
  } catch (err) {
    console.warn(`  OpenAI fallback failed: ${errorMessage(err)}`);
    console.warn("  Using static baseline fallback payload.");
    validResults.push({
      parsed: buildFallbackPayload(todayNy),
      grounding: { webSources: [], webSearchQueries: [] },
    });
  }
}

// ── Ensemble scoring with guardrails ───────────────────────────────
const allFactorSets = validResults.map(r => extractFactorScores(r.parsed));
const medianFactors = Array.from({ length: 5 }, (_, fi) => median(allFactorSets.map(set => set[fi] ?? 3)));
console.log(`Ensemble median: [${medianFactors.join(",")}]`);

let finalFactors = medianFactors.map((med, i) => {
  const col = allFactorSets.map(set => set[i] ?? 3);
  const range = Math.max(...col) - Math.min(...col);
  if (range > 2) {
    console.warn(`  ⚠ ${factorNamesZh[i]}: range=${range} → clamp to prev=${prevFactorScores[i]}`);
    return prevFactorScores[i];
  }
  if (Math.abs(med - prevFactorScores[i]) > 1 && validResults.length < 3) {
    console.warn(`  ⚠ ${factorNamesZh[i]}: large Δ with few samples → clamp to prev=${prevFactorScores[i]}`);
    return prevFactorScores[i];
  }
  return med;
});

// Pick content source closest to median total (before dual-source policy clamp)
const medianTotal = finalFactors.reduce((a, b) => a + b, 0);
let payload = validResults[0].parsed;
let winningGrounding = validResults[0].grounding || { webSources: [], webSearchQueries: [] };
let bestDist = Infinity;
for (const r of validResults) {
  const dist = Math.abs(extractFactorScores(r.parsed).reduce((a, b) => a + b, 0) - medianTotal);
  if (dist < bestDist) {
    bestDist = dist;
    payload = r.parsed;
    winningGrounding = r.grounding || { webSources: [], webSearchQueries: [] };
  }
}

// 仅「已证实」(confirmed) 或能源+实时油价 API 允许相对昨日保留 ensemble 分数；部分证实/未证实 → 与昨日持平
const rfSv = payload?.dataZh?.riskFactors || [];
finalFactors = finalFactors.map((sc, i) => {
  const sv = rfSv[i]?.sourceVerification;
  const legacy = sv === "dual" ? "confirmed" : sv === "single" ? "unverified" : sv;
  const isConfirmed = legacy === "confirmed";
  const energyExempt = i === 2 && oilSnapshot.ok;
  if (isConfirmed || energyExempt) return sc;
  if (sc !== prevFactorScores[i]) {
    console.warn(`  ⚠ ${factorNamesZh[i]}: sourceVerification=${legacy ?? "missing"} → clamp to prev=${prevFactorScores[i]} (需要已证实或能源API)`);
  }
  return prevFactorScores[i];
});

const finalRiskScore = Math.round(finalFactors.reduce((a, b) => a + b, 0) / 5 * 20);
if (Math.abs(finalRiskScore - priorDayComposite) > 20) {
  console.warn(`  ⚠ Large swing vs prior day: ${priorDayComposite} → ${finalRiskScore}`);
}
console.log(`Final: factors=[${finalFactors.join(",")}] riskScore=${finalRiskScore} (priorDay=${priorDayComposite}, Δ=${finalRiskScore - priorDayComposite})`);

// Override factor scores in payload
for (const lang of ["dataZh", "dataEn"]) {
  (payload[lang]?.riskFactors || []).forEach((f, i) => { f.score = finalFactors[i]; });
}

// ── Update history ─────────────────────────────────────────────────
const histMap = new Map(store.history.map(p => [p.date, p.score]));
histMap.set(todayNy, finalRiskScore);
store.history = [...histMap.entries()].map(([date, score]) => ({ date, score })).sort((a, b) => a.date.localeCompare(b.date)).slice(-120);
const oilForStore = oilSnapshot.ok
  ? { wti: oilSnapshot.wti, brent: oilSnapshot.brent, updatedAt: oilSnapshot.updatedAt }
  : prev.oilPrice;
store.latest = {
  date: todayNy,
  appVersion: version,
  riskScore: finalRiskScore,
  prevRiskScore: priorDayComposite,
  conflictDay: correctConflictDay,
  factorScores: [...finalFactors],
  ...(oilForStore ? { oilPrice: oilForStore } : {}),
};
store.version = 2;
await saveHistory(store);

const scoreTrend = buildFiveDayTrend(store.history, todayNy, priorDayComposite);
console.log(`History saved; trend: ${scoreTrend.map(p => `${p.date}:${p.score}`).join(", ")}`);

// ── Post-process: enforce canonical layout ──────────────────────────
const scoreDelta = finalRiskScore - priorDayComposite;

/** 事件主题含油价/现货原油且脚本有实时 API → 视为已证实（不要求双媒体） */
function eventIsOilPriceWithLiveApi(ev, oil) {
  if (!oil?.ok) return false;
  const t = `${s(ev.title)} ${s(ev.description)}`;
  return /油价|WTI|Brent|原油|油市|oil price|crude|barrel|\/bbl|美元\/桶|spot/i.test(t);
}

/** 将 evidence/描述拆成 1–3 条，供态势卡 bullet 使用 */
function splitEvidenceToPoints(text, lang) {
  const t = s(text).trim();
  if (!t) return [];
  if (lang === "zh") {
    return t
      .split(/(?<=[。！？])\s*/)
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 3);
  }
  return t
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function isPlaceholderSituationPoints(points, lang) {
  if (!Array.isArray(points) || !points.length) return true;
  return points.every((p) => {
    const x = s(p).trim();
    if (lang === "zh") return /^(详见风险因子[。]?)$/.test(x);
    return /^See risk factors\.?$/i.test(x);
  });
}

function enforceLayout(d, lang) {
  const c = CANONICAL[lang];
  d.date = todayNy;
  d.version = version;
  d.riskScore = finalRiskScore;
  d.prevRiskScore = priorDayComposite;

  // riskFactors
  const rf = Array.isArray(d.riskFactors) ? d.riskFactors : [];
  const validStatus = ["NORMAL", "AT CEILING", "FAST", "SLOW"];
  const validChange = ["up", "down", "structural"];
  d.riskFactors = c.riskFactorNames.map((name, i) => {
    const src = rf[i] || {};
    const svRaw = src.sourceVerification;
    let sourceVerification = svRaw === "confirmed" || svRaw === "partial" || svRaw === "unverified" ? svRaw : "unverified";
    if (svRaw === "dual") sourceVerification = "confirmed";
    if (svRaw === "single") sourceVerification = "unverified";
    const out = {
      name,
      score: finalFactors[i],
      prev: prevFactorScores[i],
      weight: 0.2,
      /** 模型常把长叙述放在 evidence；description 空时沿用 evidence，供 UI/态势卡兜底使用 */
      description: s(src.description) || s(src.evidence) || "",
      status: validStatus.includes(src.status) ? src.status : "FAST",
      sourceVerification,
      ...(validChange.includes(src.change) ? { change: src.change } : {}),
    };
    if (src.evidence) out._evidence = s(src.evidence);
    return out;
  });

  // keyStats
  const ks = Array.isArray(d.keyStats) ? d.keyStats : [];
  d.keyStats = c.keyStatLabels.map((label, i) => {
    let value = s(ks[i]?.value, "-");
    let unitExtra = s(ks[i]?.unit).trim();
    if (i === 0) value = `D${correctConflictDay}`;
    if (i === 1) value = scoreDelta > 0 ? `↑${scoreDelta}` : scoreDelta < 0 ? `↓${Math.abs(scoreDelta)}` : (lang === "zh" ? "持平" : "Flat");
    if (i === 2 && oilSnapshot.ok) {
      const parts = [];
      if (oilSnapshot.wti != null) parts.push(`WTI $${Math.round(oilSnapshot.wti)}`);
      if (oilSnapshot.brent != null) parts.push(`Brent $${Math.round(oilSnapshot.brent)}`);
      if (parts.length) {
        value = parts.join(" / ");
        unitExtra = "USD/bbl";
      }
    }
    if (i === 3) {
      const raw = s(ks[i]?.value).trim();
      if (!raw || raw === "-" || raw === "—") {
        value = lang === "zh" ? "严重受限" : "Severely Restricted";
      }
    }
    return {
      label, value,
      unit: i < 2 ? c.keyStatUnitsFixed[i] : (unitExtra || c.keyStatDefaultUnits34[i - 2]),
      color: s(ks[i]?.color, c.keyStatColors[i]),
    };
  });

  // scoreTrend from authoritative history
  d.scoreTrend = scoreTrend.map((p, idx) => ({ date: p.date, score: idx === 4 ? finalRiskScore : p.score, ...(idx === 4 ? { active: true } : {}) }));

  // situations
  const sit = Array.isArray(d.situations) ? d.situations : [];
  d.situations = c.situations.map((meta, i) => ({
    title: meta.title, icon: meta.icon,
    tag: s(sit[i]?.tag), tagColor: s(sit[i]?.tagColor, "orange"),
    points: (Array.isArray(sit[i]?.points) ? sit[i].points : []).filter(Boolean).slice(0, 3),
  }));

  // events
  d.events = (Array.isArray(d.events) ? d.events : []).slice(0, 5).map((e, i) => {
    let verification = ["confirmed", "partial", "single"].includes(e.verification) ? e.verification : "single";
    if (eventIsOilPriceWithLiveApi(e, oilSnapshot)) verification = "confirmed";
    let ts = s(e.timestamp);
    if (!ts || ts === "AUTO") {
      ts = lang === "zh" ? `${todayNy}（当日公开报道）` : `${todayNy} (same-day reporting)`;
    }
    const obj = {
      id: s(e.id, `EVT-${String(i + 1).padStart(2, "0")}`),
      title: s(e.title), description: s(e.description),
      verification,
      timestamp: ts, significance: s(e.significance),
    };
    if (e.highlight === true) obj.highlight = true;
    if (e.critical === true) obj.critical = true;
    return obj;
  });

  // warPhase
  const wp = d.warPhase || {};
  const validPhase = (v) => { const t = s(v).trim(); return t && !/^\d+$/.test(t) ? t : ""; };
  d.warPhase = {
    level: validPhase(wp.level) || (lang === "zh" ? "阶段评估" : "Phase assessment"),
    targetLevel: validPhase(wp.targetLevel) || (lang === "zh" ? "动态跟踪" : "Tracking"),
    title: s(wp.title) || (lang === "zh" ? "美伊地缘风险监测" : "US–Iran geo-risk snapshot"),
    subTitle: s(wp.subTitle) || (lang === "zh" ? "基于公开报道综合研判" : "Synthesized from public sources"),
    points: (Array.isArray(wp.points) ? wp.points : []).filter(Boolean).slice(0, 3),
    note: s(wp.note) || (lang === "zh" ? "监测用途，不构成投资建议。" : "For monitoring only; not investment advice."),
  };
  if (!d.warPhase.points.length) d.warPhase.points = [s(d.riskFactors[0]?.description) || (lang === "zh" ? "详见下方事件卡片。" : "See event cards below.")];

  // coreContradiction
  const cc = d.coreContradiction || {};
  d.coreContradiction = {
    political: (Array.isArray(cc.political) ? cc.political : []).filter(Boolean).slice(0, 2),
    military: (Array.isArray(cc.military) ? cc.military : []).filter(Boolean).slice(0, 2),
  };
  if (!d.coreContradiction.political.length) d.coreContradiction.political = [s(d.riskFactors[4]?.description) || (lang === "zh" ? "外交路径仍存变数。" : "Diplomatic path uncertain.")];
  if (!d.coreContradiction.military.length) d.coreContradiction.military = [s(d.riskFactors[0]?.description) || (lang === "zh" ? "军事通道未关闭。" : "Military channels remain open.")];

  // fallbacks
  if (!s(d.investmentSignal).trim()) d.investmentSignal = lang === "zh" ? "维持风险平衡敞口。" : "Maintain balanced exposure.";
  if (!s(d.keyChange).trim()) d.keyChange = lang === "zh" ? "24h要点：详见事件与因子。" : "24h: See events and factors.";
  d.situations = d.situations.map((sit, i) => {
    if (isPlaceholderSituationPoints(sit.points, lang)) {
      const rf = d.riskFactors[i];
      const text = s(rf?.description) || s(rf?._evidence);
      const bullets = splitEvidenceToPoints(text, lang);
      sit.points = bullets.length
        ? bullets
        : [lang === "zh" ? "详见风险因子。" : "See risk factors."];
    }
    return sit;
  });

  return d;
}

// Apply layout to ZH (primary), then sync numerics to EN
enforceLayout(payload.dataZh, "zh");
enforceLayout(payload.dataEn, "en");

// Sync: EN gets all numeric fields from ZH
const zh = payload.dataZh;
const en = payload.dataEn;
en.riskScore = zh.riskScore;
en.prevRiskScore = zh.prevRiskScore;
en.scoreTrend = JSON.parse(JSON.stringify(zh.scoreTrend));
en.keyStats[0].value = zh.keyStats[0].value;
en.keyStats[2].value = zh.keyStats[2].value;
en.keyStats[2].unit = zh.keyStats[2].unit;
en.riskFactors.forEach((f, i) => {
  f.score = zh.riskFactors[i].score;
  f.prev = zh.riskFactors[i].prev;
  f.weight = zh.riskFactors[i].weight;
  f.sourceVerification = zh.riskFactors[i].sourceVerification;
  if (zh.riskFactors[i].change) f.change = zh.riskFactors[i].change;
  else delete f.change;
});

// 与当日选中 ensemble 候选同一次 Gemini 响应中的 Google 搜索接地引用
zh.webSources = winningGrounding.webSources;
zh.webSearchQueries = winningGrounding.webSearchQueries;
en.webSources = winningGrounding.webSources;
en.webSearchQueries = winningGrounding.webSearchQueries;

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

validate(zh, "dataZh");
validate(en, "dataEn");
console.log("Validation passed.");

// Log & strip evidence
for (const f of zh.riskFactors) { if (f._evidence) { console.log(`  [evidence] ${f.name}: ${f._evidence}`); delete f._evidence; } }
for (const f of en.riskFactors) { delete f._evidence; }

// ── Write report ───────────────────────────────────────────────────
await mkdir(PATHS.reports, { recursive: true });
await writeFile(path.join(PATHS.reports, `${todayNy}.md`), payload.reportMarkdownZh + "\n", "utf8");

// ── Generate data.ts (template, not text surgery) ──────────────────
function toTsLiteral(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, "$1:");
}

const [, mo, da] = todayNy.split("-").map(Number);
const monthShort = new Date(Date.UTC(Number(todayNy.slice(0, 4)), mo - 1, da)).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
const deltaLabel = { zh: s(zh.keyStats[1]?.value, "—"), en: s(en.keyStats[1]?.value, "—") };

const TRANSLATIONS_OBJ = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: `${mo}月${da}日节点`,
    riskScoreTitle: "地 缘 冲 突\\n风 险 评 分",
    weightedScore: "加 权 评 分",
    vsPrev: "较上期",
    trendTitle: "评分趋势",
    investmentSignal: "投资风险信号",
    conflictPhase: "冲 突 阶 段 评 估",
    importantChange: "关键结构性变化",
    observationNodes: "关键观察节点",
    event: "事件",
    verified: "已证实",
    singleSource: "单一来源",
    partialVerify: "部分互证",
    factorVerified: "已证实",
    factorPartial: "部分证实",
    factorUnverified: "未证实",
    keyChange: "关键变化",
    judgementSignificance: "研判意义",
    source: "来源",
    time: "时间",
    weight: "权重",
    atCeiling: "已触顶",
    structuralChange: "结构变化",
    fastVar: "快变量",
    slowVar: "慢变量",
    coreContradiction: "本期核心矛盾",
    politicalLevel: "政治层面",
    militaryLevel: "军事 / 结构层面",
    lowRisk: "低风险",
    highRisk: "高风险",
    extremeRisk: "极端风险",
    keyEvents: "关键事件",
    riskFactors: "风险因子",
    situationAnalysis: "态势分析",
    systemInfo: `AION 智能分析系统 · 地缘冲突模块 ${version} · Daily`,
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: `综合评分 ${zh.riskScore}（${deltaLabel.zh}）：${clip(zh.keyChange, 140)}`,
    bannerWarning: clip(s(zh.investmentSignal).replace(/^[「"]|[」"]$/g, ""), 120) || "保留风险对冲。",
    deescalationIntent: clip(zh.coreContradiction.political[0] || zh.riskFactors[4]?.description, 80),
    structuralRisk: clip(zh.riskFactors[1]?.description || "", 100) || "咽喉与航运条件仍影响流量。",
    contradictionNote: clip([zh.coreContradiction.political[0], zh.coreContradiction.military[0]].filter(Boolean).join("；"), 160),
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: `${s(zh.keyStats[0]?.value, "D?").replace("D", "第")}天`,
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分",
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: `${monthShort} ${da} Node`,
    riskScoreTitle: "GEO-CONFLICT\\nRISK SCORE",
    weightedScore: "WEIGHTED SCORE",
    vsPrev: "vs Prev",
    trendTitle: "Score Trend",
    investmentSignal: "Investment Risk Signal",
    conflictPhase: "CONFLICT PHASE ASSESSMENT",
    importantChange: "Key Structural Change",
    observationNodes: "Key Observation Nodes",
    event: "Event",
    verified: "VERIFIED",
    singleSource: "SINGLE SOURCE",
    partialVerify: "PARTIAL",
    factorVerified: "Verified",
    factorPartial: "Partially verified",
    factorUnverified: "Unverified",
    keyChange: "KEY CHANGE",
    judgementSignificance: "Significance",
    source: "Source",
    time: "Time",
    weight: "Weight",
    atCeiling: "AT CEILING",
    structuralChange: "STRUCTURAL",
    fastVar: "FAST VAR",
    slowVar: "SLOW VAR",
    coreContradiction: "CORE CONTRADICTION",
    politicalLevel: "POLITICAL",
    militaryLevel: "MILITARY / STRUCTURAL",
    lowRisk: "Low Risk",
    highRisk: "High Risk",
    extremeRisk: "Extreme Risk",
    keyEvents: "Key Events",
    riskFactors: "Risk Factors",
    situationAnalysis: "Situation Analysis",
    systemInfo: `AION Intelligence System · Geo-Conflict Module ${version} · Daily`,
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: `Composite ${en.riskScore} (${deltaLabel.en}): ${clip(en.keyChange, 140)}`,
    bannerWarning: clip(en.investmentSignal, 120) || "Keep hedges.",
    deescalationIntent: clip(en.coreContradiction.political[0] || en.riskFactors[4]?.description, 80),
    structuralRisk: clip(en.riskFactors[1]?.description || "", 100) || "Chokepoint conditions still matter.",
    contradictionNote: clip([en.coreContradiction.political[0], en.coreContradiction.military[0]].filter(Boolean).join("; "), 160),
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: s(en.keyStats[0]?.value, "D?").replace("D", "Day "),
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE",
  },
};

// Fix escaped newlines in riskScoreTitle
TRANSLATIONS_OBJ.zh.riskScoreTitle = "地 缘 冲 突\n风 险 评 分";
TRANSLATIONS_OBJ.en.riskScoreTitle = "GEO-CONFLICT\nRISK SCORE";

const interfaceBlock = `export interface RiskFactor {
  name: string;
  score: number;
  prev: number;
  weight: number;
  description: string;
  /** UI: 已证实 / 部分证实 / 未证实 */
  sourceVerification?: "confirmed" | "partial" | "unverified";
  status?: "NORMAL" | "AT CEILING" | "FAST" | "SLOW";
  change?: "up" | "down" | "structural";
}

export interface KeyEvent {
  id: string;
  title: string;
  description: string;
  verification: "confirmed" | "partial" | "single";
  critical?: boolean;
  timestamp?: string;
  significance?: string;
  highlight?: boolean;
}

export interface SituationCard {
  title: string;
  icon: string;
  tag?: string;
  tagColor?: string;
  points: string[];
}

export interface DashboardData {
  date: string;
  version: string;
  /** Gemini 接地返回的网页标题与链接（与 ensemble 所选候选同一次调用） */
  webSources?: { title: string; uri: string }[];
  /** 模型实际发起的搜索词（便于核对时效与检索范围） */
  webSearchQueries?: string[];
  keyStats: {
    label: string;
    value: string;
    unit: string;
    color: string;
  }[];
  warPhase: {
    level: string;
    targetLevel: string;
    title: string;
    subTitle: string;
    points: string[];
    note: string;
  };
  riskScore: number;
  prevRiskScore: number;
  investmentSignal: string;
  riskFactors: RiskFactor[];
  events: KeyEvent[];
  keyChange: string;
  scoreTrend: { date: string; score: number; active?: boolean }[];
  situations: SituationCard[];
  coreContradiction: {
    political: string[];
    military: string[];
  };
}`;

const dataTs = `${interfaceBlock}

export const DATA_ZH: DashboardData = ${toTsLiteral(zh)};

export const DATA_EN: DashboardData = ${toTsLiteral(en)};

export const TRANSLATIONS = ${toTsLiteral(TRANSLATIONS_OBJ)};

export const INITIAL_DATA = DATA_ZH;
`;

await writeFile(PATHS.dataTs, dataTs, "utf8");
console.log("Done. Updated src/data.ts and wrote report.");
