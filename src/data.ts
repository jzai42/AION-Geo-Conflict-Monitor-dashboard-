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
  date: "2026-07-06",
  version: "v2.117",
  keyStats: [
    {
      label: "冲突天数",
      value: "D128",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $67.89–$69.26 · Brent $71.10–$72.00",
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
  riskScore: 60,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "代理人小规模袭扰及无人机拦截持续，伊朗举行大规模葬礼释放强硬信号。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "滞留船只开始撤离，但伊朗拟征收“服务费”计划引发航行自由权新争端。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "OPEC+ 增产计划及海峡局部复航预期压制油价，市场目前更多关注供需基本面。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国维持中东军力部署，同时考虑因政治摩擦调整对沙特的防御支持。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "谈判渠道虽开放，但伊朗的“管辖权收费”要求可能成为协议达成的新障碍。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗拟征收霍尔木兹“服务费”",
      description: "伊朗宣布计划对通过其领海的船只征收服务费，用于保障航行安全及环保，此举被视为对海峡管辖权的实控尝试。",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "10艘长期滞留VLCC成功撤离",
      description: "由三井 O.S.K. 等管理的日资船队今日离开海峡，携带约 1200 万桶原油，反映出局部通行的恢复。",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "也门海域散货船遭开火袭击",
      description: "Lady Naeima 号在红海南部遭小艇近距离射击，提醒海运界红海侧风险尚未解除。",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "滞留资产疏散标志着短期战术缓和。",
      "海峡收费主张将博弈引向法律与主权领域。",
      "OPEC+ 增产削弱了伊朗利用油价作为筹码的能力。"
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
        "延续：伊朗在哈梅内伊葬礼期间维持高警戒状态，美军在红海/海湾地区维持护航态势。",
        "变化：红海发生针对商船的小规模武装袭击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：长期滞留的大型油轮（VLCC）开始有序撤离海峡。",
        "变化：伊朗提出“服务费”计划，作为通航安全承诺的政治要价。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：OPEC+ 坚持逐步增产，油价在 $75 以下震荡，地缘溢价因通航改善预期而萎缩。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：卡塔尔与阿曼继续推动间接对话，试图达成包含海峡使用费在内的全面安全协议。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗对海峡的主权管辖权要求与美国“航行自由”原则的对抗。"
    ],
    military: [
      "红海胡塞武装/代理人威胁与海峡复航进程的步调不一。"
    ]
  },
  scoreTrend: [
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60,
      active: true
    }
  ],
  keyChange: "霍尔木兹由“军事对抗”向“主权及收费博弈”转变。",
  investmentSignal: "→ 维持 能源 仓位，对冲 风险资产 波动。",
  change: "structural",
  prevRiskScore: 56,
  webSources: [
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHC-aLqrQI-SBYAuNgQtUWHvbJUFgfqaLuY-kNPYVxT_OwwxTo_C9ArbMweqVulv3ahyzisA4mLdfgnbPchcdNepfOrgqUpQbpWcidaayI8hkAeOZ0tx9YOUzjS31k3uTtoZnRUwjjeG6bkYC0Qs9ED2KkoAlLhAjWUgPZf-xxhgFQut_meOx9F7mOAbaFmyIkfDcTPRKc2wXUiMOLvh1oyKqiWeQYBl_5oDknmCkNRgpKZLvhy0_nSFryjNTfF7K_h84kUzkLYH0Q-razR_xw180pG1FK0XNTdc0ODl2fZ9vqXpC-0LQa70jt0Zho="
    },
    {
      title: "tradingpedia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF8nsjoN3rxMO22PZeo2HpdT453aBMN1FEtDcmlAHS8R5EtLkIIa5kuFQwtq9zHCsZUzH8nwsbWVQkT5tcvCAlzV1rUxUQiTpLF2InEH20ZBkLciF2TQIFM_ji6F1BdDf-RY-SUpQXG8xu1W5wy2Vt-eKCPXqVhcG8kKlPYgm_J2IH4NjcVKS4k7QmlaNBJFw=="
    },
    {
      title: "sundayguardianlive.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEy024eSlR_berXbPfSAGwN2-vGUoZauS-QWLSEfxlzEP4FIPv6LGM-dGQX60VzFvJu1ymwM6vAOI8ZrSsu7kNhnjGHDSkWEl5A41uhQWQjT5Qar2bwyY-j8-DGEVCKnUs-VU4es3xC6H0vn6WdGgT-sCuobDmAIZRM5tTtvMqws3dPJYwNrvl4ZPTo2n8QjPnyWFLGZzyC1dcRVeNsSMsH7J60SMXTrqRzep1oOlBQeNRtKNQBzYXa6TsHJEy6WJf3Z6iYJK2njqJI-cvqt8W4UpsSv3KZyC-Iw0IKfOX499YNiyo6pcvobzGAzbSbA80FqJ4l6gj-zRW1suLO0u2I4U0="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGALDEp6VCJ10op4BnjTCkpIYUIoFfHFrZJfcvwDhtEeEJT3z39mZ6N8gVZ9SHEYdtBNwKWqAaxkoETe-Ws8bClEancdIdkSQbtyQKG61aRg-3wjKtbNHpd1eYDahX7lOdDlF35ncRXW-FgijZ-QC-gqQZ2vxu-OkcFaaJ6nqDf9LkZ9C0EtKSYLiQ8V_t_YaLSkpY6dzoFr47t8vYIaoVdTMqZL_0="
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG7TRVvBtUWdk7qRV3SGX0J5x61dPmOb_LX-n_96XwRDkyYGDrxBjg8KVHcTw-EtyMAydpbWW4QfY16BwJ_TFeQDIClpY2KHqJ-W-zZqhBQzQXTHtqOAV6JpyYxOUOC38_h4vPKI2sYwiAMYlItr4_Ob6j49GkH5f0IJ2AfdzYYM6bEjHYKj7QA0Lrq3ju6tBz3cbkKdWUER8WXd008sKPcQRVlSVgm7LycYdGOvrtvotHNMGIG"
    },
    {
      title: "seatrade-maritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFDFyuTXgKPcFeAupZdMdiI4WgWPg1vNXuslBeXDOHO8cmUjtvsbgmOUKSywhSU8C-muLN8HqyFWtqw8D5yXluB39l8mMEMpgT0WHfGATEfiI1pZUfWnIjhdmQLKQmXPUxAVd-D9xbKhqsN2yDBzsOh55aSk1ObHbzOq6SbUpCOSNsajjhVM4EB14lPu2hJqAbG"
    },
    {
      title: "centcom.mil",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGABnPsNU9jGv9vu5RKjXUCvwd-cOpMp4dpZmxMLTkVzn0jIuDpcPs300hfSR_tJN-IMa-J8ImCUVuzg26AZuFgnDSoALvADaNpN7c5JQ4="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_u0bPyUdPFVvfOBrref9fox6QS2ZjKWkhRPrBDcaJKRJFY2CraJmH6Ox2TAwZB0Ep1ijSKhL79PMeH3cqH2nFGYIv9w56C8ikDAQXp__R1PFo_iXtigA60majTHmyk4k1-hdRLvl7EFizOaLxMgiWINQ5PA7riDtrd1fB2-L6Jw=="
    },
    {
      title: "japantimes.co.jp",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHnc5F4DS0NeI4BQlvUmbsZRGBxBgJlB7GSYmeJIto0bfW5YtedDSZR29oMB53oCDlyPvRGrXPkqTvSIKVwv5Gbz87_xAwBqd9OnWFwSoZMpZMI_kf0W7JnM3XOwTRWtRkuJ6-9O2_fHdK0uKB3y09Mj_zUoVbowkb5nHrHv0zEcSHv_am5"
    },
    {
      title: "kpbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_0trdqCf4lQLhWkLEaDEwhDOmQ6jOTZQ_OeUxjYM0Bws2Lcqg0WRjk27mj2o-6oi5wDi0bjfbyJcdd3KsUey20sONazY4ySeysUTjbR1Ex868cidx5m0kENbj82mIDkl0st0PLM4UiwJvLjUQYCRhvO9hqvQ-oAIE-zsMCBZPT8VSUFc5szRl8q9Qji4aQQrhdnz6mJiGLMAwBrBJUrQ8AZTfnc6PClWs-Ha2v_-Dp7pE"
    },
    {
      title: "gulftoday.ae",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHRChRcGvGIFzqvnM_MwjB7a1teae8WO5OXXQ9KznWOTTghxXgNY7T5Z5SgHesYTN8RQ-hxenuI_tUtSdfPd6CWqtxjfDkJyftMX9x0r_0souNISYHeAgm4Musk5_jONrosqHPbrpVymRWgYwslqQKhYGEiyuKb2uO_6Rr4gmrv7ZSOrTMUtzuXzrDT"
    },
    {
      title: "portnews.ru",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWRvVTTWsvHWZ6ceZdLdOeDfYN37JQZdqsny5g7vBEqlfnTxwRemgp2gMlUGDU3DxrxeCtTDMSJu7ehtM_kzL_7eW5IFOjjdfzV-Tyqs5XW6T0qyrTDeBXKQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range July 6 2026 trend news",
    "US Iran conflict news July 6 2026 military maritime",
    "Hormuz Strait shipping status July 6 2026 news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-06",
  version: "v2.117",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D128",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $67.89–$69.26 · Brent $71.10–$72.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Seriously Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 60,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy skirmishes continue; massive funeral in Tehran raises nationalist rhetoric.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Stranded vessels exiting, but Iran's proposed 'service fees' create new maritime legal friction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "OPEC+ production hikes and partial reopening news weigh on crude prices.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains carrier presence while reviewing defense ties with Riyadh due to political rift.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Mediation continues via Oman but faces new hurdles over Iran's fee demands.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Proposes Hormuz Service Fees",
      description: "Tehran plans to charge vessels for transit through its territorial waters for security and environmental services.",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Japan-linked Fleet Exits Hormuz",
      description: "10 vessels, including 6 VLCCs carrying 12M barrels of crude, successfully departed after months of delay.",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Merchant Vessel Attacked off Yemen",
      description: "Bulk carrier Lady Naeima came under fire from skiffs in the southern Red Sea.",
      verification: "confirmed",
      timestamp: "2026-07-06",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Stranded asset evacuation signals tactical de-escalation.",
      "Fee claims move the conflict into legal and sovereign jurisdiction spheres.",
      "OPEC+ output hike weakens Iran's ability to use oil prices as leverage."
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
        "Continue: Iran maintains high alert during mourning; US maintains escort posture.",
        "Change: Small-arms attack on commercial vessel in the southern Red Sea."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Large tankers (VLCCs) finally exiting the Strait of Hormuz.",
        "Change: Iran introduces 'service fee' plan as a political price for security."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: OPEC+ stays the course on hikes; oil prices trade below $75 as risk premium fades."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Qatar and Oman mediate to finalize security and transit arrangements."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Sovereign jurisdiction over Hormuz vs. Global 'Freedom of Navigation' norms."
    ],
    military: [
      "Persistent Red Sea threats vs. nascent recovery in Hormuz transits."
    ]
  },
  scoreTrend: [
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56
    },
    {
      date: "07-05",
      score: 56
    },
    {
      date: "07-06",
      score: 60,
      active: true
    }
  ],
  keyChange: "Shift from kinetic blockade to sovereignty and fee-based leverage in Hormuz.",
  investmentSignal: "→ Maintain Energy positions, hedge Risk Assets volatility.",
  change: "structural",
  prevRiskScore: 56,
  webSources: [
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHC-aLqrQI-SBYAuNgQtUWHvbJUFgfqaLuY-kNPYVxT_OwwxTo_C9ArbMweqVulv3ahyzisA4mLdfgnbPchcdNepfOrgqUpQbpWcidaayI8hkAeOZ0tx9YOUzjS31k3uTtoZnRUwjjeG6bkYC0Qs9ED2KkoAlLhAjWUgPZf-xxhgFQut_meOx9F7mOAbaFmyIkfDcTPRKc2wXUiMOLvh1oyKqiWeQYBl_5oDknmCkNRgpKZLvhy0_nSFryjNTfF7K_h84kUzkLYH0Q-razR_xw180pG1FK0XNTdc0ODl2fZ9vqXpC-0LQa70jt0Zho="
    },
    {
      title: "tradingpedia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF8nsjoN3rxMO22PZeo2HpdT453aBMN1FEtDcmlAHS8R5EtLkIIa5kuFQwtq9zHCsZUzH8nwsbWVQkT5tcvCAlzV1rUxUQiTpLF2InEH20ZBkLciF2TQIFM_ji6F1BdDf-RY-SUpQXG8xu1W5wy2Vt-eKCPXqVhcG8kKlPYgm_J2IH4NjcVKS4k7QmlaNBJFw=="
    },
    {
      title: "sundayguardianlive.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEy024eSlR_berXbPfSAGwN2-vGUoZauS-QWLSEfxlzEP4FIPv6LGM-dGQX60VzFvJu1ymwM6vAOI8ZrSsu7kNhnjGHDSkWEl5A41uhQWQjT5Qar2bwyY-j8-DGEVCKnUs-VU4es3xC6H0vn6WdGgT-sCuobDmAIZRM5tTtvMqws3dPJYwNrvl4ZPTo2n8QjPnyWFLGZzyC1dcRVeNsSMsH7J60SMXTrqRzep1oOlBQeNRtKNQBzYXa6TsHJEy6WJf3Z6iYJK2njqJI-cvqt8W4UpsSv3KZyC-Iw0IKfOX499YNiyo6pcvobzGAzbSbA80FqJ4l6gj-zRW1suLO0u2I4U0="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGALDEp6VCJ10op4BnjTCkpIYUIoFfHFrZJfcvwDhtEeEJT3z39mZ6N8gVZ9SHEYdtBNwKWqAaxkoETe-Ws8bClEancdIdkSQbtyQKG61aRg-3wjKtbNHpd1eYDahX7lOdDlF35ncRXW-FgijZ-QC-gqQZ2vxu-OkcFaaJ6nqDf9LkZ9C0EtKSYLiQ8V_t_YaLSkpY6dzoFr47t8vYIaoVdTMqZL_0="
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG7TRVvBtUWdk7qRV3SGX0J5x61dPmOb_LX-n_96XwRDkyYGDrxBjg8KVHcTw-EtyMAydpbWW4QfY16BwJ_TFeQDIClpY2KHqJ-W-zZqhBQzQXTHtqOAV6JpyYxOUOC38_h4vPKI2sYwiAMYlItr4_Ob6j49GkH5f0IJ2AfdzYYM6bEjHYKj7QA0Lrq3ju6tBz3cbkKdWUER8WXd008sKPcQRVlSVgm7LycYdGOvrtvotHNMGIG"
    },
    {
      title: "seatrade-maritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFDFyuTXgKPcFeAupZdMdiI4WgWPg1vNXuslBeXDOHO8cmUjtvsbgmOUKSywhSU8C-muLN8HqyFWtqw8D5yXluB39l8mMEMpgT0WHfGATEfiI1pZUfWnIjhdmQLKQmXPUxAVd-D9xbKhqsN2yDBzsOh55aSk1ObHbzOq6SbUpCOSNsajjhVM4EB14lPu2hJqAbG"
    },
    {
      title: "centcom.mil",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGABnPsNU9jGv9vu5RKjXUCvwd-cOpMp4dpZmxMLTkVzn0jIuDpcPs300hfSR_tJN-IMa-J8ImCUVuzg26AZuFgnDSoALvADaNpN7c5JQ4="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_u0bPyUdPFVvfOBrref9fox6QS2ZjKWkhRPrBDcaJKRJFY2CraJmH6Ox2TAwZB0Ep1ijSKhL79PMeH3cqH2nFGYIv9w56C8ikDAQXp__R1PFo_iXtigA60majTHmyk4k1-hdRLvl7EFizOaLxMgiWINQ5PA7riDtrd1fB2-L6Jw=="
    },
    {
      title: "japantimes.co.jp",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHnc5F4DS0NeI4BQlvUmbsZRGBxBgJlB7GSYmeJIto0bfW5YtedDSZR29oMB53oCDlyPvRGrXPkqTvSIKVwv5Gbz87_xAwBqd9OnWFwSoZMpZMI_kf0W7JnM3XOwTRWtRkuJ6-9O2_fHdK0uKB3y09Mj_zUoVbowkb5nHrHv0zEcSHv_am5"
    },
    {
      title: "kpbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_0trdqCf4lQLhWkLEaDEwhDOmQ6jOTZQ_OeUxjYM0Bws2Lcqg0WRjk27mj2o-6oi5wDi0bjfbyJcdd3KsUey20sONazY4ySeysUTjbR1Ex868cidx5m0kENbj82mIDkl0st0PLM4UiwJvLjUQYCRhvO9hqvQ-oAIE-zsMCBZPT8VSUFc5szRl8q9Qji4aQQrhdnz6mJiGLMAwBrBJUrQ8AZTfnc6PClWs-Ha2v_-Dp7pE"
    },
    {
      title: "gulftoday.ae",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHRChRcGvGIFzqvnM_MwjB7a1teae8WO5OXXQ9KznWOTTghxXgNY7T5Z5SgHesYTN8RQ-hxenuI_tUtSdfPd6CWqtxjfDkJyftMX9x0r_0souNISYHeAgm4Musk5_jONrosqHPbrpVymRWgYwslqQKhYGEiyuKb2uO_6Rr4gmrv7ZSOrTMUtzuXzrDT"
    },
    {
      title: "portnews.ru",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWRvVTTWsvHWZ6ceZdLdOeDfYN37JQZdqsny5g7vBEqlfnTxwRemgp2gMlUGDU3DxrxeCtTDMSJu7ehtM_kzL_7eW5IFOjjdfzV-Tyqs5XW6T0qyrTDeBXKQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range July 6 2026 trend news",
    "US Iran conflict news July 6 2026 military maritime",
    "Hormuz Strait shipping status July 6 2026 news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.117 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 60（↑4）：霍尔木兹由“军事对抗”向“主权及收费博弈”转变。",
    bannerWarning: "→ 维持 能源 仓位，对冲 风险资产 波动。",
    deescalationIntent: "伊朗对海峡的主权管辖权要求与美国“航行自由”原则的对抗。",
    structuralRisk: "滞留船只开始撤离，但伊朗拟征收“服务费”计划引发航行自由权新争端。",
    contradictionNote: "伊朗对海峡的主权管辖权要求与美国“航行自由”原则的对抗。；红海胡塞武装/代理人威胁与海峡复航进程的步调不一。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第128天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.117 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 60 (↑4): Shift from kinetic blockade to sovereignty and fee-based leverage in Hormuz.",
    bannerWarning: "→ Maintain Energy positions, hedge Risk Assets volatility.",
    deescalationIntent: "Sovereign jurisdiction over Hormuz vs. Global 'Freedom of Navigation' norms.",
    structuralRisk: "Stranded vessels exiting, but Iran's proposed 'service fees' create new maritime legal friction.",
    contradictionNote: "Sovereign jurisdiction over Hormuz vs. Global 'Freedom of Navigation' norms.; Persistent Red Sea threats vs. nascent recovery in Hormuz transits.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 128",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
