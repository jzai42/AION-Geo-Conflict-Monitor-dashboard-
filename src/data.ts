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
  date: "2026-10-14",
  version: "v2.221",
  riskScore: 72,
  keyChange: "美军中央司令部出面驳斥伊朗海峡全面封锁主张并强力护航原油通航，胡塞武装突袭沙特能源设施招致联军空袭，海峡与红海两线对抗仍将油价与风险指标锁定在高位相持阶段。",
  investmentSignal: "→ 维持能源与大宗商品风险溢价对冲头寸，逢高配置高股息防御性资产并减持无风险敞口的非核心风险资产。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D228",
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
      value: "WTI $93.97–$95.99 · Brent $105.23–$107.13",
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
      description: "美军中央司令部与沙特军方通报证实沙特联军与也门胡塞武装爆发新一轮跨境空袭与弹道导弹拦截，红海与波斯湾周边军事交火烈度居高不下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡航运仍需多国海军实质护航维系，商业油轮对船过驳作业频遭伊朗革命卫队反舰监控与逼近威慑，商业自主通航流量压制在正常50%以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油主力运行于105至107美元危机带，现货地缘溢价坚挺；尽管美原油位于94至96美元，全球供应链整体承受第4档能源危机冲击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接参与战略海峡原油船队护航与防空雷达压制，提供前沿情报与威慑后盾，大国介入形态保持在纵深军援与护航战术行动档位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美伊通过第三方沟通的海运通航机制谈判处于胶着对峙，缺乏重大突破但未彻底关闭联络渠道，停火前景依然脆弱。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军中央司令部驳斥伊朗海峡封锁论调并主导1900万桶原油护航",
      description: "美军中央司令部（CENTCOM）发表官方声明，驳斥伊朗革命卫队声称全面控制霍尔木兹海峡的言论，证实美军及区域盟军已主导护航超1900万桶原油穿行海峡航道。",
      verification: "confirmed",
      timestamp: "2026-10-14T03:13:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "也门胡塞武装弹道导弹突袭沙特阿美设施引发联军报复性空袭",
      description: "也门胡塞武装向沙特达兰的阿美石油公司园区及利雅得发动弹道导弹袭击，沙特防空部队完成部分拦截，沙特联军随后对也门萨那发动数轮空袭反击。",
      verification: "confirmed",
      timestamp: "2026-10-13T22:25:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗革命卫队加大对海峡及阿曼湾船对船过驳油轮威慑排查",
      description: "英国海事贸易行动办公室（UKMTO）与战争研究所（ISW）通报，伊朗海军与革命卫队加强对霍尔木兹海峡外围进行船对船过驳（STS）原油转移船只的电子侦察与导弹威慑演习。",
      verification: "confirmed",
      timestamp: "2026-10-14T01:45:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际基准油价震荡于百元危机带，远月风险溢价居高不下",
      description: "彭博社与雅虎财经数据显示，布伦特原油在105至107美元维持高位，WTI原油在94至96美元震荡，航运护航与基础设施安全风险主导大宗商品溢价逻辑。",
      verification: "confirmed",
      timestamp: "2026-10-14T14:12:33Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军中央司令部以直接海空护航维系霍尔木兹海峡最低限度通航能力，对冲伊朗完全闭合航道的战术意图。",
      "胡塞武装跨境导弹攻击与沙特联军反击表明代理人战线仍具扰动主要产油国陆上基础设施的能力。",
      "多边外交调停缺乏让步支点，双方军事部署均在为更长周期的消耗战和通道对峙做准备。"
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
        "变化：也门胡塞武装对沙特东部阿美公司办公园区发射弹道导弹，沙特联军对也门萨那实施报复性空袭。",
        "延续：美军中央司令部保持在波斯湾与阿曼湾海域的海空巡航及快速反应拦截姿态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军协助单日1900万桶原油护航过境，伊朗革命卫队将拦截威慑重心转向外围船对船过驳作业。",
        "延续：商业船东对自主通航海峡缺乏信心，高额战争险费率与护航排队成本继续压制通行总规模。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油企稳于105美元上方，盘中触及107.13美元，巩固了百元危机带的风险溢价。",
        "延续：中东产油国增产与战略储备释放努力仅部分对冲了海运受阻引发的全球供应链恐慌。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方坚决重申对海峡航行自由的军事控制权，伊朗军方表态在诉求满足前不会停止反制行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求确保霍尔木兹无条件自由通航与终止对盟友袭击，与伊朗利用海峡地缘杠杆打破战略包围存在根本冲突。"
    ],
    military: [
      "美军常规海空武装护航的重资产高消耗成本，与伊朗及其代理人低成本弹道导弹、无人机非对称袭扰之间的消耗矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72,
      active: true
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-14",
  version: "v2.221",
  riskScore: 72,
  keyChange: "US CENTCOM publicly rejected IRGC claims of full Hormuz closure and facilitated the transit of 19M barrels of crude, while renewed Houthi strikes on Saudi energy sites and coalition airstrikes locked risk metrics at elevated levels.",
  investmentSignal: "→ Maintain risk-premium hedges on energy and commodities, allocate to defensive high-dividend assets on rallies, and reduce exposure to unhedged risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D228",
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
      value: "WTI $93.97–$95.99 · Brent $105.23–$107.13",
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
      description: "US CENTCOM and Saudi defense authorities confirmed an intensification of cross-border strikes involving Houthi ballistic missiles and retaliatory coalition airstrikes across Sanaa.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Passage through the Strait of Hormuz remains heavily reliant on military naval escorts, while Iranian forces actively target and harass commercial ship-to-ship transfer vessels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude continues trading within the $105–$107 crisis band with resilient spot risk premiums; WTI trades near $94–$96, sustaining Level 4 crisis conditions on the conservative upper bound.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US military directly engages in convoy escort and air defense coordination, sustaining a profound forward military posture without launching a full-scale ground war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Indirect diplomatic talks mediated by third parties remain deadlocked as both sides retain rigid baseline security demands, though dialogue channels have not been completely severed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US CENTCOM Counters Iran Closure Claim, Facilitates 19M Barrels Oil Transit",
      description: "US Central Command issued an official release rejecting IRGC assertions of total Hormuz dominance, verifying that US-led naval escorts facilitated the movement of over 19 million barrels of crude.",
      verification: "confirmed",
      timestamp: "2026-10-14T03:13:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Houthi Missile Attack Targets Aramco Complex, Triggering Coalition Air Raids",
      description: "Yemen's Houthi forces launched ballistic missiles and drones at Aramco offices in Dhahran and Riyadh, prompting Saudi-led coalition fighter jets to carry out retaliatory airstrikes on Sanaa.",
      verification: "confirmed",
      timestamp: "2026-10-13T22:25:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "IRGC Escalates Pressure on Ship-to-Ship Oil Transfers Around Hormuz",
      description: "UKMTO and the Institute for the Study of War reported that Iranian forces are targeting commercial tankers conducting offshore ship-to-ship crude transfers designed to bypass choke points.",
      verification: "confirmed",
      timestamp: "2026-10-14T01:45:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Global Benchmark Crude Anchors in $100+ Crisis Band Amid Escalation",
      description: "Bloomberg and Yahoo Finance price tracking showed Brent crude holding above $105/bbl while WTI hovered near $95/bbl, as heightened escort costs and facility risks cement market risk premiums.",
      verification: "confirmed",
      timestamp: "2026-10-14T14:12:33Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US CENTCOM escorts maintain minimal baseline crude flows through Hormuz, countering Iran's strategy of total maritime closure.",
      "Houthi cross-border missile strikes and coalition airstrikes underscore active proxy capabilities against regional energy infrastructure.",
      "Diplomatic de-escalation lacks a viable compromise anchor, pointing to an extended war of attrition across commercial sea lanes."
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
        "Change: Houthi forces launched ballistic missiles at Aramco Dhahran offices, drawing retaliatory coalition airstrikes on Sanaa.",
        "Continue: US CENTCOM maintains persistent air and naval patrols across the Persian Gulf and Gulf of Oman."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US escorts facilitated 19M barrels of crude transit as Iran shifted harassment toward ship-to-ship transfer tankers.",
        "Continue: Prohibitive war-risk insurance rates and convoy delays keep independent commercial transit severely restricted."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude stabilized firmly above $105/bbl, reaching a session peak of $107.13/bbl.",
        "Continue: Output increases and emergency reserve releases only partially offset persistent geopolitical supply anxiety."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington reiterates military defense of navigation rights, while Tehran vows to maintain asymmetric pressure until concessions are made."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US objective of maintaining uninhibited freedom of navigation clashes fundamentally with Iran's use of Hormuz leverage to break diplomatic containment."
    ],
    military: [
      "The high operational cost of sustained US naval convoy escort versus low-cost asymmetric drone and anti-ship missile harassment deployed by regional adversaries."
    ]
  },
  scoreTrend: [
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72,
      active: true
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.221 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：美军中央司令部出面驳斥伊朗海峡全面封锁主张并强力护航原油通航，胡塞武装突袭沙特能源设施招致联军空袭，海峡与红海两线对抗仍将油价与风险指标锁定在高位相持阶段。",
    bannerWarning: "→ 维持能源与大宗商品风险溢价对冲头寸，逢高配置高股息防御性资产并减持无风险敞口的非核心风险资产。",
    deescalationIntent: "美方要求确保霍尔木兹无条件自由通航与终止对盟友袭击，与伊朗利用海峡地缘杠杆打破战略包围存在根本冲突。",
    structuralRisk: "海峡航运仍需多国海军实质护航维系，商业油轮对船过驳作业频遭伊朗革命卫队反舰监控与逼近威慑，商业自主通航流量压制在正常50%以下。",
    contradictionNote: "美方要求确保霍尔木兹无条件自由通航与终止对盟友袭击，与伊朗利用海峡地缘杠杆打破战略包围存在根本冲突。；美军常规海空武装护航的重资产高消耗成本，与伊朗及其代理人低成本弹道导弹、无人机非对称袭扰之间的消耗矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第228天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.221 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): US CENTCOM publicly rejected IRGC claims of full Hormuz closure and facilitated the transit of 19M barrels of crude, while renewed Houthi s…",
    bannerWarning: "→ Maintain risk-premium hedges on energy and commodities, allocate to defensive high-dividend assets on rallies, and re…",
    deescalationIntent: "The US objective of maintaining uninhibited freedom of navigation clashes funda…",
    structuralRisk: "Passage through the Strait of Hormuz remains heavily reliant on military naval escorts, while Irani…",
    contradictionNote: "The US objective of maintaining uninhibited freedom of navigation clashes fundamentally with Iran's use of Hormuz leverage to break diplomatic containment.; Th…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 228",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
