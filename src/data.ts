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
  date: "2026-07-17",
  version: "v2.128",
  keyStats: [
    {
      label: "冲突天数",
      value: "D139",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $106.50–$109.80 · Brent $112.40–$116.10",
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
  riskScore: 92,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "发生直接导弹交换与海空交火",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡进入无限期封锁状态",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "布伦特原油区间上冲至 115 美元上方",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军直接参与作战并增派航母",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道完全瘫痪",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "波斯湾爆发直接海空对抗",
      description: "美军宙斯盾舰拦截多枚由伊朗本土及代理人发射的反舰导弹。",
      verification: "confirmed",
      timestamp: "2026-07-17T04:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗正式宣布封锁海峡",
      description: "IRGC 声明由于军事演习，任何进入霍尔木兹海峡的商船将不保证安全。",
      verification: "confirmed",
      timestamp: "2026-07-17T06:15:00Z",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接武装对抗公开化",
      "霍尔木兹海峡商业航道实质停摆",
      "能源市场由供应担忧转为物理性缺失"
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
        "变化：美军开始对伊朗境内雷达站和发射阵地进行定点清除。",
        "延续：红海及地中海周边代理人武装同步发起袭扰。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：全球各大航运商已无限期规避该航线。",
        "变化：海域战争保险溢价飙升至不可接受水平。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：现货溢价显著提升，反映对实物原油短缺的恐慌。",
        "延续：沙特及阿联酋增产能力尚未能抵消封锁缺口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方表态若威胁不消除将持续扩大打击范围。",
        "变化：德黑兰内部强硬派占据绝对主导权。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗核威慑与地区生存权",
      "美国对全球能源通道控制权的刚性维护"
    ],
    military: [
      "不对称海上封锁与航母战斗群的正面冲突"
    ]
  },
  scoreTrend: [
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92,
      active: true
    }
  ],
  keyChange: "冲突从间接对抗全面升级为以能源封锁为核心的国家间正面战争",
  investmentSignal: "→ 维持高水平对冲，减持风险资产部位，进一步增持能源与防御性大宗商品。",
  change: "up",
  prevRiskScore: 90,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-17",
  version: "v2.128",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D139",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $106.50–$109.80 · Brent $112.40–$116.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Complete Blockade",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 92,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct missile exchange and naval engagement between US and Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait is officially closed for an indefinite period.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Brent crude spiked above $115/bbl due to physical supply cut.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US directly engaged in military defense and counter-attacks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Complete breakdown of diplomatic channels.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Direct Naval-Air Confrontation in Persian Gulf",
      description: "US Aegis-class destroyers intercepted ballistic missiles fired from Iranian soil.",
      verification: "confirmed",
      timestamp: "2026-07-17T04:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Officially Blocks Hormuz",
      description: "IRGC declares maritime exclusion zone, ending commercial transit safety.",
      verification: "confirmed",
      timestamp: "2026-07-17T06:15:00Z",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Open military conflict between US and Iran",
      "Total halt of commercial transit in Hormuz",
      "Energy market shift to physical shortage pricing"
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
        "Change: US Navy begins surgical strikes on Iranian radar and launch sites.",
        "Continue: Multi-front proxy attacks in the Red Sea and Levant."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Major global carriers have indefinitely suspended Gulf routes.",
        "Change: War risk insurance premiums have reached prohibitive levels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spot premiums surge, reflecting panic over physical crude shortages.",
        "Continue: OPEC spare capacity unable to bridge the immediate blockade gap."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington vows to continue operations until threat is removed.",
        "Change: Hardliners in Tehran take absolute control of strategic decision-making."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iranian nuclear deterrence vs Regional survival",
      "US protection of global energy chokepoints"
    ],
    military: [
      "Asymmetric blockade vs Carrier Strike Group dominance"
    ]
  },
  scoreTrend: [
    {
      date: "07-13",
      score: 84
    },
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92,
      active: true
    }
  ],
  keyChange: "Escalation into a full-scale direct interstate war centered on energy blockade.",
  investmentSignal: "→ Maintain high hedging, underweight risk assets, increase exposure to energy and defensive commodities.",
  change: "up",
  prevRiskScore: 90,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.128 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 92（↑2）：冲突从间接对抗全面升级为以能源封锁为核心的国家间正面战争",
    bannerWarning: "→ 维持高水平对冲，减持风险资产部位，进一步增持能源与防御性大宗商品。",
    deescalationIntent: "伊朗核威慑与地区生存权",
    structuralRisk: "海峡进入无限期封锁状态",
    contradictionNote: "伊朗核威慑与地区生存权；不对称海上封锁与航母战斗群的正面冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第139天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.128 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 92 (↑2): Escalation into a full-scale direct interstate war centered on energy blockade.",
    bannerWarning: "→ Maintain high hedging, underweight risk assets, increase exposure to energy and defensive commodities.",
    deescalationIntent: "Iranian nuclear deterrence vs Regional survival",
    structuralRisk: "Strait is officially closed for an indefinite period.",
    contradictionNote: "Iranian nuclear deterrence vs Regional survival; Asymmetric blockade vs Carrier Strike Group dominance",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 139",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
