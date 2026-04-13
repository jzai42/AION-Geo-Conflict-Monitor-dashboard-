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
  date: "2026-04-13",
  version: "v2.22",
  riskScore: 72,
  prevRiskScore: 72,
  investmentSignal: "谨慎观望",
  keyChange: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D44",
      unit: "2月28日起",
      color: "blue"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "grey"
    },
    {
      label: "油价",
      value: "WTI $100 / Brent $100",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "霍尔木兹",
      value: "许可制，流量50-90%",
      unit: "<10% 常态",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "代理延续",
    targetLevel: "脆弱停火",
    title: "当前战争阶段",
    subTitle: "美伊地缘冲突",
    points: [
      "双方代理武装持续交火，局部冲突频繁。",
      "大国介入加深，军事行动复杂化。",
      "谈判虽存在但停滞，和平前景不明。"
    ],
    note: "战争阶段反映当前冲突的复杂性和谈判的脆弱性。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "24小时内无重大军事升级，持续多战线交火，导弹互射等迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "霍尔木兹海峡航运许可制继续执行，流量维持50-90%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI现价99.82美元/桶，Brent现价100.02美元/桶，油价处于危机水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国及盟友直接军事部署，参与局部作战行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "谈判渠道存在但进展有限，停火脆弱。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "event1",
      title: "导弹互射升级",
      description: "伊朗与美国在波斯湾发生多轮导弹互射，局势紧张。",
      verification: "confirmed",
      timestamp: "2026-04-13T10:00:00Z",
      significance: "高",
      highlight: true,
      critical: true
    },
    {
      id: "event2",
      title: "霍尔木兹航道许可制维持",
      description: "霍尔木兹海峡航运许可制继续执行，流量维持中等水平。",
      verification: "confirmed",
      timestamp: "2026-04-13T08:00:00Z",
      significance: "中"
    },
    {
      id: "event3",
      title: "油价维持高位",
      description: "WTI与Brent油价均维持在100美元附近，市场供应紧张。",
      verification: "confirmed",
      timestamp: "2026-04-13T14:30:16Z",
      significance: "高",
      highlight: true
    },
    {
      id: "event4",
      title: "美军增兵",
      description: "美国宣布向中东增派部队，强化军事存在。",
      verification: "confirmed",
      timestamp: "2026-04-13T09:00:00Z",
      significance: "高",
      highlight: true,
      critical: true
    },
    {
      id: "event5",
      title: "谈判渠道脆弱",
      description: "双方虽保持谈判渠道，但未见实质性进展。",
      verification: "confirmed",
      timestamp: "2026-04-13T12:00:00Z",
      significance: "中"
    }
  ],
  scoreTrend: [
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "多线交火",
      tagColor: "red",
      points: [
        "伊朗与美国在波斯湾多轮导弹互射。",
        "局部代理武装冲突频繁。",
        "美军增兵强化军事存在。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "许可制",
      tagColor: "yellow",
      points: [
        "霍尔木兹海峡航运许可制继续执行。",
        "流量维持在50-90%。",
        "无大规模封锁或扣押事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "油价高企",
      tagColor: "orange",
      points: [
        "WTI现价99.82美元/桶，Brent现价100.02美元/桶。",
        "油价处于危机水平，市场供应紧张。",
        "投资者恐慌性买入迹象明显。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谈判脆弱",
      tagColor: "grey",
      points: [
        "双方保持谈判渠道但进展有限。",
        "政治立场强硬，缺乏互信。",
        "和平前景不明朗。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "双方政治立场强硬，缺乏互信。",
      "谈判渠道虽存在但停滞不前。"
    ],
    military: [
      "多线军事行动持续，冲突升级风险高。",
      "大国直接军事介入加剧局势复杂性。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-13",
  version: "v2.22",
  riskScore: 72,
  prevRiskScore: 72,
  investmentSignal: "Cautious Watch",
  keyChange: "No Change",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D44",
      unit: "Since Feb 28",
      color: "blue"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "grey"
    },
    {
      label: "Oil",
      value: "WTI $100 / Brent $100",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "Hormuz",
      value: "Permit system, 50-90% flow",
      unit: "<10% of normal",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "Proxy War Continuation",
    targetLevel: "Fragile Ceasefire",
    title: "Current War Phase",
    subTitle: "US-Iran Geo-Conflict",
    points: [
      "Proxy forces continue fighting with frequent local clashes.",
      "Great power involvement deepens, complicating military actions.",
      "Negotiations exist but are stalled, peace prospects unclear."
    ],
    note: "The war phase reflects the complexity of the conflict and fragile negotiation status."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "No major military escalation in 24h, ongoing multi-front clashes and missile exchanges.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Hormuz Strait shipping permit system continues, flow maintained at 50-90%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI at $99.82/barrel, Brent at $100.02/barrel, oil prices at crisis level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and allies directly deploy troops and participate in local combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Negotiation channels exist but progress is limited; ceasefire fragile.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "event1",
      title: "Missile Exchange Escalation",
      description: "Multiple missile exchanges occurred between Iran and the US in the Persian Gulf, escalating tensions.",
      verification: "confirmed",
      timestamp: "2026-04-13T10:00:00Z",
      significance: "High",
      highlight: true,
      critical: true
    },
    {
      id: "event2",
      title: "Hormuz Strait Permit System Maintained",
      description: "The permit system for shipping in the Hormuz Strait continues, with moderate flow levels.",
      verification: "confirmed",
      timestamp: "2026-04-13T08:00:00Z",
      significance: "Medium"
    },
    {
      id: "event3",
      title: "Oil Prices Remain High",
      description: "WTI and Brent crude prices remain near $100/barrel, indicating tight market supply.",
      verification: "confirmed",
      timestamp: "2026-04-13T14:30:16Z",
      significance: "High",
      highlight: true
    },
    {
      id: "event4",
      title: "US Troop Reinforcements",
      description: "The US announced troop reinforcements to the Middle East to strengthen military presence.",
      verification: "confirmed",
      timestamp: "2026-04-13T09:00:00Z",
      significance: "High",
      highlight: true,
      critical: true
    },
    {
      id: "event5",
      title: "Fragile Negotiation Channels",
      description: "Negotiation channels remain but substantive progress is lacking.",
      verification: "confirmed",
      timestamp: "2026-04-13T12:00:00Z",
      significance: "Medium"
    }
  ],
  scoreTrend: [
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Multi-front Clashes",
      tagColor: "red",
      points: [
        "Multiple missile exchanges between Iran and the US in the Persian Gulf.",
        "Frequent local proxy force clashes.",
        "US troop reinforcements strengthen military presence."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Permit System",
      tagColor: "yellow",
      points: [
        "Permit system in the Hormuz Strait continues.",
        "Shipping flow maintained at 50-90%.",
        "No large-scale blockade or seizure incidents."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "High Oil Prices",
      tagColor: "orange",
      points: [
        "WTI at $99.82/barrel, Brent at $100.02/barrel.",
        "Oil prices at crisis level, market supply tight.",
        "Signs of panic buying among investors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Fragile Negotiations",
      tagColor: "grey",
      points: [
        "Negotiation channels remain but progress is limited.",
        "Political stances remain hardline with lack of trust.",
        "Peace prospects remain unclear."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Hardline political stances with lack of mutual trust.",
      "Negotiation channels exist but are stalled."
    ],
    military: [
      "Ongoing multi-front military actions increase escalation risk.",
      "Great power direct military involvement complicates the situation."
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.22 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：持平",
    bannerWarning: "谨慎观望",
    deescalationIntent: "双方政治立场强硬，缺乏互信。",
    structuralRisk: "霍尔木兹海峡航运许可制继续执行，流量维持50-90%。",
    contradictionNote: "双方政治立场强硬，缺乏互信。；多线军事行动持续，冲突升级风险高。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第44天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.22 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): No Change",
    bannerWarning: "Cautious Watch",
    deescalationIntent: "Hardline political stances with lack of mutual trust.",
    structuralRisk: "Hormuz Strait shipping permit system continues, flow maintained at 50-90%.",
    contradictionNote: "Hardline political stances with lack of mutual trust.; Ongoing multi-front military actions increase escalation risk.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 44",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
