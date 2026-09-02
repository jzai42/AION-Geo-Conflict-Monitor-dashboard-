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
  date: "2026-09-02",
  version: "v2.176",
  keyStats: [
    {
      label: "冲突天数",
      value: "D186",
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
      value: "WTI $86.25–$87.85 · Brent $94.65–$95.68",
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
      description: "美伊爆发直接军事互访打击，冲突范围延伸至伊朗本土及美军海外基地。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡流量处于历史低位，商船遭受直接弹体袭击风险极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价因地缘冲突升级而快速走强，布伦特原油区间主体位于 $95 附近。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国作为直接参战方介入，非美大国维持外交和经济支持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "外交接触因直接交火而停滞，双方立场极度强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  scoreTrend: [
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70,
      active: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "主权国家间直接打击替代代理人战争",
      "能源通道成为核心博弈筹码",
      "国际外交斡旋陷入低效期"
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
        "变化：美伊完成首轮主权领土/基地互射，打破长期禁忌。",
        "延续：美军持续部署电子战资产压制伊朗沿海雷达监测。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：单日通行量跌至个位数（4艘），保险溢价重新定价。",
        "延续：伊朗革命卫队（IRGC）维持对油轮的无线电警告及低空骚扰。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 原油价格区间上移 5%，突破 $95 关键压力位。",
        "延续：欧曼及卡特尔 LNG 运输开始采取船对船避险转运模式。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普政府警告后续打击「正在准备中」，对伊施压升级。",
        "延续：伊朗最高国家安全委员会重申不排除封锁海峡的最终选项。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方直接交火导致双边接触的政治合法性降至冰点",
      "大选年背景下美国政府对伊打击力度与油价上涨的政治平衡挑战"
    ],
    military: [
      "伊朗区域反介入能力（A2/AD）与美军打击精度的直接较量",
      "霍尔木兹海峡事实上的物理通行中断与国际通航权之争"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "美伊直接军事互射",
      description: "美军空袭伊朗境内雷达及导弹设施，作为回应，伊朗向美驻约旦及阿联酋基地发射弹道导弹。",
      verification: "confirmed",
      timestamp: "2026-09-01/02",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "海峡流量锐减",
      description: "Kpler 监测到霍尔木兹海峡日均流量大幅缩减至 4 艘，多艘油轮因安全疑虑在海峡外徘徊。",
      verification: "confirmed",
      timestamp: "2026-09-02",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "原油价格突破",
      description: "受冲突升级影响，布伦特原油冲至 $95.68，市场开始定价持久性供应中断风险。",
      verification: "confirmed",
      timestamp: "2026-09-02",
      significance: "",
      highlight: true
    }
  ],
  keyChange: "美伊由间接对峙转入直接主权打击，风险分保持高位平台震荡。",
  investmentSignal: "→ 维持能源及避险资产配置，防御地缘波动。",
  change: "none",
  prevRiskScore: 72,
  webSources: [
    {
      title: "logisticsmiddleeast.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5p5hkJ7bV9eV-TWN-QZ8tHNkMKCPTLpo3nOoPfneiGFZarYzoFaPdSOF-bx3UqLybJeIRgosoqiv2cvyvPxyLe_WFO44RIt-diH-A6LXGKL5xOSv7O7sBNr8zY_QxxqrTYPG14Zr6K2H-fVSdOlUJ5xqo8QTUb7wgQelZKkz-iOdTVeTeISujmgW6rbMY4b1q"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFLWM6lH10yvtcDnYb219G1VlvteejMYAI85WwkRTAe0fPNuGRATCP73dMkTATxM2tNqlbaE09qQnGWrRHEnE84BN5jfpIK3lDxXS9WLS9miwhcKN3DKkm2VcgvvqKR2eKj63XsnFV1wOCgAIIUMqlB7pPsR6CtsNQEf6BeHZIkyiE2x8rA6ihZSuHm961zQ93tHEMAA7d_xlqpxZ6bdOW22lK9RU9huWRbHemN1XwL"
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfER34qYJDdpu79El_JV9NJXu5Zgaimv38KHI2vpwTzun3e-atyOya02Bn5Yx5LC5a90MK_QiPTvctiyyv92vXAkoqgKbLrWkC5qMvzwOWKwArHL1LxUHkgej3kKStewOKdRpUJfsjrtUWD2yOSfIVhQQwaf4aR0ETAsWJGZ1HYPUXl3pbI_Zt9KG0zAdA6YHsQNk6bKwBbQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range Sept 1-2 2024 news reuters bloomberg",
    "US Iran conflict news updates September 1-2 2024 official statements",
    "Hormuz Strait shipping status September 2 2024 news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-02",
  version: "v2.176",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D186",
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
      value: "WTI $86.25–$87.85 · Brent $94.65–$95.68",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct state-on-state strikes occur between the US and Iran, hitting sovereign territories and bases.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transit volume hit historical lows; commercial tankers face direct projectile threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude prices surged on escalation; Brent moved into the $95 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US is a direct participant; China and Russia provide diplomatic/economic support via SCO.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels are stalled by active hostilities; stances are hardened.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  scoreTrend: [
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70,
      active: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct sovereign strikes replace proxy warfare",
      "Energy chokepoints serve as primary leverage",
      "International mediation remains ineffective"
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
        "Change: First round of direct US-Iran territory/base strikes completed, breaking long-standing taboos.",
        "Continue: US forces deploy electronic warfare to suppress Iranian coastal radar monitoring."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Daily transit fell to single digits (4 vessels); insurance premiums being repriced.",
        "Continue: IRGC maintains radio hailing and low-altitude drone harassment of tankers."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent price range shifted up 5%, breaking the $95 resistance level.",
        "Continue: Omani and Qatari LNG shipments adopt ship-to-ship transfers to avoid the strait."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump administration warns more strikes are 'in the wings,' escalating pressure.",
        "Continue: Iranian SNSC reiterates that blocking the strait remains the 'final option'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Direct fire eliminates political legitimacy of bilateral engagement in the short term",
      "US government faces dilemma between punitive strikes and rising gas prices in an election year"
    ],
    military: [
      "Confrontation between Iranian A2/AD capabilities and US precision strike assets",
      "De facto physical closure of Hormuz vs. international right of navigation"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "Direct US-Iran Strikes",
      description: "US hits Iranian radars; Iran retaliates with missiles on US bases in Jordan and UAE.",
      verification: "confirmed",
      timestamp: "2026-09-01/02",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Traffic Collapse",
      description: "Kpler monitors Hormuz daily transit dropping to 4 ships as tankers avoid the risk zone.",
      verification: "confirmed",
      timestamp: "2026-09-02",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Crude Price Breakout",
      description: "Brent crude hits $95.68 as markets price in durable supply disruption risk.",
      verification: "confirmed",
      timestamp: "2026-09-02",
      significance: "",
      highlight: true
    }
  ],
  keyChange: "Shift from indirect to direct state-on-state strikes keeps the risk score at a high plateau.",
  investmentSignal: "→ Maintain energy and safe-haven asset allocations to hedge geopolitical volatility.",
  change: "none",
  prevRiskScore: 72,
  webSources: [
    {
      title: "logisticsmiddleeast.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5p5hkJ7bV9eV-TWN-QZ8tHNkMKCPTLpo3nOoPfneiGFZarYzoFaPdSOF-bx3UqLybJeIRgosoqiv2cvyvPxyLe_WFO44RIt-diH-A6LXGKL5xOSv7O7sBNr8zY_QxxqrTYPG14Zr6K2H-fVSdOlUJ5xqo8QTUb7wgQelZKkz-iOdTVeTeISujmgW6rbMY4b1q"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFLWM6lH10yvtcDnYb219G1VlvteejMYAI85WwkRTAe0fPNuGRATCP73dMkTATxM2tNqlbaE09qQnGWrRHEnE84BN5jfpIK3lDxXS9WLS9miwhcKN3DKkm2VcgvvqKR2eKj63XsnFV1wOCgAIIUMqlB7pPsR6CtsNQEf6BeHZIkyiE2x8rA6ihZSuHm961zQ93tHEMAA7d_xlqpxZ6bdOW22lK9RU9huWRbHemN1XwL"
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfER34qYJDdpu79El_JV9NJXu5Zgaimv38KHI2vpwTzun3e-atyOya02Bn5Yx5LC5a90MK_QiPTvctiyyv92vXAkoqgKbLrWkC5qMvzwOWKwArHL1LxUHkgej3kKStewOKdRpUJfsjrtUWD2yOSfIVhQQwaf4aR0ETAsWJGZ1HYPUXl3pbI_Zt9KG0zAdA6YHsQNk6bKwBbQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range Sept 1-2 2024 news reuters bloomberg",
    "US Iran conflict news updates September 1-2 2024 official statements",
    "Hormuz Strait shipping status September 2 2024 news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.176 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↓2）：美伊由间接对峙转入直接主权打击，风险分保持高位平台震荡。",
    bannerWarning: "→ 维持能源及避险资产配置，防御地缘波动。",
    deescalationIntent: "美伊双方直接交火导致双边接触的政治合法性降至冰点",
    structuralRisk: "海峡流量处于历史低位，商船遭受直接弹体袭击风险极高。",
    contradictionNote: "美伊双方直接交火导致双边接触的政治合法性降至冰点；伊朗区域反介入能力（A2/AD）与美军打击精度的直接较量",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第186天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.176 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↓2): Shift from indirect to direct state-on-state strikes keeps the risk score at a high plateau.",
    bannerWarning: "→ Maintain energy and safe-haven asset allocations to hedge geopolitical volatility.",
    deescalationIntent: "Direct fire eliminates political legitimacy of bilateral engagement in the shor…",
    structuralRisk: "Transit volume hit historical lows; commercial tankers face direct projectile threats.",
    contradictionNote: "Direct fire eliminates political legitimacy of bilateral engagement in the short term; Confrontation between Iranian A2/AD capabilities and US precision strike…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 186",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
