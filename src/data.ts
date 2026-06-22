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
  date: "2026-06-22",
  version: "v2.103",
  riskScore: 40,
  riskChange: "持平",
  keyStats: [
    {
      label: "冲突天数",
      value: "D114",
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
      value: "WTI $78.10–$79.80 · Brent $82.40–$84.10",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行正常",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊双方军力维持防御部署，无直接军事挑衅。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "航运流量基本正常，无扣押或暴力骚扰事件。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价整体处于$75-$85的中等稳态区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "主要大国保持外交调解，无实质性单边扩张动作。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "间接谈判渠道畅通，存在释放善意的基础。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊通过第三方渠道达成战术性默契",
      "海上摩擦受控，未影响全球能源生命线",
      "地缘溢价从大宗商品中缓慢析出"
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
        "延续：美国在东地中海维持常规航母战斗群存在。",
        "延续：伊朗伊斯兰革命卫队在沿海举行低强度防御性演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：曼德海峡及霍尔木兹海峡通行商船流量保持在去年同期水平的95%。",
        "延续：联合海事力量（CMF）定期巡逻确保航道安全。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油多头因地缘形势平淡而平仓，油价区间重心下移。",
        "延续：中东主要炼厂生产未受干扰。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方发言人重申“不寻求扩大冲突”；伊朗方面积极回应外交对话邀请。",
        "延续：非官方外交接触已连续5日无中断。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "地区安全架构主导权与反制裁博弈。",
      "阿曼渠道能否转化为正式协议的不确定性。"
    ],
    military: [
      "非对称战争威慑与常规威慑的平衡维持。"
    ]
  },
  scoreTrend: [
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40
    },
    {
      date: "06-22",
      score: 40,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊通过阿曼进行间接接触",
      description: "路透社等多源报道，美伊双方正通过阿曼传递信息以避免误判。",
      verification: "confirmed",
      timestamp: "2026-06-22 09:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "油价回落至$80下方",
      description: "WTI原油受地缘降温影响跌破$80，市场观望氛围浓厚（Bloomberg）。",
      verification: "confirmed",
      timestamp: "2026-06-22 11:30",
      significance: ""
    }
  ],
  keyChange: "美伊间接对话窗口稳定，地缘风险进入平台期。",
  investmentSignal: "→ 维持防御性头寸，建议风险资产中性配置，对冲能源溢价波动。",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-22",
  version: "v2.103",
  riskScore: 40,
  riskChange: "Stable",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D114",
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
      value: "WTI $78.10–$79.80 · Brent $82.40–$84.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Normal Passage",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Defensive postures maintained by both sides; no direct provocations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Traffic flow remains normal with no reports of seizures or harassment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices are stable within the $75-$85 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "External powers focus on diplomatic mediation without unilateral expansion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Indirect channels are active, showing potential for trust-building.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Tactical understanding reached via third-party channels",
      "Maritime friction contained without disrupting energy lifelines",
      "Geopolitical premium slowly dissipating from commodities"
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
        "Continue: Routine US carrier group presence in the Eastern Mediterranean.",
        "Continue: Low-intensity defensive drills by IRGC along the coast."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Merchant traffic through Hormuz remains at 95% of previous year levels.",
        "Continue: Combined Maritime Forces (CMF) patrolling for corridor safety."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil bulls closing positions due to de-escalating tensions.",
        "Continue: No disruption reported in major regional refineries."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US re-emphasizes 'no escalation'; Iran responds to diplomatic invites.",
        "Continue: Informal diplomatic contacts ongoing for 5 consecutive days."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Regional security architecture dominance vs. anti-sanction struggle.",
      "Uncertainty of converting the Oman channel into a formal agreement."
    ],
    military: [
      "Maintaining balance between asymmetric deterrence and conventional power."
    ]
  },
  scoreTrend: [
    {
      date: "06-18",
      score: 36
    },
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40
    },
    {
      date: "06-22",
      score: 40,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Indirect Contact in Oman",
      description: "Reuters and other sources report messages exchanged via Oman to prevent miscalculation.",
      verification: "confirmed",
      timestamp: "2026-06-22 09:00",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Dip Below $80",
      description: "WTI drops on easing geopolitical fears; market sentiment turns cautious (Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-06-22 11:30",
      significance: ""
    }
  ],
  keyChange: "Mediation channels remain stable; risk levels plateau.",
  investmentSignal: "→ Maintain defensive postures; neutral allocation on risk assets; hedge energy exposure.",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.103 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美伊间接对话窗口稳定，地缘风险进入平台期。",
    bannerWarning: "→ 维持防御性头寸，建议风险资产中性配置，对冲能源溢价波动。",
    deescalationIntent: "地区安全架构主导权与反制裁博弈。",
    structuralRisk: "航运流量基本正常，无扣押或暴力骚扰事件。",
    contradictionNote: "地区安全架构主导权与反制裁博弈。；非对称战争威慑与常规威慑的平衡维持。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第114天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.103 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): Mediation channels remain stable; risk levels plateau.",
    bannerWarning: "→ Maintain defensive postures; neutral allocation on risk assets; hedge energy exposure.",
    deescalationIntent: "Regional security architecture dominance vs. anti-sanction struggle.",
    structuralRisk: "Traffic flow remains normal with no reports of seizures or harassment.",
    contradictionNote: "Regional security architecture dominance vs. anti-sanction struggle.; Maintaining balance between asymmetric deterrence and conventional power.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 114",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
