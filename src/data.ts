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
  date: "2026-07-07",
  version: "v2.118",
  riskScore: 62,
  change: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D129",
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
      value: "WTI $78.15–$79.42 · Brent $82.31–$83.56",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军在红海区域拦截多架攻击无人机，地面战线维持低烈度对峙。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗海军在海峡核心区域演习，商船采取规避航线。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1.5,
      prev: 1,
      weight: 0.2,
      description: "国际油价稳步回升至 $80 附近，反映地缘溢价重新注入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方通过金融制裁与军事部署双重手段对伊朗施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "外交渠道维持低频沟通，无实质性突破信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美财政部制裁「幽灵船队」",
      description: "制裁对象包括多家位于第三国的航运实体，涉嫌通过转运手段逃避原油出口制裁。来源：Reuters。",
      verification: "confirmed",
      timestamp: "09:15 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗海上实弹演习",
      description: "演习覆盖霍尔木兹海峡关键航段，IRGC 出动了具备自杀式攻击能力的快速艇。来源：AP。",
      verification: "confirmed",
      timestamp: "04:30 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "制裁深度化取代大规模交火成为博弈重心",
      "航道安全与能源价格挂钩效应增强",
      "大国通过非对称手段维持高压威慑"
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
        "延续：美军在红海维持高强度防空拦截作业。",
        "变化：伊朗海上力量在海峡入口展示进攻性部署。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：大型班轮公司继续避开高风险海域。",
        "变化：海峡内部通行保险成本因演习出现日内上涨。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 原油站稳 $80 关口，多头情绪回归。",
        "变化：美方制裁预期导致市场对供应收紧的担忧加剧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国白宫坚持「最大压力」政策不松动。",
        "变化：德黑兰声明将对航运制裁采取「对等回应」。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方金融绞杀与伊朗经济生存权的对立",
      "国际社会对航道自由与制裁有效性的平衡"
    ],
    military: [
      "美军区域威慑部署与伊朗非对称反介入能力的碰撞"
    ]
  },
  scoreTrend: [
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62,
      active: true
    }
  ],
  keyChange: "能源因素与制裁加码共同驱动风险值回升至近期高点。",
  investmentSignal: "→ 增持能源及大宗商品对冲，对风险资产持防御立场",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-07-07",
  version: "v2.118",
  riskScore: 62,
  change: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D129",
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
      value: "WTI $78.15–$79.42 · Brent $82.31–$83.56",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
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
      description: "US forces intercepted multiple attack drones in the Red Sea; frontline remains in low-intensity standoff.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iranian naval drills in key areas forced commercial vessels to adopt evasive routing.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1.5,
      prev: 1,
      weight: 0.2,
      description: "Oil prices recovered toward $80 as geopolitical premiums were re-injected.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains pressure through both financial sanctions and military deployments.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Diplomatic channels remain low-frequency with no signs of breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Treasury Sanctions 'Ghost Fleet'",
      description: "Sanctions target shipping entities in third countries suspected of evading crude export bans. Source: Reuters.",
      verification: "confirmed",
      timestamp: "09:15 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iranian Live-Fire Naval Drills",
      description: "Exercises covered critical Hormuz segments with IRGC deploying kamikaze fast boats. Source: AP.",
      verification: "confirmed",
      timestamp: "04:30 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Deepening sanctions replace large-scale combat as the strategic focus",
      "Maritime security increasingly linked to energy price volatility",
      "Great powers use asymmetric tools to maintain high-pressure deterrence"
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
        "Continue: US forces maintain high-intensity air defense operations in the Red Sea.",
        "Change: Iranian naval forces display offensive deployments at the entrance of the Strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major shipping lines continue to bypass high-risk waters.",
        "Change: Intraday rise in insurance costs for transit due to naval exercises."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent oil stabilizes above $80 mark as bullish sentiment returns.",
        "Change: Market concerns over supply tightening intensify due to sanction expectations."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House maintains 'maximum pressure' policy without easing.",
        "Change: Tehran declares it will provide a 'reciprocal response' to shipping sanctions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Contradiction between US financial strangulation and Iran's economic survival",
      "Balance between international freedom of navigation and sanction effectiveness"
    ],
    military: [
      "Clash between US regional deterrence and Iran's asymmetric anti-access capabilities"
    ]
  },
  scoreTrend: [
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62,
      active: true
    }
  ],
  keyChange: "Energy factors and increased sanctions drive the risk score back to recent highs.",
  investmentSignal: "→ Increase holdings in energy and commodities for hedging; maintain defensive posture on risk assets",
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.118 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 62（↑2）：能源因素与制裁加码共同驱动风险值回升至近期高点。",
    bannerWarning: "→ 增持能源及大宗商品对冲，对风险资产持防御立场",
    deescalationIntent: "美方金融绞杀与伊朗经济生存权的对立",
    structuralRisk: "伊朗海军在海峡核心区域演习，商船采取规避航线。",
    contradictionNote: "美方金融绞杀与伊朗经济生存权的对立；美军区域威慑部署与伊朗非对称反介入能力的碰撞",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第129天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.118 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 62 (↑2): Energy factors and increased sanctions drive the risk score back to recent highs.",
    bannerWarning: "→ Increase holdings in energy and commodities for hedging; maintain defensive posture on risk assets",
    deescalationIntent: "Contradiction between US financial strangulation and Iran's economic survival",
    structuralRisk: "Iranian naval drills in key areas forced commercial vessels to adopt evasive routing.",
    contradictionNote: "Contradiction between US financial strangulation and Iran's economic survival; Clash between US regional deterrence and Iran's asymmetric anti-access capabilit…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 129",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
