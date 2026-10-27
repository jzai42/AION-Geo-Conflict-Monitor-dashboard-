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
  date: "2026-10-27",
  version: "v2.235",
  riskScore: 82,
  keyStats: [
    {
      label: "冲突天数",
      value: "D241",
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
      value: "WTI $100.08–$102.82 · Brent $109.20–$111.92",
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
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军中央司令部视察前沿维持96小时打击战备，封锁与反封锁对峙白热化",
      "霍尔木兹海峡商业通行瘫痪，国际主要航运公司持续规避波斯湾水域",
      "双方核心红线缺乏妥协空间，降级与复谈渠道处于事实破裂状态"
    ],
    note: "监测用途，不构成投资建议。"
  },
  keyChange: "美军完成前沿航母群补给并进入96小时打击戒备，霍尔木兹航运封锁与百美元油价危机带持续黏滞。",
  investmentSignal: "→ 维持能源与大宗商品核心多头头寸，增持黄金与防御类资产对冲霍尔木兹封锁带来的断供风险。",
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军保持中东前沿双航母部署与96小时打击戒备状态。",
        "延续：伊朗伊斯兰革命卫队沿岸导弹与反舰快艇保持战备戒备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商业通航严重受阻，非军方护航船只普遍停航。",
        "延续：水雷隐患与区域电子干扰严峻，航运综合保费维持极值。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与Brent主力油价稳固运行于$100–120危机带区间。",
        "延续：实物原油供应中断恐慌未退，裂解价差与现货溢价显著。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国情报部门发布安全警报并精简驻中东非必要使领馆人员。",
        "延续：伊朗领导层重申不向制裁与军事威胁妥协，官方对话停摆。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方彻底放弃高丰度铀浓缩与前沿武装支持，伊方要求无条件解除经济封锁与停止武力威慑。"
    ],
    military: [
      "美军前沿海空集群维持高度戒备封控，与伊朗依托海峡地理展开的不对称反介入威慑形成刚性对抗。"
    ]
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "路透社与美联社报道美军中央司令部维持96小时内对伊大规模打击战备，前沿部署多艘航母与两栖戒备群。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美联社与路透社报道海峡商业通行基本中断，美军护航机制仅能维持极低通量，水雷与骚扰威胁未除。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "行情显示WTI日内运行于$100.08–$102.82，Brent运行于$109.20–$111.92，维持危机带高位震荡（https://tradingeconomics.com/commodity/brent-crude-oil）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国防部官方发布与美联社报道显示，美军在中东维持超2万名水兵及海军陆战队员前沿军事威慑部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "路透社与CNN报道美伊间缺乏直接对话，调解机制未能解决浓缩铀与航行自由核心僵局，谈判破裂风险极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "event-20261027-01",
      title: "美军中央司令部视察霍尔木兹海峡并保持96小时打击戒备",
      description: "美军中央司令部司令布拉德·库珀海军上将乘机视察霍尔木兹海峡前沿，五角大楼官员透露美军已做好在接获指令后96小时内打击伊朗设施的准备（Reuters/AP）。",
      verification: "confirmed",
      timestamp: "2026-10-26T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event-20261027-02",
      title: "美国情报总监通报伊朗针对美方人员袭击图谋升级",
      description: "美国国家情报总监杰伊·克莱顿在致国务卿鲁比奥的备忘录中指出，伊朗在中东及海外策划针对美方人员的致命行动已达高级阶段，美国驻沙特使领馆已缩编人员（Reuters/Axios）。",
      verification: "confirmed",
      timestamp: "2026-10-26T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-20261027-03",
      title: "原油基准维持在百美元危机带高位震荡",
      description: "原油期货价格持续承压于中东断供恐慌，WTI区间保持在$100.08–$102.82，Brent运行于$109.20–$111.92，整体处于危机带（Yahoo Finance/Trading Economics）。",
      verification: "confirmed",
      timestamp: "2026-10-27T15:00:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-27",
  version: "v2.235",
  riskScore: 82,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D241",
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
      value: "WTI $100.08–$102.82 · Brent $109.20–$111.92",
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
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "CENTCOM commander inspects Hormuz frontline as US forces maintain 96-hour strike readiness.",
      "Commercial transit via Hormuz remains paralyzed with major global carriers avoiding Gulf waters.",
      "Core red lines show zero diplomatic compromise, leaving negotiation channels essentially severed."
    ],
    note: "For monitoring only; not investment advice."
  },
  keyChange: "US military maintains a 96-hour strike posture as Hormuz commercial transit shutdown and $100+ oil crisis band remain entrenched.",
  investmentSignal: "→ Maintain core long allocations in energy and commodities while hedging risk assets through gold and macro defensive postures.",
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US military sustains dual carrier presence and 96-hour strike readiness in the Middle East.",
        "Continue: IRGC maintains coastal missile batteries and fast-attack craft on heightened alert."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial navigation via Hormuz is severely restricted with unescorted transit halted.",
        "Continue: Severe sea mine and electronic jamming threats keep marine war-risk premiums elevated."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent benchmark crudes remain firmly anchored in the $100–120 crisis band.",
        "Continue: Structural physical supply disruption fears keep prompt spreads and risk premiums firm."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US intelligence issues alerts regarding Iranian plots and draws down non-emergency personnel.",
        "Continue: Tehran leadership rejects concessions on enrichment and sanctions, preserving diplomatic impasse."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands full cessation of high-level uranium enrichment and proxy backing, while Tehran insists on unconditional sanctions relief and an end to military coercion."
    ],
    military: [
      "Forward-deployed US naval strike groups confront Iran's asymmetric anti-access and area-denial capabilities along the maritime chokepoint."
    ]
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Reuters and AP confirm US CENTCOM maintains operational readiness to execute major strikes within 96 hours of an executive order.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "AP and Reuters report commercial maritime traffic remains severely choked, with military convoys covering less than 20% of normalized throughput.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Market quotes establish WTI trading in $100.08–$102.82 and Brent in $109.20–$111.92, consolidating near high-risk crisis bands (https://tradingeconomics.com/commodity/brent-crude-oil).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Official DoD statements and AP reports indicate over 20,000 US sailors and Marines deployed forward to project deterrence against Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Reuters and CNN report third-party mediation has failed to bridge core impasses on uranium stockpiles and naval escort terms.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "event-20261027-01",
      title: "US CENTCOM inspects Hormuz frontline and maintains 96-hour strike readiness",
      description: "CENTCOM Commander Admiral Brad Cooper visited operational units along the Strait of Hormuz as US officials confirmed forces can initiate major strikes within 96 hours of presidential approval (Reuters/AP).",
      verification: "confirmed",
      timestamp: "2026-10-26T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event-20261027-02",
      title: "US DNI memo warns of advanced Iranian plots targeting American personnel",
      description: "An unclassified memo from DNI Jay Clayton to Secretary of State Marco Rubio highlighted advanced Iranian plotting against US personnel across the region, prompting diplomatic mission drawdowns in Saudi Arabia (Reuters/Axios).",
      verification: "confirmed",
      timestamp: "2026-10-26T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-20261027-03",
      title: "Crude benchmarks consolidate within the $100+ crisis band",
      description: "Oil futures hold firm amid chokepoint shutdown fears, with WTI ranging $100.08–$102.82 and Brent tracking $109.20–$111.92 in high-risk territory (Yahoo Finance/Trading Economics).",
      verification: "confirmed",
      timestamp: "2026-10-27T15:00:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.235 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美军完成前沿航母群补给并进入96小时打击戒备，霍尔木兹航运封锁与百美元油价危机带持续黏滞。",
    bannerWarning: "→ 维持能源与大宗商品核心多头头寸，增持黄金与防御类资产对冲霍尔木兹封锁带来的断供风险。",
    deescalationIntent: "美方要求伊方彻底放弃高丰度铀浓缩与前沿武装支持，伊方要求无条件解除经济封锁与停止武力威慑。",
    structuralRisk: "美联社与路透社报道海峡商业通行基本中断，美军护航机制仅能维持极低通量，水雷与骚扰威胁未除。",
    contradictionNote: "美方要求伊方彻底放弃高丰度铀浓缩与前沿武装支持，伊方要求无条件解除经济封锁与停止武力威慑。；美军前沿海空集群维持高度戒备封控，与伊朗依托海峡地理展开的不对称反介入威慑形成刚性对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第241天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.235 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): US military maintains a 96-hour strike posture as Hormuz commercial transit shutdown and $100+ oil crisis band remain entrenched.",
    bannerWarning: "→ Maintain core long allocations in energy and commodities while hedging risk assets through gold and macro defensive p…",
    deescalationIntent: "Washington demands full cessation of high-level uranium enrichment and proxy ba…",
    structuralRisk: "AP and Reuters report commercial maritime traffic remains severely choked, with military convoys co…",
    contradictionNote: "Washington demands full cessation of high-level uranium enrichment and proxy backing, while Tehran insists on unconditional sanctions relief and an end to mili…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 241",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
