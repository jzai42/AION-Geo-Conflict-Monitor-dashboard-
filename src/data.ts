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
  date: "2026-07-26",
  version: "v2.137",
  riskScore: 94,
  keyStats: [
    {
      label: "冲突天数",
      value: "D148",
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
      value: "WTI $98.40–$101.20 · Brent $104.15–$107.50",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "代理冲突演变为直接军事示威，演习实弹化且美军同步增兵。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "通行能力受限严重，航运巨头大规模停航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "原油价格区间主体进入 $100-$120 危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "大国直接军事部署加强，对抗性态势明显。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "完全无谈判渠道，双方拒绝对话并升级言辞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗举行海峡实弹演习",
      description: "IRGC 部署反舰导弹集群进行模拟打击，警告外部势力撤出波斯湾。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-07-26 04:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美国向中东增派 F-35 中队",
      description: "五角大楼宣布增强地区空军部署，以对冲伊朗演习带来的不确定性。来源：DoD。",
      verification: "confirmed",
      timestamp: "2026-07-25 21:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "布伦特油价突破 $105",
      description: "因担忧供应断裂，布伦特原油在伦敦市场一度冲高至 $107.50。来源：Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-07-26 08:15 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "从间接对峙转向直接军事威慑对垒",
      "航道安全与能源供应成为主要地缘冲突抓手",
      "国际调停机制近乎失效"
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
        "变化：代理冲突演变为直接军事示威，演习实弹化且美军同步增兵。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：通行能力受限严重，航运巨头大规模停航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油价格区间主体进入 $100-$120 危机带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：大国直接军事部署加强，对抗性态势明显。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求全面解除制裁与美国对地区霸权的维持之间的结构性冲突。"
    ],
    military: [
      "波斯湾航道控制权之争与双方军事部署密度的饱和对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "07-22",
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94,
      active: true
    }
  ],
  keyChange: "冲突态势在极高风险水位维持稳态，军事演习常态化导致误判风险倍增。",
  investmentSignal: "→ 维持防御性头寸，增持能源与大宗商品以对冲地缘政治断供风险。",
  prevRiskScore: 94,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-26",
  version: "v2.137",
  riskScore: 94,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D148",
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
      value: "WTI $98.40–$101.20 · Brent $104.15–$107.50",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Proxy conflicts transitioned to direct military signaling with live-fire drills and US build-up.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Transit capacity severely limited with major carriers suspending operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Crude prices entered the $100-$120 crisis zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct military deployment and confrontation posture from the US.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Complete lack of diplomatic channels with both sides escalating rhetoric.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Conducts Live-Fire Drills",
      description: "IRGC deployed anti-ship missile clusters in a simulated strike exercise. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-07-26 04:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Deploys F-35 Squadrons to Middle East",
      description: "Pentagon announces enhanced air force deployment to counter IRGC drills. Source: DoD.",
      verification: "confirmed",
      timestamp: "2026-07-25 21:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Brent Crude Surpasses $105",
      description: "Brent crude surged to $107.50 in London on supply disruption fears. Source: Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-07-26 08:15 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Transition from indirect to direct military deterrence",
      "Maritime security and energy supply as primary conflict drivers",
      "International mediation mechanisms largely ineffective"
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
        "Change: Proxy conflicts transitioned to direct military signaling with live-fire drills and US build-up."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Transit capacity severely limited with major carriers suspending operations."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices entered the $100-$120 crisis zone."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Direct military deployment and confrontation posture from the US."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Structural conflict between Iran's demand for sanction relief and US regional hegemony."
    ],
    military: [
      "Contest over Hormuz Strait control and saturated military deployment densities."
    ]
  },
  scoreTrend: [
    {
      date: "07-22",
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94,
      active: true
    }
  ],
  keyChange: "Conflict status plateaued at extreme risk level; drills increase miscalculation risk.",
  investmentSignal: "→ Maintain defensive positions and overweight energy and commodities to hedge against geopolitical disruption risk.",
  prevRiskScore: 94,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.137 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 94（持平）：冲突态势在极高风险水位维持稳态，军事演习常态化导致误判风险倍增。",
    bannerWarning: "→ 维持防御性头寸，增持能源与大宗商品以对冲地缘政治断供风险。",
    deescalationIntent: "伊朗要求全面解除制裁与美国对地区霸权的维持之间的结构性冲突。",
    structuralRisk: "通行能力受限严重，航运巨头大规模停航。",
    contradictionNote: "伊朗要求全面解除制裁与美国对地区霸权的维持之间的结构性冲突。；波斯湾航道控制权之争与双方军事部署密度的饱和对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第148天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.137 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 94 (Flat): Conflict status plateaued at extreme risk level; drills increase miscalculation risk.",
    bannerWarning: "→ Maintain defensive positions and overweight energy and commodities to hedge against geopolitical disruption risk.",
    deescalationIntent: "Structural conflict between Iran's demand for sanction relief and US regional h…",
    structuralRisk: "Transit capacity severely limited with major carriers suspending operations.",
    contradictionNote: "Structural conflict between Iran's demand for sanction relief and US regional hegemony.; Contest over Hormuz Strait control and saturated military deployment d…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 148",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
