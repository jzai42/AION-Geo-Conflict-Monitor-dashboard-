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
  date: "2026-06-23",
  version: "v2.104",
  riskScore: 40,
  keyStats: [
    {
      label: "冲突天数",
      value: "D115",
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
      value: "WTI $73.25–$73.86 · Brent $77.70–$77.91",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "航道逐步复航",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美伊建立军事直连热线以防止误判，代理人冲突暂缓。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "航道流量回升至战前三成，保险费率高位松动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美方发放60天制裁豁免，布油跌破80美元关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "大国博弈重心转向外交框架，军事部署维持威慑但未增派。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "瑞士谈判进入具体工作组阶段，达成60天和平路线图。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊建立霍尔木兹海峡「海上热线」",
      description: "卡塔尔官员确认，美伊已建立直接通信渠道，旨在减少航行误判风险，确保和平路线图执行期间的航道安全。",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "美国发布60天伊朗原油出口豁免",
      description: "特朗普政府宣布为期60天的制裁宽限期，允许伊朗在合规范围内出口原油，此举显著压低了全球油价溢价。",
      verification: "confirmed",
      timestamp: "2026-06-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "瑞士技术谈判进入核查细节讨论",
      description: "驻日内瓦代表团开始讨论资产冻结解除与核活动的对应核查标准，尽管IAEA准入仍有分歧。",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊达成初步14点合作备忘录，进入60天验证期。",
      "能源市场供应焦虑大幅缓解，地缘溢价回落至$3/桶以内。",
      "航道管理权仍是长期争议焦点，但短期内双方同意不收通行费。"
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
        "变化：美伊建立军事直连热线以防止误判，代理人冲突暂缓。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：航道流量回升至战前三成，保险费率高位松动。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方发放60天制裁豁免，布油跌破80美元关口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：大国博弈重心转向外交框架，军事部署维持威慑但未增派。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求的全面核查与伊朗坚持的主权安全底线仍未对齐。",
      "国内强硬派对瑞士备忘录的让步条款持有异议。"
    ],
    military: [
      "霍尔木兹海峡长期的行政管理权归属问题仍悬而未决。",
      "黎巴嫩边境的不确定性可能随时打破当前的战略平静。"
    ]
  },
  scoreTrend: [
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40
    },
    {
      date: "06-22",
      score: 40
    },
    {
      date: "06-23",
      score: 40,
      active: true
    }
  ],
  keyChange: "美伊确立60天外交观察窗口，能源溢价显著消退，综合风险进入低位平台期。",
  investmentSignal: "→ 维持对冲，关注能源回落后的防御性布局，逐步增持受压制的风险资产。",
  change: "none",
  prevRiskScore: 40,
  webSources: [
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr8uQufhVkhmGA-jAMIRx6Y5lHxAfH6772nEplYSQFdETnL-RW-_T-bRiaXhJp__OgSj7xWWziTk-Ud2ZpZgWUHQbbs4kXCMdNKMPdaNzlqCdTc9YMCyqvYSqXR6_1fNskplxBbBPzvhvDOnEXfARFbmcF8fhkh5IicbGVbNnQeu5-bgp0g-QDyWvrwgLFr7ofQU8G15O50B-UVFuBb2o="
    },
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHOs88TMEC3L0wbEK9gAafzFgfGqxd7gB8_I3z3K-WqVredzuY9c6kTiaptu-nWHkxRWjtR_eG00GwZueHvLFXFlpqLSeGdeePiU8R-eFc7dRGz3HdS81A6UEoYzdWYDrEU14wKi7afz8wzpMVN8f8Z9NustSkAqR0xTEN8f7aZFkObzq7tmvOmdWd8I76VUQ=="
    },
    {
      title: "nv.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8tFMBTvKSY5BZD374PwI_GnxTTFUuw9nRbAZALhaU2n6PMLTr5exmtSDdKkj8heWQPfSyUHbNiQofyR4oLmq7gaypRB2deii6CJVn9-zD9Mf3M-bG3JQmTKX14LOn7DFxnzGtw_OH7IsmePEQCJRGA_j0GySP-aV8cg8kHUZuUDJ-sNWG-GhGJrKzBl3WMmF8lW0sEyyjdu9tlQUijXh1ggk="
    },
    {
      title: "splash247.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3kM7GJNk1ggPB-4_2CplPjG5qU5eUbnTTPm9YgnT22B8G3abLFewsNX54TCx6fL8cduAPZ4EvURSEN1x3tRboaNC2gs9eqXs7ZP6JLUUnKfxIZ66BGC59U7KayG3yeERRmvufqd3ACihEtagsmBgyoOpgQpM="
    },
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFdXqKiEiy5-pkp7C5hDuaNESkR41GJvYNyE0BaGd5fRjLBuel8e5IJmUMndJOYjdQoORxY3aVmuXxLoViu14aUKXL-Mbl-MtuNsR88zbQvstbPWbhdJcMWBcwbhCHZFR6aC4ZDPz2cB4YWsGzgrLCc2JZwrieY3W9XHD8CzoBbGPBCpfAsXWLmw6q-Lg8eAytw-thrgeeMf9eh0PAaLAEKdf7idCQzd9pv13AfUSpuNJ4b0YKYn1L2zxJ23Xd9b1HweaHDDppqdzPV4-Lm7gUUyeGxtAz51BMdmYNrnAv0lhsveSQiDWdC-Ca2g=="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFDJfKtXCUNZMpJ4VNw1ZME-vA9uLQPmIkTa03kvPVm9XrRNybEtAHYQyYLzbjajz4DY3j5kiR0JJZ7NuNnY9OMFoduOb6QvkFfnwXA3dl9gXkMVm6PjsKdBf3EH04j5QHhVjPhN4pns1C4MziSZ94gjvSexBpQ45dE-DH_pZemZN2RAvTV71F3PyMtHojrG_Kzp0TsbQm1tGgXjduCJr-fnMIyzwM9dDZXqk4eU_fZeojQUxKmjt5h79bRbX4sx1N2kqqCpFv5B40="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHRAKkdCM5h9MiSzjoHhO49EI2RhAn_ulPs0RxY0NcTUJjN60RH7Pg3E0rkt0fIOQfizdsg_GmnGkwPJWiS3MZuZ2PBdbPkb1356x4hPnJ_CTaBS2pQ1l7e"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 23 2026 forecast trends",
    "US Iran relations news June 23 2026 Reuters Bloomberg",
    "Hormuz Strait shipping status June 23 2026 report"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-23",
  version: "v2.104",
  riskScore: 40,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D115",
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
      value: "WTI $73.25–$73.86 · Brent $77.70–$77.91",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Gradual Resumption",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Hotline established between US and Iran to prevent miscalculation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Traffic rising to 30% of pre-war levels; insurance premiums softening.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "US issues 60-day sanctions waiver; Brent falls below $80.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "US shifts focus from military deterrence to diplomatic leverage.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Technical talks entering working-group stage in Switzerland.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran 'Maritime Hotline' Established",
      description: "A direct communication channel has been opened to reduce risks during the 60-day interim agreement period.",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "US Issues 60-Day Oil Sanctions Waiver",
      description: "Trump administration permits Iranian oil exports for 60 days to stabilize global energy markets during talks.",
      verification: "confirmed",
      timestamp: "2026-06-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Burgenstock Technical Talks Begin",
      description: "Delegations discuss specific criteria for asset unfreezing and nuclear monitoring in Switzerland.",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Initial 14-point MoU signed, entering a 60-day verification phase.",
      "Energy supply anxiety significantly eased; risk premiums under $3/bbl.",
      "Long-term sovereignty over the Strait remains a friction point but is managed via hotline."
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
        "Change: Hotline established between US and Iran to prevent miscalculation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Traffic rising to 30% of pre-war levels; insurance premiums softening."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US issues 60-day sanctions waiver; Brent falls below $80."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US shifts focus from military deterrence to diplomatic leverage."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Gap remains between US verification requirements and Iranian sovereignty concerns.",
      "Internal hardliners in both nations question the Swiss MoU's concessions."
    ],
    military: [
      "Administrative control of the Strait of Hormuz remains legally unresolved.",
      "Lebanon border tensions could still disrupt the current regional truce."
    ]
  },
  scoreTrend: [
    {
      date: "06-19",
      score: 40
    },
    {
      date: "06-20",
      score: 40
    },
    {
      date: "06-21",
      score: 40
    },
    {
      date: "06-22",
      score: 40
    },
    {
      date: "06-23",
      score: 40,
      active: true
    }
  ],
  keyChange: "The 60-day diplomatic window has suppressed energy premiums; risk score stabilizes at lower levels.",
  investmentSignal: "→ Maintain defensive posture while gradually reducing energy hedges and increasing exposure to risk assets.",
  change: "none",
  prevRiskScore: 40,
  webSources: [
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr8uQufhVkhmGA-jAMIRx6Y5lHxAfH6772nEplYSQFdETnL-RW-_T-bRiaXhJp__OgSj7xWWziTk-Ud2ZpZgWUHQbbs4kXCMdNKMPdaNzlqCdTc9YMCyqvYSqXR6_1fNskplxBbBPzvhvDOnEXfARFbmcF8fhkh5IicbGVbNnQeu5-bgp0g-QDyWvrwgLFr7ofQU8G15O50B-UVFuBb2o="
    },
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHOs88TMEC3L0wbEK9gAafzFgfGqxd7gB8_I3z3K-WqVredzuY9c6kTiaptu-nWHkxRWjtR_eG00GwZueHvLFXFlpqLSeGdeePiU8R-eFc7dRGz3HdS81A6UEoYzdWYDrEU14wKi7afz8wzpMVN8f8Z9NustSkAqR0xTEN8f7aZFkObzq7tmvOmdWd8I76VUQ=="
    },
    {
      title: "nv.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8tFMBTvKSY5BZD374PwI_GnxTTFUuw9nRbAZALhaU2n6PMLTr5exmtSDdKkj8heWQPfSyUHbNiQofyR4oLmq7gaypRB2deii6CJVn9-zD9Mf3M-bG3JQmTKX14LOn7DFxnzGtw_OH7IsmePEQCJRGA_j0GySP-aV8cg8kHUZuUDJ-sNWG-GhGJrKzBl3WMmF8lW0sEyyjdu9tlQUijXh1ggk="
    },
    {
      title: "splash247.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3kM7GJNk1ggPB-4_2CplPjG5qU5eUbnTTPm9YgnT22B8G3abLFewsNX54TCx6fL8cduAPZ4EvURSEN1x3tRboaNC2gs9eqXs7ZP6JLUUnKfxIZ66BGC59U7KayG3yeERRmvufqd3ACihEtagsmBgyoOpgQpM="
    },
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFdXqKiEiy5-pkp7C5hDuaNESkR41GJvYNyE0BaGd5fRjLBuel8e5IJmUMndJOYjdQoORxY3aVmuXxLoViu14aUKXL-Mbl-MtuNsR88zbQvstbPWbhdJcMWBcwbhCHZFR6aC4ZDPz2cB4YWsGzgrLCc2JZwrieY3W9XHD8CzoBbGPBCpfAsXWLmw6q-Lg8eAytw-thrgeeMf9eh0PAaLAEKdf7idCQzd9pv13AfUSpuNJ4b0YKYn1L2zxJ23Xd9b1HweaHDDppqdzPV4-Lm7gUUyeGxtAz51BMdmYNrnAv0lhsveSQiDWdC-Ca2g=="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFDJfKtXCUNZMpJ4VNw1ZME-vA9uLQPmIkTa03kvPVm9XrRNybEtAHYQyYLzbjajz4DY3j5kiR0JJZ7NuNnY9OMFoduOb6QvkFfnwXA3dl9gXkMVm6PjsKdBf3EH04j5QHhVjPhN4pns1C4MziSZ94gjvSexBpQ45dE-DH_pZemZN2RAvTV71F3PyMtHojrG_Kzp0TsbQm1tGgXjduCJr-fnMIyzwM9dDZXqk4eU_fZeojQUxKmjt5h79bRbX4sx1N2kqqCpFv5B40="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHRAKkdCM5h9MiSzjoHhO49EI2RhAn_ulPs0RxY0NcTUJjN60RH7Pg3E0rkt0fIOQfizdsg_GmnGkwPJWiS3MZuZ2PBdbPkb1356x4hPnJ_CTaBS2pQ1l7e"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 23 2026 forecast trends",
    "US Iran relations news June 23 2026 Reuters Bloomberg",
    "Hormuz Strait shipping status June 23 2026 report"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.104 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美伊确立60天外交观察窗口，能源溢价显著消退，综合风险进入低位平台期。",
    bannerWarning: "→ 维持对冲，关注能源回落后的防御性布局，逐步增持受压制的风险资产。",
    deescalationIntent: "美方要求的全面核查与伊朗坚持的主权安全底线仍未对齐。",
    structuralRisk: "航道流量回升至战前三成，保险费率高位松动。",
    contradictionNote: "美方要求的全面核查与伊朗坚持的主权安全底线仍未对齐。；霍尔木兹海峡长期的行政管理权归属问题仍悬而未决。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第115天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.104 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): The 60-day diplomatic window has suppressed energy premiums; risk score stabilizes at lower levels.",
    bannerWarning: "→ Maintain defensive posture while gradually reducing energy hedges and increasing exposure to risk assets.",
    deescalationIntent: "Gap remains between US verification requirements and Iranian sovereignty concer…",
    structuralRisk: "Traffic rising to 30% of pre-war levels; insurance premiums softening.",
    contradictionNote: "Gap remains between US verification requirements and Iranian sovereignty concerns.; Administrative control of the Strait of Hormuz remains legally unresolved.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 115",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
