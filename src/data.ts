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
  version: "v2.11",
  riskScore: 56,
  prevRiskScore: 56,
  investmentSignal: "高风险观望，能源资产波动需警惕突发风险。",
  keyChange: "整体局势稳定，无重大变量驱动评分变化。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D40",
      unit: "2月28日起",
      color: "orange"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "87.1",
      unit: "USD/桶",
      color: "yellow"
    },
    {
      label: "霍尔木兹",
      value: "1920",
      unit: "万桶/日",
      color: "blue"
    }
  ],
  warPhase: {
    level: "军事高压相持",
    targetLevel: "军事降级/有限谈判",
    title: "高警戒博弈阶段",
    subTitle: "无新军事升级，关键博弈持续",
    points: [
      "美伊军事部署均维持高位",
      "未出现大规模新攻击行为",
      "区域各方高度警戒、观望"
    ],
    note: "短期降级概率较低，行动空间受限"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3.2,
      prev: 3.2,
      weight: 0.2,
      description: "军事冲突威胁处于中高位，无全面升级迹象。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3.1,
      prev: 3.1,
      weight: 0.2,
      description: "通过量略降，威胁可控，局部干扰。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 2.8,
      prev: 2.8,
      weight: 0.2,
      description: "油价震荡但未大幅波动，市场谨慎。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美、欧持续高调表态，增兵未变。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "暂无实质谈判信号，僵持延续。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "伊朗表达对美继续报复可能性",
      description: "伊朗官员公开表示不排除对美国及其地区目标继续实施报复的可能。",
      verification: "confirmed",
      timestamp: "2026-04-09T05:00:00Z",
      significance: "表明强硬立场，短期激化风险有限。"
    },
    {
      id: "e2",
      title: "美防部维持中东高警戒部署",
      description: "美国防部发言人证实中东地区美军维持最高级别警戒部署以应对潜在威胁。",
      verification: "confirmed",
      timestamp: "2026-04-09T10:00:00Z",
      significance: "反映美方预计高风险局面延续。"
    },
    {
      id: "e3",
      title: "伊朗革命卫队霍尔木兹实弹演练",
      description: "伊朗革命卫队当天在霍尔木兹海峡举行实弹演练，有多家媒体报道。",
      verification: "partial",
      timestamp: "2026-04-09T13:00:00Z",
      significance: "常规威慑动作，短期影响有限。"
    }
  ],
  scoreTrend: [
    {
      date: "04-05",
      score: 56
    },
    {
      date: "04-06",
      score: 56
    },
    {
      date: "04-07",
      score: 56
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
      tag: "高戒备",
      tagColor: "orange",
      points: [
        "美伊前线部署未松动",
        "局部军演及巡逻加强"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "局部扰动",
      tagColor: "blue",
      points: [
        "海峡通过畅通，偶有异常检查",
        "主要航运公司加强风控"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "波动上升",
      tagColor: "yellow",
      points: [
        "油价震荡回落，风险溢价犹在"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "对峙表态",
      tagColor: "red",
      points: [
        "伊朗高层持续发出强硬信号",
        "美方强调区域威慑与防御"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国遏制伊朗区域影响力与伊朗战略安全诉求冲突"
    ],
    military: [
      "霍尔木兹安全控制与代理人冲突升级风险"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-09",
  version: "v2.11",
  riskScore: 56,
  prevRiskScore: 56,
  investmentSignal: "High-risk observer mode. Be wary of volatility in energy-related assets.",
  keyChange: "Situation stable, no major variables driving score changes.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D40",
      unit: "Since Feb 28",
      color: "orange"
    },
    {
      label: "Score Change",
      value: "持平",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "87.1",
      unit: "USD/barrel",
      color: "yellow"
    },
    {
      label: "Hormuz",
      value: "1920",
      unit: "million bbl/day",
      color: "blue"
    }
  ],
  warPhase: {
    level: "Sustained Military Standoff",
    targetLevel: "De-escalation/Limited Negotiation",
    title: "High Alert Game Phase",
    subTitle: "No new military escalations, continued contestation",
    points: [
      "Both US and Iran maintain high troop deployments",
      "No large-scale new attacks",
      "Regional actors remain on high alert"
    ],
    note: "Short-term de-escalation probability is low; maneuvering room limited"
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3.2,
      prev: 3.2,
      weight: 0.2,
      description: "Threat level remains mid-to-high, but no signs of general escalation.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 3.1,
      prev: 3.1,
      weight: 0.2,
      description: "Throughput slightly mitigated; threat contained, local disruptions.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 2.8,
      prev: 2.8,
      weight: 0.2,
      description: "Oil prices fluctuating, no sharp moves; market cautious.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US & Europe maintain high-profile posture and force presence.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "No signs of substantive negotiations, standoff persists.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "Iran reaffirms possibility of further retaliation against US",
      description: "Iranian officials state further retaliatory acts against the US and its assets remain possible.",
      verification: "confirmed",
      timestamp: "2026-04-09T05:00:00Z",
      significance: "Signals steadfast stance, but limited short-term escalation risk."
    },
    {
      id: "e2",
      title: "US Defense Department maintains high alert in Mideast",
      description: "Pentagon spokesperson confirms US forces in the region remain on highest alert to counter any potential threats.",
      verification: "confirmed",
      timestamp: "2026-04-09T10:00:00Z",
      significance: "Reflects anticipation of continued high-risk environment."
    },
    {
      id: "e3",
      title: "IRGC conducts live-fire drill in Hormuz",
      description: "Iran's Revolutionary Guards reportedly conducted a live-fire drill in the Strait of Hormuz, multiple sources report.",
      verification: "partial",
      timestamp: "2026-04-09T13:00:00Z",
      significance: "Routine show of force, limited short-term impact."
    }
  ],
  scoreTrend: [
    {
      date: "04-05",
      score: 56
    },
    {
      date: "04-06",
      score: 56
    },
    {
      date: "04-07",
      score: 56
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
      tag: "High Alert",
      tagColor: "orange",
      points: [
        "Front-line deployments stable for both sides",
        "Increased patrols and exercises"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Local Disruptions",
      tagColor: "blue",
      points: [
        "Strait passage open; some abnormal inspections",
        "Major shipowners enhance risk controls"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Volatility Up",
      tagColor: "yellow",
      points: [
        "Oil prices fluctuate; risk premium remains"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Confrontational Declarations",
      tagColor: "red",
      points: [
        "Iranian officials signal hardline stance",
        "US side emphasizes deterrence and defense"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US efforts to contain Iran's regional influence vs. Iran's strategic security imperatives"
    ],
    military: [
      "Strait of Hormuz security control vs. escalation risk from proxy conflicts"
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.11 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 56（持平）：整体局势稳定，无重大变量驱动评分变化。",
    bannerWarning: "高风险观望，能源资产波动需警惕突发风险。",
    deescalationIntent: "美国遏制伊朗区域影响力与伊朗战略安全诉求冲突",
    structuralRisk: "通过量略降，威胁可控，局部干扰。",
    contradictionNote:
      "美国遏制伊朗区域影响力与伊朗战略安全诉求冲突；霍尔木兹安全控制与代理人冲突升级风险",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第40天",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.11 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 56 (持平): Situation stable, no major variables driving score changes.",
    bannerWarning: "High-risk observer mode. Be wary of volatility in energy-related assets.",
    deescalationIntent: "US efforts to contain Iran's regional influence vs. Iran's strategic security i…",
    structuralRisk: "Throughput slightly mitigated; threat contained, local disruptions.",
    contradictionNote:
      "US efforts to contain Iran's regional influence vs. Iran's strategic security imperatives; Strait of Hormuz security control vs. escalation risk from proxy con…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 40",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
