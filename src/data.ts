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
  date: "2026-10-17",
  version: "v2.225",
  keyStats: [
    {
      label: "冲突天数",
      value: "D231",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑16",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $95.29–$99.34 · Brent $104.92–$110.00",
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
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "胡塞武装多枚导弹袭击亚丁港，且美军正准备对伊朗使用大型钻地弹。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航运完全封锁，伊朗军方明确将霍尔木兹海峡重新开放与美军撤离挂钩。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "WTI/Brent主体落入$100-120危机带，战时溢价仍存但暂未刺破$120极值。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "美国直接主导军事计划与打击准备，但暂无多个大国直接下场交火的新增明确证据。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4,
      weight: 0.2,
      description: "谈判陷入彻底僵局，伊朗拒绝美方最新提案，并以美军撤离为唯一前提。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  scoreTrend: [
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86,
      active: true
    }
  ],
  keyChange: "美军巨型钻地弹打击预案披露与谈判彻底破裂，导致系统性冲突风险急剧反弹至极端高位。",
  investmentSignal: "→ 维持对能源与防御性大宗商品的高位增持，以对冲极端军事行动带来的尾部风险。",
  change: "up",
  events: [
    {
      id: "EVT-01",
      title: "美军拟动用“炸弹之母”(MOAB)打击伊朗",
      description: "CBS News与五角大楼消息人士证实，白宫已制定打击伊朗地下军事设施的大型钻地弹(MOAB)投掷计划，显示直接打击烈度升级。(CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-17T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗称美军撤离是解封霍尔木兹的前提",
      description: "伊朗军方发言人明确表示，若美军不撤离中东，伊朗将维持对霍尔木兹海峡的封锁并将其“驱逐”。(Reuters, Mehr News)",
      verification: "confirmed",
      timestamp: "2026-10-17T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "胡塞武装导弹袭击也门亚丁机场",
      description: "伊朗支持的胡塞武装向也门亚丁机场发射两枚导弹，引发区域冲突扩大担忧，沙特军队亦加强拦截。(Times of India)",
      verification: "confirmed",
      timestamp: "2026-10-17T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗明确拒绝美方最新停战提案",
      description: "伊朗官方称美国提出的结束战争提案“极不充分”，总统指责美国在整个中东制造“生态灭绝”，互信荡然无存。(PBS)",
      verification: "confirmed",
      timestamp: "2026-10-17T09:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接对抗进入高烈度战术准备阶段，美军巨型钻地弹的部署意向标志着打击深度的质变。",
      "区域代理人战线（也门、红海）与主战场联动紧密，霍尔木兹海峡的地缘武器化被伊朗彻底锁定为战略筹码。",
      "谈判渠道实质性瘫痪，双方底线毫无交集，系统性冲突将在短期内维持极高烈度。"
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
        "变化：美军正准备动用包括“炸弹之母”(MOAB)在内的巨型钻地弹打击伊朗深层设施。",
        "延续：也门战线持续活跃，亚丁机场再度遭到胡塞武装导弹袭击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡维持全面封锁，商业班轮完全停摆。",
        "变化：伊朗军方首度将重新开放海峡的明确前提设定为“美军完全撤出中东”。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于供应端风险高企，Brent原油区间攀升触及$110，继续停留在危机带。",
        "延续：红海及波斯湾的石油运输中断持续向全球能源供应链施压。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗领导层维持强硬姿态，拒绝美国停战提案并指责其进行“环境种族灭绝”。",
        "变化：白宫对伊朗的威慑从外交施压转入具体的非常规武器（MOAB）战术准备。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过强硬威慑与提案逼迫伊朗妥协，而伊朗将美军完全撤离作为唯一底线。",
      "谈判渠道因互信完全破裂而实质性瘫痪，外交斡旋失去抓手。"
    ],
    military: [
      "美军常规打击手段正向使用巨型钻地弹（MOAB）等高烈度战术升级，旨在摧毁深层设施。",
      "伊朗通过代理人持续在周边区域制造非对称威胁，形成多点联动的焦土对抗。"
    ]
  },
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-17",
  version: "v2.225",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D231",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑16",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $95.29–$99.34 · Brent $104.92–$110.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Fully Blockaded",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Houthi forces launched multiple missiles at the port of Aden, and the US military is preparing to deploy massive bunker-buster bombs against Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Shipping remains completely blockaded, with Iran's military explicitly linking the reopening of the Strait of Hormuz to the withdrawal of US forces.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "WTI and Brent have largely fallen into the $100-120 crisis zone, with wartime premiums persisting but yet to breach the $120 extreme.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "The US is directly leading military plans and strike preparations, though there is no new definitive evidence of multiple major powers directly engaging in combat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4,
      weight: 0.2,
      description: "Negotiations have reached a complete impasse, with Iran rejecting the latest US proposals and insisting on US withdrawal as the sole precondition.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 86,
  scoreTrend: [
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86,
      active: true
    }
  ],
  keyChange: "The disclosure of US contingency plans for massive bunker-buster strikes and the total breakdown of negotiations have sharply rebounded systemic conflict risks to extreme highs.",
  investmentSignal: "→ Maintain an overweight position in energy and defensive commodities to hedge against tail risks from extreme military actions.",
  change: "up",
  events: [
    {
      id: "EVT-01",
      title: "US Military Prepares to Use MOAB on Iran",
      description: "CBS News and Pentagon sources confirmed that the White House has drawn up plans to drop Massive Ordnance Air Blast (MOAB) bombs on Iran's underground military facilities, indicating an escalation in direct strike intensity. (CBS News)",
      verification: "confirmed",
      timestamp: "2026-10-17T08:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Conditions Hormuz Reopening on US Withdrawal",
      description: "An Iranian military spokesperson explicitly stated that Iran will maintain its blockade of the Strait of Hormuz and \"expel\" the US unless American forces completely withdraw from the Middle East. (Reuters, Mehr News)",
      verification: "confirmed",
      timestamp: "2026-10-17T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Houthi Missiles Strike Yemen's Aden Airport",
      description: "Iran-backed Houthi forces fired two missiles at the Aden airport in Yemen, sparking fears of expanding regional conflict, while Saudi forces stepped up interceptions. (Times of India)",
      verification: "confirmed",
      timestamp: "2026-10-17T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran Explicitly Rejects Latest US Truce Proposal",
      description: "Iranian officials called the US proposal to end the war \"insufficient,\" as the president accused the US of committing \"ecocide\" across the Middle East, destroying mutual trust. (PBS)",
      verification: "confirmed",
      timestamp: "2026-10-17T09:30:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct US-Iran confrontation has entered a phase of high-intensity tactical preparation, with the US deployment intent of massive bunker-busters marking a qualitative shift in strike depth.",
      "Regional proxy fronts (Yemen, Red Sea) are tightly linked with the main battlefield, and the weaponization of the Strait of Hormuz has been fully locked in by Iran as a strategic bargaining chip.",
      "Negotiation channels are substantively paralyzed with no overlap in bottom lines, indicating that systemic conflict will maintain extremely high intensity in the short term."
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
        "Change: The US military is preparing to deploy Massive Ordnance Air Blast (MOAB) bombs to strike deep Iranian facilities.",
        "Continue: The Yemen front remains active, with the Aden airport targeted by Houthi missiles again."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The Strait of Hormuz remains completely blockaded, halting commercial shipping.",
        "Change: Iran's military explicitly conditioned the reopening of the strait on the \"complete withdrawal of US forces from the Middle East.\""
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Due to supply-side risks, Brent crude ranges $104-$110, firmly remaining in the crisis zone.",
        "Continue: Oil transport disruptions in the Red Sea and Persian Gulf continue to pressure the global energy supply chain."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian leadership maintains a hardline stance, rejecting US truce proposals and accusing the US of \"ecocide.\"",
        "Change: The White House's deterrence is shifting from diplomatic pressure to tactical preparations involving unconventional weapons like MOAB."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US is attempting to force Iran into a compromise through strong deterrence and proposals, while Iran has set the complete withdrawal of US forces as its absolute bottom line.",
      "Negotiation channels are substantively paralyzed due to a complete breakdown in mutual trust, leaving diplomatic efforts with no leverage."
    ],
    military: [
      "US conventional strike methods are escalating toward high-intensity tactics like Massive Ordnance Air Blast (MOAB) bombs aimed at destroying deep facilities.",
      "Iran continues to create asymmetric threats in surrounding regions via proxies, forming a multi-point scorched-earth confrontation."
    ]
  },
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.225 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 86（↑16）：美军巨型钻地弹打击预案披露与谈判彻底破裂，导致系统性冲突风险急剧反弹至极端高位。",
    bannerWarning: "→ 维持对能源与防御性大宗商品的高位增持，以对冲极端军事行动带来的尾部风险。",
    deescalationIntent: "美国试图通过强硬威慑与提案逼迫伊朗妥协，而伊朗将美军完全撤离作为唯一底线。",
    structuralRisk: "航运完全封锁，伊朗军方明确将霍尔木兹海峡重新开放与美军撤离挂钩。",
    contradictionNote: "美国试图通过强硬威慑与提案逼迫伊朗妥协，而伊朗将美军完全撤离作为唯一底线。；美军常规打击手段正向使用巨型钻地弹（MOAB）等高烈度战术升级，旨在摧毁深层设施。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第231天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.225 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 86 (↑16): The disclosure of US contingency plans for massive bunker-buster strikes and the total breakdown of negotiations have sharply rebounded sys…",
    bannerWarning: "→ Maintain an overweight position in energy and defensive commodities to hedge against tail risks from extreme military…",
    deescalationIntent: "The US is attempting to force Iran into a compromise through strong deterrence …",
    structuralRisk: "Shipping remains completely blockaded, with Iran's military explicitly linking the reopening of the…",
    contradictionNote: "The US is attempting to force Iran into a compromise through strong deterrence and proposals, while Iran has set the complete withdrawal of US forces as its ab…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 231",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
