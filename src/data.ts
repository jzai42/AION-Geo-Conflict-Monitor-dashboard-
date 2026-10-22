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
  date: "2026-10-22",
  version: "v2.229",
  riskScore: 80,
  keyStats: [
    {
      label: "冲突天数",
      value: "D236",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $97.72–$100.09 · Brent $109.73–$112.60",
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
      description: "多战线交火与打击持续，沙特阿美油田遭无人机袭击外溢加剧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡通航近乎完全瘫痪，夜间多达7艘油轮连续遭水雷及弹药打击受损。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "原油价格处于$100–120危机带，断供恐慌持续推升风险溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美军航母作战群前沿部署并执行封锁与护航，多国军事部署深度交织。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "谈判渠道严重停滞，双方立足极高要价拒绝单方面妥协。",
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
        "变化：沙特阿美谢拜油田设施遭自杀式无人机突袭引发火警，区域防御战线外溢。",
        "延续：美伊海军与防空力量在海湾出入口维持持续接触与战术警戒。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：单日7艘油轮在霍尔木兹水域遭水雷与打击受损，为冲突爆发以来单日新高。",
        "延续：商业船东绕道非洲好望角，航运保险与战争险费率维持历史极值。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油升至$112上方，WTI盘中突破$100大关，危机溢价快速走高。",
        "延续：欧美原油与柴油成品油库存维持深度去化态势，供应弹性极低。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方维持对伊强硬封锁部署，伊朗高层表态将以持久承受力应对封锁。",
        "延续：第三方斡旋框架因双方互相附加苛刻前提而陷入阶段性僵局。"
      ]
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海上封锁与袭船战术升级为实质性商业航道阻断，对全球能源生命线形成高强度施压。",
      "战事向周边主权产油国地面能源设施外溢，战术降级窗口被进一步压缩。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊方全面恢复海峡通航并限制浓缩铀外运，伊朗坚持美方先撤销全部单边封锁与制裁。"
    ],
    military: [
      "美军护航防空部署与伊方非对称水雷/无人机饱和袭船手段之间的反介入消耗战持续。"
    ]
  },
  scoreTrend: [
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80,
      active: true
    }
  ],
  keyChange: "霍尔木兹海峡7艘油轮受损并叠加沙特油田遭无人机袭击，油价上探危机带，局势高位黏滞；综合风险分落盘 80（较昨日 -6）；调整前模型分 86（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品与能源多头对冲部位，防御性增持流动性现金与硬资产，减持高贝塔风险资产。",
  change: "none",
  prevRiskScore: 86,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "多战线交火与打击持续，沙特阿美油田遭无人机袭击外溢加剧",
      description: "多战线交火与打击持续，沙特阿美油田遭无人机袭击外溢加剧。",
      verification: "single",
      timestamp: "2026-10-22（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "海峡通航近乎完全瘫痪，夜间多达7艘油轮连续遭水雷及弹药打击受损",
      description: "海峡通航近乎完全瘫痪，夜间多达7艘油轮连续遭水雷及弹药打击受损。",
      verification: "single",
      timestamp: "2026-10-22（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-22",
  version: "v2.229",
  riskScore: 80,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D236",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $97.72–$100.09 · Brent $109.73–$112.60",
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
      description: "Multi-front strikes and combat operations persist, with drone strikes on Saudi Aramco facilities widening the conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait passage remains essentially blocked as 7 tankers were damaged overnight by naval mines and projectiles.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Crude trades inside the $100–120 crisis band as supply disruption risk premiums expand.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Direct US military deployments, including carrier strike groups and naval blockade enforcement, remain active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Negotiation channels are stalled with rigid preconditions preventing near-term compromises.",
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
        "Change: Saudi Aramco's Shaybah oilfield was hit by loitering drones, causing localized damage and casualties.",
        "Continue: US and Iranian forces maintain active tactical surveillance and air-defense readiness across the Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Seven tankers were damaged overnight in the Strait of Hormuz, marking one of the heaviest single-day tolls.",
        "Continue: Major container and tanker fleets continue full rerouting via the Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude tested above $112 per barrel with WTI crossing the $100 psychological threshold.",
        "Continue: Severe global product and crude inventory drawdowns leave negligible buffer against supply shocks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington maintains strict enforcement of maritime blockades while Tehran signals willingness to endure a prolonged standoff.",
        "Continue: Mediation frameworks mediated by Qatar and Pakistan remain deadlocked over prerequisite terms."
      ]
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The maritime choke point confrontation has shifted into widespread tanker attrition, directly suffocating regional crude flows.",
      "Attacks targeting upstream infrastructure in neighboring Gulf states further narrow the window for diplomatic de-escalation."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Washington demands the unconditional reopening of the Strait of Hormuz, while Tehran refuses until all sanctions and blockades are lifted."
    ],
    military: [
      "US carrier-led naval escort operations clash with Iran's asymmetric mine-laying and uncrewed aerial strike architecture."
    ]
  },
  scoreTrend: [
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80,
      active: true
    }
  ],
  keyChange: "Overnight attacks damaging seven tankers in Hormuz alongside strikes on Saudi oil assets locked crude firmly in the crisis band, anchoring risk at high levels; composite risk score prints at 80 (vs prior day -6); pre-adjustment model score 86 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain energy and commodity hedges, defensively increase cash and hard-asset allocations, and trim risk assets.",
  change: "none",
  prevRiskScore: 86,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Multi-front strikes and combat operations persist, with drone strikes on Saudi Aramco facilitie…",
      description: "Multi-front strikes and combat operations persist, with drone strikes on Saudi Aramco facilities widening the conflict.",
      verification: "single",
      timestamp: "2026-10-22 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Strait passage remains essentially blocked as 7 tankers were damaged overnight by naval mines a…",
      description: "Strait passage remains essentially blocked as 7 tankers were damaged overnight by naval mines and projectiles.",
      verification: "single",
      timestamp: "2026-10-22 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.229 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓6）：霍尔木兹海峡7艘油轮受损并叠加沙特油田遭无人机袭击，油价上探危机带，局势高位黏滞；综合风险分落盘 80（较昨日 -6）；调整前模型分 86（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品与能源多头对冲部位，防御性增持流动性现金与硬资产，减持高贝塔风险资产。",
    deescalationIntent: "美方要求伊方全面恢复海峡通航并限制浓缩铀外运，伊朗坚持美方先撤销全部单边封锁与制裁。",
    structuralRisk: "海峡通航近乎完全瘫痪，夜间多达7艘油轮连续遭水雷及弹药打击受损。",
    contradictionNote: "美方要求伊方全面恢复海峡通航并限制浓缩铀外运，伊朗坚持美方先撤销全部单边封锁与制裁。；美军护航防空部署与伊方非对称水雷/无人机饱和袭船手段之间的反介入消耗战持续。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第236天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.229 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓6): Overnight attacks damaging seven tankers in Hormuz alongside strikes on Saudi oil assets locked crude firmly in the crisis band, anchoring …",
    bannerWarning: "→ Maintain energy and commodity hedges, defensively increase cash and hard-asset allocations, and trim risk assets.",
    deescalationIntent: "Washington demands the unconditional reopening of the Strait of Hormuz, while T…",
    structuralRisk: "Strait passage remains essentially blocked as 7 tankers were damaged overnight by naval mines and p…",
    contradictionNote: "Washington demands the unconditional reopening of the Strait of Hormuz, while Tehran refuses until all sanctions and blockades are lifted.; US carrier-led nava…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 236",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
