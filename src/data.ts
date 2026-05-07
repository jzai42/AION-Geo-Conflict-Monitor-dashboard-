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
  date: "2026-05-07",
  version: "v2.55",
  riskScore: 88,
  keyStats: [
    {
      label: "冲突天数",
      value: "D68",
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
      value: "WTI $102.50–$113.80 · Brent $118.20–$122.06",
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
      description: "美军直接袭击伊朗油轮舵机，特朗普发出大规模轰炸威胁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "通行量维持极低位，美方暂停 Project Freedom 护航计划。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价进入 $100-$120 危机带，波动率受最后通牒新闻影响剧增。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中国在北京举行高层调停会晤，美军保持最高战斗准备。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "14 点协议进入「生死时刻」，双方仍处于无直接对话的高压状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普发布战争最后通牒",
      description: "特朗普警告伊朗必须在限期内接受 14 点协议，否则将重启大规模轰炸。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-05-07",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军袭击伊朗油轮舵机",
      description: "美军在阿曼湾开火击伤一艘试图违规通行的伊朗油轮。来源：CBS。",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "中伊外长北京战略磋商",
      description: "阿格拉齐与王毅讨论避免战争的最后路径，中方呼吁美国保持克制。来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "「自由行动」护航项目暂停",
      description: "特朗普政府暂停对商船进入霍尔木兹海峡的护航，旨在作为谈判筹码。来源：Gulf News。",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "航运保险费率创历史新高",
      description: "由于海峡封锁和打击威胁，战时保险费率已飙升至 10%。来源：Lloyd's List。",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军通过有限武力使用（击残油轮）与全面战争威胁，强行开启外交窗口。",
      "伊朗陷入「主权尊严」与「生存安全」的终极博弈，正在审阅美方 14 点草案。",
      "霍尔木兹海峡被双方用作最高等级的外交筹码，通行功能几乎完全丧失。"
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
        "变化：美军从「拦截防御」转向「精准执法」，袭击伊朗油轮舵机标志着封锁烈度升级。",
        "延续：美军航母编队在阿拉伯海维持最高警戒等级。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：由于护航计划暂停，商船在阿曼湾一侧出现大规模积压。",
        "延续：海峡仅维持极其有限的、经伊朗许可的特定船只通行。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价随「战争最后通牒」消息出现脉冲式上涨。",
        "延续：市场完全处于极高风险溢价模式，对任何风吹草动均有剧烈反应。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普展示「以炸逼和」的极端策略，设定了不确定的时间底线。",
        "变化：伊朗领导层表态正在「审阅」提案，但公开措辞依然强硬。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方的「先去核化再停火」要求与伊方「先解除封锁再谈」的顺序之争。",
      "中方调停作为伊朗最后的外交防火墙，与美方单边主义的碰撞。"
    ],
    military: [
      "霍尔木兹海峡的事实关闭与全球供应链保障之间的不可调和矛盾。",
      "美军精准打击行动可能引发伊朗非对称报复（无人机集群）的风险。"
    ]
  },
  scoreTrend: [
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88
    },
    {
      date: "05-07",
      score: 88,
      active: true
    }
  ],
  keyChange: "美方从防御性封锁转为「最后通牒」式主动施压，地缘局势进入决战性谈判时刻。",
  investmentSignal: "→ 维持能源与大宗商品避险头寸，对冲风险资产下行。",
  prevRiskScore: 88,
  webSources: [
    {
      title: "hormuztracker.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFu9Hw0KXZpFn0oa2_9jbD-AeGdmidThtQWoyOIavtVGl3k1bPEH8GXQ8NqgxNsDEr1ocuB6hLT1L9CN6pD0kQr1HC9FBgJXb9Tfs8Zaewxa6aGOzXLlBf6jw=="
    },
    {
      title: "wdrb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNfHkC3x0h0wUZpBth1qE_BBXl3nAisVrXVXaZIMHkyI6jShutPN_52jVs4JOSVfKXsKTspy-CBCK7dA7x3m6CUByilyC-KtjyAoKSi84oOHufvF9OnDNEFTd08u2XTlI5WSA55EduzfEjrVP6rCW_feoGvWsgCSWFngdipq5rryAg0crj62gAhITugpot4eLTadR_3jqt6UPiTNWByLGu1yt25Wp9YDjcZHx2zGLZxghN2XMZWg4AURci6cv9B5GbRcBJNtvDN-bnI_AJUU4Nip5Wt_1UG3xRGLlmz--OXZDVFTVm1Q=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGMTpg4T_Q-EznJDcQMqTUKe8qAiWq0veHrownD2L2qVzfh0lrFKhJk-HPVXqUX2gEkl-HXFCPG1YoBAF7nqR2p6MjuZHyIUdmevdq2OodcF7DjgjzKfY9N80-qIXsNPAqKk2eAjF1Th14vwbuOYMaka7dOM6ZgazG5zjoxsozJ3vgM6PBk6kpkAepv1WN_0qdu8jG8Xoe8ZzaAmFmix37UBaLMg3E="
    },
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzuwa7MwckN-gWy3_QwBlG4Q66UbxGW-IgTTCNJauQP9xq6FJF8QOPP6E2el8kBcpKS-Z10SGdvGikbCxLFfbq0ikFF7VcG15SuCM8BbpH1QY12Q0m5E8fe_EL0STRgk1WeyoIfrr5jLCJspBzjwnbTGvDVUmXuDFghgoRzi8_g73Pf0s4I1haomrAng_9hFqfu2PJ_7JlQze5WcRc5vESOLsFWXeLGDfqTxDe9BhqXDmNi9LRf8Z0K_ii09wlxN8Ls87p4Vscvkr3vqfrRSNAYA=="
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEeYZf7XGy_01UjF9wA4pYoul-PT8Ooy_kvR9IOH1U072S6ij5WFWdi95RGmNC6-q8EjQwAkyN_0R46ro87QsgpD3wtpokM7Al1pvKeu1Ne8rr4-VqwmAyBPbfF6OCLjT-Eihp75FDybY8d7TTmZ7g-_pAHKVQIXi-UsZhq0RsenewtFPWxqVExvjZiSE_Mgw36yfT6vBsKmeKDsx_dID7ohXA="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEusAQbiHFVcSt_qSORMYAfZ0Ud_cGtmiD9isBKMhGx3Il7Q67smA2zDBiTEr0R5WO2U2ri-8Nimw5DO2cXs2YNs5vJynkmI_4FKFdyXOobYhxoCJSD_2HQHQMZmijY2uQ-iQh-wHoPHe1cxEWrpWUq-5echorU8N6yY9aEp6Tmwh8DpSc7D9QnSH_K5CnrOlmvxXcHaBJ6pqKMxI6ThbQlPKQkNsbva_t13DW1sVLmfZow9Ehkag=="
    },
    {
      title: "butlereagle.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZ03DWcCLLBMLI08Rin8e6Ah7e1VeOEt2Ougg_NSnXOBR7pyH5jkexL_lWZyS1o5AuOAPCBBmeuCa60BbmPFNcdTwMYchjDY6O1X_N3pEZ2i-xmIwdYPjs-93bWn8noT7NcotvgXTiCsFA6kNrIaPDAClhD9D_yv8W2BsUG8lKjoxtJ1oa55kLqW1Qe2x7nCSzsTI_dUt9UzsAn7wmjzRh99LLWDOn-i6gvBYQx4DJz9PpYhzuRDdZDjBnMIE4475627Sf"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFm0vv_wXyqiwILGiMbixxFcGGSRBTVhbHbXgL2ll59SL5beTOs5b0VUEieCMeg6Y_s6tV1HblHj42nNWr7RO6coEBcTqg0sxCDtb1SI5GzvEeYb2Vxrf4ok-GYrJuRutv5nmlh1Jg0MK96ZNi7adbh3Sq3manryszl6g3JknY-f_r41qE4DbrKgHJAeVA8Pyn7_QhzzIBLMRDGfrGx"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFU7c-yNPkf-aDoZBchvmzF4Jr7M4m__JhytwM97nZxdqZ97-eMvaMONJdp8Hr_oF2-zVR6O-VgOpuVBu7UabTNxBw8PhsPtyzKIQXR6qGJh88dbpjVAuvJDuV1CNanuY3aOKIG1v35Hiyel1H2YiPoUjEOk6ZHjiUOXaLUph1mdlsl4k9L73j1eDn4K1ifgJdBflv1yoJ0V0zyAMVQdnLGSLiHzYKNwppdGogDpS2yEyt3EKiyMv-k8YjWOVIur64OrfNKzhl4aF4YJQ=="
    },
    {
      title: "fxopen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEoFIvBuwmgTqwMTCX2Xpwl60-_6s81ifQJg_CIa209dCWogYViPa9GCssRmzUD4X6DsZKTRvrUtIUYqXxcv4NcD9fZuavnbLEMggROJ0n2m2GXQYCu8jaTf9rEtKyK3KYi2yKGsQx_h6V3Fbjs_XOv-syNobKj_CrS3XKlCgfxCM1q"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping status May 2024",
    "WTI Brent oil price range trend May 7 2024 2026 scenario",
    "Iran MFA statement US tensions May 2024",
    "US Iran military tension news May 7 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-07",
  version: "v2.55",
  riskScore: 88,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D68",
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
      value: "WTI $102.50–$113.80 · Brent $118.20–$122.06",
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
      description: "US forces directly struck an Iranian tanker; Trump issued 'Bombing starts' ultimatum.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Daily transit fell to 9 vessels; US paused 'Project Freedom' escorts as bargaining chip.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "WTI/Brent in $100-$120 crisis zone; high volatility due to ultimatum-driven market sentiment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "China mediates via Beijing summit; US military maintains strike-ready posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "14-point proposal is active but under extreme pressure from 'bomb or deal' ultimatum.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Issues Bombing Ultimatum",
      description: "Trump warns of massive bombing if Iran rejects the 14-point deal. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-05-07",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "US Strikes Iranian Tanker Rudder",
      description: "US military damaged an Iranian tanker in the Gulf of Oman to enforce blockade. Source: CBS.",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Beijing Mediation Summit",
      description: "Iran's Araghchi meets Wang Yi to discuss peace solution and Chinese support. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Project Freedom Escorts Paused",
      description: "Trump suspended naval escorts to create leverage for ongoing negotiations. Source: Gulf News.",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Insurance Rates Hit Record Highs",
      description: "War risk premiums surge to 10% of cargo value as Hormuz remains unstable. Source: Lloyd's List.",
      verification: "confirmed",
      timestamp: "2026-05-06",
      significance: ""
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US shifts strategy to 'negotiation via coercion' using targeted strikes and bombing threats.",
      "Iran faces a critical decision on the 14-point framework while under severe economic blockade.",
      "The Strait of Hormuz is currently the primary geopolitical leverage point, effectively closed to commerce."
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
        "Change: Shift from defensive interception to offensive coercion (tanker strike).",
        "Continue: High-alert posture for US carrier groups in the Arabian Sea."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Massive vessel backlog in Gulf of Oman following escort suspension.",
        "Continue: Strait remains commercially unviable for major global carriers."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Price spikes following 'bombing ultimatum' news.",
        "Continue: Market sentiment entirely driven by negotiation headlines."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump sets an implicit deadline with his 'bomb or deal' rhetoric.",
        "Change: Iran signals a willingness to 'review' terms while maintaining defiance."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between US 'denuclearization first' and Iran 'blockade lifting first' demands.",
      "China's role as Iran's diplomatic shield vs. US unilateral pressure."
    ],
    military: [
      "Contradiction between global energy security and the use of Hormuz as a weapon.",
      "Risk of Iranian asymmetric retaliation against US regional assets if talks fail."
    ]
  },
  scoreTrend: [
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88
    },
    {
      date: "05-05",
      score: 88
    },
    {
      date: "05-06",
      score: 88
    },
    {
      date: "05-07",
      score: 88,
      active: true
    }
  ],
  keyChange: "US tactical shift to 'ultimatum diplomacy' pushes the conflict into a decisive, high-risk negotiation phase.",
  investmentSignal: "→ Maintain energy and commodity hedges; hedge against risk asset downside.",
  prevRiskScore: 88,
  webSources: [
    {
      title: "hormuztracker.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFu9Hw0KXZpFn0oa2_9jbD-AeGdmidThtQWoyOIavtVGl3k1bPEH8GXQ8NqgxNsDEr1ocuB6hLT1L9CN6pD0kQr1HC9FBgJXb9Tfs8Zaewxa6aGOzXLlBf6jw=="
    },
    {
      title: "wdrb.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNfHkC3x0h0wUZpBth1qE_BBXl3nAisVrXVXaZIMHkyI6jShutPN_52jVs4JOSVfKXsKTspy-CBCK7dA7x3m6CUByilyC-KtjyAoKSi84oOHufvF9OnDNEFTd08u2XTlI5WSA55EduzfEjrVP6rCW_feoGvWsgCSWFngdipq5rryAg0crj62gAhITugpot4eLTadR_3jqt6UPiTNWByLGu1yt25Wp9YDjcZHx2zGLZxghN2XMZWg4AURci6cv9B5GbRcBJNtvDN-bnI_AJUU4Nip5Wt_1UG3xRGLlmz--OXZDVFTVm1Q=="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGMTpg4T_Q-EznJDcQMqTUKe8qAiWq0veHrownD2L2qVzfh0lrFKhJk-HPVXqUX2gEkl-HXFCPG1YoBAF7nqR2p6MjuZHyIUdmevdq2OodcF7DjgjzKfY9N80-qIXsNPAqKk2eAjF1Th14vwbuOYMaka7dOM6ZgazG5zjoxsozJ3vgM6PBk6kpkAepv1WN_0qdu8jG8Xoe8ZzaAmFmix37UBaLMg3E="
    },
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzuwa7MwckN-gWy3_QwBlG4Q66UbxGW-IgTTCNJauQP9xq6FJF8QOPP6E2el8kBcpKS-Z10SGdvGikbCxLFfbq0ikFF7VcG15SuCM8BbpH1QY12Q0m5E8fe_EL0STRgk1WeyoIfrr5jLCJspBzjwnbTGvDVUmXuDFghgoRzi8_g73Pf0s4I1haomrAng_9hFqfu2PJ_7JlQze5WcRc5vESOLsFWXeLGDfqTxDe9BhqXDmNi9LRf8Z0K_ii09wlxN8Ls87p4Vscvkr3vqfrRSNAYA=="
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEeYZf7XGy_01UjF9wA4pYoul-PT8Ooy_kvR9IOH1U072S6ij5WFWdi95RGmNC6-q8EjQwAkyN_0R46ro87QsgpD3wtpokM7Al1pvKeu1Ne8rr4-VqwmAyBPbfF6OCLjT-Eihp75FDybY8d7TTmZ7g-_pAHKVQIXi-UsZhq0RsenewtFPWxqVExvjZiSE_Mgw36yfT6vBsKmeKDsx_dID7ohXA="
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEusAQbiHFVcSt_qSORMYAfZ0Ud_cGtmiD9isBKMhGx3Il7Q67smA2zDBiTEr0R5WO2U2ri-8Nimw5DO2cXs2YNs5vJynkmI_4FKFdyXOobYhxoCJSD_2HQHQMZmijY2uQ-iQh-wHoPHe1cxEWrpWUq-5echorU8N6yY9aEp6Tmwh8DpSc7D9QnSH_K5CnrOlmvxXcHaBJ6pqKMxI6ThbQlPKQkNsbva_t13DW1sVLmfZow9Ehkag=="
    },
    {
      title: "butlereagle.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZ03DWcCLLBMLI08Rin8e6Ah7e1VeOEt2Ougg_NSnXOBR7pyH5jkexL_lWZyS1o5AuOAPCBBmeuCa60BbmPFNcdTwMYchjDY6O1X_N3pEZ2i-xmIwdYPjs-93bWn8noT7NcotvgXTiCsFA6kNrIaPDAClhD9D_yv8W2BsUG8lKjoxtJ1oa55kLqW1Qe2x7nCSzsTI_dUt9UzsAn7wmjzRh99LLWDOn-i6gvBYQx4DJz9PpYhzuRDdZDjBnMIE4475627Sf"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFm0vv_wXyqiwILGiMbixxFcGGSRBTVhbHbXgL2ll59SL5beTOs5b0VUEieCMeg6Y_s6tV1HblHj42nNWr7RO6coEBcTqg0sxCDtb1SI5GzvEeYb2Vxrf4ok-GYrJuRutv5nmlh1Jg0MK96ZNi7adbh3Sq3manryszl6g3JknY-f_r41qE4DbrKgHJAeVA8Pyn7_QhzzIBLMRDGfrGx"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFU7c-yNPkf-aDoZBchvmzF4Jr7M4m__JhytwM97nZxdqZ97-eMvaMONJdp8Hr_oF2-zVR6O-VgOpuVBu7UabTNxBw8PhsPtyzKIQXR6qGJh88dbpjVAuvJDuV1CNanuY3aOKIG1v35Hiyel1H2YiPoUjEOk6ZHjiUOXaLUph1mdlsl4k9L73j1eDn4K1ifgJdBflv1yoJ0V0zyAMVQdnLGSLiHzYKNwppdGogDpS2yEyt3EKiyMv-k8YjWOVIur64OrfNKzhl4aF4YJQ=="
    },
    {
      title: "fxopen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEoFIvBuwmgTqwMTCX2Xpwl60-_6s81ifQJg_CIa209dCWogYViPa9GCssRmzUD4X6DsZKTRvrUtIUYqXxcv4NcD9fZuavnbLEMggROJ0n2m2GXQYCu8jaTf9rEtKyK3KYi2yKGsQx_h6V3Fbjs_XOv-syNobKj_CrS3XKlCgfxCM1q"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping status May 2024",
    "WTI Brent oil price range trend May 7 2024 2026 scenario",
    "Iran MFA statement US tensions May 2024",
    "US Iran military tension news May 7 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月7日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.55 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（持平）：美方从防御性封锁转为「最后通牒」式主动施压，地缘局势进入决战性谈判时刻。",
    bannerWarning: "→ 维持能源与大宗商品避险头寸，对冲风险资产下行。",
    deescalationIntent: "美方的「先去核化再停火」要求与伊方「先解除封锁再谈」的顺序之争。",
    structuralRisk: "通行量维持极低位，美方暂停 Project Freedom 护航计划。",
    contradictionNote: "美方的「先去核化再停火」要求与伊方「先解除封锁再谈」的顺序之争。；霍尔木兹海峡的事实关闭与全球供应链保障之间的不可调和矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第68天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 7 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.55 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (Flat): US tactical shift to 'ultimatum diplomacy' pushes the conflict into a decisive, high-risk negotiation phase.",
    bannerWarning: "→ Maintain energy and commodity hedges; hedge against risk asset downside.",
    deescalationIntent: "Clash between US 'denuclearization first' and Iran 'blockade lifting first' dem…",
    structuralRisk: "Daily transit fell to 9 vessels; US paused 'Project Freedom' escorts as bargaining chip.",
    contradictionNote: "Clash between US 'denuclearization first' and Iran 'blockade lifting first' demands.; Contradiction between global energy security and the use of Hormuz as a w…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 68",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
