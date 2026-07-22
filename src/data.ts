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
  date: "2026-07-22",
  version: "v2.133",
  riskScore: 98,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊直接交火常态化，地理范围扩展至约旦、巴林及伊拉克。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "霍尔木兹海峡能源流量降至零，红海航道受胡塞武装新封锁威胁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "油价进入震荡上行带，双咽喉点受损加剧供应中断溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军直接参与作战，俄罗斯与中国表达严重关切但外部调解失效。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交接触完全中断，双方均重申无条件让步的不可能性。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D144",
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
      value: "WTI $85.25–$88.66 · Brent $91.82–$95.40",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "实质性停航",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军第11轮空袭",
      description: "CENTCOM袭击伊朗无人机设施，称海峡名义开放但实则面临严重威胁。",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗报复约旦基地",
      description: "伊朗导弹击中约旦美军兵营，美方确认新增伤亡人员。",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "胡塞红海禁运",
      description: "胡塞武装宣布对往返沙特港口的所有船只实施打击，扩大大中东海上战场。",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-04",
      title: "原油两月高位",
      description: "布伦特原油冲向$95，受实物供应中断风险推动单日涨幅超4%。",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "卢比奥外交声明",
      description: "美国务卿称对伊施加极端军事压力，谈判窗口事实上处于锁闭状态。",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: ""
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接武装对抗从海上转向内陆基地打击",
      "全球能源双咽喉点（霍尔木兹、红海）首次同步受威胁",
      "外交调解机制全面失效，冲突进入消耗战初期"
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
        "延续：美军持续对伊朗革命卫队（IRGC）设施进行高强度精确空袭。",
        "变化：伊朗打击目标由波斯湾扩大至约旦及巴林的区域枢纽基地。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡VLCC及LNG船流量连续48小时保持在归零状态。",
        "变化：红海Bab el-Mandeb航道受胡塞武装宣布封锁，多艘油轮被迫返航。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：投机净多头寸急剧回归，原油市场转为极度逆价差（Backwardation）结构。",
        "变化：布伦特油价单日拉升近4美元，对冲地缘溢价的成本大幅攀升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗领导层重申「圣战」立场，拒不承认前期秘密协议有效性。",
        "变化：美方释放「长期战」准备信号，五角大楼大幅上调冲突预算。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压政策与伊朗生存性安全利益的零和博弈",
      "中立调停国（卡塔尔/巴基斯坦）在军事行动升级后的边缘化"
    ],
    military: [
      "美国远程精确打击能力与伊朗非对称、区域性导弹饱和攻击的对抗",
      "海上航行自由原则与区域代理人实施的物理封锁之间的对立"
    ]
  },
  scoreTrend: [
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98
    },
    {
      date: "07-21",
      score: 98
    },
    {
      date: "07-22",
      score: 98,
      active: true
    }
  ],
  keyChange: "冲突战场正式从霍尔木兹单点外溢至红海，形成对全球能源供应链的双重钳形封锁。",
  investmentSignal: "→ 维持能源与对冲资产高配，通过黄金与商品期权防御系统性地缘风险。",
  prevRiskScore: 98,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDNwVcele0mN5zGWnt8BfrvIK97YNAKEafW3n1JLmU3Z38dvTbb0rtxQApsnQgD3wmggGyvVTAXCl-TnHall2fVnv3UZzhb2BHkEfXHi012HiOIZrVxwnI"
    },
    {
      title: "fxstreet.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErEl7BkKJSN7ST8WzsHUwHrehNt3w4NpxsmU-TT_8wD1cfRBn1n4Si5x8I_ys07lARkLGB-Q2k9XBtnuQx8FL-3_VojoB5A4KckTtCG9o0K-0kOAH90iEF9mkFu2da_YCGTOyMS8lrTz8RqeqxVwbnc8NhlpGTRijK0TglYo3ksQLrK_cyiEfNxOJDsbdyixX-NnEOeLAVkCzPYs0O-Yin_WGtdJB0O6iKX6ULFy9N1D7U"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFx5V3oyoOPhWHQWQzrWzmyEICN7xeQ1uzLrST3os7dacg5o0vwfdL40Rboi9qVKf9IEgj3sHmemiraQhUHDZxHOj2mgG1TFbI3sCiNDn9RExM="
    },
    {
      title: "cyprusshippingnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_ATHB-rIFCrrQu39gcyDSEp-pHUQsjjoRFnifLSpm2efbWTRH4MPJZWSy2z6FevyRuvdbeXe_6G-aZGzqBWFe81WyM8ggBkTZtnsfjl9rseXTWExW96CWr70aEnbLY_IWvju0y-X6QPJ4VcwNkWHmeVRYuHGQ122wBKT44AoC8YosbgKCZm_E8rt81eKFpho5wxcANaPuUVDLQeO8VaRi679AJ3sS0A=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHOBt86AOGVDeeJhLT4y42X9s2e77waK6ll1qc9labeX9g-Wb9R9mWGdfmnXFGclfB5xtH_rzUaoIsjlepSBN59dbR49U69kuQd0g2zjI_TFj2_Go3vr2MrfwoGUs80cQGFyA9jxAA="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGJ_TdPwTTX9wb_ZRa92iU71hbj3PJksfqL9wnWJhciOWuoy3yrQp1Sh5j24y88mxjA5YwVtYkcgjFcP-xyK0SoMqtF2g9bAvYeHsYWl5wh2uJhC7Exj88NKEQP_JsxmjZuqIDucVBRVFW8tKB5JwWe9OoCpDkQR-J25I9pVVChFboHvUB1hzJtq5oPI5V0RG75KzLDzyc="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCklgC2sqNmDhV_T4JvYaUtvPpZ636sJJK_02YdpK-45COhBq6acmrdm5G--RFixMrt4hXQqhnPCn7EvjF6b-yjkju7-SIUp_o3L5u1dmrHU5bYwTegrOJ6IKusZFB"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnyLd7hVlTwBbXPQiE1aG0RSFFKhbiSzgZj2BMdBGZ9l1CKdXZy9gopexWAPiixyGT38a-Cn_s-LJ34CMiQY4q-Sp1I34KB5GFaQfqfUSfjQvE5QCdN1mIkQL3E04n_d3CJ3VcmxGIEDg8CMOpjx8w7-jnzSG_elmK4R_9yy3wF1Aold3EvhY8-vKOClO7OoFbctU="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEPLLlLAsZDpdyMEwLsH2VXCOZblIMdsBVGh3vFhFDyzTTaGUrN2f1VCfsS4eNQvNryAG0MwFKWRK18Rw2KTJi27u30M5rcGvj2rALm3e7hSFNMnPOsREokjGDXeKmy_dIdAGukkN0NaugzkP2Xapuj"
    },
    {
      title: "cibolacitizen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEooHkvAgb4MTgWbfrkVPdU6mCmeq-7OdH3fOdJhV-qn0iAc7LXyXVXOqtbbN0PTGCgoihzri-BxvGol8B3pU2tZmG2XTMgLe6kWFdBk4ZVpDhoPiF3-ZpqIqjBe5P17kNX4LpJ98oR3k49KWzacFbIvEyZVbNFwsALLOR2bHcBS_LX_fFmmnyWM1JSuER4DgUjKbESC2OixBvzBqz-UejcmswXUg=="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEit5EnZpDvtQBfoXHez7qXTkaBwsvyKgc1AmBRse3MYJSdY5ULTs7PM6CO004KcRDSg1dWuFAcKaixPoLBw6QrOM9M9vVHSxwIhxV-RwH5S__L6q6RCyiKliiKpyKfbXB2Kj73wBj9-N4bc-DelkzM7Fw-_ljh6oZhCEQRPp4fzG8alcNXvr09pe7EWKWxzyMfOqWStFPw6ulUb6n0H0ZgvOMTZg_S-IX1BiVDmpM476Ioebwumbw9quJvWcuOCMP-uVckymeSNG8_OYt9rGqmn5qg3-pd0ZoxKLWGP2Gp2OtaBLacyDsRFQ=="
    },
    {
      title: "fxempire.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPdNLIVXkwZVpPOngO88IHReiVUYCvlQ9Sdj6YMbcGyvA6zoBzp8mRC03lu7NhmAhDlepVljwWUk3Zgz3RMu0VrgRzTQf0rztURqD6urOiBlQ-MtzDXPgfZJmwS41dO7rpD87Oac8YXRNpSxG7C3IRH-c0avv-okFKNDxBvUcD6ybrFPNqJ-cFVeYGQ3EjSqT4Uc34xvLkAHBOAaBV8SHTbz3ri4NOvxYPb5NfZKzfi-fTXDKQ3V0="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFKRZUD_G9fQriRdW3ZVwhyNy_bChqQwH1bbq3_xJ1N0OJFmG4gb-CvN4cDpdbdAcWes4O6ov89sHPAfTF4R31xdBqBckD3Gh73Fta5aMQ4uxBDKRsElnSy9ZMU-x_"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 22 2026 forecast trend",
    "US Iran conflict latest news July 22 2026",
    "Hormuz Strait shipping status July 22 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-22",
  version: "v2.133",
  riskScore: 98,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct US-Iran exchanges normalized, scope expanded to Jordan, Bahrain, and Iraq.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Hormuz energy flows hit zero; Red Sea route threatened by new Houthi blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Prices moving in upward corridor as dual-chokepoint disruption heightens risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US Navy deeply involved in combat; regional allies' airspace/bases directly targeted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels collapsed; both sides reiterate non-negotiable positions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D144",
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
      value: "WTI $85.25–$88.66 · Brent $91.82–$95.40",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Substantial Halt",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US 11th Night Strikes",
      description: "CENTCOM targets IRGC drone facilities, claiming strait is 'open' despite zero traffic.",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Hits Jordan Base",
      description: "Iranian missiles strike Muwaffaq Salti Air Base; US confirms additional casualties.",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Houthi Red Sea Embargo",
      description: "Houthis announce blockade on Saudi ports, forcing multiple tankers to reverse course.",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: "",
      critical: true
    },
    {
      id: "EVT-04",
      title: "Oil Hits 2-Month High",
      description: "Brent targets $95 fueled by physical supply disruption risks and maritime blockades.",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Rubio Diplomacy Statement",
      description: "SecState Rubio declares Iran uninterested in talks, citing continued shipping attacks.",
      verification: "confirmed",
      timestamp: "2026-07-22",
      significance: ""
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from maritime skirmishes to regional land-based missile strikes",
      "Simultaneous threats to global chokepoints (Hormuz and Red Sea)",
      "Failure of diplomatic frameworks leading to attrition warfare"
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
        "Continue: US forces maintain high-tempo strikes on Iranian military infrastructure.",
        "Change: Iran targets expanded from Gulf waters to regional US hubs in Jordan and Bahrain."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Zero VLCC and LNG carrier transits observed through Hormuz for 48 hours.",
        "Change: Red Sea chokepoint now under active blockade threat by Yemen's Houthis."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market structure shifts to extreme backwardation as immediate supply vanishes.",
        "Change: Speculative long positioning surges alongside multi-month price peaks."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran reaffirms 'Full-Scale War' status, ignoring previous Swiss-mediated MOUs.",
        "Change: Washington prepares for protracted conflict with significant budget upward revisions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum game between US 'Maximum Pressure' and Iran's existential security",
      "Marginalization of neutral mediators following direct military escalation"
    ],
    military: [
      "US precision power vs Iran's asymmetric, regional saturation strike capabilities",
      "Naval freedom of navigation principles vs physical blockades by state/non-state actors"
    ]
  },
  scoreTrend: [
    {
      date: "07-18",
      score: 96
    },
    {
      date: "07-19",
      score: 98
    },
    {
      date: "07-20",
      score: 98
    },
    {
      date: "07-21",
      score: 98
    },
    {
      date: "07-22",
      score: 98,
      active: true
    }
  ],
  keyChange: "Conflict geography spills over into a dual-pincer maritime blockade of global energy corridors.",
  investmentSignal: "→ Maintain high exposure to Energy and defensive commodities while hedging risk assets.",
  prevRiskScore: 98,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDNwVcele0mN5zGWnt8BfrvIK97YNAKEafW3n1JLmU3Z38dvTbb0rtxQApsnQgD3wmggGyvVTAXCl-TnHall2fVnv3UZzhb2BHkEfXHi012HiOIZrVxwnI"
    },
    {
      title: "fxstreet.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErEl7BkKJSN7ST8WzsHUwHrehNt3w4NpxsmU-TT_8wD1cfRBn1n4Si5x8I_ys07lARkLGB-Q2k9XBtnuQx8FL-3_VojoB5A4KckTtCG9o0K-0kOAH90iEF9mkFu2da_YCGTOyMS8lrTz8RqeqxVwbnc8NhlpGTRijK0TglYo3ksQLrK_cyiEfNxOJDsbdyixX-NnEOeLAVkCzPYs0O-Yin_WGtdJB0O6iKX6ULFy9N1D7U"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFx5V3oyoOPhWHQWQzrWzmyEICN7xeQ1uzLrST3os7dacg5o0vwfdL40Rboi9qVKf9IEgj3sHmemiraQhUHDZxHOj2mgG1TFbI3sCiNDn9RExM="
    },
    {
      title: "cyprusshippingnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_ATHB-rIFCrrQu39gcyDSEp-pHUQsjjoRFnifLSpm2efbWTRH4MPJZWSy2z6FevyRuvdbeXe_6G-aZGzqBWFe81WyM8ggBkTZtnsfjl9rseXTWExW96CWr70aEnbLY_IWvju0y-X6QPJ4VcwNkWHmeVRYuHGQ122wBKT44AoC8YosbgKCZm_E8rt81eKFpho5wxcANaPuUVDLQeO8VaRi679AJ3sS0A=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHOBt86AOGVDeeJhLT4y42X9s2e77waK6ll1qc9labeX9g-Wb9R9mWGdfmnXFGclfB5xtH_rzUaoIsjlepSBN59dbR49U69kuQd0g2zjI_TFj2_Go3vr2MrfwoGUs80cQGFyA9jxAA="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGJ_TdPwTTX9wb_ZRa92iU71hbj3PJksfqL9wnWJhciOWuoy3yrQp1Sh5j24y88mxjA5YwVtYkcgjFcP-xyK0SoMqtF2g9bAvYeHsYWl5wh2uJhC7Exj88NKEQP_JsxmjZuqIDucVBRVFW8tKB5JwWe9OoCpDkQR-J25I9pVVChFboHvUB1hzJtq5oPI5V0RG75KzLDzyc="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCklgC2sqNmDhV_T4JvYaUtvPpZ636sJJK_02YdpK-45COhBq6acmrdm5G--RFixMrt4hXQqhnPCn7EvjF6b-yjkju7-SIUp_o3L5u1dmrHU5bYwTegrOJ6IKusZFB"
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnyLd7hVlTwBbXPQiE1aG0RSFFKhbiSzgZj2BMdBGZ9l1CKdXZy9gopexWAPiixyGT38a-Cn_s-LJ34CMiQY4q-Sp1I34KB5GFaQfqfUSfjQvE5QCdN1mIkQL3E04n_d3CJ3VcmxGIEDg8CMOpjx8w7-jnzSG_elmK4R_9yy3wF1Aold3EvhY8-vKOClO7OoFbctU="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEPLLlLAsZDpdyMEwLsH2VXCOZblIMdsBVGh3vFhFDyzTTaGUrN2f1VCfsS4eNQvNryAG0MwFKWRK18Rw2KTJi27u30M5rcGvj2rALm3e7hSFNMnPOsREokjGDXeKmy_dIdAGukkN0NaugzkP2Xapuj"
    },
    {
      title: "cibolacitizen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEooHkvAgb4MTgWbfrkVPdU6mCmeq-7OdH3fOdJhV-qn0iAc7LXyXVXOqtbbN0PTGCgoihzri-BxvGol8B3pU2tZmG2XTMgLe6kWFdBk4ZVpDhoPiF3-ZpqIqjBe5P17kNX4LpJ98oR3k49KWzacFbIvEyZVbNFwsALLOR2bHcBS_LX_fFmmnyWM1JSuER4DgUjKbESC2OixBvzBqz-UejcmswXUg=="
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEit5EnZpDvtQBfoXHez7qXTkaBwsvyKgc1AmBRse3MYJSdY5ULTs7PM6CO004KcRDSg1dWuFAcKaixPoLBw6QrOM9M9vVHSxwIhxV-RwH5S__L6q6RCyiKliiKpyKfbXB2Kj73wBj9-N4bc-DelkzM7Fw-_ljh6oZhCEQRPp4fzG8alcNXvr09pe7EWKWxzyMfOqWStFPw6ulUb6n0H0ZgvOMTZg_S-IX1BiVDmpM476Ioebwumbw9quJvWcuOCMP-uVckymeSNG8_OYt9rGqmn5qg3-pd0ZoxKLWGP2Gp2OtaBLacyDsRFQ=="
    },
    {
      title: "fxempire.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPdNLIVXkwZVpPOngO88IHReiVUYCvlQ9Sdj6YMbcGyvA6zoBzp8mRC03lu7NhmAhDlepVljwWUk3Zgz3RMu0VrgRzTQf0rztURqD6urOiBlQ-MtzDXPgfZJmwS41dO7rpD87Oac8YXRNpSxG7C3IRH-c0avv-okFKNDxBvUcD6ybrFPNqJ-cFVeYGQ3EjSqT4Uc34xvLkAHBOAaBV8SHTbz3ri4NOvxYPb5NfZKzfi-fTXDKQ3V0="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFKRZUD_G9fQriRdW3ZVwhyNy_bChqQwH1bbq3_xJ1N0OJFmG4gb-CvN4cDpdbdAcWes4O6ov89sHPAfTF4R31xdBqBckD3Gh73Fta5aMQ4uxBDKRsElnSy9ZMU-x_"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 22 2026 forecast trend",
    "US Iran conflict latest news July 22 2026",
    "Hormuz Strait shipping status July 22 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.133 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 98（持平）：冲突战场正式从霍尔木兹单点外溢至红海，形成对全球能源供应链的双重钳形封锁。",
    bannerWarning: "→ 维持能源与对冲资产高配，通过黄金与商品期权防御系统性地缘风险。",
    deescalationIntent: "美国极限施压政策与伊朗生存性安全利益的零和博弈",
    structuralRisk: "霍尔木兹海峡能源流量降至零，红海航道受胡塞武装新封锁威胁。",
    contradictionNote: "美国极限施压政策与伊朗生存性安全利益的零和博弈；美国远程精确打击能力与伊朗非对称、区域性导弹饱和攻击的对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第144天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.133 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 98 (Flat): Conflict geography spills over into a dual-pincer maritime blockade of global energy corridors.",
    bannerWarning: "→ Maintain high exposure to Energy and defensive commodities while hedging risk assets.",
    deescalationIntent: "Zero-sum game between US 'Maximum Pressure' and Iran's existential security",
    structuralRisk: "Hormuz energy flows hit zero; Red Sea route threatened by new Houthi blockade.",
    contradictionNote: "Zero-sum game between US 'Maximum Pressure' and Iran's existential security; US precision power vs Iran's asymmetric, regional saturation strike capabilities",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 144",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
