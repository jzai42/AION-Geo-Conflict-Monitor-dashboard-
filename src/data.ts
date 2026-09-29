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
  date: "2026-09-29",
  version: "v2.206",
  keyStats: [
    {
      label: "冲突天数",
      value: "D213",
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
      value: "WTI $90.13–$94.74 · Brent $95.86–$100.29",
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
  riskScore: 60,
  keyChange: "美伊否认重大妥协让步传闻，间接斡旋维持脆弱拉锯，中东海运绕行推高物流溢价，油价在90-100美元宽幅盘整。",
  investmentSignal: "→ 维持大宗商品与能源多头仓位作为地缘对冲，风险资产采取防御性低配配置。",
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊两军避免发生无预警直接交火，威慑与护航维持在固定接触面。",
      "霍尔木兹海峡主航道通行审查与配额限制延续，油轮主要依靠过驳与管道绕行缓解。",
      "卡塔尔斡旋下的间接接触依然存在，但双方在制裁解除与核监管问题上分歧未见缩小。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "双方近24小时未爆发新的大规模直接空袭，军事活动以防空拦截与警戒巡逻为主。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "主航道通行能力维持在战前水平的50%–90%，主要依靠绕行和转运缓解供给压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI震荡于$90–$95区间，布伦特测试$100关口，现货溢价显著反映地缘物流阻滞成本。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战备警戒并继续向盟友提供防空情报支持，外部大国均力避卷入直接热战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "间接谈判渠道维持开放，但双方公开声明仍高度对立，停火框架达成尚待时日。",
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
        "延续：红海及波斯湾周边保持高戒备反导巡航，美军与伊朗常规力量未发生直接交火。",
        "延续：也门胡塞武装零星无人机活动受到联军雷达追踪与拦截，未酿成重大设施损毁。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Kpler追踪显示部分原油转向沙特东西管线及外海船对船转运，局部缓解出口堵塞。",
        "延续：霍尔木兹狭窄主航道仍处高风险禁区，商业油轮保险费率与安保护航成本居高不下。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：国际油价维持偏强震荡，WTI与Brent盘中宽幅拉锯，炼厂裂解价差居于高位。",
        "变化：美国政府释放考虑允许使用红色染色柴油等监管放宽信号以平抑国内燃油价格。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方高层公开驳斥向伊朗提供全面经济制裁解除的传言，强调谈判底线未变。",
        "延续：伊朗外交部门表态维持防务自卫能力的同时不关闭多边外交接触渠道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊朗彻底放弃对海峡航运施加军事控制，而德黑兰将海峡通行权视作迫使解除制裁的关键杠杆。"
    ],
    military: [
      "美军区域防空力量的常态化部署与伊朗非对称反舰无人艇/导弹力量形成高灵敏度动态僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "09-24",
      score: 62
    },
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
      score: 60,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "白宫澄清对伊制裁豁免传闻，外交缓和预期降温",
      description: "路透社与彭博社报道，美国官方驳斥了关于准备解除经济制裁以换取霍尔木兹海峡全面通航的报道，重申必须取得具体不可逆的安全保证。",
      verification: "confirmed",
      timestamp: "2026-09-29T10:22:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Kpler报告9月中东原油海运出口逆势回升",
      description: "追踪机构Kpler数据显示，沙特与阿联酋通过红海管线及船对船转运使出口量升至1280万桶/日，但霍尔木兹航道通行风险未见实质解除。",
      verification: "confirmed",
      timestamp: "2026-09-29T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价维持高位盘整，WTI与Brent呈现宽幅震荡",
      description: "纽约商业交易所数据显示，WTI日内处于$90.13–$94.74，布伦特处于$95.86–$100.29，市场在战事溢价与宏观通胀干预预期之间反复权衡。",
      verification: "confirmed",
      timestamp: "2026-09-29T15:14:47Z",
      significance: ""
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-29",
  version: "v2.206",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D213",
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
      value: "WTI $90.13–$94.74 · Brent $95.86–$100.29",
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
  riskScore: 60,
  keyChange: "US refutes sanctions relief concessions while indirect talks persist; Middle East crude export rerouting offsets part of maritime bottlenecks as oil consolidates in the $90-$100 range.",
  investmentSignal: "→ Maintain long commodity and energy hedges while adopting a defensive underweight posture across broader risk assets.",
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Both US and Iranian forces avoid direct unannounced military escalation, maintaining defensive containment.",
      "Passage via Hormuz remains restricted with tight vetting, relying on bypass pipelines and ship-to-ship transfers.",
      "Qatari-mediated backchannel talks continue without consensus on sanctions relief or nuclear oversight."
    ],
    note: "For monitoring only; not investment advice."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "No major strategic direct strikes occurred over the past 24 hours; military engagement remains limited to defensive patrols and interception.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Shipping transit remains between 50% and 90% of pre-war capacity, sustained by rerouting and transfer workarounds.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI fluctuates between $90 and $95 while Brent tests $100, reflecting persistent physical waterborne risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US naval forces maintain defensive escort readiness and coalition intelligence sharing without expanding offensive combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Indirect communication channels remain functional, but contradictory public stances impede near-term breakthrough.",
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
        "Continue: High-readiness naval and air defense patrols remain active across regional choke points without direct bilateral strikes.",
        "Continue: Sporadic Houthi drone and missile sorties are tracked and intercepted by coalition air defenses."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Kpler tracking indicates Gulf exporters are expanding reliance on the East-West pipeline and offshore ship-to-ship transfers.",
        "Continue: The primary Hormuz passage stays designated as high-risk, keeping vessel insurance premiums elevated."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Crude benchmarks oscillate in a strong consolidation zone, sustained by robust crack spreads and tanker war premiums.",
        "Change: US authorities consider regulatory relief on red-dyed diesel to mitigate domestic price pressures as an alternative to export curbs."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US leadership explicitly rejects rumors of unconditional sanctions relief, maintaining maximalist preconditions for peace.",
        "Continue: Iranian officials assert ready defensive readiness while keeping diplomatic mediation channels intact."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US insists on unconditional maritime freedom through Hormuz, while Tehran maintains maritime chokepoint leverage to force comprehensive sanctions relief."
    ],
    military: [
      "Coalition air defense and escort capabilities stand in persistent tension against Iranian asymmetric coastal and drone assets."
    ]
  },
  scoreTrend: [
    {
      date: "09-24",
      score: 62
    },
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
      score: 60,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "White House Denies Sanctions Relief Reports, Cooling Truce Hopes",
      description: "Reuters and Bloomberg report that US officials rejected claims that Washington offered sanctions relief in exchange for reopening Hormuz, reaffirming strict security conditions.",
      verification: "confirmed",
      timestamp: "2026-09-29T10:22:00Z",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Kpler Reports Middle East Crude Exports Rose to 12.8M bpd in September",
      description: "Analytics firm Kpler reported higher shipments from Saudi Arabia and the UAE using bypass infrastructure, though Hormuz transit constraints continue.",
      verification: "confirmed",
      timestamp: "2026-09-29T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Crude Benchmarks Consolidate as Market Balances War Premium and Demand Risks",
      description: "Exchange data shows WTI traded between $90.13 and $94.74 while Brent spanned $95.86 to $100.29 amid Middle East shipping uncertainties and US diesel supply discussions.",
      verification: "confirmed",
      timestamp: "2026-09-29T15:14:47Z",
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
    node406: "9月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.206 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：美伊否认重大妥协让步传闻，间接斡旋维持脆弱拉锯，中东海运绕行推高物流溢价，油价在90-100美元宽幅盘整。",
    bannerWarning: "→ 维持大宗商品与能源多头仓位作为地缘对冲，风险资产采取防御性低配配置。",
    deescalationIntent: "美方要求伊朗彻底放弃对海峡航运施加军事控制，而德黑兰将海峡通行权视作迫使解除制裁的关键杠杆。",
    structuralRisk: "主航道通行能力维持在战前水平的50%–90%，主要依靠绕行和转运缓解供给压力。",
    contradictionNote: "美方要求伊朗彻底放弃对海峡航运施加军事控制，而德黑兰将海峡通行权视作迫使解除制裁的关键杠杆。；美军区域防空力量的常态化部署与伊朗非对称反舰无人艇/导弹力量形成高灵敏度动态僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第213天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.206 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): US refutes sanctions relief concessions while indirect talks persist; Middle East crude export rerouting offsets part of maritime bottlenec…",
    bannerWarning: "→ Maintain long commodity and energy hedges while adopting a defensive underweight posture across broader risk assets.",
    deescalationIntent: "The US insists on unconditional maritime freedom through Hormuz, while Tehran m…",
    structuralRisk: "Shipping transit remains between 50% and 90% of pre-war capacity, sustained by rerouting and transf…",
    contradictionNote: "The US insists on unconditional maritime freedom through Hormuz, while Tehran maintains maritime chokepoint leverage to force comprehensive sanctions relief.; …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 213",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
