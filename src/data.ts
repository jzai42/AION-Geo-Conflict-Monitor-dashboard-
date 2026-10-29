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
  date: "2026-10-29",
  version: "v2.237",
  riskScore: 82,
  riskLevel: "极高",
  keyStats: [
    {
      label: "冲突天数",
      value: "D243",
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
      value: "WTI $99.82–$102.31 · Brent $109.03–$110.99",
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
      description: "多线对峙与无人机/导弹拦截交火持续，战备警戒烈度不减。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "商业航运实际处于全面停滞与重度受阻状态，保险承保中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价虽因外交传闻短线微调，但主体稳固处于$100–120危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "主要大国保持高位情报与防空军援支持，但未触发直接多国正规军对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "外交传闻未能转变为实质协议，双方立场依然强硬。",
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
      "霍尔木兹海峡事实性断航风险仍主导全球能源与航运定价。",
      "美伊第三方试探性沟通未弥合核心停火分歧，地缘溢价难消退。"
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
        "延续：红海及也门方向防空拦截与互射持续，前线对峙维持高烈度。",
        "延续：美军战术战备状态维持不变，区域兵力部署保持戒备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商业通行基本中断，主流航运巨头持续绕航好望角。",
        "变化：护航联军实施零星编队护送，但无法改善整体通航封锁态势。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：外交斡旋传闻抑制盘中投机追涨，原油期货出现技术性高位回踩。",
        "延续：两油核心报价均处于百美元上方，全球能源危机冲击持续。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方副总统层级通过间接渠道传递接触信号，卡塔尔提交停火草案。",
        "延续：伊朗官方迅速驳斥草案内容，双方在核心安全诉求上互不妥协。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊通过第三方进行间接接触但草案遭伊方驳斥",
      description: "华尔街日报与路透社报道美方高层向伊朗安全部门传递信件，但伊朗高级官员称草案缺乏诚意并予以拒绝。",
      verification: "confirmed",
      timestamp: "2026-10-29T11:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "国际原油价格在百美元危机带高位窄幅震荡",
      description: "WTI运行于$99.82–$102.31，Brent处于$109.03–$110.99，市场权衡外交试探与霍尔木兹断供现实。",
      verification: "confirmed",
      timestamp: "2026-10-29T14:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡受阻延续且商业通航近乎瘫痪",
      description: "美联社与路透社报道海峡商业通行流量仍处于萎缩85%以上的停滞状态，战险费率维持历史峰值。",
      verification: "confirmed",
      timestamp: "2026-10-29T09:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在先停火还是先解封海峡的原则问题上互信严重缺失。"
    ],
    military: [
      "海上封锁反制与战区常态化拦截已成消耗战，缺乏安全脱离接触机制。"
    ]
  },
  scoreTrend: [
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
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82,
      active: true
    }
  ],
  keyChange: "美伊第三方外交试探遇阻，油价与海峡封锁继续钉死在极端危机区间。",
  investmentSignal: "→ 维持对冲与防御性大宗能源配置，严控风险资产敞口。",
  change: "none",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-29",
  version: "v2.237",
  riskScore: 82,
  riskLevel: "Extreme",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D243",
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
      value: "WTI $99.82–$102.31 · Brent $109.03–$110.99",
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
      description: "Multi-front standoffs and active missile/air defense engagements continue unabated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial shipping remains effectively paralyzed amid active blockade threats and frozen insurance underwriting.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Prices trimmed gains on diplomatic headlines but remain anchored inside the $100–120 crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain heavy logistical and intelligence support without direct military confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Diplomatic feelers failed to gain traction, with Tehran dismissing mediation drafts.",
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
      "Hormuz chokepoint risks remain the dominant structural driver for global crude pricing.",
      "Indirect US-Iran communication has failed to resolve root ceasefire impasses."
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
        "Continue: Multi-front air defense interception operations persist across the theater.",
        "Continue: US forward regional forces remain on high alert posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial tanker traffic remains largely halted, with sustained Cape of Good Hope diversions.",
        "Change: Naval task forces run sporadic escorted convoys without lifting the broader commercial blockade."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil futures experienced mild profit-taking on tentative diplomatic reports.",
        "Continue: Both benchmark crudes remain firmly above $100/bbl inside the severe supply shock band."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Reports surfaced of US indirect letters and Qatari-mediated draft proposals.",
        "Continue: Iranian officials rejected terms, underscoring irreconcilable positions."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Indirect Outreach Stalls as Tehran Dismisses Draft Terms",
      description: "WSJ and Reuters report US indirect communications and Qatari draft ceasefire proposals were rejected by senior Iranian leadership.",
      verification: "confirmed",
      timestamp: "2026-10-29T11:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Crude Oil Consolidates Inside $100–120 Crisis Range",
      description: "WTI ($99.82–$102.31) and Brent ($109.03–$110.99) trade tightly in the crisis band as markets weigh diplomacy rumors against supply realities.",
      verification: "confirmed",
      timestamp: "2026-10-29T14:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Hormuz Disruption Holds as Commercial Flows Remain Severely Impaired",
      description: "AP and Reuters confirm commercial shipping through the Strait remains paralyzed under war-risk insurance constraints.",
      verification: "confirmed",
      timestamp: "2026-10-29T09:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "Zero trust persists regarding sequence between maritime de-blockade and sanctions relief."
    ],
    military: [
      "Blockade attrition operations lack a viable mutual disengagement framework."
    ]
  },
  scoreTrend: [
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
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82,
      active: true
    }
  ],
  keyChange: "Indirect US-Iran diplomatic trial balloon falters; oil prices and naval standoff remain locked in severe crisis mode.",
  investmentSignal: "→ Maintain defensive hedging in energy commodities and restrict exposure to risk assets.",
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
    node406: "10月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.237 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美伊第三方外交试探遇阻，油价与海峡封锁继续钉死在极端危机区间。",
    bannerWarning: "→ 维持对冲与防御性大宗能源配置，严控风险资产敞口。",
    deescalationIntent: "美伊双方在先停火还是先解封海峡的原则问题上互信严重缺失。",
    structuralRisk: "商业航运实际处于全面停滞与重度受阻状态，保险承保中断。",
    contradictionNote: "美伊双方在先停火还是先解封海峡的原则问题上互信严重缺失。；海上封锁反制与战区常态化拦截已成消耗战，缺乏安全脱离接触机制。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第243天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.237 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Indirect US-Iran diplomatic trial balloon falters; oil prices and naval standoff remain locked in severe crisis mode.",
    bannerWarning: "→ Maintain defensive hedging in energy commodities and restrict exposure to risk assets.",
    deescalationIntent: "Zero trust persists regarding sequence between maritime de-blockade and sanctio…",
    structuralRisk: "Commercial shipping remains effectively paralyzed amid active blockade threats and frozen insurance…",
    contradictionNote: "Zero trust persists regarding sequence between maritime de-blockade and sanctions relief.; Blockade attrition operations lack a viable mutual disengagement fra…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 243",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
