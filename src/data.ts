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
  date: "2026-06-27",
  version: "v2.108",
  riskScore: 56,
  scoreTrend: [
    {
      date: "06-23",
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D119",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑16",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $69.53–$71.20 · Brent $72.95–$74.30",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "局部受阻",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "美伊直接军事交火打破停火僵局。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "安全走廊因商船遇袭而关闭。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "国际油价在军事冲突中意外大幅回落。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "美国从外交主导转回武力执法模式。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "6月17日签署的MoU遭遇最严重合规危机。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美军空袭伊朗本土基地",
      description: "美军中央司令部对伊朗境内多处导弹与无人机仓库实施精准打击。",
      verification: "confirmed",
      timestamp: "2026-06-26",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC报复性反击",
      description: "伊朗革命卫队宣布对该地区美军设施进行对等反击。",
      verification: "confirmed",
      timestamp: "2026-06-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Ever Lovely商船遇袭",
      description: "一艘新加坡籍集装箱船在海峡附近遭遇攻击，导致国际疏散行动中断。",
      verification: "confirmed",
      timestamp: "2026-06-25",
      significance: ""
    }
  ],
  warPhase: {
    level: "受控冲突",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "停火协议框架虽然存在，但实际履行已破裂。",
      "海峡通航权成为武力争夺的核心筹码。",
      "区域冲突与以黎和平谈判出现联动脱钩迹象。"
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
        "变化：美军中央司令部执行了针对伊朗西里克（Sirik）港口附近目标的报复性空袭。",
        "变化：伊朗海军在格什姆岛（Qeshm）附近部署新型反舰力量应对美军突袭。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：联合国IMO确认暂停海员疏散计划，导致8500多名船员仍被困波斯湾内。",
        "延续：伊朗继续利用非官方渠道对非授信航线船舶进行驱逐警告。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：尽管战火重燃，油价因供应担忧降级意外跌穿$75关口。",
        "变化：美国财政部 General License X 许可的执行进度因军事行动受到法律审查质疑。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普总统公开将伊朗的打击称为「愚蠢的违约行为」，态度转趋强硬。",
        "变化：伊朗谈判代表表示除非美国停止干涉其内政，否则将重启海峡收费计划。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方需要通过军事展示来维持MoU的威慑力。",
      "伊朗强硬派试图通过干扰航道来对抗特朗普的外交孤立策略。"
    ],
    military: [
      "海峡通航权与沿岸主权防空区的灰色地带冲突。",
      "有限惩戒打击与全面冲突螺旋之间的微妙平衡。"
    ]
  },
  investmentSignal: "→ 增加避险资产防御性配置，减少对海运逻辑的单边多头博弈。",
  keyChange: "美伊停火谅解备忘录（MoU）在暴力交火中实质性失效。",
  change: "up",
  prevRiskScore: 40,
  webSources: [
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9Jmg6j6XQkJg-TPbsutgUYO6zx_2blnSbkyZeo0rSTlmpM4xzyz39216JKyUniZYwrAsGj3bYv_7b7Y-Uh3oVvR02mdwTJdTXd20pfmtbeEahlbwKR0znfxZbOtnL-9kA3Vil8wmylCUdcdn3cjt7Ry26z4_rh2VzuQZrEzrz3AsppXSMLsumje7IRcXPNqHdg5Fx"
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEISpmsgERV8aYTHTq4r3VbK5FZNQWTAecRE-WsUogF0AzmyEmBou4w9zX2BqQl476hq70qs4xDdO_LCqOBvQygJbXkPzUIlk6Xxv0QOYBrVRS-OkVA23VucCNazPHXhw9edhJgxG_26EquypnrfyKi8qaKFgQhyKwqVhqt9u3n1WtGbOSXl1chyVMbti5xN5Ny9RGvWGKVCBnKCcBPDWeakqnmnZWVZvwbXZCk_mczaSWwRovHliI="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGB6YSl6QzrbxZMV1lurglwOBYJp78mr0vwFQzyW_1KSLrOkEPpxJZZHa31aWNW2ZyNyyG8xcEYLa4NFQfVuuhJkyWQhljxGGh33PixgPymEDiWSvauc0M="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_O-cyUXpJaMtpyGEuXCemNweFlVlFLGUMDIBQCOO1waOSVnBuXv5UFVCti51B1hTwjzEtSvLdCT07s_8BZwkFzbLFsVETdipOPehXMSJdB3SLim7CxYpA6AZikyTKD7gtekL61xjT3XJygH2muJaRrTzAEwZ7np25i6BVt7y_V4AuRMw="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range June 27 2024 2026 trend",
    "US Iran conflict news June 27 2024 2026 carrier rotation",
    "Hormuz shipping update June 27 2024 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-06-27",
  version: "v2.108",
  riskScore: 56,
  scoreTrend: [
    {
      date: "06-23",
      score: 40
    },
    {
      date: "06-24",
      score: 40
    },
    {
      date: "06-25",
      score: 40
    },
    {
      date: "06-26",
      score: 40
    },
    {
      date: "06-27",
      score: 56,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D119",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑16",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $69.53–$71.20 · Brent $72.95–$74.30",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Partial Obstruction",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Direct US-Iran exchange breaches the standoff.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "Safe corridor suspended following ship attack.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "Prices dropped below $75 despite tactical escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 2,
      weight: 0.2,
      description: "US shifts from diplomacy to active kinetic deterrence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2.5,
      prev: 2,
      weight: 0.2,
      description: "June MoU under extreme compliance stress.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US Strikes Iranian Mainlands",
      description: "CENTCOM targeted missile storage sites in response to commercial shipping attacks.",
      verification: "confirmed",
      timestamp: "2026-06-26",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "IRGC Counter-Strikes",
      description: "Iranian forces fired at US military positions in the region.",
      verification: "confirmed",
      timestamp: "2026-06-27",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "UN Evacuation Paused",
      description: "IMO suspended the rescue of 2,500 mariners due to rising risks in the Strait.",
      verification: "confirmed",
      timestamp: "2026-06-26",
      significance: ""
    }
  ],
  warPhase: {
    level: "Controlled Conflict",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "MoU framework technically exists but is actively violated.",
      "Freedom of navigation has become a point of kinetic contest.",
      "Regional conflicts are decoupling from diplomatic timelines."
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
        "Change: US CENTCOM conducted retaliatory strikes on Iranian coastal radar and drone sites.",
        "Change: IRGC Navy deployed new assets near Qeshm Island following US raids."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UN maritime agency frozen rescue operations; 115 vessels remain stranded.",
        "Continue: Iran continues using 'unauthorized route' pretexts to harasse transit."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude prices unexpectedly crashed below $75 as supply panic receded.",
        "Change: General License X for Iranian oil faces legal scrutiny amid conflict escalation."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump labeled the Iranian strike a 'foolish violation' of the ceasefire.",
        "Change: VP JD Vance emphasized that 'violence will be met with violence'."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Need for US to enforce the MoU kinetically without triggering full war.",
      "Iranian hardliners' attempt to sabotage US-led regional realignments."
    ],
    military: [
      "Clash between maritime transit rights and Iranian sovereignty claims.",
      "The thin line between punitive strikes and the escalation ladder."
    ]
  },
  investmentSignal: "→ Maintain defensive positioning in gold and hedge against volatile commodities.",
  keyChange: "US-Iran Memorandum of Understanding (MoU) effectively breached by kinetic exchange.",
  change: "up",
  prevRiskScore: 40,
  webSources: [
    {
      title: "abs-cbn.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9Jmg6j6XQkJg-TPbsutgUYO6zx_2blnSbkyZeo0rSTlmpM4xzyz39216JKyUniZYwrAsGj3bYv_7b7Y-Uh3oVvR02mdwTJdTXd20pfmtbeEahlbwKR0znfxZbOtnL-9kA3Vil8wmylCUdcdn3cjt7Ry26z4_rh2VzuQZrEzrz3AsppXSMLsumje7IRcXPNqHdg5Fx"
    },
    {
      title: "alarabiya.net",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEISpmsgERV8aYTHTq4r3VbK5FZNQWTAecRE-WsUogF0AzmyEmBou4w9zX2BqQl476hq70qs4xDdO_LCqOBvQygJbXkPzUIlk6Xxv0QOYBrVRS-OkVA23VucCNazPHXhw9edhJgxG_26EquypnrfyKi8qaKFgQhyKwqVhqt9u3n1WtGbOSXl1chyVMbti5xN5Ny9RGvWGKVCBnKCcBPDWeakqnmnZWVZvwbXZCk_mczaSWwRovHliI="
    },
    {
      title: "eia.gov",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGB6YSl6QzrbxZMV1lurglwOBYJp78mr0vwFQzyW_1KSLrOkEPpxJZZHa31aWNW2ZyNyyG8xcEYLa4NFQfVuuhJkyWQhljxGGh33PixgPymEDiWSvauc0M="
    },
    {
      title: "unitedagainstnucleariran.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_O-cyUXpJaMtpyGEuXCemNweFlVlFLGUMDIBQCOO1waOSVnBuXv5UFVCti51B1hTwjzEtSvLdCT07s_8BZwkFzbLFsVETdipOPehXMSJdB3SLim7CxYpA6AZikyTKD7gtekL61xjT3XJygH2muJaRrTzAEwZ7np25i6BVt7y_V4AuRMw="
    }
  ],
  webSearchQueries: [
    "WTI Brent crude oil price range June 27 2024 2026 trend",
    "US Iran conflict news June 27 2024 2026 carrier rotation",
    "Hormuz shipping update June 27 2024 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "6月27日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.108 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 56（↑16）：美伊停火谅解备忘录（MoU）在暴力交火中实质性失效。",
    bannerWarning: "→ 增加避险资产防御性配置，减少对海运逻辑的单边多头博弈。",
    deescalationIntent: "美方需要通过军事展示来维持MoU的威慑力。",
    structuralRisk: "安全走廊因商船遇袭而关闭。",
    contradictionNote: "美方需要通过军事展示来维持MoU的威慑力。；海峡通航权与沿岸主权防空区的灰色地带冲突。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第119天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jun 27 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.108 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 56 (↑16): US-Iran Memorandum of Understanding (MoU) effectively breached by kinetic exchange.",
    bannerWarning: "→ Maintain defensive positioning in gold and hedge against volatile commodities.",
    deescalationIntent: "Need for US to enforce the MoU kinetically without triggering full war.",
    structuralRisk: "Safe corridor suspended following ship attack.",
    contradictionNote: "Need for US to enforce the MoU kinetically without triggering full war.; Clash between maritime transit rights and Iranian sovereignty claims.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 119",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
