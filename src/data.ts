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
  date: "2026-05-11",
  version: "v2.60",
  riskScore: 84,
  riskScoreChange: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D72",
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
      value: "WTI $112.45–$115.90 · Brent $116.20–$121.05",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全封锁",
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
      description: "发生直接动能交火且封锁区进一步军事化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "商业航运完全停摆，禁航区令通行可能性归零。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI/Brent 区间处于 $112–$121 危机带，市场担忧长期断供。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军实施主动防御打击，大国战略储备博弈加剧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "官方渠道对话停滞，双方立场极度僵硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗建立霍尔木兹禁航区",
      description: "伊朗革命卫队宣布将海峡东部划为军事管制区，威胁扣押未经许可进入的船只，来源：AP。",
      verification: "confirmed",
      timestamp: "2026-05-11 06:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军拦截自杀式无人艇",
      description: "CENTCOM 确认在海峡入口击毁三艘攻击性无人艇，冲突面临升级风险，来源：US DoD。",
      verification: "confirmed",
      timestamp: "2026-05-11 09:40",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "IEA 发布战略储备预警",
      description: "警告全球原油商业库存处于临界低位，供应链韧性面临极端考验，来源：Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-05-10 22:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗确立长期封锁的行政与法律框架",
      "美军进入“主动防御打击”战术阶段",
      "全球能源供应链启动极端断供预案"
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
        "变化：德黑兰正式宣布禁航军事管制区，封锁行动从临时扣押转为行政常态化。",
        "变化：美军中央司令部通报击毁多枚旨在骚扰编队的无人艇，交火频次增加。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡保持 0 商业通航记录，主要船公司将所有亚洲-欧洲航线绕行好望角。",
        "变化：保险费率进入“每日报价”模式，实际处于拒保边缘。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油上探 $121，现货溢价（Backwardation）达到历史极端水平。",
        "变化：IEA 报告确认战略储备消耗速度快于补库计划，库存缓冲消失。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方均无妥协迹象，白宫强调“确保航行自由是核心利益”。",
        "延续：联合国安理会外交陷入僵局，主要大国间缺乏有效危机沟通机制。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗以航道为杠杆换取制裁全面解除的战略目标",
      "美方无法接受在军事胁迫下进行主权条件让步的政治代价"
    ],
    military: [
      "封锁区的“禁航”行政化与美军“航行自由”护航行动的直接碰撞"
    ]
  },
  scoreTrend: [
    {
      date: "05-07",
      score: 84
    },
    {
      date: "05-08",
      score: 84
    },
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
      score: 84,
      active: true
    }
  ],
  keyChange: "伊朗通过建立“禁航区”实现了封锁的法律化和制度化，冲突结构正在硬化。",
  investmentSignal: "→ 维持防御性配置，超配能源与大宗商品，减持风险资产以对冲极端波动风险。",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-11",
  version: "v2.60",
  riskScore: 84,
  riskScoreChange: "Flat",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D72",
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
      value: "WTI $112.45–$115.90 · Brent $116.20–$121.05",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Total Blockade",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct kinetic engagement and further militarization of the blockade zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial shipping completely halted; exclusion zone makes passage impossible.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI/Brent in the $112–$121 crisis band amid supply fears.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active US defensive strikes and intensified strategic reserve posturing.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Official channels stalled with rigid stances on both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Establishes Exclusion Zone",
      description: "IRGC declared a military-controlled area in the eastern strait, threatening seizures. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-05-11 06:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Intercepts Suicide USVs",
      description: "CENTCOM confirmed neutralizing three attack drones at the strait entrance. Source: US DoD.",
      verification: "confirmed",
      timestamp: "2026-05-11 09:40",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "IEA Strategic Reserve Warning",
      description: "Global commercial oil stocks at critical lows; supply chain resilience tested. Source: Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-05-10 22:00",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran formalizes legal framework for long-term blockade",
      "US shifts to 'active defensive strike' tactical phase",
      "Global energy markets initiate extreme supply-cut contingency plans"
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
        "Change: Tehran officially declared a military exclusion zone, formalizing the blockade.",
        "Change: US CENTCOM reported neutralizing multiple USVs targeting ship formations."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Zero commercial transits recorded; major liners rerouting around Cape of Good Hope.",
        "Change: War risk insurance premiums in 'daily quote' mode, nearing non-availability."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent touched $121; spot backwardation at extreme historic levels.",
        "Change: IEA report confirms SPR depletion exceeding replenishment capability."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: No compromise from either side; White House emphasizes freedom of navigation.",
        "Continue: UNSC deadlock remains with no effective crisis communication mechanism."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran using waterway leverage to demand full sanctions relief",
      "US unable to accept political cost of concessions under military coercion"
    ],
    military: [
      "Collision between 'exclusion zone' administrative acts and US 'freedom of navigation' patrols"
    ]
  },
  scoreTrend: [
    {
      date: "05-07",
      score: 84
    },
    {
      date: "05-08",
      score: 84
    },
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
      score: 84,
      active: true
    }
  ],
  keyChange: "The formalization of the exclusion zone by Iran institutionalizes the blockade, hardening the conflict structure.",
  investmentSignal: "→ Maintain defensive positioning; overweight energy and commodities; underweight risk assets to hedge extreme volatility.",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.60 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（持平）：伊朗通过建立“禁航区”实现了封锁的法律化和制度化，冲突结构正在硬化。",
    bannerWarning: "→ 维持防御性配置，超配能源与大宗商品，减持风险资产以对冲极端波动风险。",
    deescalationIntent: "伊朗以航道为杠杆换取制裁全面解除的战略目标",
    structuralRisk: "商业航运完全停摆，禁航区令通行可能性归零。",
    contradictionNote: "伊朗以航道为杠杆换取制裁全面解除的战略目标；封锁区的“禁航”行政化与美军“航行自由”护航行动的直接碰撞",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第72天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.60 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (Flat): The formalization of the exclusion zone by Iran institutionalizes the blockade, hardening the conflict structure.",
    bannerWarning: "→ Maintain defensive positioning; overweight energy and commodities; underweight risk assets to hedge extreme volatilit…",
    deescalationIntent: "Iran using waterway leverage to demand full sanctions relief",
    structuralRisk: "Commercial shipping completely halted; exclusion zone makes passage impossible.",
    contradictionNote: "Iran using waterway leverage to demand full sanctions relief; Collision between 'exclusion zone' administrative acts and US 'freedom of navigation' patrols",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 72",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
