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
  date: "2026-08-04",
  version: "v2.146",
  keyStats: [
    {
      label: "冲突天数",
      value: "D157",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $78.20–$79.80 · Brent $82.50–$84.10",
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
  riskScore: 74,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "维持高强度对峙及局部交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道流量仍受严重限制。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "市场避险情绪回落，区间整体下行至$75-85。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外部大国维持直接军事存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "谈判渠道停滞，双方立场强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军拦截伊朗侦察无人机",
      description: "美军在霍尔木兹海峡击落一架试图靠近航母编队的伊朗无人机，局势维持高压。",
      verification: "confirmed",
      timestamp: "2026-08-04 06:15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗拒绝恢复停火谈判",
      description: "德黑兰官方发言人称在美军撤离前不具备对话基础。",
      verification: "confirmed",
      timestamp: "2026-08-04 09:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "全球基准油价企稳回落",
      description: "因供应恐慌减弱，Brent及WTI油价跌至近期低点，市场溢价收窄。",
      verification: "confirmed",
      timestamp: "2026-08-04 10:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "地缘政治冲突处于僵持期，缺乏进一步升级的动力。",
      "能源市场开始消化风险溢价，回归基本面博弈。",
      "军事摩擦常态化，但未突破关键红线。"
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
        "延续：美伊双方在霍尔木兹海峡周边维持高密度防空及电子对抗。",
        "变化：美军加强了侦察机的出勤频率以应对潜在的布雷威胁。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运公司维持绕行非洲好望角的策略。",
        "变化：小型液化气船开始试探性恢复受保护的通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于库存报告优于预期，油价脱离$85上方高位。",
        "延续：市场关注德黑兰是否会针对能源设施实施进一步行动。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：哈梅内伊发表电视讲话重申抵制外部干预。",
        "变化：美国国务院称通过瑞士渠道传递了保持克制的最新信息。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的绝对主权诉求与美军护航常态化的军事存在冲突。",
      "外交谈判渠道的完全中断增加了误判风险。"
    ],
    military: [
      "战术层面的无人机/电子战骚扰与双方战略层面不希望全面开战的矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74,
      active: true
    }
  ],
  keyChange: "能源溢价受基本面及地缘担忧缓解影响出现结构性回落。",
  investmentSignal: "→ 减持短期能源看涨期权并维持防御性风险资产配置",
  change: "down",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-04",
  version: "v2.146",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D157",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $78.20–$79.80 · Brent $82.50–$84.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 74,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-intensity standoff and localized engagements persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait throughput remains significantly limited.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Market risk aversion recedes; range moves down to $75-85.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "External powers maintain direct military presence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Negotiation channels are stalled; stances remain rigid.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Intercepts Iranian Recon Drone",
      description: "US Navy shot down an Iranian drone approaching a carrier strike group in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-08-04 06:15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Rejects Resumption of Ceasefire Talks",
      description: "Tehran spokesperson stated no basis for dialogue exists until US forces withdraw.",
      verification: "confirmed",
      timestamp: "2026-08-04 09:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Global Oil Benchmarks Stabilize Lower",
      description: "Brent and WTI prices dropped to recent lows as supply panic eased; market premium narrowed.",
      verification: "confirmed",
      timestamp: "2026-08-04 10:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Geopolitical conflict is in a stalemate with lack of further escalatory momentum.",
      "Energy markets are pricing out the risk premium, returning to fundamental drivers.",
      "Military friction is normalized but has not crossed key red lines."
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
        "Continue: US and Iran maintain high-density air defense and electronic warfare around the Strait.",
        "Change: US Navy increased recon sorties to counter potential mining threats."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping continues to prefer Cape of Good Hope detours.",
        "Change: Small LNG carriers starting tentative escorted transits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices broke below the $85 resistance due to better-than-expected inventory reports.",
        "Continue: Market monitors Tehran for any further action against energy infrastructure."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Khamenei televised speech reiterates resistance against external interference.",
        "Change: US State Dept signals a new message of restraint was sent via Swiss backchannels."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Conflict between Iran's sovereignty claims and the normalization of US escort presence.",
      "Complete halt in diplomatic channels increases miscalculation risks."
    ],
    military: [
      "Contradiction between tactical-level drone/EW harassment and a strategic reluctance for all-out war."
    ]
  },
  scoreTrend: [
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74,
      active: true
    }
  ],
  keyChange: "Energy premium saw a structural decline due to fundamentals and easing of immediate geopolitical panic.",
  investmentSignal: "→ Reduce short-term energy call options and maintain defensive risk asset allocation",
  change: "down",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.146 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↓4）：能源溢价受基本面及地缘担忧缓解影响出现结构性回落。",
    bannerWarning: "→ 减持短期能源看涨期权并维持防御性风险资产配置",
    deescalationIntent: "伊朗的绝对主权诉求与美军护航常态化的军事存在冲突。",
    structuralRisk: "航道流量仍受严重限制。",
    contradictionNote: "伊朗的绝对主权诉求与美军护航常态化的军事存在冲突。；战术层面的无人机/电子战骚扰与双方战略层面不希望全面开战的矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第157天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.146 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↓4): Energy premium saw a structural decline due to fundamentals and easing of immediate geopolitical panic.",
    bannerWarning: "→ Reduce short-term energy call options and maintain defensive risk asset allocation",
    deescalationIntent: "Conflict between Iran's sovereignty claims and the normalization of US escort p…",
    structuralRisk: "Strait throughput remains significantly limited.",
    contradictionNote: "Conflict between Iran's sovereignty claims and the normalization of US escort presence.; Contradiction between tactical-level drone/EW harassment and a strateg…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 157",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
