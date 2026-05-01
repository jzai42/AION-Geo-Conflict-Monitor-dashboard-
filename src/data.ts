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
  date: "2026-05-01",
  version: "v2.49",
  keyStats: [
    {
      label: "冲突天数",
      value: "D62",
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
      value: "WTI $88.20–$90.50 · Brent $92.50–$94.80",
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
  riskScore: 80,
  scoreTrend: [
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "发生直接交火，美军在波斯湾外围拦截伊朗无人机攻击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗通过大规模海上演习实现对海峡的实质性封锁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "油价维持在 $85-$100 区间高位，反应了供应完全中断的预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军增配防御资源，中方呼吁通过外交解决，但未改变现状。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "外交渠道完全停滞，双方无接触意愿。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗 IRGC 启动封锁性海演",
      description: "伊朗革命卫队在霍尔木兹海峡实施实弹禁航区，实质切断航道。",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军拦截攻击型无人机",
      description: "美军驱逐舰在阿曼湾拦截多架针对航运的伊朗无人机。",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "油价高位震荡确认",
      description: "Brent 站稳 $90 关口，反映海峡封锁的溢价长期化。",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡由于军事演习进入实质封闭状态",
      "美伊直接军事对抗风险从代理人冲突转向海上直接对峙",
      "外交谈判窗口完全关闭"
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
        "变化：美军增加在阿曼湾的防御性截击频率。",
        "延续：伊朗维持海峡内高强度军事演习姿态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：商业班轮基本停止进入海峡，绕行趋势固定化。",
        "延续：保费维持在冲突爆发以来最高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价计入长期封锁预期，波动重心上移。",
        "延续：全球原油库存由于物流延期出现初步下降。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方坚称确保航行自由，但未实施反攻演习区域。",
        "延续：伊朗最高领袖表态绝不退出主权海域。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗以航道为筹码换取制裁减压与地缘空间",
      "美方无法接受航行自由受阻但担忧全面开战引发大选风险"
    ],
    military: [
      "低烈度海上对垒与防空拦截的常态化",
      "由于误判导致直接攻击对方本土的风险日益增加"
    ]
  },
  keyChange: "冲突核心区已固化在霍尔木兹海峡，演习正演变为长期经济制裁手段。",
  investmentSignal: "→ 维持 能源 资产对冲，减持 风险资产 暴露，布局 防御 性品种。",
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-01",
  version: "v2.49",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D62",
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
      value: "WTI $88.20–$90.50 · Brent $92.50–$94.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  scoreTrend: [
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct engagements occurring via UAV interceptions in the Gulf of Oman.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "De facto blockade established through large-scale IRGC naval drills.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Prices stabilized in the $85–100 range, pricing in prolonged disruption.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US deploying defensive assets while China urges restraint without change in status.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels are stagnant with no willingness to negotiate.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Blockade Drills",
      description: "IRGC naval forces implement a live-fire exclusion zone in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Interception of Attack UAVs",
      description: "US destroyers intercept multiple Iranian drones targeting shipping lanes.",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Confirm High Plateau",
      description: "Brent sustains above $90 mark reflecting structural blockade premium.",
      verification: "confirmed",
      timestamp: "2026-05-01",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strait of Hormuz remains effectively closed due to persistent drills",
      "US-Iran confrontation shifts from proxies to direct maritime friction",
      "Diplomatic window completely closed"
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
        "Change: US increasing defensive interception frequency in Gulf of Oman.",
        "Continue: Iran maintains high-intensity naval drill posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial liners have largely ceased entering the Strait.",
        "Continue: Insurance premiums remain at conflict-peak levels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Price center of gravity shifts higher on long-term blockade risks.",
        "Continue: Global crude stocks show preliminary decline due to logistics."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US insists on freedom of navigation without direct counter-attack.",
        "Continue: Iran's Supreme Leader reaffirms control over 'sovereign waters'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran using chokepoint as leverage for sanctions relief",
      "US cannot accept blockade but fears election-year war escalation"
    ],
    military: [
      "Normalization of low-intensity maritime skirmishes",
      "Escalating risk of miscalculation leading to direct homeland strikes"
    ]
  },
  keyChange: "The conflict core has solidified at the Strait of Hormuz, with drills serving as a long-term economic weapon.",
  investmentSignal: "→ Maintain Energy hedges, reduce Risk Asset exposure, and position in Defensive assets.",
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.49 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：冲突核心区已固化在霍尔木兹海峡，演习正演变为长期经济制裁手段。",
    bannerWarning: "→ 维持 能源 资产对冲，减持 风险资产 暴露，布局 防御 性品种。",
    deescalationIntent: "伊朗以航道为筹码换取制裁减压与地缘空间",
    structuralRisk: "伊朗通过大规模海上演习实现对海峡的实质性封锁。",
    contradictionNote: "伊朗以航道为筹码换取制裁减压与地缘空间；低烈度海上对垒与防空拦截的常态化",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第62天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.49 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): The conflict core has solidified at the Strait of Hormuz, with drills serving as a long-term economic weapon.",
    bannerWarning: "→ Maintain Energy hedges, reduce Risk Asset exposure, and position in Defensive assets.",
    deescalationIntent: "Iran using chokepoint as leverage for sanctions relief",
    structuralRisk: "De facto blockade established through large-scale IRGC naval drills.",
    contradictionNote: "Iran using chokepoint as leverage for sanctions relief; Normalization of low-intensity maritime skirmishes",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 62",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
