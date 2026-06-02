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
  date: "2026-06-02",
  version: "v2.83",
  keyStats: [
    {
      label: "冲突天数",
      value: "D94",
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
      value: "WTI $90.73–$91.99 · Brent $93.46–$95.04",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "代理冲突在黎巴嫩和加沙维持高烈度，直接冲突风险受控。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗维持航道实质管控，通过新设管理局收取非官方费用。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价在 $90 以上区间震荡，市场因谈判反复而呈现极端情绪化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国深度介入停火协议修订，并维持红海/阿曼湾军事威慑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "谈判信号发生显著断裂，官方停摆与首脑乐观表态并存。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗内部强硬派主导“暂停谈判”决策",
      "美方维持高压外交与直接复航承诺",
      "核议题（铀移交）成为协议签署的核心阻碍"
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
        "延续：以军持续在黎巴嫩南部开展定点清除任务。",
        "变化：伊朗支持的伊拉克民兵威胁在谈判破裂后重启对美基地的袭击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：非伊朗籍商船通行量维持在战前 10% 以下。",
        "变化：美方发布正式警告，严禁船东向伊朗 PGSA 支付通行费。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价高位运行，主要受霍尔木兹溢价支撑。",
        "变化：市场出现“跳空”行情，成交量随外交传闻大幅波动。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗最高国家安全委员会暗示在黎巴嫩停火前不会恢复谈判。",
        "变化：特朗普政府向阿曼施压，要求其停止协助伊朗管理航道。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗强硬派维持现状以固化航道控制权 vs 美国寻求低成本复航",
      "核库存处置权（德黑兰拒绝移交）与美方 Phase 1 停火条件的不可调和"
    ],
    military: [
      "以色列在黎巴嫩的领土推进与伊朗地区防线安全之间的对峙"
    ]
  },
  scoreTrend: [
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68,
      active: true
    }
  ],
  keyChange: "谈判渠道的官方停摆推升了市场风险溢价。",
  investmentSignal: "→ 维持对能源板块的防御性增持，减持对价格极度敏感的周期性风险资产。",
  riskScore: 68,
  change: "up",
  prevRiskScore: 64,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "代理冲突在黎巴嫩和加沙维持高烈度，直接冲突风险受控",
      description: "代理冲突在黎巴嫩和加沙维持高烈度，直接冲突风险受控。",
      verification: "single",
      timestamp: "2026-06-02（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "伊朗维持航道实质管控，通过新设管理局收取非官方费用",
      description: "伊朗维持航道实质管控，通过新设管理局收取非官方费用。",
      verification: "single",
      timestamp: "2026-06-02（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEGbs13FgDkMtkhy765n45Y5CEueSbayeMA-R6PIAw6nfeN0_6oUjaYkpdVusxezWYhktD2s4WbUu_J7ZR-p9SkJhb0gRFe6jXKnV1Sh9-MzzMCJyp-Q9kDpMPFTpul0s9XPzAj8pZ9XX3RtS9KKme0XNfyhQQARbUFH97MdUfuskdiuNcz4VpWSaI5oHq_WTuEBwrg3lMEFOsqwIgH6OaNjK0X5WCwo75c2BDauSjlxz17OydL8JNzfAwv_jA="
    },
    {
      title: "offshore-technology.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtNyu8fWICFX-3nULedkTsNEjEYihddKTLaxgdkxCdG_CJKR8EAYEb-laXmV2c0S37nQ9CWVzvLngEDZucoSiuIebzFSIYByKQJexog6x4xnNg-trOLYqW4JuZSCnXmDiXKEb-uwAhS_IgbXvGLzhSsm4skQG-4F-Unz6tc3qu2_Zo0-kZcxWusihMDTns8C0="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFyCIQVv6FZNjDHhJDr9DevXlCO8DP7hpwdoWGCvKf-yzmuj-ynil23051pP40r-V3Mb3ZGO6BydM6DDxlYiOykPVin-bOZYxLds-ELKAWGQOqKrnrE1f1UA-ecBCJB0a4NAfp8fAUQqzPf-cU="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZQfzgAi4kmD7ZpuEDy9IPFE-suxxrA6496v_fHR9XdoUx7p55oVNucvdLYAtO67wJuwZGybIB4jhaGLRM6a1e8SXIQkru1PYv2fXRBinsilu6mjLGSgjknHNuvUdJWPD7cTeGjT6jL7S1zTOdi8ST"
    },
    {
      title: "businesstoday.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFb4meMxeADQuhIkz28uZMhCY37_DNiuDH1lI57OIV38Aozvk8NcPPbVRJKdjKYnrhsk5phgiQzTOoVcIUeioxP42iLKKbXub7W8Sp6ScqLSxjDI8V97Qdf1V9o7k0XYindPys0rn6hkj-DPgARXTOV0heED5LGTy9wHj4Zy3QPznBSK0sXwm5YdEUPM720ZhmhK3l6XOkPUpVkLP-jUd9Pqke1KhSWe4c0pQGHXYs="
    },
    {
      title: "houseofsaud.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGlqo4Ijswcigg2Pq46x4l246hAY3IUSv6ubfXAISy_1BXy-a4mGL7nZ4uOxLvD7PUYtNnDfP2tFg-3CAe_zVEYdHkmrktSWctJZCdlpeF_Fs4JvE3pkzzBGD3xQJP1CgfdffmaxwQ1JHSo8Ol3Zg=="
    },
    {
      title: "seatrade-maritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGaY9vKNnofJtIYa_g4wDD__6BWOCyF4EFKN6KTp7lpPnl5rr0UVVWFJr8awfLeZ3CJRgbcMfV_iHSEHhbT-IOKGvek-vLS0mnGnEbi2PrL2wSIA2aCUqFhT21GiYZRTklkG4tCi1l6WH1SU1HQ0CZDlZuHVamI0zFRtfSxdoJuDol_cx4drXg6B42XwNYQbDWN7Q=="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgCBDYyzkv9MWOKtRpAKdZqi4sgakV_6QTn2RK1aaxFvJ_JLGUyUhjIFOW0FQt4cY-TEYBbSVweDVkCEcjyWAC9EGupM6aKFEsgwHumyd_GwwX6EKnIE5GlcQHXPq0_upyhtqPwhJrsZGBfxe5m1tLMDZJwZgYqWCBcAd3Tqt0ytaeKxLp6CftbPEwIvVPETsEVra98nXxJsqleVK-1_9OUzuZXg=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLaIWJuYdFo2Y1k8tnN2c8dsq8BpRJi9ZG_F6gIcvUa6a-bru3OQ_SE8uG-_1QxXGrh_wMBAS_U5D4NNXoF3586K8wB-xJhEji1yMylAGzsf3etp90AoQHrgbgFd1a4dLtv1fBApbmn-X3dfZzquMYWuzO6XwwJFJjm3lAoe0t"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzAiduEKSwdZ-zOvDszE-JHMJPUSnFGchShd-DKSupztsvqjhGfP9etursddFC69JVT69bPmNT6mQ71VpxTYo1IjSwRidnJC1vCXkzEH43CukPM5hWLXtLgEfga38QuZKE3YxRbpRTS900lZuyg482Xh_aQfNAqDHL9Nc0fgn2ZJyw56imjHFasMTFKpBIb8jm8S3dw0KeU7I="
    },
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhNd3jg_jEfegSq5q0-domEsjqLqZt3HG2gSxSLc6xQiIOrRnUiZUAP5wKukxPpu3TtgjNOv1D17saFhVQFWLsYpxA85j3g5DoFQxfg5JaXhQygDbefm46mrBP-MBSNguay-js5jbau8gzokKN3qK-l20BQ-qk8dwZSRC3"
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtvumpj_xO-yht9OXO76V_ATZtKbQElyEIBRTls02bwuEMWGZetLnPccxhAPj0CwkAdZ-9KO1yoswnOWcrK-qG-qANLx-M86tkRocfJbBL8fjbkenKfEW0gQMZe-Ee5BmQLu9_PNC9tQcr3m4gjOE95Y9e3YZ_dBwSck9oFy3Hv-lsaxK6vaxS2B_Gx1fgcskGvhNRXkZJ"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFcy3z_qm0D3GVp-p-FG4VErTyXa8fih9DQtyhY80q2POdya_TQWkmhrjq0F2f4pjIuSPptOafWNcqojAn2-_eh4YQ_EI0NHOWDrHvU10eiqVR2UBjHbDHpjB8egRGcsMMTBB-hWBOKntWN2g=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend June 2 2024 Reuters Bloomberg",
    "US Iran maritime tension Hormuz news June 2 2024",
    "IAEA Iran nuclear program meeting June 2024 AP Reuters"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-02",
  version: "v2.83",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D94",
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
      value: "WTI $90.73–$91.99 · Brent $93.46–$95.04",
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
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy conflicts remain high-intensity in Lebanon and Gaza.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran maintains de facto control over the Strait, extracting unauthorized fees.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices fluctuate above $90 due to conflicting diplomatic signals.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US heavily involved in MOU revisions and maritime deterrence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Negotiation channels facing significant fractures despite leader optimism.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Iran's hardliners dominate the decision to pause indirect talks",
      "US maintains high-pressure diplomacy with direct reopening promises",
      "Nuclear material removal mechanics remain the primary deadlock"
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
        "Continue: IDF continues targeted elimination missions in southern Lebanon.",
        "Change: Iran-backed Iraqi militias threaten to resume attacks on US bases if talks collapse."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Non-Iranian commercial traffic remains below 10% of pre-war levels.",
        "Change: US issues formal warnings to shipowners against paying tolls to the PGSA."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil prices remain elevated, supported by the Hormuz risk premium.",
        "Change: Market 'gap' openings observed as volumes fluctuate with diplomatic rumors."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran's Supreme National Security Council hints at no talks without a Lebanon ceasefire.",
        "Change: Trump administration pressures Oman to stop assisting Iranian maritime management."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Hardline status quo for maritime control vs. US push for low-cost reopening",
      "Nuclear stockpile sovereignty vs. Phase 1 ceasefire conditions"
    ],
    military: [
      "Israeli territorial gains in Lebanon vs. Iranian regional defense security"
    ]
  },
  scoreTrend: [
    {
      date: "05-29",
      score: 68
    },
    {
      date: "05-30",
      score: 64
    },
    {
      date: "05-31",
      score: 64
    },
    {
      date: "06-01",
      score: 64
    },
    {
      date: "06-02",
      score: 68,
      active: true
    }
  ],
  keyChange: "Official suspension of negotiation channels by Tehran has spiked the risk premium.",
  investmentSignal: "→ Maintain defensive overweight in energy sectors; underweight cyclical risk assets sensitive to volatility.",
  riskScore: 68,
  change: "up",
  prevRiskScore: 64,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Proxy conflicts remain high-intensity in Lebanon and Gaza",
      description: "Proxy conflicts remain high-intensity in Lebanon and Gaza.",
      verification: "single",
      timestamp: "2026-06-02 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Iran maintains de facto control over the Strait, extracting unauthorized fees",
      description: "Iran maintains de facto control over the Strait, extracting unauthorized fees.",
      verification: "single",
      timestamp: "2026-06-02 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "businesstimes.com.sg",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEGbs13FgDkMtkhy765n45Y5CEueSbayeMA-R6PIAw6nfeN0_6oUjaYkpdVusxezWYhktD2s4WbUu_J7ZR-p9SkJhb0gRFe6jXKnV1Sh9-MzzMCJyp-Q9kDpMPFTpul0s9XPzAj8pZ9XX3RtS9KKme0XNfyhQQARbUFH97MdUfuskdiuNcz4VpWSaI5oHq_WTuEBwrg3lMEFOsqwIgH6OaNjK0X5WCwo75c2BDauSjlxz17OydL8JNzfAwv_jA="
    },
    {
      title: "offshore-technology.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtNyu8fWICFX-3nULedkTsNEjEYihddKTLaxgdkxCdG_CJKR8EAYEb-laXmV2c0S37nQ9CWVzvLngEDZucoSiuIebzFSIYByKQJexog6x4xnNg-trOLYqW4JuZSCnXmDiXKEb-uwAhS_IgbXvGLzhSsm4skQG-4F-Unz6tc3qu2_Zo0-kZcxWusihMDTns8C0="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFyCIQVv6FZNjDHhJDr9DevXlCO8DP7hpwdoWGCvKf-yzmuj-ynil23051pP40r-V3Mb3ZGO6BydM6DDxlYiOykPVin-bOZYxLds-ELKAWGQOqKrnrE1f1UA-ecBCJB0a4NAfp8fAUQqzPf-cU="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZQfzgAi4kmD7ZpuEDy9IPFE-suxxrA6496v_fHR9XdoUx7p55oVNucvdLYAtO67wJuwZGybIB4jhaGLRM6a1e8SXIQkru1PYv2fXRBinsilu6mjLGSgjknHNuvUdJWPD7cTeGjT6jL7S1zTOdi8ST"
    },
    {
      title: "businesstoday.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFb4meMxeADQuhIkz28uZMhCY37_DNiuDH1lI57OIV38Aozvk8NcPPbVRJKdjKYnrhsk5phgiQzTOoVcIUeioxP42iLKKbXub7W8Sp6ScqLSxjDI8V97Qdf1V9o7k0XYindPys0rn6hkj-DPgARXTOV0heED5LGTy9wHj4Zy3QPznBSK0sXwm5YdEUPM720ZhmhK3l6XOkPUpVkLP-jUd9Pqke1KhSWe4c0pQGHXYs="
    },
    {
      title: "houseofsaud.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGlqo4Ijswcigg2Pq46x4l246hAY3IUSv6ubfXAISy_1BXy-a4mGL7nZ4uOxLvD7PUYtNnDfP2tFg-3CAe_zVEYdHkmrktSWctJZCdlpeF_Fs4JvE3pkzzBGD3xQJP1CgfdffmaxwQ1JHSo8Ol3Zg=="
    },
    {
      title: "seatrade-maritime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGaY9vKNnofJtIYa_g4wDD__6BWOCyF4EFKN6KTp7lpPnl5rr0UVVWFJr8awfLeZ3CJRgbcMfV_iHSEHhbT-IOKGvek-vLS0mnGnEbi2PrL2wSIA2aCUqFhT21GiYZRTklkG4tCi1l6WH1SU1HQ0CZDlZuHVamI0zFRtfSxdoJuDol_cx4drXg6B42XwNYQbDWN7Q=="
    },
    {
      title: "capital-media.mu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgCBDYyzkv9MWOKtRpAKdZqi4sgakV_6QTn2RK1aaxFvJ_JLGUyUhjIFOW0FQt4cY-TEYBbSVweDVkCEcjyWAC9EGupM6aKFEsgwHumyd_GwwX6EKnIE5GlcQHXPq0_upyhtqPwhJrsZGBfxe5m1tLMDZJwZgYqWCBcAd3Tqt0ytaeKxLp6CftbPEwIvVPETsEVra98nXxJsqleVK-1_9OUzuZXg=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLaIWJuYdFo2Y1k8tnN2c8dsq8BpRJi9ZG_F6gIcvUa6a-bru3OQ_SE8uG-_1QxXGrh_wMBAS_U5D4NNXoF3586K8wB-xJhEji1yMylAGzsf3etp90AoQHrgbgFd1a4dLtv1fBApbmn-X3dfZzquMYWuzO6XwwJFJjm3lAoe0t"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzAiduEKSwdZ-zOvDszE-JHMJPUSnFGchShd-DKSupztsvqjhGfP9etursddFC69JVT69bPmNT6mQ71VpxTYo1IjSwRidnJC1vCXkzEH43CukPM5hWLXtLgEfga38QuZKE3YxRbpRTS900lZuyg482Xh_aQfNAqDHL9Nc0fgn2ZJyw56imjHFasMTFKpBIb8jm8S3dw0KeU7I="
    },
    {
      title: "cmegroup.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhNd3jg_jEfegSq5q0-domEsjqLqZt3HG2gSxSLc6xQiIOrRnUiZUAP5wKukxPpu3TtgjNOv1D17saFhVQFWLsYpxA85j3g5DoFQxfg5JaXhQygDbefm46mrBP-MBSNguay-js5jbau8gzokKN3qK-l20BQ-qk8dwZSRC3"
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHtvumpj_xO-yht9OXO76V_ATZtKbQElyEIBRTls02bwuEMWGZetLnPccxhAPj0CwkAdZ-9KO1yoswnOWcrK-qG-qANLx-M86tkRocfJbBL8fjbkenKfEW0gQMZe-Ee5BmQLu9_PNC9tQcr3m4gjOE95Y9e3YZ_dBwSck9oFy3Hv-lsaxK6vaxS2B_Gx1fgcskGvhNRXkZJ"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFcy3z_qm0D3GVp-p-FG4VErTyXa8fih9DQtyhY80q2POdya_TQWkmhrjq0F2f4pjIuSPptOafWNcqojAn2-_eh4YQ_EI0NHOWDrHvU10eiqVR2UBjHbDHpjB8egRGcsMMTBB-hWBOKntWN2g=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend June 2 2024 Reuters Bloomberg",
    "US Iran maritime tension Hormuz news June 2 2024",
    "IAEA Iran nuclear program meeting June 2024 AP Reuters"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月2日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.83 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 68（↑4）：谈判渠道的官方停摆推升了市场风险溢价。",
    bannerWarning: "→ 维持对能源板块的防御性增持，减持对价格极度敏感的周期性风险资产。",
    deescalationIntent: "伊朗强硬派维持现状以固化航道控制权 vs 美国寻求低成本复航",
    structuralRisk: "伊朗维持航道实质管控，通过新设管理局收取非官方费用。",
    contradictionNote: "伊朗强硬派维持现状以固化航道控制权 vs 美国寻求低成本复航；以色列在黎巴嫩的领土推进与伊朗地区防线安全之间的对峙",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第94天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 2 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.83 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 68 (↑4): Official suspension of negotiation channels by Tehran has spiked the risk premium.",
    bannerWarning: "→ Maintain defensive overweight in energy sectors; underweight cyclical risk assets sensitive to volatility.",
    deescalationIntent: "Hardline status quo for maritime control vs. US push for low-cost reopening",
    structuralRisk: "Iran maintains de facto control over the Strait, extracting unauthorized fees.",
    contradictionNote: "Hardline status quo for maritime control vs. US push for low-cost reopening; Israeli territorial gains in Lebanon vs. Iranian regional defense security",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 94",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
