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
  version: "v2.193",
  riskScore: 80,
  prevRiskScore: 82,
  investmentSignal: "→ 维持风险资产对冲，防御性增持能源与大宗商品部位",
  keyChange: "美伊多线军事对峙及航道对垒常态化，地缘溢价令油价在100美元关口维持宽幅震荡。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D201",
      unit: "2月28日起",
      color: "red"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "gray"
    },
    {
      label: "油价",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
      unit: "参考",
      color: "orange",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "red"
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "航道博弈与多线对峙常态化",
    subTitle: "美伊海上防御战常态化，市场计价地缘溢价",
    points: [
      "霍尔木兹海峡与红海航道通行环境仍面临威胁，主力商船通过量持续低迷。",
      "美军维持战术护航与防空部署，伊方坚决反对多国集结，政治互信归零。",
      "联合国与第三国间接斡旋未取得实质性突破，停火前景依然黯淡。"
    ],
    note: "市场处于长期地缘风险敏感态势，100美元水平线对油价形成稳固支撑。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊在海域多点发生直接与代理人对抗交火，防空拦截频次居高不下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡与红海区域保费维持在高位，主要油轮通行流量严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "国际主力油价宽幅震荡于100美元附近，中东供应阻断威胁提供坚实溢价支撑。",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "多国联防机制维持中等军事力量部署与情报共享，未有地面地面力量扩张迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "双边对话渠道完全停摆，核心诉求分歧导致短期内实现停火的概率偏低。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-001",
      title: "油价维持高位宽幅震荡",
      description: "雅虎财经等财经媒体报道，WTI在$99.10–$102.47（收于$99.66）且布伦特在$101.55–$106.00（收于$102.13）高位区间震荡，反映坚固的中东地缘溢价。",
      verification: "confirmed",
      timestamp: "2026-09-17T12:50:00Z",
      significance: "Tier 1/Tier 2 多方原油价格与地缘溢价联动核查对齐",
      highlight: true,
      critical: true
    },
    {
      id: "ev-002",
      title: "美国国防部发布护航编队简报",
      description: "美国国防部发布简报称美军第五舰队联合盟友在波斯湾及红海维持对民用船只的多点防御拦截保护。",
      verification: "confirmed",
      timestamp: "2026-09-17T09:30:00Z",
      significance: "Tier 1 官方声明证实战术军事部署及航线保护维持不变"
    },
    {
      id: "ev-003",
      title: "伊朗斥责美军主导的多国海上联盟",
      description: "伊朗外交部发言人严厉抨击美国及其盟友在海湾区域的军事部署，重申任何外来干涉无法带来区域稳定。",
      verification: "confirmed",
      timestamp: "2026-09-17T11:00:00Z",
      significance: "Tier 1 官方表态展现了极高外交对抗刚性"
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
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "常态对峙",
      tagColor: "red",
      points: [
        "延续：美军联合护航战备力量部署维持不变，波斯湾与红海周边空中警戒常态化。",
        "变化：美军第五舰队在红海南部拦截防御频率小幅上升，维持对商船航路的密集监控。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "通道受阻",
      tagColor: "red",
      points: [
        "延续：红海及海湾战争险附加费率延续冲突以来水平，未显见降息降费改善趋势。",
        "延续：全球主干远洋轮船由于避险考量，绝大多数绕行替代路线，通行能力不足往常一半。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "百元对峙",
      tagColor: "orange",
      points: [
        "延续：原油期权空头出于实物供应风险顾虑而表现谨慎，高油价中枢形成底部结构。",
        "变化：伴随紧张局势长期化，期货市场地缘保费波动性相对前几周呈现收敛态势。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "立场强硬",
      tagColor: "red",
      points: [
        "延续：美伊直接政治沟通仍处于实质冰封状态，谈判缺乏根本性互信基础。",
        "变化：伊朗外交部今日发文对多国海上联防行动发出严厉谴责，指责其侵犯地区主权。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在波斯湾海事控制权与地缘政治势力范围上的利益对立无可调和。",
      "多国联合行动机制被伊方视作对主权的严重挑战，外交斡旋机制实质停摆。"
    ],
    military: [
      "高密度、常态化的区域拦截与巡逻行动极易因任何偶发空中摩擦而导致事态失控。",
      "代理人多点袭扰战术同盟国海上防空反导力量之间形成长期消耗博弈。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-17",
  version: "v2.193",
  riskScore: 80,
  prevRiskScore: 82,
  investmentSignal: "→ Maintain risk asset hedges, defensively overweight energy and commodities",
  keyChange: "US-Iran multi-front military confrontation and maritime standoffs normalize, keeping oil prices range-bound near the $100 threshold.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D201",
      unit: "Since Feb 28",
      color: "red"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "gray"
    },
    {
      label: "Oil",
      value: "WTI $99.10–$102.47 · Brent $101.55–$106.00",
      unit: "Ref.",
      color: "orange",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Highly Restricted",
      unit: "Transit Status",
      color: "red"
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "Normalized Maritime Blockade and Multi-Front Confrontation",
    subTitle: "US-Iran maritime defense becomes routine as markets price in geopolitics",
    points: [
      "Transit threats in the Strait of Hormuz and the Red Sea persist, keeping major commercial traffic depressed.",
      "US maintains escort and air defense readiness, while Iran rejects multinational deployments, leaving trust at zero.",
      "Indirect mediation by the UN and third countries fails to secure breakthroughs, keeping ceasefire prospects dim."
    ],
    note: "Markets remain highly sensitive to regional risks, with $100 acting as a solid floor for oil prices."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct and proxy skirmishes continue across maritime zones, keeping air defense interceptions highly active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transit war risk premiums remain elevated, keeping commercial shipping volumes severely constrained.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices consolidate near the $100 mark, supported by persistent physical supply disruption threats.",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Multinational coalition maintains moderate deployments and tactical air defense cover without ground expansion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "Direct communication is frozen, and deep disagreements on core issues make a near-term ceasefire highly unlikely.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "ev-001",
      title: "Crude Consolidates in High Range",
      description: "Yahoo Finance reports WTI trading between $99.10–$102.47 (close $99.66) and Brent between $101.55–$106.00 (close $102.13), highlighting solid geopolitical premium support.",
      verification: "confirmed",
      timestamp: "2026-09-17T12:50:00Z",
      significance: "Cross-verified pricing trends align with ongoing maritime and geopolitical tensions.",
      highlight: true,
      critical: true
    },
    {
      id: "ev-002",
      title: "DoD Outlines Joint Escort Missions",
      description: "The US Department of Defense released a brief showing Fifth Fleet and allied forces continuing intercept and protective escorts in the Persian Gulf.",
      verification: "confirmed",
      timestamp: "2026-09-17T09:30:00Z",
      significance: "Tier 1 official statements verify active tactical containment measures remain in place."
    },
    {
      id: "ev-003",
      title: "Iran Rejects Foreign Maritime Alliances",
      description: "The Iranian Foreign Ministry spokesperson strongly condemned the US-led naval presence, reiterating that regional security must exclude foreign forces.",
      verification: "confirmed",
      timestamp: "2026-09-17T11:00:00Z",
      significance: "Tier 1 official stance underscores persistent political friction."
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
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Active Standoff",
      tagColor: "red",
      points: [
        "Continue: US escort forces remain deployed in the Persian Gulf with routine air defense measures.",
        "Change: US Fifth Fleet notes a slight increase in interception incidents over the southern Red Sea."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Restricted Transit",
      tagColor: "red",
      points: [
        "Continue: Maritime war risk surcharges remain high with no signs of downward adjustment.",
        "Continue: The majority of major shipping liners continue routing around Africa, depressing Gulf transit capacity."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Oil Standoff",
      tagColor: "orange",
      points: [
        "Continue: Options shorts remain highly defensive over supply shock risks, keeping a solid floor for oil prices.",
        "Change: Geopolitical risk normalization has modestly compressed short-term crude options volatility."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Rigid Rhetoric",
      tagColor: "red",
      points: [
        "Continue: Direct communication remains non-existent, leaving backchannel mediation highly sluggish.",
        "Change: Iran issued strong condemnations of multinational coalition naval patrols, calling them sovereignty violations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable interests over Gulf maritime jurisdiction and regional influence between the US and Iran.",
      "Multinational joint operations are viewed by Iran as sovereign provocations, freezing backchannel dialogues."
    ],
    military: [
      "Highly concentrated military assets in narrow waters raise the risk of tactical miscalculations.",
      "Symmetric containment strategies are systematically strained by asymmetric proxy strike patterns."
    ]
  },
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.193 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓2）：美伊多线军事对峙及航道对垒常态化，地缘溢价令油价在100美元关口维持宽幅震荡。",
    bannerWarning: "→ 维持风险资产对冲，防御性增持能源与大宗商品部位",
    deescalationIntent: "美伊双方在波斯湾海事控制权与地缘政治势力范围上的利益对立无可调和。",
    structuralRisk: "霍尔木兹海峡与红海区域保费维持在高位，主要油轮通行流量严重受限。",
    contradictionNote: "美伊双方在波斯湾海事控制权与地缘政治势力范围上的利益对立无可调和。；高密度、常态化的区域拦截与巡逻行动极易因任何偶发空中摩擦而导致事态失控。",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.193 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓2): US-Iran multi-front military confrontation and maritime standoffs normalize, keeping oil prices range-bound near the $100 threshold.",
    bannerWarning: "→ Maintain risk asset hedges, defensively overweight energy and commodities",
    deescalationIntent: "Irreconcilable interests over Gulf maritime jurisdiction and regional influence…",
    structuralRisk: "Transit war risk premiums remain elevated, keeping commercial shipping volumes severely constrained.",
    contradictionNote: "Irreconcilable interests over Gulf maritime jurisdiction and regional influence between the US and Iran.; Highly concentrated military assets in narrow waters …",
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
