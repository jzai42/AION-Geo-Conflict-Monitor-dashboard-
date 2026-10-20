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
  date: "2026-10-20",
  version: "v2.228",
  keyStats: [
    {
      label: "冲突天数",
      value: "D234",
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
      value: "WTI $98.04–$101.37 · Brent $109.03–$111.96",
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
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "多条战线维持高烈度交火及大规模伤亡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "商业航运处于实质性停滞，布雷行动造成直接毁伤。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油危机溢价固化，交投区间维持在危机带水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接参与反封锁作战，俄罗斯进行高层外交介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "双方底线分歧严重，实质性谈判陷入停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "EVT-01",
      title: "IRGC水雷击中霍尔木兹过境油轮",
      description: "伊朗伊斯兰革命卫队（IRGC）官方声明称，其布设的水雷在霍尔木兹海峡南部非法过境点炸毁并逼停两艘油轮（AFP, Tasnim）。",
      verification: "confirmed",
      timestamp: "2026-10-20（当日公开报道）",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "胡塞武装导弹袭击致也门基地58死",
      description: "胡塞武装对也门沙卜瓦省的政府军训练营发动导弹袭击，造成至少58人死亡、超200人受伤，代理人战线烈度骤增（Reuters, Gulf News）。",
      verification: "confirmed",
      timestamp: "2026-10-20（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "原油地缘溢价维持危机带水平",
      description: "受中东油轮连续遇袭及沙特基建遇袭传闻影响，Brent原油稳居 $109-$111 危机区间（Reuters, Quartz）。",
      verification: "confirmed",
      timestamp: "2026-10-20（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗宣称击落美军MQ-9无人机",
      description: "伊朗防空部队宣称在霍尔木兹海峡上空击落美军一架MQ-9无人机，美军尚未对此进行官方核实（Xinhua, Tasnim）。",
      verification: "partial",
      timestamp: "2026-10-20（当日公开报道）",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理人战争与直接布雷封锁叠加，陷入相互消耗的破交战与治安战。",
      "伊朗通过常态化布雷与胡塞高强度袭击保持不对称施压。",
      "美军反封锁行动尚未能重开航道，僵局极度脆弱，系统性风险高企。"
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
        "变化：多条战线维持高烈度交火及大规模伤亡。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：商业航运处于实质性停滞，布雷行动造成直接毁伤。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油危机溢价固化，交投区间维持在危机带水平。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军直接参与反封锁作战，俄罗斯进行高层外交介入。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗将解除航运封锁的条件与美军全面撤出该地区捆绑，导致任何停火谈判缺乏起步基础。"
    ],
    military: [
      "美军的高成本反封锁护航体系与伊朗低成本、高频次的水雷及无人机破交战之间形成难以打破的消耗僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86,
      active: true
    }
  ],
  keyChange: "胡塞武装制造的大规模伤亡事件与IRGC水雷战的实锤，进一步将区域冲突固化于危机高位，和谈前景被彻底冰封。",
  investmentSignal: "→ 维持高位对冲策略，鉴于霍尔木兹海峡封锁固化且油价站稳危机带，建议超配能源与大宗商品防御地缘尾部风险。",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-20",
  version: "v2.228",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D234",
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
      value: "WTI $98.04–$101.37 · Brent $109.03–$111.96",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Fully Blockaded",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Multiple fronts maintain high-intensity crossfire and mass casualties.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial shipping is virtually paralyzed with direct casualties from mine warfare.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Geopolitical risk premium is entrenched, keeping prices firmly in the crisis zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US directly engaged in counter-blockade ops, alongside high-level Russian diplomatic intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Severe foundational differences remain, leaving substantive negotiations stalled.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "EVT-01",
      title: "IRGC mines hit transiting oil tankers in Hormuz",
      description: "An official IRGC statement confirmed that its planted naval mines blew up and halted two oil tankers at an 'illegal crossing' in the southern Strait of Hormuz (AFP, Tasnim).",
      verification: "confirmed",
      timestamp: "2026-10-20 (same-day reporting)",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Houthi missile strike kills 58 at Yemen base",
      description: "A Houthi missile attack on a government training camp in Yemen's Shabwa province killed at least 58 people and injured over 200, sharply escalating proxy warfare (Reuters, Gulf News).",
      verification: "confirmed",
      timestamp: "2026-10-20 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Oil geopolitical premium holds at crisis levels",
      description: "Driven by successive tanker attacks and rumored threats against Saudi infrastructure, Brent crude stabilized within the $109-$111 crisis zone (Reuters, Quartz).",
      verification: "confirmed",
      timestamp: "2026-10-20 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran claims downing of US MQ-9 drone",
      description: "Iranian air defense forces claimed to have shot down a US military MQ-9 drone over the Strait of Hormuz, pending official US verification (Xinhua, Tasnim).",
      verification: "partial",
      timestamp: "2026-10-20 (same-day reporting)",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Proxy warfare and direct mine blockades intertwine, trapping forces in a mutual war of attrition.",
      "Iran maintains asymmetric pressure via normalized mine-laying and high-intensity Houthi strikes.",
      "US counter-blockade operations have yet to reopen the waterway, rendering the stalemate extremely fragile."
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
        "Change: Multiple fronts maintain high-intensity crossfire and mass casualties."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Commercial shipping is virtually paralyzed with direct casualties from mine warfare."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Geopolitical risk premium is entrenched, keeping prices firmly in the crisis zone."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US directly engaged in counter-blockade ops, alongside high-level Russian diplomatic intervention."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's coupling of lifting the maritime blockade with a total US military exit strips any ceasefire negotiation of a viable starting point."
    ],
    military: [
      "An unbreakable attritional stalemate exists between high-cost US counter-blockade escorts and Iran's low-cost, high-frequency mine and drone warfare."
    ]
  },
  scoreTrend: [
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86,
      active: true
    }
  ],
  keyChange: "Mass casualties engineered by the Houthis and verified IRGC mine warfare further lock the regional conflict at a high-risk plateau, completely freezing peace prospects.",
  investmentSignal: "→ Maintain a high-level hedging strategy; given the solidified blockade in the Strait of Hormuz and oil prices entrenched in the crisis zone, it is recommended to overweight energy and commodities to defend against geopolitical tail risks.",
  change: "none",
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.228 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 86（持平）：胡塞武装制造的大规模伤亡事件与IRGC水雷战的实锤，进一步将区域冲突固化于危机高位，和谈前景被彻底冰封。",
    bannerWarning: "→ 维持高位对冲策略，鉴于霍尔木兹海峡封锁固化且油价站稳危机带，建议超配能源与大宗商品防御地缘尾部风险。",
    deescalationIntent: "伊朗将解除航运封锁的条件与美军全面撤出该地区捆绑，导致任何停火谈判缺乏起步基础。",
    structuralRisk: "商业航运处于实质性停滞，布雷行动造成直接毁伤。",
    contradictionNote: "伊朗将解除航运封锁的条件与美军全面撤出该地区捆绑，导致任何停火谈判缺乏起步基础。；美军的高成本反封锁护航体系与伊朗低成本、高频次的水雷及无人机破交战之间形成难以打破的消耗僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第234天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.228 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 86 (Flat): Mass casualties engineered by the Houthis and verified IRGC mine warfare further lock the regional conflict at a high-risk plateau, complet…",
    bannerWarning: "→ Maintain a high-level hedging strategy; given the solidified blockade in the Strait of Hormuz and oil prices entrench…",
    deescalationIntent: "Iran's coupling of lifting the maritime blockade with a total US military exit …",
    structuralRisk: "Commercial shipping is virtually paralyzed with direct casualties from mine warfare.",
    contradictionNote: "Iran's coupling of lifting the maritime blockade with a total US military exit strips any ceasefire negotiation of a viable starting point.; An unbreakable att…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 234",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
