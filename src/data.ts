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
  date: "2026-05-19",
  version: "v2.69",
  riskScore: 74,
  keyStats: [
    {
      label: "冲突天数",
      value: "D80",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $92.4–$96.8 · Brent $97.5–$101.3",
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
      description: "美军艾森豪威尔号航母打击群于阿拉伯海南部展开例行巡航，美伊双方军事部署维持在打击临界状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗宣布在霍尔木兹周边进行大规模反舰演习，航道通行量已降至常态的 50% 以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "原油价格处于危机区间，Brent 日内高点突破 $100，反映出市场对长期供应中断的极度担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "大国通过直接军事部署表达立场，目前暂无退出前线部署迹象，外交施压已接近极限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IAEA 浓缩铀库存报告加剧了双方的不信任感，非正式对话渠道目前基本处于冻结状态。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军航母打击群阿拉伯海就位",
      description: "艾森豪威尔号航母打击群在阿拉伯海南部展开军事威慑，防备伊朗潜在的无人机袭击（DoD 证实）。",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗宣布霍尔木兹海域军事演习",
      description: "伊朗革命卫队在霍尔木兹海峡入口部署岸基导弹，并向过往商船发出安全警告（IRNA 报道）。",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Brent 原油突破 100 美元大关",
      description: "受地缘政治溢价推动，布伦特原油价格一度升至 $101.3/桶，市场恐慌情绪升温（Bloomberg 数据）。",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-04",
      title: "IAEA 机密报告证实伊朗核提速",
      description: "最新监测显示伊朗 60% 浓缩铀库存增加，进一步压缩了外交斡旋空间（WSJ 援引内源）。",
      verification: "single",
      timestamp: "2026-05-19",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接军事对抗风险处于年内最高值",
      "霍尔木兹海峡由单纯骚扰转为系统性准封锁",
      "能源市场正式计入战争溢价"
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
        "延续：美伊双方在波斯湾外围维持高度戒备，未发生直接交火。",
        "变化：伊朗新增反舰导弹阵地部署至海峡北岸。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：多间国际班轮公司宣布暂停通过霍尔木兹海峡，保费上涨 30%。",
        "延续：大部分油轮选择排队或缓慢行驶以规避演习区。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 价格中枢由 $90 区间稳步跨入 $100 危机带。",
        "变化：实物原油市场出现显著的恐慌性囤货迹象。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国白宫坚持“威慑而非战争”的政策底线。",
        "变化：伊朗最高领袖办公室发表措辞强硬的演讲，强调“反击封锁”的权利。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗核计划进展与西方制裁体系的最后决裂",
      "代理人战争向直接大国对垒的结构性转化"
    ],
    military: [
      "海峡封锁战术对全球航运公权的直接挑战",
      "美军区域力量投射能力与不对称作战的长期消耗"
    ]
  },
  scoreTrend: [
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74,
      active: true
    }
  ],
  keyChange: "能源溢价突破临界点，霍尔木兹航道由干扰演变为准封锁态势。",
  investmentSignal: "→ 维持能源与风险资产防御性配置，对冲大宗商品价格波动。",
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-05-19",
  version: "v2.69",
  riskScore: 74,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D80",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $92.4–$96.8 · Brent $97.5–$101.3",
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
      description: "US Carrier Strike Group Eisenhower maneuvers in southern Arabian Sea; military readiness remains at critical threshold.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran conducts major anti-ship drills near Hormuz; traffic volume dropped below 50% of normal capacity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Crude prices in crisis zone; Brent daily high breached $100, reflecting extreme fears of supply disruption.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Direct US military deployment continues; diplomatic pressure nearing its maximum limit.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IAEA report on enrichment levels exacerbates distrust; informal dialogue remains frozen.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Carrier Group Positioned in Arabian Sea",
      description: "USS Eisenhower operates in southern Arabian Sea to deter Iranian drone threats (Confirmed by DoD).",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Announces Naval Drills in Hormuz",
      description: "IRGC deploys shore-based missiles and issues navigation warnings to merchant vessels (Reported by IRNA).",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Brent Crude Surges Past $100",
      description: "Driven by geopolitical premium, Brent crude price touched $101.3/bbl (Bloomberg Market Data).",
      verification: "confirmed",
      timestamp: "2026-05-19",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-04",
      title: "Confidential IAEA Report Leaked",
      description: "Internal monitoring confirms expansion of Iran's 60% enriched uranium stockpile (Source: WSJ).",
      verification: "single",
      timestamp: "2026-05-19",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Risk of direct US-Iran military engagement at annual high",
      "Strait of Hormuz transitioning from harassment to quasi-blockade",
      "Energy markets fully pricing in the war premium"
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
        "Continue: Both sides maintain high alert in the Persian Gulf outskirts without direct fire.",
        "Change: Iran deploys additional anti-ship missile batteries to the northern coast of the Strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Major shipping lines suspend Hormuz transit; insurance premiums surged by 30%.",
        "Continue: Majority of tankers are loitering or slowing down to avoid the exercise zones."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent price floor moved from $90 range into the $100 crisis zone.",
        "Change: Physical markets showing signs of significant panic hoarding."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House maintains 'deterrence over war' policy baseline.",
        "Change: Iranian Supreme Leader's office issues strong rhetoric regarding the right to 'counter blockades'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Final collapse of the JCPOA framework vs Western sanction regimes",
      "Structural shift from proxy wars to direct great power confrontation"
    ],
    military: [
      "Direct challenge to maritime freedom via blockade tactics",
      "Asymmetric attrition vs US regional power projection"
    ]
  },
  scoreTrend: [
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74,
      active: true
    }
  ],
  keyChange: "Energy premium breaks critical threshold; Hormuz shipping evolves into a quasi-blockade state.",
  investmentSignal: "→ Maintain defensive positioning in energy and risk-averse assets to hedge against commodity volatility.",
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.69 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↓6）：能源溢价突破临界点，霍尔木兹航道由干扰演变为准封锁态势。",
    bannerWarning: "→ 维持能源与风险资产防御性配置，对冲大宗商品价格波动。",
    deescalationIntent: "伊朗核计划进展与西方制裁体系的最后决裂",
    structuralRisk: "伊朗宣布在霍尔木兹周边进行大规模反舰演习，航道通行量已降至常态的 50% 以下。",
    contradictionNote: "伊朗核计划进展与西方制裁体系的最后决裂；海峡封锁战术对全球航运公权的直接挑战",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第80天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.69 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↓6): Energy premium breaks critical threshold; Hormuz shipping evolves into a quasi-blockade state.",
    bannerWarning: "→ Maintain defensive positioning in energy and risk-averse assets to hedge against commodity volatility.",
    deescalationIntent: "Final collapse of the JCPOA framework vs Western sanction regimes",
    structuralRisk: "Iran conducts major anti-ship drills near Hormuz; traffic volume dropped below 50% of normal capaci…",
    contradictionNote: "Final collapse of the JCPOA framework vs Western sanction regimes; Direct challenge to maritime freedom via blockade tactics",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 80",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
