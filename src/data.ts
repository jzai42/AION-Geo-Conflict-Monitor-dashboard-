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
  date: "2026-04-27",
  version: "v2.45",
  riskScore: 76,
  keyStats: [
    {
      label: "冲突天数",
      value: "D58",
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
      value: "WTI $88.50–$91.20 · Brent $92.30–$95.10",
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
      prev: 4,
      weight: 0.2,
      description: "红海防御交火持续，多线代理冲突活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道维持高压对峙，通行安全极度受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在$90上方震荡，地缘溢价效应显著。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方维持航母威慑部署，介入深度保持平稳。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道进展甚微，双方立场保持强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "红海拦截无人机事件",
      description: "美军驱逐舰在红海拦截3架攻击型无人机，事件未造成人员伤亡。来源：AP、Reuters。",
      verification: "confirmed",
      timestamp: "2026-04-27T06:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC霍尔木兹海峡监视",
      description: "伊朗革命卫队宣布对美军舰队进行近距离监视，称其为正常主权防卫。来源：Al Jazeera。",
      verification: "single",
      timestamp: "2026-04-27T04:15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方保持直接交火但不扩大战线的默契",
      "霍尔木兹航道成为地缘博弈的核心支点",
      "外交谈判作为战术缓冲而非解决方案存在"
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
        "变化：红海拦截频率上升，代理人攻击手段趋向集束化。",
        "延续：伊朗保持二线部署，未直接参与前线冲突。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：电子战干扰导致的定位偏差仍是主要通行风险。",
        "延续：霍尔木兹海峡通行费率因安全成本攀升而维持高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价在$90关口形成技术支撑位，波动率维持高位。",
        "变化：部分中东石油贸易转向溢价更高的即期合约。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫重申防御承诺，排斥大规模地面介入。",
        "延续：德黑兰强调区域安全应由地区国家主导。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方海上安全承诺与伊朗海域管辖权的结构性对立",
      "代理人武装行动与大国控制力减弱的矛盾"
    ],
    military: [
      "低成本消耗性攻击对高成本拦截系统的技术压制",
      "霍尔木兹封锁威胁与全球能源链脆弱性的博弈"
    ]
  },
  scoreTrend: [
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76,
      active: true
    }
  ],
  keyChange: "冲突进入高位横盘期，红海拦截频率小幅回升但未触发层级跃迁。",
  investmentSignal: "→ 维持防御性配置，通过能源和大宗商品头寸对冲局部冲突带来的供应侧波动风险。",
  change: "none",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-27",
  version: "v2.45",
  riskScore: 76,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D58",
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
      value: "WTI $88.50–$91.20 · Brent $92.30–$95.10",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active defensive engagements in the Red Sea and proxy conflicts.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "High-pressure standoff in the strait, transit security severely limited.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices volatile above $90, geopolitical premium significant.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US carrier deployment continues as a deterrent.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels stagnant with rigid positions from both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Red Sea Drone Interception",
      description: "US destroyer intercepted 3 attack drones in the Red Sea. No casualties reported. Sources: AP, Reuters.",
      verification: "confirmed",
      timestamp: "2026-04-27T06:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC Monitoring in Hormuz",
      description: "IRGC announced close-range monitoring of US fleet, citing sovereign defense. Source: Al Jazeera.",
      verification: "single",
      timestamp: "2026-04-27T04:15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Tacit agreement on direct engagement without full escalation",
      "Hormuz remains the central pivot of geopolitical leverage",
      "Diplomatic channels serve as tactical buffers rather than solutions"
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
        "Change: Increased interception frequency in the Red Sea; proxy attacks becoming more clustered.",
        "Continue: Iran maintains second-line deployment, avoiding direct front-line conflict."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: GPS spoofing and EW interference remain primary transit risks.",
        "Continue: Transit costs remain high due to rising security and insurance expenses."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices found technical support at $90; volatility remains high.",
        "Change: Some regional crude trades shifted toward higher-premium spot contracts."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House reiterates defense commitment, ruling out large-scale ground intervention.",
        "Continue: Tehran insists regional security should be led by regional states."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Structural opposition between US maritime security and Iranian territorial jurisdiction",
      "Conflict between proxy militia autonomy and major power restraint"
    ],
    military: [
      "Low-cost attrition attacks vs. high-cost interception systems",
      "Hormuz blockade threats vs. global energy chain vulnerability"
    ]
  },
  scoreTrend: [
    {
      date: "04-23",
      score: 80
    },
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76,
      active: true
    }
  ],
  keyChange: "Conflict enters a high-level consolidation phase; Red Sea activity increased slightly but remains within thresholds.",
  investmentSignal: "→ Maintain defensive postures and hedge supply-side volatility via energy and commodities.",
  change: "none",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.45 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：冲突进入高位横盘期，红海拦截频率小幅回升但未触发层级跃迁。",
    bannerWarning: "→ 维持防御性配置，通过能源和大宗商品头寸对冲局部冲突带来的供应侧波动风险。",
    deescalationIntent: "美方海上安全承诺与伊朗海域管辖权的结构性对立",
    structuralRisk: "航道维持高压对峙，通行安全极度受限。",
    contradictionNote: "美方海上安全承诺与伊朗海域管辖权的结构性对立；低成本消耗性攻击对高成本拦截系统的技术压制",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第58天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.45 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Conflict enters a high-level consolidation phase; Red Sea activity increased slightly but remains within thresholds.",
    bannerWarning: "→ Maintain defensive postures and hedge supply-side volatility via energy and commodities.",
    deescalationIntent: "Structural opposition between US maritime security and Iranian territorial juri…",
    structuralRisk: "High-pressure standoff in the strait, transit security severely limited.",
    contradictionNote: "Structural opposition between US maritime security and Iranian territorial jurisdiction; Low-cost attrition attacks vs. high-cost interception systems",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 58",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
