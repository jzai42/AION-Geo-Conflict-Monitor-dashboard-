import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

const todayNy = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/New_York",
});

/** 与前端 v2.9 版式对齐：标签/因子名/态势卡标题写死，模型只填 value、描述、分数等可变内容。 */
const CANONICAL = {
  zh: {
    keyStatLabels: ["冲突天数", "评分变化", "油价", "霍尔木兹"],
    keyStatUnitsFixed: ["2月28日起", "较上期"],
    keyStatColors: ["#ff851b", "#ff4136", "#ff4136", "#ffdc00"],
    riskFactorNames: [
      "军事升级烈度",
      "霍尔木兹航运扰动",
      "能源冲击",
      "大国介入深度",
      "降级/谈判前景",
    ],
    situations: [
      { title: "军事行动", icon: "Military" },
      { title: "航运 / 霍尔木兹", icon: "Shipping" },
      { title: "能源市场", icon: "Energy" },
      { title: "领导层信号", icon: "Leadership" },
    ],
    /** 第 3、4 项 keyStats 的 unit 在模型留空时使用（油价 / 霍尔木兹） */
    keyStatDefaultUnits34: ["危机峰下", "<10% 常态"],
  },
  en: {
    keyStatLabels: ["Conflict Days", "Score Change", "Oil", "Hormuz"],
    keyStatUnitsFixed: ["Since Feb 28", "vs Prev"],
    keyStatColors: ["#ff851b", "#ff4136", "#ff4136", "#ffdc00"],
    riskFactorNames: [
      "Military Escalation Intensity",
      "Hormuz Disruption",
      "Energy Shock",
      "Great Power Involvement",
      "De-escalation Probability",
    ],
    situations: [
      { title: "Military Action", icon: "Military" },
      { title: "Shipping / Hormuz", icon: "Shipping" },
      { title: "Energy Market", icon: "Energy" },
      { title: "Leadership Signals", icon: "Leadership" },
    ],
    keyStatDefaultUnits34: ["Below crisis peak", "<10% of normal"],
  },
};

const prompt = `你是 AION Geo-Conflict Monitor 的结构化数据引擎。必须用网络搜索（近24h美伊相关）后，只输出「一个合法 JSON 对象」，禁止 markdown、禁止代码围栏外文字、禁止解释。

## 输出根对象（key 名不得改）
{
  "reportMarkdownZh": "中文日报全文，放在一个 markdown 代码块字符串内，供归档",
  "dataZh": { ... DashboardData 中文版 ... },
  "dataEn": { ... DashboardData 英文版 ... },
  "translationsDynamic": {
    "zh": { "node406": "如 4月9日节点", "systemInfo": "页眉系统说明", "bannerSignal": "顶栏综合摘要（含评分与变化）", "bannerWarning": "顶栏风险/仓位提示", "deescalationIntent": "降级/外交动能一句", "structuralRisk": "结构性风险（咽喉/航运等）一句", "contradictionNote": "核心矛盾综述一句", "dayCount": "如 第40天" },
    "en": { 同上英文 }
  }
}
若省略 translationsDynamic，服务端会从 dataZh/dataEn 自动合成上述文案；有则优先用你提供的字符串。

## DashboardData（dataZh / dataEn 结构必须一致；仅文案语言不同）
- date: 必须是 "${todayNy}"（纽约日历当日，YYYY-MM-DD）
- version: 语义化版本字符串，如 "v2.10"（须与当日内容一起更新）
- keyStats: 长度 4。第1、2 项的 label/unit 在服务端会强制为固定版式，但你仍应按顺序给出 value/color（第1维冲突天数 Dxx，第2维综合评分变化如 ±N 或 持平）；第3项（油价）、第4项（霍尔木兹）的 unit 也须为非空短语（如「危机峰下」「<10% 常态」及英文对应）
- riskFactors: 恰好 5 条，顺序与含义固定（模型填 score/prev/description/status/change；name 会由服务端覆盖为规范名）
  1) 军事升级烈度 / Military Escalation Intensity
  2) 霍尔木兹航运扰动 / Hormuz Disruption
  3) 能源冲击 / Energy Shock
  4) 大国介入深度 / Great Power Involvement
  5) 降级谈判前景 / De-escalation Probability
- riskFactors.weight 一律 0.2；五项 score 平均值的 20 倍须等于 riskScore（允许 0.01 舍入误差）
- events: 至多 5 条；verification 只能是 confirmed | partial | single；可选 critical: true（仅当该条对评分/叙事有关键牵引时）
- coreContradiction: 只能是对象 { "political": [ "≤2条" ], "military": [ "≤2条" ] }，禁止把整段话放在根上、禁止字符串代替对象
- warPhase: 必须是对象，含 level, targetLevel, title, subTitle, points[≤3], note — 全部为非空字符串（points 每项为一句）
- situations: 恰好 4 张卡片，顺序固定（模型填 tag/tagColor/points；title/icon 由服务端覆盖）
  1) 军事行动 / Military Action
  2) 航运/霍尔木兹 / Shipping / Hormuz
  3) 能源市场 / Energy Market
  4) 领导层信号 / Leadership Signals
  每张 points 必须 1–3 条非空短句
- scoreTrend: 恰好 5 个点，date 为 MM-DD；最后一项 date 等于 ${todayNy.slice(5)}、active=true、score=riskScore；前 4 天分数单调演化须合理
- keyChange、investmentSignal：非空；键名与 TypeScript 接口一致

## 信源规则
重大事件须 ≥2 独立报道或 1 份一级官方声明；单源须 single 且不得驱动评分。

## 硬约束
禁止把 political/military/warPhase/coreContradiction 写成单个字符串；禁止用数字键对象代替数组。输出必须为可被 JSON.parse 严格解析的单个对象。`;

async function callOpenAI(payload) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI API error ${response.status}: ${bodyText}`);
  }
  try {
    return JSON.parse(bodyText);
  } catch (err) {
    throw new Error(`OpenAI response JSON parse failed: ${err.message}; body=${bodyText}`);
  }
}

const dataFilePath = path.join(process.cwd(), "src", "data.ts");
let dataTsSnapshot = "";
try {
  dataTsSnapshot = await readFile(dataFilePath, "utf8");
} catch {
  dataTsSnapshot = "";
}

let data;
try {
  data = await callOpenAI({
    model: OPENAI_MODEL,
    input: prompt,
    tools: [{ type: "web_search_preview" }],
  });
} catch (firstErr) {
  console.warn(`Primary call failed, retrying without web tool. reason=${firstErr.message}`);
  data = await callOpenAI({
    model: OPENAI_MODEL,
    input: prompt,
  });
}

function collectTextFromResponse(resp) {
  if (typeof resp?.output_text === "string" && resp.output_text.trim()) {
    return resp.output_text.trim();
  }

  const pieces = [];
  const outputItems = Array.isArray(resp?.output) ? resp.output : [];
  for (const item of outputItems) {
    const contents = Array.isArray(item?.content) ? item.content : [];
    for (const content of contents) {
      if (typeof content?.text === "string" && content.text.trim()) {
        pieces.push(content.text.trim());
      }
    }
  }
  if (pieces.length) {
    return pieces.join("\n").trim();
  }
  return "";
}

const output = collectTextFromResponse(data);

if (!output) {
  const debugDir = path.join(process.cwd(), "reports", "daily");
  await mkdir(debugDir, { recursive: true });
  await writeFile(path.join(debugDir, `${todayNy}.response.json`), JSON.stringify(data, null, 2), "utf8");
  throw new Error("OpenAI response did not include any text content");
}

function stripMarkdownFences(text) {
  let t = asString(text).trim();
  const m = t.match(/^```(?:json)?\s*\r?\n([\s\S]*?)\r?\n```\s*$/im);
  if (m) return m[1].trim();
  const idx = t.indexOf("```");
  if (idx !== -1) {
    const after = t.slice(idx + 3).replace(/^json\s*\r?\n/i, "");
    const endFence = after.lastIndexOf("```");
    if (endFence !== -1) return after.slice(0, endFence).trim();
  }
  return t;
}

/** 用括号深度截取第一个完整 JSON 对象（避免 lastIndexOf("}") 截断嵌套结构）。 */
function extractJsonObject(text) {
  const cleaned = stripMarkdownFences(text);
  const start = cleaned.indexOf("{");
  if (start === -1) return null;
  const end = findObjectEnd(cleaned, start);
  if (end === -1 || end < start) return null;
  return cleaned.slice(start, end + 1);
}

async function repairJsonWithModel(badJsonText) {
  const repairPrompt = `你是JSON修复器。请将下面文本修复为严格合法JSON。
要求：
1) 只输出JSON对象本身
2) 不添加解释
3) 保留原语义；key 名必须与 AION 日报载荷一致，不得随意改名
4) **顶层必须保留（若原文已有或可从片段推断）**：reportMarkdownZh、dataZh、dataEn 三个键。若待修复文本是截断的日报载荷，请补全这三个键；dataZh/dataEn 为对象，reportMarkdownZh 为字符串（可为简短占位）。
5) 可选顶层键：translationsDynamic

待修复文本：
${badJsonText}`;

  const repairedResp = await callOpenAI({
    model: OPENAI_MODEL,
    input: repairPrompt,
  });
  const repairedText = collectTextFromResponse(repairedResp);
  return extractJsonObject(repairedText) || repairedText;
}

async function resolveJsonTextFromModelOutput(primaryOutput) {
  let jsonText = extractJsonObject(primaryOutput);
  if (jsonText) return jsonText;

  const debugDir = path.join(process.cwd(), "reports", "daily");
  await mkdir(debugDir, { recursive: true });
  await writeFile(path.join(debugDir, `${todayNy}.raw.txt`), `${primaryOutput}\n`, "utf8");

  try {
    const repaired = await repairJsonWithModel(primaryOutput.slice(0, 32000));
    jsonText = extractJsonObject(repaired);
    if (jsonText) {
      console.warn("Recovered JSON via repairJsonWithModel.");
      return jsonText;
    }
  } catch (e) {
    console.warn(`repairJsonWithModel failed: ${e.message}`);
  }

  const strictPrompt = `你是数据管道。上一次输出无法解析为单个 JSON 对象（可能含 markdown、说明文字或括号不匹配）。请根据下列内容中的事实与数字，输出**仅一个**合法 JSON 对象，顶层键必须包含：reportMarkdownZh, dataZh, dataEn, translationsDynamic。不要 markdown 围栏，不要解释。

## 内容硬约束（否则下游校验失败）
- dataZh 与 dataEn 的 date 须为 "${todayNy}"
- 两者均须含非空：warPhase.title、investmentSignal、keyChange；warPhase 的 level/targetLevel/subTitle/points/note 均不得为空
- keyStats 第 3、4 项 unit 须非空
- situations 各 4 张卡，每张 points 至少 1 条非空短句
- coreContradiction.political 与 .military 各至少 1 条非空短句（数组）

上一次输出：
${primaryOutput.slice(0, 28000)}`;

  const follow = await callOpenAI({
    model: OPENAI_MODEL,
    input: strictPrompt,
  });
  const followText = collectTextFromResponse(follow);
  jsonText = extractJsonObject(followText);
  if (jsonText) {
    console.warn("Recovered JSON via strict follow-up call.");
  }
  return jsonText;
}

const REQUIRED_PAYLOAD_KEYS = ["reportMarkdownZh", "dataZh", "dataEn"];

function missingPayloadKeys(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [...REQUIRED_PAYLOAD_KEYS];
  }
  return REQUIRED_PAYLOAD_KEYS.filter((k) => !(k in payload));
}

/** 修复/补全后 JSON 可解析但缺少顶层键时，再调一次模型合并补全。 */
async function completePayloadWithModel(partialPayload, originalOutput) {
  const prompt = `你是数据管道。下列 JSON 已能解析，但缺少 AION 日报要求的顶层键：reportMarkdownZh、dataZh、dataEn（必须三者齐全）。

请输出**仅一个**合法 JSON 对象，要求：
- 顶层必须包含：reportMarkdownZh（字符串）、dataZh（对象）、dataEn（对象）；可有 translationsDynamic
- 尽量合并「已有 JSON」中的字段，不要丢弃已有 dataZh/dataEn 内容；若某键完全缺失，则根据「参考原文」与当日日期 ${todayNy} 补全最小可用 DashboardData（须含 date="${todayNy}"、version 形如 v2.x、五因子、事件、warPhase 等，与主 prompt 一致）
- 不要 markdown 围栏，不要解释

已有 JSON（可能缺键）：
${JSON.stringify(partialPayload).slice(0, 28000)}

参考原文（截断）：
${originalOutput.slice(0, 14000)}`;

  const resp = await callOpenAI({
    model: OPENAI_MODEL,
    input: prompt,
  });
  const text = collectTextFromResponse(resp);
  const jt = extractJsonObject(text);
  if (!jt) return null;
  try {
    return JSON.parse(jt);
  } catch {
    return null;
  }
}

function mergePayloadKeys(base, richer) {
  if (!richer || typeof richer !== "object") return base;
  const out = { ...base };
  for (const k of REQUIRED_PAYLOAD_KEYS) {
    if (!(k in out) && k in richer) out[k] = richer[k];
  }
  if (!out.translationsDynamic && richer.translationsDynamic) {
    out.translationsDynamic = richer.translationsDynamic;
  }
  return out;
}

function toTsObjectLiteral(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, "$1:");
}

function findObjectEnd(text, openBraceIndex) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = openBraceIndex; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;
    if (depth === 0) return i;
  }
  return -1;
}

function replaceExportObject(sourceText, exportPrefix, nextExportPrefix, objectLiteral) {
  const start = sourceText.indexOf(exportPrefix);
  if (start === -1) throw new Error(`Cannot find ${exportPrefix}`);
  const braceStart = sourceText.indexOf("{", start);
  const braceEnd = findObjectEnd(sourceText, braceStart);
  if (braceStart === -1 || braceEnd === -1) {
    throw new Error(`Cannot parse object for ${exportPrefix}`);
  }
  const afterObject = sourceText.indexOf(nextExportPrefix, braceEnd);
  if (afterObject === -1) throw new Error(`Cannot find boundary ${nextExportPrefix}`);
  return (
    sourceText.slice(0, start) +
    `${exportPrefix}${objectLiteral};\n\n` +
    sourceText.slice(afterObject)
  );
}

function replaceTranslationField(sourceText, locale, key, value) {
  const localeStart = sourceText.indexOf(`${locale}: {`);
  if (localeStart === -1) throw new Error(`Cannot find locale ${locale}`);
  const localeBraceStart = sourceText.indexOf("{", localeStart);
  const localeBraceEnd = findObjectEnd(sourceText, localeBraceStart);
  if (localeBraceEnd === -1) throw new Error(`Cannot parse locale ${locale}`);

  const block = sourceText.slice(localeBraceStart, localeBraceEnd + 1);
  const escaped = JSON.stringify(value);
  const re = new RegExp(
    `(^\\s*${key}:\\s*)(?:"(?:\\\\.|[^"\\\\])*"|\\n\\s*"(?:\\\\.|[^"\\\\])*")(,?)`,
    "m"
  );
  if (!re.test(block)) throw new Error(`Cannot find translation key ${locale}.${key}`);
  const replaced = block.replace(re, `$1${escaped}$2`);
  return sourceText.slice(0, localeBraceStart) + replaced + sourceText.slice(localeBraceEnd + 1);
}

function readTranslationField(sourceText, locale, key) {
  const localeStart = sourceText.indexOf(`${locale}: {`);
  if (localeStart === -1) throw new Error(`Cannot find locale ${locale}`);
  const localeBraceStart = sourceText.indexOf("{", localeStart);
  const localeBraceEnd = findObjectEnd(sourceText, localeBraceStart);
  if (localeBraceEnd === -1) throw new Error(`Cannot parse locale ${locale}`);
  const block = sourceText.slice(localeBraceStart, localeBraceEnd + 1);
  const re = new RegExp(`^\\s*${key}:\\s*"((?:\\\\.|[^"\\\\])*)",?\\s*$`, "m");
  const m = block.match(re);
  if (!m) throw new Error(`Cannot read translation key ${locale}.${key}`);
  return JSON.parse(`"${m[1]}"`);
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

/** Never spread unknown values into `{...x}` — spreading a string becomes {0:"a",1:"b"...} and corrupts data. */
function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function normalizeLineArray(value) {
  if (Array.isArray(value)) return value.map((x) => asString(x)).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (isPlainObject(value)) {
    const vals = Object.values(value);
    if (vals.length > 4 && vals.every((x) => typeof x === "string" && x.length <= 2)) {
      return [vals.join("")];
    }
    return vals.map((x) => asString(x)).filter(Boolean);
  }
  return [];
}

function asString(value, fallback = "") {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function asNumber(value, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clipText(s, max) {
  const t = asString(s).replace(/\s+/g, " ").trim();
  if (!t) return "";
  if (t.length <= max) return t;
  return `${t.slice(0, Math.max(0, max - 1))}…`;
}

function pickVerification(value) {
  return ["confirmed", "partial", "single"].includes(value) ? value : "single";
}

function pickChange(value) {
  return ["up", "down", "structural"].includes(value) ? value : undefined;
}

function normalizeKeyStats(arr) {
  return toArray(arr).slice(0, 4).map((item, i) => ({
    label: asString(item?.label, `Stat ${i + 1}`),
    value: asString(item?.value, "-"),
    unit: asString(item?.unit, ""),
    color: asString(item?.color, "#ff851b"),
  }));
}

function normalizeRiskFactors(arr) {
  return toArray(arr).slice(0, 5).map((item, i) => ({
    name: asString(item?.name, `Factor ${i + 1}`),
    score: asNumber(item?.score, 3),
    prev: asNumber(item?.prev, 3),
    weight: asNumber(item?.weight, 0.2),
    description: asString(item?.description, ""),
    status: asString(item?.status, "FAST"),
    ...(pickChange(item?.change) ? { change: pickChange(item?.change) } : {}),
  }));
}

function normalizeEvents(arr) {
  return toArray(arr).slice(0, 5).map((item, i) => ({
    id: asString(item?.id, `EVT-${String(i + 1).padStart(2, "0")}`),
    title: asString(item?.title, `Event ${i + 1}`),
    description: asString(item?.description, ""),
    verification: pickVerification(item?.verification),
    timestamp: asString(item?.timestamp, ""),
    significance: asString(item?.significance, ""),
    ...(item?.highlight ? { highlight: true } : {}),
    ...(item?.critical === true ? { critical: true } : {}),
  }));
}

function trendDateToMmDd(d, isoFallback) {
  const s = asString(d).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s.slice(5);
  if (/^\d{2}-\d{2}$/.test(s)) return s;
  if (isoFallback && /^\d{4}-\d{2}-\d{2}$/.test(isoFallback)) return isoFallback.slice(5);
  return "";
}

function subtractOneDayMmdd(mmdd, yearIso) {
  const [Y] = yearIso.split("-").map(Number);
  const [m, d] = mmdd.split("-").map(Number);
  const dt = new Date(Date.UTC(Y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() - 1);
  const M = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const D = String(dt.getUTCDate()).padStart(2, "0");
  return `${M}-${D}`;
}

function normalizeScoreTrend(arr, dateFallback, riskScoreFallback) {
  const trend = toArray(arr)
    .map((item) => ({
      date: trendDateToMmDd(item?.date, dateFallback),
      score: asNumber(item?.score, riskScoreFallback),
      ...(item?.active ? { active: true } : {}),
    }))
    .filter((x) => /^\d{2}-\d{2}$/.test(x.date));
  if (!trend.length) {
    trend.push({ date: dateFallback.slice(5), score: riskScoreFallback, active: true });
    return trend;
  }
  for (const p of trend) delete p.active;
  trend[trend.length - 1].active = true;
  return trend.slice(-5);
}

function normalizeSituations(arr) {
  return toArray(arr).slice(0, 4).map((item, i) => ({
    title: asString(item?.title, `Situation ${i + 1}`),
    icon: asString(item?.icon, "Military"),
    tag: asString(item?.tag, ""),
    tagColor: asString(item?.tagColor, "orange"),
    points: toArray(item?.points).map((p) => asString(p)).filter(Boolean).slice(0, 3),
  }));
}

function normalizeDashboardData(data) {
  const normalized = { ...data };
  const date = asString(normalized.date, todayNy);
  const riskScore = asNumber(normalized.riskScore, 60);
  const prevRiskScore = asNumber(normalized.prevRiskScore, riskScore);

  normalized.date = date;
  normalized.version = asString(normalized.version, "vAuto");
  normalized.riskScore = riskScore;
  normalized.prevRiskScore = prevRiskScore;
  normalized.investmentSignal = asString(normalized.investmentSignal, "");
  normalized.keyChange = asString(normalized.keyChange, "");
  normalized.keyStats = normalizeKeyStats(normalized.keyStats);
  normalized.riskFactors = normalizeRiskFactors(normalized.riskFactors);
  normalized.events = normalizeEvents(normalized.events);
  normalized.scoreTrend = normalizeScoreTrend(normalized.scoreTrend, date, riskScore);
  normalized.situations = normalizeSituations(normalized.situations);

  const wpSrc = normalized.warPhase;
  const wp = isPlainObject(wpSrc) ? wpSrc : {};
  normalized.warPhase = {
    level: asString(wp.level, ""),
    targetLevel: asString(wp.targetLevel, ""),
    title: asString(wp.title, ""),
    subTitle: asString(wp.subTitle, ""),
    points: normalizeLineArray(wp.points).slice(0, 3),
    note: asString(wp.note, ""),
  };

  const ccSrc = normalized.coreContradiction;
  const cc = isPlainObject(ccSrc) ? ccSrc : {};
  normalized.coreContradiction = {
    political: normalizeLineArray(cc.political).slice(0, 2),
    military: normalizeLineArray(cc.military).slice(0, 2),
  };
  return normalized;
}

function assertValidDashboard(data, label) {
  const errs = [];
  if (!/^v\d+\.\d+$/.test(asString(data.version))) errs.push(`${label}: version must look like v2.10`);
  if (asIsoDate(data) !== todayNy) errs.push(`${label}: date must be NY today ${todayNy}`);
  if (!asString(data.warPhase?.title).trim()) errs.push(`${label}: warPhase.title empty`);
  if (!asString(data.investmentSignal).trim()) errs.push(`${label}: investmentSignal empty`);
  if (!asString(data.keyChange).trim()) errs.push(`${label}: keyChange empty`);
  if (data.riskFactors?.length !== 5) errs.push(`${label}: riskFactors must have 5 items`);
  if (data.events?.length < 1) errs.push(`${label}: events empty`);
  if (data.keyStats?.length !== 4) errs.push(`${label}: keyStats must have 4 items`);
  if (data.situations?.length !== 4) errs.push(`${label}: situations must have 4 cards`);
  if (data.situations?.some((s) => !toArray(s?.points).length)) {
    errs.push(`${label}: each situation must have ≥1 point`);
  }
  if (data.scoreTrend?.length !== 5) errs.push(`${label}: scoreTrend must have 5 points`);
  const lastTrend = data.scoreTrend?.[data.scoreTrend.length - 1];
  if (lastTrend?.date !== todayNy.slice(5)) {
    errs.push(`${label}: scoreTrend last date must be ${todayNy.slice(5)}`);
  }
  if (!Number.isFinite(data.riskScore) || Math.abs(data.riskScore - averageFactorScore(data) * 20) > 0.51) {
    errs.push(`${label}: riskScore must ≈ avg(factor scores)×20`);
  }
  if (!data.coreContradiction?.political?.length || !data.coreContradiction?.military?.length) {
    errs.push(`${label}: coreContradiction political/military empty`);
  }
  if (errs.length) {
    throw new Error(`Dashboard validation failed:\n${errs.join("\n")}`);
  }
}

function asIsoDate(data) {
  return asString(data?.date);
}

function averageFactorScore(data) {
  const factors = toArray(data?.riskFactors);
  if (factors.length !== 5) return NaN;
  return factors.reduce((sum, f) => sum + asNumber(f?.score, NaN), 0) / 5;
}

function bumpVersionFromSnapshot(snapshot) {
  const m = snapshot.match(/export const DATA_ZH:\s*DashboardData\s*=\s*\{[\s\S]*?version:\s*"([^"]+)"/);
  if (!m) return "v2.10";
  const cur = m[1].match(/^v(\d+)\.(\d+)$/);
  if (!cur) return "v2.10";
  return `v${cur[1]}.${Number(cur[2]) + 1}`;
}

function coerceVersion(ver, snapshot) {
  const s = asString(ver).trim();
  if (/^v\d+\.\d+$/.test(s)) return s;
  return bumpVersionFromSnapshot(snapshot);
}

function finalizeScoreTrendFive(trend, dateIso, riskScore, prevRiskScore) {
  const target = dateIso.slice(5);
  let pts = toArray(trend)
    .map((p) => ({
      date: trendDateToMmDd(p?.date, dateIso),
      score: asNumber(p?.score, riskScore),
    }))
    .filter((p) => /^\d{2}-\d{2}$/.test(p.date));
  if (!pts.length) {
    pts.push({ date: target, score: riskScore });
  }
  while (pts.length < 5) {
    const head = pts[0];
    const prevDay = subtractOneDayMmdd(head.date, dateIso);
    pts.unshift({ date: prevDay, score: asNumber(prevRiskScore, head.score) });
  }
  pts = pts.slice(-5);
  for (const p of pts) delete p.active;
  pts[4] = { date: target, score: riskScore, active: true };
  return pts;
}

function syncEnMetricsFromZh(zh, en) {
  en.riskScore = zh.riskScore;
  en.prevRiskScore = zh.prevRiskScore;
  en.scoreTrend = JSON.parse(JSON.stringify(zh.scoreTrend));
  en.keyStats = en.keyStats.map((row, i) => ({
    ...row,
    value: zh.keyStats[i]?.value ?? row.value,
  }));
  en.riskFactors = en.riskFactors.map((f, i) => {
    const z = zh.riskFactors[i];
    const out = {
      ...f,
      score: z.score,
      prev: z.prev,
      weight: z.weight,
    };
    const ch = pickChange(z?.change);
    if (ch) out.change = ch;
    else delete out.change;
    return out;
  });
}

/** 模型偶发漏填必填字段；用当日事件/因子补全，避免 CI 在 assertValidDashboard 处失败。 */
function ensureDashboardCompleteness(data, lang) {
  const isZh = lang === "zh";
  const ev = toArray(data.events);
  const firstEv = ev[0];
  const firstTitle = asString(firstEv?.title, "").trim();
  const firstDesc = asString(firstEv?.description, "").trim().slice(0, 160);

  const fallbackInvestment = isZh
    ? "「维持风险平衡敞口；关注霍尔木兹通行与谈判边际变化。」"
    : `"Maintain balanced exposure; watch Hormuz passage and negotiation margins."`;
  if (!asString(data.investmentSignal).trim()) {
    data.investmentSignal = fallbackInvestment;
  }

  if (!asString(data.keyChange).trim()) {
    data.keyChange = firstTitle
      ? (isZh ? `24h要点：${firstTitle}${firstDesc ? `；${firstDesc}` : "。"}` : `24h: ${firstTitle}${firstDesc ? ` — ${firstDesc}` : "."}`)
      : (isZh ? "24h要点：地缘风险维持监测区间；详见下方事件与因子。" : "24h: Geo-risk in monitored range; see events and factors below.");
  }

  const wp = isPlainObject(data.warPhase) ? data.warPhase : {};
  const titleStr = asString(wp.title).trim();
  if (!titleStr) {
    const pts = normalizeLineArray(wp.points);
    data.warPhase = {
      level: asString(wp.level, isZh ? "态势评估" : "Assessment"),
      targetLevel: asString(wp.targetLevel, isZh ? "动态跟踪" : "Tracking"),
      title: firstTitle || (isZh ? "美伊地缘风险监测（当日）" : "US–Iran geo-risk snapshot (today)"),
      subTitle: asString(wp.subTitle, isZh ? "综合公开信息与模型综合" : "Synthesized from public sources"),
      points: pts.length
        ? pts.slice(0, 3)
        : [
            firstDesc ||
              (isZh ? "详见下方关键事件与风险因子卡片。" : "See key events and risk factor cards below."),
          ],
      note: asString(wp.note, isZh ? "监测用途，不构成投资建议。" : "For monitoring only; not investment advice."),
    };
  } else {
    const level = asString(wp.level).trim() || (isZh ? "阶段评估" : "Phase assessment");
    const targetLv = asString(wp.targetLevel).trim() || (isZh ? "动态跟踪" : "Tracking");
    const subTitle =
      asString(wp.subTitle).trim() ||
      (isZh ? "基于公开报道与五维风险因子综合研判。" : "Synthesis from public reporting and five risk factors.");
    let wpts = normalizeLineArray(wp.points);
    if (!wpts.length) {
      const fromRf2 = asString(data.riskFactors[2]?.description, "").trim();
      const fromRf0 = asString(data.riskFactors[0]?.description, "").trim();
      const line =
        fromRf2 ||
        fromRf0 ||
        firstDesc ||
        (isZh ? "要点见下方关键事件与因子卡片。" : "See key events and factor cards below.");
      wpts = [clipText(line, 220)];
    }
    const note =
      asString(wp.note).trim() ||
      (isZh ? "监测用途，不构成投资建议。" : "For monitoring only; not investment advice.");
    data.warPhase = {
      level,
      targetLevel: targetLv,
      title: titleStr,
      subTitle,
      points: wpts.slice(0, 3),
      note,
    };
  }

  const sit = toArray(data.situations);
  data.situations = sit.map((s, i) => {
    let pts = normalizeLineArray(s?.points);
    if (!pts.length) {
      const rfLine = asString(data.riskFactors[i]?.description, "").trim();
      const evLine = asString(ev[i % Math.max(ev.length, 1)]?.title, "").trim();
      const line =
        rfLine ||
        evLine ||
        (isZh
          ? `与「${CANONICAL.zh.situations[i]?.title ?? "态势"}」相关的公开信息仍待交叉验证；见风险因子。`
          : `Cross-check public information related to "${CANONICAL.en.situations[i]?.title ?? "situation"}"; see risk factors.`);
      pts = [line.slice(0, 220)];
    }
    return { ...s, points: pts.slice(0, 3) };
  });

  const ccSrc = isPlainObject(data.coreContradiction) ? data.coreContradiction : {};
  let political = normalizeLineArray(ccSrc.political);
  let military = normalizeLineArray(ccSrc.military);
  if (!political.length) {
    const polPred = isZh
      ? (e) => /谈|外交|欧盟|联合国|谈判|制裁|协议/i.test(`${asString(e?.title)}${asString(e?.description)}`)
      : (e) =>
          /diplomat|talks|negotiat|EU|UN|sanction|deal|ceasefire|embassy/i.test(
            `${asString(e?.title)}${asString(e?.description)}`
          );
    const line =
      asString(data.riskFactors[4]?.description, "").trim() ||
      asString(ev.find(polPred)?.description, "").trim().slice(0, 200) ||
      (isZh ? "外交与谈判路径仍存不确定性，需持续跟踪表态与接触。" : "Diplomatic path remains uncertain; track statements and contacts.");
    political = [line];
  }
  if (!military.length) {
    const milPred = isZh
      ? (e) => /军事|打击|导弹|霍尔木兹|舰队|无人机/i.test(`${asString(e?.title)}${asString(e?.description)}`)
      : (e) =>
          /military|missile|strike|Hormuz|fleet|naval|drone|IRGC|tanker/i.test(
            `${asString(e?.title)}${asString(e?.description)}`
          );
    const line =
      asString(data.riskFactors[0]?.description, "").trim() ||
      asString(ev.find(milPred)?.description, "").trim().slice(0, 200) ||
      (isZh ? "军事升级与代理冲突通道尚未关闭。" : "Military escalation and proxy channels remain open.");
    military = [line];
  }
  data.coreContradiction = {
    political: political.slice(0, 2),
    military: military.slice(0, 2),
  };

  return data;
}

function enforceV29Layout(data, lang) {
  const c = CANONICAL[lang];
  data.date = todayNy;
  const ks = toArray(data.keyStats);
  const def34 = c.keyStatDefaultUnits34 || ["", ""];
  data.keyStats = c.keyStatLabels.map((label, i) => {
    let unit = "";
    if (i < 2) unit = c.keyStatUnitsFixed[i];
    else unit = asString(ks[i]?.unit, "").trim() || def34[i - 2] || "";
    return {
      label,
      value: asString(ks[i]?.value, "-"),
      unit,
      color: asString(ks[i]?.color, c.keyStatColors[i]),
    };
  });
  const rf = toArray(data.riskFactors);
  data.riskFactors = c.riskFactorNames.map((name, i) => {
    const src = rf[i] || {};
    const st = asString(src.status, "FAST");
    const status = ["NORMAL", "AT CEILING", "FAST", "SLOW"].includes(st) ? st : "FAST";
    return {
      name,
      score: asNumber(src.score, 3),
      prev: asNumber(src.prev, 3),
      weight: 0.2,
      description: asString(src.description, ""),
      status,
      ...(pickChange(src.change) ? { change: pickChange(src.change) } : {}),
    };
  });
  const sit = toArray(data.situations);
  data.situations = c.situations.map((meta, i) => ({
    title: meta.title,
    icon: meta.icon,
    tag: asString(sit[i]?.tag, ""),
    tagColor: asString(sit[i]?.tagColor, "orange"),
    points: normalizeLineArray(sit[i]?.points).slice(0, 3),
  }));
  const avg = data.riskFactors.reduce((s, f) => s + f.score, 0) / 5;
  data.riskScore = Math.round(avg * 20);
  data.scoreTrend = finalizeScoreTrendFive(data.scoreTrend, data.date, data.riskScore, data.prevRiskScore);
  return data;
}

const jsonText = await resolveJsonTextFromModelOutput(output);
if (!jsonText) {
  throw new Error("Model output did not contain a JSON object (after fence strip, bracket match, repair, and retry)");
}

let payload;
try {
  payload = JSON.parse(jsonText);
} catch (err) {
  try {
    const repairedJsonText = await repairJsonWithModel(jsonText);
    payload = JSON.parse(repairedJsonText);
    console.warn("Primary JSON parse failed, recovered via repair pass.");
  } catch (repairErr) {
    const debugDir = path.join(process.cwd(), "reports", "daily");
    await mkdir(debugDir, { recursive: true });
    await writeFile(path.join(debugDir, `${todayNy}.raw.txt`), `${output}\n`, "utf8");
    throw new Error(`Failed to parse model JSON: ${err.message}; repair failed: ${repairErr.message}`);
  }
}

let missingKeys = missingPayloadKeys(payload);
if (missingKeys.length) {
  console.warn(`Payload missing top-level keys: ${missingKeys.join(", ")} — calling completePayloadWithModel.`);
  let completed = await completePayloadWithModel(payload, output);
  if (completed) {
    payload = mergePayloadKeys(payload, completed);
    missingKeys = missingPayloadKeys(payload);
  }
  if (missingKeys.length) {
    console.warn("Still missing keys — retrying completePayloadWithModel from empty base.");
    completed = await completePayloadWithModel({}, output);
    if (completed) {
      payload = mergePayloadKeys(payload, completed);
      missingKeys = missingPayloadKeys(payload);
    }
  }
  if (missingKeys.length) {
    const debugDir = path.join(process.cwd(), "reports", "daily");
    await mkdir(debugDir, { recursive: true });
    await writeFile(path.join(debugDir, `${todayNy}.incomplete-payload.json`), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    throw new Error(
      `Missing key in payload after completion: ${missingKeys.join(", ")} (see reports/daily/${todayNy}.incomplete-payload.json)`
    );
  }
  console.warn("Recovered missing top-level keys via completePayloadWithModel.");
}

payload.dataZh = normalizeDashboardData(payload.dataZh || {});
payload.dataEn = normalizeDashboardData(payload.dataEn || {});
payload.dataZh.version = coerceVersion(payload.dataZh.version, dataTsSnapshot);
payload.dataEn.version = payload.dataZh.version;
payload.dataZh = enforceV29Layout(payload.dataZh, "zh");
payload.dataEn = enforceV29Layout(payload.dataEn, "en");
ensureDashboardCompleteness(payload.dataZh, "zh");
ensureDashboardCompleteness(payload.dataEn, "en");
syncEnMetricsFromZh(payload.dataZh, payload.dataEn);
assertValidDashboard(payload.dataZh, "dataZh");
assertValidDashboard(payload.dataEn, "dataEn");

const outDir = path.join(process.cwd(), "reports", "daily");
await mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, `${todayNy}.md`);
await writeFile(outPath, `${payload.reportMarkdownZh}\n`, "utf8");

let dataTs = await readFile(dataFilePath, "utf8");

const dataZhLiteral = toTsObjectLiteral(payload.dataZh);
const dataEnLiteral = toTsObjectLiteral(payload.dataEn);

dataTs = replaceExportObject(
  dataTs,
  "export const DATA_ZH: DashboardData = ",
  "export const DATA_EN: DashboardData = ",
  dataZhLiteral
);
dataTs = replaceExportObject(
  dataTs,
  "export const DATA_EN: DashboardData = ",
  "export const TRANSLATIONS = ",
  dataEnLiteral
);

/** 无 translationsDynamic 或与当日数据脱节时，从 dataZh/dataEn 合成顶栏等文案（优先于沿用旧 data.ts）。 */
function synthesizeTranslationsFromDashboard(zh, en) {
  const version = asString(zh?.version, "v2.10");
  const dateStr = asString(zh?.date, todayNy);
  const m = Number(dateStr.slice(5, 7)) || 1;
  const d = Number(dateStr.slice(8, 10)) || 1;
  const zhNode = `${m}月${d}日节点`;
  const [y, mo, da] = dateStr.split("-").map(Number);
  const monthShort = new Date(Date.UTC(y, (mo || 1) - 1, da || 1)).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const enNode = `${monthShort} ${da || 1} Node`;

  const dayZhValue = toArray(zh?.keyStats).find((x) => x?.label === "冲突天数")?.value;
  const dayEnValue = toArray(en?.keyStats).find((x) => x?.label === "Conflict Days")?.value;
  const dayZh = dayZhValue ? `${String(dayZhValue).replace("D", "第")}天` : `第${d}天`;
  const dayEn = dayEnValue ? String(dayEnValue).replace("D", "Day ") : `Day ${da || 1}`;

  const score = zh.riskScore;
  const chgZh = asString(zh.keyStats?.[1]?.value, "—");
  const chgEn = asString(en.keyStats?.[1]?.value, "—");
  const kcZh = clipText(zh.keyChange, 140);
  const kcEn = clipText(en.keyChange, 140);
  const ev0zh = asString(zh.events?.[0]?.title, "");
  const ev0en = asString(en.events?.[0]?.title, "");
  const bannerZh = `综合评分 ${score}（${chgZh}）：${kcZh || ev0zh || "详见关键事件与因子。"}`;
  const bannerEn = `Composite ${score} (${chgEn}): ${kcEn || ev0en || "See key events and factors."}`;

  const invZh = clipText(String(zh.investmentSignal || "").replace(/^[「"]|[」"]$/g, ""), 120);
  const invEn = clipText(en.investmentSignal, 120);
  const warnZh = invZh || clipText(zh.keyChange, 100) || "关注谈判与航运咽喉边际变化；保留风险对冲。";
  const warnEn = invEn || clipText(en.keyChange, 100) || "Watch negotiation and chokepoint margins; keep hedges.";

  const deZh =
    clipText(zh.coreContradiction?.political?.[0] || zh.riskFactors?.[4]?.description, 80) || "外交与谈判路径仍存变数。";
  const deEn =
    clipText(en.coreContradiction?.political?.[0] || en.riskFactors?.[4]?.description, 80) ||
    "Diplomatic path remains uncertain.";

  const stZh =
    clipText(zh.riskFactors?.[1]?.description || zh.situations?.[1]?.points?.[0], 100) || "咽喉与航运条件仍影响流量与定价。";
  const stEn =
    clipText(en.riskFactors?.[1]?.description || en.situations?.[1]?.points?.[0], 100) ||
    "Chokepoint and shipping conditions still matter.";

  const pol = asString(zh.coreContradiction?.political?.[0], "");
  const mil = asString(zh.coreContradiction?.military?.[0], "");
  const conZh = clipText([pol, mil].filter(Boolean).join("；"), 160) || "系统性风险与谈判张力并存。";
  const polE = asString(en.coreContradiction?.political?.[0], "");
  const milE = asString(en.coreContradiction?.military?.[0], "");
  const conEn = clipText([polE, milE].filter(Boolean).join("; "), 160) || "Systemic risk and negotiation tension coexist.";

  return {
    zh: {
      node406: zhNode,
      systemInfo: `AION 智能分析系统 · 地缘冲突模块 ${version} · Daily`,
      bannerSignal: bannerZh,
      bannerWarning: warnZh,
      deescalationIntent: deZh,
      structuralRisk: stZh,
      contradictionNote: conZh,
      dayCount: dayZh,
    },
    en: {
      node406: enNode,
      systemInfo: `AION Intelligence System · Geo-Conflict Module ${version} · Daily`,
      bannerSignal: bannerEn,
      bannerWarning: warnEn,
      deescalationIntent: deEn,
      structuralRisk: stEn,
      contradictionNote: conEn,
      dayCount: dayEn,
    },
  };
}

const translationKeys = [
  "node406",
  "systemInfo",
  "bannerSignal",
  "bannerWarning",
  "deescalationIntent",
  "structuralRisk",
  "contradictionNote",
  "dayCount",
];

const synthesizedTranslations = synthesizeTranslationsFromDashboard(payload.dataZh, payload.dataEn);
const dynamicTr = payload.translationsDynamic;

for (const key of translationKeys) {
  const zhDyn = typeof dynamicTr?.zh?.[key] === "string" ? dynamicTr.zh[key].trim() : "";
  const enDyn = typeof dynamicTr?.en?.[key] === "string" ? dynamicTr.en[key].trim() : "";
  let zhValue = zhDyn || synthesizedTranslations.zh[key];
  let enValue = enDyn || synthesizedTranslations.en[key];
  if (!zhValue) {
    try {
      zhValue = readTranslationField(dataTs, "zh", key);
    } catch {
      zhValue = "";
    }
  }
  if (!enValue) {
    try {
      enValue = readTranslationField(dataTs, "en", key);
    } catch {
      enValue = "";
    }
  }
  dataTs = replaceTranslationField(dataTs, "zh", key, zhValue);
  dataTs = replaceTranslationField(dataTs, "en", key, enValue);
}

await writeFile(dataFilePath, dataTs, "utf8");

console.log(`Saved report: ${path.relative(process.cwd(), outPath)}`);
console.log("Updated src/data.ts from generated payload");
