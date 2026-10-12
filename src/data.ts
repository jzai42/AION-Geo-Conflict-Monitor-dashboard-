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
  date: "2026-10-12",
  version: "v2.219",
  keyStats: [
    {
      label: "冲突天数",
      value: "D226",
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
      value: "WTI $89.61–$94.22 · Brent $102.35–$107.22",
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
  riskScore: 72,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "也门胡塞武装对利雅得国际枢纽发动导弹与无人机复合打击，多战线交火外溢至关键陆空基建。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "咽喉水道连续遭遇针对性袭击，商船通行量维持在常态50%以下且主要承运商绕行红海与海湾。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油区间运行于$102.35–$107.22，触及并牢固立足于$100–120危机带，断供恐慌重拾升势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军提供前沿预警、联合防空与情报支持，白宫表态研判针对也门打击节点的联合作战行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "第三国外交传话通道未彻底阻断，但因战场基础设施遭袭，实质性停火安排仍无制度化突破。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹水道袭船战常态化，区域原油物流保费与绕航成本维持峰值。",
      "伊朗轴心远程精确打击延伸至海湾后方陆上枢纽，防空消耗战加剧。",
      "大国军事部署重在要道护航与反导威慑，尚未走向全面地面卷入。"
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
        "变化：也门胡塞武装对利雅得国际枢纽发动导弹与无人机复合打击，多战线交火外溢至关键陆空基建。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：咽喉水道连续遭遇针对性袭击，商船通行量维持在常态50%以下且主要承运商绕行红海与海湾。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油区间运行于$102.35–$107.22，触及并牢固立足于$100–120危机带，断供恐慌重拾升势。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军提供前沿预警、联合防空与情报支持，白宫表态研判针对也门打击节点的联合作战行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊缺乏直接互信机制，区域代理人冲突外溢压制停火谈判空间。",
      "海湾产油国安全保障诉求与胡塞武装打破封锁诉求形成死结。"
    ],
    military: [
      "低成本无人机/巡航导弹不对称袭扰与高昂防空拦截成本之间的消耗对抗。",
      "霍尔木兹通航安全受限与美军护航兵力分布受限之间的结构性矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72,
      active: true
    }
  ],
  keyChange: "霍尔木兹海峡连续发生商船遇袭叠加沙特首都枢纽遭远程打击，能源危机溢价重燃使布伦特油价坚挺在105美元上方；综合风险分落盘 72（较昨日 +2）；调整前模型分 70（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品多头配置并针对能源供应链脆弱性增持防御资产对冲下行风险。",
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡及周边两艘商船遇袭受损",
      description: "UKMTO与路透社通报周末期间一艘油轮在阿曼苏哈尔遭无人机袭击，另有一艘船舶在穿越霍尔木兹海峡时受损，海峡通行风险居高不下。",
      verification: "confirmed",
      timestamp: "2026-10-11 23:40 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "也门胡塞武装宣称袭击利雅得机场基建",
      description: "美联社与半岛电视台报道胡塞武装使用无人机对利雅得国际枢纽实施复合袭击，沙特方面防空系统拦截并报告多名人员伤亡。",
      verification: "confirmed",
      timestamp: "2026-10-12 04:15 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "布伦特原油受海峡与基建风险推动盘中触及107.22美元",
      description: "Oil & Gas Journal与Trading Economics报道，中东地缘断供隐忧压过外部燃油增产预期，布伦特油价跳升至107美元附近高位。",
      verification: "confirmed",
      timestamp: "2026-10-12 12:00 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美国研判与沙特联合实施反击行动",
      description: "彭博社引述白宫与五角大楼官员表态，美军正与沙特协调应对也门针对民用基建的袭击，大国军事威慑姿态保持严密。",
      verification: "confirmed",
      timestamp: "2026-10-12 09:30 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-12",
  version: "v2.219",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D226",
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
      value: "WTI $89.61–$94.22 · Brent $102.35–$107.22",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 72,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Yemen's Houthis launched composite drone and missile strikes against Riyadh's international infrastructure, sustaining multi-front kinetic escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Chokepoint transit remains suppressed below 50% of normal traffic as direct maritime strikes hit commercial vessels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude traded firmly in the $102.35–$107.22 crisis band ($100–$120), reflecting persistent supply interruption premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military provides early warning and air defense intelligence while assessing coordinated retaliatory strikes with regional allies.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "Backchannel contacts persist but offer no institutional pathway toward a durable ceasefire amidst fresh infrastructure attacks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Sustained tanker harassment in Hormuz keeps regional freight and war-risk premiums at cycle highs.",
      "Axis of resistance deep-strike capabilities continue to pressure Gulf civil and energy nodes.",
      "Major powers maintain defensive escorts and retaliatory deterrence without committing ground divisions."
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
        "Change: Yemen's Houthis launched composite drone and missile strikes against Riyadh's international infrastructure, sustaining multi-front kinetic escalation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Chokepoint transit remains suppressed below 50% of normal traffic as direct maritime strikes hit commercial vessels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude traded firmly in the $102.35–$107.22 crisis band ($100–$120), reflecting persistent supply interruption premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US military provides early warning and air defense intelligence while assessing coordinated retaliatory strikes with regional allies."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Absence of direct US-Iran diplomatic trust combined with regional proxy actions hinders ceasefire talks.",
      "Gulf states' infrastructure security demands directly clash with regional blockade maneuvers."
    ],
    military: [
      "Asymmetric drone and cruise missile saturation versus high interceptor exhaustion rates.",
      "Commercial escort requirements across Hormuz outstripping naval escort capacity."
    ]
  },
  scoreTrend: [
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72,
      active: true
    }
  ],
  keyChange: "Renewed tanker attacks near Hormuz and drone strikes on Saudi infrastructure reinforced geopolitical supply premiums, holding Brent above $105/bbl; composite risk score prints at 72 (vs prior day +2); pre-adjustment model score 70 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain long commodities exposure and increase defensive allocations to hedge against persistent energy supply chain fragility.",
  events: [
    {
      id: "EVT-01",
      title: "Two Tankers Damaged by Drone and Projectile Strikes Near Hormuz",
      description: "UKMTO and Reuters reported a drone strike on a tanker near Sohar, Oman, and projectile damage to another vessel transiting Hormuz over the weekend.",
      verification: "confirmed",
      timestamp: "2026-10-11 23:40 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Yemen's Houthis Claim Strike on Riyadh International Airport",
      description: "Associated Press and Al Jazeera English confirmed Houthi claims of drone strikes targeting Riyadh airport, resulting in casualties and intercepted projectiles.",
      verification: "confirmed",
      timestamp: "2026-10-12 04:15 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Brent Crude Hits $107.22/bbl on Escalating Supply Anxiety",
      description: "Oil & Gas Journal and Trading Economics reported crude prices rallied over 1%, reversing earlier declines as Hormuz tanker hits heightened supply disruption risks.",
      verification: "confirmed",
      timestamp: "2026-10-12 12:00 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "United States Evaluates Coordinated Strikes with Saudi Arabia",
      description: "Bloomberg and AFP reported the White House and Pentagon are considering joint military counter-strikes targeting Houthi launch facilities in Yemen.",
      verification: "confirmed",
      timestamp: "2026-10-12 09:30 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.219 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑2）：霍尔木兹海峡连续发生商船遇袭叠加沙特首都枢纽遭远程打击，能源危机溢价重燃使布伦特油价坚挺在105美元上方；综合风险分落盘 72（较昨日 +2）；调整前模型分 70（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品多头配置并针对能源供应链脆弱性增持防御资产对冲下行风险。",
    deescalationIntent: "美伊缺乏直接互信机制，区域代理人冲突外溢压制停火谈判空间。",
    structuralRisk: "咽喉水道连续遭遇针对性袭击，商船通行量维持在常态50%以下且主要承运商绕行红海与海湾。",
    contradictionNote: "美伊缺乏直接互信机制，区域代理人冲突外溢压制停火谈判空间。；低成本无人机/巡航导弹不对称袭扰与高昂防空拦截成本之间的消耗对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第226天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.219 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑2): Renewed tanker attacks near Hormuz and drone strikes on Saudi infrastructure reinforced geopolitical supply premiums, holding Brent above $…",
    bannerWarning: "→ Maintain long commodities exposure and increase defensive allocations to hedge against persistent energy supply chain…",
    deescalationIntent: "Absence of direct US-Iran diplomatic trust combined with regional proxy actions…",
    structuralRisk: "Chokepoint transit remains suppressed below 50% of normal traffic as direct maritime strikes hit co…",
    contradictionNote: "Absence of direct US-Iran diplomatic trust combined with regional proxy actions hinders ceasefire talks.; Asymmetric drone and cruise missile saturation versus…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 226",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
