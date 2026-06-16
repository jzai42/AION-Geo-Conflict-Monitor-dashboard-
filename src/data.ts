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
  date: "2026-06-16",
  version: "v2.97",
  keyStats: [
    {
      label: "冲突天数",
      value: "D108",
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
      value: "WTI $77–$80 · Brent $79–$83",
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
  riskScore: 44,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "双方根据谅解备忘录维持停火状态，无直接军事冲突报告。然而，美国明确表示将在未来60天谈判期间维持其在中东的全部军事力量，包括两个航母战斗群，作为对伊朗的威慑和施压手段。这使得局势处于一种有条件的、受监控的平静状态，而非结构性降级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美伊谅解备忘录的核心内容之一是重开霍尔木兹海峡。伊朗官方媒体已宣布航运恢复，但多个独立航运追踪平台和行业媒体（如Argus Media）证实，截至6月16日，商业船只的实际通行量仍然极低，大多数船东在等待周五协议正式签署和更明确的安全保证前选择观望。现状是外交上已放行，但物理上仍受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "随着美伊达成结束冲突的初步协议，市场对中东原油供应中断的担忧大幅缓解，导致油价连续下跌。价格已回落至三个月来的低点，WTI和布伦特原油期货均在75-85美元/桶的区间内交易，反映出地缘政治风险溢价的快速消退。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "冲突双方美国和伊朗已从军事对抗正式转向外交谈判轨道，并计划签署谅解备忘录。G7集团等多方对此表示欢迎并密切关注。大国的介入方式已从军事威慑转变为以外交声明、斡旋和监督协议执行为主，符合“发表声明/制裁调整”的评级水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "双方就谅解备忘录达成一致，并确定了正式签署日期和后续60天的谈判时间表，这是自冲突爆发以来最实质性的外交突破。然而，双方对协议条款（尤其是涉及以色列在黎巴嫩的角色）的公开解读存在严重分歧，为谈判前景埋下重大隐患，因此前景虽有改善但仍脆弱。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "美伊达成谅解备忘录，将于周五签署并开启60天核谈判",
      description: "美国与伊朗已就一份旨在结束冲突的谅解备忘录（MOU）达成一致，内容包括停火、重开霍尔木兹海峡及启动为期60天的核问题谈判。美国总统特朗普称协议将进入“第二阶段”，正式签署仪式定于6月19日在瑞士日内瓦举行。",
      verification: "confirmed",
      timestamp: "2026-06-16T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_2",
      title: "霍尔木兹海峡实际通行仍停滞，市场等待协议正式签署",
      description: "尽管伊朗国家媒体声称油轮已恢复航运，但独立AIS船舶追踪数据显示，霍尔木兹海峡的商业交通在6月16日基本仍处于停滞状态。行业机构指出，船东在协议于周五正式签署前仍持谨慎态度，且水雷威胁仍是关切点。",
      verification: "confirmed",
      timestamp: "2026-06-16T10:00:00Z",
      significance: ""
    },
    {
      id: "evt_3",
      title: "美国申明在谈判期间将维持在中东的军事部署",
      description: "美国政府高级官员表示，在谅解备忘录签署后为期60天的谈判期间，美国将维持其在中东的“当前军力态势”，包括超过5万名士兵和两个航母战斗群。此举旨在确保伊朗遵守承诺，并保留军事选项。",
      verification: "confirmed",
      timestamp: "2026-06-15T22:00:00Z",
      significance: ""
    },
    {
      id: "evt_4",
      title: "伊朗称协议包含以色列从黎巴嫩撤军，引发争议",
      description: "伊朗外交部长阿巴斯·阿拉格希公开表示，与美国达成的协议包含要求以色列军队从黎巴嫩南部撤出。然而，以色列官员已明确表示，“特朗普的协议不约束我们”，并计划继续驻留。这一分歧为协议的顺利执行增添了重大不确定性。",
      verification: "confirmed",
      timestamp: "2026-06-16T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_5",
      title: "油价因中东局势缓和预期而承压，跌至三个月低点",
      description: "受美伊达成协议、霍尔木兹海峡有望重开的预期影响，国际油价显著回落。截至6月16日，WTI原油期货价格跌至约77-80美元区间，布伦特原油期货价格跌至约80-82美元区间，市场正在消化地缘政治风险溢价的消退。",
      verification: "confirmed",
      timestamp: "2026-06-16T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方已确认谅解备忘录（MOU），将正式签署并进入为期60天的谈判期，标志着冲突从军事对抗转向外交解决轨道。",
      "核心争议点，如伊朗核计划的未来和制裁解除的范围，被推迟到后续谈判中，当前协议主要解决了停火和航道重开的燃眉之急。",
      "双方对协议条款存在公开的矛盾解读（尤其在黎巴嫩问题上），且美方维持大规模军事部署作为谈判后盾，表明当前的外交窗口期基础脆弱，存在破裂风险。"
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
        "变化：双方根据谅解备忘录维持停火状态，无直接军事冲突报告。",
        "变化：然而，美国明确表示将在未来60天谈判期间维持其在中东的全部军事力量，包括两个航母战斗群，作为对伊朗的威慑和施压手段。",
        "变化：这使得局势处于一种有条件的、受监控的平静状态，而非结构性降级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊谅解备忘录的核心内容之一是重开霍尔木兹海峡。",
        "变化：伊朗官方媒体已宣布航运恢复，但多个独立航运追踪平台和行业媒体（如Argus Media）证实，截至6月16日，商业船只的实际通行量仍然极低，大多数船东在等待周五协议正式签署和更明确的安全保证前选择观望。",
        "变化：现状是外交上已放行，但物理上仍受限。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：随着美伊达成结束冲突的初步协议，市场对中东原油供应中断的担忧大幅缓解，导致油价连续下跌。",
        "变化：价格已回落至三个月来的低点，WTI和布伦特原油期货均在75-85美元/桶的区间内交易，反映出地缘政治风险溢价的快速消退。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：冲突双方美国和伊朗已从军事对抗正式转向外交谈判轨道，并计划签署谅解备忘录。",
        "变化：G7集团等多方对此表示欢迎并密切关注。",
        "变化：大国的介入方式已从军事威慑转变为以外交声明、斡旋和监督协议执行为主，符合“发表声明/制裁调整”的评级水平。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过一个有时限的、可验证的协议来限制伊朗核能力，而伊朗则力图以最小的核能力让步换取最大程度的经济制裁解除和区域地位承认。",
      "协议细节模糊，尤其在对第三方（如以色列在黎巴嫩的行动）的约束力上存在严重分歧，可能成为谈判破裂的导火索。"
    ],
    military: [
      "美国维持前沿军事部署以确保“极限施压”的有效性，而伊朗则将美军存在视为其国家安全和地区影响力的根本威胁。"
    ]
  },
  scoreTrend: [
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
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44,
      active: true
    }
  ],
  keyChange: "综合风险分维持在近期低点，反映了市场对已达成的美伊谅解备忘录（MOU）的确认，但对霍尔木兹海峡实际通行恢复的延迟和协议条款的争议（如黎巴嫩问题）保持谨慎。",
  investmentSignal: "→ 风险已阶段性释放，建议减持战争风险对冲头寸，但对因协议执行不确定性（如黎巴嫩条款）引发的油价波动维持防御姿态。",
  prevRiskScore: 44,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price June 16 2026",
    "US Iran news June 16 2026",
    "Iran nuclear talks update 2026",
    "Strait of Hormuz shipping status",
    "US military deployment Middle East",
    "Iranian officials statements on United States"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-16",
  version: "v2.97",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D108",
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
      value: "WTI $77–$80 · Brent $79–$83",
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
  riskScore: 44,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Both sides are maintaining a ceasefire per the Memorandum of Understanding (MOU), with no reports of direct military conflict. However, the U.S. has explicitly stated it will maintain its full military posture in the Middle East, including two carrier strike groups, during the 60-day negotiation period as a deterrent and pressure tactic against Iran. This keeps the situation in a conditional, monitored calm rather than a structural de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "A core component of the US-Iran MOU is the reopening of the Strait of Hormuz. Iranian state media has announced a resumption of shipping, but multiple independent vessel tracking platforms and industry media (e.g., Argus Media) confirm that as of June 16, actual commercial traffic remains extremely low. Most shipowners are waiting for the formal signing on Friday and clearer security guarantees. The situation is one of diplomatic clearance but continued physical restriction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "As the U.S. and Iran reached a preliminary deal to end the conflict, market fears of a Middle Eastern crude supply disruption have eased significantly, leading to a continuous drop in oil prices. Prices have fallen to a three-month low, with both WTI and Brent futures trading within the $75-85/barrel range, reflecting a rapid erosion of the geopolitical risk premium.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The primary belligerents, the U.S. and Iran, have officially shifted from military confrontation to a diplomatic track with a planned MOU signing. Other powers, including the G7, have welcomed this development and are closely monitoring the situation. The mode of intervention has shifted from military deterrence to diplomatic statements, mediation, and oversight of the agreement, aligning with the rating for 'issuing statements/adjusting sanctions'.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "An agreement on an MOU, with a set signing date and a 60-day negotiation timeline, represents the most substantive diplomatic breakthrough since the conflict began. However, the parties have publicly offered conflicting interpretations of the deal's terms (especially concerning Israel's role in Lebanon), which poses a significant risk to the negotiation's future. Thus, while prospects have improved, they remain fragile.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "US and Iran reach MOU, to be signed Friday, launching 60-day nuclear talks",
      description: "The United States and Iran have agreed on a Memorandum of Understanding (MOU) to end the conflict, which includes a ceasefire, the reopening of the Strait of Hormuz, and the start of a 60-day negotiation period on nuclear issues. U.S. President Trump stated the deal will move to a 'second stage,' with a formal signing ceremony set for June 19 in Geneva, Switzerland.",
      verification: "confirmed",
      timestamp: "2026-06-16T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt_2",
      title: "Strait of Hormuz traffic remains stalled as market awaits formal deal signing",
      description: "Despite Iranian state media claims that tankers have resumed shipping, independent AIS vessel tracking data shows that commercial traffic in the Strait of Hormuz remained largely at a standstill on June 16. Industry sources note that shipowners remain cautious ahead of the formal signing of the agreement on Friday, with the threat of mines also a continuing concern.",
      verification: "confirmed",
      timestamp: "2026-06-16T10:00:00Z",
      significance: ""
    },
    {
      id: "evt_3",
      title: "US affirms it will maintain military posture in Middle East during negotiations",
      description: "Senior U.S. administration officials stated that during the 60-day negotiation period following the MOU signing, the U.S. will maintain its 'current force posture' in the Middle East, including over 50,000 troops and two aircraft carrier strike groups. The move is intended to ensure Iranian compliance and to retain military options.",
      verification: "confirmed",
      timestamp: "2026-06-15T22:00:00Z",
      significance: ""
    },
    {
      id: "evt_4",
      title: "Iran says deal includes Israeli withdrawal from Lebanon, sparking controversy",
      description: "Iranian Foreign Minister Abbas Araghchi publicly stated that the agreement reached with the U.S. includes a requirement for Israeli forces to withdraw from southern Lebanon. However, Israeli officials have explicitly stated, 'Trump's agreement does not bind us,' and plan to remain. This disagreement adds significant uncertainty to the smooth implementation of the deal.",
      verification: "confirmed",
      timestamp: "2026-06-16T09:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt_5",
      title: "Oil prices fall to three-month low on hopes of Middle East de-escalation",
      description: "Driven by expectations of a US-Iran deal and the potential reopening of the Strait of Hormuz, international oil prices have declined significantly. As of June 16, WTI crude futures fell to the ~$77-80 range, and Brent crude futures to the ~$80-82 range, as the market prices out the geopolitical risk premium.",
      verification: "confirmed",
      timestamp: "2026-06-16T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran have confirmed a Memorandum of Understanding (MOU), will formally sign it, and will enter a 60-day negotiation period, marking a shift from military confrontation to a diplomatic resolution track.",
      "Core points of contention, such as the future of Iran's nuclear program and the scope of sanctions relief, have been deferred to future talks, with the current agreement primarily addressing the immediate needs of a ceasefire and reopening the strait.",
      "Publicly conflicting interpretations of the agreement's terms (especially on the Lebanon issue) and the continued large-scale US military deployment as leverage suggest the current diplomatic window is fragile and at risk of collapse."
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
        "Change: Both sides are maintaining a ceasefire per the Memorandum of Understanding (MOU), with no reports of direct military conflict.",
        "Change: However, the U.S.",
        "Change: has explicitly stated it will maintain its full military posture in the Middle East, including two carrier strike groups, during the 60-day negotiation…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: A core component of the US-Iran MOU is the reopening of the Strait of Hormuz.",
        "Change: Iranian state media has announced a resumption of shipping, but multiple independent vessel tracking platforms and industry media (e.g., Argus Media) c…",
        "Change: Most shipowners are waiting for the formal signing on Friday and clearer security guarantees."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: As the U.S.",
        "Change: and Iran reached a preliminary deal to end the conflict, market fears of a Middle Eastern crude supply disruption have eased significantly, leading to …",
        "Change: Prices have fallen to a three-month low, with both WTI and Brent futures trading within the $75-85/barrel range, reflecting a rapid erosion of the geop…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The primary belligerents, the U.S.",
        "Change: and Iran, have officially shifted from military confrontation to a diplomatic track with a planned MOU signing.",
        "Change: Other powers, including the G7, have welcomed this development and are closely monitoring the situation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks a time-bound, verifiable agreement to curb Iran's nuclear capabilities, while Iran aims to exchange minimal nuclear concessions for maximum relief from economic sanctions and recognition of its regional status.",
      "The ambiguity of the agreement's details, especially its binding power on third parties (like Israel's actions in Lebanon), creates a severe point of friction that could derail negotiations."
    ],
    military: [
      "The U.S. maintains a forward military deployment to ensure the effectiveness of 'maximum pressure,' while Iran views this presence as a fundamental threat to its national security and regional influence."
    ]
  },
  scoreTrend: [
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
      score: 52
    },
    {
      date: "06-15",
      score: 44
    },
    {
      date: "06-16",
      score: 44,
      active: true
    }
  ],
  keyChange: "The composite risk score holds at a recent low, reflecting the market's confirmation of the US-Iran MOU, but maintains caution due to delays in the actual resumption of Hormuz traffic and disputes over agreement terms (e.g., the Lebanon issue).",
  investmentSignal: "→ Risk has been released in stages; recommend reducing war-risk hedge positions, but maintain a defensive posture against oil price volatility arising from uncertainty in the agreement's implementation (e.g., the Lebanon terms).",
  prevRiskScore: 44,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price June 16 2026",
    "US Iran news June 16 2026",
    "Iran nuclear talks update 2026",
    "Strait of Hormuz shipping status",
    "US military deployment Middle East",
    "Iranian officials statements on United States"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.97 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 44（持平）：综合风险分维持在近期低点，反映了市场对已达成的美伊谅解备忘录（MOU）的确认，但对霍尔木兹海峡实际通行恢复的延迟和协议条款的争议（如黎巴嫩问题）保持谨慎。",
    bannerWarning: "→ 风险已阶段性释放，建议减持战争风险对冲头寸，但对因协议执行不确定性（如黎巴嫩条款）引发的油价波动维持防御姿态。",
    deescalationIntent: "美国寻求通过一个有时限的、可验证的协议来限制伊朗核能力，而伊朗则力图以最小的核能力让步换取最大程度的经济制裁解除和区域地位承认。",
    structuralRisk: "美伊谅解备忘录的核心内容之一是重开霍尔木兹海峡。伊朗官方媒体已宣布航运恢复，但多个独立航运追踪平台和行业媒体（如Argus Media）证实，截至6月16日，商业船只的实际通行量仍然极低，大多数船东…",
    contradictionNote: "美国寻求通过一个有时限的、可验证的协议来限制伊朗核能力，而伊朗则力图以最小的核能力让步换取最大程度的经济制裁解除和区域地位承认。；美国维持前沿军事部署以确保“极限施压”的有效性，而伊朗则将美军存在视为其国家安全和地区影响力的根本威胁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第108天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.97 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 44 (Flat): The composite risk score holds at a recent low, reflecting the market's confirmation of the US-Iran MOU, but maintains caution due to delay…",
    bannerWarning: "→ Risk has been released in stages; recommend reducing war-risk hedge positions, but maintain a defensive posture again…",
    deescalationIntent: "The U.S. seeks a time-bound, verifiable agreement to curb Iran's nuclear capabi…",
    structuralRisk: "A core component of the US-Iran MOU is the reopening of the Strait of Hormuz. Iranian state media h…",
    contradictionNote: "The U.S. seeks a time-bound, verifiable agreement to curb Iran's nuclear capabilities, while Iran aims to exchange minimal nuclear concessions for maximum reli…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 108",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
