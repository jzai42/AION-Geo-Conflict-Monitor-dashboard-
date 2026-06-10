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
  date: "2026-06-10",
  version: "v2.91",
  keyStats: [
    {
      label: "冲突天数",
      value: "D102",
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
      value: "WTI $85–100 · Brent $90–105",
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
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 76,
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "详见下方事件卡片。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "美军空袭伊朗防空与雷达设施",
      description: "美国中央司令部称，美军对霍尔木兹海峡附近伊朗的防空与雷达设施实施空袭，作为对伊朗击落美军直升机的回应。特朗普称必须回应该攻击。",
      verification: "confirmed",
      timestamp: "2026-06-10T07:55:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "伊朗宣称打击美军基地并击毁F‑35与指挥中心",
      description: "伊朗革命卫队称其导弹袭击了约旦和巴林的美军基地，摧毁F‑35战机机库与指挥中心。",
      verification: "single",
      timestamp: "2026-06-10T07:55:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军称击落伊朗导弹与无人机，防止霍尔木兹航道威胁",
      description: "美军称击落伊朗发射的导弹与无人机，目标包括科威特、巴林及霍尔木兹海峡方向，未造成人员伤亡。",
      verification: "single",
      timestamp: "2026-06-05T23:03:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗首次自停火以来向以色列发射导弹",
      description: "伊朗向以色列发射导弹，为4月8日停火以来首次，触发以色列防空系统拦截。",
      verification: "single",
      timestamp: "2026-06-07T19:48:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "美元回落，因伊朗与以色列同意停止互相攻击",
      description: "路透称，在美国斡旋下，伊朗与以色列同意停止互相攻击，美元回落但仍接近两个月高位。",
      verification: "single",
      timestamp: "2026-06-08T22:56:00Z",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：详见风险因子。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国一方面寻求谈判，另一方面军事行动升级。"
    ],
    military: [
      "美军空袭与伊朗导弹回应形成军事对峙加剧。"
    ]
  },
  scoreTrend: [
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76,
      active: true
    }
  ],
  keyChange: "军事升级显著，谈判前景进一步恶化。",
  investmentSignal: "→ 建议防御性配置，增持能源与大宗商品避险部位。",
  change: "up",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-10",
  version: "v2.91",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D102",
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
      value: "WTI $85–100 · Brent $90–105",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 76,
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "See event cards below."
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "US airstrikes on Iranian air defense and radar sites",
      description: "US Central Command said US forces struck Iranian air defense and radar sites near the Strait of Hormuz in response to Iran downing a US helicopter. Trump said the US must respond.",
      verification: "confirmed",
      timestamp: "2026-06-10T07:55:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Iran claims strikes on US bases destroying F‑35s and command center",
      description: "Iran’s Revolutionary Guard claimed missile strikes on US bases in Jordan and Bahrain, destroying F‑35 shelters and a command center.",
      verification: "single",
      timestamp: "2026-06-10T07:55:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US says it shot down Iranian missiles and drones threatening Hormuz",
      description: "US military said it shot down Iranian missiles and drones launched toward Kuwait, Bahrain, and the Strait of Hormuz, with no casualties reported.",
      verification: "single",
      timestamp: "2026-06-05T23:03:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran fires missiles at Israel for first time since ceasefire",
      description: "Iran launched missiles at Israel, the first direct attack since the April 8 ceasefire, triggering Israel’s air defenses.",
      verification: "single",
      timestamp: "2026-06-07T19:48:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Dollar eases as Iran and Israel agree to halt strikes",
      description: "Reuters reported that after US mediation, Iran and Israel agreed to halt attacks on each other, easing the dollar though it remained near two‑month highs.",
      verification: "single",
      timestamp: "2026-06-08T22:56:00Z",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: See risk factors."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US seeks negotiation while escalating military action."
    ],
    military: [
      "US airstrikes and Iranian missile responses intensify military confrontation."
    ]
  },
  scoreTrend: [
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76,
      active: true
    }
  ],
  keyChange: "Significant military escalation, negotiation outlook further deteriorates.",
  investmentSignal: "→ Recommend defensive positioning, increase holdings in energy and commodities for hedging.",
  change: "up",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.91 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑4）：军事升级显著，谈判前景进一步恶化。",
    bannerWarning: "→ 建议防御性配置，增持能源与大宗商品避险部位。",
    deescalationIntent: "美国一方面寻求谈判，另一方面军事行动升级。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "美国一方面寻求谈判，另一方面军事行动升级。；美军空袭与伊朗导弹回应形成军事对峙加剧。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第102天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.91 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑4): Significant military escalation, negotiation outlook further deteriorates.",
    bannerWarning: "→ Recommend defensive positioning, increase holdings in energy and commodities for hedging.",
    deescalationIntent: "US seeks negotiation while escalating military action.",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "US seeks negotiation while escalating military action.; US airstrikes and Iranian missile responses intensify military confrontation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 102",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
