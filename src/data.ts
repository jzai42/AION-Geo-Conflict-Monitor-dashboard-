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
  date: "2026-11-05",
  version: "v2.244",
  riskScore: 74,
  keyChange: "油价脱离百元关口收窄能源冲击评分，美伊围绕海峡防空与护航展开有限试探；综合风险分落盘 74（较昨日 -6）；调整前模型分 78（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持能源与大宗商品的结构性防御对冲，对风险资产避免过早激进做多，防范海峡尾部风险再次激化。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D250",
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
      value: "WTI $86.65–$90.91 · Brent $93.44–$97.85",
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
      description: "美军实施有限空袭压制伊朗沿海防空阵地，双方维持常态交火与战备接触。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡受非对称水雷与导弹威胁，国际商业船队通行近乎停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "原油两基准脱离百元危机带，区间主体落在85–100美元显著偏强区间震荡企稳。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军深度执行护航保障与情报威慑任务，主要外部大国维持战术协调。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "美大选后虽出现外交预期，但美伊高层立场尖锐对立，谈判实质停滞。",
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
        "变化：美军针对海峡沿岸雷达防空设施开展定点压制，双方大规模直接冲突暂停升级。",
        "延续：波斯湾及海峡周边一线驻军保持最高戒备，防空与拦截系统处于全天候锁定状态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要跨国航运巨头仍暂停霍尔木兹航线，海运货物避险绕行导致运力持续吃紧。",
        "变化：美军增加护航巡逻频次，但未能消解商业保险保费激增及船东安全顾虑。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油两基准脱离100美元心理关口，WTI在86–90美元、Brent在93–97美元窄幅整理。",
        "延续：战略原油库存偏低使市场对任何突发袭击依然保持极高脆弱性与风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方表态暂缓扩大地面或基础设施打击，伊方则借美中期选举结果强化政治博弈筹码。",
        "延续：双方均未放弃核心安全诉求，区域第三国斡旋尚未形成具有约束力的对话机制。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "原油价格自恐慌高位下调，缓解了能源市场最极端场景下的外溢冲击。",
      "海峡实际通行权之争仍是核心焦点，美方战术护航未能打破伊朗非对称威慑格局。",
      "大选后美伊进入政治试探与威慑并行的相持窗口，短期升级动能有所缓和。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方内政受战争引发的高通胀与选民压力掣肘，与维持波斯湾威慑信誉形成冲突。",
      "伊朗将封锁海峡作为逼退美制裁的核心王牌，不达战略目的绝不轻易恢复通航。"
    ],
    military: [
      "美军海空局部优势与伊朗沿岸分布式无人机、反舰导弹及水雷战力的消耗战对立。",
      "商船高额战争险与船东避险决策同美军战术护航有效性之间的信任鸿沟。"
    ]
  },
  scoreTrend: [
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80
    },
    {
      date: "11-05",
      score: 74,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "国际原油价格在大幅回调后企稳于百元关口下方",
      description: "WTI与布伦特分别在86–90美元与93–97美元区间震荡整理，市场消化美国中期选举与中东供给博弈双重因素（Reuters / Bloomberg）。",
      verification: "confirmed",
      timestamp: "2026-11-05T15:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军空袭霍尔木兹海峡伊朗防空设施，特朗普表态暂无立即扩大打击计划",
      description: "美军针对格什姆岛及周边防空系统实施有限精准打击，特朗普随后公开释放暂缓新一轮大规模打击信号（AP / WSJ）。",
      verification: "confirmed",
      timestamp: "2026-11-05T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗最高层强调抵抗有效，重申核心安全诉求未满足前无和谈可能",
      description: "伊朗最高领袖与首席代表就美大选发声，称选民已否定对伊战争，但坚称不会在美方取消封锁与制裁前作出妥协（CBS / Al Jazeera）。",
      verification: "confirmed",
      timestamp: "2026-11-05T11:20:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "霍尔木兹海峡受限状态持续，主流商业油轮维持绕行好望角路线",
      description: "UKMTO与行业监测显示海峡水域安全风险居高不下，美军虽提供局部护航，但商业运输规模未出现实质性恢复（UKMTO / Al Jazeera）。",
      verification: "confirmed",
      timestamp: "2026-11-05T13:45:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-05",
  version: "v2.244",
  riskScore: 74,
  keyChange: "Oil benchmarks retreated below $100 easing energy risk, while limited US-Iran clashes in Hormuz left overall blockade standoff in place, nudging; composite risk score prints at 74 (vs prior day -6); pre-adjustment model score 78 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain structural hedging in energy and commodities while keeping a defensive posture on risk assets against Hormuz tail risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D250",
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
      value: "WTI $86.65–$90.91 · Brent $93.44–$97.85",
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
      description: "US forces conducted limited strikes on Iranian coastal air defense sites; active clashes persist without full ground war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial navigation across Hormuz remains crippled under persistent asymmetric mine and drone threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Crude benchmarks fell out of the $100+ crisis zone, stabilizing firmly in the elevated $85–100/bbl band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces maintain frontline operational deployment and escort missions, avoiding direct peer-adversary conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Despite post-election diplomatic expectations, entrenched red lines on both sides leave actual talks stalled.",
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
        "Change: US strikes targeted Iranian coastal SAM radars in surgical fashion, pausing wider strategic bombardment.",
        "Continue: Air defense and missile batteries on both sides of the Gulf remain on high alert."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global major liners sustain rerouting via Africa as maritime war risk premiums remain prohibitive.",
        "Change: US naval convoys expanded escort presence, but commercial throughput remains structurally depressed."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude benchmarks retreated beneath $100, consolidating in the high-$80s (WTI) and mid-$90s (Brent).",
        "Continue: Depleted strategic reserves leave global crude supply hyper-sensitive to any renewed chokepoint incidents."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington signaled hesitation toward near-term escalation, while Tehran leveraged US midterm results in rhetoric.",
        "Continue: Neither side has offered meaningful compromises on core sanctions relief or maritime security."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Oil benchmarks pulled back from panic highs, relieving worst-case supply squeeze premiums.",
      "The struggle over the maritime corridor remains intact as US escorts have not neutralized Iranian asymmetric denial.",
      "Post-midterm political repositioning has created a tentative pause in kinetic expansion without solving underlying friction."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "US domestic election fallout and inflation concerns conflict with maintaining regional deterrence credibility.",
      "Tehran views maritime denial as its primary bargaining leverage, refusing normalization without comprehensive sanctions relief."
    ],
    military: [
      "US conventional naval overmatch versus distributed asymmetric anti-ship and sea-mine capabilities.",
      "Commercial shipping risk aversion persists despite military escort assurances."
    ]
  },
  scoreTrend: [
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80
    },
    {
      date: "11-04",
      score: 80
    },
    {
      date: "11-05",
      score: 74,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Crude benchmarks stabilize below $100 following sharp midweek selloff",
      description: "WTI and Brent traded within $86–90 and $93–97 respectively as markets weighed midterm political shifts against ongoing Hormuz supply friction (Reuters / Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-11-05T15:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US conducts limited strikes on Iranian SAM sites as Trump pauses immediate offensive",
      description: "CENTCOM conducted precision strikes on Qeshm radar sites, after which Trump publicly downplayed immediate further escalation plans (AP / WSJ).",
      verification: "confirmed",
      timestamp: "2026-11-05T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Iranian leadership reiterates unyielding terms following US midterm elections",
      description: "Supreme Leader Mojtaba Khamenei and chief negotiator Ghalibaf declared US election losses show anti-war sentiment, but rejected concessions without sanctions lifting (CBS / Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-11-05T11:20:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Commercial transit in Strait of Hormuz remains severely impeded",
      description: "UKMTO and industry telemetry show commercial traffic through the strait remains near multi-month lows with major shippers still detouring around Africa (UKMTO / Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-11-05T13:45:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.244 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↓6）：油价脱离百元关口收窄能源冲击评分，美伊围绕海峡防空与护航展开有限试探；综合风险分落盘 74（较昨日 -6）；调整前模型分 78（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持能源与大宗商品的结构性防御对冲，对风险资产避免过早激进做多，防范海峡尾部风险再次激化。",
    deescalationIntent: "美方内政受战争引发的高通胀与选民压力掣肘，与维持波斯湾威慑信誉形成冲突。",
    structuralRisk: "霍尔木兹海峡受非对称水雷与导弹威胁，国际商业船队通行近乎停滞。",
    contradictionNote: "美方内政受战争引发的高通胀与选民压力掣肘，与维持波斯湾威慑信誉形成冲突。；美军海空局部优势与伊朗沿岸分布式无人机、反舰导弹及水雷战力的消耗战对立。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第250天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.244 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↓6): Oil benchmarks retreated below $100 easing energy risk, while limited US-Iran clashes in Hormuz left overall blockade standoff in place, nu…",
    bannerWarning: "→ Maintain structural hedging in energy and commodities while keeping a defensive posture on risk assets against Hormuz…",
    deescalationIntent: "US domestic election fallout and inflation concerns conflict with maintaining r…",
    structuralRisk: "Commercial navigation across Hormuz remains crippled under persistent asymmetric mine and drone thr…",
    contradictionNote: "US domestic election fallout and inflation concerns conflict with maintaining regional deterrence credibility.; US conventional naval overmatch versus distribu…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 250",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
