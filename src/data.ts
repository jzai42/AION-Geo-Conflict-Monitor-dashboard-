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
  date: "2026-11-12",
  version: "v2.251",
  riskScore: 68,
  change: "none",
  keyChange: "美伊公开外交要价拉大分歧，霍尔木兹海峡受限通行与原油高位盘整持续，地缘综合风险维持在相持平台；综合风险分落盘 68（较昨日 持平（+0））",
  investmentSignal: "→ 维持大宗商品与能源头寸对冲，在美伊谈判僵局下对风险资产保持战术防御配置。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D257",
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
      value: "WTI $85.13–$87.83 · Brent $91.19–$94.82",
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
      description: "美军与伊朗在波斯湾空域及岛屿周边保持高戒备威慑，前沿战备维持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通航量持续受限，商业油轮与主要班轮维持大范围避险绕行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "原油基准价格处于$85–$95区间高位盘整，地缘风险溢价刚性存在但未失控飙升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国海空军事部署到位并维持局部威慑，区域伙伴国积极主导多哈间接外交通道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "美伊核心条件分歧巨大，谈判虽未彻底破裂但推进难度极高，停滞风险突出。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗将霍尔木兹海峡通航作为索要全面经济松绑的谈判筹码，寸步不让。",
      "美军维持有限震慑与护航威慑态势，同时避免局势外溢至全面地面作战。",
      "多哈与马斯喀特调解机制受制于双方互信缺失，缺乏短期突破支撑。"
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
        "延续：美军前沿海空战备力量对霍尔木兹及周边水域保持高度警戒部署。",
        "延续：伊朗伊斯兰革命卫队强化沿海导弹阵地防御，双方未爆发新增直接交火。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行量维持战前50%以下受限水平，班轮绕行非洲成为常态。",
        "延续：伊朗维持对途经商船的主权排查机制，商业航运保费持续处于高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI维持在$85–$88区间，Brent维持在$91–$95区间，现货紧平衡态势稳固。",
        "变化：谈判缺乏进展打破短期油价大幅回调预期，供应中断溢价支撑显著。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：德黑兰公开证实七项严苛复谈前提，强调美方欺骗性策略将遭强硬回应。",
        "延续：华盛顿表态无需仓促达成协议，重申美军已全面锁定戒备。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗坚持将彻底解除制裁与停止区域军事行动作为重新开放霍尔木兹海峡的前置条件。",
      "美国政府要求伊朗单方面停止封锁且不愿在未获实质核让步前解除关键金融制裁。"
    ],
    military: [
      "美军需遏制伊朗对国际航道的掐断能力，同时极力避免被卷入全面区域常规战争。",
      "伊朗通过不对称反舰与无人机威胁维持战略威慑，但防空设施遭受持续消耗性打击。"
    ]
  },
  scoreTrend: [
    {
      date: "11-08",
      score: 74
    },
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
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗谈判代表宣布恢复海峡通行七大条件",
      description: "伊朗议长卡利巴夫公开表示，华盛顿必须全面解除封锁、释放冻结资金并正式宣布停战，否则霍尔木兹海峡通行权不会恢复到战前状态。",
      verification: "confirmed",
      timestamp: "2026-11-11T18:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "白宫表示目前无需急于达成对伊协议",
      description: "特朗普总统与鲁比奥国务卿表示美方当前不急于达成协议，虽然暂未计划扩大空袭，但美军保持全面戒备，反驳了即将取得突破的说法。",
      verification: "confirmed",
      timestamp: "2026-11-12T13:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡商业通航量维持重度受限",
      description: "国际航运监测显示霍尔木兹海峡通航率维持在战前常态的50%以下，主要集装箱与油轮船队维持好望角绕行路径。",
      verification: "confirmed",
      timestamp: "2026-11-12T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际基准油价保持在偏强震荡区间",
      description: "WTI与Brent原油分别徘徊在$85–$88与$91–$95区间，美伊间接谈判停滞限制了油价下行空间，供应风险溢价保持黏性。",
      verification: "confirmed",
      timestamp: "2026-11-12T17:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-12",
  version: "v2.251",
  riskScore: 68,
  change: "none",
  keyChange: "US-Iran public negotiation stances diverge further as Strait of Hormuz restrictions and oil risk premiums persist, keeping geopolitical composite risk plateaued at 68.",
  investmentSignal: "→ Maintain hedges across energy and commodities, while keeping defensive postures on risk assets amid the negotiation stalemate.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D257",
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
      value: "WTI $85.13–$87.83 · Brent $91.19–$94.82",
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
      description: "US and Iranian forces maintain high operational readiness across Persian Gulf maritime and aerial sectors.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Chokepoint transit remains suppressed with global commercial liners rerouting around Africa.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Crude benchmarks consolidate within the upper $85–$95 band, sustaining supply premiums without runaway surges.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US naval deterrence remains active while regional mediators drive indirect diplomatic channels in Doha.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Fundamental divergence on core demands keeps talks stalled, elevating friction risks despite open backchannels.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran leverages Hormuz maritime restrictions as prime bargaining chips for full sanctions relief.",
      "US forces enforce targeted deterrence while steering clear of uncontrolled full-scale ground expansion.",
      "Mediation in Doha and Muscat is constrained by acute mistrust, precluding swift breakthroughs."
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
        "Continue: US sea and air forces maintain elevated defensive patrols over the Gulf and Hormuz approach corridors.",
        "Continue: IRGC reinforces coastal missile and drone readiness without triggering fresh direct missile exchanges."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial vessel traffic remains depressed below 50% of capacity, normalizing Cape route diversions.",
        "Continue: Iranian patrol elements maintain selective boarding and verification protocols across territorial waters."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI trades at $85–$88 and Brent at $91–$95, maintaining tight physical market balances.",
        "Change: Stalled negotiations eliminate short-term easing assumptions, cementing geopolitical risk premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran publicly details seven non-negotiable preconditions, rejecting US transitional proposals as deceptive.",
        "Continue: Washington reiterates it does not need a hurried deal and remains locked and loaded for potential escalations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran demands comprehensive sanctions termination and end of regional hostilities before restoring normal strait transit.",
      "The United States demands unrestricted maritime passage without offering pre-emptive broad sanctions relief."
    ],
    military: [
      "US forces must deter maritime interdiction while preventing spiral expansion into a protracted regional war.",
      "Iran relies on asymmetric missile and drone deterrence despite sustained degradation of its air defense systems."
    ]
  },
  scoreTrend: [
    {
      date: "11-08",
      score: 74
    },
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
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Negotiator Outlines Seven Conditions for Hormuz Reopening",
      description: "Iranian Parliament Speaker Mohammad Bagher Qalibaf stated that Washington must lift blockades, release frozen assets, and formally declare an end to the war before Strait transit normalizes.",
      verification: "confirmed",
      timestamp: "2026-11-11T18:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "White House Indicates No Immediate Rush for Iran Agreement",
      description: "President Trump and Secretary Rubio stressed Washington is not rushing into a deal and maintains full combat readiness while rejecting claims of imminent breakthroughs.",
      verification: "confirmed",
      timestamp: "2026-11-12T13:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Hormuz Shipping Volume Stays Heavily Depressed",
      description: "Maritime flow tracking shows Strait of Hormuz transits remain below 50% of peacetime baselines, with global liners maintaining Cape of Good Hope reroutings.",
      verification: "confirmed",
      timestamp: "2026-11-12T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Maintain Range-Bound Geopolitical Risk Premium",
      description: "WTI and Brent settle firmly within $85–$88 and $91–$95 brackets respectively as diplomatic deadlock counters downside inventory pressures.",
      verification: "confirmed",
      timestamp: "2026-11-12T17:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.251 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（持平）：美伊公开外交要价拉大分歧，霍尔木兹海峡受限通行与原油高位盘整持续，地缘综合风险维持在相持平台；综合风险分落盘 68（较昨日 持平（+0））",
    bannerWarning: "→ 维持大宗商品与能源头寸对冲，在美伊谈判僵局下对风险资产保持战术防御配置。",
    deescalationIntent: "伊朗坚持将彻底解除制裁与停止区域军事行动作为重新开放霍尔木兹海峡的前置条件。",
    structuralRisk: "海峡通航量持续受限，商业油轮与主要班轮维持大范围避险绕行。",
    contradictionNote: "伊朗坚持将彻底解除制裁与停止区域军事行动作为重新开放霍尔木兹海峡的前置条件。；美军需遏制伊朗对国际航道的掐断能力，同时极力避免被卷入全面区域常规战争。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第257天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.251 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (Flat): US-Iran public negotiation stances diverge further as Strait of Hormuz restrictions and oil risk premiums persist, keeping geopolitical com…",
    bannerWarning: "→ Maintain hedges across energy and commodities, while keeping defensive postures on risk assets amid the negotiation s…",
    deescalationIntent: "Iran demands comprehensive sanctions termination and end of regional hostilitie…",
    structuralRisk: "Chokepoint transit remains suppressed with global commercial liners rerouting around Africa.",
    contradictionNote: "Iran demands comprehensive sanctions termination and end of regional hostilities before restoring normal strait transit.; US forces must deter maritime interdi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 257",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
