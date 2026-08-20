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
  date: "2026-08-20",
  version: "v2.163",
  keyStats: [
    {
      label: "冲突天数",
      value: "D173",
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
      value: "WTI $84.30–$84.64 · Brent $91.47–$93.30",
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
      description: "伊朗试射导弹警告船舶且美军强化封锁执法。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通行量触及三个月低点，保险费率高企。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "布伦特维持在$92上方，市场对停火协议破裂进行定价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军在阿曼海域设立秘密运输走廊，直接军事引导油轮。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "60天停火备忘录到期失效，无后续对话机制。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议（MoU）正式失效，外部约束解除",
      "海峡控制权转入“秘密通道”对抗阶段",
      "能源溢价从短期恐慌转向结构性高位"
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
        "变化：伊朗军方调整战术，由对等报复转向“进攻性防御”。",
        "延续：美军维持对伊朗港口的封锁执法。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军建立秘密航道，绕开伊朗管理的常规水道。",
        "延续：商业船只大范围关闭AIS避险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油站稳$90上方。 (NDTV)",
        "延续：市场持续定价海峡长期受阻风险。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方公开拒绝延长停火。 (CNBC)",
        "延续：伊朗强硬派接管国家安全决策。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求永久性放弃核计划与伊朗要求解除全面封锁的对立"
    ],
    military: [
      "海峡通航自由权与伊朗主权管辖权的直接交火冲突"
    ]
  },
  scoreTrend: [
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
      score: 82
    },
    {
      date: "08-20",
      score: 82,
      active: true
    }
  ],
  keyChange: "美伊停火协议失效导致局势进入高位黏滞状态",
  investmentSignal: "→ 维持能源对冲，增加国防板块防御性配置。",
  change: "none",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "伊朗试射导弹警告船舶且美军强化封锁执法",
      description: "伊朗试射导弹警告船舶且美军强化封锁执法。",
      verification: "single",
      timestamp: "2026-08-20（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "通行量触及三个月低点，保险费率高企",
      description: "通行量触及三个月低点，保险费率高企。",
      verification: "single",
      timestamp: "2026-08-20（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "economictimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGW-Irz1oHQbcutqcQjk_cgS5VeFFweYAGze_Cw6ug5SGKp4QcQBw4ruAwPjUfSuIDJUzRpNlOBNam1TsdOAjweM4GT9QpSUiIxDZm2_MsGj7IcDzNTEam7u74C5lSt2jmWo7wzzd_2UfibEtIv4AddAk4R2tkzZ6mzJZc96u2frFAk6XgyqKX0fZGReVuZZTkvXdiTp8ArEqVjlKZHiBlNHBCosaQfR0P9ScLSg1OvQym6vhKwr75wh5QjTRjDVKzq8CjLqg7jFmk60PwDkc8nCKlJaGO9-XJ8ctbxwfSLm-yD6_d9Dc3OqiQ="
    },
    {
      title: "longforecast.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2kzUddDxXja8RvNVIhw8GOofvlcn_OBRg8cNevn2BJroCBF0wqEqkCI3UKxLh4Jmy6U7sJ1aeSxk-Xgy0QHD9uG8mlY3iefM-z6AI-I-3I7zQtn_psG-eC3UdfpmXscuEGPfH3r35PNQlRUoQBfVVunpDgwYVl9EVEJh-tDhNdRAh4Y57DcTi8w=="
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH_jufS5fpaJ3XhwHgRg5fZYOt1b-zJAwSpaAc3ZLsX4WLElAYZ_fnN9I8Q0ruga2TU4Ll5kj8Ns8mP_EAKDowTxlR1KsVu8u-drjKQSAEe9uVQOg8RinR-WOzXbAZu9exmDjqir4mAIrfmSKM88eiua-DSJFO3MvNNWc9EmtGJzJXAPgnsA=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEiHq4Q3nobu2jGak6ATRKRfIZz95QC4_whRffsCLY1e9VVaTathMqrg38EMZVXuQ5YRvvRTgO5vw5PJKS7ayUtLc4auSlrQFwXNol1CuScZYWZihNP2Pi7ElAgRY6A2O4="
    },
    {
      title: "seekingalpha.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELeWgr60M53zAPIOoMv717GJDuW-GQr-_cZc9h15UwmaQfZ9f7lRbMWmwYfjYkEe7I2DXAuNnaTWvyS7txVuUqrzrh1h7MGc9GHqhvgimZOgCEZMv1PL20fA92KRKxo5tSqPTA8Lz4ANXtFo5qzahsSuFs2xaSbkQT4yZhBfovESs6rxElghGtc2NXj3rmfJMZpqgIadFoIe1YhF7xxOMy0aNuK-sB8ymzMVGr"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYgyNNoj7z1rxPsOyj2iR9mTTfaNrhdMTV5Ih0usKZ65Ix_Ttez_nUhpqrLfP9apf99GIAS2-J_oPXwyeH4AEoLZI1RZXIWzWqtL8i_6nr10Bz200uzAuravMIZpTG6YMhHRPF5Q=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3_oiQ7EV5a6j__4NudHIJs_KnBlaQgI77zSqLra2KnQXeyeTkEWeFUsDPQgnIOE8TCWZDnM4xFhw_TOqkeg2CddsKEvoVdqk6fLNaOdoU2EtDFS6R57tTRVSNGvHEKIfX7ga8qNmBrxPt9mrTyVnP7twjjVl0_GqdCLDlQJOJYLm-eavTzeqFBLSiLlMJdhudOuz7k70="
    },
    {
      title: "cnbcafrica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2HZPa_irFgr3u0ZGW-EXyEoSdD_FSyXdlWthR9HGaXLLCsHmcNrTUkbvWF8Om71N3TiOH3yWCGQ5uXYXawju5pqowkNx9Mcz57mv4BEQpqYw8fTaM6k87DSw-7mCXpiksPqg5oDTv9XUKvUBGR2n4nupldftHnCy9lN-caafJlNQquZDia2AIkZhNMwkE2dRnbUie4gEfDtQEGvat53vUgj2D4PGj4BTe"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEENA8cXldTRF1COGdfXv5AnlwqK_FHO-6agrIj54gSRn9mQ-5og9qMReQfXAFlH8R44rSaxcAphrIYbnxJRqwF8jAOqx5H-CYQwmvebHAHeV00Epn_afM="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtODue4JMx6yLAPPfy-eLsWy11dPfYGYb0LcFp4yB8tugOeK7RDXPn9z7Qzy5PqXbRFD6k-Qxco0gmkifHDYmDiKitlXfBZwz4ZmwTaREcXNulJzsVZtK356tHxHLAN6k="
    },
    {
      title: "kpler.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFSGvrfk0TpGsRZQVT7N9DRmKm4SB2H7aKWoSruRi1lFb3iiZgidHcmGRZl9qm0Y2QhLzA0dapCf4bLBUu1cOPG1uCAAX7d7X-UAVJnWZa513vVXiDU0WhpdOJUa7rMCt4rOm5N-v17XtQRSClTo3Rw6ZmjrW92tGAif8MdXLV44zsVRHT3xHNk3DGT2geRoVawjqr_Vg=="
    },
    {
      title: "iea.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhzu6FIVGTqlbQgHz3ZJo7MFAewH96PoLETm51MUnvqFpOfP8ixCzJUEmNFSBCC9Iq7gZnyDHBFYtYRFemqA3aVpAcGrDtL_qov-ajmsUNpj_GxO2sERSzZZ-86O8KKMJinxlLm8gqGgw8KwMcrg=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 20 2024 trends forecast",
    "US Iran conflict news August 20 2024 military Hormuz shipping"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-20",
  version: "v2.163",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D173",
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
      value: "WTI $84.30–$84.64 · Brent $91.47–$93.30",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
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
      description: "Iran missile tests and US blockade enforcement spike risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic at 3-month lows; dark transits exceeding 80%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Brent remains above $92 as market prices in ceasefire expiry.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US establishes clandestine shipping corridors for escort.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "60-day MoU expired; no follow-up agreement reached.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire MoU expired, removing diplomatic guardrails",
      "Strait control shifts to clandestine corridor confrontation",
      "Energy premium shifting from panic to structural plateau"
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
        "Change: Iran's doctrine shifts to offensive deterrence.",
        "Continue: US continues naval blockade enforcement."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US secret shipping lane established to bypass Iran.",
        "Continue: AIS-dark transits remain at 80%+."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent stabilizes above $92. (NDTV)",
        "Continue: Market pricing in long-term chokepoint risk."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US officially rejects extension of truce. (CNBC)",
        "Continue: Iranian hardliners consolidate national security council."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Total nuclear abandonment vs. Total blockade lifting stalemate"
    ],
    military: [
      "Freedom of navigation vs. Sovereign jurisdictional control over Hormuz"
    ]
  },
  scoreTrend: [
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
      score: 82
    },
    {
      date: "08-20",
      score: 82,
      active: true
    }
  ],
  keyChange: "Expiry of ceasefire MoU leads to high-plateau risk profile",
  investmentSignal: "→ Maintain energy hedges and defensive defense allocations.",
  change: "none",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Iran missile tests and US blockade enforcement spike risks",
      description: "Iran missile tests and US blockade enforcement spike risks.",
      verification: "single",
      timestamp: "2026-08-20 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Traffic at 3-month lows",
      description: "Traffic at 3-month lows; dark transits exceeding 80%.",
      verification: "single",
      timestamp: "2026-08-20 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "economictimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGW-Irz1oHQbcutqcQjk_cgS5VeFFweYAGze_Cw6ug5SGKp4QcQBw4ruAwPjUfSuIDJUzRpNlOBNam1TsdOAjweM4GT9QpSUiIxDZm2_MsGj7IcDzNTEam7u74C5lSt2jmWo7wzzd_2UfibEtIv4AddAk4R2tkzZ6mzJZc96u2frFAk6XgyqKX0fZGReVuZZTkvXdiTp8ArEqVjlKZHiBlNHBCosaQfR0P9ScLSg1OvQym6vhKwr75wh5QjTRjDVKzq8CjLqg7jFmk60PwDkc8nCKlJaGO9-XJ8ctbxwfSLm-yD6_d9Dc3OqiQ="
    },
    {
      title: "longforecast.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2kzUddDxXja8RvNVIhw8GOofvlcn_OBRg8cNevn2BJroCBF0wqEqkCI3UKxLh4Jmy6U7sJ1aeSxk-Xgy0QHD9uG8mlY3iefM-z6AI-I-3I7zQtn_psG-eC3UdfpmXscuEGPfH3r35PNQlRUoQBfVVunpDgwYVl9EVEJh-tDhNdRAh4Y57DcTi8w=="
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH_jufS5fpaJ3XhwHgRg5fZYOt1b-zJAwSpaAc3ZLsX4WLElAYZ_fnN9I8Q0ruga2TU4Ll5kj8Ns8mP_EAKDowTxlR1KsVu8u-drjKQSAEe9uVQOg8RinR-WOzXbAZu9exmDjqir4mAIrfmSKM88eiua-DSJFO3MvNNWc9EmtGJzJXAPgnsA=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEiHq4Q3nobu2jGak6ATRKRfIZz95QC4_whRffsCLY1e9VVaTathMqrg38EMZVXuQ5YRvvRTgO5vw5PJKS7ayUtLc4auSlrQFwXNol1CuScZYWZihNP2Pi7ElAgRY6A2O4="
    },
    {
      title: "seekingalpha.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELeWgr60M53zAPIOoMv717GJDuW-GQr-_cZc9h15UwmaQfZ9f7lRbMWmwYfjYkEe7I2DXAuNnaTWvyS7txVuUqrzrh1h7MGc9GHqhvgimZOgCEZMv1PL20fA92KRKxo5tSqPTA8Lz4ANXtFo5qzahsSuFs2xaSbkQT4yZhBfovESs6rxElghGtc2NXj3rmfJMZpqgIadFoIe1YhF7xxOMy0aNuK-sB8ymzMVGr"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYgyNNoj7z1rxPsOyj2iR9mTTfaNrhdMTV5Ih0usKZ65Ix_Ttez_nUhpqrLfP9apf99GIAS2-J_oPXwyeH4AEoLZI1RZXIWzWqtL8i_6nr10Bz200uzAuravMIZpTG6YMhHRPF5Q=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3_oiQ7EV5a6j__4NudHIJs_KnBlaQgI77zSqLra2KnQXeyeTkEWeFUsDPQgnIOE8TCWZDnM4xFhw_TOqkeg2CddsKEvoVdqk6fLNaOdoU2EtDFS6R57tTRVSNGvHEKIfX7ga8qNmBrxPt9mrTyVnP7twjjVl0_GqdCLDlQJOJYLm-eavTzeqFBLSiLlMJdhudOuz7k70="
    },
    {
      title: "cnbcafrica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2HZPa_irFgr3u0ZGW-EXyEoSdD_FSyXdlWthR9HGaXLLCsHmcNrTUkbvWF8Om71N3TiOH3yWCGQ5uXYXawju5pqowkNx9Mcz57mv4BEQpqYw8fTaM6k87DSw-7mCXpiksPqg5oDTv9XUKvUBGR2n4nupldftHnCy9lN-caafJlNQquZDia2AIkZhNMwkE2dRnbUie4gEfDtQEGvat53vUgj2D4PGj4BTe"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEENA8cXldTRF1COGdfXv5AnlwqK_FHO-6agrIj54gSRn9mQ-5og9qMReQfXAFlH8R44rSaxcAphrIYbnxJRqwF8jAOqx5H-CYQwmvebHAHeV00Epn_afM="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtODue4JMx6yLAPPfy-eLsWy11dPfYGYb0LcFp4yB8tugOeK7RDXPn9z7Qzy5PqXbRFD6k-Qxco0gmkifHDYmDiKitlXfBZwz4ZmwTaREcXNulJzsVZtK356tHxHLAN6k="
    },
    {
      title: "kpler.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFSGvrfk0TpGsRZQVT7N9DRmKm4SB2H7aKWoSruRi1lFb3iiZgidHcmGRZl9qm0Y2QhLzA0dapCf4bLBUu1cOPG1uCAAX7d7X-UAVJnWZa513vVXiDU0WhpdOJUa7rMCt4rOm5N-v17XtQRSClTo3Rw6ZmjrW92tGAif8MdXLV44zsVRHT3xHNk3DGT2geRoVawjqr_Vg=="
    },
    {
      title: "iea.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhzu6FIVGTqlbQgHz3ZJo7MFAewH96PoLETm51MUnvqFpOfP8ixCzJUEmNFSBCC9Iq7gZnyDHBFYtYRFemqA3aVpAcGrDtL_qov-ajmsUNpj_GxO2sERSzZZ-86O8KKMJinxlLm8gqGgw8KwMcrg=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 20 2024 trends forecast",
    "US Iran conflict news August 20 2024 military Hormuz shipping"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.163 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：美伊停火协议失效导致局势进入高位黏滞状态",
    bannerWarning: "→ 维持能源对冲，增加国防板块防御性配置。",
    deescalationIntent: "美方要求永久性放弃核计划与伊朗要求解除全面封锁的对立",
    structuralRisk: "通行量触及三个月低点，保险费率高企。",
    contradictionNote: "美方要求永久性放弃核计划与伊朗要求解除全面封锁的对立；海峡通航自由权与伊朗主权管辖权的直接交火冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第173天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.163 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Expiry of ceasefire MoU leads to high-plateau risk profile",
    bannerWarning: "→ Maintain energy hedges and defensive defense allocations.",
    deescalationIntent: "Total nuclear abandonment vs. Total blockade lifting stalemate",
    structuralRisk: "Traffic at 3-month lows; dark transits exceeding 80%.",
    contradictionNote: "Total nuclear abandonment vs. Total blockade lifting stalemate; Freedom of navigation vs. Sovereign jurisdictional control over Hormuz",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 173",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
