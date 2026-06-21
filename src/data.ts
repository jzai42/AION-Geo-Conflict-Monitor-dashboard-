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
  date: "2026-06-21",
  version: "v2.102",
  riskScore: 40,
  keyStats: [
    {
      label: "冲突天数",
      value: "D113",
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
      value: "WTI $80.12–$81.85 · Brent $84.35–$85.90",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行基本正常",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊双方无直接军事交火，地区防御姿态稳定。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "航道流量保持高位，无安全事故报告。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价在 $80-$86 区间震荡，地缘政治溢价收缩。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "中、俄、美维持既定外交立场，无新增介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "间接谈判持续，外交渠道畅通。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊马斯喀特间接谈判确认持续",
      description: "阿曼外交部发布简报，确认双方代表正就缓和地区紧张局势进行技术性细节磋商。",
      verification: "confirmed",
      timestamp: "2026-06-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "五角大楼称中东战备状态无调整",
      description: "DoD 发言人表示，尽管区域性代理摩擦偶发，但美军核心部署维持防御性，旨在保护航运自由。",
      verification: "confirmed",
      timestamp: "2026-06-20",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接对抗意愿降至 D30 以来最低点",
      "外交斡旋成为主导冲突走向的核心变量",
      "地缘政治溢价逐步从能源价格中剥离"
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
        "延续：美军在约旦及伊拉克基地维持标准防御等级。",
        "延续：伊朗伊斯兰革命卫队（IRGC）未举行新增演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业轮渡与油轮通行顺畅，保险费率企稳。",
        "变化：由于安全预期改善，部分班轮公司恢复夜间通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场注意力由冲突升级转向 OPEC+ 下季度配额预期。",
        "延续：美伊局势对油价的边际提振作用持续递减。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗最高领袖表态倾向于内部经济稳定及有限外交转圜。",
        "变化：美国白宫近期言辞降温，侧重于人道主义准入谈判。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求解除核心制裁与美国要求停止核扩大的死结尚未完全解开。",
      "地区盟友（如黎巴嫩、也门）的行动仍具备潜在破坏外交成果的风险。"
    ],
    military: [
      "防御性部署与误判风险之间的平衡极度脆弱。"
    ]
  },
  scoreTrend: [
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40,
      active: true
    }
  ],
  keyChange: "美伊间接谈判进入技术细节阶段，冲突风险处于可控低位。",
  investmentSignal: "→ 维持风险资产头寸，对冲能源波动风险。",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-21",
  version: "v2.102",
  riskScore: 40,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D113",
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
      value: "WTI $80.12–$81.85 · Brent $84.35–$85.90",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Transit Normal",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "No direct military engagement; posture remains defensive.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Shipping volume remains high with no reported incidents.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices range $80-$86; geopolitical premium retreating.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Main actors focused on diplomatic mediation rather than deployment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Indirect talks continue via Omani mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Omani Mediators Confirm Ongoing US-Iran Talks",
      description: "Indirect technical discussions regarding sanctions relief and regional security are proceeding in Muscat.",
      verification: "confirmed",
      timestamp: "2026-06-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Pentagon Reports No Change in Middle East Posture",
      description: "US forces maintain a standard defensive stance despite minor regional proxy skirmishes.",
      verification: "confirmed",
      timestamp: "2026-06-20",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct confrontation appetite at lowest level since D30",
      "Mediation remains the primary driver of the conflict's trajectory",
      "Geopolitical premium decoupling from energy markets"
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
        "Continue: US bases in Jordan/Iraq maintain standard defensive status.",
        "Continue: IRGC reports no new naval or missile drills."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping and tankers transiting smoothly.",
        "Change: Some liners resuming night transits due to improved safety outlook."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market focus shifting from conflict to OPEC+ quarterly quotas.",
        "Continue: Marginal impact of US-Iran tension on oil prices continues to diminish."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Khamenei favoring economic stability and limited diplomatic flexibility.",
        "Change: White House rhetoric cooling, focusing on humanitarian access."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Core deadlock between sanction relief and nuclear limits remains unresolved.",
      "Proxy behavior remains a wild card for diplomatic efforts."
    ],
    military: [
      "Fragile balance between defensive posture and miscalculation risks."
    ]
  },
  scoreTrend: [
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40,
      active: true
    }
  ],
  keyChange: "US-Iran indirect talks enter technical phase, keeping risk level controlled.",
  investmentSignal: "→ Maintain risk asset positions; hedge energy volatility.",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.102 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美伊间接谈判进入技术细节阶段，冲突风险处于可控低位。",
    bannerWarning: "→ 维持风险资产头寸，对冲能源波动风险。",
    deescalationIntent: "伊朗要求解除核心制裁与美国要求停止核扩大的死结尚未完全解开。",
    structuralRisk: "航道流量保持高位，无安全事故报告。",
    contradictionNote: "伊朗要求解除核心制裁与美国要求停止核扩大的死结尚未完全解开。；防御性部署与误判风险之间的平衡极度脆弱。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第113天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.102 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): US-Iran indirect talks enter technical phase, keeping risk level controlled.",
    bannerWarning: "→ Maintain risk asset positions; hedge energy volatility.",
    deescalationIntent: "Core deadlock between sanction relief and nuclear limits remains unresolved.",
    structuralRisk: "Shipping volume remains high with no reported incidents.",
    contradictionNote: "Core deadlock between sanction relief and nuclear limits remains unresolved.; Fragile balance between defensive posture and miscalculation risks.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 113",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
