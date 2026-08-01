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
  date: "2026-08-01",
  version: "v2.143",
  keyStats: [
    {
      label: "冲突天数",
      value: "D154",
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
      value: "WTI $84.60–$86.80 · Brent $87.90–$90.25",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国对伊朗的海上封锁与军事执法行动仍在继续。最新的情报显示，美国和以色列正计划对伊朗能源基础设施进行大规模打击，而伊朗方面则警告将采取全面报复。局势维持在直接交火与重大军事行动的临界点。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗官方维持霍尔木兹海峡“无法通行”的立场，商业航运流量远低于正常水平的50%。英国海事贸易行动组织（UKMTO）报告了新的油轮在附近水域遭射弹攻击的事件，进一步证实了该航道的极高风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "由于霍尔木兹海峡的紧张局势和新的袭击事件，市场对供应中断的担忧加剧，推动油价大幅上涨。布伦特原油价格已突破90美元/桶，整个价格区间主体落在$85-100美元，显示出显著的供应担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军方通过其中央司令部直接执行对伊朗港口的海上封锁，并持续在区域内部署军事力量。据多方报道，美国正与主要区域盟友以色列协调潜在的、更大规模的军事打击行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "双方的公开声明充满了敌意和军事威胁。伊朗警告可能关闭更多水道，而美国则威胁进行更严厉的打击。目前不存在任何已知的、活跃的外交谈判渠道，双方均无意寻求对话。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260801-1",
      title: "英国海事机构报告油轮在霍尔木兹海峡附近遭射弹攻击",
      description: "英国海事贸易行动组织（UKMTO）报告称，在阿曼附近水域发生两起海上事件，其中一起涉及一艘油轮被“不明射弹”击中，导致发动机舱受损。该事件加剧了市场对霍尔木兹海峡航运安全的极度担忧。(Sources: Reuters, South China Morning Post)",
      verification: "confirmed",
      timestamp: "2026-08-01T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260801-2",
      title: "媒体称美以正准备对伊朗能源基础设施进行大规模打击",
      description: "多家媒体援引多名消息人士的话称，美国和以色列正计划对伊朗的能源基础设施（包括发电厂和炼油厂）发动一轮迄今为止最严厉的打击，可能在本周末开始。作为回应，伊朗官员表示已准备好“全面回应计划”。(Sources: CBS News, Jerusalem Post)",
      verification: "confirmed",
      timestamp: "2026-08-01T09:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260801-3",
      title: "伊朗警告称若美国继续封锁，或将关闭其他战略水道",
      description: "伊朗最高国家安全委员会秘书警告称，美国持续的海上封锁和“挑衅”行为，不仅将进一步限制关键的霍尔木兹海峡，还可能导致其他海上咽喉要道被关闭，并警告其后果将由全球经济和能源市场承担。(Sources: Anadolu Agency)",
      verification: "single",
      timestamp: "2026-08-01T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260801-4",
      title: "油价因中东紧张局势加剧而大幅上涨，创数月最大月度涨幅",
      description: "由于伊朗宣布在霍尔木兹海峡袭击油轮以及整体冲突升级，市场对全球原油供应中断的担忧加剧，推动油价大幅上行。布伦特原油期货结算价突破90美元/桶，与WTI原油均录得自3月以来的最大单月涨幅。(Sources: Reuters, Business Recorder)",
      verification: "confirmed",
      timestamp: "2026-07-31T21:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260801-5",
      title: "首批美军加油机抵达保加利亚，以支持中东军事行动",
      description: "为支持在中东的军事行动，首批两架美国KC-135加油机已抵达保加利亚的一个空军基地。此项部署是美国加强其在该地区军事后勤能力的一部分，引发了伊朗方面的抗议。(Sources: Associated Press)",
      verification: "confirmed",
      timestamp: "2026-08-01T06:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方军事行动持续，美国维持对伊朗的海上封锁，并据报计划进行更大规模打击。",
      "霍尔木兹海峡航运实际上已中断，近期再次发生商船遇袭事件，进一步恶化安全局势。",
      "外交途径完全关闭，双方言论对抗激烈，均威胁采取更极端的军事报复手段。"
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
        "变化：美国及以色列据报正准备对伊朗能源基础设施进行大规模打击，可能导致冲突性质发生重大升级。",
        "延续：伊朗军方指责美国激化紧张局势，并警告区域国家勿与美合作，显示代理人或区域冲突的风险持续存在。",
        "延续：美国在欧洲部署加油机等支援力量，表明其正为长期、高强度的军事行动做准备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：英国海事贸易行动组织(UKMTO)报告称一艘油轮在霍尔木兹海峡附近被不明射弹击中，表明该区域的直接攻击风险正在变为现实。",
        "延续：伊朗官方重申海峡因美国“侵略行动”无法通行，商业航运量仍处极低水平。",
        "延续：主要航运公司继续暂停通过该海峡的航线，全球供应链持续承压。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：受霍尔木兹海峡袭击事件及紧张局势加剧影响，布伦特原油价格突破90美元/桶，创下数月来最大单月涨幅。",
        "延续：市场对中东石油供应可能大规模中断的担忧情绪是油价的主要支撑因素。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗最高国家安全委员会警告，若美国继续海上封锁，可能导致其他战略水道被关闭，这是将冲突扩大化的明确威胁。",
        "延续：美国政府官员重申将对伊朗采取强硬军事行动，直至其满足美方要求。",
        "延续：谈判渠道完全停滞，双方均未释放任何愿意通过外交途径解决争端的信号。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国旨在通过“极限施压”迫使伊朗在核问题及地区影响力上让步，而伊朗则坚持维护国家主权与安全，拒绝屈服于外部压力，导致双方缺乏政治互信与对话基础。"
    ],
    military: [
      "美国试图通过海上封锁和军事打击削弱伊朗的军事与经济能力，并保障其所定义的航行自由。伊朗则利用其在霍尔木兹海峡的地理优势和非对称军事能力进行反制，试图打破封锁并对美方及其盟友造成不可承受的代价。"
    ]
  },
  scoreTrend: [
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80,
      active: true
    }
  ],
  keyChange: "尽管综合评分持平，但局势的潜在风险在上升。双方的威胁已从战术性交火升级至战略性目标，包括伊朗的能源基础设施和威胁关闭更多国际水道，预示着下一轮冲突的破坏性可能远超以往。",
  investmentSignal: "→ 风险资产维持防御性仓位，继续关注能源板块因供应中断风险带来的上行波动。",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price August 1 2026",
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status August 2026",
    "US military deployment Middle East August 1 2026",
    "Iran nuclear talks progress August 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-01",
  version: "v2.143",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D154",
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
      value: "WTI $84.60–$86.80 · Brent $87.90–$90.25",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. naval blockade and military enforcement actions against Iran continue. Latest intelligence suggests the U.S. and Israel are planning large-scale strikes on Iran's energy infrastructure, while Iran warns of comprehensive retaliation. The situation remains on the brink of direct fire and major military operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran officially maintains its stance that the Strait of Hormuz is 'not passable,' with commercial shipping traffic far below 50% of normal levels. The UK Maritime Trade Operations (UKMTO) reported a new incident of a tanker being hit by a projectile in nearby waters, confirming the extremely high risk in the waterway.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Due to heightened tensions and new attacks in the Strait of Hormuz, supply disruption fears have pushed oil prices sharply higher. Brent crude has surpassed $90/barrel, with the main price range falling within $85-100, indicating significant supply concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. military, through CENTCOM, is directly enforcing a naval blockade on Iranian ports and continues to deploy military assets in the region. According to multiple reports, the U.S. is coordinating with key regional ally Israel for potentially larger-scale military strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Public statements from both sides are filled with hostility and military threats. Iran has warned of closing more waterways, while the U.S. threatens harsher strikes. There are no known, active diplomatic channels, and neither side shows any intention of seeking dialogue.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20260801-1",
      title: "UK Maritime Agency reports tanker struck by projectile near Strait of Hormuz",
      description: "The United Kingdom Maritime Trade Operations (UKMTO) reported two maritime incidents in waters off Oman, one of which involved a tanker being 'struck by an unknown projectile,' causing damage to the engine room. The incident has intensified extreme concerns over shipping security in the Strait of Hormuz. (Sources: Reuters, South China Morning Post)",
      verification: "confirmed",
      timestamp: "2026-08-01T11:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260801-2",
      title: "US and Israel reportedly preparing major strikes on Iran's energy infrastructure",
      description: "Multiple media outlets, citing several sources, report that the U.S. and Israel are planning one of the harshest bombing campaigns to date against Iran's energy infrastructure, including power plants and refineries, potentially starting this weekend. In response, an Iranian official stated that a 'comprehensive response plan' has been prepared. (Sources: CBS News, Jerusalem Post)",
      verification: "confirmed",
      timestamp: "2026-08-01T09:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260801-3",
      title: "Iran warns it may close other strategic waterways if US blockade continues",
      description: "The secretary of Iran's Supreme National Security Council warned that the continuation of the U.S. maritime blockade and 'provocations' would not only further restrict the key Strait of Hormuz but could also result in the closure of other maritime chokepoints, warning the consequences would be borne by the global economy and energy markets. (Sources: Anadolu Agency)",
      verification: "single",
      timestamp: "2026-08-01T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260801-4",
      title: "Oil prices surge on heightened Middle East tensions, marking biggest monthly gain in months",
      description: "Fears of a global crude supply disruption intensified after Iran announced attacks on tankers in the Strait of Hormuz and overall conflict escalation, driving a sharp rally in oil prices. Brent crude futures settled above $90/barrel, with both Brent and WTI recording their largest monthly gains since March. (Sources: Reuters, Business Recorder)",
      verification: "confirmed",
      timestamp: "2026-07-31T21:00:00Z",
      significance: ""
    },
    {
      id: "evt-20260801-5",
      title: "First US military refueling aircraft arrive in Bulgaria to support Middle East operations",
      description: "In support of military operations in the Middle East, the first two U.S. KC-135 refueling aircraft have arrived at an air base in Bulgaria. The deployment is part of a U.S. effort to strengthen its military logistics in the region and has drawn protest from Iran. (Sources: Associated Press)",
      verification: "confirmed",
      timestamp: "2026-08-01T06:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military operations are ongoing, with the U.S. maintaining a naval blockade on Iran and reportedly planning larger-scale strikes.",
      "Shipping through the Strait of Hormuz is effectively halted, with recent attacks on commercial vessels further deteriorating the security situation.",
      "Diplomatic channels are completely closed, with hostile rhetoric from both sides threatening more extreme military retaliation."
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
        "Change: The U.S. and Israel are reportedly preparing for large-scale strikes on Iranian energy infrastructure, which could lead to a significant escalation of …",
        "Continue: Iran's military accuses the U.S. of escalating tensions and warns regional nations against cooperation, indicating a persistent risk of proxy or regi…",
        "Continue: The U.S. deployment of support assets like tankers to Europe indicates preparations for a sustained, high-intensity military operation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The UKMTO report of a tanker being hit by a projectile near the Strait of Hormuz suggests that the risk of direct attacks in the area is materializing.",
        "Continue: Iran officially reiterates that the strait is impassable due to U.S. 'aggressive actions,' with shipping volumes remaining at extremely low levels.",
        "Continue: Major shipping lines continue to suspend routes through the strait, keeping global supply chains under pressure."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spurred by attack incidents in the Strait of Hormuz and heightened supply disruption risks, Brent crude prices have surpassed $90/barrel, marking the l…",
        "Continue: Market sentiment regarding a potential large-scale disruption of Middle Eastern oil supply remains the primary driver supporting oil prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran's Supreme National Security Council has warned that the conflict could be expanded by closing other strategic waterways if the U.S. blockade conti…",
        "Continue: U.S. officials reiterate a hardline military stance against Iran until their demands are met.",
        "Continue: Negotiation channels are completely stalled, with neither side signaling any willingness to resolve the dispute through diplomacy."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to compel Iranian concessions on its nuclear program and regional influence through 'maximum pressure,' while Iran insists on defending its national sovereignty and security, refusing to yield to external pressure, leading to a lack of political trust and a basis for dialogue."
    ],
    military: [
      "The U.S. is attempting to degrade Iran's military and economic capabilities through a naval blockade and military strikes, while ensuring what it defines as freedom of navigation. Iran is leveraging its geographic advantage at the Strait of Hormuz and its asymmetric military capabilities to counter, seeking to break the blockade and inflict unbearable costs on the U.S. and its allies."
    ]
  },
  scoreTrend: [
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80,
      active: true
    }
  ],
  keyChange: "Although the composite score is stable, the underlying risk is increasing. Threats from both sides have escalated from tactical exchanges to strategic targets, including Iran's energy infrastructure and the potential closure of more international waterways, suggesting the next round of conflict could be far more destructive.",
  investmentSignal: "→ Maintain defensive positioning in risk assets, continue to monitor the energy sector for upside volatility driven by supply disruption risks.",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price August 1 2026",
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status August 2026",
    "US military deployment Middle East August 1 2026",
    "Iran nuclear talks progress August 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.143 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：尽管综合评分持平，但局势的潜在风险在上升。双方的威胁已从战术性交火升级至战略性目标，包括伊朗的能源基础设施和威胁关闭更多国际水道，预示着下一轮冲突的破坏性可能远超以往。",
    bannerWarning: "→ 风险资产维持防御性仓位，继续关注能源板块因供应中断风险带来的上行波动。",
    deescalationIntent: "美国旨在通过“极限施压”迫使伊朗在核问题及地区影响力上让步，而伊朗则坚持维护国家主权与安全，拒绝屈服于外部压力，导致双方缺乏政治互信与对话基础。",
    structuralRisk: "伊朗官方维持霍尔木兹海峡“无法通行”的立场，商业航运流量远低于正常水平的50%。英国海事贸易行动组织（UKMTO）报告了新的油轮在附近水域遭射弹攻击的事件，进一步证实了该航道的极高风险。",
    contradictionNote: "美国旨在通过“极限施压”迫使伊朗在核问题及地区影响力上让步，而伊朗则坚持维护国家主权与安全，拒绝屈服于外部压力，导致双方缺乏政治互信与对话基础。；美国试图通过海上封锁和军事打击削弱伊朗的军事与经济能力，并保障其所定义的航行自由。伊朗则利用其在霍尔木兹海峡的地理优势和非对称军事能力进行反制，试图打破封锁并对美方及其盟友…",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第154天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.143 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Although the composite score is stable, the underlying risk is increasing. Threats from both sides have escalated from tactical exchanges t…",
    bannerWarning: "→ Maintain defensive positioning in risk assets, continue to monitor the energy sector for upside volatility driven by …",
    deescalationIntent: "The U.S. aims to compel Iranian concessions on its nuclear program and regional…",
    structuralRisk: "Iran officially maintains its stance that the Strait of Hormuz is 'not passable,' with commercial s…",
    contradictionNote: "The U.S. aims to compel Iranian concessions on its nuclear program and regional influence through 'maximum pressure,' while Iran insists on defending its natio…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 154",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
