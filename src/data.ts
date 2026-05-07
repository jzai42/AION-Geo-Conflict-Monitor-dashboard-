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
  date: "2026-05-07",
  version: "v2.56",
  keyStats: [
    {
      label: "冲突天数",
      value: "D68",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $94.51–$102.67 · Brent $101.27–$110.53",
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
      description: "美军在护航行动中击沉 8 艘伊朗革命卫队快艇，停火协议极其脆弱。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "通行量持续维持在常态的 20% 以下，伊朗推行单方面审批制度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "价格从高位回调，但仍处于 $95-$105 的高波动风险区。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国海军执行全面 blockade，并在海峡部署「自由行动」护航编队。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "出现「一页备忘录」传闻，巴基斯坦斡旋通道维持开放。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 84,
  scoreTrend: [
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88
    },
    {
      date: "05-07",
      score: 84,
      active: true
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊接触从间接转为框架性文件交换",
      "战场重心从全面空袭转为对霍尔木兹海峡的执法权争夺",
      "全球能源市场进入「停火溢价」剥离阶段"
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
        "延续：美国对伊朗关键核设施及军事基地的制空权封锁。",
        "变化：美军开始对海峡内的小型攻击快艇实施主动清除行动。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：超过 1.6 亿桶原油滞留在波斯湾内无法运出。",
        "变化：伊朗建立邮件许可机制，试图将海峡内水域「内湖化」。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：VLCC 运费因高风险溢价较冲突前飙升 70%。",
        "变化：由于和谈传闻，油价录得冲突以来最大单日跌幅（-8%）。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗最高国家安全委员会重申不放弃浓缩铀权利。",
        "变化：特朗普政府首次确认正在审查一份巴基斯坦递交的框架协议。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗彻底放弃核突破能力 vs 伊朗要求撤销所有制裁并保障政权安全",
      "霍尔木兹海峡的国际航行自由权与伊朗主权管辖权的法理冲突"
    ],
    military: [
      "美军护航编队的「先发制人」规则与 IRGC 「狼群战术」的低烈度高频碰撞"
    ]
  },
  keyChange: "美伊博弈重心由单纯军事打击转向基于「海峡通行权」的谈判筹码对价。",
  investmentSignal: "→ 减持风险资产，利用反弹对冲能源头寸，维持防御性配置。",
  change: "down",
  prevRiskScore: 88,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美军在护航行动中击沉 8 艘伊朗革命卫队快艇，停火协议极其脆弱",
      description: "美军在护航行动中击沉 8 艘伊朗革命卫队快艇，停火协议极其脆弱。",
      verification: "single",
      timestamp: "2026-05-07（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "通行量持续维持在常态的 20% 以下，伊朗推行单方面审批制度",
      description: "通行量持续维持在常态的 20% 以下，伊朗推行单方面审批制度。",
      verification: "single",
      timestamp: "2026-05-07（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzQMbsIZjzZqvtz-r-iytzqTR_BgSE2Iml8NAawAampeKfTEjv5rnGdxD6DYRpiVM4ujRQtl2lo937z8qEey2L9CRrGI5QBdVHPnXzRqG1zN7YaTJfnSmeZ5AKlrwpkf75Xn-MDPrLY_80QmRNEn6lB6wKy56XvMS9b893F-WIYQmVlo4r32CIDvEZvBZbiRbc1UH49AxgahjyzE4="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe7jhXYjV4JoVN1HyjJIqPp-eSrxyHECTgWLmP8MNx5mstcnllBeN54JwDY4PCod_ZDDjeW9h4dybt9vT3o4crNCwLNIuGPo2xQp2Fojav-V4z-LcChjfNgf5j4_fC2bBGygbMP_ep5fcUqgDFYyDMjR2RwA=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUHKbPlAMHrcWqBa7_2atBTXjXZac0KyPN65l_-CMs6TwMJ5QKFuHy69WsHWqkXnni_4NqP8XgFkL4wXOSwxexpBgCd9clcN50xJJJavG4qtzVWR7bGYvkXG0izDEIM1mdp3C80oMHo6F2K6gve0_P_ks_KSDmTeLPP4AroyvgrJrU_ojSvWTPM7Xx2OgeaDmfeh5qugBFFgCdNz2MhKtB9AqX2A_ha6ra-sjx4ZaFSz8="
    },
    {
      title: "thesoufancenter.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjbqLeuqnXbfxzOk4qSBnvewmsq1b3DEuLFX6PHbkHCcgAGqdbuvS3dNENm7F2ywgpZ5X7eLxyA9HcLVOvGw020yCICdzUBCo_pYhHa8Av3x1Dz0B6gcA6BOP7SuRhQLuFJRlyYgF7cGuGlAE="
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH82CLEX0FyUiCbzL1dIjb-q1l1hiv2OQQVih789plupADnYTcZNAci1_jD9OCc8TVeqN5ZsbZ2m9tK1_fNcXXyNzD5p2AC3b4_WfZEvEvcgA6SH0lbBqvSrHs28wNhDGy39sN5TkGktJPSGxzofjS1HTK1Ma43ft9pANfuKZnj1Cfwv1Dum7dElP-94irY0gelEi9SgvLk0eQ204r0ILM="
    },
    {
      title: "ajc.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEgHx9GGEDBQ3Nq7NHT0E8AOGnJF7_IhCrLNe7Cf5wl_MzZjCehs3-uakK7sV_1C9kqxCRrlb9EGXkJQneISKiADYzApSvccfiqb-xcwNhuUS5LbKdI36nlQmPIRrTCBEfm-q4Kp5akrufBIQBoeVTcap_fgE73CyaWS63vCFXkw1YNdHPdHlspz9-_JE5mpQ=="
    },
    {
      title: "medium.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVZHEsaYkJd0r9PuX00ygL0clWNbutwyd2CEBzZKMT0f23wY7V8B5Qf7wp3i8irCQW-ymu7xAINLnxFzFYEh2TuYnxoAwMu0giz4slVGQsIWFXIzPWjIQRU21nax2hENNFi3Vebs4_DhusMdlIBJK8GIh_SHiVbLDHBwWuhJUjlcPi96iT8Jyc5kwKs5m_ciRa7tQODebI8u21hRA3kVYWdjyv6lVAgYuNNWKBAsbqc-WSL7qaFGlGWStNK6sHfVKzDJN6GJztMQ_fg5HygoT4sA=="
    },
    {
      title: "spglobal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEU8tCJg4g7AUi4x1ofHF-RSn_W_GW1wiO0tXtYOyEwSCEdCXWlnin6ivCX2GfAJ65fIetu5tjlXGB8PlHdDx7IaiwTa3DlmzdJ9mZRiD6Ct5ys7b53TNjAUM3Dvr1DTuJeuf2vgZnnPAe7BZ_M2UQ1tjZbCj96U3pcucyLG8igx2dglB8TqDWwoNQY0GpLRHmBc4ZaipO8d6k6ysu9CxjDRI89z60hDhe6j18e1Cp2R1dR6cZEfODzRH8ojbqB39bDYnLj5iI_eYCypNqwicU="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHqvnTwoZwNjTMnXn_HL5eruePGmgDb6X5QRNf7xbTGda3usutupMUMl5v-j-cDSxAFBN0w9eT2xwtL8ggyoP_s515sGQhZZA9_ij6snUE9KD-gCJqGu1IuSHyYliCWfERRJ36IMwdsTZOYFc9cUkfOasu478XciK98XQDRVXvClmHGRPRGkQS4Z6fp8T_r_H2SDWgO8zHIyIrFtamqPNVoUaSXySbYyGHlrkCGSw=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGym5Es_a3ibzuCFkLOkf6G46_43E4N90G7VNHjuM05BJn2B-DgCDrISJ1yoAedzZ_685P6j8qVOm5HaKRpMSQ190zGdneZHePxj-1joOnLFJLr5iMbYevDdDD1kUqZXLDNRzmYWA=="
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3eFODM1i2Ll0b_AsrVQFY38fExOzvTD-S-5WFq_PDctVzMrRFHyXmXVgnpL1BUy5l6lrUsY49jE4-Q7UGgE_WdbO6dbbPZAKvp2fo1sy6ujsx0Vvgq6KiMIc-lIsj2hlDAcjJILEwYhetDC6qJ0MI6UdgpAP4UAvAzSmQo2Zhjpz3M1Rw-Urv0XrJSys3N2Cm5NER3Ed444Y1OnoMkZcXYlIRuyB6mnmUGw=="
    },
    {
      title: "politicsociety.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHg4jHWiG_1GzIj38DgO7e1xAkWEsT10SkEH-o-B5vQlh3bhW4d2_w7OzlHaFcFcONtEz5OWiM7kO3TnNbqUBcW8_NW3MigE0F5HkWcO3dmQcWvePSj1PrjsIWj_asExNvfKeUfKks33zb5-zqpInutfzt0Z3S_0SFOcI5SfNudUPM6avGbmqdYwkVmZV00aQVcM9uVO9eiDxLFASW254G9o3l7h5MIDQ3P__tRBWDPBWMLjFrT_F-VpCbsoA4_CGCnhJUU9xTT0pvfF7EvSGArUkk="
    }
  ],
  webSearchQueries: [
    "US Iran military conflict news October 2024 2026",
    "US Iran conflict May 2026 simulation trends",
    "Hormuz Strait shipping status October 2024 2026 news",
    "WTI Brent crude oil price range May 6-7 2024 2025 2026 news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-07",
  version: "v2.56",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D68",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $94.51–$102.67 · Brent $101.27–$110.53",
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
      description: "US Navy destroyed 8 IRGC fast attack craft during 'Project Freedom' escort operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Traffic remains at 18% of normal levels; effective maritime blockade continues.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices plummeted on ceasefire rumors but remain in the $95-$105 high-volatility range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains naval blockade and strategic buildup; China/Russia pressuring for de-escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Reports of a 'one-page MOU' via Pakistani mediation; channels are active.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 84,
  scoreTrend: [
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88
    },
    {
      date: "05-07",
      score: 84,
      active: true
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from kinetic strikes to bargaining over Hormuz transit rights",
      "Market pricing in 'ceasefire potential' leading to extreme volatility",
      "Pakistan emerging as the critical diplomatic bridge between DC and Tehran"
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
        "Continue: US air superiority maintained over Iranian nuclear sites.",
        "Change: Shift to proactive neutralizing of IRGC 'swarm' boats in the Strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: War risk insurance premiums stuck at 2.5% levels.",
        "Change: Iran attempts to institutionalize a permit-based transit regime."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Significant supply deficit as 163M barrels remain trapped in the Gulf.",
        "Change: Oil recorded its largest single-day drop (-8%) since the war began."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hardline IRGC factions demand complete US withdrawal from the Gulf.",
        "Change: Trump acknowledges reviewing a framework deal for the first time."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for permanent nuclear cessation vs Iran's regime survival guarantees",
      "International navigation rights vs Iran's claimed territorial control of the Strait"
    ],
    military: [
      "Clash between US 'preventive engagement' and IRGC's asymmetric denial strategy"
    ]
  },
  keyChange: "Geopolitical gravity has shifted from air/missile exchanges to the Islamabad negotiation table.",
  investmentSignal: "→ Reduce risk asset exposure, hedge energy shorts, and maintain defensive gold positions.",
  change: "down",
  prevRiskScore: 88,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "US Navy destroyed 8 IRGC fast attack craft during 'Project Freedom' escort operations",
      description: "US Navy destroyed 8 IRGC fast attack craft during 'Project Freedom' escort operations.",
      verification: "single",
      timestamp: "2026-05-07 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Traffic remains at 18% of normal levels",
      description: "Traffic remains at 18% of normal levels; effective maritime blockade continues.",
      verification: "single",
      timestamp: "2026-05-07 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzQMbsIZjzZqvtz-r-iytzqTR_BgSE2Iml8NAawAampeKfTEjv5rnGdxD6DYRpiVM4ujRQtl2lo937z8qEey2L9CRrGI5QBdVHPnXzRqG1zN7YaTJfnSmeZ5AKlrwpkf75Xn-MDPrLY_80QmRNEn6lB6wKy56XvMS9b893F-WIYQmVlo4r32CIDvEZvBZbiRbc1UH49AxgahjyzE4="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe7jhXYjV4JoVN1HyjJIqPp-eSrxyHECTgWLmP8MNx5mstcnllBeN54JwDY4PCod_ZDDjeW9h4dybt9vT3o4crNCwLNIuGPo2xQp2Fojav-V4z-LcChjfNgf5j4_fC2bBGygbMP_ep5fcUqgDFYyDMjR2RwA=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUHKbPlAMHrcWqBa7_2atBTXjXZac0KyPN65l_-CMs6TwMJ5QKFuHy69WsHWqkXnni_4NqP8XgFkL4wXOSwxexpBgCd9clcN50xJJJavG4qtzVWR7bGYvkXG0izDEIM1mdp3C80oMHo6F2K6gve0_P_ks_KSDmTeLPP4AroyvgrJrU_ojSvWTPM7Xx2OgeaDmfeh5qugBFFgCdNz2MhKtB9AqX2A_ha6ra-sjx4ZaFSz8="
    },
    {
      title: "thesoufancenter.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjbqLeuqnXbfxzOk4qSBnvewmsq1b3DEuLFX6PHbkHCcgAGqdbuvS3dNENm7F2ywgpZ5X7eLxyA9HcLVOvGw020yCICdzUBCo_pYhHa8Av3x1Dz0B6gcA6BOP7SuRhQLuFJRlyYgF7cGuGlAE="
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH82CLEX0FyUiCbzL1dIjb-q1l1hiv2OQQVih789plupADnYTcZNAci1_jD9OCc8TVeqN5ZsbZ2m9tK1_fNcXXyNzD5p2AC3b4_WfZEvEvcgA6SH0lbBqvSrHs28wNhDGy39sN5TkGktJPSGxzofjS1HTK1Ma43ft9pANfuKZnj1Cfwv1Dum7dElP-94irY0gelEi9SgvLk0eQ204r0ILM="
    },
    {
      title: "ajc.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEgHx9GGEDBQ3Nq7NHT0E8AOGnJF7_IhCrLNe7Cf5wl_MzZjCehs3-uakK7sV_1C9kqxCRrlb9EGXkJQneISKiADYzApSvccfiqb-xcwNhuUS5LbKdI36nlQmPIRrTCBEfm-q4Kp5akrufBIQBoeVTcap_fgE73CyaWS63vCFXkw1YNdHPdHlspz9-_JE5mpQ=="
    },
    {
      title: "medium.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVZHEsaYkJd0r9PuX00ygL0clWNbutwyd2CEBzZKMT0f23wY7V8B5Qf7wp3i8irCQW-ymu7xAINLnxFzFYEh2TuYnxoAwMu0giz4slVGQsIWFXIzPWjIQRU21nax2hENNFi3Vebs4_DhusMdlIBJK8GIh_SHiVbLDHBwWuhJUjlcPi96iT8Jyc5kwKs5m_ciRa7tQODebI8u21hRA3kVYWdjyv6lVAgYuNNWKBAsbqc-WSL7qaFGlGWStNK6sHfVKzDJN6GJztMQ_fg5HygoT4sA=="
    },
    {
      title: "spglobal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEU8tCJg4g7AUi4x1ofHF-RSn_W_GW1wiO0tXtYOyEwSCEdCXWlnin6ivCX2GfAJ65fIetu5tjlXGB8PlHdDx7IaiwTa3DlmzdJ9mZRiD6Ct5ys7b53TNjAUM3Dvr1DTuJeuf2vgZnnPAe7BZ_M2UQ1tjZbCj96U3pcucyLG8igx2dglB8TqDWwoNQY0GpLRHmBc4ZaipO8d6k6ysu9CxjDRI89z60hDhe6j18e1Cp2R1dR6cZEfODzRH8ojbqB39bDYnLj5iI_eYCypNqwicU="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHqvnTwoZwNjTMnXn_HL5eruePGmgDb6X5QRNf7xbTGda3usutupMUMl5v-j-cDSxAFBN0w9eT2xwtL8ggyoP_s515sGQhZZA9_ij6snUE9KD-gCJqGu1IuSHyYliCWfERRJ36IMwdsTZOYFc9cUkfOasu478XciK98XQDRVXvClmHGRPRGkQS4Z6fp8T_r_H2SDWgO8zHIyIrFtamqPNVoUaSXySbYyGHlrkCGSw=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGym5Es_a3ibzuCFkLOkf6G46_43E4N90G7VNHjuM05BJn2B-DgCDrISJ1yoAedzZ_685P6j8qVOm5HaKRpMSQ190zGdneZHePxj-1joOnLFJLr5iMbYevDdDD1kUqZXLDNRzmYWA=="
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3eFODM1i2Ll0b_AsrVQFY38fExOzvTD-S-5WFq_PDctVzMrRFHyXmXVgnpL1BUy5l6lrUsY49jE4-Q7UGgE_WdbO6dbbPZAKvp2fo1sy6ujsx0Vvgq6KiMIc-lIsj2hlDAcjJILEwYhetDC6qJ0MI6UdgpAP4UAvAzSmQo2Zhjpz3M1Rw-Urv0XrJSys3N2Cm5NER3Ed444Y1OnoMkZcXYlIRuyB6mnmUGw=="
    },
    {
      title: "politicsociety.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHg4jHWiG_1GzIj38DgO7e1xAkWEsT10SkEH-o-B5vQlh3bhW4d2_w7OzlHaFcFcONtEz5OWiM7kO3TnNbqUBcW8_NW3MigE0F5HkWcO3dmQcWvePSj1PrjsIWj_asExNvfKeUfKks33zb5-zqpInutfzt0Z3S_0SFOcI5SfNudUPM6avGbmqdYwkVmZV00aQVcM9uVO9eiDxLFASW254G9o3l7h5MIDQ3P__tRBWDPBWMLjFrT_F-VpCbsoA4_CGCnhJUU9xTT0pvfF7EvSGArUkk="
    }
  ],
  webSearchQueries: [
    "US Iran military conflict news October 2024 2026",
    "US Iran conflict May 2026 simulation trends",
    "Hormuz Strait shipping status October 2024 2026 news",
    "WTI Brent crude oil price range May 6-7 2024 2025 2026 news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.56 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（↓4）：美伊博弈重心由单纯军事打击转向基于「海峡通行权」的谈判筹码对价。",
    bannerWarning: "→ 减持风险资产，利用反弹对冲能源头寸，维持防御性配置。",
    deescalationIntent: "美国要求伊朗彻底放弃核突破能力 vs 伊朗要求撤销所有制裁并保障政权安全",
    structuralRisk: "通行量持续维持在常态的 20% 以下，伊朗推行单方面审批制度。",
    contradictionNote: "美国要求伊朗彻底放弃核突破能力 vs 伊朗要求撤销所有制裁并保障政权安全；美军护航编队的「先发制人」规则与 IRGC 「狼群战术」的低烈度高频碰撞",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第68天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.56 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (↓4): Geopolitical gravity has shifted from air/missile exchanges to the Islamabad negotiation table.",
    bannerWarning: "→ Reduce risk asset exposure, hedge energy shorts, and maintain defensive gold positions.",
    deescalationIntent: "US demand for permanent nuclear cessation vs Iran's regime survival guarantees",
    structuralRisk: "Traffic remains at 18% of normal levels; effective maritime blockade continues.",
    contradictionNote: "US demand for permanent nuclear cessation vs Iran's regime survival guarantees; Clash between US 'preventive engagement' and IRGC's asymmetric denial strategy",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 68",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
