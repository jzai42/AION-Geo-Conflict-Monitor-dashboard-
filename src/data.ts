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
  date: "2026-07-24",
  version: "v2.135",
  riskScore: 94,
  riskScoreTrend: [
    {
      date: "2026-07-20",
      score: 98
    },
    {
      date: "2026-07-21",
      score: 98
    },
    {
      date: "2026-07-22",
      score: 98
    },
    {
      date: "2026-07-23",
      score: 94
    },
    {
      date: "2026-07-24",
      score: 94
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D146",
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
      value: "WTI $89.69–$92.19 · Brent $97.83–$101.16",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军连续13晚对伊朗境内目标实施直接打击，特朗普威胁发起更大规模行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗维持事实上封锁，24小时航道吞吐量仅为正常水平的10%左右。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "布伦特油价重回100美元关口，曼德海峡受袭加剧了全球原油供应的恐慌。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国在中东部署超5万名官兵；情报调查显示俄罗斯可能在向伊朗提供协助。",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "临时停火协议彻底废弃，双方立场转向完全军事解决。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "红海沙特油轮遭袭",
      description: "胡塞武装使用导弹袭击了两艘沙特超大型原油轮，开辟第二海上战场。来源：Reuters, CBS",
      verification: "confirmed",
      timestamp: "2026-07-24 02:45 AM EDT",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军第13晚打击行动",
      description: "CENTCOM通报打击了Qeshm岛附近的监视站点和指挥节点。来源：AL-Monitor",
      verification: "confirmed",
      timestamp: "2026-07-24 00:00 AM",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "油价刺穿$100关口",
      description: "受红海局势升级影响，布伦特原油自5月以来首次刺破100美元。来源：Investing.com",
      verification: "confirmed",
      timestamp: "2026-07-24 08:00 AM",
      significance: ""
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "冲突从波斯湾单轴线演变为海湾-红海双轴线。",
      "美伊直接对抗进入半常态化夜晚空袭模式。",
      "外交谈判渠道在实质性对抗中完全断绝。"
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
        "延续：美军维持每晚对伊朗海岸防卫设施的精确清除行动。",
        "变化：美军增加部署了更多空中加油机，预示未来可能发动更大航程的打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡保持红区封锁状态，保险费率维持在5%的极端水平。",
        "变化：红海曼德海峡从“风险区”转为“冲突区”，导致最后一条波斯湾替代航线受威胁。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油现货市场由于双航道危机出现恐慌性买盘，布伦特主力价格站稳100美元。",
        "延续：美国石油库存由于进口中断持续超预期消耗。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：特朗普在Truth Social上连续发布针对伊朗基建的威胁言论。",
        "变化：伊朗最高领袖办公室重申不接受任何基于“海峡开放”为前提的胁迫性对话。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方的“极限施压”回归与伊方“以战促和”逻辑的彻底决裂。",
      "美国大选临近导致的对外政策高敏感度与中东冲突深化的结构性冲突。"
    ],
    military: [
      "海峡封锁能力（伊朗）与航行自由执行力（美国）之间的实地消耗战。",
      "代理人骚扰策略向直接国家级对抗的无序滑坡。"
    ]
  },
  keyChange: "冲突从霍尔木兹海峡外溢至红海，形成双向航道封锁风险。",
  investmentSignal: "→ 增持 能源 防御 以 对冲 风险资产。",
  prevRiskScore: 94,
  scoreTrend: [
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
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94,
      active: true
    }
  ],
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEE363SCasLC0EKahBVFwHVyAnVfEgdAmekkvMvasjNXOiZzOzOv77NveVW8xP0z38EXAr8I1qBP2ZM_89H7asC8lByQfBlH5ImI25n5RNjwEtpPs24Pg=="
    },
    {
      title: "jinsa.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEp4jqtkz-0A8uDnfgIRCNsp0wgPl3n7l0FJdEuXhhF9wrtpYiLxLXus3Bn7fInPpmuGmNNV2GqxHusDd5uc3WxaX-wCfjKnPn8Y7rSjVo6ydpPW2gfpgyOHPSX-TErng5qsTEJARftbTXZj2xJXYOIHNAjmPOsvhErzjEeMi8="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPO4sv-_5u1hu3oop8VV2G_9EUpr9F8gLcVGA3YlFvXpNxHqWv2rkMdI1GYMXnRQJU7y3fJ81Ax0xUN1YYHScduRJo4fCfygKvisRLvSZQzQ6bpfnA1SAWTfxkz0J6OFWx9YrfBXSu5dG6mttVz64J"
    },
    {
      title: "manaramagazine.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHePRlx8m2JNnmQI7sr-9V3tiDpxt0GdwpmUO10woKmDr5CF9_zu6J4_6G3hFXL_fdrfNZAUD83I-JrryH0buLOJJB80uWnfQkYr_AZT3mS4yCyteh8_ve9VZ_5dJLCLVhtwwis99KplFMoE1PrfWPRRnlfH3BWzaxt_YHuqC1NO-4="
    },
    {
      title: "ice.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOLLpxXDMqiKmUA11_lucj-vJIcuPbrNsTVoOG9B3cjldjDtuly8bgwAbzAdE2BmAt9puha_TDDCtbpRk0KhY_xVDNYgrv46eewzMdmDkBhO8vz1v6-E9RRhsBYzJ6_8190w488ToNm7xgt0F5ZQ4="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLAOFWqy73kvwjCAFIbNohmmb-PJL9c5eB43uskxIVN7fujwRoCbrMDIWJwZijN6vp6kYxYpARCoq8kB7_Tu6WZtJyUf2cRwVq1HvkDwFvWd0escadUb-o1X3OJ3Opwkd09GryGzacyZlBgUZfUoctJT4pcr8ffxafaDVPRujUJdDU4eQBtF1NdqlKdAY="
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEHvPQMQkz51o2D6M19Mf6bBri4Zi3CyeWRKIxHbzL1QA-biKk5S1zJUi8v3MW-fvXMw-ovD8oYtqX_q7bs4cpeqC6pHRkTw87qDMxkek4oqyPFTrQ2fg4rq_4k9lbmngs_FTIh_EDjL3e3OUScR1c34nXk4nKK2Bw2KFvRSjuEbSOIRskhtLqRiz2xn93N9FWAzLyYVxsCQpFTSGumxgJU5PEfHw=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGSMF9ve0UCTDfWvgej4nR62GWoPhWDzmOVsqUy47FgfbNOiuEemCPWtaxN-8ZGShciAyC-SEtBZbZ4Cw-22MYGxg-xcEQOy1NIRfrV6QTueJpS0RFohey_k11PJAAJ_qAY"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMeiMH-qLpLfAcR4ymCeJD1mOdtAj6HxN9dtKmTe9rdPI6cEGbPStcs06LgUjyu7Ujv4rzLYQOxdbXA-YGmYdcbzqBsSzPjdwdu-bghHYISGqSRUuWO_glYmeNvpaSgWhtxjazm2pqqB-cbmLPxSCG87p1jVw="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjLEjqvS842Q9aMM-sO77t6eZi3xAm6-_-UNmMfek2FJxKyd5zBfFaj8b2BaJo15nj8oiJaznzK9qqC8cR4K50T9QuyPPb0YVPC05BlBCGvXXaV7YQpz-uKLmylpM2L5mMNqQrkBY="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices July 24 2026 current trend",
    "US Iran conflict news July 24 2026 Oman talks",
    "Strait of Hormuz shipping status July 24 2026 military escort",
    "Israel Iran conflict updates July 24 2026 proxy strikes"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-24",
  version: "v2.135",
  riskScore: 94,
  riskScoreTrend: [
    {
      date: "2026-07-20",
      score: 98
    },
    {
      date: "2026-07-21",
      score: 98
    },
    {
      date: "2026-07-22",
      score: 98
    },
    {
      date: "2026-07-23",
      score: 94
    },
    {
      date: "2026-07-24",
      score: 94
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D146",
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
      value: "WTI $89.69–$92.19 · Brent $97.83–$101.16",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US conducting 13th night of direct strikes on Iranian soil; Trump weighing larger operations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "De facto blockade maintained by Iran; transit volume down ~90%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Brent crude pierced $100 as Red Sea attacks added to supply fears.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Over 50,000 US troops deployed; intelligence probe into Russian assistance to Iran.",
      status: "FAST",
      sourceVerification: "partial"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Interim MoU declared dead by both sides; dialogue channels collapsed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Red Sea Saudi Tanker Attacks",
      description: "Houthi forces struck two VLCCs, opening a second maritime front. Source: Reuters, CBS",
      verification: "confirmed",
      timestamp: "2026-07-24 02:45 AM EDT",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "13th Night of US Strikes",
      description: "CENTCOM reported strikes on command nodes near Qeshm Island. Source: AL-Monitor",
      verification: "confirmed",
      timestamp: "2026-07-24 00:00 AM",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Conflict expanded from Hormuz to a dual-chokepoint crisis involving the Red Sea.",
      "Direct US-Iran kinetic engagement has entered a semi-permanent nightly strike cycle.",
      "Diplomatic windows have effectively closed following the total collapse of the June MoU."
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
        "Continue: US maintains nightly precision strikes against Iranian coastal surveillance.",
        "Change: Deployment of additional refueling aircraft suggests preparations for larger-range strikes."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Hormuz remains in a high-risk blockade state with 5% war-risk premiums.",
        "Change: Red Sea Bab-el-Mandeb escalated from risk to active combat zone."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude pierced $100 for the first time since May on dual-chokepoint fears.",
        "Continue: US crude inventories declining faster than expected due to import disruption."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Trump issuing threats via social media against Iranian critical infrastructure.",
        "Change: Iran reasserted its refusal to negotiate under military pressure or blockade conditions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable gap between US 'Maximum Pressure' and Iranian 'Escalation for Leverage'.",
      "US domestic election pressure forcing hardline stances despite global energy risks."
    ],
    military: [
      "Asymmetric blockade capability vs US freedom of navigation enforcement power.",
      "Proxy warfare sliding uncontrollably into direct state-on-state kinetic conflict."
    ]
  },
  keyChange: "Conflict外溢 to Red Sea, creating a dual-chokepoint maritime blockade risk.",
  investmentSignal: "→ Incrementally Add Energy Defense to Hedge Risk Assets.",
  prevRiskScore: 94,
  scoreTrend: [
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
      score: 98
    },
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94,
      active: true
    }
  ],
  webSources: [
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEE363SCasLC0EKahBVFwHVyAnVfEgdAmekkvMvasjNXOiZzOzOv77NveVW8xP0z38EXAr8I1qBP2ZM_89H7asC8lByQfBlH5ImI25n5RNjwEtpPs24Pg=="
    },
    {
      title: "jinsa.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEp4jqtkz-0A8uDnfgIRCNsp0wgPl3n7l0FJdEuXhhF9wrtpYiLxLXus3Bn7fInPpmuGmNNV2GqxHusDd5uc3WxaX-wCfjKnPn8Y7rSjVo6ydpPW2gfpgyOHPSX-TErng5qsTEJARftbTXZj2xJXYOIHNAjmPOsvhErzjEeMi8="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPO4sv-_5u1hu3oop8VV2G_9EUpr9F8gLcVGA3YlFvXpNxHqWv2rkMdI1GYMXnRQJU7y3fJ81Ax0xUN1YYHScduRJo4fCfygKvisRLvSZQzQ6bpfnA1SAWTfxkz0J6OFWx9YrfBXSu5dG6mttVz64J"
    },
    {
      title: "manaramagazine.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHePRlx8m2JNnmQI7sr-9V3tiDpxt0GdwpmUO10woKmDr5CF9_zu6J4_6G3hFXL_fdrfNZAUD83I-JrryH0buLOJJB80uWnfQkYr_AZT3mS4yCyteh8_ve9VZ_5dJLCLVhtwwis99KplFMoE1PrfWPRRnlfH3BWzaxt_YHuqC1NO-4="
    },
    {
      title: "ice.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOLLpxXDMqiKmUA11_lucj-vJIcuPbrNsTVoOG9B3cjldjDtuly8bgwAbzAdE2BmAt9puha_TDDCtbpRk0KhY_xVDNYgrv46eewzMdmDkBhO8vz1v6-E9RRhsBYzJ6_8190w488ToNm7xgt0F5ZQ4="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLAOFWqy73kvwjCAFIbNohmmb-PJL9c5eB43uskxIVN7fujwRoCbrMDIWJwZijN6vp6kYxYpARCoq8kB7_Tu6WZtJyUf2cRwVq1HvkDwFvWd0escadUb-o1X3OJ3Opwkd09GryGzacyZlBgUZfUoctJT4pcr8ffxafaDVPRujUJdDU4eQBtF1NdqlKdAY="
    },
    {
      title: "al-monitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEHvPQMQkz51o2D6M19Mf6bBri4Zi3CyeWRKIxHbzL1QA-biKk5S1zJUi8v3MW-fvXMw-ovD8oYtqX_q7bs4cpeqC6pHRkTw87qDMxkek4oqyPFTrQ2fg4rq_4k9lbmngs_FTIh_EDjL3e3OUScR1c34nXk4nKK2Bw2KFvRSjuEbSOIRskhtLqRiz2xn93N9FWAzLyYVxsCQpFTSGumxgJU5PEfHw=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGSMF9ve0UCTDfWvgej4nR62GWoPhWDzmOVsqUy47FgfbNOiuEemCPWtaxN-8ZGShciAyC-SEtBZbZ4Cw-22MYGxg-xcEQOy1NIRfrV6QTueJpS0RFohey_k11PJAAJ_qAY"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMeiMH-qLpLfAcR4ymCeJD1mOdtAj6HxN9dtKmTe9rdPI6cEGbPStcs06LgUjyu7Ujv4rzLYQOxdbXA-YGmYdcbzqBsSzPjdwdu-bghHYISGqSRUuWO_glYmeNvpaSgWhtxjazm2pqqB-cbmLPxSCG87p1jVw="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjLEjqvS842Q9aMM-sO77t6eZi3xAm6-_-UNmMfek2FJxKyd5zBfFaj8b2BaJo15nj8oiJaznzK9qqC8cR4K50T9QuyPPb0YVPC05BlBCGvXXaV7YQpz-uKLmylpM2L5mMNqQrkBY="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil prices July 24 2026 current trend",
    "US Iran conflict news July 24 2026 Oman talks",
    "Strait of Hormuz shipping status July 24 2026 military escort",
    "Israel Iran conflict updates July 24 2026 proxy strikes"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月24日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.135 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 94（持平）：冲突从霍尔木兹海峡外溢至红海，形成双向航道封锁风险。",
    bannerWarning: "→ 增持 能源 防御 以 对冲 风险资产。",
    deescalationIntent: "美方的“极限施压”回归与伊方“以战促和”逻辑的彻底决裂。",
    structuralRisk: "伊朗维持事实上封锁，24小时航道吞吐量仅为正常水平的10%左右。",
    contradictionNote: "美方的“极限施压”回归与伊方“以战促和”逻辑的彻底决裂。；海峡封锁能力（伊朗）与航行自由执行力（美国）之间的实地消耗战。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第146天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 24 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.135 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 94 (Flat): Conflict外溢 to Red Sea, creating a dual-chokepoint maritime blockade risk.",
    bannerWarning: "→ Incrementally Add Energy Defense to Hedge Risk Assets.",
    deescalationIntent: "Irreconcilable gap between US 'Maximum Pressure' and Iranian 'Escalation for Le…",
    structuralRisk: "De facto blockade maintained by Iran; transit volume down ~90%.",
    contradictionNote: "Irreconcilable gap between US 'Maximum Pressure' and Iranian 'Escalation for Leverage'.; Asymmetric blockade capability vs US freedom of navigation enforcement…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 146",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
