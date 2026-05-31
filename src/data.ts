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
  date: "2026-05-31",
  version: "v2.81",
  keyStats: [
    {
      label: "冲突天数",
      value: "D92",
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
      value: "WTI $87–$88 · Brent $91–$92",
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
  riskScore: 64,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军继续执行对伊朗港口的封锁，并通过有限军事行动（向违规船只发射导弹以使其失效）来阻止船只闯入，这表明低烈度的对抗仍在持续，但没有迹象表明冲突正在扩大到新的战线或强度升级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "尽管有外交谈判，但霍尔木兹海峡的实际通行状况没有改善。美英两国海事机构最新发布的联合航行警告确认，该地区的军事行动仍在继续，风险等级维持在“危急”，商业航运流量依然处于被抑制的极低水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "由于市场对美伊达成延长停火协议的预期升温，对霍尔木兹海峡可能重新开放的乐观情绪导致油价承压，结束了数周的上涨趋势。目前价格稳定在85-100美元区间，反映了供应担忧有所缓解但基本面风险依然存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国军事力量继续在该地区直接执行作战任务，包括维持对伊朗港口的海上封锁、进行空中巡逻以及部署大量军事资产。这构成了直接且持续的军事部署和行动参与，符合高级别介入的标准。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊之间出现了自冲突爆发以来最明确的降级信号。尽管尚未得到双方最高领导层的最终确认和公开宣布，但有关延长停火60天并重启谈判的初步协议已被多家可靠信源报道，代表了实质性的外交进展。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e1",
      title: "美伊就延长停火60天和重启核谈判达成“初步协议”，但待总统批准且伊朗未确认",
      description: "多家媒体援引美国官员消息称，美伊谈判代表已就延长停火和开启新一轮核谈判达成初步谅解备忘录。协议内容包括伊朗清除霍尔木兹海峡水雷、美国逐步解除对其港口的封锁。然而，该协议需美国总统最终批准，且伊朗方面尚未正式确认，并有官员表示障碍依然存在。 (Associated Press, Reuters)",
      verification: "confirmed",
      timestamp: "2026-05-30T14:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e2",
      title: "美军在中东维持“存在与警惕”姿态，并拦截一艘试图突破封锁的商船",
      description: "美国中央司令部（CENTCOM）表示，其部队在中东地区保持“存在与警惕”，并发布了F-16巡逻照片。此外，CENTCOM在5月30日宣布，美军向一艘试图突破对伊朗港口封锁的商船“Lian Star”号的机舱发射导弹，使其停航。此举显示封锁仍在严格执行。 (Associated Press, CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-05-30T18:30:00Z",
      significance: ""
    },
    {
      id: "e3",
      title: "油价因停火协议预期而承压，布伦特与WTI原油价格徘徊在六周低点",
      description: "由于市场对美伊可能达成延长停火协议并重开霍尔木兹海峡抱有希望，国际油价在过去一周显著下跌。截至5月29日收盘，布伦特原油期货价格徘徊在91-92美元/桶区间，WTI原油期货则在87-88美元/桶区间，均为数周以来低位。 (Reuters, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-05-31T00:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e4",
      title: "美英联合发布航行警告，称霍尔木兹海峡北部军事行动仍在继续",
      description: "美国海军中央司令部（USNAVCENT）与英国海事贸易行动办公室（UKMTO）于5月29日发布联合海事信息咨询，警告霍尔木兹海峡北部靠近穆桑代姆半岛的区域将持续进行军事行动，该水道的安全威胁等级维持在“危急”（CRITICAL）。 (UKMTO, USNAVCENT)",
      verification: "confirmed",
      timestamp: "2026-05-29T20:00:00Z",
      significance: ""
    },
    {
      id: "e5",
      title: "伊朗外交部称目前未就核问题进行谈判，专注于结束战争",
      description: "针对美国方面有关新一轮核谈判的说法，伊朗外交部发言人表示，在当前阶段，伊朗专注于结束战争，并未就核问题进行谈判。这与美国官员透露的初步协议内容存在温差，凸显了协议最终达成的复杂性。 (CBS News, Fars News Agency)",
      verification: "confirmed",
      timestamp: "2026-05-30T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方据报已达成初步停火延长协议，为冲突降级创造了重要机遇，标志着纯军事对抗阶段可能出现转折。",
      "协议的最终生效面临不确定性，需要美国总统批准且伊朗国内存在不同声音，显示出停火基础的脆弱性。",
      "与此同时，低烈度的军事摩擦（如执行封锁）仍在发生，表明即便外交取得进展，现场的军事对峙态势也并未完全解除。"
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
        "延续：美国继续对伊朗港口实施海上封锁，并对试图闯关的船只采取了有限的军事拦截行动。",
        "延续：美国中央司令部重申其部队在该地区的戒备状态，显示威慑姿态未变。",
        "变化：无重大交火或冲突升级事件报告，整体军事态势在初步停火协议背景下趋于稳定。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：官方航行警告（JMIC/UKMTO）维持对霍尔木兹海峡的“危急”风险评级。",
        "延续：商业航运通过海峡的流量仍处于极低水平，大多数航运公司仍在规避该区域。",
        "变化：市场对海峡未来可能重新开放的预期增强，但这是基于尚未确认的协议，而非实际通行状况的改善。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：对美伊达成协议的乐观情绪导致原油价格地缘政治溢价收缩，WTI和布伦特价格均跌至六周低点。",
        "延续：尽管价格回落，但由于海峡尚未实际开放，全球石油供应链的结构性风险依然存在。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方匿名官员向媒体释放了达成初步协议的积极信号，为局势降温。",
        "变化：伊朗官方公开表态则更为谨慎，否认正在进行核谈判，并强调协议尚未最终敲定，显示出内外立场差异。",
        "延续：美国总统尚未就初步协议做出最终决定，其个人意愿成为影响局势走向的关键变量。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国希望通过“极限压力+外交窗口”迫使伊朗在核问题和地区行为上做出永久性让步。",
      "伊朗则寻求在不放弃核心国家利益的前提下，通过谈判解除制裁并结束军事对抗，同时对美方承诺持怀疑态度。"
    ],
    military: [
      "美国试图通过维持海上封锁和军事存在来保持对伊朗的压力，作为谈判筹码。",
      "伊朗则利用其对霍尔木兹海峡的控制能力作为反制筹码，并维持代理人网络以保留区域影响力。"
    ]
  },
  scoreTrend: [
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64,
      active: true
    }
  ],
  keyChange: "风险评分维持不变，反映了积极的外交谈判进展与持续的军事封锁和航运风险之间的对冲。市场已部分消化降级预期，但协议最终落地前，局势仍处于脆弱平衡状态。",
  investmentSignal: "→ 维持对风险资产的防御性对冲，地缘溢价虽因谈判预期回落但协议尚未落地，不确定性仍高。",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: [
    "US Iran news May 30-31 2026",
    "Iran nuclear deal talks May 2026 latest",
    "Strait of Hormuz maritime security update May 2026",
    "CENTCOM operations Middle East May 30-31 2026",
    "WTI Brent crude oil price May 31 2026 Reuters",
    "Oil market analysis May 31 2026 Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-31",
  version: "v2.81",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D92",
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
      value: "WTI $87–$88 · Brent $91–$92",
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
  riskScore: 64,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The U.S. military continues to enforce a blockade on Iranian ports, using limited military action (disabling a vessel with a missile) to prevent breaches, indicating that low-intensity confrontation persists without signs of escalation to new fronts or higher intensity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Despite diplomatic talks, the actual transit situation in the Strait of Hormuz has not improved. The latest joint maritime advisory from the U.S. and U.K. confirms that military operations in the area are ongoing, the risk level remains 'CRITICAL', and commercial shipping traffic is still at an extremely suppressed low level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Optimism about a potential reopening of the Strait of Hormuz, driven by expectations of a U.S.-Iran ceasefire extension, has pressured oil prices and ended weeks of gains. Current prices have stabilized within the $85-100 band, reflecting eased supply concerns but persistent underlying risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. military forces continue to be directly involved in operational missions in the region, including maintaining the naval blockade of Iranian ports, conducting air patrols, and deploying significant military assets. This constitutes direct and sustained military deployment and operational involvement, meeting the criteria for high-level engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The most significant de-escalation signals since the conflict began have emerged. Although not yet finalized or publicly announced by top leadership on both sides, a tentative agreement to extend the ceasefire by 60 days and restart negotiations has been reported by multiple credible sources, representing substantive diplomatic progress.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "e1",
      title: "US & Iran reach 'tentative agreement' on 60-day ceasefire extension and new nuclear talks, pending presidential approval and unconfirmed by Iran",
      description: "Multiple media outlets, citing U.S. officials, reported that U.S. and Iranian negotiators have reached a preliminary memorandum of understanding to extend the ceasefire and begin a new round of nuclear talks. The deal reportedly includes Iran clearing mines from the Strait of Hormuz and the U.S. gradually lifting its port blockade. However, the deal requires final approval from the U.S. President and has not been officially confirmed by Iran, with some Iranian officials stating obstacles remain. (Associated Press, Reuters)",
      verification: "confirmed",
      timestamp: "2026-05-30T14:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e2",
      title: "US military maintains 'presence and vigilance' in Middle East, intercepts vessel attempting to breach blockade",
      description: "U.S. Central Command (CENTCOM) stated its forces remain 'present and vigilant' in the Middle East, releasing photos of an F-16 on patrol. Additionally, on May 30, CENTCOM announced that the U.S. military fired a missile into the engine room of the merchant vessel 'Lian Star' to disable it as it attempted to breach the blockade of Iranian ports, showing strict enforcement continues. (Associated Press, CENTCOM)",
      verification: "confirmed",
      timestamp: "2026-05-30T18:30:00Z",
      significance: ""
    },
    {
      id: "e3",
      title: "Oil prices under pressure on ceasefire deal hopes, with Brent and WTI hovering at six-week lows",
      description: "International oil prices have fallen significantly over the past week due to market optimism about a potential U.S.-Iran ceasefire extension and a reopening of the Strait of Hormuz. As of the May 29 close, Brent crude futures were trading in the $91-92/bbl range, while WTI futures were in the $87-88/bbl range, both at multi-week lows. (Reuters, Trading Economics)",
      verification: "confirmed",
      timestamp: "2026-05-31T00:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "e4",
      title: "US and UK issue joint maritime advisory, stating military operations continue in northern Strait of Hormuz",
      description: "USNAVCENT and the UKMTO issued a joint maritime information advisory on May 29, warning of ongoing military operations in the area north of the Musandam Peninsula in the Strait of Hormuz. The security threat level for the waterway remains 'CRITICAL'. (UKMTO, USNAVCENT)",
      verification: "confirmed",
      timestamp: "2026-05-29T20:00:00Z",
      significance: ""
    },
    {
      id: "e5",
      title: "Iranian Foreign Ministry states no negotiations on nuclear issue currently, focus is on ending the war",
      description: "In response to U.S. statements about a new round of nuclear talks, an Iranian Foreign Ministry spokesman stated that at the current stage, Tehran is focused on ending the war and is not engaged in negotiations on the nuclear issue. This contrasts with the contents of the tentative deal revealed by U.S. officials, highlighting the complexity of reaching a final agreement. (CBS News, Fars News Agency)",
      verification: "confirmed",
      timestamp: "2026-05-30T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The reported preliminary agreement on a ceasefire extension creates a significant opportunity for de-escalation, marking a potential turning point from a purely military confrontation phase.",
      "The finalization of the agreement faces uncertainty, requiring U.S. presidential approval and navigating differing voices within Iran, highlighting the fragility of the ceasefire's foundation.",
      "Meanwhile, low-intensity military friction (like blockade enforcement) continues, indicating that the on-the-ground military standoff has not been fully resolved despite diplomatic progress."
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
        "Continue: The U.S. maintains its naval blockade on Iranian ports and has taken limited military action to intercept vessels attempting to breach it.",
        "Continue: U.S. CENTCOM has reaffirmed the alert status of its forces in the region, showing its deterrent posture is unchanged.",
        "Change: No major clashes or escalatory incidents have been reported; the overall military situation is stabilizing amidst the backdrop of the preliminary cease…"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Official maritime advisories (JMIC/UKMTO) maintain a 'CRITICAL' risk rating for the Strait of Hormuz.",
        "Continue: Commercial shipping traffic through the strait remains at extremely low levels, with most companies still avoiding the area.",
        "Change: Market expectations for a potential future reopening of the strait have increased, but this is based on an unconfirmed deal, not on any actual improvem…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Optimism over a U.S.-Iran deal has led to a contraction of the geopolitical risk premium in crude oil prices, with WTI and Brent falling to six-week lo…",
        "Continue: Despite the price drop, structural risks to the global oil supply chain persist as the strait has not actually reopened."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Anonymous U.S. officials have leaked positive signals about a preliminary deal to the media, cooling tensions.",
        "Change: Iran's official public statements have been more cautious, denying nuclear talks are underway and stressing the deal is not finalized, revealing a gap …",
        "Continue: The U.S. President has not yet made a final decision on the preliminary agreement, making his personal stance a key variable influencing the situatio…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to use a 'maximum pressure + diplomatic window' strategy to compel Iran into permanent concessions on its nuclear program and regional behavior.",
      "Iran seeks to lift sanctions and end military confrontation through negotiation without surrendering core national interests, while remaining skeptical of U.S. commitments."
    ],
    military: [
      "The U.S. seeks to maintain pressure on Iran through its naval blockade and military presence, using it as leverage in negotiations.",
      "Iran leverages its control over the Strait of Hormuz as a counter-measure and maintains its proxy network to preserve regional influence."
    ]
  },
  scoreTrend: [
    {
      date: "05-27",
      score: 48
    },
    {
      date: "05-28",
      score: 72
    },
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64,
      active: true
    }
  ],
  keyChange: "The risk score remains stable, reflecting a balance between positive diplomatic progress and ongoing military blockade and shipping risks. The market has partially priced in de-escalation hopes, but the situation remains in a fragile equilibrium until the agreement is finalized.",
  investmentSignal: "→ Maintain defensive hedges on risk assets; while the geopolitical premium has fallen on negotiation expectations, the deal is not finalized, and uncertainty remains high.",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: [
    "US Iran news May 30-31 2026",
    "Iran nuclear deal talks May 2026 latest",
    "Strait of Hormuz maritime security update May 2026",
    "CENTCOM operations Middle East May 30-31 2026",
    "WTI Brent crude oil price May 31 2026 Reuters",
    "Oil market analysis May 31 2026 Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月31日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.81 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：风险评分维持不变，反映了积极的外交谈判进展与持续的军事封锁和航运风险之间的对冲。市场已部分消化降级预期，但协议最终落地前，局势仍处于脆弱平衡状态。",
    bannerWarning: "→ 维持对风险资产的防御性对冲，地缘溢价虽因谈判预期回落但协议尚未落地，不确定性仍高。",
    deescalationIntent: "美国希望通过“极限压力+外交窗口”迫使伊朗在核问题和地区行为上做出永久性让步。",
    structuralRisk: "尽管有外交谈判，但霍尔木兹海峡的实际通行状况没有改善。美英两国海事机构最新发布的联合航行警告确认，该地区的军事行动仍在继续，风险等级维持在“危急”，商业航运流量依然处于被抑制的极低水平。",
    contradictionNote: "美国希望通过“极限压力+外交窗口”迫使伊朗在核问题和地区行为上做出永久性让步。；美国试图通过维持海上封锁和军事存在来保持对伊朗的压力，作为谈判筹码。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第92天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 31 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.81 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): The risk score remains stable, reflecting a balance between positive diplomatic progress and ongoing military blockade and shipping risks. …",
    bannerWarning: "→ Maintain defensive hedges on risk assets; while the geopolitical premium has fallen on negotiation expectations, the …",
    deescalationIntent: "The U.S. aims to use a 'maximum pressure + diplomatic window' strategy to compe…",
    structuralRisk: "Despite diplomatic talks, the actual transit situation in the Strait of Hormuz has not improved. Th…",
    contradictionNote: "The U.S. aims to use a 'maximum pressure + diplomatic window' strategy to compel Iran into permanent concessions on its nuclear program and regional behavior.;…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 92",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
