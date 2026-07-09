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
  date: "2026-07-09",
  version: "v2.120",
  riskScore: 66,
  keyStats: [
    {
      label: "冲突天数",
      value: "D131",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $80.50–$82.80 · Brent $84.20–$86.50",
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
      description: "美伊双方分别开展防御部署与实弹军演。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "演习加剧航道风险，商业流量持续低迷。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "油价受供应风险驱动上行，布伦特原油跨入 $85 关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在该地区直接投入额外的防御性重型资产。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "传闻中的秘密谈判未获证实，双方公开立场依然强硬。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军增援爱国者防空系统",
      description: "美国国防部官方宣布，为应对波斯湾威胁，已在关键据点部署额外防空力量。",
      verification: "confirmed",
      timestamp: "2026-07-09 08:30",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗开启革命卫队年度演习",
      description: "伊朗官方媒体及路透社报道，实弹演习涉及无人机与快艇饱和攻击科目。",
      verification: "confirmed",
      timestamp: "2026-07-09 10:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "威慑性力量部署持续增加",
      "能源市场开始计入更高风险权重",
      "外交谈判通道维持冻结态势"
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
        "变化：美军增加海湾地区爱国者防空电池部署（DoD）。",
        "变化：伊朗革命卫队开展针对性封锁演习（Reuters）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行流量依然受限。",
        "变化：演习导致商业船只主动规避敏感演训海域（AP）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油区间上移至 $84-86，市场担忧供应中断风险（Bloomberg）。",
        "延续：WTI 价格在 $80 以上获得强支撑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申对伊朗挑衅行为的军事反制准备。",
        "变化：伊朗外交部淡化秘密接触传闻，强调必须先取消制裁（Al Jazeera）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "制裁解除与核立场互不退让",
      "外交渠道缺乏多边信任背书"
    ],
    military: [
      "地区防御性部署被对方视为进攻性扩张",
      "常规军演具有极高的误判与擦枪走火风险"
    ]
  },
  scoreTrend: [
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66,
      active: true
    }
  ],
  keyChange: "美军增援与伊朗同步军演形成对峙共振，油价开启地缘风险定价。",
  investmentSignal: "→ 防御。增持能源对冲与大宗商品，减持风险资产。",
  change: "up",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-09",
  version: "v2.120",
  riskScore: 66,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D131",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $80.50–$82.80 · Brent $84.20–$86.50",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Defensive deployments and naval drills increase tension.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Drills heighten transit risks; commercial traffic remains low.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "Prices driven by supply concerns; Brent crosses the $85 mark.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct deployment of US defensive assets in the region.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Reported back-channel talks unconfirmed; public stances remain firm.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Deploys Patriot Batteries",
      description: "DoD announces additional air defense assets to regional bases due to Iranian threats.",
      verification: "confirmed",
      timestamp: "2026-07-09 08:30",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC Begins Annual Naval Drills",
      description: "Iranian state media and Reuters report exercises involving drone and fast-boat swarm tactics.",
      verification: "confirmed",
      timestamp: "2026-07-09 10:00",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Continuous buildup of deterrent capabilities",
      "Energy markets pricing in higher risk weights",
      "Diplomatic channels remain largely frozen"
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
        "Change: US DoD confirmed additional Patriot battery deployments (DoD).",
        "Change: IRGC conducting live-fire blockade drills (Reuters)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Traffic through the Strait remains severely restricted.",
        "Change: Commercial vessels actively rerouting from drill zones (AP)."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude shifted to $84-86 range on supply disruption fears (Bloomberg).",
        "Continue: WTI supported above $80."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reaffirms military readiness against provocations.",
        "Change: Iran Foreign Ministry downplays talk of breakthrough (Al Jazeera)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatibility between sanctions relief and nuclear posture",
      "Lack of multilateral trust in diplomatic channels"
    ],
    military: [
      "Defensive deployments perceived as offensive encirclement",
      "High risk of tactical miscalculation during military drills"
    ]
  },
  scoreTrend: [
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66,
      active: true
    }
  ],
  keyChange: "US military reinforcements and Iranian drills creating a deterrent resonance; oil begins pricing georisk.",
  investmentSignal: "→ Defensive. Overweight energy hedges and commodities, underweight risk assets.",
  change: "up",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.120 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 66（↑2）：美军增援与伊朗同步军演形成对峙共振，油价开启地缘风险定价。",
    bannerWarning: "→ 防御。增持能源对冲与大宗商品，减持风险资产。",
    deescalationIntent: "制裁解除与核立场互不退让",
    structuralRisk: "演习加剧航道风险，商业流量持续低迷。",
    contradictionNote: "制裁解除与核立场互不退让；地区防御性部署被对方视为进攻性扩张",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第131天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.120 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 66 (↑2): US military reinforcements and Iranian drills creating a deterrent resonance; oil begins pricing georisk.",
    bannerWarning: "→ Defensive. Overweight energy hedges and commodities, underweight risk assets.",
    deescalationIntent: "Incompatibility between sanctions relief and nuclear posture",
    structuralRisk: "Drills heighten transit risks; commercial traffic remains low.",
    contradictionNote: "Incompatibility between sanctions relief and nuclear posture; Defensive deployments perceived as offensive encirclement",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 131",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
