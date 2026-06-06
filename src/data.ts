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
  date: "2026-06-06",
  version: "v2.87",
  keyStats: [
    {
      label: "冲突天数",
      value: "D98",
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
      value: "WTI $90–$94 · Brent $93–$98",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国与伊朗在过去24小时内发生直接军事对抗。美国中央司令部报告称，在霍尔木兹海峡附近击落伊朗无人机后，对伊朗海岸雷达站进行了自卫性打击。作为回应，伊朗向科威特和巴林发射了弹道导弹。这些事件表明，尽管存在脆弱的停火协议，但双方的直接交火仍在继续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运继续处于严重中断状态。根据船舶追踪数据和行业报告，商业交通量仍远低于正常水平的50%，大多数主要集装箱和油轮公司已暂停通过该海峡的服务以规避风险。美国中央司令部也报告称其封锁行动已导致大量船只改道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "由于美伊军事紧张局势持续，国际油价维持在高位。市场对潜在的供应中断，特别是霍尔木兹海峡的持续关闭，保持高度警惕。尽管价格从周内高点回落，但仍稳固在较高区间，反映出持续的地缘政治风险溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国直接参与了对伊朗本土目标的军事行动。美国中央司令部的声明证实了其部队不仅拦截了伊朗的无人机和导弹，还主动打击了伊朗的军事设施（雷达站）。这标志着大国从军事部署和威慑升级为直接参与作战行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交前景黯淡。伊朗最高领袖的一名高级顾问公开表示，与美国的谈判已陷入“僵局”，并设置了释放冻结资金作为前提条件。与此同时，双方再次发生直接军事冲突，这严重削弱了外交努力的可信度，使得谈判停滞的风险极高。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "美军打击伊朗雷达站以回应无人机威胁",
      description: "美国中央司令部宣布，在霍尔木兹海峡附近击落四架伊朗攻击无人机后，为自卫对伊朗海岸监视雷达站进行了打击。此举是近期一系列针锋相对行动中的最新一起。",
      verification: "confirmed",
      timestamp: "2026-06-06T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-02",
      title: "伊朗向科威特和巴林发射弹道导弹进行报复",
      description: "作为对美军打击的回应，伊朗伊斯兰革命卫队向科威特和巴林境内的目标发射了七枚弹道导弹。美国中央司令部称，大部分导弹被成功拦截，未造成重大损失。",
      verification: "confirmed",
      timestamp: "2026-06-06T07:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-03",
      title: "伊朗高级顾问称谈判陷入“僵局”",
      description: "据CNN报道，伊朗最高领袖哈梅内伊的军事顾问穆赫辛·雷扎伊称，与美国的核谈判和冲突降级谈判已陷入“僵局”，并将责任归咎于美方，要求解冻240亿美元资产。",
      verification: "single",
      timestamp: "2026-06-05T20:37:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "油价因地缘冲突维持高位",
      description: "国际原油价格在经历了动荡的一周后企稳于高位，布伦特原油在95美元附近交易。交易员正在评估美伊之间新一轮直接军事对抗对全球供应的潜在影响。",
      verification: "confirmed",
      timestamp: "2026-06-06T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方正在进行有限但直接的军事打击与反击，打破了此前不稳定的停火状态。",
      "外交渠道虽未完全关闭，但伊朗方已释放出“谈判僵局”的强硬信号，短期内取得突破的可能性很低。",
      "霍尔木兹海峡的持续封锁是冲突的核心经济杠杆，双方围绕其控制权的军事行动正在加剧。"
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
        "变化：美国与伊朗在过去24小时内发生直接军事对抗。",
        "变化：美国中央司令部报告称，在霍尔木兹海峡附近击落伊朗无人机后，对伊朗海岸雷达站进行了自卫性打击。",
        "变化：作为回应，伊朗向科威特和巴林发射了弹道导弹。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的商业航运继续处于严重中断状态。",
        "变化：根据船舶追踪数据和行业报告，商业交通量仍远低于正常水平的50%，大多数主要集装箱和油轮公司已暂停通过该海峡的服务以规避风险。",
        "变化：美国中央司令部也报告称其封锁行动已导致大量船只改道。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于美伊军事紧张局势持续，国际油价维持在高位。",
        "变化：市场对潜在的供应中断，特别是霍尔木兹海峡的持续关闭，保持高度警惕。",
        "变化：尽管价格从周内高点回落，但仍稳固在较高区间，反映出持续的地缘政治风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国直接参与了对伊朗本土目标的军事行动。",
        "变化：美国中央司令部的声明证实了其部队不仅拦截了伊朗的无人机和导弹，还主动打击了伊朗的军事设施（雷达站）。",
        "变化：这标志着大国从军事部署和威慑升级为直接参与作战行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“极限压力”迫使伊朗在核问题和地区行为上让步，而伊朗则力图通过展示军事决心和搅乱能源市场来换取制裁解除和战略空间。"
    ],
    military: [
      "美国寻求在不引发全面战争的前提下，精确打击伊朗的军事能力并维持对关键航道的控制；伊朗则通过非对称打击和导弹威慑，挑战美国的地区军事主导地位。"
    ]
  },
  scoreTrend: [
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76,
      active: true
    }
  ],
  keyChange: "美伊爆发新一轮直接军事交火，同时伊朗高级官员首次公开称谈判陷入“僵局”，局势由不稳定的对峙滑向更高风险的冲突状态，但综合风险评分因已处高位而持平。",
  investmentSignal: "→ 维持防御性配置，地缘风险溢价持续支撑能源及大宗商品。",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran nuclear talks update",
    "Strait of Hormuz shipping disruptions last 24 hours",
    "US military movements Middle East last 24 hours",
    "Iran military activity last 24 hours",
    "WTI Brent crude oil price today",
    "oil price trend June 6 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-06",
  version: "v2.87",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D98",
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
      value: "WTI $90–$94 · Brent $93–$98",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. and Iran engaged in direct military confrontation in the last 24 hours. U.S. CENTCOM reported conducting self-defense strikes on Iranian coastal radar sites after downing Iranian drones near the Strait of Hormuz. In response, Iran launched ballistic missiles towards Kuwait and Bahrain. These events indicate that direct fire exchanges are ongoing despite a fragile ceasefire.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping through the Strait of Hormuz remains severely disrupted. According to vessel tracking data and industry reports, commercial traffic is still well below 50% of normal levels, with most major container and tanker lines having suspended services through the strait to avoid risks. U.S. CENTCOM also reported its blockade has caused numerous vessels to reroute.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "International oil prices remain elevated due to sustained U.S.-Iran military tensions. The market remains on high alert for potential supply disruptions, especially the continued closure of the Strait of Hormuz. While prices have retreated from intra-week highs, they remain firmly in a high range, reflecting a persistent geopolitical risk premium.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States is directly participating in military operations against targets on Iranian soil. U.S. Central Command's statements confirm its forces not only intercepted Iranian drones and missiles but also proactively struck Iranian military facilities (radar sites). This marks an escalation from military deployment and deterrence to direct participation in combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic prospects appear bleak. A senior advisor to Iran's Supreme Leader has publicly stated that negotiations with the U.S. are at a 'deadlock,' setting the release of frozen assets as a precondition. The renewed direct military conflict between the two sides severely undermines the credibility of diplomatic efforts, making the risk of negotiation collapse extremely high.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "US Strikes Iranian Radar Sites in Response to Drone Threat",
      description: "U.S. Central Command announced that it conducted self-defense strikes against Iranian coastal surveillance radar sites after shooting down four Iranian attack drones near the Strait of Hormuz. This is the latest in a series of tit-for-tat actions.",
      verification: "confirmed",
      timestamp: "2026-06-06T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-02",
      title: "Iran Retaliates with Ballistic Missiles Toward Kuwait and Bahrain",
      description: "In response to the U.S. strikes, Iran's IRGC launched seven ballistic missiles at targets in Kuwait and Bahrain. U.S. CENTCOM reported that most missiles were successfully intercepted and did not cause significant damage.",
      verification: "confirmed",
      timestamp: "2026-06-06T07:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-03",
      title: "Senior Iranian Advisor Says Negotiations are at a 'Deadlock'",
      description: "According to CNN, Mohsen Rezaei, a military advisor to Iran's Supreme Leader Khamenei, claimed that nuclear and de-escalation talks with the US are at a 'deadlock,' blaming the American side and demanding the unfreezing of $24 billion in assets.",
      verification: "single",
      timestamp: "2026-06-05T20:37:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "Oil Prices Remain High Amid Geopolitical Conflict",
      description: "Global crude prices stabilized at high levels after a volatile week, with Brent trading near $95 a barrel. Traders are assessing the potential impact on global supply from the renewed direct military confrontation between the US and Iran.",
      verification: "confirmed",
      timestamp: "2026-06-06T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran are engaged in limited but direct military strikes and counter-strikes, breaking the previous unstable ceasefire.",
      "While diplomatic channels are not completely closed, the Iranian side has sent a strong signal of a 'negotiation deadlock,' making a near-term breakthrough unlikely.",
      "The continued blockade of the Strait of Hormuz is the core economic lever of the conflict, and military actions around its control are intensifying."
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
        "Change: The U.S.",
        "Change: and Iran engaged in direct military confrontation in the last 24 hours.",
        "Change: U.S."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping through the Strait of Hormuz remains severely disrupted.",
        "Change: According to vessel tracking data and industry reports, commercial traffic is still well below 50% of normal levels, with most major container and tank…",
        "Change: U.S."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: International oil prices remain elevated due to sustained U.S.-Iran military tensions.",
        "Change: The market remains on high alert for potential supply disruptions, especially the continued closure of the Strait of Hormuz.",
        "Change: While prices have retreated from intra-week highs, they remain firmly in a high range, reflecting a persistent geopolitical risk premium."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States is directly participating in military operations against targets on Iranian soil.",
        "Change: U.S.",
        "Change: Central Command's statements confirm its forces not only intercepted Iranian drones and missiles but also proactively struck Iranian military facilitie…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to compel Iranian concessions on its nuclear program and regional behavior through 'maximum pressure,' while Iran seeks sanctions relief and strategic space by demonstrating military resolve and disrupting energy markets."
    ],
    military: [
      "The U.S. seeks to precisely degrade Iran's military capabilities and maintain control of key waterways without triggering a full-scale war; Iran challenges U.S. regional military dominance through asymmetric strikes and missile deterrence."
    ]
  },
  scoreTrend: [
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76,
      active: true
    }
  ],
  keyChange: "A new round of direct military fire was exchanged between the US and Iran, while a senior Iranian official publicly stated for the first time that negotiations are at a 'deadlock'. The situation has shifted from an unstable standoff to a higher-risk conflict state, but the overall risk score remains unchanged as it was already at a high level.",
  investmentSignal: "→ Maintain defensive positioning; geopolitical risk premium continues to support energy and commodities.",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran nuclear talks update",
    "Strait of Hormuz shipping disruptions last 24 hours",
    "US military movements Middle East last 24 hours",
    "Iran military activity last 24 hours",
    "WTI Brent crude oil price today",
    "oil price trend June 6 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.87 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美伊爆发新一轮直接军事交火，同时伊朗高级官员首次公开称谈判陷入“僵局”，局势由不稳定的对峙滑向更高风险的冲突状态，但综合风险评分因已处高位而持平。",
    bannerWarning: "→ 维持防御性配置，地缘风险溢价持续支撑能源及大宗商品。",
    deescalationIntent: "美国试图通过“极限压力”迫使伊朗在核问题和地区行为上让步，而伊朗则力图通过展示军事决心和搅乱能源市场来换取制裁解除和战略空间。",
    structuralRisk: "霍尔木兹海峡的商业航运继续处于严重中断状态。根据船舶追踪数据和行业报告，商业交通量仍远低于正常水平的50%，大多数主要集装箱和油轮公司已暂停通过该海峡的服务以规避风险。美国中央司令部也报告称其封锁行…",
    contradictionNote: "美国试图通过“极限压力”迫使伊朗在核问题和地区行为上让步，而伊朗则力图通过展示军事决心和搅乱能源市场来换取制裁解除和战略空间。；美国寻求在不引发全面战争的前提下，精确打击伊朗的军事能力并维持对关键航道的控制；伊朗则通过非对称打击和导弹威慑，挑战美国的地区军事主导地位。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第98天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.87 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): A new round of direct military fire was exchanged between the US and Iran, while a senior Iranian official publicly stated for the first ti…",
    bannerWarning: "→ Maintain defensive positioning; geopolitical risk premium continues to support energy and commodities.",
    deescalationIntent: "The U.S. aims to compel Iranian concessions on its nuclear program and regional…",
    structuralRisk: "Commercial shipping through the Strait of Hormuz remains severely disrupted. According to vessel tr…",
    contradictionNote: "The U.S. aims to compel Iranian concessions on its nuclear program and regional behavior through 'maximum pressure,' while Iran seeks sanctions relief and stra…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 98",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
