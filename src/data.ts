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
  date: "2026-07-08",
  version: "v2.119",
  keyStats: [
    {
      label: "冲突天数",
      value: "D130",
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
      value: "WTI $74.20–$76.80 · Brent $78.50–$81.20",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "代理冲突与防御性拦截频发。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "实质性管控影响通行效率。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 1.5,
      weight: 0.2,
      description: "油价重心随航道风险上移。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方维持直接军事部署与制裁压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "谈判渠道存在但处于停滞状态。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  riskScore: 64,
  scoreTrend: [
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64,
      active: true
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "IRGC 48小时预通报制度常态化",
      "美军加强波斯湾周边防空拦截频率",
      "能源市场开始对航运延误定价"
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
        "延续：美方维持对代理武装无人机的近海拦截（DoD）。",
        "延续：伊朗保持二线导弹部队高度戒备，无直接攻击迹象。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：强制性预报制度导致苏伊士型及以上油轮平均通航时间增加（Lloyd's List）。",
        "延续：美方驱逐舰对关键货轮实施间歇性护航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价突破 $75/80 阻力带，受海峡管控政策直接提振（Reuters）。",
        "变化：欧亚航运保费连续第三日小幅跳升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰重申主权管辖权，要求西方减少军事存在。",
        "变化：白宫声明称正与盟友讨论进一步的航运保障方案。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的“行政封锁”主张与美国的“自由航行”规则的对抗。"
    ],
    military: [
      "非接触式防空消耗战对美军前沿部署的持续性压力。"
    ]
  },
  keyChange: "霍尔木兹海峡从偶发事件区转变为制度化受限区，推高全球能源溢价。",
  investmentSignal: "→ 增持能源与大宗商品防御头寸，对冲风险资产敞口。",
  change: "up",
  prevRiskScore: 62,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "代理冲突与防御性拦截频发",
      description: "代理冲突与防御性拦截频发。",
      verification: "single",
      timestamp: "2026-07-08（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "实质性管控影响通行效率",
      description: "实质性管控影响通行效率。",
      verification: "single",
      timestamp: "2026-07-08（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-08",
  version: "v2.119",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D130",
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
      value: "WTI $74.20–$76.80 · Brent $78.50–$81.20",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy conflicts and defensive intercepts are frequent.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Substantial control measures affecting transit efficiency.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 1.5,
      weight: 0.2,
      description: "Oil price baseline shifted up due to maritime risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US military deployment and persistent sanctions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Negotiation channels exist but are in a state of stagnation.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  riskScore: 64,
  scoreTrend: [
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64,
      active: true
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Institutionalization of IRGC 48h pre-notification system",
      "Increased frequency of US air defense intercepts in the Gulf",
      "Market begins pricing in prolonged shipping delays"
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
        "Continue: US maintains offshore intercepts of proxy-launched UAVs (DoD).",
        "Continue: Iran keeps second-line missile units on high alert with no direct attack signs."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Mandatory notification system increased average transit time for Suezmax+ tankers (Lloyd's List).",
        "Continue: US destroyers provide intermittent escort for critical cargo."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices broke $75/80 resistance, buoyed by Strait control policies (Reuters).",
        "Change: Shipping insurance premiums jumped for the third consecutive day."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran reaffirms sovereign jurisdiction over the Strait.",
        "Change: White House says it's discussing further shipping security options with allies."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Confrontation between Iran's 'administrative blockade' and US 'Freedom of Navigation' rules."
    ],
    military: [
      "Sustained pressure on US forward deployment from non-contact air defense attrition."
    ]
  },
  keyChange: "Strait of Hormuz transitioned from an incident zone to a structurally restricted zone, driving up energy premiums.",
  investmentSignal: "→ Overweight energy and commodities; hedge risk asset exposure.",
  change: "up",
  prevRiskScore: 62,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Proxy conflicts and defensive intercepts are frequent",
      description: "Proxy conflicts and defensive intercepts are frequent.",
      verification: "single",
      timestamp: "2026-07-08 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Substantial control measures affecting transit efficiency",
      description: "Substantial control measures affecting transit efficiency.",
      verification: "single",
      timestamp: "2026-07-08 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.119 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（↑2）：霍尔木兹海峡从偶发事件区转变为制度化受限区，推高全球能源溢价。",
    bannerWarning: "→ 增持能源与大宗商品防御头寸，对冲风险资产敞口。",
    deescalationIntent: "伊朗的“行政封锁”主张与美国的“自由航行”规则的对抗。",
    structuralRisk: "实质性管控影响通行效率。",
    contradictionNote: "伊朗的“行政封锁”主张与美国的“自由航行”规则的对抗。；非接触式防空消耗战对美军前沿部署的持续性压力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第130天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.119 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (↑2): Strait of Hormuz transitioned from an incident zone to a structurally restricted zone, driving up energy premiums.",
    bannerWarning: "→ Overweight energy and commodities; hedge risk asset exposure.",
    deescalationIntent: "Confrontation between Iran's 'administrative blockade' and US 'Freedom of Navig…",
    structuralRisk: "Substantial control measures affecting transit efficiency.",
    contradictionNote: "Confrontation between Iran's 'administrative blockade' and US 'Freedom of Navigation' rules.; Sustained pressure on US forward deployment from non-contact air …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 130",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
