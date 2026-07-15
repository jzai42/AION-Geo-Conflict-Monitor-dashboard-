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
  date: "2026-07-15",
  version: "v2.126",
  keyStats: [
    {
      label: "冲突天数",
      value: "D137",
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
      value: "WTI $80.40–$81.34 · Brent $86.19–$86.44",
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
  riskScore: 88,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美国与伊朗正进行直接、持续多日的跨境军事打击，包括美军空袭伊朗境内目标及伊朗对多国美军基地发动攻击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美国已正式恢复对伊朗港口的全面海军封锁，商业航运面临彻底中断的直接军事风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "布伦特原油价格因冲突加剧而在86美元/桶附近高位运行，处于显著偏强区间，供应中断担忧持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军方已直接、深度参与对伊朗本土的作战行动并实施海上封锁，部署超过20艘军舰。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "随着直接军事对抗升级和双方发出最后通牒式威胁，所有外交谈判渠道均已中断，双方立场完全对立。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt_01",
      title: "美国对伊朗发动新一轮打击并正式恢复海上封锁",
      description: "美国中央司令部（CENTCOM）确认，美军对伊朗沿海地区的导弹、无人机及海军设施发动了新一轮大规模打击，旨在削弱其攻击霍尔木兹海峡商船的能力。同时，美军于7月14日下午正式恢复了对伊朗港口的全面海军封锁。来源：Fox News, CBS News",
      verification: "confirmed",
      timestamp: "2026-07-15T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_02",
      title: "伊朗对多个国家的美国军事基地发动报复性袭击",
      description: "作为对美国打击的回应，伊朗伊斯兰革命卫队（IRGC）及伊朗军队宣布对多个地区的美国军事目标发动了导弹和无人机袭击，包括约旦的Al-Azraq空军基地以及位于科威特和巴林的军事设施。约旦和科威特均报告拦截了来袭目标。来源：Tasnim, The Guardian",
      verification: "confirmed",
      timestamp: "2026-07-15T07:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_03",
      title: "冲突升级导致人员伤亡与地区紧张局势加剧",
      description: "伊朗方面报告称，美国的空袭已在伊朗东南部一处军事基地造成至少7名军事人员死亡，另有超过260人在近期袭击中受伤。同时，科威特报告其海军船只在伊朗袭击中受损。地区紧张局势急剧升级，巴林响起了防空警报。来源：The Hindu, Gulf News",
      verification: "confirmed",
      timestamp: "2026-07-15T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_04",
      title: "伊朗威胁将封锁其他重要航运通道",
      description: "伊朗伊斯兰革命卫队发表声明，威胁称如果其石油出口因美国封锁而受阻，将关闭“所有其他惠及美国及其盟友的出口走廊”，分析人士认为这可能指向连接红海与亚丁湾的曼德海峡。来源：Reuters, Al-Monitor",
      verification: "confirmed",
      timestamp: "2026-07-15T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方直接军事打击常态化，冲突范围从海上扩大至多国陆上目标。",
      "美国恢复对伊朗的全面海上封锁，标志着经济与军事压力的极限施加。",
      "冲突已无任何外交降级渠道，双方均以军事手段回应，存在向更广泛战争演变的重大风险。"
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
        "变化：美国与伊朗正进行直接、持续多日的跨境军事打击，包括美军空袭伊朗境内目标及伊朗对多国美军基地发动攻击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国已正式恢复对伊朗港口的全面海军封锁，商业航运面临彻底中断的直接军事风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油价格因冲突加剧而在86美元/桶附近高位运行，处于显著偏强区间，供应中断担忧持续。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军方已直接、深度参与对伊朗本土的作战行动并实施海上封锁，部署超过20艘军舰。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限军事和经济压力迫使伊朗在核问题与地区行为上彻底让步，而伊朗则力图通过强硬反击证明其无法被军事征服，以保全政权和地区影响力。"
    ],
    military: [
      "美国试图利用其海空优势，在避免大规模地面介入的情况下，摧毁伊朗威胁海上航运和发动非对称攻击的能力；伊朗则利用其导弹、无人机和代理人网络，对美军及其地区盟友的脆弱目标进行报复，扩大冲突成本。"
    ]
  },
  scoreTrend: [
    {
      date: "07-11",
      score: 72
    },
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88,
      active: true
    }
  ],
  investmentSignal: "→ 维持防御性仓位，地缘风险溢价在能源与大宗商品中已完全定价，警惕冲突扩大化对全球风险资产的冲击。",
  prevRiskScore: 88,
  keyChange: "24h要点：详见事件与因子。",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range July 15 2026 Reuters Bloomberg",
    "US Iran tensions latest news July 15 2026",
    "Strait of Hormuz shipping status July 15 2026",
    "CENTCOM Iran press release July 2026",
    "Iran military news July 15 2026",
    "US state department Iran briefing July 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-15",
  version: "v2.126",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D137",
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
      value: "WTI $80.40–$81.34 · Brent $86.19–$86.44",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Completely Blockaded",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 88,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The US and Iran are engaged in direct, multi-day, cross-border military strikes, including US airstrikes on targets inside Iran and Iranian attacks on US bases in multiple countries.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The U.S. has officially resumed its full naval blockade of Iranian ports, posing a direct military risk of complete disruption to commercial shipping.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent crude prices are holding at high levels around $86/barrel due to the escalating conflict, in a significantly strong price band with persistent supply disruption fears.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. military is directly and deeply involved in combat operations against mainland Iran and is enforcing a naval blockade with over 20 warships.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "With escalating direct military conflict and ultimatum-like threats from both sides, all diplomatic channels have been severed, and positions are completely polarized.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt_01",
      title: "US Launches New Strikes on Iran and Officially Resumes Naval Blockade",
      description: "U.S. Central Command (CENTCOM) confirmed that U.S. forces launched a new major round of strikes against missile, drone, and naval facilities on the Iranian coast to degrade its ability to attack commercial shipping in the Strait of Hormuz. Concurrently, the U.S. military officially resumed its full naval blockade of Iranian ports on the afternoon of July 14. Sources: Fox News, CBS News",
      verification: "confirmed",
      timestamp: "2026-07-15T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_02",
      title: "Iran Launches Retaliatory Attacks on US Military Bases in Multiple Countries",
      description: "In response to U.S. strikes, Iran's IRGC and Army announced missile and drone attacks on U.S. military targets in several regions, including the Al-Azraq Air Base in Jordan and military facilities in Kuwait and Bahrain. Both Jordan and Kuwait reported intercepting incoming targets. Sources: Tasnim, The Guardian",
      verification: "confirmed",
      timestamp: "2026-07-15T07:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_03",
      title: "Conflict Escalation Leads to Casualties and Heightened Regional Tensions",
      description: "Iran reported that U.S. airstrikes killed at least seven military personnel at a base in southeastern Iran and injured over 260 people in recent attacks. Meanwhile, Kuwait reported damage to one of its naval vessels from an Iranian attack. Regional tensions have sharply escalated, with air raid sirens sounding in Bahrain. Sources: The Hindu, Gulf News",
      verification: "confirmed",
      timestamp: "2026-07-15T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_04",
      title: "Iran Threatens to Block Other Critical Shipping Chokepoints",
      description: "Iran's IRGC issued a statement threatening to close 'all other export corridors that benefit the U.S. and its allies' if its oil exports are blocked by the US, a threat analysts believe could target the Bab el-Mandeb Strait connecting the Red Sea to the Gulf of Aden. Sources: Reuters, Al-Monitor",
      verification: "confirmed",
      timestamp: "2026-07-15T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct military strikes between the two sides have become normalized, with the conflict zone expanding from maritime to land-based targets in multiple countries.",
      "The U.S. has resumed a full naval blockade on Iran, marking the application of maximum economic and military pressure.",
      "There are no diplomatic channels for de-escalation; both sides are responding with military force, posing a significant risk of escalation into a broader war."
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
        "Change: The US and Iran are engaged in direct, multi-day, cross-border military strikes, including US airstrikes on targets inside Iran and Iranian attacks on …"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: has officially resumed its full naval blockade of Iranian ports, posing a direct military risk of complete disruption to commercial shipping."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude prices are holding at high levels around $86/barrel due to the escalating conflict, in a significantly strong price band with persistent su…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: military is directly and deeply involved in combat operations against mainland Iran and is enforcing a naval blockade with over 20 warships."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iran's complete capitulation on its nuclear program and regional behavior through maximum military and economic pressure, while Iran aims to prove it cannot be militarily conquered to preserve its regime and regional influence through fierce counter-attacks."
    ],
    military: [
      "The U.S. is leveraging its air and sea superiority to destroy Iran's capability to threaten maritime shipping and conduct asymmetric attacks, while avoiding a large-scale ground invasion. Iran is using its missile, drone, and proxy networks to retaliate against vulnerable U.S. and allied targets in the region, thereby increasing the costs of the conflict."
    ]
  },
  scoreTrend: [
    {
      date: "07-11",
      score: 72
    },
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88,
      active: true
    }
  ],
  investmentSignal: "→ Maintain defensive positions; the geopolitical risk premium is fully priced into energy and commodities. Be wary of the impact of conflict expansion on global risk assets.",
  prevRiskScore: 88,
  keyChange: "24h: See events and factors.",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price range July 15 2026 Reuters Bloomberg",
    "US Iran tensions latest news July 15 2026",
    "Strait of Hormuz shipping status July 15 2026",
    "CENTCOM Iran press release July 2026",
    "Iran military news July 15 2026",
    "US state department Iran briefing July 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.126 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：24h要点：详见事件与因子。",
    bannerWarning: "→ 维持防御性仓位，地缘风险溢价在能源与大宗商品中已完全定价，警惕冲突扩大化对全球风险资产的冲击。",
    deescalationIntent: "美国寻求通过极限军事和经济压力迫使伊朗在核问题与地区行为上彻底让步，而伊朗则力图通过强硬反击证明其无法被军事征服，以保全政权和地区影响力。",
    structuralRisk: "美国已正式恢复对伊朗港口的全面海军封锁，商业航运面临彻底中断的直接军事风险。",
    contradictionNote: "美国寻求通过极限军事和经济压力迫使伊朗在核问题与地区行为上彻底让步，而伊朗则力图通过强硬反击证明其无法被军事征服，以保全政权和地区影响力。；美国试图利用其海空优势，在避免大规模地面介入的情况下，摧毁伊朗威胁海上航运和发动非对称攻击的能力；伊朗则利用其导弹、无人机和代理人网络，对美军及其地区盟友的脆弱目标进行报复，扩大…",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第137天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.126 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): 24h: See events and factors.",
    bannerWarning: "→ Maintain defensive positions; the geopolitical risk premium is fully priced into energy and commodities. Be wary of t…",
    deescalationIntent: "The U.S. seeks to compel Iran's complete capitulation on its nuclear program an…",
    structuralRisk: "The U.S. has officially resumed its full naval blockade of Iranian ports, posing a direct military …",
    contradictionNote: "The U.S. seeks to compel Iran's complete capitulation on its nuclear program and regional behavior through maximum military and economic pressure, while Iran a…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 137",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
