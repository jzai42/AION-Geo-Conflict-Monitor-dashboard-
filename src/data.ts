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
  date: "2026-11-06",
  version: "v2.245",
  riskScore: 74,
  keyChange: "美大选后外交缓和预期遭遇海峡现场阻碍，霍尔木兹通行危机未见实质解除，油价在89–101美元区间企稳回抽；综合风险分落盘 74（较昨日 持平（+0））",
  keyStats: [
    {
      label: "冲突天数",
      value: "D251",
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
      value: "WTI $89.08–$92.53 · Brent $96.71–$100.92",
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
      description: "美伊多前线对峙与巡逻艇、无人机交火常态化维持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡主要商业航运继续停滞，通航受严重阻隔。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI与Brent主力价格区间处在$89–$101，显现明显供应担忧与企稳托底。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战区常态化军事集结与盟友预警协同。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "第三国外交穿梭渠道运作，但前置条件分歧严峻。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "国际油价在海峡风险溢价支撑下触底反弹",
      description: "据Reuters与Investing.com报道，在中期选举引发的单周抛售行情后，霍尔木兹航运遇袭事件使原油市场重新计入供应阻断风险，WTI与Brent双双自低位回稳。",
      verification: "confirmed",
      timestamp: "2026-11-06T08:26:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "卡塔尔就中东局势展开间接斡旋沟通",
      description: "Trading Economics及路透社援引外交消息称，特朗普与卡塔尔领导层就冲突管控沟通，但德黑兰重申须先行解除美方海上封锁并解冻资金方可讨论海峡通行。",
      verification: "confirmed",
      timestamp: "2026-11-06T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "UKMTO继续报告海湾及霍尔木兹商船安全事件",
      description: "英国海事贸易行动办公室通报，霍尔木兹外围商船持续遭遇可疑船只跟踪与无人机骚扰，商业保险费率维持峰值，航运瘫痪态势延续。",
      verification: "confirmed",
      timestamp: "2026-11-06T02:10:00Z",
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
        "延续：美军中央司令部保持高警戒侦察与海空护航战备，未实施新一轮深入内陆打击。",
        "延续：伊朗伊斯兰革命卫队沿海导弹连与无人机部队保持战备巡弋，前沿接触线零星交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油轮与班轮船队维持大规模绕行好望角，通行量不足正常水准10%。",
        "延续：伊朗继续对不具名通行实施电子压制与拦截警告，海峡处于事实封锁状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：选举利空出尽叠加物理断供托底，WTI/Brent价格区间在$89–$101内筑底企稳。",
        "延续：海湾主要产油国海运出口受阻，炼厂馏分油及柴油库存处于历史偏紧状态。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：华盛顿在国会选后评估战略重心，公开探讨停火可行性同时强化威慑语调。",
        "延续：德黑兰强硬坚持以全面解除海上封锁为谈判前提，核心分歧短期难以弥合。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "战场未见全面扩大化升级，但霍尔木兹水域封锁造成全球物流动脉持续梗阻。",
      "外交斡旋进入初步触角阶段，但在核心前置要价上缺乏对齐基础。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方内政选后希望平抑战争成本与通胀，与伊朗要求彻底终结封锁和制裁存在制度性对立。"
    ],
    military: [
      "美军区域制海权维持与伊朗反介入/区域拒止力量在狭窄海峡水域的不可调和对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80
    },
    {
      date: "11-05",
      score: 74
    },
    {
      date: "11-06",
      score: 74,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源与大宗商品供应链尾部风险对冲，防御性配置高确定性避险资产并防范反复脉冲。",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-06",
  version: "v2.245",
  riskScore: 74,
  keyChange: "Post-midterm diplomatic de-escalation hopes hit field reality as the Hormuz chokepoint crisis persists; crude stabilized in the $89–$101 range, keeping the composite risk score anchored at 74.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D251",
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
      value: "WTI $89.08–$92.53 · Brent $96.71–$100.92",
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
      description: "Multi-front standoffs and localized drone/missile skirmishes remain sustained.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial vessel transit through the Strait of Hormuz remains virtually stopped.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI and Brent trading bands anchor in the $89–$101 zone, reflecting supply security floors.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "U.S. forces maintain forward naval and air deterrence alongside allied intelligence networks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Mediation channels through regional intermediaries persist amidst heavy precondition disputes.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Crude Rebounds on Strait Supply Concerns Following Weekly Selloff",
      description: "Reuters and Investing.com report that oil benchmarks stabilized with WTI and Brent recovering as persistent tanker attacks in the Strait of Hormuz reminded markets of tangible supply risks.",
      verification: "confirmed",
      timestamp: "2026-11-06T08:26:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Qatar Engages in Backchannel Mediation Amid Tough Stances",
      description: "Trading Economics and wire reports indicate U.S. and Qatari leadership reviewed de-escalation parameters, though Tehran reiterated demands for lifting naval blockades prior to reopening maritime corridors.",
      verification: "confirmed",
      timestamp: "2026-11-06T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "UKMTO Warns of Continued Maritime Incidents in Gulf Approaches",
      description: "United Kingdom Maritime Trade Operations logged multiple drone and patrol vessel harassment incidents near the strait, keeping merchant war risk insurance elevated.",
      verification: "confirmed",
      timestamp: "2026-11-06T02:10:00Z",
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
        "Continue: CENTCOM maintains round-the-clock air and maritime surveillance posture without initiating inland strikes.",
        "Continue: IRGC coastal units sustain missile patrol readiness with intermittent contact along maritime zones."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial container and tanker lines divert around Africa, keeping transit volume below 10% of baseline.",
        "Continue: Electronic jamming and warning approaches continue to deter unsanctioned commercial navigation."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Post-election selloff subsided as physical transit risks set a solid price floor in the $89–$101 band.",
        "Continue: Regional export bottlenecks keep global distillate and diesel inventories in tight supply."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington calibrates strategic messaging following midterm results while retaining forward deterrence.",
        "Continue: Tehran insists on unconditional termination of maritime blockades as an unalterable prerequisite."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Regional combat remains confined from total war, yet choke-point disruption strangles major energy arteries.",
      "Exploratory diplomatic channels lack alignment on core prerequisites for genuine de-escalation."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "U.S. domestic pressure to curb conflict burdens contrasts sharply with Iran's demands for total blockade and sanctions lifting."
    ],
    military: [
      "U.S. sea control commitments directly oppose Iran's anti-access/area-denial missile and drone arrays across narrow straits."
    ]
  },
  scoreTrend: [
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80
    },
    {
      date: "11-05",
      score: 74
    },
    {
      date: "11-06",
      score: 74,
      active: true
    }
  ],
  investmentSignal: "→ Maintain hedging against oil and maritime supply chain tail risks, preserving defensive exposure in commodities while avoiding unhedged risk assets.",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.245 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：美大选后外交缓和预期遭遇海峡现场阻碍，霍尔木兹通行危机未见实质解除，油价在89–101美元区间企稳回抽；综合风险分落盘 74（较昨日 持平（+0））",
    bannerWarning: "→ 维持能源与大宗商品供应链尾部风险对冲，防御性配置高确定性避险资产并防范反复脉冲。",
    deescalationIntent: "美方内政选后希望平抑战争成本与通胀，与伊朗要求彻底终结封锁和制裁存在制度性对立。",
    structuralRisk: "霍尔木兹海峡主要商业航运继续停滞，通航受严重阻隔。",
    contradictionNote: "美方内政选后希望平抑战争成本与通胀，与伊朗要求彻底终结封锁和制裁存在制度性对立。；美军区域制海权维持与伊朗反介入/区域拒止力量在狭窄海峡水域的不可调和对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第251天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.245 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): Post-midterm diplomatic de-escalation hopes hit field reality as the Hormuz chokepoint crisis persists; crude stabilized in the $89–$101 ra…",
    bannerWarning: "→ Maintain hedging against oil and maritime supply chain tail risks, preserving defensive exposure in commodities while…",
    deescalationIntent: "U.S. domestic pressure to curb conflict burdens contrasts sharply with Iran's d…",
    structuralRisk: "Commercial vessel transit through the Strait of Hormuz remains virtually stopped.",
    contradictionNote: "U.S. domestic pressure to curb conflict burdens contrasts sharply with Iran's demands for total blockade and sanctions lifting.; U.S. sea control commitments d…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 251",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
