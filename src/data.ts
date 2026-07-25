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
  date: "2026-07-25",
  version: "v2.136",
  riskScore: 94,
  keyStats: [
    {
      label: "冲突天数",
      value: "D147",
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
      value: "WTI $113.50–$117.80 · Brent $116.20–$121.40",
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
      description: "美伊直接导弹交换持续，美军CENTCOM确认拦截多枚伊朗发射的弹道导弹。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "实质性海上封锁持续，商业油轮通行量处于历史低点。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "油价维持在危机溢价区间，供应担忧持续主导市场情绪。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接参与拦截行动，外部大国在外交与防御层面深度介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "无任何实质性降级信号，谈判渠道呈关闭状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM拦截弹道导弹",
      description: "美国国防部确认在波斯湾拦截了12枚伊朗导弹，冲突烈度维持极高水平。",
      verification: "confirmed",
      timestamp: "2026-07-25 04:20",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗能源设施反击警告",
      description: "伊朗官方表示任何针对其能源设施的打击都将导致全面反击，包括关闭核心航道。",
      verification: "confirmed",
      timestamp: "2026-07-25 08:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "导弹交换已常态化",
      "海峡航权实质性丧失",
      "全面战争门槛反复摩擦"
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
        "延续：美伊之间保持中远程导弹互射，防御系统高度紧张。",
        "变化：伊朗开始在边境集结快速反应部队，地面风险上升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：封锁效应导致全球保费飙升，非护航商船完全绕道。",
        "延续：伊朗海军在关键航道维持登船检查演习。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价维持在$110以上的危机区间，波动率极高。",
        "变化：市场出现对战略储备释出的传闻，但尚未落地。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：双方通过第三方传递强硬口信，不寻求战争但绝不退缩。",
        "延续：白宫与德黑兰均面临内部升级压力。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的地区生存防御逻辑 vs 美国的海上秩序维护意愿",
      "双方均无法在不丢掉国内政治支持的情况下先行示弱"
    ],
    military: [
      "导弹防御系统的饱和压力 vs 攻击方的战术升级需求"
    ]
  },
  scoreTrend: [
    {
      date: "07-21",
      score: 98
    },
    {
      date: "07-22",
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94,
      active: true
    }
  ],
  keyChange: "冲突在极高烈度上出现动力学平衡，短期内无降级路径。",
  investmentSignal: "→ 维持能源与避险资产高位配置，防御性对冲风险资产波动。",
  change: "none",
  prevRiskScore: 94,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-25",
  version: "v2.136",
  riskScore: 94,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D147",
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
      value: "WTI $113.50–$117.80 · Brent $116.20–$121.40",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct missile exchanges continue; CENTCOM confirmed interceptions of multiple Iranian ballistic missiles.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Substantial maritime blockade persists; commercial tanker traffic at historic lows.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Oil prices remain in the crisis premium zone; supply fears dominate sentiment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US forces directly engaged in interception; major powers involved in diplomacy and defense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "No substantial de-escalation signals; negotiation channels remain closed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM Intercepts Ballistic Missiles",
      description: "DoD confirmed interception of 12 Iranian missiles over the Persian Gulf; conflict remains high-intensity.",
      verification: "confirmed",
      timestamp: "2026-07-25 04:20",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Warns of Counter-strikes on Energy Infrastructure",
      description: "Official Iranian statement warns any strike on its energy assets will lead to unlimited response.",
      verification: "confirmed",
      timestamp: "2026-07-25 08:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Normalised missile exchanges",
      "Substantial loss of maritime passage rights",
      "Frequent friction at total war threshold"
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
        "Continue: Mid-to-long range missile exchanges persist; defense systems on high alert.",
        "Change: Iran began massing rapid response forces near borders; ground risk increasing."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Blockade effect drives global insurance premiums up; commercial ships rerouting.",
        "Continue: Iranian Navy maintains boarding inspection exercises in key lanes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil prices stay in the crisis range above $110 with high volatility.",
        "Change: Rumors of strategic reserve releases surface but yet to be implemented."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both sides relaying tough messages via third parties; not seeking war but refusing to yield.",
        "Continue: Both White House and Tehran under internal pressure to escalate."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's regional survival defense vs US maritime order maintenance",
      "Neither side can blink without losing domestic political support"
    ],
    military: [
      "Saturation pressure on defense systems vs offensive tactical needs"
    ]
  },
  scoreTrend: [
    {
      date: "07-21",
      score: 98
    },
    {
      date: "07-22",
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94,
      active: true
    }
  ],
  keyChange: "Conflict reached a dynamic equilibrium at extreme intensity; no short-term de-escalation path.",
  investmentSignal: "→ Maintain high allocation to energy and safe-haven assets; hedge risk asset volatility.",
  change: "none",
  prevRiskScore: 94,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.136 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 94（持平）：冲突在极高烈度上出现动力学平衡，短期内无降级路径。",
    bannerWarning: "→ 维持能源与避险资产高位配置，防御性对冲风险资产波动。",
    deescalationIntent: "伊朗的地区生存防御逻辑 vs 美国的海上秩序维护意愿",
    structuralRisk: "实质性海上封锁持续，商业油轮通行量处于历史低点。",
    contradictionNote: "伊朗的地区生存防御逻辑 vs 美国的海上秩序维护意愿；导弹防御系统的饱和压力 vs 攻击方的战术升级需求",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第147天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.136 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 94 (Flat): Conflict reached a dynamic equilibrium at extreme intensity; no short-term de-escalation path.",
    bannerWarning: "→ Maintain high allocation to energy and safe-haven assets; hedge risk asset volatility.",
    deescalationIntent: "Iran's regional survival defense vs US maritime order maintenance",
    structuralRisk: "Substantial maritime blockade persists; commercial tanker traffic at historic lows.",
    contradictionNote: "Iran's regional survival defense vs US maritime order maintenance; Saturation pressure on defense systems vs offensive tactical needs",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 147",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
