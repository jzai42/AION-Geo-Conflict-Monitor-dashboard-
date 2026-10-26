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
  date: "2026-10-26",
  version: "v2.234",
  riskScore: 82,
  keyChange: "多方斡旋接触虽启动但美伊核心立场未松动，海峡管制与多点设施骚扰持续，油价坚守百美元危机区间。",
  change: "none",
  scoreTrend: [
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82,
      active: true
    }
  ],
  keyStats: [
    {
      label: "冲突天数",
      value: "D240",
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
      value: "WTI $100.33–$102.63 · Brent $109.25–$111.20",
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
      description: "多战线交火与关键设施打击持续，但双方尚未发起全面地面交战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "商业通航受控于高烈度管制及护航编队，自由通航权严重受损。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "基准油价整体落入 $100–120 危机带，现货与期货风险溢价固化。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "大国保持大规模海空护航部署与前沿防空掩护，未直接投入地面作战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "外部穿梭斡旋虽有接触，但双方实质谈判窗口关闭且核心要价无法调和。",
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
        "延续：代理武装持续向区域关键能源输送设施发动无人机与导弹骚扰。",
        "延续：美伊两军在波斯湾保持防空对峙，未出现战区外更大规模兵力扩编。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：霍尔木兹海峡通行量维持战前约八成，完全依赖军事护航与特定窗口。",
        "变化：阿曼湾船对船（STS）转运成为避开海峡高保费的主要分流路径。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：原油因外交接触传闻窄幅整理，但布伦特仍运行于 $110/桶关口附近。",
        "延续：成品油裂解价差与北半球取暖季备货需求继续制约油价回落空间。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：德黑兰接受区域斡旋方沟通，但强调在封锁解除前不承诺单边降级。",
        "延续：美方维持对伊朗能源出口封锁施压态势，国内通胀政治压力加剧。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美伊双方核心安全诉求存在结构性对立，第三方穿梭斡旋难以达成实质性停火协议。"
    ],
    military: [
      "海峡航运护航体制的高昂成本与非对称无人机/水雷骚扰手段之间的消耗不对称性。"
    ]
  },
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "霍尔木兹海峡事实进入战时管制限行状态，非对称袭击风险高企。",
      "美军护航体制维持最低民生与能源出口底线，形成高压消耗对峙。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  events: [
    {
      id: "EVT-01",
      title: "也门胡塞武装声称袭击沙特输油管线与机场",
      description: "胡塞武装声称对沙特东西输油管道泵站及利雅得哈立德国王国际机场发动袭击，沙特防空部队予以拦截。（Reuters, AP）",
      verification: "confirmed",
      timestamp: "2026-10-25 18:00 UTC",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "卡塔尔等区域调解人抵德黑兰展开外交接触",
      description: "区域斡旋官员在德黑兰展开穿梭外交以探索降级可能，但美伊双方核心立场仍未见让步迹象。（Reuters, Al Jazeera）",
      verification: "confirmed",
      timestamp: "2026-10-26 06:30 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "霍尔木兹海峡商船通航严重受限并依赖护航",
      description: "海峡日常通行仍依赖多国海军护航编队，过境量维持在战前约82%水平，商业自航完全停摆。（Bloomberg, Kpler）",
      verification: "confirmed",
      timestamp: "2026-10-26 10:15 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准价格维持在百美元上方危机带运行",
      description: "WTI与Brent盘中窄幅回落但仍分别处于$100.33–$102.63及$109.25–$111.20区间，地缘供应担忧未除。（Reuters, Bloomberg）",
      verification: "confirmed",
      timestamp: "2026-10-26 14:00 UTC",
      significance: ""
    }
  ],
  investmentSignal: "→ 维持对冲与防御配置，能源与大宗商品高溢价未退，审慎控制风险资产敞口。",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-26",
  version: "v2.234",
  riskScore: 82,
  keyChange: "Mediation contacts in Tehran offer limited near-term relief as core stances stay rigid, keeping Hormuz restricted and oil anchored above $100.",
  change: "none",
  scoreTrend: [
    {
      date: "10-22",
      score: 80
    },
    {
      date: "10-23",
      score: 82
    },
    {
      date: "10-24",
      score: 82
    },
    {
      date: "10-25",
      score: 82
    },
    {
      date: "10-26",
      score: 82,
      active: true
    }
  ],
  keyStats: [
    {
      label: "Conflict Days",
      value: "D240",
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
      value: "WTI $100.33–$102.63 · Brent $109.25–$111.20",
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
      description: "Active strikes and multi-front proxy harassment continue without major ground escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Commercial freedom of navigation remains suspended; passage requires mandatory military convoy support.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Benchmarks trade securely within the $100–120 crisis corridor with persistent physical tightness.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Major power role stays focused on maritime escorts and regional air defense interceptors.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Regional intermediary shuttles produce exploratory talks but zero convergence on core demands.",
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
        "Continue: Proxy missile and drone harassment persists against regional energy infrastructure.",
        "Continue: Air defense systems remain on high alert across the Gulf with no new ground escalation."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping remains dependent on military escort convoys and rigorous security protocols.",
        "Change: Ship-to-ship transfers off the coast of Oman increasingly bypass direct Strait transit bottlenecks."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Crude futures experienced minor intraday easing on diplomatic headlines while holding near $110 Brent.",
        "Continue: Tight winter distillate balances and ongoing refinery maintenance maintain a solid price floor."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Tehran engaged with regional emissaries while insisting on unconditional sanctions relief.",
        "Continue: Washington maintains rigorous enforcement of export curbs amid domestic cost-of-living focus."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Incompatible redlines regarding maritime blockade rights and sanctions relief obstruct formal ceasefire talks."
    ],
    military: [
      "Asymmetric cost burden of defensive naval convoy operations against low-cost drone and naval mine threats."
    ]
  },
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The Strait of Hormuz remains under de facto wartime operational control.",
      "Allied escort convoys secure minimum strategic throughput under persistent asymmetric threat."
    ],
    note: "For monitoring only; not investment advice."
  },
  events: [
    {
      id: "EVT-01",
      title: "Houthis claim strikes on Saudi East-West pipeline and Riyadh airport",
      description: "Yemeni Houthis claimed drone and missile attacks on Saudi East-West pipeline pumping stations and Riyadh airport, with Saudi air defenses intercepting incoming projectiles. (Reuters, AP)",
      verification: "confirmed",
      timestamp: "2026-10-25 18:00 UTC",
      significance: ""
    },
    {
      id: "EVT-02",
      title: "Regional mediators arrive in Tehran for exploratory talks",
      description: "Qatari and regional security emissaries held consultations in Tehran to explore de-escalation avenues, though no compromise on core issues was reached. (Reuters, Al Jazeera)",
      verification: "confirmed",
      timestamp: "2026-10-26 06:30 UTC",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Strait of Hormuz commercial traffic remains severely restricted",
      description: "Commercial passage continues under strict naval convoy escort, maintaining approximately 82% of pre-war volume while unescorted transit stays suspended. (Bloomberg, Kpler)",
      verification: "confirmed",
      timestamp: "2026-10-26 10:15 UTC",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude benchmarks consolidate in the $100–120 crisis zone",
      description: "WTI and Brent prices held within $100.33–$102.63 and $109.25–$111.20 respectively as market participants weighed diplomatic overtures against supply vulnerabilities. (Reuters, Bloomberg)",
      verification: "confirmed",
      timestamp: "2026-10-26 14:00 UTC",
      significance: ""
    }
  ],
  investmentSignal: "→ Maintain hedging and defensive positioning as energy and commodity risk premiums remain elevated, keeping a conservative stance on risk assets.",
  prevRiskScore: 82,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月26日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.234 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 82（持平）：多方斡旋接触虽启动但美伊核心立场未松动，海峡管制与多点设施骚扰持续，油价坚守百美元危机区间。",
    bannerWarning: "→ 维持对冲与防御配置，能源与大宗商品高溢价未退，审慎控制风险资产敞口。",
    deescalationIntent: "美伊双方核心安全诉求存在结构性对立，第三方穿梭斡旋难以达成实质性停火协议。",
    structuralRisk: "商业通航受控于高烈度管制及护航编队，自由通航权严重受损。",
    contradictionNote: "美伊双方核心安全诉求存在结构性对立，第三方穿梭斡旋难以达成实质性停火协议。；海峡航运护航体制的高昂成本与非对称无人机/水雷骚扰手段之间的消耗不对称性。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第240天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 26 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.234 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 82 (Flat): Mediation contacts in Tehran offer limited near-term relief as core stances stay rigid, keeping Hormuz restricted and oil anchored above $1…",
    bannerWarning: "→ Maintain hedging and defensive positioning as energy and commodity risk premiums remain elevated, keeping a conservat…",
    deescalationIntent: "Incompatible redlines regarding maritime blockade rights and sanctions relief o…",
    structuralRisk: "Commercial freedom of navigation remains suspended; passage requires mandatory military convoy supp…",
    contradictionNote: "Incompatible redlines regarding maritime blockade rights and sanctions relief obstruct formal ceasefire talks.; Asymmetric cost burden of defensive naval convo…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 240",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
