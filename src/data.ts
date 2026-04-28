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
  date: "2026-04-28",
  version: "v2.46",
  riskScore: 80,
  riskChange: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D59",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $96.92–$99.75 · Brent $108.62–$111.16",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "实质停滞",
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
      description: "美军维持对伊封锁，以色列扩大对真主党打击。核心来源：ISW、The Hindu。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡通航量处于极低水位，20000 名船员滞留。核心来源：Reuters、HormuzTracker。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Brent 与 WTI 双双上行，Brent 站稳 $100 以上危机区间。核心来源：Trading Economics。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "中俄美在联合国就核问题交锋，但无直接军事冲突。核心来源：UN、Reuters。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗提议「搁置核谈判以换取解封」，美方反应冷淡。核心来源：Axios、White House。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗「提议换取海峡开放」方案细节披露",
      description: "伊朗通过巴基斯坦提议先行结束封锁并停战，但特朗普政府因其未涵盖核去化细节而倾向于拒绝。来源：Axios。",
      verification: "confirmed",
      timestamp: "2026-04-27",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "联合国核协议审议会议爆发美伊冲突",
      description: "美伊双方就伊朗核不扩散条约（NPT）执行情况及伊朗任职问题激烈互呛，外交窗口收紧。来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "冲突以来首艘满载 LNG 货轮穿越测试",
      description: "「Mubaraz」号 LNG 货轮被观测到通过海峡，尽管属于个案，但反映出极度受限下的关键能源流动尝试。来源：Gulf News。",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "伊朗原油库存告急，面临物理溢出风险",
      description: "美国封锁导致伊朗每日近 900 万桶产能受阻，伊朗被迫使用非正规容器储油，风险加剧。来源：WSJ。",
      verification: "confirmed",
      timestamp: "2026-04-27",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗提议绕开核协议优先解封，旨在缓解国内库存和经济极限。",
      "美国坚持核红线，通过海上封锁维持「极限施压」，尚未见退让空间。",
      "航运业进入长期停摆预期，保费飙升至不可维系水平。"
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
        "延续：美军第五舰队维持对伊朗主要港口的物理封锁，阻止油船出港。",
        "变化：以色列空军加强对黎巴嫩境内真主党中长程导弹设施的定点打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主流班轮公司继续绕行好望角，由于保险撤出，海峡商业价值几乎归零。",
        "变化：出现零星非油轮（如 LNG 货轮）通关案例，但需获得特定方的书面放行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 价格由于谈判破裂预期突破 $110，市场恐慌情绪蔓延。",
        "变化：伊朗国内储油设施达到饱和，后续若无解封，可能被迫大规模关井。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：白宫暗示其「红线」包括彻底终止核能力，而非仅仅是局部的海峡解封。",
        "延续：伊朗外交部在莫斯科寻求俄罗斯对和平方案的外交背书。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的「搁置核议题先行解封」生存策略与特朗普的「彻底解决核问题」红线直接碰撞。"
    ],
    military: [
      "美军海上封锁的窒息效应与伊朗利用霍尔木兹海峡作为最后谈判筹码的存亡博弈。"
    ]
  },
  scoreTrend: [
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80,
      active: true
    }
  ],
  keyChange: "能源因素由 3 上调至 4，带动综合分突破 80，反映油价正式进入危机博弈带。",
  investmentSignal: "→ 增持 能源/避险资产，通过对冲策略防御长期封锁带来的大宗商品波动。",
  prevRiskScore: 76,
  webSources: [
    {
      title: "hormuztracker.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnY1lr9GUwJjy7iJn2bPnxZOa6DWf0g3GsoilZzqy_R9EIMtETcSh_Tryz5dRY-X7FdRIC0_l0m2ZLqOclOdtVGwewDPVftFtP92F8-slc8_ozoAVD5S9ksg=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHA_F-W4Pkt6LrlkNtfszQpqYKfOgmLSCPWyHd20SWG1rxQHm7O2T6l3nGqNyewYuapRJJlDS4dzsUe6-Liwvw8mdWfZ9aTytkBxHqET7Es4Fu5-NK1uzh3XwHgbl2e1qhUIm5RiOWa2LT5Qt5wwHhe5jHtGUJ2Hs49kWfxIbTS1R6JAU4dq65MDoo78fxYKCoegZIY1iobOBFI3kqxau-FjpJKN17HaQ=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEm-AGp2eNj_Q0zFuU7mfQLKRMj6GZpW4l3shnYsp7agmCJ5SMAQ7N5q4ZPz4vofVVZEHXdq226c7OXfai8yIoFbSE9CQaxVGwk6Lg605Apcam9Fe6OLTFxEPfalC5T0nnNJJqZulsBDrnTJA=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH0MY4MPmLScNJpdD4eiyEXpKYB0TAha-ryZsGL9Xgn7gQLWn5viovQewFTiOuddlAzy2r76bABzvFSUZjgnAm8Po-amEMXuPMmbmRCgulzCMBQ8_-Fx9u6TW3GOMfT8PJcejLiSqxnDpRaUm2VPRrePFcn4JUVmMTJ98Ogmx6PoIL-YNCuT759PEH3TX1n-ANVPg=="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH24hduv6dZdelVf10_1YgAIW2MXQiPv4KP1NIW3cZoKBm56tnuz-cG6h85gb7kKdeM0_o7XficX1ObPlqlIioXXj9ZSCHBUa_THne6BezhnC2lz1AkiAmINcPS36ioLonXLgLw-HoxFN6o3z2LvwbOdJobaeA="
    },
    {
      title: "oneindia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEKcZ_QpYZWvaZwcgN_uq2ckk8-D3s8pfMYUSH4gpHxkbu7ERcTtrhmzzXezu9FsaKO_N9CXFRRhCFe3nMMV7X4vM1ZA9t8fiH5f6puq1crnyxxdnFFOqZghuDQURcm7qGJ5Ou9Rh4xrHQv2YUdFV8ZBWvQBAmTNClSN6bDxzknY5zNKlZCcpuY2YIV3j7rCIkR-n95e48Q6yCLZz7XSrFQhDbs3ArJMc8ov9IWKtlY9lIZXP6GnInNYJdi1VOEosc6HefexQ=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqFrBZH9G-wlRt7S9uCrdeP-pf239m4D5HAkRASWrDSZv8YQizyOI1HObQrb6CkLY8iFptxn1u463pkpg4d7brkDnuHDo6lVa456_guKOzgZqMms0YINXbS7tmqIvWQiBfEl9YE_pvhBU9PsMgtX-MXw=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNYt8cnR_74fjMaCDMTp6cDi252bBnhlaN1mjhiNcdkMAZiyLcNoUdFOyGwxVmIHsNs5zQxuko3ojIKVdxgT5BrtTuU-om0hnzQDFoDvZOkyW7UvDrCysj9Yzs4qk="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWCFOWWEL3EeFq44zauCTE-wnFIVEy64B70pzb4Wcj4PR22U_K89O4vBosH2-3-gRhhPJhyjZFOOLr4VVECZYdKudzjpifu3YAN2cGmqLsgd0aKYNTvm58vWXtaN4Tv-R0CpJVoShLb_mLl4ZD6E5oR8Qxpu0="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHchIrZ4c0UIuqRvFPQyz4C3vcNbj4arQe_brGhe-EM02ywTJXcOExUFp2e8RMkQc7uT7scAJeH70xSzMzqFkBQIQ3LHqnyMPVtlIVMZ92iEbXhBKuRg8N1zTNG4p8FLWH0rvJFvoIlossQOpfW92lAKBGXF1pD9G5lMY3iHMkfVnvgczmv2jhEAU_XW2xNV-qiABzCE-eBQGUeri4QephjrqefNJRcIEaaFmS2q_GYdA=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFo95wCfZoQy7NRH6nBDVXIZu95iFSyNmZvQURTT9PHc98hlaZIjKvVqOoV1lV6DO_EtK1zscnuk6awxnJCdwYcAbWpjcu6edRzSpAbbUqer3OF_eTxG3b4dUnjYPm6G2WGNgVgBMBsRRLSEBlWkJUPjGs_yC-UmOw8L0D2vJ4rMSeH4QmrGjuhEMSawCFXtySTbg_xmtP-XfHesCsVkPxkXFdORgVQhsqd1q15rrhsbiiAEIZbpq0="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMzCtcH5FNjmsCpqRLH-jtZDJJ3H9hOibLS9jfqqODK-Op6LfmvIiiB04jQ1P6nc_Liie1v7_qT9UbdZhAmcWIhrNf0i45PhM5YXLtlvDy1xO7Xpop72w6SO6AayB29v0sU0g6e1VGa46BZoJWqmhGEPiMl7jUqkIbq2i4-f5WPk2Awb8WF0qPXZALArR4Scc8cdZbaXSI6OEjD4jpddOSRgK-Jk6IMQT1Q5K31xATzCxvXUvCEsYg"
    }
  ],
  webSearchQueries: [
    "US Iran tension news April 27 28 2024 2026",
    "WTI Brent oil price April 28 2024 2026 news trend",
    "Hormuz Strait shipping status April 28 2024",
    "Oman back channel talks US Iran status April 2024 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-28",
  version: "v2.46",
  riskScore: 80,
  riskChange: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D59",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $96.92–$99.75 · Brent $108.62–$111.16",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Effectively Closed",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US blockade and Israeli strikes on Hezbollah maintain high military pressure. Sources: ISW, The Hindu.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial transit remains effectively halted with 20,000 seafarers stranded. Sources: Reuters, HormuzTracker.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Brent crosses $110 as prolonged blockade fears grow. Sources: Trading Economics.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US, Russia, and China clash diplomatically at the UN. Sources: UN, Reuters.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran's proposal to delay nuclear talks rejected by US. Sources: Axios, White House.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Details of Iran's 'Hormuz Reopening' Proposal Revealed",
      description: "Tehran offered to reopen the strait and end war in exchange for lifting the blockade, but Trump is reportedly dissatisfied due to lack of nuclear concessions. Source: Axios.",
      verification: "confirmed",
      timestamp: "2026-04-27",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "US and Iran Clash at UN Review of Atomic Treaty",
      description: "Tensions flared at the UN NPT conference over Iran's vice-presidency and enrichment levels. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "First LNG Tanker Crosses Hormuz Since Conflict Start",
      description: "The 'Mubaraz' LNG carrier traversed the strait in a rare and limited shipment, monitored as a pressure test for the chokepoint. Source: Gulf News.",
      verification: "confirmed",
      timestamp: "2026-04-28",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Iran Oil Storage Reaching Physical Capacity",
      description: "US blockade has forced Iran to store millions of barrels in makeshift containers, risking environmental spill or production shutdown. Source: WSJ.",
      verification: "confirmed",
      timestamp: "2026-04-27",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran attempts to trade transit leverage for economic survival.",
      "US maintains 'Maximum Pressure' blockade targeting nuclear concessions.",
      "Market shifts toward a long-term closure scenario."
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
        "Continue: US Fifth Fleet maintains active blockade of Iranian oil terminals.",
        "Change: Israeli Air Force intensifies strikes against Hezbollah assets in eastern Lebanon."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global carriers bypass the region; insurance remains withdrawn.",
        "Change: Limited non-oil transits attempted under specific permission regimes."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent breaks $110 as ceasefire talks reaching an impasse triggers panic buying.",
        "Change: Iran storage saturation threatens shut-ins of major oil fields."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump signals 'Red Lines' are non-negotiable regarding Tehran's nuclear capabilities.",
        "Continue: Iran seeks Russian diplomatic support for its new peace proposal."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's survival-first proposal vs. US nuclear-first demand."
    ],
    military: [
      "Asymmetric naval blockade vs. potential Iranian escalation in the Strait."
    ]
  },
  scoreTrend: [
    {
      date: "04-24",
      score: 76
    },
    {
      date: "04-25",
      score: 72
    },
    {
      date: "04-26",
      score: 76
    },
    {
      date: "04-27",
      score: 76
    },
    {
      date: "04-28",
      score: 80,
      active: true
    }
  ],
  keyChange: "Energy factor upgraded from 3 to 4, driving the composite score to 80 as oil prices enter the crisis zone.",
  investmentSignal: "→ Increase exposure to Energy and Defensive assets; Maintain hedges against volatile commodity shifts.",
  prevRiskScore: 76,
  webSources: [
    {
      title: "hormuztracker.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnY1lr9GUwJjy7iJn2bPnxZOa6DWf0g3GsoilZzqy_R9EIMtETcSh_Tryz5dRY-X7FdRIC0_l0m2ZLqOclOdtVGwewDPVftFtP92F8-slc8_ozoAVD5S9ksg=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHA_F-W4Pkt6LrlkNtfszQpqYKfOgmLSCPWyHd20SWG1rxQHm7O2T6l3nGqNyewYuapRJJlDS4dzsUe6-Liwvw8mdWfZ9aTytkBxHqET7Es4Fu5-NK1uzh3XwHgbl2e1qhUIm5RiOWa2LT5Qt5wwHhe5jHtGUJ2Hs49kWfxIbTS1R6JAU4dq65MDoo78fxYKCoegZIY1iobOBFI3kqxau-FjpJKN17HaQ=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEm-AGp2eNj_Q0zFuU7mfQLKRMj6GZpW4l3shnYsp7agmCJ5SMAQ7N5q4ZPz4vofVVZEHXdq226c7OXfai8yIoFbSE9CQaxVGwk6Lg605Apcam9Fe6OLTFxEPfalC5T0nnNJJqZulsBDrnTJA=="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH0MY4MPmLScNJpdD4eiyEXpKYB0TAha-ryZsGL9Xgn7gQLWn5viovQewFTiOuddlAzy2r76bABzvFSUZjgnAm8Po-amEMXuPMmbmRCgulzCMBQ8_-Fx9u6TW3GOMfT8PJcejLiSqxnDpRaUm2VPRrePFcn4JUVmMTJ98Ogmx6PoIL-YNCuT759PEH3TX1n-ANVPg=="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH24hduv6dZdelVf10_1YgAIW2MXQiPv4KP1NIW3cZoKBm56tnuz-cG6h85gb7kKdeM0_o7XficX1ObPlqlIioXXj9ZSCHBUa_THne6BezhnC2lz1AkiAmINcPS36ioLonXLgLw-HoxFN6o3z2LvwbOdJobaeA="
    },
    {
      title: "oneindia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEKcZ_QpYZWvaZwcgN_uq2ckk8-D3s8pfMYUSH4gpHxkbu7ERcTtrhmzzXezu9FsaKO_N9CXFRRhCFe3nMMV7X4vM1ZA9t8fiH5f6puq1crnyxxdnFFOqZghuDQURcm7qGJ5Ou9Rh4xrHQv2YUdFV8ZBWvQBAmTNClSN6bDxzknY5zNKlZCcpuY2YIV3j7rCIkR-n95e48Q6yCLZz7XSrFQhDbs3ArJMc8ov9IWKtlY9lIZXP6GnInNYJdi1VOEosc6HefexQ=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqFrBZH9G-wlRt7S9uCrdeP-pf239m4D5HAkRASWrDSZv8YQizyOI1HObQrb6CkLY8iFptxn1u463pkpg4d7brkDnuHDo6lVa456_guKOzgZqMms0YINXbS7tmqIvWQiBfEl9YE_pvhBU9PsMgtX-MXw=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNYt8cnR_74fjMaCDMTp6cDi252bBnhlaN1mjhiNcdkMAZiyLcNoUdFOyGwxVmIHsNs5zQxuko3ojIKVdxgT5BrtTuU-om0hnzQDFoDvZOkyW7UvDrCysj9Yzs4qk="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWCFOWWEL3EeFq44zauCTE-wnFIVEy64B70pzb4Wcj4PR22U_K89O4vBosH2-3-gRhhPJhyjZFOOLr4VVECZYdKudzjpifu3YAN2cGmqLsgd0aKYNTvm58vWXtaN4Tv-R0CpJVoShLb_mLl4ZD6E5oR8Qxpu0="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHchIrZ4c0UIuqRvFPQyz4C3vcNbj4arQe_brGhe-EM02ywTJXcOExUFp2e8RMkQc7uT7scAJeH70xSzMzqFkBQIQ3LHqnyMPVtlIVMZ92iEbXhBKuRg8N1zTNG4p8FLWH0rvJFvoIlossQOpfW92lAKBGXF1pD9G5lMY3iHMkfVnvgczmv2jhEAU_XW2xNV-qiABzCE-eBQGUeri4QephjrqefNJRcIEaaFmS2q_GYdA=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFo95wCfZoQy7NRH6nBDVXIZu95iFSyNmZvQURTT9PHc98hlaZIjKvVqOoV1lV6DO_EtK1zscnuk6awxnJCdwYcAbWpjcu6edRzSpAbbUqer3OF_eTxG3b4dUnjYPm6G2WGNgVgBMBsRRLSEBlWkJUPjGs_yC-UmOw8L0D2vJ4rMSeH4QmrGjuhEMSawCFXtySTbg_xmtP-XfHesCsVkPxkXFdORgVQhsqd1q15rrhsbiiAEIZbpq0="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMzCtcH5FNjmsCpqRLH-jtZDJJ3H9hOibLS9jfqqODK-Op6LfmvIiiB04jQ1P6nc_Liie1v7_qT9UbdZhAmcWIhrNf0i45PhM5YXLtlvDy1xO7Xpop72w6SO6AayB29v0sU0g6e1VGa46BZoJWqmhGEPiMl7jUqkIbq2i4-f5WPk2Awb8WF0qPXZALArR4Scc8cdZbaXSI6OEjD4jpddOSRgK-Jk6IMQT1Q5K31xATzCxvXUvCEsYg"
    }
  ],
  webSearchQueries: [
    "US Iran tension news April 27 28 2024 2026",
    "WTI Brent oil price April 28 2024 2026 news trend",
    "Hormuz Strait shipping status April 28 2024",
    "Oman back channel talks US Iran status April 2024 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月28日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.46 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑4）：能源因素由 3 上调至 4，带动综合分突破 80，反映油价正式进入危机博弈带。",
    bannerWarning: "→ 增持 能源/避险资产，通过对冲策略防御长期封锁带来的大宗商品波动。",
    deescalationIntent: "伊朗的「搁置核议题先行解封」生存策略与特朗普的「彻底解决核问题」红线直接碰撞。",
    structuralRisk: "海峡通航量处于极低水位，20000 名船员滞留。核心来源：Reuters、HormuzTracker。",
    contradictionNote: "伊朗的「搁置核议题先行解封」生存策略与特朗普的「彻底解决核问题」红线直接碰撞。；美军海上封锁的窒息效应与伊朗利用霍尔木兹海峡作为最后谈判筹码的存亡博弈。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第59天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 28 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.46 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑4): Energy factor upgraded from 3 to 4, driving the composite score to 80 as oil prices enter the crisis zone.",
    bannerWarning: "→ Increase exposure to Energy and Defensive assets; Maintain hedges against volatile commodity shifts.",
    deescalationIntent: "Iran's survival-first proposal vs. US nuclear-first demand.",
    structuralRisk: "Commercial transit remains effectively halted with 20,000 seafarers stranded. Sources: Reuters, Hor…",
    contradictionNote: "Iran's survival-first proposal vs. US nuclear-first demand.; Asymmetric naval blockade vs. potential Iranian escalation in the Strait.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 59",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
