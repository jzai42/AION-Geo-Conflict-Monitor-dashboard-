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
  date: "2026-10-28",
  version: "v2.236",
  riskScore: 82,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D242",
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
      value: "WTI $99.75–$102.75 · Brent $109.38–$112.14",
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
  keyChange: "美军JMIC发布霍尔木兹规避警报，航道封锁博弈持续，油价坚守百元危机带，综合风险指数维持；综合风险分落盘 82（较昨日 持平（+0））",
  investmentSignal: "→ 维持大宗商品与上游能源板块防御性底仓，同时通过跨品种波动率工具对冲中东原油供应中断尾部风险。",
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军加强海上封锁执法并发布航运规避警报，商业航运风险溢价饱和。",
      "伊朗维持对波斯湾咽喉控制诉求，外海穿梭过驳成为维系输出的唯一通道。",
      "核心大国在避免全面总决战的前提下，围绕原油禁运与制海权展开拉锯。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "来源US NAVCENT与AP：海空导弹拦截与无人机对峙未见降温，区域交火保持高烈度施压态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "来源UKMTO与JMIC：官方明确通告建议商船全线规避霍尔木兹水域，常规商业航行处于完全封锁状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "来源Reuters与Bloomberg：WTI与布伦特分别运行于$99.75–$102.75与$109.38–$112.14，稳居$100–120危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "来源CENTCOM与DoD简报：美军主导联军护航、禁运封锁与情报网络，未触发多大国全面对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "来源AP与Al Jazeera：各方技术接触难抵根本安全分歧，停火框架协议缺乏互信基石。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：红海及阿曼湾防空拦截频次保持高位，局部战术打击维持零和拉锯。",
        "变化：美军中央司令部调整战术布防，针对海上巡航导弹与自杀式无人艇强化前沿预警拦截网。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：JMIC正式发布航行回避警报，国际主要班轮公司继续绕道好望角。",
        "延续：阿曼外海船对船（STS）转运模式成为区域原油离港的极少数替代渠道。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：两地基准原油在$100–$112区间维持高波动，地缘风险贴水对冲去库存预期。",
        "延续：中东至亚洲VLCC运费与战险保费居高不下，推升全球到岸成本。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊高级官员言论针锋相对，均表示对封锁与反封锁长期化做好准备。",
        "延续：区域第三方多轮穿梭沟通因核心要件未达成一致而暂缓取得实质性进展。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方以极限封锁压制伊朗出口与伊朗捍卫霍尔木兹管辖权的不可调和性。"
    ],
    military: [
      "公海航行自由联盟执法与近海反舰拒止作战能力的不对称对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军NAVCENT通过JMIC发布霍尔木兹规避通告",
      description: "美军中央司令部海军部队通过JMIC向全球航运业发布安全通告，警告非必要商船远离阿曼湾与霍尔木兹海峡区域，配合禁运执法。",
      verification: "confirmed",
      timestamp: "2026-10-28T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "布伦特与WTI油价在$100–$112危机带盘整",
      description: "由于海运瓶颈及地缘溢价支撑，国际油价日内震荡，WTI报$99.75–$102.75，布伦特报$109.38–$112.14。",
      verification: "confirmed",
      timestamp: "2026-10-28T14:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "德黑兰穿梭外交未达成海峡解封协议",
      description: "地区多方代表在德黑兰就分阶段恢复霍尔木兹航运展开磋商，但美伊各自核心诉求对立严重，未取得实质突破。",
      verification: "partial",
      timestamp: "2026-10-28T08:15:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-28",
  version: "v2.236",
  riskScore: 82,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D242",
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
      value: "WTI $99.75–$102.75 · Brent $109.38–$112.14",
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
  keyChange: "US NAVCENT/JMIC issues a formal transit avoidance notice in Hormuz; energy benchmarks hover in the $100+ crisis band, keeping composite risk static at 82.",
  investmentSignal: "→ Maintain defensive allocations in upstream energy and commodities while hedging tail-risk spikes with cross-asset volatility tools.",
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Coalition blockade enforcement intensifies alongside merchant shipping avoidance advisories.",
      "Iranian control assertions around the chokepoint keep physical transit throttled to minimal dark transfers.",
      "Major powers maintain coercive pressure without escalating into unlimited total land warfare."
    ],
    note: "For monitoring only; not investment advice."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Sources: US NAVCENT, AP. Direct interdictions and persistent standoff missile/drone strikes sustain acute combat pressure.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Sources: UKMTO, JMIC. Formal advisory instructs neutral merchant shipping to steer clear, sustaining virtual closure for commercial lines.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Sources: Reuters, Bloomberg. WTI trades at $99.75–$102.75 and Brent at $109.38–$112.14, situated firmly inside the $100–$120 crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Sources: CENTCOM, DoD. Direct naval blockade operations and maritime escort coordination continue without global power confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Sources: AP, Al Jazeera. Diplomatic shuttle talks fail to resolve core security disputes, keeping breakdown risks elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Air and missile defense networks remain on high alert against proxy launches across the Gulf perimeter.",
        "Change: US Central Command refines naval intercept patterns to preempt maritime unmanned surface and aerial threats."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: JMIC issues formal transit avoidance guidance, cementing diversion of major liner networks around Africa.",
        "Continue: Offshore ship-to-ship (STS) lightering outside the Strait remains the dominant workaround for export barrels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global crude benchmarks fluctuate within the $100–$112 range under persistent geopolitical risk premia.",
        "Continue: Middle East VLCC freight rates and war-risk insurance premiums sustain elevated landing costs worldwide."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Leaders in Washington and Tehran signal readiness for an extended operational standoff.",
        "Continue: Regional diplomatic overtures fail to produce binding de-escalation guarantees."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable conflict between US maximum-pressure blockade and Iranian sovereignty claims over the waterway."
    ],
    military: [
      "Asymmetric coastal anti-access/area-denial capabilities vs. international freedom-of-navigation enforcement fleets."
    ]
  },
  scoreTrend: [
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US NAVCENT & JMIC Issue Hormuz Avoidance Advisory",
      description: "US naval leadership alongside JMIC issued an advisory directing non-essential commercial shipping to steer clear of the Hormuz corridor.",
      verification: "confirmed",
      timestamp: "2026-10-28T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Crude Benchmarks Fluctuate Inside $100–$112 Crisis Band",
      description: "Oil futures hold firm amid maritime transit friction, with WTI spanning $99.75–$102.75 and Brent trading within $109.38–$112.14.",
      verification: "confirmed",
      timestamp: "2026-10-28T14:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Tehran Diplomatic Consultations Yield No Breakthrough",
      description: "Regional envoy meetings in Tehran concluded without binding maritime passage agreements as core political preconditions remain unmet.",
      verification: "partial",
      timestamp: "2026-10-28T08:15:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.236 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美军JMIC发布霍尔木兹规避警报，航道封锁博弈持续，油价坚守百元危机带，综合风险指数维持；综合风险分落盘 82（较昨日 持平（+0））",
    bannerWarning: "→ 维持大宗商品与上游能源板块防御性底仓，同时通过跨品种波动率工具对冲中东原油供应中断尾部风险。",
    deescalationIntent: "美方以极限封锁压制伊朗出口与伊朗捍卫霍尔木兹管辖权的不可调和性。",
    structuralRisk: "来源UKMTO与JMIC：官方明确通告建议商船全线规避霍尔木兹水域，常规商业航行处于完全封锁状态。",
    contradictionNote: "美方以极限封锁压制伊朗出口与伊朗捍卫霍尔木兹管辖权的不可调和性。；公海航行自由联盟执法与近海反舰拒止作战能力的不对称对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第242天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.236 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): US NAVCENT/JMIC issues a formal transit avoidance notice in Hormuz; energy benchmarks hover in the $100+ crisis band, keeping composite ris…",
    bannerWarning: "→ Maintain defensive allocations in upstream energy and commodities while hedging tail-risk spikes with cross-asset vol…",
    deescalationIntent: "Irreconcilable conflict between US maximum-pressure blockade and Iranian sovere…",
    structuralRisk: "Sources: UKMTO, JMIC. Formal advisory instructs neutral merchant shipping to steer clear, sustainin…",
    contradictionNote: "Irreconcilable conflict between US maximum-pressure blockade and Iranian sovereignty claims over the waterway.; Asymmetric coastal anti-access/area-denial capa…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 242",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
