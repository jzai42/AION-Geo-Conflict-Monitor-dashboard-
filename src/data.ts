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
  version: "v2.23",
  date: "2026-04-13",
  riskScore: 80,
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
      value: "WTI $100 / Brent $100",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "霍尔木兹",
      value: "航运中断",
      unit: "<10% 常态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "降级/谈判前景",
      score: 3,
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
      id: "e67e5a7b",
      title: "",
      description: "美国中央司令部宣布，于美国东部时间13日10时起，正式开始对所有进出伊朗港口的海上交通实施封锁。",
      verification: "confirmed",
      timestamp: "2026-04-13T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "f2d89c0a",
      title: "",
      description: "据多家航运媒体报道，在美国宣布封锁令后，霍尔木兹海峡的商业航运交通完全停滞。",
      verification: "confirmed",
      timestamp: "2026-04-13T08:30:00Z",
      significance: ""
    },
    {
      id: "b3c1a4e8",
      title: "",
      description: "由于美伊谈判破裂及美国宣布将进行海上封锁，国际油价大幅上涨，布伦特原油和WTI原油价格均突破每桶100美元。",
      verification: "confirmed",
      timestamp: "2026-04-13T02:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "a9d0f1b3",
      title: "",
      description: "经过21小时的谈判，美伊在巴基斯坦伊斯兰堡的和平谈判未能达成协议，双方代表团均已离开。",
      verification: "confirmed",
      timestamp: "2026-04-12T21:00:00Z",
      significance: ""
    },
    {
      id: "c5e4a8f9",
      title: "",
      description: "英国首相表示，英国不支持美国对伊朗港口实施的封锁，并强调将致力于通过外交手段确保霍尔木兹海峡的航行自由。",
      verification: "confirmed",
      timestamp: "2026-04-13T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "直接对抗/海上封锁",
    targetLevel: "全面战争",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊谈判彻底破裂，外交努力失败。",
      "美国启动对伊朗港口的全面海军封锁，标志着冲突进入直接军事对抗阶段。",
      "伊朗威胁反制，区域战争风险飙升至顶点。"
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
      "美国坚持伊朗必须彻底放弃核计划并停止支持地区代理人，以此作为解除制裁和结束冲突的前提。",
      "伊朗视其核能力和地区影响力为国家安全与主权的基石，拒绝在美国的军事胁迫下做出根本性让步。"
    ],
    military: [
      "美国寻求通过“极限压力”，包括军事封锁，迫使伊朗屈服，同时试图避免陷入大规模地面战争。",
      "伊朗则利用其在霍尔木兹海峡的地理优势，通过威胁中断全球能源供应来反制美国，形成非对称威慑。"
    ]
  },
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
  keyChange: "冲突性质发生根本性转变：随着高级别谈判的戏剧性破裂，冲突已从有限交火和脆弱停火彻底转向直接的军事对抗。美国实施的海军封锁是一项战争行为，导致霍尔木兹海峡航运完全中断，将地区危机推向全面战争的边缘。",
  investmentSignal: "市场进入极度避险（Extreme Risk-Off）模式。能源股短期或因油价飙升而受益，但全球经济衰退风险加剧将抑制长期需求。航空、海运及依赖进口能源的行业面临巨大成本压力。地缘政治风险溢价将主导所有资产类别，预计市场将出现剧烈波动。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news April 13 2026",
    "Iran military activity April 13 2026",
    "Strait of Hormuz shipping status April 13 2026",
    "oil price news US Iran tensions April 13 2026",
    "US military deployment Middle East April 2026",
    "Iran nuclear talks progress April 2026",
    "美伊冲突最新消息 2026年4月13日",
    "霍尔木兹海峡航运 2026年4月13日",
    "国际油价新闻 2026年4月13日",
    "美国伊朗外交谈判进展 2026年4月"
  ]
};

export const DATA_EN: DashboardData = {
  version: "v2.23",
  date: "2026-04-13",
  riskScore: 80,
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
      value: "WTI $100 / Brent $100",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "Hormuz",
      value: "Shipping Halted",
      unit: "<10% of normal",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "De-escalation Probability",
      score: 3,
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
      id: "e67e5a7b",
      title: "",
      description: "U.S. Central Command announced that the blockade of all maritime traffic to and from Iranian ports officially began at 10:00 AM ET.",
      verification: "confirmed",
      timestamp: "2026-04-13T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "f2d89c0a",
      title: "",
      description: "Following the US blockade announcement, multiple shipping news outlets reported a complete halt in commercial traffic through the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-13T08:30:00Z",
      significance: ""
    },
    {
      id: "b3c1a4e8",
      title: "",
      description: "International oil prices surged, with both Brent and WTI crude crossing the $100 per barrel mark, following the collapse of US-Iran talks and the US blockade announcement.",
      verification: "confirmed",
      timestamp: "2026-04-13T02:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "a9d0f1b3",
      title: "",
      description: "After 21 hours, peace talks between the US and Iran in Islamabad, Pakistan, ended without an agreement, with both delegations departing.",
      verification: "confirmed",
      timestamp: "2026-04-12T21:00:00Z",
      significance: ""
    },
    {
      id: "c5e4a8f9",
      title: "",
      description: "The UK Prime Minister stated that Britain does not support the US blockade on Iranian ports, emphasizing a commitment to diplomatic means to ensure freedom of navigation in Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-13T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Direct Confrontation / Naval Blockade",
    targetLevel: "Full-Scale War",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US-Iran negotiations have collapsed, marking a failure of diplomatic efforts.",
      "The US has initiated a full naval blockade of Iranian ports, shifting the conflict into a phase of direct military confrontation.",
      "Iran threatens countermeasures, pushing the risk of a regional war to its peak."
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
      "The U.S. insists that Iran must completely abandon its nuclear program and cease support for regional proxies as a precondition for lifting sanctions and ending the conflict.",
      "Iran views its nuclear capabilities and regional influence as cornerstones of its national security and sovereignty, refusing to make fundamental concessions under U.S. military coercion."
    ],
    military: [
      "The U.S. aims to use 'maximum pressure,' including a military blockade, to force Iran to capitulate, while trying to avoid a large-scale ground war.",
      "Iran leverages its geographic advantage at the Strait of Hormuz to counter the U.S. by threatening to disrupt global energy supplies, creating an asymmetric deterrent."
    ]
  },
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
  keyChange: "A fundamental shift in the nature of the conflict: with the dramatic collapse of high-level negotiations, the conflict has moved decisively from limited exchanges and a fragile ceasefire to direct military confrontation. The U.S. naval blockade is an act of war that has halted shipping in the Strait of Hormuz, pushing the regional crisis to the brink of a full-scale war.",
  investmentSignal: "The market has entered an Extreme Risk-Off mode. Energy stocks may benefit in the short term from soaring oil prices, but the heightened risk of a global recession will curb long-term demand. Aviation, shipping, and industries reliant on imported energy face immense cost pressures. The geopolitical risk premium will dominate all asset classes, and extreme market volatility is expected.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news April 13 2026",
    "Iran military activity April 13 2026",
    "Strait of Hormuz shipping status April 13 2026",
    "oil price news US Iran tensions April 13 2026",
    "US military deployment Middle East April 2026",
    "Iran nuclear talks progress April 2026",
    "美伊冲突最新消息 2026年4月13日",
    "霍尔木兹海峡航运 2026年4月13日",
    "国际油价新闻 2026年4月13日",
    "美国伊朗外交谈判进展 2026年4月"
  ]
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.23 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑8）：冲突性质发生根本性转变：随着高级别谈判的戏剧性破裂，冲突已从有限交火和脆弱停火彻底转向直接的军事对抗。美国实施的海军封锁是一项战争行为，导致霍尔木兹海峡航运完全中断，将地区危机推向全面战争的边缘。",
    bannerWarning: "市场进入极度避险（Extreme Risk-Off）模式。能源股短期或因油价飙升而受益，但全球经济衰退风险加剧将抑制长期需求。航空、海运及依赖进口能源的行业面临巨大成本压力。地缘政治风险溢价将主导所有资产类别，预计市场将出现剧烈波动。",
    deescalationIntent: "美国坚持伊朗必须彻底放弃核计划并停止支持地区代理人，以此作为解除制裁和结束冲突的前提。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "美国坚持伊朗必须彻底放弃核计划并停止支持地区代理人，以此作为解除制裁和结束冲突的前提。；美国寻求通过“极限压力”，包括军事封锁，迫使伊朗屈服，同时试图避免陷入大规模地面战争。",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.23 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑8): A fundamental shift in the nature of the conflict: with the dramatic collapse of high-level negotiations, the conflict has moved decisively…",
    bannerWarning: "The market has entered an Extreme Risk-Off mode. Energy stocks may benefit in the short term from soaring oil prices, b…",
    deescalationIntent: "The U.S. insists that Iran must completely abandon its nuclear program and ceas…",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "The U.S. insists that Iran must completely abandon its nuclear program and cease support for regional proxies as a precondition for lifting sanctions and endin…",
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
