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
  date: "2026-11-20",
  version: "v2.259",
  keyStats: [
    {
      label: "冲突天数",
      value: "D265",
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
      value: "WTI $80.78–$83.25 · Brent $87.70–$90.25",
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
      description: "Reuters与ISW监测证实美军与伊朗近期维持相互防空拦截与外围无人机试探，CENTCOM否认发起新打击，未演变为全面正面对决。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "AP与INSS权威评估显示海峡通航量仍较战前减少超60%，油轮触雷警报与军事护航对峙持续压制主要班轮通行信心。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "依据Yahoo Finance与Reuters日内监测，WTI运行于$80.78–$83.25，Brent运行于$87.70–$90.25，因跨2-3档按Brent主体落入$85–100择保守档3 https://www.reuters.com/business/energy/",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "CBS News与美国防部简报确认美军两支航母打击群仍在战区执行战备巡航与情报共享，未有第二大国直接派兵参战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "白宫记者会与Axios报道证实特朗普声称寻求真正协议但直言对方不可接受且不急于推进，短期框架协议无突破。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  change: "none",
  keyChange: "美伊在格什姆岛空域交火暂缓，但特朗普推迟谈判决断预期与霍尔木兹封锁维持胶着，地缘溢价黏滞。",
  investmentSignal: "→ 维持大宗商品与能源多头仓位的防御性对冲配置，降低对短期停火交易的风险资产敞口。",
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军中央司令部澄清未发起新打击，避免海空冲突即刻螺旋式扩大。",
      "霍尔木兹海峡常态化水雷风险与护航阻力使油运成本居高不下。",
      "双方高层政治表态维持强硬，外交接触未形成实质停火路线图。"
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
        "延续：美军双航母打击群保持区域战备警戒，未展开针对伊朗本土的大规模纵深打击。",
        "变化：美军中央司令部公开否认针对格什姆岛实施新一轮导弹袭击，前线短时交火降温。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商业油轮通航量继续徘徊在战前40%以下，主要跨国班轮维持观望。",
        "变化：针对海峡南侧通航航道的散布水雷威慑加剧，商业船舶战争险费率居高不下。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：地缘安全溢价与国际原油四季度供应过剩预期持续博弈，现货基差拉大。",
        "变化：Brent基准在$87.70–$90.25区间震荡整理，周线虽有回落但下行受海峡封锁支撑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方在先停火解除制裁还是先终止武器研制等核心前提上缺乏共识。",
        "变化：特朗普公开表示下步重大决断可能延后至2027年，浇灭年内快速达成协议的乐观情绪。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方放弃武器生产与海峡限制，与德黑兰要求全面解除封锁和制裁根本对立。"
    ],
    military: [
      "美军海上护航威慑与伊朗革命卫队低成本水雷及不对称无人机袭扰之间的战术消耗僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70
    },
    {
      date: "11-18",
      score: 70
    },
    {
      date: "11-19",
      score: 70
    },
    {
      date: "11-20",
      score: 70,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普称寻求美伊“实质协议”但推迟重大决断",
      description: "美总统特朗普在白宫记者会上表示希望与伊朗达成真正协议，但指责德黑兰立场不可接受，并对媒体表示不排除将战略决定推至2027年。",
      verification: "confirmed",
      timestamp: "2026-11-20（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "CENTCOM澄清未对格什姆岛发动新一轮空袭",
      description: "针对伊朗半官方媒体关于格什姆岛遇袭的指控，美军中央司令部明确否认，前线空情态势暂时未进一步激化。",
      verification: "confirmed",
      timestamp: "2026-11-20（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "红海荷台达港沿线与沙特战线对峙升级",
      description: "胡塞武装向沙特境内发射弹道导弹后，沙特联军向红海重要港口荷台达周边居民发出撤离警告，代理线冲突保持高热度。",
      verification: "confirmed",
      timestamp: "2026-11-20（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准价格连续三周收低，地缘溢价支撑底线",
      description: "国际能源市场因四季度过剩预期走弱，但霍尔木兹海峡通航受阻依然为Brent及WTI提供关键底部支撑。",
      verification: "confirmed",
      timestamp: "2026-11-20（当日公开报道）",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-20",
  version: "v2.259",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D265",
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
      value: "WTI $80.78–$83.25 · Brent $87.70–$90.25",
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
      description: "Reuters and ISW tracking confirm US and Iranian forces maintained defensive standoff and skirmishes without broad full-scale ground war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "AP and INSS assessments indicate strait transit flows remain over 60% below pre-war levels amidst recurrent naval mine hazards.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Yahoo Finance and Reuters data place WTI at $80.78–$83.25 and Brent at $87.70–$90.25; conservative evaluation aligns Brent in the $85–100 tier https://www.reuters.com/business/energy/",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "CBS News and Pentagon briefings confirm dual carrier strike groups remain deployed in theatre without direct third-party major power engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "White House briefings and Axios report Trump seeks a real deal but refuses concessions while hinting major decisions could wait until 2027.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 70,
  change: "none",
  keyChange: "US-Iran tactical skirmishes paused around Qeshm, but delayed negotiation timelines and strait blockades sustain sticky geopolitical risk.",
  investmentSignal: "→ Maintain defensive hedging allocations across commodities and energy while paring exposure to ceasefire-dependent risk assets.",
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "CENTCOM denied carrying out fresh strikes, capping immediate escalation risks.",
      "Persistent mine hazards along Hormuz transit lanes keep freight risk elevated.",
      "Political leadership rhetoric remains unyielding with no imminent ceasefire pathway."
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
        "Continue: US dual-carrier deployment maintains maritime deterrence without launching deep territory assaults.",
        "Change: CENTCOM officially refuted reports of new strikes against Iranian installations on Qeshm Island."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial vessel transits through Hormuz stay under 40% of baseline volumes.",
        "Change: Mines and asymmetric warnings near transit corridors keep maritime insurance premiums elevated."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Markets balance war-risk premiums against expectations of fourth-quarter global crude surplus.",
        "Change: Brent consolidates within $87.70–$90.25 as shipping bottlenecks establish a stubborn price floor."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington and Tehran remain entrenched on core demands regarding sanctions and maritime blockades.",
        "Change: Trump signaled that next strategic decisions on Iran could be deferred until 2027, tempering near-term deal expectations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands full cessation of Iranian weapons capability while Tehran conditions talks on immediate sanctions relief."
    ],
    military: [
      "US naval escort assets face attrition and asymmetric friction against low-cost Iranian naval mining tactics."
    ]
  },
  scoreTrend: [
    {
      date: "11-16",
      score: 70
    },
    {
      date: "11-17",
      score: 70
    },
    {
      date: "11-18",
      score: 70
    },
    {
      date: "11-19",
      score: 70
    },
    {
      date: "11-20",
      score: 70,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump signals interest in 'real deal' but delays next steps",
      description: "President Trump stated the US seeks a real deal with Iran while expressing frustration with Tehran's terms and hinting next steps may wait until 2027.",
      verification: "confirmed",
      timestamp: "2026-11-20 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "CENTCOM denies reports of fresh strikes on Qeshm Island",
      description: "US Central Command refuted claims by Iranian semi-official outlets alleging a US missile attack on Qeshm Island in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-11-20 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Red Sea and Hodeidah tensions rise following Houthi missile launches",
      description: "Following missile fire targeting Riyadh, Saudi-led coalition forces issued evacuation warnings around Hodeidah port.",
      verification: "confirmed",
      timestamp: "2026-11-20 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude benchmarks post weekly declines amid supply concerns",
      description: "Global crude contracts experienced weekly drops as surplus expectations offset persistent maritime chokepoint risks.",
      verification: "confirmed",
      timestamp: "2026-11-20 (same-day reporting)",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.259 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊在格什姆岛空域交火暂缓，但特朗普推迟谈判决断预期与霍尔木兹封锁维持胶着，地缘溢价黏滞。",
    bannerWarning: "→ 维持大宗商品与能源多头仓位的防御性对冲配置，降低对短期停火交易的风险资产敞口。",
    deescalationIntent: "美方要求伊方放弃武器生产与海峡限制，与德黑兰要求全面解除封锁和制裁根本对立。",
    structuralRisk: "AP与INSS权威评估显示海峡通航量仍较战前减少超60%，油轮触雷警报与军事护航对峙持续压制主要班轮通行信心。",
    contradictionNote: "美方要求伊方放弃武器生产与海峡限制，与德黑兰要求全面解除封锁和制裁根本对立。；美军海上护航威慑与伊朗革命卫队低成本水雷及不对称无人机袭扰之间的战术消耗僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第265天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.259 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US-Iran tactical skirmishes paused around Qeshm, but delayed negotiation timelines and strait blockades sustain sticky geopolitical risk.",
    bannerWarning: "→ Maintain defensive hedging allocations across commodities and energy while paring exposure to ceasefire-dependent ris…",
    deescalationIntent: "Washington demands full cessation of Iranian weapons capability while Tehran co…",
    structuralRisk: "AP and INSS assessments indicate strait transit flows remain over 60% below pre-war levels amidst r…",
    contradictionNote: "Washington demands full cessation of Iranian weapons capability while Tehran conditions talks on immediate sanctions relief.; US naval escort assets face attri…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 265",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
