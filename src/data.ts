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
  date: "2026-09-10",
  version: "v2.184",
  keyStats: [
    {
      label: "冲突天数",
      value: "D194",
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
      value: "WTI $95-97 · Brent $101-103",
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
  riskScore: 88,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗对美国在第三国（约旦）的军事基地发动直接弹道导弹攻击，并成功造成美方装备损失，表明冲突已进入无限制的直接军事对抗层面。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通过霍尔木兹海峡的商业航运流量持续处于极低水平，远低于近期平均值，表明该关键水道的商业通行已基本停滞。伊朗威胁扩大禁航区进一步恶化了局势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "直接军事冲突的加剧导致市场对供应的担忧急剧升温，布伦特原油价格稳定在100美元/桶以上，并持续上行，完全符合危机驱动的油价模式。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军方（中央司令部）直接参与并指挥了对伊朗油轮等目标的军事打击，并防御伊朗的导弹攻击，构成大国直接参与作战行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "国际原子能机构理事会投票决定将伊朗核问题提交至联合国安理会，标志着通过国际组织进行斡旋的关键外交渠道已经关闭，双方立场完全强硬化。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-20260910-1",
      title: "伊朗导弹袭击约旦境内美军基地并造成损失",
      description: "伊朗向约旦境内驻有美军的穆瓦法克·萨尔蒂空军基地发射了弹道导弹。据美国官员向福克斯新闻等媒体透露，袭击对多架美国军机造成了损害，包括一架A-10攻击机和数架F-15战斗机。约旦军方表示拦截了大部分来袭导弹。",
      verification: "confirmed",
      timestamp: "2026-09-10T05:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260910-2",
      title: "布伦特原油价格突破102美元/桶",
      description: "由于美国与伊朗之间的军事行动持续升级，市场对中东地区原油供应中断的担忧加剧，推动国际油价继续上涨。布伦特原油期货价格攀升至102美元/桶以上，创下数月新高。",
      verification: "confirmed",
      timestamp: "2026-09-10T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260910-3",
      title: "国际原子能机构将伊朗核问题提交至联合国安理会",
      description: "国际原子能机构（IAEA）理事会投票决定，因伊朗在核问题上“不遵守”规定，将其问题提交至联合国安理会。此举是近二十年来首次，标志着通过IAEA渠道解决问题的外交努力严重受挫。伊朗谴责该决议，称其为美国施压的结果。",
      verification: "confirmed",
      timestamp: "2026-09-09T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260910-4",
      title: "霍尔木兹海峡航运量持续处于极低水平",
      description: "根据路透社援引的航运追踪数据，9月9日通过霍尔木兹海峡的商业船只仅有7艘，远低于本已受压制的10日平均水平（约14艘）。航运持续受到严重限制，伊朗同时宣布计划扩大海峡外的“禁航区”。",
      verification: "confirmed",
      timestamp: "2026-09-10T07:30:00Z",
      significance: ""
    },
    {
      id: "evt-20260910-5",
      title: "美军否认战舰受损，确认持续打击伊朗油轮",
      description: "针对伊朗伊斯兰革命卫队宣称重创美国战舰的说法，美国中央司令部（CENTCOM）发布声明予以否认，称之为“完全虚假”。CENTCOM同时确认，美军在过去一周内已摧毁10艘伊朗油轮，作为对伊朗袭击美舰企图的回应。",
      verification: "confirmed",
      timestamp: "2026-09-09T22:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方正在进行直接、多战线的军事交火，包括海上舰船对抗与陆上基地打击。",
      "伊朗首次使用弹道导弹打击并命中第三国境内的美军资产，标志着冲突地域和烈度的重大升级。",
      "所有关键外交渠道（IAEA）均已关闭，局势进入纯粹的军事逻辑驱动阶段，无任何有效的降级机制。"
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
        "变化：伊朗对美国在第三国（约旦）的军事基地发动直接弹道导弹攻击，并成功造成美方装备损失，表明冲突已进入无限制的直接军事对抗层面。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：通过霍尔木兹海峡的商业航运流量持续处于极低水平，远低于近期平均值，表明该关键水道的商业通行已基本停滞。",
        "变化：伊朗威胁扩大禁航区进一步恶化了局势。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：直接军事冲突的加剧导致市场对供应的担忧急剧升温，布伦特原油价格稳定在100美元/桶以上，并持续上行，完全符合危机驱动的油价模式。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国军方（中央司令部）直接参与并指挥了对伊朗油轮等目标的军事打击，并防御伊朗的导弹攻击，构成大国直接参与作战行动。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国旨在通过“极限经济压力”和军事打击彻底削弱伊朗的地区影响力及核能力，而伊朗则试图通过不对称军事行动打破封锁并迫使美国付出高昂代价。"
    ],
    military: [
      "美国利用其海空军优势执行对伊朗港口的封锁并打击伊朗海上资产，而伊朗则利用弹道导弹、无人机和代理人网络攻击美军基地和航运，试图形成非对称威慑。"
    ]
  },
  scoreTrend: [
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88,
      active: true
    }
  ],
  investmentSignal: "→ 风险敞口维持高度防御姿态，地缘溢价驱动能源与大宗商品对冲需求。",
  prevRiskScore: 84,
  keyChange: "24h要点：详见事件与因子。",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price September 10 2026 range trend",
    "US Iran conflict update September 10 2026",
    "Strait of Hormuz shipping status September 10 2026 latest news",
    "US military posture CENTCOM Iran September 10 2026",
    "Iran diplomatic statements September 10 2026",
    "US sanctions on Iran update September 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-10",
  version: "v2.184",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D194",
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
      value: "WTI $95-97 · Brent $101-103",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Traffic Status",
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
      description: "Iran's direct ballistic missile attack on a U.S. military base in a third country (Jordan), which successfully caused damage to U.S. assets, indicates the conflict has entered a phase of unrestricted direct military confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels, far below recent averages, indicating commercial transit has nearly halted. Iran's threat to expand its no-go zone exacerbates the situation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The intensification of direct military conflict has led to a sharp increase in market fears over supply, with Brent crude prices stabilizing above $100/bbl and continuing to rise, fitting a crisis-driven oil price pattern.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. military (via CENTCOM) is directly participating in and commanding military strikes against Iranian targets such as oil tankers, and defending against Iranian missile attacks, constituting direct great power participation in combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "The IAEA Board of Governors voted to refer Iran's nuclear file to the UN Security Council, marking the closure of a key diplomatic channel for mediation through international organizations, with both sides adopting fully hardened stances.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "evt-20260910-1",
      title: "Iranian Missiles Strike U.S. Base in Jordan, Causing Damage",
      description: "Iran launched ballistic missiles at Muwaffaq Salti Air Base in Jordan, which hosts U.S. forces. According to U.S. officials speaking to outlets like Fox News, the attack damaged several U.S. military aircraft, including an A-10 and multiple F-15s. The Jordanian military reported intercepting most of the incoming missiles.",
      verification: "confirmed",
      timestamp: "2026-09-10T05:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20260910-2",
      title: "Brent Crude Oil Price Surpasses $102 per Barrel",
      description: "Amid escalating military actions between the U.S. and Iran, market concerns over Middle East oil supply disruptions have intensified, driving international oil prices higher. Brent crude futures climbed above $102 per barrel, reaching a multi-month high.",
      verification: "confirmed",
      timestamp: "2026-09-10T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260910-3",
      title: "IAEA Refers Iran's Nuclear File to UN Security Council",
      description: "The International Atomic Energy Agency (IAEA) board voted to refer Iran to the UN Security Council for its nuclear \"non-compliance.\" The move, the first in nearly two decades, marks a major setback for diplomatic efforts through the IAEA channel. Iran condemned the resolution as a result of U.S. pressure.",
      verification: "confirmed",
      timestamp: "2026-09-09T20:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20260910-4",
      title: "Shipping Traffic in Strait of Hormuz Remains at Extremely Low Levels",
      description: "According to shipping tracker data cited by Reuters, only seven commercial vessels transited the Strait of Hormuz on Sept. 9, far below the already suppressed 10-day average of about 14. Shipping remains severely restricted as Iran announces plans to expand its maritime \"no-go zone.\"",
      verification: "confirmed",
      timestamp: "2026-09-10T07:30:00Z",
      significance: ""
    },
    {
      id: "evt-20260910-5",
      title: "U.S. Military Denies Warship Damage, Confirms Continued Strikes on Iranian Tankers",
      description: "In response to claims by Iran's IRGC of having heavily damaged U.S. warships, U.S. Central Command (CENTCOM) issued a statement denying the claims as \"completely FALSE.\" CENTCOM also confirmed that U.S. forces have destroyed 10 Iranian tankers over the past week in response to attempted attacks on U.S. vessels.",
      verification: "confirmed",
      timestamp: "2026-09-09T22:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "U.S. and Iranian forces are engaged in direct, multi-front military exchanges, including naval confrontations and strikes on land-based assets.",
      "Iran's first use of ballistic missiles to successfully strike U.S. assets in a third country marks a major escalation in the conflict's geography and intensity.",
      "All key diplomatic channels (IAEA) have closed, leaving the situation driven purely by military logic with no effective de-escalation mechanisms."
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
        "Change: Iran's direct ballistic missile attack on a U.S.",
        "Change: military base in a third country (Jordan), which successfully caused damage to U.S.",
        "Change: assets, indicates the conflict has entered a phase of unrestricted direct military confrontation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels, far below recent averages, indicating commercial transit has …",
        "Change: Iran's threat to expand its no-go zone exacerbates the situation."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The intensification of direct military conflict has led to a sharp increase in market fears over supply, with Brent crude prices stabilizing above $100…"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S.",
        "Change: military (via CENTCOM) is directly participating in and commanding military strikes against Iranian targets such as oil tankers, and defending against …"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to cripple Iran's regional influence and nuclear capabilities through 'maximum economic pressure' and military strikes, while Iran seeks to break the blockade and impose high costs on the U.S. through asymmetric military actions."
    ],
    military: [
      "The U.S. is leveraging its naval and air superiority to enforce a blockade on Iranian ports and strike Iranian maritime assets, while Iran uses its ballistic missiles, drones, and proxy networks to attack U.S. bases and shipping, attempting to create an asymmetric deterrent."
    ]
  },
  scoreTrend: [
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88,
      active: true
    }
  ],
  investmentSignal: "→ Maintain a highly defensive risk posture; geopolitical premiums drive hedging demand in energy and commodities.",
  prevRiskScore: 84,
  keyChange: "24h: See events and factors.",
  webSources: [],
  webSearchQueries: [
    "WTI Brent crude oil price September 10 2026 range trend",
    "US Iran conflict update September 10 2026",
    "Strait of Hormuz shipping status September 10 2026 latest news",
    "US military posture CENTCOM Iran September 10 2026",
    "Iran diplomatic statements September 10 2026",
    "US sanctions on Iran update September 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.184 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（↑4）：24h要点：详见事件与因子。",
    bannerWarning: "→ 风险敞口维持高度防御姿态，地缘溢价驱动能源与大宗商品对冲需求。",
    deescalationIntent: "美国旨在通过“极限经济压力”和军事打击彻底削弱伊朗的地区影响力及核能力，而伊朗则试图通过不对称军事行动打破封锁并迫使美国付出高昂代价。",
    structuralRisk: "通过霍尔木兹海峡的商业航运流量持续处于极低水平，远低于近期平均值，表明该关键水道的商业通行已基本停滞。伊朗威胁扩大禁航区进一步恶化了局势。",
    contradictionNote: "美国旨在通过“极限经济压力”和军事打击彻底削弱伊朗的地区影响力及核能力，而伊朗则试图通过不对称军事行动打破封锁并迫使美国付出高昂代价。；美国利用其海空军优势执行对伊朗港口的封锁并打击伊朗海上资产，而伊朗则利用弹道导弹、无人机和代理人网络攻击美军基地和航运，试图形成非对称威慑。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第194天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.184 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (↑4): 24h: See events and factors.",
    bannerWarning: "→ Maintain a highly defensive risk posture; geopolitical premiums drive hedging demand in energy and commodities.",
    deescalationIntent: "The U.S. aims to cripple Iran's regional influence and nuclear capabilities thr…",
    structuralRisk: "Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels, far below…",
    contradictionNote: "The U.S. aims to cripple Iran's regional influence and nuclear capabilities through 'maximum economic pressure' and military strikes, while Iran seeks to break…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 194",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
