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
  version: "v2.33",
  riskScore: 72,
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
      value: "WTI $88.4–90.2 · Brent $91.8–93.5 · 震荡回调",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "24小时内未发生直接交火，对抗烈度降至代理对抗/有限对峙水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "航道维持部分受限状态，保险费率高企，主要货船采取规避措施。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价维持在 $85-100 区间，避险情绪有所缓和但风险溢价依然存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军维持航母战斗群及防空反导系统的饱和部署，保持高位介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "官方沟通渠道完全关闭，双方公开声明中依然缺乏让步迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "五角大楼报告静默期",
      description: "DoD 确认过去24小时未发生直接军事接触，美军维持防御姿态。",
      verification: "confirmed",
      timestamp: "2026-04-16T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "安理会海事安全闭门会",
      description: "联合国讨论霍尔木兹海峡通行权，但中俄与美方分歧严重未获共识。",
      verification: "single",
      timestamp: "2026-04-15T22:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价获利回吐",
      description: "由于未观察到新的石油设施破坏，Brent 价格从周内高点小幅回落。",
      verification: "confirmed",
      timestamp: "2026-04-16T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方处于高压对峙下的战术间歇",
      "军事目标由主动进攻转为防御性震慑",
      "谈判窗口依然处于封闭状态"
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
        "变化：直接导弹发射频率大幅下降，美伊进入兵力对等消耗期。",
        "延续：伊朗在南部海区维持大规模反舰导弹待命状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要航商仍选择绕行或增加保费。通行效率较常态低 25%。",
        "变化：暂无新的油轮被扣押报告。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价回落至 $90 基准线，反映出市场对全面战争爆发的恐惧暂时缓解。",
        "延续：IEA 强调全球战略储备释放计划作为市场底垫。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方坚称‘铁甲般’防御承诺，伊方强调‘不寻求战争但有能力自卫’。",
        "变化：卡塔尔特使尝试传递非正式停火条件。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "制裁全盘撤销与核协议回归的本质分歧不可调和",
      "中东安全体系主导权之争"
    ],
    military: [
      "霍尔木兹海峡的通航权与实际封锁权的结构性矛盾",
      "美军前沿部署与伊朗非对称反击能力的长期博弈"
    ]
  },
  investmentSignal: "→ 维持能源对冲，风险资产采取防御性头寸，减持高 Beta 地缘敏感标的。",
  keyChange: "冲突进入‘战术间歇期’，总分因交火暂停由 76 降至 72。",
  change: "down",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-16",
  version: "v2.33",
  riskScore: 72,
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
      value: "WTI $88.4–90.2 · Brent $91.8–93.5 · 震荡回调",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "No direct kinetic engagement for 24h; de-escalation to limited standoff.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Flow reduced to 75% due to high premiums and naval exercises.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude prices holding in the $85-100 range with risk premium easing slightly.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US carrier groups maintain high-intensity presence and defensive posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "No active diplomatic channels; both sides maintain hardline stances.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Pentagon Lull Report",
      description: "DoD confirms zero kinetic contacts in 24h; troops stay on high alert.",
      verification: "confirmed",
      timestamp: "2026-04-16T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "UNSC Maritime Meeting",
      description: "Closed-door session on shipping freedom ends with no consensus among major powers.",
      verification: "single",
      timestamp: "2026-04-15T22:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Profit-Taking",
      description: "Brent retreats from weekly highs as immediate infrastructure damage concerns fade.",
      verification: "confirmed",
      timestamp: "2026-04-16T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Tactical pause under high-pressure standoff",
      "Shift from offensive strikes to defensive deterrence",
      "Negotiation window remains closed"
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
        "Change: Significant drop in missile exchange frequency.",
        "Continue: Iran maintains anti-ship missile readiness in the Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Passage efficiency remains 25% below normal levels.",
        "Change: No new vessel seizures reported in 24 hours."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices retraced to the $90 benchmark as panic eases.",
        "Continue: IEA reinforces supply security messaging."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US reiterates 'ironclad' defense; Iran warns against further sanctions.",
        "Change: Qatar attempts to facilitate unofficial messaging."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable gap between sanction relief and nuclear commitments",
      "Regional security architecture dominance"
    ],
    military: [
      "Hormuz passage rights vs. de facto blockade capability",
      "U.S. forward presence vs. Iranian asymmetric counter-capabilities"
    ]
  },
  investmentSignal: "→ Maintain energy hedges, defensive positioning in risk assets, reduce exposure to geosectors.",
  keyChange: "Conflict enters a 'tactical lull', overall score corrected from 76 to 72.",
  change: "down",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.33 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓4）：冲突进入‘战术间歇期’，总分因交火暂停由 76 降至 72。",
    bannerWarning: "→ 维持能源对冲，风险资产采取防御性头寸，减持高 Beta 地缘敏感标的。",
    deescalationIntent: "制裁全盘撤销与核协议回归的本质分歧不可调和",
    structuralRisk: "航道维持部分受限状态，保险费率高企，主要货船采取规避措施。",
    contradictionNote: "制裁全盘撤销与核协议回归的本质分歧不可调和；霍尔木兹海峡的通航权与实际封锁权的结构性矛盾",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.33 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓4): Conflict enters a 'tactical lull', overall score corrected from 76 to 72.",
    bannerWarning: "→ Maintain energy hedges, defensive positioning in risk assets, reduce exposure to geosectors.",
    deescalationIntent: "Irreconcilable gap between sanction relief and nuclear commitments",
    structuralRisk: "Flow reduced to 75% due to high premiums and naval exercises.",
    contradictionNote: "Irreconcilable gap between sanction relief and nuclear commitments; Hormuz passage rights vs. de facto blockade capability",
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
