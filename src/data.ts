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
  date: "2026-06-15",
  version: "v2.96",
  keyStats: [
    {
      label: "冲突天数",
      value: "D107",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $80.01–$80.61 · Brent $83.00–$83.45",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分限制",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 44,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "直接军事对抗停止",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "协议重开航道但细节待定",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价因协议大跌重回温和区间",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "军事对抗降级转向外交斡旋",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "达成实质性谈判框架",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt_0615_1",
      title: "美国与伊朗达成停火及重开霍尔木兹海峡框架协议",
      description: "美国总统特朗普与伊朗官员证实，双方已达成一份谅解备忘录（MOU），将延长停火60天、重开霍尔木兹海峡、解除美国对伊朗港口的海上封锁，并启动后续核问题谈判。协议预计将于本周五（6月19日）在瑞士签署。(Axios, The Washington Post, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_0615_2",
      title: "油价因美伊协议前景大跌，布伦特跌至约83美元",
      description: "受美伊达成协议框架的消息影响，全球油价大幅下挫。布伦特原油下跌约5%，至每桶83美元附近，WTI原油也跌破81美元，创三个月新低。市场正消化战争风险溢价的快速消退。(Morningstar, INDmoney, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: "",
      highlight: true
    },
    {
      id: "evt_0615_3",
      title: "霍尔木兹海峡重开前景乐观，但航运界持谨慎态度",
      description: "尽管协议框架包含重开霍尔木兹海峡的条款，但国际航运组织（如BIMCO）与海事安全公司警告称，恢复正常通行面临操作与安全上的不确定性，包括水雷威胁与具体通行安排，预计完全正常化需要数周时间。(Seatrade Maritime News, gCaptain, The Straits Times)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: ""
    },
    {
      id: "evt_0615_4",
      title: "伊朗官员称协议为“第一步”，强调后续谈判艰巨",
      description: "伊朗第一副总统穆罕默德·礼萨·阿里夫表示，与美国达成的协议仅是“第一步”，实现永久和平的后续谈判将更加困难。这表明德黑兰方面认为许多核心问题仍待解决。(CBS News)",
      verification: "single",
      timestamp: "2026-06-15",
      significance: ""
    },
    {
      id: "evt_0615_5",
      title: "以色列对美伊协议反应复杂，称不受其约束",
      description: "以色列官员对美伊协议表示批评，并强调以色列在黎巴嫩针对真主党的军事行动不受该协议约束。这为停火协议的区域稳定性增添了复杂因素。(Fox News, The Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方官宣达成谅解备忘录，将签署停火协议并启动为期60天的后续谈判。",
      "直接军事对抗暂停，市场风险偏好迅速修复，焦点转向外交轨道。",
      "协议的脆弱性与区域盟友（如以色列）的立场构成潜在变数，执行细节尚待明确。"
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
        "变化：直接军事对抗停止"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：协议重开航道但细节待定"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因协议大跌重回温和区间"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：军事对抗降级转向外交斡旋"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗寻求解除制裁与获得安全保证，而美国及其盟友则要求严格限制伊朗核能力与地区影响力，这一根本矛盾在谈判中依然存在。"
    ],
    military: [
      "停火协议的执行与监督机制尚不明确，区域内代理人武装（如真主党）的行动可能破坏脆弱的停火状态。"
    ]
  },
  scoreTrend: [
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44,
      active: true
    }
  ],
  investmentSignal: "→ 增持风险资产，前期部署的能源与地缘对冲仓位可考虑部分减持，市场风险偏好显著修复。",
  prevRiskScore: 52,
  keyChange: "24h要点：详见事件与因子。",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price June 15 2026",
    "US Iran relations latest news",
    "Strait of Hormuz maritime security status June 2026",
    "Iran nuclear talks update"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-15",
  version: "v2.96",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D107",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $80.01–$80.61 · Brent $83.00–$83.45",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 44,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Direct military confrontation has ceased",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Deal to reopen strait but details pending",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices plunge back to moderate range on deal",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "De-escalation shifts focus to diplomacy",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "Substantive negotiation framework reached",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt_0615_1",
      title: "U.S. and Iran reach framework agreement for ceasefire and reopening of Strait of Hormuz",
      description: "U.S. President Trump and Iranian officials confirmed they have reached a memorandum of understanding (MOU) to extend a ceasefire for 60 days, reopen the Strait of Hormuz, lift the U.S. naval blockade on Iranian ports, and initiate follow-on nuclear talks. The deal is expected to be signed on Friday, June 19, in Switzerland. (Axios, The Washington Post, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_0615_2",
      title: "Oil prices plunge on U.S.-Iran deal prospects, Brent falls to ~$83",
      description: "Global oil prices dropped sharply on news of the U.S.-Iran framework agreement. Brent crude fell by about 5% to around $83 per barrel, and WTI crude fell below $81, hitting a three-month low, as the market rapidly prices out the war risk premium. (Morningstar, INDmoney, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: "",
      highlight: true
    },
    {
      id: "evt_0615_3",
      title: "Optimism over Hormuz reopening tempered by caution from shipping industry",
      description: "Although the framework deal includes reopening the Strait of Hormuz, international shipping bodies (like BIMCO) and maritime security firms warn of operational and security uncertainties, including mine threats and a lack of specific transit arrangements, expecting full normalization could take weeks. (Seatrade Maritime News, gCaptain, The Straits Times)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: ""
    },
    {
      id: "evt_0615_4",
      title: "Iranian official calls deal a 'first step,' emphasizes difficult negotiations ahead",
      description: "Iranian First Vice President Mohammad Reza Aref stated that the agreement with the U.S. is only the 'first step' and that subsequent negotiations for a permanent peace will be more difficult, signaling that Tehran believes many core issues remain unresolved. (CBS News)",
      verification: "single",
      timestamp: "2026-06-15",
      significance: ""
    },
    {
      id: "evt_0615_5",
      title: "Israel voices mixed reaction to U.S.-Iran deal, says it is not bound by it",
      description: "Israeli officials have criticized the U.S.-Iran deal and emphasized that Israel's military operations against Hezbollah in Lebanon are not constrained by the agreement, adding a layer of complexity to the regional stability of the ceasefire. (Fox News, The Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-06-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran officially announced a memorandum of understanding, paving the way for signing a ceasefire and launching a 60-day period for further negotiations.",
      "Direct military confrontation has been paused, leading to a rapid recovery in market risk appetite, with the focus shifting to the diplomatic track.",
      "The fragility of the agreement and the stance of regional allies (like Israel) pose potential risks, with implementation details yet to be clarified."
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
        "Change: Direct military confrontation has ceased"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Deal to reopen strait but details pending"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices plunge back to moderate range on deal"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: De-escalation shifts focus to diplomacy"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's quest for sanctions relief and security guarantees versus the U.S. and allied demands for strict limits on Iran's nuclear capabilities and regional influence remains the fundamental, unresolved tension in negotiations."
    ],
    military: [
      "The enforcement and monitoring mechanisms for the ceasefire are still unclear, and actions by regional proxies (e.g., Hezbollah) could undermine the fragile truce."
    ]
  },
  scoreTrend: [
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44,
      active: true
    }
  ],
  investmentSignal: "→ Increase exposure to risk assets; consider partially reducing energy and geopolitical hedge positions as market risk appetite significantly recovers.",
  prevRiskScore: 52,
  keyChange: "24h: See events and factors.",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price June 15 2026",
    "US Iran relations latest news",
    "Strait of Hormuz maritime security status June 2026",
    "Iran nuclear talks update"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.96 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 44（↓8）：24h要点：详见事件与因子。",
    bannerWarning: "→ 增持风险资产，前期部署的能源与地缘对冲仓位可考虑部分减持，市场风险偏好显著修复。",
    deescalationIntent: "伊朗寻求解除制裁与获得安全保证，而美国及其盟友则要求严格限制伊朗核能力与地区影响力，这一根本矛盾在谈判中依然存在。",
    structuralRisk: "协议重开航道但细节待定",
    contradictionNote: "伊朗寻求解除制裁与获得安全保证，而美国及其盟友则要求严格限制伊朗核能力与地区影响力，这一根本矛盾在谈判中依然存在。；停火协议的执行与监督机制尚不明确，区域内代理人武装（如真主党）的行动可能破坏脆弱的停火状态。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第107天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.96 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 44 (↓8): 24h: See events and factors.",
    bannerWarning: "→ Increase exposure to risk assets; consider partially reducing energy and geopolitical hedge positions as market risk …",
    deescalationIntent: "Iran's quest for sanctions relief and security guarantees versus the U.S. and a…",
    structuralRisk: "Deal to reopen strait but details pending",
    contradictionNote: "Iran's quest for sanctions relief and security guarantees versus the U.S. and allied demands for strict limits on Iran's nuclear capabilities and regional infl…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 107",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
