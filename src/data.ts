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
  date: "2026-10-09",
  version: "v2.216",
  riskScore: 70,
  change: "none",
  keyChange: "美伊首脑释出暂缓打击与海峡方案审议信号，但霍尔木兹受限运量腰斩及百元油价令高风险评级黏滞。",
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，警惕外交降温言论引发短期风险资产剧烈波动。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D223",
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
      value: "WTI $90.01–$92.15 · Brent $102.39–$105.07",
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
      description: "美军暂缓对伊直接打击但海上封锁未撤，周边代理交火与导弹袭击仍在多线展开。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油轮遇袭风险居高不下，海峡实际通航量较前期骤降近半，通行条件依然苛刻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent基准稳居100美元上方危机带，盘中虽受谈判消息扰动回落但高风险溢价未除。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持海空封锁部署与防务威慑，多国维持防御性兵力进驻，未演变为多极直面对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "美伊就7日重开海峡草案展开间接审议与沟通，具备初步降级窗口但缺乏终局互信。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊领导层均释出选举前管控冲突升级烈度的外交沟通意愿。",
      "霍尔木兹海峡通行量与袭船威胁仍在低位承压，实质封锁未解。"
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
        "变化：特朗普声明在11月3日中期选举前不会对伊发起新军事打击。",
        "延续：也门胡塞武装对沙特利雅得机场等地维持持续性导弹袭击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：双方通过调解渠道审查七日内逐步恢复海峡通航提案。",
        "延续：霍尔木兹海峡日均原油运量较上周减半，成品油航运基本中断。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：双边缓和言论促使原油高位获利了结，盘中出现温和回撤。",
        "延续：Brent主体运行于$102–105危机区间，供应链恐慌溢价犹存。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊公开承认进行间接有效沟通，德黑兰强调拒绝单边威逼。",
        "延续：美方声明对伊海上封锁在达成最终协议前依然完全生效。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方国内选举周期诉求压制油价与德黑兰要求彻底解除封锁制裁之间的立场裂痕。"
    ],
    military: [
      "停火护航协议悬空下前线袭船惯性与美军封锁舰队战术防御之间的对抗风险。"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "特朗普宣布中期选举前不对伊朗实施打击",
      description: "美国总统特朗普在社交媒体证实选举前不会扩大对伊本土军事行动，并称双方接触取得一定进展，但海上封锁继续生效。",
      verification: "confirmed",
      timestamp: "2026-10-08T21:03:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗审查美方关于七日海峡重开计划回应",
      description: "伊朗外长阿拉格齐向媒体表示，正就德黑兰递交的七日内恢复霍尔木兹通行协议草案审查美方正式反馈，近期将予答复。",
      verification: "confirmed",
      timestamp: "2026-10-09T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "霍尔木兹原油运输量腰斩且成品油几近停运",
      description: "航运追踪机构Kpler指出，受多起油轮遇袭事件影响，本周霍尔木兹海峡原油通行量自1600万桶跌至约800万桶。",
      verification: "confirmed",
      timestamp: "2026-10-08T17:03:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "胡塞武装多轮导弹袭击沙特利雅得机场",
      description: "也门胡塞武装再次声称对沙特首都哈立德国王国际机场发起弹道导弹打击，引发区域民航与防务警戒升级。",
      verification: "confirmed",
      timestamp: "2026-10-09T14:41:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-09",
  version: "v2.216",
  riskScore: 70,
  change: "none",
  keyChange: "US-Iran leaders signaled intent to avoid pre-election strikes while reviewing a Hormuz reopening plan, yet halved tanker flows and $100+ Brent keep systemic risk elevated.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities while hedging against volatility driven by short-term diplomatic noise.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D223",
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
      value: "WTI $90.01–$92.15 · Brent $102.39–$105.07",
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
      description: "The US pledged no direct strikes before midterms, but the naval blockade and active proxy strikes continue across multiple fronts.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Elevated vessel strike risks persist as daily crude flows dropped by nearly half and refined product traffic remains paralyzed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent benchmarks hold within the $100–120 crisis band despite mild intraday retreats triggered by diplomatic talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces enforce naval quarantine and maritime escort postures while regional partners emphasize strictly defensive roles.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Both sides are reviewing a 7-day Hormuz corridor proposal, establishing temporary dialogue without a comprehensive settlement.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both governments signaled political will to avoid immediate military escalations ahead of US elections.",
      "Substantial shipping disruptions and projectile attacks maintain tight physical transit constraints."
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
        "Change: Trump confirmed no new military strikes against Iran prior to the November 3 midterms.",
        "Continue: Houthi forces maintain ballistic missile launches targeting Riyadh airport."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Diplomatic intermediaries facilitate review of a seven-day phased reopening proposal.",
        "Continue: Daily Hormuz crude volumes remain halved compared to peak rebound levels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude benchmarks retreated modestly from highs on news of bilateral dialogue.",
        "Continue: Brent crude trades above $102/bbl, sustaining substantial geopolitical premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington and Tehran acknowledged indirect communication on shipping protocols.",
        "Continue: US administration maintains that the maritime blockade will stay enforced."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US pre-election domestic fuel containment pressures clash with Tehran's demand for sweeping sanctions and blockade relief."
    ],
    military: [
      "Tactical projectile attacks on merchant vessels collide with carrier group blockade enforcement without an agreed truce."
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "Trump Rules Out Strikes on Iran Ahead of Midterms",
      description: "US President Trump announced Washington will not strike Iran before the November midterms, citing productive talks while keeping the naval blockade intact.",
      verification: "confirmed",
      timestamp: "2026-10-08T21:03:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Tehran Evaluates US Response on Hormuz Reopening Plan",
      description: "Iranian Foreign Minister Abbas Araghchi stated that Iran is reviewing a US reply to a 7-day Strait of Hormuz de-escalation plan and will respond shortly.",
      verification: "confirmed",
      timestamp: "2026-10-09T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Hormuz Oil Flows Halved Amid Continued Vessel Risks",
      description: "Kpler tracking data revealed crude transit volumes dropped from nearly 16 million to 8 million barrels per day following recent projectile strikes.",
      verification: "confirmed",
      timestamp: "2026-10-08T17:03:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Houthi Missile Strikes Target Riyadh International Airport",
      description: "Houthi forces claimed multiple ballistic missile strikes against King Khalid International Airport in Riyadh, prompting elevated Gulf air alerts.",
      verification: "confirmed",
      timestamp: "2026-10-09T14:41:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64
    },
    {
      date: "10-07",
      score: 64
    },
    {
      date: "10-08",
      score: 70
    },
    {
      date: "10-09",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.216 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊首脑释出暂缓打击与海峡方案审议信号，但霍尔木兹受限运量腰斩及百元油价令高风险评级黏滞。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，警惕外交降温言论引发短期风险资产剧烈波动。",
    deescalationIntent: "美方国内选举周期诉求压制油价与德黑兰要求彻底解除封锁制裁之间的立场裂痕。",
    structuralRisk: "油轮遇袭风险居高不下，海峡实际通航量较前期骤降近半，通行条件依然苛刻。",
    contradictionNote: "美方国内选举周期诉求压制油价与德黑兰要求彻底解除封锁制裁之间的立场裂痕。；停火护航协议悬空下前线袭船惯性与美军封锁舰队战术防御之间的对抗风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第223天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.216 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US-Iran leaders signaled intent to avoid pre-election strikes while reviewing a Hormuz reopening plan, yet halved tanker flows and $100+ Br…",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities while hedging against volatility driven by short-term diplom…",
    deescalationIntent: "US pre-election domestic fuel containment pressures clash with Tehran's demand …",
    structuralRisk: "Elevated vessel strike risks persist as daily crude flows dropped by nearly half and refined produc…",
    contradictionNote: "US pre-election domestic fuel containment pressures clash with Tehran's demand for sweeping sanctions and blockade relief.; Tactical projectile attacks on merc…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 223",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
