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
  date: "2026-04-30",
  version: "v2.48",
  keyStats: [
    {
      label: "冲突天数",
      value: "D61",
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
      value: "WTI $106.9–$110.4 · Brent $110.4–$125.4",
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
      description: "美军开始审议针对伊朗基建设施的作战方案，军事张力达到临界。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡实质封闭，全球 20% 油气供应受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价进入危机区间，Brent 触及 $125。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国维持外交干预与制裁压力，尚未发生直接对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方驳回伊朗关于缓解海上压力的最新提案，外交陷入僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  riskLevel: "极高",
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军战机与舰艇在伊朗外海维持高密度威慑姿态",
      "伊朗伊斯兰革命卫队通过水雷与无人机维持对海峡的软封锁",
      "外交提案被美方彻底驳回，冲突下行通道关闭"
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
        "延续：美军第五舰队维持最高等级战斗准备，核动力航母战斗群在阿曼湾待命。",
        "变化：CENTCOM 提交了“短期且强有力”的打击预案，目标指向伊朗核与电力基建。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡由于伊朗水雷威胁和美军反向封锁，商业航行几乎绝迹。",
        "变化：伊朗试图向少数获准通行的小型非美船只征收主权通行费。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于军事打击预期升温，Brent 原油单日上涨超 4%，市场恐慌性补库开启。",
        "延续：美方坚决执行对伊朗出口的拦截，累计封锁 6900 万桶原油。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普明确表态海军封锁将持续数月，直到德黑兰完全屈服并重签核协议。",
        "延续：德黑兰内部由保守派将军主导决策，拒绝在解除封锁前进行实质谈判。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "华盛顿“极限施压”要求核妥协 vs 德黑兰要求先解除经济封锁",
      "特朗普政府内部对全面开战与维持封锁的成本博弈"
    ],
    military: [
      "伊朗低成本封锁（水雷/无人机）vs 美军高成本维持封锁与潜在空袭的效费比矛盾"
    ]
  },
  scoreTrend: [
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80,
      active: true
    }
  ],
  keyChange: "美军审议进攻性打击选项且外交提案被否决，风险指数横盘于极端区间。",
  investmentSignal: "→ 维持能源与大宗商品超配，对冲风险资产防御性部位。",
  change: "none",
  prevRiskScore: 80,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美军开始审议针对伊朗基建设施的作战方案，军事张力达到临界",
      description: "美军开始审议针对伊朗基建设施的作战方案，军事张力达到临界。",
      verification: "single",
      timestamp: "2026-04-30（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "海峡实质封闭，全球 20% 油气供应受阻",
      description: "海峡实质封闭，全球 20% 油气供应受阻。",
      verification: "single",
      timestamp: "2026-04-30（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkk1EE-HgJO73HGEuetlo60P8dYK-BbC_8sYMNwn_DtTkzkjkl24lVUnzkG_uu3HTJE86-Y_eE7KhjPlQaUpoYMSpT4HMbBPKPdBO-lHtYDTdqYc-wq-LPYYwLgbUjnThszTZnkD_5IU15jlpWNN0_am9L501vYC_v1GhiFLeaFL3uWaSJhxtLMW5igYI9JQ=="
    }
  ],
  webSearchQueries: [
    "US Iran military conflict news April 30 2026 update",
    "Hormuz Strait shipping status April 30 2026 news",
    "WTI Brent crude oil price range April 30 2026 forecast trend"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-30",
  version: "v2.48",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D61",
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
      value: "WTI $106.9–$110.4 · Brent $110.4–$125.4",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US military reviews strike options against Iranian infrastructure; tensions at a boiling point.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The Strait remains effectively closed, choking 20% of global oil/gas supplies.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices enter crisis territory; Brent touches $125.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Diplomatic maneuvering between US and Russia/regional allies continues without direct clash.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US rejects latest Iranian proposal to ease maritime pressure, resulting in diplomatic deadlock.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  riskLevel: "Critical",
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US air and naval assets maintain high-intensity deterrence off Iranian coast",
      "IRGC maintains soft-blockade of the Strait using mines and drones",
      "Diplomatic proposals rejected by Washington, closing de-escalation pathways"
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
        "Continue: US Fifth Fleet maintains maximum combat readiness with carrier strike groups in the Gulf of Oman.",
        "Change: CENTCOM has submitted a plan for a 'short and powerful' wave of strikes on Iranian infrastructure."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic is near zero due to Iranian mine threats and US counter-blockades.",
        "Change: Iran is attempting to levy 'transit fees' on the few non-aligned vessels still attempting the passage."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent oil surged over 4% in a single session as strike expectations heightened; panic buying observed.",
        "Continue: US maintains strict enforcement of the port blockade, intercepting 69 million barrels of Iranian crude."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump explicitly states the blockade will remain for months until a new nuclear deal is signed.",
        "Continue: Hardliners in Tehran reject substantive negotiations until the blockade is lifted."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington's maximum pressure vs. Tehran's demand for economic relief",
      "US internal debate over the cost of prolonged blockade versus direct intervention"
    ],
    military: [
      "Asymmetric Iranian blockade vs. high-cost US maritime security and strike posture"
    ]
  },
  scoreTrend: [
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80,
      active: true
    }
  ],
  keyChange: "US review of offensive strike options and rejection of diplomatic proposals keep the risk index at extreme levels.",
  investmentSignal: "→ Maintain overweight positions in Energy and Commodities; hedge risk assets with defensive postures.",
  change: "none",
  prevRiskScore: 80,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "US military reviews strike options against Iranian infrastructure",
      description: "US military reviews strike options against Iranian infrastructure; tensions at a boiling point.",
      verification: "single",
      timestamp: "2026-04-30 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "The Strait remains effectively closed, choking 20% of global oil/gas supplies",
      description: "The Strait remains effectively closed, choking 20% of global oil/gas supplies.",
      verification: "single",
      timestamp: "2026-04-30 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkk1EE-HgJO73HGEuetlo60P8dYK-BbC_8sYMNwn_DtTkzkjkl24lVUnzkG_uu3HTJE86-Y_eE7KhjPlQaUpoYMSpT4HMbBPKPdBO-lHtYDTdqYc-wq-LPYYwLgbUjnThszTZnkD_5IU15jlpWNN0_am9L501vYC_v1GhiFLeaFL3uWaSJhxtLMW5igYI9JQ=="
    }
  ],
  webSearchQueries: [
    "US Iran military conflict news April 30 2026 update",
    "Hormuz Strait shipping status April 30 2026 news",
    "WTI Brent crude oil price range April 30 2026 forecast trend"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.48 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美军审议进攻性打击选项且外交提案被否决，风险指数横盘于极端区间。",
    bannerWarning: "→ 维持能源与大宗商品超配，对冲风险资产防御性部位。",
    deescalationIntent: "华盛顿“极限施压”要求核妥协 vs 德黑兰要求先解除经济封锁",
    structuralRisk: "海峡实质封闭，全球 20% 油气供应受阻。",
    contradictionNote: "华盛顿“极限施压”要求核妥协 vs 德黑兰要求先解除经济封锁；伊朗低成本封锁（水雷/无人机）vs 美军高成本维持封锁与潜在空袭的效费比矛盾",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第61天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.48 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): US review of offensive strike options and rejection of diplomatic proposals keep the risk index at extreme levels.",
    bannerWarning: "→ Maintain overweight positions in Energy and Commodities; hedge risk assets with defensive postures.",
    deescalationIntent: "Washington's maximum pressure vs. Tehran's demand for economic relief",
    structuralRisk: "The Strait remains effectively closed, choking 20% of global oil/gas supplies.",
    contradictionNote: "Washington's maximum pressure vs. Tehran's demand for economic relief; Asymmetric Iranian blockade vs. high-cost US maritime security and strike posture",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 61",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
