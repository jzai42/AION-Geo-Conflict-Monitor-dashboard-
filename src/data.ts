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
  date: "2026-11-18",
  version: "v2.257",
  keyStats: [
    {
      label: "冲突天数",
      value: "D263",
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
      value: "WTI $81.20–$84.77 · Brent $87.60–$90.75",
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
      title: "美伊在霍尔木兹海峡交火升级",
      description: "美国空军打击伊朗Qeshm岛导弹基地，伊朗称击落美MQ‑9无人机。",
      verification: "confirmed",
      timestamp: "2026‑11‑18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗扩大海湾地区攻击目标",
      description: "伊朗袭击科威特美军基地和巴林设施，冲突范围扩大。",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡船员伤亡事件",
      description: "霍尔木兹海峡一船只遭袭，1名船员失踪，11人受伤。",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美国反恐中心主任因战争政策辞职",
      description: "前国家反恐中心主任Joe Kent辞职，称伊朗无迫在眉睫威胁，战争无益。",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "美以军事协调加强",
      description: "美国中央司令部司令访问以色列，与以军讨论美以在伊朗冲突中的合作。",
      verification: "single",
      timestamp: "2026‑11‑18",
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
        "变化：美伊在霍尔木兹海峡直接交火升级，冲突范围扩大至科威特与巴林。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡船只遭袭，船员伤亡，航运风险上升。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价回落，WTI/Brent 价格下降，库存上升缓解供应紧张。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方反恐中心主任辞职，反映内部政策分歧；美以协调加强。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国内部对战争政策出现分歧（反恐中心主任辞职）"
    ],
    military: [
      "军事行动升级与外交谈判前景改善信号相互矛盾"
    ]
  },
  scoreTrend: [
    {
      date: "11-14",
      score: 68
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "军事与航运风险上升，能源冲击缓和，内部政策分歧显现；综合风险分落盘 70（较昨日 持平（+0））；调整前模型分 66（sourceVerification clamp）",
  investmentSignal: "→ 防御方向：建议增持能源与大宗商品类资产以对冲地缘风险。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-18",
  version: "v2.257",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D263",
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
      value: "WTI $81.20–$84.77 · Brent $87.60–$90.75",
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
      title: "US‑Iran Fire Exchange Escalates in Strait of Hormuz",
      description: "US airstrike on Iran’s Qeshm missile base; Iran claims to have downed a US MQ‑9 drone.",
      verification: "confirmed",
      timestamp: "2026‑11‑18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Expands Attacks to Gulf Targets",
      description: "Iran attacks US base in Kuwait and facilities in Bahrain, widening conflict scope.",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crew Casualties in Strait of Hormuz Incident",
      description: "Vessel in Strait of Hormuz attacked; one crew missing, 11 injured.",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "US Counterterrorism Chief Resigns Over War Policy",
      description: "Former NCTC director resigns, stating Iran poses no imminent threat and war is not beneficial.",
      verification: "single",
      timestamp: "2026‑11‑18",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "US‑Israel Military Coordination Intensifies",
      description: "US CENTCOM commander visits Israel to discuss cooperation in Iran conflict.",
      verification: "single",
      timestamp: "2026‑11‑18",
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
        "Change: US‑Iran direct fire escalates in Strait of Hormuz; conflict expands to Kuwait and Bahrain."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Vessel attacked in Strait of Hormuz; crew casualties; shipping risk elevated."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices retreat; WTI/Brent decline; inventories rising ease supply tension."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US counterterrorism chief resigns, indicating internal policy rift; US‑Israel coordination strengthens."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Internal US policy divisions emerge (counterterrorism chief resignation)"
    ],
    military: [
      "Military escalation contrasts with any diplomatic de‑escalation signals"
    ]
  },
  scoreTrend: [
    {
      date: "11-14",
      score: 68
    },
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
      score: 70,
      active: true
    }
  ],
  keyChange: "Military and shipping risks rise, energy shock eases, internal policy divisions emerge; composite risk score prints at 70 (vs prior day flat (+0)); pre-adjustment model score 66 (sourceVerification clamp)",
  investmentSignal: "→ Defensive stance: recommend increasing holdings in energy and commodities to hedge geopolitical risk.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.257 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：军事与航运风险上升，能源冲击缓和，内部政策分歧显现；综合风险分落盘 70（较昨日 持平（+0））；调整前模型分 66（sourceVerification clamp）",
    bannerWarning: "→ 防御方向：建议增持能源与大宗商品类资产以对冲地缘风险。",
    deescalationIntent: "美国内部对战争政策出现分歧（反恐中心主任辞职）",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "美国内部对战争政策出现分歧（反恐中心主任辞职）；军事行动升级与外交谈判前景改善信号相互矛盾",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第263天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.257 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Military and shipping risks rise, energy shock eases, internal policy divisions emerge; composite risk score prints at 70 (vs prior day fla…",
    bannerWarning: "→ Defensive stance: recommend increasing holdings in energy and commodities to hedge geopolitical risk.",
    deescalationIntent: "Internal US policy divisions emerge (counterterrorism chief resignation)",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "Internal US policy divisions emerge (counterterrorism chief resignation); Military escalation contrasts with any diplomatic de‑escalation signals",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 263",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
