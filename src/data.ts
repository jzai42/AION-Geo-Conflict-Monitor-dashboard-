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
      description: "美军继续以 THAAD 等体系直接参与以色列防空；CBO 报告称反导拦截弹库存显著消耗（Guardian/Military Times 2026-09-15）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹商业通行仍严重受限；沙特东—西管道受袭后延布装船中断，海湾出口更多依赖替代路径（Reuters/Bloomberg）。",
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
      description: "美国在以色列方向维持反导操作与盟友协防角色；公开报道强调拦截弹库存与补给瓶颈（DoD IG/CBO）。",
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
      "美军继续以反导体系直接协防以色列，拦截弹库存承压",
      "沙特东—西管道/延布装船中断推升供应溢价，油价重回 $100+",
      "战略重心仍在直接威慑与高风险航道管控"
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
        "变化：CBO 估算伊朗相关作战使美方反导拦截弹库存大幅消耗，重建或需数年（Guardian/Military Times）。",
        "延续：美以反导协防与区域多线军事行动仍在持续（DoD/BBC）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹商业通行仍严重受限；延布装船中断后沙特更多依赖海湾与 STS 替代出口（Reuters/Bloomberg）。"
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
      title: "CBO：美方反导拦截弹库存显著消耗",
      description: "国会预算办公室估算伊朗相关作战成本约 380 亿美元，并消耗约一半至三分之二相关拦截弹库存，重建或需数年。来源：Guardian、Military Times（2026-09-15）。",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "沙特延布装船中断、部分对欧货盘取消",
      description: "东—西管道受袭后延布装船暂停，沙特通知部分欧洲客户取消 9 月货盘，推高供应溢价；WTI/Brent 收于约 $105.83 / $108.75。来源：Reuters（2026-09-15）。",
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
  keyChange: "反导库存消耗与延布出口中断叠加；油价站稳 $100+ 危机带，高压对峙延续。",
  investmentSignal: "→ 维持能源与避险防御头寸，对冲霍尔木兹/红海出口中断风险。",
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
      description: "US continues direct missile-defense support for Israel via THAAD and related systems; CBO says interceptor stocks are heavily depleted (Guardian/Military Times 2026-09-15).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Hormuz commercial traffic remains severely restricted; after East-West pipeline damage, Yanbu loadings halted and Gulf exports lean on alternate routes (Reuters/Bloomberg).",
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
      description: "US maintains allied air-defense operations toward Israel; public reports stress interceptor shortfalls and resupply bottlenecks (DoD IG/CBO).",
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
      "US missile-defense support for Israel continues; interceptor stocks under pressure",
      "Yanbu loadings halted after East-West pipeline attack; oil holds $100+ crisis band",
      "Strategy remains direct deterrence plus high-risk chokepoint management"
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
        "Change: CBO estimates Iran-related ops heavily depleted US interceptor stocks; rebuild may take years (Guardian/Military Times).",
        "Continue: US–Israel missile-defense cooperation and multi-front operations persist (DoD/BBC)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hormuz traffic still severely restricted; after Yanbu halt, Saudi flows lean on Gulf/STS alternatives (Reuters/Bloomberg)."
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
      title: "CBO: US interceptor stocks heavily depleted",
      description: "CBO puts Iran-related ops near $38bn and estimates one-half to two-thirds of key interceptor stocks used; rebuild may take years. Sources: Guardian, Military Times (2026-09-15).",
      verification: "confirmed",
      timestamp: "2026-09-15",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Saudi Yanbu loadings halted; some Europe cargoes canceled",
      description: "After East-West pipeline damage, Yanbu loadings paused and some September Europe cargoes canceled, lifting supply premium; WTI/Brent settle near $105.83 / $108.75. Source: Reuters (2026-09-15).",
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
  keyChange: "Interceptor stockpile stress plus Yanbu export disruption; oil holds $100+ crisis band under high-pressure standoff.",
  investmentSignal: "→ Maintain energy and safe-haven defense; hedge Hormuz/Red Sea export-disruption risk.",
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
    bannerSignal: "综合评分 82（持平）：反导库存消耗与延布出口中断叠加；油价站稳 $100+ 危机带，高压对峙延续。",
    bannerWarning: "→ 维持能源与避险防御头寸，对冲霍尔木兹/红海出口中断风险。",
    deescalationIntent: "美国国内政治周期与中东直接军事介入的矛盾。",
    structuralRisk: "霍尔木兹商业通行仍严重受限；沙特东—西管道受袭后延布装船中断，海湾出口更多依赖替代路径（Reuters/Bloomberg）。",
    contradictionNote: "美国国内政治周期与中东直接军事介入的矛盾。；美军协防带来的「目标化」风险与防御强化效果的博弈。",
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
    bannerSignal: "Composite 82 (Flat): Interceptor stockpile stress plus Yanbu export disruption; oil holds $100+ crisis band under high-pressure standoff.",
    bannerWarning: "→ Maintain energy and safe-haven defense; hedge Hormuz/Red Sea export-disruption risk.",
    deescalationIntent: "US political calendar vs. direct combat-involvement risks.",
    structuralRisk: "Hormuz commercial traffic remains severely restricted; after East-West pipeline damage, Yanbu loadings halted and Gulf exports lean on alternate routes (Reuters/Bloomberg).",
    contradictionNote: "US political calendar vs. direct combat-involvement risks.; Targeting risk for US personnel vs. improved interception capabilities.",
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
