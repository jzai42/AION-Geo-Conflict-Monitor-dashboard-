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
  date: "2026-06-17",
  version: "v2.98",
  keyStats: [
    {
      label: "冲突天数",
      value: "D109",
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
      value: "WTI $75–77 · Brent $78–80",
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
  riskScore: 40,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "尽管美伊达成停火框架协议，但协议尚未于6月19日正式签署生效。美方明确表示将在谈判期间维持其在中东地区增强的军事部署。当前局势为军事行动暂停，但高强度的军事对峙仍在持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美伊协议框架包含重开海峡条款，官方航运威胁等级已由“危急”下调至“重大”。然而，实际通行量仍处于正常水平的极低个位数百分比，且仍有水雷威胁警告。船公司在协议正式签署和安全得到验证前普遍持观望态度，因此航道仍属“部分限制”状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "因市场预期美伊达成协议将使霍尔木兹海峡航运恢复正常，并可能放松对伊朗的石油制裁，油价中的地缘政治风险溢价被迅速挤出。WTI与Brent价格均跌至三个月来的低点，稳定在$75-$85美元区间内。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "大国介入主要体现在外交层面。G7集团发表联合声明，对美伊达成的临时协议表示欢迎，并为接下来的谈判设定了“确保伊朗永不拥核”的目标。目前没有迹象表明有第三方国家进行军事介入或提供实质性军事援助。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "美伊就一份全面的谅解备忘录达成一致，内容包括立即全面停火和启动为期60天的正式谈判。这是从直接军事冲突转向外交解决轨道的决定性一步，代表了冲突爆发以来最重大的降级事件。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "美伊达成停火与重启谈判框架协议，定于6月19日正式签署",
      description: "多家独立通讯社（Reuters, Bloomberg, Al Arabiya）报道，美国与伊朗已就一份谅解备忘录（MoU）达成框架协议，内容包括全面停火（含黎巴嫩战线）、重开霍尔木兹海峡、启动为期60天的新一轮核问题与制裁谈判。正式签署仪式计划于6月19日在瑞士举行。",
      verification: "confirmed",
      timestamp: "2026-06-17T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "油价因美伊缓和前景触及三个月低点",
      description: "随着美伊达成协议的前景明朗化，市场开始消化霍尔木兹海峡恢复通航与伊朗原油出口可能恢复的预期，导致地缘政治风险溢价快速回落。WTI与Brent原油价格均延续跌势，触及自3月以来的最低水平。",
      verification: "confirmed",
      timestamp: "2026-06-17T07:10:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "霍尔木兹海峡航运威胁等级下调，但实际通行量依然极低",
      description: "联合海事信息中心（JMIC）已将霍尔木兹海峡的航运威胁等级从“危急”下调至“重大”（Substantial），但警告攻击风险仍是“强烈可能”，且存在水雷威胁。AIS数据显示，尽管宣布了协议，海峡的实际商业交通量仍处于正常水平的个位数百分比，船东普遍持观望态度。",
      verification: "confirmed",
      timestamp: "2026-06-17T05:00:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "美国声明将在谈判期间维持中东现有军事部署",
      description: "一位美国高级官员表示，尽管与伊朗达成了停火框架协议，但在未来60天的谈判期间，美国不计划改变其在中东地区的军事力量部署。此举旨在维持威慑并为外交谈判保留筹码。",
      verification: "single",
      timestamp: "2026-06-16T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-05",
      title: "G7领导人对美伊协议表示欢迎，并强调伊朗不能拥核",
      description: "在法国举行的G7峰会上，各国领导人对美伊达成临时协议表示欢迎，并发表声明要求在黎巴嫩实现停火。声明同时强调，后续谈判必须确保伊朗“永远无法获得核武器”。",
      verification: "single",
      timestamp: "2026-06-17T10:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "尽管美伊达成停火框架协议，但协议尚未于6月19日正式签署生效。美方明确表示将在谈判期间维持其在中东地区增强的军事部署。当前局势为军事行动暂停，但高强度的军事对峙仍在持续。"
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
        "变化：美伊达成全面停火框架协议，所有战线的敌对行动有望在协议签署后暂停。",
        "延续：美国声明将在60天谈判期间维持其在中东地区增强的军事部署和威慑姿态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：JMIC已将海峡威胁等级从“危急”下调至“重大”，标志着官方风险评估的缓和。",
        "延续：尽管前景改善，但实际通行量仍接近于零，船东在协议正式签署和航道安全得到保障前保持谨慎。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对协议达成的乐观预期导致油价急剧下跌，地缘政治风险溢价基本消除，WTI和Brent价格跌至三个月低点。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：双方领导层均确认达成谅解备忘录，标志着从战争言论到外交接触的重大转变。",
        "变化：G7等国际主要力量对协议表示欢迎，并积极介入设定后续谈判框架。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的核计划细节、铀浓缩活动限制，以及美国及其盟友解除制裁的具体步骤和时间表，将是未来60天谈判的核心矛盾。",
      "协议的执行与验证机制，以及如何处理伊朗的地区代理人活动，仍是长期不稳定的根源。"
    ],
    military: [
      "尽管停火，美国维持前沿军事部署与伊朗在海峡及周边地区军事设施之间的近距离对峙，增加了误判风险。",
      "停火协议在多条战线（特别是黎巴嫩）的实际约束力及监督机制尚不明确。"
    ]
  },
  scoreTrend: [
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40,
      active: true
    }
  ],
  keyChange: "美伊就停火与重启谈判达成框架协议，冲突进入“谈判窗口期”，地缘风险显著下降。",
  investmentSignal: "→ 随着停火协议框架落地，地缘风险溢价快速回落，可考虑逐步减持能源对冲仓位并关注风险资产。",
  prevRiskScore: 44,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price June 17 2026",
    "oil price trends June 2026 reuters bloomberg",
    "US Iran relations news June 17 2026",
    "Strait of Hormuz shipping status June 2026",
    "Iran nuclear talks update 2026",
    "US military posture Persian Gulf June 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-17",
  version: "v2.98",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D109",
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
      value: "WTI $75–$77 · Brent $78–$80",
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
  riskScore: 40,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Although a ceasefire framework has been agreed upon, it is not yet officially signed and effective until June 19. The US has explicitly stated it will maintain its heightened military posture in the Middle East during negotiations. The current situation is a pause in military action, but high-intensity military standoff continues.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US-Iran deal framework includes reopening the strait, and the official maritime threat level has been downgraded from 'Critical' to 'Substantial'. However, actual transit volume remains at a very low single-digit percentage of normal levels, with mine threat warnings still in place. Shipowners are adopting a wait-and-see approach until the deal is signed and safety is verified, thus the strait remains in a 'partially restricted' state.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The geopolitical risk premium in oil prices has been rapidly squeezed out due to market expectations that a US-Iran deal will normalize shipping in the Strait of Hormuz and potentially ease oil sanctions on Iran. Both WTI and Brent prices have fallen to three-month lows, stabilizing within the $75-$85 per barrel range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Great power involvement is primarily diplomatic. The G7 issued a joint statement welcoming the interim US-Iran agreement and setting a goal for subsequent negotiations to 'ensure Iran never obtains a nuclear weapon.' There are no signs of third-party military intervention or substantive military aid.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "The US and Iran have agreed on a comprehensive Memorandum of Understanding (MoU) that includes an immediate and full ceasefire and the launch of a 60-day period of formal negotiations. This is a decisive step from direct military conflict to a diplomatic resolution track, representing the most significant de-escalation event since the conflict began.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "US and Iran reach framework agreement on ceasefire and renewed talks, to be formally signed on June 19",
      description: "Multiple independent news agencies (Reuters, Bloomberg, Al Arabiya) report that the United States and Iran have reached a framework agreement on a Memorandum of Understanding (MoU). The deal includes a comprehensive ceasefire (including the Lebanese front), the reopening of the Strait of Hormuz, and the start of a 60-day round of negotiations on nuclear issues and sanctions. A formal signing ceremony is planned for June 19 in Switzerland.",
      verification: "confirmed",
      timestamp: "2026-06-17T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "Oil prices hit three-month low on prospects of US-Iran de-escalation",
      description: "As prospects for a US-Iran deal became clearer, the market began to price in the expected resumption of shipping through the Strait of Hormuz and the potential return of Iranian crude exports, leading to a rapid unwinding of the geopolitical risk premium. Both WTI and Brent crude prices continued their decline, hitting their lowest levels since March.",
      verification: "confirmed",
      timestamp: "2026-06-17T07:10:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "Shipping threat level in Strait of Hormuz lowered, but actual transit remains extremely low",
      description: "The Joint Maritime Information Centre (JMIC) has downgraded the shipping threat level in the Strait of Hormuz from 'Critical' to 'Substantial,' but warned that an attack remains a 'strong possibility' and a mine risk exists. AIS data shows that despite the announced deal, actual commercial traffic in the strait remains at a single-digit percentage of normal levels, with shipowners widely adopting a wait-and-see attitude.",
      verification: "confirmed",
      timestamp: "2026-06-17T05:00:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "US states it will maintain current military posture in Middle East during negotiations",
      description: "A senior U.S. official stated that despite the ceasefire framework agreement with Iran, the United States does not plan to change its military force posture in the Middle East during the upcoming 60-day negotiation period. The move is intended to maintain deterrence and preserve leverage for diplomatic talks.",
      verification: "single",
      timestamp: "2026-06-16T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-05",
      title: "G7 leaders welcome US-Iran deal, stress Iran cannot obtain nuclear weapons",
      description: "At the G7 summit in France, leaders welcomed the interim deal between the US and Iran and issued a statement calling for a ceasefire in Lebanon. The statement also emphasized that subsequent negotiations must ensure that Iran 'can never obtain a nuclear weapon.'",
      verification: "single",
      timestamp: "2026-06-17T10:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Although a ceasefire framework has been agreed upon, it is not yet officially signed and effective until June 19. The US has explicitly stated it will maintain its heightened military posture in the Middle East during negotiations. The current situation is a pause in military action, but high-intensity military standoff continues."
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
        "Change: A comprehensive ceasefire framework has been agreed upon, with hostilities on all fronts expected to pause after the agreement is signed.",
        "Continue: The U.S. has stated it will maintain its enhanced military posture and deterrent stance in the Middle East during the 60-day negotiation period."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The JMIC has downgraded the strait's threat level from 'Critical' to 'Substantial,' marking an official easing of risk assessment.",
        "Continue: Despite improved prospects, actual transit volume remains near zero as shipowners exercise caution pending the formal signing of the deal and assuran…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Optimistic expectations for the deal have led to a sharp drop in oil prices, with the geopolitical risk premium largely erased, sending WTI and Brent t…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Leadership on both sides has confirmed the MoU, marking a major shift from war rhetoric to diplomatic engagement.",
        "Change: Key international powers like the G7 have welcomed the agreement and are actively involved in setting the framework for subsequent negotiations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The details of Iran's nuclear program, limits on uranium enrichment, and the specific steps and timeline for sanctions relief by the US and its allies will be the core contradictions in the upcoming 60-day negotiations.",
      "The mechanisms for implementing and verifying the agreement, as well as how to address Iran's regional proxy activities, remain sources of long-term instability."
    ],
    military: [
      "Despite the ceasefire, the close proximity of the US forward military deployment and Iran's military facilities in and around the Strait increases the risk of miscalculation.",
      "The actual enforcement and monitoring mechanisms of the ceasefire on multiple fronts (especially Lebanon) are not yet clear."
    ]
  },
  scoreTrend: [
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40,
      active: true
    }
  ],
  keyChange: "US and Iran reach a framework agreement for a ceasefire and renewed talks, moving the conflict into a 'Negotiation Window' and significantly lowering geopolitical risk.",
  investmentSignal: "→ As the ceasefire framework materializes, geopolitical risk premiums are rapidly declining; consider gradually reducing energy hedges and monitoring risk assets.",
  prevRiskScore: 44,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price June 17 2026",
    "oil price trends June 2026 reuters bloomberg",
    "US Iran relations news June 17 2026",
    "Strait of Hormuz shipping status June 2026",
    "Iran nuclear talks update 2026",
    "US military posture Persian Gulf June 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.98 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（↓4）：美伊就停火与重启谈判达成框架协议，冲突进入“谈判窗口期”，地缘风险显著下降。",
    bannerWarning: "→ 随着停火协议框架落地，地缘风险溢价快速回落，可考虑逐步减持能源对冲仓位并关注风险资产。",
    deescalationIntent: "伊朗的核计划细节、铀浓缩活动限制，以及美国及其盟友解除制裁的具体步骤和时间表，将是未来60天谈判的核心矛盾。",
    structuralRisk: "美伊协议框架包含重开海峡条款，官方航运威胁等级已由“危急”下调至“重大”。然而，实际通行量仍处于正常水平的极低个位数百分比，且仍有水雷威胁警告。船公司在协议正式签署和安全得到验证前普遍持观望态度，因…",
    contradictionNote: "伊朗的核计划细节、铀浓缩活动限制，以及美国及其盟友解除制裁的具体步骤和时间表，将是未来60天谈判的核心矛盾。；尽管停火，美国维持前沿军事部署与伊朗在海峡及周边地区军事设施之间的近距离对峙，增加了误判风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第109天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.98 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (↓4): US and Iran reach a framework agreement for a ceasefire and renewed talks, moving the conflict into a 'Negotiation Window' and significantl…",
    bannerWarning: "→ As the ceasefire framework materializes, geopolitical risk premiums are rapidly declining; consider gradually reducin…",
    deescalationIntent: "The details of Iran's nuclear program, limits on uranium enrichment, and the sp…",
    structuralRisk: "The US-Iran deal framework includes reopening the strait, and the official maritime threat level ha…",
    contradictionNote: "The details of Iran's nuclear program, limits on uranium enrichment, and the specific steps and timeline for sanctions relief by the US and its allies will be …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 109",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
