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
  date: "2026-09-16",
  version: "v2.190",
  riskScore: 82,
  prevRiskScore: 82,
  investmentSignal: "→ 维持对冲姿态，增持能源与大宗商品以防御地缘溢价常态化，对风险资产保持中性偏谨慎仓位。",
  keyChange: "冲突步入第200天，美伊红海-波斯湾对峙、霍尔木兹海峡受阻与油价危机带（$100-120）窄幅震荡均呈现高位常态化特征，多空力量处于结构性胶着期。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D200",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
      unit: "参考",
      color: "orange",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "冲突进入第200天，美伊红海-波斯湾双线高压僵持",
    subTitle: "航道受阻与高油价常态化，外交谈判面临系统性瘫痪",
    points: [
      "军事对抗延续多点散发与高频袭扰特征，红海及霍尔木兹海峡防空拦截呈常态化。",
      "航运网络重组深度化，绕行好望角导致全球供应链及物流成本刚性上升。",
      "能源市场对地缘溢价已部分脱敏，但在实质性停火信号出现前，油价下行空间受限。"
    ],
    note: "美伊双边缺乏沟通机制，区域冲突正在向中长期低烈度消耗战演变。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊直接军事对抗及代理人袭扰持续，多线攻防与防空拦截高度活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业通行量维持历史低位，主要航运商保持绕行决策，保费维持高点。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价整体在$100–$120区间运行，WTI与Brent主力保持高位震荡。",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美英等外部大国提供防御护航与情报，未见直接大国正面军事冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双方官方立场极为强硬，外交接触停滞，直接与间接谈判渠道均告破裂。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e1",
      title: "美伊红海及海峡周边军事对峙持续",
      description: "美国国防部确认增派驱逐舰在关键航道执行护航防御，美伊两军在周边海域保持高度戒备状态。",
      verification: "confirmed",
      timestamp: "2026-09-16T04:00:00Z",
      significance: "维持双线对峙强度，增加非故意摩擦风险",
      highlight: true
    },
    {
      id: "e2",
      title: "霍尔木兹海峡商船保费维持历史高位",
      description: "主要航运保费未见下调，多数国际大型集装箱班轮继续采取绕行好望角方案，海峡流量降幅超50%。",
      verification: "confirmed",
      timestamp: "2026-09-16T06:30:00Z",
      significance: "全球供应链成本面临刚性支撑"
    },
    {
      id: "e3",
      title: "国际油价于$100-120危机带高位窄幅震荡",
      description: "受红海及海峡局势不确定性影响，原油地缘溢价依旧高企，WTI与布伦特分别报于104美元及108美元上方。",
      verification: "confirmed",
      timestamp: "2026-09-16T09:10:00Z",
      significance: "原油供应链风险维持在高警惕状态",
      highlight: true,
      critical: true
    }
  ],
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "常态对峙",
      tagColor: "red",
      points: [
        "延续：美军及其盟友在红海与海峡外围维持高频防空拦截部署，防范针对商船的无人机与导弹袭扰。",
        "延续：伊朗及代理人网络继续对周边美军基地实施零星火箭弹和无人机试探，未造成大规模人员伤亡。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "深度受阻",
      tagColor: "red",
      points: [
        "延续：霍尔木兹海峡商业通行量保持在历史低位，主要航运公司继续采取绕行好望角或高额保费通行策略。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高位溢价",
      tagColor: "orange",
      points: [
        "延续：油价高位运行于$100–$120区间，WTI报$104.51，布伦特报$108.01，地缘政治溢价难以在短期内消退。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "立场强硬",
      tagColor: "red",
      points: [
        "延续：美方重申将采取一切必要手段确保航行自由与盟友安全，外交施压与军事威慑并举。",
        "延续：伊朗外交部强调其合法自卫权利，并重申只有在美方停止敌对行动的前提下才可能重返对话。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方坚持要求航行自由与伊朗停止支持代理人，而伊方将美军撤离及解除制裁作为任何谈判的先决条件。"
    ],
    military: [
      "美军的防御性护航与伊方的非对称袭扰战术形成系统性对峙，缺乏有效的热线避免擦枪走火。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-16",
  version: "v2.190",
  riskScore: 82,
  prevRiskScore: 82,
  investmentSignal: "→ Maintain hedging stance, overweight energy and commodities to defend against persistent geopolitical premiums, while keeping a neutral-to-cautious stance on risky assets.",
  keyChange: "As the conflict hits Day 200, the US-Iran military standoff in the Red Sea and Persian Gulf, shipping restrictions in Hormuz, and oil prices fluctuating within the crisis zone ($100-120) have entered a phase of high-level normalisation.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D200",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
      unit: "Ref.",
      color: "orange",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "red"
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "Conflict Hits Day 200, US-Iran Standoff Persists Across Red Sea and Persian Gulf",
    subTitle: "Chokepoint disruptions and elevated oil prices become normal, while diplomatic channels remain frozen",
    points: [
      "Military confrontations continue with low-intensity, high-frequency asymmetric strikes and routine interception operations.",
      "Shipping supply chains adapt to long-term disruptions, as detours around Cape of Good Hope keep logistics costs rigid.",
      "Energy markets exhibit high sensitivity to geopolitical risk, restricting downside potential for oil prices."
    ],
    note: "Without a hot-line or mediation mechanism, the conflict is shifting towards an asymmetric war of attrition."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct US-Iran confrontations and proxy attacks continue with high-frequency interceptions and deployments.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel transits remain at historical lows, with major liners sticking to Cape of Good Hope detours.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices consolidate within the $100–$120 crisis zone, as supply risks maintain a high floor.",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Western powers provide defensive escorts and intelligence, without direct, symmetrical clashes among major militaries.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Official positions are highly rigid, with both direct and indirect negotiation channels remaining frozen.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e1",
      title: "US-Iran military standoff persists across regional waterways",
      description: "The US DoD confirms deployment of additional destroyers to secure key shipping lanes as forces on both sides remain highly alert.",
      verification: "confirmed",
      timestamp: "2026-09-16T04:00:00Z",
      significance: "Maintains double-theater tension, heightening miscalculation risks.",
      highlight: true
    },
    {
      id: "e2",
      title: "Hormuz commercial transit premiums remain at record highs",
      description: "War risk insurance premiums show no signs of easing, with major container liners continuing to divert around Cape of Good Hope.",
      verification: "confirmed",
      timestamp: "2026-09-16T06:30:00Z",
      significance: "Provides rigid structural support to global maritime shipping costs."
    },
    {
      id: "e3",
      title: "Crude prices oscillate within the $100-120 crisis zone",
      description: "As geopolitical uncertainties loom over the Red Sea and Hormuz, WTI and Brent crude consolidate above $104 and $108 respectively.",
      verification: "confirmed",
      timestamp: "2026-09-16T09:10:00Z",
      significance: "Geopolitical risk premium remains firmly embedded in prompt contracts.",
      highlight: true,
      critical: true
    }
  ],
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Standoff",
      tagColor: "red",
      points: [
        "Continue: US and allied forces maintain high-frequency interception operations in the Red Sea to secure shipping lanes.",
        "Continue: Iran-backed proxies continue low-intensity rocket and UAV harassment of regional US facilities with zero mass casualties."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Disrupted",
      tagColor: "red",
      points: [
        "Continue: Hormuz commercial transits remain highly restricted, with major liners adhering to long-term detour routes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Premium",
      tagColor: "orange",
      points: [
        "Continue: Crude consolidates within the $100-120 range, with WTI at $104.51 and Brent at $108.01, supported by supply fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Rigid",
      tagColor: "red",
      points: [
        "Continue: US vows to protect navigation and allies, utilizing military deterrence alongside diplomatic pressure.",
        "Continue: Iran reiterates its right to self-defense, noting talks are off the table until US hostile acts cease."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US demands freedom of navigation and proxy cessation, while Iran demands US withdrawal and sanctions relief as preconditions."
    ],
    military: [
      "US defensive escorts clash conceptually with Iranian asymmetric harassment tactics, lacking hotlines to prevent escalatory accidents."
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.190 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：冲突步入第200天，美伊红海-波斯湾对峙、霍尔木兹海峡受阻与油价危机带（$100-120）窄幅震荡均呈现高位常态化特征，多空力量处于结构性胶着期。",
    bannerWarning: "→ 维持对冲姿态，增持能源与大宗商品以防御地缘溢价常态化，对风险资产保持中性偏谨慎仓位。",
    deescalationIntent: "美方坚持要求航行自由与伊朗停止支持代理人，而伊方将美军撤离及解除制裁作为任何谈判的先决条件。",
    structuralRisk: "商业通行量维持历史低位，主要航运商保持绕行决策，保费维持高点。",
    contradictionNote: "美方坚持要求航行自由与伊朗停止支持代理人，而伊方将美军撤离及解除制裁作为任何谈判的先决条件。；美军的防御性护航与伊方的非对称袭扰战术形成系统性对峙，缺乏有效的热线避免擦枪走火。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第200天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.190 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): As the conflict hits Day 200, the US-Iran military standoff in the Red Sea and Persian Gulf, shipping restrictions in Hormuz, and oil price…",
    bannerWarning: "→ Maintain hedging stance, overweight energy and commodities to defend against persistent geopolitical premiums, while …",
    deescalationIntent: "The US demands freedom of navigation and proxy cessation, while Iran demands US…",
    structuralRisk: "Commercial vessel transits remain at historical lows, with major liners sticking to Cape of Good Ho…",
    contradictionNote: "The US demands freedom of navigation and proxy cessation, while Iran demands US withdrawal and sanctions relief as preconditions.; US defensive escorts clash c…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 200",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
