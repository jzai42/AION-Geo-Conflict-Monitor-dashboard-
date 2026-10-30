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
  date: "2026-10-30",
  version: "v2.238",
  riskScore: 82,
  change: "none",
  keyChange: "霍尔木兹海峡商业油轮遭遇爆炸艇袭击，叠加伊朗驳回停火方案，推动；综合风险分落盘 82（较昨日 持平（+0））",
  investmentSignal: "→ 维持大宗商品与能源风险溢价对冲仓位，规避脆弱海运敞口并维持宏观风险资产防御姿态。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D244",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.07",
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
      description: "美军指挥部递交对伊打击新方案，外围代理人远程弹道导弹互射维持活跃态势。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "海峡出境水域油轮再遭无人爆炸艇撞击受损，过境通航环境面临严重直接打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "主力原油期价稳居百美元上方危机带，航道袭击刺激近月风险溢价进一步走阔。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军维持前沿海空战斗群多层警戒，并向区域盟友提供全面战场情报感知支持。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "美方信函接触与斡旋草案遭到德黑兰强硬拒绝，双边缺乏可执行的互信减压路径。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军向白宫提报中期选举后对伊行动备选清单，前沿威慑部署显著收紧。",
        "延续：也门胡塞武装继续针对红海与波斯湾周边战略纵深发动远程导弹打击。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：UKMTO证实一艘商用油轮在霍尔木兹海峡遭爆炸艇袭击受损，航道安全风险激化。",
        "延续：商业航运过境严重依赖军舰伴航，国际油轮保险与运费附加费高企。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：WTI与Brent原油价格稳居100至115美元危机带，跨月近月结构保持强升水。",
        "变化：跨国石油巨头因波斯湾安全顾虑取消区域高管差旅，显示供应链防御情绪强化。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：德黑兰明确否决卡塔尔新转交的和平协议草案，称其未反映伊方安全诉求。",
        "延续：华盛顿释放选举后军事行动自由度威慑信号，双方公开立场均无妥协空间。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方均将中东安全态势与国内政治窗口绑定，缺乏能够承担妥协政治成本的决策空间。",
      "调解方提出的框架无法弥补双方在制裁解除与核能力/地区代理人约束上的核心分歧。"
    ],
    military: [
      "非对称海上袭击与无人艇破坏成本极低，美军防御拦截成本高昂且无法实现零漏洞。",
      "伊朗区域反击手段由代理人纵深发起，导致冲突呈现多点扩散且难以通过单一停火协议阻断。"
    ]
  },
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "海上封锁与关键航道非对称袭扰成为核心博弈形态，商业航运通航受到持续制约。",
      "外交谈判渠道严重停滞，双方战术对抗与战略备战活动逐步向下一阶段冲突节点累积。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  scoreTrend: [
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡商用油轮遭遇爆炸艇袭击",
      description: "英国海上贸易行动办公室（UKMTO）与路透社报道，一艘油轮在穿越霍尔木兹海峡出境水域时遭装载炸药的遥控小艇撞击受损，航道安全恐慌加剧。",
      verification: "confirmed",
      timestamp: "2026-10-30 06:17 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军指挥部向总统呈报对伊军事打击选项",
      description: "华尔街日报与彭博社披露美军高级将领已向总统特朗普汇报关于中期选举后对伊纵深设施恢复精确打击的行动预案。",
      verification: "confirmed",
      timestamp: "2026-10-29 21:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗最高国安会驳回卡塔尔和平协议草案",
      description: "半岛电视台与路透社报道，伊朗官方正式拒绝卡塔尔转交的最新战争缓和草案，坚称该文本未触及实质利益，拒绝单方面停火。",
      verification: "confirmed",
      timestamp: "2026-10-30 08:45 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "沙特联军成功拦截胡塞武装远程导弹攻势",
      description: "沙特官方通讯社与美联社报道，沙特联军防空部队在东部空域击落胡塞武装发射的弹道导弹，关键能源生产与炼油资产未受结构性损坏。",
      verification: "confirmed",
      timestamp: "2026-10-29 18:00 UTC",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "跨国石油巨头因安全顾虑取消波斯湾出访",
      description: "路透社与金融时报引述知情人士证实，埃克森美孚与雪佛龙高管出于波斯湾局势风险已全面取消赴阿联酋阿布扎比能源展会的差旅计划。",
      verification: "confirmed",
      timestamp: "2026-10-30 04:00 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-30",
  version: "v2.238",
  riskScore: 82,
  change: "none",
  keyChange: "A tanker attack in the Strait of Hormuz paired with Tehran rejecting peace proposals locks the composite risk score at a sticky 82.",
  investmentSignal: "→ Maintain risk-premium hedges in upstream energy and commodities while holding defensive positioning on risk assets.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D244",
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
      value: "WTI $102.43–$104.99 · Brent $111.05–$114.07",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Disrupted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "U.S. military brass preps post-election strike options as regional missile exchanges remain active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial vessel struck by an explosive-laden craft, keeping maritime transit under critical direct threats.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Crude benchmarks hold firmly in the $100–120 crisis band, with fresh shipping risks supporting backwardation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "U.S. forces maintain multi-carrier task force readiness and deep tactical intelligence sharing with regional partners.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Diplomatic letters and Qatari mediation drafts dismissed by Tehran, leaving talks paralyzed.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: U.S. defense officials presented refined options to the White House for post-election strikes against Iranian targets.",
        "Continue: Houthi forces continue firing ballistic and cruise missiles toward Gulf infrastructure."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: UKMTO confirmed an outbound commercial tanker was struck by an explosive-rigged craft near the Strait.",
        "Continue: Commercial shipping remains strictly confined to convoy-supported passages under elevated freight and insurance surcharges."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: WTI and Brent trade solidly in the $100–$115 crisis zone, sustaining steep prompt-month premiums.",
        "Change: Western energy majors pulled executive attendance from regional industry summits over escalating security concerns."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran publicly rejected Qatari draft proposals, citing lack of binding commitments on U.S. sanctions relief.",
        "Continue: Washington signals potential resumption of direct kinetic pressure following upcoming domestic electoral milestones."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Both Washington and Tehran have tied diplomatic posture to domestic political milestones, precluding concessions.",
      "External mediation proposals fail to bridge fundamental divides over sanctions relief and regional security architectures."
    ],
    military: [
      "Asymmetric maritime attacks and drone boats impose asymmetric interception costs on naval escort coalitions.",
      "Iran-aligned regional networks operate across multiple geographically dispersed axes, resisting single-point deterrence."
    ]
  },
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Maritime disruption and chokepoint interdiction remain the dominant mode of conflict exertion.",
      "Diplomatic channels are stalled as both sides position tactical and military resources for post-election scenarios."
    ],
    note: "For monitoring only; not investment advice."
  },
  scoreTrend: [
    {
      date: "10-26",
      score: 82
    },
    {
      date: "10-27",
      score: 82
    },
    {
      date: "10-28",
      score: 82
    },
    {
      date: "10-29",
      score: 82
    },
    {
      date: "10-30",
      score: 82,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Tanker Damaged by Explosive Craft in Strait of Hormuz",
      description: "UKMTO and Reuters reported an outbound commercial tanker was struck and damaged by an unmanned explosive-rigged boat in the Strait of Hormuz.",
      verification: "confirmed",
      timestamp: "2026-10-30 06:17 UTC",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "U.S. Command Briefs President on Iran Strike Options",
      description: "The Wall Street Journal and Bloomberg reported top military commanders presented options for renewed precision airstrikes following the midterm elections.",
      verification: "confirmed",
      timestamp: "2026-10-29 21:30 UTC",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Tehran Dismisses Qatari Ceasefire Draft",
      description: "Al Jazeera and Reuters reported senior Iranian officials formally rejected a newly submitted Qatari mediation draft as unacceptable.",
      verification: "confirmed",
      timestamp: "2026-10-30 08:45 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Saudi Coalition Intercepts Ballistic Missiles Over Eastern Province",
      description: "SPA and AP reported Saudi air defense batteries intercepted Houthi ballistic missiles, preventing damage to key oil and processing facilities.",
      verification: "confirmed",
      timestamp: "2026-10-29 18:00 UTC",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "U.S. Energy Majors Cancel Middle East Summit Travel",
      description: "Reuters and the Financial Times confirmed ExxonMobil and Chevron canceled executive delegations to a major UAE energy conference over heightened regional security risks.",
      verification: "confirmed",
      timestamp: "2026-10-30 04:00 UTC",
      significance: ""
    }
  ],
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月30日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.238 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：霍尔木兹海峡商业油轮遭遇爆炸艇袭击，叠加伊朗驳回停火方案，推动；综合风险分落盘 82（较昨日 持平（+0））",
    bannerWarning: "→ 维持大宗商品与能源风险溢价对冲仓位，规避脆弱海运敞口并维持宏观风险资产防御姿态。",
    deescalationIntent: "美伊双方均将中东安全态势与国内政治窗口绑定，缺乏能够承担妥协政治成本的决策空间。",
    structuralRisk: "海峡出境水域油轮再遭无人爆炸艇撞击受损，过境通航环境面临严重直接打击。",
    contradictionNote: "美伊双方均将中东安全态势与国内政治窗口绑定，缺乏能够承担妥协政治成本的决策空间。；非对称海上袭击与无人艇破坏成本极低，美军防御拦截成本高昂且无法实现零漏洞。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第244天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 30 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.238 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): A tanker attack in the Strait of Hormuz paired with Tehran rejecting peace proposals locks the composite risk score at a sticky 82.",
    bannerWarning: "→ Maintain risk-premium hedges in upstream energy and commodities while holding defensive positioning on risk assets.",
    deescalationIntent: "Both Washington and Tehran have tied diplomatic posture to domestic political m…",
    structuralRisk: "Commercial vessel struck by an explosive-laden craft, keeping maritime transit under critical direc…",
    contradictionNote: "Both Washington and Tehran have tied diplomatic posture to domestic political milestones, precluding concessions.; Asymmetric maritime attacks and drone boats …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 244",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
