export interface RiskFactor {
  name: string;
  score: number;
  prev: number;
  weight: number;
  description: string;
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
  date: "2026-04-03",
  version: "v2.5",
  keyStats: [
    { label: "冲突天数", value: "D34", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↑4", unit: "较上期", color: "#ff4136" },
    { label: "霍尔木兹", value: "关闭", unit: "航运层面", color: "#ff4136" },
    { label: "4月6日节点", value: "3天", unit: "观察窗口", color: "#ffdc00" },
  ],
  warPhase: {
    level: "高强度持续",
    targetLevel: "咽喉锁闭",
    title: "战略要冲长期关闭下的高强度冲突",
    subTitle: "美方升级表态延续 · 霍尔木兹实质关闭 · 多边协调未打开重开通路",
    points: [
      "美方称未来数周将强化打击，未见近端降级路径",
      "霍尔木兹仍实质关闭；油轮通行接近停滞，仅个别船旗豁免（非系统性重开）",
      "40+国协调未就重开达成一致；军事选项仍悬而未决",
    ],
    note: "冲突未进入降级区间；能源与全球供应链冲击仍为系统性主风险",
  },
  riskScore: 86,
  prevRiskScore: 82,
  keyChange: "24h内：美方强化打击预期升温，霍尔木兹关闭格局未变，多边外交未能打开重开通路，油价处于危机高位区间（WTI约111.5、Brent约109美元）。",
  investmentSignal:
    "「持续高风险环境：供给冲击条件仍成立，油价与地缘溢价上行风险不对称高于全球增长下行风险；维持防御与能源敞口，慎追风险资产。」",
  scoreTrend: [
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86 },
    { date: "04-02", score: 82 },
    { date: "04-03", score: 86, active: true },
  ],
  riskFactors: [
    {
      name: "军事升级风险",
      score: 4.5,
      prev: 3.5,
      weight: 0.2,
      description: "美方持续打击叙事 + 明确向前升级指引；24h内未见新的离散行动但处于延续/升级相位",
      status: "FAST",
      change: "up",
    },
    {
      name: "航运 / 霍尔木兹中断",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description: "霍尔木兹仍实质关闭；全球约两成石油流量受扰；无系统性重开机制",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "能源市场压力",
      score: 4.0,
      prev: 4.5,
      weight: 0.25,
      description: "油价处于危机高位但未突破极端恐慌阈值；冲击向利率、通胀与供应链传导",
      status: "FAST",
      change: "down",
    },
    {
      name: "区域外溢风险",
      score: 3.5,
      prev: 4.0,
      weight: 0.2,
      description: "报复威胁与基础设施风险仍在，但24h内独立核实的新攻击有限",
      status: "SLOW",
      change: "down",
    },
    {
      name: "外交破局风险",
      score: 4.5,
      prev: 3.5,
      weight: 0.1,
      description: "大规模多边会谈未就重开达成一致；停火/降级路径仍不清晰",
      change: "up",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "美方军事升级表态延续",
      description:
        "美国总统表态未来数周将强化打击（“extremely hard”等措辞），未见近端降级信号。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "路透新闻与路透市场综述交叉引用",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "霍尔木兹仍实质关闭",
      description:
        "伊朗维持封锁；油轮通行接近停滞；全球约两成石油流量受扰；尚无重开协议。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "结构性航运瓶颈未解除",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "菲律宾籍船舶有条件通行例外",
      description:
        "伊朗在双边保证下允许菲籍船安全通行；不代表霍尔木兹系统性重开。",
      verification: "single",
      timestamp: "2026-04-02",
      significance: "单一来源但官方外交沟通；不纳入“重开”判断",
    },
    {
      id: "EVT-04",
      title: "多边协调未就重开霍尔木兹达成一致",
      description:
        "40+国会议未达成重开协议；军事选项讨论但未形成决议。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "外交窗口未打开实质性通路",
    },
    {
      id: "EVT-05",
      title: "能源市场冲击延续（油价冲高）",
      description:
        "WTI约111.5美元、Brent约109美元；录得2020年以来最大单日涨幅之一；全球通胀压力上升。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "供给冲击与价格风险仍主导交易",
    },
    {
      id: "EVT-06",
      title: "外溢与报复威胁（待独立核实）",
      description:
        "伊朗方面对区域基础设施打击的表态与叙事；独立交叉验证不足，不纳入评分主逻辑。",
      verification: "partial",
      timestamp: "2026-04-02",
      significance: "用于风险监测，不作为已证实升级事件",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "升级延续",
      tagColor: "orange",
      points: [
        "美方打击行动持续，公开表态强化未来数周打击力度",
        "24h内未见新的独立核实的大规模离散行动（延续阶段）",
        "未见停火或降级路径落地",
      ],
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "实质关闭",
      tagColor: "red",
      points: [
        "海峡仍实质关闭，系统性重开机制缺失",
        "仅个别船旗/双边豁免，不改变全局封锁格局",
        "全球油运与保险成本维持高位",
      ],
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "危机高位",
      tagColor: "orange",
      points: [
        "油价处于危机高位区间（WTI/Brent约109–111美元）",
        "冲击向利率、通胀与供应链扩散",
        "仍低于极端恐慌阈值，但波动率与政策风险上升",
      ],
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "路径分化",
      tagColor: "yellow",
      points: [
        "美国：延续升级表述，未见近端和平承诺",
        "伊朗：封锁杠杆 + 有条件准入外交",
        "欧洲：倾向外交重开航道，明确拒绝军事解决路径",
      ],
    },
  ],
  coreContradiction: {
    political: ["多边外交寻求重开航道", "欧洲倾向外交而非军事解决"],
    military: ["美方公开强化打击路径", "霍尔木兹实质关闭未解"],
  },
};

export const DATA_EN: DashboardData = {
  date: "2026-04-03",
  version: "v2.5",
  keyStats: [
    { label: "Conflict Days", value: "D34", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↑4", unit: "vs Prev", color: "#ff4136" },
    { label: "Hormuz", value: "Closed", unit: "Shipping", color: "#ff4136" },
    { label: "Apr 6 Node", value: "3 Days", unit: "Watch Window", color: "#ffdc00" },
  ],
  warPhase: {
    level: "Sustained High",
    targetLevel: "Chokepoint Lock",
    title: "High-Intensity Conflict with Strategic Chokepoint Lockdown",
    subTitle: "US escalation rhetoric · Hormuz effectively closed · No diplomatic reopening path",
    points: [
      "US leadership signals harder strikes in coming weeks; no near-term de-escalation signal",
      "Strait of Hormuz remains effectively closed; tanker traffic near-zero; only selective flag exemptions (non-systemic)",
      "40+ countries convene; no agreement to reopen Hormuz; military options discussed but unresolved",
    ],
    note: "No transition to a de-escalation phase; energy and supply-chain shock remain systemic risks",
  },
  riskScore: 86,
  prevRiskScore: 82,
  keyChange:
    "Last 24h: US forward escalation guidance firms; Hormuz closure persists; multinational diplomacy fails to unlock reopening; oil trades at crisis highs (WTI ~111.5, Brent ~109).",
  investmentSignal:
    "Persistent high-risk regime: supply shock conditions intact, with asymmetric upside risk to oil and downside risk to global growth.",
  scoreTrend: [
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86 },
    { date: "04-02", score: 82 },
    { date: "04-03", score: 86, active: true },
  ],
  riskFactors: [
    {
      name: "Military Escalation Risk",
      score: 4.5,
      prev: 3.5,
      weight: 0.2,
      description:
        "Ongoing strike campaign plus explicit forward escalation guidance; no new discrete operation confirmed in 24h (continuation phase)",
      status: "FAST",
      change: "up",
    },
    {
      name: "Shipping / Hormuz Disruption",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description:
        "Hormuz effectively closed; ~20% of global oil flows disrupted; no systemic reopening mechanism",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "Energy Market Stress",
      score: 4.0,
      prev: 4.5,
      weight: 0.25,
      description:
        "Oil near crisis highs but below panic breakout; transmission into rates, inflation, and supply chains",
      status: "FAST",
      change: "down",
    },
    {
      name: "Regional Spillover Risk",
      score: 3.5,
      prev: 4.0,
      weight: 0.2,
      description:
        "Credible retaliation/infrastructure threats; limited newly verified attacks in 24h",
      status: "SLOW",
      change: "down",
    },
    {
      name: "Diplomatic Breakdown Risk",
      score: 4.5,
      prev: 3.5,
      weight: 0.1,
      description:
        "Large-scale talks fail to secure reopening; no ceasefire pathway emerging",
      change: "up",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "Continued US Military Escalation Rhetoric",
      description:
        "US President signaled intensified strikes in coming weeks; no indication of de-escalation.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Cross-checked: Reuters news + Reuters markets wrap",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "Strait of Hormuz Remains Effectively Closed",
      description:
        "Iran continues blockade; tanker traffic near-zero; ~20% of global oil flows disrupted; no reopening agreement.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Structural chokepoint risk persists",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Limited Conditional Shipping Exception (Philippines)",
      description:
        "Iran allows safe passage for Philippine-flagged vessels under bilateral assurance; does NOT represent Hormuz reopening.",
      verification: "single",
      timestamp: "2026-04-02",
      significance: "Single-source but official diplomatic communication",
    },
    {
      id: "EVT-04",
      title: "Multinational Diplomatic Effort Fails to Secure Reopening",
      description:
        "40+ countries convene; no agreement on reopening Hormuz; military options discussed but unresolved.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "No diplomatic unlock for flows",
    },
    {
      id: "EVT-05",
      title: "Energy Market Shock Persists",
      description:
        "WTI ~111.5 USD, Brent ~109 USD; largest daily surge since 2020; inflation pressures rising globally.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Supply shock remains the macro driver",
    },
    {
      id: "EVT-06",
      title: "Spillover and Retaliation Threats",
      description:
        "Iran signals potential strikes on regional infrastructure; insufficient independent confirmation for scoring.",
      verification: "partial",
      timestamp: "2026-04-02",
      significance: "Monitor only; not treated as verified escalation",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Escalation Bias",
      tagColor: "orange",
      points: [
        "Ongoing US strike campaign with explicit intent to intensify",
        "No confirmed NEW discrete operation in last 24h (continuation phase)",
        "No ceasefire or de-escalation pathway",
      ],
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Closed",
      tagColor: "red",
      points: [
        "Strait remains effectively CLOSED",
        "No structural reopening; only selective exemptions (non-systemic)",
        "Insurance and freight costs remain elevated",
      ],
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Crisis Highs",
      tagColor: "orange",
      points: [
        "Oil stable at crisis highs (~109–111 USD)",
        "Shock spreading into rates, inflation, and global supply chains",
        "Below panic breakout, but volatility and policy risk rising",
      ],
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Divergent Paths",
      tagColor: "yellow",
      points: [
        "US: continued escalation; no near-term peace commitment",
        "Iran: blockade leverage + conditional access diplomacy",
        "Europe: preference for diplomatic reopening; rejects military solution",
      ],
    },
  ],
  coreContradiction: {
    political: ["Diplomatic push to reopen Hormuz", "Europe favors diplomacy over military resolution"],
    military: ["US forward escalation guidance", "Hormuz closure unresolved"],
  },
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月6日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.5 · 24h 扫描版",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "风险评分 86：美方升级表态 + 霍尔木兹实质关闭 + 油价危机高位；多边外交仍未打开重开通路（路透为主、可审计）",
    bannerWarning: "供给冲击持续，降级路径未现",
    deescalationIntent: "外交层面寻求重开航道",
    structuralRisk: "军事与航运层面封锁与升级预期仍占主导",
    contradictionNote:
      "外交上推动重开与美方公开强化打击并行；霍尔木兹锁闭使「软着陆」仍缺乏抓手。可持续性取决于封锁是否松动与油价是否失控。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第34天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 6 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.5 · 24h Scan",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Risk score 86: US escalation rhetoric + Hormuz effectively closed + oil at crisis highs; diplomacy has not unlocked reopening (Reuters-primary, auditable)",
    bannerWarning: "Supply shock persists; no de-escalation path yet",
    deescalationIntent: "Diplomatic push to reopen Hormuz",
    structuralRisk: "Military/shipping blockade and escalation bias still dominate",
    contradictionNote:
      "Diplomacy seeks reopening while US guidance emphasizes harder strikes; Hormuz closure leaves little room for a soft landing until flows or prices break.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 34",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
