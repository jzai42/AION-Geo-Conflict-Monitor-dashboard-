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
  date: "2026-11-23",
  version: "v2.262",
  riskScore: 72,
  change: "none",
  keyChange: "美伊在霍尔木兹海峡进入非对称消耗对抗，多方外交重启斡旋但未见突破；综合风险分落盘 72（较昨日 +2）；调整前模型分 70（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持能源与大宗商品的结构性对冲仓位，对全球风险资产保持中性防御。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D268",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $79.87–$83.95 · Brent $86.19–$90.50",
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
      description: "IRNA与UKMTO报道确认海峡周边无人机拦截及船只遇袭事件持续，多战线交火维持高压状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "UKMTO通报多起水雷与抛射物攻击报告，主流商业航运实际通航量较常态水平降低超50%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI震荡于$79.87–$83.95，Brent主力落在$86.19–$90.50，受IEA过剩预期压制但溢价仍存（https://www.marinelink.com/news/oil-prices-fall-middle-east-flows-increase-520556）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持航母战斗群战略警戒并向区域盟友提供防御支援，美财政部追加多项制裁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "半岛电视台与路透社报道卡塔尔展开华盛顿穿梭外交，双方表达接触意愿但缺乏互信妥协基础。",
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
      "霍尔木兹水道骚扰与避险迂回成为常态博弈模式",
      "美伊高层通过调解国维持有限接触但未形成停火协议"
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
        "延续：美伊及其代理人在波斯湾及外围区域保持频繁无人机与防空拦截对峙。",
        "变化：伊朗宣称击落美军低成本无人战机，美方未公开回应实质交火损失。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：UKMTO通报持续存在水雷与不明武器袭击风险，商业航运高度警惕。",
        "延续：海湾产油国继续借助暗夜航行及关停应答器规避高风险水域。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油期货主力自上周高点走软，IEA供应过剩预测对冲了部分地缘断供溢价。",
        "延续：WTI主体保持在80-83美元带，Brent在86-90美元带呈现震荡整理。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：卡塔尔首相在华盛顿积极推动美伊间接和谈，强调区域承受力已至极限。",
        "延续：伊朗议长表态必须摆脱长期不战不和的经济消耗战。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均有意避免全面战争但受制于国内强硬派诉求，无法在核心制裁与核议题上妥协。"
    ],
    military: [
      "非对称海上骚扰能力与美军护航防御成本严重失衡，霍尔木兹安全架构难以固化。"
    ]
  },
  scoreTrend: [
    {
      date: "11-19",
      score: 70
    },
    {
      date: "11-20",
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "卡塔尔首相访问华盛顿推进美伊复谈",
      description: "卡塔尔首相兼外交大臣会晤美国国务卿，力推重启停滞的美伊间接和平谈判并警告局势脆弱。",
      verification: "confirmed",
      timestamp: "2026-11-23T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗声称在海峡东部击落美军无人机",
      description: "伊朗国家通讯社报道其防空部队在霍尔木兹海峡以东空域击落一架美军LUCAS无人机。",
      verification: "single",
      timestamp: "2026-11-23T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "原油基准价格窄幅下挫，过剩预期冲抵地缘溢价",
      description: "受海湾航运部分恢复及IEA供过于求预测影响，WTI收于80-83美元、Brent震荡于86-90美元区间。",
      verification: "confirmed",
      timestamp: "2026-11-23T16:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-23",
  version: "v2.262",
  riskScore: 72,
  change: "none",
  keyChange: "Asymmetric standoff in the Strait of Hormuz continues while Qatari mediation seeks diplomatic breakthrough, keeping; composite risk score prints at 72 (vs prior day +2); pre-adjustment model score 70 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain strategic hedges in energy and commodities while holding a neutral defensive posture across global risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D268",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $79.87–$83.95 · Brent $86.19–$90.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Constrained",
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
      description: "IRNA and UKMTO confirm ongoing air defense intercepts and drone clashes along the maritime perimeter.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "UKMTO incident logs confirm persistent threats reducing commercial transit volume by more than 50% relative to baseline.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI settles between $79.87–$83.95 while Brent holds $86.19–$90.50, pressured by IEA supply surplus forecasts (https://www.marinelink.com/news/oil-prices-fall-middle-east-flows-increase-520556).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military sustains multi-carrier presence to deter wider conflict alongside targeted sanctions on procurement networks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Al Jazeera and Reuters report Qatari shuttle diplomacy in Washington, but no concrete framework has materialized.",
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
      "Hormuz chokepoint friction remains a perpetual operational drag",
      "Direct diplomatic breakthrough remains blocked by deep structural divergence"
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
        "Continue: US and Iranian proxies maintain heightened drone and maritime air-defense alertness.",
        "Change: Iranian state outlets claimed the shootdown of a US combat drone with no direct Pentagon confirmation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: UKMTO alerts indicate ongoing projectile and mine hazards keeping shipping on edge.",
        "Continue: Regional producers rely on night passages and dark transit near Oman to move crude."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil futures eased further as IEA forecasts of a fourth-quarter supply surplus tempered geopolitical risk premiums.",
        "Continue: Brent fluctuates within the $86–$90 band while WTI hovers around $80–$83."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Qatari Prime Minister engaged US counterparts in DC urging revival of stalled de-escalation talks.",
        "Continue: Iranian parliamentary leaders reiterated that a no-war no-peace status quo is unsustainable."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Both parties avoid an all-out war but cannot concede on sanctions relief or uranium stockpiles due to domestic political costs."
    ],
    military: [
      "Asymmetric coastal denial weapons impose outsized escort costs on US naval task groups, preventing full security restoration."
    ]
  },
  scoreTrend: [
    {
      date: "11-19",
      score: 70
    },
    {
      date: "11-20",
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Qatar PM Visits Washington to Revive US-Iran Talks",
      description: "Qatar's Prime Minister met with the US Secretary of State in Washington to push for resuming stalled peace negotiations.",
      verification: "confirmed",
      timestamp: "2026-11-23T14:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Claims Shootdown of US Drone East of Hormuz",
      description: "Iran's state news agency claimed army air defense shot down a US LUCAS uncrewed aerial vehicle east of the strait.",
      verification: "single",
      timestamp: "2026-11-23T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Benchmarks Decline as Supply Surplus Fears Offset Mideast Risks",
      description: "Oil prices retreated with WTI in the $80–$84 zone and Brent near $86–$90 as IEA surplus projections balanced tanker disruptions.",
      verification: "confirmed",
      timestamp: "2026-11-23T16:00:00Z",
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
    node406: "11月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.262 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑2）：美伊在霍尔木兹海峡进入非对称消耗对抗，多方外交重启斡旋但未见突破；综合风险分落盘 72（较昨日 +2）；调整前模型分 70（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持能源与大宗商品的结构性对冲仓位，对全球风险资产保持中性防御。",
    deescalationIntent: "美伊双方均有意避免全面战争但受制于国内强硬派诉求，无法在核心制裁与核议题上妥协。",
    structuralRisk: "UKMTO通报多起水雷与抛射物攻击报告，主流商业航运实际通航量较常态水平降低超50%。",
    contradictionNote: "美伊双方均有意避免全面战争但受制于国内强硬派诉求，无法在核心制裁与核议题上妥协。；非对称海上骚扰能力与美军护航防御成本严重失衡，霍尔木兹安全架构难以固化。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第268天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.262 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑2): Asymmetric standoff in the Strait of Hormuz continues while Qatari mediation seeks diplomatic breakthrough, keeping; composite risk score p…",
    bannerWarning: "→ Maintain strategic hedges in energy and commodities while holding a neutral defensive posture across global risk asse…",
    deescalationIntent: "Both parties avoid an all-out war but cannot concede on sanctions relief or ura…",
    structuralRisk: "UKMTO incident logs confirm persistent threats reducing commercial transit volume by more than 50% …",
    contradictionNote: "Both parties avoid an all-out war but cannot concede on sanctions relief or uranium stockpiles due to domestic political costs.; Asymmetric coastal denial weap…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 268",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
