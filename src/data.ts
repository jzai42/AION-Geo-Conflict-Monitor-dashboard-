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
  date: "2026-05-28",
  version: "v2.78",
  keyStats: [
    {
      label: "冲突天数",
      value: "D89",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑24",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $91–$92 · Brent $96–$98",
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
      prev: 3,
      weight: 0.2,
      description: "双方在霍尔木兹海峡附近发生直接、有限的军事交火，打破了此前的停火状态，局势骤然紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "直接的军事冲突使得本已脆弱的航运状况雪上加霜，商业航运接近停摆，风险溢价飙升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "对供应中断的担忧重燃，推动油价大幅上涨，布伦特原油价格已进入显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事力量直接参与对伊朗境内目标的攻击行动，标志着其介入程度从部署威慑升级为直接参与战斗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "直接的军事对抗和双方领导层的强硬表态，已导致此前脆弱的谈判渠道基本中断，停火协议面临破裂。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  events: [
    {
      id: "event_01_20260528",
      title: "美伊爆发直接军事冲突，双方互指对方破坏停火",
      description: "美国军方确认在霍尔木兹海峡附近对伊朗境内目标发动了“自卫性”打击，摧毁了一个无人机地面控制站并击落四架无人机。伊朗革命卫队随后宣布对一个美军基地发动了报复性打击。该事件标志着自4月停火以来最严重的军事升级。",
      verification: "confirmed",
      timestamp: "2026-05-28T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event_02_20260528",
      title: "霍尔木兹海峡航运在军事冲突下接近停滞",
      description: "受美伊直接军事对抗影响，霍尔木兹海峡的商业航运已降至最低水平。据货运代理公司Flexport报告，仅有极少数船只在关闭AIS系统的情况下通过，航道处于事实上的严重受限状态。军事行动直接针对航运威胁，进一步恶化了通行安全。",
      verification: "confirmed",
      timestamp: "2026-05-28T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event_03_20260528",
      title: "油价因美伊冲突加剧而飙升，布伦特原油逼近100美元",
      description: "地缘政治风险急剧升温，推动国际油价大幅上涨。布伦特原油价格飙升超过3%，交易价格在96-97美元区间，西德克萨斯中质原油（WTI）也跃升至91美元以上。市场担忧冲突扩大将导致全球主要能源通道长期中断。",
      verification: "confirmed",
      timestamp: "2026-05-28T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event_04_20260528",
      title: "美国对伊朗新设的海峡管理机构实施制裁",
      description: "在美国发动军事打击的同时，美国财政部宣布对伊朗新成立的“波斯湾海峡管理局”实施制裁。华盛顿指责该机构与伊斯兰革命卫队有关，旨在通过对过往船只“敲诈勒索”来创收。",
      verification: "partial",
      timestamp: "2026-05-27T22:00:00Z",
      significance: ""
    },
    {
      id: "event_05_20260528",
      title: "外交渠道因军事升级面临破裂",
      description: "尽管此前有关于停火协议的谈判在进行，但最新的军事交火使外交努力遭遇重挫。美国总统特朗普表示对谈判现状“不满意”，并威胁可能需要“完成工作”，而伊朗方面则谴责美方行动破坏停火，导致谈判前景黯淡。",
      verification: "confirmed",
      timestamp: "2026-05-28T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方打破脆弱停火，进入直接军事打击与报复循环，局势迅速恶化。",
      "霍尔木兹海峡成为直接冲突区域，全球能源供应面临的实际威胁达到冲突爆发以来最高水平。",
      "外交谈判渠道因军事行动而中断，双方立场急剧硬化，短期内和平解决的可能性微乎其微。"
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
        "变化：美国对伊朗境内无人机控制站发动打击，伊朗革命卫队随即宣布对美军基地进行报复。",
        "变化：冲突模式从代理人、威慑和骚扰，转变为国家力量之间的直接军事交火。",
        "延续：美军在该区域维持着包括航母战斗群在内的大规模军事存在，并处于高度戒备状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡通行状态从“严重受限”恶化至接近停滞，直接的军事行动使保险成本和物理风险飙升。",
        "延续：国际航运公司普遍暂停或重新规划航线以规避波斯湾和阿曼湾。",
        "变化：美国对伊朗新设的“波斯湾海峡管理局”进行制裁，旨在打击其控制航道收取费用的企图。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油价格因直接冲突消息飙升至97美元附近，WTI原油突破91美元。",
        "变化：市场情绪由对谈判的审慎乐观彻底转为对供应中断的恐慌。",
        "延续：全球能源市场对任何来自中东的负面消息都极为敏感，价格波动性显著增加。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊双方均发表强硬声明，相互指责对方是局势升级的责任方。",
        "变化：美国总统特朗普公开表示对谈判进展不满，暗示可能采取更强硬行动，削弱了外交解决的希望。",
        "延续：双方国内的强硬派声音因局势升级而获得更大影响力，进一步压缩了温和派的外交空间。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限施压迫使伊朗让步，而伊朗则坚持维护其地区影响力和主权，拒绝屈服，导致双方在核心利益上无法调和。",
      "国际社会在如何解决冲突问题上存在分歧，缺乏有效的第三方调解机制来约束双方的升级行为。"
    ],
    military: [
      "美国在该地区拥有绝对的常规军事优势，但伊朗利用其非对称能力（无人机、快艇、代理人网络）对美军及地区航运构成持续威胁。",
      "双方都在进行“边缘试探”，试图在不引发全面战争的前提下最大限度地打击对方，但这极易因误判而导致冲突失控。"
    ]
  },
  scoreTrend: [
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
      score: 48
    },
    {
      date: "05-28",
      score: 72,
      active: true
    }
  ],
  keyChange: "美伊爆发直接军事冲突，停火破裂，风险急剧升级。",
  investmentSignal: "→ 风险急剧升高，建议大幅减持风险资产，增持能源、大宗商品及黄金等避险资产进行对冲。",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping news",
    "WTI Brent crude oil price May 28 2026",
    "US military activity Persian Gulf",
    "Iran military news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-28",
  version: "v2.78",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D89",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑24",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $91–$92 · Brent $96–$98",
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
      prev: 3,
      weight: 0.2,
      description: "The two sides engaged in direct, limited military fire exchanges near the Strait of Hormuz, shattering the previous ceasefire and escalating tensions abruptly.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct military conflict has exacerbated the already fragile shipping situation, bringing commercial traffic to a near-standstill and causing risk premiums to soar.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Fears of supply disruption have been reignited, pushing oil prices sharply higher, with Brent crude entering a significantly strong price range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. military forces were directly involved in offensive actions against targets within Iran, marking an escalation from deployment and deterrence to direct combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct military confrontation and harsh rhetoric from both leaderships have effectively stalled the fragile negotiation channels, placing the ceasefire at high risk of collapse.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 72,
  events: [
    {
      id: "event_01_20260528",
      title: "US and Iran Engage in Direct Military Conflict, Blame Each Other for Breaking Ceasefire",
      description: "The U.S. military confirmed it conducted 'self-defense' strikes against a target in Iran near the Strait of Hormuz, destroying a drone ground control station and downing four drones. Iran's Revolutionary Guards subsequently announced a retaliatory strike on a U.S. military base. The incident marks the most serious military escalation since the April ceasefire.",
      verification: "confirmed",
      timestamp: "2026-05-28T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event_02_20260528",
      title: "Shipping in Strait of Hormuz Nears Standstill Amid Military Conflict",
      description: "As a result of the direct U.S.-Iran military confrontation, commercial shipping in the Strait of Hormuz has dwindled to minimal levels. According to freight forwarder Flexport, only a very small number of vessels have passed with their AIS systems turned off, indicating the strait is under a de facto severe restriction. The military actions were aimed directly at maritime threats, further deteriorating transit safety.",
      verification: "confirmed",
      timestamp: "2026-05-28T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event_03_20260528",
      title: "Oil Prices Spike as US-Iran Conflict Intensifies, Brent Nears $100",
      description: "A sharp increase in geopolitical risk has driven international oil prices significantly higher. Brent crude surged over 3% to trade in the $96-97 range, while West Texas Intermediate (WTI) also jumped above $91. Markets fear that an expanding conflict could lead to a prolonged disruption of the world's main energy chokepoint.",
      verification: "confirmed",
      timestamp: "2026-05-28T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event_04_20260528",
      title: "US Sanctions Iran's New Strait Management Authority",
      description: "Concurrent with its military strikes, the U.S. Treasury Department announced sanctions on Iran's newly created 'Persian Gulf Strait Authority.' Washington alleges the entity is linked to the IRGC and aims to generate revenue by 'extorting vessels' transiting the waterway.",
      verification: "partial",
      timestamp: "2026-05-27T22:00:00Z",
      significance: ""
    },
    {
      id: "event_05_20260528",
      title: "Diplomatic Channels on Verge of Collapse Due to Military Escalation",
      description: "Despite ongoing negotiations for a ceasefire agreement, the latest military exchange has dealt a severe blow to diplomatic efforts. U.S. President Trump stated he was 'not satisfied' with the talks and threatened to 'finish the job,' while Iran condemned the U.S. action for undermining the truce, dimming prospects for a peaceful resolution.",
      verification: "confirmed",
      timestamp: "2026-05-28T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The U.S. and Iran have broken the fragile ceasefire, entering a cycle of direct military strikes and retaliation, leading to a rapid deterioration of the situation.",
      "The Strait of Hormuz has become a direct conflict zone, with the actual threat to global energy supplies reaching its highest point since the conflict began.",
      "Diplomatic channels have been severed by military action, and both sides' positions have hardened dramatically, making a peaceful resolution in the short term highly unlikely."
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
        "Change: The U.S. launched a strike on an Iranian drone control station, and the IRGC immediately announced retaliation against a U.S. base.",
        "Change: The conflict model has shifted from proxies, deterrence, and harassment to direct military fire between state actors.",
        "Continue: The U.S. maintains a massive military presence in the region, including carrier strike groups, and is on high alert."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The strait's transit status has worsened from 'Severely Restricted' to a near-standstill as direct military action causes insurance costs and physical …",
        "Continue: International shipping lines are widely suspending or rerouting voyages to avoid the Persian Gulf and the Gulf of Oman.",
        "Change: The U.S. has sanctioned Iran's new 'Persian Gulf Strait Authority' to counter its attempts to control the waterway and levy fees."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude prices spiked to near $97 and WTI crude surpassed $91 on news of the direct conflict.",
        "Change: Market sentiment has completely shifted from cautious optimism about negotiations to panic over a supply disruption.",
        "Continue: The global energy market remains extremely sensitive to any negative news from the Middle East, with price volatility increasing significantly."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Both the U.S. and Iran have issued harsh statements, blaming each other for the escalation.",
        "Change: U.S. President Trump publicly expressed dissatisfaction with negotiation progress, hinting at tougher actions and diminishing hopes for a diplomatic so…",
        "Continue: Hardline voices within both countries are gaining influence due to the escalation, further shrinking the diplomatic space for moderates."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to force Iranian concessions through maximum pressure, while Iran insists on defending its regional influence and sovereignty, refusing to capitulate, leading to an irreconcilable conflict of core interests.",
      "The international community is divided on how to resolve the conflict, lacking an effective third-party mediation mechanism to restrain the escalatory actions of both sides."
    ],
    military: [
      "The U.S. holds absolute conventional military superiority in the region, but Iran leverages its asymmetric capabilities (drones, fast boats, proxy networks) to pose a persistent threat to U.S. forces and regional shipping.",
      "Both sides are engaged in brinkmanship, trying to inflict maximum damage on the other without triggering a full-scale war, which creates a high risk of miscalculation leading to an uncontrolled conflict."
    ]
  },
  scoreTrend: [
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
      score: 48
    },
    {
      date: "05-28",
      score: 72,
      active: true
    }
  ],
  keyChange: "US and Iran engaged in direct military conflict, shattering ceasefire and causing a sharp escalation in risk.",
  investmentSignal: "→ Risk has spiked dramatically; recommend significantly reducing risk assets and increasing holdings in energy, commodities, and gold as a hedge.",
  prevRiskScore: 48,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping news",
    "WTI Brent crude oil price May 28 2026",
    "US military activity Persian Gulf",
    "Iran military news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.78 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑24）：美伊爆发直接军事冲突，停火破裂，风险急剧升级。",
    bannerWarning: "→ 风险急剧升高，建议大幅减持风险资产，增持能源、大宗商品及黄金等避险资产进行对冲。",
    deescalationIntent: "美国寻求通过极限施压迫使伊朗让步，而伊朗则坚持维护其地区影响力和主权，拒绝屈服，导致双方在核心利益上无法调和。",
    structuralRisk: "直接的军事冲突使得本已脆弱的航运状况雪上加霜，商业航运接近停摆，风险溢价飙升。",
    contradictionNote: "美国寻求通过极限施压迫使伊朗让步，而伊朗则坚持维护其地区影响力和主权，拒绝屈服，导致双方在核心利益上无法调和。；美国在该地区拥有绝对的常规军事优势，但伊朗利用其非对称能力（无人机、快艇、代理人网络）对美军及地区航运构成持续威胁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第89天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.78 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑24): US and Iran engaged in direct military conflict, shattering ceasefire and causing a sharp escalation in risk.",
    bannerWarning: "→ Risk has spiked dramatically; recommend significantly reducing risk assets and increasing holdings in energy, commodi…",
    deescalationIntent: "The U.S. seeks to force Iranian concessions through maximum pressure, while Ira…",
    structuralRisk: "Direct military conflict has exacerbated the already fragile shipping situation, bringing commercia…",
    contradictionNote: "The U.S. seeks to force Iranian concessions through maximum pressure, while Iran insists on defending its regional influence and sovereignty, refusing to capit…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 89",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
