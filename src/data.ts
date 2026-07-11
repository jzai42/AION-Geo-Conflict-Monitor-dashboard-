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
  date: "2026-07-11",
  version: "v2.122",
  keyStats: [
    {
      label: "冲突天数",
      value: "D133",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $71–77 · Brent $75–77",
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
  riskScore: 72,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "虽然美国暂停了为期两天的报复性空袭，但此前发生了针对约170个目标的大规模直接军事打击，以及伊朗对美国盟友的报复性攻击。局势仍处于直接交火的边缘。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运交通量急剧下降，接近停滞。关闭应答器的“黑暗运输”比例显著增加，主要的国际海事组织建议船只规避该水域。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2.5,
      weight: 0.2,
      description: "由于美伊同意恢复谈判，市场对全面冲突的担忧有所缓解，油价从本周高点回落。布伦特原油价格稳定在76美元左右，WTI在71-72美元区间，价格波动但主体落在温和区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军方直接参与了对伊朗境内目标的空袭行动，这是直接的军事部署和作战参与。该行动是对伊朗袭击国际航运的回应，标志着大国军事介入的深化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "尽管双方同意在阿曼恢复间接会谈，但美国总统公开宣布停火协议“结束”，使得谈判前景极其脆弱和不确定。双方立场依然强硬，谈判破裂的风险非常高。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01-711",
      title: "美伊同意在阿曼恢复谈判，但特朗普称停火已“结束”",
      description: "尽管美国总统特朗普公开表示停火协议“结束”，但据多家媒体证实，美伊双方代表团已于周六前往阿曼，通过调解人继续谈判。此前，伊朗私下向美方表示，其在霍尔木兹海峡对商船的袭击是试图破坏谈判的“错误”强硬派所为。(Sources: CBS News, Fox News, Axios)",
      verification: "confirmed",
      timestamp: "2026-07-11T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-02-711",
      title: "美国暂停对伊朗的报复性空袭",
      description: "在对约170个伊朗军事目标进行了为期两天的报复性打击后，美国暂停了其军事行动。此轮打击旨在回应伊朗此前对霍尔木兹海峡商业船只的袭击。局势暂时从直接军事对抗中缓和。(Sources: Fox News, PBS)",
      verification: "confirmed",
      timestamp: "2026-07-11T02:00:00Z",
      significance: ""
    },
    {
      id: "evt-03-711",
      title: "霍尔木兹海峡航运仍接近停滞",
      description: "根据海事分析公司Windward的数据，商业航运交通量已连续三天下降，与几天前相比急剧减少。所谓的“黑暗运输”（船只关闭应答器）比例升至近40%。联合国国际海事组织（IMO）建议船只避开该海峡。(Sources: Caliber.Az, UN News)",
      verification: "confirmed",
      timestamp: "2026-07-11T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-04-711",
      title: "美国对与伊朗最高领袖相关的金融家实施新制裁",
      description: "美国财政部周五宣布，对一名被控为伊朗最高领袖管理资产的金融家以及多家据称协助受制裁伊朗银行转移资金的兑换行实施新制裁。财政部称，此举是对伊朗在霍尔木兹海峡发动袭击的回应。(Sources: Fox News, U.S. Department of the Treasury)",
      verification: "confirmed",
      timestamp: "2026-07-10T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-05-711",
      title: "油价从周高点回落，但供应风险持续",
      description: "由于美伊同意恢复谈判，油价在周五从近期高点回落。然而，由于霍尔木兹海峡的航运中断仍在持续，全球能源供应风险依然存在，使价格保持在较高水平。布伦特原油交易价格约为76美元/桶，WTI约为71-72美元/桶。(Sources: Trading Economics, CME Group)",
      verification: "confirmed",
      timestamp: "2026-07-10T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊在直接军事打击后重返谈判桌，但停火协议已被公开撕毁，局势从高强度冲突暂时回落至高度不确定的升级边缘状态。",
      "虽然停火宣告结束，但双方迅速同意恢复间接谈判，显示出控制局势的意愿，但缺乏互信基础。",
      "当前阶段是军事威慑与外交试探的危险混合。任何误判或强硬派的破坏行动都可能导致冲突螺旋式升级。市场正在消化矛盾的信号。"
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
        "变化：美国暂停了为期两天的对伊朗的报复性空袭，结束了近期的直接军事交火周期。",
        "延续：尽管空袭暂停，但双方的军事部署和戒备等级依然很高，区域军事紧张局势未得到根本缓解。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡的商业航运仍处于“严重受限”状态，通行量远低于正常水平，航运保险成本高昂。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因美伊重启谈判的消息而从周内高点回落，风险溢价有所收窄。",
        "延续：由于霍尔木兹海峡的物理中断依然存在，对全球原油供应的担忧持续为油价提供底部支撑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美伊双方同意在阿曼恢复由调解人参与的谈判，这是一个关键的降级信号。",
        "延续：美国总统公开表示停火协议“结束”，这种强硬措辞与重返谈判桌的行为形成矛盾，反映出其“极限施压”与外交并行的策略。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国试图通过“军事打击+外交谈判”的双重压力，迫使伊朗在霍尔木兹海峡通行权和核问题上做出实质性让步。",
      "伊朗则试图通过展示其封锁海峡的能力来换取制裁减免和安全保障，同时利用内部强硬派的行动作为谈判筹码。"
    ],
    military: [
      "美国旨在通过精确打击削弱伊朗封锁海峡的军事能力，同时避免引发需要大规模地面部队介入的全面战争。",
      "伊朗及其代理人则利用非对称战术（无人机、导弹、快艇）挑战美国及其盟友在海湾地区的军事主导地位，并制造不可预测的升级风险。"
    ]
  },
  scoreTrend: [
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74
    },
    {
      date: "07-11",
      score: 72,
      active: true
    }
  ],
  keyChange: "美伊在直接军事交火后迅速同意重返谈判桌，市场风险偏好有所修复，但停火协议的公开破裂使局势根基极不稳定。",
  investmentSignal: "→ 维持对风险资产的防御性配置，地缘政治风险溢价仍处高位，但直接冲突的短期降温为市场提供喘息窗口。",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: [
    "WTI crude price July 2026",
    "Brent crude price July 2026",
    "US Iran conflict news last 24 hours",
    "Iran military activity July 2026",
    "Strait of Hormuz shipping status July 2026",
    "Iran nuclear talks progress July 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-11",
  version: "v2.122",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D133",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $71–77 · Brent $75–77",
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
  riskScore: 72,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Although the U.S. has paused its two-day retaliatory airstrikes, the preceding period saw large-scale direct military strikes targeting ~170 sites and retaliatory attacks by Iran on U.S. allies. The situation remains on the brink of direct confrontation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic in the Strait of Hormuz has plummeted and is near a standstill. The proportion of 'dark transits' with transponders off has increased significantly, and major international maritime bodies advise vessels to avoid the area.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2.5,
      weight: 0.2,
      description: "Oil prices have retreated from weekly highs as market concerns over a full-blown conflict eased with the agreement to resume talks. Brent crude stabilized around $76/bbl, and WTI in the $71-72 range, with prices volatile but primarily within a moderate band.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "down"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. military was directly involved in airstrikes against targets within Iran, which constitutes direct military deployment and combat participation. The operation was a response to Iranian attacks on international shipping, marking a deep level of great power military intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Although both sides have agreed to resume indirect talks in Oman, the U.S. President's public declaration that the ceasefire is 'OVER' makes the prospect for negotiations extremely fragile and uncertain. The risk of talks collapsing is very high.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-01-711",
      title: "US and Iran agree to resume talks in Oman, but Trump says ceasefire is 'OVER'",
      description: "Despite U.S. President Trump's public declaration that the ceasefire agreement is 'OVER,' delegations from both nations traveled to Oman on Saturday to continue negotiations via mediators, according to multiple confirmed reports. Iran had previously conveyed privately to the U.S. that its attacks on commercial ships in the Strait of Hormuz were the work of 'errant' hardliners attempting to sabotage talks. (Sources: CBS News, Fox News, Axios)",
      verification: "confirmed",
      timestamp: "2026-07-11T05:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-02-711",
      title: "U.S. pauses retaliatory airstrikes against Iran",
      description: "After a two-day retaliatory campaign targeting approximately 170 Iranian military sites, the United States has paused its military operations. The strikes were a response to prior Iranian attacks on commercial vessels in the Strait of Hormuz. The situation has temporarily de-escalated from direct military confrontation. (Sources: Fox News, PBS)",
      verification: "confirmed",
      timestamp: "2026-07-11T02:00:00Z",
      significance: ""
    },
    {
      id: "evt-03-711",
      title: "Shipping in Strait of Hormuz remains near a standstill",
      description: "According to maritime analytics firm Windward, commercial shipping traffic has declined for a third consecutive day, dropping sharply compared to just days earlier. The proportion of so-called 'dark transits' (vessels with transponders off) has risen to nearly 40%. The UN's International Maritime Organization (IMO) has advised vessels to avoid the strait. (Sources: Caliber.Az, UN News)",
      verification: "confirmed",
      timestamp: "2026-07-11T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-04-711",
      title: "U.S. imposes new sanctions on financier tied to Iran's Supreme Leader",
      description: "The U.S. Treasury Department announced new sanctions on Friday targeting a financier accused of managing assets for Iran's Supreme Leader, as well as exchange houses alleged to have moved funds for sanctioned Iranian banks. Treasury stated the action was in response to Iran's attacks in the Strait of Hormuz. (Sources: Fox News, U.S. Department of the Treasury)",
      verification: "confirmed",
      timestamp: "2026-07-10T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-05-711",
      title: "Oil prices retreat from weekly highs, but supply risks persist",
      description: "Oil prices pulled back from recent highs on Friday as the U.S. and Iran agreed to resume talks. However, global energy supply risks remain due to the ongoing shipping disruptions in the Strait of Hormuz, keeping prices elevated. Brent crude traded around $76/barrel, with WTI around $71-72/barrel. (Sources: Trading Economics, CME Group)",
      verification: "confirmed",
      timestamp: "2026-07-10T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Following direct military strikes, the U.S. and Iran are returning to the negotiating table, but the ceasefire agreement has been publicly renounced, moving the situation from high-intensity conflict back to a highly uncertain escalatory edge.",
      "Although the ceasefire is declared over, the swift agreement to resume indirect talks shows a will to control the situation, but it lacks a foundation of mutual trust.",
      "The current phase is a dangerous mix of military deterrence and diplomatic probing. Any miscalculation or sabotage by hardliners could lead to a conflict spiral. Markets are digesting contradictory signals."
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
        "Change: The U.S. has paused its two-day retaliatory airstrikes against Iran, ending the immediate cycle of direct military fire.",
        "Continue: Despite the pause in strikes, military deployments and alert levels for both sides remain high, and underlying regional military tension is not funda…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping through the Strait of Hormuz remains 'severely restricted,' with transit volumes far below normal levels and insurance costs high."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices have retreated from intra-week highs on news of renewed U.S.-Iran talks, with the risk premium narrowing.",
        "Continue: Concerns over global crude supply, stemming from the physical disruption in the Strait of Hormuz, continue to provide a floor for oil prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The U.S. and Iran have agreed to resume talks in Oman with mediators, a key de-escalatory signal.",
        "Continue: The U.S. President's public statement that the ceasefire is 'over' creates a contradictory signal, reflecting a strategy of parallel 'maximum pressur…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. is attempting to use dual pressure from 'military strikes + diplomatic talks' to force Iran into making substantial concessions on Hormuz transit rights and its nuclear program.",
      "Iran seeks to leverage its capability to close the strait to gain sanctions relief and security guarantees, while using the actions of internal hardliners as bargaining chips."
    ],
    military: [
      "The U.S. aims to degrade Iran's military capacity to blockade the strait through precision strikes while avoiding a full-scale war requiring large ground forces.",
      "Iran and its proxies use asymmetric tactics (drones, missiles, fast boats) to challenge U.S. and allied military dominance in the Gulf and create unpredictable escalation risks."
    ]
  },
  scoreTrend: [
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74
    },
    {
      date: "07-11",
      score: 72,
      active: true
    }
  ],
  keyChange: "A swift agreement to return to the negotiating table after direct military exchanges has improved market risk sentiment, but the public collapse of the ceasefire agreement leaves the situation fundamentally unstable.",
  investmentSignal: "→ Maintain a defensive posture on risk assets; the geopolitical risk premium remains high, but the short-term cooling of direct conflict offers a breathing window for the market.",
  prevRiskScore: 74,
  webSources: [],
  webSearchQueries: [
    "WTI crude price July 2026",
    "Brent crude price July 2026",
    "US Iran conflict news last 24 hours",
    "Iran military activity July 2026",
    "Strait of Hormuz shipping status July 2026",
    "Iran nuclear talks progress July 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.122 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓2）：美伊在直接军事交火后迅速同意重返谈判桌，市场风险偏好有所修复，但停火协议的公开破裂使局势根基极不稳定。",
    bannerWarning: "→ 维持对风险资产的防御性配置，地缘政治风险溢价仍处高位，但直接冲突的短期降温为市场提供喘息窗口。",
    deescalationIntent: "美国试图通过“军事打击+外交谈判”的双重压力，迫使伊朗在霍尔木兹海峡通行权和核问题上做出实质性让步。",
    structuralRisk: "霍尔木兹海峡的商业航运交通量急剧下降，接近停滞。关闭应答器的“黑暗运输”比例显著增加，主要的国际海事组织建议船只规避该水域。",
    contradictionNote: "美国试图通过“军事打击+外交谈判”的双重压力，迫使伊朗在霍尔木兹海峡通行权和核问题上做出实质性让步。；美国旨在通过精确打击削弱伊朗封锁海峡的军事能力，同时避免引发需要大规模地面部队介入的全面战争。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第133天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.122 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓2): A swift agreement to return to the negotiating table after direct military exchanges has improved market risk sentiment, but the public col…",
    bannerWarning: "→ Maintain a defensive posture on risk assets; the geopolitical risk premium remains high, but the short-term cooling o…",
    deescalationIntent: "The U.S. is attempting to use dual pressure from 'military strikes + diplomatic…",
    structuralRisk: "Commercial shipping traffic in the Strait of Hormuz has plummeted and is near a standstill. The pro…",
    contradictionNote: "The U.S. is attempting to use dual pressure from 'military strikes + diplomatic talks' to force Iran into making substantial concessions on Hormuz transit righ…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 133",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
