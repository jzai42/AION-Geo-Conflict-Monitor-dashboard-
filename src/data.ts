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
  date: "2026-11-10",
  version: "v2.249",
  riskScore: 68,
  change: "none",
  keyChange: "美方释出维持现状言论促使油价小幅挤出溢价，但霍尔木兹封锁对抗与谈判僵局未解，综合风险高位黏滞；综合风险分落盘 68（较昨日 -6）；调整前模型分 74（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品与能源多头仓位底仓，对冲地缘高位黏滞风险，防范谈判无果引发的二次波动。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D255",
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
      value: "WTI $83.88–$86.93 · Brent $89.15–$92.82",
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
      description: "美军与伊方进入交火战术相持，未见全面地面交战但海空警备拉满。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "海峡封锁与反封锁拉锯持续，主流商业油轮依然全面规避通航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "原油价格区间主体落在 $85–100 美元偏强带，短期回落但供应链风险溢价仍存。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接参与护航与封锁打击，域外大国限于外交与间接后勤施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "外交接触渠道存在但双方立场强硬，未达协议临界点。",
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
      "美军护航舰队与伊方常规海空军及无人巡航力量处于近距离防御对抗状态",
      "海峡航运中断已将地缘风险转化为高昂的全球物流与能源溢价成本"
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
        "延续：美军中央司令部保持高战备战术部署，未发起新一轮大规模内陆空袭。",
        "延续：伊朗保持防空导弹及反舰力量战备，前线处于零星接触与戒备相持。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业班轮运输继续大范围改道绕行好望角，通行量不足正常水平两成。",
        "变化：美军加强对试航船只的伴随护航，伊方声称实施针对性电子与无人机侦搜拦截。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普表态缓和短期升级恐慌，WTI 与 Brent 价格日内回调 1.5% 左右。",
        "延续：现货与期权市场仍计入海峡长期受阻的供应风险溢价，油价底部支撑稳固。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普受访表示无意主动扩大战事规模，强调战力已取得阶段性控制。",
        "延续：美国务院称伊朗停火条件不可接受，双方仍缺乏信任基础与谈判突破。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊朗放弃海峡封锁主张与地区威慑能力，伊方则要求全面解除经济制裁与军事围堵。"
    ],
    military: [
      "美军依赖制海制空权维持封锁通道，伊方依靠低成本不对称海空无人战术维持威慑反制。"
    ]
  },
  scoreTrend: [
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "ev-20261110-01",
      title: "特朗普公开表示无意扩大美伊战事但美军锁定戒备",
      description: "美总统特朗普在采访中称维持战事现状且暂无理由进一步升级，但强调军力处于完全戒备，国务卿鲁比奥强调谈判未至突破期。（来源：CBS News）",
      verification: "confirmed",
      timestamp: "2026-11-10T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261110-02",
      title: "五角大楼宣称控制霍尔木兹海峡通道，伊方维持拦截",
      description: "美防长赫格塞斯宣称海峡处于美军管控之下，伊朗军方则通报持续识别并阻击违规通航目标，商业通航仍陷僵局。（来源：CBS News / Bloomberg）",
      verification: "confirmed",
      timestamp: "2026-11-10T15:15:00Z",
      significance: ""
    },
    {
      id: "ev-20261110-03",
      title: "国际油价小幅挤出溢价，WTI与布伦特震荡偏强",
      description: "受美方降温言论影响，WTI 运行于 $83.88–$86.93，Brent 运行于 $89.15–$92.82，日内略有下探但仍处于偏强带。（来源：Reuters / Seeking Alpha）",
      verification: "confirmed",
      timestamp: "2026-11-10T16:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-10",
  version: "v2.249",
  riskScore: 68,
  change: "none",
  keyChange: "US leadership remarks signaling status-quo containment eased crude risk premiums slightly, while maritime blockade and diplomatic impasse keep overall composite score sticky at elevated levels; composite risk score prints at 68 (vs prior day -6); pre-adjustment model score 74 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain core long commodity and energy hedges to protect against persistent geopolitical friction and deadlock risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D255",
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
      value: "WTI $83.88–$86.93 · Brent $89.15–$92.82",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Disruption",
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
      description: "Direct tactical clashes and high-alert containment persist without full-scale ground invasion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Blockade and interdiction faceoff continues, keeping commercial transit essentially suspended.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks trade predominantly in the $85–100 firm band, with slight downward pressure as risk premiums ease.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Direct US combat deployment and naval enforcement continue, with secondary powers restricted to diplomacy and logistics.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Backchannels exist but hardline positions prevent any near-term ceasefire breakthrough.",
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
      "US naval escort patrols face persistent asymmetric Iranian drone and missile threats in the corridor",
      "The prolonged chokepoint closure translates strategic military deadlock into systemic commercial freight risk"
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
        "Continue: US CENTCOM forces maintain defensive combat posture without launching fresh interior bombing waves.",
        "Continue: Iranian air defense and coastal missile battalions remain at full readiness along the Persian Gulf littoral."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major commercial container and tanker lines divert around the Cape of Good Hope, keeping flows depressed.",
        "Change: US Navy ramps up armed escort convoys as Iran maintains drone surveillance and interdiction warnings."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US leadership status quo statements triggered a modest 1.5% pullback in spot crude risk premiums.",
        "Continue: Sustained transit disruption in the Gulf keeps structural supply floor firm above $80/bbl."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: President Trump publicly noted no immediate cause for escalating strikes beyond current operational posture.",
        "Continue: State Department dismissed Iranian preconditions as unacceptable, leaving formal diplomatic channels frozen."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US demands unrestricted maritime freedom and regional containment, whereas Iran demands full sanctions relief and blockade termination."
    ],
    military: [
      "US naval dominance relies on high-cost carrier strike group escorts, counterbalanced by Iran's low-cost asymmetric drone and mine denial network."
    ]
  },
  scoreTrend: [
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74
    },
    {
      date: "11-08",
      score: 74
    },
    {
      date: "11-09",
      score: 74
    },
    {
      date: "11-10",
      score: 68,
      active: true
    }
  ],
  events: [
    {
      id: "ev-20261110-01",
      title: "Trump Signals War at Status Quo While Military Remains Locked and Loaded",
      description: "President Trump stated in an interview that the US keeps the conflict at status quo without immediate need to escalate, while Secretary Rubio dismissed breakthrough hopes. (Source: CBS News)",
      verification: "confirmed",
      timestamp: "2026-11-10T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261110-02",
      title: "Pentagon Claims Control over Hormuz as Iranian Interdiction Persists",
      description: "Defense Secretary Hegseth asserted the US controls the Strait of Hormuz, while Iranian forces maintained daily vessel tracking and interdiction operations. (Source: CBS News / Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-11-10T15:15:00Z",
      significance: ""
    },
    {
      id: "ev-20261110-03",
      title: "Crude Benchmarks Retract Slightly Within $85–100 Band",
      description: "Following political signals of no immediate military escalation, WTI traded at $83.88–$86.93 and Brent at $89.15–$92.82, shedding some war premium. (Source: Reuters / Seeking Alpha)",
      verification: "confirmed",
      timestamp: "2026-11-10T16:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.249 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（↓6）：美方释出维持现状言论促使油价小幅挤出溢价，但霍尔木兹封锁对抗与谈判僵局未解，综合风险高位黏滞；综合风险分落盘 68（较昨日 -6）；调整前模型分 74（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品与能源多头仓位底仓，对冲地缘高位黏滞风险，防范谈判无果引发的二次波动。",
    deescalationIntent: "美方要求伊朗放弃海峡封锁主张与地区威慑能力，伊方则要求全面解除经济制裁与军事围堵。",
    structuralRisk: "海峡封锁与反封锁拉锯持续，主流商业油轮依然全面规避通航。",
    contradictionNote: "美方要求伊朗放弃海峡封锁主张与地区威慑能力，伊方则要求全面解除经济制裁与军事围堵。；美军依赖制海制空权维持封锁通道，伊方依靠低成本不对称海空无人战术维持威慑反制。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第255天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.249 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (↓6): US leadership remarks signaling status-quo containment eased crude risk premiums slightly, while maritime blockade and diplomatic impasse k…",
    bannerWarning: "→ Maintain core long commodity and energy hedges to protect against persistent geopolitical friction and deadlock risks.",
    deescalationIntent: "The US demands unrestricted maritime freedom and regional containment, whereas …",
    structuralRisk: "Blockade and interdiction faceoff continues, keeping commercial transit essentially suspended.",
    contradictionNote: "The US demands unrestricted maritime freedom and regional containment, whereas Iran demands full sanctions relief and blockade termination.; US naval dominance…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 255",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
