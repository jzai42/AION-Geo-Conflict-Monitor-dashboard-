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
  date: "2026-10-08",
  version: "v2.215",
  riskScore: 70,
  keyChange: "霍尔木兹袭船频次创战时周峰推动布伦特油价重返105美元，但大国未直接交火；综合风险分落盘 70（较昨日 +6）；调整前模型分 64（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品与能源资产对冲多头，对高估值权益等风险资产采取防御性仓位控制。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D222",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $88.77–$93.20 · Brent $100.75–$105.91",
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
      description: "依据路透社与军方通报，胡塞武装持续向沙特腹地与周边发动多波次袭击，多战线交火维持高烈度态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "依据UKMTO与Kpler数据，商船在海峡附近遭遇抛射物袭击出现伤亡，海峡依赖军舰护航，流量维持在50–90%受限区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "依据雅虎财经及路透社，WTI处于$88.77–$93.20，布伦特进入$100.75–$105.91危机带，取舍兼顾双油种维持3.5档。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "依据美国防部消息，美军中央司令部维持对商船巡航护航与反导预警援助，大国未实施全面直接军事参战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "依据半岛电视台报道，外交沟通渠道低速运转，缺乏全面停火政治意愿，实质谈判陷入僵局但未彻底关闭。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "海峡及周边油轮遇袭频次激增创战时周峰",
      description: "UKMTO证实一艘油轮在卡塔尔马迪纳特阿沙马尔以北94公里处遭抛射物袭击并造成伤亡，路透社报道海峡周边袭船次数创战时单周最高。",
      verification: "confirmed",
      timestamp: "2026-10-08（当日公开报道）",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "布伦特原油冲破105美元进入危机带",
      description: "受波斯湾航运风险升级与美墨湾海上油田停产双重驱动，布伦特原油大涨逾4%触及105.91美元高位，美联社与路透社均予以确认。",
      verification: "confirmed",
      timestamp: "2026-10-08（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美媒报道白宫指示军方制定对伊打击预案",
      description: "《大西洋月刊》报道白宫已要求五角大楼在11月中期选举前规划打击伊朗方案，路透社跟进引述，该消息属于匿名信源披露。",
      verification: "partial",
      timestamp: "2026-10-08（当日公开报道）",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡袭击频度反弹，美军护航体制面临更大物流保全成本考验。",
      "国际能源市场对断供忧虑增强，布伦特原油重新站上105美元危机警戒位。"
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
        "延续：也门胡塞武装对周边要道及沙特目标持续施加非对称打击压力。",
        "延续：美军中央司令部加强波斯湾及红海防空联防与战巡警戒。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：卡塔尔北部海域商船遭袭出现人员伤亡，周度遇袭强度创开战以来新高。",
        "延续：商业船只依赖护航及管网绕行，通道流量保持在受控但受限状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特触及$105.91高点，地缘溢价抵消国际能源署释储平抑效应。",
        "延续：WTI维持在$88–$93区间，全球原油跨区价差持续走阔。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方均展现高调战备威慑姿态，未释放主动实质妥协让步意图。",
        "延续：第三方斡旋管道保持技术性联络，但缺乏高级别突破动能。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均受制于国内政治压力，在中期选举窗口期前缺乏单边让步空间。"
    ],
    military: [
      "低成本无人机与弹道武器封锁通道意图与美军高成本护航拦截能力之间的非对称消耗。"
    ]
  },
  scoreTrend: [
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-08",
  version: "v2.215",
  riskScore: 70,
  keyChange: "Surging tanker attacks around Hormuz pushed Brent back above $105, but absence of direct superpower combat leaves the; composite risk score prints at 70 (vs prior day +6); pre-adjustment model score 64 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain hedges in energy and commodities while keeping a defensive posture on risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D222",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $88.77–$93.20 · Brent $100.75–$105.91",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "严重受限",
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
      description: "According to Reuters and military dispatches, multi-front exchanges and Houthi strikes remain highly active across the theater.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "According to UKMTO and Kpler, commercial tankers face sustained projectile attacks with transit volumes limited to 50–90%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "According to Yahoo Finance and Reuters, Brent traded into the $100.75–$105.91 band while WTI settled at $88.77–$93.20, warranting a 3.5 score.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "According to DoD releases, US forces focus on maritime convoy protection and air defense intelligence without entering direct combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "According to Al Jazeera and Reuters, back-channel talks continue but lack substantive diplomatic momentum for a formal truce.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Tanker Attacks Around Hormuz Reach War-Time Weekly Peak",
      description: "UKMTO confirmed a tanker was struck by projectiles 94km north of Qatar causing casualties, with Reuters reporting weekly attacks reached a conflict high.",
      verification: "confirmed",
      timestamp: "2026-10-08 (same-day reporting)",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Brent Crude Crosses $105 Crisis Threshold on Supply Concerns",
      description: "Brent jumped over 4% past $105.91 driven by Persian Gulf shipping risk and US Gulf shut-ins, as reported by Reuters and AP.",
      verification: "confirmed",
      timestamp: "2026-10-08 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Media Report Claims White House Directs Pentagon to Draft Strike Options",
      description: "The Atlantic reported the administration asked for options on potential limited strikes against Iran ahead of midterm elections, citing anonymous officials.",
      verification: "partial",
      timestamp: "2026-10-08 (same-day reporting)",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Spike in maritime strikes tests the operational capacity of naval escort coalitions in the Gulf.",
      "Brent surging back above $105 heightens global market anxiety regarding extended supply disruptions."
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
        "Continue: Houthi forces maintain asymmetric drone and missile harassment across the regional front.",
        "Continue: US Central Command maintains active air defense readiness and maritime patrol deployments."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tanker hit north of Qatar results in casualties as weekly incident count touches record highs.",
        "Continue: Commercial maritime flows remain reliant on naval escorts and overland bypass conduits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent climbed to $105.91 as renewed geopolitical risk overshadowed global strategic reserve releases.",
        "Continue: WTI traded between $88 and $93 with North American supply providing relative stability."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington and Tehran sustain public deterrence rhetoric without signaling willingness to concede.",
        "Continue: Third-party intermediaries preserve communication channels despite an absence of diplomatic breakthroughs."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Domestic midterm and regional political pressures restrict leadership willingness to offer unilateral concessions."
    ],
    military: [
      "Asymmetric threat from low-cost missiles against high-cost multi-national naval convoy defense systems."
    ]
  },
  scoreTrend: [
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.215 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↑6）：霍尔木兹袭船频次创战时周峰推动布伦特油价重返105美元，但大国未直接交火；综合风险分落盘 70（较昨日 +6）；调整前模型分 64（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品与能源资产对冲多头，对高估值权益等风险资产采取防御性仓位控制。",
    deescalationIntent: "美伊双方均受制于国内政治压力，在中期选举窗口期前缺乏单边让步空间。",
    structuralRisk: "依据UKMTO与Kpler数据，商船在海峡附近遭遇抛射物袭击出现伤亡，海峡依赖军舰护航，流量维持在50–90%受限区间。",
    contradictionNote: "美伊双方均受制于国内政治压力，在中期选举窗口期前缺乏单边让步空间。；低成本无人机与弹道武器封锁通道意图与美军高成本护航拦截能力之间的非对称消耗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第222天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.215 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↑6): Surging tanker attacks around Hormuz pushed Brent back above $105, but absence of direct superpower combat leaves the; composite risk score…",
    bannerWarning: "→ Maintain hedges in energy and commodities while keeping a defensive posture on risk assets.",
    deescalationIntent: "Domestic midterm and regional political pressures restrict leadership willingne…",
    structuralRisk: "According to UKMTO and Kpler, commercial tankers face sustained projectile attacks with transit vol…",
    contradictionNote: "Domestic midterm and regional political pressures restrict leadership willingness to offer unilateral concessions.; Asymmetric threat from low-cost missiles ag…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 222",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
