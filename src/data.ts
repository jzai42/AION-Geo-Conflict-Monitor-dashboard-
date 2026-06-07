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
  date: "2026-06-07",
  version: "v2.88",
  riskScore: 72,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在叙利亚执行报复性打击，代理人冲突烈度维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "保险溢价上涨，主要航道安全性持续受压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在 $85-100 区间主体内维持显著偏强走势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美国维持直接军事干预与部署，区域盟友保持警戒。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "双方外交渠道陷入僵局，无实质性和谈迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D99",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $86.55–88.35 · Brent $90.15–92.05",
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
  events: [
    {
      id: "EVT-01",
      title: "美军空袭叙利亚亲伊武装",
      description: "美中央司令部确认针对受伊朗支持的武装组织进行了定点打击，回应此前美军基地遇袭事件。",
      verification: "confirmed",
      timestamp: "2026-06-07 04:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "航运保险溢价激增",
      description: "霍尔木兹海峡过境船只的战争险溢价环比上涨 15%，反映出市场对骚扰事件的担忧。",
      verification: "confirmed",
      timestamp: "2026-06-07 08:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理人摩擦向直接军事互动演变",
      "能源市场计入长期地缘政治风险溢价",
      "外交调解渠道极度匮乏"
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
        "延续：美军在叙利亚及周边空域维持高频战斗巡逻（DoD）。",
        "变化：亲伊武装无人机活动范围向约旦边境延伸（AP）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗海军在海峡入口进行常规演习，暂未干扰商业通航（Tasnim）。",
        "变化：保险费率的大幅上涨导致部分小型油轮转道好望角（FT）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油在 $90 水平获得支撑，地缘政治溢价难以消退（Bloomberg）。",
        "变化：OPEC+ 声明对局势表示关切，但未宣布即时增产计划（Reuters）。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰重申对外部干涉的强硬回应立场（Press TV）。",
        "变化：美国白宫称目前不寻求与伊朗发生全面冲突（White House）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗核地位与地区扩张 vs 美国制裁与遏制政策",
      "区域内盟友关系的脆弱性导致冲突外溢风险"
    ],
    military: [
      "代理人非对称打击与美军常规武力威慑的错位",
      "霍尔木兹海峡封锁能力作为伊朗的核心不对称杠杆"
    ]
  },
  scoreTrend: [
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72,
      active: true
    }
  ],
  keyChange: "美军在叙直接执行报复性打击，加剧了区域对抗的透明度，油价维持显著风险溢价。",
  investmentSignal: "→ 维持能源与防御性资产权重，对冲风险资产。",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-07",
  version: "v2.88",
  riskScore: 72,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US retaliatory strikes in Syria keep proxy conflict intensity high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Insurance premiums rising; shipping safety remains under pressure.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices remain significantly strong within the $85-100 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "US maintaining direct military intervention and deployments.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels remain deadlocked with no signs of talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D99",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $86.55–88.35 · Brent $90.15–92.05",
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
  events: [
    {
      id: "EVT-01",
      title: "US Airstrikes in Syria",
      description: "CENTCOM confirms precision strikes against IRGC-backed groups following attacks on US bases.",
      verification: "confirmed",
      timestamp: "2026-06-07 04:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Shipping Insurance Surge",
      description: "War risk premiums for Hormuz transit jumped 15% due to heightened harassment threats.",
      verification: "confirmed",
      timestamp: "2026-06-07 08:00 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Proxy friction evolving into direct military interaction",
      "Energy markets factoring in long-term geopolitical premiums",
      "Extreme lack of diplomatic mediation channels"
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
        "Continue: US maintains high-frequency combat air patrols over Syria (DoD).",
        "Change: Pro-Iran drone activity extending toward Jordanian border (AP)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian Navy conducting drills at the strait entry, no disruption to trade yet (Tasnim).",
        "Change: Premium hikes causing small tankers to divert via Cape of Good Hope (FT)."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude supported at $90 level as risk premium persists (Bloomberg).",
        "Change: OPEC+ signals concern but no immediate production hike (Reuters)."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran reiterates tough response stance to external interference (Press TV).",
        "Change: White House states US does not seek full-scale war with Iran (White House)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Nuclear status/regional expansion vs. US sanctions/containment",
      "Fragile regional alliances leading to spillover risks"
    ],
    military: [
      "Asymmetric proxy strikes vs. US conventional deterrence mismatch",
      "Hormuz blockade capability as Iran's core asymmetric lever"
    ]
  },
  scoreTrend: [
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72,
      active: true
    }
  ],
  keyChange: "US direct retaliatory strikes in Syria increase transparency of regional confrontation while oil prices hold risk premiums.",
  investmentSignal: "→ Maintain energy and defensive asset weightings to hedge risks.",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.88 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓4）：美军在叙直接执行报复性打击，加剧了区域对抗的透明度，油价维持显著风险溢价。",
    bannerWarning: "→ 维持能源与防御性资产权重，对冲风险资产。",
    deescalationIntent: "伊朗核地位与地区扩张 vs 美国制裁与遏制政策",
    structuralRisk: "保险溢价上涨，主要航道安全性持续受压。",
    contradictionNote: "伊朗核地位与地区扩张 vs 美国制裁与遏制政策；代理人非对称打击与美军常规武力威慑的错位",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第99天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.88 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓4): US direct retaliatory strikes in Syria increase transparency of regional confrontation while oil prices hold risk premiums.",
    bannerWarning: "→ Maintain energy and defensive asset weightings to hedge risks.",
    deescalationIntent: "Nuclear status/regional expansion vs. US sanctions/containment",
    structuralRisk: "Insurance premiums rising; shipping safety remains under pressure.",
    contradictionNote: "Nuclear status/regional expansion vs. US sanctions/containment; Asymmetric proxy strikes vs. US conventional deterrence mismatch",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 99",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
