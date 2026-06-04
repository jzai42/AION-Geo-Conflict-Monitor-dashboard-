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
  date: "2026-06-04",
  version: "v2.85",
  conflictDay: "D96",
  keyChange: "冲突烈度因伊朗袭击科威特、巴林而急剧升级，但被以色列-黎巴嫩停火带来的微弱外交希望所对冲，综合风险维持高位。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D96",
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
      value: "WTI $95.00–$96.50 · Brent $96.50–$98.00",
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
      description: "伊朗对科威特、巴林境内目标发动直接导弹和无人机袭击，并造成平民伤亡，是冲突显著扩大的标志。美国中央司令部确认对伊朗境内目标进行了报复性打击，双方交火烈度维持在极高水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运交通仍处于瘫痪状态。数据显示，当前通行量不足正常水平的10%，主要航运公司因保险和安全问题继续暂停该航线，海峡处于“功能性受限”状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油价格因军事与外交消息对冲而高位震荡，但价格区间仍处于85-100美元/桶的范围内。供应中断的风险溢价持续存在，但尚未突破进入下一风险等级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事力量直接参与冲突，不仅拦截伊朗的导弹和无人机，还主动对伊朗领土（格什姆岛）上的军事目标发起打击。这属于直接的军事交战行为。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "局势高度矛盾。一方面，伊朗直接袭击第三方国家使军事冲突螺旋升级；另一方面，以色列与黎巴嫩达成停火，为外交斡旋保留了微弱的可能性。总体而言，双方立场依然强硬，谈判破裂风险极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗对科威特和巴林发动导弹与无人机袭击",
      description: "伊朗伊斯兰革命卫队（IRGC）宣称，为报复美国此前的空袭，对位于科威特和巴林的美国军事基地发动了导弹与无人机袭击。科威特方面证实，其国际机场遭到袭击，造成1人死亡，数十人受伤。美国与巴林防空系统拦截了部分射向巴林的导弹，其中一个目标是美国第五舰队总部。(Sources: CBS News, ISW)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军确认对霍尔木兹海峡附近的伊朗目标进行“自卫打击”",
      description: "美国中央司令部（CENTCOM）确认，为应对伊朗针对民用船只的无人机威胁及其他攻击行为，美军对位于霍尔木兹海峡格什姆岛（Qeshm Island）的一个伊朗军事地面控制站实施了“自卫打击”。(Sources: CENTCOM, Fox News)",
      verification: "confirmed",
      timestamp: "2026-06-03T21:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "以色列与黎巴嫩达成有条件的停火协议，市场出现缓和预期",
      description: "据报道，在美国调解下，以色列与黎巴嫩就实施停火达成协议，这被市场解读为可能为更广泛的美伊缓和局势创造条件的信号。伊朗此前曾将美伊谈判进展与以色列-黎巴嫩真主党冲突的降级相联系。然而，伊朗外交部表示，与美国的谈判“没有取得实质性进展”。(Sources: Reuters, The Business Times, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-04T05:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "霍尔木兹海峡航运仍严重受阻",
      description: "尽管有零星油轮通过，但多数是通过关闭AIS“变暗”或沿伊朗水域航行的方式。主流航运公司因战争风险保险费率极高而继续暂停服务。数据显示，当前通行量仍不足正常时期的10%，海峡处于“功能性受限”状态。(Sources: Modern Diplomacy, UANI)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "油价因军事升级和外交信号对冲而剧烈波动",
      description: "在伊朗袭击科威特的消息传出后，油价在前一个交易日上涨约2%。随后，因以色列-黎巴嫩达成停火协议带来的一线希望，油价在6月4日小幅回落。WTI原油价格在95-96.5美元区间波动，布伦特原油在96.5-98美元区间。(Sources: Reuters, Gotrade)",
      verification: "confirmed",
      timestamp: "2026-06-04T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突已从代理人战争和有限打击升级为国家间的直接军事对抗。",
      "打击范围首次显著扩大到科威特和巴林等第三方国家，增加了地区全面战争的风险。",
      "尽管烈度升级，但边缘外交渠道（如促成黎以停火）仍在运作，表明各方可能仍在试探避免冲突完全失控的底线。"
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
        "变化：伊朗对科威特、巴林境内目标发动直接导弹和无人机袭击，并造成平民伤亡，是冲突显著扩大的标志。",
        "变化：美国中央司令部确认对伊朗境内目标进行了报复性打击，双方交火烈度维持在极高水平。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的商业航运交通仍处于瘫痪状态。",
        "变化：数据显示，当前通行量不足正常水平的10%，主要航运公司因保险和安全问题继续暂停该航线，海峡处于“功能性受限”状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油价格因军事与外交消息对冲而高位震荡，但价格区间仍处于85-100美元/桶的范围内。",
        "变化：供应中断的风险溢价持续存在，但尚未突破进入下一风险等级。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军事力量直接参与冲突，不仅拦截伊朗的导弹和无人机，还主动对伊朗领土（格什姆岛）上的军事目标发起打击。",
        "变化：这属于直接的军事交战行为。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限施压（军事打击+经济封锁）迫使伊朗在核问题与地区影响力上让步，而伊朗则试图通过扩大打击范围来证明美国的压力政策将使其盟友付出代价，从而瓦解其压力联盟。"
    ],
    military: [
      "美国试图将冲突控制在“有节制的报复性打击”范围内，而伊朗则通过攻击美国在中东的盟友来提升冲突成本，试图打破美国的控制，迫使其在更高风险下进行决策。"
    ]
  },
  scoreTrend: [
    {
      date: "05-31",
      score: 64
    },
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
      score: 76,
      active: true
    }
  ],
  investmentSignal: "→ 风险资产维持防御姿态，地缘风险溢价使能源与大宗商品的多头部位仍具支撑，但需警惕外交信号引发的短期价格剧烈波动。",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status June 4 2026",
    "Pentagon statement Iran June 2026",
    "Iranian military activity June 2026",
    "WTI Brent crude oil price range June 4 2026 Reuters",
    "WTI Brent crude oil price trend June 4 2026 Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-04",
  version: "v2.85",
  conflictDay: "D96",
  keyChange: "Conflict intensity sharply escalated due to Iranian attacks on Kuwait and Bahrain, but was counterbalanced by faint diplomatic hopes from the Israel-Lebanon ceasefire, keeping overall risk at a high plateau.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D96",
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
      value: "WTI $95.00–$96.50 · Brent $96.50–$98.00",
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
      description: "Iran's direct missile and drone attacks on targets in Kuwait and Bahrain, causing civilian casualties, mark a significant expansion of the conflict. U.S. CENTCOM confirmed retaliatory strikes on targets in Iran, maintaining the intensity of engagement at a very high level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic through the Strait of Hormuz remains paralyzed. Data shows current transit volume is less than 10% of normal levels, with major liners suspending the route due to insurance and safety issues. The strait is in a state of 'functional restriction'.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude oil prices are highly volatile, caught between military and diplomatic news, but the price range remains within the $85-100/barrel band. The risk premium for supply disruption persists but has not broken into the next risk tier.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. military forces are directly engaged in the conflict, not only intercepting Iranian missiles and drones but also actively launching strikes against military targets on Iranian territory (Qeshm Island). This constitutes direct military combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The situation is highly contradictory. On one hand, direct attacks on third-party countries escalate the military conflict. On the other, a ceasefire between Israel and Lebanon offers a faint possibility for diplomatic maneuvering. Overall, stances remain hardline, and the risk of negotiation collapse is very high.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Launches Missile and Drone Attacks on Kuwait and Bahrain",
      description: "Iran's IRGC claimed retaliatory missile and drone attacks on U.S. military bases in Kuwait and Bahrain. Kuwait confirmed its international airport was hit, resulting in one death and dozens of injuries. U.S. and Bahraini air defenses intercepted some missiles aimed at Bahrain, including one targeting the U.S. 5th Fleet headquarters. (Sources: CBS News, ISW)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "U.S. Confirms 'Self-Defense Strikes' on Iranian Target near Strait of Hormuz",
      description: "U.S. Central Command (CENTCOM) confirmed it conducted 'self-defense strikes' against an Iranian military ground control station on Qeshm Island in the Strait of Hormuz in response to Iranian drone threats against civilian shipping and other attacks. (Sources: CENTCOM, Fox News)",
      verification: "confirmed",
      timestamp: "2026-06-03T21:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Israel and Lebanon Reach Conditional Ceasefire, Market Sees De-escalation Hope",
      description: "A U.S.-mediated ceasefire was reportedly agreed between Israel and Lebanon, which markets interpreted as a signal that could create conditions for a broader U.S.-Iran de-escalation. Iran had previously linked progress with the U.S. to an easing of the Israel-Hezbollah conflict. However, Iran's Foreign Ministry stated there has been 'no tangible progress' in talks with the U.S. (Sources: Reuters, The Business Times, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-04T05:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Shipping Through Strait of Hormuz Remains Severely Disrupted",
      description: "Although sporadic tankers are passing, most do so by 'going dark' (AIS off) or hugging Iranian waters. Mainstream shipping companies remain suspended due to extremely high war risk insurance premiums. Data indicates traffic is still less than 10% of normal, leaving the strait in a 'functionally restricted' state. (Sources: Modern Diplomacy, UANI)",
      verification: "confirmed",
      timestamp: "2026-06-04T00:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil Prices Volatile, Pulled Between Military Escalation and Diplomatic Signals",
      description: "Oil prices rose about 2% in the previous session on news of the Iranian attack on Kuwait. Prices then eased slightly on June 4 on hopes stemming from the Israel-Lebanon ceasefire deal. WTI crude fluctuated in the $95-96.5 range, with Brent in the $96.5-98 range. (Sources: Reuters, Gotrade)",
      verification: "confirmed",
      timestamp: "2026-06-04T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The conflict has escalated from proxy warfare and limited strikes to direct military confrontation between states.",
      "The scope of attacks has significantly widened to third-party countries (Kuwait, Bahrain) for the first time, increasing the risk of a full-scale regional war.",
      "Despite the escalation, peripheral diplomatic channels (e.g., brokering the Lebanon-Israel ceasefire) remain active, suggesting parties may still be testing limits to avoid a total loss of control."
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
        "Change: Iran's direct missile and drone attacks on targets in Kuwait and Bahrain, causing civilian casualties, mark a significant expansion of the conflict.",
        "Change: U.S.",
        "Change: CENTCOM confirmed retaliatory strikes on targets in Iran, maintaining the intensity of engagement at a very high level."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping traffic through the Strait of Hormuz remains paralyzed.",
        "Change: Data shows current transit volume is less than 10% of normal levels, with major liners suspending the route due to insurance and safety issues.",
        "Change: The strait is in a state of 'functional restriction'."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude oil prices are highly volatile, caught between military and diplomatic news, but the price range remains within the $85-100/barrel band.",
        "Change: The risk premium for supply disruption persists but has not broken into the next risk tier."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: U.S.",
        "Change: military forces are directly engaged in the conflict, not only intercepting Iranian missiles and drones but also actively launching strikes against mil…",
        "Change: This constitutes direct military combat operations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to compel Iranian concessions on nuclear and regional issues through maximum pressure (military strikes + economic blockade), while Iran seeks to prove this policy will impose costs on U.S. allies, thereby fracturing the pressure coalition."
    ],
    military: [
      "The U.S. is attempting to contain the conflict within a scope of 'controlled retaliatory strikes', whereas Iran is escalating costs by attacking U.S. allies in the Middle East, trying to break U.S. control and force decisions under higher-risk conditions."
    ]
  },
  scoreTrend: [
    {
      date: "05-31",
      score: 64
    },
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
      score: 76,
      active: true
    }
  ],
  investmentSignal: "→ Maintain a defensive posture on risk assets; geopolitical premiums continue to support long positions in energy and commodities, but be wary of sharp short-term price swings on diplomatic signals.",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status June 4 2026",
    "Pentagon statement Iran June 2026",
    "Iranian military activity June 2026",
    "WTI Brent crude oil price range June 4 2026 Reuters",
    "WTI Brent crude oil price trend June 4 2026 Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.85 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：冲突烈度因伊朗袭击科威特、巴林而急剧升级，但被以色列-黎巴嫩停火带来的微弱外交希望所对冲，综合风险维持高位。",
    bannerWarning: "→ 风险资产维持防御姿态，地缘风险溢价使能源与大宗商品的多头部位仍具支撑，但需警惕外交信号引发的短期价格剧烈波动。",
    deescalationIntent: "美国寻求通过极限施压（军事打击+经济封锁）迫使伊朗在核问题与地区影响力上让步，而伊朗则试图通过扩大打击范围来证明美国的压力政策将使其盟友付出代价，从而瓦解其压…",
    structuralRisk: "霍尔木兹海峡的商业航运交通仍处于瘫痪状态。数据显示，当前通行量不足正常水平的10%，主要航运公司因保险和安全问题继续暂停该航线，海峡处于“功能性受限”状态。",
    contradictionNote: "美国寻求通过极限施压（军事打击+经济封锁）迫使伊朗在核问题与地区影响力上让步，而伊朗则试图通过扩大打击范围来证明美国的压力政策将使其盟友付出代价，从而瓦解其压力联盟。；美国试图将冲突控制在“有节制的报复性打击”范围内，而伊朗则通过攻击美国在中东的盟友来提升冲突成本，试图打破美国的控制，迫使其在更高风险下进行决策。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第96天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.85 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Conflict intensity sharply escalated due to Iranian attacks on Kuwait and Bahrain, but was counterbalanced by faint diplomatic hopes from t…",
    bannerWarning: "→ Maintain a defensive posture on risk assets; geopolitical premiums continue to support long positions in energy and c…",
    deescalationIntent: "The U.S. aims to compel Iranian concessions on nuclear and regional issues thro…",
    structuralRisk: "Commercial shipping traffic through the Strait of Hormuz remains paralyzed. Data shows current tran…",
    contradictionNote: "The U.S. aims to compel Iranian concessions on nuclear and regional issues through maximum pressure (military strikes + economic blockade), while Iran seeks to…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 96",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
