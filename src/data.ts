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
  date: "2026-06-08",
  version: "v2.89",
  riskScore: 72,
  riskScoreDelta: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D100",
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
      value: "WTI $81.20–$83.50 · Brent $84.50–$86.80",
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
      description: "红海及代理人战场持续发生中低烈度直接交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "波斯湾及阿曼湾航道受到伊朗演习和胡塞武装威胁的双重压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价维持在$85附近震荡，供应忧虑仍是主导因素。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事存在稳定，未进一步向波斯湾增兵，以外交与情报制衡为主。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗对IAEA的态度趋于强硬，双边谈判陷入僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM红海防御行动",
      description: "美军成功拦截2架自胡塞武装区发射的自杀式无人机，保护商业航线。",
      verification: "confirmed",
      timestamp: "2026-06-07 22:45 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗增加离心机部署",
      description: "德黑兰作为对IAEA决议的报复，宣布启动新的先进离心机级联。",
      verification: "confirmed",
      timestamp: "2026-06-08 06:30 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价区间企稳",
      description: "Brent原油在$85美元上方窄幅盘整，地缘溢价未因D100节点出现恐慌性飙升。",
      verification: "confirmed",
      timestamp: "2026-06-08 11:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "代理冲突延续",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突进入百日分水岭，双方形成相互消耗的常态化军事平衡。",
      "海域封锁从“突发事件”演变为“长期风险定价因素”。",
      "外交渠道处于极低频次接触，甚至通过第三方传话。"
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
        "延续：美军维持红海区域的防御性巡航与无人机拦截。",
        "变化：伊朗及其代理人在伊拉克境内的基地出现小规模战术调动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：红海商业航运量较2025年同期下降约40%。",
        "变化：伊朗在阿曼湾海域启动为期48小时的防御性海上演习。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球原油库存处于低位，对地缘供应中断反应极度敏感。",
        "延续：亚太买家寻找替代路线以对冲波斯湾封锁风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗新任外长表示不会在压力下重返核协议谈判。",
        "变化：美国白宫称目前无意寻求中东地区的全面军事冲突。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗核地位合法化与美欧制裁的死结。",
      "美国中东战略收缩与不得不维持地区盟友安全承诺的矛盾。"
    ],
    military: [
      "非对称战争手段（无人机/导弹）对传统海军护航成本的极度挑战。"
    ]
  },
  scoreTrend: [
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
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
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突进入百日（D100），油价与军事活动在“高压状态”下形成阶段性横盘，暂无打破现状的黑天鹅事件。",
  investmentSignal: "→ 维持对冲能源与大宗商品风险，维持防御性资产头寸，关注长期通胀韧性。",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-08",
  version: "v2.89",
  riskScore: 72,
  riskScoreDelta: "Unchanged",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D100",
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
      value: "WTI $81.20–$83.50 · Brent $84.50–$86.80",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Continuous direct skirmishes in the Red Sea and proxy theaters.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Double pressure from Iranian drills and Houthi threats in the Gulf of Oman.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices oscillate around $85 with supply anxiety as the dominant factor.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Stable US military presence with focus on intelligence and strategic containment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iranian stance hardens following IAEA resolution; talks remain at an impasse.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM Red Sea Interception",
      description: "US forces successfully neutralized 2 Houthi UAVs to protect commercial shipping lanes.",
      verification: "confirmed",
      timestamp: "2026-06-07 22:45 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Boosts Centrifuge Deployment",
      description: "Tehran announces activation of new advanced centrifuge cascades as retaliation against IAEA.",
      verification: "confirmed",
      timestamp: "2026-06-08 06:30 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Prices Stabilize",
      description: "Brent remains steady above $85/bbl; no panic surge seen at the D100 milestone.",
      verification: "confirmed",
      timestamp: "2026-06-08 11:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Proxy Conflict Continuation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict hits Day 100, reaching a state of high-pressure military equilibrium.",
      "Maritime disruption has transitioned from a 'shock' to a 'long-term risk premium'.",
      "Diplomatic channels are restricted to low-frequency indirect messaging."
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
        "Continue: US Navy maintains defensive patrols and UAV interceptions in the Red Sea.",
        "Change: Minor tactical movements of Iranian-backed groups observed in Iraq."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Red Sea commercial transit volumes remain 40% below 2025 levels.",
        "Change: Iran initiates a 48-hour naval exercise in the Gulf of Oman."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global oil inventories are low, leaving markets hyper-sensitive to supply shocks.",
        "Continue: Asian buyers actively secure alternative routes to mitigate Strait of Hormuz risks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran's FM states no return to nuclear talks under Western pressure.",
        "Change: White House reiterates no desire for a full-scale regional war."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The deadlock between Iranian nuclear legitimacy and Western sanctions.",
      "US strategic pivot vs. the necessity of regional security commitments."
    ],
    military: [
      "Asymmetric warfare (drones/missiles) challenging high-cost naval escort strategies."
    ]
  },
  scoreTrend: [
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
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
      score: 72,
      active: true
    }
  ],
  keyChange: "Conflict hits D100 with oil and military activity hitting a 'high-pressure plateau' with no immediate black swan triggers.",
  investmentSignal: "→ Maintain hedges in energy and commodities, hold defensive positions, monitor long-term inflation resilience.",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.89 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：冲突进入百日（D100），油价与军事活动在“高压状态”下形成阶段性横盘，暂无打破现状的黑天鹅事件。",
    bannerWarning: "→ 维持对冲能源与大宗商品风险，维持防御性资产头寸，关注长期通胀韧性。",
    deescalationIntent: "伊朗核地位合法化与美欧制裁的死结。",
    structuralRisk: "波斯湾及阿曼湾航道受到伊朗演习和胡塞武装威胁的双重压力。",
    contradictionNote: "伊朗核地位合法化与美欧制裁的死结。；非对称战争手段（无人机/导弹）对传统海军护航成本的极度挑战。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第100天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.89 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Conflict hits D100 with oil and military activity hitting a 'high-pressure plateau' with no immediate black swan triggers.",
    bannerWarning: "→ Maintain hedges in energy and commodities, hold defensive positions, monitor long-term inflation resilience.",
    deescalationIntent: "The deadlock between Iranian nuclear legitimacy and Western sanctions.",
    structuralRisk: "Double pressure from Iranian drills and Houthi threats in the Gulf of Oman.",
    contradictionNote: "The deadlock between Iranian nuclear legitimacy and Western sanctions.; Asymmetric warfare (drones/missiles) challenging high-cost naval escort strategies.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 100",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
