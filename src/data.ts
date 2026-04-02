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
  date: "2026-04-01",
  version: "v2.2",
  keyStats: [
    { label: "冲突天数", value: "D32", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↓11", unit: "较上期", color: "#39ff14" },
    { label: "降级信号", value: "初现", unit: "政治层面", color: "#ffdc00" },
    { label: "4月6日节点", value: "5天", unit: "能源截止日", color: "#ff4136" },
  ],
  warPhase: {
    level: "第4阶段",
    targetLevel: "第5阶段",
    title: "过渡初期",
    subTitle: "高强度冲突 → 降级 / 收口过渡初期",
    points: [
      "军事行动仍在持续",
      "政治层面开始「定义结束」",
      "战略转向信号明确",
    ],
    note: "降级意图已出现，但结构性风险尚未解除",
  },
  riskScore: 86,
  prevRiskScore: 95,
  keyChange: "从「升级+威胁打击能源基础设施」→ 转向「主动讨论结束战争+战略收缩」",
  investmentSignal: "「市场已开始交易「冲突结束预期」，但在霍尔木兹恢复前，风险资产反弹仍属于脆弱性反弹（fragile rally）。」",
  scoreTrend: [
    { date: "03-22", score: 91 },
    { date: "03-23", score: 85 },
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86, active: true },
  ],
  riskFactors: [
    {
      name: "航运 / 霍尔木兹中断",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description: "航道未恢复；美国可能放弃安全保障责任 — 从「争夺控制」转向「可能放弃控制」",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "能源冲击风险",
      score: 4.0,
      prev: 5.0,
      weight: 0.25,
      description: "供给未实质恢复；但市场开始交易「冲突将结束」预期 — 从供给冲击转向预期驱动定价",
      status: "FAST",
      change: "down",
    },
    {
      name: "区域外溢风险",
      score: 4.5,
      prev: 5.0,
      weight: 0.20,
      description: "以色列/黎巴嫩等多战区持续联动；伊朗扩展打击目标至美国企业（含科技公司）",
      status: "SLOW",
      change: "down",
    },
    {
      name: "军事升级烈度",
      score: 4.0,
      prev: 4.8,
      weight: 0.20,
      description: "军事行动仍持续；但美方明确出现「数周内结束」窗口信号 — 未见实质收缩",
      status: "FAST",
      change: "down",
    },
    {
      name: "外交缓和可能性",
      score: 3.5,
      prev: 2.0,
      weight: 0.10,
      description: "Trump明确表态「数周内结束」+「不再负责霍尔木兹」；伊朗未接受谈判框架",
      change: "up",
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump明确提出「数周内结束战争」",
      description: "美国总统表示军事行动可能在数周内结束，即使霍尔木兹海峡届时仍未完全恢复正常通航。",
      verification: "confirmed",
      timestamp: "2026-04-01",
      significance: "首次明确定义战争结束时间窗口 — 战略重心从升级转向收口",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "美国宣布「不再负责霍尔木兹安全」",
      description: "Trump表示美国不再有理由负责霍尔木兹航道安全，暗示战略收缩。这是本周期最重要的结构性信号变化。",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "霍尔木兹战略定位根本性转变 — 从「争夺控制」到「可能放弃控制」",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "伊朗威胁扩大打击至美国企业（含科技公司）",
      description: "伊朗革命卫队威胁将打击在中东运营的美国企业，目标范围扩展至非军事商业实体。",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "非对称威胁升级；美国科技/企业资产面临新型风险敞口",
    },
    {
      id: "EVT-04",
      title: "军事与区域态势：仍处高强度",
      description: "持续军事部署与空袭；以色列/黎巴嫩区域冲突同步升级. 政治层面降级信号与军事层面持续行动形成明显背离。",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "政治信号与军事现实之间的背离是当前最大的不确定性来源",
    },
    {
      id: "EVT-05",
      title: "白宫确认进入「防御待命状态」",
      description: "白宫表示美军已全面准备应对伊朗对美国企业及利益的潜在攻击。",
      verification: "single",
      timestamp: "2026-03-31",
      significance: "单一来源，未纳入评分；但与事件3形成逻辑呼应",
    },
    {
      id: "EVT-06",
      title: "市场避险情绪边际下降",
      description: "随着政治降级信号出现，黄金、原油等避险资产出现获利回吐压力。",
      verification: "single",
      timestamp: "2026-03-31",
      significance: "市场开始定价「冲突结束」预期",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "未降级",
      tagColor: "red",
      points: [
        "持续打击与军事部署，无明确停火信号",
        "区域多战线（以色列/黎巴嫩）同步联动",
        "政治信号与军事行动之间存在明显背离",
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "结构性变化",
      tagColor: "yellow",
      points: [
        "美国表示不再负责霍尔木兹安全",
        "从「争夺控制」转向「可能放弃控制」",
        "航道实际仍未恢复，风险未解除",
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "预期驱动",
      tagColor: "orange",
      points: [
        "供给尚未实质恢复",
        "市场开始交易「冲突结束」预期",
        "从供给冲击定价 → 转向预期驱动定价",
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "战略转向",
      tagColor: "green",
      points: [
        "美：明确「数周内结束」+「放弃霍尔木兹责任」",
        "伊朗：扩大打击至美企，未接受谈判框架",
        "双方博弈节奏：美方收口 vs 伊朗扩张",
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方主动定义结束时间窗口",
      "降级意图明确",
    ],
    military: [
      "打击持续 + 霍尔木兹未恢复",
      "结构性风险尚未解除",
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-01",
  version: "v2.2",
  keyStats: [
    { label: "Conflict Days", value: "D32", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↓11", unit: "vs Prev", color: "#39ff14" },
    { label: "De-escalation", value: "Initial", unit: "Political Level", color: "#ffdc00" },
    { label: "Apr 6 Node", value: "5 Days", unit: "Energy Deadline", color: "#ff4136" },
  ],
  warPhase: {
    level: "Phase 4",
    targetLevel: "Phase 5",
    title: "Initial Transition",
    subTitle: "High Intensity → De-escalation / Initial Transition",
    points: [
      "Military operations ongoing",
      "Political level starting to 'define the end'",
      "Strategic shift signal is clear",
    ],
    note: "De-escalation intent has appeared, but structural risks remain",
  },
  riskScore: 86,
  prevRiskScore: 95,
  keyChange: "From 'Escalation + Threat to Energy Infrastructure' → 'Active Discussion on Ending War + Strategic Contraction'",
  investmentSignal: "'Market has begun trading on 'Conflict End Expectations', but until Hormuz is restored, the rally in risk assets remains fragile.'",
  scoreTrend: [
    { date: "03-22", score: 91 },
    { date: "03-23", score: 85 },
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86, active: true },
  ],
  riskFactors: [
    {
      name: "Shipping / Hormuz Disruption",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description: "Channel not restored; US may abandon security responsibility — from 'contesting control' to 'potentially abandoning control'",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "Energy Shock Risk",
      score: 4.0,
      prev: 5.0,
      weight: 0.25,
      description: "Supply not substantially restored; but market trading on 'conflict will end' expectations — from supply shock to expectation-driven pricing",
      status: "FAST",
      change: "down",
    },
    {
      name: "Regional Spillover Risk",
      score: 4.5,
      prev: 5.0,
      weight: 0.20,
      description: "Ongoing linkage across multiple theaters (Israel/Lebanon); Iran expands targets to US companies (including tech)",
      status: "SLOW",
      change: "down",
    },
    {
      name: "Military Escalation Intensity",
      score: 4.0,
      prev: 4.8,
      weight: 0.20,
      description: "Military actions continue; but US clearly signals 'end within weeks' window — no substantial contraction seen",
      status: "FAST",
      change: "down",
    },
    {
      name: "Diplomatic De-escalation",
      score: 3.5,
      prev: 2.0,
      weight: 0.10,
      description: "Trump explicitly states 'end within weeks' + 'no longer responsible for Hormuz'; Iran has not accepted the framework",
      change: "up",
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Explicitly Proposes 'End War Within Weeks'",
      description: "The US President stated that military operations could end within weeks, even if the Strait of Hormuz has not fully returned to normal navigation by then.",
      verification: "confirmed",
      timestamp: "2026-04-01",
      significance: "First explicit definition of a war end time window — strategic focus shifts from escalation to closure",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "US Announces 'No Longer Responsible for Hormuz Security'",
      description: "Trump stated the US no longer has a reason to be responsible for the security of the Hormuz waterway, suggesting strategic contraction. This is the most important structural signal change this period.",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "Fundamental shift in Hormuz strategic positioning — from 'contesting control' to 'potentially abandoning control'",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Iran Threatens to Expand Attacks to US Companies (Including Tech)",
      description: "The IRGC threatened to strike US companies operating in the Middle East, expanding the target range to non-military commercial entities.",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "Asymmetric threat escalation; US tech/corporate assets face new types of risk exposure",
    },
    {
      id: "EVT-04",
      title: "Military & Regional Situation: Remains High Intensity",
      description: "Ongoing military deployments and airstrikes; simultaneous escalation of regional conflicts in Israel/Lebanon. Clear divergence between political de-escalation signals and ongoing military actions.",
      verification: "confirmed",
      timestamp: "2026-03-31",
      significance: "The divergence between political signals and military reality is the primary source of current uncertainty",
    },
    {
      id: "EVT-05",
      title: "White House Confirms 'Defensive Standby Status'",
      description: "The White House stated that the US military is fully prepared to respond to potential Iranian attacks on US companies and interests.",
      verification: "single",
      timestamp: "2026-03-31",
      significance: "Single source, not included in scoring; but logically resonates with Event 3",
    },
    {
      id: "EVT-06",
      title: "Market Risk Aversion Decreases Marginally",
      description: "As political de-escalation signals appear, safe-haven assets like gold and crude oil face profit-taking pressure.",
      verification: "single",
      timestamp: "2026-03-31",
      significance: "Market begins pricing in 'conflict end' expectations",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Not De-escalated",
      tagColor: "red",
      points: [
        "Ongoing strikes and deployments, no clear ceasefire signal",
        "Simultaneous linkage across multiple regional fronts",
        "Clear divergence between political signals and military actions",
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "Structural Change",
      tagColor: "yellow",
      points: [
        "US states it is no longer responsible for Hormuz security",
        "Shift from 'contesting control' to 'potentially abandoning control'",
        "Waterway not yet restored, risks remain",
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "Expectation Driven",
      tagColor: "orange",
      points: [
        "Supply not yet substantially restored",
        "Market begins trading on 'conflict end' expectations",
        "Shift from supply shock pricing → expectation-driven pricing",
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Strategic Shift",
      tagColor: "green",
      points: [
        "US: Explicit 'end within weeks' + 'abandoning Hormuz responsibility'",
        "Iran: Expanding attacks to US firms, not accepted framework",
        "Game rhythm: US closure vs Iranian expansion",
      ]
    }
  ],
  coreContradiction: {
    political: [
      "US proactively defines end time window",
      "De-escalation intent is clear",
    ],
    military: [
      "Strikes continue + Hormuz not restored",
      "Structural risks not yet resolved",
    ]
  }
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.2 · 阶段过渡版",
    sources: "来源",
    vs: "较",
    bannerSignal: "结构性信号变化：美方主动释放「数周内结束战争」信号 - 评分从95降至86，降级过渡初期",
    bannerWarning: "反弹脆弱，霍尔木兹未恢复",
    deescalationIntent: "降级意图明确",
    structuralRisk: "结构性风险尚未解除",
    contradictionNote: "这一背离是当前市场「脆弱性反弹」的根本原因。反弹是真实的，但可持续性取决于4月6日后军事行动是否真正收缩。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    conflictName: "美伊冲突",
    dayCount: "第32天",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.2 · Transition Edition",
    sources: "Sources",
    vs: "vs",
    bannerSignal: "Structural signal change: US signals 'end of war within weeks' - Score down from 95 to 86, early transition",
    bannerWarning: "Rebound fragile, Hormuz not recovered",
    deescalationIntent: "Clear de-escalation intent",
    structuralRisk: "Structural risks not yet resolved",
    contradictionNote: "This divergence is the root cause of the current 'fragile rebound'. The rebound is real, but sustainability depends on post-April 6 military contraction.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 32",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
