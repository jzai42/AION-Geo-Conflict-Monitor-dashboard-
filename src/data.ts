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
  date: "2026-04-19",
  version: "v2.37",
  riskScore: 72,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "直接打击主权领土目标（伊斯法罕），标志着冲突进入新阶段。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "航道维持高压警惕，商船普遍采取防御性避航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "油价进入 $85-100 敏感区间，直接冲突溢价开始计入定价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事资源高度动员，G7外交协同对伊朗施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判处于静默状态，各方立场极度强硬，仅保留基本避险沟通。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D50",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $81.80–$86.28 · Brent $86.15–$90.75 · 宽幅震荡",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "高压对峙",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊斯法罕空军基地遭精准空袭",
      description: "针对伊朗核设施周边军事基地的小规模精准打击，伊朗防空部队在凌晨拦截多个无人机目标。消息来源：Reuters, AP。",
      verification: "confirmed",
      timestamp: "2026-04-19 05:30 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗淡化袭击影响",
      description: "伊朗国家电视台及官员表示境内无重大损害，且未发现外部导弹穿过边界，暗示事件为“渗透者”操作。消息来源：IRNA, Al Jazeera。",
      verification: "confirmed",
      timestamp: "2026-04-19 07:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI与Brent盘中剧震",
      description: "受地缘突发消息刺激，油价跳涨后因局势未进一步恶化而收窄涨幅。消息来源：Bloomberg, CNBC。",
      verification: "confirmed",
      timestamp: "2026-04-19 12:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "打击范围限定在单一军事节点，避开民生与核心核设施",
      "信息战激烈：一方声称有效打击，另一方声称完美拦截",
      "美国扮演“降温器”角色，极力避免陷入全面地面战争"
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
        "变化：直接针对伊朗境内高价值军事目标（伊斯法罕）的攻击被证实。",
        "延续：伊朗代理武装在叙利亚、黎巴嫩边境维持低强度牵制部署。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行权未受实质封锁，但由于高额保费导致中小承运商减班。",
        "变化：多国海军加强了在曼德海峡与霍尔木兹海峡间的侦察频次。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价区间从 $75-85 跳升至 $85-91，计入约 $5-7 的直接冲突溢价。",
        "延续：OPEC+ 暂无额外增产声明，市场对供应中断的容忍度降低。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方高层公开表态不寻求与伊朗开战，试图通过外交压力隔离冲突点。",
        "延续：伊朗国内媒体将防空拦截宣传为国家实力的展示，以平息民众情绪。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的报复需求与避免政权动荡之间的矛盾",
      "美国大选前夕的维稳压力与地缘信誉受损之间的矛盾"
    ],
    military: [
      "精准远程打击的战术成功与地缘战略僵局之间的矛盾"
    ]
  },
  scoreTrend: [
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 64
    },
    {
      date: "04-19",
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突性质从昨日的“代理冲突隐忍期”回归至“主权领土直接博弈”，油价中枢上移。",
  investmentSignal: "→ 维持风险资产对冲，增持能源与防御性大宗商品仓位，警惕受控冲突突变。",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-19",
  version: "v2.37",
  riskScore: 72,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Direct strike on sovereign territory (Isfahan) marks a shift to a new phase of conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "High-pressure standoff remains; commercial vessels adopt defensive routing.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Oil prices enter $85-100 sensitive range; direct conflict premium priced in.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US military resources highly mobilized; G7 diplomatic coordination against Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Negotiations stalled; communication limited to Swiss-mediated warnings.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D50",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $81.80–$86.28 · Brent $86.15–$90.75 · 宽幅震荡",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "High-Pressure Standoff",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Precision Strike on Isfahan Airbase",
      description: "Small-scale precision strike targeting military assets; Iran air defenses intercepted drones. Sources: Reuters, AP.",
      verification: "confirmed",
      timestamp: "2026-04-19 05:30 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Downplays Impact",
      description: "State TV and officials claim no major damage and no foreign missile entry, suggesting internal infiltration. Sources: IRNA, Al Jazeera.",
      verification: "confirmed",
      timestamp: "2026-04-19 07:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI and Brent Intraday Volatility",
      description: "Oil prices spiked on geopolitical news before retracing as escalation fears moderated. Sources: Bloomberg, CNBC.",
      verification: "confirmed",
      timestamp: "2026-04-19 12:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strikes limited to military nodes, avoiding civilian and core nuclear sites",
      "High-stakes information war regarding strike efficacy versus interception",
      "US acting as a 'de-escalator' to avoid a full-scale regional land war"
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
        "Change: Confirmed direct strikes against high-value military targets in Isfahan, Iran.",
        "Continue: Proxy militias maintain low-intensity harassment on Syrian and Lebanese borders."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: No physical blockade of Hormuz, but premiums drive smaller carriers to reduce frequency.",
        "Change: Allied navies increase surveillance between the Bab el-Mandeb and Hormuz straits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil price range shifted from $75-85 to $85-91, pricing in a $5-7 conflict premium.",
        "Continue: OPEC+ maintains current output levels despite increased supply risk."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US senior officials distance the administration from offensive operations against Iran.",
        "Continue: Iranian domestic media frames interceptions as a display of national strength."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's need for retaliation vs. the risk of regime-threatening instability",
      "US pre-election stability goals vs. the need to maintain regional deterrence"
    ],
    military: [
      "Tactical success of precision strikes vs. the strategic stalemate of escalation"
    ]
  },
  scoreTrend: [
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 64
    },
    {
      date: "04-19",
      score: 72,
      active: true
    }
  ],
  keyChange: "Conflict shifted from proxy-based restraint to direct territorial engagement, lifting oil price floors.",
  investmentSignal: "→ Maintain risk asset hedges, overweight energy and defensive commodities to counter controlled conflict volatility.",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.37 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑8）：冲突性质从昨日的“代理冲突隐忍期”回归至“主权领土直接博弈”，油价中枢上移。",
    bannerWarning: "→ 维持风险资产对冲，增持能源与防御性大宗商品仓位，警惕受控冲突突变。",
    deescalationIntent: "伊朗的报复需求与避免政权动荡之间的矛盾",
    structuralRisk: "航道维持高压警惕，商船普遍采取防御性避航。",
    contradictionNote: "伊朗的报复需求与避免政权动荡之间的矛盾；精准远程打击的战术成功与地缘战略僵局之间的矛盾",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第50天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.37 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑8): Conflict shifted from proxy-based restraint to direct territorial engagement, lifting oil price floors.",
    bannerWarning: "→ Maintain risk asset hedges, overweight energy and defensive commodities to counter controlled conflict volatility.",
    deescalationIntent: "Iran's need for retaliation vs. the risk of regime-threatening instability",
    structuralRisk: "High-pressure standoff remains; commercial vessels adopt defensive routing.",
    contradictionNote: "Iran's need for retaliation vs. the risk of regime-threatening instability; Tactical success of precision strikes vs. the strategic stalemate of escalation",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 50",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
