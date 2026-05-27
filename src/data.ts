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
  version: "v2.76",
  date: "2026-05-27",
  keyStats: [
    {
      label: "冲突天数",
      value: "D88",
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
      value: "WTI $90.25–$92.23 · Brent $93.89–$98.16",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行受控但高度紧张",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 48,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "停火协议的脆弱性通过持续的低烈度军事事件显现。美国中央司令部确认在伊朗南部针对其认定的威胁目标（导弹发射场与布雷艇）实施了“自卫性打击”，而伊朗方面则谴责此举违反了停火协议，并声称击落了美方无人机。这些事件表明，尽管高层在进行谈判，但前线地区的军事对峙和误判风险依然存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "霍尔木兹海峡的航运状况依然极不稳定且信息矛盾。伊朗革命卫队声称已开始允许少量船只在其“协调和授权”下通行，但这被认为是伊朗试图展示其对海峡控制权的一种方式。然而，该说法缺乏独立航运数据或国际海事组织的证实，大多数商业船运公司仍选择避开该航线，整体通行量远低于正常水平。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "对美伊可能达成初步协议的预期给油价带来了下行压力，导致价格从近期高点回落。然而，布伦特和WTI原油价格在下跌后，其交易区间的主体部分依然位于85-100美元/桶的较高水平。这表明市场虽然对外交努力做出积极反应，但对霍尔木兹海峡能否顺利重开以及协议能否持久执行仍持谨慎态度，供应中断的风险溢价尚未完全消除。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国介入的模式保持稳定，主要集中在美国的直接参与。美国不仅是与伊朗谈判的核心方，同时也在该地区保持着强大的军事存在和威慑态势。此外，有报道指出，中国可能作为一个潜在的第三方，在伊核协议的特定技术环节（如处理浓缩铀）中发挥作用，但这仍停留在外交层面，未构成新的军事或安全介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊之间的谈判取得了实质性进展，双方正围绕一份谅解备忘录（MOU）的草案进行讨论，内容涉及重开霍尔木兹海峡、制裁减免和延长停火等核心议题。尽管双方都释放了取得进展的信号，但也均公开强调协议尚未敲定，在一些关键细节上仍存在分歧，显示出谈判的复杂性和达成最终协议的难度。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "油价因美伊谈判取得进展的希望而下跌超3%",
      description: "由于市场对美国和伊朗可能达成协议以结束冲突并重开霍尔木兹海峡的预期升温，国际油价显著承压。路透社报道，布伦特原油期货与WTI原油期货在周三均下跌超过3%。",
      verification: "confirmed",
      timestamp: "2026-05-27T09:13:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军确认在伊朗南部实施“自卫性打击”",
      description: "尽管停火与谈判正在进行，美国中央司令部（CENTCOM）确认其部队在伊朗南部进行了“自卫性打击”，目标是伊朗的导弹发射场和据称试图布设水雷的船只。伊朗方面称此举违反停火协议。",
      verification: "confirmed",
      timestamp: "2026-05-26T18:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "美伊谅解备忘录草案细节浮现，聚焦霍尔木兹与制裁减免",
      description: "据多家媒体引述消息人士报道，一份美伊初步谅解备忘录（MOU）的草案框架提出，以重开霍尔木兹海峡、保障航行自由为条件，换取美国分阶段放松对伊朗石油出口的制裁并解冻部分资产。但双方官员均表示协议尚未最终敲定。",
      verification: "confirmed",
      timestamp: "2026-05-25T15:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "伊朗革命卫队单方面宣称霍尔木兹海峡恢复有限通行",
      description: "伊朗伊斯兰革命卫队（IRGC）通过其官方媒体宣称，在过去24小时内，已有约25艘商业船只在与其海军“协调”后获准通行霍尔木兹海峡。该说法的独立验证有限，主要航运公司仍维持规避航线。",
      verification: "single",
      timestamp: "2026-05-26T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "报道称中国或在潜在核协议中扮演角色",
      description: "有报道称，作为潜在协议的一部分，伊朗正探讨将其浓缩铀库存转移至中国的可能性。此举旨在解决围绕伊朗核材料处置的关键症结，显示中国在外交斡旋中的潜在作用。",
      verification: "single",
      timestamp: "2026-05-26T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方的核心军事行动已暂停，但低烈度的摩擦和敌对行动时有发生。",
      "高层外交谈判渠道开启并取得一定进展，但互信基础薄弱，协议达成面临障碍。",
      "市场风险偏好在谈判进展和军事摩擦之间反复摇摆，不确定性仍是主导因素。"
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
        "变化：停火协议的脆弱性通过持续的低烈度军事事件显现。",
        "变化：美国中央司令部确认在伊朗南部针对其认定的威胁目标（导弹发射场与布雷艇）实施了“自卫性打击”，而伊朗方面则谴责此举违反了停火协议，并声称击落了美方无人机。",
        "变化：这些事件表明，尽管高层在进行谈判，但前线地区的军事对峙和误判风险依然存在。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的航运状况依然极不稳定且信息矛盾。",
        "变化：伊朗革命卫队声称已开始允许少量船只在其“协调和授权”下通行，但这被认为是伊朗试图展示其对海峡控制权的一种方式。",
        "变化：然而，该说法缺乏独立航运数据或国际海事组织的证实，大多数商业船运公司仍选择避开该航线，整体通行量远低于正常水平。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对美伊可能达成初步协议的预期给油价带来了下行压力，导致价格从近期高点回落。",
        "变化：然而，布伦特和WTI原油价格在下跌后，其交易区间的主体部分依然位于85-100美元/桶的较高水平。",
        "变化：这表明市场虽然对外交努力做出积极反应，但对霍尔木兹海峡能否顺利重开以及协议能否持久执行仍持谨慎态度，供应中断的风险溢价尚未完全消除。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：大国介入的模式保持稳定，主要集中在美国的直接参与。",
        "变化：美国不仅是与伊朗谈判的核心方，同时也在该地区保持着强大的军事存在和威慑态势。",
        "变化：此外，有报道指出，中国可能作为一个潜在的第三方，在伊核协议的特定技术环节（如处理浓缩铀）中发挥作用，但这仍停留在外交层面，未构成新的军事或安全介入。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过“极限压力”与外交手段相结合，迫使伊朗在核问题与地区行为上做出永久性让步。",
      "伊朗则力图在解除制裁、确保政权安全的前提下，最大限度保留其核能力与地区影响力，并将对霍尔木兹海峡的控制作为关键筹码。"
    ],
    military: [
      "美国旨在通过前沿部署与精确打击能力，威慑并惩罚伊朗的“恶意行为”，同时避免陷入大规模地面冲突。",
      "伊朗则利用其非对称作战能力（导弹、无人机、代理人网络）与关键水道的地理优势，挑战美国及其盟友的地区军事主导地位。"
    ]
  },
  scoreTrend: [
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48,
      active: true
    }
  ],
  keyChange: "美伊谈判取得进展的积极信号被持续的低烈度军事摩擦所抵消，导致市场情绪改善有限，风险评分在昨日基础上持平。",
  investmentSignal: "→ 维持对风险资产的防御性对冲，同时关注能源价格因谈判进展而可能出现的回调空间。",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran nuclear talks update",
    "Strait of Hormuz shipping status",
    "WTI Brent crude oil price range May 27 2026 Reuters",
    "oil prices today Bloomberg",
    "US military posture Persian Gulf",
    "Iran sanctions news"
  ]
};

export const DATA_EN: DashboardData = {
  version: "v2.76",
  date: "2026-05-27",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D88",
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
      value: "WTI $90.25–$92.23 · Brent $93.89–$98.16",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Controlled but highly tense passage",
      unit: "transit status",
      color: "#ffdc00"
    }
  ],
  riskScore: 48,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The fragility of the ceasefire is evident through continued low-intensity military incidents. U.S. CENTCOM confirmed conducting 'self-defense strikes' in southern Iran against what it identified as threat targets (missile sites and minelaying boats), while Iran condemned the act as a ceasefire violation and claimed to have shot down a U.S. drone. These events indicate that despite high-level negotiations, frontline military standoff and risks of miscalculation persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The shipping situation in the Strait of Hormuz remains highly volatile with conflicting information. Iran's IRGC claims it has started allowing a small number of vessels to pass under its 'coordination and authorization,' which is seen as an attempt by Iran to demonstrate its control over the strait. However, this claim lacks independent verification from shipping data or international maritime bodies, and most commercial shipping lines continue to avoid the route, with overall transit volume far below normal levels.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Expectations of a potential preliminary deal between the U.S. and Iran have put downward pressure on oil prices, causing them to retreat from recent highs. However, even after the decline, the main trading range for Brent and WTI crude remains in the higher tier of $85-100 per barrel. This indicates that while the market is reacting positively to diplomatic efforts, it remains cautious about whether the Strait of Hormuz can be smoothly reopened and whether any agreement will be lasting, meaning the supply disruption risk premium has not been fully erased.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The pattern of great power involvement remains stable, primarily centered on direct U.S. participation. The U.S. is not only the core party in negotiations with Iran but also maintains a strong military presence and deterrent posture in the region. Additionally, reports suggest China could play a role as a potential third party in specific technical aspects of a nuclear deal (like handling enriched uranium), but this remains at the diplomatic level and does not constitute new military or security intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Substantive progress has been made in negotiations between the U.S. and Iran, with discussions centered on a draft Memorandum of Understanding (MOU) covering core issues like reopening the Strait of Hormuz, sanctions relief, and extending the ceasefire. Although both sides have signaled progress, they have also publicly stressed that an agreement is not yet finalized and that disagreements on key details remain, highlighting the complexity of the talks and the difficulty in reaching a final deal.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Oil Prices Drop Over 3% on Hopes of US-Iran Deal Progress",
      description: "International oil prices came under significant pressure as market expectations grew for a potential deal between the U.S. and Iran to end the conflict and reopen the Strait of Hormuz. Reuters reported that both Brent and WTI crude futures fell by more than 3% on Wednesday.",
      verification: "confirmed",
      timestamp: "2026-05-27T09:13:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "U.S. Confirms 'Self-Defense Strikes' in Southern Iran",
      description: "Despite an ongoing ceasefire and negotiations, U.S. Central Command (CENTCOM) confirmed its forces conducted 'self-defense strikes' in southern Iran, targeting Iranian missile sites and boats allegedly attempting to lay mines. Iran called the move a violation of the ceasefire.",
      verification: "confirmed",
      timestamp: "2026-05-26T18:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Details of Draft US-Iran MOU Emerge, Focusing on Hormuz and Sanctions Relief",
      description: "According to multiple media outlets citing sources, a draft framework for a preliminary U.S.-Iran Memorandum of Understanding (MOU) proposes the reopening of the Strait of Hormuz and guaranteeing freedom of navigation in exchange for a phased easing of U.S. sanctions on Iranian oil exports and the unfreezing of some assets. Officials from both sides stated a deal is not yet finalized.",
      verification: "confirmed",
      timestamp: "2026-05-25T15:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "Iran's IRGC Unilaterally Claims Limited Passage Resumes in Strait of Hormuz",
      description: "Iran's Islamic Revolutionary Guard Corps (IRGC) claimed via its official media that approximately 25 commercial vessels were granted passage through the Strait of Hormuz in the past 24 hours after 'coordinating' with its navy. Independent verification of this claim is limited, and major shipping lines continue to maintain their rerouted courses.",
      verification: "single",
      timestamp: "2026-05-26T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "China Reportedly Could Play a Role in Potential Nuclear Deal",
      description: "Reports suggest that Iran is exploring the possibility of transferring its stockpile of enriched uranium to China as part of a potential agreement. The move aims to resolve a key sticking point over the disposal of Iran's nuclear material, indicating a potential diplomatic role for China.",
      verification: "single",
      timestamp: "2026-05-26T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Core military operations by both sides have paused, but low-intensity friction and hostile acts occur periodically.",
      "High-level diplomatic negotiation channels are open and have made some progress, but the foundation of trust is weak and obstacles to a deal remain.",
      "Market risk appetite is oscillating between negotiation progress and military friction, with uncertainty as the dominant factor."
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
        "Change: The fragility of the ceasefire is evident through continued low-intensity military incidents.",
        "Change: U.S.",
        "Change: CENTCOM confirmed conducting 'self-defense strikes' in southern Iran against what it identified as threat targets (missile sites and minelaying boats),…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The shipping situation in the Strait of Hormuz remains highly volatile with conflicting information.",
        "Change: Iran's IRGC claims it has started allowing a small number of vessels to pass under its 'coordination and authorization,' which is seen as an attempt by…",
        "Change: However, this claim lacks independent verification from shipping data or international maritime bodies, and most commercial shipping lines continue to …"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Expectations of a potential preliminary deal between the U.S.",
        "Change: and Iran have put downward pressure on oil prices, causing them to retreat from recent highs.",
        "Change: However, even after the decline, the main trading range for Brent and WTI crude remains in the higher tier of $85-100 per barrel."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The pattern of great power involvement remains stable, primarily centered on direct U.S.",
        "Change: participation.",
        "Change: The U.S."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iran into permanent concessions on its nuclear program and regional behavior through a combination of 'maximum pressure' and diplomacy.",
      "Iran aims to preserve its nuclear capabilities and regional influence to the greatest extent possible while securing sanctions relief and regime security, using its control over the Strait of Hormuz as key leverage."
    ],
    military: [
      "The U.S. aims to deter and punish Iran's 'malign activities' through forward deployment and precision strike capabilities, while avoiding a large-scale ground conflict.",
      "Iran utilizes its asymmetric warfare capabilities (missiles, drones, proxy networks) and geographic advantages at key chokepoints to challenge U.S. and allied military dominance in the region."
    ]
  },
  scoreTrend: [
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48
    },
    {
      date: "05-27",
      score: 48,
      active: true
    }
  ],
  keyChange: "Positive signals from U.S.-Iran negotiations were offset by continued low-intensity military friction, leading to limited improvement in market sentiment and a flat risk score compared to yesterday.",
  investmentSignal: "→ Maintain defensive hedges on risk assets, while watching for potential pullback space in energy prices driven by negotiation progress.",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran nuclear talks update",
    "Strait of Hormuz shipping status",
    "WTI Brent crude oil price range May 27 2026 Reuters",
    "oil prices today Bloomberg",
    "US military posture Persian Gulf",
    "Iran sanctions news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.76 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 48（持平）：美伊谈判取得进展的积极信号被持续的低烈度军事摩擦所抵消，导致市场情绪改善有限，风险评分在昨日基础上持平。",
    bannerWarning: "→ 维持对风险资产的防御性对冲，同时关注能源价格因谈判进展而可能出现的回调空间。",
    deescalationIntent: "美国寻求通过“极限压力”与外交手段相结合，迫使伊朗在核问题与地区行为上做出永久性让步。",
    structuralRisk: "霍尔木兹海峡的航运状况依然极不稳定且信息矛盾。伊朗革命卫队声称已开始允许少量船只在其“协调和授权”下通行，但这被认为是伊朗试图展示其对海峡控制权的一种方式。然而，该说法缺乏独立航运数据或国际海事组织…",
    contradictionNote: "美国寻求通过“极限压力”与外交手段相结合，迫使伊朗在核问题与地区行为上做出永久性让步。；美国旨在通过前沿部署与精确打击能力，威慑并惩罚伊朗的“恶意行为”，同时避免陷入大规模地面冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第88天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.76 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 48 (Flat): Positive signals from U.S.-Iran negotiations were offset by continued low-intensity military friction, leading to limited improvement in ma…",
    bannerWarning: "→ Maintain defensive hedges on risk assets, while watching for potential pullback space in energy prices driven by nego…",
    deescalationIntent: "The U.S. seeks to compel Iran into permanent concessions on its nuclear program…",
    structuralRisk: "The shipping situation in the Strait of Hormuz remains highly volatile with conflicting information…",
    contradictionNote: "The U.S. seeks to compel Iran into permanent concessions on its nuclear program and regional behavior through a combination of 'maximum pressure' and diplomacy…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 88",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
