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
  date: "2026-11-24",
  version: "v2.263",
  riskScore: 72,
  keyChange: "霍尔木兹商船袭扰事件频发但供应增量缓解短缺，美伊多哈间接接触难掩核心诉求鸿沟，地缘评分维持高位高黏滞。",
  investmentSignal: "→ 维持能源与大宗商品波动对冲，采取防御配置策略并适度控制高贝塔风险资产仓位。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D269",
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
      value: "WTI $79.07–$82.13 · Brent $85.65–$88.86",
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
      description: "波斯湾与红海前沿交火维持互射与无人机防空拦截态势，未出现全面地面冲突。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡水雷与商船受击事件增加，商业通航量降至危机前 50% 以下并高度依赖暗舱转运。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "原油现货与近月期货处于 $79–$89 区间，利比亚管线重启与美洲增产压制了地缘溢价暴涨。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持海空护航部署与情报支援，美方针对海运网络战发起跨部门调查。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通过第三方中介的间接接触仍在进行，但核心政治与军事诉求未现任何妥协让步迹象。",
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
        "延续：前沿防空对抗与远程巡航武器拦截保持常态，未升级为全域地面战。",
        "延续：各方战略部署维持威慑对峙，交火主要集中在海上通道与周边空域。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO 通报多起商船在海峡东向通道遭遇射弹及水雷受损事件。",
        "延续：常规商业船运流量继续低于 50%，绕航好望角与暗舱隐蔽航行并存。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：非中东原油增产预期叠加利比亚输油恢复，部分抵消中东地缘溢价。",
        "延续：Brent 原油盘整于 $85–$89 区间，市场呈现近月抗跌远月过剩特征。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：多哈间接外交沟通渠道维持运转，但美伊双方核心立场毫无让步。",
        "变化：华盛顿加紧调查针对航运设施的网络战威胁，对外释放警戒信号。"
      ]
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹关键水道呈现常态化非对称封锁与袭扰，商业航运体系承担高昂溢价。",
      "外部大国介入局限于护航、情报与远程防御，尚未外溢至全面直面对决。",
      "外交谈判通道受阻于根本性地缘诉求分歧，中短期缺乏快速终局协议契机。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方要求伊方实质核让步并停止对区域代理人支持，而德黑兰坚持解除全部海上封锁与金融制裁作为谈判前置条件。"
    ],
    military: [
      "美军区域前沿联合护航机制与伊朗依托低成本水雷、无人机及网络手段的非对称封锁对抗陷入消耗僵局。"
    ]
  },
  scoreTrend: [
    {
      date: "11-20",
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 72,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "波斯湾与红海前沿交火维持互射与无人机防空拦截态势，未出现全面地面冲突",
      description: "波斯湾与红海前沿交火维持互射与无人机防空拦截态势，未出现全面地面冲突。",
      verification: "single",
      timestamp: "2026-11-24（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "海峡水雷与商船受击事件增加，商业通航量降至危机前 50% 以下并高度依赖暗舱转运",
      description: "海峡水雷与商船受击事件增加，商业通航量降至危机前 50% 以下并高度依赖暗舱转运。",
      verification: "single",
      timestamp: "2026-11-24（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-11-24",
  version: "v2.263",
  riskScore: 72,
  keyChange: "Frequent commercial tanker incidents in Hormuz offset by macro supply recovery; indirect Doha diplomatic channels fail to bridge core demands, keeping risk score sticky at elevated levels.",
  investmentSignal: "→ Maintain hedges across energy and commodities volatility, adopt defensive portfolio positioning, and manage high-beta risk asset exposure.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D269",
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
      value: "WTI $79.07–$82.13 · Brent $85.65–$88.86",
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
      description: "Direct engagements and air defense interceptions remain sustained in maritime perimeters without full-scale ground escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Mines and vessel strikes keep commercial maritime flows down over 50%, with high reliance on dark transits and bypass routes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Crude benchmarks oscillate in the $79-$89 band as non-Gulf exports and Libyan pipeline resumption buffer geopolitical premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains multi-carrier strike group presence, escort logistics, and opens inter-agency cyber-warfare probes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Mediated talks via Doha remain active but locked in irreconcilable core political demands.",
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
        "Continue: Air defense interceptions and standoff missile salvos persist without regional land warfare expansion.",
        "Continue: Strategic deterrence forces maintain high alert posture across operational theaters."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO alerts confirm commercial tankers struck by mines and projectiles in the eastern transit corridor.",
        "Continue: Commercial traffic remains suppressed below 50% of peacetime baselines, relying on bypasses."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Restored Libyan pipeline shipments and Americas export growth curb sharp upside price spikes.",
        "Continue: Brent crude consolidates between $85 and $89 per barrel amid prompt supply tensions."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Doha backchannels operate continuously despite public rhetoric remaining uncompromising.",
        "Change: Washington initiates high-level investigations into cyber warfare against maritime energy transport."
      ]
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Hormuz bottleneck undergoes continuous asymmetric blockade measures, imposing high war-risk insurance premiums.",
      "Great power intervention focuses on convoy protection and intelligence integration, avoiding all-out direct assault.",
      "Diplomatic tracks remain stalled over non-negotiable territorial and sanctions terms, preventing near-term resolution."
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "Washington demands verifiable nuclear rollbacks and cessation of proxy support, while Tehran conditions talks on the total lifting of the naval blockade and sanctions."
    ],
    military: [
      "Allied defensive naval task forces are caught in an asymmetric attrition loop against low-cost Iranian naval mines, drones, and cyber harassment."
    ]
  },
  scoreTrend: [
    {
      date: "11-20",
      score: 70
    },
    {
      date: "11-21",
      score: 70
    },
    {
      date: "11-22",
      score: 70
    },
    {
      date: "11-23",
      score: 72
    },
    {
      date: "11-24",
      score: 72,
      active: true
    }
  ],
  change: "none",
  prevRiskScore: 72,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Direct engagements and air defense interceptions remain sustained in maritime perimeters withou…",
      description: "Direct engagements and air defense interceptions remain sustained in maritime perimeters without full-scale ground escalation.",
      verification: "single",
      timestamp: "2026-11-24 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Mines and vessel strikes keep commercial maritime flows down over 50%, with high reliance on da…",
      description: "Mines and vessel strikes keep commercial maritime flows down over 50%, with high reliance on dark transits and bypass routes.",
      verification: "single",
      timestamp: "2026-11-24 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.263 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：霍尔木兹商船袭扰事件频发但供应增量缓解短缺，美伊多哈间接接触难掩核心诉求鸿沟，地缘评分维持高位高黏滞。",
    bannerWarning: "→ 维持能源与大宗商品波动对冲，采取防御配置策略并适度控制高贝塔风险资产仓位。",
    deescalationIntent: "美方要求伊方实质核让步并停止对区域代理人支持，而德黑兰坚持解除全部海上封锁与金融制裁作为谈判前置条件。",
    structuralRisk: "海峡水雷与商船受击事件增加，商业通航量降至危机前 50% 以下并高度依赖暗舱转运。",
    contradictionNote: "美方要求伊方实质核让步并停止对区域代理人支持，而德黑兰坚持解除全部海上封锁与金融制裁作为谈判前置条件。；美军区域前沿联合护航机制与伊朗依托低成本水雷、无人机及网络手段的非对称封锁对抗陷入消耗僵局。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第269天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.263 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Frequent commercial tanker incidents in Hormuz offset by macro supply recovery; indirect Doha diplomatic channels fail to bridge core deman…",
    bannerWarning: "→ Maintain hedges across energy and commodities volatility, adopt defensive portfolio positioning, and manage high-beta…",
    deescalationIntent: "Washington demands verifiable nuclear rollbacks and cessation of proxy support,…",
    structuralRisk: "Mines and vessel strikes keep commercial maritime flows down over 50%, with high reliance on dark t…",
    contradictionNote: "Washington demands verifiable nuclear rollbacks and cessation of proxy support, while Tehran conditions talks on the total lifting of the naval blockade and sa…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 269",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
