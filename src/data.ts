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
  date: "2026-05-08",
  version: "v2.57",
  keyStats: [
    {
      label: "冲突天数",
      value: "D69",
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
      value: "WTI $103.40–$109.15 · Brent $108.20–$114.60",
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
  riskScore: 84,
  riskTrend: "stable",
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在红海拦截胡塞无人机，伊朗在周边海域进行实弹演习，直接军事摩擦频率维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "关键航道实质性处于军事化管控状态，商业航运流量较冲突前下降超过60%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "全球油价受海峡封锁风险支撑，维持在$100美元以上的危机预期区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国海军资产在冲突区域执行常态化拦截，大国直接卷入程度极深。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道虽然开放但缺乏实质进展，核心议题上双方立场严重对立。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军红海拦截行动",
      description: "美军中央司令部成功摧毁胡塞武装针对商业航线的3架单向攻击无人机。",
      verification: "confirmed",
      timestamp: "2026-05-07 22:45 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗海军阿曼湾演习",
      description: "伊朗开始在战略咽喉区域进行实弹防御演习，展示对航道的潜在控制力。",
      verification: "confirmed",
      timestamp: "2026-05-08 04:30 UTC",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "实兵演习与拦截行动成为博弈常态",
      "航运保险费率维持高位阻断商业逻辑",
      "双方极力避免进入陆地全面战争"
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
        "变化：美军拦截频率上升，防御性部署向红海南部集中。",
        "延续：代理武装对以色列北部目标的火箭弹袭击仍在继续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡保持有限且高风险的通行状态。",
        "变化：由于伊朗实弹演习，该区域临时航告（NOTAM）范围扩大。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：市场完全计价了中度供应中断风险，油价守稳$100关口。",
        "变化：因对冲基金补仓，远期溢价出现结构性抬升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国坚称保护航行自由是其底线红线。",
        "变化：伊朗外交部公开指责美国正在“过度军事化”波斯湾。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方航行自由权与伊方区域安全主权的根本冲突",
      "代理人冲突规模与直接开战意愿之间的不对称"
    ],
    military: [
      "远程拦截技术的成功率与饱和攻击威胁之间的博弈",
      "海上封锁与反封锁战术的持续消耗"
    ]
  },
  scoreTrend: [
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
      score: 88
    },
    {
      date: "05-07",
      score: 84
    },
    {
      date: "05-08",
      score: 84,
      active: true
    }
  ],
  keyChange: "冲突进入高位平台期，由爆发式升级转向结构性对抗。",
  investmentSignal: "→ 对冲能源与大宗风险，维持防御性资产配置",
  change: "none",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-08",
  version: "v2.57",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D69",
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
      value: "WTI $103.40–$109.15 · Brent $108.20–$114.60",
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
  riskScore: 84,
  riskTrend: "stable",
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US Centcom intercepted drones in the Red Sea while Iran conducts live-fire drills near key shipping lanes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The strait remains under de facto military control, with commercial traffic down over 60% compared to pre-conflict levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global prices are anchored by the risk of strait closure, maintaining a crisis-level premium above $100.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US naval assets are directly engaged in intercepting threats, marking a high degree of direct involvement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels remain open but stagnant, with neither side showing a willingness to compromise on core issues.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Red Sea Interception",
      description: "CENTCOM destroyed 3 Houthi OWA UAVs targeting commercial shipping lanes.",
      verification: "confirmed",
      timestamp: "2026-05-07 22:45 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Naval Exercises",
      description: "Iran begins live-fire defensive drills in the Gulf of Oman, signaling control over the strait entrance.",
      verification: "confirmed",
      timestamp: "2026-05-08 04:30 UTC",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Live drills and interceptions have become the norm",
      "High insurance rates are blocking commercial logic",
      "Both sides are avoiding full-scale land warfare"
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
        "Change: US interception frequency is rising; defenses are concentrating in the southern Red Sea.",
        "Continue: Proxy rocket attacks on northern Israel persist."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hormuz Strait remains in a limited, high-risk transit state.",
        "Change: Expansion of NOTAM zones due to Iranian live-fire exercises."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Markets have fully priced in moderate supply disruption risks, keeping Brent above $100.",
        "Change: Structural rise in forward premiums as hedge funds rebalance."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US insists that freedom of navigation is a non-negotiable red line.",
        "Change: Iran's MFA publicly accuses the US of 'over-militarizing' the Persian Gulf."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Conflict between US navigation rights and Iranian regional sovereignty",
      "Asymmetry between proxy conflict scale and direct war intent"
    ],
    military: [
      "Balance between successful interception rates and saturation attack threats",
      "Ongoing attrition of blockade and counter-blockade tactics"
    ]
  },
  scoreTrend: [
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
      score: 88
    },
    {
      date: "05-07",
      score: 84
    },
    {
      date: "05-08",
      score: 84,
      active: true
    }
  ],
  keyChange: "The conflict has entered a high-level plateau, shifting from explosive escalation to structural confrontation.",
  investmentSignal: "→ Hedge energy/commodities; maintain defensive asset allocations",
  change: "none",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.57 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（持平）：冲突进入高位平台期，由爆发式升级转向结构性对抗。",
    bannerWarning: "→ 对冲能源与大宗风险，维持防御性资产配置",
    deescalationIntent: "美方航行自由权与伊方区域安全主权的根本冲突",
    structuralRisk: "关键航道实质性处于军事化管控状态，商业航运流量较冲突前下降超过60%。",
    contradictionNote: "美方航行自由权与伊方区域安全主权的根本冲突；远程拦截技术的成功率与饱和攻击威胁之间的博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第69天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.57 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (Flat): The conflict has entered a high-level plateau, shifting from explosive escalation to structural confrontation.",
    bannerWarning: "→ Hedge energy/commodities; maintain defensive asset allocations",
    deescalationIntent: "Conflict between US navigation rights and Iranian regional sovereignty",
    structuralRisk: "The strait remains under de facto military control, with commercial traffic down over 60% compared …",
    contradictionNote: "Conflict between US navigation rights and Iranian regional sovereignty; Balance between successful interception rates and saturation attack threats",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 69",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
