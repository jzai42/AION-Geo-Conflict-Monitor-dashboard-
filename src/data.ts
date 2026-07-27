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
  date: "2026-07-27",
  version: "v2.138",
  riskScore: 84,
  scoreTrend: [
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D149",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓10",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $83.08–$84.67 · Brent $85.23–$92.02",
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
      prev: 5,
      weight: 0.2,
      description: "美军暂停连续两周的轰炸行动，但维持高压封锁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡仍处于伊朗实质管控下，商业航行面临武力强制调头风险。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 4.5,
      weight: 0.2,
      description: "国际油价随停火信号剧烈回调，跌幅超10%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军资产仍在持续向地区移动，未有撤军迹象。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "阿曼斡旋机制启动，双方出现技术性停火默契。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军空袭进入第三日「战术静默」",
      description: "特朗普政府决定暂停自2月28日冲突以来最长的一轮连续打击行动，试图通过压力传导诱导伊朗妥协。",
      verification: "confirmed",
      timestamp: "2026-07-27",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "国际油价录得年内最大单日跌幅",
      description: "布伦特原油跌破$90关口，单日跌幅一度达13%，因市场重新评估封锁解除的可能性。",
      verification: "confirmed",
      timestamp: "2026-07-27",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "高强度冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "空袭行动进入间歇期，地面/海上封锁仍在继续",
      "第三国外交介入（阿曼、卡塔尔）进入实质技术阶段",
      "非正规战（无人机）持续活跃，主战线陷入静默博弈"
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
        "变化：美方暂停大规模空袭，旨在评估前期「史诗怒火」行动的损毁效果（Axios）。",
        "延续：美军维持对伊朗港口的远程封锁，约旦边境截获多架渗透无人机（Reuters）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗宣布海峡为「不可动摇红线」，持续拦截非获批航道船只（Iran TV）。",
        "变化：阿曼斡旋的航行安全机制正在草拟，商船保险费率出现小幅企稳迹象（Lloyds）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：地缘风险溢价因停火传闻而断崖式下跌，市场焦点转向需求侧与储备回补（Bloomberg）。",
        "延续：美对伊能源制裁维持顶格状态，物理供应缺口依然存在（EIA）。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普表态称伊朗「正变得越来越严肃」，正给予外交一定空间（Axios）。",
        "延续：伊朗官方口径坚决否认与美直谈，坚持先解除封锁再谈机制（AFP）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底解除海峡控制权 vs 伊朗要求撤除军事封锁作为前提",
      "特朗普的「极速和谈」压力与伊朗内部「抗战长期化」派系的对抗"
    ],
    military: [
      "封锁带来的经济绞杀 vs 代理人（胡塞等）在红海的干扰牵制"
    ]
  },
  keyChange: "美军空袭停摆与油价泡沫修正，标志着冲突由「纯军事对抗」转入「极限压力下的外交试探期」。",
  investmentSignal: "→ 对冲能源波动，风险资产维持防御，增持短期流动性资产。",
  prevRiskScore: 94,
  webSources: [
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0_Nmk0g4fpISuBc_Pgf5KfwBrwAtSM30edwv7E_8L_TOkbDZrriSRHLXZWaQ1tw8lgTCDo0j-gxN9svMinC-ZwNI61-c_1c4hokAWncUH-Il73waZ3JsQRlg2_S5RyBIifzI2WAjyn9fSL5jPPex8KreogCOPXlxh5JLzmxwK4QSeKwehqabDgmUaaIAu8ASDNI6tGuQmGQYLV0Pf6IZcZgwcn9UC0MMZLcYshKuOPmnshKEZynx37o5lL9bUkNT0"
    },
    {
      title: "ic.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGJDWa-fQpOWL91n5vPSdmax-wKRx2K9iVAC3D6631rxvMlVN7Q5aVo5-u0MFIx-L9Wmn22ehboZBp2wO4hRrM-zhRg16IR1p2AMK_eWQlAuiK0auBqSjwD5nh9AsYyS-3mU1q_5MnnWPUAk671XuA2Dl9DoBxwwscewGHVwFL9nR2_mft-7F_6mDfU8GTAyBIKrNdv0WXvQFXq8_HuFQ=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGUr4druUPbQ3JHYR3-AUYf0QvEuEOOMWofOp-uiU8v4dRDf7GK7yDg3Y8y3c5FVlAH_zMT6OOQXXwe2yV-mkaPpgigQ9Pu29drQnO7qhxy3dLMN_5s13eTDdUWL10or-kQwNn5BCFme1_Q_h0Q993Zy8uBCZE5Q-39dlvrLPlZoQ=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPYpsIFY8vUod-E6hyQZ8yE6W0IXFb_YRZH_Vk6eIlfWQINnfWytByQrGA9oxB2mCf55h7rPPPSVkn_0CLsCwG13Iu01yzJVXVa431xp0UESSv9QE3Im9y7ewRhNCzAjKi4TUVEjQiKxLVvYpbE1Jg1nvPbtA5NyZ00cggO38z0dYWUXS7m_4Lqfh51b8Y6Djl9gTVgAbX"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHrm9rfpVTKAkGqK2XCjWEwufnQh0DhaiO61If7bieE4YA0kzqII3B3-BnTm6qCquLQAPzAna4_ZZqSPXOKEz-JFgYUVjAEcGs1s5BFfJ3LgiczebxrpjSTEbKFcJBUA9BDMiOVcG4h169ICnSJEPdvKyj2wmeTJvXJ5wf3upmhkYxqTagX4pB-uA=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFcO_z3_DBLwu9r-t_6q0U2j_k2m9GJbuhZQFGWQKuyy_IUSXtbKW7cGfGXF_MMD1kJJosqBnrvi_id4ocbH2JuA_O0H67sy9ZRkbszxUMGRCYm5ZzRaJ5k9bxYd6PDUEh_"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGaMo13A7_0TXQzcaTCDZ45TCo_0OjJl_PghISQ8ASt2PCrz2V-Kd1RIh_OBwFCadPB0Y2J0BSsljD-fatO5JIWndbjBJVAJTT610OcUuAl9YIPE5q7R2AXjRP-LJLUQl-Br2sapMURpIdtgcdNvoQbVyZcWEATjd68WAQi4g_AU9vWPTPVVMVvN0DBDdZ0MpMAz4U="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFJ9GZBh6r3SnlA6GPRxiShyEOM46D8yi-UUhDLnFhGWT4MhHstMofhqolHji5aXK3l7j10m5twE0Mbo9iXNDTXidFeYPiPR1o8731WcOcESKweRfSxv0gfruZ4wyHF4hq3GzCsICIhEAxerDqLePrfkePcHMI_7M3WMH9lRs7W2dmJHrUQxYAMsZYzBHD92pCfeU="
    },
    {
      title: "fxleaders.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEGiZA1RSjeyy5klghXQ8sWuFLzfBDOfZSdD6tB-6QwifYMo9sRgQJ5XeAIHOXktQx12H0PtX2OGkMjohZtD7O0MegoRz5EshD5cYfEUBySz8lDR-zNq6WPgR4J56Gfdx9Hl-Aa8rVHPSN9M18BUS7zwYSe4yh7amy5pwkyuUFpH19gxY5h6EyEizjpigejdIDFI5rs0dY="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price July 27 2026 forecast trend",
    "US Iran military conflict news July 27 2026 Hormuz Strait status",
    "Middle East geopolitics US Iran tension update July 27 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-27",
  version: "v2.138",
  riskScore: 84,
  scoreTrend: [
    {
      date: "07-23",
      score: 94
    },
    {
      date: "07-24",
      score: 94
    },
    {
      date: "07-25",
      score: 94
    },
    {
      date: "07-26",
      score: 94
    },
    {
      date: "07-27",
      score: 84,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D149",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓10",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $83.08–$84.67 · Brent $85.23–$92.02",
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
      prev: 5,
      weight: 0.2,
      description: "US strikes paused for three nights while maintaining a high-pressure blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Strait remains under IRGC control with force used to turn back non-compliant vessels.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 4.5,
      weight: 0.2,
      description: "Crude prices saw a record daily drop as war premium evaporated.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains heavy carrier deployments and active naval blockade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Technical channels via Oman opened, though direct political talks are denied.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Strike Campaign Pauses for Third Night",
      description: "The longest break in airstrikes since the start of the conflict signals a tactical shift toward diplomacy.",
      verification: "confirmed",
      timestamp: "2026-07-27",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "Global Oil Prices Plunge 13%",
      description: "Brent benchmarks slumped as immediate fears of regional war were tempered by mediation news.",
      verification: "confirmed",
      timestamp: "2026-07-27",
      significance: "",
      critical: true
    }
  ],
  warPhase: {
    level: "High-Intensity Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Airstrikes paused; naval/economic blockade persists",
      "Third-party mediation (Oman/Pakistan) reaching technical level",
      "Drone activity continues on fringes while main fronts hold fire"
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
        "Change: US paused massive bombing to assess battle damage from 'Operation Epic Fury' (Axios).",
        "Continue: US naval blockade remains in place; drone intercepts reported over Jordan (Reuters)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Iran enforces 'Red Line' over the strait, intercepting vessels deviating from its routes (AFP).",
        "Change: Omani-led talks on maritime safety mechanism showing initial progress (CBS)."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Risk premiums collapsed as 'all-out war' expectations cooled significantly (Bloomberg).",
        "Continue: Strict sanctions on Iranian exports remain at maximum level (EIA)."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump states Iranians are 'getting more serious' as he gives talks space (Axios).",
        "Continue: Tehran denies direct negotiations, insisting on blockade removal as a precondition (AFP)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for total maritime freedom vs Iranian insistence on territorial sovereignty",
      "Internal US pressure for quick resolution vs Iranian long-war strategy"
    ],
    military: [
      "Blockade-induced economic strangulation vs Iranian asymmetrical proxy retaliations"
    ]
  },
  keyChange: "Pause in airstrikes combined with oil price correction marks a transition to a high-pressure negotiation phase.",
  investmentSignal: "→ Hedge energy volatility, maintain defensive postures, increase liquidity.",
  prevRiskScore: 94,
  webSources: [
    {
      title: "tradingkey.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0_Nmk0g4fpISuBc_Pgf5KfwBrwAtSM30edwv7E_8L_TOkbDZrriSRHLXZWaQ1tw8lgTCDo0j-gxN9svMinC-ZwNI61-c_1c4hokAWncUH-Il73waZ3JsQRlg2_S5RyBIifzI2WAjyn9fSL5jPPex8KreogCOPXlxh5JLzmxwK4QSeKwehqabDgmUaaIAu8ASDNI6tGuQmGQYLV0Pf6IZcZgwcn9UC0MMZLcYshKuOPmnshKEZynx37o5lL9bUkNT0"
    },
    {
      title: "ic.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGJDWa-fQpOWL91n5vPSdmax-wKRx2K9iVAC3D6631rxvMlVN7Q5aVo5-u0MFIx-L9Wmn22ehboZBp2wO4hRrM-zhRg16IR1p2AMK_eWQlAuiK0auBqSjwD5nh9AsYyS-3mU1q_5MnnWPUAk671XuA2Dl9DoBxwwscewGHVwFL9nR2_mft-7F_6mDfU8GTAyBIKrNdv0WXvQFXq8_HuFQ=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGUr4druUPbQ3JHYR3-AUYf0QvEuEOOMWofOp-uiU8v4dRDf7GK7yDg3Y8y3c5FVlAH_zMT6OOQXXwe2yV-mkaPpgigQ9Pu29drQnO7qhxy3dLMN_5s13eTDdUWL10or-kQwNn5BCFme1_Q_h0Q993Zy8uBCZE5Q-39dlvrLPlZoQ=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPYpsIFY8vUod-E6hyQZ8yE6W0IXFb_YRZH_Vk6eIlfWQINnfWytByQrGA9oxB2mCf55h7rPPPSVkn_0CLsCwG13Iu01yzJVXVa431xp0UESSv9QE3Im9y7ewRhNCzAjKi4TUVEjQiKxLVvYpbE1Jg1nvPbtA5NyZ00cggO38z0dYWUXS7m_4Lqfh51b8Y6Djl9gTVgAbX"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHrm9rfpVTKAkGqK2XCjWEwufnQh0DhaiO61If7bieE4YA0kzqII3B3-BnTm6qCquLQAPzAna4_ZZqSPXOKEz-JFgYUVjAEcGs1s5BFfJ3LgiczebxrpjSTEbKFcJBUA9BDMiOVcG4h169ICnSJEPdvKyj2wmeTJvXJ5wf3upmhkYxqTagX4pB-uA=="
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFcO_z3_DBLwu9r-t_6q0U2j_k2m9GJbuhZQFGWQKuyy_IUSXtbKW7cGfGXF_MMD1kJJosqBnrvi_id4ocbH2JuA_O0H67sy9ZRkbszxUMGRCYm5ZzRaJ5k9bxYd6PDUEh_"
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGaMo13A7_0TXQzcaTCDZ45TCo_0OjJl_PghISQ8ASt2PCrz2V-Kd1RIh_OBwFCadPB0Y2J0BSsljD-fatO5JIWndbjBJVAJTT610OcUuAl9YIPE5q7R2AXjRP-LJLUQl-Br2sapMURpIdtgcdNvoQbVyZcWEATjd68WAQi4g_AU9vWPTPVVMVvN0DBDdZ0MpMAz4U="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFJ9GZBh6r3SnlA6GPRxiShyEOM46D8yi-UUhDLnFhGWT4MhHstMofhqolHji5aXK3l7j10m5twE0Mbo9iXNDTXidFeYPiPR1o8731WcOcESKweRfSxv0gfruZ4wyHF4hq3GzCsICIhEAxerDqLePrfkePcHMI_7M3WMH9lRs7W2dmJHrUQxYAMsZYzBHD92pCfeU="
    },
    {
      title: "fxleaders.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEGiZA1RSjeyy5klghXQ8sWuFLzfBDOfZSdD6tB-6QwifYMo9sRgQJ5XeAIHOXktQx12H0PtX2OGkMjohZtD7O0MegoRz5EshD5cYfEUBySz8lDR-zNq6WPgR4J56Gfdx9Hl-Aa8rVHPSN9M18BUS7zwYSe4yh7amy5pwkyuUFpH19gxY5h6EyEizjpigejdIDFI5rs0dY="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price July 27 2026 forecast trend",
    "US Iran military conflict news July 27 2026 Hormuz Strait status",
    "Middle East geopolitics US Iran tension update July 27 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.138 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（↓10）：美军空袭停摆与油价泡沫修正，标志着冲突由「纯军事对抗」转入「极限压力下的外交试探期」。",
    bannerWarning: "→ 对冲能源波动，风险资产维持防御，增持短期流动性资产。",
    deescalationIntent: "美方要求彻底解除海峡控制权 vs 伊朗要求撤除军事封锁作为前提",
    structuralRisk: "海峡仍处于伊朗实质管控下，商业航行面临武力强制调头风险。",
    contradictionNote: "美方要求彻底解除海峡控制权 vs 伊朗要求撤除军事封锁作为前提；封锁带来的经济绞杀 vs 代理人（胡塞等）在红海的干扰牵制",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第149天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.138 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (↓10): Pause in airstrikes combined with oil price correction marks a transition to a high-pressure negotiation phase.",
    bannerWarning: "→ Hedge energy volatility, maintain defensive postures, increase liquidity.",
    deescalationIntent: "US demand for total maritime freedom vs Iranian insistence on territorial sover…",
    structuralRisk: "Strait remains under IRGC control with force used to turn back non-compliant vessels.",
    contradictionNote: "US demand for total maritime freedom vs Iranian insistence on territorial sovereignty; Blockade-induced economic strangulation vs Iranian asymmetrical proxy re…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 149",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
