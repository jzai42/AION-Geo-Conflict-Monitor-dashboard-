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
  date: "2026-07-14",
  version: "v2.125",
  keyStats: [
    {
      label: "冲突天数",
      value: "D136",
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
      value: "WTI $79–$81 · Brent $84–$87",
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
  riskScore: 88,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美国对伊朗本土发动了连续第三晚的直接军事打击，并首次动用了无人水面作战艇，显示出攻击的持续性和技术升级。作为回应，伊朗向多个美国地区盟友发射导弹并袭击了阿联酋油轮，冲突已演变为公开的、多战线的直接战争。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡的航运状况已恶化至完全封锁。美国宣布恢复对伊朗所有港口的海上封锁，而伊朗方面此前已宣布关闭海峡并对商船进行实际攻击。多家航运数据显示该水道的商业交通已近乎停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "由于美伊在霍尔木兹海峡的直接军事对抗和封锁行动，市场对全球五分之一石油供应可能中断的担忧急剧加剧。布伦特原油价格飙升至四周高点，突破86美元/桶，进入$85-$100的显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国已完全进入直接参战状态，不仅通过海空力量连续多日对伊朗主权领土进行打击，还正式实施了制度化的海上封锁。这代表了除大规模地面入侵外最高级别的军事介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "所有外交渠道均已关闭。伊朗外交部明确表示，美国的军事行动已使所有外交努力“化为乌有”。美国总统特朗普也已正式通知国会敌对行动的恢复。双方均无意对话，而是通过军事行动表达立场。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军恢复对伊朗的海上封锁并提出20%“通行费”",
      description: "美国总统特朗普宣布，美军将从7月14日下午4点（美东时间）起，恢复对所有进出伊朗港口的船只进行海上封锁。同时，他提出对通过霍尔木兹海峡的其他货船征收20%的费用，以“报销”美国提供的安全保障。此举是对先前停火协议彻底的颠覆，将海上对抗制度化。",
      verification: "confirmed",
      timestamp: "2026-07-14T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军连续第三晚空袭伊朗，首次在实战中使用无人作战艇",
      description: "美国中央司令部（CENTCOM）确认，美军已连续第三晚对伊朗境内目标发动打击，旨在削弱其攻击商船的能力。此次行动首次在实战中投入了“海盗船”无人水面作战艇（USV），打击了阿巴斯港的海军维修设施。这标志着冲突在技术层面出现显著升级。",
      verification: "confirmed",
      timestamp: "2026-07-14T01:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗袭击阿联酋油轮致人员伤亡，并向美国盟友发射导弹",
      description: "阿联酋国防部证实，两艘该国油轮在霍尔木兹海峡遭伊朗巡航导弹袭击，造成一名印度籍船员死亡，八人受伤。同时，伊朗向包括巴林、约旦在内的美国盟友所在方向发射了导弹，巴林一度拉响防空警报，约旦则成功拦截了数枚导弹。冲突已明显外溢至更广泛的海湾地区。",
      verification: "confirmed",
      timestamp: "2026-07-14T04:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "因霍尔木兹海峡供应中断担忧，国际油价飙升至四周高点",
      description: "由于美伊在霍尔木兹海峡的军事对抗急剧升级，以及美国恢复对伊封锁，引发市场对全球能源供应中断的严重担忧，布伦特原油价格上涨超过3%，突破86美元/桶，WTI原油也接近80美元/桶，双双创下近四周新高。",
      verification: "confirmed",
      timestamp: "2026-07-14T08:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "伊朗外交部称近期外交努力已因美方袭击而“化为乌有”",
      description: "伊朗外交部发表声明，强烈谴责美国的持续空袭，称其“使过去几个月的所有外交努力都化为乌有”。声明指责华盛顿公然干涉海峡航运，导致地区不安全局势重现。这标志着官方层面对话窗口已完全关闭。",
      verification: "confirmed",
      timestamp: "2026-07-13T22:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军恢复对伊朗的海上封锁，并将直接军事打击常态化。",
      "伊朗通过攻击美国盟友及其航运资产进行报复，冲突外溢风险加剧。",
      "所有外交渠道均已关闭，双方致力于通过军事手段实现战略目标。"
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
        "变化：美国对伊朗本土发动了连续第三晚的直接军事打击，并首次动用了无人水面作战艇，显示出攻击的持续性和技术升级。",
        "变化：作为回应，伊朗向多个美国地区盟友发射导弹并袭击了阿联酋油轮，冲突已演变为公开的、多战线的直接战争。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡的航运状况已恶化至完全封锁。",
        "变化：美国宣布恢复对伊朗所有港口的海上封锁，而伊朗方面此前已宣布关闭海峡并对商船进行实际攻击。",
        "变化：多家航运数据显示该水道的商业交通已近乎停滞。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于美伊在霍尔木兹海峡的直接军事对抗和封锁行动，市场对全球五分之一石油供应可能中断的担忧急剧加剧。",
        "变化：布伦特原油价格飙升至四周高点，突破86美元/桶，进入$85-$100的显著偏强区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国已完全进入直接参战状态，不仅通过海空力量连续多日对伊朗主权领土进行打击，还正式实施了制度化的海上封锁。",
        "变化：这代表了除大规模地面入侵外最高级别的军事介入。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限军事与经济压力，完全扼杀伊朗的地区影响力及核能力，而伊朗则力图通过打破地区安全格局来反制，双方已无任何妥协空间。"
    ],
    military: [
      "美国利用其技术与海空优势对伊朗进行持续打击与封锁，试图掌控霍尔木兹海峡主导权；伊朗则利用其导弹、无人机及代理人网络进行非对称反击，力图将冲突扩大化，使美方及其盟友付出高昂代价。"
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "07-14",
      score: 88,
      active: true
    }
  ],
  keyChange: "冲突全面升级为“主动战争”阶段。美军恢复对伊朗的海上封锁并常态化实施直接打击，而伊朗则将攻击范围扩大至美国地区盟友，所有外交渠道关闭，能源市场风险急剧上升。",
  investmentSignal: "→ 维持对风险资产的防御性姿态，冲突烈度与能源中断风险同步攀升至新高。",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "Strait of Hormuz shipping status July 14 2026",
    "Iran military activity CENTCOM",
    "US diplomacy Iran latest",
    "WTI Brent crude oil price July 14 2026 Reuters",
    "oil price analysis July 2026 Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-14",
  version: "v2.125",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D136",
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
      value: "WTI $79–$81 · Brent $84–$87",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Fully Blockaded",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 88,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The U.S. has launched a third consecutive night of direct military strikes on Iranian territory, deploying unmanned surface vessels for the first time, indicating sustained attacks and technological escalation. In response, Iran has launched missiles at multiple U.S. regional allies and attacked UAE tankers, turning the conflict into an open, multi-front direct war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The shipping situation in the Strait of Hormuz has deteriorated to a complete blockade. The U.S. has announced the reimposition of a naval blockade on all Iranian ports, while Iran had previously declared the strait closed and conducted actual attacks on commercial vessels. Multiple shipping data sources show commercial traffic in the waterway has nearly halted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Concerns over the potential disruption of one-fifth of the world's oil supply have intensified dramatically due to the direct military confrontation and blockade actions in the Strait of Hormuz. Brent crude prices surged to a four-week high, breaking above $86/barrel and entering the $85-$100 range of significant strength.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States is fully engaged in direct combat operations. It has not only conducted multi-day strikes against sovereign Iranian territory using air and naval assets but has also formally implemented an institutionalized naval blockade. This represents the highest level of military intervention short of a large-scale ground invasion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "All diplomatic channels are closed. Iran's Foreign Ministry explicitly stated that U.S. military actions have 'rendered futile' all diplomatic efforts. U.S. President Trump has also formally notified Congress of the resumption of hostilities. Neither side shows any intention for dialogue, instead communicating positions through military action.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Reinstates Naval Blockade on Iran, Proposes 20% 'Transit Fee'",
      description: "U.S. President Trump announced that the military would resume its naval blockade of all vessels to and from Iranian ports, effective 4 p.m. ET on July 14. He also proposed a 20% fee on other cargo ships transiting the Strait of Hormuz to 'reimburse' the U.S. for providing security. The move completely upends the prior ceasefire agreement and institutionalizes the maritime confrontation.",
      verification: "confirmed",
      timestamp: "2026-07-14T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Conducts Third Night of Strikes on Iran, Using Combat USVs for the First Time",
      description: "U.S. Central Command (CENTCOM) confirmed it has conducted a third consecutive night of strikes against targets inside Iran to degrade its ability to attack commercial shipping. The operation involved the first-ever combat use of 'Corsair' unmanned surface vessels (USVs), which struck a naval maintenance facility at Bandar Abbas, marking a significant technological escalation in the conflict.",
      verification: "confirmed",
      timestamp: "2026-07-14T01:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Iran Attacks UAE Tankers Causing Casualties, Fires Missiles at US Allies",
      description: "The UAE Ministry of Defence confirmed that two of its tankers were hit by Iranian cruise missiles in the Strait of Hormuz, killing one Indian crew member and injuring eight. Concurrently, Iran launched missiles towards US allies including Bahrain and Jordan, prompting air raid sirens in the former and successful interceptions by the latter. The conflict has clearly spilled over into the wider Gulf region.",
      verification: "confirmed",
      timestamp: "2026-07-14T04:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "Oil Prices Surge to Four-Week High on Hormuz Supply Fears",
      description: "As the military confrontation in the Strait of Hormuz escalated sharply and the U.S. reinstated its blockade on Iran, severe concerns over a global energy supply disruption drove Brent crude prices up over 3% to break $86/barrel, with WTI crude nearing $80/barrel. Both benchmarks reached their highest levels in four weeks.",
      verification: "confirmed",
      timestamp: "2026-07-14T08:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Iran's Foreign Ministry Says Recent Diplomatic Efforts 'Rendered Futile' by US Strikes",
      description: "Iran's Foreign Ministry issued a statement strongly condemning the continued U.S. airstrikes, stating they have 'rendered futile all diplomatic efforts of the last few months.' The statement accused Washington of openly interfering with shipping in the strait and causing a return to regional insecurity, signaling a complete closure of the official dialogue window.",
      verification: "confirmed",
      timestamp: "2026-07-13T22:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The U.S. has resumed its naval blockade of Iran and is normalizing direct military strikes.",
      "Iran is retaliating by attacking U.S. allies and their shipping assets, increasing the risk of spillover.",
      "All diplomatic channels are closed, with both sides committed to achieving strategic goals through military means."
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
        "Change: The U.S.",
        "Change: has launched a third consecutive night of direct military strikes on Iranian territory, deploying unmanned surface vessels for the first time, indicati…",
        "Change: In response, Iran has launched missiles at multiple U.S."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The shipping situation in the Strait of Hormuz has deteriorated to a complete blockade.",
        "Change: The U.S.",
        "Change: has announced the reimposition of a naval blockade on all Iranian ports, while Iran had previously declared the strait closed and conducted actual atta…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Concerns over the potential disruption of one-fifth of the world's oil supply have intensified dramatically due to the direct military confrontation an…",
        "Change: Brent crude prices surged to a four-week high, breaking above $86/barrel and entering the $85-$100 range of significant strength."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States is fully engaged in direct combat operations.",
        "Change: It has not only conducted multi-day strikes against sovereign Iranian territory using air and naval assets but has also formally implemented an institu…",
        "Change: This represents the highest level of military intervention short of a large-scale ground invasion."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to completely neutralize Iran's regional influence and nuclear capabilities through maximum military and economic pressure, while Iran aims to counter this by disrupting the regional security architecture. There is no longer any room for compromise."
    ],
    military: [
      "The U.S. is leveraging its technological and naval/air superiority to conduct sustained strikes and a blockade on Iran, seeking to establish dominance over the Strait of Hormuz. Iran is using its missiles, drones, and proxy networks for asymmetric retaliation, aiming to expand the conflict and impose high costs on the U.S. and its allies."
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "07-14",
      score: 88,
      active: true
    }
  ],
  keyChange: "The conflict has fully escalated to an 'Active War' phase. The U.S. reinstated its naval blockade on Iran and normalized direct strikes, while Iran expanded its attacks to include U.S. regional allies. All diplomatic channels are closed, and energy market risks have risen sharply.",
  investmentSignal: "→ Maintain a defensive posture on risk assets, as conflict intensity and energy disruption risks climb to new highs simultaneously.",
  prevRiskScore: 84,
  webSources: [],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "Strait of Hormuz shipping status July 14 2026",
    "Iran military activity CENTCOM",
    "US diplomacy Iran latest",
    "WTI Brent crude oil price July 14 2026 Reuters",
    "oil price analysis July 2026 Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.125 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（↑4）：冲突全面升级为“主动战争”阶段。美军恢复对伊朗的海上封锁并常态化实施直接打击，而伊朗则将攻击范围扩大至美国地区盟友，所有外交渠道关闭，能源市场风险急剧上升。",
    bannerWarning: "→ 维持对风险资产的防御性姿态，冲突烈度与能源中断风险同步攀升至新高。",
    deescalationIntent: "美国寻求通过极限军事与经济压力，完全扼杀伊朗的地区影响力及核能力，而伊朗则力图通过打破地区安全格局来反制，双方已无任何妥协空间。",
    structuralRisk: "霍尔木兹海峡的航运状况已恶化至完全封锁。美国宣布恢复对伊朗所有港口的海上封锁，而伊朗方面此前已宣布关闭海峡并对商船进行实际攻击。多家航运数据显示该水道的商业交通已近乎停滞。",
    contradictionNote: "美国寻求通过极限军事与经济压力，完全扼杀伊朗的地区影响力及核能力，而伊朗则力图通过打破地区安全格局来反制，双方已无任何妥协空间。；美国利用其技术与海空优势对伊朗进行持续打击与封锁，试图掌控霍尔木兹海峡主导权；伊朗则利用其导弹、无人机及代理人网络进行非对称反击，力图将冲突扩大化，使美方及其盟友付出高昂代价。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第136天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.125 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (↑4): The conflict has fully escalated to an 'Active War' phase. The U.S. reinstated its naval blockade on Iran and normalized direct strikes, wh…",
    bannerWarning: "→ Maintain a defensive posture on risk assets, as conflict intensity and energy disruption risks climb to new highs sim…",
    deescalationIntent: "The U.S. seeks to completely neutralize Iran's regional influence and nuclear c…",
    structuralRisk: "The shipping situation in the Strait of Hormuz has deteriorated to a complete blockade. The U.S. ha…",
    contradictionNote: "The U.S. seeks to completely neutralize Iran's regional influence and nuclear capabilities through maximum military and economic pressure, while Iran aims to c…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 136",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
