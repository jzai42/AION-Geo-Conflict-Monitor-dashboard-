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
  date: "2026-04-29",
  version: "v2.47",
  keyStats: [
    {
      label: "冲突天数",
      value: "D60",
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
      value: "WTI $99.50–$103.20 · Brent $110.80–$113.10",
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
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
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
      description: "美伊维持相互海上封锁，美军对涉伊货轮实施强制拦截。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道流量几乎归零，联合国报告显示过境量下降95%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油站上112美元，全球遭遇有记录以来最大供应冲击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国海军执行封锁任务，外交层面大国博弈进入僵持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判因特朗普拒绝对伊让步而陷入僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普下令准备长期海上封锁",
      description: "WSJ报道称特朗普已指示五边形准备长期海军行动，以通过封锁极限施压迫使伊方让步。",
      verification: "confirmed",
      timestamp: "2026-04-29",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "阿联酋意外宣布退出OPEC",
      description: "这一历史性决定改变了海湾能源格局，进一步削弱了OPEC对油价的调控能力。",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "联合国确认霍尔木兹流量锐减",
      description: "官方数据证实该战略航道已基本对国际商业航运关闭。",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美方将海军封锁作为迫使政权接受严苛核条款的主要杠杆",
      "伊朗利用地雷及快艇不对称手段限制商业通行权",
      "能源市场已将长期供应中断视为基准情景"
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
        "延续：美军CENTCOM维持对伊朗港口的封锁网，24小时内多次拦截可疑船只。",
        "延续：伊朗革命卫队在拉拉克岛附近进行布雷演习，维持威慑。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：联合国首次量化损失，确认为95%以上的实质性断流。",
        "变化：少数通过船只被怀疑支付了所谓的“过境协调费”（CBS报道）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因阿联酋退出OPEC而加剧波动，布伦特原油冲破112美元阻力位。",
        "延续：全球商业原油库存因波斯湾断供而持续大幅消耗。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普政府展现长期封锁决心，拒绝对伊先开航道再谈核的提议。",
        "延续：德黑兰新任领导层维持强硬姿态，称美方不再具备政策制定主导权。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方坚持要求20年浓缩禁令 vs 伊方坚持要求先解禁海峡并保留核权利"
    ],
    military: [
      "美军常规海权封锁 vs 伊朗不对称水雷战与封锁要挟"
    ]
  },
  keyChange: "霍尔木兹海峡全面停摆进入第60天，美国政策向长期海军封锁转型，能源价格支撑地缘分值锁定高位。",
  investmentSignal: "→ 维持能源与大宗商品防御性头寸，减持风险资产。",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "business-standard.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGyQTOwdBT-fSGSErvFjCaffRw-3nXHprbd3XMb9diPLsccdBcBectrL-xY6Noi4WlPusexTLrEwn3X1ViFrLv6XhETu98GUeLePSSleZC7EAy-rLqn2rKVMcTx_-lNFfSHY2QuXQ5djlDBeW1Aib4ha6NpH517BXOR8MVEOi4udeTDJrxlYKgq8LDaqOHNgy-PWMcPY3XJ-TomixrGd98SqW08NYnEWfWgGpyvzaoTBwMRy95XKGsO8-hr0dlfosVDxE6Ilv52hClCigwULJS8PEvElB0="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG9U1IXglk7eVN8VPlITtHLoTmY0za-ViST4hCn0vOZX4eZlPlpn_x5PBnp09YBs06uWb5t8PY-rXAPYVah4yQKe7u-VyAWXlEbNZM2WaJLq-aIGKrnzroo2z5pSueKOQqIwkXypaASspbCTmwZj0ReYeTPZcJCpLNNAzOkEPzAsHRur5VyED7TInRenhFMzOSvdsHMSifzWlZH2cIziB3nKxb3UGB2rnExusOpq_0QC5FVjBR3tbnCqM-wLKwYSnEwtUFrtswIJT5ICMW4"
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7W6036O7idtZt3V_GIx0V0FCa7nzGxXiPxhsYMIiaJpXsC4JZ28eDDxa8zlo8TH08zzaXoliERmEyo0jdGN3Ad2j3C1j1GMAUtHlyimXE4_NWoxcqA2E_0wZigIMGL9ZBhk6PqfvDapRkYyDLAfTMRS-xFH4khJQmxm9tIMeU41vCCzdeaxr07YGUCr4LJibxhM-GYipp4aO8EWpi9pfkGArkjky-2sGWBCphC6V-T5HZ4t4PGTTEAqjOkfiAQKa1skOwL4crAbmVyZQikeIBJS0MoGfG5mMpx3EMu84VgBrsQASyRVcpW7GcDFQI11SPqTEotWKvQo9_nZ0DfustBDYVNDEf"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7xPR5ncpTldvAqIv3K8Ic6kol-bL3C2QyiYua-xal8_9AO53FPgbMM9FVgGHipk1FPevAVU3mPFkAzfrNb4vwmSHFiAs64rWPRhxAyupqhjxoNT-pvnDDy5zOjto="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkXrq4I9Xs5lOGUe_Ba-Yv5Or7XiZOnKfj3dH9yPileso3OChDx6Vd4iG7Rj_zunE3DVUSjAp0CCapHkegaddMnCPiQk2ITQgPVD2Ivls9eW_PgMu--cZ1tCmrYflNYUsrOsxw3ILcqiOaCjzAoVJnxkX5f5fyayrOKnEvTbausmeKTOQ9Cxsu2RG9"
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGTmvFAwJ7YFscjEmoXG9HHHb_WwrHOEDd14OlrXclsYzP61WOrxAA3-89Rwhm4ygB07tKc0GYVFS61yl-8sUtqQ__J15dR_NEb2cRcr6wEWVxT26Uk3xmHCfLQXNbcugGCrTor5qujZcs="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvhOv1tHM0Zq9bx15nepyYf-E9pyKzzSp_PX9abl7jEYlCuV70MVJzCTk6V8-l0ZU0_JM5e2tZwjX9x-yF4DOdPU9sNNx8Ps_66o20eHLN3x2yzqTXoposQkXgM9fqPGhhYaeukoocAO6SLDx1QLew7DF9Qk-MDn8T-JQV4a6LK-la5DRXAUOzidovsNbSPtkYr-7SQpcmmog="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbDqtkn82v81tmQ3lfo73EvEIHToCv4gEwa0dRjhscvGCnJPzC39R3T1SM0tOsLzpKYGSvaBXJQt-65J7U0hEXJ-a5ryEeIUMT2iTIgSWCjPfSmX8L6oNJF5XunGhs_qKa3GDScCjcJbLq4itL85wh1AQZGPDIDIOJedGnBqnue65X6FBbz_vLTAhU_t904rvvRwhn0VQhn3ry6tciXn887gyzq5ht98DYag=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQExCPM0MftVZaITCxIEWNChR4fJ7Vn3ugkoi1x8Ef00QZT9v1lB5BZtgnwVSeXlBaTsBcBJDQabpZ081F0jdQRUA4afZU4CHvdsdjfeOqq0jjrwMQ9ZBEvDaYYl728pQs4942vJs7ElIGGyZqgFzDAF1A=="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEsaNRwmkHAfM5fGf7jnK-ZDGsVLxIRnyix0LpFyNhWOPDlUBkLP6S1dqn2jJSvrO96Xn_jfxxGcmJzcRxhdLbO0KsbJY1t1JEaILHUEI3VnpHbD3DypOKhcNYmAP3ikft3jQzsn_2y_Y291_sk9qJq0Hd8G577PkI="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGlEJnGbNqD1sL5AdZF8cmMpsycQSWSNYZqMvKsEHV2kMVK2yAmEp_804PwxuE0CZaDeQvGEmPuvNZRRGFkiMRawefEGE2qOfM7HejI8YnT_A6L1B-ecf7sbgRFrFIiI_pXhk8vm9asGickvGTyTmrF4SNO7LC1uaGXR6ViW12kNy3PoDihoGXKwO4MhfBPpl3uyGg4Jh8qLU9DwsttmMRvAJbhyYuNpw=="
    },
    {
      title: "boereport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQENpsILeMDewDGncbT_w8KyH5fExyUFJbgVXEw_OVMub6WBtxa9kHwcr9Hq5RIB4xrsXkfAWlfHnDvp5jqwFRddDub0Aiq-oUB9TFjN6iUmFEH0BtfmfD10SPt2bszxbYQoICqCN53yTc6i52lXS1QlD4SmjG6NQquo53bMM2borK_1rQ4xHEP6gw_cyCxtpWDqgcunYvlImHhXflydwnrdPb31niAXa20S1A=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status April 2026",
    "WTI Brent oil price forecast April 2026 scenario US Iran conflict",
    "WTI Brent crude oil price today April 2024 Bloomberg Reuters",
    "US Iran military conflict news April 28 29 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-29",
  version: "v2.47",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D60",
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
      value: "WTI $99.50–$103.20 · Brent $110.80–$113.10",
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
  riskScore: 80,
  scoreTrend: [
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80
    },
    {
      date: "04-29",
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
      description: "US and Iran maintain mutual maritime blockades with direct vessel interdictions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial traffic near zero; UN reports 95% decrease in transits.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent tops $112 as global markets face the largest supply shock on record.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US Navy enforcing blockade; diplomatic stalemate at UN level.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Talks stalled as Trump rejects Iran's latest proposal for opening the strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Orders Preparation for Long Blockade",
      description: "Reports suggest a shift towards a prolonged naval blockade to force Iranian compliance.",
      verification: "confirmed",
      timestamp: "2026-04-29",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "UAE Announces Surprise OPEC Exit",
      description: "The major producer's exit signals structural shifts in energy diplomacy amid the war.",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "UN Confirms 95% Drop in Hormuz Traffic",
      description: "Official data validates the functional closure of the critical energy chokepoint.",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US utilizing naval blockade as primary leverage for nuclear concessions",
      "Iran employing asymmetric threats to maintain leverage over shipping",
      "Markets pricing in long-term disruption as the baseline scenario"
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
        "Continue: US CENTCOM maintains blockade network; multiple interdictions in last 24h.",
        "Continue: IRGC navy conducts mine-laying drills near Larak Island."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UN quantifies traffic loss at over 95% for the first time.",
        "Change: Isolated transits suspected of paying coordination fees to Iran (CBS)."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil volatility increases following UAE's OPEC exit; Brent breaks $112.",
        "Continue: Global inventories draining at record pace due to Gulf supply halt."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump administration signals readiness for a multi-month blockade.",
        "Continue: Tehran leadership maintains defiance against 'unilateral victory' claims."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US 20-year enrichment ban vs. Iranian demand for immediate blockade lift"
    ],
    military: [
      "Conventional US naval blockade vs. Iranian asymmetric chokepoint warfare"
    ]
  },
  keyChange: "Strait of Hormuz remains paralyzed for Day 60; US pivots to long-term blockade strategy while oil prices hold at crisis levels.",
  investmentSignal: "→ Maintain defensive positions in energy and commodities, reduce risk assets.",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "business-standard.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGyQTOwdBT-fSGSErvFjCaffRw-3nXHprbd3XMb9diPLsccdBcBectrL-xY6Noi4WlPusexTLrEwn3X1ViFrLv6XhETu98GUeLePSSleZC7EAy-rLqn2rKVMcTx_-lNFfSHY2QuXQ5djlDBeW1Aib4ha6NpH517BXOR8MVEOi4udeTDJrxlYKgq8LDaqOHNgy-PWMcPY3XJ-TomixrGd98SqW08NYnEWfWgGpyvzaoTBwMRy95XKGsO8-hr0dlfosVDxE6Ilv52hClCigwULJS8PEvElB0="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG9U1IXglk7eVN8VPlITtHLoTmY0za-ViST4hCn0vOZX4eZlPlpn_x5PBnp09YBs06uWb5t8PY-rXAPYVah4yQKe7u-VyAWXlEbNZM2WaJLq-aIGKrnzroo2z5pSueKOQqIwkXypaASspbCTmwZj0ReYeTPZcJCpLNNAzOkEPzAsHRur5VyED7TInRenhFMzOSvdsHMSifzWlZH2cIziB3nKxb3UGB2rnExusOpq_0QC5FVjBR3tbnCqM-wLKwYSnEwtUFrtswIJT5ICMW4"
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7W6036O7idtZt3V_GIx0V0FCa7nzGxXiPxhsYMIiaJpXsC4JZ28eDDxa8zlo8TH08zzaXoliERmEyo0jdGN3Ad2j3C1j1GMAUtHlyimXE4_NWoxcqA2E_0wZigIMGL9ZBhk6PqfvDapRkYyDLAfTMRS-xFH4khJQmxm9tIMeU41vCCzdeaxr07YGUCr4LJibxhM-GYipp4aO8EWpi9pfkGArkjky-2sGWBCphC6V-T5HZ4t4PGTTEAqjOkfiAQKa1skOwL4crAbmVyZQikeIBJS0MoGfG5mMpx3EMu84VgBrsQASyRVcpW7GcDFQI11SPqTEotWKvQo9_nZ0DfustBDYVNDEf"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7xPR5ncpTldvAqIv3K8Ic6kol-bL3C2QyiYua-xal8_9AO53FPgbMM9FVgGHipk1FPevAVU3mPFkAzfrNb4vwmSHFiAs64rWPRhxAyupqhjxoNT-pvnDDy5zOjto="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkXrq4I9Xs5lOGUe_Ba-Yv5Or7XiZOnKfj3dH9yPileso3OChDx6Vd4iG7Rj_zunE3DVUSjAp0CCapHkegaddMnCPiQk2ITQgPVD2Ivls9eW_PgMu--cZ1tCmrYflNYUsrOsxw3ILcqiOaCjzAoVJnxkX5f5fyayrOKnEvTbausmeKTOQ9Cxsu2RG9"
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGTmvFAwJ7YFscjEmoXG9HHHb_WwrHOEDd14OlrXclsYzP61WOrxAA3-89Rwhm4ygB07tKc0GYVFS61yl-8sUtqQ__J15dR_NEb2cRcr6wEWVxT26Uk3xmHCfLQXNbcugGCrTor5qujZcs="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvhOv1tHM0Zq9bx15nepyYf-E9pyKzzSp_PX9abl7jEYlCuV70MVJzCTk6V8-l0ZU0_JM5e2tZwjX9x-yF4DOdPU9sNNx8Ps_66o20eHLN3x2yzqTXoposQkXgM9fqPGhhYaeukoocAO6SLDx1QLew7DF9Qk-MDn8T-JQV4a6LK-la5DRXAUOzidovsNbSPtkYr-7SQpcmmog="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbDqtkn82v81tmQ3lfo73EvEIHToCv4gEwa0dRjhscvGCnJPzC39R3T1SM0tOsLzpKYGSvaBXJQt-65J7U0hEXJ-a5ryEeIUMT2iTIgSWCjPfSmX8L6oNJF5XunGhs_qKa3GDScCjcJbLq4itL85wh1AQZGPDIDIOJedGnBqnue65X6FBbz_vLTAhU_t904rvvRwhn0VQhn3ry6tciXn887gyzq5ht98DYag=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQExCPM0MftVZaITCxIEWNChR4fJ7Vn3ugkoi1x8Ef00QZT9v1lB5BZtgnwVSeXlBaTsBcBJDQabpZ081F0jdQRUA4afZU4CHvdsdjfeOqq0jjrwMQ9ZBEvDaYYl728pQs4942vJs7ElIGGyZqgFzDAF1A=="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEsaNRwmkHAfM5fGf7jnK-ZDGsVLxIRnyix0LpFyNhWOPDlUBkLP6S1dqn2jJSvrO96Xn_jfxxGcmJzcRxhdLbO0KsbJY1t1JEaILHUEI3VnpHbD3DypOKhcNYmAP3ikft3jQzsn_2y_Y291_sk9qJq0Hd8G577PkI="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGlEJnGbNqD1sL5AdZF8cmMpsycQSWSNYZqMvKsEHV2kMVK2yAmEp_804PwxuE0CZaDeQvGEmPuvNZRRGFkiMRawefEGE2qOfM7HejI8YnT_A6L1B-ecf7sbgRFrFIiI_pXhk8vm9asGickvGTyTmrF4SNO7LC1uaGXR6ViW12kNy3PoDihoGXKwO4MhfBPpl3uyGg4Jh8qLU9DwsttmMRvAJbhyYuNpw=="
    },
    {
      title: "boereport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQENpsILeMDewDGncbT_w8KyH5fExyUFJbgVXEw_OVMub6WBtxa9kHwcr9Hq5RIB4xrsXkfAWlfHnDvp5jqwFRddDub0Aiq-oUB9TFjN6iUmFEH0BtfmfD10SPt2bszxbYQoICqCN53yTc6i52lXS1QlD4SmjG6NQquo53bMM2borK_1rQ4xHEP6gw_cyCxtpWDqgcunYvlImHhXflydwnrdPb31niAXa20S1A=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status April 2026",
    "WTI Brent oil price forecast April 2026 scenario US Iran conflict",
    "WTI Brent crude oil price today April 2024 Bloomberg Reuters",
    "US Iran military conflict news April 28 29 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.47 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：霍尔木兹海峡全面停摆进入第60天，美国政策向长期海军封锁转型，能源价格支撑地缘分值锁定高位。",
    bannerWarning: "→ 维持能源与大宗商品防御性头寸，减持风险资产。",
    deescalationIntent: "美方坚持要求20年浓缩禁令 vs 伊方坚持要求先解禁海峡并保留核权利",
    structuralRisk: "航道流量几乎归零，联合国报告显示过境量下降95%。",
    contradictionNote: "美方坚持要求20年浓缩禁令 vs 伊方坚持要求先解禁海峡并保留核权利；美军常规海权封锁 vs 伊朗不对称水雷战与封锁要挟",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第60天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.47 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Strait of Hormuz remains paralyzed for Day 60; US pivots to long-term blockade strategy while oil prices hold at crisis levels.",
    bannerWarning: "→ Maintain defensive positions in energy and commodities, reduce risk assets.",
    deescalationIntent: "US 20-year enrichment ban vs. Iranian demand for immediate blockade lift",
    structuralRisk: "Commercial traffic near zero; UN reports 95% decrease in transits.",
    contradictionNote: "US 20-year enrichment ban vs. Iranian demand for immediate blockade lift; Conventional US naval blockade vs. Iranian asymmetric chokepoint warfare",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 60",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
