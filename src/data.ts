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
  date: "2026-10-10",
  version: "v2.217",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D224",
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
      value: "WTI $90.01–$92.16 · Brent $102.39–$105.07",
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
      description: "依据CBS News与Reuters报道，也门胡塞武装向沙特利雅得机场发射弹道导弹造成3人死亡，多战线交火与外溢烈度维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "依据AP与海事机构报道，霍尔木兹水道周边水雷隐患与爆炸警报频现，商业通航量降至50%以下，依赖军舰护航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "依据Yahoo Finance与Trading Economics行情，WTI运行于$90.01–$92.16，Brent运行于$102.39–$105.07，Brent主体进入$100–120危机带，按上沿保守择档判定为4分。接地参考：https://tradingeconomics.com/commodity/crude-oil",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "依据美军中央司令部（CENTCOM）及WSJ通报，美方持续向海湾增派护航防空编队并提供情报支持，未启动全面作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "依据Al Jazeera及AP报道，美方表态大选前暂缓对伊本土军事打击，伊朗外交部表示正研究美方反馈并准备正式回复，具备接触窗口但未签署协议。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "中东防空反导网络持续应对红海及海湾外溢打击",
      "霍尔木兹海峡处于武装护航下的严重受限运行状态",
      "美伊高层通过区域中介围绕临时停火条件开展接触"
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
        "延续：沙特首都利雅得遭导弹袭击致人员伤亡，多区域防空警戒升级。",
        "延续：红海及也门前线针对商船与军事目标的无人机对抗仍在继续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：水道关键节点存在水雷警报，商业班轮自主通行基本停滞。",
        "变化：多国海军调整伴随护航班次，单日安全疏运原油运量保持低位稳定。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油稳定在102–105美元危机带，现货溢价形态陡峭。",
        "延续：全球战略储备释放部分平抑恐慌情绪，但炼厂运费成本依旧高企。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美总统表态中期选举前不对伊本土动武，为外交斡旋释放窗口。",
        "延续：伊朗外交部明确拒绝单方面妥协，强调护卫主权与反制封锁权利。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "华盛顿政治周期诉求与中东战区威慑有效性之间的权衡"
    ],
    military: [
      "霍尔木兹海峡实际通航控制权与公海自由航行护航机制的刚性对立"
    ]
  },
  scoreTrend: [
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊释放中期选举前战术性降温信号与外溢导弹交火并存，综合地缘风险黏滞于；综合风险分落盘 70（较昨日 持平（+0））",
  investmentSignal: "→ 维持对冲与防御配置，地缘风险溢价黏滞于高位，对能源与大宗商品敞口保持结构性重估，审慎控制风险资产风险。",
  events: [
    {
      id: "EVT-01",
      title: "也门导弹袭击沙特利雅得机场造成伤亡",
      description: "CBS News与Reuters报道，也门胡塞武装弹道导弹碎片击中利雅得机场周边造成3人死亡，红海冲突外溢进一步扩大。",
      verification: "confirmed",
      timestamp: "2026-10-10 08:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹水雷隐患与爆炸警报频现",
      description: "AP与The Times of India报道，海峡内非管制水域多艘油轮报告水雷威胁，商业航运通航率维持在50%以下。",
      verification: "confirmed",
      timestamp: "2026-10-10 06:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美方表态中期选举前暂停对伊新打击",
      description: "WSJ与Reuters报道，美方公开确认正与伊朗进行间接沟通，且在中期选举之前不会发起新攻击。",
      verification: "confirmed",
      timestamp: "2026-10-09 21:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "伊朗外交部审议美方停火方案回应",
      description: "Al Jazeera报道，伊朗外长阿拉格齐证实德黑兰正在评估美方反馈，准备就七日停火方案递交正式答复。",
      verification: "confirmed",
      timestamp: "2026-10-09 18:40 UTC",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "原油基准维持高位震荡布伦特守稳百元关口",
      description: "Trading Economics报道，WTI位于$90–$92区间，Brent维持在$102–$105，地缘断供隐忧主导远期贴水结构。",
      verification: "confirmed",
      timestamp: "2026-10-10 14:55 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-10",
  version: "v2.217",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D224",
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
      value: "WTI $90.01–$92.16 · Brent $102.39–$105.07",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
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
      description: "According to CBS News and Reuters, ballistic missile strikes by Houthi allies near Riyadh airport killed 3 people, demonstrating active cross-theater combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "According to AP and maritime security reports, naval mine hazards and explosion alerts continue across the strait, keeping transit traffic below 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "According to Yahoo Finance and Trading Economics, WTI trades at $90.01–$92.16 while Brent trades at $102.39–$105.07; Brent sits firmly inside the $100–120 crisis bracket, scored conservatively at 4. Grounding ref: https://tradingeconomics.com/commodity/crude-oil",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "According to DoD and CENTCOM statements, US military naval assets provide armed convoys and intelligence sharing without launching direct large-scale ground engagements.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "According to Al Jazeera and AP, Washington stated it will refrain from direct strikes on Iran before midterms, and Tehran confirmed evaluating the roadmap response.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Regional air defense grids continuously engage cross-border drone and ballistic missile threats",
      "Strait of Hormuz commercial traffic operates under restricted naval escort protocols",
      "Indirect bilateral channels remain open ahead of the US midterm political window"
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
        "Continue: Ballistic missile strikes outside Riyadh resulted in casualties, maintaining regional alert levels.",
        "Continue: Drone skirmishes and interception engagements continue across the southern theater."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Persistent mine hazards halt unescorted commercial liner navigation.",
        "Change: Coalition naval coordination adjusts transit slots to sustain minimum crude throughput."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude remains firmly in the $102–$105 crisis band with steep backwardation.",
        "Continue: Strategic reserve releases buffer prompt panic while refining transport spreads stay elevated."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US leadership rules out strikes before midterm elections, opening a tactical diplomatic window.",
        "Continue: Iranian leadership maintains insistence on sanctions relief and maritime autonomy."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US domestic election window pressures versus long-term deterrence credibility in the Persian Gulf"
    ],
    military: [
      "De facto Iranian maritime denial capabilities versus international coalition escort doctrines"
    ]
  },
  scoreTrend: [
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70,
      active: true
    }
  ],
  keyChange: "Pre-midterm diplomatic pauses counterbalance regional missile strikes, leaving overall risk sticky at 70.",
  investmentSignal: "→ Maintain defensive hedging positions, as sticky geopolitical risk premiums in energy and commodities warrant structural re-evaluation while limiting risk asset exposure.",
  events: [
    {
      id: "EVT-01",
      title: "Missile Strike Near Riyadh Airport Causes Casualties",
      description: "CBS News and Reuters reported that intercepted ballistic missiles fired by Yemeni Houthi forces caused 3 casualties near Riyadh airport.",
      verification: "confirmed",
      timestamp: "2026-10-10 08:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Mine Threats and Explosions Reported in Hormuz",
      description: "AP and The Times of India reported multiple naval mine warnings and explosions in the Strait of Hormuz, suppressing commercial flows below 50%.",
      verification: "confirmed",
      timestamp: "2026-10-10 06:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US Administration Pauses Pre-Midterm Strikes on Iran",
      description: "WSJ and Reuters reported that the US affirmed no direct military strikes on Iran will take place prior to midterm elections amidst ongoing talks.",
      verification: "confirmed",
      timestamp: "2026-10-09 21:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "Iran Evaluates US Roadmap Counter-Proposal",
      description: "Al Jazeera reported Iranian Foreign Minister Abbas Araghchi confirmed Tehran is reviewing Washington's diplomatic feedback for formal reply.",
      verification: "confirmed",
      timestamp: "2026-10-09 18:40 UTC",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Crude Benchmarks Consolidate at Elevated Levels",
      description: "Trading Economics and CMB News reported Brent holding between $102 and $105 while WTI trades at $90–$92, supported by war risk premiums.",
      verification: "confirmed",
      timestamp: "2026-10-10 14:55 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.217 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊释放中期选举前战术性降温信号与外溢导弹交火并存，综合地缘风险黏滞于；综合风险分落盘 70（较昨日 持平（+0））",
    bannerWarning: "→ 维持对冲与防御配置，地缘风险溢价黏滞于高位，对能源与大宗商品敞口保持结构性重估，审慎控制风险资产风险。",
    deescalationIntent: "华盛顿政治周期诉求与中东战区威慑有效性之间的权衡",
    structuralRisk: "依据AP与海事机构报道，霍尔木兹水道周边水雷隐患与爆炸警报频现，商业通航量降至50%以下，依赖军舰护航。",
    contradictionNote: "华盛顿政治周期诉求与中东战区威慑有效性之间的权衡；霍尔木兹海峡实际通航控制权与公海自由航行护航机制的刚性对立",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第224天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.217 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Pre-midterm diplomatic pauses counterbalance regional missile strikes, leaving overall risk sticky at 70.",
    bannerWarning: "→ Maintain defensive hedging positions, as sticky geopolitical risk premiums in energy and commodities warrant structur…",
    deescalationIntent: "US domestic election window pressures versus long-term deterrence credibility i…",
    structuralRisk: "According to AP and maritime security reports, naval mine hazards and explosion alerts continue acr…",
    contradictionNote: "US domestic election window pressures versus long-term deterrence credibility in the Persian Gulf; De facto Iranian maritime denial capabilities versus interna…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 224",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
