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
  date: "2026-09-01",
  version: "v2.175",
  riskScore: 72,
  riskTrend: "High-level Plateau",
  keyStats: [
    {
      label: "冲突天数",
      value: "D185",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $79.80–$80.40 · Brent $83.70–$84.50",
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
      description: "美伊双方在该地区均部署了进攻性资产，伊朗演习增加了意外摩擦的可能性。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道流量保持在低位，安全担忧导致航运成本居高不下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "国际油价在 $80-85 区间企稳，地缘溢价被全球宏观需求疲软对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事存在显著，大国间维持信息与外交层面的角力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "斡旋渠道虽然恢复，但缺乏实质性的停火协议框架。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗举行海峡防御演习",
      description: "IRNA 证实伊朗海军在霍尔木兹海峡进行反舰武器测试与无人机侦察演习。",
      verification: "confirmed",
      timestamp: "2026-09-01 06:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美国海军资产增援",
      description: "两艘导弹驱逐舰进入阿曼湾以维持“航行自由”，此举被解读为对伊朗演习的对等威慑。",
      verification: "confirmed",
      timestamp: "2026-08-31 22:00 UTC",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方均在海域集中重型资产，形成威慑平衡",
      "外交斡旋进入“试水期”，缺乏信任基石",
      "能源市场对地缘突发事件的敏感度依然维持高位"
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
        "延续：美伊在波斯湾与阿曼湾维持极近距离的军事对峙。",
        "变化：伊朗新增反舰导弹阵地部署，加剧海峡封锁风险。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业船只大规模避开晚间通过受限水域。",
        "延续：护航费用与战争险保费维持在冲突起始以来的高点。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价对地缘新闻的反应转为区间震荡而非直线飙升。",
        "延续：波斯湾石油出口的结构性风险继续支撑油价下限。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：哈梅内伊强调防御性权利；白宫重申保障航道自由。",
        "变化：阿曼代表团介入标志着非公开谈判渠道的重启。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求完全解除制裁与美国要求停止地区代理人扩张的僵局。",
      "大选政治周期对美国中东策略的影响与伊朗主权尊严的博弈。"
    ],
    military: [
      "海峡封锁权力的实际控制与航行自由权的绝对冲突。"
    ]
  },
  keyChange: "美伊军事资产密度增加但维持在冲突门槛内，斡旋渠道低效重启。",
  investmentSignal: "→ 维持风险资产对冲并关注能源防御性配置。",
  prevRiskScore: 70,
  scoreTrend: [
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72,
      active: true
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-01",
  version: "v2.175",
  riskScore: 72,
  riskTrend: "High-level Plateau",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D185",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $79.80–$80.40 · Brent $83.70–$84.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Serious Restriction",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Both US and Iranian forces have deployed offensive assets in close proximity, raising risks of accidental friction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Maritime traffic remains significantly lower than normal levels due to security threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "Oil prices stabilized as geopolitical premiums are balanced by global demand concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military presence is high while other major powers maintain diplomatic and monitoring stances.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Mediators are active, but no significant framework for de-escalation has been accepted by either side.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Conducts Strait Defense Drills",
      description: "IRNA confirms naval exercises involving anti-ship missile tests and drone surveillance near the Strait.",
      verification: "confirmed",
      timestamp: "2026-09-01 06:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Navy Reinforcements",
      description: "Two destroyers entered the Gulf of Oman to maintain freedom of navigation amid Iranian drills.",
      verification: "confirmed",
      timestamp: "2026-08-31 22:00 UTC",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Heavy naval assets concentrated in key waterways",
      "Diplomatic channels active but ineffective",
      "Markets remain highly sensitive to regional incidents"
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
        "Continue: US and Iran maintain high-alert naval presence in the Persian Gulf.",
        "Change: Deployment of new anti-ship batteries by Iran increases blockade risks."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial ships largely avoid the Strait during nighttime hours.",
        "Continue: High insurance surcharges remain for regional transits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil price reaction shifted to range-bound consolidation.",
        "Continue: Structural risks to Persian Gulf exports support price floors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Khamenei emphasizes defensive rights; White House reaffirms transit freedom.",
        "Change: Omani delegation arrival marks a restart of back-channel talks."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Stalemate between Iran's demand for sanction relief and US demand for cessation of proxy activities.",
      "Domestic political constraints on both sides preventing significant concessions."
    ],
    military: [
      "Irreconcilable conflict between Strait control and freedom of navigation."
    ]
  },
  keyChange: "Naval density reaches new highs while diplomatic backchannels cautiously resume.",
  investmentSignal: "→ Maintain hedges in risk assets and defensive energy positions.",
  prevRiskScore: 70,
  scoreTrend: [
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72,
      active: true
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.175 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑2）：美伊军事资产密度增加但维持在冲突门槛内，斡旋渠道低效重启。",
    bannerWarning: "→ 维持风险资产对冲并关注能源防御性配置。",
    deescalationIntent: "伊朗要求完全解除制裁与美国要求停止地区代理人扩张的僵局。",
    structuralRisk: "航道流量保持在低位，安全担忧导致航运成本居高不下。",
    contradictionNote: "伊朗要求完全解除制裁与美国要求停止地区代理人扩张的僵局。；海峡封锁权力的实际控制与航行自由权的绝对冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第185天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.175 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑2): Naval density reaches new highs while diplomatic backchannels cautiously resume.",
    bannerWarning: "→ Maintain hedges in risk assets and defensive energy positions.",
    deescalationIntent: "Stalemate between Iran's demand for sanction relief and US demand for cessation…",
    structuralRisk: "Maritime traffic remains significantly lower than normal levels due to security threats.",
    contradictionNote: "Stalemate between Iran's demand for sanction relief and US demand for cessation of proxy activities.; Irreconcilable conflict between Strait control and freedo…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 185",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
