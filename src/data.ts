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
  version: "v2.129",
  date: "2026-07-18",
  riskScore: 96,
  keyStats: [
    {
      label: "冲突天数",
      value: "D140",
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
      value: "WTI $80.30–$82.47 · Brent $84.23–$88.38",
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
      description: "美伊爆发连续七日的直接军事对抗，战火蔓延至第三国基地。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军重启海上封锁，霍尔木兹海峡商业通行完全中断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油价格因供应路径阻断及基建受损而剧烈波动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "美国直接参战规模扩大，区域盟友被迫卷入防御行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "外交渠道完全关闭，双方均寻求军事手段解决争端。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军第七轮空袭",
      description: "打击范围涵盖伊朗南部物流枢纽及地下工事，旨在削弱其封锁能力。",
      verification: "confirmed",
      timestamp: "2026-07-18 03:32",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗报复性袭击多国美军基地",
      description: "无人机袭击科威特、约旦及叙利亚境内美军资产，科威特民生基建受损。",
      verification: "confirmed",
      timestamp: "2026-07-18 09:36",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "美军正式执行海军封锁",
      description: "拦截所有试图进入伊朗港口的非人道主义船只。",
      verification: "confirmed",
      timestamp: "2026-07-18 05:32",
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
      "美伊直接军事对抗已常态化",
      "区域重要产油国基建受损",
      "外交调解空间完全归零"
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
        "延续：美军每日例行空袭伊朗南部战术目标。",
        "变化：伊朗开始打击科威特、约旦等提供基建支持的盟友。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：海峡商业航行完全停滞。",
        "变化：美军封锁线由监视转为物理拦截。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：油价维持高位宽幅震荡。",
        "变化：科威特基建受损导致市场对“安全溢价”重新估值。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：双方领导人互发战争威胁。",
        "变化：美方公开表示将针对伊朗民用工业设施实施制裁外打击。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压政策与伊朗生存安全观的硬碰撞",
      "区域盟友被动卷入战争与自身安全的矛盾"
    ],
    military: [
      "美军海空优势封锁与伊朗非对称反击（无人机/水雷）的对抗",
      "攻击性封锁与航行自由权力的法理冲突"
    ]
  },
  scoreTrend: [
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96,
      active: true
    }
  ],
  keyChange: "美伊正式进入直接战争状态，霍尔木兹海峡进入军事禁航期。",
  investmentSignal: "→ 减持风险资产，增持能源对冲与黄金防御。",
  change: "up",
  prevRiskScore: 92,
  webSources: [
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHX-FNzzzD1ckqlMJuMtCTeX-AKNXo29Hgi1VVOD8ghCizk2PiQGoNitK5E8gdqDH9k-oWcpbFHaBatnY2ZPMmyDKZ-8n46559YaViH0d9voCN3kqZG3dlIuuOlKx9YI8MyQyNE6-AtSUh5ov2fd5lb"
    },
    {
      title: "cgtn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlTErkrD59OH_xpu-4tup_5_PbTh5F1T3AOG7J2AB8Qewk3CqSNLKF_zL_HyX3a8vzuimkMaq1NCshCjjEJ374N1e_T5LdsQw3enLaIiS1BmVqF8b7vI89FaHBGFcH7_4Y6E8-mlZcKrCa3YzV55PSLOVI"
    },
    {
      title: "middleeasteye.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG2U0OmQWrXUs39eKUkG_VpO14VKBn3ihAKlXTXlg9mG_npWeFBIgdoYK1gtCfG96lFSp0ET-f9t8WyMyATIoTVXvZGadaCkC275xXsFF-xdoOAvpu3uyxJTdLY_FRyj_SLvXPy0_39u5sKlPbi1BL7Ng4osSJluqU1ydouSN4Mun1sPqQnTeTYF0mGFEAui4NMf1_71bRN42dT1qDpw5l9V_ZYEI_vzQ_7WUjFblvWwyXfNv7ULlXh"
    },
    {
      title: "qna.org.qa",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkHIbNpnzShnzahng7dUSwXTrJUOfcSaawKteqee-avrdGsSUAQHOHoGAj-WwHhFr60Lqpi1HroO9_FapJAVD7SqV7FgXuWGN9EOYhl5ESx_vV0-F0HN9YWttYmKboqv2ZNeJWTmRFWS7VvcU6zV2-WnUcJYLidUp9bYcRxSIYjZCrHO_7z_3_ZWQHjGfu5B6OdFEqw4lWRjFMywx_AYDfd9euOTLvJDczLt3jCag_nimV"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESjJjXuwtXXXBZ3J1-8C_Ly1yJwufzjLItdJ9zvlXh5ftWClETd5ilj299yK7L71EVQvKGFcCk1TsHLy53PGRJUEGTRiI4Qpv3s3VIuTs-LZGzeyDpdXGEf0vi-m86JIe-1TXJfBxbVPXdHro9l0s67SEID0U="
    },
    {
      title: "wsls.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFnp9jiIJlRSR_PkubD3dcqHTQKCZRkBNyD2mE5aPj1CghlB58q1mP5bedAazMSbOuwTwsdzRWsqW_JNUpzkF6s1P8I9sr-4gVuZ0t7tTS6unpRwAc01H80lgV_nPQVbVjHBTPUucEeMATndbEOW4Ppv-5rnWWMFtadrP8X2eFeYIUfh9qUhfF-E_SY3kJziHB4lM8Pe40glTjifIAgWFTJ8JFBvWrrJLFYdSnHRaLj-oY="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFU-7MnTMr-cMIzqXHCrfjQ3d7ms2J2VMY-WJxR3qThCUfC242hdwwUum6tlJCitE0AEpmOhoqfC53Uo0U9kM-bmUumhCS5QdzqfLt7sBxz8iVMvdxTDO6uaXK-3rWZHn7yorxJdrs="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5A6SNn9b7UH0l3n1UauO-9fhHWjQJE0MLwwA4wwE4MDSKTpYOWTUjDMw_iRN7mjXdv_MvEUk2XOpX7eWOaxRpvSzIigSwelCVbOSGjFUVMzFva5la-3DOh0U7cQ4zqq-jmkiPfo53XDvAbGrbdO7zraNiABWI1007bQtQ3MKLOE_0YGx1pg7g8BmEjsdaJlY="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_bAUuyJ039kHVICa6yF8AW5gQG1QHGVUss9ce3PKuHE9r6J_rjGoea5qI2ivFoKP8q3th4Ib7rk8MQngFSZXYsPzeMP6xnF8RCYll7qTiLd95ECX_01fm7nADqccpuVoF4Qc="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgA5MRvDZxt94vxs04ynmAjB1Oqfwt1-jgGjX1PZ0ix_Hv96rd9ZxC8zbbtQPge_HknF21iIzRbtsNrAdPh9_w9Dvo6YP_RqUFcGxZSdPPeg23yXS24rt1OCPExHtu5DyV2R1JxuYKTZucX2k="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLcLjvpf6LiDG32QkSTg40ZKVKAEk4d31_4pbyDchJjZEaVOIRi7xrMzE0Zhq9xlEVtVK8kDPFHWbNiS--SStXRSV_KlCrEwBTMArgzk4MeLe7VQHlh42UlWikih_GXDyp5XVs0xgIsUNfjrvrWoPKNTmkf8tG7swH_djysAbGlwofH-db"
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUplCQ4SyLpEeFWYFwtGj6MBO9x0oozDNz-y6Hnh6pRsW0Jhoxpai_Ng8UXL6xKlB0G-ibGfgugHazqUQgmXgp_fiGFaPf7ypnTe-KoYcyd-h39JnSZygvflr-PkVw2TT5yXrkc8P_3CMq056XxLDSSxAAWJ-2Ti0cvQvAAH9wwFELttmm4hldFCfDh9gW2PRR_mXkLlqhsykd33fr1DsYm0MxkHX7178Y03g8LmtkDIS2ddRpo1rnmTJKI8Y="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 18 2026 range trend",
    "US Iran conflict news July 18 2026 Hormuz Strait blockade",
    "DoD CENTCOM statement Iran July 18 2026"
  ]
};

export const DATA_EN: DashboardData = {
  version: "v2.129",
  date: "2026-07-18",
  riskScore: 96,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D140",
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
      value: "WTI $80.30–$82.47 · Brent $84.23–$88.38",
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
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Continuous direct military confrontation between US and Iran, spilling into neighboring states.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Full physical naval blockade reinstated by US; commercial traffic halted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Crude prices volatile due to route disruption and infrastructure damage.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "US direct combat involvement expanded; regional allies forced into defensive roles.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Diplomatic channels fully closed; both sides pursuing military solutions.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "7th Wave of US Strikes",
      description: "Targeting logistics hubs and underground facilities in southern Iran.",
      verification: "confirmed",
      timestamp: "2026-07-18 03:32",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iranian Retaliation on Allied Bases",
      description: "Drones and missiles hit sites in Kuwait and Jordan; utility infrastructure damaged.",
      verification: "confirmed",
      timestamp: "2026-07-18 09:36",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Formal Naval Blockade",
      description: "US Navy intercepting all non-humanitarian vessels bound for Iran.",
      verification: "confirmed",
      timestamp: "2026-07-18 05:32",
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
      "Direct combat normalized between US and Iran",
      "Damage to critical regional oil ally infrastructure",
      "Zero space for diplomatic maneuver"
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
        "Continue: Daily US airstrikes on tactical targets in Southern Iran.",
        "Change: Iran targeting US-hosting allies like Kuwait and Jordan."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial navigation at a standstill.",
        "Change: US blockade moving from surveillance to physical interception."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Oil prices oscillating at high levels.",
        "Change: Market re-evaluating 'Security Premium' after infrastructure hits."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Belligerent rhetoric from both leaderships.",
        "Change: US threatening strikes on non-military industrial infrastructure."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Collision of US Maximum Pressure and Iranian Survivalist doctrine",
      "Conflict between regional allies' security and forced war participation"
    ],
    military: [
      "US air/naval superiority vs Iranian asymmetric retaliation (drones/mines)",
      "Legal clash between offensive blockade and freedom of navigation"
    ]
  },
  scoreTrend: [
    {
      date: "07-14",
      score: 88
    },
    {
      date: "07-15",
      score: 88
    },
    {
      date: "07-16",
      score: 90
    },
    {
      date: "07-17",
      score: 92
    },
    {
      date: "07-18",
      score: 96,
      active: true
    }
  ],
  keyChange: "US and Iran enter state of direct war; Hormuz closed to commercial traffic.",
  investmentSignal: "→ Maintain underweight on risk assets; increase energy hedges and defensive gold.",
  change: "up",
  prevRiskScore: 92,
  webSources: [
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHX-FNzzzD1ckqlMJuMtCTeX-AKNXo29Hgi1VVOD8ghCizk2PiQGoNitK5E8gdqDH9k-oWcpbFHaBatnY2ZPMmyDKZ-8n46559YaViH0d9voCN3kqZG3dlIuuOlKx9YI8MyQyNE6-AtSUh5ov2fd5lb"
    },
    {
      title: "cgtn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlTErkrD59OH_xpu-4tup_5_PbTh5F1T3AOG7J2AB8Qewk3CqSNLKF_zL_HyX3a8vzuimkMaq1NCshCjjEJ374N1e_T5LdsQw3enLaIiS1BmVqF8b7vI89FaHBGFcH7_4Y6E8-mlZcKrCa3YzV55PSLOVI"
    },
    {
      title: "middleeasteye.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG2U0OmQWrXUs39eKUkG_VpO14VKBn3ihAKlXTXlg9mG_npWeFBIgdoYK1gtCfG96lFSp0ET-f9t8WyMyATIoTVXvZGadaCkC275xXsFF-xdoOAvpu3uyxJTdLY_FRyj_SLvXPy0_39u5sKlPbi1BL7Ng4osSJluqU1ydouSN4Mun1sPqQnTeTYF0mGFEAui4NMf1_71bRN42dT1qDpw5l9V_ZYEI_vzQ_7WUjFblvWwyXfNv7ULlXh"
    },
    {
      title: "qna.org.qa",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkHIbNpnzShnzahng7dUSwXTrJUOfcSaawKteqee-avrdGsSUAQHOHoGAj-WwHhFr60Lqpi1HroO9_FapJAVD7SqV7FgXuWGN9EOYhl5ESx_vV0-F0HN9YWttYmKboqv2ZNeJWTmRFWS7VvcU6zV2-WnUcJYLidUp9bYcRxSIYjZCrHO_7z_3_ZWQHjGfu5B6OdFEqw4lWRjFMywx_AYDfd9euOTLvJDczLt3jCag_nimV"
    },
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESjJjXuwtXXXBZ3J1-8C_Ly1yJwufzjLItdJ9zvlXh5ftWClETd5ilj299yK7L71EVQvKGFcCk1TsHLy53PGRJUEGTRiI4Qpv3s3VIuTs-LZGzeyDpdXGEf0vi-m86JIe-1TXJfBxbVPXdHro9l0s67SEID0U="
    },
    {
      title: "wsls.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFnp9jiIJlRSR_PkubD3dcqHTQKCZRkBNyD2mE5aPj1CghlB58q1mP5bedAazMSbOuwTwsdzRWsqW_JNUpzkF6s1P8I9sr-4gVuZ0t7tTS6unpRwAc01H80lgV_nPQVbVjHBTPUucEeMATndbEOW4Ppv-5rnWWMFtadrP8X2eFeYIUfh9qUhfF-E_SY3kJziHB4lM8Pe40glTjifIAgWFTJ8JFBvWrrJLFYdSnHRaLj-oY="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFU-7MnTMr-cMIzqXHCrfjQ3d7ms2J2VMY-WJxR3qThCUfC242hdwwUum6tlJCitE0AEpmOhoqfC53Uo0U9kM-bmUumhCS5QdzqfLt7sBxz8iVMvdxTDO6uaXK-3rWZHn7yorxJdrs="
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5A6SNn9b7UH0l3n1UauO-9fhHWjQJE0MLwwA4wwE4MDSKTpYOWTUjDMw_iRN7mjXdv_MvEUk2XOpX7eWOaxRpvSzIigSwelCVbOSGjFUVMzFva5la-3DOh0U7cQ4zqq-jmkiPfo53XDvAbGrbdO7zraNiABWI1007bQtQ3MKLOE_0YGx1pg7g8BmEjsdaJlY="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_bAUuyJ039kHVICa6yF8AW5gQG1QHGVUss9ce3PKuHE9r6J_rjGoea5qI2ivFoKP8q3th4Ib7rk8MQngFSZXYsPzeMP6xnF8RCYll7qTiLd95ECX_01fm7nADqccpuVoF4Qc="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgA5MRvDZxt94vxs04ynmAjB1Oqfwt1-jgGjX1PZ0ix_Hv96rd9ZxC8zbbtQPge_HknF21iIzRbtsNrAdPh9_w9Dvo6YP_RqUFcGxZSdPPeg23yXS24rt1OCPExHtu5DyV2R1JxuYKTZucX2k="
    },
    {
      title: "foxnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLcLjvpf6LiDG32QkSTg40ZKVKAEk4d31_4pbyDchJjZEaVOIRi7xrMzE0Zhq9xlEVtVK8kDPFHWbNiS--SStXRSV_KlCrEwBTMArgzk4MeLe7VQHlh42UlWikih_GXDyp5XVs0xgIsUNfjrvrWoPKNTmkf8tG7swH_djysAbGlwofH-db"
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUplCQ4SyLpEeFWYFwtGj6MBO9x0oozDNz-y6Hnh6pRsW0Jhoxpai_Ng8UXL6xKlB0G-ibGfgugHazqUQgmXgp_fiGFaPf7ypnTe-KoYcyd-h39JnSZygvflr-PkVw2TT5yXrkc8P_3CMq056XxLDSSxAAWJ-2Ti0cvQvAAH9wwFELttmm4hldFCfDh9gW2PRR_mXkLlqhsykd33fr1DsYm0MxkHX7178Y03g8LmtkDIS2ddRpo1rnmTJKI8Y="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 18 2026 range trend",
    "US Iran conflict news July 18 2026 Hormuz Strait blockade",
    "DoD CENTCOM statement Iran July 18 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.129 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 96（↑4）：美伊正式进入直接战争状态，霍尔木兹海峡进入军事禁航期。",
    bannerWarning: "→ 减持风险资产，增持能源对冲与黄金防御。",
    deescalationIntent: "美国极限施压政策与伊朗生存安全观的硬碰撞",
    structuralRisk: "美军重启海上封锁，霍尔木兹海峡商业通行完全中断。",
    contradictionNote: "美国极限施压政策与伊朗生存安全观的硬碰撞；美军海空优势封锁与伊朗非对称反击（无人机/水雷）的对抗",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第140天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.129 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 96 (↑4): US and Iran enter state of direct war; Hormuz closed to commercial traffic.",
    bannerWarning: "→ Maintain underweight on risk assets; increase energy hedges and defensive gold.",
    deescalationIntent: "Collision of US Maximum Pressure and Iranian Survivalist doctrine",
    structuralRisk: "Full physical naval blockade reinstated by US; commercial traffic halted.",
    contradictionNote: "Collision of US Maximum Pressure and Iranian Survivalist doctrine; US air/naval superiority vs Iranian asymmetric retaliation (drones/mines)",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 140",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
