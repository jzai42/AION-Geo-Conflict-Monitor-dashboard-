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
  date: "2026-04-18",
  version: "v2.36",
  riskScore: 64,
  keyStats: [
    {
      label: "冲突天数",
      value: "D49",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $83.50–$84.20 · Brent $90.10–$91.40 · 剧烈回落",
      unit: "区间·趋势参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "重启初期",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "以黎10日停火协议暂时稳定了北方战线，美伊直接交火暂停。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "伊朗宣布重新开放航道，首艘商船试航通过，但全面恢复仍需时日。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "受航道重启预期驱动，油价出现本轮冲突以来最大单日跌幅。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军“经济愤怒行动”维持对伊朗全境港口的物理封锁，大国威慑处于高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "双方进入为期一周的协议冲刺期，外交渠道自冲突以来首次出现实质松动。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡正式复航",
      description: "伊朗外长阿格拉齐通过X平台宣布海峡对全球商船开放，油价随即跳水。Reuters报道证实此消息引发市场剧变。",
      verification: "confirmed",
      timestamp: "2026-04-18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "首艘民用船只过境",
      description: "“塞莱斯蒂亚发现号”邮轮完成47天封锁后首次完整过境，验证了航道的物理可用性（MarineTraffic）。",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "美军Operation Economic Fury持续",
      description: "尽管海峡开放，美军仍拦截任何试图进入伊朗境内的油轮。特朗普称封锁将持续到谈判100%完成。",
      verification: "confirmed",
      timestamp: "2026-04-18",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "缓和态势",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海峡从‘绝对封锁’转入‘有条件开放’",
      "美伊博弈焦点从军事打击转为经济条款细节",
      "下周三（4月22日）为协议最终观测点"
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
        "变化：以黎战线大规模交火停止，进入10日静止期。",
        "延续：美军维持对伊朗领空的抵近侦察与海上封锁态势。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡由完全封闭转为“有限通航”，首批商船开始排队过境。",
        "变化：BIMCO发出警告，称伊朗可能在主航道北侧布设了雷区，建议谨慎操作。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：地缘政治溢价快速挤出，Brent跌破100美元关键支撑并向90美元靠拢。",
        "变化：欧佩克+由于预期供应恢复，正重新评估下月产量配额。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普释放“极度乐观”信号，暗示已达成包含核约束的初步框架。",
        "变化：伊朗议长警告，若美军持续封锁港口，将再次关闭海峡。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国追求“大交易”彻底消除核威胁 vs 伊朗追求主权完整下的经济解封",
      "特朗普的短期外交成就需求 vs 区域盟友（以色列）的长期安全顾虑"
    ],
    military: [
      "海上封锁的物理存在 vs 商业航运自由流动的实际需求",
      "临时停火的脆弱性 vs 双方依然对峙的重兵集团"
    ]
  },
  scoreTrend: [
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
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
      score: 64,
      active: true
    }
  ],
  keyChange: "霍尔木兹海峡由封锁转为开放，油价崩盘触发综合风险指数下行拐点。",
  investmentSignal: "→ 减持能源对冲，博弈风险资产反弹。",
  prevRiskScore: 72,
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYQEgwyRLEtv8TH27rs0n6sj1NaZ8mSH5ofDBIy2GWTgyLfirKLgVJauYGvbQdGkm2tm-oob7LwQqWiNFcwLEZNTlz-ddjxcxqmD1M1K7ogAhn245ODJOm5bnP3cmyzNwNOGIYrGldQY0GxA=="
    },
    {
      title: "usembassy.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGL3V1B_KfeK-tyXi8zpKnBH7VFrtvBvGMhmmXqnByryaag9s0BcQdugEHWAyu4rVcnEpsNWWh4R0PpNAJUBgi9WLNcD1UkJzzdks1i8d1vTiY24TAA1YdrI_RIlcpm_nb4I_6GhUXZTdPdm-o5s75myfkxWmiBse_d4f_KLSSRqTvJOdMuIAADw1ENPQ=="
    },
    {
      title: "tbsnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_8le83LxxIEM9mmEhCbAa7WofHiFDux9VXMPovKlR6i0vJuybIANzvMX7xw_qY9JJoHjZ31HfGHlhsUZl-Q5LeVkpYRsqDK2DhM3QXR_GvBthRvz1RmTAhgCJCYB9wGuqT7xsyLvEVSzOjPwOi4VNgPckgfXFMGRu0uz2Oku9U0m5GXVMAmx0OYa64rXqn0CM24Zkr0-_hli7GgWDCKLAGDNmEoCytA=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMyn4xgKneVwR9wmthvzGw6NZku0FGWhA8JWJYVznzUZ8N3czm2yBsgzIUtubf-B6U82v3_XFvtoELTG-VOBj0P1J3oevWhdZ9Wg799NhSUqRozrdXtIbUF7msWxDEaT-Bmk3eFf9C9zbP3_wUtEF2TFW5Afk_CbMl8g=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHG_vIkeLL9Ecw5vVVNkfVs_-E9w206Rly1A8MkI5E1xzOUTUeWHsU1WiMFVrgD-HOAfYvDAMObIvPzFvfCBH-pcTPem1r9Lc5ePfg-lM7KBEE8pGs-rnlQM5xsAoxvspNTozDEpFr-50ktNbIIPteiHhhVb4Zd4H1iJAbrRkhXqSPwuuh4"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdGPkMi8hbVhJ6TDDSsDoiRZhTqoJejcxscTJ-YOWAHEOQzaxPY95alX1mlveGtTcnq3R8YpJG3EfyA20sW4A0nREyL1h2Ncx2zTqBwCBe-L1AQevZzPQU1_AHXv204yL1Mh4CIPBXixes6V-UaYclCiY4dprkpnNaoxaOvPwnJczUcty7pKlqiONl0UpximgF"
    },
    {
      title: "military.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1pbWKqosMjNJWfvmgumWkJihxTL8sa6eNEYT7tGsJj-cg4vJL7FkfsN2fgmB90Bcwm5j5cJqrGRtV8R6Bk1uuk7ybTzvBHIdsb5rD50O5HzX0kfEeKzfn-8Glo9IERwaKPSCL6q3IkcFxTSzwL2Gi49hofwTYulZWRC4gf3-xNoLAgPKdQ_KsrSWSS2cnib7aTpTUYKaRmsCvaHz_aItj8s4="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBZoU1fGs6bhopwFrQ4cLaAGYNyBQ30keDwzWbKWNPAtj4PIUKD5HJTxjLtCkd4hyysmE4J7Yd--xBapEKWXpFVQCiQPHuX8ioP-NRdzRXUKvEeHDyk4q2a-CUpNydPpS51jV0rZujMSwebW2M6GitQnUX8WDiszft"
    },
    {
      title: "fox10phoenix.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEk5NAbrQSQfwvqWK6okhbBPsqBSrq8DJqv1w95kNad6zmZiGupZAxPrrE6QC27hNRRCXu4PJTITKXHB8lMpRGP5wDPW0Kp6x6Jmmetxl2IUTmujyiISBa-9Lzkrt3Sa40PT2YVnlT6e1QFm3sp77tdmmESsTveLdW8gt08pGMlx8sLRpcPU8tigvzjpO_mHsM="
    },
    {
      title: "mprnews.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvkZmxm2fSldlDwsBFTmF2gXfTDhFrTln4_v0zWwZZR4Q3x_4mJWmpGAfBj1ta5O85o9uqdei5VbyYOtVcaRqTY1fah8JFh1opwvdD--XQypqFbRpizYgCbA1N8X2-zXhjb5P2o_Sfx4dJcOvmT-Xshy-ano0dSbkjU6bjzlrpdwlO69SsMC-E2kq2yThEpp4bDX1kfwO1jDeB0A=="
    },
    {
      title: "iranwatch.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXO2vUTco6TOuMS2s8Sqctu14jcnO1leU8boRKHckQjRa-YgrXuS97sPLothaj0UST2poRT4Yj76qZLL6rf4w1X6x1SR3IBglJq5BjfSnHFsEGi3c5Vx6N2fTHnLTjeFTXAMyeWo0zgquf08l7IwPhbA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDQi3QEKBYgwgSx7_d9SscupZHeWrtoWKKGroUrjZwUNTmPISn4XUWuflW5vv9ks9Vfkehil7Wj8nWbYuARH4OG7jvsYOvO4sX-BTg94bazndcatxRO9u3IF4aZYMsRTlO5GycLETufXi4BERPWkRQRQ=="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE6WBODsKfLkpF6qixpQcYq4wgxksNowagq5ION-6j-wRGPDrpgsxNF9tTuBWJBsSRPSPsdtwlsP5P_DInQB4HEwjiZd1pWIpwwQdVdD8hSXOCS5taJAykyK7kvpQsoondBo9uKg0mRVRNyrH0htD5Zo-3tBw=="
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping news April 18 2024",
    "US Iran conflict status April 18 2024 news",
    "WTI Brent crude oil price range April 18 2024 trend",
    "White House State Department Iran statement April 18 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-18",
  version: "v2.36",
  riskScore: 64,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D49",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $83.50–$84.20 · Brent $90.10–$91.40 · 剧烈回落",
      unit: "Range · trend ref",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Initial Reopening",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "10-day ceasefire in Lebanon has stabilized the front, direct US-Iran kinetic action paused.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Iran announced reopening of the strait; first commercial vessel transited, but full recovery takes time.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 3,
      weight: 0.2,
      description: "Oil prices saw their largest single-day drop of the conflict driven by reopening news.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US 'Operation Economic Fury' maintains a physical blockade of all Iranian ports.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "Both sides entered a critical week for a grand bargain; diplomatic channels at their most active.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Hormuz Strait Formally Reopens",
      description: "Iranian FM Araghchi announced opening of the waterway on X; oil prices plummeted. Reuters confirmed market volatility.",
      verification: "confirmed",
      timestamp: "2026-04-18",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "First Civilian Vessel Transit",
      description: "Cruise ship 'Celestyal Discovery' completed first full transit after 47-day halt, verifying channel physical availability.",
      verification: "confirmed",
      timestamp: "2026-04-17",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Operation Economic Fury Continues",
      description: "Despite channel opening, US Navy blocks entry to Iranian ports. Trump vowed blockade stays until deal is 100% complete.",
      verification: "confirmed",
      timestamp: "2026-04-18",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Easing Posture",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Strait transitioned from 'Absolute Blockade' to 'Conditional Opening'",
      "Conflict focus shifted from military strikes to economic deal details",
      "Next Wednesday (April 22) set as the final deadline for a long-term deal"
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
        "Change: Israel-Lebanon front saw large-scale fire stop for 10-day truce.",
        "Continue: US maintain close reconnaissance and maritime blockade posture."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Strait moved to 'Limited Transit'; first merchant ships queuing for passage.",
        "Change: BIMCO warned of potential minefields in Northern lanes, advising caution."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Geopolitical premium squeezed out rapidly; Brent broke $100 toward $90 support.",
        "Change: OPEC+ re-evaluating production quotas given expected supply return."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump signaled extreme optimism, suggesting a framework for nuclear constraints.",
        "Change: Iranian speaker warned the Strait would close again if port blockade persists."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US seeking 'Grand Bargain' vs Iran seeking economic relief with sovereignty",
      "Trump's need for diplomatic victory vs allies' (Israel) security concerns"
    ],
    military: [
      "Physical presence of blockade vs freedom of navigation needs",
      "Fragility of temporary ceasefire vs massive forces still in theater"
    ]
  },
  scoreTrend: [
    {
      date: "04-14",
      score: 76
    },
    {
      date: "04-15",
      score: 76
    },
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
      score: 64,
      active: true
    }
  ],
  keyChange: "Opening of Hormuz and oil crash triggered a downward inflection point for the risk index.",
  investmentSignal: "→ Reduce energy hedges, play for risk-on asset recovery.",
  prevRiskScore: 72,
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYQEgwyRLEtv8TH27rs0n6sj1NaZ8mSH5ofDBIy2GWTgyLfirKLgVJauYGvbQdGkm2tm-oob7LwQqWiNFcwLEZNTlz-ddjxcxqmD1M1K7ogAhn245ODJOm5bnP3cmyzNwNOGIYrGldQY0GxA=="
    },
    {
      title: "usembassy.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGL3V1B_KfeK-tyXi8zpKnBH7VFrtvBvGMhmmXqnByryaag9s0BcQdugEHWAyu4rVcnEpsNWWh4R0PpNAJUBgi9WLNcD1UkJzzdks1i8d1vTiY24TAA1YdrI_RIlcpm_nb4I_6GhUXZTdPdm-o5s75myfkxWmiBse_d4f_KLSSRqTvJOdMuIAADw1ENPQ=="
    },
    {
      title: "tbsnews.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_8le83LxxIEM9mmEhCbAa7WofHiFDux9VXMPovKlR6i0vJuybIANzvMX7xw_qY9JJoHjZ31HfGHlhsUZl-Q5LeVkpYRsqDK2DhM3QXR_GvBthRvz1RmTAhgCJCYB9wGuqT7xsyLvEVSzOjPwOi4VNgPckgfXFMGRu0uz2Oku9U0m5GXVMAmx0OYa64rXqn0CM24Zkr0-_hli7GgWDCKLAGDNmEoCytA=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMyn4xgKneVwR9wmthvzGw6NZku0FGWhA8JWJYVznzUZ8N3czm2yBsgzIUtubf-B6U82v3_XFvtoELTG-VOBj0P1J3oevWhdZ9Wg799NhSUqRozrdXtIbUF7msWxDEaT-Bmk3eFf9C9zbP3_wUtEF2TFW5Afk_CbMl8g=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHG_vIkeLL9Ecw5vVVNkfVs_-E9w206Rly1A8MkI5E1xzOUTUeWHsU1WiMFVrgD-HOAfYvDAMObIvPzFvfCBH-pcTPem1r9Lc5ePfg-lM7KBEE8pGs-rnlQM5xsAoxvspNTozDEpFr-50ktNbIIPteiHhhVb4Zd4H1iJAbrRkhXqSPwuuh4"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdGPkMi8hbVhJ6TDDSsDoiRZhTqoJejcxscTJ-YOWAHEOQzaxPY95alX1mlveGtTcnq3R8YpJG3EfyA20sW4A0nREyL1h2Ncx2zTqBwCBe-L1AQevZzPQU1_AHXv204yL1Mh4CIPBXixes6V-UaYclCiY4dprkpnNaoxaOvPwnJczUcty7pKlqiONl0UpximgF"
    },
    {
      title: "military.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1pbWKqosMjNJWfvmgumWkJihxTL8sa6eNEYT7tGsJj-cg4vJL7FkfsN2fgmB90Bcwm5j5cJqrGRtV8R6Bk1uuk7ybTzvBHIdsb5rD50O5HzX0kfEeKzfn-8Glo9IERwaKPSCL6q3IkcFxTSzwL2Gi49hofwTYulZWRC4gf3-xNoLAgPKdQ_KsrSWSS2cnib7aTpTUYKaRmsCvaHz_aItj8s4="
    },
    {
      title: "wanaen.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEBZoU1fGs6bhopwFrQ4cLaAGYNyBQ30keDwzWbKWNPAtj4PIUKD5HJTxjLtCkd4hyysmE4J7Yd--xBapEKWXpFVQCiQPHuX8ioP-NRdzRXUKvEeHDyk4q2a-CUpNydPpS51jV0rZujMSwebW2M6GitQnUX8WDiszft"
    },
    {
      title: "fox10phoenix.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEk5NAbrQSQfwvqWK6okhbBPsqBSrq8DJqv1w95kNad6zmZiGupZAxPrrE6QC27hNRRCXu4PJTITKXHB8lMpRGP5wDPW0Kp6x6Jmmetxl2IUTmujyiISBa-9Lzkrt3Sa40PT2YVnlT6e1QFm3sp77tdmmESsTveLdW8gt08pGMlx8sLRpcPU8tigvzjpO_mHsM="
    },
    {
      title: "mprnews.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvkZmxm2fSldlDwsBFTmF2gXfTDhFrTln4_v0zWwZZR4Q3x_4mJWmpGAfBj1ta5O85o9uqdei5VbyYOtVcaRqTY1fah8JFh1opwvdD--XQypqFbRpizYgCbA1N8X2-zXhjb5P2o_Sfx4dJcOvmT-Xshy-ano0dSbkjU6bjzlrpdwlO69SsMC-E2kq2yThEpp4bDX1kfwO1jDeB0A=="
    },
    {
      title: "iranwatch.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXO2vUTco6TOuMS2s8Sqctu14jcnO1leU8boRKHckQjRa-YgrXuS97sPLothaj0UST2poRT4Yj76qZLL6rf4w1X6x1SR3IBglJq5BjfSnHFsEGi3c5Vx6N2fTHnLTjeFTXAMyeWo0zgquf08l7IwPhbA=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDQi3QEKBYgwgSx7_d9SscupZHeWrtoWKKGroUrjZwUNTmPISn4XUWuflW5vv9ks9Vfkehil7Wj8nWbYuARH4OG7jvsYOvO4sX-BTg94bazndcatxRO9u3IF4aZYMsRTlO5GycLETufXi4BERPWkRQRQ=="
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE6WBODsKfLkpF6qixpQcYq4wgxksNowagq5ION-6j-wRGPDrpgsxNF9tTuBWJBsSRPSPsdtwlsP5P_DInQB4HEwjiZd1pWIpwwQdVdD8hSXOCS5taJAykyK7kvpQsoondBo9uKg0mRVRNyrH0htD5Zo-3tBw=="
    }
  ],
  webSearchQueries: [
    "Hormuz Strait shipping news April 18 2024",
    "US Iran conflict status April 18 2024 news",
    "WTI Brent crude oil price range April 18 2024 trend",
    "White House State Department Iran statement April 18 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.36 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 64（↓8）：霍尔木兹海峡由封锁转为开放，油价崩盘触发综合风险指数下行拐点。",
    bannerWarning: "→ 减持能源对冲，博弈风险资产反弹。",
    deescalationIntent: "美国追求“大交易”彻底消除核威胁 vs 伊朗追求主权完整下的经济解封",
    structuralRisk: "伊朗宣布重新开放航道，首艘商船试航通过，但全面恢复仍需时日。",
    contradictionNote: "美国追求“大交易”彻底消除核威胁 vs 伊朗追求主权完整下的经济解封；海上封锁的物理存在 vs 商业航运自由流动的实际需求",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第49天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.36 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 64 (↓8): Opening of Hormuz and oil crash triggered a downward inflection point for the risk index.",
    bannerWarning: "→ Reduce energy hedges, play for risk-on asset recovery.",
    deescalationIntent: "US seeking 'Grand Bargain' vs Iran seeking economic relief with sovereignty",
    structuralRisk: "Iran announced reopening of the strait; first commercial vessel transited, but full recovery takes …",
    contradictionNote: "US seeking 'Grand Bargain' vs Iran seeking economic relief with sovereignty; Physical presence of blockade vs freedom of navigation needs",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 49",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
