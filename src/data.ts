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
  date: "2026-05-16",
  version: "v2.66",
  keyStats: [
    {
      label: "冲突天数",
      value: "D77",
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
      value: "WTI $102.4–$106.0 · Brent $106.8–$111.4",
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
      prev: 4,
      weight: 0.2,
      description: "美以联手启动 Operation Epic Fury（史诗愤怒行动）预备方案，打击迫在眉睫。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业通航连续 77 天中断，海峡流量仅为常态 4%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价高位运行，全球库存以非大流行时期最快速度下降。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中美首脑峰会未能就实质性去风险达成协议，美军维持封锁部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道依然存在但陷入“聋子对话”，美方拒绝对话提议。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美以联手启动 Operation Epic Fury 打击预备",
      description: "《纽约时报》报道称，美以特种部队正进行针对伊朗加固设施的实弹演练。",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "特朗普驳回伊朗最新外交让步提议",
      description: "特朗普在空军一号上明确表示不会接受伊朗提出的保留部分海峡控制权的提议。",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI 原油周涨幅录得 11% 突破 $105",
      description: "因霍尔木兹海峡封锁风险固化，市场预计供应缺口将持续至年底。",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美以打击准备进入临界状态",
      "伊朗长期封锁意愿明确化",
      "全球能源链进入战时替代模式"
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
        "变化：美以联手进行自4月停火以来最密集打击准备。",
        "延续：伊朗恢复海峡沿岸导弹阵地部署，加固受损地下设施。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行量维持在常态 4% 极低位，实质性商业关闭。",
        "延续：战争险溢价维持在正常水平 8 倍，主要班轮公司继续绕行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：WTI 周涨幅达 11% 触及 106 美元。",
        "延续：IEA 指出全球库存加速下降，供应弹性归零。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普驳回外交提议并威胁 24 小时内决定军事干预。",
        "延续：中方强调航行自由但拒绝直接军事介入海峡清理。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方追求伊朗核能彻底拆除与海峡全面主权交接。",
      "伊方坚持战后赔偿与对霍尔木兹的防御性管辖。"
    ],
    military: [
      "美以的高精度外科手术打击预期与伊朗的分散饱和反击能力之间的非对称对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80,
      active: true
    }
  ],
  keyChange: "美以重启打击准备抵消了外交峰会的期待。",
  investmentSignal: "→ 维持能源资产与避险大宗商品的超配头寸，防御性对冲地缘突发。",
  prevRiskScore: 80,
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElF8DISXcdDfo-ppPP-1A_sr6b-mJz8lhwbS0ZNsCesx4r3s_C7ceK1cT-UL5ohrVb7vSmfxcaCZ0KE837K8ZpCub5vV5wyMNsn974tLDW8Wai6fPJpVpYhNA="
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvRhVcxn0ywaEkizswaJWkw027yxy1biqaGwXgRgv2ee8dfXYZc4AKV-ebOBV36mPiFWcQrsiHswwFQWFYl-hOYhNdSDkAt_ZuQ5Zi44bkOvaY0rx6wh16Z39Ygp7pNQTs1s9zVsE7Q7vp3mNQZhYA3Uqjh6lc__za1GFDDWIS9L27TsdY07_yYIIihFo-t9tklXLRiDa-PlR16A6FUw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYlfSxmFezzqSdIpZUuNS_KFw5qZQ2dSVVYAVwTdywrxDSfJudP-tHbuRIdmOlLd7oNRwr_qXP1xoR0LGsib8za13L7mQP0awtt8aRAD0mrl5dM9fiNRnbA0nrd-Vf2VUOoA=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjPGVvf_onHkOgUs3z9zG90E9mpH-en1HOoasxLQh8RXJv9tB25zR7EJqhvr7Ad825ccRTLNyg3eT3pvgDUMtewkVrklQUltARgPCvylmFmQ3kJ_G9dUsMbfueuw=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtxSK8gNdWaIL6fTTTDTquFFhciwIVfFZeZtS9cLXCD_KvwPW45Dbm2tPli7iMy5AmfdoMYzvhYIZa1_AzTvm58jEFXFGxbBgsYBU7EIBspxeezEmc6eGO69W9pqfYFB0_1LWoR_FOjfUk"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGri-rNGjs57BWXzjXkSyMcG0G7EhrosnCjXNWymvxcYbDEIdNSrEOs2KEjZAG110qjYamTOfBCvP1qy3HNkOuE4yocu6F43O08H9cdTRRSSV3G33eJMWzYDakjuK1fXea3KsTymtYwupYJzzWoQfOQUMR-D0WZZAF282D-IrOPjc3siYpLyghhIr55jQ=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status May 16 2024 2026",
    "WTI Brent crude oil price range trend May 16 2024 2026",
    "US Iran conflict news May 16 2024 latest updates"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-16",
  version: "v2.66",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D77",
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
      value: "WTI $102.4–$106.0 · Brent $106.8–$111.4",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and Israel initiate joint strike preparations under 'Operation Epic Fury'.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial traffic halted for 77 days; flow at 4% of normal capacity.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices elevated as global inventories draw at near-record speed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US-China summit fails to produce de-escalation breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic channels deadlocked as US rejects Iranian proposal.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Israel Launch Operation Epic Fury Prep",
      description: "Joint drills target hardened Iranian nuclear and oil facilities.",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Trump Rejects Iran Diplomacy",
      description: "President Trump dismisses Iranian counter-proposal on Air Force One.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI Crude Surges 11% This Week",
      description: "Market prices in long-term supply disruption from Hormuz closure.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strike readiness at critical threshold",
      "Iranian intent for long-term blockade solidified",
      "Global energy chains shifted to wartime alternatives"
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
        "Change: US and Israel conducting most intense strike preparations since April.",
        "Continue: Iran restores and fortifies anti-ship missile sites along the coast."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial transits remain at 4% of baseline; effective closure.",
        "Continue: War risk premiums stable at 8x normal levels."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: WTI weekly gains reach 11%, testing $106 per barrel.",
        "Continue: IEA notes record-breaking inventory draws across major hubs."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump issues 24-hour ultimatum for military intervention decision.",
        "Continue: China opposes militarization but declines direct clearing operations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demands nuclear dismantlement and Hormuz control.",
      "Iran demands reparations and defensive jurisdiction over the Strait."
    ],
    military: [
      "Asymmetric confrontation between US-Israeli precision strikes and Iranian saturation counter-attacks."
    ]
  },
  scoreTrend: [
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80,
      active: true
    }
  ],
  keyChange: "Renewed military prep offsets diplomatic hopes from the US-China summit.",
  investmentSignal: "→ Maintain overweight positions in energy and defensive commodities as georisk hedges.",
  prevRiskScore: 80,
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElF8DISXcdDfo-ppPP-1A_sr6b-mJz8lhwbS0ZNsCesx4r3s_C7ceK1cT-UL5ohrVb7vSmfxcaCZ0KE837K8ZpCub5vV5wyMNsn974tLDW8Wai6fPJpVpYhNA="
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvRhVcxn0ywaEkizswaJWkw027yxy1biqaGwXgRgv2ee8dfXYZc4AKV-ebOBV36mPiFWcQrsiHswwFQWFYl-hOYhNdSDkAt_ZuQ5Zi44bkOvaY0rx6wh16Z39Ygp7pNQTs1s9zVsE7Q7vp3mNQZhYA3Uqjh6lc__za1GFDDWIS9L27TsdY07_yYIIihFo-t9tklXLRiDa-PlR16A6FUw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYlfSxmFezzqSdIpZUuNS_KFw5qZQ2dSVVYAVwTdywrxDSfJudP-tHbuRIdmOlLd7oNRwr_qXP1xoR0LGsib8za13L7mQP0awtt8aRAD0mrl5dM9fiNRnbA0nrd-Vf2VUOoA=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjPGVvf_onHkOgUs3z9zG90E9mpH-en1HOoasxLQh8RXJv9tB25zR7EJqhvr7Ad825ccRTLNyg3eT3pvgDUMtewkVrklQUltARgPCvylmFmQ3kJ_G9dUsMbfueuw=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtxSK8gNdWaIL6fTTTDTquFFhciwIVfFZeZtS9cLXCD_KvwPW45Dbm2tPli7iMy5AmfdoMYzvhYIZa1_AzTvm58jEFXFGxbBgsYBU7EIBspxeezEmc6eGO69W9pqfYFB0_1LWoR_FOjfUk"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGri-rNGjs57BWXzjXkSyMcG0G7EhrosnCjXNWymvxcYbDEIdNSrEOs2KEjZAG110qjYamTOfBCvP1qy3HNkOuE4yocu6F43O08H9cdTRRSSV3G33eJMWzYDakjuK1fXea3KsTymtYwupYJzzWoQfOQUMR-D0WZZAF282D-IrOPjc3siYpLyghhIr55jQ=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status May 16 2024 2026",
    "WTI Brent crude oil price range trend May 16 2024 2026",
    "US Iran conflict news May 16 2024 latest updates"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.66 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美以重启打击准备抵消了外交峰会的期待。",
    bannerWarning: "→ 维持能源资产与避险大宗商品的超配头寸，防御性对冲地缘突发。",
    deescalationIntent: "美方追求伊朗核能彻底拆除与海峡全面主权交接。",
    structuralRisk: "商业通航连续 77 天中断，海峡流量仅为常态 4%。",
    contradictionNote: "美方追求伊朗核能彻底拆除与海峡全面主权交接。；美以的高精度外科手术打击预期与伊朗的分散饱和反击能力之间的非对称对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第77天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.66 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Renewed military prep offsets diplomatic hopes from the US-China summit.",
    bannerWarning: "→ Maintain overweight positions in energy and defensive commodities as georisk hedges.",
    deescalationIntent: "US demands nuclear dismantlement and Hormuz control.",
    structuralRisk: "Commercial traffic halted for 77 days; flow at 4% of normal capacity.",
    contradictionNote: "US demands nuclear dismantlement and Hormuz control.; Asymmetric confrontation between US-Israeli precision strikes and Iranian saturation counter-attacks.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 77",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
