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
  date: "2026-04-23",
  version: "v2.41",
  riskScore: 76,
  keyStats: [
    {
      label: "冲突天数",
      value: "D54",
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
      value: "WTI $86.50–$89.90 · Brent $91.20–$93.80",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行严重受限",
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
      description: "直接交火威胁与大规模演习活跃",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "物理封锁与流量剧减",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "供应担忧推高溢价，但尚未触及 100 美元",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军防御性部署与情报支援",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判渠道停滞，双方立场极端强硬",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC 启动波斯湾大规模实弹演习",
      description: "演习覆盖霍尔木兹海峡关键航道，包括模拟打击敌方海上编队（AP/IRNA）",
      verification: "confirmed",
      timestamp: "2026-04-23 06:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军拦截两架胡塞武装自杀式无人机",
      description: "红海南部防御行动，旨在保护盟国商船免受袭击（CENTCOM）",
      verification: "confirmed",
      timestamp: "2026-04-23 03:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "主流油轮保费上调 30%",
      description: "由于波斯湾演习风险，保险机构普遍上调途径区域的战争险溢价（FT/Bloomberg）",
      verification: "partial",
      timestamp: "2026-04-22 18:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "实弹演习常态化作为封锁手段",
      "航运流量跌破临界点（50%）",
      "美军被动拦截频率增加"
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
        "变化：伊朗启动“伟大先知21”演习，演习区重合国际航道。",
        "延续：美军在红海南部维持防御性拦截频率。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于实弹射击，劳氏日报确认海峡油轮通过量骤降 58%。",
        "延续：保险商将波斯湾海域列为“高危/除外”区。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 原油站稳 90 美元关口，区间上移至 $91-$94。",
        "延续：实物原油升水（Premium）因供应担忧持续扩大。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗官方表态不排除通过法律手段永久关闭受威胁航道。",
        "延续：华盛顿维持制裁高压且无新停火提议。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方去风险化要求与伊方解除制裁诉求的结构性对立",
      "大选年背景下美国政府的克制性军事介入策略"
    ],
    military: [
      "伊朗的“演习即封锁”策略与美方“护航行动”的摩擦升级",
      "代理人（胡塞）在红海的滋扰与波斯湾局势的联动效应"
    ]
  },
  scoreTrend: [
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72
    },
    {
      date: "04-21",
      score: 76
    },
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 76,
      active: true
    }
  ],
  keyChange: "伊朗通过实弹演习将“软封锁”升级为物理威慑，航运量跌破 D50 历史极值。",
  investmentSignal: "→ 对冲能源头寸，维持防御性风险资产配置，关注避险大宗商品。",
  change: "none",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-23",
  version: "v2.41",
  riskScore: 76,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D54",
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
      value: "WTI $86.50–$89.90 · Brent $91.20–$93.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Highly Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct fire threats and major military drills",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Physical blockade and massive volume drop",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Supply anxiety lifting premiums",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Defensive US posture and intel sharing",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Channels stagnant, hardened stances",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Launches Major Drills in Persian Gulf",
      description: "Exercises cover key shipping lanes, simulating strikes on maritime assets (AP/IRNA)",
      verification: "confirmed",
      timestamp: "2026-04-23 06:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Intercepts Two Houthi Suicide Drones",
      description: "Defensive action in southern Red Sea to protect merchant shipping (CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-04-23 03:30",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Tanker Insurance Premiums Up 30%",
      description: "Insurers hike war risk premiums following IRGC live-fire drills (FT/Bloomberg)",
      verification: "partial",
      timestamp: "2026-04-22 18:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Normalized drills used as blockade mechanism",
      "Shipping volume drops below critical 50% threshold",
      "Frequency of defensive US intercepts increasing"
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
        "Change: Iran starts Great Prophet 21, drill zones overlap international lanes.",
        "Continue: US CENTCOM maintains defensive interception frequency in Red Sea."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tanker volume drops 58% as verified by Lloyd's List due to fire zones.",
        "Continue: Insurers classify Persian Gulf as High Risk/Excluded zone."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude stabilizes above $90, shifting range to $91-$94.",
        "Continue: Crude premiums expand due to persistent supply disruption fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran signals potential permanent closure of lanes if threatened.",
        "Continue: Washington maintains maximum sanctions with no new ceasefire offers."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Structural clash between US de-risking and Iran's sanction-lift demands",
      "US restraint strategy during an election year vs IRGC pressure"
    ],
    military: [
      "Iran's 'drill-as-blockade' vs US naval escort friction",
      "Red Sea proxy linkage to Persian Gulf escalation"
    ]
  },
  scoreTrend: [
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72
    },
    {
      date: "04-21",
      score: 76
    },
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 76,
      active: true
    }
  ],
  keyChange: "Iran transitions from soft to physical blockade through drills, dropping shipping to historic lows.",
  investmentSignal: "→ Hedge energy positions, maintain defensive risk asset allocation, focus on safe-haven commodities.",
  change: "none",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.41 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：伊朗通过实弹演习将“软封锁”升级为物理威慑，航运量跌破 D50 历史极值。",
    bannerWarning: "→ 对冲能源头寸，维持防御性风险资产配置，关注避险大宗商品。",
    deescalationIntent: "美方去风险化要求与伊方解除制裁诉求的结构性对立",
    structuralRisk: "物理封锁与流量剧减",
    contradictionNote: "美方去风险化要求与伊方解除制裁诉求的结构性对立；伊朗的“演习即封锁”策略与美方“护航行动”的摩擦升级",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第54天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.41 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Iran transitions from soft to physical blockade through drills, dropping shipping to historic lows.",
    bannerWarning: "→ Hedge energy positions, maintain defensive risk asset allocation, focus on safe-haven commodities.",
    deescalationIntent: "Structural clash between US de-risking and Iran's sanction-lift demands",
    structuralRisk: "Physical blockade and massive volume drop",
    contradictionNote: "Structural clash between US de-risking and Iran's sanction-lift demands; Iran's 'drill-as-blockade' vs US naval escort friction",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 54",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
