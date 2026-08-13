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
  date: "2026-08-13",
  version: "v2.156",
  riskScore: 74,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在海峡执行「钢铁之墙」封锁并动用 Hellfire 导弹打击试图入港的船只，冲突致死率上升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道仅允许极少数船只通行，日通航量从 130 艘跌至约 10 艘，处于有效关闭状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价维持在 $85-100 区间中下部，高地缘溢价与需求预期下调并存。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国海军直接主导封锁行动，部署核动力航母及潜艇，且已持续超过 250 天。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "谈判陷入死角，6 月达成的临时协议（Islamabad Memorandum）宣告完全失效。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D166",
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
      value: "WTI $81.50–$83.50 · Brent $87.30–$89.10",
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
  events: [
    {
      id: "EVT-01",
      title: "特朗普宣称美军实现霍尔木兹 100% 控制",
      description: "美总统称海军封锁「无懈可击」，伊方予以否认并维持封锁态势。来自 CBS 与 Reuters。",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "埃及货轮在红海水域遭袭致 4 死",
      description: "商业货轮「Tihamah」号遇袭，标志着冲突外溢至周边海域的风险加剧。来自 Fox News。",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "伊朗军队改组转向「进攻性学说」",
      description: "最高领袖莫杰塔巴·哈梅内伊任命新指挥链，准备迎接长期对抗。来自 AP 与 Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军执行「钢铁之墙」拦截行动，累计重定向 59 艘船只。",
      "伊朗维持封锁宣告，每日通航量跌破 10% 基准线。",
      "双方拒绝就解除封锁进行实质性让步。"
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
        "变化：美军发射导弹打击试图闯关的巴拿马籍货轮 Villanova 号。",
        "延续：USS Abraham Lincoln 持续执行超长周期部署，舰员士气面临压力。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：日均通航量下降至 10 艘，为开战以来最低点之一。",
        "延续：保费飙升导致主要班轮公司继续绕道好望角。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 油价单日下跌 1.44%，因市场博弈美军对供应渠道的掌控力。",
        "延续：伊朗原油出口量受封锁影响仍低于战前 25% 水平。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普威胁称若伊方不屈服将面临「毁灭性打击」。",
        "变化：伊朗外交部宣布正式暂停与美方的二轨对话。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗开放海峡作为谈判前提，而伊朗要求先解除全面制裁。"
    ],
    military: [
      "美军封锁物理存在与伊朗地缘近程打击能力之间的不对称僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74
    },
    {
      date: "08-13",
      score: 74,
      active: true
    }
  ],
  keyChange: "谈判渠道全面关闭与海上封锁致命性增加。",
  investmentSignal: "→ 增持能源类防御资产，对冲霍尔木兹海峡长期封锁带来的大宗商品价格波动。",
  change: "up",
  prevRiskScore: 74,
  webSources: [
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5s1A75tX425U0qHF0mELCHGgsQADNlubQrWYpsQPrbfJM2IHHMvyrUzuJn1IwQMk1_qqYJKbBPCbUucaY0_Uwfi0FD3nJBh7LPXRfWQF_YSBp1XG8nK_-F1K5WJSWVw=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBc-yLPG4EvKA0KMAHIeKp4Lh6LGGppwXgMJEtUhi-ir1RR0XuVsRY3vhl3qq63SgpKptsQXoVboQRhtFw6f0VSlXFlxFwr_dRXlPOYtq26zgUzTpyaGLGbwMIRt3qF5U6ETdKTEDXsdYTSAFeWq6j_6I1QKKPoF22yHK5YcbQgKHgcBOmyjNfsqvHzcft6uFU3hCAGJSmw4FGqrA2EWHD"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRTHG-otnTKszIFnyy8jQeeBnhPF8i5HnMYJLc2zARd08rOHokGdc7NTgNV0fCGeKhaMp7rZZaTKNtRFL304tcTLrWg36dO2XPsvSJRqUiosbljotIwKWQmVTJhqohaLvKHVzeg5V0JzwADSz7UiuPOvtyAuo-6YwhZTUCQNdYpjY_0VDOGoamh31z1eCH6i1alBriA55ZySUQNOU="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEx6LAwVaGGfMwU-qXcMJegcsm8MLoPz8zAK_v_X8zoFQSAziL-2PlQXgo7ReQhU5olu02s0HB13CQkRsJ7E_fwFe0SlmUZitGShIaUTwnO3H3UljwCj_41NwIWDTd-sukPIwRU1-BIj2w4fW5tKOsScUswJoE="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZk-TUQZeCoveV-GiSFGPIEdsPK3qg6XP723oOr7gK4FdC3hkY_pIFx8CrXwHFYI6BqEOwruzIHT3rztFqf-1PxuIpQy1bmGxmxQ9X84Rne-DKTC9_6-qq8JYJKLKfJp807WA="
    },
    {
      title: "armenpress.am",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgZvAM_L_ATFkXygOmEjur84gB8PSQebVooJpHreGTsD9lY9L0qOJIq01Znr1JR2rGe6EIctu2lQ2Bw2StLxfwaSnAiR_L6wNpMjjuJ8wgROL2rScUZCsjxFoN1SFS"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQENQNXgyoZUqCP17tcURM3kJZIAWIrlAfiUkCjf7frQ32nZxelZpZ2e7J0O3ogCPL0D2n-VCVnONV6NVbFs-qtc6a4ce0uC_14owz3hTrZ1WKjxy3cpGSqWL4fB8H4_VzsSttNmFi1b"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 13 2024 24h trend",
    "US Iran military escalation August 13 2024 news",
    "Hormuz Strait shipping status August 13 2024",
    "US Middle East submarine aircraft carrier deployment August 13 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-13",
  version: "v2.156",
  riskScore: 74,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US Navy enforces 'Steel Wall' blockade with missile strikes; Egyptian vessel fatalities reported.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait is effectively closed with daily transit drop of >90% compared to pre-war averages.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices stable in $85-100 band; geopolitical premium persists despite demand concerns.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US military enforcement of blockade and record carrier deployment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "June interim deal (Islamabad Memorandum) declared dead by both sides.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D166",
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
      value: "WTI $81.50–$83.50 · Brent $87.30–$89.10",
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
  events: [
    {
      id: "EVT-01",
      title: "Trump Claims 'Total Control' of Hormuz",
      description: "US President declares blockade 'infallible', despite Iranian rejection. Source: CBS/Reuters.",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Egyptian Cargo Ship Hit in Red Sea, 4 Killed",
      description: "Attack on 'Tihamah' highlights rising lethality in maritime corridors. Source: Fox News.",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Iran Shifts to 'Offensive Doctrine'",
      description: "Supreme Leader Mojtaba Khamenei appoints new military command chain for prolonged war. Source: AP/Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-08-13",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US forces enforce 'Steel Wall' blockade with 59 ship redirections to date.",
      "Strait transit volumes fall below 10% threshold as Iran maintains closure claim.",
      "Zero progress reported on reviving ceasefire negotiations."
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
        "Change: US Navy fires missiles at Panama-flagged Villanova for blockade breach.",
        "Continue: USS Abraham Lincoln crew morale deteriorating under record deployment."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Daily transit volume hits new low of 10 vessels.",
        "Continue: Insurance costs remain prohibitive for major global shipping lines."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent futures fall 1.44% as market tests US control claims.",
        "Continue: Iranian oil output remains 25% below pre-war levels due to blockade."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump warns of 'massive escalation' if Iran doesn't pay damages.",
        "Change: Iranian Foreign Ministry suspends Track II diplomatic channels."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Deadlock between US demand for free navigation and Iran's demand for sanction relief."
    ],
    military: [
      "Asymmetric standoff between US naval superiority and Iranian geography-based denial."
    ]
  },
  scoreTrend: [
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70
    },
    {
      date: "08-11",
      score: 74
    },
    {
      date: "08-12",
      score: 74
    },
    {
      date: "08-13",
      score: 74,
      active: true
    }
  ],
  keyChange: "Collapse of diplomatic channels and increased maritime lethality.",
  investmentSignal: "→ Increase exposure to defensive energy assets to hedge against prolonged Hormuz blockade and commodity volatility.",
  change: "up",
  prevRiskScore: 74,
  webSources: [
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5s1A75tX425U0qHF0mELCHGgsQADNlubQrWYpsQPrbfJM2IHHMvyrUzuJn1IwQMk1_qqYJKbBPCbUucaY0_Uwfi0FD3nJBh7LPXRfWQF_YSBp1XG8nK_-F1K5WJSWVw=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBc-yLPG4EvKA0KMAHIeKp4Lh6LGGppwXgMJEtUhi-ir1RR0XuVsRY3vhl3qq63SgpKptsQXoVboQRhtFw6f0VSlXFlxFwr_dRXlPOYtq26zgUzTpyaGLGbwMIRt3qF5U6ETdKTEDXsdYTSAFeWq6j_6I1QKKPoF22yHK5YcbQgKHgcBOmyjNfsqvHzcft6uFU3hCAGJSmw4FGqrA2EWHD"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRTHG-otnTKszIFnyy8jQeeBnhPF8i5HnMYJLc2zARd08rOHokGdc7NTgNV0fCGeKhaMp7rZZaTKNtRFL304tcTLrWg36dO2XPsvSJRqUiosbljotIwKWQmVTJhqohaLvKHVzeg5V0JzwADSz7UiuPOvtyAuo-6YwhZTUCQNdYpjY_0VDOGoamh31z1eCH6i1alBriA55ZySUQNOU="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEx6LAwVaGGfMwU-qXcMJegcsm8MLoPz8zAK_v_X8zoFQSAziL-2PlQXgo7ReQhU5olu02s0HB13CQkRsJ7E_fwFe0SlmUZitGShIaUTwnO3H3UljwCj_41NwIWDTd-sukPIwRU1-BIj2w4fW5tKOsScUswJoE="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZk-TUQZeCoveV-GiSFGPIEdsPK3qg6XP723oOr7gK4FdC3hkY_pIFx8CrXwHFYI6BqEOwruzIHT3rztFqf-1PxuIpQy1bmGxmxQ9X84Rne-DKTC9_6-qq8JYJKLKfJp807WA="
    },
    {
      title: "armenpress.am",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgZvAM_L_ATFkXygOmEjur84gB8PSQebVooJpHreGTsD9lY9L0qOJIq01Znr1JR2rGe6EIctu2lQ2Bw2StLxfwaSnAiR_L6wNpMjjuJ8wgROL2rScUZCsjxFoN1SFS"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQENQNXgyoZUqCP17tcURM3kJZIAWIrlAfiUkCjf7frQ32nZxelZpZ2e7J0O3ogCPL0D2n-VCVnONV6NVbFs-qtc6a4ce0uC_14owz3hTrZ1WKjxy3cpGSqWL4fB8H4_VzsSttNmFi1b"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 13 2024 24h trend",
    "US Iran military escalation August 13 2024 news",
    "Hormuz Strait shipping status August 13 2024",
    "US Middle East submarine aircraft carrier deployment August 13 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.156 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（持平）：谈判渠道全面关闭与海上封锁致命性增加。",
    bannerWarning: "→ 增持能源类防御资产，对冲霍尔木兹海峡长期封锁带来的大宗商品价格波动。",
    deescalationIntent: "美国要求伊朗开放海峡作为谈判前提，而伊朗要求先解除全面制裁。",
    structuralRisk: "航道仅允许极少数船只通行，日通航量从 130 艘跌至约 10 艘，处于有效关闭状态。",
    contradictionNote: "美国要求伊朗开放海峡作为谈判前提，而伊朗要求先解除全面制裁。；美军封锁物理存在与伊朗地缘近程打击能力之间的不对称僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第166天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.156 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (Flat): Collapse of diplomatic channels and increased maritime lethality.",
    bannerWarning: "→ Increase exposure to defensive energy assets to hedge against prolonged Hormuz blockade and commodity volatility.",
    deescalationIntent: "Deadlock between US demand for free navigation and Iran's demand for sanction r…",
    structuralRisk: "Strait is effectively closed with daily transit drop of >90% compared to pre-war averages.",
    contradictionNote: "Deadlock between US demand for free navigation and Iran's demand for sanction relief.; Asymmetric standoff between US naval superiority and Iranian geography-b…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 166",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
