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
  date: "2026-05-13",
  version: "v2.62",
  riskScore: 78,
  scoreTrend: [
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D74",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $102.40–$104.80 · Brent $107.35–$109.50",
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
      description: "美军在海峡周边拦截多枚来自伊朗控制区的导弹，冲突仍处于多战线活跃状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡实质性处于“关闭”或“极端受限”状态，商业航行几乎停止。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "油价持续处于$100-120危机带，反映了全球21%原油供应面临的中期中断风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "美国、英国等多国海军在海峡区域维持最高等级部署，中方开始直接参与航行规则谈判。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "谈判处于破裂边缘，美方公开拒绝了伊朗的提议，双方缺乏互信基础。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美中外交共识反收税",
      description: "美中两国罕见达成外交一致，反对伊朗在霍尔木兹海峡单方面征收航行税。",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡交火",
      description: "美军在海峡拦截三枚导弹并反击伊朗军事设施，未报告美方舰艇受损。",
      verification: "confirmed",
      timestamp: "2026-05-11",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "卡塔尔LNG有限复航",
      description: "Windward监测到3艘LNG货船穿越海峡，疑似通过巴基斯坦渠道获得临时安全许可。",
      verification: "partial",
      timestamp: "2026-05-11",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "实地封锁未解，通行量跌至冰点",
      "大国通过外交博弈与局部武力展示维持动态对峙",
      "能源溢价从短期波动转为结构性高位"
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
        "延续：美伊在海峡入口处维持频繁的无人机/巡逻艇对峙。",
        "变化：美军开始对伊朗境内发射源头实施有针对性的外科手术式打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：船只大规模绕道好望角，增加14天航程及巨额燃油成本。",
        "变化：暗箱航行（Dark Shipping）比例升至历史高点，航运透明度崩塌。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油在$107上方高位运行，市场对断供已产生“黏性定价”。",
        "变化：卡塔尔LNG出口的零星恢复对极度紧张的欧洲天然气市场产生微弱心理安抚。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：巴基斯坦继续扮演中立调停角色，穿梭于华盛顿与德黑兰之间。",
        "变化：特朗普政府公开驳回伊朗和平草案，暗示后续军事压力将升级。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗的领海主权征税主张与国际公海通行权的根本冲突",
      "美国国内大选压力下的对伊强硬政策与欧洲盟友避战心理的裂痕"
    ],
    military: [
      "美军区域封锁压制与伊朗非对称“蜂群”反制战术的博弈"
    ]
  },
  keyChange: "美中外交层面在“反征税”议题上的意外合流，以及美伊停火协议因立场互不退让而濒临失效。",
  investmentSignal: "→ 增持能源与国防军工板块，利用大宗商品多头头寸对冲结构性通胀风险。",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNaWKeirlG282QxrCJpJ3sQbI2x39j-d4x63Q8C3gdtTvqlt5mLOspaMTz-kHTRQwW8TMRZNELdLHT-pypaDR5Q5vK-KHJrl5mwXBboXdaE9YGEi4w1spRyzOFmn27-kUjDs4PptJGsUw-0xBHbGs5LTQc5zA0Vctz4l6S74uz9bh1OgN5pxJjNQ6pM_0Vh4qpeoI="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHnNg8QeuQp6tTqkDR7nKSn_e5kBqsieBa7O3y2iARyHrgmC4JUY9xL3y2YcsOMykryVWPkKAFxEad7upp9JlLym1SYxgq89VMWcHTAtgBhWoq7uD09MF19PsRTx_gzPVzvTZnNf7LvGevZLBfLaAfCF8TttdcSg7a0DXk="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe4XPqfvfv5tdyekma6aE_S8BRUonJRqkorQktolDYZr75jLepV9k4u6Z-xFylQR_AP0TqTvKliGAVVgVidIOIdIqO6_NMZsKB95BllTjXXtW9niOShBtAu3QyCQRaMrx9BS-ACzmEID2CjL0osVSlhP1jf2gHl7ZAgl5w2mF3Z4DQCw=="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbX4WgeaH27aoNxlaNcVfDUtbUyiR5fbemN-71hysFX3CLOZvG6JSj4TSCJa2dDemp334Zy-99b56jne7q67Y1n47d0i9tn-b9h8jxB_8tfseJFz5p1022NV5ustPdO-n8_rCBo8KoE_R2RF-kZe9UCdq-CPVhf2xNvAANo-TdDcRvCBvqUlI45qJurgYBG6g="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHO3OMQ8DcNSoFe3L-_VipfcMMRsCPObSdZvPtB8gnPTaYIwbJMXrrSNHxlkNkUXdnZwbM4BIzk8zAhOW4zMuxUwaegMRD9NeuIpq8BEVzRFSBtajqqNa923JU="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFt-pE9vpIPDdrrU3E6KtVrPRIhcS1YBL6FYMOgAkqnT27aUlo3LLH1-SyDYA3uLZVh96dU-f1McsN31ScKzdR01dlXMW3gI8tsgn_3xWuYnhIQ7M35QjymDiLHyLg28zQcAXP41F37gNwNUCUI5nDD-g7HtWkzbU3aykCY74I-tCsJvOzej_xVXu42g-NeozIcz4Uo75_cKpf1YjGimVRSjvMCkw-Pq3pU7kj68OwkNeLaAA=="
    },
    {
      title: "caspianpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQeyUuEZ6qD0KkH-bPkttfFRfOhZlbmURy2YJ6GYX5oMfT274L8E1P8UnxoMF8jN-YPsQrDHqyIHP2V-_TaY09TRsjgw8XnGTm1wy0TxzRouIS931Foc-fhwXRMaaQqz27j34XHjjFkDA7u_DQkCDGLyILKNL0UuiwpDh5LW0k0zflQo7QF0-6onSqIcsvAAzKwGtd"
    },
    {
      title: "straits.live",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJ0iww1fHL7DBFKM2N0leQirYNkrVIT62IrsldLp7xk97keeMmdPuZSVhqxSbQEgFctP6P4S1t4B-9nHUZPoiYEcdpNOUHjlQrmGu0m0Pg"
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQxgSIfbfWZGydC9o9xAxEglyrUAXHFvJW6GQ5Bec3WOVN3_EQPwLISEXctn7JjoQD-PK-fXl14K_UOMecbHAhzHXN-wPCSI1Npsn3UbPWg2qL39r_mZGjkZCFEhg3i9pUtXzYGSRYhw=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH301Rr4GccyuXHE9Sa7NAOmRZlsPgJKx0GUeKPNb70hlyr9iinSnuU3ySKBc9UU9t4gmT85fU3C3_uBT9yuUN_EdhG8MtAxjhUYYAQhgr_gqYqzJ2KKTfdTq_lKuSdUbMxca83LIg="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjNEfax5B6rHhtLQCHybyoDx3k3X4H0Yb_D3Brt3XVQw_5akQYogUjLQxLlQA7ngcpzcHxn84odWnzyw7s9Yvg3qNgjORTAcr6tCacQXFGXM8fi9Fc4mK82S1QS7S6-UxqjFHTSJSMPy0gSmbVKv8_4uhovHTExaA2m3FceOSBLu9BBJ1jPf6yCRsH6RnsScezVu29avJlGpcrlxhz23fud1sCZmR2LuDj"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtrNwNKExbDAMloPWrOEI4TNclYozXnH9LCwbODIed-WrubVa0qSp-EZa22hUzpn5NxdIFz5K4NrH2QQYsT_BkVUf3i7CuO7uhZSjLteXCFcpXf9Lj"
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5ootQSu0wiuKddwVKyikEMQ_hmwgMobb40dG3L1zpGtj8_Mmn_zz1x80tU9DCt0CR2biZgLiTJNZVY2p15paiSRdD0GCRBhwu5N9MpCcAyIABv5glHuDtI66KCmJH-f_t5-y4Ww=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status update May 2024",
    "US Iran military tension news May 13 2024 AP Reuters",
    "WTI Brent crude oil price range May 13 2024 Reuters Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-13",
  version: "v2.62",
  riskScore: 78,
  scoreTrend: [
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D74",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $102.40–$104.80 · Brent $107.35–$109.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
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
      description: "Frequent interceptions of Iranian missiles/drones by US forces; surgical strikes against launch sites reported.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "The strait remains operationally paralyzed for major commercial tankers with throughput at 5-10%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Prices stabilized in the $100-120 crisis band, reflecting sustained blockade risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "US-China consensus against Iranian tolls marks a significant diplomatic shift in the maritime crisis.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Peace talks are stalled as Trump labels Iran's proposal 'totally unacceptable'.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-China Anti-Toll Consensus",
      description: "Both nations agree no state should impose tolls in Hormuz, undermining Iran's regulatory claims.",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Hormuz Fire Exchange",
      description: "US Navy intercepts Iranian attacks; retaliatory strikes hit Iranian military facilities.",
      verification: "confirmed",
      timestamp: "2026-05-11",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Qatar LNG Limited Transit",
      description: "Windward monitors small-scale LNG transit under Pakistan-mediated 'controlled conditions'.",
      verification: "partial",
      timestamp: "2026-05-11",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Operational paralysis of commercial traffic continues",
      "Brinkmanship between US naval assets and Iranian coastal defenses",
      "Energy markets pricing in mid-term structural supply loss"
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
        "Continue: High-frequency drone/missile standoff near the strait entrance.",
        "Change: Shift toward targeted US kinetic responses against IRGC launch infrastructure."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Mass rerouting via the Cape of Good Hope adds 14 transit days.",
        "Change: Massive collapse in AIS visibility as tankers operate under EMCON/Dark conditions."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude plateauing above $107/bbl due to 'sticky' risk premiums.",
        "Change: First LNG transits since February offer minor psychological relief to gas markets."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Pakistan mediating between Washington and Tehran without a breakthrough.",
        "Change: Trump signals termination of ceasefire hostilities if Iran persists with tolls."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iranian sovereignty claims vs. International High Seas transit rights",
      "US domestic electoral pressure vs. European NATO allies' fear of prolonged war"
    ],
    military: [
      "Naval blockade suppression vs. Asymmetric swarm and land-based missile threats"
    ]
  },
  keyChange: "The sudden US-China diplomatic alignment on maritime freedom vs the imminent collapse of the April ceasefire.",
  investmentSignal: "→ Increase exposure to Energy and Defense sectors; Maintain long positions in commodities to hedge structural inflation.",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNaWKeirlG282QxrCJpJ3sQbI2x39j-d4x63Q8C3gdtTvqlt5mLOspaMTz-kHTRQwW8TMRZNELdLHT-pypaDR5Q5vK-KHJrl5mwXBboXdaE9YGEi4w1spRyzOFmn27-kUjDs4PptJGsUw-0xBHbGs5LTQc5zA0Vctz4l6S74uz9bh1OgN5pxJjNQ6pM_0Vh4qpeoI="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHnNg8QeuQp6tTqkDR7nKSn_e5kBqsieBa7O3y2iARyHrgmC4JUY9xL3y2YcsOMykryVWPkKAFxEad7upp9JlLym1SYxgq89VMWcHTAtgBhWoq7uD09MF19PsRTx_gzPVzvTZnNf7LvGevZLBfLaAfCF8TttdcSg7a0DXk="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe4XPqfvfv5tdyekma6aE_S8BRUonJRqkorQktolDYZr75jLepV9k4u6Z-xFylQR_AP0TqTvKliGAVVgVidIOIdIqO6_NMZsKB95BllTjXXtW9niOShBtAu3QyCQRaMrx9BS-ACzmEID2CjL0osVSlhP1jf2gHl7ZAgl5w2mF3Z4DQCw=="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbX4WgeaH27aoNxlaNcVfDUtbUyiR5fbemN-71hysFX3CLOZvG6JSj4TSCJa2dDemp334Zy-99b56jne7q67Y1n47d0i9tn-b9h8jxB_8tfseJFz5p1022NV5ustPdO-n8_rCBo8KoE_R2RF-kZe9UCdq-CPVhf2xNvAANo-TdDcRvCBvqUlI45qJurgYBG6g="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHO3OMQ8DcNSoFe3L-_VipfcMMRsCPObSdZvPtB8gnPTaYIwbJMXrrSNHxlkNkUXdnZwbM4BIzk8zAhOW4zMuxUwaegMRD9NeuIpq8BEVzRFSBtajqqNa923JU="
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFt-pE9vpIPDdrrU3E6KtVrPRIhcS1YBL6FYMOgAkqnT27aUlo3LLH1-SyDYA3uLZVh96dU-f1McsN31ScKzdR01dlXMW3gI8tsgn_3xWuYnhIQ7M35QjymDiLHyLg28zQcAXP41F37gNwNUCUI5nDD-g7HtWkzbU3aykCY74I-tCsJvOzej_xVXu42g-NeozIcz4Uo75_cKpf1YjGimVRSjvMCkw-Pq3pU7kj68OwkNeLaAA=="
    },
    {
      title: "caspianpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQeyUuEZ6qD0KkH-bPkttfFRfOhZlbmURy2YJ6GYX5oMfT274L8E1P8UnxoMF8jN-YPsQrDHqyIHP2V-_TaY09TRsjgw8XnGTm1wy0TxzRouIS931Foc-fhwXRMaaQqz27j34XHjjFkDA7u_DQkCDGLyILKNL0UuiwpDh5LW0k0zflQo7QF0-6onSqIcsvAAzKwGtd"
    },
    {
      title: "straits.live",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJ0iww1fHL7DBFKM2N0leQirYNkrVIT62IrsldLp7xk97keeMmdPuZSVhqxSbQEgFctP6P4S1t4B-9nHUZPoiYEcdpNOUHjlQrmGu0m0Pg"
    },
    {
      title: "britannica.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQxgSIfbfWZGydC9o9xAxEglyrUAXHFvJW6GQ5Bec3WOVN3_EQPwLISEXctn7JjoQD-PK-fXl14K_UOMecbHAhzHXN-wPCSI1Npsn3UbPWg2qL39r_mZGjkZCFEhg3i9pUtXzYGSRYhw=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH301Rr4GccyuXHE9Sa7NAOmRZlsPgJKx0GUeKPNb70hlyr9iinSnuU3ySKBc9UU9t4gmT85fU3C3_uBT9yuUN_EdhG8MtAxjhUYYAQhgr_gqYqzJ2KKTfdTq_lKuSdUbMxca83LIg="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjNEfax5B6rHhtLQCHybyoDx3k3X4H0Yb_D3Brt3XVQw_5akQYogUjLQxLlQA7ngcpzcHxn84odWnzyw7s9Yvg3qNgjORTAcr6tCacQXFGXM8fi9Fc4mK82S1QS7S6-UxqjFHTSJSMPy0gSmbVKv8_4uhovHTExaA2m3FceOSBLu9BBJ1jPf6yCRsH6RnsScezVu29avJlGpcrlxhz23fud1sCZmR2LuDj"
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtrNwNKExbDAMloPWrOEI4TNclYozXnH9LCwbODIed-WrubVa0qSp-EZa22hUzpn5NxdIFz5K4NrH2QQYsT_BkVUf3i7CuO7uhZSjLteXCFcpXf9Lj"
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5ootQSu0wiuKddwVKyikEMQ_hmwgMobb40dG3L1zpGtj8_Mmn_zz1x80tU9DCt0CR2biZgLiTJNZVY2p15paiSRdD0GCRBhwu5N9MpCcAyIABv5glHuDtI66KCmJH-f_t5-y4Ww=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status update May 2024",
    "US Iran military tension news May 13 2024 AP Reuters",
    "WTI Brent crude oil price range May 13 2024 Reuters Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.62 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 78（↓6）：美中外交层面在“反征税”议题上的意外合流，以及美伊停火协议因立场互不退让而濒临失效。",
    bannerWarning: "→ 增持能源与国防军工板块，利用大宗商品多头头寸对冲结构性通胀风险。",
    deescalationIntent: "伊朗的领海主权征税主张与国际公海通行权的根本冲突",
    structuralRisk: "海峡实质性处于“关闭”或“极端受限”状态，商业航行几乎停止。",
    contradictionNote: "伊朗的领海主权征税主张与国际公海通行权的根本冲突；美军区域封锁压制与伊朗非对称“蜂群”反制战术的博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第74天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.62 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 78 (↓6): The sudden US-China diplomatic alignment on maritime freedom vs the imminent collapse of the April ceasefire.",
    bannerWarning: "→ Increase exposure to Energy and Defense sectors; Maintain long positions in commodities to hedge structural inflation.",
    deescalationIntent: "Iranian sovereignty claims vs. International High Seas transit rights",
    structuralRisk: "The strait remains operationally paralyzed for major commercial tankers with throughput at 5-10%.",
    contradictionNote: "Iranian sovereignty claims vs. International High Seas transit rights; Naval blockade suppression vs. Asymmetric swarm and land-based missile threats",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 74",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
