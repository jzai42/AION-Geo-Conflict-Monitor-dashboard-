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
  date: "2026-05-18",
  version: "v2.68",
  keyStats: [
    {
      label: "冲突天数",
      value: "D79",
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
      value: "WTI $92.40–$95.10 · Brent $96.80–$99.20",
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
      description: "直接对峙持续，伊朗举行模拟封锁演习提升冲突烈度预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道维持非对称管制状态，商业航运流量处于历史低点。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价整体下行至 $85–100 区间，市场从极度恐慌转向基本面博弈。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方持续增派海军力量，大国军事存在处于高度临战状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "秘密谈判渠道完全中断，外交回旋空间消失。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  scoreTrend: [
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80,
      active: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊外交通道正式宣布停滞，危机进入中长期对峙模式。",
      "伊朗封锁演习表明其战术储备已转向实战封锁。 ",
      "市场对冲突的直接恐慌正在演变为对长期供应链重构的定价。"
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
        "变化：伊朗开始“苏莱曼尼”级护卫舰领衔的封锁演习，模拟饱和攻击模式。",
        "延续：美方维持无人机全天候巡逻，并增调防空力量至沙特东部基地。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海运保险费率维持高位，霍尔木兹海峡商业流量减少 60% 以上。",
        "变化：由于美方护航力量增强，偶发扣押风险略有下降但封锁威胁上升。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI 与 Brent 区间下移至 $100 以下，反映需求端压力对冲风险溢价。",
        "延续：IEA 警告若封锁长期化，秋季将出现结构性原油短缺。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：阿曼外交渠道在经历了 12 周尝试后宣布无效。",
        "延续：白宫维持“最大程度经济施压”政策，伊朗拒绝对话。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的制裁解除先验要求与美国的铀浓缩先行限制之间无法调和。",
      "区域盟友（以色列/沙特）对美方外交妥协的极度不信任。"
    ],
    military: [
      "美军前哨部署的防御性质与伊朗视为进攻准备的误判风险。"
    ]
  },
  keyChange: "谈判渠道正式中断导致‘降级/谈判前景’因子从 4 升至 5，抵消了‘能源冲击’因价格回落从 4 降至 3 的影响，总分保持 80 分。",
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，防御性对冲风险资产。",
  prevRiskScore: 80,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "直接对峙持续，伊朗举行模拟封锁演习提升冲突烈度预期",
      description: "直接对峙持续，伊朗举行模拟封锁演习提升冲突烈度预期。",
      verification: "single",
      timestamp: "2026-05-18（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "航道维持非对称管制状态，商业航运流量处于历史低点",
      description: "航道维持非对称管制状态，商业航运流量处于历史低点。",
      verification: "single",
      timestamp: "2026-05-18（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-18",
  version: "v2.68",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D79",
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
      value: "WTI $92.40–$95.10 · Brent $96.80–$99.20",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
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
      description: "Direct standoff continues; Iran’s drills heighten expectations of potential escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The waterway remains under asymmetric control with historic lows in commercial traffic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices retreated to the $85–100 range as markets shift focus to fundamentals.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US continues deploying naval assets, keeping forces in a high state of combat readiness.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Secret diplomatic channels have completely broken down; no room for maneuver remains.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  scoreTrend: [
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80,
      active: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Diplomatic channels officially stalled, moving the crisis into a medium-term standoff.",
      "Iran's blockade drills suggest tactical shift toward actual maritime denial.",
      "Market fear is evolving into pricing for long-term supply chain restructuring."
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
        "Change: Iran IRGC initiated blockade drills simulating saturation attacks with corvette leaders.",
        "Continue: US maintains 24/7 drone surveillance and reinforced air defense in Eastern Saudi Arabia."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Insurance rates remain high; commercial traffic in Hormuz reduced by over 60%.",
        "Change: Enhanced US escort presence slightly lowered seizure risk but increased blockade threats."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: WTI and Brent range shifted below $100, reflecting demand-side pressure.",
        "Continue: IEA warns of structural crude shortages by autumn if blockade persists."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oman diplomatic channel declared ineffective after 12 weeks of efforts.",
        "Continue: White House maintains 'maximum pressure'; Iran refuses direct dialogue."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable gap between Iran's sanctions relief demands and US enrichment limits.",
      "Regional allies' (Israel/Saudi) profound distrust of any potential diplomatic compromise."
    ],
    military: [
      "Risk of miscalculating US defensive posture as offensive preparation."
    ]
  },
  keyChange: "The official breakdown of negotiations increased the factor score to 5, offsetting the drop in energy shock to 3, keeping the composite score at 80.",
  investmentSignal: "→ Maintain defensive positions in energy and commodities; hedge risk assets.",
  prevRiskScore: 80,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Direct standoff continues",
      description: "Direct standoff continues; Iran’s drills heighten expectations of potential escalation.",
      verification: "single",
      timestamp: "2026-05-18 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "The waterway remains under asymmetric control with historic lows in commercial traffic",
      description: "The waterway remains under asymmetric control with historic lows in commercial traffic.",
      verification: "single",
      timestamp: "2026-05-18 (same-day reporting)",
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
    node406: "5月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.68 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：谈判渠道正式中断导致‘降级/谈判前景’因子从 4 升至 5，抵消了‘能源冲击’因价格回落从 4 降至 3 的影响，总分保持 80 分。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，防御性对冲风险资产。",
    deescalationIntent: "伊朗的制裁解除先验要求与美国的铀浓缩先行限制之间无法调和。",
    structuralRisk: "航道维持非对称管制状态，商业航运流量处于历史低点。",
    contradictionNote: "伊朗的制裁解除先验要求与美国的铀浓缩先行限制之间无法调和。；美军前哨部署的防御性质与伊朗视为进攻准备的误判风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第79天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.68 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): The official breakdown of negotiations increased the factor score to 5, offsetting the drop in energy shock to 3, keeping the composite sco…",
    bannerWarning: "→ Maintain defensive positions in energy and commodities; hedge risk assets.",
    deescalationIntent: "Irreconcilable gap between Iran's sanctions relief demands and US enrichment li…",
    structuralRisk: "The waterway remains under asymmetric control with historic lows in commercial traffic.",
    contradictionNote: "Irreconcilable gap between Iran's sanctions relief demands and US enrichment limits.; Risk of miscalculating US defensive posture as offensive preparation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 79",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
