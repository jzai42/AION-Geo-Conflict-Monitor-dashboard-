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
  date: "2026-05-10",
  version: "v2.59",
  keyStats: [
    {
      label: "冲突天数",
      value: "D71",
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
      value: "WTI $95.10–$97.50 · Brent $100.20–$102.80",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "严重受阻",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 84,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC宣布导弹锁定美军目标，美军持续进行防御性打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡实质性封锁，58艘船舶被强制改道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "布伦特油价在停火协议不明朗的情况下重回$100关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军维持大规模军事部署以执行海上安全行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交接触存在但关键立场未松动。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM封锁统计公开",
      description: "美军宣布已拦截58艘商船，显示其海上禁运政策已全面进入实战执行阶段（来源：CENTCOM）。",
      verification: "confirmed",
      timestamp: "2026-05-09",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC导弹锁定挑衅",
      description: "伊朗指挥官称其战略打击手段已就绪，目标直指海湾地区美军基地（来源：Press TV）。",
      verification: "partial",
      timestamp: "2026-05-09",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "巴林跨境间谍案",
      description: "巴林内政部宣布摧毁一个受IRGC支持的地下网络，指控其进行破坏活动（来源：路透社）。",
      verification: "confirmed",
      timestamp: "2026-05-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军海上封锁导致伊朗外汇收入锐减，压力测试升级。",
      "区域小国（巴林等）安全压力加剧，间谍与破坏活动增加。",
      "全球能源市场对霍尔木兹海峡全面中断的定价预期上升。"
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
        "延续：美军驱逐舰在阿曼湾维持高度警戒，拦截试图违规的油轮。",
        "变化：伊朗将快艇与无人机向海峡狭窄处集结，威胁性姿态上升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要航运公司维持“绕行好望角”决策，海峡通行量低迷。",
        "变化：美军开始对多次违反封锁令的船舶实施动力装置瘫痪打击。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场对“和平协议”的信心回落，空头回补推动油价反弹至$100以上。",
        "延续：现货溢价显著，储油成本因战争险飙升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：美国国务卿布林肯与卡塔尔官员沟通，维持外交管道运作。",
        "变化：伊朗强硬派呼吁若封锁不解除，应退出《不扩散核武器条约》。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求以能源出口换取核项目永久停止，伊朗视为丧权辱国。",
      "地区盟友对美军长期卷入的财力与政治支持正在经受考验。"
    ],
    military: [
      "美军海事封锁的“软包围”与伊朗“硬打击”威胁间的非对称对抗。"
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "05-10",
      score: 84,
      active: true
    }
  ],
  keyChange: "美军公开封锁战果强化威慑力，伊朗以“锁定锁定”回应，双方博弈进入高压相持阶段。",
  investmentSignal: "→ 增持能源对冲工具，维持黄金等避险资产作为核心防御仓位。",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "armyrecognition.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG_YuyrmZQ5Xvqd4vsW8I_fSLpfluBhnjgdJY8vUAjLRX8mo8BNBc3CvLVUqAH278OCIygkeCF-7gzrIrqdWH2Mrk5oiWYxXdJsARz9M3D2_XNGWQm8NU96o_KBQSp8KWJwSLQ6-wtpw5RoZAfJ5Z5ZgFMV-6xhA5D2_dPsmBxGuaIEvQGsmPD_3dLn33Qp-Eo-s6vjM3S2pzr7fbWhNgSMfYC7Ov4Cd3N0rJyOAXbMJfDpsDxy1-fBbVIL"
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHf6EuNiAklxqWNt-d7IpdR0GQs-miUeHGijjCuDHgJkP3Kf6OAA53NLAICtGnny3bFFkgcuH_Xl9T2FEj412GcWQDYslpnVMQtnPNR1-ewwBOJFotOLlHhXOT8QC6cU2fqXAL36_LqoOx81fmXk2WliIiFlVMZD1r2e0VeLc5pg1VGzhTs9uopUkRyRE7tNdCNT3tgjBpX-lVBEvcc_tc="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFn3oMnzk18f-00w9n3x88Re_rCRVMbx7bKjcwzjrTyJR925kCYE4dp7qI0x7aLsI0ejsv9UzGfKgVKfLnEYRv_gHua9HyNi62Y-6J4jzkR6S1hVxWaMUuCc5PzYIAAO3tiStR-55O8QJgaZN2vUnbJ"
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_KyKvueDD9BO9xNJHOVXcZRIYHg2WGOYAz4cxyQ180VT4cC4DFQVJWm76lCX9hkHOgYPl0JMRkoXeLY6rKDcX_ldEft14QglnxsmeuamcSOpy_uMB61ler-pqR3gANAwnxC0TfdClymSNJFPOVDIHrMi9v29Zt6YZcGOoe1dR8lOIW9tGxZymSATqUxXKU8tf1bRkACA="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwCLod4Tu8uqpfKCUzj2qukoIryLgAlREwodnu55UjdQp7X6j8668cpqot890-LkXbUR3Fp08L1iWP-k5xvJolsuMgpo8-U4LqS2LA7uVWkuBq3PwG4c9qAjPGCByNClZQdX6zIon0QRjRCVw2lE5K3CvJ-DY9OhH_HbqT87fUVImpYw=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxgnZ8R7LJIXFS_f4JaFXXHjo7OlLyZY5WuBb8ydM6LZ7cH3hg8Yc7dlqSxPRK7eVrVWQPJpZMbSD9IuC0lhJdURr4lYzzOXsndLB3xz9Q10ze_tyfcce6a8HPksB7vnLLeszqBi-t"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFE6ev-3MXJSt5JoNBMkntZ4qyfoqFC-z6lXxOGHp_kREtTuYVN1jCI8lV21cdLbfjSaN2QosCaRARpY-Dd0Z3bTaL6j-Pg3H-ZGlI905BYmP8xGGpoUKYXDDf952tpFUJNCaNdGfgn6ztm_gmw_CnnNjozxroNWbfZhYva29tlOovv13zg0eaUyVKq4Rt1zU7xaulrLuE="
    },
    {
      title: "bnnbloomberg.ca",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGOPHsNnGxeXR8pmIMmivfVsKwsOUOXSyjg6wkGIZDo-6ZwZUhmJUJE3e2KEHq86dc0_HGRVT_qluTm29IBr33-KDeBa9Ucl_eUXG8DFwC9qoJIEfq6lDtvd5Tqk4QTUuWljNPkdH6kLbWzsJmgUmrNXP3sIU3KJbyLyh4Mugd-w0OnCIJrxI9rDy_-LTudfpUd2hHlQA4bLdRPBWHuSdzIKJk="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTyijGiqNf4j1IyQnEd1yz1v0O0NxPN7J4hh-RX2aVIqfg8kvQdR3rtw-s_YIOOMkazXxLHN2WQSZbWkmP18_3CPUHdI7XJyT_s5moIfd51ZjQeRE_j6z3qzuDyj8ozqr7d7ojzPPN8Z7szhtnVSe0G6url7jF54J7Iv9blwh2UndyM_p4YNuMN9ZIucquVNL9ncXi0_hAMYEbaCzB6-j4-0u5g53fAmVDET5QKF9rtVt0zS2d"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG3foOI1IlJAcILGK7xwKUccY5-792hJ0S2glpFugvrTQqFq8kviUzw7O44qlMJtD54V_97xxTnWZjpRGMBqIfckb12bn4CtIiBS1mIm8RpvUxXaig9hNpVU-aGK931mceMcyEROHBLOllP9XaI9pe63fTY-X972kDWCjN2MdLBxbC_U661jdeKnBkvdZejTr65D1EmnWKKa8B3SmD81QnLCtmjncA_"
    },
    {
      title: "https://www.google.com/search?q=time+in+United+States+of+America",
      uri: "https://www.google.com/search?q=time+in+United+States+of+America"
    },
    {
      title: "https://www.google.com/search?q=time+in+Iran",
      uri: "https://www.google.com/search?q=time+in+Iran"
    }
  ],
  webSearchQueries: [
    "US Iran conflict news May 10 2026 US DoD statement IRGC activity",
    "WTI Brent crude oil price May 10 2026 range trend Reuters Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-10",
  version: "v2.59",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D71",
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
      value: "WTI $95.10–$97.50 · Brent $100.20–$102.80",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Blocked",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 84,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC missile lock alerts vs US naval interdictions keep tension high.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Naval blockade actively redirecting dozens of commercial ships.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude reclaimed the $100 psychological level on supply risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintaining high-intensity naval blockade and regional presence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic proposals are on the table but lack constructive response.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "CENTCOM Blockade Statistics Released",
      description: "US forces announce interception of 58 ships, proving operational scale of current naval blockade (Source: CENTCOM).",
      verification: "confirmed",
      timestamp: "2026-05-09",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Missile Lock Threat",
      description: "Tehran warns missiles and drones are targeted at regional US bases (Source: Press TV).",
      verification: "partial",
      timestamp: "2026-05-09",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Bahrain Spy Cell Arrested",
      description: "41 people affiliated with IRGC arrested for plotting security disruption (Source: Reuters/AFP).",
      verification: "confirmed",
      timestamp: "2026-05-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US blockade exerting severe economic pressure on Iran's revenue.",
      "Proxy and espionage activities increasing in Gulf allies like Bahrain.",
      "Global energy markets re-pricing for long-term chokepoint instability."
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
        "Continue: US destroyers maintaining high alert in Gulf of Oman to intercept tankers.",
        "Change: IRGC massing small boats and drones at chokepoints in a threatening posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Global shipping lines continuing Cape of Good Hope diversions.",
        "Change: US military beginning kinetic disablement of engines for persistent blockade violators."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Confidence in ceasefire fades, driving short covering and oil price rebound.",
        "Continue: Spot premiums and war insurance costs remain at historical highs."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US and Qatar maintaining backchannel communications.",
        "Change: Iranian hardliners suggesting withdrawal from NPT if blockade is not lifted."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for permanent nuclear halt vs Iran's demand for full sanction relief.",
      "Strain on regional alliances over the long-term cost of military involvement."
    ],
    military: [
      "Asymmetric standoff between US 'soft' blockade and Iranian 'hard' strike threats."
    ]
  },
  scoreTrend: [
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
      score: 84
    },
    {
      date: "05-10",
      score: 84,
      active: true
    }
  ],
  keyChange: "US blockade success metrics heighten pressure, while Tehran responds with escalation threats.",
  investmentSignal: "→ Overweight energy hedges and gold, maintain defensive posture in risk assets.",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "armyrecognition.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG_YuyrmZQ5Xvqd4vsW8I_fSLpfluBhnjgdJY8vUAjLRX8mo8BNBc3CvLVUqAH278OCIygkeCF-7gzrIrqdWH2Mrk5oiWYxXdJsARz9M3D2_XNGWQm8NU96o_KBQSp8KWJwSLQ6-wtpw5RoZAfJ5Z5ZgFMV-6xhA5D2_dPsmBxGuaIEvQGsmPD_3dLn33Qp-Eo-s6vjM3S2pzr7fbWhNgSMfYC7Ov4Cd3N0rJyOAXbMJfDpsDxy1-fBbVIL"
    },
    {
      title: "octagonai.co",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHf6EuNiAklxqWNt-d7IpdR0GQs-miUeHGijjCuDHgJkP3Kf6OAA53NLAICtGnny3bFFkgcuH_Xl9T2FEj412GcWQDYslpnVMQtnPNR1-ewwBOJFotOLlHhXOT8QC6cU2fqXAL36_LqoOx81fmXk2WliIiFlVMZD1r2e0VeLc5pg1VGzhTs9uopUkRyRE7tNdCNT3tgjBpX-lVBEvcc_tc="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFn3oMnzk18f-00w9n3x88Re_rCRVMbx7bKjcwzjrTyJR925kCYE4dp7qI0x7aLsI0ejsv9UzGfKgVKfLnEYRv_gHua9HyNi62Y-6J4jzkR6S1hVxWaMUuCc5PzYIAAO3tiStR-55O8QJgaZN2vUnbJ"
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_KyKvueDD9BO9xNJHOVXcZRIYHg2WGOYAz4cxyQ180VT4cC4DFQVJWm76lCX9hkHOgYPl0JMRkoXeLY6rKDcX_ldEft14QglnxsmeuamcSOpy_uMB61ler-pqR3gANAwnxC0TfdClymSNJFPOVDIHrMi9v29Zt6YZcGOoe1dR8lOIW9tGxZymSATqUxXKU8tf1bRkACA="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwCLod4Tu8uqpfKCUzj2qukoIryLgAlREwodnu55UjdQp7X6j8668cpqot890-LkXbUR3Fp08L1iWP-k5xvJolsuMgpo8-U4LqS2LA7uVWkuBq3PwG4c9qAjPGCByNClZQdX6zIon0QRjRCVw2lE5K3CvJ-DY9OhH_HbqT87fUVImpYw=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxgnZ8R7LJIXFS_f4JaFXXHjo7OlLyZY5WuBb8ydM6LZ7cH3hg8Yc7dlqSxPRK7eVrVWQPJpZMbSD9IuC0lhJdURr4lYzzOXsndLB3xz9Q10ze_tyfcce6a8HPksB7vnLLeszqBi-t"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFE6ev-3MXJSt5JoNBMkntZ4qyfoqFC-z6lXxOGHp_kREtTuYVN1jCI8lV21cdLbfjSaN2QosCaRARpY-Dd0Z3bTaL6j-Pg3H-ZGlI905BYmP8xGGpoUKYXDDf952tpFUJNCaNdGfgn6ztm_gmw_CnnNjozxroNWbfZhYva29tlOovv13zg0eaUyVKq4Rt1zU7xaulrLuE="
    },
    {
      title: "bnnbloomberg.ca",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGOPHsNnGxeXR8pmIMmivfVsKwsOUOXSyjg6wkGIZDo-6ZwZUhmJUJE3e2KEHq86dc0_HGRVT_qluTm29IBr33-KDeBa9Ucl_eUXG8DFwC9qoJIEfq6lDtvd5Tqk4QTUuWljNPkdH6kLbWzsJmgUmrNXP3sIU3KJbyLyh4Mugd-w0OnCIJrxI9rDy_-LTudfpUd2hHlQA4bLdRPBWHuSdzIKJk="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTyijGiqNf4j1IyQnEd1yz1v0O0NxPN7J4hh-RX2aVIqfg8kvQdR3rtw-s_YIOOMkazXxLHN2WQSZbWkmP18_3CPUHdI7XJyT_s5moIfd51ZjQeRE_j6z3qzuDyj8ozqr7d7ojzPPN8Z7szhtnVSe0G6url7jF54J7Iv9blwh2UndyM_p4YNuMN9ZIucquVNL9ncXi0_hAMYEbaCzB6-j4-0u5g53fAmVDET5QKF9rtVt0zS2d"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG3foOI1IlJAcILGK7xwKUccY5-792hJ0S2glpFugvrTQqFq8kviUzw7O44qlMJtD54V_97xxTnWZjpRGMBqIfckb12bn4CtIiBS1mIm8RpvUxXaig9hNpVU-aGK931mceMcyEROHBLOllP9XaI9pe63fTY-X972kDWCjN2MdLBxbC_U661jdeKnBkvdZejTr65D1EmnWKKa8B3SmD81QnLCtmjncA_"
    },
    {
      title: "https://www.google.com/search?q=time+in+United+States+of+America",
      uri: "https://www.google.com/search?q=time+in+United+States+of+America"
    },
    {
      title: "https://www.google.com/search?q=time+in+Iran",
      uri: "https://www.google.com/search?q=time+in+Iran"
    }
  ],
  webSearchQueries: [
    "US Iran conflict news May 10 2026 US DoD statement IRGC activity",
    "WTI Brent crude oil price May 10 2026 range trend Reuters Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.59 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（持平）：美军公开封锁战果强化威慑力，伊朗以“锁定锁定”回应，双方博弈进入高压相持阶段。",
    bannerWarning: "→ 增持能源对冲工具，维持黄金等避险资产作为核心防御仓位。",
    deescalationIntent: "美方要求以能源出口换取核项目永久停止，伊朗视为丧权辱国。",
    structuralRisk: "海峡实质性封锁，58艘船舶被强制改道。",
    contradictionNote: "美方要求以能源出口换取核项目永久停止，伊朗视为丧权辱国。；美军海事封锁的“软包围”与伊朗“硬打击”威胁间的非对称对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第71天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.59 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (Flat): US blockade success metrics heighten pressure, while Tehran responds with escalation threats.",
    bannerWarning: "→ Overweight energy hedges and gold, maintain defensive posture in risk assets.",
    deescalationIntent: "US demand for permanent nuclear halt vs Iran's demand for full sanction relief.",
    structuralRisk: "Naval blockade actively redirecting dozens of commercial ships.",
    contradictionNote: "US demand for permanent nuclear halt vs Iran's demand for full sanction relief.; Asymmetric standoff between US 'soft' blockade and Iranian 'hard' strike threa…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 71",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
