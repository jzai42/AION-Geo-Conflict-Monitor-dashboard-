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
  date: "2026-08-06",
  version: "v2.148",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D159",
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
      value: "WTI $78.42–$80.15 · Brent $82.25–$84.10",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "显著受限",
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
      description: "双方军队在波斯湾保持高战备状态，伊朗空军增加边界巡逻频次。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道虽未完全封锁，但由于骚扰事件频发，商业保险费率维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "原油价格在 $80 下方波动，避险情绪部分被库存增加对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军增派两艘导弹驱逐舰进入红海与阿曼湾地区，介入深度维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中介渠道虽在运行，但实质性停火协议缺乏关键突破点。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美国务卿宣布开启中东斡旋外交",
      description: "旨在通过穿梭外交协调各方立场，缓和因近期无人机事件引发的紧张态势。来源：Associated Press.",
      verification: "confirmed",
      timestamp: "2026-08-06T09:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡发生“不安全”接近事件",
      description: "伊朗快艇对一艘通过该海峡的外国商船进行了长时间伴航并发出警告。来源：Reuters.",
      verification: "confirmed",
      timestamp: "2026-08-06T04:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "战线从直接交火转向长期的战略意志损耗",
      "霍尔木兹海峡成为双方互亮筹码的常态化博弈区",
      "大国因素开始主导短期风险上限，防止局势彻底失控"
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
        "延续：美伊双方在边界及争议水域维持电子战监测对抗。",
        "延续：代理武装在叙利亚边境的零星活动有所收敛。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行流量稳定在正常水平的 60%-70% 之间。",
        "变化：由于频繁的拦截事件，中型油轮更倾向于组队通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价昨日冲高后回落，市场开始权衡地缘风险与经济放缓风险。",
        "延续：中东主要产油国暂时维持现有增产计划不变。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗外交部淡化了近期“立即反击”的言辞，转向法律诉求。",
        "变化：美方释放出若海峡通行稳定，可讨论部分非核心制裁豁免的信号。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的区域安全主导权要求与美国军事存在的长期结构性矛盾",
      "制裁解除与核计划合规性的旧有框架陷入僵局"
    ],
    military: [
      "霍尔木兹海峡航行自由与伊朗国土安全防御半径的重叠"
    ]
  },
  scoreTrend: [
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72,
      active: true
    }
  ],
  keyChange: "风险评分趋稳，市场进入“脱敏期”，关注点从即时冲突转向长期封锁的影响。",
  investmentSignal: "→ 维持能源资产对冲，适度增加低Beta风险资产防御。",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-06",
  version: "v2.148",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D159",
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
      value: "WTI $78.42–$80.15 · Brent $82.25–$84.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Significantly Restricted",
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
      description: "Both militaries maintain high readiness in the Persian Gulf with increased air patrols.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait remains open but harassed; insurance premiums stay elevated due to safety incidents.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices fluctuating below $80; risk premium offset by inventory gains.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US deploys additional destroyers to the region, maintaining a deep presence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Channels active but substantive ceasefire progress remains elusive.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Secretary of State Announces Regional Diplomacy",
      description: "Aiming to coordinate positions and de-escalate tensions following recent incidents. Source: Associated Press.",
      verification: "confirmed",
      timestamp: "2026-08-06T09:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Unsafe Approach Incident in Hormuz Strait",
      description: "Iranian speedboats shadowed a foreign merchant vessel for an extended period. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-08-06T04:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict shifting from active kinetic engagement to strategic attrition",
      "Hormuz Strait remains a normalized site for leverage maneuvering",
      "Great power presence capping the immediate ceiling of risk"
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
        "Continue: EW monitoring and electronic jamming activities ongoing in disputed waters.",
        "Continue: Proxy activities near Syrian border have stabilized at lower levels."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Traffic volume stabilized between 60%-70% of normal baseline.",
        "Change: Medium tankers adopting convoy-like formations due to interception risks."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices retraced after early spike; markets balancing geopolitical risk vs demand.",
        "Continue: Major Middle East producers maintain current output levels."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian MFA softening immediate retaliation rhetoric towards legal avenues.",
        "Change: US hinting at potential non-core sanction waivers if maritime stability is kept."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Structural contradiction between Iran's regional security demands and US presence",
      "Deadlock in the framework for sanction relief vs nuclear compliance"
    ],
    military: [
      "Overlap between Freedom of Navigation in Hormuz and Iran's defense perimeter"
    ]
  },
  scoreTrend: [
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72,
      active: true
    }
  ],
  keyChange: "Risk score stabilizing; market entering a desensitization phase focusing on long-term blockade impacts.",
  investmentSignal: "→ Maintain energy hedges, modestly increase defense in low-beta risk assets.",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.148 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：风险评分趋稳，市场进入“脱敏期”，关注点从即时冲突转向长期封锁的影响。",
    bannerWarning: "→ 维持能源资产对冲，适度增加低Beta风险资产防御。",
    deescalationIntent: "伊朗的区域安全主导权要求与美国军事存在的长期结构性矛盾",
    structuralRisk: "航道虽未完全封锁，但由于骚扰事件频发，商业保险费率维持高位。",
    contradictionNote: "伊朗的区域安全主导权要求与美国军事存在的长期结构性矛盾；霍尔木兹海峡航行自由与伊朗国土安全防御半径的重叠",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第159天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.148 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Risk score stabilizing; market entering a desensitization phase focusing on long-term blockade impacts.",
    bannerWarning: "→ Maintain energy hedges, modestly increase defense in low-beta risk assets.",
    deescalationIntent: "Structural contradiction between Iran's regional security demands and US presen…",
    structuralRisk: "Strait remains open but harassed; insurance premiums stay elevated due to safety incidents.",
    contradictionNote: "Structural contradiction between Iran's regional security demands and US presence; Overlap between Freedom of Navigation in Hormuz and Iran's defense perimeter",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 159",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
