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
  date: "2026-04-02",
  version: "v2.3",
  keyStats: [
    { label: "冲突天数", value: "D33", unit: "2月28日起", color: "#ff851b" },
    { label: "评分变化", value: "↓4", unit: "较上期", color: "#39ff14" },
    { label: "叙事收口", value: "初期", unit: "政治层面", color: "#ffdc00" },
    { label: "4月6日节点", value: "4天", unit: "能源截止日", color: "#ff4136" },
  ],
  warPhase: {
    level: "第4阶段",
    targetLevel: "第5阶段",
    title: "叙事收口初期",
    subTitle: "高强度冲突 → 叙事收口 / 降级过渡",
    points: [
      "美方释放明确结束信号",
      "市场开始交易降级预期",
      "军事行动维持当前强度",
    ],
    note: "叙事已转向，但结构性封锁（霍尔木兹）仍是核心阻力",
  },
  riskScore: 82,
  prevRiskScore: 86,
  keyChange: "叙事层面明确转向「收口」，但军事与航运层面尚未出现实质性降级。",
  investmentSignal: "「冲突仍未结束，但市场已开始交易「结束预期」；当前属于高风险环境下的预期驱动反弹阶段，维持防御+能源配置，避免过早全面risk-on。」",
  scoreTrend: [
    { date: "03-23", score: 85 },
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86 },
    { date: "04-02", score: 82, active: true },
  ],
  riskFactors: [
    {
      name: "航运 / 霍尔木兹中断",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description: "霍尔木兹仍未恢复通航；全球能源运输受限状态持续，航运风险维持高位",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "能源冲击风险",
      score: 4.5,
      prev: 4.0,
      weight: 0.25,
      description: "油价高位震荡（~100）；供给冲击仍在，但市场计入未来缓解预期",
      status: "FAST",
      change: "up",
    },
    {
      name: "区域外溢风险",
      score: 4.0,
      prev: 4.5,
      weight: 0.20,
      description: "多点紧张持续，但未见大规模新增升级行动；伊朗维持压力策略",
      status: "SLOW",
      change: "down",
    },
    {
      name: "军事升级烈度",
      score: 3.5,
      prev: 4.0,
      weight: 0.20,
      description: "无明确停火或降级确认；冲突仍维持当前强度，但未见新增大规模升级",
      status: "FAST",
      change: "down",
    },
    {
      name: "外交缓和可能性",
      score: 3.5,
      prev: 3.5,
      weight: 0.10,
      description: "美方释放「数周内结束」信号 vs 伊朗未出现实质性接受谈判信号",
      change: "structural",
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美国总统释放「数周内结束冲突」信号",
      description: "美国总统明确表示军事行动可能在数周内结束，叙事重心开始转向收口。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "多家媒体交叉验证；战略重心从升级转向定义结束",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "霍尔木兹海峡仍处功能性封锁",
      description: "多源确认航道实际仍未恢复通航，全球能源运输受限状态持续。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "核心结构性风险未解除，是降级过程中的最大阻力",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "全球能源供应链调整",
      description: "美国及其他地区增加出口以补充缺口，应对持续的供给冲击。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "供应链韧性测试；缓解部分极端短缺压力",
    },
    {
      id: "EVT-04",
      title: "市场开始交易「冲突降级预期」",
      description: "避险资产出现回落，市场计入未来冲突缓解的可能性。",
      verification: "partial",
      timestamp: "2026-04-02",
      significance: "缺乏完全验证，当前反弹具有脆弱性",
    },
    {
      id: "EVT-05",
      title: "区域冲突未出现实质性军事降级",
      description: "多点紧张态势持续，军事层面与政治叙事层面出现背离。",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "维持高压态势，防止过早暴露战略虚弱",
    },
  ],
  situations: [
    {
      title: "军事行动",
      icon: "Military",
      tag: "维持强度",
      tagColor: "orange",
      points: [
        "无明确停火或降级确认",
        "维持当前打击强度，未见新增升级",
        "与政治叙事层面形成背离",
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "高位风险",
      tagColor: "red",
      points: [
        "霍尔木兹仍未恢复通航",
        "全球能源运输受限状态持续",
        "航运保险与成本维持高位",
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "高位震荡",
      tagColor: "orange",
      points: [
        "油价维持在100美元附近",
        "供给冲击仍在，供应链开始调整",
        "市场计入未来缓解预期",
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "叙事收口",
      tagColor: "green",
      points: [
        "美国：明确释放「即将结束」信号",
        "伊朗：未见实质降级信号，维持压力",
        "博弈重心：叙事收口 vs 结构封锁",
      ]
    }
  ],
  coreContradiction: {
    political: [
      "叙事层面明确转向收口",
      "市场交易降级预期",
    ],
    military: [
      "结构性封锁（霍尔木兹）维持",
      "军事行动未见实质收缩",
    ]
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-02",
  version: "v2.3",
  keyStats: [
    { label: "Conflict Days", value: "D33", unit: "Since Feb 28", color: "#ff851b" },
    { label: "Score Change", value: "↓4", unit: "vs Prev", color: "#39ff14" },
    { label: "Narrative Closure", value: "Initial", unit: "Political Level", color: "#ffdc00" },
    { label: "Apr 6 Node", value: "4 Days", unit: "Energy Deadline", color: "#ff4136" },
  ],
  warPhase: {
    level: "Phase 4",
    targetLevel: "Phase 5",
    title: "Initial Narrative Closure",
    subTitle: "High Intensity → Narrative Closure / Transition",
    points: [
      "US signals explicit end of conflict",
      "Market trading on de-escalation",
      "Military intensity remains current",
    ],
    note: "Narrative has shifted, but structural block (Hormuz) remains key",
  },
  riskScore: 82,
  prevRiskScore: 86,
  keyChange: "Narrative has clearly shifted to 'closure', but military and shipping levels have not yet seen substantial de-escalation.",
  investmentSignal: "'Conflict not over, but market trading 'end expectations'; high-risk environment, maintain defense+energy, avoid premature risk-on.'",
  scoreTrend: [
    { date: "03-23", score: 85 },
    { date: "03-27", score: 93 },
    { date: "03-28", score: 95 },
    { date: "04-01", score: 86 },
    { date: "04-02", score: 82, active: true },
  ],
  riskFactors: [
    {
      name: "Shipping / Hormuz Disruption",
      score: 5.0,
      prev: 5.0,
      weight: 0.25,
      description: "Hormuz not restored; global energy transport restricted, shipping risk remains at ceiling",
      status: "AT CEILING",
      change: "structural",
    },
    {
      name: "Energy Shock Risk",
      score: 4.5,
      prev: 4.0,
      weight: 0.25,
      description: "Oil prices high (~100); supply shock remains, but market pricing in relief",
      status: "FAST",
      change: "up",
    },
    {
      name: "Regional Spillover Risk",
      score: 4.0,
      prev: 4.5,
      weight: 0.20,
      description: "Ongoing tensions, but no large-scale new escalation; Iran maintains pressure",
      status: "SLOW",
      change: "down",
    },
    {
      name: "Military Escalation Intensity",
      score: 3.5,
      prev: 4.0,
      weight: 0.20,
      description: "No clear ceasefire; current intensity maintained, but no new major escalation",
      status: "FAST",
      change: "down",
    },
    {
      name: "Diplomatic De-escalation",
      score: 3.5,
      prev: 3.5,
      weight: 0.10,
      description: "US signals 'end within weeks' vs Iran no substantial signal of acceptance",
      change: "structural",
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "US President Signals 'End Within Weeks'",
      description: "US President explicitly stated military operations could end within weeks, shifting narrative to closure.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Cross-verified; strategic focus shifts from escalation to defining the end",
      highlight: true,
    },
    {
      id: "EVT-02",
      title: "Hormuz Still Functionally Blocked",
      description: "Multi-source confirmation that the waterway has not returned to normal navigation.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Primary structural risk remains unresolved, key resistance to de-escalation",
      highlight: true,
    },
    {
      id: "EVT-03",
      title: "Global Energy Supply Chain Adjustment",
      description: "US and other regions increase exports to fill gaps and address supply shocks.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Supply chain resilience test; easing some extreme shortage pressures",
    },
    {
      id: "EVT-04",
      title: "Market Trading on 'De-escalation Expectations'",
      description: "Safe-haven assets retreat as market prices in potential conflict resolution.",
      verification: "partial",
      timestamp: "2026-04-02",
      significance: "Lacks full verification; current rally remains fragile",
    },
    {
      id: "EVT-05",
      title: "No Substantial Military De-escalation",
      description: "Ongoing regional tensions; divergence between military reality and political narrative.",
      verification: "confirmed",
      timestamp: "2026-04-02",
      significance: "Maintaining pressure to avoid exposing strategic weakness prematurely",
    },
  ],
  situations: [
    {
      title: "Military Action",
      icon: "Military",
      tag: "Intensity Maintained",
      tagColor: "orange",
      points: [
        "No clear ceasefire or de-escalation confirmed",
        "Current strike intensity remains, no new escalation",
        "Divergence from political narrative level",
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "High Risk",
      tagColor: "red",
      points: [
        "Hormuz waterway not yet restored",
        "Global energy transport remains restricted",
        "Shipping insurance and costs remain high",
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "High Volatility",
      tagColor: "orange",
      points: [
        "Oil prices remain around $100",
        "Supply shock persists, supply chain adjusting",
        "Market pricing in future relief expectations",
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "Narrative Closure",
      tagColor: "green",
      points: [
        "US: Explicit 'end soon' signals",
        "Iran: No substantial de-escalation, maintaining pressure",
        "Game focus: Narrative closure vs Structural block",
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Narrative clearly shifting to closure",
      "Market trading on de-escalation",
    ],
    military: [
      "Structural block (Hormuz) remains",
      "No substantial military contraction seen",
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
    bannerSignal: "叙事收口转向：美方明确释放「即将结束」信号 - 评分降至82，结构性风险（霍尔木兹）仍是核心阻力",
    bannerWarning: "反弹脆弱，霍尔木兹未恢复",
    deescalationIntent: "叙事收口意图明确",
    structuralRisk: "结构性风险（霍尔木兹）尚未解除",
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
    bannerSignal: "Narrative Shift: US signals 'end soon' - Score down to 82, structural risk (Hormuz) remains the primary hurdle",
    bannerWarning: "Rebound fragile, Hormuz not recovered",
    deescalationIntent: "Clear narrative closure intent",
    structuralRisk: "Structural risks (Hormuz) not yet resolved",
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
