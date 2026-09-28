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
  date: "2026-09-28",
  version: "v2.205",
  riskScore: 60,
  keyChange: "美伊在纽约围绕霍尔木兹海峡分阶段开放展开斡旋接触，油价高位震荡但未脱离中高风险带，五维评分全面持平昨日。",
  change: "none",
  investmentSignal: "→ 维持防御资产与能源大宗对冲敞口，防范霍尔木兹谈判拉锯带来的脉冲性波动。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D212",
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
      value: "WTI $91.99–$96.54 · Brent $96.96–$101.24",
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
      description: "美军与伊朗军方维持战备威慑对峙，局部防空交火受控未向第三国纵深外溢。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "海峡仍处于许可制与高风险绕行状态，商业通航量较战前依然显著承压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI与Brent盘中宽幅震荡，中位维持在$95上方，布伦特盘中刺入$100上方后遇阻回落。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "外部大国维持海空护航及情报支援，未发生与区域大国的正面军事冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "美伊代表在联大周边通过中间人展开接触，但核心诉求差距过大，进展实质缓慢。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方均有意控制正面军事行动烈度，避免滑向全面战端",
      "博弈筹码集中于霍尔木兹海峡通行权与原油旁路输出通道的控制力",
      "外交谈判渠道虽保持运作，但双方底线交集有限，短期内缺乏决定性破局驱动"
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
        "变化：美军与伊朗军方维持战备威慑对峙，局部防空交火受控未向第三国纵深外溢。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡仍处于许可制与高风险绕行状态，商业通航量较战前依然显著承压。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI与Brent盘中宽幅震荡，中位维持在$95上方，布伦特盘中刺入$100上方后遇阻回落。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：外部大国维持海空护航及情报支援，未发生与区域大国的正面军事冲突。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求德黑兰永久放弃海峡封锁与区域代理人威胁，与伊朗要求优先无条件解除核心经济制裁存在结构性死结。"
    ],
    military: [
      "美军区域前沿军力部署必须维持对航道的威慑存在，而伊朗反舰与无人机阵地构成的非对称拒止威慑难以单方面撤除。"
    ]
  },
  scoreTrend: [
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62
    },
    {
      date: "09-26",
      score: 60
    },
    {
      date: "09-27",
      score: 60
    },
    {
      date: "09-28",
      score: 60,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊代表围绕海峡通行提议在纽约展开间接接触",
      description: "据彭博社与金融时报报道，伊朗代表团在联合国大会期间向中间斡旋方递交分阶段缓解海峡对峙的方案，美方表示关切重点仍在全面通航保障，双方立场仍有明显温差。",
      verification: "confirmed",
      timestamp: "2026-09-28T12:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "沙特经红海延布港东西输油管道恢复常态化输送",
      description: "路透社报道，沙特国家石油公司（Aramco）已完成遇袭管线的检修测试，东西管道日均输油量回升至约 350 万桶，有效缓解了波斯湾内部原油积压压力。",
      verification: "confirmed",
      timestamp: "2026-09-28T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "国际原油基准呈宽幅震荡态势",
      description: "Barchart 与 Trading Economics 行情数据显示，WTI 在 $91.99–$96.54 区间运行，Brent 在 $96.96–$101.24 之间剧烈震荡，地缘溢价与供需博弈使油价徘徊在危机临界线附近。",
      verification: "confirmed",
      timestamp: "2026-09-28T16:30:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-28",
  version: "v2.205",
  riskScore: 60,
  keyChange: "US-Iran mediation around phased Strait of Hormuz access continues in New York; oil prices fluctuate near the high risk band while five-factor scores remain unchanged.",
  change: "none",
  investmentSignal: "→ Maintain defensive positioning and energy commodity hedges against diplomatic impasse volatility.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D212",
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
      value: "WTI $91.99–$96.54 · Brent $96.96–$101.24",
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
      description: "US and Iranian militaries maintain defensive alert with limited air defense engagements that remain contained.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The strait remains subject to strict transit permits and extensive commercial rerouting.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI and Brent trade in a wide band above $95, with Brent testing the $100 threshold before pulling back.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "External powers provide maritime patrol presence and intelligence coordination without direct interstate warfare.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Indirect communications continue via mediators in New York, but substantial divergences preclude immediate breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both parties avoid unconstrained military escalation to prevent a wider regional conflict",
      "Strategic leverage centers on Strait of Hormuz navigation access and bypass pipeline flows",
      "Diplomatic channels operate continuously but minimal overlap in red lines keeps progress incremental"
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
        "Change: US and Iranian militaries maintain defensive alert with limited air defense engagements that remain contained."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The strait remains subject to strict transit permits and extensive commercial rerouting."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: WTI and Brent trade in a wide band above $95, with Brent testing the $100 threshold before pulling back."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: External powers provide maritime patrol presence and intelligence coordination without direct interstate warfare."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US insistence on verifiable cessation of regional choke-point threats directly clashes with Iran's prerequisite of comprehensive economic sanctions relief."
    ],
    military: [
      "US naval forward presence must enforce sea lane security while Iranian asymmetric missile and drone deterrent forces remain locked in place."
    ]
  },
  scoreTrend: [
    {
      date: "09-23",
      score: 58
    },
    {
      date: "09-24",
      score: 62
    },
    {
      date: "09-26",
      score: 60
    },
    {
      date: "09-27",
      score: 60
    },
    {
      date: "09-28",
      score: 60,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Maintain Indirect Technical Talks in New York Over Strait Reopening",
      description: "According to Bloomberg and the Financial Times, Iranian diplomats submitted a phased proposal to mediators regarding maritime passage, though the US remains cautious regarding enforcement conditions.",
      verification: "confirmed",
      timestamp: "2026-09-28T12:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Saudi Arabia Sustains 3.5 mb/d Flows on East-West Bypass Pipeline",
      description: "Reuters reports Aramco has brought its repaired East-West pipeline to regular 3.5 mb/d bypass capacity toward Yanbu on the Red Sea, mitigating Gulf bottleneck exposure.",
      verification: "confirmed",
      timestamp: "2026-09-28T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Global Crude Benchmarks Show Wide-Band Volatility Near Highs",
      description: "Barchart and Trading Economics data record WTI trading between $91.99 and $96.54, while Brent fluctuated between $96.96 and $101.24 as geopolitical tension offsets temporary pipeline relief.",
      verification: "confirmed",
      timestamp: "2026-09-28T16:30:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.205 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：美伊在纽约围绕霍尔木兹海峡分阶段开放展开斡旋接触，油价高位震荡但未脱离中高风险带，五维评分全面持平昨日。",
    bannerWarning: "→ 维持防御资产与能源大宗对冲敞口，防范霍尔木兹谈判拉锯带来的脉冲性波动。",
    deescalationIntent: "美方要求德黑兰永久放弃海峡封锁与区域代理人威胁，与伊朗要求优先无条件解除核心经济制裁存在结构性死结。",
    structuralRisk: "海峡仍处于许可制与高风险绕行状态，商业通航量较战前依然显著承压。",
    contradictionNote: "美方要求德黑兰永久放弃海峡封锁与区域代理人威胁，与伊朗要求优先无条件解除核心经济制裁存在结构性死结。；美军区域前沿军力部署必须维持对航道的威慑存在，而伊朗反舰与无人机阵地构成的非对称拒止威慑难以单方面撤除。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第212天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.205 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): US-Iran mediation around phased Strait of Hormuz access continues in New York; oil prices fluctuate near the high risk band while five-fact…",
    bannerWarning: "→ Maintain defensive positioning and energy commodity hedges against diplomatic impasse volatility.",
    deescalationIntent: "US insistence on verifiable cessation of regional choke-point threats directly …",
    structuralRisk: "The strait remains subject to strict transit permits and extensive commercial rerouting.",
    contradictionNote: "US insistence on verifiable cessation of regional choke-point threats directly clashes with Iran's prerequisite of comprehensive economic sanctions relief.; US…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 212",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
