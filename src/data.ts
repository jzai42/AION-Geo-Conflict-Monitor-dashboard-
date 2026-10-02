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
  date: "2026-10-02",
  version: "v2.209",
  riskScore: 60,
  keyStats: [
    {
      label: "冲突天数",
      value: "D216",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$102.91",
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
      description: "华尔街日报与彭博社报道美军考虑向中东增派第三支航母打击群与近万名人员，当前战线仍以低烈度拦截和战术防空对峙为主。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "UKMTO与行业海事监控机构通报零星袭击事件，商业船舶依靠美军有限护航通行，通航量约为常态的60%至80%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Yahoo Finance数据显示WTI区间落在$88.06–$93.51、Brent在$98.43–$102.91，跨入百元关口边缘但冲高有所回落，详见 https://finance.yahoo.com/quote/BZ=F/ 与 https://www.bloomberg.com/energy。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国防部官方发布与美媒证实美军维持前沿护航和基地轮换部署，盟国维持外交协调与情报协同，未引发外部大国直接介入交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "CBS News与卡塔尔官方披露伊美之间存在方案草案沟通，但白宫正式拒绝德黑兰7天重开海峡换解封方案，停火协议未能实质落地。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军考虑增兵中东强化前沿威慑，抑制伊朗进一步切断通道的行动空间。",
      "双方外交间接沟通处于互相试探底线阶段，短期缺乏重大让步基础。"
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
        "变化：华尔街日报报道美军正研判向波斯湾增派第三艘航母打击群及近万名士兵，抬高战备上限。",
        "延续：红海及沙特西南部边境防空拦截保持常态运作，未发生跨战线实质升级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡商船维持受控间歇通行，油轮多依赖联合护航编队通行。",
        "变化：UKMTO通报海峡附近商船遭遇零星外部骚扰，保险战争附加费维持高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油在测试102美元上方阻力后回吐部分涨幅，百元关口震荡加剧。",
        "延续：海湾原油出口通过非受限通道部分分流，全球现货供应呈现紧平衡结构。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国白宫明确回绝伊朗提出的附带解除封锁的7天海峡通航方案。",
        "延续：德黑兰表示保持军事戒备同时保留多哈间接外交通道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "白宫要求德黑兰全面放弃核项目及海峡封锁控制权，伊朗坚持以解除制裁与解除封锁为先决条件。"
    ],
    military: [
      "美军多航母前沿存在施加高压，伊朗依托反舰巡航导弹与不对称无人机体系维持海峡拒止威慑。"
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60,
      active: true
    }
  ],
  keyChange: "美军增派航母计划与白宫否决伊朗7天和解方案推升对抗预期，但油价高位震荡与间接谈判未断使风险分维持黏滞。",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，对冲地缘溢价黏滞风险，谨慎追高风险资产。",
  change: "none",
  events: [
    {
      id: "EVT-01",
      title: "五角大楼研议增派第三支航母战斗群至波斯湾",
      description: "据华尔街日报与彭博社报道，美国防部正考虑向波斯湾增派包括第三艘航母及近万名士兵的特遣编队，以压制伊朗海空力量并强化威慑筹码。",
      verification: "confirmed",
      timestamp: "2026-10-01T20:14:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美方正式拒绝伊朗海峡重开换解除封锁草案",
      description: "CBS新闻与半岛电视台证实，美国总统特朗普公开表示德黑兰提出的7天重开海峡提案不可接受，并称若无实质妥协可能在中期选举后重启军事打击。",
      verification: "confirmed",
      timestamp: "2026-10-01T23:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡商船报告零星袭击与外部威胁",
      description: "UKMTO与海湾多家媒体报道，数艘过境霍尔木兹海峡的油轮通报遭遇不明飞行物冲击或险情，美军护航军舰紧急提供安全警戒。",
      verification: "confirmed",
      timestamp: "2026-10-02T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油期货价格在突破百元关口后窄幅拉锯",
      description: "布伦特原油在冲上102美元后出现技术性获利回吐，WTI在90美元附近反复争夺，市场消化航母调动利多与欧美释储预期的双向冲击。",
      verification: "confirmed",
      timestamp: "2026-10-02T13:47:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-02",
  version: "v2.209",
  riskScore: 60,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D216",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$102.91",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Wall Street Journal and Bloomberg reported the Pentagon is considering deploying a third carrier strike group and up to 10,000 personnel, while frontline kinetic actions remain focused on defensive standoffs and air defense intercepts.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "UKMTO and industry marine trackers reported scattered projectile harassment incidents, with tanker transit continuing under US escort at roughly 60%–80% of normal baseline.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Yahoo Finance data shows WTI fluctuating within $88.06–$93.51 and Brent within $98.43–$102.91, touching the $100 barrier while SPR release talks temper upside momentum, see https://finance.yahoo.com/quote/BZ=F/ and https://www.bloomberg.com/energy.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Pentagon disclosures and media reports verify ongoing forward carrier group escorts and intelligence sharing, falling short of direct confrontation between global superpowers.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "CBS News and Qatari sources confirmed indirect proposals were exchanged, but the White House rejected Tehran's 7-day reopening terms, leaving negotiations deadlocked.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US is evaluating force posture reinforcement to restrain Iran from escalating choke point controls.",
      "Indirect diplomatic discussions remain deadlocked over prerequisite conditions for lifting blockades."
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
        "Change: The Wall Street Journal reported the Pentagon is weighing deployment of a third carrier strike group and additional troops.",
        "Continue: Red Sea and Saudi border air defense assets maintained defensive intercepts with no broad escalation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait of Hormuz commercial traffic remains restricted and largely dependent on military escort operations.",
        "Change: UKMTO logged reports of projectiles near commercial vessels, maintaining high war-risk insurance premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude consolidated around the $100 threshold after facing intraday resistance above $102.",
        "Continue: Partial export rerouting through bypass pipelines kept physical crude supply in a tight balance."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The White House publicly dismissed Tehran's 7-day strait reopening proposal, citing unacceptable conditions.",
        "Continue: Tehran maintained high alert posture while keeping Doha-facilitated communication channels open."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands full dismantling of choke point threats and nuclear caps, whereas Tehran conditions maritime peace on sanctions and blockade relief."
    ],
    military: [
      "US carrier strike group presence applies continuous containment, while Iran leverages asymmetric anti-ship capabilities to contest Hormuz."
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60,
      active: true
    }
  ],
  keyChange: "US military deployment planning and the rejection of Tehran's 7-day proposal reinforced standoff expectations while rangebound oil prices kept the composite score unchanged.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities to hedge sticky geopolitical premia while limiting exposure to risk assets.",
  change: "none",
  events: [
    {
      id: "EVT-01",
      title: "Pentagon Weighed Deploying Third Aircraft Carrier Strike Group",
      description: "According to the Wall Street Journal and Bloomberg, the US Defense Department is assessing the deployment of a third carrier strike group and up to 10,000 personnel to augment Persian Gulf deterrence.",
      verification: "confirmed",
      timestamp: "2026-10-01T20:14:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Formally Rejected Iran's 7-Day Strait Reopening Draft",
      description: "CBS News and Al Jazeera reported that President Trump publicly rejected Tehran's conditional 7-day Hormuz proposal, warning of renewed strikes after the midterms if negotiations fail.",
      verification: "confirmed",
      timestamp: "2026-10-01T23:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Commercial Vessels Reported Sporadic Incidents in Hormuz",
      description: "UKMTO and regional maritime channels documented sporadic projectile harassment against tankers navigating the Strait of Hormuz, prompting allied naval escorts to maintain heightened alert.",
      verification: "confirmed",
      timestamp: "2026-10-02T06:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Oil Futures Oscillated Near $100 Psychological Barrier",
      description: "Brent crude eased slightly after briefly surpassing $102 as markets balanced Middle East military buildup fears against discussions among Western allies regarding strategic petroleum reserves releases.",
      verification: "confirmed",
      timestamp: "2026-10-02T13:47:00Z",
      significance: ""
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
    node406: "10月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.209 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：美军增派航母计划与白宫否决伊朗7天和解方案推升对抗预期，但油价高位震荡与间接谈判未断使风险分维持黏滞。",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，对冲地缘溢价黏滞风险，谨慎追高风险资产。",
    deescalationIntent: "白宫要求德黑兰全面放弃核项目及海峡封锁控制权，伊朗坚持以解除制裁与解除封锁为先决条件。",
    structuralRisk: "UKMTO与行业海事监控机构通报零星袭击事件，商业船舶依靠美军有限护航通行，通航量约为常态的60%至80%。",
    contradictionNote: "白宫要求德黑兰全面放弃核项目及海峡封锁控制权，伊朗坚持以解除制裁与解除封锁为先决条件。；美军多航母前沿存在施加高压，伊朗依托反舰巡航导弹与不对称无人机体系维持海峡拒止威慑。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第216天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.209 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): US military deployment planning and the rejection of Tehran's 7-day proposal reinforced standoff expectations while rangebound oil prices k…",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities to hedge sticky geopolitical premia while limiting exposure …",
    deescalationIntent: "Washington demands full dismantling of choke point threats and nuclear caps, wh…",
    structuralRisk: "UKMTO and industry marine trackers reported scattered projectile harassment incidents, with tanker …",
    contradictionNote: "Washington demands full dismantling of choke point threats and nuclear caps, whereas Tehran conditions maritime peace on sanctions and blockade relief.; US car…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 216",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
