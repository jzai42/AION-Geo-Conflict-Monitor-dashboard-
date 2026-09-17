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
  date: "2026-09-17",
  version: "v2.194",
  riskScore: 80,
  change: "down",
  keyStats: [
    {
      label: "冲突天数",
      value: "D201",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军双航母战斗群与伊朗伊斯兰革命卫队沿波斯湾部署维持最高交火警戒态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通航量维持在危机前40%以下，国际主流班轮公司维持绕行非洲好望角策略。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "国际油价日内受沙特阿曼转运及外交接触传闻小幅震荡，但整体仍牢固处于100美元以上危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持前沿警戒威慑部署与伙伴国防空协同，盟军后勤保障网处于高动员状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "阿曼渠道初步开启海峡安全技术性接触，但双方核心战略诉求差距悬殊，破裂风险未除。",
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
      "霍尔木兹海峡商业航道受阻进入常态化对抗，重塑全球原油物流路径",
      "油价维持在三位数危机带，地缘政治溢价难以实质性出清",
      "阿曼外交接触开启技术性沟通，但尚未形成系统性降级框架"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "伊朗要求全面解除极限施压制裁与美军退后，与美方恢复无条件自由航行诉求根本对立",
      "海湾产油国面临能源出口中断与被卷入全面对抗的双重压力"
    ],
    military: [
      "美军区域防空反导网络拦截负荷与也门/伊朗反舰远程导弹库容的高消耗拉锯",
      "霍尔木兹狭窄水域浅水对抗环境限制大型水面舰艇机动能力"
    ]
  },
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军双航母打击群在阿曼湾维持实战戒备。",
        "延续：伊朗伊斯兰革命卫队岸导部队维持高度战备。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要商业集装箱船与油轮继续绕行好望角路线。",
        "变化：沙特启动通过阿曼苏哈尔港的离岸船对船应急转运。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特及WTI均牢牢守在100美元/桶危机分界线之上。",
        "变化：盘中受阿曼外交接触传闻影响自日内峰值小幅技术性整理。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方高层均未软化核心战略要价与停火门槛。",
        "变化：阿曼斡旋渠道确认启动海峡通航安全事务技术性接触。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "原油基准日内震荡但深处三位数危机带",
      description: "路透社与彭博社报道，沙特通过阿曼苏哈尔港实施船对船转运以缓解部分亚洲交付焦虑，布伦特仍运行于101.55–106.00美元/桶、WTI运行于99.10–102.47美元/桶的危机区间。",
      verification: "confirmed",
      timestamp: "2026-09-17 08:30 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗通过阿曼渠道向海合会传递海峡沟通意向",
      description: "半岛电视台与美联社报道，伊朗外交官员抵达成马斯喀特就霍尔木兹海峡民用通航安全与海湾国家展开接触，但双方军方未降战备等级。",
      verification: "confirmed",
      timestamp: "2026-09-17 06:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军中央司令部维持双航母战斗群警戒打击阵位",
      description: "五角大楼简报与法新社报道，美军林肯号及罗斯福号航母打击群在北阿拉伯海维持高戒备拒止部署，针对霍尔木兹周边反舰阵地实施持续监控。",
      verification: "confirmed",
      timestamp: "2026-09-17 04:00 UTC",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80,
      active: true
    }
  ],
  keyChange: "综合分微降至80高位黏滞，阿曼外交技术接触开启但两油稳居100美元危机带且海峡仍受阻。",
  investmentSignal: "→ 维持大宗商品与能源多头对冲，对风险资产采取高度防御姿态。",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-17",
  version: "v2.194",
  riskScore: 80,
  change: "down",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D201",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "U.S. dual carrier strike groups and IRGC forces maintain maximum alert and readiness across the Persian Gulf theater.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait transit traffic remains severely compressed below 40% of baseline volume as major liners maintain Cape of Good Hope rerouting.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Crude benchmarks softened slightly intraday on Oman transshipment news but remain firmly anchored in the $100+ crisis corridor.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "U.S. forces provide active defensive posture, regional air defense coordination, and operational intelligence support to regional allies.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Technical maritime contacts opened in Oman, but core strategic conditions between Washington and Tehran remain fundamentally irreconcilable.",
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
      "Strait transit disruption has become semi-structural, reconfiguring global hydrocarbon flows",
      "Crude benchmarks anchored firmly above triple digits, preventing risk premium compression",
      "Omani mediation offers technical crisis management without resolving core strategic redlines"
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Tehran demands full relief from maximum pressure sanctions while Washington insists on unrestricted freedom of navigation",
      "Gulf exporters face systemic trade bottlenecks and the hazard of direct regional conflict involvement"
    ],
    military: [
      "High interception burn rates for Western air defense interceptors versus resilient Iranian and proxy missile stockpiles",
      "Restricted shallow-water geography in the Strait limits major surface combatant maneuverability"
    ]
  },
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: U.S. dual carrier strike groups hold operational strike posture in the North Arabian Sea.",
        "Continue: Iranian coastal defense and missile batteries remain on elevated alert status."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major commercial fleets continue rerouting around the Cape of Good Hope.",
        "Change: Saudi Arabia expands ship-to-ship crude transshipments via Oman's Sohar port."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent and WTI futures contracts remain locked above the critical $100 per barrel mark.",
        "Change: Crude prices saw minor intraday technical softening following reports of Omani diplomatic contacts."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Neither leadership has modified underlying strategic terms for de-escalation.",
        "Change: Omani diplomatic channels confirmed initial technical contacts on maritime transit protocols."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Crude benchmarks consolidate slightly but remain in triple-digit crisis zone",
      description: "Reuters and Bloomberg report Saudi ship-to-ship crude transfers via Oman provided marginal supply relief, yet Brent sits at $101.55–$106.00 and WTI at $99.10–$102.47 per barrel.",
      verification: "confirmed",
      timestamp: "2026-09-17 08:30 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran signals maritime communication channels via Oman",
      description: "Al Jazeera and AP confirm Iranian diplomats in Muscat opened exploratory discussions with Gulf counterparts regarding civilian shipping safety, though military alert levels remain unchanged.",
      verification: "confirmed",
      timestamp: "2026-09-17 06:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "CENTCOM maintains dual carrier deterrence in northern Arabian Sea",
      description: "Pentagon releases and AFP reports confirm USS Abraham Lincoln and USS Theodore Roosevelt strike groups maintain high combat readiness to counter anti-ship threats.",
      verification: "confirmed",
      timestamp: "2026-09-17 04:00 UTC",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80,
      active: true
    }
  ],
  keyChange: "Composite risk score edged down to 80 on technical maritime talks in Oman, while triple-digit crude prices and chokepoint transit disruption keep risks elevated.",
  investmentSignal: "→ Maintain long energy and commodities hedges while adopting a defensive stance on risk assets.",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.194 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓2）：综合分微降至80高位黏滞，阿曼外交技术接触开启但两油稳居100美元危机带且海峡仍受阻。",
    bannerWarning: "→ 维持大宗商品与能源多头对冲，对风险资产采取高度防御姿态。",
    deescalationIntent: "伊朗要求全面解除极限施压制裁与美军退后，与美方恢复无条件自由航行诉求根本对立",
    structuralRisk: "海峡通航量维持在危机前40%以下，国际主流班轮公司维持绕行非洲好望角策略。",
    contradictionNote: "伊朗要求全面解除极限施压制裁与美军退后，与美方恢复无条件自由航行诉求根本对立；美军区域防空反导网络拦截负荷与也门/伊朗反舰远程导弹库容的高消耗拉锯",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第201天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.194 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓2): Composite risk score edged down to 80 on technical maritime talks in Oman, while triple-digit crude prices and chokepoint transit disruptio…",
    bannerWarning: "→ Maintain long energy and commodities hedges while adopting a defensive stance on risk assets.",
    deescalationIntent: "Tehran demands full relief from maximum pressure sanctions while Washington ins…",
    structuralRisk: "Strait transit traffic remains severely compressed below 40% of baseline volume as major liners mai…",
    contradictionNote: "Tehran demands full relief from maximum pressure sanctions while Washington insists on unrestricted freedom of navigation; High interception burn rates for Wes…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 201",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
