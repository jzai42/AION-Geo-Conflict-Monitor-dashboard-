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
  date: "2026-08-18",
  version: "v2.161",
  keyStats: [
    {
      label: "冲突天数",
      value: "D171",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $84.25–$85.37 · Brent $91.14–$91.70",
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
      description: "霍尔木兹海峡发生商船遇袭事件并造成伤亡，伊朗宣布转入全面进攻姿态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡流量维持极低水平，商业保险溢价极端化，美军封锁持续。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "随着60天谅解备忘录失效，地缘风险溢价重回市场，Brent油价突破91美元。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国维持海上封锁，特朗普政府通过外交与媒体渠道对中立斡旋方（阿曼）施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "60天停火备忘录正式到期且无续约，双方最高层均发表强硬主战声明。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  scoreTrend: [
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊停火谅解备忘录正式失效",
      description: "6月签署的60天框架协议到期，双方未能就永久协议达成一致，白宫拒绝延长窗口期（AP）。",
      verification: "confirmed",
      timestamp: "2026-08-17T23:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "霍尔木兹发生商船袭击并致伤亡",
      description: "UKMTO报告阿曼附近船舶被不明投射物击中机舱，造成人员伤亡，局势向直接武装对抗倾斜（UKMTO）。",
      verification: "confirmed",
      timestamp: "2026-08-18T04:40:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "伊朗军队转入全面进攻姿态",
      description: "伊朗高级官员透露，德黑兰已指示革命卫队（IRGC）准备应对美军封锁，不排除先发制人打击（Reuters）。",
      verification: "confirmed",
      timestamp: "2026-08-18T09:44:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-04",
      title: "特朗普威胁军事打击阿曼",
      description: "因不满阿曼在中立斡旋中倾向伊朗，特朗普在媒体采访中发表战争威胁，加剧区域盟友恐慌（Fox News）。",
      verification: "confirmed",
      timestamp: "2026-08-17T12:18:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "临时性停火安排彻底终结，双方进入实力对抗阶段。",
      "伊朗放弃防御姿态，霍尔木兹海峡攻击事件预示非对称战争重启。",
      "美国通过封锁极限施压，但由于外交路径断裂，军事手段成为唯一选项。"
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
        "变化：伊朗宣布转入进攻姿态，并发生疑似针对商船的投射物袭击（AP）。",
        "延续：美国CENTCOM继续拦截前往伊朗港口的违禁船只（CBS）。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：单日通行量维持在个位数（6艘），VLCC运输完全中断（Kpler）。",
        "变化：由于袭击事件，海峡周边战争险保费重回历史高位（UANI）。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent油价站上$91，反映外交红利耗尽后的供应中断风险（Univest）。",
        "延续：美方排除延长备忘录引发空头大规模回补，价格底部上移。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗外长阿格拉齐称伊朗已赢得战争与外交，拒绝向美方要求妥协（Anadolu）。",
        "变化：特朗普对阿曼发出「炸平」威胁，显示第二任期极不确定的外交风格（Quartz）。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求的伊朗全盘接受协议与伊方主权红线互斥。",
      "阿曼等中立调节方的空间因华盛顿的极端立场而极度萎缩。"
    ],
    military: [
      "伊朗的先发制人打击威胁与美军海上封锁禁令的直接冲突。"
    ]
  },
  keyChange: "美伊60天停火备忘录失效，霍尔木兹海峡自备忘录签署以来首次发生致死性袭击。",
  investmentSignal: "→ 增持能源与大宗商品，维持防御性资产对冲地缘风险。",
  change: "up",
  prevRiskScore: 80,
  webSources: [
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHWC9ZSCke5UYY_2LkXktb_5Uz5VLFpd1dNqq5FjUNZWy2kOedAzduT6eROKOmD6mRZRMMSNlsh9hR9SJy5bXxLV3bjb0H_xs3aS6nJxAaylNgWfxtzHKknIx7Og4oiUnmGjIKUWVrPQDyd78UwLVzlL-9dMSv8X9Kn6qJ421_KWOk9mO88VGg_c0abittkZUQLx3NTiEPBifXsoydjc5aLg2tAnVwj4pwMs7WomdARmz-pTSXtDcQUwRKC-m-86EiMDF78GkJdR7QUnYp0g=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHdBdF5MwaPMirVfL2JFHHlkUPubt4b1oHKziSaEWmh8JB9LQr8PyygbjPiYwYcI8fbSfTh9KxilAaiBdEjDY5aeKewIE6E51DD1ZqxhR6DsH-v8mVdYQCMVX0fJ-lSZCXtz8IpZznYfKhHto="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHQ-1jueG10be2PlRG6GMs4fYx4mNSk_zpgl79UQFbDIJwpe085QE8H3xIgTahcVf11OPot-5CIoBuj8QdfFMXTpPzGgP-KopuCQknn1gBPVgCnQ=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIN7VecyyJPv18EMArPV_2Hq1dg9dBaS9Z_UxXcONt9REUF-MuLC0Mrp8zjeCYvaOTFFxDY6BlfBqf3-PVEF_k4rccUnE5Z_hlFUUp4uIUFbrAvq3MmWA8QGxG7xPuSYfm-AJvMUp8UNyBFMPIJ7HkoaGDMPYQlj9yg1Pgt2s57rJDVIAenmHGUNUhyXwUEj2CzjMbrwxL"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdMnDRUt9TLh-CM0yh3NLtE9xisMHEhG9F4FJtGW88WFRnseux9fjpBBNon0r1_T6j9hP2rQnWCdKyHSqKk9z3KR1p0UlqNn0m3Oh2SVh5BhTm_33lyIWn5BIFskC2pMUXaRnNewOxB2F6Bjl6pyg5"
    },
    {
      title: "kathmandupost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2ROvggXU9G_kJDumvp2J_4TMDtbmQWPiyO1OHPB0_Xo6fUji65kWoYOkm_iUs0TmVoeOnXnYOFLeASMY254BQbR6CB22PeAt6P5Y7k25FriXm0amvlsadCxVQA4xg2xzLUz9RpPKM9pU3Fi2WiBQmEJuHKPfjODCg6ixcvzXNE-CAiW7e8zdiADLYoU8MRzTn34Vl2hbyosY2xm4WzHtCKZ_uclKbgKU2"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIEf6nY7RQA1NeM1mvmdAbj15kKrAD8ewzw0APM6nkXpqwj4lFFeZA5-4s1ar1yeHGIPAp99kRhNMpISIsnfIw8ZeTfpKK48OGmTyc4cFbcQn9XaQlKG2q9klJfGAIzP1mKJW9na397JAIu6W2T988VqAjGDrFhBI7ay9pcKeZ6_YwPjE1_NID0C1Ay2Y="
    },
    {
      title: "qz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESlB9HMrApFbYCnT1OQFvWuSluY2ozTkOw-i4MzyP2gFYaB1U467SYFFisoc9EVAPSqnImMxYkImFn4FSDvwbRyKZYKxSDgEVlRnntNqbenVZF85S3hkD6_kjWth6EnftDtBjILCUraf9PdOA5win5y9NwiubLV9M75A5_ugXzxFaIaHxM"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0EKXCfOVycq36BGtD15wsVis-CnPvCMtNrjHkI-mpSJsI8jhdXrUUjxh4WZJe3CbG4VcOFb9xgbtoovp1pzzP4viE-y8mnGGvnPiIhxFNT5zyzDdUa98_1BbxucVXkOvRe_Aqd1D4W8_dw_vQ3Vb2"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRmES1DeEhuu6u5QnCUJIZ4_6WJBKLzIpcjBMpStuSmIxcuK5lQK6c7DHjG1iLHfQd6iZmeK4fbbclVUl4HSTwu96Z0e-SM4A_sbEfIzM1tcVbs-74Cy0eSyVmj26902c7zVY6wTBbvlhobQyFpav9LVub6V7lycEEnQI4ANS4qA_mf4mZVPO2JJmbbilvT0iSb4JceqDI3KEfZpF59P2oqt1oV_Q5M7T3oVa3mH2McxHTXL5BgurFIM5FCI0rBw=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE-Ybd-LCvnl5LgLRJ3BESgCZYzx1DgoYG4o2IXIqsEMGpZVFGldrVPrDDq6qeQWyU12073kiEPDqLoO_YyTnSHdQxpPELCCJqA25F5Cm1LHJDiIo8Nfg=="
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKuMt3KWqj9Qi7IGE0DOokPDkBOLxA6YLJs69-LeqXK0HghB5Bfw3ziA48i1P1OuzhoxH1sj8CSl9os_bd3K7Lp7Sq2GvtCeK_6kjUNzTKNDEpArJ6KpRc89lKHZqyoA_90R7eXdDcinTmMCkBkc6TaTZxHmWqcuIA0HlAPxnadyoFAwrfYGzqeeb6tV3HE-T1uROgl01b43d71C5Hml-NSqgBtP9szsi3SG0919HQPtFDKMTOiowAWdFjwIAdk1Oo"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLzMqGqyeAFocmWhNUaXJAxnUOflrWXAXEg5ZIRA2dbyVLyU0nwyoujFAV87kR5zZdMaGN7FhxHdFG6RNvW-sEyYvbIIVatbBpbI65u1gGSD299E51n6Nu40BIrRccBL_jwGwpVFqAzipcLwgb0t49PB4MCvGH2ATCVCtTJzXLHckTNFCfutPCc2DX"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend August 18 2026",
    "US Iran conflict military updates August 18 2026 Centcom IRGC",
    "Hormuz Strait shipping status August 18 2026",
    "US Iran diplomatic negotiation status August 18 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-08-18",
  version: "v2.161",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D171",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $84.25–$85.37 · Brent $91.14–$91.70",
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
      description: "Merchant vessel struck in Hormuz with casualties; Iran shifts to offensive posture.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transits remain at minimal levels; war risk premiums surge; blockade active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "Risk premium returns as 60-day MoU expires; Brent surges above $91.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains blockade; Trump issues military threats against Oman.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "MoU officially expired; both sides reject extensions; dialogue channels frozen.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  scoreTrend: [
    {
      date: "08-14",
      score: 74
    },
    {
      date: "08-15",
      score: 76
    },
    {
      date: "08-16",
      score: 76
    },
    {
      date: "08-17",
      score: 80
    },
    {
      date: "08-18",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran 60-Day Ceasefire MoU Expires",
      description: "The landmark framework signed in June expires without a successor deal; White House rules out extension (AP).",
      verification: "confirmed",
      timestamp: "2026-08-17T23:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Vessel Struck in Hormuz with Crew Casualty",
      description: "UKMTO reports ship hit by unidentified projectile; first kinetic incident since MoU lapse (UKMTO).",
      verification: "confirmed",
      timestamp: "2026-08-18T04:40:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-03",
      title: "Iran Shifts to 'Fully Offensive' Posture",
      description: "Tehran instructs military units to prepare for escalation to break the US naval blockade (Reuters).",
      verification: "confirmed",
      timestamp: "2026-08-18T09:44:00Z",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Diplomatic window closed; return to kinetic posturing.",
      "Hormuz control moves from negotiated management back to armed contest.",
      "US blockade enforcement vs Iran offensive posture creates immediate clash risk."
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
        "Change: Iran shifts to offensive military posture; ship struck in Hormuz (AP/Reuters).",
        "Continue: US CENTCOM continues blockade enforcement on Iranian ports (CBS)."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Transits down to 6 ships/day; VLCC traffic effectively halted (Kpler).",
        "Change: War risk premiums return to peak levels following new strike (UANI)."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent breaks $91 as diplomatic risk premium is re-injected (Univest).",
        "Continue: Strategic inventory builds accelerating on supply outage fears."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran FM Araghchi claims 'Victory in War and Diplomacy'; rejects surrender (Anadolu).",
        "Change: Trump threatens Oman with military action over Hormuz management (Fox News)."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Absolute divergence between US demand for surrender and Iran's sovereign survival.",
      "Erosion of neutral ground (Oman) due to superpower pressure."
    ],
    military: [
      "Escalation of kinetic attacks to break blockade vs blockade enforcement via air/sea dominance."
    ]
  },
  keyChange: "Lapse of the 60-day US-Iran MoU and resumption of kinetic strikes in the Strait of Hormuz.",
  investmentSignal: "→ Increase exposure to Energy and Commodities; maintain defensive hedges.",
  change: "up",
  prevRiskScore: 80,
  webSources: [
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHWC9ZSCke5UYY_2LkXktb_5Uz5VLFpd1dNqq5FjUNZWy2kOedAzduT6eROKOmD6mRZRMMSNlsh9hR9SJy5bXxLV3bjb0H_xs3aS6nJxAaylNgWfxtzHKknIx7Og4oiUnmGjIKUWVrPQDyd78UwLVzlL-9dMSv8X9Kn6qJ421_KWOk9mO88VGg_c0abittkZUQLx3NTiEPBifXsoydjc5aLg2tAnVwj4pwMs7WomdARmz-pTSXtDcQUwRKC-m-86EiMDF78GkJdR7QUnYp0g=="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHdBdF5MwaPMirVfL2JFHHlkUPubt4b1oHKziSaEWmh8JB9LQr8PyygbjPiYwYcI8fbSfTh9KxilAaiBdEjDY5aeKewIE6E51DD1ZqxhR6DsH-v8mVdYQCMVX0fJ-lSZCXtz8IpZznYfKhHto="
    },
    {
      title: "windward.ai",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHQ-1jueG10be2PlRG6GMs4fYx4mNSk_zpgl79UQFbDIJwpe085QE8H3xIgTahcVf11OPot-5CIoBuj8QdfFMXTpPzGgP-KopuCQknn1gBPVgCnQ=="
    },
    {
      title: "cfr.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIN7VecyyJPv18EMArPV_2Hq1dg9dBaS9Z_UxXcONt9REUF-MuLC0Mrp8zjeCYvaOTFFxDY6BlfBqf3-PVEF_k4rccUnE5Z_hlFUUp4uIUFbrAvq3MmWA8QGxG7xPuSYfm-AJvMUp8UNyBFMPIJ7HkoaGDMPYQlj9yg1Pgt2s57rJDVIAenmHGUNUhyXwUEj2CzjMbrwxL"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdMnDRUt9TLh-CM0yh3NLtE9xisMHEhG9F4FJtGW88WFRnseux9fjpBBNon0r1_T6j9hP2rQnWCdKyHSqKk9z3KR1p0UlqNn0m3Oh2SVh5BhTm_33lyIWn5BIFskC2pMUXaRnNewOxB2F6Bjl6pyg5"
    },
    {
      title: "kathmandupost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2ROvggXU9G_kJDumvp2J_4TMDtbmQWPiyO1OHPB0_Xo6fUji65kWoYOkm_iUs0TmVoeOnXnYOFLeASMY254BQbR6CB22PeAt6P5Y7k25FriXm0amvlsadCxVQA4xg2xzLUz9RpPKM9pU3Fi2WiBQmEJuHKPfjODCg6ixcvzXNE-CAiW7e8zdiADLYoU8MRzTn34Vl2hbyosY2xm4WzHtCKZ_uclKbgKU2"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIEf6nY7RQA1NeM1mvmdAbj15kKrAD8ewzw0APM6nkXpqwj4lFFeZA5-4s1ar1yeHGIPAp99kRhNMpISIsnfIw8ZeTfpKK48OGmTyc4cFbcQn9XaQlKG2q9klJfGAIzP1mKJW9na397JAIu6W2T988VqAjGDrFhBI7ay9pcKeZ6_YwPjE1_NID0C1Ay2Y="
    },
    {
      title: "qz.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESlB9HMrApFbYCnT1OQFvWuSluY2ozTkOw-i4MzyP2gFYaB1U467SYFFisoc9EVAPSqnImMxYkImFn4FSDvwbRyKZYKxSDgEVlRnntNqbenVZF85S3hkD6_kjWth6EnftDtBjILCUraf9PdOA5win5y9NwiubLV9M75A5_ugXzxFaIaHxM"
    },
    {
      title: "jpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE0EKXCfOVycq36BGtD15wsVis-CnPvCMtNrjHkI-mpSJsI8jhdXrUUjxh4WZJe3CbG4VcOFb9xgbtoovp1pzzP4viE-y8mnGGvnPiIhxFNT5zyzDdUa98_1BbxucVXkOvRe_Aqd1D4W8_dw_vQ3Vb2"
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRmES1DeEhuu6u5QnCUJIZ4_6WJBKLzIpcjBMpStuSmIxcuK5lQK6c7DHjG1iLHfQd6iZmeK4fbbclVUl4HSTwu96Z0e-SM4A_sbEfIzM1tcVbs-74Cy0eSyVmj26902c7zVY6wTBbvlhobQyFpav9LVub6V7lycEEnQI4ANS4qA_mf4mZVPO2JJmbbilvT0iSb4JceqDI3KEfZpF59P2oqt1oV_Q5M7T3oVa3mH2McxHTXL5BgurFIM5FCI0rBw=="
    },
    {
      title: "hormuzstraitmonitor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE-Ybd-LCvnl5LgLRJ3BESgCZYzx1DgoYG4o2IXIqsEMGpZVFGldrVPrDDq6qeQWyU12073kiEPDqLoO_YyTnSHdQxpPELCCJqA25F5Cm1LHJDiIo8Nfg=="
    },
    {
      title: "facebook.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKuMt3KWqj9Qi7IGE0DOokPDkBOLxA6YLJs69-LeqXK0HghB5Bfw3ziA48i1P1OuzhoxH1sj8CSl9os_bd3K7Lp7Sq2GvtCeK_6kjUNzTKNDEpArJ6KpRc89lKHZqyoA_90R7eXdDcinTmMCkBkc6TaTZxHmWqcuIA0HlAPxnadyoFAwrfYGzqeeb6tV3HE-T1uROgl01b43d71C5Hml-NSqgBtP9szsi3SG0919HQPtFDKMTOiowAWdFjwIAdk1Oo"
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLzMqGqyeAFocmWhNUaXJAxnUOflrWXAXEg5ZIRA2dbyVLyU0nwyoujFAV87kR5zZdMaGN7FhxHdFG6RNvW-sEyYvbIIVatbBpbI65u1gGSD299E51n6Nu40BIrRccBL_jwGwpVFqAzipcLwgb0t49PB4MCvGH2ATCVCtTJzXLHckTNFCfutPCc2DX"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend August 18 2026",
    "US Iran conflict military updates August 18 2026 Centcom IRGC",
    "Hormuz Strait shipping status August 18 2026",
    "US Iran diplomatic negotiation status August 18 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "8月18日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.161 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（↑2）：美伊60天停火备忘录失效，霍尔木兹海峡自备忘录签署以来首次发生致死性袭击。",
    bannerWarning: "→ 增持能源与大宗商品，维持防御性资产对冲地缘风险。",
    deescalationIntent: "美方要求的伊朗全盘接受协议与伊方主权红线互斥。",
    structuralRisk: "海峡流量维持极低水平，商业保险溢价极端化，美军封锁持续。",
    contradictionNote: "美方要求的伊朗全盘接受协议与伊方主权红线互斥。；伊朗的先发制人打击威胁与美军海上封锁禁令的直接冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第171天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Aug 18 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.161 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (↑2): Lapse of the 60-day US-Iran MoU and resumption of kinetic strikes in the Strait of Hormuz.",
    bannerWarning: "→ Increase exposure to Energy and Commodities; maintain defensive hedges.",
    deescalationIntent: "Absolute divergence between US demand for surrender and Iran's sovereign surviv…",
    structuralRisk: "Transits remain at minimal levels; war risk premiums surge; blockade active.",
    contradictionNote: "Absolute divergence between US demand for surrender and Iran's sovereign survival.; Escalation of kinetic attacks to break blockade vs blockade enforcement via…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 171",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
