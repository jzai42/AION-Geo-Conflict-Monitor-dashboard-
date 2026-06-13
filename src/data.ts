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
  date: "2026-06-13",
  version: "v2.94",
  conflictDay: "D105",
  keyStats: [
    {
      label: "冲突天数",
      value: "D105",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓12",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $83.80–$86.80 · Brent $86.50–$89.10",
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
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊双方在霍尔木兹海峡附近仍有直接、但有限的军事对抗。美国中央司令部（CENTCOM）确认于6月13日击落了多架试图袭击商业航运的伊朗无人机。这表明，尽管高层正在进行和平谈判，但前线的直接交火事件仍在发生，维持了高度紧张的军事对峙态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "尽管美国军方表示在拦截无人机后，海峡交通“未受阻碍”，但伊朗持续使用无人机试图攻击商船的行为本身，对航运构成了致命威胁。这迫使主要航运公司继续暂停或规避该航线，商业航运流量远低于正常水平，通行状态依然属于“严重受限”。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "由于美国与伊朗接近达成和平协议的前景日益明朗，市场对霍尔木兹海峡即将重新开放的预期升温，导致原油期货价格大幅下跌。布伦特和WTI原油价格均已跌破关键心理价位，风险溢价显著收缩。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国继续作为主要外部力量直接参与该地区的军事行动（拦截无人机）和最高级别的外交谈判。同时，巴基斯坦等区域大国在调解中扮演关键角色。大国介入的性质（军事部署、援助和密集外交）与前一日相比没有发生结构性变化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 4,
      weight: 0.2,
      description: "谈判前景出现重大积极转变。美国白宫官员、伊朗外交部长以及作为调解方的巴基斯坦总理均公开表示，双方已就一份旨在结束战争的“最终协议文本”达成一致。这标志着谈判取得了决定性的实质性进展，远超此前僵持状态。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "美伊接近达成协议，白宫称涉霍尔木兹重开与核计划拆除",
      description: "多位美国官员与伊朗外交部长证实，双方已就一份旨在结束冲突的协议文本达成一致，内容涵盖重开霍尔木兹海峡、拆除伊朗核计划，并以“表现为基础”释放资金。巴基斯坦作为调解方称“最终商定文本”已达成。(Sources: Reuters, Fox News, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-12T20:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "美军在霍尔木兹海峡上空击落多架伊朗攻击无人机",
      description: "在美国与伊朗接近达成协议之际，美国中央司令部（CENTCOM）于6月13日凌晨宣布，其部队击落了数架试图袭击海峡内商船的伊朗单向攻击无人机。CENTCOM称，海峡交通未受阻碍。(Sources: CENTCOM, Reuters, AP)",
      verification: "confirmed",
      timestamp: "2026-06-13T03:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "石油价格因美伊可能达成协议而大幅下跌",
      description: "受美伊谈判取得进展、有望重开霍尔木兹海峡消息提振，国际油价显著承压。布伦特原油价格跌破90美元/桶，WTI原油价格也跌至85美元/桶以下，反映出市场对供应风险缓解的预期。(Sources: Reuters, Bloomberg, The National)",
      verification: "confirmed",
      timestamp: "2026-06-12T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "伊朗确认核问题将在协议初步执行后进行为期60天的谈判",
      description: "伊朗外交部长阿拉格希澄清，与美国的谅解备忘录将首先处理停火与海峡问题，而核计划的细节将在协议签署后为期60天的第二阶段谈判中解决。伊朗媒体称德黑兰不会放弃铀浓缩权利。(Sources: Tasnim News Agency, The Jerusalem Post, Fox News)",
      verification: "confirmed",
      timestamp: "2026-06-12T15:00:00Z",
      significance: ""
    },
    {
      id: "evt-05",
      title: "以色列对黎巴嫩南部的袭击仍在继续",
      description: "尽管美伊谈判取得进展，但以色列并未停止对黎巴嫩南部的军事行动，并发布了新的撤离令。以色列总理内塔尼亚胡表示，以色列不会成为美伊协议的一方。(Sources: Reuters, The New Arab)",
      verification: "single",
      timestamp: "2026-06-13T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双方官方确认已就协议文本达成一致，为冲突降级创造了明确路径。",
      "一线军事摩擦（如无人机事件）仍在发生，表明协议执行前仍存高度不确定性与风险。",
      "核心矛盾正从军事对抗转向协议细节的敲定与执行监督。"
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
        "变化：美伊双方在霍尔木兹海峡附近仍有直接、但有限的军事对抗。",
        "变化：美国中央司令部（CENTCOM）确认于6月13日击落了多架试图袭击商业航运的伊朗无人机。",
        "变化：这表明，尽管高层正在进行和平谈判，但前线的直接交火事件仍在发生，维持了高度紧张的军事对峙态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：尽管美国军方表示在拦截无人机后，海峡交通“未受阻碍”，但伊朗持续使用无人机试图攻击商船的行为本身，对航运构成了致命威胁。",
        "变化：这迫使主要航运公司继续暂停或规避该航线，商业航运流量远低于正常水平，通行状态依然属于“严重受限”。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于美国与伊朗接近达成和平协议的前景日益明朗，市场对霍尔木兹海峡即将重新开放的预期升温，导致原油期货价格大幅下跌。",
        "变化：布伦特和WTI原油价格均已跌破关键心理价位，风险溢价显著收缩。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美国继续作为主要外部力量直接参与该地区的军事行动（拦截无人机）和最高级别的外交谈判。",
        "变化：同时，巴基斯坦等区域大国在调解中扮演关键角色。",
        "变化：大国介入的性质（军事部署、援助和密集外交）与前一日相比没有发生结构性变化。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在政治上均有达成协议以结束冲突的强烈意愿，但这与两国国内的强硬派立场以及区域盟友（如以色列）的战略关切存在矛盾。"
    ],
    military: [
      "高层外交谈判取得突破性进展与前线部队持续发生直接军事摩擦（无人机攻击与拦截）之间的矛盾，显示了局势缓和过程中的脆弱性和不稳定性。"
    ]
  },
  scoreTrend: [
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60,
      active: true
    }
  ],
  keyChange: "谈判前景出现决定性改善，综合风险分因此大幅下调。双方首次官方确认就“最终协议文本”达成一致，显著降低了冲突全面升级的概率，并直接导致能源市场风险溢价收缩。尽管军事摩擦仍在继续，但其性质已更接近于达成协议前的施压与试探，而非旨在升级冲突。",
  investmentSignal: "→ 市场正定价风险缓和，可适度减持能源多头头寸，但需警惕谈判破裂的尾部风险，维持部分防御性配置。",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Iran nuclear deal talks news",
    "Strait of Hormuz shipping disruptions",
    "CENTCOM press release Iran",
    "Iran military activity",
    "US fifth fleet news",
    "WTI crude oil price range June 12-13 2026",
    "Brent crude oil price range June 12-13 2026",
    "oil price trends Reuters",
    "oil price analysis Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-13",
  version: "v2.94",
  conflictDay: "D105",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D105",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓12",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $83.80–$86.80 · Brent $86.50–$89.10",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The US and Iran continue to engage in direct, albeit limited, military confrontations near the Strait of Hormuz. US CENTCOM confirmed shooting down multiple Iranian drones attempting to attack commercial shipping on June 13. This indicates that despite high-level peace talks, direct fire incidents are ongoing, maintaining a state of high military tension.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Although the US military stated that traffic was 'unimpeded' after intercepting the drones, Iran's continued attempts to attack commercial vessels with UAVs constitute a lethal threat to shipping. This forces major shipping lines to continue suspending or rerouting, keeping commercial traffic far below normal levels and the transit status as 'Severely Restricted'.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "As the prospect of a peace deal between the US and Iran becomes more likely, market expectations for the reopening of the Strait of Hormuz have increased, leading to a sharp fall in crude oil futures prices. Both Brent and WTI have fallen below key psychological levels as the risk premium shrinks significantly.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The United States continues to be the primary external power directly involved in military actions (drone interceptions) and top-level diplomatic negotiations in the region. Meanwhile, regional powers like Pakistan are playing a key role in mediation. The nature of great power involvement (military deployment, aid, and intensive diplomacy) has not structurally changed from the previous day.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 4,
      weight: 0.2,
      description: "Negotiation prospects have shown a major positive shift. US White House officials, Iran's Foreign Minister, and the mediating Pakistani Prime Minister have all publicly stated that an agreement on a 'final text' of a deal to end the war has been reached. This marks a decisive, substantive breakthrough in talks, far exceeding the previous stalemate.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    }
  ],
  events: [
    {
      id: "evt-01",
      title: "US & Iran Near Deal Involving Hormuz Reopening and Nuclear Dismantlement, White House Says",
      description: "Multiple US officials and Iran's foreign minister confirmed that both sides have agreed on a text for a deal to end the conflict, covering the reopening of the Strait of Hormuz, dismantlement of Iran's nuclear program, and a 'performance-based' release of funds. Mediator Pakistan stated a 'final, agreed upon text' has been reached. (Sources: Reuters, Fox News, CBS News)",
      verification: "confirmed",
      timestamp: "2026-06-12T20:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-02",
      title: "US Military Downs Multiple Iranian Attack Drones Over Strait of Hormuz",
      description: "As the US and Iran neared a deal, US Central Command (CENTCOM) announced early on June 13 that its forces shot down several Iranian one-way attack drones attempting to strike commercial ships in the strait. CENTCOM stated that traffic was not impeded. (Sources: CENTCOM, Reuters, AP)",
      verification: "confirmed",
      timestamp: "2026-06-13T03:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-03",
      title: "Oil Prices Tumble on Prospect of US-Iran Deal",
      description: "Boosted by news of progress in US-Iran negotiations and the potential reopening of the Strait of Hormuz, international oil prices came under significant pressure. Brent crude fell below $90/barrel and WTI dropped below $85/barrel, reflecting market expectations of easing supply risks. (Sources: Reuters, Bloomberg, The National)",
      verification: "confirmed",
      timestamp: "2026-06-12T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-04",
      title: "Iran Confirms Nuclear Issues to be Negotiated for 60 Days After Initial Deal",
      description: "Iranian Foreign Minister Araghchi clarified that the memorandum of understanding with the US will first address the ceasefire and the strait, while details of the nuclear program will be resolved in a 60-day second phase of talks after the deal is signed. Iranian media stated Tehran would not give up its right to uranium enrichment. (Sources: Tasnim News Agency, The Jerusalem Post, Fox News)",
      verification: "confirmed",
      timestamp: "2026-06-12T15:00:00Z",
      significance: ""
    },
    {
      id: "evt-05",
      title: "Israeli strikes on southern Lebanon continue",
      description: "Despite progress in US-Iran talks, Israel has not ceased its military operations in southern Lebanon and has issued new evacuation orders. Prime Minister Netanyahu stated that Israel would not be a party to the US-Iran agreement. (Sources: Reuters, The New Arab)",
      verification: "single",
      timestamp: "2026-06-13T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Official confirmation from both sides on an agreed deal text creates a clear path for de-escalation.",
      "Frontline military friction (e.g., drone incidents) persists, indicating high uncertainty and risk before implementation.",
      "The core contradiction is shifting from military confrontation to finalizing and overseeing the implementation of the agreement's details."
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
        "Change: The US and Iran continue to engage in direct, albeit limited, military confrontations near the Strait of Hormuz.",
        "Change: US CENTCOM confirmed shooting down multiple Iranian drones attempting to attack commercial shipping on June 13.",
        "Change: This indicates that despite high-level peace talks, direct fire incidents are ongoing, maintaining a state of high military tension."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Although the US military stated that traffic was 'unimpeded' after intercepting the drones, Iran's continued attempts to attack commercial vessels with…",
        "Change: This forces major shipping lines to continue suspending or rerouting, keeping commercial traffic far below normal levels and the transit status as 'Sev…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: As the prospect of a peace deal between the US and Iran becomes more likely, market expectations for the reopening of the Strait of Hormuz have increas…",
        "Change: Both Brent and WTI have fallen below key psychological levels as the risk premium shrinks significantly."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The United States continues to be the primary external power directly involved in military actions (drone interceptions) and top-level diplomatic negot…",
        "Change: Meanwhile, regional powers like Pakistan are playing a key role in mediation.",
        "Change: The nature of great power involvement (military deployment, aid, and intensive diplomacy) has not structurally changed from the previous day."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The strong political will on both the US and Iranian sides to reach a deal to end the conflict is at odds with the positions of domestic hardliners and the strategic concerns of regional allies (like Israel)."
    ],
    military: [
      "The contradiction between a breakthrough in high-level diplomatic negotiations and the continuation of direct military friction on the front lines (drone attacks and interceptions) highlights the fragility and instability of the de-escalation process."
    ]
  },
  scoreTrend: [
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72
    },
    {
      date: "06-13",
      score: 60,
      active: true
    }
  ],
  keyChange: "A decisive improvement in negotiation prospects has led to a significant reduction in the composite risk score. For the first time, both sides have officially confirmed agreement on a 'final deal text,' substantially lowering the probability of a full-scale escalation and directly causing a contraction in the energy market's risk premium. Although military frictions continue, their nature now appears more akin to pre-deal posturing and testing rather than attempts to escalate the conflict.",
  investmentSignal: "→ The market is pricing in risk reduction. Consider moderately reducing long energy positions, but remain alert to tail risks of negotiation collapse and maintain some defensive allocation.",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Iran nuclear deal talks news",
    "Strait of Hormuz shipping disruptions",
    "CENTCOM press release Iran",
    "Iran military activity",
    "US fifth fleet news",
    "WTI crude oil price range June 12-13 2026",
    "Brent crude oil price range June 12-13 2026",
    "oil price trends Reuters",
    "oil price analysis Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.94 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↓12）：谈判前景出现决定性改善，综合风险分因此大幅下调。双方首次官方确认就“最终协议文本”达成一致，显著降低了冲突全面升级的概率，并直接导致能源市场风险溢价收缩。尽管军事摩擦仍在继续，但其性质已更接近于达成协议前的施压与试探，而非旨在升级冲突。",
    bannerWarning: "→ 市场正定价风险缓和，可适度减持能源多头头寸，但需警惕谈判破裂的尾部风险，维持部分防御性配置。",
    deescalationIntent: "美伊双方在政治上均有达成协议以结束冲突的强烈意愿，但这与两国国内的强硬派立场以及区域盟友（如以色列）的战略关切存在矛盾。",
    structuralRisk: "尽管美国军方表示在拦截无人机后，海峡交通“未受阻碍”，但伊朗持续使用无人机试图攻击商船的行为本身，对航运构成了致命威胁。这迫使主要航运公司继续暂停或规避该航线，商业航运流量远低于正常水平，通行状态依…",
    contradictionNote: "美伊双方在政治上均有达成协议以结束冲突的强烈意愿，但这与两国国内的强硬派立场以及区域盟友（如以色列）的战略关切存在矛盾。；高层外交谈判取得突破性进展与前线部队持续发生直接军事摩擦（无人机攻击与拦截）之间的矛盾，显示了局势缓和过程中的脆弱性和不稳定性。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第105天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.94 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↓12): A decisive improvement in negotiation prospects has led to a significant reduction in the composite risk score. For the first time, both si…",
    bannerWarning: "→ The market is pricing in risk reduction. Consider moderately reducing long energy positions, but remain alert to tail…",
    deescalationIntent: "The strong political will on both the US and Iranian sides to reach a deal to e…",
    structuralRisk: "Although the US military stated that traffic was 'unimpeded' after intercepting the drones, Iran's …",
    contradictionNote: "The strong political will on both the US and Iranian sides to reach a deal to end the conflict is at odds with the positions of domestic hardliners and the str…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 105",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
