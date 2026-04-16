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
  date: "2026-04-16",
  version: "v2.34",
  riskScore: 72,
  change: "down",
  keyStats: [
    {
      label: "冲突天数",
      value: "D47",
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
      value: "WTI $88.5–$91.2 · Brent $92.3–$95.1 · 企稳回落",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "护航通行",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "直接交火烈度降低，转为代理人交火与局部定点打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军启动护航机制，抵消了部分航道骚扰风险，但保险成本依然极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价进入$85-$100高位区间，但因近期无新攻击而出现获利了结。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军增派空中打击大队，俄罗斯在叙利亚加强雷达部署，大国对峙强度未减。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道依然封闭，美伊高层持续隔空喊话，无实质接触。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军正式启动航道护航行动",
      description: "五角大楼宣布“繁荣卫士2.0”行动扩容至阿曼湾，派遣驱逐舰为商业油轮护航。 (DoD)",
      verification: "confirmed",
      timestamp: "2026-04-15 22:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗暂缓大规模军事报复",
      description: "IRNA引述军方消息称，近期军事行动已实现战略威慑，将进入防御观察期。 (IRNA/Reuters)",
      verification: "confirmed",
      timestamp: "2026-04-16 04:30",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "国际油价高位修正",
      description: "由于担忧的需求缺口未如期出现，Brent原油回撤至93美元附近。 (Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-04-16 08:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接战略打击进入间歇期",
      "海域控制权争夺成为核心矛盾",
      "双方均在进行长期对抗的资源动员"
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
        "变化：大规模导弹交换停止，转为边界零星打击。",
        "延续：防空系统在关键城市保持24小时最高戒备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军介入护航，航道极端封锁概率下降。",
        "延续：主要班轮公司维持绕行非洲好望角的备选方案。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场消化地缘溢价，价格进入盘整区间。",
        "延续：OPEC+尚未表态增加供应，供应端依然偏紧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申对盟友的防御承诺。",
        "变化：德黑兰暗示目前无意触发全面区域战争。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊缺乏基本政治互信导致的外交真空",
      "国内政治压力迫使双方无法在核心利益上让步"
    ],
    military: [
      "护航行动与海域主权认知的武力摩擦风险",
      "代理人武装不可控行为可能引发的意外升级"
    ]
  },
  scoreTrend: [
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突烈度从爆发态势转为高压持平，军事焦点移向海上护航博弈。",
  investmentSignal: "→ 维持能源对冲仓位，防御性增持黄金，风险资产需警惕流动性波动。",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-16",
  version: "v2.34",
  riskScore: 72,
  change: "down",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D47",
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
      value: "WTI $88.5–$91.2 · Brent $92.3–$95.1 · 企稳回落",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Escorted Passage",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Shift from direct state-on-state strikes to proxy activity and localized hits.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "U.S. escort mechanism offsets some harassment risk, though insurance premiums remain high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices stabilized in the $85-$100 range due to lack of new kinetic infrastructure attacks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. directly deploying naval assets for escort; high military presence sustained.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels remain frozen; Switzerland reports no progress in mediating.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "U.S. Launches Naval Escort Operation",
      description: "Pentagon officially deploys destroyers for commercial tanker protection in Gulf of Oman. (DoD)",
      verification: "confirmed",
      timestamp: "2026-04-15 22:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Signals Lull in Mass Retaliation",
      description: "State media (IRNA) suggests current operations achieved strategic goals; enters observation phase. (IRNA/Reuters)",
      verification: "confirmed",
      timestamp: "2026-04-16 04:30",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Undergo Correction",
      description: "Market digests geopolitical premiums as expected massive supply disruptions haven't materialized. (Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-04-16 08:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Pause in direct strategic exchanges",
      "Conflict centering on maritime control",
      "Sustained mobilization for long-term friction"
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
        "Change: Mass missile exchanges halted; conflict shifted to localized skirmishes.",
        "Continue: Air defenses remain at maximum readiness in major hubs."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US intervention reduces risk of total blockade.",
        "Continue: Top shipping lines maintain rerouting via the Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk premium cooling as market prices in a 'controlled conflict' scenario.",
        "Continue: Supply remains tight as OPEC+ holds on production increases."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates ironclad commitment to allies.",
        "Change: Tehran signals no intent for immediate total regional war."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Diplomatic vacuum caused by total lack of trust.",
      "Domestic pressures preventing concessions on both sides."
    ],
    military: [
      "Risk of friction between US escorts and IRGC naval patrols.",
      "Uncontrolled proxy escalation remains the primary flashpoint."
    ]
  },
  scoreTrend: [
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72,
      active: true
    }
  ],
  keyChange: "Military intensity moved from outburst to a high-pressure plateau, with maritime escort becoming the new friction point.",
  investmentSignal: "→ Maintain energy hedges, defensive positioning in Gold, caution on risk assets due to liquidity swings.",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.34 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓4）：冲突烈度从爆发态势转为高压持平，军事焦点移向海上护航博弈。",
    bannerWarning: "→ 维持能源对冲仓位，防御性增持黄金，风险资产需警惕流动性波动。",
    deescalationIntent: "美伊缺乏基本政治互信导致的外交真空",
    structuralRisk: "美军启动护航机制，抵消了部分航道骚扰风险，但保险成本依然极高。",
    contradictionNote: "美伊缺乏基本政治互信导致的外交真空；护航行动与海域主权认知的武力摩擦风险",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第47天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.34 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓4): Military intensity moved from outburst to a high-pressure plateau, with maritime escort becoming the new friction point.",
    bannerWarning: "→ Maintain energy hedges, defensive positioning in Gold, caution on risk assets due to liquidity swings.",
    deescalationIntent: "Diplomatic vacuum caused by total lack of trust.",
    structuralRisk: "U.S. escort mechanism offsets some harassment risk, though insurance premiums remain high.",
    contradictionNote: "Diplomatic vacuum caused by total lack of trust.; Risk of friction between US escorts and IRGC naval patrols.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 47",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
