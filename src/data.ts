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
  date: "2026-06-29",
  version: "v2.110",
  keyStats: [
    {
      label: "冲突天数",
      value: "D121",
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
      value: "WTI $69–$71 · Brent $72–$73",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "部分受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 60,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "经过周末美国对伊朗目标进行报复性空袭以及伊朗对巴林和科威特境内美军设施进行反击后，局势极度紧张。然而，在过去24小时内，据多方报道，双方已达成暂停敌对行动的协议，这使得局势从活跃的直接交火状态暂时降级。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "周末期间，伊朗对商业船只发动袭击，导致通过海峡的航运交通量显著下降。尽管最新的停火协议据称包含允许船只自由通行的条款，但保险成本和船东的规避风险情绪依然存在，航道通行仍处于部分受限状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "由于市场对美伊达成停火并重启谈判的预期作出反应，对中东原油供应中断的担忧情绪大幅降温，导致国际油价回落。布伦特和WTI价格均已跌破75美元/桶的关口，进入较低风险区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国继续深度军事介入，通过其在该地区的军事基地和海军力量直接对伊朗境内目标实施了空袭。这表明大国不仅限于军事部署，而是直接参与作战行动。目前没有其他大国改变其介入姿态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "周末期间，伊朗曾威胁要“完全停止”谈判，使前景恶化至接近破裂。然而，最新的发展是双方同意暂停敌对并计划于6月30日举行会谈，这显著改善了谈判前景，从“停滞或破裂风险高”变为“渠道存在但进展有限”。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊同意暂停敌对行动，计划于6月30日重启谈判",
      description: "在周末激烈的军事交锋（包括美军空袭伊朗目标及伊朗袭击巴林、科威特的美军相关设施）后，一名美国官员向多家媒体证实，双方已同意暂停敌对行动，并计划于6月30日在多哈举行技术性会谈。该协议旨在挽救濒临破裂的临时和平协议。（来源：Reuters, Axios, CBS News）",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡航运在船只遇袭后放缓",
      description: "在周末一艘卡塔尔关联的油轮“Kiku”号和其他商业船只遭到袭击后，霍尔木兹海峡的商业航运交通量明显下降。周日的通行船只数量远低于上周达到的峰值。最新的停火协议据称将允许船只自由通行，但市场参与者仍持谨慎态度。（来源：Insurance Journal, Punch Newspapers）",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价因美伊紧张局势缓和而回落至75美元以下",
      description: "由于美国和伊朗同意暂停敌对行动并计划重启谈判，市场对中东供应中断的担忧有所缓解。布伦特原油价格回落至约72-73美元/桶区间，西德克萨斯中质原油价格则在70美元/桶附近，均低于冲突升级前的水平。（来源：Reuters, The National News）",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "美军在周末对伊朗境内多个目标发动“大规模”空袭",
      description: "美国中央司令部（CENTCOM）确认，为回应伊朗对商业航运的袭击，美军对伊朗境内多个军事目标发动了空袭，打击对象包括监视设施、通信系统、防空阵地、无人机仓库和布雷能力。一名美国官员称此次打击比之前的报复行动“规模更大”。（来源：CENTCOM, CBS News, Fox News）",
      verification: "confirmed",
      timestamp: "2026-06-28",
      significance: "",
      critical: true
    },
    {
      id: "EVT-05",
      title: "美国据报正评估调整其在海湾地区的军事部署",
      description: "据多家媒体及智库评估，由于伊朗近期的导弹和无人机袭击暴露了美国前沿部署基地的脆弱性，华盛顿正考虑将其部分军事存在向西转移，潜在地点包括以色列。此举旨在应对固定基地面临的日益增长的威胁。（来源：Dawn, Pakistan Observer）",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方在周末的直接军事对抗后迅速达成停火共识，表明均不希望冲突全面升级。",
      "谈判渠道被重新激活，并确定了具体时间地点，显示出外交努力仍在危机管控中起核心作用。",
      "根本矛盾（核问题、地区影响力）未解决，霍尔木兹航行规则仍是导火索，使得当前的稳定状态极为脆弱，随时可能因新的摩擦而重陷危机。"
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
        "变化：经过周末美国对伊朗目标进行报复性空袭以及伊朗对巴林和科威特境内美军设施进行反击后，局势极度紧张。",
        "变化：然而，在过去24小时内，据多方报道，双方已达成暂停敌对行动的协议，这使得局势从活跃的直接交火状态暂时降级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：周末期间，伊朗对商业船只发动袭击，导致通过海峡的航运交通量显著下降。",
        "变化：尽管最新的停火协议据称包含允许船只自由通行的条款，但保险成本和船东的规避风险情绪依然存在，航道通行仍处于部分受限状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于市场对美伊达成停火并重启谈判的预期作出反应，对中东原油供应中断的担忧情绪大幅降温，导致国际油价回落。",
        "变化：布伦特和WTI价格均已跌破75美元/桶的关口，进入较低风险区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国继续深度军事介入，通过其在该地区的军事基地和海军力量直接对伊朗境内目标实施了空袭。",
        "变化：这表明大国不仅限于军事部署，而是直接参与作战行动。",
        "变化：目前没有其他大国改变其介入姿态。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国及盟友寻求限制伊朗核能力和地区影响力，而伊朗则力图通过军事和外交手段打破制裁，确立其在海湾地区的安全主导权。",
      "临时和平协议的执行细节（尤其是霍尔木兹通行权）存在根本分歧，成为引爆新一轮冲突的直接原因。"
    ],
    military: [
      "美国寻求通过精确打击和军事威慑来惩罚伊朗的“侵略行为”，并保护国际航运，但其前沿部署的基地易受攻击。",
      "伊朗利用其非对称能力（无人机、导弹、代理人网络）挑战美国的军事优势，旨在提高美国军事干预的成本和风险。"
    ]
  },
  scoreTrend: [
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
      score: 68
    },
    {
      date: "06-29",
      score: 60,
      active: true
    }
  ],
  keyChange: "美伊在周末发生直接军事冲突后，迅速达成暂停敌对行动并重启谈判的共识，市场风险偏好随之修复，油价下跌，冲突综合分从高位回落。",
  investmentSignal: "→ 风险资产短期压力缓解，可适度减持能源及大宗商品的多头对冲部位。",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "CENTCOM Iran update June 29 2026",
    "Strait of Hormuz shipping status June 29 2026",
    "Iran proxy attacks Iraq Syria June 29 2026",
    "US military posture Persian Gulf June 2026",
    "WTI Brent crude oil price June 29 2026 Reuters",
    "Oil price forecast June 2026 Bloomberg",
    "Iran nuclear deal talks latest news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-29",
  version: "v2.110",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D121",
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
      value: "WTI $69–$71 · Brent $72–$73",
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
  riskScore: 60,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "After a weekend of retaliatory U.S. airstrikes on Iranian targets and Iranian counter-strikes on U.S. facilities in Bahrain and Kuwait, tensions were extremely high. However, within the last 24 hours, both sides have reportedly agreed to a pause in hostilities, de-escalating the situation from active direct fire.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Iranian attacks on commercial vessels over the weekend led to a significant drop in shipping traffic through the strait. Although the latest ceasefire agreement reportedly includes provisions for free passage, insurance costs and risk aversion among shipowners remain, keeping transit partially restricted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "Fears of a major supply disruption from the Middle East have cooled as the market reacts to the U.S.-Iran agreement to halt hostilities and resume talks. Both Brent and WTI prices have fallen below the $75/barrel threshold, moving into a lower risk category.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States remains deeply involved militarily, having conducted direct airstrikes on Iranian territory from its assets in the region. This demonstrates that a great power is not just deployed but is directly participating in combat operations. No other major powers have altered their involvement posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Over the weekend, prospects worsened to near-collapse with Iran threatening a \"complete halt\" to talks. However, the latest development is an agreement to pause hostilities and hold talks on June 30, significantly improving the outlook from \"stalled/high risk of collapse\" to \"channels exist but progress is limited.\"",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US and Iran Agree to Halt Hostilities, Plan to Resume Talks on June 30",
      description: "Following a weekend of intense military exchanges, including U.S. airstrikes on Iranian targets and Iranian attacks on U.S.-related facilities in Bahrain and Kuwait, a U.S. official confirmed to multiple media outlets that both sides have agreed to halt hostilities. They plan to hold technical talks in Doha on June 30 to salvage the fragile interim peace deal. (Sources: Reuters, Axios, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Shipping Traffic Slows After Vessel Attacks",
      description: "Commercial shipping traffic through the Strait of Hormuz declined significantly after a Qatar-linked oil tanker, the 'Kiku', and other vessels were attacked over the weekend. Sunday's transit numbers were well below the peak levels reached last week. The latest ceasefire agreement will reportedly allow for free passage, but market participants remain cautious. (Sources: Insurance Journal, Punch Newspapers)",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Prices Fall Below $75 as US-Iran Tensions Ease",
      description: "Concerns over Middle East supply disruptions have eased as the U.S. and Iran agreed to halt hostilities and plan to restart negotiations. Brent crude prices fell back to the $72-73/bbl range, while WTI traded around $70/bbl, both below pre-escalation levels. (Sources: Reuters, The National News)",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "US Launched 'Larger' Airstrikes on Multiple Targets in Iran Over Weekend",
      description: "U.S. Central Command (CENTCOM) confirmed it conducted airstrikes against multiple Iranian military targets in response to attacks on commercial shipping. Targets included surveillance infrastructure, communication systems, air defense sites, drone storage, and minelaying capabilities. A U.S. official described the strikes as 'larger' than previous retaliations. (Sources: CENTCOM, CBS News, Fox News)",
      verification: "confirmed",
      timestamp: "2026-06-28",
      significance: "",
      critical: true
    },
    {
      id: "EVT-05",
      title: "US Reportedly Reassessing Military Posture in the Gulf",
      description: "According to media and think tank assessments, Washington is considering shifting parts of its military presence westward, potentially to Israel, due to vulnerabilities at forward-deployed bases exposed by recent Iranian missile and drone attacks. The move aims to counter the growing threat to fixed installations. (Sources: Dawn, Pakistan Observer)",
      verification: "confirmed",
      timestamp: "2026-06-29",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The swift consensus to cease fire after direct military exchanges indicates neither side desires a full-scale escalation.",
      "The reactivation of negotiation channels with a specific date and location shows that diplomatic efforts remain central to crisis management.",
      "Fundamental contradictions (nuclear program, regional influence) are unresolved, and rules for Hormuz transit remain a flashpoint, making the current stability extremely fragile and prone to relapse into crisis."
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
        "Change: After a weekend of retaliatory U.S.",
        "Change: airstrikes on Iranian targets and Iranian counter-strikes on U.S.",
        "Change: facilities in Bahrain and Kuwait, tensions were extremely high."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian attacks on commercial vessels over the weekend led to a significant drop in shipping traffic through the strait.",
        "Change: Although the latest ceasefire agreement reportedly includes provisions for free passage, insurance costs and risk aversion among shipowners remain, kee…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Fears of a major supply disruption from the Middle East have cooled as the market reacts to the U.S.-Iran agreement to halt hostilities and resume talk…",
        "Change: Both Brent and WTI prices have fallen below the $75/barrel threshold, moving into a lower risk category."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States remains deeply involved militarily, having conducted direct airstrikes on Iranian territory from its assets in the region.",
        "Change: This demonstrates that a great power is not just deployed but is directly participating in combat operations.",
        "Change: No other major powers have altered their involvement posture."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. and its allies seek to contain Iran's nuclear capabilities and regional influence, while Iran aims to break sanctions and establish its security dominance in the Gulf through military and diplomatic means.",
      "Fundamental disagreements over the implementation of the interim peace deal, especially regarding transit rights in the Strait of Hormuz, are the immediate trigger for renewed conflict."
    ],
    military: [
      "The U.S. seeks to deter and punish Iranian 'aggression' and protect international shipping through precision strikes and military deterrence, but its forward-deployed bases are vulnerable to attack.",
      "Iran leverages its asymmetric capabilities (drones, missiles, proxy networks) to challenge U.S. military superiority, aiming to raise the costs and risks of American intervention."
    ]
  },
  scoreTrend: [
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
      score: 68
    },
    {
      date: "06-29",
      score: 60,
      active: true
    }
  ],
  keyChange: "Following direct military clashes over the weekend, the U.S. and Iran quickly agreed to pause hostilities and resume negotiations, leading to a recovery in market risk appetite, a drop in oil prices, and a decline in the composite conflict score from its recent high.",
  investmentSignal: "→ Short-term pressure on risk assets is easing; consider moderately reducing long hedge positions in energy and commodities.",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "CENTCOM Iran update June 29 2026",
    "Strait of Hormuz shipping status June 29 2026",
    "Iran proxy attacks Iraq Syria June 29 2026",
    "US military posture Persian Gulf June 2026",
    "WTI Brent crude oil price June 29 2026 Reuters",
    "Oil price forecast June 2026 Bloomberg",
    "Iran nuclear deal talks latest news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.110 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↓8）：美伊在周末发生直接军事冲突后，迅速达成暂停敌对行动并重启谈判的共识，市场风险偏好随之修复，油价下跌，冲突综合分从高位回落。",
    bannerWarning: "→ 风险资产短期压力缓解，可适度减持能源及大宗商品的多头对冲部位。",
    deescalationIntent: "美国及盟友寻求限制伊朗核能力和地区影响力，而伊朗则力图通过军事和外交手段打破制裁，确立其在海湾地区的安全主导权。",
    structuralRisk: "周末期间，伊朗对商业船只发动袭击，导致通过海峡的航运交通量显著下降。尽管最新的停火协议据称包含允许船只自由通行的条款，但保险成本和船东的规避风险情绪依然存在，航道通行仍处于部分受限状态。",
    contradictionNote: "美国及盟友寻求限制伊朗核能力和地区影响力，而伊朗则力图通过军事和外交手段打破制裁，确立其在海湾地区的安全主导权。；美国寻求通过精确打击和军事威慑来惩罚伊朗的“侵略行为”，并保护国际航运，但其前沿部署的基地易受攻击。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第121天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.110 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↓8): Following direct military clashes over the weekend, the U.S. and Iran quickly agreed to pause hostilities and resume negotiations, leading …",
    bannerWarning: "→ Short-term pressure on risk assets is easing; consider moderately reducing long hedge positions in energy and commodi…",
    deescalationIntent: "The U.S. and its allies seek to contain Iran's nuclear capabilities and regiona…",
    structuralRisk: "Iranian attacks on commercial vessels over the weekend led to a significant drop in shipping traffi…",
    contradictionNote: "The U.S. and its allies seek to contain Iran's nuclear capabilities and regional influence, while Iran aims to break sanctions and establish its security domin…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 121",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
