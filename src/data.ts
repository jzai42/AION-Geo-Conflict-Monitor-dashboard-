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
  date: "2026-05-29",
  version: "v2.79",
  keyStats: [
    {
      label: "冲突天数",
      value: "D90",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $87–$92 · Brent $91–$95",
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
      description: "尽管存在高层谈判，但美伊在霍尔木兹海峡附近仍有经证实的有限交火，包括美军的“防御性”打击和伊朗的报复性行动，冲突烈度维持在受控范围内。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运交通量依然极低，远低于正常水平的50%。多数主要航运公司继续暂停通过该海峡的航线，符合“严重受限”的定义。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "对美伊达成停火延长协议的乐观预期导致油价承压回落，但WTI和布伦特原油价格的主体区间仍处于$85-100，反映出市场虽有缓和，但对潜在供应风险的担忧依然存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国不仅在该区域维持着包括航母战斗群和先进战机在内的大规模直接军事部署，并参与了有限的作战行动（如击落无人机），同时还作为主要当事方直接参与旨在结束冲突的谈判。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "多家媒体证实，美伊谈判代表就延长停火60天达成初步谅解备忘录，这是冲突以来最重大的外交进展，使前景从“停滞”转向“取得有限进展”。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  riskScore: 68,
  events: [
    {
      id: "EVT-01",
      title: "美伊据报达成初步停火延长协议",
      description: "多家媒体援引美国官员消息称，美伊谈判代表已就延长当前停火协议60天并启动核谈判的谅解备忘录达成初步一致。但协议需美国总统最终批准，且伊朗方面未正式确认。（来源：Associated Press, Axios）",
      verification: "confirmed",
      timestamp: "2026-05-28T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡附近发生有限军事摩擦",
      description: "尽管在进行外交谈判，美军仍对伊朗无人机及地面目标进行了“防御性打击”，而伊朗革命卫队宣称对美军基地进行了报复。这表明停火状态十分脆弱。（来源：Reuters, SANA）",
      verification: "confirmed",
      timestamp: "2026-05-28T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "国际油价因停火希望而承压",
      description: "对美伊可能延长停火的乐观情绪，缓解了市场对原油供应中断的担忧，导致布伦特和WTI油价出现显著周度下跌，地缘政治风险溢价被部分挤出。（来源：Dawan Africa, FXEmpire）",
      verification: "confirmed",
      timestamp: "2026-05-29T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "霍尔木兹航运持续严重受限",
      description: "物流行业报告显示，霍尔木兹海峡的商业航运交通量依然极低，远未恢复正常。这表明尽管存在外交努力，实际的商业风险和保险成本仍然令航运公司望而却步。（来源：ICIS, ReliefWeb）",
      verification: "confirmed",
      timestamp: "2026-05-28T15:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方在保持军事压力的同时，正通过谈判探索降级路径，但军事意外仍可能破坏进程。",
      "冲突爆发以来首次出现由双方谈判代表达成的、有具体时限的谅解备忘录草案，标志着外交轨道的出现。",
      "危机正从纯粹的军事对抗转向“打谈结合”阶段，出现缓和机会窗口，但信任赤字巨大，破局风险仍高。"
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
        "变化：尽管存在停火谈判，美伊在霍尔木兹海峡附近发生有限军事摩擦，包括美军击落伊朗无人机及对地面目标打击。",
        "延续：美军在以色列及整个中东地区维持大规模、高戒备的军事部署，作为区域威慑的核心支柱。",
        "延续：伊朗支持的代理人网络在区域内保持活跃，但近24小时内无重大代理人袭击事件的公开报道。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡航运仍严重受限，仅有极少量船只在非正式护航下通行，商业航运远未恢复正常。",
        "延续：航运保险费率依然维持在高位，大多数商业船公司仍将该区域列为禁航区。",
        "变化：据报初步停火协议中包含逐步开放霍尔木兹海峡的条款，但具体执行时间表与条件尚不明确。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对潜在停火协议的乐观情绪导致油价承压回落，但价格区间仍反映供应中断的风险溢价。",
        "延续：全球能源供应链为应对霍尔木兹长期中断而进行的调整仍在继续，如增加从其他地区的采购和动用战略储备。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊谈判代表据报达成延长停火60天的初步谅解备忘录，是冲突以来最积极的外交信号。",
        "延续：美方强调协议需总统最终批准，而伊朗官方媒体尚未确认，显示双方领导层均持谨慎态度并保留决策空间。",
        "延续：伊朗强硬派继续发表声明，强调在核权利和地区影响力问题上不会妥协，为谈判前景设置障碍。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限压力迫使伊朗在核项目和地区行为上让步，而伊朗则试图利用其对霍尔木兹海峡的控制力作为反制杠杆，争取解除制裁和获得安全保证。",
      "双方内部均存在强硬派，可能在最后时刻阻碍任何妥协性协议的达成。"
    ],
    military: [
      "美国旨在通过军事威慑和有限打击，阻止伊朗封锁霍尔木兹海峡并削弱其军事能力，但需避免陷入大规模地面冲突。",
      "伊朗则利用非对称战术（无人机、快艇、导弹）和代理人网络，挑战美军在区域内的军事优势，并对美国盟友构成威胁。"
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "05-29",
      score: 68,
      active: true
    }
  ],
  keyChange: "美伊就延长停火60天达成初步协议的报道显著改善了冲突降级前景，综合风险分下降。尽管协议尚未最终签署，且局部军事摩擦仍在继续，但这标志着冲突可能转向“打谈结合”的新阶段。",
  investmentSignal: "→ 风险资产短期压力缓解，但鉴于协议未最终确认，对能源板块的风险对冲仍具价值。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price May 29 2026",
    "US Iran tensions latest news",
    "Strait of Hormuz shipping status May 2026",
    "Iran nuclear deal talks news 2026",
    "US military deployment Middle East May 2026",
    "Iran proxy activity Syria Iraq May 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-29",
  version: "v2.79",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D90",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $87-$92 · Brent $91-$95",
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
      description: "Despite high-level talks, confirmed limited exchanges of fire occurred near the Strait of Hormuz, including a U.S. 'defensive' strike and Iranian retaliatory actions, keeping the conflict intensity within a controlled scope.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic through the Strait of Hormuz remains extremely low, well below 50% of normal levels. Most major shipping lines continue to suspend routes through the strait, meeting the definition of 'severely restricted.'",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Optimism over a potential U.S.-Iran ceasefire extension has put downward pressure on oil prices, but the main price range for WTI and Brent crude remains within the $85-100 band, reflecting lingering concerns over potential supply risks despite the easing tensions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States not only maintains a large-scale direct military deployment in the region, including carrier strike groups and advanced fighter jets, and engages in limited combat operations (e.g., downing drones), but is also a primary party directly involved in negotiations to end the conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Confirmed reports that U.S. and Iranian negotiators reached a preliminary memorandum of understanding to extend the ceasefire by 60 days mark the most significant diplomatic progress since the conflict began, moving the outlook from 'stalled' to 'limited progress.'",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  riskScore: 68,
  events: [
    {
      id: "EVT-01",
      title: "U.S. and Iran Reportedly Reach Tentative Deal to Extend Ceasefire",
      description: "Multiple media outlets, citing U.S. officials, report that negotiators have reached a preliminary agreement on a memorandum of understanding to extend the current ceasefire by 60 days and launch nuclear talks. However, the deal requires final approval from the U.S. President and has not been officially confirmed by Iran. (Sources: Associated Press, Axios)",
      verification: "confirmed",
      timestamp: "2026-05-28T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Limited Military Clashes Occur Near Strait of Hormuz",
      description: "Despite diplomatic talks, the U.S. military conducted 'defensive strikes' against Iranian drones and ground targets, while Iran's IRGC claimed retaliation against a U.S. base. This demonstrates the fragility of the ceasefire. (Sources: Reuters, SANA)",
      verification: "confirmed",
      timestamp: "2026-05-28T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Global Oil Prices Fall on Ceasefire Hopes",
      description: "Optimism over a potential U.S.-Iran ceasefire extension eased market fears about crude supply disruptions, leading to a significant weekly drop in Brent and WTI prices as the geopolitical risk premium was partially priced out. (Sources: Dawan Africa, FXEmpire)",
      verification: "confirmed",
      timestamp: "2026-05-29T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Hormuz Shipping Remains Severely Restricted",
      description: "Logistics industry reports indicate commercial shipping traffic through the Strait of Hormuz remains extremely low and far from normal. This shows that despite diplomatic efforts, actual business risks and insurance costs continue to deter shipping companies. (Sources: ICIS, ReliefWeb)",
      verification: "confirmed",
      timestamp: "2026-05-28T15:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "While maintaining military pressure, both sides are exploring de-escalation paths through negotiation, but military incidents could still derail the process.",
      "For the first time since the conflict began, a draft memorandum of understanding with a specific timeline has been reached by negotiators, signaling the opening of a diplomatic track.",
      "The crisis is shifting from pure military confrontation to a 'fight and talk' phase, presenting a window for de-escalation, though the trust deficit is huge and the risk of breakdown remains high."
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
        "Change: Despite ceasefire talks, limited military friction occurred between the U.S. and Iran near the Strait of Hormuz, including the downing of an Iranian dr…",
        "Continue: The U.S. maintains a large-scale, high-alert military deployment in Israel and across the Middle East, serving as the core pillar of regional deterre…",
        "Continue: Iran-backed proxy networks remain active in the region, but no major proxy attacks were publicly reported in the last 24 hours."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Shipping in the Strait of Hormuz remains severely restricted, with only a minimal number of vessels transiting under informal escort; commercial ship…",
        "Continue: Maritime insurance premiums remain elevated, and most commercial carriers still list the area as a no-go zone.",
        "Change: The reported tentative ceasefire deal is said to include provisions for gradually reopening the Strait of Hormuz, but the specific timeline and conditi…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Optimism about a potential ceasefire agreement has put downward pressure on oil prices, though the price range still reflects a risk premium for supply…",
        "Continue: Adjustments in the global energy supply chain to cope with a prolonged Hormuz disruption are ongoing, such as increased procurement from other region…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: U.S. and Iranian negotiators have reportedly reached a preliminary memorandum of understanding to extend the ceasefire by 60 days, the most positive di…",
        "Continue: The U.S. side emphasizes that the deal requires final presidential approval, and Iranian state media has not confirmed it, indicating caution and pre…",
        "Continue: Iranian hardliners continue to issue statements emphasizing no compromise on nuclear rights and regional influence, creating obstacles for the negoti…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iranian concessions on its nuclear program and regional behavior through maximum pressure, while Iran attempts to use its control over the Strait of Hormuz as leverage to secure sanctions relief and security guarantees.",
      "Hardline factions within both countries could obstruct any compromise agreement at the last minute."
    ],
    military: [
      "The U.S. aims to deter Iran from blockading the Strait of Hormuz and degrade its military capabilities through military deterrence and limited strikes, while avoiding a large-scale ground conflict.",
      "Iran utilizes asymmetric tactics (drones, speedboats, missiles) and its proxy network to challenge U.S. military superiority in the region and pose a threat to U.S. allies."
    ]
  },
  scoreTrend: [
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
      score: 72
    },
    {
      date: "05-29",
      score: 68,
      active: true
    }
  ],
  keyChange: "Reports of a preliminary agreement between the U.S. and Iran to extend the ceasefire by 60 days have significantly improved de-escalation prospects, lowering the composite risk score. Although the deal is not yet finalized and localized military friction continues, it signals a potential shift to a new 'fight and talk' phase of the conflict.",
  investmentSignal: "→ Short-term pressure on risk assets is easing, but given the agreement is not yet finalized, hedging risk in the energy sector remains valuable.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price May 29 2026",
    "US Iran tensions latest news",
    "Strait of Hormuz shipping status May 2026",
    "Iran nuclear deal talks news 2026",
    "US military deployment Middle East May 2026",
    "Iran proxy activity Syria Iraq May 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.79 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（↓4）：美伊就延长停火60天达成初步协议的报道显著改善了冲突降级前景，综合风险分下降。尽管协议尚未最终签署，且局部军事摩擦仍在继续，但这标志着冲突可能转向“打谈结合”的新阶段。",
    bannerWarning: "→ 风险资产短期压力缓解，但鉴于协议未最终确认，对能源板块的风险对冲仍具价值。",
    deescalationIntent: "美国寻求通过极限压力迫使伊朗在核项目和地区行为上让步，而伊朗则试图利用其对霍尔木兹海峡的控制力作为反制杠杆，争取解除制裁和获得安全保证。",
    structuralRisk: "霍尔木兹海峡的商业航运交通量依然极低，远低于正常水平的50%。多数主要航运公司继续暂停通过该海峡的航线，符合“严重受限”的定义。",
    contradictionNote: "美国寻求通过极限压力迫使伊朗在核项目和地区行为上让步，而伊朗则试图利用其对霍尔木兹海峡的控制力作为反制杠杆，争取解除制裁和获得安全保证。；美国旨在通过军事威慑和有限打击，阻止伊朗封锁霍尔木兹海峡并削弱其军事能力，但需避免陷入大规模地面冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第90天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.79 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (↓4): Reports of a preliminary agreement between the U.S. and Iran to extend the ceasefire by 60 days have significantly improved de-escalation p…",
    bannerWarning: "→ Short-term pressure on risk assets is easing, but given the agreement is not yet finalized, hedging risk in the energ…",
    deescalationIntent: "The U.S. seeks to compel Iranian concessions on its nuclear program and regiona…",
    structuralRisk: "Commercial shipping traffic through the Strait of Hormuz remains extremely low, well below 50% of n…",
    contradictionNote: "The U.S. seeks to compel Iranian concessions on its nuclear program and regional behavior through maximum pressure, while Iran attempts to use its control over…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 90",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
