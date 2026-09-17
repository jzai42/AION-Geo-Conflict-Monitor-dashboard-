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
  date: "2026-09-17",
  version: "v2.195",
  riskScore: 80,
  keyChange: "美伊博弈转向海运封锁定点围堵，基准油价企稳百元危机带，地缘指数小幅降至80但仍处高位黏滞。",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，对冲供应链断裂尾部风险，防范风险资产流动性回撤。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D201",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军与伊朗主要在海峡空域与近海展开无人机及导弹对抗拦截，未见战术核威胁与地面入侵，符合直接交火与多战线活跃（来源：CENTCOM、Al Jazeera）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军护航阻击与伊朗巡航袭扰并存，多艘油轮改道或滞留，主干航运流量被压制在正常水平50%以下（来源：Al Jazeera、UANI）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI日内运行于$99.10–$102.47，Brent运行于$101.55–$106.00，区间主体与上沿明确进入$100–120危机带，全球库存去化加剧（来源：Trading Economics、EIA；https://tradingeconomics.com/commodity/brent-crude-oil）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军中央司令部成建制执行区域海上封锁打击与武装护航任务，构成大国直接军事部署与常态作战介入（来源：CENTCOM、CBS News）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "双方领导人公开言论缺乏共识基础，未启动多边或双边实质停火接触，谈判陷入停滞状态（来源：CBS News、Reuters）。",
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
      "美军对进出伊朗水域油轮强化拦截，伊朗军方依托岸基火力反制，对抗重心完全聚焦于海上通道。",
      "双方战略克制避免战火蔓延至陆上民用基础设施，但海峡断航对全球贸易形成硬约束。"
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
        "变化：交火主要集中在霍尔木兹水域的无人机与反舰武器拦截，未有大规模空袭波次扩大。",
        "延续：美军在中东维持双航母战备值班与区域联合空中巡逻。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军中央司令部宣称通过护航维系关键通航，但伊朗封锁威胁仍阻止商业班轮回归。",
        "延续：国际主要集装箱与原油承运人多数维持绕行好望角航线。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：Brent原油稳固在101–106美元区间高位运行，原油实物交割与保险费率溢价高企。",
        "延续：EIA与主要跨国油企发布极低全球库存预警，基本面对百元油价形成托底支撑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：白宫重申中东护航对避免全球能源危机必不可少，同时释放接触意向但未有实质安排。",
        "延续：伊朗官方坚持要求完全解除封锁并停止敌对行动作为接触前提。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM宣称维持霍尔木兹海峡通行并反驳完全封锁",
      description: "美军中央司令部发言人确认护航持续进行，但确认海峡处于极高对抗状态并有多起袭船拦截事件（来源：Al Jazeera、CENTCOM）。",
      verification: "confirmed",
      timestamp: "2026-09-16T22:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美高层重申保卫航运决心但释放谈判意向",
      description: "白宫重申中东驻军护航关键性，特朗普与万斯发表谈话称愿见证协议达成但将继续施加极限遏制（来源：CBS News、Reuters）。",
      verification: "confirmed",
      timestamp: "2026-09-17T08:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "国际原油价格在百美元危机带保持高位震荡",
      description: "WTI与Brent主力合约在$99.10–$106.00区间波动，市场对海峡封锁常态化与库存耗尽的担忧强化风险溢价（来源：Trading Economics、EIA）。",
      verification: "confirmed",
      timestamp: "2026-09-17T13:50:00Z",
      significance: "",
      highlight: true
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方无条件开放航道并受制于经济制裁，伊朗要求全面停止军事干预与解除封锁。"
    ],
    military: [
      "美军前沿护航行动与伊朗反介入岸防体系在狭窄海峡正面接触，擦枪走火风险持续处于高位。"
    ]
  },
  scoreTrend: [
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80,
      active: true
    }
  ],
  change: "down",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-17",
  version: "v2.195",
  riskScore: 80,
  keyChange: "US-Iran standoff centers on naval blockade containment; crude anchors in $100+ crisis band as risk score eases slightly to 80.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical tail risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D201",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US forces and Iran engaged in tactical intercepts and precision strikes around chokepoints without tactical nuclear posturing or full ground invasion (Sources: CENTCOM, Al Jazeera).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US escorts operate alongside persistent Iranian interdiction; commercial transit volume remains depressed below 50% of baseline (Sources: Al Jazeera, UANI).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI ranged $99.10–$102.47 and Brent $101.55–$106.00, firmly occupying the $100–120 crisis bracket amid depleted global inventories (Sources: Trading Economics, EIA; https://tradingeconomics.com/commodity/brent-crude-oil).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US CENTCOM enforces maritime interdiction operations and direct carrier strike group patrols in contested waters (Sources: CENTCOM, CBS News).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Public rhetoric from both leaderships yields no concrete diplomatic framework or operational ceasefire channels (Sources: CBS News, Reuters).",
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
      "US enforcement of anti-smuggling interdiction confronts Iranian coastal anti-ship systems in an operational stalemate.",
      "Both parties avoid inland civilian escalation while weaponizing maritime chokepoint leverage."
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
        "Change: Tactical friction narrowed to drone and missile intercepts around naval lanes rather than broad inland strikes.",
        "Continue: US maintains forward deployment with multi-carrier presence and combat air patrols."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: CENTCOM confirmed continuous convoy operations while merchant liner rerouting remains predominant.",
        "Continue: Mainstream container lines and tankers bypass the Gulf via the Cape of Good Hope."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent trades firmly in the $101–106 corridor with elevated marine war-risk insurance premiums.",
        "Continue: EIA reports and major producers highlight dangerously depleted buffer inventories."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: White House underscored necessity of maritime protection while floating speculative deal appetite.",
        "Continue: Tehran demands unconditional cessation of naval blockade before considering formal dialogue."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM Affirms Hormuz Freedom of Navigation Amid Ongoing Blockade",
      description: "US Central Command spokesperson stated maritime traffic continues under protection while disputing Iranian claims of total control (Sources: Al Jazeera, CENTCOM).",
      verification: "confirmed",
      timestamp: "2026-09-16T22:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Officials Reiterate Maritime Protection and Diplomatic Signals",
      description: "Administration leaders warned of global crisis risks without US escorts while reiterating open lines for potential negotiations (Sources: CBS News, Reuters).",
      verification: "confirmed",
      timestamp: "2026-09-17T08:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Benchmarks Consolidate in $100+ Crisis Band",
      description: "WTI and Brent sustained elevated ranges between $99.10 and $106.00 as physical supply vulnerabilities offset diplomatic rhetoric (Sources: Trading Economics, EIA).",
      verification: "confirmed",
      timestamp: "2026-09-17T13:50:00Z",
      significance: "",
      highlight: true
    }
  ],
  coreContradiction: {
    political: [
      "Washington conditions de-escalation on Iranian maritime concessions, whereas Tehran conditions dialogue on lifting blockade."
    ],
    military: [
      "Direct proximity between US escort task forces and Iranian shore-based anti-ship complexes keeps miscalculation risk acute."
    ]
  },
  scoreTrend: [
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80,
      active: true
    }
  ],
  change: "down",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.195 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓2）：美伊博弈转向海运封锁定点围堵，基准油价企稳百元危机带，地缘指数小幅降至80但仍处高位黏滞。",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，对冲供应链断裂尾部风险，防范风险资产流动性回撤。",
    deescalationIntent: "美方要求伊方无条件开放航道并受制于经济制裁，伊朗要求全面停止军事干预与解除封锁。",
    structuralRisk: "美军护航阻击与伊朗巡航袭扰并存，多艘油轮改道或滞留，主干航运流量被压制在正常水平50%以下（来源：Al Jazeera、UANI）。",
    contradictionNote: "美方要求伊方无条件开放航道并受制于经济制裁，伊朗要求全面停止军事干预与解除封锁。；美军前沿护航行动与伊朗反介入岸防体系在狭窄海峡正面接触，擦枪走火风险持续处于高位。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第201天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.195 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓2): US-Iran standoff centers on naval blockade containment; crude anchors in $100+ crisis band as risk score eases slightly to 80.",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical tail risks.",
    deescalationIntent: "Washington conditions de-escalation on Iranian maritime concessions, whereas Te…",
    structuralRisk: "US escorts operate alongside persistent Iranian interdiction; commercial transit volume remains dep…",
    contradictionNote: "Washington conditions de-escalation on Iranian maritime concessions, whereas Tehran conditions dialogue on lifting blockade.; Direct proximity between US escor…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 201",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
