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
  date: "2026-05-13",
  version: "v2.63",
  keyStats: [
    {
      label: "冲突天数",
      value: "D74",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $92.40–$94.80 · Brent $96.10–$98.50",
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
      description: "美伊直接在霍尔木兹附近发生多次防空拦截。据CENTCOM声明，美军击落3架从伊朗本土发射的自杀无人机。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "部分船东随护航舰队复航，通行量从极端低位反弹至约40%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价区间在$92-$99震荡，护航消息抵消了部分供应焦虑。WTI $92.40–$94.80, Brent $96.10–$98.50。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "多国联合护航标志着域外大国从外交关注转向直接军事部署干预。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "部分证实：虽有卡塔尔作为中间人传话，但正式对话渠道依然封闭，双方停火意愿极低。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "联合护航行动启动",
      description: "美、英、法正式启动霍尔木兹护航任务，首批护卫舰进入海峡区域。来源：DoD/Reuters",
      verification: "confirmed",
      timestamp: "2026-05-13T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗展示反舰水雷系统",
      description: "IRGC在演习中展示可由民用船只投放的智能化水雷，对护航编队构成潜在威胁。来源：IRNA/AP",
      verification: "confirmed",
      timestamp: "2026-05-13T07:30:00Z",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "商船通行从此前的完全无序转向高度依赖军事护卫的计划性航行。",
      "伊朗的对抗策略从全面封锁转向针对性的不对称骚扰与水雷战威胁。"
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
        "延续：美伊双方在波斯湾空域保持高强度的电子战侦察与反侦察。",
        "变化：美军开始对伊朗岸基反舰导弹雷达站实施非破坏性电子压制。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：多国联合护航机制启动，每日限定2-4个受保护航次通过海峡。",
        "变化：马士基等部分主流班轮公司宣布恢复有条件通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：由于霍尔木兹通行量仅恢复至40%，现货原油溢价（Premium）依然维持在5美元以上。",
        "变化：成品油裂解价差因远东供应路径被迫绕道而开始走强。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国白宫重申无意与伊朗全面开战，但将坚决捍卫国际航行自由。",
        "变化：伊朗最高领袖称护航是「对地区主权的公然侵犯」，要求外国军队立即撤出。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国必须维护航行自由以稳定盟友信心 vs 伊朗将海峡作为战略博弈的最后筹码。"
    ],
    military: [
      "美军有限度武力介入 vs 伊朗不对称水雷/无人机战术的威慑。"
    ]
  },
  scoreTrend: [
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78,
      active: true
    }
  ],
  keyChange: "护航机制建立导致的航运风险部分对冲",
  investmentSignal: "→ 防御与能源：维持对冲，增持能源资产与避险货币，关注运费指数走势。",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-13",
  version: "v2.63",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D74",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $92.40–$94.80 · Brent $96.10–$98.50",
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
  riskScore: 78,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct air-to-air engagements near Hormuz; US CENTCOM confirmed intercepting 3 drones from Iranian soil.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Traffic partially recovered to ~40% capacity as convoy operations commenced.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Prices stabilized in the $92-$99 range. WTI $92.40–$94.80, Brent $96.10–$98.50.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Formal shift from diplomatic concern to active multi-national military deployment for escort missions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Partial verification: Backchannel communication via Qatar exists, but formal dialogue remains non-existent.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Joint Escort Operation Launched",
      description: "US, UK, and France officially initiate 'Prosperity Guardian II' escorts in Hormuz. Source: DoD/Reuters",
      verification: "confirmed",
      timestamp: "2026-05-13T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Unveils Naval Mine System",
      description: "IRGC displays smart anti-ship mines capable of deployment by civilian vessels. Source: IRNA/AP",
      verification: "confirmed",
      timestamp: "2026-05-13T07:30:00Z",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shipping has shifted from complete chaos to militarized, scheduled transits.",
      "Iranian strategy is shifting from total blockade to targeted asymmetric naval mine threats."
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
        "Continue: High-intensity electronic warfare and surveillance between US/Iran in the Persian Gulf.",
        "Change: US military begins non-destructive electronic jamming of Iranian coastal missile sites."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Multi-national escort mechanism established with 2-4 protected slots daily.",
        "Change: Major liners like Maersk resume limited conditional transits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Physical crude premiums remain above $5 due to restricted 40% capacity.",
        "Change: Product crack spreads strengthening as Asian supplies are diverted via longer routes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates no intention for total war but will defend freedom of navigation.",
        "Change: Iran's Supreme Leader calls the escort 'aggression' and demands foreign troop withdrawal."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US need to maintain global navigation freedom vs Iran's use of the Strait as strategic leverage."
    ],
    military: [
      "Limited US military intervention vs Iranian asymmetric mine/drone deterrence."
    ]
  },
  scoreTrend: [
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78,
      active: true
    }
  ],
  keyChange: "Partial hedging of maritime risk due to the establishment of the escort mechanism",
  investmentSignal: "→ Defensive & Energy: Maintain hedges, accumulate energy assets and safe-haven currencies.",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.63 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（↓6）：护航机制建立导致的航运风险部分对冲",
    bannerWarning: "→ 防御与能源：维持对冲，增持能源资产与避险货币，关注运费指数走势。",
    deescalationIntent: "美国必须维护航行自由以稳定盟友信心 vs 伊朗将海峡作为战略博弈的最后筹码。",
    structuralRisk: "部分船东随护航舰队复航，通行量从极端低位反弹至约40%。",
    contradictionNote: "美国必须维护航行自由以稳定盟友信心 vs 伊朗将海峡作为战略博弈的最后筹码。；美军有限度武力介入 vs 伊朗不对称水雷/无人机战术的威慑。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第74天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.63 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (↓6): Partial hedging of maritime risk due to the establishment of the escort mechanism",
    bannerWarning: "→ Defensive & Energy: Maintain hedges, accumulate energy assets and safe-haven currencies.",
    deescalationIntent: "US need to maintain global navigation freedom vs Iran's use of the Strait as st…",
    structuralRisk: "Traffic partially recovered to ~40% capacity as convoy operations commenced.",
    contradictionNote: "US need to maintain global navigation freedom vs Iran's use of the Strait as strategic leverage.; Limited US military intervention vs Iranian asymmetric mine/d…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 74",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
