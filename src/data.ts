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
  date: "2026-09-07",
  version: "v2.181",
  riskScore: 70,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D191",
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
      value: "WTI $83.50–$85.50 · Brent $87.80–$89.90",
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
      description: "美伊直接军事资产对垒升级，IRGC 在拉拉克岛举行大规模演习。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC 演习导致海峡通行实质性收缩，保费高企令商业班轮停运。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在高位震荡，反映了航道封锁忧虑与全球需求疲软的拉锯。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事介入主要表现为防御性部署增强，尚未转向进攻性干预。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "联合国尝试建立停火机制，但美伊双方对人道主义窗口条件存在分歧。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC 拉拉克岛海空演习",
      description: "伊朗革命卫队展示反舰导弹与无人机技术，强化对霍尔木兹海峡的实控形象。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-09-07T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军 F-35 中队抵达 CentCom",
      description: "旨在对抗伊朗空中威胁并提供护航支援。来源：DoD 官网。",
      verification: "confirmed",
      timestamp: "2026-09-07T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "联合国提出 48 小时停火窗口",
      description: "用于撤离受困商船，目前双方反应冷淡。来源：UN News。",
      verification: "single",
      timestamp: "2026-09-07T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方保持“不首先发动全面战争”的克制，但在关键航道进行极限施压。",
      "能源溢价成为主要的对抗杠杆而非地面交火。",
      "外交渠道处于僵冷状态，缺乏高层直接沟通。"
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
        "延续：美军资产保持高频警戒飞行。",
        "变化：伊朗将演习区域向海峡核心区推移（AP）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：由于风险等级未降，商业保险费用维持在高位。",
        "延续：海峡通行维持许可制式的严苛检查。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场出现针对远期合约的恐慌性套保行为（Bloomberg）。",
        "延续：实物供应受阻，现货溢价（Backwardation）结构加剧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗领导层强调封锁权作为反制工具。",
        "变化：华盛顿内部出现关于加强二级制裁的讨论（WSJ）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗将航道封锁作为筹码与美国要求的无条件自由航行之间的矛盾。"
    ],
    military: [
      "美军区域力量增强与伊朗国土防御/区域阻绝战略的直接对抗。"
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "09-07",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊双方完成新一轮资产部署，局势由动态对抗转向高位僵持。",
  investmentSignal: "→ 维持能源类资产对冲头寸，减持高贝塔风险资产，关注黄金避险机会。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-07",
  version: "v2.181",
  riskScore: 70,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D191",
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
      value: "WTI $83.50–$85.50 · Brent $87.80–$89.90",
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
      description: "High-pressure confrontation with significant asset deployment near the Strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC drills and high premiums force commercial liners to maintain diversions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices stable but elevated, pricing in long-term disruption risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US continues direct defensive deployment without entering active joint operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "UN-led truce proposal lacks enforcement mechanism and mutual buy-in.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Naval Drills near Larak Island",
      description: "IRGC displays anti-ship missiles and drone swarms to demonstrate blockade capability. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-09-07T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US F-35 Squadron Arrives at CentCom",
      description: "Reinforcements aimed at countering Iranian aerial threats and supporting escorts. Source: DoD.",
      verification: "confirmed",
      timestamp: "2026-09-07T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "UN Proposes 48-Hour Truce Window",
      description: "Targeted at allowing trapped commercial vessels to exit; lukewarm response. Source: UN News.",
      verification: "single",
      timestamp: "2026-09-07T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strategic encirclement and counter-encirclement without total war.",
      "Energy premium serves as the primary lever of statecraft.",
      "Diplomatic channels remain frozen with minimal communication."
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
        "Continue: US assets maintaining high-frequency patrol flights.",
        "Change: Iran pushing drill zones closer to core shipping lanes (AP)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Insurance premiums stay high due to unresolved risk levels.",
        "Continue: Strict inspection protocols by Iranian authorities in the Strait."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Panic hedging observed in long-term contracts (Bloomberg).",
        "Continue: Physical supply constraints exacerbating backwardation structure."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian leadership emphasizes the 'right to block' as a retaliatory tool.",
        "Change: Internal Washington discussions regarding intensified secondary sanctions (WSJ)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The contradiction between Iran's use of shipping as leverage and the US demand for freedom of navigation."
    ],
    military: [
      "Direct confrontation between US regional asset buildup and Iran's A2/AD strategy."
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "09-07",
      score: 70,
      active: true
    }
  ],
  keyChange: "Both parties have completed asset repositioning, transitioning the conflict into a high-pressure standoff.",
  investmentSignal: "→ Maintain energy hedges, reduce exposure to high-beta risk assets, and prioritize gold as a defensive play.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.181 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊双方完成新一轮资产部署，局势由动态对抗转向高位僵持。",
    bannerWarning: "→ 维持能源类资产对冲头寸，减持高贝塔风险资产，关注黄金避险机会。",
    deescalationIntent: "伊朗将航道封锁作为筹码与美国要求的无条件自由航行之间的矛盾。",
    structuralRisk: "IRGC 演习导致海峡通行实质性收缩，保费高企令商业班轮停运。",
    contradictionNote: "伊朗将航道封锁作为筹码与美国要求的无条件自由航行之间的矛盾。；美军区域力量增强与伊朗国土防御/区域阻绝战略的直接对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第191天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.181 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Both parties have completed asset repositioning, transitioning the conflict into a high-pressure standoff.",
    bannerWarning: "→ Maintain energy hedges, reduce exposure to high-beta risk assets, and prioritize gold as a defensive play.",
    deescalationIntent: "The contradiction between Iran's use of shipping as leverage and the US demand …",
    structuralRisk: "IRGC drills and high premiums force commercial liners to maintain diversions.",
    contradictionNote: "The contradiction between Iran's use of shipping as leverage and the US demand for freedom of navigation.; Direct confrontation between US regional asset build…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 191",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
