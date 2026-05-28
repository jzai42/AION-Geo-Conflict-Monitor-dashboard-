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
  date: "2026-05-28",
  version: "v2.77",
  keyStats: [
    {
      label: "冲突天数",
      value: "D89",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑24",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $93–$95 · Brent $95–$98",
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
  riskScore: 72,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "美军确认对伊朗无人机及地面控制站进行了“有限打击”，标志着直接军事对抗的重现。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 2,
      weight: 0.2,
      description: "美国封锁与伊朗管制持续，通行量远低于50%，且新的军事事件显著增加了航行风险。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "布伦特原油在95-98美元区间波动，地缘政治紧张局势升级为油价提供上行动力，市场供应担忧加剧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美国直接参与针对伊朗目标的作战行动，超越了援助和情报共享的范畴，标志着介入程度加深。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 2,
      weight: 0.2,
      description: "双方立场公开强硬化，军事摩擦再起，谈判已陷入停滞且破裂风险高企。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt_01",
      title: "美军在霍尔木兹海峡附近实施“防御性打击”，击落四架伊朗无人机",
      description: "美国中央司令部（CENTCOM）确认，美军于5月27日采取了“防御性”军事行动，击落了四架被认为对美军及商业航运构成威胁的伊朗攻击型无人机，并打击了一个准备发射第五架无人机的地面控制站。伊朗方面谴责此举为对停火的侵犯。 (Sources: Associated Press, Reuters, Fox News)",
      verification: "confirmed",
      timestamp: "2026-05-27T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_02",
      title: "谈判信号恶化，美伊双方言辞趋于强硬",
      description: "美国总统特朗普表示对谈判进展“不满意”，称伊朗在“靠着余烬谈判”。同时，伊朗议会国家安全委员会负责人明确了伊方在铀浓缩权利和霍尔木兹海峡控制权等问题上的“红线”。 (Sources: Fox News, AP)",
      verification: "confirmed",
      timestamp: "2026-05-27T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_03",
      title: "美国财政部制裁伊朗新成立的“波斯湾海峡管理局”",
      description: "美国财政部对伊朗近期成立的“波斯湾海峡管理局”实施制裁。美方官员称，该机构旨在管理和规范霍尔木兹海峡的通行，包括向过往船只收取通行费。 (Sources: U.S. Department of the Treasury, Fox News)",
      verification: "partial",
      timestamp: "2026-05-27T18:00:00Z",
      significance: ""
    },
    {
      id: "evt_04",
      title: "油价因地缘政治紧张局势再起而回升",
      description: "在美伊军事摩擦和谈判前景恶化的双重影响下，国际油价扭转了此前因预期达成协议而产生的跌势。布伦特原油期货价格回升至每桶98美元附近，市场避险情绪升温。 (Sources: Trading Economics, Forbes)",
      verification: "confirmed",
      timestamp: "2026-05-28T04:00:00Z",
      significance: ""
    },
    {
      id: "evt_05",
      title: "霍尔木兹海峡航运持续严重受限，通行量远低于战前水平",
      description: "尽管存在零星协调通行，霍尔木兹海峡的商业航运总量仍处于极低水平。美国的封锁行动与伊朗的通行管制并行，导致大量船只滞留在波斯湾内外，航运风险居高不下。 (Sources: CSIS, UANI)",
      verification: "confirmed",
      timestamp: "2026-05-27T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方从脆弱的谈判姿态重回直接军事试探，风险螺旋上升。",
      "近期的降级努力已被新的军事对抗所取代，局势不确定性大幅增加。",
      "双方正在重新评估对方的底线，短期内爆发更大规模冲突的可能性增加。"
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
        "变化：美军确认对伊朗无人机及地面控制站进行了“有限打击”，标志着直接军事对抗的重现。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国封锁与伊朗管制持续，通行量远低于50%，且新的军事事件显著增加了航行风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油在95-98美元区间波动，地缘政治紧张局势升级为油价提供上行动力，市场供应担忧加剧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国直接参与针对伊朗目标的作战行动，超越了援助和情报共享的范畴，标志着介入程度加深。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限施压达成一份限制伊朗核能力与地区影响力的协议，但伊朗坚持其“红线”不动摇。",
      "双方都在利用军事和经济手段为谈判争取筹码，导致局势在“谈”与“打”之间剧烈摇摆。"
    ],
    military: [
      "美国试图通过精确的“防御性打击”来慑止伊朗的军事活动，同时避免局势失控。",
      "伊朗则通过非对称手段（如无人机、代理人）持续挑战美国及其盟友在中东的军事存在。"
    ]
  },
  scoreTrend: [
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72,
      active: true
    }
  ],
  keyChange: "美伊之间脆弱的停火被美军的“防御性打击”打破，谈判前景急剧恶化，导致地缘风险评估从缓和预期逆转为危机升级。",
  investmentSignal: "→ 增持防御性资产与能源对冲，减持区域风险敞口。",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price May 28 2026 Reuters Bloomberg",
    "US Iran news May 27-28 2026",
    "Strait of Hormuz maritime security update",
    "Iran nuclear deal negotiations latest news",
    "CENTCOM operations Middle East May 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-28",
  version: "v2.77",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D89",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑24",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $93–$95 · Brent $95–$98",
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
  riskScore: 72,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "The U.S. confirmed 'limited strikes' against Iranian drones and a ground control station, marking a return to direct military confrontation.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 2,
      weight: 0.2,
      description: "The U.S. blockade and Iranian controls persist, with traffic volume well below 50% and new military incidents significantly increasing transit risk.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent crude fluctuates in the $95-98 range, with escalating geopolitical tensions providing upward momentum and fueling supply concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "The U.S. is directly participating in combat operations against Iranian targets, an escalation beyond aid and intelligence sharing.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 2,
      weight: 0.2,
      description: "Public stances from both sides have hardened, military friction has resumed, and negotiations have stalled with a high risk of collapse.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt_01",
      title: "US conducts 'defensive strikes' near Strait of Hormuz, downing four Iranian drones",
      description: "U.S. Central Command (CENTCOM) confirmed it took 'defensive' military action on May 27, shooting down four Iranian attack drones deemed a threat to U.S. forces and commercial shipping, and struck a ground control station preparing to launch a fifth. Iran condemned the act as a violation of the ceasefire. (Sources: Associated Press, Reuters, Fox News)",
      verification: "confirmed",
      timestamp: "2026-05-27T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_02",
      title: "Negotiation signals worsen as both US and Iran adopt harder rhetoric",
      description: "U.S. President Trump stated he is 'not satisfied' with negotiation progress, claiming Iran is 'negotiating on fumes.' Concurrently, the head of Iran's parliamentary national security committee outlined 'red lines' on issues including uranium enrichment rights and control of the Strait of Hormuz. (Sources: Fox News, AP)",
      verification: "confirmed",
      timestamp: "2026-05-27T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_03",
      title: "U.S. Treasury sanctions Iran's newly formed 'Persian Gulf Strait Authority'",
      description: "The U.S. Treasury Department imposed sanctions on the recently established 'Persian Gulf Strait Authority.' U.S. officials stated the body was created to manage and regulate passage through the Strait of Hormuz, including collecting tolls from transiting vessels. (Sources: U.S. Department of the Treasury, Fox News)",
      verification: "partial",
      timestamp: "2026-05-27T18:00:00Z",
      significance: ""
    },
    {
      id: "evt_04",
      title: "Oil prices rebound on renewed geopolitical tensions",
      description: "Driven by the dual impact of U.S.-Iran military friction and deteriorating negotiation prospects, international oil prices reversed earlier declines that were based on deal expectations. Brent crude futures climbed back towards $98 per barrel as market risk aversion increased. (Sources: Trading Economics, Forbes)",
      verification: "confirmed",
      timestamp: "2026-05-28T04:00:00Z",
      significance: ""
    },
    {
      id: "evt_05",
      title: "Hormuz shipping remains severely restricted with traffic far below pre-war levels",
      description: "Despite sporadic coordinated transits, overall commercial shipping volume through the Strait of Hormuz remains at extremely low levels. The parallel U.S. blockade and Iranian passage controls have left numerous vessels stranded inside and outside the Persian Gulf, with shipping risks remaining high. (Sources: CSIS, UANI)",
      verification: "confirmed",
      timestamp: "2026-05-27T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The U.S. and Iran have reverted from a fragile negotiating posture to direct military probing, leading to a spiraling of risk.",
      "Recent de-escalation efforts have been superseded by renewed military confrontation, significantly increasing uncertainty.",
      "Both sides are reassessing each other's red lines, increasing the probability of a larger-scale conflict in the short term."
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
        "Change: confirmed 'limited strikes' against Iranian drones and a ground control station, marking a return to direct military confrontation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: blockade and Iranian controls persist, with traffic volume well below 50% and new military incidents significantly increasing transit risk."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude fluctuates in the $95-98 range, with escalating geopolitical tensions providing upward momentum and fueling supply concerns."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: is directly participating in combat operations against Iranian targets, an escalation beyond aid and intelligence sharing."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks an agreement limiting Iran's nuclear capabilities and regional influence via maximum pressure, but Iran remains firm on its 'red lines.'",
      "Both sides are leveraging military and economic tools to gain negotiating leverage, causing the situation to oscillate violently between 'talk' and 'fight'."
    ],
    military: [
      "The U.S. is attempting to deter Iranian military activities through precise 'defensive strikes' while avoiding an uncontrolled escalation.",
      "Iran continues to challenge the U.S. and its allies' military presence in the Middle East through asymmetric means (e.g., drones, proxies)."
    ]
  },
  scoreTrend: [
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72,
      active: true
    }
  ],
  keyChange: "The fragile ceasefire between the U.S. and Iran was broken by American 'defensive strikes,' causing a sharp deterioration in negotiation prospects and reversing the geopolitical risk assessment from an easing outlook back to one of escalating crisis.",
  investmentSignal: "→ Increase holdings in defensive assets and energy hedges; reduce regional risk exposure.",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price May 28 2026 Reuters Bloomberg",
    "US Iran news May 27-28 2026",
    "Strait of Hormuz maritime security update",
    "Iran nuclear deal negotiations latest news",
    "CENTCOM operations Middle East May 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.77 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑24）：美伊之间脆弱的停火被美军的“防御性打击”打破，谈判前景急剧恶化，导致地缘风险评估从缓和预期逆转为危机升级。",
    bannerWarning: "→ 增持防御性资产与能源对冲，减持区域风险敞口。",
    deescalationIntent: "美国寻求通过极限施压达成一份限制伊朗核能力与地区影响力的协议，但伊朗坚持其“红线”不动摇。",
    structuralRisk: "美国封锁与伊朗管制持续，通行量远低于50%，且新的军事事件显著增加了航行风险。",
    contradictionNote: "美国寻求通过极限施压达成一份限制伊朗核能力与地区影响力的协议，但伊朗坚持其“红线”不动摇。；美国试图通过精确的“防御性打击”来慑止伊朗的军事活动，同时避免局势失控。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第89天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.77 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑24): The fragile ceasefire between the U.S. and Iran was broken by American 'defensive strikes,' causing a sharp deterioration in negotiation pr…",
    bannerWarning: "→ Increase holdings in defensive assets and energy hedges; reduce regional risk exposure.",
    deescalationIntent: "The U.S. seeks an agreement limiting Iran's nuclear capabilities and regional i…",
    structuralRisk: "The U.S. blockade and Iranian controls persist, with traffic volume well below 50% and new military…",
    contradictionNote: "The U.S. seeks an agreement limiting Iran's nuclear capabilities and regional influence via maximum pressure, but Iran remains firm on its 'red lines.'; The U.…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 89",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
