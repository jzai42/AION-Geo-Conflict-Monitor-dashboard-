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
  date: "2026-09-16",
  version: "v2.191",
  riskScore: 82,
  riskTrend: "平稳",
  warPhase: {
    level: "高强度冲突",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊在海湾和红海战线维持高强度僵持，美军前5个月战费高达380亿美元。",
      "沙特替代出口管道关闭及延布港停运，标志着冲突已深度外溢至霍尔木兹海峡之外的原油外输通道。",
      "胡塞武装攻占佩里姆岛，使曼德海峡与霍尔木兹海峡形成南北合围的双重航道危机。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  keyStats: [
    {
      label: "冲突天数",
      value: "D200",
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
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "战线呈现高度僵持与多点活跃特征。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道受到严重限制与胡塞武装海上扩张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "供应中断与避险溢价导致油价高位盘整。",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国提供直接军事部署与战费支持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "政治僵局未破，双方谈判处于停滞状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美军在海湾及周边区域维持高强度对峙与军事防御，战线整体呈现高位僵持态势。",
        "变化：国会预算办公室报告首次量化美军前五个月战费高达380亿美元，证实战事高昂的长期财政消耗。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡由于伊朗常态化管控和断续封锁威胁，商业航道通行量依然严重受限。",
        "变化：胡塞武装攻占红海咽喉佩里姆岛，同时沙特延布港因基础设施受袭暂停石油装载，彻底切断了绕行红海的替代路径。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI及布伦特原油价格在避险需求和断供恐慌下持续维持在每桶100美元以上的高溢价区间。",
        "变化：沙特延布港装运停摆与利比亚三大油田因管道关闭而停产，两起重大突发断供事件叠加，使物理性原油供应面临实质性缺口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫与五角大楼重申对伊朗“极限施压”决心，但国内因高油价面临持续攀升的通胀与大选压力。",
        "变化：特朗普公开表明在11月国会中期选举结束前原油价格难以回落，将降级期望寄托于大选后的政治压力变化。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方旨在通过极限施压谋求伊朗去核与地缘妥协，而伊方借红海与霍尔木兹海峡双重航道控制权进行极限反制，双方在主权和安全红线上无妥协空间。"
    ],
    military: [
      "美军常态化海上打击与防空部署难以彻底根除胡塞及亲伊武装的多点不对称袭扰，形成高昂且难以为继的长期消耗战役。"
    ]
  },
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美国CBO报告量化对伊战费：前5个月直接开支高达380亿美元",
      description: "美国国会预算办公室（CBO）发布报告，确认美伊战争自2月28日爆发至8月1日已消耗国防部380亿美元，且后续每月战费将在20亿至30亿美元之间，显示高昂战事开支已常态化。",
      verification: "confirmed",
      timestamp: "2026-09-15T21:05:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "沙特红海延布港因遇袭受损暂停装载，替代输油管道持续离线",
      description: "航运界与路透社消息，沙特绕开霍尔木兹海峡的红海出口关键枢纽延布港（Yanbu）已暂停原油装运，其关键的“东西管道”在胡塞武装袭击后也继续维持关闭，替代航线严重受阻。",
      verification: "confirmed",
      timestamp: "2026-09-16T11:14:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "胡塞武装夺取曼德海峡核心佩里姆岛，红海航道再遭重创",
      description: "也门胡塞武装沿着红海海岸线成功占领控制曼德海峡咽喉的战略要地佩里姆岛（Perim Island），这使得红海与波斯湾同时面临地缘窒息风险，美伊对峙向南端大幅外溢。",
      verification: "confirmed",
      timestamp: "2026-09-15T13:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "利比亚三大油田因管道关闭紧急停产，加剧全球现货市场紧缺",
      description: "因输油管道因突发抗议而关闭，利比亚宣布暂停三个主要油田的运营。在全球石油储备由于美伊冲突长达半年的消耗已严重承压的背景下，此事件加剧了物理供应缺口。",
      verification: "confirmed",
      timestamp: "2026-09-16T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "原油期价高位盘整，WTI与布伦特分别在103和107美元上方运行",
      description: "Yahoo Finance数据表明， WTI区间处于$103.76–$105.63/桶，布伦特处于$107.18–$108.59/桶，在沙特与利比亚供应中断刺激下，高溢价依旧企稳。",
      verification: "confirmed",
      timestamp: "2026-09-16T09:25:18Z",
      significance: ""
    }
  ],
  keyChange: "沙特红海延布港因基础设施受损暂停装船，利比亚三大油田关停，美伊战争高额战费白热化，导致地缘溢价和断供威胁突破波斯湾，外溢至整个中东及红海能源通道。",
  investmentSignal: "→ 维持对大宗商品与防御性资产（如黄金与能源股）的对冲仓位，油价高企对全球风险资产形成持续压制。",
  change: "structural",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-16",
  version: "v2.191",
  riskScore: 82,
  riskTrend: "Stagnant",
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The US-Iran war maintains a heavy military standoff, with US military costs reaching $38 billion in the first five months.",
      "The shutdown of Saudi Arabia's East-West pipeline and suspension of Yanbu port signal that the war's disruption has expanded beyond the Strait of Hormuz.",
      "The Houthis' capture of Perim Island creates a dual-chokepoint crisis involving both the Bab el-Mandeb and the Strait of Hormuz."
    ],
    note: "For monitoring only; not investment advice."
  },
  keyStats: [
    {
      label: "Conflict Days",
      value: "D200",
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
      value: "WTI $103.76–$105.63 · Brent $107.18–$108.59",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Battlelines exhibit a severe standoff with highly active localized engagements.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Passage severely restricted coupled with proxy maritime expansion.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Supply disruptions and high risk premiums entrench high-level consolidation.",
      status: "FAST",
      sourceVerification: "unverified"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major powers maintain active deployments and heavy defense expenditures.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Political gridlock persists with diplomatic backchannels frozen.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US and allied naval assets maintain high-alert defensive postures in the Gulf and Red Sea amid ongoing asymmetric drone and missile threats.",
        "Change: A newly released CBO report quantifies the direct DoD cost of the conflict at $38 billion for the first five months, confirming a heavy fiscal drain."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial vessel transits through the Strait of Hormuz remain severely depressed under persistent Iranian enforcement and threats.",
        "Change: Houthi forces captured Perim Island, controlling the southern gate of the Red Sea, while Saudi Arabia's Yanbu port suspended oil loadings, paralyzing a…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent and WTI crude futures maintain a strong geopolitical premium, lingering well above $100 per barrel despite rising US crude stocks.",
        "Change: Double supply shocks hit the market as Saudi's Yanbu export loadings are suspended and Libya shutters three major oil fields due to pipeline protests."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Domestic political pressure mounts on the US administration over sticky inflation and elevated fuel prices ahead of the fall elections.",
        "Change: President Trump states that oil prices are unlikely to fall significantly before the November midterms, postponing expectations of a diplomatic off-ram…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington pursues maximum pressure via economic blockade and direct military force, while Tehran leverages dual-chokepoint disruptions as existential asymmetric defense."
    ],
    military: [
      "A highly localized military stalemate where conventional naval superiority is steadily bled by cheap, widely dispersed drone and missile capabilities across vast maritime choke points."
    ]
  },
  scoreTrend: [
    {
      date: "09-12",
      score: 88
    },
    {
      date: "09-13",
      score: 88
    },
    {
      date: "09-14",
      score: 82
    },
    {
      date: "09-15",
      score: 82
    },
    {
      date: "09-16",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US CBO Report Quantifies Iran War Cost at $38 Billion Through July",
      description: "The Congressional Budget Office released a report showing the war against Iran cost the Pentagon $38 billion from late February to August 1, with ongoing costs running at $2B-$3B per month.",
      verification: "confirmed",
      timestamp: "2026-09-15T21:05:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Saudi Arabia Suspends Oil Loadings at Yanbu Port as Bypass Pipelines Fail",
      description: "Shipping sources confirmed that Saudi's Yanbu port on the Red Sea has suspended crude loadings, while the East-West pipeline remains offline after Houthi attacks, severely choking alternate export paths.",
      verification: "confirmed",
      timestamp: "2026-09-16T11:14:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Houthi Militants Seize Strategic Perim Island in the Bab el-Mandeb Strait",
      description: "Iran-backed Houthi forces captured Perim Island, which sits at the throat of the Bab el-Mandeb, complicating Red Sea navigation and creating a dual-chokepoint crisis for global energy shipments.",
      verification: "confirmed",
      timestamp: "2026-09-15T13:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Libya Halts Three Oil Fields Over Sudden Pipeline Blockade",
      description: "Protests forced the closure of a critical crude pipeline in Libya, prompting the state to suspend operations at three major oil fields, compounding global supply deficits.",
      verification: "confirmed",
      timestamp: "2026-09-16T10:00:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Crude Oil Futures Steady at Elevated Range Amid Disruption Threats",
      description: "Yahoo Finance data shows WTI consolidates in the $103.76–$105.63/bbl range, and Brent in the $107.18–$108.59/bbl range, supported by structural disruptions in Saudi and Libya.",
      verification: "confirmed",
      timestamp: "2026-09-16T09:25:18Z",
      significance: ""
    }
  ],
  keyChange: "Geopolitical escalation has broken beyond the Strait of Hormuz with Saudi's Yanbu port suspended, Libya shutting major oilfields, and Houthis capturing Perim Island, structurally entrenching oil over $100/bbl.",
  investmentSignal: "→ Maintain hedging in energy commodities and defensive safe havens while underweighting broader risk assets as oil prices remain structural headwind.",
  change: "structural",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.191 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：沙特红海延布港因基础设施受损暂停装船，利比亚三大油田关停，美伊战争高额战费白热化，导致地缘溢价和断供威胁突破波斯湾，外溢至整个中东及红海能源通道。",
    bannerWarning: "→ 维持对大宗商品与防御性资产（如黄金与能源股）的对冲仓位，油价高企对全球风险资产形成持续压制。",
    deescalationIntent: "美方旨在通过极限施压谋求伊朗去核与地缘妥协，而伊方借红海与霍尔木兹海峡双重航道控制权进行极限反制，双方在主权和安全红线上无妥协空间。",
    structuralRisk: "航道受到严重限制与胡塞武装海上扩张。",
    contradictionNote: "美方旨在通过极限施压谋求伊朗去核与地缘妥协，而伊方借红海与霍尔木兹海峡双重航道控制权进行极限反制，双方在主权和安全红线上无妥协空间。；美军常态化海上打击与防空部署难以彻底根除胡塞及亲伊武装的多点不对称袭扰，形成高昂且难以为继的长期消耗战役。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第200天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.191 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Geopolitical escalation has broken beyond the Strait of Hormuz with Saudi's Yanbu port suspended, Libya shutting major oilfields, and Houth…",
    bannerWarning: "→ Maintain hedging in energy commodities and defensive safe havens while underweighting broader risk assets as oil pric…",
    deescalationIntent: "Washington pursues maximum pressure via economic blockade and direct military f…",
    structuralRisk: "Passage severely restricted coupled with proxy maritime expansion.",
    contradictionNote: "Washington pursues maximum pressure via economic blockade and direct military force, while Tehran leverages dual-chokepoint disruptions as existential asymmetr…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 200",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
