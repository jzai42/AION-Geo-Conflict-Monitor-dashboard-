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
  date: "2026-09-12",
  version: "v2.186",
  riskScore: 88,
  keyStats: [
    {
      label: "冲突天数",
      value: "D196",
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
      value: "WTI $107.20–$110.50 · Brent $111.40–$114.80",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊双方维持最高戒备等级，直接交火风险极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道流量大幅下降，IRGC实操封锁压力增加。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "全球油价受供应风险溢价驱动，持续处于$100以上危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国及西方盟友加强制裁与前沿军事部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交接触完全中断，双方均无妥协信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军延长双航母打击群在阿曼湾的驻留",
      description: "美国国防部（DoD）宣布维持USS Abraham Lincoln与USS Theodore Roosevelt在地区部署，应对伊朗导弹威胁。",
      verification: "confirmed",
      timestamp: "2026-09-12 04:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗革命卫队举行大规模反舰实弹演习",
      description: "IRGC在霍尔木兹海峡咽喉地带展示新型精准制导导弹，警告外国海军远离其领海。",
      verification: "confirmed",
      timestamp: "2026-09-12 08:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "原油市场在高位震荡，供应溢价难消",
      description: "受波斯湾局势影响，Brent原油日内高点触及$114.80，避险买盘抵消库存数据影响（Reuters）。",
      verification: "confirmed",
      timestamp: "2026-09-12 11:00",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接军事对抗风险处于六个月来最高水平",
      "霍尔木兹海峡实际处于“部分封锁”状态",
      "外交谈判通道处于完全断绝阶段"
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
        "延续：美伊双方维持防区外导弹对垒，电子战频率在阿曼湾区域显著上升。",
        "延续：伊朗陆基导弹部队在Bandar Abbas地区持续活动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航行主要由于保费飙升和安全担忧而大幅减速。",
        "变化：伊朗宣布在霍尔木兹建立临时演习警戒区，实际上形成短期航道管控。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价区间上沿试探$115关口，市场对任何航道突发事件极度敏感。",
        "延续：OPEC+尚未表态将通过增产对冲地缘政治供应缺口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗哈梅内伊再次重申“抵抗外交”方针。",
        "延续：白宫强调将“采取一切必要措施”保护该地区美军及盟友安全。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求先撤军解除制裁 vs 美国要求先停止代理人行动",
      "双方均缺乏启动外交接触的国内政治意愿"
    ],
    military: [
      "霍尔木兹海峡通行权与封锁权的零和博弈",
      "高烈度对峙下防空系统误判的高概率"
    ]
  },
  scoreTrend: [
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88,
      active: true
    }
  ],
  keyChange: "美军确认双航母长期化部署，伊朗相应升级实弹演习烈度，导致局势在高位彻底黏滞。",
  investmentSignal: "→ 维持 能源 及 避险资产 对冲 仓位，防御 地缘波动风险。",
  change: "none",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-12",
  version: "v2.186",
  riskScore: 88,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D196",
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
      value: "WTI $107.20–$110.50 · Brent $111.40–$114.80",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US and Iran maintain maximum alert levels with extreme risk of direct kinetic engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait throughput remains critically low due to Iranian naval pressure and drills.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global prices elevated by severe supply risk premiums, staying in the crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Significant US military buildup combined with coordinated Western sanctions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels are frozen with no willingness to compromise from either side.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Pentagon Extends Dual Carrier Deployment",
      description: "US confirms USS Abraham Lincoln and USS Theodore Roosevelt will remain in the Gulf of Oman to deter Iranian threats.",
      verification: "confirmed",
      timestamp: "2026-09-12 04:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC Live-Fire Anti-Ship Drills",
      description: "Iran's Revolutionary Guard conducts missile tests near Hormuz chokepoints, warning foreign navies to stay clear.",
      verification: "confirmed",
      timestamp: "2026-09-12 08:30",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil Markets Consolidate at High Levels",
      description: "Brent crude reaches intra-day high of $114.80 as supply fears outweigh global demand outlook (Reuters).",
      verification: "confirmed",
      timestamp: "2026-09-12 11:00",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Risk of direct US-Iran kinetic collision at six-month high",
      "Hormuz Strait under de facto partial blockade",
      "Diplomatic tracks are effectively nonexistent"
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
        "Continue: Standoff persists between US naval assets and Iranian coastal batteries; EW activity high in Gulf of Oman.",
        "Continue: Iranian land-based missile units remain active near Bandar Abbas."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic slow due to insurance spikes and direct security threats.",
        "Change: Temporary exclusion zones for IRGC drills create a short-term controlled transit regime."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent upper bound tests $115 level; markets hyper-sensitive to any tactical incidents.",
        "Continue: OPEC+ has not signaled production increases to mitigate geopolitical supply gaps."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Khamenei reiterates 'Resistance Diplomacy' doctrine.",
        "Continue: White House emphasizes readiness to 'take all necessary steps' to protect forces."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Sanction relief vs. Proxy cessation impasse",
      "Lack of domestic political will for engagement in both capitals"
    ],
    military: [
      "Zero-sum game over Hormuz transit control",
      "High probability of system-level miscalculation during high-alert standoff"
    ]
  },
  scoreTrend: [
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88
    },
    {
      date: "09-12",
      score: 88,
      active: true
    }
  ],
  keyChange: "US confirms long-term dual carrier deployment while Iran escalates live-fire drills, solidifying the high-risk standoff.",
  investmentSignal: "→ Maintain hedges in Energy and safe-haven assets to defend against geopolitical volatility.",
  change: "none",
  prevRiskScore: 88,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.186 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：美军确认双航母长期化部署，伊朗相应升级实弹演习烈度，导致局势在高位彻底黏滞。",
    bannerWarning: "→ 维持 能源 及 避险资产 对冲 仓位，防御 地缘波动风险。",
    deescalationIntent: "伊朗要求先撤军解除制裁 vs 美国要求先停止代理人行动",
    structuralRisk: "航道流量大幅下降，IRGC实操封锁压力增加。",
    contradictionNote: "伊朗要求先撤军解除制裁 vs 美国要求先停止代理人行动；霍尔木兹海峡通行权与封锁权的零和博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第196天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.186 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): US confirms long-term dual carrier deployment while Iran escalates live-fire drills, solidifying the high-risk standoff.",
    bannerWarning: "→ Maintain hedges in Energy and safe-haven assets to defend against geopolitical volatility.",
    deescalationIntent: "Sanction relief vs. Proxy cessation impasse",
    structuralRisk: "Strait throughput remains critically low due to Iranian naval pressure and drills.",
    contradictionNote: "Sanction relief vs. Proxy cessation impasse; Zero-sum game over Hormuz transit control",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 196",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
