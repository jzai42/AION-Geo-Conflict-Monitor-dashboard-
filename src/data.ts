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
      name: "停火协议达成",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      change: "down"
    },
    {
      name: "持续袭击事件",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      change: "up"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "停火协议达成",
      description: "美国总统特朗普同意在两周内暂停对伊朗的军事行动，前提是伊朗同意全面、立即且安全地开放霍尔木兹海峡。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "伊朗接受停火提议",
      description: "伊朗最高国家安全委员会接受巴基斯坦提出的停火提议，表示将与美方进行谈判，但对美国完全不信任。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军准备恢复作战",
      description: "美军参谋首长联席会议主席凯恩表示，一旦伊朗拒绝达成最终协议，美军已准备好随时恢复对伊朗的作战行动。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "海湾多国遭袭",
      description: "尽管停火协议已达成，伊朗被指仍持续发动攻击，目标包括沙特阿拉伯的原油出口通道。沙特方面证实，在过去数小时内拦截了9架无人机；科威特也表示，境内多处设施遭到伊朗无人机袭击。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "以色列继续袭击伊朗",
      description: "停火生效4小时后，以色列仍在袭击伊朗目标，导致局势进一步紧张。",
      verification: "confirmed",
      timestamp: "",
      significance: ""
    }
  ],
  keyChange: "停火协议达成，但持续的袭击事件增加了局势的不确定性。",
  scoreTrend: [
    {
      date: "2026-04-09",
      score: 85,
      active: true
    }
  ],
  situations: [
    {
      title: "停火协议达成",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: []
    },
    {
      title: "持续袭击事件",
      icon: "Military",
      tag: "",
      tagColor: "orange",
      points: []
    }
  ],
  coreContradiction: {
    0: "美",
    1: "伊",
    2: "双",
    3: "方",
    4: "对",
    5: "停",
    6: "火",
    7: "协",
    8: "议",
    9: "的",
    10: "执",
    11: "行",
    12: "和",
    13: "信",
    14: "任",
    15: "问",
    16: "题",
    17: "，",
    18: "以",
    19: "及",
    20: "以",
    21: "色",
    22: "列",
    23: "在",
    24: "冲",
    25: "突",
    26: "中",
    27: "的",
    28: "持",
    29: "续",
    30: "军",
    31: "事",
    32: "行",
    33: "动",
    34: "，",
    35: "构",
    36: "成",
    37: "当",
    38: "前",
    39: "局",
    40: "势",
    41: "的",
    42: "核",
    43: "心",
    44: "矛",
    45: "盾",
    46: "。",
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
      name: "Ceasefire Agreement Reached",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "",
      status: "FAST",
      change: "down"
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
