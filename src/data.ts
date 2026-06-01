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
  date: "2026-06-01",
  version: "v2.82",
  riskScore: 64,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D93",
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
      value: "WTI $86.4–$89.2 · Brent $90.7–$93.6",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "代理冲突处于低烈度僵持，未发生大范围直接军事行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗军方维持密集侦察，通行效率持续受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在关键支撑位企稳，地缘风险溢价完全计入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在该地区维持两个航母战斗群，介入烈度保持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "间接对话渠道维持开启，双方表现出有限的风险管控意愿。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊阿曼间接会谈",
      description: "双方在阿曼协调下就降低霍尔木兹海峡局势烈度交换了非正式提议。",
      verification: "confirmed",
      timestamp: "2026-06-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "油价高位平台盘整",
      description: "受地缘担忧与库存变动交织影响，国际油价维持在每桶 90 美元上方区间波动。",
      verification: "confirmed",
      timestamp: "2026-06-01",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "核心矛盾由正面冲突转入海上封锁与反封锁博弈",
      "外交渠道作为『安全阀』正在发挥作用，防止误判升级",
      "能源市场的长期地缘溢价已形成心理预期"
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
        "延续：美军在该地区执行高频次海空联巡",
        "延续：伊朗保持在该地区的海军演习频率"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要商业保险公司维持极高战争险溢价",
        "变化：暂无新的油轮遭遇强行扣押，干扰以『身份核查』为主"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场正消化地缘政治利好，缺乏进一步推升油价的实质性供应中断事实"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国重申对盟友航行自由的承诺",
        "变化：伊朗最高领袖讲话中未提及具体的报复升级计划，释放观望信号"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊之间缺乏互信导致的长期战略误判风险",
      "伊朗要求全面解除制裁与美国要求停止代理人武装的立场对立"
    ],
    military: [
      "霍尔木兹海峡实际控制权与国际航行权之争",
      "区域内非常规武装对美方基地的潜在渗透风险"
    ]
  },
  scoreTrend: [
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64,
      active: true
    }
  ],
  keyChange: "冲突进入高位僵持期，外交试探虽活跃但尚未触及结构性降温。",
  investmentSignal: "→ 维持防御性大宗商品配置，适度对冲能源波动。",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-01",
  version: "v2.82",
  riskScore: 64,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D93",
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
      value: "WTI $86.4–$89.2 · Brent $90.7–$93.6",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy conflicts remain at a low-intensity stalemate; no large-scale direct kinetic action reported.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iranian military maintains intensive surveillance; throughput efficiency remains severely restricted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices stabilized at key support levels as geopolitical premiums are fully baked in.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains two carrier strike groups in theater; intervention intensity remains elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Indirect channels remain active; both sides show limited intent to manage escalation risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Oman Indirect Talks",
      description: "Both sides exchanged informal proposals via Omani mediators to de-escalate tension in the Strait.",
      verification: "confirmed",
      timestamp: "2026-06-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Plateau",
      description: "International oil prices fluctuated above $90/bbl, driven by geopolitical concerns and inventory data.",
      verification: "confirmed",
      timestamp: "2026-06-01",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict shifted from frontal clashes to maritime blockade and anti-blockade maneuvering",
      "Diplomatic channels act as 'safety valves' preventing miscalculation",
      "Long-term geopolitical premium in energy markets has formed psychological expectations"
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
        "Continue: US forces conduct high-frequency joint air and sea patrols",
        "Continue: Iran maintains regular naval exercises in the region"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major commercial insurers maintain high war risk premiums",
        "Change: No new forced vessel detentions; interference mainly via 'ID checks'"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market digesting geopolitical news; lack of substantive supply shocks to drive further price spikes"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US reiterates commitment to freedom of navigation for allies",
        "Change: Iranian Supreme Leader’s speech omitted specific escalation plans, signaling a wait-and-see stance"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Persistent strategic miscalculation risks due to lack of mutual trust",
      "Opposition between Iranian demands for sanction relief and US demands for an end to proxies"
    ],
    military: [
      "Conflict between de facto control of the Strait and international navigation rights",
      "Potential infiltration risks of US bases by irregular armed groups"
    ]
  },
  scoreTrend: [
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64,
      active: true
    }
  ],
  keyChange: "Conflict has entered a high-level stalemate; diplomatic probes are active but yet to reach structural cooling.",
  investmentSignal: "→ Maintain defensive commodity allocations and moderate energy hedging.",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.82 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：冲突进入高位僵持期，外交试探虽活跃但尚未触及结构性降温。",
    bannerWarning: "→ 维持防御性大宗商品配置，适度对冲能源波动。",
    deescalationIntent: "美伊之间缺乏互信导致的长期战略误判风险",
    structuralRisk: "伊朗军方维持密集侦察，通行效率持续受限。",
    contradictionNote: "美伊之间缺乏互信导致的长期战略误判风险；霍尔木兹海峡实际控制权与国际航行权之争",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第93天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.82 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): Conflict has entered a high-level stalemate; diplomatic probes are active but yet to reach structural cooling.",
    bannerWarning: "→ Maintain defensive commodity allocations and moderate energy hedging.",
    deescalationIntent: "Persistent strategic miscalculation risks due to lack of mutual trust",
    structuralRisk: "Iranian military maintains intensive surveillance; throughput efficiency remains severely restricte…",
    contradictionNote: "Persistent strategic miscalculation risks due to lack of mutual trust; Conflict between de facto control of the Strait and international navigation rights",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 93",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
