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
  date: "2026-11-22",
  version: "v2.261",
  riskScore: 70,
  change: "none",
  keyChange: "美伊在霍尔木兹封锁与反封锁博弈中陷入胶着，卡塔尔介入斡旋但未见突破；综合风险分落盘 70（较昨日 持平（+0））",
  investmentSignal: "→ 维持能源商品中性对冲策略，对大宗商品追高保持防御，规避高估值风险资产。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D267",
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
      value: "WTI $80.78–$84.07 · Brent $87.70–$90.38",
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
      description: "波斯湾及周边驻泊基地持续发生防空交火，美伊双方维持低伤亡、高频次的精准打击与拦截态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡商业航运受袭风险居高不下，正常商业航运流量降至50%以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "国际基准油价维持在80–90美元中高位区间，供应过剩预期与地缘溢价相抵制止极端暴涨。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持双航母战斗群区域部署，协同海湾盟友执行反导及护航任务，无直接地面卷入迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "第三方斡旋渠道虽已开启，但双方核心诉求互不相让，实质停火条件尚未成熟。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡多艘油轮报告受损",
      description: "英国海事贸易行动办公室与美联社通报，周末期间霍尔木兹海峡连续发生油轮触雷与抛射物袭击事件，引发航运保费持续高企。",
      verification: "confirmed",
      timestamp: "2026-11-21T21:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "卡塔尔代表团赴德黑兰斡旋海峡危机",
      description: "伊朗副外长证实卡塔尔特使代表团抵伊就霍尔木兹海峡危机展开接触，伊朗外长阿拉格齐重申美解除封锁是谈判前提。",
      verification: "confirmed",
      timestamp: "2026-11-21T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "海湾盟国与美军拦截越境无人机袭击",
      description: "巴林防空系统击落多架针对其境内部署的无人机，沙特亦拦截发自也门的导弹，美军否认战机受损声明。",
      verification: "confirmed",
      timestamp: "2026-11-22T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准价格在过剩预期与地缘溢价间徘徊",
      description: "布伦特原油在$87–$90区间整固，市场虽对霍尔木兹航运担忧犹存，但IEA过剩预期主导了多头获利了结。",
      verification: "confirmed",
      timestamp: "2026-11-21T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡处于高风险对峙管控状态，商业航运通航率持续低于五成。",
      "美伊直接交火保持克制，但海湾外围多点代理交火与防空拦截频次不降反升。",
      "多哈等中介渠道维持低级别对话，短线缺乏互信基础促成一揽子停火。"
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
        "延续：美伊维持精准防空打击与反导对峙，避免触发全面大打的红线。",
        "延续：也门胡塞与海湾代理力量持续发起小规模无人机骚扰。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡航运维持高压受限，商业船队普遍依赖军方护航。",
        "延续：水雷威胁与零星抛射物袭击仍是商业海运面临的主要战术隐患。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价徘徊于WTI $80–84与Brent $87–90区间，地缘溢价与增产过剩对冲。",
        "延续：炼厂与贸易商对中东断供保持谨慎备库，未见非理性挤兑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：德黑兰接见卡塔尔斡旋代表团，开启低调接触但未松动解封前置条件。",
        "延续：华盛顿重申中东驻军安全与航行自由原则，制裁施压基调未变。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底消除伊朗核能力及海峡威胁，而伊朗坚持解除全面经济制裁为前置条件。"
    ],
    military: [
      "霍尔木兹排他性封锁意图与美军公海航行自由及护航主导权的不可调和冲突。"
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-22",
  version: "v2.261",
  riskScore: 70,
  change: "none",
  keyChange: "US-Iran standoff remains locked in maritime blockade confrontation; Qatari mediation starts without breakthrough, leaving risk score unchanged at 70.",
  investmentSignal: "→ Maintain neutral hedging on energy commodities, exercise defensive posture toward high-beta risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D267",
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
      value: "WTI $80.78–$84.07 · Brent $87.70–$90.38",
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
      description: "Exchanges of missile and drone fire continue in the Persian Gulf and against regional facilities, keeping military intensity high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel traffic remains severely constrained below 50% amidst recurring mine and projectile incidents.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks hold in the $80-$90 corridor as global supply surplus forecasts balance out geopolitical war premia.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US carrier battle groups sustain forward escort and air defense postures with regional allies without direct great-power clashes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Exploratory diplomatic channels have reopened via regional intermediaries, but entrenched preconditions preclude rapid breakthroughs.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Multiple tankers report damage near Strait of Hormuz",
      description: "UKMTO and AP report maritime incidents involving mines and projectiles in the southern strait corridor, sustaining elevated war-risk surcharges.",
      verification: "confirmed",
      timestamp: "2026-11-21T21:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Qatari delegation arrives in Tehran for diplomatic talks",
      description: "Iranian officials confirmed holding two-hour talks with Qatari mediators, though Tehran conditioned waterway reopening on US sanctions relief.",
      verification: "confirmed",
      timestamp: "2026-11-21T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Gulf air defense intercepts cross-border drone sorties",
      description: "Air defenses in Bahrain and Saudi Arabia downed inbound drones and missiles, with CENTCOM rejecting claims of combat aircraft losses.",
      verification: "confirmed",
      timestamp: "2026-11-22T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude benchmarks consolidate under surplus expectations",
      description: "Brent prices trade within the $87-$90 corridor as institutional expectations of expanding non-OPEC supply cap upside from regional conflict risks.",
      verification: "confirmed",
      timestamp: "2026-11-21T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Hormuz transit operates under high-friction escort mechanisms with commercial flow constrained under 50%.",
      "Direct bilateral kinetic clashes remain calibrated, but proxy skirmishes across Gulf targets persist.",
      "Mediation tracks in Doha maintain communication without mutual trust for a comprehensive truce."
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
        "Continue: US and Iranian forces exchange air defense and limited kinetic counterstrikes avoiding all-out warfare.",
        "Continue: Regional proxy groups sustain low-yield drone and missile harassment towards Gulf facilities."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial vessel transits remain suppressed under strict escort protocols.",
        "Continue: Persistent mine hazards and projectile threats enforce elevated maritime risk premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil benchmarks fluctuate within WTI $80–84 and Brent $87–90 bands amid supply surplus signals.",
        "Continue: Refiners and trading houses observe cautious inventory replenishment without panic buying."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran hosted Qatari diplomatic mediators while reaffirming its firm preconditions on sanctions.",
        "Continue: Washington reiterates protection of freedom of navigation and sustained economic containment."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US determination to dismantle Iranian nuclear and naval disruption capabilities clashes with Tehran's demand for total blockade removal."
    ],
    military: [
      "Irreconcilable friction between Iran's tactical chokepoint enforcement and US naval freedom-of-navigation operations."
    ]
  },
  scoreTrend: [
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
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70,
      active: true
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
    node406: "11月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.261 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊在霍尔木兹封锁与反封锁博弈中陷入胶着，卡塔尔介入斡旋但未见突破；综合风险分落盘 70（较昨日 持平（+0））",
    bannerWarning: "→ 维持能源商品中性对冲策略，对大宗商品追高保持防御，规避高估值风险资产。",
    deescalationIntent: "美方要求彻底消除伊朗核能力及海峡威胁，而伊朗坚持解除全面经济制裁为前置条件。",
    structuralRisk: "霍尔木兹海峡商业航运受袭风险居高不下，正常商业航运流量降至50%以下。",
    contradictionNote: "美方要求彻底消除伊朗核能力及海峡威胁，而伊朗坚持解除全面经济制裁为前置条件。；霍尔木兹排他性封锁意图与美军公海航行自由及护航主导权的不可调和冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第267天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.261 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US-Iran standoff remains locked in maritime blockade confrontation; Qatari mediation starts without breakthrough, leaving risk score unchan…",
    bannerWarning: "→ Maintain neutral hedging on energy commodities, exercise defensive posture toward high-beta risk assets.",
    deescalationIntent: "US determination to dismantle Iranian nuclear and naval disruption capabilities…",
    structuralRisk: "Commercial vessel traffic remains severely constrained below 50% amidst recurring mine and projecti…",
    contradictionNote: "US determination to dismantle Iranian nuclear and naval disruption capabilities clashes with Tehran's demand for total blockade removal.; Irreconcilable fricti…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 267",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
