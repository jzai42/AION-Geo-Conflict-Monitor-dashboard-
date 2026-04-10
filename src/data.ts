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
  date: "2026-04-09",
  version: "v2.9",
  keyStats: [
    { label: "冲突天数", value: "D40", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↑8", unit: "较上期", color: "#ff4136" },
    { label: "油价", value: "<100", unit: "危机峰下", color: "#ff4136" },
    { label: "霍尔木兹", value: "许可制", unit: "<10% 常态", color: "#ffdc00" },
  ],
  warPhase: {
    level: "脆弱停火",
    targetLevel: "代理延续",
    title: "脆弱停火 / 代理冲突延续阶段",
    subTitle: "由直接对抗转向「间接冲突 + 谈判张力」；系统性风险回落，但失败概率仍不可忽视",
    points: [
      "两周美伊停火形式上仍有效，但间接敌对仍在（以黎战线、海湾事件等）；伊朗称在持续打击下谈判可能「不合理」",
      "霍尔木兹未正常化：仅伊方军事授权下通行，船舶被告知须获许可否则面临风险；流量仍远低于常态（约一成以下）",
      "外交动能上升：欧盟公开支持停火并推动谈判；伊朗对接触持谨慎态度；马士基等称停火未带来「充分海事确定性」",
    ],
    note: "事件5：违反停火指控与地区外溢叙述争议大、互证不完整——监测项，不纳入主评分",
  },
  riskScore: 64,
  prevRiskScore: 56,
  keyChange:
    "24h要点：停火名义上延续但早期承压（路透+分析）；咽喉点仍为许可制高压、流量极低；班轮巨头维持暂停；欧盟与联合国渠道外交推进；油价在危机峰下企稳（<100美元）但航运与设施损伤带来的结构性风险仍在。",
  investmentSignal:
    "「从峰值危机仓位转向更均衡敞口；保留对冲——停火破裂风险仍具实质性。」",
  scoreTrend: [
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68 },
    { date: "04-08", score: 56 },
    { date: "04-09", score: 64, active: true },
  ],
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3.0,
      prev: 2.0,
      weight: 0.2,
      description: "美伊直接冲突暂停，但代理/外围战线仍有交火与事件；升级路径未关闭",
      status: "FAST",
      change: "up",
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4.0,
      prev: 3.0,
      weight: 0.2,
      description: "名义重开下仍高度受限：许可制通行、流量约一成以下常态；伊方事实控制咽喉",
      status: "FAST",
      change: "up",
    },
    {
      name: "能源冲击",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "价格自危机峰值回落（<100美元），但体系仍承压；航运约束与设施损伤带来持续尾部",
      status: "FAST",
    },
    {
      name: "大国介入深度",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "欧盟等区域外交活跃；未见新的成规模直接军事入场",
      status: "SLOW",
    },
    {
      name: "降级/谈判前景",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "停火仍在但可信度脆弱；谈判活跃但不稳定",
      status: "FAST",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "停火形式上延续但现早期承压迹象",
      description:
        "两周美伊停火仍有效，但间接敌对持续（以黎、海湾等）；伊朗称在持续打击下谈判可能「不合理」。",
      verification: "confirmed",
      timestamp: "2026-04-08 → 2026-04-09",
      significance: "路透 + 路透分析互证",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "霍尔木兹仍高度受限、伊方掌控通行授权",
      description:
        "船舶仅在伊方军事授权下通行；未获许可或面临被针对警告；流量仍低于常态约九成。",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "路透（航运+能源）互证",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "马士基：停火未带来充分海事确定性",
      description:
        "大型航运公司确认：停火不足以恢复「充分海事确定性」，常规航运运营尚未恢复。",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "公司声明 + 路透报道互证",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "外交动能上升，尚无持久框架",
      description:
        "欧盟领导人公开支持停火并推动谈判；伊朗驻联合国大使等释放信号，在深度不信任下谨慎接触会谈。",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "路透（欧盟表态；伊朗驻联合国大使）互证",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "违反停火指控与地区外溢（监测）",
      description:
        "伊朗指责美/以违反停火（黎巴嫩打击、无人机活动等）；以方在停火范围外继续行动。指控争议大、互证不完整。",
      verification: "partial",
      timestamp: "2026-04-08",
      significance: "部分互证；争议叙事；不纳入评分",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "直接暂停",
      tagColor: "yellow",
      points: [
        "美伊核心直接冲突暂停",
        "代理与外围战线仍有冲突与事件",
        "停火稳定性脆弱，升级通道仍敞开",
      ],
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "许可制",
      tagColor: "orange",
      points: [
        "未恢复正常：许可制通行体系",
        "流量仍严重压制（约一成以下常态）",
        "伊朗对咽喉点保持事实作战控制",
      ],
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "脆弱均衡",
      tagColor: "orange",
      points: [
        "油价在危机峰下企稳（<100美元）",
        "由恐慌向脆弱均衡过渡",
        "航运受限与战争设施损伤带来结构性风险",
      ],
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "谈判不稳",
      tagColor: "yellow",
      points: [
        "美国（特朗普）：称停火成功，同时保留谈判失败时的威胁姿态",
        "伊朗：不信任升温，会谈条件化",
        "欧盟：强力推动持续降级",
      ],
    },
  ],
  coreContradiction: {
    political: ["外交与谈判被激活", "仍无持久安全框架"],
    military: ["直接动能对抗降温", "代理冲突与指控使停火可信度受考验"],
  },
};

export const DATA_EN: DashboardData = {
  date: "2026-04-09",
  version: "v2.9",
  keyStats: [
    { label: "Conflict Days", value: "D40", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↑8", unit: "vs Prev", color: "#ff4136" },
    { label: "Oil", value: "<100", unit: "Below crisis peak", color: "#ff4136" },
    { label: "Hormuz", value: "Permit-only", unit: "<10% of normal", color: "#ffdc00" },
  ],
  warPhase: {
    level: "Fragile Ceasefire",
    targetLevel: "Proxy War",
    title: "Fragile Ceasefire / Proxy Conflict Continuation Phase",
    subTitle: "Transition from direct war → indirect conflict + negotiation tension; systemic risk declining, but failure probability remains non-trivial",
    points: [
      "Two-week US–Iran ceasefire holds formally, but hostilities continue indirectly (Israel–Lebanon theater, Gulf incidents); Iran signals talks may be “unreasonable” under continued strikes",
      "Hormuz not normalized: shipping only under Iranian military authorization; vessels warned to obtain permission or risk being targeted; traffic remains <10% of normal",
      "Diplomatic momentum rises: EU backs ceasefire and pushes talks; Iran signals cautious engagement amid deep mistrust; Maersk says ceasefire does not provide “full maritime certainty”",
    ],
    note: "EVT-05: violation claims and spillover—contested narrative, partial verification—monitoring only, excluded from scoring",
  },
  riskScore: 64,
  prevRiskScore: 56,
  keyChange:
    "Last 24h: ceasefire formally holds but shows early strain (Reuters + analysis); Hormuz remains permission-based with severely suppressed traffic; major liners still paused; EU-led diplomacy accelerates; oil stabilized below crisis peak (<100) while shipping and war-damage overhang persist.",
  investmentSignal:
    "Shift from peak crisis positioning to balanced exposure; maintain hedges—ceasefire breakdown risk remains material.",
  scoreTrend: [
    { date: "04-05", score: 74 },
    { date: "04-06", score: 68 },
    { date: "04-07", score: 68 },
    { date: "04-08", score: 56 },
    { date: "04-09", score: 64, active: true },
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3.0,
      prev: 2.0,
      weight: 0.2,
      description:
        "Core US–Iran direct conflict paused, but proxy conflict continues; escalation pathways remain open",
      status: "FAST",
      change: "up",
    },
    {
      name: "Hormuz Disruption",
      score: 4.0,
      prev: 3.0,
      weight: 0.2,
      description:
        "Severe restriction persists despite nominal reopening; permit-based transit; Iran retains de facto chokepoint control",
      status: "FAST",
      change: "up",
    },
    {
      name: "Energy Shock",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description:
        "Prices corrected below crisis peak (<100) but the system remains stressed; constrained shipping and infrastructure damage sustain structural risk",
      status: "FAST",
    },
    {
      name: "Great Power Involvement",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "EU + regional diplomacy active; no new large-scale military entrants",
      status: "SLOW",
    },
    {
      name: "De-escalation Probability",
      score: 3.0,
      prev: 3.0,
      weight: 0.2,
      description: "Ceasefire holds but credibility fragile; negotiation phase active but unstable",
      status: "FAST",
    },
  ],
  events: [
    {
      id: "EVT-01",
      title: "Ceasefire Holds Formally but Shows Early Strain",
      description:
        "The two-week ceasefire remains in effect, but hostilities continue indirectly (Israel–Lebanon theater, Gulf incidents). Iran signals talks may be “unreasonable” under continued strikes.",
      verification: "confirmed",
      timestamp: "2026-04-08 → 2026-04-09",
      significance: "YES: Reuters; Reuters analysis",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "Strait of Hormuz Remains Restricted Under Iranian Control",
      description:
        "Shipping allowed only under Iranian military authorization; vessels warned they must obtain permission or risk being targeted. Traffic remains <10% of normal levels.",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "YES: Reuters (shipping + energy)",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Global Shipping Firms Maintain Suspension Despite Ceasefire",
      description:
        "Maersk confirms the ceasefire does not provide “full maritime certainty”; normal shipping operations have not resumed.",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "YES: corporate statement + Reuters reporting",
      highlight: true,
    },
    {
      id: "EVT-04",
      title: "Diplomatic Momentum Increases but No Durable Framework",
      description:
        "EU leaders publicly support the ceasefire and push for negotiations; Iran signals cautious engagement amid deep mistrust (incl. Iranian UN ambassador commentary per Reuters).",
      verification: "confirmed",
      timestamp: "2026-04-08",
      significance: "YES: Reuters (EU statements; Iranian UN ambassador)",
      highlight: true,
    },
    {
      id: "EVT-05",
      title: "Ceasefire Violation Claims and Regional Spillover",
      description:
        "Iran accuses the U.S./Israel of violations (Lebanon strikes, drone activity); Israel continues operations outside ceasefire scope. Claims contested—excluded from scoring.",
      verification: "partial",
      timestamp: "2026-04-08",
      significance: "PARTIAL / contested; excluded from scoring",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Proxy Continues",
      tagColor: "orange",
      points: [
        "Core US–Iran direct conflict paused",
        "Active conflict persists via proxies and peripheral theaters",
        "Ceasefire stability fragile; escalation pathways remain open",
      ],
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Permit System",
      tagColor: "orange",
      points: [
        "Not normalized: permission-based transit",
        "Traffic still severely suppressed (<10% of normal)",
        "Iran retains de facto operational control of the chokepoint",
      ],
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Fragile Equilibrium",
      tagColor: "orange",
      points: [
        "Oil stabilized below crisis peak (<100)",
        "Market shifting panic → fragile equilibrium",
        "Structural risk from constrained shipping and war damage to infrastructure",
      ],
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Unstable Talks",
      tagColor: "yellow",
      points: [
        "U.S. (Trump): claims ceasefire success; retains threat posture if a deal fails",
        "Iran: mistrust; conditional engagement in talks",
        "EU: strong push for sustained de-escalation",
      ],
    },
  ],
  coreContradiction: {
    political: ["Diplomatic momentum without a durable framework", "Deep mistrust on both sides"],
    military: ["Direct kinetic pause", "Proxy conflict + violation narratives test ceasefire credibility"],
  },
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "4月9日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.9 · Daily",
    sources: "来源",
    vs: "较",
    bannerSignal:
      "综合评分 64（↑8）：停火承压 + 霍尔木兹许可制&流量极低 + 班轮仍停；路透为主，欧盟/华邮等互证、可审计",
    bannerWarning: "由峰值危机仓位转向均衡敞口；保留对冲——停火可信度仍脆弱",
    deescalationIntent: "外交动能上升但框架未立",
    structuralRisk: "咽喉未正常化；海事不确定性仍压制航运",
    contradictionNote:
      "系统性风险回落，但失败概率仍不可忽视：直接对抗降温而代理线与指控拉扯谈判张力。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第40天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Apr 9 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.9 · Daily",
    sources: "Sources",
    vs: "vs",
    bannerSignal:
      "Composite 64 (↑8): ceasefire strain + permit-only Hormuz & ultra-low traffic + liners still paused; Reuters-primary, EU/WaPo cross-check, auditable",
    bannerWarning: "From peak-crisis to balanced exposure; keep hedges—ceasefire credibility fragile",
    deescalationIntent: "Diplomatic momentum, no durable framework yet",
    structuralRisk: "Chokepoint not normalized; maritime uncertainty still suppresses shipping",
    contradictionNote:
      "Systemic risk declining but failure probability non-trivial: direct war cools while proxy lines and claims pull negotiation tension.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 40",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
