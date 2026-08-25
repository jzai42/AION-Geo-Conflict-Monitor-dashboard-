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
  date: "2026-08-25",
  version: "v2.168",
  riskScore: 78,
  keyChange: "美方开启极限制裁抵消外交斡旋，航运流量降至季度低点，局势高位持平。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D178",
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
      value: "WTI $82.98–$88.00 · Brent $90.50–$95.20",
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
      description: "局部空袭与海上拦截频繁，拦截行动已常态化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "货运量处于极低位，通行规则政治化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价在高位宽幅震荡，溢价重估导致价格温和回落。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国集中于制裁大棒，区域盟友观望情绪浓厚。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交框架瓦解，双方缺乏实质性妥协基础。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美财政部发起「经济 D-Day」制裁",
      description: "美国针对 60 个涉及伊朗能源运输的实体与个人实施二级制裁，切断其美元清算渠道（Source: Reuters）。",
      verification: "confirmed",
      timestamp: "2026-08-24",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "海峡流量触及三月低点",
      description: "当日仅 2 艘油轮通过霍尔木兹海峡，远低于 2025 年同期的日均 70 艘（Source: Kpler）。",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "巴基斯坦赴伊斡旋进展不明",
      description: "巴基斯坦代表团与伊朗总统会晤，尝试重启谅解备忘录，但官方声明缺乏具体协议内容（Source: Reuters）。",
      verification: "single",
      timestamp: "2026-08-25",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "制裁博弈取代直接空袭成为当前主战场",
      "海峡通行量降至极小值，处于「半封锁」常态化阶段",
      "区域外交渠道虽存，但缺乏打破僵局的政治意愿"
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
        "延续：美军维持第五舰队在阿曼湾的警戒巡航，应对非对称威胁。",
        "变化：伊朗开始利用黑名单机制对通过船只进行针对性盘查。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：大部分商业油轮选择绕行好望角，保费居高不下。",
        "变化：单日通行量跌至历史极点，反映市场避险情绪达峰值。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：中长期原油供应担忧维持油价底部支柱。",
        "变化：短线投机资金由于地缘风险「审美疲劳」出现获利回吐。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰重申对海峡的主权权利，不接受外部护航干扰。",
        "变化：华盛顿通过极限制裁释放不予妥协的强烈信号。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方的全面经济脱钩意图与伊朗维持生存空间的矛盾",
      "巴基斯坦斡旋意愿与美伊实际外交冰点的错位"
    ],
    military: [
      "海上「灰色地带」骚扰与美军防御底线的持续摩擦"
    ]
  },
  scoreTrend: [
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78,
      active: true
    }
  ],
  investmentSignal: "→ 维持能源资产对冲配置，减持易受供应波动影响的非美风险资产，布局防御性大宗商品。",
  change: "none",
  prevRiskScore: 78,
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEwSkNQMd5jj6OfQH_i9HHXjLsnhae6oNnvfdJbCrzHSdY1ZZSOROLY87Hu9ekYwDlyymJ93IYnmVzU23nSSaZQSjdM3qi-HEvyHX3r7mtoK1WMEMoM8qBrEOfh_OI_9bw60ha4Kx8="
    },
    {
      title: "treasury.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkcmcdPdN5dKHIUUuSTi8aciEmwaal4juG50vFrgyB--zozmqAeFhvlC36jF8Kh7v5gRHHcPtYS5nWO-311qkvy4HXd7gfbBsfTfSgh7OzdgAp_bWWIqrTDib2CW-IG56Pcf3xLa7tEk5eASw="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQeiwMTaoAXogWjdCq-9mbV9s-uB9lhqR3SOjUkwncN50jaTEzVs_3BOcWoNWQRq1Oita8QOfgWXQnwm4jbLY7JnNyGKvfKXkBWuGqVHXafwhSGgC9o6PP67dypZwgiMPqd-HcynqvhrqazhHjrgS_84KRK44_2LsyBcuMxaE5NxRX27hgmUtt5bkvFE6_JBLeNbrvD3if"
    },
    {
      title: "ksat.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4_8oJ9U5hdsMnSMqrKSP1OLAaW_2ZHNY-rg6th8qebwxx9SxJQCwL-ZT5I-tp995ESL9Wc4BXk1aojyysSi-X8LPnqug6wUpM6KnOrcdNuEGE_VFCkDzhNibHavbCjx8SIKcPrDzaDqLA5f6_KUJDmoGwtP81mON-gjfyPYPJiqaHaXwL_JEnfIzEcD26gzhHsF7P9u6cu5p7D16AMwTk1bVWK4nzy3LenWA_3kNng3A="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5Tv6ga1lLDBncKiRIdsv3p-imogbqNI-Wl7CW6vAKGXzNju_yiEmjt5vt54ciT3LGRmP8gfpGQegCjQ-iFgSw7zfZul1wAPqPVw3BPMa6ScIPwK_YiPa6Q68SIQSn-LJaVeYI"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBeCbAsZkxC7f8I4YoaBr9DjFNJKsRbV23kchl6aFoB_8LqyIMlwDce3gSlkpU38ZZnY4m2B_Ab3vDbrm2EBQV7QwV6HPA9ImpCdVtPzXk4Z9wCmB7wvTmo1XyyJizep6nF8EJNY9FS37dEdDRyKfl_O_wUojooZMBNwMFrvij5tm1SXKO-8OgHhv_kFRZrEmp_jwRJM8C6_CA2m6GEZe6JvXlVqRAHgcuZ7nmvw=="
    },
    {
      title: "forex.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESmfZolXahacwocIcPAkEVfj8FxvF4tvM2lB2nAq9-eMJXpbFfA9RSM8oFArCixq-r87YjeLbeUZCFPP--vP4Zx6yoEDlnZuqkEEurh6lPHdyOhAyhUkKRfywhy8K6tBBkxVTGU3lHfKUlO3kEtRGFGaLNr6GXU6K2bVgw6rXFRw2Y6EN7LhLFifTQ5-C028fUNx5S"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxuRS_QMaxXzFfodbyp5LrGYMKTGOHIZKXOLx6fYXWBa7Q9f1BQKs4AZGG09VinnjZNay2TUTGJQbWr0yqxHfIWjMKtE1qX4bbS6OosNqxLuhFc0qpjwnshlpCagm-TXC9YRkVtSjF5v95nAwfnDsjv_0rbyjvUu6y15niiVyQrR2o5AwwuVXgsSozLxvwRoY="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEVd1-iUOfVpt9rxn4nY2dmVRne2LE0hR2ooHieDmad1bFBFJXnNPFyEq2DY4J7B0jcMsZTr8KCATPL5wTjwdtvjNmj02Y8tGgp3CdPmvsxxBZO56JHDuE69C3chJV-2-BmDN_p7nyns2zrVHtXH_45PLrw7lHGp2diC5bgJ40wm09oKDCksJ0BuDtKD6Kc8IcW04t0HOjQE6Bhxgv4n1lfeQe1VXQeYDPaqGtVSrKzosTfPCi-HhsQiJXsdyFqbZ9m5MS"
    },
    {
      title: "newsday.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFA2qcM9rH2ovAnlulNebF_YnoLCTNvCfrwo0ZyVNBGt-NlrlaWjV-308kSymDvZ4zgLavGkigxEw9AQZGw8m-2-MzVOAJq9RMqO1rcGMRBp3mm3sTOipZ3xoJ45mcKAYCfaUFcZlbgOkG6RgqaGADOG90JXSsYLX4YSJsGN7fR_T49ACeRS9SRhVu23b0="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEo47HXHgRcMKu6-UmrDSJ9w0gHyFsnFxNhgQ5zh8WH8FUzcblzYC7ptEONNKFW1LeymAP-pqcZnxflwF8lkvoH_GOA14pw8jj6Ik6MMWtGq2jia3DxbyEYCRBRoBo284w0OLg="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXrjUZQ-TWR0jfkQQQgL8qWgrrGPGO3HdXgu46i3PxSa2dG_7ZCz9zo9A6fo-8FyyGqpoUQZ1KvggJbIj0WzLzDyExLLuT2_c7nbG4M2CHAuCMmVQmVb3ISN0HztCyRF-cJ3v1nPJNl_brSpNh58rRm76nvXXXvcAkbKRfSFuMeZiG7iKgZprkXMQl"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices August 25 2026 forecast trend",
    "US Iran conflict news August 24 25 2026 escalation",
    "Hormuz Strait shipping status August 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-25",
  version: "v2.168",
  riskScore: 78,
  keyChange: "Extreme sanctions offset diplomatic talks; Hormuz traffic hits 3-month lows; risks plateau at high levels.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D178",
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
      value: "WTI $82.98–$88.00 · Brent $90.50–$95.20",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "High-frequency local strikes and maritime intercepts persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial traffic at historic lows; passage rules highly politicized.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices remain elevated despite mild geopolitical risk recalibration.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US pivots to extreme economic sanctions; regional allies remain cautious.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "MoU has expired; diplomatic focus shifted to sanctions-retaliation cycle.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Treasury Launches 'Economic D-Day' Sanctions",
      description: "Washington targets 60 entities/vessels to sever Iranian energy lifeline (Source: Reuters).",
      verification: "confirmed",
      timestamp: "2026-08-24",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Transit Hits 3-Month Low",
      description: "Only 2 commodity vessels transited Monday, far below historical averages (Source: Kpler).",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Pakistan-Mediated Talks in Tehran",
      description: "Delegation meets Iran President; talks focus on reopening Hormuz, but no formal deal signed (Source: Reuters).",
      verification: "single",
      timestamp: "2026-08-25",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Sanction-blockade cycle replaces direct combat as primary front",
      "Hormuz in 'semi-blockade' state as commercial vessels avoid risks",
      "Lack of political will to renew expired diplomatic frameworks"
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
        "Continue: US 5th Fleet maintains high alert in the Gulf of Oman.",
        "Change: Iran utilizes 'blacklist' for targeted inspections of non-compliant vessels."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Cape of Good Hope rerouting remains standard for major liners.",
        "Change: Daily transit volume reaches absolute nadir reflecting peak risk aversion."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Middle-term supply deficit narrative provides price floor.",
        "Change: Short-term profit taking occurs as market adjusts risk premium."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran asserts sovereign rights over Strait passage.",
        "Change: Washington signals zero compromise through extreme secondary sanctions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US intent for full economic decoupling vs Iran's survival strategies",
      "Mediatory efforts vs actual escalatory sanctions landscape"
    ],
    military: [
      "Grey-zone maritime friction testing US defensive thresholds"
    ]
  },
  scoreTrend: [
    {
      date: "08-21",
      score: 82
    },
    {
      date: "08-22",
      score: 78
    },
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78,
      active: true
    }
  ],
  investmentSignal: "→ Maintain energy hedges, underweight non-US risk assets exposed to supply volatility, focus on defensive commodities.",
  change: "none",
  prevRiskScore: 78,
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEwSkNQMd5jj6OfQH_i9HHXjLsnhae6oNnvfdJbCrzHSdY1ZZSOROLY87Hu9ekYwDlyymJ93IYnmVzU23nSSaZQSjdM3qi-HEvyHX3r7mtoK1WMEMoM8qBrEOfh_OI_9bw60ha4Kx8="
    },
    {
      title: "treasury.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkcmcdPdN5dKHIUUuSTi8aciEmwaal4juG50vFrgyB--zozmqAeFhvlC36jF8Kh7v5gRHHcPtYS5nWO-311qkvy4HXd7gfbBsfTfSgh7OzdgAp_bWWIqrTDib2CW-IG56Pcf3xLa7tEk5eASw="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQeiwMTaoAXogWjdCq-9mbV9s-uB9lhqR3SOjUkwncN50jaTEzVs_3BOcWoNWQRq1Oita8QOfgWXQnwm4jbLY7JnNyGKvfKXkBWuGqVHXafwhSGgC9o6PP67dypZwgiMPqd-HcynqvhrqazhHjrgS_84KRK44_2LsyBcuMxaE5NxRX27hgmUtt5bkvFE6_JBLeNbrvD3if"
    },
    {
      title: "ksat.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4_8oJ9U5hdsMnSMqrKSP1OLAaW_2ZHNY-rg6th8qebwxx9SxJQCwL-ZT5I-tp995ESL9Wc4BXk1aojyysSi-X8LPnqug6wUpM6KnOrcdNuEGE_VFCkDzhNibHavbCjx8SIKcPrDzaDqLA5f6_KUJDmoGwtP81mON-gjfyPYPJiqaHaXwL_JEnfIzEcD26gzhHsF7P9u6cu5p7D16AMwTk1bVWK4nzy3LenWA_3kNng3A="
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5Tv6ga1lLDBncKiRIdsv3p-imogbqNI-Wl7CW6vAKGXzNju_yiEmjt5vt54ciT3LGRmP8gfpGQegCjQ-iFgSw7zfZul1wAPqPVw3BPMa6ScIPwK_YiPa6Q68SIQSn-LJaVeYI"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBeCbAsZkxC7f8I4YoaBr9DjFNJKsRbV23kchl6aFoB_8LqyIMlwDce3gSlkpU38ZZnY4m2B_Ab3vDbrm2EBQV7QwV6HPA9ImpCdVtPzXk4Z9wCmB7wvTmo1XyyJizep6nF8EJNY9FS37dEdDRyKfl_O_wUojooZMBNwMFrvij5tm1SXKO-8OgHhv_kFRZrEmp_jwRJM8C6_CA2m6GEZe6JvXlVqRAHgcuZ7nmvw=="
    },
    {
      title: "forex.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESmfZolXahacwocIcPAkEVfj8FxvF4tvM2lB2nAq9-eMJXpbFfA9RSM8oFArCixq-r87YjeLbeUZCFPP--vP4Zx6yoEDlnZuqkEEurh6lPHdyOhAyhUkKRfywhy8K6tBBkxVTGU3lHfKUlO3kEtRGFGaLNr6GXU6K2bVgw6rXFRw2Y6EN7LhLFifTQ5-C028fUNx5S"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxuRS_QMaxXzFfodbyp5LrGYMKTGOHIZKXOLx6fYXWBa7Q9f1BQKs4AZGG09VinnjZNay2TUTGJQbWr0yqxHfIWjMKtE1qX4bbS6OosNqxLuhFc0qpjwnshlpCagm-TXC9YRkVtSjF5v95nAwfnDsjv_0rbyjvUu6y15niiVyQrR2o5AwwuVXgsSozLxvwRoY="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEVd1-iUOfVpt9rxn4nY2dmVRne2LE0hR2ooHieDmad1bFBFJXnNPFyEq2DY4J7B0jcMsZTr8KCATPL5wTjwdtvjNmj02Y8tGgp3CdPmvsxxBZO56JHDuE69C3chJV-2-BmDN_p7nyns2zrVHtXH_45PLrw7lHGp2diC5bgJ40wm09oKDCksJ0BuDtKD6Kc8IcW04t0HOjQE6Bhxgv4n1lfeQe1VXQeYDPaqGtVSrKzosTfPCi-HhsQiJXsdyFqbZ9m5MS"
    },
    {
      title: "newsday.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFA2qcM9rH2ovAnlulNebF_YnoLCTNvCfrwo0ZyVNBGt-NlrlaWjV-308kSymDvZ4zgLavGkigxEw9AQZGw8m-2-MzVOAJq9RMqO1rcGMRBp3mm3sTOipZ3xoJ45mcKAYCfaUFcZlbgOkG6RgqaGADOG90JXSsYLX4YSJsGN7fR_T49ACeRS9SRhVu23b0="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEo47HXHgRcMKu6-UmrDSJ9w0gHyFsnFxNhgQ5zh8WH8FUzcblzYC7ptEONNKFW1LeymAP-pqcZnxflwF8lkvoH_GOA14pw8jj6Ik6MMWtGq2jia3DxbyEYCRBRoBo284w0OLg="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXrjUZQ-TWR0jfkQQQgL8qWgrrGPGO3HdXgu46i3PxSa2dG_7ZCz9zo9A6fo-8FyyGqpoUQZ1KvggJbIj0WzLzDyExLLuT2_c7nbG4M2CHAuCMmVQmVb3ISN0HztCyRF-cJ3v1nPJNl_brSpNh58rRm76nvXXXvcAkbKRfSFuMeZiG7iKgZprkXMQl"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices August 25 2026 forecast trend",
    "US Iran conflict news August 24 25 2026 escalation",
    "Hormuz Strait shipping status August 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月25日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.168 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（持平）：美方开启极限制裁抵消外交斡旋，航运流量降至季度低点，局势高位持平。",
    bannerWarning: "→ 维持能源资产对冲配置，减持易受供应波动影响的非美风险资产，布局防御性大宗商品。",
    deescalationIntent: "美方的全面经济脱钩意图与伊朗维持生存空间的矛盾",
    structuralRisk: "货运量处于极低位，通行规则政治化。",
    contradictionNote: "美方的全面经济脱钩意图与伊朗维持生存空间的矛盾；海上「灰色地带」骚扰与美军防御底线的持续摩擦",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第178天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 25 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.168 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (Flat): Extreme sanctions offset diplomatic talks; Hormuz traffic hits 3-month lows; risks plateau at high levels.",
    bannerWarning: "→ Maintain energy hedges, underweight non-US risk assets exposed to supply volatility, focus on defensive commodities.",
    deescalationIntent: "US intent for full economic decoupling vs Iran's survival strategies",
    structuralRisk: "Commercial traffic at historic lows; passage rules highly politicized.",
    contradictionNote: "US intent for full economic decoupling vs Iran's survival strategies; Grey-zone maritime friction testing US defensive thresholds",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 178",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
