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
  date: "2026-05-23",
  version: "v2.73",
  keyStats: [
    {
      label: "冲突天数",
      value: "D84",
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
      value: "WTI $96.50–$101.00 · Brent $103.00–$106.00",
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
      description: "美军在海湾地区维持高战备状态，CBS报道指特朗普正在考虑新的打击计划。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗通过控制船只通行并强制收费实施事实上的一边倒管控，通行量极低。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "油价在高位震荡，布伦特原油站稳100美元上方，反映出供应短缺的结构性溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "区域中介（巴、卡、阿）密集出动，欧盟加大制裁力度，大国仍倾向于通过非直接交火施压。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "外交对话虽然活跃但缺乏实质让步，关键矛盾（铀浓缩、海峡收费）仍无解。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 76,
  events: [
    {
      id: "EVT-01",
      title: "美方筹备「Plan B」军事打击",
      description: "消息称特朗普与国家安全团队会面，讨论若谈判失败对伊实施新打击。来源：CBS, Axios。",
      verification: "confirmed",
      timestamp: "2026-05-23T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "巴基斯坦斡旋团抵达德黑兰",
      description: "巴陆军参谋长穆尼尔会晤伊朗外长阿拉格齐，寻求避免全面战争的最后方案。来源：The Hindu, Al Jazeera。",
      verification: "confirmed",
      timestamp: "2026-05-23T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "布伦特原油收报103.94美元",
      description: "价格较前一交易日上涨1.33%，市场对海峡封锁的长期化表示担忧。来源：Trading Economics。",
      verification: "confirmed",
      timestamp: "2026-05-23T08:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "欧盟扩大对伊海上制裁",
      description: "针对伊朗阻碍霍尔木兹海峡自由航行的行为，欧盟通过新制裁框架。来源：Gulf News。",
      verification: "confirmed",
      timestamp: "2026-05-23T02:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "高压对峙",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "尽管存在外交斡旋，但实地军事对抗准备未减。",
      "霍尔木兹海峡的非正式「准入系统」成为博弈新常态。",
      "未来48小时为协议窗口期或升级转折点。"
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
        "变化：美军取消部分人员休假，展示「Plan B」打击就绪状态。",
        "延续：以色列国防军在北部和海上战线维持高度防御姿态。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：每日通行船舶维持在30艘左右，不足正常水平25%。",
        "变化：伊朗提出与阿曼建立新的航运支付框架，试图长期化海峡控制。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要石油合约在100美元附近剧烈震荡，供需溢价维持在30%以上。",
        "变化：市场正消化美伊停火谈判的「50-50」不确定性。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普因「政府事务」取消私人行程留守华府，引发危机升级猜测。",
        "延续：哈梅内伊指示铀浓缩储备留存，作为谈判最终筹码。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国要求伊朗彻底放弃核浓缩 vs 伊朗要求结束制裁并承認其海峡安全角色。",
      "美国国内大选压力下的速决战略 vs 伊朗通过拉锯战消耗西方储备的策略。"
    ],
    military: [
      "美方的精确空中打击威慑 vs 伊朗及代理人的地区性非对称反击能力。"
    ]
  },
  scoreTrend: [
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74
    },
    {
      date: "05-21",
      score: 76
    },
    {
      date: "05-22",
      score: 76
    },
    {
      date: "05-23",
      score: 76,
      active: true
    }
  ],
  keyChange: "美军展示「Plan B」打击准备，与德黑兰密集外交斡旋形成极限施压局面，油价站稳$100关口。",
  investmentSignal: "→ 维持能源与避险资产防御性头寸，对冲地缘谈判破裂风险。",
  change: "none",
  prevRiskScore: 76,
  webSources: [
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEU2koudoshkYYIGHSeJx85Atdrk9OD7wUrWpuKhKh8O151_ASRT9nAXC-4JbSQzu1pGS_KoO0Vnlt3W72nll9vLEqAmSeU3BFPGStKGa8cbIHGNUu-VOnIryZompRkkYO42opslmnYWRgQAyNseOSX5OQODl-0pVE04R35MG2MoquYuNO09zi8OPV6eX0u28QAiLEuUONxLypF_5--VqmH3xifyiUoyfkY5W7fPP6Y0O0bRD9s58ID-zrDMsWtwnjm3qMouuIMnEyWnyMDil0UOFYIdp-jGKHhDu_TZGj9dp1KFRV7WH9CdQDIsxU4"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-J7YJp6FvQacy8XxuV0xIPoyd8b3W2WRhTJFoVWk_lhuoZzrehV8DItISFudvDbaieClmWx5SggP5Vp506va051DqObwFjoJmEoTbR6I8OblGZ08P3oUR_0PBbfoU0n6AF_fvxcIphLBlteKaJjH0AlTO1-bgaWBErkUMWmIBl4U5LwPSYpE3YEEUduJ0Cl-9XOYfsJVpx_JOkEyKOI8_x_3Up2uOMleh6NZfC0wKwsMEOMK2YglWDSQ8x7jUvEyhgkV5LkjIUUCQXLQo09vLF9Isz4w9exc="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUuRUTBT71zXHS5SCHoMXr6Cfuwfi1TN6J183q7EwO2FeyiIiXMAV5TB2JGE3GiqSsGUoLkrzWblpqwT8hlcEbtdBppNxU2mt1qb28Tup9Pm9Bwn81-n-XTYP9Sdk_kAtutWYE1Z7AnEo-1lA="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdvjrp_rVPxoNAS5u9hWTxQTrEFuWQsg-H6hm3aeKguZKhKjw8wc22uHWIJNDXuCj2LYZzYEL5zzxx-XCLgLdCB1xqPYnnbWb2Nogbtp00KwEgTYWvrDoYb5NUIGc2OzwjylIFjtczZ-IALouTW2tnqM4iuP4XudwnfRc3j4E17j2bNxwsGKMN1M9HLJE4PTuppdAUxZRHOexL3NteJR3A1BMl"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEYCtWtIiR_9c1SdSSlAPhkl8Kwq5Om0YIs2qBpL4BsUlr-urHFO5oO3G0kU3443JDSprVBTnBIjMTcLLZ1rNxldJSSdEZaZZCWDxY-Dw_Z2VLBM0xwNwiMpRbJ7e8Aa_EMPuL5E7Xf4ohj7KfEJRz4tq9AnsXELpo5hOxcN_Mn9R3YuQe4mxKYBVkxwDnWEsqkcPbDz2T-ua-EuRMO"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFX42mJApG4fUC_84iCBIoeqqU9AbrDKYIPH_M8C_k4FnkSNf0L_urq0pB2tyzyIepRujR0jEQcCj45ohf8BDoDzL270Pr4uyFIs9iJADtczgUbfzCgmPBMHNBsCSVTQO1NQVhsmDwRQqUsAv8DtyIXDZXCC8lxdp8l7grkJe29PNB6LQjJEbm35awm2VyLgVFBu8iOOosb"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUnfyer5IGrzL1pUlm42p0gFbtU_VeBWAhvpcNB_VRYHh3WUcTVORDId68VOHQoxRmk29beIJI12gyH_iIcM2CT6UbTzfiSJGE4pThI3sOKUMglLQEWCWevrwCtY0_CCz_vENdKw8K281ZF1fiZX7w1yniaQQ="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbM51C2LSx2zvh2m3iArO1_QxTI-Cupkcqyyh8Tg9ijD1WDqHOI71EQLtgxRdaqzY9Ygx1-8IGJbrbqWunf1MoExcbFXLIp3fZaDTiDmHhh6UdPnGEwQUm2UMoZQbWAbeQg6lPBKn9GI7Itduh2xQeOw=="
    },
    {
      title: "macrotrends.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHph4idpMcjsKUO7EvrZFaHynqkFE1reXcZxym4iTYTF6ktYNDY-o2E1s2mCz1Rnh5XlcrxwTvcXzZBJM3LXky5ShxOpBuNa27Omi_dp4kFMhj_yMHK-h4eVqC5t2q_hqB8fgDOmmWC4kgXKpblyIyDPdkOLbqel2QksqZbwH1N9q0rrQaYAQ=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEyHDHpFGZT3FoyOPjStnH6AvugGlOD6Wyt-ktsFndMH0E-3AnKAh3-xeVeJRuZfATnOjO8GcJcOoXYYHrRc5o3f7bSGqyxdntap72lnZYkJPS878pZcyzgm5iw2NnWPoOhYL_jPIFJ8g=="
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGx0wA7BGjlJjU07tMy0ehZKycsA7cThbVBqiPHU1x2Js2LtjQHdAbE4ZHUAeb44ddwsetnCRtWmnCxGokdtuZsMQnmNAFXcwI34ocS8ALIkOXP56jxtV3lFAmqYxUcRHubK1FVabT_8yQ1C0YDV1losZxDA6pscChyouG8g4qt8EJAnyWUflkIpQ0xyapJiAit5AOOC8XrlFhSxvW5K1w="
    },
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHmeE9R0tFc2Q6IN4iBdoj0_9h2oBz5Xe1Q0P6CNnvUFSter-JNXPq3N3jRaTzrdy8Mz9jQhr_FucEUrAtm_zfBThE4JUl6p3mTkCQoug8w7sCY5hPeXS3i9KJH5TaUsAKMbEgy_Sr2s3Xfo1ImB4v9oS1p5qYPkpur3mwqzsUXyMxPZjiWtqQzqyDns-AOkEaeOFU6WVivHgyf4s5os-CemGLim38Mpw=="
    }
  ],
  webSearchQueries: [
    "US Iran conflict updates May 23 2026 Strait of Hormuz news",
    "Iran nuclear program sanctions news May 23 2026",
    "WTI Brent oil prices May 23 2026 trend range Reuters Bloomberg"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-23",
  version: "v2.73",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D84",
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
      value: "WTI $96.50–$101.00 · Brent $103.00–$106.00",
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
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US forces maintain high readiness; CBS reports Plan B strikes under consideration.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "De facto Iranian control of transit with low volume and mandatory tolls.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Oil prices volatile at highs; Brent remains above $100 reflecting supply risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Regional mediators (Pakistan, Qatar) active; EU expands sanctions framework.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Active dialogue but deep deadlock on nuclear enrichment and shipping rights.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  riskScore: 76,
  events: [
    {
      id: "EVT-01",
      title: "US Prepares 'Plan B' Military Strikes",
      description: "Trump reportedly met with national security team to discuss strikes if talks fail. Source: CBS, Axios.",
      verification: "confirmed",
      timestamp: "2026-05-23T04:00:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Pakistan Mediation Team in Tehran",
      description: "Army Chief Munir meets Iranian FM Araghchi to seek a last-minute deal. Source: Hindu, Al Jazeera.",
      verification: "confirmed",
      timestamp: "2026-05-23T06:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Brent Crude at $103.94",
      description: "Prices up 1.33% as market fears prolonged Hormuz blockade. Source: Trading Economics.",
      verification: "confirmed",
      timestamp: "2026-05-23T08:00:00Z",
      significance: ""
    }
  ],
  warPhase: {
    level: "High-Pressure Standoff",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Military readiness remains high despite diplomatic sprint.",
      "Informal 'permit system' in Hormuz becoming a new status quo.",
      "Next 48 hours critical for either a deal or escalation."
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
        "Change: US military cancels some leave to demonstrate Plan B readiness.",
        "Continue: IDF maintains high defensive posture on northern and maritime fronts."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Daily transits remain at ~30 ships, roughly 25% of normal levels.",
        "Change: Iran exploring a shipping payment framework with Oman to formalize control."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Major oil contracts fluctuate near $100/bbl with 30%+ premium.",
        "Change: Market pricing in '50-50' chance of ceasefire success."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump stays in DC for 'gov circumstances', fueling escalation fears.",
        "Continue: Khamenei maintains nuclear enrichment leverage for final negotiations."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US demand for total enrichment freeze vs Iran's demand for recognized regional role.",
      "US quick-resolution strategy vs Iran's war-of-attrition strategy."
    ],
    military: [
      "US precision strike capability vs Iranian asymmetric retaliation depth."
    ]
  },
  scoreTrend: [
    {
      date: "05-19",
      score: 74
    },
    {
      date: "05-20",
      score: 74
    },
    {
      date: "05-21",
      score: 76
    },
    {
      date: "05-22",
      score: 76
    },
    {
      date: "05-23",
      score: 76,
      active: true
    }
  ],
  keyChange: "US military 'Plan B' signals combined with intense diplomacy create a high-pressure climax; oil holds $100.",
  investmentSignal: "→ Maintain defensive positions in energy and safe-haven assets against potential diplomatic failure.",
  change: "none",
  prevRiskScore: 76,
  webSources: [
    {
      title: "hindustantimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEU2koudoshkYYIGHSeJx85Atdrk9OD7wUrWpuKhKh8O151_ASRT9nAXC-4JbSQzu1pGS_KoO0Vnlt3W72nll9vLEqAmSeU3BFPGStKGa8cbIHGNUu-VOnIryZompRkkYO42opslmnYWRgQAyNseOSX5OQODl-0pVE04R35MG2MoquYuNO09zi8OPV6eX0u28QAiLEuUONxLypF_5--VqmH3xifyiUoyfkY5W7fPP6Y0O0bRD9s58ID-zrDMsWtwnjm3qMouuIMnEyWnyMDil0UOFYIdp-jGKHhDu_TZGj9dp1KFRV7WH9CdQDIsxU4"
    },
    {
      title: "thehindu.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-J7YJp6FvQacy8XxuV0xIPoyd8b3W2WRhTJFoVWk_lhuoZzrehV8DItISFudvDbaieClmWx5SggP5Vp506va051DqObwFjoJmEoTbR6I8OblGZ08P3oUR_0PBbfoU0n6AF_fvxcIphLBlteKaJjH0AlTO1-bgaWBErkUMWmIBl4U5LwPSYpE3YEEUduJ0Cl-9XOYfsJVpx_JOkEyKOI8_x_3Up2uOMleh6NZfC0wKwsMEOMK2YglWDSQ8x7jUvEyhgkV5LkjIUUCQXLQo09vLF9Isz4w9exc="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUuRUTBT71zXHS5SCHoMXr6Cfuwfi1TN6J183q7EwO2FeyiIiXMAV5TB2JGE3GiqSsGUoLkrzWblpqwT8hlcEbtdBppNxU2mt1qb28Tup9Pm9Bwn81-n-XTYP9Sdk_kAtutWYE1Z7AnEo-1lA="
    },
    {
      title: "gulfnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdvjrp_rVPxoNAS5u9hWTxQTrEFuWQsg-H6hm3aeKguZKhKjw8wc22uHWIJNDXuCj2LYZzYEL5zzxx-XCLgLdCB1xqPYnnbWb2Nogbtp00KwEgTYWvrDoYb5NUIGc2OzwjylIFjtczZ-IALouTW2tnqM4iuP4XudwnfRc3j4E17j2bNxwsGKMN1M9HLJE4PTuppdAUxZRHOexL3NteJR3A1BMl"
    },
    {
      title: "aljazeera.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEYCtWtIiR_9c1SdSSlAPhkl8Kwq5Om0YIs2qBpL4BsUlr-urHFO5oO3G0kU3443JDSprVBTnBIjMTcLLZ1rNxldJSSdEZaZZCWDxY-Dw_Z2VLBM0xwNwiMpRbJ7e8Aa_EMPuL5E7Xf4ohj7KfEJRz4tq9AnsXELpo5hOxcN_Mn9R3YuQe4mxKYBVkxwDnWEsqkcPbDz2T-ua-EuRMO"
    },
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFX42mJApG4fUC_84iCBIoeqqU9AbrDKYIPH_M8C_k4FnkSNf0L_urq0pB2tyzyIepRujR0jEQcCj45ohf8BDoDzL270Pr4uyFIs9iJADtczgUbfzCgmPBMHNBsCSVTQO1NQVhsmDwRQqUsAv8DtyIXDZXCC8lxdp8l7grkJe29PNB6LQjJEbm35awm2VyLgVFBu8iOOosb"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUnfyer5IGrzL1pUlm42p0gFbtU_VeBWAhvpcNB_VRYHh3WUcTVORDId68VOHQoxRmk29beIJI12gyH_iIcM2CT6UbTzfiSJGE4pThI3sOKUMglLQEWCWevrwCtY0_CCz_vENdKw8K281ZF1fiZX7w1yniaQQ="
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbM51C2LSx2zvh2m3iArO1_QxTI-Cupkcqyyh8Tg9ijD1WDqHOI71EQLtgxRdaqzY9Ygx1-8IGJbrbqWunf1MoExcbFXLIp3fZaDTiDmHhh6UdPnGEwQUm2UMoZQbWAbeQg6lPBKn9GI7Itduh2xQeOw=="
    },
    {
      title: "macrotrends.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHph4idpMcjsKUO7EvrZFaHynqkFE1reXcZxym4iTYTF6ktYNDY-o2E1s2mCz1Rnh5XlcrxwTvcXzZBJM3LXky5ShxOpBuNa27Omi_dp4kFMhj_yMHK-h4eVqC5t2q_hqB8fgDOmmWC4kgXKpblyIyDPdkOLbqel2QksqZbwH1N9q0rrQaYAQ=="
    },
    {
      title: "barchart.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEyHDHpFGZT3FoyOPjStnH6AvugGlOD6Wyt-ktsFndMH0E-3AnKAh3-xeVeJRuZfATnOjO8GcJcOoXYYHrRc5o3f7bSGqyxdntap72lnZYkJPS878pZcyzgm5iw2NnWPoOhYL_jPIFJ8g=="
    },
    {
      title: "vantagemarkets.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGx0wA7BGjlJjU07tMy0ehZKycsA7cThbVBqiPHU1x2Js2LtjQHdAbE4ZHUAeb44ddwsetnCRtWmnCxGokdtuZsMQnmNAFXcwI34ocS8ALIkOXP56jxtV3lFAmqYxUcRHubK1FVabT_8yQ1C0YDV1losZxDA6pscChyouG8g4qt8EJAnyWUflkIpQ0xyapJiAit5AOOC8XrlFhSxvW5K1w="
    },
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHmeE9R0tFc2Q6IN4iBdoj0_9h2oBz5Xe1Q0P6CNnvUFSter-JNXPq3N3jRaTzrdy8Mz9jQhr_FucEUrAtm_zfBThE4JUl6p3mTkCQoug8w7sCY5hPeXS3i9KJH5TaUsAKMbEgy_Sr2s3Xfo1ImB4v9oS1p5qYPkpur3mwqzsUXyMxPZjiWtqQzqyDns-AOkEaeOFU6WVivHgyf4s5os-CemGLim38Mpw=="
    }
  ],
  webSearchQueries: [
    "US Iran conflict updates May 23 2026 Strait of Hormuz news",
    "Iran nuclear program sanctions news May 23 2026",
    "WTI Brent oil prices May 23 2026 trend range Reuters Bloomberg"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月23日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.73 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美军展示「Plan B」打击准备，与德黑兰密集外交斡旋形成极限施压局面，油价站稳$100关口。",
    bannerWarning: "→ 维持能源与避险资产防御性头寸，对冲地缘谈判破裂风险。",
    deescalationIntent: "美国要求伊朗彻底放弃核浓缩 vs 伊朗要求结束制裁并承認其海峡安全角色。",
    structuralRisk: "伊朗通过控制船只通行并强制收费实施事实上的一边倒管控，通行量极低。",
    contradictionNote: "美国要求伊朗彻底放弃核浓缩 vs 伊朗要求结束制裁并承認其海峡安全角色。；美方的精确空中打击威慑 vs 伊朗及代理人的地区性非对称反击能力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第84天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 23 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.73 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US military 'Plan B' signals combined with intense diplomacy create a high-pressure climax; oil holds $100.",
    bannerWarning: "→ Maintain defensive positions in energy and safe-haven assets against potential diplomatic failure.",
    deescalationIntent: "US demand for total enrichment freeze vs Iran's demand for recognized regional …",
    structuralRisk: "De facto Iranian control of transit with low volume and mandatory tolls.",
    contradictionNote: "US demand for total enrichment freeze vs Iran's demand for recognized regional role.; US precision strike capability vs Iranian asymmetric retaliation depth.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 84",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
