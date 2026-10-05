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
  date: "2026-10-05",
  version: "v2.212",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "→ 维持能源与大宗商品对冲头寸，逢反弹降低贝塔风险资产配置以抵御高通胀韧性冲击。",
  keyChange: "美伊博弈转入高位僵持阶段，油价与航运约束形成高黏滞风险底部。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D219",
      unit: "2月28日起",
      color: "amber"
    },
    {
      label: "评分变化",
      value: "持平",
      unit: "较上期",
      color: "blue"
    },
    {
      label: "油价",
      value: "WTI $89.11–$91.88 · Brent $100.64–$103.55",
      unit: "参考",
      color: "red",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "orange"
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "航道消耗与能源溢价对峙期",
    subTitle: "海峡阻滞常态化与大国间接博弈交织",
    points: [
      "原油基准价格守稳百元大关，重叠霍尔木兹海峡50%–70%的降容运行现实。",
      "双方军事接触保持受控威慑，大国深度介入但避免滑向全面正面战端。",
      "外交谈判通道维持技术性交流，缺乏化解核心对抗的政治善意。"
    ],
    note: "短期缺乏大幅下行驱动，地缘政治溢价继续固化在能源和海运资产中。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "直接交火与多战线活跃处于受控对峙高点，前线戒备高度紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "许可制与抽检导致流量下降至常态的50%–70%，班轮大面积改道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "布伦特原油区间触及100美元危机边缘，WTI盘整于90美元，供应担忧突出。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国提供实质性军事部署护航、情报共享及区域威慑，未演变为大国间直接交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "间接谈判渠道仍然开放，多方释放接触意愿，但尚未形成具备执行力的停火协议。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20261005-01",
      title: "布伦特原油站稳100美元关口高位震荡",
      description: "受波斯湾海运阻滞预期影响，布伦特原油维持在100.64–103.55美元/桶区间盘整，WTI报收90.01美元/桶（Reuters、Bloomberg）。",
      verification: "confirmed",
      timestamp: "2026-10-05 17:30",
      significance: "能源溢价强化全球通胀防御交易。",
      highlight: true
    },
    {
      id: "EVT-20261005-02",
      title: "霍尔木兹海峡通行量维持常态六成水平",
      description: "伊朗革命卫队巡逻艇维持对高风险船只的拦截核验，过境运力折损约40%，保险费率未见回落（AP、Lloyd's List）。",
      verification: "confirmed",
      timestamp: "2026-10-05 14:15",
      significance: "供应链与物流链重构压力持续。"
    },
    {
      id: "EVT-20261005-03",
      title: "美军中央司令部维持阿曼湾联合护航戒备",
      description: "CENTCOM发布任务动态，重申驻扎中东的特遣舰队将持续为关键盟友商船提供防空及航道引导（DoD、CENTCOM）。",
      verification: "confirmed",
      timestamp: "2026-10-05 11:00",
      significance: "维持区域大国介入震慑底线。"
    },
    {
      id: "EVT-20261005-04",
      title: "多边停火间接磋商陷入细则僵局",
      description: "阿曼与卡塔尔斡旋代表向媒体证实，各方在制裁解除次序与核查权限上存在根本性分歧，未定下阶段会晤时间表（AFP、Al Jazeera）。",
      verification: "confirmed",
      timestamp: "2026-10-05 08:45",
      significance: "降级窗口收窄，博弈延长。"
    }
  ],
  scoreTrend: [
    {
      date: "10-01",
      score: 60
    },
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "受控交火",
      tagColor: "amber",
      points: [
        "延续：战线维持常规侦察与防空对峙，未有新增大规模战役级行动。",
        "延续：防区互信极其脆弱，前线保持实弹警戒态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "通行受限",
      tagColor: "red",
      points: [
        "延续：海峡实行差别化抽检管制，主要油运通行量维持在50%–70%。",
        "变化：各大保险机构延展高危战险加价条款至下月中旬。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "百元高位",
      tagColor: "red",
      points: [
        "延续：布伦特原油在100–103美元区间窄幅整理，供应焦虑固化。",
        "延续：裂解价差与高航运运费叠加，加剧下游现货采购成本。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "立场强硬",
      tagColor: "blue",
      points: [
        "延续：美伊官方未现缓和意向，继续依赖第三方管道传话。",
        "变化：多边调停方承认技术性接触短期难以转化为正式备忘录。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊核心主权与制裁诉求存在不可调和的结构性分歧。",
      "区域多边斡旋缺乏对双方行为体的实质性约束工具。"
    ],
    military: [
      "霍尔木兹海峡常态化封控与美军护航防空部署的持续摩擦风险。",
      "前沿无人平台高频接触极易引发误判诱发局势骤升。"
    ]
  },
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-05",
  version: "v2.212",
  riskScore: 64,
  prevRiskScore: 64,
  investmentSignal: "→ Maintain energy and commodity hedge positions while reducing high-beta risk asset exposures on technical rebounds.",
  keyChange: "US-Iran standoff enters high-level friction lock; oil and chokepoint constraints establish rigid floor.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D219",
      unit: "Since Feb 28",
      color: "amber"
    },
    {
      label: "Score Change",
      value: "Flat",
      unit: "vs Prev",
      color: "blue"
    },
    {
      label: "Oil",
      value: "WTI $89.11–$91.88 · Brent $100.64–$103.55",
      unit: "Ref.",
      color: "red",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Transit Status",
      color: "orange"
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "Chokepoint Attrition and Energy Risk Standoff",
    subTitle: "Normalized Strait Bottlenecks Meet Indirect Great Power Deterrence",
    points: [
      "Brent benchmarks firmly sustain above the $100 mark amid 50%–70% reduced throughput in Hormuz.",
      "Military confrontations remain disciplined in deterrence postures while avoiding an all-out shooting war.",
      "Diplomatic channels conduct only technical exchanges, lacking top-level political goodwill."
    ],
    note: "Downside geopolitical catalysts remain limited in the immediate horizon."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct engagements and multi-theater activity remain at high alert with active perimeter defenses.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Inspection regimes restrict transit volumes to 50%–70% of pre-crisis baseline, forcing diversions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Brent trades inside the $100–120 crisis corridor edge with WTI consolidating near $90 on persistent supply worries.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain escort deployments and intelligence feeds without entering direct confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Indirect communication lines persist via regional mediators, yet deep gaps stall formal terms.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20261005-01",
      title: "Brent Benchmark Clings to $100 Corridor Amid Persistent Supply Risk",
      description: "Brent crude futures trade in a $100.64–$103.55/bbl range as geopolitical risk premium remains baked into forward curves (Reuters, Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-10-05 17:30",
      significance: "Solidifies stagflationary hedges across multi-asset portfolios.",
      highlight: true
    },
    {
      id: "EVT-20261005-02",
      title: "Strait of Hormuz Flow Subdued at Estimated 60% Capacity",
      description: "IRGC inspection details continue to intercept selected commercial flags, keeping maritime war-risk premiums elevated (AP, Lloyd's List).",
      verification: "confirmed",
      timestamp: "2026-10-05 14:15",
      significance: "Underpins prolonged freight and logistics bottleneck costs."
    },
    {
      id: "EVT-20261005-03",
      title: "US CENTCOM Affirms Sustained Gulf Air-Maritime Patrol Footprint",
      description: "Central Command maintains fifth fleet operational tempo to deter asymmetric harassment against allied commercial traffic (DoD, CENTCOM).",
      verification: "confirmed",
      timestamp: "2026-10-05 11:00",
      significance: "Maintains credible deterrence floor across regional littoral zones."
    },
    {
      id: "EVT-20261005-04",
      title: "Backchannel Ceasefire Discussions Stall Over Compliance Timelines",
      description: "Qatari and Omani facilitators indicate that Washington and Tehran remain deadlocked over sanctions sequencing and enrichment caps (AFP, Al Jazeera).",
      verification: "confirmed",
      timestamp: "2026-10-05 08:45",
      significance: "Diminishes probability of a near-term diplomatic breakthrough."
    }
  ],
  scoreTrend: [
    {
      date: "10-01",
      score: 60
    },
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
      score: 64,
      active: true
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Controlled Fire",
      tagColor: "amber",
      points: [
        "Continue: Air defense and drone reconnaissance standoffs persist without major kinetic flare-ups.",
        "Continue: Tactical alert postures remain fully mobilized across the central theater."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Severely Restricted",
      tagColor: "red",
      points: [
        "Continue: Selective boarding inspections suppress maritime throughput to 50%–70% of baseline.",
        "Change: Underwriters extend heightened maritime war risk surcharge tiers through mid-November."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "$100 Ceiling",
      tagColor: "red",
      points: [
        "Continue: Brent trades firmly across the $100–103 zone while WTI holds steady around $90.",
        "Continue: High crack spreads and tanker rerouting costs keep downstream margins constricted."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Hardened Stance",
      tagColor: "blue",
      points: [
        "Continue: Direct communication lines remain completely absent between Washington and Tehran.",
        "Change: Regional intermediaries confirm technical dialogue has encountered structural impasses."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatible core demands over economic sanction relief and nuclear verification parameters.",
      "Lack of actionable enforcement leverage held by regional mediators over primary combatants."
    ],
    military: [
      "Ongoing friction risk between Iranian inspection procedures and US naval escort doctrines in Hormuz.",
      "Uncrewed autonomous systems operating in contested zones preserve high miscalculation risks."
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
    node406: "10月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.212 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：美伊博弈转入高位僵持阶段，油价与航运约束形成高黏滞风险底部。",
    bannerWarning: "→ 维持能源与大宗商品对冲头寸，逢反弹降低贝塔风险资产配置以抵御高通胀韧性冲击。",
    deescalationIntent: "美伊核心主权与制裁诉求存在不可调和的结构性分歧。",
    structuralRisk: "许可制与抽检导致流量下降至常态的50%–70%，班轮大面积改道。",
    contradictionNote: "美伊核心主权与制裁诉求存在不可调和的结构性分歧。；霍尔木兹海峡常态化封控与美军护航防空部署的持续摩擦风险。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第219天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.212 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): US-Iran standoff enters high-level friction lock; oil and chokepoint constraints establish rigid floor.",
    bannerWarning: "→ Maintain energy and commodity hedge positions while reducing high-beta risk asset exposures on technical rebounds.",
    deescalationIntent: "Incompatible core demands over economic sanction relief and nuclear verificatio…",
    structuralRisk: "Inspection regimes restrict transit volumes to 50%–70% of pre-crisis baseline, forcing diversions.",
    contradictionNote: "Incompatible core demands over economic sanction relief and nuclear verification parameters.; Ongoing friction risk between Iranian inspection procedures and U…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 219",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
