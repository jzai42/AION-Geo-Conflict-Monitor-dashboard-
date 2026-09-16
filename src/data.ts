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
  date: "2026-09-15",
  version: "v2.189",
  keyStats: [
    {
      label: "冲突天数",
      value: "D199",
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
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军 THAAD 系统及人员正式抵达以色列，标志着军事介入程度达到直接防御阶段。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道维持高度紧张状态，由于美军介入，伊朗海军在海峡区域的演习频次增加。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI/Brent 站稳 $100+ 危机带（Yahoo CL=F/BZ=F 日内区间约 $104–$109）；沙特延布装船中断与货盘取消抬升供应溢价（Reuters 2026-09-15）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国派遣现役部队入驻以色列境内操作核心装备，突破了此前仅提供军援的红线。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "外交接触全面陷入僵局，伊朗将美军入驻视为战争挑衅，停火谈判毫无进展。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  riskScore: 82,
  scoreTrend: [
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82,
      active: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军 THAAD 系统直接介入防御体系",
      "能源设施打击风险短期内被排除",
      "战略重心由代理人对抗转向直接威慑"
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
        "变化：美军约 100 名官兵抵达以色列操作 THAAD 系统（DoD）。",
        "延续：以色列对黎巴嫩及加沙地区的多维度军事行动仍在持续（BBC）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡保持商业航运的高度风险溢价，护航联盟维持二级警戒（Lloyd's List）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI/Brent 收于约 $105.83 / $108.75，重回 Rubric 档位 4（$100–120 危机带）；延布装船中断推高供应溢价（Reuters/Yahoo）。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗外交部长警告美方此举将美军直接置于火线，双方言辞烈度显著增强（AP）。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "萨德反导系统运抵以色列",
      description: "美军首批反导设备已部署，由美军直接操作以防御伊朗可能的导弹回击。",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "以色列承诺不打击核能设施及能源目标",
      description: "美方媒体报道内塔尼亚胡向拜登政府保证，报复行动将集中在军事资产，非石油或核设施。",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      highlight: true
    }
  ],
  coreContradiction: {
    political: [
      "美国国内大选压力与中东直接军事介入的矛盾。",
      "伊朗维持「战略耐心」与美以反导系统升级带来的防御失衡矛盾。"
    ],
    military: [
      "美军直接部署带来的「目标化」风险与防御强化效果的博弈。"
    ]
  },
  keyChange: "美军从「装备援助」转向「人员部署」；油价因延布中断重回 $100+ 危机带。",
  investmentSignal: "→ 维持防御性头寸，减持大宗商品风险，增持避险资产。",
  change: "structural",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-15",
  version: "v2.189",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D199",
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
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US THAAD system and personnel arrival marks direct defense engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strategic chokepoint remains under high threat with significant traffic reduction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI/Brent hold in the $100+ crisis band (Yahoo CL=F/BZ=F ~$104–$109); Yanbu loading halt and Saudi cargo cancellations lift supply premium (Reuters 2026-09-15).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US deploying boots on ground to operate defense systems in Israel.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Diplomatic channels frozen; military build-up stiffens bargaining positions.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  riskScore: 82,
  scoreTrend: [
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82,
      active: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US THAAD integration into IDF defense layer",
      "Energy infrastructure attack risk mitigated",
      "Strategic shift from proxy to direct deterrence"
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
        "Change: US personnel arrive to operate THAAD (DoD).",
        "Continue: Sustained Israeli strikes in Lebanon and Gaza (BBC)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: High risk premiums for commercial vessels; naval task force on alert."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: WTI/Brent settle near $105.83 / $108.75, back in Rubric band 4 ($100–120); Yanbu loading halt lifts supply premium (Reuters/Yahoo)."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran warns of 'suicidal' consequences for US military presence (AP)."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "THAAD Deployment to Israel",
      description: "US missile defense equipment and crew arrive to bolster Israeli defense against Iran.",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Israel Targets Limited",
      description: "Reports suggest Israel will avoid Iranian oil and nuclear sites in retaliation.",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      highlight: true
    }
  ],
  coreContradiction: {
    political: [
      "US election cycle vs. direct combat involvement risks.",
      "Iranian strategic patience vs. eroding defensive parity."
    ],
    military: [
      "Targeting risk for US personnel vs. improved interception capabilities."
    ]
  },
  keyChange: "Transition to direct US personnel deployment; oil back in $100+ crisis band on Yanbu disruption.",
  investmentSignal: "→ Maintain defensive posture, reduce commodity exposure, increase hedging.",
  change: "structural",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.189 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美军从「装备援助」转向「人员部署」；油价因延布中断重回 $100+ 危机带。",
    bannerWarning: "→ 维持防御性头寸，减持大宗商品风险，增持避险资产。",
    deescalationIntent: "美国国内大选压力与中东直接军事介入的矛盾。",
    structuralRisk: "航道维持高度紧张状态，由于美军介入，伊朗海军在海峡区域的演习频次增加。",
    contradictionNote: "美国国内大选压力与中东直接军事介入的矛盾。；美军直接部署带来的「目标化」风险与防御强化效果的博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第199天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.189 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Transition to direct US personnel deployment; oil back in $100+ crisis band on Yanbu disruption.",
    bannerWarning: "→ Maintain defensive posture, reduce commodity exposure, increase hedging.",
    deescalationIntent: "US election cycle vs. direct combat involvement risks.",
    structuralRisk: "Strategic chokepoint remains under high threat with significant traffic reduction.",
    contradictionNote: "US election cycle vs. direct combat involvement risks.; Targeting risk for US personnel vs. improved interception capabilities.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 199",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
