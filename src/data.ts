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
  date: "2026-04-26",
  version: "v2.44",
  riskScore: 76,
  keyStats: [
    {
      label: "冲突天数",
      value: "D57",
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
      value: "WTI $88.90–$91.45 · Brent $93.10–$95.80",
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
      description: "美伊直接交火风险维持在红色预警边缘。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗实施强制性电子识别管控，航道处于半封锁状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在 $90 关口上方震荡，供应恐慌尚未转化为全面短缺。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事存在维持高位，外部势力尚未直接参战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "马斯喀特渠道激活，缓解了全面爆发战争的紧迫性。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "马斯喀特秘密磋商重启",
      description: "阿曼外交部确认，美伊代表正在马斯喀特通过中间人就航道降级方案进行磋商，来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-04-26",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC 发布「动态监控」通告",
      description: "伊朗革命卫队强制要求霍尔木兹航运报告航迹与货物清单，违者将遭驱逐，来源：AP。",
      verification: "confirmed",
      timestamp: "2026-04-26",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "油价因降级传闻止涨",
      description: "受阿曼斡旋消息影响，Brent 原油从日内高点 $95.80 回落至 $94.10，来源：Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-04-26",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗放弃全面封锁，转而通过「行政管控」实质瘫痪自由航行",
      "美国以巡航保护替代直接反击，双方均在测试底线",
      "外交谈判的介入使冲突进入「谈打并举」的相持期"
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
        "延续：美伊海空力量在波斯湾保持「雷达锁定」级别的对峙状态。",
        "变化：伊朗在霍姆兹甘省增设地对舰导弹阵地。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：马士基等主要班轮公司宣布继续暂停部分高风险航线。",
        "延续：海峡通行流量维持在正常水平的 40% 左右。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：现货溢价显著，市场正在定价长期航道受阻的后果。",
        "变化：亚洲买家开始寻求通过陆路管线对冲波斯湾风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗最高领袖哈梅内伊办公室表态「不惧战亦不求战」。",
        "延续：白宫重申霍尔木兹海峡开放是美军的红线。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求取消制裁以换取航道开放",
      "美国要求伊朗停止对地区代理人的武装支持"
    ],
    military: [
      "伊朗的区域反介入（A2/AD）能力与美国全球航行自由（FONOP）的冲突"
    ]
  },
  scoreTrend: [
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76,
      active: true
    }
  ],
  keyChange: "冲突性质从「突发升级」转入「长期化高压对峙」。",
  investmentSignal: "→ 维持能源及大宗防御性头寸",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-26",
  version: "v2.44",
  riskScore: 76,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D57",
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
      value: "WTI $88.90–$91.45 · Brent $93.10–$95.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Highly Restricted",
      unit: "Transit",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct engagement risk remains near red-alert levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Mandatory electronic ID control by Iran effectively semi-blocks the strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices fluctuating above $90 mark.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military presence remains high; external powers haven't directly joined combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Muscat channel activated, reducing urgency of all-out war.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Muscat Backchannel Reopened",
      description: "Oman MOFA confirms US and Iran representatives are discussing maritime de-escalation via intermediaries. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-04-26",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Dynamic Monitoring Policy",
      description: "IRGC mandates vessels report tracks and manifests or face expulsion. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-04-26",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran moves from seizure to 'administrative control' of shipping",
      "US prioritizes patrol protection over kinetic retaliation",
      "Conflict enters a stalemate where diplomacy and naval standoff coexist"
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
        "Continue: US and Iranian forces maintain 'radar lock' alert levels in the Persian Gulf.",
        "Change: Iran deploys additional anti-ship missile batteries in Hormozgan province."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Major carriers like Maersk continue to suspend high-risk routes.",
        "Continue: Strait transit volume remains at ~40% of normal capacity."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Heavy backwardation in spot markets pricing in long-term disruption.",
        "Change: Asian buyers seeking overland pipeline alternatives to hedge Gulf risk."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Supreme Leader's office states 'neither fear nor seek war'.",
        "Continue: White House reiterates that Hormuz opening is a non-negotiable red line."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran demands sanctions relief for strait opening",
      "US demands cessation of Iranian support for regional proxies"
    ],
    military: [
      "Conflict between Iranian A2/AD and US FONOP doctrines"
    ]
  },
  scoreTrend: [
    {
      date: "04-22",
      score: 76
    },
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76,
      active: true
    }
  ],
  keyChange: "Conflict shifted from acute escalation to prolonged high-pressure standoff.",
  investmentSignal: "→ Maintain energy and commodity defensive positions",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.44 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑4）：冲突性质从「突发升级」转入「长期化高压对峙」。",
    bannerWarning: "→ 维持能源及大宗防御性头寸",
    deescalationIntent: "伊朗要求取消制裁以换取航道开放",
    structuralRisk: "伊朗实施强制性电子识别管控，航道处于半封锁状态。",
    contradictionNote: "伊朗要求取消制裁以换取航道开放；伊朗的区域反介入（A2/AD）能力与美国全球航行自由（FONOP）的冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第57天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.44 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑4): Conflict shifted from acute escalation to prolonged high-pressure standoff.",
    bannerWarning: "→ Maintain energy and commodity defensive positions",
    deescalationIntent: "Iran demands sanctions relief for strait opening",
    structuralRisk: "Mandatory electronic ID control by Iran effectively semi-blocks the strait.",
    contradictionNote: "Iran demands sanctions relief for strait opening; Conflict between Iranian A2/AD and US FONOP doctrines",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 57",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
