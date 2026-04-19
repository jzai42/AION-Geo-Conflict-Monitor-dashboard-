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
    layout?: "default" | "unitPrimary";
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
  date: "2026-04-19",
  version: "v2.38",
  riskScore: 68,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description:
        "停火违规指控与追加打击威胁上升，但过去24小时未见双源确认的新大规模直接打击。参考：Reuters、AP。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 3,
      weight: 0.2,
      description: "海峡重新关闭/严重受限，为过去24小时最核心恶化变量。参考：Reuters、AP。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description:
        "海峡重新关闭显著抬升供应风险；报道未显示过去24小时油价重新突破极端峰值。参考：Reuters。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "巴基斯坦中介与安保安排上升，但未见新增大国直接军事介入。参考：AP。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 4,
      weight: 0.2,
      description: "谈判仍在巴基斯坦推进，但停火已现严重摩擦，短期去升级可信度下降。参考：Reuters。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D50",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $84–$91 · Brent $89–$95",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "海峡关闭/严重受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普指伊朗“完全违反”停火并威胁追加打击",
      description:
        "特朗普称因霍尔木兹附近船只遇袭与伊朗重新关闭海峡，伊朗已“完全违反”停火；威胁若伊朗不接受美方协议将打击电厂与桥梁，同时称美方代表将赴巴基斯坦继续谈判。Reuters、AP。",
      verification: "confirmed",
      timestamp: "2026-04-19（当日公开报道）",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹再次关闭，条件为美国解除对伊港口封锁",
      description:
        "伊朗重新关闭霍尔木兹，并表示在美国解除对伊朗港口封锁前不会恢复正常通行；Reuters 与 AP 均描述海峡重新处于关闭/严重受限状态。",
      verification: "confirmed",
      timestamp: "2026-04-18 至 2026-04-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "谈判将恢复，分歧仍集中在核与海峡条件",
      description:
        "特朗普称美伊谈判将在巴基斯坦继续；AP 称巴基斯坦已加强安保以准备恢复会谈，伊朗仍坚持解除封锁与更长期安排。Reuters、AP。",
      verification: "confirmed",
      timestamp: "2026-04-19（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "伊朗军方关于海峡通行与“协调通行”的表述",
      description:
        "Guardian 报道伊朗军方强调仅在特定条件下可能恢复通行，并称曾对尝试通过的船只开火。单源，待更多互证。The Guardian。",
      verification: "single",
      timestamp: "2026-04-19（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "巴基斯坦加强安保以筹备恢复会谈",
      description: "AP 报道巴方加强安保与后勤，为下一轮美伊接触做准备。",
      verification: "confirmed",
      timestamp: "2026-04-19（当日公开报道）",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火框架受到严重冲击：违规指控与追加打击威胁并行",
      "关键变化：霍尔木兹再度关闭，开放条件与美方封锁深度绑定",
      "去升级路径未消失，但局势已从谈判窗口滑向高风险边缘博弈"
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
        "变化：美伊直接停火框架受到严重冲击；主变化为停火违规指控与追加打击威胁。",
        "延续：过去24小时内尚未见经双源确认的新一轮大规模空袭落地。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹重新进入关闭/严重受限状态；开放再次与“解除美方封锁”挂钩。",
        "延续：当前仍非正常商业通航状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场重新计入海峡关闭风险。",
        "延续：结构上仍为高波动能源风险；报道亦提及会谈将继续的缓和预期。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方强硬威胁升级，但仍称谈判将在巴基斯坦继续。",
        "延续：伊朗坚持先解除封锁；巴基斯坦继续作为谈判中介。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方威胁升级与仍派员赴巴谈判之间的张力",
      "伊朗封锁海峡与寻求解除美方封锁条件之间的张力"
    ],
    military: ["谈判渠道尚存与海峡军事化风险骤升之间的张力"]
  },
  scoreTrend: [
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68,
      active: true
    }
  ],
  keyChange:
    "停火出现严重摩擦，霍尔木兹再度关闭；局势从低强度对峙滑向高风险边缘博弈，综合分较上日 +8。",
  investmentSignal: "→ 立即恢复防御与能源对冲配置，不应把当前局势视为稳定谈判期。",
  prevRiskScore: 60,
  webSources: [
    {
      title: "Trump accuses Iran of 'total violation' of ceasefire, threatens new attacks",
      uri: "https://www.reuters.com/world/asia-pacific/trump-iran-cite-progress-talks-uncertainty-hangs-over-strait-2026-04-19/"
    },
    {
      title: "Iran closes strait of Hormuz again 'until US lifts blockade'",
      uri: "https://www.theguardian.com/world/2026/apr/18/iran-closes-strait-of-hormuz-again-until-us-lifts-blockade"
    },
    {
      title: "The Latest: Trump says talks to resume as standoff escalates over Strait of Hormuz",
      uri: "https://apnews.com/article/ab529b5f926a274ca7dc8ce3f1042b56"
    }
  ],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-19",
  version: "v2.38",
  riskScore: 68,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 4,
      weight: 0.2,
      description:
        "Ceasefire-violation allegations and follow-on strike threats rose, but no dual-source confirmation of a new large-scale kinetic exchange in 24h. Sources: Reuters, AP.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 3,
      weight: 0.2,
      description:
        "Strait back in closed/severe restriction—core deterioration variable for the window. Sources: Reuters, AP.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description:
        "Strait closure reprices supply risk sharply; reporting did not show oil re-breaking extreme highs in 24h. Sources: Reuters.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description:
        "Pakistan mediation/security footprint rises; no new major-power direct military entry. Sources: AP.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 4,
      weight: 0.2,
      description:
        "Talks still scheduled, but ceasefire friction is severe—near-term de-escalation credibility down. Sources: Reuters.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D50",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $84–$91 · Brent $89–$95",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Strait Closed / Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump accuses Iran of 'total' ceasefire breach, threatens further strikes",
      description:
        "Trump ties the breach to Hormuz incidents and renewed closure; threatens power plants and bridges if Iran rejects the US proposal, while saying talks will continue in Pakistan. Reuters, AP.",
      verification: "confirmed",
      timestamp: "2026-04-19 (same-day reporting)",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Hormuz closed again until US lifts port blockade",
      description:
        "Iran re-closes Hormuz and conditions reopening on lifting the US blockade on Iranian ports; Reuters and AP describe closure/severe restriction. 2026-04-18 to 2026-04-19.",
      verification: "confirmed",
      timestamp: "2026-04-18 to 2026-04-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Talks to resume; gaps remain on nuclear and strait terms",
      description:
        "Trump says US–Iran talks continue in Pakistan; AP reports tighter security for resumed sessions while Iran still demands blockade relief and longer-term terms. Reuters, AP.",
      verification: "confirmed",
      timestamp: "2026-04-19 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "IRGC messaging on strait access and warning shots",
      description:
        "Guardian reports IRGC emphasis on conditional reopening and warning shots at attempted transits—single source pending corroboration. The Guardian.",
      verification: "single",
      timestamp: "2026-04-19 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Pakistan tightens security ahead of resumed talks",
      description: "AP notes enhanced security and logistics preparation for the next US–Iran contact round.",
      verification: "confirmed",
      timestamp: "2026-04-19 (same-day reporting)",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire framework under heavy strain: violation claims and strike threats in parallel",
      "Key shift: Hormuz closed again; reopening tied to US blockade relief",
      "De-escalation paths not gone, but the edge-game risk is back from the negotiation window"
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
        "Change: Direct ceasefire framework under strain; main delta is violation allegations plus follow-on strike threats.",
        "Continue: No dual-source confirmation of a new large-scale air campaign inside 24h."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Strait back to closed/severe restriction; reopening again tied to lifting the US blockade.",
        "Continue: Not normal commercial throughput."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Markets re-price strait-closure risk.",
        "Continue: High-volatility energy risk; reporting also notes talks-continue relief trades."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US rhetoric hardens while still scheduling Pakistan talks.",
        "Continue: Iran insists on blockade relief first; Pakistan remains the venue/broker."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US escalation threats vs. continued envoy travel to Pakistan talks",
      "Iranian strait closure vs. demands to lift the US port blockade"
    ],
    military: ["Talks still alive while strait militarization risk jumps"]
  },
  scoreTrend: [
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68,
      active: true
    }
  ],
  keyChange:
    "Severe ceasefire friction and Hormuz re-closure; slide from low-intensity standoff to high edge-game risk—composite +8 vs prior close.",
  investmentSignal:
    "→ Restore defensive and energy hedges immediately; do not treat this as a stable negotiation window.",
  prevRiskScore: 60,
  webSources: [
    {
      title: "Trump accuses Iran of 'total violation' of ceasefire, threatens new attacks",
      uri: "https://www.reuters.com/world/asia-pacific/trump-iran-cite-progress-talks-uncertainty-hangs-over-strait-2026-04-19/"
    },
    {
      title: "Iran closes strait of Hormuz again 'until US lifts blockade'",
      uri: "https://www.theguardian.com/world/2026/apr/18/iran-closes-strait-of-hormuz-again-until-us-lifts-blockade"
    },
    {
      title: "The Latest: Trump says talks to resume as standoff escalates over Strait of Hormuz",
      uri: "https://apnews.com/article/ab529b5f926a274ca7dc8ce3f1042b56"
    }
  ],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.38 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal:
      "综合评分 68（↑8）：停火严重摩擦、霍尔木兹再度关闭；局势从谈判窗口滑向高风险边缘博弈。",
    bannerWarning: "→ 立即恢复防御与能源对冲配置，不应把当前局势视为稳定谈判期。",
    deescalationIntent: "美方威胁升级与仍派员赴巴谈判之间的张力",
    structuralRisk: "霍尔木兹重新关闭/严重受限，为24h核心恶化变量",
    contradictionNote: "美方威胁升级与仍派员赴巴谈判之间的张力；谈判渠道尚存与海峡军事化风险骤升之间的张力",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第50天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.38 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal:
      "Composite 68 (↑8): Severe ceasefire friction and Hormuz re-closure; edge-game risk returns from the negotiation window.",
    bannerWarning:
      "→ Restore defensive and energy hedges immediately; do not treat this as a stable negotiation window.",
    deescalationIntent: "US escalation rhetoric vs. continued envoy travel to Pakistan talks",
    structuralRisk: "Strait closed/severe restriction—core 24h deterioration variable",
    contradictionNote:
      "US escalation rhetoric vs. continued Pakistan talks; talks still alive while strait militarization risk jumps",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 50",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
