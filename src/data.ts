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
  date: "2026-09-11",
  version: "v2.185",
  keyStats: [
    {
      label: "冲突天数",
      value: "D195",
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
      value: "WTI ~$99 · Brent ~$103–$108",
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
  riskScore: 88,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊之间持续进行直接的军事打击，同时，伊朗支持的胡塞武装在也门取得重大进展，开始直接威胁曼德海峡，标志着冲突地域范围的扩大和复杂化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡的商业航运流量持续处于极低水平。根据路透社援引的Kpler数据，每日通过船只数量仅为个位数，远低于冲突前每日超过80艘的正常水平，表明航道已处于严重受限状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "国际油价维持在高位，布伦特原油在103-108美元/桶的区间内交易，符合 rubric 4 的危机区间。国际能源署（IEA）下调了全球供需预测，并警告由于冲突导致库存大幅下降，供应短缺正在加剧。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国在该地区的军事介入程度依然很高且在加深。据报道，五角大楼计划将部分部队的部署延长至2027年，并维持包括两个航母战斗群在内的大规模军事存在，以应对与伊朗的长期对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "完全没有降级的迹象。双方都在为长期冲突做准备：美国延长军事部署并实施新制裁，而伊朗则被报道恢复了其地下导弹生产。外交渠道完全关闭，双方立场强硬。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-7771",
      title: "伊朗代理人胡塞武装夺取红海沿岸关键港口，威胁曼德海峡",
      description: "据多家国际通讯社援引也门政府消息人士的话报道，伊朗支持的胡塞武装在也门发起闪电攻势，已夺取红海沿岸的穆哈港（Mocha），并向具有全球航运重要意义的曼德海峡推进，部分部队已登陆海峡内的丕林岛。此举为美伊冲突开辟了一个新的海上对抗前线。",
      verification: "confirmed",
      timestamp: "2026-09-11T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-7772",
      title: "报道称伊朗在美国空袭后已恢复地下弹道导弹生产",
      description: "《华尔街日报》援引美国及中东情报官员消息称，尽管早前的美以空袭旨在削弱其军事工业，但伊朗已在多个地下设施中利用库存部件恢复了弹道导弹的组装。此举表明德黑兰致力于在长期冲突中重建其武库。",
      verification: "confirmed",
      timestamp: "2026-09-10T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-7773",
      title: "五角大楼延长美军在中东的部署至2027年，为长期对抗做准备",
      description: "据《华尔街日报》报道，五角大楼已下令延长部分美军部队在中东的部署，可能持续到2027年，并计划在秋季轮换部署一支新的海军陆战队远征部队（MEU）。这表明华盛顿的战略规划正转向与伊朗进行一场旷日持久的对抗。",
      verification: "confirmed",
      timestamp: "2026-09-10T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-7774",
      title: "国际能源署（IEA）下调全球石油供需预测，警告供应短缺加剧",
      description: "国际能源署（IEA）周五发布的报告指出，由于美伊谈判停滞和航道袭击再起，该机构已下调2026年全球石油供应和需求预测。报告警告称，全球石油库存8月份减少了9500万桶，市场正滑向比此前预期更严重的短缺。",
      verification: "confirmed",
      timestamp: "2026-09-11T09:00:00Z",
      significance: ""
    },
    {
      id: "evt-7775",
      title: "霍尔木兹海峡通行量持续处于极低水平",
      description: "据路透社及Kpler的航运数据显示，9月10日通过霍尔木兹海峡的商船数量仅为6-7艘，远低于约15艘的10日平均水平和冲突前超过80艘的正常水平。数据显示商业航运实际上已基本中断。",
      verification: "confirmed",
      timestamp: "2026-09-11T04:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗代理人扩大冲突范围，美军准备长期对抗，局势固化在高烈度阶段。",
      "曼德海峡成为新燃点，冲突从霍尔木兹海峡扩大至另一关键海上咽喉。",
      "冲突正从单一战区向多战区蔓延，外交解决窗口完全关闭，系统性风险持续攀升。"
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
        "延续：美伊双方维持直接军事对抗态势，包括对军事目标和相关船只的打击。",
        "变化：伊朗支持的胡塞武装在也门沿海取得重大进展，夺取了对曼德海峡具有战略意义的地点，开辟了第二海上战线。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡的商业航运流量依然极低，接近于完全停滞，对全球供应链构成持续威胁。",
        "变化：随着胡塞武装的推进，曼德海峡的航运风险急剧上升，使全球两大能源咽喉同时面临直接军事威胁。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油价格稳定在100美元/桶以上，市场对中东供应中断的担忧持续。",
        "变化：国际能源署（IEA）的最新报告证实了供应短缺的恶化，加剧了市场的看涨情绪。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美伊双方均无意寻求外交解决方案，言辞强硬。",
        "变化：美国延长军队部署至2027年的决定，以及伊朗恢复导弹生产的报道，都表明双方的战略重心是为一场长期冲突做准备，而非寻求降级。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国旨在通过军事打击和经济封锁彻底削弱伊朗的地区影响力及其核能力，而伊朗则试图通过直接及代理人行动打破封锁、将美国逐出该地区并重塑地区秩序。"
    ],
    military: [
      "美国利用其海空优势对伊朗本土及海上目标进行精确打击和封锁，而伊朗则通过弹道导弹、无人机以及在霍尔木兹和曼德海峡等关键咽喉地带的非对称/代理人战争来对抗和反制。"
    ]
  },
  scoreTrend: [
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88,
      active: true
    }
  ],
  keyChange: "局势在高风险水平上保持稳定，但冲突的地理范围正在扩大。最显著的变化是伊朗代理人胡塞武装在也门的推进，使曼德海峡成为继霍尔木兹海峡之后的又一个高风险航运咽喉，加剧了全球能源和供应链的系统性风险。",
  investmentSignal: "→ 维持最高防御姿态，冲突烈度与能源中断风险未见顶，风险资产敞口最小化。",
  prevRiskScore: 88,
  webSources: [
    {
      title: "justsecurity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWdo15VqKhBZ4RuTIgoJTKaGClJ_qEo7I_8I76HDIcuWZ4ctzcmWNqZhXg6vbYFoo91GgkC5bEz_TyCcke2qG8N-UPDqwjl31ZvMAAW7tmJ59hCDxaAdiuPMQMzzh_76SlMb2Vaf6-8vwAYOnQkFoQCcRgBeAwyqncN7FTr954"
    },
    {
      title: "fdd.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGn7BBe5jE7C0rBkRaSbnCOG9xSkyoEMFXgakhhh0RymdtHh9QhPd1K2icWLS89vPmmfAO8Xxi9ZsSzETb4Ntvbon1xXwxuU9701T98nwz28irGQ7VELMb5dlbK09SAbn79ixSu_VwH__wsn5GQouyjw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdakNS2IzK43OU01709qA8NEAXaUZKak44b_uzSJvVAqixeOGMjgN5cXjO1y1JoU1qaGjk2bhby1EoxnZV8CLxCRrXDScE_GNDDicSlYvJaEdAE6_lTkQvXblQXRz5y5isDHE="
    },
    {
      title: "united24media.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE6yK1rgz9jUoTODxTdeSvV2a6uXortQGOr1H5ZZKkLWJXSxPXOc1BgK5P5b9Lfc1C1F1Qu1uRXdbOWKxcqjilpUYpIEDTLyKAJnpVPUo1e5EZKnMXkHzcnLXW9U9zVq7ZVuKBLwsMsORmppYeZsWAuw-ecUf7PnX_32YgtLMzFLbWA7-6GP4usu6yD_lsILEJHzSkncMt2A0g6BfJhaudHS2YCyLB6G9ToEM0bI26aaO3pfo3JTfZMqvhEbJAglTUVwqQV"
    },
    {
      title: "caliber.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGE6b09YXn9Ue7xftShrLtUStQ-ytHSK1uSxvn9ZJT8H6WiiWkMraDMrbsM7ZR_4h1oaxuE-gV8dJu3XXaCVQtcossKJLtEdsGRk3pcsB9VDEKvc0XOLfNLya0MI9t0wwE21VL1_OTsRwr8-IoZ8HJlw-qoIcQLJHpkgRHKmFnGqQGkr5I4HBVtcVbS_j_aRTpu3Fs43o4J"
    },
    {
      title: "dawn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGpshfDHV1pnl0hz3bTG9NVFjvm8O2yuO7tm-MC0G6SwBd6xUlohg6wfKjK61LBF-xR0EYic8CSUhaV_X2nyNao6_NZsCU_-8HreJ1V1UXe4lh5Pt2bFaAzX7AmRg=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA6cJH0L4ZKwsw6FdDaEwUC_vOjpwxe_j2wHG4gU0ZRZiSDDzpPWVkLeiKMoJdAtf-kDAiLoVWwi7ma9KrSTcNmvtSmmqy9L8FovTzXbpmr8Cbhi9FKtHh0sYmn_0kXln0W0ZxygUNVTjOWXy52i7crE-bKeU="
    },
    {
      title: "qz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNZ3F-gXbOpCRHwms06y771MMwZNpJovyYzJ_8HtSRyMu4WAT8nGiwpfYZQx1rYPIWBm-RypUdGuQTsh36jVDzeBBy5d99GuaURB4z7he0mRyWPlyaxK3js_gcnDCirM30J23X5kqww6-n7mdll6IOxUt06C9I9JTA"
    },
    {
      title: "news.cn",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFm3-0OfmUAZA358KJ8EMgLkY6IALAoph1Kytg09jMzFHan1q-t4pC-GXmtIeGwKNZbtOrvfJRQNHkvuVt2x-VnP5__Rmq3sH5a6zsIc-JvLM-mhGOWHIRLveIXprYzFlhX2ZT49Xa7p_Gva22zdl9Y5eN2P7_OchDJutod-8Thff0QmQ=="
    },
    {
      title: "caliber.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF4Ha9A1UB6EvtxbtokzPeUi0iJoQQbMn6xsOY81vzd9xBcHT_2pwhGRL_7tQMwBOijWDVf-CtutDbMGinFDrIzGBGN0x398r5lnpoD73uXmsAZAY-gR2cZ7IB0HOZCIThV50qGP5IJgzr_8o9zXE14Erv55PIpalEpXx34KTaxRofezuuANYFhRYC3ts1-zvO_UBw2XIr1otbraNYzVx_70c8="
    },
    {
      title: "thedailystar.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8fIrhSguSNarAS4npviAMjapbtN1QjGZRE8NO84VKIcau13ZYVbZbxHEXUETxQLsMM-F4pqroitEdwWwCltV9dbIxYDQxsK3kaCKSHQGXiJwNW2DaZGx7uVljrScKYTtzx5gKZGL8XoGnrhVJH6cdIeY10TyECkR_zLOqEufToJjPG0NE3GFbXkvkHKQFRD6kSKrMI2ipWj9TAwYWOCPbpjvwchtx3Somh3HM9a9Gi-oQ"
    }
  ],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "CENTCOM Iran statement September 11 2026",
    "Iran military activity September 11 2026",
    "Strait of Hormuz shipping status September 2026",
    "US military deployment Middle East September 2026",
    "WTI Brent oil price trend September 11 2026 Reuters Bloomberg",
    "oil price forecast amid Middle East tensions September 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-09-11",
  version: "v2.185",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D195",
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
      value: "WTI ~$99 · Brent ~$103–$108",
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
  riskScore: 88,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct military strikes between the U.S. and Iran continue, while Iran-backed Houthis have made significant gains in Yemen, directly threatening the Bab el-Mandeb Strait, thus expanding and complicating the conflict's geography.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels. According to Reuters citing Kpler data, daily transits are in the single digits, far below the pre-conflict normal of over 80 per day, indicating the waterway is severely restricted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "International oil prices remain elevated, with Brent crude trading in the $103-108/barrel range, consistent with the crisis band for Rubric 4. The International Energy Agency (IEA) has revised down its global supply and demand forecasts, warning of a deepening supply shortfall due to plummeting inventories caused by the conflict.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "The level of U.S. military involvement in the region remains high and is deepening. The Pentagon has reportedly planned to extend the deployment of some forces until 2027 and is maintaining a large-scale military presence, including two aircraft carrier strike groups, to manage a long-term confrontation with Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "There are absolutely no signs of de-escalation. Both sides are preparing for a long-term conflict: the U.S. is extending military deployments and imposing new sanctions, while Iran is reportedly resuming its underground missile production. Diplomatic channels are completely closed, and stances are hardening.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "evt-7771",
      title: "Iranian proxy Houthis capture key Red Sea port, threatening Bab el-Mandeb Strait",
      description: "Citing Yemeni government sources, multiple international news agencies reported that Iran-backed Houthi forces launched a lightning offensive in Yemen, capturing the Red Sea port of Mocha and advancing towards the globally vital Bab el-Mandeb Strait, with some forces landing on Perim Island. This move opens a new maritime confrontation front in the U.S.-Iran conflict.",
      verification: "confirmed",
      timestamp: "2026-09-11T12:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "evt-7772",
      title: "Iran reportedly resumes underground ballistic missile production after U.S. strikes",
      description: "The Wall Street Journal, citing U.S. and Middle Eastern intelligence officials, reported that Iran has resumed assembling ballistic missiles from stockpiled components in several underground facilities, despite earlier U.S.-Israeli airstrikes aimed at crippling its military industry. The move indicates Tehran's commitment to rebuilding its arsenal for a long-term conflict.",
      verification: "confirmed",
      timestamp: "2026-09-10T22:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "evt-7773",
      title: "Pentagon extends U.S. troop deployments in Middle East to 2027, preparing for long-term confrontation",
      description: "According to The Wall Street Journal, the Pentagon has ordered extensions for some U.S. troop deployments in the Middle East, potentially through 2027, and plans to rotate in a new Marine Expeditionary Unit (MEU) in the fall. This indicates Washington's strategic planning is shifting towards a prolonged confrontation with Iran.",
      verification: "confirmed",
      timestamp: "2026-09-10T18:00:00Z",
      significance: ""
    },
    {
      id: "evt-7774",
      title: "IEA cuts global oil supply and demand forecasts, warns of worsening shortage",
      description: "A report released by the International Energy Agency (IEA) on Friday stated that due to stalled U.S.-Iran talks and renewed attacks on shipping lanes, the agency has cut its 2026 global oil supply and demand forecasts. The report warned that global oil inventories fell by 95 million barrels in August, and the market is slipping into a more severe shortage than previously expected.",
      verification: "confirmed",
      timestamp: "2026-09-11T09:00:00Z",
      significance: ""
    },
    {
      id: "evt-7775",
      title: "Strait of Hormuz transit volume remains at critically low levels",
      description: "According to shipping data from Reuters and Kpler, the number of commercial vessels transiting the Strait of Hormuz on September 10 was only 6-7, far below the 10-day average of about 15 and the pre-conflict normal of over 80. The data shows that commercial shipping has effectively been halted.",
      verification: "confirmed",
      timestamp: "2026-09-11T04:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iranian proxies are expanding the conflict's scope while the U.S. military prepares for a long-term confrontation, entrenching the situation in a high-intensity phase.",
      "The Bab el-Mandeb Strait has become a new flashpoint, expanding the conflict from the Strait of Hormuz to another critical maritime chokepoint.",
      "The conflict is spreading from a single theater to multiple theaters, the window for a diplomatic solution is completely closed, and systemic risks continue to climb."
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
        "Continue: The U.S. and Iran maintain a posture of direct military confrontation, including strikes on military targets and associated vessels.",
        "Change: Iran-backed Houthi forces have made significant advances along the Yemeni coast, seizing locations strategic to the Bab el-Mandeb Strait and opening a …"
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping traffic through the Strait of Hormuz remains extremely low, verging on a complete standstill, posing a sustained threat to global…",
        "Change: With the Houthi advance, shipping risks in the Bab el-Mandeb Strait have risen sharply, placing two of the world's major energy chokepoints under direc…"
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude prices are holding firm above $100/barrel, with market concerns over Middle East supply disruptions persisting.",
        "Change: The latest report from the IEA confirms a worsening supply shortage, amplifying bullish sentiment in the market."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Neither the U.S. nor Iran shows any intention of seeking a diplomatic solution, with rhetoric remaining harsh.",
        "Change: The U.S. decision to extend troop deployments to 2027 and reports of Iran resuming missile production both indicate that the strategic focus of both si…"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The U.S. aims to completely cripple Iran's regional influence and nuclear capabilities through military strikes and economic blockade, while Iran seeks to break the blockade through direct and proxy actions, expel the U.S. from the region, and reshape the regional order."
    ],
    military: [
      "The U.S. is leveraging its air and sea superiority to conduct precision strikes and a blockade against Iranian domestic and maritime targets, while Iran counters with ballistic missiles, drones, and asymmetric/proxy warfare in key chokepoints like the Straits of Hormuz and Bab el-Mandeb."
    ]
  },
  scoreTrend: [
    {
      date: "09-07",
      score: 70
    },
    {
      date: "09-08",
      score: 82
    },
    {
      date: "09-09",
      score: 84
    },
    {
      date: "09-10",
      score: 88
    },
    {
      date: "09-11",
      score: 88,
      active: true
    }
  ],
  keyChange: "The situation remains stable at a high-risk level, but the geographical scope of the conflict is expanding. The most significant change is the advance of Iranian-backed Houthi forces in Yemen, turning the Bab el-Mandeb Strait into another high-risk shipping chokepoint after Hormuz, exacerbating systemic risks to global energy and supply chains.",
  investmentSignal: "→ Maintain maximum defensive posture; conflict intensity and energy disruption risks have not peaked; minimize risk asset exposure.",
  prevRiskScore: 88,
  webSources: [
    {
      title: "justsecurity.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEWdo15VqKhBZ4RuTIgoJTKaGClJ_qEo7I_8I76HDIcuWZ4ctzcmWNqZhXg6vbYFoo91GgkC5bEz_TyCcke2qG8N-UPDqwjl31ZvMAAW7tmJ59hCDxaAdiuPMQMzzh_76SlMb2Vaf6-8vwAYOnQkFoQCcRgBeAwyqncN7FTr954"
    },
    {
      title: "fdd.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGn7BBe5jE7C0rBkRaSbnCOG9xSkyoEMFXgakhhh0RymdtHh9QhPd1K2icWLS89vPmmfAO8Xxi9ZsSzETb4Ntvbon1xXwxuU9701T98nwz28irGQ7VELMb5dlbK09SAbn79ixSu_VwH__wsn5GQouyjw=="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdakNS2IzK43OU01709qA8NEAXaUZKak44b_uzSJvVAqixeOGMjgN5cXjO1y1JoU1qaGjk2bhby1EoxnZV8CLxCRrXDScE_GNDDicSlYvJaEdAE6_lTkQvXblQXRz5y5isDHE="
    },
    {
      title: "united24media.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE6yK1rgz9jUoTODxTdeSvV2a6uXortQGOr1H5ZZKkLWJXSxPXOc1BgK5P5b9Lfc1C1F1Qu1uRXdbOWKxcqjilpUYpIEDTLyKAJnpVPUo1e5EZKnMXkHzcnLXW9U9zVq7ZVuKBLwsMsORmppYeZsWAuw-ecUf7PnX_32YgtLMzFLbWA7-6GP4usu6yD_lsILEJHzSkncMt2A0g6BfJhaudHS2YCyLB6G9ToEM0bI26aaO3pfo3JTfZMqvhEbJAglTUVwqQV"
    },
    {
      title: "caliber.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGE6b09YXn9Ue7xftShrLtUStQ-ytHSK1uSxvn9ZJT8H6WiiWkMraDMrbsM7ZR_4h1oaxuE-gV8dJu3XXaCVQtcossKJLtEdsGRk3pcsB9VDEKvc0XOLfNLya0MI9t0wwE21VL1_OTsRwr8-IoZ8HJlw-qoIcQLJHpkgRHKmFnGqQGkr5I4HBVtcVbS_j_aRTpu3Fs43o4J"
    },
    {
      title: "dawn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGpshfDHV1pnl0hz3bTG9NVFjvm8O2yuO7tm-MC0G6SwBd6xUlohg6wfKjK61LBF-xR0EYic8CSUhaV_X2nyNao6_NZsCU_-8HreJ1V1UXe4lh5Pt2bFaAzX7AmRg=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA6cJH0L4ZKwsw6FdDaEwUC_vOjpwxe_j2wHG4gU0ZRZiSDDzpPWVkLeiKMoJdAtf-kDAiLoVWwi7ma9KrSTcNmvtSmmqy9L8FovTzXbpmr8Cbhi9FKtHh0sYmn_0kXln0W0ZxygUNVTjOWXy52i7crE-bKeU="
    },
    {
      title: "qz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNZ3F-gXbOpCRHwms06y771MMwZNpJovyYzJ_8HtSRyMu4WAT8nGiwpfYZQx1rYPIWBm-RypUdGuQTsh36jVDzeBBy5d99GuaURB4z7he0mRyWPlyaxK3js_gcnDCirM30J23X5kqww6-n7mdll6IOxUt06C9I9JTA"
    },
    {
      title: "news.cn",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFm3-0OfmUAZA358KJ8EMgLkY6IALAoph1Kytg09jMzFHan1q-t4pC-GXmtIeGwKNZbtOrvfJRQNHkvuVt2x-VnP5__Rmq3sH5a6zsIc-JvLM-mhGOWHIRLveIXprYzFlhX2ZT49Xa7p_Gva22zdl9Y5eN2P7_OchDJutod-8Thff0QmQ=="
    },
    {
      title: "caliber.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF4Ha9A1UB6EvtxbtokzPeUi0iJoQQbMn6xsOY81vzd9xBcHT_2pwhGRL_7tQMwBOijWDVf-CtutDbMGinFDrIzGBGN0x398r5lnpoD73uXmsAZAY-gR2cZ7IB0HOZCIThV50qGP5IJgzr_8o9zXE14Erv55PIpalEpXx34KTaxRofezuuANYFhRYC3ts1-zvO_UBw2XIr1otbraNYzVx_70c8="
    },
    {
      title: "thedailystar.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8fIrhSguSNarAS4npviAMjapbtN1QjGZRE8NO84VKIcau13ZYVbZbxHEXUETxQLsMM-F4pqroitEdwWwCltV9dbIxYDQxsK3kaCKSHQGXiJwNW2DaZGx7uVljrScKYTtzx5gKZGL8XoGnrhVJH6cdIeY10TyECkR_zLOqEufToJjPG0NE3GFbXkvkHKQFRD6kSKrMI2ipWj9TAwYWOCPbpjvwchtx3Somh3HM9a9Gi-oQ"
    }
  ],
  webSearchQueries: [
    "US Iran conflict news last 24 hours",
    "CENTCOM Iran statement September 11 2026",
    "Iran military activity September 11 2026",
    "Strait of Hormuz shipping status September 2026",
    "US military deployment Middle East September 2026",
    "WTI Brent oil price trend September 11 2026 Reuters Bloomberg",
    "oil price forecast amid Middle East tensions September 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.185 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：局势在高风险水平上保持稳定，但冲突的地理范围正在扩大。最显著的变化是伊朗代理人胡塞武装在也门的推进，使曼德海峡成为继霍尔木兹海峡之后的又一个高风险航运咽喉，加剧了全球能源和供应链的系统性风险。",
    bannerWarning: "→ 维持最高防御姿态，冲突烈度与能源中断风险未见顶，风险资产敞口最小化。",
    deescalationIntent: "美国旨在通过军事打击和经济封锁彻底削弱伊朗的地区影响力及其核能力，而伊朗则试图通过直接及代理人行动打破封锁、将美国逐出该地区并重塑地区秩序。",
    structuralRisk: "霍尔木兹海峡的商业航运流量持续处于极低水平。根据路透社援引的Kpler数据，每日通过船只数量仅为个位数，远低于冲突前每日超过80艘的正常水平，表明航道已处于严重受限状态。",
    contradictionNote: "美国旨在通过军事打击和经济封锁彻底削弱伊朗的地区影响力及其核能力，而伊朗则试图通过直接及代理人行动打破封锁、将美国逐出该地区并重塑地区秩序。；美国利用其海空优势对伊朗本土及海上目标进行精确打击和封锁，而伊朗则通过弹道导弹、无人机以及在霍尔木兹和曼德海峡等关键咽喉地带的非对称/代理人战争来对抗和反制。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第195天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.185 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): The situation remains stable at a high-risk level, but the geographical scope of the conflict is expanding. The most significant change is …",
    bannerWarning: "→ Maintain maximum defensive posture; conflict intensity and energy disruption risks have not peaked; minimize risk ass…",
    deescalationIntent: "The U.S. aims to completely cripple Iran's regional influence and nuclear capab…",
    structuralRisk: "Commercial shipping traffic through the Strait of Hormuz remains at extremely low levels. According…",
    contradictionNote: "The U.S. aims to completely cripple Iran's regional influence and nuclear capabilities through military strikes and economic blockade, while Iran seeks to brea…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 195",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
