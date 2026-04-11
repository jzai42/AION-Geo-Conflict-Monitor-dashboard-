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
  date: "2026-04-11",
  version: "v2.11",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "高波动、偏防御；适合降低方向性押注，关注油价与航运头条驱动的短线反复。",
  keyChange: "美伊进入巴基斯坦会谈阶段，说明冲突继续降温，但霍尔木兹与油价风险仍未解除。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D42",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "约95",
      unit: "美元/桶",
      color: "amber"
    },
    {
      label: "霍尔木兹",
      value: "受限",
      unit: "状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "有限降级",
    title: "脆弱停火下的谈判窗口",
    subTitle: "冲突进入第 42 天，外交渠道打开，但海峡与油市风险仍高",
    points: [
      "美伊在巴基斯坦开启会谈，说明停火仍在延续。",
      "霍尔木兹开放条件尚未彻底落定。",
      "油价较冲突高点回落，但风险溢价仍未消失。"
    ],
    note: "当前更像是“边谈边控风险”的阶段，而非稳固和平。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "有限军事对抗已被会谈阶段所替代，但停火仍脆弱。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通行受条件约束，航运风险明显高于常态。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价从战时高点回落，但仍处高敏感区间。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "地区斡旋与联合国博弈仍在，但未升级为直接军事介入。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "谈判渠道存在，但推进有限，结果仍不确定。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "evt-20260411-1",
      title: "美伊在巴基斯坦开启会谈",
      description: "双方在脆弱停火背景下开始直接谈判。",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "high",
      highlight: true
    },
    {
      id: "evt-20260411-2",
      title: "停火仍被描述为脆弱",
      description: "媒体称谈判推进前仍存在条件与障碍。",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    },
    {
      id: "evt-20260411-3",
      title: "油价维持回落态势",
      description: "市场对停火与会谈给出缓和反应，但价格仍高于战前。",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    },
    {
      id: "evt-20260411-4",
      title: "霍尔木兹通行争议未消",
      description: "公开报道继续聚焦海峡开放条件和通行摩擦。",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "high",
      highlight: true
    },
    {
      id: "evt-20260411-5",
      title: "第三方斡旋持续",
      description: "巴基斯坦继续充当关键中介与会谈地点。",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    }
  ],
  scoreTrend: [
    {
      date: "04-07",
      score: 64
    },
    {
      date: "04-08",
      score: 64
    },
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "降温但未终结",
      tagColor: "yellow",
      points: [
        "无新一轮大规模交火确认。",
        "会谈取代了立即升级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "仍受限",
      tagColor: "red",
      points: [
        "海峡开放条件仍是争议焦点。",
        "航运恢复并未完全正常化。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高位回落",
      tagColor: "amber",
      points: [
        "油价从战时高点回落。",
        "市场仍对突发消息高度敏感。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谨慎接触",
      tagColor: "blue",
      points: [
        "谈判本身释放降级信号。",
        "但双方仍保留强硬表述与条件。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "停火需要尽快制度化，但双方互信仍不足。",
      "第三方斡旋有效，却无法替代双边实质妥协。"
    ],
    military: [
      "直接交火暂缓，但威慑与再升级风险未消。",
      "霍尔木兹仍是最敏感的军事—航运联动点。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-11",
  version: "v2.11",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "High volatility, defensive bias; reduce directional bets and watch oil and shipping headlines for short-term swings.",
  keyChange: "The US and Iran have entered talks in Pakistan, extending de-escalation, but Hormuz and oil risks remain unresolved.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D42",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "~95",
      unit: "USD/bbl",
      color: "amber"
    },
    {
      label: "Hormuz",
      value: "Constrained",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Limited De-escalation",
    title: "A Negotiation Window Under a Fragile Ceasefire",
    subTitle: "Day 42 of the conflict: diplomacy is open, but shipping and energy risks remain elevated",
    points: [
      "The US and Iran began talks in Pakistan, showing the ceasefire is still holding.",
      "Hormuz reopening conditions remain unsettled.",
      "Oil has retreated from war highs, but the risk premium has not fully vanished."
    ],
    note: "The situation is best described as managing risk while negotiating, not as durable peace."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Limited combat has given way to talks, but the ceasefire remains fragile.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transit remains condition-bound and shipping risk is still materially elevated.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil has fallen from wartime highs but is still in a sensitive range.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Regional mediation and UN maneuvering continue, but not direct military involvement.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A negotiation channel exists, but progress remains limited and uncertain.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "evt-20260411-1",
      title: "US-Iran talks begin in Pakistan",
      description: "The two sides opened direct negotiations under a fragile ceasefire.",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "high",
      highlight: true
    },
    {
      id: "evt-20260411-2",
      title: "Ceasefire still described as fragile",
      description: "Reporting said the talks still face preconditions and obstacles.",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    },
    {
      id: "evt-20260411-3",
      title: "Oil prices remain on a downtrend from war highs",
      description: "Markets reacted to the ceasefire, but prices remain above pre-war levels.",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    },
    {
      id: "evt-20260411-4",
      title: "Hormuz transit dispute persists",
      description: "Public reporting continued to focus on reopening conditions and transit friction.",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "high",
      highlight: true
    },
    {
      id: "evt-20260411-5",
      title: "Third-party mediation continues",
      description: "Pakistan remains a key host and intermediary.",
      verification: "confirmed",
      timestamp: "2026-04-11",
      significance: "medium"
    }
  ],
  scoreTrend: [
    {
      date: "04-07",
      score: 64
    },
    {
      date: "04-08",
      score: 64
    },
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 64,
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
        "No new large-scale exchange was confirmed.",
        "Talks have replaced immediate escalation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Still constrained",
      tagColor: "red",
      points: [
        "Reopening conditions remain disputed.",
        "Transit has not fully normalized."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Off highs",
      tagColor: "amber",
      points: [
        "Oil has pulled back from wartime peaks.",
        "Prices remain highly sensitive to headlines."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Cautious contact",
      tagColor: "blue",
      points: [
        "The talks themselves are a de-escalatory signal.",
        "Yet both sides still preserve hard lines and conditions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The ceasefire needs to become institutionalized, but mutual trust is still weak.",
      "Third-party mediation helps, but cannot replace real bilateral compromise."
    ],
    military: [
      "Direct fire has paused, but deterrence and re-escalation risk remain.",
      "Hormuz remains the most sensitive military-shipping linkage point."
    ]
  }
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月11日节点",
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
      "综合评分 64（持平）：美伊进入巴基斯坦会谈阶段，说明冲突继续降温，但霍尔木兹与油价风险仍未解除。",
    bannerWarning: "高波动、偏防御；适合降低方向性押注，关注油价与航运头条驱动的短线反复。",
    deescalationIntent: "停火需要尽快制度化，但双方互信仍不足。",
    structuralRisk: "海峡通行受条件约束，航运风险明显高于常态。",
    contradictionNote:
      "停火需要尽快制度化，但双方互信仍不足。；直接交火暂缓，但威慑与再升级风险未消。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第42天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 11 Node",
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
      "Composite 64 (Flat): The US and Iran have entered talks in Pakistan, extending de-escalation, but Hormuz and oil risks remain unresolved.",
    bannerWarning: "High volatility, defensive bias; reduce directional bets and watch oil and shipping headlines for short-term swings.",
    deescalationIntent: "The ceasefire needs to become institutionalized, but mutual trust is still weak.",
    structuralRisk: "Transit remains condition-bound and shipping risk is still materially elevated.",
    contradictionNote:
      "The ceasefire needs to become institutionalized, but mutual trust is still weak.; Direct fire has paused, but deterrence and re-escalation risk remain.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 42",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
