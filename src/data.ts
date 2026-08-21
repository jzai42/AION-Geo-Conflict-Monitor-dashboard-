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
  date: "2026-08-21",
  version: "v2.164",
  riskScore: 82,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D174",
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
      value: "WTI $94.20–$96.15 · Brent $98.40–$101.30",
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
      description: "美军驱逐舰拦截多架伊朗方向无人机，区域军事对抗维持高烈度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "保费持续上涨，商船通行需美军护航，流量维持低位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价在高位震荡，地缘溢价抵消了对全球需求放缓的担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国持续增加在波斯湾的军事部署，并与地区盟友协同防御。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗加速核活动与美方强硬立场导致外交途径彻底停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军拦截霍尔木兹海峡上空无人机",
      description: "美军驱逐舰击落了三架针对航道巡逻舰只的攻击型无人机，美方指责系伊朗所为。来源：CENTCOM。",
      verification: "confirmed",
      timestamp: "2026-08-21 04:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗宣布加速部署 IR-6 离心机",
      description: "伊朗正式告知 IAEA 正在纳坦兹增加铀浓缩能力，外界视为反制美方压力。来源：IRNA。",
      verification: "confirmed",
      timestamp: "2026-08-21 07:30",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方在霍尔木兹海峡进入海空动态拦截阶段",
      "伊朗核计划回归对抗轨道，双方外交价码大幅背离",
      "能源市场已充分定价局部军事对抗，处于危机溢价期"
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
        "变化：美军开始对霍尔木兹海峡进入商船提供实时无人机防御伞。",
        "延续：伊朗革命卫队导弹部队维持最高戒备等级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：全球主要油轮保险商将霍尔木兹海峡列为「高危限制区」。",
        "延续：海峡通行流量较冲突前水平下降约 45%。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 原油期货因供应中断担忧重新站稳 $100 整数关口。",
        "延续：主要产油国（OPEC+）保持观望，未见增产缓解压力迹象。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫声明如果外交失败，不排除采取军事干预确保航运自由。",
        "变化：伊朗议会通过法案，禁止与参与「敌对封锁」的国家进行任何接触。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求先行停止核升级与伊朗要求先行取消制裁之间的死循环",
      "伊朗国内强硬派对外交降温持彻底否定态度"
    ],
    military: [
      "美军区域防空力量与伊朗无人机饱和攻击能力的零和博弈",
      "霍尔木兹海峡主权控制权与自由航行权之间的领海主张冲突"
    ]
  },
  scoreTrend: [
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82,
      active: true
    }
  ],
  keyChange: "美军拦截行动常态化与伊朗核浓缩产能扩张共振，局势锁定在高危平台期。",
  investmentSignal: "→ 维持能源对冲与防御性配置，规避对波斯湾供应链高度依赖的工业资产。",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-08-21",
  version: "v2.164",
  riskScore: 82,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D174",
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
      value: "WTI $94.20–$96.15 · Brent $98.40–$101.30",
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
      description: "US intercept of Iranian drones confirms ongoing high-intensity kinetic friction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Shipping insurance premiums surged; transit requires US naval escort.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Crude prices remain high due to risk premiums despite macro headwinds.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US continues deploying advanced air defense and naval assets to the Gulf.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels are effectively dead with both sides hardening stances.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Intercepts Drones Over Strait of Hormuz",
      description: "US destroyer neutralized three drones launched from Iran targeting patrol vessels. Source: CENTCOM.",
      verification: "confirmed",
      timestamp: "2026-08-21 04:15",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Accelerates IR-6 Centrifuge Installation",
      description: "Tehran notified IAEA of new centrifuge deployments at Natanz facility. Source: IRNA.",
      verification: "confirmed",
      timestamp: "2026-08-21 07:30",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US-Iran maritime interceptions become a daily norm in the Strait",
      "Nuclear program returns to escalatory path with no diplomatic off-ramp",
      "Energy markets have fully priced in a persistent risk premium"
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
        "Change: US Navy begins real-time drone defense coverage for commercial vessels in transit.",
        "Continue: IRGC missile units maintain top-tier combat readiness."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Global insurers classify the Strait as a 'High-Risk Restricted Zone'.",
        "Continue: Daily transit volume remains ~45% below pre-conflict levels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude stabilizes above the $100 psychological threshold on supply fears.",
        "Continue: OPEC+ maintains a 'wait-and-see' approach with no planned output hikes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House warns military intervention remains an option to ensure navigation.",
        "Change: Iranian Parliament passes bill banning contacts with nations aiding the 'blockade'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Deadlock between US demand for nuclear freeze and Iran's demand for sanction relief",
      "Total rejection of de-escalation by hardline factions in Tehran"
    ],
    military: [
      "Zero-sum game between US air defense and Iranian drone saturation capabilities",
      "Conflicting claims over sovereignty vs. freedom of navigation in the Strait"
    ]
  },
  scoreTrend: [
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82,
      active: true
    }
  ],
  keyChange: "Normalized interceptions combined with nuclear expansion locks the crisis in a high-risk plateau.",
  investmentSignal: "→ Maintain energy hedges and defensive allocations; reduce exposure to Gulf-dependent industrial assets.",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.164 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美军拦截行动常态化与伊朗核浓缩产能扩张共振，局势锁定在高危平台期。",
    bannerWarning: "→ 维持能源对冲与防御性配置，规避对波斯湾供应链高度依赖的工业资产。",
    deescalationIntent: "美方要求先行停止核升级与伊朗要求先行取消制裁之间的死循环",
    structuralRisk: "保费持续上涨，商船通行需美军护航，流量维持低位。",
    contradictionNote: "美方要求先行停止核升级与伊朗要求先行取消制裁之间的死循环；美军区域防空力量与伊朗无人机饱和攻击能力的零和博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第174天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.164 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Normalized interceptions combined with nuclear expansion locks the crisis in a high-risk plateau.",
    bannerWarning: "→ Maintain energy hedges and defensive allocations; reduce exposure to Gulf-dependent industrial assets.",
    deescalationIntent: "Deadlock between US demand for nuclear freeze and Iran's demand for sanction re…",
    structuralRisk: "Shipping insurance premiums surged; transit requires US naval escort.",
    contradictionNote: "Deadlock between US demand for nuclear freeze and Iran's demand for sanction relief; Zero-sum game between US air defense and Iranian drone saturation capabili…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 174",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
