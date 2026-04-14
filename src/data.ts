export interface RiskFactor {
  name: string;
  score: number;
  prev: number;
  weight: number;
  description: string;
  /** UI: 已证实 / 部分证实 / 未证实 */
  sourceVerification?: "confirmed" | "partial" | "unverified";
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
  /** Gemini 接地返回的网页标题与链接（与 ensemble 所选候选同一次调用） */
  webSources?: { title: string; uri: string }[];
  /** 模型实际发起的搜索词（便于核对时效与检索范围） */
  webSearchQueries?: string[];
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
  date: "2026-04-13",
  version: "v2.24",
  keyStats: [
    {
      label: "冲突天数",
      value: "D44",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "主要班轮暂停",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-775",
      title: "伊朗向伊拉克和叙利亚的美军基地发射导弹和无人机",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-776",
      title: "主要航运公司暂停通过霍尔木兹海峡",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true
    },
    {
      id: "evt-777",
      title: "美国总统誓言将采取“果断行动”回应伊朗",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "evt-778",
      title: "油价飙升，布伦特原油逼近100美元大关",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  warPhase: {
    level: "直接军事对抗",
    targetLevel: "全面战争风险",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突已从代理人战争和有限打击升级为国家间的直接军事交火。",
      "伊朗首次大规模、公开地使用常规导弹直接打击美军资产。",
      "局势的下一步发展完全取决于美国的反应规模和性质。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "详见风险因子。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "详见风险因子。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "详见风险因子。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "详见风险因子。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗旨在通过升级风险迫使美国撤出中东，以实现其地区战略目标。",
      "美国试图在维护其中东利益、震慑伊朗和避免陷入另一场大规模战争之间取得平衡。"
    ],
    military: [
      "伊朗依赖其非对称作战能力（导弹、无人机、代理人网络）来抵消美国的常规军事优势。",
      "美国依靠其技术优势和全球部署能力来实施精确打击并保卫其资产。"
    ]
  },
  keyChange: "冲突的性质发生了根本性转变，从有限的、通过代理人进行的冲突，演变为伊朗国家武装力量对美国军队的直接、大规模常规军事攻击。",
  investmentSignal: "市场进入高度避险状态。油气股、国防承包商和黄金是短期内的主要受益者。全球航运、航空公司以及在中东有大量业务敞口的跨国公司将面临严重抛售压力。地缘政治风险溢价已成为影响所有资产类别的决定性因素。",
  scoreTrend: [
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-13",
  version: "v2.24",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D44",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "Hormuz",
      value: "Severely Disrupted",
      unit: "Major liners halt",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-775",
      title: "Iran Launches Missiles and Drones at US Bases in Iraq and Syria",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-776",
      title: "Major Shipping Lines Suspend Transits Through Strait of Hormuz",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true
    },
    {
      id: "evt-777",
      title: "US President Vows 'Decisive Action' in Response to Iran",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "evt-778",
      title: "Oil Prices Surge, with Brent Crude Nearing $100 Mark",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  warPhase: {
    level: "Direct Military Confrontation",
    targetLevel: "Risk of Full-Scale War",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict has escalated from proxy warfare and limited strikes to direct state-on-state military engagement.",
      "For the first time on a large scale, Iran has openly used its conventional missile capabilities to directly strike US assets.",
      "The next phase of the situation now depends entirely on the scale and nature of the US response."
    ],
    note: "For monitoring only; not investment advice."
  },
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "See risk factors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "See risk factors."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "See risk factors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "See risk factors."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran aims to compel a US withdrawal from the Middle East to achieve its regional strategic objectives by escalating risks.",
      "The US seeks to balance deterring Iran and protecting its regional interests without being drawn into another large-scale war."
    ],
    military: [
      "Iran relies on its asymmetric capabilities (missiles, drones, proxy networks) to offset the conventional military superiority of the US.",
      "The US relies on its technological advantage and global force projection to conduct precision strikes and defend its assets."
    ]
  },
  keyChange: "The fundamental nature of the conflict has shifted from a limited, proxy-based engagement to a direct, large-scale conventional military assault by Iranian state forces on the US military.",
  investmentSignal: "Markets have entered a high risk-off mode. Oil & gas stocks, defense contractors, and gold are the primary short-term beneficiaries. Global shipping, airlines, and multinational corporations with significant Middle East exposure will face severe sell-offs. Geopolitical risk premium is now the dominant factor for all asset classes.",
  scoreTrend: [
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月13日节点",
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
    partialVerify: "部分互证",
    factorVerified: "已证实",
    factorPartial: "部分证实",
    factorUnverified: "未证实",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.24 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑8）：冲突的性质发生了根本性转变，从有限的、通过代理人进行的冲突，演变为伊朗国家武装力量对美国军队的直接、大规模常规军事攻击。",
    bannerWarning: "市场进入高度避险状态。油气股、国防承包商和黄金是短期内的主要受益者。全球航运、航空公司以及在中东有大量业务敞口的跨国公司将面临严重抛售压力。地缘政治风险溢价已成为影响所有资产类别的决定性因素。",
    deescalationIntent: "伊朗旨在通过升级风险迫使美国撤出中东，以实现其地区战略目标。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "伊朗旨在通过升级风险迫使美国撤出中东，以实现其地区战略目标。；伊朗依赖其非对称作战能力（导弹、无人机、代理人网络）来抵消美国的常规军事优势。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第44天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 13 Node",
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
    partialVerify: "PARTIAL",
    factorVerified: "Verified",
    factorPartial: "Partially verified",
    factorUnverified: "Unverified",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.24 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑8): The fundamental nature of the conflict has shifted from a limited, proxy-based engagement to a direct, large-scale conventional military as…",
    bannerWarning: "Markets have entered a high risk-off mode. Oil & gas stocks, defense contractors, and gold are the primary short-term b…",
    deescalationIntent: "Iran aims to compel a US withdrawal from the Middle East to achieve its regiona…",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "Iran aims to compel a US withdrawal from the Middle East to achieve its regional strategic objectives by escalating risks.; Iran relies on its asymmetric capab…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 44",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
