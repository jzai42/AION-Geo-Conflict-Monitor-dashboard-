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
  date: "2026-09-20",
  version: "v2.198",
  keyStats: [
    {
      label: "冲突天数",
      value: "D204",
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
      value: "WTI $94.83–$98.01 · Brent $97.81–$100.14",
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
  riskScore: 76,
  keyChange: "美军通报南部走廊护航破10亿桶但伊朗重申封锁条件，沙特抢修管道遏制油价破百但地缘僵局未改",
  change: "none",
  investmentSignal: "→ 维持能源资产防御性配置与大宗商品风险敞口对冲，规避中东供应链脆弱环节资产。",
  scoreTrend: [
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "美军统帅部提前回防筹划战略决断，胡塞武装弹道导弹突袭沙特腹地机场与延布油库，战区对抗维持全面交火状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军强化护航通道勉强恢复部分运力，但伊朗议长宣称美方履约前维持实质封锁，商业班轮常态通行依然阻断。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "沙特东西输油管抢修与离岸转运舒缓极端断供恐慌，油价主体运行在$94–$100偏强区间，符合显著偏强档位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持波斯湾实战护航与导弹防御，主要大国在联合国大会前夕密集施加外交斡旋与多边博弈。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "德黑兰开出严苛复航条件，华盛顿公开宣称酝酿进一步军事选项，双方立场高度对立导致和谈停滞风险显著。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军中央司令部开辟海峡南部走廊推进强行护航，伊朗则以精准攻击与政治条件维持封锁压力",
      "也门胡塞武装对沙特内陆油运节点发动纵深袭击，加剧了地区能源安全脆弱性",
      "沙特积极修复替代管线与开展离岸中转，一定程度上对冲了极端短缺恐慌"
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
        "变化：特朗普突返白宫召集安全团队商讨对伊重大军事决断，也门胡塞武装对利雅得和延布发射弹道导弹。",
        "延续：红海至霍尔木兹一线联军防空反导与伊朗巡逻艇、无人机保持高频接触。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：美军通报两个月内护航10亿桶原油创阶段峰值，但伊朗官方严正声明未达协议前海峡绝不完全开放。",
        "延续：国际主流航运企业与大型保赔协会依然将该海域列为高风险战区并大幅加征战险保费。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：沙特阿美启动东西管道半数运力复流工作并增设外海船对船交割，阻遏油价升穿百元大关。",
        "延续：全球原油现货与纸货市场维持中东高地缘溢价定价模式。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗议长加利巴夫公开对美开列海峡复航硬性履约清单，美方高层展现不排除强硬升级姿态。",
        "延续：瑞士与区域斡旋方持续传递接触信件，但官方公开表态均未表现退让意愿。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求无条件保障国际水道航行自由与停止核/导弹扩张",
      "伊朗坚持以彻底解除经济封锁与外部军事力量撤离作为开放海峡的前置条件"
    ],
    military: [
      "美军依赖海军远洋护航与防空走廊强行维持盟友能源外运",
      "伊朗依托岸基反舰导弹、水雷战术及也门胡塞武装的多轴向打击能力实施反封锁制衡"
    ]
  },
  events: [
    {
      id: "ev-20260920-01",
      title: "美军通报护航原油超10亿桶，伊朗坚称海峡维持封锁",
      description: "美军中央司令部司令布拉德·库珀称过去两月护航超2000艘商船出湾，而伊朗议长加利巴夫表态称在美方完全履约前海峡不可能恢复正常通行。",
      verification: "confirmed",
      timestamp: "2026-09-20T08:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "ev-20260920-02",
      title: "特朗普提前返回白宫，权衡对伊战略决断",
      description: "美总统特朗普缩短戴维营行程返抵白宫，此前表示正在对伊行动进入关键十字路口，即将与海湾盟国首脑举行多边会晤。",
      verification: "confirmed",
      timestamp: "2026-09-20T06:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20260920-03",
      title: "胡塞武装突袭沙特利雅得与延布石油设施",
      description: "也门胡塞武装向利雅得机场油库及红海港口延布发动弹道导弹袭击，沙特防空部队报告成功实施拦截，战火波及能源动脉。",
      verification: "confirmed",
      timestamp: "2026-09-20T03:40:00Z",
      significance: ""
    },
    {
      id: "ev-20260920-04",
      title: "沙特阿美修复东西管道，遏制原油极端短缺恐慌",
      description: "沙特推进东西输油管道部分恢复工程并增加霍尔木兹海峡外的船对船原油装运，两市基准油价企稳于95–100美元区间。",
      verification: "confirmed",
      timestamp: "2026-09-19T20:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-09-20",
  version: "v2.198",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D204",
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
      value: "WTI $94.83–$98.01 · Brent $97.81–$100.14",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely Restricted",
      unit: "Transit Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 76,
  keyChange: "US CENTCOM reports 1B barrels escorted via southern corridor while Iran reiterates blockade conditions; Saudi pipeline repair curbs oil spikes above $100.",
  change: "none",
  investmentSignal: "→ Maintain defensive allocations in energy and hedge commodities exposure against chokepoint supply disruption risks.",
  scoreTrend: [
    {
      date: "09-16",
      score: 82
    },
    {
      date: "09-17",
      score: 80
    },
    {
      date: "09-18",
      score: 76
    },
    {
      date: "09-19",
      score: 76
    },
    {
      date: "09-20",
      score: 76,
      active: true
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "US leadership evaluates strategic decisions while Houthi ballistic missiles targeted Riyadh airport and Yanbu oil facilities in deep strikes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US naval escort corridor facilitated partial flows, but Iran's chief negotiator declared the strait remains closed until US commitments are fulfilled.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Saudi East-West pipeline restoration and offshore transfers curbed panic, keeping WTI within $94.83–$98.01 and Brent within $97.81–$100.14.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US actively conducts naval escorts and defense support, while China engages in diplomatic outreach ahead of UN General Assembly meetings.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Tehran conveyed strict preconditions via mediators while Washington weighed further military action, indicating deadlocked diplomatic momentum.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "US CENTCOM maintains a southern convoy corridor while Iranian forces deploy asymmetric pressure and diplomatic preconditions",
      "Houthi missile attacks targeting Saudi infrastructure underline vulnerability in secondary regional energy supply chains",
      "Saudi pipeline repairs and offshore transfer mechanisms partially mitigate acute delivery shock fears"
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
        "Change: Trump returned to the White House to deliberate major military decisions as Houthis fired ballistic missiles toward Riyadh and Yanbu.",
        "Continue: Air defense alerts and naval standoff postures remain active across the Persian Gulf and Red Sea corridors."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: CENTCOM announced over 1 billion barrels escorted over two months, but Iran reaffirmed the waterway remains officially closed.",
        "Continue: Mainstream container lines and maritime insurers maintain war-risk exclusions and steep surcharge premiums."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Aramco accelerated repairs to restore half of the East-West pipeline capacity, checking crude prices below triple digits.",
        "Continue: Geopolitical risk premiums maintain persistent support for physical crude grades above historical baselines."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian Parliament Speaker Ghalibaf conveyed rigid preconditions for reopening Hormuz while US leadership signaled readiness for major decisions.",
        "Continue: Indirect diplomatic messages continue via regional intermediaries without direct mutual concessions."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US insistence on unconditional freedom of navigation and verified containment of regional proxy operations",
      "Iranian demands for complete removal of economic blockades and withdrawal of foreign naval forces before reopening maritime passages"
    ],
    military: [
      "US naval escort patrols and layered air defenses securing maritime corridors",
      "Iranian coastal missile batteries, naval mining capabilities, and regional proxy strikes imposing persistent asymmetric costs"
    ]
  },
  events: [
    {
      id: "ev-20260920-01",
      title: "US CENTCOM reports 1B barrels escorted; Iran says Hormuz stays shut",
      description: "US Central Command Chief Adm. Brad Cooper stated forces escorted over 2,000 commercial vessels, while Iranian chief negotiator Ghalibaf reiterated the strait will not open without US compliance.",
      verification: "confirmed",
      timestamp: "2026-09-20T08:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "ev-20260920-02",
      title: "Trump returns to White House to weigh decision on Iran escalation",
      description: "US President Donald Trump cut short his Camp David stay to deliberate potential actions on Iran ahead of scheduled meetings with Gulf leaders.",
      verification: "confirmed",
      timestamp: "2026-09-20T06:15:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "ev-20260920-03",
      title: "Houthis launch ballistic missile and drone strikes on Riyadh and Yanbu",
      description: "Yemen's Houthis targeted Riyadh airport fuel storage and Yanbu Aramco facilities, with Saudi forces confirming interception of a ballistic missile over Riyadh.",
      verification: "confirmed",
      timestamp: "2026-09-20T03:40:00Z",
      significance: ""
    },
    {
      id: "ev-20260920-04",
      title: "Saudi Aramco advances East-West pipeline restoration, easing crude spikes",
      description: "Saudi Arabia moves to restore 50% capacity on its crucial crude bypass pipeline and expands offshore STS transfers, stabilizing Brent near $98–$100.",
      verification: "confirmed",
      timestamp: "2026-09-19T20:00:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 76,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "9月20日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.198 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 76（持平）：美军通报南部走廊护航破10亿桶但伊朗重申封锁条件，沙特抢修管道遏制油价破百但地缘僵局未改",
    bannerWarning: "→ 维持能源资产防御性配置与大宗商品风险敞口对冲，规避中东供应链脆弱环节资产。",
    deescalationIntent: "美方要求无条件保障国际水道航行自由与停止核/导弹扩张",
    structuralRisk: "美军强化护航通道勉强恢复部分运力，但伊朗议长宣称美方履约前维持实质封锁，商业班轮常态通行依然阻断。",
    contradictionNote: "美方要求无条件保障国际水道航行自由与停止核/导弹扩张；美军依赖海军远洋护航与防空走廊强行维持盟友能源外运",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第204天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Sep 20 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.198 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 76 (Flat): US CENTCOM reports 1B barrels escorted via southern corridor while Iran reiterates blockade conditions; Saudi pipeline repair curbs oil spi…",
    bannerWarning: "→ Maintain defensive allocations in energy and hedge commodities exposure against chokepoint supply disruption risks.",
    deescalationIntent: "US insistence on unconditional freedom of navigation and verified containment o…",
    structuralRisk: "US naval escort corridor facilitated partial flows, but Iran's chief negotiator declared the strait…",
    contradictionNote: "US insistence on unconditional freedom of navigation and verified containment of regional proxy operations; US naval escort patrols and layered air defenses se…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 204",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
