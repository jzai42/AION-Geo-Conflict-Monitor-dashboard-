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
  date: "2026-08-02",
  version: "v2.144",
  riskScore: 80,
  keyStats: [
    {
      label: "冲突天数",
      value: "D155",
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
      value: "WTI $83.40–85.10 · Brent $86.80–90.80",
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
      description: "美军取消大规模打击计划，但科威特军方确认拦截伊朗来源的无人机袭击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "虽然特朗普宣称协议包括开放海峡，但实地监测显示航道风险极高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价维持高位区间波动，市场等待特朗普所谓「协议」的实物验证。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "沙特深度介入斡旋，影响美军战术决策。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美方释放乐观看法，但伊朗官方强烈否认协议存在，沟通渠道仍极不稳定。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普宣布取消空袭",
      description: "美总统声称因地区领导人要求而取消原定本周末对伊朗能源设施的大规模打击。",
      verification: "confirmed",
      timestamp: "2026-08-01 23:45 ET",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "伊朗否认达成协议",
      description: "伊朗半官方媒体 Mehr 通讯社反驳特朗普关于协议大纲的言论，称其为心理战。",
      verification: "partial",
      timestamp: "2026-08-02 03:30 GMT",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "科威特境内交火",
      description: "科威特防空系统在布比延岛附近拦截了伊朗来源的武装无人机。",
      verification: "confirmed",
      timestamp: "2026-08-01 22:00 GMT",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "特朗普单方面宣称达成协议框架",
      "沙特王储 MBS 发挥关键中介作用",
      "实地冲突（无人机/油轮袭击）与高层言辞严重脱节"
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
        "变化：美军原定对伊空袭计划进入无限期暂停。",
        "变化：科威特境内发生无人机拦截事件，显示局部代理冲突仍在持续。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡商业流量仅为正常时期的 10-20%。",
        "延续：新增 24 小时内两起针对民用油轮的打击报告。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特油价处于 $85-100 风险中轴位，供应溢价尚未褪去。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普宣称达成「全口径」开放协议。",
        "变化：伊朗Acting防长表示将对任何「冒险行为」进行成比例回击。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方急于宣称外交胜利与伊方坚决否认协议存在的认知分歧",
      "海合会国家防止区域全面开战与维持自身安全的战略平衡"
    ],
    military: [
      "大规模正规战的暂缓与小规模代理人/非对称袭击频发的矛盾"
    ]
  },
  scoreTrend: [
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80,
      active: true
    }
  ],
  keyChange: "美军从‘临战边缘’转向‘协议博弈’，但实地安全环境并未因口头声明改善。",
  investmentSignal: "→ 维持对冲配置，减持风险资产，增持能源资产。",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRxwvUOeCMNyoCJrOCfk8JyCM2h-ytmvKtPCq1fQNvDFpDRZKreNxxFBLWJRjcp8FBzb2kQfXCgtVRORKZ5GagtfMyB6J9SP965MSqDzoxk-nE7NFzeZJAc8DIJDWrsDM1v_jnH0M_"
    },
    {
      title: "cfpublic.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHC7VGe_j6M8r_jfcK_E8VBgQ04-lJsZM9YrHpDgoZURNTytzx0BFpb2LYwTcH8g38M9E3HRLQJiXVPtil9NTAcIseoiPKrTAiLOeqzYGUZSCdWQAWPGoMtbkz2Bi7EVI2Ub67_daGCaaUgJS7nb_Z_k3UFUHHfZHtk2If_8-Q-UIKnOFw2jZxshDAeKyo="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvh3WtOc8nimnSAUGNxmSBxcvtYbJRynm3N4vkYR-gF91N4BH7MIw27QDTILgm1Vi9Ykf148IE_jt7N28fOqK9WKFTXU-cCCCv6rT_qL-cZai7hRQWxh6YPZYKDa0_1JTbBI2boJWAfrjU-BH3bDWIwQfSIvLJf3o3zXfGBBjK1HUCEksv6RQ9HSlWQg8tVcaj-JY-MPTmk4FwVF7VuqhYttQmE37dEa89tLF1JzMulXbSTJOQ6DmwF840TA=="
    },
    {
      title: "palestinechronicle.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHO3p86_ML5faqMNDKagmnCdGZz9_0F-0u2AsE9SnVCuBN76Gsmy6FYTYG5M7JcaHGhUafKZk8u_qtuUWQo774zqCWuN3327nuVC9ij9mgYTmo3_DwYVOvpDtJmBbGMUlCNeCPfSmUfcTRnrYjoxFQiY2Tjn7v9Adl1OlqMo7GiYsfbGTKTaLfaLwWWdaXolz6WMROoIViS07qY8JPiMQLe1obm"
    },
    {
      title: "wdrb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiN0xdcJJ96JVLUAYQaozgRuu1d00nLtHQILdpWMOdm608PqjX-8aFyMitAgQNKo2d1lMEoeJlKgoyiN6rDHIOF5WiPnX1lAkohPWa3W03guhuFH0pB1a4ayIMBKaAk-PLbSI0rJ9JCPPpfUTqSNrBw8PpItHpVFGEI6xnSaCpLHVnuRerb3QvY4lcZvJzZGE2jwvmY6m26XuxogzZS2_33XhLg5yj8AEekOVhYPUHwRuh64Au7w5zhtyVVYg2dyfo8UiJtiFZpPecmA7DfRDQ_wNJn1DauLfE2ZA="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFzxC3trZ2q-QSy9-hsWKZRiBrIsCpVS9cvIrFdTyhpMqa6wOM3utuF_w-WxPdZ4u9rCiBliToAk08zcijZsM2U-YPMHji-8Hb8UA_81rlxkgFf4x8dEs7p5t5nXfCV4gsttG7ctPY="
    },
    {
      title: "dailyjournal.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkmHOudt5YWhn6Wm-DsbW-qENP0R3iluvalf5KtDwxPw44L5CKetb4aE4DqeL8UqZtvGFmRoM65NVGCixNkt903dRYFeGNChWEVzrlelyDpRiZkWN94E2isEBr0HDHTbrjoZrZcXnBxjuF-sbiKwXCw4lrvmoHA223c9KORaniVU7gXNllUMMLU-3dqWR9UDnV2BgeDWxReEJrVhQK8WbPPnVoOeT-rXiHQjy_XAZoLvbvj4l8"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtFCTM6NG_7vdXqOGwRFJ0P48wYN0vU5in9Nf3UFDm_PPJVPLXLp1sRlDLFwAWih1SSHLzbu7_mbnYLzrmW0q11aBWsPfiPWwrVUoNHJsm67LMABXPEonfhLj2Lkt6RAiRMbL_aUW-KpcMhe-ud3ix"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgAcUzjf591ksKWdve-Z7D81N2F2p7E7YpzCcxNhyQjgFtPhCFWdqckg-Ldblrg2Wu-EZs05KoH0ljxAtsRwwSVTUNcjY5OB10jKx4jZUUySnRQRduqQJpERTFdCpUrn0eeSu_RGLHFs-NLs5UuZcpzNULj8wKwD4uvnXQhWSHwNfpkLzhu-zF0d2GwJETLs7hsggzlJpjApi9sSQaDcd5tcWha-NOu-jNhuQPLrWXTNLBIwJdC4Fo9-VyVOTUecXhEmVmTMSkXqjlhVLiMJ2pYHIwJSDTUavFJfyJ6jVrbw=="
    },
    {
      title: "whro.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEzN6glBLcJkds6gIgw-zi9bI_c_coRDJTylSkypy15RJKNjInROblbVD3GYcoi2Mlhw8OZkYrfX6ziQLezcqyYOpzNEbdYlFVmg9DN4SKKXf5zyHtlXLavDan23yzJGfNrncVjpo3WgAFdHsicxXBv-HI76mopcGAJEzk2tIOizusT9S9fZ-5obg=="
    },
    {
      title: "kyivpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHETr9jfHPQB-Otn2zbg0QZc0FNe4k5n-zcXixX6EbWJzO1RDtyaeUhGCZ0unZ7KkYqU2_Lbc_eOiJOusgxrgMxEDz8fuIQX635eyvjIZf2i2UmbsXa3LL5vA=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 2 2026 trend news",
    "US Iran conflict update August 2 2026 military news",
    "Hormuz Strait shipping status August 2 2026 Lloyd's List",
    "US State Department Iran statement August 2 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-02",
  version: "v2.144",
  riskScore: 80,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D155",
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
      value: "WTI $83.40–85.10 · Brent $86.80–90.80",
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
      description: "US canceled major strikes, but Kuwaiti air defenses intercepted Iranian-origin drones.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Despite deal claims, maritime security remains compromised with fresh reports of tanker damage.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices remain elevated as markets weigh the validity of diplomatic breakthroughs.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Saudi Crown Prince MBS plays a critical mediation role, influencing US deployment logic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Trump claims 'perimeters of a deal', while Iran's semi-official media dismisses it as a lie.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Cancels Iran Strikes",
      description: "US President announces pause in military strikes citing a pending deal framework.",
      verification: "confirmed",
      timestamp: "2026-08-01 23:45 ET",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Iran Denies Deal Status",
      description: "Tehran media refutes Trump's claims of an agreed-upon framework to open the Strait.",
      verification: "partial",
      timestamp: "2026-08-02 03:30 GMT",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Kuwait Drone Interception",
      description: "Kuwait military reports destroying hostile Iranian drones targeting local facilities.",
      verification: "confirmed",
      timestamp: "2026-08-01 22:00 GMT",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Trump unilaterally declares 'perimeters of a deal'",
      "Mediation by Saudi Crown Prince MBS pauses escalation",
      "Disconnected reality between diplomatic claims and field attacks"
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
        "Change: US major air campaign plans are currently on hold.",
        "Change: Active drone interceptions reported in Kuwaiti airspace."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic remains over 50% below pre-conflict levels.",
        "Continue: Fresh reports of kinetic damage to civilian tankers in the Strait."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude remains at the $85-100 risk pivot point."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump administration claims deal to fully open Hormuz.",
        "Change: Iran's acting Defense Minister warns of proportionate response to any 'adventurism'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Narrative gap between US claims of diplomatic success and Iranian denials",
      "Regional states' pressure for de-escalation versus US military deterrence needs"
    ],
    military: [
      "Pause in state-level conventional strikes vs. persistence of asymmetric proxy warfare"
    ]
  },
  scoreTrend: [
    {
      date: "07-29",
      score: 80
    },
    {
      date: "07-30",
      score: 80
    },
    {
      date: "07-31",
      score: 80
    },
    {
      date: "08-01",
      score: 80
    },
    {
      date: "08-02",
      score: 80,
      active: true
    }
  ],
  keyChange: "Shift from imminent large-scale strike to a contested negotiation framework.",
  investmentSignal: "→ Maintain hedge positions, reduce risk assets, increase energy exposure.",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRxwvUOeCMNyoCJrOCfk8JyCM2h-ytmvKtPCq1fQNvDFpDRZKreNxxFBLWJRjcp8FBzb2kQfXCgtVRORKZ5GagtfMyB6J9SP965MSqDzoxk-nE7NFzeZJAc8DIJDWrsDM1v_jnH0M_"
    },
    {
      title: "cfpublic.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHC7VGe_j6M8r_jfcK_E8VBgQ04-lJsZM9YrHpDgoZURNTytzx0BFpb2LYwTcH8g38M9E3HRLQJiXVPtil9NTAcIseoiPKrTAiLOeqzYGUZSCdWQAWPGoMtbkz2Bi7EVI2Ub67_daGCaaUgJS7nb_Z_k3UFUHHfZHtk2If_8-Q-UIKnOFw2jZxshDAeKyo="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvh3WtOc8nimnSAUGNxmSBxcvtYbJRynm3N4vkYR-gF91N4BH7MIw27QDTILgm1Vi9Ykf148IE_jt7N28fOqK9WKFTXU-cCCCv6rT_qL-cZai7hRQWxh6YPZYKDa0_1JTbBI2boJWAfrjU-BH3bDWIwQfSIvLJf3o3zXfGBBjK1HUCEksv6RQ9HSlWQg8tVcaj-JY-MPTmk4FwVF7VuqhYttQmE37dEa89tLF1JzMulXbSTJOQ6DmwF840TA=="
    },
    {
      title: "palestinechronicle.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHO3p86_ML5faqMNDKagmnCdGZz9_0F-0u2AsE9SnVCuBN76Gsmy6FYTYG5M7JcaHGhUafKZk8u_qtuUWQo774zqCWuN3327nuVC9ij9mgYTmo3_DwYVOvpDtJmBbGMUlCNeCPfSmUfcTRnrYjoxFQiY2Tjn7v9Adl1OlqMo7GiYsfbGTKTaLfaLwWWdaXolz6WMROoIViS07qY8JPiMQLe1obm"
    },
    {
      title: "wdrb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiN0xdcJJ96JVLUAYQaozgRuu1d00nLtHQILdpWMOdm608PqjX-8aFyMitAgQNKo2d1lMEoeJlKgoyiN6rDHIOF5WiPnX1lAkohPWa3W03guhuFH0pB1a4ayIMBKaAk-PLbSI0rJ9JCPPpfUTqSNrBw8PpItHpVFGEI6xnSaCpLHVnuRerb3QvY4lcZvJzZGE2jwvmY6m26XuxogzZS2_33XhLg5yj8AEekOVhYPUHwRuh64Au7w5zhtyVVYg2dyfo8UiJtiFZpPecmA7DfRDQ_wNJn1DauLfE2ZA="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFzxC3trZ2q-QSy9-hsWKZRiBrIsCpVS9cvIrFdTyhpMqa6wOM3utuF_w-WxPdZ4u9rCiBliToAk08zcijZsM2U-YPMHji-8Hb8UA_81rlxkgFf4x8dEs7p5t5nXfCV4gsttG7ctPY="
    },
    {
      title: "dailyjournal.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkmHOudt5YWhn6Wm-DsbW-qENP0R3iluvalf5KtDwxPw44L5CKetb4aE4DqeL8UqZtvGFmRoM65NVGCixNkt903dRYFeGNChWEVzrlelyDpRiZkWN94E2isEBr0HDHTbrjoZrZcXnBxjuF-sbiKwXCw4lrvmoHA223c9KORaniVU7gXNllUMMLU-3dqWR9UDnV2BgeDWxReEJrVhQK8WbPPnVoOeT-rXiHQjy_XAZoLvbvj4l8"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtFCTM6NG_7vdXqOGwRFJ0P48wYN0vU5in9Nf3UFDm_PPJVPLXLp1sRlDLFwAWih1SSHLzbu7_mbnYLzrmW0q11aBWsPfiPWwrVUoNHJsm67LMABXPEonfhLj2Lkt6RAiRMbL_aUW-KpcMhe-ud3ix"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgAcUzjf591ksKWdve-Z7D81N2F2p7E7YpzCcxNhyQjgFtPhCFWdqckg-Ldblrg2Wu-EZs05KoH0ljxAtsRwwSVTUNcjY5OB10jKx4jZUUySnRQRduqQJpERTFdCpUrn0eeSu_RGLHFs-NLs5UuZcpzNULj8wKwD4uvnXQhWSHwNfpkLzhu-zF0d2GwJETLs7hsggzlJpjApi9sSQaDcd5tcWha-NOu-jNhuQPLrWXTNLBIwJdC4Fo9-VyVOTUecXhEmVmTMSkXqjlhVLiMJ2pYHIwJSDTUavFJfyJ6jVrbw=="
    },
    {
      title: "whro.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEzN6glBLcJkds6gIgw-zi9bI_c_coRDJTylSkypy15RJKNjInROblbVD3GYcoi2Mlhw8OZkYrfX6ziQLezcqyYOpzNEbdYlFVmg9DN4SKKXf5zyHtlXLavDan23yzJGfNrncVjpo3WgAFdHsicxXBv-HI76mopcGAJEzk2tIOizusT9S9fZ-5obg=="
    },
    {
      title: "kyivpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHETr9jfHPQB-Otn2zbg0QZc0FNe4k5n-zcXixX6EbWJzO1RDtyaeUhGCZ0unZ7KkYqU2_Lbc_eOiJOusgxrgMxEDz8fuIQX635eyvjIZf2i2UmbsXa3LL5vA=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 2 2026 trend news",
    "US Iran conflict update August 2 2026 military news",
    "Hormuz Strait shipping status August 2 2026 Lloyd's List",
    "US State Department Iran statement August 2 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.144 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美军从‘临战边缘’转向‘协议博弈’，但实地安全环境并未因口头声明改善。",
    bannerWarning: "→ 维持对冲配置，减持风险资产，增持能源资产。",
    deescalationIntent: "美方急于宣称外交胜利与伊方坚决否认协议存在的认知分歧",
    structuralRisk: "虽然特朗普宣称协议包括开放海峡，但实地监测显示航道风险极高。",
    contradictionNote: "美方急于宣称外交胜利与伊方坚决否认协议存在的认知分歧；大规模正规战的暂缓与小规模代理人/非对称袭击频发的矛盾",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第155天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.144 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): Shift from imminent large-scale strike to a contested negotiation framework.",
    bannerWarning: "→ Maintain hedge positions, reduce risk assets, increase energy exposure.",
    deescalationIntent: "Narrative gap between US claims of diplomatic success and Iranian denials",
    structuralRisk: "Despite deal claims, maritime security remains compromised with fresh reports of tanker damage.",
    contradictionNote: "Narrative gap between US claims of diplomatic success and Iranian denials; Pause in state-level conventional strikes vs. persistence of asymmetric proxy warfare",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 155",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
