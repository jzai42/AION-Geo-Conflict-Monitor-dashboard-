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
  date: "2026-08-07",
  version: "v2.149",
  riskScore: 72,
  prevRiskScore: 72,
  investmentSignal: "→ 维持能源资产对冲，减持风险资产，防御性配置公用事业板块。",
  keyChange: "美军航母就位，伊朗开启演习，局势呈高位黏滞态势。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D160",
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
      value: "WTI $76.20–$78.50 · Brent $79.10–$81.40",
      unit: "参考",
      color: "yellow",
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
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "战略威慑相持期",
    subTitle: "多维部署完成，进入持久对峙阶段",
    points: [
      "美军战略资产完成战区前沿化部署",
      "伊朗演习验证区域拒止能力",
      "第三方斡旋尚未触及核心安全矛盾"
    ],
    note: "目前处于高压下的平衡状态，任何战术误判均可能导致指数级升级。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊军事资产高度聚集，虽无直接交火但战备状态处于高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗演习干扰正常航道，商船通行量维持在极低水位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价维持在$75-85区间，市场对现货供应中断持观望态度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国持续增强在欧亚连接处的军事存在，直接参与区域防御。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道虽然名义上保留，但双方关键利益分歧仍无法弥合。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "e2026080701",
      title: "美军林肯号航母抵达打击位",
      description: "美国海军CVN-72打击群正式接替布什号在阿曼湾的警戒任务，强化制空权。",
      verification: "confirmed",
      timestamp: "2026-08-07T04:30:00Z",
      significance: "显著增强美方第一波次打击与防御韧性。",
      highlight: true,
      critical: true
    },
    {
      id: "e2026080702",
      title: "伊朗伊斯兰革命卫队年度演习",
      description: "演习模拟封锁海峡场景，展示了多枚反舰巡航导弹及蜂群无人机打击方案。",
      verification: "confirmed",
      timestamp: "2026-08-07T08:15:00Z",
      significance: "对区域航运构成心理与实际威胁。"
    }
  ],
  scoreTrend: [
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "警戒",
      tagColor: "red",
      points: [
        "延续：美航母战斗群区域巡航常态化",
        "变化：伊朗无人机对美军舰船进行了近距离监视，未发生冲突"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "半封锁",
      tagColor: "orange",
      points: [
        "延续：主要商业保险机构将该区域列为一级战争险区",
        "变化：演习导致部分液化天然气(LNG)船只临时改道"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "震荡",
      tagColor: "yellow",
      points: [
        "延续：全球原油库存充裕暂时抵消了部分地缘溢价",
        "变化：炼油利润率受海运费上涨挤压，部分亚洲需求放缓"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "冷淡",
      tagColor: "gray",
      points: [
        "延续：华盛顿维持制裁压力，未见实质松动",
        "变化：伊方在联大预备会议期间拒绝与美方特使非正式会面"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方撤回在代理人冲突中的支持 vs 伊方视其为生存核心保障",
      "美伊缺乏双边信任基础，外交斡旋难以建立长效机制"
    ],
    military: [
      "霍尔木兹海峡主权声索与公海通行自由的根本矛盾",
      "区域内不对称作战资产与传统航母编队的相互威慑"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-07",
  version: "v2.149",
  riskScore: 72,
  prevRiskScore: 72,
  investmentSignal: "→ Maintain energy hedges, reduce risk assets, defensive allocation in utilities.",
  keyChange: "US Carrier in position, Iranian exercises initiated, situation remains stagnant at high risk.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D160",
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
      value: "WTI $76.20–$78.50 · Brent $79.10–$81.40",
      unit: "Ref.",
      color: "yellow",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "orange"
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "Strategic Deterrence Equilibrium",
    subTitle: "Deployment completed, entering a prolonged standoff phase",
    points: [
      "US strategic assets fully deployed in forward positions",
      "Iran validates A2/AD capabilities through drills",
      "Third-party mediation fails to bridge core security gaps"
    ],
    note: "Current stability is fragile; any tactical miscalculation could trigger escalation."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High concentration of assets; combat readiness at peak levels despite no direct fire.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Naval drills interfere with primary shipping lanes; commercial traffic remains low.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices stable within $75-85 range as market observes actual supply risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US continues to bolster regional military presence and defense alliances.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels exist but core interests remain irreconcilable.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "e2026080701",
      title: "USS Lincoln CSG Arrives in Station",
      description: "CVN-72 Strike Group officially replaced USS Bush in the Gulf of Oman, enhancing air superiority.",
      verification: "confirmed",
      timestamp: "2026-08-07T04:30:00Z",
      significance: "Significantly bolsters US offensive and defensive resilience.",
      highlight: true,
      critical: true
    },
    {
      id: "e2026080702",
      title: "IRGC Annual Naval Exercise",
      description: "Drills simulated strait blockade, showcasing anti-ship missiles and drone swarms.",
      verification: "confirmed",
      timestamp: "2026-08-07T08:15:00Z",
      significance: "Poses physical and psychological threat to regional shipping."
    }
  ],
  scoreTrend: [
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Alert",
      tagColor: "red",
      points: [
        "Continue: US CSG patrols remain normalized",
        "Change: IRGC drones conducted close surveillance of US vessels, no engagement"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Partial Blockade",
      tagColor: "orange",
      points: [
        "Continue: Region remains listed as war-risk zone by major insurers",
        "Change: Exercises forced temporary rerouting of several LNG tankers"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Volatile",
      tagColor: "yellow",
      points: [
        "Continue: Global crude inventories offset some geopolitical premium",
        "Change: Refiner margins squeezed by rising freight costs"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Cold",
      tagColor: "gray",
      points: [
        "Continue: Washington maintains sanction pressure",
        "Change: Tehran refused informal meeting with US envoy at UN prep meeting"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demands cessation of proxy support vs Iran viewing it as existential",
      "Lack of bilateral trust inhibits durable diplomatic breakthroughs"
    ],
    military: [
      "Sovereignty claims in Hormuz vs freedom of navigation norms",
      "Asymmetric IRGC assets vs conventional US naval carrier doctrine"
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
    node406: "8月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.149 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：美军航母就位，伊朗开启演习，局势呈高位黏滞态势。",
    bannerWarning: "→ 维持能源资产对冲，减持风险资产，防御性配置公用事业板块。",
    deescalationIntent: "美方要求伊方撤回在代理人冲突中的支持 vs 伊方视其为生存核心保障",
    structuralRisk: "伊朗演习干扰正常航道，商船通行量维持在极低水位。",
    contradictionNote: "美方要求伊方撤回在代理人冲突中的支持 vs 伊方视其为生存核心保障；霍尔木兹海峡主权声索与公海通行自由的根本矛盾",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第160天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.149 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): US Carrier in position, Iranian exercises initiated, situation remains stagnant at high risk.",
    bannerWarning: "→ Maintain energy hedges, reduce risk assets, defensive allocation in utilities.",
    deescalationIntent: "US demands cessation of proxy support vs Iran viewing it as existential",
    structuralRisk: "Naval drills interfere with primary shipping lanes; commercial traffic remains low.",
    contradictionNote: "US demands cessation of proxy support vs Iran viewing it as existential; Sovereignty claims in Hormuz vs freedom of navigation norms",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 160",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
