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
  date: "2026-08-27",
  version: "v2.170",
  riskScore: 76,
  change: "none",
  keyStats: [
    {
      label: "冲突天数",
      value: "D180",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $81.5–$83.5 · Brent $85.5–$87.5",
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
      description: "美军在 CENTCOM 辖区维持包括俄亥俄级核潜艇在内的高压部署。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主要商业班轮因伊朗方面威胁及美方捕获行动持续避开该海域。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "油价回落至 $85 附近，但地缘溢价因封锁预期依然存在。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "冲突已导致美国驻欧防御库存被挪用，引发北约盟友安全忧虑。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "美方公开拒绝当前谈判，双方均无妥协迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军欧洲导弹库存预警",
      description: "美联社报道美驻欧战备库存因支援美伊战争陷入「极度危险」状态，削弱北约对俄威慑力。",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "白宫明确拒绝和谈",
      description: "总统发言人重申对伊极限施压立场，否认近期存在外交接触的可能性。",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "卡塔尔外交调停开启",
      description: "卡塔尔首相计划访问德黑兰，尝试缓解霍尔木兹海峡的海上对峙。",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军转向防御性消耗战姿态",
      "外交谈判处于完全真空期",
      "海事法律战成为新角力场"
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
        "延续：佐治亚号核潜艇在波斯湾外围维持精确打击威慑。",
        "变化：因弹药库存压力，美军空袭频次出现阶段性下调。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡通行维持许可制，实际流量不足战前五成。",
        "变化：美国司法部启动针对伊朗油轮的财产化拍卖程序。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球库存仍处于防御性积累周期。",
        "变化：Brent 油价自昨日高位回落至 $85-$87 均衡带。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：特朗普政府维持「不谈判、不妥协」的铁腕叙事。",
        "变化：伊朗外交部表现出愿意接受第三方（卡塔尔）非正式调解的姿态。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压与伊朗生存底线的零和博弈",
      "白宫内政需求与中东战局持久化的矛盾"
    ],
    military: [
      "前线高弹药消耗与全球防御体系库存亏空的冲突",
      "反导系统覆盖范围与伊朗无人机蜂群打击的成本差"
    ]
  },
  scoreTrend: [
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76,
      active: true
    }
  ],
  keyChange: "美欧防务库存危机凸显，战争外溢效应从能源转向全球安全架构脆弱性。",
  investmentSignal: "→ 维持能源防御仓位，减持受库存缺口影响的欧洲风险资产，增加防务板块对冲。",
  prevRiskScore: 78,
  webSources: [
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEmk5FpbLRH2CBrale6egHoO1upAHixH37N2u22j_I_72d15ISZoPNoFyZ2EU1Ca_UVNlPdf9jHivl8W1_ulKFfNa5X_tMtOt_i8OkQGmyioo1UqLImCICQ_5FXezOFbX_4EQ_lgadCyOWP5odL1nEGD2MCRU73z1e4kIcpoTKvcd2XOiLN5PqmTv0uZvwezR7R1Vtg6RjqC1KjHI7eKYEpf0mP3SGhYf0HB0GN"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgvP0-thZa--ytsyIzuAj80b6DmSV0rKac3MdCrk-HbnOUBLi-wrLNUfArHvPqrDXOX_rOwB1pF4PKgxnUlc3i1uzl_bPFAbt9NkWXR4kDHrBBV-g4bkbmzKEeu_VwbLdRWVL5aLWsdjPyi15tKF1h65r03NM="
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRhzAqWCQ7JwyGgFwVu0Zoqajr0LZ2qrODBjimjYebGNAGLS21pq1Fwd0GU4DzbG7LYLmriX7ZCXtau9FC9Pf2R-KDL88AOC6C0sot4r-q2jUkX57psiAIZa5VNgDqMxz-PJDHeHmp1VG6L28vN5PX9nboEav68xvQnOkh2-F6Iuy6WxTV8_0hWdsxC-qIGPFYDJkF-VqcSUsQMg=="
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE71IaGyq-Vtx0W7nEjbNvAwhqmSBr-Y3pk-YJ-72-GONzPilEzl5VdlqkIbCnK2KqDXTS5AsE-yW6gy5TxibVKRB4TsoBxMn4dFUmIgFvGLQ2xrsNEjjhs-yuXDyKvleVdx4j4XhbonekDzpv2dQEc1pVhdFE4Hq5S-RiLaOp9Uql6nFqufThLIpKwhPNoE9BkMwFzbV5QPBEBa3oxxO24B-NDC8y77qLD4gMf6TpNnsELZ1qF-RxzCg=="
    },
    {
      title: "2news.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHeYKKzB-QqGQl0jav104nFRS0WZJB3K_NL7zZNZj14gMgd-v63MOihv0y9H1ewkvVQxsCeQblH13QcSxCowTWyk_tf9-lP_r5un3zuDZe8qpYw8-jvvuCKpUb3TFoe1UTmb9QRhJmaY2r96_Z7f-TeLOTWoNhIA5KEot2_wjGJ1HMaofnB9y923UwcnfiGzW3XHcnDfZZE2tUzQ18jc91mGICQzZxdzuSiqE2nCUEsd9e7asxL6mxWmozQAQh6oIbeWbp-2QEG5-NI6Zu4Ar0Snoul5M1ecaYd0WeTIdWJnBNjCZYGk459"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFf3qgfhHpgQn_iZQIo_-L1y35tITlgUug5TH0vshRV61lA8x2fpqGvpIufnoQ2FrVgFRKLE2VATAvmYScB5MlPKw_rxG2336wUcyg4M2Q_kf7XtJACPv5daY5AcrXHo3d_0e-m129lT_uO68Bn1rGfXEarXLf2PCr_avPGtS7w"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpK6Gb3UOn-68Nx45V4gpc8eOYcHW5O2F-SHqIX9OA1KaXAaDxZo4SG5hzAzEs2ywR1DFPsl4HTuwDyfb3NegirRWR34uO-jOOL3-IhF9-29ho3WQ9c-1KYpoVWdag1o81aRRDXqbX4YU4"
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZfUFEQq0GCV2chU7BrXSZBsx_j7i2-QuDVYbkNJN9wpW3HHSyDknxDqyHovu9lhI4nCKyqg97XbqdV89iteIzx31dKVXukXIOWxlBICCmJpTvM-QajakTLkZbK0fg1fO_CAZSSIATkXZ-81SkLFron67OEjeHRXODag=="
    },
    {
      title: "zona-militar.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-zIa99s8LX7WDjDJNm24RNn4OcBBzwWDMDu8cP5vq2okGyetZmvINCsPRlhe2MabjeO_v7p19v4QKl-q73KLuDICp3HRTAR0wj3bNNPWB5srTiyNaE5vQvZ4oBm9K41QSxll80_szTPpLj6PdZc65LSUvuY6ZkEge-m4I3j65A3eXTOlpDvhxlxBZ4bfb_8lB9aNCO3e-XbwJ44y4-s37MXW0-QP20fF-0tFTmbPrAdxh-WuSe4XThkCgaizV1fwIOVW_Ltl7aVLuQZd0TUuEKrmrSeqghmFOSVECVVzd-vSgAremNCQQBW46se6x5zdv6cDmLzB6xIhfHnt_KIBRcRM6Qbe9cdfhxRtCzkrbDGTro6Y="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbFwT1oqZMnTyPTQCkT4bGvafspctCJBLOhF1Ehoa3OvcheUDOREtfW_NciWaTLxhW9oHuzBbRaHBieMA_NWYObIdsHHbZBHK5Vy9JfCS2uLUAdVmGstgrjIxXW-TLTnBjw4oQ9ks0NZf2-Mnf8snn"
    },
    {
      title: "fdd.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0tH8iNpAtK2K8mZLj2YvIVbIi_v8aUKbWhAUg7vqDYY8cCMBpHQtE9l0MxLiMH6Y9XgvR-nbtfNyXfblx6G6ZDVs14AThWOgSqSYUDpyauC2JdNMg_nI2Qn4_ops4_0mO8V1R33Wa32c="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3Dx7c1dncCm8WYkVq28bwf_WVLUxhK6CuGgG7FQWNf9Bn2PelIRmhtbKw5JTw-8dJYCfA30Y-93z8QsNAbRXSHnEaBIdqH7I_BQiKvlK9DHKn28LzLbzYSbvBISm5ANPT9h_D_1t2URfVBQk="
    },
    {
      title: "middle-east-online.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFh4Hy_ryIxatVwJJIpUXA0qis8QAgdPs75wY4kb0wOZfLFhwuXpgBqtzhoujBzRMCDDnpAQhME357u_SXf0yzXHg7xh8qdYze557T3IxM-BcWQkMq62EUM_r0KGYy2Knb3FuDm_BjZz3v6OU0sDmeW6z_MfpmhsArWadApi1TrKpyHRPPLaWoWeFnXh0yU4z9VbQ=="
    },
    {
      title: "signalscv.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5_DaZMwqCWj4TCpa-WsHhe6Hs3Ou1PMXtlDmPED7jjWLoCaQuvBFvCl0kcUfZq8ZytEI_Y7RXHSttXVFblBxmyk6ety4SqQtp8VyZujTDM6z0QpxxhWwvhOtBmzl2ISJOs0N5f_sxnyYGXlv7Xfa-WTyKF5euvdKA0cjKDXYSMqihIZTDnDo="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 27 2024 trends Bloomberg Reuters",
    "US Iran conflict latest news August 27 2024 AP Reuters Pentagon",
    "USS Georgia deployment Middle East August 2024 confirmed"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-27",
  version: "v2.170",
  riskScore: 76,
  change: "none",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D180",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $81.5–$83.5 · Brent $85.5–$87.5",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severe Restriction",
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
      description: "High-pressure deployment of SSGN assets persists in CENTCOM AOR.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial traffic remains depressed as maritime legal warfare intensifies.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oil prices stabilized near $85 as supply fears are balanced by inventory adjustments.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US defense stocks in Europe reach critical lows due to Middle East war reallocation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 5,
      weight: 0.2,
      description: "Direct negotiation channels remain non-existent; stances hardened on both sides.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "European Missile Stock Alert",
      description: "AP reports US Patriot stocks in Europe at 'beyond critical' levels due to Iran war drainage.",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "WH Rejects Peace Talks",
      description: "Press Secretary confirms zero active negotiations with Tehran, maintaining maximum pressure.",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Qatari Mediation Launched",
      description: "Qatari PM to visit Tehran to discuss potential maritime de-escalation solutions.",
      verification: "confirmed",
      timestamp: "2026-08-27",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Pivot to defensive resource-attrition model",
      "Complete diplomatic vacuum in official channels",
      "Emergence of maritime legal warfare as key front"
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
        "Continue: USS Georgia maintains Tomahawk deterrence in Persian Gulf periphery.",
        "Change: Tactical shift to munitions conservation as global inventories tighten."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Strait transit restricted to <50% of pre-war volume.",
        "Change: DOJ activates civil-war era prizes act to auction seized tankers."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Market pricing in long-term blockade structural risks.",
        "Change: Brent prices retreat to $85-$87 range following global inventory recalibration."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Trump administration maintains zero-compromise rhetoric.",
        "Change: Tehran signals willingness for informal mediation via Doha."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Zero-sum game between US pressure and Iranian regime survival",
      "Conflict between US domestic optics and the reality of a protracted war"
    ],
    military: [
      "High front-line consumption vs global defensive architecture depletion",
      "Cost asymmetry between anti-missile interceptors and UAV swarm tactics"
    ]
  },
  scoreTrend: [
    {
      date: "08-23",
      score: 78
    },
    {
      date: "08-24",
      score: 78
    },
    {
      date: "08-25",
      score: 78
    },
    {
      date: "08-26",
      score: 78
    },
    {
      date: "08-27",
      score: 76,
      active: true
    }
  ],
  keyChange: "US-Europe defense inventory crisis highlights the war's spillover from energy to global security architecture.",
  investmentSignal: "→ Maintain energy defensive positions, reduce exposure to European risk assets affected by inventory gaps.",
  prevRiskScore: 78,
  webSources: [
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEmk5FpbLRH2CBrale6egHoO1upAHixH37N2u22j_I_72d15ISZoPNoFyZ2EU1Ca_UVNlPdf9jHivl8W1_ulKFfNa5X_tMtOt_i8OkQGmyioo1UqLImCICQ_5FXezOFbX_4EQ_lgadCyOWP5odL1nEGD2MCRU73z1e4kIcpoTKvcd2XOiLN5PqmTv0uZvwezR7R1Vtg6RjqC1KjHI7eKYEpf0mP3SGhYf0HB0GN"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgvP0-thZa--ytsyIzuAj80b6DmSV0rKac3MdCrk-HbnOUBLi-wrLNUfArHvPqrDXOX_rOwB1pF4PKgxnUlc3i1uzl_bPFAbt9NkWXR4kDHrBBV-g4bkbmzKEeu_VwbLdRWVL5aLWsdjPyi15tKF1h65r03NM="
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRhzAqWCQ7JwyGgFwVu0Zoqajr0LZ2qrODBjimjYebGNAGLS21pq1Fwd0GU4DzbG7LYLmriX7ZCXtau9FC9Pf2R-KDL88AOC6C0sot4r-q2jUkX57psiAIZa5VNgDqMxz-PJDHeHmp1VG6L28vN5PX9nboEav68xvQnOkh2-F6Iuy6WxTV8_0hWdsxC-qIGPFYDJkF-VqcSUsQMg=="
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE71IaGyq-Vtx0W7nEjbNvAwhqmSBr-Y3pk-YJ-72-GONzPilEzl5VdlqkIbCnK2KqDXTS5AsE-yW6gy5TxibVKRB4TsoBxMn4dFUmIgFvGLQ2xrsNEjjhs-yuXDyKvleVdx4j4XhbonekDzpv2dQEc1pVhdFE4Hq5S-RiLaOp9Uql6nFqufThLIpKwhPNoE9BkMwFzbV5QPBEBa3oxxO24B-NDC8y77qLD4gMf6TpNnsELZ1qF-RxzCg=="
    },
    {
      title: "2news.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHeYKKzB-QqGQl0jav104nFRS0WZJB3K_NL7zZNZj14gMgd-v63MOihv0y9H1ewkvVQxsCeQblH13QcSxCowTWyk_tf9-lP_r5un3zuDZe8qpYw8-jvvuCKpUb3TFoe1UTmb9QRhJmaY2r96_Z7f-TeLOTWoNhIA5KEot2_wjGJ1HMaofnB9y923UwcnfiGzW3XHcnDfZZE2tUzQ18jc91mGICQzZxdzuSiqE2nCUEsd9e7asxL6mxWmozQAQh6oIbeWbp-2QEG5-NI6Zu4Ar0Snoul5M1ecaYd0WeTIdWJnBNjCZYGk459"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFf3qgfhHpgQn_iZQIo_-L1y35tITlgUug5TH0vshRV61lA8x2fpqGvpIufnoQ2FrVgFRKLE2VATAvmYScB5MlPKw_rxG2336wUcyg4M2Q_kf7XtJACPv5daY5AcrXHo3d_0e-m129lT_uO68Bn1rGfXEarXLf2PCr_avPGtS7w"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpK6Gb3UOn-68Nx45V4gpc8eOYcHW5O2F-SHqIX9OA1KaXAaDxZo4SG5hzAzEs2ywR1DFPsl4HTuwDyfb3NegirRWR34uO-jOOL3-IhF9-29ho3WQ9c-1KYpoVWdag1o81aRRDXqbX4YU4"
    },
    {
      title: "businessinsider.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHZfUFEQq0GCV2chU7BrXSZBsx_j7i2-QuDVYbkNJN9wpW3HHSyDknxDqyHovu9lhI4nCKyqg97XbqdV89iteIzx31dKVXukXIOWxlBICCmJpTvM-QajakTLkZbK0fg1fO_CAZSSIATkXZ-81SkLFron67OEjeHRXODag=="
    },
    {
      title: "zona-militar.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-zIa99s8LX7WDjDJNm24RNn4OcBBzwWDMDu8cP5vq2okGyetZmvINCsPRlhe2MabjeO_v7p19v4QKl-q73KLuDICp3HRTAR0wj3bNNPWB5srTiyNaE5vQvZ4oBm9K41QSxll80_szTPpLj6PdZc65LSUvuY6ZkEge-m4I3j65A3eXTOlpDvhxlxBZ4bfb_8lB9aNCO3e-XbwJ44y4-s37MXW0-QP20fF-0tFTmbPrAdxh-WuSe4XThkCgaizV1fwIOVW_Ltl7aVLuQZd0TUuEKrmrSeqghmFOSVECVVzd-vSgAremNCQQBW46se6x5zdv6cDmLzB6xIhfHnt_KIBRcRM6Qbe9cdfhxRtCzkrbDGTro6Y="
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbFwT1oqZMnTyPTQCkT4bGvafspctCJBLOhF1Ehoa3OvcheUDOREtfW_NciWaTLxhW9oHuzBbRaHBieMA_NWYObIdsHHbZBHK5Vy9JfCS2uLUAdVmGstgrjIxXW-TLTnBjw4oQ9ks0NZf2-Mnf8snn"
    },
    {
      title: "fdd.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0tH8iNpAtK2K8mZLj2YvIVbIi_v8aUKbWhAUg7vqDYY8cCMBpHQtE9l0MxLiMH6Y9XgvR-nbtfNyXfblx6G6ZDVs14AThWOgSqSYUDpyauC2JdNMg_nI2Qn4_ops4_0mO8V1R33Wa32c="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3Dx7c1dncCm8WYkVq28bwf_WVLUxhK6CuGgG7FQWNf9Bn2PelIRmhtbKw5JTw-8dJYCfA30Y-93z8QsNAbRXSHnEaBIdqH7I_BQiKvlK9DHKn28LzLbzYSbvBISm5ANPT9h_D_1t2URfVBQk="
    },
    {
      title: "middle-east-online.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFh4Hy_ryIxatVwJJIpUXA0qis8QAgdPs75wY4kb0wOZfLFhwuXpgBqtzhoujBzRMCDDnpAQhME357u_SXf0yzXHg7xh8qdYze557T3IxM-BcWQkMq62EUM_r0KGYy2Knb3FuDm_BjZz3v6OU0sDmeW6z_MfpmhsArWadApi1TrKpyHRPPLaWoWeFnXh0yU4z9VbQ=="
    },
    {
      title: "signalscv.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5_DaZMwqCWj4TCpa-WsHhe6Hs3Ou1PMXtlDmPED7jjWLoCaQuvBFvCl0kcUfZq8ZytEI_Y7RXHSttXVFblBxmyk6ety4SqQtp8VyZujTDM6z0QpxxhWwvhOtBmzl2ISJOs0N5f_sxnyYGXlv7Xfa-WTyKF5euvdKA0cjKDXYSMqihIZTDnDo="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 27 2024 trends Bloomberg Reuters",
    "US Iran conflict latest news August 27 2024 AP Reuters Pentagon",
    "USS Georgia deployment Middle East August 2024 confirmed"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.170 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↓2）：美欧防务库存危机凸显，战争外溢效应从能源转向全球安全架构脆弱性。",
    bannerWarning: "→ 维持能源防御仓位，减持受库存缺口影响的欧洲风险资产，增加防务板块对冲。",
    deescalationIntent: "美国极限施压与伊朗生存底线的零和博弈",
    structuralRisk: "主要商业班轮因伊朗方面威胁及美方捕获行动持续避开该海域。",
    contradictionNote: "美国极限施压与伊朗生存底线的零和博弈；前线高弹药消耗与全球防御体系库存亏空的冲突",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第180天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.170 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↓2): US-Europe defense inventory crisis highlights the war's spillover from energy to global security architecture.",
    bannerWarning: "→ Maintain energy defensive positions, reduce exposure to European risk assets affected by inventory gaps.",
    deescalationIntent: "Zero-sum game between US pressure and Iranian regime survival",
    structuralRisk: "Commercial traffic remains depressed as maritime legal warfare intensifies.",
    contradictionNote: "Zero-sum game between US pressure and Iranian regime survival; High front-line consumption vs global defensive architecture depletion",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 180",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
