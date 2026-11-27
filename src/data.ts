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
  date: "2026-11-27",
  version: "v2.266",
  riskScore: 72,
  keyChange: "美伊博弈延续海上对抗与外围代理冲突，霍尔木兹海峡受限通行与偏强油价格局未变；综合风险分落盘 72（较昨日 持平（+0））",
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D272",
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
      value: "WTI $82.57–$86.60 · Brent $89.77–$93.14",
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
      description: "区域多战线维持交火与防空戒备，代理人远程袭扰频发，但未爆发全面地面战争。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡维持高危戒备，商业航行严重受限，通行量低于冲突前50%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "基准油价整体落入$85–100显著偏强区间，Brent稳于$90上方，地缘风险溢价坚挺。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国提供军事护航、武器援助与情报支持，维持区域前沿联合部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交接触陷入停滞，双方核心安全诉求对立严重，停火协议短期难以达成。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军中央司令部与区域盟友防空系统维持高等级拦截戒备。",
        "变化：红海及沙特沿海方向监测到零星无人机对抗活动，战术防线略有外溢。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡狭窄水域仍受制于水雷隐患与非对称快艇尾随威胁。",
        "延续：大型集装箱与液化天然气船舶大比例推迟通行计划。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：Brent原油价格稳固在$90上方，供应中断担忧抵消了宏观需求疲软。",
        "延续：炼厂原油采购附加险费率保持高位，运力成本居高不下。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊官方未出现立场软化迹象，舆论继续强化强硬威慑口吻。",
        "延续：地区第三方调解工作进展有限，缺乏具有约束力的框架草案。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "胡塞武装对沙特能源走廊实施无人机打击试探",
      description: "路透社与彭博社报道，也门胡塞武装向沙特西部和东部油运节点发射多架无人机，多数被防空系统摧毁，未造成主油港大火。",
      verification: "confirmed",
      timestamp: "2026-11-27T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "CENTCOM联合特遣舰队强化海湾巡逻机制",
      description: "美军中央司令部发布官方声明，联合盟国海军持续在霍尔木兹海峡实施反水雷与护航作业，保障核心通航信道安全。",
      verification: "confirmed",
      timestamp: "2026-11-27T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "国际基准油价保持显著偏强震荡",
      description: "OilPrice与ING分析指出，Brent原油在$89.77–$93.14高位波动，WTI运行在$82.57–$86.60，地缘风险支撑强劲。",
      verification: "confirmed",
      timestamp: "2026-11-27T17:15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方维持低烈度直接交火与高烈度海上禁运博弈。",
      "霍尔木兹通道未完全关闭但商业通行风险成本已被结构性推高。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊方解除航道威胁与限制无人机部署，伊方坚决要求先解除全面经济封锁与制裁。"
    ],
    military: [
      "常规海上护航力量难以彻底根除近岸不对称水雷、反舰导弹及无人载具的机动威胁。"
    ]
  },
  scoreTrend: [
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72
    },
    {
      date: "11-25",
      score: 72
    },
    {
      date: "11-26",
      score: 72
    },
    {
      date: "11-27",
      score: 72,
      active: true
    }
  ],
  investmentSignal: "→ 维持对冲性防御配置，增持能源大宗多头保值并防范地缘突发脉冲。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-27",
  version: "v2.266",
  riskScore: 72,
  keyChange: "US-Iran dynamics continue maritime confrontation and proxy attrition; Hormuz restrictions and firm crude prices remain steady, holding the composite; composite risk score prints at 72 (vs prior day flat (+0))",
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D272",
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
      value: "WTI $82.57–$86.60 · Brent $89.77–$93.14",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active proxy harassment and heightened air defense readiness across regional theaters, without all-out ground engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Navigation through the Strait remains severely restricted with commercial transit volumes down over 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Benchmark crude prices hold firmly in the $85–100 territory with Brent anchored above $90 amidst persistent geopolitical risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain escort patrols, intelligence sharing, and defensive deployments without deploying ground forces.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic engagement is stalled with mutual maximalist demands preventing near-term breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: U.S. CENTCOM and regional air defense units remain on elevated alert.",
        "Change: Scattered drone incursions reported along peripheral Red Sea logistics corridors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Chokepoint passage remains constrained by mine countermeasures and fast-boat surveillance.",
        "Continue: Major commercial operators continue delaying or diverting unescorted voyages."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude remains firmly supported above $90 on persistent supply risk concerns.",
        "Continue: Maritime war-risk insurance premiums remain elevated for Gulf transit routes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: No de-escalatory rhetoric observed from Washington or Tehran.",
        "Continue: Third-party mediation efforts remain exploratory without binding framework drafts."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Houthi drone attempts targeted at Saudi energy corridors",
      description: "Reuters and Bloomberg report multiple drone launches aimed at Saudi logistical points; most were intercepted by air defense systems.",
      verification: "confirmed",
      timestamp: "2026-11-27T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "CENTCOM task force maintains enhanced escort patrols in Gulf waterways",
      description: "U.S. Central Command issued a formal release confirming ongoing joint mine countermeasure operations and convoy support in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-11-27T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Benchmark crude prices hold firm in elevated trading band",
      description: "OilPrice and ING reporting shows Brent trading within $89.77–$93.14 and WTI within $82.57–$86.60 as geopolitical risks offset surplus concerns.",
      verification: "confirmed",
      timestamp: "2026-11-27T17:15:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both parties sustain low-intensity direct engagements alongside severe maritime interdiction warfare.",
      "Hormuz transit remains structurally burdened by high operational risk premiums without total closure."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "The U.S. insists on an immediate cessation of maritime threats, while Iran conditions compromises on the removal of trade blockades and sanctions."
    ],
    military: [
      "Conventional escort task forces face ongoing asymmetric challenges from mobile littoral anti-ship and drone capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72
    },
    {
      date: "11-25",
      score: 72
    },
    {
      date: "11-26",
      score: 72
    },
    {
      date: "11-27",
      score: 72,
      active: true
    }
  ],
  investmentSignal: "→ Maintain defensive hedging positions, focusing on volatility ranges in energy and commodities amid lingering geopolitical risks.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.266 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：美伊博弈延续海上对抗与外围代理冲突，霍尔木兹海峡受限通行与偏强油价格局未变；综合风险分落盘 72（较昨日 持平（+0））",
    bannerWarning: "→ 维持对冲性防御配置，增持能源大宗多头保值并防范地缘突发脉冲。",
    deescalationIntent: "美方要求伊方解除航道威胁与限制无人机部署，伊方坚决要求先解除全面经济封锁与制裁。",
    structuralRisk: "霍尔木兹海峡维持高危戒备，商业航行严重受限，通行量低于冲突前50%。",
    contradictionNote: "美方要求伊方解除航道威胁与限制无人机部署，伊方坚决要求先解除全面经济封锁与制裁。；常规海上护航力量难以彻底根除近岸不对称水雷、反舰导弹及无人载具的机动威胁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第272天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.266 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): US-Iran dynamics continue maritime confrontation and proxy attrition; Hormuz restrictions and firm crude prices remain steady, holding the …",
    bannerWarning: "→ Maintain defensive hedging positions, focusing on volatility ranges in energy and commodities amid lingering geopolit…",
    deescalationIntent: "The U.S. insists on an immediate cessation of maritime threats, while Iran cond…",
    structuralRisk: "Navigation through the Strait remains severely restricted with commercial transit volumes down over…",
    contradictionNote: "The U.S. insists on an immediate cessation of maritime threats, while Iran conditions compromises on the removal of trade blockades and sanctions.; Conventiona…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 272",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
