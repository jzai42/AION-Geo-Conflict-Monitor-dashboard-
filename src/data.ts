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
  date: "2026-07-01",
  version: "v2.112",
  keyStats: [
    {
      label: "冲突天数",
      value: "D123",
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
      value: "WTI $68.5–$70.5 · Brent $71.5–$73.5",
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
  riskScore: 60,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "双方军事行动暂停，但局势仍紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "通行量仅为正常的5-10%，接近封锁。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "油价稳定在$75/桶以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国深度介入谈判，军事威慑持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "间接谈判进行中但进展有限。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊在多哈通过卡塔尔和巴基斯坦进行间接“技术性会谈”",
      description: "美国与伊朗代表团抵达卡塔尔多哈，就执行60天停火谅解备忘录（MoU）进行间接谈判。会谈由卡塔尔和巴基斯坦斡旋，核心议题是霍尔木兹海峡的通行管理和释放被冻结的伊朗资金。伊朗方面公开否认存在直接的“和平谈判”，但承认技术性讨论正在进行，而美方对此表达了挫败感。(Sources: Al Jazeera, Reuters, CBS News)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美国副总统称已摧毁伊朗军事能力，谈判中手握“所有牌”",
      description: "美国副总统J.D. 万斯在接受福克斯新闻采访时表示，美国已“完成核心任务”，即摧毁伊朗的核计划和常规军事能力。他强调，无论谈判结果如何，美国都处于更有利的地位，并手握“所有牌”。此番强硬表态为多哈会谈设定了高压基调。(Sources: CBS News, Al Jazeera, RFE/RL)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡交通仍严重受阻，一艘货船因偏离航线搁浅",
      description: "伊朗国家电视台报道，一艘外国集装箱船因未遵循伊朗批准的航道而在霍尔木兹海峡搁浅。该事件被外界视为伊朗借机强调其对海峡的控制权。独立数据显示，海峡的商业航运量仍仅为正常时期的5%左右，处于“有效关闭”或“选择性封锁”状态。(Sources: Associated Press, Independent monitors)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "油价在75美元/桶以下区间波动，市场关注谈判不确定性",
      description: "尽管中东地缘政治紧张，但由于此前市场已消化停火预期，油价在近期大幅下跌后保持在低位。WTI原油交易价格在68-71美元/桶区间，布伦特原油在71-74美元/桶区间。多哈会谈的复杂性给油价带来轻微支撑，但整体仍处于低风险区间。(Sources: Reuters, The Economic Times, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "报道称伊朗此前袭击对美国海军基地造成重大损失",
      description: "据《华尔街日报》援引的一项调查报道，在2月至6月的冲突期间，伊朗的导弹和无人机袭击对包括美国第五舰队驻巴林总部在内的20多个美军设施造成了远超五角大楼此前披露的重大损失。这促使美国开始重新评估其在中东的军事部署。(Sources: Muslim Network TV, The Wall Street Journal)",
      verification: "single",
      timestamp: "2026-06-30",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方停止了直接的军事报复性打击，进入军事行动的暂停期。",
      "冲突焦点转向在多哈举行的间接谈判，以及对霍尔木兹海峡控制权的激烈博弈。",
      "尽管存在外交渠道，但双方公开立场强硬，互信基础薄弱，局势破裂的风险依然存在。"
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
        "延续：自周末的互相打击后，美伊之间未报告新的直接军事冲突，维持脆弱停火状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡通行量被证实持续处于低于正常水平10%的极端状态，相当于严重受限，风险等级因此上调。",
        "延续：伊朗继续主张对海峡航线的管理权，并通过管控船只通行来施加影响。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油价保持在75美元/桶以下，反映出市场目前并未定价大规模供应中断的风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊双方在多哈启动由第三方斡旋的间接谈判，是停火协议后的重要外交步骤。",
        "延续：美方高级官员持续发表强硬言论，强调军事实力和谈判优势，而伊朗则拒绝直接会谈，双方姿态均显僵硬。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国致力于通过极限压力迫使伊朗就核问题和地区影响力做出永久性让步。",
      "伊朗则寻求解除制裁、获得国际社会对其地区大国地位的承认，并抵制美国的主导。"
    ],
    military: [
      "美国旨在通过军事优势和前沿部署，威慑并惩罚伊朗的“恶意活动”。",
      "伊朗则利用其不对称战力（导弹、无人机、代理人网络）和对霍尔木兹海峡的控制力，挑战美军存在并作为谈判筹码。"
    ]
  },
  scoreTrend: [
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68
    },
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60,
      active: true
    }
  ],
  keyChange: "霍尔木兹航运扰动因子从3分上调至4分。尽管直接军事冲突暂停，但越来越多的证据表明海峡的商业航运实际上已严重受限（通行量远低于50%），接近于有效封锁状态，这反映了更高的结构性风险。",
  investmentSignal: "→ 风险评分因航运中断确认而回升，表明局势基础仍然脆弱，建议维持对能源运输链敏感资产的对冲和防御性配置。",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Iran military activity Middle East July 1 2026",
    "Strait of Hormuz shipping status July 1 2026",
    "WTI Brent crude oil price July 1 2026 Reuters",
    "oil prices today Bloomberg",
    "US official statements on Iran July 2026",
    "Iran nuclear deal talks update July 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-01",
  version: "v2.112",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D123",
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
      value: "WTI $68.5–$70.5 · Brent $71.5–$73.5",
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
  riskScore: 60,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Military actions paused, but situation remains tense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Traffic is only 5-10% of normal, nearing a blockade.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "Oil prices stable below $75/bbl.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. deeply involved in talks, military deterrence continues.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Indirect talks ongoing but progress is limited.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran hold indirect 'technical talks' in Doha via Qatari and Pakistani mediators",
      description: "US and Iranian delegations have arrived in Doha, Qatar, for indirect negotiations on implementing the 60-day ceasefire MoU. The talks are mediated by Qatar and Pakistan, focusing on the administration of passage through the Strait of Hormuz and the release of frozen Iranian funds. Iran publicly denies direct 'peace talks' but acknowledges technical discussions are happening, a point of frustration for the US side. (Sources: Al Jazeera, Reuters, CBS News)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Vice President claims Iranian military capabilities destroyed, holds 'all the cards' in talks",
      description: "In an interview with Fox News, U.S. Vice President J.D. Vance stated that the U.S. has 'accomplished the core mission' of destroying Iran's nuclear program and conventional military capabilities. He emphasized that the U.S. is in a stronger position regardless of the negotiation outcome and holds 'all the cards.' This hardline statement sets a high-pressure tone for the Doha talks. (Sources: CBS News, Al Jazeera, RFE/RL)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Strait of Hormuz traffic remains severely restricted; cargo ship runs aground after deviating from route",
      description: "Iranian state TV reported that a foreign container ship ran aground in the Strait of Hormuz after not following Iran's approved shipping lane. The incident is seen as an attempt by Iran to assert its control over the waterway. Independent data shows commercial shipping volume is still at only about 5% of normal levels, in a state of 'effective closure' or 'selective blockade.' (Sources: Associated Press, Independent monitors)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "Oil prices fluctuate below $75/bbl as market watches negotiation uncertainty",
      description: "Despite geopolitical tensions, oil prices remain low after a recent sharp drop, as markets had already priced in ceasefire expectations. WTI crude is trading in the $68-$71/bbl range, with Brent in the $71-$74/bbl range. The complexity of the Doha talks offers slight support, but the overall risk level remains low. (Sources: Reuters, The Economic Times, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-07-01",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Past Iranian attacks caused major damage to US Navy base, report says",
      description: "According to an investigation cited by The Wall Street Journal, Iranian missile and drone attacks between February and June caused significantly more damage than previously disclosed by the Pentagon to over 20 U.S. military facilities, including the Fifth Fleet's headquarters in Bahrain. This has prompted the U.S. to reassess its military posture in the Middle East. (Sources: Muslim Network TV, The Wall Street Journal)",
      verification: "single",
      timestamp: "2026-06-30",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both the US and Iran have paused direct military retaliatory strikes, entering a period of operational suspension.",
      "The conflict's focus has shifted to indirect negotiations in Doha and an intense struggle over the control of the Strait of Hormuz.",
      "Despite diplomatic channels, tough public stances and a weak foundation of trust mean the risk of breakdown remains significant."
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
        "Continue: No new direct military conflicts between the US and Iran have been reported since the mutual strikes over the weekend, maintaining a fragile ceasefir…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The severity of the strait's disruption is confirmed, with traffic at less than 10% of normal, constituting a severe restriction and elevating the risk…",
        "Continue: Iran continues to assert its right to manage shipping lanes in the strait, using its control over vessel passage as leverage."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: International oil prices remain below $75/barrel, reflecting that the market is not currently pricing in a risk of large-scale supply disruptions."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US and Iran have initiated indirect, third-party mediated talks in Doha, a significant diplomatic step following the ceasefire agreement.",
        "Continue: Senior US officials continue to make hawkish statements emphasizing military strength and negotiating leverage, while Iran refuses direct talks, show…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The United States is committed to using maximum pressure to force Iran into permanent concessions on its nuclear program and regional influence.",
      "Iran seeks the lifting of sanctions, international recognition of its status as a regional power, and resistance to U.S. dominance."
    ],
    military: [
      "The U.S. aims to deter and punish Iran's 'malign activities' through its military superiority and forward deployments.",
      "Iran utilizes its asymmetric capabilities (missiles, drones, proxy networks) and its control over the Strait of Hormuz to challenge the U.S. presence and create leverage for negotiations."
    ]
  },
  scoreTrend: [
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68
    },
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60,
      active: true
    }
  ],
  keyChange: "The Hormuz Shipping Disruption factor was raised from 3 to 4. While direct military conflict has paused, mounting evidence confirms that commercial shipping in the strait is severely restricted (traffic far below 50%), bordering on an effective blockade. This reflects a higher structural risk.",
  investmentSignal: "→ The risk score has ticked up on confirmation of severe shipping disruption, indicating the underlying situation remains fragile; maintaining hedges and defensive positions on assets sensitive to the energy supply chain is advised.",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Iran military activity Middle East July 1 2026",
    "Strait of Hormuz shipping status July 1 2026",
    "WTI Brent crude oil price July 1 2026 Reuters",
    "oil prices today Bloomberg",
    "US official statements on Iran July 2026",
    "Iran nuclear deal talks update July 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.112 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↑4）：霍尔木兹航运扰动因子从3分上调至4分。尽管直接军事冲突暂停，但越来越多的证据表明海峡的商业航运实际上已严重受限（通行量远低于50%），接近于有效封锁状态，这反映了更高的结构性风险。",
    bannerWarning: "→ 风险评分因航运中断确认而回升，表明局势基础仍然脆弱，建议维持对能源运输链敏感资产的对冲和防御性配置。",
    deescalationIntent: "美国致力于通过极限压力迫使伊朗就核问题和地区影响力做出永久性让步。",
    structuralRisk: "通行量仅为正常的5-10%，接近封锁。",
    contradictionNote: "美国致力于通过极限压力迫使伊朗就核问题和地区影响力做出永久性让步。；美国旨在通过军事优势和前沿部署，威慑并惩罚伊朗的“恶意活动”。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第123天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.112 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↑4): The Hormuz Shipping Disruption factor was raised from 3 to 4. While direct military conflict has paused, mounting evidence confirms that co…",
    bannerWarning: "→ The risk score has ticked up on confirmation of severe shipping disruption, indicating the underlying situation remai…",
    deescalationIntent: "The United States is committed to using maximum pressure to force Iran into per…",
    structuralRisk: "Traffic is only 5-10% of normal, nearing a blockade.",
    contradictionNote: "The United States is committed to using maximum pressure to force Iran into permanent concessions on its nuclear program and regional influence.; The U.S. aims…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 123",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
