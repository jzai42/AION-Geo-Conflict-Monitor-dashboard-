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
  date: "2026-08-23",
  version: "v2.166",
  keyStats: [
    {
      label: "冲突天数",
      value: "D176",
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
      value: "WTI $87.50–$89.20 · Brent $91.30–$93.10",
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
  riskScore: 78,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊直接交火风险处于高位，双方在阿曼湾及波斯湾的兵力部署保持战备状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡流量维持在极低水平，保险成本高企，主要商业航运受到系统性干扰。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价在 $85-$100 区间主体运行，市场对供应中断的恐慌情绪有所企稳但未消散。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国维持实质性军事存在与威慑，通过情报与联合行动深度干预地区局势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "谈判渠道完全断绝，双方立场极度强硬，暂无任何政治降级的迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM 确认维持第五舰队戒备",
      description: "美军艾森豪威尔号航母打击群继续在地区内执行巡逻，应对潜在打击威胁。",
      verification: "confirmed",
      timestamp: "2026-08-23 04:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗官方强硬拒绝美方条件",
      description: "伊朗外交部发言人公开表示，在制裁未解除前拒绝任何形式的谈判，立场未见松动。",
      verification: "confirmed",
      timestamp: "2026-08-23 09:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "霍尔木兹流量持续处于低点",
      description: "劳合社最新船舶追踪显示，波斯湾进出港油轮流量显著减少，商业保费上涨。",
      verification: "confirmed",
      timestamp: "2026-08-23 07:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事交火密度暂时下降，但结构性矛盾未解决",
      "航道控制权成为博弈核心，影响全球供应链",
      "外交谈判陷入彻底停滞，双方等待新的博弈筹码"
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
        "延续：双方在敏感海域维持高度戒备与防御性动员。",
        "变化：局部边界地带报告出现零星的小规模炮击，未造成重大战果变化。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗革命卫队对通过海峡的外国商船维持“安全审查”程序。",
        "延续：全球主要能源运输公司继续采用绕行替代航路。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价结束急涨转入横盘，WTI 在 $88 关口附近波动（Bloomberg）。",
        "延续：实物原油市场升水维持在高位，反映出中长期供应担忧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿方面强调将保护航行自由与地区盟友安全。",
        "延续：德黑兰高层重申不向任何外部压力妥协的原则立场。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国对伊极限施压政策与伊朗主权安全诉求的根本冲突",
      "地区地缘政治主导权的长期博弈"
    ],
    military: [
      "霍尔木兹海峡控制权与航行自由权的高度对抗",
      "远程导弹威慑与反导防御系统的持续竞赛"
    ]
  },
  scoreTrend: [
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78,
      active: true
    }
  ],
  keyChange: "冲突进入高位黏滞阶段，军事烈度小幅波动但整体风险等级未下行。",
  investmentSignal: "→ 维持能源与风险资产防御性配置。",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-23",
  version: "v2.166",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D176",
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
      value: "WTI $87.50–$89.20 · Brent $91.30–$93.10",
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
  riskScore: 78,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct conflict risks remain elevated as both sides maintain combat readiness in the Gulf region.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait traffic remains at historic lows with systemic disruption to commercial shipping and high insurance premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices consolidate within the $85-$100 range as supply fears persist despite easing panic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain significant military presence and deterrence, deeply influencing regional stability.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Negotiation channels are effectively closed with both sides maintaining uncompromising stances.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM Confirms 5th Fleet Readiness",
      description: "USS Dwight D. Eisenhower Carrier Strike Group continues patrols to counter potential drone/missile threats.",
      verification: "confirmed",
      timestamp: "2026-08-23 04:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Rejects US Preconditions",
      description: "MFA spokesperson states no dialogue will occur without sanctions lifting; posture remains defiant.",
      verification: "confirmed",
      timestamp: "2026-08-23 09:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Hormuz Traffic Hits Low Point",
      description: "Lloyd's List tracking shows sharp decrease in tanker volume through the Strait; insurance premiums soar.",
      verification: "confirmed",
      timestamp: "2026-08-23 07:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military kinetic density has stabilized but structural tensions remain unresolved.",
      "Control over shipping lanes has become the core strategic contest.",
      "Diplomatic tracks are frozen as both parties await new leverage."
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
        "Continue: High-alert posture and defensive mobilization maintained in sensitive waters.",
        "Change: Localized reports of minor border skirmishes without significant territorial impact."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: IRGC maintains 'security inspection' procedures for transit vessels.",
        "Continue: Global shipping firms persist with rerouting around the Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil rally pauses; WTI fluctuates around the $88 level (Bloomberg).",
        "Continue: Physical crude premiums remain high reflecting mid-term supply anxiety."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington emphasizes protection of freedom of navigation and regional allies.",
        "Continue: Tehran reiterates refusal to bow to external pressure or 'coerced negotiations'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Fundamental clash between US maximum pressure and Iranian sovereign security demands.",
      "Long-term struggle for regional geopolitical dominance."
    ],
    military: [
      "Confrontation between Strait control and freedom of navigation.",
      "Ongoing race between missile deterrence and air defense integration."
    ]
  },
  scoreTrend: [
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78,
      active: true
    }
  ],
  keyChange: "Conflict has entered a sticky high-risk phase; military intensity fluctuates but overall risk remains stubborn.",
  investmentSignal: "→ Maintain defensive postures in energy and risk-mitigating assets.",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.166 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（持平）：冲突进入高位黏滞阶段，军事烈度小幅波动但整体风险等级未下行。",
    bannerWarning: "→ 维持能源与风险资产防御性配置。",
    deescalationIntent: "美国对伊极限施压政策与伊朗主权安全诉求的根本冲突",
    structuralRisk: "海峡流量维持在极低水平，保险成本高企，主要商业航运受到系统性干扰。",
    contradictionNote: "美国对伊极限施压政策与伊朗主权安全诉求的根本冲突；霍尔木兹海峡控制权与航行自由权的高度对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第176天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.166 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (Flat): Conflict has entered a sticky high-risk phase; military intensity fluctuates but overall risk remains stubborn.",
    bannerWarning: "→ Maintain defensive postures in energy and risk-mitigating assets.",
    deescalationIntent: "Fundamental clash between US maximum pressure and Iranian sovereign security de…",
    structuralRisk: "Strait traffic remains at historic lows with systemic disruption to commercial shipping and high in…",
    contradictionNote: "Fundamental clash between US maximum pressure and Iranian sovereign security demands.; Confrontation between Strait control and freedom of navigation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 176",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
