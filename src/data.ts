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
  date: "2026-05-24",
  version: "v2.74",
  keyStats: [
    {
      label: "冲突天数",
      value: "D85",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓12",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $96–$98 · Brent $103–$107",
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
  riskScore: 52,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "双方维持高度军事戒备，代理人冲突偶发，但美伊之间没有新的直接军事对抗。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "海峡通行仍受严重限制，但重开海峡已成为美伊临时协议的核心议题，显著降低了封锁升级的风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价因谈判取得突破性进展的预期而承压，但由于协议尚未签署且海峡仍处关闭状态，价格维持在显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国通过外交谈判和维持军事封锁深度介入，但未采取新的直接作战行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 4,
      weight: 0.2,
      description: "谈判取得重大突破，双方接近达成一份为期60天的临时协议，显著改善了降级前景。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "e20260524-1",
      title: "美伊接近达成60天停火协议，涉及重开霍尔木兹海峡",
      description: "多家独立媒体报道，引述美国官员消息称，美伊接近签署一份谅解备忘录，内容包括60天停火、重开霍尔木兹海峡、伊朗获准出售石油，以及在此期间就核问题进行谈判。美国总统特朗普称协议已“基本谈妥”。 (Sources: Axios, CBS News, Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-05-24T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "e20260524-2",
      title: "伊朗对协议条款表态谨慎，称霍尔木兹海峡主权不变",
      description: "伊朗官方及半官方媒体回应称，即便达成协议，霍尔木兹海峡也将继续处于伊朗的“主权管理”之下，不会恢复到战前“自由通行”的状态，但承认通行船只数量可在30天内恢复至战前水平。一名伊朗高级信源否认已同意移交其高浓缩铀库存。 (Sources: Mehr News Agency, Reuters)",
      verification: "confirmed",
      timestamp: "2026-05-24T10:30:00Z",
      significance: ""
    },
    {
      id: "e20260524-3",
      title: "油价因潜在协议前景而承压，但仍处高位",
      description: "尽管地缘政治紧张局势存在，但美伊可能达成协议的消息导致油价在本周小幅回落。市场分析认为，协议将缓解部分供应担忧。目前布伦特原油交易价格区间约为103-107美元/桶，WTI原油约为96-98美元/桶，显示市场仍在消化不确定性。 (Sources: Trading Economics, Forbes, TheStreet)",
      verification: "confirmed",
      timestamp: "2026-05-24T06:00:00Z",
      significance: ""
    },
    {
      id: "e20260524-4",
      title: "以色列官员对美伊潜在协议表示担忧",
      description: "据报道，一名未具名的以色列高级官员称正在形成的协议是“坏的”，认为这向德黑兰表明，它能够有效地将霍尔木兹海峡武器化，其效力不亚于核武器。以色列总理内塔尼亚胡据称也向美方表达了对协议将核问题谈判推迟的关切。 (Sources: Times of Israel, Channel 12)",
      verification: "single",
      timestamp: "2026-05-24T09:00:00Z",
      significance: ""
    },
    {
      id: "e20260524-5",
      title: "区域军事态势维持紧张，无新增直接冲突",
      description: "公开信息显示，过去24小时内美伊之间没有新的直接军事交火事件。双方军事力量继续维持高度戒备的前沿部署态势，但行动重点已转向外交层面。 (Sources: 公开数据不足以确认具体行动)",
      verification: "partial",
      timestamp: "2026-05-24T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方从军事对抗转向高强度外交斡旋，寻求达成一份临时性协议以避免冲突全面升级。",
      "协议的核心围绕霍尔木兹海峡的重新开放与对伊朗石油出口的制裁豁免，以换取未来就核问题的谈判。",
      "尽管前景显著改善，但双方在关键条款（如海峡主权、核查范围）上的分歧仍可能导致谈判破裂，使局势重回紧张。"
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
        "延续：双方军事力量维持前沿部署和高度戒备，但无直接交火报告。",
        "延续：区域内代理人武装（如真主党）与以色列的冲突仍在继续，构成潜在的溢出风险。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：重开霍尔木兹海峡已成为谈判的核心议题，双方均释放出通行量有望恢复的信号。",
        "延续：海峡目前仍处于伊朗的严格管控之下，商业航运流量依然极低。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对达成协议的预期给油价带来下行压力，风险溢价开始收缩。",
        "延续：由于协议尚未签署，且全球石油库存处于低位，油价依然维持在100美元/桶附近的高位区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国总统特朗普公开表示协议“基本谈妥”，释放出强烈的乐观信号，旨在推动达成协议。",
        "变化：伊朗方面通过官方媒体谨慎回应，强调其在霍尔木兹海峡主权等核心利益上的立场，试图管理国内预期并增加谈判筹码。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过一份临时协议，在选举年到来前迅速降低油价并避免陷入更大规模的战争，同时将棘手的核问题推迟处理。",
      "伊朗试图利用其对霍尔木兹海峡的控制权作为杠杆，换取经济制裁的解除和对其区域影响力的默认，同时避免在核计划上做出实质性让步。"
    ],
    military: [
      "美军通过持续的军事封锁和威慑，为外交谈判创造压力和筹码。",
      "伊朗及其代理人网络通过展示其扰乱区域安全的能力，以确保其在谈判桌上的地位，并威慑任何潜在的军事打击。"
    ]
  },
  scoreTrend: [
    {
      date: "05-20",
      score: 76
    },
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52,
      active: true
    }
  ],
  keyChange: "谈判前景因子从4（停滞）大幅改善至2（实质性进展），主要基于多方已证实的美伊接近达成60天临时协议的报道，导致综合风险评分显著下降。",
  investmentSignal: "→ 鉴于短期冲突风险显著下降，可考虑逐步减持部分能源对冲头寸，并适度增加对风险资产的敞口，但需警惕谈判细节破裂的风险。",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price May 24 2026",
    "US Iran tensions latest news May 23-24 2026",
    "Strait of Hormuz shipping status May 24 2026",
    "Iran nuclear talks update May 2026",
    "US military posture Middle East May 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-24",
  version: "v2.74",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D85",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓12",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $96–$98 · Brent $103–$107",
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
  riskScore: 52,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Both sides maintain high military alert and sporadic proxy conflicts continue, but there is no new direct military confrontation between the US and Iran.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Passage through the strait remains severely restricted, but the reopening of the strait has become a central issue in the prospective US-Iran interim agreement, significantly reducing the risk of an escalation of the blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices are under pressure from the prospect of a breakthrough in negotiations, but remain in a significantly strong range as no deal has been signed and the strait remains closed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The United States is deeply involved through diplomatic negotiations and maintaining a military blockade, but has not taken new direct combat actions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 4,
      weight: 0.2,
      description: "Negotiations have made a major breakthrough, with both sides nearing a 60-day interim agreement, significantly improving de-escalation prospects.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "e20260524-1",
      title: "US and Iran close to a 60-day ceasefire deal involving reopening of Strait of Hormuz",
      description: "Multiple independent media outlets, citing US officials, report that the US and Iran are close to signing a memorandum of understanding for a 60-day ceasefire, the reopening of the Strait of Hormuz, allowing Iran to sell oil, and negotiations on the nuclear issue during this period. US President Trump stated the deal is 'largely negotiated.' (Sources: Axios, CBS News, Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-05-24T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "e20260524-2",
      title: "Iran expresses caution on deal terms, claims sovereignty over Strait of Hormuz will remain",
      description: "Iranian official and semi-official media responded that even if a deal is reached, the Strait of Hormuz will remain under Iran's 'sovereign management' and will not return to the pre-war 'free passage' status, though they acknowledged transit volume could return to pre-war levels within 30 days. A senior Iranian source denied agreeing to ship out its highly enriched uranium stockpile. (Sources: Mehr News Agency, Reuters)",
      verification: "confirmed",
      timestamp: "2026-05-24T10:30:00Z",
      significance: ""
    },
    {
      id: "e20260524-3",
      title: "Oil prices under pressure from potential deal but remain elevated",
      description: "Despite ongoing geopolitical tensions, news of a possible US-Iran deal has led to a slight pullback in oil prices this week. Market analysis suggests a deal would ease some supply concerns. Brent crude is currently trading in a range of approximately $103-$107/bbl, with WTI around $96-$98/bbl, indicating the market is still pricing in uncertainty. (Sources: Trading Economics, Forbes, TheStreet)",
      verification: "confirmed",
      timestamp: "2026-05-24T06:00:00Z",
      significance: ""
    },
    {
      id: "e20260524-4",
      title: "Israeli officials express concern over potential US-Iran deal",
      description: "An unnamed senior Israeli official reportedly called the emerging agreement 'bad,' arguing it shows Tehran that it can effectively weaponize the Strait of Hormuz, which is no less effective than a nuclear weapon. Israeli PM Netanyahu has also allegedly expressed concerns to the US about the deal's postponement of nuclear talks. (Sources: Times of Israel, Channel 12)",
      verification: "single",
      timestamp: "2026-05-24T09:00:00Z",
      significance: ""
    },
    {
      id: "e20260524-5",
      title: "Regional military posture remains tense with no new direct clashes",
      description: "Open-source information indicates no new direct military engagements between the US and Iran in the last 24 hours. Both forces continue to maintain a high-alert, forward-deployed posture, but the focus of actions has shifted to the diplomatic sphere. (Sources: Insufficient public data to confirm specific actions)",
      verification: "partial",
      timestamp: "2026-05-24T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict parties have shifted from high-pressure military standoff to intense diplomatic maneuvering, seeking an interim agreement to avert a full-scale conflict.",
      "The core of the agreement revolves around the reopening of the Strait of Hormuz and sanctions waivers for Iranian oil exports in exchange for future negotiations on the nuclear issue.",
      "Despite the significantly improved outlook, disagreements on key terms (such as sovereignty over the strait and verification scope) could still cause talks to collapse, returning the situation to high tension."
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
        "Continue: Both sides maintain forward deployments and high alert levels, but with no reports of direct engagement.",
        "Continue: Conflicts involving regional proxies (like Hezbollah) and Israel are ongoing, posing a potential spillover risk."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Reopening the Strait of Hormuz has become a central topic of negotiation, with both sides signaling that traffic volume could be restored.",
        "Continue: The strait currently remains under strict Iranian control, with commercial shipping traffic still extremely low."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Expectations of a deal are putting downward pressure on oil prices, and the risk premium is beginning to contract.",
        "Continue: As a deal is not yet signed and global oil inventories are low, prices remain elevated in the high range around $100/barrel."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US President Trump has publicly stated a deal is 'largely negotiated,' sending a strong optimistic signal to push for an agreement.",
        "Change: Iran has responded cautiously through official media, emphasizing its stance on core interests like sovereignty over the Strait of Hormuz to manage dom…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US seeks a temporary deal to quickly lower oil prices and avoid a larger war ahead of an election year, while postponing the thorny nuclear issue.",
      "Iran aims to leverage its control over the Strait of Hormuz to gain relief from economic sanctions and a tacit acceptance of its regional influence, while avoiding substantive concessions on its nuclear program."
    ],
    military: [
      "The US military uses a continued blockade and deterrence posture to create pressure and leverage for diplomatic negotiations.",
      "Iran and its proxy network demonstrate their ability to disrupt regional security to secure their position at the negotiating table and deter any potential military strikes."
    ]
  },
  scoreTrend: [
    {
      date: "05-20",
      score: 76
    },
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52,
      active: true
    }
  ],
  keyChange: "The 'De-escalation/Negotiation Prospects' factor improved dramatically from 4 (Stalled) to 2 (Substantive Progress), based on confirmed, multi-source reports of the US and Iran nearing a 60-day interim deal, leading to a significant drop in the composite risk score.",
  investmentSignal: "→ Given the significant decline in short-term conflict risk, consider gradually reducing some energy hedging positions and moderately increasing exposure to risk assets, while remaining vigilant to the risk of a breakdown in negotiation details.",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price May 24 2026",
    "US Iran tensions latest news May 23-24 2026",
    "Strait of Hormuz shipping status May 24 2026",
    "Iran nuclear talks update May 2026",
    "US military posture Middle East May 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.74 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 52（↓12）：谈判前景因子从4（停滞）大幅改善至2（实质性进展），主要基于多方已证实的美伊接近达成60天临时协议的报道，导致综合风险评分显著下降。",
    bannerWarning: "→ 鉴于短期冲突风险显著下降，可考虑逐步减持部分能源对冲头寸，并适度增加对风险资产的敞口，但需警惕谈判细节破裂的风险。",
    deescalationIntent: "美国寻求通过一份临时协议，在选举年到来前迅速降低油价并避免陷入更大规模的战争，同时将棘手的核问题推迟处理。",
    structuralRisk: "海峡通行仍受严重限制，但重开海峡已成为美伊临时协议的核心议题，显著降低了封锁升级的风险。",
    contradictionNote: "美国寻求通过一份临时协议，在选举年到来前迅速降低油价并避免陷入更大规模的战争，同时将棘手的核问题推迟处理。；美军通过持续的军事封锁和威慑，为外交谈判创造压力和筹码。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第85天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.74 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 52 (↓12): The 'De-escalation/Negotiation Prospects' factor improved dramatically from 4 (Stalled) to 2 (Substantive Progress), based on confirmed, mu…",
    bannerWarning: "→ Given the significant decline in short-term conflict risk, consider gradually reducing some energy hedging positions …",
    deescalationIntent: "The US seeks a temporary deal to quickly lower oil prices and avoid a larger wa…",
    structuralRisk: "Passage through the strait remains severely restricted, but the reopening of the strait has become …",
    contradictionNote: "The US seeks a temporary deal to quickly lower oil prices and avoid a larger war ahead of an election year, while postponing the thorny nuclear issue.; The US …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 85",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
