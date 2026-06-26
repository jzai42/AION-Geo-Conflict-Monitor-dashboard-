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
  date: "2026-06-26",
  version: "v2.107",
  keyStats: [
    {
      label: "冲突天数",
      value: "D118",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $72–75 · Brent $72–75",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 40,
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "谈判机制建立",
      "霍尔木兹通行仍受扰动",
      "能源市场回稳但不稳定"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "美伊谈判达成“路线图”",
      description: "卡塔尔与巴基斯坦斡旋下，美伊在瑞士达成60天达成最终协议的“路线图”，并设立霍尔木兹海峡沟通机制。",
      verification: "confirmed",
      timestamp: "2026-06-22",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "伊朗革命卫队击中商船",
      description: "伊朗革命卫队攻击一艘新加坡籍商船，船桥受损，挑战美伊恢复霍尔木兹通行的努力。",
      verification: "single",
      timestamp: "2026-06-25",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "特朗普宣称“伊朗战争结束”",
      description: "特朗普在国家广场集会上宣称伊朗战争“结束”，但和平前景仍不明。",
      verification: "single",
      timestamp: "2026-06-24",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗加强国内镇压",
      description: "尽管与美达成谅解，伊朗继续执行政治抗议者处决与逮捕，联合国人权高专与国际特赦组织批评其镇压升级。",
      verification: "single",
      timestamp: "2026-06-25",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "谈判取得“路线图”进展，但伊朗国内镇压升级，政治信号矛盾。"
    ],
    military: [
      "霍尔木兹通行机制建立，但革命卫队仍攻击商船，军事与航运信号不一致。"
    ]
  },
  scoreTrend: [
    {
      date: "06-22",
      score: 40
    },
    {
      date: "06-23",
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40,
      active: true
    }
  ],
  keyChange: "霍尔木兹通行仍受扰动，谈判虽进展但不稳",
  investmentSignal: "→ 防御方向：建议防御性配置，关注能源与航运风险资产",
  change: "up",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-26",
  version: "v2.107",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D118",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $72–75 · Brent $72–75",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 40,
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Negotiation mechanism established",
      "Hormuz transit still disrupted",
      "Energy market stabilizing but fragile"
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "US‑Iran agree on “road map”",
      description: "Under mediation by Qatar and Pakistan, US and Iran in Switzerland agreed on a 60‑day road map toward a final deal and set up a Hormuz communication mechanism.",
      verification: "confirmed",
      timestamp: "2026-06-22",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Iran Revolutionary Guard hits merchant ship",
      description: "Iran’s Revolutionary Guard attacked a Singapore‑flagged merchant vessel, damaging its bridge, challenging efforts to reopen Hormuz transit.",
      verification: "single",
      timestamp: "2026-06-25",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Trump declares “Iran war over”",
      description: "At a rally on the National Mall, Trump declared the Iran war “done,” though peace outlook remains uncertain.",
      verification: "single",
      timestamp: "2026-06-24",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran intensifies internal crackdown",
      description: "Despite reaching understanding with US, Iran continues executing and arresting protesters; UN and Amnesty criticize escalation.",
      verification: "single",
      timestamp: "2026-06-25",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Negotiation roadmap achieved, but Iran’s internal crackdown escalates, signaling political contradiction."
    ],
    military: [
      "Hormuz communication mechanism established, yet Revolutionary Guard attacks ship, military‑shipping signals conflict."
    ]
  },
  scoreTrend: [
    {
      date: "06-22",
      score: 40
    },
    {
      date: "06-23",
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40,
      active: true
    }
  ],
  keyChange: "Hormuz transit still disrupted despite negotiation progress",
  investmentSignal: "→ Defensive stance: recommend defensive positioning, focus on energy and shipping risk assets",
  change: "up",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.107 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：霍尔木兹通行仍受扰动，谈判虽进展但不稳",
    bannerWarning: "→ 防御方向：建议防御性配置，关注能源与航运风险资产",
    deescalationIntent: "谈判取得“路线图”进展，但伊朗国内镇压升级，政治信号矛盾。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "谈判取得“路线图”进展，但伊朗国内镇压升级，政治信号矛盾。；霍尔木兹通行机制建立，但革命卫队仍攻击商船，军事与航运信号不一致。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第118天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.107 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): Hormuz transit still disrupted despite negotiation progress",
    bannerWarning: "→ Defensive stance: recommend defensive positioning, focus on energy and shipping risk assets",
    deescalationIntent: "Negotiation roadmap achieved, but Iran’s internal crackdown escalates, signalin…",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "Negotiation roadmap achieved, but Iran’s internal crackdown escalates, signaling political contradiction.; Hormuz communication mechanism established, yet Revo…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 118",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
