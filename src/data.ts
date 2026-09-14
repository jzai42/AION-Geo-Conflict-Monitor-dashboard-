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
  date: "2026-09-14",
  version: "v2.188",
  keyStats: [
    {
      label: "冲突天数",
      value: "D198",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $89.20–$93.10 · Brent $93.50–$97.80",
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
  riskScore: 82,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方均处于最高战争准备状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道受演习限制，商业航运高度规避。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "市场对供应中断的恐慌推高溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美国军事资产密集部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道完全中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗革命卫队开展封锁演习",
      description: "IRGC 海军在霍尔木兹海峡测试多型导弹与无人艇，模拟封锁关键航道（IRNA）。",
      verification: "confirmed",
      timestamp: "2026-09-14",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军增派 F-35 部署至中东",
      description: "五角大楼宣布增强地区空中打击力量以应对德黑兰威胁（U.S. DoD）。",
      verification: "confirmed",
      timestamp: "2026-09-14",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事部署达到近年最高峰值",
      "能源市场计入全面断供预期",
      "外交斡旋几近停滞"
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
        "延续：美国双航母编队在阿拉伯海维持高度戒备。",
        "变化：伊朗在海峡地区进行针对性实弹射击演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：保险溢价处于冲突以来最高位。",
        "变化：演习直接占领部分商业航道，过往船只数量环比下降 15%。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：地缘战争溢价支撑油价维持高位。",
        "变化：Brent 价格突破关键心理阻力位 $95。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申“不寻求战争但已做好准备”。",
        "变化：德黑兰声明若演习受干扰将实施实质性报复。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求全面解除制裁与美国要求停止导弹计划之间的不可调和。"
    ],
    military: [
      "霍尔木兹海峡控制权与航行自由权的高度对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82,
      active: true
    }
  ],
  keyChange: "伊朗军事演习导致海峡风险实质性上升，油价触及年内高带。",
  investmentSignal: "→ 维持防御性避险配置，重点对冲能源价格波动风险。",
  change: "none",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-14",
  version: "v2.188",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D198",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $89.20–$93.10 · Brent $93.50–$97.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 82,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Highest state of combat readiness on both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Sea lanes constricted by drills; commercial shipping avoidance.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Supply disruption fears driving war premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Dense deployment of US military assets.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "Complete breakdown of diplomatic channels.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Launches Blockade Drills",
      description: "Iranian naval forces test missiles and suicide boats in simulated Strait closure (IRNA).",
      verification: "confirmed",
      timestamp: "2026-09-14",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Deploys Additional F-35s",
      description: "Pentagon bolsters air strike capabilities in response to Iranian threats (U.S. DoD).",
      verification: "confirmed",
      timestamp: "2026-09-14",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military deployments at multi-year peaks",
      "Energy markets pricing in total supply cut",
      "Diplomatic mediation near total collapse"
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
        "Continue: Dual US carrier groups remain on high alert in the Arabian Sea.",
        "Change: Iran conducts live-fire anti-ship exercises near the Strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: War risk insurance premiums at conflict-high levels.",
        "Change: Drills occupy commercial lanes, transit volume down 15% WoW."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Geopolitical war premium supporting high oil prices.",
        "Change: Brent price breaks critical psychological resistance at $95."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates 'not seeking war but ready'.",
        "Change: Tehran warns of retaliation if drills are interfered with."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable demands between US sanctions removal and Iran's missile program."
    ],
    military: [
      "High confrontation over control of the Strait vs freedom of navigation."
    ]
  },
  scoreTrend: [
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82,
      active: true
    }
  ],
  keyChange: "Iranian drills significantly increase Strait risks; oil reaches yearly highs.",
  investmentSignal: "→ Maintain defensive hedge positions, focus on energy commodities for risk mitigation.",
  change: "none",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.188 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（↓6）：伊朗军事演习导致海峡风险实质性上升，油价触及年内高带。",
    bannerWarning: "→ 维持防御性避险配置，重点对冲能源价格波动风险。",
    deescalationIntent: "伊朗要求全面解除制裁与美国要求停止导弹计划之间的不可调和。",
    structuralRisk: "航道受演习限制，商业航运高度规避。",
    contradictionNote: "伊朗要求全面解除制裁与美国要求停止导弹计划之间的不可调和。；霍尔木兹海峡控制权与航行自由权的高度对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第198天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.188 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (↓6): Iranian drills significantly increase Strait risks; oil reaches yearly highs.",
    bannerWarning: "→ Maintain defensive hedge positions, focus on energy commodities for risk mitigation.",
    deescalationIntent: "Irreconcilable demands between US sanctions removal and Iran's missile program.",
    structuralRisk: "Sea lanes constricted by drills; commercial shipping avoidance.",
    contradictionNote: "Irreconcilable demands between US sanctions removal and Iran's missile program.; High confrontation over control of the Strait vs freedom of navigation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 198",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
