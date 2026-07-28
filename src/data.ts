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
  date: "2026-07-28",
  version: "v2.139",
  keyStats: [
    {
      label: "冲突天数",
      value: "D150",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓14",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $81–$84 · Brent $86–$90",
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
  riskScore: 70,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美伊直接军事打击已暂停，但代理人活动仍在继续，冲突烈度显著下降。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "航道通行处于严重受限状态，但并非完全封锁，有极少量船只通过。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "美伊紧张局势缓和，推动油价显著回落，风险溢价收缩。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国在区域内的前沿军事部署未见减少，维持直接威慑态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "伊朗首次确认通过阿曼进行间接谈判，打破了此前“完全无对话”的僵局。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-20260728-1",
      title: "美伊直接军事打击暂停进入第三日，外交斡旋开启窗口期",
      description: "多个独立信源证实，美国与伊朗之间的直接军事打击已暂停2-3天。美国总统特朗普称正与伊朗进行“良好会谈”，并对达成协议持乐观态度，但警告若谈判失败将恢复军事行动。此举为阿曼等国的斡旋创造了空间。(Sources: AP, CBS News, Gulf News)",
      verification: "confirmed",
      timestamp: "2026-07-28T10:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-2",
      title: "霍尔木兹海峡并非完全封锁，极少量航运在严密监视下通行",
      description: "路透社援引 Kpler 航运数据及海事安全公司 Dryad Global 的评估指出，霍尔木兹海峡虽对常规商业航运“实际上关闭”，但并非完全封锁。7月27日仍有6艘商品运输船通过，表明交通处于“严重受限”而非“完全停止”状态，这与此前最高风险评估（5分）的条件不符。(Sources: Reuters, Dryad Global)",
      verification: "confirmed",
      timestamp: "2026-07-28T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-3",
      title: "伊朗确认通过阿曼就霍尔木兹海峡问题进行间接会谈",
      description: "伊朗外交部否认与美国进行任何直接谈判，但首次公开承认，正通过阿曼就旨在重新开放霍尔木兹海峡的“海上交通机制”进行讨论。这标志着一个具体的外交渠道已经建立，打破了此前完全拒绝沟通的僵局。(Sources: CBS News, AFP)",
      verification: "confirmed",
      timestamp: "2026-07-28T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-4",
      title: "油价因地缘紧张局势缓解而承压回落",
      description: "受美伊暂停敌对行动及谈判前景出现的双重影响，市场对原油供应中断的担忧有所缓解，导致油价连续第三个交易日下跌。布伦特原油价格跌至约86.5美元/桶，WTI原油则在81美元附近寻求支撑，风险溢价出现明显回吐。(Sources: Trading Economics, FX Leaders, Reuters)",
      verification: "confirmed",
      timestamp: "2026-07-28T12:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260728-5",
      title: "代理人冲突持续，沙特与约旦拦截来自伊拉克的无人机",
      description: "尽管美伊直接对抗暂停，但地区代理人活动依然活跃。沙特阿拉伯和约旦报告称拦截了从伊拉克境内发射的无人机，沙特将此归咎于伊朗支持的民兵组织。这表明，基础冲突结构依然存在，停火状态十分脆弱。(Sources: AP, CBS News)",
      verification: "confirmed",
      timestamp: "2026-07-28T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方已暂停直接军事打击，进入观察与外交试探阶段。",
      "通过阿曼的间接谈判渠道已被证实，焦点集中于霍尔木兹海峡通行问题。",
      "代理人活动仍在持续，显示深层矛盾未解决，当前停火状态极易被打破。"
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
        "变化：美伊之间持续近两周的直接军事打击已暂停，这是冲突爆发以来的重要降级信号。",
        "延续：伊朗支持的代理人武装（如伊拉克民兵组织）仍在对区域内目标（如沙特）发动无人机攻击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡通行状态从事实上的“完全封锁”降级为“严重受限”，数据显示已有极少量船只通行。",
        "变化：伊朗与阿曼正就建立海上交通机制进行谈判，为恢复正常航运提供了外交解决途径。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于直接冲突风险下降，布伦特和WTI油价均出现显著回调，市场地缘政治风险溢价收窄。",
        "延续：尽管价格回落，但只要霍尔木兹问题未得到根本解决，油市对任何负面消息的敏感度依然很高。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国总统公开表示对谈判前景乐观，为外交解决创造了政治空间。",
        "变化：伊朗方面虽措辞谨慎，但承认间接谈判的存在，标志着其立场从绝对强硬转向有限接触。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求在不全面开战的前提下，通过极限施压与外交手段结合，解决霍尔木兹航道安全与伊核问题。",
      "伊朗试图利用其对霍尔木兹海峡的控制力作为筹码，在不对称对抗中谋求制裁解除和安全保障，同时避免政权生存受到根本威胁。"
    ],
    military: [
      "美军拥有绝对的海空优势和精确打击能力，旨在威慑并惩罚伊朗的升级行为。",
      "伊朗及其代理人网络则利用无人机、导弹和海上非对称战术，威胁美方资产和全球能源大动脉，制造高昂的干预成本。"
    ]
  },
  scoreTrend: [
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊暂停直接军事对抗并开启间接谈判，导致霍尔木兹海峡的“完全封锁”状态有所松动，触发了跨军事、航运和谈判前景三个维度的风险同步降级。",
  investmentSignal: "→ 风险显著降低，但地缘溢价仍存；可考虑逐步减持能源对冲，并适度增加风险资产敞口。",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions latest news July 28 2026",
    "Strait of Hormuz shipping status July 28 2026",
    "Iran nuclear deal talks news July 2026",
    "US military deployment Middle East July 2026",
    "WTI Brent crude oil price range and trend July 28 2026 Reuters Bloomberg",
    "oil price analysis July 28 2026 Financial Times"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-28",
  version: "v2.139",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D150",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓14",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $81–$84 · Brent $86–$90",
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
  riskScore: 70,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Direct US-Iran military strikes have paused, but proxy activities continue, significantly lowering the intensity of the conflict.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "The strait's transit is severely restricted, not fully blockaded, with a very small number of vessels passing through.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "Easing US-Iran tensions have led to a significant pullback in oil prices, contracting the geopolitical risk premium.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The forward deployment of US military assets in the region has not decreased, maintaining a posture of direct deterrence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Iran confirmed for the first time that indirect talks are taking place via Oman, breaking the previous 'no dialogue' stalemate.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-20260728-1",
      title: "US-Iran Direct Military Strikes Pause for Third Day, Opening Window for Diplomacy",
      description: "Multiple independent sources confirm a 2-3 day pause in direct military strikes between the U.S. and Iran. U.S. President Trump mentioned 'good talks' with Iran and optimism for a deal, but warned military action would resume if negotiations fail, creating space for mediation by Oman and others. (Sources: AP, CBS News, Gulf News)",
      verification: "confirmed",
      timestamp: "2026-07-28T10:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-2",
      title: "Strait of Hormuz Not Fully Blockaded; Very Low Volume of Shipping Transits Under Watch",
      description: "Reuters, citing Kpler shipping data and maritime security firm Dryad Global, reports the Strait of Hormuz is 'effectively closed' to normal commercial traffic but not entirely blockaded. Six commodity-carrying vessels reportedly transited on July 27, indicating traffic is 'severely restricted,' not 'completely stopped,' which revises down the previous maximum risk assessment. (Sources: Reuters, Dryad Global)",
      verification: "confirmed",
      timestamp: "2026-07-28T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-3",
      title: "Iran Confirms Indirect Talks via Oman on Strait of Hormuz",
      description: "Iran's Foreign Ministry denied any direct negotiations with the U.S. but publicly acknowledged for the first time that discussions are underway via Oman on 'maritime traffic mechanisms' to reopen the Strait of Hormuz. This marks the establishment of a concrete diplomatic channel, breaking a prior stalemate of no communication. (Sources: CBS News, AFP)",
      verification: "confirmed",
      timestamp: "2026-07-28T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260728-4",
      title: "Oil Prices Fall Under Pressure from Easing Geopolitical Tensions",
      description: "Reacting to the dual impact of the U.S.-Iran pause in hostilities and emerging negotiation prospects, market concerns over supply disruptions have eased, leading to a third consecutive day of falling oil prices. Brent crude dropped to around $86.5/barrel, while WTI sought support near $81, as the risk premium was significantly trimmed. (Sources: Trading Economics, FX Leaders, Reuters)",
      verification: "confirmed",
      timestamp: "2026-07-28T12:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260728-5",
      title: "Proxy Conflict Continues as Saudi Arabia and Jordan Intercept Drones from Iraq",
      description: "Despite the pause in direct US-Iran confrontation, regional proxy activities remain active. Saudi Arabia and Jordan reported intercepting drones launched from within Iraq, with Riyadh blaming Iran-backed militias. This indicates the underlying conflict structure remains intact and the ceasefire is fragile. (Sources: AP, CBS News)",
      verification: "confirmed",
      timestamp: "2026-07-28T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both the U.S. and Iran have paused direct military strikes, entering a phase of observation and diplomatic probing.",
      "An indirect negotiation channel via Oman has been confirmed, focusing on the issue of transit through the Strait of Hormuz.",
      "Proxy activities continue, demonstrating that deep-seated conflicts are unresolved and the current ceasefire could easily be broken."
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
        "Change: The direct military engagement between the US and Iran, which lasted for nearly two weeks, has been paused, a significant de-escalation signal.",
        "Continue: Iran-backed proxy forces (e.g., militias in Iraq) are still launching drone attacks against regional targets like Saudi Arabia."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The strait's status has been downgraded from a de facto 'complete blockade' to 'severely restricted,' with data showing a minimal number of vessels hav…",
        "Change: Iran and Oman are negotiating a maritime traffic mechanism, providing a diplomatic path to restoring normal shipping."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Due to the reduced risk of direct conflict, both Brent and WTI prices have seen a significant correction as the market's geopolitical risk premium narr…",
        "Continue: Despite the price drop, the oil market remains highly sensitive to any negative news as long as the Hormuz issue is not fundamentally resolved."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US President has publicly expressed optimism about negotiation prospects, creating political space for a diplomatic solution.",
        "Change: Iran, though cautious in its wording, has acknowledged the existence of indirect talks, marking a shift from an absolutely hardline stance to limited e…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to resolve the Hormuz passage security and Iranian nuclear issues through a combination of maximum pressure and diplomacy, without resorting to all-out war.",
      "Iran aims to use its control over the Strait of Hormuz as leverage to secure sanctions relief and security guarantees in an asymmetric confrontation, while avoiding existential threats to the regime."
    ],
    military: [
      "The U.S. military possesses overwhelming air and sea superiority and precision-strike capabilities, intended to deter and punish Iranian escalation.",
      "Iran and its proxy network leverage drones, missiles, and asymmetric naval tactics to threaten U.S. assets and the global energy artery, creating high costs for intervention."
    ]
  },
  scoreTrend: [
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "The pause in direct US-Iran military confrontation and the opening of indirect talks have led to an easing of the 'complete blockade' status of the Strait of Hormuz, triggering a simultaneous risk downgrade across the military, shipping, and negotiation dimensions.",
  investmentSignal: "→ Risk is significantly reduced, but a geopolitical premium remains; consider gradually reducing energy hedges and moderately increasing exposure to risk assets.",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions latest news July 28 2026",
    "Strait of Hormuz shipping status July 28 2026",
    "Iran nuclear deal talks news July 2026",
    "US military deployment Middle East July 2026",
    "WTI Brent crude oil price range and trend July 28 2026 Reuters Bloomberg",
    "oil price analysis July 28 2026 Financial Times"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.139 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↓14）：美伊暂停直接军事对抗并开启间接谈判，导致霍尔木兹海峡的“完全封锁”状态有所松动，触发了跨军事、航运和谈判前景三个维度的风险同步降级。",
    bannerWarning: "→ 风险显著降低，但地缘溢价仍存；可考虑逐步减持能源对冲，并适度增加风险资产敞口。",
    deescalationIntent: "美国寻求在不全面开战的前提下，通过极限施压与外交手段结合，解决霍尔木兹航道安全与伊核问题。",
    structuralRisk: "航道通行处于严重受限状态，但并非完全封锁，有极少量船只通过。",
    contradictionNote: "美国寻求在不全面开战的前提下，通过极限施压与外交手段结合，解决霍尔木兹航道安全与伊核问题。；美军拥有绝对的海空优势和精确打击能力，旨在威慑并惩罚伊朗的升级行为。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第150天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.139 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↓14): The pause in direct US-Iran military confrontation and the opening of indirect talks have led to an easing of the 'complete blockade' statu…",
    bannerWarning: "→ Risk is significantly reduced, but a geopolitical premium remains; consider gradually reducing energy hedges and mode…",
    deescalationIntent: "The U.S. seeks to resolve the Hormuz passage security and Iranian nuclear issue…",
    structuralRisk: "The strait's transit is severely restricted, not fully blockaded, with a very small number of vesse…",
    contradictionNote: "The U.S. seeks to resolve the Hormuz passage security and Iranian nuclear issues through a combination of maximum pressure and diplomacy, without resorting to …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 150",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
