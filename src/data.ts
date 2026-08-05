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
  date: "2026-08-05",
  version: "v2.147",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D158",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $76.40–$78.10 · Brent $80.20–$82.35",
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
      description: "代理人冲突多点活跃，美军防御系统持续处于高戒备状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通行量持续低迷，保险成本维持高位，商船避险情绪浓厚。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价区间主体落在$75–85美元带，市场紧张但供应链未发生实质物理中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军双航母战斗群维持部署，大国虽未直接对战，但介入烈度极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "谈判渠道虽重新激活但缺乏突破，立场对立依然严重。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗外交部发声寻求“稳定”",
      description: "伊朗外交部发言人表示不希望看到地区局势失控，标志着措辞由进攻转向克制。",
      verification: "confirmed",
      timestamp: "2026-08-05",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "中东油价风险溢价收窄",
      description: "由于缺乏即时的大规模冲突，WTI与布伦特油价均出现2%以上跌幅，回归基本面。参考: Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-08-05",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "卡阿斡旋重启间接对话",
      description: "卡塔尔和阿曼官员在多哈接待美伊代表进行非正式信息交换，试图建立避险护栏。",
      verification: "partial",
      timestamp: "2026-08-05",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理冲突常态化，直接战争门槛暂未跨越",
      "霍尔木兹海峡通航压力处于中长期高位",
      "外交渠道重启但仍缺乏建立互信的基础"
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
        "延续：美军在该地区维持拦截态势，代理人袭击密度无质变。",
        "变化：伊朗常规军演规模有所缩减，向外部传达降温意图。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：红海及霍尔木兹海峡保险费率维持高位溢价。",
        "变化：过去24小时内未报告新的针对商业航运的干扰事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：库存水平维持中位，未见全球性供应紧缺。",
        "变化：WTI区间下探至$76，投机性多头仓位出现集中减持。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿维持对伊朗的制裁压力及军事震慑。",
        "变化：德黑兰官方口径释放出一定的谈判窗口信号。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的报复权利与对政权稳定的需求之间的权衡。",
      "美国在选举压力下避免陷入全面中东战争的诉求。"
    ],
    military: [
      "代理人武装的自主性可能导致事态意外升级。",
      "霍尔木兹海峡长期作为地缘筹码对全球贸易的持久阴影。"
    ]
  },
  scoreTrend: [
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72,
      active: true
    }
  ],
  keyChange: "油价去溢价化与间接对话重启共同驱动风险分回撤。",
  investmentSignal: "→ 维持防御性配置，适当减持能源看涨头寸，对冲风险资产波动。",
  change: "down",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-05",
  version: "v2.147",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D158",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $76.40–$78.10 · Brent $80.20–$82.35",
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
      description: "High proxy activity continues; US defense systems on high alert.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic remains low; insurance costs are high; vessel rerouting persists.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil price range within $75–85 band; supply concerns exist but no physical outage.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains high military presence with carrier strike groups in place.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "Backchannels reactivated but lack breakthrough; positions remain antagonistic.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran MFA Signals Stability",
      description: "Spokesperson emphasizes desire for regional stability while claiming 'right to defend'.",
      verification: "confirmed",
      timestamp: "2026-08-05",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Oil Risk Premium Narrowing",
      description: "Absence of immediate direct war causes WTI and Brent to drop over 2%. Ref: Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-08-05",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Qatar/Oman Mediations Resume",
      description: "Officials host informal exchange between US and Iran representatives in Doha.",
      verification: "partial",
      timestamp: "2026-08-05",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Proxy conflict remains the norm; direct war threshold not yet crossed",
      "Transit pressure in Hormuz remains at a medium-to-long term high",
      "Diplomatic channels reopened but lack foundation for mutual trust"
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
        "Continue: US maintains interception posture; proxy attack density stable.",
        "Change: Iran reduces scale of routine drills, signaling cooling intent."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: High insurance premiums persist in Red Sea and Hormuz.",
        "Change: No new incidents against commercial shipping reported in 24h."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Inventory levels stable; no global supply shortage detected.",
        "Change: WTI tests $76 level as speculative long positions are liquidated."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington maintains sanctions and military deterrence.",
        "Change: Tehran official rhetoric offers a window for negotiations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's balance between right to retaliate and regime stability.",
      "US effort to avoid a full-scale Middle East war during election cycle."
    ],
    military: [
      "Autonomy of proxy groups potentially leading to accidental escalation.",
      "The enduring shadow of Hormuz as a geopolitical bargaining chip."
    ]
  },
  scoreTrend: [
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78
    },
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72,
      active: true
    }
  ],
  keyChange: "Oil de-premiumization and backchannel resumption drive risk score lower.",
  investmentSignal: "→ Maintain defensive posture, reduce long energy hedges, and hedge risk asset volatility.",
  change: "down",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.147 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓2）：油价去溢价化与间接对话重启共同驱动风险分回撤。",
    bannerWarning: "→ 维持防御性配置，适当减持能源看涨头寸，对冲风险资产波动。",
    deescalationIntent: "伊朗的报复权利与对政权稳定的需求之间的权衡。",
    structuralRisk: "通行量持续低迷，保险成本维持高位，商船避险情绪浓厚。",
    contradictionNote: "伊朗的报复权利与对政权稳定的需求之间的权衡。；代理人武装的自主性可能导致事态意外升级。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第158天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.147 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓2): Oil de-premiumization and backchannel resumption drive risk score lower.",
    bannerWarning: "→ Maintain defensive posture, reduce long energy hedges, and hedge risk asset volatility.",
    deescalationIntent: "Iran's balance between right to retaliate and regime stability.",
    structuralRisk: "Traffic remains low; insurance costs are high; vessel rerouting persists.",
    contradictionNote: "Iran's balance between right to retaliate and regime stability.; Autonomy of proxy groups potentially leading to accidental escalation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 158",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
