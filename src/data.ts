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
  date: "2026-06-18",
  version: "v2.99",
  riskScore: 36,
  keyChange: "美伊签署谅解备忘录（MOU），正式停止敌对行动，启动霍尔木兹海峡的重新开放，并为全面的核谈判设立了60天的窗口期，导致石油价格大幅下跌及整体冲突风险显著降低。",
  investmentSignal: "→ 随着停火协议落地与能源价格回落，短期风险偏好得以修复，可适度减持能源等对冲头寸，并关注风险资产的修复机会。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D110",
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
      value: "WTI $74–$76 · Brent $78–$79",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "重新开放",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "双方签署包含“永久停止军事行动”条款的谅解备忘录，直接军事冲突已经停止，标志着军事态势的显著降级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "根据停火协议，伊朗已重新开放霍尔木兹海峡，美国海军解除封锁，商业航运开始恢复，尽管完全恢复尚需时间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "由于停火协议达成和霍尔木兹海峡重开，市场对供应中断的担忧大幅缓解，油价显著回落，稳定在可控区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "随着直接军事行动的停止，大国介入形式从军事打击转变为高强度的外交斡旋与公开声明，包括对协议的担保和对违约后果的警告。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "美伊两国元首签署了具有约束力的谅解备忘录，全面停火立即生效，并启动了有时限的最终协议谈判，这是冲突降级的决定性步骤。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260618-1",
      title: "美伊签署谅解备忘录（MOU）正式停止敌对行动",
      description: "美国与伊朗在巴基斯坦和卡塔尔的斡旋下，于6月17日签署了一份谅解备忘录，宣布“立即且永久地”停止所有军事行动，包括在黎巴嫩的战线。该协议同时开启了为期60天的谈判窗口，以达成关于伊朗核计划的最终协议。",
      verification: "confirmed",
      timestamp: "2026-06-18T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260618-2",
      title: "霍尔木兹海峡重新开放，商业航运开始恢复",
      description: "根据谅解备忘录，伊朗同意立即重新开放霍尔木兹海峡，美国则解除海军封锁。6月18日上午，已有至少10艘商船（包括液化天然气运输船）通过该海峡，标志着交通开始恢复，但流量远低于战前水平。三艘沙特超级油轮已离港通过海峡。",
      verification: "confirmed",
      timestamp: "2026-06-18T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260618-3",
      title: "国际油价因地缘风险缓解而大幅下跌",
      description: "市场对美伊达成停火协议并重开霍尔木兹海峡做出积极反应，对全球能源供应中断的担忧减弱。布伦特原油价格跌破80美元/桶，WTI原油价格也跌至约75美元/桶，进入温和区间。",
      verification: "confirmed",
      timestamp: "2026-06-18T10:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260618-4",
      title: "美国防长警告若伊朗违约将恢复军事行动",
      description: "美国国防部长在布鲁塞尔表示，如果伊朗在谈判期间未能遵守协议承诺，美国准备好“重新开始”军事行动并“重新实施铁腕封锁”。这为脆弱的协议增添了不确定性。",
      verification: "confirmed",
      timestamp: "2026-06-18T11:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260618-5",
      title: "以色列在黎巴嫩南部的军事存在成为协议潜在摩擦点",
      description: "尽管美伊协议要求停止在黎巴嫩的军事行动，但以色列国防军表示将继续在黎南部的“安全区”内行动。据报道，以色列正就其部队部署问题与美国进行“顽固的谈判”，伊朗方面则视以色列的持续存在为对协议的违反。",
      verification: "confirmed",
      timestamp: "2026-06-18T09:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方签署包含“永久停止军事行动”条款的谅解备忘录，直接军事冲突已经停止，标志着军事态势的显著降级。"
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
        "变化：双方签署包含“永久停止军事行动”条款的谅解备忘录，直接军事冲突已经停止，标志着军事态势的显著降级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：根据停火协议，伊朗已重新开放霍尔木兹海峡，美国海军解除封锁，商业航运开始恢复，尽管完全恢复尚需时间。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于停火协议达成和霍尔木兹海峡重开，市场对供应中断的担忧大幅缓解，油价显著回落，稳定在可控区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：随着直接军事行动的停止，大国介入形式从军事打击转变为高强度的外交斡旋与公开声明，包括对协议的担保和对违约后果的警告。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国希望通过临时协议锁定去军事化成果，并利用60天窗口期达成限制伊朗核能力的长久协议。",
      "伊朗旨在利用停火协议迅速恢复经济（特别是石油出口），同时在核心利益（如导弹计划）上不作让步，并将考验美国约束其地区盟友（尤其是以色列）的能力。"
    ],
    military: [
      "停火协议的脆弱性取决于第三方行动者，特别是以色列在黎巴嫩的军事行动是否会引发伊朗支持的代理人回应，从而破坏协议基础。",
      "双方军队虽已脱离接触，但仍在区域内保持高度戒备，为谈判破裂的可能性做准备。"
    ]
  },
  scoreTrend: [
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36,
      active: true
    }
  ],
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news",
    "Iran military activity June 18 2026",
    "Strait of Hormuz shipping status June 18 2026",
    "US military deployment Middle East June 18 2026",
    "Iran nuclear talks progress June 2026",
    "WTI Brent crude oil price today June 18 2026",
    "oil price trends June 2026 Reuters",
    "Bloomberg oil price analysis June 18 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-18",
  version: "v2.99",
  riskScore: 36,
  keyChange: "The signing of a US-Iran Memorandum of Understanding (MOU) has formally ceased hostilities, initiated the reopening of the Strait of Hormuz, and established a 60-day window for comprehensive nuclear negotiations, leading to a sharp drop in oil prices and a significant reduction in overall conflict risk.",
  investmentSignal: "→ As the ceasefire agreement takes hold and energy prices fall, short-term risk appetite is recovering; consider moderately reducing energy and other hedge positions and look for recovery opportunities in risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D110",
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
      value: "WTI $74–$76 · Brent $78–$79",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Reopened",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Direct military conflict has ceased following the signing of an MOU that includes a 'permanent cessation of military operations,' marking a significant de-escalation of the military posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "In accordance with the ceasefire deal, Iran has reopened the Strait of Hormuz, and the US naval blockade has been lifted. Commercial shipping is beginning to resume, though a full recovery will take time.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Fears of supply disruption have significantly eased due to the ceasefire agreement and reopening of the Strait of Hormuz, leading to a notable drop in oil prices to a manageable range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "With the cessation of direct military action, great power involvement has shifted from military strikes to high-intensity diplomatic maneuvering and public statements, including guarantees for the deal and warnings of consequences for violations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "The leaders of the US and Iran have signed a binding MOU, enacting an immediate and comprehensive ceasefire and launching time-bound negotiations for a final agreement, a decisive step towards de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260618-1",
      title: "US and Iran Sign Landmark MOU to End Hostilities",
      description: "Mediated by Pakistan and Qatar, the United States and Iran signed a Memorandum of Understanding on June 17, declaring an 'immediate and permanent' cessation of all military operations, including on the Lebanon front. The agreement also opens a 60-day negotiation window to reach a final deal on Iran's nuclear program.",
      verification: "confirmed",
      timestamp: "2026-06-18T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260618-2",
      title: "Strait of Hormuz Reopens, Commercial Traffic Gradually Resumes",
      description: "Under the MOU, Iran agreed to immediately reopen the Strait of Hormuz, and the US lifted its naval blockade. On the morning of June 18, at least 10 commercial vessels, including LNG carriers, transited the strait, signaling a resumption of traffic, though levels remain far below pre-war averages. Three Saudi supertankers have also departed and passed through.",
      verification: "confirmed",
      timestamp: "2026-06-18T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260618-3",
      title: "International Oil Prices Tumble on Easing Geopolitical Risk",
      description: "Markets reacted positively to the US-Iran ceasefire deal and the reopening of the Strait of Hormuz, easing concerns about global energy supply disruptions. Brent crude prices fell below $80 per barrel, and WTI crude dropped to around $75 per barrel, entering a moderate range.",
      verification: "confirmed",
      timestamp: "2026-06-18T10:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260618-4",
      title: "US Defense Secretary Warns of Renewed Military Action if Iran Breaches Deal",
      description: "The US Secretary of Defense stated in Brussels that the US is prepared to 'recommence' military action and 'reimpose an ironclad blockade' if Iran fails to adhere to its commitments during the negotiation period, adding uncertainty to the fragile agreement.",
      verification: "confirmed",
      timestamp: "2026-06-18T11:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260618-5",
      title: "Israel's Military Presence in Southern Lebanon Becomes Potential Friction Point for Deal",
      description: "Despite the US-Iran deal mandating a halt to military actions in Lebanon, the Israeli Defense Forces have stated they will continue operations in their 'security zone' in southern Lebanon. Israel is reportedly in 'stubborn negotiations' with the US over its troop deployment, while Iran views Israel's continued presence as a violation of the agreement.",
      verification: "confirmed",
      timestamp: "2026-06-18T09:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct military conflict has ceased following the signing of an MOU that includes a 'permanent cessation of military operations,' marking a significant de-escalation of the military posture."
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
        "Change: Direct military conflict has ceased following the signing of an MOU that includes a 'permanent cessation of military operations,' marking a significant…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: In accordance with the ceasefire deal, Iran has reopened the Strait of Hormuz, and the US naval blockade has been lifted.",
        "Change: Commercial shipping is beginning to resume, though a full recovery will take time."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Fears of supply disruption have significantly eased due to the ceasefire agreement and reopening of the Strait of Hormuz, leading to a notable drop in …"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: With the cessation of direct military action, great power involvement has shifted from military strikes to high-intensity diplomatic maneuvering and pu…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US aims to use the interim agreement to lock in de-militarization and leverage the 60-day window to achieve a long-term deal limiting Iran's nuclear capabilities.",
      "Iran seeks to use the ceasefire to rapidly restore its economy (especially oil exports) without compromising on core interests like its missile program, while testing America's ability to restrain its regional allies (particularly Israel)."
    ],
    military: [
      "The fragility of the ceasefire depends on third-party actors, specifically whether Israeli military actions in Lebanon provoke a response from Iranian-backed proxies that could undermine the agreement's foundation.",
      "While disengaged, the armed forces of both sides remain on high alert in the region, preparing for the possibility of a negotiation breakdown."
    ]
  },
  scoreTrend: [
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36,
      active: true
    }
  ],
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news",
    "Iran military activity June 18 2026",
    "Strait of Hormuz shipping status June 18 2026",
    "US military deployment Middle East June 18 2026",
    "Iran nuclear talks progress June 2026",
    "WTI Brent crude oil price today June 18 2026",
    "oil price trends June 2026 Reuters",
    "Bloomberg oil price analysis June 18 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.99 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 36（↓4）：美伊签署谅解备忘录（MOU），正式停止敌对行动，启动霍尔木兹海峡的重新开放，并为全面的核谈判设立了60天的窗口期，导致石油价格大幅下跌及整体冲突风险显著降低。",
    bannerWarning: "→ 随着停火协议落地与能源价格回落，短期风险偏好得以修复，可适度减持能源等对冲头寸，并关注风险资产的修复机会。",
    deescalationIntent: "美国希望通过临时协议锁定去军事化成果，并利用60天窗口期达成限制伊朗核能力的长久协议。",
    structuralRisk: "根据停火协议，伊朗已重新开放霍尔木兹海峡，美国海军解除封锁，商业航运开始恢复，尽管完全恢复尚需时间。",
    contradictionNote: "美国希望通过临时协议锁定去军事化成果，并利用60天窗口期达成限制伊朗核能力的长久协议。；停火协议的脆弱性取决于第三方行动者，特别是以色列在黎巴嫩的军事行动是否会引发伊朗支持的代理人回应，从而破坏协议基础。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第110天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.99 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 36 (↓4): The signing of a US-Iran Memorandum of Understanding (MOU) has formally ceased hostilities, initiated the reopening of the Strait of Hormuz…",
    bannerWarning: "→ As the ceasefire agreement takes hold and energy prices fall, short-term risk appetite is recovering; consider modera…",
    deescalationIntent: "The US aims to use the interim agreement to lock in de-militarization and lever…",
    structuralRisk: "In accordance with the ceasefire deal, Iran has reopened the Strait of Hormuz, and the US naval blo…",
    contradictionNote: "The US aims to use the interim agreement to lock in de-militarization and leverage the 60-day window to achieve a long-term deal limiting Iran's nuclear capabi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 110",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
