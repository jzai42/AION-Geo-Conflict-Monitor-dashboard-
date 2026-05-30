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
  date: "2026-05-30",
  version: "v2.80",
  keyStats: [
    {
      label: "冲突天数",
      value: "D91",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $87.36–$87.87 · Brent $91.44–$92.05",
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
  riskScore: 64,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "双方军事对峙与威慑姿态延续，虽有谈判信号，但擦枪走火风险未完全消除。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡商业航运持续停滞，仅有伊朗官方宣称的少量协调通行，未获独立证实，实际封锁状态未变。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "对美伊达成停火延期协议的预期导致油价大幅下跌，市场对供应短缺的担忧暂时降温。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国作为冲突核心方，其军事部署与直接外交谈判体现了极高介入度，该态势没有改变。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "美伊据报达成延长停火60天并开启核谈判的临时协议，标志着冲突以来最重要的外交突破。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊据报达成延长停火与核谈判临时协议，待特朗普批准",
      description: "多家媒体援引美国官员消息称，美伊谈判代表已达成一项延长停火60天的临时协议，并开启新一轮核问题谈判。协议细节包括伊朗交出其高浓缩铀库存，并确保霍尔木兹海峡开放。然而，协议尚未得到美国总统特朗普的最终批准，且伊朗方面否认就核问题进行谈判，增加了不确定性。(Associated Press, Axios)",
      verification: "confirmed",
      timestamp: "2026-05-29T09:40:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美国对协助伊朗军方的采购网络实施新制裁",
      description: "美国财政部宣布对一个位于伊朗的采购网络实施制裁，该网络被指控冒充美国公司，为伊朗国防部及其他受制裁的实体采购受限技术。此举是美国在谈判期间继续对伊朗施加经济压力的一部分。(US Department of the Treasury)",
      verification: "confirmed",
      timestamp: "2026-05-29T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡航运仍严重受阻，伊朗声称有船只协调通行",
      description: "尽管有谈判进展的消息，霍尔木兹海峡的商业航运仍基本处于停滞状态。伊朗国家电视台声称，过去24小时内有24艘船只在伊朗军方协调下通过了海峡。然而，独立货运数据（如Flexport）显示，商业航行仍然极度受限，多数船公司暂停服务，使伊朗的说法难以被独立证实。(CBS News, Flexport)",
      verification: "partial",
      timestamp: "2026-05-29T15:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "受停火谈判进展影响，国际油价显著承压回落",
      description: "关于美伊可能延长停火并重开霍尔木兹海峡的报道，显著缓解了市场对供应中断的担忧，导致WTI和布伦特原油价格大幅下跌。WTI跌至约87-88美元区间，布伦特跌至约91-92美元区间，均为数周低点。(Reuters, The Business Times)",
      verification: "confirmed",
      timestamp: "2026-05-29T21:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-05",
      title: "特朗普公开对伊协议三大“红线”：弃核、开放海峡、交出浓缩铀",
      description: "美国总统特朗普通过社交媒体表示，任何与伊朗的协议都必须满足三个核心条件：伊朗承诺永不拥有核武器、立即无条件开放霍尔木兹海峡、以及将其高浓缩铀库存交由美国和国际原子能机构销毁。这为潜在协议设定了极高的门槛。(CBS News, Kurdistan24)",
      verification: "confirmed",
      timestamp: "2026-05-29T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "观望跟踪",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方虽达成临时协议，但互信基础薄弱，且协议待最终批准，随时可能因误判或国内政治因素重回高压对峙。",
      "外交轨道取得突破，双方谈判代表据报达成延长停火60天的协议，是自冲突以来首次出现明确的降级路径。",
      "市场正消化谈判的积极信号，但军事和航运的实质性僵局未解，未来走向高度依赖于协议的最终批准与执行情况。"
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
        "变化：双方军事对峙与威慑姿态延续，虽有谈判信号，但擦枪走火风险未完全消除。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡商业航运持续停滞，仅有伊朗官方宣称的少量协调通行，未获独立证实，实际封锁状态未变。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对美伊达成停火延期协议的预期导致油价大幅下跌，市场对供应短缺的担忧暂时降温。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国作为冲突核心方，其军事部署与直接外交谈判体现了极高介入度，该态势没有改变。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗彻底弃核并完全开放海峡，与伊朗寻求保留核能力并主导地区安全的战略目标存在根本冲突。",
      "双方内部均面临强硬派压力，任何让步都可能在国内遭遇政治阻力，导致协议难以最终敲定和执行。"
    ],
    military: [
      "美军旨在确保国际航行自由，而伊朗伊斯兰革命卫队则试图将对霍尔木兹海峡的控制作为战略筹码，双方在海峡的控制权问题上互不相让。"
    ]
  },
  scoreTrend: [
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64,
      active: true
    }
  ],
  keyChange: "美伊据报达成延长停火60天并开启核谈判的临时协议，显著改善了冲突降级的前景，并导致油价大幅回落。但协议尚待最终批准，且双方在核心问题上分歧依旧，不确定性仍高。",
  investmentSignal: "→ 鉴于谈判取得突破但最终协议仍存变数，建议对风险资产采取谨慎乐观态度，可考虑部分减持能源多头头寸，并利用期权对冲协议破裂的尾部风险。",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran military news May 2026",
    "Strait of Hormuz shipping status May 2026",
    "Iran nuclear talks update May 2026",
    "US sanctions Iran May 2026",
    "WTI crude price May 30 2026",
    "Brent crude price May 30 2026",
    "oil price trend May 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-30",
  version: "v2.80",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D91",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $87.36–$87.87 · Brent $91.44–$92.05",
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
  riskScore: 64,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Military standoff and deterrence postures continue; while diplomatic signals have emerged, the risk of miscalculation has not been fully eliminated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping through the strait remains stalled, with only unconfirmed Iranian claims of limited coordinated passages; the de facto blockade is unchanged.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Expectations of a US-Iran ceasefire extension agreement have led to a sharp decline in oil prices, temporarily easing market concerns about supply shortages.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States, as a primary party to the conflict, demonstrates a very high level of involvement through its military presence and direct diplomatic negotiations, a situation that remains unchanged.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "The U.S. and Iran have reportedly reached a tentative agreement to extend the ceasefire by 60 days and start nuclear talks, marking the most significant diplomatic breakthrough since the conflict began.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Reportedly Reach Tentative Deal to Extend Ceasefire, Start Nuclear Talks, Pending Trump's Approval",
      description: "Multiple media outlets, citing U.S. officials, reported that negotiators from the U.S. and Iran have reached a tentative agreement to extend the current ceasefire by 60 days and initiate a new round of nuclear talks. The deal reportedly includes Iran handing over its highly enriched uranium stockpile and ensuring the Strait of Hormuz remains open. However, the agreement has not yet received final approval from President Trump, and Iran has denied that nuclear issues are part of the negotiations, adding to uncertainty. (Associated Press, Axios)",
      verification: "confirmed",
      timestamp: "2026-05-29T09:40:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Imposes New Sanctions on Procurement Network Assisting Iranian Military",
      description: "The U.S. Department of the Treasury announced sanctions on an Iran-based procurement network accused of impersonating U.S. companies to acquire restricted technology for Iran's Ministry of Defense and other sanctioned entities. This action is part of ongoing U.S. economic pressure on Iran amidst negotiations. (US Department of the Treasury)",
      verification: "confirmed",
      timestamp: "2026-05-29T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Hormuz Shipping Remains Severely Disrupted; Iran Claims Coordinated Passage of Some Vessels",
      description: "Despite news of diplomatic progress, commercial shipping in the Strait of Hormuz remains largely at a standstill. Iranian state television claimed that 24 ships passed through the strait in the last 24 hours under coordination with the Iranian military. However, independent freight data (e.g., from Flexport) indicates that commercial traffic is still extremely limited, with most carriers having suspended services, making the Iranian claims difficult to verify independently. (CBS News, Flexport)",
      verification: "partial",
      timestamp: "2026-05-29T15:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Global Oil Prices Fall Sharply on Ceasefire Talk Progress",
      description: "Reports of a potential extension of the US-Iran ceasefire and the reopening of the Strait of Hormuz significantly eased market fears of a supply disruption, leading to a sharp drop in WTI and Brent crude prices. WTI fell to the ~$87-88 range and Brent to the ~$91-92 range, both multi-week lows. (Reuters, The Business Times)",
      verification: "confirmed",
      timestamp: "2026-05-29T21:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-05",
      title: "Trump Publicly States Three 'Red Lines' for Iran Deal: No Nukes, Open Strait, Surrender Enriched Uranium",
      description: "U.S. President Trump stated via social media that any agreement with Iran must meet three core conditions: Iran must commit to never having a nuclear weapon, the Strait of Hormuz must be opened immediately and unconditionally, and its stockpile of highly enriched uranium must be turned over to the U.S. and IAEA for destruction. This sets a very high bar for a potential agreement. (CBS News, Kurdistan24)",
      verification: "confirmed",
      timestamp: "2026-05-29T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Watchful Drift",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Although a tentative agreement has been reached, the foundation of trust is weak, and the deal awaits final approval, risking a return to high-pressure standoff due to miscalculation or domestic politics.",
      "A diplomatic breakthrough has been achieved, with negotiators reportedly agreeing to a 60-day ceasefire extension, the first clear de-escalation path since the conflict began.",
      "The market is processing the positive negotiation signals, but the substantive military and shipping stalemate remains unresolved. The future trajectory is highly dependent on the final approval and implementation of the agreement."
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
        "Change: Military standoff and deterrence postures continue; while diplomatic signals have emerged, the risk of miscalculation has not been fully eliminated."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping through the strait remains stalled, with only unconfirmed Iranian claims of limited coordinated passages; the de facto blockade is …"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Expectations of a US-Iran ceasefire extension agreement have led to a sharp decline in oil prices, temporarily easing market concerns about supply shor…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States, as a primary party to the conflict, demonstrates a very high level of involvement through its military presence and direct diplomati…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US demand for Iran's complete nuclear dismantlement and full opening of the strait fundamentally conflicts with Iran's strategic goal of retaining nuclear capabilities and asserting regional security dominance.",
      "Both sides face pressure from hardliners domestically, where any concession could meet political resistance, making a final deal difficult to conclude and implement."
    ],
    military: [
      "The U.S. military aims to ensure freedom of international navigation, whereas Iran's IRGC seeks to use its control over the Strait of Hormuz as a strategic lever, creating an impasse over control of the waterway."
    ]
  },
  scoreTrend: [
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64,
      active: true
    }
  ],
  keyChange: "A tentative agreement between the US and Iran to extend the ceasefire by 60 days and begin nuclear talks has significantly improved prospects for de-escalation and caused a sharp drop in oil prices. However, the deal awaits final approval, and significant disagreements on core issues remain, creating high uncertainty.",
  investmentSignal: "→ Given the breakthrough in negotiations but remaining uncertainty over a final deal, a cautiously optimistic stance on risk assets is advised. Consider partially reducing long positions in energy and using options to hedge against the tail risk of the agreement collapsing.",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran military news May 2026",
    "Strait of Hormuz shipping status May 2026",
    "Iran nuclear talks update May 2026",
    "US sanctions Iran May 2026",
    "WTI crude price May 30 2026",
    "Brent crude price May 30 2026",
    "oil price trend May 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.80 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（↓4）：美伊据报达成延长停火60天并开启核谈判的临时协议，显著改善了冲突降级的前景，并导致油价大幅回落。但协议尚待最终批准，且双方在核心问题上分歧依旧，不确定性仍高。",
    bannerWarning: "→ 鉴于谈判取得突破但最终协议仍存变数，建议对风险资产采取谨慎乐观态度，可考虑部分减持能源多头头寸，并利用期权对冲协议破裂的尾部风险。",
    deescalationIntent: "美国要求伊朗彻底弃核并完全开放海峡，与伊朗寻求保留核能力并主导地区安全的战略目标存在根本冲突。",
    structuralRisk: "海峡商业航运持续停滞，仅有伊朗官方宣称的少量协调通行，未获独立证实，实际封锁状态未变。",
    contradictionNote: "美国要求伊朗彻底弃核并完全开放海峡，与伊朗寻求保留核能力并主导地区安全的战略目标存在根本冲突。；美军旨在确保国际航行自由，而伊朗伊斯兰革命卫队则试图将对霍尔木兹海峡的控制作为战略筹码，双方在海峡的控制权问题上互不相让。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第91天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.80 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (↓4): A tentative agreement between the US and Iran to extend the ceasefire by 60 days and begin nuclear talks has significantly improved prospec…",
    bannerWarning: "→ Given the breakthrough in negotiations but remaining uncertainty over a final deal, a cautiously optimistic stance on…",
    deescalationIntent: "The US demand for Iran's complete nuclear dismantlement and full opening of the…",
    structuralRisk: "Commercial shipping through the strait remains stalled, with only unconfirmed Iranian claims of lim…",
    contradictionNote: "The US demand for Iran's complete nuclear dismantlement and full opening of the strait fundamentally conflicts with Iran's strategic goal of retaining nuclear …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 91",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
