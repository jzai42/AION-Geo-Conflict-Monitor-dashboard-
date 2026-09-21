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
  date: "2026-09-21",
  version: "v2.199",
  riskScore: 76,
  keyChange: "美伊元首在联大前夕释放间接对话意向，油价自高位回撤，但海峡运费破纪录与军事戒备使综合风险维持76分高位黏滞。",
  investmentSignal: "→ 维持能源与大宗商品的防御性配置底仓，适度对冲高位供应链运输溢价，暂不盲目增持风险资产。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D205",
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
      value: "WTI $91.59–$97.22 · Brent $99.54–$104.99",
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
      description: "战区直接交火与区域多线打击持续，美军与伊朗革命卫队维持全域高度互备戒备状态（依据：AP、CBS News）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业通航维持高压许可与护航体制，超大型油轮运价创历史纪录，商业自由通行量不足正常水准五成（依据：US CENTCOM、Bloomberg）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI日内区间91.59–97.22美元，布伦特99.54–104.99美元，主力价格主体落在85–100美元偏强区间并自前高回撤，供应担忧持续但外交预期挤出投机溢价（依据：Reuters、Bloomberg，参考信源：https://unn.ua/news/oil-prices-fell-to-an-11-day-low-what-contributed）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军持续执行区域护航和防空拦截任务，多国保持武器支持与联合情报共享（依据：US CENTCOM、Reuters）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "部分证实：美伊领导层虽释放联大偶遇或间接谈判意愿，但停火先决条件南辕北辙，破裂与僵持风险依然居高不下（依据：Reuters、Al Jazeera）。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "联大前夕美伊释放接触信号但伴随威慑表态",
      description: "路透社与CBS新闻报道，美国总统表示对在联合国大会期间接触伊朗总统持开放态度，但强调仍在评估包括严厉经济施压或军事行动在内的选项；伊朗革命卫队同日警告若遭新袭击将扩大冲突地理范围。",
      verification: "confirmed",
      timestamp: "2026-09-21T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "国际油价自高位回撤试探百美元关口",
      description: "彭博社与路透社报道，WTI日内运行于91.59–97.22美元/桶，布伦特回落至99.54–104.99美元/桶区间，因市场消化沙特部分出口恢复预期及联大潜在外交斡旋，风险溢价短线挤出。",
      verification: "confirmed",
      timestamp: "2026-09-21T09:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军中央司令部通报霍尔木兹护航规模",
      description: "美军中央司令部官方发布声明，过去数月已护航逾2000艘商船和10亿桶原油出海；但彭博行业分析指出霍尔木兹海峡内VLCC超大型油轮单日租金仍突破百万美元天价。",
      verification: "confirmed",
      timestamp: "2026-09-20T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "红海与沙特境内能源基础设施遇袭警报频发",
      description: "美联社与法新社报道，也门胡塞武装对利雅得及红海延布（Yanbu）炼油枢纽发动导弹与无人机袭击遭防空拦截，美国驻中东多国使馆紧急发布旅行与安全警戒。",
      verification: "confirmed",
      timestamp: "2026-09-20T18:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "战场未出现新的多国正规军全面对撞，但代理人战线交火与关键设施袭扰持续。",
      "航道物流虽然在强行军护航下维持低位通流，但商业保险与租金成本推升至极限。",
      "外交谈判窗口仅停留在口头试探阶段，缺乏实质信任基础。"
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
        "延续：胡塞武装与区域抵抗力量持续以低成本无人机和弹道导弹试探沙特及红海关键设施。",
        "变化：美军中东各基地进入防空升级戒备，多国使馆同步收紧安全通告级别。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡主要通航高度依赖美军及盟友舰队护航编队通行。",
        "变化：商业VLCC运价突破110万美元/日纪录，折合单桶运输成本超22美元。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海湾原油出口物理受阻导致现货结构性紧平衡，远期曲线深度倒挂。",
        "变化：WTI与布伦特分别回落至92与100美元附近，联大外交缓和预期促使资金平抑部分风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿与德黑兰继续以公开声明和代理人动作施压，缺乏直接沟通渠道。",
        "变化：美总统表态对在联大期间接触伊方持开放态度，但明确重申多项战略强硬选项。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方国内政治强硬派均要求以对方先行实质退让作为正式谈判前提。"
    ],
    military: [
      "美军护航体制与伊朗对海峡事实管控权的不可调和冲突推高偶发擦枪走火概率。"
    ]
  },
  scoreTrend: [
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76,
      active: true
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-21",
  version: "v2.199",
  riskScore: 76,
  keyChange: "US and Iranian leaders signaled potential UNGA interactions as crude pared gains, yet record shipping premiums and elevated defense alerts kept risk scores locked at 76.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities while hedging persistent maritime transportation premiums, refraining from premature additions to risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D205",
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
      value: "WTI $91.59–$97.22 · Brent $99.54–$104.99",
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
      prev: 5,
      weight: 0.2,
      description: "Direct combat theater and multi-front missile skirmishes persist, keeping US and Iranian forces at maximum readiness (Sources: AP, CBS News).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial passage remains severely restricted under escorted operations, with VLCC day-rates hitting all-time highs and free commercial transit under 50% (Sources: US CENTCOM, Bloomberg).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI session traded at $91.59–$97.22 with Brent at $99.54–$104.99; trading primarily resides in the $85–$100 band as diplomatic hopes trimmed geopolitical premiums (Sources: Reuters, Bloomberg, Ref URL: https://unn.ua/news/oil-prices-fell-to-an-11-day-low-what-contributed).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military maintains ongoing maritime convoy protection and air defense interceptions across the Persian Gulf (Sources: US CENTCOM, Reuters).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Partial verification: While leaders signaled potential UNGA interactions, preconditions remain incompatible, maintaining elevated risk of stalemate (Sources: Reuters, Al Jazeera).",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Signal Potential UNGA Contact Amid Lingering Threats",
      description: "Reuters and CBS News reported President Trump expressed openness to meeting Iran's President Pezeshkian at the UN General Assembly while weighing severe options, as IRGC commanders warned of widening the war's geography if attacked.",
      verification: "confirmed",
      timestamp: "2026-09-21T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Crude Benchmarks Retreat Toward $100 Psychological Mark",
      description: "Bloomberg and Reuters reported WTI fluctuating in the $91.59–$97.22 range and Brent at $99.54–$104.99, easing on hopes of diplomatic progress and partial Saudi export resumption.",
      verification: "confirmed",
      timestamp: "2026-09-21T09:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US CENTCOM Releases Hormuz Escort Milestones",
      description: "US Central Command announced it has escorted over 2,000 commercial vessels and 1 billion barrels of oil, though Bloomberg reported VLCC tanker day-rates within Hormuz remain at historic highs above $1.1 million.",
      verification: "confirmed",
      timestamp: "2026-09-20T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Regional Infrastructure Alerts Trigger Embassy Warnings",
      description: "AP and AFP reported Houthi missile and drone launches targeting Riyadh and Yanbu were intercepted, prompting US regional embassies to issue elevated security advisories for Americans.",
      verification: "confirmed",
      timestamp: "2026-09-20T18:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct peer-to-peer combat escalation has plateaued, but asymmetric strikes against infrastructure persist.",
      "Maritime transit functions under heavy military escort while freight and insurance surcharges stay near peaks.",
      "Diplomatic signaling remains preliminary and transactional without structural alignment."
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
        "Continue: Houthi and regional aligned groups sustain missile and drone probes against strategic Gulf infrastructure.",
        "Change: US embassies issued heightened security alerts as regional defense detachments tightened intercept postures."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hormuz commercial transits remain constrained under bilateral escort operations.",
        "Change: VLCC daily charter costs cleared $1.1 million, setting an unprecedented freight penalty."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Persian Gulf crude outflows maintain backwardation due to persistent logistics friction.",
        "Change: Paper crude retreated toward $92 (WTI) and $100 (Brent) as diplomatic hopes unwound immediate risk premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Public posturing between Washington and Tehran emphasizes deterrence and retaliatory threats.",
        "Change: White House indicated conditional willingness to engage Iranian leadership at the UN General Assembly."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Domestic hardliners in both capitals demand unilateral concessions before committing to structured peace talks."
    ],
    military: [
      "The friction between US freedom-of-navigation escorts and Iranian de facto maritime control sustains continuous miscalculation risks."
    ]
  },
  scoreTrend: [
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76,
      active: true
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.199 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美伊元首在联大前夕释放间接对话意向，油价自高位回撤，但海峡运费破纪录与军事戒备使综合风险维持76分高位黏滞。",
    bannerWarning: "→ 维持能源与大宗商品的防御性配置底仓，适度对冲高位供应链运输溢价，暂不盲目增持风险资产。",
    deescalationIntent: "美伊双方国内政治强硬派均要求以对方先行实质退让作为正式谈判前提。",
    structuralRisk: "商业通航维持高压许可与护航体制，超大型油轮运价创历史纪录，商业自由通行量不足正常水准五成（依据：US CENTCOM、Bloomberg）。",
    contradictionNote: "美伊双方国内政治强硬派均要求以对方先行实质退让作为正式谈判前提。；美军护航体制与伊朗对海峡事实管控权的不可调和冲突推高偶发擦枪走火概率。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第205天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.199 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US and Iranian leaders signaled potential UNGA interactions as crude pared gains, yet record shipping premiums and elevated defense alerts …",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities while hedging persistent maritime transportation premiums, r…",
    deescalationIntent: "Domestic hardliners in both capitals demand unilateral concessions before commi…",
    structuralRisk: "Commercial passage remains severely restricted under escorted operations, with VLCC day-rates hitti…",
    contradictionNote: "Domestic hardliners in both capitals demand unilateral concessions before committing to structured peace talks.; The friction between US freedom-of-navigation …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 205",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
