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
  date: "2026-04-20",
  version: "v2.39",
  riskScore: 72,
  riskTrend: [
    {
      date: "2026-04-16",
      score: 76
    },
    {
      date: "2026-04-17",
      score: 72
    },
    {
      date: "2026-04-18",
      score: 60
    },
    {
      date: "2026-04-19",
      score: 68
    },
    {
      date: "2026-04-20",
      score: 72
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D51",
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
      value: "WTI $84.35–$89.04 · Brent $94.35–$97.50",
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
      prev: 3,
      weight: 0.2,
      description: "美伊发生直接海上摩擦，美军驱逐舰扣押伊朗“Tosca”号导致局势实质升级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡通航陷入停滞，伊朗宣布撤销短暂的复航承诺，重新实施严密封锁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "油价随对抗升级而反弹，但绝对价格区间回落至$100下方，市场处于紧平衡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美方维持封锁烈度并由高级别外交团队介入，俄罗斯对封锁表示关切但未直接干预。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "由于扣船事件及互信丧失，原定的和平曙光被削弱，谈判进入高压摊牌阶段。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军扣押伊朗“Tosca”号货轮",
      description: "美军驱逐舰在阿曼湾瘫痪并扣押一艘试图突围的伊朗货轮，系本次封锁以来首例。",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "油价报复性上涨超6%",
      description: "WTI原油周一冲至$89，收复周末大部分跌幅，受海峡局势不确定性驱动。",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗法医组织确认死亡人数",
      description: "战争爆发51天以来已有3375人确认死亡，暴露了冲突造成的惨重人道代价。",
      verification: "single",
      timestamp: "2026-04-20",
      significance: ""
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊双方从远程空袭转向面对面的海上截击与报复性夺船。",
      "霍尔木兹海峡成为双方外交博弈的核心筹码，而非单纯的航道。",
      "国际社会斡旋重点转向延长即将到期的临时停火协议。"
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
        "变化：美海军驱逐舰直接介入商船拦截，导致资产受损。",
        "变化：伊朗启动无人机群对美军舰艇实施战术驱离。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行效率维持在正常水平的5%以下。",
        "变化：伊朗官方明确将航道安全与取消石油制裁挂钩。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：市场重新定价封锁风险，WTI回升至$89一线。",
        "延续：大宗商品呈现地缘避险属性，波动性加剧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗总统裴泽希齐扬表达对美外交的不信任。",
        "延续：特朗普重申“极限施压”政策在达成交易前不会停止。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求伊方完全停止核浓缩及导弹试验作为解除封锁的前提。",
      "伊方要求先撤销封锁作为进入实质性核谈判的条件。"
    ],
    military: [
      "海上拦截主权与航行自由权之间的激烈冲突。",
      "常规报复手段向高价值资产打击的升级压力。"
    ]
  },
  keyChange: "美军从防御性封锁转为进攻性扣押，导致双方互信归零。",
  investmentSignal: "→ 维持能源防御性头寸，减持高溢价风险资产。",
  change: "up",
  prevRiskScore: 68,
  scoreTrend: [
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72,
      active: true
    }
  ],
  webSources: [
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHibCLxH5olZ7jNsS-KfwoCHUDt-o5wav9TqUuRNEc9p9O1dmbLQ6qNd3efXE0L2CK3pgiK1oMKYiX4hQKNxR4PmbfGlYizx-cdx50WQY7EkgQAqh-_K2aZajHop45KzqKIoy10Jb5hhAb0bua5Rf2WU4GyoECr7FP9YfJVPaBXQO6MnMs"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGY-x6xbdaxI-BYsVv8suGDCLQPzMWafGNciMmYr8rEgKcltnpgVtMQx0wyiOGw6A87WQKry3NvjbiAgT3FZqdUeSUZzHziq-CC3Y6yHPh3hV8ylrXMlbrbFvSarJUTvZicQWHvWhuy7X8iDw=="
    },
    {
      title: "bairdmaritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHunZpOReTeel2h77TqkvDdenhxqyT6ZjEXyo1uAGXtv1IhBXN9n-qzPpZxUJ6qpoJf36osnkp86YZJB94ODfdJiQWzYKhjn6xHLBZ2iRvGil0cGbq6qH5gbo3k9tgapo7JyjE_94LHMF7yGos-UxyRPI8mu2CuZmjoZcSVMnATpEMUh9zuDFb_UjDMCarTfbN0oZn-cjj6nQ=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHI_V3M4xW9-bEH0aanD1bNPhOHGmilz9Q4Ja3Uj3zQivmi4g2ce0BHfIuak5GDSxbTJi_7T8NNvdp1mypOW-vg8CjpvhEqdpxLPLzHlBCwLDRPPmxMqW-rbsdtFFMncpj77hgdsVg7jh65IepDVvwrZ7RQPdy3gZHkeA=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAT-UZ0itlQZxkOIP6KbuCI7AdQnHCwUDsExVHHqG5B-zVuSfIhhz9cE6e3RR9V0Wm3OsKJTO2xl1kFL1iMhBpyT39Ow77iHPT945jU7D80U-xzVpEl4PV41yN"
    },
    {
      title: "2news.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEEiXi4qyZwu1dol5zm5fegtDX0TH0iFGWNv7Ex8LxqzJrn7LNAz2zBXSp6HE93SaHQ5HnmC8tTP7NNt7VoYieU1skWfKSlSQskDquIiM2rfwW7-OfUxOW7ajJOAxR4PqDMeJfVwu8aUpcIjnS-9rpagPq0PjA2e_qP2hfOcJXnC2MhSXiqwZ8L2oUJ3MLAzHdly_s3x_u5oDZlX5FGcTGWhLCUoiOD5dAmHQDJ5ui-psogOQWvfdgFSgC7CZRGgerNWYu_NJhcgcH8vWUfN7MCKtVnCJ6s5GF1dAI4EKM="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlivMybf4XNNbv78DuIOxQZr0ZZNAcji8kEeviED0grPdJR4-xcwrUYted5sMU-JWYpwM4811XzpCcpMde-1mR_qnmwwPh51VeA3JPhIASkBL0RYHXntLOpdZFMILa8zxYwpWeTFrE1Q=="
    },
    {
      title: "nationthailand.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFP8AnOqKcUBFUe8uQQlsZnYF9I4anJDId09jW1Y0OYJl8JyzK6dC_kGPmKvlo2E9BATNLZmpCa8ZUoW1dAUdUwIqtGURI1PQ_Ls504KREugQaZnQJSvgdB4A4FOatqhSY18UcueFzvCEb0Bia6"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping status April 20 2024",
    "latest US Iran Israel conflict news April 20 2024",
    "WTI Brent oil price range April 19 20 2024 trend"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-20",
  version: "v2.39",
  riskScore: 72,
  riskTrend: [
    {
      date: "2026-04-16",
      score: 76
    },
    {
      date: "2026-04-17",
      score: 72
    },
    {
      date: "2026-04-18",
      score: 60
    },
    {
      date: "2026-04-19",
      score: 68
    },
    {
      date: "2026-04-20",
      score: 72
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D51",
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
      value: "WTI $84.35–$89.04 · Brent $94.35–$97.50",
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
      prev: 3,
      weight: 0.2,
      description: "Direct maritime friction as US Navy seizes an Iranian vessel, marking a significant escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait remains at a standstill as Iran reneges on brief reopening promise.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4,
      weight: 0.2,
      description: "Prices rebound on conflict news but remain within the $85-100 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "High-level US diplomatic mission (VP Vance) balanced by naval enforcement.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Fragile ceasefire window closing as ship seizure erodes mutual trust.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Seizure of Iranian Vessel 'Tosca'",
      description: "USS Spruance intercepted and disabled an Iranian-flagged cargo ship in the Gulf of Oman.",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Oil Prices Surge over 6%",
      description: "WTI crude futures jumped back to $89 on Monday driven by Hormuz escalations.",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Iran Death Toll Surpasses 3,300",
      description: "Forensic reports confirm 3,375 killed since the start of the conflict.",
      verification: "single",
      timestamp: "2026-04-20",
      significance: ""
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from proxy strikes to direct face-to-face maritime seizures.",
      "The Strait of Hormuz is now the primary lever for diplomatic leverage.",
      "International focus shifts to preventing the expiration of the ceasefire."
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
        "Change: US Navy directly intercepts commercial assets, damaging engines.",
        "Change: Iran deploys drone swarms for tactical harassment of US warships."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Traffic remains below 5% of pre-war capacity.",
        "Change: Passage rights explicitly linked to oil sanction relief."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Market re-prices blockade risk; WTI recovers to $89.",
        "Continue: Geopolitical hedging drives high volatility in commodities."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian President Pezeshkian voices deep distrust in US diplomacy.",
        "Continue: Trump reiterates blockade will stay until a deal is signed."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demands nuclear freeze; Iran demands immediate sanction relief.",
      "Zero-sum approach to Hormuz security vs. international law."
    ],
    military: [
      "Direct naval confrontation vs. proxy containment strategies.",
      "Escalation pressure on high-value maritime assets."
    ]
  },
  keyChange: "US shift from defensive blockade to offensive seizure resets diplomatic trust to zero.",
  investmentSignal: "→ Maintain energy defensive positions, reduce high-premium risk assets.",
  change: "up",
  prevRiskScore: 68,
  scoreTrend: [
    {
      date: "04-16",
      score: 72
    },
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72,
      active: true
    }
  ],
  webSources: [
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHibCLxH5olZ7jNsS-KfwoCHUDt-o5wav9TqUuRNEc9p9O1dmbLQ6qNd3efXE0L2CK3pgiK1oMKYiX4hQKNxR4PmbfGlYizx-cdx50WQY7EkgQAqh-_K2aZajHop45KzqKIoy10Jb5hhAb0bua5Rf2WU4GyoECr7FP9YfJVPaBXQO6MnMs"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGY-x6xbdaxI-BYsVv8suGDCLQPzMWafGNciMmYr8rEgKcltnpgVtMQx0wyiOGw6A87WQKry3NvjbiAgT3FZqdUeSUZzHziq-CC3Y6yHPh3hV8ylrXMlbrbFvSarJUTvZicQWHvWhuy7X8iDw=="
    },
    {
      title: "bairdmaritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHunZpOReTeel2h77TqkvDdenhxqyT6ZjEXyo1uAGXtv1IhBXN9n-qzPpZxUJ6qpoJf36osnkp86YZJB94ODfdJiQWzYKhjn6xHLBZ2iRvGil0cGbq6qH5gbo3k9tgapo7JyjE_94LHMF7yGos-UxyRPI8mu2CuZmjoZcSVMnATpEMUh9zuDFb_UjDMCarTfbN0oZn-cjj6nQ=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHI_V3M4xW9-bEH0aanD1bNPhOHGmilz9Q4Ja3Uj3zQivmi4g2ce0BHfIuak5GDSxbTJi_7T8NNvdp1mypOW-vg8CjpvhEqdpxLPLzHlBCwLDRPPmxMqW-rbsdtFFMncpj77hgdsVg7jh65IepDVvwrZ7RQPdy3gZHkeA=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAT-UZ0itlQZxkOIP6KbuCI7AdQnHCwUDsExVHHqG5B-zVuSfIhhz9cE6e3RR9V0Wm3OsKJTO2xl1kFL1iMhBpyT39Ow77iHPT945jU7D80U-xzVpEl4PV41yN"
    },
    {
      title: "2news.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEEiXi4qyZwu1dol5zm5fegtDX0TH0iFGWNv7Ex8LxqzJrn7LNAz2zBXSp6HE93SaHQ5HnmC8tTP7NNt7VoYieU1skWfKSlSQskDquIiM2rfwW7-OfUxOW7ajJOAxR4PqDMeJfVwu8aUpcIjnS-9rpagPq0PjA2e_qP2hfOcJXnC2MhSXiqwZ8L2oUJ3MLAzHdly_s3x_u5oDZlX5FGcTGWhLCUoiOD5dAmHQDJ5ui-psogOQWvfdgFSgC7CZRGgerNWYu_NJhcgcH8vWUfN7MCKtVnCJ6s5GF1dAI4EKM="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlivMybf4XNNbv78DuIOxQZr0ZZNAcji8kEeviED0grPdJR4-xcwrUYted5sMU-JWYpwM4811XzpCcpMde-1mR_qnmwwPh51VeA3JPhIASkBL0RYHXntLOpdZFMILa8zxYwpWeTFrE1Q=="
    },
    {
      title: "nationthailand.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFP8AnOqKcUBFUe8uQQlsZnYF9I4anJDId09jW1Y0OYJl8JyzK6dC_kGPmKvlo2E9BATNLZmpCa8ZUoW1dAUdUwIqtGURI1PQ_Ls504KREugQaZnQJSvgdB4A4FOatqhSY18UcueFzvCEb0Bia6"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping status April 20 2024",
    "latest US Iran Israel conflict news April 20 2024",
    "WTI Brent oil price range April 19 20 2024 trend"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.39 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（↑4）：美军从防御性封锁转为进攻性扣押，导致双方互信归零。",
    bannerWarning: "→ 维持能源防御性头寸，减持高溢价风险资产。",
    deescalationIntent: "美方要求伊方完全停止核浓缩及导弹试验作为解除封锁的前提。",
    structuralRisk: "海峡通航陷入停滞，伊朗宣布撤销短暂的复航承诺，重新实施严密封锁。",
    contradictionNote: "美方要求伊方完全停止核浓缩及导弹试验作为解除封锁的前提。；海上拦截主权与航行自由权之间的激烈冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第51天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.39 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (↑4): US shift from defensive blockade to offensive seizure resets diplomatic trust to zero.",
    bannerWarning: "→ Maintain energy defensive positions, reduce high-premium risk assets.",
    deescalationIntent: "US demands nuclear freeze; Iran demands immediate sanction relief.",
    structuralRisk: "Strait remains at a standstill as Iran reneges on brief reopening promise.",
    contradictionNote: "US demands nuclear freeze; Iran demands immediate sanction relief.; Direct naval confrontation vs. proxy containment strategies.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 51",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
