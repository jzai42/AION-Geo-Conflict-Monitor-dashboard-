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
  date: "2026-04-08",
  version: "v2.8",
  keyStats: [
    { label: "冲突天数", value: "D39", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↓12", unit: "较上期", color: "#39ff14" },
    { label: "油价", value: "~94", unit: "WTI 停火后", color: "#ff4136" },
    { label: "霍尔木兹", value: "有条件重开", unit: "分阶段", color: "#ffdc00" },
  ],
  warPhase: {
    level: "战术降级",
    targetLevel: "谈判窗口",
    title: "临时降级：谈判窗口 / 脆弱停火阶段",
    subTitle: "自危机升级以来首次出现从动能冲突走向结构化暂停的拐点；冲突未解决，进入高风险谈判期",
    points: [
      "美伊宣布两周停火：美方暂停对伊军事打击，伊方停止攻击并推动霍尔木兹安全通行，作为更广泛谈判的路径",
      "24h内未见已核实的大规模新攻击；军事姿态暂停但可逆",
      "外交被激活但不稳定：伊方对永久和平提出高标准条件（监测项见事件3，单一信源未互证）",
    ],
    note: "停火为期两周且附带条件；霍尔木兹重开纳入框架但落实仍分阶段、依赖履约——体系脆弱性仍在",
  },
  riskScore: 56,
  prevRiskScore: 68,
  keyChange:
    "24h拐点：路透+华盛顿邮报等互证的两周停火协议落地；危机峰值附近实物油价传闻一度逼近约150美元，停火公布后WTI单日重挫约16%至约94美元；霍尔木兹转向有条件、分阶段重开；EIA示供应链与燃料价格数月内仍可能偏高。",
  investmentSignal:
    "「战术上削减峰值能源敞口，但保留对冲：停火破裂风险仍实质性偏高。」",
  scoreTrend: [
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68 },
    { date: "04-08", score: 56, active: true },
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2.0,
      prev: 4.0,
      weight: 0.2,
      description: "停火下美伊直接军事打击暂停；24h内未见已核实的大规模新攻击；升级暂时冻结但可逆",
      status: "FAST",
      change: "down",
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3.0,
      prev: 5.0,
      weight: 0.2,
      description: "由主动扰动转向有条件、分阶段重开；落实依赖停火履约；结构性脆弱与伊朗杠杆机制仍在",
      status: "FAST",
      change: "down",
    },
    {
      name: "能源冲击",
      score: 3.0,
      prev: 4.0,
      weight: 0.2,
      description: "极端波动：危机侧实物市场曾处极端高位，停火后WTI快速回落至约94美元；体系应激与收复仍需时日",
      status: "FAST",
      change: "down",
    },
    {
      name: "大国介入深度",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "外交斡旋与多边接触延续；未见新的成规模直接军事入场",
      status: "SLOW",
    },
    {
      name: "降级/谈判前景",
      score: 3.0,
      prev: 1.0,
      weight: 0.2,
      description: "两周停火激活谈判窗口但短期且附带条件；破局与否高度依赖履约与后续架构",
      status: "FAST",
      change: "up",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊宣布两周停火协议",
      description:
        "美国总统特朗普同意暂停对伊军事打击两周，换取伊朗停止攻击并保障霍尔木兹安全通行；定位为通往更广泛谈判的路径。",
      verification: "confirmed",
      timestamp: "2026-04-07（UTC晚些时候 → 落在近24h）",
      significance: "路透 + 华盛顿邮报互证",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "停火消息下油价剧烈回调",
      description:
        "停火公布后WTI原油大跌约16%至约94美元，对此前霍尔木兹扰动下的危机溢价进行反转；危机峰值附近实物油价曾逼近约150美元区间（据能源与市况报道）。",
      verification: "confirmed",
      timestamp: "2026-04-07 → 2026-04-08",
      significance: "路透（能源+市场报道）互证",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "伊朗对永久和平提出严苛前提（监测）",
      description:
        "伊方官员要求美方完全停止打击、未来攻击保障、赔偿及包括在霍尔木兹通行条款内的可能管控机制等，作为持久协议前提。官泄/单一叙述为主，未独立互证。",
      verification: "single",
      timestamp: "2026-04-07",
      significance: "单一来源官泄；不纳入主评分互证集",
    },
    {
      id: "EVT-04",
      title: "霍尔木兹重开：有条件且未完结",
      description:
        "停火框架包含重开霍尔木兹，但落实仍附带条件、分阶段推进；此前扰动仍对应约两成全球石油流量受影响。",
      verification: "confirmed",
      timestamp: "2026-04-07 → 进行中",
      significance: "路透多稿（含EIA与停火报道）互证",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "EIA：即便咽喉正常化，能源体系压力或仍延续数月",
      description:
        "美国能源信息署警告：供应链与燃料价格即便在霍尔木兹趋稳后，仍可能在数月内维持偏高压。",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "路透（EIA）互证",
      highlight: true,
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "暂停可逆",
      tagColor: "yellow",
      points: [
        "两周停火下美伊直接打击暂停",
        "24h内未见已核实的大规模新攻击",
        "军事姿态：暂停但可逆，非终局",
      ],
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "条件重开",
      tagColor: "yellow",
      points: [
        "由主动扰动过渡到有条件重开阶段",
        "安全通行依赖停火与履约",
        "结构脆弱性仍在，伊朗保留杠杆工具",
      ],
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "恐慌→脆弱正常化",
      tagColor: "orange",
      points: [
        "极端波动：危机前实物侧曾处约150美元量级恐慌定价",
        "停火后WTI约94美元，急剧修正",
        "市场由恐慌溢价转向脆弱的正常化路径",
      ],
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "外交激活",
      tagColor: "green",
      points: [
        "美国（特朗普）：战术降级，对谈判持开放态度",
        "伊朗：愿接触但对结构性让步要求强度高",
        "外交：已激活但不稳定",
      ],
    },
  ],
  coreContradiction: {
    political: ["战术停火与谈判窗口打开", "永久协议条件苛刻、信源未互证"],
    military: ["动能对抗短期冻结", "两周时限与履约风险使局面随时可逆"],
  },
};

export const DATA_EN: DashboardData = {
  date: "2026-04-08",
  version: "v2.8",
  keyStats: [
    { label: "Conflict Days", value: "D39", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↓12", unit: "vs Prev", color: "#39ff14" },
    { label: "Oil", value: "~94", unit: "WTI post-ceasefire", color: "#ff4136" },
    { label: "Hormuz", value: "Conditional", unit: "Phased reopening", color: "#ffdc00" },
  ],
  warPhase: {
    level: "De-escalation",
    targetLevel: "Negotiation",
    title: "Temporary De-escalation (Negotiation Window / Fragile Ceasefire Phase)",
    subTitle: "First material shift from kinetic conflict → structured pause since escalation; conflict unresolved—entering a high-risk negotiation phase",
    points: [
      "Two-week US–Iran ceasefire: US suspends strikes on Iran; Iran halts attacks and enables safe Hormuz passage as a pathway to broader talks",
      "No confirmed large-scale attacks in 24h; military posture paused but reversible",
      "Diplomacy activated but unstable; Iran’s terms for lasting peace are tracked as a single-source leak (EVT-03)—not cross-verified",
    ],
    note: "Ceasefire is two weeks and conditional; Hormuz reopening is in the framework but implementation is phased and compliance-dependent—systemic fragility remains",
  },
  riskScore: 56,
  prevRiskScore: 68,
  keyChange:
    "Inflection: two-week ceasefire announced (Reuters + Washington Post); oil crashed ~16% to ~94 WTI after spiking in crisis (physical market near ~150 reported); Hormuz reopening conditional/phased; EIA warns elevated supply-chain/fuel pressure may persist for months.",
  investmentSignal:
    "Reduce peak energy exposure tactically, but maintain hedge positioning—ceasefire failure risk remains materially elevated.",
  scoreTrend: [
    { date: "04-04", score: 80 },
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68 },
    { date: "04-08", score: 56, active: true },
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2.0,
      prev: 4.0,
      weight: 0.2,
      description:
        "Direct US–Iran kinetic action paused under ceasefire; no confirmed large-scale new attacks in 24h; escalation temporarily halted but reversible",
      status: "FAST",
      change: "down",
    },
    {
      name: "Hormuz Disruption",
      score: 3.0,
      prev: 5.0,
      weight: 0.2,
      description:
        "Transition from active disruption → conditional, phased reopening; safe passage depends on ceasefire compliance; structural vulnerability persists",
      status: "FAST",
      change: "down",
    },
    {
      name: "Energy Shock",
      score: 3.0,
      prev: 4.0,
      weight: 0.2,
      description:
        "Extreme volatility: pre-ceasefire physical oil near crisis levels (~150); post-ceasefire sharp correction (~94 WTI); system still stressed with recovery lag",
      status: "FAST",
      change: "down",
    },
    {
      name: "Great Power Involvement",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "Diplomatic mediation ongoing; no new large-scale military entrants",
      status: "SLOW",
    },
    {
      name: "De-escalation Probability",
      score: 3.0,
      prev: 1.0,
      weight: 0.2,
      description:
        "Ceasefire active but short-term (2 weeks) and conditional; outcome hinges on implementation and follow-on architecture",
      status: "FAST",
      change: "up",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "Two-Week US–Iran Ceasefire Agreement Announced",
      description:
        "President Trump agreed to suspend US strikes on Iran for two weeks in exchange for Iran halting attacks and enabling safe Hormuz passage—framed as a pathway to broader negotiations.",
      verification: "confirmed",
      timestamp: "2026-04-07 (late UTC → within last 24h)",
      significance: "Reuters; Washington Post",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "Oil Market Collapses on Ceasefire News After Extreme Spike",
      description:
        "WTI crude fell ~16% to ~94 USD after the announcement, reversing crisis pricing where physical oil traded near ~150 amid Hormuz disruption.",
      verification: "confirmed",
      timestamp: "2026-04-07 → 2026-04-08",
      significance: "Reuters (energy + market coverage)",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Iran Sets Strict Conditions for Permanent Peace",
      description:
        "Officials demand full cessation of US strikes, guarantees against future attacks, reparations, and potential Hormuz transit controls—single-source / leak narrative; not cross-verified.",
      verification: "single",
      timestamp: "2026-04-07",
      significance: "Unverified (official leak); scored cautiously",
    },
    {
      id: "EVT-04",
      title: "Hormuz Reopening Contingent and Incomplete",
      description:
        "Framework includes Hormuz reopening, but implementation is conditional and phased; prior disruption affected ~20% of global oil flows.",
      verification: "confirmed",
      timestamp: "2026-04-07 → ongoing",
      significance: "YES: Reuters (inc. EIA + ceasefire coverage)",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "EIA: Energy System Stress May Persist Despite Normalization",
      description:
        "EIA warns supply chains and fuel prices may remain elevated for months even if Hormuz normalizes.",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "YES: Reuters (EIA)",
      highlight: true,
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Paused",
      tagColor: "yellow",
      points: [
        "Immediate pause in direct US–Iran strikes under ceasefire",
        "No confirmed large-scale new attacks in 24h",
        "Posture: paused but reversible",
      ],
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Conditional",
      tagColor: "yellow",
      points: [
        "Transition: active disruption → conditional reopening phase",
        "Safety depends on ceasefire compliance",
        "Structural vulnerability remains (leverage mechanisms)",
      ],
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Volatile",
      tagColor: "orange",
      points: [
        "Pre-ceasefire: physical oil near ~150 (crisis)",
        "Post-ceasefire: sharp correction (~94 WTI)",
        "Shift: panic pricing → fragile normalization",
      ],
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Diplomacy On",
      tagColor: "green",
      points: [
        "U.S. (Trump): tactical de-escalation; openness to negotiation",
        "Iran: willing to engage but demands structural concessions",
        "Diplomacy: activated but unstable",
      ],
    },
  ],
  coreContradiction: {
    political: ["Tactical ceasefire opens a negotiation window", "Permanent-deal terms unverified / Iranian leak narrative"],
    military: ["Kinetic phase frozen short-term", "Two-week horizon + compliance risk keeps reversal live"],
  },
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.8 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 56（↓12）：两周停火落地 + 霍尔木兹有条件重开 + WTI~94（路透为主，华邮等一线互证、可审计）",
    bannerWarning: "战术减峰值能源敞口；保留对冲——停火仍短促且脆弱",
    deescalationIntent: "两周停火与谈判窗口",
    structuralRisk: "履约与分阶段重开不确定性；体系压力或延续数月",
    contradictionNote:
      "动能冲突首次结构化暂停，但非终局：油价剧烈反转反映预期再定价，尾部仍系于停火破裂与条款博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第39天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.8 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 56 (↓12): two-week ceasefire + conditional Hormuz reopening + WTI ~94; Reuters-primary, WaPo/tier-1 cross-check, auditable",
    bannerWarning: "Tactical trim peak energy; keep hedges—ceasefire remains short and fragile",
    deescalationIntent: "Two-week ceasefire window",
    structuralRisk: "Phased reopening + compliance risk; EIA warns months of stress possible",
    contradictionNote:
      "First structured kinetic pause—not resolution: violent oil repricing reflects expectations; tails tied to ceasefire failure and terms.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 39",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
