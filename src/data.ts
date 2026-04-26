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
    layout?: "default" | "unitPrimary";
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
  date: "2026-04-25",
  version: "v2.43",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D56",
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
      value: "WTI $86.40–$88.20 · Brent $91.50–$93.10",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "代理武装针对美军基地的无人机袭扰持续，美军维持防御性拦截。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗维持“航行检查”政策，导致海峡实质性封锁，商业流量严重萎缩。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在高位震荡，反映出市场对供应中断的持续担忧，但尚未出现恐慌性飙升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军增援阿曼湾，维持在该地区的军事威慑，但未发起主动攻势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判渠道虽未完全关闭，但双方立场僵持，近期无进展预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军增援阿曼湾",
      description: "美国国防部证实，两艘伯克级驱逐舰已抵达中东责任区，加强对商船的护航能力。",
      verification: "confirmed",
      timestamp: "2026-04-25 04:00 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗维持航道检查",
      description: "伊朗官方媒体称将无限期维持对通过霍尔木兹海峡船只的检查，以应对“安全威胁”。",
      verification: "confirmed",
      timestamp: "2026-04-25 08:30 UTC",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海权与主权叙事的高度对抗",
      "能源市场的风险溢价常态化",
      "军事部署向防御性与阻断性倾斜"
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
        "延续：边境地带的无人机与火箭弹低烈度袭扰持续。",
        "变化：美军从防御性拦截转向主动性航道护航监测。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗实质性掌握海峡通行闸门，保费上涨趋势未改。",
        "延续：全球主要油轮船东维持绕行计划。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价突破 $91 关口，反映出长期消耗战的悲观预期。",
        "变化：WTI 与 Brent 价差因地缘因素小幅拉开。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰维持强硬主权表态，拒绝在封锁问题上先手让步。",
        "延续：华盛顿在选举压力下避免陷入全面战争，但不得不加强威慑。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的地区主导权要求与美国航行自由原则的正面碰撞。",
      "外交谈判的先决条件互斥，缺乏政治互信基础。"
    ],
    military: [
      "海上封锁的低成本性与美军全球部署的高成本性之间的矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 72,
      active: true
    }
  ],
  keyChange: "美军驱逐舰增援动作确认了长期护航对抗的预期，地缘溢价在能源价格中固化。",
  investmentSignal: "→ 维持对能源、黄金及风险防御资产的超配，减持受供应链影响较大的中游制造部位。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-25",
  version: "v2.43",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D56",
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
      value: "WTI $86.40–$88.20 · Brent $91.50–$93.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Disturbance",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Proxy drone harassment against US bases continues; US maintains defensive interceptions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Iran maintains maritime inspection policy, leading to effective blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices fluctuate at high levels reflecting supply concerns without a panic spike.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US reinforces Gulf of Oman to maintain deterrence without initiating direct assault.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Channels remain but stances are deadlocked with no near-term breakthrough expected.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Reinforces Gulf of Oman",
      description: "Pentagon confirms two Arleigh Burke-class destroyers arrived in theater to enhance escort capabilities.",
      verification: "confirmed",
      timestamp: "2026-04-25 04:00 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Maintains Strait Inspections",
      description: "State media says inspections of vessels through Hormuz will continue indefinitely due to 'security threats.'",
      verification: "confirmed",
      timestamp: "2026-04-25 08:30 UTC",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "High confrontation between maritime rights and sovereignty narratives.",
      "Normalizing risk premiums in energy markets.",
      "Military posture shifting towards defensive and disruptive roles."
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
        "Continue: Low-intensity drone and rocket harassment persists in border regions.",
        "Change: US shifting from defensive interception to active maritime escort monitoring."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iran effectively controls the strait's gate; insurance premiums rising.",
        "Continue: Major global tanker owners maintain rerouting via the Cape."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices broke $91, reflecting pessimistic expectations of a long war of attrition.",
        "Change: WTI-Brent spread slightly widened due to geopolitical factors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran maintains tough sovereign stance, refusing to yield on blockade first.",
        "Continue: Washington avoids full-scale war under election pressure while ramping up deterrence."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Collision between Iran's regional dominance claims and US freedom of navigation principles.",
      "Mutual exclusivity of negotiation preconditions."
    ],
    military: [
      "Contradiction between low-cost blockade and high-cost global US deployment."
    ]
  },
  scoreTrend: [
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 72,
      active: true
    }
  ],
  keyChange: "US destroyer reinforcement confirms expectations of long-term escort confrontation.",
  investmentSignal: "→ Maintain overweight in energy, gold, and defensive assets; underweight manufacturing vulnerable to supply chains.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.43 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美军驱逐舰增援动作确认了长期护航对抗的预期，地缘溢价在能源价格中固化。",
    bannerWarning: "→ 维持对能源、黄金及风险防御资产的超配，减持受供应链影响较大的中游制造部位。",
    deescalationIntent: "伊朗的地区主导权要求与美国航行自由原则的正面碰撞。",
    structuralRisk: "伊朗维持“航行检查”政策，导致海峡实质性封锁，商业流量严重萎缩。",
    contradictionNote: "伊朗的地区主导权要求与美国航行自由原则的正面碰撞。；海上封锁的低成本性与美军全球部署的高成本性之间的矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第56天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.43 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US destroyer reinforcement confirms expectations of long-term escort confrontation.",
    bannerWarning: "→ Maintain overweight in energy, gold, and defensive assets; underweight manufacturing vulnerable to supply chains.",
    deescalationIntent: "Collision between Iran's regional dominance claims and US freedom of navigation…",
    structuralRisk: "Iran maintains maritime inspection policy, leading to effective blockade.",
    contradictionNote: "Collision between Iran's regional dominance claims and US freedom of navigation principles.; Contradiction between low-cost blockade and high-cost global US de…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 56",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
