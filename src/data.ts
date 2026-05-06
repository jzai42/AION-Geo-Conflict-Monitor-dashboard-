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
  date: "2026-05-06",
  version: "v2.54",
  riskScore: 88,
  scoreTrend: [
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88,
      active: true
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗直接动用弹道导弹打击美军资产（DoD确认）",
      "霍尔木兹海峡航道实质性阻塞，流量降至正常水平的 35%",
      "美伊双方均拒绝在现有框架下进行任何形式的接触"
    ],
    note: "监测用途，不构成投资建议。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊直接军事对抗频率上升，拦截弹道导弹事件标志着烈度处于高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道实质性瘫痪，商业航运基本停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "全球油价处于危机波动区间，供应中断预期导致价格高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接参与拦截行动，多国海军在周边海域高度戒备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道几乎完全处于停滞状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D67",
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
      value: "WTI $106.85–$109.90 · Brent $113.20–$116.50",
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
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗开始在海峡北岸部署远程反舰巡航导弹（Reuters）。",
        "变化：美军增加在沙特境内的爱国者防御系统部署（DoD）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡内部船只继续执行极慢速航行策略，等待护航或指令。",
        "变化：苏伊士运河出现因绕行南非好望角导致的北上流量锐减。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 近月合约出现显著逆差，反映出实物交割极度紧张。",
        "延续：原油市场隐含波动率（VIX for Oil）维持在 60 以上的高位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗最高领袖在电视讲话中强调“抵抗经济与军事封锁”的决心。",
        "变化：美国共和党参议员联合敦促对伊朗能源设施进行“动能打击”（WSJ）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求的全面停止核活动与伊朗要求的先解除全部制裁之间无法调和。",
      "区域大国对于海峡安全主导权的零和博弈。"
    ],
    military: [
      "伊朗的非对称封锁战术与美军的绝对海权防御体系之间的持续对撞。"
    ]
  },
  keyChange: "冲突从战术挑衅彻底演变为战略封锁与反封锁的持久战，双方暂无退让空间。",
  investmentSignal: "→ 维持高度防御性配置，战略性持有能源、贵金属及军工资产以对冲地缘结构性溢价。",
  change: "none",
  prevRiskScore: 88,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美伊直接军事对抗频率上升，拦截弹道导弹事件标志着烈度处于高位",
      description: "美伊直接军事对抗频率上升，拦截弹道导弹事件标志着烈度处于高位。",
      verification: "single",
      timestamp: "2026-05-06（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "航道实质性瘫痪，商业航运基本停滞",
      description: "航道实质性瘫痪，商业航运基本停滞。",
      verification: "single",
      timestamp: "2026-05-06（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-06",
  version: "v2.54",
  riskScore: 88,
  scoreTrend: [
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88,
      active: true
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct ballistic missile strikes by Iran on US assets (Confirmed by DoD).",
      "Strait of Hormuz transit down to 35% of normal levels due to blockade.",
      "Both parties reject all formal negotiation channels currently."
    ],
    note: "For monitoring only; not investment advice."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Rise in direct US-Iran military confrontations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "De facto maritime blockade in effect.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices remain in the crisis belt due to supply disruption fears.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US military intervention and major diplomatic pressure from China.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels are non-functional.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D67",
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
      value: "WTI $106.85–$109.90 · Brent $113.20–$116.50",
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
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran deploying long-range anti-ship cruise missiles on the northern coast (Reuters).",
        "Change: US increasing Patriot defense battery deployments in Saudi Arabia (DoD)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Vessels within the Strait maintain slow-speed tactics awaiting orders.",
        "Change: Suez Canal northbound traffic plummeting as ships divert via Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent prompt-month backwardation deepens, reflecting severe physical tightness.",
        "Continue: Implied oil volatility (OVX) remains at elevated levels above 60."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian Supreme Leader emphasizes 'Resistance Economy' in televised address.",
        "Change: US Senators urge 'kinetic strikes' on Iranian energy infrastructure (WSJ)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatibility between US demands for nuclear cessation and Iran's demand for total sanction relief.",
      "Zero-sum game over maritime security dominance in the Gulf."
    ],
    military: [
      "Asymmetric blockade tactics versus US absolute naval defense doctrine."
    ]
  },
  keyChange: "The conflict has transitioned from tactical skirmishes to a strategic war of attrition centered on maritime blockades.",
  investmentSignal: "→ Maintain high defensive positioning; strategically hold energy, precious metals, and defense assets to hedge against structural geopolitical premiums.",
  change: "none",
  prevRiskScore: 88,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Rise in direct US-Iran military confrontations",
      description: "Rise in direct US-Iran military confrontations.",
      verification: "single",
      timestamp: "2026-05-06 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "De facto maritime blockade in effect",
      description: "De facto maritime blockade in effect.",
      verification: "single",
      timestamp: "2026-05-06 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.54 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：冲突从战术挑衅彻底演变为战略封锁与反封锁的持久战，双方暂无退让空间。",
    bannerWarning: "→ 维持高度防御性配置，战略性持有能源、贵金属及军工资产以对冲地缘结构性溢价。",
    deescalationIntent: "美方要求的全面停止核活动与伊朗要求的先解除全部制裁之间无法调和。",
    structuralRisk: "航道实质性瘫痪，商业航运基本停滞。",
    contradictionNote: "美方要求的全面停止核活动与伊朗要求的先解除全部制裁之间无法调和。；伊朗的非对称封锁战术与美军的绝对海权防御体系之间的持续对撞。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第67天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.54 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): The conflict has transitioned from tactical skirmishes to a strategic war of attrition centered on maritime blockades.",
    bannerWarning: "→ Maintain high defensive positioning; strategically hold energy, precious metals, and defense assets to hedge against …",
    deescalationIntent: "Incompatibility between US demands for nuclear cessation and Iran's demand for …",
    structuralRisk: "De facto maritime blockade in effect.",
    contradictionNote: "Incompatibility between US demands for nuclear cessation and Iran's demand for total sanction relief.; Asymmetric blockade tactics versus US absolute naval def…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 67",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
