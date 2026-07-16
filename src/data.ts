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
  date: "2026-07-16",
  version: "v2.127",
  keyStats: [
    {
      label: "冲突天数",
      value: "D138",
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
      value: "WTI $88.50–$92.10 · Brent $92.30–$96.40",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全封锁",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 90,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方直接交火，伊朗本土与美地区基地均遭打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡维持完全封锁状态，全球航运保险已暂停该区域覆盖。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "油价突破阻力位，反映了对霍尔木兹海峡长期封锁的担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国显著增强海空部署，直接参与盟友防御任务。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道完全中断，双方均表现出“战斗到底”的姿态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗对以色列境内目标实施远程导弹打击",
      description: "以色列国防军确认拦截了数十枚来自伊朗方向的飞行物，部分弹头击中南部沙漠空军基地周边。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-07-16T01:20:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "IEA 发布全球能源安全红色警告",
      description: "报告指出，若霍尔木兹海峡封锁超7天，全球原油商业库存将降至历史警戒线。来源：Financial Times。",
      verification: "confirmed",
      timestamp: "2026-07-16T08:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突正式转入主权国家间的直接武力对抗。",
      "霍尔木兹海峡成为决定性的地缘政治筹码。",
      "市场已进入“战争定价”模式，波动率处于极端水平。"
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
        "变化：直接打击取代代理人冲突，涉及弹道导弹和大规模防空拦截。",
        "延续：美军在周边区域的防空资产处于最高警戒级别。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运完全改道，绕行好望角成为唯一选择。",
        "变化：保费激增，部分航运巨头宣布波斯湾不可抗力。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于现货供应短缺迹象，期现溢价（Backwardation）急剧加深。",
        "延续：OPEC+ 尚未就补充中断份额发表正式增产声明。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗最高层发表动员演讲，呼吁抵抗“美以侵略”。",
        "延续：白宫维持“坚定反击”的立场，排除短期内单方面撤军可能。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求美军彻底撤离与美国维持地区存在之间的零和矛盾。"
    ],
    military: [
      "伊朗本土远程打击能力对以色列/美军基地的安全红线突破。"
    ]
  },
  scoreTrend: [
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90,
      active: true
    }
  ],
  keyChange: "冲突烈度由‘不对称对抗’转入‘国家间主动战争’，油价突破关键阻力位。",
  investmentSignal: "→ 维持极端防御性配置，减持风险资产，增持能源大宗及避险黄金对冲。",
  change: "up",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-16",
  version: "v2.127",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D138",
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
      value: "WTI $88.50–$92.10 · Brent $92.30–$96.40",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Total Blockade",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 90,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct state-on-state fire, with strikes on Iranian soil and US regional assets.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait remains fully blocked; marine insurance has ceased coverage for the area.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "Oil prices breach resistance levels, reflecting fears of prolonged Hormuz closure.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US significantly increases naval/air deployment and participates in direct defense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels are fully severed; both sides maintain 'fight to the end' stances.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Launches Long-Range Missile Strikes on Israel",
      description: "IDF confirms intercepting dozens of projectiles from Iran; some warheads hit areas near southern desert airbases. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-07-16T01:20:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "IEA Issues Red Warning for Global Energy Security",
      description: "Report states global commercial crude stocks will hit critical lows if Hormuz remains shut for over 7 days. Source: Financial Times.",
      verification: "confirmed",
      timestamp: "2026-07-16T08:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict has transitioned to direct state-on-state armed confrontation.",
      "Strait of Hormuz has become a decisive geopolitical leverage point.",
      "Markets have entered 'war pricing' mode with extreme volatility levels."
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
        "Change: Direct strikes replace proxy skirmishes, involving ballistic missiles and large-scale interceptions.",
        "Continue: US air defense assets in the region remain on highest alert."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping fully rerouted; Cape of Good Hope is the only viable path.",
        "Change: Insurance premiums surge; major shipping firms declare force majeure in the Persian Gulf."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Backwardation deepens sharply due to physical supply shortage signs.",
        "Continue: OPEC+ has not yet issued a formal production increase statement to offset the gap."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian top leadership delivers mobilization speech against 'US-Israeli aggression'.",
        "Continue: White House maintains 'firm response' stance, ruling out unilateral withdrawal."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum conflict between Iran's demand for US withdrawal and US regional presence."
    ],
    military: [
      "Breach of security red lines via direct Iranian long-range strikes on Israeli/US assets."
    ]
  },
  scoreTrend: [
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90,
      active: true
    }
  ],
  keyChange: "Conflict shifted from 'asymmetric' to 'Active War' between states; oil prices broke key resistance.",
  investmentSignal: "→ Maintain extreme defensive posture, reduce risk assets, and increase energy/commodity and gold hedges.",
  change: "up",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.127 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 90（↑2）：冲突烈度由‘不对称对抗’转入‘国家间主动战争’，油价突破关键阻力位。",
    bannerWarning: "→ 维持极端防御性配置，减持风险资产，增持能源大宗及避险黄金对冲。",
    deescalationIntent: "伊朗要求美军彻底撤离与美国维持地区存在之间的零和矛盾。",
    structuralRisk: "海峡维持完全封锁状态，全球航运保险已暂停该区域覆盖。",
    contradictionNote: "伊朗要求美军彻底撤离与美国维持地区存在之间的零和矛盾。；伊朗本土远程打击能力对以色列/美军基地的安全红线突破。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第138天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.127 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 90 (↑2): Conflict shifted from 'asymmetric' to 'Active War' between states; oil prices broke key resistance.",
    bannerWarning: "→ Maintain extreme defensive posture, reduce risk assets, and increase energy/commodity and gold hedges.",
    deescalationIntent: "Zero-sum conflict between Iran's demand for US withdrawal and US regional prese…",
    structuralRisk: "Strait remains fully blocked; marine insurance has ceased coverage for the area.",
    contradictionNote: "Zero-sum conflict between Iran's demand for US withdrawal and US regional presence.; Breach of security red lines via direct Iranian long-range strikes on Isra…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 138",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
