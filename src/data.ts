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
  date: "2026-07-19",
  version: "v2.130",
  riskScore: 98,
  change: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D141",
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
      value: "WTI $114.50–$121.20 · Brent $118.30–$125.10",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全中断",
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
      description: "美伊爆发直接本土打击与大规模导弹互射。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道全面封锁，商业航运清零。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4,
      weight: 0.2,
      description: "油价暴涨并进入危机区间，供应中断担忧加剧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "大国直接参战与全球阵营对抗白热化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "谈判渠道彻底关闭，处于全面战争动员状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军打击伊朗本土军事设施",
      description: "五角大楼证实美军对伊朗境内多处导弹基地和指挥中心实施了报复性空袭（Reuters）。",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "油价盘中突破 $125",
      description: "布伦特原油在交火消息传出后跳空高开并一度触及 $125/bbl（Bloomberg）。",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗封锁行动升级",
      description: "伊朗海军在海峡内布设大量水雷，导致航道事实上完全关闭（Associated Press）。",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "全面动力动员阶段",
      "跨国境导弹对攻",
      "全球能源供应实质性断裂"
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
        "变化：美伊转入直接的大规模空袭与反击循环。",
        "延续：代理人武装在叙利亚和黎巴嫩方向同步开火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡进入绝对封锁期，任何船只通行均面临导弹威胁。",
        "变化：全球保险巨头取消所有波斯湾航程保单。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于海峡封锁，市场已开始计算每日 2000 万桶的供应缺口。",
        "延续：美国宣布释放战略石油储备但未能遏制涨势。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗总统发表电视讲话称战争已由对方开启。",
        "变化：美国总统宣布对伊实施有史以来最严厉的单边封锁政策。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均无意退让，政治信誉已与军事胜败绑定。"
    ],
    military: [
      "高烈度导弹攻击与防御系统的饱和对抗导致冲突范围极速扩张。"
    ]
  },
  scoreTrend: [
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98,
      active: true
    }
  ],
  keyChange: "美伊正式进入直接战争状态，油价突破危机门槛。",
  investmentSignal: "→ 维持极端防御，对冲能源与大宗商品风险，减持风险资产。",
  prevRiskScore: 96,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-19",
  version: "v2.130",
  riskScore: 98,
  change: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D141",
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
      value: "WTI $114.50–$121.20 · Brent $118.30–$125.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Fully Suspended",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct state-on-state kinetic warfare between the U.S. and Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Complete blockage of the Strait of Hormuz.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4,
      weight: 0.2,
      description: "Oil prices breached the $120 crisis threshold.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct U.S. combat involvement; Russia and China heighten strategic alert.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Negotiation channels completely severed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "U.S. Strikes Iranian Mainland",
      description: "Pentagon confirms massive air strikes on Iranian missile bases in response to recent attacks (Reuters).",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Surge Past $125",
      description: "Brent crude touched $125/bbl intraday following news of kinetic escalation (Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Total Hormuz Blockade",
      description: "Commercial shipping activity in the Strait of Hormuz has dropped to zero (Lloyd's List).",
      verification: "confirmed",
      timestamp: "2026-07-19",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Full-scale mobilization",
      "Trans-border missile exchanges",
      "Global energy supply disruption"
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
        "Change: Transition to direct, high-intensity aerial and missile strikes.",
        "Continue: Multi-front proxy activity in Levant and Iraq."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Absolute maritime blockade enforced by active combat.",
        "Change: War risk insurance premiums render transit non-viable."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market pricing in a structural 20mbpd supply loss.",
        "Continue: SPR releases fail to offset geopolitical risk premium."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran declares the start of the 'Defensive War'.",
        "Change: Washington initiates wartime economic sanctions measures."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Political survival of leaderships now tied to military outcome."
    ],
    military: [
      "Offensive-defensive saturation is driving rapid theater expansion."
    ]
  },
  scoreTrend: [
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98,
      active: true
    }
  ],
  keyChange: "Direct U.S.-Iran war state confirmed as oil enters crisis zone.",
  investmentSignal: "→ Maintain extreme defensive posture, long energy and commodities, underweight risk assets.",
  prevRiskScore: 96,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.130 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 98（↑2）：美伊正式进入直接战争状态，油价突破危机门槛。",
    bannerWarning: "→ 维持极端防御，对冲能源与大宗商品风险，减持风险资产。",
    deescalationIntent: "美伊双方均无意退让，政治信誉已与军事胜败绑定。",
    structuralRisk: "航道全面封锁，商业航运清零。",
    contradictionNote: "美伊双方均无意退让，政治信誉已与军事胜败绑定。；高烈度导弹攻击与防御系统的饱和对抗导致冲突范围极速扩张。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第141天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.130 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 98 (↑2): Direct U.S.-Iran war state confirmed as oil enters crisis zone.",
    bannerWarning: "→ Maintain extreme defensive posture, long energy and commodities, underweight risk assets.",
    deescalationIntent: "Political survival of leaderships now tied to military outcome.",
    structuralRisk: "Complete blockage of the Strait of Hormuz.",
    contradictionNote: "Political survival of leaderships now tied to military outcome.; Offensive-defensive saturation is driving rapid theater expansion.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 141",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
