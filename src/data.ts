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
  date: "2026-05-25",
  version: "v2.75",
  riskScore: 48,
  keyChange: "美伊谈判取得重大进展，风险评分显著下降",
  keyStats: [
    {
      label: "冲突天数",
      value: "D86",
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
      value: "WTI $91–$93 · Brent $95–$99",
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
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "烈度下降。过去24小时内，未有关于美伊之间新的直接军事交火或打击行动的报道。冲突的主要形式已从积极的军事对抗转变为高强度的外交谈判，旨在达成停火和解决方案。然而，美军对伊朗港口的海上封锁作为一项持续的军事行动，使得该评分未降至最低水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "无变化。霍尔木兹海峡的商业航运仍处于基本停滞状态，受美国海上封锁和伊朗军事存在的双重影响。尽管重新开放海峡是当前谈判的核心议题，并带来了积极预期，但实际的通行状况在过去24小时内并未发生改变。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价因谈判取得突破的预期而大幅承压。市场正在定价冲突缓和的可能性，这可能导致霍尔木兹海峡重新开放，从而缓解全球供应紧张。布伦特和WTI价格均大幅下跌，但仍处于相对高位，反映出协议尚未最终达成的风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "无变化。美国作为冲突的主要一方，其介入程度依然很深。其军事力量在执行海上封锁，同时其外交官僚体系正全力投入与伊朗的谈判。这种军事施压与外交接触并行的策略，维持了其深度介入的态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "前景显著改善。美方高级别官员通过媒体释放了协议“基本谈妥”的强烈信号，涵盖了结束战争、开放海峡和核材料处理等核心问题。尽管伊朗方面表态更为谨慎，但双方均确认谈判取得重大进展，显著提升了通过谈判实现局势降级的可能性。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "美伊接近达成结束冲突协议，谈判取得实质性进展",
      description: "多位匿名美国及地区官员向多家媒体透露，美国与伊朗已接近达成一项协议。协议内容包括结束战争、重新开放霍尔木兹海峡、伊朗放弃其高浓缩铀库存。美国总统特朗普称协议已“基本谈妥”，但同时表示“不会仓促行事”。（来源：Associated Press, Reuters, CBS News）",
      verification: "confirmed",
      timestamp: "2026-05-24T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "伊朗官方称协议尚未“迫在眉睫”，指责美方立场变化",
      description: "伊朗外交部发言人表示，尽管在许多问题上与美方达成了谅解，但协议并非“迫在眉睫”。他表示，现阶段谈判重点是结束战争，而非核问题，并指责华盛顿方面改变立场。（来源：The Guardian, CBS News）",
      verification: "confirmed",
      timestamp: "2026-05-25T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "受美伊谈判进展影响，国际油价大幅下跌超4%",
      description: "市场对美伊可能达成和平协议并重开霍尔木兹海峡的预期感到乐观，导致国际油价周一大幅下跌。布伦特原油期货跌破100美元/桶，WTI原油期货也跌至92美元/桶附近，双双触及两周低点。（来源：Reuters, Investing.com）",
      verification: "confirmed",
      timestamp: "2026-05-25T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-04",
      title: "美国防部报告 blockade 成果，军事对峙仍在持续",
      description: "尽管外交谈判成为焦点，但美军的军事行动仍在持续。美国中央司令部（CENTCOM）于5月23日发布声明称，自4月13日开始对伊朗实施海上封锁以来，已成功拦截或转向了100艘商船，显示出军事高压态势并未解除。（来源：U.S. CENTCOM）",
      verification: "confirmed",
      timestamp: "2026-05-23T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方释放出接近达成协议的强烈信号，市场风险偏好随之快速修复。",
      "当前阶段的核心矛盾从军事对抗转向协议细节的敲定。",
      "虽然协议尚未签署，存在变数，但冲突已从高烈度对抗转入以政治解决为主要特征的窗口期。"
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
        "变化：烈度下降。",
        "变化：过去24小时内，未有关于美伊之间新的直接军事交火或打击行动的报道。",
        "变化：冲突的主要形式已从积极的军事对抗转变为高强度的外交谈判，旨在达成停火和解决方案。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：无变化。",
        "变化：霍尔木兹海峡的商业航运仍处于基本停滞状态，受美国海上封锁和伊朗军事存在的双重影响。",
        "变化：尽管重新开放海峡是当前谈判的核心议题，并带来了积极预期，但实际的通行状况在过去24小时内并未发生改变。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因谈判取得突破的预期而大幅承压。",
        "变化：市场正在定价冲突缓和的可能性，这可能导致霍尔木兹海峡重新开放，从而缓解全球供应紧张。",
        "变化：布伦特和WTI价格均大幅下跌，但仍处于相对高位，反映出协议尚未最终达成的风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：无变化。",
        "变化：美国作为冲突的主要一方，其介入程度依然很深。",
        "变化：其军事力量在执行海上封锁，同时其外交官僚体系正全力投入与伊朗的谈判。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方希望快速敲定协议以缓解能源危机并宣告外交胜利，与伊朗方面希望在解除封锁和制裁等核心利益上获得更确切保障之间的矛盾。",
      "协议细节（如核查机制、制裁解除步骤）尚未公布，双方内部的强硬派可能对潜在的让步构成阻力。"
    ],
    military: [
      "美军维持海上封锁以作为谈判筹码的军事压力，与伊朗要求立即解除封锁作为达成协议的前提之间的对峙。",
      "停火状态依然脆弱，任何一方的误判或强硬派的蓄意破坏都可能导致谈判窗口关闭，重燃战火。"
    ]
  },
  scoreTrend: [
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48,
      active: true
    }
  ],
  investmentSignal: "→ 冲突缓和预期驱动油价下行，可考虑减持部分能源对冲，并试探性增持风险资产。",
  prevRiskScore: 52,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity May 2026",
    "Strait of Hormuz shipping disruption May 2026",
    "US CENTCOM press release Iran",
    "Iran nuclear deal talks progress May 2026",
    "WTI Brent crude oil price May 25 2026 Reuters",
    "oil price trend analysis Bloomberg May 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-25",
  version: "v2.75",
  riskScore: 48,
  keyChange: "Significant progress in US-Iran negotiations leads to a notable decrease in the risk score",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D86",
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
      value: "WTI $91–$93 · Brent $95–$99",
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
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Intensity has decreased. In the past 24 hours, there have been no reports of new direct military engagements or strikes between the US and Iran. The primary form of conflict has shifted from active military confrontation to high-stakes diplomatic negotiations aimed at achieving a ceasefire and resolution. However, the ongoing US naval blockade of Iranian ports, as a continuous military operation, prevents this score from dropping to its lowest level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "No change. Commercial shipping in the Strait of Hormuz remains effectively halted, impacted by both the US naval blockade and Iran's military presence. Although reopening the strait is a central topic of current negotiations, creating positive expectations, the actual transit situation has not changed in the past 24 hours.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices are under significant pressure due to expectations of a breakthrough in negotiations. The market is pricing in the possibility of de-escalation, which could lead to the reopening of the Strait of Hormuz and ease global supply tightness. Both Brent and WTI prices fell sharply but remain at relatively high levels, reflecting the risk that a final deal has not yet been reached.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "No change. The United States remains deeply involved as a primary party to the conflict. Its military forces are enforcing a naval blockade while its diplomatic corps is fully engaged in negotiations with Iran. This parallel strategy of military pressure and diplomatic engagement maintains its deep level of intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Prospects have significantly improved. High-level US officials have sent strong signals through the media that a deal is \"largely negotiated,\" covering core issues like ending the war, reopening the strait, and handling nuclear materials. Although Iran's statements are more cautious, both sides confirm major progress in talks, markedly increasing the likelihood of de-escalation through negotiation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "US and Iran close to deal to end conflict, negotiations show substantive progress",
      description: "Several anonymous U.S. and regional officials told multiple media outlets that the U.S. and Iran are close to an agreement. The deal reportedly includes ending the war, reopening the Strait of Hormuz, and Iran giving up its stockpile of highly enriched uranium. U.S. President Trump stated the deal is \"largely negotiated\" but also said he would \"not to rush into a deal.\" (Sources: Associated Press, Reuters, CBS News)",
      verification: "confirmed",
      timestamp: "2026-05-24T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "Iran official says deal not 'imminent,' blames changing US positions",
      description: "An Iranian Foreign Ministry spokesman stated that while understandings have been reached on many issues with the US, an agreement is not \"imminent.\" He said the current focus of talks is on ending the war, not the nuclear issue, and accused Washington of shifting its positions. (Sources: The Guardian, CBS News)",
      verification: "confirmed",
      timestamp: "2026-05-25T04:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "Global oil prices fall over 4% on US-Iran negotiation progress",
      description: "Market optimism that the US and Iran could reach a peace deal and reopen the Strait of Hormuz led to a sharp drop in international oil prices on Monday. Brent crude futures fell below $100/barrel, and WTI crude futures dropped to around $92/barrel, both hitting two-week lows. (Sources: Reuters, Investing.com)",
      verification: "confirmed",
      timestamp: "2026-05-25T08:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-04",
      title: "Pentagon reports on blockade success as military standoff continues",
      description: "While diplomatic talks are in focus, U.S. military operations continue. U.S. Central Command (CENTCOM) stated on May 23 that it had successfully intercepted or diverted 100 commercial vessels since the maritime blockade against Iran began on April 13, showing that the high-pressure military posture has not been lifted. (Source: U.S. CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-05-23T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strong signals from both sides about an impending deal have led to a rapid improvement in market risk appetite.",
      "The core conflict at this stage has shifted from military confrontation to finalizing the details of the agreement.",
      "Although the deal is not yet signed and variables remain, the conflict has transitioned from high-intensity confrontation to a window characterized primarily by political resolution efforts."
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
        "Change: Intensity has decreased.",
        "Change: In the past 24 hours, there have been no reports of new direct military engagements or strikes between the US and Iran.",
        "Change: The primary form of conflict has shifted from active military confrontation to high-stakes diplomatic negotiations aimed at achieving a ceasefire and r…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: No change.",
        "Change: Commercial shipping in the Strait of Hormuz remains effectively halted, impacted by both the US naval blockade and Iran's military presence.",
        "Change: Although reopening the strait is a central topic of current negotiations, creating positive expectations, the actual transit situation has not changed …"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices are under significant pressure due to expectations of a breakthrough in negotiations.",
        "Change: The market is pricing in the possibility of de-escalation, which could lead to the reopening of the Strait of Hormuz and ease global supply tightness.",
        "Change: Both Brent and WTI prices fell sharply but remain at relatively high levels, reflecting the risk that a final deal has not yet been reached."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: No change.",
        "Change: The United States remains deeply involved as a primary party to the conflict.",
        "Change: Its military forces are enforcing a naval blockade while its diplomatic corps is fully engaged in negotiations with Iran."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The contradiction between the US desire to quickly finalize a deal to ease the energy crisis and claim a diplomatic victory, and Iran's desire for more concrete guarantees on lifting the blockade and sanctions.",
      "Details of the agreement (such as verification mechanisms, steps for sanctions relief) remain undisclosed, and hardliners within both countries could pose obstacles to potential concessions."
    ],
    military: [
      "The standoff between the US maintaining its naval blockade as military leverage for negotiations, and Iran's demand for an immediate lifting of the blockade as a precondition for a deal.",
      "The ceasefire remains fragile; any miscalculation or deliberate sabotage by hardliners on either side could close the negotiation window and reignite hostilities."
    ]
  },
  scoreTrend: [
    {
      date: "05-21",
      score: 80
    },
    {
      date: "05-22",
      score: 80
    },
    {
      date: "05-23",
      score: 64
    },
    {
      date: "05-24",
      score: 52
    },
    {
      date: "05-25",
      score: 48,
      active: true
    }
  ],
  investmentSignal: "→ Expectations of conflict de-escalation are driving oil prices down; consider reducing some energy hedges and tentatively increasing exposure to risk assets.",
  prevRiskScore: 52,
  webSources: [],
  webSearchQueries: [
    "US Iran relations latest news 24 hours",
    "Iran military activity May 2026",
    "Strait of Hormuz shipping disruption May 2026",
    "US CENTCOM press release Iran",
    "Iran nuclear deal talks progress May 2026",
    "WTI Brent crude oil price May 25 2026 Reuters",
    "oil price trend analysis Bloomberg May 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.75 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 48（↓4）：美伊谈判取得重大进展，风险评分显著下降",
    bannerWarning: "→ 冲突缓和预期驱动油价下行，可考虑减持部分能源对冲，并试探性增持风险资产。",
    deescalationIntent: "美方希望快速敲定协议以缓解能源危机并宣告外交胜利，与伊朗方面希望在解除封锁和制裁等核心利益上获得更确切保障之间的矛盾。",
    structuralRisk: "无变化。霍尔木兹海峡的商业航运仍处于基本停滞状态，受美国海上封锁和伊朗军事存在的双重影响。尽管重新开放海峡是当前谈判的核心议题，并带来了积极预期，但实际的通行状况在过去24小时内并未发生改变。",
    contradictionNote: "美方希望快速敲定协议以缓解能源危机并宣告外交胜利，与伊朗方面希望在解除封锁和制裁等核心利益上获得更确切保障之间的矛盾。；美军维持海上封锁以作为谈判筹码的军事压力，与伊朗要求立即解除封锁作为达成协议的前提之间的对峙。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第86天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.75 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 48 (↓4): Significant progress in US-Iran negotiations leads to a notable decrease in the risk score",
    bannerWarning: "→ Expectations of conflict de-escalation are driving oil prices down; consider reducing some energy hedges and tentativ…",
    deescalationIntent: "The contradiction between the US desire to quickly finalize a deal to ease the …",
    structuralRisk: "No change. Commercial shipping in the Strait of Hormuz remains effectively halted, impacted by both…",
    contradictionNote: "The contradiction between the US desire to quickly finalize a deal to ease the energy crisis and claim a diplomatic victory, and Iran's desire for more concret…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 86",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
