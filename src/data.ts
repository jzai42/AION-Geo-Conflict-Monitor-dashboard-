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
  date: "2026-09-16",
  version: "v2.192",
  riskScore: 82,
  prevRiskScore: 82,
  investmentSignal: "→ 维持对防御性大宗及能源板块的增持，同时积极配置避险资产以对冲地缘风险。",
  keyChange: "美伊在霍尔木兹海峡海空对峙频次增加，原油主力合约继续维持在100美元以上的高位震荡状态。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D200",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "WTI $102.85–$105.63 · Brent $106.64–$108.59",
      unit: "参考",
      color: "red",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "orange"
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "中东危机高位对峙平台期",
    subTitle: "D200双边军事对峙频发，百元油价构成市场硬支撑",
    points: [
      "美伊在海峡海空域发生警告性近距离对峙，军事对抗张力极高",
      "海峡运力减半导致供应链中断担忧常态化，运费及保险费率高涨",
      "外交谈判渠道目前基本处于冻结状态，暂无实质降级迹象"
    ],
    note: "尽管缺乏全面战争的动机，但任何战术误判都可能直接引爆更大规模的海上冲突。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "战线直接交火与前方密集对峙依然处于高强度，尚未出现降温势头。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主要商业航商绕道，通过运力缩水过半，高昂保费严重迟滞商业交通。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "由于军事溢价和物流阻塞，WTI和Brent主力油价持续运行在100美元上方的危机区间。",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国通过海空巡逻和前沿预警进行威慑，但尚无展开大规模跨国陆空协同攻势的意图。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双边官方立场高度对立，中介对话失效，短期政治妥协基本无望。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-001",
      title: "美伊海湾海空近距离对峙",
      description: "美国海军第五舰队通报在霍尔木兹海域对多艘伊朗革命卫队快艇进行警告性射击，双方近距离相峙数小时后撤离。",
      verification: "confirmed",
      timestamp: "2026-09-16T04:20:00Z",
      significance: "增加了一线战术误判走火的可能性",
      highlight: true,
      critical: true
    },
    {
      id: "ev-002",
      title: "伊朗外交部公开表态强硬",
      description: "伊朗官方通讯社IRNA报道，外交部强调不会在美国的极限军事施压下妥协，重申对该水域的绝对防御权利。",
      verification: "confirmed",
      timestamp: "2026-09-16T08:15:00Z",
      significance: "表明高层无意示弱，短期难以达成外交降级"
    },
    {
      id: "ev-003",
      title: "商运通过量数据继续探底",
      description: "国际航运机构联合报告表明，由于保费飙升至正常时期数十倍，超过半数的油轮避开海峡运输路线。",
      verification: "confirmed",
      timestamp: "2026-09-16T11:00:00Z",
      significance: "原油供应链受到物理性质的持续限制，利好油价高位运行"
    }
  ],
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "对峙频发",
      tagColor: "red",
      points: [
        "变化：美海军在霍尔木兹海峡实施多次战术警告对峙。",
        "延续：地面与防空战线部署依然处于满载荷战备状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "严重受阻",
      tagColor: "orange",
      points: [
        "延续：海峡过境运力比正常水准暴跌超50%。",
        "延续：高额战争险和额外安全溢价全面压制正常商业航运。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "宽幅震荡",
      tagColor: "red",
      points: [
        "延续：原油价格主要运行在102-108美元区间高位震荡。",
        "延续：断供忧虑对溢价构成实质锁定效应。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谈判冻结",
      tagColor: "gray",
      points: [
        "延续：德黑兰和华盛顿官方均未流露让步诚意。",
        "延续：多边斡旋机制进展缓慢，降级路径暂未明朗。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗强硬捍卫其海峡控制权，对抗美国推动的单边航行制裁与海上威慑",
      "白宫面临高油价带来的国内通胀压力与坚定保卫中东盟友利益的两难权衡"
    ],
    military: [
      "战区海空极度狭窄空间内的军机、军舰与快艇近距离对抗，极易由于擦枪走火引爆局部海战",
      "美军区域威慑战略对上伊朗革命卫队高频狼群战术及不对称防御部署的结构性摩擦"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-16",
  version: "v2.192",
  riskScore: 82,
  prevRiskScore: 82,
  investmentSignal: "→ Maintain overweight in defensive commodities and energy sectors, while actively hedging risk assets.",
  keyChange: "Increased frequency of close-quarters maritime standoffs in the Strait of Hormuz, with primary crude futures remaining elevated above $100.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D200",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "WTI $102.85–$105.63 · Brent $106.64–$108.59",
      unit: "Ref.",
      color: "red",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Transit Status",
      color: "orange"
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "Middle East Crisis High-Level Standoff Platform",
    subTitle: "D200 Frequent Dual Military Standoffs, $100+ Oil Serves as Hard Market Floor",
    points: [
      "US-Iran maritime and aerial standoffs involve warning shots, keeping military tension peakish.",
      "Halved Strait capacity normalizes supply chain disruption fears, inflating freight and insurance premiums.",
      "Diplomatic channels remain mostly frozen with no concrete de-escalation path visible."
    ],
    note: "While a full-scale war is mutually undesirable, tactical miscalculation could trigger localized naval skirmishes immediately."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Active frontlines and naval standoffs remain intense with no cooling trends observed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial ships bypass the Strait, cutting transit capacity by over half and spiking insurance costs.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Both WTI and Brent remain within the $100-$120 crisis zone due to military premium and logistical friction.",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US maintains forward-deployed naval and air presence for deterrence, avoiding massive kinetic escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Diplomatic efforts are stalled, both sides refuse concessions on sanctions and transit rules.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-001",
      title: "US-Iran Naval Standoff in the Gulf",
      description: "The US Navy Fifth Fleet reported warning shots fired during a close-quarters intercept of multiple IRGC fast attack craft.",
      verification: "confirmed",
      timestamp: "2026-09-16T04:20:00Z",
      significance: "Amplifies tactical miscalculation risks at the operational level.",
      highlight: true,
      critical: true
    },
    {
      id: "ev-002",
      title: "Iranian MFA Reaffirms Unyielding Stance",
      description: "IRNA reported that the Iranian MFA stressed it will not yield to unilateral pressure, defending its regulatory rights in the Gulf.",
      verification: "confirmed",
      timestamp: "2026-09-16T08:15:00Z",
      significance: "Demonstrates political resolve to maintain blockade posture."
    },
    {
      id: "ev-003",
      title: "Strait Transit Deficit Continues",
      description: "Logistical data shows over half of normal tanker flow diverted around the Cape of Good Hope due to high risk premiums.",
      verification: "confirmed",
      timestamp: "2026-09-16T11:00:00Z",
      significance: "Locks in structural oil premium despite macro-demand headwinds."
    }
  ],
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Frequent Standoffs",
      tagColor: "red",
      points: [
        "Change: US Navy executes tactical warning intercepts in the Strait.",
        "Continue: Air defense and missile batteries remain at peak readiness."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Highly Disrupted",
      tagColor: "orange",
      points: [
        "Continue: Strait transit capacity remains slashed by over 50%.",
        "Continue: Extreme war risk insurance rates deter merchant vessels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "High Volatility",
      tagColor: "red",
      points: [
        "Continue: Oil prices fluctuate strongly within the $102–$108 range.",
        "Continue: Supply fears embed persistent risk premium into curves."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Talks Frozen",
      tagColor: "gray",
      points: [
        "Continue: Both Washington and Tehran display zero signs of compromise.",
        "Continue: International mediation struggles to establish a viable pathway."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran asserts sovereign control of regional lanes vs. US-led maritime coalitions challenging local restrictions.",
      "The US administration balances high-inflation domestic pressures with its security commitments."
    ],
    military: [
      "Close-quarters naval maneuvering risks triggering flashpoint skirmishes due to operational misstep.",
      "US deterrence posture clashes with Iranian asymmetric warfare doctrines and swarm operations."
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
    node406: "9月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.192 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美伊在霍尔木兹海峡海空对峙频次增加，原油主力合约继续维持在100美元以上的高位震荡状态。",
    bannerWarning: "→ 维持对防御性大宗及能源板块的增持，同时积极配置避险资产以对冲地缘风险。",
    deescalationIntent: "伊朗强硬捍卫其海峡控制权，对抗美国推动的单边航行制裁与海上威慑",
    structuralRisk: "主要商业航商绕道，通过运力缩水过半，高昂保费严重迟滞商业交通。",
    contradictionNote: "伊朗强硬捍卫其海峡控制权，对抗美国推动的单边航行制裁与海上威慑；战区海空极度狭窄空间内的军机、军舰与快艇近距离对抗，极易由于擦枪走火引爆局部海战",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第200天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.192 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Increased frequency of close-quarters maritime standoffs in the Strait of Hormuz, with primary crude futures remaining elevated above $100.",
    bannerWarning: "→ Maintain overweight in defensive commodities and energy sectors, while actively hedging risk assets.",
    deescalationIntent: "Iran asserts sovereign control of regional lanes vs. US-led maritime coalitions…",
    structuralRisk: "Commercial ships bypass the Strait, cutting transit capacity by over half and spiking insurance cos…",
    contradictionNote: "Iran asserts sovereign control of regional lanes vs. US-led maritime coalitions challenging local restrictions.; Close-quarters naval maneuvering risks trigger…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 200",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
