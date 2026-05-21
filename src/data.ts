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
  date: "2026-05-21",
  version: "v2.71",
  riskScore: 76,
  scoreTrend: [
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74
    },
    {
      date: "05-21",
      score: 76,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D82",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $96.97–$99.96 · Brent $104.26–$106.46",
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
      description: "美军确认拦截多架针对海上资产的自杀式无人机，双方均维持高等级戒备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道实质处于封锁与拦截并行的受限状态，通行量远低于正常水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "油价虽有回落但仍稳居百美元关口以上，市场对供应长期中断感到担忧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "周边大国与卡塔尔等中介方积极斡旋，避免全面战争爆发。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "部分证实：外交渠道重启，美方称接近协议，但核心条款分歧依然巨大。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普称外交协议进入尾声",
      description: "特朗普公开表示美伊谈判取得实质性突破，油价应声回落。",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "布伦特原油跌破110美元",
      description: "受谈判预期影响，布伦特原油单日回撤超过 5%，收于 $105.16 附近。",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美军霍尔木兹拦截无人机",
      description: "中央司令部确认击落 3 架来袭无人机，冲突风险仍在高位。",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议依然有效但名存实亡，海上摩擦加剧",
      "外交谈判释放混合信号，市场情绪极度敏感",
      "全球能源供应链处于高成本适应期"
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
        "延续：美海军第五舰队维持对伊朗港口的封锁监测。",
        "变化：美军开始常态化拦截针对民用商船的低空无人机攻击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗维持对通过海峡船只的身份核查与强制引航。",
        "变化：美国“自由行动”拦截多艘疑似转运被制裁油品的货船。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于预期协议达成，短期投机资金撤离，油价单日跌幅创三周新高。",
        "延续：实货市场因霍尔木兹通航不足 50% 依然保持高升水。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普改口称其目标是“快速结束战争”而非政权更迭。",
        "延续：德黑兰内部强硬派拒绝在制裁完全解除前签署正式文本。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压与国内大选对能源降价的需求",
      "伊朗主权尊严与国内经济崩溃压力的对抗"
    ],
    military: [
      "霍尔木兹海峡控制权的争夺与自由航行权冲突"
    ]
  },
  keyChange: "油价从恐慌性上涨转为震荡下行，但外交信号存在高度不确定性。",
  investmentSignal: "→ 维持对冲，增持能源大宗。",
  change: "none",
  prevRiskScore: 74,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZlhkI5GQ0z0HrpjNmlvgNxaKAXM4he-qAYlgbpLZaAE_3X5_yZmrIH3B3tj0Fo3Zp0lnq04nBuTnWfVW1-ieHEsWkZV2C5UZr8vVhNE1cBn0TFFyInkgRJ5wQK3eVALmo1P9CvUQVOLzZyvToRiBsFc_DfotEvoDNzw=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYzypYtLjv9AWujG28tQBRjTTVSS0hMIr51qe7RM_J-6k2lX5kD993gEhvGCmPPh9Tm8GIvtqBDkI7Soou-A86IgWtz_r0roFMkEuA21L2wZGQnwTNfowgrMJnlXDBygbqOKonuUqWijJedA=="
    },
    {
      title: "aljazeera.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESaZtMx2oibS2ncbbJZlZf2v6t7q7yRy56rwuYWouDNjTJ39UOejyHXZnQVpJYS0sR9z8cwFPQoaEpULHpDXhANXHVUCdEgWyhV5SX_vJ7iLfzdqmPPYz3hvVNLu8YhqrADkATwvMXmkBbzX03PNSq0UUoN9nONV9ZjTi0UzV8tHkIy7hCzuVsPsrLzXW0_4PU6jlpj2IESpgo4thYJA=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGL-JfxdDdJlJRUUxePg8o0fYPRahyXUU3fBJ12Z35jPbHkFFiy0h_eNeuT8FXdaKXclZJvSCKc_2SdXf4IPSWsK5xN7pgf3c3OtxIp42MWze7aPHKhw7fwNkuRy_h967o_x5_Ydx0iAA=="
    },
    {
      title: "dailynewsegypt.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF47xOGlyJg8eiJ_l05MrutqaP4HzPZvQCWwa-V6MglBV-q6IaE5BiHk923RjnjKp9UWUCNw2fvHT1rf8pvI1a3KrtuJolRRwZLHMno9r8ZXTwhbjF9buASbE-xWFW-pGAUlm4oZKzQ672dalqadZfyOFx86y325MyR3WqKO_Aq3e2yjmUvTMWMrfbw6ukJTwDOWtDaPiZafGQgKdqDTdlB3sKkEwQREswoh0g6JjQ="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOGqL1yTACSF_kFdiEzQpn73NlfLZMWQSPXQWjDj_B3v47KS8GRHtYY9A9Dqvh8yz-51XwJAqROVbXOm4vKot4wSgp-QptvLtO3phAjOoOu6OcmAWSegn6R2gZMwVNejfSqvgV_hRHg_M="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNofiC5uhJ7ZeNgz6dZc3HhwNE2qkjHft8hbKF13jFppjtJonSets3VcnYC4XSmy6KTKoM_YrZYmehiPVZ-BfKVW-rdKPV-I3N0oOLX2kBSEWrEJoH11gLUFjmtrhINzhZktIUl-Wwz90hcikOSuT7pA=="
    },
    {
      title: "newsweek.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFj7kZJU73Cg09VXbPZMb-AuNsTLPvIzstxqqQGqbnMgWwYx4H1r5m0jfEThbOPG_1S9EgPgL73nMRtzcfFsgVm1Z2xV4JjWjqs8sT_KYBfClZ3PL2tTLxHBbNrYO6k7OxkVr2Gs4qIcyOvwBGcIj7ODD9O1Xe7JcAluM6Gu4dRciQ-"
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYFaMq0IqUXP_oL2IhVnRp_sWtAdWSjUfdzqOiRYKaoPTOj-Cwpriv_-6zoVoX_Btoi9FRfVQWWyqzgHaelWhRr5gxgUCIArQA4BtCcjNkHxcJ4Nt_rEgxSbOtsRfe5WrKFZYLlu6tMw=="
    }
  ],
  webSearchQueries: [
    "US Iran naval tension news May 21 2026 scenario analysis",
    "WTI Brent oil price news 24h May 20 2024 May 21 2024",
    "current WTI Brent crude oil price range 2024-06-20"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-21",
  version: "v2.71",
  riskScore: 76,
  scoreTrend: [
    {
      date: "05-17",
      score: 80
    },
    {
      date: "05-18",
      score: 80
    },
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74
    },
    {
      date: "05-21",
      score: 76,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D82",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $96.97–$99.96 · Brent $104.26–$106.46",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US confirms intercepting drones targeting naval assets; both sides remain on high alert.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Shipping remains restricted with ongoing blockades and selective transit permissions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Prices retracted but remain in the critical $100+ zone due to structural supply risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Regional powers and mediators like Qatar active in preventing total war.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Partial: Diplomatic channels active with Trump claiming 'final stage' talks, though Tehran remains wary.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Claims Negotiation Final Phase",
      description: "President Trump states a deal with Iran is close, triggering a pullback in oil prices.",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Brent Oil Falls Below $110",
      description: "Crude futures drop over 5% as market bets on diplomatic resolution, closing near $105.",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "US Navy Intercepts Drones",
      description: "CENTCOM confirms downing of 3 attack drones in eastern Hormuz Strait.",
      verification: "confirmed",
      timestamp: "2026-05-21",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire technically survives despite naval skirmishes",
      "Mixed diplomatic signals keeping markets extremely volatile",
      "Energy markets adapting to long-term high-cost supply routes"
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
        "Continue: US 5th Fleet maintains blockade monitoring off Iranian ports.",
        "Change: US begins routine intercepts of low-altitude UAVs targeting merchant vessels."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iran maintains ID verification and forced pilotage in the Strait.",
        "Change: Operation Project Freedom intercepts multiple tankers carrying sanctioned oil."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Speculative retreat in oil prices as diplomatic hopes rise.",
        "Continue: Physical markets remain tight due to <50% normal Hormuz throughput."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump shifts rhetoric toward 'ending the war quickly' over regime change.",
        "Continue: Tehran hardliners refuse to sign any deal without total sanctions removal."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US 'Maximum Pressure' vs domestic demand for lower energy prices",
      "Iran's sovereignty vs economic collapse and regime survival"
    ],
    military: [
      "Control of the Strait of Hormuz vs International Freedom of Navigation"
    ]
  },
  keyChange: "Oil prices shifted from panic buying to a diplomatic discount, but core risks remain unresolved.",
  investmentSignal: "→ Maintain hedge, increase energy exposure.",
  change: "none",
  prevRiskScore: 74,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZlhkI5GQ0z0HrpjNmlvgNxaKAXM4he-qAYlgbpLZaAE_3X5_yZmrIH3B3tj0Fo3Zp0lnq04nBuTnWfVW1-ieHEsWkZV2C5UZr8vVhNE1cBn0TFFyInkgRJ5wQK3eVALmo1P9CvUQVOLzZyvToRiBsFc_DfotEvoDNzw=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYzypYtLjv9AWujG28tQBRjTTVSS0hMIr51qe7RM_J-6k2lX5kD993gEhvGCmPPh9Tm8GIvtqBDkI7Soou-A86IgWtz_r0roFMkEuA21L2wZGQnwTNfowgrMJnlXDBygbqOKonuUqWijJedA=="
    },
    {
      title: "aljazeera.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESaZtMx2oibS2ncbbJZlZf2v6t7q7yRy56rwuYWouDNjTJ39UOejyHXZnQVpJYS0sR9z8cwFPQoaEpULHpDXhANXHVUCdEgWyhV5SX_vJ7iLfzdqmPPYz3hvVNLu8YhqrADkATwvMXmkBbzX03PNSq0UUoN9nONV9ZjTi0UzV8tHkIy7hCzuVsPsrLzXW0_4PU6jlpj2IESpgo4thYJA=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGL-JfxdDdJlJRUUxePg8o0fYPRahyXUU3fBJ12Z35jPbHkFFiy0h_eNeuT8FXdaKXclZJvSCKc_2SdXf4IPSWsK5xN7pgf3c3OtxIp42MWze7aPHKhw7fwNkuRy_h967o_x5_Ydx0iAA=="
    },
    {
      title: "dailynewsegypt.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF47xOGlyJg8eiJ_l05MrutqaP4HzPZvQCWwa-V6MglBV-q6IaE5BiHk923RjnjKp9UWUCNw2fvHT1rf8pvI1a3KrtuJolRRwZLHMno9r8ZXTwhbjF9buASbE-xWFW-pGAUlm4oZKzQ672dalqadZfyOFx86y325MyR3WqKO_Aq3e2yjmUvTMWMrfbw6ukJTwDOWtDaPiZafGQgKdqDTdlB3sKkEwQREswoh0g6JjQ="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOGqL1yTACSF_kFdiEzQpn73NlfLZMWQSPXQWjDj_B3v47KS8GRHtYY9A9Dqvh8yz-51XwJAqROVbXOm4vKot4wSgp-QptvLtO3phAjOoOu6OcmAWSegn6R2gZMwVNejfSqvgV_hRHg_M="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNofiC5uhJ7ZeNgz6dZc3HhwNE2qkjHft8hbKF13jFppjtJonSets3VcnYC4XSmy6KTKoM_YrZYmehiPVZ-BfKVW-rdKPV-I3N0oOLX2kBSEWrEJoH11gLUFjmtrhINzhZktIUl-Wwz90hcikOSuT7pA=="
    },
    {
      title: "newsweek.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFj7kZJU73Cg09VXbPZMb-AuNsTLPvIzstxqqQGqbnMgWwYx4H1r5m0jfEThbOPG_1S9EgPgL73nMRtzcfFsgVm1Z2xV4JjWjqs8sT_KYBfClZ3PL2tTLxHBbNrYO6k7OxkVr2Gs4qIcyOvwBGcIj7ODD9O1Xe7JcAluM6Gu4dRciQ-"
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYFaMq0IqUXP_oL2IhVnRp_sWtAdWSjUfdzqOiRYKaoPTOj-Cwpriv_-6zoVoX_Btoi9FRfVQWWyqzgHaelWhRr5gxgUCIArQA4BtCcjNkHxcJ4Nt_rEgxSbOtsRfe5WrKFZYLlu6tMw=="
    }
  ],
  webSearchQueries: [
    "US Iran naval tension news May 21 2026 scenario analysis",
    "WTI Brent oil price news 24h May 20 2024 May 21 2024",
    "current WTI Brent crude oil price range 2024-06-20"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.71 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑2）：油价从恐慌性上涨转为震荡下行，但外交信号存在高度不确定性。",
    bannerWarning: "→ 维持对冲，增持能源大宗。",
    deescalationIntent: "美国极限施压与国内大选对能源降价的需求",
    structuralRisk: "航道实质处于封锁与拦截并行的受限状态，通行量远低于正常水平。",
    contradictionNote: "美国极限施压与国内大选对能源降价的需求；霍尔木兹海峡控制权的争夺与自由航行权冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第82天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.71 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑2): Oil prices shifted from panic buying to a diplomatic discount, but core risks remain unresolved.",
    bannerWarning: "→ Maintain hedge, increase energy exposure.",
    deescalationIntent: "US 'Maximum Pressure' vs domestic demand for lower energy prices",
    structuralRisk: "Shipping remains restricted with ongoing blockades and selective transit permissions.",
    contradictionNote: "US 'Maximum Pressure' vs domestic demand for lower energy prices; Control of the Strait of Hormuz vs International Freedom of Navigation",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 82",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
