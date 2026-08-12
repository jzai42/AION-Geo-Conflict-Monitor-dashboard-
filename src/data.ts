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
  date: "2026-08-12",
  version: "v2.155",
  riskScore: 74,
  riskLevel: "High",
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D165",
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
      value: "WTI $82.50–$84.10 · Brent $86.80–$88.40",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行受限",
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
      description: "美伊双方在一线部署规模已达近三年峰值。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道实质性阻塞风险维持高位，安保成本激增。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "市场已计入地缘风险，油价维持在$80-90区间高位震荡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事资源倾斜明显，多国通过外交渠道对伊施压。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "谈判渠道虽未切断，但实质共识远未达成。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "林肯号航母打击群抵达作战位置",
      description: "美国国防部确认该航母群已完成跨区调动，显著增强中东地区的快速反应能力。",
      verification: "confirmed",
      timestamp: "2026-08-12 04:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗展示“征服者”系列反舰导弹",
      description: "伊朗革命卫队在军事演习中高调展示该型导弹，并警告任何域外介入将面临报复。",
      verification: "confirmed",
      timestamp: "2026-08-11 22:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "多哈和谈进展有限",
      description: "卡塔尔官员透露，最新一轮技术性磋商未能在核心条款上取得突破，气氛趋于严峻。",
      verification: "confirmed",
      timestamp: "2026-08-12 01:15",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "威慑均势：美军增援与伊朗军演形成力量对冲。",
      "心理博弈：双方均处于“临战但不主动求战”的状态。",
      "风险传导：地缘溢价已从能源市场传导至供应链保险市场。"
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
        "变化：美伊双方在一线部署规模已达近三年峰值。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：航道实质性阻塞风险维持高位，安保成本激增。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场已计入地缘风险，油价维持在$80-90区间高位震荡。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军事资源倾斜明显，多国通过外交渠道对伊施压。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "地区安全主导权的排他性竞争。",
      "国内政治压力导致的妥协空间收窄。"
    ],
    military: [
      "高烈度威慑与非对称作战能力的抵消。",
      "代理人武装行动的高度不确定性。"
    ]
  },
  scoreTrend: [
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74,
      active: true
    }
  ],
  keyChange: "美军航母部署完成标志着局势正式进入“高压平台期”。",
  investmentSignal: "→ 维持 能源 与 风险资产 的 防御 性配置，增加 黄金 对冲 波动。",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-12",
  version: "v2.155",
  riskScore: 74,
  riskLevel: "High",
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D165",
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
      value: "WTI $82.50–$84.10 · Brent $86.80–$88.40",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Limited Transit",
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
      description: "Deployment levels on both sides have reached a three-year peak.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Risk of blockade remains high; security costs for shipping have surged.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Geopolitical risk priced in; oil stabilizes in the $80-90 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Significant US military pivot; diplomatic pressure peaking.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Channels remain open but without substantive consensus.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "USS Abraham Lincoln Carrier Group Arrives",
      description: "Pentagon confirms completion of inter-theater movement, enhancing rapid response capability.",
      verification: "confirmed",
      timestamp: "2026-08-12 04:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Displays Fateh Anti-Ship Missiles",
      description: "IRGC showcases missile tech during drills, warning against external intervention.",
      verification: "confirmed",
      timestamp: "2026-08-11 22:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Doha Talks Show Limited Progress",
      description: "Qatari officials reveal latest technical consultations failed to break core deadlocks.",
      verification: "confirmed",
      timestamp: "2026-08-12 01:15",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Deterrence Equilibrium: US reinforcements offset by Iranian military exercises.",
      "Psychological Brinkmanship: Both sides are ready but not seeking first-strike.",
      "Risk Spillover: Geopolitical premiums spreading from energy to supply chain insurance."
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
        "Change: Deployment levels on both sides have reached a three-year peak."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk of blockade remains high; security costs for shipping have surged."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Geopolitical risk priced in; oil stabilizes in the $80-90 range."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Significant US military pivot; diplomatic pressure peaking."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum competition for regional security dominance.",
      "Narrowed compromise space due to domestic political pressures."
    ],
    military: [
      "Offset of high-intensity deterrence by asymmetric capabilities.",
      "High uncertainty of proxy militia actions."
    ]
  },
  scoreTrend: [
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74,
      active: true
    }
  ],
  keyChange: "Completion of US carrier deployment marks the formal entry into a 'High-Pressure Plateau'.",
  investmentSignal: "→ Maintain Defensive positioning in Energy and Risky Assets, increase Gold for Volatility hedging.",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.155 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：美军航母部署完成标志着局势正式进入“高压平台期”。",
    bannerWarning: "→ 维持 能源 与 风险资产 的 防御 性配置，增加 黄金 对冲 波动。",
    deescalationIntent: "地区安全主导权的排他性竞争。",
    structuralRisk: "航道实质性阻塞风险维持高位，安保成本激增。",
    contradictionNote: "地区安全主导权的排他性竞争。；高烈度威慑与非对称作战能力的抵消。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第165天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.155 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): Completion of US carrier deployment marks the formal entry into a 'High-Pressure Plateau'.",
    bannerWarning: "→ Maintain Defensive positioning in Energy and Risky Assets, increase Gold for Volatility hedging.",
    deescalationIntent: "Zero-sum competition for regional security dominance.",
    structuralRisk: "Risk of blockade remains high; security costs for shipping have surged.",
    contradictionNote: "Zero-sum competition for regional security dominance.; Offset of high-intensity deterrence by asymmetric capabilities.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 165",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
