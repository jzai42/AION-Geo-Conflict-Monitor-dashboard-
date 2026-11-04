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
  date: "2026-11-04",
  version: "v2.243",
  riskScore: 80,
  keyChange: "美军对格什姆岛阵地展开空袭，海峡通行继续实质受阻，布伦特油价震荡触及 104 美元危机带，局势处于高位黏滞。",
  change: "none",
  investmentSignal: "→ 维持地缘政治与能源大宗对冲配置，严控权益敞口并对风险资产保持防御态势。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D249",
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
      value: "WTI $87.13–$97.15 · Brent $93.43–$104.87",
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
      description: "美军空袭格什姆岛雷达与反舰设施，战区直接交火烈度依然处于高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "主要商业航运企业继续回避海峡水道，航道受漂雷与巡逻艇威胁实质瘫痪。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油交易区间上沿触及 104.87 美元危机带，依保守原则维持 4 档评定。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战区巡逻与打击行动，其他大国继续提供外交与情报支持，对抗尚未外溢至大国直接火拼。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "第三方斡旋草案未能弥合核心诉求分歧，官方停火机制停滞不前。",
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
      "美军精准打击海峡要冲格什姆岛军事目标，战区交火维持高强度。",
      "全球商业主流船东拒绝进入海湾，供应链持续承担绕航高成本。",
      "外交斡旋仅停留在草案试探，双方缺乏实质让步基础。"
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
        "变化：美军打击格什姆岛雷达反舰阵地，压制伊朗海峡封锁能力。",
        "延续：海湾周边防空拦截与无人侦察对抗持续处于高戒备状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际各大航运巨头继续绕行好望角，海峡商业货运瘫痪。",
        "变化：UKMTO 发布关于海峡东口漂雷隐患与无人艇活动的新通告。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价日内受政治与战局双向拉扯，振幅剧烈扩大。",
        "延续：原油近远月合约维持深度逆价差，现货物理供应担忧未退。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国大选后新国会构成增添对伊政策中长期不确定性。",
        "延续：德黑兰官方坚称除非全面停火并撤销制裁，否则不保障海峡通航。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求立即无条件恢复海峡国际商业航运自由通行权。",
      "伊朗要求美方完全停止战区军事打击并实质性撤销关键经济制裁。"
    ],
    military: [
      "美军依赖防空反导及定点空袭压制伊朗反舰与布雷网络。",
      "伊朗依托岸基机动反舰导弹、水雷战和不对称快艇群维系封锁威慑。"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "美军空袭霍尔木兹咽喉格什姆岛军事设施",
      description: "美军对伊朗位于霍尔木兹海峡入口的格什姆岛军事设施实施定点打击以压制反舰武器，伊方防空部队随即进行抗击。（华尔街日报、路透社）",
      verification: "confirmed",
      timestamp: "2026-11-03T22:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "卡塔尔转交美伊停火备忘录草案但分歧巨大",
      description: "卡塔尔斡旋团队向美伊双方提交新停火草案，但德黑兰坚持解除封锁前美方须先停火，谈判陷入实质僵局。（半岛电视台、路透社）",
      verification: "confirmed",
      timestamp: "2026-11-04T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "海事安全机构更新霍尔木兹海峡漂雷安全警告",
      description: "UKMTO 发布通报警告海峡水域仍有未爆漂雷和无人快艇骚扰，商业保险机构维持战争险拒保或顶格费率。（UKMTO、法新社）",
      verification: "confirmed",
      timestamp: "2026-11-04T09:40:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际原油日内剧震且布伦特上沿触及危机带",
      description: "油价在空袭消息与外交试探间剧烈震荡，布伦特日内上沿触及 104.87 美元/桶，现货溢价依然严峻。（Reuters、EIA）",
      verification: "confirmed",
      timestamp: "2026-11-04T14:00:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-04",
  version: "v2.243",
  riskScore: 80,
  keyChange: "US airstrikes targeted Qeshm Island radar arrays, Hormuz transit remains severely disrupted, and Brent touched the $104 crisis threshold amid sticky risk scores.",
  change: "none",
  investmentSignal: "→ Maintain geopolitical hedges and commodity exposure in energy, while taking a defensive stance on risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D249",
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
      value: "WTI $87.13–$97.15 · Brent $93.43–$104.87",
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
      description: "US strikes on Iranian assets on Qeshm Island maintain active, direct exchanges in the theater.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial shipping lines continue full-scale diversion away from the Strait due to mine and drone threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent session upper bound touched $104.87 into the $100–120 crisis band; score 4 retained under conservative rubric selection.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces provide direct tactical strikes and defensive escort while broader superpower direct clash is averted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic draft transmitted via Qatar fails to resolve foundational disputes, keeping negotiations stalled.",
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
      "US precision strikes against Iranian island strongholds reinforce high tactical friction.",
      "Global commercial liners continue complete circumnavigation of Africa.",
      "Qatari diplomatic mediation remains unable to narrow core maximalist demands."
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
        "Change: US forces targeted radar and missile sites on Qeshm Island.",
        "Continue: Air defense vigilance and maritime patrol confrontations persist across the Persian Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global container and crude carriers maintain alternative routing around Cape of Good Hope.",
        "Change: UKMTO issued updated alerts on floating explosive hazards and drone boat skirmishes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices experienced wide intraday swings responding to military and diplomatic headlines.",
        "Continue: Forward curves maintain steep backwardation reflecting tight prompt physical availability."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US political transitions after midterm elections inject uncertainty into strategic posture.",
        "Continue: Tehran maintains maritime access remains strictly contingent on comprehensive sanctions relief."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands immediate, unconditional restoration of freedom of navigation in the Strait.",
      "Tehran demands an immediate cessation of strikes and the verifiable rollback of economic sanctions."
    ],
    military: [
      "US CENTCOM relies on precision standoff strikes and naval air power to neutralize coastal defense threats.",
      "Iran relies on distributed anti-ship missile sites, naval mines, and swarming tactics to enforce closure."
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "US Strikes Iranian Military Facilities on Qeshm Island",
      description: "US aircraft conducted precision strikes against Iranian radar and coastal missile installations at the mouth of Hormuz. (Wall Street Journal, Reuters)",
      verification: "confirmed",
      timestamp: "2026-11-03T22:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Qatar Conveys Draft Truce Framework but Talks Stall",
      description: "Qatari mediators relayed a ceasefire outline, but both Washington and Tehran refused compromise on navigation and sanctions preconditions. (Al Jazeera, Reuters)",
      verification: "confirmed",
      timestamp: "2026-11-04T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Maritime Authorities Reiterate Hormuz Mine and Drone Warnings",
      description: "UKMTO advised vessels that explosive devices and suspicious craft remain an active threat near the Strait. (UKMTO, AFP)",
      verification: "confirmed",
      timestamp: "2026-11-04T09:40:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Fluctuate Widely as Brent Tests Crisis Band",
      description: "Crude futures saw wide swings, with Brent reaching an intraday peak of $104.87 per barrel amid persistent supply anxieties. (Reuters, EIA)",
      verification: "confirmed",
      timestamp: "2026-11-04T14:00:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.243 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美军对格什姆岛阵地展开空袭，海峡通行继续实质受阻，布伦特油价震荡触及 104 美元危机带，局势处于高位黏滞。",
    bannerWarning: "→ 维持地缘政治与能源大宗对冲配置，严控权益敞口并对风险资产保持防御态势。",
    deescalationIntent: "美方要求立即无条件恢复海峡国际商业航运自由通行权。",
    structuralRisk: "主要商业航运企业继续回避海峡水道，航道受漂雷与巡逻艇威胁实质瘫痪。",
    contradictionNote: "美方要求立即无条件恢复海峡国际商业航运自由通行权。；美军依赖防空反导及定点空袭压制伊朗反舰与布雷网络。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第249天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.243 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): US airstrikes targeted Qeshm Island radar arrays, Hormuz transit remains severely disrupted, and Brent touched the $104 crisis threshold am…",
    bannerWarning: "→ Maintain geopolitical hedges and commodity exposure in energy, while taking a defensive stance on risk assets.",
    deescalationIntent: "Washington demands immediate, unconditional restoration of freedom of navigatio…",
    structuralRisk: "Commercial shipping lines continue full-scale diversion away from the Strait due to mine and drone …",
    contradictionNote: "Washington demands immediate, unconditional restoration of freedom of navigation in the Strait.; US CENTCOM relies on precision standoff strikes and naval air …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 249",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
