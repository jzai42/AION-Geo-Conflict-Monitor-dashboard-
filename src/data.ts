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
  date: "2026-06-03",
  version: "v2.84",
  keyStats: [
    {
      label: "冲突天数",
      value: "D95",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $87.63–$92.49 · Brent $94.78–$98.98",
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
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "直接交火与重大军事行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "流量降至正常水平5%以下，主要班轮暂停。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "价格主体落在$85–100区间，供应担忧明显。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "大国直接参与作战行动及定点打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "谈判停滞，双方立场极端强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗袭击海湾区域多点目标",
      description: "IRGC发射导弹命中科威特机场，导致设施损坏及人员伤亡；同时袭击巴林美军总部。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-06-03 03:10",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美国实施「自卫性」反击",
      description: "美军战机打击伊朗格什姆岛雷达及无人机地面站，作为对导弹袭击的回应。来源：CENTCOM。",
      verification: "confirmed",
      timestamp: "2026-06-03 04:45",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "中介谈判陷入停滞",
      description: "伊朗方面表示在黎巴嫩局势平息前不考虑继续海峡谈判，拒绝中介介入。来源：RFE/RL。",
      verification: "confirmed",
      timestamp: "2026-06-03 05:55",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "科威特航空宣布停飞",
      description: "受导弹及无人机攻击影响，科威特国际机场一度完全关闭，目前仅限部分航站楼运营。来源：Straits Times。",
      verification: "confirmed",
      timestamp: "2026-06-03 07:25",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "布伦特原油因断供预期大涨",
      description: "因霍尔木兹海峡重新开放预期落空，油价单日上涨超2美元。来源：Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-06-03 09:30",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突重心从单纯海战向区域性基础设施战转型。",
      "停火协议框架在双边导弹交火后已基本失效。",
      "霍尔木兹封锁常态化，全球能源供应处于临界压力点。"
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
        "变化：伊朗由被动拦截转为主动跨国境打击邻国及美军基地。",
        "变化：美军开始对伊朗本土沿岸军事控制设施实施直接空中打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行能力保持在正常水平的4.1%，处于「实质性断绝」状态。",
        "变化：商船保险费率受袭击事件影响再次上调，主要保赔协会发出极端红色警报。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价突破近期高位震荡带，向每桶100美元整数关口加速进逼。",
        "延续：沙特等邻国原油出口受航道封锁及袭击风险的双重压制。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗正式切断中介机构联络，谈判窗口期暂时关闭。",
        "变化：特朗普对达成交易的乐观预期被战场现实严重削弱。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求的海峡无条件开放与伊朗要求的黎巴嫩/制裁全面解除完全对立。",
      "海湾邻国主权受损使地区外交博弈进一步复杂化。"
    ],
    military: [
      "伊朗的饱和式打击能力与美军的反导/定点清除能力在核心节点对抗。",
      "非对称作战已经演变为公开的中程武器对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76,
      active: true
    }
  ],
  keyChange: "冲突烈度质变：导弹战开启，谈判渠道中断。",
  investmentSignal: "→ 增持 能源 及 避险资产，对冲 风险资产 下行 压力。",
  change: "up",
  prevRiskScore: 68,
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFuGT8Ih5NDXZIyPe3n7KE11YgrgFprY8g3R2rU-Jq4XE-rYqh4UvNYeJANlCtUdbPMU38qAjKu7pxqY-VHEJRMIEZ50I9F6ftL5JLbHU7eD-9KIiiJHg=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETT9ZDczH6CqahFhUIs_pRGIMVK-PQovxHB8vzIPXucahatx8dqZo8C9zQgrOY6QmfizBKaJnrKipIaR0xMxfahdkwVrHokBNy6yOQYANEGr4KDM_f59icrKYxQzctcHawMYkVU-kRFgix98i3qcCWFhNEJUkRMIdN80XeM-CmQrJCGN5Z7H2QBvuCFH5F44zWwh9F10z9yf9QtH_H"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0mp-cTWWAhQ7143pXt-MGyJCpNws6Yq1JrITh-nvlMHbMluI5w8QA4A704lzJH0vxPcmlTv3_srjJ6n1dI4HYB9cZsGTsOoT8y0LXk1DnB52aidzMKIP1JWS1C5OKcfImKdOKornfmJpBZmBicGSqqjUPdOY="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXbRHsYCgzWKnVC7fYaTE5KvyeMomGDlyPJYjgBRMRtCNG6odimEypUGasWDYJCP4JbbLFu1MCkLMesYxQPXrtzdH09NC_6eyL0rWJBy2LEC4BE7g3F7V1GAlXFP7vg1mNfXkGrDkNJyy7Ze95vzwYIE98r1zF-XJLEkmIeZGU"
    },
    {
      title: "gpb.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfhqkG0dH5GPu49eQzMo4PM6Atp50lN8oKqmkhrlFMYm3Ye-bMNfqCardQePWEaDys1JU05rN-Oqza4Ughk17GYBnbsS7UXXXWfJcpgy4YzZ5u2Sa6cx0Z5I_17CcvWk2I38XHZOTxSi9BKVYrsvCuoyc_2ggmygX3IyA_nZ3dXXasebZhme2IWeJBPlU9ujiRMsd5D-dOOTQEgMk="
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBq6zgvH9pCnq8FSNvISyfKirYppjPjvLLCpa3xx3gwlSXLKX7foRvp0bouL5lkQeVxgxNpL_KYXOxE-Cu-BoXByM-yRORnz9O0hdedKiDPlOVPt4fuBf62MUimZny_PgeoClfDqUgNTMYq5ubiuwRk3pGyiyc-dm7-KcVIcQTuesi0UwezLNBrxEMOLWMd9hL0M5sQInIdyk="
    },
    {
      title: "eurasiareview.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEy49su3U_pH1JtR9BJG-6WwOzYh0a4BD_k89GKsd80KoLO6_kRXp77mmceWTyuk1yFxGPEJinpRxcM6iMm-ZtZx-IiNjj3DjtLJmhyw6sIRTR6ik-i-BKGqJe8fjEJDAAvucTXVcd_YThG2HKxdBvqoqID5CB3X3bT1MnbAo1WbgIYY05rnnhaqZXePzIz1Eh_UWkufdRDs9NSf8fScwf_"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjlVfiu3DbzeikF-QocWDmBwSwTAddUdx-Qq2sVjWvVrno5gczwReLCRCX4FJQYYPoQd6ma9fy_03zBKvCrBZLIS21-FkLg102LODqbBH7vMN8fYwUGHV81fVjXB2JZLqL5VCtzFxX7DQIeunbvk2vIyvJ_G723kvkGSw6y7fM"
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQVyBpeDjuI-RTgkADOcJ2a6s8YT3EFzxRTTCSJJHBoQYa10GrIaRaoRPB8PZc23dpBgEU3wEu2r2Yp7OuacgpBzdz705rFPooOKqKlN0pRiKni4M9PwwFktWlYSDKf5r8TCqe7RV_RqKwNE5idLjvkj-2t2l6ChZok2MQ7eh5yyw1HA=="
    },
    {
      title: "armenpress.am",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQeotfAUDKDferrca5XN4txd1JZ7SOvfGMe78QveIGCnJaEZIhxgCVRykCgj5DA8OBKpnwsFNudJgfAS7y_uDfx4O-XiCQRvA0Iw32-c0uG0kD0GOGaWoGXjVb8haQ"
    },
    {
      title: "energynewsbeat.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBhDGLfIe5-nq2TicCK2dbRjn4KY657_Zwta6pJlQ5VHf8WEKvPg5ZDtVm2FN9g3QM7S6WqTY6sKoMrmxfLDR5WlR5gK_qCJ6ct2aYSD44M9rCycuREtazvk2E43Ty_suW0TzcGs2oKHooppJMilSl7xritOuihKz9QbzrwtoEB59I2-Lb-ZCGLuAOKEH_Z5DupRnMgohN4eCfTx0OLXdJlnE1pickuoEwP2LDEd0YeF95uGJMrX0sTU3lrvHlCKJRu8MIIPbKInuoZjh6eFdGvcGYkOZ3IA=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdhGFdi2_F-0SceF8S_5PA5NqWNxpF03oOmh8WYfuvzwEwHBapdTgg1D-NaXM8Jd6puAns1gPh6LaMFHO9btmqJ0zeZKdKsUydUf8EUm9gcl13bbGkAB0uaZnTqV5Ovnp5ng=="
    },
    {
      title: "rferl.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHf1VzKtFeWBWe3pAM2eT0v3hgzyPeV1uOiQ2qCSb0boEMvqGA18zXZ7iKBz17r3pmCChls_9ThW6arZv5szmPxyara9g9iishcg28objsq_gJXBH1vak0F_5opXCnmFlLqRIPq2XqtEMqZYM5Retn_h7nANdNuWENw1SnGJwmr2TVBqMn8LkVDb62xMV28Odm9WQgUA=="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHiZJeI_KZZu2wjiaJ9Qvmu0b-TqUoLB656v5jAiejFRkdVlkZ6A-wOUq2EgEjiVbLfT6_yxzz7B6fB3a56NkxgiGhL7a3EL6-Kbjt2asGcvMxSlUmUCvYOK5MZHRklLuPo451X"
    },
    {
      title: "timeskuwait.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQAhs2xOdIyMkGUA56EHUBvcFwLF09Sy1c9oMb-EhsO78wNQHMKfZP-g-SZqqMzUc8TEVFk3tGeJtgy_QT9O9cktlm7AfzeN8tAlvBb46MIxenrVKMF1aDv9UZ-5CL1-7Aq51MpbDTNO69sfhx_-vH1ezB7PxdWKAjfRTqUvXvMsVy9BLgvrsWZvQvYOL-NjkwiNDaj4-_3JmYumvP1_XSiTWWrVQ="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 3 2026 range trend Reuters Bloomberg",
    "US Iran maritime tension June 3 2026 drone Hormuz",
    "Hormuz Strait shipping status June 3 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-03",
  version: "v2.84",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D95",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $87.63–$92.49 · Brent $94.78–$98.98",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Direct fire and major military operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Flow dropped below 5%; main liners suspended.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices primarily in $85–100; supply concerns obvious.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Great powers directly involved in combat/strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Negotiations stalled; extreme hardening of positions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Attacks Regional Gulf Targets",
      description: "IRGC fired missiles hitting Kuwait Airport and US Fifth Fleet HQ in Bahrain. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-06-03 03:10",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Conducts Self-Defense Strikes",
      description: "CENTCOM targeted Iranian ground control stations on Qeshm Island following missile attacks. Source: CENTCOM.",
      verification: "confirmed",
      timestamp: "2026-06-03 04:45",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Mediation Dialogue Halts",
      description: "Iran informed mediators it will not discuss ceasefire extension until Lebanon operations stop. Source: RFE/RL.",
      verification: "confirmed",
      timestamp: "2026-06-03 05:55",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "Kuwait Suspends Flights",
      description: "Airport operations halted after drone and missile damage killed one and injured dozens. Source: Straits Times.",
      verification: "confirmed",
      timestamp: "2026-06-03 07:25",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil Jumps on Blockade Fears",
      description: "Brent crude rose over 2% as expectations for a Hormuz reopening faded. Source: Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-06-03 09:30",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict shift from maritime interceptions to regional infrastructure warfare.",
      "Ceasefire framework effectively void after cross-border missile exchanges.",
      "Hormuz blockade normalized, energy supply at critical stress point."
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
        "Change: Iran shifted from defensive posture to offensive cross-border strikes against neighbors and US bases.",
        "Change: US military initiated direct strikes on Iranian coastal command and control facilities."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait throughput remains at 4.1%, maintaining 'effective closure' state.",
        "Change: War risk premiums hiked again following airport and vessel-related attacks."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices broke previous resistance, accelerating toward the $100 psychological level.",
        "Continue: Regional crude exports suppressed by both waterway blockade and active strike risks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran officially severed mediator contact, closing the current negotiation window.",
        "Change: Trump's optimism for a 'one-week deal' undermined by battlefield escalation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable demands between US 'Unconditional Opening' and Iran 'Lebanon/Sanctions Linkage'.",
      "Sovereignty violations of Gulf neighbors complicate the regional diplomatic matrix."
    ],
    military: [
      "Iranian saturation strike capability confronting US missile defense/precision strike assets.",
      "Asymmetric warfare evolved into open medium-range ballistic missile confrontation."
    ]
  },
  scoreTrend: [
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68
    },
    {
      date: "06-03",
      score: 76,
      active: true
    }
  ],
  keyChange: "Qualitative escalation: Missile warfare initiated, mediation channels severed.",
  investmentSignal: "→ Increase exposure to Energy and Safe-Haven assets; hedge Risk Asset downside.",
  change: "up",
  prevRiskScore: 68,
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFuGT8Ih5NDXZIyPe3n7KE11YgrgFprY8g3R2rU-Jq4XE-rYqh4UvNYeJANlCtUdbPMU38qAjKu7pxqY-VHEJRMIEZ50I9F6ftL5JLbHU7eD-9KIiiJHg=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETT9ZDczH6CqahFhUIs_pRGIMVK-PQovxHB8vzIPXucahatx8dqZo8C9zQgrOY6QmfizBKaJnrKipIaR0xMxfahdkwVrHokBNy6yOQYANEGr4KDM_f59icrKYxQzctcHawMYkVU-kRFgix98i3qcCWFhNEJUkRMIdN80XeM-CmQrJCGN5Z7H2QBvuCFH5F44zWwh9F10z9yf9QtH_H"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0mp-cTWWAhQ7143pXt-MGyJCpNws6Yq1JrITh-nvlMHbMluI5w8QA4A704lzJH0vxPcmlTv3_srjJ6n1dI4HYB9cZsGTsOoT8y0LXk1DnB52aidzMKIP1JWS1C5OKcfImKdOKornfmJpBZmBicGSqqjUPdOY="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXbRHsYCgzWKnVC7fYaTE5KvyeMomGDlyPJYjgBRMRtCNG6odimEypUGasWDYJCP4JbbLFu1MCkLMesYxQPXrtzdH09NC_6eyL0rWJBy2LEC4BE7g3F7V1GAlXFP7vg1mNfXkGrDkNJyy7Ze95vzwYIE98r1zF-XJLEkmIeZGU"
    },
    {
      title: "gpb.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfhqkG0dH5GPu49eQzMo4PM6Atp50lN8oKqmkhrlFMYm3Ye-bMNfqCardQePWEaDys1JU05rN-Oqza4Ughk17GYBnbsS7UXXXWfJcpgy4YzZ5u2Sa6cx0Z5I_17CcvWk2I38XHZOTxSi9BKVYrsvCuoyc_2ggmygX3IyA_nZ3dXXasebZhme2IWeJBPlU9ujiRMsd5D-dOOTQEgMk="
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBq6zgvH9pCnq8FSNvISyfKirYppjPjvLLCpa3xx3gwlSXLKX7foRvp0bouL5lkQeVxgxNpL_KYXOxE-Cu-BoXByM-yRORnz9O0hdedKiDPlOVPt4fuBf62MUimZny_PgeoClfDqUgNTMYq5ubiuwRk3pGyiyc-dm7-KcVIcQTuesi0UwezLNBrxEMOLWMd9hL0M5sQInIdyk="
    },
    {
      title: "eurasiareview.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEy49su3U_pH1JtR9BJG-6WwOzYh0a4BD_k89GKsd80KoLO6_kRXp77mmceWTyuk1yFxGPEJinpRxcM6iMm-ZtZx-IiNjj3DjtLJmhyw6sIRTR6ik-i-BKGqJe8fjEJDAAvucTXVcd_YThG2HKxdBvqoqID5CB3X3bT1MnbAo1WbgIYY05rnnhaqZXePzIz1Eh_UWkufdRDs9NSf8fScwf_"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjlVfiu3DbzeikF-QocWDmBwSwTAddUdx-Qq2sVjWvVrno5gczwReLCRCX4FJQYYPoQd6ma9fy_03zBKvCrBZLIS21-FkLg102LODqbBH7vMN8fYwUGHV81fVjXB2JZLqL5VCtzFxX7DQIeunbvk2vIyvJ_G723kvkGSw6y7fM"
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQVyBpeDjuI-RTgkADOcJ2a6s8YT3EFzxRTTCSJJHBoQYa10GrIaRaoRPB8PZc23dpBgEU3wEu2r2Yp7OuacgpBzdz705rFPooOKqKlN0pRiKni4M9PwwFktWlYSDKf5r8TCqe7RV_RqKwNE5idLjvkj-2t2l6ChZok2MQ7eh5yyw1HA=="
    },
    {
      title: "armenpress.am",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQeotfAUDKDferrca5XN4txd1JZ7SOvfGMe78QveIGCnJaEZIhxgCVRykCgj5DA8OBKpnwsFNudJgfAS7y_uDfx4O-XiCQRvA0Iw32-c0uG0kD0GOGaWoGXjVb8haQ"
    },
    {
      title: "energynewsbeat.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBhDGLfIe5-nq2TicCK2dbRjn4KY657_Zwta6pJlQ5VHf8WEKvPg5ZDtVm2FN9g3QM7S6WqTY6sKoMrmxfLDR5WlR5gK_qCJ6ct2aYSD44M9rCycuREtazvk2E43Ty_suW0TzcGs2oKHooppJMilSl7xritOuihKz9QbzrwtoEB59I2-Lb-ZCGLuAOKEH_Z5DupRnMgohN4eCfTx0OLXdJlnE1pickuoEwP2LDEd0YeF95uGJMrX0sTU3lrvHlCKJRu8MIIPbKInuoZjh6eFdGvcGYkOZ3IA=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdhGFdi2_F-0SceF8S_5PA5NqWNxpF03oOmh8WYfuvzwEwHBapdTgg1D-NaXM8Jd6puAns1gPh6LaMFHO9btmqJ0zeZKdKsUydUf8EUm9gcl13bbGkAB0uaZnTqV5Ovnp5ng=="
    },
    {
      title: "rferl.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHf1VzKtFeWBWe3pAM2eT0v3hgzyPeV1uOiQ2qCSb0boEMvqGA18zXZ7iKBz17r3pmCChls_9ThW6arZv5szmPxyara9g9iishcg28objsq_gJXBH1vak0F_5opXCnmFlLqRIPq2XqtEMqZYM5Retn_h7nANdNuWENw1SnGJwmr2TVBqMn8LkVDb62xMV28Odm9WQgUA=="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHiZJeI_KZZu2wjiaJ9Qvmu0b-TqUoLB656v5jAiejFRkdVlkZ6A-wOUq2EgEjiVbLfT6_yxzz7B6fB3a56NkxgiGhL7a3EL6-Kbjt2asGcvMxSlUmUCvYOK5MZHRklLuPo451X"
    },
    {
      title: "timeskuwait.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQAhs2xOdIyMkGUA56EHUBvcFwLF09Sy1c9oMb-EhsO78wNQHMKfZP-g-SZqqMzUc8TEVFk3tGeJtgy_QT9O9cktlm7AfzeN8tAlvBb46MIxenrVKMF1aDv9UZ-5CL1-7Aq51MpbDTNO69sfhx_-vH1ezB7PxdWKAjfRTqUvXvMsVy9BLgvrsWZvQvYOL-NjkwiNDaj4-_3JmYumvP1_XSiTWWrVQ="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 3 2026 range trend Reuters Bloomberg",
    "US Iran maritime tension June 3 2026 drone Hormuz",
    "Hormuz Strait shipping status June 3 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.84 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑8）：冲突烈度质变：导弹战开启，谈判渠道中断。",
    bannerWarning: "→ 增持 能源 及 避险资产，对冲 风险资产 下行 压力。",
    deescalationIntent: "美方要求的海峡无条件开放与伊朗要求的黎巴嫩/制裁全面解除完全对立。",
    structuralRisk: "流量降至正常水平5%以下，主要班轮暂停。",
    contradictionNote: "美方要求的海峡无条件开放与伊朗要求的黎巴嫩/制裁全面解除完全对立。；伊朗的饱和式打击能力与美军的反导/定点清除能力在核心节点对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第95天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.84 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑8): Qualitative escalation: Missile warfare initiated, mediation channels severed.",
    bannerWarning: "→ Increase exposure to Energy and Safe-Haven assets; hedge Risk Asset downside.",
    deescalationIntent: "Irreconcilable demands between US 'Unconditional Opening' and Iran 'Lebanon/San…",
    structuralRisk: "Flow dropped below 5%; main liners suspended.",
    contradictionNote: "Irreconcilable demands between US 'Unconditional Opening' and Iran 'Lebanon/Sanctions Linkage'.; Iranian saturation strike capability confronting US missile de…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 95",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
