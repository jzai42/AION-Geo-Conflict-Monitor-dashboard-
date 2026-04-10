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
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "中性偏防御：停火框架尚在，但霍尔木兹与能源变量仍需警惕。",
  keyChange: "评分持平；停火谈判延续，但霍尔木兹收费/通行争议仍压制降级预期。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D41",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "yellow"
    },
    {
      label: "油价",
      value: "高位震荡",
      unit: "美元/桶",
      color: "orange"
    },
    {
      label: "霍尔木兹",
      value: "受控开放",
      unit: "状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "4",
    targetLevel: "4",
    title: "高位拉锯期",
    subTitle: "停火与摩擦并存，霍尔木兹仍是核心杠杆",
    points: [
      "停火/会谈框架仍在延续。",
      "霍尔木兹通行与收费条件仍未稳定。",
      "能源市场对局势高度敏感。"
    ],
    note: "当前更像是高压博弈下的脆弱降级，而非实质性结束。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "公开信息未显示新一轮跨越式升级，但边缘摩擦仍在。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通行、收费与安全协调争议延续，航运风险居高不下。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "能源价格仍受地缘风险支撑，但今日未见新确认剧烈冲击。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "联合国与主要大国仍在跟进，但尚未出现新的升级介入。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "会谈安排存在，但受霍尔木兹与安全条款制约，前景仍脆弱。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "伊美停火框架继续延伸",
      description: "公开报道显示，停火安排仍在延续，双方围绕下一步接触继续互动。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "维持降级窗口，但未消除结构性矛盾。",
      highlight: true
    },
    {
      id: "e2",
      title: "伊斯兰堡会谈被公开提及",
      description: "报道提到双方代表团将于周五在伊斯兰堡继续讨论最终协议。",
      verification: "partial",
      timestamp: "2026-04-10",
      significance: "对谈判前景形成正向支撑。",
      highlight: true
    },
    {
      id: "e3",
      title: "霍尔木兹通行与收费争议延续",
      description: "伊朗继续将通行条件与收费安排作为关键筹码。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "直接影响能源与航运风险溢价。",
      highlight: true
    },
    {
      id: "e4",
      title: "联合国层面相关决议受阻",
      description: "安理会围绕霍尔木兹问题的决议仍未形成有效突破。",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "显示大国博弈仍在，但未升级为直接冲突。"
    },
    {
      id: "e5",
      title: "能源市场维持高波动预期",
      description: "油市对局势仍保持高敏感度，但没有新确认的极端波动。",
      verification: "single",
      timestamp: "2026-04-10",
      significance: "单源迹象，不作为评分驱动。"
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "高压维持",
      tagColor: "red",
      points: [
        "未见确认的新一轮大规模升级。",
        "边缘摩擦与威慑表述仍持续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "核心变量",
      tagColor: "red",
      points: [
        "通行规则与收费争议未解。",
        "航运风险仍是冲突外溢的首要通道。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高位震荡",
      tagColor: "orange",
      points: [
        "油价继续受地缘风险定价支撑。",
        "未出现足以改写趋势的新确认冲击。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "脆弱降级",
      tagColor: "yellow",
      points: [
        "会谈安排释放有限积极信号。",
        "但强硬表态仍限制市场对和解的定价。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "停火谈判需要稳定安排，但双方都在争夺谈判条件主导权。",
      "霍尔木兹通行与收费争议使政治降级难以快速兑现。"
    ],
    military: [
      "海空威慑仍是主要施压工具，但尚未升级为新的全面打击。",
      "有限停火与局部摩擦并存，形成高压但未失控的军事态势。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-10",
  version: "v2.10",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "Neutral to defensive: the ceasefire framework still exists, but Hormuz and energy risks remain.",
  keyChange: "Score unchanged; talks continue, but Hormuz fee/transit disputes still cap de-escalation hopes.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D41",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "持平",
      unit: "vs Prev",
      color: "yellow"
    },
    {
      label: "Oil",
      value: "High-range volatility",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "Hormuz",
      value: "Managed reopening",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "4",
    targetLevel: "4",
    title: "High-stakes stalemate",
    subTitle: "Ceasefire and friction coexist, with Hormuz still the core lever",
    points: [
      "The ceasefire/talks framework is still carrying forward.",
      "Transit and fee conditions in Hormuz remain unstable.",
      "Energy markets stay highly sensitive to the conflict."
    ],
    note: "This looks more like fragile de-escalation under pressure than a genuine end-state."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "No new cross-cutting escalation is confirmed, but peripheral friction persists.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transit, fee, and safety-coordination disputes remain unresolved, keeping shipping risk elevated.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Energy prices remain supported by geopolitical risk, but no new confirmed shock emerged today.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The UN and major powers remain engaged, but no new intervention escalation is visible.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Talks are on the table, yet the outlook remains fragile under Hormuz and security constraints.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "US-Iran ceasefire framework continues",
      description: "Public reporting indicates the ceasefire arrangement is still in effect while both sides continue to interact over next steps.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "Keeps a de-escalation window open, but does not remove the structural dispute.",
      highlight: true
    },
    {
      id: "e2",
      title: "Islamabad talks publicly referenced",
      description: "Reports say delegations are expected to continue discussions in Islamabad on Friday over a final agreement.",
      verification: "partial",
      timestamp: "2026-04-10",
      significance: "Supports the diplomatic track.",
      highlight: true
    },
    {
      id: "e3",
      title: "Hormuz transit and fee dispute persists",
      description: "Iran continues to use transit conditions and fee arrangements as a key lever.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "Directly affects energy and shipping risk premia.",
      highlight: true
    },
    {
      id: "e4",
      title: "UN-level resolution remains blocked",
      description: "Security Council efforts related to Hormuz still have not produced a breakthrough.",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "Shows major-power contestation without direct conflict escalation."
    },
    {
      id: "e5",
      title: "Energy markets remain volatility-prone",
      description: "Oil markets remain highly sensitive to the situation, but there is no newly confirmed extreme swing.",
      verification: "single",
      timestamp: "2026-04-10",
      significance: "Single-source signal only; not used to drive the score."
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "High pressure held",
      tagColor: "red",
      points: [
        "No confirmed new large-scale escalation.",
        "Peripheral friction and deterrent signaling continue."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Core variable",
      tagColor: "red",
      points: [
        "Transit rules and fee disputes remain unresolved.",
        "Shipping risk is still the primary spillover channel."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Volatile at high levels",
      tagColor: "orange",
      points: [
        "Oil prices continue to be supported by geopolitical risk.",
        "No newly confirmed shock that would reset the trend emerged."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Fragile de-escalation",
      tagColor: "yellow",
      points: [
        "Talks and scheduling provide a limited positive signal.",
        "But hardline messaging still limits market pricing for peace."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "A ceasefire track needs stable arrangements, but both sides are competing for control over the negotiation terms.",
      "The Hormuz transit and fee dispute makes political de-escalation hard to bank quickly."
    ],
    military: [
      "Sea and air deterrence remain the main pressure tools, but they have not escalated into a new broad strike campaign.",
      "Limited ceasefire and localized friction coexist, creating a high-pressure but not yet out-of-control military posture."
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
      "综合评分 64（持平）：评分持平；停火谈判延续，但霍尔木兹收费/通行争议仍压制降级预期。",
    bannerWarning: "中性偏防御：停火框架尚在，但霍尔木兹与能源变量仍需警惕。",
    deescalationIntent: "停火谈判需要稳定安排，但双方都在争夺谈判条件主导权。",
    structuralRisk: "通行、收费与安全协调争议延续，航运风险居高不下。",
    contradictionNote:
      "停火谈判需要稳定安排，但双方都在争夺谈判条件主导权。；海空威慑仍是主要施压工具，但尚未升级为新的全面打击。",
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
      "Composite 64 (持平): Score unchanged; talks continue, but Hormuz fee/transit disputes still cap de-escalation hopes.",
    bannerWarning: "Neutral to defensive: the ceasefire framework still exists, but Hormuz and energy risks remain.",
    deescalationIntent: "A ceasefire track needs stable arrangements, but both sides are competing for c…",
    structuralRisk: "Transit, fee, and safety-coordination disputes remain unresolved, keeping shipping risk elevated.",
    contradictionNote:
      "A ceasefire track needs stable arrangements, but both sides are competing for control over the negotiation terms.; Sea and air deterrence remain the main press…",
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
