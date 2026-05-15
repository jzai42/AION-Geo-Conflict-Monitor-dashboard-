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
  date: "2026-05-15",
  version: "v2.65",
  riskScore: 80,
  riskChange: "up",
  keyStats: [
    {
      label: "冲突天数",
      value: "D76",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↑2",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $98.38–$102.50 · Brent $106.66–$109.23",
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
      description: "特朗普发出持续军事行动威胁，地区代理人无人机攻击活跃。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡周边发生实际扣船与沉船，安全溢价再次飙升。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "停火预期减弱促使油价重回 $100 美元区间，IEA 预警供应缺口。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "中美在京会晤定调伊朗核问题与海峡通行，外交干预处于高位。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "双边互信完全缺失，谈判处于实质性停滞状态。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "特朗普 Truth Social 声明",
      description: "特朗普发文称对伊军事行动将继续，打破谈判降温预期。来源: Reuters.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "UKMTO 确认富查伊拉扣船",
      description: "一艘货轮在阿联酋富查伊拉港外被扣押并转向伊朗领海。来源: UKMTO.",
      verification: "confirmed",
      timestamp: "2026-05-14",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "印度货轮阿曼海域遇袭",
      description: "运载牲畜的印度货轮起火沉没，引发航道二次恐慌。来源: ICIS.",
      verification: "confirmed",
      timestamp: "2026-05-14",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "特朗普与习主席在京共识",
      description: "两国元首同意阻止伊朗获核武器，但在停火细节上缺乏进展。来源: White House.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "IMF 全球经济「不利情景」警示",
      description: "IMF 警告若冲突不消，2026 全球增长将下调至 2.5%。来源: IMF/CBS.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "代理冲突延续",
    targetLevel: "结构性紧张",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "从谈判观望转向冲突再启动。",
      "霍尔木兹海峡从「脆弱开放」转为「主动拦截」。",
      "大国调解虽在最高层级，但实地军事威慑未减。"
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
        "变化：特朗普社交媒体言论释放出新一轮直接军事施压的强烈信号。",
        "延续：美方维持对伊朗核心设施的远程监控与高压侦察。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：富查伊拉及阿曼海域接连发生两起针对非油轮船只的敌对行动。",
        "变化：伊朗海军要求海峡通过船只必须进行特定「协作」，实则强化控制。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：Brent 与 WTI 双双录得单日 >1% 涨幅，对冲停火落空预期。",
        "延续：实物原油供应缺口令炼油商在现货市场高溢价抢购。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：特朗普公开表示对德黑兰「失去耐心」，回归极限施压策略。",
        "延续：伊朗领导层强调即使在停火试探期也不会放弃防御性威慑。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "美国极限施压策略与伊朗对「平权地位」要求的根本冲突。",
      "中国对能源通道稳定性要求与地区局势长期动态博弈的矛盾。"
    ],
    military: [
      "代理人骚扰战术与美军大规模战区封锁能力的不对称对抗。"
    ]
  },
  scoreTrend: [
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80,
      active: true
    }
  ],
  keyChange: "冲突溢价重燃：外交信号不及预期叠加航道实物攻击，风险分值调头上行。",
  investmentSignal: "→ 增持能源与实物大宗：地缘风险溢价回归，防御性配置需覆盖能源及黄金等对冲资产。",
  prevRiskScore: 78,
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGluEfT-exRO1-wRm5-VScMZ5bnGqSrSGucfK8dWvjftWCANVD4KldS8cPx2vhFuW8DIFZNAlHnsHHieF4Dy1wNX6gmst6Goz8xKF11eKN8iIG-609EBeDdLndMPO7v6fdnGI4AjJio0c8QUkH-FOWBzdiX1i7cX17HcsxqBhp_kTNmxRSaGI7L_XTABrdXHhglCXgbVSKbAMzz"
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9RQ2kSK_ufqeZ3Ald16WZLktzK9i7BhPpiNo8v9VeVfUoHKgaPA_Qq3f6Yy4Zx3iuHgc5duEFDteShwVdNSx0lLL2Y_3EhPcI8IRkSl0lUQkgBNCHgdUsyOPFAvcJZQqOavFlJaBOIi4a4uivLG7lWxkELDKzVVH7Xb9uLIAB6MNawNDVeXJ4ZGg1OZZGJyFQEyA4ybAOqt6l7gN1Vt1-kb51Jw47uotCTzC_kFGhmKgZMcNS"
    },
    {
      title: "rferl.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGAwLpzRWulbxwnCvJuPEDrA9moZAVbPVpne5JtuoZOVnWPbV59lIyKgg-ebo_047IP_5anwJ52haRU4OVwXJLtcuCPkFdw1bJumGlYX-qo8xgSKzD41iWDj_eHsUUA3X2d31dVZwgP9fItrm8paU89c5EaJfDF4mcbebeT7bAJHOkwdXq02Xo6QGYn0QlKKY-soE="
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpakfkDokBDNHlDdmIfXlP6IvkuziYXXv2EkD4vaUglu27INp6FpEZ3ExuNa4ltK3QhUytWl5K35W1LPyCXuXclKTqlBrVWSfLuygWC3ptM59lGr2G8FwCH3h3-c6IyQ4MWHj3Cn6ZPWyvIaYwEuiH-7TjBqVLDT53Hg97MC2txh3rIobBXI6yEg503CSlLHtGYMxYriPeSNSybcXjTCJv0j1qB7glzpajSDga02f8TzpRyeTnJpvdwwZ2mUFrXSY="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBQCgSMBytaWHSyZIOK1B9G2vIeg17LdcEB3qry_ovQwqQ6woYCxUC7_ps74I0BBJHFwwxCvwWUCyhMsP2dADTAsi5zQ3eV-kOAISRJ8Tc1FpednnPWGe-j9S6Soyas7rIfoeNK-A7e6x4aGGNZwOXdKcuAA9BDpM-732V1TJh2ZPSwRC46rp8hV8vvKfFsXkY7Jv24_HK2XSBD9zZMmWe6GKjFbM4p-ex33TEu7np49VPk97PrKJQB8zHqIC76sELvLumFCF2XrvScX39dTuQZGeVGCnTt7rNxWBh8KJSNu2_NcsR8StqdysZjliEwce6kaPS7IfFAlYUG9I_pDqtIszN9PXAFxHBc4HhpGwrIJEoby1I3H6H6qfpk00rOYcg"
    },
    {
      title: "business-standard.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFnsR1miloLLpGu9n4h5EaqcLUUpbNPTAn3o-FvYBKrSWiWfSIMEYfgAIbTvXOIg_Bh_ONlS6DIhhhnsHVLx69w8FSe_qykdL1GZMrrcMyLv4ixIKZj5OJLzj0I0sU8lmiC5_iTCX_2KD5_eLfpSFbvplO6JJhvOL1JeaoBOwTUZPgdgizg6cRZSKnEjpkPQY4lowoaQgjC15duapGJLJnQC1Npg3GpM2a_JGaX6YFUQBlPYsuBPgq74MNycdjZdXZq0kOfB2M6gw7L"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGuFmgzfizLC6UHSWH7LlEFtSzsM0Sf2G799yZnxhxygDgo3fdbzzSFFAJ9VzLSsihl_ifrE5o2E4iPtieWVO1sp3Nz_6sbFyxC-5XADvk1SSezfit7uD_hImLYNMyXGi8H5jHdwE4QoI1HqkAiOd7j"
    },
    {
      title: "upstox.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNMr9BLJgZZpkUaqrIP5ud6h6x1tWPLAXfWOTbrvSVFw0cUz5fcCEPBd8KXywm8oC3gMtXiJQJUKe6F74NP9TD27Ia7xDH4cCqbKasKC0ISQY3liOJmv8XoBLb_Ai0awYyqGKUXAi17dp3i8bLIRzHdJlbtCJSNLdgTnYIYvyOKDjxLUceYqFlr5U6LJSEpQ0B5okgsQ6Qi8rzeBsZqzpTrCVzVtPhf3sdOlUOYbZ8YX0KP9QmIS7u2vt6VlIMpvBaLpbviKZLPNzcIeYbhOzDReitV_4in_D1ZotQKR1VwwnSc01BvxP8irmD97pN"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHcAfRPpE4Z9IgH3YOJHFC82wvOxAxLOMAnw7hxb8HRGoyN5LQDZnJ7yJ7r5_kAxgV0exE2csM5i3rudeI277366c8i17_pW3AneWE9rsfGlKsYrAV4Jxf4DrxkYurh6YQfzhKT9VCJhiFcp0AQ5G0x27FFgUoUdxYXHAY_OqmUyxp-PpQzTb2vsSX236gTOvKIBDi9_xSGJvyXdns9K8jdPqE-LRirTfpcp-viCyTHwWtyDJ0kOCM0ony9f0Q="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGj-BCo510QOwKTpzOyylFL7Udys3PA0jDQw5s4CCRp7LjuRENw2biDoYQbnMzoCtuIEXzoQzPBHN4qPjDa9RLQokev3IEUS6K13TVYvVqfX-xB3r51brzfp9xxNjplUcGPr4yRrA1Vzq8ghJ2oS8BZDPEyvJ1z5UbvXO4GYyUWljaZWjzVFfDyPbTF3zFDT6NFpLvS"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGAc155joaLKV9Szk3Q_cu9NqoAvqE_KxZlBqoHTyBB2KCaYXgv8BUvoGdc6ihnoKL613oon2oVUVkTSI11p29tLsp1iFX8-r571UDq2ADZR12vKGD8zjqBe9IdAS0As4GXuw34m1DlGh1bbc8RcSfCIEGldVlj6VrUAxPA9wHJ_46BBYumEBYtAuj3AaJI-DpxNUSaGSqMtDNrG7EpYUe1W994"
    },
    {
      title: "fxempire.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEAqAVCyfRWuYNu12326cDLmrm467jL9H72e_VpDHySWPNsfOrX1APObeCV5UaznlLPMP_Xee8n2fjbwUdJPAEw3hWHWEK384bpsd3DcDSRBgV1tsvvyQlE8MZ9uQPv93gJbv_-h0tEIru3uobtpESmSUFIUyyjrI4CtSbxt8KJTe65xa-BPF9LkppcFV1U0BwUPyTqrfK4bLB604OG94s5Gx3FXqBsh-WFC8r9Z7ixGDekh8iDoso13nyFOi7yzeiI5EMYoZjHedhiHwBSYHYr"
    },
    {
      title: "fxdailyreport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGMY-Wmi98C8aN7484KFvk4Oz3xoeDH9z96Pu7k75TRrQh15F3hEEccnDk4XNgd_WI8xrGT6rZuEgzIaYA9n2WzPVuuff6IHjOo7SA-htc4Ssv3cY74VPFpgKuAmCDVebcv2561UdyQf-fi255SF8WwBq8psyT_KUD3pX6187IJjJ4="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price May 15 2026 range trend",
    "WTI Brent price today May 15 2026 Bloomberg Reuters",
    "US Iran conflict news May 15 2026 military maritime energy"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-05-15",
  version: "v2.65",
  riskScore: 80,
  riskChange: "up",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D76",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↑2",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $98.38–$102.50 · Brent $106.66–$109.23",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Severely restricted",
      unit: "Status",
      color: "#ffdc00"
    }
  ],
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Trump issues renewed military threats; proxy drone strikes remain active.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Actual ship seizure and sinking events re-spike safety premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 4,
      prev: 3.5,
      weight: 0.2,
      description: "Fading ceasefire hopes drive oil back above $100; IEA warns of supply gap.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US-China summit defines nuclear and strait redlines; high-level intervention.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Zero mutual trust persists; negotiations effectively stalled.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Trump Truth Social Statement",
      description: "Trump signals continuation of military decimation, shattering truce hopes. Source: Reuters.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: "",
      highlight: true
    },
    {
      id: "EVT-02",
      title: "UKMTO Confirms Fujairah Seizure",
      description: "Vessel anchored off UAE seized by unauthorized personnel and directed to Iran. Source: UKMTO.",
      verification: "confirmed",
      timestamp: "2026-05-14",
      significance: "",
      critical: true
    },
    {
      id: "EVT-03",
      title: "Indian Cargo Vessel Sinking",
      description: "Indian vessel sinks off Oman after attack, fueling maritime panic. Source: ICIS.",
      verification: "confirmed",
      timestamp: "2026-05-14",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Trump-Xi Summit Consensus",
      description: "Agreement reached that Iran must not have nukes, but ceasefire details remain vague. Source: White House.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "IMF Adverse Scenario Warning",
      description: "IMF warns global growth could drop to 2.5% if conflict persists. Source: IMF.",
      verification: "confirmed",
      timestamp: "2026-05-15",
      significance: ""
    }
  ],
  warPhase: {
    level: "Proxy Conflict Continuation",
    targetLevel: "Structural Tension",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Shift from negotiation wait-and-see back to active conflict.",
      "Hormuz transition from 'fragile open' to 'active interception'.",
      "High-level mediation fails to reduce tactical-level military posturing."
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
        "Change: Trump's social media rhetoric signals a new phase of direct pressure.",
        "Continue: US maintains high-altitude surveillance over Iranian strategic sites."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Two separate hostile acts against non-tanker vessels off UAE and Oman.",
        "Change: Iran enforces 'cooperation requirements' for vessels crossing the strait."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Brent and WTI rise over 1% daily as ceasefire hopes fade.",
        "Continue: Physical oil shortages prompt high-premium spot market buying."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Trump publicly expresses 'loss of patience' with Tehran.",
        "Continue: Iran leadership reiterates they will not surrender deterrent capabilities."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Conflict between US maximum pressure and Iran's demand for sovereign status.",
      "China's need for stability vs. the region's dynamic volatility."
    ],
    military: [
      "Asymmetric proxy harassment vs. large-scale US naval blockade."
    ]
  },
  scoreTrend: [
    {
      date: "05-11",
      score: 84
    },
    {
      date: "05-12",
      score: 84
    },
    {
      date: "05-13",
      score: 78
    },
    {
      date: "05-14",
      score: 78
    },
    {
      date: "05-15",
      score: 80,
      active: true
    }
  ],
  keyChange: "Re-ignition of Risk Premium: Disappointing diplomatic signals and maritime attacks push risk scores upward.",
  investmentSignal: "→ Overweight Energy and Hard Commodities: Defensive allocation needed to hedge against renewed geopolitical risk premiums.",
  prevRiskScore: 78,
  webSources: [
    {
      title: "cbsnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGluEfT-exRO1-wRm5-VScMZ5bnGqSrSGucfK8dWvjftWCANVD4KldS8cPx2vhFuW8DIFZNAlHnsHHieF4Dy1wNX6gmst6Goz8xKF11eKN8iIG-609EBeDdLndMPO7v6fdnGI4AjJio0c8QUkH-FOWBzdiX1i7cX17HcsxqBhp_kTNmxRSaGI7L_XTABrdXHhglCXgbVSKbAMzz"
    },
    {
      title: "moderndiplomacy.eu",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH9RQ2kSK_ufqeZ3Ald16WZLktzK9i7BhPpiNo8v9VeVfUoHKgaPA_Qq3f6Yy4Zx3iuHgc5duEFDteShwVdNSx0lLL2Y_3EhPcI8IRkSl0lUQkgBNCHgdUsyOPFAvcJZQqOavFlJaBOIi4a4uivLG7lWxkELDKzVVH7Xb9uLIAB6MNawNDVeXJ4ZGg1OZZGJyFQEyA4ybAOqt6l7gN1Vt1-kb51Jw47uotCTzC_kFGhmKgZMcNS"
    },
    {
      title: "rferl.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGAwLpzRWulbxwnCvJuPEDrA9moZAVbPVpne5JtuoZOVnWPbV59lIyKgg-ebo_047IP_5anwJ52haRU4OVwXJLtcuCPkFdw1bJumGlYX-qo8xgSKzD41iWDj_eHsUUA3X2d31dVZwgP9fItrm8paU89c5EaJfDF4mcbebeT7bAJHOkwdXq02Xo6QGYn0QlKKY-soE="
    },
    {
      title: "icis.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpakfkDokBDNHlDdmIfXlP6IvkuziYXXv2EkD4vaUglu27INp6FpEZ3ExuNa4ltK3QhUytWl5K35W1LPyCXuXclKTqlBrVWSfLuygWC3ptM59lGr2G8FwCH3h3-c6IyQ4MWHj3Cn6ZPWyvIaYwEuiH-7TjBqVLDT53Hg97MC2txh3rIobBXI6yEg503CSlLHtGYMxYriPeSNSybcXjTCJv0j1qB7glzpajSDga02f8TzpRyeTnJpvdwwZ2mUFrXSY="
    },
    {
      title: "indiatimes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBQCgSMBytaWHSyZIOK1B9G2vIeg17LdcEB3qry_ovQwqQ6woYCxUC7_ps74I0BBJHFwwxCvwWUCyhMsP2dADTAsi5zQ3eV-kOAISRJ8Tc1FpednnPWGe-j9S6Soyas7rIfoeNK-A7e6x4aGGNZwOXdKcuAA9BDpM-732V1TJh2ZPSwRC46rp8hV8vvKfFsXkY7Jv24_HK2XSBD9zZMmWe6GKjFbM4p-ex33TEu7np49VPk97PrKJQB8zHqIC76sELvLumFCF2XrvScX39dTuQZGeVGCnTt7rNxWBh8KJSNu2_NcsR8StqdysZjliEwce6kaPS7IfFAlYUG9I_pDqtIszN9PXAFxHBc4HhpGwrIJEoby1I3H6H6qfpk00rOYcg"
    },
    {
      title: "business-standard.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFnsR1miloLLpGu9n4h5EaqcLUUpbNPTAn3o-FvYBKrSWiWfSIMEYfgAIbTvXOIg_Bh_ONlS6DIhhhnsHVLx69w8FSe_qykdL1GZMrrcMyLv4ixIKZj5OJLzj0I0sU8lmiC5_iTCX_2KD5_eLfpSFbvplO6JJhvOL1JeaoBOwTUZPgdgizg6cRZSKnEjpkPQY4lowoaQgjC15duapGJLJnQC1Npg3GpM2a_JGaX6YFUQBlPYsuBPgq74MNycdjZdXZq0kOfB2M6gw7L"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGuFmgzfizLC6UHSWH7LlEFtSzsM0Sf2G799yZnxhxygDgo3fdbzzSFFAJ9VzLSsihl_ifrE5o2E4iPtieWVO1sp3Nz_6sbFyxC-5XADvk1SSezfit7uD_hImLYNMyXGi8H5jHdwE4QoI1HqkAiOd7j"
    },
    {
      title: "upstox.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNMr9BLJgZZpkUaqrIP5ud6h6x1tWPLAXfWOTbrvSVFw0cUz5fcCEPBd8KXywm8oC3gMtXiJQJUKe6F74NP9TD27Ia7xDH4cCqbKasKC0ISQY3liOJmv8XoBLb_Ai0awYyqGKUXAi17dp3i8bLIRzHdJlbtCJSNLdgTnYIYvyOKDjxLUceYqFlr5U6LJSEpQ0B5okgsQ6Qi8rzeBsZqzpTrCVzVtPhf3sdOlUOYbZ8YX0KP9QmIS7u2vt6VlIMpvBaLpbviKZLPNzcIeYbhOzDReitV_4in_D1ZotQKR1VwwnSc01BvxP8irmD97pN"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHcAfRPpE4Z9IgH3YOJHFC82wvOxAxLOMAnw7hxb8HRGoyN5LQDZnJ7yJ7r5_kAxgV0exE2csM5i3rudeI277366c8i17_pW3AneWE9rsfGlKsYrAV4Jxf4DrxkYurh6YQfzhKT9VCJhiFcp0AQ5G0x27FFgUoUdxYXHAY_OqmUyxp-PpQzTb2vsSX236gTOvKIBDi9_xSGJvyXdns9K8jdPqE-LRirTfpcp-viCyTHwWtyDJ0kOCM0ony9f0Q="
    },
    {
      title: "discoveryalert.com.au",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGj-BCo510QOwKTpzOyylFL7Udys3PA0jDQw5s4CCRp7LjuRENw2biDoYQbnMzoCtuIEXzoQzPBHN4qPjDa9RLQokev3IEUS6K13TVYvVqfX-xB3r51brzfp9xxNjplUcGPr4yRrA1Vzq8ghJ2oS8BZDPEyvJ1z5UbvXO4GYyUWljaZWjzVFfDyPbTF3zFDT6NFpLvS"
    },
    {
      title: "robinhood.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGAc155joaLKV9Szk3Q_cu9NqoAvqE_KxZlBqoHTyBB2KCaYXgv8BUvoGdc6ihnoKL613oon2oVUVkTSI11p29tLsp1iFX8-r571UDq2ADZR12vKGD8zjqBe9IdAS0As4GXuw34m1DlGh1bbc8RcSfCIEGldVlj6VrUAxPA9wHJ_46BBYumEBYtAuj3AaJI-DpxNUSaGSqMtDNrG7EpYUe1W994"
    },
    {
      title: "fxempire.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEAqAVCyfRWuYNu12326cDLmrm467jL9H72e_VpDHySWPNsfOrX1APObeCV5UaznlLPMP_Xee8n2fjbwUdJPAEw3hWHWEK384bpsd3DcDSRBgV1tsvvyQlE8MZ9uQPv93gJbv_-h0tEIru3uobtpESmSUFIUyyjrI4CtSbxt8KJTe65xa-BPF9LkppcFV1U0BwUPyTqrfK4bLB604OG94s5Gx3FXqBsh-WFC8r9Z7ixGDekh8iDoso13nyFOi7yzeiI5EMYoZjHedhiHwBSYHYr"
    },
    {
      title: "fxdailyreport.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGMY-Wmi98C8aN7484KFvk4Oz3xoeDH9z96Pu7k75TRrQh15F3hEEccnDk4XNgd_WI8xrGT6rZuEgzIaYA9n2WzPVuuff6IHjOo7SA-htc4Ssv3cY74VPFpgKuAmCDVebcv2561UdyQf-fi255SF8WwBq8psyT_KUD3pX6187IJjJ4="
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price May 15 2026 range trend",
    "WTI Brent price today May 15 2026 Bloomberg Reuters",
    "US Iran conflict news May 15 2026 military maritime energy"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "5月15日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.65 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 80（↑2）：冲突溢价重燃：外交信号不及预期叠加航道实物攻击，风险分值调头上行。",
    bannerWarning: "→ 增持能源与实物大宗：地缘风险溢价回归，防御性配置需覆盖能源及黄金等对冲资产。",
    deescalationIntent: "美国极限施压策略与伊朗对「平权地位」要求的根本冲突。",
    structuralRisk: "海峡周边发生实际扣船与沉船，安全溢价再次飙升。",
    contradictionNote: "美国极限施压策略与伊朗对「平权地位」要求的根本冲突。；代理人骚扰战术与美军大规模战区封锁能力的不对称对抗。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第76天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "May 15 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.65 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 80 (↑2): Re-ignition of Risk Premium: Disappointing diplomatic signals and maritime attacks push risk scores upward.",
    bannerWarning: "→ Overweight Energy and Hard Commodities: Defensive allocation needed to hedge against renewed geopolitical risk premiu…",
    deescalationIntent: "Conflict between US maximum pressure and Iran's demand for sovereign status.",
    structuralRisk: "Actual ship seizure and sinking events re-spike safety premiums.",
    contradictionNote: "Conflict between US maximum pressure and Iran's demand for sovereign status.; Asymmetric proxy harassment vs. large-scale US naval blockade.",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 76",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
