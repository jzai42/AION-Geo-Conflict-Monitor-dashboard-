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
  date: "2026-08-22",
  version: "v2.165",
  keyStats: [
    {
      label: "冲突天数",
      value: "D175",
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
      value: "WTI $86.20–$86.64 · Brent $93.78–$94.39",
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
      description: "美军在海峡内执行高强度封锁与登船行动，伊朗军队保持最高戒备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "通行量持续维持在战前水平的 20%-40%，主要航道受军事管制。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价因供应担忧处于高位，Brent 维持在 94 美元附近。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美国深度介入实地作战与金融封锁，外交斡旋转入次要地位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "谈判渠道实质性冻结，双方均在加码对抗筹码。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  scoreTrend: [
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78,
      active: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美国通过「领土化」叙事确立了长期封锁的政治合法性。",
      "伊朗采取「非对称反制」与「黑暗航运」维持最低出口。",
      "地缘重心从前线交火转向能源出口命脉的绞杀。"
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
        "延续：美国海军持续在霍尔木兹海峡维持大规模封锁舰队。",
        "变化：伊朗大幅减少公开武器展示以维持战术突击性。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商船通行高度依赖美军护航或采取隐蔽航行。",
        "变化：由于美方的「领土」言论，多方担忧海峡规则被永久重塑。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价在制裁预期与高风险溢价下保持月度高位。",
        "变化：市场正消化伊油出口跌破 30 万桶/日的极端供应紧缩预期。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗最高领袖与军方表达「不投降、必反击」态度。",
        "变化：特朗普明确否决了现有的斡旋方案，博弈周期拉长。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国国内对「速战速决」的政治需求与伊朗「以拖待变」策略的对抗。",
      "主权完整性（伊朗）与事实控制权（美国）在国际水道上的法律冲突。"
    ],
    military: [
      "美军常规封锁力量与伊朗无人机/水雷非对称力量的博弈。"
    ]
  },
  keyChange: "特朗普强化海峡事实主权论，地缘风险长期化。",
  investmentSignal: "→ 维持 能源 与 风险资产 避险对冲，关注周一制裁细则对能源供应链的冲击。",
  change: "none",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美军在海峡内执行高强度封锁与登船行动，伊朗军队保持最高戒备",
      description: "美军在海峡内执行高强度封锁与登船行动，伊朗军队保持最高戒备。",
      verification: "single",
      timestamp: "2026-08-22（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "通行量持续维持在战前水平的 20%-40%，主要航道受军事管制",
      description: "通行量持续维持在战前水平的 20%-40%，主要航道受军事管制。",
      verification: "single",
      timestamp: "2026-08-22（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7_gosiy8RhfjA_YZNNsDhAPng2wCIneBSR_CSejeSz9xZZqAIfGqOt7r6aynL4hRcqkye-WYUfcB0hk_gIUMDbHLE8hoH1DX8J558OdacWtiP7r9dZHkCJ9NRK0_tuYlnn2LNE3Iy"
    },
    {
      title: "omidradio.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF41CcPEiuTappKi1tEcaCs5HI7bj9G8p_GY4S0aa0Fs9s4lplxwf4NQDn0TLB53wZvcE_cT-OKs9BQwmIEPbLNp_nqq8oWKVYMBh_5_V-UkOwID9AkpR8HBuY3SNJp2Ol3O6iVQ4zlNCCDRQTqS6gfQsB39r8lTAPs-pak5l7VSqiwTspCB401yZjwc8ho2wIRWYcniWIE9G9nN2w="
    },
    {
      title: "whitehouse.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFFEbhvrB6fUWdvR8_huUPA22iX7bYivoWbNhn6wted_IxSzieXStPeqiZ1ae-9Sil6jEndJ--GC9sJ61QuMDqv09vD650glfJ0gi5cObFWpdKQuzG1My0FYQXAnKMxHD7uaxNL8yfti7DGsAlY8ma9kn4iTRw2FNE65oMPxZylfNLnGVb89Q_ytvqVUokmS8Cdp4E2e3gWG5qKTPfmOB_"
    },
    {
      title: "roic.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4Mii4g-rJvyS8JqVQ6d0zkYUt19RBppf5IitesMrh92KhJLkyDDN3FoE8DousyUeqU7n9XECBL9FE46t_1y3jGiaMQ0gUbx4FDReNz1Hivca68fTKs6fW7uHHcITSPC8SU81p_FuwJ-7xsHrwja5SUNrOeHtMGuuZroOBe5gG4HuJYf5SqPydYP0jvG0nLkTFnvRZghz1dppPTRw="
    },
    {
      title: "dawn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG45f3Ki-8fiqa4gojroBd8yz8DiFuavmUgz7s8Ze2-FkiLGoG9a3ydgPJoMUZY536xS8q0BcaFL-O3tcP2QrTduXBojyr74FnbDbqUrGk_gKeK7o6w8j2J4izZxJ1bXeZf9llhdhTqTBJVwcmkMweicvu9ORSV3h9eelViK5dvwthyZCMxcI-q1y2q"
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFYe9urL2ym5M-OfsmpGl2MYiQQtWpc8Fp5BDGXOcM7XHm_xgz5mVYR_kalV-ZycvZSO6rWroQJIboS3_ghHrnUGxEXSrdRdeOIxsKBYcg0KgmQFMY3DTFkVQJFvzBOKuE5LWLXNHgi8ibFKnqbtmPm4sVTkj_y9IwlSZOAh8VxVv9VGjHjzQ32-ZxuIQGIYQ=="
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnNAuWw7YmdJI4DNeMfbIbAb78UuipDD-u3gYpicAMx7VyTO6E3veJWYsbIk5DLKsTTPTQkPGPWjss4ZnY41_0PcSUV9prPYg_9jbBBsxuFRG9iFLjzF0Y22d_ZW_ysaKKeOYmdUka83ZFpBRB9Z0n_sK8uMY2DAy12Y_rBeLbnQEmlSnNNlyINeRFibuQw6M6XSMxgUVZGQ=="
    },
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEE1MV4cWX9hZ6DLGZm4bdXL3veK-kQzf0GR4MQz8MzuDUkxwOfRNy2WuPsuju-V-dlg-GIGYD2gmqM0JH8I1VP29NJpbOFra_RL--NsYeoJren1I0BTGX0vv-51QpteRheVRqfW6cH8W2z-fkTCW5oX32c9rS1vHgAnaM6dVNKwthNJ0j26-vikZilzWGhChUGo9jy6yNjmjG9c-eW8PybVlI4UGhf1A5H"
    },
    {
      title: "sundayguardianlive.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGazPgV5EdMmPXkkVggCUai0dLKUaVjdwQ3C1dSTw7irSLZHySKCuRbcl-jjUN0ScMuUQh2DLQVw4Zr0hZ76ktyDCwFwUaqSwhPW0o33nGxeg9oPrFtBqSRNeSCHj1TPOTrVhI1z6pyyGkSxkRlsle6Z2RsViuzU3b31zOt7EwO4CvcnFmSZ9RzQLEnhLd2lOt9j6O68wxfeKCKcetdoPF96ZHBCz6Dsa8RFqNM0zKCPq2UE3Qo_JiKCtZxYP6ISf70qdQWdDcVF83EcjS663mCz4M4aVcKFm6UqSqBk9q95fVXfTRl5jPkBUvBVG08ZbyTwlh_n2KgP_KtHSic2dvK"
    },
    {
      title: "hurriyetdailynews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdlB9ErIeOvL1XvnUB1-vF-V8Y8NMV-wY_cOZbJ1_BS3X5YTHcY00n4tJJl6VjMKHOCyopG-NHly8pxEyPqxaQk5CePnByI1rp7ZeV7UMF42YEKcMjA4vE3rAhzyXKpLVQqvocIap5A68YrAKd5t79TlpfOD4cYxPEl4tej1DZghbqzmICT4Hfb2E_b-zWFUU--UikkA=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price forecast range August 22 2026 news",
    "US Iran military conflict news August 22 2026 Strait of Hormuz shipping update",
    "Iran Foreign Ministry statement US sanctions August 21 22 2026",
    "White House statement Iran conflict August 22 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-22",
  version: "v2.165",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D175",
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
      value: "WTI $86.20–$86.64 · Brent $93.78–$94.39",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-intensity blockade and naval interference by the US Navy in the Strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial traffic down to 20-40% of pre-war levels under military regulation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices stay near monthly highs due to supply risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Direct US involvement in maritime blockade and global economic warfare.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels effectively frozen; rhetoric at maximum levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 78,
  scoreTrend: [
    {
      date: "08-18",
      score: 82
    },
    {
      date: "08-19",
      score: 82
    },
    {
      date: "08-20",
      score: 82
    },
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78,
      active: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US establishes political legitimacy for long-term blockade through 'territorial' narrative.",
      "Iran utilizes 'asymmetric countermeasures' and dark shipping to maintain minimal exports.",
      "Geopolitical focus shifts to the strangulation of energy export lifelines."
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
        "Continue: US Navy maintains a massive blockade fleet in the Strait of Hormuz.",
        "Change: Iran reduces public weapons unveilings to preserve tactical surprise."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic highly dependent on US escort or covert navigation.",
        "Change: Growing concerns that Hormuz rules are being permanently reshaped by US rhetoric."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil prices held high by sanction expectations and risk premiums.",
        "Change: Market pricing in extreme supply tightening as Iranian exports drop below 300k bpd."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian leadership maintains a 'no surrender' stance.",
        "Change: Trump explicitly rejects current mediation proposals, extending the confrontation cycle."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US domestic demand for quick resolution vs Iran's 'strategic patience' survival strategy.",
      "Conflict between sovereign integrity (Iran) and de facto control (US) over international waterways."
    ],
    military: [
      "Conventional blockade power of the US Navy vs Iran's asymmetric drone/mine capabilities."
    ]
  },
  keyChange: "Trump's 'territorial' claim over the Strait institutionalizes the risk for the long term.",
  investmentSignal: "→ Maintain defensive positioning in Energy and Risk Assets to hedge against Monday's sanctions rollout.",
  change: "none",
  prevRiskScore: 82,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "High-intensity blockade and naval interference by the US Navy in the Strait",
      description: "High-intensity blockade and naval interference by the US Navy in the Strait.",
      verification: "single",
      timestamp: "2026-08-22 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Commercial traffic down to 20-40% of pre-war levels under military regulation",
      description: "Commercial traffic down to 20-40% of pre-war levels under military regulation.",
      verification: "single",
      timestamp: "2026-08-22 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7_gosiy8RhfjA_YZNNsDhAPng2wCIneBSR_CSejeSz9xZZqAIfGqOt7r6aynL4hRcqkye-WYUfcB0hk_gIUMDbHLE8hoH1DX8J558OdacWtiP7r9dZHkCJ9NRK0_tuYlnn2LNE3Iy"
    },
    {
      title: "omidradio.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF41CcPEiuTappKi1tEcaCs5HI7bj9G8p_GY4S0aa0Fs9s4lplxwf4NQDn0TLB53wZvcE_cT-OKs9BQwmIEPbLNp_nqq8oWKVYMBh_5_V-UkOwID9AkpR8HBuY3SNJp2Ol3O6iVQ4zlNCCDRQTqS6gfQsB39r8lTAPs-pak5l7VSqiwTspCB401yZjwc8ho2wIRWYcniWIE9G9nN2w="
    },
    {
      title: "whitehouse.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFFEbhvrB6fUWdvR8_huUPA22iX7bYivoWbNhn6wted_IxSzieXStPeqiZ1ae-9Sil6jEndJ--GC9sJ61QuMDqv09vD650glfJ0gi5cObFWpdKQuzG1My0FYQXAnKMxHD7uaxNL8yfti7DGsAlY8ma9kn4iTRw2FNE65oMPxZylfNLnGVb89Q_ytvqVUokmS8Cdp4E2e3gWG5qKTPfmOB_"
    },
    {
      title: "roic.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4Mii4g-rJvyS8JqVQ6d0zkYUt19RBppf5IitesMrh92KhJLkyDDN3FoE8DousyUeqU7n9XECBL9FE46t_1y3jGiaMQ0gUbx4FDReNz1Hivca68fTKs6fW7uHHcITSPC8SU81p_FuwJ-7xsHrwja5SUNrOeHtMGuuZroOBe5gG4HuJYf5SqPydYP0jvG0nLkTFnvRZghz1dppPTRw="
    },
    {
      title: "dawn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG45f3Ki-8fiqa4gojroBd8yz8DiFuavmUgz7s8Ze2-FkiLGoG9a3ydgPJoMUZY536xS8q0BcaFL-O3tcP2QrTduXBojyr74FnbDbqUrGk_gKeK7o6w8j2J4izZxJ1bXeZf9llhdhTqTBJVwcmkMweicvu9ORSV3h9eelViK5dvwthyZCMxcI-q1y2q"
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFYe9urL2ym5M-OfsmpGl2MYiQQtWpc8Fp5BDGXOcM7XHm_xgz5mVYR_kalV-ZycvZSO6rWroQJIboS3_ghHrnUGxEXSrdRdeOIxsKBYcg0KgmQFMY3DTFkVQJFvzBOKuE5LWLXNHgi8ibFKnqbtmPm4sVTkj_y9IwlSZOAh8VxVv9VGjHjzQ32-ZxuIQGIYQ=="
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnNAuWw7YmdJI4DNeMfbIbAb78UuipDD-u3gYpicAMx7VyTO6E3veJWYsbIk5DLKsTTPTQkPGPWjss4ZnY41_0PcSUV9prPYg_9jbBBsxuFRG9iFLjzF0Y22d_ZW_ysaKKeOYmdUka83ZFpBRB9Z0n_sK8uMY2DAy12Y_rBeLbnQEmlSnNNlyINeRFibuQw6M6XSMxgUVZGQ=="
    },
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEE1MV4cWX9hZ6DLGZm4bdXL3veK-kQzf0GR4MQz8MzuDUkxwOfRNy2WuPsuju-V-dlg-GIGYD2gmqM0JH8I1VP29NJpbOFra_RL--NsYeoJren1I0BTGX0vv-51QpteRheVRqfW6cH8W2z-fkTCW5oX32c9rS1vHgAnaM6dVNKwthNJ0j26-vikZilzWGhChUGo9jy6yNjmjG9c-eW8PybVlI4UGhf1A5H"
    },
    {
      title: "sundayguardianlive.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGazPgV5EdMmPXkkVggCUai0dLKUaVjdwQ3C1dSTw7irSLZHySKCuRbcl-jjUN0ScMuUQh2DLQVw4Zr0hZ76ktyDCwFwUaqSwhPW0o33nGxeg9oPrFtBqSRNeSCHj1TPOTrVhI1z6pyyGkSxkRlsle6Z2RsViuzU3b31zOt7EwO4CvcnFmSZ9RzQLEnhLd2lOt9j6O68wxfeKCKcetdoPF96ZHBCz6Dsa8RFqNM0zKCPq2UE3Qo_JiKCtZxYP6ISf70qdQWdDcVF83EcjS663mCz4M4aVcKFm6UqSqBk9q95fVXfTRl5jPkBUvBVG08ZbyTwlh_n2KgP_KtHSic2dvK"
    },
    {
      title: "hurriyetdailynews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdlB9ErIeOvL1XvnUB1-vF-V8Y8NMV-wY_cOZbJ1_BS3X5YTHcY00n4tJJl6VjMKHOCyopG-NHly8pxEyPqxaQk5CePnByI1rp7ZeV7UMF42YEKcMjA4vE3rAhzyXKpLVQqvocIap5A68YrAKd5t79TlpfOD4cYxPEl4tej1DZghbqzmICT4Hfb2E_b-zWFUU--UikkA=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price forecast range August 22 2026 news",
    "US Iran military conflict news August 22 2026 Strait of Hormuz shipping update",
    "Iran Foreign Ministry statement US sanctions August 21 22 2026",
    "White House statement Iran conflict August 22 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.165 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（↓4）：特朗普强化海峡事实主权论，地缘风险长期化。",
    bannerWarning: "→ 维持 能源 与 风险资产 避险对冲，关注周一制裁细则对能源供应链的冲击。",
    deescalationIntent: "美国国内对「速战速决」的政治需求与伊朗「以拖待变」策略的对抗。",
    structuralRisk: "通行量持续维持在战前水平的 20%-40%，主要航道受军事管制。",
    contradictionNote: "美国国内对「速战速决」的政治需求与伊朗「以拖待变」策略的对抗。；美军常规封锁力量与伊朗无人机/水雷非对称力量的博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第175天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.165 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (↓4): Trump's 'territorial' claim over the Strait institutionalizes the risk for the long term.",
    bannerWarning: "→ Maintain defensive positioning in Energy and Risk Assets to hedge against Monday's sanctions rollout.",
    deescalationIntent: "US domestic demand for quick resolution vs Iran's 'strategic patience' survival…",
    structuralRisk: "Commercial traffic down to 20-40% of pre-war levels under military regulation.",
    contradictionNote: "US domestic demand for quick resolution vs Iran's 'strategic patience' survival strategy.; Conventional blockade power of the US Navy vs Iran's asymmetric dron…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 175",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
