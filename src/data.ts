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
  date: "2026-05-24",
  version: "v2.74",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "→ 模型服务拥堵，维持风险中性敞口。",
  keyChange: "上游模型暂不可用，本期沿用上一期基线。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D85",
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
      value: "-",
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
  warPhase: {
    level: "服务兜底阶段",
    targetLevel: "等待自动刷新",
    title: "模型服务高负载，已切换兜底输出",
    subTitle: "本期保留结构与分数连续性",
    points: [
      "下一次定时任务将自动重试并恢复正常生成。"
    ],
    note: "兜底内容仅用于连续性展示，不构成投资建议。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    }
  ],
  events: [
    {
      id: "EVT-FALLBACK-01",
      title: "模型服务高负载，已启用自动兜底",
      description: "本次自动生成遇到上游模型服务不可用（503/UNAVAILABLE），系统已沿用上一期结构并保持评分稳定，等待下一轮任务自动刷新。",
      verification: "single",
      timestamp: "2026-05-24（当日公开报道）",
      significance: "保障日报流水线可用性，避免因上游拥堵导致中断。"
    }
  ],
  scoreTrend: [
    {
      date: "05-20",
      score: 76
    },
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "变化：模型暂不可用，当前卡片内容沿用上一期结构。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "变化：模型暂不可用，当前卡片内容沿用上一期结构。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "变化：模型暂不可用，当前卡片内容沿用上一期结构。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "变化：模型暂不可用，当前卡片内容沿用上一期结构。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "上游模型服务可用性波动导致当期生成降级。"
    ],
    military: [
      "风险分数暂沿用上一期，等待下一次自动刷新。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-24",
  version: "v2.74",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "→ Maintain: slightly defensive risk-neutral stance; Model congested; keep neutral risk exposure.",
  keyChange: "Upstream model unavailable; baseline carried over.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D85",
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
      value: "-",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  warPhase: {
    level: "Fallback mode",
    targetLevel: "Await next run",
    title: "Model overloaded; fallback output enabled",
    subTitle: "Structure and score continuity preserved",
    points: [
      "Next scheduled run will retry automatically."
    ],
    note: "Fallback output is for continuity only, not investment advice."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
      status: "SLOW",
      sourceVerification: "unverified"
    }
  ],
  events: [
    {
      id: "EVT-FALLBACK-01",
      title: "Model overload fallback activated",
      description: "Upstream model returned 503/UNAVAILABLE. The pipeline falls back to prior-day structure and stable scores until the next run.",
      verification: "single",
      timestamp: "2026-05-24 (same-day reporting)",
      significance: "Keeps the daily pipeline available during transient upstream outages."
    }
  ],
  scoreTrend: [
    {
      date: "05-20",
      score: 76
    },
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "Change: Model temporarily unavailable; cards keep prior-day structure."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "Change: Model temporarily unavailable; cards keep prior-day structure."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "Change: Model temporarily unavailable; cards keep prior-day structure."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Service Fallback",
      tagColor: "orange",
      points: [
        "Change: Model temporarily unavailable; cards keep prior-day structure."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Upstream model availability fluctuation forced degraded generation."
    ],
    military: [
      "Risk scores are carried over until the next refresh."
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.74 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：上游模型暂不可用，本期沿用上一期基线。",
    bannerWarning: "→ 模型服务拥堵，维持风险中性敞口。",
    deescalationIntent: "上游模型服务可用性波动导致当期生成降级。",
    structuralRisk: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
    contradictionNote: "上游模型服务可用性波动导致当期生成降级。；风险分数暂沿用上一期，等待下一次自动刷新。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第85天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.74 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): Upstream model unavailable; baseline carried over.",
    bannerWarning: "→ Maintain: slightly defensive risk-neutral stance; Model congested; keep neutral risk exposure.",
    deescalationIntent: "Upstream model availability fluctuation forced degraded generation.",
    structuralRisk: "模型服务繁忙，沿用上一期分数并等待下一次自动刷新。",
    contradictionNote: "Upstream model availability fluctuation forced degraded generation.; Risk scores are carried over until the next refresh.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 85",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
