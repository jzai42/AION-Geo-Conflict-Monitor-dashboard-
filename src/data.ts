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
  date: "2026-07-30",
  version: "v2.141",
  keyStats: [
    {
      label: "冲突天数",
      value: "D152",
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
      value: "WTI $83–$85 · Brent $87–$90",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在伊朗发动大规模报复性空袭，且沙特首次公开参与对伊朗代理人的联合打击，标志着直接军事对抗的持续与扩大。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航运量虽有极小幅回升，但仍远低于正常水平。美军对伊朗港口的封锁及护航行动并存，整体通行状况依然严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "国际油价在地缘政治风险和库存下降的支撑下保持高位。布伦特原油在$87-90区间，WTI在$83-85区间，市场对供应中断的担忧情绪浓厚。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国直接参与对伊朗本土的军事打击，并与区域盟友沙特阿拉伯开展联合军事行动，军事部署与作战参与程度深。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "随着新一轮直接军事对抗的展开，外交渠道完全关闭。伊朗官方否认近期有任何谈判意向，双方立场极端强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260730-1",
      title: "美国对伊朗境内发动大规模报复性空袭",
      description: "美国中央司令部（CENTCOM）确认，为回应伊朗此前向美军基地发射弹道导弹的攻击，美军于 7 月 29 日晚间对伊朗境内的数十个伊斯兰革命卫队（IRGC）目标发动了“猛烈”空袭。打击目标包括军事指挥中心、导弹与无人机设施及海军能力。",
      verification: "confirmed",
      timestamp: "2026-07-30T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260730-2",
      title: "沙特阿拉伯首次公开参与对伊朗代理人的联合打击",
      description: "美国与沙特阿拉伯军方首次对伊拉克境内的伊朗支持的武装组织目标进行了联合打击。此举标志着沙特从防御姿态转向公开参与针对伊朗代理人的军事行动，显著扩大了冲突的参与方。",
      verification: "confirmed",
      timestamp: "2026-07-29T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260730-3",
      title: "霍尔木兹海峡航运活动在军事护航下微量恢复",
      description: "尽管军事对峙持续，但在美军护航下，霍尔木兹海峡的商业航运活动出现小幅回升迹象。数据显示，周三有 14 艘商船通过，一艘卡塔尔液化天然气（LNG）船三周来首次离港。但总体流量仍远低于正常水平。",
      verification: "confirmed",
      timestamp: "2026-07-30T04:30:00Z",
      significance: ""
    },
    {
      id: "evt-20260730-4",
      title: "伊朗称无意重启外交谈判，局势降级渠道关闭",
      description: "在新一轮军事交火之际，伊朗副外长表示，过去两周内德黑兰方面未提出任何重启外交谈判的请求。美国总统特朗普亦发表强硬言论，表明双方目前均无意通过对话解决危机。",
      verification: "partial",
      timestamp: "2026-07-29T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260730-5",
      title: "油价在高位区间整理，市场消化新一轮冲突升级",
      description: "在美伊恢复直接军事对抗后，国际油价保持坚挺。多个信源报价显示，布伦特原油在 87-90 美元/桶区间波动，WTI 则在 83-85 美元/桶附近。市场正评估新一轮打击对供应的实际影响。",
      verification: "confirmed",
      timestamp: "2026-07-30T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方已恢复直接、大规模的军事打击，突破了仅限于代理人战争的界限。",
      "冲突参与方扩大，沙特阿拉伯等地区大国公开加入军事行动，增加了局势的复杂性和不可预测性。",
      "外交途径完全中断，双方均表现出继续使用武力解决问题的意图，短期内无降级可能。"
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
        "变化：美军在伊朗发动大规模报复性空袭，且沙特首次公开参与对伊朗代理人的联合打击，标志着直接军事对抗的持续与扩大。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：航运量虽有极小幅回升，但仍远低于正常水平。",
        "变化：美军对伊朗港口的封锁及护航行动并存，整体通行状况依然严重受限。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：国际油价在地缘政治风险和库存下降的支撑下保持高位。",
        "变化：布伦特原油在$87-90区间，WTI在$83-85区间，市场对供应中断的担忧情绪浓厚。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国直接参与对伊朗本土的军事打击，并与区域盟友沙特阿拉伯开展联合军事行动，军事部署与作战参与程度深。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“极限压力”和军事打击迫使伊朗屈服，而伊朗则力图通过展示其军事报复能力和地区影响力来抵抗并谋求对等地位，双方缺乏信任和共同的谈判基础。",
      "区域大国（如沙特、以色列）的深度介入，使得美伊冲突与更广泛的地区霸权争夺和教派冲突交织，调解难度极大。"
    ],
    military: [
      "美国拥有绝对的常规军事优势，能够对伊朗本土进行精确打击；而伊朗则利用其弹道导弹、无人机和代理人网络，在中东地区对美国及其盟友构成非对称威胁。"
    ]
  },
  scoreTrend: [
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80,
      active: true
    }
  ],
  keyChange: "美伊恢复直接军事对抗并扩大到沙特参与，风险重回高位",
  investmentSignal: "→ 维持对能源板块的风险敞口，同时增持防御性资产以对冲地缘政治尾部风险的突然加剧。",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions latest news 24 hours",
    "Iran military activity last 24h",
    "Strait of Hormuz shipping status July 30 2026",
    "US military deployment Middle East July 2026",
    "Iran nuclear talks update",
    "WTI Brent crude oil price range trend July 30 2026 Reuters Bloomberg",
    "oil price forecast July 2026 middle east tension"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-30",
  version: "v2.141",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D152",
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
      value: "WTI $83–$85 · Brent $87–$90",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. launched large-scale retaliatory airstrikes in Iran, and Saudi Arabia publicly participated in joint strikes against Iranian proxies for the first time, marking a continuation and expansion of direct military confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Although shipping volumes have seen a very slight recovery, they remain far below normal levels. The U.S. blockade of Iranian ports coexists with escorted transits, and overall passage remains severely restricted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Global oil prices remain elevated, supported by geopolitical risk and declining inventories. Brent crude is in the $87-90 range and WTI is around $83-85, with strong market sentiment on supply disruption concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. is directly involved in military strikes on Iranian territory and is conducting joint military operations with regional ally Saudi Arabia, demonstrating a deep level of military deployment and combat participation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "With the resumption of direct military confrontation, diplomatic channels are completely closed. Iranian officials deny any recent intention to negotiate, and both sides hold extremely hardline positions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260730-1",
      title: "U.S. Launches Large-Scale Retaliatory Airstrikes Inside Iran",
      description: "U.S. Central Command (CENTCOM) confirmed that in response to a prior Iranian ballistic missile attack on U.S. forces, it conducted a 'heavy wave' of strikes on the evening of July 29 against dozens of Islamic Revolutionary Guard Corps (IRGC) targets inside Iran. Targets included military command centers, missile and drone facilities, and maritime capabilities.",
      verification: "confirmed",
      timestamp: "2026-07-30T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260730-2",
      title: "Saudi Arabia Publicly Joins First-Ever Joint Strikes on Iranian Proxies",
      description: "For the first time, the U.S. and Saudi Arabian militaries conducted joint strikes against targets of Iran-backed militant groups in Iraq. The move marks a significant shift from a defensive posture by Riyadh to overt participation in military action against Iranian proxies, widening the conflict's scope of actors.",
      verification: "confirmed",
      timestamp: "2026-07-29T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260730-3",
      title: "Hormuz Shipping Shows Slight Recovery Under Military Escort",
      description: "Despite the ongoing military standoff, commercial shipping activity in the Strait of Hormuz has shown minor signs of revival under U.S. military escort. Data indicated 14 commercial vessels transited on Wednesday, and a Qatari LNG tanker departed for the first time in three weeks. Overall traffic remains far below normal levels.",
      verification: "confirmed",
      timestamp: "2026-07-30T04:30:00Z",
      significance: ""
    },
    {
      id: "evt-20260730-4",
      title: "Iran Signals No Intention to Restart Diplomatic Talks, Closing De-escalation Channels",
      description: "Amid the new round of military exchanges, Iran's deputy foreign minister stated that Tehran has not made any requests to restart diplomatic talks in the past two weeks. U.S. President Trump also made hawkish remarks, indicating neither side currently intends to resolve the crisis through dialogue.",
      verification: "partial",
      timestamp: "2026-07-29T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260730-5",
      title: "Oil Prices Consolidate at High Levels as Market Digests Renewed Escalation",
      description: "Following the resumption of direct U.S.-Iran military confrontation, international oil prices remain firm. Multiple sources show Brent crude fluctuating in the $87-90 per barrel range, with WTI near $83-85 per barrel, as the market assesses the real impact of the latest strikes on supply.",
      verification: "confirmed",
      timestamp: "2026-07-30T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The U.S. and Iran have resumed direct, large-scale military strikes, moving beyond the confines of proxy warfare.",
      "The conflict has expanded to include more participants, with regional powers like Saudi Arabia openly joining military operations, increasing complexity and unpredictability.",
      "Diplomatic channels are completely severed, with both sides demonstrating intent to continue using force, making short-term de-escalation impossible."
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
        "Change: The U.S.",
        "Change: launched large-scale retaliatory airstrikes in Iran, and Saudi Arabia publicly participated in joint strikes against Iranian proxies for the first time…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Although shipping volumes have seen a very slight recovery, they remain far below normal levels.",
        "Change: The U.S.",
        "Change: blockade of Iranian ports coexists with escorted transits, and overall passage remains severely restricted."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Global oil prices remain elevated, supported by geopolitical risk and declining inventories.",
        "Change: Brent crude is in the $87-90 range and WTI is around $83-85, with strong market sentiment on supply disruption concerns."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: is directly involved in military strikes on Iranian territory and is conducting joint military operations with regional ally Saudi Arabia, demonstratin…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iranian capitulation through 'maximum pressure' and military strikes, while Iran aims to resist and achieve peer status by demonstrating its military retaliatory capabilities and regional influence, with a mutual lack of trust and common ground for negotiation.",
      "The deep involvement of regional powers (e.g., Saudi Arabia, Israel) intertwines the U.S.-Iran conflict with broader regional hegemonic struggles and sectarian conflicts, making mediation extremely difficult."
    ],
    military: [
      "The U.S. possesses absolute conventional military superiority, enabling precision strikes on Iranian territory; Iran leverages its ballistic missiles, drones, and proxy networks to pose an asymmetric threat to the U.S. and its allies across the Middle East."
    ]
  },
  scoreTrend: [
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80,
      active: true
    }
  ],
  keyChange: "Risk returns to a high level as U.S. and Iran resume direct military confrontation, with Saudi Arabia now also participating.",
  investmentSignal: "→ Maintain risk exposure to the energy sector while increasing holdings in defensive assets to hedge against a sudden escalation of geopolitical tail risks.",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions latest news 24 hours",
    "Iran military activity last 24h",
    "Strait of Hormuz shipping status July 30 2026",
    "US military deployment Middle East July 2026",
    "Iran nuclear talks update",
    "WTI Brent crude oil price range trend July 30 2026 Reuters Bloomberg",
    "oil price forecast July 2026 middle east tension"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.141 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美伊恢复直接军事对抗并扩大到沙特参与，风险重回高位",
    bannerWarning: "→ 维持对能源板块的风险敞口，同时增持防御性资产以对冲地缘政治尾部风险的突然加剧。",
    deescalationIntent: "美国试图通过“极限压力”和军事打击迫使伊朗屈服，而伊朗则力图通过展示其军事报复能力和地区影响力来抵抗并谋求对等地位，双方缺乏信任和共同的谈判基础。",
    structuralRisk: "航运量虽有极小幅回升，但仍远低于正常水平。美军对伊朗港口的封锁及护航行动并存，整体通行状况依然严重受限。",
    contradictionNote: "美国试图通过“极限压力”和军事打击迫使伊朗屈服，而伊朗则力图通过展示其军事报复能力和地区影响力来抵抗并谋求对等地位，双方缺乏信任和共同的谈判基础。；美国拥有绝对的常规军事优势，能够对伊朗本土进行精确打击；而伊朗则利用其弹道导弹、无人机和代理人网络，在中东地区对美国及其盟友构成非对称威胁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第152天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.141 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Risk returns to a high level as U.S. and Iran resume direct military confrontation, with Saudi Arabia now also participating.",
    bannerWarning: "→ Maintain risk exposure to the energy sector while increasing holdings in defensive assets to hedge against a sudden e…",
    deescalationIntent: "The U.S. seeks to compel Iranian capitulation through 'maximum pressure' and mi…",
    structuralRisk: "Although shipping volumes have seen a very slight recovery, they remain far below normal levels. Th…",
    contradictionNote: "The U.S. seeks to compel Iranian capitulation through 'maximum pressure' and military strikes, while Iran aims to resist and achieve peer status by demonstrati…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 152",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
