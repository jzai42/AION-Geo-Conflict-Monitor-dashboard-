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
  date: "2026-08-14",
  version: "v2.157",
  keyStats: [
    {
      label: "冲突天数",
      value: "D167",
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
      value: "WTI $88.50–$90.10 · Brent $91.20–$93.40",
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
  riskScoreTrend: [
    {
      date: "2026-08-10",
      score: 70
    },
    {
      date: "2026-08-11",
      score: 74
    },
    {
      date: "2026-08-12",
      score: 74
    },
    {
      date: "2026-08-13",
      score: 74
    },
    {
      date: "2026-08-14",
      score: 74
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊双方军队在关键水域维持高度戒备，代理冲突烈度无下降迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道虽然未完全封闭，但安全风险导致多数商业班轮选择避开。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "全球油价保持在高位震荡，供应担忧与宏观下行压力形成拉锯。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事资源持续向中东倾斜，外部势力深度卷入地缘平衡过程。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "非正式沟通存在但缺乏实质性降级动力，立场分歧依旧严重。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "林肯号航母维持阿曼湾警戒",
      description: "美国国防部（DoD）确认航母打击群在关键水道保持执勤，防范潜在海上挑衅。",
      verification: "confirmed",
      timestamp: "2026-08-14",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗伊斯兰革命卫队海上演习",
      description: "伊朗伊斯兰革命卫队在霍尔木兹海峡入口处举行防御性导弹演习，强调区域主权。",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方倾向于受控的边缘政策，避免全面开战",
      "航运阻断成为主要的战略博弈手段",
      "外交斡旋进入长期化平台期"
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
        "延续：美伊海空力量在波斯湾出口维持相互监视，未发生开火事件。",
        "延续：代理武装在周边地区维持低烈度袭扰行动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商船通行仍需高额溢价险，流量较常年减半。",
        "变化：多国海军加强联合护航频率，但商业信心恢复缓慢。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因地缘冲突僵局呈现黏性，现货溢价显著。",
        "延续：市场对沙特及阿联酋的替代供应能力持观望态度。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方高层强调通过外交途径防范误判，但军事部署未见缩减。",
        "变化：伊朗国内强硬派再次公开警告封锁海峡的潜在经济影响。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国内政压力下的中东收缩与遏制伊朗的战略矛盾。",
      "伊朗维持政权安全与缓解制裁压力之间的平衡。"
    ],
    military: [
      "海上控制权争夺与不对称战争手段的持续对抗。"
    ]
  },
  keyChange: "冲突态势从快速升级转入高位防御性僵局。",
  investmentSignal: "→ 维持能源与大宗商品防御头寸，回避高风险资产。",
  change: "none",
  prevRiskScore: 74,
  scoreTrend: [
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
      score: 74
    },
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74,
      active: true
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-14",
  version: "v2.157",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D167",
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
      value: "WTI $88.50–$90.10 · Brent $91.20–$93.40",
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
  riskScore: 74,
  riskScoreTrend: [
    {
      date: "2026-08-10",
      score: 70
    },
    {
      date: "2026-08-11",
      score: 74
    },
    {
      date: "2026-08-12",
      score: 74
    },
    {
      date: "2026-08-13",
      score: 74
    },
    {
      date: "2026-08-14",
      score: 74
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-intensity standoff persists with no withdrawal of heavy assets from the Gulf.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait remains a contested zone with high insurance premiums deterring commercial transit.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices remain elevated as supply risks offset global economic headwinds.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains direct military deployment while other powers engage in active diplomacy.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Backchannel communications are active but major concessions remain absent.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Carrier Strike Group Patrols Gulf of Oman",
      description: "Pentagon confirms USS Abraham Lincoln maintaining vigilant posture near key chokepoints.",
      verification: "confirmed",
      timestamp: "2026-08-14",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Naval Exercises",
      description: "Iranian Revolutionary Guard Corps conducts defensive missile drills at the mouth of the Strait.",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Brinkmanship remains controlled to avoid total war",
      "Shipping disruption serves as the primary strategic lever",
      "Diplomatic fatigue setting in over long-term standoff"
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
        "Continue: US and Iranian assets maintain mutual surveillance in the Gulf; no kinetic exchanges.",
        "Continue: Proxy groups maintain low-intensity harassment in peripheral regions."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial transit through Hormuz requires massive risk premiums; volume halved.",
        "Change: Enhanced multinational patrols implemented but commercial confidence remains low."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices show stickiness due to the deadlock; spot premiums remain high.",
        "Continue: Market remains skeptical of OPEC+'s immediate spare capacity relief."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US officials stress diplomatic prevention of miscalculation while maintaining force.",
        "Change: Hardliners in Tehran warn of economic consequences of total blockade."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Conflict between US regional containment and internal political pressure to de-escalate.",
      "Iranian balance between survival, sovereignty, and sanction relief."
    ],
    military: [
      "Ongoing tension between conventional sea control and asymmetric denial strategies."
    ]
  },
  keyChange: "The conflict has shifted from rapid escalation to a high-threshold defensive stalemate.",
  investmentSignal: "→ Maintain defensive positions in energy and commodities; reduce exposure to high-risk assets.",
  change: "none",
  prevRiskScore: 74,
  scoreTrend: [
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
      score: 74
    },
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74,
      active: true
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
    node406: "8月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.157 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：冲突态势从快速升级转入高位防御性僵局。",
    bannerWarning: "→ 维持能源与大宗商品防御头寸，回避高风险资产。",
    deescalationIntent: "美国内政压力下的中东收缩与遏制伊朗的战略矛盾。",
    structuralRisk: "航道虽然未完全封闭，但安全风险导致多数商业班轮选择避开。",
    contradictionNote: "美国内政压力下的中东收缩与遏制伊朗的战略矛盾。；海上控制权争夺与不对称战争手段的持续对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第167天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.157 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): The conflict has shifted from rapid escalation to a high-threshold defensive stalemate.",
    bannerWarning: "→ Maintain defensive positions in energy and commodities; reduce exposure to high-risk assets.",
    deescalationIntent: "Conflict between US regional containment and internal political pressure to de-…",
    structuralRisk: "Strait remains a contested zone with high insurance premiums deterring commercial transit.",
    contradictionNote: "Conflict between US regional containment and internal political pressure to de-escalate.; Ongoing tension between conventional sea control and asymmetric denia…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 167",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
