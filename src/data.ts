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
  date: "2026-06-30",
  version: "v2.111",
  keyStats: [
    {
      label: "冲突天数",
      value: "D122",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $70.0–$71.1 · Brent $72.4–$74.3",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "周末的直接军事交火后，过去24小时内未报告新的、经多源证实的直接打击行动。局势从活跃的直接交火（4分标准）缓和为有限打击后的高压对峙状态（3分标准）。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "尽管航运交通量较周末有所回升，但整体流量仍低于正常水平，且船只仍需遵循特定航道或采取额外安保措施。这符合流量在50-90%之间的部分限制情形。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "油价在周末冲突后企稳于一个较前期更高的区间。WTI原油价格在$70-71美元区间，布伦特原油在$72-74美元区间，已脱离<$75美元的1分档，进入$75-85美元的温和偏强范畴（按规则区间重叠部分或上沿取更保守档）。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国在该地区继续维持其军事部署，包括航母打击群等战略资产，以应对潜在的冲突升级。此举构成直接的军事部署，符合4分标准。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "伊朗官方明确否认了将在多哈与美国举行谈判的计划，称此行仅为技术性跟进资产解冻事宜。这与美方释放的信号相悖，显示双方立场存在巨大分歧，谈判渠道虽存但进展有限。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗否认将在多哈与美国举行谈判",
      description: "伊朗外交部发言人表示，其代表团前往多哈旨在跟进谅解备忘录的执行，特别是关于解冻伊朗资产的条款，并无与美方在任何层面举行谈判的计划。这与美国官员先前透露的本周将举行技术性会谈的说法相悖。(Al Mayadeen, Ministry of Foreign Affairs of Iran)",
      verification: "confirmed",
      timestamp: "2026-06-30T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡航运量在周末冲突后出现回升",
      description: "据海事追踪公司 Kpler 和 Bloomberg 数据，霍尔木兹海峡的航运交通量在周末的美伊短暂交火导致下降后，于周一开始恢复。数据显示，周一约有24艘商品船（含油轮）通过该海峡，周二趋势延续，显示船东对通过该航道的信心有所回升，尽管风险依然存在。(Bloomberg, Gulf Times)",
      verification: "confirmed",
      timestamp: "2026-06-30T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价在紧张局势中企稳，市场关注多哈谈判前景",
      description: "布伦特原油在约73-74美元/桶区间波动，WTI原油则在约70-71美元/桶区间。尽管周末冲突一度引发担忧，但市场焦点转向潜在的美伊谈判前景，油价从高位回落但仍包含地缘政治风险溢价。油价正迈向自2020年以来最大的季度跌幅。(Reuters, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-06-30T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美国与伊朗代表团本周均将前往卡塔尔",
      description: "尽管伊朗否认有直接会谈安排，但白宫方面确认，包括 Jared Kushner 在内的美国代表团将前往多哈。双方均在场为外交斡旋保留了可能性，但公开立场的分歧为谈判前景蒙上阴影。(The Washington Post, iHeart)",
      verification: "confirmed",
      timestamp: "2026-06-30T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方在经过短暂的直接火力交锋后，均暂停了进一步的军事行动，但通过言论和军事部署维持高度紧张态势，核心矛盾未解决。",
      "冲突焦点从军事打击转向外交舞台上的信号博弈，双方都在卡塔尔多哈进行活动，但公开立场矛盾。",
      "局势进入不稳定的平衡期，任何误判或新的挑衅都可能迅速打破脆弱的停火状态。"
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
        "变化：周末的直接军事交火后，过去24小时内未报告新的、经多源证实的直接打击行动。",
        "变化：局势从活跃的直接交火（4分标准）缓和为有限打击后的高压对峙状态（3分标准）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：尽管航运交通量较周末有所回升，但整体流量仍低于正常水平，且船只仍需遵循特定航道或采取额外安保措施。",
        "变化：这符合流量在50-90%之间的部分限制情形。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价在周末冲突后企稳于一个较前期更高的区间。",
        "变化：WTI原油价格在$70-71美元区间，布伦特原油在$72-74美元区间，已脱离<$75美元的1分档，进入$75-85美元的温和偏强范畴（按规则区间重叠部分或上沿取更保守档）。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国在该地区继续维持其军事部署，包括航母打击群等战略资产，以应对潜在的冲突升级。",
        "变化：此举构成直接的军事部署，符合4分标准。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国致力于阻止伊朗获得核武器并遏制其地区影响力，而伊朗则寻求解除制裁、巩固其在霍尔木兹海峡的控制力作为谈判筹码。"
    ],
    military: [
      "美国维持前沿军事部署以威慑伊朗，而伊朗则利用非对称手段（如无人机、导弹）挑战美军存在并展示其封锁海峡的能力。"
    ]
  },
  scoreTrend: [
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68
    },
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56,
      active: true
    }
  ],
  keyChange: "今日综合风险评分维持在60分，与昨日持平。评分内部结构发生变化：【军事升级烈度】因24小时内无新直接交火而从4分降至3分，风险有所缓和；但【能源冲击】因油价进入$75-85温和偏强区间而从1分升至2分。二者变动相互抵消，显示风险从即时军事冲突转向持续的经济与市场压力。",
  investmentSignal: "→ 维持对地缘风险的防御性对冲，尤其是在能源及相关大宗商品领域。",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "US Iran news last 24 hours",
    "Strait of Hormuz shipping status June 30 2026",
    "WTI Brent crude oil price June 30 2026 Reuters",
    "oil price trend Bloomberg June 29-30 2026",
    "Pentagon press briefing Iran June 29 2026",
    "Iran foreign ministry statement June 30 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-30",
  version: "v2.111",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D122",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $70.0-$71.1 · Brent $72.4-$74.3",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Following direct military exchanges over the weekend, no new, multi-source confirmed direct strikes have been reported in the last 24 hours. The situation has de-escalated from active direct fire (a level 4 criterion) to a state of high-pressure standoff following limited strikes (a level 3 criterion).",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Although shipping traffic has somewhat recovered from the weekend's low, overall flow remains below normal levels, and vessels must still adhere to specific corridors or take extra security measures. This aligns with the partial restriction scenario where traffic is between 50-90% of normal.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "Oil prices have stabilized in a higher range following the weekend's conflict. WTI crude is in the $70-71 range and Brent in the $72-74 range, moving out of the <$75 (level 1) category and into the moderately firm $75-85 band (taking the more conservative assessment based on the upper range).",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States maintains its high-level military deployment in the region, including carrier strike groups and other strategic assets, to respond to potential conflict escalation. This constitutes direct military deployment, meeting the level 4 criteria.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Iran has officially denied plans for negotiations with the U.S. in Doha, stating the visit is for technical follow-up on asset release. This contradicts signals from the U.S., showing significant divergence in positions and limiting prospects for progress, though channels of communication exist.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Denies Plans for Negotiations with US in Doha",
      description: "Iran's Foreign Ministry spokesman stated that its delegation's trip to Doha is to follow up on the implementation of the memorandum of understanding, particularly concerning unfrozen Iranian assets, with no plans for negotiations with the US at any level. This contradicts earlier statements from US officials about technical talks expected this week. (Al Mayadeen, Ministry of Foreign Affairs of Iran)",
      verification: "confirmed",
      timestamp: "2026-06-30T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Shipping Volume in Strait of Hormuz Recovers After Weekend Conflict",
      description: "According to maritime tracking firms Kpler and Bloomberg, shipping traffic in the Strait of Hormuz began to recover on Monday after a dip caused by brief US-Iran clashes over the weekend. Data showed about 24 commodity vessels, including oil tankers, transited the strait on Monday, with the trend continuing Tuesday, indicating a partial restoration of shipowners' confidence despite ongoing risks. (Bloomberg, Gulf Times)",
      verification: "confirmed",
      timestamp: "2026-06-30T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Prices Stabilize Amid Tensions as Market Eyes Doha Prospects",
      description: "Brent crude fluctuated around $73-74/barrel, while WTI traded near $70-71/barrel. Despite concerns from the weekend's clashes, the market's focus has shifted to the potential for US-Iran talks, causing prices to retreat from highs but still contain a geopolitical risk premium. Oil is heading for its largest quarterly loss since 2020. (Reuters, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-06-30T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "US and Iranian Delegations Both in Qatar This Week",
      description: "Although Iran denies any scheduled direct talks, the White House has confirmed that a US delegation, including Jared Kushner, will travel to Doha. The presence of both parties leaves the door open for diplomatic maneuvering, but the public divergence in stances casts a shadow over negotiation prospects. (The Washington Post, iHeart)",
      verification: "confirmed",
      timestamp: "2026-06-30T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "After a brief exchange of direct fire, both sides have paused further military actions but maintain a high state of tension through rhetoric and military deployments, with core contradictions unresolved.",
      "The conflict's focus has shifted from military strikes to diplomatic signaling, with both parties active in Doha, Qatar, but with conflicting public statements.",
      "The situation has entered an unstable equilibrium, where any miscalculation or new provocation could quickly shatter the fragile ceasefire."
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
        "Change: Following direct military exchanges over the weekend, no new, multi-source confirmed direct strikes have been reported in the last 24 hours.",
        "Change: The situation has de-escalated from active direct fire (a level 4 criterion) to a state of high-pressure standoff following limited strikes (a level 3 …"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Although shipping traffic has somewhat recovered from the weekend's low, overall flow remains below normal levels, and vessels must still adhere to spe…",
        "Change: This aligns with the partial restriction scenario where traffic is between 50-90% of normal."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices have stabilized in a higher range following the weekend's conflict.",
        "Change: WTI crude is in the $70-71 range and Brent in the $72-74 range, moving out of the <$75 (level 1) category and into the moderately firm $75-85 band (tak…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States maintains its high-level military deployment in the region, including carrier strike groups and other strategic assets, to respond to…",
        "Change: This constitutes direct military deployment, meeting the level 4 criteria."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to prevent Iran from obtaining a nuclear weapon and curb its regional influence, while Iran seeks sanctions relief and seeks to solidify its control over the Strait of Hormuz as leverage."
    ],
    military: [
      "The U.S. maintains a forward military presence to deter Iran, while Iran uses asymmetric capabilities (e.g., drones, missiles) to challenge the U.S. presence and demonstrate its ability to close the strait."
    ]
  },
  scoreTrend: [
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68
    },
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56,
      active: true
    }
  ],
  keyChange: "The overall risk score remains unchanged at 60 today. The internal structure of the score has shifted: 'Military Escalation Intensity' decreased from 4 to 3 due to the absence of new direct fire in the last 24 hours, indicating some moderation. However, 'Energy Shock' increased from 1 to 2 as oil prices entered the moderately firm $75-85 range. These changes offset each other, showing a shift in risk from immediate military conflict to sustained economic and market pressure.",
  investmentSignal: "→ Maintain a defensive hedge against geopolitical risk, particularly in energy and related commodities.",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "US Iran news last 24 hours",
    "Strait of Hormuz shipping status June 30 2026",
    "WTI Brent crude oil price June 30 2026 Reuters",
    "oil price trend Bloomberg June 29-30 2026",
    "Pentagon press briefing Iran June 29 2026",
    "Iran foreign ministry statement June 30 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.111 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 56（↓4）：今日综合风险评分维持在60分，与昨日持平。评分内部结构发生变化：【军事升级烈度】因24小时内无新直接交火而从4分降至3分，风险有所缓和；但【能源冲击】因油价进入$75-85温和偏强区间而从1分升至2分。二者变动相互抵消，显示风险从即时军事冲突转向持续的经济与市场压力。",
    bannerWarning: "→ 维持对地缘风险的防御性对冲，尤其是在能源及相关大宗商品领域。",
    deescalationIntent: "美国致力于阻止伊朗获得核武器并遏制其地区影响力，而伊朗则寻求解除制裁、巩固其在霍尔木兹海峡的控制力作为谈判筹码。",
    structuralRisk: "尽管航运交通量较周末有所回升，但整体流量仍低于正常水平，且船只仍需遵循特定航道或采取额外安保措施。这符合流量在50-90%之间的部分限制情形。",
    contradictionNote: "美国致力于阻止伊朗获得核武器并遏制其地区影响力，而伊朗则寻求解除制裁、巩固其在霍尔木兹海峡的控制力作为谈判筹码。；美国维持前沿军事部署以威慑伊朗，而伊朗则利用非对称手段（如无人机、导弹）挑战美军存在并展示其封锁海峡的能力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第122天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.111 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 56 (↓4): The overall risk score remains unchanged at 60 today. The internal structure of the score has shifted: 'Military Escalation Intensity' decr…",
    bannerWarning: "→ Maintain a defensive hedge against geopolitical risk, particularly in energy and related commodities.",
    deescalationIntent: "The U.S. aims to prevent Iran from obtaining a nuclear weapon and curb its regi…",
    structuralRisk: "Although shipping traffic has somewhat recovered from the weekend's low, overall flow remains below…",
    contradictionNote: "The U.S. aims to prevent Iran from obtaining a nuclear weapon and curb its regional influence, while Iran seeks sanctions relief and seeks to solidify its cont…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 122",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
