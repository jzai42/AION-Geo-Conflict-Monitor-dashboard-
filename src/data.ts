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
  investmentSignal: "中性偏谨慎：维持防御性仓位，关注霍尔木兹通行与油价二次波动。",
  keyChange: "停火叙事仍在，但霍尔木兹与油市风险尚未实质缓解；综合评分持平。",
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
      value: "约95-100",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "霍尔木兹",
      value: "受限",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "有限对峙",
    title: "停火尚在，但风险外溢未消",
    subTitle: "军事烈度暂稳，航运与能源仍是主要压力源",
    points: [
      "公开报道未见24小时内明确的大规模新增打击。",
      "霍尔木兹通行仍显著受扰，市场对恢复正常持怀疑态度。",
      "停火与强硬表态并存，降级路径仍不稳固。"
    ],
    note: "本日判断以停火脆弱性与航运受限为主轴，综合风险暂不变化。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "未见明确升级到多战线大规模交火，但局部摩擦和报复性风险仍在。",
      status: "FAST"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航运仍严重受限，公开报道称水道基本仍处于关闭/受限状态。",
      status: "FAST"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在停火后回落，但4月9日再度反弹，说明风险溢价未消。",
      status: "FAST"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国仍主导军事与谈判节奏，欧洲公开呼吁政治解决，但未见新增直接作战介入。",
      status: "FAST"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "仍有谈判渠道，但条件对冲明显，停火前景脆弱。",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "欧洲领导人呼吁重启谈判",
      description: "欧洲方面公开敦促通过政治方式稳住停火并推动霍尔木兹重新开放。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium",
      highlight: true
    },
    {
      id: "e2",
      title: "霍尔木兹通行仍受限",
      description: "媒体称霍尔木兹仍基本处于关闭或显著受限状态，少量船只可通过。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e3",
      title: "油价在停火后反弹",
      description: "在前一交易日大跌后，4月9日油价因供应疑虑再度上行。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e4",
      title: "停火框架仍存但脆弱",
      description: "AP持续援引美伊两周停火框架，但指出局势并不稳定。",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e5",
      title: "领导层继续释放强硬与降级并存信号",
      description: "美方一方面强调停火，另一方面仍保留强硬条件与威慑表态。",
      verification: "partial",
      timestamp: "2026-04-09",
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "低烈度维持",
      tagColor: "green",
      points: [
        "未见24小时内明确的大战升级。",
        "局部摩擦和报复风险仍存在。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "持续受限",
      tagColor: "red",
      points: [
        "霍尔木兹仍未恢复常态通行。",
        "少量船只可过，但整体流量受扰严重。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高波动",
      tagColor: "orange",
      points: [
        "油价对停火与通行消息高度敏感。",
        "供应链风险溢价尚未完全消失。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谈判未断",
      tagColor: "blue",
      points: [
        "美伊均保留谈判叙事。",
        "但双方条件差距仍大，停火脆弱。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "停火表态与强硬条件并行，谈判框架缺乏稳固互信。",
      "欧洲呼吁降级，但美伊主导议程仍偏向条件交换。"
    ],
    military: [
      "前线未全面升级，但局部袭击与威慑行动仍可能随时打断停火。"
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-10",
  version: "v2.10",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "Neutral-to-cautious: keep defensive positioning and watch Hormuz transit plus a second wave in oil volatility.",
  keyChange: "Ceasefire rhetoric remains, but Hormuz and oil-market risks have not materially eased; the composite score is unchanged.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D41",
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
      value: "~95-100",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "Hormuz",
      value: "Restricted",
      unit: "status",
      color: "red"
    }
  ],
  warPhase: {
    level: "Fragile ceasefire",
    targetLevel: "Limited standoff",
    title: "A ceasefire exists, but spillover risk has not faded",
    subTitle: "Military intensity is temporarily stable, while shipping and energy remain the main pressure points",
    points: [
      "No clearly reported major new strikes in the past 24 hours.",
      "Hormuz transit remains materially disrupted and market skepticism is high.",
      "Ceasefire language and hardline signaling coexist, keeping de-escalation fragile."
    ],
    note: "Today’s assessment is driven primarily by ceasefire fragility and continued shipping constraints, leaving the composite risk unchanged."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "No clear shift to multi-front large-scale combat, but localized friction and retaliation risk remain.",
      status: "FAST"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Shipping remains severely constrained, with reporting describing the waterway as effectively still closed or heavily restricted.",
      status: "FAST"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices fell after the ceasefire, then rebounded on Apr. 9, showing the risk premium has not disappeared.",
      status: "FAST"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The U.S. continues to drive both military and diplomatic sequencing; Europe is publicly urging a political settlement, with no new direct combat role.",
      status: "FAST"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A negotiation channel still exists, but conditions are heavily offsetting, leaving the ceasefire fragile.",
      status: "FAST"
    }
  ],
  events: [
    {
      id: "e1",
      title: "European leaders push to restart talks",
      description: "Europe publicly urged a political path to stabilize the ceasefire and reopen Hormuz.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "medium",
      highlight: true
    },
    {
      id: "e2",
      title: "Hormuz transit remains restricted",
      description: "Reporting says the Strait of Hormuz is still effectively closed or significantly restricted, with only limited passage.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e3",
      title: "Oil rebounds after ceasefire shock",
      description: "After the prior session’s sharp drop, oil rose again on Apr. 9 amid renewed supply concerns.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true
    },
    {
      id: "e4",
      title: "Ceasefire framework still in place but fragile",
      description: "AP continues to reference the U.S.-Iran two-week ceasefire framework while stressing instability.",
      verification: "confirmed",
      timestamp: "2026-04-09",
      significance: "high",
      highlight: true,
      critical: true
    },
    {
      id: "e5",
      title: "Leadership messaging mixes restraint with coercion",
      description: "Washington continues to signal both restraint and coercive leverage conditions.",
      verification: "partial",
      timestamp: "2026-04-09",
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Low-intensity hold",
      tagColor: "green",
      points: [
        "No clearly reported major escalation in the past 24 hours.",
        "Localized friction and retaliation risks remain."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Still constrained",
      tagColor: "red",
      points: [
        "Hormuz has not returned to normal transit conditions.",
        "A small number of vessels may pass, but the overall flow remains badly disrupted."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Highly volatile",
      tagColor: "orange",
      points: [
        "Oil remains highly sensitive to ceasefire and transit headlines.",
        "The supply-risk premium has not fully cleared."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Talks still alive",
      tagColor: "blue",
      points: [
        "Both sides still keep the negotiation narrative open.",
        "But the gap between conditions remains large, making the ceasefire fragile."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Ceasefire language and hardline conditions coexist, leaving the negotiation framework short on trust.",
      "Europe is urging de-escalation, but U.S.-Iran agenda-setting remains centered on leverage and conditions."
    ],
    military: [
      "The front has not escalated into full-scale combat, but localized attacks and deterrence moves could still break the ceasefire."
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
      "综合评分 64（持平）：停火叙事仍在，但霍尔木兹与油市风险尚未实质缓解；综合评分持平。",
    bannerWarning: "中性偏谨慎：维持防御性仓位，关注霍尔木兹通行与油价二次波动。",
    deescalationIntent: "停火表态与强硬条件并行，谈判框架缺乏稳固互信。",
    structuralRisk: "航运仍严重受限，公开报道称水道基本仍处于关闭/受限状态。",
    contradictionNote:
      "停火表态与强硬条件并行，谈判框架缺乏稳固互信。；前线未全面升级，但局部袭击与威慑行动仍可能随时打断停火。",
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
      "Composite 64 (Flat): Ceasefire rhetoric remains, but Hormuz and oil-market risks have not materially eased; the composite score is unchanged.",
    bannerWarning: "Neutral-to-cautious: keep defensive positioning and watch Hormuz transit plus a second wave in oil volatility.",
    deescalationIntent: "Ceasefire language and hardline conditions coexist, leaving the negotiation fra…",
    structuralRisk: "Shipping remains severely constrained, with reporting describing the waterway as effectively still …",
    contradictionNote:
      "Ceasefire language and hardline conditions coexist, leaving the negotiation framework short on trust.; The front has not escalated into full-scale combat, but …",
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
