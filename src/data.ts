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
  date: "2026-10-31",
  version: "v2.239",
  keyStats: [
    {
      label: "冲突天数",
      value: "D245",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.29",
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
  scoreTrend: [
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "依据沙特防空部队与胡塞武装声明，沙特阿美拉斯塔努拉炼厂及布盖格设施遭遇跨国无人机与导弹突防拦截，多战线态势持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "依据UKMTO与路透社报道，巴拿马籍油轮Louise 1在海峡穆桑代姆外海遭遇水雷附着爆炸起火，商业通航实际处于极端高危状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "依据雅虎财经与彭博社基准行情，WTI维持在$102.43–$104.99，Brent维持在$111.05–$114.29，位于$100–120危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "依据美国中央司令部（CENTCOM）发布，美军舰队持续提供海空态势感知与防空掩护，维持区域威慑但未展开直接地面反击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "依据华尔街日报与伊朗塔斯宁通讯社报道，美国与伊朗高层虽有信函试探，但德黑兰明确否认接受现有草案，斡旋前景极度狭窄。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "水雷不对称战术切入波斯湾主要航道，多国商船通航受阻",
      "也门方向对沙特能源咽喉实施导弹试探，战线呈现跨域联动",
      "外交传信渠道仍存但因严苛先决条件难以转化为实质停火"
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
        "变化：胡塞武装对沙特阿美拉斯塔努拉与布盖格石油设施发起无人机和导弹突防，沙特防空系统启动拦截。",
        "延续：红海与波斯湾周边保持高等级战备警戒，代理人多点牵制作战态势未变。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO证实巴拿马籍油轮在海峡遭小艇附着水雷破坏导致机舱起火，航运安全等级升至极端。",
        "延续：伊朗伊斯兰革命卫队海军持续在海峡执行强行管控与巡逻警告。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与Brent主力价格分别盘整于$102–$105与$111–$114高位，持续处于能源危机计价带。",
        "延续：战略石油储备（SPR）释放对海峡航道实体断供担忧的平抑效果有限。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：华盛顿经卡塔尔向德黑兰递交停火沟通意向信函，但伊方公开声明拒绝无条件妥协。",
        "延续：双方政治立场高度对立，停火谈判尚无可行技术方案。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊高层政治互信为零，间接沟通难以及时对齐停火核心利益分配"
    ],
    military: [
      "霍尔木兹水雷非对称消耗战与海湾产油国能源基建设施防空压力持续加剧"
    ]
  },
  keyChange: "霍尔木兹海峡证实发生吸附水雷实战破坏油轮事件，沙特石化枢纽遭遇跨界打击试探，油价与航运风险维持在百美元高位危机带；综合风险分落盘 80（较昨日 -2）；调整前模型分 82（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品与能源部位的风险对冲头寸，维持防御配置并对冲非必需风险资产。",
  change: "none",
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡商船遭吸附水雷攻击",
      description: "UKMTO与路透社报道，巴拿马籍油轮Louise 1在阿曼外海遭小艇人员附着水雷起火，船员目前脱险并恢复控制。",
      verification: "confirmed",
      timestamp: "2026-10-30T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "沙特拦截针对阿美炼厂的巡航导弹",
      description: "沙特官方通讯社与半岛电视台报道，沙特联军成功拦截胡塞武装射向拉斯塔努拉及布盖格方向的无人机与导弹。",
      verification: "confirmed",
      timestamp: "2026-10-30T04:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美伊多哈间接传信对话停滞",
      description: "华尔街日报与塔斯宁通讯社证实，美方信函寻求重启对话，但伊朗重申美方不满足条件则不予接纳，斡旋无突破。",
      verification: "confirmed",
      timestamp: "2026-10-30T10:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准期货维持百美元危机带",
      description: "依据彭博社与雅虎财经数据，WTI维持在$102.43–$104.99，Brent处于$111.05–$114.29，地缘断供风险溢价高固。",
      verification: "confirmed",
      timestamp: "2026-10-31T14:50:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-31",
  version: "v2.239",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D245",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.29",
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
  scoreTrend: [
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "According to statements from Saudi defense forces and Houthi claims, Saudi Aramco facilities in Ras Tanura and Abqaiq were targeted by drones and missiles, confirming multi-front active engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "According to UKMTO and Reuters, Panama-flagged tanker Louise 1 suffered an explosion and engine fire from limpet mines in the strait, confirming severe physical disruption.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "According to Yahoo Finance and Bloomberg pricing data, WTI trades between $102.43–$104.99 and Brent between $111.05–$114.29, squarely inside the $100–120 crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "According to US CENTCOM releases and AP reports, the US military maintains air defense assistance and maritime surveillance for regional allies without committing direct ground engagement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "According to the Wall Street Journal and Tasnim News Agency, indirect diplomatic letters delivered via Qatari mediators stalled as Tehran rejected talks without prior US concessions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Asymmetric naval mining tactics disrupt major commercial corridors in the Strait of Hormuz",
      "Cross-border missile and drone strikes test air defense coverage across Saudi oil complexes",
      "Indirect diplomatic overtures via Doha remain stalled by rigid preconditions on both sides"
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
        "Change: Houthi forces launched drone and missile strikes targeting Ras Tanura and Abqaiq facilities, intercepted by Saudi defenses.",
        "Continue: Regional armed groups maintain multi-theater pressure against allied infrastructure around the Red Sea and Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO verified a limpet mine attack on a commercial tanker off Oman, elevating chokepoint transit risk to extreme levels.",
        "Continue: Iranian naval patrols continue enforcing assertive inspection demands and radio warnings across outbound corridors."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Benchmark WTI and Brent contracts remain anchored in the $102–$105 and $111–$114 crisis range respectively.",
        "Continue: Global SPR releases provide only modest temporary liquidity without extinguishing core geopolitical disruption premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington communicated diplomatic willingness through Qatari channels, but Tehran publicly rebuffed talks under current terms.",
        "Continue: Both administrations maintain uncompromising red lines ahead of US congressional elections."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Absence of bilateral political trust renders backchannel diplomatic frameworks ineffective"
    ],
    military: [
      "Unconventional maritime mining clashes with allied air and naval defensive mandates in critical shipping lanes"
    ]
  },
  keyChange: "Strait of Hormuz tanker attack confirmed with limpet mines alongside missile interceptions near Saudi refineries, locking crude benchmarks in the $100+ crisis bracket; composite risk score prints at 80 (vs prior day -2); pre-adjustment model score 82 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain risk-hedging allocations in energy and commodities while maintaining defensive posture across unhedged risk assets.",
  change: "none",
  events: [
    {
      id: "EVT-01",
      title: "Commercial Tanker Struck by Limpet Mines in Hormuz",
      description: "UKMTO and Reuters verified that the tanker Louise 1 was struck by hull-attached explosives off Oman, with fires extinguished and crew safe.",
      verification: "confirmed",
      timestamp: "2026-10-30T18:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Saudi Defenses Intercept Missiles Targeting Refineries",
      description: "Saudi Press Agency and Al Jazeera reported successful interceptions of Houthi cruise missiles and drones aimed at Ras Tanura and Abqaiq.",
      verification: "confirmed",
      timestamp: "2026-10-30T04:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US-Iran Indirect Talks Stall in Doha",
      description: "Wall Street Journal and Tasnim News reported US diplomatic letters sent via Qatar faced firm rejections from Tehran absent major concessions.",
      verification: "confirmed",
      timestamp: "2026-10-30T10:15:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Firm in Triple-Digit Crisis Band",
      description: "Bloomberg and Yahoo Finance data indicate WTI trading at $102.43–$104.99 and Brent at $111.05–$114.29, reflecting entrenched supply risk.",
      verification: "confirmed",
      timestamp: "2026-10-31T14:50:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月31日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.239 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓2）：霍尔木兹海峡证实发生吸附水雷实战破坏油轮事件，沙特石化枢纽遭遇跨界打击试探，油价与航运风险维持在百美元高位危机带；综合风险分落盘 80（较昨日 -2）；调整前模型分 82（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品与能源部位的风险对冲头寸，维持防御配置并对冲非必需风险资产。",
    deescalationIntent: "美伊高层政治互信为零，间接沟通难以及时对齐停火核心利益分配",
    structuralRisk: "依据UKMTO与路透社报道，巴拿马籍油轮Louise 1在海峡穆桑代姆外海遭遇水雷附着爆炸起火，商业通航实际处于极端高危状态。",
    contradictionNote: "美伊高层政治互信为零，间接沟通难以及时对齐停火核心利益分配；霍尔木兹水雷非对称消耗战与海湾产油国能源基建设施防空压力持续加剧",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第245天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 31 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.239 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓2): Strait of Hormuz tanker attack confirmed with limpet mines alongside missile interceptions near Saudi refineries, locking crude benchmarks …",
    bannerWarning: "→ Maintain risk-hedging allocations in energy and commodities while maintaining defensive posture across unhedged risk …",
    deescalationIntent: "Absence of bilateral political trust renders backchannel diplomatic frameworks …",
    structuralRisk: "According to UKMTO and Reuters, Panama-flagged tanker Louise 1 suffered an explosion and engine fir…",
    contradictionNote: "Absence of bilateral political trust renders backchannel diplomatic frameworks ineffective; Unconventional maritime mining clashes with allied air and naval de…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 245",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
