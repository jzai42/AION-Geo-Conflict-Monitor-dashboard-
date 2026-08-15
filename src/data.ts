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
  date: "2026-08-15",
  version: "v2.158",
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军增派隐身战机且伊朗部署反舰系统，双方在一线接触区的战备水平显著提高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道出现实质性干扰，船舶通行面临伊方物理性搜检，航道流量受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油价格重回高位区间，市场正在定价航道封锁可能带来的供应中断风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接军事部署力度加大，该区域已成为大国博弈的直接前线。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "双方立场极度僵硬，短期内无任何实质性停火或缓和接触迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D168",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $88–$90 · Brent $92–$94",
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
  events: [
    {
      id: "EVT-01",
      title: "美军增派F-22至中东",
      description: "旨在强化对伊朗可能的军事报复威慑，美军在中东的空优配置达到近半年最高水平。",
      verification: "confirmed",
      timestamp: "2026-08-15 02:40",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗实施航道“搜检”",
      description: "伊斯兰革命卫队在霍尔木兹海域临时扣留商船进行检查，导致航行延误与溢价。",
      verification: "confirmed",
      timestamp: "2026-08-15 05:15",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "从零星代理冲突转为主权国家层面的战术威慑对峙",
      "霍尔木兹海峡的控制权博弈从口头演变为低烈度物理干预",
      "全球能源市场重回“冲突定价”模式"
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
        "变化：美军F-22机群抵达，针对伊朗沿岸目标的监控力度升级。",
        "变化：伊朗在南部分部前移了其自主研制的“努尔”反舰导弹系统。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：搜检频率增加。Lloyd's List报告称过去24小时内有3起非正常干扰事件。",
        "延续：主要航商（Maersk/MSC）维持避险航线建议。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油突破92美元阻力位，短期看涨期权持仓量大幅增加。",
        "延续：美国战略石油储备（SPR）补充计划因价格过高面临暂缓。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗总统发表公开讲话称“主权完整不容侵犯”，暗示报复行动仍在计划中。",
        "延续：美国国务院维持对伊朗外交接触的暂停状态。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国必须维护海峡通行自由以保护盟友利益",
      "伊朗将封锁航道视为反制制裁与军事压力的最终筹码"
    ],
    military: [
      "低烈度摩擦与全面误判导致战争的风险并存",
      "防区外打击能力与近岸饱和攻击手段的相互制衡"
    ]
  },
  scoreTrend: [
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74
    },
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76,
      active: true
    }
  ],
  keyChange: "美军大规模增兵与伊朗实质性干扰海峡通行引发的风险共振。",
  investmentSignal: "→ 增持能源对冲与大宗商品防御头寸，对跨区域风险资产进行减持处理。",
  change: "up",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-15",
  version: "v2.158",
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US deployment of F-22s and Iran's missile movement signify high tactical readiness.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Substantial interference in the strait with IRGC implementing physical inspections.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices are re-pricing supply disruption risks amid strait tensions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US military deployment levels have moved beyond routine presence to direct deterrence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Communication channels are virtually paralyzed with no signals of de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D168",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $88–$90 · Brent $92–$94",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Deploys F-22s to Middle East",
      description: "Deployment aimed at deterring potential Iranian retaliation, reaching highest air superiority levels in months.",
      verification: "confirmed",
      timestamp: "2026-08-15 02:40",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Conducts Strait Inspections",
      description: "IRGC Navy briefly detained commercial vessels for inspection, causing transit delays.",
      verification: "confirmed",
      timestamp: "2026-08-15 05:15",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Transition from proxy harassment to state-level tactical deterrence",
      "Strait control shifting from rhetoric to low-intensity physical intervention",
      "Global energy markets return to 'conflict pricing' mode"
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
        "Change: US F-22 squadrons arrived, intensifying surveillance over Iranian coastal targets.",
        "Change: Iran forward-deployed Noor anti-ship missile systems in its southern districts."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Inspection frequency increased; Lloyd's List reports 3 interference incidents in 24h.",
        "Continue: Major liners (Maersk/MSC) maintain rerouting advisories."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent broke $92 resistance; call option volumes surged for short-term hedges.",
        "Continue: US SPR replenishment plans paused due to high market prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian President stated 'sovereignty is non-negotiable,' hinting at planned retaliation.",
        "Continue: US State Department maintains suspension of diplomatic outreach to Tehran."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US must ensure freedom of navigation to protect ally interests",
      "Iran views strait control as its ultimate leverage against sanctions"
    ],
    military: [
      "Risk of war from low-intensity friction and total miscalculation",
      "Balancing standoff strike capabilities with near-shore saturation tactics"
    ]
  },
  scoreTrend: [
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74
    },
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76,
      active: true
    }
  ],
  keyChange: "Resonance of risk from US troop surge and Iran's physical interference with strait transit.",
  investmentSignal: "→ Increase energy hedges and commodity defensive positions; reduce exposure to cross-regional risk assets.",
  change: "up",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.158 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑2）：美军大规模增兵与伊朗实质性干扰海峡通行引发的风险共振。",
    bannerWarning: "→ 增持能源对冲与大宗商品防御头寸，对跨区域风险资产进行减持处理。",
    deescalationIntent: "美国必须维护海峡通行自由以保护盟友利益",
    structuralRisk: "航道出现实质性干扰，船舶通行面临伊方物理性搜检，航道流量受限。",
    contradictionNote: "美国必须维护海峡通行自由以保护盟友利益；低烈度摩擦与全面误判导致战争的风险并存",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第168天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.158 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑2): Resonance of risk from US troop surge and Iran's physical interference with strait transit.",
    bannerWarning: "→ Increase energy hedges and commodity defensive positions; reduce exposure to cross-regional risk assets.",
    deescalationIntent: "US must ensure freedom of navigation to protect ally interests",
    structuralRisk: "Substantial interference in the strait with IRGC implementing physical inspections.",
    contradictionNote: "US must ensure freedom of navigation to protect ally interests; Risk of war from low-intensity friction and total miscalculation",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 168",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
