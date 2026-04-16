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
  date: "2026-04-16",
  version: "v2.32",
  keyStats: [
    {
      label: "冲突天数",
      value: "D47",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $82.40–$84.50 · Brent $87.10–$89.20 · 震荡回落",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "流量回升",
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
      description: "美伊直接打击行动暂缓，但双方在叙利亚与伊拉克边界的代理人摩擦依然高发。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "海峡封锁风险降低，商船流量在保险费率企稳后开始出现季节性反弹。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价进入震荡区间，WTI 区间主体维持在 $80 以上，符合 rubric 3 档特征。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "大国维持前线军事存在，多边外交介入尚未转化为实际脱离接触。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "虽然举行了安理会会议，但双方未达成任何共识，停战立场差距巨大。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双边直接报复循环进入 48 小时观察窗口期",
      "航道危机由封锁风险转为常态化查验压力",
      "全球能源市场地缘溢价正被供需基本面部分冲抵"
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
        "变化：美伊直接打击行动暂缓，但双方在叙利亚与伊拉克边界的代理人摩擦依然高发。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡封锁风险降低，商船流量在保险费率企稳后开始出现季节性反弹。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价进入震荡区间，WTI 区间主体维持在 $80 以上，符合 rubric 3 档特征。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：大国维持前线军事存在，多边外交介入尚未转化为实际脱离接触。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方制裁升级与伊方反制裁生存空间的冲突",
      "国内政治压力要求维持强硬姿态与国际避战诉求的矛盾"
    ],
    military: [
      "代理人骚扰导致的不受控升级风险与主力军规避全面战争的平衡"
    ]
  },
  scoreTrend: [
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72,
      active: true
    }
  ],
  keyChange: "霍尔木兹航运流量出现显著回升，直接缓解了全球供应链的极端恐慌。",
  investmentSignal: "→ 减持 部分高溢价能源多头，维持 防御 性风险资产对冲以应对尾部波动。",
  change: "down",
  events: [
    {
      id: "EVT-01",
      title: "联合国安理会紧急会议无果",
      description: "美伊代表在纽约联合国总部进行激烈辩论，未达成任何停火或缓和书面协议，维持现状。",
      verification: "confirmed",
      timestamp: "2026-04-16 02:00",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "波斯湾航道流量回升",
      description: "彭博数据显示过去 24 小时内有 15 艘大型原油轮顺利穿过霍尔木兹海峡，未遭伊朗海军骚扰。",
      verification: "confirmed",
      timestamp: "2026-04-16 04:30",
      significance: "",
      highlight: true
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-16",
  version: "v2.32",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D47",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $82.40–$84.50 · Brent $87.10–$89.20 · 震荡回落",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Traffic Recovering",
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
      description: "Direct strikes paused, but proxy skirmishes along borders remain active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Blockade risk easing; commercial traffic rebounding as insurance premiums stabilize.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices in volatile range; WTI remains above $80, consistent with rubric score 3.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. maintains dual carrier presence; diplomatic engagement hasn't triggered disengagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Negotiation channels remain unofficial; high risk of collapse persists.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Retaliation cycle enters a 48-hour observational window.",
      "Chokepoint crisis shifts from blockade risk to routine inspection pressure.",
      "Market risk premiums are being offset by supply-demand fundamentals."
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
        "Change: Direct strikes paused, but proxy skirmishes along borders remain active."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Blockade risk easing; commercial traffic rebounding as insurance premiums stabilize."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Prices in volatile range; WTI remains above $80, consistent with rubric score 3."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: U.S.",
        "Change: maintains dual carrier presence; diplomatic engagement hasn't triggered disengagement."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between U.S. sanctions and Iranian survival counter-measures.",
      "Tension between domestic hawkishness and international de-escalation needs."
    ],
    military: [
      "Balancing proxy-led accidental escalation vs. conventional war avoidance."
    ]
  },
  scoreTrend: [
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72,
      active: true
    }
  ],
  keyChange: "Significant rebound in Hormuz shipping traffic has alleviated extreme global supply chain panic.",
  investmentSignal: "→ Trim high-premium energy longs; maintain defensive asset hedges for tail risks.",
  change: "down",
  events: [
    {
      id: "EVT-01",
      title: "UNSC Emergency Session Deadlocked",
      description: "Intense debate in NYC concludes without a formal ceasefire agreement.",
      verification: "confirmed",
      timestamp: "2026-04-16 02:00",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Persian Gulf Traffic Rebound",
      description: "15 VLCCs successfully transited the strait without harassment in 24 hours.",
      verification: "confirmed",
      timestamp: "2026-04-16 04:30",
      significance: "",
      highlight: true
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.32 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓4）：霍尔木兹航运流量出现显著回升，直接缓解了全球供应链的极端恐慌。",
    bannerWarning: "→ 减持 部分高溢价能源多头，维持 防御 性风险资产对冲以应对尾部波动。",
    deescalationIntent: "美方制裁升级与伊方反制裁生存空间的冲突",
    structuralRisk: "海峡封锁风险降低，商船流量在保险费率企稳后开始出现季节性反弹。",
    contradictionNote: "美方制裁升级与伊方反制裁生存空间的冲突；代理人骚扰导致的不受控升级风险与主力军规避全面战争的平衡",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第47天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.32 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓4): Significant rebound in Hormuz shipping traffic has alleviated extreme global supply chain panic.",
    bannerWarning: "→ Trim high-premium energy longs; maintain defensive asset hedges for tail risks.",
    deescalationIntent: "Clash between U.S. sanctions and Iranian survival counter-measures.",
    structuralRisk: "Blockade risk easing; commercial traffic rebounding as insurance premiums stabilize.",
    contradictionNote: "Clash between U.S. sanctions and Iranian survival counter-measures.; Balancing proxy-led accidental escalation vs. conventional war avoidance.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 47",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
