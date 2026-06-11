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
  date: "2026-06-11",
  version: "v2.92",
  keyStats: [
    {
      label: "冲突天数",
      value: "D103",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $91.5–$94.8 · Brent $92.2–$95.7",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "完全封锁",
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
      description: "美伊爆发多轮直接导弹与空袭互射，冲突地域覆盖伊朗境内、巴林及约旦美军基地。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗革命卫队宣布完全关闭海峡，美军实施海上封锁导致民用船只毁损与人员伤亡。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "油价在高位震荡，海峡关闭的预期已计入价格，但利润锁定盘压制了进一步飙升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国全线介入作战；印度因平民伤亡表达严重抗议，俄罗斯通过外交口径施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "停火协议被视为失效，伊朗拒绝在遭受打击期间谈判，双方处于“打到底”的立场。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  change: "up",
  scoreTrend: [
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊连续二日直接交换打击",
      description: "美国针对伊朗南部的防空及通讯设施实施了更为猛烈的空袭；伊朗则针对巴林和科威特的美军基地进行回击。",
      verification: "confirmed",
      timestamp: "2026-06-11T05:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗宣布霍尔木兹海峡完全关闭",
      description: "伊朗革命卫队宣布该航道对所有商业活动关闭，并警告任何通航船只都将成为军事目标。",
      verification: "confirmed",
      timestamp: "2026-06-11T12:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "印度确认三名海员在美军封锁行动中遇难",
      description: "美方在阻止一艘伊朗关联油轮时开火，导致印度籍海员身亡，引发两国严重外交风波。",
      verification: "confirmed",
      timestamp: "2026-06-11T09:00:00Z",
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
      "美伊直接攻击对方主权资产及军事基地，停火协议名存实亡。",
      "霍尔木兹海峡进入“封锁vs突破”的军事对抗阶段。",
      "第三方大国（如印度）卷入非战斗性对抗，全球外交压力剧增。"
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
        "延续：美国对伊朗南部军事设施的饱和式导弹打击。",
        "变化：伊朗对约旦及巴林美军基地发起远程打击，冲突向波斯湾西岸外溢。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡由“许可通航”变为“全面封锁”，IRGC宣布将其变为“地狱”。",
        "变化：美军已拦截并使9艘违反封锁令的商船瘫痪，出现平民伤亡。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：布油回落至$92区间，但高盛及多方预测若封锁持续将迅速破百。",
        "延续：主要航商（如马士基）绕道好望角的成本已飙升至历史高位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：特朗普坚持“以武促谈”，要求伊朗无条件接受和平协议。",
        "变化：伊朗最高安全委员会审查停火立场，称外交已失去信誉。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗坚持海峡主权作为谈判最后筹码",
      "美国要求伊朗完全放弃区域代理武装及导弹能力"
    ],
    military: [
      "美国空海军通过定点清除伊朗战争潜力进行高压震慑",
      "伊朗利用地缘优势实施海上封锁及对美周边基地的饱和回击"
    ]
  },
  keyChange: "美伊直接开火且海峡宣布关闭，战争规模由代理冲突升级为全境对抗。",
  investmentSignal: "→ 强力对冲风险，大幅增持能源与避险资产。",
  prevRiskScore: 76,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqgnMGKm_E7gnUTqBd_HqfbhXa9fWtmAIy_9rbTxE5l-aB9cihEjwqW7qlLEHKe2mPZ1wJgTYLofnb5F6-HBxHBoFigg3-cch-ev6zL-Y_gTqWg6lDhK5xW4vSkWoFhxQqbdX7bhwB"
    },
    {
      title: "futunn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgrmP5hmSS0H8XiajVREocJsOz9N-tsFur2PgWh73KNsB6cr0v5W3fpUgr6Ks8Kjxwbf43h-RC1CDg6nSLwVmJT2rzCQ7Fs6kez2PRmTi3zKZF5n-dXN_3uF6Mt55lj0lUQlU-npC9RVTEl2KfAZMQsvJj0QEPft6JeZKkg9jQkf-45Y7J8rZy0ZbPOCACbQ=="
    },
    {
      title: "nv.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUeY2iA9Pw5Zj_BJfczbpUXU7TdbW8V03EFb2mv-NWk9GUCIfHIJP39kK2Jr-ASDyllicxxo-tzarbolm5KWxyAE0BoyBnxzuNCfgkU8arHgpGfQoBoT0Tjwjk2BUOnHjPAEUH_ygzUhJs6dpaWACTYNXsBTa0GlyGEEELRk048GjeCRUwXsoX2yU="
    },
    {
      title: "wuft.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAx1VoOuXYRiKsXRqGeu_y4VaxP1TeL1DW13zRARX7Bjl-HIU3nCJy6OtH6M3Y3imAS80DsBaz-HOzR_cGRQbeBggQ-EpZN2hDzlxv1T8EXnl5Af6gzXCIm2LLRIYlPDNbscgKp8RC000O1Zru95Wuw0xAd8ilelBcR_l_AoEhwVAVgZ7rsU4c6ZeAXkQC2IqURWRc2f6dVC5COXmGRjHSFRPqWIg="
    },
    {
      title: "stimson.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQExOzedn-PBp9rzJGG2Q-uyUP8VRSGwSGkR0HUxf8F62mVJ_8_st7M90c9S0LPubkxGOJnaxQx9h_o4UETTBTqC1Gkr2ltEiO0rBEeYOqwFuSN_OmUv1FaYhWlgJFgb8jead8gJu8L2zxgigoZUz9TrEPSIw_VvxWR25LY8PCHqTTU3337t3aKbAb5IyZ3UpoPN6-s23DGf61Y="
    },
    {
      title: "substack.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6LMSyX24oeixW_ypr3YfoBfrK6dglZy8Me2mLfTlyoLclJLyXIkfrTUwLrniFSzqYdEIHoS2wWlwf0GZszP1eR3WFtLfV5O0A-MNJYuovotKrojLMN1LHOSHbE9gxl8B3SX-1OVmZE_QbtT9Zvl7hJqNThzP-bmjQHsBQ1WFjJ8zy3j8W"
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHu0wUiYm9wO9amkW4jzzkI76Stw1eyzl2tbRQqQHA_wkOkM6rcB1ruRgoK5R9UxLQ6lfC_-KBs66iwblmlNYhzzb9VkKty9_spDcTT6g5dozu5XNPpbs5feVBR99k45_CgnWoYQw=="
    },
    {
      title: "nprillinois.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFr1pj9VkWbNtRkmvRTggwAkkdG-gIHdOhhOM4Yj49t44VI5PSS98_blL9W1LIAeCy28-kOcnMTcQHlmK1GiIDEJJAT5fJlC31KTWtVE8eo5UoCcxfLI1TboEeeu_qGrG5-OE0vpnjVwTr-yZnqggPwfmjt_gc8-QRcvOIX4RlUdJiJsKb4QPEN42B3ZSPdQZMlR7gZO9zplVtCVA3uauYiYjW2qw4kLkgY4nQD"
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH54X5ahPEOKATgYm5lZuh8CIoJLRGgzamx_L1KhQJ8S_vDHrKS5aRIzOzsm0a0JVCteBsrmdAb2dFCVVgnKoIBCbQi_hTsGWqEU3N4rO622sh9obWhwMx4sZOfy129Hsys4PCPfFInfn5vep6RMqSM7RwTpoyFGYjVKk5Bl8AwfwpVt4KQgXyOfgcCX9iUWHpjHfhzFsLQsi5bziYrQOgtOSSJdWOrPUQqXIuMNfY4jN7x"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range June 11 2024 trend",
    "US Iran conflict news June 11 2024 CENTCOM Houthi Red Sea",
    "Iran military news June 11 2024"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-11",
  version: "v2.92",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D103",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $91.5–$94.8 · Brent $92.2–$95.7",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Total Blockade",
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
      description: "U.S. and Iran traded direct strikes on each other's territory and bases for a second consecutive day.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "IRGC declares total closure of the Strait; U.S. blockade leads to maritime casualties.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3,
      weight: 0.2,
      description: "Prices remain elevated in the $90s due to blockade, though technical pullbacks are noted.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Direct U.S. combat; India protests civilian deaths; Russia/China call for restraint.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 4,
      weight: 0.2,
      description: "Ceasefire is considered dead; diplomatic channels are essentially non-functional.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 82,
  change: "up",
  scoreTrend: [
    {
      date: "06-07",
      score: 72
    },
    {
      date: "06-08",
      score: 72
    },
    {
      date: "06-09",
      score: 72
    },
    {
      date: "06-10",
      score: 76
    },
    {
      date: "06-11",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Direct Strike Exchange",
      description: "Intense U.S. air strikes on Iranian defense hubs met with Iranian missile responses toward Bahrain, Kuwait, and Jordan bases.",
      verification: "confirmed",
      timestamp: "2026-06-11T05:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Full Closure of Hormuz Declared",
      description: "Iran's IRGC declares the waterway closed to all commercial shipping, threatening to target any vessel attempting transit.",
      verification: "confirmed",
      timestamp: "2026-06-11T12:00:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Three Indian Sailors Killed in US Operation",
      description: "U.S. forces disabled an Iran-linked tanker, resulting in casualties and a major diplomatic incident with India.",
      verification: "confirmed",
      timestamp: "2026-06-11T09:00:00Z",
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
      "Direct sovereign territory strikes make the previous truce irrelevant.",
      "Strait of Hormuz has entered a phase of kinetic maritime blockade.",
      "Diplomatic mediation is at its lowest point since conflict onset."
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
        "Continue: Sustained U.S. missile bombardment of Iranian southern defenses.",
        "Change: Iran launches large-scale regional retaliation against U.S. bases."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Transit status downgraded to 'Total Blockade' by IRGC decree.",
        "Change: U.S. has now disabled 9 vessels attempting to defy the blockade."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent pulls back to $92.50 on profit-taking despite the blockade.",
        "Continue: Logistics costs for rerouting around Africa reach record highs."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Trump maintains 'maximum pressure' via kinetic strikes.",
        "Change: Tehran officially suspends all back-channel peace discussions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Iran's use of Hormuz as survival leverage vs U.S. demand for total capitulation.",
      "Domestic pressure in both nations to avoid a 'defeat' in the current fire exchange."
    ],
    military: [
      "U.S. aim to degrade Iran's war potential vs Iran's asymmetric regional reach."
    ]
  },
  keyChange: "Direct war between U.S. and Iran with a total blockade of global energy arteries.",
  investmentSignal: "→ Hedge risk aggressively, overweight energy and defensive assets.",
  prevRiskScore: 76,
  webSources: [
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqgnMGKm_E7gnUTqBd_HqfbhXa9fWtmAIy_9rbTxE5l-aB9cihEjwqW7qlLEHKe2mPZ1wJgTYLofnb5F6-HBxHBoFigg3-cch-ev6zL-Y_gTqWg6lDhK5xW4vSkWoFhxQqbdX7bhwB"
    },
    {
      title: "futunn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgrmP5hmSS0H8XiajVREocJsOz9N-tsFur2PgWh73KNsB6cr0v5W3fpUgr6Ks8Kjxwbf43h-RC1CDg6nSLwVmJT2rzCQ7Fs6kez2PRmTi3zKZF5n-dXN_3uF6Mt55lj0lUQlU-npC9RVTEl2KfAZMQsvJj0QEPft6JeZKkg9jQkf-45Y7J8rZy0ZbPOCACbQ=="
    },
    {
      title: "nv.ua",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUeY2iA9Pw5Zj_BJfczbpUXU7TdbW8V03EFb2mv-NWk9GUCIfHIJP39kK2Jr-ASDyllicxxo-tzarbolm5KWxyAE0BoyBnxzuNCfgkU8arHgpGfQoBoT0Tjwjk2BUOnHjPAEUH_ygzUhJs6dpaWACTYNXsBTa0GlyGEEELRk048GjeCRUwXsoX2yU="
    },
    {
      title: "wuft.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAx1VoOuXYRiKsXRqGeu_y4VaxP1TeL1DW13zRARX7Bjl-HIU3nCJy6OtH6M3Y3imAS80DsBaz-HOzR_cGRQbeBggQ-EpZN2hDzlxv1T8EXnl5Af6gzXCIm2LLRIYlPDNbscgKp8RC000O1Zru95Wuw0xAd8ilelBcR_l_AoEhwVAVgZ7rsU4c6ZeAXkQC2IqURWRc2f6dVC5COXmGRjHSFRPqWIg="
    },
    {
      title: "stimson.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQExOzedn-PBp9rzJGG2Q-uyUP8VRSGwSGkR0HUxf8F62mVJ_8_st7M90c9S0LPubkxGOJnaxQx9h_o4UETTBTqC1Gkr2ltEiO0rBEeYOqwFuSN_OmUv1FaYhWlgJFgb8jead8gJu8L2zxgigoZUz9TrEPSIw_VvxWR25LY8PCHqTTU3337t3aKbAb5IyZ3UpoPN6-s23DGf61Y="
    },
    {
      title: "substack.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6LMSyX24oeixW_ypr3YfoBfrK6dglZy8Me2mLfTlyoLclJLyXIkfrTUwLrniFSzqYdEIHoS2wWlwf0GZszP1eR3WFtLfV5O0A-MNJYuovotKrojLMN1LHOSHbE9gxl8B3SX-1OVmZE_QbtT9Zvl7hJqNThzP-bmjQHsBQ1WFjJ8zy3j8W"
    },
    {
      title: "ycharts.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHu0wUiYm9wO9amkW4jzzkI76Stw1eyzl2tbRQqQHA_wkOkM6rcB1ruRgoK5R9UxLQ6lfC_-KBs66iwblmlNYhzzb9VkKty9_spDcTT6g5dozu5XNPpbs5feVBR99k45_CgnWoYQw=="
    },
    {
      title: "nprillinois.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFr1pj9VkWbNtRkmvRTggwAkkdG-gIHdOhhOM4Yj49t44VI5PSS98_blL9W1LIAeCy28-kOcnMTcQHlmK1GiIDEJJAT5fJlC31KTWtVE8eo5UoCcxfLI1TboEeeu_qGrG5-OE0vpnjVwTr-yZnqggPwfmjt_gc8-QRcvOIX4RlUdJiJsKb4QPEN42B3ZSPdQZMlR7gZO9zplVtCVA3uauYiYjW2qw4kLkgY4nQD"
    },
    {
      title: "gcaptain.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH54X5ahPEOKATgYm5lZuh8CIoJLRGgzamx_L1KhQJ8S_vDHrKS5aRIzOzsm0a0JVCteBsrmdAb2dFCVVgnKoIBCbQi_hTsGWqEU3N4rO622sh9obWhwMx4sZOfy129Hsys4PCPfFInfn5vep6RMqSM7RwTpoyFGYjVKk5Bl8AwfwpVt4KQgXyOfgcCX9iUWHpjHfhzFsLQsi5bziYrQOgtOSSJdWOrPUQqXIuMNfY4jN7x"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range June 11 2024 trend",
    "US Iran conflict news June 11 2024 CENTCOM Houthi Red Sea",
    "Iran military news June 11 2024"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月11日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.92 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（↑6）：美伊直接开火且海峡宣布关闭，战争规模由代理冲突升级为全境对抗。",
    bannerWarning: "→ 强力对冲风险，大幅增持能源与避险资产。",
    deescalationIntent: "伊朗坚持海峡主权作为谈判最后筹码",
    structuralRisk: "伊朗革命卫队宣布完全关闭海峡，美军实施海上封锁导致民用船只毁损与人员伤亡。",
    contradictionNote: "伊朗坚持海峡主权作为谈判最后筹码；美国空海军通过定点清除伊朗战争潜力进行高压震慑",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第103天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 11 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.92 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (↑6): Direct war between U.S. and Iran with a total blockade of global energy arteries.",
    bannerWarning: "→ Hedge risk aggressively, overweight energy and defensive assets.",
    deescalationIntent: "Iran's use of Hormuz as survival leverage vs U.S. demand for total capitulation.",
    structuralRisk: "IRGC declares total closure of the Strait; U.S. blockade leads to maritime casualties.",
    contradictionNote: "Iran's use of Hormuz as survival leverage vs U.S. demand for total capitulation.; U.S. aim to degrade Iran's war potential vs Iran's asymmetric regional reach.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 103",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
