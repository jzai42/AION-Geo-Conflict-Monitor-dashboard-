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
  date: "2026-09-09",
  version: "v2.183",
  keyStats: [
    {
      label: "冲突天数",
      value: "D193",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $94–$95 · Brent $99–$101",
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
  riskScore: 84,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊双方正在进行直接、多域的军事交火，包括摧毁对方国家主权资产（油轮）和使用弹道导弹攻击对方军事基地，符合重大军事行动标准。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通行量维持在个位数，远低于正常水平的50%，主要航运公司已暂停通行，构成严重受限。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油价格已突破100美元，WTI逼近95美元，价格区间进入危机带，由供应中断恐慌驱动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国直接参与针对伊朗国家资产的军事打击行动，并遭受伊朗直接的弹道导弹攻击，构成直接军事部署与作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "双方陷入公开的军事报复循环，外交渠道停滞，立场极其强硬，谈判破裂风险极高。",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "e1",
      title: "美国摧毁五艘伊朗油轮，作为对伊朗袭击美军舰的回应",
      description: "美国中央司令部（CENTCOM）于9月8日晚间证实，其部队摧毁了五艘伊朗伊斯兰革命卫队（IRGC）的油轮。此次行动是对伊朗近期使用弹道导弹两次未遂袭击一艘美国军舰的直接报复。此举标志着双方直接军事对抗的显著升级。",
      verification: "confirmed",
      timestamp: "2026-09-09T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "e2",
      title: "伊朗发射弹道导弹袭击约旦境内美军基地作为报复",
      description: "作为对美国击沉其油轮的报复，伊朗伊斯兰革命卫队（IRGC）向约旦境内托管美军的穆瓦法克·萨尔提空军基地发射了约20枚弹道导弹。约旦军方表示成功拦截了其中18枚，其余落在无人区，未造成美方人员伤亡。美国官员称此次袭击“无效”。",
      verification: "confirmed",
      timestamp: "2026-09-09T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e3",
      title: "布伦特原油价格六周来首次突破100美元/桶",
      description: "由于美伊在霍尔木兹海峡周边的军事行动急剧升级，市场对原油供应中断的担忧加剧，国际基准布伦特原油价格自7月下旬以来首次突破100美元/桶的心理关口。WTI原油也逼近95美元/桶。",
      verification: "confirmed",
      timestamp: "2026-09-09T07:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e4",
      title: "霍尔木兹海峡航运量持续低迷，伊朗威胁扩大袭击范围",
      description: "根据路透社援引的航运数据显示，9月8日仅有6艘商船通过霍尔木兹海峡，远低于冲突前约85艘的日均水平，航道实际上处于中断状态。同时，伊朗警告在科威特和巴林港口附近的所有油轮船员立即离船，暗示可能将其作为目标。",
      verification: "confirmed",
      timestamp: "2026-09-09T05:00:00Z",
      significance: ""
    },
    {
      id: "e5",
      title: "美国否认伊朗关于击中其军舰的说法",
      description: "针对伊朗伊斯兰革命卫队声称其袭击并“重创”了两艘美国军舰的说法，美国中央司令部（CENTCOM）在社交媒体上公开予以否认，称该说法“完全错误”，没有美国海军军舰被击中。",
      verification: "confirmed",
      timestamp: "2026-09-09T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方的直接军事打击行动已经常态化并进入报复升级循环，冲突地域从海上扩大至第三方国家（约旦）。",
      "此前旨在降级的《伊斯兰堡备忘录》已完全失效，双方均无意愿返回谈判桌，而是通过武力展示决心。",
      "局势已从受控冲突完全转变为公开、直接的军事对抗。尽管攻击具有“报复性”而非“全面入侵”，但误判风险极高，任何一方的重大战术成功或失败都可能导致冲突烈度失控。"
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
        "变化：美军主动摧毁伊朗5艘油轮，标志着打击目标从军事设施扩展至经济命脉资产。",
        "变化：伊朗首次使用弹道导弹对约旦境内的美军基地进行报复性打击，显示其打击范围和意愿都在扩大。",
        "延续：双方在霍尔木兹海峡地区的军事对峙持续，但直接交火频率和烈度显著上升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡的商业航运交通量依然极端低下，接近于事实上的关闭状态。",
        "变化：伊朗公开警告在科威特和巴林港口停靠的油轮，将威胁范围从海峡内部扩大到周边的海湾合作委员会国家港口。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油价格突破100美元/桶的关键心理价位，市场已将严重的供应中断风险计入价格。",
        "延续：能源价格波动性持续高企，完全由地缘政治冲突主导。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：双方完全通过军事行动和强硬声明进行沟通，未见任何寻求外交途径降温的官方表态。",
        "延续：美国中央司令部与伊朗国家媒体成为信息战的主要平台，双方就战果发布相互矛盾的声明。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国旨在通过军事压力彻底遏制伊朗的地区影响力并迫使其在核问题上让步，而伊朗则力图通过强硬反击打破封锁并确立其在海湾地区的主导地位。",
      "双方均缺乏有效的国内政治空间来寻求妥协，导致强硬政策成为唯一选择。"
    ],
    military: [
      "美国寻求利用其技术和海空优势进行精确打击以最小化己方伤亡，而伊朗则利用其非对称能力（导弹、无人机、代理人网络）试图对美方及其盟友造成不可接受的损失。",
      "冲突从代理人战争和有限摩擦升级为直接的国家间军事对抗，增加了误判和失控扩大的风险。"
    ]
  },
  scoreTrend: [
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84,
      active: true
    }
  ],
  keyChange: "美伊陷入直接的军事报复循环，美国摧毁伊朗油轮，伊朗则以弹道导弹攻击美军基地作为回应，推动油价突破100美元，冲突进入新的危险阶段。",
  investmentSignal: "→ 增持能源与大宗商品多头头寸，同时通过VIX或黄金等工具对冲整体风险资产的下行风险。",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status September 9 2026",
    "Iran military activity September 2026",
    "US military deployment Middle East September 2026",
    "WTI Brent oil price September 9 2026 Reuters",
    "Brent crude price range Bloomberg September 9 2026",
    "US Iran diplomatic talks September 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-09",
  version: "v2.183",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D193",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $94–$95 · Brent $99–$101",
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
  riskScore: 84,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The U.S. and Iran are engaged in direct, multi-domain military exchanges, including destruction of the other's sovereign state assets (oil tankers) and using ballistic missiles to attack military bases, meeting the criteria for major military action.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait transit volume remains in the single digits, far below the 50% threshold of normal traffic. Major shipping lines have suspended passage, constituting a severe restriction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude has breached $100 and WTI is approaching $95, pushing the price range into the crisis band, driven by fears of supply disruption.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The U.S. is directly participating in military strikes against Iranian state assets and is being directly targeted by Iranian ballistic missiles, constituting direct military deployment and combat operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Both sides are locked in a public cycle of military retaliation. Diplomatic channels are stalled, stances are extremely hawkish, and the risk of negotiation collapse is very high.",
      status: "FAST",
      sourceVerification: "confirmed",
      change: "up"
    }
  ],
  events: [
    {
      id: "e1",
      title: "U.S. destroys five Iranian oil tankers in response to attacks on Navy warship",
      description: "U.S. Central Command (CENTCOM) confirmed on the evening of Sep 8 that its forces destroyed five oil tankers belonging to Iran's Islamic Revolutionary Guard Corps (IRGC). The action was a direct retaliation for two recent unsuccessful ballistic missile attacks by Iran on a U.S. warship, marking a significant escalation in direct military confrontation.",
      verification: "confirmed",
      timestamp: "2026-09-09T03:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "e2",
      title: "Iran retaliates with ballistic missile strike on U.S. base in Jordan",
      description: "In retaliation for the U.S. sinking of its oil tankers, Iran's IRGC launched approximately 20 ballistic missiles at the Muwaffaq Salti Air Base in Jordan, which hosts U.S. forces. The Jordanian military stated it successfully intercepted 18 missiles, with the remainder landing in unpopulated areas, causing no U.S. casualties. U.S. officials described the attack as 'ineffective'.",
      verification: "confirmed",
      timestamp: "2026-09-09T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e3",
      title: "Brent crude oil price surpasses $100/barrel for the first time in six weeks",
      description: "Driven by heightened fears of supply disruption amid the sharp escalation of military actions between the U.S. and Iran around the Strait of Hormuz, the international benchmark Brent crude price breached the psychological $100 per barrel mark for the first time since late July. WTI crude also neared $95 per barrel.",
      verification: "confirmed",
      timestamp: "2026-09-09T07:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e4",
      title: "Hormuz shipping traffic remains minimal as Iran threatens to expand attacks",
      description: "According to shipping data cited by Reuters, only 6 commercial vessels transited the Strait of Hormuz on Sep 8, far below the pre-conflict daily average of ~85, indicating the waterway is effectively shut down. Concurrently, Iran warned all tanker crews near Kuwaiti and Bahraini ports to immediately abandon their vessels, suggesting they could be targeted.",
      verification: "confirmed",
      timestamp: "2026-09-09T05:00:00Z",
      significance: ""
    },
    {
      id: "e5",
      title: "U.S. denies Iranian claims of hitting its warships",
      description: "In response to claims by Iran's IRGC that it had attacked and 'inflicted heavy damage' on two U.S. warships, U.S. Central Command (CENTCOM) publicly refuted the statement on social media, calling it 'completely FALSE' and asserting that no U.S. Navy warship was struck.",
      verification: "confirmed",
      timestamp: "2026-09-09T09:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Direct military strikes between the U.S. and Iran have become normalized and entered a retaliatory cycle, with the conflict's geography expanding from sea to third-party nations (Jordan).",
      "The previous 'Islamabad Memorandum' aimed at de-escalation is now completely defunct, with neither side showing willingness to return to negotiations, instead demonstrating resolve through force.",
      "The situation has fully transitioned from a controlled conflict to an open, direct military confrontation. Although attacks are 'retaliatory' rather than a 'full-scale invasion,' the risk of miscalculation is extremely high, and any major tactical success or failure by either side could lead to an uncontrolled escalation."
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
        "Change: The U.S. proactively destroyed 5 Iranian oil tankers, expanding its targeting from military facilities to economic lifeline assets.",
        "Change: Iran used ballistic missiles for the first time to conduct a retaliatory strike against a U.S. base in Jordan, showing an expansion in both strike rang…",
        "Continue: Military standoff in the Strait of Hormuz region persists, but the frequency and intensity of direct fire have significantly increased."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels, nearing a de facto closure.",
        "Change: Iran issued a public warning to tankers docked in Kuwaiti and Bahraini ports, expanding its threat envelope from within the strait to neighboring GCC s…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude broke the key psychological level of $100/barrel, indicating the market has priced in a significant risk of supply disruption.",
        "Continue: Energy price volatility remains high and is entirely driven by the geopolitical conflict."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Both sides are communicating exclusively through military actions and hardline statements, with no official indications of seeking diplomatic off-ram…",
        "Continue: U.S. CENTCOM and Iranian state media serve as primary platforms for information warfare, releasing conflicting statements on battle damage assessment…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to use military pressure to completely contain Iran's regional influence and force concessions on its nuclear program, while Iran seeks to break the blockade through forceful counter-attacks and establish its dominance in the Gulf.",
      "Both sides lack effective domestic political space to seek compromise, making hawkish policies the only viable option."
    ],
    military: [
      "The U.S. seeks to leverage its technological and air/sea superiority for precision strikes to minimize its own casualties, whereas Iran utilizes its asymmetric capabilities (missiles, drones, proxy networks) to attempt to inflict unacceptable costs on the U.S. and its allies.",
      "The conflict has escalated from a proxy war and limited skirmishes to direct state-on-state military confrontation, increasing the risk of miscalculation and uncontrolled expansion."
    ]
  },
  scoreTrend: [
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84,
      active: true
    }
  ],
  keyChange: "The U.S. and Iran are caught in a direct military retaliatory cycle, with the U.S. destroying Iranian tankers and Iran responding with a ballistic missile attack on a U.S. base, pushing oil past $100 and entering a new, dangerous phase of conflict.",
  investmentSignal: "→ Increase long positions in energy and commodities, while hedging downside risk in broad risk assets via instruments like the VIX or gold.",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: [
    "US Iran tensions last 24 hours",
    "Strait of Hormuz shipping status September 9 2026",
    "Iran military activity September 2026",
    "US military deployment Middle East September 2026",
    "WTI Brent oil price September 9 2026 Reuters",
    "Brent crude price range Bloomberg September 9 2026",
    "US Iran diplomatic talks September 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.183 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（↑2）：美伊陷入直接的军事报复循环，美国摧毁伊朗油轮，伊朗则以弹道导弹攻击美军基地作为回应，推动油价突破100美元，冲突进入新的危险阶段。",
    bannerWarning: "→ 增持能源与大宗商品多头头寸，同时通过VIX或黄金等工具对冲整体风险资产的下行风险。",
    deescalationIntent: "美国旨在通过军事压力彻底遏制伊朗的地区影响力并迫使其在核问题上让步，而伊朗则力图通过强硬反击打破封锁并确立其在海湾地区的主导地位。",
    structuralRisk: "海峡通行量维持在个位数，远低于正常水平的50%，主要航运公司已暂停通行，构成严重受限。",
    contradictionNote: "美国旨在通过军事压力彻底遏制伊朗的地区影响力并迫使其在核问题上让步，而伊朗则力图通过强硬反击打破封锁并确立其在海湾地区的主导地位。；美国寻求利用其技术和海空优势进行精确打击以最小化己方伤亡，而伊朗则利用其非对称能力（导弹、无人机、代理人网络）试图对美方及其盟友造成不可接受的损失。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第193天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.183 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (↑2): The U.S. and Iran are caught in a direct military retaliatory cycle, with the U.S. destroying Iranian tankers and Iran responding with a ba…",
    bannerWarning: "→ Increase long positions in energy and commodities, while hedging downside risk in broad risk assets via instruments l…",
    deescalationIntent: "The U.S. aims to use military pressure to completely contain Iran's regional in…",
    structuralRisk: "Strait transit volume remains in the single digits, far below the 50% threshold of normal traffic. …",
    contradictionNote: "The U.S. aims to use military pressure to completely contain Iran's regional influence and force concessions on its nuclear program, while Iran seeks to break …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 193",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
