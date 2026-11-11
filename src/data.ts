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
  date: "2026-11-11",
  version: "v2.250",
  riskScore: 68,
  scoreTrend: [
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D256",
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
      value: "WTI $85.81–$88.73 · Brent $91.48–$94.73",
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
  keyChange: "霍尔木兹海峡发生油轮触雷起火事件，油价在降级预期与实际通航受阻间维持在85–95美元平台震荡；综合风险分落盘 68（较昨日 持平（+0））",
  investmentSignal: "→ 维持防御性资产配置并适度对冲能源供给尾部波动，警惕海峡偶发事件对风险资产估值的脉冲扰动。",
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海上封锁与水雷对抗成为消耗核心，常规油轮通行受到严格管控",
      "美伊领导层均展现避免无休止地面全面开战倾向，但要道控制权互不妥协",
      "大宗商品风险溢价在谈判预期降温与物流摩擦并存下陷入高位整理"
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
        "延续：美军维持中东前沿航母打击群战备值班与防空网巡弋。",
        "变化：美军中央司令部组建跨域特遣队扩大对伊涉军物资与沿岸通道监控。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业通行量较战前依然折损半数以上，护航机制成本高企。",
        "变化：东侧限制水域再度发生油轮触雷燃烧事件，伊朗军方重申严禁非授权通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：欧佩克与沙特等国管线分流能力已接近物理上限。",
        "变化：WTI与Brent主力合约在前期大跌后于$85–$95区间显现技术性筑底。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：第三方斡旋渠道保持沟通接触，但尚未敲定任何文本机制。",
        "变化：美方表态避免过度升级同时保持封控，伊方则强化区域防务警告。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国政府受选举政治压力寻求避免全面开战，但无法接受撤销对伊极限封锁",
      "伊朗要求解除全面海上封锁与制裁，视海峡管制为不可出让的反制抓手"
    ],
    military: [
      "美军战术护航与非对称水雷/无人快艇袭扰之间的低烈度消耗对峙",
      "有限遏制威慑与突发商船受袭引发局势二次激化的结构性风险"
    ]
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接执行交运封控与战术打击，海峡周边对峙持续，但尚未爆发全面地面冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业通航依然处于严重受阻状态，油轮触雷事件强化了航运商的风险停航意愿。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "WTI价格在$85.81–$88.73区间，Brent价格在$91.48–$94.73区间，居于温和偏强与显著偏强过渡区。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接实施军事部署并参与实质性封锁，区域多国联军跟进协同但无域外大国直接对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "外交传话渠道依然保持，但实质性停火协议仍面临核心要件难以调和的僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20261111-01",
      title: "霍尔木兹海峡油轮触雷起火，伊朗官方警告非法通航",
      description: "伊朗军方公开发表声明称一艘未报备油轮在霍尔木兹海峡东侧水域触雷起火，路透社与法新社随后独立核实火灾报告与卫星监测情况。",
      verification: "confirmed",
      timestamp: "2026-11-11 07:19 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-20261111-02",
      title: "美军CENTCOM推进「铁门特遣队」延伸封控",
      description: "美军中央司令部通报推进Task Force Iron Gate，对违规经停伊朗港口后驶离的货运船只实施航运干预，封控向陆空走廊拓展。",
      verification: "confirmed",
      timestamp: "2026-11-11 04:30 UTC",
      significance: ""
    },
    {
      id: "EVT-20261111-03",
      title: "原油基准在去风险预期与通航风险间窄幅整理",
      description: "受美方寻求降级言论与中东实际通航受阻拉锯，WTI收录于$85.81–$88.73，Brent震荡于$91.48–$94.73区间。",
      verification: "confirmed",
      timestamp: "2026-11-11 14:00 UTC",
      significance: ""
    },
    {
      id: "EVT-20261111-04",
      title: "GCC国家在科威特启动前向联合司令部协调防务",
      description: "海湾阿拉伯国家在科威特设立前向军事协调机构以增强商船护航网络，德黑兰方面警示其切勿配合外部军事干预。",
      verification: "confirmed",
      timestamp: "2026-11-11 09:15 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-11",
  version: "v2.250",
  riskScore: 68,
  scoreTrend: [
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D256",
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
      value: "WTI $85.81–$88.73 · Brent $91.48–$94.73",
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
  keyChange: "A tanker hit a naval mine and caught fire in eastern Hormuz while oil benchmarks consolidated around $85–$95 amid conflicting peace hopes and transit hazards.",
  investmentSignal: "→ Maintain defensive positioning while hedging energy supply tail-risk volatility against structural commodity premiums.",
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Naval blockade enforcement and mine warfare remain the primary mode of mutual attrition",
      "Both US and Iranian leaders indicate aversion to all-out ground conflict but maintain rigid red lines on waterway control",
      "Commodity risk premiums consolidate at elevated levels as logistical bottlenecks persist"
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
        "Continue: US carrier strike groups remain deployed on high air and missile defense alert.",
        "Change: US CENTCOM operationalizes Task Force Iron Gate to extend interdiction across overland and secondary logistics routes."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping traffic remains suppressed below half of pre-crisis capacity with heavy insurance surcharges.",
        "Change: A tanker catches fire after striking a mine in eastern Hormuz, prompting reiteration of Iranian transit restrictions."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Bypass pipelines through Saudi Arabia and Oman operate near effective technical maximums.",
        "Change: WTI and Brent crude futures stabilize within the $85–$95 band following the post-election selloff."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Intermediary diplomatic channels preserve active contact without formal draft agreements.",
        "Change: Washington stresses restraint on expanded air campaigns while Tehran affirms unilateral maritime authority."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US leadership seeks to cap conflict costs post-midterms but cannot unilaterally lift the maritime embargo",
      "Tehran demands full sanction relief and cessation of blockades, leveraging chokepoint control as strategic collateral"
    ],
    military: [
      "Tactical standoff between US naval escort patrols and Iranian asymmetric naval mine/drone harassment",
      "High residual risk of accidental commercial vessel strikes triggering unintended escalation cycles"
    ]
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active interdiction missions and retaliatory skirmishes persist without escalating into broad ground invasions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Passage remains severely constricted below 50% of peacetime volumes following verified naval mine incidents.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "WTI trades in the $85.81–$88.73 band and Brent within $91.48–$94.73, bridging the moderate and significant pressure tiers.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US provides direct military escort and task force enforcement, while regional allies coordinate maritime defense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Informal diplomatic channels explore off-ramps, but substantive progress remains stalled by incompatible preconditions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20261111-01",
      title: "Tanker Catches Fire After Striking Mine in Hormuz",
      description: "Iranian military releases statement that an oil tanker caught fire in an unauthorized corridor of eastern Hormuz; Reuters and AFP corroborate with satellite thermal tracking.",
      verification: "confirmed",
      timestamp: "2026-11-11 07:19 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-20261111-02",
      title: "US CENTCOM Expands Interdiction with Task Force Iron Gate",
      description: "US Central Command operationalizes Task Force Iron Gate, targeting non-compliant cargo departing Iranian ports and widening multi-domain embargo efforts.",
      verification: "confirmed",
      timestamp: "2026-11-11 04:30 UTC",
      significance: ""
    },
    {
      id: "EVT-20261111-03",
      title: "Crude Benchmarks Consolidate on Conflicting Macro Signals",
      description: "Amid geopolitical de-escalation talk balanced against fresh tanker hazards, WTI settles in the $85.81–$88.73 band with Brent holding $91.48–$94.73.",
      verification: "confirmed",
      timestamp: "2026-11-11 14:00 UTC",
      significance: ""
    },
    {
      id: "EVT-20261111-04",
      title: "GCC Establishes Forward Military Command in Kuwait",
      description: "Gulf Cooperation Council nations activate a forward coordination cell in Kuwait to bolster maritime surveillance as Tehran cautions against foreign-backed escorts.",
      verification: "confirmed",
      timestamp: "2026-11-11 09:15 UTC",
      significance: ""
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
    node406: "11月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.250 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（持平）：霍尔木兹海峡发生油轮触雷起火事件，油价在降级预期与实际通航受阻间维持在85–95美元平台震荡；综合风险分落盘 68（较昨日 持平（+0））",
    bannerWarning: "→ 维持防御性资产配置并适度对冲能源供给尾部波动，警惕海峡偶发事件对风险资产估值的脉冲扰动。",
    deescalationIntent: "美国政府受选举政治压力寻求避免全面开战，但无法接受撤销对伊极限封锁",
    structuralRisk: "商业通航依然处于严重受阻状态，油轮触雷事件强化了航运商的风险停航意愿。",
    contradictionNote: "美国政府受选举政治压力寻求避免全面开战，但无法接受撤销对伊极限封锁；美军战术护航与非对称水雷/无人快艇袭扰之间的低烈度消耗对峙",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第256天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.250 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (Flat): A tanker hit a naval mine and caught fire in eastern Hormuz while oil benchmarks consolidated around $85–$95 amid conflicting peace hopes a…",
    bannerWarning: "→ Maintain defensive positioning while hedging energy supply tail-risk volatility against structural commodity premiums.",
    deescalationIntent: "US leadership seeks to cap conflict costs post-midterms but cannot unilaterally…",
    structuralRisk: "Passage remains severely constricted below 50% of peacetime volumes following verified naval mine i…",
    contradictionNote: "US leadership seeks to cap conflict costs post-midterms but cannot unilaterally lift the maritime embargo; Tactical standoff between US naval escort patrols an…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 256",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
