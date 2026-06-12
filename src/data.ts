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
  date: "2026-06-12",
  version: "v2.93",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D104",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓10",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $84.74–$87.71 · Brent $89.17–$90.65",
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
      prev: 5,
      weight: 0.2,
      description: "美方取消预定大规模空袭，但仍存在无人机拦截事件。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道在名义上维持关闭，但和谈协议包含重新开放条款。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3.5,
      weight: 0.2,
      description: "和平预期驱动原油空头获利，价格回落至中等风险带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方通过多国中介机构全力推进和平备忘录签署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "谈判进入实操阶段，虽然双方对最终条款存在分歧。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普叫停针对伊朗的「报复性打击」",
      description: "美军在最后时刻收到撤回命令，美方转向外交解决途径，取消原定对伊基础设施打击计划（AP/Reuters）。",
      verification: "confirmed",
      timestamp: "2026-06-11T23:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗外交部审慎回应「伟大的和解」",
      description: "发言人巴盖伊警告美方称不要单方面发布乐观预期，伊朗坚持领土安全与制裁全面解除的红线（IRNA）。",
      verification: "confirmed",
      timestamp: "2026-06-12T04:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "全球基准油价暴跌超 3%",
      description: "由于特朗普称「战争结束」，投机资本迅速撤出能源避险，布油与美油跌至近三周低点（Bloomberg）。",
      verification: "confirmed",
      timestamp: "2026-06-12T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事打击行动暂停，进入外交优先阶段。",
      "和谈协议包含解除制裁与航道开放的分阶段计划。",
      "地区代理人冲突（如黎巴嫩）的停火被列为协议先决条件。"
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
        "变化：大规模空袭计划取消。",
        "延续：美方维持海空监视高压态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗官方口径仍称航道关闭。",
        "变化：美军协助少量受损油轮撤离争议水域。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油价格出现大幅下探，市场情绪转向观望协议签署。",
        "变化：对伊制裁解除的预期开始影响远月合约。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普寻求日内瓦快速签约以稳定国内经济。",
        "延续：内塔尼亚胡对协议范围表示保留，坚持核设施红线。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方速胜/撤退需求与伊朗寻求制度安全的持久战思维"
    ],
    military: [
      "航道安全保障的排他性控制权争议"
    ]
  },
  scoreTrend: [
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72,
      active: true
    }
  ],
  keyChange: "美方取消打击并宣布达成和谈草案，风险溢价大幅修正。",
  investmentSignal: "→ 减持能源对冲头寸，获利了结；转向风险资产防御，关注协议签署进度。",
  change: "down",
  prevRiskScore: 82,
  webSources: [
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXrvjYimyZedvaU7AjBHz8bFaFFftjM9pXeW5kEnNzQoSi5QlbPd7VSkw5Wmr55ljmAUFfEvQRuO9dtAIArSFHSxqkjoSeiIgiHVdCuR5NYIMUKRFL4PiDtuYyjCLa98vH0XSRnQk_DfEbY2xCb55ThPLNdHzaIDc7m6orJWV_vc02yf7zwl9yYTlsK3TVSX4k8i6eV-t5_ztikPOLIXVFRB3l7g=="
    },
    {
      title: "xtb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEcdLdNLYzLY21EFmy68mduFZWgEplhol-VUvQKw8B354yXAdbmW9UCzgvahxprJvYfIYlOLOdJDSgOcgfvDKnQfXwsB0VHAs8cwFCU73QFVq3kWaxqXV6DWJWA53sKlKMMvlPdxW9m9eOzGi3uGXru4vxjDchGHrdjsmw-MNGXz_scLFHFUDLJV-NKZYGhYIQCpzsGyrK3R-2K_5zi6PgVmTOC3QRA4rrNKUeH4odROrAu40jDelN2I06qgnzkJbLvc6t2"
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHyP4oR1NNzs3L48eaF_nmNVrMSy0ak8AITFqaWrbkqggtGY4F7WzvazTGyaDTCVkD31G1Zl5haTjnMXnt4xDNGRRiMc275501puMLmfabt5bRs1pdMXCNZ2zrsv-IV4GmlZdusplWToGvIZQrLtg-nFObcN7E8yKTKmNMle5A0mj8_j6KEN72D2E-U7UJSH4iQYPUe5UU1TlZ7TlMag0zo_9_-P7-D1n5Ab4UduglhDdsMOSSqC7XS9Pei5RN9vuQ="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETrO-JjvFcf_b3Dm5swwqlWUSIrANYFnBRjvsXS0fxNMdd9oSg3ztjeFc7EztMjynpAvdvW8y4vqZp0FRo0kWRGfd4IY6lEpsrfBW_7je3eykZTF0XvXSZ3tAj_LYQ9uQPq4_tVDQ="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXaK8dw8aWtPtnSQclXQpNsM1papBjEqys9a5Ag22ixxtk6YPGgiLxNaiz-05s1ChCbbcgqi533EAf5SEOQvOE_mFdPBYWP6E23jSlqtGg5SAlBpfFVZI_HlICuhkR-5M_w9xRyFhK_8rgIoCYf5h9WhpwrrdjjNI8dcIc65Cuddx-2xvbQpGdOOKTg9IRwoOwJ5aAPEo8Mq-1xKUxE8Y8z24hm3ZJILTktlKEacIN"
    },
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPKRL0nrOdTUKr1KL6aL4h7D3p2kmOWTFSBdAtfC1GygeNuFvXs3zNF5fUWY7WHqcD08NHGB-T6IMbkODKTp5Mmy3jedJMafe6elA5wXRP6py0Q_OuXtpfp-I7_PSzQA=="
    },
    {
      title: "ncr-iran.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFXdcozx8TKY4R7d8xRzPO4jw98jp-PY4roY6NzAb1UMBw1sLzSHP4MHYi__5T5ZecV6MQ2DNHkDJJetQXSefXEOJ7l-e9q17ej_CqYQV6_YNsNomZRuO7EmoQfH2ujTHh3CwmLvR6IULHCOnL6IFt-PVjegFhfmVFVhd-NzDinF2L8urhkvEEmvp6lnJOTJGejvU2ivNfLzbV8Yd5p6OK0ZFvNm9tt5vr1CnJYwlnHTt239IeFIYA5HC7R"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjncfGGUNDufSG6BDnygqDg7LkxC3_T4tncGhJypKKvmj8Icpg3GvF_BDvgu9cQosoHyqiennOoiWdelmo9A-_9CX4rQwItf0eNCfhGc02sspYUsJZ9gXJS2Ut3JL_O9K9ArKEZPjHa26u7_qv16qPll87FsMUt7Jz9Aqkm6vuwQ=="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGW60MwrnK-9ZlRHsYaiRHiPu3FIGDs8KiSwCcloPe3h5LADFXLpzDaVgCsr2PlEzGsMB1GVWKg06TLUdUWVF3WJpgqV8ThxQLvh5npduXOpy6RTiErNSG0Xt6EaYHy2ErXkjldSfyhO811awiO0U3tYuhdbdiB"
    },
    {
      title: "presidentialprayerteam.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4pu4Uv8HqJqgNJ3g6ObpZNl859TyygEy0QG1ywdp8edoVMPp3OzynpJo2iXB-LWr0ZbyEvAaYaKZ7qtbRCHvUAq4-3vtH4r68MjfDoS10sruyESpr7MQQHA4Ohea_FuJ-rsBUZ-CibzR4YuULnVdl9JAMSsutu-AOL-4MrGWW42STEtu4pP1mYJWNdtCMUNwf7jgHq7G5HDRrirmY"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQIkAnXsNxdMIOjt_D23LN0daA85j8MCTfVzn1cPimIoVMeB46LIoCeyo1NEqPlSdFbu2_h7AbkYShiOmGUu-G_vZHuzLAm7DxFxg9wj8XdD4="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGeA40v2okzggN9VR2xunIkmgkM2mS_WzaHX7C-bFE4Nqu_sQ_3rGLGMHdEZG2rv1_h51Y9lTJmNcnVj3yBbReEEWG-amwCKed8viFnm4RrsCPjqvFACBvxK6ljxUHH7dSBU0qehc9c0ibC1vNm-11hS7QDZiHj0VHw1UUv4Tft"
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHuqHz9CJ3UKjnF_SXoKW-MA0SZDk52G6UFBf8bJVqyIk4JkM74E7WsRfLaPRX2xNKb2aVP4n1k8p-8u5tHBftpm7ulBWCZhcn1AZVq76boobHA-_GReoR4L7yMRFEnCb4A0EGK2tPNSpMJ97mwm26ngsZ554Kq5KiHn-S6RPljMW35Smm3_V0fMaeRKuTsp5zxQ4wJJjt32BN_TlwCP9R0G-eG8QEEGZHwD2BdYzA="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices June 12 2026 analysis",
    "US Iran military conflict news June 11 12 2026",
    "Strait of Hormuz shipping status June 12 2026",
    "Iran Ministry of Foreign Affairs official statements June 12 2026",
    "US Department of Defense Iran updates June 12 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-12",
  version: "v2.93",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D104",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓10",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $84.74–$87.71 · Brent $89.17–$90.65",
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
      prev: 5,
      weight: 0.2,
      description: "US canceled major strikes, but localized drone interceptions persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait remains officially closed but reopening terms are in the draft deal.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3.5,
      weight: 0.2,
      description: "Negotiation optimism drove oil prices down into the moderate risk zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US fully engaged in diplomatic mediation via regional intermediaries.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels upgraded to highest level; draft MoU exists.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Calls Off Retaliatory Strikes on Iran",
      description: "US military received last-minute stand-down order; focus shifted to diplomatic settlement (AP/Reuters).",
      verification: "confirmed",
      timestamp: "2026-06-11T23:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran MFA Cautions on 'Final Conclusion'",
      description: "Spokesman Baghaei warns US against premature optimism; red lines remain non-negotiable (IRNA).",
      verification: "confirmed",
      timestamp: "2026-06-12T04:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Global Oil Benchmarks Slump Over 3%",
      description: "Speculative capital exits energy hedges as Trump declares 'the war is over' (Bloomberg).",
      verification: "confirmed",
      timestamp: "2026-06-12T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military strikes paused in favor of diplomatic priority.",
      "Draft deal outlines phased sanctions relief and reopening of shipping lanes.",
      "Proxy ceasefires (e.g., Lebanon) set as deal preconditions."
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
        "Change: Mass strike plans canceled.",
        "Continue: US maintains high-pressure surveillance posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian official stance remains 'Closed'.",
        "Change: US military assisting extraction of stranded tankers."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices testing 3-week lows; markets await deal confirmation.",
        "Change: Sanctions relief expectations affecting forward contracts."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump pushes for Geneva signing to stabilize domestic economy.",
        "Continue: Netanyahu maintains reservations over scope of agreement."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US need for quick exit vs Iran's protracted regime security logic"
    ],
    military: [
      "Contested control over maritime security guarantees"
    ]
  },
  scoreTrend: [
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82
    },
    {
      date: "06-12",
      score: 72,
      active: true
    }
  ],
  keyChange: "US cancels strikes and announces draft peace deal; risk premium corrected.",
  investmentSignal: "→ Take profits on energy hedges; maintain defensive risk assets; monitor Geneva signing details.",
  change: "down",
  prevRiskScore: 82,
  webSources: [
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXrvjYimyZedvaU7AjBHz8bFaFFftjM9pXeW5kEnNzQoSi5QlbPd7VSkw5Wmr55ljmAUFfEvQRuO9dtAIArSFHSxqkjoSeiIgiHVdCuR5NYIMUKRFL4PiDtuYyjCLa98vH0XSRnQk_DfEbY2xCb55ThPLNdHzaIDc7m6orJWV_vc02yf7zwl9yYTlsK3TVSX4k8i6eV-t5_ztikPOLIXVFRB3l7g=="
    },
    {
      title: "xtb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEcdLdNLYzLY21EFmy68mduFZWgEplhol-VUvQKw8B354yXAdbmW9UCzgvahxprJvYfIYlOLOdJDSgOcgfvDKnQfXwsB0VHAs8cwFCU73QFVq3kWaxqXV6DWJWA53sKlKMMvlPdxW9m9eOzGi3uGXru4vxjDchGHrdjsmw-MNGXz_scLFHFUDLJV-NKZYGhYIQCpzsGyrK3R-2K_5zi6PgVmTOC3QRA4rrNKUeH4odROrAu40jDelN2I06qgnzkJbLvc6t2"
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHyP4oR1NNzs3L48eaF_nmNVrMSy0ak8AITFqaWrbkqggtGY4F7WzvazTGyaDTCVkD31G1Zl5haTjnMXnt4xDNGRRiMc275501puMLmfabt5bRs1pdMXCNZ2zrsv-IV4GmlZdusplWToGvIZQrLtg-nFObcN7E8yKTKmNMle5A0mj8_j6KEN72D2E-U7UJSH4iQYPUe5UU1TlZ7TlMag0zo_9_-P7-D1n5Ab4UduglhDdsMOSSqC7XS9Pei5RN9vuQ="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETrO-JjvFcf_b3Dm5swwqlWUSIrANYFnBRjvsXS0fxNMdd9oSg3ztjeFc7EztMjynpAvdvW8y4vqZp0FRo0kWRGfd4IY6lEpsrfBW_7je3eykZTF0XvXSZ3tAj_LYQ9uQPq4_tVDQ="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXaK8dw8aWtPtnSQclXQpNsM1papBjEqys9a5Ag22ixxtk6YPGgiLxNaiz-05s1ChCbbcgqi533EAf5SEOQvOE_mFdPBYWP6E23jSlqtGg5SAlBpfFVZI_HlICuhkR-5M_w9xRyFhK_8rgIoCYf5h9WhpwrrdjjNI8dcIc65Cuddx-2xvbQpGdOOKTg9IRwoOwJ5aAPEo8Mq-1xKUxE8Y8z24hm3ZJILTktlKEacIN"
    },
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPKRL0nrOdTUKr1KL6aL4h7D3p2kmOWTFSBdAtfC1GygeNuFvXs3zNF5fUWY7WHqcD08NHGB-T6IMbkODKTp5Mmy3jedJMafe6elA5wXRP6py0Q_OuXtpfp-I7_PSzQA=="
    },
    {
      title: "ncr-iran.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFXdcozx8TKY4R7d8xRzPO4jw98jp-PY4roY6NzAb1UMBw1sLzSHP4MHYi__5T5ZecV6MQ2DNHkDJJetQXSefXEOJ7l-e9q17ej_CqYQV6_YNsNomZRuO7EmoQfH2ujTHh3CwmLvR6IULHCOnL6IFt-PVjegFhfmVFVhd-NzDinF2L8urhkvEEmvp6lnJOTJGejvU2ivNfLzbV8Yd5p6OK0ZFvNm9tt5vr1CnJYwlnHTt239IeFIYA5HC7R"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjncfGGUNDufSG6BDnygqDg7LkxC3_T4tncGhJypKKvmj8Icpg3GvF_BDvgu9cQosoHyqiennOoiWdelmo9A-_9CX4rQwItf0eNCfhGc02sspYUsJZ9gXJS2Ut3JL_O9K9ArKEZPjHa26u7_qv16qPll87FsMUt7Jz9Aqkm6vuwQ=="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGW60MwrnK-9ZlRHsYaiRHiPu3FIGDs8KiSwCcloPe3h5LADFXLpzDaVgCsr2PlEzGsMB1GVWKg06TLUdUWVF3WJpgqV8ThxQLvh5npduXOpy6RTiErNSG0Xt6EaYHy2ErXkjldSfyhO811awiO0U3tYuhdbdiB"
    },
    {
      title: "presidentialprayerteam.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4pu4Uv8HqJqgNJ3g6ObpZNl859TyygEy0QG1ywdp8edoVMPp3OzynpJo2iXB-LWr0ZbyEvAaYaKZ7qtbRCHvUAq4-3vtH4r68MjfDoS10sruyESpr7MQQHA4Ohea_FuJ-rsBUZ-CibzR4YuULnVdl9JAMSsutu-AOL-4MrGWW42STEtu4pP1mYJWNdtCMUNwf7jgHq7G5HDRrirmY"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQIkAnXsNxdMIOjt_D23LN0daA85j8MCTfVzn1cPimIoVMeB46LIoCeyo1NEqPlSdFbu2_h7AbkYShiOmGUu-G_vZHuzLAm7DxFxg9wj8XdD4="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGeA40v2okzggN9VR2xunIkmgkM2mS_WzaHX7C-bFE4Nqu_sQ_3rGLGMHdEZG2rv1_h51Y9lTJmNcnVj3yBbReEEWG-amwCKed8viFnm4RrsCPjqvFACBvxK6ljxUHH7dSBU0qehc9c0ibC1vNm-11hS7QDZiHj0VHw1UUv4Tft"
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHuqHz9CJ3UKjnF_SXoKW-MA0SZDk52G6UFBf8bJVqyIk4JkM74E7WsRfLaPRX2xNKb2aVP4n1k8p-8u5tHBftpm7ulBWCZhcn1AZVq76boobHA-_GReoR4L7yMRFEnCb4A0EGK2tPNSpMJ97mwm26ngsZ554Kq5KiHn-S6RPljMW35Smm3_V0fMaeRKuTsp5zxQ4wJJjt32BN_TlwCP9R0G-eG8QEEGZHwD2BdYzA="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices June 12 2026 analysis",
    "US Iran military conflict news June 11 12 2026",
    "Strait of Hormuz shipping status June 12 2026",
    "Iran Ministry of Foreign Affairs official statements June 12 2026",
    "US Department of Defense Iran updates June 12 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.93 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↓10）：美方取消打击并宣布达成和谈草案，风险溢价大幅修正。",
    bannerWarning: "→ 减持能源对冲头寸，获利了结；转向风险资产防御，关注协议签署进度。",
    deescalationIntent: "美方速胜/撤退需求与伊朗寻求制度安全的持久战思维",
    structuralRisk: "航道在名义上维持关闭，但和谈协议包含重新开放条款。",
    contradictionNote: "美方速胜/撤退需求与伊朗寻求制度安全的持久战思维；航道安全保障的排他性控制权争议",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第104天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.93 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↓10): US cancels strikes and announces draft peace deal; risk premium corrected.",
    bannerWarning: "→ Take profits on energy hedges; maintain defensive risk assets; monitor Geneva signing details.",
    deescalationIntent: "US need for quick exit vs Iran's protracted regime security logic",
    structuralRisk: "Strait remains officially closed but reopening terms are in the draft deal.",
    contradictionNote: "US need for quick exit vs Iran's protracted regime security logic; Contested control over maritime security guarantees",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 104",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
