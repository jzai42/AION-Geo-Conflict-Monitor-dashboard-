export interface RiskFactor {
  name: string;
  score: number;
  prev: number;
  weight: number;
  description: string;
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
}

export const DATA_ZH: DashboardData = {
  date: "2026-04-06",
  version: "v2.6",
  keyStats: [
    { label: "冲突天数", value: "D37", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↓18", unit: "较上期", color: "#39ff14" },
    { label: "油价", value: "~114", unit: "WTI 临界", color: "#ff4136" },
    { label: "霍尔木兹", value: "许可制", unit: "受限通行", color: "#ffdc00" },
  ],
  warPhase: {
    level: "高强度持续",
    targetLevel: "受控咽喉",
    title: "经济施压与受控咽喉段下的持续冲突",
    subTitle: "从「全面中断」转向「可管理的中断与最大杠杆」",
    points: [
      "多战场军事活动仍在延续；24h内未见新的决定性地面入侵级升级",
      "霍尔木兹：受限、许可制通行恢复，但总吞吐量仍远低于常态（两位数艘/日 vs ~150艘常态）",
      "美方最后通牒 + 基础设施打击威胁仍在；伊朗以选择性放行维持杠杆，未见可信停火框架",
    ],
    note: "伊朗在避免立即触发全面升级的同时，最大化经济战与通行权杠杆；能源价格逼近关键突破区（>115）",
  },
  riskScore: 68,
  prevRiskScore: 86,
  keyChange:
    "结构转变：霍尔木兹由「近乎全面中断」转向「严格许可制、低流量通行」；油价逼近关键突破阈值（Brent约111、WTI约114+）；美方重申升级与基础设施打击威胁。",
  investmentSignal:
    "「能源突破风险迫近：维持能源与防御类超配，市场处于供给冲击升级边缘。」",
  scoreTrend: [
    { date: "04-02", score: 82 },
    { date: "04-03", score: 86 },
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68, active: true },
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4.0,
      prev: 4.5,
      weight: 0.2,
      description: "多战场打击持续；24h内未见新的决定性升级（如全面地面入侵）",
      status: "FAST",
      change: "down",
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4.0,
      prev: 5.0,
      weight: 0.2,
      description: "部分油轮在授权下通行（含马籍关联船、伊拉克原油等），但总流量仍远低于正常；伊朗掌控吞吐与准入",
      status: "FAST",
      change: "down",
    },
    {
      name: "能源冲击",
      score: 5.0,
      prev: 4.0,
      weight: 0.2,
      description: "Brent约111美元、WTI约114+美元；市场定价长期霍尔木兹约束；逼近>115突破触发区",
      status: "AT CEILING",
      change: "up",
    },
    {
      name: "大国介入深度",
      score: 3.0,
      prev: 3.5,
      weight: 0.2,
      description: "仍以间接介入为主；未见新的直接参战方大规模入场",
      status: "SLOW",
      change: "down",
    },
    {
      name: "降级/谈判前景",
      score: 1.0,
      prev: 2.0,
      weight: 0.2,
      description: "最后通牒与打击持续；无可信停火或结构化谈判路径（前景评分低表示谈判空间极窄）",
      status: "SLOW",
      change: "down",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "受控条件下恢复通航（仍高度受限）",
      description:
        "部分油轮（含马籍关联船舶、伊拉克原油货载）在伊朗授权下通过霍尔木兹；总流量仍远低于正常水平。",
      verification: "confirmed",
      timestamp: "2026-04-05",
      significance: "路透 + 伊朗官方关联报道交叉",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "油价冲高逼近突破区",
      description:
        "Brent约111美元、WTI约114+美元；供给扰动持续，市场定价长期霍尔木兹约束风险。",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "路透行情与市场叙事交叉",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "美方升级威胁再确认（基础设施导向）",
      description:
        "美国总统重申要求霍尔木兹重开的最后通牒，并威胁若未满足将打击伊朗基础设施（电厂、桥梁等）。",
      verification: "confirmed",
      timestamp: "2026-04-05",
      significance: "路透为主，多 outlet 互证",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "多战场军事活动延续",
      description:
        "伊朗无人机/导弹对海湾能源基础设施及以方关联目标的打击延续；以方对伊朗关联目标打击延续。",
      verification: "partial",
      timestamp: "2026-04-05",
      significance: "核心行动有报道互证，细节因 outlet 而异",
    },
    {
      id: "EVT-05",
      title: "霍尔木兹船只遇袭（以方关联船舶）",
      description:
        "伊朗称对霍尔木兹内以方关联船舶发动无人机袭击；以色列方面尚无独立证实。不纳入主评分。",
      verification: "single",
      timestamp: "2026-04-04",
      significance: "未独立核实；评分中排除",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "多战场持续",
      tagColor: "orange",
      points: [
        "伊朗、海湾国家、以黎轴线等多战场交火仍在延续",
        "未见停火；升级姿态维持",
        "24h内未见新的、已充分核实的决定性升级（如全面地面入侵）",
      ],
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "许可制通行",
      tagColor: "yellow",
      points: [
        "结构性转变：受限、许可制通行（非全面重开）",
        "日通行量仍处低位两位数 vs 常态约150艘——体系仍受扰动",
        "伊朗对吞吐与准入保持完全控制",
      ],
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "临界突破",
      tagColor: "red",
      points: [
        "WTI约114美元区间，距>115的「突破触发」仅一步之遥",
        "全球约两成石油流量仍受结构性约束",
        "供给冲击向利率、通胀与供应链传导",
      ],
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "硬线对硬线",
      tagColor: "orange",
      points: [
        "美国：维持强硬升级与最后通牒路线",
        "伊朗：不以让步换重开，以选择性放行维持杠杆",
        "无可信停火或结构化降级框架落地",
      ],
    },
  ],
  coreContradiction: {
    political: ["美方要求重开 + 基础设施打击威胁", "伊朗以许可制通行维持杠杆与谈判筹码"],
    military: ["多战场打击延续", "霍尔木兹低流量通行 ≠ 体系性解除"],
  },
};

export const DATA_EN: DashboardData = {
  date: "2026-04-06",
  version: "v2.6",
  keyStats: [
    { label: "Conflict Days", value: "D37", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↓18", unit: "vs Prev", color: "#39ff14" },
    { label: "Oil", value: "~114", unit: "WTI near trigger", color: "#ff4136" },
    { label: "Hormuz", value: "Permit-only", unit: "Restricted flow", color: "#ffdc00" },
  ],
  warPhase: {
    level: "Sustained High",
    targetLevel: "Controlled Choke",
    title: "Sustained High-Intensity Conflict (Economic Pressure + Controlled Chokepoint Phase)",
    subTitle: "From total disruption → managed disruption with maximum leverage",
    points: [
      "Multi-theater military activity continues; no new decisive ground invasion confirmed in 24h",
      "Hormuz: permission-based transit resumes but throughput remains far below normal (low double-digit ships/day vs ~150 normal)",
      "US ultimatum + infrastructure targeting threat persists; Iran uses selective reopening for leverage; no credible ceasefire framework",
    ],
    note: "Iran optimizes economic warfare while avoiding an immediate full escalation trigger; oil approaches a critical breakout band (>115)",
  },
  riskScore: 68,
  prevRiskScore: 86,
  keyChange:
    "Structural shift: Hormuz moves from near-total disruption to permission-based, low-flow transit; oil near breakout (Brent ~111, WTI ~114+); US reaffirms escalation and infrastructure strike risk.",
  investmentSignal:
    "Energy breakout risk is imminent; maintain overweight oil/defensives as the market sits at the edge of a supply shock escalation.",
  scoreTrend: [
    { date: "04-02", score: 82 },
    { date: "04-03", score: 86 },
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68, active: true },
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4.0,
      prev: 4.5,
      weight: 0.2,
      description:
        "Sustained multi-theater strikes; no new decisive escalation in last 24h (e.g., ground invasion)",
      status: "FAST",
      change: "down",
    },
    {
      name: "Hormuz Disruption",
      score: 4.0,
      prev: 5.0,
      weight: 0.2,
      description:
        "Partial reopening under strict control; throughput severely constrained vs normal; Iran retains full control",
      status: "FAST",
      change: "down",
    },
    {
      name: "Energy Shock",
      score: 5.0,
      prev: 4.0,
      weight: 0.2,
      description:
        "Oil ~114 → within immediate breakout range (>115); ~20% of global flows structurally constrained",
      status: "AT CEILING",
      change: "up",
    },
    {
      name: "Great Power Involvement",
      score: 3.0,
      prev: 3.5,
      weight: 0.2,
      description: "Still largely indirect; no major new direct military entrants",
      status: "SLOW",
      change: "down",
    },
    {
      name: "De-escalation Probability",
      score: 1.0,
      prev: 2.0,
      weight: 0.2,
      description:
        "Ultimatum + continued strikes; no negotiation structure (low score = minimal de-escalation prospect)",
      status: "SLOW",
      change: "down",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "Controlled Shipping Resumes but Remains Heavily Restricted",
      description:
        "Select tankers (including Malaysian-linked vessels and Iraqi crude cargoes) transited Hormuz under Iranian authorization; total traffic remains far below normal.",
      verification: "confirmed",
      timestamp: "2026-04-05",
      significance: "YES: Reuters + Iranian official-linked reporting",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "Oil Prices Surge Toward Critical Breakout Levels",
      description:
        "Brent ~111 USD and WTI ~114+ USD as supply disruptions persist; market pricing prolonged Hormuz constraint risk.",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "YES: market data + Reuters reporting",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "US Escalation Threat Reaffirmed (Infrastructure Targeting)",
      description:
        "U.S. President reiterates ultimatum demanding Hormuz reopening, threatening strikes on Iranian infrastructure if unmet.",
      verification: "confirmed",
      timestamp: "2026-04-05",
      significance: "Reuters; corroborated across multiple outlets",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "Continued Multi-Theater Military Activity",
      description:
        "Ongoing Iranian drone/missile attacks on Gulf energy infrastructure and Israeli-linked targets; Israel continues strikes on Iran-linked sites.",
      verification: "partial",
      timestamp: "2026-04-05",
      significance: "PARTIAL: core actions confirmed; details vary by outlet",
    },
    {
      id: "EVT-05",
      title: "Ship Attack in Hormuz (Israel-Linked Vessel)",
      description:
        "Iran claims drone strike on Israel-linked ship in Hormuz; no independent confirmation from Israel. Excluded from scoring.",
      verification: "single",
      timestamp: "2026-04-04",
      significance: "NO: unverified (excluded from scoring)",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Multi-Theater",
      tagColor: "orange",
      points: [
        "Conflict remains active across multiple theaters (Iran, Gulf, Israel–Lebanon axis)",
        "No pause in strikes; escalation posture sustained",
        "No confirmed new decisive escalation (e.g., ground invasion) in 24h",
      ],
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Permit-Based",
      tagColor: "yellow",
      points: [
        "Structural shift: restricted, permission-based transit",
        "~Low double-digit ships/day vs ~150 normal → system remains disrupted",
        "Iran retains full control over throughput and access",
      ],
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Breakout Risk",
      tagColor: "red",
      points: [
        "Oil approaching critical threshold (WTI ~114)",
        "Market one step away from >115 breakout trigger",
        "Supply shock persists (~20% global flow structurally constrained)",
      ],
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Hard Lines",
      tagColor: "orange",
      points: [
        "U.S.: hard escalation line maintained (deadline + infrastructure threat)",
        "Iran: no concession; leverage via selective reopening",
        "No credible ceasefire or de-escalation framework activated",
      ],
    },
  ],
  coreContradiction: {
    political: ["US demand to reopen + infrastructure strike threat", "Iran uses permit-based flow for leverage"],
    military: ["Multi-theater strikes continue", "Low-flow Hormuz transit ≠ systemic resolution"],
  },
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月6日节点",
    riskScoreTitle: "地 缘 冲 突\n风 险 评 分",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.6 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 68：霍尔木兹转向许可制低流量通行 + 油价逼近突破区（WTI~114）+ 美方基础设施打击威胁；路透为主、可审计",
    bannerWarning: "能源突破风险迫近；供给冲击仍处升级边缘",
    deescalationIntent: "美方重开要求与最后通牒",
    structuralRisk: "伊朗以准入权维持杠杆；体系性重开仍未出现",
    contradictionNote:
      "市场综合风险指数回落反映「因子框架重标」与降级前景极低，但油价与咽喉点杠杆使尾部风险上升。>115 可能触发新一轮风险重定价。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第37天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 6 Node",
    riskScoreTitle: "GEO-CONFLICT\nRISK SCORE",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.6 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 68: permit-based low-flow Hormuz + oil near breakout (WTI ~114) + US infrastructure strike threat; Reuters-primary, auditable",
    bannerWarning: "Energy breakout risk imminent; supply shock still on the edge",
    deescalationIntent: "US reopening demand + ultimatum",
    structuralRisk: "Iran uses access rights as leverage; no systemic reopening",
    contradictionNote:
      "Lower composite reflects rescored factors and minimal de-escalation prospect, yet oil and chokepoint leverage raise tail risk. >115 may trigger renewed repricing.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 37",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
