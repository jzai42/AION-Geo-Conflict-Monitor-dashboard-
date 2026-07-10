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
  date: "2026-07-10",
  version: "v2.121",
  keyStats: [
    {
      label: "冲突天数",
      value: "D132",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑8",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $71.17–$73.93 · Brent $74.00–$77.00",
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
      prev: 3,
      weight: 0.2,
      description: "美伊爆发自冲突起始以来最大规模的直接军事交换，美军对伊朗沿岸实施了约90次精确打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡航道因军事行动和水雷疑虑陷入近乎停摆，主要班轮公司避开南线奥曼航道。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "虽然地缘风险溢价上升，但WTI仍维持在75美元下方，反映出宏观经济担忧对冲了供应短缺。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国不仅通过制裁施压，已全面转向直接军事干预；北约在东地中海提供情报支持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "6月签署的临时协议（MOU）已被美伊双方事实性撕毁，外交调停目前缺乏切入点。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 74,
  scoreTrend: [
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74,
      active: true
    }
  ],
  warPhase: {
    level: "危机升级期",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊直接军事对抗常态化",
      "霍尔木兹海峡进入高风险非物理封锁状态",
      "外交谈判通道基本阻断"
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
        "变化：美军打击伊朗90个战略目标，包括布什尔省附近的军事设施。",
        "变化：伊朗向美军驻巴林、科威特、约旦基地发射导弹报复。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：海峡流量较停火期间下降70%，Kpler确认通行量跌至历史极低水平。",
        "延续：大量商船关闭AIS应答器“暗转”通行，规避打击风险。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美财政部撤回伊朗石油豁免，单方面切断其官方原油出口渠道。",
        "延续：油价维持在$71-77区间，市场正消化供应过剩预测与战争风险的抵消作用。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普正式宣告停火协议“已经终结”，美方转向高压打击态势。",
        "变化：伊朗高级顾问威胁，若领土完整受损将重新审视核 doctrine。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "特朗普政府的“表现导向型”协议因海峡商船遇袭而彻底破裂。",
      "伊朗领导层在 Khamenei 葬礼后展现出强硬的“血债血偿”姿态。"
    ],
    military: [
      "美军旨在通过直接打击消除伊朗对霍尔木兹海峡的控制能力。",
      "伊朗利用非对称反舰导弹及无人机群实施饱和反击。"
    ]
  },
  keyChange: "美伊从6月的虚假和平期正式崩盘，进入直接交战阶段，海峡航行安全处于二级红色预警。",
  investmentSignal: "→ 增持防御性大宗及黄金对冲地缘尾部风险，能源资产维持能源板块防御头寸，避免追高受需求压制的现货油价。",
  change: "up",
  prevRiskScore: 66,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "美伊爆发自冲突起始以来最大规模的直接军事交换，美军对伊朗沿岸实施了约90次精确打击",
      description: "美伊爆发自冲突起始以来最大规模的直接军事交换，美军对伊朗沿岸实施了约90次精确打击。",
      verification: "single",
      timestamp: "2026-07-10（当日公开报道）",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "海峡航道因军事行动和水雷疑虑陷入近乎停摆，主要班轮公司避开南线奥曼航道",
      description: "海峡航道因军事行动和水雷疑虑陷入近乎停摆，主要班轮公司避开南线奥曼航道。",
      verification: "single",
      timestamp: "2026-07-10（当日公开报道）",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8VRq4FSCT_5B6fSY0dkWHaZe5qwJ_Jf7OXF5yajH3gshFriPz8Y6HO-AOHHALSE9kAojTgpHq8O9YhInpWiu4tT7eME8L_cdldN5LMhLEjOCViulZaIbW497r3YnBws_TJGOcI8fIGeMomIA4j259Xp7j81myQI9V4fzDoyu2VsM3HP-fgbXJDZDLeaLBWyhEFGMEUrdO2h-cxIYugRIZ09gRcA=="
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDIpYKsya4LC3nP4wVlh2QUu45cLesnrbuum3BnDqj_ooIWcaLHygc8yYkJYBfUVUe_tQBseXuPJLRq7opIBn-9Hsxr1YpB9kss15aoLu2Hr8="
    },
    {
      title: "washingtonexaminer.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFM3hc5UfRI5RqaUjL7g4h9Huba5VfiUXMKy7QqXLP9Oxuly4xz-0hMIXB1D974n50VARUnTkLJJITiJh1QZgyVcBumglOEpxrkXdPzz7HXsMymJKZ4waGow3xGoNf0S8gIOJc_Pu9lqDrXvX5bu8JkQMZsAydnR4nhxQJzAUp-yOqd5Lu74d0="
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzAetGW1gew7hmsmoLEbRA1bXtV1aNt59ggaqRG4RXQ6SnuB3546rWe0SqBLPSbSgaq6cADZTWNpA9hUgVtiZN6kxTwmmZXbbfZE2TGjPAmZrBDpVf4pIahSKwz2FE5xswBYvSIK7kMRNscfZjFxChfgQOrHwozPYY9UIniw_9fk3zNNr8"
    },
    {
      title: "un.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHT-d06MkJaNWRANekX4bk_ubywFzvt8An3tRq0bcyBOwz-mKSGGuJYa4ujtFh_2iTRfwtVkQll1QQZpDLOT3hXIjlGQIwcQqcUEQTTjXLUrEIxpPQCN_Nn-ufIdpS31sY1Mg=="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQgfOwuV98Rg5DXoQi-RqKdWboFhGdSncmQUNQzNlm-olMwc9HTIxNs4VOBmLKbpCDlHPaYRhAg6v3YdL_G_onC6h2FHpWLKuyymOVa1Iboj7sCr5RjynyTB4GgvfsZsJ2BoqRtQ7h3YhGa9tzf5xZZyK4KUwMB_IYFWadW1brBfFI3_xGLaJXu1BYI9fxws2Bvok__uPLKeyPaBaMENLbOROzOd_x16iWFoYJcJiu-pfLtkmA7kk="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 10 2026 forecast scenario",
    "US Iran military conflict news July 10 2026 IRGC drills Hormuz",
    "Hormuz Strait shipping traffic status July 10 2026 reports",
    "US sanctions Iran maritime July 2026 White House statement"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-10",
  version: "v2.121",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D132",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑8",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $71.17–$73.93 · Brent $74.00–$77.00",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Passage",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Direct massive kinetic exchanges between US and Iran, including strikes on 90 targets inside Iran.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Shipping traffic has plunged as hostilities resume; insurers classify the route as extreme risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2.5,
      weight: 0.2,
      description: "Energy prices stay suppressed by macro demand concerns despite the sharp escalation in war risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US is now a primary belligerent with active offensive operations; NATO provided strategic intelligence support.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "The June MOU is effectively dead after mutual accusations of truce violations.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 74,
  scoreTrend: [
    {
      date: "07-06",
      score: 60
    },
    {
      date: "07-07",
      score: 62
    },
    {
      date: "07-08",
      score: 64
    },
    {
      date: "07-09",
      score: 66
    },
    {
      date: "07-10",
      score: 74,
      active: true
    }
  ],
  warPhase: {
    level: "Escalation Phase",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US-Iran direct conflict becomes operational norm",
      "Hormuz enters non-physical blockade state",
      "Diplomatic channels are non-functional"
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
        "Change: US strikes 90 strategic Iranian sites, including facilities near Bushehr nuclear plant.",
        "Change: Iran retaliates with missile strikes on US bases in Bahrain, Kuwait, and Jordan."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Strait traffic down 70% from truce peak; Kpler confirms record-low transit volume.",
        "Continue: Vessels transiting 'dark' with transponders off to mitigate attack risk."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US Treasury rescinds General License X, blocking Iranian oil revenue again.",
        "Continue: Prices range $71-77 as supply-demand fundamentals cap geopolitical spikes."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump officially declares ceasefire 'over' at NATO summit.",
        "Change: Tehran advisors threaten reconsidering nuclear doctrine due to 'existential threat'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Trump's performance-based MOU collapsed following maritime attacks.",
      "Iranian leadership adopts 'blood revenge' stance following Khamenei's burial."
    ],
    military: [
      "US aims to dismantle IRGC's maritime control capability through kinetic force.",
      "Iran uses asymmetric saturation tactics against US naval assets and commercial ships."
    ]
  },
  keyChange: "Systemic collapse of the June truce into direct state-on-state warfare.",
  investmentSignal: "→ Overweight defensive commodities and hedging assets; maintain energy exposure for volatility protection.",
  change: "up",
  prevRiskScore: 66,
  events: [
    {
      id: "EVT-AUTO-01",
      title: "Direct massive kinetic exchanges between US and Iran, including strikes on 90 targets inside Ir…",
      description: "Direct massive kinetic exchanges between US and Iran, including strikes on 90 targets inside Iran.",
      verification: "single",
      timestamp: "2026-07-10 (same-day reporting)",
      significance: ""
    },
    {
      id: "EVT-AUTO-02",
      title: "Shipping traffic has plunged as hostilities resume",
      description: "Shipping traffic has plunged as hostilities resume; insurers classify the route as extreme risk.",
      verification: "single",
      timestamp: "2026-07-10 (same-day reporting)",
      significance: ""
    }
  ],
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8VRq4FSCT_5B6fSY0dkWHaZe5qwJ_Jf7OXF5yajH3gshFriPz8Y6HO-AOHHALSE9kAojTgpHq8O9YhInpWiu4tT7eME8L_cdldN5LMhLEjOCViulZaIbW497r3YnBws_TJGOcI8fIGeMomIA4j259Xp7j81myQI9V4fzDoyu2VsM3HP-fgbXJDZDLeaLBWyhEFGMEUrdO2h-cxIYugRIZ09gRcA=="
    },
    {
      title: "hormuztracking.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDIpYKsya4LC3nP4wVlh2QUu45cLesnrbuum3BnDqj_ooIWcaLHygc8yYkJYBfUVUe_tQBseXuPJLRq7opIBn-9Hsxr1YpB9kss15aoLu2Hr8="
    },
    {
      title: "washingtonexaminer.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFM3hc5UfRI5RqaUjL7g4h9Huba5VfiUXMKy7QqXLP9Oxuly4xz-0hMIXB1D974n50VARUnTkLJJITiJh1QZgyVcBumglOEpxrkXdPzz7HXsMymJKZ4waGow3xGoNf0S8gIOJc_Pu9lqDrXvX5bu8JkQMZsAydnR4nhxQJzAUp-yOqd5Lu74d0="
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzAetGW1gew7hmsmoLEbRA1bXtV1aNt59ggaqRG4RXQ6SnuB3546rWe0SqBLPSbSgaq6cADZTWNpA9hUgVtiZN6kxTwmmZXbbfZE2TGjPAmZrBDpVf4pIahSKwz2FE5xswBYvSIK7kMRNscfZjFxChfgQOrHwozPYY9UIniw_9fk3zNNr8"
    },
    {
      title: "un.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHT-d06MkJaNWRANekX4bk_ubywFzvt8An3tRq0bcyBOwz-mKSGGuJYa4ujtFh_2iTRfwtVkQll1QQZpDLOT3hXIjlGQIwcQqcUEQTTjXLUrEIxpPQCN_Nn-ufIdpS31sY1Mg=="
    },
    {
      title: "thestar.com.my",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQgfOwuV98Rg5DXoQi-RqKdWboFhGdSncmQUNQzNlm-olMwc9HTIxNs4VOBmLKbpCDlHPaYRhAg6v3YdL_G_onC6h2FHpWLKuyymOVa1Iboj7sCr5RjynyTB4GgvfsZsJ2BoqRtQ7h3YhGa9tzf5xZZyK4KUwMB_IYFWadW1brBfFI3_xGLaJXu1BYI9fxws2Bvok__uPLKeyPaBaMENLbOROzOd_x16iWFoYJcJiu-pfLtkmA7kk="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range trend July 10 2026 forecast scenario",
    "US Iran military conflict news July 10 2026 IRGC drills Hormuz",
    "Hormuz Strait shipping traffic status July 10 2026 reports",
    "US sanctions Iran maritime July 2026 White House statement"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月10日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.121 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 74（↑8）：美伊从6月的虚假和平期正式崩盘，进入直接交战阶段，海峡航行安全处于二级红色预警。",
    bannerWarning: "→ 增持防御性大宗及黄金对冲地缘尾部风险，能源资产维持能源板块防御头寸，避免追高受需求压制的现货油价。",
    deescalationIntent: "特朗普政府的“表现导向型”协议因海峡商船遇袭而彻底破裂。",
    structuralRisk: "海峡航道因军事行动和水雷疑虑陷入近乎停摆，主要班轮公司避开南线奥曼航道。",
    contradictionNote: "特朗普政府的“表现导向型”协议因海峡商船遇袭而彻底破裂。；美军旨在通过直接打击消除伊朗对霍尔木兹海峡的控制能力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第132天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 10 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.121 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 74 (↑8): Systemic collapse of the June truce into direct state-on-state warfare.",
    bannerWarning: "→ Overweight defensive commodities and hedging assets; maintain energy exposure for volatility protection.",
    deescalationIntent: "Trump's performance-based MOU collapsed following maritime attacks.",
    structuralRisk: "Shipping traffic has plunged as hostilities resume; insurers classify the route as extreme risk.",
    contradictionNote: "Trump's performance-based MOU collapsed following maritime attacks.; US aims to dismantle IRGC's maritime control capability through kinetic force.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 132",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
