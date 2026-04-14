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
  date: "2026-04-13",
  version: "v2.25",
  riskScore: 80,
  keyStats: [
    {
      label: "冲突天数",
      value: "D44",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
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
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-0413-1",
      title: "伊朗对以色列发动史无前例的直接打击",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-0413-2",
      title: "美国军队直接参与拦截伊朗攻击",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true
    },
    {
      id: "evt-0413-3",
      title: "布伦特油价因袭击事件飙升近$98",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "evt-0413-4",
      title: "G7领导人将召开紧急会议协调对伊回应",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  warPhase: {
    level: "直接冲突",
    targetLevel: "全面区域战争",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗首次从本土对以色列进行大规模直接军事打击。",
      "美国直接军事介入，参与拦截伊朗的攻击。",
      "局势的走向完全取决于以色列和美国反击的规模和方式。"
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
        "伊朗动用多种武器平台对以色列发动饱和攻击，显示其升级意愿和能力。",
        "美国和盟友的联合防御行动展示了区域防空一体化能力，但也被迫暴露了部署情况。",
        "各方都在评估此次攻防行动的结果，以决定下一步行动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "霍尔木兹海峡的军事风险达到顶点，商业航运面临被直接攻击或扣押的真实威胁。",
        "主要集装箱和油轮公司正在评估暂停或绕行该航线，将导致全球供应链成本和延迟增加。",
        "战争风险保费预计将大幅上涨。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "油价已反映出高度的风险溢价，市场正为潜在的供应中断做准备。",
        "如果以色列对伊朗石油设施进行报复性打击，油价可能轻松突破100美元。",
        "OPEC+可能面临增产压力，但闲置产能有限且决策需要时间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "伊朗领导层试图将此次攻击定性为一次“有限且已结束”的报复，意在控制升级节奏，但球已踢给对方。",
        "美国政府在谴责伊朗的同时，强调其对以色列“铁一般的”安全承诺，暗示支持其自卫权。",
        "以色列战时内阁正在商议回应措施，内部强硬派要求进行强力报复。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗试图“一击了结”并恢复威慑，而以色列和美国则面临必须强力回应以重建威慑的国内和战略压力。"
    ],
    military: [
      "伊朗展示了其远程精确打击能力，而美以联盟则展示了其先进的多层防御能力。双方都在计算对方的真实战损和自身下一步行动的风险收益。"
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "04-13",
      score: 80,
      active: true
    }
  ],
  keyChange: "冲突性质发生根本性转变：从代理人冲突和有限报复，升级为伊朗国家层面与美国、以色列的直接军事对抗。这是自冲突开始以来最危险的升级。",
  investmentSignal: "维持风险平衡敞口。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-13",
  version: "v2.25",
  riskScore: 80,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D44",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
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
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-0413-1",
      title: "Iran Launches Unprecedented Direct Attack on Israel",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-0413-2",
      title: "US Forces Directly Engage in Intercepting Iranian Attack",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: "",
      highlight: true
    },
    {
      id: "evt-0413-3",
      title: "Brent Oil Price Surges Toward $98 on Attack News",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "evt-0413-4",
      title: "G7 Leaders to Hold Emergency Meeting to Coordinate Response to Iran",
      description: "",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  warPhase: {
    level: "Direct Conflict",
    targetLevel: "Full-Scale Regional War",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran conducted its first-ever large-scale direct military strike on Israel from its own territory.",
      "The United States is now directly involved militarily by participating in the interception of the Iranian attack.",
      "The trajectory now depends entirely on the scale and nature of the Israeli and US counter-response."
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
        "Iran's use of multiple weapon platforms in a saturation attack demonstrates its willingness and capability to escalate.",
        "The joint defense by the US and allies showed integrated regional air defense capabilities but also forced them to reveal deployments.",
        "All parties are assessing the results of the attack and defense to determine their next moves."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Military risk in the Strait of Hormuz is at a peak, with commercial shipping facing a real threat of direct attack or seizure.",
        "Major container and tanker companies are evaluating suspending or rerouting from the strait, which would increase global supply chain costs and delays.",
        "War risk insurance premiums are expected to rise sharply."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Oil prices have priced in a high-risk premium as the market braces for potential supply disruptions.",
        "A retaliatory strike by Israel on Iranian oil infrastructure could easily push prices above $100.",
        "OPEC+ may face pressure to increase production, but spare capacity is limited and decisions take time."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Iran's leadership is attempting to frame the attack as a 'limited and concluded' retaliation to manage escalation, but the ball is now in the other court.",
        "The US administration, while condemning Iran, has stressed its 'ironclad' commitment to Israel's security, implying support for its right to self-defense.",
        "Israel's war cabinet is deliberating on a response, with hardline factions demanding a forceful retaliation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran is attempting a 'one-and-done' strike to restore deterrence, while Israel and the U.S. face domestic and strategic pressure to respond forcefully to re-establish their own deterrence."
    ],
    military: [
      "Iran has demonstrated its long-range precision strike capabilities, while the US-Israeli alliance has showcased its advanced, multi-layered defense capabilities. Both sides are now calculating the true damage and the risk-reward of their next military move."
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "04-13",
      score: 80,
      active: true
    }
  ],
  keyChange: "A fundamental shift in the nature of the conflict: from proxy warfare and limited retaliation to direct, state-level military confrontation between Iran and the US/Israel. This is the most dangerous escalation since the conflict began.",
  investmentSignal: "Maintain balanced exposure.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.25 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑8）：冲突性质发生根本性转变：从代理人冲突和有限报复，升级为伊朗国家层面与美国、以色列的直接军事对抗。这是自冲突开始以来最危险的升级。",
    bannerWarning: "维持风险平衡敞口。",
    deescalationIntent: "伊朗试图“一击了结”并恢复威慑，而以色列和美国则面临必须强力回应以重建威慑的国内和战略压力。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "伊朗试图“一击了结”并恢复威慑，而以色列和美国则面临必须强力回应以重建威慑的国内和战略压力。；伊朗展示了其远程精确打击能力，而美以联盟则展示了其先进的多层防御能力。双方都在计算对方的真实战损和自身下一步行动的风险收益。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第44天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.25 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑8): A fundamental shift in the nature of the conflict: from proxy warfare and limited retaliation to direct, state-level military confrontation…",
    bannerWarning: "Maintain balanced exposure.",
    deescalationIntent: "Iran is attempting a 'one-and-done' strike to restore deterrence, while Israel …",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "Iran is attempting a 'one-and-done' strike to restore deterrence, while Israel and the U.S. face domestic and strategic pressure to respond forcefully to re-es…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 44",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
