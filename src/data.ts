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
  date: "2026-09-06",
  version: "v2.180",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D190",
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
      value: "WTI $88.90–$91.40 · Brent $92.70–$95.30",
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
      description: "代理人袭击与直接演习威慑并存",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "演习区封锁加剧通行阻力",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在 $85–100 窄幅波动，风险溢价显著",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方维持区域震慑，未直接参与战斗",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "阿曼渠道谈判因立场分歧陷入停滞",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗开启三天大规模海上演习",
      description: "伊朗海军在霍尔木兹海峡部署无人艇群与反舰导弹，模拟应对外部封锁。IRNA 指出这是对外部威胁的回应。",
      verification: "confirmed",
      timestamp: "2026-09-06T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "中东谈判陷入僵局",
      description: "阿曼中介证实美伊在制裁解除的核心问题上无法达成共识，秘密对话已暂时中止。WSJ 报道称双方立场正变得更加不可调和。",
      verification: "confirmed",
      timestamp: "2026-09-05T21:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "谈判机制失灵与军事演习对冲",
      "霍尔木兹海峡进入高频摩擦区间",
      "能源市场计入更高频次的短期断供预期"
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
        "延续：美军对叙利亚及伊拉克境内代理人据点维持高空侦察及定点拦截。",
        "变化：伊朗启动联合海上实战演习，首次展示协同无人机母舰编队。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航线绕行好望角比例维持在 30% 以上。",
        "变化：演习禁航区导致区域内油轮航速普遍降低，航程延误加剧。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：市场在需求疲软与地缘溢价之间寻求平衡，油价维持在 $90 关口震荡。",
        "变化：演习消息传出后，WTI 近月合约波动率（VIX）上升 8%。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国行政部门重申不希望与伊朗爆发全面冲突。",
        "变化：伊朗领导层公开警告称，若国家利益受损将采取“超常手段”回应。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "制裁解除深度与核浓缩限制的存量博弈",
      "谈判信誉的进一步透支"
    ],
    military: [
      "霍尔木兹通行权与伊朗近海防御主权的对抗",
      "代理人骚扰对美军驻扎忍耐度的试探"
    ]
  },
  scoreTrend: [
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70,
      active: true
    }
  ],
  keyChange: "谈判僵局加剧与伊朗海事演习推升风险溢价。",
  investmentSignal: "→ 增持 能源 及 黄金 避险头寸，对 风险资产 维持 防御性 减持立场。",
  change: "up",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-06",
  version: "v2.180",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D190",
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
      value: "WTI $88.90–$91.40 · Brent $92.70–$95.30",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Proxy attacks and direct maritime drills",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Exercise zones adding navigation barriers",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices in $85–100 range with risk premium",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains regional deterrence",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oman-mediated talks stall",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Launches 3-Day Massive Naval Drill",
      description: "Iranian Navy deploys drone swarms and anti-ship missiles in the Strait of Hormuz to simulate blockade responses.",
      verification: "confirmed",
      timestamp: "2026-09-06T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Mideast Talks Reach Deadlock",
      description: "Oman mediators confirm no consensus on sanctions lifting; secret dialogues suspended temporarily.",
      verification: "confirmed",
      timestamp: "2026-09-05T21:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Failure of negotiation mechanisms vs military drills",
      "High-frequency friction in the Strait of Hormuz",
      "Energy markets pricing in short-term disruption"
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
        "Continue: US maintains surveillance and interception of proxy positions in Syria and Iraq.",
        "Change: Iran launches joint maritime drills, showcasing drone carrier task forces."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Cape of Good Hope rerouting remains above 30% for commercial vessels.",
        "Change: Exercise exclusion zones cause significant vessel speed reductions and delays."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Markets balance between demand weakness and geopolitical premiums.",
        "Change: WTI front-month volatility (VIX) rose by 8% following drill announcements."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US administration reiterates desire to avoid full-scale war.",
        "Change: Iranian leadership warns of 'extraordinary measures' if national interests are harmed."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Sanctions lifting depth vs nuclear enrichment limits",
      "Erosion of negotiation credibility"
    ],
    military: [
      "Hormuz transit rights vs Iranian coastal defense sovereignty",
      "Proxy harassment testing US military patience"
    ]
  },
  scoreTrend: [
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70,
      active: true
    }
  ],
  keyChange: "Stalled negotiations and Iranian naval drills push risk premiums higher.",
  investmentSignal: "→ Increase positions in Energy and Gold; maintain Defensive underweight in Risk Assets.",
  change: "up",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.180 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：谈判僵局加剧与伊朗海事演习推升风险溢价。",
    bannerWarning: "→ 增持 能源 及 黄金 避险头寸，对 风险资产 维持 防御性 减持立场。",
    deescalationIntent: "制裁解除深度与核浓缩限制的存量博弈",
    structuralRisk: "演习区封锁加剧通行阻力",
    contradictionNote: "制裁解除深度与核浓缩限制的存量博弈；霍尔木兹通行权与伊朗近海防御主权的对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第190天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.180 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Stalled negotiations and Iranian naval drills push risk premiums higher.",
    bannerWarning: "→ Increase positions in Energy and Gold; maintain Defensive underweight in Risk Assets.",
    deescalationIntent: "Sanctions lifting depth vs nuclear enrichment limits",
    structuralRisk: "Exercise zones adding navigation barriers",
    contradictionNote: "Sanctions lifting depth vs nuclear enrichment limits; Hormuz transit rights vs Iranian coastal defense sovereignty",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 190",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
