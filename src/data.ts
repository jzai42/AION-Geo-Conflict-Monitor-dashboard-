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
  date: "2026-07-12",
  version: "v2.123",
  keyStats: [
    {
      label: "冲突天数",
      value: "D134",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $71–$73 · Brent $75–$77",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全封锁",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国对伊朗本土发动大规模空袭（打击约140个目标），而伊朗则首次对多个邻国（卡塔尔、巴林等）的美国军事基地进行直接导弹与无人机报复。双方交火从有限报复升级为多战线、大规模的直接对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "伊朗伊斯兰革命卫队（IRGC）在袭击数艘商船后，正式宣布关闭霍尔木兹海峡，“直至美国停止干预”。此举导致全球最关键的石油运输通道商业航运完全停滞。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "尽管上周五收盘油价仍处于75-85美元区间的下沿，但霍尔木兹海峡的确认关闭是极端看涨事件，对全球五分之一的石油供应构成直接威胁，显著加剧了供应中断的担忧，将价格推向更高风险区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国通过中央司令部（CENTCOM）直接对伊朗主权领土内的军事目标进行了计划性和大规模的打击，而非通过代理人或仅限于海上拦截。这维持了极高水平的直接军事介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "大规模的直接军事交火已经彻底破坏了此前脆弱的谈判势头。双方的行动（美军大规模空袭、伊朗关闭海峡并袭击美军基地）表明其立场极为强硬，外交解决的窗口基本关闭，谈判已停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗宣布关闭霍尔木兹海峡，美伊爆发新一轮直接军事打击",
      description: "伊朗伊斯兰革命卫队（IRGC）在袭击一艘塞浦路斯籍集装箱船后，宣布“直至另行通知”关闭霍尔木兹海峡。作为回应，美国中央司令部（CENTCOM）确认对伊朗境内约140个军事目标发动了本周第三轮大规模空袭。伊朗随后向包括卡塔尔、巴林在内的多个美国在地区内的军事基地发射了导弹和无人机。 (Sources: Reuters, AP, AFP, US CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-07-12T05:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美国确认打击140个伊朗军事目标作为报复",
      description: "美国中央司令部发表声明，确认其部队打击了约140个伊朗军事目标，包括导弹和无人机站点、海军设施、弹药库和沿海监视系统。此轮打击是为回应伊朗袭击在霍尔木兹海峡航行的M/V GFS Galaxy号商业船只。 (Sources: US CENTCOM, Washington Post, BBC)",
      verification: "confirmed",
      timestamp: "2026-07-12T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗对美国在多个海湾国家的基地发动报复性袭击",
      description: "在美国对伊朗境内目标进行打击后，伊朗革命卫队宣布对位于卡塔尔、巴林、科威特和阿联酋的美国及其盟友军事设施发动了导弹和无人机袭击。卡塔尔和阿联酋均报告启动了防空系统进行拦截。 (Sources: Al Jazeera English, Reuters, The Independent)",
      verification: "confirmed",
      timestamp: "2026-07-12T06:30:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "霍尔木兹航运完全中断，多艘船只遭袭或改变航线",
      description: "继伊朗袭击M/V GFS Galaxy号并导致一名船员失踪后，伊朗革命卫队宣称又袭击了第二艘船只。英国海事贸易行动组织(UKMTO)报告了相关事件，并确认有船员被救起。伊朗官方声明称，在“美国停止干预”前，海峡将保持关闭。 (Sources: UKMTO, CBS News, Investing.com)",
      verification: "confirmed",
      timestamp: "2026-07-12T03:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "油价在冲突升级前保持区间震荡，但面临巨大上行压力",
      description: "在上周五（7月10日）收盘时，由于对美伊可能通过谈判缓和局势的期望，油价小幅回落。布伦特原油收于约76美元/桶，WTI原油收于约71-72美元/桶区间。然而，周末霍尔木兹海峡的关闭和军事行动的急剧升级，已为新一周开盘带来极端的上行风险。 (Sources: Reuters, Bloomberg, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-07-11T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突焦点集中于全球能源大动脉——霍尔木兹海峡的控制权，伊朗选择将其武器化。",
      "美伊双方均采取了“升级换取优势”的策略，直接军事对抗的规模和范围显著扩大。",
      "地区盟友被迫卷入，伊朗对多国美军基地的打击可能引发更广泛的地区冲突。"
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
        "变化：美军对伊朗境内发动大规模、多目标的空袭，旨在削弱其军事能力。",
        "变化：伊朗首次对多个海湾国家境内的美军基地发动直接、公开的导弹和无人机攻击。",
        "延续：美军在海湾地区保持强大的海军和空军部署，包括两个航母战斗群。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗官方宣布无限期关闭霍尔木兹海峡，商业航运完全停止，这是冲突爆发以来最严重的升级。",
        "变化：伊朗革命卫队证实袭击了至少两艘商业船只，导致人员伤亡和船只受损。",
        "延续：美国及其盟友的海军在该地区高度戒备，但未能阻止伊朗的封锁行动。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的关闭构成重大的实际供应中断，而非仅仅是风险溢价，全球能源安全面临直接威胁。",
        "延续：尽管上周五收盘价尚稳，但市场普遍预期本周开盘后油价将出现剧烈跳涨。",
        "延续：主要消费国（如中国）和国际能源署（IEA）面临启动战略石油储备的压力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：外交斡旋努力（如阿曼、卡塔尔的调解）因军事行动的急剧升级而基本宣告失败。",
        "变化：双方领导层的公开言论充满敌意，美国防长称“伊朗做出了错误选择，现在他们要付出代价”，而伊朗则誓言报复。",
        "延续：美方坚持要求伊朗公开保证海峡开放，而伊朗则将关闭海峡作为反制美国压力的核心筹码，双方核心诉求完全对立。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗彻底放弃对霍尔木兹海峡的控制并停止所有“恶意活动”，以此作为谈判前提；而伊朗则将控制海峡视为其在不对称博弈中对抗美国制裁和军事压力的根本筹码。"
    ],
    military: [
      "美国试图通过精确、大规模的“惩罚性”打击来迫使伊朗让步，但伊朗的回应是将冲突扩大化，直接攻击美国在整个地区的军事基地，挑战美国的地区军事主导地位。"
    ]
  },
  scoreTrend: [
    {
      date: "07-08",
      score: 64
    },
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
      score: 80,
      active: true
    }
  ],
  keyChange: "冲突急剧升级至“霍尔木兹危机”阶段，伊朗官方宣布关闭海峡并与美国展开大规模直接军事交火，综合风险评分跃升至80分。",
  investmentSignal: "→ 增持能源与大宗商品以对冲地缘风险，风险资产面临显著压力。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news",
    "Iran military activity Strait of Hormuz",
    "US CENTCOM Iran statements",
    "Iran nuclear deal talks news",
    "WTI Brent crude oil price today Reuters",
    "oil prices July 12 2026 Bloomberg",
    "Iran proxy groups activity middle east",
    "US naval presence Persian Gulf"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-12",
  version: "v2.123",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D134",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $71–$73 · Brent $75–$77",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Completely Blocked",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. launched large-scale airstrikes against approximately 140 targets on Iranian soil, while Iran retaliated for the first time with direct missile and drone attacks on U.S. military bases in multiple neighboring countries (Qatar, Bahrain). The hostilities have escalated from limited retaliation to large-scale, multi-front direct confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "Iran's Islamic Revolutionary Guard Corps (IRGC) officially announced the closure of the Strait of Hormuz 'until U.S. interference ends' after attacking several commercial vessels. This action has brought commercial shipping in the world's most critical oil chokepoint to a complete halt.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Although oil prices closed at the lower end of the $75-85 range last Friday, the confirmed closure of the Strait of Hormuz is an extremely bullish event, posing a direct threat to a fifth of the world's oil supply. This has significantly heightened concerns of supply disruption, pushing prices toward a higher risk band.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S., through its Central Command (CENTCOM), has directly conducted planned, large-scale strikes on military targets within Iran's sovereign territory, rather than through proxies or limited to maritime interdictions. This maintains a very high level of direct military intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The large-scale direct military exchange has completely undermined the fragile momentum for negotiations. The actions of both sides (massive US airstrikes, Iran's closure of the strait and attacks on US bases) indicate extremely hardline stances, effectively closing the window for a diplomatic solution and stalling talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Announces Closure of Strait of Hormuz, New Round of Direct US-Iran Military Strikes Erupts",
      description: "Iran's Islamic Revolutionary Guard Corps (IRGC) announced the closure of the Strait of Hormuz 'until further notice' after attacking a Cyprus-flagged container ship. In response, U.S. Central Command (CENTCOM) confirmed it launched a third round of large-scale airstrikes this week against ~140 military targets in Iran. Iran subsequently launched missiles and drones at multiple U.S. military bases in the region, including in Qatar and Bahrain. (Sources: Reuters, AP, AFP, US CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-07-12T05:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "U.S. Confirms Striking 140 Iranian Military Targets in Retaliation",
      description: "U.S. Central Command issued a statement confirming its forces struck approximately 140 Iranian military targets, including missile and drone sites, naval capabilities, ammunition storage facilities, and coastal surveillance systems. The strikes were in response to the Iranian attack on the M/V GFS Galaxy commercial vessel in the Strait of Hormuz. (Sources: US CENTCOM, Washington Post, BBC)",
      verification: "confirmed",
      timestamp: "2026-07-12T02:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Iran Launches Retaliatory Attacks on U.S. Bases in Multiple Gulf Countries",
      description: "Following U.S. strikes on targets inside Iran, the IRGC announced it launched missile and drone attacks against U.S. and allied military facilities in Qatar, Bahrain, Kuwait, and the UAE. Both Qatar and the UAE reported activating air defense systems to intercept the attacks. (Sources: Al Jazeera English, Reuters, The Independent)",
      verification: "confirmed",
      timestamp: "2026-07-12T06:30:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Hormuz Shipping Comes to a Complete Halt Amid Vessel Attacks",
      description: "Following the Iranian attack on the M/V GFS Galaxy, which left one crew member missing, the IRGC claimed to have struck a second vessel. The UK Maritime Trade Operations (UKMTO) reported related incidents and confirmed crew members were rescued. An official Iranian statement said the strait will remain closed until 'U.S. interference ends.' (Sources: UKMTO, CBS News, Investing.com)",
      verification: "confirmed",
      timestamp: "2026-07-12T03:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil Prices Range-Bound Before Escalation, But Face Extreme Upward Pressure",
      description: "At Friday's close (July 10), oil prices had slightly retreated on hopes of de-escalation through talks. Brent crude settled around $76/barrel, with WTI in the $71-72/barrel range. However, the weekend's closure of the Strait of Hormuz and the sharp military escalation have created extreme upside risk for the new week's open. (Sources: Reuters, Bloomberg, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-07-11T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict's focus has shifted to the control of the global energy artery, the Strait of Hormuz, which Iran has chosen to weaponize.",
      "Both the U.S. and Iran have adopted 'escalate-to-gain-advantage' strategies, significantly expanding the scale and scope of direct military confrontation.",
      "Regional allies are being forcibly drawn in, as Iranian strikes on U.S. bases in multiple countries risk triggering a wider regional conflict."
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
        "Change: U.S. forces conducted large-scale, multi-target airstrikes inside Iran aimed at degrading its military capabilities.",
        "Change: Iran, for the first time, launched direct and overt missile and drone attacks against U.S. bases in several Gulf Arab states.",
        "Continue: The U.S. maintains a robust naval and air presence in the Gulf region, including two aircraft carrier strike groups."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran officially announced an indefinite closure of the Strait of Hormuz, bringing commercial shipping to a complete halt, marking the most severe escal…",
        "Change: The IRGC confirmed attacks on at least two commercial vessels, resulting in casualties and damage.",
        "Continue: The navies of the U.S. and its allies are on high alert in the region but have been unable to prevent Iran's blockade."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The closure of the Strait of Hormuz constitutes a major actual supply disruption, not just a risk premium, posing a direct threat to global energy secu…",
        "Continue: Although prices were stable at Friday's close, the market widely anticipates a sharp spike in oil prices at the weekly open.",
        "Continue: Major consuming nations (like China) and the International Energy Agency (IEA) are under pressure to activate strategic petroleum reserves."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Diplomatic mediation efforts (e.g., by Oman and Qatar) have largely failed due to the sharp military escalation.",
        "Change: Public rhetoric from leaders on both sides is hostile, with the U.S. Secretary of Defense stating 'Iran made a poor choice. Now they pay,' while Iran v…",
        "Continue: The U.S. demands a public guarantee from Iran for the strait's openness, while Iran uses its closure as the primary leverage against U.S. pressure, i…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. demands Iran completely relinquish control over the Strait of Hormuz and cease all 'malign activities' as a precondition for talks, whereas Iran views its control of the strait as its fundamental leverage against U.S. sanctions and military pressure in an asymmetric conflict."
    ],
    military: [
      "The U.S. attempts to force Iranian concessions through precise, large-scale 'punitive' strikes, but Iran's response is to widen the conflict by directly attacking U.S. military assets across the region, challenging U.S. regional military dominance."
    ]
  },
  scoreTrend: [
    {
      date: "07-08",
      score: 64
    },
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
      score: 80,
      active: true
    }
  ],
  keyChange: "The conflict has sharply escalated into a 'Chokepoint Crisis,' with Iran officially closing the Strait of Hormuz and engaging in large-scale direct military exchanges with the U.S., pushing the composite risk score to 80.",
  investmentSignal: "→ Increase holdings in energy and commodities to hedge geopolitical risk; risk assets face significant pressure.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news",
    "Iran military activity Strait of Hormuz",
    "US CENTCOM Iran statements",
    "Iran nuclear deal talks news",
    "WTI Brent crude oil price today Reuters",
    "oil prices July 12 2026 Bloomberg",
    "Iran proxy groups activity middle east",
    "US naval presence Persian Gulf"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.123 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑8）：冲突急剧升级至“霍尔木兹危机”阶段，伊朗官方宣布关闭海峡并与美国展开大规模直接军事交火，综合风险评分跃升至80分。",
    bannerWarning: "→ 增持能源与大宗商品以对冲地缘风险，风险资产面临显著压力。",
    deescalationIntent: "美国要求伊朗彻底放弃对霍尔木兹海峡的控制并停止所有“恶意活动”，以此作为谈判前提；而伊朗则将控制海峡视为其在不对称博弈中对抗美国制裁和军事压力的根本筹码。",
    structuralRisk: "伊朗伊斯兰革命卫队（IRGC）在袭击数艘商船后，正式宣布关闭霍尔木兹海峡，“直至美国停止干预”。此举导致全球最关键的石油运输通道商业航运完全停滞。",
    contradictionNote: "美国要求伊朗彻底放弃对霍尔木兹海峡的控制并停止所有“恶意活动”，以此作为谈判前提；而伊朗则将控制海峡视为其在不对称博弈中对抗美国制裁和军事压力的根本筹码。；美国试图通过精确、大规模的“惩罚性”打击来迫使伊朗让步，但伊朗的回应是将冲突扩大化，直接攻击美国在整个地区的军事基地，挑战美国的地区军事主导地位。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第134天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.123 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑8): The conflict has sharply escalated into a 'Chokepoint Crisis,' with Iran officially closing the Strait of Hormuz and engaging in large-scal…",
    bannerWarning: "→ Increase holdings in energy and commodities to hedge geopolitical risk; risk assets face significant pressure.",
    deescalationIntent: "The U.S. demands Iran completely relinquish control over the Strait of Hormuz a…",
    structuralRisk: "Iran's Islamic Revolutionary Guard Corps (IRGC) officially announced the closure of the Strait of H…",
    contradictionNote: "The U.S. demands Iran completely relinquish control over the Strait of Hormuz and cease all 'malign activities' as a precondition for talks, whereas Iran views…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 134",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
