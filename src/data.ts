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
  date: "2026-06-25",
  version: "v2.106",
  keyStats: [
    {
      label: "冲突天数",
      value: "D117",
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
      value: "WTI $69.15–$71.30 · Brent $72.40–$73.50",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "逐步恢复",
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
      description: "停火备忘录签署后，区域大规模交火停止，转向战后清理。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "联合国撤离计划启动，滞留商船开始有序离开。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价跳水至战前水平，战争溢价大幅缩减。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "大国通过多边协议约束冲突，介入方式转为外交监控。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "伊斯兰堡备忘录（MOU）确立了长期降级的路线图。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 40,
  change: "down",
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火备忘录进入60天执行窗口",
      "国际力量介入霍尔木兹扫雷工作",
      "外交层面转入细节行政博弈"
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
        "变化：停火备忘录签署后，区域大规模交火停止，转向战后清理。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：联合国撤离计划启动，滞留商船开始有序离开。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价跳水至战前水平，战争溢价大幅缩减。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：大国通过多边协议约束冲突，介入方式转为外交监控。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方追求航道国际化与伊朗追求地区主导权的细节对冲。"
    ],
    military: [
      "残余水雷威胁与各方海军扫雷区域重叠引发的战术摩擦。"
    ]
  },
  scoreTrend: [
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
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40,
      active: true
    }
  ],
  keyChange: "美伊签署伊斯兰堡备忘录，油价由于避险情绪退潮出现单日大幅暴跌，局势确立进入实质性降级轨道。",
  investmentSignal: "→ 减持能源对冲，增加风险资产关注。",
  prevRiskScore: 40,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "停火备忘录签署后，区域大规模交火停止，转向战后清理",
      description: "停火备忘录签署后，区域大规模交火停止，转向战后清理。",
      verification: "single",
      timestamp: "2026-06-25（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "联合国撤离计划启动，滞留商船开始有序离开",
      description: "联合国撤离计划启动，滞留商船开始有序离开。",
      verification: "single",
      timestamp: "2026-06-25（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG6pLzKDuLApk772QPs0tpsaouB7epuA_ik4X4OBJnEZWc9LW3Y4O4dUIuZDqdQxgY9eq6akXOJSN8_A6X6v8lCHU4oXoJD04NDO7oWBSmK6ZqljYdf2PhRvacpgbKaG3ZYtq_OfGcVU_GDuEc2u3WzYh4fxmGw9CQwDMHE60yU"
    },
    {
      title: "arabcenterdc.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLaycJrX589IO5_NCRmRIkB9psgDvlwUBAVxjcfdvPuWNqkiw6xoqyJOb5HFTO9l0EGCT6qAfhdjssRbI7EJw9TIkwHW7pNGuqktDV2prh7NxebUh_1W-YHmAMFwVGRSu8kndHVie0wupXVdODfH3G7MkGnzJtU8fJ8QmeWXAQL7Exb3TF3CIl0dCZi2iPiex3G9yJX4NJpO64vH-OyRyg6p2zOODiYt9C1wmxzzZV6kfTubfRT2THBKXHgQ=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEk7sQMl4K16ZOBhIfWcYZnMWhXeynK8fFEKDrGSwoTlGsWWr-BucSxmlFqoM4oZRT83hQ8ySt5oM9KcqKWE9X4XYapUWsDnp6oRbuGR458YAUdUqsZ4wRJmlM_pKvwAs5_WcEHRp9O5dhE_LVAMoHS"
    },
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLAG2ZR9q6yyXPBwULMG7OBrHZ5NWoufH8CsCN8yRPMiBTjpn_0ayGqYgUzWQSE3fqXneaOzekeMy-0kVqSDLY8022jkvu5E5PyfWlJWHHqKha-Zw-6Lcna4hDMxAlOh8Vv_sanQrnvaYtqZiK9xieQTw3fXZIe09Yw8_No_oXnJbUeuFiGSm8RpFErT3grsRoNv0p3RGhYDoF6ehcar5m"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGksYM5YdKmquWaMSnSLtWB6Ll8aoeROkrgeAxaHcav6zCPMKwrPa9vjxNP2OWGJiVmA_fKQkVMnXnLAzj3v9pwjmgWpH8GPXmGA-zmWTagqM64ob1Ach6sg2-22NMD9Ka-i3sRNyk9kTj51WfK1GIhcxsg3D3d0El41hoj3ibEGpjvmemdKNlhhlhQHI_c8NVcwKvaN0ab8fFpzIqumUTC"
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGE5p2TcKTUp9C_-gvwYi919cZygEfm55P7wRa8Oah8kMy1X1TOoM6V9a7HM5HrkiSdfF8QyES-twN9VAset1K5Kiq_kXkbxLkQP64CKIcqMu9ALE0Kq01HN6_rVDlMHLf9feLwKd8ud2EOqTLLx52wsPzyT6K51oEwriL1ifRYg0PeJw8yvWQnhZItmSOf3_ZHL-ucM9rIkwXIeeJu2sScGJr1GIfCG4puW-Ou1hfjbgwUeBmm1dcKcQn8"
    },
    {
      title: "news.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFlRiVAuW-H199Pdd1fv1_cFAMPgcjq8tL5dKfXjydVsfEQR2zvplVtykmQO1MeVtHmrbKOZ8RKNeaMeWJgibm4z028ldPe6dKVffMu6-t4u5w-TPn00iNjxBRnLzew30Ly-7rrBZZxevOSLqUFExgajRIktqW7N6I4kTGVfTYr"
    },
    {
      title: "schwab.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwA55eLOzxhxwUDFXKAnO2zGIyjMOmqQdDC5QOm4u34dkvdUDFuY2x6En0utJhudF_HhpVIlAMQHfe0o7mDaiLzr5_ujRHiCg7D5Z7zUYLTX5CTosUhazxj8vncXzAZCG3dBBfFzQA59WjGhtyhX3ntw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQPaqUbpQEBk3Yy5JOTXLQU22AveN3EyXbUUq2fdf0tfT4vXj3k58nAPL0C1NCLmJ4Zc_DAzOuYshJZzka__aYPqueGP-46t8ucQ-x8tYFBeEMDvalcwjymJpHMmvh"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1Vag_yMAmyFd642eUgX-8iRRbsGE1P5QkBPtRTj_HXsrZaWkUq_gaUCURRWwNJWwWtoDKzLPYgOBCoTwpPmN6cvQSkpwYjP0de5f1ygfw7TtYri_x16B_Vwkc89X7KFUOzn7oLUUHp-gi8Mx4sNvBb1rfPxDbTpOWD-jEAxsLvAjaHon9k-tpHdTz1MwpOPcNBHZaW9R8D93FLIU="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHl0JLBwAZ9cwaQkDvJX1KgTQBXfIWmgKkDSk4wJNmPjKrtB9Qpi4BM50kDQOHHbr-wC6Zz0N9bDzqJqZLz3ouSxU9lddDI0S5jIK996Ev_h-l84IHA_E3KktqPmqKZmEh21B7xqPFijCf_WB__U-ILuNLY0z-nN6XBXurNB4ETxw=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXbBKiLNcdrlSYDCScP9UN-awqHHLvh28ff1D4jdkVaZtKerLkqI7uw_D7RIMeWqIk9LL0drfhyql4PJ1imAaUy3Tpt_egzCFIDK8tSe5I8ZcrQsDiiqXS2IHhEXHq3zgv6gPpqH731-xeNoSrV8-lQJ_q38A7U6eZTm1vRTg6k2JHohcvFRRwR3xBHmczBPN_M2yKS4lQkBM--WM2"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range June 25 2024 Reuters Bloomberg",
    "US Iran relations official statements June 25 2024",
    "Hormuz Strait shipping status June 25 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-25",
  version: "v2.106",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D117",
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
      value: "WTI $69.15–$71.30 · Brent $72.40–$73.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Recovering",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The ceasefire framework is holding; focus shifts to demining and post-war stability.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "UN evacuation scheme is active, significantly boosting vessel confidence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Oil prices have plummeted back to pre-war levels as supply fears evaporate.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Direct intervention has transitioned from military posturing to diplomatic monitoring.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "The Islamabad MOU marks the most significant progress since the conflict began.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 40,
  change: "down",
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Islamabad MOU enters 60-day implementation period",
      "International demining efforts active in Hormuz",
      "Diplomatic focus shifts to administrative and verification details"
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
        "Change: The ceasefire framework is holding; focus shifts to demining and post-war stability."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UN evacuation scheme is active, significantly boosting vessel confidence."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices have plummeted back to pre-war levels as supply fears evaporate."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Direct intervention has transitioned from military posturing to diplomatic monitoring."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between US vision of open waterways and Iranian push for regional administrative influence."
    ],
    military: [
      "Tactical friction during demining coordination between western and local navies."
    ]
  },
  scoreTrend: [
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
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40,
      active: true
    }
  ],
  keyChange: "The signing of the Islamabad MOU led to a crash in oil prices as risk premiums vanished, marking a structural de-escalation.",
  investmentSignal: "→ Reduce energy hedges, increase focus on risk assets.",
  prevRiskScore: 40,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "The ceasefire framework is holding",
      description: "The ceasefire framework is holding; focus shifts to demining and post-war stability.",
      verification: "single",
      timestamp: "2026-06-25 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "UN evacuation scheme is active, significantly boosting vessel confidence",
      description: "UN evacuation scheme is active, significantly boosting vessel confidence.",
      verification: "single",
      timestamp: "2026-06-25 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG6pLzKDuLApk772QPs0tpsaouB7epuA_ik4X4OBJnEZWc9LW3Y4O4dUIuZDqdQxgY9eq6akXOJSN8_A6X6v8lCHU4oXoJD04NDO7oWBSmK6ZqljYdf2PhRvacpgbKaG3ZYtq_OfGcVU_GDuEc2u3WzYh4fxmGw9CQwDMHE60yU"
    },
    {
      title: "arabcenterdc.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLaycJrX589IO5_NCRmRIkB9psgDvlwUBAVxjcfdvPuWNqkiw6xoqyJOb5HFTO9l0EGCT6qAfhdjssRbI7EJw9TIkwHW7pNGuqktDV2prh7NxebUh_1W-YHmAMFwVGRSu8kndHVie0wupXVdODfH3G7MkGnzJtU8fJ8QmeWXAQL7Exb3TF3CIl0dCZi2iPiex3G9yJX4NJpO64vH-OyRyg6p2zOODiYt9C1wmxzzZV6kfTubfRT2THBKXHgQ=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEk7sQMl4K16ZOBhIfWcYZnMWhXeynK8fFEKDrGSwoTlGsWWr-BucSxmlFqoM4oZRT83hQ8ySt5oM9KcqKWE9X4XYapUWsDnp6oRbuGR458YAUdUqsZ4wRJmlM_pKvwAs5_WcEHRp9O5dhE_LVAMoHS"
    },
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLAG2ZR9q6yyXPBwULMG7OBrHZ5NWoufH8CsCN8yRPMiBTjpn_0ayGqYgUzWQSE3fqXneaOzekeMy-0kVqSDLY8022jkvu5E5PyfWlJWHHqKha-Zw-6Lcna4hDMxAlOh8Vv_sanQrnvaYtqZiK9xieQTw3fXZIe09Yw8_No_oXnJbUeuFiGSm8RpFErT3grsRoNv0p3RGhYDoF6ehcar5m"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGksYM5YdKmquWaMSnSLtWB6Ll8aoeROkrgeAxaHcav6zCPMKwrPa9vjxNP2OWGJiVmA_fKQkVMnXnLAzj3v9pwjmgWpH8GPXmGA-zmWTagqM64ob1Ach6sg2-22NMD9Ka-i3sRNyk9kTj51WfK1GIhcxsg3D3d0El41hoj3ibEGpjvmemdKNlhhlhQHI_c8NVcwKvaN0ab8fFpzIqumUTC"
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGE5p2TcKTUp9C_-gvwYi919cZygEfm55P7wRa8Oah8kMy1X1TOoM6V9a7HM5HrkiSdfF8QyES-twN9VAset1K5Kiq_kXkbxLkQP64CKIcqMu9ALE0Kq01HN6_rVDlMHLf9feLwKd8ud2EOqTLLx52wsPzyT6K51oEwriL1ifRYg0PeJw8yvWQnhZItmSOf3_ZHL-ucM9rIkwXIeeJu2sScGJr1GIfCG4puW-Ou1hfjbgwUeBmm1dcKcQn8"
    },
    {
      title: "news.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFlRiVAuW-H199Pdd1fv1_cFAMPgcjq8tL5dKfXjydVsfEQR2zvplVtykmQO1MeVtHmrbKOZ8RKNeaMeWJgibm4z028ldPe6dKVffMu6-t4u5w-TPn00iNjxBRnLzew30Ly-7rrBZZxevOSLqUFExgajRIktqW7N6I4kTGVfTYr"
    },
    {
      title: "schwab.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwA55eLOzxhxwUDFXKAnO2zGIyjMOmqQdDC5QOm4u34dkvdUDFuY2x6En0utJhudF_HhpVIlAMQHfe0o7mDaiLzr5_ujRHiCg7D5Z7zUYLTX5CTosUhazxj8vncXzAZCG3dBBfFzQA59WjGhtyhX3ntw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQPaqUbpQEBk3Yy5JOTXLQU22AveN3EyXbUUq2fdf0tfT4vXj3k58nAPL0C1NCLmJ4Zc_DAzOuYshJZzka__aYPqueGP-46t8ucQ-x8tYFBeEMDvalcwjymJpHMmvh"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1Vag_yMAmyFd642eUgX-8iRRbsGE1P5QkBPtRTj_HXsrZaWkUq_gaUCURRWwNJWwWtoDKzLPYgOBCoTwpPmN6cvQSkpwYjP0de5f1ygfw7TtYri_x16B_Vwkc89X7KFUOzn7oLUUHp-gi8Mx4sNvBb1rfPxDbTpOWD-jEAxsLvAjaHon9k-tpHdTz1MwpOPcNBHZaW9R8D93FLIU="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHl0JLBwAZ9cwaQkDvJX1KgTQBXfIWmgKkDSk4wJNmPjKrtB9Qpi4BM50kDQOHHbr-wC6Zz0N9bDzqJqZLz3ouSxU9lddDI0S5jIK996Ev_h-l84IHA_E3KktqPmqKZmEh21B7xqPFijCf_WB__U-ILuNLY0z-nN6XBXurNB4ETxw=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXbBKiLNcdrlSYDCScP9UN-awqHHLvh28ff1D4jdkVaZtKerLkqI7uw_D7RIMeWqIk9LL0drfhyql4PJ1imAaUy3Tpt_egzCFIDK8tSe5I8ZcrQsDiiqXS2IHhEXHq3zgv6gPpqH731-xeNoSrV8-lQJ_q38A7U6eZTm1vRTg6k2JHohcvFRRwR3xBHmczBPN_M2yKS4lQkBM--WM2"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range June 25 2024 Reuters Bloomberg",
    "US Iran relations official statements June 25 2024",
    "Hormuz Strait shipping status June 25 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.106 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美伊签署伊斯兰堡备忘录，油价由于避险情绪退潮出现单日大幅暴跌，局势确立进入实质性降级轨道。",
    bannerWarning: "→ 减持能源对冲，增加风险资产关注。",
    deescalationIntent: "美方追求航道国际化与伊朗追求地区主导权的细节对冲。",
    structuralRisk: "联合国撤离计划启动，滞留商船开始有序离开。",
    contradictionNote: "美方追求航道国际化与伊朗追求地区主导权的细节对冲。；残余水雷威胁与各方海军扫雷区域重叠引发的战术摩擦。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第117天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.106 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): The signing of the Islamabad MOU led to a crash in oil prices as risk premiums vanished, marking a structural de-escalation.",
    bannerWarning: "→ Reduce energy hedges, increase focus on risk assets.",
    deescalationIntent: "Clash between US vision of open waterways and Iranian push for regional adminis…",
    structuralRisk: "UN evacuation scheme is active, significantly boosting vessel confidence.",
    contradictionNote: "Clash between US vision of open waterways and Iranian push for regional administrative influence.; Tactical friction during demining coordination between weste…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 117",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
