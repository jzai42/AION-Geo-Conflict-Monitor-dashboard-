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
  date: "2026-09-24",
  version: "v2.202",
  keyStats: [
    {
      label: "冲突天数",
      value: "D208",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $91.23–$94.69 · Brent $97.10–$100.85",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "胡塞武装威胁对美利益进行打击，伊朗警告周边国家机场，维持在代理冲突级别。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "多国斡旋复航条件，海峡通行依旧受阻。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "国际油价上探高位，布伦特原油区间触及100美元以上。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方以航空制裁施压，无实质性大规模兵力新增参战。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "联大期间展现间接沟通意愿，但缺乏实质妥协。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 62,
  events: [
    {
      id: "evt-1",
      title: "伊朗威胁中东地区民航枢纽",
      description: "伊朗官方警告，若周边国家配合美国针对伊朗航空的制裁，将采取反制措施瘫痪其机场功能。（Tier2: Reuters, STL News）",
      verification: "confirmed",
      timestamp: "2026-09-24",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-2",
      title: "胡塞武装对美发出直接警告",
      description: "胡塞武装宣称，若美国介入也门内战以支持沙特，将对美在中东的利益目标发动打击。（Tier2: CBS News）",
      verification: "partial",
      timestamp: "2026-09-24",
      significance: ""
    },
    {
      id: "evt-3",
      title: "伊朗总统联大表态双轨策略",
      description: "伊朗总统在联合国大会重申对外交谈判的承诺，但强调绝不会屈服于美国压力。（Tier1: UN; Tier2: Al Arabiya, AP）",
      verification: "confirmed",
      timestamp: "2026-09-23",
      significance: ""
    },
    {
      id: "evt-4",
      title: "布伦特原油上探百元危机带",
      description: "受地区冲突外溢及断供担忧影响，国际油价重拾涨势，布伦特原油触及100美元以上。（Tier2: Reuters, Bloomberg）",
      verification: "confirmed",
      timestamp: "2026-09-24",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突向民用基础设施及次生制裁领域外溢，代理人阵线维持活跃。",
      "能源计价反馈出市场对长期断供风险的担忧，上探100美元关口。",
      "联大期间展现的外交接触与区域内相互威慑并存，局势处于黏滞状态。"
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
        "变化：伊朗警告将瘫痪配合美国制裁的周边国家机场，扩大了报复潜在目标范围。",
        "变化：胡塞武装首次明确将美军列为也门战场若遭干预后的直接打击对象。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际社会推动复航的提案仍在发酵，但海峡实质通行许可状态未见放松。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：避险情绪升温导致油价区间显著上移，布伦特原油区间触碰100美元危机带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗政府在联合国大会平台重申维持谈判敞口，但核心立场保持强硬。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "联大框架下的间接接触意愿与地区制裁相互施压的矛盾。"
    ],
    military: [
      "代理人武装强硬威慑与大国意图控制直接冲突规模之间的平衡。"
    ]
  },
  scoreTrend: [
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62,
      active: true
    }
  ],
  keyChange: "布伦特原油价格突破100美元危机线拉高能源得分；伊朗与代理人加码向美及周边国家发出不对称威慑。",
  investmentSignal: "→ 能源风险溢价突破百元关口，建议增持原油与防御性大宗商品头寸，警惕风险资产回调。",
  change: "up",
  prevRiskScore: 58,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-24",
  version: "v2.202",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D208",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $91.23–$94.69 · Brent $97.10–$100.85",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Houthi rebels threatened to strike US interests, and Iran warned regional airports, maintaining conflict at a proxy and limited threat level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Multinational efforts to restore transit continue, but Strait passage remains constrained.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "International oil prices surged, with Brent crude touching above $100.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US advances aviation sanctions without new massive military deployments.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Indirect communication intent displayed during the UNGA, but substantial compromise is lacking.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 62,
  events: [
    {
      id: "evt-1",
      title: "Iran Threatens Regional Civil Aviation Hubs",
      description: "Iranian officials warned that if neighboring countries cooperate with US sanctions on Iranian aviation, counter-measures would paralyze their airports. (Tier2: Reuters, STL News)",
      verification: "confirmed",
      timestamp: "2026-09-24",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-2",
      title: "Houthis Issue Direct Warning to US",
      description: "Houthi rebels declared they would target US interests in the Middle East if Washington intervenes in the Yemeni civil war to support Saudi Arabia. (Tier2: CBS News)",
      verification: "partial",
      timestamp: "2026-09-24",
      significance: ""
    },
    {
      id: "evt-3",
      title: "Iran President Signals Dual-Track Strategy at UN",
      description: "At the UN General Assembly, the Iranian president reaffirmed a commitment to diplomacy but stressed Iran would not bow to US pressure. (Tier1: UN; Tier2: Al Arabiya, AP)",
      verification: "confirmed",
      timestamp: "2026-09-23",
      significance: ""
    },
    {
      id: "evt-4",
      title: "Brent Crude Approaches $100 Crisis Zone",
      description: "Driven by conflict spillovers and supply disruption fears, international oil prices resumed their rally, with Brent touching above $100. (Tier2: Reuters, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-09-24",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict is spilling over into civilian infrastructure and secondary sanctions, with proxy fronts remaining active.",
      "Energy pricing reflects market fears of long-term supply disruptions, testing the $100 threshold.",
      "The situation remains sticky, balancing diplomatic contacts during the UNGA with ongoing regional deterrence."
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
        "Change: Iran warned it would paralyze neighboring countries' airports that cooperate with US sanctions, expanding the potential target scope.",
        "Change: Houthi rebels explicitly identified US forces as direct targets if Washington intervenes in the Yemeni battlefield."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: International proposals for restoring navigation remain under discussion, but practical passage restrictions in the Strait have not eased."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk aversion pushed oil price ranges significantly higher, with the upper bound of Brent crude touching the $100 crisis zone."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The Iranian government reiterated its openness to negotiations at the UN General Assembly platform while maintaining a hardline core stance."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The contradiction between the willingness for indirect contact under the UN framework and the mutual pressure of regional sanctions."
    ],
    military: [
      "The balance between hardline deterrence by proxy forces and major powers' intent to control the scale of direct conflict."
    ]
  },
  scoreTrend: [
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62,
      active: true
    }
  ],
  keyChange: "Brent crude prices breaking the $100 crisis line drove the energy score higher; Iran and proxies intensified asymmetric deterrence against the US and neighbors.",
  investmentSignal: "→ With the energy risk premium breaking the $100 mark, we recommend overweighting crude and defensive commodity positions while remaining cautious of risk asset pullbacks.",
  change: "up",
  prevRiskScore: 58,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.202 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 62（↑4）：布伦特原油价格突破100美元危机线拉高能源得分；伊朗与代理人加码向美及周边国家发出不对称威慑。",
    bannerWarning: "→ 能源风险溢价突破百元关口，建议增持原油与防御性大宗商品头寸，警惕风险资产回调。",
    deescalationIntent: "联大框架下的间接接触意愿与地区制裁相互施压的矛盾。",
    structuralRisk: "多国斡旋复航条件，海峡通行依旧受阻。",
    contradictionNote: "联大框架下的间接接触意愿与地区制裁相互施压的矛盾。；代理人武装强硬威慑与大国意图控制直接冲突规模之间的平衡。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第208天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.202 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 62 (↑4): Brent crude prices breaking the $100 crisis line drove the energy score higher; Iran and proxies intensified asymmetric deterrence against …",
    bannerWarning: "→ With the energy risk premium breaking the $100 mark, we recommend overweighting crude and defensive commodity positio…",
    deescalationIntent: "The contradiction between the willingness for indirect contact under the UN fra…",
    structuralRisk: "Multinational efforts to restore transit continue, but Strait passage remains constrained.",
    contradictionNote: "The contradiction between the willingness for indirect contact under the UN framework and the mutual pressure of regional sanctions.; The balance between hardl…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 208",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
