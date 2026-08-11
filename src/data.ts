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
  date: "2026-08-11",
  version: "v2.153",
  keyStats: [
    {
      label: "冲突天数",
      value: "D164",
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
      value: "WTI $79.40–$82.10 · Brent $83.60–$86.30",
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
      description: "伊朗新型导弹试射与美军舰载机频繁起降预示战术烈度回升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道实际通行能力仍被腰斩，保险成本与绕行成本双高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "地缘溢价因军事活动而重新注入，油价在$80-$85中枢区间稳固。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "大国力量在海湾地区高度集结，军事摩擦风险与外交摊牌并存。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "多方调停未果，安理会陷入僵局，各方缺乏退让空间。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  events: [
    {
      id: "EVT-01",
      title: "伊朗成功试射新型中程导弹",
      description: "伊朗宣布其“法塔赫-3”型高超音速导弹系统已形成初步战力，引发周边国家高度警惕。",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "海湾航运保费单日上涨12%",
      description: "受近期骚扰事件及导弹试射影响，伦敦保险市场对过境霍尔木兹海峡的船舶溢价再次跳升。",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "武力展示替代外交沟通",
      "能源通道实质受限常态化",
      "大国力量近距离博弈"
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
        "变化：伊朗启动为期三天的导弹与无人机战术演习。",
        "延续：美英联军维持对也门及叙伊边境关联目标的空中监视。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：由于安全因素，主要石油托运商继续选择绕行南非。",
        "变化：由于美海军巡航频率增加，近期未发生实质性的扣船事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：现货溢价显著，短期内由于补库需求油价获得支撑。",
        "延续：OPEC+表态将密切关注局势变化，但不急于调整产量配额。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗最高领袖要求武装部队保持最高戒备状态。",
        "延续：美方高层表示暂不寻求与伊朗直接开战，但红线不可逾越。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求美国提供实质性制裁解除保证，而美国坚持先停火后对话。"
    ],
    military: [
      "地区威慑力的角逐：伊朗导弹远程投射力 vs 美国海上拦截效能。"
    ]
  },
  scoreTrend: [
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 72,
      active: true
    }
  ],
  keyChange: "导弹试射标志着冲突由局部骚扰转入高价值武器威慑阶段，地缘风险评分上修至72。",
  investmentSignal: "→ 维持 能源 与 避险资产 对冲，减持 风险资产。",
  change: "up",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-11",
  version: "v2.153",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D164",
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
      value: "WTI $79.40–$82.10 · Brent $83.60–$86.30",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iranian missile tests and US carrier operations signal a resurgence in tactical intensity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait throughput remains halved with sustained high insurance and diversion costs.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "Geopolitical premiums re-injected due to military activity, stabilizing oil in the $80-$85 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Great power forces are heavily concentrated in the Gulf, combining friction risks with diplomatic stalemate.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Mediation remains ineffective as the UN Security Council faces deadlock.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  events: [
    {
      id: "EVT-01",
      title: "Iran Successfully Tests New Medium-Range Missile",
      description: "The 'Fattah-3' hypersonic system reached initial operational capability, raising regional alarms.",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Hormuz War Risk Premium Jumps 12%",
      description: "Insurance premiums for vessels transiting the strait spike following missile test and harassment incidents.",
      verification: "confirmed",
      timestamp: "2026-08-11",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Force projection replacing diplomatic dialogue",
      "Normalization of severe maritime restrictions",
      "Close-quarter maneuvering by major powers"
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
        "Change: Iran launches a three-day tactical missile and drone exercise.",
        "Continue: US-led forces maintain aerial surveillance over Yemen and proxy-linked borders."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major oil shippers continue to divert via the Cape of Good Hope due to safety.",
        "Change: No actual seizures reported recently as US naval presence increases."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spot premiums are significant as short-term restocking supports prices.",
        "Continue: OPEC+ monitors the situation but maintains current production quotas."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran's Supreme Leader places armed forces on highest alert.",
        "Continue: US officials state they do not seek direct war but will defend red lines."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran demands concrete sanctions relief; US insists on a ceasefire before substantive dialogue."
    ],
    military: [
      "Competition for regional deterrence: Iran's missile reach vs US interception capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 72,
      active: true
    }
  ],
  keyChange: "Missile tests mark a transition from local harassment to high-value weapon deterrence, raising risk score to 72.",
  investmentSignal: "→ Maintain Overweight in Energy and Defensives, Underweight Risk Assets.",
  change: "up",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.153 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑2）：导弹试射标志着冲突由局部骚扰转入高价值武器威慑阶段，地缘风险评分上修至72。",
    bannerWarning: "→ 维持 能源 与 避险资产 对冲，减持 风险资产。",
    deescalationIntent: "伊朗要求美国提供实质性制裁解除保证，而美国坚持先停火后对话。",
    structuralRisk: "航道实际通行能力仍被腰斩，保险成本与绕行成本双高。",
    contradictionNote: "伊朗要求美国提供实质性制裁解除保证，而美国坚持先停火后对话。；地区威慑力的角逐：伊朗导弹远程投射力 vs 美国海上拦截效能。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第164天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.153 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑2): Missile tests mark a transition from local harassment to high-value weapon deterrence, raising risk score to 72.",
    bannerWarning: "→ Maintain Overweight in Energy and Defensives, Underweight Risk Assets.",
    deescalationIntent: "Iran demands concrete sanctions relief; US insists on a ceasefire before substa…",
    structuralRisk: "Strait throughput remains halved with sustained high insurance and diversion costs.",
    contradictionNote: "Iran demands concrete sanctions relief; US insists on a ceasefire before substantive dialogue.; Competition for regional deterrence: Iran's missile reach vs US…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 164",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
