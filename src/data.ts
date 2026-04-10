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
  date: "2026-04-09",
  version: "v2.10",
  riskScore: 56,
  prevRiskScore: 56,
  investmentSignal: "谨慎观望",
  keyChange: "美国增派舰队、霍尔木兹局部安全收紧，整体紧张度提升。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D179",
      unit: "2月28日起",
      color: "orange"
    },
    {
      label: "评分变化",
      value: "+4",
      unit: "较上期",
      color: "red"
    },
    {
      label: "油价",
      value: "92.1",
      unit: "$/桶",
      color: "blue"
    },
    {
      label: "霍尔木兹",
      value: "受限",
      unit: "<10% 常态",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "对峙加剧",
    targetLevel: "边缘升级",
    title: "美伊对峙再升级",
    subTitle: "地区局势持续高压",
    points: [
      "美方扩大地区盟友军事协调，霍尔木兹局部加强巡防",
      "伊朗海军实施新一轮舰队演示性巡逻"
    ],
    note: "军事和舆论均趋强硬，但未见高烈度冲突爆发"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3.2,
      prev: 3,
      weight: 0.2,
      description: "美方增兵波斯湾，伊朗高频警戒",
      status: "FAST",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3.1,
      prev: 2.8,
      weight: 0.2,
      description: "部分油轮通行延误，安保风险升高",
      status: "FAST",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 2.8,
      prev: 2.8,
      weight: 0.2,
      description: "油价小幅上涨，市场观望",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美对盟友压力上升，未见新直接介入",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "双方态度强硬，暂无实质性对话",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "20260409-1",
      title: "美国宣布向波斯湾增派海军舰队强化姿态",
      description: "美国防部公开宣布向波斯湾增派舰队，宣称保障航道安全，是对地区威胁的防御措施。",
      verification: "confirmed",
      timestamp: "2026-04-09T07:15:00Z",
      significance: "加剧军事对峙",
      highlight: true,
      critical: true
    },
    {
      id: "20260409-2",
      title: "霍尔木兹海峡出现伊朗军舰高频巡逻报告",
      description: "多家媒体报道霍尔木兹近期伊朗军舰巡逻频率上升，对过境商船进行监控。",
      verification: "partial",
      timestamp: "2026-04-09T09:40:00Z",
      significance: "区域海上局势趋紧"
    },
    {
      id: "20260409-3",
      title: "伊朗领导人重申不会在“高压之下让步”",
      description: "伊朗最高领导人公开表态，批评西方制裁与军事威胁，坚持现有政策不动摇。",
      verification: "confirmed",
      timestamp: "2026-04-09T11:05:00Z",
      significance: "表明谈判缺乏突破口"
    }
  ],
  scoreTrend: [
    {
      date: "04-05",
      score: 52
    },
    {
      date: "04-06",
      score: 56
    },
    {
      date: "04-07",
      score: 58
    },
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 56,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "加强巡防",
      tagColor: "orange",
      points: [
        "美军增派航母打击群进入波斯湾",
        "伊朗防空部队启动高警戒"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "受限",
      tagColor: "yellow",
      points: [
        "局部通行受阻，部分油轮延误"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "油价走高",
      tagColor: "blue",
      points: [
        "国际油价小幅上涨至$92.1"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "强硬表态",
      tagColor: "red",
      points: [
        "双方主要领导人均发表强硬讲话，缺乏降级氛围"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国遏制伊朗区域影响力",
      "伊朗反对制裁与军事威慑"
    ],
    military: [
      "地区盟友介入与海上力量竞逐"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-09",
  version: "v2.10",
  riskScore: 56,
  prevRiskScore: 56,
  investmentSignal: "Cautious observation",
  keyChange: "US increases naval deployment, tighter Hormuz security, overall tension up.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D179",
      unit: "Since Feb 28",
      color: "orange"
    },
    {
      label: "Score Change",
      value: "+4",
      unit: "vs Prev",
      color: "red"
    },
    {
      label: "Oil",
      value: "92.1",
      unit: "$/barrel",
      color: "blue"
    },
    {
      label: "Hormuz",
      value: "受限",
      unit: "<10% of normal",
      color: "yellow"
    }
  ],
  warPhase: {
    level: "Escalated Stand-Off",
    targetLevel: "Edge Escalation",
    title: "US-Iran Standoff Escalates",
    subTitle: "Regional tensions remain high",
    points: [
      "US expands regional allied military coordination, tightens Hormuz maritime security",
      "Iranian Navy conducts new round of demonstrative patrols"
    ],
    note: "Both military and rhetoric intensify, but no high-intensity direct clash yet observed"
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3.2,
      prev: 3,
      weight: 0.2,
      description: "US troop surge in Gulf, Iranian alertness up",
      status: "FAST",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 3.1,
      prev: 2.8,
      weight: 0.2,
      description: "Partial tanker delays, security risk elevated",
      status: "FAST",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 2.8,
      prev: 2.8,
      weight: 0.2,
      description: "Oil price up modestly, market cautious",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "More pressure on allies, no new direct involvement",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Stances harden, no substantive dialogue",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "20260409-1",
      title: "US announces new naval deployment to Persian Gulf",
      description: "US DoD confirms additional fleet sent to Persian Gulf to secure maritime routes and deter threats.",
      verification: "confirmed",
      timestamp: "2026-04-09T07:15:00Z",
      significance: "Heightens military stand-off",
      highlight: true,
      critical: true
    },
    {
      id: "20260409-2",
      title: "Increased Iranian Navy Patrols in Hormuz reported",
      description: "Multiple outlets report high-frequency Iranian navy patrols, close monitoring of shipping.",
      verification: "partial",
      timestamp: "2026-04-09T09:40:00Z",
      significance: "Maritime tensions rise"
    },
    {
      id: "20260409-3",
      title: "Iranian leader reiterates 'no concession under pressure'",
      description: "Iran’s Supreme Leader reaffirms resistance to Western sanctions and military threats, ruling out policy change.",
      verification: "confirmed",
      timestamp: "2026-04-09T11:05:00Z",
      significance: "No new basis for dialogue"
    }
  ],
  scoreTrend: [
    {
      date: "04-05",
      score: 52
    },
    {
      date: "04-06",
      score: 56
    },
    {
      date: "04-07",
      score: 58
    },
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 56,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Reinforced Security",
      tagColor: "orange",
      points: [
        "US deploys new carrier group to Gulf",
        "Iran raises air defense alert"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Restricted",
      tagColor: "yellow",
      points: [
        "Partial passage disruption, tanker delays"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Oil Price Up",
      tagColor: "blue",
      points: [
        "Brent oil price rises to $92.1"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Hawkish",
      tagColor: "red",
      points: [
        "Both sides' top leaders give tough speeches, de-escalation atmosphere absent"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US containment of Iranian regional influence",
      "Iran’s opposition to sanctions and military pressure"
    ],
    military: [
      "Regional allies’ involvement and maritime power contest"
    ]
  }
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月9日节点",
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
      "综合评分 56（+4）：美国增派舰队、霍尔木兹局部安全收紧，整体紧张度提升。",
    bannerWarning: "谨慎观望",
    deescalationIntent: "美国遏制伊朗区域影响力",
    structuralRisk: "部分油轮通行延误，安保风险升高",
    contradictionNote:
      "美国遏制伊朗区域影响力；地区盟友介入与海上力量竞逐",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第179天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 9 Node",
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
      "Composite 56 (+4): US increases naval deployment, tighter Hormuz security, overall tension up.",
    bannerWarning: "Cautious observation",
    deescalationIntent: "US containment of Iranian regional influence",
    structuralRisk: "Partial tanker delays, security risk elevated",
    contradictionNote:
      "US containment of Iranian regional influence; Regional allies’ involvement and maritime power contest",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 179",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
