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
  date: "2026-04-12",
  version: "v2.20",
  riskScore: 72,
  prevRiskScore: 60,
  investmentSignal: "地缘政治风险上升，能源相关资产波动加剧，需密切关注霍尔木兹海峡动态。",
  keyChange: "地区军事紧张升级，能源市场受冲击油价显著上涨，航运风险提示增加。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D43",
      unit: "2月28日起",
      color: "grey"
    },
    {
      label: "评分变化",
      value: "↑12",
      unit: "较上期",
      color: "red"
    },
    {
      label: "油价",
      value: "WTI $105 / Brent $102",
      unit: "USD/bbl",
      color: "red"
    },
    {
      label: "霍尔木兹",
      value: "中等风险",
      unit: "<10% 常态",
      color: "orange"
    }
  ],
  warPhase: {
    level: "地区紧张升级",
    targetLevel: "持续对抗",
    title: "地区紧张升级，冲突烈度维持高位。",
    subTitle: "伊朗军事演习加剧霍尔木兹海峡紧张，国际油价受影响上升。",
    points: [
      "伊朗在霍尔木兹海峡举行导弹演习，展示军事实力。",
      "美国谴责伊朗行为，但未升级直接军事行动。",
      "油价因地缘政治风险上升，航运受一定影响。"
    ],
    note: "双方军事活动频繁，但冲突尚未失控，风险在于误判升级。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "评估直接军事冲突和威胁的强度与范围。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "评估霍尔木兹海峡航运受阻或受威胁的程度。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "评估冲突对全球能源供应和价格的影响。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "评估外部大国（如中美俄）军事或政治介入的程度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "评估冲突各方寻求外交解决或降级姿态的可能性。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e001",
      title: "伊朗革命卫队在霍尔木兹海峡举行导弹演习",
      description: "伊朗伊斯兰革命卫队宣布在霍尔木兹海峡进行大规模导弹和海军演习，旨在展示其区域防御能力。",
      verification: "confirmed",
      timestamp: "2026-04-12T10:00:00Z",
      significance: "军事行动，地区紧张加剧",
      highlight: true,
      critical: true
    },
    {
      id: "e002",
      title: "美国谴责伊朗在霍尔木兹海峡的“挑衅行为”",
      description: "美国中央司令部发表声明，谴责伊朗革命卫队在霍尔木兹海峡的军事演习是“挑衅性”和“破坏地区稳定”的行为。",
      verification: "confirmed",
      timestamp: "2026-04-12T14:30:00Z",
      significance: "外交表态，加剧对峙",
      highlight: true
    },
    {
      id: "e003",
      title: "油价因中东紧张局势而上涨",
      description: "WTI原油价格上涨至104.91美元/桶，布伦特原油价格达到102.20美元/桶，市场担忧供应中断。",
      verification: "confirmed",
      timestamp: "2026-04-13T03:18:43Z",
      significance: "能源市场影响",
      highlight: true
    },
    {
      id: "e004",
      title: "部分航运公司针对霍尔木兹海峡发布安全警告",
      description: "鉴于伊朗军事演习，部分国际航运公司建议船只通过霍尔木兹海峡时提高警惕，但未有大规模改道或停运。",
      verification: "confirmed",
      timestamp: "2026-04-12T16:00:00Z",
      significance: "航运安全"
    },
    {
      id: "e005",
      title: "联合国呼吁美伊双方保持克制",
      description: "联合国特使就中东局势发表声明，呼吁美国和伊朗双方保持最大程度的克制，避免采取任何可能加剧地区紧张的行动。",
      verification: "confirmed",
      timestamp: "2026-04-12T18:00:00Z",
      significance: "国际呼吁，降级努力"
    }
  ],
  scoreTrend: [
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "紧张升级",
      tagColor: "red",
      points: [
        "伊朗在霍尔木兹海峡举行大规模演习，展示导弹能力，但未与美方直接交火。",
        "美方谴责，并重申区域安全承诺。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "风险升高",
      tagColor: "orange",
      points: [
        "演习导致航运公司发布警告，但霍尔木兹海峡商业航运未报告大规模中断，流量略受影响但基本维持。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "油价飙升",
      tagColor: "red",
      points: [
        "受地区紧张局势影响，国际油价显著上涨，WTI原油突破100美元/桶，市场担忧情绪加剧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "立场强硬",
      tagColor: "red",
      points: [
        "美伊双方均无降级谈判迹象，伊朗强硬展示军事实力，美国重申立场，联合国呼吁克制。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗寻求巩固地区影响力与美国维持地区霸权及盟友安全之间的根本矛盾。"
    ],
    military: [
      "伊朗军事行动日益频繁与美国及其盟友在波斯湾的军事存在之间的潜在冲突风险。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-12",
  version: "v2.20",
  riskScore: 72,
  prevRiskScore: 60,
  investmentSignal: "Geopolitical risks are rising, leading to increased volatility in energy-related assets. Close monitoring of developments in the Strait of Hormuz is advised.",
  keyChange: "Regional military tensions have escalated, the energy market is impacted by a significant rise in oil prices, and shipping risk advisories have increased.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D43",
      unit: "Since Feb 28",
      color: "grey"
    },
    {
      label: "Score Change",
      value: "↑12",
      unit: "vs Prev",
      color: "red"
    },
    {
      label: "Oil",
      value: "WTI $105 / Brent $102",
      unit: "USD/bbl",
      color: "red"
    },
    {
      label: "Hormuz",
      value: "Medium Risk",
      unit: "<10% of normal",
      color: "orange"
    }
  ],
  warPhase: {
    level: "Regional Tension Escalating",
    targetLevel: "Sustained Confrontation",
    title: "Regional tensions escalating, conflict intensity remains high.",
    subTitle: "Iranian military drills heighten Strait of Hormuz tensions, international oil prices rise.",
    points: [
      "Iran conducts missile drills in the Strait of Hormuz, demonstrating military capabilities.",
      "The US condemns Iran's actions but does not escalate direct military operations.",
      "Oil prices rise due to geopolitical risks, shipping faces some impact."
    ],
    note: "Frequent military activities by both sides, but the conflict has not spiraled out of control. The risk lies in miscalculation leading to escalation."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Assesses the intensity and scope of direct military conflict and threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Assesses the degree of disruption or threat to shipping in the Strait of Hormuz.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Assesses the impact of the conflict on global energy supply and prices.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Assesses the extent of military or political intervention by external major powers (e.g., US, China, Russia).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Assesses the likelihood of parties seeking diplomatic solutions or de-escalatory gestures.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e001",
      title: "Iranian Revolutionary Guard Conducts Missile Drills in Strait of Hormuz",
      description: "Iran's Islamic Revolutionary Guard Corps announced large-scale missile and naval exercises in the Strait of Hormuz, aimed at showcasing its regional defense capabilities.",
      verification: "confirmed",
      timestamp: "2026-04-12T10:00:00Z",
      significance: "Military Action, Increased Regional Tension",
      highlight: true,
      critical: true
    },
    {
      id: "e002",
      title: "US Condemns Iran's 'Provocative Actions' in Strait of Hormuz",
      description: "The US Central Command issued a statement condemning the Iranian Revolutionary Guard's military exercises in the Strait of Hormuz as 'provocative' and 'destabilizing to the region'.",
      verification: "confirmed",
      timestamp: "2026-04-12T14:30:00Z",
      significance: "Diplomatic Stance, Increased Standoff",
      highlight: true
    },
    {
      id: "e003",
      title: "Oil Prices Rise Due to Middle East Tensions",
      description: "WTI crude oil prices rose to $104.91/barrel, and Brent crude reached $102.20/barrel, as markets worried about supply disruptions.",
      verification: "confirmed",
      timestamp: "2026-04-13T03:18:43Z",
      significance: "Energy Market Impact",
      highlight: true
    },
    {
      id: "e004",
      title: "Some Shipping Companies Issue Safety Warnings for Strait of Hormuz",
      description: "In light of Iranian military exercises, some international shipping companies advised vessels to exercise increased vigilance when transiting the Strait of Hormuz, but no widespread diversions or halts were reported.",
      verification: "confirmed",
      timestamp: "2026-04-12T16:00:00Z",
      significance: "Shipping Safety"
    },
    {
      id: "e005",
      title: "UN Calls for Restraint from US and Iran",
      description: "A UN envoy issued a statement on the Middle East situation, urging both the United States and Iran to exercise maximum restraint and avoid any actions that could escalate regional tensions.",
      verification: "confirmed",
      timestamp: "2026-04-12T18:00:00Z",
      significance: "International Appeal, De-escalation Efforts"
    }
  ],
  scoreTrend: [
    {
      date: "04-08",
      score: 56
    },
    {
      date: "04-09",
      score: 64
    },
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Escalating Tension",
      tagColor: "red",
      points: [
        "Iran conducted large-scale exercises in the Strait of Hormuz, demonstrating missile capabilities, but without direct engagement with US forces.",
        "The US condemned the actions and reaffirmed its regional security commitments."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Elevated Risk",
      tagColor: "orange",
      points: [
        "The drills led to warnings from shipping companies, but commercial shipping in the Strait of Hormuz did not report widespread interruptions, with traffic slightly affected but largely maintained."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Oil Price Surge",
      tagColor: "red",
      points: [
        "International oil prices significantly increased due to regional tensions, with WTI crude breaking above $100/barrel, exacerbating market concerns."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Firm Stance",
      tagColor: "red",
      points: [
        "Neither the US nor Iran showed signs of de-escalation or negotiation. Iran forcefully displayed military capabilities, the US reiterated its stance, and the UN called for restraint."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The fundamental contradiction between Iran's pursuit of consolidating regional influence and the US's objective to maintain regional hegemony and allied security."
    ],
    military: [
      "The potential for conflict stemming from Iran's increasingly frequent military actions and the persistent military presence of the US and its allies in the Persian Gulf."
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.20 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑12）：地区军事紧张升级，能源市场受冲击油价显著上涨，航运风险提示增加。",
    bannerWarning: "地缘政治风险上升，能源相关资产波动加剧，需密切关注霍尔木兹海峡动态。",
    deescalationIntent: "伊朗寻求巩固地区影响力与美国维持地区霸权及盟友安全之间的根本矛盾。",
    structuralRisk: "评估霍尔木兹海峡航运受阻或受威胁的程度。",
    contradictionNote: "伊朗寻求巩固地区影响力与美国维持地区霸权及盟友安全之间的根本矛盾。；伊朗军事行动日益频繁与美国及其盟友在波斯湾的军事存在之间的潜在冲突风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第43天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.20 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑12): Regional military tensions have escalated, the energy market is impacted by a significant rise in oil prices, and shipping risk advisories …",
    bannerWarning: "Geopolitical risks are rising, leading to increased volatility in energy-related assets. Close monitoring of developmen…",
    deescalationIntent: "The fundamental contradiction between Iran's pursuit of consolidating regional …",
    structuralRisk: "Assesses the degree of disruption or threat to shipping in the Strait of Hormuz.",
    contradictionNote: "The fundamental contradiction between Iran's pursuit of consolidating regional influence and the US's objective to maintain regional hegemony and allied securi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 43",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
