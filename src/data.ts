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
  date: "2026-10-13",
  version: "v2.220",
  riskScore: 72,
  keyStats: [
    {
      label: "冲突天数",
      value: "D227",
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
      value: "WTI $91.70–$94.31 · Brent $104.36–$106.27",
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
      description: "多战线交火与代理人远程打击活跃，胡塞武装袭击沙特首都机场造成人员伤亡，美沙筹备联合打击行动。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "霍尔木兹海峡及阿曼外海商业船只遭受无人机及弹丸袭击，商业航运通航率维持在50%以下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "全球原油基准价格高位整固，布伦特合约稳定于104–106美元区间，主体处于100–120美元危机带。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军直接维持波斯湾海上封锁巡逻并向盟友提供防空情报支持，尚未进入大国直接地面参战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "外交调解陷入停滞，伊朗最高国家安全委员会拒绝美方停火提议，双方缺乏善意互信基础。",
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
      "霍尔木兹海峡处于常态化袭船与美军封锁对峙状态，过境运力遭到结构性压制。",
      "交火热度由正面大规模交战转向外围能源节点袭扰与防空消耗战。",
      "谈判方案因双方核心利益诉求不合再度受阻，短期缺乏缓和杠杆。"
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
        "延续：也门胡塞武装对沙特重要民用与交通节点实施导弹袭扰，沙特联军展开针对性空袭报复。",
        "变化：美军中央司令部就沙特防空拦截与外围水域打击计划展开高层协调。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：UKMTO持续发出海峡及阿曼湾商船安全警戒，战区战争险保费维持峰值。",
        "变化：多艘大型原油运输船在阿曼锚地滞留观望，波斯湾有效油轮运力供给收紧。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特主力合约持续在104–106美元区间震荡，市场地缘风险溢价高居不下。",
        "变化：跨洋重油运费飙升引发欧美亚炼厂原料供应结构性分化。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：白宫释放威慑言论并考虑加大对沙特安全支持力度。",
        "变化：伊朗安全高层明确表态美方提议不具诚意，威胁扩大对区域基础设施施压。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "胡塞武装空袭利雅得哈立德国王机场",
      description: "胡塞武装向沙特首都利雅得国际机场发射导弹造成十余人死亡及数百人受伤，航班短暂停航，沙特军方展开反击打击。",
      verification: "confirmed",
      timestamp: "2026-10-13T09:43:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "UKMTO报告霍尔木兹及阿曼湾油轮遇袭",
      description: "英国海上贸易行动办公室确认多艘油轮在海峡咽喉及阿曼外海遭遇无人机与弹丸袭击受损，引发行程改道。",
      verification: "confirmed",
      timestamp: "2026-10-12T16:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "伊朗驳回美国最新停战方案",
      description: "伊朗最高国家安全委员会表示美方停火方案未能解决核心制裁与主权诉求，定性为不充分并拒绝接受。",
      verification: "confirmed",
      timestamp: "2026-10-12T11:04:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "国际油价在百美元危机带窄幅盘整",
      description: "布伦特原油在105美元上方运行，WTI交投于92–94美元，市场在短期原油出口恢复与航道受阻风险间剧烈博弈。",
      verification: "confirmed",
      timestamp: "2026-10-13T16:35:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方在解除全面封锁与完全停止核设施对抗上缺乏任何妥协底线。"
    ],
    military: [
      "美军海空封锁压迫与伊朗及其代理人远程非对称袭扰之间的相持消耗未解。"
    ]
  },
  scoreTrend: [
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72,
      active: true
    }
  ],
  keyChange: "冲突态势在海上封锁对抗期持续黏滞，也门外溢袭击与油轮受损事件巩固了高危地缘溢价，谈判陷入停滞。",
  investmentSignal: "→ 维持大宗商品与能源资产防御性多头配置，减持供应链脆弱的无对冲风险资产。",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-13",
  version: "v2.220",
  riskScore: 72,
  keyStats: [
    {
      label: "Conflict Days",
      value: "D227",
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
      value: "WTI $91.70–$94.31 · Brent $104.36–$106.27",
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
      description: "Active multi-front exchanges and proxy strikes continue as Houthi missile strikes target Riyadh airport, prompting US-Saudi joint response deliberations.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Commercial navigation across Hormuz and Gulf of Oman is heavily impeded following drone and projectile hits, with traffic sustained below 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Global crude benchmarks consolidate firmly within the $100–120/bbl crisis band as Brent holds $104–106/bbl.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US forces maintain maritime blockade enforcement and air defense intelligence support to regional allies without direct great-power clashes.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Diplomatic channels remain stalled as Iran officially dismisses recent US proposals, leaving truce prospects fragile and remote.",
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
      "Hormuz chokepoint remains trapped in an asymmetric confrontation between US naval interdiction and Iranian proxy drone/missile harassment.",
      "Direct front-line warfare has transitioned toward regional infrastructure strikes and air-defense attrition.",
      "Negotiation proposals lack common ground, preventing any near-term structural de-escalation."
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
        "Continue: Houthi forces maintain standoff strikes against Saudi infrastructure, answered by targeted coalition airstrikes.",
        "Change: US Central Command coordinates enhanced air defense integration and joint strike contingency planning with Riyadh."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: UKMTO maintains maritime security alerts across the Strait of Hormuz and Gulf of Oman as war risk premiums peak.",
        "Change: Multiple supertankers halt voyages and anchor off Oman, further tightening effective crude tanker availability."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude futures fluctuate above $104/bbl, preserving a substantial geopolitical risk premium.",
        "Change: Surging maritime freight rates widen pricing differentials across regional crude grades between the Atlantic and Pacific basins."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: The White House reiterates security commitments to Gulf partners amid ongoing blockade enforcement.",
        "Change: Iranian leadership explicitly rejects US diplomatic frameworks, warning of broader asymmetric responses."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Houthi Missile Attack Hits Riyadh International Airport",
      description: "Houthi forces launch ballistic and drone strikes against King Khalid International Airport in Riyadh, causing casualties and triggering Saudi retaliatory air raids.",
      verification: "confirmed",
      timestamp: "2026-10-13T09:43:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "UKMTO Confirms Tanker Incidents in Hormuz and Gulf of Oman",
      description: "Maritime authorities report projectile and drone strikes damaging commercial tankers transiting near the Strait of Hormuz, accelerating commercial diversions.",
      verification: "confirmed",
      timestamp: "2026-10-12T16:00:00Z",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-03",
      title: "Tehran Dismisses Latest US Truce Terms as Insufficient",
      description: "Iran's Supreme National Security Council rejects Washington's latest ceasefire draft, reiterating demands for complete sanctions relief and naval cessation.",
      verification: "confirmed",
      timestamp: "2026-10-12T11:04:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Consolidate Within Crisis Corridor",
      description: "Brent crude trades near $105/bbl while WTI remains in the $92–94/bbl range, reflecting balanced market tension between export recovery and chokepoint disruption risks.",
      verification: "confirmed",
      timestamp: "2026-10-13T16:35:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "Incompatible red lines between Washington's naval interdiction objectives and Tehran's insistence on sanctions removal."
    ],
    military: [
      "Protracted attrition between US coalition naval air dominance and regional asymmetric drone and missile capabilities."
    ]
  },
  scoreTrend: [
    {
      date: "10-09",
      score: 70
    },
    {
      date: "10-10",
      score: 70
    },
    {
      date: "10-11",
      score: 70
    },
    {
      date: "10-12",
      score: 72
    },
    {
      date: "10-13",
      score: 72,
      active: true
    }
  ],
  keyChange: "Conflict posture remains entrenched in maritime blockade confrontation; persistent proxy strikes and chokepoint friction lock risk scores firmly above 70.",
  investmentSignal: "→ Maintain defensive hedges in energy and commodities while reducing unhedged risk assets exposed to regional supply shocks.",
  change: "none",
  prevRiskScore: 72,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月13日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.220 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 72（持平）：冲突态势在海上封锁对抗期持续黏滞，也门外溢袭击与油轮受损事件巩固了高危地缘溢价，谈判陷入停滞。",
    bannerWarning: "→ 维持大宗商品与能源资产防御性多头配置，减持供应链脆弱的无对冲风险资产。",
    deescalationIntent: "美伊双方在解除全面封锁与完全停止核设施对抗上缺乏任何妥协底线。",
    structuralRisk: "霍尔木兹海峡及阿曼外海商业船只遭受无人机及弹丸袭击，商业航运通航率维持在50%以下。",
    contradictionNote: "美伊双方在解除全面封锁与完全停止核设施对抗上缺乏任何妥协底线。；美军海空封锁压迫与伊朗及其代理人远程非对称袭扰之间的相持消耗未解。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第227天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 13 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.220 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 72 (Flat): Conflict posture remains entrenched in maritime blockade confrontation; persistent proxy strikes and chokepoint friction lock risk scores f…",
    bannerWarning: "→ Maintain defensive hedges in energy and commodities while reducing unhedged risk assets exposed to regional supply sh…",
    deescalationIntent: "Incompatible red lines between Washington's naval interdiction objectives and T…",
    structuralRisk: "Commercial navigation across Hormuz and Gulf of Oman is heavily impeded following drone and project…",
    contradictionNote: "Incompatible red lines between Washington's naval interdiction objectives and Tehran's insistence on sanctions removal.; Protracted attrition between US coalit…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 227",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
