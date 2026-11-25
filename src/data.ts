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
  date: "2026-11-25",
  version: "v2.264",
  riskScore: 72,
  keyChange: "霍尔木兹海峡监视与水雷威慑再度强化，布伦特原油在86–91美元高位震荡，双方维持对峙僵局。",
  investmentSignal: "→ 维持大宗与能源资产防御性对冲配置，防范霍尔木兹局部摩擦引发的短期脉冲风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D270",
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
      value: "WTI $80.13–$83.85 · Brent $86.95–$90.77",
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
      description: "美军与伊朗在霍尔木兹及周边区域保持战备警戒，无人机接触与防空对峙持续频发。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡水雷威胁与强制通报管制常态化，主流商业船舶继续选择绕航或限制规模航行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油期价在海峡风险溢价与外部宏观供应过剩博弈下维持中高位区间震荡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国海军通过特遣部署严密监控海空走廊，大国间通过非对称防务合作进行间接角力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "双方将解除封锁与恢复航行安全设为互不让步的前提，外交磋商陷入实质性停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡由全面冲突转为制度化通报管制与水雷拒止对峙",
      "美伊双方均保持战略克制避免直接大规模陆海交火，但封锁压力未减",
      "原油航运形成暗舱流转与非正规转运并存的脆弱适应期"
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
        "延续：美军特遣舰队保持海峡外围巡航警戒与空防拦截。",
        "变化：伊朗升级沿岸雷达侦测系统并加强对低空无人目标的布防。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业船队维持高额战争险与暗舱通航，整体通行量严重受限。",
        "变化：伊朗发布严格协调通报警示，未获许可船只面临水雷排查风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特期价依托海峡断航溢价在90美元下方获支撑。",
        "变化：美假期临近交投转淡，现货市场对增产与断供双向博弈收窄。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方在封锁合法性与制裁解除议题上针锋相对。",
        "变化：华盛顿警告若年底前无进展将评估后续军事选项，立场趋硬。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方无条件开放航道并停止前沿威慑，而伊方要求全面解除海上封锁与能源制裁。"
    ],
    military: [
      "美军区域防空反导网络与伊朗沿海反舰水雷/无人机非对称饱和威慑形成胶着。"
    ]
  },
  scoreTrend: [
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72
    },
    {
      date: "11-25",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗军方部署新监控系统并警告未经报备油轮通行风险",
      description: "伊朗陆军与卫队发言人通报升级霍尔木兹海峡监视系统，严厉警告未同伊朗方面协调通行的船只面临触雷及拦截风险，航道管控力度收紧。",
      verification: "confirmed",
      timestamp: "2026-11-25T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "国际原油在海峡封锁博弈与供应过剩预期中震荡交投",
      description: "主流财经媒体监测显示，Brent原油交投于$86.95–$90.77区间，市场在霍尔木兹地缘风险溢价与外部非欧佩克供给增加之间陷入拉锯。",
      verification: "confirmed",
      timestamp: "2026-11-25T16:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗声称在霍尔木兹海峡上空击落美军无人飞行器",
      description: "伊朗官方媒体报道防空力量在海峡东西两段分别拦截美方无人机，美方未予正式证实但保持战区严密空防监视态势。",
      verification: "partial",
      timestamp: "2026-11-25T08:15:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-25",
  version: "v2.264",
  riskScore: 72,
  keyChange: "Hormuz surveillance and mine deterrence tightened as Brent crude fluctuates between $86 and $91, cementing the current standoff.",
  investmentSignal: "→ Maintain defensive hedging in commodities and energy assets to mitigate tail risks from recurring Hormuz friction.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D270",
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
      value: "WTI $80.13–$83.85 · Brent $86.95–$90.77",
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
      description: "US forces and Iran maintain active combat alert around Hormuz, with frequent air-defense drone engagements.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Naval mine risks and mandatory coordination protocols keep commercial transit heavily depressed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks oscillate in upper-middle ranges as choke-point risk premia balance macro surplus expectations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US naval blockade enforcement continues while external military assistance remains under tight scrutiny.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Both parties condition progress on non-negotiable preconditions, leaving diplomatic channels deadlocked.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strait conflict has settled into institutionalized transit restrictions and mine-deterrence posturing",
      "Direct major kinetic exchanges remain constrained, but economic coercion lines remain rigid",
      "Energy shipping adapts to high-risk bypasses and dark transfers under persistent friction"
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
        "Continue: US naval task forces preserve persistent surveillance and air patrol presence.",
        "Change: Iran enhances coastal radar monitoring systems and low-altitude air defense ready state."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial fleets rely on war-risk premiums and dark transits under restricted volumes.",
        "Change: Iranian authorities issue strict warnings of naval mine hazards for unauthorized transits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude receives floor support below $90 due to the unresolved chokepoint premium.",
        "Change: Pre-holiday trading thinness limits directional momentum as supply-demand narratives clash."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington and Tehran exchange rigid demands regarding sanctions and blockade removal.",
        "Change: US leadership reiterates contingency timelines if diplomatic talks fail to gain traction."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US demands unimpeded navigation and cessation of coercive acts, while Iran demands full cessation of naval blockades and economic sanctions."
    ],
    military: [
      "US regional air and maritime interdiction capability faces Iran's asymmetric coastal anti-ship missile and mine warfare deterrence."
    ]
  },
  scoreTrend: [
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72
    },
    {
      date: "11-25",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran upgrades Hormuz surveillance and warns uncoordinated tankers of mine hazard",
      description: "Iranian military officials announced advanced surveillance deployment in the Strait of Hormuz, warning that uncoordinated commercial transits face severe mine strike risks.",
      verification: "confirmed",
      timestamp: "2026-11-25T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Crude oil markets trade rangebound amid Hormuz tensions and surplus forecasts",
      description: "Brent futures oscillate between $86.95 and $90.77 as traders weigh continuing maritime hazards in the Persian Gulf against expectations of rising Atlantic basin supply.",
      verification: "confirmed",
      timestamp: "2026-11-25T16:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Iran claims interception of US unmanned aerial vehicles over Hormuz",
      description: "State media reported that Iranian air defense forces intercepted US drones over the strait; US forces maintained heightened regional situational readiness.",
      verification: "partial",
      timestamp: "2026-11-25T08:15:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.264 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：霍尔木兹海峡监视与水雷威慑再度强化，布伦特原油在86–91美元高位震荡，双方维持对峙僵局。",
    bannerWarning: "→ 维持大宗与能源资产防御性对冲配置，防范霍尔木兹局部摩擦引发的短期脉冲风险。",
    deescalationIntent: "美方要求伊方无条件开放航道并停止前沿威慑，而伊方要求全面解除海上封锁与能源制裁。",
    structuralRisk: "海峡水雷威胁与强制通报管制常态化，主流商业船舶继续选择绕航或限制规模航行。",
    contradictionNote: "美方要求伊方无条件开放航道并停止前沿威慑，而伊方要求全面解除海上封锁与能源制裁。；美军区域防空反导网络与伊朗沿海反舰水雷/无人机非对称饱和威慑形成胶着。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第270天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.264 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Hormuz surveillance and mine deterrence tightened as Brent crude fluctuates between $86 and $91, cementing the current standoff.",
    bannerWarning: "→ Maintain defensive hedging in commodities and energy assets to mitigate tail risks from recurring Hormuz friction.",
    deescalationIntent: "The US demands unimpeded navigation and cessation of coercive acts, while Iran …",
    structuralRisk: "Naval mine risks and mandatory coordination protocols keep commercial transit heavily depressed.",
    contradictionNote: "The US demands unimpeded navigation and cessation of coercive acts, while Iran demands full cessation of naval blockades and economic sanctions.; US regional a…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 270",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
