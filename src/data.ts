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
  version: "1.0",
  keyStats: [
    {
      label: "Stat 1",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 2",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 3",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 4",
      value: "-",
      unit: "",
      color: "#ff851b"
    }
  ],
  riskFactors: [
    {
      name: "停火协议的脆弱性",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "停火初期即出现多起违反事件，显示协议执行存在问题。",
      status: "FAST",
      change: "down"
    },
    {
      name: "地区紧张局势",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "以色列明确表示停火不适用于黎巴嫩，继续在该地区进行军事行动。",
      status: "FAST",
      change: "up"
    },
    {
      name: "能源基础设施安全",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "伊朗拉万岛炼油厂在停火生效后发生多次爆炸，原因尚在调查中。",
      status: "FAST",
      change: "up"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "美伊同意两周停火",
      description: "美国和伊朗在巴基斯坦斡旋下，同意自4月8日起停火两周。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "以色列继续在黎巴嫩行动",
      description: "以色列总理办公室声明，停火不适用于黎巴嫩，以军继续在黎巴嫩南部打击真主党武装。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "伊朗拉万岛炼油厂爆炸",
      description: "停火生效后，伊朗拉万岛炼油厂发生多次爆炸，原因尚在调查中。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "科威特和阿联酋遭袭",
      description: "科威特和阿联酋称，尽管停火生效，仍遭到伊朗无人机和导弹袭击。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "伊朗提出停战条件",
      description: "伊朗向巴基斯坦传达了10点停战条件，包括永久停止战争、解除制裁等。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  keyChange: "[object Object]",
  scoreTrend: [
    {
      date: "2026-04-09",
      score: 65
    },
    {
      date: "2026-04-08",
      score: 70,
      active: true
    }
  ],
  situations: [
    {
      title: "停火协议的脆弱性",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: []
    },
    {
      title: "地区紧张局势",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: []
    },
    {
      title: "能源基础设施安全",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: []
    }
  ],
  coreContradiction: {
    title: "停火协议的执行与地区军事行动的持续",
    description: "停火协议的执行情况与地区军事行动的持续存在矛盾，可能导致局势进一步升级。",
    political: [],
    military: []
  },
  riskScore: 60,
  prevRiskScore: 60,
  investmentSignal: "",
  warPhase: {
    level: "",
    targetLevel: "",
    title: "",
    subTitle: "",
    points: [],
    note: ""
  }
};

export const DATA_EN: DashboardData = {
  date: "2026-04-09",
  version: "1.0",
  keyStats: [
    {
      label: "Stat 1",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 2",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 3",
      value: "-",
      unit: "",
      color: "#ff851b"
    },
    {
      label: "Stat 4",
      value: "-",
      unit: "",
      color: "#ff851b"
    }
  ],
  riskFactors: [
    {
      name: "Fragility of Ceasefire Agreement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Multiple violations occurred in the early stages of the ceasefire, indicating issues with its implementation.",
      status: "FAST",
      change: "down"
    },
    {
      name: "Regional Tensions",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Israel explicitly stated that the ceasefire does not apply to Lebanon and continues military actions in the region.",
      status: "FAST",
      change: "up"
    },
    {
      name: "Energy Infrastructure Security",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Multiple explosions occurred at Iran's Lavan Island refinery after the ceasefire took effect; causes are under investigation.",
      status: "FAST",
      change: "up"
    }
  ],
  riskScore: 60,
  prevRiskScore: 60,
  investmentSignal: "",
  keyChange: "",
  events: [],
  scoreTrend: [
    {
      date: "04-09",
      score: 60,
      active: true
    }
  ],
  situations: [],
  warPhase: {
    level: "",
    targetLevel: "",
    title: "",
    subTitle: "",
    points: [],
    note: ""
  },
  coreContradiction: {
    political: [],
    military: []
  }
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 1.0 · Daily",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module 1.0 · Daily",
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
