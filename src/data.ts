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
  date: "2026-11-08",
  version: "v2.247",
  riskScore: 74,
  keyStats: [
    {
      label: "冲突天数",
      value: "D253",
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
      value: "WTI $89.08–$92.53 · Brent $96.71–$100.92",
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
      description: "美军中央司令部空袭阿曼湾违规商船 M/V Huda 并空袭南部防空阵地，伊朗军方宣布解除 2000 公里弹道导弹射程限制，战线与威慑未见收缩（来源：CENTCOM, CBS News, ISW）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "UKMTO 证实穆桑代姆半岛附近及海峡内多艘油轮遭打击起火，船员弃船，阿联酋海军参与救援，商业航运通航量维持接近停滞（来源：UKMTO, Reuters, Al Arabiya）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "主力合约 WTI 处于 $89.08–$92.53、Brent 处于 $96.71–$100.92，整体主体落在 $85–100 显著偏强区间，因封锁交火与外交预期平衡而高位震荡（依据：https://energynow.com/2026/11/oil-prices-plunge-13-in-one-week 与 Forbes Advisor 报道）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军正式成立铁门特遣队以协同封锁伊朗陆路与里海运输线，对违规商船实施直接武器打击，军事围堵体系进一步制度化（来源：CENTCOM, Fox News）。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "部分证实：卡塔尔递交包含海峡复航换取制裁松绑的折中协议草案，但双方在核项目与前置条件上分歧依旧尖锐，实质停火未落地（来源：Bloomberg, Times of Israel）。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军战机在阿曼湾击瘫违反封锁货轮 M/V Huda",
      description: "美军中央司令部表示，美军战机在阿曼湾对多次无视警告试图突破封锁的圣基茨籍货轮 M/V Huda 实施精准武器打击致其瘫痪（来源：CENTCOM, CBS News）。",
      verification: "confirmed",
      timestamp: "2026-11-07 16:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美军组建“铁门特遣队”扩大对伊陆路与里海封锁",
      description: "美国国防部宣布成立铁门特遣队，由约20名军民人员统筹，联手切断伊朗经陆地边境与里海获取双用途物资的走私链（来源：CENTCOM, Fox News）。",
      verification: "confirmed",
      timestamp: "2026-11-07 18:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "UKMTO 报告霍尔木兹海峡连续发生油轮遇袭起火",
      description: "英国海事贸易行动办公室通报，霍尔木兹海峡及周边海域两艘油轮中弹起火，船员被迫弃船并被阿联酋方面安全救助（来源：UKMTO, Reuters, Al Arabiya）。",
      verification: "confirmed",
      timestamp: "2026-11-07 20:20 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗革命卫队正式宣布解除弹道导弹射程限制",
      description: "伊朗革命卫队指挥官公开宣布，废除 2000 公里射程上限，以应对美军对海峡防御工事的持续袭击并建立深层威慑（来源：CBS News, ISW）。",
      verification: "confirmed",
      timestamp: "2026-11-07 13:43 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军封锁由波斯湾海域向里海及陆地运输通道制度化延展",
      "霍尔木兹海峡商业通行遭受非对称袭船战术持续压制",
      "第三国外交斡旋方案正在审议但缺乏达成即时停火的互信"
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
        "变化：美军中央司令部在阿曼湾精准打击并瘫痪违规商船 M/V Huda。",
        "变化：美军组建铁门特遣队，对伊封锁网络拓展至陆路及里海补给链。",
        "延续：也门胡塞武装继续向沙特纵深目标发射导弹，红海防空战线持续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO 确认海峡周边再有油轮中弹起火，船员弃船获救。",
        "延续：商业船队继续全面回避霍尔木兹咽喉，保费维持危机期极端定价。",
        "延续：主要航运联盟维持好望角绕航方案，海湾始发运力极度短缺。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI 与 Brent 在 $90–$98 平台企稳，供应短缺与停火传闻互为掣肘。",
        "变化：跨国贸易巨头向美国申请特许令以租用制裁油轮补充运力缺口。",
        "延续：裂解价差与成品油溢价维持高位，下游炼厂原料采购成本坚挺。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫与德黑兰分别权衡卡塔尔斡旋提议，对外口吻兼具强硬与灵活。",
        "变化：伊朗军方公开废除导弹射程限制，向美军前沿基地施加反威慑。",
        "延续：海湾调停方加紧穿梭外交，谋求以海峡解封对冲经济制裁。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底消除伊朗核能力并终止区域袭船，伊朗坚持以全面解除封锁和制裁为前置条件。"
    ],
    military: [
      "美军依赖海军精准阻断与特遣队切断供应链，伊朗则依靠水雷、无人机及袭船战维持海峡实质封锁。"
    ]
  },
  scoreTrend: [
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
      score: 74
    },
    {
      date: "11-08",
      score: 74,
      active: true
    }
  ],
  keyChange: "美军在阿曼湾精确瘫痪违规货船并成立铁门特遣队强化陆海立体封锁，霍尔木兹海峡连续发生油轮遭袭起火，地缘僵局维持高位黏滞。",
  investmentSignal: "→ 维持能源与大宗商品的防御配置，警惕海峡封锁常态化下的运输溢价黏滞，适度对冲地缘尾部风险。",
  change: "none",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-08",
  version: "v2.247",
  riskScore: 74,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D253",
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
      value: "WTI $89.08–$92.53 · Brent $96.71–$100.92",
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
      description: "CENTCOM conducted precision strikes disabling the blockade-violating commercial vessel M/V Huda in the Gulf of Oman, while Iran officially lifted its 2,000 km missile range limit (Sources: CENTCOM, CBS News, ISW).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "UKMTO recorded multiple tanker attacks resulting in fires and crew evacuations off Musandam, with commercial transit continuing to suffer near-total paralysis (Sources: UKMTO, Reuters, Al Arabiya).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI traded within $89.08–$92.53 and Brent within $96.71–$100.92, firmly within the $85–100 elevated concern tier amid balancing forces of diplomacy and tanker attacks (Sources: EnergyNow, Forbes Advisor, Trading Economics).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US CENTCOM formally established Task Force Iron Gate to coordinate interagency disruption of Iranian overland and Caspian supply routes (Sources: CENTCOM, Fox News).",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Partial verification: Qatari mediators submitted a bridge proposal to trade Hormuz reopening for sanctions relief, but core demands remain deeply deadlocked (Sources: Bloomberg, Times of Israel).",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Forces Disable Blockade Runner M/V Huda in Gulf of Oman",
      description: "US Central Command confirmed an American military aircraft fired precision munitions at the stern of the St. Kitts-flagged cargo ship M/V Huda after repeated warnings (Sources: CENTCOM, CBS News).",
      verification: "confirmed",
      timestamp: "2026-11-07 16:00 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "CENTCOM Unveils Task Force Iron Gate to Restrict Land and Caspian Supply",
      description: "The US military established a new Florida-based task force of ~20 interagency personnel targeting Iranian weapons and dual-use supply corridors across northern routes (Sources: CENTCOM, Fox News).",
      verification: "confirmed",
      timestamp: "2026-11-07 18:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "UKMTO Reports Multiple Tankers Ablaze Following Strikes in Hormuz",
      description: "UKMTO confirmed tankers caught fire and crews abandoned ship off the Musandam Peninsula after being hit by projectiles, with 22 crew members rescued by UAE forces (Sources: UKMTO, Reuters, Al Arabiya).",
      verification: "confirmed",
      timestamp: "2026-11-07 20:20 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "IRGC Lifts Self-Imposed 2,000 km Ballistic Missile Range Cap",
      description: "Iranian military leaders declared an end to range restrictions on their ballistic missile inventory, signaling broader deterrence against US regional infrastructure (Sources: CBS News, ISW).",
      verification: "confirmed",
      timestamp: "2026-11-07 13:43 UTC",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US blockade enforcement expands overland and toward the Caspian Sea basin",
      "Hormuz commercial transit remains severely choked by asymmetric attacks",
      "Indirect diplomatic tracks via Qatar persist without immediate breakthrough"
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
        "Change: US CENTCOM aircraft disabled commercial vessel M/V Huda in the Gulf of Oman.",
        "Change: Task Force Iron Gate formed to intercept Iranian military and dual-use supply chains.",
        "Continue: Houthi forces continue ballistic missile launches toward Saudi Arabian infrastructure."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO reported multiple tankers struck by projectiles and abandoned by crews near Musandam.",
        "Continue: Commercial shipping traffic through the strait remains near complete halt.",
        "Continue: Global container and tanker routes maintain Cape of Good Hope diversions."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent consolidate in the $90–$98 corridor amid competing geopolitical pressures.",
        "Change: Major commodity traders seek US Treasury licenses to re-flag sanctioned tankers.",
        "Continue: Product crack spreads and freight rates remain at elevated multi-month premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington and Tehran review Qatari proposals while maintaining coercive rhetoric.",
        "Change: IRGC leadership announced the elimination of its missile range ceiling.",
        "Continue: Regional Gulf mediators sustain shuttle diplomacy to broker a de-escalation framework."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US demands verifiable nuclear curtailment and maritime cessation, while Iran demands complete blockade removal and sanctions termination."
    ],
    military: [
      "US enforcement relies on naval blockade interdiction, while Iran responds with naval mining, drone strikes, and asymmetric chokepoint pressure."
    ]
  },
  scoreTrend: [
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
      score: 74
    },
    {
      date: "11-08",
      score: 74,
      active: true
    }
  ],
  keyChange: "US forces disabled a blockade runner in the Gulf of Oman and unveiled Task Force Iron Gate to target overland corridors, while tanker strikes in Hormuz persist, keeping geopolitical risk sticky.",
  investmentSignal: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical tail risks amid persistent maritime blockade disruptions.",
  change: "none",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.247 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：美军在阿曼湾精确瘫痪违规货船并成立铁门特遣队强化陆海立体封锁，霍尔木兹海峡连续发生油轮遭袭起火，地缘僵局维持高位黏滞。",
    bannerWarning: "→ 维持能源与大宗商品的防御配置，警惕海峡封锁常态化下的运输溢价黏滞，适度对冲地缘尾部风险。",
    deescalationIntent: "美方要求彻底消除伊朗核能力并终止区域袭船，伊朗坚持以全面解除封锁和制裁为前置条件。",
    structuralRisk: "UKMTO 证实穆桑代姆半岛附近及海峡内多艘油轮遭打击起火，船员弃船，阿联酋海军参与救援，商业航运通航量维持接近停滞（来源：UKMTO, Reuters, Al Arabiya）。",
    contradictionNote: "美方要求彻底消除伊朗核能力并终止区域袭船，伊朗坚持以全面解除封锁和制裁为前置条件。；美军依赖海军精准阻断与特遣队切断供应链，伊朗则依靠水雷、无人机及袭船战维持海峡实质封锁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第253天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.247 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): US forces disabled a blockade runner in the Gulf of Oman and unveiled Task Force Iron Gate to target overland corridors, while tanker strik…",
    bannerWarning: "→ Maintain defensive allocations in energy and commodities while hedging geopolitical tail risks amid persistent mariti…",
    deescalationIntent: "The US demands verifiable nuclear curtailment and maritime cessation, while Ira…",
    structuralRisk: "UKMTO recorded multiple tanker attacks resulting in fires and crew evacuations off Musandam, with c…",
    contradictionNote: "The US demands verifiable nuclear curtailment and maritime cessation, while Iran demands complete blockade removal and sanctions termination.; US enforcement r…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 253",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
