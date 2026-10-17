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
    layout?: "default" | "unitPrimary";
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
  change?: "up" | "down";
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
  date: "2026-10-17",
  version: "v2.224",
  keyStats: [
    {
      label: "冲突天数",
      value: "D231",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑16",
      unit: "较10月16日",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $101.41 · Brent $109.86",
      unit: "10月16日收盘",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "较战前−70%",
      unit: "周内12次袭船",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "美伊直接军事冲突",
      score: 3,
      prev: 3,
      weight: 1 / 7,
      description: "持续对抗，但过去24小时未确认新增大规模直接打击；美方仍保留打击地下核设施选项。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运安全",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "UKMTO周报记录12次船舶遇袭，其中10次发生在海峡；通行量仍较战前低约70%。",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "地区冲突扩散",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "胡塞武装、沙特支持力量与也门战场持续升级，沙特石油运输节点面临导弹威胁。",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "石油及能源供应",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "Brent收于109.86美元、WTI收于101.41美元，航运与供应风险溢价继续上升。",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "美国海上封锁及军事态势",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "针对伊朗港口的海上封锁持续，经济施压与军事威慑并行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "领导人言论与核设施威胁",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "特朗普称可能打击Pickaxe Mountain，但排除核武器和地面部队，尚未确认行动授权。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "外交谈判失败风险",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "调停渠道仍在运作，但双方对提案回复状态表述不一，尚无可验证突破。",
      status: "SLOW",
      sourceVerification: "partial"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "evt-1",
      title: "霍尔木兹海峡一周报告12次袭船",
      description: "UKMTO最新周报记录12次船舶遇袭，其中10次在霍尔木兹海峡；125次出港与129次入港通行，合计仍较战前低约70%。（Tier1: UKMTO；Tier2: AP, Anadolu）",
      verification: "confirmed",
      timestamp: "2026-10-17",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-2",
      title: "波斯湾商船遇袭风险继续上升",
      description: "UKMTO通报多起商船遭不明投射物袭击，部分船舶失去动力或结局尚未确认；多数事件的袭击者仍未确认。（Tier1: UKMTO；Tier2: AP）",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-3",
      title: "特朗普保留打击Pickaxe Mountain选项",
      description: "特朗普称美国可能打击伊朗地下核设施Pickaxe Mountain，同时排除核武器和地面部队；未确认已授权执行。（Tier2: Reuters, Al-Monitor）",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-4",
      title: "Brent逼近110美元",
      description: "Brent收于109.86美元，WTI收于101.41美元；霍尔木兹袭船、地区基础设施风险与供应担忧推动能源重新定价。（Tier2: Reuters）",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-5",
      title: "也门与沙特方向冲突外溢",
      description: "胡塞武装与沙特支持力量持续交战，亚丁与沙特石油运输相关目标面临导弹威胁，地区代理冲突继续扩大。（Tier2: AP, Reuters）",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-6",
      title: "调停继续但提案状态存在分歧",
      description: "卡塔尔等调停渠道仍在运作；美方媒体称等待伊朗答复，伊方则称美方回复不充分，尚无双方共同确认的突破。（Tier2: Reuters, Axios）",
      verification: "partial",
      timestamp: "2026-10-17",
      significance: ""
    }
  ],
  warPhase: {
    level: "持续对抗",
    targetLevel: "海运与区域冲突升级",
    title: "美伊地缘风险监测",
    subTitle: "过去24小时公开来源交叉核验",
    points: [
      "过去24小时未确认新一轮美伊直接大规模空袭，但美国封锁持续，地下核设施打击威胁上升。",
      "霍尔木兹一周报告12次袭船，通行量仍较战前低约70%，海上消耗战风险进一步加剧。",
      "也门与沙特方向冲突扩大，Brent逼近110美元，外交调停尚未形成可验证突破。"
    ],
    note: "Strong risk-off为地缘冲突模块信号，不构成全市场最终评级或投资建议。"
  },
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：过去24小时未确认新增美伊直接大规模空袭，美国针对伊朗港口的海上封锁仍在持续。",
        "变化：特朗普公开保留打击Pickaxe Mountain的选项，但排除核武器和地面部队。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO一周报告12次袭船，其中10次发生在海峡；实际事件数可能更高。",
        "延续：125次出港与129次入港通行，合计仍较战前低约70%，海峡并非完全关闭。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent收于109.86美元、WTI收于101.41美元，航运保险、运输与供应风险溢价继续抬升。",
        "风险：沙特绕开霍尔木兹的重要石油运输节点也受到导弹威胁。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：卡塔尔等间接渠道仍在运作，但美伊双方对谁在等待答复的表述相互冲突。",
        "判断：外交窗口尚未关闭，但缺少双方共同确认的实质进展。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "间接谈判渠道仍然存在，但封锁、制裁与提案回复争议阻止外交缓冲转化为可验证降级。"
    ],
    military: [
      "美国海上封锁与伊朗航运施压相互强化，同时也门—沙特代理冲突扩大直接军事升级的外溢面。"
    ]
  },
  scoreTrend: [
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86,
      active: true
    }
  ],
  keyChange: "霍尔木兹一周报告12次袭船、通行量较战前低约70%，Brent收于109.86美元；海运风险与也门—沙特方向冲突同步升级。",
  investmentSignal: "→ Strong risk-off：地缘风险正通过能源价格、通胀预期、利率与风险资产估值链条传导；在航运安全改善与油价回落获得确认前，不宜仅凭短期反弹认定风险解除。",
  change: "up",
  prevRiskScore: 70,
  webSources: [
    {
      title: "UKMTO Weekly VRA Overview — 16 October 2026",
      uri: "https://www.ukmto.org/-/media/ukmto/products/20261016-ukmto_vra_overview_u.pdf"
    },
    {
      title: "Oil touches $110 on Middle East supply fears — Reuters syndication",
      uri: "https://www.investing.com/news/commodities-news/oil-edges-down-as-investors-weigh-possible-us-sanctions-on-shadow-fleet-4952926"
    },
    {
      title: "Trump says US may need to strike Iran's Pickaxe Mountain — Reuters syndication",
      uri: "https://www.yahoo.com/news/politics/articles/trump-says-us-may-strike-124150744.html"
    },
    {
      title: "Reported shipping attacks jump in Strait of Hormuz — AP",
      uri: "https://apnews.com/article/mideast-israel-palestinians-houthis-october-16-2026-5da500114e070ccaa27d36837b095de5"
    },
    {
      title: "Iran says US response to Hormuz proposal was insufficient — Reuters",
      uri: "https://www.reuters.com/world/middle-east/iran-says-us-response-its-proposal-reopen-hormuz-was-insufficient-2026-10-11/"
    }
  ],
  webSearchQueries: [
    "2026-10-16 UKMTO weekly 12 attacks Hormuz 70% below pre-conflict",
    "2026-10-16 Reuters Brent 109.86 WTI 101.41",
    "2026-10-16 Trump Pickaxe Mountain Reuters",
    "2026-10-17 Iran US counterproposal Qatar mediation"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-10-17",
  version: "v2.224",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D231",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑16",
      unit: "vs Oct 16",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $101.41 · Brent $109.86",
      unit: "Oct 16 close",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "−70% vs pre-war",
      unit: "12 weekly attacks",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Direct US–Iran Military Conflict",
      score: 3,
      prev: 3,
      weight: 1 / 7,
      description: "Confrontation persists, but no new large-scale direct strike was confirmed in the past 24 hours; the US retains an underground nuclear-site strike option.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Shipping Security",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "UKMTO recorded 12 attacks this week, including 10 in the Strait; transit remains roughly 70% below pre-conflict levels.",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "Regional Conflict Spillover",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "Fighting involving the Houthis, Saudi-backed forces and Yemen is escalating, with missile threats reaching Saudi oil-transit infrastructure.",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "Oil and Energy Supply",
      score: 5,
      prev: 5,
      weight: 1 / 7,
      description: "Brent settled at $109.86 and WTI at $101.41 as shipping and supply-risk premia continued to rise.",
      status: "AT CEILING",
      sourceVerification: "confirmed"
    },
    {
      name: "US Naval Blockade and Posture",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "The blockade targeting Iranian ports continues alongside economic pressure and military deterrence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Leadership and Nuclear-Site Threats",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "Trump said the US may strike Pickaxe Mountain, while ruling out nuclear weapons and ground troops; no execution authorization was confirmed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Diplomatic Failure Risk",
      score: 4,
      prev: 4,
      weight: 1 / 7,
      description: "Mediation channels remain active, but the sides give conflicting accounts of the proposal-response status and no verifiable breakthrough has emerged.",
      status: "SLOW",
      sourceVerification: "partial"
    }
  ],
  riskScore: 86,
  events: [
    {
      id: "evt-1",
      title: "UKMTO Records 12 Weekly Vessel Attacks",
      description: "UKMTO recorded 12 vessel attacks, 10 of them in the Strait of Hormuz; 125 outbound and 129 inbound transits remained roughly 70% below pre-conflict levels. (Tier1: UKMTO; Tier2: AP, Anadolu)",
      verification: "confirmed",
      timestamp: "2026-10-17",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-2",
      title: "Gulf Merchant-Vessel Risk Continues to Rise",
      description: "UKMTO reported multiple merchant vessels struck by unknown projectiles, with some disabled or their outcomes unconfirmed; attribution remains unresolved in most cases. (Tier1: UKMTO; Tier2: AP)",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-3",
      title: "Trump Keeps Pickaxe Mountain Strike Option Open",
      description: "Trump said the US may strike Iran's underground Pickaxe Mountain site, while ruling out nuclear weapons and ground troops; no execution authorization was confirmed. (Tier2: Reuters, Al-Monitor)",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-4",
      title: "Brent Approaches $110",
      description: "Brent settled at $109.86 and WTI at $101.41 as Hormuz attacks, regional infrastructure threats and supply concerns repriced energy risk. (Tier2: Reuters)",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-5",
      title: "Yemen–Saudi Spillover Intensifies",
      description: "Fighting between the Houthis and Saudi-backed forces continued, while Aden and Saudi oil-transit-related targets faced missile threats. (Tier2: AP, Reuters)",
      verification: "confirmed",
      timestamp: "2026-10-16",
      significance: ""
    },
    {
      id: "evt-6",
      title: "Mediation Continues Amid Proposal Dispute",
      description: "Qatari and other mediation channels remain active; US reporting says Washington awaits Iran, while Tehran says the US response was insufficient. No jointly confirmed breakthrough exists. (Tier2: Reuters, Axios)",
      verification: "partial",
      timestamp: "2026-10-17",
      significance: ""
    }
  ],
  warPhase: {
    level: "Sustained Confrontation",
    targetLevel: "Maritime and Regional Escalation",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Past 24 hours · cross-verified public sources",
    points: [
      "No new large-scale direct US–Iran airstrike was confirmed, but the blockade persists and threats against an underground nuclear site have intensified.",
      "UKMTO recorded 12 weekly vessel attacks while Hormuz transit remained roughly 70% below pre-conflict levels.",
      "Yemen–Saudi spillover widened, Brent neared $110, and mediation produced no jointly verifiable breakthrough."
    ],
    note: "Strong risk-off is a geo-conflict module signal, not a standalone rating for the entire market or investment advice."
  },
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: No new large-scale direct US–Iran airstrike was confirmed in the past 24 hours; the US blockade of Iranian ports remains in force.",
        "Change: Trump publicly kept a Pickaxe Mountain strike option open while ruling out nuclear weapons and ground troops."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO recorded 12 weekly vessel attacks, including 10 in the Strait; the actual total may be higher.",
        "Continue: 125 outbound and 129 inbound transits remained roughly 70% below pre-conflict levels; the Strait is not fully closed."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent settled at $109.86 and WTI at $101.41 as insurance, freight and supply-risk premia climbed.",
        "Risk: Saudi oil-transit infrastructure designed to bypass Hormuz also faced missile threats."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Qatari and other indirect channels remain active, but Washington and Tehran give conflicting accounts of who owes the next response.",
        "Assessment: The diplomatic window is not closed, but there is no jointly confirmed material progress."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Indirect channels remain open, but blockade, sanctions and proposal-response disputes prevent diplomacy from becoming verifiable de-escalation."
    ],
    military: [
      "The US naval blockade and Iranian shipping pressure reinforce each other while Yemen–Saudi proxy escalation broadens the conflict's spillover."
    ]
  },
  scoreTrend: [
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70
    },
    {
      date: "10-17",
      score: 86,
      active: true
    }
  ],
  keyChange: "UKMTO recorded 12 weekly vessel attacks, Hormuz transit remained roughly 70% below pre-conflict levels, and Brent settled at $109.86 as maritime and Yemen–Saudi risks escalated together.",
  investmentSignal: "→ Strong risk-off: geopolitical risk is transmitting through energy prices, inflation expectations, rates and risk-asset valuations; do not treat a short-term rebound as de-risking until shipping security improves and oil prices retreat.",
  change: "up",
  prevRiskScore: 70,
  webSources: [
    {
      title: "UKMTO Weekly VRA Overview — 16 October 2026",
      uri: "https://www.ukmto.org/-/media/ukmto/products/20261016-ukmto_vra_overview_u.pdf"
    },
    {
      title: "Oil touches $110 on Middle East supply fears — Reuters syndication",
      uri: "https://www.investing.com/news/commodities-news/oil-edges-down-as-investors-weigh-possible-us-sanctions-on-shadow-fleet-4952926"
    },
    {
      title: "Trump says US may need to strike Iran's Pickaxe Mountain — Reuters syndication",
      uri: "https://www.yahoo.com/news/politics/articles/trump-says-us-may-strike-124150744.html"
    },
    {
      title: "Reported shipping attacks jump in Strait of Hormuz — AP",
      uri: "https://apnews.com/article/mideast-israel-palestinians-houthis-october-16-2026-5da500114e070ccaa27d36837b095de5"
    },
    {
      title: "Iran says US response to Hormuz proposal was insufficient — Reuters",
      uri: "https://www.reuters.com/world/middle-east/iran-says-us-response-its-proposal-reopen-hormuz-was-insufficient-2026-10-11/"
    }
  ],
  webSearchQueries: [
    "2026-10-16 UKMTO weekly 12 attacks Hormuz 70% below pre-conflict",
    "2026-10-16 Reuters Brent 109.86 WTI 101.41",
    "2026-10-16 Trump Pickaxe Mountain Reuters",
    "2026-10-17 Iran US counterproposal Qatar mediation"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.224 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 86（较10月16日↑16）：霍尔木兹袭船增加、通行量受限，地区冲突扩大，Brent逼近110美元。",
    bannerWarning: "→ Strong risk-off：航运安全改善与油价回落确认前，不宜将短期反弹视为风险解除。",
    deescalationIntent: "间接谈判渠道仍在运作，但双方对提案回复状态表述不一。",
    structuralRisk: "霍尔木兹一周报告12次袭船，通行量仍较战前低约70%。",
    contradictionNote: "封锁与航运施压相互强化；也门—沙特代理冲突扩大外溢面。",
    energyDeadline: "油价与海峡通行改善确认",
    negotiationValidity: "美伊提案回复状态确认",
    signalConfirmation: "任一确认后再评估降级",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第231天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.224 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 86 (+16 vs Oct 16): Hormuz attacks rose, transit remained constrained, regional spillover widened and Brent neared $110.",
    bannerWarning: "→ Strong risk-off: do not treat a short-term rebound as de-risking before shipping security improves and oil retreats.",
    deescalationIntent: "Indirect channels remain active, but the sides dispute the proposal-response status.",
    structuralRisk: "UKMTO recorded 12 weekly attacks while transit remained about 70% below pre-conflict levels.",
    contradictionNote: "Blockade and shipping pressure reinforce each other as Yemen–Saudi spillover broadens.",
    energyDeadline: "Oil and Hormuz improvement confirmed",
    negotiationValidity: "US–Iran response status confirmed",
    signalConfirmation: "Reassess de-escalation thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 231",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
