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
  date: "2026-10-18",
  version: "v2.226",
  keyStats: [
    {
      label: "冲突天数",
      value: "D232",
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
      value: "WTI $95.29–$99.34 · Brent $104.92–$110.00",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全封锁",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 86,
  scoreTrend: [
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86,
      active: true
    }
  ],
  keyChange: "霍尔木兹海峡商船遇袭创单周新高，伊朗提出附带条件的七日停火提议。",
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军及以色列持续空袭伊朗及代理人目标，伊朗强硬派威胁对美驻军及阿联酋发动反击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡商业航运持续阻断，遇袭船只数量创下单周新高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "国际油价稳居高位，布伦特原油区间落入 $100-120 危机带，市场持续计价海峡封锁风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国宣称达成阶段性军事目标，美军在海峡内实施直接的海上封锁突围与护航行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "伊朗提出附带条件的休战要约，但美方未予理睬，官方沟通渠道仍处于冻结状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "延续：美军持续推进摧毁伊朗核心军事资产的战术行动，伊朗则死守海峡封锁进行非对称消耗。",
      "变化：伊朗首度抛出带有倒计时的谈判解封条件，但被其内部对阿联酋的打击威胁所稀释。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "伊朗提出七日停火及解封条件",
      description: "伊朗外长表示若美国解除海上封锁，霍尔木兹海峡可在6日内重开，双方可在第7日启动谈判。 (CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-18T07:06:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "海峡商船遇袭创单周新高",
      description: "UKMTO报告上周有超10艘货船在霍尔木兹海峡遇袭，2艘沉没，美军启动暗船护航计划突破封锁。 (CNN Business)",
      verification: "confirmed",
      timestamp: "2026-10-17T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "伊朗防长威胁扩大反击",
      description: "伊朗新任防长警告美国尽快撤军，议员公开呼吁对阿联酋实施大规模军事打击以打破封锁。 (Al Jazeera)",
      verification: "partial",
      timestamp: "2026-10-18T13:36:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美总统宣示摧毁伊朗关键能力",
      description: "美国总统确认美军已摧毁伊朗海军及核心军工厂，但美军将在中东保持长期驻军防其重建。 (CNN-News18)",
      verification: "confirmed",
      timestamp: "2026-10-17T19:00:00Z",
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
        "变化：美军及以色列持续空袭伊朗及代理人目标，伊朗强硬派威胁对美驻军及阿联酋发动反击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡商业航运持续阻断，遇袭船只数量创下单周新高。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：国际油价稳居高位，布伦特原油区间落入 $100-120 危机带，市场持续计价海峡封锁风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国宣称达成阶段性军事目标，美军在海峡内实施直接的海上封锁突围与护航行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过压倒性军事打击迫使伊朗无条件让步，而伊朗则利用海峡生命线要挟全球经济。"
    ],
    military: [
      "美军的防区外精确打击与暗船护航行动，遭遇伊朗高频度的非对称水雷与无人机袭扰。"
    ]
  },
  investmentSignal: "→ 维持防御性资产配置，继续超配原油等能源大宗商品多头，对冲中东海峡长期封锁带来的结构性通胀风险。",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-18",
  version: "v2.226",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D232",
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
      value: "WTI $95.29–$99.34 · Brent $104.92–$110.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Total Blockade",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 86,
  scoreTrend: [
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86,
      active: true
    }
  ],
  keyChange: "Record weekly high of vessel attacks in Hormuz; Iran proposes conditional 7-day ceasefire.",
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and Israeli forces continue airstrikes on Iranian and proxy targets; Iranian hardliners threaten retaliatory strikes on US troops and the UAE.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial shipping in the Strait of Hormuz remains completely blocked, with vessel attacks hitting a record weekly high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global oil prices remain highly elevated, with Brent squarely in the $100-120 crisis band as markets continuously price in the Hormuz blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US confirms achieving phased military objectives while engaging in direct maritime blockades and escort operations in the Strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Iran issues a conditional truce offer, but the US remains unyielding, leaving official diplomatic channels entirely frozen.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Continue: US forces advance tactical operations to destroy Iran's core military assets, while Iran relies on asymmetric chokepoint blockades.",
      "Change: Iran introduces a conditional countdown for unblocking the Strait, though its credibility is diluted by simultaneous threats to strike the UAE."
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "Iran Proposes Conditional 7-Day Ceasefire",
      description: "Iran's FM stated the Strait of Hormuz could reopen within 6 days and talks begin on the 7th if the US lifts its maritime blockade. (CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-18T07:06:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Strait Vessel Attacks Hit Weekly High",
      description: "UKMTO reported over 10 merchant ships attacked in the Strait last week, with 2 sinking, prompting US 'dark' escorts. (CNN Business)",
      verification: "confirmed",
      timestamp: "2026-10-17T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Iran's Defense Minister Threatens Broader Response",
      description: "Iran's new defense chief warned the US to withdraw promptly, as lawmakers publicly urge massive strikes against the UAE to break the blockade. (Al Jazeera)",
      verification: "partial",
      timestamp: "2026-10-18T13:36:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "US President Claims Core Iranian Capabilities Destroyed",
      description: "The US President confirmed the destruction of Iran's navy and core military factories, affirming a prolonged US troop presence in the region. (CNN-News18)",
      verification: "confirmed",
      timestamp: "2026-10-17T19:00:00Z",
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
        "Change: US and Israeli forces continue airstrikes on Iranian and proxy targets; Iranian hardliners threaten retaliatory strikes on US troops and the UAE."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping in the Strait of Hormuz remains completely blocked, with vessel attacks hitting a record weekly high."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Global oil prices remain highly elevated, with Brent squarely in the $100-120 crisis band as markets continuously price in the Hormuz blockade."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US confirms achieving phased military objectives while engaging in direct maritime blockades and escort operations in the Strait."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US attempts to force unconditional Iranian concessions via overwhelming military strikes, while Iran holds the global economy hostage through the Strait's chokepoint."
    ],
    military: [
      "US stand-off precision strikes and 'dark' naval escorts face high-frequency asymmetric harassment by Iranian mines and drones."
    ]
  },
  investmentSignal: "→ Maintain defensive asset allocations and continue to overweight crude oil and energy commodities to hedge against structural inflation risks from the prolonged chokepoint blockade.",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.226 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 86（持平）：霍尔木兹海峡商船遇袭创单周新高，伊朗提出附带条件的七日停火提议。",
    bannerWarning: "→ 维持防御性资产配置，继续超配原油等能源大宗商品多头，对冲中东海峡长期封锁带来的结构性通胀风险。",
    deescalationIntent: "美国试图通过压倒性军事打击迫使伊朗无条件让步，而伊朗则利用海峡生命线要挟全球经济。",
    structuralRisk: "霍尔木兹海峡商业航运持续阻断，遇袭船只数量创下单周新高。",
    contradictionNote: "美国试图通过压倒性军事打击迫使伊朗无条件让步，而伊朗则利用海峡生命线要挟全球经济。；美军的防区外精确打击与暗船护航行动，遭遇伊朗高频度的非对称水雷与无人机袭扰。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第232天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.226 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 86 (Flat): Record weekly high of vessel attacks in Hormuz; Iran proposes conditional 7-day ceasefire.",
    bannerWarning: "→ Maintain defensive asset allocations and continue to overweight crude oil and energy commodities to hedge against str…",
    deescalationIntent: "The US attempts to force unconditional Iranian concessions via overwhelming mil…",
    structuralRisk: "Commercial shipping in the Strait of Hormuz remains completely blocked, with vessel attacks hitting…",
    contradictionNote: "The US attempts to force unconditional Iranian concessions via overwhelming military strikes, while Iran holds the global economy hostage through the Strait's …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 232",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
