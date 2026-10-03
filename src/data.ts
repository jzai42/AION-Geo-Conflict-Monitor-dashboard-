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
  date: "2026-10-03",
  version: "v2.210",
  riskScore: 64,
  change: "none",
  keyChange: "美军增派兵力维持威慑，霍尔木兹海峡受限通行与管网疏运对冲，布伦特徘徊于百元关口；综合风险分落盘 64（较昨日 +4）；调整前模型分 60（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持能源与大宗商品头寸对冲，对高估值风险资产保持防御性仓位配置。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D217",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$103.05",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "受限通行",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美军维持海空力量轮换与戒备部署，代理人小规模骚扰持续，但未发生直接本土纵深打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "商船通航量保持在战前约75%-80%水平，护航机制与陆上管道旁路正在缓解断运压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI与Brent分别运行于$88-$94及$98-$103区间，油价紧贴危机带边缘窄幅震荡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国提供实质性军事威慑与护航掩护，并未直接卷入多国全面正面对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "斡旋沟通渠道未彻底中断，但关键条款缺乏重大妥协，短期停火概率偏低。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突陷入兵力部署遏制与航道袭扰拉锯，未升级为全面对决。",
      "替代物流走廊与高额保险机制使能源断供恐慌部分边际钝化。"
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
        "延续：美伊维持海空高戒备状态，前沿阵地未发生大规模突破性攻击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业船只依赖军舰护航与特定走廊通行，高保费常态化。",
        "变化：周边国家进一步提高跨国原油陆上管道分流负荷。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油价在100美元心理关口附近震荡拉锯，成品油供应偏紧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊领导层均维持强硬表态，缺乏单方面降级意愿。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军部署额外航母力量进驻波斯湾周边",
      description: "美国国防部安排航母战斗群进驻中东战区以保持海上军事压制，确保关键航道安全并替换旧有编队（来源：ICIS、Trading Economics）。",
      verification: "confirmed",
      timestamp: "2026-10-02T18:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡受限恢复通航但保费依然高企",
      description: "船舶追踪监测到海峡每日通航量恢复至约12.3-13.2 Mb/d，但零星袭击警告依然令商业航运处于受限通行状态（来源：Argus Media、The Guardian）。",
      verification: "confirmed",
      timestamp: "2026-10-02T14:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "国际基准原油在百元边界震荡博弈",
      description: "布伦特原油在98-103美元区间拉锯，交易员权衡沙特等国旁路出口恢复与精炼油品结构性紧缺（来源：Anadolu Agency、Oil & Gas Middle East）。",
      verification: "confirmed",
      timestamp: "2026-10-03T02:30:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-29",
      score: 60
    },
    {
      date: "09-30",
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64,
      active: true
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方国内政治强硬诉求限制了外交妥协空间。"
    ],
    military: [
      "海上封锁施压与美军护航防御处于动态拉锯僵持。"
    ]
  },
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-03",
  version: "v2.210",
  riskScore: 64,
  change: "none",
  keyChange: "US reinforces naval deterrence while Hormuz transits balance against bypass pipelines; Brent hovers near $100 as the; composite risk score prints at 64 (vs prior day +4); pre-adjustment model score 60 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain structural hedges in energy and commodities while holding defensive positioning on risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D217",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$103.05",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Constrained Flow",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "US forces maintain air-naval readiness deployments with sporadic proxy exchanges, but no massive cross-border homeland strikes have occurred.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Vessel transits remain around 75%-80% of pre-war levels under escort protocols and bypass pipeline mitigation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI ranges in $88-$94 and Brent trades in $98-$103, grazing the critical threshold amidst mixed supply cues.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers provide active military deterrence and convoy support without escalating into direct multilateral conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Diplomatic conduits persist via intermediaries, but fundamental disagreements impede any formal interim truce.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The confrontation rests in an equilibrium of naval deterrence and localized shipping friction without full warfare expansion.",
      "Alternative logistics corridors and hedging adjustments have partially blunted acute supply panic."
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
        "Continue: US and Iranian elements maintain high alert status with limited localized friction."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping relies on naval convoys and restricted transit windows under elevated insurance rates.",
        "Change: Regional exporters expand crude bypass via cross-country pipelines."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Crude benchmarks consolidate near the $100 barrier amid refined product deficits."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both US and Iranian leaders adhere to rigid rhetoric with minimal willingness to de-escalate."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Deploys Additional Aircraft Carrier Strike Group to Mideast",
      description: "The US Department of Defense arranges a carrier strike group rotation to the Persian Gulf to sustain deterrence and shipping security (Sources: ICIS, Trading Economics).",
      verification: "confirmed",
      timestamp: "2026-10-02T18:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Flows Maintain Partial Recovery Amid High War Premiums",
      description: "Maritime trackers record Hormuz crude movements at 12.3-13.2 Mb/d, with shipping companies operating under constrained terms (Sources: Argus Media, The Guardian).",
      verification: "confirmed",
      timestamp: "2026-10-02T14:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Benchmarks Consolidate Around $100 Threshold",
      description: "Brent trades in the $98-$103 band as market participants balance regional pipeline diversions against tight diesel inventories (Sources: Anadolu Agency, Oil & Gas Middle East).",
      verification: "confirmed",
      timestamp: "2026-10-03T02:30:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-29",
      score: 60
    },
    {
      date: "09-30",
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64,
      active: true
    }
  ],
  coreContradiction: {
    political: [
      "Domestic political pressures on both sides preclude unilateral diplomatic concessions."
    ],
    military: [
      "Maritime harassment tactics and multinational naval escorting remain locked in mutual deterrence."
    ]
  },
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.210 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（↑4）：美军增派兵力维持威慑，霍尔木兹海峡受限通行与管网疏运对冲，布伦特徘徊于百元关口；综合风险分落盘 64（较昨日 +4）；调整前模型分 60（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持能源与大宗商品头寸对冲，对高估值风险资产保持防御性仓位配置。",
    deescalationIntent: "美伊双方国内政治强硬诉求限制了外交妥协空间。",
    structuralRisk: "商船通航量保持在战前约75%-80%水平，护航机制与陆上管道旁路正在缓解断运压力。",
    contradictionNote: "美伊双方国内政治强硬诉求限制了外交妥协空间。；海上封锁施压与美军护航防御处于动态拉锯僵持。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第217天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.210 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (↑4): US reinforces naval deterrence while Hormuz transits balance against bypass pipelines; Brent hovers near $100 as the; composite risk score …",
    bannerWarning: "→ Maintain structural hedges in energy and commodities while holding defensive positioning on risk assets.",
    deescalationIntent: "Domestic political pressures on both sides preclude unilateral diplomatic conce…",
    structuralRisk: "Vessel transits remain around 75%-80% of pre-war levels under escort protocols and bypass pipeline …",
    contradictionNote: "Domestic political pressures on both sides preclude unilateral diplomatic concessions.; Maritime harassment tactics and multinational naval escorting remain lo…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 217",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
