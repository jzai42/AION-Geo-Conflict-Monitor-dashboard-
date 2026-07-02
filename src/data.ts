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
  date: "2026-07-02",
  version: "v2.113",
  keyStats: [
    {
      label: "冲突天数",
      value: "D124",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $70–$71 · Brent $70–$72",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "高风险航行",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "虽无新增直接交火，但局势仍属“有限冲突”范畴。伊朗军方针对霍尔木兹海峡发布直接军事威胁，而美国在该地区维持着包括多个航母战斗群在内的大规模军事部署，以支持其外交努力并构成威慑。双方仍处于高度军事戒备状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "风险维持在“严重受限”级别。尽管有报道称石油运输量正在恢复，但伊朗军方发布了明确的、针对商业航运的军事威胁，声称将对不遵守其航行协议的船只采取“强力回应”。这种官方威胁使航行环境的风险极高，随时可能因误判而升级为扣押或攻击事件。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "油价维持在75美元/桶以下的低风险区间。市场对美伊通过谈判取得进展的预期，加上霍尔木兹海峡运输量的逐步恢复，共同缓解了对大规模供应中断的担忧，导致油价持续承压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国继续深度介入，其在中东的军事部署维持在冲突以来的高位，包括多个航母战斗群。美国不仅是冲突的一方，也是当前外交斡旋的主导者，其军事存在是谈判的重要背景和筹码。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "风险降低，前景改善。美伊在多哈的间接会谈结束，双方均通过调解人释放了积极信号。美国总统特朗普称会谈进展顺利，卡塔尔方面也确认取得“积极进展”，并计划举行后续会议。这标志着外交渠道正在发挥作用，是近期最显著的善意信号。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "伊朗军方警告油轮须遵守其航线，否则将面临“强力回应”",
      description: "伊朗Khatam al-Anbiya联合军事指挥部通过官方媒体发布声明，警告所有通过霍尔木兹海峡的油轮必须使用其指定的航线，任何偏离或不遵守协议的行为都将遭到武装部队“立即且有力的回应”。此声明被视为对日前美国中央司令部重申“致力于商业自由流动”的回应。",
      verification: "confirmed",
      timestamp: "2026-07-02T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_2",
      title: "美伊多哈间接会谈结束，双方及调解方称取得“积极进展”",
      description: "在卡塔尔和巴基斯坦的斡旋下，美伊在多哈举行的技术性间接会谈已经结束。美国总统特朗普称会议“非常好”，并表示伊朗无核化进展顺利。卡塔尔外交部亦确认会谈取得“积极进展”，下一轮会谈将在伊朗前最高领袖葬礼后举行。",
      verification: "confirmed",
      timestamp: "2026-07-02T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_3",
      title: "国际油价因供应担忧缓解而持续承压",
      description: "由于市场预期美伊谈判取得进展将降低地缘政治风险，且霍尔木兹海峡的石油运输量正逐步恢复，国际油价继续下行。布伦特原油价格跌破71美元/桶，触及数月低点，反映出市场对供应中断的担忧有所缓解。",
      verification: "confirmed",
      timestamp: "2026-07-02T10:00:00Z",
      significance: ""
    },
    {
      id: "evt_4",
      title: "美伊就会谈中是否同意解冻资金问题释放矛盾信号",
      description: "伊朗副外长声称双方已就解冻部分伊朗资产达成协议，但美国官员否认了这一说法，坚称除非伊朗履行谅解备忘录中的承诺，否则不会释放任何资金。这暴露了双方在核心问题上的分歧依然严重。",
      verification: "confirmed",
      timestamp: "2026-07-01T20:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方在维持军事高压的同时，通过间接谈判取得初步积极进展，使局势从纯粹对抗转向“谈打结合”。",
      "核心矛盾（海峡控制权、制裁）未解决，任何一方的误判都可能轻易打破现有平衡。",
      "下一轮谈判将在数日后进行，短期内局势或将维持这种“口头积极，行动对峙”的脆弱状态。"
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
        "变化：虽无新增直接交火，但局势仍属“有限冲突”范畴。",
        "变化：伊朗军方针对霍尔木兹海峡发布直接军事威胁，而美国在该地区维持着包括多个航母战斗群在内的大规模军事部署，以支持其外交努力并构成威慑。",
        "变化：双方仍处于高度军事戒备状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：风险维持在“严重受限”级别。",
        "变化：尽管有报道称石油运输量正在恢复，但伊朗军方发布了明确的、针对商业航运的军事威胁，声称将对不遵守其航行协议的船只采取“强力回应”。",
        "变化：这种官方威胁使航行环境的风险极高，随时可能因误判而升级为扣押或攻击事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价维持在75美元/桶以下的低风险区间。",
        "变化：市场对美伊通过谈判取得进展的预期，加上霍尔木兹海峡运输量的逐步恢复，共同缓解了对大规模供应中断的担忧，导致油价持续承压。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国继续深度介入，其在中东的军事部署维持在冲突以来的高位，包括多个航母战斗群。",
        "变化：美国不仅是冲突的一方，也是当前外交斡旋的主导者，其军事存在是谈判的重要背景和筹码。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过“极限压力+外交”迫使伊朗在核问题及地区行为上做出永久性让步。",
      "伊朗则力图通过控制霍尔木兹海峡等关键杠杆，换取制裁解除和国家主权的承认，拒绝单方面妥协。"
    ],
    military: [
      "美国旨在维护国际航行自由并保护其地区盟友，通过前沿军事部署实现威慑。",
      "伊朗则试图利用其在霍尔木兹海峡的地理优势和非对称军事能力，反制美国的军事和经济压力。"
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "07-02",
      score: 56,
      active: true
    }
  ],
  keyChange: "冲突烈度因外交渠道的积极信号而有所缓和，综合评分下降。主要驱动因素是美伊多哈间接谈判取得“积极进展”，改善了降级前景。然而，伊朗就霍尔木兹海峡控制权发布新的军事威胁，抵消了部分降温效果，使局势进入一种军事对峙与外交谈判并行的脆弱平衡状态。",
  investmentSignal: "→ 鉴于外交进展，可适度减持风险资产，但需对冲霍尔木兹突发事件风险。",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 2 2026 Reuters Bloomberg",
    "US Iran news today",
    "Iran military activity Strait of Hormuz July 2026",
    "US military deployment Middle East July 2026",
    "Iran nuclear talks progress July 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-02",
  version: "v2.113",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D124",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $70–$71 · Brent $70–$72",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "High-Risk Navigation",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "While there is no new direct fire, the situation remains in a 'limited conflict' category. Iran's military issued a direct threat concerning the Strait of Hormuz, and the U.S. maintains a large-scale military deployment, including carrier strike groups, to back its diplomacy and serve as a deterrent. Both sides are on high military alert.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Risk remains at the 'severe restriction' level. Despite reports of recovering oil transit volumes, Iran's military has issued an explicit military threat against commercial shipping, stating it will take 'forceful' action against non-compliant vessels. This official threat makes the navigation environment extremely high-risk, with potential for seizure or attack events due to miscalculation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "Oil prices remain in the low-risk bracket below $75/barrel. Market expectations of progress in U.S.-Iran negotiations, coupled with the gradual recovery of shipping volumes through the Strait of Hormuz, have eased concerns over a major supply disruption, putting continued pressure on prices.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States remains deeply involved, with its military deployment in the Middle East, including multiple carrier strike groups, at a post-conflict high. The U.S. is not only a party to the conflict but also the leader of current diplomatic efforts, with its military presence serving as crucial background and leverage for talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Risk has decreased and prospects have improved. The indirect talks in Doha have concluded, with both sides signaling positive outcomes through mediators. U.S. President Trump called the talks productive, and Qatari officials confirmed 'positive progress' and plans for follow-up meetings. This marks a tangible goodwill signal that the diplomatic track is functioning.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "Iran's military warns tankers to follow its routes or face 'forceful response'",
      description: "Iran's Khatam al-Anbiya joint military command issued a statement via state media warning that all oil tankers transiting the Strait of Hormuz must use its designated sea lanes, and that any deviation or non-compliance would be met with an 'immediate and forceful response' from the armed forces. The statement is seen as a retort to a recent U.S. CENTCOM affirmation of its 'commitment to the free flow of commerce.'",
      verification: "confirmed",
      timestamp: "2026-07-02T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_2",
      title: "US-Iran indirect talks in Doha conclude with mediators citing 'positive progress'",
      description: "Mediated by Qatar and Pakistan, the technical indirect talks between the US and Iran in Doha have ended. U.S. President Trump described the meetings as 'very good' and stated that Iran's denuclearization is moving along well. Qatar's foreign ministry also confirmed 'positive progress' was made, with the next round of talks to be scheduled after the funeral of Iran's late supreme leader.",
      verification: "confirmed",
      timestamp: "2026-07-02T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_3",
      title: "Oil prices remain under pressure as supply fears ease",
      description: "International oil prices continued their downward trend on expectations that progress in U.S.-Iran negotiations would lower geopolitical risk, and as oil transport through the Strait of Hormuz gradually recovers. Brent crude fell below $71 a barrel, hitting a multi-month low, reflecting diminished market concerns about supply disruptions.",
      verification: "confirmed",
      timestamp: "2026-07-02T10:00:00Z",
      significance: ""
    },
    {
      id: "evt_4",
      title: "US and Iran give conflicting signals on unfreezing of funds",
      description: "Iran's deputy foreign minister claimed an agreement had been reached to unfreeze some Iranian assets, but U.S. officials denied this, insisting no funds would be released unless Iran fulfilled its commitments under the memorandum of understanding. This highlights that significant disagreements on core issues remain.",
      verification: "confirmed",
      timestamp: "2026-07-01T20:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "While maintaining high military pressure, both sides have achieved preliminary positive progress through indirect negotiations, shifting the situation from pure confrontation to a mix of talking and fighting.",
      "Core contradictions (control of the Strait, sanctions) remain unresolved, and any miscalculation by either side could easily shatter the current equilibrium.",
      "The next round of negotiations will take place in several days, suggesting the situation will likely remain in this fragile state of 'positive rhetoric, confrontational posture' in the short term."
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
        "Change: While there is no new direct fire, the situation remains in a 'limited conflict' category.",
        "Change: Iran's military issued a direct threat concerning the Strait of Hormuz, and the U.S.",
        "Change: maintains a large-scale military deployment, including carrier strike groups, to back its diplomacy and serve as a deterrent."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk remains at the 'severe restriction' level.",
        "Change: Despite reports of recovering oil transit volumes, Iran's military has issued an explicit military threat against commercial shipping, stating it will …",
        "Change: This official threat makes the navigation environment extremely high-risk, with potential for seizure or attack events due to miscalculation."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices remain in the low-risk bracket below $75/barrel.",
        "Change: Market expectations of progress in U.S.-Iran negotiations, coupled with the gradual recovery of shipping volumes through the Strait of Hormuz, have eas…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States remains deeply involved, with its military deployment in the Middle East, including multiple carrier strike groups, at a post-conflic…",
        "Change: The U.S.",
        "Change: is not only a party to the conflict but also the leader of current diplomatic efforts, with its military presence serving as crucial background and lev…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iran into making permanent concessions on its nuclear program and regional behavior through a strategy of 'maximum pressure + diplomacy'.",
      "Iran aims to use key leverage, such as its control over the Strait of Hormuz, to achieve sanctions relief and recognition of its national sovereignty, refusing unilateral compromises."
    ],
    military: [
      "The U.S. aims to preserve freedom of international navigation and protect its regional allies through forward military deployment and deterrence.",
      "Iran seeks to use its geographical advantage in the Strait of Hormuz and its asymmetric military capabilities to counter U.S. military and economic pressure."
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "07-02",
      score: 56,
      active: true
    }
  ],
  keyChange: "Conflict intensity has moderated due to positive signals from diplomatic channels, leading to a decrease in the composite score. The main driver is the 'positive progress' in the US-Iran indirect talks in Doha, which improved de-escalation prospects. However, Iran's new military threats over control of the Strait of Hormuz have offset some of the cooling effect, pushing the situation into a fragile balance of military standoff and diplomatic engagement.",
  investmentSignal: "→ Given the diplomatic progress, a moderate reduction in risk assets is viable, but hedging against Hormuz contingency risks is necessary.",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 2 2026 Reuters Bloomberg",
    "US Iran news today",
    "Iran military activity Strait of Hormuz July 2026",
    "US military deployment Middle East July 2026",
    "Iran nuclear talks progress July 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.113 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 56（↓4）：冲突烈度因外交渠道的积极信号而有所缓和，综合评分下降。主要驱动因素是美伊多哈间接谈判取得“积极进展”，改善了降级前景。然而，伊朗就霍尔木兹海峡控制权发布新的军事威胁，抵消了部分降温效果，使局势进入一种军事对峙与外交谈判并行的脆弱平衡状态。",
    bannerWarning: "→ 鉴于外交进展，可适度减持风险资产，但需对冲霍尔木兹突发事件风险。",
    deescalationIntent: "美国寻求通过“极限压力+外交”迫使伊朗在核问题及地区行为上做出永久性让步。",
    structuralRisk: "风险维持在“严重受限”级别。尽管有报道称石油运输量正在恢复，但伊朗军方发布了明确的、针对商业航运的军事威胁，声称将对不遵守其航行协议的船只采取“强力回应”。这种官方威胁使航行环境的风险极高，随时可能…",
    contradictionNote: "美国寻求通过“极限压力+外交”迫使伊朗在核问题及地区行为上做出永久性让步。；美国旨在维护国际航行自由并保护其地区盟友，通过前沿军事部署实现威慑。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第124天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.113 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 56 (↓4): Conflict intensity has moderated due to positive signals from diplomatic channels, leading to a decrease in the composite score. The main d…",
    bannerWarning: "→ Given the diplomatic progress, a moderate reduction in risk assets is viable, but hedging against Hormuz contingency …",
    deescalationIntent: "The U.S. seeks to compel Iran into making permanent concessions on its nuclear …",
    structuralRisk: "Risk remains at the 'severe restriction' level. Despite reports of recovering oil transit volumes, …",
    contradictionNote: "The U.S. seeks to compel Iran into making permanent concessions on its nuclear program and regional behavior through a strategy of 'maximum pressure + diplomac…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 124",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
