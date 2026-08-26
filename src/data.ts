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
  date: "2026-08-26",
  version: "v2.169",
  keyStats: [
    {
      label: "冲突天数",
      value: "D179",
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
      value: "WTI $84.20–$86.80 · Brent $88.40–$91.20",
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
      description: "多区域代理人袭击频发，美军维持高频拦截行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道受演习与扣押风险笼罩，保险成本高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价维持高风险溢价，现货市场对中断高度敏感。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国维持军力部署与情报支持，尚未进入直面阶段。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方均无让步迹象，外交渠道近乎冻结。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  scoreTrend: [
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78,
      active: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方在红海与叙利亚方向进行高频低烈度交火",
      "霍尔木兹海峡由封锁威胁转向常态化军事禁区演习",
      "能源市场处于供应焦虑驱动的高位横盘期"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "美军拦截叙利亚东部无人机袭击",
      description: "美国中央司令部（CENTCOM）通报拦截了4架针对美军基地的武装无人机，指责为伊朗支持的武装所为。",
      verification: "confirmed",
      timestamp: "2026-08-26",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗革命卫队霍尔木兹实弹演习",
      description: "IRGC在海峡入口进行反舰导弹测试演习，周边商业航运被迫改道。",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "油价因中东溢价维持在 $90 关口",
      description: "路透社分析指出，市场情绪极度悲观，原油价格因航道封锁威胁持续获得支撑。",
      verification: "confirmed",
      timestamp: "2026-08-26",
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
        "延续：美军维持叙利亚及伊拉克基地的最高戒备等级，拦截率保持稳定。",
        "变化：伊朗无人机部署向叙利亚东部前移，试图增加美军预警难度。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：通过霍尔木兹海峡的油轮需向伊朗军方报备，通行流程复杂化。",
        "延续：苏伊士运河方向流量受红海波及，维持季节性低位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：原油期货合约换月反映出的远期贴水（Backwardation）结构加剧，凸显即期供应紧张。",
        "变化：由于演习禁区扩大，现货溢价在过去24h内微幅上涨。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国白宫重申「铁拳保护盟友」立场，对伊制裁执行力度未减。",
        "延续：伊朗外交部称将对任何主权侵犯行为作出「对等反击」。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "华盛顿要求先停止攻击再谈外交，德黑兰坚持先解除制裁，双方逻辑死锁。"
    ],
    military: [
      "代理人骚扰与直接威慑的交织，使战术性误击极易转化为战略性升级。"
    ]
  },
  keyChange: "冲突态势由「动态升级」转入「静默死锁」，高压局面呈常态化趋势。",
  investmentSignal: "→ 维持风险资产对冲，增持能源与防御性大宗商品，关注黄金避险买盘。",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-26",
  version: "v2.169",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D179",
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
      value: "WTI $84.20–$86.80 · Brent $88.40–$91.20",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Frequent proxy attacks across multiple regions with sustained US interception operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Waterways overshadowed by exercises and seizure risks; insurance costs remain elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices maintain high risk premiums; spot markets highly sensitive to disruptions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Powers maintain deployments and intel support but avoid direct face-off.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "No signs of compromise; diplomatic channels nearly frozen.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  scoreTrend: [
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78,
      active: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Frequent low-intensity skirmishes in Red Sea and Syria directions",
      "Hormuz threat shifting to routine military exclusion zone maneuvers",
      "Energy markets in a high-level plateau driven by supply anxiety"
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "US Intercepts Drone Attack in Eastern Syria",
      description: "CENTCOM reported intercepting 4 armed drones targeting US bases, blaming Iranian-backed militias.",
      verification: "confirmed",
      timestamp: "2026-08-26",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC Live-Fire Drills in Hormuz",
      description: "IRGC conducted anti-ship missile tests at the strait entrance, forcing commercial rerouting.",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Hold Near $90 on Mideast Premium",
      description: "Reuters analysis notes crude remains supported by strait blockade threats despite global demand fears.",
      verification: "confirmed",
      timestamp: "2026-08-26",
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
        "Continue: US maintains highest readiness at Syria/Iraq bases; interception success rate remains stable.",
        "Change: Iranian drone deployments shifted forward to eastern Syria to challenge early warning systems."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tankers transiting Hormuz must report to Iranian forces, complicating logistics.",
        "Continue: Suez Canal traffic remains at seasonal lows due to Red Sea spillover."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil futures backwardation steepens, highlighting immediate supply tightness.",
        "Change: Spot premiums rose slightly over the last 24h as exercise exclusion zones expanded."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates 'ironclad' support for allies; sanction enforcement remains aggressive.",
        "Continue: Iran MFA vows 'reciprocal response' to any sovereignty violations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands cessation of attacks before diplomacy; Tehran insists on sanctions relief first; logical deadlock."
    ],
    military: [
      "The intertwining of proxy harassment and direct deterrence makes tactical mishaps highly escalatory."
    ]
  },
  keyChange: "Conflict posture has shifted from 'dynamic escalation' to a 'silent deadlock' of high-pressure normalization.",
  investmentSignal: "→ Maintain risk asset hedges, overweight energy and defensive commodities, focus on gold safe-haven bids.",
  change: "none",
  prevRiskScore: 78,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.169 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（持平）：冲突态势由「动态升级」转入「静默死锁」，高压局面呈常态化趋势。",
    bannerWarning: "→ 维持风险资产对冲，增持能源与防御性大宗商品，关注黄金避险买盘。",
    deescalationIntent: "华盛顿要求先停止攻击再谈外交，德黑兰坚持先解除制裁，双方逻辑死锁。",
    structuralRisk: "航道受演习与扣押风险笼罩，保险成本高企。",
    contradictionNote: "华盛顿要求先停止攻击再谈外交，德黑兰坚持先解除制裁，双方逻辑死锁。；代理人骚扰与直接威慑的交织，使战术性误击极易转化为战略性升级。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第179天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.169 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (Flat): Conflict posture has shifted from 'dynamic escalation' to a 'silent deadlock' of high-pressure normalization.",
    bannerWarning: "→ Maintain risk asset hedges, overweight energy and defensive commodities, focus on gold safe-haven bids.",
    deescalationIntent: "Washington demands cessation of attacks before diplomacy; Tehran insists on san…",
    structuralRisk: "Waterways overshadowed by exercises and seizure risks; insurance costs remain elevated.",
    contradictionNote: "Washington demands cessation of attacks before diplomacy; Tehran insists on sanctions relief first; logical deadlock.; The intertwining of proxy harassment and…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 179",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
