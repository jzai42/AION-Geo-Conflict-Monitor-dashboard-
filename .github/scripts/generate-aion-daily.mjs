import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

const todayNy = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/New_York",
});

const prompt = `[System Role]
You are an institutional-grade geopolitical intelligence engine.
Your output must be structured, auditable, concise, and consistent across days.

[Task]
Search for the latest developments in the US–Iran conflict over the past 24 hours and produce a DAILY AION Geo-Conflict Monitor report.

[Strict Source Rules]
1. Prioritize:
   - Tier 1 Primary: White House, US DoD, Iranian official agencies, IDF
   - Tier 2: Reuters, Bloomberg, AP, Financial Times
2. Any MAJOR EVENT must have:
   - ≥2 independent sources
   - OR 1 primary official statement
3. If only single-source → mark as:
   → "Unverified" (must be EXCLUDED from scoring)

[Output Language]
→ Chinese ONLY

[Output Format]
→ MUST be inside ONE code block (for one-click copy)
→ NO markdown outside
→ NO emojis
→ NO explanations

────────────────────────────────
[AION Geo-Conflict Monitor | YYYY-MM-DD]
────────────────────────────────

[Scope]
Last 24h

────────────────────────────────
1) KEY EVENTS (Auditable)
────────────────────────────────

Format STRICTLY:

Event X: <一句话标题>
- Description:
- Timestamp:
- Sources:
- Cross-verification: YES / PARTIAL / NO (Unverified)

Rules:
- Max 5 events
- Only include HIGH SIGNAL events
- Unverified events MUST be clearly marked

────────────────────────────────
2) DOMAIN SUMMARY
────────────────────────────────

[Military]
- ...

[Hormuz / Shipping]
- ...

[Energy Market]
- ...

[Leadership Signals]
- ...

Rules:
- 每部分 ≤3条
- 只写“变化”，不写废话

────────────────────────────────
3) RISK SCORING (AION Framework)
────────────────────────────────

评分维度（固定）：

1. Military Escalation Intensity:
2. Hormuz Disruption:
3. Energy Shock:
4. Great Power Involvement:
5. De-escalation Probability:

Format:

X / 5  
Justification: <一句话原因>

Rules:
- 不允许模糊语言
- 必须可解释

────────────────────────────────
4) GEO-CONFLICT RISK SCORE
────────────────────────────────

Step 1: Average (0–5)
Step 2: ×20 → 0–100

Format:

Average = X.X  
Score = XX / 100

────────────────────────────────
5) WAR PHASE ASSESSMENT
────────────────────────────────

Format:

Phase:
→ <标准化阶段名称>

Key Shift:
→ <过去24h变化>

Interpretation:
→ <一句话本质>

────────────────────────────────
6) INVESTMENT SIGNAL
────────────────────────────────

Format (ONLY ONE SENTENCE):

→ <明确、可执行、无废话的投资信号>

Rules:
- 不允许模糊表达（如“可能”“关注”）
- 必须有方向（risk-on / risk-off / hedge / energy等）

────────────────────────────────
[Hard Constraints]
────────────────────────────────

1. 禁止输出未经验证的“重大事件”
2. 禁止重复历史信息（必须是24h内变化）
3. 禁止 narrative / storytelling
4. 禁止情绪化词汇
5. 禁止长句（每句 ≤20字优先）
6. 输出必须稳定、结构不可变

────────────────────────────────
[Goal]
────────────────────────────────

Produce a report that:
- 可以日更对比（结构一致）
- 可以直接用于交易决策
- 可以被第三方 audit`;

const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: OPENAI_MODEL,
    input: prompt,
    tools: [{ type: "web_search_preview" }],
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`OpenAI API error ${response.status}: ${body}`);
}

const data = await response.json();
const output = data.output_text?.trim();

if (!output) {
  throw new Error("OpenAI response did not include output_text");
}

const outDir = path.join(process.cwd(), "reports", "daily");
await mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, `${todayNy}.md`);
await writeFile(outPath, `${output}\n`, "utf8");

console.log(`Saved report: ${path.relative(process.cwd(), outPath)}`);
