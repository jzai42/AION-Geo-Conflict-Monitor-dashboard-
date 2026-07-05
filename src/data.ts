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
  date: "2026-07-05",
  version: "v2.116",
  riskScore: 56,
  riskChange: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D127",
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
      value: "WTI $68.08–$69.26 · Brent $71.94–$72.10",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "直接交火暂停，但革命卫队完成指挥链重组并持续军事威慑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道实质受限，伊朗实施差别化收费导致商业航运受阻。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "油价处于 $75 以下区间，市场地缘溢价大幅回落。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军维持军事存在，中方介入航道收费调停。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "双边对话机制化，停火协议进入执行初期。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊同意「停止攻击」以促成多哈谈判",
      description: "Axios 援引美国官员消息称，双方同意在多哈技术谈判期间暂停所有海上军事敌对行动。",
      verification: "confirmed",
      timestamp: "2026-07-05",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗与阿曼实施新导航协议",
      description: "伊朗与阿曼开始在霍尔木兹海峡南侧建立联合管理区，旨在替代原有的美国主导机制。",
      verification: "confirmed",
      timestamp: "2026-07-04",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI 价格跌破 70 美元大关",
      description: "由于市场预期伊朗石油出口将通过阿曼走廊恢复，原油价格录得四个月来最低水平。",
      verification: "confirmed",
      timestamp: "2026-07-05",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议进入实施观察期，直接交火频率降至开战以来最低",
      "霍尔木兹海峡进入行政收费与主权谈判阶段",
      "地区风险正从突发战争转向长期经济排他性竞争"
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
        "延续：美伊双方履行「停止攻击」默契，前线维持静默。",
        "变化：伊朗革命卫队海军完成重组，司令部迁至班达尔阿巴斯以北隐蔽点。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商船需向伊朗申报航向方可进入中线航道。",
        "变化：阿曼走廊通行量小幅增加，但保险溢价仍处于战时水平。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：地缘政治贴水持续消退。",
        "变化：沙特原油通过陆路管道至红海出口量创历史新高，缓解了对霍尔木兹的依赖。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗外交部重申「不实施永久封锁」但需「收费补偿」。",
        "变化：美国白宫暗示若多哈谈判顺利，将放宽对伊朗石油出口的部分行政制裁。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求的主权航道管理权与美国坚持的自由航行权之间的冲突。",
      "中东盟友对美伊私下达成谅解后的安全焦虑。"
    ],
    military: [
      "非正规武装（代理人）是否完全受控于德黑兰的停火指令。",
      "高技术水雷与反舰导弹威慑的长期化存在。"
    ]
  },
  scoreTrend: [
    {
      date: "07-01",
      score: 60
    },
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
      score: 56,
      active: true
    }
  ],
  keyChange: "油价跌破关键支撑位，标志着能源市场对全面战争的预期已基本消散，风险转向长期主权收费博弈。",
  investmentSignal: "→ 维持能源与风险资产对冲性仓位。",
  prevRiskScore: 56,
  webSources: [
    {
      title: "houseofsaud.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGoUQiyKBrlf8Hu4AQ_WgYLEE8NfV643hez1BnXdFkvwqEZRD31_pCGpeouabsZrdCtnOFldwJB9ehxVkU2PiWNx8wk1_5HmQ3rQL6Rt-tIJR7wG9964ZBhw2wyCNZtusaAT4ln1apMyN800UdhwQS-Db6Qh8dWdL-ijE9rFXFUIFOOI8Eji7gQE1TErOg="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxgSTOIASIXrJACgUnbyv-pCbTjBwjukN5BSLsaWYq7TpnKv6xd--J4TCG9rgJ1nEYEH3MN_-C5wNDsJovul9LePsYWXQZeimlMynCXErf4OCtbF_4-ogw6AQVkqVt4MCDXCQibw8Vv040xrelg5X1tY4pJEA="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEm-BeZVHnjnH_kbeoMOKqsLAkBJh8IsyHr0tBrzhH2CFm0n8IkyRKfjkIKmRO-toaO3SIcxSpW04H1yXfv2oKefJsGNM7rtslVOtvdCvrbOkZ_0dAdZK1JurDY7qwNiWc2-sMqT98kDFIMlOMYH0rGpg=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEURjJqG-SwvdDBEsTCxMuho04VEAQKv1d-wJET4jp8T_-e8FXYXxNWsd86_VqeE_FLr8Vt-d85L4DS168XogogDiLlpn-CrhR5mvJ7rkEAufHU2iXFTA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEDXCrA34Hdv4_Z_GDaef6j72VuAbeKKeLIKVJuQ07ew2E1CWHUJNvGim9D7Qp7MHMuyU30hHgLg8zV5hmw5hD4M9NtbCNNwgchg-jZ4iTYzrGf00SgJbfCs9_JsATaVGPqa5c5WmDwRwvIUwc="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJoOCq65sY54Lyw8ubmz_1SR_jQO9RAHWoNACtJyRr8KkpfBju0B-EkwRBWX5gpdO4wHxdD31uC2XW6-JuvHgGYDarWkNfeBp0dsLvA0Lw53ATZeKBgPrS6fJS8lqmyXKnVkDV9x4_7PayRnX9TkVOjUIthXsZg5-WavK4nCM1SEJxm1h2Y02ra1Cp6nPd6yhd3VePhZR9VJJGNwgv9NNs9okFtT5lIWrkJiPy"
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVNTM53SzzZ2tXS_DAp76fp6db1BxJp-DGRoijd4229WpRfGzzuluHaMwFdY41qT4AcbmeTDtoCKBJmSdahsb4qjNI2-glTdjZWloyEmiadtNy9FKRcMFjpfBnHRVfLkDwn-Aksv9sIiiFCukU1-YoxoniKcrhXKYO92M2oQBrEZY4mflQuN-eQ_90bVgO3f8AFQQExgoZmplVHA=="
    },
    {
      title: "wyomingpublicmedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMfFceH4PWtHub14HF_mp0Oobqaw7NH7dudlkdTg81FMU_yyPdWSnKfBbtsrWpTaCBk_SZHt1J1IdI3jxrGvxNwYWPGUmoydgedUU2M2dIoulKhGM-_ee-A9Vw5edtCTHG3HdEm24ARDkLzEr5Z45J_FtUkWzxzngDPwx63hFnfKChiIW9i5PxyLYemZKbTqBgRNS0e5MoaWW_gTVWrlxN8ozL13eY"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFovdODY0nN4MDmT_J4y_rihvJQ4UGbjKV1iZKBhFZYbDuqLfvZrDe3btUnwM8zXUeqEWj1Lek7VqdJcrwsQOfjJ8s2_v2R-zD5LAbgVr5Iwtw="
    },
    {
      title: "gurufocus.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt6KlwfhaNEggdKgP8pjqa_F92plIVPangYTN7mSBFWzfhhTqjj7OW1qB-5Fdo075d2-eT32byizi8IvAFTlkSjNzN6YjBPO7kgXT6b94eu9RuwrWQZNb3CziKoLtLoNs3fdj55IAxj3m46UFO5iB0itOKUQCatcsn7-jXSduVurgdwu8QogimGNnymKdEB_FpJ9_NCP4WqIC7fmrYiEY="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKY4EP0rGHOMAIWjD2LKk2ZkHhBKDUvcrZO5ASPqPXsy8z__Yuo-9PGStiTiNSTWKbqbvBdG0hiITZpeWwD595PDtQQleW77M1DmIiy5qoQMljm4ubgcTUTRb9Vr-TqXfu13S7Z9PSCjgfYxz_fYljuKbmg9xe8ZagYRO88Gt_EeRiS2KlAyMrHhEUzCgIXAE="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCKYdnyWZz8uBgrz2q_36LvIQjb-LWKkNtIemIX-4tQT5DvTAn_T0xsZ4tYwaYIx1uO4fNiUWmcKhPTV8KwhHILfzf2Y-TIKeMEk_veh628qCf-2dUnSze0rmw7JBy6Ha2wQRYnJ4ubDvWA1U5sisw"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4p_GoCbxAQFbgfv9aMSr41yPuHOmTsGw77totg6jSmQm4N8SnZxiJTJTj_MtK5hS66Gs2l5xLxRBrNbEhsocY0pEwYLKuhGjLCSHjmiSUKxSqeecLVN5gyvTySQmL"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend 2026-07-05",
    "US Iran conflict news July 5 2026 Muscat talks IRGC Navy",
    "Hormuz Strait shipping status July 5 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-05",
  version: "v2.116",
  riskScore: 56,
  riskChange: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D127",
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
      value: "WTI $68.08–$69.26 · Brent $71.94–$72.10",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Direct kinetic actions halted; leadership transition within IRGC Navy complete.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strategic corridor remains under Iranian administrative control with mandatory fees.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 1,
      weight: 0.2,
      description: "Oil prices have retreated below $75 as supply concerns de-escalate.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains carrier presence; China mediates transit fee structure.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Diplomatic channels in Doha and Muscat are operational and active.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Agree to Halt Attacks for Doha Talks",
      description: "Axios citing US officials reports a suspension of maritime hostilities to facilitate technical negotiations.",
      verification: "confirmed",
      timestamp: "2026-07-05",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran-Oman Navigation Mechanism Implementation",
      description: "Tehran and Muscat begin joint management of the southern route, sidelining Western naval frameworks.",
      verification: "confirmed",
      timestamp: "2026-07-04",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "WTI Crude Drops Below $70",
      description: "Market risk premium deflates as expectations for a managed corridor through Oman rise.",
      verification: "confirmed",
      timestamp: "2026-07-05",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire implementation phase with minimal kinetic activity.",
      "Transition from maritime blockade to administrative sovereignty over the Strait.",
      "Strategic focus shifts from immediate war to long-term economic exclusivity."
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
        "Continue: Ceasefire holds; no direct strikes reported in the last 24 hours.",
        "Change: IRGC Navy reshuffles command structure following leadership casualties."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian navy requires vessel declarations for transit.",
        "Change: Increased usage of the Omani coastal route for non-aligned tankers."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Bearish trend persists due to easing of blockade fears.",
        "Change: Record Saudi bypass volumes through East-West pipeline to the Red Sea."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iran signals willingness to reopen transit in exchange for fee recognition.",
        "Change: White House indicates potential sanctions waiver for specific Iranian oil volumes."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iranian claim to strait tolls vs. US 'Freedom of Navigation' doctrine.",
      "Regional allies' fear of a permanent US-Iran strategic compromise."
    ],
    military: [
      "Rogue proxy elements potentially disrupting the official ceasefire.",
      "Persistence of high-tech denial assets (mines/UAVs) in the chokepoint."
    ]
  },
  scoreTrend: [
    {
      date: "07-01",
      score: 60
    },
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
      score: 56,
      active: true
    }
  ],
  keyChange: "Oil breaking support levels signals a major de-risking phase as markets pivot to long-term political management of the crisis.",
  investmentSignal: "→ Maintain energy and risk asset hedging positions.",
  prevRiskScore: 56,
  webSources: [
    {
      title: "houseofsaud.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGoUQiyKBrlf8Hu4AQ_WgYLEE8NfV643hez1BnXdFkvwqEZRD31_pCGpeouabsZrdCtnOFldwJB9ehxVkU2PiWNx8wk1_5HmQ3rQL6Rt-tIJR7wG9964ZBhw2wyCNZtusaAT4ln1apMyN800UdhwQS-Db6Qh8dWdL-ijE9rFXFUIFOOI8Eji7gQE1TErOg="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxgSTOIASIXrJACgUnbyv-pCbTjBwjukN5BSLsaWYq7TpnKv6xd--J4TCG9rgJ1nEYEH3MN_-C5wNDsJovul9LePsYWXQZeimlMynCXErf4OCtbF_4-ogw6AQVkqVt4MCDXCQibw8Vv040xrelg5X1tY4pJEA="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEm-BeZVHnjnH_kbeoMOKqsLAkBJh8IsyHr0tBrzhH2CFm0n8IkyRKfjkIKmRO-toaO3SIcxSpW04H1yXfv2oKefJsGNM7rtslVOtvdCvrbOkZ_0dAdZK1JurDY7qwNiWc2-sMqT98kDFIMlOMYH0rGpg=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEURjJqG-SwvdDBEsTCxMuho04VEAQKv1d-wJET4jp8T_-e8FXYXxNWsd86_VqeE_FLr8Vt-d85L4DS168XogogDiLlpn-CrhR5mvJ7rkEAufHU2iXFTA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEDXCrA34Hdv4_Z_GDaef6j72VuAbeKKeLIKVJuQ07ew2E1CWHUJNvGim9D7Qp7MHMuyU30hHgLg8zV5hmw5hD4M9NtbCNNwgchg-jZ4iTYzrGf00SgJbfCs9_JsATaVGPqa5c5WmDwRwvIUwc="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJoOCq65sY54Lyw8ubmz_1SR_jQO9RAHWoNACtJyRr8KkpfBju0B-EkwRBWX5gpdO4wHxdD31uC2XW6-JuvHgGYDarWkNfeBp0dsLvA0Lw53ATZeKBgPrS6fJS8lqmyXKnVkDV9x4_7PayRnX9TkVOjUIthXsZg5-WavK4nCM1SEJxm1h2Y02ra1Cp6nPd6yhd3VePhZR9VJJGNwgv9NNs9okFtT5lIWrkJiPy"
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVNTM53SzzZ2tXS_DAp76fp6db1BxJp-DGRoijd4229WpRfGzzuluHaMwFdY41qT4AcbmeTDtoCKBJmSdahsb4qjNI2-glTdjZWloyEmiadtNy9FKRcMFjpfBnHRVfLkDwn-Aksv9sIiiFCukU1-YoxoniKcrhXKYO92M2oQBrEZY4mflQuN-eQ_90bVgO3f8AFQQExgoZmplVHA=="
    },
    {
      title: "wyomingpublicmedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMfFceH4PWtHub14HF_mp0Oobqaw7NH7dudlkdTg81FMU_yyPdWSnKfBbtsrWpTaCBk_SZHt1J1IdI3jxrGvxNwYWPGUmoydgedUU2M2dIoulKhGM-_ee-A9Vw5edtCTHG3HdEm24ARDkLzEr5Z45J_FtUkWzxzngDPwx63hFnfKChiIW9i5PxyLYemZKbTqBgRNS0e5MoaWW_gTVWrlxN8ozL13eY"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFovdODY0nN4MDmT_J4y_rihvJQ4UGbjKV1iZKBhFZYbDuqLfvZrDe3btUnwM8zXUeqEWj1Lek7VqdJcrwsQOfjJ8s2_v2R-zD5LAbgVr5Iwtw="
    },
    {
      title: "gurufocus.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt6KlwfhaNEggdKgP8pjqa_F92plIVPangYTN7mSBFWzfhhTqjj7OW1qB-5Fdo075d2-eT32byizi8IvAFTlkSjNzN6YjBPO7kgXT6b94eu9RuwrWQZNb3CziKoLtLoNs3fdj55IAxj3m46UFO5iB0itOKUQCatcsn7-jXSduVurgdwu8QogimGNnymKdEB_FpJ9_NCP4WqIC7fmrYiEY="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKY4EP0rGHOMAIWjD2LKk2ZkHhBKDUvcrZO5ASPqPXsy8z__Yuo-9PGStiTiNSTWKbqbvBdG0hiITZpeWwD595PDtQQleW77M1DmIiy5qoQMljm4ubgcTUTRb9Vr-TqXfu13S7Z9PSCjgfYxz_fYljuKbmg9xe8ZagYRO88Gt_EeRiS2KlAyMrHhEUzCgIXAE="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCKYdnyWZz8uBgrz2q_36LvIQjb-LWKkNtIemIX-4tQT5DvTAn_T0xsZ4tYwaYIx1uO4fNiUWmcKhPTV8KwhHILfzf2Y-TIKeMEk_veh628qCf-2dUnSze0rmw7JBy6Ha2wQRYnJ4ubDvWA1U5sisw"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4p_GoCbxAQFbgfv9aMSr41yPuHOmTsGw77totg6jSmQm4N8SnZxiJTJTj_MtK5hS66Gs2l5xLxRBrNbEhsocY0pEwYLKuhGjLCSHjmiSUKxSqeecLVN5gyvTySQmL"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend 2026-07-05",
    "US Iran conflict news July 5 2026 Muscat talks IRGC Navy",
    "Hormuz Strait shipping status July 5 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月5日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.116 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 56（持平）：油价跌破关键支撑位，标志着能源市场对全面战争的预期已基本消散，风险转向长期主权收费博弈。",
    bannerWarning: "→ 维持能源与风险资产对冲性仓位。",
    deescalationIntent: "伊朗要求的主权航道管理权与美国坚持的自由航行权之间的冲突。",
    structuralRisk: "航道实质受限，伊朗实施差别化收费导致商业航运受阻。",
    contradictionNote: "伊朗要求的主权航道管理权与美国坚持的自由航行权之间的冲突。；非正规武装（代理人）是否完全受控于德黑兰的停火指令。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第127天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 5 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.116 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 56 (Flat): Oil breaking support levels signals a major de-risking phase as markets pivot to long-term political management of the crisis.",
    bannerWarning: "→ Maintain energy and risk asset hedging positions.",
    deescalationIntent: "Iranian claim to strait tolls vs. US 'Freedom of Navigation' doctrine.",
    structuralRisk: "Strategic corridor remains under Iranian administrative control with mandatory fees.",
    contradictionNote: "Iranian claim to strait tolls vs. US 'Freedom of Navigation' doctrine.; Rogue proxy elements potentially disrupting the official ceasefire.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 127",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
