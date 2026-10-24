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
  date: "2026-10-24",
  version: "v2.232",
  riskScore: 82,
  keyChange: "美伊海空与代理人远程交火持续，霍尔木兹海峡及周边海域维持极度承压态势，国际油价稳固运行于百美元上方危机带，局势处于高位黏滞胶着期。",
  investmentSignal: "→ 维持能源与大宗商品的战术对冲头寸，保持对风险资产的防御性低配配置。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D238",
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
      value: "WTI $98.84–$103.92 · Brent $108.28–$112.41",
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
      description: "美伊直接前沿海空对抗与区域导弹/无人机袭击维持高频交火，战线活跃度居高不下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "常规商业航运机制已实质停摆，通行依赖关闭AIS信号及高风险武装护航编队。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "国际基准油价区间上沿进入$100–120危机带，中东断供忧虑主导金融盘面风险溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "主要大国保持区域前沿威慑部署、战区防空反导及情报支援，未升级为直接联军介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双边官方无直接接触渠道，卡塔尔与巴基斯坦等第三方斡旋未获实质突破，谈判处于停滞高阻态势。",
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
      "霍尔木兹海峡及外围海域全面转入关灯隐蔽穿行与护航交火并存的非对称封锁对抗阶段。",
      "原油与成品油供应溢价在高位固化，各方在红线边缘展开高频试探性军事与威慑博弈。"
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
        "延续：红海至波斯湾海空防空截击保持战备，无正规军地面接触。",
        "变化：也门胡塞武装对沙特东部能源目标无人机袭击频率边际抬升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡常规商业投保与单船通行机制基本瘫痪。",
        "变化：阿联酋外海油轮溢油事件加剧阿曼湾集结区防务警戒级别。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：双基准原油主体运行在100–120美元危机带。",
        "变化：离岸船对船过驳折价走阔，但期货端地缘断供溢价依然坚挺。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊决策层对彼此施压底线未显现软化迹象。",
        "变化：伊朗官方明确否认近期开启技术性间接会谈的可能。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "德黑兰坚持解除战略封锁为谈判前提与华盛顿要求彻底停止区域非对称袭击的对立。"
    ],
    military: [
      "霍尔木兹极限海上拒止态势与美盟护航编队威慑防御之间的战术拉锯消耗。"
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "沙特阿美达兰园区受无人机威胁实施防范疏散",
      description: "因也门方向无人机袭击威胁波及东部省份，沙特阿美对达兰总部园区采取部分人员临时疏散措施，运营设施未受实质受损（Reuters、Bloomberg报道）。",
      verification: "confirmed",
      timestamp: "2026-10-23T18:40:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "阿联酋乌姆盖万外海出现油轮受损溢油",
      description: "阿联酋官方环境部门通报在乌姆盖万海域监测到油轮溢油，船运消息源显示涉事海域近期曾遭遇未指明武器袭击，周边航道警戒等级调高（AP、Al Jazeera报道）。",
      verification: "confirmed",
      timestamp: "2026-10-23T22:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "德黑兰官方重申拒绝在威慑框架下重启实质对话",
      description: "伊朗外交部及半官方媒体明确表态，在美方解除惩罚性制裁前第三方调解无法促成任何直接或实质性双边谈判（AFP、Nournews报道）。",
      verification: "confirmed",
      timestamp: "2026-10-24T06:30:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
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
      score: 82
    },
    {
      date: "10-24",
      score: 82,
      active: true
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-24",
  version: "v2.232",
  riskScore: 82,
  keyChange: "US-Iran direct standoff and regional proxy strikes persist; Strait of Hormuz transit remains under extreme disruption while crude oil is solidly anchored above $100 in the crisis band, keeping overall geopolitical risk sticky at high levels.",
  investmentSignal: "→ Maintain tactical hedges in energy and commodities while holding a defensive underweight in risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D238",
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
      value: "WTI $98.84–$103.92 · Brent $108.28–$112.41",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Disruption",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active standoff and frequent exchanges of fire across regional flashpoints without full-scale ground invasion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial navigation remains largely shut down in customary form, relying on dark transits and armed convoys.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global benchmark crude holds within the $100–120 crisis band amid persistent regional supply risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain theater air defense, forward naval postures, and intelligence support without joint coalition kinetic expansion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "No direct bilateral diplomatic channel active; regional mediation through Qatar and Pakistan has made no breakthrough.",
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
      "The conflict is characterized by asymmetric chokepoint interdiction, AIS-dark convoying, and reciprocal deterrence in the Persian Gulf.",
      "Energy risk premiums remain entrenched as both sides conduct high-friction skirmishes along tactical red lines."
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
        "Continue: Red Sea and Gulf air defense interception operations remain on high alert without ground contact.",
        "Change: Drone targeting against Saudi eastern energy nodes has shown a marginal uptick in frequency."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Standard commercial underwriting and independent sailings remain non-viable.",
        "Change: Tanker spill incident off Umm Al Quwain has elevated maritime defense alert levels in the Gulf of Oman."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both crude benchmarks remain consolidated inside the $100–120 crisis bracket.",
        "Change: Off-shore ship-to-ship physical crude discounts widened while financial futures held firm on risk premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both US and Iranian leaderships maintain unyielding rhetorical and strategic stances.",
        "Change: Tehran officially pushed back against expectations of near-term bilateral technical dialogue."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Tehran demands an immediate end to economic and naval containment, while Washington insists on halting regional asymmetric strikes."
    ],
    military: [
      "Asymmetric maritime area-denial operations clashing with US-led defensive convoy escort architecture."
    ]
  },
  events: [
    {
      id: "EVT-01",
      title: "Precautionary Evacuation Measures at Saudi Aramco Dhahran Complex",
      description: "Amid drone threats targeting eastern infrastructure, precautionary personnel evacuations were implemented at Aramco's Dhahran facility with no operational disruption reported (Reuters, Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-10-23T18:40:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Tanker Oil Spill Reported off UAE Coast of Umm Al Quwain",
      description: "UAE environmental authorities confirmed an oil spill off Umm Al Quwain following suspected projectile strikes on merchant vessels in adjacent waters (AP, Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-10-23T22:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Tehran Rebuffs Near-Term Unconditional Dialogue",
      description: "Iranian state media and diplomatic spokespersons stated that mediation efforts cannot advance to substantive bilateral negotiations without sanctions relief (AFP, Nournews).",
      verification: "confirmed",
      timestamp: "2026-10-24T06:30:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
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
      score: 82
    },
    {
      date: "10-24",
      score: 82,
      active: true
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.232 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美伊海空与代理人远程交火持续，霍尔木兹海峡及周边海域维持极度承压态势，国际油价稳固运行于百美元上方危机带，局势处于高位黏滞胶着期。",
    bannerWarning: "→ 维持能源与大宗商品的战术对冲头寸，保持对风险资产的防御性低配配置。",
    deescalationIntent: "德黑兰坚持解除战略封锁为谈判前提与华盛顿要求彻底停止区域非对称袭击的对立。",
    structuralRisk: "常规商业航运机制已实质停摆，通行依赖关闭AIS信号及高风险武装护航编队。",
    contradictionNote: "德黑兰坚持解除战略封锁为谈判前提与华盛顿要求彻底停止区域非对称袭击的对立。；霍尔木兹极限海上拒止态势与美盟护航编队威慑防御之间的战术拉锯消耗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第238天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.232 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): US-Iran direct standoff and regional proxy strikes persist; Strait of Hormuz transit remains under extreme disruption while crude oil is so…",
    bannerWarning: "→ Maintain tactical hedges in energy and commodities while holding a defensive underweight in risk assets.",
    deescalationIntent: "Tehran demands an immediate end to economic and naval containment, while Washin…",
    structuralRisk: "Commercial navigation remains largely shut down in customary form, relying on dark transits and arm…",
    contradictionNote: "Tehran demands an immediate end to economic and naval containment, while Washington insists on halting regional asymmetric strikes.; Asymmetric maritime area-d…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 238",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
