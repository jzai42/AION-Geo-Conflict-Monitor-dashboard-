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
  date: "2026-10-01",
  version: "v2.208",
  riskScore: 60,
  keyChange: "沙特Yanbu港恢复原油装运缓和即期供应恐慌，但美伊多哈间接接触仍陷技术僵局，海峡封锁风险高位黏滞。",
  investmentSignal: "→ 维持防御性大宗商品与能源头寸，利用地缘预期差对冲风险资产波动风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D215",
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
      value: "WTI $88.79–$92.90 · Brent $96.56–$101.86",
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
      description: "双方军事行动局限于受控接触与外围反舰威胁，未发生大规模基础设施打击升级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "通行量维持在常态水平的50%–70%，商船依赖护航与绕行避险，封锁未完全解除。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "原油价格处于高位震荡格局，WTI维持在90美元上方，布伦特短时破百后盘整。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持波斯湾外围巡航与护航行动，主要大国保持外交与经济施压层级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "间接谈判渠道保持活跃，卡塔尔调解方持续传递方案，但核心条款分歧依然显著。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "沙特东西管道恢复 Yanbu 装船缓解现货紧缺",
      description: "路透社与ICIS报道，沙特阿美恢复红海 Yanbu 港原油装卸作业，中东避开霍尔木兹海峡的出口能力有所改善，全球即期断供担忧降温。",
      verification: "confirmed",
      timestamp: "2026-10-01T04:42:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "国际基准油价于90至100美元区间盘整震荡",
      description: "彭博社报道，WTI期价于$88.79–$92.90区间博弈，布伦特录得$96.56–$101.86，市场在供给恢复与中东长期地缘溢价之间寻找平衡。",
      verification: "confirmed",
      timestamp: "2026-10-01T10:57:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美伊多哈间接渠道传递路线图反案",
      description: "CBS新闻与中东区域媒体报道，伊朗外交团队离开纽约转道多哈，卡塔尔调解机构向双方转交关于海峡通行与制裁豁免的修正案文。",
      verification: "partial",
      timestamp: "2026-10-01T11:27:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "UKMTO通报霍尔木兹周边商业船舶防御性夜航",
      description: "英国海事贸易行动办公室与美联社报道，海峡周边零星安全警报频发，绝大多数商业油轮依然采取集结护航及静默航行方式通行。",
      verification: "confirmed",
      timestamp: "2026-10-01T10:59:00Z",
      significance: ""
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊两军在霍尔木兹外围维持非接触式高压巡航，未爆发新增重大正面战事。",
        "延续：也门与伊拉克方向区域民兵维持低烈度战术骚扰，防空拦截体系运转平稳。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：沙特红海管道运力恢复分流约300万桶/日原油，海峡内直接商业通航率略微改善。",
        "延续：船东战险附加费率高企，过境船只普遍依赖美军及多国联军特定护航窗口。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI与布伦特月差结构性倒挂收窄，成品油短缺担忧部分替代原油断供叙事。",
        "延续：欧美战略库存投放预期压制油价单边暴涨空间，油价主体落在88-102美元区间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：联大会晤告一段落后，美伊双方重心重回卡塔尔多哈秘密间接磋商渠道。",
        "延续：美方高层公开表态重申完全掌控海峡安全，伊朗坚持挂钩解封与制裁豁免。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方均未展示发动大规模全面军事升级的意图，海空力量集中于制海权博弈与封锁反封锁。",
      "原油出口替代通道逐步走通，降低了封锁对全球能源供应的瞬时致命冲击。",
      "多哈技术谈判保持兜底对话机制，阻止对抗向失控状态滑落。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊朗无条件保证霍尔木兹航行安全，德黑兰要求以解除单边海空封锁与出口制裁为前置条件。"
    ],
    military: [
      "美军区域护航存在力量拉伸极限，与伊朗及其代理人非对称饱和骚扰能力形成长期消耗僵局。"
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "10-01",
      score: 60,
      active: true
    }
  ],
  prevRiskScore: 60,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-01",
  version: "v2.208",
  riskScore: 60,
  keyChange: "Saudi crude loadings resume at Yanbu easing physical shortage fears, but US-Iran indirect talks via Doha remain locked in a technical stalemate, keeping maritime blockade risks steady.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical volatility and Hormuz tail risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D215",
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
      value: "WTI $88.79–$92.90 · Brent $96.56–$101.86",
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
      description: "Military engagement remains strictly bounded within localized interdiction and maritime standoffs without strategic strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Traffic volume sits at 50%–70% of pre-war norms as commercial fleets depend on convoys and bypass pipelines.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Crude prices oscillate near the $90–$100 threshold, with WTI above $88 and Brent briefly piercing $101 before consolidating.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US CENTCOM enforces maritime cordons and naval escorts, while European partners coordinate on strategic fuel reserves.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Indirect communication channels in Doha remain active with revised roadmap proposals circulating between delegations.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Saudi East-West Pipeline Restores Yanbu Loadings",
      description: "Reuters and ICIS report Saudi Aramco resumed tanker operations at Yanbu, elevating non-Hormuz crude export volumes and dampening immediate supply panic.",
      verification: "confirmed",
      timestamp: "2026-10-01T04:42:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Global Crude Benchmarks Fluctuate Across $90-$100 Band",
      description: "Bloomberg reports WTI trading between $88.79 and $92.90 while Brent holds $96.56 to $101.86 as markets balance supply rerouting against persistent geopolitical risks.",
      verification: "confirmed",
      timestamp: "2026-10-01T10:57:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US and Iran Exchange Counter-Proposals via Qatari Mediators",
      description: "CBS News and regional outlets confirm the Iranian delegation departed New York for Doha, where technical counter-proposals regarding the 7-day Hormuz roadmap were transmitted.",
      verification: "partial",
      timestamp: "2026-10-01T11:27:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "UKMTO Confirms Defensive Night Transits in Hormuz",
      description: "UK Maritime Trade Operations and AP report commercial tankers are maintaining darkened transits and naval escort protocols amid lingering peripheral drone threats.",
      verification: "confirmed",
      timestamp: "2026-10-01T10:59:00Z",
      significance: ""
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US and Iranian forces maintain standoff deterrence across Gulf waters without direct inland strike escalation.",
        "Continue: Regional proxy skirmishes remain localized and contained by maritime interception rings."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Red Sea pipeline bypass volumes ease transit constraints, though direct passage in the chokepoint remains guarded.",
        "Continue: Marine hull and war-risk insurance premiums remain elevated across Persian Gulf routes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prompt time-spreads compress slightly as refined product deficits take precedence over headline crude shortages.",
        "Continue: Strategic petroleum reserve discussions anchor prices within the $88-$102 corridor."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Post-UNGA diplomatic engagement shifts back to indirect technical exchanges in Doha.",
        "Continue: Washington maintains strict naval blockade enforcement while Tehran conditions transit opening on sanctions relief."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Neither side seeks a wider regional conflagration, concentrating operations on economic and naval deterrence.",
      "Alternative regional energy delivery mechanisms prevent an outright physical collapse of global supply.",
      "Active Qatari backchannels provide an operational safety valve preventing accidental escalation."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Washington demands unhindered international navigation guarantees, while Tehran conditions maritime easing on lifting the naval blockade and sanctions."
    ],
    military: [
      "US naval escort assets face logistical endurance limits against persistent, low-cost asymmetric drone and missile harassment."
    ]
  },
  scoreTrend: [
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
      score: 60
    },
    {
      date: "10-01",
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
    node406: "10月1日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.208 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（持平）：沙特Yanbu港恢复原油装运缓和即期供应恐慌，但美伊多哈间接接触仍陷技术僵局，海峡封锁风险高位黏滞。",
    bannerWarning: "→ 维持防御性大宗商品与能源头寸，利用地缘预期差对冲风险资产波动风险。",
    deescalationIntent: "美方要求伊朗无条件保证霍尔木兹航行安全，德黑兰要求以解除单边海空封锁与出口制裁为前置条件。",
    structuralRisk: "通行量维持在常态水平的50%–70%，商船依赖护航与绕行避险，封锁未完全解除。",
    contradictionNote: "美方要求伊朗无条件保证霍尔木兹航行安全，德黑兰要求以解除单边海空封锁与出口制裁为前置条件。；美军区域护航存在力量拉伸极限，与伊朗及其代理人非对称饱和骚扰能力形成长期消耗僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第215天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 1 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.208 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (Flat): Saudi crude loadings resume at Yanbu easing physical shortage fears, but US-Iran indirect talks via Doha remain locked in a technical stale…",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical volatility and Hormuz tail risks.",
    deescalationIntent: "Washington demands unhindered international navigation guarantees, while Tehran…",
    structuralRisk: "Traffic volume sits at 50%–70% of pre-war norms as commercial fleets depend on convoys and bypass p…",
    contradictionNote: "Washington demands unhindered international navigation guarantees, while Tehran conditions maritime easing on lifting the naval blockade and sanctions.; US nav…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 215",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
