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
  date: "2026-10-25",
  version: "v2.233",
  keyStats: [
    {
      label: "冲突天数",
      value: "D239",
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
      value: "WTI $98.84–$103.92 · Brent $108.28–$112.41",
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
  riskScore: 82,
  change: "none",
  keyChange: "美官方释放海峡对峙恐长达一年信号，胡塞多发导弹突袭沙特，油价稳居百美元危机带，局势高位僵持。",
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Reuters与ISW通报显示胡塞武装向沙特麦加、吉达、延布发射多枚导弹遭拦截，前线防空与代理冲突交火多点活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "IMO与USNI News确认10月商船遭袭累计达27起创单月新高，美军对伊港口封锁与伊朗水雷/无人机威胁致通行事实停顿。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "CME与能源市场报道显示WTI在$98.84–$103.92震荡，Brent在$108.28–$112.41维持高位，处于$100–120危机带（URL: https://energynow.ca/ ）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国国防部与CentCom声明确认美军保持区域直接军事部署与封锁巡逻，但尚未扩大为多国全面常规直接交战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "ABC News与巴基斯坦调解官员通报显示，伊朗要求美方赔偿并解除封锁，美方维持强硬施压，谈判渠道陷入实质冻结。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军宣布准备维持对伊港口长期海军封锁，伊朗坚持开峡先决条件不让步。",
      "胡塞武装拓展区域红海与沙特陆上攻击纵深，代理人战线持续外溢。",
      "双方均未出现突破性降级契机，博弈步入消耗性对抗中继阶段。"
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
        "延续：美伊两军在波斯湾及霍尔木兹海峡保持高度戒备对峙与警戒巡航。",
        "变化：胡塞武装对也门亚丁及沙特麦加、吉达等地发起多波次导弹与无人机突袭。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际商业船队绕道航线常态化，霍尔木兹水雷与巡逻骚扰威胁维持高位。",
        "变化：10月商业船只遇袭记录升至27起，美官方预期海峡航运受扰恐超一年。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与布伦特原油持续运行在98–112美元/桶危机带高位震荡。",
        "变化：原油地缘溢价向航运运费及炼厂开工成本深度传导，加剧全球通胀粘性。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊领导层均展现长期消耗战决心，互设不可妥协的前提门槛。",
        "变化：美方高层公开强调不排除战事扩大的军事准备，外交斡旋暂无实质突破。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊朗彻底停止非对称袭击与放弃海峡控制权，作为解除制裁前提。",
      "德黑兰将美军撤销港口封锁与赔偿战损列为恢复通行底线，双方政治诉求完全脱节。"
    ],
    military: [
      "美军前沿封锁舰队与伊朗岸基反舰导弹、水雷战力量构成动态不对称遏制。",
      "红海至波斯湾跨区域代理战场持续骚扰，导致防御方拦截成本与地缘风险溢价居高不下。"
    ]
  },
  scoreTrend: [
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源与大宗商品多头底仓作为地缘对冲，并在宏观风险资产端采取高度防御配置。",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Reuters与ISW通报显示胡塞武装向沙特麦加、吉达、延布发射多枚导弹遭拦截，前线防空与代理冲突交火多点活跃",
      description: "Reuters与ISW通报显示胡塞武装向沙特麦加、吉达、延布发射多枚导弹遭拦截，前线防空与代理冲突交火多点活跃。",
      verification: "single",
      timestamp: "2026-10-25（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "IMO与USNI News确认10月商船遭袭累计达27起创单月新高，美军对伊港口封锁与伊朗水雷/无人机威胁致通行事实停顿",
      description: "IMO与USNI News确认10月商船遭袭累计达27起创单月新高，美军对伊港口封锁与伊朗水雷/无人机威胁致通行事实停顿。",
      verification: "single",
      timestamp: "2026-10-25（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-25",
  version: "v2.233",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D239",
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
      value: "WTI $98.84–$103.92 · Brent $108.28–$112.41",
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
  riskScore: 82,
  change: "none",
  keyChange: "US warns Hormuz standoff could last over a year; Houthis launch fresh missile volleys at Saudi targets; oil remains anchored in the $100+ crisis band.",
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Reuters and ISW reports confirm Houthi ballistic missile launches intercepted over Mecca, Jeddah, and Yanbu, with multi-front proxy engagements remaining highly active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "IMO and USNI News verify October vessel attacks reached a conflict-record high of 27 incidents, cementing the commercial shipping halt under reciprocal blockades.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "CME and EnergyNow market reporting show WTI oscillating in $98.84–$103.92 and Brent in $108.28–$112.41, firmly inside the $100–120 crisis band (URL: https://energynow.ca/ ).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "DoD and CentCom releases corroborate continued direct US naval blockade and escort operations without yet broadening into multi-power open warfare.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "ABC News and Pakistani mediators indicate Iran demands reparations and an end to blockades while Washington insists on unconditional compliance, stalling talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US officials signal preparedness for year-long naval blockades as Iran rejects talks without sanctions relief.",
      "Houthi cross-border strikes against Saudi infrastructure demonstrate ongoing proxy theater widening.",
      "Neither belligerent shows de-escalation flexibility, solidifying a prolonged war of attrition."
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
        "Continue: US and Iranian forces maintain high-readiness aerial patrols and naval standoffs in the Persian Gulf.",
        "Change: Houthi forces launched multi-directional missile and drone attacks targeting Aden and Saudi cities."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial container and tanker fleets continue full-scale rerouting around the Cape of Good Hope.",
        "Change: October commercial ship attacks reached a record 27, while the US warned disruptions may exceed a year."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent crude futures consolidate firmly inside the $98–112/bbl crisis band.",
        "Change: Persistent Gulf geopolitical risk is spreading into bunker fuel surcharges and global refining spreads."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US and Iranian executive leadership reaffirm maximalist conditions with zero compromise.",
        "Change: Washington openly warned of potential military escalation if asymmetric threats persist."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands full cessation of Iranian asymmetric operations and Hormuz control before lifting sanctions.",
      "Tehran makes the termination of US naval blockades and war reparations mandatory prerequisites for any dialogue."
    ],
    military: [
      "US forward-deployed naval assets face persistent asymmetric anti-access and naval mine operational constraints.",
      "Multi-theater proxy missile attacks create disproportionate interception costs and persistent logistics strain."
    ]
  },
  scoreTrend: [
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82,
      active: true
    }
  ],
  investmentSignal: "→ Maintain long positions in energy and commodities to hedge geopolitical risk, while maintaining a defensive posture in risk assets.",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Reuters and ISW reports confirm Houthi ballistic missile launches intercepted over Mecca, Jedda…",
      description: "Reuters and ISW reports confirm Houthi ballistic missile launches intercepted over Mecca, Jeddah, and Yanbu, with multi-front proxy engagements remaining highly active.",
      verification: "single",
      timestamp: "2026-10-25 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "IMO and USNI News verify October vessel attacks reached a conflict-record high of 27 incidents,…",
      description: "IMO and USNI News verify October vessel attacks reached a conflict-record high of 27 incidents, cementing the commercial shipping halt under reciprocal blockades.",
      verification: "single",
      timestamp: "2026-10-25 (same-day reporting)",
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
    node406: "10月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.233 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美官方释放海峡对峙恐长达一年信号，胡塞多发导弹突袭沙特，油价稳居百美元危机带，局势高位僵持。",
    bannerWarning: "→ 维持能源与大宗商品多头底仓作为地缘对冲，并在宏观风险资产端采取高度防御配置。",
    deescalationIntent: "美方要求伊朗彻底停止非对称袭击与放弃海峡控制权，作为解除制裁前提。",
    structuralRisk: "IMO与USNI News确认10月商船遭袭累计达27起创单月新高，美军对伊港口封锁与伊朗水雷/无人机威胁致通行事实停顿。",
    contradictionNote: "美方要求伊朗彻底停止非对称袭击与放弃海峡控制权，作为解除制裁前提。；美军前沿封锁舰队与伊朗岸基反舰导弹、水雷战力量构成动态不对称遏制。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第239天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.233 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): US warns Hormuz standoff could last over a year; Houthis launch fresh missile volleys at Saudi targets; oil remains anchored in the $100+ c…",
    bannerWarning: "→ Maintain long positions in energy and commodities to hedge geopolitical risk, while maintaining a defensive posture i…",
    deescalationIntent: "Washington demands full cessation of Iranian asymmetric operations and Hormuz c…",
    structuralRisk: "IMO and USNI News verify October vessel attacks reached a conflict-record high of 27 incidents, cem…",
    contradictionNote: "Washington demands full cessation of Iranian asymmetric operations and Hormuz control before lifting sanctions.; US forward-deployed naval assets face persiste…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 239",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
