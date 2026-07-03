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
  date: "2026-07-03",
  version: "v2.114",
  riskScore: 60,
  riskTrend: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D125",
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
      value: "WTI $72.50–$74.80 · Brent $76.20–$78.50",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军在海峡上空击落伊朗无人机，属于受控范围内的战术冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主要班轮公司继续绕行，航道流量维持在正常水平的一半以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "布伦特原油区间上移，市场对地缘溢价的重新定价支撑了 $75 以上的价位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军延长航母编队部署，显示了长期的战区化存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "马斯喀特外交渠道依然有效，防止了局势滑向全面战争。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹无人机拦截事件",
      description: "美军宙斯盾舰击落一架试图靠近编队的伊朗无人机，来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US航母部署延长",
      description: "五角大楼宣布林肯号打击群继续留守阿曼湾，来源：DoD。",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "油价因冲突溢价上涨",
      description: "Brent 价格在无人机拦截后上涨 1.5%，达到 $78.50，来源：FT。",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "马斯喀特谈判细节流出",
      description: "消息称双方正讨论设立海军紧急热线以防误判，来源：Al Jazeera。",
      verification: "partial",
      timestamp: "2026-07-03",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "伊朗革命卫队演习",
      description: "IRGC 在格什姆岛展示了新型机动快艇攻击阵型，来源：IRNA。",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊海上直接战术接触增加",
      "大国军事部署进入半永久化阶段",
      "能源市场波动与地缘摩擦高度脱钩减弱，联动性回归"
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
        "变化：美军由纯防御部署转为战术拦截，击落伊方无人机。",
        "延续：伊朗通过海峡周边的常规军事演习保持战术压力。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运维持严重受限状态，通行量维持 40-50% 震荡。",
        "变化：由于无人机拦截事件，特定航线保险费率上调 12%。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 油价区间主体上移至 $76-$78，地缘溢价显现。",
        "延续：WTI 价格受库欣库存数据支撑在 $73 附近企稳。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方均表示不寻求全面战争，但拒绝在核心立场让步。",
        "变化：阿曼确认双方正建立较低级别的战术避险机制。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国对伊极限施压与伊朗维持战略生存权之间的博弈。"
    ],
    military: [
      "美军维持海峡航行自由与伊朗区域拒绝能力（A2/AD）的正面冲突。"
    ]
  },
  scoreTrend: [
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60
    },
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60,
      active: true
    }
  ],
  keyChange: "美军拦截行为与油价区间上移导致综合风险评分回升至 60 关键阈值。",
  investmentSignal: "→ 维持防御性配置，对冲能源资产波动，增持大宗商品风险敞口",
  change: "up",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-03",
  version: "v2.114",
  riskScore: 60,
  riskTrend: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D125",
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
      value: "WTI $72.50–$74.80 · Brent $76.20–$78.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Highly Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US Navy intercepted Iranian drone over the strait; localized tactical engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Major liners continue rerouting; transit volume stays below half of normal levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 1,
      weight: 0.2,
      description: "Brent prices shifted higher as market priced back geopolitical premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US DoD confirmed extension of the Lincoln CSG deployment in the theater.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Muscat channel remains functional, preventing total war despite friction.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Hormuz Drone Interception",
      description: "US Navy ship downed an Iranian drone approaching the fleet. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Carrier Extension",
      description: "Pentagon announced extended deployment for the Lincoln Strike Group. Source: DoD.",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Rise on Friction",
      description: "Brent rose 1.5% to $78.50 after the drone incident. Source: FT.",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Muscat Negotiation Details",
      description: "Reports suggest talks on naval emergency hotlines are ongoing. Source: Al Jazeera.",
      verification: "partial",
      timestamp: "2026-07-03",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "IRGC Naval Drill",
      description: "IRGC displayed new maneuvering fast attack boats near Qeshm Island. Source: IRNA.",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Increased direct tactical contact between US and Iran at sea.",
      "Semi-permanent nature of great power military deployments.",
      "Returning correlation between energy volatility and geopolitical friction."
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
        "Change: US Navy shifted from defense to tactical interception by downing a drone.",
        "Continue: Iran maintains pressure via routine drills around the strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping remains highly restricted (40-50% capacity).",
        "Change: Insurance premiums for specific routes rose 12% following drone downing."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent range moved up to $76-$78 as geopolitical premium returned.",
        "Continue: WTI prices stabilized near $73 supported by Cushing inventory data."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both sides claim they do not seek total war but refuse core concessions.",
        "Change: Oman confirmed a lower-level de-confliction mechanism is being built."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US maximum pressure vs. Iranian strategic survival."
    ],
    military: [
      "US Freedom of Navigation vs. Iranian A2/AD capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "06-29",
      score: 60
    },
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60
    },
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60,
      active: true
    }
  ],
  keyChange: "US interception activity and higher oil price range drove the composite risk score back to 60.",
  investmentSignal: "→ Maintain defensive positioning, hedge energy assets, increase commodity exposure",
  change: "up",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.114 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↑4）：美军拦截行为与油价区间上移导致综合风险评分回升至 60 关键阈值。",
    bannerWarning: "→ 维持防御性配置，对冲能源资产波动，增持大宗商品风险敞口",
    deescalationIntent: "美国对伊极限施压与伊朗维持战略生存权之间的博弈。",
    structuralRisk: "主要班轮公司继续绕行，航道流量维持在正常水平的一半以下。",
    contradictionNote: "美国对伊极限施压与伊朗维持战略生存权之间的博弈。；美军维持海峡航行自由与伊朗区域拒绝能力（A2/AD）的正面冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第125天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.114 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↑4): US interception activity and higher oil price range drove the composite risk score back to 60.",
    bannerWarning: "→ Maintain defensive positioning, hedge energy assets, increase commodity exposure",
    deescalationIntent: "US maximum pressure vs. Iranian strategic survival.",
    structuralRisk: "Major liners continue rerouting; transit volume stays below half of normal levels.",
    contradictionNote: "US maximum pressure vs. Iranian strategic survival.; US Freedom of Navigation vs. Iranian A2/AD capabilities.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 125",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
