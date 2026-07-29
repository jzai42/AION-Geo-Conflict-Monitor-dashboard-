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
  date: "2026-07-29",
  version: "v2.140",
  keyStats: [
    {
      label: "冲突天数",
      value: "D151",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑10",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $82–$83 · Brent $87–$88",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "伊朗首次对第三国（约旦）境内的美军基地直接发动弹道导弹袭击，而美军则联合沙特对伊拉克境内的伊朗代理人武装进行报复性打击，冲突烈度显著升级。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运仍然基本停滞。伊朗革命卫队声称再次袭击了三艘油轮，加剧了航运风险，并正式拒绝了旨在恢复航运的外交解决方案。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "随着中东战事急剧升温，市场对供应中断的担忧加剧，导致油价大幅跳涨。布伦特原油价格上涨约5%，达到每桶88美元左右，进入显著偏强区间。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国不仅直接参与拦截伊朗导弹的军事行动，还首次与沙特阿拉伯公开进行联合空袭，打击在第三国（伊拉克）的伊朗代理人，标志着军事同盟行动的深化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "伊朗直接袭击美军基地和拒绝外交提议的行为，彻底关闭了近期的谈判窗口。局势已重回“以牙还牙”的升级循环，双方均无对话意愿。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "event-1",
      title: "伊朗对驻约旦美军基地发动弹道导弹袭击，遭美方拦截",
      description: "美国中央司令部（CENTCOM）确认，伊朗伊斯兰革命卫队（IRGC）向中东地区的美军发动了“突袭式”弹道导弹攻击，目标指向约旦。CENTCOM 声明所有来袭导弹均被成功拦截，未造成人员伤亡。约旦军方亦确认拦截了五枚伊朗导弹。 (Sources: CBS News, AP, Reuters)",
      verification: "confirmed",
      timestamp: "2026-07-29T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event-2",
      title: "美国与沙特联合空袭伊拉克境内伊朗代理人武装",
      description: "作为对伊朗导弹袭击及此前无人机攻击的回应，美国与沙特阿拉伯武装部队对伊拉克境内的伊朗支持的民兵组织（特别是“人民动员力量”，PMF）的后勤与武器站点发动了联合打击。PMF 方面称，袭击造成其至少20名成员死亡，32人受伤。 (Sources: CENTCOM, The Guardian, Al-Monitor)",
      verification: "confirmed",
      timestamp: "2026-07-29T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-3",
      title: "油价因中东战事重燃而大幅飙升",
      description: "由于美伊之间短暂的平静被打破，市场对原油供应中断的担忧重燃，推动油价大幅上涨。布伦特原油价格上涨约5%，回升至每桶88美元附近，WTI原油则接近83美元。 (Sources: Reuters, The Economic Times, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-07-29T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-4",
      title: "伊朗宣称在霍尔木兹海峡拦截三艘油轮",
      description: "伊朗革命卫队宣称，在霍尔木兹海峡对三艘“违规”并使用“不安全路线”的油轮进行了打击并使其停航。此举加剧了全球最重要石油运输通道的航运风险。 (Sources: The Guardian, BusinessWorld)",
      verification: "confirmed",
      timestamp: "2026-07-29T07:00:00Z",
      significance: ""
    },
    {
      id: "event-5",
      title: "伊朗拒绝阿曼提出的霍尔木兹海峡共管方案",
      description: "据路透社援引一名伊朗高级官员的话报道，伊朗已正式拒绝阿曼方面提出的关于对霍尔木兹海峡进行区域联合管理的提议，称该计划没有成功的机会。这关闭了一个潜在的外交降级途径。 (Sources: Reuters, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-07-29T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊在中东多战线直接交火，沙特公开介入，冲突烈度与广度显著扩大。",
      "经过短暂的战术性平静后，局势迅速重回升级轨道，且暴力等级超过前期。",
      "降级窗口期已关闭，冲突进入新一轮的报复与反报复循环，系统性风险急剧上升。"
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
        "变化：伊朗首次从本土对约旦境内的美军基地发动直接弹道导弹攻击。",
        "变化：美国与沙特首次进行公开的联合报复性空袭，打击伊拉克境内的伊朗代理人，造成数十人伤亡。",
        "延续：美军在该区域维持高度戒备状态，并成功拦截所有来袭导弹。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡对商业航运仍处于事实上的封锁或严重受限状态。",
        "变化：伊朗革命卫队宣称对三艘商业油轮采取了拦截行动，进一步恶化航运安全环境。",
        "变化：伊朗官方明确拒绝了阿曼提出的旨在恢复航道安全的外交调解方案。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：因军事冲突急剧升级，市场恐慌情绪重燃，布伦特原油价格大幅跳涨至88美元/桶附近。",
        "延续：对霍尔木兹海峡供应中断的担忧仍是影响油价的核心地缘政治溢价因素。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：过去几天的“战术性平静”被彻底打破，双方重回直接军事对抗。",
        "变化：伊朗通过直接打击美军基地和拒绝外交途径，释放了极为强硬的信号，不惜冒全面战争风险。",
        "变化：美国联合沙特进行报复，显示其旨在建立更广泛区域联盟以对抗伊朗的战略意图。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国寻求通过极限压力迫使伊朗在核问题与区域影响力上让步，而伊朗则试图通过打破区域安全现状来反制裁与孤立，双方核心诉求无法调和。",
      "区域国家（如沙特）日益公开地选边站队，加剧了冲突的阵营化，压缩了中立调解空间。"
    ],
    military: [
      "伊朗试图利用其非对称优势（弹道导弹、无人机、代理人网络）挑战美军的常规军事优势。",
      "美军面临在保护自身部队、维持航行自由与避免陷入大规模地面战争之间的艰难平衡。"
    ]
  },
  scoreTrend: [
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80,
      active: true
    }
  ],
  keyChange: "在短暂降级后，伊朗对美军基地的直接导弹攻击以及美国-沙特的联合报复，标志着冲突烈度与广度急剧回升，战争风险大幅反弹。",
  investmentSignal: "→ 风险急剧回升，建议立即增持能源与大宗商品多头头寸，同时增加对风险资产的对冲仓位。",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price July 29 2026",
    "US Iran tensions latest news July 29 2026",
    "Strait of Hormuz shipping status July 29 2026",
    "Iran nuclear talks update 2026",
    "US military deployment Middle East July 2026",
    "Iran official statements on US July 29 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-29",
  version: "v2.140",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D151",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑10",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $82–$83 · Brent $87–$88",
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
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "For the first time, Iran launched a direct ballistic missile attack against a U.S. base in a third country (Jordan), while the U.S. retaliated with joint strikes with Saudi Arabia on Iranian proxies in Iraq, significantly escalating the conflict's intensity.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping through the Strait of Hormuz remains effectively halted. The IRGC claimed new attacks on three tankers, exacerbating risks, while also formally rejecting a diplomatic solution aimed at restoring transit.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 2.5,
      weight: 0.2,
      description: "As military conflict sharply re-escalates in the Middle East, fears of supply disruption have intensified, causing a significant jump in oil prices. Brent crude rose approximately 5% to around $88/barrel, entering a significantly firming range.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. is not only directly engaged in military operations by intercepting Iranian missiles but also publicly conducted joint airstrikes with Saudi Arabia for the first time, targeting Iranian proxies in a third country (Iraq), signaling a deepening of military coalition actions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "Iran's direct attack on U.S. forces and its rejection of diplomatic proposals have completely closed the recent window for talks. The situation has reverted to a tit-for-tat escalatory cycle, with neither side showing willingness to engage in dialogue.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "event-1",
      title: "Iran launches ballistic missile attack on US base in Jordan, intercepted by US forces",
      description: "U.S. Central Command (CENTCOM) confirmed that Iran's Islamic Revolutionary Guard Corps (IRGC) launched a 'surprise' ballistic missile attack against U.S. forces in the Middle East, targeting a location in Jordan. CENTCOM stated all incoming missiles were successfully intercepted with no casualties. The Jordanian military also confirmed intercepting five Iranian missiles. (Sources: CBS News, AP, Reuters)",
      verification: "confirmed",
      timestamp: "2026-07-29T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "event-2",
      title: "US and Saudi Arabia conduct joint airstrikes on Iranian proxies in Iraq",
      description: "In response to the missile attack and prior drone attacks, U.S. and Saudi Arabian armed forces launched joint strikes against logistics and weapons sites of Iran-backed militias (notably the Popular Mobilization Forces, PMF) in Iraq. The PMF claimed the strikes killed at least 20 of its members and wounded 32. (Sources: CENTCOM, The Guardian, Al-Monitor)",
      verification: "confirmed",
      timestamp: "2026-07-29T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-3",
      title: "Oil prices spike as Middle East conflict reignites",
      description: "With the brief lull between the US and Iran shattered, market concerns over crude supply disruptions have resurfaced, pushing oil prices sharply higher. Brent crude jumped by about 5% to around $88 a barrel, while WTI crude neared $83. (Sources: Reuters, The Economic Times, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-07-29T08:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "event-4",
      title: "Iran claims to have interdicted three oil tankers in Strait of Hormuz",
      description: "Iran's Revolutionary Guards claimed to have struck and halted three 'violating' oil tankers sailing an 'unsafe and illegal' route in the Strait of Hormuz. This action escalates the shipping risks in the world's most critical oil chokepoint. (Sources: The Guardian, BusinessWorld)",
      verification: "confirmed",
      timestamp: "2026-07-29T07:00:00Z",
      significance: ""
    },
    {
      id: "event-5",
      title: "Iran rejects Omani proposal for joint management of Strait of Hormuz",
      description: "According to a senior Iranian official cited by Reuters, Iran has formally rejected a proposal from Oman for joint regional management of the Strait of Hormuz, stating the plan had no chance of success. This closes a potential diplomatic off-ramp. (Sources: Reuters, The Hindu)",
      verification: "confirmed",
      timestamp: "2026-07-29T10:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US and Iran are in direct conflict across multiple fronts in the Middle East, with Saudi Arabia openly intervening, significantly expanding the conflict's intensity and scope.",
      "After a brief tactical pause, the situation has rapidly returned to an escalatory track, with a higher level of violence than before.",
      "The window for de-escalation is now closed, with the conflict entering a new cycle of retaliation and counter-retaliation, leading to a sharp increase in systemic risk."
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
        "Change: Iran launched its first direct ballistic missile attack from its own territory against a U.S. base in Jordan.",
        "Change: The U.S. and Saudi Arabia conducted their first publicly declared joint retaliatory airstrikes, targeting Iranian proxies in Iraq and causing dozens of…",
        "Continue: U.S. forces in the region maintain a high state of readiness and successfully intercepted all incoming missiles."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The Strait of Hormuz remains under a de facto blockade or severe restriction for commercial shipping.",
        "Change: The IRGC claimed to have taken action against three commercial oil tankers, further deteriorating the maritime security environment.",
        "Change: Iranian officials explicitly rejected a diplomatic mediation proposal from Oman aimed at restoring safe passage."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Due to the sharp military escalation, market panic has resurfaced, causing Brent crude prices to jump to around $88/barrel.",
        "Continue: Concerns over a supply disruption from the Strait of Hormuz remain the core geopolitical risk premium factor affecting oil prices."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: The 'tactical pause' of the last few days has been definitively broken, with both sides returning to direct military confrontation.",
        "Change: By directly striking U.S. bases and rejecting diplomatic channels, Iran has sent an extremely hardline signal, willing to risk a full-scale war.",
        "Change: The U.S. retaliation in concert with Saudi Arabia shows its strategic intent to build a broader regional coalition to counter Iran."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. seeks to compel Iranian concessions on its nuclear program and regional influence through maximum pressure, while Iran aims to counter sanctions and isolation by disrupting regional security, creating irreconcilable core demands.",
      "Regional powers like Saudi Arabia are increasingly and openly taking sides, exacerbating bloc confrontation and shrinking the space for neutral mediation."
    ],
    military: [
      "Iran is attempting to leverage its asymmetric advantages (ballistic missiles, drones, proxy network) to challenge the conventional military superiority of the U.S.",
      "The U.S. military faces a difficult balance between protecting its forces, maintaining freedom of navigation, and avoiding being drawn into a large-scale ground war."
    ]
  },
  scoreTrend: [
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84
    },
    {
      date: "07-28",
      score: 70
    },
    {
      date: "07-29",
      score: 80,
      active: true
    }
  ],
  keyChange: "After a brief de-escalation, Iran's direct missile attack on a U.S. base and the joint U.S.-Saudi retaliation mark a sharp resurgence in the conflict's intensity and scope, causing a significant rebound in war risk.",
  investmentSignal: "→ With risk sharply rebounding, recommend immediately increasing long positions in energy and commodities, while adding hedges for risk assets.",
  prevRiskScore: 70,
  webSources: [],
  webSearchQueries: [
    "WTI Brent oil price July 29 2026",
    "US Iran tensions latest news July 29 2026",
    "Strait of Hormuz shipping status July 29 2026",
    "Iran nuclear talks update 2026",
    "US military deployment Middle East July 2026",
    "Iran official statements on US July 29 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.140 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑10）：在短暂降级后，伊朗对美军基地的直接导弹攻击以及美国-沙特的联合报复，标志着冲突烈度与广度急剧回升，战争风险大幅反弹。",
    bannerWarning: "→ 风险急剧回升，建议立即增持能源与大宗商品多头头寸，同时增加对风险资产的对冲仓位。",
    deescalationIntent: "美国寻求通过极限压力迫使伊朗在核问题与区域影响力上让步，而伊朗则试图通过打破区域安全现状来反制裁与孤立，双方核心诉求无法调和。",
    structuralRisk: "霍尔木兹海峡的商业航运仍然基本停滞。伊朗革命卫队声称再次袭击了三艘油轮，加剧了航运风险，并正式拒绝了旨在恢复航运的外交解决方案。",
    contradictionNote: "美国寻求通过极限压力迫使伊朗在核问题与区域影响力上让步，而伊朗则试图通过打破区域安全现状来反制裁与孤立，双方核心诉求无法调和。；伊朗试图利用其非对称优势（弹道导弹、无人机、代理人网络）挑战美军的常规军事优势。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第151天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.140 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑10): After a brief de-escalation, Iran's direct missile attack on a U.S. base and the joint U.S.-Saudi retaliation mark a sharp resurgence in th…",
    bannerWarning: "→ With risk sharply rebounding, recommend immediately increasing long positions in energy and commodities, while adding…",
    deescalationIntent: "The U.S. seeks to compel Iranian concessions on its nuclear program and regiona…",
    structuralRisk: "Commercial shipping through the Strait of Hormuz remains effectively halted. The IRGC claimed new a…",
    contradictionNote: "The U.S. seeks to compel Iranian concessions on its nuclear program and regional influence through maximum pressure, while Iran aims to counter sanctions and i…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 151",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
