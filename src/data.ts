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
  date: "2026-09-08",
  version: "v2.182",
  riskScore: 82,
  scoreTrend: [
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D192",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑12",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $92.13–$94.73 · Brent $97.24–$99.46",
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
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "美伊直接发生导弹互射，美军打击伊朗油轮，胡塞武装攻击沙特能源设施。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通行量骤降至正常水平 30% 以下，伊朗威胁建立海上“限制贸易区”。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Brent 逼近 100 美元，供应担忧导致现货市场溢价急剧扩大。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美国海军直接实施封锁并执行大规模拦截与反击任务。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "外交接触中断，双方立场已转向长期封锁与“经济战”对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "胡塞武装袭击沙特油田设施",
      description: "胡塞武装向沙特阿美位于南部的设施发射多枚导弹，导致作业因火灾暂时中断。",
      verification: "confirmed",
      timestamp: "2026-09-08",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "布伦特原油突破 99 美元大关",
      description: "受美伊海峡激战影响，油价创六周新高，Brent 逼近 $100 关键阻力位。",
      verification: "confirmed",
      timestamp: "2026-09-08",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "美军确认对伊朗油轮实施报复性打击",
      description: "CENTCOM 宣布作为对 IRGC 袭击美舰的回应，打击了三艘参与违反航行秩序的伊朗油轮。",
      verification: "confirmed",
      timestamp: "2026-09-07",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军实施“历史上最成功”的全面海军封锁",
      "伊朗转入“经济战”与海峡限制区博弈",
      "代理冲突与直接对抗双线重合"
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
        "变化：美伊在波斯湾发生直接导弹攻防战。",
        "变化：胡塞武装扩大了针对沙特境内战略能源目标的打击范围。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡通行量跌至每日 10 艘以下，创本年度新低。",
        "变化：伊朗宣布将划定新的海上限制区，实质性威胁商船航向。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：国际油价因供应物理中断预期飙升，市场情绪极度恐慌。",
        "变化：海运保险及运输溢价出现指数级增长。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国重申对霍尔木兹海峡的无限期海军控制权。",
        "变化：伊朗最高安全层级誓言对美实施长期“经济战”。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压 blockade 与伊朗政权生存意志的决死冲突",
      "地区国家（沙特、阿联酋）在被动卷入冲突与寻求替代路线间的战略摇摆"
    ],
    military: [
      "先进弹道导弹打击与宙斯盾防御系统的饱和对抗",
      "海峡不对称作战（水雷、小艇）对常规航母编队的持续消耗"
    ]
  },
  keyChange: "美伊直接交火致使风险全面破位，能源危机与海上封锁正式取代代理冲突成为主线。",
  investmentSignal: "→ 增持大宗商品及能源板块，减持风险资产，维持防御性对冲配置。",
  change: "up",
  prevRiskScore: 70,
  webSources: [
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqZSozGNyxiJGLAvqOhDWSOhYiTufMO2EBRzlL5dxvVIBUoZyKb480tlJPczdoS3xSVOCnnuadQ4nbXeVSGNq5lsQL2oEv7jG-6SU9AXCPhFRbJQZ2GVUoCyilC16HiqyVe2V-32xuu9C0FtGbhk3NePpPUdAJ7rlM749w8TRrkf7VsHEVyuCb-_OkWKL6oPXQBkd89SsRa3Ux__ny9K5zxY1Z"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE92HpQ_0fik_WMpcdtiApnc6MqOdKk7nsgKe_Dd8Hdw7YF3iemAdQoJ2IeEdz_PF44kSsgj6S9GeRqVkCxkrQrJcGHVvjoIrxB4XGPPdDUA_fVT_Q7kd9IsenHBgkS"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_vSAKIdieJQ5P4qqcJZrUSFlmoRuVG5UmLqRLH3_43XOCKfKfBULRptKIhpays6FRwqokKA8GrR-hPwySRVvy3jh0Qv-nUo1lUFbF5fqfM5kCZ0bhmlN-CwIG4gd_"
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGiHwd3Jm8rpFoT23-S5e_lZ8X2E22Hi6H48ZovpoAfqTibht8MfMQZROzmAABU_-U1JUb2ACIaKq-IShBHz5bEbqn-Xcdow_iWtapyr8Wa3-WeWp7gXUzsgIGzO3s8MTiwHkbdZezKyRDO1Mg4khvh4BrryZpwZ3eYVCbIP67jX501MbOCtrF_eqwJWz-ND_azwNPbfxZW"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRIxMj6gULL31wUI5KZiRpDAi8BDkcKXudT5NcPrn6fYO7QBL44z05htsYS0VU1CBsqi7S0jWZy7iL0BcPo34OeyNCkvuWh-0UXFYGo4DQQP_sKiMyXQ9WK0AiF67gpERO5ePsnn9ua_O8rQWO_Swvf_yyB5WlsLWm8yI7vYSsKaoqHuLJGxHdMd2xsmAsYMgIUB8yDMXoSi5UWWIce_RevhJTGrivAV2vkFT6fLsgxw=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTp95K2Fp54OQ6AzUykiolZTHamB7R9e63SpcaTmjMh3mAhhXhw8XVHYvA0rozfDOoqOHtDqUZenpMQUlVXxaoaBHf-kMt9yR2OyuV6xNYdy13EINmgl8hziTUhBBlP04Ml9e75IaeHWZ5xMqisteBIhAJZk3USznwldFS0AzEpBIDGle-Q2cBna_jCikDWgl2MXbfGy8pUwIUsuXPXH09IDcBXTCEV85b_m8Q4xU="
    },
    {
      title: "japantimes.co.jp",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGmRPdiJGkE7DUNwjrugn0S_zMxTG2kyraf8R_sFugBe4NtYf8o5E5oXcNO3o9H7NrrMA79dus5HicrNra77wa0ZYpb1yFbT7JH-om-FaHOCL0-PsEKVYorClhvY5hjNNATGq8OfxmDVOx4K9koTW36244gkneM42dbsziaxWFkqwAS0bKvl6OeqwblBVIvAS2V5sw_6EbV_w=="
    },
    {
      title: "energynow.ca",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvOLxZi2HWFdbFaFO-FZWnKmEcctKoLstkmIV3DgdnjY9WgLc1rvJ45JqdL04nzaAnbiaVXS_xhg6FmfRNBxNLa8Fl1AbRtsXxzytg7PHjVCnzsSOHz-xJdQrbJdw3ujIoBpoXm7kB4HcWYMWHbTRJQX09bra0nps0_8RN8ttnnplbH20DhEldYaQfXfwA3kATa7BMRL0="
    },
    {
      title: "justsecurity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGOLdZ8gE6D3IvKovHpiiCjON2Col-NcBPx5I1d-yU0uNZtTzs1OlHHpLCIhYurGqIzjHqEsBc81kN1ta6oJVkACdniSjyhNdj8VOzNakJppPDNLp2_yf4_Gamb_-W_fHpd_JJ22HGru4MDWxwk3mPLSPyAiwi2Lv4H"
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGoGswdWxe_zR3uY81LjuoTEuIIGvqXXGOpw-XJU20hURohu8eHFzG9E_gAx_HC_8pgpIFfMESpRC0HQqBVXBehmf2nv0fUvNiVGePWdXzlBmbYfJ4lbFMCtiO3083m31Slnsi7Zfv86M3yW5m1EBZLKcM-nQDArUq4CmNjBEhKEUqJYYxE"
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbllLWrzBhIT9BoQQFyGJr9O8pzFb9hFPSkOqotvgYHorolJoHl5TJL6Y6yWGyiRjsY4VgBh2leEDQZ7caZS5ZVSitu505VNPgZkbKFdkuCCWPorrwMA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDwaZK1GS3PXcd3EmSCaoofAcfUgiPkxPJl4CPFIjNam-0QEKRlG5VmYkWBsZAASYwnUshxvuLH7hrtk0pX4NmYVKUi_XsM50BLW1W6Kc9N7K-MD35samk3yZtxcNFkZqQt-KFSy8="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range Sept 8 2024 2025 news",
    "US Iran conflict status news last 24 hours Sept 2024",
    "Hormuz Strait shipping traffic update Sept 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-08",
  version: "v2.182",
  riskScore: 82,
  scoreTrend: [
    {
      date: "09-04",
      score: 70
    },
    {
      date: "09-05",
      score: 70
    },
    {
      date: "09-06",
      score: 70
    },
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D192",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑12",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $92.13–$94.73 · Brent $97.24–$99.46",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "Direct missile exchanges between US and Iran; Houthi strikes on Saudi energy.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Traffic volume plunged below 30%; Iran threatening a restricted maritime zone.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Brent approaching $100; supply fears leading to sharp widening of spot premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "US Navy implementing a full blockade and conducting massive interception missions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Diplomatic contacts suspended as stances shift to long-term 'economic warfare'.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Houthis Attack Saudi Oil Facilities",
      description: "Houthi militants launched missiles at Saudi Aramco sites, causing temporary operational shutdowns.",
      verification: "confirmed",
      timestamp: "2026-09-08",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Brent Crude Breaks $99 Threshold",
      description: "Oil prices hit 6-week highs amid strait hostilities, with Brent nearing $100 psychological resistance.",
      verification: "confirmed",
      timestamp: "2026-09-08",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "US Confirms Retaliatory Strikes on Tankers",
      description: "CENTCOM announced strikes on three Iranian tankers following IRGC attacks on US warships.",
      verification: "confirmed",
      timestamp: "2026-09-07",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US Navy enforcing most successful naval blockade in history",
      "Iran shifting to economic warfare and restricted zone tactics",
      "Convergence of proxy conflict and direct state-to-state naval warfare"
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
        "Change: Direct US-Iran missile exchange in the Persian Gulf.",
        "Change: Houthis expanded targets deep into Saudi strategic energy hubs."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Strait transit hit a record low of under 10 vessels per day.",
        "Change: Iran announced plans for restricted zones, threatening commercial shipping."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices surging on physical supply disruption expectations.",
        "Change: Massive exponential spikes in war-risk insurance premiums for tankers."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US reasserts indefinite naval control over the Strait of Hormuz.",
        "Change: Iran's top security council vows long-term economic warfare against the US."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between US maximum pressure blockade and Iranian regime survival",
      "Regional states' dilemma between passive entrapment and seeking alternatives"
    ],
    military: [
      "Saturation of Aegis defense by advanced Iranian ballistic missiles",
      "Asymmetric attrition vs conventional carrier groups in the strait"
    ]
  },
  keyChange: "Direct US-Iran engagement triggered a full risk breakout; energy crisis and blockade are now the primary drivers.",
  investmentSignal: "→ Overweight Commodities and Energy; Underweight Risk Assets; Maintain Defensive Hedge.",
  change: "up",
  prevRiskScore: 70,
  webSources: [
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqZSozGNyxiJGLAvqOhDWSOhYiTufMO2EBRzlL5dxvVIBUoZyKb480tlJPczdoS3xSVOCnnuadQ4nbXeVSGNq5lsQL2oEv7jG-6SU9AXCPhFRbJQZ2GVUoCyilC16HiqyVe2V-32xuu9C0FtGbhk3NePpPUdAJ7rlM749w8TRrkf7VsHEVyuCb-_OkWKL6oPXQBkd89SsRa3Ux__ny9K5zxY1Z"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE92HpQ_0fik_WMpcdtiApnc6MqOdKk7nsgKe_Dd8Hdw7YF3iemAdQoJ2IeEdz_PF44kSsgj6S9GeRqVkCxkrQrJcGHVvjoIrxB4XGPPdDUA_fVT_Q7kd9IsenHBgkS"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_vSAKIdieJQ5P4qqcJZrUSFlmoRuVG5UmLqRLH3_43XOCKfKfBULRptKIhpays6FRwqokKA8GrR-hPwySRVvy3jh0Qv-nUo1lUFbF5fqfM5kCZ0bhmlN-CwIG4gd_"
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGiHwd3Jm8rpFoT23-S5e_lZ8X2E22Hi6H48ZovpoAfqTibht8MfMQZROzmAABU_-U1JUb2ACIaKq-IShBHz5bEbqn-Xcdow_iWtapyr8Wa3-WeWp7gXUzsgIGzO3s8MTiwHkbdZezKyRDO1Mg4khvh4BrryZpwZ3eYVCbIP67jX501MbOCtrF_eqwJWz-ND_azwNPbfxZW"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRIxMj6gULL31wUI5KZiRpDAi8BDkcKXudT5NcPrn6fYO7QBL44z05htsYS0VU1CBsqi7S0jWZy7iL0BcPo34OeyNCkvuWh-0UXFYGo4DQQP_sKiMyXQ9WK0AiF67gpERO5ePsnn9ua_O8rQWO_Swvf_yyB5WlsLWm8yI7vYSsKaoqHuLJGxHdMd2xsmAsYMgIUB8yDMXoSi5UWWIce_RevhJTGrivAV2vkFT6fLsgxw=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTp95K2Fp54OQ6AzUykiolZTHamB7R9e63SpcaTmjMh3mAhhXhw8XVHYvA0rozfDOoqOHtDqUZenpMQUlVXxaoaBHf-kMt9yR2OyuV6xNYdy13EINmgl8hziTUhBBlP04Ml9e75IaeHWZ5xMqisteBIhAJZk3USznwldFS0AzEpBIDGle-Q2cBna_jCikDWgl2MXbfGy8pUwIUsuXPXH09IDcBXTCEV85b_m8Q4xU="
    },
    {
      title: "japantimes.co.jp",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGmRPdiJGkE7DUNwjrugn0S_zMxTG2kyraf8R_sFugBe4NtYf8o5E5oXcNO3o9H7NrrMA79dus5HicrNra77wa0ZYpb1yFbT7JH-om-FaHOCL0-PsEKVYorClhvY5hjNNATGq8OfxmDVOx4K9koTW36244gkneM42dbsziaxWFkqwAS0bKvl6OeqwblBVIvAS2V5sw_6EbV_w=="
    },
    {
      title: "energynow.ca",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvOLxZi2HWFdbFaFO-FZWnKmEcctKoLstkmIV3DgdnjY9WgLc1rvJ45JqdL04nzaAnbiaVXS_xhg6FmfRNBxNLa8Fl1AbRtsXxzytg7PHjVCnzsSOHz-xJdQrbJdw3ujIoBpoXm7kB4HcWYMWHbTRJQX09bra0nps0_8RN8ttnnplbH20DhEldYaQfXfwA3kATa7BMRL0="
    },
    {
      title: "justsecurity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGOLdZ8gE6D3IvKovHpiiCjON2Col-NcBPx5I1d-yU0uNZtTzs1OlHHpLCIhYurGqIzjHqEsBc81kN1ta6oJVkACdniSjyhNdj8VOzNakJppPDNLp2_yf4_Gamb_-W_fHpd_JJ22HGru4MDWxwk3mPLSPyAiwi2Lv4H"
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGoGswdWxe_zR3uY81LjuoTEuIIGvqXXGOpw-XJU20hURohu8eHFzG9E_gAx_HC_8pgpIFfMESpRC0HQqBVXBehmf2nv0fUvNiVGePWdXzlBmbYfJ4lbFMCtiO3083m31Slnsi7Zfv86M3yW5m1EBZLKcM-nQDArUq4CmNjBEhKEUqJYYxE"
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbllLWrzBhIT9BoQQFyGJr9O8pzFb9hFPSkOqotvgYHorolJoHl5TJL6Y6yWGyiRjsY4VgBh2leEDQZ7caZS5ZVSitu505VNPgZkbKFdkuCCWPorrwMA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDwaZK1GS3PXcd3EmSCaoofAcfUgiPkxPJl4CPFIjNam-0QEKRlG5VmYkWBsZAASYwnUshxvuLH7hrtk0pX4NmYVKUi_XsM50BLW1W6Kc9N7K-MD35samk3yZtxcNFkZqQt-KFSy8="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range Sept 8 2024 2025 news",
    "US Iran conflict status news last 24 hours Sept 2024",
    "Hormuz Strait shipping traffic update Sept 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月8日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.182 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（↑12）：美伊直接交火致使风险全面破位，能源危机与海上封锁正式取代代理冲突成为主线。",
    bannerWarning: "→ 增持大宗商品及能源板块，减持风险资产，维持防御性对冲配置。",
    deescalationIntent: "美国极限施压 blockade 与伊朗政权生存意志的决死冲突",
    structuralRisk: "通行量骤降至正常水平 30% 以下，伊朗威胁建立海上“限制贸易区”。",
    contradictionNote: "美国极限施压 blockade 与伊朗政权生存意志的决死冲突；先进弹道导弹打击与宙斯盾防御系统的饱和对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第192天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 8 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.182 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (↑12): Direct US-Iran engagement triggered a full risk breakout; energy crisis and blockade are now the primary drivers.",
    bannerWarning: "→ Overweight Commodities and Energy; Underweight Risk Assets; Maintain Defensive Hedge.",
    deescalationIntent: "Clash between US maximum pressure blockade and Iranian regime survival",
    structuralRisk: "Traffic volume plunged below 30%; Iran threatening a restricted maritime zone.",
    contradictionNote: "Clash between US maximum pressure blockade and Iranian regime survival; Saturation of Aegis defense by advanced Iranian ballistic missiles",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 192",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
