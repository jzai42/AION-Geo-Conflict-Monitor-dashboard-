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
  reportId: "AION-USIR-20260414-v2.26",
  date: "2026-04-14",
  version: "v2.26",
  title: "美伊冲突日报",
  scoreTrend: [
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D45",
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
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "霍尔木兹",
      value: "严重受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "美军继续对伊朗境内 IRGC 指挥中心进行空袭，同时伊朗向阿拉伯海的美国航母战斗群发射弹道导弹；美海军称大部分被拦截，一艘护航舰轻微受损。对抗仍为直接交火与重大军事行动，但未升至全面战争/大规模地面入侵级别。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主要集装箱与 LNG 船公司已公开确认改道远离波斯湾；海事流量显示商业通过量较冲突前基线下降逾 75%，接近停滞；事实封锁持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在高位波动，市场对冲突风险溢价进行消化；WTI/Brent 处于脚本实时 API 与 rubric 所示区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国继续直接参战；G7 谴责伊朗并支持美方行动；中俄呼吁停火；暂无新的第三方国家直接军事介入。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "瑞士外交部称在美伊间“传递信息”，无正式谈判；双方公开表态仍强硬，谈判前景黯淡。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20260414-001",
      title: "伊朗导弹袭击美国航母编队，美军拦截大部分来袭目标",
      description: "五角大楼证实，一支位于阿拉伯海北部的美国海军航母战斗群遭到多枚伊朗中程弹道导弹的袭击。声明称，“绝大多数”导弹被神盾系统和标准-3拦截弹成功拦截，但一艘阿利·伯克级驱逐舰因碎片造成轻微损伤，无人员伤亡。此举被视为伊朗对美军空袭的直接回应。",
      verification: "confirmed",
      timestamp: "2026-04-14（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-20260414-002",
      title: "军事升级烈度评估从“全面战争”下调至“重大军事行动”",
      description: "AION Monitor将军事升级烈度因子从5分下调至4分。尽管双方持续直接交火，但过去24小时缺乏证据表明冲突已进入大规模地面战阶段，因此风险评估略有回调，以反映当前战事主要集中于空海打击。",
      verification: "confirmed",
      timestamp: "2026-04-14（当日公开报道）",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-20260414-003",
      title: "G7发表联合声明，谴责伊朗“鲁莽的军事升级”",
      description: "七国集团（G7）领导人发表联合声明，一致谴责伊朗对国际航运和美军发动的袭击，称其为“鲁莽的军事升级”，并表示支持美国“为保卫其人员和资产而采取的行动”。",
      verification: "confirmed",
      timestamp: "2026-04-14（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-20260414-004",
      title: "全球主要航运公司确认避开霍尔木兹海峡航线",
      description: "继昨日多家公司暂停航行后，全球最大的几家集装箱和能源运输公司今日均发布官方声明，确认将旗下船队改道，在可预见的未来内避开霍尔木兹海峡及周边水域，导致该航道商业运输实质性中断。",
      verification: "confirmed",
      timestamp: "2026-04-14（当日公开报道）",
      significance: ""
    }
  ],
  warPhase: {
    level: "直接军事对抗",
    targetLevel: "冲突控制与威慑重建",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方正进行直接的、高强度的海空军事打击与反击。",
      "冲突范围目前被控制在军事目标，但存在误判和扩大至民用设施的风险。",
      "双方都在试图通过军事行动塑造未来的谈判地位，或迫使对方退让。"
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
        "伊朗动用多种武器平台对以色列发动饱和攻击，显示其升级意愿和能力。",
        "美国和盟友的联合防御行动展示了区域防空一体化能力，但也暴露了部署情况。",
        "各方都在评估此次攻防行动的结果，以决定下一步行动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "霍尔木兹海峡的军事风险达到顶点，商业航运面临被直接攻击或扣押的真实威胁。",
        "主要集装箱和油轮公司正在评估暂停或绕行该航线，将导致全球供应链成本和延迟增加。",
        "战争风险保费预计将大幅上涨。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "油价已反映出高度的风险溢价，市场正为潜在的供应中断做准备。",
        "如果以色列对伊朗石油设施进行报复性打击，油价可能轻松突破 100 美元。",
        "OPEC+ 可能面临增产压力，但闲置产能有限且决策需要时间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "伊朗领导层试图将此次攻击定性为一次“有限且已结束”的报复，意在控制升级节奏，但球已踢给对方。",
        "美国政府在谴责伊朗的同时，强调其对以色列“铁一般的”安全承诺，暗示支持其自卫权。",
        "以色列战时内阁正在商议回应措施，内部强硬派要求进行强力报复。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图在不引发全面地面战争的前提下，通过军事打击迫使伊朗停止其“恶意活动”并重回谈判桌，而伊朗则力图通过强硬回击证明其威慑能力和政治韧性。"
    ],
    military: [
      "美军的技术优势（特别是空海军和导弹防御）与伊朗的非对称能力（弹道导弹、无人机、代理人网络）之间的对抗，核心是能否有效摧毁对方的打击能力并保护自身资产。"
    ]
  },
  keyChange: "主要变化是军事冲突烈度评估从最高级别5（全面战争）下调至4（重大军事行动）。这反映了尽管对抗激烈，但战事尚未扩大到无限制的地面战争层面，为局势的观察和反应提供了一个微小的喘息窗口，尽管风险依然极高。",
  investmentSignal: "能源价格在高位波动，显示市场对供应中断的担忧已成为常态。任何关于霍尔木兹海峡的进一步军事化行动或沙特等国设施遇袭的传闻，都可能触发油价突破100美元大关。国防工业、网络安全和替代航运路线（如铁路、管道）相关资产持续受益于紧张局势。",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  reportId: "AION-USIR-20260414-v2.26",
  date: "2026-04-14",
  version: "v2.26",
  title: "US-Iran Conflict Daily",
  scoreTrend: [
    {
      date: "04-10",
      score: 64
    },
    {
      date: "04-11",
      score: 60
    },
    {
      date: "04-12",
      score: 72
    },
    {
      date: "04-13",
      score: 80
    },
    {
      date: "04-14",
      score: 76,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D45",
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
      value: "WTI $97 / Brent $98",
      unit: "USD/bbl",
      color: "#ff4136"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "The US continues airstrikes on IRGC command nodes in Iran while Iran fires ballistic missiles at a US carrier group in the Arabian Sea; most were intercepted and one escort sustained minor damage. Hostilities remain direct and large-scale but have not escalated to all-out war or major ground invasion.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Major container and LNG operators have publicly confirmed diversions away from the Persian Gulf; vessel traffic data shows commercial throughput down more than ~75% vs pre-conflict baselines, approaching a standstill; de facto closure persists.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil trades at elevated levels as markets price conflict risk; WTI/Brent align with the live API snapshot and rubric band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The United States remains a direct combatant; the G7 condemns Iran and backs Washington; China and Russia call for a ceasefire; no new third-country direct military entry is evident.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Switzerland confirms message-passing between the US and Iran without formal talks; leadership rhetoric on both sides stays hard-line and prospects for negotiation remain dim.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-20260414-001",
      title: "Iran Attacks US Carrier Group with Missiles; Most Intercepted",
      description: "The Pentagon confirmed that a US Navy carrier strike group in the North Arabian Sea was targeted by multiple Iranian medium-range ballistic missiles. A statement said the \"vast majority\" of missiles were successfully intercepted by the Aegis system and SM-3 interceptors, but one Arleigh Burke-class destroyer suffered minor damage from debris, with no casualties. The move is seen as a direct response to US airstrikes.",
      verification: "confirmed",
      timestamp: "2026-04-14 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-20260414-002",
      title: "Military Escalation Assessment Downgraded from 'All-out War' to 'Major Operations'",
      description: "AION Monitor has downgraded the Military Escalation factor from 5 to 4. Although direct fire exchange continues, the lack of evidence over the past 24 hours of a large-scale ground war phase has prompted a slight reassessment of risk, reflecting that hostilities are currently focused on air and sea strikes.",
      verification: "confirmed",
      timestamp: "2026-04-14 (same-day reporting)",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-20260414-003",
      title: "G7 Issues Joint Statement Condemning Iran's 'Reckless Military Escalation'",
      description: "The leaders of the Group of Seven (G7) nations issued a joint statement, unanimously condemning Iran's attacks on international shipping and US forces as a \"reckless military escalation\" and expressed support for \"actions taken by the United States to defend its personnel and assets.\"",
      verification: "confirmed",
      timestamp: "2026-04-14 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-20260414-004",
      title: "Global Shipping Majors Confirm Rerouting from Strait of Hormuz",
      description: "Following yesterday's suspensions, several of the world's largest container and energy transport companies issued official statements today confirming they are rerouting their fleets to avoid the Strait of Hormuz and surrounding waters for the foreseeable future, leading to a substantive halt in commercial traffic.",
      verification: "confirmed",
      timestamp: "2026-04-14 (same-day reporting)",
      significance: ""
    }
  ],
  warPhase: {
    level: "Direct Military Confrontation",
    targetLevel: "Conflict Control & Deterrence Restoration",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran are engaged in direct, high-intensity air and naval strikes and counter-strikes.",
      "The scope of conflict is currently limited to military targets, but risks of miscalculation and expansion to civilian infrastructure are high.",
      "Both sides are attempting to use military action to shape the conditions for future negotiations or force the other side to back down."
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
        "Iran used multiple platforms to launch saturation-style strikes on Israel, signaling both willingness and capacity to escalate.",
        "Allied integrated air defenses demonstrated regional capacity but also exposed deployment patterns.",
        "All sides are assessing the outcome of this exchange before deciding next moves."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Military risk around the Strait of Hormuz is at a peak; commercial shipping faces real threats of attack or seizure.",
        "Major container and tanker lines are evaluating pauses or reroutes, raising global supply-chain cost and delay.",
        "War-risk insurance premiums are expected to jump materially."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Oil already embeds a large risk premium as markets prepare for potential supply disruptions.",
        "If Israel retaliates against Iranian oil infrastructure, prices could break $100/bbl quickly.",
        "OPEC+ may face pressure to add barrels, but spare capacity is limited and decisions take time."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Iranian leaders frame the strike as “limited and concluded,” trying to pace escalation—while shifting the next move to the other side.",
        "Washington condemns Iran while stressing an “ironclad” commitment to Israel’s security and the right to self-defense.",
        "Israel’s war cabinet is weighing responses; hardliners are pushing for forceful retaliation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The US seeks to compel Iran to cease its 'malign activities' and return to negotiations through military strikes without triggering an all-out ground war, while Iran aims to demonstrate its deterrent capability and political resilience through forceful retaliation."
    ],
    military: [
      "The contest between US technological superiority (especially air/naval power and missile defense) and Iran's asymmetric capabilities (ballistic missiles, drones, proxy networks), focused on the ability to effectively degrade the other's strike capacity while protecting one's own assets."
    ]
  },
  keyChange: "The primary change is the downgrade of the military conflict intensity assessment from the highest level 5 (All-out War) to 4 (Major Military Operations). This reflects that while confrontation is severe, it has not yet expanded into an unrestricted ground war, providing a marginal window for observation and reaction, though risks remain extremely high.",
  investmentSignal: "Elevated energy prices indicate that market concern over supply disruption has become the new normal. Any further militarization of the Strait of Hormuz or rumored attacks on facilities in Saudi Arabia could trigger a spike above the $100/barrel mark. Defense industries, cybersecurity, and assets related to alternative shipping routes (e.g., rail, pipelines) continue to benefit from the tensions.",
  prevRiskScore: 80,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月14日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.26 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↓4）：主要变化是军事冲突烈度评估从最高级别5（全面战争）下调至4（重大军事行动）。这反映了尽管对抗激烈，但战事尚未扩大到无限制的地面战争层面，为局势的观察和反应提供了一个微小的喘息窗口，尽管风险依然极高。",
    bannerWarning: "能源价格在高位波动，显示市场对供应中断的担忧已成为常态。任何关于霍尔木兹海峡的进一步军事化行动或沙特等国设施遇袭的传闻，都可能触发油价突破100美元大关。国防工业、网络安全和替代航运路线（如铁路、管道）相关资产持续受益于紧张局势。",
    deescalationIntent: "美国试图在不引发全面地面战争的前提下，通过军事打击迫使伊朗停止其“恶意活动”并重回谈判桌，而伊朗则力图通过强硬回击证明其威慑能力和政治韧性。",
    structuralRisk: "咽喉与航运条件仍影响流量。",
    contradictionNote: "美国试图在不引发全面地面战争的前提下，通过军事打击迫使伊朗停止其“恶意活动”并重回谈判桌，而伊朗则力图通过强硬回击证明其威慑能力和政治韧性。；美军的技术优势（特别是空海军和导弹防御）与伊朗的非对称能力（弹道导弹、无人机、代理人网络）之间的对抗，核心是能否有效摧毁对方的打击能力并保护自身资产。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第45天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 14 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.26 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↓4): The primary change is the downgrade of the military conflict intensity assessment from the highest level 5 (All-out War) to 4 (Major Milita…",
    bannerWarning: "Elevated energy prices indicate that market concern over supply disruption has become the new normal. Any further milit…",
    deescalationIntent: "The US seeks to compel Iran to cease its 'malign activities' and return to nego…",
    structuralRisk: "Chokepoint conditions still matter.",
    contradictionNote: "The US seeks to compel Iran to cease its 'malign activities' and return to negotiations through military strikes without triggering an all-out ground war, whil…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 45",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
