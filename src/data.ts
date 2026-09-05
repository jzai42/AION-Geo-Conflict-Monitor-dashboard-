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
  date: "2026-09-05",
  version: "v2.179",
  riskScore: 70,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D189",
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
      value: "WTI $84–$87 · Brent $88–$91",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "代理人冲突在高位维持，美军在叙利亚东部拦截多架自杀式无人机。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道维持高压对峙，过境商船面临严格监控。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在$85-100档位中下沿企稳，溢价结构性存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方维持区域防御部署，俄伊军事技术合作讨论仍在继续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "外交渠道仍开放但实质性进展停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军CENTCOM拦截叙利亚无人机袭击",
      description: "美军确认拦截多架亲伊武装无人机，未造成人员伤亡。来源：CENTCOM官方、Reuters。",
      verification: "confirmed",
      timestamp: "2026-09-04T22:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "俄伊防务磋商引发华盛顿关切",
      description: "俄伊探讨先进武器贸易，美方对此表达强烈不满。来源：WSJ、TASS。",
      verification: "confirmed",
      timestamp: "2026-09-04T15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突进入阵地化消耗阶段",
      "能源价格在高位形成新常态",
      "外交谈判作为减压阀维持运作"
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
        "延续：美军针对叙利亚境内的代理人无人机袭击维持高频拦截态势。",
        "变化：暂无大规模直接空袭记录，双方控制冲突范围。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：IRGC海军对通行船只的例行监视持续，通行效率低迷。",
        "延续：海事保险溢价无显著回调迹象。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价结束短期波动进入窄幅震荡区间（WTI 84-87美元）。",
        "延续：地缘冲突导致的供应风险溢价已充分定价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊官方修辞维持强硬，但无意愿开启全面战争。",
        "变化：第三方国家（如阿曼）斡旋频率有所放缓。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在地区主导权与制裁解除条款上的核心矛盾未决。"
    ],
    military: [
      "代理人骚扰与大国防御性红线之间的动态平衡极其脆弱。"
    ]
  },
  scoreTrend: [
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70,
      active: true
    }
  ],
  keyChange: "局势高位横盘，多点代理摩擦与能源溢价形成支撑。",
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，对冲风险资产波动。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-05",
  version: "v2.179",
  riskScore: 70,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D189",
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
      value: "WTI $84–$87 · Brent $88–$91",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe restriction",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Proxy conflicts remain at high levels; US CENTCOM intercepted multiple suicide drones in eastern Syria.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-pressure standoff in the strait; commercial vessels face strict monitoring.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices stabilizing at the lower end of the $85-100 tier; risk premium structurally present.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains regional defensive posture; Russia-Iran defense cooperation talks continue.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Diplomatic channels remain open but lack substantive breakthroughs.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US CENTCOM Intercepts Drones in Syria",
      description: "CENTCOM confirms interception of multiple pro-Iran militia drones. Sources: CENTCOM, Reuters.",
      verification: "confirmed",
      timestamp: "2026-09-04T22:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Russia-Iran Defense Talks Spark Concern",
      description: "Talks on advanced weaponry equipment spark protest from Washington. Sources: WSJ, TASS.",
      verification: "confirmed",
      timestamp: "2026-09-04T15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict entering a positional attrition phase",
      "Energy prices forming a new normal at high levels",
      "Diplomatic talks serving as a pressure relief valve"
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
        "Continue: High-frequency intercepts of proxy drones targeting US bases in Syria.",
        "Change: No large-scale direct airstrikes recorded; both sides controlling conflict scope."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Routine IRGC Navy surveillance of transiting vessels; low passage efficiency.",
        "Continue: No significant signs of retreat in maritime insurance premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices entering a narrow trading range (WTI $84-87).",
        "Continue: Geopolitical risk premiums are fully priced in."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tough rhetoric from US and Iran; neither side seeking full-scale war.",
        "Change: Mediation frequency from third-party nations (e.g., Oman) has slowed."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Core conflict over regional dominance and sanction lifting terms remains unresolved."
    ],
    military: [
      "Fragile dynamic balance between proxy harassment and superpower defensive red lines."
    ]
  },
  scoreTrend: [
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70,
      active: true
    }
  ],
  keyChange: "Stagnant high-level situation with multi-point proxy friction and energy premium support.",
  investmentSignal: "→ Maintain defensive positions in energy and commodities to hedge risk asset volatility.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.179 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：局势高位横盘，多点代理摩擦与能源溢价形成支撑。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，对冲风险资产波动。",
    deescalationIntent: "美伊双方在地区主导权与制裁解除条款上的核心矛盾未决。",
    structuralRisk: "航道维持高压对峙，过境商船面临严格监控。",
    contradictionNote: "美伊双方在地区主导权与制裁解除条款上的核心矛盾未决。；代理人骚扰与大国防御性红线之间的动态平衡极其脆弱。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第189天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.179 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Stagnant high-level situation with multi-point proxy friction and energy premium support.",
    bannerWarning: "→ Maintain defensive positions in energy and commodities to hedge risk asset volatility.",
    deescalationIntent: "Core conflict over regional dominance and sanction lifting terms remains unreso…",
    structuralRisk: "High-pressure standoff in the strait; commercial vessels face strict monitoring.",
    contradictionNote: "Core conflict over regional dominance and sanction lifting terms remains unresolved.; Fragile dynamic balance between proxy harassment and superpower defensive…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 189",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
