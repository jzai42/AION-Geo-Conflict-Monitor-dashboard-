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
  date: "2026-07-21",
  version: "v2.132",
  keyStats: [
    {
      label: "冲突天数",
      value: "D143",
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
      value: "WTI $80.30–$81.65 · Brent $84.60–$85.90",
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
  riskScore: 98,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊直接交火频次维持高位，多战线军事行动活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡实质性封锁，主要商业航运已全面停止在该区域运行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "市场对供应中断极度恐慌，战争溢价高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军直接参与海上联防与空袭行动，大国联盟对立明显。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道全面冻结，无实质性停火谈判。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军航母轮换强化打击力量",
      description: "罗斯福号航母抵达 CENTCOM 辖区，标志着美军长期维持高压作战部署。来源：DoD。",
      verification: "confirmed",
      timestamp: "2026-07-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗警告霍尔木兹禁区化",
      description: "伊朗军方称任何外国军舰进入敏感海域将面临后果。来源：IRNA。",
      verification: "confirmed",
      timestamp: "2026-07-20",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "原油库存下降加剧供应担忧",
      description: "路透社报道美国商业库存录得超预期降幅，油价获得强支撑。来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-07-21",
      significance: ""
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接交火进入常态化阶段",
      "能源通道遭受物理封锁",
      "国际外交斡旋机制实质性失效"
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
        "延续：美军维持对也门及叙利亚境内代理人目标的定点清除。",
        "延续：伊朗保持弹道导弹部队处于最高戒备状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：红海及海湾地区商业保险费率维持在历史高位。",
        "变化：多加航运巨头宣布至少停航至 2026 年底。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：欧佩克+（OPEC+）产量政策受局势影响偏向保守。",
        "变化：现货市场出现恐慌性抢补库，支撑油价下沿。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申对盟友的防务承诺及对伊制裁不可动摇。",
        "变化：伊朗新任外长拒绝与西方进行任何非对等接触。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均视当前冲突为维护地区主权的核心挑战，无让步空间。"
    ],
    military: [
      "高强度消耗战与航道封锁带来的非对称作战优势。"
    ]
  },
  scoreTrend: [
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98
    },
    {
      date: "07-21",
      score: 98,
      active: true
    }
  ],
  keyChange: "冲突进入高度危险的对峙僵局",
  investmentSignal: "→ 维持防御部位，增持大宗商品及能源资产以对冲地缘政治极端尾部风险。",
  change: "none",
  prevRiskScore: 98,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-21",
  version: "v2.132",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D143",
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
      value: "WTI $80.30–$81.65 · Brent $84.60–$85.90",
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
  riskScore: 98,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "High frequency of direct US-Iran exchanges and active multi-front operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "De facto blockade of the strait; commercial shipping has largely ceased in the region.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Market panic over supply disruption; war premium remains high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US direct participation in naval combat; clear escalation of alliance-based confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels frozen; no substantive ceasefire talks occurring.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Carrier Group Rotates to Middle East",
      description: "USS Theodore Roosevelt arrives in CENTCOM area to sustain high-pressure operations. Source: DoD.",
      verification: "confirmed",
      timestamp: "2026-07-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Issues Exclusion Zone Warning",
      description: "Iranian military warns foreign warships entering sensitive Gulf waters will face consequences. Source: IRNA.",
      verification: "confirmed",
      timestamp: "2026-07-20",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Inventories Drop Heightens Worry",
      description: "Reuters reports unexpected US commercial crude draw, supporting high prices. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-07-21",
      significance: ""
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct combat enters a normalized phase",
      "Physical blockade of energy transit corridors",
      "Systemic failure of international mediation mechanisms"
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
        "Continue: US forces maintain precision strikes on proxy targets in Yemen and Syria.",
        "Continue: Iran keeps ballistic missile units at highest alert status."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Insurance rates for Red Sea and Gulf transit remain at historic highs.",
        "Change: Multiple shipping giants announce suspensions until at least end of 2026."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: OPEC+ maintains a cautious output policy due to volatility.",
        "Change: Panic spot buying supports the floor for crude prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reaffirms defense commitments and sanctions against Iran.",
        "Change: Iran's foreign ministry rejects non-reciprocal contact with Western powers."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Both parties view the conflict as a core sovereignty challenge with no room for retreat."
    ],
    military: [
      "Asymmetric advantages derived from blockade-based attrition warfare."
    ]
  },
  scoreTrend: [
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98
    },
    {
      date: "07-21",
      score: 98,
      active: true
    }
  ],
  keyChange: "Conflict enters a highly dangerous stalemate",
  investmentSignal: "→ Maintain defensive positions; utilize commodities and energy to hedge extreme tail risks.",
  change: "none",
  prevRiskScore: 98,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.132 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 98（持平）：冲突进入高度危险的对峙僵局",
    bannerWarning: "→ 维持防御部位，增持大宗商品及能源资产以对冲地缘政治极端尾部风险。",
    deescalationIntent: "美伊双方均视当前冲突为维护地区主权的核心挑战，无让步空间。",
    structuralRisk: "海峡实质性封锁，主要商业航运已全面停止在该区域运行。",
    contradictionNote: "美伊双方均视当前冲突为维护地区主权的核心挑战，无让步空间。；高强度消耗战与航道封锁带来的非对称作战优势。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第143天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.132 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 98 (Flat): Conflict enters a highly dangerous stalemate",
    bannerWarning: "→ Maintain defensive positions; utilize commodities and energy to hedge extreme tail risks.",
    deescalationIntent: "Both parties view the conflict as a core sovereignty challenge with no room for…",
    structuralRisk: "De facto blockade of the strait; commercial shipping has largely ceased in the region.",
    contradictionNote: "Both parties view the conflict as a core sovereignty challenge with no room for retreat.; Asymmetric advantages derived from blockade-based attrition warfare.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 143",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
