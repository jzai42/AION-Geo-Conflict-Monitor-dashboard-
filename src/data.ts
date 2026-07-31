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
  date: "2026-07-31",
  version: "v2.142",
  keyStats: [
    {
      label: "冲突天数",
      value: "D153",
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
      value: "WTI $82–$85 · Brent $86–$90",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国与伊朗军队在伊朗本土及第三方国家（如科威特、约旦）发生直接导弹与无人机交火，冲突烈度维持在极高水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运依然受到美军事实上的封锁行动严重影响，通行量远低于正常水平，尽管有零星油轮通过，但整体风险依旧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "国际油价维持高位，布伦特原油在每桶86-90美元区间波动，市场持续计入因冲突导致的中东石油供应中断的显著风险溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军方直接参与对伊朗本土目标的军事打击行动，并与伊朗在第三方国家的军事力量直接对抗，标志着大国已深度军事介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方持续的直接军事交火与强硬的官方言论表明，当前没有任何有效的、或被官方承认的旨在降低冲突的外交谈判渠道。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊在前线及第三国直接交火，局势螺旋升级",
      description: "美国军方确认对伊朗境内，包括霍尔木兹海峡附近的格什姆岛在内的伊斯兰革命卫队（IRGC）目标进行了“重磅打击”。作为回应，伊朗向科威特和约旦境内的美军基地发动了导弹与无人机袭击，部分来袭导弹被约旦防空系统拦截。此次直接交火标志着冲突烈度维持在极高水平。",
      verification: "confirmed",
      timestamp: "2026-07-31T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡航运仍严重受限，但有零星油轮通过",
      description: "美国中央司令部（CENTCOM）称已“改道”24艘商船以执行封锁。然而，多家通讯社援引航运追踪数据称，有少数几艘超大型油轮（VLCC）成功驶离海峡。这一消息轻微缓解了市场对供应完全中断的恐慌，但整体通行量依然极低，风险巨大。",
      verification: "confirmed",
      timestamp: "2026-07-31T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "国际油价高位震荡，月度涨幅接近20%",
      description: "受美伊冲突持续影响，国际油价在7月录得约20%的巨大涨幅。近24小时，油价因海峡有零星船只通过的消息而小幅回落，但整体仍在高位区间运行。布伦特原油交易区间主要在86-90美元/桶，市场对地缘政治风险的定价非常显著。",
      verification: "confirmed",
      timestamp: "2026-07-31T08:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美国扩大对支持伊朗伊斯兰革命卫队网络的制裁",
      description: "美国宣布对位于中国、印度和俄罗斯的，被指控帮助伊朗伊斯兰革命卫队（IRGC）进行资金运作和规避国际制裁的公司及个人实施新一轮制裁。此举旨在进一步从经济上孤立和施压伊朗。",
      verification: "single",
      timestamp: "2026-07-31T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "外交渠道停滞，军事行动主导局势",
      description: "尽管有第三方（如巴基斯坦）声称美伊谈判仍在进行，但双方的直接军事对抗以及官方声明的强硬立场表明，外交途径已基本失效。目前局势发展完全由军事行动主导，无任何官方确认的降级谈判取得突破。",
      verification: "confirmed",
      timestamp: "2026-07-30T23:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方在多条战线进行直接、持续的军事打击，但尚未升级为全面入侵或战争状态。",
      "冲突烈度在过去24-48小时内未进一步升级也未降级，维持在直接交火的危险水平。",
      "双方都在试探对方底线，形成一种高风险、不稳定的对抗平衡，任何误判都可能导致局势失控。"
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
        "变化：美国与伊朗军队在伊朗本土及第三方国家（如科威特、约旦）发生直接导弹与无人机交火，冲突烈度维持在极高水平。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的商业航运依然受到美军事实上的封锁行动严重影响，通行量远低于正常水平，尽管有零星油轮通过，但整体风险依旧。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：国际油价维持高位，布伦特原油在每桶86-90美元区间波动，市场持续计入因冲突导致的中东石油供应中断的显著风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军方直接参与对伊朗本土目标的军事打击行动，并与伊朗在第三方国家的军事力量直接对抗，标志着大国已深度军事介入。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国旨在通过“极限压力”（军事打击+经济制裁）迫使伊朗在核问题及地区影响力上让步，而伊朗则将维护主权和政权安全作为首要目标，双方核心诉求无法调和。"
    ],
    military: [
      "美国寻求以可控的空中与海上打击削弱伊朗军事能力，同时避免陷入大规模地面战；伊朗则利用其非对称能力（导弹、无人机、代理人）进行反击，试图提高美国的军事和政治成本。"
    ]
  },
  scoreTrend: [
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80,
      active: true
    }
  ],
  investmentSignal: "→ 维持对风险资产的高度防御姿态，地缘风险溢价持续支撑能源及大宗商品头寸。",
  prevRiskScore: 80,
  keyChange: "24h要点：详见事件与因子。",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 31 2026",
    "US Iran news July 31 2026",
    "Strait of Hormuz shipping situation July 2026",
    "US military posture Middle East July 2026",
    "Iran diplomatic news July 2026",
    "Reuters oil prices July 31 2026",
    "Bloomberg oil market analysis July 31 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-31",
  version: "v2.142",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D153",
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
      value: "WTI $82–$85 · Brent $86–$90",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and Iranian forces are engaged in direct missile and drone exchanges on Iranian soil and in third countries (e.g., Kuwait, Jordan), keeping conflict intensity at a very high level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping in the Strait of Hormuz remains severely impacted by a de facto US blockade, with passage volume far below normal levels, despite reports of sporadic tanker transits.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Global oil prices remain elevated, with Brent crude fluctuating in the $86-90 per barrel range, as the market continues to price in a significant risk premium for potential supply disruptions from the Middle East.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US military is directly participating in military strikes against targets on Iranian territory and directly engaging with Iranian military forces in third countries, marking deep military intervention by a major power.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Ongoing direct military exchanges and hardline official rhetoric from both sides indicate a complete absence of effective or officially recognized diplomatic channels for de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Exchange Direct Fire on Frontlines and in Third Countries, Escalating Spiral Continues",
      description: "The U.S. military confirmed conducting a 'heavy wave of strikes' against Islamic Revolutionary Guard Corps (IRGC) targets inside Iran, including on Qeshm Island near the Strait of Hormuz. In response, Iran launched missiles and drones at U.S. bases in Kuwait and Jordan, with some incoming missiles intercepted by Jordanian air defenses. This direct exchange of fire signifies that the conflict's intensity remains at a very high level.",
      verification: "confirmed",
      timestamp: "2026-07-31T06:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Strait of Hormuz Shipping Remains Severely Restricted, Though Sporadic Tankers Pass",
      description: "U.S. Central Command (CENTCOM) reported it has 'redirected' 24 commercial vessels to enforce the blockade. However, multiple news agencies, citing ship-tracking data, reported that a few Very Large Crude Carriers (VLCCs) successfully exited the strait. This news slightly eased market fears of a complete supply halt, but overall traffic remains extremely low and risks are high.",
      verification: "confirmed",
      timestamp: "2026-07-31T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "International Oil Prices Volatile at High Levels, Monthly Gains Approach 20%",
      description: "Driven by the ongoing US-Iran conflict, international oil prices recorded a substantial gain of about 20% in July. In the last 24 hours, prices have slightly pulled back on news of sporadic vessel transits in the Hormuz Strait but remain in a high range overall. Brent crude is trading mainly in the $86-90/barrel range, with a significant geopolitical risk premium priced in.",
      verification: "confirmed",
      timestamp: "2026-07-31T08:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "US Expands Sanctions on Network Supporting Iran's IRGC",
      description: "The United States announced a new round of sanctions targeting companies and individuals in China, India, and Russia accused of helping Iran's Islamic Revolutionary Guard Corps (IRGC) to finance its operations and evade international sanctions. This move aims to further economically isolate and pressure Iran.",
      verification: "single",
      timestamp: "2026-07-31T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Diplomatic Channels Stagnate as Military Actions Dominate",
      description: "Despite claims from third parties (like Pakistan) that US-Iran talks are ongoing, the direct military confrontation and hardline official statements from both sides indicate that diplomacy has effectively stalled. The situation's trajectory is currently dictated entirely by military actions, with no officially confirmed breakthroughs in de-escalation talks.",
      verification: "confirmed",
      timestamp: "2026-07-30T23:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both sides are engaged in direct, sustained military strikes across multiple fronts, short of a full-scale invasion or declaration of war.",
      "The intensity of the conflict has not escalated further nor de-escalated in the past 24-48 hours, remaining at a dangerous level of direct fire exchange.",
      "Both parties are testing each other's red lines, creating a high-risk, unstable equilibrium where any miscalculation could lead to an uncontrolled escalation."
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
        "Change: US and Iranian forces are engaged in direct missile and drone exchanges on Iranian soil and in third countries (e.g., Kuwait, Jordan), keeping conflict…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping in the Strait of Hormuz remains severely impacted by a de facto US blockade, with passage volume far below normal levels, despite r…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Global oil prices remain elevated, with Brent crude fluctuating in the $86-90 per barrel range, as the market continues to price in a significant risk …"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US military is directly participating in military strikes against targets on Iranian territory and directly engaging with Iranian military forces i…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US aims to compel Iranian concessions on nuclear issues and regional influence through 'maximum pressure' (military strikes + economic sanctions), while Iran prioritizes sovereignty and regime security, creating irreconcilable core demands."
    ],
    military: [
      "The US seeks to degrade Iranian military capabilities through controlled air and sea strikes while avoiding a large-scale ground war; Iran utilizes asymmetric capabilities (missiles, drones, proxies) to retaliate, aiming to increase the military and political costs for the US."
    ]
  },
  scoreTrend: [
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80,
      active: true
    }
  ],
  investmentSignal: "→ Maintain a highly defensive posture on risk assets; geopolitical risk premium continues to support energy and commodity positions.",
  prevRiskScore: 80,
  keyChange: "24h: See events and factors.",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 31 2026",
    "US Iran news July 31 2026",
    "Strait of Hormuz shipping situation July 2026",
    "US military posture Middle East July 2026",
    "Iran diplomatic news July 2026",
    "Reuters oil prices July 31 2026",
    "Bloomberg oil market analysis July 31 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月31日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.142 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：24h要点：详见事件与因子。",
    bannerWarning: "→ 维持对风险资产的高度防御姿态，地缘风险溢价持续支撑能源及大宗商品头寸。",
    deescalationIntent: "美国旨在通过“极限压力”（军事打击+经济制裁）迫使伊朗在核问题及地区影响力上让步，而伊朗则将维护主权和政权安全作为首要目标，双方核心诉求无法调和。",
    structuralRisk: "霍尔木兹海峡的商业航运依然受到美军事实上的封锁行动严重影响，通行量远低于正常水平，尽管有零星油轮通过，但整体风险依旧。",
    contradictionNote: "美国旨在通过“极限压力”（军事打击+经济制裁）迫使伊朗在核问题及地区影响力上让步，而伊朗则将维护主权和政权安全作为首要目标，双方核心诉求无法调和。；美国寻求以可控的空中与海上打击削弱伊朗军事能力，同时避免陷入大规模地面战；伊朗则利用其非对称能力（导弹、无人机、代理人）进行反击，试图提高美国的军事和政治成本。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第153天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 31 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.142 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): 24h: See events and factors.",
    bannerWarning: "→ Maintain a highly defensive posture on risk assets; geopolitical risk premium continues to support energy and commodi…",
    deescalationIntent: "The US aims to compel Iranian concessions on nuclear issues and regional influe…",
    structuralRisk: "Commercial shipping in the Strait of Hormuz remains severely impacted by a de facto US blockade, wi…",
    contradictionNote: "The US aims to compel Iranian concessions on nuclear issues and regional influence through 'maximum pressure' (military strikes + economic sanctions), while Ir…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 153",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
