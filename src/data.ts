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
  date: "2026-10-19",
  version: "v2.227",
  keyStats: [
    {
      label: "冲突天数",
      value: "D233",
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
      value: "WTI $96.73–$99.24 · Brent $106.82–$110.25",
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
      description: "多条战线维持高频活跃。胡塞武装无人机和导弹成功突破防线，袭击沙特首都利雅得导致地标建筑封闭。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡及周边水域连续处于瘫痪状态。此前的商船遇袭沉没事件使得大型班轮公司无限期停航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价维持在危机带区间。地缘冲突引发的实质性断供忧虑与俄罗斯炼厂遇袭交织，抵消了释放战略原油的影响。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国深度参与直接军事行动并维持高强度前沿部署。俄罗斯加紧外交干预，派遣高层访问德黑兰进行危机斡旋。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双边核心谈判渠道依然冻结。虽然存在俄罗斯等第三方的单边斡旋，但美伊在底线问题上互不让步，降级协议遥遥无期。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "EVT-01",
      title: "胡塞武装袭击利雅得",
      description: "沙特首都利雅得遭到胡塞武装无人机和导弹夜间袭击，导致地标性建筑被迫关闭，暴露了代理人武装的打击半径。(Fox News, AFP)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "俄罗斯外长访问伊朗",
      description: "俄罗斯外交部长抵达德黑兰进行高层磋商，试图在全面战争边缘进行危机斡旋。(CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油市剧烈震荡维持危机带",
      description: "Brent原油在106-110美元的高风险区间内发生剧烈日内波动，表明能源市场对地缘溢价的极度敏感。(Seeking Alpha, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗军方重申强硬立场",
      description: "伊朗军队高层官员公开警告美国与以色列不要出现“误判”，声称其区域威慑力量仍在发挥效力。(CNN, Fox News)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突从短期的急剧爆发转入中长期的代理人与正规军混战消耗阶段。",
      "第三方大国的介入以底线防守为主，难以强制性扭转当事方的敌对状态。"
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
        "变化：多条战线维持高频活跃。",
        "变化：胡塞武装无人机和导弹成功突破防线，袭击沙特首都利雅得导致地标建筑封闭。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡及周边水域连续处于瘫痪状态。",
        "变化：此前的商船遇袭沉没事件使得大型班轮公司无限期停航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价维持在危机带区间。",
        "变化：地缘冲突引发的实质性断供忧虑与俄罗斯炼厂遇袭交织，抵消了释放战略原油的影响。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国深度参与直接军事行动并维持高强度前沿部署。",
        "变化：俄罗斯加紧外交干预，派遣高层访问德黑兰进行危机斡旋。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国国内政治压力要求快速平息中东战火，但以色列与美国军方的安全诉求导致难以撤军。",
      "伊朗试图通过代理人维持区域话语权，但长期冲突正在透支其内部经济承受力。"
    ],
    military: [
      "美以高科技精准打击与伊朗系武装的分布式非对称消耗（如胡塞武装袭城）形成难以速决的僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86,
      active: true
    }
  ],
  keyChange: "多线战事黏滞，国际外交斡旋尚未取得实质突破，综合风险高位企稳。",
  investmentSignal: "→ 维持防御性资产配置，因中东地缘烈度无降温迹象，建议继续对冲并增持能源及大宗商品头寸。",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-19",
  version: "v2.227",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D233",
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
      value: "WTI $96.73–$99.24 · Brent $106.82–$110.25",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Full Blockade",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Multi-front engagement remains highly active. Houthi drones and missiles breached defenses, striking the Saudi capital of Riyadh and forcing landmark closures.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The Strait of Hormuz and surrounding waters remain completely paralyzed. Recent incidents of commercial vessels sinking have led to indefinite suspensions by major shipping lines.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices persist within the crisis band. Geopolitical supply disruption fears coupled with strikes on Russian refineries offset the impacts of strategic reserve releases.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US maintains deep direct military involvement and high-intensity forward deployments. Russia accelerates diplomatic intervention, dispatching senior officials to Tehran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Bilateral core negotiation channels remain frozen. Despite unilateral mediation by third parties like Russia, the US and Iran refuse to compromise on baseline issues.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "EVT-01",
      title: "Houthi Attacks on Riyadh",
      description: "The Saudi capital of Riyadh was targeted by nighttime drone and missile attacks from Houthi forces, forcing the closure of prominent landmarks and highlighting the reach of proxy militias. (Fox News, AFP)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Russian FM Visits Iran",
      description: "The Russian Foreign Minister arrived in Tehran for high-level consultations, attempting mediation on the brink of a full-scale regional war. (CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Market Volatility in Crisis Band",
      description: "Brent crude experienced severe intraday volatility within the high-risk $106-$110 range, underscoring extreme market sensitivity to geopolitical premiums. (Seeking Alpha, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iranian Military Reiterates Tough Stance",
      description: "Top Iranian military commanders publicly warned the US and Israel against \"miscalculation,\" claiming their regional deterrence remains fully operational. (CNN, Fox News)",
      verification: "confirmed",
      timestamp: "2026-10-19",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict has transitioned from an acute short-term eruption into a prolonged phase of attrition involving proxies and conventional forces.",
      "Third-party great power intervention remains defensive, failing to forcefully reverse the entrenched hostilities of the primary belligerents."
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
        "Change: Multi-front engagement remains highly active.",
        "Change: Houthi drones and missiles breached defenses, striking the Saudi capital of Riyadh and forcing landmark closures."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The Strait of Hormuz and surrounding waters remain completely paralyzed.",
        "Change: Recent incidents of commercial vessels sinking have led to indefinite suspensions by major shipping lines."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices persist within the crisis band.",
        "Change: Geopolitical supply disruption fears coupled with strikes on Russian refineries offset the impacts of strategic reserve releases."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US maintains deep direct military involvement and high-intensity forward deployments.",
        "Change: Russia accelerates diplomatic intervention, dispatching senior officials to Tehran."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Domestic political pressure in the US demands a swift resolution to the Middle East conflict, conflicting with the security imperatives of Israel and the US military.",
      "Iran seeks to maintain regional hegemony through proxies, but the protracted conflict is severely straining its internal economic resilience."
    ],
    military: [
      "A stalemate has formed between US-Israeli high-tech precision strikes and the distributed, asymmetrical warfare tactics of Iranian-backed proxies."
    ]
  },
  scoreTrend: [
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86,
      active: true
    }
  ],
  keyChange: "Multi-front warfare remains stagnant with high risks intact, as international mediation fails to achieve substantive breakthroughs.",
  investmentSignal: "→ Maintain a defensive posture; with no signs of geopolitical cooling, overweight energy and commodity positions to hedge against extreme tail risks.",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.227 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 86（持平）：多线战事黏滞，国际外交斡旋尚未取得实质突破，综合风险高位企稳。",
    bannerWarning: "→ 维持防御性资产配置，因中东地缘烈度无降温迹象，建议继续对冲并增持能源及大宗商品头寸。",
    deescalationIntent: "美国国内政治压力要求快速平息中东战火，但以色列与美国军方的安全诉求导致难以撤军。",
    structuralRisk: "霍尔木兹海峡及周边水域连续处于瘫痪状态。此前的商船遇袭沉没事件使得大型班轮公司无限期停航。",
    contradictionNote: "美国国内政治压力要求快速平息中东战火，但以色列与美国军方的安全诉求导致难以撤军。；美以高科技精准打击与伊朗系武装的分布式非对称消耗（如胡塞武装袭城）形成难以速决的僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第233天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.227 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 86 (Flat): Multi-front warfare remains stagnant with high risks intact, as international mediation fails to achieve substantive breakthroughs.",
    bannerWarning: "→ Maintain a defensive posture; with no signs of geopolitical cooling, overweight energy and commodity positions to hed…",
    deescalationIntent: "Domestic political pressure in the US demands a swift resolution to the Middle …",
    structuralRisk: "The Strait of Hormuz and surrounding waters remain completely paralyzed. Recent incidents of commer…",
    contradictionNote: "Domestic political pressure in the US demands a swift resolution to the Middle East conflict, conflicting with the security imperatives of Israel and the US mi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 233",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
