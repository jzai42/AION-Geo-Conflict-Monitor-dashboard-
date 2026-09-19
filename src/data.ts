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
  date: "2026-09-19",
  version: "v2.197",
  riskScore: 76,
  change: "none",
  keyChange: "美伊军事高压与霍尔木兹通航严重受限状态延续，油价在前期冲高后高位整理，冲突进入台阶下行后的黏滞平衡期。",
  investmentSignal: "→ 维持能源与大宗商品防御性对冲头寸，逢反弹适度减持高波动风险资产以应对高位黏滞风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D203",
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
      value: "WTI $94.83–$98.01 · Brent $97.81–$100.14",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊多线对抗与战术交火保持极高烈度，防空防区与无人机袭击互为威慑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡通行严重受限，主要船东持续执行大规模绕航策略。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油基准价格高位整理，沙特抢修管道略微缓解断供极端担忧，主体落在$85–100显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国军事存在以战力戒备、护航联络与情报支援为主，未外溢至第三方大国直接对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "间接调解进程受挫推迟，双方立场依旧强硬，短周期缺乏实质性停火路径。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-1",
      title: "沙特阿美加速东西管线复原以缓解原油出口瓶颈",
      description: "沙特官方通报与国际能源媒体指出，沙特正加紧抢修受损红海东西输油管道，力求恢复部分绕开海峡的输送量，微幅缓解国际市场对全面断供的即期恐慌（来源：Reuters、Financial Times）。",
      verification: "confirmed",
      timestamp: "2026-09-19T06:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-2",
      title: "霍尔木兹海峡商船通行量维持常态40%低位",
      description: "主要海事监测机构与国际航运工会报告，尽管部分散货与油轮冒险过境，但全球主要集装箱与能源班轮仍普遍绕行好望角，通行持续严重受阻（来源：Bloomberg、AP）。",
      verification: "confirmed",
      timestamp: "2026-09-19T08:15:00Z",
      significance: ""
    },
    {
      id: "ev-3",
      title: "区域多边停火沟通暂缓，外交突破窗口期后延",
      description: "海湾调解国消息显示美伊间接接洽暂告搁置，双方围绕停止互击与撤军前提要价差距悬殊，短期降级几率受抑（来源：Al Jazeera English、Reuters）。",
      verification: "confirmed",
      timestamp: "2026-09-19T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海上封锁与防空袭扰持续压制航运安全与原油供应链。",
      "外交谈判渠道缺乏进展，维系高压互慑的消耗性平衡。"
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
        "延续：战区前沿各方处于防空高度戒备与战术无人机袭扰僵局，未见大规模地面战演化。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要航运企业维持好望角绕行路径，霍尔木兹海峡通行量维持低于50%的严重受阻状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：因沙特备用管线修复预期及库存缓冲，油价从此前高点小幅回撤至WTI $94–98区间震荡整固。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊决策层对峙基调未变，中东多国间接斡旋推迟，短期缺乏双方官方积极接触信号。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底消除航运安全威胁与代理人武装，伊方坚持解除制裁与撤军作为先决条件。"
    ],
    military: [
      "防空拦截的高昂消耗与低成本无人机/导弹饱和战术之间的不对称消耗矛盾加剧。"
    ]
  },
  scoreTrend: [
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76,
      active: true
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-19",
  version: "v2.197",
  riskScore: 76,
  change: "none",
  keyChange: "US-Iran standoff and Hormuz maritime chokehold persist; crude oil consolidates at elevated levels while tensions settle into a sticky high-pressure balance.",
  investmentSignal: "→ Maintain defensive commodity and energy hedges while trimming high-beta risk assets amid sticky high-pressure standoff.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D203",
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
      value: "WTI $94.83–$98.01 · Brent $97.81–$100.14",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "严重受限",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Multi-front tactical clashes and active air-defense engagements maintain full war-readiness posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Severe transit restriction remains across the Strait with traffic remaining well below 50% of normal baseline.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks consolidate within the $85–100 bracket as pipeline repairs offset immediate panic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains intensive forward air-sea deployments and intel sharing, while other powers limit actions to diplomatic mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Backchannel diplomatic contacts postponed with unyielding preconditions on both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-1",
      title: "Saudi Aramco accelerates pipeline workarounds to relieve export bottlenecks",
      description: "Repairs on the East-West Pipeline proceed to restore partial Red Sea bypass capacity, trimming immediate outage panic across crude markets (Sources: Reuters, Financial Times).",
      verification: "confirmed",
      timestamp: "2026-09-19T06:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-2",
      title: "Strait of Hormuz commercial traffic stalls near 40% of standard capacity",
      description: "Major global carriers continue rerouting around southern Africa as war risk surcharges and drone threats keep regular liner operations halted (Sources: Bloomberg, AP).",
      verification: "confirmed",
      timestamp: "2026-09-19T08:15:00Z",
      significance: ""
    },
    {
      id: "ev-3",
      title: "Regional de-escalation meetings delayed amid rigid negotiation stances",
      description: "Mediators announce postponement of indirect consultations as both Washington and Tehran maintain conflicting prerequisites for a truce (Sources: Al Jazeera English, Reuters).",
      verification: "confirmed",
      timestamp: "2026-09-19T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Protracted chokepoint interdiction continues to weigh on energy security.",
      "Lack of negotiation breakthroughs solidifies a sticky, high-risk equilibrium."
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
        "Continue: Tactical standoff and air defense interception patrols persist across Gulf waters without major ground expansion."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial fleet rerouting around the Cape of Good Hope remains pervasive, leaving Hormuz flows severely constrained below 50%."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil futures ease off peak highs toward WTI $94–98 as Saudi bypass pipeline repairs ease acute supply shock fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both US and Iranian authorities sustain uncompromising deterrence postures with mediation talks pushed back."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands full maritime security guarantees and militia disarmament, while Tehran insists on unilateral sanctions relief."
    ],
    military: [
      "High cost of advanced air-defense interceptors versus low-cost asymmetric drone saturation creates an escalating attrition dilemma."
    ]
  },
  scoreTrend: [
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76,
      active: true
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
    node406: "9月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.197 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美伊军事高压与霍尔木兹通航严重受限状态延续，油价在前期冲高后高位整理，冲突进入台阶下行后的黏滞平衡期。",
    bannerWarning: "→ 维持能源与大宗商品防御性对冲头寸，逢反弹适度减持高波动风险资产以应对高位黏滞风险。",
    deescalationIntent: "美方要求彻底消除航运安全威胁与代理人武装，伊方坚持解除制裁与撤军作为先决条件。",
    structuralRisk: "霍尔木兹海峡通行严重受限，主要船东持续执行大规模绕航策略。",
    contradictionNote: "美方要求彻底消除航运安全威胁与代理人武装，伊方坚持解除制裁与撤军作为先决条件。；防空拦截的高昂消耗与低成本无人机/导弹饱和战术之间的不对称消耗矛盾加剧。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第203天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.197 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US-Iran standoff and Hormuz maritime chokehold persist; crude oil consolidates at elevated levels while tensions settle into a sticky high-…",
    bannerWarning: "→ Maintain defensive commodity and energy hedges while trimming high-beta risk assets amid sticky high-pressure standof…",
    deescalationIntent: "Washington demands full maritime security guarantees and militia disarmament, w…",
    structuralRisk: "Severe transit restriction remains across the Strait with traffic remaining well below 50% of norma…",
    contradictionNote: "Washington demands full maritime security guarantees and militia disarmament, while Tehran insists on unilateral sanctions relief.; High cost of advanced air-d…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 203",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
