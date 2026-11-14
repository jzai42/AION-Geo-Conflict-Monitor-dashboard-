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
  date: "2026-11-14",
  version: "v2.253",
  riskScore: 68,
  change: "none",
  keyChange: "美伊海湾无人机对抗与霍尔木兹海峡水雷扰动持续，中东地缘溢价支撑油价于高位区间盘整，冲突维持高压对峙格局。",
  investmentSignal: "→ 维持能源与大宗商品结构性防御敞口，保持中性风险资产配置以对冲中东地缘尾部风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D259",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
      description: "依据美军中央司令部与美联社报道，美伊在海湾发生针对巴林雷达与无人机拦截的直接交火，但战线维持在受控范畴。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "依据彭博社与ISW评估，海峡南部持续面临水雷与扣押威胁，商业油轮流量仍不足常规50%，航道严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "依据Barchart与FXEmpire监测，WTI运行于$87.80–$89.64、Brent运行于$95.07–$97.12，高位盘整兼具$75–85与$85–100两档特征，取保守折中2.5档（https://www.fxempire.com/forecasts/article/oil-prices-face-mixed-signals-as-u-s-distillate-stocks-fall-1644183/）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "依据路透社与彭博社报道，美军在中东维持海空拦截与基地防御部署，区域盟友深度共享情报，但未演变为大国直接作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "依据华尔街日报与彭博社报道，第三方调解斡旋持续但华盛顿与德黑兰均坚持强硬底线，谈判停滞且缺乏实质接触。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军在巴林空域拦截伊朗无人机",
      description: "美军中央司令部通报击落2架飞向驻巴林设施的伊朗攻击型无人机，伊朗革命卫队宣称袭击美军雷达阵地。",
      verification: "confirmed",
      timestamp: "2026-11-14T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹南部航道持续受水雷威胁",
      description: "外籍油轮在海峡南部通道遭遇水雷险情，商业船东避险情绪浓厚，通行量仍处于受限状态。",
      verification: "confirmed",
      timestamp: "2026-11-14T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美方暂缓扩大打击但维持经济制裁封锁",
      description: "美高层重申无意扩大直接军事冲突，但强调将执行严格的航运封锁与制裁，第三方外交斡旋尚未取得进展。",
      verification: "confirmed",
      timestamp: "2026-11-14T13:45:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际基准油价高位区间盘整",
      description: "受中东供应风险与IEA过剩预期拉锯影响，WTI维持在$88左右，Brent于$95-$97区间高位震荡。",
      verification: "confirmed",
      timestamp: "2026-11-14T15:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊交火形式聚焦于无人机拦截与雷达对抗，双方刻意避免触发全面战端。",
      "霍尔木兹海峡保持严重受限态势，航运风险溢价深度嵌入能源大宗成本。"
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
        "延续：美伊维持海湾外围有限防空与无人机战术交火，未见大规模空袭行动扩大。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡南部水雷与骚扰威胁持续存在，商业油轮整体通行量依然低于常态50%。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：原油期货在$87–$97区间呈紧平衡盘整，宏观需求忧虑与航运溢价相互抵消。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方排斥激化交火但坚持封锁，伊朗拒绝无条件妥协，第三方穿梭斡旋缺乏抓手。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国政府试图在不陷入全面陆空战事的前提下维持全面经济窒息，而伊朗将封锁航道视为不可放弃的威慑底牌。"
    ],
    military: [
      "低烈度无人机与水雷消耗战持续降低直接冲突门槛，但任何针对关键雷达或海军资产的误击均可能引发升级链条。"
    ]
  },
  scoreTrend: [
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68,
      active: true
    }
  ],
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-14",
  version: "v2.253",
  riskScore: 68,
  change: "none",
  keyChange: "US-Iran drone-radar skirmishes and naval mine disruptions in the Strait of Hormuz persist, keeping crude oil in a consolidated high-price range under high-pressure standoff conditions.",
  investmentSignal: "→ Maintain defensive exposure in energy and commodities while keeping risk assets neutral to hedge Middle East geopolitical tail risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D259",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
      description: "According to US CENTCOM and AP reports, direct tactical engagements occurred involving US drone intercepts and Iranian strikes on radar positions in Bahrain, though kept within bounded parameters.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Bloomberg and ISW report lingering naval mine threats in southern channels, holding commercial tanker throughput below 50% of pre-war volume.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "According to Barchart and FXEmpire, WTI traded in $87.80–$89.64 and Brent in $95.07–$97.12, consolidating between the $75–85 and $85–100 rubric bands, maintaining a balanced 2.5 score (https://www.fxempire.com/forecasts/article/oil-prices-face-mixed-signals-as-u-s-distillate-stocks-fall-1644183/).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Reuters and Bloomberg confirm US air-defense deployments and naval escorts continue with regional intelligence sharing, short of broader coalition combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WSJ and Bloomberg note external mediation attempts via Qatar remain stalled due to irreconcilable baseline demands on sanctions and maritime guarantees.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Forces Intercept Iranian Drones Over Bahrain Airspace",
      description: "US Central Command downed two Iranian attack drones targeting Bahrain naval installations, while the IRGC claimed impacts on regional early-warning radar arrays.",
      verification: "confirmed",
      timestamp: "2026-11-14T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Naval Mine Incidents Disrupt Southern Hormuz Channel",
      description: "Commercial tankers report persistent mine contamination along the southern shipping corridor, deterring international carriers from restoring regular passage.",
      verification: "confirmed",
      timestamp: "2026-11-14T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US Administration Signals Hesitation on Further Strikes",
      description: "Senior US officials indicated no immediate appetite for expanding strikes into mainland Iran, prioritizing economic blockade enforcement as third-party diplomatic talks stall.",
      verification: "confirmed",
      timestamp: "2026-11-14T13:45:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Consolidate Around $88-$96 Corridor",
      description: "Oil futures traded sideways as IEA surplus projections and dollar strength offset ongoing geopolitical premiums from Persian Gulf supply constraints.",
      verification: "confirmed",
      timestamp: "2026-11-14T15:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military action remains confined to standoff air defense and perimeter drone skirmishes, avoiding unconstrained escalatory spirals.",
      "Commercial transit through Hormuz remains severely impeded, embedding a persistent risk markup into regional tanker freight and energy benchmarks."
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
        "Continue: Limited perimeter defense and drone skirmishes continue across the Gulf without broader offensive air campaigns."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Mine threats in southern chokepoints keep commercial tanker traffic suppressed below 50% of normal throughput."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Crude benchmarks trade tightly within the $87–$97 corridor, balancing macroeconomic surplus headwinds against geopolitical supply friction."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington resists expanding kinetic engagements while maintaining trade blockades, with third-party mediation remaining deadlocked."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The United States seeks economic strangulation without full-scale conflict, while Iran retains the Hormuz bottleneck as its critical asymmetric deterrent."
    ],
    military: [
      "Attritional drone and mine exchanges lower direct war friction daily, but accidental impacts on critical naval or radar platforms preserve latent escalation risks."
    ]
  },
  scoreTrend: [
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68,
      active: true
    }
  ],
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.253 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（持平）：美伊海湾无人机对抗与霍尔木兹海峡水雷扰动持续，中东地缘溢价支撑油价于高位区间盘整，冲突维持高压对峙格局。",
    bannerWarning: "→ 维持能源与大宗商品结构性防御敞口，保持中性风险资产配置以对冲中东地缘尾部风险。",
    deescalationIntent: "美国政府试图在不陷入全面陆空战事的前提下维持全面经济窒息，而伊朗将封锁航道视为不可放弃的威慑底牌。",
    structuralRisk: "依据彭博社与ISW评估，海峡南部持续面临水雷与扣押威胁，商业油轮流量仍不足常规50%，航道严重受限。",
    contradictionNote: "美国政府试图在不陷入全面陆空战事的前提下维持全面经济窒息，而伊朗将封锁航道视为不可放弃的威慑底牌。；低烈度无人机与水雷消耗战持续降低直接冲突门槛，但任何针对关键雷达或海军资产的误击均可能引发升级链条。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第259天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.253 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (Flat): US-Iran drone-radar skirmishes and naval mine disruptions in the Strait of Hormuz persist, keeping crude oil in a consolidated high-price r…",
    bannerWarning: "→ Maintain defensive exposure in energy and commodities while keeping risk assets neutral to hedge Middle East geopolit…",
    deescalationIntent: "The United States seeks economic strangulation without full-scale conflict, whi…",
    structuralRisk: "Bloomberg and ISW report lingering naval mine threats in southern channels, holding commercial tank…",
    contradictionNote: "The United States seeks economic strangulation without full-scale conflict, while Iran retains the Hormuz bottleneck as its critical asymmetric deterrent.; Att…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 259",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
