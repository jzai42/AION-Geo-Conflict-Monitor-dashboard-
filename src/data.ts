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
  date: "2026-11-09",
  version: "v2.248",
  riskScore: 74,
  keyChange: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D254",
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
      value: "WTI $85.02–$91.42 · Brent $90.63–$98.42",
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
      description: "美军组建铁门特遣队扩大对伊物资封堵，美以暂缓大规模空袭但保留打击准备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗明确否认解封协议传闻，坚持通行必须报备并要求美军完全解除海空封锁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "国际基准油价区间回落至$85–$98美元偏强区间，停火谈判预期带动风险溢价适度退潮。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战区常态化军事部署与封锁任务，区域中介国加速推动穿梭调解。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "间接对话渠道维持开启，但伊朗要求解除制裁与美方先决核限制之间存在巨大立场分歧。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军组建铁门特遣队切断伊朗外围补给通道。",
        "延续：波斯湾及海峡周边防空兵力保持战备对峙状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗官方公开否认达成解封海峡的传闻协议。",
        "延续：国际油轮进出海峡继续受限，通行量处于低谷。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：停火谈判预期促使原油风险溢价自前期高位平抑。",
        "延续：供应链结构性绕航与保费仍处高位支撑油价底线。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方表态谈判期间暂缓空袭并给出数日缓冲窗口。",
        "延续：伊朗将解除制裁与海上封锁绑定为通航前提。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普表态谈判期间极难对伊发动新打击",
      description: "美国总统受访称若外交达成坚实协议则无需追加军事打击，但已列定数十处关键基建打击目标以作施压。",
      verification: "confirmed",
      timestamp: "2026-11-08T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗外交部澄清海峡管制政策并否认妥协传闻",
      description: "伊朗外交部发言人巴加埃表示两天方案仍在桌上，否认80亿美元协议传闻，坚称须先解除美方海军封锁。",
      verification: "confirmed",
      timestamp: "2026-11-09T09:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美军组建铁门特遣队实施多维物资封锁",
      description: "美军中央司令部宣布建立专项特遣部队，将海峡封锁战果拓展至伊朗进出口陆路通道及里海走廊。",
      verification: "confirmed",
      timestamp: "2026-11-09T03:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "基准油价回调整理至85至98美元区间",
      description: "市场对中东外交破局保持谨慎乐观，WTI与Brent盘中回落，但霍尔木兹通行受阻使跌幅收窄。",
      verification: "confirmed",
      timestamp: "2026-11-09T17:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军维持前沿海上封锁并组建外围特遣队施压",
      "伊朗将海峡通航权作为核心谈判筹码拒绝单边让步",
      "短期冲突烈度受外交接触抑制但缺乏长期互信机制"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊方先实质放弃核设施及恢复自由通航，伊朗要求美方先撤销海军封锁并解冻海外资产。"
    ],
    military: [
      "美军前沿封锁威慑与伊朗沿岸反舰导弹及无人机封锁常态化互相对峙。"
    ]
  },
  scoreTrend: [
    {
      date: "11-05",
      score: 74
    },
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源与大宗商品防御性对冲配置，防范霍尔木兹封锁谈判破裂带来的波动风险。",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-09",
  version: "v2.248",
  riskScore: 74,
  keyChange: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D254",
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
      value: "WTI $85.02–$91.42 · Brent $90.63–$98.42",
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
      description: "US establishes Task Force Iron Gate to expand trade interdiction while major airstrikes remain paused pending talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Iran rejects deal rumors, maintaining strict passage notification rules and demanding full termination of the US naval blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks retreat into the $85–$98 range as geopolitical risk premium unwinds on diplomatic engagement hopes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military maintains naval escort and blockade patrols while regional powers facilitate mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Diplomatic contacts remain open, yet a major rift persists between US nuclear curbs and Iranian blockade relief demands.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US CENTCOM creates Task Force Iron Gate to curb Iranian supply lines.",
        "Continue: Air defense forces maintain heightened alert across the Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran officially dismisses rumors of an $8B reopening agreement.",
        "Continue: Commercial tanker passages remain severely restricted."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Diplomacy expectations soften crude risk premium from recent highs.",
        "Continue: Elevated maritime insurance costs provide a firm price floor."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US presidency signals a pause on strikes during negotiation efforts.",
        "Continue: Tehran ties any transit normalization to complete blockade relief."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Signals Unlikelihood of Strikes During Negotiations",
      description: "The US President noted in an interview that broad strikes against Iran are highly unlikely if talks progress, while cautioning that target lists remain intact.",
      verification: "confirmed",
      timestamp: "2026-11-08T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Tehran Clarifies Hormuz Rules and Denies Deal Rumors",
      description: "Iranian Foreign Ministry spokesman Baqaei affirmed the two-day plan remains open while dismissing reports of an $8 billion corridor deal.",
      verification: "confirmed",
      timestamp: "2026-11-09T09:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "US CENTCOM Announces Task Force Iron Gate",
      description: "US Central Command formed a dedicated task force aiming to restrict Iranian land and Caspian Sea trade routes.",
      verification: "confirmed",
      timestamp: "2026-11-09T03:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Retreat Toward $85–$98 Range",
      description: "Oil markets eased on Monday as investors recalibrated regional supply risks against ongoing diplomatic overtures.",
      verification: "confirmed",
      timestamp: "2026-11-09T17:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US Navy continues enforcing maritime containment alongside supply route tracking",
      "Iran leverages Strait of Hormuz controls as principal bargaining leverage",
      "Short-term kinetic strikes remain restrained by active diplomatic windows"
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Washington demands verifiable nuclear rollbacks, whereas Tehran demands immediate lifting of naval blockades and asset releases."
    ],
    military: [
      "US carrier-led naval containment confronts Iran's coastal anti-ship missile and asymmetric drone deployment posture."
    ]
  },
  scoreTrend: [
    {
      date: "11-05",
      score: 74
    },
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74,
      active: true
    }
  ],
  investmentSignal: "→ Maintain defensive hedges in energy and commodities to guard against volatility risks should Hormuz blockade negotiations stall.",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.248 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：none",
    bannerWarning: "→ 维持能源与大宗商品防御性对冲配置，防范霍尔木兹封锁谈判破裂带来的波动风险。",
    deescalationIntent: "美方要求伊方先实质放弃核设施及恢复自由通航，伊朗要求美方先撤销海军封锁并解冻海外资产。",
    structuralRisk: "伊朗明确否认解封协议传闻，坚持通行必须报备并要求美军完全解除海空封锁。",
    contradictionNote: "美方要求伊方先实质放弃核设施及恢复自由通航，伊朗要求美方先撤销海军封锁并解冻海外资产。；美军前沿封锁威慑与伊朗沿岸反舰导弹及无人机封锁常态化互相对峙。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第254天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.248 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): none",
    bannerWarning: "→ Maintain defensive hedges in energy and commodities to guard against volatility risks should Hormuz blockade negotiat…",
    deescalationIntent: "Washington demands verifiable nuclear rollbacks, whereas Tehran demands immedia…",
    structuralRisk: "Iran rejects deal rumors, maintaining strict passage notification rules and demanding full terminat…",
    contradictionNote: "Washington demands verifiable nuclear rollbacks, whereas Tehran demands immediate lifting of naval blockades and asset releases.; US carrier-led naval containm…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 254",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
