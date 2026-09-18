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
  date: "2026-09-18",
  version: "v2.196",
  riskScore: 76,
  keyStats: [
    {
      label: "冲突天数",
      value: "D202",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $94.83–$97.41 · Brent $97.81–$99.62",
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
      description: "美以伊三方战线持续互射导弹与无人机打击，区域军事行动维持全面高烈度冲突状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡主要商业航运仍严重受阻，过境流量显著低于历史均值。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "油价自百元危机带回落，WTI与Brent盘中主体运行于$85–100美元偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国海空军及盟友维持前沿战备与情报支援，并未触发多国直面全面交战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交斡旋进展停滞，交战方立场强硬且缺乏可信的临时停火机制。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "中东前线多方交火固化，防空与导弹袭击维持高强度消耗态势。",
      "沙特启用替代输油管道与离岸转运机制，部分化解原油供应极端挤压。",
      "核心安全诉求严重对立，停火谈判无突破迹象，进入脆弱平衡阶段。"
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
        "延续：红海至波斯湾沿线导弹与防空拦截处于全天候对峙状态。",
        "变化：交火焦点转向基础设施攻防与远距离无人机压制，地面未见新突破。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商业通行维持严格避险，保费依然处于高位。",
        "变化：部分承运人通过阿曼苏哈尔港口展开船对船接驳以绕行狭窄水域。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特及WTI双双跌破100美元关口，恐慌性买盘边际降温。",
        "延续：沙特东西管道运力仅恢复部分，全球现货实货供应整体偏紧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：交战各方高层重申威慑底线，拒绝对关键让步做出承诺。",
        "变化：区域第三国推动多边出口安全保障，但未延伸至政治层面和解。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美以对伊朗军事基础设施的消除目标与伊朗政权生存威慑之间不可调和。",
      "中东能源主权保障诉求与战时封锁行动形成剧烈战略摩擦。"
    ],
    military: [
      "远程防空反导弹药的快速消耗与低成本无人机群蜂拥渗透的不对称消耗。"
    ]
  },
  keyChange: "沙特通过替代管道修复与阿曼船对船转运部分恢复出口能力，带动国际油价回落至百元下方，地缘风险综合分较昨日回落4分至76分。",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，原油回落至百元下方降低极端尾部风险，建议适度对冲风险资产波动。",
  events: [
    {
      id: "e-20260918-01",
      title: "沙特推进管道抢修并启动阿曼转运缓解断供恐慌",
      description: "沙特阿拉伯加速抢修东西管道以恢复半数运力，并经由阿曼苏哈尔港展开船对船原油转运交付亚洲客户，平抑红海延误溢价。",
      verification: "confirmed",
      timestamp: "2026-09-18T05:20:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e-20260918-02",
      title: "国际油价承压回落跌破100美元关口",
      description: "受沙特替代出口机制及航运替代生效推动，WTI运行于$94.83–$97.41，Brent跌至$97.81–$99.62，双双回落至百元下方。",
      verification: "confirmed",
      timestamp: "2026-09-18T13:16:00Z",
      significance: ""
    },
    {
      id: "e-20260918-03",
      title: "中东多线交火对峙持续但无地面战事扩大",
      description: "前沿防空对抗与跨境无人机拦截频次高位固化，双方均未展现停火意愿，全面冲突状态持续。",
      verification: "confirmed",
      timestamp: "2026-09-17T21:40:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
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
      score: 80
    },
    {
      date: "09-18",
      score: 76,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-18",
  version: "v2.196",
  riskScore: 76,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D202",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $94.83–$97.41 · Brent $97.81–$99.62",
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
      description: "Active missile exchanges and multi-front air defense confrontations keep the theater in full-scale conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel transit through the strait remains severely restricted, operating well under normal volume.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Oil retreated below the $100 crisis boundary, with WTI and Brent sessions largely within the $85–100 tier.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US and allied forces maintain forward air defense and maritime escorts without triggering direct global power clashes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic initiatives remain deadlocked with high risk of complete diplomatic impasse and zero mutual compromise.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Regional frontlines maintain heavy air defense and missile exchanges in protracted attrition.",
      "Saudi pipeline repairs and offshore transfer mechanisms partially ease critical energy supply bottlenecks.",
      "Irreconcilable strategic aims leave diplomatic talks stalled, consolidating a fragile balance."
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
        "Continue: Air defense alerts and drone/missile intercepts remain constant along peripheral frontiers.",
        "Change: Clashes emphasize infrastructure standoffs and long-range fires with no ground expansion."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait of Hormuz commercial traffic maintains severe risk avoidance and inflated insurance.",
        "Change: Shippers utilize ship-to-ship transfers off Sohar, Oman to bypass choke points."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Both Brent and WTI slid below $100/bbl as extreme physical supply panic moderated.",
        "Continue: Partial pipeline restarts leave global physical prompt supplies tight."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Opposing leaderships reiterate deterrent red lines without concessions.",
        "Change: Third-party regional actors promote maritime corridor protocols without broader political détente."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US-Israeli aim of degrading adversary infrastructure directly opposes Iranian strategic survival postures.",
      "Regional resource defense rights clash directly with tactical wartime shipping restrictions."
    ],
    military: [
      "Rapid expenditure of high-cost air defense interceptors against sustained low-cost drone saturation."
    ]
  },
  keyChange: "Saudi export capacity mitigation via pipeline repairs and offshore STS transfers pushed crude benchmarks below $100/bbl, driving the composite risk score down 4 points to 76.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities; with crude slipping below the $100 threshold, hedge against ongoing risk asset volatility.",
  events: [
    {
      id: "e-20260918-01",
      title: "Saudi Arabia advances pipeline restoration and Oman transfers to ease export disruption",
      description: "Riyadh moved to restore capacity on the East-West pipeline while delivering crude via ship-to-ship transfers off Sohar, calming severe outage fears.",
      verification: "confirmed",
      timestamp: "2026-09-18T05:20:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e-20260918-02",
      title: "Crude benchmarks retreat below $100 barrier",
      description: "Aided by alternative export measures, WTI settled between $94.83–$97.41 and Brent fell to $97.81–$99.62, giving back psychological $100 premiums.",
      verification: "confirmed",
      timestamp: "2026-09-18T13:16:00Z",
      significance: ""
    },
    {
      id: "e-20260918-03",
      title: "Multi-front border skirmishes and missile defense engagements persist",
      description: "Cross-border drone and missile strikes continue at an elevated pace across the theater with neither party indicating operational pauses.",
      verification: "confirmed",
      timestamp: "2026-09-17T21:40:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
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
      score: 80
    },
    {
      date: "09-18",
      score: 76,
      active: true
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
    node406: "9月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.196 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↓4）：沙特通过替代管道修复与阿曼船对船转运部分恢复出口能力，带动国际油价回落至百元下方，地缘风险综合分较昨日回落4分至76分。",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，原油回落至百元下方降低极端尾部风险，建议适度对冲风险资产波动。",
    deescalationIntent: "美以对伊朗军事基础设施的消除目标与伊朗政权生存威慑之间不可调和。",
    structuralRisk: "霍尔木兹海峡主要商业航运仍严重受阻，过境流量显著低于历史均值。",
    contradictionNote: "美以对伊朗军事基础设施的消除目标与伊朗政权生存威慑之间不可调和。；远程防空反导弹药的快速消耗与低成本无人机群蜂拥渗透的不对称消耗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第202天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.196 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↓4): Saudi export capacity mitigation via pipeline repairs and offshore STS transfers pushed crude benchmarks below $100/bbl, driving the compos…",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities; with crude slipping below the $100 threshold, hedge against…",
    deescalationIntent: "US-Israeli aim of degrading adversary infrastructure directly opposes Iranian s…",
    structuralRisk: "Commercial vessel transit through the strait remains severely restricted, operating well under norm…",
    contradictionNote: "US-Israeli aim of degrading adversary infrastructure directly opposes Iranian strategic survival postures.; Rapid expenditure of high-cost air defense intercep…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 202",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
