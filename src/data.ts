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
  date: "2026-05-20",
  version: "v2.70",
  keyStats: [
    {
      label: "冲突天数",
      value: "D81",
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
      value: "WTI $91.50–$93.80 · Brent $95.20–$97.50",
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
  riskScore: 74,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在红海区域持续拦截伊朗支持的攻击载具，军事对抗频率维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道流量持续低迷，通行效率受伊朗军事演习与高度警戒影响严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价反映出显著的地缘政治溢价，但市场供需基本面限制了其单边突破百元的动力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国集中于区域防御与资产护航，主要大国尚未出现直接且全面的军事冲突介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "双方均无意在当前条件下让步，外交渠道维持在最低限度的危机沟通层面。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "拦截技术常态化替代了大规模反击",
      "霍尔木兹海峡形成长期结构性拥堵",
      "能源市场计价地缘溢价已趋于饱和"
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
        "延续：美军中央司令部维持红海区域的无人机与导弹拦截频率。",
        "延续：伊朗伊斯兰革命卫队（IRGC）在波斯湾出口保持战备巡航。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行费与保险溢价维持在三年内最高水平。",
        "变化：少量中小型油轮尝试恢复通行，但大型班轮公司仍处于观望状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价在 $95 附近（Brent）出现阶段性技术筑底，波动率有所回落。",
        "延续：全球原油库存低位运行，放大了地缘突发事件的价格敏感度。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰保持强硬对美姿态，利用区域代理人施加非对称压力。",
        "变化：白宫面临国内大选压力，在军事行动的烈度选择上表现出谨慎平衡。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国制裁压力与伊朗政权生存意志的直接碰撞",
      "区域大国对中东秩序主导权的长期博弈"
    ],
    military: [
      "非对称战争手段（无人机/代理人）对常规航运保护的长期消耗",
      "红海拦截成本与发射成本的极端不对称性"
    ]
  },
  scoreTrend: [
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74,
      active: true
    }
  ],
  keyChange: "冲突进入第81天，美伊双方从爆发式对抗转向结构性僵持，拦截战术成为常态。",
  investmentSignal: "→ 维持对能源资产与避险大宗商品的防御性配置，对冲地缘风险溢价。",
  change: "none",
  prevRiskScore: 74,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美军在红海区域持续拦截伊朗支持的攻击载具，军事对抗频率维持高位",
      description: "美军在红海区域持续拦截伊朗支持的攻击载具，军事对抗频率维持高位。",
      verification: "single",
      timestamp: "2026-05-20（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "航道流量持续低迷，通行效率受伊朗军事演习与高度警戒影响严重受限",
      description: "航道流量持续低迷，通行效率受伊朗军事演习与高度警戒影响严重受限。",
      verification: "single",
      timestamp: "2026-05-20（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-20",
  version: "v2.70",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D81",
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
      value: "WTI $91.50–$93.80 · Brent $95.20–$97.50",
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
  riskScore: 74,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US continues to intercept Iran-backed attack assets in the Red Sea, maintaining high operational friction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Chokepoint traffic remains low due to high alert levels and Iranian naval maneuvers.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Prices reflect significant risk premium, though fundamentals limit a move past $100/bbl.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US focus remains on defensive posture and asset protection; no direct peer-to-peer combat escalations reported.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Neither side shows willingness to concede; diplomatic channels restricted to minimal crisis management.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Interception tactics becoming the new operational norm",
      "Structural congestion in Hormuz Strait persists",
      "Energy risk premium nearing temporary saturation"
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
        "Continue: CENTCOM maintains high frequency of drone/missile intercepts in the Red Sea.",
        "Continue: IRGC naval assets maintain combat patrols near the Strait of Hormuz."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Insurance premiums for regional transit remain at multi-year highs.",
        "Change: Minor uptick in small tanker traffic while major liners remain cautious."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent finding a technical floor near $95; volatility shows slight compression.",
        "Continue: Low global inventories amplify price sensitivity to any new geopolitical shocks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran maintains defiant rhetoric, utilizing proxies for asymmetric pressure.",
        "Change: White House domestic pressure leads to a balanced, cautious military response strategy."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Direct collision between US sanctions pressure and Iranian regime survival instinct.",
      "Long-term competition for regional order hegemony."
    ],
    military: [
      "Attrition of conventional naval defense by asymmetric means.",
      "Extreme cost asymmetry between interception and launch assets."
    ]
  },
  scoreTrend: [
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74,
      active: true
    }
  ],
  keyChange: "The conflict enters Day 81 with a shift from explosive escalation to a structural, high-pressure standoff.",
  investmentSignal: "→ Maintain defensive positioning in energy assets and safe-haven commodities to hedge geopolitical risk.",
  change: "none",
  prevRiskScore: 74,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "US continues to intercept Iran-backed attack assets in the Red Sea, maintaining high operationa…",
      description: "US continues to intercept Iran-backed attack assets in the Red Sea, maintaining high operational friction.",
      verification: "single",
      timestamp: "2026-05-20 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Chokepoint traffic remains low due to high alert levels and Iranian naval maneuvers",
      description: "Chokepoint traffic remains low due to high alert levels and Iranian naval maneuvers.",
      verification: "single",
      timestamp: "2026-05-20 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.70 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：冲突进入第81天，美伊双方从爆发式对抗转向结构性僵持，拦截战术成为常态。",
    bannerWarning: "→ 维持对能源资产与避险大宗商品的防御性配置，对冲地缘风险溢价。",
    deescalationIntent: "美国制裁压力与伊朗政权生存意志的直接碰撞",
    structuralRisk: "航道流量持续低迷，通行效率受伊朗军事演习与高度警戒影响严重受限。",
    contradictionNote: "美国制裁压力与伊朗政权生存意志的直接碰撞；非对称战争手段（无人机/代理人）对常规航运保护的长期消耗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第81天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.70 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): The conflict enters Day 81 with a shift from explosive escalation to a structural, high-pressure standoff.",
    bannerWarning: "→ Maintain defensive positioning in energy assets and safe-haven commodities to hedge geopolitical risk.",
    deescalationIntent: "Direct collision between US sanctions pressure and Iranian regime survival inst…",
    structuralRisk: "Chokepoint traffic remains low due to high alert levels and Iranian naval maneuvers.",
    contradictionNote: "Direct collision between US sanctions pressure and Iranian regime survival instinct.; Attrition of conventional naval defense by asymmetric means.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 81",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
