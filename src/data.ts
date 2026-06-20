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
  date: "2026-06-20",
  version: "v2.101",
  riskScore: 40,
  keyStats: [
    {
      label: "冲突天数",
      value: "D112",
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
      value: "WTI $78.4–$80.2 · Brent $82.5–$84.1",
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
      description: "双方均保持克制，无实弹交火记录。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "航道流量基本正常，未受地缘局势显著干扰。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "国际油价在 $75-85 美元区间内窄幅震荡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "大国维持现状，仅限于外交表态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "间接谈判持续，释放积极缓和信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "阿曼渠道间接对话推进",
      description: "伊朗官方通讯社 IRNA 证实，美伊双方正就地区安全架构通过阿曼交换书面意见。",
      verification: "confirmed",
      timestamp: "2026-06-20T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "油价进入震荡整固期",
      description: "受全球库存数据增长影响，地缘风险溢价持续缩减，WTI/Brent 区间保持稳定。",
      verification: "confirmed",
      timestamp: "2026-06-20T04:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事摩擦转向外交对峙",
      "能源市场风险预期充分定价",
      "大国均表现出避免冲突滑向全面战争的倾向"
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
        "延续：美伊双方未发生直接交火。",
        "变化：伊朗在马什哈德附近进行了防御性雷达部署演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行维持高效率，无拦截事件。",
        "延续：商业航运公司维持正常排班。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：现货溢价转为平水，显示近期供应无忧。",
        "延续：布伦特原油在 84 美元上方遭遇技术阻力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗总统在讲话中首次提到「有条件的降温」。",
        "延续：白宫保持「观察并对话」的战术耐心。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "制裁缓解的实质性步骤与核监测的对价分歧"
    ],
    military: [
      "地区代理人力量的约束机制尚未达成共识"
    ]
  },
  scoreTrend: [
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
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
      score: 40,
      active: true
    }
  ],
  keyChange: "美伊间接谈判窗口期延长，双方均表现出对既有和平红利的维护态度。",
  investmentSignal: "→ 维持风险资产配置，适度对冲能源板块下行风险。",
  change: "none",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-06-20",
  version: "v2.101",
  riskScore: 40,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D112",
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
      value: "WTI $78.4–$80.2 · Brent $82.5–$84.1",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Normal Traffic",
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
      description: "Both sides maintain restraint; no active fire reported.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Channel flow normal without significant geopolitical interference.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices consolidate within the $75-85 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Major powers maintain status quo via diplomatic rhetoric.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Backchannel talks continue, releasing de-escalation signals.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Oman-Mediated Talks Advance",
      description: "Iranian state media IRNA confirms exchange of papers on regional security via Oman.",
      verification: "confirmed",
      timestamp: "2026-06-20T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Enter Consolidation",
      description: "Geopolitical risk premium continues to fade amid global inventory growth.",
      verification: "confirmed",
      timestamp: "2026-06-20T04:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military friction shifted to diplomatic standoff",
      "Energy risk premium fully priced in",
      "Major powers leaning towards avoiding full-scale war"
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
        "Continue: No direct fire between US and Iranian forces.",
        "Change: Iran conducted defensive radar deployment drills near Mashhad."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Normal traffic flow without seizures.",
        "Continue: Commercial liners maintaining regular schedules."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spot premiums turned flat, indicating sufficient supply.",
        "Continue: Brent crude facing technical resistance above $84."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian President mentioned 'conditional de-escalation' in speech.",
        "Continue: White House maintains 'watch and wait' tactical patience."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Gap between sanction relief steps and nuclear monitoring quid-pro-quo"
    ],
    military: [
      "Lack of consensus on regional proxy force containment mechanisms"
    ]
  },
  scoreTrend: [
    {
      date: "06-16",
      score: 44
    },
    {
      date: "06-17",
      score: 40
    },
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
      score: 40,
      active: true
    }
  ],
  keyChange: "Extended window for US-Iran indirect negotiations with both sides protecting recent peace dividends.",
  investmentSignal: "→ Maintain risk asset exposure with defensive hedging in energy sectors.",
  change: "none",
  prevRiskScore: 40,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.101 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美伊间接谈判窗口期延长，双方均表现出对既有和平红利的维护态度。",
    bannerWarning: "→ 维持风险资产配置，适度对冲能源板块下行风险。",
    deescalationIntent: "制裁缓解的实质性步骤与核监测的对价分歧",
    structuralRisk: "航道流量基本正常，未受地缘局势显著干扰。",
    contradictionNote: "制裁缓解的实质性步骤与核监测的对价分歧；地区代理人力量的约束机制尚未达成共识",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第112天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.101 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): Extended window for US-Iran indirect negotiations with both sides protecting recent peace dividends.",
    bannerWarning: "→ Maintain risk asset exposure with defensive hedging in energy sectors.",
    deescalationIntent: "Gap between sanction relief steps and nuclear monitoring quid-pro-quo",
    structuralRisk: "Channel flow normal without significant geopolitical interference.",
    contradictionNote: "Gap between sanction relief steps and nuclear monitoring quid-pro-quo; Lack of consensus on regional proxy force containment mechanisms",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 112",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
