/**
 * Oil-price quality checks for the AION daily generator.
 *
 * Product rubric (Energy Shock / 能源冲击, riskFactors[2]) — copied from
 * `.github/scripts/generate-aion-daily.mjs` system prompt, §3:
 *   1 = combined WTI+Brent range sits **<$75** (or narrative clearly below 75)
 *   2 = range body **$75–85** (mildly firm)
 *   3 = range body **$85–100** (clearly firm)
 *   4 = range tags or high-end enters **$100–120** (crisis band)
 *   5 = high-end or narrative **>$120** (extreme spike)
 * Cross-band ranges pick the **higher-risk / high-end** band (conservative).
 *
 * Dashboard StatCards show intentional WTI/Brent RANGES, not a single settle.
 * This module does not change UI colors; it only validates pipeline output
 * so a $70s card cannot ship next to an energy score of 4 (~$100–120).
 */

/** Inclusive USD/bbl bands used to map a point price onto an energy score. */
export const ENERGY_RUBRIC_BANDS = Object.freeze([
  { score: 1, min: 0, max: 75, maxExclusive: true, label: "<$75" },
  { score: 2, min: 75, max: 85, maxExclusive: true, label: "$75–85" },
  { score: 3, min: 85, max: 100, maxExclusive: true, label: "$85–100" },
  { score: 4, min: 100, max: 120, maxExclusive: false, label: "$100–120" },
  { score: 5, min: 120, max: Infinity, maxExclusive: true, label: ">$120" },
]);

const OIL_URL_HINT = /oil|wti|brent|crude|petroleum|energy|reuters|bloomberg|wsj|ft\.com|cnbc/i;

/** Narrative that claims oil/energy risk is easing (forbidden when price is in crisis band). */
const OIL_EASING_NARRATIVE = Object.freeze([
  /油价[^。；\n]{0,24}(回落|下跌|大跌|暴跌|降温|退潮|缓和)/,
  /油价恐慌[^。；\n]{0,12}(退潮|缓解|消退)/,
  /(供应|能源).{0,12}(恐慌|担忧).{0,12}(缓解|消退|降温)/,
  /能源(设施)?(打击|攻击)?风险.{0,12}(排除|解除|缓解|下降)/,
  /避险情绪.{0,8}(降温|回落)/,
  /减持.{0,8}(大宗|能源|商品)/,
  /reduce\s+(commodity|energy)\s+exposure/i,
  /oil\s+(fear|panic).{0,16}(retreat|ease|eased|fade)/i,
  /oil\s+prices?\s+(dropped|fell|fall|decline|declined|retreat|retreated|ease|eased)/i,
  /energy\s+infrastructure\s+attack\s+risk\s+mitigated/i,
  /supply\s+disruption\s+fears?\s+(eased|ease|faded)/i,
  /prices?\s+dropped\s+as\s+supply/i,
]);

/** Narrative that claims oil is spiking / crisis (forbidden when price is soft <$85 mid). */
const OIL_SPIKE_NARRATIVE = Object.freeze([
  /油价[^。；\n]{0,24}(飙升|暴涨|急涨|站稳\s*\$?100|重回\s*\$?100)/,
  /危机带/,
  /panic\s+buying/i,
  /oil\s+prices?\s+(surge|surged|spike|spiked|soar|soared)/i,
  /\$100\+?\s*crisis\s+band/i,
  /holds?\s+\$100\+/i,
]);

/**
 * Collect narrative surfaces that must agree with the oil card direction.
 * @returns {string}
 */
export function collectOilNarrativeCorpus({
  keyChange,
  investmentSignal,
  warPhasePoints,
  energyDescription,
  energyEvidence,
  situationEnergyPoints,
  markdown,
  extraTexts,
} = {}) {
  const bits = [];
  const push = (x) => {
    if (typeof x === "string" && x.trim()) bits.push(x.trim());
  };
  push(keyChange);
  push(investmentSignal);
  push(energyDescription);
  push(energyEvidence);
  push(markdown);
  if (Array.isArray(warPhasePoints)) warPhasePoints.forEach(push);
  if (Array.isArray(situationEnergyPoints)) situationEnergyPoints.forEach(push);
  if (Array.isArray(extraTexts)) extraTexts.forEach(push);
  return bits.join("\n");
}

/**
 * Direction implied by oil mid/high bands:
 *   firm = crisis/elevated (midBand ≥ 4 or highBand ≥ 4)
 *   soft = subdued (midBand ≤ 2 and highBand ≤ 2)
 *   mid  = otherwise
 */
export function oilPriceDirectionFromImplied(implied) {
  if (!implied) return null;
  const mid = implied.midBand;
  const high = implied.highBand;
  if (mid == null && high == null) return null;
  if ((mid != null && mid >= 4) || (high != null && high >= 4)) return "firm";
  if ((mid == null || mid <= 2) && (high == null || high <= 2)) return "soft";
  return "mid";
}

/**
 * Scan narrative for phrases that contradict the oil card direction.
 * @returns {{ hardFail: boolean, hits: string[], reason: string|null }}
 */
export function oilNarrativeDirectionConflict(direction, corpus) {
  const text = typeof corpus === "string" ? corpus : "";
  if (!text.trim() || !direction || direction === "mid") {
    return { hardFail: false, hits: [], reason: null };
  }
  const hits = [];
  if (direction === "firm") {
    for (const re of OIL_EASING_NARRATIVE) {
      const m = text.match(re);
      if (m) hits.push(`easing:${m[0].slice(0, 48)}`);
    }
    if (hits.length) {
      return {
        hardFail: true,
        hits: hits.slice(0, 6),
        reason: "narrative-easing-vs-firm-oil",
      };
    }
  }
  if (direction === "soft") {
    for (const re of OIL_SPIKE_NARRATIVE) {
      const m = text.match(re);
      if (m) hits.push(`spike:${m[0].slice(0, 48)}`);
    }
    if (hits.length) {
      return {
        hardFail: true,
        hits: hits.slice(0, 6),
        reason: "narrative-spike-vs-soft-oil",
      };
    }
  }
  return { hardFail: false, hits: [], reason: null };
}

function asFinite(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : null;
}

function dashSplit(chunk) {
  return String(chunk)
    .split(/\s*[–—−~〜～至到]+\s*|\s*-\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseUsdToken(raw) {
  if (raw == null) return null;
  const m = String(raw).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? asFinite(m[1]) : null;
}

function parseOneLeg(leg) {
  if (!leg) return null;
  const cleaned = String(leg).replace(/\$/g, " ").replace(/\s+/g, " ").trim();
  const parts = dashSplit(cleaned).map(parseUsdToken).filter((n) => n != null);
  if (!parts.length) return null;
  const low = Math.min(...parts);
  const high = Math.max(...parts);
  if (!(low > 0) || !(high > 0) || high > 400) return null;
  return { low, high };
}

/**
 * Parse `keyStats[2].value` of the form `WTI $低–$高 · Brent $低–$高`.
 * Also accepts hyphens, en-dashes, a single print as a degenerate range,
 * and `/` as the WTI/Brent separator.
 * @returns {{ wti: {low:number, high:number}, brent: {low:number, high:number} } | null}
 */
export function parseOilKeyStatValue(value) {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw || raw === "-" || raw === "—" || /未获|unavailable|n\/a/i.test(raw)) return null;

  const parts = raw.split(/\s*[·/|]\s*/).map((p) => p.trim()).filter(Boolean);
  const wtiPart = parts.find((p) => /^WTI\b/i.test(p)) || raw.match(/WTI\b([\s\S]*?)(?=\bBrent\b|$)/i)?.[0];
  const brentPart = parts.find((p) => /^Brent\b/i.test(p)) || raw.match(/Brent\b([\s\S]*)$/i)?.[0];
  const wti = parseOneLeg(String(wtiPart || "").replace(/^WTI\b/i, ""));
  const brent = parseOneLeg(String(brentPart || "").replace(/^Brent\b/i, ""));
  if (!wti && !brent) return null;
  return {
    wti: wti || brent,
    brent: brent || wti,
  };
}

/** Mid / high of the merged WTI+Brent observation used by the rubric. */
export function combinedOilStats(parsed) {
  if (!parsed?.wti && !parsed?.brent) return null;
  const pts = [parsed.wti?.low, parsed.wti?.high, parsed.brent?.low, parsed.brent?.high]
    .map(asFinite)
    .filter((n) => n != null);
  if (!pts.length) return null;
  const low = Math.min(...pts);
  const high = Math.max(...pts);
  const mid = pts.reduce((a, b) => a + b, 0) / pts.length;
  return { low, high, mid };
}

/** Map a USD/bbl point onto rubric score 1–5. */
export function impliedEnergyBandFromUsd(usd) {
  const x = asFinite(usd);
  if (x == null || x <= 0) return null;
  if (x < 75) return 1;
  if (x < 85) return 2;
  if (x < 100) return 3;
  if (x <= 120) return 4;
  return 5;
}

export function impliedEnergyBandsFromOil(parsed) {
  const stats = combinedOilStats(parsed);
  if (!stats) return null;
  return {
    ...stats,
    midBand: impliedEnergyBandFromUsd(stats.mid),
    highBand: impliedEnergyBandFromUsd(stats.high),
    lowBand: impliedEnergyBandFromUsd(stats.low),
  };
}

/**
 * Distance from energy score to the nearer of mid-band / high-band.
 * Compatible when distance ≤ 1 (adjacent / 0.5-step overlap).
 * Hard-fail when distance ≥ 2 (e.g. mid <$75 vs score 4 for ~$100–120).
 */
export function oilEnergyCompatibility(energyScore, parsed) {
  const implied = impliedEnergyBandsFromOil(parsed);
  const score = asFinite(energyScore);
  if (!implied || score == null) {
    return {
      implied,
      compatible: false,
      hardFail: false,
      distance: null,
      reason: !parsed ? "unparseable-oil-range" : "missing-energy-score",
    };
  }
  const candidates = [implied.midBand, implied.highBand].filter((b) => b != null);
  const distance = Math.min(...candidates.map((b) => Math.abs(score - b)));
  const lo = Math.min(implied.midBand, implied.highBand);
  const hi = Math.max(implied.midBand, implied.highBand);
  const compatible = score + 1e-9 >= lo - 0.5 && score - 1e-9 <= hi + 0.5 && distance <= 1;
  const hardFail = distance >= 2;
  return { implied, compatible, hardFail, distance, reason: hardFail ? "oil-band-vs-energy-score" : (compatible ? null : "oil-band-adjacent-mismatch") };
}

const ENERGY_MD_SECTION = /###\s*3[）)]\s*五维评分([\s\S]*?)(?=###\s*4[）)]|$)/;
const ENERGY_MD_SCORE = /\*\*能源冲击[^*]{0,24}\*\*\s*[:：)）]?\s*(\d(?:\.5)?)/;
const ENERGY_MD_SCORE_LOOSE = /能源冲击[^\d]{0,16}(\d(?:\.5)?)/;

/** Parse the Energy Shock score from reportMarkdownZh §3 when present. */
export function parseMarkdownEnergyScore(markdown) {
  const md = typeof markdown === "string" ? markdown : "";
  if (!md.trim()) return null;
  const section = md.match(ENERGY_MD_SECTION)?.[1] ?? md;
  const m = section.match(ENERGY_MD_SCORE) || section.match(ENERGY_MD_SCORE_LOOSE);
  return m ? asFinite(m[1]) : null;
}

/** Rewrite §3 energy score so reportMarkdown matches dataZh.riskFactors[2].score. */
export function syncMarkdownEnergyScore(markdown, energyScore) {
  const md = typeof markdown === "string" ? markdown : "";
  const score = asFinite(energyScore);
  if (!md || score == null) return { markdown: md, changed: false, previous: parseMarkdownEnergyScore(md) };
  const previous = parseMarkdownEnergyScore(md);
  if (previous != null && previous === score) return { markdown: md, changed: false, previous };
  let replaced = false;
  const next = md.replace(ENERGY_MD_SECTION, (block) => {
    const updated = block.replace(ENERGY_MD_SCORE, (hit, n) => {
      replaced = true;
      return hit.replace(n, String(score));
    });
    if (replaced) return updated;
    return block.replace(ENERGY_MD_SCORE_LOOSE, (hit, n) => {
      replaced = true;
      return hit.replace(n, String(score));
    });
  });
  return { markdown: replaced ? next : md, changed: replaced, previous };
}

function extractUrls(text) {
  if (!text) return [];
  const out = [];
  const re = /https?:\/\/[^\s)\]>'"]+/gi;
  let m;
  while ((m = re.exec(String(text)))) {
    out.push(m[0].replace(/[.,;]+$/, ""));
  }
  return out;
}

function urlLooksOilRelated(url) {
  return OIL_URL_HINT.test(String(url || ""));
}

/**
 * Grounded oil URLs: energy evidence/description first, then webSources
 * whose URI/title looks oil-related. Any http(s) URL attached to the energy
 * factor counts (prompt already requires a URL on riskFactors[2].evidence).
 */
export function collectOilSourceUrls({ energyEvidence, energyDescription, webSources, markdown } = {}) {
  const fromText = [
    ...extractUrls(energyEvidence),
    ...extractUrls(energyDescription),
    ...extractUrls(markdown),
  ].filter((u, i, arr) => arr.indexOf(u) === i);

  const fromGrounding = (Array.isArray(webSources) ? webSources : [])
    .map((w) => ({ uri: String(w?.uri || w?.url || ""), title: String(w?.title || "") }))
    .filter((w) => w.uri && (urlLooksOilRelated(w.uri) || urlLooksOilRelated(w.title)));

  const evidenceUrls = [...extractUrls(energyEvidence), ...extractUrls(energyDescription)];
  const oilishTextUrls = fromText.filter((u) => urlLooksOilRelated(u) || evidenceUrls.includes(u));
  const urls = [...oilishTextUrls, ...fromGrounding.map((w) => w.uri)]
    .filter((u, i, arr) => arr.indexOf(u) === i);
  return urls;
}

function publishRank(publish) {
  if (publish === "live") return 2;
  if (publish === "degraded") return 1;
  return 0;
}

/**
 * Full verdict used by the generator after model output.
 *
 * @returns {{
 *   parsed: object|null,
 *   parseOk: boolean,
 *   implied: object|null,
 *   compatibility: object|null,
 *   markdownEnergyScore: number|null,
 *   markdownMismatch: boolean,
 *   hasOilSourceUrl: boolean,
 *   oilUrls: string[],
 *   reasons: string[],
 *   publish: "live"|"degraded"|"abort",
 *   hardFail: boolean,
 * }}
 */
export function evaluateOilQuality({
  keyStatValue,
  energyScore,
  markdown,
  energyEvidence,
  energyDescription,
  webSources,
  keyChange,
  investmentSignal,
  warPhasePoints,
  situationEnergyPoints,
  narrativeCorpus,
} = {}) {
  const reasons = [];
  const parsed = parseOilKeyStatValue(keyStatValue);
  const parseOk = Boolean(parsed);
  const compatibility = oilEnergyCompatibility(energyScore, parsed);
  const implied = compatibility.implied;
  const markdownEnergyScore = parseMarkdownEnergyScore(markdown);
  const jsonScore = asFinite(energyScore);
  const markdownMismatch =
    markdownEnergyScore != null && jsonScore != null && markdownEnergyScore !== jsonScore;
  const oilUrls = collectOilSourceUrls({ energyEvidence, energyDescription, webSources, markdown });
  const hasOilSourceUrl = oilUrls.length > 0;

  const corpus =
    typeof narrativeCorpus === "string" && narrativeCorpus.trim()
      ? narrativeCorpus
      : collectOilNarrativeCorpus({
          keyChange,
          investmentSignal,
          warPhasePoints,
          energyDescription,
          energyEvidence,
          situationEnergyPoints,
          markdown,
        });
  const oilDirection = oilPriceDirectionFromImplied(implied);
  const narrativeConflict = oilNarrativeDirectionConflict(oilDirection, corpus);

  if (!parseOk) reasons.push("unparseable-oil-range");
  if (compatibility.hardFail) {
    reasons.push(
      `oil-band-incompatible: mid=$${implied?.mid?.toFixed?.(2) ?? "?"} (band ${implied?.midBand}) vs energyScore=${jsonScore} (rubric ~band ${jsonScore})`,
    );
  } else if (parseOk && !compatibility.compatible) {
    reasons.push(`oil-band-soft-mismatch: distance=${compatibility.distance}`);
  }
  if (!hasOilSourceUrl) reasons.push("missing-oil-source-url");
  if (markdownMismatch) {
    reasons.push(`markdown-energy-score-mismatch: md=${markdownEnergyScore} json=${jsonScore}`);
  }
  if (narrativeConflict.hardFail) {
    reasons.push(
      `${narrativeConflict.reason}: direction=${oilDirection}; hits=${narrativeConflict.hits.join("|")}`,
    );
  }

  let publish = "live";
  if (compatibility.hardFail || narrativeConflict.hardFail) publish = "abort";
  else if (!parseOk || !hasOilSourceUrl || (parseOk && !compatibility.compatible)) publish = "degraded";

  return {
    parsed,
    parseOk,
    implied,
    compatibility,
    oilDirection,
    narrativeConflict,
    markdownEnergyScore,
    markdownMismatch,
    hasOilSourceUrl,
    oilUrls,
    reasons,
    publish,
    hardFail: publish === "abort",
  };
}

export function summarizeOilQuality(verdict) {
  if (!verdict) return "oil-quality: n/a";
  const mid = verdict.implied?.mid != null ? `$${verdict.implied.mid.toFixed(2)}` : "—";
  return `oil-quality publish=${verdict.publish} mid=${mid} midBand=${verdict.implied?.midBand ?? "—"} highBand=${verdict.implied?.highBand ?? "—"} urls=${verdict.oilUrls.length} reasons=${verdict.reasons.join(";") || "ok"}`;
}

export function pickBetterOilVerdict(current, challenger) {
  const cr = publishRank(current?.publish);
  const nr = publishRank(challenger?.publish);
  if (nr !== cr) return nr > cr ? "challenger" : "current";
  if (Boolean(challenger?.hasOilSourceUrl) !== Boolean(current?.hasOilSourceUrl)) {
    return challenger?.hasOilSourceUrl ? "challenger" : "current";
  }
  return "current";
}

/** Compact record stored on score-history latest (no secrets). */
export function oilQualityHistoryRecord(verdict) {
  if (!verdict) return null;
  return {
    publish: verdict.publish,
    parseOk: verdict.parseOk,
    combinedMid: verdict.implied?.mid ?? null,
    combinedHigh: verdict.implied?.high ?? null,
    midBand: verdict.implied?.midBand ?? null,
    highBand: verdict.implied?.highBand ?? null,
    oilDirection: verdict.oilDirection ?? null,
    narrativeConflict: Boolean(verdict.narrativeConflict?.hardFail),
    hasOilSourceUrl: verdict.hasOilSourceUrl,
    markdownMismatch: verdict.markdownMismatch,
    reasons: verdict.reasons.slice(0, 8),
  };
}
