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
  date: "2026-04-07",
  version: "v2.7",
  keyStats: [
    { label: "冲突天数", value: "D38", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "持平", unit: "较上期", color: "#888888" },
    { label: "油价", value: "~110–114", unit: "Brent/WTI", color: "#ff4136" },
    { label: "霍尔木兹", value: "高度受限", unit: "咽喉锁闭", color: "#ffdc00" },
  ],
  warPhase: {
    level: "高强度持续",
    targetLevel: "对峙",
    title: "咽喉控制与升级对峙下的持续高强度冲突",
    subTitle: "双方未出现决定性升级，但系统性风险仍锁死在高位",
    points: [
      "多战场交战仍在延续；24h内未见新的「层级跃迁」式升级（如全面地面入侵或大规模打击面失控扩大）",
      "霍尔木兹事实上的受限咽喉仍在：仅极低或选择性批准通行，油轮活动仍处极低水平",
      "美方最后通牒期限临近 + 基础设施打击威胁仍在；伊朗拒绝以条件换即时重开",
    ],
    note: "巴方斡旋等停火框架有讨论，但未落实；伊朗称即使框架推进也不会立即重开霍尔木兹——不纳入主评分",
  },
  riskScore: 68,
  prevRiskScore: 68,
  keyChange:
    "24h要点：霍尔木兹仍高度受限（航运数据+路透多路互证）；美方重申重开期限与升级威胁；地区导弹/防空交战延续；油价高位贴近~115临界区；外交仍无功能性突破。",
  investmentSignal:
    "「维持防御与能源敞口：市场仍处『一触即发』的溢价状态，油价上行冲击风险与尾部风险不对称。」",
  scoreTrend: [
    { date: "04-03", score: 86 },
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68, active: true },
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4.0,
      prev: 4.0,
      weight: 0.2,
      description: "地区导弹/无人机与防空拦截持续；以方对叙黎伊朗关联目标打击延续；24h内未见新的决定性升级层级",
      status: "FAST",
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5.0,
      prev: 4.0,
      weight: 0.2,
      description: "有效咽喉锁闭仍在：通行仍严重受限，伊朗对吞吐与准入保持完全控制；未见可持续重开",
      status: "AT CEILING",
      change: "up",
    },
    {
      name: "能源冲击",
      score: 4.0,
      prev: 5.0,
      weight: 0.2,
      description: "Brent约110美元、WTI约113–114美元；仍略低于~115突破触发区，但供给扰动（约两成全球流量）仍结构性嵌入",
      status: "FAST",
      change: "down",
    },
    {
      name: "大国介入深度",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "联合国等多边场合有活动；其他大国仍以间接方式为主，未见新的直接军事大规模入场",
      status: "SLOW",
    },
    {
      name: "降级/谈判前景",
      score: 1.0,
      prev: 1.0,
      weight: 0.2,
      description: "最后通牒与打击叙事下外交仍难发挥功能；停火提议未落地（监测项，不纳入主评分）",
      status: "SLOW",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹仍高度受限（外部压力未改格局）",
      description:
        "伊朗继续限制霍尔木兹通行；仅观察到极低或选择性批准的交通，油轮活动仍极低。",
      verification: "confirmed",
      timestamp: "2026-04-06–2026-04-07",
      significance: "航运数据 + 路透多路报道交叉",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "美方最后通牒期限临近、升级威胁仍在",
      description:
        "美国总统重申要求重开霍尔木兹的期限，并威胁若不满足将对伊朗基础设施实施严厉打击。",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "路透 + 国际报道互证",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "地区导弹与防空交战持续",
      description:
        "伊朗导弹/无人机活动遭以色列与海湾国家（含沙特）拦截；以色列对叙利亚/黎巴嫩境内伊朗关联目标打击延续。",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "路透 + 国际报道互证",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "油价高位贴近临界区",
      description:
        "Brent约110美元、WTI约113–114美元；供给扰动持续，市场计入与霍尔木兹相关的升级风险。",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "路透 + 市场行情",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "停火提议流传但未落实（监测）",
      description:
        "巴方斡旋框架讨论流传；伊朗称霍尔木兹即使在框架下也不会立即重开。未独立核实，不纳入主评分。",
      verification: "single",
      timestamp: "2026-04-06",
      significance: "单一来源；评分排除",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "多战场持续",
      tagColor: "orange",
      points: [
        "伊朗、以色列、海湾国家之间活跃冲突仍在",
        "导弹/无人机与防空拦截持续",
        "24h内未见已充分核实的新升级层级（如全面地面入侵）",
      ],
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "咽喉锁闭",
      tagColor: "red",
      points: [
        "事实上的受限咽喉仍在；流量远低于正常水平",
        "伊朗对通行与吞吐保持完全控制",
        "在国际压力下仍未出现可持续重开证据",
      ],
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "临界张力",
      tagColor: "orange",
      points: [
        "油价稳定在高位（约110–114美元）",
        "处于突破前张力区（阈值约115美元）",
        "约两成全球流量仍受结构性扰动",
      ],
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "互不退让",
      tagColor: "orange",
      points: [
        "美国：期限 + 基础设施打击威胁，升级姿态强化",
        "伊朗：拒绝以条件换即时重开，以咽喉杠杆维持博弈",
        "未见可信外交突破",
      ],
    },
  ],
  coreContradiction: {
    political: ["美方期限与「重开否则打击」叙事", "停火/斡旋框架流传但未落地"],
    military: ["地区交战与防空拦截持续", "霍尔木兹咽喉锁闭未解"],
  },
};

export const DATA_EN: DashboardData = {
  date: "2026-04-07",
  version: "v2.7",
  keyStats: [
    { label: "Conflict Days", value: "D38", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "Flat", unit: "vs Prev", color: "#888888" },
    { label: "Oil", value: "~110–114", unit: "Brent / WTI", color: "#ff4136" },
    { label: "Hormuz", value: "Restricted", unit: "Chokehold", color: "#ffdc00" },
  ],
  warPhase: {
    level: "Sustained High",
    targetLevel: "Standoff",
    title: "Sustained High-Intensity Conflict (Chokepoint Control + Escalation Standoff)",
    subTitle: "Neither side escalates decisively, but systemic risk stays locked at high levels",
    points: [
      "Active multi-theater conflict persists (Iran ↔ Israel ↔ Gulf states); missile/drone exchanges and air-defense interceptions continue",
      "Hormuz remains a de facto restricted chokehold; traffic still far below normal; Iran maintains full control",
      "US ultimatum deadline approaches with infrastructure-strike threat; Iran rejects conditional reopening; no credible diplomatic breakthrough",
    ],
    note: "Pakistan-mediated ceasefire ideas circulate but are not implemented; Iran signals Hormuz will not reopen immediately even under a proposal—excluded from scoring",
  },
  riskScore: 68,
  prevRiskScore: 68,
  keyChange:
    "Last 24h: Hormuz stays heavily restricted (shipping data + Reuters streams); US reaffirms deadline and escalation threat; regional missile/air-defense engagements continue; oil elevated near the ~115 trigger band; diplomacy remains non-functional.",
  investmentSignal:
    "Maintain defensive + energy exposure; the market remains one trigger away from renewed upside shock.",
  scoreTrend: [
    { date: "04-03", score: 86 },
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68, active: true },
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4.0,
      prev: 4.0,
      weight: 0.2,
      description:
        "Sustained regional combat; missile/drone and AD engagements; no new decisive escalation tier in 24h (e.g., ground invasion)",
      status: "FAST",
    },
    {
      name: "Hormuz Disruption",
      score: 5.0,
      prev: 4.0,
      weight: 0.2,
      description:
        "Effective chokehold persists; transit still severely constrained; no sustained reopening despite pressure",
      status: "AT CEILING",
      change: "up",
    },
    {
      name: "Energy Shock",
      score: 4.0,
      prev: 5.0,
      weight: 0.2,
      description:
        "Oil elevated but slightly below breakout threshold; pre-breakout tension zone (~115); ~20% global flows still structurally constrained",
      status: "FAST",
      change: "down",
    },
    {
      name: "Great Power Involvement",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "UN activity present; no direct large-scale military entry by other powers",
      status: "SLOW",
    },
    {
      name: "De-escalation Probability",
      score: 1.0,
      prev: 1.0,
      weight: 0.2,
      description:
        "Ultimatum + continued strikes; diplomacy non-functional (low score = minimal de-escalation prospect)",
      status: "SLOW",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "Strait of Hormuz Remains Effectively Restricted",
      description:
        "Iran continues to limit Hormuz passage; only minimal or selectively approved traffic; tanker movement remains extremely low.",
      verification: "confirmed",
      timestamp: "2026-04-06–2026-04-07",
      significance: "YES: shipping data + multiple Reuters reporting streams",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "US Ultimatum Deadline Approaches with Escalation Threat",
      description:
        "U.S. President reaffirmed deadline demanding Hormuz reopening, threatening severe strikes on Iranian infrastructure if unmet.",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "Reuters; corroborated by international coverage",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Continued Regional Missile and Air-Defense Engagements",
      description:
        "Iranian missile/drone activity intercepted by Israel and Gulf states (incl. Saudi Arabia); Israel continues strikes on Iran-linked targets in Syria/Lebanon.",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "Reuters; corroborated by international reporting",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "Oil Prices Remain Elevated Near Critical Threshold",
      description:
        "Brent ~110 USD; WTI ~113–114 USD as supply disruption persists; markets price escalation risk tied to Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-06",
      significance: "Reuters; market data",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "Ceasefire Proposal Circulating but Not Implemented",
      description:
        "Pakistan-mediated framework discussed; Iran indicates Hormuz will not reopen immediately even under a proposal. Unverified for scoring—excluded.",
      verification: "single",
      timestamp: "2026-04-06",
      significance: "Not cross-verified; excluded from scoring",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Multi-Theater",
      tagColor: "orange",
      points: [
        "Active multi-theater conflict persists",
        "Missile/drone exchanges and air-defense interceptions continue",
        "No confirmed new escalation tier (e.g., ground invasion or mass strike expansion)",
      ],
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Chokehold",
      tagColor: "red",
      points: [
        "De facto restricted chokehold remains",
        "Traffic still far below normal; Iran maintains full control",
        "No evidence of sustained reopening despite international pressure",
      ],
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Pre-Breakout",
      tagColor: "orange",
      points: [
        "Oil stabilized at elevated levels (~110–114 USD)",
        "Market in pre-breakout tension zone (threshold ~115)",
        "~20% global flows still structurally disrupted",
      ],
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "No Breakthrough",
      tagColor: "orange",
      points: [
        "U.S.: escalation posture hardened (deadline + infrastructure threats)",
        "Iran: rejects conditional reopening; maintains leverage strategy",
        "No credible diplomatic breakthrough",
      ],
    },
  ],
  coreContradiction: {
    political: ["US deadline and reopening ultimatum", "Ceasefire talk circulates but is not implemented"],
    military: ["Regional engagements continue", "Hormuz chokehold unresolved"],
  },
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.7 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 68（持平）：霍尔木兹咽喉锁闭仍在 + 美方期限/升级威胁 + 油价~110–114 临界张力区；路透为主、可审计",
    bannerWarning: "市场仍处「一触即发」溢价；防御与能源敞口维持",
    deescalationIntent: "美方重开要求与最后通牒",
    structuralRisk: "伊朗拒条件重开；咽喉杠杆未解",
    contradictionNote:
      "双方未决定性升级，但系统性风险锁死高位；油价贴近~115 触发带，霍尔木兹与期限叙事叠加尾部不对称。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第38天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.7 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 68 (flat): Hormuz chokehold persists + US deadline/escalation threat + oil ~110–114 pre-breakout tension; Reuters-primary, auditable",
    bannerWarning: "One trigger from upside shock; maintain defensive + energy exposure",
    deescalationIntent: "US reopening demand + ultimatum",
    structuralRisk: "Iran rejects conditional reopening; chokepoint leverage intact",
    contradictionNote:
      "No decisive escalation, yet systemic risk stays locked high; oil near ~115 band with Hormuz + deadline narratives skewing tail asymmetry.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 38",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
