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
  date: "2026-07-20",
  version: "v2.131",
  riskScore: 98,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D142",
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
      value: "WTI $108.45–$111.90 · Brent $113.10–$115.80",
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
      description: "美伊双方在波斯湾发生直接导弹交换，美军拦截多枚反舰导弹。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡仍处于完全物理封锁状态，伊朗宣布任何未经授权进入者将被击沉。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "油价在高位平台维持，WTI 与 Brent 价格区间均处于 $100 以上的危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美国及盟国海军编队介入作战，大国直接军事对抗风险升至极值。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "官方沟通完全中断，IAEA 的最新核库存报告抹杀了短期外交转圜可能。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "海峡导弹拦截事件",
      description: "美军神盾舰在霍尔木兹海域击落 14 枚反舰导弹，证实直接冲突加剧。来源：Reuters, DoD",
      verification: "confirmed",
      timestamp: "2026-07-20 04:30",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗发布禁航细则",
      description: "伊朗宣布对未获批进入海峡的武装船只实施军事打击。来源：IRNA, Al Jazeera",
      verification: "confirmed",
      timestamp: "2026-07-20 06:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "IAEA 核库存警报",
      description: "IAEA 报告伊朗高丰度铀储备接近核武阈值，引发美以高度戒备。来源：Bloomberg",
      verification: "confirmed",
      timestamp: "2026-07-20 09:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方进入高频交火阶段",
      "海峡航运功能彻底瘫痪",
      "外交调解几乎完全失效"
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
        "延续：波斯湾电子战与导弹拦截活动处于 D142 以来最高水平。",
        "变化：美军增加部署两个航母打击群的补给梯队，预示长期对抗。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球 20% 的原油通过能力依然处于物理中断状态。",
        "延续：各大航运巨头确认绕行航线常态化。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：现货溢价显著上升，亚洲炼厂开始动用战略储备（SPR）。",
        "延续：油价维持在 $100-$120 危机波动带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗最高国家安全委员会重申不接受任何附加条件的谈判。",
        "变化：白宫声明称正在评估所有军事选项以确保航行自由。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方国内强硬派全面占据主导，政治妥协空间为零。"
    ],
    military: [
      "封锁与反封锁的军事目标不可调和，双方均面临退无可退的压力。"
    ]
  },
  scoreTrend: [
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98,
      active: true
    }
  ],
  keyChange: "冲突进入全面对峙的高位平台期，海峡封锁与直接交火成为常态。",
  investmentSignal: "→ 维持能源、大宗及风险对冲资产高位配置，规避风险资产敞口。",
  prevRiskScore: 98,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-20",
  version: "v2.131",
  riskScore: 98,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D142",
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
      value: "WTI $108.45–$111.90 · Brent $113.10–$115.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct missile exchanges and naval skirmishes confirmed by both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Full physical blockade of the Strait continues; no commercial traffic recorded.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Oil prices stable in the $100-120 crisis zone amid supply panic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct US military intervention in interception operations; escalation of allied presence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Negotiation channels are effectively closed; IAEA report worsens diplomatic outlook.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Hormuz Missile Interception",
      description: "US Aegis-class vessels intercept 14 Iranian missiles targeting commercial lanes. Source: Reuters",
      verification: "confirmed",
      timestamp: "2026-07-20 04:30",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Strait Closure Directive",
      description: "Tehran details military response for unauthorized transit through the Strait. Source: IRNA",
      verification: "confirmed",
      timestamp: "2026-07-20 06:15",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "High-frequency kinetic engagement",
      "Total maritime blockade of Hormuz",
      "Complete breakdown of diplomacy"
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
        "Continue: EW and missile exchange activity at D142 peak levels.",
        "Change: US CENTCOM logistics reinforcement indicates long-term posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: 20% of global oil transit remains physically disrupted.",
        "Continue: Major liners confirm indefinite Cape of Good Hope rerouting."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spot premiums rising as Asian refiners begin SPR drawdowns.",
        "Continue: Crude prices fluctuate within $100-$120 crisis band."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran National Security Council rejects conditional talks.",
        "Change: White House states all military options are under review."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Domestic hardliners in both nations dominate policy; zero room for compromise."
    ],
    military: [
      "Irreconcilable objectives regarding the blockade; both sides face 'point of no return' pressure."
    ]
  },
  scoreTrend: [
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98,
      active: true
    }
  ],
  keyChange: "Conflict enters a high-intensity plateau; blockade and direct fire are now the status quo.",
  investmentSignal: "→ Maintain high exposure to Energy, Commodities, and Defensive assets to hedge against global supply shocks.",
  prevRiskScore: 98,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.131 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 98（持平）：冲突进入全面对峙的高位平台期，海峡封锁与直接交火成为常态。",
    bannerWarning: "→ 维持能源、大宗及风险对冲资产高位配置，规避风险资产敞口。",
    deescalationIntent: "美伊双方国内强硬派全面占据主导，政治妥协空间为零。",
    structuralRisk: "海峡仍处于完全物理封锁状态，伊朗宣布任何未经授权进入者将被击沉。",
    contradictionNote: "美伊双方国内强硬派全面占据主导，政治妥协空间为零。；封锁与反封锁的军事目标不可调和，双方均面临退无可退的压力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第142天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.131 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 98 (Flat): Conflict enters a high-intensity plateau; blockade and direct fire are now the status quo.",
    bannerWarning: "→ Maintain high exposure to Energy, Commodities, and Defensive assets to hedge against global supply shocks.",
    deescalationIntent: "Domestic hardliners in both nations dominate policy; zero room for compromise.",
    structuralRisk: "Full physical blockade of the Strait continues; no commercial traffic recorded.",
    contradictionNote: "Domestic hardliners in both nations dominate policy; zero room for compromise.; Irreconcilable objectives regarding the blockade; both sides face 'point of no …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 142",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
