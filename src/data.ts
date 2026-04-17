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
  date: "2026-04-17",
  version: "v2.35",
  riskScore: 72,
  riskChange: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D48",
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
      value: "WTI $86.4–$88.9 · Brent $91.1–$93.6 · 窄幅震荡",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "许可制/部分受限",
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
      description: "代理冲突与防御性拦截并存，未见大规模地面进攻迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "实弹演习导致航道通行受限，流量降至正常水平的约80%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "价格在高位区间徘徊，市场对实质性供应中断仍持警惕态度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国维持高强度海军部署，并直接参与反导拦截任务。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交接触停滞，双方立场极端对立，无停火迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗革命卫队开始海峡实弹演习",
      description: "伊朗伊斯兰革命卫队在霍尔木兹海峡关键航道附近动用快艇及反舰导弹进行演练。Sources: Tasnim, AP.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军拦截攻击型无人机",
      description: "美国海军在红海南部摧毁4架威胁商业航运的攻击无人机。Sources: CENTCOM, Reuters.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "原油收盘呈现区间窄幅震荡",
      description: "Brent原油结算价维持在$92附近，市场消化了地缘溢价的初步冲击。Sources: Bloomberg, WSJ.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "观望跟踪",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "实弹演习成为施压新常态",
      "能源市场对常规摩擦出现脱敏现象",
      "大国军事部署已进入长期化消耗阶段"
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
        "延续：美海军第五舰队维持在阿曼湾的高戒备态势。",
        "变化：伊朗革命卫队实施短期实弹演习，导致商业航道部分转向。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗实弹演习划定禁航区，导致当日通过量下降约15-20%。",
        "延续：主要商业班轮公司避开受影响海道，推高了区域性战争险保费。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价在$90美元附近寻求技术性支撑，基本面暂无新增缺口。",
        "变化：短期内因避险情绪，远期合约溢价小幅攀升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰重申对海峡的主权控制权。",
        "延续：美国白宫表示将采取一切必要手段确保航行自由。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的地区主权宣称与美国“自由航行”权的直接碰撞。",
      "双方均面临国内强硬派压力，缺乏让步空间。"
    ],
    military: [
      "防区外打击（无人机/导弹）与即时反导拦截之间的技术博弈。"
    ]
  },
  scoreTrend: [
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突态势从快速升级转向高位僵持。虽然演习增加了摩擦面，但各方表现出避免全面开战的克制，市场溢价暂时企稳。",
  investmentSignal: "→ 维持防御性配置，通过能源ETF与贵金属对冲地缘政治尾部风险，减持对利率敏感的风险资产。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-04-17",
  version: "v2.35",
  riskScore: 72,
  riskChange: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D48",
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
      value: "WTI $86.4–$88.9 · Brent $91.1–$93.6 · 窄幅震荡",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Permit-based / Partial Restriction",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy conflicts and defensive interceptions continue with no signs of large-scale ground offensive.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Live-fire drills restricted lane passage, reducing volume to ~80% of normal.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices hovering in a high range; markets remain cautious regarding supply disruptions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains high-intensity naval deployment and direct anti-missile roles.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic engagement is stalled with extreme polarization; no ceasefire in sight.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "IRGC Begins Strait Live-Fire Drills",
      description: "Iran's Revolutionary Guard utilizes fast boats and anti-ship missiles near critical sea lanes. Sources: Tasnim, AP.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Forces Intercept Attack UAVs",
      description: "US Navy destroyed 4 attack drones in the Southern Red Sea threatening commercial shipping. Sources: CENTCOM, Reuters.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Oil Prices Close with Rangebound Fluctuations",
      description: "Brent stays near $92 as market absorbs initial geopolitical risk premium shocks. Sources: Bloomberg, WSJ.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Watchful Drift",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Live-fire drills becoming a new normal of pressure",
      "Energy markets showing desensitization to routine friction",
      "Major power military posture entering long-term attrition phase"
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
        "Continue: US Fifth Fleet maintains high alert status in the Gulf of Oman.",
        "Change: IRGC live-fire drills cause partial redirection of commercial shipping."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: IRGC drills designated no-go zones, causing a 15-20% drop in daily throughput.",
        "Continue: Major liners bypass affected lanes, pushing up regional war insurance premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil seeks technical support around $90 with no new supply gaps in fundamentals.",
        "Change: Forward contract premiums rise slightly due to short-term hedging."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran reaffirms sovereign control over the Strait.",
        "Continue: White House states it will take all necessary measures to ensure freedom of navigation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between Iran's sovereign claims and US 'Freedom of Navigation' rights.",
      "Both sides face domestic hardliner pressure with little room for compromise."
    ],
    military: [
      "Technical game between standoff strikes (UAVs/Missiles) and real-time interception."
    ]
  },
  scoreTrend: [
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72,
      active: true
    }
  ],
  keyChange: "Conflict posture shifted from rapid escalation to a high-level stalemate. Drills increased friction, but restraint remains to avoid all-out war.",
  investmentSignal: "→ Maintain defensive positioning, hedge tail risks via Energy ETFs and Precious Metals, reduce exposure to interest-rate sensitive risk assets.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.35 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：冲突态势从快速升级转向高位僵持。虽然演习增加了摩擦面，但各方表现出避免全面开战的克制，市场溢价暂时企稳。",
    bannerWarning: "→ 维持防御性配置，通过能源ETF与贵金属对冲地缘政治尾部风险，减持对利率敏感的风险资产。",
    deescalationIntent: "伊朗的地区主权宣称与美国“自由航行”权的直接碰撞。",
    structuralRisk: "实弹演习导致航道通行受限，流量降至正常水平的约80%。",
    contradictionNote: "伊朗的地区主权宣称与美国“自由航行”权的直接碰撞。；防区外打击（无人机/导弹）与即时反导拦截之间的技术博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第48天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.35 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Conflict posture shifted from rapid escalation to a high-level stalemate. Drills increased friction, but restraint remains to avoid all-out…",
    bannerWarning: "→ Maintain defensive positioning, hedge tail risks via Energy ETFs and Precious Metals, reduce exposure to interest-rat…",
    deescalationIntent: "Clash between Iran's sovereign claims and US 'Freedom of Navigation' rights.",
    structuralRisk: "Live-fire drills restricted lane passage, reducing volume to ~80% of normal.",
    contradictionNote: "Clash between Iran's sovereign claims and US 'Freedom of Navigation' rights.; Technical game between standoff strikes (UAVs/Missiles) and real-time interceptio…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 48",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
