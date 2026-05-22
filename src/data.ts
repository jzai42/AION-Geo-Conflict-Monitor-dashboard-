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
  date: "2026-05-22",
  version: "v2.72",
  riskScore: 76,
  riskTrend: "steady",
  keyStats: [
    {
      label: "冲突天数",
      value: "D83",
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
      value: "WTI $98.08–$101.91 · Brent $104.96–$108.31",
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
      description: "停火协议维持但双方持续发布攻击预警。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道吞吐量极低，封锁与主权争议并存。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "全球库存快速下降，油价维持在危机带边缘。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事资源倾斜，盟友参与度提升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判仍存在但核心利益分歧难以逾越。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美方通报伊朗谈判“微弱进展”",
      description: "美国务卿称间接对话在技术层面有所推进，但关键政治分歧依然巨大。",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "日本接收冲突后首批霍尔木兹原油",
      description: "“出光丸”号成功穿过海峡，标志着部分亚裔买家尝试恢复高风险航线。",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗拟实施海峡通行收费制",
      description: "德黑兰试图将控制权变现，通过阿曼斡旋收费方案，美方表态不接受。",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事打击暂停但动员规模未减",
      "封锁重心从武力拦截转向经济管控博弈",
      "第三方国家（日本、阿曼）介入调节航道功能"
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
        "延续：非正式停火协议在加沙与黎巴嫩边境基本维持。",
        "变化：伊朗警告美军基地若有异动将实施预防性打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国对伊朗港口的封锁已持续40天。",
        "变化：日韩油轮开始在极端保险费率下尝试小规模复航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球战略储备释放速度创历史新高。",
        "变化：市场开始定价“长期低流量”带来的结构性溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方维持“边谈边封”的极限施压策略。",
        "变化：特朗普政府表示将给德黑兰“数日时间”回复最终方案。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求承认其对霍尔木兹的主权控制权 vs 美国坚持自由航行权",
      "德黑兰要求全面解除制裁 vs 华盛顿要求先完成去核化验证"
    ],
    military: [
      "代理人武装的自主行动风险 vs 区域性停火协议的约束力"
    ]
  },
  scoreTrend: [
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
      score: 76
    },
    {
      date: "05-22",
      score: 76,
      active: true
    }
  ],
  keyChange: "美伊博弈重心从战术交火转向海峡主权与通行规则的结构性对峙。",
  investmentSignal: "→ 维持防御姿态，对冲能源市场剧烈波动。",
  change: "none",
  prevRiskScore: 76,
  webSources: [
    {
      title: "iowapublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZsKqkqGiMhCdCtF5BkfjBxFPUrfAczMJL2Y8kcrYABGH1x4UM_7DiWvliwqiZEoGyDJaGm2YZp5UTjjVJcr1pYwYFi7MuiJP6FRZAAPxek2d3wsZSj648apIiy7P0S2FG1BtFvAJykwEZeAeoPShhXJJeR-rPh1ryrzKzCOxHzxwkE-M8XjmIv2tGNHP5Z-zJpsSIeehMuKNO-8d5MXvD8n7vBfPdSzx9eL1ilXhQwBArghHmuS7V7oISB-aK9bxLu7yoHIM="
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-k9MrfPPM2a9Z9VS1r7oNhCnbVAwbuWKEHHoFHNjazkuYdK611qV9rrblTStjOP3GSiz8cxdi5JioryVdZgykJCUW29XmISGs8R07OI2Wkbynwi55bJUvx-yTyd6Jh_-9JJNLjWtNd6vxKUPObU8eDk9F8eBUq_lbf2tO6_3ZuB3gLeXUa6LHuJz3ai4wSTTgolKjOwgMxT0YswjrOx1O8J9VO97i2VU2o2hZhiM="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFu5s8Vz_Ybxl3RVcKWEWeDvbAqxOTrS0lXIvtsx0EwSEmW-XZKN_bbpWj6QNSUY-8SNkw7fNQLm2Ks3ixsGIQZ5YUNl-xrw7kUmjq1hGdM_NpEMhimZaPYTWKYPc9RP7-2kL_YTuxbf1yE8RG30FbFlMEy1APY9iUud5ANoqGumxw0OE_GFOyFi7liYb_m3CrwkSUa3GY4"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGn-QB7c-GVUJ6KrNLuLUe8YAWBB7HcEoh3g_SP39ypaU-A0Qeblgu4dzT1k24PA30KMFh4Y5QIUm6QX8uDOzhTN8D8P1ClZCEN7TBmTlnF_srC3zHEolzHWIQPRTjWp8Q7Czb3HzyX6rPjiRfXFqkJZQ=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKxSOPv3GqOiuDiLD5-ajvDpH21wr3iP3p8rX5jyGWUhP6nYv_7WIpqYtl9DegKM-Wljf3oo11QKLr0tUId0yQJarivjzJMKCPMQKAZGId4_FZgkjp9hDE3xrQd3Db8YfImcsaeGA_n7mnro0gdEeShRq82tazj-G-rA=="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGN7mL4ljVBK9JHxDUAGUcIxrxdJnVCUAyaKxea_zRPTXQd2CBR7kTnbcrkHIzftKX6E5J3sZlAiq2JN-_onUFaacu31XNz44MR6Xs8La1_CZypl3r6BPZfd3vzSmXTfDZUt5ZV0ne9mMYGattrLiY8XQl57zHlR2wDrF5_ZERU8FqEw4ciqUYjdU0erv8="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrNH1YQ4tLjzg7R8988F8nGZpRu_KsUNHpepAn8Sgdj3HVwNj_oGjANy2iPO1fVptt726dYxmX-zHB-ytLqYkVSNG0O_UlgbCWeJ8nV6kyUbY5Gyn-ji0FfTxerF1T_98bTzRYsPDuLd1rOKWhz_81U6WJrhA="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvxH3s4FYdIW2WvqzUas4ZBT_JSPBSgoMxR3JRlkUg2x9LNhQQGE-QhJWFruAdgUTwnsLjc3H4y_cTBWg0lpBwoZvpe9ddEDl2bEdWRhaHH4j2fXy_Fb4qfKBlPm9gjTWNlIHI9L3x1Hv5c6KsTWnVlU-ocwI1SFy5K0qx4yLudwLovgsuOwjry7X7epPfvzK0Zk1xn5PUS7fUy7R4jS5nXT0J5xZ_gnRoAQxhqOxvGMT0_hG7xXjCgb9T9ELiTw9V4d62FYH4BdIxJOGVBYbkk7WbM4kjX9kNiQcRxjTi2u2o08hQbgMyKFpWUqdtqEY-"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfLrCY-P2ICJVF8cYDzCMAHIdDSlviMcAGAgJ4-KT9HlLnwF5Ox-JxUyeAIaJdyEYqGMAZGZwgRWJd6aJeuqeirpJHJujRSjHW51iH-wYBK_0KUuV_PoosYUu94tz2z8PY8i0_2z8tVAxEU_-9aZLmc1IjhnsWUniDq8kx1nJcO24i-VtF8mZVKeVTtGyvnu0qX6GvQP6I7AaFynx3FefQEg=="
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFCjMgQn9WrP3P6h8y5wsj26uXpPG7Hfw72onuKuURYUWWmCKDFn-4qDGQW9hoUWOs3rd06lxoxXNXVTh_T2pZDNiZ8MZk0tupSjFk4sYSV9YqK9ch81pZGYTNMCXF7RcIY0eAyyAwSurnu-aV6es60y3Z7oqkTjZ8dew00VV3ynYHaKUJm-C6XzStU3eqiTpwb"
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjWNVXkeumt9VO3ZPOl7QlNXMZjRKVHwxvkPiq_0_nKV7_U_BP7Vtd9QmIMLniH4iLwhguAnh6K4RkFLQpUwi8znRrfTz8yWMzv0vypFKe63ptFp85plKIUeemm3_feyNg0X5kXIYFbXt83Ac-fsnz6Bq3N4DKTdRbP3hIGRuteVN9OL6kvRUQFhVgtjVVErkEaVc7JTGuY4ydfw-o_D4="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQP65y4AD8TV2GgN1qG47yCJDzduuMlUalbMPYXO2Pgo4Hyljj3o8zoK_prSTJSgWL9uBpOFVlR75C5jAI5q-tWwIk16dgxs2tDubusCK6Whe-rVAc868iVyw1E8nNtYk-Fmen85LARE_ISd2zGoVhWKt-dDeeojYUmEEhZGhnSPe5Yly_VyVD"
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status May 22 2026",
    "US Iran military conflict news May 22 2026",
    "WTI Brent oil price range forecast May 2026 conflict scenario",
    "WTI Brent price May 21 2026 May 22 2026 24h trend"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-22",
  version: "v2.72",
  riskScore: 76,
  riskTrend: "steady",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D83",
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
      value: "WTI $98.08–$101.91 · Brent $104.96–$108.31",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Passage Restricted",
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
      description: "Ceasefire holds but pre-emptive threats from both sides escalate.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic is minimal; disputes over sovereignty and tolling persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global stocks drawing fast; prices remain in the crisis band.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US prioritizes munition supply; NATO discusses post-war governance.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Negotiations ongoing but structural deadlock on core demands.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Reports 'Slight Progress' in Talks",
      description: "Secretary Rubio notes movement in indirect talks but emphasizes major gaps remain on nuclear and maritime issues.",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "First Japan Tanker Exits Hormuz Since War",
      description: "VLCC 'Idemitsu Maru' transits the strait, signaling a tentative resumption for key Asian energy importers.",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Iran Proposes Toll System for Hormuz",
      description: "Tehran seeks to formalize control via a passage fee system discussed with Oman; rejected by Washington.",
      verification: "confirmed",
      timestamp: "2026-05-22",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Kinetic strikes paused but mobilization remains at peak levels",
      "Blockade focus shifts from tactical interception to economic-sovereignty bargaining",
      "Third-party nations (Japan, Oman) testing maritime corridor functionality"
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
        "Continue: Informal ceasefire holds across major fronts.",
        "Change: Iran warns of pre-emptive strikes against US regional bases if mobilization is detected."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US blockade of Iranian shipping remains in its 40th day.",
        "Change: Select tankers from Japan and S. Korea begin transiting under extreme risk premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global SPR releases are at record-breaking speeds.",
        "Change: Markets pricing in structural 'low-flow' premiums for the third quarter."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US policy of 'negotiate while blockading' remains in effect.",
        "Change: White House gives Tehran a 'few days' to respond to the latest proposal."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's claim to Hormuz sovereignty vs. US Freedom of Navigation (FON) doctrine",
      "Tehran's demand for full sanction relief vs. Washington's de-nuclearization first requirement"
    ],
    military: [
      "Rogue proxy actions vs. the binding nature of the fragile regional ceasefire"
    ]
  },
  scoreTrend: [
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
      score: 76
    },
    {
      date: "05-22",
      score: 76,
      active: true
    }
  ],
  keyChange: "US-Iran conflict pivots from tactical exchange to structural standoff over maritime sovereignty and passage rules.",
  investmentSignal: "→ Maintain defensive posture; hedge against energy and commodity volatility.",
  change: "none",
  prevRiskScore: 76,
  webSources: [
    {
      title: "iowapublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZsKqkqGiMhCdCtF5BkfjBxFPUrfAczMJL2Y8kcrYABGH1x4UM_7DiWvliwqiZEoGyDJaGm2YZp5UTjjVJcr1pYwYFi7MuiJP6FRZAAPxek2d3wsZSj648apIiy7P0S2FG1BtFvAJykwEZeAeoPShhXJJeR-rPh1ryrzKzCOxHzxwkE-M8XjmIv2tGNHP5Z-zJpsSIeehMuKNO-8d5MXvD8n7vBfPdSzx9eL1ilXhQwBArghHmuS7V7oISB-aK9bxLu7yoHIM="
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-k9MrfPPM2a9Z9VS1r7oNhCnbVAwbuWKEHHoFHNjazkuYdK611qV9rrblTStjOP3GSiz8cxdi5JioryVdZgykJCUW29XmISGs8R07OI2Wkbynwi55bJUvx-yTyd6Jh_-9JJNLjWtNd6vxKUPObU8eDk9F8eBUq_lbf2tO6_3ZuB3gLeXUa6LHuJz3ai4wSTTgolKjOwgMxT0YswjrOx1O8J9VO97i2VU2o2hZhiM="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFu5s8Vz_Ybxl3RVcKWEWeDvbAqxOTrS0lXIvtsx0EwSEmW-XZKN_bbpWj6QNSUY-8SNkw7fNQLm2Ks3ixsGIQZ5YUNl-xrw7kUmjq1hGdM_NpEMhimZaPYTWKYPc9RP7-2kL_YTuxbf1yE8RG30FbFlMEy1APY9iUud5ANoqGumxw0OE_GFOyFi7liYb_m3CrwkSUa3GY4"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGn-QB7c-GVUJ6KrNLuLUe8YAWBB7HcEoh3g_SP39ypaU-A0Qeblgu4dzT1k24PA30KMFh4Y5QIUm6QX8uDOzhTN8D8P1ClZCEN7TBmTlnF_srC3zHEolzHWIQPRTjWp8Q7Czb3HzyX6rPjiRfXFqkJZQ=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKxSOPv3GqOiuDiLD5-ajvDpH21wr3iP3p8rX5jyGWUhP6nYv_7WIpqYtl9DegKM-Wljf3oo11QKLr0tUId0yQJarivjzJMKCPMQKAZGId4_FZgkjp9hDE3xrQd3Db8YfImcsaeGA_n7mnro0gdEeShRq82tazj-G-rA=="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGN7mL4ljVBK9JHxDUAGUcIxrxdJnVCUAyaKxea_zRPTXQd2CBR7kTnbcrkHIzftKX6E5J3sZlAiq2JN-_onUFaacu31XNz44MR6Xs8La1_CZypl3r6BPZfd3vzSmXTfDZUt5ZV0ne9mMYGattrLiY8XQl57zHlR2wDrF5_ZERU8FqEw4ciqUYjdU0erv8="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrNH1YQ4tLjzg7R8988F8nGZpRu_KsUNHpepAn8Sgdj3HVwNj_oGjANy2iPO1fVptt726dYxmX-zHB-ytLqYkVSNG0O_UlgbCWeJ8nV6kyUbY5Gyn-ji0FfTxerF1T_98bTzRYsPDuLd1rOKWhz_81U6WJrhA="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvxH3s4FYdIW2WvqzUas4ZBT_JSPBSgoMxR3JRlkUg2x9LNhQQGE-QhJWFruAdgUTwnsLjc3H4y_cTBWg0lpBwoZvpe9ddEDl2bEdWRhaHH4j2fXy_Fb4qfKBlPm9gjTWNlIHI9L3x1Hv5c6KsTWnVlU-ocwI1SFy5K0qx4yLudwLovgsuOwjry7X7epPfvzK0Zk1xn5PUS7fUy7R4jS5nXT0J5xZ_gnRoAQxhqOxvGMT0_hG7xXjCgb9T9ELiTw9V4d62FYH4BdIxJOGVBYbkk7WbM4kjX9kNiQcRxjTi2u2o08hQbgMyKFpWUqdtqEY-"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfLrCY-P2ICJVF8cYDzCMAHIdDSlviMcAGAgJ4-KT9HlLnwF5Ox-JxUyeAIaJdyEYqGMAZGZwgRWJd6aJeuqeirpJHJujRSjHW51iH-wYBK_0KUuV_PoosYUu94tz2z8PY8i0_2z8tVAxEU_-9aZLmc1IjhnsWUniDq8kx1nJcO24i-VtF8mZVKeVTtGyvnu0qX6GvQP6I7AaFynx3FefQEg=="
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFCjMgQn9WrP3P6h8y5wsj26uXpPG7Hfw72onuKuURYUWWmCKDFn-4qDGQW9hoUWOs3rd06lxoxXNXVTh_T2pZDNiZ8MZk0tupSjFk4sYSV9YqK9ch81pZGYTNMCXF7RcIY0eAyyAwSurnu-aV6es60y3Z7oqkTjZ8dew00VV3ynYHaKUJm-C6XzStU3eqiTpwb"
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjWNVXkeumt9VO3ZPOl7QlNXMZjRKVHwxvkPiq_0_nKV7_U_BP7Vtd9QmIMLniH4iLwhguAnh6K4RkFLQpUwi8znRrfTz8yWMzv0vypFKe63ptFp85plKIUeemm3_feyNg0X5kXIYFbXt83Ac-fsnz6Bq3N4DKTdRbP3hIGRuteVN9OL6kvRUQFhVgtjVVErkEaVc7JTGuY4ydfw-o_D4="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQP65y4AD8TV2GgN1qG47yCJDzduuMlUalbMPYXO2Pgo4Hyljj3o8zoK_prSTJSgWL9uBpOFVlR75C5jAI5q-tWwIk16dgxs2tDubusCK6Whe-rVAc868iVyw1E8nNtYk-Fmen85LARE_ISd2zGoVhWKt-dDeeojYUmEEhZGhnSPe5Yly_VyVD"
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status May 22 2026",
    "US Iran military conflict news May 22 2026",
    "WTI Brent oil price range forecast May 2026 conflict scenario",
    "WTI Brent price May 21 2026 May 22 2026 24h trend"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.72 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美伊博弈重心从战术交火转向海峡主权与通行规则的结构性对峙。",
    bannerWarning: "→ 维持防御姿态，对冲能源市场剧烈波动。",
    deescalationIntent: "伊朗要求承认其对霍尔木兹的主权控制权 vs 美国坚持自由航行权",
    structuralRisk: "航道吞吐量极低，封锁与主权争议并存。",
    contradictionNote: "伊朗要求承认其对霍尔木兹的主权控制权 vs 美国坚持自由航行权；代理人武装的自主行动风险 vs 区域性停火协议的约束力",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第83天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.72 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US-Iran conflict pivots from tactical exchange to structural standoff over maritime sovereignty and passage rules.",
    bannerWarning: "→ Maintain defensive posture; hedge against energy and commodity volatility.",
    deescalationIntent: "Iran's claim to Hormuz sovereignty vs. US Freedom of Navigation (FON) doctrine",
    structuralRisk: "Traffic is minimal; disputes over sovereignty and tolling persist.",
    contradictionNote: "Iran's claim to Hormuz sovereignty vs. US Freedom of Navigation (FON) doctrine; Rogue proxy actions vs. the binding nature of the fragile regional ceasefire",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 83",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
