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
  date: "2026-08-17",
  version: "v2.160",
  keyStats: [
    {
      label: "冲突天数",
      value: "D170",
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
      value: "WTI $81.81–$83.00 · Brent $88.27–$89.00",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "流量几近停滞",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "无人机袭击库尔德区行政核心。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "商业航运在周末出现实质性停摆。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价受地缘政治溢价支撑走高。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方确认封锁伊朗港口策略，地区防务联盟成型。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "60天谅解备忘录期限正式届满且未续签。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊谅解备忘录期限届满",
      description: "60天最后期限已过，双方重回敌对制裁与零和博弈状态。",
      verification: "confirmed",
      timestamp: "2026-08-17 04:56 EDT",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "库尔德区总理府遭无人机袭击",
      description: "两架Hadid-110型自杀式无人机袭击埃尔比勒行政核心，无人员伤亡。",
      verification: "confirmed",
      timestamp: "2026-08-17 00:28 AST",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "代理冲突延续",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "正式外交轨道全面断裂",
      "针对行政首脑目标的不对称攻击出现",
      "海峡能源通道进入“零流通”观察期"
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
        "延续：美军维持对叙利亚、伊拉克境内什叶派民兵的威慑姿态。",
        "变化：伊朗对库区高官办公室发动直接无人机打击，越过此前默契红线。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：周末通过量降至零，为冲突爆发以来首次实质性全航道休克。",
        "延续：多国油轮继续在阿联酋和卡塔尔外海抛锚等待护航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油在$88-90区间盘整，市场完全计入谈判失败预期。",
        "变化：对华运费报价因风险激增保持在$78/吨高位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普政府指示五角大楼缩减韩美演习以聚焦中东资源调配。",
        "延续：伊朗最高领袖办公室重申直至美方赔偿损失前不会重开海峡。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方追求“极限施压”下的妥协 vs 伊方坚持要求先撤制裁并赔偿"
    ],
    military: [
      "美方港口封锁能力 vs 伊方海峡封锁成本不对称性"
    ]
  },
  scoreTrend: [
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80,
      active: true
    }
  ],
  keyChange: "美伊谅解备忘录（MoU）正式失效引发外交全面停摆，伴随跨境针对性军事打击，风险等级上行。",
  investmentSignal: "→ 增持能源对冲与防御性风险资产",
  change: "up",
  prevRiskScore: 76,
  webSources: [
    {
      title: "wsls.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF2dpa8_5iymdY77B6LTi9e2nNg54e-6D074FgDyq-SeaZA5YoM3umZOKW5ge2Bv7Yj2RCNVkMUhrSSyesgWt-UyuwMCUjj3rneuh5BFsk7P3U6UwzMJxz_ityr5o7NmR3kJfrIQyzwTmfG97MV3rWnZtxHkfN3gnej35ZKp2C5zUz1uHRB2nK7h5hvP9DFY9B3jd37O2k6XZJZvsvcLZBIIpaiOr-PnWFQ0BPURwumrWs="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHh3IlN8GGIaHpi7r7gZzW6wQ5yQWXGZRZ9VxiyxZ_46ao2uRW4HoN5uNn78q6DxPJONnwNl9dzp0gra7y3mBH5C6re3xMI3EQy1AKywBUQELyE4Zf2qe2S3jt8DLvLVVqWJQ4ei1gi2Fl9MjLU1gwQ83YHo30T3u0_60UYbigoCRi6moW9HAQHrrRXe1I6c3ECmUbynClzRGlQGJCJlS4_hGnxLs5njAo-rZeY89RRhVTvC6XioTvUemgDCCvnoZ-boh_RESgNkeo="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLvzAcbW1Zjz8bXsdzmQInGlFTRcJ2S3KAZCHRyEYsNOw0m0ipTMTSIN3Np11pxlRvhT7CYC9AtE0yDNl6w0x81KbiJiC5t_2Axy-RhS93bB1TtbGd6pbVaTZtnYq7c4YlfbfltqqzCPz-9dw="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkBWKIeYBw3T6uXt3BCowxBzex_DvVNkTKOMyOZ4GvMuOUU5tna7d-R4cnvW1rn31IL_nKEUD5g903uTJhnO6xK1CdFew0kbaqQDUKg9AeqhQBIa5OR9wQv8JZ5VkBqO2RGbUraIlM"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqMuTwbUK_uufoLOH7NnWtIE4FRZawysqc65ShfLkb8NskNVcI2e3ajjFNNRljJDWHCtrdar0sXaokDtXxtUDfE8o2qlSpFihfh2RaGHCrb7Wk0B8D21mH63F5RMVEVpInbtxXB8XkEeUHsE2LgnnPWdPr1Do9zKGx"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHo5telv0X_ebGyAjEhqpDzkD__P4xICQmhGv7oqXBEKT0jLbpRyBz3IXq3LDPV85LjcNwwAQWaNrxJGN5QkTagHYE04snHb3z1SdyVu_DEcMXCeiDXtFxJmov_NeUF7np_xMrGql6U7KrXQMSmsGio0iQzNF7UHRprBtcqcttsCcDYy1YE"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGi-AGc3svCLc5XxoRMdmb0PwA114hORBBcpR2HXC57g73AE0Bd35MA2zsPjL5vhyfDCWav5yhkO5aN0Nj-CQVvVejenSNIAVrzOst0GyL-38EsjeLVUmy0d7eA9JFOiKpMGC2uiuc="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt_sx8sZto162E-fwKLn4huzsGfSXOut_DpSJZvlQB69qrxH8DERewtw_NdQn8JD-tyG0fuDTsPkkf5BYJmEW9jAxokRrEEEfO5sgk3il54tqbLXUxszSPEbh_vjJvtYkex95g7dfEuqxbaLw57Qb9"
    },
    {
      title: "dailysabah.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEEnm7OoMAmDZ_oZ-kEoaqOu_W7yQofn7jUMSosLsCpdD_ifTThicXp20kZ__wIJKZWD4tqPjmk8E1f6_LEjhXTGVn0N513t_YlAOLx2QVdel3dNpnq6flF4xf0K1UmkrJ9oMTyuxht6GeERnpQX7HNzVGktF5KUYYDZkKEfwdzNmXlMQW5eHZIdohd_Gwx7gTM-ucDFihFh0UuQH-o9Q=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9VbP8v7h7g-SpfMs8xNfnR_7mjzVQiswp7-EIu8jSr3mmQaTyUtHLfVAvWmqRTzYLIZ8XIjltbz6ffGpOupptuWbwGdLzyoBJhLRm6M3s10PqCA-HV4Srs8_Kzy0AxkrW1BIAXHnw8mtXnAg80r5PHYB-qH_fWtaGydsIG3BQA5C04RBt7fDHOzP36Xt00Za-ZjKy5B5yP6hYcjgJtd-QWQ5tpQm9Cf4="
    },
    {
      title: "economictimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_Bg6UUpNyLjPEjlZxQwt79q6NOBfEbs7NWIuPendrd_yul6__GqnUnqtRyJtZhsH07JPIuJMWv73qQUVYNxqPu0tWd2NxpKJTM6u61tzwh3i1eOf2-eZFzEGlrhwdg9mmN3JVqRDtQJKsIdILepkV15JRkxvt2LSeNoDqQVGNlhTllAGExT_Rn8RA0v30dy-tVRY0SETbN_SmlNct_vliOofCrm58FFNSX8ylCBz9Fkmfg2Ki-qOTJbV9FBDAyIVKffGqa8ksUeJWI4bzRBPTu3cRBNsVppJo5gaGZgwAWRM73gUwtRVo87pdKjd0lQ=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7mgjCho0TyF86eXh9_cEJ73oB8c-1jNEsexnGFz7wpfE6VhyesMCP6Yoawv5_fVecpXs8jzRXnA7BSVzjh4YG5Wtiyr7CEM1xmWGV3ITJGLEyDVmdvP_48e2p2Nucx3YqxVHw8JKeWMD1AJ8SonZVtP4yNKOADjfy1QdrokQOhYa_cLMgnFqjujRVTuYvqvTBVo3vybdVbr1CmM7VVA=="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE541hKRHiYhO22MY052G4K6C3gTKwMFGnNTvs0k8KObwGGyBOv22mvVbPm7oA3oYNigmIZiwNQ0QruCluqpip2Z6h50RtkXJUGc8VkAxA-83m9EfvBr1Vou4SswDxbZlyZyk-7RQxHlsXQ2vOBrj5Qiynjok9z-1ShDMgED3aC"
    },
    {
      title: "thesoufancenter.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFyOWQcI8Ky3LyIqa1kzMkY4OqqSmWRWAGAiaaDMjIQYtHwl0yKUigdI4LF9LcOjU18lMOskzxK3tlHb-LVNKkHudbYBsda0iVEnuIumcA23VeWh-AVGXJ4P3NIkUBNhmSY1KjxuChNizcN1eQ="
    },
    {
      title: "lloydslist.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_PaIQ_RWhLGecyvLGZ0BxwxvDLi-l43NbxdYQ0156ifbR2sLRCdNEoa9bX7nVywRpVvroUr6SDr4-Ynsqac-796Rzero81WOEAUGTSbhtVTinviKsanqGjuYoinSQjPlod075gjsTufU87Hz_J8OI5R7ogo5M0Qe6z2seBcil-otFcBtB1D4GtEpUHYUFRD4lu3C3-80ItJJbYQ47v0u6jJm1"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNtS0WOvr-J4_3xWdQER0qyQwrbF7zXyPyf2eGdKDuxHfzurzqwTulNupeIeTWwuyv8xIBmNlN50_VgC1481S1hj1tvPKzKRNARd_FRFvZ5a6uKms2Sv0ATygzXOjjxiqGRNYEY_EHKYsEaDOLGA6rm80GAj2sVn7yqbTNp2u2xg=="
    },
    {
      title: "spglobal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPQdQLwptpIP3Q9CIm7qV1okNwFVXgnW-saYl_-FuVxyeb3sC-ir7YEb74ynb8UIwOcCDFfFDQl14XpYPRafjkTtgO-1ekKzHuT57qLJM2Kgh93FeOypu2TeCKWGSJHO3CmNoKc1xZF2GkkOsS6EpzxZKufTEN2JBPvFLrnjfDbSMjUTsj6FMnTIfbKxhs2GEgW15x_LsWb8HgiN89tgS18iDzVPAubP9mgG7CbdGVWDL9SStF_0P_O2wJ6WdTkmALeUc="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range August 17 2026 trend news",
    "US Iran military conflict news August 17 2026 Strait of Hormuz",
    "US Department of Defense statement Iran drone August 17 2026",
    "Lloyd's of London war risk premium Middle East shipping August 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-17",
  version: "v2.160",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D170",
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
      value: "WTI $81.81–$83.00 · Brent $88.27–$89.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Traffic Near Stagnation",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 80,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Drone attacks on the core administrative hub of the Kurdistan region.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial shipping saw a de facto halt over the weekend.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Oil prices supported by geopolitical risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. formalizes port blockade strategy; regional defense alliances form.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "60-day MoU deadline expired without renewal.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Expiration of US-Iran MoU",
      description: "The 60-day deadline has passed; both sides return to hostile sanctions and zero-sum posturing.",
      verification: "confirmed",
      timestamp: "2026-08-17 04:56 EDT",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Drone Attack on KRG PM Office",
      description: "Two Hadid-110 suicide drones targeted the administrative core in Erbil; no casualties reported.",
      verification: "confirmed",
      timestamp: "2026-08-17 00:28 AST",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Proxy Conflict Continuation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Formal diplomatic track completely severed",
      "Asymmetric attacks against high-level political targets",
      "Strait of Hormuz entering 'Zero Passage' observation phase"
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
        "Continue: US military maintains deterrence against Shia militias in Syria/Iraq.",
        "Change: Iran launched direct drone strikes against KRG offices, crossing previous tactical lines."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Weekend transit dropped to zero, the first substantive shock since the war began.",
        "Continue: International tankers remain anchored off UAE/Qatar awaiting escorts."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude consolidating at $88-90, pricing in the total failure of negotiations.",
        "Change: Freight rates to China remain at $78/mt due to extreme risk spikes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump administration instructs Pentagon to scale back joint drills in Korea to focus on the Middle East.",
        "Continue: Iranian Supreme Leader's office reiterates no reopening without full compensation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US 'Maximum Pressure' for compromise vs Iran's demand for compensation"
    ],
    military: [
      "US naval blockade capacity vs Iranian asymmetrical strait closure costs"
    ]
  },
  scoreTrend: [
    {
      date: "08-13",
      score: 74
    },
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80,
      active: true
    }
  ],
  keyChange: "The official expiration of the MoU triggered a diplomatic blackout, coupled with targeted military strikes, raising the overall risk level.",
  investmentSignal: "→ Increase exposure to energy hedges and defensive risk assets",
  change: "up",
  prevRiskScore: 76,
  webSources: [
    {
      title: "wsls.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF2dpa8_5iymdY77B6LTi9e2nNg54e-6D074FgDyq-SeaZA5YoM3umZOKW5ge2Bv7Yj2RCNVkMUhrSSyesgWt-UyuwMCUjj3rneuh5BFsk7P3U6UwzMJxz_ityr5o7NmR3kJfrIQyzwTmfG97MV3rWnZtxHkfN3gnej35ZKp2C5zUz1uHRB2nK7h5hvP9DFY9B3jd37O2k6XZJZvsvcLZBIIpaiOr-PnWFQ0BPURwumrWs="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHh3IlN8GGIaHpi7r7gZzW6wQ5yQWXGZRZ9VxiyxZ_46ao2uRW4HoN5uNn78q6DxPJONnwNl9dzp0gra7y3mBH5C6re3xMI3EQy1AKywBUQELyE4Zf2qe2S3jt8DLvLVVqWJQ4ei1gi2Fl9MjLU1gwQ83YHo30T3u0_60UYbigoCRi6moW9HAQHrrRXe1I6c3ECmUbynClzRGlQGJCJlS4_hGnxLs5njAo-rZeY89RRhVTvC6XioTvUemgDCCvnoZ-boh_RESgNkeo="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLvzAcbW1Zjz8bXsdzmQInGlFTRcJ2S3KAZCHRyEYsNOw0m0ipTMTSIN3Np11pxlRvhT7CYC9AtE0yDNl6w0x81KbiJiC5t_2Axy-RhS93bB1TtbGd6pbVaTZtnYq7c4YlfbfltqqzCPz-9dw="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkBWKIeYBw3T6uXt3BCowxBzex_DvVNkTKOMyOZ4GvMuOUU5tna7d-R4cnvW1rn31IL_nKEUD5g903uTJhnO6xK1CdFew0kbaqQDUKg9AeqhQBIa5OR9wQv8JZ5VkBqO2RGbUraIlM"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqMuTwbUK_uufoLOH7NnWtIE4FRZawysqc65ShfLkb8NskNVcI2e3ajjFNNRljJDWHCtrdar0sXaokDtXxtUDfE8o2qlSpFihfh2RaGHCrb7Wk0B8D21mH63F5RMVEVpInbtxXB8XkEeUHsE2LgnnPWdPr1Do9zKGx"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHo5telv0X_ebGyAjEhqpDzkD__P4xICQmhGv7oqXBEKT0jLbpRyBz3IXq3LDPV85LjcNwwAQWaNrxJGN5QkTagHYE04snHb3z1SdyVu_DEcMXCeiDXtFxJmov_NeUF7np_xMrGql6U7KrXQMSmsGio0iQzNF7UHRprBtcqcttsCcDYy1YE"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGi-AGc3svCLc5XxoRMdmb0PwA114hORBBcpR2HXC57g73AE0Bd35MA2zsPjL5vhyfDCWav5yhkO5aN0Nj-CQVvVejenSNIAVrzOst0GyL-38EsjeLVUmy0d7eA9JFOiKpMGC2uiuc="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt_sx8sZto162E-fwKLn4huzsGfSXOut_DpSJZvlQB69qrxH8DERewtw_NdQn8JD-tyG0fuDTsPkkf5BYJmEW9jAxokRrEEEfO5sgk3il54tqbLXUxszSPEbh_vjJvtYkex95g7dfEuqxbaLw57Qb9"
    },
    {
      title: "dailysabah.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEEnm7OoMAmDZ_oZ-kEoaqOu_W7yQofn7jUMSosLsCpdD_ifTThicXp20kZ__wIJKZWD4tqPjmk8E1f6_LEjhXTGVn0N513t_YlAOLx2QVdel3dNpnq6flF4xf0K1UmkrJ9oMTyuxht6GeERnpQX7HNzVGktF5KUYYDZkKEfwdzNmXlMQW5eHZIdohd_Gwx7gTM-ucDFihFh0UuQH-o9Q=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9VbP8v7h7g-SpfMs8xNfnR_7mjzVQiswp7-EIu8jSr3mmQaTyUtHLfVAvWmqRTzYLIZ8XIjltbz6ffGpOupptuWbwGdLzyoBJhLRm6M3s10PqCA-HV4Srs8_Kzy0AxkrW1BIAXHnw8mtXnAg80r5PHYB-qH_fWtaGydsIG3BQA5C04RBt7fDHOzP36Xt00Za-ZjKy5B5yP6hYcjgJtd-QWQ5tpQm9Cf4="
    },
    {
      title: "economictimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_Bg6UUpNyLjPEjlZxQwt79q6NOBfEbs7NWIuPendrd_yul6__GqnUnqtRyJtZhsH07JPIuJMWv73qQUVYNxqPu0tWd2NxpKJTM6u61tzwh3i1eOf2-eZFzEGlrhwdg9mmN3JVqRDtQJKsIdILepkV15JRkxvt2LSeNoDqQVGNlhTllAGExT_Rn8RA0v30dy-tVRY0SETbN_SmlNct_vliOofCrm58FFNSX8ylCBz9Fkmfg2Ki-qOTJbV9FBDAyIVKffGqa8ksUeJWI4bzRBPTu3cRBNsVppJo5gaGZgwAWRM73gUwtRVo87pdKjd0lQ=="
    },
    {
      title: "straitstimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7mgjCho0TyF86eXh9_cEJ73oB8c-1jNEsexnGFz7wpfE6VhyesMCP6Yoawv5_fVecpXs8jzRXnA7BSVzjh4YG5Wtiyr7CEM1xmWGV3ITJGLEyDVmdvP_48e2p2Nucx3YqxVHw8JKeWMD1AJ8SonZVtP4yNKOADjfy1QdrokQOhYa_cLMgnFqjujRVTuYvqvTBVo3vybdVbr1CmM7VVA=="
    },
    {
      title: "insurancejournal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE541hKRHiYhO22MY052G4K6C3gTKwMFGnNTvs0k8KObwGGyBOv22mvVbPm7oA3oYNigmIZiwNQ0QruCluqpip2Z6h50RtkXJUGc8VkAxA-83m9EfvBr1Vou4SswDxbZlyZyk-7RQxHlsXQ2vOBrj5Qiynjok9z-1ShDMgED3aC"
    },
    {
      title: "thesoufancenter.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFyOWQcI8Ky3LyIqa1kzMkY4OqqSmWRWAGAiaaDMjIQYtHwl0yKUigdI4LF9LcOjU18lMOskzxK3tlHb-LVNKkHudbYBsda0iVEnuIumcA23VeWh-AVGXJ4P3NIkUBNhmSY1KjxuChNizcN1eQ="
    },
    {
      title: "lloydslist.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_PaIQ_RWhLGecyvLGZ0BxwxvDLi-l43NbxdYQ0156ifbR2sLRCdNEoa9bX7nVywRpVvroUr6SDr4-Ynsqac-796Rzero81WOEAUGTSbhtVTinviKsanqGjuYoinSQjPlod075gjsTufU87Hz_J8OI5R7ogo5M0Qe6z2seBcil-otFcBtB1D4GtEpUHYUFRD4lu3C3-80ItJJbYQ47v0u6jJm1"
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNtS0WOvr-J4_3xWdQER0qyQwrbF7zXyPyf2eGdKDuxHfzurzqwTulNupeIeTWwuyv8xIBmNlN50_VgC1481S1hj1tvPKzKRNARd_FRFvZ5a6uKms2Sv0ATygzXOjjxiqGRNYEY_EHKYsEaDOLGA6rm80GAj2sVn7yqbTNp2u2xg=="
    },
    {
      title: "spglobal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPQdQLwptpIP3Q9CIm7qV1okNwFVXgnW-saYl_-FuVxyeb3sC-ir7YEb74ynb8UIwOcCDFfFDQl14XpYPRafjkTtgO-1ekKzHuT57qLJM2Kgh93FeOypu2TeCKWGSJHO3CmNoKc1xZF2GkkOsS6EpzxZKufTEN2JBPvFLrnjfDbSMjUTsj6FMnTIfbKxhs2GEgW15x_LsWb8HgiN89tgS18iDzVPAubP9mgG7CbdGVWDL9SStF_0P_O2wJ6WdTkmALeUc="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range August 17 2026 trend news",
    "US Iran military conflict news August 17 2026 Strait of Hormuz",
    "US Department of Defense statement Iran drone August 17 2026",
    "Lloyd's of London war risk premium Middle East shipping August 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.160 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑4）：美伊谅解备忘录（MoU）正式失效引发外交全面停摆，伴随跨境针对性军事打击，风险等级上行。",
    bannerWarning: "→ 增持能源对冲与防御性风险资产",
    deescalationIntent: "美方追求“极限施压”下的妥协 vs 伊方坚持要求先撤制裁并赔偿",
    structuralRisk: "商业航运在周末出现实质性停摆。",
    contradictionNote: "美方追求“极限施压”下的妥协 vs 伊方坚持要求先撤制裁并赔偿；美方港口封锁能力 vs 伊方海峡封锁成本不对称性",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第170天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.160 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑4): The official expiration of the MoU triggered a diplomatic blackout, coupled with targeted military strikes, raising the overall risk level.",
    bannerWarning: "→ Increase exposure to energy hedges and defensive risk assets",
    deescalationIntent: "US 'Maximum Pressure' for compromise vs Iran's demand for compensation",
    structuralRisk: "Commercial shipping saw a de facto halt over the weekend.",
    contradictionNote: "US 'Maximum Pressure' for compromise vs Iran's demand for compensation; US naval blockade capacity vs Iranian asymmetrical strait closure costs",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 170",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
