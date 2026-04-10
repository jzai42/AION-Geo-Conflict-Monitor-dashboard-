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
  version: "v2.12",
  riskScore: 80,
  prevRiskScore: 80,
  investmentSignal: "谨慎偏防御，维持高地缘风险溢价配置。",
  keyChange: "停火与谈判仍在推进，但霍尔木兹通行恢复不稳，油价回落后仍高度敏感，综合风险保持高位不变。",
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
      color: "gray"
    },
    {
      label: "油价",
      value: "约 95–103",
      unit: "美元/桶",
      color: "orange"
    },
    {
      label: "霍尔木兹",
      value: "低流量 / 高摩擦",
      unit: "状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "4",
    targetLevel: "5",
    title: "高压拉锯期",
    subTitle: "停火存在但执行脆弱，航运与能源价格仍处高敏感状态",
    points: [
      "谈判继续，但条件交换复杂。",
      "霍尔木兹恢复通行仍不稳，市场定价偏悲观。",
      "军事外溢风险未消失，仍可能被局部事件重新点燃。"
    ],
    note: "当前更像高压管控而非真正降级，风险中枢仍高。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "未见统一确认的大规模新打击，但局势仍脆弱。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "通行恢复有限，航运仍受政治条件约束。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价回落但仍处高敏感区间。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "欧洲与美国均继续推动降温与谈判。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "存在谈判窗口，但执行与条件分歧较大。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "霍尔木兹谈判继续推进",
      description: "公开报道显示，围绕停火与重开霍尔木兹的谈判仍在进行，伊方坚持若干附带条件。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e2",
      title: "欧洲继续推动政治解决",
      description: "欧洲领导人呼吁尽快稳定停火并恢复航运秩序。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium"
    },
    {
      id: "e3",
      title: "油价高位回落但仍敏感",
      description: "停火预期推动油价回撤，但市场仍担忧霍尔木兹流量不足。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e4",
      title: "EIA 将霍尔木兹关闭纳入供给假设",
      description: "美国能源部/EIA 公开材料继续把霍尔木兹风险视为供给冲击核心变量。",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "high"
    },
    {
      id: "e5",
      title: "4月10日谈判节点",
      description: "报道提及 4 月 10 日伊朗与美方谈判安排。",
      verification: "single",
      timestamp: "2026-04-10",
      significance: "low"
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
      tag: "高压但受控",
      tagColor: "red",
      points: [
        "未见统一确认的新一轮大规模升级。",
        "局势仍可能因局部事件快速反转。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "通行受限",
      tagColor: "red",
      points: [
        "通行恢复不完全，规则仍有摩擦。",
        "少量恢复不等于风险解除。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高波动",
      tagColor: "orange",
      points: [
        "油价较高位回落，但仍在敏感区。",
        "市场继续交易地缘风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谈判与威慑并行",
      tagColor: "yellow",
      points: [
        "美方释放谈判与施压双重信号。",
        "伊方强调对霍尔木兹的规则主导权。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "停火需要条件交换，但各方都不愿先让步。",
      "通行恢复与政治谈判被绑定，导致降级速度受限。"
    ],
    military: [
      "军事打击暂未全面升级，但威慑仍在持续。",
      "霍尔木兹航运压力成为替代性施压手段。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-10",
  version: "v2.12",
  riskScore: 80,
  prevRiskScore: 80,
  investmentSignal: "Cautious defensive stance; maintain a premium for geopolitical risk.",
  keyChange: "Ceasefire talks are still moving, but Hormuz transit remains unstable and oil remains highly sensitive after the pullback, keeping the composite risk unchanged at a high level.",
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
      color: "gray"
    },
    {
      label: "Oil",
      value: "约 95–103",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "Hormuz",
      value: "低流量 / 高摩擦",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "4",
    targetLevel: "5",
    title: "High-pressure stalemate",
    subTitle: "A ceasefire exists on paper, but implementation is fragile and shipping/energy prices remain highly sensitive.",
    points: [
      "Talks continue, but the exchange of conditions is complex.",
      "Hormuz transit recovery remains shaky; market pricing stays pessimistic.",
      "Military spillover risk has not disappeared and could be reignited by a local incident."
    ],
    note: "This is more a regime of tight control than true de-escalation; the risk center remains elevated."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "No newly confirmed large-scale strike, but the situation remains fragile.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Transit recovery is limited and still constrained by political conditions.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil has pulled back, but remains in a highly sensitive range.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Europe and the United States continue to push for de-escalation and talks.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A negotiation window exists, but implementation and condition gaps are substantial.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "Hormuz negotiations continue",
      description: "Public reporting indicates talks on the ceasefire and reopening Hormuz are still underway, with Tehran maintaining several attached conditions.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e2",
      title: "Europe keeps pushing for a political settlement",
      description: "European leaders called for rapid stabilization of the ceasefire and restoration of shipping order.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium"
    },
    {
      id: "e3",
      title: "Oil falls from highs but remains sensitive",
      description: "Ceasefire hopes pushed oil lower, yet markets still worry that Hormuz flow will not fully normalize.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e4",
      title: "EIA keeps Hormuz closure in supply assumptions",
      description: "The U.S. Energy Department / EIA continues to treat Hormuz disruption as a core supply-shock variable in its public materials.",
      verification: "confirmed",
      timestamp: "2026-04-07",
      significance: "high"
    },
    {
      id: "e5",
      title: "April 10 negotiation milestone",
      description: "Reporting mentions a scheduled April 10 Iran-U.S. negotiation point.",
      verification: "single",
      timestamp: "2026-04-10",
      significance: "low"
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
      tag: "High pressure, controlled",
      tagColor: "red",
      points: [
        "No newly confirmed large-scale escalation was seen.",
        "The situation could still reverse quickly because of a local incident."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Transit constrained",
      tagColor: "red",
      points: [
        "Transit recovery remains incomplete and still carries friction.",
        "Partial recovery does not mean risk is gone."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "High volatility",
      tagColor: "orange",
      points: [
        "Oil has pulled back from highs, but remains in a sensitive zone.",
        "Markets continue to price a geopolitical risk premium."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Talks plus deterrence",
      tagColor: "yellow",
      points: [
        "Washington is sending both negotiation and pressure signals.",
        "Tehran continues to emphasize rule-setting power over Hormuz."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Ceasefire requires condition swapping, but neither side wants to concede first.",
      "Transit normalization is tied to political talks, slowing de-escalation."
    ],
    military: [
      "Military strikes have not fully escalated, but deterrence remains active.",
      "Pressure on Hormuz shipping is functioning as an alternative coercive tool."
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.12 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 80（持平）：停火与谈判仍在推进，但霍尔木兹通行恢复不稳，油价回落后仍高度敏感，综合风险保持高位不变。",
    bannerWarning: "谨慎偏防御，维持高地缘风险溢价配置。",
    deescalationIntent: "停火需要条件交换，但各方都不愿先让步。",
    structuralRisk: "通行恢复有限，航运仍受政治条件约束。",
    contradictionNote:
      "停火需要条件交换，但各方都不愿先让步。；军事打击暂未全面升级，但威慑仍在持续。",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.12 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 80 (持平): Ceasefire talks are still moving, but Hormuz transit remains unstable and oil remains highly sensitive after the pullback, keeping the comp…",
    bannerWarning: "Cautious defensive stance; maintain a premium for geopolitical risk.",
    deescalationIntent: "Ceasefire requires condition swapping, but neither side wants to concede first.",
    structuralRisk: "Transit recovery is limited and still constrained by political conditions.",
    contradictionNote:
      "Ceasefire requires condition swapping, but neither side wants to concede first.; Military strikes have not fully escalated, but deterrence remains active.",
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
