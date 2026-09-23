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
  date: "2026-09-23",
  version: "v2.201",
  keyStats: [
    {
      label: "冲突天数",
      value: "D207",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $88.71–$91.93 · Brent $94.10–$97.33",
      unit: "参考",
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
      description: "双方暂停直接交火，进入外交试探期",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "出现解封提议但当前依旧受限",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "风险溢价消退，区间回落",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "外部大国维持外交斡旋角色",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 3.5,
      weight: 0.2,
      description: "达成实质性高级别接触",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 58,
  events: [
    {
      id: "EVT-01",
      title: "美伊代表团在联合国大会举行三小时会谈",
      description: "美国官方与伊朗代表团在联合国大会场边进行了长达三小时的会面，标志着冲突爆发以来最高级别的实质性外交接触。（Gulf News, NDTV）",
      verification: "confirmed",
      timestamp: "2026-09-23T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗提议条件性重启霍尔木兹海峡",
      description: "伊朗高级官员向媒体表示，若美国实质性放松军事与经济压力，伊朗愿在七天内全面解除对海峡的封锁。（Reuters, Grafa）",
      verification: "confirmed",
      timestamp: "2026-09-23T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美国对伊朗航空网络实施次级制裁",
      description: "美财政部正式启动针对伊朗民用航空网络的二级制裁，以在谈判窗口期继续维持经济高压。（US Treasury, Gulf News）",
      verification: "confirmed",
      timestamp: "2026-09-23T13:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方在联大期间的实质性接触宣告双边关系进入政治谈判主导期",
      "霍尔木兹海峡解封首次被明确提上时间表，为冲突降温提供锚点"
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
        "变化：美伊在联合国大会期间暂停直接军事打击，前线转入静默与外交试探。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗首次提出重新开放海峡的具体时间表（7天），但附带美方施压解除的前提条件。",
        "延续：实际物理通行状况目前仍维持部分受限状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：受海峡复航预期及外交破冰影响，油市恐慌情绪消散，区间显著回落。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：双方高层在联大期间的直接接触打破了前期的高压对峙僵局，展现出明确的外交意愿。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国实施的新一轮航空次级制裁与联合国外交接触之间的双轨政策冲突"
    ],
    military: [
      "伊朗海峡解封承诺的落实与美军在该地区前沿威慑部署的对立"
    ]
  },
  scoreTrend: [
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58,
      active: true
    }
  ],
  keyChange: "美伊代表团在联合国大会取得实质性外交突破，且伊朗提出霍尔木兹海峡的条件性重启时间表，推动风险分大幅下行。",
  investmentSignal: "→ 随着美伊在联大展开实质性会晤及霍尔木兹海峡释放重启信号，建议适度减持能源与防御性头寸，逐步将资金向风险资产转移。",
  change: "down",
  prevRiskScore: 66,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-23",
  version: "v2.201",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D207",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $88.71–$91.93 · Brent $94.10–$97.33",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Direct fire paused as focus shifts to diplomatic probing",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Reopening proposed but currently remains restricted",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Risk premium fades, price band declines",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "External powers maintain diplomatic mediation roles",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 3.5,
      weight: 0.2,
      description: "Substantive high-level contact achieved",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 58,
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Delegations Hold Three-Hour Meeting at UNGA",
      description: "US officials and the Iranian delegation met for three hours on the sidelines of the UN General Assembly, marking the highest level of substantive diplomatic contact since the conflict began. (Gulf News, NDTV)",
      verification: "confirmed",
      timestamp: "2026-09-23T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Proposes Conditional Reopening of Strait of Hormuz",
      description: "Senior Iranian officials told media that Iran is willing to lift the blockade on the Strait of Hormuz within seven days if the US substantially eases military and economic pressure. (Reuters, Grafa)",
      verification: "confirmed",
      timestamp: "2026-09-23T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "US Imposes Secondary Sanctions on Iranian Aviation Network",
      description: "The US Treasury officially launched secondary sanctions targeting Iran's civil aviation network to maintain severe economic pressure during the negotiation window. (US Treasury, Gulf News)",
      verification: "confirmed",
      timestamp: "2026-09-23T13:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Substantive contacts between the US and Iran at the UNGA signal the bilateral relationship is shifting toward a phase dominated by political negotiations.",
      "The conditional unblocking of the Strait of Hormuz has been put on a definite timeline for the first time, offering an anchor for conflict de-escalation."
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
        "Change: Direct US-Iran military strikes paused during the UN General Assembly as frontlines shift toward silence and diplomatic probing."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran introduced a specific 7-day timeline for reopening the strait, contingent upon the lifting of US pressure.",
        "Continue: Actual physical transit conditions currently remain partially restricted."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Driven by anticipated transit resumption and diplomatic ice-breaking, fear in the oil markets dissipated, causing price bands to drop significantly."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Direct contacts between senior officials at the UNGA broke the earlier high-pressure deadlock, demonstrating clear willingness to negotiate."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The conflict between the new US secondary aviation sanctions and the dual-track diplomatic contacts at the UN."
    ],
    military: [
      "The tension between fulfilling Iran's promise to unblock the strait and the forward deterrence deployments of US forces in the region."
    ]
  },
  scoreTrend: [
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66
    },
    {
      date: "09-23",
      score: 58,
      active: true
    }
  ],
  keyChange: "Substantive diplomatic breakthroughs between US and Iranian delegations at the UNGA, paired with Iran's conditional timeline to reopen the Strait of Hormuz, drove a significant downward shift in the risk score.",
  investmentSignal: "→ As the US and Iran engage in substantive talks at the UNGA and Hormuz reopening signals emerge, it is recommended to reduce energy and defensive positions, gradually shifting capital toward risk assets.",
  change: "down",
  prevRiskScore: 66,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.201 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 58（↓8）：美伊代表团在联合国大会取得实质性外交突破，且伊朗提出霍尔木兹海峡的条件性重启时间表，推动风险分大幅下行。",
    bannerWarning: "→ 随着美伊在联大展开实质性会晤及霍尔木兹海峡释放重启信号，建议适度减持能源与防御性头寸，逐步将资金向风险资产转移。",
    deescalationIntent: "美国实施的新一轮航空次级制裁与联合国外交接触之间的双轨政策冲突",
    structuralRisk: "出现解封提议但当前依旧受限",
    contradictionNote: "美国实施的新一轮航空次级制裁与联合国外交接触之间的双轨政策冲突；伊朗海峡解封承诺的落实与美军在该地区前沿威慑部署的对立",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第207天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.201 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 58 (↓8): Substantive diplomatic breakthroughs between US and Iranian delegations at the UNGA, paired with Iran's conditional timeline to reopen the …",
    bannerWarning: "→ As the US and Iran engage in substantive talks at the UNGA and Hormuz reopening signals emerge, it is recommended to …",
    deescalationIntent: "The conflict between the new US secondary aviation sanctions and the dual-track…",
    structuralRisk: "Reopening proposed but currently remains restricted",
    contradictionNote: "The conflict between the new US secondary aviation sanctions and the dual-track diplomatic contacts at the UN.; The tension between fulfilling Iran's promise t…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 207",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
