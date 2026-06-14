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
  reportId: "AION-USIR-2026-06-14-v2.95",
  date: "2026-06-14",
  version: "v2.95",
  conflictName: "美伊冲突",
  riskScore: 52,
  keyStats: [
    {
      label: "冲突天数",
      value: "D106",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $82–$85 · Brent $87–$89",
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
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "虽然美军报告拦截了伊朗的攻击无人机，这表明低烈度的敌对行动仍在发生，但双方为达成全面停火协议而取得的重大外交突破，已显著降低了发生大规模军事对抗的风险。冲突烈度从直接交火转向受控的零星摩擦。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运活动仍然几乎停滞，通行量远低于正常水平，物理中断的状况没有改变。然而，即将签署的和平协议草案中包含了立即全面重开海峡的条款，极大地改善了未来的预期，但当前风险依旧存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "随着美伊即将达成协议的消息传出，市场对中东原油供应中断的担忧迅速消退，导致油价承压大幅回落。WTI和Brent价格均显著下跌，进入温和区间，表明地缘政治风险溢价正在被挤出。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国在整个中东地区的军事存在，包括航母打击群和空军部署，没有发生变化，这构成了大国直接军事介入的基线。过去24小时内没有关于其他大国（如中国、俄罗斯）军事姿态改变的重大报道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "美伊谈判取得决定性突破。双方已就一份谅解备忘录的最终文本达成一致，并由美方高调宣布即将签署。伊朗官员亦向国际媒体证实了协议核心内容，标志着冲突正从实质性谈判阶段过渡到即将签署和平协议的阶段。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊接近签署和平协议，特朗普称最早于周日签署",
      description: "美国总统特朗普宣布，预计将在6月14日与伊朗签署一项协议以结束战争，协议将包括伊朗承诺不寻求核武器以及立即重开霍尔木兹海峡。巴基斯坦等调解方也证实协议已进入最后阶段。尽管伊朗方面对签署日期提出异议，但已向路透社证实了协议草案中的核心承诺，标志着冲突出现重大外交突破。",
      verification: "confirmed",
      timestamp: "2026-06-14T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "和平协议预期打压油价，布伦特与WTI双双走低",
      description: "对美伊可能达成停火协议的乐观情绪导致国际油价大幅下跌。多个财经信源报道，WTI原油价格跌至约82-85美元区间，布伦特原油价格跌至约87美元附近，反映出市场对霍尔木兹海峡即将重新开放、供应中断风险减弱的预期。",
      verification: "confirmed",
      timestamp: "2026-06-14T10:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗官员证实协议草案：放弃核武，境内稀释浓缩铀",
      description: "一名伊朗高级官员向路透社透露，根据与美国的谅解备忘录草案，德黑兰同意既不生产也不获取核武器。该协议将允许伊朗在其境内稀释其高浓缩铀库存，具体机制将在未来60天内讨论，这是谈判中的一个关键让步和进展。",
      verification: "confirmed",
      timestamp: "2026-06-14T09:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "美军在霍尔木兹海峡附近拦截伊朗攻击无人机",
      description: "美国中央司令部报告称，在各方为达成和平协议进行外交努力的同时，美军在霍尔木兹海峡附近击落了多架试图袭击商船的伊朗单向攻击无人机。此事件表明，尽管谈判取得进展，但局部军事摩擦风险依然存在。",
      verification: "confirmed",
      timestamp: "2026-06-13T23:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "以色列持续在黎巴嫩南部对真主党目标发动空袭",
      description: "尽管美伊之间的紧张局势有望缓解，但以色列军方表示，在过去24小时内，其对黎巴嫩南部的70多个真主党相关目标进行了打击。这表明区域代理冲突仍在继续，可能成为未来更广泛协议的复杂因素。",
      verification: "confirmed",
      timestamp: "2026-06-14T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方已就协议文本达成一致，进入等待正式签署阶段，冲突接近尾声。",
      "从高压下的秘密谈判转向公开宣布即将签署协议，核心矛盾（核问题、霍尔木兹）均被纳入框架。",
      "市场已开始交易（trade）冲突结束的预期。未来风险点从军事误判转向协议的顺利签署与执行细节。"
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
        "变化：虽然美军报告拦截了伊朗的攻击无人机，这表明低烈度的敌对行动仍在发生，但双方为达成全面停火协议而取得的重大外交突破，已显著降低了发生大规模军事对抗的风险。",
        "变化：冲突烈度从直接交火转向受控的零星摩擦。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的商业航运活动仍然几乎停滞，通行量远低于正常水平，物理中断的状况没有改变。",
        "变化：然而，即将签署的和平协议草案中包含了立即全面重开海峡的条款，极大地改善了未来的预期，但当前风险依旧存在。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：随着美伊即将达成协议的消息传出，市场对中东原油供应中断的担忧迅速消退，导致油价承压大幅回落。",
        "变化：WTI和Brent价格均显著下跌，进入温和区间，表明地缘政治风险溢价正在被挤出。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国在整个中东地区的军事存在，包括航母打击群和空军部署，没有发生变化，这构成了大国直接军事介入的基线。",
        "变化：过去24小时内没有关于其他大国（如中国、俄罗斯）军事姿态改变的重大报道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的核计划未来、经济制裁解除，以及美国对区域安全架构的主导权。",
      "协议签署后，双方国内强硬派的潜在阻力与协议执行的可靠性。"
    ],
    military: [
      "停火协议生效前，代理人武装（如真主党）的行动是否会引发新的局部冲突。",
      "美军在该地区的长期部署态势，以及伊朗如何回应其认为的“占领”。"
    ]
  },
  scoreTrend: [
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52,
      active: true
    }
  ],
  keyChange: "美伊就结束冲突的协议草案达成一致，并宣布即将签署，导致地缘风险预期大幅下降。",
  investmentSignal: "→ 减持能源相关头寸，增持受益于航运正常化与地缘风险溢价回落的风险资产。",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran nuclear talks news",
    "Strait of Hormuz shipping status",
    "US military movements Middle East",
    "WTI Brent crude oil price range June 14 2026",
    "oil price trends Reuters Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  reportId: "AION-USIR-2026-06-14-v2.95",
  date: "2026-06-14",
  version: "v2.95",
  conflictName: "US-Iran Conflict",
  riskScore: 52,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D106",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $82–$85 · Brent $87–$89",
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
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Although the US military reported intercepting Iranian attack drones, indicating low-intensity hostile actions are ongoing, a major diplomatic breakthrough to achieve a comprehensive ceasefire has significantly reduced the risk of large-scale military confrontation. The conflict's intensity has shifted from direct engagement to controlled, sporadic friction.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping through the Strait of Hormuz remains nearly at a standstill with traffic far below normal levels; the physical disruption has not changed. However, the draft peace agreement includes a clause for the immediate and full reopening of the strait, greatly improving future expectations, though current risks persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "As news of an imminent US-Iran deal emerged, market concerns over Middle East supply disruptions rapidly faded, leading to a sharp pullback in oil prices. Both WTI and Brent prices fell significantly into a moderate range, indicating the geopolitical risk premium is being priced out.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The United States' military presence across the Middle East, including carrier strike groups and air assets, remains unchanged, forming the baseline for direct great power military involvement. No significant reports on changes in the military posture of other great powers (e.g., China, Russia) in the last 24 hours.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "US-Iran negotiations have achieved a decisive breakthrough. Both sides have agreed on the final text of a memorandum of understanding, with the US publicly announcing its imminent signing. Iranian officials have also confirmed key elements of the deal to international media, signaling a transition from substantive talks to a forthcoming formal peace agreement.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran on Brink of Peace Deal, Trump Says Signing Expected Sunday",
      description: "US President Trump announced a deal to end the war with Iran is expected to be signed on June 14, which includes an Iranian commitment not to pursue nuclear weapons and to immediately reopen the Strait of Hormuz. Mediators like Pakistan also confirmed the deal is in its final stages. Despite Iran disputing the signing date, it has confirmed the draft's core commitments to Reuters, marking a major diplomatic breakthrough.",
      verification: "confirmed",
      timestamp: "2026-06-14T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Tumble on Peace Deal Expectations, Both Brent and WTI Lower",
      description: "Optimism over a potential US-Iran ceasefire agreement has caused a sharp decline in international oil prices. Multiple financial sources report WTI crude falling to the ~$82-85 range and Brent crude to around $87, reflecting market expectations of the Strait of Hormuz reopening and reduced supply disruption risk.",
      verification: "confirmed",
      timestamp: "2026-06-14T10:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Iranian Official Confirms Draft Deal: No Nuclear Weapons, Uranium to be Diluted in Iran",
      description: "A senior Iranian official told Reuters that under the draft memorandum of understanding with the US, Tehran agrees to neither produce nor acquire nuclear weapons. The deal would allow Iran to dilute its highly enriched uranium stockpile inside the country, with the mechanism to be discussed in the next 60 days, a key concession and progress in the talks.",
      verification: "confirmed",
      timestamp: "2026-06-14T09:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "US Forces Intercept Iranian Attack Drones Near Strait of Hormuz Amid Peace Talks",
      description: "US Central Command reported that, amid diplomatic efforts for a peace deal, its forces shot down multiple Iranian one-way attack drones attempting to strike commercial ships near the Strait of Hormuz. The incident shows that despite progress in negotiations, the risk of localized military friction remains.",
      verification: "confirmed",
      timestamp: "2026-06-13T23:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Israel Continues Airstrikes on Hezbollah Targets in Southern Lebanon",
      description: "Despite the easing of tensions between the US and Iran, the Israeli military stated that it had struck over 70 Hezbollah-linked sites in southern Lebanon in the past 24 hours. This indicates that regional proxy conflicts are ongoing and could complicate a broader agreement in the future.",
      verification: "confirmed",
      timestamp: "2026-06-14T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both parties have agreed on a draft text and are awaiting the formal signing, bringing the conflict near its end.",
      "The dynamic has shifted from secret, high-pressure talks to a public announcement of an imminent deal, with core issues (nuclear program, Hormuz) included in the framework.",
      "The market has begun to trade on the expectation of the conflict's conclusion. Future risks shift from military miscalculation to the smooth signing and implementation of the agreement."
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
        "Change: Although the US military reported intercepting Iranian attack drones, indicating low-intensity hostile actions are ongoing, a major diplomatic breakthr…",
        "Change: The conflict's intensity has shifted from direct engagement to controlled, sporadic friction."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping through the Strait of Hormuz remains nearly at a standstill with traffic far below normal levels; the physical disruption has not c…",
        "Change: However, the draft peace agreement includes a clause for the immediate and full reopening of the strait, greatly improving future expectations, though …"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: As news of an imminent US-Iran deal emerged, market concerns over Middle East supply disruptions rapidly faded, leading to a sharp pullback in oil pric…",
        "Change: Both WTI and Brent prices fell significantly into a moderate range, indicating the geopolitical risk premium is being priced out."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States' military presence across the Middle East, including carrier strike groups and air assets, remains unchanged, forming the baseline fo…",
        "Change: No significant reports on changes in the military posture of other great powers (e.g., China, Russia) in the last 24 hours."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The future of Iran's nuclear program, the lifting of economic sanctions, and US dominance over the regional security architecture.",
      "Potential resistance from domestic hardliners on both sides after the deal is signed and the reliability of its implementation."
    ],
    military: [
      "Whether actions by proxy forces (like Hezbollah) will trigger new localized conflicts before a ceasefire takes effect.",
      "The long-term US military posture in the region and how Iran will respond to what it considers an 'occupation'."
    ]
  },
  scoreTrend: [
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60
    },
    {
      date: "06-14",
      score: 52,
      active: true
    }
  ],
  keyChange: "The US and Iran have agreed on a draft deal to end the conflict and announced its imminent signing, leading to a sharp decline in geopolitical risk perception.",
  investmentSignal: "→ Reduce energy-related positions and increase holdings in risk assets that benefit from shipping normalization and the decline of geopolitical risk premium.",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: [
    "US Iran relations last 24 hours",
    "Iran nuclear talks news",
    "Strait of Hormuz shipping status",
    "US military movements Middle East",
    "WTI Brent crude oil price range June 14 2026",
    "oil price trends Reuters Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.95 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 52（↓8）：美伊就结束冲突的协议草案达成一致，并宣布即将签署，导致地缘风险预期大幅下降。",
    bannerWarning: "→ 减持能源相关头寸，增持受益于航运正常化与地缘风险溢价回落的风险资产。",
    deescalationIntent: "伊朗的核计划未来、经济制裁解除，以及美国对区域安全架构的主导权。",
    structuralRisk: "霍尔木兹海峡的商业航运活动仍然几乎停滞，通行量远低于正常水平，物理中断的状况没有改变。然而，即将签署的和平协议草案中包含了立即全面重开海峡的条款，极大地改善了未来的预期，但当前风险依旧存在。",
    contradictionNote: "伊朗的核计划未来、经济制裁解除，以及美国对区域安全架构的主导权。；停火协议生效前，代理人武装（如真主党）的行动是否会引发新的局部冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第106天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.95 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 52 (↓8): The US and Iran have agreed on a draft deal to end the conflict and announced its imminent signing, leading to a sharp decline in geopoliti…",
    bannerWarning: "→ Reduce energy-related positions and increase holdings in risk assets that benefit from shipping normalization and the…",
    deescalationIntent: "The future of Iran's nuclear program, the lifting of economic sanctions, and US…",
    structuralRisk: "Commercial shipping through the Strait of Hormuz remains nearly at a standstill with traffic far be…",
    contradictionNote: "The future of Iran's nuclear program, the lifting of economic sanctions, and US dominance over the regional security architecture.; Whether actions by proxy fo…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 106",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
