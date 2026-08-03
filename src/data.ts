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
  date: "2026-08-03",
  version: "v2.145",
  keyStats: [
    {
      label: "冲突天数",
      value: "D156",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $82.40–$84.10 · Brent $86.55–$88.20",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "高度受限",
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
      description: "代理冲突向叙利亚边境蔓延，局部高频精确打击持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "革命卫队常态化演习造成航道“软封锁”，通行效率受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "国际油价在85美元中枢震荡，地缘溢价抵消了需求疲软预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军维持地中海与波斯湾兵力部署，介入姿态保持高压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "阿曼外交斡旋开启，实质性接触信号出现，打破僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  change: "down",
  keyChange: "阿曼启动外交斡旋促使谈判分值下修，抵消了局部军事冲突的负面影响。",
  scoreTrend: [
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "叙利亚东部遭遇大规无人机袭击",
      description: "疑似针对亲伊武装的物流节点，路透社援引当地信源称损毁严重。",
      verification: "confirmed",
      timestamp: "2026-08-03T04:20:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "阿曼外交代表团访问德黑兰",
      description: "旨在重启秘密对话渠道，半岛电视台称美方已表达缓和意愿。",
      verification: "confirmed",
      timestamp: "2026-08-03T09:15:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理人层面的军事消耗维持在可控范围内。",
      "霍尔木兹海峡的威慑进入制度化、常态化阶段。",
      "第三方中介重启外交试探，寻求危机软着陆空间。"
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
        "变化：叙利亚境内补给点遭精准清除，显示美以情报与打击链高度集成。",
        "延续：波斯湾正面战场保持“冷和平”，无直接国家间交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：IRGC导弹艇维持高频率穿梭演习，船东协会建议日间通行。",
        "变化：由于保险费用持续攀升，中型液化气船开始绕行好望角。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价对军事消息的敏感度钝化，市场注意力转向阿曼斡旋成果。",
        "延续：沙特等产油国维持减产承诺，支撑价格底部。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：哈梅内伊办公室表态称“抵抗不排斥必要的外交策略”，暗示谈判空间。",
        "延续：白宫重申外交解决优先，但拒绝撤回波斯湾兵力部署。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的制裁解除诉求与美国对核计划限制的坚持依然对立。",
      "海湾盟国对美国安全承诺的信心处于重塑期。"
    ],
    military: [
      "以色列“影子战争”策略与伊朗“代理防御”体系的区域碰撞。",
      "美军前沿存在与IRGC反介入区域拒止能力（A2/AD）的实时博弈。"
    ]
  },
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，适度对冲风险资产波动。",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-03",
  version: "v2.145",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D156",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $82.40–$84.10 · Brent $86.55–$88.20",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Highly Restricted",
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
      description: "Proxy conflicts spread to the Syrian border with persistent precision strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC's constant drills create a 'soft blockade' impacting transit efficiency.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices oscillate around $85 as geopolitical risk offset demand concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains heavy naval presence, keeping direct intervention risks elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "Omani mediation has begun, signaling the first substantial contact in weeks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  change: "down",
  keyChange: "Omani diplomatic mediation triggered a slight decrease in negotiation risk, offsetting proxy clashes.",
  scoreTrend: [
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80
    },
    {
      date: "08-03",
      score: 78,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Major Drone Strikes in Eastern Syria",
      description: "Suspected targeting of pro-Iran logistic nodes; Reuters cites local sources reporting significant damage.",
      verification: "confirmed",
      timestamp: "2026-08-03T04:20:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Omani Diplomatic Mission in Tehran",
      description: "Aims to restart backchannel talks; Al Jazeera reports US interest in de-escalation.",
      verification: "confirmed",
      timestamp: "2026-08-03T09:15:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military attrition via proxies remains within controllable bounds.",
      "Deterrence in the Strait of Hormuz has become institutionalized.",
      "Third-party mediators are testing the ground for a soft landing."
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
        "Change: Precision strikes in Syria demonstrate integrated US-Israel intelligence capabilities.",
        "Continue: No direct state-to-state fire in the Persian Gulf theater."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: IRGC maintain high-frequency patrol drills; owners advised daytime passage.",
        "Change: Medium-sized gas carriers begin re-routing via the Cape due to insurance costs."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil price sensitivity to military news is blunted; attention shifts to Omani talks.",
        "Continue: Major producers maintain cuts to support price floors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Khamenei's office hints that 'resistance does not exclude necessary diplomacy'.",
        "Continue: White House prioritizes diplomacy but refuses to withdraw Persian Gulf forces."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable gap between Iran's sanction relief demands and US nuclear restrictions.",
      "Restructuring of Gulf ally confidence in US security guarantees."
    ],
    military: [
      "Clash between Israeli 'Shadow War' and Iranian 'Proxy Defense' frameworks.",
      "Real-time contest between US forward presence and IRGC A2/AD capabilities."
    ]
  },
  investmentSignal: "→ Maintain defensive positions in energy and commodities, hedge risk asset volatility.",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.145 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（↓2）：阿曼启动外交斡旋促使谈判分值下修，抵消了局部军事冲突的负面影响。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，适度对冲风险资产波动。",
    deescalationIntent: "伊朗的制裁解除诉求与美国对核计划限制的坚持依然对立。",
    structuralRisk: "革命卫队常态化演习造成航道“软封锁”，通行效率受阻。",
    contradictionNote: "伊朗的制裁解除诉求与美国对核计划限制的坚持依然对立。；以色列“影子战争”策略与伊朗“代理防御”体系的区域碰撞。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第156天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.145 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (↓2): Omani diplomatic mediation triggered a slight decrease in negotiation risk, offsetting proxy clashes.",
    bannerWarning: "→ Maintain defensive positions in energy and commodities, hedge risk asset volatility.",
    deescalationIntent: "Irreconcilable gap between Iran's sanction relief demands and US nuclear restri…",
    structuralRisk: "IRGC's constant drills create a 'soft blockade' impacting transit efficiency.",
    contradictionNote: "Irreconcilable gap between Iran's sanction relief demands and US nuclear restrictions.; Clash between Israeli 'Shadow War' and Iranian 'Proxy Defense' framewor…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 156",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
