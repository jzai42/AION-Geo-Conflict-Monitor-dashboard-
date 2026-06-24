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
  date: "2026-06-24",
  version: "v2.105",
  riskScore: 40,
  change: "down",
  keyStats: [
    {
      label: "冲突天数",
      value: "D116",
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
      value: "WTI $72.74–$74.77 · Brent $76.47–$78.28",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "许可制有序复航",
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
      description: "进入 MOU 协议规定的停火期，美伊双方未发生直接军事接触，重心转向黎南代理冲突监控。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "海峡进入“许可制”通行阶段，商船需获取伊朗核准码，通行量恢复至正常水平的 53.3%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美财政部 60 日豁免令及伊朗产出恢复预期导致油价大幅贴水，双标均跌破近期支撑位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "美国通过 General License X 展示外交诚意，主要大国转向支持巴基斯坦与卡塔尔的调解。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "60 天谈判窗口开启，虽然核查细节存在分歧，但沟通机制已建立且具备经济激励措施。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美财政部颁发 60 日石油豁免令",
      description: "General License X 正式允许伊朗销售石油并使用美元结算，有效期至 2026 年 8 月 21 日。",
      verification: "confirmed",
      timestamp: "2026-06-24",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹单日通过 35 艘商船",
      description: "自 2 月开战以来最繁忙交易日，海运监控显示包含两艘超大型油轮（VLCC）在内的船队通过海峡。",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "IAEA 与伊朗达成核查原则一致",
      description: "总干事格罗西表示核查将进行，但伊朗官方称目前尚无 IAEA 专家立即返回的计划。",
      verification: "partial",
      timestamp: "2026-06-24",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "观望跟踪",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊签署 Islamabad 谅解备忘录，开启 60 天停火谈判期",
      "能源制裁部分松绑，换取海峡通行及核谈进展",
      "以色列在黎巴嫩的后续行动成为干扰停火的主要变数"
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
        "延续：美伊直接交火保持零记录，处于 MOU 规定的观察期。",
        "变化：以色列内阁坚称黎南安全区不受美伊停火协议约束。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡由完全军事封锁转为受控的许可制商业运行。",
        "变化：战后首批 VLCC 超大型油轮在联合护航下顺利出海。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗石油禁令暂时解除，现货市场出现大幅抛售潮。",
        "延续：OPEC+ 核心成员维持增产节奏，进一步压低风险溢价。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：特朗普重申“无意长期驻军”，推进核谈具体条款细节。",
        "变化：美参议院通过决议要求对最终协议行使监督权。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "特朗普的快速撤出承诺与以色列内塔尼亚胡安全诉求的脱节",
      "伊朗国内对核核查深度的接受度与经济解困的紧迫感"
    ],
    military: [
      "许可制航行下的主权识别争议",
      "黎南“安全区”内以色列军队与亲伊武装的接触风险"
    ]
  },
  scoreTrend: [
    {
      date: "06-20",
      score: 40
    },
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
      score: 40,
      active: true
    }
  ],
  keyChange: "美财政部签发 60 日石油豁免令，局势正式由热战对抗转向经济外交博弈期。",
  investmentSignal: "→ 增持风险资产，维持能源对冲。",
  prevRiskScore: 40,
  webSources: [
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgyuONsaurSVzxZ25g5x0Quz8voUWuQnbWx__-D9o83jdF55uxgGhAiP9QKiGjyP9yBFPAruugBQHtNrIh1-r6XJII6cVkBxbIDZ3awvR4y97XUcNUoKc12CVvQ0KY1sDtYDoBUGhoGlN85pkSFu4d9CS0bI0ehwU5IcioJf3e1i0i-EvM_doa3QbxyQOt2A=="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH0LuPtDaX8oWcjs6r4iwlT9D963aO5UU84lssNrnL8whuosofy5HkKaLlvHnlNMn74Jcv_OcYE9VsyCiLueDnP3TKqMXWwejlgeeCgYFTooRejPpquu14Ygbu1Gs1XoUkAbRuT_n0Yx9tbSvb2sKoasmIIDU413rZZ0bHuRHE3ErC-hggiTODdyju36A1aQgKDY-4zcg3MNdCIhqroij2Vdtq0sA=="
    },
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGN88zNhn_UulZLUJl4cxXQ4S6xtRfT-a3yLVRYZnZBBbXg7zOW447iqAKY9C5ZJgAR_vbxR3g9YkRwy7oxqRJYVzCVAA5ere1hcXflH7wTCj7U_mbAXwwBzrpgOtZstA=="
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMnjNnW6-xh_ITZVzfWHjIfNmX-Uv6IlTgUPP3-xtTnCs4VShZVTGP9MqnPkURsui1cJgAeCAor00DZHD0IaKO-jyxbxNs-iOp825gABDahS88Kpuflo3keu-DtOuMeGqgvOg2pptSEwUmHvRjxU4VKNEJs0az3oZY-aIv1zJnotOn0oiywVOyoaSQU93PvgLhW5LIT_4sP7ZJz51xweovKKOj_fABp1HV42fp20XYEccvWrlff4qgCgFjwm9c5Yw="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFA1cfzs1ztQLV_weOv0od-yhvCmuMC2C9AAdU_JhPcbjm3tx9XQR3PQM6tzdOZ7GTm4WGDAltFJ5hC_ulmZi3eg1JfBbafgxi-CPSAeXKJLbbwqcvFU4JVZY3Yy8wkLsN5"
    },
    {
      title: "state.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjlyJcfKb1OyZENshhoEEzc-z_v77ZUFRJAY7rCpdbA2-kNrYcPp1PoRX6SZHghH-wL5bsm-p6GFNvH0Q1tsPY8hDzLGNEpqTLIyN1mh2Jzx3BfnJLaL5Uu3-GP7oJ4mkqOtbr-ABX_br5HheGGFdyEKoqOIujJc0aVKySckSH8xxbmzQS7zWsLqIoYAZvUyfYx8oeGxEqdhyG37nTHb_iw9HhTd_TjWOxIKpZQcD0Agu7fZ1-tTKYEJc6p88_ojp9J73HYaEFts4vbcLA7kA="
    },
    {
      title: "www.gov.uk",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHdTVdP1O5BXYhgvkT-ysF8tNuYSv4pzhMQ7dkV2R1LhbZh9lABGnWcDSKBUvnXfzw-P_LdT35Up7Cjc5M8T8oQOykz1qhk6HLpC6Zb9ed3rJ_kS2N_2ptd7quhdH2KuqDhRmbob7FsTM0YTMXD0NvJY2t2NmNcW31K2kMvT_KAlX19o6xtvjLq3TXPuDy-LAyI3atMfPAY3rY5"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErun8NG758PmlgqlswQ4OL4sEgtSJRkmJe3sEuR0eHrRr_J2GgpKU0CWwlHVtg9RzkNxfHthBA7qc4JkvoGOeIGO8skSvqNHg9y4gdWXhifxv6Qjvu2vhobTGUJ4ULCMhTUbSD4ZmpF42pwRtCOY5R_1XN82ypJ--pLvai18miLwBI0NHqG86FkDZU0A=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWRXgFK3q5wSnXMxNbgQLBWSiAHfxyxOi3sTufJ8EHgr8iZmuzDgDyKeR-NagPzQlIn52bWAqOscqT8tmf8R819SVw1dwPbGWnKGK3d43TEYx0bN1GHiL3tnOHjs1JEtP2"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSDvGBrBuIriOUgdZZitTwZ8CXksek0BV4K1mo_krBeuYuDBLy-PwkvRcpWt-qAkL8YJ12XvSN7oYOj2oEsSnl5AcYb-cmBz4291ykUR0xi6BhvyFGORtr"
    },
    {
      title: "iowapublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGF2NhMJb6ZTNeofX1Suf6v5KrkW07G3V8z8H949d2veMI1mRxxYqN3Wp6PRJcpTWUhDqDHZv34xf7Q2IKAC3yoAV6F4D59zR_48DT3Hw-iQsXwA-zeRHPCSzK9ZehsB-ZBZ5fCHs-TXWi2S9gpt15oclublaes3NqlK7h8KP8gWaOX7Y5tHDF0mOi55uokx1RfUIYtIJR3Q7qJJu99Jg_Ym8pAI4GA"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices June 24 2026 forecast or real-time news April 24 2024",
    "US Iran relations military news last 24 hours June 24 2026 simulation or real April 2024",
    "Hormuz Strait shipping traffic status April 24 2024",
    "US State Department Iran statements June 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-24",
  version: "v2.105",
  riskScore: 40,
  change: "down",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D116",
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
      value: "WTI $72.74–$74.77 · Brent $76.47–$78.28",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Regulated Resumption",
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
      description: "Entered MOU ceasefire; no direct kinetic actions between US-Iran forces in the last 24h.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Transition to permit-based transit; volumes recovered to ~53% of pre-war levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Treasury's 60-day waiver and supply normalization expectations drove prices to 4-month lows.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "US Treasury issued General License X; international allies pivot to support Islamabad MOU.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "60-day negotiation window opened; communication hotlines established in Switzerland.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Treasury Issues 60-Day Oil Waiver",
      description: "General License X allows Iran to export oil and receive USD payments for 60 days.",
      verification: "confirmed",
      timestamp: "2026-06-24",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Busiest Day Since War Start",
      description: "35 commercial vessels including supertankers crossed the strait on June 23.",
      verification: "confirmed",
      timestamp: "2026-06-23",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "IAEA Reaches Nuclear Inspection Agreement",
      description: "IAEA chief Grossi claims deal reached; Tehran notes no immediate plans for return.",
      verification: "partial",
      timestamp: "2026-06-24",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Watchful Drift",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Islamabad MOU initiates a 60-day countdown for final peace terms.",
      "Partial lifting of oil sanctions in exchange for navigation and nuclear cooperation.",
      "Israeli operations in Southern Lebanon remain a flashpoint for ceasefire stability."
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
        "Continue: Direct US-Iran kinetic engagement remains at zero under MOU.",
        "Change: Israeli cabinet asserts Southern Lebanon 'security zone' ops will continue."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Transit shifted from blockade to a regulated permit-based system.",
        "Change: First VLCC convoy successfully exits the Gulf under joint guidance."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Temporary lifting of Iranian oil ban triggers heavy spot market selling.",
        "Continue: OPEC+ maintains production increase schedule, dampening premiums."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Trump emphasizes 'ending the war' and finalizes nuclear deal specifics.",
        "Change: US Senate passes resolution demanding oversight on any final agreement."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Trump's drive for a rapid exit vs. Israeli PM Netanyahu's security requirements.",
      "Iran's domestic nuclear hardliners vs. the immediate need for economic relief."
    ],
    military: [
      "Disputes over sovereignty recognition within the 'permit-based' navigation system.",
      "Risk of friction between Israeli forces and Iran-backed groups in Lebanon."
    ]
  },
  scoreTrend: [
    {
      date: "06-20",
      score: 40
    },
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
      score: 40,
      active: true
    }
  ],
  keyChange: "US Treasury's General License X marks a transition from kinetic warfare to geo-economic bargaining.",
  investmentSignal: "→ Increase risk asset exposure; maintain energy hedges.",
  prevRiskScore: 40,
  webSources: [
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgyuONsaurSVzxZ25g5x0Quz8voUWuQnbWx__-D9o83jdF55uxgGhAiP9QKiGjyP9yBFPAruugBQHtNrIh1-r6XJII6cVkBxbIDZ3awvR4y97XUcNUoKc12CVvQ0KY1sDtYDoBUGhoGlN85pkSFu4d9CS0bI0ehwU5IcioJf3e1i0i-EvM_doa3QbxyQOt2A=="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH0LuPtDaX8oWcjs6r4iwlT9D963aO5UU84lssNrnL8whuosofy5HkKaLlvHnlNMn74Jcv_OcYE9VsyCiLueDnP3TKqMXWwejlgeeCgYFTooRejPpquu14Ygbu1Gs1XoUkAbRuT_n0Yx9tbSvb2sKoasmIIDU413rZZ0bHuRHE3ErC-hggiTODdyju36A1aQgKDY-4zcg3MNdCIhqroij2Vdtq0sA=="
    },
    {
      title: "shipfinder.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGN88zNhn_UulZLUJl4cxXQ4S6xtRfT-a3yLVRYZnZBBbXg7zOW447iqAKY9C5ZJgAR_vbxR3g9YkRwy7oxqRJYVzCVAA5ere1hcXflH7wTCj7U_mbAXwwBzrpgOtZstA=="
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMnjNnW6-xh_ITZVzfWHjIfNmX-Uv6IlTgUPP3-xtTnCs4VShZVTGP9MqnPkURsui1cJgAeCAor00DZHD0IaKO-jyxbxNs-iOp825gABDahS88Kpuflo3keu-DtOuMeGqgvOg2pptSEwUmHvRjxU4VKNEJs0az3oZY-aIv1zJnotOn0oiywVOyoaSQU93PvgLhW5LIT_4sP7ZJz51xweovKKOj_fABp1HV42fp20XYEccvWrlff4qgCgFjwm9c5Yw="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFA1cfzs1ztQLV_weOv0od-yhvCmuMC2C9AAdU_JhPcbjm3tx9XQR3PQM6tzdOZ7GTm4WGDAltFJ5hC_ulmZi3eg1JfBbafgxi-CPSAeXKJLbbwqcvFU4JVZY3Yy8wkLsN5"
    },
    {
      title: "state.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjlyJcfKb1OyZENshhoEEzc-z_v77ZUFRJAY7rCpdbA2-kNrYcPp1PoRX6SZHghH-wL5bsm-p6GFNvH0Q1tsPY8hDzLGNEpqTLIyN1mh2Jzx3BfnJLaL5Uu3-GP7oJ4mkqOtbr-ABX_br5HheGGFdyEKoqOIujJc0aVKySckSH8xxbmzQS7zWsLqIoYAZvUyfYx8oeGxEqdhyG37nTHb_iw9HhTd_TjWOxIKpZQcD0Agu7fZ1-tTKYEJc6p88_ojp9J73HYaEFts4vbcLA7kA="
    },
    {
      title: "www.gov.uk",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHdTVdP1O5BXYhgvkT-ysF8tNuYSv4pzhMQ7dkV2R1LhbZh9lABGnWcDSKBUvnXfzw-P_LdT35Up7Cjc5M8T8oQOykz1qhk6HLpC6Zb9ed3rJ_kS2N_2ptd7quhdH2KuqDhRmbob7FsTM0YTMXD0NvJY2t2NmNcW31K2kMvT_KAlX19o6xtvjLq3TXPuDy-LAyI3atMfPAY3rY5"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErun8NG758PmlgqlswQ4OL4sEgtSJRkmJe3sEuR0eHrRr_J2GgpKU0CWwlHVtg9RzkNxfHthBA7qc4JkvoGOeIGO8skSvqNHg9y4gdWXhifxv6Qjvu2vhobTGUJ4ULCMhTUbSD4ZmpF42pwRtCOY5R_1XN82ypJ--pLvai18miLwBI0NHqG86FkDZU0A=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWRXgFK3q5wSnXMxNbgQLBWSiAHfxyxOi3sTufJ8EHgr8iZmuzDgDyKeR-NagPzQlIn52bWAqOscqT8tmf8R819SVw1dwPbGWnKGK3d43TEYx0bN1GHiL3tnOHjs1JEtP2"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHSDvGBrBuIriOUgdZZitTwZ8CXksek0BV4K1mo_krBeuYuDBLy-PwkvRcpWt-qAkL8YJ12XvSN7oYOj2oEsSnl5AcYb-cmBz4291ykUR0xi6BhvyFGORtr"
    },
    {
      title: "iowapublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGF2NhMJb6ZTNeofX1Suf6v5KrkW07G3V8z8H949d2veMI1mRxxYqN3Wp6PRJcpTWUhDqDHZv34xf7Q2IKAC3yoAV6F4D59zR_48DT3Hw-iQsXwA-zeRHPCSzK9ZehsB-ZBZ5fCHs-TXWi2S9gpt15oclublaes3NqlK7h8KP8gWaOX7Y5tHDF0mOi55uokx1RfUIYtIJR3Q7qJJu99Jg_Ym8pAI4GA"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices June 24 2026 forecast or real-time news April 24 2024",
    "US Iran relations military news last 24 hours June 24 2026 simulation or real April 2024",
    "Hormuz Strait shipping traffic status April 24 2024",
    "US State Department Iran statements June 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.105 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 40（持平）：美财政部签发 60 日石油豁免令，局势正式由热战对抗转向经济外交博弈期。",
    bannerWarning: "→ 增持风险资产，维持能源对冲。",
    deescalationIntent: "特朗普的快速撤出承诺与以色列内塔尼亚胡安全诉求的脱节",
    structuralRisk: "海峡进入“许可制”通行阶段，商船需获取伊朗核准码，通行量恢复至正常水平的 53.3%。",
    contradictionNote: "特朗普的快速撤出承诺与以色列内塔尼亚胡安全诉求的脱节；许可制航行下的主权识别争议",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第116天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.105 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 40 (Flat): US Treasury's General License X marks a transition from kinetic warfare to geo-economic bargaining.",
    bannerWarning: "→ Increase risk asset exposure; maintain energy hedges.",
    deescalationIntent: "Trump's drive for a rapid exit vs. Israeli PM Netanyahu's security requirements.",
    structuralRisk: "Transition to permit-based transit; volumes recovered to ~53% of pre-war levels.",
    contradictionNote: "Trump's drive for a rapid exit vs. Israeli PM Netanyahu's security requirements.; Disputes over sovereignty recognition within the 'permit-based' navigation sy…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 116",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
