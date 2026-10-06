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
  date: "2026-10-06",
  version: "v2.213",
  riskScore: 64,
  keyChange: "美伊战事陷入海上封锁与消耗僵局，G7联合释储部分平抑即期供应恐慌，海峡通航与多线代理冲突未现降级拐点。",
  investmentSignal: "→ 维持能源与大宗商品结构性对冲，对风险资产保持防御配置。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D220",
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
      value: "WTI $86.86–$90.05 · Brent $97.08–$100.98",
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
      description: "美军、也门联军与伊朗支持力量在红海与海湾多地维持高频交火与防空拦截，据Reuters与Gulf News多源报道确认。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "UKMTO与路透社通报LPG船及商船遭袭，伊朗IRGC实施严格排查，商业船队通行量持续受压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI在$86.86–$90.05区间，Brent在$97.08–$100.98震荡，上沿紧贴$100危机带下沿，G7释储阻滞了极端飙升，保守取档3.5分。依据：https://tradingeconomics.com/commodity/brent-crude-oil",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持前沿打击及拦截警戒，土耳其与巴基斯坦等区域盟友协调防御部署，属于深化军事协助范畴（Reuters、AP）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "阿纳多卢通讯社与伊通社证实美伊经由卡塔尔接触，但就解除制裁与霍尔木兹控制权存在实质分歧，处于脆弱对话状态。",
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
      "美伊双方围绕霍尔木兹与红海关键航运水道展开封锁与反封锁对抗。",
      "战术行动聚焦于削弱对手后勤与能源出口能力，大国直接碰撞被谨慎约束。",
      "间接外交接触保持通畅，但实质停火条件差距巨大难以形成突破。"
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
        "延续：美军战备力量与区域代理武装在海湾及也门多战线维持交火对峙。",
        "变化：也门政府军在多线发起反攻，沙特联军与区域盟友强化防空联防机制。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：波斯湾及红海高危水域船舶险资成本高企，主要船东普遍采取绕行策略。",
        "变化：UKMTO确认霍尔木兹周边发生商船机舱中弹受损事件，临检与袭扰风险外溢。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：中东供应不确定性支撑全球基准油价保持近百美元高位运行。",
        "变化：G7宣布释放1亿桶应急燃料与原油储备，短线抑制布伦特突破百元心理关口的动能。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊高层公开承认需要外交解决方案，但战略威慑言论未见软化。",
        "变化：伊朗将恢复霍尔木兹航运安全作为谈判前置议题，美方未作出明确政策妥协。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "华盛顿要求伊朗停止支持地区代理人并彻底限制核计划，与德黑兰要求全面解除制裁针锋相对。",
      "双方均难以在现阶段向国内鹰派势力展现公开妥协退让。"
    ],
    military: [
      "美军海空封锁压制与伊朗不对称袭船/反舰导弹威慑之间的长期消耗博弈。"
    ]
  },
  scoreTrend: [
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "商船在霍尔木兹水域遭不明飞行物击中",
      description: "UKMTO与路透社报道，一艘商业运输船在霍尔木兹海峡附近遭不明飞行物击中造成机舱受损，无人员伤亡，海峡安保警戒全面提升。",
      verification: "confirmed",
      timestamp: "2026-10-06（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美伊停火间接磋商陷于僵局",
      description: "阿纳多卢通讯社与伊通社引述伊朗外交部声明称，美伊关于恢复海峡航行安全的提案因制裁解除分歧未获突破，双方立场强硬。",
      verification: "confirmed",
      timestamp: "2026-10-06（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "G7出台1亿桶释储计划平抑油价",
      description: "彭博社与路透社报道，G7国家协调释放1亿桶应急战略原油与燃料，抵消部分霍尔木兹供应中断溢价，油价涨势暂缓。",
      verification: "confirmed",
      timestamp: "2026-10-06（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "也门战场多线交火与代理人对抗加剧",
      description: "海湾新闻报道，沙特联军与也门政府军沿红海走廊发起攻势，胡塞武装宣称对沙特后方实施报复性袭击，冲突未见收束。",
      verification: "confirmed",
      timestamp: "2026-10-06（当日公开报道）",
      significance: ""
    }
  ],
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-06",
  version: "v2.213",
  riskScore: 64,
  keyChange: "The US-Iran conflict remains locked in a maritime blockade and attrition standoff; G7 strategic reserve releases have temporarily cushioned acute supply panic, but no de-escalation pivot has materialized.",
  investmentSignal: "→ Maintain structural hedges in energy and commodities while keeping a defensive posture on risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D220",
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
      value: "WTI $86.86–$90.05 · Brent $97.08–$100.98",
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
      description: "US forces, coalition units, and Iran-backed groups sustain active multi-front strikes and air defense engagements across the Gulf and Red Sea, as verified by Reuters and Gulf News.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "UKMTO and Reuters report confirmed projectile strikes and IRGC-enforced transit controls, maintaining commercial flow suppression.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI trades within $86.86–$90.05 while Brent fluctuates within $97.08–$100.98; upper boundary brushes the $100 crisis band, justifying a conservative 3.5 score. Ref: https://tradingeconomics.com/commodity/brent-crude-oil",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces maintain forward escort and deterrence operations, with regional allies coordinating joint defensive measures (Reuters, AP).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Anadolu Agency and IRNA confirm indirect communications via Qatar, but deep divisions on sanctions relief and maritime access leave talks stalled.",
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
      "Both parties are engaged in blockade and counter-blockade maneuvers around the Hormuz and Red Sea choke points.",
      "Tactical operations prioritize eroding logistics and energy revenues while avoiding full-scale ground collision.",
      "Indirect diplomatic channels remain open, but conflicting redlines preclude an immediate breakthrough."
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
        "Continue: US combat elements and regional proxies maintain sustained skirmishes and strike exchanges across Yemen and Gulf waters.",
        "Change: Yemeni government forces counterattack along the Red Sea coast while regional partners deepen air defense coordination."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Sky-high marine insurance rates and re-routing via the Cape of Good Hope persist across commercial fleets.",
        "Change: UKMTO confirms a projectile strike damaging a tanker engine room near Hormuz, raising localized threat alarms."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Middle East supply uncertainties sustain international benchmark crude prices near the $100 threshold.",
        "Change: G7's coordinated 100M-barrel emergency reserve release stems further immediate price spikes toward panic territory."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both US and Iranian leaders publicly emphasize the lack of purely military solutions while keeping deterrence active.",
        "Change: Tehran explicitly sets Hormuz security guarantees as a prerequisite, while Washington resists unconditional sanctions concessions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands an end to regional proxy operations and nuclear containment, directly clashing with Tehran's demand for full sanctions lifting.",
      "Domestic political constraints in both capitals prevent public concessions on core security terms."
    ],
    military: [
      "The asymmetric attrition battle between US naval-air containment and Iranian anti-ship missile/drone disruption networks."
    ]
  },
  scoreTrend: [
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64
    },
    {
      date: "10-05",
      score: 64
    },
    {
      date: "10-06",
      score: 64,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Commercial Tanker Struck by Projectile near Hormuz",
      description: "UKMTO and Reuters report a commercial tanker sustained engine room damage from an unidentified projectile near the Strait of Hormuz; no crew casualties reported.",
      verification: "confirmed",
      timestamp: "2026-10-06 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US-Iran Indirect Ceasefire Talks Reach Impasse",
      description: "Anadolu Agency and IRNA cite Iranian foreign ministry statements indicating US proposals failed to offer meaningful sanctions relief, stalling negotiations.",
      verification: "confirmed",
      timestamp: "2026-10-06 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "G7 Commits 100M-Barrel Emergency Reserve Release",
      description: "Bloomberg and Reuters confirm G7 nations agreed to release emergency fuel and crude stocks, mitigating immediate spike fears across global hubs.",
      verification: "confirmed",
      timestamp: "2026-10-06 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Yemen Fighting Intensifies Along Red Sea Chokepoint",
      description: "Gulf News reports Yemeni government forces pressed a multi-front counteroffensive while Houthis claimed retaliatory attacks, keeping southern sea lanes volatile.",
      verification: "confirmed",
      timestamp: "2026-10-06 (same-day reporting)",
      significance: ""
    }
  ],
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.213 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：美伊战事陷入海上封锁与消耗僵局，G7联合释储部分平抑即期供应恐慌，海峡通航与多线代理冲突未现降级拐点。",
    bannerWarning: "→ 维持能源与大宗商品结构性对冲，对风险资产保持防御配置。",
    deescalationIntent: "华盛顿要求伊朗停止支持地区代理人并彻底限制核计划，与德黑兰要求全面解除制裁针锋相对。",
    structuralRisk: "UKMTO与路透社通报LPG船及商船遭袭，伊朗IRGC实施严格排查，商业船队通行量持续受压。",
    contradictionNote: "华盛顿要求伊朗停止支持地区代理人并彻底限制核计划，与德黑兰要求全面解除制裁针锋相对。；美军海空封锁压制与伊朗不对称袭船/反舰导弹威慑之间的长期消耗博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第220天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.213 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): The US-Iran conflict remains locked in a maritime blockade and attrition standoff; G7 strategic reserve releases have temporarily cushioned…",
    bannerWarning: "→ Maintain structural hedges in energy and commodities while keeping a defensive posture on risk assets.",
    deescalationIntent: "Washington demands an end to regional proxy operations and nuclear containment,…",
    structuralRisk: "UKMTO and Reuters report confirmed projectile strikes and IRGC-enforced transit controls, maintaini…",
    contradictionNote: "Washington demands an end to regional proxy operations and nuclear containment, directly clashing with Tehran's demand for full sanctions lifting.; The asymmet…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 220",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
