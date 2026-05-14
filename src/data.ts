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
  date: "2026-05-14",
  version: "v2.64",
  riskScore: 78,
  keyStats: [
    {
      label: "冲突天数",
      value: "D75",
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
      value: "WTI $89.50–$92.80 · Brent $94.20–$97.50",
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
      description: "美军增派航母编队，地区代理人冲突维持高频拦截状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "无人机骚扰事件频发，航运保险成本激增导致部分班轮绕行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价在高位区间震荡，市场对霍尔木兹海峡可能发生的封锁保持高度警惕。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事存在显著增强，通过直接军事部署展示干预决心。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交接触仅限于相互警告，尚无实质性缓和信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美航母编队抵达阿曼湾",
      description: "美军方通过部署航母强化中东防御姿态，旨在保护商船航行安全。",
      verification: "confirmed",
      timestamp: "2026-05-14 06:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡商船遭骚扰",
      description: "两艘化学品船报告遭遇不明来源无人机抵近滋扰，航道安全风险等级提升。",
      verification: "confirmed",
      timestamp: "2026-05-14 02:45",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗拒绝无条件谈判",
      description: "伊朗官方重申在美方取消制裁前不会开启外交对话。",
      verification: "confirmed",
      timestamp: "2026-05-14 09:30",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军战区总兵力创近两月新高",
      "航运中断风险与能源价格锚定",
      "外交渠道处于极度冷冻期"
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
        "延续：美军航母编队在阿曼湾维持高戒备巡航。",
        "变化：红海北部防空拦截频次在过去24小时上升约15%。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要航运巨头维持通过该区域的额外战争风险评估。",
        "变化：由于骚扰事件增加，部分油轮转向拉斯坦努拉港口外待命。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI油价在$90关口上方获得强劲支撑。",
        "变化：市场出现针对远期供应中断的对冲期权买入激增。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国白宫重申支持航行自由的坚定立场。",
        "变化：伊朗军方高层公开警告，任何误判都将导致“毁灭性回应”。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方极限施压策略与伊朗防御性威慑的结构性对立。",
      "国际社会对航道安全的关切与地区博弈主权冲突的矛盾。"
    ],
    military: [
      "美军前沿部署增加与代理人武装不对称作战的风险不对等。"
    ]
  },
  scoreTrend: [
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78,
      active: true
    }
  ],
  keyChange: "美航母入湾标志着军事威慑从防御转为主动压制。",
  investmentSignal: "→ 维持能源与避险资产仓位，对风险资产采取防御性布局。",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-14",
  version: "v2.64",
  riskScore: 78,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D75",
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
      value: "WTI $89.50–$92.80 · Brent $94.20–$97.50",
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
      description: "Deployment of additional US carrier groups and persistent proxy skirmishes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Frequent drone harassment incidents and soaring insurance premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices volatile at high levels due to supply chain disruption fears.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US military buildup and engagement in defensive operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels remain frozen with rigid stances on both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Carrier Strike Group Arrives",
      description: "Military presence bolstered to deter attacks on commercial shipping.",
      verification: "confirmed",
      timestamp: "2026-05-14 06:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Tanker Harassment in Hormuz",
      description: "Chemical tankers report proximity harassment by unidentified drones.",
      verification: "confirmed",
      timestamp: "2026-05-14 02:45",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Tehran Rejects Conditional Talks",
      description: "Iranian officials state no talks will occur until sanctions are lifted.",
      verification: "confirmed",
      timestamp: "2026-05-14 09:30",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Regional US troop levels reach 2-month peak",
      "Shipping risks tightly coupled with energy prices",
      "Diplomatic channels in deep freeze"
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
        "Continue: US carrier groups maintain high-alert patrols in the Gulf of Oman.",
        "Change: Air defense interceptions in North Red Sea up 15% in last 24h."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Shipping majors maintain extra war-risk assessments for the region.",
        "Change: Increased harassment leading some tankers to wait outside major ports."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI supported strongly above $90 level.",
        "Change: Surge in hedging option purchases for long-term supply disruption."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reaffirms commitment to freedom of navigation.",
        "Change: Iranian military high command warns of 'devastating response' to miscalculations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US maximum pressure vs. Iranian defensive deterrence.",
      "Global navigation safety vs. regional sovereignty claims."
    ],
    military: [
      "Asymmetry between US forward deployment and proxy warfare capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78,
      active: true
    }
  ],
  keyChange: "US carrier entry shifts posture from passive defense to active suppression.",
  investmentSignal: "→ Maintain energy and safe-haven asset positions; adopt defensive hedging for risk assets.",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.64 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（持平）：美航母入湾标志着军事威慑从防御转为主动压制。",
    bannerWarning: "→ 维持能源与避险资产仓位，对风险资产采取防御性布局。",
    deescalationIntent: "美方极限施压策略与伊朗防御性威慑的结构性对立。",
    structuralRisk: "无人机骚扰事件频发，航运保险成本激增导致部分班轮绕行。",
    contradictionNote: "美方极限施压策略与伊朗防御性威慑的结构性对立。；美军前沿部署增加与代理人武装不对称作战的风险不对等。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第75天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.64 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (Flat): US carrier entry shifts posture from passive defense to active suppression.",
    bannerWarning: "→ Maintain energy and safe-haven asset positions; adopt defensive hedging for risk assets.",
    deescalationIntent: "US maximum pressure vs. Iranian defensive deterrence.",
    structuralRisk: "Frequent drone harassment incidents and soaring insurance premiums.",
    contradictionNote: "US maximum pressure vs. Iranian defensive deterrence.; Asymmetry between US forward deployment and proxy warfare capabilities.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 75",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
