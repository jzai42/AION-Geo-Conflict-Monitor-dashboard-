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
  date: "2026-10-22",
  version: "v2.230",
  riskScore: 80,
  change: "down",
  keyChange: "美军增派第三艘航母加强中东威慑，霍尔木兹海峡多艘油轮遇袭，美伊间接斡旋维持但；综合风险分落盘 80（较昨日 -6）",
  investmentSignal: "→ 维持能源与大宗商品结构性对冲头寸，逢高增持防御性资产以对冲海峡航运受阻风险。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D236",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓6",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $97.72–$100.09 · Brent $109.73–$112.68",
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
      description: "美军第三艘航母战斗群进驻中东，也门胡塞武装对沙特机场与油田设施发起多波次无人机突袭，美以防空持续拦截。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "伊朗革命卫队宣布7艘油轮在海峡西侧及阿曼湾受损起火，并警告美军若持续为油轮护航将打击其区域军事基地。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "国际基准原油处于危机带高位震荡，Brent稳定于110美元上方，WTI触及100美元整数关口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美国显著加强战区海上护航与防空拦截资产部署，同时启动使领馆人员防护，但尚未对伊朗本土展开全面对战。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "多哈与伊斯兰堡维系的间接停火通道依然畅通，但美伊在7日倡议及附加要求上立场对立，互信极度匮乏。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "霍尔木兹危机",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "伊朗军方强硬实施海峡航行管辖与水雷封锁，商业通行持续承压。",
      "美军增加航母打击群压制局势外溢，威慑防线向海湾全面延伸。",
      "外交斡旋停留在外围间接传话阶段，核心诉求分歧依然巨大。"
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
        "变化：美军第三艘航母打击群赶赴中东战区强化前沿防空威慑。",
        "变化：胡塞武装突袭沙特达曼机场与油田设施，多地拉响防空警报。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗宣称一夜之间7艘油轮在海峡及邻近水域遭打击或触雷受损。",
        "延续：霍尔木兹海峡商船通航处于高度受控与断续停滞状态。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：布伦特原油在110–112美元区间高位震荡，柴油裂解价差居高不下。",
        "延续：中东原油海运航线绕行成本与战争险附加费维持极端高位。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：伊朗领导层重申海峡通航必须以满足德黑兰安全条件为前提。",
        "延续：白宫与五角大楼重申保障国际航道航行自由与区域盟友安全的承诺。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美方要求恢复海峡无条件自由通航与核遏制，伊朗要求彻底解除制裁与海上封锁。"
    ],
    military: [
      "伊朗以非对称水雷与反舰手段封锁海峡，美军以航母护航与防空延伸威慑打破封锁。"
    ]
  },
  scoreTrend: [
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗宣称在霍尔木兹海峡造成7艘油轮受损起火",
      description: "伊朗革命卫队海军发布战报称打击了4艘违规过驳油轮，另有3艘触水雷受损，并威胁若美军继续护航将袭击美军驻中东基地。",
      verification: "confirmed",
      timestamp: "2026-10-22T06:30:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "布伦特原油站稳111美元，WTI上冲100美元大关",
      description: "受波斯湾油轮遇袭及沙特设施遭无人机打击影响，布伦特主力合约盘中触及112.68美元，WTI最高探至100.09美元。",
      verification: "confirmed",
      timestamp: "2026-10-22T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "美军增派第三艘航母打击群进驻中东战区",
      description: "五角大楼紧急增调第三艘核动力航空母舰及近万名作战人员入驻海湾，以应对霍尔木兹危机及保护关键盟友。",
      verification: "confirmed",
      timestamp: "2026-10-22T08:15:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-04",
      title: "也门胡塞武装袭击沙特机场与油田设施",
      description: "胡塞武装对沙特东部达曼国际机场和 Shaybah 油田发起无人机突击，沙特防空部队在多处空域实施紧急拦截。",
      verification: "confirmed",
      timestamp: "2026-10-22T04:45:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "美伊多哈间接接触持续，停火协议核心分歧未决",
      description: "伊朗外交部证实经由卡塔尔与巴基斯坦的间接会谈仍在继续，但在美方附加条件及海峡解封时间表上仍陷僵局。",
      verification: "confirmed",
      timestamp: "2026-10-22T10:20:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const DATA_EN: DashboardData = {
  date: "2026-10-22",
  version: "v2.230",
  riskScore: 80,
  change: "down",
  keyChange: "US deploys a third carrier strike group to boost deterrence as Iran claims 7 tankers hit in Hormuz; indirect talks persist with deep rifts; composite risk score prints at 80 (vs prior day -6)",
  investmentSignal: "→ Maintain structural hedging positions in energy and commodities, while increasing defensive asset allocations against blockade risks.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D236",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓6",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $97.72–$100.09 · Brent $109.73–$112.68",
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
      description: "Direct skirmishes and proxy attacks remain active across multiple fronts with US military reinforcements.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 5,
      prev: 5,
      weight: 0.2,
      description: "Iran claims seven tankers were damaged or struck by naval mines, threatening direct strikes on US regional bases if escorts persist.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Crude benchmarks remain elevated in the upper crisis range with Brent hovering above $111 and WTI touching $100.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "The US has reinforced carrier and aerial escorts in the theater and ordered embassy staff departures without direct invasion of Iranian soil.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4.5,
      prev: 4.5,
      weight: 0.2,
      description: "Indirect channels via Doha and Islamabad remain open, but conflicting preconditions on maritime access and nuclear terms stall breakthroughs.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  warPhase: {
    level: "Chokepoint Crisis",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "IRGC maintains tight maritime denial and sea mine threats across the strategic corridor.",
      "US surges naval power to protect allied logistics and deter wider escalation.",
      "Indirect diplomatic efforts remain stalled over non-negotiable security red lines."
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
        "Change: A third US aircraft carrier strike group arrives in theater to bolster maritime deterrence.",
        "Change: Houthi drones strike Saudi Arabia's Dammam airport and oilfield perimeter."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran claims seven oil tankers were hit or struck sea mines overnight in the waterway.",
        "Continue: Commercial tanker operations through Hormuz remain constrained under military escort conditions."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Brent crude trades firmly in the $110–$112 crisis band with elevated distillate crack spreads.",
        "Continue: War risk insurance and rerouting expenses keep global maritime freight costs high."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Tehran affirms that reopening Hormuz depends strictly on US acceptance of its 7-day plan.",
        "Continue: Washington reiterates its commitment to securing international sea lanes and defending regional allies."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Washington demands unconditional maritime access and nuclear caps, while Tehran insists on a full end to sanctions and blockades."
    ],
    military: [
      "Iran relies on asymmetric mine and anti-ship denial tactics, while the US deploys heavy carrier escort groups to break the siege."
    ]
  },
  scoreTrend: [
    {
      date: "10-17",
      score: 86
    },
    {
      date: "10-18",
      score: 86
    },
    {
      date: "10-19",
      score: 86
    },
    {
      date: "10-20",
      score: 86
    },
    {
      date: "10-22",
      score: 80,
      active: true
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Claims 7 Tankers Damaged in Strait of Hormuz",
      description: "IRGC Navy announced four tankers transferring crude were struck and three hit naval mines, threatening US bases if escorts continue.",
      verification: "confirmed",
      timestamp: "2026-10-22T06:30:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-02",
      title: "Brent Crude Holds Above $111, WTI Touches $100 Barrier",
      description: "Crude futures stay elevated following reported tanker attacks and Saudi facility strikes, with Brent reaching $112.68 and WTI $100.09.",
      verification: "confirmed",
      timestamp: "2026-10-22T12:00:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "US Deploys Third Carrier Strike Group to Middle East",
      description: "Pentagon deploys an additional aircraft carrier and thousands of personnel to enhance air defense and deterrence in the Persian Gulf.",
      verification: "confirmed",
      timestamp: "2026-10-22T08:15:00Z",
      significance: "",
      critical: true
    },
    {
      id: "EVT-04",
      title: "Houthis Strike Saudi Airport and Oil Infrastructure",
      description: "Houthi forces launch drone attacks on King Fahd International Airport in Dammam and near the Shaybah oilfield as Saudi defenses intercept projectiles.",
      verification: "confirmed",
      timestamp: "2026-10-22T04:45:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Indirect US-Iran Negotiations Proceed in Doha Without Breakthrough",
      description: "Iranian officials confirm ongoing diplomatic talks via Qatar and Pakistan, though fundamental disagreements on ceasefire terms persist.",
      verification: "confirmed",
      timestamp: "2026-10-22T10:20:00Z",
      significance: ""
    }
  ],
  prevRiskScore: 86,
  webSources: [],
  webSearchQueries: []
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "10月22日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.230 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↓6）：美军增派第三艘航母加强中东威慑，霍尔木兹海峡多艘油轮遇袭，美伊间接斡旋维持但；综合风险分落盘 80（较昨日 -6）",
    bannerWarning: "→ 维持能源与大宗商品结构性对冲头寸，逢高增持防御性资产以对冲海峡航运受阻风险。",
    deescalationIntent: "美方要求恢复海峡无条件自由通航与核遏制，伊朗要求彻底解除制裁与海上封锁。",
    structuralRisk: "伊朗革命卫队宣布7艘油轮在海峡西侧及阿曼湾受损起火，并警告美军若持续为油轮护航将打击其区域军事基地。",
    contradictionNote: "美方要求恢复海峡无条件自由通航与核遏制，伊朗要求彻底解除制裁与海上封锁。；伊朗以非对称水雷与反舰手段封锁海峡，美军以航母护航与防空延伸威慑打破封锁。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第236天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Oct 22 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.230 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↓6): US deploys a third carrier strike group to boost deterrence as Iran claims 7 tankers hit in Hormuz; indirect talks persist with deep rifts;…",
    bannerWarning: "→ Maintain structural hedging positions in energy and commodities, while increasing defensive asset allocations against…",
    deescalationIntent: "Washington demands unconditional maritime access and nuclear caps, while Tehran…",
    structuralRisk: "Iran claims seven tankers were damaged or struck by naval mines, threatening direct strikes on US r…",
    contradictionNote: "Washington demands unconditional maritime access and nuclear caps, while Tehran insists on a full end to sanctions and blockades.; Iran relies on asymmetric mi…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 236",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
