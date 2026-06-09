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
  date: "2026-06-09",
  version: "v2.90",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D101",
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
      value: "WTI $89.40–$93.60 · Brent $92.50–$96.20",
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
      description: "黎以边境及叙利亚境内的代理人冲突再次活跃，以色列与真主党发生直接交火。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道处于IRGC非正式管控之下，商业流量仅为正常水平的50%-60%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "地缘溢价被宏观加息预期对冲，油价在$90附近进行技术性修正。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军在波斯湾维持高水平部署，并考虑针对伊朗实施新的资产处置计划。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交接触陷入停滞，地区停火协议因近日火炮交换而摇摇欲坠。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "黎以战线停火违约事件",
      description: "真主党火箭弹袭击引发以色列对贝鲁特南郊的报复性空袭，威胁整体局势稳定。信源：ISW/Reuters。",
      verification: "confirmed",
      timestamp: "2026-06-07T14:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "WTI油价因宏观压力下跌",
      description: "受强劲就业数据支撑的加息预期导致WTI原油价格跌至$89.46，技术面进入调整。信源：Bloomberg。",
      verification: "confirmed",
      timestamp: "2026-06-09T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗海军发布航道警告",
      description: "IRGC宣布对霍尔木兹海峡实施新的航道监管，警告美方护航力量勿越界。信源：AFP。",
      verification: "confirmed",
      timestamp: "2026-06-08T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "军事打击频率维持在报复性循环层面，未进入全面地面进攻。",
      "能源市场开始消化长期供应风险，转向宏观定价。",
      "外交谈判虽然挂起，但热线沟通渠道在第三国主持下勉强维持。"
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
        "延续：黎以边境与叙利亚境内的代理人小规模冲突常态化。",
        "变化：以色列针对黎巴嫩核心目标的打击精度提升，试探真主党防御底线。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：IRGC快艇在海峡维持高频监视，商船需通过非官方通报程序。",
        "变化：部分航运商开始尝试增加班次，但保费仍处于战时水平。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：加息预期取代供应担忧成为短期价格主导因素，油价回落（Bloomberg）。",
        "延续：伊朗出口因封锁及制裁仍处于低位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美方维持“极限施压”与“有限对冲”并行政策。",
        "变化：德黑兰内部对谈判条件的灵活度出现分歧，温和派试图重启渠道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底拆除导弹设施与伊朗要求无条件解除经济封锁的根本对立。"
    ],
    military: [
      "以色列的区域安全红线与伊朗防御纵深策略之间的武装博弈。"
    ]
  },
  scoreTrend: [
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突进入“低烈度、长持续”的僵局阶段，油价定价权向美联储货币政策偏移。",
  investmentSignal: "→ 维持能源资产对冲仓位，规避高β风险资产，关注大宗商品防御性配置。",
  prevRiskScore: 72,
  webSources: [
    {
      title: "bingx.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYmzvgJbPLqE8jOHk09fyBKDFs_OfwTE63ASGz-phUoDc4dTfggSzyNQZ_eyfYt0Ka0Pyy4JZXsBYv4__vGc37E9z-YWoAj7Hz4QxNCdYA0dbO7ZKNz31_PZy6c6Tpa1M7WEdzQAjoXCsEeEU-k6VgNPVPEFyQAGOgixnNXkzGDHX8_U1_YTf9ZJQ2nHIwDasvJsESrw9sCnFf4GvwNtQCWc7FZDd5hZy2bV0QkEY="
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7qGWJSEJI9-0sBcMXPqTbKQn4vazW-GB3chghm6Xej9c8s3gZPefqU8TJkvs7-Ntn18ye3BpLpyEAGygA7HLstI3nsHHiRfrWnTr904KJehw2UQTsy37oGpFfC46cdrSSMffZhVkL-qB9kcIyqSsv8M-bV5Mg5yDD275MhYNDFq9boldr_46LSJqgH_t4eg=="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEuhv8l0elETWYyZlPQf7UYLH8OjCQuRQLegJJdR-YPPJ79myvPhDRqYxLqVWWI8geTUIkS9Sre9i2FVbE6cL3CigWoIvBh1TPVgBrlib_XKN_xYAvhC2j97Bcnael3DWYyYgE7B88SZGBhnOuKPFQ4"
    },
    {
      title: "unn.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVvdGFN0WMTqi3h7mohCvWQrinG1JpWaZCE8LvgYxpGBiSC37e7wsBpGxCdJQqLv9SMDPZ1jfXMCHvcG5B1tW6A3rW9s72XAtpg5-aQiqyooDDeFpWPrGJvU6pB3d13OHgeRJVqWnVeWv4aAccX7F2T5njBcjcJ8TzaJNgdBcPOVslm8PnSZIRUtwtSQgJtT863Q5sOJc4_f2uoTPI8_a7cBWD5M58e5EKfjviN84="
    },
    {
      title: "substack.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpLYdv5T0RWwWFxRjMtxXN3MUc71HOO4zcd8mRcvOB2Z785JA6VwsJTaFtO6aeOVXwMSEWpfreG8PoNeQ8Z9vXOLKBKUQJYR4uSTfof1UFxUqvn5TIAufgAZtFY8iIsVqYPe1Y29ntQYsuYi8JaQcUwmb9El2PAoShbaQno80="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe7ditG-EoFMOYsHULm7pkCLU4F9KoEIqRJTF6RaagaSD1nd7HmwIwPgrgvoj5JqQxZ9sDMyt01nruPzltk3bSwYxMn2HlyWnGhZ1BwV3ZkAYJ8fAwh0a8Kq9m-VkM68mLaE3hnr1c6qMiaYimX8M4bV_ENv0H3AkLnGZ3a93O"
    },
    {
      title: "medium.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRmLBECBDAHjQPuSstsC9XzKFIFW4pzIHvBLzK4J-HU5jajLNGUkHIJwjzR6hxSNLGhtbsQ6zGFGKHxbvE5mR30e-kTfIYDnZfy7P_UDhcpuvVpvGKSzz1xde5dJAgDjgfxwQsMbnDpbu5bPjZzARrUkzDKoOyDS_53AJnf4MWLglF4dZweRiv5t6TDwf3nu8BtaPwjl_BYUa3XTbY4Bm915euOYzuHGqWCmNOHweQaF20SNzeyFYdhMhApgPkIOMMcPrkiC4ydCiPQw7V"
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjMzReRgs1Nnn8HELXpCtkPkJ6fhglLkhsksDQIfIORzFhB_HOsVDuUrJSXxSrk31-hmxYWUW8Lizf6EAAMfEumE7J1grgd_k_87LErvlcGBA68Ax6DI-DinBE0XkOa971BfXoeo5umP469DIKGjMWAwKitXJ0YSo-_A=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4tCL9Q-xM_VOWZ44v_VipEd_1_dUk2hzgEhS97HMfl1649nwDzkb-9ZzXj0MnVJCm_gMv9r4_zKxutSO3347sUyKimCoTTakNW1fs1Noppt82xuEirnVW"
    },
    {
      title: "visionofhumanity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWYHRStfElnqJLjcJTXLk_olKkIlExtJXOGoIzoYEzk2dg2uAw9dtd16lzerYO1Pi5qXxFaJYWtBtHNKfI0F8MAfd6Kc3MxL12V0hP15QwGBLTegr0NUjVKxxfqNAiaIHyOnhotRY-RJFnhy8AeJ1RE8F_OY3-h6-OHHW-V1ysIdc="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGsMSiwCkbjhNnaZUZKxSzBmsBMdtWUXwCnWqBeAxCP6eMGDyuY9twCtaMVpkgDeq3udOI692O5Q8zEnQcAIrzzzpAnKZtcWi7ISBu1hAKq6Y17y7UcoK-cRasmKVQwWqLH"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFUpJMXjTD78fIgVLdUy3mp5IJvl_c657vShmuB86ZcnKiIRc-baqqvPsU535SZgPH4VnSn3BLStZCrvdiWVkxfHRfJtgu8sSz45NKPOEGITrrEkL1srxlfLO-YwwFxAN1pXe2hQ0IPE-fMjH3Z3c3r1KYxCJi126z_Y-w23JkfXZdBZeCQASgU8GzQSPbnVQgtEopdQRoM2zULi6fxg=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 9 2026 forecast trend",
    "WTI Brent crude oil price range June 8 9 2024 Reuters Bloomberg",
    "Iran US conflict June 2026 news simulation context"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-09",
  version: "v2.90",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D101",
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
      value: "WTI $89.40–$93.60 · Brent $92.50–$96.20",
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
      description: "Proxy skirmishes in Lebanon and Syria have reactivated with direct strikes on Beirut.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The strait remains under informal IRGC control, with traffic at 50-60% of pre-war levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Geopolitical premiums are being countered by macro interest rate concerns, leading to price correction.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains high naval presence and considers using frozen Iranian funds for ally reparations.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic efforts are stalled as ceasefire violations increase and terms remain deadlocked.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Lebanon-Israel Ceasefire Breach",
      description: "Hezbollah rocket attacks and Israeli airstrikes on Beirut threaten the regional truce. Source: ISW.",
      verification: "confirmed",
      timestamp: "2026-06-07T14:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "WTI Oil Drops on Macro Pressure",
      description: "WTI crude fell to $89.46 as surging employment data fueled interest rate hike fears. Source: Bloomberg.",
      verification: "confirmed",
      timestamp: "2026-06-09T08:30:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "IRGC Naval Warning",
      description: "Iranian naval forces warned external actors against disrupting its transit rules in the Strait. Source: AFP.",
      verification: "confirmed",
      timestamp: "2026-06-08T21:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military actions remain retaliatory and localized.",
      "Energy markets shifting focus from supply shocks to demand suppression.",
      "Diplomatic channels persist through proxies but lack substance."
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
        "Continue: Sustained proxy skirmishes on Israel's northern border.",
        "Change: Enhanced precision in Israeli strikes on high-value Hezbollah assets."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: IRGC maintain surveillance boats; vessels must follow de-facto protocols.",
        "Change: Insurance premiums remain elevated despite a slight uptick in commercial frequency."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Hawkish Fed expectations began to suppress oil prices (Bloomberg).",
        "Continue: Iranian exports remain severely curtailed by the naval blockade."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US persists with 'maximum pressure' rhetoric.",
        "Change: Internal Tehran debates emerge regarding conditions for renewed Pakistani mediation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demands for missile dismantlement vs. Iran's demand for total sanction relief."
    ],
    military: [
      "Israeli security redlines vs. Iran's axis of resistance expansion strategy."
    ]
  },
  scoreTrend: [
    {
      date: "06-05",
      score: 76
    },
    {
      date: "06-06",
      score: 76
    },
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72,
      active: true
    }
  ],
  keyChange: "Conflict transitions to a 'managed stalemate' while macro headwinds temper energy prices.",
  investmentSignal: "→ Maintain energy hedge positions; defensive allocation in commodities over high-beta assets.",
  prevRiskScore: 72,
  webSources: [
    {
      title: "bingx.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYmzvgJbPLqE8jOHk09fyBKDFs_OfwTE63ASGz-phUoDc4dTfggSzyNQZ_eyfYt0Ka0Pyy4JZXsBYv4__vGc37E9z-YWoAj7Hz4QxNCdYA0dbO7ZKNz31_PZy6c6Tpa1M7WEdzQAjoXCsEeEU-k6VgNPVPEFyQAGOgixnNXkzGDHX8_U1_YTf9ZJQ2nHIwDasvJsESrw9sCnFf4GvwNtQCWc7FZDd5hZy2bV0QkEY="
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7qGWJSEJI9-0sBcMXPqTbKQn4vazW-GB3chghm6Xej9c8s3gZPefqU8TJkvs7-Ntn18ye3BpLpyEAGygA7HLstI3nsHHiRfrWnTr904KJehw2UQTsy37oGpFfC46cdrSSMffZhVkL-qB9kcIyqSsv8M-bV5Mg5yDD275MhYNDFq9boldr_46LSJqgH_t4eg=="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEuhv8l0elETWYyZlPQf7UYLH8OjCQuRQLegJJdR-YPPJ79myvPhDRqYxLqVWWI8geTUIkS9Sre9i2FVbE6cL3CigWoIvBh1TPVgBrlib_XKN_xYAvhC2j97Bcnael3DWYyYgE7B88SZGBhnOuKPFQ4"
    },
    {
      title: "unn.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVvdGFN0WMTqi3h7mohCvWQrinG1JpWaZCE8LvgYxpGBiSC37e7wsBpGxCdJQqLv9SMDPZ1jfXMCHvcG5B1tW6A3rW9s72XAtpg5-aQiqyooDDeFpWPrGJvU6pB3d13OHgeRJVqWnVeWv4aAccX7F2T5njBcjcJ8TzaJNgdBcPOVslm8PnSZIRUtwtSQgJtT863Q5sOJc4_f2uoTPI8_a7cBWD5M58e5EKfjviN84="
    },
    {
      title: "substack.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpLYdv5T0RWwWFxRjMtxXN3MUc71HOO4zcd8mRcvOB2Z785JA6VwsJTaFtO6aeOVXwMSEWpfreG8PoNeQ8Z9vXOLKBKUQJYR4uSTfof1UFxUqvn5TIAufgAZtFY8iIsVqYPe1Y29ntQYsuYi8JaQcUwmb9El2PAoShbaQno80="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe7ditG-EoFMOYsHULm7pkCLU4F9KoEIqRJTF6RaagaSD1nd7HmwIwPgrgvoj5JqQxZ9sDMyt01nruPzltk3bSwYxMn2HlyWnGhZ1BwV3ZkAYJ8fAwh0a8Kq9m-VkM68mLaE3hnr1c6qMiaYimX8M4bV_ENv0H3AkLnGZ3a93O"
    },
    {
      title: "medium.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRmLBECBDAHjQPuSstsC9XzKFIFW4pzIHvBLzK4J-HU5jajLNGUkHIJwjzR6hxSNLGhtbsQ6zGFGKHxbvE5mR30e-kTfIYDnZfy7P_UDhcpuvVpvGKSzz1xde5dJAgDjgfxwQsMbnDpbu5bPjZzARrUkzDKoOyDS_53AJnf4MWLglF4dZweRiv5t6TDwf3nu8BtaPwjl_BYUa3XTbY4Bm915euOYzuHGqWCmNOHweQaF20SNzeyFYdhMhApgPkIOMMcPrkiC4ydCiPQw7V"
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjMzReRgs1Nnn8HELXpCtkPkJ6fhglLkhsksDQIfIORzFhB_HOsVDuUrJSXxSrk31-hmxYWUW8Lizf6EAAMfEumE7J1grgd_k_87LErvlcGBA68Ax6DI-DinBE0XkOa971BfXoeo5umP469DIKGjMWAwKitXJ0YSo-_A=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4tCL9Q-xM_VOWZ44v_VipEd_1_dUk2hzgEhS97HMfl1649nwDzkb-9ZzXj0MnVJCm_gMv9r4_zKxutSO3347sUyKimCoTTakNW1fs1Noppt82xuEirnVW"
    },
    {
      title: "visionofhumanity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWYHRStfElnqJLjcJTXLk_olKkIlExtJXOGoIzoYEzk2dg2uAw9dtd16lzerYO1Pi5qXxFaJYWtBtHNKfI0F8MAfd6Kc3MxL12V0hP15QwGBLTegr0NUjVKxxfqNAiaIHyOnhotRY-RJFnhy8AeJ1RE8F_OY3-h6-OHHW-V1ysIdc="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGsMSiwCkbjhNnaZUZKxSzBmsBMdtWUXwCnWqBeAxCP6eMGDyuY9twCtaMVpkgDeq3udOI692O5Q8zEnQcAIrzzzpAnKZtcWi7ISBu1hAKq6Y17y7UcoK-cRasmKVQwWqLH"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFUpJMXjTD78fIgVLdUy3mp5IJvl_c657vShmuB86ZcnKiIRc-baqqvPsU535SZgPH4VnSn3BLStZCrvdiWVkxfHRfJtgu8sSz45NKPOEGITrrEkL1srxlfLO-YwwFxAN1pXe2hQ0IPE-fMjH3Z3c3r1KYxCJi126z_Y-w23JkfXZdBZeCQASgU8GzQSPbnVQgtEopdQRoM2zULi6fxg=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price June 9 2026 forecast trend",
    "WTI Brent crude oil price range June 8 9 2024 Reuters Bloomberg",
    "Iran US conflict June 2026 news simulation context"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.90 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：冲突进入“低烈度、长持续”的僵局阶段，油价定价权向美联储货币政策偏移。",
    bannerWarning: "→ 维持能源资产对冲仓位，规避高β风险资产，关注大宗商品防御性配置。",
    deescalationIntent: "美方要求彻底拆除导弹设施与伊朗要求无条件解除经济封锁的根本对立。",
    structuralRisk: "航道处于IRGC非正式管控之下，商业流量仅为正常水平的50%-60%。",
    contradictionNote: "美方要求彻底拆除导弹设施与伊朗要求无条件解除经济封锁的根本对立。；以色列的区域安全红线与伊朗防御纵深策略之间的武装博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第101天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.90 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Conflict transitions to a 'managed stalemate' while macro headwinds temper energy prices.",
    bannerWarning: "→ Maintain energy hedge positions; defensive allocation in commodities over high-beta assets.",
    deescalationIntent: "US demands for missile dismantlement vs. Iran's demand for total sanction relie…",
    structuralRisk: "The strait remains under informal IRGC control, with traffic at 50-60% of pre-war levels.",
    contradictionNote: "US demands for missile dismantlement vs. Iran's demand for total sanction relief.; Israeli security redlines vs. Iran's axis of resistance expansion strategy.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 101",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
