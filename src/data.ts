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
  date: "2026-05-17",
  version: "v2.67",
  keyStats: [
    {
      label: "冲突天数",
      value: "D78",
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
      value: "WTI $101.03–$104.29 · Brent $105.62–$109.26",
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
      description: "美以协调针对伊朗核心能源及核设施的潜在打击计划。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通航进入“伊朗许可制”新阶段，通航成本与风险陡增。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价维持在危机带区间，市场计入长期航道溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中美在海峡问题上进行高层试探，但美军封锁仍是域内主导力量。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道虽存，但实质突破几近于零，停火濒临破裂。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  scoreTrend: [
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美以备战计划曝光",
      description: "NYT 报道称美以正考虑在未来一周内对伊朗基建发起高强度空袭。",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "欧洲就航道通行接触 IRGC",
      description: "法新社确认欧洲国家开始就船只通过伊朗控制的海峡区域进行技术性谈判。",
      verification: "confirmed",
      timestamp: "2026-05-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "特朗普宣布停火垂危",
      description: "特朗普公开表示对谈判进展极度不满，暗示单边军事行动可能性增加。",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-04",
      title: "伊朗海峡收费系统上线",
      description: "伊朗议会称将对通过其“专业管理协议”的船只收取服务费。",
      verification: "confirmed",
      timestamp: "2026-05-17",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议进入破裂倒计时",
      "海峡通行逻辑由“自由航行”转向“双头管理”",
      "大国博弈重心转向战后秩序与能源定价权"
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
        "变化：美军三栖作战部队在 USS Tripoli 周边加强演训。",
        "延续：美军持续拦截试图突破封锁进入伊朗港口的油轮。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗革命卫队正式向部分东亚和欧洲船只发放通行配额。",
        "变化：Linerlytica 报告显示经苏伊士运河的原油绕行率维持高位。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特油价在 $105 以上高位盘整，波动率指数 VIX 同比翻倍。",
        "延续：亚洲买家对伊朗收费机制的定价影响持观望态度。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普称伊朗 response 绝不可接受（Totally Unacceptable）。",
        "变化：中方坚持外交降级是避免能源市场二次崩溃的唯一出路。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊朗永久放弃浓缩铀与海峡收费权",
      "伊朗要求全面解除制裁并承认其海峡管辖权"
    ],
    military: [
      "美以打击计划与伊朗防御弹性间的博弈",
      "非对称战争手段（无人机/水雷）对高价值航道资产的威胁"
    ]
  },
  keyChange: "美以公开讨论重启战事计划，导致停火溢价重新回归市场。",
  investmentSignal: "→ 维持防御性策略，对冲能源供应中断风险",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElH1n8P7LR3nqpGGqZrvd7voUJjLiNCPIH_aXwURDA7HwSD5WG_isTx5E_z0rAsP1hwT8gO0UksVXO80KgqDZM6eKRSl5xt_mXq5mSwPHh1LKDXSRnnY1L8aO0eehH9ck7bI-a-EE_jfkU31lSvbhgsivEOA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVuFrG1z_qHHL5VxVfnTl0FW5aWM5XfapWZ8HrwzdYHnbsS1iaBOiP8U-21gXvqDQfCWNtGTJpFB-BY23ptyZheP2DtoIei6Y7UA9qglKFW1FAg-7HVdLi1_p8KXTzyZRUNEtpFAJpeE45EvlZ9Ii9"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEg-pzLZtwCn__8uRwcDTjahERukoyhYmUEoS3HlS5w9hqbXo_gGv20-AhzBM44t14gyup5abzNXNHIpoPpuucE9bTij-ww31MFSBHRiWfCLu_J4Rquky8bW74gWXjEB5W7a9Ng6ibdViib8khvk3LIVvtQR-nBfGjI_yYZGyGk-Osefg9FbvtnMaVtg_lFz0j6M1l_cwnine9APv19cKbyyhw-9FSKIWDEaTqK0oxm7eipZ5F0Muue5GXL6c31JZI2t0WZedP0DJwYQ7M_ZIQwjqZpjL0RmR9jFo="
    },
    {
      title: "rootdata.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVtVu_rfSgq3_OcEPuXtK2xGs44x1VJT1qyuEwNxw-K7jReEoe_Yg_2iOlH0SQUdl6eprd1sdtUZsOZVC9KM6HTK11upTdoTki4sDqFROMkSUtg5bQ5ri27QI5V2xa"
    },
    {
      title: "tbsnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBqzOwd4K3XOA6S7j_u_n6cGV0-WmDYAQnfuY5JYAN99lMfZ1rhIyrqR0pRY7t8RrTFTp0Et4nQI7nix9BtEQ_GbDyy4JDyY3VehG9nDhao5IT6gon6xvKt_E7D88i6ggpwEJD5OWay8B_DlM1_6HUrJtnbjavNaopcZwOPj9XjpKJQ8XI41lvOlZcMHFswWr7MzWdbhIcERBDQCTTEg4P2Aa6"
    },
    {
      title: "bssnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFohkiQDBm6SlN3XZNOvY5Hqgq2k0FFJsIW7MU1QbNAOWPnBMVdknDSeY5_78lorSFvSMeJiZoFLL8aQfyO_qxjiFyKl6qGezfBF6lpw58rfyfvJ0j6jMyE2el7GLNb304pWjnMv08="
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMgpxTFyHwcdZ_YAtGnUwImQM1IRughkFMoTNNLMuuf0ypxPklCf9Sn9fClwOZVubiSb9oF9csH970uXViqquYKUpu7RzZFFrJ8L5kAlGVbyMIKA4WJx4zCg8JA9laSjWA5jQ7XMV09uo4mTK_5dSwHVN9D8GIhTmNzclYapsWauCVGGKan01BXvqLYKUaZYribTr4xhYtK2JcFIDhWRGUOhy9eCYGRECl"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8tI2w8sYPJGVAHzCynbPKV_RwBRNFAlUMOGAuniHctyborXYEwV8NMN1kxJ6WiAMFtcP98VhnBDHk8_YfU2adJN2asMyqmgXYw2ewemDXfDDZCMMAJHaNBKn2kmUs6lg7qA=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMFZQngTOzELkoj3sNKm6GnUK1PUuCx4Km0fmRpMRkRtu1zpIncFnQHVB5bVwsKkG0avaOYILxa8_giBsXHNPZLVeLuFGE0fDu8NV-dLQJwnnbYnzvxPytjSqFyRcAA0m0voKU8KLPhO8NUkxIJ6U4f4jTxqWpJaS9u3hhvup88Z7mGfgE_IHBG4jXncSQYEp7_1HftGVFjfrs"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFxjfVQ3ZChe0wrTB9qBkdzxu_1VnJJAmCo0mRBCB8SecexbH7lOqp1xabUiOlX3bxwhL649URWYVzbXvLSPIBVcivaRYxh0rBFuvS9BXKHaYuak7rsWbhWmbG3KEAkNKcdhs7i2iff1tqXOgm6k-p_wf0hB5pwwJlY9TuPVUXfomLa2aC0JVwuPsaVCoSSgXd3hAcVRZY4XcM9pgfaX0KjVtImgUQBcSh3Ykk-"
    },
    {
      title: "theweek.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbb3tldqSQaqxX8fSvdCtHOpGkKr4RzjrNJL5EqsCwe6yg37NDIULfjr_Ra1pmQQBmFojjZZfRcIs9BjiNRCjalW24KT3OieTNyOPycTvBuQ_CXDBUTtwHm1gqolL0pDEDkUahhdzEBmCUIATaXSicyS7lHQBKKI586alruVw1"
    },
    {
      title: "reddit.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwmIwWDjH716uEcR_zTJc-RichnEW98fxlvqVdbOmgDSWBTr_u6CyOUQGzVAI8CiBKHj-lKqYfZZH-I0jAKnFhnPPDFumUryFiCG_IrkiNApZX6y9b3DxoOUuSitDXcLO2Qo7-2edNWgZWE3b_7xqHa-f-O_uMja2s_oJezywlb7s4IKcfJ58uW2mBmRkNabY7zMNpEq8="
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe1_FeQjifoDAVwnUk7Q3g3z0ocIKzTQ-KcgnAPvWoaC0xnY4gETexJ7UWoWx1ZSzDGu_0rzxKoAf2aMuxIvBobTS2mrnGi8czFFoMeICIOgLlI7fpjF2QeXDjfglqG0RmGtYW0KPCFg_bT36-XmkecyjipqMzK8bG6uyuEeTco3-STy59xf2UtPW_hSV1BAOD5eU0_5gZkNAA3g=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status news May 17 2026",
    "WTI Brent oil prices range May 17 2026 trend news",
    "US Iran conflict news May 17 2026 DOD White House IRGC"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-17",
  version: "v2.67",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D78",
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
      value: "WTI $101.03–$104.29 · Brent $105.62–$109.26",
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
      description: "US and Israel coordinating potential renewed strikes on nuclear sites.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran asserts sovereignty with toll and permit mechanisms.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Prices stabilized in crisis territory due to long-term supply anxiety.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintaining blockade while China attempts to mediate a reopening.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Ceasefire is effectively failing as both sides harden positions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 80,
  scoreTrend: [
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80
    },
    {
      date: "05-16",
      score: 80
    },
    {
      date: "05-17",
      score: 80,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Israel War Prep Leaked",
      description: "NYT reports planning for bombing raids on Iranian infrastructure in the coming week.",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Europe-IRGC Transit Talks",
      description: "AFP confirms European negotiators seeking IRGC permission for shipping passage.",
      verification: "confirmed",
      timestamp: "2026-05-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Trump Declares Ceasefire Dying",
      description: "President Trump signals end of patience with Iranian negotiation tactics.",
      verification: "confirmed",
      timestamp: "2026-05-16",
      significance: "",
      highlight: true,
      critical: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire enters collapse countdown",
      "Chokepoint logic shifts from freedom of navigation to managed access",
      "Great power focus shifts to post-war order and energy pricing"
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
        "Change: US Navy Marine Raid Forces conducting high-intensity drills near USS Tripoli.",
        "Continue: US blockade of Iranian ports remains fully operational under War Powers Act."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran officially unveiling 'professional mechanism' for maritime traffic tolls.",
        "Continue: Global shipping liners avoiding the strait without IRGC or US Navy escort."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude futures consolidate above $105/bbl floor.",
        "Continue: Growing hedging activity against WTI-Brent spread volatility."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump labels Iranian counter-proposals as 'TOTALLY UNACCEPTABLE'.",
        "Continue: China cautions against military 'Project Freedom' implementation."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for permanent halt to enrichment vs Iran's demand for sovereignty recognition",
      "Dispute over legality of Strait of Hormuz tolling systems"
    ],
    military: [
      "Conventional strike readiness vs asymmetrical escalation threats"
    ]
  },
  keyChange: "US-Israel public disclosure of renewed war planning brings conflict risk back to peak levels.",
  investmentSignal: "→ Maintain energy and safe-haven hedges against supply disruption risks",
  change: "none",
  prevRiskScore: 80,
  webSources: [
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElH1n8P7LR3nqpGGqZrvd7voUJjLiNCPIH_aXwURDA7HwSD5WG_isTx5E_z0rAsP1hwT8gO0UksVXO80KgqDZM6eKRSl5xt_mXq5mSwPHh1LKDXSRnnY1L8aO0eehH9ck7bI-a-EE_jfkU31lSvbhgsivEOA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVuFrG1z_qHHL5VxVfnTl0FW5aWM5XfapWZ8HrwzdYHnbsS1iaBOiP8U-21gXvqDQfCWNtGTJpFB-BY23ptyZheP2DtoIei6Y7UA9qglKFW1FAg-7HVdLi1_p8KXTzyZRUNEtpFAJpeE45EvlZ9Ii9"
    },
    {
      title: "litefinance.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEg-pzLZtwCn__8uRwcDTjahERukoyhYmUEoS3HlS5w9hqbXo_gGv20-AhzBM44t14gyup5abzNXNHIpoPpuucE9bTij-ww31MFSBHRiWfCLu_J4Rquky8bW74gWXjEB5W7a9Ng6ibdViib8khvk3LIVvtQR-nBfGjI_yYZGyGk-Osefg9FbvtnMaVtg_lFz0j6M1l_cwnine9APv19cKbyyhw-9FSKIWDEaTqK0oxm7eipZ5F0Muue5GXL6c31JZI2t0WZedP0DJwYQ7M_ZIQwjqZpjL0RmR9jFo="
    },
    {
      title: "rootdata.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVtVu_rfSgq3_OcEPuXtK2xGs44x1VJT1qyuEwNxw-K7jReEoe_Yg_2iOlH0SQUdl6eprd1sdtUZsOZVC9KM6HTK11upTdoTki4sDqFROMkSUtg5bQ5ri27QI5V2xa"
    },
    {
      title: "tbsnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBqzOwd4K3XOA6S7j_u_n6cGV0-WmDYAQnfuY5JYAN99lMfZ1rhIyrqR0pRY7t8RrTFTp0Et4nQI7nix9BtEQ_GbDyy4JDyY3VehG9nDhao5IT6gon6xvKt_E7D88i6ggpwEJD5OWay8B_DlM1_6HUrJtnbjavNaopcZwOPj9XjpKJQ8XI41lvOlZcMHFswWr7MzWdbhIcERBDQCTTEg4P2Aa6"
    },
    {
      title: "bssnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFohkiQDBm6SlN3XZNOvY5Hqgq2k0FFJsIW7MU1QbNAOWPnBMVdknDSeY5_78lorSFvSMeJiZoFLL8aQfyO_qxjiFyKl6qGezfBF6lpw58rfyfvJ0j6jMyE2el7GLNb304pWjnMv08="
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMgpxTFyHwcdZ_YAtGnUwImQM1IRughkFMoTNNLMuuf0ypxPklCf9Sn9fClwOZVubiSb9oF9csH970uXViqquYKUpu7RzZFFrJ8L5kAlGVbyMIKA4WJx4zCg8JA9laSjWA5jQ7XMV09uo4mTK_5dSwHVN9D8GIhTmNzclYapsWauCVGGKan01BXvqLYKUaZYribTr4xhYtK2JcFIDhWRGUOhy9eCYGRECl"
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8tI2w8sYPJGVAHzCynbPKV_RwBRNFAlUMOGAuniHctyborXYEwV8NMN1kxJ6WiAMFtcP98VhnBDHk8_YfU2adJN2asMyqmgXYw2ewemDXfDDZCMMAJHaNBKn2kmUs6lg7qA=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMFZQngTOzELkoj3sNKm6GnUK1PUuCx4Km0fmRpMRkRtu1zpIncFnQHVB5bVwsKkG0avaOYILxa8_giBsXHNPZLVeLuFGE0fDu8NV-dLQJwnnbYnzvxPytjSqFyRcAA0m0voKU8KLPhO8NUkxIJ6U4f4jTxqWpJaS9u3hhvup88Z7mGfgE_IHBG4jXncSQYEp7_1HftGVFjfrs"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFxjfVQ3ZChe0wrTB9qBkdzxu_1VnJJAmCo0mRBCB8SecexbH7lOqp1xabUiOlX3bxwhL649URWYVzbXvLSPIBVcivaRYxh0rBFuvS9BXKHaYuak7rsWbhWmbG3KEAkNKcdhs7i2iff1tqXOgm6k-p_wf0hB5pwwJlY9TuPVUXfomLa2aC0JVwuPsaVCoSSgXd3hAcVRZY4XcM9pgfaX0KjVtImgUQBcSh3Ykk-"
    },
    {
      title: "theweek.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbb3tldqSQaqxX8fSvdCtHOpGkKr4RzjrNJL5EqsCwe6yg37NDIULfjr_Ra1pmQQBmFojjZZfRcIs9BjiNRCjalW24KT3OieTNyOPycTvBuQ_CXDBUTtwHm1gqolL0pDEDkUahhdzEBmCUIATaXSicyS7lHQBKKI586alruVw1"
    },
    {
      title: "reddit.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwmIwWDjH716uEcR_zTJc-RichnEW98fxlvqVdbOmgDSWBTr_u6CyOUQGzVAI8CiBKHj-lKqYfZZH-I0jAKnFhnPPDFumUryFiCG_IrkiNApZX6y9b3DxoOUuSitDXcLO2Qo7-2edNWgZWE3b_7xqHa-f-O_uMja2s_oJezywlb7s4IKcfJ58uW2mBmRkNabY7zMNpEq8="
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe1_FeQjifoDAVwnUk7Q3g3z0ocIKzTQ-KcgnAPvWoaC0xnY4gETexJ7UWoWx1ZSzDGu_0rzxKoAf2aMuxIvBobTS2mrnGi8czFFoMeICIOgLlI7fpjF2QeXDjfglqG0RmGtYW0KPCFg_bT36-XmkecyjipqMzK8bG6uyuEeTco3-STy59xf2UtPW_hSV1BAOD5eU0_5gZkNAA3g=="
    }
  ],
  webSearchQueries: [
    "Strait of Hormuz shipping status news May 17 2026",
    "WTI Brent oil prices range May 17 2026 trend news",
    "US Iran conflict news May 17 2026 DOD White House IRGC"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月17日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.67 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（持平）：美以公开讨论重启战事计划，导致停火溢价重新回归市场。",
    bannerWarning: "→ 维持防御性策略，对冲能源供应中断风险",
    deescalationIntent: "美方要求伊朗永久放弃浓缩铀与海峡收费权",
    structuralRisk: "海峡通航进入“伊朗许可制”新阶段，通航成本与风险陡增。",
    contradictionNote: "美方要求伊朗永久放弃浓缩铀与海峡收费权；美以打击计划与伊朗防御弹性间的博弈",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第78天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 17 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.67 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (Flat): US-Israel public disclosure of renewed war planning brings conflict risk back to peak levels.",
    bannerWarning: "→ Maintain energy and safe-haven hedges against supply disruption risks",
    deescalationIntent: "US demand for permanent halt to enrichment vs Iran's demand for sovereignty rec…",
    structuralRisk: "Iran asserts sovereignty with toll and permit mechanisms.",
    contradictionNote: "US demand for permanent halt to enrichment vs Iran's demand for sovereignty recognition; Conventional strike readiness vs asymmetrical escalation threats",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 78",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
