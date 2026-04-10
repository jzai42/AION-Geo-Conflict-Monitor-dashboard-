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
  version: "v2.10",
  riskScore: 80,
  prevRiskScore: 64,
  investmentSignal: "高风险，偏防御",
  keyChange: "停火与谈判信号继续释放，但霍尔木兹复航执行与海峡通行恢复仍未完全确认，导致风险从极端冲击回落到高位震荡。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D41",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "↑14",
      unit: "较上期",
      color: "orange"
    },
    {
      label: "油价",
      value: "$95下方波动",
      unit: "美元/桶",
      color: "yellow"
    },
    {
      label: "霍尔木兹",
      value: "部分缓和",
      unit: "状态",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "3",
    targetLevel: "2",
    title: "高压停火期",
    subTitle: "从全面升级转入条件性降温，但执行链条仍脆弱",
    points: [
      "白宫称伊朗已同意停火并重开霍尔木兹。",
      "欧洲与多边外交开始集中推动海峡复航与谈判落地。",
      "海峡通行、油价与军事威慑三者仍相互牵制。"
    ],
    note: "当前更像是“高压停火”而非稳定和平，任何执行偏差都可能重回升级轨道。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "直接大规模升级减弱，但停火脆弱，仍存在再打击风险。",
      status: "FAST",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "海峡复航条件和实际通行仍不稳定，是最大单点风险。",
      status: "FAST",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "油价从极端高位回落，但冲突溢价仍未消失。",
      status: "FAST",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美国主导框架，欧洲、俄中均在不同层面介入。",
      status: "FAST",
      change: "up"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "谈判窗口打开，但条件复杂、执行不确定。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "白宫称伊朗同意停火并重开霍尔木兹",
      description: "白宫4月8日发布声明，称伊朗已同意停火并恢复霍尔木兹海峡开放。",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e2",
      title: "欧洲领导人呼吁通过谈判稳定海峡",
      description: "AP报道显示，欧洲方面希望借外交压力推动停火巩固和海峡复航。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium"
    },
    {
      id: "e3",
      title: "伊朗仍对海峡通行条件施压",
      description: "AP与相关报道显示，伊朗对通行安排和控制权仍未完全让步。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e4",
      title: "伊美被报将于4月10日在伊斯兰堡会谈",
      description: "Al Jazeera报道称双方将继续进行后续谈判。",
      verification: "partial",
      timestamp: "2026-04-10",
      significance: "medium"
    },
    {
      id: "e5",
      title: "油价回落、股市反弹",
      description: "市场对停火和复航预期作出正向反应。",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "medium"
    }
  ],
  scoreTrend: [
    {
      date: "04-06",
      score: 68
    },
    {
      date: "04-07",
      score: 68
    },
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 64
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
      tag: "降温但未解除",
      tagColor: "yellow",
      points: [
        "大规模升级暂缓，但军事威慑仍在。",
        "停火若失效，报复链条可快速重启。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "最高风险点",
      tagColor: "red",
      points: [
        "复航是当前最重要的验证目标。",
        "规则不清会继续压制船运与保险恢复。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高位震荡",
      tagColor: "orange",
      points: [
        "油价回落但仍带冲突溢价。",
        "若复航延迟，价格可能重新上冲。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "条件性降级",
      tagColor: "blue",
      points: [
        "美方口径强调胜利与条件性停火。",
        "伊方口径保留谈判筹码，未完全松绑。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "声明性停火快于执行性停火。",
      "各方都在争夺复航与制裁谈判的解释权。"
    ],
    military: [
      "威慑仍在，海峡与能源设施仍是潜在触发器。",
      "任何单点误判都可能把局势拉回升级轨道。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-10",
  version: "v2.10",
  riskScore: 80,
  prevRiskScore: 64,
  investmentSignal: "High risk, defensive bias",
  keyChange: "Ceasefire and negotiation signals continue, but implementation of Hormuz reopening and actual shipping normalization remain unconfirmed, keeping risk elevated and volatile.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D41",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "↑14",
      unit: "vs Prev",
      color: "orange"
    },
    {
      label: "Oil",
      value: "$95下方波动",
      unit: "USD/bbl",
      color: "yellow"
    },
    {
      label: "Hormuz",
      value: "部分缓和",
      unit: "status",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "3",
    targetLevel: "2",
    title: "High-pressure ceasefire",
    subTitle: "The conflict is shifting from direct escalation to conditional de-escalation, but execution remains fragile.",
    points: [
      "The White House says Iran has agreed to a ceasefire and to reopen Hormuz.",
      "European and multilateral diplomacy is now focused on making the reopening real.",
      "Shipping, oil prices, and military deterrence remain tightly linked."
    ],
    note: "This is better described as a high-pressure ceasefire than stable peace; any implementation failure could pull the situation back into escalation."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Direct large-scale escalation has eased, but the ceasefire is fragile and strike risks remain.",
      status: "FAST",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "The reopening terms and real traffic normalization remain unstable; this is the top single-point risk.",
      status: "FAST",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Oil has retreated from extremes, but the conflict premium has not disappeared.",
      status: "FAST",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "The U.S. is setting the frame, while Europe, Russia, and China are engaged at different levels.",
      status: "FAST",
      change: "up"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A diplomatic window exists, but terms are complex and execution is uncertain.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "White House says Iran agreed to a ceasefire and to reopen Hormuz",
      description: "A White House statement on April 8 said Iran agreed to a ceasefire and to restore access through the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e2",
      title: "European leaders push for diplomatic stabilization",
      description: "AP reporting shows Europe wants to use diplomatic pressure to reinforce the ceasefire and reopen shipping lanes.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium"
    },
    {
      id: "e3",
      title: "Iran still presses on transit conditions",
      description: "AP and related reporting indicate Iran has not fully conceded on the terms of passage and control.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e4",
      title: "Iran-US talks reported for Islamabad on April 10",
      description: "Al Jazeera reported that both sides are expected to continue follow-on talks.",
      verification: "partial",
      timestamp: "2026-04-10",
      significance: "medium"
    },
    {
      id: "e5",
      title: "Oil prices fall and equities rebound",
      description: "Markets reacted positively to ceasefire and reopening expectations.",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "medium"
    }
  ],
  scoreTrend: [
    {
      date: "04-06",
      score: 68
    },
    {
      date: "04-07",
      score: 68
    },
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 64
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
      tag: "Cooling but unresolved",
      tagColor: "yellow",
      points: [
        "Large-scale escalation has paused, but military deterrence remains in place.",
        "If the ceasefire fails, the retaliation chain can restart quickly."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Top risk point",
      tagColor: "red",
      points: [
        "Reopening is the most important verification target right now.",
        "Unclear rules will continue to suppress shipping and insurance recovery."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "High-level volatility",
      tagColor: "orange",
      points: [
        "Oil has retreated but still carries a conflict premium.",
        "If reopening is delayed, prices could spike again."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Conditional de-escalation",
      tagColor: "blue",
      points: [
        "U.S. messaging emphasizes victory and conditional ceasefire.",
        "Iranian messaging preserves leverage and has not fully relaxed."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Declarative ceasefire is moving faster than operational ceasefire.",
      "All sides are competing over the interpretation of reopening and sanctions talks."
    ],
    military: [
      "Deterrence remains, with Hormuz and energy infrastructure still potential triggers.",
      "Any single-point miscalculation could drag the situation back toward escalation."
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.10 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 80（↑14）：停火与谈判信号继续释放，但霍尔木兹复航执行与海峡通行恢复仍未完全确认，导致风险从极端冲击回落到高位震荡。",
    bannerWarning: "高风险，偏防御",
    deescalationIntent: "声明性停火快于执行性停火。",
    structuralRisk: "海峡复航条件和实际通行仍不稳定，是最大单点风险。",
    contradictionNote:
      "声明性停火快于执行性停火。；威慑仍在，海峡与能源设施仍是潜在触发器。",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.10 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 80 (↑14): Ceasefire and negotiation signals continue, but implementation of Hormuz reopening and actual shipping normalization remain unconfirmed, ke…",
    bannerWarning: "High risk, defensive bias",
    deescalationIntent: "Declarative ceasefire is moving faster than operational ceasefire.",
    structuralRisk: "The reopening terms and real traffic normalization remain unstable; this is the top single-point ri…",
    contradictionNote:
      "Declarative ceasefire is moving faster than operational ceasefire.; Deterrence remains, with Hormuz and energy infrastructure still potential triggers.",
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
