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
  date: "2026-11-21",
  version: "v2.260",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D266",
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
      description: "美伊在霍尔木兹海峡空域爆发战术交火，伊朗宣称击落美军无人机，美军持续战备打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡出入口两艘商用油轮遭遇导弹或抛射物袭击，商业航行严重受限依赖护航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油基准价格处于高位震荡，布伦特上限触及90美元上方，供应担忧显著偏强但未出现恶性断供。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军第三航母打击群在战区执勤，维持全面空中警戒与前线盟友防空支援。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "柏林非正式斡旋开启但缺乏核心妥协，谈判通道脆弱停滞。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "ev-20261121-01",
      title: "伊朗宣称在霍尔木兹海峡击落第58架美军MQ-9无人机",
      description: "伊朗革命卫队及官方媒体报道称，其新型防空系统在格什姆岛空域拦截并击落一架美军MQ-9 Reaper察打无人机。",
      verification: "confirmed",
      timestamp: "2026-11-21T11:39:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261121-02",
      title: "UKMTO确认霍尔木兹海峡外海两艘油轮遭抛射物袭击",
      description: "英国海上贸易行动办公室报告两艘油轮在阿曼海域被不明飞行物击中船尾和机舱，航运安全警报维持最高等级。",
      verification: "confirmed",
      timestamp: "2026-11-21T08:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261121-03",
      title: "美卡外交代表在柏林就潜在降级方案进行非正式接触",
      description: "Axios披露美方官员与卡塔尔调解方在柏林闭门讨论美伊缓和路径，双方分歧依然尖锐。",
      verification: "confirmed",
      timestamp: "2026-11-21T06:30:00Z",
      significance: ""
    },
    {
      id: "ev-20261121-04",
      title: "国际原油在供给过剩预期与海峡地缘风险间维持宽幅盘整",
      description: "受袭击油轮消息与IEA过剩预期双向拉动，布伦特油价徘徊在87-90美元区间，WTI处80-84美元带。",
      verification: "confirmed",
      timestamp: "2026-11-21T17:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡商船频繁遇袭强化美军护航防御成本",
      "伊朗新型防空武器展示形成战术威慑但未触发生死决战",
      "外交谈判渠道虽保持开放但各方均缺乏重大让步意愿"
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
        "变化：伊朗防空部队在格什姆岛上空击落美军MQ-9无人机。",
        "延续：美军三航母打击群战备部署，维持战区警戒巡逻。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO通报两艘商业油轮在阿曼海域被抛射物击中受损。",
        "延续：商业通行量持续受抑，多数航运公司需护航或改道绕行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI在80-84美元与Brent在87-90美元区间维持偏强震荡。",
        "延续：全球库存缓冲与海峡航运受阻风险形成拉锯平衡。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方与卡塔尔斡旋代表在柏林展开间接接触沟通。",
        "延续：白宫与德黑兰官方表态均未表现出无条件停火退让意愿。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求确保霍尔木兹无条件自由通行与核设施全面监督",
      "伊朗坚持以解除制裁与停止军事护航封锁为任何停火前提"
    ],
    military: [
      "美军区域防空反导与护航巡逻维持高强度战备消耗",
      "伊朗利用低成本无人机与反舰打击持续考验联军防守韧性"
    ]
  },
  keyChange: "霍尔木兹商船遭袭事件重现与美军无人机被击落，打破短暂平静，推动冲突烈度高位固化。",
  investmentSignal: "→ 维持防御性大宗商品与能源多头对冲配置，审慎控制风险资产敞口以防突发外溢。",
  scoreTrend: [
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
      score: 70
    },
    {
      date: "11-21",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-21",
  version: "v2.260",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D266",
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
      description: "Tactical skirmishes persist over Hormuz airspace with an MQ-9 drone shootdown and targeted air strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Two commercial tankers struck by projectiles near Oman waters, keeping navigation severely constricted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Benchmark crude prices hold firm within elevated ranges, with Brent nearing $90 amid persistent geopolitical premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains three carrier strike groups in theater providing high-intensity patrol, air cover, and logistics escorts.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Backchannel mediation in Berlin via Qatari interlocutors remains active but stalled by rigid preconditions.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "ev-20261121-01",
      title: "Iran Claims Intercepting 58th US MQ-9 Drone Over Strait of Hormuz",
      description: "IRGC announced its new air defense system tracked and downed a US MQ-9 Reaper drone in the airspace above Qeshm Island.",
      verification: "confirmed",
      timestamp: "2026-11-21T11:39:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261121-02",
      title: "UKMTO Reports Two Commercial Tankers Hit by Projectiles Off Oman",
      description: "UK Maritime Trade Operations reported two tankers sustained projectile impacts to engine and stern compartments off Khasab with no casualties.",
      verification: "confirmed",
      timestamp: "2026-11-21T08:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20261121-03",
      title: "US and Qatari Officials Conduct Indirect Consultations in Berlin",
      description: "Axios reported US representatives engaged Qatari intermediaries in Berlin to discuss potential de-escalation parameters amid firm stances.",
      verification: "confirmed",
      timestamp: "2026-11-21T06:30:00Z",
      significance: ""
    },
    {
      id: "ev-20261121-04",
      title: "Crude Benchmark Oscillates Amid Chokepoint Threats and Supply Surplus Outlook",
      description: "Crude futures settled in wide ranges with Brent fluctuating in $87-90 and WTI in $80-84, balanced by IEA surplus projections and Hormuz incident risk.",
      verification: "confirmed",
      timestamp: "2026-11-21T17:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Sustained tanker targeting underscores severe operational friction for regional transit",
      "Iranian air defense engagement demonstrates localized deterrence without crossing full-war red lines",
      "Diplomatic channels remain intact through intermediaries but lack concessions for meaningful de-escalation"
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
        "Change: IRGC air defense units downed a US MQ-9 reconnaissance drone near Qeshm Island.",
        "Continue: US 5th Fleet maintains three carrier groups on high alert across operational corridors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO confirmed two commercial tankers were struck by unidentified projectiles near Oman.",
        "Continue: Traffic remains heavily throttled, requiring military convoy escorts or Cape bypass routes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI at $80-84 and Brent at $87-90 maintain strong trading ranges with balanced fundamentals.",
        "Continue: Global inventory cushions mitigate acute supply shock spikes despite persistent chokepoint friction."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US envoys engaged Qatari mediators in Berlin to explore diplomatic off-ramps.",
        "Continue: Official rhetoric from Washington and Tehran maintains unyielding baseline security demands."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands unimpeded commercial navigation and verifiable nuclear containment",
      "Tehran insists on complete sanctions removal and the cessation of foreign naval blockades"
    ],
    military: [
      "Allied naval escorts face high readiness strain across extended maritime corridors",
      "Iranian asymmetric drone and missile tactics sustain cost-effective disruption along critical straits"
    ]
  },
  keyChange: "Renewed projectile attacks on tankers and air defense drone shootdowns reinforce the prevailing high-pressure stalemate.",
  investmentSignal: "→ Maintain defensive hedging in energy and commodity assets while selectively adding to safe-haven positions amid persistent shipping chokepoint risks.",
  scoreTrend: [
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
      score: 70
    },
    {
      date: "11-21",
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
    node406: "11月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.260 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：霍尔木兹商船遭袭事件重现与美军无人机被击落，打破短暂平静，推动冲突烈度高位固化。",
    bannerWarning: "→ 维持防御性大宗商品与能源多头对冲配置，审慎控制风险资产敞口以防突发外溢。",
    deescalationIntent: "美方要求确保霍尔木兹无条件自由通行与核设施全面监督",
    structuralRisk: "海峡出入口两艘商用油轮遭遇导弹或抛射物袭击，商业航行严重受限依赖护航。",
    contradictionNote: "美方要求确保霍尔木兹无条件自由通行与核设施全面监督；美军区域防空反导与护航巡逻维持高强度战备消耗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第266天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.260 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Renewed projectile attacks on tankers and air defense drone shootdowns reinforce the prevailing high-pressure stalemate.",
    bannerWarning: "→ Maintain defensive hedging in energy and commodity assets while selectively adding to safe-haven positions amid persi…",
    deescalationIntent: "Washington demands unimpeded commercial navigation and verifiable nuclear conta…",
    structuralRisk: "Two commercial tankers struck by projectiles near Oman waters, keeping navigation severely constric…",
    contradictionNote: "Washington demands unimpeded commercial navigation and verifiable nuclear containment; Allied naval escorts face high readiness strain across extended maritime…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 266",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
