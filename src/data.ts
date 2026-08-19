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
  date: "2026-08-19",
  version: "v2.162",
  keyStats: [
    {
      label: "冲突天数",
      value: "D172",
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
      value: "WTI $84.37–$85.84 · Brent $91.22–$92.38",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美伊一线部队维持高压对峙，双方均未释放撤军信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通行量维持在极低位，能源运输基本停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "地缘溢价维持，布油企稳于90美元上方，反映市场对封锁长期化的担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美欧与地区盟友通过军事部署与制裁深度介入局势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道受阻，双方互指对方违反前期谅解备忘录。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  change: "none",
  keyChange: "封锁常态化，能源溢价固化",
  events: [
    {
      id: "EVT-01",
      title: "伊朗警告若协议不履行则能源暂停",
      description: "代总统穆赫贝尔在WANA采访中明确能源出口与协议执行挂钩。 (Sources: WANA)",
      verification: "confirmed",
      timestamp: "2026-08-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡单日通行量维持个位数",
      description: "路透社援引航运数据称海峡交通连续三日低迷。 (Sources: Reuters)",
      verification: "confirmed",
      timestamp: "2026-08-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美财政部发起新一轮技术制裁",
      description: "针对协助伊朗导弹与网络能力的实体实施新制裁。 (Sources: US Treasury)",
      verification: "partial",
      timestamp: "2026-08-18",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海峡「选择性开放」策略成为长期化博弈手段",
      "美方转向高压经济隔离与制裁升级",
      "能源价格对协议履行信号极度敏感"
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
        "延续：美军航母打击群在霍尔木兹周边维持警戒巡逻。",
        "延续：伊朗革命卫队（IRGC）海军在海峡北侧保持高频率演习。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要班轮公司维持红海及海峡绕行，仅特定国籍船舶获准通过。",
        "变化：中国国有航运巨头据报已开始在波斯湾以外卸货。 (Sources: Reuters)"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：地缘政治驱动油价四连阳，市场测试92美元支撑位。",
        "延续：多国SPR库存下降担忧加剧市场不安。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：穆赫贝尔警告中东能源流向取决于美方履行协议程度。 (Sources: IRNA)",
        "延续：白宫重申不会在伊朗恢复合规前单方面解除封锁。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗对主权与制裁解除的刚性要求与美方「极限施压」的对立"
    ],
    military: [
      "海域航行权控制与能源通道安全的结构性冲突"
    ]
  },
  scoreTrend: [
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源与大宗商品对冲，增加风险资产防御性配置。",
  prevRiskScore: 82,
  webSources: [
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH--97hHX57u6h0JbMFLY8sLG4YBrF2l2mtd_2e8UP0AgAS7Jzs5poEwgywFoS9d7qiPEypux0NwuuD3p-ln2thtCLGTqP6rIQlzNioyJrJ01dQUpUF-cqy_sEJ8D_7PKP9HZ5ayoNFPJZ79K3RzWB981CpG6cPvEvZoBgr3nhH-8FJkudJd-DDCnz-GlQx55YVDuNE"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUS3H18drha6AApa2NU4cUBZ2KXEEkgNulEvEYh30OW-pUI-YjZZh9nPMeyzyMu9EzmFyxLgQETluv-J9jRRZPqx2o5Jw0G_Wracj5Rkj1RwY2eNLwnKW0bZS4Dwc0heCgF_c4FtP2"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH4N4n7inb7doCTtwXirs059UdU_aGOQ_Dq72IKdF1RD7JhVTucczLSwaYF86F_aFfg1VQjEZFNBxozYrnzqssYE9MYhmkNVauxdlEifZVN5TKZVWbRUxMcXhwNkRQLNFt76i3QDK-89wtgWcuqxQn"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElDlMbUeTASx7yJeGUeiWA_-JP0fbg9GDHbIhcEI9EO8hIKOOHE1lpHB-LSkIfvxxwxSRS7u8kbfzI-eVZKZSYujO-9BywCY9pYKLQf5TsOMngBQAJTfnhRR9-0pYwMpkN-NXeP9s-hgupS9p9QZNevLAJMrs="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_rxxgvPUfouV6beV7pU7yzbclyABfZxHR0SdPK6lqrrBQAAIbMLZ1peCl-XCY5g1oocojyxTKUoL6WHzf_5zryPcWp5JvvAewvy8MWZnuKMvj9Dqwo9prqF4-kz2esDtykWZ41SQlOJhaC4-dwhlPHg=="
    },
    {
      title: "voanews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKEthpcU2BKsGfz4zgOYbUn93l6hbMki3ldMQ6xxNml3u2fgq8tZpzhWtkBLn1is00B6O7psYskuz_wvi19td396DSd2YVwsjaYeXTAIIYVncXcnGdBHVCG09isOoJLgCU6pJh-IXLV-lzkdRJc_5CrQXk0JtJrqMXDlNmnRX5z6ZddKqvh3uBKhlI_mQfQOGsm-YaX9yQWKl7q1hrGDU="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 19 2026 current prices",
    "WTI Brent crude oil price May 21 22 2024 range trend",
    "US Iran relations news May 21 22 2024 escalation de-escalation",
    "Strait of Hormuz shipping status May 22 2024",
    "Iran acting president Mokhber statements Israel US May 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-19",
  version: "v2.162",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D172",
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
      value: "WTI $84.37–$85.84 · Brent $91.22–$92.38",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-pressure standoff between US and Iranian forces with no signs of withdrawal.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Hormuz traffic remains at record lows, with energy transport largely halted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Geopolitical premium persists with Brent stabilizing above $90/Bbl.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Major powers deeply involved through military deployment and sanctions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels blocked as parties trade accusations of MOU violations.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  change: "none",
  keyChange: "Blockade normalization;固化 energy premium",
  events: [
    {
      id: "EVT-01",
      title: "Iran Warns Energy Flow Depends on Accord Implementation",
      description: "Mokhber explicitly links exports to MOU terms in a recent interview. (Sources: WANA)",
      verification: "confirmed",
      timestamp: "2026-08-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Single-Digit Vessel Transits at Hormuz",
      description: "Reuters reports third consecutive day of depressed maritime activity. (Sources: Reuters)",
      verification: "confirmed",
      timestamp: "2026-08-19",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "US Treasury Launches New Technical Sanctions",
      description: "Targeting entities facilitating Iran's missile and cyber capabilities. (Sources: US Treasury)",
      verification: "partial",
      timestamp: "2026-08-18",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Selective access to the Strait becomes a long-term strategic lever",
      "US shifts towards sustained economic isolation and blockade",
      "Energy prices remain hypersensitive to de-escalation signals"
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
        "Continue: US carrier strike group maintains patrol near Hormuz.",
        "Continue: IRGC Navy keeps high-frequency drills on the north coast."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Liners reroute around Red Sea/Strait; only specific flags pass.",
        "Change: Chinese state tankers reported loading outside Persian Gulf. (Sources: Reuters)"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Geopolitics drive oil price to four-day rally, testing $92/Bbl.",
        "Continue: SPR drawdown concerns amplify market anxiety."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Mokhber warns energy flows depend on US compliance. (Sources: IRNA)",
        "Continue: White House maintains no relief before Iranian compliance."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Contradiction between Iranian sovereignty demands and US maximum pressure."
    ],
    military: [
      "Structural conflict over maritime control vs energy security."
    ]
  },
  scoreTrend: [
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82,
      active: true
    }
  ],
  investmentSignal: "→ Maintain energy and commodity hedges; adopt defensive posture in risk assets.",
  prevRiskScore: 82,
  webSources: [
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH--97hHX57u6h0JbMFLY8sLG4YBrF2l2mtd_2e8UP0AgAS7Jzs5poEwgywFoS9d7qiPEypux0NwuuD3p-ln2thtCLGTqP6rIQlzNioyJrJ01dQUpUF-cqy_sEJ8D_7PKP9HZ5ayoNFPJZ79K3RzWB981CpG6cPvEvZoBgr3nhH-8FJkudJd-DDCnz-GlQx55YVDuNE"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUS3H18drha6AApa2NU4cUBZ2KXEEkgNulEvEYh30OW-pUI-YjZZh9nPMeyzyMu9EzmFyxLgQETluv-J9jRRZPqx2o5Jw0G_Wracj5Rkj1RwY2eNLwnKW0bZS4Dwc0heCgF_c4FtP2"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH4N4n7inb7doCTtwXirs059UdU_aGOQ_Dq72IKdF1RD7JhVTucczLSwaYF86F_aFfg1VQjEZFNBxozYrnzqssYE9MYhmkNVauxdlEifZVN5TKZVWbRUxMcXhwNkRQLNFt76i3QDK-89wtgWcuqxQn"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElDlMbUeTASx7yJeGUeiWA_-JP0fbg9GDHbIhcEI9EO8hIKOOHE1lpHB-LSkIfvxxwxSRS7u8kbfzI-eVZKZSYujO-9BywCY9pYKLQf5TsOMngBQAJTfnhRR9-0pYwMpkN-NXeP9s-hgupS9p9QZNevLAJMrs="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_rxxgvPUfouV6beV7pU7yzbclyABfZxHR0SdPK6lqrrBQAAIbMLZ1peCl-XCY5g1oocojyxTKUoL6WHzf_5zryPcWp5JvvAewvy8MWZnuKMvj9Dqwo9prqF4-kz2esDtykWZ41SQlOJhaC4-dwhlPHg=="
    },
    {
      title: "voanews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKEthpcU2BKsGfz4zgOYbUn93l6hbMki3ldMQ6xxNml3u2fgq8tZpzhWtkBLn1is00B6O7psYskuz_wvi19td396DSd2YVwsjaYeXTAIIYVncXcnGdBHVCG09isOoJLgCU6pJh-IXLV-lzkdRJc_5CrQXk0JtJrqMXDlNmnRX5z6ZddKqvh3uBKhlI_mQfQOGsm-YaX9yQWKl7q1hrGDU="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 19 2026 current prices",
    "WTI Brent crude oil price May 21 22 2024 range trend",
    "US Iran relations news May 21 22 2024 escalation de-escalation",
    "Strait of Hormuz shipping status May 22 2024",
    "Iran acting president Mokhber statements Israel US May 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月19日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.162 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：封锁常态化，能源溢价固化",
    bannerWarning: "→ 维持能源与大宗商品对冲，增加风险资产防御性配置。",
    deescalationIntent: "伊朗对主权与制裁解除的刚性要求与美方「极限施压」的对立",
    structuralRisk: "海峡通行量维持在极低位，能源运输基本停滞。",
    contradictionNote: "伊朗对主权与制裁解除的刚性要求与美方「极限施压」的对立；海域航行权控制与能源通道安全的结构性冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第172天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 19 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.162 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Blockade normalization;固化 energy premium",
    bannerWarning: "→ Maintain energy and commodity hedges; adopt defensive posture in risk assets.",
    deescalationIntent: "Contradiction between Iranian sovereignty demands and US maximum pressure.",
    structuralRisk: "Hormuz traffic remains at record lows, with energy transport largely halted.",
    contradictionNote: "Contradiction between Iranian sovereignty demands and US maximum pressure.; Structural conflict over maritime control vs energy security.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 172",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
