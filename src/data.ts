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
  date: "2026-09-03",
  version: "v2.177",
  riskScore: 70,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "代理人冲突与直接袭击并存，伊朗打击海湾美军基地。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡流量维持极低水平，商业航运基本停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在高位重组，地缘政治溢价坚挺。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军长期化部署信号明确，中俄保持外交压力。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "非正式沟通维持，但实地军事冲突削弱了互信。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D187",
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
      value: "WTI $91.27–$92.25 · Brent $96.67–$97.35",
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
  events: [
    {
      id: "EVT-01",
      title: "科威特拦截伊朗导弹",
      description: "科威特空防系统拦截了来自伊朗方向的多枚导弹及无人机，未造成重大伤亡。 (CBS News)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "美军延长中东部署",
      description: "WSJ披露美军部署计划延长至2027年，旨在确保持续封锁能力和拦截效率。 (WSJ)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "海峡流量触底",
      description: "Argus报道霍尔木兹流量跌至每日4艘，实质处于停摆边缘。 (Argus Media)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊由边界摩擦转向区域基地互袭，升级风险可控。",
      "霍尔木兹海峡通行权成为长期博弈焦点。",
      "美军转向长期封锁与防御并重的弹性战略。"
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
        "延续：美伊双方在波斯湾周边保持高频率的拦截与导弹交换。",
        "延续：美国海军继续对高价值油轮提供受限护航。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：绝大多数商业航运公司维持避开海峡的政策，物流成本激增。",
        "变化：伊朗新增11艘船只入黑名单，强化非对称海上执法。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent油价在$96附近盘整，市场预期冲突短期内难以降温。",
        "延续：美商业库存意外下降支撑了高位油价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普暗示军事行动有时间表，试图降低大选前的战争恐慌。",
        "延续：伊朗坚称攻击是对“战争罪行”的合法防卫。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国大选前的“短期打击”诉求与长期中东部署的矛盾。",
      "伊朗维持主权尊严与面对封锁导致的经济压力之间的矛盾。"
    ],
    military: [
      "美军区域封锁策略与伊朗不对称报复能力的博弈。"
    ]
  },
  scoreTrend: [
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70,
      active: true
    }
  ],
  keyChange: "美伊博弈进入基地对峙与航道封锁的“持久战”模式，风险高位趋稳。",
  investmentSignal: "→ 维持能源与避险资产仓位，对冲短期地缘波动。",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFj3xSavCBYJrtwizfnwFuOKAVDioKZpMHw5hVD1aiH_TgPo9j0K7BIC2Z3H8rSHvIX3mDrsWecBoDN5nGJEg4WioY4g4yAUmgoLxMBMdB3IiTVarfmNNzNkuYD6vkccctnHwdWC9mCZY7JL6OnweOl5Sy3fHnNLUZ6XJ6ChKgULh_dfxAw9vQ4YS2IGUizYXpFF6UFIzh8RIttc8kYNmn3oH8IZondPM2Nskl9D1-PPuHAbCiRlaRQ-gAXMiQxzZt-PPai"
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSZjGUzcnBw89bH0sc5XFxD2PEFiVUcYG69yR3b8uXSgPsLiYed3VqJviS3j5OWeftkQkKj1zaWC0OcTvaB8ifkiIdRt4X2pyedSBQAPmjhug620TJspQwxjKq7TugSc-DqPqXD9mk9EU439-xd4d62ySH493i0DscKzooEWS_xPpL85BlYIe4a0CpF0vKsj8WUBU="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGl93xb9M4dU9DFA02ED2xiwNuh_X3pPQ-gdo7SxyAzTqxrr4g2pGjqZobu2CZ6JxR7n27KSqZ2SgRlAh528P6ucKkziRYR68Dl_g=="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbQv2E0AWeXmrWGCGvj65xXlc09Hgsef7PF-7U20uq5u2p6tvHUjMDE-0bHtk-hd6eoeJpvTKcDxI9wA2e-CbhIo1csIb7IWTl_hXzgmt-rZ8IxbQDloquc0tPV358I43wQAwyoKFIiKLHZ_McYrizTN1vZHWUq4E="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8JzKplVzgl3ogSN2jMQyvllbZVdTDg3ZfFTEUMQNaJa202ejxGfEj8qrkGVpEyKKylo1T8RFlPz28H6m53qAZVL-GkW7i-UJMtPQwHZfDgBG9QsFj6-KQ6UukYzXxpLmYljjCtmPy8U0GpItC3hEm"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4xq2ArVgWIXTGBvB0dGCQxBkfiJKuJNJQIj1a0icLXyZWS56-WHLCdtuIZb2vEo7sCj-fLTE-55ljy_4I-WbuM0piLtiThJb3_O2C_hTIlDmzqh4KU5GpwisGCetLQLDIrjAxd4azZ7eyE_HZw49qRSP6p_zHxDUmUZyHNlGPOHUyWTKeC_4N9OQfFoXzwPx0QUePP1Odn9eIDBiWvaXy1Qk="
    },
    {
      title: "rigzone.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHJjFL0S2484k4f-9L5dMNTGzbItr9ddBP4FcbWZrW8DXF-6dt3T5WYMzMTHQzK0-UyLx_u13FDMLlanArsqpo3ESAMzC433DniowzZqjwRPLCMox-Cw28tRPCvOQqUUryCyrZfjT7h0dr6DWI_rsSyORZhHwtbPu6X6X1NViK3ctNPxAyqi0="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYK3q0D52cm3d9l_-_EXOX83P4KH7OT2WmG7JTyZhEHVu5T4yA3MiIyUv_I-lIGapRr0QhrRcDaYxGQ3Nc5GDM27NHX1gVHHF2pNPQXLvKBujpu90LBKCJyVph0mr_kJNlqrpXBPuUBnl9QGtjkw9x9kkYN_x8VaVtTPIjcq9mU0a7P-B4jRNFRQdjWpc="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7G083ESuusAwV_DfTIzfQNoSL_JVlIWgqw6IsZ5mPo_M8U6TE1_Vflf4QZdHmBi2N-vPgnzeNPH8YPhzEWjwg9XYF8Lo1zoVm-942FNDc5plIxWj1Q0Gj"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-_7eM84jKQscwJLZxQflwEaK4H8XG9kcFxe-0-IB0DPCLK6MfJWpP0sKt-2udmx6F8fDbRuEbM4sddG6xiywH8r83W105Dof2ZOt6cqkjFH2gxJ1rYgM-xwsdpzDHhV1-VvpqXC8="
    },
    {
      title: "coinpaper.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrZda7M8Uk3l3Pv7dnD3surRaAdcFMC_7ZAROr8VmtM5pkgZmCfl7DP6uS564hBUwSAD0HNEG58ZdJ2LkO5S0ZWNAicfkxbTEOJwvcoCttOkVAe5GkZ2ddRkHCPxAD8yzYXjDcLpY4xRqWZDWlAf5Gln_GMljO5IIYkZu6AFOoR27pc6Lio54="
    },
    {
      title: "mfa.ir",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUwfrE2Ew33-Xs2RRal_UHUH2YJQHS34e202TZuttHvqvKb3qqQC3M57RaWI-KvX3nEy11JcvzyjBYc6HPLka0rRncx8fVftQhKe5HOTqf1qouDeRcCpVVhLd0h_sI"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8B9VUcRCLqk9XfnELusiwoRvdJwTsicruVDr77en0jdBsjCcldbn0jMmMZr3J89vYbbHWQWQkU6E9_S3r-BSYFC-Ob4FXoxQqhhYYgPr0GQ0EzN2Fm5N62IOuwtDsCOryGxWcsQxyUArXK3zq7-QQ4-087ID3Id_R6HDaDkV4MA=="
    },
    {
      title: "lorientlejour.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEujcjcBUW31zjLLIW9kS5rxtXnzYozL1U7O2Ed6t83zLKa0Zdcac2MmIeTWgHz7dXIN4PSwU7wRWlALJAR0Ijl9keR9lYeizxUxbYM0rAka6jC8h9DiH_m8efNPYte7Zwqu_6jgB_OPcPcaJPrtJpQFDo2TFp2zqaprDD0qhrRcjAQavIjQCPZ0ltenVmTS3O4sqOY038BWvtGb4qpW9bJ1nPOG8hKfMVDa4UxRi28zYqKRNFVwHoDEpFd6u-eJXo4Pc0a-PTyIaWK"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price September 3 2026 forecast trends",
    "US Iran military tension Red Sea shipping news September 3 2026",
    "Hormuz Strait shipping volume reduction September 2026 report",
    "US State Department Iran statement September 2026",
    "Reuters Bloomberg oil price news September 3 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-03",
  version: "v2.177",
  riskScore: 70,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active proxy and direct strikes continue; Iran targets regional US bases.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic volume remains at record lows; commercial shipping nearly halted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices consolidating at high levels with persistent risk premium.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Clear signal of long-term US deployment; diplomatic pressure from China/Russia.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Informal channels exist but military strikes erode mutual trust.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D187",
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
      value: "WTI $91.27–$92.25 · Brent $96.67–$97.35",
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
  events: [
    {
      id: "EVT-01",
      title: "Kuwait Intercepts Iranian Attacks",
      description: "Kuwaiti air defenses engaged hostile missiles and drones following Iranian strikes on regional bases. (CBS News)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "US Middle East Deployment Extended",
      description: "WSJ reveals Pentagon quietly extended deployments through 2027 to enforce blockades. (WSJ)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Hormuz Traffic Hits Bottom",
      description: "Traffic fell to just four vessels per day amid intensifying US-Iran exchanges near the chokepoint. (Argus Media)",
      verification: "confirmed",
      timestamp: "2026-09-03",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from border skirmishes to regional base-targeting exchanges.",
      "Hormuz navigation rights remain the primary strategic leverage point.",
      "US strategy adapts to a long-term combination of blockade and defense."
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
        "Continue: High frequency of interceptions and missile exchanges across the Persian Gulf.",
        "Continue: US Navy maintains limited escort operations for high-value tankers."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global liners maintain policies to avoid the Strait, driving up logistical costs.",
        "Change: Iran adds 11 more vessels to non-compliant blacklist, tightening maritime coercion."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude consolidates near $96 as market expects no immediate cooling of tensions.",
        "Continue: Decline in US commercial inventories supports current high price levels."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump signals a timeline for strikes to mitigate pre-election economic panic.",
        "Continue: Iran justifies attacks as legitimate defense against 'war crimes'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Conflict between US pre-election demand for 'short strikes' and long-term regional deployment.",
      "Tension between Iranian sovereignty/dignity and economic pressure from the blockade."
    ],
    military: [
      "Standoff between US regional blockade tactics and Iran's asymmetric retaliation capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "08-30",
      score: 70
    },
    {
      date: "08-31",
      score: 70
    },
    {
      date: "09-01",
      score: 72
    },
    {
      date: "09-02",
      score: 70
    },
    {
      date: "09-03",
      score: 70,
      active: true
    }
  ],
  keyChange: "US-Iran standoff shifts into a 'war of attrition' mode involving base strikes and shipping blockades; risks stabilizing at high levels.",
  investmentSignal: "→ Maintain positions in energy and safe-haven assets to hedge against short-term volatility.",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFj3xSavCBYJrtwizfnwFuOKAVDioKZpMHw5hVD1aiH_TgPo9j0K7BIC2Z3H8rSHvIX3mDrsWecBoDN5nGJEg4WioY4g4yAUmgoLxMBMdB3IiTVarfmNNzNkuYD6vkccctnHwdWC9mCZY7JL6OnweOl5Sy3fHnNLUZ6XJ6ChKgULh_dfxAw9vQ4YS2IGUizYXpFF6UFIzh8RIttc8kYNmn3oH8IZondPM2Nskl9D1-PPuHAbCiRlaRQ-gAXMiQxzZt-PPai"
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSZjGUzcnBw89bH0sc5XFxD2PEFiVUcYG69yR3b8uXSgPsLiYed3VqJviS3j5OWeftkQkKj1zaWC0OcTvaB8ifkiIdRt4X2pyedSBQAPmjhug620TJspQwxjKq7TugSc-DqPqXD9mk9EU439-xd4d62ySH493i0DscKzooEWS_xPpL85BlYIe4a0CpF0vKsj8WUBU="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGl93xb9M4dU9DFA02ED2xiwNuh_X3pPQ-gdo7SxyAzTqxrr4g2pGjqZobu2CZ6JxR7n27KSqZ2SgRlAh528P6ucKkziRYR68Dl_g=="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbQv2E0AWeXmrWGCGvj65xXlc09Hgsef7PF-7U20uq5u2p6tvHUjMDE-0bHtk-hd6eoeJpvTKcDxI9wA2e-CbhIo1csIb7IWTl_hXzgmt-rZ8IxbQDloquc0tPV358I43wQAwyoKFIiKLHZ_McYrizTN1vZHWUq4E="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8JzKplVzgl3ogSN2jMQyvllbZVdTDg3ZfFTEUMQNaJa202ejxGfEj8qrkGVpEyKKylo1T8RFlPz28H6m53qAZVL-GkW7i-UJMtPQwHZfDgBG9QsFj6-KQ6UukYzXxpLmYljjCtmPy8U0GpItC3hEm"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4xq2ArVgWIXTGBvB0dGCQxBkfiJKuJNJQIj1a0icLXyZWS56-WHLCdtuIZb2vEo7sCj-fLTE-55ljy_4I-WbuM0piLtiThJb3_O2C_hTIlDmzqh4KU5GpwisGCetLQLDIrjAxd4azZ7eyE_HZw49qRSP6p_zHxDUmUZyHNlGPOHUyWTKeC_4N9OQfFoXzwPx0QUePP1Odn9eIDBiWvaXy1Qk="
    },
    {
      title: "rigzone.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHJjFL0S2484k4f-9L5dMNTGzbItr9ddBP4FcbWZrW8DXF-6dt3T5WYMzMTHQzK0-UyLx_u13FDMLlanArsqpo3ESAMzC433DniowzZqjwRPLCMox-Cw28tRPCvOQqUUryCyrZfjT7h0dr6DWI_rsSyORZhHwtbPu6X6X1NViK3ctNPxAyqi0="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYK3q0D52cm3d9l_-_EXOX83P4KH7OT2WmG7JTyZhEHVu5T4yA3MiIyUv_I-lIGapRr0QhrRcDaYxGQ3Nc5GDM27NHX1gVHHF2pNPQXLvKBujpu90LBKCJyVph0mr_kJNlqrpXBPuUBnl9QGtjkw9x9kkYN_x8VaVtTPIjcq9mU0a7P-B4jRNFRQdjWpc="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7G083ESuusAwV_DfTIzfQNoSL_JVlIWgqw6IsZ5mPo_M8U6TE1_Vflf4QZdHmBi2N-vPgnzeNPH8YPhzEWjwg9XYF8Lo1zoVm-942FNDc5plIxWj1Q0Gj"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-_7eM84jKQscwJLZxQflwEaK4H8XG9kcFxe-0-IB0DPCLK6MfJWpP0sKt-2udmx6F8fDbRuEbM4sddG6xiywH8r83W105Dof2ZOt6cqkjFH2gxJ1rYgM-xwsdpzDHhV1-VvpqXC8="
    },
    {
      title: "coinpaper.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrZda7M8Uk3l3Pv7dnD3surRaAdcFMC_7ZAROr8VmtM5pkgZmCfl7DP6uS564hBUwSAD0HNEG58ZdJ2LkO5S0ZWNAicfkxbTEOJwvcoCttOkVAe5GkZ2ddRkHCPxAD8yzYXjDcLpY4xRqWZDWlAf5Gln_GMljO5IIYkZu6AFOoR27pc6Lio54="
    },
    {
      title: "mfa.ir",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUwfrE2Ew33-Xs2RRal_UHUH2YJQHS34e202TZuttHvqvKb3qqQC3M57RaWI-KvX3nEy11JcvzyjBYc6HPLka0rRncx8fVftQhKe5HOTqf1qouDeRcCpVVhLd0h_sI"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8B9VUcRCLqk9XfnELusiwoRvdJwTsicruVDr77en0jdBsjCcldbn0jMmMZr3J89vYbbHWQWQkU6E9_S3r-BSYFC-Ob4FXoxQqhhYYgPr0GQ0EzN2Fm5N62IOuwtDsCOryGxWcsQxyUArXK3zq7-QQ4-087ID3Id_R6HDaDkV4MA=="
    },
    {
      title: "lorientlejour.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEujcjcBUW31zjLLIW9kS5rxtXnzYozL1U7O2Ed6t83zLKa0Zdcac2MmIeTWgHz7dXIN4PSwU7wRWlALJAR0Ijl9keR9lYeizxUxbYM0rAka6jC8h9DiH_m8efNPYte7Zwqu_6jgB_OPcPcaJPrtJpQFDo2TFp2zqaprDD0qhrRcjAQavIjQCPZ0ltenVmTS3O4sqOY038BWvtGb4qpW9bJ1nPOG8hKfMVDa4UxRi28zYqKRNFVwHoDEpFd6u-eJXo4Pc0a-PTyIaWK"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price September 3 2026 forecast trends",
    "US Iran military tension Red Sea shipping news September 3 2026",
    "Hormuz Strait shipping volume reduction September 2026 report",
    "US State Department Iran statement September 2026",
    "Reuters Bloomberg oil price news September 3 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.177 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美伊博弈进入基地对峙与航道封锁的“持久战”模式，风险高位趋稳。",
    bannerWarning: "→ 维持能源与避险资产仓位，对冲短期地缘波动。",
    deescalationIntent: "美国大选前的“短期打击”诉求与长期中东部署的矛盾。",
    structuralRisk: "海峡流量维持极低水平，商业航运基本停滞。",
    contradictionNote: "美国大选前的“短期打击”诉求与长期中东部署的矛盾。；美军区域封锁策略与伊朗不对称报复能力的博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第187天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.177 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US-Iran standoff shifts into a 'war of attrition' mode involving base strikes and shipping blockades; risks stabilizing at high levels.",
    bannerWarning: "→ Maintain positions in energy and safe-haven assets to hedge against short-term volatility.",
    deescalationIntent: "Conflict between US pre-election demand for 'short strikes' and long-term regio…",
    structuralRisk: "Traffic volume remains at record lows; commercial shipping nearly halted.",
    contradictionNote: "Conflict between US pre-election demand for 'short strikes' and long-term regional deployment.; Standoff between US regional blockade tactics and Iran's asymme…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 187",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
