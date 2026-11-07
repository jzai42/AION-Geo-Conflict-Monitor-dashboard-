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
  date: "2026-11-07",
  version: "v2.246",
  riskScore: 74,
  change: "none",
  keyChange: "美军成立铁门特遣队封堵伊朗外部补给，多哈间接调解维持但双方战略要价仍存重大鸿沟。",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，对冲地缘僵局下航运保费与即期原油的波动风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D252",
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
      value: "WTI $89.07–$92.53 · Brent $96.65–$100.92",
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
      description: "CENTCOM与AP报道证实美军持续对波斯湾防空资产实施定点压制，伊朗地下军备产能全面启用。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Seatrade Maritime与Geopolitical Futures监测确认海峡原油通行量维持在极低水准，商船普遍依靠管线分流与外海驳运。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Yahoo Finance数据显示WTI区间$89.07–$92.53、Brent区间$96.65–$100.92，主体处于$85–100显著偏强区间，Reuters指出中期选举后市场对战争溢价再校准但地缘风险托底 https://www.investing.com/commodities/brent-oil。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "DoD公报证实美军成立铁门特遣队联合多机构封锁伊朗物资通道，航母打击群与前沿巡逻保持战备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "卡塔尔外交部官方证实美伊穿梭调解机制仍在运作，但双方停火与豁免诉求存在核心分歧（来源：Qatar MOFA、CBS News）。",
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
        "变化：美中央司令部建立Task Force Iron Gate，协调跨机构切断伊朗陆路及里海物资调配。",
        "变化：伊朗革命卫队宣布弹道导弹与攻击型无人机生产全面转移至深层地下基地。",
        "延续：美伊两军在霍尔木兹入海口保持有限防空对抗与警戒对峙。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗海峡管理机构对西方及盟友船舶维持禁入或强行报备审查制度。",
        "延续：主要商业油轮依赖沙特延布港及阿联酋富查伊拉输油管道绕开封锁区。",
        "延续：水雷威胁与船体损坏风险致使海峡商业战险费率维持在战时最高水准。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际基准油价在经历剧烈回调后围绕WTI $90、Brent $98一线构筑地缘风险支撑平台。",
        "延续：现货月逆价差维持，反映出区域物理断流担忧与宏观需求走弱预期的博弈平衡。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：多哈调解方公开澄清美伊外交窗口未死，否定彻底脱轨论断。",
        "延续：美方坚称军事威慑与海上拦截不设让步，伊朗坚守解除制裁为通航先决条件。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军建立常态化陆海阻截特遣队，封堵战术取代全面空袭成为近期行动重心。",
      "霍尔木兹海峡受控通行与外海驳运成为事实上的战时运输妥协状态。",
      "卡塔尔斡旋管道维持最低限度对话，但双方战略底线未见让步迹象。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求全面中止航运威胁与核能力重建，伊朗要求解除全口径经济制裁及封锁管制。"
    ],
    military: [
      "美军区域拒止封锁网络与伊朗深层地下军备补充能力之间的持久消耗对峙。"
    ]
  },
  scoreTrend: [
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
      score: 74
    },
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军成立铁门特遣队拦截伊朗军备外运通道",
      description: "美军中央司令部宣布组建Task Force Iron Gate，协调跨机构资源阻断伊朗经由陆路走廊与里海水运获得受制裁武器零部件及资金流向。",
      verification: "confirmed",
      timestamp: "2026-11-07 08:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗革命卫队宣布导弹与无人机产线转入地下",
      description: "伊斯兰革命卫队空天部队宣布，所有核心弹道导弹与作战无人机装配设施已完全转入地下掩体，确保在持续封锁下具备持续打击能力。",
      verification: "confirmed",
      timestamp: "2026-11-07 05:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "卡塔尔证实美伊秘密斡旋管道维持运转",
      description: "卡塔尔外交部高级官员公开发言指出，围绕海峡航行权与制裁豁免的多哈非直接接触管道仍在运作，驳斥停火谈判彻底终结的说法。",
      verification: "confirmed",
      timestamp: "2026-11-07 03:40 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "霍尔木兹商船通行保持低位并依赖管线替代",
      description: "航运追踪与卫星数据显示霍尔木兹原油运输量维持在战前约四分之一水准，沙特与阿联酋大幅提升陆上管线负荷以规避南部航道水雷威胁。",
      verification: "confirmed",
      timestamp: "2026-11-06 22:00 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-07",
  version: "v2.246",
  riskScore: 74,
  change: "none",
  keyChange: "US CENTCOM establishes Task Force Iron Gate targeting Iranian supply corridors, while Doha backchannel talks remain intact amid persistent strategic gaps.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities to hedge against lingering shipping volatility and prompt crude supply risk.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D252",
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
      value: "WTI $89.07–$92.53 · Brent $96.65–$100.92",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "严重受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "CENTCOM and AP confirm targeted defensive strikes and interdiction measures while Iran operates fortified underground production facilities.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Seatrade Maritime and Geopolitical Futures trackings show commercial tanker transits severely suppressed under Iranian permits and mining threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Yahoo Finance data shows WTI at $89.07–$92.53 and Brent at $96.65–$100.92 within the $85–100 elevated band; Reuters reports post-midterm repricing with geopolitical floor https://www.investing.com/commodities/brent-oil.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "DoD and Gulf News confirm the activation of Task Force Iron Gate for interagency interdiction alongside continuous naval blockade enforcement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Qatar MOFA statement confirmed active mediation in Doha between Washington and Tehran, though structural deadlock over sanctions and maritime rights persists.",
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
        "Change: CENTCOM activated Task Force Iron Gate to coordinate interagency interdiction of Iranian overland and Caspian weapons routes.",
        "Change: IRGC confirmed complete transition of missile and combat drone production lines into deep underground facilities.",
        "Continue: Limited localized air defense exchanges and standoff patrols persist around the Strait of Hormuz entrance."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian Strait Authority maintains strict transit permit enforcement and selective passage for merchant vessels.",
        "Continue: Regional producers sustain bypass exports through the Red Sea Yanbu pipeline and UAE Fujairah overland routes.",
        "Continue: Heightened war-risk insurance premiums and mine threats keep mainstream commercial crude tankers largely sidelined."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Benchmark crude consolidates in the WTI low-$90s and Brent high-$90s range following the midterm sell-off.",
        "Continue: Front-month backwardation persists as physical supply tightens against macro demand headwinds."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Qatari mediators publicly affirmed backchannel dialogue remains active, rejecting claims of collapsed negotiations.",
        "Continue: Washington maintains strict blockade posture while Tehran demands comprehensive sanctions relief before restoring passage."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Task force interdictions institutionalize the maritime and logistical blockade over sustained bombing raids.",
      "Commercial tanker traffic remains suppressed under an uneasy framework of bypass pipelines and shuttle transfers.",
      "Doha diplomatic backchannels prevent total diplomatic collapse but lack immediate breakthrough momentum."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "US demands an end to maritime interdiction and nuclear weaponization, while Iran insists on full sanctions lifting."
    ],
    military: [
      "US layered choke-point interdiction confronts Iran's dispersed underground strike and mine-warfare capacity."
    ]
  },
  scoreTrend: [
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
      score: 74
    },
    {
      date: "11-06",
      score: 74
    },
    {
      date: "11-07",
      score: 74,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Establishes Task Force Iron Gate to Choke Iranian Weapons Routes",
      description: "US Central Command launched Task Force Iron Gate in Tampa to execute interagency disruption of Iranian weapons and dual-use supply chains across land borders and the Caspian Sea.",
      verification: "confirmed",
      timestamp: "2026-11-07 08:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Relocates Missile and Drone Production Lines Underground",
      description: "IRGC Aerospace Force announced that ballistic missile and UAV manufacturing facilities have been completely sheltered in deep underground bunkers to sustain wartime output.",
      verification: "confirmed",
      timestamp: "2026-11-07 05:15 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Qatar Confirms US-Iran Backchannel Mediation Remains Intact",
      description: "Qatari Foreign Ministry officials confirmed that indirect consultations regarding maritime de-escalation and inspection protocols remain ongoing, refuting rumors of talks collapsing.",
      verification: "confirmed",
      timestamp: "2026-11-07 03:40 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Hormuz Tanker Shipments Subdued as Bypass Pipeline Usage Surges",
      description: "Vessel tracking data indicates seaborne crude transiting Hormuz remains around a quarter of normal volume as Gulf exporters maximize Red Sea and Gulf of Oman overland pipelines.",
      verification: "confirmed",
      timestamp: "2026-11-06 22:00 UTC",
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
    node406: "11月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.246 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：美军成立铁门特遣队封堵伊朗外部补给，多哈间接调解维持但双方战略要价仍存重大鸿沟。",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，对冲地缘僵局下航运保费与即期原油的波动风险。",
    deescalationIntent: "美方要求全面中止航运威胁与核能力重建，伊朗要求解除全口径经济制裁及封锁管制。",
    structuralRisk: "Seatrade Maritime与Geopolitical Futures监测确认海峡原油通行量维持在极低水准，商船普遍依靠管线分流与外海驳运。",
    contradictionNote: "美方要求全面中止航运威胁与核能力重建，伊朗要求解除全口径经济制裁及封锁管制。；美军区域拒止封锁网络与伊朗深层地下军备补充能力之间的持久消耗对峙。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第252天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.246 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): US CENTCOM establishes Task Force Iron Gate targeting Iranian supply corridors, while Doha backchannel talks remain intact amid persistent …",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities to hedge against lingering shipping volatility and prompt cr…",
    deescalationIntent: "US demands an end to maritime interdiction and nuclear weaponization, while Ira…",
    structuralRisk: "Seatrade Maritime and Geopolitical Futures trackings show commercial tanker transits severely suppr…",
    contradictionNote: "US demands an end to maritime interdiction and nuclear weaponization, while Iran insists on full sanctions lifting.; US layered choke-point interdiction confro…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 252",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
