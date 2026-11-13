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
  date: "2026-11-13",
  version: "v2.252",
  riskScore: 68,
  change: "none",
  keyChange: "美方公开淡化短期协议必要性，伊朗重申封锁解除前拒绝接触，五维因子保持平衡；综合风险分落盘 68（较昨日 持平（+0））",
  keyStats: [
    {
      label: "冲突天数",
      value: "D258",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
      description: "美军对伊海上封锁行动与伊朗沿峡防御保持对抗，多战线局部交火延续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡商业通行严重受限，通航量不足正常水平五成并伴有触雷与拦截风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "WTI与Brent主力合约维持在87–97美元区间震荡，市场供给担忧与OPEC+增产相互对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持中东战区封锁与巡航护航，其余外部大国仅限于外交斡旋与情报跟进。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "美伊双边言论趋硬，直接协议预期降温，停火渠道脆弱但间接接触仍未完全中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军对进出伊朗港口船只维持严格封锁，护航商业船队通过外围通道",
      "伊朗维持水雷阻绝与通行许可证制度，反制外部制裁压力",
      "双方高层公开降温和解预期，短线转入持久消耗与心理博弈"
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
        "延续：美军第5舰队维持对伊朗港口的海上临检与关键航道护航巡逻。",
        "延续：伊朗伊斯兰革命卫队在沿海岛礁与沿岸基地保持防空戒备，未发起纵深导弹反击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡商业通行率持续受到压制，未获报备或护航船只转道或滞留。",
        "变化：伊朗巡逻力量进一步强化对未授权通行船只的水雷与电子预警威慑。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际原油基准价格横盘拉锯，WTI与Brent保持在87–97美元区间震荡整理。",
        "延续：OPEC+逐步恢复产量平衡了中东运力中断风险，投机性溢价被有效抑制。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普公开发文表示不急于同伊朗达成协议，降级进程被推迟至国内优先事务之后。",
        "延续：伊朗领导层重申必须先彻底解除军事封锁与制裁方可启动官方谈判。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方拒绝以取消全面制裁作为先决条件，伊朗坚持非全面解封不谈"
    ],
    military: [
      "美军海上封锁执法与伊朗控制霍尔木兹通行主权之间的不可调和性"
    ]
  },
  scoreTrend: [
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普公开淡化美伊协议迫切性",
      description: "美国总统特朗普表态称结束战争不依赖于同德黑兰达成协议，指示副总统万斯关注国内事项，实质推迟谈判进程。",
      verification: "confirmed",
      timestamp: "2026-11-13T09:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗否认多哈秘密接触并重申诉求",
      description: "伊朗最高国家安全委员会秘书雷扎伊发表声明，称多哈秘密会晤报道为虚假信息，强调浓缩铀不会出境且须先解除封锁。",
      verification: "confirmed",
      timestamp: "2026-11-12T16:20:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡油轮遇险与美军护航应对",
      description: "霍尔木兹周边连续出现油轮触雷受损报告，美军中央司令部维持阿曼湾船对船转运与外围武装护航。",
      verification: "confirmed",
      timestamp: "2026-11-13T07:41:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际原油价格在87–97美元带横盘整理",
      description: "WTI与Brent原油期货日内维持窄幅震荡，受供需基本面与航运阻力共同约束，价格未出现大幅单边异动。",
      verification: "confirmed",
      timestamp: "2026-11-13T17:32:00Z",
      significance: ""
    }
  ],
  investmentSignal: "→ 维持防御配置并对冲能源资产波动，在谈判停滞与封锁常态化下规避重度风险资产。",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-13",
  version: "v2.252",
  riskScore: 68,
  change: "none",
  keyChange: "US leadership downplays immediate deal urgency while Iran restates conditions; 5D factor scores stay stable with composite at 68; composite risk score prints at 68 (vs prior day flat (+0))",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D258",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
      description: "US naval blockade actions and Iranian coastal air defense standoffs persist with localized skirmishes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial traffic through Hormuz remains severely restricted with transit volume below 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "WTI and Brent benchmarks fluctuate within the $87–97 band as OPEC+ output offsets geopolitical risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US maintains direct blockade operations and convoy escorts; other powers provide mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Public rhetoric hardens on both sides; immediate settlement prospects cool although channels remain open.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US Navy enforces strict maritime blockade on ships servicing Iranian terminals while escorting regional tankers",
      "Iran maintains naval mining threat and transit authorization regimes to exert asymmetric economic counter-pressure",
      "Both leaderships publicly cool diplomatic expectations, settling into a protracted war of attrition"
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
        "Continue: US 5th Fleet maintains maritime interception operations and air patrol escorts outside the strait.",
        "Continue: IRGC naval and missile forces sustain coastal readiness without initiating deep strikes."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping transits remain constrained below 50% with unescorted vessels rerouted.",
        "Change: Iranian naval patrols reinforce electronic and acoustic mine surveillance against unauthorized passages."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global oil benchmarks trade range-bound, oscillating between $87 and $97 per barrel.",
        "Continue: Output increases from Gulf producers counter tanker bottleneck premiums, checking speculative spikes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump states Washington does not urgently need a deal with Tehran, dampening near-term talks.",
        "Continue: Tehran reiterates that full lifting of the naval blockade and sanctions remains non-negotiable."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US refuses upfront sanctions removal as a prerequisite while Tehran refuses talks without immediate lifting of blockade"
    ],
    military: [
      "Irreconcilable friction between US naval blockade enforcement and Iran's assertion of territorial sovereignty over the strait"
    ]
  },
  scoreTrend: [
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68
    },
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Publicly Downplays Urgency of Iran Agreement",
      description: "President Trump declared that the US no longer needs a deal with Iran to conclude the war, dampening diplomatic optimism.",
      verification: "confirmed",
      timestamp: "2026-11-13T09:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Tehran Rebuffs Secret Talks and Reasserts Demands",
      description: "Iranian security chief Mohsen Rezaei rejected reports of covert meetings in Doha, insisting sanctions and blockade must be lifted first.",
      verification: "confirmed",
      timestamp: "2026-11-12T16:20:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Tanker Incidents and Escort Standoff in Hormuz",
      description: "Reports emerged of tankers encountering sea mine hazards in the strait while US forces maintain escort missions in the Gulf of Oman.",
      verification: "confirmed",
      timestamp: "2026-11-13T07:41:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Consolidate in the $87–97 Range",
      description: "WTI and Brent futures remain range-bound as supply replenishment from alternative producers balances chokepoint transit risks.",
      verification: "confirmed",
      timestamp: "2026-11-13T17:32:00Z",
      significance: ""
    }
  ],
  investmentSignal: "→ Maintain defensive allocations and energy volatility hedges while avoiding high-beta risk assets amid protracted standoff.",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.252 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（持平）：美方公开淡化短期协议必要性，伊朗重申封锁解除前拒绝接触，五维因子保持平衡；综合风险分落盘 68（较昨日 持平（+0））",
    bannerWarning: "→ 维持防御配置并对冲能源资产波动，在谈判停滞与封锁常态化下规避重度风险资产。",
    deescalationIntent: "美方拒绝以取消全面制裁作为先决条件，伊朗坚持非全面解封不谈",
    structuralRisk: "霍尔木兹海峡商业通行严重受限，通航量不足正常水平五成并伴有触雷与拦截风险。",
    contradictionNote: "美方拒绝以取消全面制裁作为先决条件，伊朗坚持非全面解封不谈；美军海上封锁执法与伊朗控制霍尔木兹通行主权之间的不可调和性",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第258天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.252 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (Flat): US leadership downplays immediate deal urgency while Iran restates conditions; 5D factor scores stay stable with composite at 68; composite…",
    bannerWarning: "→ Maintain defensive allocations and energy volatility hedges while avoiding high-beta risk assets amid protracted stan…",
    deescalationIntent: "US refuses upfront sanctions removal as a prerequisite while Tehran refuses tal…",
    structuralRisk: "Commercial traffic through Hormuz remains severely restricted with transit volume below 50%.",
    contradictionNote: "US refuses upfront sanctions removal as a prerequisite while Tehran refuses talks without immediate lifting of blockade; Irreconcilable friction between US nav…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 258",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
