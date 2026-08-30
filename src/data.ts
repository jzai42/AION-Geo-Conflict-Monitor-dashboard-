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
  date: "2026-08-30",
  version: "v2.173",
  riskScore: 70,
  keyStats: [
    {
      label: "冲突天数",
      value: "D183",
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
      value: "WTI $82.36–$83.54 · Brent $88.90–$89.31",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "流量降90%",
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
      description: "美伊直接交火趋缓，但海事封锁与代理人袭击持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "航道实质关闭进入第6个月，每日通行量仅约10艘。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "油价在$80-$90区间维持韧性，市场反映长期中断预期。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方转向经济战与二级制裁，试图迫使中俄配合。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "阿曼斡旋下的通道协议出现转机，双方开始讨论技术细节。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊阿“联合航道”谈判",
      description: "伊朗宣布与阿曼恢复关于海峡管理权的细节磋商，涉及收入分配与安保。",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美方强化二级制裁",
      description: "美财政部将60家协助伊朗出口的实体列入制裁清单，主要针对“幽灵船队”。",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "胡塞武装红海袭击",
      description: "沙特超大型油轮AMZAN号遭导弹袭击，幸无沉没，但加剧航运保险担忧。",
      verification: "confirmed",
      timestamp: "2026-08-24",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "联合国船员安全报告",
      description: "IMO确认冲突导致19名海员死亡，数百艘船舶仍滞留海湾。",
      verification: "confirmed",
      timestamp: "2026-08-29",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "油价高位平台期",
      description: "布伦特原油在$89水位企稳，市场观望阿曼谈判是否导致航道实质开放。",
      verification: "confirmed",
      timestamp: "2026-08-30",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "从全面交火过渡到长期化封锁与反封锁。",
      "外交重心转移至第三方（阿曼）的通道协议磋商。",
      "经济制裁成为主导博弈杠杆。"
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
        "延续：美军维持对伊港口的海上封锁，拦截违规商船。",
        "变化：代理人战场（也门、伊拉克）活跃度有所回升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：航道通行率维持在冲突前的10%以下。",
        "变化：伊朗开始允许少量经阿曼备案的非战略物资船只通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球原油库存继续消耗，风险溢价维持在$10-15区间。",
        "变化：市场出现对阿曼通道达成后供应恢复的试探性空单。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国总统坚持“极限施压”且暂无撤军意图。",
        "变化：伊朗外交部表现出在技术层面（航道管理）妥协的姿态。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方的“彻底脱钩”诉求与伊朗“主权航道权”的对立。",
      "阿曼的中立中转地位在制裁环境下的执行压力。"
    ],
    military: [
      "海上封锁的合规性争议与胡塞武装的不对称打击能力。"
    ]
  },
  scoreTrend: [
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70,
      active: true
    }
  ],
  keyChange: "冲突从暴力升级转入以航道准入为筹码的极限拉锯战。",
  investmentSignal: "→ 维持风险资产对冲，增持能源行业防御性标的，关注阿曼斡旋协议的法律文本签署节点。",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt_6dwWn0Lu5Ksv4twwYzh1eYXPwKXE_Az5VakFERu8cgnfOES04rHdwGRhWS9U_rUd9zWjs78q6bfrDC3ecOaGV-17NRz_QGcRxCbgrRTv8sNxNnxciaYWIOPAj745Gm9RuY="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3uVsIVmdD19k_kOO65cXh_J7Piq-xd9cwuwesSGtsuk0u7mz9MwUx07Ha-0Mo3je9e3P7B2C00vkEzmO9WpeUnhSElofUPd8w2Oc1ebFB9XsxZG_D45-WKmCF1inoQEvvOXnHO8KzOFAdmvZRFsBiFmpDcxlElA0Zi6XMlGmDmoVpp4slTtoGLyGUxcdLWjdVKJX3n4lGxhNg5rZEeg=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEA6mrd1XvKfSQN9WIZBLQH8PK-m1JigJaJF1B3i6toOvqsiKncupM-IoAymWVC52IlHNhWpVQa55W8_6JnoIDiL9p3deA7LDwEEHKZwk7ixcbsTw294kZw-gDFtShP7VUZh3crzJCyaPOqqNEdj1aQl14BycMrq19oOxebxqFx21oH_gMCs08uOtx_wg=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhJUacsvA23NLqATii8Mgt0GVHHpdxN9RB8DHTnyrabpdWptNvNNV5DNNaCNRfaTO_CqpCv3P3ao72JLTGn3otv-E_heOrXmzJO96k8omVCK7Q6zyzhKaoFiIqII4vDbNmbtZjiHE="
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEv9isdhSieuepoRHRi6ueKuu1gN9LLPzyWoHO8SBJPlApdgZbEp0OzFMwAzuKkMn9NUNpab1jwKglJ_cu61sO7HLVKPAx5VGf0Xye20Bmv023uc2pYwe3w4FCyggvrx5GnUGaOy_D7nn4wP34lHdrq4dzHuK4CNGzw9HOHqg1m_CV9utgRJ-1v3nOKpKSA1WG44WlFw114Fd8FOA=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMH3NM2yMczeSKLLpn_BIIKmFOflnCV_U8MlTc3r4ae5Qz35WNLUctDKazpgsrrSPUlaML8ewkVAWOgZijv0UDODGa1aQJLzqwQvK0GKi9CQtTGtbsmVqK_hveKxCaaA1KVlN-42r1Uvwqnc_kHx0cNss8BD4VMNvr-lhoaU0Jr8fmt2b2jdvPqjv5bdwOKkNc"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGo2esWhSJkvYlfBg7q4RqoyfhNz1akQOETMrC7EQaADzKjpNwGjKLfBbzMyjm4qc6HGDrhmCelstSSnudnp7Lqc8_VyQNJiTPbSCvMXyeifX_e7DdhK2bkkMkDwkNpHWu0oZDE4b2lKtZatawJmJ4FBF3u-aUQmtC7sU7cu01T_-LW5Fbp0p4XVvqo"
    },
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFXgZUHFkFCy0_-Y6wJsgEmLPW5WOW9Ke_gbmzc_taFoxO7eaYDqawg6EdtD5hvTo3fjFbAkNAIMPbjG-GEDkQlgcdQokuk2ZDcLuVfgc-QstM3ZchdbANoJ8r4phJzTBaifvhQCOuBYk35aQac1L4FtXBwSgN4sbfsCJE"
    },
    {
      title: "indiashippingnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE91pjuAS0u-f_3z2cpocgbUz5MLAO9lBhWMUsNUA48NWdjviNibhoWq1mSL5BPlrpB-ooUR6ws-C_9RQJbGWtDJSFQeb42_VkSx4pYhcqn-7XmOeWQG5peB4_QitS2460ArOpzwpRswyOqe1Imq3-LPmNoAaNRzmWmyl1jfpr44Vr5LwfPMeEuxz692ZvKB06vDi10-oU_Je2lap64r9FeHR5j7zxmDkjd"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRTo6dVADJzrdC6fWE_c8mOQkDFIb-sZ2UTExnCJQWeeawdNEX3cF1r0eEAEI3rUzQS6_lrUpNGiOQNe1I4nLkfghH0aBs0xjzpY0kF66fweafW1InFZkYGIyp742MHFN716m1xs38ts-TuQO4glucw_qHF5qGX6eDLZChPfCgjQaSIjPXEGj5Kv0G"
    },
    {
      title: "newarab.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0fCyshrOInZzE4RJHXdirkLMj-6epKSBtYNJw3ATC_KCyvqzOjAMb888Ziw99je6itb9gPnI_DYBXzk9YAEtzcPgKA8IknBhtKc0xzj8SEbhKgVR_Zh1EXVqzHEjjKxOdD-oPwNINVbBmS--D-UxZZC-vHOXVJJD4csSc5A90iNCtnkwXeOVg"
    },
    {
      title: "wsau.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElTypylQG4TQOwC7Wh7fNXplYL3gskw5plJUGjuWMrxw-68UsaBHuHOrbjPo1p73nnNLdcWbA-0ZxkRh1X5fYzJIrrxvCeq0MH8ysJLjawyyMIC7UEGgWktjkmH20mWFj6ALJic6H5H5nhLGuyuqB9JNA8bMmB582yUGcFtGt4sRncpOXnPQmEeB5COh4ExUv1uQU1Xog="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHsSSn4HFBSV-Kjd2VZSMCTEPST8UcDZvNqv1CI4a4lXvhwMkFdL_r_F_ZmJweZe6QZg8yzhdXJF5wiIWtnRZmJpan0SA-Z-4NZDoJdhrd0lXl6X9_scLvpfkm71nZb1qOOjO4541EyNegkqyljRi7anYe-ni4="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgxLpfPggZ3U80utj7jp-22dNbvAEgEXbFMY-8V60C98jKbI5_xqkCjYB0hodRMLyPWZ9xXd52WEGq4jmdmrsi3DlxZM6VAit1eiFySz0dhVo9ZJRVsSC6UsaYT3-EodnjM7p1O_3nNWLU1ZM1sCizAJ-D5Y9jEEuk6oLYJRNtpkanDrX_76dFtEs3CMuy"
    },
    {
      title: "democracynow.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIv3dkT8epOvzqKKp6jcopd2s53klXHw75ZGkVfXxXfj7_rTw60kTDZx1OKvqisJ1nQvAhXyXjHM7nYhInub45QV6RcHCoL-Dv1FAoZwPg1ECqhJsUn6yEcOxYzdRDl6zlhtXGiCrWYSdbBck-6ZZPWcVb6uzXjNr1gjNElgF3SDmsAnfXRuUNOmwbZWdx_HIcbdwyMO98DDEZ4rzeGUi8K7bMLMTjL0X5dHxWjsYUJ4362Pg="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjGCB-n15FhUIoXPXvFUI1_bTib9xVyEsJ6UiZeIF1JU9nfUYLurUrAX3lCDsleXZF7H-ukRaumZ3_rTHJYAZt9SgAoBVslc7SG2KNDd5g__LSs4GM6P61GkRqaDJBUZWdOK8hem9puJztF00_jV7u2CHjwz8_AAzwVRLB51pIehmwzQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range 24h May 22 2024 Reuters Bloomberg",
    "US Iran secret talks Oman May 2024 updates",
    "Hormuz Strait shipping status August 2026 simulation context"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-30",
  version: "v2.173",
  riskScore: 70,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D183",
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
      value: "WTI $82.36–$83.54 · Brent $88.90–$89.31",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Traffic Down 90%",
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
      description: "Direct kinetic strikes have eased, but maritime blockades and proxy attacks persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Strait closure enters its 6th month; daily transits remain at ~10 vessels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Oil prices maintain resilience in the $80-$90 range, reflecting long-term disruption.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US shifts to economic warfare and secondary sanctions targeting global trade chains.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oman-mediated talks on a 'joint navigation corridor' show signs of technical progress.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran-Oman Corridor Talks",
      description: "Iran restarts detailed talks with Oman on managing the Strait, including revenue and security.",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Secondary Sanctions",
      description: "Treasury sanctions 60 entities aiding Iranian exports, specifically targeting the 'Ghost Fleet'.",
      verification: "confirmed",
      timestamp: "2026-08-25",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Houthi Missile Strike",
      description: "Saudi supertanker AMZAN struck in the Red Sea; no sinking reported but insurance premiums spiked.",
      verification: "confirmed",
      timestamp: "2026-08-24",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "UN Maritime Safety Report",
      description: "IMO confirms 19 seafarer deaths and 70 attacks since the war began on Feb 28.",
      verification: "confirmed",
      timestamp: "2026-08-29",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Oil Price Plateau",
      description: "Brent stabilizes at $89 as market watches for actual reopening progress via Oman.",
      verification: "confirmed",
      timestamp: "2026-08-30",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Transition from kinetic exchanges to prolonged blockade and counter-blockade.",
      "Diplomatic focus shifted to 3rd-party corridor mediation.",
      "Economic sanctions becoming the primary leverage."
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
        "Continue: US Navy maintains maritime blockade on Iranian ports.",
        "Change: Proxy battlefields (Yemen, Iraq) show signs of renewed activity."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait traffic remains below 10% of pre-war levels.",
        "Change: Iran starts allowing small volumes of pre-cleared non-strategic cargo."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global crude stocks continue to draw down with $10-15 risk premium.",
        "Change: Market participants test short positions on potential Oman deal success."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US President maintains 'Maximum Pressure' with no troop withdrawal.",
        "Change: Iran's MFA shows willingness to compromise on technical corridor management."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for total decoupling vs. Iran's sovereign waterway rights.",
      "Pressure on Oman's neutrality in a heavy sanction environment."
    ],
    military: [
      "Dispute over blockade legality and Houthi asymmetric strike capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76
    },
    {
      date: "08-28",
      score: 74
    },
    {
      date: "08-29",
      score: 70
    },
    {
      date: "08-30",
      score: 70,
      active: true
    }
  ],
  keyChange: "Conflict shifts into a grind of diplomatic blackmail using waterway access as leverage.",
  investmentSignal: "→ Maintain risk asset hedges, overweight energy defense, and monitor the signing of formal Oman mediation protocols.",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt_6dwWn0Lu5Ksv4twwYzh1eYXPwKXE_Az5VakFERu8cgnfOES04rHdwGRhWS9U_rUd9zWjs78q6bfrDC3ecOaGV-17NRz_QGcRxCbgrRTv8sNxNnxciaYWIOPAj745Gm9RuY="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3uVsIVmdD19k_kOO65cXh_J7Piq-xd9cwuwesSGtsuk0u7mz9MwUx07Ha-0Mo3je9e3P7B2C00vkEzmO9WpeUnhSElofUPd8w2Oc1ebFB9XsxZG_D45-WKmCF1inoQEvvOXnHO8KzOFAdmvZRFsBiFmpDcxlElA0Zi6XMlGmDmoVpp4slTtoGLyGUxcdLWjdVKJX3n4lGxhNg5rZEeg=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEA6mrd1XvKfSQN9WIZBLQH8PK-m1JigJaJF1B3i6toOvqsiKncupM-IoAymWVC52IlHNhWpVQa55W8_6JnoIDiL9p3deA7LDwEEHKZwk7ixcbsTw294kZw-gDFtShP7VUZh3crzJCyaPOqqNEdj1aQl14BycMrq19oOxebxqFx21oH_gMCs08uOtx_wg=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhJUacsvA23NLqATii8Mgt0GVHHpdxN9RB8DHTnyrabpdWptNvNNV5DNNaCNRfaTO_CqpCv3P3ao72JLTGn3otv-E_heOrXmzJO96k8omVCK7Q6zyzhKaoFiIqII4vDbNmbtZjiHE="
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEv9isdhSieuepoRHRi6ueKuu1gN9LLPzyWoHO8SBJPlApdgZbEp0OzFMwAzuKkMn9NUNpab1jwKglJ_cu61sO7HLVKPAx5VGf0Xye20Bmv023uc2pYwe3w4FCyggvrx5GnUGaOy_D7nn4wP34lHdrq4dzHuK4CNGzw9HOHqg1m_CV9utgRJ-1v3nOKpKSA1WG44WlFw114Fd8FOA=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMH3NM2yMczeSKLLpn_BIIKmFOflnCV_U8MlTc3r4ae5Qz35WNLUctDKazpgsrrSPUlaML8ewkVAWOgZijv0UDODGa1aQJLzqwQvK0GKi9CQtTGtbsmVqK_hveKxCaaA1KVlN-42r1Uvwqnc_kHx0cNss8BD4VMNvr-lhoaU0Jr8fmt2b2jdvPqjv5bdwOKkNc"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGo2esWhSJkvYlfBg7q4RqoyfhNz1akQOETMrC7EQaADzKjpNwGjKLfBbzMyjm4qc6HGDrhmCelstSSnudnp7Lqc8_VyQNJiTPbSCvMXyeifX_e7DdhK2bkkMkDwkNpHWu0oZDE4b2lKtZatawJmJ4FBF3u-aUQmtC7sU7cu01T_-LW5Fbp0p4XVvqo"
    },
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFXgZUHFkFCy0_-Y6wJsgEmLPW5WOW9Ke_gbmzc_taFoxO7eaYDqawg6EdtD5hvTo3fjFbAkNAIMPbjG-GEDkQlgcdQokuk2ZDcLuVfgc-QstM3ZchdbANoJ8r4phJzTBaifvhQCOuBYk35aQac1L4FtXBwSgN4sbfsCJE"
    },
    {
      title: "indiashippingnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE91pjuAS0u-f_3z2cpocgbUz5MLAO9lBhWMUsNUA48NWdjviNibhoWq1mSL5BPlrpB-ooUR6ws-C_9RQJbGWtDJSFQeb42_VkSx4pYhcqn-7XmOeWQG5peB4_QitS2460ArOpzwpRswyOqe1Imq3-LPmNoAaNRzmWmyl1jfpr44Vr5LwfPMeEuxz692ZvKB06vDi10-oU_Je2lap64r9FeHR5j7zxmDkjd"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRTo6dVADJzrdC6fWE_c8mOQkDFIb-sZ2UTExnCJQWeeawdNEX3cF1r0eEAEI3rUzQS6_lrUpNGiOQNe1I4nLkfghH0aBs0xjzpY0kF66fweafW1InFZkYGIyp742MHFN716m1xs38ts-TuQO4glucw_qHF5qGX6eDLZChPfCgjQaSIjPXEGj5Kv0G"
    },
    {
      title: "newarab.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0fCyshrOInZzE4RJHXdirkLMj-6epKSBtYNJw3ATC_KCyvqzOjAMb888Ziw99je6itb9gPnI_DYBXzk9YAEtzcPgKA8IknBhtKc0xzj8SEbhKgVR_Zh1EXVqzHEjjKxOdD-oPwNINVbBmS--D-UxZZC-vHOXVJJD4csSc5A90iNCtnkwXeOVg"
    },
    {
      title: "wsau.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElTypylQG4TQOwC7Wh7fNXplYL3gskw5plJUGjuWMrxw-68UsaBHuHOrbjPo1p73nnNLdcWbA-0ZxkRh1X5fYzJIrrxvCeq0MH8ysJLjawyyMIC7UEGgWktjkmH20mWFj6ALJic6H5H5nhLGuyuqB9JNA8bMmB582yUGcFtGt4sRncpOXnPQmEeB5COh4ExUv1uQU1Xog="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHsSSn4HFBSV-Kjd2VZSMCTEPST8UcDZvNqv1CI4a4lXvhwMkFdL_r_F_ZmJweZe6QZg8yzhdXJF5wiIWtnRZmJpan0SA-Z-4NZDoJdhrd0lXl6X9_scLvpfkm71nZb1qOOjO4541EyNegkqyljRi7anYe-ni4="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgxLpfPggZ3U80utj7jp-22dNbvAEgEXbFMY-8V60C98jKbI5_xqkCjYB0hodRMLyPWZ9xXd52WEGq4jmdmrsi3DlxZM6VAit1eiFySz0dhVo9ZJRVsSC6UsaYT3-EodnjM7p1O_3nNWLU1ZM1sCizAJ-D5Y9jEEuk6oLYJRNtpkanDrX_76dFtEs3CMuy"
    },
    {
      title: "democracynow.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIv3dkT8epOvzqKKp6jcopd2s53klXHw75ZGkVfXxXfj7_rTw60kTDZx1OKvqisJ1nQvAhXyXjHM7nYhInub45QV6RcHCoL-Dv1FAoZwPg1ECqhJsUn6yEcOxYzdRDl6zlhtXGiCrWYSdbBck-6ZZPWcVb6uzXjNr1gjNElgF3SDmsAnfXRuUNOmwbZWdx_HIcbdwyMO98DDEZ4rzeGUi8K7bMLMTjL0X5dHxWjsYUJ4362Pg="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHjGCB-n15FhUIoXPXvFUI1_bTib9xVyEsJ6UiZeIF1JU9nfUYLurUrAX3lCDsleXZF7H-ukRaumZ3_rTHJYAZt9SgAoBVslc7SG2KNDd5g__LSs4GM6P61GkRqaDJBUZWdOK8hem9puJztF00_jV7u2CHjwz8_AAzwVRLB51pIehmwzQ=="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range 24h May 22 2024 Reuters Bloomberg",
    "US Iran secret talks Oman May 2024 updates",
    "Hormuz Strait shipping status August 2026 simulation context"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.173 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：冲突从暴力升级转入以航道准入为筹码的极限拉锯战。",
    bannerWarning: "→ 维持风险资产对冲，增持能源行业防御性标的，关注阿曼斡旋协议的法律文本签署节点。",
    deescalationIntent: "美方的“彻底脱钩”诉求与伊朗“主权航道权”的对立。",
    structuralRisk: "航道实质关闭进入第6个月，每日通行量仅约10艘。",
    contradictionNote: "美方的“彻底脱钩”诉求与伊朗“主权航道权”的对立。；海上封锁的合规性争议与胡塞武装的不对称打击能力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第183天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.173 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): Conflict shifts into a grind of diplomatic blackmail using waterway access as leverage.",
    bannerWarning: "→ Maintain risk asset hedges, overweight energy defense, and monitor the signing of formal Oman mediation protocols.",
    deescalationIntent: "US demand for total decoupling vs. Iran's sovereign waterway rights.",
    structuralRisk: "Strait closure enters its 6th month; daily transits remain at ~10 vessels.",
    contradictionNote: "US demand for total decoupling vs. Iran's sovereign waterway rights.; Dispute over blockade legality and Houthi asymmetric strike capabilities.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 183",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
