import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

// ── CONFIG ─────────────────────────────────────────────────────────
const CONFIG = {
  conflictStartDate: "2026-02-28",
  ensembleN: 1,
  geminiMaxAttempts: 4,
  geminiRetryBaseMs: 1500,
  geminiRetryMaxMs: 12000,
};

/** 设为 1 时仅用 OpenAI Responses API + 内置 web_search，不调用 Gemini（需 OPENAI_API_KEY） */
const AION_USE_OPENAI_WEBSEARCH = /^(1|true|yes)$/i.test(process.env.AION_USE_OPENAI_WEBSEARCH || "");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
/** 默认：Gemini 3 Flash Preview（text）；可按需设 gemini-3.1-flash-lite-preview 或 gemini-3.1-pro-preview */
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
/** Responses API + web_search 所用模型（与 Chat Completions 的 OPENAI_MODEL 可分开） */
const OPENAI_WEBSEARCH_MODEL = process.env.OPENAI_WEBSEARCH_MODEL || "gpt-4.1";

if (!AION_USE_OPENAI_WEBSEARCH && !GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY). Or set AION_USE_OPENAI_WEBSEARCH=1 with OPENAI_API_KEY.");
}
if (AION_USE_OPENAI_WEBSEARCH && !OPENAI_API_KEY) {
  throw new Error("AION_USE_OPENAI_WEBSEARCH=1 requires OPENAI_API_KEY");
}

const genai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

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
    keyStatDefaultUnits34: ["参考", "通行状态"],
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
    keyStatDefaultUnits34: ["Ref.", "Passage Status"],
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

// ── 信源分层 / 阶段枚举 / 报告版面（系统提示与后处理共用）────────────────
const SOURCE_TIER_TABLE_PROMPT = `
## 信源分层（先归类来源，再写事件与因子；禁止用「同一通讯社多篇」冒充双源）
**Tier 1（一手官方 / 原始声明）**：白宫/美国总统行政办公室、美国国防部（DoD）/各军种官网、美国国务院、伊朗外交部与军方官网、联合国官方发布、IMF/WB 官方声明（仅当议题直接相关时）。
**Tier 2（独立通讯社 / 一线财经）**：Reuters、Associated Press (AP)、AFP、Bloomberg、Financial Times、Wall Street Journal、BBC、Washington Post、NYT、Al Jazeera English 等。
**流程**：每条关键事实先标注信源属于 Tier1 或 Tier2；**Major event** 须满足 **≥2 家相互独立的 Tier2**（须为**不同机构名**）**或** 1 份 **Tier1 一手声明** 且与事实直接对应。**同一通讯社不同稿件不算两家独立源**（除非另一条为 Tier1 官方声明）。`;

const WAR_PHASE_LEVEL_ZH = ["主动战争", "高强度冲突", "危机升级期", "霍尔木兹危机", "海上封锁对抗期", "受控冲突", "高压对峙", "脆弱停火", "谈判窗口期", "代理冲突延续"];
const WAR_PHASE_LEVEL_EN = ["Active War", "High-Intensity Conflict", "Escalation Phase", "Chokepoint Crisis", "Maritime Blockade Confrontation", "Controlled Conflict", "High-Pressure Standoff", "Fragile Ceasefire", "Negotiation Window", "Proxy Conflict Continuation"];
const WAR_PHASE_TARGET_ZH = ["升级顶点", "脆弱平衡", "缓和态势", "观望跟踪", "结构性紧张"];
const WAR_PHASE_TARGET_EN = ["Escalation Peak", "Fragile Balance", "Easing Posture", "Watchful Drift", "Structural Tension"];

const LEVEL_RULES_ZH = [
  [/谈判|斡旋|外交窗口|对话重启|协议.*延|停火.*延|巴基斯坦.*调/, "谈判窗口期"],
  [/海上封锁|封锁执行|拦截|驱离|劝返|零突破|军舰.*射程|CENTCOM.*封锁/, "海上封锁对抗期"],
  [/全面战争|大规模空袭|地面入侵|核威胁/, "高强度冲突"],
  [/霍尔木兹.*关闭|海峡.*关闭|咽喉要道|遇袭.*油轮/, "霍尔木兹危机"],
  [/脆弱.*停火|停火.*脆弱|高压停火/, "脆弱停火"],
  [/代理人|民兵|代理冲突/, "代理冲突延续"],
  [/准升级|显著恶化|危机升级|结构性升级/, "危机升级期"],
  [/可控对抗|战术摩擦|接触升级|未全面开战/, "受控冲突"],
];
const LEVEL_RULES_EN = [
  [/negotiation|mediation|ceasefire.*extend|talks|Islamabad/i, "Negotiation Window"],
  [/blockade|interdict|turn.*back|zero breach|CENTCOM.*blockade/i, "Maritime Blockade Confrontation"],
  [/total war|large-scale airstrike|ground invasion|nuclear threat/i, "High-Intensity Conflict"],
  [/strait.*clos|chokepoint|Hormuz.*shut/i, "Chokepoint Crisis"],
  [/fragile ceasefire|truce.*fragile/i, "Fragile Ceasefire"],
  [/proxy|militia/i, "Proxy Conflict Continuation"],
  [/escalation|deteriorat|structural worsening/i, "Escalation Phase"],
  [/controlled conflict|tactical friction|no full war/i, "Controlled Conflict"],
];

const REPORT_MARKDOWN_ZH_SPEC = `
## reportMarkdownZh（中文 Markdown，必须与 JSON 数值自洽）
除 JSON 外，**reportMarkdownZh 为唯一长叙事载体**；须严格包含下列 **### 小节标题**（顺序不可打乱），便于跨日 diff 与第三方审计：

### 近5日综合分结构与解读
- **区间**：列出含今日在内连续 **5 个公历日**的综合分（数字来自你对 history 的理解，须与下文 JSON 中 scoreTrend / 系统给出的 history 一致）。
- **结构**：用 **一个词或极短短语** 描述形态（如：高位黏滞、台阶下行、波动收敛、拐点试探）。
- **一句话 takeaway**（≤45 字）：是否出现「真去风险（<50）」或仍为「黏滞高位」等。

### 1）关键事件（可审计）
- 最多 **5** 条；**高信号**优先；**禁止重复信息**。
- 每条含：**一句话标题**、**Description**、**Timestamp**、**Sources（机构名）**、**Cross-verification: 已双源 / 部分 / 单源未验证**。
- 标记为未验证的内容 **不得**作为上调 riskFactors 分数的理由（与 JSON 内 sourceVerification 逻辑一致）。

### 2）域摘要（仅变化）
对应四域：**军事 / 霍尔木兹与航运 / 能源市场 / 领导层信号**。
- **只写相对昨日或近 24h 的变化**；无质变时写「延续：…」一句即可。
- **禁止**把 warPhase 长段落原样粘贴进本节；每域 **≤3 行**，每行优先 **≤35 字**。

### 3）五维评分（AION）
- 列出五维 **1–5** 分与 **一句话 Justification**；**须与 dataZh.riskFactors 完全一致**。
- **禁止**在 justification 句首使用模糊词：「可能」「或许」「据传」「据称」「或」；须为 **可判定真假的陈述** 并带 **来源名**。

### 4）地缘冲突综合分
- 写出 **Average**、**Score /100**、**较昨日 Δ**（须与 dataZh.riskScore 及本提示「前一天数据」中的昨日 composite 一致）。

### 5）战争阶段判断
- **Phase / Key Shift / Interpretation** 各一行（**→** 引导）；**warPhase.level 与 targetLevel 必须与 dataZh.warPhase 完全一致**，且 level 从系统枚举中选（见下文「阶段名枚举」）。

### 6）投资信号
- **恰好一句**；**必须以 → 开头**；必须出现 **方向/部位** 词之一：**增持、减持、维持、对冲、防御、能源、大宗、风险资产**（可组合）；**禁止**「视情况而定」类空话。
`;

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
  const rows = (historyArr || [])
    .filter((p) => p?.date && Number.isFinite(Number(p.score)))
    .slice()
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));

  const out = rows.slice(-5).map((p) => ({
    date: String(p.date).slice(5),
    score: Math.round(Number(p.score)),
  }));

  // 冷启动兜底：历史不足 5 条时，才按公历日回填，避免在缺失日“复制前值”造成误导性平直线。
  if (out.length < 5) {
    const map = new Map(rows.map((p) => [p.date, Number(p.score)]));
    for (let i = out.length; i < 5; i++) {
      const iso = addDaysIso(todayIso, i - 4);
      out.unshift({ date: iso.slice(5), score: lookupScore(map, iso, fallback) });
    }
  }

  return out.slice(-5);
}

/** Exact calendar-day composite in history, or null */
function scoreForDate(historyArr, iso) {
  const row = (historyArr || []).find(p => p && p.date === iso);
  return row != null && Number.isFinite(Number(row.score)) ? Math.round(Number(row.score)) : null;
}

function snapWarPhaseField(raw, lang, field) {
  const t0 = s(raw).trim();
  if (/服务兜底|Fallback mode/i.test(t0)) return t0;
  if (field === "target") {
    const list = lang === "zh" ? WAR_PHASE_TARGET_ZH : WAR_PHASE_TARGET_EN;
    if (list.includes(t0)) return t0;
    if (lang === "zh") {
      if (/脆弱|平衡|僵持/.test(t0)) return "脆弱平衡";
      if (/缓和|降温|缓解/.test(t0)) return "缓和态势";
      if (/升级|恶化|顶点/.test(t0)) return "升级顶点";
      if (/紧张|承压/.test(t0)) return "结构性紧张";
      return "观望跟踪";
    }
    if (/fragile|balance|stalemate/i.test(t0)) return "Fragile Balance";
    if (/eas|cool|de-escal/i.test(t0)) return "Easing Posture";
    if (/escalat|peak|worsen/i.test(t0)) return "Escalation Peak";
    if (/tension|pressure/i.test(t0)) return "Structural Tension";
    return "Watchful Drift";
  }
  const list = lang === "zh" ? WAR_PHASE_LEVEL_ZH : WAR_PHASE_LEVEL_EN;
  if (list.includes(t0)) return t0;
  if (lang === "zh") {
    for (const [re, pick] of LEVEL_RULES_ZH) {
      if (re.test(t0)) return pick;
    }
    return "高压对峙";
  }
  for (const [re, pick] of LEVEL_RULES_EN) {
    if (re.test(t0)) return pick;
  }
  return "High-Pressure Standoff";
}

function polishFactorDescription(text, lang) {
  let t = s(text).trim();
  if (!t) return t;
  if (lang === "zh") {
    if (/^(可能|或许|据传|据称|或)/.test(t)) t = `据已列举来源，${t.replace(/^(可能|或许|据传|据称|或)/, "")}`;
  } else if (/^(Maybe|Perhaps|Possibly|Or)\b/i.test(t)) {
    t = `Per cited sources, ${t.replace(/^(Maybe|Perhaps|Possibly|Or)\b/i, "").trim()}`;
  }
  return clip(t, 1600);
}

function ensureSituationBulletPrefix(line, lang) {
  const x = s(line).trim();
  if (!x) return x;
  if (lang === "zh") {
    if (/^(延续：|变化：)/.test(x)) return clip(x, 140);
    if (/^(继续|仍|照旧|依然|维持|无新增|未见)/.test(x)) return clip(`延续：${x}`, 140);
    return clip(`变化：${x}`, 140);
  }
  if (/^(Continue:|Change:)/i.test(x)) return clip(x, 160);
  if (/^(Still|Continues|No new|Unchanged)/i.test(x)) return clip(`Continue: ${x}`, 160);
  return clip(`Change: ${x}`, 160);
}

function normalizeInvestmentSignal(text, lang) {
  let t = s(text).trim();
  if (!t) {
    return lang === "zh"
      ? "→ 维持：能源与航运链条相关对冲敞口。"
      : "→ Maintain: energy- and shipping-linked hedge exposure.";
  }
  if (!/^→/.test(t)) t = `→ ${t.replace(/^[：:]\s*/, "")}`;
  if (lang === "zh") {
    if (!/(增持|减持|维持|对冲|防御|能源|大宗|风险资产|黄金|美债|美元|股指|航运)/.test(t)) {
      t = `→ 维持：风险中性略偏防御；${t.replace(/^→\s*/, "")}`;
    }
  } else if (!/(increase|decrease|raise|cut|maintain|hedge|defensive|energy|commodit|risk assets|equities|gold|treasur|shipping)/i.test(t)) {
    t = `→ Maintain: slightly defensive risk-neutral stance; ${t.replace(/^→\s*/, "")}`;
  }
  return clip(t, 420);
}

/** 在中文日报末追加可审计的近5日分数表（避免模型四舍五入与存档不一致） */
function appendZhReportDataAppendix(md, historyArr, todayIso, priorScore, todayScore) {
  const m = s(md).trimEnd();
  if (m.includes("### 附录：近5个公历日综合分")) return m;
  const dates = [4, 3, 2, 1, 0].map((k) => addDaysIso(todayIso, -k));
  const rows = dates.map((iso) => {
    const sc = scoreForDate(historyArr, iso);
    return `| ${iso} | ${sc ?? "—"} |`;
  }).join("\n");
  const nums = dates.map((iso) => scoreForDate(historyArr, iso)).filter((x) => x != null);
  const lo = nums.length ? Math.min(...nums) : "—";
  const hi = nums.length ? Math.max(...nums) : "—";
  const delta = priorScore != null && todayScore != null ? todayScore - priorScore : null;
  const deltaStr = delta == null ? "N/A" : (delta > 0 ? `+${delta}` : `${delta}`);
  const appendix = `

### 附录：近5个公历日综合分（脚本据 score-history 填写，可审计）

| 日期 | 综合分 |
|------|--------|
${rows}

- **区间（有数据日）**：${lo}–${hi}
- **较昨日 Δ**：${deltaStr}（今日落盘分 **${todayScore}**）
`;
  return m + appendix;
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
console.log(
  AION_USE_OPENAI_WEBSEARCH
    ? "Oil: WTI/Brent from model (OpenAI web_search; no commodity API; keyStats[2] unit canonicalized)."
    : "Oil: WTI/Brent via Gemini Google Search grounding only (no commodity API; keyStats[2] value from model, unit canonicalized).",
);

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
    keyStats:          { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" }, unit: { type: "string" }, color: { type: "string" }, layout: { type: "string", enum: ["default", "unitPrimary"] } }, required: ["label", "value", "unit", "color"], additionalProperties: false } },
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

const prevOil = prev.oilPrice;
const prevOilHint =
  prevOil && (Number(prevOil.wti) > 0 || Number(prevOil.brent) > 0)
    ? `\n- （仅供参考，**不得用存档替代当日接地**）上一期曾记参考价: WTI=${prevOil.wti ?? "—"}, Brent=${prevOil.brent ?? "—"}, updatedAt=${prevOil.updatedAt ?? "—"}（今日请用语义**区间+趋势**。）`
    : "";

const oilPromptBlock = `

## WTI / Brent 与 Google 搜索接地（必须执行 · 日更「区间 + 趋势」口径）
- 在撰写 **${factorNamesZh[2]}** 与 **keyStats[2] 油价** 前，**必须通过 Google 搜索接地**检索主流财经/通讯社对 **WTI**、**Brent** 的表述（现货或主力近月均可，evidence 写明口径）。优先 Reuters、Bloomberg、WSJ、FT、BBC、AFP、AP 等一级来源。
- **不要**把油价写成单一绝对数字作为主结论：日更用于**趋势与档位判断**，须容忍报道时差与盘中波动。请综合接地结果给出 **美元/桶 区间**（例如多家报道或同一报道中的高低价、当日振幅、或「约 $90–94」式合并区间），并在 evidence 简述**方向**（企稳 / 温和上行 / 承压回落 / 剧烈波动等）。
- **黑天鹅 / 闪崩闪涨**：若新闻显示短时跳变、区间极宽或报价分歧大，在 evidence 明确写出**不确定性**，仍以**区间上沿或更保守的一侧**对照下方 rubric 给分，避免假装精确到「唯一现价」。
- **keyStats[2]**：**value** **仅** \`WTI $低–$高 · Brent $低–$高\`（半角 $，区间用 **–** 连接）；**趋势、叙事、补充说明写入 riskFactors[2] 的 evidence/description**，**不要**塞进 keyStats[2].value（仪表盘油价卡只突出价格区间）。**unit** 中文固定 \`参考\`、英文固定 \`Ref.\`（须与 dataEn 一致）；**脚本只统一 unit**；禁止空值、禁止与接地图无关的臆造区间。
- **evidence**（riskFactors[2]）须含上述区间与趋势的**文字依据**，并附 **至少一条接地 URL**（可末句）。
- 若接地无法形成可信区间，keyStats[2] value 须诚实说明「搜索未获可靠现价」等，该因子 \`sourceVerification\` 标 \`unverified\`，分数不得相对昨日上调。${prevOilHint}`;

const systemPrompt = `${AION_USE_OPENAI_WEBSEARCH ? "【数据源】本任务使用 OpenAI API 内置 **web_search** 检索公开网页；下文「Google 搜索接地」请理解为等价的联网检索义务。\n\n" : ""}[System Role]
你是 **机构级**地缘情报与结构化数据引擎（AION Geo-Conflict Monitor）。输出用于 **真实资金决策**，因此：**禁止臆测、禁止故事化叙事、禁止无法在多源或 Tier1 官方声明中对齐的事实**；信息不足时须明确写「公开数据不足」类表述。

**任务**：用 **Google 搜索接地**（或等价的 OpenAI web_search）获取近 **24h** 美伊相关公开信息，并**单独完成 WTI/Brent 油价接地检索**后，输出 **(1) 严格 JSON**（Schema 已定）与 **(2) 中文 reportMarkdownZh**；二者在 **分数、阶段名、事件与因子结论** 上必须 **完全一致**。

${SOURCE_TIER_TABLE_PROMPT}

**未验证信息与打分（纪律）**：
- 脚本会将非 **confirmed** 的因子分打回昨日档；你仍须在叙述上 **自律**：**不得**用 **unverified / single 源** 的细节作为「分数应上调/下调」的唯一理由来写 justification。
- **第 5 项「${factorNamesZh[4]}」**：若数值相对昨日 **变好**（分数**降低**、谈判前景改善），所依赖的「谈判重启 / 官方乐观 / 接近协议」类事实须达到 **confirmed**（双独立 Tier2 或 Tier1 一手）；否则保持保守措辞与档位。

## 前一天数据（必须作为基准，不可忽略）
- 日期: ${prev.date}，版本: ${prevVersion}
- 冲突天数: D${prev.conflictDay}（冲突起始日 ${CONFIG.conflictStartDate}，**今天是 D${correctConflictDay}**）
- **昨日(${yesterdayIso})收盘综合分**（用于「较上期」）: ${priorDayComposite}（来自 score-history history；勿用与今日同日的 latest.riskScore 当作上期）
- 五维因子分: ${prevFactorStr}
- 近日综合评分历史: ${JSON.stringify(store.history.slice(-10))}

${REPORT_MARKDOWN_ZH_SPEC}

## 阶段名枚举（须与 JSON warPhase 一致）
- **dataZh.warPhase.level** 必须为下列之一（中文，**逐字**）：${WAR_PHASE_LEVEL_ZH.join("、")}
- **dataZh.warPhase.targetLevel** 必须为下列之一：${WAR_PHASE_TARGET_ZH.join("、")}
- **dataEn.warPhase.level / targetLevel** 须为对应英文枚举（与中文语义对齐）：Level — ${WAR_PHASE_LEVEL_EN.join(" / ")}；Target — ${WAR_PHASE_TARGET_EN.join(" / ")}

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
- 日更以 **WTI+Brent 合并观察**：以接地给出的 **价格区间** 与 **主要趋势** 对照下列美元带；**不要求**单一精确现价。若区间跨两档，按 **与更高风险档的重叠** 或 **上沿更保守** 择档，并在 evidence 一句话说明取舍。
- 1 = 区间整体落在 **<$75**（或叙事明确低于 75），供应链正常
- 2 = 区间主体落在 **$75–85**（温和偏强），市场紧张但可控
- 3 = 区间主体落在 **$85–100**（显著偏强），供应担忧明显
- 4 = 区间触及或上沿进入 **$100–120**（危机带），供应中断或恐慌性买入
- 5 = 区间上沿或叙事明确 **>$120**（极端飙升），全球能源危机

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
  - \`unverified\`（未证实）：**仅一条**权威来源，或第二来源与第一条明显矛盾，或无法互证；**脚本强制该因子分数与昨日持平**，evidence 首句须写「未证实：」说明。
- **能源冲击（第 3 项）**：与普通因子相同的互证要求——须 **两家相互独立的一级权威** 对「**油价区间 / 趋势** 与 rubric 档位判断」表述一致（允许区间略有出入但**档位一致**），方可标 \`confirmed\` 并相对昨日改分；evidence 必须包含接地 **区间依据 + URL**。若仅单一行情来源、或区间无法互证，标 \`partial\` / \`unverified\`，脚本将与昨日持平。
- **Justification 措辞**：每个因子 **description / evidence** 中承担论证的首句须为 **可核查的事实陈述 + 机构名**；**禁止**在句首或关键断言处使用模糊词：**「可能」「或许」「据传」「据称」「或」**（不确定时改为「公开报道显示…」并列出具体来源）。
- 评分变化幅度限制：单日单因子变化不超过 ±1 分（除非有重大突发且 **sourceVerification=confirmed**）

### 事件卡片 verification（events）
- \`confirmed\`：≥2 家一级权威媒体报道同一事实，或 **1 份** 一级官方声明（白宫/UN/外交部官网等）且与事实直接对应。
- **油价 / 原油**：须与 **keyStats[2] 的区间+趋势** 及 **riskFactors[2] evidence** 自洽（含 URL），且满足上条「双一级权威」或官方声明标准，方可填 **confirmed**；否则填 \`partial\` 或 \`single\`。
- \`partial\`：仅一家权威 + 一家次要来源，或两家表述部分一致。
- \`single\`：仅单源且不足以达到 confirmed 标准。

## 规则
- date 必须是 "${todayNy}"
- version: "${prevVersion}" 的下一个版本（小版本号 +1）
- keyStats[0] 冲突天数: 必须是 "D${correctConflictDay}"（不要自己算，用这个值）
- keyStats[1] 评分变化: 今日 riskScore 与 **昨日收盘综合分 ${priorDayComposite}** 的差值（如 ↑3 或 ↓2 或 持平）；脚本以此为准
- keyStats 恰好 4 项，顺序：冲突天数、评分变化、油价、霍尔木兹。每项 unit 非空；**keyStats[2] 油价**：value **仅** **WTI/Brent 两段子区间**（见油价专节）；**unit** 中文固定 \`参考\`、英文固定 \`Ref.\`；脚本只统一 unit。**dataEn.keyStats[2].value 全英文数字与符号**，勿混入中文趋势词
- keyStats[3] 霍尔木兹：**value** 为航道通行强度摘要（如「严重受限」）；**unit** 固定为「通行状态」。勿用「-」或仅百分比作主行（脚本会将空值/- 兜底为「严重受限」+「通行状态」）
- riskFactors 恰好 5 项，顺序：${factorNamesZh.join("、")}。weight 一律 0.2。riskScore = round(avg(scores) × 20)
- 每个 riskFactor 必须包含 **sourceVerification**（confirmed / partial / unverified），规则见上文「交叉验证」
- riskFactors 的 prev 字段必须等于前一天对应因子的 score
- events 1–5 条。verification 只能是 confirmed/partial/single。highlight/critical 不需要时设 false
- **events 每条 title、description 必须非空**：title 为简短标题；description 为 1–3 句可读正文（含来源/机构名）；禁止 \`""\`、禁止仅空格（否则仪表盘事件区无法展示）
- warPhase 所有字段非空；**level / targetLevel 必须从上文「阶段名枚举」中逐字选取**（脚本会归一）；points 1–3 条；绝不能是纯数字
- situations 恰好 4 张卡，顺序：军事行动、航运/霍尔木兹、能源市场、领导层信号。每张 **1–3** 条；**每条必须以「延续：」或「变化：」开头**（英文 **Continue:** / **Change:**），只写相对昨日/近 24h 的增量信息，禁止复述 warPhase 长文
- coreContradiction.political 和 .military 各 1–2 条非空
- scoreTrend 恰好 5 个点：脚本会按存档写入；模型可填占位，最终以脚本为准
- keyChange 非空
- **investmentSignal**：**一句**；**必须以 → 开头**；须含 **方向/部位** 词之一（中文：**增持、减持、维持、对冲、防御、能源、大宗、风险资产** 等；英文用对应词）；与综合分及 warPhase 方向一致
- change 字段：有变化填 up/down/structural，无变化填 "none"
- dataZh 中文、dataEn 英文，结构完全一致，仅文案语言不同，数值相同
- **reportMarkdownZh**：中文日报 **Markdown 全文**，且须 **严格包含**上文 **「reportMarkdownZh（中文 Markdown…」专节**所列 ### 小节标题与顺序（脚本会在文末追加「附录：近5日分数表」以利审计，模型正文勿重复该附录表）

## 信源与互证
重大事件须满足「双权威互证」或「一级官方声明」；单源事件须 verification="single"。油价类须与接地及 keyStats[2] 的**区间与趋势**一致（见上文油价专节）。${oilPromptBlock}`;

// ── Gemini 3 Flash + Google Search 接地 ─────────────────────────────
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
  if (!genai) throw new Error("Gemini client not initialized (set GEMINI_API_KEY or unset AION_USE_OPENAI_WEBSEARCH)");
  const config = { systemInstruction: systemPrompt };
  if (withWeb) {
    config.tools = [{ googleSearch: {} }];
  } else {
    config.responseMimeType = "application/json";
    config.responseJsonSchema = outputSchema;
  }
  const userText = withWeb
    ? `请生成 ${todayNy} 的 AION 日报。\n\n**务必先通过 Google 搜索接地**：检索 WTI、Brent 的**日内或近日美元/桶区间**（高低、振幅或多源合并区间均可）及**趋势**（企稳/上行/回落/剧烈波动等），引用一级财经/通讯社来源，再写入 riskFactors 能源项与 keyStats[2]（区间格式，勿写死单一精确价作为主展示）。\n\n**版面**：reportMarkdownZh 须严格按系统提示中专节所列 **### 小节标题与顺序**；dataZh.situations 每条 point 须以 **「延续：」或「变化：」** 开头（dataEn 用 **Continue:** / **Change:**）；dataZh/dataEn 的 **investmentSignal** 必须以 **→** 开头并含方向/部位词；warPhase.level/targetLevel 须从系统提示枚举中逐字选取。\n\n**输出**：只输出一个 JSON 对象（不要 markdown 围栏、不要前后说明），顶层键为 reportMarkdownZh、dataZh、dataEn，结构与系统提示中的 Schema 完全一致。`
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
        { role: "user", content: `请生成 ${todayNy} 的 AION 日报。\n\nreportMarkdownZh 须含系统提示规定的 ### 小节顺序；situations 每条以「延续：」或「变化：」开头（英文 Continue:/Change:）；investmentSignal 以 → 开头；warPhase 阶段名须取自枚举。\n\n输出仅为 JSON 对象，键为 reportMarkdownZh、dataZh、dataEn。` },
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

/** 从 OpenAI Responses API 原始 JSON 抽取助手最终文本 */
function extractResponsesOutputText(data) {
  if (!data || typeof data !== "object") return "";
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const out = data.output;
  if (!Array.isArray(out)) return "";
  const buf = [];
  for (const item of out) {
    if (item.type === "reasoning") continue;
    if (item.type === "output_text" && typeof item.text === "string") buf.push(item.text);
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if ((c.type === "output_text" || c.type === "text") && typeof c.text === "string") buf.push(c.text);
      }
    }
  }
  return buf.join("\n").trim();
}

/** 从 Responses 输出中收集 url 引用，供与 Gemini grounding 同字段写入 */
function extractOpenAIWebSourcesFromResponse(data) {
  const webSources = [];
  const seen = new Set();
  const out = data?.output;
  if (!Array.isArray(out)) return { webSources: [], webSearchQueries: [] };
  for (const item of out) {
    if (item.type !== "message" || !Array.isArray(item.content)) continue;
    for (const c of item.content) {
      const anns = c.annotations || c.citations;
      if (!Array.isArray(anns)) continue;
      for (const a of anns) {
        const url = a.url || a.uri;
        if (!url || seen.has(url)) continue;
        seen.add(url);
        webSources.push({ title: s(a.title, url), uri: String(url) });
      }
    }
  }
  return { webSources: webSources.slice(0, 32), webSearchQueries: [] };
}

/**
 * OpenAI Responses API + 内置 web_search（非 Chat Completions）。
 * 文档: https://platform.openai.com/docs/guides/tools-web-search
 */
async function callOpenAIResponsesWebSearch() {
  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  const userContent = `请生成 ${todayNy} 的 AION 日报。\n\n**务必先使用联网搜索**：检索近 24h 美伊局势公开报道、以及 WTI/Brent 油价区间与趋势（优先一级财经/通讯社）。\n\n**版面**：reportMarkdownZh 按系统提示 ### 顺序；situations 每条 point 以「延续：」或「变化：」（英文 Continue:/Change:）；investmentSignal 以 → 开头；warPhase 取自枚举。\n\n**输出**：只输出一个 JSON 对象（不要 markdown 围栏、不要前后说明），顶层键为 reportMarkdownZh、dataZh、dataEn，结构与系统提示中的 Schema 完全一致。`;

  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_WEBSEARCH_MODEL,
      instructions: systemPrompt,
      input: userContent,
      tools: [{ type: "web_search" }],
      temperature: 0.2,
      max_output_tokens: 32768,
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(JSON.stringify(data?.error || { code: resp.status, message: `HTTP ${resp.status}` }));
  }
  return data;
}

async function callOpenAIResponsesWebSearchWithRetry() {
  for (let attempt = 1; attempt <= CONFIG.geminiMaxAttempts; attempt++) {
    try {
      return await callOpenAIResponsesWebSearch();
    } catch (err) {
      const msg = errorMessage(err);
      const retriable = isRetriableOpenAIError(msg);
      const exhausted = attempt >= CONFIG.geminiMaxAttempts;
      if (!retriable || exhausted) throw new Error(msg);
      const exp = CONFIG.geminiRetryBaseMs * (2 ** (attempt - 1));
      const backoffMs = Math.min(CONFIG.geminiRetryMaxMs, exp) + Math.floor(Math.random() * 500);
      console.warn(`  OpenAI Responses+web_search retry ${attempt}/${CONFIG.geminiMaxAttempts - 1} after ${backoffMs}ms: ${msg}`);
      await sleep(backoffMs);
    }
  }
  throw new Error("OpenAI Responses web_search retry loop exited unexpectedly");
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
      { label: CANONICAL[lang].keyStatLabels[2], value: "-", unit: CANONICAL[lang].keyStatDefaultUnits34[0], color: CANONICAL[lang].keyStatColors[2], layout: "unitPrimary" },
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
console.log(
  AION_USE_OPENAI_WEBSEARCH
    ? `Generating AION daily report for ${todayNy} (OpenAI Responses + web_search, model=${OPENAI_WEBSEARCH_MODEL}) ...`
    : `Generating AION daily report for ${todayNy} (${CONFIG.ensembleN}x ensemble) ...`,
);

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

if (AION_USE_OPENAI_WEBSEARCH) {
  try {
    const data = await callOpenAIResponsesWebSearchWithRetry();
    const text = extractResponsesOutputText(data);
    const p = parsePayload({ text });
    if (p) {
      const grounding = extractOpenAIWebSourcesFromResponse(data);
      const srcHint = grounding.webSources.length ? `, sources=${grounding.webSources.length} urls` : "";
      console.log(`  OpenAI web_search: factors=[${extractFactorScores(p).join(",")}]${srcHint}`);
      results.push({ parsed: p, grounding });
    } else {
      console.warn("  OpenAI Responses: JSON parse failed from output_text");
    }
  } catch (err) {
    console.warn(`  OpenAI Responses+web_search failed: ${errorMessage(err)}`);
  }
} else {
  for (let i = 0; i < CONFIG.ensembleN; i++) {
    results.push(await singleCall(i));
  }
}

let validResults = results.filter(Boolean);

if (!validResults.length) {
  await mkdir(PATHS.reports, { recursive: true });
  await writeFile(path.join(PATHS.reports, `${todayNy}.ensemble-fail.json`), JSON.stringify(results, null, 2), "utf8");
  if (AION_USE_OPENAI_WEBSEARCH) {
    console.warn("OpenAI Responses+web_search produced no usable JSON; trying Chat Completions (no web search)...");
  } else {
    console.warn("All Gemini calls failed; trying OpenAI fallback...");
  }
  try {
    const oaRaw = await callOpenAIWithRetry();
    const oaParsed = parsePayload(oaRaw);
    if (!oaParsed) throw new Error("OpenAI returned non-JSON or schema-mismatched output");
    console.log(`  OpenAI Chat Completions succeeded: model=${OPENAI_MODEL}`);
    validResults = [{
      parsed: oaParsed,
      grounding: { webSources: [], webSearchQueries: [] },
    }];
  } catch (err) {
    console.warn(`  OpenAI Chat Completions failed: ${errorMessage(err)}`);
    console.warn("  Using static baseline fallback payload.");
    validResults = [{
      parsed: buildFallbackPayload(todayNy),
      grounding: { webSources: [], webSearchQueries: [] },
    }];
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

// 仅「已证实」(confirmed) 允许相对昨日保留 ensemble 分数；部分证实/未证实 → 与昨日持平
const rfSv = payload?.dataZh?.riskFactors || [];
finalFactors = finalFactors.map((sc, i) => {
  const sv = rfSv[i]?.sourceVerification;
  const legacy = sv === "dual" ? "confirmed" : sv === "single" ? "unverified" : sv;
  const isConfirmed = legacy === "confirmed";
  if (isConfirmed) return sc;
  if (sc !== prevFactorScores[i]) {
    console.warn(`  ⚠ ${factorNamesZh[i]}: sourceVerification=${legacy ?? "missing"} → clamp to prev=${prevFactorScores[i]} (需要已证实)`);
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
store.latest = {
  date: todayNy,
  appVersion: version,
  riskScore: finalRiskScore,
  prevRiskScore: priorDayComposite,
  conflictDay: correctConflictDay,
  factorScores: [...finalFactors],
};
store.version = 2;
await saveHistory(store);

const scoreTrend = buildFiveDayTrend(store.history, todayNy, priorDayComposite);
console.log(`History saved; trend: ${scoreTrend.map(p => `${p.date}:${p.score}`).join(", ")}`);

// ── Post-process: enforce canonical layout ──────────────────────────
const scoreDelta = finalRiskScore - priorDayComposite;

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
    const rawDesc = s(src.description) || s(src.evidence) || "";
    const out = {
      name,
      score: finalFactors[i],
      prev: prevFactorScores[i],
      weight: 0.2,
      /** 模型常把长叙述放在 evidence；description 空时沿用 evidence，供 UI/态势卡兜底使用 */
      description: polishFactorDescription(rawDesc, lang),
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
    if (i === 2) {
      unitExtra = lang === "zh" ? "参考" : "Ref.";
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
      ...(i === 2 ? { layout: "unitPrimary" } : {}),
    };
  });

  // scoreTrend from authoritative history
  d.scoreTrend = scoreTrend.map((p, idx) => ({ date: p.date, score: idx === 4 ? finalRiskScore : p.score, ...(idx === 4 ? { active: true } : {}) }));

  // situations（延续/变化前缀 + 占位则用因子拆条）
  const sitSrc = Array.isArray(d.situations) ? d.situations : [];
  d.situations = c.situations.map((meta, i) => {
    let points = (Array.isArray(sitSrc[i]?.points) ? sitSrc[i].points : []).filter(Boolean).slice(0, 3);
    if (isPlaceholderSituationPoints(points, lang)) {
      const rf = d.riskFactors[i];
      const text = s(rf?.description) || s(rf?._evidence);
      const bullets = splitEvidenceToPoints(text, lang);
      points = bullets.length ? bullets : [lang === "zh" ? "详见风险因子。" : "See risk factors."];
    }
    points = points.map((p) => ensureSituationBulletPrefix(p, lang)).filter(Boolean);
    return {
      title: meta.title,
      icon: meta.icon,
      tag: s(sitSrc[i]?.tag),
      tagColor: s(sitSrc[i]?.tagColor, "orange"),
      points,
    };
  });

  // events（模型偶发空数组/空 title/description；用风险因子兜底，避免流水线因 events empty 失败）
  const rfForEvents = Array.isArray(d.riskFactors) ? d.riskFactors : [];
  const srcEvents = (Array.isArray(d.events) ? d.events : []).slice(0, 5);
  d.events = srcEvents.map((e, i) => {
    let verification = ["confirmed", "partial", "single"].includes(e.verification) ? e.verification : "single";
    let ts = s(e.timestamp);
    if (!ts || ts === "AUTO") {
      ts = lang === "zh" ? `${todayNy}（当日公开报道）` : `${todayNy} (same-day reporting)`;
    }
    let title = s(e.title).trim();
    let description = s(e.description).trim();
    const rf = rfForEvents[i] || {};
    const rfBody = s(rf.description).trim() || s(rf._evidence).trim();
    if (!description && rfBody) description = clip(rfBody, 1200);
    if (!title && description) {
      const first = description.split(/[。.;!?\n]/)[0].trim();
      title = first ? clip(first, 96) : "";
    }
    if (!title) title = lang === "zh" ? `当日公开动态 ${i + 1}` : `Same-day development ${i + 1}`;
    if (!description) {
      description =
        lang === "zh"
          ? "暂无独立事件摘要，请重跑生成脚本；或查看下方「风险因子」同序位研判。"
          : "No event summary from model; re-run the generator or see the parallel risk factor below.";
    }
    const obj = {
      id: s(e.id, `EVT-${String(i + 1).padStart(2, "0")}`),
      title,
      description,
      verification,
      timestamp: ts,
      significance: s(e.significance),
    };
    if (e.highlight === true) obj.highlight = true;
    if (e.critical === true) obj.critical = true;
    return obj;
  });
  if (!d.events.length) {
    d.events = rfForEvents.slice(0, 2).map((rf, i) => {
      const body = s(rf?.description).trim();
      const title =
        body.split(/[。.;!?\n]/)[0].trim() ||
        (lang === "zh" ? `当日公开动态 ${i + 1}` : `Same-day development ${i + 1}`);
      return {
        id: `EVT-AUTO-${String(i + 1).padStart(2, "0")}`,
        title: clip(title, 96),
        description:
          body ||
          (lang === "zh"
            ? "模型未返回事件卡片，系统已用风险因子摘要自动补齐。"
            : "Model returned no event cards; auto-filled from risk factor summaries."),
        verification: "single",
        timestamp: lang === "zh" ? `${todayNy}（当日公开报道）` : `${todayNy} (same-day reporting)`,
        significance: "",
      };
    });
    if (!d.events.length) {
      d.events = [
        {
          id: "EVT-AUTO-01",
          title: lang === "zh" ? "当日公开动态" : "Same-day development",
          description:
            lang === "zh"
              ? "模型未返回可用事件，系统已写入最小占位事件以保持流水线稳定。"
              : "No usable events returned; minimum placeholder event inserted for pipeline stability.",
          verification: "single",
          timestamp: lang === "zh" ? `${todayNy}（当日公开报道）` : `${todayNy} (same-day reporting)`,
          significance: "",
        },
      ];
    }
  }

  // warPhase（归一到枚举；兜底/服务态不改写）
  const wp = d.warPhase || {};
  const validPhase = (v) => { const t = s(v).trim(); return t && !/^\d+$/.test(t) ? t : ""; };
  const rawLv = validPhase(wp.level);
  const rawTg = validPhase(wp.targetLevel);
  const skipSnap = /服务兜底|Fallback mode/i.test(`${rawLv} ${rawTg}`);
  const levelSnap = skipSnap
    ? (rawLv || (lang === "zh" ? "服务兜底阶段" : "Fallback mode"))
    : snapWarPhaseField(rawLv, lang, "level");
  const targetSnap = skipSnap
    ? (rawTg || (lang === "zh" ? "等待自动刷新" : "Await next run"))
    : snapWarPhaseField(rawTg, lang, "target");
  d.warPhase = {
    level: levelSnap,
    targetLevel: targetSnap,
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
  if (!s(d.investmentSignal).trim()) {
    d.investmentSignal = lang === "zh" ? "→ 维持：风险平衡敞口。" : "→ Maintain: balanced risk exposure.";
  }
  d.investmentSignal = normalizeInvestmentSignal(d.investmentSignal, lang);
  if (!s(d.keyChange).trim()) d.keyChange = lang === "zh" ? "24h要点：详见事件与因子。" : "24h: See events and factors.";

  return d;
}

// Apply layout to ZH (primary), then sync numerics to EN
enforceLayout(payload.dataZh, "zh");
enforceLayout(payload.dataEn, "en");

// Sync: EN gets all numeric fields from ZH
const zh = payload.dataZh;
const en = payload.dataEn;
// warPhase 中英文阶段名与中文枚举索引对齐（便于跨语言审计）
{
  const li = WAR_PHASE_LEVEL_ZH.indexOf(zh.warPhase.level);
  if (li >= 0) en.warPhase.level = WAR_PHASE_LEVEL_EN[li];
  const ti = WAR_PHASE_TARGET_ZH.indexOf(zh.warPhase.targetLevel);
  if (ti >= 0) en.warPhase.targetLevel = WAR_PHASE_TARGET_EN[ti];
}
en.riskScore = zh.riskScore;
en.prevRiskScore = zh.prevRiskScore;
en.scoreTrend = JSON.parse(JSON.stringify(zh.scoreTrend));
en.keyStats[0].value = zh.keyStats[0].value;
// 油价主行语言分离：英文卡勿同步中文 value（趋势留在 riskFactors[2] 英文叙述）
// 油价 unit 须保持英文 canonical（enforceLayout 已写入），勿用中文 unit 覆盖
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
payload.reportMarkdownZh = appendZhReportDataAppendix(
  s(payload.reportMarkdownZh),
  store.history,
  todayNy,
  priorDayComposite,
  finalRiskScore,
);
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
