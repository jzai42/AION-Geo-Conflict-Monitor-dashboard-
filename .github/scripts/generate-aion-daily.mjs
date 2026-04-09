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

const prompt = `你是AION地缘冲突数据引擎。请搜索过去24小时美伊冲突动态，输出“仅JSON对象”，禁止markdown与解释。

核心规则：
1) 重大事件必须 >=2独立来源，或1个一级官方声明。
2) 单一来源必须标记为未验证，并不得用于评分依据。
3) 中文与英文都要给，结构固定，字段齐全。
4) 输出必须可直接映射到前端数据结构（DashboardData）。
5) 日期请用纽约时区今天：${todayNy}。

请严格按以下JSON结构返回（key名不能改）：
{
  "reportMarkdownZh": "一个中文日报，必须是单个代码块字符串",
  "dataZh": DashboardData对象,
  "dataEn": DashboardData对象,
  "translationsDynamic": {
    "zh": {
      "node406": "如 4月9日节点",
      "systemInfo": "如 AION 智能分析系统 · 地缘冲突模块 vX.X · Daily",
      "bannerSignal": "...",
      "bannerWarning": "...",
      "deescalationIntent": "...",
      "structuralRisk": "...",
      "contradictionNote": "...",
      "dayCount": "如 第40天"
    },
    "en": {
      "node406": "如 Apr 9 Node",
      "systemInfo": "如 AION Intelligence System · Geo-Conflict Module vX.X · Daily",
      "bannerSignal": "...",
      "bannerWarning": "...",
      "deescalationIntent": "...",
      "structuralRisk": "...",
      "contradictionNote": "...",
      "dayCount": "如 Day 40"
    }
  }
}

DashboardData要求：
- 必含字段：date/version/keyStats/warPhase/riskScore/prevRiskScore/investmentSignal/riskFactors/events/keyChange/scoreTrend/situations/coreContradiction
- events.verification 仅可为 confirmed/partial/single
- riskFactors.change 仅可为 up/down/structural，或省略
- 分数必须和公式一致：Score = 平均值 * 20
- scoreTrend 最后一个点 active=true，日期与data.date一致
- 只写过去24h变化，最多5个事件。
`;

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

function extractJsonObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

async function repairJsonWithModel(badJsonText) {
  const repairPrompt = `你是JSON修复器。请将下面文本修复为严格合法JSON。
要求：
1) 只输出JSON对象本身
2) 不添加解释
3) 不改key名
4) 保留原语义

待修复文本：
${badJsonText}`;

  const repairedResp = await callOpenAI({
    model: OPENAI_MODEL,
    input: repairPrompt,
  });
  const repairedText = collectTextFromResponse(repairedResp);
  return extractJsonObject(repairedText) || repairedText;
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

function asString(value, fallback = "") {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function asNumber(value, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
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
  }));
}

function normalizeScoreTrend(arr, dateFallback, riskScoreFallback) {
  const trend = toArray(arr).map((item) => ({
    date: asString(item?.date, ""),
    score: asNumber(item?.score, riskScoreFallback),
    ...(item?.active ? { active: true } : {}),
  })).filter((x) => x.date);
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
  normalized.warPhase = {
    ...(normalized.warPhase || {}),
    level: asString(normalized.warPhase?.level, ""),
    targetLevel: asString(normalized.warPhase?.targetLevel, ""),
    title: asString(normalized.warPhase?.title, ""),
    subTitle: asString(normalized.warPhase?.subTitle, ""),
    points: toArray(normalized.warPhase?.points).map((p) => asString(p)).filter(Boolean).slice(0, 3),
    note: asString(normalized.warPhase?.note, ""),
  };
  normalized.coreContradiction = {
    ...(normalized.coreContradiction || {}),
    political: toArray(normalized.coreContradiction?.political).map((p) => asString(p)).filter(Boolean).slice(0, 2),
    military: toArray(normalized.coreContradiction?.military).map((p) => asString(p)).filter(Boolean).slice(0, 2),
  };
  return normalized;
}

const jsonText = extractJsonObject(output);
if (!jsonText) {
  const debugDir = path.join(process.cwd(), "reports", "daily");
  await mkdir(debugDir, { recursive: true });
  await writeFile(path.join(debugDir, `${todayNy}.raw.txt`), `${output}\n`, "utf8");
  throw new Error("Model output did not contain a JSON object");
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

const requiredTopKeys = ["reportMarkdownZh", "dataZh", "dataEn"];
for (const key of requiredTopKeys) {
  if (!(key in payload)) {
    throw new Error(`Missing key in payload: ${key}`);
  }
}

payload.dataZh = normalizeDashboardData(payload.dataZh || {});
payload.dataEn = normalizeDashboardData(payload.dataEn || {});

const outDir = path.join(process.cwd(), "reports", "daily");
await mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, `${todayNy}.md`);
await writeFile(outPath, `${payload.reportMarkdownZh}\n`, "utf8");

const dataPath = path.join(process.cwd(), "src", "data.ts");
let dataTs = await readFile(dataPath, "utf8");

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

function buildFallbackTranslations() {
  const zhNode = `${Number(payload.dataZh?.date?.slice(5, 7) || "1")}月${Number(payload.dataZh?.date?.slice(8, 10) || "1")}日节点`;
  const enDate = payload.dataEn?.date || payload.dataZh?.date || todayNy;
  const [y, m, d] = enDate.split("-").map(Number);
  const monthShort = new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const enNode = `${monthShort} ${Number(d || 1)} Node`;
  const version = payload.dataZh?.version || payload.dataEn?.version || "vX.X";
  const dayZhValue = toArray(payload.dataZh?.keyStats).find((x) => x?.label === "冲突天数")?.value;
  const dayEnValue = toArray(payload.dataEn?.keyStats).find((x) => x?.label === "Conflict Days")?.value;
  const dayZh = dayZhValue ? `${dayZhValue.replace("D", "第")}天` : "";
  const dayEn = dayEnValue ? dayEnValue.replace("D", "Day ") : "";

  return {
    zh: {
      node406: zhNode,
      systemInfo: `AION 智能分析系统 · 地缘冲突模块 ${version} · Daily`,
      bannerSignal: readTranslationField(dataTs, "zh", "bannerSignal"),
      bannerWarning: readTranslationField(dataTs, "zh", "bannerWarning"),
      deescalationIntent: readTranslationField(dataTs, "zh", "deescalationIntent"),
      structuralRisk: readTranslationField(dataTs, "zh", "structuralRisk"),
      contradictionNote: readTranslationField(dataTs, "zh", "contradictionNote"),
      dayCount: dayZh || readTranslationField(dataTs, "zh", "dayCount"),
    },
    en: {
      node406: enNode,
      systemInfo: `AION Intelligence System · Geo-Conflict Module ${version} · Daily`,
      bannerSignal: readTranslationField(dataTs, "en", "bannerSignal"),
      bannerWarning: readTranslationField(dataTs, "en", "bannerWarning"),
      deescalationIntent: readTranslationField(dataTs, "en", "deescalationIntent"),
      structuralRisk: readTranslationField(dataTs, "en", "structuralRisk"),
      contradictionNote: readTranslationField(dataTs, "en", "contradictionNote"),
      dayCount: dayEn || readTranslationField(dataTs, "en", "dayCount"),
    },
  };
}

const fallbackTranslations = buildFallbackTranslations();
const dynamic = payload.translationsDynamic || fallbackTranslations;

for (const key of translationKeys) {
  const zhValue = dynamic?.zh?.[key] ?? fallbackTranslations.zh[key];
  const enValue = dynamic?.en?.[key] ?? fallbackTranslations.en[key];
  dataTs = replaceTranslationField(dataTs, "zh", key, zhValue);
  dataTs = replaceTranslationField(dataTs, "en", key, enValue);
}

await writeFile(dataPath, dataTs, "utf8");

console.log(`Saved report: ${path.relative(process.cwd(), outPath)}`);
console.log("Updated src/data.ts from generated payload");
