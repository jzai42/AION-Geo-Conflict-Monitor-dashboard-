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
  date: "2026-08-31",
  version: "v2.174",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D184",
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
      value: "WTI $78.45–$81.10 · Brent $82.60–$85.35",
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
      description: "多战线活跃且存在直接交火风险，IRGC 在海峡地区的低烈度干扰频率增加。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主要商业航路受限，通行量维持在常态水平的 50% 以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "油价区间主体落在 $75–$85（温和偏强），市场表现出一定的疲劳感。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国提供军事部署与情报支持，暂未直接发动全面进攻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判渠道存在但进展受阻，双方立场依旧强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡发生拦截事件",
      description: "伊朗革命卫队快艇对多艘通过公海的油轮进行近距离绕飞与干扰，未发射武器。来源：Reuters",
      verification: "confirmed",
      timestamp: "2026-08-31 09:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗外交部发布立场文件",
      description: "德黑兰重申对波斯湾安全的责任，同时要求外国军队撤出该区域作为缓和前提。来源：IRNA",
      verification: "confirmed",
      timestamp: "2026-08-31 11:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方目前处于「战略僵持」阶段，侧重于心理战与经济损耗。",
      "海峡干扰成为常态化博弈杠杆。",
      "由于缺乏互信，误判导致擦枪走火的可能性依然维持在高位。"
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
        "延续：双方在边界与关键海域的监视与防御态势未改。",
        "变化：伊朗无人机在美军编队附近的侦察频率增加。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：超过 60% 的油轮选择绕行好望角或减少运量。",
        "变化：保费反弹，针对高风险水域的附加费上调 3%。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：原油期货呈现期货溢价结构（Contango），暗示即期供应尚存余地。",
        "变化：部分炼厂因地缘风险开始寻求替代货源。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方高层公开表态维持对航道自由的承诺。",
        "变化：非正式渠道传出美方正在通过中介评估停火框架草案。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求先撤销制裁与美方要求先停止骚扰航道之间的顺序死结。"
    ],
    military: [
      "地区威慑部署与实际行动风险之间的不对称性。"
    ]
  },
  scoreTrend: [
    {
      date: "08-27",
      score: 76
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "冲突动能从「急剧升级」转为「长期对峙」，市场溢价进入窄幅波动期。",
  investmentSignal: "→ 维持能源与大宗商品的对冲仓位，防御性配置风险资产。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-31",
  version: "v2.174",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D184",
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
      value: "WTI $78.45–$81.10 · Brent $82.60–$85.35",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active engagement on multiple fronts with high direct fire risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Major commercial routes restricted, volume below 50% of normal capacity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Oil prices within $75–$85 range; market fatigue setting in regarding geopolitical premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Direct military deployment and intel sharing by major powers, avoiding full invasion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Channels exist but progress is stalled with high risk of breakdown.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Hormuz Strait Interception Incident",
      description: "IRGC speedboats conducted close-range harassment of commercial tankers in international waters. Source: Reuters",
      verification: "confirmed",
      timestamp: "2026-08-31 09:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran MFA Position Paper",
      description: "Tehran asserts responsibility for regional security while demanding foreign withdrawal. Source: IRNA",
      verification: "confirmed",
      timestamp: "2026-08-31 11:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strategic deadlock as both sides focus on economic and psychological attrition.",
      "Hormuz harassment becomes a normalized leverage point.",
      "High probability of miscalculation leading to skirmishes remains due to low trust."
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
        "Continue: Sustained forward deployment and defensive readiness on both sides.",
        "Change: Increased IRGC drone surveillance near US naval task forces."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Over 60% of tankers diverting or operating at reduced capacity.",
        "Change: 3% rise in risk premiums for high-tension water zones."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Contango structure in futures suggests near-term supply buffering.",
        "Change: Refiners beginning to lock in alternative non-regional sources."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US high-level officials maintain 'freedom of navigation' rhetoric.",
        "Change: Informal leaks suggest US testing a ceasefire framework via intermediaries."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The sequence deadlock between Iran's demand for sanction lifting and US demand for shipping security."
    ],
    military: [
      "Asymmetry between deterrence deployment and actual escalatory risk."
    ]
  },
  scoreTrend: [
    {
      date: "08-27",
      score: 76
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "Shift from acute escalation to a high-pressure stalemate; market premiums stabilizing.",
  investmentSignal: "→ Maintain hedges in energy and commodities; defensive posture on risk assets.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月31日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.174 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：冲突动能从「急剧升级」转为「长期对峙」，市场溢价进入窄幅波动期。",
    bannerWarning: "→ 维持能源与大宗商品的对冲仓位，防御性配置风险资产。",
    deescalationIntent: "伊朗要求先撤销制裁与美方要求先停止骚扰航道之间的顺序死结。",
    structuralRisk: "主要商业航路受限，通行量维持在常态水平的 50% 以下。",
    contradictionNote: "伊朗要求先撤销制裁与美方要求先停止骚扰航道之间的顺序死结。；地区威慑部署与实际行动风险之间的不对称性。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第184天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 31 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.174 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Shift from acute escalation to a high-pressure stalemate; market premiums stabilizing.",
    bannerWarning: "→ Maintain hedges in energy and commodities; defensive posture on risk assets.",
    deescalationIntent: "The sequence deadlock between Iran's demand for sanction lifting and US demand …",
    structuralRisk: "Major commercial routes restricted, volume below 50% of normal capacity.",
    contradictionNote: "The sequence deadlock between Iran's demand for sanction lifting and US demand for shipping security.; Asymmetry between deterrence deployment and actual escal…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 184",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
