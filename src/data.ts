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
  date: "2026-11-02",
  version: "v2.241",
  conflictDays: "D247",
  riskScore: 80,
  prevRiskScore: 80,
  keyChange: "多哈间接和谈形成阶段性草案但双方立场强硬，霍尔木兹海峡商船遇袭风险未消，油价维持在百元危机带。",
  investmentSignal: "→ 维持大宗与能源资产防御性多头底仓，严格对冲风险资产敞口以防选后军事升级冲击。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D247",
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
      value: "WTI $95.16–$102.75 · Brent $103.29–$112.38",
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
      description: "美以联军与伊朗军方处于直接交火边缘，各方针对中期选举后军事行动展开高级别动员。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡受水雷布设与拦截打击影响，商业油轮正常通行实质性中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油基准价格交投于95–112美元区间，高位供应风险溢价对全球能源供应链形成持续压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接投入海空护航力量并与地区盟友紧密协作，海湾多国提供基地与中继保障。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "多哈间接接触达成初步文本传阅，但解封海峡与解除制裁先决条件对立，破裂概率高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "多哈和谈阶段性休会并转交停火草案",
      description: "路透社与美联社报道，伊朗与卡塔尔调解方结束在多哈的密集会谈并拟定草案，核心涉及霍尔木兹解封与美方港口封锁解除的对应步骤。",
      verification: "confirmed",
      timestamp: "2026-11-02 14:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡连续发生油轮触雷遇袭事件",
      description: "UKMTO与路透社报道，阿曼外海与霍尔木兹海峡东侧水域有两艘油轮分别遭遇外部投射物破坏与水雷爆炸，通航环境极度凶险。",
      verification: "confirmed",
      timestamp: "2026-11-02 08:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "美以首脑通话商讨战局走向与选后预案",
      description: "Axios与美联社引述官方消息，内塔尼亚胡在通话中促请美方在大选后对伊施加果断打击，特朗普重申暂观望多哈外交窗口反馈。",
      verification: "confirmed",
      timestamp: "2026-11-02 02:15 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "高盛上调原油基准预测并警示供应缺口",
      description: "彭博社报道，高盛将12月布伦特原油预期提升至105美元/桶，认为霍尔木兹通航停滞令全球原油地缘溢价难以在短期内消退。",
      verification: "confirmed",
      timestamp: "2026-11-02 09:45 UTC",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军战机与驱逐舰群在阿曼湾维持高度警戒态势。",
        "变化：伊朗三军统帅层接获指令，确立无地理限制报复原则。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球主流原油集装箱船东持续规避霍尔木兹航道。",
        "变化：UKMTO记录阿曼海域商船遭遇外部抛射物轻微受损。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价维持在95–112美元危机区间，炼厂现货升水居高不下。",
        "变化：盘中受和谈预期扰动小幅回调，华尔街投行上调远期风险定价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫表明在中期选举投票日前不发起新一轮全面打击。",
        "变化：伊朗外交部强调和谈进入最后阶段，核心诉求球在美方。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方以霍尔木兹海峡实际通航权与制裁解除为博弈支点展开极限施压。",
      "多哈外交轨道虽处于运转状态，但无法约束一线布雷与拦截交火。",
      "美国中期选举节点前各方保持战略威慑，选举后军事升级窗口风险陡增。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "德黑兰要求以全面解除港口封锁与制裁为海峡解封先决条件。",
      "华盛顿与特拉维夫坚持伊朗必须先行停止一切海空袭扰并重新接受核监管。"
    ],
    military: [
      "伊朗军方以不对称水雷战和反舰导弹网络牢固锁死霍尔木兹狭窄水道。",
      "美军护航力量难以在不打击伊朗本土发射阵地的前提下保障商船绝对安全。"
    ]
  },
  scoreTrend: [
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80,
      active: true
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-02",
  version: "v2.241",
  conflictDays: "D247",
  riskScore: 80,
  prevRiskScore: 80,
  keyChange: "Doha indirect talks produce a draft ceasefire framework but core disputes remain unyielding, while Hormuz mine strikes and $100+ oil crisis band persist.",
  investmentSignal: "→ Maintain defensive long hedge positions in energy and commodities assets, while strictly hedging risk assets against post-election military shocks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D247",
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
      value: "WTI $95.16–$102.75 · Brent $103.29–$112.38",
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
      description: "US-Israeli forces and Iranian military remain on high combat alert, preparing contingency options for potential post-election strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Naval mining and projectile strikes keep commercial navigation through the Strait of Hormuz de facto paralyzed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Benchmark crude trades within the $95–$112 range, maintaining substantial risk premia in the crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US Central Command actively conducts naval escort and aerial tracking with regional logistic support from Gulf allies.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Indirect talks in Doha adjourned with draft proposals circulated, but irreconcilable preconditions keep breakdown risks elevated.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Doha Talks Pause as Mediators Circulate Draft Framework",
      description: "Reuters and AP report Iranian negotiators left Qatar following three days of talks, with mediators submitting a phased reopening draft to both capitals.",
      verification: "confirmed",
      timestamp: "2026-11-02 14:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Fresh Tanker Incidents and Mine Explosions in Strait of Hormuz",
      description: "UKMTO and Reuters confirm commercial tankers were damaged by an unknown projectile and naval mines off Oman, reinforcing hazardous transit conditions.",
      verification: "confirmed",
      timestamp: "2026-11-02 08:30 UTC",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Trump and Netanyahu Discuss Strategy Ahead of US Midterms",
      description: "Axios and AP confirm a strategic phone call where Israeli leadership pushed for strikes post-election, while the White House evaluates Doha feedback.",
      verification: "confirmed",
      timestamp: "2026-11-02 02:15 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Goldman Sachs Lifts Year-End Brent Price Forecast to $105",
      description: "Bloomberg reports Goldman Sachs revised its December Brent forecast to $105/bbl, citing persistent geopolitical supply disruption allowances.",
      verification: "confirmed",
      timestamp: "2026-11-02 09:45 UTC",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US carrier strike assets and guided-missile destroyers maintain defensive stance in the Gulf of Oman.",
        "Change: Iran's military leadership issues directives for geographically unrestricted retaliation if attacked."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major international tanker operators maintain full suspension of standard Hormuz transits.",
        "Change: UKMTO logs external projectile impact on a merchant vessel off the coast of Lima, Oman."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Crude prices oscillate in the $95–$112 crisis zone with persistent prompt physical tightness.",
        "Change: Diplomatic headlines drove temporary intraday pullbacks while Wall Street banks raised medium-term price floors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The White House reiterates that no major kinetic operations will take place prior to election day.",
        "Change: Tehran asserts the diplomatic initiative now rests entirely with Washington's response to the Doha draft."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both parties exert maximum leverage centered around Hormuz navigation and port blockade protocols.",
      "Active diplomatic mediation in Doha remains disconnected from on-water mine warfare and kinetic interdiction.",
      "Deterrence holds narrowly before the US midterms, with high risk of renewed military campaigns post-vote."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Tehran demands unconditional lifting of maritime blockades before reopening access to the strait.",
      "Washington and Tel Aviv demand prior cessation of attacks and renewed verification mechanisms."
    ],
    military: [
      "Iran relies on asymmetric mine warfare and shoreline missile batteries to seal the waterway.",
      "US naval escorts cannot guarantee merchant ship security without striking coastal missile positions."
    ]
  },
  scoreTrend: [
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80,
      active: true
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.241 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：多哈间接和谈形成阶段性草案但双方立场强硬，霍尔木兹海峡商船遇袭风险未消，油价维持在百元危机带。",
    bannerWarning: "→ 维持大宗与能源资产防御性多头底仓，严格对冲风险资产敞口以防选后军事升级冲击。",
    deescalationIntent: "德黑兰要求以全面解除港口封锁与制裁为海峡解封先决条件。",
    structuralRisk: "霍尔木兹海峡受水雷布设与拦截打击影响，商业油轮正常通行实质性中断。",
    contradictionNote: "德黑兰要求以全面解除港口封锁与制裁为海峡解封先决条件。；伊朗军方以不对称水雷战和反舰导弹网络牢固锁死霍尔木兹狭窄水道。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第247天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.241 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Doha indirect talks produce a draft ceasefire framework but core disputes remain unyielding, while Hormuz mine strikes and $100+ oil crisis…",
    bannerWarning: "→ Maintain defensive long hedge positions in energy and commodities assets, while strictly hedging risk assets against …",
    deescalationIntent: "Tehran demands unconditional lifting of maritime blockades before reopening acc…",
    structuralRisk: "Naval mining and projectile strikes keep commercial navigation through the Strait of Hormuz de fact…",
    contradictionNote: "Tehran demands unconditional lifting of maritime blockades before reopening access to the strait.; Iran relies on asymmetric mine warfare and shoreline missile…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 247",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
