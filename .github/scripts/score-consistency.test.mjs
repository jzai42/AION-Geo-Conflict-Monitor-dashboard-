import assert from "node:assert/strict";
import {
  assertScoreConsistency,
  buildAdjustmentReason,
  buildFinalScoreClause,
  collectPublishScores,
  compositeFromFactors,
  parseAppendixTodayScore,
  parseMarkdownHeadlineScore,
  stripCompositeScoreClaims,
  syncKeyChangeToFinalScore,
  syncMarkdownCompositeScores,
  textClaimsCompositeScore,
  upsertZhReportDataAppendix,
} from "./score-consistency.mjs";

function addDaysIso(iso, delta) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + delta));
  return dt.toISOString().slice(0, 10);
}
function scoreForDate(historyArr, iso) {
  const hit = (historyArr || []).find((p) => p.date === iso);
  return hit ? hit.score : null;
}

const FIXTURE_2026_09_22_MD = `### 近5日综合分结构与解读
- **区间**：2026-09-18 (76) → 2026-09-19 (76) → 2026-09-20 (76) → 2026-09-21 (76) → 2026-09-22 (76)
- **结构**：高位黏滞
- **一句话 takeaway**：联大外交试探与海峡袭船对峙交织，未现真去风险，评分维持76分平台期。

### 3）五维评分（AION）
- **军事升级烈度**：5分 | 伊朗军方公开发出无限制报复警告。
- **霍尔木兹航运扰动**：4分 | UKMTO通报油轮遇袭。
- **能源冲击**：3分 | 油价区间主体落在85–100美元。
- **大国介入深度**：3分 | 美军维持护航。
- **降级/谈判前景**：4分 | 伊方提出有条件复航。

### 4）地缘冲突综合分
- **Average**：3.8
- **Score /100**：76
- **较昨日 Δ**：持平（+0）

### 6）投资信号
- → 维持宏观对冲与能源大宗多头底仓。
`;

const RAW_FACTORS = [5, 4, 3, 3, 4];
const FINAL_FACTORS = [4, 3, 3, 3, 3.5];
const RAW_SCORE = compositeFromFactors(RAW_FACTORS);
const FINAL_SCORE = compositeFromFactors(FINAL_FACTORS);
assert.equal(RAW_SCORE, 76);
assert.equal(FINAL_SCORE, 66);

// --- unit: claim detection / strip ---
assert.equal(textClaimsCompositeScore("联大外交试探与海峡袭船并存，综合风险分保持76分黏滞态势"), true);
assert.equal(textClaimsCompositeScore("联大外交试探与海峡袭船并存。"), false);
assert.ok(!/\d{2,3}\s*分/.test(stripCompositeScoreClaims("综合风险分保持76分黏滞态势", "zh")));

// --- keyChange rebuild from final ---
{
  const adj = buildAdjustmentReason({
    rawFactors: RAW_FACTORS,
    finalFactors: FINAL_FACTORS,
    secondaryBlended: true,
  });
  const synced = syncKeyChangeToFinalScore(
    "联大外交试探与海峡袭船并存，综合风险分保持76分黏滞态势",
    {
      lang: "zh",
      finalScore: FINAL_SCORE,
      priorScore: 76,
      rawScore: RAW_SCORE,
      adjustmentReason: adj,
    },
  );
  assert.equal(synced.rebuilt, true);
  assert.match(synced.text, /落盘\s*66/);
  assert.match(synced.text, /调整前模型分\s*76/);
  assert.doesNotMatch(synced.text, /保持76分/);
  assert.ok(!textClaimsCompositeScore(synced.text) || /落盘\s*66/.test(synced.text));
}

{
  const en = syncKeyChangeToFinalScore(
    "UNGA feelers coexist with Hormuz strikes; composite risk score sticky at 76",
    { lang: "en", finalScore: 66, priorScore: 76, rawScore: 76, adjustmentReason: "stale secondary blend" },
  );
  assert.match(en.text, /prints at 66/i);
  assert.match(en.text, /pre-adjustment model score 76/i);
}

// --- markdown sync + appendix + invariant (9/22 fixture) ---
{
  const todayIso = "2026-09-22";
  const scoreTrend = [
    { date: "09-18", score: 76 },
    { date: "09-19", score: 76 },
    { date: "09-20", score: 76 },
    { date: "09-21", score: 76 },
    { date: "09-22", score: 66, active: true },
  ];
  const adj = buildAdjustmentReason({
    rawFactors: RAW_FACTORS,
    finalFactors: FINAL_FACTORS,
    secondaryBlended: true,
  });
  assert.match(adj, /副审/);

  const kc = syncKeyChangeToFinalScore(
    "联大外交试探与海峡袭船并存，综合风险分保持76分黏滞态势",
    { lang: "zh", finalScore: 66, priorScore: 76, rawScore: 76, adjustmentReason: adj },
  );

  let md = syncMarkdownCompositeScores(FIXTURE_2026_09_22_MD, {
    finalScore: 66,
    priorScore: 76,
    rawScore: 76,
    factors: FINAL_FACTORS,
    scoreTrend,
    todayIso,
    adjustmentReason: adj,
  }).markdown;

  assert.equal(parseMarkdownHeadlineScore(md), 66);
  assert.match(md, /2026-09-22 \(66\)/);
  assert.match(md, /\*\*结构\*\*：显著回落/);
  assert.match(md, /落盘综合分 66|落盘为 66|落盘 66/);
  assert.match(md, /调整前模型分 76/);
  assert.match(md, /\*\*军事升级烈度\*\*：?4分/);
  assert.match(md, /\*\*降级\/谈判前景\*\*：?3\.5分/);
  assert.match(md, /\*\*Average\*\*[：:]\s*3\.3/i);
  assert.match(md, /\*\*较昨日 Δ\*\*[：:]\s*-10/);
  assert.equal(parseMarkdownHeadlineScore(md), 66);

  const history = [
    { date: "2026-09-18", score: 76 },
    { date: "2026-09-19", score: 76 },
    { date: "2026-09-20", score: 76 },
    { date: "2026-09-21", score: 76 },
    { date: "2026-09-22", score: 66 },
  ];
  md = upsertZhReportDataAppendix(md, history, todayIso, 76, 66, addDaysIso, scoreForDate);
  assert.equal(parseAppendixTodayScore(md, todayIso), 66);
  assert.match(md, /今日落盘分 \*\*66\*\*/);

  const scores = assertScoreConsistency({
    finalRiskScore: 66,
    markdown: md,
    todayIso,
    scoreTrend,
    dashboardRiskScore: 66,
    keyChange: kc.text,
  });
  assert.equal(scores.headlineScore, 66);
  assert.equal(scores.scoreTrendLatest, 66);
  assert.equal(scores.appendixScore, 66);
  assert.equal(scores.dashboardScore, 66);
  assert.equal(scores.keyChangeScore, 66);

  // Unsynced fixture must fail the invariant (pre-condition of the bug).
  assert.throws(
    () =>
      assertScoreConsistency({
        finalRiskScore: 66,
        markdown: FIXTURE_2026_09_22_MD + "\n\n### 附录：近5个公历日综合分\n| 2026-09-22 | 66 |\n今日落盘分 **66**\n",
        todayIso,
        scoreTrend,
        dashboardRiskScore: 66,
        keyChange: "综合风险分保持76分黏滞态势",
      }),
    /score-consistency invariant failed/,
  );
}

// --- clause builder mentions raw only when different ---
{
  const same = buildFinalScoreClause({ lang: "zh", finalScore: 76, priorScore: 76, rawScore: 76 });
  assert.doesNotMatch(same, /调整前模型分/);
  const diff = buildFinalScoreClause({ lang: "zh", finalScore: 66, priorScore: 76, rawScore: 76, adjustmentReason: "副审均值" });
  assert.match(diff, /调整前模型分 76/);
  assert.match(diff, /副审均值/);
}

// collectPublishScores smoke
{
  const c = collectPublishScores({
    finalRiskScore: 66,
    markdown: "### 4）地缘冲突综合分\n- **Score /100**：66\n### 附录：\n| 2026-09-22 | 66 |\n今日落盘分 **66**",
    todayIso: "2026-09-22",
    scoreTrend: [{ date: "09-22", score: 66 }],
    dashboardRiskScore: 66,
    keyChange: "落盘 66",
  });
  assert.deepEqual(
    [c.finalRiskScore, c.headlineScore, c.scoreTrendLatest, c.appendixScore, c.dashboardScore, c.keyChangeScore],
    [66, 66, 66, 66, 66, 66],
  );
}

console.log("score-consistency.test.mjs: all assertions passed");
