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
  date: "2026-05-03",
  version: "v2.51",
  riskScore: 84,
  keyStats: [
    {
      label: "冲突天数",
      value: "D64",
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
      value: "WTI $145.08–$154.91 · Brent $106.23–$112.45",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "闭锁对抗",
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
      description: "美伊直接交火频率增加，伊朗导弹对美军昂贵侦察设备及防空系统造成物理损毁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡实质性关闭，保险费率处于不可保状态，全球供应链遭受断裂性冲击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "油价进入危机带，IEA报告强调双重封锁（美方对伊封锁与伊朗对海峡封锁）导致供应极度紧张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国军事资源从中欧向中东战略倾斜，对盟友军援力度加大，介入呈防御性扩张。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "特朗普政府公开否决德黑兰的最新提案，双方目前无任何有效沟通渠道。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美方正式拒绝停火提案",
      description: "白宫称伊朗关于“收取海峡过路费”的提议是敲诈行为，拒绝重返谈判桌。来源：Reuters。",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "WTI油价突破150美元关口",
      description: "受供应焦虑及美伊对抗升级驱动，原油期货日内振幅加大。来源：Investing.com。",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "美军从德国调兵增援中东",
      description: "五角大楼将5000名驻德美军转调至冲突地区以加固防线。来源：AP。",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Spirit航空公司破产",
      description: "受高油价及战争引发的航空需求萎缩影响，Spirit成为首家倒闭的大型美资航司。来源：Al Jazeera。",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: ""
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊外交完全冻结，军事对峙进入消耗战模式。",
      "霍尔木兹海峡成为事实上被封锁的军事缓冲区。",
      "经济制裁与能源战深度耦合，波及全球民生经济。"
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
        "延续：伊朗无人机群对波斯湾内美军舰船及雷达阵地保持高频试探性打击。",
        "变化：美方启用86亿美元紧急军援，重点转向防空消耗战与高价值资产保护。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡主要航道被IRGC海军封锁，多艘商船仍被滞留于伊朗港口。",
        "变化：影子船队突破能力增强，伊朗油轮HUGE号被发现绕道太平洋运输。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价维持在$110-$150极端区间，市场对长期供应中断已形成定价共识。",
        "变化：IEA警告全球农产品及能源供应链将面临灾难性压力。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普明确表示拒绝任何涉及让渡海峡管辖权的交易，战争动员言论升温。",
        "延续：尽管存在军事对抗，FIFA仍确认伊朗将参与北美的世界杯赛事，呈现奇特政体割裂。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国“极限施压”战略与伊朗“地缘杠杆”控制权的零和博弈。",
      "特朗普个人意志对国际自由航行规则的重新界定与冲击。"
    ],
    military: [
      "伊朗低成本饱和打击能力对美军高价值技术资产的非对称损耗。",
      "美方海上封锁力量与伊朗本土近海防御力量的长期对峙。"
    ]
  },
  scoreTrend: [
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84,
      active: true
    }
  ],
  keyChange: "美方正式否决谈判提案导致地缘风险溢价全面爆发，能源分数从温和上调至危机级别。",
  investmentSignal: "→ 增持能源与大宗商品，维持风险资产空头头寸及避险资产防御。",
  change: "up",
  prevRiskScore: 80,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG6Lutr6l1D6IunJoH9kUIfx_2Sco9qKQ6npZkKy2_yR8bWfmda7Cu7sLDQxQBF5FMugsOhn2j7TrNxqxrK7wZCJVraSdpRM46hMF_yth4y9mD8c6LcMIOpLIsB36-SteTb6P0GeRjtHHn-GqrZi-vnikyeDYrlTGWVbYl1sO36VaCM8Og="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVUqcmGYQEx_xxuwAgfdcok0U9O5yzH6FP94RsnIRLudDGunE518uMSnqr6a3JswZloi4ZS7TfQYAo1kStlbygDVZVb2h9pyu3Wc0mh-lv93rwaajvXjF9R0hcOnoaN-SSWMJ2npY0r1FJ460kUdv7uA=="
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5qPj77ZW_Zqw4MAZe2hBTjn8adA2oHp6sRmmzQ_7iK6boy26kILPh3oXWsjCsbnCvp-RAnZL0uP4yQJemyzVKtMkYep6AZP8eIuyMVfsh4Vsx71HoYCGfIVcc3Sq3-D-BJcAzwYEyb_J_gr2OzzS3ijeQPi3o3U7Ze7V-S2yW8_SOPTbwInGKvIE5xFo6vB-BahN2CrIA2kwNn-c0cspPJbIX2Hc5VaYVsuGlWfQkyHas7qZMGGGvT6qHyk47tw=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHaAihobFtzQf5HbnevSsy4XVm7gLGtmiISjh-3NBOVEyqsnuP4Bq935GryY6Og8_Pmrop3lMKdslPRsO2LDc8k2y2Ru_E6orNUeJkmvAmZU98Q0hwJ5HafYFNnE7qjeIq30ZRkXoML6frAMTVN87sfDU2ZGo8ISWPG_FY-gkd7MhMwbhcy51CYWbvAnQ5HIOYBtyrAYjKeUKygw9DhtqcAzbIHuGVxWv1zYw=="
    },
    {
      title: "tribuneindia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFb-tay_Np2l-qYVbCGq7JH7kQViZ6qWn6AqbXewE2S3b6pa_ZiItJk67_-4_FYUeJcdtuSsKmvwP5t6BaESFEw6YxBXknAtHeU7u73AIHjainrAWUYJ0rPanWsiAdndS34EwB54z0o6lct8xesgYs_5gEDNMxZxCFsCN8oUgIN0Jf1iV0iqjbkKyWDWrfB8kSV4pZ8WCSQrGZK9PTiwlBjDSQjXLGFuvQ6Q82SC9i2UEteFWw8UKQNFfVS2xJdMnmSaFCkY4xKQ99JAUTt6lpLbU2jd_DljcBxN2RTVA=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2n6ykFbHUfiNTFvhoZxU3vIH4UI22LJYjT_lcUmaLdbEkuTNkoas3fdnRGlJMqeSMy6awP4GBdQQq7Z6mE_MagUl4AkSKBvLqDju1SxjanFK-P86l4d1XjtU8DqIfLkd4daiv5lA-8ZxB_ZoONElKrrbaEGho-jG46Q=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGCnhmw6WqjIj9wrSikd4mpPjk6NV7yFR_o0hT2495_K7v3RLoRc620v4DTm5racoMquH5MBE7-CQjvYC1Np3t6K2wi39EyCxIdnXy_j3LhfIgDxAO5xUuBbY2EKMlkygUMAvXalVQbAMz-MoWMNX8c_3Kis_IIQ6keGbvriGoPiXfs2tuA1xLI9m8-GL_I6lhehu5ZVAr_gPX4L0l6Su7HyY7qnJZTtjpq"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping news May 3 2024 TankerTrackers",
    "WTI Brent oil price range May 2-3 2024 Reuters Bloomberg",
    "US Iran tensions news May 3 2024 Reuters AP Al Jazeera"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-03",
  version: "v2.51",
  riskScore: 84,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D64",
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
      value: "WTI $145.08–$154.91 · Brent $106.23–$112.45",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Blockade Confrontation",
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
      description: "Increasing frequency of direct skirmishes; Iranian missiles caused physical damage to high-value US reconnaissance and air defense assets.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Effective closure of the strait; insurance premiums are in an uninsurable state; global supply chains face disruptive shocks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Oil prices enter the crisis belt; IEA highlights extreme supply tightness due to the double blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US redeploying assets from Europe to Mideast; increased military aid to allies; intervention expanding defensively.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Trump administration publicly rejects Tehran's latest proposal; no effective communication channels remain.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Formally Rejects Ceasefire Proposal",
      description: "White House labels Iranian proposal for 'transit fees' as blackmail, refuses to return to talks. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "WTI Oil Breaks $150 Barrier",
      description: "Driven by supply anxiety and escalation of US-Iran standoff. Source: Investing.com.",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "US Troops Redeployed from Germany",
      description: "Pentagon moves 5,000 soldiers to the conflict theater to reinforce defensive lines. Source: AP.",
      verification: "confirmed",
      timestamp: "2026-05-02",
      significance: ""
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Diplomatic channels frozen; military standoff shifts to war of attrition.",
      "Strait of Hormuz remains a de facto militarized blockade zone.",
      "Deep coupling of economic sanctions and energy warfare affecting global livelihoods."
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
        "Continue: Iranian drone swarms maintain high-frequency probing attacks on US naval vessels and radar sites.",
        "Change: US activates $8.6B emergency arms sales focusing on air defense and asset protection."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Main shipping lanes remain blocked by IRGC Navy; commercial vessels still detained.",
        "Change: Shadow fleet breakout capability increases; Iranian tanker 'HUGE' identified bypassing blockades via Pacific."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Oil prices sustained in the $110-$150 extreme range; supply disruption consensus reached.",
        "Change: IEA warns of catastrophic pressure on global agrifood and energy supply chains."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump explicitly rejects any deal involving jurisdiction over the strait; mobilization rhetoric rises.",
        "Continue: FIFA confirms Iran's WC 2026 participation despite conflict, showing a unique political disconnect."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum game between US 'Maximum Pressure' and Iranian 'Geopolitical Leverage'.",
      "Impact of Trump's personal policy on international freedom of navigation rules."
    ],
    military: [
      "Asymmetric attrition of US high-value technical assets by low-cost Iranian swarm strikes.",
      "Long-term standoff between US naval blockade and Iranian littoral defense forces."
    ]
  },
  scoreTrend: [
    {
      date: "04-29",
      score: 80
    },
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84,
      active: true
    }
  ],
  keyChange: "US formal rejection of the proposal triggered a surge in geopolitical risk premiums, elevating energy risk to crisis levels.",
  investmentSignal: "→ Increase holdings in Energy and Commodities; maintain Short positions on Risk Assets and Defensive Hedges.",
  change: "up",
  prevRiskScore: 80,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG6Lutr6l1D6IunJoH9kUIfx_2Sco9qKQ6npZkKy2_yR8bWfmda7Cu7sLDQxQBF5FMugsOhn2j7TrNxqxrK7wZCJVraSdpRM46hMF_yth4y9mD8c6LcMIOpLIsB36-SteTb6P0GeRjtHHn-GqrZi-vnikyeDYrlTGWVbYl1sO36VaCM8Og="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVUqcmGYQEx_xxuwAgfdcok0U9O5yzH6FP94RsnIRLudDGunE518uMSnqr6a3JswZloi4ZS7TfQYAo1kStlbygDVZVb2h9pyu3Wc0mh-lv93rwaajvXjF9R0hcOnoaN-SSWMJ2npY0r1FJ460kUdv7uA=="
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5qPj77ZW_Zqw4MAZe2hBTjn8adA2oHp6sRmmzQ_7iK6boy26kILPh3oXWsjCsbnCvp-RAnZL0uP4yQJemyzVKtMkYep6AZP8eIuyMVfsh4Vsx71HoYCGfIVcc3Sq3-D-BJcAzwYEyb_J_gr2OzzS3ijeQPi3o3U7Ze7V-S2yW8_SOPTbwInGKvIE5xFo6vB-BahN2CrIA2kwNn-c0cspPJbIX2Hc5VaYVsuGlWfQkyHas7qZMGGGvT6qHyk47tw=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHaAihobFtzQf5HbnevSsy4XVm7gLGtmiISjh-3NBOVEyqsnuP4Bq935GryY6Og8_Pmrop3lMKdslPRsO2LDc8k2y2Ru_E6orNUeJkmvAmZU98Q0hwJ5HafYFNnE7qjeIq30ZRkXoML6frAMTVN87sfDU2ZGo8ISWPG_FY-gkd7MhMwbhcy51CYWbvAnQ5HIOYBtyrAYjKeUKygw9DhtqcAzbIHuGVxWv1zYw=="
    },
    {
      title: "tribuneindia.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFb-tay_Np2l-qYVbCGq7JH7kQViZ6qWn6AqbXewE2S3b6pa_ZiItJk67_-4_FYUeJcdtuSsKmvwP5t6BaESFEw6YxBXknAtHeU7u73AIHjainrAWUYJ0rPanWsiAdndS34EwB54z0o6lct8xesgYs_5gEDNMxZxCFsCN8oUgIN0Jf1iV0iqjbkKyWDWrfB8kSV4pZ8WCSQrGZK9PTiwlBjDSQjXLGFuvQ6Q82SC9i2UEteFWw8UKQNFfVS2xJdMnmSaFCkY4xKQ99JAUTt6lpLbU2jd_DljcBxN2RTVA=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2n6ykFbHUfiNTFvhoZxU3vIH4UI22LJYjT_lcUmaLdbEkuTNkoas3fdnRGlJMqeSMy6awP4GBdQQq7Z6mE_MagUl4AkSKBvLqDju1SxjanFK-P86l4d1XjtU8DqIfLkd4daiv5lA-8ZxB_ZoONElKrrbaEGho-jG46Q=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGCnhmw6WqjIj9wrSikd4mpPjk6NV7yFR_o0hT2495_K7v3RLoRc620v4DTm5racoMquH5MBE7-CQjvYC1Np3t6K2wi39EyCxIdnXy_j3LhfIgDxAO5xUuBbY2EKMlkygUMAvXalVQbAMz-MoWMNX8c_3Kis_IIQ6keGbvriGoPiXfs2tuA1xLI9m8-GL_I6lhehu5ZVAr_gPX4L0l6Su7HyY7qnJZTtjpq"
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping news May 3 2024 TankerTrackers",
    "WTI Brent oil price range May 2-3 2024 Reuters Bloomberg",
    "US Iran tensions news May 3 2024 Reuters AP Al Jazeera"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月3日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.51 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（↑4）：美方正式否决谈判提案导致地缘风险溢价全面爆发，能源分数从温和上调至危机级别。",
    bannerWarning: "→ 增持能源与大宗商品，维持风险资产空头头寸及避险资产防御。",
    deescalationIntent: "美国“极限施压”战略与伊朗“地缘杠杆”控制权的零和博弈。",
    structuralRisk: "海峡实质性关闭，保险费率处于不可保状态，全球供应链遭受断裂性冲击。",
    contradictionNote: "美国“极限施压”战略与伊朗“地缘杠杆”控制权的零和博弈。；伊朗低成本饱和打击能力对美军高价值技术资产的非对称损耗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第64天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 3 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.51 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (↑4): US formal rejection of the proposal triggered a surge in geopolitical risk premiums, elevating energy risk to crisis levels.",
    bannerWarning: "→ Increase holdings in Energy and Commodities; maintain Short positions on Risk Assets and Defensive Hedges.",
    deescalationIntent: "Zero-sum game between US 'Maximum Pressure' and Iranian 'Geopolitical Leverage'.",
    structuralRisk: "Effective closure of the strait; insurance premiums are in an uninsurable state; global supply chai…",
    contradictionNote: "Zero-sum game between US 'Maximum Pressure' and Iranian 'Geopolitical Leverage'.; Asymmetric attrition of US high-value technical assets by low-cost Iranian sw…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 64",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
