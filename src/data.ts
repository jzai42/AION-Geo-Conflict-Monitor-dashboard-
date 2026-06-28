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
  date: "2026-06-28",
  version: "v2.109",
  conflictDay: "D120",
  keyStats: [
    {
      label: "冲突天数",
      value: "D120",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑12",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $69.00–$73.00 · Brent $73.00–$77.00",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分限制",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 68,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美伊爆发直接军事冲突。在美国对伊朗军事目标进行打击后，伊朗对科威特和巴林的美军基地发动了报复性袭击，标志着敌对行动的急剧升级。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "一艘商业油轮在海峡附近遭到无人机袭击，尽管交通尚未完全中断，但风险显著增加。美国正在扩大一条替代航线，可能引发与伊朗新的对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2.5,
      weight: 0.2,
      description: "尽管地区军事冲突升级，但由于市场预期美国制裁豁免将增加伊朗石油供应，油价依然承压，WTI和布伦特原油价格徘徊在近期低点。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美国已从提供援助转为直接军事行动，对伊朗境内目标实施打击，并与伊朗在多个第三国的美军基地发生直接交火。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 2.5,
      weight: 0.2,
      description: "美伊互相指责对方违反停火协议，并采取军事报复，导致局势螺旋升级。伊朗威胁要中止所有外交努力，谈判前景极其黯淡。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-20260628-1",
      title: "美伊直接军事交火，停火协议濒临破裂",
      description: "在伊朗无人机袭击一艘商业油轮后，美国对伊朗南部军事目标发动空袭。作为报复，伊朗伊斯兰革命卫队（IRGC）宣布对位于科威特和巴林的多个美军基地发动了导弹和无人机袭击。双方均指责对方首先违反了停火协议。",
      verification: "confirmed",
      timestamp: "2026-06-28T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260628-2",
      title: "霍尔木兹海峡油轮遭无人机袭击，航运风险激增",
      description: "据多家海事安全机构报告，悬挂巴拿马国旗的超级油轮（VLCC）“KIKU”号于6月27日在阿曼附近海域遭一架单向无人机袭击，舰桥受损，但船员安全且船只仍可航行。美国将此次袭击归咎于伊朗，并以此为由发动了报复性打击。",
      verification: "confirmed",
      timestamp: "2026-06-27T15:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260628-3",
      title: "伊朗威胁若违规行为持续，将中止所有外交进程",
      description: "在与美国发生新一轮军事交火后，伊朗伊斯兰革命卫队发表声明称，违反停火协议的行为将导致所有外交进程的“完全停止”，显著增加了通过谈判解决危机的难度。",
      verification: "confirmed",
      timestamp: "2026-06-28T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260628-4",
      title: "美军方宣布扩大霍尔木兹海峡替代航线",
      description: "美国海军监督的一个多国海事机构宣布，将扩大阿曼附近水域的一条航运路线，以允许双向交通。此举被视为对伊朗控制海峡企图的直接挑战，可能成为新的冲突引爆点。",
      verification: "confirmed",
      timestamp: "2026-06-27T20:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军直接空袭伊朗本土军事目标。",
      "伊朗对多个国家的美国军事基地发动报复性打击。",
      "停火协议框架下的谈判前景因军事升级而急剧恶化。"
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
        "变化：美伊爆发直接军事冲突，美军空袭伊朗境内目标，伊朗则报复性打击美军在科威特和巴林的基地。",
        "变化：双方均指责对方首先破坏停火协议，局势进入危险的报复循环。",
        "延续：美军在该地区保持包括三个航母战斗群在内的大规模军事存在。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：一艘商业油轮在霍尔木兹海峡附近遭无人机直接攻击，显示对民用航运的威胁升级。",
        "变化：美国宣布扩大替代航道，挑战伊朗对海峡的控制主张，加剧了海上对抗。",
        "延续：尽管风险剧增，但仍有部分商业船只在有限的护航或替代路线下通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油价对地缘冲突升级反应有限，WTI和布伦特原油价格在近期低位徘徊。",
        "延续：市场仍在消化美国临时豁免伊朗石油出口制裁的消息，供应增加的预期对冲了部分战争风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：双方公开进行强硬表态，互相指责。伊朗革命卫队威胁称，违规行为将导致所有外交渠道关闭。",
        "变化：美国总统特朗普与副总统万斯均发表声明，警告伊朗将为袭击行动承担后果。",
        "延续：旨在达成最终协议的谈判进程因军事行动而陷入停滞。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“极限施压”与有限军事打击迫使伊朗在核问题与地区影响力上让步，但伊朗强硬回应，导致局势失控。",
      "停火协议的模糊性与执行分歧为双方提供了各自解读和采取军事行动的借口，使外交努力功亏一篑。"
    ],
    military: [
      "美军试图通过精准打击削弱伊朗军事能力同时避免大规模战争，但伊朗通过不对称报复（如打击盟国美军基地、骚扰航运）来提升美方行动成本。",
      "霍尔木兹海峡的控制权成为双方军事博弈的焦点，任何一方的误判都可能导致封锁与反封锁的全面对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68,
      active: true
    }
  ],
  keyChange: "风险评分从56急升至68，因美伊双方爆发直接军事冲突，互相打击对方军事目标，停火协议濒临瓦解。",
  investmentSignal: "→ 建议减持风险资产，增持防御性头寸及波动性对冲。",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity last 24 hours",
    "Strait of Hormuz shipping status",
    "US military deployment Middle East recent",
    "Iran nuclear talks update",
    "WTI Brent price today",
    "oil price trends June 2026",
    "US sanctions on Iran update"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-28",
  version: "v2.109",
  conflictDay: "D120",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D120",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑12",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $69.00–$73.00 · Brent $73.00–$77.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partially Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 68,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Direct military conflict has erupted between the U.S. and Iran. Following U.S. strikes on Iranian military targets, Iran launched retaliatory attacks on U.S. bases in Kuwait and Bahrain, marking a sharp escalation of hostilities.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A commercial oil tanker was attacked by a drone near the strait, significantly increasing risks although traffic is not fully halted. The U.S. is expanding an alternative route, potentially creating new confrontations with Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2.5,
      weight: 0.2,
      description: "Despite the regional military escalation, oil prices remain under pressure as the market anticipates increased Iranian supply following a U.S. sanctions waiver, with WTI and Brent crude hovering near recent lows.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "The United States has shifted from providing support to direct military action, striking targets within Iran and engaging in direct fire exchanges with Iran at U.S. bases in third-party countries.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 2.5,
      weight: 0.2,
      description: "The U.S. and Iran are accusing each other of violating the ceasefire and are engaged in military retaliation, leading to a spiral of escalation. Iran has threatened to halt all diplomatic efforts, making negotiation prospects extremely dim.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-20260628-1",
      title: "US and Iran Engage in Direct Military Exchange, Ceasefire Nears Collapse",
      description: "Following an Iranian drone attack on a commercial oil tanker, the U.S. launched airstrikes against military targets in southern Iran. In retaliation, Iran's IRGC announced it had launched missile and drone attacks on several U.S. military bases in Kuwait and Bahrain. Both sides accuse the other of violating the ceasefire first.",
      verification: "confirmed",
      timestamp: "2026-06-28T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260628-2",
      title: "Oil Tanker Struck by Drone in Strait of Hormuz, Shipping Risk Surges",
      description: "The Panama-flagged VLCC 'KIKU' was hit by a one-way drone near Oman on June 27, according to maritime security firms. The vessel's bridge sustained damage, but the crew is safe and the ship remains underway. The U.S. blamed Iran for the attack, citing it as justification for retaliatory strikes.",
      verification: "confirmed",
      timestamp: "2026-06-27T15:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260628-3",
      title: "Iran Threatens to Halt All Diplomatic Processes if Violations Continue",
      description: "Following the new round of military exchanges with the U.S., Iran's IRGC issued a statement declaring that violations of the ceasefire would lead to a 'complete halt' of all diplomatic processes, significantly increasing the difficulty of resolving the crisis through negotiation.",
      verification: "confirmed",
      timestamp: "2026-06-28T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260628-4",
      title: "U.S. Military Announces Expansion of Alternative Hormuz Transit Route",
      description: "A multinational maritime body overseen by the U.S. Navy announced it will widen a shipping route in waters near Oman to allow for two-way traffic. The move is seen as a direct challenge to Iran's attempts to control the strait and could become a new flashpoint.",
      verification: "confirmed",
      timestamp: "2026-06-27T20:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "U.S. military conducts direct airstrikes on Iranian sovereign territory.",
      "Iran launches retaliatory strikes against U.S. military bases in multiple countries.",
      "Prospects for negotiation under the ceasefire framework have deteriorated sharply due to military escalation."
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
        "Change: Direct military conflict has erupted between the U.S. and Iran, with U.S. airstrikes on Iranian targets and Iranian retaliatory strikes on U.S. bases i…",
        "Change: Both sides accuse the other of breaking the ceasefire first, entering a dangerous cycle of retaliation.",
        "Continue: The U.S. maintains a massive military presence in the region, including three carrier strike groups."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: A commercial oil tanker was directly attacked by a drone near the Strait of Hormuz, indicating an escalation of threats to civilian shipping.",
        "Change: The U.S. announced the expansion of an alternative shipping lane, challenging Iran's claims of control over the strait and intensifying maritime confro…",
        "Continue: Despite soaring risks, some commercial vessels continue to transit under limited escort or via alternative routes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: International oil prices have shown a limited reaction to the military escalation, with WTI and Brent crude prices hovering near recent lows.",
        "Continue: The market is still pricing in the U.S. temporary waiver on Iranian oil export sanctions, with the prospect of increased supply offsetting some of th…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Both sides have issued strong public statements, trading blame. Iran's IRGC threatened that violations would shut down all diplomatic channels.",
        "Change: U.S. President Trump and Vice President Vance both released statements warning Iran of consequences for its attacks.",
        "Continue: The negotiation process aimed at reaching a final agreement has stalled due to the military actions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to compel Iranian concessions on nuclear and regional issues through 'maximum pressure' and limited military strikes, but Iran's hardline response is causing the situation to spiral out of control.",
      "The ambiguity and implementation disagreements of the ceasefire agreement have provided pretexts for both sides to take military action, undermining diplomatic efforts."
    ],
    military: [
      "The U.S. military seeks to degrade Iranian capabilities through precision strikes while avoiding a large-scale war, but Iran uses asymmetric retaliation (e.g., striking U.S. bases in allied countries, harassing shipping) to raise the costs of U.S. action.",
      "Control over the Strait of Hormuz has become a focal point of the military contest, where any miscalculation by either side could lead to a full-scale confrontation over blockade and anti-blockade operations."
    ]
  },
  scoreTrend: [
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56
    },
    {
      date: "06-28",
      score: 68,
      active: true
    }
  ],
  keyChange: "Risk score surged from 56 to 68 as the U.S. and Iran engaged in direct military conflict, striking each other's military targets and bringing the ceasefire agreement to the brink of collapse.",
  investmentSignal: "→ Recommend reducing exposure to risk assets, increasing defensive positions and volatility hedges.",
  prevRiskScore: 56,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity last 24 hours",
    "Strait of Hormuz shipping status",
    "US military deployment Middle East recent",
    "Iran nuclear talks update",
    "WTI Brent price today",
    "oil price trends June 2026",
    "US sanctions on Iran update"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.109 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（↑12）：风险评分从56急升至68，因美伊双方爆发直接军事冲突，互相打击对方军事目标，停火协议濒临瓦解。",
    bannerWarning: "→ 建议减持风险资产，增持防御性头寸及波动性对冲。",
    deescalationIntent: "美国试图通过“极限施压”与有限军事打击迫使伊朗在核问题与地区影响力上让步，但伊朗强硬回应，导致局势失控。",
    structuralRisk: "一艘商业油轮在海峡附近遭到无人机袭击，尽管交通尚未完全中断，但风险显著增加。美国正在扩大一条替代航线，可能引发与伊朗新的对抗。",
    contradictionNote: "美国试图通过“极限施压”与有限军事打击迫使伊朗在核问题与地区影响力上让步，但伊朗强硬回应，导致局势失控。；美军试图通过精准打击削弱伊朗军事能力同时避免大规模战争，但伊朗通过不对称报复（如打击盟国美军基地、骚扰航运）来提升美方行动成本。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第120天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.109 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (↑12): Risk score surged from 56 to 68 as the U.S. and Iran engaged in direct military conflict, striking each other's military targets and bringi…",
    bannerWarning: "→ Recommend reducing exposure to risk assets, increasing defensive positions and volatility hedges.",
    deescalationIntent: "The U.S. aims to compel Iranian concessions on nuclear and regional issues thro…",
    structuralRisk: "A commercial oil tanker was attacked by a drone near the strait, significantly increasing risks alt…",
    contradictionNote: "The U.S. aims to compel Iranian concessions on nuclear and regional issues through 'maximum pressure' and limited military strikes, but Iran's hardline respons…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 120",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
