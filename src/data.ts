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
  keyStats: [
    {
      label: "冲突天数",
      value: "D211",
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
      value: "WTI $91.51–$94.75 · Brent $96.39–$100.26",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分受限/谈判中",
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
      description: "军事行动处于静默期，主要表现为口头与防御性威慑。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "霍尔木兹海峡封锁未解，但已成为美伊外交谈判的核心筹码。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "停火预期带动部分风险溢价回吐，但宽阔的WTI/Brent价差显示地缘不确定性仍在支撑市场。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国聚焦于通过卡塔尔等中间方推动停火协议，军事姿态转为观望。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "双方释放明确善意并提出重返6月框架的可能，但距离最终签署正式协议仍存核心阻力。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 60,
  events: [
    {
      id: "EVT-01",
      title: "伊朗提出霍尔木兹海峡解封方案",
      description: "伊朗外长阿拉格齐在联合国提出，若美国满足条件，可在一周内恢复霍尔木兹海峡正常航运（BBC / The Business Times）。",
      verification: "confirmed",
      timestamp: "2026-09-26T14:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美方对解封提议保持谨慎",
      description: "美国总统据报对伊朗满足停火条件持怀疑态度，美伊双方谈判代表在纽约继续探索分阶段降级路径（WSJ / Reuters）。",
      verification: "confirmed",
      timestamp: "2026-09-26T16:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊在联合国大会期间的间接谈判成为当前局势焦点。",
      "海峡通行权被用作核心外交筹码，实质性让步仍需高层政治决断。"
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
        "延续：伊朗军方警告若美方采取新行动将打击其地区资产，前线暂无新交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗明确提出七日内解封海峡的时间表，前提是满足制裁解除等条件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：停火谈判推进促使Brent与WTI高位承压回落，但Brent中枢仍在百元附近。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗高层通过多渠道释放谈判条件，美方高层虽有质疑但未关闭接触窗口。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国大选前控制油价的需求与伊朗谋求解除制裁的底线博弈。"
    ],
    military: [
      "伊朗维系区域威慑的需要与美军在海湾保持压倒性部署的冲突。"
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "09-27",
      score: 60,
      active: true
    }
  ],
  keyChange: "美伊在联合国大会的谈判触及霍尔木兹海峡解封，外交渠道活跃但未达实质性停火协议。",
  investmentSignal: "→ 维持防御性资产配置，由于地缘停火协议仍未落地，建议投资者对冲能源多头头寸以应对盘面波动。",
  change: "none",
  date: "2026-09-27",
  version: "v2.204",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  keyStats: [
    {
      label: "Conflict Days",
      value: "D211",
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
      value: "WTI $91.51–$94.75 · Brent $96.39–$100.26",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted/In Talks",
      unit: "Transit",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Military actions are in a quiet period, characterized mainly by verbal and defensive deterrence.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The Strait blockade persists but has become a core bargaining chip in US-Iran diplomacy.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Ceasefire expectations prompted some risk premium unwinding, though a wide WTI-Brent spread indicates lingering geopolitical uncertainty.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US is focused on advancing a ceasefire deal via intermediaries, adopting a watchful military posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Both sides sent clear goodwill signals and floated a return to the June framework, but core disagreements prevent a formal agreement.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 60,
  events: [
    {
      id: "EVT-01",
      title: "Iran Proposes Strait of Hormuz Reopening Plan",
      description: "Iranian FM Araghchi told the UN that the Strait could reopen within a week if the US meets preconditions (BBC / The Business Times).",
      verification: "confirmed",
      timestamp: "2026-09-26T14:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Cautious on Blockade Lift Proposal",
      description: "The US President reportedly expressed skepticism regarding Iran's commitment to ceasefire conditions as talks continue in NY (WSJ / Reuters).",
      verification: "confirmed",
      timestamp: "2026-09-26T16:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Indirect negotiations at the UN General Assembly have become the focal point of the current situation.",
      "Transit rights are leveraged as core diplomatic chips, requiring high-level political resolve for substantial concessions."
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
        "Continue: The Iranian military warned of retaliation against regional US assets if new actions are taken; frontlines remain quiet."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran explicitly outlined a 7-day timeline for unblocking the Strait, conditioned on sanctions relief."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Progress in negotiations caused Brent and WTI to dip from highs, though Brent's upper bound remains near $100."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian leadership communicated negotiation terms through multiple channels; US officials maintained contact despite skepticism."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The friction between US pre-election needs to control oil prices and Iran's bottom line for sanctions relief."
    ],
    military: [
      "The clash between Iran's need to maintain regional deterrence and the overwhelming US military deployment in the Gulf."
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "09-27",
      score: 60,
      active: true
    }
  ],
  keyChange: "US-Iran talks at the UNGA addressed unblocking the Strait of Hormuz; diplomatic channels are highly active despite no final ceasefire agreement.",
  investmentSignal: "→ Maintain a defensive asset allocation; with a formal ceasefire pending, hedging energy positions is recommended against market volatility.",
  change: "none",
  date: "2026-09-27",
  version: "v2.204",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.204 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：美伊在联合国大会的谈判触及霍尔木兹海峡解封，外交渠道活跃但未达实质性停火协议。",
    bannerWarning: "→ 维持防御性资产配置，由于地缘停火协议仍未落地，建议投资者对冲能源多头头寸以应对盘面波动。",
    deescalationIntent: "美国大选前控制油价的需求与伊朗谋求解除制裁的底线博弈。",
    structuralRisk: "霍尔木兹海峡封锁未解，但已成为美伊外交谈判的核心筹码。",
    contradictionNote: "美国大选前控制油价的需求与伊朗谋求解除制裁的底线博弈。；伊朗维系区域威慑的需要与美军在海湾保持压倒性部署的冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第211天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.204 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): US-Iran talks at the UNGA addressed unblocking the Strait of Hormuz; diplomatic channels are highly active despite no final ceasefire agree…",
    bannerWarning: "→ Maintain a defensive asset allocation; with a formal ceasefire pending, hedging energy positions is recommended again…",
    deescalationIntent: "The friction between US pre-election needs to control oil prices and Iran's bot…",
    structuralRisk: "The Strait blockade persists but has become a core bargaining chip in US-Iran diplomacy.",
    contradictionNote: "The friction between US pre-election needs to control oil prices and Iran's bottom line for sanctions relief.; The clash between Iran's need to maintain region…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 211",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
