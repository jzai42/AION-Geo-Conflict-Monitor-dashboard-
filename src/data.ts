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
  date: "2026-10-15",
  version: "v2.222",
  riskScore: 72,
  keyChange: "霍尔木兹商船遇袭沉没加剧封锁担忧，美国拟放宽油轮制裁抗衡运费暴涨，油价与综合分维持高位黏滞。",
  investmentSignal: "→ 维持大宗商品与能源多头底仓，配置海外航运运力受限标的与防御性避险资产，克制增持权益类风险资产。",
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗军方及代理人加大对海峡商船的打击频次并造成实际沉船损失。",
      "美军前沿巡航与外交施压并举，同时寻求运力政策调整平抑能源运输成本。",
      "短期内双方均未跨入全面决战门槛，但封锁对抗将局势锚定在危险的高位平衡。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  keyStats: [
    {
      label: "冲突天数",
      value: "D229",
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
      value: "WTI $92.46–$94.80 · Brent $103.38–$106.01",
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
      description: "多战线交火与跨国纵深打击持续，红海与沙特东部能源节点面临常态化防空交战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "两艘商业货轮接连遇袭沉没，海峡通行量低于常态50%，班轮公司面临天价战争保费。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油稳居100-120美元危机带，现货端受制于运费飙升，美方运力豁免预期限制上行速度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战区常态化拦截与航母打击群威慑，政策重心转向能源物流托底。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美伊首脑隔空表态展现强硬底线，间接磋商渠道受制于前线战事升级而停滞不前。",
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
        "延续：也门胡塞武装对沙特东部能源重镇及阿美总部实施远程巡航导弹打击。",
        "延续：美军中央司令部维持对也门及海湾空域导弹发射阵地的常态化先发打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：一艘集装箱船与一艘散货船在霍尔木兹外围遇袭沉没，商船过境流量进一步探底。",
        "延续：国际主流船东推迟复航计划，超大型油轮单程运费维持极端高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方释放评估放宽部分运油影子船队制裁信号，抑制油价恐慌性跳涨。",
        "延续：布伦特原油在103-106美元区间内呈现高位承压宽幅震荡态势。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方公开质问伊方谈判代表代表性，伊议长强硬表态抗击霸权，互信机制受挫。",
        "延续：第三国外交斡旋渠道维持开启，但缺乏停火核心条款共识。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均受制于国内强硬派舆论与停火门槛要价，无法在先停火还是先解封上达成妥协。"
    ],
    military: [
      "伊朗非对称无人机与水雷封锁成本低廉，与美军高昂的高精度防空拦截形成消耗战错配。"
    ]
  },
  scoreTrend: [
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "evt-20261015-01",
      title: "霍尔木兹海峡连续两艘商船遇袭沉没",
      description: "UKMTO与路透社证实，两艘分别挂新加坡旗和散货运力的商业船只在霍尔木兹咽喉水域遭投射物击中后沉没，海峡航行风险升至极高点。",
      verification: "confirmed",
      timestamp: "2026-10-14T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20261015-02",
      title: "美国考虑豁免影子舰队以抑平海运费率",
      description: "路透社报道称，面对波斯湾创纪录的油轮运费，美国政府正商讨允许此前受制裁的部分油轮在申请许可后运输非受限原油，以平抑全球油价溢价。",
      verification: "confirmed",
      timestamp: "2026-10-15T03:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20261015-03",
      title: "胡塞武装导弹袭击沙特阿美达兰总部",
      description: "美联社与CBS报道，也门胡塞武装对沙特东部达兰阿美总部发射弹道导弹与自杀式无人机，多处防空警报拉响，引发区域能源基础设施安保升级。",
      verification: "confirmed",
      timestamp: "2026-10-14T18:30:00Z",
      significance: ""
    },
    {
      id: "evt-20261015-04",
      title: "美伊高层言论展现谈判鸿沟",
      description: "阿纳多卢通讯社报道，特朗普公开表态战争很快会结束但质疑伊方权力中枢谈判代表身份，伊朗议长卡利巴夫则在议会声称绝不向霸凌屈服，外交突破停滞。",
      verification: "confirmed",
      timestamp: "2026-10-15T05:30:00Z",
      significance: ""
    }
  ],
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-15",
  version: "v2.222",
  riskScore: 72,
  keyChange: "Vessel sinkings near Hormuz intensify chokepoint blockade concerns, while US consideration of shadow-fleet sanction relief tempers runaway freight spikes, keeping risk sticky at 72.",
  investmentSignal: "→ Maintain long exposure in commodities and energy while prioritizing defensive hedging assets over broad risk assets.",
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran and allied factions intensify tactical strikes against commercial vessels, causing confirmed hull sinkings.",
      "US forces sustain maritime defensive escorts while exploring regulatory relief to curb freight price shocks.",
      "Neither side is initiating an all-out ground conflict, locking the standoff into a precarious, elevated equilibrium."
    ],
    note: "For monitoring only; not investment advice."
  },
  keyStats: [
    {
      label: "Conflict Days",
      value: "D229",
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
      value: "WTI $92.46–$94.80 · Brent $103.38–$106.01",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Disruption",
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
      description: "Multi-front standoffs persist alongside ballistic strikes against Saudi Arabian energy infrastructure and Gulf installations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Two commercial vessels sank following projectile hits near the strait, keeping transit traffic severely constrained below 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude holds firmly within the $100-$120 crisis band, with physical cargo prices driven by historic tanker freight premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US military posture maintains intensive combat air patrols and escort missions without crossing into large-scale ground deployment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Backchannel diplomacy exists but public leadership rhetoric remains defiant, forestalling structured ceasefire progress.",
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
        "Continue: Houthi forces maintain ballistic missile and drone volleys targeting Saudi Aramco regional infrastructure.",
        "Continue: US CENTCOM maintains active defensive intercepts and strikes against regional launch positions."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Sinking of two commercial vessels near the chokepoint drives war-risk insurance rates to fresh highs.",
        "Continue: Commercial container and tanker operators continue wide diversions around the Arabian Peninsula."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: News of US discussions on sanction relief for shadow tankers injects modest downward pressure on prompt freight.",
        "Continue: Brent crude trades steadily within the $103-$106 band amidst ongoing supply vulnerability."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington publicly questions Iranian negotiation counterparts while Tehran pledges unyielding resistance.",
        "Continue: Regional third-party diplomatic envoys sustain communication channels without concrete breakthroughs."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Neither Washington nor Tehran possesses sufficient domestic political leeway to concede first on preconditions for a formal truce."
    ],
    military: [
      "Asymmetric low-cost drone and missile interdiction exploits an unfavorable cost-exchange ratio against high-end coalition air defenses."
    ]
  },
  scoreTrend: [
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72,
      active: true
    }
  ],
  events: [
    {
      id: "evt-20261015-01",
      title: "Two commercial vessels sink following projectile strikes near Hormuz",
      description: "UKMTO and Reuters report that two merchant ships sank near the Strait of Hormuz after sustaining projectile hits, underscoring heightened physical transit peril.",
      verification: "confirmed",
      timestamp: "2026-10-14T22:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-20261015-02",
      title: "US considers sanction relief for shadow tankers to rein in shipping costs",
      description: "Reuters reports the Trump administration is weighing permissions for previously sanctioned shadow tankers to transport non-sanctioned crude to cool record tanker freight rates.",
      verification: "confirmed",
      timestamp: "2026-10-15T03:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-20261015-03",
      title: "Houthi missile barrage targets Aramco headquarters in Dhahran",
      description: "AP and CBS News report Yemen's Houthis launched cruise missiles and drones against Saudi Aramco facilities in Dhahran, triggering air defense alerts across the Eastern Province.",
      verification: "confirmed",
      timestamp: "2026-10-14T18:30:00Z",
      significance: ""
    },
    {
      id: "evt-20261015-04",
      title: "US and Iranian leadership rhetoric highlights wide diplomatic impasse",
      description: "Anadolu Agency reports President Trump noted the war should end soon but questioned who to negotiate with, while Iranian Speaker Ghalibaf reiterated defiance against external coercion.",
      verification: "confirmed",
      timestamp: "2026-10-15T05:30:00Z",
      significance: ""
    }
  ],
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.222 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：霍尔木兹商船遇袭沉没加剧封锁担忧，美国拟放宽油轮制裁抗衡运费暴涨，油价与综合分维持高位黏滞。",
    bannerWarning: "→ 维持大宗商品与能源多头底仓，配置海外航运运力受限标的与防御性避险资产，克制增持权益类风险资产。",
    deescalationIntent: "美伊双方均受制于国内强硬派舆论与停火门槛要价，无法在先停火还是先解封上达成妥协。",
    structuralRisk: "两艘商业货轮接连遇袭沉没，海峡通行量低于常态50%，班轮公司面临天价战争保费。",
    contradictionNote: "美伊双方均受制于国内强硬派舆论与停火门槛要价，无法在先停火还是先解封上达成妥协。；伊朗非对称无人机与水雷封锁成本低廉，与美军高昂的高精度防空拦截形成消耗战错配。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第229天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.222 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Vessel sinkings near Hormuz intensify chokepoint blockade concerns, while US consideration of shadow-fleet sanction relief tempers runaway …",
    bannerWarning: "→ Maintain long exposure in commodities and energy while prioritizing defensive hedging assets over broad risk assets.",
    deescalationIntent: "Neither Washington nor Tehran possesses sufficient domestic political leeway to…",
    structuralRisk: "Two commercial vessels sank following projectile hits near the strait, keeping transit traffic seve…",
    contradictionNote: "Neither Washington nor Tehran possesses sufficient domestic political leeway to concede first on preconditions for a formal truce.; Asymmetric low-cost drone a…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 229",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
