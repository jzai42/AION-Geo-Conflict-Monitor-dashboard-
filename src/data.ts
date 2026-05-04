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
  date: "2026-05-04",
  version: "v2.52",
  riskScore: 88,
  riskChange: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D65",
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
      value: "WTI $101.40–$104.22 · Brent $106.30–$111.12",
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
      description: "美军启动“自由计划”护航行动，伊朗警告将攻击进入海峡的任何美方武装。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "航道流量降至战前5%，水雷风险及伊朗快艇袭扰导致商业保险几近失效。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "原油价格因航道军事化风险飙升，WTI和Brent双双站上三位数大关。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "美军从防御性封锁转为攻势护航，直接军事部署规模显著扩大。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美伊双方互相拒绝对方的和平方案，对话窗口基本关闭。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军启动霍尔木兹护航“自由计划”",
      description: "中央司令部动用15,000名官兵和100多架战机，开始强行引导被困商船出海。",
      verification: "confirmed",
      timestamp: "2026-05-04 05:28",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "伊朗联合指挥部发布严厉警告",
      description: "阿里·阿卜杜拉希少将称，任何靠近海峡的美军舰只都将遭到“严厉回应”。",
      verification: "confirmed",
      timestamp: "2026-05-04 04:16",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "富查伊拉外海油轮中弹袭击",
      description: "一艘油轮在阿联酋附近海域被抛射物击中，UKMTO确认过去24小时发生三起相关事件。",
      verification: "confirmed",
      timestamp: "2026-05-04 09:49",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "升级顶点",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美伊海上兵力处于视距对抗状态，Project Freedom 直接挑战伊朗主权声索。",
      "商业航运已完全军事化，海峡不再具备普通民用通航属性。",
      "白宫试图通过政治手段绕过《战争权力法》，暗示长期对抗准备。"
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
        "变化：美军启动“自由计划”护航行动，伊朗警告将攻击进入海峡的任何美方武装。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：航道流量降至战前5%，水雷风险及伊朗快艇袭扰导致商业保险几近失效。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油价格因航道军事化风险飙升，WTI和Brent双双站上三位数大关。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军从防御性封锁转为攻势护航，直接军事部署规模显著扩大。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国行政当局强力推进护航与伊朗对领海水域绝对控制权的对立。",
      "德黑兰提出的14点和平计划被华盛顿指责为不包含核限制的“无效提案”。"
    ],
    military: [
      "美军护航舰队的航行自由权与伊朗反介入/区域拒止（A2/AD）部署的直接碰撞。"
    ]
  },
  keyChange: "美军介入模式从“离岸封锁”转为“抵近护航”，直接军事冲突概率升至最高点。",
  investmentSignal: "→ 增持能源大宗与对冲性风险资产，减持对能源价格敏感的航空与运输板块。",
  prevRiskScore: 84,
  scoreTrend: [
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88,
      active: true
    }
  ],
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQuu0tmCqShBPcWgUjxtkS2uMcNo9t5RCQzeQXXqVXa_Tc_bKDXMXInpAa85f8wKTk1HlsDFYrbqp9NoTHYnEcobiyKk_aVUwsQ6NVaNSk_Zm0ImbWjyjrRDFgqPbd1gpwr_yl8arqpfjQ7g=="
    },
    {
      title: "futunn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPpOjzt-14AXDENhXdqvf5HR49Ho4WTGUJxSgeRQE5lE6n4YW5gFTVpUYaUAR4HHyglrX2uome-i_gpwcktODYqHB6fC8WoOQNr4ngoYuHD5lMHRFI-kWke0Avl6g7rs_PYljVbhordUPyIZST2rjRSRuVJW4j2ctZWOg7H7CShh6TgHhq8zEL6EpCIOVVxcVGVBGxs29bg-TdgkUf9qiyVQ=="
    },
    {
      title: "independent.co.uk",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhgTal9h9bVR8zCa1CHOsdg-QT_mtsnWjwY9LeXXqd6CXlMQ3SiiKTHgAHQbD9TdUQ9Zlye3c_e5tyW9vLpqAd6tyvBdEEmlzwSLoRXYBBZN27Egpsv-MUS53C6XI9BuPByemXcgvm_ekT4wFpRBveGTyvIeRkyZ4i-Lk3aPmooQJKBfG8w5NmueTSTEqvKHXMRrygmR7XnbfBDdW6Eo0kb6wCe_Gw-WwKUvuNeh9sbpWM"
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH06GNv_kiGAlSNWn3vY3ut0IFoJmgnT2ImHaLLT3v7bkdsiRemjOdhZXkk9oLkPYnI7h6d7OTvIChVsMsswbdTQ_umnz41LrFok8YJ8sc8t-t6N4Mre56bBNON6QL2miZA-n5cQKaUCOSjy6dF_uJPu-DtOjdesUkK2HaHDZCUm9BsOfGeMKo="
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMv1RLDOrnUJrlF4f5oDIgJsS39t1kBzIs1kzUU6s8mDXEZhzIiB8iPPsx3k2lCXhFybebCPQNlZ9Y_HbELF-1seyKGHN61KZxZk6k_n39C1mXP8IGgTtHDhpRAExbq7ph_EhiPnqFxMdH33FHL_jkZRujYRMV1bhc2Lbb4Jgm881vA_pfSn9u_YDtU7tU36WOcCTRR1Ff3xk48yGVctsjlgMX"
    },
    {
      title: "splash247.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEipyo44RhYcP20V0vkpA_t7vrmMZ0HRB1Sik0uw1GgAx-bq7j2SkO7XI6fR9EyGrTwKFORQKubM-87DHbbTnmqEvfYwMwY_hQj_57mmg-2gqhcFeebhAIjsxh62YZMt1YgWvI-MiSWKwwbsKZL6xMmCBC8gRSp0Z5vtH3DvpiBmdbKP91NmUPIMuE="
    },
    {
      title: "krdo.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGs8mfrAkxO0NushpTSvTbMtlVKPO_UwmE7Wo_l9bPOTFAAWnFT5i13ZkEi28U1X5HVXzzTmFrkFSCdmeO7_yVblUv2iS_64iUKQvOopwy-Eb9ShZ_r9CsZVKi0ytMeorzmIU8jjSGxLfC3CsMXy4gXPDyX3ZokpLoybbgDQ2-emu8yIyOqM6uH1CxYYdF4IEY-DfCL2GJEUCBuITPdB6mzakhsC8ZyqACwPmfl"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range May 4 2026 trend news",
    "Iran Foreign Ministry statement US relations May 4 2026",
    "US Iran military conflict news May 4 2026 DoD statement",
    "Hormuz Strait shipping traffic status May 4 2026 Lloyd's List"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-04",
  version: "v2.52",
  riskScore: 88,
  riskChange: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D65",
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
      value: "WTI $101.40–$104.22 · Brent $106.30–$111.12",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Traffic Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US launches Project Freedom; Iran warns of direct strikes on US assets entering the strait.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Traffic down to 5% of pre-war levels; mine threats and IRGC control make commercial transit impossible.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Crude prices surge as market reprices total blockade risks due to naval escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 3,
      weight: 0.2,
      description: "US shifts from diplomatic pressure to direct military escorting and large-scale deployment.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Negotiation channels through Pakistan are active but both sides maintain irreconcilable demands.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Launches Project Freedom",
      description: "CENTCOM forces begin escorting commercial vessels through Hormuz under Trump's directive.",
      verification: "confirmed",
      timestamp: "2026-05-04 05:28",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Iran Warns Attacks on US Navy",
      description: "Unified Command says foreign forces will be attacked if they enter Iranian-controlled waters.",
      verification: "confirmed",
      timestamp: "2026-05-04 04:16",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Tanker Struck Near Fujairah",
      description: "Vessel reported being hit by projectiles north of Fujairah; 3 UKMTO incidents in 24 hours.",
      verification: "confirmed",
      timestamp: "2026-05-04 09:49",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Escalation Peak",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Naval forces are in visual range of confrontation; Project Freedom directly challenges IRGC blockade.",
      "Commercial shipping has been fully militarized; the strait is no longer functional for civil transit.",
      "The White House is politically maneuvering around the War Powers Act to sustain operations."
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
        "Change: US launches Project Freedom; Iran warns of direct strikes on US assets entering the strait."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Traffic down to 5% of pre-war levels; mine threats and IRGC control make commercial transit impossible."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices surge as market reprices total blockade risks due to naval escalation."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: US shifts from diplomatic pressure to direct military escorting and large-scale deployment."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "The clash between US Freedom of Navigation operations and Iran's territorial water claims.",
      "Diplomatic impasse over nuclear vs. maritime security issues in the 14-point peace plan."
    ],
    military: [
      "Direct collision course between US escort task forces and Iran's A2/AD coastal defenses."
    ]
  },
  keyChange: "Military engagement shifted from passive blockade to active escorting, increasing conflict probability.",
  investmentSignal: "→ Overweight Energy and Defensive assets; Hedge against high volatility in commodity markets.",
  prevRiskScore: 84,
  scoreTrend: [
    {
      date: "04-30",
      score: 80
    },
    {
      date: "05-01",
      score: 80
    },
    {
      date: "05-02",
      score: 80
    },
    {
      date: "05-03",
      score: 84
    },
    {
      date: "05-04",
      score: 88,
      active: true
    }
  ],
  webSources: [
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQuu0tmCqShBPcWgUjxtkS2uMcNo9t5RCQzeQXXqVXa_Tc_bKDXMXInpAa85f8wKTk1HlsDFYrbqp9NoTHYnEcobiyKk_aVUwsQ6NVaNSk_Zm0ImbWjyjrRDFgqPbd1gpwr_yl8arqpfjQ7g=="
    },
    {
      title: "futunn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPpOjzt-14AXDENhXdqvf5HR49Ho4WTGUJxSgeRQE5lE6n4YW5gFTVpUYaUAR4HHyglrX2uome-i_gpwcktODYqHB6fC8WoOQNr4ngoYuHD5lMHRFI-kWke0Avl6g7rs_PYljVbhordUPyIZST2rjRSRuVJW4j2ctZWOg7H7CShh6TgHhq8zEL6EpCIOVVxcVGVBGxs29bg-TdgkUf9qiyVQ=="
    },
    {
      title: "independent.co.uk",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhgTal9h9bVR8zCa1CHOsdg-QT_mtsnWjwY9LeXXqd6CXlMQ3SiiKTHgAHQbD9TdUQ9Zlye3c_e5tyW9vLpqAd6tyvBdEEmlzwSLoRXYBBZN27Egpsv-MUS53C6XI9BuPByemXcgvm_ekT4wFpRBveGTyvIeRkyZ4i-Lk3aPmooQJKBfG8w5NmueTSTEqvKHXMRrygmR7XnbfBDdW6Eo0kb6wCe_Gw-WwKUvuNeh9sbpWM"
    },
    {
      title: "washingtonpost.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH06GNv_kiGAlSNWn3vY3ut0IFoJmgnT2ImHaLLT3v7bkdsiRemjOdhZXkk9oLkPYnI7h6d7OTvIChVsMsswbdTQ_umnz41LrFok8YJ8sc8t-t6N4Mre56bBNON6QL2miZA-n5cQKaUCOSjy6dF_uJPu-DtOjdesUkK2HaHDZCUm9BsOfGeMKo="
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMv1RLDOrnUJrlF4f5oDIgJsS39t1kBzIs1kzUU6s8mDXEZhzIiB8iPPsx3k2lCXhFybebCPQNlZ9Y_HbELF-1seyKGHN61KZxZk6k_n39C1mXP8IGgTtHDhpRAExbq7ph_EhiPnqFxMdH33FHL_jkZRujYRMV1bhc2Lbb4Jgm881vA_pfSn9u_YDtU7tU36WOcCTRR1Ff3xk48yGVctsjlgMX"
    },
    {
      title: "splash247.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEipyo44RhYcP20V0vkpA_t7vrmMZ0HRB1Sik0uw1GgAx-bq7j2SkO7XI6fR9EyGrTwKFORQKubM-87DHbbTnmqEvfYwMwY_hQj_57mmg-2gqhcFeebhAIjsxh62YZMt1YgWvI-MiSWKwwbsKZL6xMmCBC8gRSp0Z5vtH3DvpiBmdbKP91NmUPIMuE="
    },
    {
      title: "krdo.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGs8mfrAkxO0NushpTSvTbMtlVKPO_UwmE7Wo_l9bPOTFAAWnFT5i13ZkEi28U1X5HVXzzTmFrkFSCdmeO7_yVblUv2iS_64iUKQvOopwy-Eb9ShZ_r9CsZVKi0ytMeorzmIU8jjSGxLfC3CsMXy4gXPDyX3ZokpLoybbgDQ2-emu8yIyOqM6uH1CxYYdF4IEY-DfCL2GJEUCBuITPdB6mzakhsC8ZyqACwPmfl"
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range May 4 2026 trend news",
    "Iran Foreign Ministry statement US relations May 4 2026",
    "US Iran military conflict news May 4 2026 DoD statement",
    "Hormuz Strait shipping traffic status May 4 2026 Lloyd's List"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.52 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 88（↑4）：美军介入模式从“离岸封锁”转为“抵近护航”，直接军事冲突概率升至最高点。",
    bannerWarning: "→ 增持能源大宗与对冲性风险资产，减持对能源价格敏感的航空与运输板块。",
    deescalationIntent: "美国行政当局强力推进护航与伊朗对领海水域绝对控制权的对立。",
    structuralRisk: "航道流量降至战前5%，水雷风险及伊朗快艇袭扰导致商业保险几近失效。",
    contradictionNote: "美国行政当局强力推进护航与伊朗对领海水域绝对控制权的对立。；美军护航舰队的航行自由权与伊朗反介入/区域拒止（A2/AD）部署的直接碰撞。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第65天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.52 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 88 (↑4): Military engagement shifted from passive blockade to active escorting, increasing conflict probability.",
    bannerWarning: "→ Overweight Energy and Defensive assets; Hedge against high volatility in commodity markets.",
    deescalationIntent: "The clash between US Freedom of Navigation operations and Iran's territorial wa…",
    structuralRisk: "Traffic down to 5% of pre-war levels; mine threats and IRGC control make commercial transit impossi…",
    contradictionNote: "The clash between US Freedom of Navigation operations and Iran's territorial water claims.; Direct collision course between US escort task forces and Iran's A2…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 65",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
