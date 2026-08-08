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
  date: "2026-08-08",
  version: "v2.150",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D161",
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
      value: "WTI $76.20–$78.50 · Brent $81.80–$83.10",
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
      description: "美军维持对伊朗港口的动态封锁，前线交火烈度因谈判进入窗口期而有所放缓。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡流量维持极低水平，商业航运仍以非美系小型船舶试探通行为主。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价因降温预期回落，目前处于温和偏强波动区间。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国通过行政命令维持封锁，地区盟友（沙、土、巴）加强防御协作。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "阿曼斡旋方案获得双方原则性认同，协议框架已现，但细节执行仍具高度脆弱性。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊霍尔木兹协议谈判取得实质进展",
      description: "特朗普表示重新开放海峡的协议即将达成，或涉及 60 天临时通行期，美方要求以此换取伊方停止对盟友攻击。",
      verification: "confirmed",
      timestamp: "2026-08-07 22:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "海峡通行量维持常态 4% 水平",
      description: "尽管谈判乐观，但物理封锁现状未改，船舶追踪数据显示 8 月 7 日仅有极少量散货船通过。",
      verification: "confirmed",
      timestamp: "2026-08-07 15:00",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗警告支持美国的外交行动者",
      description: "伊朗革命卫队警告地区内协助美方封锁的国家将面临后续报复，显示内部仍有强硬派阻力。",
      verification: "single",
      timestamp: "2026-08-07 07:18",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "从单纯军事打击转向「以打促谈」的政治博弈阶段",
      "霍尔木兹海峡的控制权成为伊朗换取解除封锁的核心筹码",
      "大国介入力度已达峰值，进入成本管控与风险对冲期"
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
        "延续：美国海军维持对伊朗南部关键港口的远海阻绝",
        "延续：伊朗代理武装在伊拉克、叙利亚方向维持低烈度战术试探"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：谈判框架提出建立「阿曼-伊朗联合监管航道」，允许特定非美商船通行",
        "延续：保险巨头维持该区域极高战争险溢价，拒绝承保美资油轮"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：现货溢价因停火预期开始收窄，中资炼厂采购需求维持观望",
        "延续：全球成品油库存受供应阻断影响持续低位运行"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美财长贝森特称停火协议可能在 30-60 小时内获得重大进展",
        "延续：伊朗议会强调协议必须包含解除针对石油出口的核心制裁"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "特朗普政府急于在中期选举前平抑油价与通胀压力",
      "伊朗领导层在 सुप्रीम领袖去世后的权力平稳过渡需求与民族主义强硬立场的平衡"
    ],
    military: [
      "美军区域封锁的极高维持成本与对伊战略压榨效能的边际递减",
      "伊朗封锁霍尔木兹海峡带来的战略收益与潜在毁灭性报复之间的博弈"
    ]
  },
  scoreTrend: [
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70,
      active: true
    }
  ],
  keyChange: "谈判窗口实质开启，综合风险分出现台阶式下降。",
  investmentSignal: "→ 维持能源对冲防御，减持短期高风险地缘溢价仓位，关注风险资产波动弹性。",
  change: "down",
  prevRiskScore: 72,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFue-VX8hq448SStzLMspaTFpstvKoAvxFdP8jiXOMxIDI_yZu79Zud1ZlZnhMEq2QobbGbruJT1HJ_TjCyG5oRkGb_0kKzLDYtv2sJ8k0c9YdiuyiQJIjjX__2oAKBq98K2SScLmbeLHYVkfTlctPWfMYJR_Jx8n5urbIgLsBO"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 8 2024 trend Reuters Bloomberg",
    "US Iran conflict update August 8 2024 Pentagon statement IRGC",
    "Hormuz Strait shipping status August 8 2024 AP AFP"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-08",
  version: "v2.150",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D161",
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
      value: "WTI $76.20–$78.50 · Brent $81.80–$83.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains blockade of Iranian ports; fire intensity has slowed as a diplomatic window opens.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Passage remains at critical lows; commercial traffic is experimental and limited to non-US ships.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices have retreated due to cooling expectations, currently in a moderate-strong range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains carrier groups and blockade; regional allies bolster collective defense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Oman-brokered framework agreed in principle; however, execution details remain fragile.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Substantial Progress in US-Iran Hormuz Negotiations",
      description: "President Trump states a deal to reopen the strait is nearing completion, involving a possible 60-day transit window.",
      verification: "confirmed",
      timestamp: "2026-08-07 22:00",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Traffic Persists at 4% of Normal Levels",
      description: "Physical blockage continues despite diplomatic optimism; only 8 vessels tracked transiting on August 7.",
      verification: "confirmed",
      timestamp: "2026-08-07 15:00",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "IRGC Warns Regional Supporters of US Actions",
      description: "The IRGC warns countries aiding the blockade will face consequences, indicating internal hardline resistance.",
      verification: "single",
      timestamp: "2026-08-07 07:18",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from military strikes to a 'strike-to-negotiate' political phase",
      "Control of the Strait of Hormuz is Iran's primary leverage to lift the blockade",
      "Global powers reach peak involvement, shifting to risk hedging and cost management"
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
        "Continue: US Navy maintains deep-sea interdiction of critical Iranian ports",
        "Continue: Iranian proxies in Iraq/Syria maintain low-intensity tactical probes"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Framework proposes an 'Oman-Iran Joint Corridor' for specific commercial transit",
        "Continue: Insurers maintain extreme war risk premiums and refuse US-linked tankers"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Spot premiums narrowing as ceasefire hopes rise; refineries remain cautious",
        "Continue: Global product stocks remain at historical lows due to supply disruptions"
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US Treasury Sec Bessent hints at a breakthrough within 30-60 hours",
        "Continue: Iranian Majlis insists any deal must lift core oil export sanctions"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Trump administration urgency to stabilize oil/inflation before midterms",
      "Iranian leadership's need for stability post-succession vs. hardline nationalism"
    ],
    military: [
      "Sustainability costs of the US blockade vs. diminishing strategic returns",
      "Iran's leverage in Hormuz vs. the risk of a devastating kinetic response"
    ]
  },
  scoreTrend: [
    {
      date: "08-04",
      score: 74
    },
    {
      date: "08-05",
      score: 72
    },
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70,
      active: true
    }
  ],
  keyChange: "Substantial negotiation window opens, leading to the first significant score drop in recent days.",
  investmentSignal: "→ Maintain energy hedges, reduce short-term high-risk geopolitical premium positions, watch risk asset elasticity.",
  change: "down",
  prevRiskScore: 72,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFue-VX8hq448SStzLMspaTFpstvKoAvxFdP8jiXOMxIDI_yZu79Zud1ZlZnhMEq2QobbGbruJT1HJ_TjCyG5oRkGb_0kKzLDYtv2sJ8k0c9YdiuyiQJIjjX__2oAKBq98K2SScLmbeLHYVkfTlctPWfMYJR_Jx8n5urbIgLsBO"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 8 2024 trend Reuters Bloomberg",
    "US Iran conflict update August 8 2024 Pentagon statement IRGC",
    "Hormuz Strait shipping status August 8 2024 AP AFP"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.150 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↓2）：谈判窗口实质开启，综合风险分出现台阶式下降。",
    bannerWarning: "→ 维持能源对冲防御，减持短期高风险地缘溢价仓位，关注风险资产波动弹性。",
    deescalationIntent: "特朗普政府急于在中期选举前平抑油价与通胀压力",
    structuralRisk: "海峡流量维持极低水平，商业航运仍以非美系小型船舶试探通行为主。",
    contradictionNote: "特朗普政府急于在中期选举前平抑油价与通胀压力；美军区域封锁的极高维持成本与对伊战略压榨效能的边际递减",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第161天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.150 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↓2): Substantial negotiation window opens, leading to the first significant score drop in recent days.",
    bannerWarning: "→ Maintain energy hedges, reduce short-term high-risk geopolitical premium positions, watch risk asset elasticity.",
    deescalationIntent: "Trump administration urgency to stabilize oil/inflation before midterms",
    structuralRisk: "Passage remains at critical lows; commercial traffic is experimental and limited to non-US ships.",
    contradictionNote: "Trump administration urgency to stabilize oil/inflation before midterms; Sustainability costs of the US blockade vs. diminishing strategic returns",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 161",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
