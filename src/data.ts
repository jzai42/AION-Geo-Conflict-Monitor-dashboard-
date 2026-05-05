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
  date: "2026-05-05",
  version: "v2.53",
  riskScore: 88,
  riskChange: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D66",
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
      value: "WTI $102–$107 · Brent $106–$111",
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
      description: "美军航母打击群与伊朗无人机发生直接接触性拦截行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道处于实质性封锁状态，全球主要航运公司已确认绕道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价在高位维持区间震荡，市场反映了持久封锁的预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接参与防御拦截，多国舰队在该海域保持战斗警戒。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道彻底中断，双方立场极端化且无转圜余地。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军拦截自杀式无人机",
      description: "美军在公海防卫圈内成功摧毁伊朗发射的攻击型无人机，未造成人员伤亡。",
      verification: "confirmed",
      timestamp: "2026-05-05 04:30",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "主要航司确认绕道",
      description: "航运巨头马士基宣布其所有旗下船舶将避开霍尔木兹海峡，直至另行通知。",
      verification: "confirmed",
      timestamp: "2026-05-05 09:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗强化沿岸部署",
      description: "卫星图像显示伊朗在阿巴斯港附近增加了机动反舰导弹发射装置。来源：Maxar。",
      verification: "partial",
      timestamp: "2026-05-05 14:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接军事接触进入常态化区间",
      "能源通道封锁从临时转为结构性长期化",
      "外交调解几乎失能"
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
        "变化：美军开始在海湾外缘执行动态拦截，对峙烈度显著提升。",
        "延续：伊朗保持高压态势，沿岸导弹部队维持一级战备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡实质性关闭，保险费率已飙升至商业不可承受水平。",
        "变化：区域内仅剩极少数受主权保护的非商用船只通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：供应短缺预期已完全计入价格，布伦特油价坚守105美元上方。",
        "变化：市场开始定价长达3个月以上的长期封锁风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申「不接受封锁」底线，但尚未发动大规模报复性空袭。",
        "变化：伊朗宣布将在月底举行针对性更强的多军种演习。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国内政压力下的制裁升级与伊朗反制裁的生存战冲突。",
      "地区盟友对美国安全承诺的质疑与美军战略重心的拉扯。"
    ],
    military: [
      "低成本无人机饱和攻击与高成本海基防空系统之间的消耗比矛盾。",
      "航道封锁对全球供应链的系统性冲击。"
    ]
  },
  scoreTrend: [
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88,
      active: true
    }
  ],
  keyChange: "美伊直接军事拦截标志着冲突已从海上对峙转入直接交火阶段。",
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，减持对利率敏感的风险资产。",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-05",
  version: "v2.53",
  riskScore: 88,
  riskChange: "Stable",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D66",
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
      value: "WTI $102–$107 · Brent $106–$111",
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
      description: "Direct military kinetic interaction between US CSG and Iranian UAVs.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait remains in de facto blockade with commercial shipping halted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices consolidate at high levels due to supply risk pricing.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US forces directly engaging in defensive kinetic actions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Zero communication channels; both sides holding extreme positions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Intercepts Iranian Drones",
      description: "US Navy successfully neutralized three Iranian-origin UAVs near the CSG perimeter.",
      verification: "confirmed",
      timestamp: "2026-05-05 04:30",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Shipping Giants Divert",
      description: "Maersk confirms all vessels will reroute via Cape of Good Hope due to safety risks.",
      verification: "confirmed",
      timestamp: "2026-05-05 09:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Normalisation of direct US-Iran kinetic contact",
      "Structural long-term blockage of global energy corridors",
      "Collapse of diplomatic mediation efforts"
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
        "Change: US Navy shifting to active perimeter interception at the Gulf entrance.",
        "Continue: Iran maintains first-degree readiness with coastal missile units."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: De facto closure of the Strait; insurance premiums reaching unviable levels.",
        "Change: Commercial traffic plummeted to <10% of seasonal norms."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent holding above $105 as market prices in persistent supply cuts.",
        "Change: Shift in pricing logic to include a 3-month+ blockade duration."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House maintains 'red line' on freedom of navigation.",
        "Change: Tehran announces large-scale multi-service exercises for late May."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between US domestic pressure for escalation and Iranian survival strategy.",
      "Erosion of security trust among regional allies."
    ],
    military: [
      "Cost-asymmetry of UAV swarms vs high-end naval air defenses.",
      "Systemic vulnerability of global energy chokepoints."
    ]
  },
  scoreTrend: [
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88,
      active: true
    }
  ],
  keyChange: "Direct kinetic intercepts signal transition from standoff to active skirmish phase.",
  investmentSignal: "→ Maintain defensive postures in energy and commodities; reduce exposure to risk assets.",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.53 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：美伊直接军事拦截标志着冲突已从海上对峙转入直接交火阶段。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，减持对利率敏感的风险资产。",
    deescalationIntent: "美国内政压力下的制裁升级与伊朗反制裁的生存战冲突。",
    structuralRisk: "航道处于实质性封锁状态，全球主要航运公司已确认绕道。",
    contradictionNote: "美国内政压力下的制裁升级与伊朗反制裁的生存战冲突。；低成本无人机饱和攻击与高成本海基防空系统之间的消耗比矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第66天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.53 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): Direct kinetic intercepts signal transition from standoff to active skirmish phase.",
    bannerWarning: "→ Maintain defensive postures in energy and commodities; reduce exposure to risk assets.",
    deescalationIntent: "Clash between US domestic pressure for escalation and Iranian survival strategy.",
    structuralRisk: "Strait remains in de facto blockade with commercial shipping halted.",
    contradictionNote: "Clash between US domestic pressure for escalation and Iranian survival strategy.; Cost-asymmetry of UAV swarms vs high-end naval air defenses.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 66",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
