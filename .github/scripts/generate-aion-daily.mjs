import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
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
        },
        required: ["name", "score", "prev", "weight", "description", "status", "change"],
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

// ── Prompt ──────────────────────────────────────────────────────────
const systemPrompt = `你是 AION Geo-Conflict Monitor 的结构化数据引擎。用网络搜索获取近 24h 美伊相关公开信息后，按 JSON Schema 输出结构化日报。

## 规则
- date 必须是 "${todayNy}"
- version 形如 "v2.10"（每日递增小版本）
- keyStats 恰好 4 项，顺序：冲突天数(Dxx)、评分变化(±N)、油价、霍尔木兹。每项 unit 非空
- riskFactors 恰好 5 项，顺序：军事升级烈度、霍尔木兹航运扰动、能源冲击、大国介入深度、降级谈判前景。weight 一律 0.2。riskScore = round(avg(scores) × 20)
- events 1–5 条。verification 只能是 confirmed/partial/single。highlight/critical 不需要时设 false
- warPhase 所有字段非空；points 1–3 条
- situations 恰好 4 张卡，顺序：军事行动、航运/霍尔木兹、能源市场、领导层信号。每张 points 1–3 条非空
- coreContradiction.political 和 .military 各 1–2 条非空
- scoreTrend 恰好 5 个点，date 为 MM-DD，最后一项 date="${todayMmDd}" active=true score=riskScore
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

// ── Main ───────────────────────────────────────────────────────────
console.log(`Generating AION daily report for ${todayNy} ...`);

const apiPayload = {
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

let data;
try {
  data = await callOpenAI(apiPayload);
} catch (err) {
  console.warn(`Primary call failed (${err.message}), retrying without web_search ...`);
  delete apiPayload.tools;
  data = await callOpenAI(apiPayload);
}

// Extract text from Responses API (output_text or dig into output[].content[].text)
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

const outputText = extractText(data);
if (!outputText) {
  const debugDir = path.join(process.cwd(), "reports", "daily");
  await mkdir(debugDir, { recursive: true });
  await writeFile(path.join(debugDir, `${todayNy}.response.json`), JSON.stringify(data, null, 2), "utf8");
  throw new Error("OpenAI returned no text content (see reports/daily/ for debug)");
}

let payload;
try {
  payload = JSON.parse(outputText);
} catch {
  // Structured output should always be valid JSON, but strip markdown fences just in case
  const cleaned = outputText.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim();
  payload = JSON.parse(cleaned);
}
console.log("Parsed structured output successfully.");
console.log("Parsed structured output successfully.");

// ── Post-process: enforce v2.9 canonical layout ────────────────────
function s(v, fb = "") { return typeof v === "string" ? v : fb; }
function n(v, fb = 0) { const x = Number(v); return Number.isFinite(x) ? x : fb; }
function clip(v, max) { const t = s(v).trim(); return t.length <= max ? t : t.slice(0, max - 1) + "…"; }

function enforceLayout(d, lang) {
  const c = CANONICAL[lang];
  d.date = todayNy;

  // keyStats
  const ks = Array.isArray(d.keyStats) ? d.keyStats : [];
  d.keyStats = c.keyStatLabels.map((label, i) => ({
    label,
    value: s(ks[i]?.value, "-"),
    unit: i < 2 ? c.keyStatUnitsFixed[i] : (s(ks[i]?.unit).trim() || c.keyStatDefaultUnits34[i - 2]),
    color: s(ks[i]?.color, c.keyStatColors[i]),
  }));

  // riskFactors
  const rf = Array.isArray(d.riskFactors) ? d.riskFactors : [];
  d.riskFactors = c.riskFactorNames.map((name, i) => {
    const src = rf[i] || {};
    const validStatus = ["NORMAL", "AT CEILING", "FAST", "SLOW"];
    const validChange = ["up", "down", "structural"];
    return {
      name,
      score: n(src.score, 3),
      prev: n(src.prev, 3),
      weight: 0.2,
      description: s(src.description),
      status: validStatus.includes(src.status) ? src.status : "FAST",
      ...(validChange.includes(src.change) ? { change: src.change } : {}),
    };
  });

  // riskScore from factors
  const avg = d.riskFactors.reduce((sum, f) => sum + f.score, 0) / 5;
  d.riskScore = Math.round(avg * 20);

  // situations
  const sit = Array.isArray(d.situations) ? d.situations : [];
  d.situations = c.situations.map((meta, i) => ({
    title: meta.title,
    icon: meta.icon,
    tag: s(sit[i]?.tag),
    tagColor: s(sit[i]?.tagColor, "orange"),
    points: (Array.isArray(sit[i]?.points) ? sit[i].points : []).filter(Boolean).slice(0, 3),
  }));

  // scoreTrend: ensure 5 points, last = today
  let trend = (Array.isArray(d.scoreTrend) ? d.scoreTrend : [])
    .map(p => ({ date: s(p.date), score: n(p.score, d.riskScore) }))
    .filter(p => /^\d{2}-\d{2}$/.test(p.date));
  if (!trend.length) trend.push({ date: todayMmDd, score: d.riskScore });
  while (trend.length < 5) {
    const h = trend[0];
    const [mm, dd] = h.date.split("-").map(Number);
    const dt = new Date(Date.UTC(2026, mm - 1, dd));
    dt.setUTCDate(dt.getUTCDate() - 1);
    const prev = `${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
    trend.unshift({ date: prev, score: n(d.prevRiskScore, h.score) });
  }
  trend = trend.slice(-5);
  d.scoreTrend = trend.map((p, i) => {
    const obj = { date: p.date, score: p.score };
    if (i === 4) { obj.date = todayMmDd; obj.score = d.riskScore; obj.active = true; }
    return obj;
  });

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

  // warPhase: ensure non-empty
  const wp = d.warPhase || {};
  d.warPhase = {
    level: s(wp.level) || (lang === "zh" ? "阶段评估" : "Phase assessment"),
    targetLevel: s(wp.targetLevel) || (lang === "zh" ? "动态跟踪" : "Tracking"),
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
  en.keyStats = en.keyStats.map((row, i) => ({ ...row, value: zh.keyStats[i]?.value ?? row.value }));
  en.riskFactors = en.riskFactors.map((f, i) => ({
    ...f, score: zh.riskFactors[i].score, prev: zh.riskFactors[i].prev, weight: zh.riskFactors[i].weight,
    ...(zh.riskFactors[i].change ? { change: zh.riskFactors[i].change } : {}),
  }));
}

// Version from existing data.ts
const dataFilePath = path.join(process.cwd(), "src", "data.ts");
let dataTsSnapshot = "";
try { dataTsSnapshot = await readFile(dataFilePath, "utf8"); } catch { /* ok */ }

function bumpVersion(snapshot) {
  const m = snapshot.match(/version:\s*"v(\d+)\.(\d+)"/);
  if (!m) return "v2.10";
  return `v${m[1]}.${Number(m[2]) + 1}`;
}

const version = /^v\d+\.\d+$/.test(s(payload.dataZh?.version))
  ? payload.dataZh.version
  : bumpVersion(dataTsSnapshot);

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
