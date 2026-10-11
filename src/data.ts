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
  date: "2026-10-11",
  version: "v2.218",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D225",
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
      value: "WTI $90.01–$92.16 · Brent $102.39–$105.07",
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
      description: "胡塞武装突袭沙特机场引发战区外溢，美军推进三航母战备集结，多战线交火与打击态势延续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商船通行仍遭受常态化袭击威慑，主要班轮绕行，有效商业通行流量严重受限低于50%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油区间运行在$102.39–$105.07，处在$100–120危机带，海峡高危溢价牢固。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军调集三航母编队部署并强化区域防空与情报网络，大国军事介入维持深度部署与防御性威慑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "白宫提及期中选举前克制与沟通意向，伊朗审视海峡通行提案，但实质性让步与停火机制仍缺失。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡单周商船遇袭创战期峰值",
      description: "国际海事组织与UKMTO确认海峡及周边10月上旬单周发生12起袭击，伊朗军方公开警告将封堵未经报备通道。",
      verification: "confirmed",
      timestamp: "2026-10-10T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "也门胡塞武装导弹袭击利雅得机场",
      description: "胡塞武装对沙特首都机场发动打击导致人员受伤，美国总统特朗普公开表示正研判对也门目标发起直接进攻打击。",
      verification: "confirmed",
      timestamp: "2026-10-10T22:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美军增派第三航母打击群开赴中东",
      description: "五角大楼调度罗斯福号航母前往波斯湾外围，为美军2003年以来首次在中东部署三艘航母，以强化前沿封锁能力。",
      verification: "confirmed",
      timestamp: "2026-10-09T14:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "特朗普表态期中选举前暂不发起对伊本土新打击",
      description: "美方释放阶段性克制言论并提及存在接触渠道，伊朗方面表示评估海峡通行草案，但双方在解除封锁上仍存根本分歧。",
      verification: "confirmed",
      timestamp: "2026-10-09T19:40:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "国际油价维持高位，布伦特稳固在百美元危机带",
      description: "尽管外交对话预期压制日内涨幅，但霍尔木兹实际高危运费与供给中断担忧支撑布伦特油价持续运行于102–105美元区间。",
      verification: "confirmed",
      timestamp: "2026-10-11T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗以游击袭船战术维系霍尔木兹海峡封锁威慑，多国油轮被迫停航或高价护航。",
      "美军三航母集结强化区域防空与海上威慑，但受选情牵制短期避免大规模地面与全域空袭。",
      "外交谈判渠道虽保持技术性接触，但双方核心安全要价互不相让，局势呈高位黏滞平衡。"
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
        "变化：胡塞武装导弹突袭沙特利雅得民用机场，美军公开评估对也门目标展开协同攻势打击。",
        "延续：美伊主力未爆发新一轮直接空袭交火，前沿防空对抗与代理人骚扰保持高烈度。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗海军持续对违规穿行船舶实施无人机与导弹威胁，单周袭船频次创战期新高。",
        "延续：商业班轮与VLCC超级油轮大面积停滞或绕行，海峡实际通行能力维持严重受限。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油区间稳固在$102.39–$105.07，中东地缘断供风险主导百美元危机带溢价。",
        "变化：墨西哥湾受飓风扰动临时减产与海峡运输瓶颈共振，强化了下游成品油结构性紧缺。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：白宫表态期中选举前暂缓直接对伊攻击并提及沟通进展，展现短期战术降温意向。",
        "延续：德黑兰维持强硬威慑表态，强调唯有彻底解除美方封锁制裁方可恢复海峡全面开放。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方国内选举周期诉求控制通胀与能源成本，与维持中东战略威慑的诉求发生冲突。",
      "伊朗要求全面解除海上封锁与经济制裁，与美以彻底瓦解其区域同盟网络的战略目标不可调和。"
    ],
    military: [
      "美军前沿三航母重兵集结形成的防空反导威慑，与伊朗及胡塞不对称导弹、无人机饱和攻击之间的消耗战对抗。"
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊海峡对抗进入相持封锁阶段，美军集结三航母与胡塞外溢打击沙特机场推升战备烈度，布伦特油价黏滞于102–105美元危机带；综合风险分落盘 70（较昨日 持平（+0））",
  investmentSignal: "→ 维持能源与大宗商品的结构性对冲头寸，逢油价脉冲调整防御性资产配置，保持宏观风险资产敞口审慎。",
  change: "none",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-11",
  version: "v2.218",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D225",
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
      value: "WTI $90.01–$92.16 · Brent $102.39–$105.07",
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
      description: "Houthi missile strike on Riyadh airport broadens regional frontline; US carrier buildup sustains active multi-theater confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel transit remains severely restricted below 50% capacity under persistent Iranian strike threats and naval harassment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude trades within the $102.39–$105.07 crisis band ($100–120), sustained by elevated geopolitical risk premia and maritime constraints.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US reinforces forward presence with three carrier strike groups, maintaining deep military aid, intelligence integration, and escort posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "White House signals pre-midterm restraint and channels for dialogue while Iran reviews transit proposals, yet core terms remain opposed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Hormuz commercial vessel attacks hit weekly war-time high",
      description: "IMO and UKMTO report 12 maritime attacks in the first week of October, while IRGC Navy threatens strikes against unauthorized transit routes.",
      verification: "confirmed",
      timestamp: "2026-10-10T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Houthi missile strikes Riyadh airport terminal",
      description: "Ballistic missile hits King Khalid International Airport complex in Riyadh, prompting President Trump to consider direct offensive strikes in Yemen.",
      verification: "confirmed",
      timestamp: "2026-10-10T22:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "US deploys third aircraft carrier strike group to Middle East",
      description: "Pentagon dispatches USS Theodore Roosevelt strike group to reinforce maritime deterrence, marking first three-carrier presence since 2003.",
      verification: "confirmed",
      timestamp: "2026-10-09T14:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Trump signals no pre-midterm strikes on Iran mainland",
      description: "US administration indicates tactical restraint before November elections and notes diplomatic discussions, while Iran reviews Hormuz transit proposal.",
      verification: "confirmed",
      timestamp: "2026-10-09T19:40:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Crude benchmarks hold in crisis band amid transit risks",
      description: "Brent crude trades firmly in the $102–105 range as persistent tanker threats and freight premiums outweigh short-term diplomatic rhetoric.",
      verification: "confirmed",
      timestamp: "2026-10-11T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran employs asymmetric naval strikes to maintain transit leverage over the Strait of Hormuz.",
      "US consolidates a three-carrier forward force for regional air defense and deterrence while deferring large-scale mainland invasion.",
      "Diplomatic channels conduct tentative reviews, but mutually exclusive core demands maintain a high-level standoff."
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
        "Change: Houthi ballistic missile strike on Riyadh airport triggers active US deliberation over offensive retaliation in Yemen.",
        "Continue: Direct US-Iran mainland heavy strikes remain paused while multi-front proxy engagements continue."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: IRGC Navy enforces strict transit restrictions with elevated drone and projectile strikes on non-compliant vessels.",
        "Continue: Commercial tanker traffic remains severely restricted below 50% of peacetime baselines."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude sustains trading inside the $102.39–$105.07 crisis band with solid geopolitical premia.",
        "Change: Gulf of Mexico weather shut-ins compound refined product tightness alongside persistent Middle East transport risks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump publicly rules out new strikes on Iran prior to midterms, emphasizing ongoing diplomatic conversations.",
        "Continue: Tehran affirms that regular strait transits will only resume upon a full lifting of US maritime blockade measures."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US pre-election imperative to curb fuel inflation collides with the strategic necessity to project deterrence.",
      "Tehran's demand for complete sanctions and blockade relief directly contradicts US-allied regional security objectives."
    ],
    military: [
      "US forward carrier and air defense posture versus sustained asymmetric drone and ballistic attrition across regional nodes."
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70,
      active: true
    }
  ],
  keyChange: "Maritime blockade confrontation remains entrenched as US three-carrier presence offsets Houthi strikes on Riyadh airport, keeping Brent crude inside the $102–105 crisis range.",
  investmentSignal: "→ Maintain structural hedges in energy and commodities while keeping a defensive posture across risk assets.",
  change: "none",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.218 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊海峡对抗进入相持封锁阶段，美军集结三航母与胡塞外溢打击沙特机场推升战备烈度，布伦特油价黏滞于102–105美元危机带；综合风险分落盘 70（较昨日 持平（+0））",
    bannerWarning: "→ 维持能源与大宗商品的结构性对冲头寸，逢油价脉冲调整防御性资产配置，保持宏观风险资产敞口审慎。",
    deescalationIntent: "美方国内选举周期诉求控制通胀与能源成本，与维持中东战略威慑的诉求发生冲突。",
    structuralRisk: "商船通行仍遭受常态化袭击威慑，主要班轮绕行，有效商业通行流量严重受限低于50%。",
    contradictionNote: "美方国内选举周期诉求控制通胀与能源成本，与维持中东战略威慑的诉求发生冲突。；美军前沿三航母重兵集结形成的防空反导威慑，与伊朗及胡塞不对称导弹、无人机饱和攻击之间的消耗战对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第225天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.218 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Maritime blockade confrontation remains entrenched as US three-carrier presence offsets Houthi strikes on Riyadh airport, keeping Brent cru…",
    bannerWarning: "→ Maintain structural hedges in energy and commodities while keeping a defensive posture across risk assets.",
    deescalationIntent: "US pre-election imperative to curb fuel inflation collides with the strategic n…",
    structuralRisk: "Commercial vessel transit remains severely restricted below 50% capacity under persistent Iranian s…",
    contradictionNote: "US pre-election imperative to curb fuel inflation collides with the strategic necessity to project deterrence.; US forward carrier and air defense posture vers…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 225",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
