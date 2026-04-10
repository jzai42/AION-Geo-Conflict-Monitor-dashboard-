export interface RiskFactor {
  name: string;
  score: number;
  prev: number;
  weight: number;
  description: string;
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
  date: "2026-04-10",
  version: "v2.11",
  riskScore: 80,
  prevRiskScore: 80,
  investmentSignal: "谨慎偏空；短线仍可交易降级预期，但不宜追逐风险资产反弹",
  keyChange: "停火叙事尚未转化为霍尔木兹实质复航，能源与航运风险仍在高位震荡",
  keyStats: [
    {
      label: "冲突天数",
      value: "D41",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "↓1",
      unit: "较上期",
      color: "orange"
    },
    {
      label: "油价",
      value: "95–97",
      unit: "美元/桶",
      color: "yellow"
    },
    {
      label: "霍尔木兹",
      value: "受限",
      unit: "状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "高位脆弱降级期",
    targetLevel: "受控降级与有限复航",
    title: "高位脆弱降级期",
    subTitle: "停火存在，但航运恢复仍未验证",
    points: [
      "军事摩擦未完全消失，局部升级风险仍在。",
      "霍尔木兹通航恢复缺乏明确时间表。",
      "能源市场已从恐慌转向高波动等待验证。"
    ],
    note: "当前风险的核心不在口头停火，而在停火是否能被落实为通航恢复与可持续降级。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "局部冲突与威慑仍在，未出现全面新升级。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "通航受限依旧是最高等级风险源。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价回升但仍体现明显风险溢价。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "欧美持续推动斡旋和安全安排。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "存在谈判窗口，但执行与互信不足。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "欧洲领导人呼吁通过谈判稳住停火",
      description: "欧洲方面公开敦促各方推动谈判，以避免停火破裂并尽快恢复霍尔木兹通航。",
      verification: "confirmed",
      timestamp: "2026-04-09T15:31:18Z",
      significance: "强化降级预期，但主要是外交信号",
      highlight: true
    },
    {
      id: "e2",
      title: "油价对停火叙事的乐观情绪部分回吐",
      description: "市场在大幅波动后重新定价，说明对冲突降温的信心不足。",
      verification: "confirmed",
      timestamp: "2026-04-09T10:22:00Z",
      significance: "反映风险溢价未消失",
      highlight: true
    },
    {
      id: "e3",
      title: "霍尔木兹恢复通航仍缺乏明确路径",
      description: "多方报道显示水道依然处于受限或不稳定状态。",
      verification: "confirmed",
      timestamp: "2026-04-09T18:42:19Z",
      significance: "当前最大结构性风险点",
      highlight: true,
      critical: true
    },
    {
      id: "e4",
      title: "伊朗继续以通航条件进行谈判施压",
      description: "伊方将水道恢复与自身要求绑定，增加协议复杂度。",
      verification: "partial",
      timestamp: "2026-04-08T19:36:33Z",
      significance: "提高谈判门槛"
    },
    {
      id: "e5",
      title: "美国寻求盟友协助稳定海运线",
      description: "华盛顿继续推动外部伙伴参与海运安全与风险管理。",
      verification: "single",
      timestamp: "2026-04-09T18:42:19Z",
      significance: "辅助性信号，不单独驱动评分"
    }
  ],
  scoreTrend: [
    {
      date: "04-06",
      score: 80
    },
    {
      date: "04-07",
      score: 80
    },
    {
      date: "04-08",
      score: 80
    },
    {
      date: "04-09",
      score: 80
    },
    {
      date: "04-10",
      score: 80,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "高风险",
      tagColor: "red",
      points: [
        "停火仍脆弱，局部摩擦足以重新点火。",
        "新一轮打击会快速推高综合评分。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "最关键",
      tagColor: "red",
      points: [
        "霍尔木兹通航恢复仍未被验证。",
        "水道一旦反复受限，将继续放大全球油运冲击。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高波动",
      tagColor: "yellow",
      points: [
        "油价从急跌中回升，说明市场不愿完全移除风险溢价。",
        "能源价格对消息面极度敏感。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "观察中",
      tagColor: "blue",
      points: [
        "美伊都在释放边谈边压的双轨信号。",
        "欧洲尝试把停火转换成可执行机制。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "停火叙事与执行落地之间存在明显落差。",
      "霍尔木兹复航条件成为谈判核心争点。"
    ],
    military: [
      "局部军事威慑仍可随时破坏脆弱缓和。",
      "海上控制与能源安全相互捆绑，难以快速拆分。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-10",
  version: "v2.11",
  riskScore: 80,
  prevRiskScore: 80,
  investmentSignal: "Cautiously bearish; short-term de-escalation trades remain possible, but do not chase a risk-asset rebound",
  keyChange: "The ceasefire narrative has not yet translated into actual Hormuz reopening; shipping and energy risks remain in a high-volatility range",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D41",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "↓1",
      unit: "vs Prev",
      color: "orange"
    },
    {
      label: "Oil",
      value: "95–97",
      unit: "USD/bbl",
      color: "yellow"
    },
    {
      label: "Hormuz",
      value: "受限",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "Fragile de-escalation at elevated risk",
    targetLevel: "Managed de-escalation and limited reopening",
    title: "Fragile de-escalation at elevated risk",
    subTitle: "A ceasefire exists, but shipping normalization remains unverified",
    points: [
      "Military friction has not fully disappeared, so localized escalation risk remains.",
      "There is no clear timetable for restoring normal traffic through Hormuz.",
      "Energy markets have moved from panic to a verification-driven high-volatility state."
    ],
    note: "The key risk is not the ceasefire headline itself, but whether it can be implemented as shipping normalization and durable de-escalation."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Localized conflict and deterrence remain active, but no broader new escalation emerged.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Restricted passage remains the top risk source.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices rebounded but still reflect a meaningful risk premium.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. and Europe continue diplomacy and security support.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A negotiation window exists, but implementation and trust remain weak.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "European leaders urged negotiations to stabilize the ceasefire",
      description: "European officials publicly pressed for talks to prevent the ceasefire from unraveling and to reopen Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-09T15:31:18Z",
      significance: "Supports de-escalation, but mostly as a diplomatic signal",
      highlight: true
    },
    {
      id: "e2",
      title: "Oil prices partially retraced the optimism around the ceasefire",
      description: "Markets re-priced sharply after the initial reaction, indicating weak confidence in conflict reduction.",
      verification: "confirmed",
      timestamp: "2026-04-09T10:22:00Z",
      significance: "Shows risk premium is still alive",
      highlight: true
    },
    {
      id: "e3",
      title: "No clear path yet for Hormuz traffic normalization",
      description: "Multiple reports indicate the waterway remains restricted or unstable.",
      verification: "confirmed",
      timestamp: "2026-04-09T18:42:19Z",
      significance: "The main structural risk point today",
      highlight: true,
      critical: true
    },
    {
      id: "e4",
      title: "Iran continues to pressure talks through transit conditions",
      description: "Tehran is tying reopening to its own demands, increasing the complexity of any deal.",
      verification: "partial",
      timestamp: "2026-04-08T19:36:33Z",
      significance: "Raises the negotiation bar"
    },
    {
      id: "e5",
      title: "The United States seeks allied help to stabilize shipping lanes",
      description: "Washington continues to push partners to assist with maritime security and risk management.",
      verification: "single",
      timestamp: "2026-04-09T18:42:19Z",
      significance: "Auxiliary signal; not a standalone score driver"
    }
  ],
  scoreTrend: [
    {
      date: "04-06",
      score: 80
    },
    {
      date: "04-07",
      score: 80
    },
    {
      date: "04-08",
      score: 80
    },
    {
      date: "04-09",
      score: 80
    },
    {
      date: "04-10",
      score: 80,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "High risk",
      tagColor: "red",
      points: [
        "The ceasefire remains fragile, and local friction can reignite it quickly.",
        "Any fresh strike would lift the overall score fast."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Most critical",
      tagColor: "red",
      points: [
        "Hormuz reopening remains unverified.",
        "If passage stays restricted, global oil and LNG disruption will persist."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Volatile",
      tagColor: "yellow",
      points: [
        "Oil has rebounded from the sharp drop, showing risk premium is not gone.",
        "Energy prices remain extremely headline-sensitive."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Watching",
      tagColor: "blue",
      points: [
        "Both sides are signaling talks and pressure at the same time.",
        "Europe is trying to turn the ceasefire into an executable framework."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "There is a clear gap between ceasefire rhetoric and operational implementation.",
      "Hormuz reopening conditions are now the core bargaining issue."
    ],
    military: [
      "Localized military deterrence can still spoil fragile calm at any time.",
      "Maritime control and energy security are tightly coupled and hard to separate quickly."
    ]
  }
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.11 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 80（↓1）：停火叙事尚未转化为霍尔木兹实质复航，能源与航运风险仍在高位震荡",
    bannerWarning: "谨慎偏空；短线仍可交易降级预期，但不宜追逐风险资产反弹",
    deescalationIntent: "停火叙事与执行落地之间存在明显落差。",
    structuralRisk: "通航受限依旧是最高等级风险源。",
    contradictionNote:
      "停火叙事与执行落地之间存在明显落差。；局部军事威慑仍可随时破坏脆弱缓和。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第41天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.11 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 80 (↓1): The ceasefire narrative has not yet translated into actual Hormuz reopening; shipping and energy risks remain in a high-volatility range",
    bannerWarning: "Cautiously bearish; short-term de-escalation trades remain possible, but do not chase a risk-asset rebound",
    deescalationIntent: "There is a clear gap between ceasefire rhetoric and operational implementation.",
    structuralRisk: "Restricted passage remains the top risk source.",
    contradictionNote:
      "There is a clear gap between ceasefire rhetoric and operational implementation.; Localized military deterrence can still spoil fragile calm at any time.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 41",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
