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
  date: "2026-11-17",
  version: "v2.256",
  riskScore: 70,
  riskScoreChange: 0,
  keyChange: "美军第三航母打击群完成中东集结，美伊在巴林基地与格什姆岛发生战术互攻，霍尔木兹海峡受限状态黏滞；综合风险分落盘 70（较昨日 持平（+0））",
  keyStats: [
    {
      label: "冲突天数",
      value: "D262",
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
      value: "WTI $84.68–$87.38 · Brent $91.25–$94.08",
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
      description: "美军对格什姆岛实施精确空袭，伊朗无人机打击巴林美军雷达设施，双方保持直接交火状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业通航持续受限低于50%，水雷威胁与油轮被袭风险未除，护航行动仍未能消除商业航运避险溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价整体处于85至94美元区间显著偏强运行，供需盈余预期与红海/海峡地缘运输摩擦形成多空拉锯。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军完成三艘航母群实战部署，深度参与前沿巡航与联合拦截，但尚未启动大规模对伊本土纵深地面干预。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "多方间接接触保持渠道通畅，但停火先决条件差距过大，谈判面临较高停滞风险。",
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
      "美军三航母打击群压制海峡制空与制海权，伊朗依托无人机与潜艇袭扰进行反制",
      "外围替代管线与中转港口遭遇非对称袭扰，区域能源供应链脆弱性维持高位",
      "双方处于高威慑下的受控交火阶段，外交接触缺乏促成停火协议的实质抓手"
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
        "变化：美军罗斯福号航母打击群完成进入波斯湾责任区部署，三航母编队形成战略压制态势。",
        "变化：美军空袭格什姆岛防空及雷达设施以报复伊朗日前对巴林美军外围设施的无人机偷袭。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行量维持低于冲突前水平50%以上，主要集装箱与油轮班轮仍依赖海军编队伴随护航。",
        "延续：海峡内零星水雷引爆警报频发，高额战险保费阻碍商业自由复航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：胡塞武装无人机袭击沙特东西管线增压泵站，促使替代输油路径风险溢价回升。",
        "延续：WTI与Brent主力合约在85至94美元带维持宽幅拉锯，IEA供应预测压制单边极端暴涨空间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫公开重申拒绝卷入无止境的中东持久战，但强调保留精准打击一切反美设施的选项。",
        "变化：德黑兰通过阿曼渠道向美方递交关于解除海上封锁的停火磋商草案，美方暂未正式回应。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军第三艘航母罗斯福号部署到位",
      description: "美军中央司令部确认罗斯福号航母抵达中东战区，协同另外两艘航母编队巩固海上封锁与通道防御能力。",
      verification: "confirmed",
      timestamp: "2026-11-17T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美伊在海湾发生多点战术交火互击",
      description: "伊朗对巴林驻扎的美军雷达发射无人机，美军随即对伊朗格什姆岛关键军事目标实施外科手术式反击。",
      verification: "confirmed",
      timestamp: "2026-11-17T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "也门胡塞武装宣称袭击沙特东西管道泵站",
      description: "胡塞武装使用无人机袭扰沙特东西输油干线第8与第9泵站，沙特防空部队实施有效拦截并未造成大规模火灾。",
      verification: "confirmed",
      timestamp: "2026-11-17T14:40:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油市场消化过剩报告与海峡摩擦溢价",
      description: "国际能源署报告上调四季度全球供应过剩预期，布伦特原油在91至94美元区间宽幅企稳整理。",
      verification: "confirmed",
      timestamp: "2026-11-17T17:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "白宫面临中期选后国内反战民意与中东强硬派盟友要求根除威胁的战略拉扯",
      "伊朗要求解除全面封锁与美方坚持将核设施销毁作为前置谈判条件的根本分歧"
    ],
    military: [
      "美军三航母战斗群常规火力优势与伊朗非对称无人机/水雷消耗战术的持久对抗",
      "霍尔木兹关键航道护航安全需求与也门沙特陆地替代管道频繁受袭的安全脆弱性"
    ]
  },
  scoreTrend: [
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源大宗防御性头寸并对冲全球风险资产的波动性回撤。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-17",
  version: "v2.256",
  riskScore: 70,
  riskScoreChange: 0,
  keyChange: "US Theodore Roosevelt Carrier Strike Group completed deployment in the Persian Gulf theater while US-Iran tactical strike exchanges occurred in Bahrain and Qeshm Island; Hormuz disruption remains entrenched.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D262",
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
      value: "WTI $84.68–$87.38 · Brent $91.25–$94.08",
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
      description: "Direct tactical cross-strikes continue as US forces hit Iranian assets on Qeshm Island following Iranian drone attacks on radar stations in Bahrain.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel traffic remains suppressed over 50% under persistent mine and drone risks, keeping war-risk insurance premiums elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices trade firmly in the $85–$94 corridor as market balances supply surplus projections against physical Gulf transport bottlenecks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US naval deterrence reaches a high plateau with three aircraft carriers active in the theater, though broader ground war actions remain ruled out.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Backchannel diplomatic contacts mediated by Oman and Qatar persist, but incompatible bottom-line demands leave peace talks stalled.",
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
      "US three-carrier posture enforces sea control while Iran counters through asymmetric standoff capabilities",
      "Bypass export logistics face localized attacks, preserving systemic energy supply sensitivity",
      "Both parties conduct calibrated mutual strikes under heavy deterrence without comprehensive off-ramp mechanisms"
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
        "Change: USS Theodore Roosevelt Carrier Strike Group officially entered the AOR, cementing a 3-carrier concentration.",
        "Change: US military conducted retaliatory air precision strikes on Qeshm Island targets after Iranian drone attacks on Bahrain base."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait transit flow stays below 50% of peacetime baselines under strict convoy escorts.",
        "Continue: Mine incidents and drone threats along international routes sustain prohibitive war-risk insurance premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Houthi claims of drone strikes against Saudi East-West pipeline pump stations elevate alternative route risk premia.",
        "Continue: WTI and Brent crude futures consolidate in the $85–$94 zone as IEA surplus projections check geopolitical upside."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House leadership reiterates opposition to protracted engagements while retaining kinetic response options.",
        "Change: Tehran transmitted an updated ceasefire roadmap through Omani channels, awaiting formal US review."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Third US Aircraft Carrier Arrives in Middle East",
      description: "US Central Command confirms USS Theodore Roosevelt has joined the naval armada to bolster maritime blockade and defensive patrols.",
      verification: "confirmed",
      timestamp: "2026-11-17T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US and Iran Exchange Targeted Tactical Strikes",
      description: "Iranian drone strikes on a Bahrain radar installation were followed by US precision strikes against military sites on Qeshm Island.",
      verification: "confirmed",
      timestamp: "2026-11-17T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Houthis Claim Drone Attacks on Saudi Pipeline",
      description: "Yemeni Houthis targeted pumping stations 8 and 9 on the Saudi East-West pipeline; air defenses intercepted drones with minimal disruption.",
      verification: "confirmed",
      timestamp: "2026-11-17T14:40:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Oil Benchmarks Steady Amid Conflicting Fundamentals",
      description: "Crude benchmarks traded near $86 and $93 respectively as IEA expectations of a Q4 global surplus were balanced by regional supply hazards.",
      verification: "confirmed",
      timestamp: "2026-11-17T17:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "White House faces post-midterm anti-war sentiment balancing regional deterrence imperatives",
      "Iran demands total blockade cessation while the US insists on upfront nuclear dismantling"
    ],
    military: [
      "US carrier-based air power superiority versus Iranian asymmetric attrition tactics",
      "Maritime transit protection needs versus vulnerabilities in overland bypass pipelines"
    ]
  },
  scoreTrend: [
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70,
      active: true
    }
  ],
  investmentSignal: "→ Maintain defensive allocations in energy commodities and hedge broader cyclical risk asset volatility.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.256 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美军第三航母打击群完成中东集结，美伊在巴林基地与格什姆岛发生战术互攻，霍尔木兹海峡受限状态黏滞；综合风险分落盘 70（较昨日 持平（+0））",
    bannerWarning: "→ 维持能源大宗防御性头寸并对冲全球风险资产的波动性回撤。",
    deescalationIntent: "白宫面临中期选后国内反战民意与中东强硬派盟友要求根除威胁的战略拉扯",
    structuralRisk: "商业通航持续受限低于50%，水雷威胁与油轮被袭风险未除，护航行动仍未能消除商业航运避险溢价。",
    contradictionNote: "白宫面临中期选后国内反战民意与中东强硬派盟友要求根除威胁的战略拉扯；美军三航母战斗群常规火力优势与伊朗非对称无人机/水雷消耗战术的持久对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第262天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.256 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US Theodore Roosevelt Carrier Strike Group completed deployment in the Persian Gulf theater while US-Iran tactical strike exchanges occurre…",
    bannerWarning: "→ Maintain defensive allocations in energy commodities and hedge broader cyclical risk asset volatility.",
    deescalationIntent: "White House faces post-midterm anti-war sentiment balancing regional deterrence…",
    structuralRisk: "Commercial vessel traffic remains suppressed over 50% under persistent mine and drone risks, keepin…",
    contradictionNote: "White House faces post-midterm anti-war sentiment balancing regional deterrence imperatives; US carrier-based air power superiority versus Iranian asymmetric a…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 262",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
