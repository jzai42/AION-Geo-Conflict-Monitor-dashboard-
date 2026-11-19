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
  date: "2026-11-19",
  version: "v2.258",
  keyStats: [
    {
      label: "冲突天数",
      value: "D264",
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
      value: "WTI $81.66–$83.89 · Brent $88.51–$90.70",
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
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    }
  ],
  riskScore: 70,
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "详见下方事件卡片。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "特朗普考虑与以色列联合打击伊朗",
      description: "公开报道显示，特朗普仍在考虑与以色列联合对伊朗发动新一轮打击，尽管此前称“极不可能”。",
      verification: "confirmed",
      timestamp: "2026-11-19",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美英法德在IAEA会议上敦促伊朗恢复核设施检查",
      description: "路透社报道，美国、英国、法国和德国在国际原子能机构会议上联合敦促伊朗允许检查人员重返其去年被轰炸的核设施。",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美国前反恐中心主任因反战辞职",
      description: "CFR报道，美国前国家反恐中心主任乔·肯特因认为伊朗不构成迫在眉睫威胁并反对战争而辞职。",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IEA称霍尔木兹海峡能源冲击将持续十年",
      description: "美联社援引IEA观点称，伊朗战争切断霍尔木兹海峡后，能源冲击将持续十年及更久。",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "油价因库存上升回落，但中东风险仍支撑价格",
      description: "路透等报道指出，尽管美国原油库存增加压制油价，但霍尔木兹航运风险仍对油价形成支撑。",
      verification: "confirmed",
      timestamp: "2026-11-19",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普考虑联合打击伊朗，军事升级风险上升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹航运风险持续存在，未见缓解。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因库存上升略回落，但中东风险仍支撑价格。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国前反恐中心主任辞职，反战声音显现。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国政府内部对是否继续军事行动存在分歧。"
    ],
    military: [
      "军事威胁升级与能源市场回落形成矛盾信号。"
    ]
  },
  scoreTrend: [
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70
    },
    {
      date: "11-18",
      score: 70
    },
    {
      date: "11-19",
      score: 70,
      active: true
    }
  ],
  keyChange: "特朗普考虑军事选项，能源市场虽回落但风险仍在。",
  investmentSignal: "→ 防御方向：建议维持或增持能源与大宗商品类资产，防御中东风险冲击。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-19",
  version: "v2.258",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D264",
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
      value: "WTI $81.66–$83.89 · Brent $88.51–$90.70",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely restricted",
      unit: "Transit status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "unverified"
    }
  ],
  riskScore: 70,
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "See event cards below."
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "Trump considering joint strike with Israel on Iran",
      description: "Public reports show Trump is still considering a joint strike with Israel on Iran, despite earlier saying it was “quite unlikely.”",
      verification: "confirmed",
      timestamp: "2026-11-19",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US, UK, France, Germany press Iran at IAEA to resume nuclear inspections",
      description: "Reuters reports that the US, UK, France and Germany jointly urged Iran at the IAEA to allow inspectors back into its bombed nuclear sites.",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Former NCTC director resigns over anti‑war stance",
      description: "CFR reports that the former US National Counterterrorism Center director resigned, citing that Iran posed no imminent threat and opposing the war.",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IEA says Hormuz energy shock will last a decade",
      description: "AP cites IEA saying that energy shock from the Iran war cutting off the Strait of Hormuz will last for the next decade and beyond.",
      verification: "single",
      timestamp: "2026-11-19",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil prices fall on inventory rise but Middle East risks support",
      description: "Reports from Reuters and EnergyNow indicate that although US crude inventories rose, weighing on oil prices, Middle East shipping risks continue to support them.",
      verification: "confirmed",
      timestamp: "2026-11-19",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump considering joint strike on Iran, raising escalation risk."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hormuz shipping risks persist, no relief."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices slightly retreat on inventory rise, but Middle East risks still support."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Former NCTC director resigns, anti‑war sentiment emerges."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US administration divided on whether to continue military action."
    ],
    military: [
      "Escalating military threat contrasts with retreating energy prices."
    ]
  },
  scoreTrend: [
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70
    },
    {
      date: "11-18",
      score: 70
    },
    {
      date: "11-19",
      score: 70,
      active: true
    }
  ],
  keyChange: "Trump considering military option; energy market retreats but risks remain.",
  investmentSignal: "→ Defensive stance: maintain or increase exposure to energy and commodities to hedge Middle East risk.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.258 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：特朗普考虑军事选项，能源市场虽回落但风险仍在。",
    bannerWarning: "→ 防御方向：建议维持或增持能源与大宗商品类资产，防御中东风险冲击。",
    deescalationIntent: "美国政府内部对是否继续军事行动存在分歧。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "美国政府内部对是否继续军事行动存在分歧。；军事威胁升级与能源市场回落形成矛盾信号。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第264天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.258 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Trump considering military option; energy market retreats but risks remain.",
    bannerWarning: "→ Defensive stance: maintain or increase exposure to energy and commodities to hedge Middle East risk.",
    deescalationIntent: "US administration divided on whether to continue military action.",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "US administration divided on whether to continue military action.; Escalating military threat contrasts with retreating energy prices.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 264",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
