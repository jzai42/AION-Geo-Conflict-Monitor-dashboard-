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
  date: "2026-08-10",
  version: "v2.152",
  keyStats: [
    {
      label: "冲突天数",
      value: "D163",
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
      value: "WTI $78.2–$79.6 · Brent $83.3–$85.0",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "流量严重受限",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 70,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "五角大楼动用《国防生产法》加速弹药补给，前线对峙维持高烈度。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "虽然伊朗提及新航线协议，但实际商业流量依然中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "油价在$75-$85区间企稳，对冲了部分供应中断恐慌。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国双航母部署维持，行政部门推进1.5万亿国防拨款。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "阿曼斡旋渠道虽有进展，但伊朗提出的条件（战争赔偿）在美方政治框架内难以达成。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "五角大楼要求军工巨头21天内提交加速生产方案",
      description: "副部长Feinberg备忘录要求大幅缩短Tomahawk与Patriot拦截弹生产周期以填补战耗。",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗-阿曼航线协议接近达成",
      description: "旨在建立受控的受保障航行通道，但伊朗拒绝立即全面恢复商船通航。",
      verification: "confirmed",
      timestamp: "2026-08-09",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "布伦特原油价格反弹至84.5美元",
      description: "市场对伊朗重申限制海峡权力的表态作出反应，风险溢价未见实质消退。",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军进入‘产能防御’模式，侧重供应链安全性而非立即扩大战线。",
      "伊朗利用海峡通航权作为谈判筹码，尝试通过‘阿曼路径’换取经济让步。",
      "市场进入高位平台期，波动率收敛但风险底色未变。"
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
        "延续：美国林肯号航母战斗群在阿曼湾维持既定巡航任务。",
        "变化：五角大楼首次承认拦截弹库存面临‘烧穿率’压力并启动工业动员。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡商业流量维持停滞，战险保费较冲突前上涨50倍以上。",
        "变化：伊朗与阿曼正协商绕过现有封锁区的‘特定航道’，目前处于技术对齐阶段。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价在$80上下窄幅波动，市场计入了长期的海峡扰动预期。",
        "变化：阿曼Ras Markaz终端作为替代存储点的战略地位因局势不稳而显著提升。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫称美方仅处于‘半谈判’状态，拒绝承认达成实质妥协。",
        "变化：伊朗安全首脑Rezaei任命后，伊朗对海峡的管控立场更趋向于‘精细化勒索’。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗要求‘先赔偿再开海’与美国‘先撤防再谈判’的顺序矛盾。"
    ],
    military: [
      "美军前方部署的战术主动权与国内后方弹药产能不足之间的资源缺口矛盾。"
    ]
  },
  scoreTrend: [
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70,
      active: true
    }
  ],
  keyChange: "美军启动工业动员以补足弹药缺口，冲突进入消耗战逻辑下的静态博弈。",
  investmentSignal: "→ 维持能源与避险资产防御性配置",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_gN8ZyB2zPx3KAsfsciomRNOXq2c9cV1eGG9HsSyvTDIq_roRLrQUxMGRwPHikojKxnWM9tHruC39UsR6zpR6ZW6ybR7jKgAGbyCJFUFEL4VAmfX3XW9jG0SVA3-lh_FxpSJ3uu_XeFafX9L7hI4HzqcV9g=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPjDKhIpvsgb-h9gh4obDjXcRhwTedt3f3o7MQuQEWmgwJJe2kcO0-SSLlR0mhMXaeRCb6qQ5v45BW02BfCmlKBk-HvG4Dm6PQJ7mCCvBM2M46uEHe5bMdPd6C8COj68C3lnbsBTr1WCU6W-b0S60Ev-GWk9DAqyhaCKXtCLVqyPHO-ZkILxlYHDvkEkbd8IcslrpsUGxdE-sGH2pt__H6ERgyyOpZqak6VVudXpbdzQCXz_0="
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFsM6STAApBHBebSSp9eTF5zaHEPR4BhDOqC_jrczzgLQX5_MNHHK2gj7iTt-n1_UWXTHoPCwFLU14BkK0h41UXM2AEMag84F2ZzIj4l7ewnbO91EPWQ7FQDs89AxQSDtpwgNML3eIllWTkrs_qK9asBcrNIpmF6pODrjeMvKlEXjX9paQqlHmhwY9imFRB5-Z3sovqpYfnQ6Y-DhNosX8U4wvH9ZxmjUVzBQeP2P_vtroLaakhIM28N_IZMZFr-ZImstfZiBS0wcLTuw=="
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5-j44LJsLHdptpTc1URlLperrzEOREOuEnrBJd8JhzHX5CvmNErP-NHN69QAt3AO7f57KC0GdS1eFrhKPJKj76T8p1qBjRKSwApNBM4wB0IfQweVQttVyW3cadSk-qSZiGBRH8wEUWXKL5pJv-674PSopKUxDRUUpirpWQrAji3aJm-qGqvA9d2jhSqmG-BbBpsp2HxO-7hSacKXvb350QbWuwkzf-Q=="
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0LuR8Sx5pvTTnLkCJJf31eTH_Kua8J_rUlwAyVpYOGg6YbLvpZ4zAi1TwBKionZoJ6ABK2_BYsGC3_FbOr2eWUJQKyon0dxlr6RpTOzLpKA=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGT-MIc5gdm0URR4gkAvEsevA-COZjTg8mgnUyMcgBJXGENIgvK-H92mP0tzzCOcvKEB8dfp5WD5Gk4pPg_IYY_ATAk77rOptivEopW0k9r_RxSg4mGTpZ80-k4azTmxv5Uvmr3r6m0ocrrb1D9DR9YXvLMkNmvYWaNyo6W"
    },
    {
      title: "fxdailyreport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFUm_Pj912JHDoQagB06J981pLLBKS8aRksPQcCuxHV4Lyld6l5Q82Xnx2iARDeURCnmeUe9vs0yMu2zdjRD_Sv8IKLejVZUZwCX26QJjFFEucK0w5oVJqNJLnwFdritBlpGjZxYHH7kzanPMdpqYREzx1SL8zIVMCqnRCWgzYL"
    },
    {
      title: "bignewsnetwork.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGuOYKkP3GmM3koEBtBTEyKbevFPGasljkEDJQEMRqdKpUMNttDSEDu7cfoCJdDd3YWwqcKB2hlTWFFE14T9cwGlXp7IaaagQ690rdAL_3Gs_tjmfpfMtBLk6RsrgE1GjXUdm-lIcRjOECoY78dmZPvNlx8snIqdZpzrFw6QWluOug"
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1GDG3sWhrp9lj2JHFwpAZmoPhPxHeyd9HA9Uwo0ac7EMD33i5ySsnjTFFLaqyrKxD95a-6xdbt-a5sFEYGGqn8stFQqYeBUm8UAPPprI1I4sxlIOvFu691z_T9OwevFa7454SDWbyCNqx8DrPXPG-m3IO5HjxMxnYTQ4uM1Sc0-gSMvtO5Nfr51SN-LUy3X5p_v4hGvG7xpGABvXpfbVLH00ZrH8fnML4i9WcyTA6X-pK9DbvRTPhfwvuKrUWfIuF2g=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvi_aiFySoclIvc5uiMd_froU2qmNmP1R2QLrEzRj5yYED-6QjHmtqZpDJ9F3G8wqpIpcWwbeA4246CSe6AkOVWVOBZK9NbifekDZZWfxK9mEAvqkMOXaAyVCvlCU15CCstQdF5g=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_sjXAOJdIQe2HkwnhhCPijXz4-TSD-pQ4yH1DZ58BLsJt_JBPdcTEr8vGAqS4EhFFdKeSSJvCxbvOZNbB8e6tasbvlNcWncTflcdPW5IJdlB2oGxvgWs="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 10 2024 2026 trend",
    "US Iran conflict news August 9 10 2024 Pentagon deployment",
    "Hormuz strait shipping status August 10 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-10",
  version: "v2.152",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D163",
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
      value: "WTI $78.2–$79.6 · Brent $83.3–$85.0",
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
  riskScore: 70,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Pentagon invokes DPA to boost production; standoff remains tense.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Hormuz traffic remains at ~15% of normal; 200+ vessels waiting.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Prices stabilized in the $75–$85 range despite supply risks.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. carrier groups deployed; $1.5T defense budget proposed.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Oman mediation active but stalled by hardline Iranian demands for reparations.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Pentagon Demands Industry Munitions Plan in 21 Days",
      description: "DoD seeks to replenish depleted stocks of interceptors and cruise missiles via DPA.",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran-Oman Shipping Lane Pact Nears Completion",
      description: "Managed corridor being defined, though full commercial reopening remains linked to US concessions.",
      verification: "confirmed",
      timestamp: "2026-08-09",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Brent Oil Futures Rebound Past $84",
      description: "Market reacts to Iran's conditions for Strait reopening; risk premium stays high.",
      verification: "confirmed",
      timestamp: "2026-08-10",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US shifts focus to industrial mobilization to address ammunition depletion.",
      "Iran uses Hormuz access as a lever to extract political concessions from Washington.",
      "Market remains in a 'wait-and-see' plateau with high background risk."
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
        "Continue: USS Abraham Lincoln (CVN-72) strike group maintains surveillance in regional waters.",
        "Change: Pentagon acknowledges inventory pressure on high-end interceptors and initiates industrial surge."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial traffic remains effectively frozen with extreme war risk premiums.",
        "Change: Negotiations for a 'safe transit corridor' mediated by Oman enter the final technical stage."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil prices fluctuate around $80 as supply fears balance demand headwinds.",
        "Change: Ras Markaz terminal in Oman gains strategic interest as an alternative crude storage hub."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: White House characterizes engagement with Iran as 'semi-negotiating' without formal deal.",
        "Change: Appointment of Mohsen Rezaei signals Iran's pivot toward a more 'calibrated escalation' strategy."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Sequencing conflict: Iran demands reparations before reopening; US demands de-escalation before relief."
    ],
    military: [
      "Resource gap between front-line operational tempo and domestic ammunition production capacity."
    ]
  },
  scoreTrend: [
    {
      date: "08-06",
      score: 72
    },
    {
      date: "08-07",
      score: 72
    },
    {
      date: "08-08",
      score: 70
    },
    {
      date: "08-09",
      score: 70
    },
    {
      date: "08-10",
      score: 70,
      active: true
    }
  ],
  keyChange: "US industrial mobilization indicates shift toward a long-term strategic standoff over ammunition replenishment.",
  investmentSignal: "→ Maintain energy and defensive asset positioning",
  change: "none",
  prevRiskScore: 70,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_gN8ZyB2zPx3KAsfsciomRNOXq2c9cV1eGG9HsSyvTDIq_roRLrQUxMGRwPHikojKxnWM9tHruC39UsR6zpR6ZW6ybR7jKgAGbyCJFUFEL4VAmfX3XW9jG0SVA3-lh_FxpSJ3uu_XeFafX9L7hI4HzqcV9g=="
    },
    {
      title: "timesofisrael.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPjDKhIpvsgb-h9gh4obDjXcRhwTedt3f3o7MQuQEWmgwJJe2kcO0-SSLlR0mhMXaeRCb6qQ5v45BW02BfCmlKBk-HvG4Dm6PQJ7mCCvBM2M46uEHe5bMdPd6C8COj68C3lnbsBTr1WCU6W-b0S60Ev-GWk9DAqyhaCKXtCLVqyPHO-ZkILxlYHDvkEkbd8IcslrpsUGxdE-sGH2pt__H6ERgyyOpZqak6VVudXpbdzQCXz_0="
    },
    {
      title: "latimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFsM6STAApBHBebSSp9eTF5zaHEPR4BhDOqC_jrczzgLQX5_MNHHK2gj7iTt-n1_UWXTHoPCwFLU14BkK0h41UXM2AEMag84F2ZzIj4l7ewnbO91EPWQ7FQDs89AxQSDtpwgNML3eIllWTkrs_qK9asBcrNIpmF6pODrjeMvKlEXjX9paQqlHmhwY9imFRB5-Z3sovqpYfnQ6Y-DhNosX8U4wvH9ZxmjUVzBQeP2P_vtroLaakhIM28N_IZMZFr-ZImstfZiBS0wcLTuw=="
    },
    {
      title: "middleeastmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5-j44LJsLHdptpTc1URlLperrzEOREOuEnrBJd8JhzHX5CvmNErP-NHN69QAt3AO7f57KC0GdS1eFrhKPJKj76T8p1qBjRKSwApNBM4wB0IfQweVQttVyW3cadSk-qSZiGBRH8wEUWXKL5pJv-674PSopKUxDRUUpirpWQrAji3aJm-qGqvA9d2jhSqmG-BbBpsp2HxO-7hSacKXvb350QbWuwkzf-Q=="
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0LuR8Sx5pvTTnLkCJJf31eTH_Kua8J_rUlwAyVpYOGg6YbLvpZ4zAi1TwBKionZoJ6ABK2_BYsGC3_FbOr2eWUJQKyon0dxlr6RpTOzLpKA=="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGT-MIc5gdm0URR4gkAvEsevA-COZjTg8mgnUyMcgBJXGENIgvK-H92mP0tzzCOcvKEB8dfp5WD5Gk4pPg_IYY_ATAk77rOptivEopW0k9r_RxSg4mGTpZ80-k4azTmxv5Uvmr3r6m0ocrrb1D9DR9YXvLMkNmvYWaNyo6W"
    },
    {
      title: "fxdailyreport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFUm_Pj912JHDoQagB06J981pLLBKS8aRksPQcCuxHV4Lyld6l5Q82Xnx2iARDeURCnmeUe9vs0yMu2zdjRD_Sv8IKLejVZUZwCX26QJjFFEucK0w5oVJqNJLnwFdritBlpGjZxYHH7kzanPMdpqYREzx1SL8zIVMCqnRCWgzYL"
    },
    {
      title: "bignewsnetwork.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGuOYKkP3GmM3koEBtBTEyKbevFPGasljkEDJQEMRqdKpUMNttDSEDu7cfoCJdDd3YWwqcKB2hlTWFFE14T9cwGlXp7IaaagQ690rdAL_3Gs_tjmfpfMtBLk6RsrgE1GjXUdm-lIcRjOECoY78dmZPvNlx8snIqdZpzrFw6QWluOug"
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1GDG3sWhrp9lj2JHFwpAZmoPhPxHeyd9HA9Uwo0ac7EMD33i5ySsnjTFFLaqyrKxD95a-6xdbt-a5sFEYGGqn8stFQqYeBUm8UAPPprI1I4sxlIOvFu691z_T9OwevFa7454SDWbyCNqx8DrPXPG-m3IO5HjxMxnYTQ4uM1Sc0-gSMvtO5Nfr51SN-LUy3X5p_v4hGvG7xpGABvXpfbVLH00ZrH8fnML4i9WcyTA6X-pK9DbvRTPhfwvuKrUWfIuF2g=="
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvi_aiFySoclIvc5uiMd_froU2qmNmP1R2QLrEzRj5yYED-6QjHmtqZpDJ9F3G8wqpIpcWwbeA4246CSe6AkOVWVOBZK9NbifekDZZWfxK9mEAvqkMOXaAyVCvlCU15CCstQdF5g=="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_sjXAOJdIQe2HkwnhhCPijXz4-TSD-pQ4yH1DZ58BLsJt_JBPdcTEr8vGAqS4EhFFdKeSSJvCxbvOZNbB8e6tasbvlNcWncTflcdPW5IJdlB2oGxvgWs="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range August 10 2024 2026 trend",
    "US Iran conflict news August 9 10 2024 Pentagon deployment",
    "Hormuz strait shipping status August 10 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.152 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美军启动工业动员以补足弹药缺口，冲突进入消耗战逻辑下的静态博弈。",
    bannerWarning: "→ 维持能源与避险资产防御性配置",
    deescalationIntent: "伊朗要求‘先赔偿再开海’与美国‘先撤防再谈判’的顺序矛盾。",
    structuralRisk: "虽然伊朗提及新航线协议，但实际商业流量依然中断。",
    contradictionNote: "伊朗要求‘先赔偿再开海’与美国‘先撤防再谈判’的顺序矛盾。；美军前方部署的战术主动权与国内后方弹药产能不足之间的资源缺口矛盾。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第163天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.152 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): US industrial mobilization indicates shift toward a long-term strategic standoff over ammunition replenishment.",
    bannerWarning: "→ Maintain energy and defensive asset positioning",
    deescalationIntent: "Sequencing conflict: Iran demands reparations before reopening; US demands de-e…",
    structuralRisk: "Hormuz traffic remains at ~15% of normal; 200+ vessels waiting.",
    contradictionNote: "Sequencing conflict: Iran demands reparations before reopening; US demands de-escalation before relief.; Resource gap between front-line operational tempo and …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 163",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
