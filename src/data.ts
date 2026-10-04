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
  date: "2026-10-04",
  version: "v2.211",
  riskScore: 64,
  keyChange: "OPEC+会议决议维稳11月产量，油价在百元关口维持多空博弈，美伊前沿对峙与护航通道保持受控平衡。",
  investmentSignal: "→ 维持能源与大宗商品结构性对冲敞口，增持高股息防御性资产并防范原油脉冲波动风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D218",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$103.05",
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
      description: "美军与伊朗海空力量在前沿保持高强度对峙与威慑部署，零星接触受控，未向全面总决战外溢。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "商业通航维持受限与许可伴航状态，沙特红海延布港分流维持运行，实际通过量在50%–90%区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI与Brent主力在$88–$103区间震荡，OPEC+维持配额不变抵消G7协调释储预期，能源风险溢价高位企稳。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军提供区域情报、反导防空和护航支持，G7协调储备释放应对冲击，大国未直接发生阵营对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "中介调解渠道维持连通，但核心先决条件（解除封锁与核核查）分歧明显，突破性降级受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20261004-01",
      title: "OPEC+七个核心成员国确认维持11月原油产量配额不变",
      description: "OPEC+核心成员周日举行线上部长级会议，一致决定维持现有产量政策，暂不追加增产，以平衡海湾供给扰动与全球需求。",
      verification: "confirmed",
      timestamp: "2026-10-04T11:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20261004-02",
      title: "美军强化阿曼湾与红海水域防空反导巡逻梯次",
      description: "美军中央司令部维持对商船航道的伴随监视，调动宙斯盾驱逐舰与区域防空网络，防范无人机与反舰打击隐患。",
      verification: "confirmed",
      timestamp: "2026-10-04T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-20261004-03",
      title: "海湾原油出口分流管道维持高负荷运载以避开咽喉瓶颈",
      description: "沙特阿美通过东西管线向延布码头持续输送原油，结合红海装运缓解霍尔木兹海峡受限压力。",
      verification: "confirmed",
      timestamp: "2026-10-04T06:15:00Z",
      significance: ""
    },
    {
      id: "evt-20261004-04",
      title: "美伊第三方外交穿梭继续但关键议题分歧严重",
      description: "调停方传递关于阶段性通航保障的折中草案，但美伊双方在同步解除港口封锁与核设施核查机制上立场对立。",
      verification: "confirmed",
      timestamp: "2026-10-03T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事打击呈现定点与防御拦截特征，未演变为全面战略空袭或地面交战。",
      "能源通道依托替代管线与护航通道保持部分通畅，OPEC+配额守稳形成支撑。",
      "外交斡旋保持间接管道通畅，核心利益交换陷入僵持但底线尚未破裂。"
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
        "延续：美伊双方在海湾水域维持高等级战备监视与防空拦截警戒。",
        "延续：未出现针对对方本土核心战略纵深的大规模新一轮空袭行动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹航道通行严格依赖护航编队与预先通报机制。",
        "延续：沙特延布港装船与东西管线全负荷运作，持续分流海运风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：OPEC+核心成员周日敲定维持11月配额，消除短期政策突变不确定性。",
        "延续：WTI在90美元上方与布油百元关口胶着，反映释储预期与地缘溢价并存。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿坚持要求伊朗实质让步，德黑兰拒绝单方面妥协条件。",
        "延续：多边调停机制继续保持接触，但尚未敲定任何正式停火文本。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方遏制战略与德黑兰维护主权及反封锁诉求存在刚性对立。",
      "调停方缺乏迫使双方同时签署让步方案的强制约束工具。"
    ],
    military: [
      "海湾航道自由航行诉求与伊朗反介入导弹防御体系的长期对峙。",
      "伴随护航能保障部分商船但无法根除局部突袭与水雷威胁风险。"
    ]
  },
  scoreTrend: [
    {
      date: "09-30",
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-04",
  version: "v2.211",
  riskScore: 64,
  keyChange: "OPEC+ ministers kept November output targets steady, oil hovered around $100/bbl, and US-Iran confrontations remained locked in a tense standoff.",
  investmentSignal: "→ Maintain structural hedging exposure in energy and commodities while adding defensive assets to buffer against oil price spikes.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D218",
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
      value: "WTI $88.06–$93.51 · Brent $98.43–$103.05",
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
      description: "US and Iranian naval and air forces maintain high-intensity deterrence and localized confrontations without spiraling into full-scale war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Commercial transits operate under convoy escorts and bypass pipelines, with actual flow remaining between 50% and 90% of normal volumes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "WTI and Brent oscillate between $88 and $103/bbl as OPEC+ quota discipline counters G7 emergency stockpile release expectations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US provides intelligence, missile defense, and naval escorts, while G7 coordinates fuel reserves without direct great power clashes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Backchannel mediation through regional intermediaries persists, but stark divergence on sequencing prevents formal breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-20261004-01",
      title: "OPEC+ core nations agree to hold November output quotas steady",
      description: "Seven core OPEC+ producers held an online meeting on Sunday and decided to maintain current output ceilings, declining further adjustments for November.",
      verification: "confirmed",
      timestamp: "2026-10-04T11:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20261004-02",
      title: "US military reinforces regional air and maritime defense patrols",
      description: "US Central Command sustained active air defense and naval escort missions in the Gulf of Oman to safeguard vital oil transit lanes.",
      verification: "confirmed",
      timestamp: "2026-10-04T08:00:00Z",
      significance: ""
    },
    {
      id: "evt-20261004-03",
      title: "Regional pipeline detours continue operating at elevated throughput",
      description: "Saudi Aramco sustained heavy crude deliveries via the East-West pipeline to Yanbu terminal, mitigating chokepoint transit bottlenecks.",
      verification: "confirmed",
      timestamp: "2026-10-04T06:15:00Z",
      significance: ""
    },
    {
      id: "evt-20261004-04",
      title: "US-Iran backchannel mediation encounters deadlock over preconditions",
      description: "Mediators circulated revised terms for maritime safety, but both sides remained deadlocked over nuclear concessions and sanctions relief.",
      verification: "confirmed",
      timestamp: "2026-10-03T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military action remains focused on localized defense and targeted deterrence rather than full strategic air campaigns.",
      "Energy corridors stay partially viable through pipeline workarounds and naval escorts alongside stable OPEC+ targets.",
      "Diplomatic channels remain intact but stalled over fundamental security and sanction preconditions."
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
        "Continue: US and Iranian forces maintain elevated alert and intercept postures in maritime sectors.",
        "Continue: No fresh deep-strike strategic bombardments against inland energy infrastructure reported."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait transits require convoy coordination, transponder precautions, and security vetting.",
        "Continue: Yanbu loadings on the Red Sea operate at elevated volumes to bypass chokepoint disruption."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: OPEC+ core ministers confirmed steady November production quotas on Sunday.",
        "Continue: Brent trades around the $100 threshold as market balances reserve release talks against supply risks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington demands binding guarantees on nuclear and maritime protocols before easing measures.",
        "Continue: Tehran maintains its rejection of unilateral concessions under ongoing blockade pressure."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US deterrence objectives fundamentally clash with Iran's anti-blockade resistance doctrine.",
      "Mediation lacks binding enforcement mechanisms to compel simultaneous reciprocal concessions."
    ],
    military: [
      "Naval freedom of navigation mandates confront Iran's established coastal anti-access systems.",
      "Convoy operations mitigate vulnerable tanker traffic but cannot fully negate asymmetric drone threats."
    ]
  },
  scoreTrend: [
    {
      date: "09-30",
      score: 60
    },
    {
      date: "10-01",
      score: 60
    },
    {
      date: "10-02",
      score: 60
    },
    {
      date: "10-03",
      score: 64
    },
    {
      date: "10-04",
      score: 64,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 64,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.211 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（持平）：OPEC+会议决议维稳11月产量，油价在百元关口维持多空博弈，美伊前沿对峙与护航通道保持受控平衡。",
    bannerWarning: "→ 维持能源与大宗商品结构性对冲敞口，增持高股息防御性资产并防范原油脉冲波动风险。",
    deescalationIntent: "美方遏制战略与德黑兰维护主权及反封锁诉求存在刚性对立。",
    structuralRisk: "商业通航维持受限与许可伴航状态，沙特红海延布港分流维持运行，实际通过量在50%–90%区间。",
    contradictionNote: "美方遏制战略与德黑兰维护主权及反封锁诉求存在刚性对立。；海湾航道自由航行诉求与伊朗反介入导弹防御体系的长期对峙。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第218天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.211 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (Flat): OPEC+ ministers kept November output targets steady, oil hovered around $100/bbl, and US-Iran confrontations remained locked in a tense sta…",
    bannerWarning: "→ Maintain structural hedging exposure in energy and commodities while adding defensive assets to buffer against oil pr…",
    deescalationIntent: "US deterrence objectives fundamentally clash with Iran's anti-blockade resistan…",
    structuralRisk: "Commercial transits operate under convoy escorts and bypass pipelines, with actual flow remaining b…",
    contradictionNote: "US deterrence objectives fundamentally clash with Iran's anti-blockade resistance doctrine.; Naval freedom of navigation mandates confront Iran's established c…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 218",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
