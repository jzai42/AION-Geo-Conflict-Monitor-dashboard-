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
  date: "2026-07-13",
  version: "v2.124",
  conflictDay: "D135",
  keyStats: [
    {
      label: "冲突天数",
      value: "D135",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $73–$75 · Brent $78–$80",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "事实性中断",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 84,
  prevRiskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "美伊之间的冲突在过去24小时内急剧升级为直接、大规模的军事对抗。美国对伊朗境内目标发动了多轮空袭，而伊朗则首次对多个邻国（包括巴林、科威特、阿曼、卡塔尔、约旦）的美军基地发动了报复性打击，标志着冲突地域范围和强度的显著扩大。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "尽管美国声称霍尔木兹海峡仍然开放，但伊朗已宣布关闭该水道。更重要的是，来自Kpler等独立第三方机构的船舶追踪数据显示，通过海峡的商业交通已降至冰点，仅有极少数船只通行，且多数关闭了自动识别系统（AIS），表明商业航运已事实性中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "美伊军事对抗的急剧升级和霍尔木兹海峡的航运中断风险，导致国际油价大幅跳涨超过4%。然而，从绝对价格水平来看，布伦特原油价格在78-80美元/桶区间，WTI原油在73-75美元/桶区间，仍处于温和紧张的范围，尚未突破85美元的关键心理和风险关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国武装力量正在直接参与对伊朗本土军事目标的大规模、持续性打击行动。美国中央司令部（CENTCOM）已发布官方声明，详细说明了其海空力量对伊朗境内防空、雷达、导弹及无人机能力的攻击，这属于直接的作战参与。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "随着双方展开大规模直接军事对抗，任何外交解决的前景都已破灭。伊朗外交部公开声明，美国的新一轮打击已使近期的外交努力“徒劳无功”，这明确表示谈判渠道已完全关闭，双方均无意通过对话降级局势。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01-20260713",
      title: "美伊爆发直接大规模军事对抗，伊朗袭击多国美军基地",
      description: "过去24-48小时内，美伊冲突急剧升级。美国中央司令部（CENTCOM）确认对伊朗境内数十个军事目标发动了多轮大规模空袭，旨在削弱其攻击航运的能力。作为报复，伊朗伊斯兰革命卫队（IRGC）宣布对多个邻国的美军设施发动了导弹和无人机袭击，包括巴林、科威特、阿曼、卡塔尔和约旦的美军基地。这标志着冲突从海上对抗扩展至区域性的直接军事交火。",
      verification: "confirmed",
      timestamp: "2026-07-13T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02-20260713",
      title: "霍尔木兹海峡航运基本中断，美伊各执一词",
      description: "伊朗宣布已关闭霍尔木兹海峡。美国总统与军方对此否认，称海峡依然开放。然而，据 Kpler 等独立船舶追踪数据显示，周日通过海峡的商业船只数量骤降至个位数，为五周来最低点。大量船只选择关闭应答器“摸黑”通过，或在海峡外积压等待，形成约2300艘船的拥堵。这表明商业航运已事实上面临中断。",
      verification: "confirmed",
      timestamp: "2026-07-13T09:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-03-20260713",
      title: "区域冲突升级推动油价飙升超4%",
      description: "由于美伊在霍尔木兹海峡及周边地区的军事行动急剧升级，市场对全球主要石油运输通道安全的担忧加剧，推动国际油价周一大幅上涨。布伦特原油期货上涨超4%，价格逼近80美元/桶；WTI原油期货同样上涨超4%，交易价格超过74美元/桶。",
      verification: "confirmed",
      timestamp: "2026-07-13T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-04-20260713",
      title: "外交渠道基本失效，伊朗称近期外交努力已“徒劳无功”",
      description: "随着美伊军事对抗的全面升级，脆弱的停火协议与外交努力已宣告失败。伊朗外交部发表声明称，美国最新的袭击使得过去数月旨在缓和局势的外交努力“徒劳无功”。这表明双方的沟通渠道已经中断，重回谈判桌的前景黯淡。",
      verification: "confirmed",
      timestamp: "2026-07-13T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-05-20260713",
      title: "美国中央司令部确认发动新一轮大规模打击",
      description: "美国中央司令部（CENTCOM）在官方声明中确认，美军于周日对伊朗发动了新一轮大规模进攻性打击，目标包括防空系统、海岸雷达站、导弹和无人机设施以及小型船只，旨在进一步削弱伊朗威胁国际航运的能力。此举确认了军事行动的持续性和强度。",
      verification: "confirmed",
      timestamp: "2026-07-13T05:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊之间的冲突在过去24小时内急剧升级为直接、大规模的军事对抗。美国对伊朗境内目标发动了多轮空袭，而伊朗则首次对多个邻国（包括巴林、科威特、阿曼、卡塔尔、约旦）的美军基地发动了报复性打击，标志着冲突地域范围和强度的显著扩大。"
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
        "变化：美伊之间的冲突在过去24小时内急剧升级为直接、大规模的军事对抗。",
        "变化：美国对伊朗境内目标发动了多轮空袭，而伊朗则首次对多个邻国（包括巴林、科威特、阿曼、卡塔尔、约旦）的美军基地发动了报复性打击，标志着冲突地域范围和强度的显著扩大。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：尽管美国声称霍尔木兹海峡仍然开放，但伊朗已宣布关闭该水道。",
        "变化：更重要的是，来自Kpler等独立第三方机构的船舶追踪数据显示，通过海峡的商业交通已降至冰点，仅有极少数船只通行，且多数关闭了自动识别系统（AIS），表明商业航运已事实性中断。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊军事对抗的急剧升级和霍尔木兹海峡的航运中断风险，导致国际油价大幅跳涨超过4%。",
        "变化：然而，从绝对价格水平来看，布伦特原油价格在78-80美元/桶区间，WTI原油在73-75美元/桶区间，仍处于温和紧张的范围，尚未突破85美元的关键心理和风险关口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国武装力量正在直接参与对伊朗本土军事目标的大规模、持续性打击行动。",
        "变化：美国中央司令部（CENTCOM）已发布官方声明，详细说明了其海空力量对伊朗境内防空、雷达、导弹及无人机能力的攻击，这属于直接的作战参与。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗放弃对霍尔木兹海峡的控制并恢复战前通行规则，而伊朗将控制海峡视为其核心战略筹码，双方在该问题上无妥协空间。",
      "临时停火协议的破产暴露了双方缺乏互信和政治意愿，强硬派在国内的影响力压倒了温和的外交努力。"
    ],
    military: [
      "美国试图通过“有限”但持续的军事打击来削弱伊朗的军事能力并迫使其让步，但这反而引发了伊朗更广泛、更直接的报复，导致局势螺旋升级。",
      "伊朗通过扩大打击范围至美国在多个盟国的基地，旨在提高美国的军事和政治成本，迫使其停止攻击，但这可能引发更大规模的区域战争。"
    ]
  },
  scoreTrend: [
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74
    },
    {
      date: "07-11",
      score: 72
    },
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84,
      active: true
    }
  ],
  keyChange: "冲突性质发生根本性转变，从受控对抗升级为全面的高强度直接军事冲突，战争外溢至多个中东国家，地缘风险达到新高。",
  investmentSignal: "→ 增持能源与大宗商品对冲，同时对风险资产采取最高级别防御姿态。",
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity July 13 2026",
    "Strait of Hormuz shipping status July 13 2026",
    "US CENTCOM Iran statement July 13 2026",
    "Iran proxy attacks Iraq Syria last 24 hours",
    "WTI Brent crude oil price today July 13 2026 Reuters",
    "Oil price analysis Bloomberg July 13 2026",
    "Iran nuclear talks update July 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-13",
  version: "v2.124",
  conflictDay: "D135",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D135",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $73–$75 · Brent $78–$80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "De Facto Blockade",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 84,
  prevRiskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "The conflict has sharply escalated into direct, large-scale military confrontation in the last 24 hours. The U.S. launched multiple waves of airstrikes on targets inside Iran, while Iran retaliated for the first time by attacking U.S. military bases in several neighboring countries (incl. Bahrain, Kuwait, Oman, Qatar, Jordan), marking a significant expansion in the conflict's geography and intensity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Although the U.S. claims the Strait of Hormuz remains open, Iran has announced its closure. More critically, ship-tracking data from independent sources like Kpler shows commercial traffic has plummeted to near-zero levels, with only a handful of vessels transiting, many with their AIS transponders off, indicating a de facto blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "The sharp escalation in military conflict and the disruption risk in the Strait of Hormuz caused international oil prices to jump by over 4%. However, in absolute terms, Brent crude is trading in the $78-80/bbl range and WTI in the $73-75/bbl range, which remains within a moderately tense bracket, not yet breaching the key psychological and risk level of $85.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. armed forces are directly engaged in large-scale, ongoing strike operations against military targets on Iranian soil. U.S. CENTCOM has issued official statements detailing attacks by its air and naval assets on Iranian air defense, radar, missile, and drone capabilities, which constitutes direct participation in combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "With both sides engaged in large-scale direct military confrontation, any prospect for a diplomatic solution has vanished. Iran's Foreign Ministry has publicly stated that the latest U.S. strikes have rendered recent diplomatic efforts 'futile,' a clear signal that negotiation channels are completely closed and neither side intends to de-escalate through dialogue.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01-20260713",
      title: "US and Iran Engage in Direct, Large-Scale Military Confrontation; Iran Strikes US Bases in Multiple Countries",
      description: "Over the past 24-48 hours, the US-Iran conflict has escalated dramatically. U.S. Central Command (CENTCOM) confirmed multiple large-scale airstrikes on dozens of military targets within Iran to degrade its ability to attack shipping. In retaliation, Iran's IRGC announced it launched missile and drone attacks on U.S. military facilities in several neighboring countries, including bases in Bahrain, Kuwait, Oman, Qatar, and Jordan. This marks an expansion of the conflict from maritime confrontation to regional, direct military exchange.",
      verification: "confirmed",
      timestamp: "2026-07-13T10:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02-20260713",
      title: "Shipping in Strait of Hormuz Virtually Halted Amid Conflicting Claims",
      description: "Iran announced it has closed the Strait of Hormuz, a claim denied by the U.S. President and military who insist it remains open. However, independent ship-tracking data from firms like Kpler shows commercial vessel transits plummeted to single digits on Sunday, a five-week low. A large number of vessels are either 'going dark' by turning off transponders or are backlogged outside the strait, with an estimated 2,300 ships waiting. This indicates commercial shipping is facing a de facto halt.",
      verification: "confirmed",
      timestamp: "2026-07-13T09:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-03-20260713",
      title: "Oil Prices Surge Over 4% as Regional Conflict Escalates",
      description: "Fears over the security of the world's main oil chokepoint intensified as the U.S. and Iran engaged in direct military action in and around the Strait of Hormuz, pushing oil prices sharply higher on Monday. Brent crude futures jumped over 4% to near $80 a barrel, while WTI crude futures also rose over 4% to trade above $74 a barrel.",
      verification: "confirmed",
      timestamp: "2026-07-13T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-04-20260713",
      title: "Diplomatic Channels Collapse, Iran Says Recent Efforts 'Futile'",
      description: "With the escalation to full-scale military confrontation, the fragile ceasefire and diplomatic efforts have failed. Iran's Foreign Ministry issued a statement declaring that the latest US attacks have 'rendered futile' all diplomatic efforts of recent months to de-escalate tensions. This signals that communication channels have closed and prospects for a return to talks are nonexistent.",
      verification: "confirmed",
      timestamp: "2026-07-13T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-05-20260713",
      title: "US CENTCOM Confirms New Wave of Large-Scale Strikes",
      description: "U.S. Central Command (CENTCOM) confirmed in an official statement that its forces conducted a new wave of offensive strikes against Iran on Sunday. The targets included air defense systems, coastal radar sites, missile and drone capabilities, and small boats, with the stated aim of further degrading Iran's ability to threaten international shipping. The announcement confirms the sustained intensity of the military campaign.",
      verification: "confirmed",
      timestamp: "2026-07-13T05:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict has sharply escalated into direct, large-scale military confrontation in the last 24 hours. The U.S. launched multiple waves of airstrikes on targets inside Iran, while Iran retaliated for the first time by attacking U.S. military bases in several neighboring countries (incl. Bahrain, Kuwait, Oman, Qatar, Jordan), marking a significant expansion in the conflict's geography and intensity."
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
        "Change: The conflict has sharply escalated into direct, large-scale military confrontation in the last 24 hours.",
        "Change: The U.S.",
        "Change: launched multiple waves of airstrikes on targets inside Iran, while Iran retaliated for the first time by attacking U.S."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Although the U.S.",
        "Change: claims the Strait of Hormuz remains open, Iran has announced its closure.",
        "Change: More critically, ship-tracking data from independent sources like Kpler shows commercial traffic has plummeted to near-zero levels, with only a handful…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The sharp escalation in military conflict and the disruption risk in the Strait of Hormuz caused international oil prices to jump by over 4%.",
        "Change: However, in absolute terms, Brent crude is trading in the $78-80/bbl range and WTI in the $73-75/bbl range, which remains within a moderately tense bra…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: U.S.",
        "Change: armed forces are directly engaged in large-scale, ongoing strike operations against military targets on Iranian soil.",
        "Change: U.S."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. demands Iran relinquish control over the Strait of Hormuz and restore pre-war transit norms, whereas Iran views its control as a core strategic asset, leaving no room for compromise.",
      "The collapse of the interim ceasefire agreement has exposed a profound lack of mutual trust and political will, with hardline factions' domestic influence overriding moderate diplomatic efforts."
    ],
    military: [
      "The U.S. attempts to degrade Iran's military capabilities and force concessions through 'limited' but sustained military strikes, but this has instead provoked broader, more direct retaliation from Iran, causing a spiral of escalation.",
      "Iran is aiming to increase the military and political costs for the U.S. by expanding its strikes to American bases in allied countries, hoping to deter further attacks, but this risks triggering a much larger regional war."
    ]
  },
  scoreTrend: [
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74
    },
    {
      date: "07-11",
      score: 72
    },
    {
      date: "07-12",
      score: 80
    },
    {
      date: "07-13",
      score: 84,
      active: true
    }
  ],
  keyChange: "The nature of the conflict has fundamentally shifted from a managed confrontation to a full-scale, high-intensity direct military conflict, with war spilling over into multiple Middle Eastern countries, pushing geopolitical risk to a new peak.",
  investmentSignal: "→ Increase holdings in energy and commodities as a hedge, while adopting a maximum defensive posture on risk assets.",
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity July 13 2026",
    "Strait of Hormuz shipping status July 13 2026",
    "US CENTCOM Iran statement July 13 2026",
    "Iran proxy attacks Iraq Syria last 24 hours",
    "WTI Brent crude oil price today July 13 2026 Reuters",
    "Oil price analysis Bloomberg July 13 2026",
    "Iran nuclear talks update July 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.124 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（↑4）：冲突性质发生根本性转变，从受控对抗升级为全面的高强度直接军事冲突，战争外溢至多个中东国家，地缘风险达到新高。",
    bannerWarning: "→ 增持能源与大宗商品对冲，同时对风险资产采取最高级别防御姿态。",
    deescalationIntent: "美国要求伊朗放弃对霍尔木兹海峡的控制并恢复战前通行规则，而伊朗将控制海峡视为其核心战略筹码，双方在该问题上无妥协空间。",
    structuralRisk: "尽管美国声称霍尔木兹海峡仍然开放，但伊朗已宣布关闭该水道。更重要的是，来自Kpler等独立第三方机构的船舶追踪数据显示，通过海峡的商业交通已降至冰点，仅有极少数船只通行，且多数关闭了自动识别系统（A…",
    contradictionNote: "美国要求伊朗放弃对霍尔木兹海峡的控制并恢复战前通行规则，而伊朗将控制海峡视为其核心战略筹码，双方在该问题上无妥协空间。；美国试图通过“有限”但持续的军事打击来削弱伊朗的军事能力并迫使其让步，但这反而引发了伊朗更广泛、更直接的报复，导致局势螺旋升级。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第135天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.124 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (↑4): The nature of the conflict has fundamentally shifted from a managed confrontation to a full-scale, high-intensity direct military conflict,…",
    bannerWarning: "→ Increase holdings in energy and commodities as a hedge, while adopting a maximum defensive posture on risk assets.",
    deescalationIntent: "The U.S. demands Iran relinquish control over the Strait of Hormuz and restore …",
    structuralRisk: "Although the U.S. claims the Strait of Hormuz remains open, Iran has announced its closure. More cr…",
    contradictionNote: "The U.S. demands Iran relinquish control over the Strait of Hormuz and restore pre-war transit norms, whereas Iran views its control as a core strategic asset,…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 135",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
