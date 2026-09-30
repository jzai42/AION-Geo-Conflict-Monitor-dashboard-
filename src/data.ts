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
  date: "2026-09-30",
  version: "v2.207",
  riskScore: 60,
  keyStats: [
    {
      label: "冲突天数",
      value: "D214",
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
      value: "WTI $88.58–$91.76 · Brent $95.14–$99.22",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军按期完成在伊拉克部队撤出交接，战线以局部防空截击与代理交火为主，未发生超出交战规则的大规模纵深打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "霍尔木兹海峡维持高度管制与选择性许可通航，常规商业班轮绕行非洲好望角，通行量较战前受限约50%至90%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价整体在$88–$99美元区间高位震荡，沙特东西管线扩能350万桶/日缓解即期断供担忧，遏制了向$100以上危机带的急剧突破。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战区海上封锁执行力与前沿防御编队，并协同卡塔尔与巴基斯坦进行外交信件传递，大国对抗维持在威慑与调解通道内。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "德黑兰官方证实收到美方关于七日停火与海峡通航的反提案，双边谈判渠道未断裂，但双方核心底线分歧巨大，尚未达成任何执行协议。",
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
      "美军撤出伊拉克驻地，美伊前沿直接摩擦触点技术性减少。",
      "美伊双方围绕霍尔木兹海峡7日通航提议交换反提案，间接斡旋通道保持运作。",
      "沙特延布港装运放量与东西管线投产对冲了海峡断航对全球原油的部分供给缺口。"
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
        "延续：红海及波斯湾空域维持局部防空雷达锁定与防空截击对峙态势。",
        "变化：美军正式完成伊拉克全部驻军撤离并向伊拉克军方完成基地交接。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹主航道受伊朗海上封锁与高额战险制约，常态商船通行量维持低位。",
        "变化：沙特东西输油管道恢复至约350万桶/日，部分原油转由红海延布港外运。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油价基准维持在$85–$100显著偏强区间。",
        "变化：Brent自百元关口上方回踩至$95–$99区间整理，WTI震荡收敛于$88–$92一带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿与德黑兰高层继续在公开舆论场展示坚定威慑立场。",
        "变化：伊朗总统佩泽什基安内阁正式审阅美方经卡塔尔递交的停火反提案文本。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "德黑兰要求全面解除海上封锁与经济制裁作为恢复海峡航行安全的前提条件。",
      "华盛顿坚持要求伊朗先行保障霍尔木兹无限制无差别自由通航方可启动全面核与安全谈判。"
    ],
    military: [
      "美军在战区部署的封锁舰队与伊朗岸基反舰导弹系统形成相互威慑锁定。",
      "沙特旁路管道的输送能力与海峡全面瘫痪带来的每日1500万桶短缺缺口之间的物理极限对抗。"
    ]
  },
  keyChange: "美伊通过多哈间接渠道正式交换书面反提案，同时沙特东西输油管道恢复至350万桶/日，供给避险与外交探底共同将油价锁定在$88–$99的高位震荡区间。",
  investmentSignal: "→ 维持能源上游与防御性资产底仓配置，在大宗商品宽幅震荡与间接谈判反复中逢高适度对冲风险资产敞口。",
  events: [
    {
      id: "EVT-01",
      title: "美方递交海峡通行反提案",
      description: "伊朗外长阿拉格齐向总统佩泽什基安递交经由卡塔尔调解人转交的美方书面反提案，双方就分阶段通航展开新一轮间接接触。",
      verification: "confirmed",
      timestamp: "2026-09-30T04:41:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "沙特东西管道恢复至350万桶/日",
      description: "沙特阿美恢复延布方向管道输量并向客户确认10月红海港口装船计划，有效缓释了波斯湾出口受阻带来的即期恐慌。",
      verification: "confirmed",
      timestamp: "2026-09-30T05:06:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军完成伊拉克撤军任务",
      description: "美军宣布结束在伊拉克长达12年的既定军事任务，将剩余防务设施移交伊拉克安全部队，减少了美伊陆上直接摩擦接点。",
      verification: "confirmed",
      timestamp: "2026-09-30T05:44:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准于$88–$99区间宽幅震荡",
      description: "WTI与Brent期货分别在$88.58–$91.76及$95.14–$99.22之间波动，地缘风险溢价与替代供应增量呈现动态抗衡。",
      verification: "confirmed",
      timestamp: "2026-09-30T15:28:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-26",
      score: 60
    },
    {
      date: "09-27",
      score: 60
    },
    {
      date: "09-28",
      score: 60
    },
    {
      date: "09-29",
      score: 60
    },
    {
      date: "09-30",
      score: 60,
      active: true
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-30",
  version: "v2.207",
  riskScore: 60,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D214",
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
      value: "WTI $88.58–$91.76 · Brent $95.14–$99.22",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "严重受限",
      unit: "Transit",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "U.S. forces completed their withdrawal from Iraq as scheduled, while active combat remained limited to standoff air-defense intercepts and proxy skirmishes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The Strait of Hormuz remained under tight Iranian military scrutiny and selective transit controls, keeping commercial flow within the 50–90% constrained corridor.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices fluctuated in the $88–$99 range as Saudi pipeline flows of 3.5m bpd to Yanbu relieved prompt physical supply distress, capping further moves past $100.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The U.S. maintained naval deployment and regional blockade enforcement while conducting indirect diplomacy via Qatar, avoiding unilateral ground escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Tehran confirmed receipt of the formal U.S. counterproposal on Hormuz navigation and ceasefire staging, keeping channels open despite substantial divergence on terms.",
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
      "U.S. forces completed troop withdrawal from Iraq bases, lowering direct land contact surfaces.",
      "Tehran and Washington exchanged formal counterproposals on a 7-day Hormuz corridor through Qatari mediation.",
      "Saudi pipeline bypass expansion to Yanbu offset partial crude export losses from the Persian Gulf."
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
        "Continue: Regional air-defense intercepts and proxy border posturing persisted across the Persian Gulf and Red Sea.",
        "Change: U.S. forces formally completed troop withdrawal and base handovers in Iraq."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait transit remained constrained under selective clearance protocols and prohibitive war-risk insurance.",
        "Change: Saudi East-West pipeline expanded operations to 3.5m bpd, diverting crude loadings toward Yanbu."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Benchmark crude remained elevated in the noticeably firm $85–$100 price band.",
        "Change: Brent consolidated below the $100 threshold into $95–$99 while WTI fluctuated between $88–$92."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Public statements from Washington and Tehran maintained firm deterrent postures.",
        "Change: President Pezeshkian's cabinet reviewed the formal U.S. counterproposal received via Doha."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Tehran demands full relief from maritime blockades and economic sanctions before committing to permanent Hormuz freedom of navigation.",
      "Washington demands immediate, unconditional civilian transit guarantees through the Strait of Hormuz before advancing nuclear and security talks."
    ],
    military: [
      "U.S. naval blockade forces and Iranian coastal anti-ship missile batteries remain locked in mutual deterrence.",
      "Physical throughput capacity of regional bypass pipelines limits how much of the 15m bpd Gulf export volume can be diverted indefinitely."
    ]
  },
  keyChange: "Washington transmitted a formal counterproposal to Tehran via Qatari mediation as Saudi Arabia expanded Yanbu pipeline bypass flows to 3.5m bpd, anchoring crude within the $88–$99 band.",
  investmentSignal: "→ Maintain baseline exposure to upstream energy and defensive assets while selectively hedging risk asset portfolios against ongoing commodity volatility and diplomatic swings.",
  events: [
    {
      id: "EVT-01",
      title: "U.S. Delivers Hormuz Counterproposal",
      description: "Iranian Foreign Minister Araghchi presented a formal U.S. counterproposal received via Qatari mediators to President Pezeshkian regarding phased maritime reopening.",
      verification: "confirmed",
      timestamp: "2026-09-30T04:41:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Saudi East-West Pipeline Restores 3.5m bpd",
      description: "Saudi Aramco restored East-West pipeline throughput to 3.5m bpd and scheduled October loadings at Yanbu, easing immediate supply shortage anxiety.",
      verification: "confirmed",
      timestamp: "2026-09-30T05:06:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "U.S. Troops Complete Iraq Mission",
      description: "The U.S. military finalized its planned troop redeployment out of Iraq bases, concluding a 12-year counter-ISIS mission and reducing direct tactical friction points.",
      verification: "confirmed",
      timestamp: "2026-09-30T05:44:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Consolidate in $88–$99 Range",
      description: "WTI and Brent traded within $88.58–$91.76 and $95.14–$99.22 respectively as regional bypass volumes balanced persistent geopolitical risk premia.",
      verification: "confirmed",
      timestamp: "2026-09-30T15:28:00Z",
      significance: ""
    }
  ],
  scoreTrend: [
    {
      date: "09-26",
      score: 60
    },
    {
      date: "09-27",
      score: 60
    },
    {
      date: "09-28",
      score: 60
    },
    {
      date: "09-29",
      score: 60
    },
    {
      date: "09-30",
      score: 60,
      active: true
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.207 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：美伊通过多哈间接渠道正式交换书面反提案，同时沙特东西输油管道恢复至350万桶/日，供给避险与外交探底共同将油价锁定在$88–$99的高位震荡区间。",
    bannerWarning: "→ 维持能源上游与防御性资产底仓配置，在大宗商品宽幅震荡与间接谈判反复中逢高适度对冲风险资产敞口。",
    deescalationIntent: "德黑兰要求全面解除海上封锁与经济制裁作为恢复海峡航行安全的前提条件。",
    structuralRisk: "霍尔木兹海峡维持高度管制与选择性许可通航，常规商业班轮绕行非洲好望角，通行量较战前受限约50%至90%。",
    contradictionNote: "德黑兰要求全面解除海上封锁与经济制裁作为恢复海峡航行安全的前提条件。；美军在战区部署的封锁舰队与伊朗岸基反舰导弹系统形成相互威慑锁定。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第214天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.207 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): Washington transmitted a formal counterproposal to Tehran via Qatari mediation as Saudi Arabia expanded Yanbu pipeline bypass flows to 3.5m…",
    bannerWarning: "→ Maintain baseline exposure to upstream energy and defensive assets while selectively hedging risk asset portfolios ag…",
    deescalationIntent: "Tehran demands full relief from maritime blockades and economic sanctions befor…",
    structuralRisk: "The Strait of Hormuz remained under tight Iranian military scrutiny and selective transit controls,…",
    contradictionNote: "Tehran demands full relief from maritime blockades and economic sanctions before committing to permanent Hormuz freedom of navigation.; U.S. naval blockade for…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 214",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
