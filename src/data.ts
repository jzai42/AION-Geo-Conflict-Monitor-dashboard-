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
  date: "2026-08-29",
  version: "v2.172",
  riskScore: 70,
  change: "down",
  keyStats: [
    {
      label: "冲突天数",
      value: "D182",
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
      value: "WTI $82.3–$83.8 · Brent $88.3–$89.5",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "受限恢复",
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
      description: "美军拦截伊方弹道导弹袭击，美方宣布推迟预定的大规模打击计划。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主航道水雷基本清除，美方声称控制航道，但伊朗仍拒绝非协调性过境。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "国际油价在谈判预期下回落，布伦特原油跌破 90 美元。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美沙联合行动延续，中国明确反对针对伊朗的“经济大决战”升级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "阿曼与卡塔尔斡旋的航运走廊建议已进入技术细节讨论阶段。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军宣布霍尔木兹海峡主航道清雷完毕",
      description: "中央司令部确认伊朗部署的数千枚水雷已被清除，国际公认航线恢复安全。",
      verification: "confirmed",
      timestamp: "2026-08-28T20:15:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "特朗普暂缓大规模对伊空袭",
      description: "总统表示听取地区盟友建议，在启动“斩首”打击前尝试最后的外交努力。",
      verification: "confirmed",
      timestamp: "2026-08-29T02:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "伊朗与阿曼公布航运通道方案",
      description: "方案提议建立穿越阿曼和伊朗水域的中央频道，供受保护商船通行。",
      verification: "confirmed",
      timestamp: "2026-08-28T21:40:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军扫雷任务完成标志着第一阶段海上封锁战术告一段落",
      "白宫将重心转向“经济 D-Day”与外交博弈的组合拳",
      "伊朗最高层释放愿意在有条件框架下讨论重启海峡通行的信号"
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
        "延续：美军维持对伊拉克境内亲伊武装弹药库的常规打击。",
        "变化：特朗普撤销原定于今日凌晨启动的对伊朗本土指挥中心的空袭指令。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军通告扫雷成功，极大地降低了商船因触发沉雷导致的物理受损风险。",
        "延续：商船仍普遍采取“武装安保”或标注“中资背景”等手段防范伊朗拦截。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价录得半年多来最大单周跌幅，地缘政治溢价快速收缩。",
        "延续：美国战略石油储备处于 1982 年以来低位，限制了其长期平抑价格的能力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗总统向特朗普喊话，要求重回对话轨道并停止制造地区混乱。",
        "变化：美国财长贝森特呼吁全球切断伊朗经济命脉，向不合作国家施压。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国对伊朗全面经济孤立的决心与中国捍卫贸易利益的矛盾",
      "伊朗要求解除全面封锁与美方要求先撤出代理人武装的先决条件矛盾"
    ],
    military: [
      "美军追求绝对海权控制与伊朗利用地缘近接性维持非对称威胁的博弈"
    ]
  },
  scoreTrend: [
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70,
      active: true
    }
  ],
  keyChange: "美军完成清雷及大规模打击延后，促使局势从战争边缘向复杂谈判博弈转变。",
  investmentSignal: "→ 维持防御性配置，可适度减持能源及大宗商品风险溢价部位，关注风险资产修复。",
  prevRiskScore: 74,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFD_8OiNMLXAfY2PwHKBEJWE2QFXTWoCh_J_T6drPWGKe0qWFI_tnwz8SV0iPmOnpouZ1EZP-Pt_WBOJWfqOc5djgttoOhMK5IjfuBhIQHY421HEIUAPbj3ZYIBsTwhcAGatFkhSVuJOK_A-I4K4K25SoTOlnKeXGgZ-vj9lxNL"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGI5jCT8gW6RUwDxsToT1eRpmIUh87iInCkiw-4adNGvGuZQ07akthnhQFuNgeYYNVaOkT8hQIPFaA4W3beTlq3Hcvj5TOxUw0z0NLkJL5FINlireJ69MM0k8Vh6o0TIADDSJIhc3jV2jxWCuPE3JE3QyS6y9E="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF345F96hb7GMgtUeDRqFszIUMqfzcrSSBZGq2k4b0c9O6fbAB1pTFT2w3I2VzpY8xQQOqGqRVf-2BCvG1Z5XN5lRs6h-f7Gj_Bw4Ei3mvFyy7SJEHXj-BorVYNZ_TdxdFJe0T4QIDyzP34fpddTU8GUL6bmgteFPXutsY2NDetJbVm"
    },
    {
      title: "janes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH119tSRCRq6TeL0ie250NdGyPTUQ0VrIv1w_Vcc03jLAeLzgoyGFBlzEtpjwkTGhSvrFOkNZZfhnoo8Khijz-DOG9vBGfaRXhsNL3c5auWNv55LPGIGdADJQwBoF6tOeGUlsfw2r6_yyHvWamQbf9Uwg7WRMSDTKyh_ExG6dcHxhrYYdWDdgHABzcujGrhxwguNXOS3ZoQdT56HOAEeFZbWTesaHJQiBUrZ1AvaP1ZZYk--rquxsODbbpES714GQ=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFXU3FEy5F8haxcGUgfUfZ3ct6a_z0guiADXCNkZfldUFw-bz5HuMAL6pgBaieSyfGzSilOrbXj8GJLGY5oe68uP9ccyL9_S9aKD5Q4_N1PmahdM1TMYI0rwFqcyvi8PqOP"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzF66I--xKpfk9AWYNVRDfOzMa-5LygZyxMRW5cVxMEOGccfJ-yNXe8qvnyacI-sjPFGGvFsRvsOMD_5FQxmd3QXV7XTno7dXw7BhH5mQrse5wanKNqA2APqxqcfYspgPCgM0-lMEtwM5J1qoyQ8rxcVV-29C7jW11WvjvXcsftC6L8hPRozkULykL"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSDWFdf8HQKrvnoBxIzQQq0TKQ8xeR0gjAjAB6NnlObzU05M2LnM7ex679zA4NFdvyy9GzED1WXteWi2OHEO5CuwDb5ZgJ7jQlwYzqJrSROMpO-ElhcUxBmeCFK_yc0SRUX3VfnUBSOWXcmJBlHhqnSvNFNd2n6oj-i5KZGrmbRUr9HVt67-FziDNm9BBgh6Vfz_OSVjjm0x4aSmUsMAP4iQ=="
    },
    {
      title: "stlouisfed.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIzdKQELquEj7Y9ok3L66LekNI-3HPl5X3hJ627IyXjXi4S-UtetDbpJc0synRcoqrlIO6AhPQy9Q0dfNHpHzaxN2XKXVd3wGBPuJQUCBdUIHL4Aj0r6j7sy87Y536GRXeABE="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr4RevB03-ktBM--cN0kdJ2sXj_PhIowSbrm0YZwRkaHygw7GUedKpYe3DzNJhFYcMxzrRneaMCW3DPIuyUdNUPAHKlNqaP_fUsRfDBKLpiW6ujrXL0YJhmN8P-7JKTXKBzZwrdgI="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8ywrEOc3OEqAIvl5S7I_icQS5epMQ_F4jGcxzLwbUYhpGcBv8OenIgqr-V55WAMUilivdJOhdC1aOHrHIs6K38tI2PMbHGG2ERIBLSO1z6dNEP6cKk-ewvKoj8trjsx1d"
    },
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEx89qOB1APRSSxhYs9PGP5aEDDuCJOgRJrR_wuZOHeFxymzbjPg39OlkoleyOm--FX4yt6yiWY0o50TYmdbbdRsiO7W6yZiIgc7yGW0sSwQOL_TxgO3epAH1asNZTVKJuUL67MQp9b-GzGVxE5JfzMd6UivbJW_mgKRJsJXD-5W2V-T93cPVKVEr_saaFISL9ta0EYWt6Ai7aSHSIw2pJCyV-Tm8cdOO14wVVb8uQlq84U0GdSUfQq9w=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQESz4MpFBiq45WQrepuey6UNBh2VSn3wpj0B2XQV8VPKqgnGwT--IU93UhQ7SfAruDTBwaqGrCV-4CN2S3tQb7cQkZPDEiHiDFlbPPW7aelGJjc89wj3Ob_lF4Dq8ebTGKyk="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 29 2024 current range trend",
    "WTI Brent oil price today Reuters Bloomberg August 2024",
    "US Iran military tension news August 29 2026 D182 status",
    "Strait of Hormuz shipping status August 2026 news"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-29",
  version: "v2.172",
  riskScore: 70,
  change: "down",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D182",
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
      value: "WTI $82.3–$83.8 · Brent $88.3–$89.5",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Limited Recovery",
      unit: "Ref.",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US continues to intercept proxy missiles while halting a major direct strike plan.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Mines cleared from international lanes, but Iran still disputes unilateral US control.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 3,
      weight: 0.2,
      description: "Crude prices fall on Fed hawkishness and rumors of a maritime corridor deal.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US-Saudi coordination remains firm; China rejects US 'Economic D-Day' pressure.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4.5,
      weight: 0.2,
      description: "Technical talks on an Oman-brokered shipping route map have surfaced.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US CENTCOM Completes Mine Clearing in Hormuz",
      description: "International shipping lanes in the Strait of Hormuz are declared free of naval mines after a months-long operation.",
      verification: "confirmed",
      timestamp: "2026-08-28T20:15:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Trump Halts Major Retaliatory Strike",
      description: "The President pulls back from a massive 'decapitation' strike to allow for regional diplomatic mediation.",
      verification: "confirmed",
      timestamp: "2026-08-29T02:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Completion of mine clearing signals a shift from tactical blockade to managed transit.",
      "White House focus pivots toward economic isolation combined with diplomatic leverage.",
      "Tehran signals openness to technical corridor arrangements under specific lifting of port blockades."
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
        "Continue: Regular strikes on pro-Iranian militia depots in eastern Iraq.",
        "Change: Trump administration cancels a massive planned airstrike on Iranian command centers."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US Navy confirms the removal of nearly 90% of Iran's known naval mine inventory in the Strait.",
        "Continue: Tankers continue to broadcast specific flags to avoid being targeted by the IRGC."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil benchmarks see sharp weekly declines as geopolitical risk premium contracts.",
        "Continue: Concerns remain over the low US Strategic Petroleum Reserve inventory levels."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian leadership calls for the implementation of the June memorandum to de-escalate.",
        "Change: US Treasury Secretary Bessent warns allies to sever all remaining economic lifelines to Tehran."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US determination for total isolation vs. China's defense of trade interests.",
      "Iran's demand for blockade lifting vs. US demand for proxy withdrawal."
    ],
    military: [
      "US pursuit of maritime control vs. Iran's asymmetric threat capability."
    ]
  },
  scoreTrend: [
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70,
      active: true
    }
  ],
  keyChange: "Successful mine clearing and strike postponement shift the conflict toward a complex negotiation phase.",
  investmentSignal: "→ Maintain defensive posture; trim energy and commodity risk premiums while watching for a recovery window in risk assets.",
  prevRiskScore: 74,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFD_8OiNMLXAfY2PwHKBEJWE2QFXTWoCh_J_T6drPWGKe0qWFI_tnwz8SV0iPmOnpouZ1EZP-Pt_WBOJWfqOc5djgttoOhMK5IjfuBhIQHY421HEIUAPbj3ZYIBsTwhcAGatFkhSVuJOK_A-I4K4K25SoTOlnKeXGgZ-vj9lxNL"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGI5jCT8gW6RUwDxsToT1eRpmIUh87iInCkiw-4adNGvGuZQ07akthnhQFuNgeYYNVaOkT8hQIPFaA4W3beTlq3Hcvj5TOxUw0z0NLkJL5FINlireJ69MM0k8Vh6o0TIADDSJIhc3jV2jxWCuPE3JE3QyS6y9E="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF345F96hb7GMgtUeDRqFszIUMqfzcrSSBZGq2k4b0c9O6fbAB1pTFT2w3I2VzpY8xQQOqGqRVf-2BCvG1Z5XN5lRs6h-f7Gj_Bw4Ei3mvFyy7SJEHXj-BorVYNZ_TdxdFJe0T4QIDyzP34fpddTU8GUL6bmgteFPXutsY2NDetJbVm"
    },
    {
      title: "janes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH119tSRCRq6TeL0ie250NdGyPTUQ0VrIv1w_Vcc03jLAeLzgoyGFBlzEtpjwkTGhSvrFOkNZZfhnoo8Khijz-DOG9vBGfaRXhsNL3c5auWNv55LPGIGdADJQwBoF6tOeGUlsfw2r6_yyHvWamQbf9Uwg7WRMSDTKyh_ExG6dcHxhrYYdWDdgHABzcujGrhxwguNXOS3ZoQdT56HOAEeFZbWTesaHJQiBUrZ1AvaP1ZZYk--rquxsODbbpES714GQ=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFXU3FEy5F8haxcGUgfUfZ3ct6a_z0guiADXCNkZfldUFw-bz5HuMAL6pgBaieSyfGzSilOrbXj8GJLGY5oe68uP9ccyL9_S9aKD5Q4_N1PmahdM1TMYI0rwFqcyvi8PqOP"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzF66I--xKpfk9AWYNVRDfOzMa-5LygZyxMRW5cVxMEOGccfJ-yNXe8qvnyacI-sjPFGGvFsRvsOMD_5FQxmd3QXV7XTno7dXw7BhH5mQrse5wanKNqA2APqxqcfYspgPCgM0-lMEtwM5J1qoyQ8rxcVV-29C7jW11WvjvXcsftC6L8hPRozkULykL"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSDWFdf8HQKrvnoBxIzQQq0TKQ8xeR0gjAjAB6NnlObzU05M2LnM7ex679zA4NFdvyy9GzED1WXteWi2OHEO5CuwDb5ZgJ7jQlwYzqJrSROMpO-ElhcUxBmeCFK_yc0SRUX3VfnUBSOWXcmJBlHhqnSvNFNd2n6oj-i5KZGrmbRUr9HVt67-FziDNm9BBgh6Vfz_OSVjjm0x4aSmUsMAP4iQ=="
    },
    {
      title: "stlouisfed.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIzdKQELquEj7Y9ok3L66LekNI-3HPl5X3hJ627IyXjXi4S-UtetDbpJc0synRcoqrlIO6AhPQy9Q0dfNHpHzaxN2XKXVd3wGBPuJQUCBdUIHL4Aj0r6j7sy87Y536GRXeABE="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr4RevB03-ktBM--cN0kdJ2sXj_PhIowSbrm0YZwRkaHygw7GUedKpYe3DzNJhFYcMxzrRneaMCW3DPIuyUdNUPAHKlNqaP_fUsRfDBKLpiW6ujrXL0YJhmN8P-7JKTXKBzZwrdgI="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8ywrEOc3OEqAIvl5S7I_icQS5epMQ_F4jGcxzLwbUYhpGcBv8OenIgqr-V55WAMUilivdJOhdC1aOHrHIs6K38tI2PMbHGG2ERIBLSO1z6dNEP6cKk-ewvKoj8trjsx1d"
    },
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEx89qOB1APRSSxhYs9PGP5aEDDuCJOgRJrR_wuZOHeFxymzbjPg39OlkoleyOm--FX4yt6yiWY0o50TYmdbbdRsiO7W6yZiIgc7yGW0sSwQOL_TxgO3epAH1asNZTVKJuUL67MQp9b-GzGVxE5JfzMd6UivbJW_mgKRJsJXD-5W2V-T93cPVKVEr_saaFISL9ta0EYWt6Ai7aSHSIw2pJCyV-Tm8cdOO14wVVb8uQlq84U0GdSUfQq9w=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQESz4MpFBiq45WQrepuey6UNBh2VSn3wpj0B2XQV8VPKqgnGwT--IU93UhQ7SfAruDTBwaqGrCV-4CN2S3tQb7cQkZPDEiHiDFlbPPW7aelGJjc89wj3Ob_lF4Dq8ebTGKyk="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price August 29 2024 current range trend",
    "WTI Brent oil price today Reuters Bloomberg August 2024",
    "US Iran military tension news August 29 2026 D182 status",
    "Strait of Hormuz shipping status August 2026 news"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月29日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.172 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↓4）：美军完成清雷及大规模打击延后，促使局势从战争边缘向复杂谈判博弈转变。",
    bannerWarning: "→ 维持防御性配置，可适度减持能源及大宗商品风险溢价部位，关注风险资产修复。",
    deescalationIntent: "美国对伊朗全面经济孤立的决心与中国捍卫贸易利益的矛盾",
    structuralRisk: "主航道水雷基本清除，美方声称控制航道，但伊朗仍拒绝非协调性过境。",
    contradictionNote: "美国对伊朗全面经济孤立的决心与中国捍卫贸易利益的矛盾；美军追求绝对海权控制与伊朗利用地缘近接性维持非对称威胁的博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第182天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 29 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.172 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↓4): Successful mine clearing and strike postponement shift the conflict toward a complex negotiation phase.",
    bannerWarning: "→ Maintain defensive posture; trim energy and commodity risk premiums while watching for a recovery window in risk asse…",
    deescalationIntent: "US determination for total isolation vs. China's defense of trade interests.",
    structuralRisk: "Mines cleared from international lanes, but Iran still disputes unilateral US control.",
    contradictionNote: "US determination for total isolation vs. China's defense of trade interests.; US pursuit of maritime control vs. Iran's asymmetric threat capability.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 182",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
