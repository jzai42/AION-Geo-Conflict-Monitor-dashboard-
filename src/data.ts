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
  date: "2026-11-26",
  version: "v2.265",
  riskScore: 72,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D271",
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
      value: "WTI $83.16–$85.21 · Brent $89.77–$92.03",
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
      description: "代理人网络对沙特炼厂及驻海湾基地展开无人机袭击，正规军保持防区外对峙。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "水雷威胁与伊朗海上查验常态化，海峡商船通航量不足正常水平50%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油现货与近月合约稳固在83–92美元显著偏强区间，地缘溢价托底支撑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持海上封锁与伙伴国协同侦察，未重启大规模直接对地攻势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "德黑兰坚持解除封锁方可复航，双边缺乏有效履约意愿，谈判高度僵滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "胡塞武装袭击沙特拉斯塔努拉炼厂与利雅得",
      description: "胡塞武装发布战报称对沙特东部主要炼油与出口终端发射巡航导弹，沙特防空拦截后局部受损，路透社与美联社均引述军方简报证实交火事件。",
      verification: "confirmed",
      timestamp: "2026-11-26T06:40:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡多艘油轮触雷引发爆燃",
      description: "伊朗军方与革命卫队通报未获授权船只在海峡东部水域触雷，UKMTO确认阿联酋以西50海里处油轮爆炸警报，航运避险情绪升温。",
      verification: "confirmed",
      timestamp: "2026-11-26T10:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "科威特军事设施遇袭致欧洲驻军人员伤亡",
      description: "科威特境内军事目标遭自杀式无人机打击造成2名意方人员身亡，欧盟委员会敦促强化对伊施压，伊朗使馆公开声明否认关联。",
      verification: "confirmed",
      timestamp: "2026-11-26T12:00:00Z",
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
        "延续：也门胡塞武装保持对沙特核心炼化设施与首都高价值目标的非对称饱和打击。",
        "变化：科威特基地遇袭外溢致使北约盟国出现人员伤亡，加剧海湾外部防务体系戒备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军持续维持对伊朗对外港口的海上封锁，常规油轮避开伊朗海岸航道。",
        "变化：海峡限制区触雷事件频发，伊朗革命卫队强化对非报备船舶的查扣与隔离管制。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与Brent分别锁定在$83–85与$89–92区间，反映地缘风险溢价与过剩预期的双向钳制。",
        "延续：炼厂袭击与海运水雷事件对现货买盘提供抗跌支撑，跨期价差维持温和现货升水。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗领导层强调以终止美国封锁作为海峡通航唯一先决条件，拒绝单边让步。",
        "延续：华盛顿维持经济制裁与海上封锁双重施压，目前未展现大幅外交妥协意向。"
      ]
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "大规模直接本土交火停滞，全面转入海上扼喉与代理人精准扰乱的相持期。",
      "美军维持港口封锁与伊朗控制海峡通道形成事实上的双向遏制结构。",
      "缺乏可操作的履约机制与互信支点，局势极易被偶发触雷或伤亡事件推向新一轮对攻。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊朗彻底放弃对国际水道的排他管理与弹道导弹部署。",
      "伊朗将解除海上封锁与全面解除石油出口制裁作为任何降级协议的前置红线。"
    ],
    military: [
      "美军依赖防空与海上警戒网维持威慑，但难以完全防范低成本无人机与游弋水雷威胁。",
      "伊朗在规避本土决战的同时，持续通过非对称破袭沙特设施以拉高美盟体系防务成本。"
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "11-26",
      score: 72,
      active: true
    }
  ],
  keyChange: "美伊博弈锁定在霍尔木兹海峡水雷管制与沙特炼厂无人机破袭的高位僵局中，综合地缘；综合风险分落盘 72（较昨日 持平（+0））",
  investmentSignal: "→ 维持大宗商品与能源多头对冲头寸，对全球风险资产保持防御配置。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-26",
  version: "v2.265",
  riskScore: 72,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D271",
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
      value: "WTI $83.16–$85.21 · Brent $89.77–$92.03",
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
      description: "Proxy networks launched drone strikes on Saudi refineries and regional bases while regular forces kept stand-off postures.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Naval mine hazards and Iranian maritime controls kept commercial throughput at under 50% of pre-war capacity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude spot and prompt contracts held firmly in the $85–100 significantly elevated band amid geopolitical risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US military enforced naval blockades and regional air defense coordination without resuming large-scale direct strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Tehran insisted on lifting the naval blockade before reopening passages, leaving diplomatic avenues completely stalled.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Houthi Strikes Target Saudi Ras Tanura Refinery and Riyadh",
      description: "Yemen's Houthis claimed strikes on Saudi Arabia's primary refinery complex at Ras Tanura and the Riyadh financial hub, validated by regional military and wire briefings.",
      verification: "confirmed",
      timestamp: "2026-11-26T06:40:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Multiple Tankers Damaged by Naval Mines in Hormuz Chokepoint",
      description: "Iranian military branches reported unauthorized commercial vessels caught fire after hitting naval mines east of Hormuz, corroborated by UKMTO maritime alerts.",
      verification: "confirmed",
      timestamp: "2026-11-26T10:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Drone Strike on Kuwait Base Inflicts European Coalition Casualties",
      description: "A drone strike on a Kuwait military base resulted in two Italian fatalities, prompting the EU to demand increased pressure while Iran denied direct responsibility.",
      verification: "confirmed",
      timestamp: "2026-11-26T12:00:00Z",
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
        "Continue: Houthi forces maintain asymmetric strikes against strategic Saudi energy hubs and inland command centers.",
        "Change: Coalition personnel fatalities in Kuwait raised allied alert postures and heightened friction across Gulf installations."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The US maritime blockade of Iranian ports remains active with heavy patrol coverage outside the Gulf.",
        "Change: Rising mine-strike incidents reinforced Iran's de facto passage controls and further suppressed traffic."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent benchmark ranges remain bounded within $83–85 and $89–92 as physical risk counters global surplus forecasts.",
        "Continue: Refined product cracks and prompt crude spreads retain a moderate war-premium backwardation."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian leadership reiterated that lifting the naval embargo remains the non-negotiable prerequisite for maritime security.",
        "Continue: Washington maintains strict enforcement and sanctions posture without signaling willingness for interim concessions."
      ]
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct homeland air blitzes have paused in favor of grinding maritime blockade enforcement and asymmetric proxy strikes.",
      "Dual containment mechanics persist between the US naval embargo and Iranian control over Strait access corridors.",
      "The lack of dispute-resolution mechanisms leaves the theater acutely vulnerable to escalatory triggers from mine damage or coalition casualties."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "The US demands total cessation of Iranian waterway restrictions and regional proxy armament.",
      "Iran demands the immediate lifting of maritime port blockades and relief from oil export embargoes."
    ],
    military: [
      "Allied air defense grids struggle to provide cost-effective coverage against dispersed low-altitude drones and sea mines.",
      "Iran avoids direct conventional warfare with the US while leveraging regional strikes to impose ongoing economic costs on Gulf neighbors."
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "11-26",
      score: 72,
      active: true
    }
  ],
  keyChange: "The conflict remains locked in a high-pressure standoff dominated by Hormuz mine attrition and proxy infrastructure strikes, leaving the composite risk score unchanged at 72.",
  investmentSignal: "→ Maintain long commodity and energy hedges while adopting defensive allocations across global risk assets.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.265 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：美伊博弈锁定在霍尔木兹海峡水雷管制与沙特炼厂无人机破袭的高位僵局中，综合地缘；综合风险分落盘 72（较昨日 持平（+0））",
    bannerWarning: "→ 维持大宗商品与能源多头对冲头寸，对全球风险资产保持防御配置。",
    deescalationIntent: "美方要求伊朗彻底放弃对国际水道的排他管理与弹道导弹部署。",
    structuralRisk: "水雷威胁与伊朗海上查验常态化，海峡商船通航量不足正常水平50%。",
    contradictionNote: "美方要求伊朗彻底放弃对国际水道的排他管理与弹道导弹部署。；美军依赖防空与海上警戒网维持威慑，但难以完全防范低成本无人机与游弋水雷威胁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第271天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.265 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): The conflict remains locked in a high-pressure standoff dominated by Hormuz mine attrition and proxy infrastructure strikes, leaving the co…",
    bannerWarning: "→ Maintain long commodity and energy hedges while adopting defensive allocations across global risk assets.",
    deescalationIntent: "The US demands total cessation of Iranian waterway restrictions and regional pr…",
    structuralRisk: "Naval mine hazards and Iranian maritime controls kept commercial throughput at under 50% of pre-war…",
    contradictionNote: "The US demands total cessation of Iranian waterway restrictions and regional proxy armament.; Allied air defense grids struggle to provide cost-effective cover…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 271",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
