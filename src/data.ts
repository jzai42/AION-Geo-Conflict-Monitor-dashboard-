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
  date: "2026-07-23",
  version: "v2.134",
  keyStats: [
    {
      label: "冲突天数",
      value: "D145",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $88.08–$91.64 · Brent $95.77–$98.78",
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
      description: "美伊爆发直接军事冲突，美军基地遭到来自伊朗方向的导弹袭击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道实质性关闭，胡塞武装在红海袭击沙特油轮进一步扩大海事危机。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "布伦特原油价格突破$98，WTI升至$90以上，反映出极度的供应中断恐慌。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "美军直接参与作战，区域盟友深度卷入防空拦截任务。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道完全中断，美国政府明确拒绝恢复对话。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 94,
  events: [
    {
      id: "EVT-01",
      title: "美伊发生直接远程火力交换",
      description: "美国对伊朗发动空袭，随后伊朗向科威特和约旦基地的美军发射导弹。来源：Barchart。",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "两艘沙特油轮在红海遇袭",
      description: "胡塞武装使用无人机和导弹击中了两艘沙特油轮，引发大火。来源：ICIS。",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "国际油价触及六周新高",
      description: "受中东局势升级影响，布伦特原油最高涨至$98.78/桶。来源：Trading Economics。",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "主动战争",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "直接军事对抗从代理人冲突转向美伊国家间远程交火",
      "红海与霍尔木兹海峡形成双重海上封锁态势",
      "全球能源市场进入恐慌定价阶段"
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
        "变化：美伊之间发生直接对等军事打击，战火蔓延至第三国领空。",
        "延续：美军在海湾地区增加驻军规模以应对持续威胁。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要航道通行量跌至历史极低点，商业航运基本处于瘫痪。",
        "变化：红海袭击事件令全球航道避险范围进一步向西扩张。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布伦特原油强势上攻$100大关，单日涨幅突破5%。",
        "延续：美国战略石油储备（SPR）动用预期无法平息市场对实物断供的恐惧。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：特朗普政府维持“最大压力”军事策略，排斥外交斡旋。",
        "变化：伊朗发出全面报复警告，威胁攻击区域内所有亲美能源基建。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊领导层均将退缩视为政治自杀，缺乏妥协空间。",
      "多边外交渠道失灵，联合国安理会难以形成决议。"
    ],
    military: [
      "远程打击能力与防空拦截效率的博弈进入白热化阶段。",
      "非对称战争手段（如水雷、无人机）与传统航母战斗群的正面较量。"
    ]
  },
  scoreTrend: [
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
      score: 98
    },
    {
      date: "07-23",
      score: 94,
      active: true
    }
  ],
  keyChange: "美伊直接交火引发的能源溢价上攻",
  investmentSignal: "→ 维持能源与风险对冲头寸，通过增持黄金与防御型能源股降低风险敞口。",
  change: "none",
  prevRiskScore: 98,
  webSources: [
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkJMg2NI0JilODb9kvc7gXbIgwwy7zxfmgq7Ephul6urbCt4PX0XZ4EQRGCkK0NGg-wLl6_zEaukaDhufbe8GzlxlAF_zJFyEaXc5dtRjK-Hcd18F0TBTzBedonxYlMqM57YeSUsW9GveJ33sPkD04eBcut8Bd2RL_Nw=="
    },
    {
      title: "ice.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFUdbznciy90y0VOq3KdCPkbB2WfdbCTWcpT9UU3v0zNzh9Vd_jHKr7OfrDejT8QT6cw_G0uGK3OnYN8PPBq9zK8VSXhZ6DHHtkA26eF45PQi5nBJGZ7NDKlZPKE0kMXkTffwraeiCeRuVHnhHpUas="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGnlJVPSf2FsV41O7Pm1ZqQOc-uScoJY5cFA3WtC-5mnsQddm72XowZzGLhU-iitbeT-fFCGsNepK1k95vQcZXVsC09qlSt2wF54aqk2og9yEnSKvohRnuiU2_SxXarHsbdS4hPEGPV3ET9ltc="
    },
    {
      title: "invezz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELRv4qSr3Z8zAiXo6w6DdabkeFQ4_EkIF0LIplDKd_I1kUpffcJNpzPUWyBAv-TQmQytLeM47EYz7FuLNtEMi26vK8okQ8_27zjixYNEiuITxVELGeQ4SXmgIITasAVKcBURGdhCX1sR_0d2T2o9T0pw7RRw3_eDS3CE6GumvtHkWKxnL8Q7Qvlo_RHwWTK0DZo3GC2y1aTes1x4U1"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwwvgHhpxTs5F3T5u1nUsSr6CgJYu2JTvYfbm0kkU8rsBaZun5vRZXZGduyBuqkBXpjt-uJoKi1NqbuU5eI6pC-dCn9UPj82pbCqNwS3YdKx7xEKS3WU0T-xtZFozLdSBHg__F86IDWyMeFmTTC7M688s0gocYwcnaktSmvV2L"
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtl7VasdeI8DcD2MmlJxcHEj1ztZFH44YA-o-2FwggXfeowwOxsqqGm6Nl6bKb5MkKm8G2FKhLoHR2da9dGMxuu69ocm4glJP6wxmz9T3ZqFiIonc0nSSNXu6ODb_ZQfvABJcdeUKxRMWVWQhMw6AOWb4UFsuzpa6E43MipQk4Tpj0Cf3G_-4vvCnVnp2On-wpWy4HGUgm8pY="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpCv8iUWyMpdY5a7yEhGd3hdLRgYZX2yu-wB93757t1pWLSFmZIFvexFPq4LOWbR3sO02vf-zNRViqpPEIwn62gry8eFotoQqS4eU-moM87xS-pU_Z36iCs7J089M7FkjLa7X5yQaquWysEhPes9wwrZz9Y5WHIOHUPIIrIetfOmr1OcsTYdbCwqWDWd5erKVauJGA2KTzQzkOeWGpcFjSJSveBXoCPWxULedRB3P_TeAPr7f34LzcoBp8sOLpyUdpGeNMul6sBarTfomHWNdIMxxD8ZXzhE-GZfzP"
    },
    {
      title: "tapbit.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEhifz70Ir3MJyUqG3sskhhpjduPYBv-cLE08pqeFTMDF7YJLkUVBLi2Lsc5XrRHK97sspAgftiZ4pJ90D7jbPyX99A9nw5N_OqxKtApytFBLM47bski5-Wsa98Rf3Wy77nzLenrWHbu29PRFTCeznnVRcf2iGZmTbcchRS0hvhg8z7e8FVXMwO1_lvBjpfbsR5YAB3AjRmlNDSsX2D1iKpEUfW"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGVfqnxea8bdsarIwq3a4PfdQGQFLfEh1rXbHRgvRKBC7K4TLfQmVVkwj8YSlSutd95vIybMT6HPSXWbIEbXbz-kvwMV_z3Th1xw9s6Iss76ghlDtiLdDNo"
    },
    {
      title: "fxleaders.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHP95JiZ5tvFlLZNnVralxYqXJKhw2MkqmgwV1Qs4E29-Mq_vFqVCIvL6uiz-GXGbCVYbWTe855DGGtYbNeTGLxMN6dq9bSxLiQGTGK6mgh5VkNbfeKJii8bmgqwOVWtQrnA5vsVzIKLdP-OM0EvmjJeAyg_-43QQdT1KJpWIvIoGcbFp4tP-IXRIbhMJWn4cK3jtimH0HVCjR4iko="
    },
    {
      title: "economies.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH-IH4ChLzRBhui_xrjxYJFzSUJTy0ySO7TC6jTJj2E-gDWqPXg5RzhBfuMzcVVIkI5ktot0Mxcf178Drh-g-42nvZzfvlZKugcms_e2CdwJ6cvXTwHjXVHKdgrdL2NVRdEzMmOIh7vl1EnoP12PtfTWD8UMsOT14BPRmPiGEcgiwBLlk81UQtYDC2mmZRkeZ7xgdPfBfH6uDFifwY8xB-W5oVg4yj8QAd2wbdNAhrTJhDApGGChw_WO-mmUVE7rw=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range 2026-07-23 news trends",
    "WTI Brent crude oil price range July 23 2024 Reuters Bloomberg news",
    "WTI Brent oil price forecast July 2026 Middle East conflict scenario"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-23",
  version: "v2.134",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D145",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $88.08–$91.64 · Brent $95.77–$98.78",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Direct military conflict between US and Iran with missile strikes on regional bases.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Substantial closure of the Strait; Red Sea maritime crisis broadens.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Brent crude breaks $98 as supply disruption fears reach extreme levels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 5,
      weight: 0.2,
      description: "US directly engaging in combat; regional allies deeply involved in intercept missions.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels collapsed; US publicly rejects resumption of talks.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 94,
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Direct Missile Exchange",
      description: "US strikes Iran; Iran retaliates by firing missiles at US bases in Kuwait and Jordan. Source: Barchart.",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Saudi Tankers Hit in Red Sea",
      description: "Houthis strike two Saudi tankers with drones and missiles, causing major fires. Source: ICIS.",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Oil Prices Reach 6-Week High",
      description: "Brent crude hits $98.78 intraday amid Mideast escalation. Source: Trading Economics.",
      verification: "confirmed",
      timestamp: "2026-07-23",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Active War",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from proxy conflict to direct inter-state missile exchanges",
      "Dual maritime blockade in the Red Sea and Strait of Hormuz",
      "Energy markets enter panic-pricing phase"
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
        "Change: Direct peer-to-peer strikes occurring between US and Iranian forces.",
        "Continue: US continues buildup of troops and naval assets in the region."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Transits through major chokepoints remain near historic lows.",
        "Change: Red Sea risk zone expands westward following Saudi tanker attacks."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent crude pushing aggressively toward the $100 psychological level.",
        "Continue: Market remains unresponsive to potential SPR releases due to physical supply fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: US administration maintains a 'maximum pressure' stance via military means.",
        "Change: Tehran warns of a broader offensive against regional energy infrastructure."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Neither leadership can afford to back down without internal collapse.",
      "Multilateral diplomatic mechanisms remain paralyzed."
    ],
    military: [
      "Long-range strike capabilities testing the limits of regional missile defense.",
      "Asymmetric naval warfare vs traditional carrier strike group dominance."
    ]
  },
  scoreTrend: [
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
      score: 98
    },
    {
      date: "07-23",
      score: 94,
      active: true
    }
  ],
  keyChange: "Direct US-Iran engagement driving crude toward $100",
  investmentSignal: "→ Maintain energy and defensive hedges to counter extreme geopolitical tail risks.",
  change: "none",
  prevRiskScore: 98,
  webSources: [
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkJMg2NI0JilODb9kvc7gXbIgwwy7zxfmgq7Ephul6urbCt4PX0XZ4EQRGCkK0NGg-wLl6_zEaukaDhufbe8GzlxlAF_zJFyEaXc5dtRjK-Hcd18F0TBTzBedonxYlMqM57YeSUsW9GveJ33sPkD04eBcut8Bd2RL_Nw=="
    },
    {
      title: "ice.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFUdbznciy90y0VOq3KdCPkbB2WfdbCTWcpT9UU3v0zNzh9Vd_jHKr7OfrDejT8QT6cw_G0uGK3OnYN8PPBq9zK8VSXhZ6DHHtkA26eF45PQi5nBJGZ7NDKlZPKE0kMXkTffwraeiCeRuVHnhHpUas="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGnlJVPSf2FsV41O7Pm1ZqQOc-uScoJY5cFA3WtC-5mnsQddm72XowZzGLhU-iitbeT-fFCGsNepK1k95vQcZXVsC09qlSt2wF54aqk2og9yEnSKvohRnuiU2_SxXarHsbdS4hPEGPV3ET9ltc="
    },
    {
      title: "invezz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELRv4qSr3Z8zAiXo6w6DdabkeFQ4_EkIF0LIplDKd_I1kUpffcJNpzPUWyBAv-TQmQytLeM47EYz7FuLNtEMi26vK8okQ8_27zjixYNEiuITxVELGeQ4SXmgIITasAVKcBURGdhCX1sR_0d2T2o9T0pw7RRw3_eDS3CE6GumvtHkWKxnL8Q7Qvlo_RHwWTK0DZo3GC2y1aTes1x4U1"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwwvgHhpxTs5F3T5u1nUsSr6CgJYu2JTvYfbm0kkU8rsBaZun5vRZXZGduyBuqkBXpjt-uJoKi1NqbuU5eI6pC-dCn9UPj82pbCqNwS3YdKx7xEKS3WU0T-xtZFozLdSBHg__F86IDWyMeFmTTC7M688s0gocYwcnaktSmvV2L"
    },
    {
      title: "cryptobriefing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtl7VasdeI8DcD2MmlJxcHEj1ztZFH44YA-o-2FwggXfeowwOxsqqGm6Nl6bKb5MkKm8G2FKhLoHR2da9dGMxuu69ocm4glJP6wxmz9T3ZqFiIonc0nSSNXu6ODb_ZQfvABJcdeUKxRMWVWQhMw6AOWb4UFsuzpa6E43MipQk4Tpj0Cf3G_-4vvCnVnp2On-wpWy4HGUgm8pY="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpCv8iUWyMpdY5a7yEhGd3hdLRgYZX2yu-wB93757t1pWLSFmZIFvexFPq4LOWbR3sO02vf-zNRViqpPEIwn62gry8eFotoQqS4eU-moM87xS-pU_Z36iCs7J089M7FkjLa7X5yQaquWysEhPes9wwrZz9Y5WHIOHUPIIrIetfOmr1OcsTYdbCwqWDWd5erKVauJGA2KTzQzkOeWGpcFjSJSveBXoCPWxULedRB3P_TeAPr7f34LzcoBp8sOLpyUdpGeNMul6sBarTfomHWNdIMxxD8ZXzhE-GZfzP"
    },
    {
      title: "tapbit.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEhifz70Ir3MJyUqG3sskhhpjduPYBv-cLE08pqeFTMDF7YJLkUVBLi2Lsc5XrRHK97sspAgftiZ4pJ90D7jbPyX99A9nw5N_OqxKtApytFBLM47bski5-Wsa98Rf3Wy77nzLenrWHbu29PRFTCeznnVRcf2iGZmTbcchRS0hvhg8z7e8FVXMwO1_lvBjpfbsR5YAB3AjRmlNDSsX2D1iKpEUfW"
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGVfqnxea8bdsarIwq3a4PfdQGQFLfEh1rXbHRgvRKBC7K4TLfQmVVkwj8YSlSutd95vIybMT6HPSXWbIEbXbz-kvwMV_z3Th1xw9s6Iss76ghlDtiLdDNo"
    },
    {
      title: "fxleaders.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHP95JiZ5tvFlLZNnVralxYqXJKhw2MkqmgwV1Qs4E29-Mq_vFqVCIvL6uiz-GXGbCVYbWTe855DGGtYbNeTGLxMN6dq9bSxLiQGTGK6mgh5VkNbfeKJii8bmgqwOVWtQrnA5vsVzIKLdP-OM0EvmjJeAyg_-43QQdT1KJpWIvIoGcbFp4tP-IXRIbhMJWn4cK3jtimH0HVCjR4iko="
    },
    {
      title: "economies.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH-IH4ChLzRBhui_xrjxYJFzSUJTy0ySO7TC6jTJj2E-gDWqPXg5RzhBfuMzcVVIkI5ktot0Mxcf178Drh-g-42nvZzfvlZKugcms_e2CdwJ6cvXTwHjXVHKdgrdL2NVRdEzMmOIh7vl1EnoP12PtfTWD8UMsOT14BPRmPiGEcgiwBLlk81UQtYDC2mmZRkeZ7xgdPfBfH6uDFifwY8xB-W5oVg4yj8QAd2wbdNAhrTJhDApGGChw_WO-mmUVE7rw=="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range 2026-07-23 news trends",
    "WTI Brent crude oil price range July 23 2024 Reuters Bloomberg news",
    "WTI Brent oil price forecast July 2026 Middle East conflict scenario"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.134 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 94（↓4）：美伊直接交火引发的能源溢价上攻",
    bannerWarning: "→ 维持能源与风险对冲头寸，通过增持黄金与防御型能源股降低风险敞口。",
    deescalationIntent: "美伊领导层均将退缩视为政治自杀，缺乏妥协空间。",
    structuralRisk: "航道实质性关闭，胡塞武装在红海袭击沙特油轮进一步扩大海事危机。",
    contradictionNote: "美伊领导层均将退缩视为政治自杀，缺乏妥协空间。；远程打击能力与防空拦截效率的博弈进入白热化阶段。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第145天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.134 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 94 (↓4): Direct US-Iran engagement driving crude toward $100",
    bannerWarning: "→ Maintain energy and defensive hedges to counter extreme geopolitical tail risks.",
    deescalationIntent: "Neither leadership can afford to back down without internal collapse.",
    structuralRisk: "Substantial closure of the Strait; Red Sea maritime crisis broadens.",
    contradictionNote: "Neither leadership can afford to back down without internal collapse.; Long-range strike capabilities testing the limits of regional missile defense.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 145",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
