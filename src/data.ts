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
  date: "2026-09-13",
  version: "v2.187",
  riskScore: 88,
  riskChange: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D197",
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
      value: "WTI $92.50–$95.80 · Brent $96.20–$99.40",
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
      description: "代理人战争与直接威慑共存，红海与波斯湾局势极度紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "多数班轮公司宣布停运波斯湾航线，通行能力受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油站稳 $95 以上，市场正在定价长期断供风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国中央司令部增调两支战斗机中队至区域，介入深度维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "维也纳外交渠道完全关闭。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC 霍尔木兹实弹演习",
      description: "伊朗革命卫队在海峡战略要冲进行了反舰导弹与无人机协同演习，警告外部势力。",
      verification: "confirmed",
      timestamp: "06:45",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军航母维持封锁外围哨位",
      description: "林肯号航母战斗群在阿曼湾维持部署，尚未尝试强行护航，局势处于对峙状态。",
      verification: "confirmed",
      timestamp: "09:15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "IEA 能源供应预警",
      description: "国际能源署报告称，若海峡封锁持续超过 30 天，全球库存可能跌至安全水平以下。",
      verification: "partial",
      timestamp: "12:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接对抗与代理人骚扰并行",
      "全球能源供应链处于断裂边缘",
      "外交调解几乎完全失效"
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
        "延续：美军林肯号航母战斗群在阿曼湾维持高度戒备，尚未进入海峡内部。",
        "变化：伊朗在其南部海岸线新增部署了三处移动式雷达站。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运流量仍维持在正常水平的 40% 左右，多数大型油轮仍选择绕行。",
        "延续：保险巨头对通过波斯湾的船舶征收 5% 以上的额外战争险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：虽然实物供应尚未完全中断，但风险溢价已固化在 $15-20 区间。",
        "延续：欧洲国家开始启动战略石油储备（SPR）的评估程序。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊官方均未释放对话信号，外交层面的实质性接触已中断超过 72 小时。",
        "变化：欧盟调停人表示当前「没有任何可供讨论的草案」。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压与伊朗生存主权的零和博弈",
      "中东地区大国对局势失控的集体焦虑"
    ],
    military: [
      "常规威慑失灵后的非对称冲突升级",
      "霍尔木兹海峡通航权与主权主张的直接碰撞"
    ]
  },
  scoreTrend: [
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
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
      score: 88,
      active: true
    }
  ],
  keyChange: "冲突进入高位平台期，海峡半封锁现状常态化。",
  investmentSignal: "→ 维持防御性策略，对冲能源与避险资产仓位，减持风险资产暴露。",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-13",
  version: "v2.187",
  riskScore: 88,
  riskChange: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D197",
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
      value: "WTI $92.50–$95.80 · Brent $96.20–$99.40",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Proxy wars and direct deterrence coexist; extreme tension in the Red Sea and Persian Gulf.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Major shipping lines suspended Gulf routes; transit capacity significantly limited.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude holds above $95 as market prices in long-term supply disruption risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US Central Command redeploys fighter squadrons; intervention depth remains high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Vienna diplomatic channels completely closed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Live-Fire Drills",
      description: "IRGC conducted coordinated missile and drone drills at the strait's choke points.",
      verification: "confirmed",
      timestamp: "06:45",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Carrier Group Deployment",
      description: "USS Abraham Lincoln CSG remains in Gulf of Oman; standoff continues without direct escort.",
      verification: "confirmed",
      timestamp: "09:15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "IEA Supply Warning",
      description: "IEA warns global reserves could fall below safety levels if blockade exceeds 30 days.",
      verification: "partial",
      timestamp: "12:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct confrontation and proxy harassment",
      "Global energy supply chains near breaking point",
      "Diplomatic mediation effectively non-existent"
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
        "Continue: US Lincoln CSG maintains high alert in the Gulf of Oman, avoiding entering the strait.",
        "Change: Iran added three mobile radar stations along its southern coastline."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic remains at ~40% of normal levels; major tankers avoiding transit.",
        "Continue: War risk insurance premiums stay above 5% for vessels entering the Gulf."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk premium solidified in the $15-20 range despite no total physical halt yet.",
        "Continue: European nations begin evaluation of Strategic Petroleum Reserve (SPR) release."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: No dialogue signals from US/Iran; substantive diplomatic contact suspended for 72h.",
        "Change: EU mediators state 'no draft current exists' for discussion."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum game between US maximum pressure and Iranian survival",
      "Collective regional anxiety over loss of control"
    ],
    military: [
      "Asymmetric escalation after conventional deterrence failure",
      "Collision between navigation rights and sovereign claims in Hormuz"
    ]
  },
  scoreTrend: [
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
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
      score: 88,
      active: true
    }
  ],
  keyChange: "Conflict enters high-level plateau; semi-blockade of the strait normalized.",
  investmentSignal: "→ Maintain defensive posture, hedge energy and safe-haven assets, reduce risk exposure.",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.187 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：冲突进入高位平台期，海峡半封锁现状常态化。",
    bannerWarning: "→ 维持防御性策略，对冲能源与避险资产仓位，减持风险资产暴露。",
    deescalationIntent: "美国极限施压与伊朗生存主权的零和博弈",
    structuralRisk: "多数班轮公司宣布停运波斯湾航线，通行能力受限。",
    contradictionNote: "美国极限施压与伊朗生存主权的零和博弈；常规威慑失灵后的非对称冲突升级",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第197天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.187 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): Conflict enters high-level plateau; semi-blockade of the strait normalized.",
    bannerWarning: "→ Maintain defensive posture, hedge energy and safe-haven assets, reduce risk exposure.",
    deescalationIntent: "Zero-sum game between US maximum pressure and Iranian survival",
    structuralRisk: "Major shipping lines suspended Gulf routes; transit capacity significantly limited.",
    contradictionNote: "Zero-sum game between US maximum pressure and Iranian survival; Asymmetric escalation after conventional deterrence failure",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 197",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
