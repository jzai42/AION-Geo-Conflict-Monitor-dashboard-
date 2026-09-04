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
  date: "2026-09-04",
  version: "v2.178",
  riskScore: 70,
  riskChange: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D188",
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
      value: "WTI $81.50–$83.20 · Brent $85.80–$87.10",
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
      description: "维持高戒备对峙，过去24小时无重大空袭或导弹互射报告。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道维持受控通行状态，通航量不足正常水平的60%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent油价维持在$85以上，地缘风险溢价锁定在每桶$5-10区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国维持双航母战斗群存在，作为遏制伊朗进一步行动的震慑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "间接沟通渠道虽然开放，但双方核心诉求存在巨大鸿沟，无实质进展。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊通过阿曼渠道进行间接沟通",
      description: "公开报道显示，双方利用外交中间人传递了关于避免全面战争的相互保证，但未涉及核心停火协议。",
      verification: "confirmed",
      timestamp: "2026-09-04",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "红海及阿拉伯海商业保险费率企稳",
      description: "在过去48小时无新商船遇袭后，伦敦保险市场暂时停止了保费上调，维持在高位震荡。",
      verification: "partial",
      timestamp: "2026-09-04",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方均意识到大规模冲突的代价，目前进入威慑性相持阶段。",
      "霍尔木兹海峡的护航体系已制度化，降低了随机干扰风险。",
      "油价对政治修辞的敏感度开始边际递减。"
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
        "延续：美伊双方边境部署维持在最高警戒等级。",
        "延续：代理人武装在叙利亚边境保持低烈度骚扰，未引发全面冲突。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：联合编队护航成为商船通过关键水域的必要条件。",
        "延续：部分大型油轮继续选择绕行好望角以规避潜在风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场对中东供应中断的恐慌有所降温，焦点转向全球宏观需求。",
        "延续：沙特等产油国维持增产储备，以应对可能的突发出口中断。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：华盛顿方面在公开场合更多强调“外交途径优先”。",
        "延续：德黑兰继续强调主权不容侵犯，并将演习作为战略威慑工具。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方维持对伊高压制裁与伊朗要求全面解除制裁之间的对立。",
      "地区地缘重塑目标与维持现状之间的矛盾。"
    ],
    military: [
      "前沿部署的紧密接触与避免“第一枪”误判之间的平衡难题。"
    ]
  },
  scoreTrend: [
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊通过阿曼进行间接沟通，暂时降低了误判风险，局势进入高压横盘期。",
  investmentSignal: "→ 维持对冲防御，增持能源资产以应对尾部风险。",
  change: "none",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-04",
  version: "v2.178",
  riskScore: 70,
  riskChange: "Stable",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D188",
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
      value: "WTI $81.50–$83.20 · Brent $85.80–$87.10",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Maintained high-alert standoff; no major kinetic strikes reported in last 24h.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Controlled transit continues; throughput remains below 60% of normal levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent prices hold above $85, with a structural risk premium of $5-$10/bbl.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains dual carrier group presence to deter Iranian escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Indirect channels remain open but stagnant; no alignment on core red lines.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Indirect US-Iran Communication via Oman",
      description: "Reports suggest both sides exchanged assurances to avoid total war, though no ceasefire was reached.",
      verification: "confirmed",
      timestamp: "2026-09-04",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Commercial Insurance Rates Stabilize",
      description: "London markets halted rate hikes following 48 hours without maritime incidents.",
      verification: "partial",
      timestamp: "2026-09-04",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Deterrence-based stalemate as both sides weigh the cost of full-scale war.",
      "Institutionalized naval escort systems reduce random maritime friction.",
      "Marginal diminishing sensitivity of oil prices to political rhetoric."
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
        "Continue: Border deployments remain at peak readiness.",
        "Continue: Proxy groups maintain low-intensity harassment in border regions."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Joint escorts remain mandatory for commercial passage in key waters.",
        "Continue: Diversion via Cape of Good Hope persists for major fleets."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market panic over supply disruptions easing as macro demand takes focus.",
        "Continue: OPEC+ spare capacity held in reserve for potential export shocks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington emphasizes 'diplomacy first' in recent public rhetoric.",
        "Continue: Tehran uses military drills as a primary tool for strategic deterrence."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between US sanctions regime and Iranian demand for full relief.",
      "Competing visions for regional security architecture."
    ],
    military: [
      "The risk of miscalculation during close-quarters deterrence maneuvers."
    ]
  },
  scoreTrend: [
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70
    },
    {
      date: "09-04",
      score: 70,
      active: true
    }
  ],
  keyChange: "Indirect communication via Oman has temporarily lowered miscalculation risks; situation enters a high-pressure plateau.",
  investmentSignal: "→ Maintain hedging postures and defensive overweight in energy to guard against tail risks.",
  change: "none",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.178 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊通过阿曼进行间接沟通，暂时降低了误判风险，局势进入高压横盘期。",
    bannerWarning: "→ 维持对冲防御，增持能源资产以应对尾部风险。",
    deescalationIntent: "美方维持对伊高压制裁与伊朗要求全面解除制裁之间的对立。",
    structuralRisk: "航道维持受控通行状态，通航量不足正常水平的60%。",
    contradictionNote: "美方维持对伊高压制裁与伊朗要求全面解除制裁之间的对立。；前沿部署的紧密接触与避免“第一枪”误判之间的平衡难题。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第188天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.178 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Indirect communication via Oman has temporarily lowered miscalculation risks; situation enters a high-pressure plateau.",
    bannerWarning: "→ Maintain hedging postures and defensive overweight in energy to guard against tail risks.",
    deescalationIntent: "Clash between US sanctions regime and Iranian demand for full relief.",
    structuralRisk: "Controlled transit continues; throughput remains below 60% of normal levels.",
    contradictionNote: "Clash between US sanctions regime and Iranian demand for full relief.; The risk of miscalculation during close-quarters deterrence maneuvers.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 188",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
