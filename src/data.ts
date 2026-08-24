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
  date: "2026-08-24",
  version: "v2.167",
  keyStats: [
    {
      label: "冲突天数",
      value: "D177",
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
      value: "WTI $92.50–$94.80 · Brent $96.20–$98.50",
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
  riskScore: 78,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊双方兵力持续集结，演习规模扩大。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道受实弹演习影响通行严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价维持在 $95 附近的高位运行，供应风险未消。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接军事部署力度增加，但未参与作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方拒绝直接或间接对话，前景极其暗淡。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军增派 F-22 部署中东",
      description: "美国国防部宣布增派 F-22 战斗机以应对潜在威胁。来源：DoD。",
      verification: "confirmed",
      timestamp: "2026-08-24 06:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC 霍尔木兹实弹演习",
      description: "伊朗革命卫队在海峡关键水域进行实弹拦截演练。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-08-24 02:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "油价因海峡局势上冲",
      description: "Brent 原油受演习消息影响上摸 $98.50 高点。来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-08-24 09:00",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗拒绝降级协议",
      description: "德黑兰官方表态目前无意开启任何形式的停火谈判。来源：AFP。",
      verification: "confirmed",
      timestamp: "2026-08-24 05:45",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "威慑饱和与航道演习常态化",
      "能源溢价在 $95-100 区间形成新中枢",
      "外交渠道处于完全停滞状态"
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
        "延续：美军 F-22 部署到位，维持高水平战备。",
        "变化：伊朗革命卫队（IRGC）在海峡关键航道附近开启实弹演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运维持最低限度通行，主要班轮公司继续绕道。",
        "变化：海峡通行强度降至常态的 40% 以下。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：市场对中东供应中断保持高度警惕。",
        "变化：Brent 原油上冲至 $98.50，受演习因素直接驱动。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：双方均无主动降级意愿。",
        "变化：德黑兰明确将撤军作为谈判门槛，实质对话锁死。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗对主权海域管控的强硬主张与美军“航行自由”威慑的对立。",
      "美方制裁政策与伊朗去美军化目标的互不相容。"
    ],
    military: [
      "霍尔木兹海峡反介入武力与区域外部干预力量的直接摩擦风险。"
    ]
  },
  scoreTrend: [
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78,
      active: true
    }
  ],
  keyChange: "美军增调空优力量对冲伊朗实弹演习，双方在霍尔木兹海峡的“战争边缘”博弈升级，但仍维持在非交火状态。",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，通过避险资产对冲高位黏滞的风险资产波动。",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-24",
  version: "v2.167",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D177",
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
      value: "WTI $92.50–$94.80 · Brent $96.20–$98.50",
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
  riskScore: 78,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Sustained troop buildup and expanding military drills.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Channel severely restricted by live-fire exercises.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices remain high near $95 level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Increased US military deployment, purely deterrent for now.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Total deadlock with both sides refusing direct dialogue.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Deploys F-22s to CENTCOM",
      description: "DoD announces Raptor deployment to counter regional threats. Source: DoD.",
      verification: "confirmed",
      timestamp: "2026-08-24 06:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Live-Fire Drills",
      description: "Iranian forces conduct intercept exercises in Hormuz. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-08-24 02:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Surge on Tension",
      description: "Brent hits $98.50 as drills heighten supply fears. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-08-24 09:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Saturated deterrence and normalized naval drills",
      "Energy premium stabilizing in the $95-100 range",
      "Diplomatic channels in total paralysis"
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
        "Continue: US F-22s deployed and on high alert.",
        "Change: IRGC begins live-fire drills in critical shipping lanes."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Minimal commercial passage; major liners rerouted.",
        "Change: Passage intensity drops below 40% of normal capacity."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Market on high alert for supply disruptions.",
        "Change: Brent Crude hits $98.50, driven by exercise-related fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Neither side shows intent to de-escalate.",
        "Change: Tehran sets troop withdrawal as threshold for talks."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iranian sovereignty claims vs. US 'Freedom of Navigation' deterrence.",
      "US sanctions vs. Iran's regional security architecture goals."
    ],
    military: [
      "Direct friction risk between anti-access forces and external intervention assets."
    ]
  },
  scoreTrend: [
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78,
      active: true
    }
  ],
  keyChange: "US reinforces air superiority as IRGC drills intensify brinkmanship in the Strait of Hormuz.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities to hedge against high-plateau risk asset volatility.",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.167 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（持平）：美军增调空优力量对冲伊朗实弹演习，双方在霍尔木兹海峡的“战争边缘”博弈升级，但仍维持在非交火状态。",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，通过避险资产对冲高位黏滞的风险资产波动。",
    deescalationIntent: "伊朗对主权海域管控的强硬主张与美军“航行自由”威慑的对立。",
    structuralRisk: "航道受实弹演习影响通行严重受限。",
    contradictionNote: "伊朗对主权海域管控的强硬主张与美军“航行自由”威慑的对立。；霍尔木兹海峡反介入武力与区域外部干预力量的直接摩擦风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第177天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.167 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (Flat): US reinforces air superiority as IRGC drills intensify brinkmanship in the Strait of Hormuz.",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities to hedge against high-plateau risk asset volatility.",
    deescalationIntent: "Iranian sovereignty claims vs. US 'Freedom of Navigation' deterrence.",
    structuralRisk: "Channel severely restricted by live-fire exercises.",
    contradictionNote: "Iranian sovereignty claims vs. US 'Freedom of Navigation' deterrence.; Direct friction risk between anti-access forces and external intervention assets.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 177",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
