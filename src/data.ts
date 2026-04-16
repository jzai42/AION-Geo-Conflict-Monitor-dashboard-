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
  date: "2026-04-15",
  version: "v2.27",
  riskScore: 76,
  prevRiskScore: 76,
  investmentSignal: "市场避险情绪因美军在中东的军事部署而增强，能源价格在中高位震荡。地缘政治溢价显著，关注国防和能源板块的短期波动。",
  keyChange: "综合风险评分与昨日持平。美军增派 F-35 战机导致降级前景恶化（评分上升），但霍尔木兹海峡实际航运干扰减弱（评分下降），二者影响相互抵消。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D46",
      unit: "2月28日起",
      color: "gray"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "WTI $91 / Brent $95",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "霍尔木兹",
      value: "通行受限",
      unit: "通行状态",
      color: "orange"
    }
  ],
  warPhase: {
    level: "威慑升级",
    targetLevel: "直接冲突",
    title: "威慑与反威慑的螺旋",
    subTitle: "美军增兵与伊朗强硬回应加剧对峙，直接冲突风险临界点升高。",
    points: [
      "美国向阿联酋增派 F-35 战机中队，显著提升前沿军事压力。",
      "伊朗谴责美方行动为“挑衅”，并重申强硬防卫立场，外交空间被压缩。",
      "双方均在避免首先发动大规模直接攻击，但误判风险随军事密度增加而急剧上升。"
    ],
    note: "当前阶段的核心是双方通过军事部署和强硬言论进行力量展示，试图塑造对方的行为预期，但这种高压策略极易引发意外摩擦，从而点燃战火。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军进行重大军事部署，显著增强了区域军事存在感和威慑能力，但尚未发生直接交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "虽然紧张局势导致航运公司发布警告，但过去24小时内未发生实际扣押或攻击事件，物理通行未严重受限。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价因中东紧张局势而维持高位，市场对潜在的供应中断表现出明显担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国通过直接部署先进战略资产，深度介入地区军事态势，以威慑对手。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "美方军事增压与伊方强硬谴责相结合，完全关闭了近期的外交对话窗口，双方立场空前强硬。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "event-20260415-1",
      title: "美国向阿联酋增派 F-35 战斗机中队",
      description: "美国中央司令部（CENTCOM）确认，为应对“日益增长的伊朗代理人活动”，已向阿联酋的达弗拉空军基地部署了额外的 F-35 战斗机中队。",
      verification: "confirmed",
      timestamp: "2026-04-15T10:00:00Z",
      significance: "高",
      highlight: true,
      critical: true
    },
    {
      id: "event-20260415-2",
      title: "伊朗谴责美国军事集结为“挑衅”",
      description: "伊朗外交部发言人发表声明，强烈谴责美国在海湾地区的军事集结是“挑衅行为”，并警告称这将威胁地区稳定，重申不惜代价捍卫主权。",
      verification: "confirmed",
      timestamp: "2026-04-15T14:30:00Z",
      significance: "中"
    },
    {
      id: "event-20260415-3",
      title: "原油价格因地缘政治紧张局势上涨",
      description: "受美军在阿联酋增兵消息影响，市场对中东供应风险的担忧加剧，布伦特原油价格盘中突破每桶94美元。",
      verification: "confirmed",
      timestamp: "2026-04-15T08:00:00Z",
      significance: "中"
    },
    {
      id: "event-20260415-4",
      title: "主要航运公司发布霍尔木兹海峡航行警告",
      description: "鉴于地区紧张局势升级，多家国际航运公司向其船只发布通过霍尔木兹海峡时的安全警告，建议加强戒备，但未宣布暂停航线。",
      verification: "confirmed",
      timestamp: "2026-04-15T12:00:00Z",
      significance: "低"
    }
  ],
  scoreTrend: [
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "升级",
      tagColor: "red",
      points: [
        "美军向阿联酋增派 F-35 中队，增强对伊朗的空中威慑和打击能力。",
        "伊朗革命卫队海军在波斯湾维持高度戒备状态。",
        "双方代理人层面暂无新的大规模交火报告，但局势高度紧张。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "紧张",
      tagColor: "orange",
      points: [
        "霍尔木兹海峡商业航运仍在继续，但风险溢价上升。",
        "航运公司发布安全警告，要求船只提高警惕。",
        "过去24小时内未发生船只被扣押或骚扰的已证实事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "担忧",
      tagColor: "orange",
      points: [
        "布伦特原油价格位于94美元/桶以上，反映了市场对潜在冲突的担忧。",
        "美国增兵行动被市场解读为供应中断风险上升的信号。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "强硬",
      tagColor: "red",
      points: [
        "美国通过军事部署发出强硬信号，意图遏制伊朗及其代理人。",
        "伊朗外交部以“挑衅”定性美方行动，展现不妥协立场，关闭短期对话窗口。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“极限施压”和军事威慑迫使伊朗让步，但此举正固化伊朗的强硬对抗立场。",
      "伊朗希望打破制裁，但其区域影响力和军事发展被美国视为主要威胁，导致双方目标根本对立。"
    ],
    military: [
      "美国拥有绝对的技术和海空优势，但忌惮陷入大规模地面冲突和全球能源危机。",
      "伊朗利用其不对称战力（导弹、无人机、代理人网络）和对霍尔木兹海峡的扼控能力，对美军及其盟友构成威慑。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-15",
  version: "v2.27",
  riskScore: 76,
  prevRiskScore: 76,
  investmentSignal: "Market risk-off sentiment is intensified by the US military deployment in the Middle East, with energy prices oscillating at high levels. The geopolitical premium is significant; monitor short-term volatility in defense and energy sectors.",
  keyChange: "The overall risk score remains unchanged from yesterday. The deployment of F-35 jets by the US worsened de-escalation prospects (score up), but this was offset by a reduction in actual shipping disruptions in the Strait of Hormuz (score down).",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D46",
      unit: "Since Feb 28",
      color: "gray"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "WTI $91 / Brent $95",
      unit: "USD/bbl",
      color: "orange"
    },
    {
      label: "Hormuz",
      value: "Restricted Passage",
      unit: "Status",
      color: "orange"
    }
  ],
  warPhase: {
    level: "Deterrence Escalation",
    targetLevel: "Direct Conflict",
    title: "The Spiral of Deterrence and Counter-Deterrence",
    subTitle: "US troop reinforcement and Iran's hardline response intensify the standoff, raising the threshold for direct conflict risk.",
    points: [
      "The US deploys an F-35 fighter squadron to the UAE, significantly increasing forward military pressure.",
      "Iran condemns the US action as 'provocative' and reiterates a firm defensive stance, compressing diplomatic space.",
      "Both sides are avoiding initiating a large-scale direct attack, but the risk of miscalculation rises sharply with increased military density."
    ],
    note: "The core of the current phase is a show of force through military deployments and harsh rhetoric, attempting to shape the other's behavior. However, this high-pressure strategy can easily trigger accidental friction, potentially igniting a war."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US undertakes a major military deployment, significantly enhancing regional military presence and deterrent capabilities, but no direct fire has occurred yet.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "While heightened tensions led to advisories from shipping companies, no actual seizures or attacks occurred in the last 24 hours, and physical passage is not severely restricted.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices remain elevated due to Middle East tensions, with the market showing clear concern over potential supply disruptions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US is deeply involved in the regional military posture through the direct deployment of advanced strategic assets to deter its adversary.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "The combination of US military pressure and Iran's harsh condemnation has completely closed the near-term window for diplomatic dialogue, with both sides adopting unprecedentedly hardline stances.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "event-20260415-1",
      title: "US Deploys F-35 Fighter Squadron to UAE",
      description: "US Central Command (CENTCOM) confirmed the deployment of an additional F-35 fighter squadron to Al Dhafra Air Base, UAE, to counter 'growing Iranian proxy activity'.",
      verification: "confirmed",
      timestamp: "2026-04-15T10:00:00Z",
      significance: "High",
      highlight: true,
      critical: true
    },
    {
      id: "event-20260415-2",
      title: "Iran Condemns US Military Buildup as 'Provocation'",
      description: "Iran's Foreign Ministry spokesman issued a statement strongly condemning the US military buildup in the Gulf as a 'provocative act' and warned it threatens regional stability, vowing to defend sovereignty at any cost.",
      verification: "confirmed",
      timestamp: "2026-04-15T14:30:00Z",
      significance: "Medium"
    },
    {
      id: "event-20260415-3",
      title: "Crude Oil Prices Rise on Geopolitical Tensions",
      description: "Brent crude prices surpassed $94 per barrel during trading as market concerns over Middle East supply risks intensified following news of the US troop deployment in the UAE.",
      verification: "confirmed",
      timestamp: "2026-04-15T08:00:00Z",
      significance: "Medium"
    },
    {
      id: "event-20260415-4",
      title: "Major Shipping Firms Issue Hormuz Strait Advisories",
      description: "In light of escalating regional tensions, several international shipping companies issued security advisories to their vessels for transiting the Strait of Hormuz, recommending heightened alert but not announcing route suspensions.",
      verification: "confirmed",
      timestamp: "2026-04-15T12:00:00Z",
      significance: "Low"
    }
  ],
  scoreTrend: [
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Escalation",
      tagColor: "red",
      points: [
        "The US deploys an F-35 squadron to the UAE, enhancing air deterrence and strike capabilities against Iran.",
        "Iran's IRGC Navy remains on high alert in the Persian Gulf.",
        "No new large-scale clashes at the proxy level have been reported, but the situation is highly tense."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Tense",
      tagColor: "orange",
      points: [
        "Commercial shipping continues through the Strait of Hormuz, but with an increased risk premium.",
        "Shipping companies have issued security advisories, urging vessels to heighten vigilance.",
        "No confirmed incidents of vessel seizures or harassment in the past 24 hours."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Concern",
      tagColor: "orange",
      points: [
        "Brent crude prices are above $94/bbl, reflecting market fears of a potential conflict.",
        "The US military deployment is interpreted by the market as a signal of rising supply disruption risk."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Hardline",
      tagColor: "red",
      points: [
        "The US sends a strong signal through military deployment, intending to deter Iran and its proxies.",
        "Iran's Foreign Ministry labels the US move a 'provocation,' showing an uncompromising stance and closing the short-term window for dialogue."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US attempts to force concessions from Iran through 'maximum pressure' and military deterrence, but this approach is solidifying Iran's hardline confrontational stance.",
      "Iran wants to break free from sanctions, but its regional influence and military development are seen by the US as primary threats, leading to fundamentally opposed goals."
    ],
    military: [
      "The US possesses absolute technological and air/sea superiority but is wary of getting drawn into a large-scale ground conflict and a global energy crisis.",
      "Iran leverages its asymmetric capabilities (missiles, drones, proxy networks) and its control over the Strait of Hormuz to deter the US and its allies."
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
    node406: "4月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.27 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：综合风险评分与昨日持平。美军增派 F-35 战机导致降级前景恶化（评分上升），但霍尔木兹海峡实际航运干扰减弱（评分下降），二者影响相互抵消。",
    bannerWarning: "市场避险情绪因美军在中东的军事部署而增强，能源价格在中高位震荡。地缘政治溢价显著，关注国防和能源板块的短期波动。",
    deescalationIntent: "美国试图通过“极限施压”和军事威慑迫使伊朗让步，但此举正固化伊朗的强硬对抗立场。",
    structuralRisk: "虽然紧张局势导致航运公司发布警告，但过去24小时内未发生实际扣押或攻击事件，物理通行未严重受限。",
    contradictionNote: "美国试图通过“极限施压”和军事威慑迫使伊朗让步，但此举正固化伊朗的强硬对抗立场。；美国拥有绝对的技术和海空优势，但忌惮陷入大规模地面冲突和全球能源危机。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第46天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.27 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): The overall risk score remains unchanged from yesterday. The deployment of F-35 jets by the US worsened de-escalation prospects (score up),…",
    bannerWarning: "Market risk-off sentiment is intensified by the US military deployment in the Middle East, with energy prices oscillati…",
    deescalationIntent: "The US attempts to force concessions from Iran through 'maximum pressure' and m…",
    structuralRisk: "While heightened tensions led to advisories from shipping companies, no actual seizures or attacks …",
    contradictionNote: "The US attempts to force concessions from Iran through 'maximum pressure' and military deterrence, but this approach is solidifying Iran's hardline confrontati…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 46",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
