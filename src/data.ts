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
  date: "2026-05-09",
  version: "v2.58",
  riskScore: 84,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D70",
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
      value: "WTI $94.51–$97.61 · Brent $100.16–$103.08",
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
      description: "美军驱逐舰与伊朗部队在霍尔木兹海峡发生直接交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡维持事实性封锁，船舶积压严重。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特油价重回 $100 危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国直接军事部署并参与「自卫性」作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判因军事冲突重燃而陷入停滞。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊霍尔木兹海峡直接交火",
      description: "美军驱逐舰击退伊朗快艇与导弹攻击，随后对伊朗沿岸雷达及无人机基地实施精确打击（CBS News/CENTCOM）。",
      verification: "confirmed",
      timestamp: "2026-05-08T22:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "布伦特原油反弹重回$100",
      description: "受海上冲突升级影响，原油价格回补此前跌幅，布伦特原油高点触及$103（Forbes）。",
      verification: "confirmed",
      timestamp: "2026-05-09T02:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "巴林安全部队逮捕41名亲伊分子",
      description: "指控相关人员受伊朗革命卫队指使企图在海合会国家境内实施破坏（Reuters）。",
      verification: "confirmed",
      timestamp: "2026-05-09T08:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接海上交战取代了边境小规模磨蹭，战争烈度进入新阶段。",
      "封锁与反封锁成为核心军事博弈点。",
      "外交提案面临战火考验，和平协议窗口正在收窄。"
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
        "变化：美军对伊朗海峡沿岸港口及发射阵地实施报复性空袭（CENTCOM）。",
        "延续：伊朗海事力量维持对国际水道的高压监视。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗实质性掌控海峡通行权，非友好国家船舶通行受阻（Gulf News）。",
        "变化：多国海军加强在阿曼湾的商船护航力度。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油重拾涨势，主要受中东供应安全风险推动（TOI）。",
        "延续：全球炼厂寻找非中东替代油源，运费溢价维持高位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗指责美方袭击违反 4/8 停火协议，暗示报复行动（Mehr News）。",
        "延续：特朗普政府维持「极端高压」政策，强调海峡通行自由。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求的全面核查协议与伊朗维护主权及制裁减免之间的对立。"
    ],
    military: [
      "美军维护航道自由流动的需求与伊朗利用地缘控制力作为谈判筹码的冲突。"
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "05-08",
      score: 84
    },
    {
      date: "05-09",
      score: 84,
      active: true
    }
  ],
  keyChange: "高位黏滞",
  investmentSignal: "→ 维持能源与大宗商品防御性配置，对冲地缘溢价引发的市场震荡风险。",
  prevRiskScore: 84,
  webSources: [
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlHye5JZ2gd3nVu0KZjRG63VSj2Od-7XXhlpNuQr-82lvZ6JM9U-igdeqNWnHX0Pudq7mH1_17yG9VSd8YCqPZ15rQsek_oLctHo4RVZ4tK9urwIK76k5eVjj0E6RNwMr-p3XKzyAynbf2lkiiAdOYJj3uBUmPo8-p_EyHgODQYX8m9EJKQZgdczl5jgvrqdKv49cuIwte7jkwqLxT62ZQm7SWZzOuixOK86_I2viru2fX1TvjY1xRkioayX0-L-yHEtk9CqLUzvFhEmFyMMEwaohJeWX6su9F"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhvIWZrCVHPwcCT4ICcIVMyY9X3vOXiqcwDmkn7Z_B9zpCmaXSaRSK1J3iMe3_s8lEJGOtNJgygt0yjQjnUYyWKqON2Wt4BigVJMGcDTIlNxCCYyXS-5nBy0IuCCFE1vLU09RzFuG5Lv_xu8hA_PAkzczVhi2vSY-AqkJNzDrp0U0Pi0-1TqYYcjYDZYzHL7_Q"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZP7FjeqDNpdd_57RzphANX3ejPfET6CdLWMtYTmnDMWjrDrAMOsTMVElZA6r6EIZM0jXrFtcN-7AjqMIRQO3NQltXdlGnKZXAPPEkkLTi7oIWeKDnqqjsZA8pl4e08wuonu5CMSj9W4TQ4_3xhpRM33LlWRg2sCdZB-SGWB-lcsoEBuoisqZ8KX5nt7UsHfEVzokAUtlQxweVktMiy7xYEcsVtrRqIGz78u9avbYtikDETYjHA70vUwhUVELmohDv9SBrxwL_vf5UraP9"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHmyoMfcjyb4g1cyA3zvsY1p7g5EB1_MwXpxTzB5vtMoLEsP-ZgTmvaiA8dEYarmECZKocjwNeLnewS74rrhhtoJSHAey8gRntNauG57Ui_EddRT0Apk-mfgp3O5eWHA5ty2rvKdwNWlfsFgWvYyE48BfNyBBjTYU1EehqbOiDQEI-AT9VTXiOH8bDyP_qfbKcdIDHIdaM_a2LEneSe"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMAxgzN_V0ER4EEtSNrl1TFxH8Qpe7xlpiCvDYiON9YhLXZCT8sDjHjQtJJN_2ByJ_oTfugQ2nVrTyX3s8ioBBVAiKBoDVUjiDwxBcaAtybOADRRN0PklKxN4IyOuE7iHVuNnuWppfumiWfrJ-kaIevxbCcL5hhnq84p-kWUEsXU6iyKES4fYfzeHOIU8MgsjbMvlqBLM_ZKuRqZpZyM2fLc14Qq08QKXYR8XcsXdRPZBm4b6yT6-X4ObDO8nwlw=="
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzbX0S96LYXktV4P7YmdgFl9yvNDtfek-tLtYK_FaZDiCPWcRf49HYvDF-Nya01FsWKJD6w8FpEI1_UdC130EsT7E0UakRhXtENuU0MwnM55afsqhlxW0jZmhJnTYZ18ar-i7CbViJAhMEd9FW0wpdmScVn3Vreg_9akWE0NthpHe2zpnwt0AwSkg_TnDuIrgq3LKsluwYi9vMg0A86J3r-RNmUmDF4yYQ38Ue"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQUWy-G8C9s1975Tu5SVPF2VGU2MLZjEAnSNBdfAh5zT85OmdnzoSNtoT9eepkhSSy-VPoCSYt0WlNdAVzNKgXnkDiKe_cjMTZ8Kmq-372CBfyTfLyH4GtpK_rJNUyuUJ1GDfcHoPBN6AIlQ10PrxXFp04lg4="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZngrHPaJAEgIlS6QBRnhtZFqnEcK-KfiVt1BKv27Mm70WMEQ1drecuDIJeuXv8yvFYM3Ov2PpTLxDhwgT3geX8tKMYfavxdoeMgiG-C1TTpZK3njG61eDNo7b7EE="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHF6NEblW7W4yeNRj7W6fnf536bMAqbpHLZGcWZwxImAhd7FMxbpD_792c9N-pVXMg1uHZHh_17Vo2pzBiPnEpdOudxQ-lk87QLzRl_TUNKo2D2qan66zqapOP9l0rJh0GpJhYIbjj19csGdQ75qAJ0DUwK_GeL_zgUx86vUAP3by61Hdy3hgJRh9s4C_YFF5f7trogTM1d4wr0NkrHPzBieq2GcrVxOjcQWfweFWf-EkZ5GCi4Wvl-rg07ApT0swl05oewcM2PlTE7DCPvvOzQuwORmh9KLaOPEYjyPnnbT2e1CqLBUtX5zD63_Ypn1Wj5tHwUNCgE_Aya_kwo21tjr98mZy1AcE_9K45UCrUptBT_J7iKj8bg5CxbN-Ckog=="
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKl9OTC9uY6-L8K77EzUPmlZtuSgZOj1sFvfn4hsqNGFkw5bx8VBWh7Op8iuxM_fmd2b651pYUvNDDhhSaiducJESDQC8WLCHfFY6nFma9MQ61dolk3XqN3FM3t2R-wxWaimtZDpmPOBs8cKL_Hvfrz_Rx2yyAyH_gvFRcRqHA_EGn8RmDzPdO"
    }
  ],
  webSearchQueries: [
    "US-Iran conflict news May 9 2026 military escalation Hormuz Strait",
    "WTI Brent oil prices range May 8 2026 trend news",
    "WTI Brent crude oil price analysis May 9 2026 forecast"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-09",
  version: "v2.58",
  riskScore: 84,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D70",
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
      value: "WTI $94.51–$97.61 · Brent $100.16–$103.08",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct fire exchange between US Navy and Iranian forces in the Strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Functional blockade maintained by Iran's transit approval system.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude returns to the $100 'crisis zone'.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Direct US combat involvement via self-defense operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Negotiations stalled as military conflict re-ignites.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Direct Clashes in Hormuz",
      description: "US destroyers repel Iranian drone/missile attacks; US retaliates with precision strikes on Iranian drone bases (CBS/CENTCOM).",
      verification: "confirmed",
      timestamp: "2026-05-08T22:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Brent Crude Rebounds Above $100",
      description: "Oil markets reverse weekly losses due to renewed maritime conflict, pricing in heavy war premiums (Forbes).",
      verification: "confirmed",
      timestamp: "2026-05-09T02:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Bahrain Arrests 41 Linked to IRGC",
      description: "Security forces dismantle a sabotage cell allegedly directed by Iranian military (Reuters).",
      verification: "confirmed",
      timestamp: "2026-05-09T08:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict has shifted from proxy-war to direct maritime engagement.",
      "Hormuz blockade remains the primary strategic lever for Tehran.",
      "The window for a ceasefire deal is narrowing as trust collapses."
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
        "Change: US Air Force conducts retaliatory strikes on Iranian coastal missile batteries (CENTCOM).",
        "Continue: Iranian navy maintains high-pressure surveillance of the Persian Gulf."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iranian de-facto control over transit remains the main threat to global trade (Gulf News).",
        "Change: Several global liners announce indefinite suspension of Hormuz transits."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices surge back to Q2 peaks due to heightened supply risks (TOI).",
        "Continue: Refiners scramble for Brent alternatives outside the Middle East."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran MFA says latest US strikes were a 'grave violation' of international law (Mehr News).",
        "Continue: US administration maintains a 'maximum pressure' stance on maritime security."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Standoff between US nuclear verification demands and Iranian sovereignty/sanctions relief requirements."
    ],
    military: [
      "Conflict between US freedom of navigation and Iranian use of Chokepoint control as leverage."
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "05-08",
      score: 84
    },
    {
      date: "05-09",
      score: 84,
      active: true
    }
  ],
  keyChange: "High-Level Stasis",
  investmentSignal: "→ Maintain defensive positions in energy and risk-hedging assets to offset volatility from geopolitical premiums.",
  prevRiskScore: 84,
  webSources: [
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlHye5JZ2gd3nVu0KZjRG63VSj2Od-7XXhlpNuQr-82lvZ6JM9U-igdeqNWnHX0Pudq7mH1_17yG9VSd8YCqPZ15rQsek_oLctHo4RVZ4tK9urwIK76k5eVjj0E6RNwMr-p3XKzyAynbf2lkiiAdOYJj3uBUmPo8-p_EyHgODQYX8m9EJKQZgdczl5jgvrqdKv49cuIwte7jkwqLxT62ZQm7SWZzOuixOK86_I2viru2fX1TvjY1xRkioayX0-L-yHEtk9CqLUzvFhEmFyMMEwaohJeWX6su9F"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhvIWZrCVHPwcCT4ICcIVMyY9X3vOXiqcwDmkn7Z_B9zpCmaXSaRSK1J3iMe3_s8lEJGOtNJgygt0yjQjnUYyWKqON2Wt4BigVJMGcDTIlNxCCYyXS-5nBy0IuCCFE1vLU09RzFuG5Lv_xu8hA_PAkzczVhi2vSY-AqkJNzDrp0U0Pi0-1TqYYcjYDZYzHL7_Q"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZP7FjeqDNpdd_57RzphANX3ejPfET6CdLWMtYTmnDMWjrDrAMOsTMVElZA6r6EIZM0jXrFtcN-7AjqMIRQO3NQltXdlGnKZXAPPEkkLTi7oIWeKDnqqjsZA8pl4e08wuonu5CMSj9W4TQ4_3xhpRM33LlWRg2sCdZB-SGWB-lcsoEBuoisqZ8KX5nt7UsHfEVzokAUtlQxweVktMiy7xYEcsVtrRqIGz78u9avbYtikDETYjHA70vUwhUVELmohDv9SBrxwL_vf5UraP9"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHmyoMfcjyb4g1cyA3zvsY1p7g5EB1_MwXpxTzB5vtMoLEsP-ZgTmvaiA8dEYarmECZKocjwNeLnewS74rrhhtoJSHAey8gRntNauG57Ui_EddRT0Apk-mfgp3O5eWHA5ty2rvKdwNWlfsFgWvYyE48BfNyBBjTYU1EehqbOiDQEI-AT9VTXiOH8bDyP_qfbKcdIDHIdaM_a2LEneSe"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMAxgzN_V0ER4EEtSNrl1TFxH8Qpe7xlpiCvDYiON9YhLXZCT8sDjHjQtJJN_2ByJ_oTfugQ2nVrTyX3s8ioBBVAiKBoDVUjiDwxBcaAtybOADRRN0PklKxN4IyOuE7iHVuNnuWppfumiWfrJ-kaIevxbCcL5hhnq84p-kWUEsXU6iyKES4fYfzeHOIU8MgsjbMvlqBLM_ZKuRqZpZyM2fLc14Qq08QKXYR8XcsXdRPZBm4b6yT6-X4ObDO8nwlw=="
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzbX0S96LYXktV4P7YmdgFl9yvNDtfek-tLtYK_FaZDiCPWcRf49HYvDF-Nya01FsWKJD6w8FpEI1_UdC130EsT7E0UakRhXtENuU0MwnM55afsqhlxW0jZmhJnTYZ18ar-i7CbViJAhMEd9FW0wpdmScVn3Vreg_9akWE0NthpHe2zpnwt0AwSkg_TnDuIrgq3LKsluwYi9vMg0A86J3r-RNmUmDF4yYQ38Ue"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQUWy-G8C9s1975Tu5SVPF2VGU2MLZjEAnSNBdfAh5zT85OmdnzoSNtoT9eepkhSSy-VPoCSYt0WlNdAVzNKgXnkDiKe_cjMTZ8Kmq-372CBfyTfLyH4GtpK_rJNUyuUJ1GDfcHoPBN6AIlQ10PrxXFp04lg4="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZngrHPaJAEgIlS6QBRnhtZFqnEcK-KfiVt1BKv27Mm70WMEQ1drecuDIJeuXv8yvFYM3Ov2PpTLxDhwgT3geX8tKMYfavxdoeMgiG-C1TTpZK3njG61eDNo7b7EE="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHF6NEblW7W4yeNRj7W6fnf536bMAqbpHLZGcWZwxImAhd7FMxbpD_792c9N-pVXMg1uHZHh_17Vo2pzBiPnEpdOudxQ-lk87QLzRl_TUNKo2D2qan66zqapOP9l0rJh0GpJhYIbjj19csGdQ75qAJ0DUwK_GeL_zgUx86vUAP3by61Hdy3hgJRh9s4C_YFF5f7trogTM1d4wr0NkrHPzBieq2GcrVxOjcQWfweFWf-EkZ5GCi4Wvl-rg07ApT0swl05oewcM2PlTE7DCPvvOzQuwORmh9KLaOPEYjyPnnbT2e1CqLBUtX5zD63_Ypn1Wj5tHwUNCgE_Aya_kwo21tjr98mZy1AcE_9K45UCrUptBT_J7iKj8bg5CxbN-Ckog=="
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKl9OTC9uY6-L8K77EzUPmlZtuSgZOj1sFvfn4hsqNGFkw5bx8VBWh7Op8iuxM_fmd2b651pYUvNDDhhSaiducJESDQC8WLCHfFY6nFma9MQ61dolk3XqN3FM3t2R-wxWaimtZDpmPOBs8cKL_Hvfrz_Rx2yyAyH_gvFRcRqHA_EGn8RmDzPdO"
    }
  ],
  webSearchQueries: [
    "US-Iran conflict news May 9 2026 military escalation Hormuz Strait",
    "WTI Brent oil prices range May 8 2026 trend news",
    "WTI Brent crude oil price analysis May 9 2026 forecast"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.58 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（持平）：高位黏滞",
    bannerWarning: "→ 维持能源与大宗商品防御性配置，对冲地缘溢价引发的市场震荡风险。",
    deescalationIntent: "美方要求的全面核查协议与伊朗维护主权及制裁减免之间的对立。",
    structuralRisk: "海峡维持事实性封锁，船舶积压严重。",
    contradictionNote: "美方要求的全面核查协议与伊朗维护主权及制裁减免之间的对立。；美军维护航道自由流动的需求与伊朗利用地缘控制力作为谈判筹码的冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第70天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.58 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (Flat): High-Level Stasis",
    bannerWarning: "→ Maintain defensive positions in energy and risk-hedging assets to offset volatility from geopolitical premiums.",
    deescalationIntent: "Standoff between US nuclear verification demands and Iranian sovereignty/sancti…",
    structuralRisk: "Functional blockade maintained by Iran's transit approval system.",
    contradictionNote: "Standoff between US nuclear verification demands and Iranian sovereignty/sanctions relief requirements.; Conflict between US freedom of navigation and Iranian …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 70",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
