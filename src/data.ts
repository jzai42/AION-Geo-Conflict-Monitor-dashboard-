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
  date: "2026-11-15",
  version: "v2.254",
  keyStats: [
    {
      label: "冲突天数",
      value: "D260",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
  riskScore: 70,
  change: "none",
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军加强巴林、波斯湾防空巡逻与拦截，反击战备维持在遏制级水平",
      "霍尔木兹海峡商业通行维持在战前三分之一水平，水雷威慑使主要承运商回避",
      "停火谈判缺乏基本互信，双方均把解除对方核心威胁作为前置门槛"
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
        "延续：伊朗无人机对巴林基地雷达实施试探性袭扰，美军防空系统拦截未致毁损。",
        "延续：红海及也门方向胡塞武装保持零星对沙特与红海目标的远程骚扰态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：UKMTO证实霍尔木兹海峡通行量持续低于战前65%，商业航运风险严峻。",
        "延续：海峡东侧海域持续排查疑似水雷，商船大多采取严格伴航或绕道管线。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油期货在WTI 87–90美元与Brent 95–97美元区间窄幅企稳震荡。",
        "延续：全球原油商业库存微升对冲地缘风险溢价，油价短期缺乏向上突破推力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方表态继续依赖经济封锁施压而非发动大规模地面战事。",
        "延续：伊朗议会与军方重申若不解除海峡封锁与制裁，绝不接受无条件和谈。"
      ]
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊防空互射与无人机战术试探持续，美军在巴林等地拦截袭击，未爆发全面入侵交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通航量处于严重受限状态，常规商业油轮班次较常态缩减三分之二。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "油价区间落在WTI $87.80–$89.64与Brent $95.07–$97.12，高位企稳但未触及百元危机线。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军主要提供区域反导、海上护航制空与经济制裁协调，多国尚未卷入阵营对抗大交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "停火谈判缺乏高层双边渠道，美伊双方各自设立强硬前提条件致使和平前景渺茫。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗对巴林美军基地发动无人机袭击遭防空拦截",
      description: "伊朗伊斯兰革命卫队宣称出动多架无人机突袭巴林基地雷达，美军中央司令部通报成功拦截，未发生人员伤亡或装备瘫痪。",
      verification: "confirmed",
      timestamp: "2026-11-15T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "UKMTO确认霍尔木兹海峡通行量维持战前35%低位",
      description: "英国海事贸易行动办公室发布报告，霍尔木兹及周边水域威胁级别维持严重，过去一周内仅录得约三成正常通行量。",
      verification: "confirmed",
      timestamp: "2026-11-14T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美国白宫释放维持常态化海空封锁信号",
      description: "美方领导层表示军事打击暂缓并依托严格海上封锁逼迫德黑兰屈服，但排除近期展开实质外交和谈可能。",
      verification: "confirmed",
      timestamp: "2026-11-14T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IEA确认全球原油供应逐步通过陆上管线绕道弥补缺口",
      description: "国际能源署报告显示沙特东-西管线等绕运设施缓解了部分霍尔木兹供给约束，油价在85-100美元区间维持震荡企稳。",
      verification: "confirmed",
      timestamp: "2026-11-15T02:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "华盛顿意图以绝对海空封锁压服德黑兰，拒绝在制裁与核监督上让步",
      "伊朗统治层要求美军首先解除海峡海上拦截并撤销制裁，拒不接受城下之盟"
    ],
    military: [
      "美军防空火力与海上巡逻构建单向防御优势，但难以完全杜绝水雷与低空无人机渗透",
      "伊朗利用不对称水雷阵与区域代理人施加慢性消耗，却无力打破美军外围封锁线"
    ]
  },
  scoreTrend: [
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊博弈锁定于海峡封锁与前沿防空防空交火，油价在87–97美元区间震荡企稳，双方战略意志对峙导致；综合风险分落盘 70（较昨日 +2）；调整前模型分 68（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持对冲配置与防御性仓位，大宗与能源资产保持中性偏多头寸，防范海峡突发摩擦脉冲。",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-15",
  version: "v2.254",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D260",
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
      value: "WTI $87.80–$89.64 · Brent $95.07–$97.12",
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
  riskScore: 70,
  change: "none",
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US air defenses maintain active interception over Gulf bases while keeping operational response calibrated",
      "Hormuz maritime flows remain depressed at 35% of pre-war volume due to mine hazards and IRGC threats",
      "Diplomatic tracks remain frozen with both capitals conditioning negotiations on non-negotiable concessions"
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
        "Continue: Iranian drones targeted radar assets at a Bahrain facility, intercepted by US defenses without structural damage.",
        "Continue: Houthi regional harassment operations against shipping and Gulf infrastructure remain sporadic."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: UKMTO confirms commercial transit through the Strait of Hormuz remains down roughly 65% from pre-war baselines.",
        "Continue: Mine countermeasure operations continue along the eastern Gulf as commercial operators favor bypass pipelines."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude benchmarks fluctuate within WTI $87–90 and Brent $95–97 as supply fears meet rising US inventories.",
        "Continue: Bypass pipeline flows help cushion immediate global shortfall fears, preventing an immediate breakout above $100."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington reaffirms its reliance on maritime blockades and economic sanctions rather than ground intervention.",
        "Continue: Tehran leadership maintains that negotiations remain contingent on an immediate cessation of the naval blockade."
      ]
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active standoff characterized by cross-theater drone strikes and regional air defense interceptions without full invasion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial vessel transit volume remains critically restricted at less than half of normal peacetime averages.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "Pricing is concentrated in WTI $87.80–$89.64 and Brent $95.07–$97.12, reflecting persistent geopolitical risk without runaway panic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military engagement focuses on defensive air umbrellas, ISR dominance, and enforcing quarantine corridors.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Formal talks remain stalled as maximalist demands by both sides impede intermediate diplomatic de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Air Defenses Intercept Drone Attack Targeting Bahrain Base",
      description: "IRGC claimed drone operations targeting radar installations in Bahrain; US CENTCOM confirmed hostile targets were intercepted without facility disruption.",
      verification: "confirmed",
      timestamp: "2026-11-15T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "UKMTO Confirms Hormuz Shipping Remains Depressed by 65%",
      description: "The UK maritime monitoring body recorded shipping activity roughly 65% below baseline levels amidst persistent mine and drone threat assessments.",
      verification: "confirmed",
      timestamp: "2026-11-14T22:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "White House Signals Continued Naval Quarantine Over Immediate Escalation",
      description: "US leadership signaled reliance on continuous maritime interdiction and economic measures rather than widening kinetic strikes.",
      verification: "confirmed",
      timestamp: "2026-11-14T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IEA Report Highlights Regional Bypass Pipelines Mitigating Supply Deficit",
      description: "The International Energy Agency affirmed that overland pipeline bypasses helped mitigate immediate crude shortfalls, stabilizing Brent below $100.",
      verification: "confirmed",
      timestamp: "2026-11-15T02:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "Washington prioritizes economic strangulation and blockade enforcement without offering sanctions relief",
      "Tehran demands full lifting of naval blockades and asset freezes as non-negotiable preconditions for talks"
    ],
    military: [
      "Coalition air defense networks mitigate direct kinetic strikes but struggle to eliminate asymmetric mine hazards",
      "Iranian irregular forces inflict friction on maritime choke points but lack capacity to breach regional blockade rings"
    ]
  },
  scoreTrend: [
    {
      date: "11-11",
      score: 68
    },
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70,
      active: true
    }
  ],
  keyChange: "Geopolitical friction stabilizes around blockade maintenance and localized air defense intercepts, holding composited energy pricing; composite risk score prints at 70 (vs prior day +2); pre-adjustment model score 68 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain hedging structures and defensive exposures, keeping energy and commodities at neutral-to-long weighting amidst latent maritime risks.",
  prevRiskScore: 68,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.254 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↑2）：美伊博弈锁定于海峡封锁与前沿防空防空交火，油价在87–97美元区间震荡企稳，双方战略意志对峙导致；综合风险分落盘 70（较昨日 +2）；调整前模型分 68（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持对冲配置与防御性仓位，大宗与能源资产保持中性偏多头寸，防范海峡突发摩擦脉冲。",
    deescalationIntent: "华盛顿意图以绝对海空封锁压服德黑兰，拒绝在制裁与核监督上让步",
    structuralRisk: "海峡通航量处于严重受限状态，常规商业油轮班次较常态缩减三分之二。",
    contradictionNote: "华盛顿意图以绝对海空封锁压服德黑兰，拒绝在制裁与核监督上让步；美军防空火力与海上巡逻构建单向防御优势，但难以完全杜绝水雷与低空无人机渗透",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第260天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.254 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↑2): Geopolitical friction stabilizes around blockade maintenance and localized air defense intercepts, holding composited energy pricing; compo…",
    bannerWarning: "→ Maintain hedging structures and defensive exposures, keeping energy and commodities at neutral-to-long weighting amid…",
    deescalationIntent: "Washington prioritizes economic strangulation and blockade enforcement without …",
    structuralRisk: "Commercial vessel transit volume remains critically restricted at less than half of normal peacetim…",
    contradictionNote: "Washington prioritizes economic strangulation and blockade enforcement without offering sanctions relief; Coalition air defense networks mitigate direct kineti…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 260",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
