/**
 * Single Source of Truth for AION composite risk scores.
 *
 * Model markdown / keyChange are generated BEFORE ensemble/stale/secondary
 * adjustments. After finalRiskScore is known, this module rewrites narrative
 * surfaces and asserts they all agree — otherwise the daily job must fail.
 */

function asFinite(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : null;
}

export function compositeFromFactors(factors) {
  const xs = (Array.isArray(factors) ? factors : []).map((n) => asFinite(n) ?? 3);
  if (!xs.length) return null;
  return Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 20);
}

export function formatDelta(delta, lang = "zh") {
  const d = asFinite(delta);
  if (d == null) return lang === "zh" ? "N/A" : "N/A";
  if (d === 0) return lang === "zh" ? "持平（+0）" : "flat (+0)";
  if (d > 0) return lang === "zh" ? `+${d}` : `+${d}`;
  return `${d}`;
}

export function structureLabelFromTrend(scores, lang = "zh") {
  const xs = (Array.isArray(scores) ? scores : []).map((n) => asFinite(n)).filter((n) => n != null);
  if (xs.length < 2) return lang === "zh" ? "样本不足" : "insufficient sample";
  const last = xs[xs.length - 1];
  const prev = xs[xs.length - 2];
  const delta = last - prev;
  const unique = new Set(xs);
  if (Math.abs(delta) >= 8) {
    return lang === "zh" ? (delta < 0 ? "显著回落" : "显著上行") : (delta < 0 ? "sharp drop" : "sharp rise");
  }
  if (unique.size === 1) return lang === "zh" ? "高位黏滞" : "sticky plateau";
  if (Math.abs(delta) <= 2 && unique.size <= 2) return lang === "zh" ? "窄幅震荡" : "narrow chop";
  return lang === "zh" ? "波动调整" : "volatile adjustment";
}

/** True when keyChange (or similar) embeds a composite-score claim. */
export function textClaimsCompositeScore(text) {
  const t = String(text || "");
  if (!t.trim()) return false;
  if (/\d{2,3}\s*分/.test(t)) return true;
  if (/(?:综合|风险|落盘|评分|score|composite).{0,12}\d{2,3}/i.test(t)) return true;
  if (/\d{2,3}\s*(?:sticky|platform|plateau|points?)/i.test(t)) return true;
  if (/(?:保持|维持|降至|升至|回落至|上行至|黏滞).{0,8}\d{2,3}/.test(t)) return true;
  return false;
}

/** Strip clauses that assert a composite score so we can rebuild from finalResult. */
export function stripCompositeScoreClaims(text, lang = "zh") {
  let t = String(text || "").trim();
  if (!t) return "";
  // Remove parenthetical / trailing score fragments.
  t = t
    .replace(/[，,；;]?\s*(?:综合)?(?:风险)?(?:评)?分[^。；;\n]{0,24}\d{2,3}\s*分?[^。；;\n]{0,16}/g, "")
    .replace(/[，,；;]?\s*(?:composite|risk)?\s*score[^.;\n]{0,24}\d{2,3}[^.;\n]{0,16}/gi, "")
    .replace(/\d{2,3}\s*分(?:平台期|黏滞态势|高位黏滞)?/g, "")
    .replace(/\bsticky\s+at\s+\d{2,3}\b/gi, "")
    .replace(/\b\d{2,3}\s*platform\b/gi, "")
    .replace(/[，,；;]\s*$/g, "")
    .replace(/^\s*[，,；;]\s*/g, "")
    .trim();
  if (lang === "zh") t = t.replace(/[；;]\s*$/g, "").trim();
  return t;
}

export function buildFinalScoreClause({ lang = "zh", finalScore, priorScore, rawScore, adjustmentReason } = {}) {
  const final = asFinite(finalScore);
  const prior = asFinite(priorScore);
  const raw = asFinite(rawScore);
  if (final == null) return "";
  const delta = prior != null ? final - prior : null;
  const deltaStr = formatDelta(delta, lang);
  if (lang === "zh") {
    let clause = `综合风险分落盘 ${final}`;
    if (prior != null) clause += `（较昨日 ${deltaStr}）`;
    if (raw != null && raw !== final) {
      clause += `；调整前模型分 ${raw}`;
      if (adjustmentReason) clause += `（${adjustmentReason}）`;
    }
    return clause;
  }
  let clause = `composite risk score prints at ${final}`;
  if (prior != null) clause += ` (vs prior day ${deltaStr})`;
  if (raw != null && raw !== final) {
    clause += `; pre-adjustment model score ${raw}`;
    if (adjustmentReason) clause += ` (${adjustmentReason})`;
  }
  return clause;
}

/**
 * keyChange with score digits must be rebuilt from finalResult — never ship
 * the pre-adjustment model sentence as-is.
 */
export function syncKeyChangeToFinalScore(text, opts = {}) {
  const lang = opts.lang === "en" ? "en" : "zh";
  const finalScore = asFinite(opts.finalScore);
  const priorScore = asFinite(opts.priorScore);
  const rawScore = asFinite(opts.rawScore);
  const adjustmentReason = opts.adjustmentReason ? String(opts.adjustmentReason) : "";
  const original = String(text || "").trim();
  const needsRebuild =
    textClaimsCompositeScore(original) ||
    (rawScore != null && finalScore != null && rawScore !== finalScore);

  if (!needsRebuild) {
    return { text: original, changed: false, rebuilt: false };
  }

  const base = stripCompositeScoreClaims(original, lang);
  const scoreClause = buildFinalScoreClause({
    lang,
    finalScore,
    priorScore,
    rawScore,
    adjustmentReason,
  });
  const joiner = lang === "zh" ? "；" : "; ";
  let next;
  if (base && scoreClause) next = `${base.replace(/[。．.]$/, "")}${joiner}${scoreClause}`;
  else next = scoreClause || base || original;
  next = next.replace(/\s+/g, " ").trim();
  return { text: next, changed: next !== original, rebuilt: true };
}

function formatTrendRangeLine(scoreTrend, todayIso, lang = "zh") {
  const pts = Array.isArray(scoreTrend) ? scoreTrend : [];
  if (!pts.length) return null;
  const year = String(todayIso || "").slice(0, 4) || "2026";
  const parts = pts.map((p) => {
    const d = String(p?.date || "");
    const iso = /^\d{2}-\d{2}$/.test(d) ? `${year}-${d}` : d;
    return `${iso} (${asFinite(p?.score) ?? "—"})`;
  });
  if (lang === "zh") return `- **区间**：${parts.join(" → ")}`;
  return `- **Range**: ${parts.join(" → ")}`;
}

function rewriteTakeawayScoreClaims(line, { lang, finalScore, priorScore, rawScore }) {
  const final = asFinite(finalScore);
  const prior = asFinite(priorScore);
  const raw = asFinite(rawScore);
  if (final == null) return line;
  const delta = prior != null ? final - prior : null;
  let body = String(line || "");
  // Drop wrong sticky / platform claims tied to raw score.
  if (lang === "zh") {
    body = body
      .replace(/评分维持\d{2,3}分平台期/g, `落盘综合分 ${final}${delta != null && delta !== 0 ? `（较昨日 ${formatDelta(delta, "zh")}）` : ""}`)
      .replace(/维持\d{2,3}分(?:平台期|黏滞)?/g, `落盘为 ${final}`)
      .replace(/保持\d{2,3}分[^。]{0,8}/g, `落盘 ${final}`);
    if (raw != null && raw !== final && !body.includes("调整前模型分")) {
      body = body.replace(/[。．]?\s*$/, `。调整前模型分 ${raw}。`);
    }
  } else {
    body = body
      .replace(/sticky at \d{2,3}/gi, `prints at ${final}`)
      .replace(/held (?:at )?${raw ?? "\\d{2,3}"}/gi, `prints at ${final}`)
      .replace(/score (?:remains|stays|held) (?:at )?\\d{2,3}/gi, `score prints at ${final}`);
    if (raw != null && raw !== final && !/pre-adjustment model score/i.test(body)) {
      body = body.replace(/[.]*\s*$/, `. Pre-adjustment model score ${raw}.`);
    }
  }
  // Ensure final score appears if line still claims a different 2-digit score.
  const claimed = body.match(/(\d{2,3})\s*分/) || body.match(/\b(\d{2,3})\b/);
  if (claimed && Number(claimed[1]) !== final && Number(claimed[1]) === raw) {
    body = body.replace(String(raw), String(final));
  }
  return body;
}

/**
 * Rewrite markdown headline / §4 composite score blocks from finalResult.
 * Does not invent politics — only score arithmetic and trend labels.
 */
export function syncMarkdownCompositeScores(markdown, opts = {}) {
  const lang = "zh"; // reportMarkdownZh only
  let md = typeof markdown === "string" ? markdown : "";
  const finalScore = asFinite(opts.finalScore);
  const priorScore = asFinite(opts.priorScore);
  const rawScore = asFinite(opts.rawScore);
  const factors = Array.isArray(opts.factors) ? opts.factors.map((n) => asFinite(n) ?? 3) : null;
  const scoreTrend = Array.isArray(opts.scoreTrend) ? opts.scoreTrend : [];
  const todayIso = opts.todayIso || "";
  const adjustmentReason = opts.adjustmentReason ? String(opts.adjustmentReason) : "";
  if (!md || finalScore == null) {
    return { markdown: md, changed: false, previousHeadline: parseMarkdownHeadlineScore(md) };
  }

  const previousHeadline = parseMarkdownHeadlineScore(md);
  let changed = false;

  // §0 five-day range
  const rangeLine = formatTrendRangeLine(scoreTrend, todayIso, lang);
  if (rangeLine) {
    const next = md.replace(
      /^([ \t]*-\s*\*\*区间\*\*[：:][^\n]*)/m,
      () => {
        changed = true;
        return rangeLine;
      },
    );
    if (next !== md) md = next;
  }

  // §0 structure label
  const struct = structureLabelFromTrend(
    scoreTrend.map((p) => p.score),
    lang,
  );
  {
    const next = md.replace(/^([ \t]*-\s*\*\*结构\*\*[：:][^\n]*)/m, () => {
      changed = true;
      return `- **结构**：${struct}`;
    });
    if (next !== md) md = next;
  }

  // §0 takeaway
  {
    const next = md.replace(/^([ \t]*-\s*\*\*一句话 takeaway\*\*[：:][^\n]*)/m, (full) => {
      const idx = full.indexOf("：") >= 0 ? full.indexOf("：") : full.indexOf(":");
      const prefix = idx >= 0 ? full.slice(0, idx + 1) : "- **一句话 takeaway**：";
      const body = idx >= 0 ? full.slice(idx + 1).trim() : "";
      const rewritten = rewriteTakeawayScoreClaims(body, { lang, finalScore, priorScore, rawScore });
      changed = true;
      return `${prefix} ${rewritten}`.replace(/\s+/g, " ");
    });
    if (next !== md) md = next;
  }

  // §3 five factor scores (keep prose, rewrite leading score tokens)
  if (factors && factors.length === 5) {
    const names = ["军事升级烈度", "霍尔木兹航运扰动", "能源冲击", "大国介入深度", "降级/谈判前景"];
    for (let i = 0; i < 5; i++) {
      const name = names[i];
      const score = factors[i];
      const re = new RegExp(`(^\\s*-\\s*\\*\\*${name}\\*\\*[：:]?)\\s*\\d(?:\\.5)?\\s*分?`, "m");
      const next = md.replace(re, (_, prefix) => {
        changed = true;
        return `${prefix}${score}分`;
      });
      if (next !== md) md = next;
    }
  }

  // §4 Average / Score / Δ
  if (factors && factors.length === 5) {
    const avg = (factors.reduce((a, b) => a + b, 0) / 5).toFixed(1).replace(/\.0$/, "");
    const next = md.replace(/(-\s*\*\*Average\*\*[：:]\s*)([^\n]+)/i, (_, p) => {
      changed = true;
      return `${p}${avg}`;
    });
    if (next !== md) md = next;
  }
  {
    const next = md.replace(/(-\s*\*\*Score\s*\/\s*100\*\*[：:]\s*)(\d{2,3})/i, (_, p) => {
      changed = true;
      return `${p}${finalScore}`;
    });
    if (next !== md) md = next;
  }
  if (parseMarkdownHeadlineScore(md) == null) {
    // Ensure §4 headline exists so invariant can bind (fallback / truncated model md).
    if (/###\s*4[）)]\s*地缘冲突综合分/.test(md)) {
      md = md.replace(
        /(###\s*4[）)]\s*地缘冲突综合分[^\n]*\n)/,
        `$1- **Score /100**：${finalScore}\n`,
      );
    } else {
      md += `\n\n### 4）地缘冲突综合分\n- **Score /100**：${finalScore}\n`;
    }
    changed = true;
  }
  {
    const delta = priorScore != null ? finalScore - priorScore : null;
    const deltaLine = `- **较昨日 Δ**：${formatDelta(delta, lang)}`;
    const next = md.replace(/^([ \t]*-\s*\*\*较昨日 Δ\*\*[：:][^\n]*)/m, () => {
      changed = true;
      return deltaLine;
    });
    if (next !== md) md = next;
  }

  // If raw leaked as the only Score/100 and regex missed, force a note is not needed —
  // invariant will catch remaining mismatches.

  void adjustmentReason;
  return { markdown: md, changed, previousHeadline };
}

/** Parse Score /100 from §4 (headline composite). */
export function parseMarkdownHeadlineScore(markdown) {
  const md = typeof markdown === "string" ? markdown : "";
  // Prefer §4 block before appendix
  const body = md.split(/###\s*附录：/)[0] || md;
  const m =
    body.match(/-\s*\*\*Score\s*\/\s*100\*\*[：:]\s*(\d{2,3})/i) ||
    body.match(/Score\s*\/\s*100[：:]\s*(\d{2,3})/i) ||
    body.match(/综合分[^\d]{0,8}(\d{2,3})/);
  return m ? asFinite(m[1]) : null;
}

/** Parse today's score from the script-authored appendix table. */
export function parseAppendixTodayScore(markdown, todayIso) {
  const md = typeof markdown === "string" ? markdown : "";
  const mToday = todayIso
    ? md.match(new RegExp(`\\|\\s*${todayIso}\\s*\\|\\s*(\\d{2,3})\\s*\\|`))
    : null;
  if (mToday) return asFinite(mToday[1]);
  const mPrint = md.match(/今日落盘分\s*\*\*(\d{2,3})\*\*/);
  return mPrint ? asFinite(mPrint[1]) : null;
}

export function parseKeyChangeClaimedScore(text) {
  const t = String(text || "");
  const m =
    t.match(/落盘\s*(\d{2,3})/) ||
    t.match(/综合风险分[^0-9]{0,6}(\d{2,3})/) ||
    t.match(/(\d{2,3})\s*分/) ||
    t.match(/prints at\s*(\d{2,3})/i);
  return m ? asFinite(m[1]) : null;
}

/**
 * Collect comparable scores from the would-be publish surfaces.
 * @returns {{
 *   finalRiskScore: number|null,
 *   headlineScore: number|null,
 *   scoreTrendLatest: number|null,
 *   appendixScore: number|null,
 *   dashboardScore: number|null,
 *   keyChangeScore: number|null,
 * }}
 */
export function collectPublishScores({
  finalRiskScore,
  markdown,
  todayIso,
  scoreTrend,
  dashboardRiskScore,
  keyChange,
} = {}) {
  const trend = Array.isArray(scoreTrend) ? scoreTrend : [];
  const trendLatest = trend.length ? asFinite(trend[trend.length - 1]?.score) : null;
  return {
    finalRiskScore: asFinite(finalRiskScore),
    headlineScore: parseMarkdownHeadlineScore(markdown),
    scoreTrendLatest: trendLatest,
    appendixScore: parseAppendixTodayScore(markdown, todayIso),
    dashboardScore: asFinite(dashboardRiskScore),
    keyChangeScore: parseKeyChangeClaimedScore(keyChange),
  };
}

/**
 * Invariant: headline = final = scoreTrend latest = appendix = dashboard.
 * keyChange, when it claims a score, must also equal final.
 * Throws Error on mismatch (daily job must fail).
 */
export function assertScoreConsistency(parts = {}) {
  const scores = collectPublishScores(parts);
  const final = scores.finalRiskScore;
  if (final == null) throw new Error("score-consistency: missing finalRiskScore");

  const required = [
    ["headlineScore", scores.headlineScore],
    ["scoreTrendLatest", scores.scoreTrendLatest],
    ["appendixScore", scores.appendixScore],
    ["dashboardScore", scores.dashboardScore],
  ];
  const mismatches = [];
  for (const [name, val] of required) {
    if (val == null) {
      mismatches.push(`${name}=missing`);
      continue;
    }
    if (val !== final) mismatches.push(`${name}=${val}`);
  }
  if (scores.keyChangeScore != null && scores.keyChangeScore !== final) {
    mismatches.push(`keyChangeScore=${scores.keyChangeScore}`);
  }
  // keyChange that still claims a composite score must parse to final
  if (textClaimsCompositeScore(parts.keyChange) && scores.keyChangeScore == null) {
    mismatches.push("keyChangeScore=unparseable");
  }
  if (mismatches.length) {
    throw new Error(
      `score-consistency invariant failed: finalRiskScore=${final}; ` +
        mismatches.join(", ") +
        `. Refusing to publish contradictory daily report.`,
    );
  }
  return scores;
}

export function buildAdjustmentReason({
  rawFactors,
  finalFactors,
  secondaryBlended = false,
  sourceVerificationClamped = false,
  locked = false,
} = {}) {
  const raw = compositeFromFactors(rawFactors);
  const fin = compositeFromFactors(finalFactors);
  if (raw == null || fin == null || raw === fin) {
    if (locked) return "locked-date-preserve";
    return "";
  }
  const bits = [];
  if (secondaryBlended) bits.push("staleDays≥4 与 OpenAI 副审逐维均值");
  if (sourceVerificationClamped) bits.push("sourceVerification clamp");
  if (locked) bits.push("locked date");
  if (!bits.length) bits.push("ensemble post-process");
  return bits.join("；");
}

/** Replace or append the auditable 5-day appendix from authoritative history. */
export function upsertZhReportDataAppendix(md, historyArr, todayIso, priorScore, todayScore, addDaysIso, scoreForDate) {
  const m0 = String(md || "").trimEnd();
  const stripped = m0.replace(/\n*###\s*附录：近5个公历日综合分[\s\S]*$/m, "").trimEnd();
  const dates = [4, 3, 2, 1, 0].map((k) => addDaysIso(todayIso, -k));
  const rows = dates
    .map((iso) => {
      const sc = scoreForDate(historyArr, iso);
      return `| ${iso} | ${sc ?? "—"} |`;
    })
    .join("\n");
  const nums = dates.map((iso) => scoreForDate(historyArr, iso)).filter((x) => x != null);
  const lo = nums.length ? Math.min(...nums) : "—";
  const hi = nums.length ? Math.max(...nums) : "—";
  const delta = priorScore != null && todayScore != null ? todayScore - priorScore : null;
  const deltaStr = delta == null ? "N/A" : delta > 0 ? `+${delta}` : `${delta}`;
  const appendix = `

### 附录：近5个公历日综合分（脚本据 score-history 填写，可审计）

| 日期 | 综合分 |
|------|--------|
${rows}

- **区间（有数据日）**：${lo}–${hi}
- **较昨日 Δ**：${deltaStr}（今日落盘分 **${todayScore}**）
`;
  return stripped + appendix;
}
