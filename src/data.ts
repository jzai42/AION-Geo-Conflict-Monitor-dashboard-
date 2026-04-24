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
  date: "2026-04-24",
  version: "v2.42",
  keyStats: [
    {
      label: "冲突天数",
      value: "D55",
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
      value: "WTI $88.52–91.45 · Brent $92.30–95.88",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "代理人对美军基地袭击频次增加，美军航母编队到位，处于直接交火边缘。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡维持实际封锁或严密管控状态，商业航运流量较常态萎缩 60% 以上。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在 $90 上方高位震荡，市场已消化长期扰动预期，尚未触及百美元危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事部署显著增强；中俄维持外交观望，未见更深层次的军事入场。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中立调停国（卡塔尔）释放极悲观信号，官方接触几乎中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军航母打击群完成部署",
      description: "DoD 确认“林肯”号抵达预定区域，提供区域拒止能力。",
      verification: "confirmed",
      timestamp: "2026-04-24T02:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "卡塔尔外交调停失败",
      description: "由于在制裁解除顺序上无法对齐，卡塔尔称调停陷入实质停滞。",
      verification: "confirmed",
      timestamp: "2026-04-24T08:00:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "实物封锁转为常态化管控",
      "代理人骚扰作为谈判筹码",
      "地缘溢价计入长期资产定价"
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
        "变化：美军从单一防御转向“攻势部署”，航母编队进入作战阵位。",
        "延续：代理人武装利用自杀式无人机持续向美军基地施压。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗革命卫队海军维持霍尔木兹海峡“限制通行”区，航道极其拥堵。",
        "变化：更多二线航运公司宣布停止接受波斯湾订单。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油在 $92-$96 区间窄幅波动，市场静待供应实质减少的消息。",
        "延续：天然气价格受中东局势带动温和上涨。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方公开警告若伊朗再进行拦截将采取“非对称反应”。",
        "延续：德黑兰称封锁是为了反击“非法经济制裁”，立场无软化。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的封锁权要求与美国航行自由原则之间的根本对立",
      "德黑兰以危机迫使制裁解除与华盛顿拒绝先行让步的僵局"
    ],
    military: [
      "美军区域力量显著优势与伊朗非对称攻击能力的长期消耗战"
    ]
  },
  scoreTrend: [
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
      score: 76
    },
    {
      date: "04-24",
      score: 76,
      active: true
    }
  ],
  keyChange: "冲突进入高位僵持的“结构性紧张”状态，调停窗口实质性关闭。",
  investmentSignal: "→ 维持能源与大宗商品防御性多头，规避中东暴露度高的风险资产。",
  change: "none",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-24",
  version: "v2.42",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D55",
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
      value: "WTI $88.52–91.45 · Brent $92.30–95.88",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Increased proxy attacks on US bases; US carrier group in position; on the brink of direct engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Effective blockade or tight control maintained; commercial traffic down >60% from normal levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices oscillating above $90; market has priced in long-term disruption; yet to reach $100 crisis zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Significant US military deployment; China/Russia maintaining diplomatic observer status.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Mediators (Qatar) release highly pessimistic signals; official contact nearly severed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Carrier Strike Group Completes Deployment",
      description: "DoD confirms Lincoln CSG arrival to provide regional denial capabilities.",
      verification: "confirmed",
      timestamp: "2026-04-24T02:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Qatari Mediation Fails",
      description: "Mediation reaches a stalemate due to misalignment on sanction removal sequencing.",
      verification: "confirmed",
      timestamp: "2026-04-24T08:00:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Physical blockade shifts to normalized control",
      "Proxy harassment used as bargaining chips",
      "Geopolitical premium embedded in long-term pricing"
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
        "Change: US shifting from pure defense to 'offensive posture' with carrier deployment.",
        "Continue: Pro-Iran militias continue pressure on US bases via kamikaze drones."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: IRGCN maintains 'restricted zones' in Hormuz; channel remains highly congested.",
        "Change: More second-tier shipping firms stop accepting Persian Gulf orders."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude range-bound between $92-$96 awaiting news of actual supply cuts.",
        "Continue: Natural gas prices rising moderately tracking Mideast tensions."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US warns of 'asymmetric response' if further interceptions occur.",
        "Continue: Tehran justifies blockade as counter to 'illegal sanctions'; no softening."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Fundamental clash between Iranian blockade claims and US freedom of navigation.",
      "Deadlock between Tehran using crisis for sanction relief and DC refusing to blink."
    ],
    military: [
      "US regional dominance vs Iranian asymmetric capabilities in a war of attrition."
    ]
  },
  scoreTrend: [
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
      score: 76
    },
    {
      date: "04-24",
      score: 76,
      active: true
    }
  ],
  keyChange: "Conflict enters a high-plateau 'Structural Tension' phase with mediation channels effectively closed.",
  investmentSignal: "→ Maintain defensive longs in energy and commodities; hedge risk assets with Mideast exposure.",
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
    node406: "4月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.42 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：冲突进入高位僵持的“结构性紧张”状态，调停窗口实质性关闭。",
    bannerWarning: "→ 维持能源与大宗商品防御性多头，规避中东暴露度高的风险资产。",
    deescalationIntent: "伊朗的封锁权要求与美国航行自由原则之间的根本对立",
    structuralRisk: "海峡维持实际封锁或严密管控状态，商业航运流量较常态萎缩 60% 以上。",
    contradictionNote: "伊朗的封锁权要求与美国航行自由原则之间的根本对立；美军区域力量显著优势与伊朗非对称攻击能力的长期消耗战",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第55天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.42 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Conflict enters a high-plateau 'Structural Tension' phase with mediation channels effectively closed.",
    bannerWarning: "→ Maintain defensive longs in energy and commodities; hedge risk assets with Mideast exposure.",
    deescalationIntent: "Fundamental clash between Iranian blockade claims and US freedom of navigation.",
    structuralRisk: "Effective blockade or tight control maintained; commercial traffic down >60% from normal levels.",
    contradictionNote: "Fundamental clash between Iranian blockade claims and US freedom of navigation.; US regional dominance vs Iranian asymmetric capabilities in a war of attrition.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 55",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
