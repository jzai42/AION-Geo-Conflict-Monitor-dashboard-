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
  date: "2026-04-21",
  version: "v2.40",
  keyStats: [
    {
      label: "冲突天数",
      value: "D52",
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
      value: "WTI $87.88–$88.10 · Brent $95.10–$95.62",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "通行中断",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美海军扣押伊朗籍货轮，伊朗随后发起无人机报复性空袭，交火强度显著回升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗正式宣布因应美国封锁而关闭航道，商船通行量在过去24小时降至谷底。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "油价大幅上涨超 5%，布伦特接近 100 美元警戒线，但尚未突破 rubric 所定 4 档门槛。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持海上封锁部署，中国与欧盟呼吁恢复航道通畅，但未有第三方军事直接对抗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "由于扣船事件及美方坚持封锁，伊朗议会拒绝出席即将举行的和谈，停火到期后大概率不续签。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美海军扣押 Touska 号货轮",
      description: "美军驱逐舰在警告 6 小时后开火瘫痪并接管了一艘向伊朗运送物资的商船。",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗撤回「开放航道」承诺",
      description: "伊朗官方媒体指责美方违反停火协议，宣布撤回此前暂时开放海峡的决定。",
      verification: "confirmed",
      timestamp: "2026-04-21",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "双周停火协议周三到期，实地已发生多次交火。",
      "能源通道陷入实质性长期化中断风险。",
      "美伊双方均向中间人巴基斯坦释放了极其负面的信号。"
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
        "变化：美海军实施自封锁开始以来首次大规模公海扣船。",
        "变化：伊朗伊斯兰革命卫队重启针对美军资产的无人机干扰与打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：霍尔木兹海峡通行量从每日 20+ 跌至 15 艘以下。",
        "延续：美方维持对伊朗港口的完全海上封锁。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油风险溢价单日跳升 5%，全球供应链避险情绪浓厚。",
        "变化：保险巨头将该区域船舶战争险溢价再次翻倍。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普明确表示「不急于」在伊斯兰堡做出让步。",
        "变化：伊朗议长声明称谈判环境已经恶化，拒绝「投降式谈判」。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方封锁政策与伊方生存尊严的不可调和性。",
      "特朗普政府的高压谈判策略与伊朗内部强硬派抬头。"
    ],
    military: [
      "海上封锁与航行自由权在战时的法律真空与实力对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72
    },
    {
      date: "04-21",
      score: 76,
      active: true
    }
  ],
  keyChange: "美军扣押伊朗商船引发伊方无人机反击，两周停火协议名存实亡。",
  investmentSignal: "→ 防御性增持能源与黄金，对冲风险资产以应对停火失效。",
  prevRiskScore: 72,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHbnAnPHpTZRHToKc9KMU98BfOCW1DDrrxYLgfLNKj6mVjet25diQKRVNtzeswdly2eK5wBxnE7gwZ5c8uugyRCQ26urEcgQYOR7HAtfXZl-q-1qdpvFOA-syOKTon_S_TZfVqzA-5GCpbq0D_r5dotC8xPo1DSrP72xfHAvhGKz5f4lZQ="
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF1pbBDiAmVOfbwR2fPl1NYiYRAhjtSAvEDm0lKXrHyxGm9Pgi3-l6hoQsepCKh-_OOvE5KAyOJsS_jPzGrEoEGeWnzVxVKvJCkAe95BS4mIlCE0Ecml1H8fUsvH4kM0yMVHIP8TYbZrrBEI7GrszdMH_czkXiKFOHNr7p4VpzoaA=="
    },
    {
      title: "news.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKvS382yFA0sikmFc7JtWvZ6M-VwJMJ3_ujXdJ9Bnw2NiQ2BhYCfYJ4FqYmUMc_ZfpnQ1xk6HvJS8PZ-TfZlNL9EI-VwOY0waDEuuFA1oxOAhEJ0nW9xyEZWbg1Tky7vE16wCsRQlGhG9V6cmtg3azDWy-paiIoYIXJ8cg-K0TM6AWcdj4SHgTgmQirqnrhdi_90aj"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG3d6xWD52G9osyqExq2Dm1LWfGJoTlwt6LM1pNdRtOwvt_ynop6tiFwB0yS5u8GFK9qJxil4H0b9XPVGbDy8elSmGcONON4nC0KSWYF11jVVc_dMeVEYLZieV0MRu57_XV6DVomGOvCTTVX3h2-6maIDP9Z2Xk8RFq2WKaxsYosLlR63WFHfWWdOdubHpB7BHs0eFfAE-U5goSZcplwBY2qPF0R5yZCcSMX-Q="
    },
    {
      title: "polyestertime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGt7eNkeZX-e8WCHc3eTA0lz_WChbUsMAYmdz017Vxyq6ueOBgj2L-cvy_RT1RNF-man2xpUkRQ7exlANNHtWTbQUNPgDMn8m8TYD5FVGA1ALsVsVkFFdBBaP0uWJrl1BU3zv8AkBml"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4xBkxo-78EC-e57ued3HP-2fepH9scjMwKInCFecuaLrBGNjv3wxD9tJc5-a7wCrADY6UN48AiLWsXN_f_iyvunkAgNws_6bp2LGK0SBOYjs13DsPNLkffcT7lH53LnY8OqzMSTCB5Bjk5xDeDkK1h1hUDL8="
    },
    {
      title: "financemagnates.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQECg-1se9mPJ3qP5X8cOd_QymO-n3uIi2bY-y0YeleP0nqVc0K7AmqQIdt6zIuvVYhua1J99J6gRjkHZByP96TTsOJZDJxMlFb5ThjC89WdWSkURNIwazBNjrs2jFeGmP5niho8fK1rayLn2jEpWqdUAXuYxCcbzxwyUXdEAopc7tMc8pt04X0CnKWMdm7wUBcDPKfKlbmglbj5URGUVciUeM0gxEGg3AgrQH2SXSMZz7pQJH8="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range 24h April 2026 forecast geopolitical risk",
    "US Iran conflict news April 21 2026 Persian Gulf drones Hormuz",
    "WTI Brent crude price April 21 2024 current range trend reuters bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-04-21",
  version: "v2.40",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D52",
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
      value: "WTI $87.88–$88.10 · Brent $95.10–$95.62",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Traffic Standstill",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US seizure of an Iranian vessel followed by drone retaliation marks a significant breach of the ceasefire.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Iran officially rescinded its open-strait policy, leading to a near-total halt in shipping traffic.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Prices surged over 5%, with Brent nearing $100 but remaining within the $85–$100 range.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US maintains a naval blockade while China calls for normalization of passage.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "Ceasefire expires Wednesday with no plan for extension as Iran rejects talks under threat.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Navy Seizes Iranian Ship Touska",
      description: "USS Spruance seized the cargo vessel in the northern Arabian Sea after warnings.",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Retaliates with Drone Swarm",
      description: "Iranian military launched drones at US warships in response to the maritime 'robbery'.",
      verification: "confirmed",
      timestamp: "2026-04-20",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire set to expire Wednesday with hostilities resuming on the ground.",
      "Hormuz traffic is virtually at zero, threatening long-term supply chains.",
      "Diplomatic channels in Islamabad are stalled by rigid pre-conditions."
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
        "Change: US Navy executes first high-seas seizure of an Iranian commercial vessel since the conflict began.",
        "Change: IRGC resumes drone targeting of US regional assets."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Strait of Hormuz transit drops below 15 vessels per day.",
        "Continue: US maintain total naval blockade of Iranian exports."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude risk premium jumps 5% in a single session.",
        "Change: War risk insurance premiums for the region have doubled again."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump states he is under 'no pressure' to compromise.",
        "Change: Iranian Parliament speaker rejects 'talks of surrender'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatibility between the US blockade and Iran's sovereign survival.",
      "High-pressure US negotiation tactics vs. hardline resurgence in Tehran."
    ],
    military: [
      "The vacuum between blockade enforcement and the right to freedom of navigation."
    ]
  },
  scoreTrend: [
    {
      date: "04-17",
      score: 72
    },
    {
      date: "04-18",
      score: 60
    },
    {
      date: "04-19",
      score: 68
    },
    {
      date: "04-20",
      score: 72
    },
    {
      date: "04-21",
      score: 76,
      active: true
    }
  ],
  keyChange: "US seizure of an Iranian vessel triggered drone retaliation, effectively ending the fragile ceasefire.",
  investmentSignal: "→ Increase defensive positions in energy and gold, hedge risky assets against ceasefire collapse.",
  prevRiskScore: 72,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHbnAnPHpTZRHToKc9KMU98BfOCW1DDrrxYLgfLNKj6mVjet25diQKRVNtzeswdly2eK5wBxnE7gwZ5c8uugyRCQ26urEcgQYOR7HAtfXZl-q-1qdpvFOA-syOKTon_S_TZfVqzA-5GCpbq0D_r5dotC8xPo1DSrP72xfHAvhGKz5f4lZQ="
    },
    {
      title: "aa.com.tr",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF1pbBDiAmVOfbwR2fPl1NYiYRAhjtSAvEDm0lKXrHyxGm9Pgi3-l6hoQsepCKh-_OOvE5KAyOJsS_jPzGrEoEGeWnzVxVKvJCkAe95BS4mIlCE0Ecml1H8fUsvH4kM0yMVHIP8TYbZrrBEI7GrszdMH_czkXiKFOHNr7p4VpzoaA=="
    },
    {
      title: "news.az",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKvS382yFA0sikmFc7JtWvZ6M-VwJMJ3_ujXdJ9Bnw2NiQ2BhYCfYJ4FqYmUMc_ZfpnQ1xk6HvJS8PZ-TfZlNL9EI-VwOY0waDEuuFA1oxOAhEJ0nW9xyEZWbg1Tky7vE16wCsRQlGhG9V6cmtg3azDWy-paiIoYIXJ8cg-K0TM6AWcdj4SHgTgmQirqnrhdi_90aj"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG3d6xWD52G9osyqExq2Dm1LWfGJoTlwt6LM1pNdRtOwvt_ynop6tiFwB0yS5u8GFK9qJxil4H0b9XPVGbDy8elSmGcONON4nC0KSWYF11jVVc_dMeVEYLZieV0MRu57_XV6DVomGOvCTTVX3h2-6maIDP9Z2Xk8RFq2WKaxsYosLlR63WFHfWWdOdubHpB7BHs0eFfAE-U5goSZcplwBY2qPF0R5yZCcSMX-Q="
    },
    {
      title: "polyestertime.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGt7eNkeZX-e8WCHc3eTA0lz_WChbUsMAYmdz017Vxyq6ueOBgj2L-cvy_RT1RNF-man2xpUkRQ7exlANNHtWTbQUNPgDMn8m8TYD5FVGA1ALsVsVkFFdBBaP0uWJrl1BU3zv8AkBml"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH4xBkxo-78EC-e57ued3HP-2fepH9scjMwKInCFecuaLrBGNjv3wxD9tJc5-a7wCrADY6UN48AiLWsXN_f_iyvunkAgNws_6bp2LGK0SBOYjs13DsPNLkffcT7lH53LnY8OqzMSTCB5Bjk5xDeDkK1h1hUDL8="
    },
    {
      title: "financemagnates.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQECg-1se9mPJ3qP5X8cOd_QymO-n3uIi2bY-y0YeleP0nqVc0K7AmqQIdt6zIuvVYhua1J99J6gRjkHZByP96TTsOJZDJxMlFb5ThjC89WdWSkURNIwazBNjrs2jFeGmP5niho8fK1rayLn2jEpWqdUAXuYxCcbzxwyUXdEAopc7tMc8pt04X0CnKWMdm7wUBcDPKfKlbmglbj5URGUVciUeM0gxEGg3AgrQH2SXSMZz7pQJH8="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price range 24h April 2026 forecast geopolitical risk",
    "US Iran conflict news April 21 2026 Persian Gulf drones Hormuz",
    "WTI Brent crude price April 21 2024 current range trend reuters bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月21日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.40 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（↑4）：美军扣押伊朗商船引发伊方无人机反击，两周停火协议名存实亡。",
    bannerWarning: "→ 防御性增持能源与黄金，对冲风险资产以应对停火失效。",
    deescalationIntent: "美方封锁政策与伊方生存尊严的不可调和性。",
    structuralRisk: "伊朗正式宣布因应美国封锁而关闭航道，商船通行量在过去24小时降至谷底。",
    contradictionNote: "美方封锁政策与伊方生存尊严的不可调和性。；海上封锁与航行自由权在战时的法律真空与实力对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第52天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 21 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.40 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (↑4): US seizure of an Iranian vessel triggered drone retaliation, effectively ending the fragile ceasefire.",
    bannerWarning: "→ Increase defensive positions in energy and gold, hedge risky assets against ceasefire collapse.",
    deescalationIntent: "Incompatibility between the US blockade and Iran's sovereign survival.",
    structuralRisk: "Iran officially rescinded its open-strait policy, leading to a near-total halt in shipping traffic.",
    contradictionNote: "Incompatibility between the US blockade and Iran's sovereign survival.; The vacuum between blockade enforcement and the right to freedom of navigation.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 52",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
