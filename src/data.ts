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
  date: "2026-08-09",
  version: "v2.151",
  keyStats: [
    {
      label: "冲突天数",
      value: "D162",
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
      value: "WTI $81.96–$86.16 · Brent $83.24–$84.40",
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
      description: "多线代理人战争活跃，胡塞武装攻击致数十人死亡，美军持续空袭反制。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗明确表示海峡复航需以美方撤军及补偿为前提，实质封锁持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价在 $80 附近盘整，供应担忧被全球需求放缓叙事部分对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方直接进行军事部署与打击，并寻求沙特、土耳其等地区盟友加强防御协作。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "虽然阿曼中介渠道未断，但伊朗提出的新条件（全面补偿、撤军）导致谈判僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  scoreTrend: [
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
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
      score: 70,
      active: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗将海峡开放权作为外交筹码进行「打包要价」。",
      "美国军事威慑已进入常态化周期，双方目前克制大规模地面直接对抗。",
      "地区盟友（沙特/土耳其）开始寻求独立的安全保障协议。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "伊朗开出海峡复航「极高价」",
      description: "伊朗最高国家安全委员会声明要求美国支付战争赔偿并取消封锁作为复航前提（AP）。",
      verification: "confirmed",
      timestamp: "2026-08-09",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "胡塞武装大规模袭击也门政府军",
      description: "袭击造成至少 58 人死亡，加剧了区域代理冲突的残酷性（CBS News）。",
      verification: "single",
      timestamp: "2026-08-07",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军 CVN 77 打击群维持高频夜间飞行任务，确保对波斯湾出口的威慑。",
        "延续：伊拉克什叶派民兵在伊朗协调下继续对沙特边境进行侦察施压。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗将复航谈判从单纯的技术安全议题提升为「全面战争结算」政治议题。",
        "延续：商业班轮绝大多数仍绕行好望角，海峡通行强度维持低位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油在 $83-84 区间企稳，市场对短期内战争扩大化持观望态度。",
        "变化：交易商开始计价海峡封锁可能延续至年底的长期成本。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗强硬派指挥官 Zolghadr 走向前台，信号显示德黑兰短期无退让意愿。",
        "延续：美白宫强调「所有选项均在桌面」，但近期无进一步地面增兵计划。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的全面赔偿要求与美方「无条件复航」目标的根本对立。",
      "中东盟友对美国长期安全承诺的信任赤字。"
    ],
    military: [
      "区域内不断上升的代理人伤亡与美伊直接冲突红线之间的博弈。"
    ]
  },
  keyChange: "伊朗提出「纠正行为」最后通牒，标志着谈判从求同存异转向极限对峙。",
  investmentSignal: "→ 维持 风险资产 防御 姿态，增持 能源 对冲。",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBVJ2G8vSZW8nGMG9pZEkj4brW3H-RL2wU-UPickShI7Ar2HEeDE22lmEGFzgSbvX0xgUHr-YG9Gbj4ZCbVTnt8StDGiR3boZcOIrTT73j6pLigbwb81ET3Z6_b25VHhGiMqDYqN0="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHsOECKnJjIw8KW70mxu1WE9xk7VrRqvrWB_DL29eJoiG0DwojVtBAaL970EPDmE0S0EG-X-RgUUP9A8CqTuvd6sE7E6XA9iU-P24UnCvtsKe4hQ5iDGkeoCnF5zCSE76XhhvUZmAhIb1AhkqgiNPSNMMTcmA=="
    },
    {
      title: "centcom.mil",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8cY4RmrCGoBGHOvV7PgDekNK6ZUX6DxQAXwOrcD89PQzPD23KRmNHASwSXruAcwSNMuKXwQ9B-nDyjb0-8ci_O_-KjSA_xWKQ8kyZ4Q=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEr6dnH7gg5o6GYvsd1oRbGu2__VwCkjSWo3MegqohyTiSEC6MWpICmv6fKQ4JDyx7URLTNhPifcvqhbiQvvHhX-U7Bukc9Orp5x2ZKTBMgAN8WbyYSaE9cKZrRf6Ih06ciXO4zgedNsQJZ8TtzBZRDmTMmWNikYjiHmhecVzC1TLxQ"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 9 2024",
    "US Iran relations news August 9 2024 official statements"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-09",
  version: "v2.151",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D162",
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
      value: "WTI $81.96–$86.16 · Brent $83.24–$84.40",
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
      description: "High proxy activity with heavy casualties; sustained US airstrikes in response to militia movements.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran officially links reopening to strategic demands, effectively prolonging the blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Prices remain in the $75-85 range; market is balanced between supply fears and global demand outlook.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US military engagement in interception and strikes; regional powers seek collective defense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Negotiation channels exist but are stalled by Iranian demands for war reparations.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  scoreTrend: [
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
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
      score: 70,
      active: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran utilizes maritime transit as a high-stakes diplomatic ransom.",
      "US deterrence maintains a high operational tempo without significant troop expansion.",
      "Regional allies are shifting toward autonomous security arrangements."
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "Iran Issues 'Correct Behavior' Ultimatum",
      description: "Supreme National Security Council demands war reparations and US withdrawal for Hormuz reopening (AP).",
      verification: "confirmed",
      timestamp: "2026-08-09",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Houthi Missile Attack on Yemen Forces",
      description: "At least 58 killed in escalation of proxy warfare (CBS News).",
      verification: "single",
      timestamp: "2026-08-07",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US George H.W. Bush carrier group maintains night operations in the Arabian Sea.",
        "Continue: Iranian-backed militias in Iraq conduct surveillance maneuvers near Saudi borders."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran pivots reopening talks from technical safety to broad political settlement demands.",
        "Continue: Global shipping liners continue to divert around the Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude stabilizes in the $83-84 range as traders wait for next geopolitical signals.",
        "Change: Market participants begin pricing in a 'long-term closure' scenario for the Strait."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: IRGC commander Zolghadr takes lead in SNSC, signaling a shift toward a hardline stance.",
        "Continue: White House explores 'all options' while avoiding direct ground invasion."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatibility between Iranian reparation demands and US unconditional transit goals.",
      "Deepening trust deficit between US and its regional security partners."
    ],
    military: [
      "Escalating proxy body counts testing the 'red line' of direct US-Iran confrontation."
    ]
  },
  keyChange: "Iran's ultimatum marks a shift from tactical negotiation to structural deadlock.",
  investmentSignal: "→ Maintain Defensive posture in risk assets, Overweight Energy hedges.",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBVJ2G8vSZW8nGMG9pZEkj4brW3H-RL2wU-UPickShI7Ar2HEeDE22lmEGFzgSbvX0xgUHr-YG9Gbj4ZCbVTnt8StDGiR3boZcOIrTT73j6pLigbwb81ET3Z6_b25VHhGiMqDYqN0="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHsOECKnJjIw8KW70mxu1WE9xk7VrRqvrWB_DL29eJoiG0DwojVtBAaL970EPDmE0S0EG-X-RgUUP9A8CqTuvd6sE7E6XA9iU-P24UnCvtsKe4hQ5iDGkeoCnF5zCSE76XhhvUZmAhIb1AhkqgiNPSNMMTcmA=="
    },
    {
      title: "centcom.mil",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8cY4RmrCGoBGHOvV7PgDekNK6ZUX6DxQAXwOrcD89PQzPD23KRmNHASwSXruAcwSNMuKXwQ9B-nDyjb0-8ci_O_-KjSA_xWKQ8kyZ4Q=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEr6dnH7gg5o6GYvsd1oRbGu2__VwCkjSWo3MegqohyTiSEC6MWpICmv6fKQ4JDyx7URLTNhPifcvqhbiQvvHhX-U7Bukc9Orp5x2ZKTBMgAN8WbyYSaE9cKZrRf6Ih06ciXO4zgedNsQJZ8TtzBZRDmTMmWNikYjiHmhecVzC1TLxQ"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 9 2024",
    "US Iran relations news August 9 2024 official statements"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.151 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：伊朗提出「纠正行为」最后通牒，标志着谈判从求同存异转向极限对峙。",
    bannerWarning: "→ 维持 风险资产 防御 姿态，增持 能源 对冲。",
    deescalationIntent: "伊朗的全面赔偿要求与美方「无条件复航」目标的根本对立。",
    structuralRisk: "伊朗明确表示海峡复航需以美方撤军及补偿为前提，实质封锁持续。",
    contradictionNote: "伊朗的全面赔偿要求与美方「无条件复航」目标的根本对立。；区域内不断上升的代理人伤亡与美伊直接冲突红线之间的博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第162天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.151 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Iran's ultimatum marks a shift from tactical negotiation to structural deadlock.",
    bannerWarning: "→ Maintain Defensive posture in risk assets, Overweight Energy hedges.",
    deescalationIntent: "Incompatibility between Iranian reparation demands and US unconditional transit…",
    structuralRisk: "Iran officially links reopening to strategic demands, effectively prolonging the blockade.",
    contradictionNote: "Incompatibility between Iranian reparation demands and US unconditional transit goals.; Escalating proxy body counts testing the 'red line' of direct US-Iran c…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 162",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
