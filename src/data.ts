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
  date: "2026-09-26",
  version: "v2.203",
  keyStats: [
    {
      label: "冲突天数",
      value: "D210",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $91.51–$94.75 · Brent $96.39–$100.26",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分限制",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "双方维持低烈度代理人袭扰与防御性部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "海峡维持部分许可制通行状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "和谈受挫预期升温，Brent触及100美元危机带下沿。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "多国继续通过外交与情报渠道进行周边斡旋。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "美方拒绝分阶段停火方案，谈判进程实质性受挫。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 60,
  events: [
    {
      id: "EVT-01",
      title: "特朗普拒绝分阶段停火提议",
      description: "美国总统公开拒绝了伊朗关于重新开放霍尔木兹海峡并解除封锁的提议，要求对方无条件让步 (Fox News, Reuters)。",
      verification: "confirmed",
      timestamp: "2026-09-26T14:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗重申恢复谈判前提",
      description: "伊朗高层表示，任何实质性降级必须以美国解除海上封锁和释放冻结资产为前提 (Amwaj, Al Jazeera)。",
      verification: "confirmed",
      timestamp: "2026-09-25T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "布伦特原油上探$100关口",
      description: "因和谈受挫预期升温，布伦特原油主力合约盘中触及$100.26，市场地缘风险溢价居高不下 (Bloomberg, WSJ)。",
      verification: "confirmed",
      timestamp: "2026-09-26T17:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "联合国大会期间的外交接触未能突破核心分歧，导致短期停火预期落空。",
      "双方虽避免了直接军事升级，但在霍尔木兹海峡控制权问题上互不让步。"
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
        "延续：双方维持防御性警戒与低烈度代理人袭扰，未爆发新一轮直接交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：航道维持部分许可通行状态，主干商业班轮持续避开该海域。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：和谈乐观情绪消退导致油价重新冲高，Brent触及$100危机带下沿。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方表态趋于强硬，公开拒绝分阶段协议降低了短期达成框架停火的概率。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求全面无条件退让与伊朗坚持解除海上封锁作为先决条件之间的矛盾难以弥合。"
    ],
    military: [
      "联大外交斡旋期间的停火克制与霍尔木兹海峡实质性军事封锁之间的张力持续存在。"
    ]
  },
  scoreTrend: [
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62
    },
    {
      date: "09-26",
      score: 60,
      active: true
    }
  ],
  keyChange: "联合国大会期间美方拒绝分阶段停火提议，谈判进程遇阻导致地缘风险预期重估，综合分小幅上修。",
  investmentSignal: "→ 维持对防御性资产与能源板块的对冲配置，和谈僵局与Brent触及$100关口限制了风险资产的实质性反弹。",
  change: "up",
  prevRiskScore: 62,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-26",
  version: "v2.203",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D210",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $91.51–$94.75 · Brent $96.39–$100.26",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Both sides maintain low-intensity proxy harassment and defensive postures.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The strait maintains a partially restricted transit status under permit systems.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Fading peace talk optimism pushed Brent to touch the $100 crisis boundary.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Multiple nations continue diplomatic and intelligence mediation on the periphery.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "US rejection of the phased ceasefire proposal stalled substantial negotiation progress.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 60,
  events: [
    {
      id: "EVT-01",
      title: "US President Rejects Phased Ceasefire Proposal",
      description: "The US President publicly rejected Iran's proposal to reopen the Strait of Hormuz, demanding unconditional surrender and stalling peace talks (Fox News, Reuters).",
      verification: "confirmed",
      timestamp: "2026-09-26T14:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Reiterates Preconditions for Talks",
      description: "Iranian officials stated that any substantive de-escalation must be preceded by the lifting of the US naval blockade and release of frozen assets (Amwaj, Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-09-25T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Brent Crude Tests $100 Threshold",
      description: "Geopolitical risk premiums spiked as peace talks hit a bottleneck, pushing Brent crude futures to touch $100.26 intraday (Bloomberg, WSJ).",
      verification: "confirmed",
      timestamp: "2026-09-26T17:30:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Diplomatic engagements during the UNGA failed to break the deadlock on core differences, diminishing short-term ceasefire hopes.",
      "Although direct military escalation is avoided, both sides refuse to compromise on control over the Strait of Hormuz."
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
        "Continue: Both ground and naval forces maintain defensive alert postures with no major direct crossfire."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The transit channel remains under partial permit control, forcing major commercial liners to avoid the area."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Fading optimism over peace talks pushed oil prices higher, with Brent touching the lower boundary of the $100 crisis band."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US stance has hardened, heavily reducing the probability of reaching a short-term framework agreement."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The gap between the US demand for unconditional concession and Iran's demand for an immediate blockade lifting remains unbridgeable."
    ],
    military: [
      "Tension persists between the restraint shown during UNGA diplomacy and the ongoing substantial military blockade in the Strait of Hormuz."
    ]
  },
  scoreTrend: [
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62
    },
    {
      date: "09-26",
      score: 60,
      active: true
    }
  ],
  keyChange: "US rejection of the phased ceasefire proposal at the UNGA stalled diplomatic momentum, pushing the composite score slightly higher due to renewed negotiation pessimism.",
  investmentSignal: "→ Maintain hedge allocations in defensive assets and energy sectors, as the negotiation deadlock and Brent touching $100 limit substantial de-risking for risk assets.",
  change: "up",
  prevRiskScore: 62,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.203 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↓2）：联合国大会期间美方拒绝分阶段停火提议，谈判进程遇阻导致地缘风险预期重估，综合分小幅上修。",
    bannerWarning: "→ 维持对防御性资产与能源板块的对冲配置，和谈僵局与Brent触及$100关口限制了风险资产的实质性反弹。",
    deescalationIntent: "美国要求全面无条件退让与伊朗坚持解除海上封锁作为先决条件之间的矛盾难以弥合。",
    structuralRisk: "海峡维持部分许可制通行状态。",
    contradictionNote: "美国要求全面无条件退让与伊朗坚持解除海上封锁作为先决条件之间的矛盾难以弥合。；联大外交斡旋期间的停火克制与霍尔木兹海峡实质性军事封锁之间的张力持续存在。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第210天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.203 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↓2): US rejection of the phased ceasefire proposal at the UNGA stalled diplomatic momentum, pushing the composite score slightly higher due to r…",
    bannerWarning: "→ Maintain hedge allocations in defensive assets and energy sectors, as the negotiation deadlock and Brent touching $10…",
    deescalationIntent: "The gap between the US demand for unconditional concession and Iran's demand fo…",
    structuralRisk: "The strait maintains a partially restricted transit status under permit systems.",
    contradictionNote: "The gap between the US demand for unconditional concession and Iran's demand for an immediate blockade lifting remains unbridgeable.; Tension persists between …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 210",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
