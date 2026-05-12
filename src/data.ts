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
  date: "2026-05-12",
  version: "v2.61",
  riskScore: 84,
  keyStats: [
    {
      label: "冲突天数",
      value: "D73",
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
      value: "WTI $96.72–$100.36 · Brent $103.03–$106.83",
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
      description: "伊朗高级立法者 Rezaei 警告可能将铀浓缩提升至 90% 武器级。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗成立 PGSA 强制征收通行费，航道流量进一步萎缩至极低水平。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油价格因停火协议受阻而大幅跳涨，布伦特原油突破 $106 关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国政府维持海军封锁并准备重启打击，阿联酋秘密行动传闻增加地区复杂性。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美方驳回伊朗 14 点和平方案，中介渠道 पाकिस्तान 仍保持联系但无进展。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普驳回伊朗 counter-offer",
      description: "特朗普称伊朗提出的撤裁、赔偿及霍尔木兹接管要求“完全不可接受”，美伊对话陷入死胡同。",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗威胁 90% 丰度浓缩铀",
      description: "德黑兰警告若遭遇进一步军事打击，将启动武器级核材料提炼进程。",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡管理机构（PGSA）确立",
      description: "伊朗正式通过行政手段对过往船只实行“征税许可制”，航运成本飙升。",
      verification: "confirmed",
      timestamp: "2026-05-11",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议进入“临终关怀”阶段，美伊双方立场呈两极分化。",
      "霍尔木兹海峡由“航行自由”转变为“收费通行”与“行政控制”混合体。",
      "核选项重回桌面，作为伊朗应对美方重启战端的最后底牌。"
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
        "延续：美军维持对伊朗港口的导弹阵地监视，暂未发起新一轮饱和轰炸。",
        "变化：伊朗发出明确武器级浓缩铀信号，反介入/区域拒止力度向核层面延伸。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：商业航运避开海峡成为主流，保险溢价维持在极端高位。",
        "变化：伊朗 PGSA 机构开始运作，强制要求船员信息与保险单据预申报。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价因和平预期破裂大幅回升，投机资金重新涌入原油多头。",
        "延续：全球应急原油储备持续消耗，南半球能源进口国面临供应缺口。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普对“休战”失去耐心，其言论暗示白宫正考虑加大军事打击层级。",
        "延续：德黑兰保持“极限抗压”策略，拒绝在未撤销制裁的情况下做出实质让步。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方追求的“全面无核化+开放航道”与伊朗“有核国家地位+自主管辖权”之间的结构性对立。"
    ],
    military: [
      "美军区域封锁与伊朗非对称反介入（含核威慑）的长期对峙。"
    ]
  },
  scoreTrend: [
    {
      date: "05-08",
      score: 84
    },
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84,
      active: true
    }
  ],
  keyChange: "美方正式否认伊朗停火草案，核威胁与海上管辖权争端导致风险结构性固化。",
  investmentSignal: "→ 维持能源与大宗防御仓位，对冲能源供应链断裂风险，减持对利率敏感的风险资产。",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7pQO7t9MPhOCGhkDi2pmAyfUJQw7VMkRKJY-x0E0nHFmP0-yxomY791v7SWYgKfMXUGAv5rBY6yDg_9YudPVmTkEJAkmmvRY5igo4AEFeWfpP5xj9mdyRW4tj2Gno5eq3oIc3hTpDql5RVCN4vLHkWrH1hF6oPrqw77RXrXphBjZa5LfjzZiBuJZxf1tGlWGB5HBH08po2FtT6ptGHZqr1o_dAhghj_WFJgK6hA=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHF_pyCr7jtozPLQlIk2WkTwIF62TaNU0nXUr1JJnB8HAJjzJ2D3xG_aKsy0YonCgWpNST977nnetV5z0ELGB7_CtHKBuXe2A11RPIyPLu2Lxip20dSQkMmHX4KAnI3Wf4F2MKkhKvVC4jpQ-J_TBLU81SU046orMoU5tvFMlcND5tokFYa04k49V5lIZCYba8BAHPN73DFfE1CVB212P6bcDMb1P86SYbTqesahK7YuRrr3A=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6j9pLvYvzxa89QD4JhNETs4v986K7yGdwYrKbUTuDkhNShwYMTwowUpvnO-QYE5VPOb52F1CI7OgBqpObQwSGGopeYmTyyzfILFz7xtR41VRzf5pelydVAG8waClizokJHDzzOx88EZo0fg3rnx7qTnhR_gUAJRMmmdrNzOPWe_wjpkQ="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE-pS6XExkrvnaHLEPEV5-rv1_k-IhZhAHP1YzAlI0tSjNnjVO300yIg8strv8bynKzpvzNJ845R4ovAjFB47as-Q0JrRs88yNLX9jfiIH7_pyZWQR9JVGP6UcNytob-JKOmCtflUQ6cg3qr1CTQUgQIC--Cm3CSq65BI3T"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwBA2vk7UH2PN5LZm1ynIUiZsJYiO1Mlnje59acq2_VNN_J2aVrgV8V29D5_uNAAeyAi5OtThfo1mo9MvEKJkt5yTmT3rCeqBHY7RPRhVRtZsQ_wDGVGNGE9I85nh_MvNqfOCOC_NkIQc6hPgjw1EI2h1ayD8="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgh0l815IduPozbHzkQj7o0sFGbPIxQCswVqr2mY6vp2tKQOGL5TFaxrv-5ixM8dNI3GlzswFbozua2a_6SsMO0YfFWFI_ESuqOtMWpaN8Z0D646QnfFns9NOF00SquQHc0BErQWdPRw=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHyLK_R0Z1eni8Q4-2HMvEsCDjf4dET2dU5BWxN4UlAJtP4qaPFsnXWC2iNKfyGT6hVwmvDH8JJhczWIQrub9hl5DtHl-svge9ZvgGDYvYxlMPxFSQQBB17B7lvMk8yO7rTHW5wnf61x53ZWS3EqvKTJtL_GjHdJvJoDVCFLBNfoU7ioSn0z5u1SyTbHWyftj1MxWpXy0asnDnFyNX3-lE_m6wrKS_6UDX"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9nfWQJk9UtsgLHgzWFcM-1qpJ9lnPE0ShLsbkL8cPBaYqN4PSkNtkOGdYfXzxjM09ZUbLWV7kDYr3IKSoQcOss_Q0wmgBWXgC94mAOL888_cJPAib_E39ud1oQGuY3DVlr1017EpsJEwEOCWJChE39mygLqQZQslLTRQeVBNOOzxY9_PCBlYQPFEowi1auQ9Bec1maJigcQkFk7-q1B7sRwcBkhYcWIQ="
    },
    {
      title: "freightnews.co.za",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWoGayTT8i-WVk0TQG4Ip7S46z_Qt2YLtavTgUG5RysBTtsVd50naXySY85kKWItlqHLsvTGQvH-2Og8cuA94Tb_4Yu77whA6E8SyQv2E9rRujXc8YAhXhb9hOsTFdeEdXZ6BXx5LL0hJniSpAb0UTqeV_VifN-wKJtpFC-uXTI_tbAKvwbcApMzKiKb5H"
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkQxaOGPJ_iFLqxBmQbDKqqyIgWqU6gFAo-tZjC4UBFsZq7TxgK26f7JAe2iRvkD8pSSPmrwrIayRXWneQL4dkwDVobDszH71xZ4gNUf0jmDiVbI4NXbuy2C466_ZZS4EqcJtauK_5iiOOewSSkhXrKt_RiT_dzOz5qLuXlK_lvO7kMUqRRhlEGrJ2sDgKplFucc9MPkDFq2o4BzoHLGN4dbEG8lBfRh_RVjz05meqbLKXf8EZ6raO1CMEvRmF6jVOj1qD5Eo="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpiruynqhHNuD-p2rWrZD2LaemR2Nn3VCVnhBqHgUFqqGRP2rDxP1t4zSXNpnWHrwr3Xiixx3ji9ECxxO2TV4J9VXdWvDIJ-JcxPDdnwIteg2-d4WmeVD_YdOeS0YJZ1QYb4MRsjidehiGOEZLtKBtx3KVHJJ3TouMp2ajgeZgM2yOTmEDKnnMUHUU"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESzd3Y2y6rn3L8RpNIQzc1iIfvy-tOITmEJ3eUaxU8eQIiDxZ4E4oiJZhM3q3rbawPOY0roLI-pqKb14FdbYuEc5oNBuhGa44gY0-HIZi9i1NTRTLp6jmD5Sw3GxoyAKToySyHx-yS4CSX5p0WRgge8Q=="
    }
  ],
  webSearchQueries: [
    "Hormuz strait shipping traffic update May 12 2026 Lloyd's List",
    "US Iran military conflict news May 12 2026 AP Reuters Al Jazeera",
    "WTI Brent oil price range trend May 12 2026 Reuters Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-12",
  version: "v2.61",
  riskScore: 84,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D73",
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
      value: "WTI $96.72–$100.36 · Brent $103.03–$106.83",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran warns of upgrading enrichment to 90% weapons-grade purity if attacked.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Traffic dropped by 59% as Iran established the PGSA to collect transit tolls.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Brent crude breaks $106/bbl as ceasefire hopes fade.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Trump hints at higher-level military action; Fifth Fleet remains on high alert.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US rejects Iran's proposal; talks are at a deadlock despite mediation.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Rejects Iran Counter-Offer",
      description: "White House labels Tehran's demands as 'totally unacceptable', stalling diplomatic efforts.",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Issues 90% Enrichment Threat",
      description: "Tehran warns of rapid move to weapons-grade nuclear materials if US resumes war.",
      verification: "confirmed",
      timestamp: "2026-05-12",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "PGSA Formalizes Hormuz Control",
      description: "Iran creates the Persian Gulf Strait Authority to manage ship transits and tolls.",
      verification: "confirmed",
      timestamp: "2026-05-11",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire on 'massive life support' as both sides hold polar opposite positions.",
      "Hormuz has shifted from freedom of navigation to Iranian administrative control.",
      "Nuclear blackmail re-enters the tactical playbook of Tehran."
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
        "Continue: US maintain surveillance on Iranian ports; no massive new strikes recorded.",
        "Change: Iran introduces explicit weapons-grade nuclear deterrence signals."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial vessels continue to avoid the chokepoint due to extreme risk.",
        "Change: Iranian PGSA begins enforcing toll collection and vessel vetting."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices jump as ceasefire expectations collapse; bulls re-enter market.",
        "Continue: Global SPR depletion continues as supply gaps persist in the Global South."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump expresses losing patience with truce, hinting at escalated kinetic options.",
        "Continue: Tehran refuses to budge on core demands without significant sanction relief."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Irreconcilable demands between US 'full denuclearization' and Iran 'sovereign maritime control'."
    ],
    military: [
      "US blockade vs. Iranian asymmetrical anti-access (including nuclear deterrence)."
    ]
  },
  scoreTrend: [
    {
      date: "05-08",
      score: 84
    },
    {
      date: "05-09",
      score: 84
    },
    {
      date: "05-10",
      score: 84
    },
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84,
      active: true
    }
  ],
  keyChange: "US rejection of peace proposal and Iran's nuclear threat solidify the high-risk structural deadlock.",
  investmentSignal: "→ Maintain energy and commodity defense positions; hedge against supply chain disruptions; reduce exposure to risk assets.",
  change: "none",
  prevRiskScore: 84,
  webSources: [
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7pQO7t9MPhOCGhkDi2pmAyfUJQw7VMkRKJY-x0E0nHFmP0-yxomY791v7SWYgKfMXUGAv5rBY6yDg_9YudPVmTkEJAkmmvRY5igo4AEFeWfpP5xj9mdyRW4tj2Gno5eq3oIc3hTpDql5RVCN4vLHkWrH1hF6oPrqw77RXrXphBjZa5LfjzZiBuJZxf1tGlWGB5HBH08po2FtT6ptGHZqr1o_dAhghj_WFJgK6hA=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHF_pyCr7jtozPLQlIk2WkTwIF62TaNU0nXUr1JJnB8HAJjzJ2D3xG_aKsy0YonCgWpNST977nnetV5z0ELGB7_CtHKBuXe2A11RPIyPLu2Lxip20dSQkMmHX4KAnI3Wf4F2MKkhKvVC4jpQ-J_TBLU81SU046orMoU5tvFMlcND5tokFYa04k49V5lIZCYba8BAHPN73DFfE1CVB212P6bcDMb1P86SYbTqesahK7YuRrr3A=="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6j9pLvYvzxa89QD4JhNETs4v986K7yGdwYrKbUTuDkhNShwYMTwowUpvnO-QYE5VPOb52F1CI7OgBqpObQwSGGopeYmTyyzfILFz7xtR41VRzf5pelydVAG8waClizokJHDzzOx88EZo0fg3rnx7qTnhR_gUAJRMmmdrNzOPWe_wjpkQ="
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE-pS6XExkrvnaHLEPEV5-rv1_k-IhZhAHP1YzAlI0tSjNnjVO300yIg8strv8bynKzpvzNJ845R4ovAjFB47as-Q0JrRs88yNLX9jfiIH7_pyZWQR9JVGP6UcNytob-JKOmCtflUQ6cg3qr1CTQUgQIC--Cm3CSq65BI3T"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwBA2vk7UH2PN5LZm1ynIUiZsJYiO1Mlnje59acq2_VNN_J2aVrgV8V29D5_uNAAeyAi5OtThfo1mo9MvEKJkt5yTmT3rCeqBHY7RPRhVRtZsQ_wDGVGNGE9I85nh_MvNqfOCOC_NkIQc6hPgjw1EI2h1ayD8="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgh0l815IduPozbHzkQj7o0sFGbPIxQCswVqr2mY6vp2tKQOGL5TFaxrv-5ixM8dNI3GlzswFbozua2a_6SsMO0YfFWFI_ESuqOtMWpaN8Z0D646QnfFns9NOF00SquQHc0BErQWdPRw=="
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHyLK_R0Z1eni8Q4-2HMvEsCDjf4dET2dU5BWxN4UlAJtP4qaPFsnXWC2iNKfyGT6hVwmvDH8JJhczWIQrub9hl5DtHl-svge9ZvgGDYvYxlMPxFSQQBB17B7lvMk8yO7rTHW5wnf61x53ZWS3EqvKTJtL_GjHdJvJoDVCFLBNfoU7ioSn0z5u1SyTbHWyftj1MxWpXy0asnDnFyNX3-lE_m6wrKS_6UDX"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9nfWQJk9UtsgLHgzWFcM-1qpJ9lnPE0ShLsbkL8cPBaYqN4PSkNtkOGdYfXzxjM09ZUbLWV7kDYr3IKSoQcOss_Q0wmgBWXgC94mAOL888_cJPAib_E39ud1oQGuY3DVlr1017EpsJEwEOCWJChE39mygLqQZQslLTRQeVBNOOzxY9_PCBlYQPFEowi1auQ9Bec1maJigcQkFk7-q1B7sRwcBkhYcWIQ="
    },
    {
      title: "freightnews.co.za",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWoGayTT8i-WVk0TQG4Ip7S46z_Qt2YLtavTgUG5RysBTtsVd50naXySY85kKWItlqHLsvTGQvH-2Og8cuA94Tb_4Yu77whA6E8SyQv2E9rRujXc8YAhXhb9hOsTFdeEdXZ6BXx5LL0hJniSpAb0UTqeV_VifN-wKJtpFC-uXTI_tbAKvwbcApMzKiKb5H"
    },
    {
      title: "theguardian.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkQxaOGPJ_iFLqxBmQbDKqqyIgWqU6gFAo-tZjC4UBFsZq7TxgK26f7JAe2iRvkD8pSSPmrwrIayRXWneQL4dkwDVobDszH71xZ4gNUf0jmDiVbI4NXbuy2C466_ZZS4EqcJtauK_5iiOOewSSkhXrKt_RiT_dzOz5qLuXlK_lvO7kMUqRRhlEGrJ2sDgKplFucc9MPkDFq2o4BzoHLGN4dbEG8lBfRh_RVjz05meqbLKXf8EZ6raO1CMEvRmF6jVOj1qD5Eo="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpiruynqhHNuD-p2rWrZD2LaemR2Nn3VCVnhBqHgUFqqGRP2rDxP1t4zSXNpnWHrwr3Xiixx3ji9ECxxO2TV4J9VXdWvDIJ-JcxPDdnwIteg2-d4WmeVD_YdOeS0YJZ1QYb4MRsjidehiGOEZLtKBtx3KVHJJ3TouMp2ajgeZgM2yOTmEDKnnMUHUU"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESzd3Y2y6rn3L8RpNIQzc1iIfvy-tOITmEJ3eUaxU8eQIiDxZ4E4oiJZhM3q3rbawPOY0roLI-pqKb14FdbYuEc5oNBuhGa44gY0-HIZi9i1NTRTLp6jmD5Sw3GxoyAKToySyHx-yS4CSX5p0WRgge8Q=="
    }
  ],
  webSearchQueries: [
    "Hormuz strait shipping traffic update May 12 2026 Lloyd's List",
    "US Iran military conflict news May 12 2026 AP Reuters Al Jazeera",
    "WTI Brent oil price range trend May 12 2026 Reuters Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月12日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.61 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 84（持平）：美方正式否认伊朗停火草案，核威胁与海上管辖权争端导致风险结构性固化。",
    bannerWarning: "→ 维持能源与大宗防御仓位，对冲能源供应链断裂风险，减持对利率敏感的风险资产。",
    deescalationIntent: "美方追求的“全面无核化+开放航道”与伊朗“有核国家地位+自主管辖权”之间的结构性对立。",
    structuralRisk: "伊朗成立 PGSA 强制征收通行费，航道流量进一步萎缩至极低水平。",
    contradictionNote: "美方追求的“全面无核化+开放航道”与伊朗“有核国家地位+自主管辖权”之间的结构性对立。；美军区域封锁与伊朗非对称反介入（含核威慑）的长期对峙。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第73天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 12 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.61 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 84 (Flat): US rejection of peace proposal and Iran's nuclear threat solidify the high-risk structural deadlock.",
    bannerWarning: "→ Maintain energy and commodity defense positions; hedge against supply chain disruptions; reduce exposure to risk asse…",
    deescalationIntent: "Irreconcilable demands between US 'full denuclearization' and Iran 'sovereign m…",
    structuralRisk: "Traffic dropped by 59% as Iran established the PGSA to collect transit tolls.",
    contradictionNote: "Irreconcilable demands between US 'full denuclearization' and Iran 'sovereign maritime control'.; US blockade vs. Iranian asymmetrical anti-access (including n…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 73",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
