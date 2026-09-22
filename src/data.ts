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
  date: "2026-09-22",
  version: "v2.200",
  riskScore: 66,
  change: "none",
  keyChange: "联大外交试探与海峡袭船并存，综合风险分保持76分黏滞态势",
  keyStats: [
    {
      label: "冲突天数",
      value: "D206",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓10",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $89.16–$93.84 · Brent $97.44–$102.29",
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
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "美伊两军处于直接对峙与威慑交火状态，伊朗军方公开警告美方若发动新打击将招致无限制报复，战区战备等级极高（来源：Gulf News、Reuters）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "UKMTO确认油轮LR Stephanie在海峡遭抛射物袭击，商业通航量被压制在历史低位，主要班轮公司继续绕行（来源：UKMTO、JMIC）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油价格区间主体落在85–100美元/桶偏强区间，因联大接触预期与沙特部分增运，布伦特合约自百元上方温和回落（来源：Reuters、Yahoo Finance）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持舰机护航与战术预警，欧洲大国提出防御性安保协同，未演变为多大国正面交火（来源：CENTCOM、Gulf News）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "伊朗通过斡旋方提议在美方解除封锁前提下7日内开峡，但双方在先决条件上立场对立，谈判实质突破风险高（来源：Reuters、CBS News）。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "商船袭击事件持续发生，过境安全依然未获根本性保障",
      "伊方将海峡通行权作为解除经济封锁的外交博弈筹码",
      "美伊高层政治表态存在温差，缺乏互信导致缓和门槛极高"
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
        "延续：美军战术战机与护航编队持续在波斯湾执行常态化空中威慑巡逻。",
        "变化：伊朗军方声明若遭到新一轮打击将对美军在中东全部节点施加无限制报复。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主流国际航运公会对进入海峡仍维持最高风险预警并限制接单。",
        "变化：UKMTO证实LR Stephanie油轮遭遇抛射物袭击，为近期第4起商船受损。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：中东产油国备用管道与绕行港口维持满负荷运转以分流现货。",
        "变化：联大外交接触预期压制盘中投机多头，布伦特合约下探至百元下方震荡。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国行政当局重申保障国际航道自由与保护盟友安全的既定立场。",
        "变化：伊朗在联大前夕向美方提出解除港口封锁即可在7天内重开海峡的方案。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方无条件停止对航运袭扰与支持代理人",
      "伊方坚持以解除港口封锁与军事施压作为复航先决条件"
    ],
    military: [
      "美军护航防御力量无法百分之百杜绝低成本巡飞弹与无人艇突防",
      "伊朗非对称反舰火力与美军区域拒止系统形成高损耗消耗战对峙"
    ]
  },
  scoreTrend: [
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66,
      active: true
    }
  ],
  investmentSignal: "→ 维持宏观对冲与能源大宗多头底仓，逢高防御性降低风险资产敞口，规避联大政治脉冲扰动。",
  prevRiskScore: 76,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美伊两军处于直接对峙与威慑交火状态，伊朗军方公开警告美方若发动新打击将招致无限制报复，战区战备等级极高（来源：Gulf News、Reuters）",
      description: "美伊两军处于直接对峙与威慑交火状态，伊朗军方公开警告美方若发动新打击将招致无限制报复，战区战备等级极高（来源：Gulf News、Reuters）。",
      verification: "single",
      timestamp: "2026-09-22（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "UKMTO确认油轮LR Stephanie在海峡遭抛射物袭击，商业通航量被压制在历史低位，主要班轮公司继续绕行（来源：UKMTO、JMIC）",
      description: "UKMTO确认油轮LR Stephanie在海峡遭抛射物袭击，商业通航量被压制在历史低位，主要班轮公司继续绕行（来源：UKMTO、JMIC）。",
      verification: "single",
      timestamp: "2026-09-22（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-22",
  version: "v2.200",
  riskScore: 66,
  change: "none",
  keyChange: "UNGA diplomatic feelers coexist with Hormuz tanker strikes; composite risk score sticky at 76",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D206",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓10",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $89.16–$93.84 · Brent $97.44–$102.29",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "严重受限",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Direct US-Iran standoff remains acute, with Iranian military commanders vowing limitless retaliation against potential renewed US strikes (Sources: Gulf News, Reuters).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "UKMTO confirmed the tanker LR Stephanie was struck by a projectile, suppressing commercial transit to single-digit daily flows (Sources: UKMTO, JMIC).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks traded primarily within the elevated $85–100/bbl band, with Brent pulling back below $100 on diplomatic hopes (Sources: Reuters, Yahoo Finance).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US military maintains active maritime escorts and base defense, while European allies offer defensive security assistance (Sources: CENTCOM, Gulf News).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Iran proposed reopening Hormuz within 7 days if the US lifts port blockades, but mutual preconditions leave talks stalled (Sources: Reuters, CBS News).",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Persistent maritime attacks sustain severe commercial transit friction",
      "Tehran leverages maritime chokehold as collateral to negotiate sanctions relief",
      "Mutual lack of strategic trust keeps de-escalation bar exceptionally high"
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
        "Continue: US tactical air wings and naval escort groups sustain routine combat patrols in the Gulf.",
        "Change: Iranian armed forces issued an explicit warning of unconstrained retaliation if struck again."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major international shipping carriers continue to route vessels around the Cape of Good Hope.",
        "Change: UKMTO confirmed the tanker LR Stephanie sustained projectile damage, the 4th incident since Sept 17."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Regional producers run bypass pipelines at maximum capacity to preserve export continuity.",
        "Change: Diplomatic expectations ahead of UNGA talks pulled Brent futures modestly under the $100 threshold."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The US administration reiterates commitments to freedom of navigation and regional defense.",
        "Change: Iran conveyed an offer via intermediaries to reopen Hormuz within 7 days if US pressure ceases."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands an unconditional halt to Iranian maritime harassment and regional proxy funding",
      "Tehran insists on the full lifting of naval blockades and military pressure prior to corridor reopening"
    ],
    military: [
      "Coalition air defense escorts cannot achieve 100% interception against low-cost loitering munitions",
      "Iranian asymmetric coastal firepower confronts US forward posture in a protracted war of attrition"
    ]
  },
  scoreTrend: [
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76
    },
    {
      date: "09-21",
      score: 76
    },
    {
      date: "09-22",
      score: 66,
      active: true
    }
  ],
  investmentSignal: "→ Maintain defensive macro hedges and core energy commodity exposure while trimming risk assets on UNGA headline volatility.",
  prevRiskScore: 76,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Direct US-Iran standoff remains acute, with Iranian military commanders vowing limitless retali…",
      description: "Direct US-Iran standoff remains acute, with Iranian military commanders vowing limitless retaliation against potential renewed US strikes (Sources: Gulf News, Reuters).",
      verification: "single",
      timestamp: "2026-09-22 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "UKMTO confirmed the tanker LR Stephanie was struck by a projectile, suppressing commercial tran…",
      description: "UKMTO confirmed the tanker LR Stephanie was struck by a projectile, suppressing commercial transit to single-digit daily flows (Sources: UKMTO, JMIC).",
      verification: "single",
      timestamp: "2026-09-22 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.200 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 66（↓10）：联大外交试探与海峡袭船并存，综合风险分保持76分黏滞态势",
    bannerWarning: "→ 维持宏观对冲与能源大宗多头底仓，逢高防御性降低风险资产敞口，规避联大政治脉冲扰动。",
    deescalationIntent: "美方要求伊方无条件停止对航运袭扰与支持代理人",
    structuralRisk: "UKMTO确认油轮LR Stephanie在海峡遭抛射物袭击，商业通航量被压制在历史低位，主要班轮公司继续绕行（来源：UKMTO、JMIC）。",
    contradictionNote: "美方要求伊方无条件停止对航运袭扰与支持代理人；美军护航防御力量无法百分之百杜绝低成本巡飞弹与无人艇突防",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第206天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.200 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 66 (↓10): UNGA diplomatic feelers coexist with Hormuz tanker strikes; composite risk score sticky at 76",
    bannerWarning: "→ Maintain defensive macro hedges and core energy commodity exposure while trimming risk assets on UNGA headline volati…",
    deescalationIntent: "Washington demands an unconditional halt to Iranian maritime harassment and reg…",
    structuralRisk: "UKMTO confirmed the tanker LR Stephanie was struck by a projectile, suppressing commercial transit …",
    contradictionNote: "Washington demands an unconditional halt to Iranian maritime harassment and regional proxy funding; Coalition air defense escorts cannot achieve 100% intercept…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 206",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
