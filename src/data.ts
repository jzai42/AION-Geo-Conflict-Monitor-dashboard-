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
  date: "2026-06-05",
  version: "v2.86",
  keyStats: [
    {
      label: "冲突天数",
      value: "D97",
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
      value: "WTI $92–$94 · Brent $95–$98",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊爆发新一轮直接军事交火，美军打击了伊朗在格什姆岛的设施，随后伊朗对美国在科威特及巴林的军事基地发动了无人机与导弹袭击，造成人员伤亡。冲突烈度维持在直接交火的高水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运交通量仍远低于正常水平，仅为战前约10%。关于伊朗部署水雷的报告促使欧洲多国组建海军扫雷部队，表明航道面临持续的、严重的物理威胁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油价格在高位盘整，布伦特原油在95美元/桶附近，WTI原油在93美元/桶附近。市场持续消化美伊军事对抗升级带来的供应风险，同时观望脆弱的谈判前景，价格维持在显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军队直接参与了对伊朗境内目标的军事打击。同时，包括英国、法国、德国在内的欧洲主要国家正在组建联合海军部队，准备介入霍尔木兹海峡执行扫雷任务，大国军事部署和参与程度维持在非常高的水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "尽管美国总统单方面释放谈判进展顺利的乐观信号，但伊朗官方明确否认取得实质性进展，且双方发生了新一轮致命的军事交火。伊朗强硬派要求采取更强硬立场，谈判前景依然黯淡，破裂风险高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊发生新一轮军事交火，伊朗无人机袭击科威特机场致1死多伤",
      description: "美国对伊朗格什姆岛的一座通信塔发动打击后，伊朗对美国在科威特和巴林的军事设施进行报复。科威特官方证实，一架伊朗无人机袭击了科威特国际机场，造成至少1人死亡，数十人受伤。这是停火以来最严重的对抗升级之一。 (来源: Iran International, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-06-05T00:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美伊就谈判进展释放矛盾信号，前景高度不确定",
      description: "美国总统特朗普于6月4日表示，与伊朗的谈判进展“非常顺利”，可能很快达成协议。然而，伊朗外交部长同日公开表示，谈判未取得“任何实质性进展”。这种截然不同的表态加剧了市场对谈判前景的疑虑。 (来源: CBS News, Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "欧洲多国组建海军部队以清除霍尔木兹水雷",
      description: "据报道，一个由英法协调，有超过15个国家参与的海军部队正在组建，准备进入霍尔木兹海峡执行扫雷任务。此举证实了航道面临持续的物理封锁威胁，并显示了主要大国准备以军事手段介入保障航运。 (来源: The Maritime Executive)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IAEA重申对伊朗核计划失去监督的担忧",
      description: "联合国核监督机构IAEA在本周的一份报告中重申，由于自2025年以来无法进入伊朗核查，其对于伊朗核材料的“知识连续性”已经丧失，这引发了对核扩散的担忧。核问题是此次冲突的核心症结之一。 (来源: Washington Examiner)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "油价高位企稳，反映持续地缘风险",
      description: "布伦特原油期货价格维持在95美元/桶附近，WTI原油在93美元/桶附近。价格走势表明，市场认为尽管存在外交努力，但新一轮的军事冲突使得供应中断的风险居高不下，地缘政治溢价短期难以消除。 (来源: Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-06-05T00:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方在过去24小时内发生了直接的、造成伤亡的军事交火，表明停火协议极其脆弱。",
      "尽管存在高级别的外交接触渠道，但双方的公开立场和军事行动严重背离，实质性降级的可能性低。",
      "冲突的地理范围有扩大的迹象，已波及科威特等第三方国家，增加了区域不稳定的风险。"
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
        "变化：美伊爆发新一轮直接军事交火，美军打击了伊朗在格什姆岛的设施，随后伊朗对美国在科威特及巴林的军事基地发动了无人机与导弹袭击，造成人员伤亡。",
        "变化：冲突烈度维持在直接交火的高水平。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的商业航运交通量仍远低于正常水平，仅为战前约10%。",
        "变化：关于伊朗部署水雷的报告促使欧洲多国组建海军扫雷部队，表明航道面临持续的、严重的物理威胁。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油价格在高位盘整，布伦特原油在95美元/桶附近，WTI原油在93美元/桶附近。",
        "变化：市场持续消化美伊军事对抗升级带来的供应风险，同时观望脆弱的谈判前景，价格维持在显著偏强区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军队直接参与了对伊朗境内目标的军事打击。",
        "变化：同时，包括英国、法国、德国在内的欧洲主要国家正在组建联合海军部队，准备介入霍尔木兹海峡执行扫雷任务，大国军事部署和参与程度维持在非常高的水平。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“极限施压”迫使伊朗在核问题与区域影响力上让步，而伊朗则力图通过军事报复和威胁关键水道来打破封锁并争取谈判筹码。",
      "双方内部均面临强硬派压力，限制了领导层在外交上的回旋余地，使得任何让步都难以实施。"
    ],
    military: [
      "美国寻求通过精确打击削弱伊朗的军事能力和报复能力，但要避免陷入大规模地面战争。",
      "伊朗则利用其非对称作战能力（无人机、导弹、代理人网络）对美军及其盟友进行反击，意图造成美方难以承受的持续损失。"
    ]
  },
  scoreTrend: [
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76,
      active: true
    }
  ],
  keyChange: "尽管综合评分持平，但冲突性质已从高压对峙恶化为新一轮的直接军事交火，局势的实际危险性在上升。评分的“黏滞”反映了升级因素被同样脆弱的“谈判前景”所抵消，形成了一种极不稳定的高风险平衡。",
  investmentSignal: "→ 维持对能源板块的风险敞口和对风险资产的防御性对冲，地缘溢价短期内难以消除。",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran nuclear deal talks news",
    "Strait of Hormuz shipping news",
    "US military movements Middle East",
    "Iran military activity",
    "WTI Brent crude oil price range trend June 5 2026 Reuters",
    "WTI crude price June 2026 Bloomberg",
    "Brent oil price today Financial Times",
    "US sanctions on Iran update",
    "IAEA Iran nuclear program report"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-05",
  version: "v2.86",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D97",
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
      value: "WTI $92–$94 · Brent $95–$98",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "A new round of direct military exchanges occurred between the US and Iran. The US struck facilities on Iran's Qeshm Island, and Iran subsequently launched drone and missile attacks on US bases in Kuwait and Bahrain, causing casualties. The intensity of the conflict remains at a high level of direct fire exchange.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic through the Strait of Hormuz remains far below normal levels, at only about 10% of pre-war volume. Reports of Iranian-laid sea mines have prompted European nations to form a naval mine-clearing force, indicating a persistent and severe physical threat to the channel.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude oil prices are consolidating at high levels, with Brent crude near $95/barrel and WTI crude around $93/barrel. The market continues to price in supply risks from the escalating US-Iran military confrontation while watching the fragile negotiation prospects, keeping prices in a significantly strong range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US military is directly involved in strikes against targets inside Iran. Simultaneously, major European powers, including the UK, France, and Germany, are forming a joint naval force to intervene in the Strait of Hormuz for mine-clearing operations. The level of great power military deployment and involvement remains very high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Although the US President has unilaterally signaled optimism about negotiation progress, Iranian officials have explicitly denied substantive progress, and the two sides have engaged in a new round of deadly military exchanges. Hardliners in Iran are demanding a tougher stance, making the negotiation prospects bleak and the risk of collapse high.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "New round of US-Iran military exchanges; Iranian drone strikes Kuwait airport, killing 1",
      description: "Following a US strike on a communications tower on Iran's Qeshm Island, Iran retaliated against US military facilities in Kuwait and Bahrain. Kuwaiti officials confirmed that an Iranian drone struck Kuwait International Airport, causing at least one death and dozens of injuries. This is one of the most severe escalations since the ceasefire began. (Source: Iran International, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-06-05T00:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US and Iran send conflicting signals on negotiation progress, outlook highly uncertain",
      description: "On June 4, U.S. President Trump stated that talks with Iran were progressing 'very well' and a deal could be reached soon. However, Iran's Foreign Minister publicly stated on the same day that 'no tangible progress' had been made. These starkly different statements have increased market skepticism about the prospects for a deal. (Source: CBS News, Times of Israel)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "European nations form naval force to clear Hormuz sea mines",
      description: "A naval force coordinated by the UK and France, with participation from over 15 nations, is reportedly being assembled to conduct mine-clearing operations in the Strait of Hormuz. This move confirms the ongoing physical blockade threat to the waterway and shows that major powers are preparing to intervene militarily to secure shipping. (Source: The Maritime Executive)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IAEA reiterates concerns over loss of oversight of Iran's nuclear program",
      description: "The UN nuclear watchdog, IAEA, reiterated in a report this week that its inability to access Iranian nuclear facilities since 2025 has led to a 'loss of continuity of knowledge' regarding Iran's nuclear materials, raising proliferation concerns. The nuclear issue is a core cause of the conflict. (Source: Washington Examiner)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil prices stabilize at high levels, reflecting sustained geopolitical risk",
      description: "Brent crude futures held near $95/barrel, with WTI crude around $93/barrel. The price action indicates that the market believes the risk of supply disruption from the new military clashes remains high, despite diplomatic efforts, and that a geopolitical risk premium is unlikely to fade in the short term. (Source: Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-06-05T00:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran have engaged in direct, casualty-inflicting military exchanges in the last 24 hours, indicating the ceasefire is extremely fragile.",
      "Despite high-level diplomatic channels, the public stances and military actions of both sides are severely misaligned, making substantive de-escalation unlikely.",
      "The geographic scope of the conflict shows signs of expanding, now affecting third-party nations like Kuwait and increasing the risk of regional instability."
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
        "Change: A new round of direct military exchanges occurred between the US and Iran.",
        "Change: The US struck facilities on Iran's Qeshm Island, and Iran subsequently launched drone and missile attacks on US bases in Kuwait and Bahrain, causing ca…",
        "Change: The intensity of the conflict remains at a high level of direct fire exchange."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping traffic through the Strait of Hormuz remains far below normal levels, at only about 10% of pre-war volume.",
        "Change: Reports of Iranian-laid sea mines have prompted European nations to form a naval mine-clearing force, indicating a persistent and severe physical threa…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude oil prices are consolidating at high levels, with Brent crude near $95/barrel and WTI crude around $93/barrel.",
        "Change: The market continues to price in supply risks from the escalating US-Iran military confrontation while watching the fragile negotiation prospects, keep…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The US military is directly involved in strikes against targets inside Iran.",
        "Change: Simultaneously, major European powers, including the UK, France, and Germany, are forming a joint naval force to intervene in the Strait of Hormuz for …",
        "Change: The level of great power military deployment and involvement remains very high."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US aims to compel Iranian concessions on its nuclear program and regional influence through 'maximum pressure,' while Iran seeks to break the blockade and gain leverage by retaliating militarily and threatening key waterways.",
      "Both sides face internal pressure from hardliners, limiting the diplomatic flexibility of their leadership and making any compromise difficult to implement."
    ],
    military: [
      "The US seeks to degrade Iran's military and retaliatory capabilities through precision strikes while avoiding a large-scale ground war.",
      "Iran utilizes its asymmetric warfare capabilities (drones, missiles, proxy networks) to counter US forces and their allies, aiming to inflict a continuous and unbearable cost."
    ]
  },
  scoreTrend: [
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76
    },
    {
      date: "06-04",
      score: 76
    },
    {
      date: "06-05",
      score: 76,
      active: true
    }
  ],
  keyChange: "Although the composite score is flat, the nature of the conflict has deteriorated from a high-pressure standoff to a new round of direct military exchanges, increasing the actual level of danger. The score's 'stickiness' reflects that escalating factors are being offset by equally fragile 'negotiation prospects,' creating a highly unstable, high-risk equilibrium.",
  investmentSignal: "→ Maintain exposure to the energy sector and defensive hedges on risk assets, as the geopolitical premium is unlikely to dissipate in the short term.",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran nuclear deal talks news",
    "Strait of Hormuz shipping news",
    "US military movements Middle East",
    "Iran military activity",
    "WTI Brent crude oil price range trend June 5 2026 Reuters",
    "WTI crude price June 2026 Bloomberg",
    "Brent oil price today Financial Times",
    "US sanctions on Iran update",
    "IAEA Iran nuclear program report"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.86 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：尽管综合评分持平，但冲突性质已从高压对峙恶化为新一轮的直接军事交火，局势的实际危险性在上升。评分的“黏滞”反映了升级因素被同样脆弱的“谈判前景”所抵消，形成了一种极不稳定的高风险平衡。",
    bannerWarning: "→ 维持对能源板块的风险敞口和对风险资产的防御性对冲，地缘溢价短期内难以消除。",
    deescalationIntent: "美国试图通过“极限施压”迫使伊朗在核问题与区域影响力上让步，而伊朗则力图通过军事报复和威胁关键水道来打破封锁并争取谈判筹码。",
    structuralRisk: "霍尔木兹海峡的商业航运交通量仍远低于正常水平，仅为战前约10%。关于伊朗部署水雷的报告促使欧洲多国组建海军扫雷部队，表明航道面临持续的、严重的物理威胁。",
    contradictionNote: "美国试图通过“极限施压”迫使伊朗在核问题与区域影响力上让步，而伊朗则力图通过军事报复和威胁关键水道来打破封锁并争取谈判筹码。；美国寻求通过精确打击削弱伊朗的军事能力和报复能力，但要避免陷入大规模地面战争。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第97天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.86 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Although the composite score is flat, the nature of the conflict has deteriorated from a high-pressure standoff to a new round of direct mi…",
    bannerWarning: "→ Maintain exposure to the energy sector and defensive hedges on risk assets, as the geopolitical premium is unlikely t…",
    deescalationIntent: "The US aims to compel Iranian concessions on its nuclear program and regional i…",
    structuralRisk: "Commercial shipping traffic through the Strait of Hormuz remains far below normal levels, at only a…",
    contradictionNote: "The US aims to compel Iranian concessions on its nuclear program and regional influence through 'maximum pressure,' while Iran seeks to break the blockade and …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 97",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
