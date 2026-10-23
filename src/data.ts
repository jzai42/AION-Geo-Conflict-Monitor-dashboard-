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
  date: "2026-10-23",
  version: "v2.231",
  riskScore: 82,
  keyStats: [
    {
      label: "冲突天数",
      value: "D237",
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
      value: "WTI $98.84–$102.66 · Brent $108.28–$111.51",
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
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军向中东战区紧急部署第三艘航母战斗群强化护航网络。",
      "伊朗伊斯兰革命卫队威胁将直接攻击中东美军基地以报复护航行动。",
      "商业油轮通行量持续受限，运费与战争险溢价处于极端区间。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  keyChange: "油价核心区间实质触及100–120美元危机带，美军调派第三艘航母进驻波斯湾前沿，伊朗对美军护航发出正面打击威胁。",
  investmentSignal: "→ 维持能源与大宗商品多头对冲部位，减持易受供给冲击的周期风险资产。",
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在中东集结三支航母打击群，伊朗革命卫队誓言反击美军护航行动，双方直接军事对抗风险维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡通航秩序遭到破坏，袭船事件单月达27起创开战新高，商业船运事实上高度依赖武力护航或深夜关闭AIS冒死通行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "原油基准价格区间上沿进入100–120美元危机带，布伦特稳居111美元上方，供应中断忧虑促发恐慌性买盘。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军大举调遣重型海空兵力执行战区护航与联合作战警戒，实质主导战局外围威慑，尚未与他国大国爆发面对面对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双方将解除制裁与停止航道封锁互设为谈判先决条件，互信完全缺失，短期停火框架缺乏落实基础。",
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
        "变化：美军正式向中东派遣第三个航母战斗群以加强海上护航与防空屏障。",
        "延续：无人机与巡航导弹对海峡及周边海域商船的交火压制保持高频态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：10月确认受袭商船达27起，创冲突爆发以来的最高单月袭击纪录。",
        "延续：商船多采取关停定位与编队伴随方案，主流承运商依旧暂停定期班轮。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特突破111美元/桶关口，WTI日内攀升至102美元上方，双双进入危机带。",
        "延续：中东地缘原油风险溢价居高不下，炼厂采购转趋防御性囤货。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗伊斯兰革命卫队公开划定红线，警告美军护航将直接引致对美军事基地打击。",
        "延续：美方高层表态不接受海峡航行遭任何形式封锁，继续强化军事遏阻行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国坚持霍尔木兹航行自由与单边制裁施压，与伊朗要求彻底解除经济封锁互不相让。"
    ],
    military: [
      "美军多航母护航体系与伊朗反舰拒止及区域基地打击战术形成对称升级死结。"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "伊朗警告若美军继续护航将袭击中东美军基地",
      description: "伊朗革命卫队高级官员公开发表声明，警告若美军不撤出在霍尔木兹海峡的护航舰只，冲突必将扩展至美军在该地区的陆海空军事基地。",
      verification: "confirmed",
      timestamp: "2026-10-23T06:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军增派第三艘航母打击群前往中东战区",
      description: "五角大楼下令第三个航母打击群前往中东地区，部署数千名作战人员与先进战机，以建立霍尔木兹海峡海空安全防线。",
      verification: "confirmed",
      timestamp: "2026-10-22T20:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "10月霍尔木兹袭船事件达27起创历史纪录",
      description: "国际海事组织及权威防务智库统计显示，10月份商船在霍尔木兹周边受袭数量已增至27起，凸显伊朗拒止与攻击能力的实质延续。",
      verification: "confirmed",
      timestamp: "2026-10-22T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准价格进入100–120美元危机带震荡",
      description: "布伦特原油主力合约站稳111美元，WTI上沿触及102.66美元，能源市场计入全面护航破裂与长期断航的极端溢价。",
      verification: "confirmed",
      timestamp: "2026-10-23T13:57:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-23",
  version: "v2.231",
  riskScore: 82,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D237",
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
      value: "WTI $98.84–$102.66 · Brent $108.28–$111.51",
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
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US military deploys a third carrier strike group to bolster maritime escort operations.",
      "Iran's IRGC threatens direct strikes against US regional military bases if escorts persist.",
      "Commercial tanker flows remain severely suppressed with shipping risk premia at peak levels."
    ],
    note: "For monitoring only; not investment advice."
  },
  keyChange: "Crude benchmarks entered the $100–120 crisis band, the US dispatched a third aircraft carrier group, and Iran issued explicit threats targeting regional US bases.",
  investmentSignal: "→ Maintain energy and commodity hedge positions while trimming exposure to cyclical risk assets.",
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US carrier concentration and IRGC retaliatory posture keep the risk of direct conventional armed conflict elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial navigation remains crippled by ongoing asymmetric strikes, with monthly attacks hitting a record 27 vessels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Crude oil benchmarks touched and penetrated the $100–120 crisis band with Brent above $111 as supply disruption fears surged.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US maintains direct forward naval deployment and tactical escort commitments, without drawing rival superpowers into armed collision.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Both sides maintain irreconcilable preconditions over sanctions relief and maritime operations, foreclosing near-term diplomatic breakthrough.",
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
        "Change: The US military deployed a third carrier strike group to expand defensive airspace and maritime escort corridors.",
        "Continue: Drone and missile strikes on maritime transit lanes in the Gulf region remain at high frequencies."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Verified commercial ship attacks reached 27 in October, marking the highest monthly count of the war.",
        "Continue: Commercial tankers continue using night transits with AIS disabled under armed escort."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent broke above $111/bbl and WTI breached $102/bbl, pulling price bands into the crisis tier.",
        "Continue: Geopolitical risk premia across Gulf crude cargoes remain entrenched with refiners panic-hedging."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: IRGC leadership openly warned that ongoing US escorts would trigger strikes on American military bases in the region.",
        "Continue: The US administration maintained that freedom of navigation through Hormuz will be defended by force."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US insistence on free navigation and sanctions pressure directly clashes with Iran's demand for full sanctions lifting."
    ],
    military: [
      "US carrier-led naval escort enforcement directly faces Iran's anti-access mine, drone, and regional missile deterrent."
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "Iran Warns It Will Target US Bases If Commercial Escorts Continue",
      description: "IRGC commanders publicly stated that US military bases across the Middle East will be targeted if US naval vessels continue armed escort missions through the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-10-23T06:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Deploys Third Carrier Strike Group to Middle East Theater",
      description: "The Pentagon ordered a third aircraft carrier strike group to the region alongside thousands of personnel to secure Hormuz transit routes.",
      verification: "confirmed",
      timestamp: "2026-10-22T20:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "October Tanker Attacks Reach War-Time High of 27 Incidents",
      description: "IMO records and maritime tracking data confirmed 27 commercial vessel attacks in October, demonstrating sustained Iranian maritime interdiction capacity.",
      verification: "confirmed",
      timestamp: "2026-10-22T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Oil Benchmarks Enter the $100–120 Crisis Band",
      description: "Brent crude consolidated above $111/bbl while WTI climbed past $102/bbl as energy markets priced in sustained chokepoint transit impairment.",
      verification: "confirmed",
      timestamp: "2026-10-23T13:57:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.231 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（↑2）：油价核心区间实质触及100–120美元危机带，美军调派第三艘航母进驻波斯湾前沿，伊朗对美军护航发出正面打击威胁。",
    bannerWarning: "→ 维持能源与大宗商品多头对冲部位，减持易受供给冲击的周期风险资产。",
    deescalationIntent: "美国坚持霍尔木兹航行自由与单边制裁施压，与伊朗要求彻底解除经济封锁互不相让。",
    structuralRisk: "海峡通航秩序遭到破坏，袭船事件单月达27起创开战新高，商业船运事实上高度依赖武力护航或深夜关闭AIS冒死通行。",
    contradictionNote: "美国坚持霍尔木兹航行自由与单边制裁施压，与伊朗要求彻底解除经济封锁互不相让。；美军多航母护航体系与伊朗反舰拒止及区域基地打击战术形成对称升级死结。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第237天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.231 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (↑2): Crude benchmarks entered the $100–120 crisis band, the US dispatched a third aircraft carrier group, and Iran issued explicit threats targe…",
    bannerWarning: "→ Maintain energy and commodity hedge positions while trimming exposure to cyclical risk assets.",
    deescalationIntent: "The US insistence on free navigation and sanctions pressure directly clashes wi…",
    structuralRisk: "Commercial navigation remains crippled by ongoing asymmetric strikes, with monthly attacks hitting …",
    contradictionNote: "The US insistence on free navigation and sanctions pressure directly clashes with Iran's demand for full sanctions lifting.; US carrier-led naval escort enforc…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 237",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
