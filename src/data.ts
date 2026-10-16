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
  date: "2026-10-16",
  version: "v2.223",
  riskScore: 70,
  keyChange: "霍尔木兹海峡袭船封锁与能源危机带高位僵持，IEA释储未能扭转地缘溢价；综合风险分落盘 70（较昨日 -2）；调整前模型分 72（staleDays≥4 与 OpenAI 副审逐维均值）",
  investmentSignal: "→ 维持大宗商品与能源多头对冲，在风险资产维持防御性低仓位以应对破百油价与中东封锁常态化。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D230",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $95.29–$96.64 · Brent $104.92–$106.74",
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
      description: "美军与伊朗在波斯湾及阿曼湾保持导弹无人机互射，红海及也门代理人战线持续活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡通航量仍不足常态一半，遇袭商船沉没与伊朗海军新设禁航巡区加剧航运封锁。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "布伦特原油持续运行在104–106美元危机带，成品油与海运费飙升支撑极端地缘溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军保持战役级护航前沿部署与盟友协调，审议战术制裁豁免以抑运费，无多国全面对战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "非正式沟通机制尚存但核心前置条件针锋相对，停火与复航缺乏实质妥协动力。",
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
      "霍尔木兹海峡控制权成为战事核心支点，美伊在关键水道以非对称打击互相消耗。",
      "能源生命线受阻倒逼国际多边释放原油储备与调整制裁，但难以迅速重建通行安全。",
      "战线外溢至红海与也门腹地，双方均保持战术试探而竭力避免全面全面地面入侵。"
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
        "延续：波斯湾及阿曼湾海域维持防空拦截与反舰无人机交火态势，战事未向内陆全面扩散。",
        "变化：也门胡塞武装对亚丁政府机构实施针对性打击，红海南部侧翼防空戒备等级提升。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要商业集装箱与大型原油轮继续暂停直航霍尔木兹，经好望角绕航运力紧绷。",
        "变化：伊朗海军在海峡以东阿曼湾海域强化常态巡检，声称查处违规关闭AIS船舶。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油维持在105美元上方高位震荡，炼厂柴油裂解价差与油轮保费同步居高难下。",
        "变化：IEA推进剩余1亿桶储备释放细则，盘中对冲中东供应扰动使油价窄幅回落但未破位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：德黑兰宣称美军必须撤出中东作为复航前提，华盛顿坚称继续执行对伊港口海上封锁。",
        "变化：白宫内部审议放宽部分影子船队原油运输限制以平抑全球运费，凸显通胀对冲诉求。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求彻底消除对国际航道的武力威胁，伊朗坚持以解除封锁和美军撤离为复航门槛。"
    ],
    military: [
      "美军战术护航与远程封锁体系无法完全杜绝低成本无人机/水雷对海峡商业航道的致命扰动。"
    ]
  },
  scoreTrend: [
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊海峡对抗加剧，沉船与油轮起火推高通行风险",
      description: "美军中央司令部证实早前遭伊朗打击的集装箱船已沉没，伊朗海军通报阿曼湾禁航区再现油轮起火，双边海上反封锁对峙白热化。",
      verification: "confirmed",
      timestamp: "2026-10-16T08:20:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IEA落实1亿桶原油应急释放以缓解紧缺预期",
      description: "国际能源署成员国同意加速落实协调释储措施平抑中东冲突风险，布伦特原油在105美元附近震荡整理。",
      verification: "confirmed",
      timestamp: "2026-10-16T03:52:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美行政当局权衡影子船队制裁豁免以平抑运费",
      description: "美官员披露正评估允许部分被制裁油轮运输非禁运合法原油，以抑制中东战火引发的历史性油轮运费飙升。",
      verification: "confirmed",
      timestamp: "2026-10-15T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "也门胡塞武装袭击亚丁也门政府中枢",
      description: "胡塞武装使用导弹与无人机袭击亚丁总统府区域，也门国际公认政府确认数名安全人员伤亡，红海安全阴影扩大。",
      verification: "confirmed",
      timestamp: "2026-10-15T21:30:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-16",
  version: "v2.223",
  riskScore: 70,
  keyChange: "Strait of Hormuz tanker attacks and crisis-band crude prices remain entrenched; IEA releases buffer shocks but fail to ease risk premium, keeping composite risk flat at 72; composite risk score prints at 70 (vs prior day -2); pre-adjustment model score 72 (staleDays≥4 与 OpenAI 副审逐维均值)",
  investmentSignal: "→ Maintain long commodity and energy hedges while keeping defensive low allocations across risk assets amid sustained >$100 oil and chokepoint blockades.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D230",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $95.29–$96.64 · Brent $104.92–$106.74",
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
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US and Iranian forces exchange missile and drone fire across the Gulf, with Yemen proxy fronts remaining active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Transit flow remains suppressed below 50% as sunken merchant ships and new Iranian exclusion zones choke navigation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 4,
      weight: 0.2,
      description: "Brent trades persistently in the $104-$106 crisis band with high freight and diesel premiums sustaining elevated risk.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US maintains carrier battle group escort operations and strategic coordination while weighing targeted sanctions flexibility.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Backchannel diplomatic contacts persist but non-negotiable preconditions on both sides stall substantive progress.",
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
      "Control over the Strait of Hormuz remains the decisive pivot, with asymmetric strikes testing coalition naval posture.",
      "Energy supply disruption prompts multilateral strategic reserve releases and sanctions recalibration without restoring safe passage.",
      "Proxy spillover into the southern Red Sea and Aden preserves high combat readiness while avoiding all-out direct ground invasion."
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
        "Continue: Air defense interceptions and drone harassment continue across the Persian Gulf and Gulf of Oman without inland escalation.",
        "Change: Houthi forces launched targeted strikes against Aden government facilities, raising naval alertness around southern choke points."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Primary global container and tanker operators maintain full suspension of unescorted transit through Hormuz.",
        "Change: Iranian naval units deployed expanded patrols east of Hormuz to intercept vessels navigating with disabled tracking."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude trades firmly above $105 with refined product crack spreads and maritime insurance at elevated levels.",
        "Change: IEA members finalized release schedules for 100 million barrels of strategic reserves, dampening intraday upside."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran demands full US withdrawal to resume normal passage; Washington reaffirms enforcement of Iranian maritime blockades.",
        "Change: White House officials consider targeted sanctions relief on select shadow-fleet tankers to alleviate record global shipping rates."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands unhindered freedom of navigation, while Tehran conditions maritime access on lifting economic blockades and foreign military exit."
    ],
    military: [
      "Naval escorts and air defense grids cannot completely neutralize low-cost asymmetric drone and mine threats against commercial hulls."
    ]
  },
  scoreTrend: [
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72
    },
    {
      date: "10-14",
      score: 72
    },
    {
      date: "10-15",
      score: 72
    },
    {
      date: "10-16",
      score: 70,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US-Iran Gulf Standoff Intensifies Amid Sunken Ship and Tanker Fires",
      description: "US CENTCOM confirmed the sinking of a container vessel struck by Iranian fire as Iranian Navy reported a tanker blaze in the Gulf of Oman, sharpening maritime confrontation.",
      verification: "confirmed",
      timestamp: "2026-10-16T08:20:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "IEA Pledges Acceleration of 100M Barrel Emergency Oil Release",
      description: "Member nations agreed to expedite the distribution of coordinated strategic reserves to cushion Middle East supply shortfalls as Brent hovered near $105.",
      verification: "confirmed",
      timestamp: "2026-10-16T03:52:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US Considers Shadow Fleet Sanctions Relief to Cool Freight Costs",
      description: "US officials indicated potential waivers allowing sanctioned tankers to move legitimate crude to counter record global freight spikes driven by Middle East hostilities.",
      verification: "confirmed",
      timestamp: "2026-10-15T18:00:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Houthi Missile Strike Targets Government Complex in Aden",
      description: "Yemen's internationally recognized government reported casualties after an aerial strike hit the presidential palace perimeter, underscoring broader regional instability.",
      verification: "confirmed",
      timestamp: "2026-10-15T21:30:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.223 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（↓2）：霍尔木兹海峡袭船封锁与能源危机带高位僵持，IEA释储未能扭转地缘溢价；综合风险分落盘 70（较昨日 -2）；调整前模型分 72（staleDays≥4 与 OpenAI 副审逐维均值）",
    bannerWarning: "→ 维持大宗商品与能源多头对冲，在风险资产维持防御性低仓位以应对破百油价与中东封锁常态化。",
    deescalationIntent: "美方要求彻底消除对国际航道的武力威胁，伊朗坚持以解除封锁和美军撤离为复航门槛。",
    structuralRisk: "海峡通航量仍不足常态一半，遇袭商船沉没与伊朗海军新设禁航巡区加剧航运封锁。",
    contradictionNote: "美方要求彻底消除对国际航道的武力威胁，伊朗坚持以解除封锁和美军撤离为复航门槛。；美军战术护航与远程封锁体系无法完全杜绝低成本无人机/水雷对海峡商业航道的致命扰动。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第230天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.223 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (↓2): Strait of Hormuz tanker attacks and crisis-band crude prices remain entrenched; IEA releases buffer shocks but fail to ease risk premium, k…",
    bannerWarning: "→ Maintain long commodity and energy hedges while keeping defensive low allocations across risk assets amid sustained >…",
    deescalationIntent: "Washington demands unhindered freedom of navigation, while Tehran conditions ma…",
    structuralRisk: "Transit flow remains suppressed below 50% as sunken merchant ships and new Iranian exclusion zones …",
    contradictionNote: "Washington demands unhindered freedom of navigation, while Tehran conditions maritime access on lifting economic blockades and foreign military exit.; Naval es…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 230",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
