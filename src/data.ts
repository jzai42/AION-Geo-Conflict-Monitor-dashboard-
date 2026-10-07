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
  date: "2026-10-07",
  version: "v2.214",
  keyStats: [
    {
      label: "冲突天数",
      value: "D221",
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
      value: "WTI $88.93–$90.98 · Brent $100.78–$102.59",
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
  riskScore: 64,
  change: "none",
  keyChange: "布伦特原油重上101美元关口，霍尔木兹单周袭船频次创开战以来新高；综合风险分落盘 64（较昨日 持平（+0））",
  scoreTrend: [
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "胡塞武装导弹袭击亚丁机场，美伊海空力量在波斯湾对峙依旧活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "过去一周海峡油轮遇袭与骚扰事件达9至12起，但护航下整体原油流量维持50%-90%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI在89-91美元盘整，布伦特重新进入100-103美元危机带下沿。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军在中东维持三支航母打击群战备威慑并主导商船防卫护航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "美方释出浓缩铀削减试探，伊朗高级官员予以强硬驳回，谈判未现实质破局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡单周油轮骚扰与遭袭事件升至阶段高位",
      "国际油价在百元关口获得地缘溢价支撑呈现高位震荡",
      "停火条件互不相让，大国护航维系原油基本运力"
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
        "变化：也门胡塞武装对亚丁国际机场发动导弹与无人机袭击，曼德海峡周边安全摩擦加剧。",
        "延续：美伊海空部队在波斯湾公海与沿岸空域保持贴近对峙，未发生直接主权基地交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO确认近7天记录9至12起涉海峡船只遇袭与无线电拦截，为冲突爆发以来单周最高。",
        "延续：商业船队继续依赖美军护航及东西管线分流，实际出口通航率维持在50%-90%区间。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特期货重返101美元上方，地缘不确定性压过沙特降价增供预期。",
        "延续：成品油特别是柴油裂解价差居高不下，跨区域海运成本高企维持通胀压力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗高官公开驳回美方削减浓缩铀以换取停火的构想，声明双方核心诉求冲突。",
        "延续：美国白宫坚持要求德黑兰实质约束核活动，未开辟高级别正式谈判通道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求实质削减浓缩铀为停火前提，与伊朗坚持保留核权利及解除全额制裁不可调和。"
    ],
    military: [
      "伊朗伊斯兰革命卫队以非对称破袭施压海峡航运，与美军强制护航及反封锁行动针锋相对。"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "布伦特原油站稳100美元，WTI高位震荡",
      description: "伦敦ICE布伦特原油期货触及101.60美元/桶，受中东袭击风险与海湾风暴预期支撑；WTI交投于89-91美元区间。",
      verification: "confirmed",
      timestamp: "2026-10-07T12:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡单周油轮遭袭事件达战时新高",
      description: "UKMTO与JMIC记录显示过去一周发生9-12起船只遭无人机、弹体或无线电逼停事件，袭船频率显著攀升。",
      verification: "confirmed",
      timestamp: "2026-10-07T10:24:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "胡塞武装导弹袭击也门亚丁机场",
      description: "也门交通部门证实胡塞武装向亚丁国际机场发射弹道导弹与自杀式无人机，红海反舰与陆上打击双线活跃。",
      verification: "confirmed",
      timestamp: "2026-10-07T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "德黑兰否决美方非公开核停火提议",
      description: "针对美方关于限制核浓缩结束冲突的言论，伊朗官员向媒体证实双方立场差距过大，谈判缺乏破局条件。",
      verification: "confirmed",
      timestamp: "2026-10-07T11:46:00Z",
      significance: ""
    }
  ],
  investmentSignal: "→ 维持能源与大宗商品结构性对冲敞口，防范海峡破袭脉冲驱动油价二次冲高，对高贝塔风险资产保持防御配置。",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-07",
  version: "v2.214",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D221",
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
      value: "WTI $88.93–$90.98 · Brent $100.78–$102.59",
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
  riskScore: 64,
  change: "none",
  keyChange: "Brent crude rebounded above $101/bbl while Hormuz tanker harassment incidents touched a fresh weekly high, locking the; composite risk score prints at 64 (vs prior day flat (+0))",
  scoreTrend: [
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Houthi missile barrage struck Aden airport while US-Iran frontline forces maintained high alert across regional hubs.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Weekly maritime harassment reached 9-12 events, though naval escorts maintain commercial throughput around 50%-90%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI traded in the $89-$91 band while Brent moved above the $100 threshold into the lower crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces sustain three carrier strike groups and continue active escort and intelligence coordination in Gulf waters.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Diplomatic signals surfaced on nuclear thresholds, but senior Iranian statements confirmed direct deadlock remains unresolved.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Hormuz tanker harassment incidents touched a fresh weekly conflict peak",
      "Global crude benchmarks draw support near $100 psychological thresholds",
      "Divergent diplomatic baselines leave formal ceasefire frameworks frozen"
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
        "Change: Houthi forces launched ballistic missile and drone strikes against Aden International Airport in southern Yemen.",
        "Continue: US and Iranian conventional air and naval formations maintained tense close-quarters posturing without direct base strikes."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO logged 9 to 12 tanker attack and hailing incidents over the past 7 days, setting a new weekly record for the conflict.",
        "Continue: Commercial shipping traffic relies on military escorts and pipeline diversions, preserving 50%-90% of normalized transit."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent futures moved back above $101/bbl as geopolitical risk premiums offset Saudi OSP price cuts.",
        "Continue: Elevated maritime war risk insurance and tight diesel refining margins preserve inflationary friction."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Senior Iranian officials formally dismissed US proposals demanding uranium enrichment curbs as preconditions for peace.",
        "Continue: Washington maintains an economic blockade posture without establishing direct bilateral diplomatic tracks."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demands for verifiable enrichment halts clash directly with Tehran's non-negotiable sovereign enrichment red lines."
    ],
    military: [
      "IRGC asymmetric harassment in vital chokepoints confronts US Navy escort and freedom-of-navigation enforcement."
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "Brent crude futures reclaim $100 threshold",
      description: "Brent futures rose to $101.60/bbl on heightened Middle East shipping risks and weather threats, while WTI hovered near $90/bbl.",
      verification: "confirmed",
      timestamp: "2026-10-07T12:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Weekly tanker attacks in Hormuz hit war peak",
      description: "UKMTO and JMIC recorded 9 to 12 vessel security incidents in the Strait of Hormuz over the past week, marking the most active period of harassment.",
      verification: "confirmed",
      timestamp: "2026-10-07T10:24:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Houthi missiles target Aden international airport",
      description: "Yemen transport authorities confirmed ballistic missile and drone attacks on Aden airport amid flared regional confrontation.",
      verification: "confirmed",
      timestamp: "2026-10-07T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran rejects US nuclear conditions for ceasefire",
      description: "Tehran officials told reporters that US demands regarding nuclear concessions conflict fundamentally with Iranian terms for war termination.",
      verification: "confirmed",
      timestamp: "2026-10-07T11:46:00Z",
      significance: ""
    }
  ],
  investmentSignal: "→ Maintain hedges on energy and commodities exposure to guard against maritime flare-ups while preserving a defensive stance on broader risk assets.",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.214 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：布伦特原油重上101美元关口，霍尔木兹单周袭船频次创开战以来新高；综合风险分落盘 64（较昨日 持平（+0））",
    bannerWarning: "→ 维持能源与大宗商品结构性对冲敞口，防范海峡破袭脉冲驱动油价二次冲高，对高贝塔风险资产保持防御配置。",
    deescalationIntent: "美方要求实质削减浓缩铀为停火前提，与伊朗坚持保留核权利及解除全额制裁不可调和。",
    structuralRisk: "过去一周海峡油轮遇袭与骚扰事件达9至12起，但护航下整体原油流量维持50%-90%。",
    contradictionNote: "美方要求实质削减浓缩铀为停火前提，与伊朗坚持保留核权利及解除全额制裁不可调和。；伊朗伊斯兰革命卫队以非对称破袭施压海峡航运，与美军强制护航及反封锁行动针锋相对。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第221天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.214 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): Brent crude rebounded above $101/bbl while Hormuz tanker harassment incidents touched a fresh weekly high, locking the; composite risk scor…",
    bannerWarning: "→ Maintain hedges on energy and commodities exposure to guard against maritime flare-ups while preserving a defensive s…",
    deescalationIntent: "US demands for verifiable enrichment halts clash directly with Tehran's non-neg…",
    structuralRisk: "Weekly maritime harassment reached 9-12 events, though naval escorts maintain commercial throughput…",
    contradictionNote: "US demands for verifiable enrichment halts clash directly with Tehran's non-negotiable sovereign enrichment red lines.; IRGC asymmetric harassment in vital cho…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 221",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
