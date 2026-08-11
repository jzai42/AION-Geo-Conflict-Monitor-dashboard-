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
  date: "2026-08-11",
  version: "v2.154",
  riskScore: 74,
  change: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D164",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $86.40–$88.15 · Brent $90.10–$92.45",
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
      description: "美军在叙利亚东部实施针对性报复打击，代理人冲突烈度显著。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道流量持续低迷，保险成本飙升导致商业航运受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "油价中枢上移，地缘政治溢价重新主导市场情绪。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军维持既有规模部署，外交施压代替了进一步军事扩张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "谈判渠道虽未中断，但双方缺乏共识，进展极缓。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军空袭叙利亚境内目标",
      description: "美国中央司令部确认袭击了属于伊朗代理人的无人机设施。",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "海峡航运保费暴涨",
      description: "伦敦保险市场因局势不稳上调霍尔木兹海峡附加费。",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理人冲突范围向叙利亚东部转移",
      "能源市场风险定价重新回归高点",
      "外交谈判陷入机制性僵局"
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
        "变化：美军在叙利亚实施了报复性打击，作为对此前基地受袭的回应。",
        "延续：伊朗代理人在伊拉克境内的低烈度骚扰依然持续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行维持受限状态，商船采取护航模式比例上升。",
        "变化：保费上调导致绕行好望角的原油运输量增加。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI与Brent均突破近期压力位，市场呈现恐慌性补仓迹象。",
        "延续：中东供应中断的长期担忧继续支撑油价溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申不寻求地区战争，但保留打击代理人的权利。",
        "变化：伊朗外交部明确拒绝了无前提条件的临时停火建议。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在“制裁解除”与“地区撤军”上的核心顺序分歧。",
      "区域大国对于通过军事施压换取谈判筹码的路径依赖。"
    ],
    military: [
      "非对称战争手段（无人机/代理人）导致冲突极易越过红线。",
      "霍尔木兹海峡的封锁威胁与反封锁部署的结构性对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74,
      active: true
    }
  ],
  keyChange: "能源风险溢价回归带动综合风险回升至72分。",
  investmentSignal: "→ 增持能源与对冲资产，防御大宗商品因地缘突发事件而产生的剧烈波动。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-11",
  version: "v2.154",
  riskScore: 74,
  change: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D164",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $86.40–$88.15 · Brent $90.10–$92.45",
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
      description: "US carried out retaliatory strikes in Eastern Syria against proxy drone bases.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic remains low with surging insurance premiums hindering commercial transit.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "Oil prices shifted upward as geopolitical premiums return to the market.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains high posture while focusing on diplomatic containment over ground expansion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Communication channels remain open via Oman but lack substantive breakthroughs.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Airstrikes in Syria",
      description: "CENTCOM confirmed strikes on drone facilities used by Iranian proxies.",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Shipping Insurance Surge",
      description: "London insurance market raised additional premiums for Strait of Hormuz transit.",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift of proxy conflict theater to Eastern Syria",
      "Return of risk pricing in global energy markets",
      "Structural deadlock in diplomatic negotiations"
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
        "Change: US conducted retaliatory strikes in Syria responding to previous base attacks.",
        "Continue: Low-intensity harassment by Iranian proxies in Iraq remains constant."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait transit remains restricted with increased escort frequency.",
        "Change: Higher premiums are driving more crude to bypass via the Cape."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: WTI and Brent broke recent resistance levels on panic covering.",
        "Continue: Supply concern in the Middle East continues to support premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates no intent for regional war but will strike back.",
        "Change: Iran explicitly rejected unconditional interim ceasefire proposals."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Disagreement on the sequencing of 'sanctions relief' vs 'military withdrawal'.",
      "Reliance on military pressure as a primary bargaining chip by regional actors."
    ],
    military: [
      "Asymmetric warfare tools (UAVs/proxies) risk crossing escalation thresholds.",
      "Structural confrontation between blockade threats and anti-blockade deployments."
    ]
  },
  scoreTrend: [
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74,
      active: true
    }
  ],
  keyChange: "Rebound in energy risk premiums led the composite score back to 72.",
  investmentSignal: "→ Overweight energy and defensive hedging assets to buffer against volatility from geopolitical shocks.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.154 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↑4）：能源风险溢价回归带动综合风险回升至72分。",
    bannerWarning: "→ 增持能源与对冲资产，防御大宗商品因地缘突发事件而产生的剧烈波动。",
    deescalationIntent: "美伊双方在“制裁解除”与“地区撤军”上的核心顺序分歧。",
    structuralRisk: "航道流量持续低迷，保险成本飙升导致商业航运受阻。",
    contradictionNote: "美伊双方在“制裁解除”与“地区撤军”上的核心顺序分歧。；非对称战争手段（无人机/代理人）导致冲突极易越过红线。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第164天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.154 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↑4): Rebound in energy risk premiums led the composite score back to 72.",
    bannerWarning: "→ Overweight energy and defensive hedging assets to buffer against volatility from geopolitical shocks.",
    deescalationIntent: "Disagreement on the sequencing of 'sanctions relief' vs 'military withdrawal'.",
    structuralRisk: "Traffic remains low with surging insurance premiums hindering commercial transit.",
    contradictionNote: "Disagreement on the sequencing of 'sanctions relief' vs 'military withdrawal'.; Asymmetric warfare tools (UAVs/proxies) risk crossing escalation thresholds.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 164",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
