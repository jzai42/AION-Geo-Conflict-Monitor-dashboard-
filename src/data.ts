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
  date: "2026-06-19",
  version: "v2.100",
  riskScore: 40,
  riskTrend: [
    {
      date: "2026-06-15",
      score: 44
    },
    {
      date: "2026-06-16",
      score: 44
    },
    {
      date: "2026-06-17",
      score: 40
    },
    {
      date: "2026-06-18",
      score: 36
    },
    {
      date: "2026-06-19",
      score: 40
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D111",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $75.55–$77.47 · Brent $76.54–$80.04",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "恢复通行 (25艘/日)",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊主战场保持静默，但黎巴嫩边境爆发剧烈代理冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "航道逐步开放，但水雷威胁与保险成本阻碍全面常态化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价在区间低位震荡企稳，受瑞士谈判推迟消息刺激出现回升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美副总统万斯直接领导谈判，大国外交协调角色显著。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "由于区域暴力升级，谈判由「签署期」倒退回「脆弱僵持期」。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊14点谅解备忘录达成",
      description: "美伊通过中介签署初步路线图，开启60天全面谈判窗口，含解除封锁条款 (Reuters)。",
      verification: "confirmed",
      timestamp: "2026-06-18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "瑞士和平峰会推迟",
      description: "因黎巴嫩局势突变，原定由JD万斯参加的瑞士技术对话被迫延后 (Swiss MoFA)。",
      verification: "confirmed",
      timestamp: "2026-06-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "黎巴嫩边境严重违反共识",
      description: "IDF空袭致18人死，真主党还击杀4人，该事件被视为停火协议的首次严重破坏 (Al Jazeera)。",
      verification: "confirmed",
      timestamp: "2026-06-19",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方已达成初步谅解框架，但缺乏实地执行机制",
      "黎巴嫩代理战场成为破坏总体停火协议的关键变数",
      "霍尔木兹海峡正在经历从「物理封锁」向「有限通航」的过渡"
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
        "延续：美伊直接交火保持停滞，战略威慑力量维持现状",
        "变化：黎巴嫩边境冲突升级，IDF出动大规模空袭应对真主党袭击"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：单日通航量升至25艘，中欧油轮开始尝试复航 (AXSMarine)",
        "延续：海峡扫雷行动仍需数周，扫雷进度限制大型油轮全天候通行"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价结束连跌，受谈判推迟与黎巴嫩局势刺激回升 (Reuters)",
        "延续：市场关注积压的8500万桶原油流入全球市场的节奏"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普对「全线停火」表达乐观，但万斯取消行程显示美方在外交压力下回撤",
        "延续：德黑兰内部对MoU中关于核限制的条款仍存在激烈政治争论"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国政府的快速和谈压力 vs 以色列对黎巴嫩南部安全区的固守要求",
      "伊朗温和派的外交成果 vs 强硬派对美方制裁解除诚意的质疑"
    ],
    military: [
      "地缘停火协议在形式上的签署 vs 代理人武装在实地利益上的冲突"
    ]
  },
  keyChange: "谈判受阻引发的风险中短期反弹",
  investmentSignal: "→ 维持风险资产偏多配置，对冲能源价格回落，保持防御性头寸。",
  change: "up",
  prevRiskScore: 36,
  scoreTrend: [
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40,
      active: true
    }
  ],
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFKzsXjhBZLC5SKJO46vc9zpeI4wd7nRBk1ej67s5wAQ5WTZSc7CWOnq4Ku_HJeyGIazyyxgBIqasLXiuSKyaiUxhmTnScJMnvh8K72lJPvmuOowz7FWthxdLJz1FrsZEqgxA3rMEmsswc1S_sg4whpsoqpv3srj74ZqpBmotI2zHDpYuznYCK9FcxXtyTiyrr_aRYYuz7IU_dF-Ac6WjAteN9x"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 19 2026 trend news",
    "US Iran conflict latest news June 19 2026",
    "US Iran negotiation Oman technical draft June 2026 news",
    "Strait of Hormuz shipping status June 19 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-19",
  version: "v2.100",
  riskScore: 40,
  riskTrend: [
    {
      date: "2026-06-15",
      score: 44
    },
    {
      date: "2026-06-16",
      score: 44
    },
    {
      date: "2026-06-17",
      score: 40
    },
    {
      date: "2026-06-18",
      score: 36
    },
    {
      date: "2026-06-19",
      score: 40
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D111",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $75.55–$77.47 · Brent $76.54–$80.04",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Resuming (25 vsl/day)",
      unit: "Passage",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Direct US-Iran exchanges paused, but intense fighting erupted on the Lebanon front.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The waterway is reopening but remains restricted by mines and insurance premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices stabilized at lower bands but rebounded following news of delayed peace talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "US and Iran officials directly engaged in the MoU process, highlighting high diplomatic stakes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "Diplomatic momentum hit a hurdle as technical talks in Switzerland were postponed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran 14-Point MoU Signed",
      description: "Presidential signing of a preliminary roadmap for a 60-day negotiation window (Reuters).",
      verification: "confirmed",
      timestamp: "2026-06-18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Swiss Peace Summit Postponed",
      description: "Technical talks in Burgenstock were delayed following escalation in southern Lebanon (Swiss MoFA).",
      verification: "confirmed",
      timestamp: "2026-06-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Hezbollah-Israel Escalation",
      description: "Lethal exchanges in Lebanon mark the first major breach of the nascent ceasefire framework (Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-06-19",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "MoU provides a framework, but field implementation is severely lacking",
      "Lebanon proxy fighting remains the primary risk of global ceasefire collapse",
      "Hormuz transition from blockade to managed traffic is technically complex"
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
        "Continue: US-Iran direct kinetic activity remains halted; strategic deterrence holds",
        "Change: Intense escalation in southern Lebanon as IDF responds to Hezbollah rocket fire"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Daily traffic spikes to 25 vessels, led by Chinese and European owners (AXSMarine)",
        "Continue: Mine clearance operations and high war-risk premiums (3-8%) limit full recovery"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices rebound from lows as geopolitical risk premium resurfaces following Swiss delay",
        "Continue: Market anticipates the impact of 85 million barrels of stranded oil potentially entering supply"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump expresses optimism for a 'Total Ceasefire,' while Vance remains stateside for coordination",
        "Continue: Tehran's hardliners voice skepticism over US commitment to lifting naval blockades"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US pressure for rapid resolution vs Israel's insistence on a Lebanese security buffer",
      "Iran's diplomatic track vs domestic opposition to nuclear concessions"
    ],
    military: [
      "Signed peace framework vs on-the-ground proxy tactical interests"
    ]
  },
  keyChange: "Risk rebound triggered by delayed technical negotiations",
  investmentSignal: "→ Maintain risk-on exposure while hedging with energy longs to buffer negotiation volatility.",
  change: "up",
  prevRiskScore: 36,
  scoreTrend: [
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40,
      active: true
    }
  ],
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFKzsXjhBZLC5SKJO46vc9zpeI4wd7nRBk1ej67s5wAQ5WTZSc7CWOnq4Ku_HJeyGIazyyxgBIqasLXiuSKyaiUxhmTnScJMnvh8K72lJPvmuOowz7FWthxdLJz1FrsZEqgxA3rMEmsswc1S_sg4whpsoqpv3srj74ZqpBmotI2zHDpYuznYCK9FcxXtyTiyrr_aRYYuz7IU_dF-Ac6WjAteN9x"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 19 2026 trend news",
    "US Iran conflict latest news June 19 2026",
    "US Iran negotiation Oman technical draft June 2026 news",
    "Strait of Hormuz shipping status June 19 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.100 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（↑4）：谈判受阻引发的风险中短期反弹",
    bannerWarning: "→ 维持风险资产偏多配置，对冲能源价格回落，保持防御性头寸。",
    deescalationIntent: "美国政府的快速和谈压力 vs 以色列对黎巴嫩南部安全区的固守要求",
    structuralRisk: "航道逐步开放，但水雷威胁与保险成本阻碍全面常态化。",
    contradictionNote: "美国政府的快速和谈压力 vs 以色列对黎巴嫩南部安全区的固守要求；地缘停火协议在形式上的签署 vs 代理人武装在实地利益上的冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第111天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.100 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (↑4): Risk rebound triggered by delayed technical negotiations",
    bannerWarning: "→ Maintain risk-on exposure while hedging with energy longs to buffer negotiation volatility.",
    deescalationIntent: "US pressure for rapid resolution vs Israel's insistence on a Lebanese security …",
    structuralRisk: "The waterway is reopening but remains restricted by mines and insurance premiums.",
    contradictionNote: "US pressure for rapid resolution vs Israel's insistence on a Lebanese security buffer; Signed peace framework vs on-the-ground proxy tactical interests",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 111",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
