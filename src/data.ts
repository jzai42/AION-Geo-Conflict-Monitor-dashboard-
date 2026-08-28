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
  date: "2026-08-28",
  version: "v2.171",
  riskScore: 74,
  keyStats: [
    {
      label: "冲突天数",
      value: "D181",
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
      value: "WTI $82.20–$84.50 · Brent $86.50–$88.40",
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
      description: "代理冲突持续，海域直接交火处于间歇期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "流量仍受严重限制，保险成本未见回落。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3.5,
      weight: 0.2,
      description: "油价中枢小幅下行，市场定价反映出对需求端的担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方维持区域震慑，外部大国处于观察期。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "虽有第三方调解，但核心利益分歧巨大，突破性进展可能性低。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "卡塔尔提交海上安全框架草案",
      description: "多哈当局正努力在美伊之间建立一个针对民用航运的安全「绿灯」机制，试图隔离冲突对物流的影响。",
      verification: "confirmed",
      timestamp: "2026-08-28",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊拉克西部民兵据点遭空袭",
      description: "多枚导弹击中亲伊武装的无人机仓库，虽无组织宣称负责，但加剧了区域紧张。",
      verification: "confirmed",
      timestamp: "2026-08-28",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "代理冲突取代直接对抗成为主要消耗手段",
      "霍尔木兹海峡维持长期非正式封锁状态",
      "能源溢价从「恐慌驱动」向「结构性溢价」转型"
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
        "延续：伊拉克与叙利亚境内的代理人骚扰射击频繁。",
        "延续：美军拦截了多架试图穿越红海的单向攻击无人机。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡主要通航道仍受限，通行需提前数日预约护航。",
        "变化：24小时内未发生商船被扣押的新突发事件。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油多头头寸部分平仓，地缘溢价回落至每桶$10以内。",
        "延续：美国战略储备补库节奏维持放缓。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗外交部措辞从积极进攻转向「战略防御」。",
        "延续：美方维持制裁力度，暂无豁免政策释放。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求全面解除制裁与美方要求停止代理人攻击的死结",
      "区域内盟友对美方保护承诺的持久性存疑"
    ],
    military: [
      "不对称作战手段（无人机/快艇）对传统大型舰艇编队的持续压力",
      "代理人自主行动可能引发的主权国家非预期卷入"
    ]
  },
  scoreTrend: [
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74,
      active: true
    }
  ],
  keyChange: "能源溢价收缩带动综合风险指数缓步下行",
  investmentSignal: "→ 维持防御部位，对冲能源风险资产。",
  change: "down",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-28",
  version: "v2.171",
  riskScore: 74,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D181",
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
      value: "WTI $82.20–$84.50 · Brent $86.50–$88.40",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Proxy conflicts persist while direct naval engagement is in an intermittent phase.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic remains severely restricted; insurance costs show no sign of retreat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices drift lower as market pricing reflects demand-side concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains regional deterrence; other major powers remain in an observation period.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Mediators active but core interests remain deadlocked; high risk of breakdown.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Qatar Proposes Maritime Safety Framework",
      description: "Doha is attempting to establish a 'Green Light' mechanism for civilian shipping to insulate logistics from conflict.",
      verification: "confirmed",
      timestamp: "2026-08-28",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Air Strikes on Militia Hubs in Western Iraq",
      description: "Missiles hit drone storage facilities of Iran-aligned groups, exacerbating regional tensions despite no claims of responsibility.",
      verification: "confirmed",
      timestamp: "2026-08-28",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Proxy conflict replaces direct confrontation as the primary tool of attrition",
      "Informal blockade of Hormuz becomes a structural long-term reality",
      "Energy premium shifts from panic-driven to structural risk pricing"
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
        "Continue: Frequent proxy harassment in Iraq and Syria.",
        "Continue: US forces intercepted OWA drones targeting Red Sea transit."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Primary shipping lanes remain restricted; escort booking required.",
        "Change: No new vessel seizures reported in the last 24 hours."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Long positions unwinding as geopolitical premium drops below $10/bbl.",
        "Continue: US SPR replenishment remains at a slow pace."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian MoFA shifts rhetoric from offensive to 'strategic defense'.",
        "Continue: US sanctions remain firm with no signs of waivers."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Deadlock between Iranian demands for sanction relief and US demands to end proxy attacks.",
      "Allied doubts regarding the longevity of US security commitments."
    ],
    military: [
      "Asymmetric threats (drones/fast boats) pressuring traditional carrier strike groups.",
      "Risk of unintentional escalation via autonomous proxy actions."
    ]
  },
  scoreTrend: [
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74,
      active: true
    }
  ],
  keyChange: "Energy premium contraction drives a slow descent in the composite risk index.",
  investmentSignal: "→ Maintain defensive posture, hedge energy exposure.",
  change: "down",
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.171 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↓2）：能源溢价收缩带动综合风险指数缓步下行",
    bannerWarning: "→ 维持防御部位，对冲能源风险资产。",
    deescalationIntent: "伊朗要求全面解除制裁与美方要求停止代理人攻击的死结",
    structuralRisk: "流量仍受严重限制，保险成本未见回落。",
    contradictionNote: "伊朗要求全面解除制裁与美方要求停止代理人攻击的死结；不对称作战手段（无人机/快艇）对传统大型舰艇编队的持续压力",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第181天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.171 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↓2): Energy premium contraction drives a slow descent in the composite risk index.",
    bannerWarning: "→ Maintain defensive posture, hedge energy exposure.",
    deescalationIntent: "Deadlock between Iranian demands for sanction relief and US demands to end prox…",
    structuralRisk: "Traffic remains severely restricted; insurance costs show no sign of retreat.",
    contradictionNote: "Deadlock between Iranian demands for sanction relief and US demands to end proxy attacks.; Asymmetric threats (drones/fast boats) pressuring traditional carrie…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 181",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
