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
  date: "2026-11-03",
  version: "v2.242",
  riskScore: 80,
  keyChange: "美军突袭格什姆岛防空设施打破沉寂，布伦特原油重回百元危机带，海峡高压封锁与多哈穿梭外交并存。",
  investmentSignal: "→ 维持能源与大宗商品的结构性对冲仓位，在风险资产上保持防御姿态以防范大选后升级风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D248",
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
      value: "WTI $93.60–$98.82 · Brent $100.80–$107.21",
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
      description: "美军对伊朗格什姆岛实施有限空袭，双方直接交火与防空压制处于高位战备状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡水域水雷威胁与交火封锁持续，商业油轮几乎完全无法自主安全通行。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油价格区间触及$100–120危机带，断供恐慌重现推动市场持续溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持中东海空兵力投送与战术打击，盟国多方斡旋介入但无大国正面对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "多哈穿梭外交推进两日解封方案，但双方关键诉求分歧严重且军事打击削弱互信。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军中央司令部对格什姆岛防空导弹设施实施有限突击，打破选前不打执念。",
        "延续：伊朗伊斯兰革命卫队保持全面战备警戒，称打击侵犯领空与领海目标。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO通报最新航行安全警告，伊朗称多艘擅闯油轮触雷受损。",
        "延续：海峡商业航运持续受阻，常规商业班轮基本处于停航或强制护航状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油在空袭消息后探底反弹，日内高位触及107美元上方。",
        "延续：霍尔木兹断供溢价继续支撑全球基准油价保持在百元高风险带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美方表态呈现“边打边谈”双重信号，强调行动属有限防御并不阻碍谈判。",
        "延续：伊朗外长阿拉格齐重申不接受华盛顿单边施压，坚持以解除封锁为前提。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军突袭伊朗格什姆岛防空阵地",
      description: "美军对扼守霍尔木兹海峡的格什姆岛防空及雷达设施实施有限空中打击，五角大楼称此举旨在消除对美军机的防空威胁。",
      verification: "confirmed",
      timestamp: "2026-11-03T02:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡发生油轮触雷起火事件",
      description: "伊朗革命卫队海军证实数艘油轮在海峡非授权水域航行时触雷起火，UKMTO同步发布194-26号航行警报提示极高风险。",
      verification: "confirmed",
      timestamp: "2026-11-03T04:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "卡塔尔穿梭多哈与德黑兰递交解封草案",
      description: "卡塔尔调解代表团赴德黑兰推进将七步解封计划压缩至两天的路线图，伊朗高层表示正审视方案但未放弃军事戒备。",
      verification: "confirmed",
      timestamp: "2026-11-03T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "布伦特原油反弹重回百元危机带",
      description: "受格什姆岛空袭与航道风险再起影响，国际基准油价企稳反弹，Brent上沿触及$107.21，WTI交投于$93–98区间。",
      verification: "confirmed",
      timestamp: "2026-11-03T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军突袭格什姆岛显示军事威慑层级已切入海峡战术核心节点",
      "商船触雷事件证实霍尔木兹航运物理封锁与高危状态完全未解",
      "间接外交斡旋受制于双方核心诉求鸿沟，缺乏实质突破动能"
    ],
    note: "监测用途，不构成投资建议。"
  },
  coreContradiction: {
    political: [
      "美方急于在中期选举周期遏制油价通胀，但难以在伊核与安全条款上做出实质性让步",
      "伊朗要求全面解除封锁并恢复原油出口，拒绝在单边军事打击威胁下接受限制性协议"
    ],
    military: [
      "美军战术性摧毁海峡防空阵地以确保航道侦察控制，但面临被拖入长期摩擦的风险",
      "伊朗依托非对称水雷与岸基导弹构筑封锁威慑，任何擦枪走火均极易引爆更广范围交火"
    ]
  },
  scoreTrend: [
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwftYUBa0DbPYY7j5fwBLAmPxvNxNEgLvrM11p2MU2VzilyxELT8i5scbi4V93e_MFFhyPOYBoaR_B_9rR2G98w6T4uENrv-5X8P6cYpqs_UdAMHFmkWzogTh2WaMRJ4y4uEm_CYkO6x-TO_BfkCtwd8jr_yzhTf9gE3DgTu64XbTCox2GxezrfCk6fS3J4hcWDwiU8bfePt4qZuwqeJu_78i9qPrsGfzC0LDecJo="
    },
    {
      title: "courthousenews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHj_mgaF3Rqjq4mwyCx43FWJ3PAXyeevi_vZ7y741fjESCVIQjAafUWUYGDzbXosHyjPYTcYnyXujN2Pi7_g2vIG8NSDh-S3v5Vw5VD4iT39eY23lAUjrnUCEzkh5585gq726jvB83pw3vukRaCIpjFGEyZDsXxOo6PCBg1jgJchyZze1GlUT8vP7D5XOOda_e3f3qzCLD3GkRFqI8tD2ZJsFWWpPuk"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEjKxRFB-xXg5MHZlZUFCkpg3pPWNgaMUx38IPnsFXbpVQSXTcObr6UVFnuFMQ-lktsQbwxGDWqmvai6KNUTplbRUS6SqhqClaeei2md09CThkCzy1QhqIF3sTgtZb79KXcw66Pc-bN0tzh3KBhG1Cl4pByGmqzkc70dDxp7xIur_NN3-0dWFRS8Jq8fJ9PsO8p_70MuI9LUUCdhp8BLbUKZY3RXM5Eo5Egv7chwH4gg=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGorW5fMh_INByPY6qZxnGmnepILoUQLEPCVyfMnmbvkybQm6XRSV57ZysmbkskVkDLz_RMl2SRvDtm5xEmwKwzpab0v6kE_4Jt3MPb82ad4gWaXCNihAPJaHj0lqEml0-JFOlCPR9IrEH8FGjJOOoi"
    },
    {
      title: "oxfordeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEXMT1P6E7R1VUzBSi88AeQpfYL07hmvAi8rL_OseWdiZ7ERm7sgBh9nfnHVOhBNapzFNVHT02SPNAlDYRtmKGe2FCNwhURrTsG0KxI_zZEtRZBOk4Nfplo1QjdsQJN1klk9hlHxqd9fQP-Zc7hb3Yosc2LpqYRaGJfbyNv8b0iLJE9HIrO0znm86p2IobaOkHqPGomjwso8LVyl-U_njfG"
    },
    {
      title: "energynow.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-mWqi3mUQh7F99mbvyktAqreZQPMaNeHAX0zwunYo-oi4i6JKWGdVjeX0kPKd9Mls3mfWqdvJ5Ny5glhumhsi-BI9f70hMZCYhzPro-xExOljuSNfNkYWYIg42tl_VWOOHhZK7JbyTqtGdfwfx7q8IBa3sgLTfAIslSXJZdOXurPPyiRWg_aEcycKb4HnO47cZADGCGhIYP6RHrUJiP_ihg2xk-tS2Y7JrM0K7dGvZzQqQP3MsbWhs2V96SHzcGz-bJpNg__TlFNYXuKlucxCu9RKxmqUqUnXz-o="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAqjjno-6SwU_CdzkPLBRGSWcoWWmpFY7Q0iWaQNmIfTfsoCUbsWKJ1l0ur3_ITqzrsvd8d6JlAmpBvUXngwYyCBHjp27pgWUFV2kMw4RJqr4tGtkLlhnUKwDqBliZAVm5PZlGTDZTkl6Cp12CKXaaRmI8fAlXrnX6KFFu_w130dV3bQ=="
    },
    {
      title: "cbs8.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA0qKIK07M2Om36v8A7rYE-7B1FYexqMJXVinfWWOK-h6fKFejJ9Cshqb288gfTEYzXxmHhQZK5YbZ7pofnaNbMw8fLrm11jBXrZ4hGaW1hoK3iY3bK0CtRa629Y1UlZRSRY-u0XcexWzhHf_LJUBN_DzcvhF9L-Ie4q5nuQD3KXkkzBOZ1QaQRgeIX9Q7AXkH6Bos_LlwdUl8eK2FMRRDTi9_l_tshnrKL_96liEWgVc4e52JiuOgLXDgvCerFN1keTbN9N8UynSETKDDTrpZoQ=="
    },
    {
      title: "ttnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG9Pq6kYEkJOzeUDCxbeAhe4gSaarBW_cW1l8PEzD_yRxMefnJn-3KcJWdyB-y6Wj0NLZKciWkwUBGsjXrYaSJcIP6P4Uje1F6StCpiVRf8_VhkjkKpZuTZWY8GRMSw8q0vKFnH9GhGimxF1uOG1b0GhiQ="
    },
    {
      title: "csis.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE74vNk5bTeneSi-UlMAIQQ2Rk9cFXQVgIXj3acrStCl45nOk942FoNwRK770qouQ4P4VwRTqvvJMdJDfd6Vdq3P7JwlW3bk8_sqYGV6-Q4swjjPnunVzYhnZSIuITAsDAEu6r5dlMTIfd2h9gHjT0yBdzbFyo="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7haEeu6Yfldht-U0eHaIplkU5llmgtMeAVmBawLc4i8jltVQVnRqmS48fmXfOf31dg8p_y9E32ZokSMQF5R8klAzgdWqkWjIa5d9TMgneit1UKoE7Fk8vSSPDpXbe"
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_Tf-sDfk7e5yWIUNYJ5rbrs_b4Gb5BspWaizqYfsiaPkkn64WbeazrUNOiRlNKOWLAcp41OVA-e4hrth5cKWtdLyQDpLs25u3Rz2Em-du84dhHagY34Cy7JYexiYJgJ49AKIctHtRiyRufcrW_4ShPedcmDnXiruXng8f7BfnvmJBBU0yeLfAJr0gSRcdVLfcB3XykcSM0nRPSZ4oJl5T4NDWLcuDfTVupjBZEZU="
    }
  ],
  webSearchQueries: [
    "iran strait of hormuz shipping oil tankers november 2026",
    "iran us military tension middle east november 2026",
    "us iran conflict negotiations sanctions november 2026",
    "crude oil prices brent wti middle east supply geopolitics"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-11-03",
  version: "v2.242",
  riskScore: 80,
  keyChange: "US strikes on Qeshm Island break relative calm as Brent rebounds into the $100+ crisis zone, with Hormuz blockade remaining critical.",
  investmentSignal: "→ Maintain structural long hedges in energy and commodities while keeping high defensive allocations in risk assets against post-midterm escalation risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D248",
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
      value: "WTI $93.60–$98.82 · Brent $100.80–$107.21",
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
      description: "US forces launched limited strikes on Qeshm Island, maintaining active kinetic engagement along key choke points.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Naval mine threats and active interdictions maintain a near-complete shutdown of commercial maritime traffic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Crude prices hover in the $100–120 crisis zone as strike-driven supply disruption fears counter previous optimism.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Direct US military deployments and strikes continue alongside intense regional diplomatic mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Qatari shuttle diplomacy explores a compressed timetable, but profound mistrust and fresh strikes impede a real breakthrough.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US Central Command executed defensive strikes against air defense sites on Iran's Qeshm Island.",
        "Continue: IRGC forces maintain high readiness and threaten immediate retaliation against further airspace incursions."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO issued incident warning 194-26 following reported mine explosions affecting commercial vessels.",
        "Continue: Commercial shipping traffic remains largely halted with unescorted transits exposed to extreme hazards."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude reversed Monday's drop and recovered to above $103/bbl following news of the Qeshm Island strikes.",
        "Continue: Sustained risk premium persists as long as the Strait of Hormuz remains physically contested."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Washington signaled military firmness with surgical strikes while professing ongoing openness to a negotiated settlement.",
        "Continue: Tehran stated it is reviewing Qatari proposals but will not yield to military pressure or abandon nuclear prerogatives."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Launches Strikes on Iranian Air Defenses on Qeshm Island",
      description: "US forces executed precision strikes against Iranian surface-to-air missile facilities on Qeshm Island in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-11-03T02:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Tankers Catch Fire in Hormuz Mine Incidents; UKMTO Issues Alert",
      description: "IRGC Navy stated tankers caught fire after striking naval mines in unauthorized transit lanes; UKMTO issued advisory 194-26.",
      verification: "confirmed",
      timestamp: "2026-11-03T04:30:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Qatari Mediators Travel to Tehran with Accelerated Reopening Draft",
      description: "Qatari officials delivered a revised proposal aiming to compress the Hormuz reopening and sanctions relief process into two days.",
      verification: "confirmed",
      timestamp: "2026-11-03T06:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Rebound Back into Crisis Band on Escalation Fears",
      description: "Brent crude rebounded into the $100.80–$107.21 range and WTI traded at $93.60–$98.82 as geopolitical supply concerns resurfaced.",
      verification: "confirmed",
      timestamp: "2026-11-03T12:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Targeting Qeshm Island demonstrates US resolve to degrade Iranian chokepoint interdiction assets",
      "Maritime mine hazards continue to prevent the resumption of normal commercial tanker traffic",
      "Diplomatic tracks remain alive through Doha mediation but face massive distrust following kinetic action"
    ],
    note: "For monitoring only; not investment advice."
  },
  coreContradiction: {
    political: [
      "The US administration seeks lower domestic fuel costs but cannot offer unconditioned sanctions relief",
      "Iran demands an end to the naval blockade and oil export waivers before entering substantive nuclear talks"
    ],
    military: [
      "US precision strikes aim to deter anti-access systems without triggering full-scale theater war",
      "Iran leverages asymmetric naval warfare and mine belts in the Strait of Hormuz to sustain strategic leverage"
    ]
  },
  scoreTrend: [
    {
      date: "10-30",
      score: 82
    },
    {
      date: "10-31",
      score: 80
    },
    {
      date: "11-01",
      score: 80
    },
    {
      date: "11-02",
      score: 80
    },
    {
      date: "11-03",
      score: 80,
      active: true
    }
  ],
  prevRiskScore: 80,
  webSources: [
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwftYUBa0DbPYY7j5fwBLAmPxvNxNEgLvrM11p2MU2VzilyxELT8i5scbi4V93e_MFFhyPOYBoaR_B_9rR2G98w6T4uENrv-5X8P6cYpqs_UdAMHFmkWzogTh2WaMRJ4y4uEm_CYkO6x-TO_BfkCtwd8jr_yzhTf9gE3DgTu64XbTCox2GxezrfCk6fS3J4hcWDwiU8bfePt4qZuwqeJu_78i9qPrsGfzC0LDecJo="
    },
    {
      title: "courthousenews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHj_mgaF3Rqjq4mwyCx43FWJ3PAXyeevi_vZ7y741fjESCVIQjAafUWUYGDzbXosHyjPYTcYnyXujN2Pi7_g2vIG8NSDh-S3v5Vw5VD4iT39eY23lAUjrnUCEzkh5585gq726jvB83pw3vukRaCIpjFGEyZDsXxOo6PCBg1jgJchyZze1GlUT8vP7D5XOOda_e3f3qzCLD3GkRFqI8tD2ZJsFWWpPuk"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEjKxRFB-xXg5MHZlZUFCkpg3pPWNgaMUx38IPnsFXbpVQSXTcObr6UVFnuFMQ-lktsQbwxGDWqmvai6KNUTplbRUS6SqhqClaeei2md09CThkCzy1QhqIF3sTgtZb79KXcw66Pc-bN0tzh3KBhG1Cl4pByGmqzkc70dDxp7xIur_NN3-0dWFRS8Jq8fJ9PsO8p_70MuI9LUUCdhp8BLbUKZY3RXM5Eo5Egv7chwH4gg=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGorW5fMh_INByPY6qZxnGmnepILoUQLEPCVyfMnmbvkybQm6XRSV57ZysmbkskVkDLz_RMl2SRvDtm5xEmwKwzpab0v6kE_4Jt3MPb82ad4gWaXCNihAPJaHj0lqEml0-JFOlCPR9IrEH8FGjJOOoi"
    },
    {
      title: "oxfordeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEXMT1P6E7R1VUzBSi88AeQpfYL07hmvAi8rL_OseWdiZ7ERm7sgBh9nfnHVOhBNapzFNVHT02SPNAlDYRtmKGe2FCNwhURrTsG0KxI_zZEtRZBOk4Nfplo1QjdsQJN1klk9hlHxqd9fQP-Zc7hb3Yosc2LpqYRaGJfbyNv8b0iLJE9HIrO0znm86p2IobaOkHqPGomjwso8LVyl-U_njfG"
    },
    {
      title: "energynow.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-mWqi3mUQh7F99mbvyktAqreZQPMaNeHAX0zwunYo-oi4i6JKWGdVjeX0kPKd9Mls3mfWqdvJ5Ny5glhumhsi-BI9f70hMZCYhzPro-xExOljuSNfNkYWYIg42tl_VWOOHhZK7JbyTqtGdfwfx7q8IBa3sgLTfAIslSXJZdOXurPPyiRWg_aEcycKb4HnO47cZADGCGhIYP6RHrUJiP_ihg2xk-tS2Y7JrM0K7dGvZzQqQP3MsbWhs2V96SHzcGz-bJpNg__TlFNYXuKlucxCu9RKxmqUqUnXz-o="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAqjjno-6SwU_CdzkPLBRGSWcoWWmpFY7Q0iWaQNmIfTfsoCUbsWKJ1l0ur3_ITqzrsvd8d6JlAmpBvUXngwYyCBHjp27pgWUFV2kMw4RJqr4tGtkLlhnUKwDqBliZAVm5PZlGTDZTkl6Cp12CKXaaRmI8fAlXrnX6KFFu_w130dV3bQ=="
    },
    {
      title: "cbs8.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA0qKIK07M2Om36v8A7rYE-7B1FYexqMJXVinfWWOK-h6fKFejJ9Cshqb288gfTEYzXxmHhQZK5YbZ7pofnaNbMw8fLrm11jBXrZ4hGaW1hoK3iY3bK0CtRa629Y1UlZRSRY-u0XcexWzhHf_LJUBN_DzcvhF9L-Ie4q5nuQD3KXkkzBOZ1QaQRgeIX9Q7AXkH6Bos_LlwdUl8eK2FMRRDTi9_l_tshnrKL_96liEWgVc4e52JiuOgLXDgvCerFN1keTbN9N8UynSETKDDTrpZoQ=="
    },
    {
      title: "ttnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG9Pq6kYEkJOzeUDCxbeAhe4gSaarBW_cW1l8PEzD_yRxMefnJn-3KcJWdyB-y6Wj0NLZKciWkwUBGsjXrYaSJcIP6P4Uje1F6StCpiVRf8_VhkjkKpZuTZWY8GRMSw8q0vKFnH9GhGimxF1uOG1b0GhiQ="
    },
    {
      title: "csis.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE74vNk5bTeneSi-UlMAIQQ2Rk9cFXQVgIXj3acrStCl45nOk942FoNwRK770qouQ4P4VwRTqvvJMdJDfd6Vdq3P7JwlW3bk8_sqYGV6-Q4swjjPnunVzYhnZSIuITAsDAEu6r5dlMTIfd2h9gHjT0yBdzbFyo="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7haEeu6Yfldht-U0eHaIplkU5llmgtMeAVmBawLc4i8jltVQVnRqmS48fmXfOf31dg8p_y9E32ZokSMQF5R8klAzgdWqkWjIa5d9TMgneit1UKoE7Fk8vSSPDpXbe"
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_Tf-sDfk7e5yWIUNYJ5rbrs_b4Gb5BspWaizqYfsiaPkkn64WbeazrUNOiRlNKOWLAcp41OVA-e4hrth5cKWtdLyQDpLs25u3Rz2Em-du84dhHagY34Cy7JYexiYJgJ49AKIctHtRiyRufcrW_4ShPedcmDnXiruXng8f7BfnvmJBBU0yeLfAJr0gSRcdVLfcB3XykcSM0nRPSZ4oJl5T4NDWLcuDfTVupjBZEZU="
    }
  ],
  webSearchQueries: [
    "iran strait of hormuz shipping oil tankers november 2026",
    "iran us military tension middle east november 2026",
    "us iran conflict negotiations sanctions november 2026",
    "crude oil prices brent wti middle east supply geopolitics"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.242 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美军突袭格什姆岛防空设施打破沉寂，布伦特原油重回百元危机带，海峡高压封锁与多哈穿梭外交并存。",
    bannerWarning: "→ 维持能源与大宗商品的结构性对冲仓位，在风险资产上保持防御姿态以防范大选后升级风险。",
    deescalationIntent: "美方急于在中期选举周期遏制油价通胀，但难以在伊核与安全条款上做出实质性让步",
    structuralRisk: "海峡水域水雷威胁与交火封锁持续，商业油轮几乎完全无法自主安全通行。",
    contradictionNote: "美方急于在中期选举周期遏制油价通胀，但难以在伊核与安全条款上做出实质性让步；美军战术性摧毁海峡防空阵地以确保航道侦察控制，但面临被拖入长期摩擦的风险",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第248天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.242 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): US strikes on Qeshm Island break relative calm as Brent rebounds into the $100+ crisis zone, with Hormuz blockade remaining critical.",
    bannerWarning: "→ Maintain structural long hedges in energy and commodities while keeping high defensive allocations in risk assets aga…",
    deescalationIntent: "The US administration seeks lower domestic fuel costs but cannot offer uncondit…",
    structuralRisk: "Naval mine threats and active interdictions maintain a near-complete shutdown of commercial maritim…",
    contradictionNote: "The US administration seeks lower domestic fuel costs but cannot offer unconditioned sanctions relief; US precision strikes aim to deter anti-access systems wi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 248",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
