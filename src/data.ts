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
  date: "2026-11-01",
  version: "v2.240",
  riskScore: 80,
  keyChange: "海上封锁与航道袭扰风险维持常态化，油价持续在百美元上方震荡，局势维持高压对峙。",
  investmentSignal: "→ 维持能源与大宗商品风险溢价对冲头寸，保持对中东供应链敞口的防御性配置。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D246",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.29",
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
      description: "美军与伊朗在波斯湾及周边水域保持高度对峙，局部无人机与巡逻交锋持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "商船航行安全依然极度脆弱，过境流量依靠高成本接驳，商业海运严重受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI与Brent主力价格位于100–120美元危机区间，地缘溢价保持高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国海空兵力直接执行区域护航与物资封锁，中立大国维持外交穿梭与经贸防范。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "停火与航道安全磋商陷入停滞，双方缺乏实质让步基础。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "UKMTO警示霍尔木兹航道袭扰风险",
      description: "UKMTO与路透社报道显示，商业油轮在霍尔木兹海域面临水面爆炸装置与拦截威胁，航运保费维持历史极端高位。",
      verification: "confirmed",
      timestamp: "2026-10-31T20:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军发布阿曼湾及霍尔木兹避险建议",
      description: "美军中央司令部海军发布警示，建议无必要通行的民用商船避开高风险水域，美军持续强化针对违规运载的封锁排查。",
      verification: "confirmed",
      timestamp: "2026-10-30T18:40:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "基准原油维持百美元危机带波动",
      description: "国际基准油价保持在WTI 102–105美元及Brent 111–114美元区间，市场计入持续的中东航运中断溢价。",
      verification: "confirmed",
      timestamp: "2026-11-01T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军对伊物资封锁与伊朗常态化袭扰并存，商船直接直航意愿低下。",
      "高油价与高保费已演变为长期经济压制因素，短期内缺乏全面脱困契机。"
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
        "延续：美军常态化监控伊朗沿岸设施，双方保持防空与无人机威慑交锋。",
        "延续：未出现大范围地面作战或大规模本土纵深空袭扩大化动作。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹商业直航依然严重受阻，穿梭接驳成为主流但成本高昂。",
        "延续：多国海事安全机构维持对过境船只的最高级别防范警示。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与Brent主力价格坚挺于100–120美元危机区间窄幅运行。",
        "延续：原油现货升水与战争保费构成现阶段油价下限坚实支撑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方核心立场坚定，间接沟通未能就关键航道控制权达成妥协。",
        "延续：美方维持对伊严厉经济制裁与封锁基调，伊朗拒绝单方面停火。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方坚持彻底遏制伊朗不对称打击与海峡封锁能力，德黑兰视封锁对抗为核心反制筹码。"
    ],
    military: [
      "美军区域制海权与伊朗反舰水雷/无人艇不对称拒止能力之间的长期僵持。"
    ]
  },
  scoreTrend: [
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-01",
  version: "v2.240",
  riskScore: 80,
  keyChange: "Naval blockade enforcement and chokepoint harassment remain entrenched, with crude prices pinned above $100 per barrel amid ongoing high-pressure standoff.",
  investmentSignal: "→ Maintain hedges on energy and commodities risk premiums, preserving a defensive posture across Middle East supply chain exposures.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D246",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.29",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and Iranian forces maintain elevated alert and tactical maritime friction across the Persian Gulf corridor.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial vessel transit remains severely constrained, with major liners avoiding straight transits and relying on risky shuttle transfers.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Benchmark crude contracts remain cemented in the $100–120 crisis band, driven by persistent maritime threat premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US military directly enforces maritime interdiction, while other major powers remain restricted to diplomatic engagement and sanction postures.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct and indirect diplomatic channels remain deadlocked over maritime passage terms and sanction relief preconditions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "UKMTO Highlights Ongoing Hormuz Vessel Threats",
      description: "UKMTO and Reuters report that commercial tankers in Hormuz waters face persistent hazards from waterborne improvised explosive devices and harassment.",
      verification: "confirmed",
      timestamp: "2026-10-31T20:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Navy Central Command Advises Against Non-Essential Transits",
      description: "US NAVCENT warns commercial vessels without urgent business to avoid the Gulf of Oman-Hormuz corridor amid ongoing naval blockade operations.",
      verification: "confirmed",
      timestamp: "2026-10-30T18:40:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Benchmarks Consolidate in the $100–120 Crisis Range",
      description: "Global crude benchmarks hold steady in the WTI $102–105 and Brent $111–114 ranges as geopolitical risk premiums remain fully priced in.",
      verification: "confirmed",
      timestamp: "2026-11-01T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US enforcement of maritime interdiction coincides with periodic Iranian asymmetric strikes, keeping commercial traffic suppressed.",
      "Elevated freight rates and persistent crude risk premiums continue to act as a structural drag on global macroeconomic conditions."
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
        "Continue: US and Iranian forces maintain active naval and air surveillance with localized friction.",
        "Continue: No widespread ground escalation or renewed deep-territory air campaigns recorded in the last 24 hours."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Direct commercial transit across Hormuz remains severely impeded, keeping reliance on shuttle transfers elevated.",
        "Continue: International maritime security monitors maintain critical risk advisories for merchant vessels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent trade within the $100–120 crisis band with strong resistance to downside corrections.",
        "Continue: Sustained war risk surcharges and physical delivery bottlenecks provide a firm floor for crude prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington and Tehran hold uncompromising positions regarding naval blockade mandates and sanctions.",
        "Continue: Regional diplomatic efforts have not established viable compromise terms for a temporary maritime ceasefire."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US determination to dismantle Iranian maritime denial capabilities clashes with Tehran's reliance on chokepoint leverage."
    ],
    military: [
      "Conventional US naval control against Iran's asymmetric coastal defense, mine warfare, and drone swarm capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.240 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：海上封锁与航道袭扰风险维持常态化，油价持续在百美元上方震荡，局势维持高压对峙。",
    bannerWarning: "→ 维持能源与大宗商品风险溢价对冲头寸，保持对中东供应链敞口的防御性配置。",
    deescalationIntent: "美方坚持彻底遏制伊朗不对称打击与海峡封锁能力，德黑兰视封锁对抗为核心反制筹码。",
    structuralRisk: "商船航行安全依然极度脆弱，过境流量依靠高成本接驳，商业海运严重受阻。",
    contradictionNote: "美方坚持彻底遏制伊朗不对称打击与海峡封锁能力，德黑兰视封锁对抗为核心反制筹码。；美军区域制海权与伊朗反舰水雷/无人艇不对称拒止能力之间的长期僵持。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第246天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.240 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Naval blockade enforcement and chokepoint harassment remain entrenched, with crude prices pinned above $100 per barrel amid ongoing high-pr…",
    bannerWarning: "→ Maintain hedges on energy and commodities risk premiums, preserving a defensive posture across Middle East supply cha…",
    deescalationIntent: "US determination to dismantle Iranian maritime denial capabilities clashes with…",
    structuralRisk: "Commercial vessel transit remains severely constrained, with major liners avoiding straight transit…",
    contradictionNote: "US determination to dismantle Iranian maritime denial capabilities clashes with Tehran's reliance on chokepoint leverage.; Conventional US naval control agains…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 246",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
