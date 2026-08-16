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
  date: "2026-08-16",
  version: "v2.159",
  riskScore: 76,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D169",
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
      value: "WTI $81.50–$84.20 · Brent $87.50–$89.50",
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
      description: "美军航母战斗群轮换及针对阿联酋商业目标的袭击增加。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗宣称对海峡拥有完全控制权，商业通行面临物理打击威胁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent油价在$85-100区间徘徊，EIA上调预期显示长期供应紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国维持无限期海上封锁，大国军事存在处于冷战后最高水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交渠道停滞，解封条件与黎巴嫩/加沙战事深度挂钩。",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "ADNOC货轮在海峡遭袭",
      description: "阿联酋官方确认ADNOC船只周五晚遭袭，无伤亡，但证实了航道内针对能源基建的定点打击风险。",
      verification: "confirmed",
      timestamp: "2026-08-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC宣布海峡处于“关闭状态”",
      description: "伊朗卫队司令称德黑兰已实现对海峡的绝对监控，且目前任何未经许可的船只均无法通过。",
      verification: "confirmed",
      timestamp: "2026-08-14",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "商业航运目标的常态化打击风险",
      "美军长期封锁导致的兵力与心理极限测试",
      "多区域冲突（黎巴嫩、叙利亚）与海峡问题的强耦合"
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
        "变化：美军启动航母大队战略轮换，派遣乔治·华盛顿号部署中东。",
        "延续：代理人武装维持对驻叙美军基地的低频袭扰。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：阿联酋商业船舶遇袭，证实攻击面已向第三方能源物流扩散。",
        "延续：海峡商业航道处于实质性半瘫痪状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：地缘溢价支撑Brent价格在$85-90区间稳固。",
        "变化：市场开始计入“无限期封锁”导致的长期结构性赤字。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗将解封与黎巴嫩停火挂钩，展现出进攻性的外交筹码。",
        "延续：美方坚守 blockade-first 策略，拒绝单方面让步。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求全区域停火与美方坚持通过封锁施压的根本矛盾。",
      "第三方中立调解渠道因先决条件过高而失效。"
    ],
    military: [
      "航道封锁的物理有效性与美方护航力量长期部署疲劳的矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "08-12",
      score: 74
    },
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
      score: 76,
      active: true
    }
  ],
  keyChange: "ADNOC船舶遭袭标志着海峡安全风险从言语威胁转向物理常态化攻击。",
  investmentSignal: "→ 防御：维持能源与黄金避险部位，防御海峡封锁导致的物理供应中断风险。",
  prevRiskScore: 76,
  webSources: [
    {
      title: "chinadailyhk.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEshkAZzaNd74RiewLe0rasx2n4FF-i54uc9qu7M9pKUPE-FkiLorOWLaYVCBWDqv0gOVmg1PGfuubBMem8wlCXhOaEn3ckGRb98MZgpxI01lzS3d6kiWVIUsLqNd1p-pdFsL2z"
    },
    {
      title: "caspiannews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRhEWpCa31_PBhNHM5vaGAdoBRzynEW1kLVNQEeEx3jfyWxyoHwMnnpzFnp2chcu1wfbSV1g9W6_iMFxNh6VBB5GyP1-uhW0VXwsuExPWu9ZsHf09BCsWYSfcTKC4ITELXvC8lZk4O00gk04_VU8QHmjq7oS0ljpR-spyCG6eBNo2jFhEOwwiy4IB3AA4_xeujrVpDhuG9YQ8="
    },
    {
      title: "tasnimnews.ir",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKkyglTjvdcQfddbhZl4gzk33uabIxb855pOmIOwEpMyAe7Sn3tfPmmfI3g71DFfxW3Pgd71SmNVkJBi1dIMSM0PP0fMhDxGkj_I88o8tIeEmUB2gYvJXlTNpPIRSzARMFMn_TMW-aX5tED9j78E9YjJVnJmRNuKMrJMI0kkF7A65eY71X8NkpI-KDmWo3sY5ZXuYLY7yi"
    },
    {
      title: "keranews.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-lL2vH7abaV7tRDzU_smVTXFmYby6eg1cYdAspF5oFiivzoameo3QWR3ioNFb4RHKXJ4zuazK4knmBEmbRnbUPgnSevcMEjx6sKHK6Q-WoAV492-5zVfHjGJF1ajV9Us4o6OhuYy-cDv6Ybb4SwWp4lvb2OCw4bgcwYN5u-I-DZmN89oPlvis0Uu1QhVq8QLokSnBzfKr0FL0n6dDMdbdskplQMDRzqIhOzqS"
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-xufWrw9Kpm7BZjr9-sUjsLn-aJXeIlKHKi99GDSQoETuGkTSV1P70QMSghNIq_Ub3v0Mk-9zl3QMbq9Ou8hlKpidaVya_xE_8tGa98r7x9vpvqn-Kl8seLqRNUwd7K0w_ZNdzgNkSJmQYFfUq-OMpfagjQVQQGTdEOZIEekBr004EwA1X_6aViqkGrhi8E1rxwvd8DKgiVuLTDUEGYr4cFFl5ZkGE45vhvdo4GDpgDkCONUXojXQYSChJfBIiH3gaMA52sHflw=="
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH0hwDjOGd3QBcN8JSSwUYWPJaI2W5oNE5aMQJ1whnVMr7ItmM68MHWaNRuBPjC4j09g4myexu_Dq9PrMzaMsyqz_gBVYOS7n5rKxJ_18vyWtGKIPe6rYAD9rUA1eNKTLjduLpDuVmMlc9HwEthON-9uZzet-1Jf738g90A9TBg-2_Wof-lN0_D_DSybJ18EWlKytf4Z1P2rFbTNRmLHEE1hdzOKBG07LyiB_biYcd6bep"
    },
    {
      title: "cdispatch.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFW4DTgAZrL121JFZqEoVvvTd_a_mKSF0wJiVyuux0z1pHSWknXsxjkeRvUaqo_pJDMGxXamjbfNf8W_7SVphqgOtSBpDkllJ8sx7u5-csUynmpAsnFUqvHz5xfybsWpDo-rVXTdeNf6Sjv168p33QQB-1hzAbLToS2q2CDLAkpaHIUJ6LomPdDyIn6vchxgTmGqH8T-9q2ksArSEH2Hfz6-ddaPQpY4gdqNSupdw=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFZUc7MwrcuAUq0ANJ5BPGT2mlA5N0wukhrtn-atoTd8mJevJ2x2KlNEO5f81-UgoxoJTT3qe121OPjl1rkr497Ytbg5s69m4NbXo17c_V73mxbNbd3pHh8czpLR5qqVMOgEGOHlTYSEYLFmj7eoHUNCigIL5dLw2QcD83JGfAdUt6XYAjjCSOqqs3TGwqPp_C93SIJoakPycr0BbX4VPEdeTPXV4="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1U0OWSSckMFchvbcxAdycXYd6SNUNHwrEp4GFB_djtLMlfLf9FCCTUwe4NIXJrKX3QdtbgxE6fVNa0wnOIFhzn56Dbyp7j2pNzkXqVe5Ng9VhMDUWJ75QeX1ylIQNPOmRLijav2sb4NCo0G4TBD5DfrT_sT6O84Ok1N7q6jYNZK4xSdKNzVETSHR3xW6DH6jcbPRdDOOHySKjOjsCcYhmLdN1gw=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend August 16 2026",
    "US Iran military conflict news August 16 2026 Strait of Hormuz carrier deployment",
    "IRGC naval exercise Strait of Hormuz August 16 2026",
    "US base Al-Tanf Syria attack August 16 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-16",
  version: "v2.159",
  riskScore: 76,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D169",
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
      value: "WTI $81.50–$84.20 · Brent $87.50–$89.50",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Serious Restriction",
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
      description: "US carrier rotation and physical attacks on energy vessels underscore high-intensity standoff.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran claims total control; transit severely restricted by both blockade and physical threat.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Brent stays in $85-100 range with significant supply concerns projected by EIA.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Indefinite US blockade supported by multi-carrier deployments and regional alliances.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Diplomatic deadlock as Iran ties de-escalation to broader regional conflicts.",
      status: "FAST",
      sourceVerification: "partial"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "ADNOC Tanker Attacked in Strait",
      description: "UAE confirms an ADNOC vessel was struck Friday evening; no casualties reported, but physical risks to third-party shipping verified.",
      verification: "confirmed",
      timestamp: "2026-08-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "IRGC Declares Strait 'Closed'",
      description: "Iranian naval commander asserts full control over all movements, declaring the strategic waterway effectively shut.",
      verification: "confirmed",
      timestamp: "2026-08-14",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Targeting of commercial energy infrastructure",
      "Stress test of US naval rotation and crew resilience",
      "Deep coupling between Hormuz transit and regional fronts"
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
        "Change: US Navy initiates strategic rotation with USS George Washington deploying to Mideast.",
        "Continue: Low-frequency proxy harassment of US assets in Syria persists."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Attacks expanded to UAE energy vessels, verifying transit risk for regional neutrals.",
        "Continue: Strait transit remains at historical lows under dual pressure."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Geopolitical premium maintains Brent support between $85-90.",
        "Change: Markets pricing in structural deficits from indefinite blockade."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran demands Lebanon ceasefire as a precondition for de-escalation.",
        "Continue: US maintains 'no-concession' blockade stance."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Clash between Iran's regional linkage strategy and US maximum pressure blockade.",
      "Collapse of mediation due to high entry barriers for talks."
    ],
    military: [
      "Sustainability of naval blockade versus the growing fatigue of long-term maritime deployments."
    ]
  },
  scoreTrend: [
    {
      date: "08-12",
      score: 74
    },
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
      score: 76,
      active: true
    }
  ],
  keyChange: "Attack on ADNOC vessels signals a shift from rhetorical threats to verified physical targeting of neutral energy logistics.",
  investmentSignal: "→ Defensive: Maintain energy and safe-haven exposure to hedge against physical supply chain disruptions.",
  prevRiskScore: 76,
  webSources: [
    {
      title: "chinadailyhk.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEshkAZzaNd74RiewLe0rasx2n4FF-i54uc9qu7M9pKUPE-FkiLorOWLaYVCBWDqv0gOVmg1PGfuubBMem8wlCXhOaEn3ckGRb98MZgpxI01lzS3d6kiWVIUsLqNd1p-pdFsL2z"
    },
    {
      title: "caspiannews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRhEWpCa31_PBhNHM5vaGAdoBRzynEW1kLVNQEeEx3jfyWxyoHwMnnpzFnp2chcu1wfbSV1g9W6_iMFxNh6VBB5GyP1-uhW0VXwsuExPWu9ZsHf09BCsWYSfcTKC4ITELXvC8lZk4O00gk04_VU8QHmjq7oS0ljpR-spyCG6eBNo2jFhEOwwiy4IB3AA4_xeujrVpDhuG9YQ8="
    },
    {
      title: "tasnimnews.ir",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKkyglTjvdcQfddbhZl4gzk33uabIxb855pOmIOwEpMyAe7Sn3tfPmmfI3g71DFfxW3Pgd71SmNVkJBi1dIMSM0PP0fMhDxGkj_I88o8tIeEmUB2gYvJXlTNpPIRSzARMFMn_TMW-aX5tED9j78E9YjJVnJmRNuKMrJMI0kkF7A65eY71X8NkpI-KDmWo3sY5ZXuYLY7yi"
    },
    {
      title: "keranews.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-lL2vH7abaV7tRDzU_smVTXFmYby6eg1cYdAspF5oFiivzoameo3QWR3ioNFb4RHKXJ4zuazK4knmBEmbRnbUPgnSevcMEjx6sKHK6Q-WoAV492-5zVfHjGJF1ajV9Us4o6OhuYy-cDv6Ybb4SwWp4lvb2OCw4bgcwYN5u-I-DZmN89oPlvis0Uu1QhVq8QLokSnBzfKr0FL0n6dDMdbdskplQMDRzqIhOzqS"
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-xufWrw9Kpm7BZjr9-sUjsLn-aJXeIlKHKi99GDSQoETuGkTSV1P70QMSghNIq_Ub3v0Mk-9zl3QMbq9Ou8hlKpidaVya_xE_8tGa98r7x9vpvqn-Kl8seLqRNUwd7K0w_ZNdzgNkSJmQYFfUq-OMpfagjQVQQGTdEOZIEekBr004EwA1X_6aViqkGrhi8E1rxwvd8DKgiVuLTDUEGYr4cFFl5ZkGE45vhvdo4GDpgDkCONUXojXQYSChJfBIiH3gaMA52sHflw=="
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFH0hwDjOGd3QBcN8JSSwUYWPJaI2W5oNE5aMQJ1whnVMr7ItmM68MHWaNRuBPjC4j09g4myexu_Dq9PrMzaMsyqz_gBVYOS7n5rKxJ_18vyWtGKIPe6rYAD9rUA1eNKTLjduLpDuVmMlc9HwEthON-9uZzet-1Jf738g90A9TBg-2_Wof-lN0_D_DSybJ18EWlKytf4Z1P2rFbTNRmLHEE1hdzOKBG07LyiB_biYcd6bep"
    },
    {
      title: "cdispatch.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFW4DTgAZrL121JFZqEoVvvTd_a_mKSF0wJiVyuux0z1pHSWknXsxjkeRvUaqo_pJDMGxXamjbfNf8W_7SVphqgOtSBpDkllJ8sx7u5-csUynmpAsnFUqvHz5xfybsWpDo-rVXTdeNf6Sjv168p33QQB-1hzAbLToS2q2CDLAkpaHIUJ6LomPdDyIn6vchxgTmGqH8T-9q2ksArSEH2Hfz6-ddaPQpY4gdqNSupdw=="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFZUc7MwrcuAUq0ANJ5BPGT2mlA5N0wukhrtn-atoTd8mJevJ2x2KlNEO5f81-UgoxoJTT3qe121OPjl1rkr497Ytbg5s69m4NbXo17c_V73mxbNbd3pHh8czpLR5qqVMOgEGOHlTYSEYLFmj7eoHUNCigIL5dLw2QcD83JGfAdUt6XYAjjCSOqqs3TGwqPp_C93SIJoakPycr0BbX4VPEdeTPXV4="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1U0OWSSckMFchvbcxAdycXYd6SNUNHwrEp4GFB_djtLMlfLf9FCCTUwe4NIXJrKX3QdtbgxE6fVNa0wnOIFhzn56Dbyp7j2pNzkXqVe5Ng9VhMDUWJ75QeX1ylIQNPOmRLijav2sb4NCo0G4TBD5DfrT_sT6O84Ok1N7q6jYNZK4xSdKNzVETSHR3xW6DH6jcbPRdDOOHySKjOjsCcYhmLdN1gw=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend August 16 2026",
    "US Iran military conflict news August 16 2026 Strait of Hormuz carrier deployment",
    "IRGC naval exercise Strait of Hormuz August 16 2026",
    "US base Al-Tanf Syria attack August 16 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.159 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：ADNOC船舶遭袭标志着海峡安全风险从言语威胁转向物理常态化攻击。",
    bannerWarning: "→ 防御：维持能源与黄金避险部位，防御海峡封锁导致的物理供应中断风险。",
    deescalationIntent: "伊朗要求全区域停火与美方坚持通过封锁施压的根本矛盾。",
    structuralRisk: "伊朗宣称对海峡拥有完全控制权，商业通行面临物理打击威胁。",
    contradictionNote: "伊朗要求全区域停火与美方坚持通过封锁施压的根本矛盾。；航道封锁的物理有效性与美方护航力量长期部署疲劳的矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第169天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.159 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): Attack on ADNOC vessels signals a shift from rhetorical threats to verified physical targeting of neutral energy logistics.",
    bannerWarning: "→ Defensive: Maintain energy and safe-haven exposure to hedge against physical supply chain disruptions.",
    deescalationIntent: "Clash between Iran's regional linkage strategy and US maximum pressure blockade.",
    structuralRisk: "Iran claims total control; transit severely restricted by both blockade and physical threat.",
    contradictionNote: "Clash between Iran's regional linkage strategy and US maximum pressure blockade.; Sustainability of naval blockade versus the growing fatigue of long-term mari…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 169",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
