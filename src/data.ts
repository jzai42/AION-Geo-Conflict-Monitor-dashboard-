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
  date: "2026-11-16",
  version: "v2.255",
  riskScore: 70,
  change: "none",
  keyChange: "美军第三支航母打击群抵近就位，霍尔木兹海峡连续发生水雷袭击事件，海空封锁对峙与间接外交斡旋维持胶着平衡。",
  investmentSignal: "→ 维持大宗商品与能源多头底仓，增持地缘尾部风险对冲头寸，防范海峡突发事件导致的短期波动率飙升。",
  keyStats: [
    {
      label: "冲突天数",
      value: "D261",
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
      value: "WTI $85.35–$89.49 · Brent $92.24–$96.76",
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
  warPhase: {
    level: "海上封锁对抗期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "美军第三支航母打击群完成战区进驻，波斯湾海空威慑巡航密度显著增强。",
      "霍尔木兹水雷战风险激化，商业油轮被迫依附有限护航窗口或支付极端战争险费。",
      "卡塔尔斡旋渠道维持运转但面临美伊核心利益红线，短期内难现停火突破。"
    ],
    note: "监测用途，不构成投资建议。"
  },
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美军第三支航母编队进驻战区，波斯湾外围发生无人机与雷达站交火，多线对抗烈度居高不下。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "海峡水域出现水雷爆炸险情，主流船级社与航运巨头持续暂停常规航线，有效运力跌破50%。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI与Brent主力合约价格落在$85–100区间，宏观需求与供给过剩预期部分抵消地缘溢价。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "美军多航母战斗群强化战区前沿存在，联合盟友展开全域情报共享与伴随护航。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "多哈间接接触渠道维持运作，但美伊就封锁撤除与核设施核查立场僵硬，停火进展有限。",
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
        "延续：美伊在前沿空域与外围军事基地保持高频侦察与防空反制。",
        "变化：美军“罗斯福”号航母打击群正式进入中东战区完成战备接防。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：主要商业船队维持大范围绕行好望角或依附有限伴航舰队。",
        "变化：海峡内部确认数起油轮触雷险情，水面水下危险等级进一步调升。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：全球原油海运附加险与成品油裂解价差居于历史高位。",
        "变化：中国炼厂开工率走弱与IEA过剩预期拖累基准油价自日内高点小幅回落。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "延续：华盛顿坚持无缝执行能源封锁，德黑兰强调战备反制决心。",
        "变化：多哈非公开外交渠道提交了关于核监控与制裁缓解的分步执行草案。"
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "霍尔木兹海峡连续发生油轮触雷险情",
      description: "伊朗革命卫队声明与UKMTO警戒通报确认海峡航道附近多艘油轮遭遇水雷爆炸威胁，通航条件极具风险。",
      verification: "confirmed",
      timestamp: "2026-11-16T08:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "美军第三支航母打击群抵近中东海域就位",
      description: "美国海军“罗斯福”号航母及其护航编队抵达中东任务区，增强波斯湾外围防空与制海打击威慑能力。",
      verification: "confirmed",
      timestamp: "2026-11-16T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "巴林空军基地防空雷达遭无人机突袭",
      description: "伊朗支持武装对巴林境内空军基地雷达设备实施无人机袭击，多国防空系统拦截部分目标并造成局部损毁。",
      verification: "partial",
      timestamp: "2026-11-16T05:20:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "原油基准于85-97美元区间震荡整理",
      description: "WTI与Brent原油期货交投于85.35至96.76美元区间，市场在供应中断担忧与四季度需求过剩预期间拉锯。",
      verification: "confirmed",
      timestamp: "2026-11-16T14:10:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "卡塔尔穿梭斡旋提交分步接触框架草案",
      description: "卡塔尔外交调解团队向美伊双方转交了涉及有限制裁豁免与核监查恢复的技术性框架，谈判阻力依然显著。",
      verification: "confirmed",
      timestamp: "2026-11-16T16:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "美方坚持以长期全面能源封锁迫使伊朗屈服，德黑兰则以海峡控制权为要挟拒绝单边让步。"
    ],
    military: [
      "美军海空防空力量强化前沿保护，而伊朗依托不对称水雷战与无人机持续威胁咽喉航道安全。"
    ]
  },
  scoreTrend: [
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [
    {
      title: "newsquawk.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxI1Ka_9EgXkMEVe29H2byU6SXM-Hq2uCBDC-ijD4d1OCq7X8ZecvM6D4Xnj63WLqRjlYkJf566zDRviltelZM2jUSxCO_BC2tUJdoh6LG0FU_sS8L3idATbYJPWvyZiUy2IFspc2680_eihOaTBl-pN2y_qvl-r3K5bJLxboPjA6szEC_UetntUk7VOzzMomoE5peiHUR2nYioR7a7e8IbAqZS_1ug3IS3kmcA0CBq2ogSsiy_uG0yYFHJqFBj5Ilr3QhoIM4ZG-dlOFG7fTbToYwRJypWVuPgdJEhA=="
    },
    {
      title: "indianexpress.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEW-ran93ECmN1Zq5zZRkv3psevM9ONr9OZqpjbjy-H527CyTjnvTIUvr93RWE7lJM4VQ6q0AOv_-PzjBjeuv-4mPc7b_smzOivpu4JDGHLZusmPCuGvJ3QbjFI1EtlMksF39Ti4_Y4rmT0mVFXeyjbAv3e4AL-NuYsXFCvuZvRq_ywY3jXoVtm6Jgo7e7El21S8qyS7sjfX2eI8CHjNGPPjx6G2OlAP8zV0EGAP-egxFVFtbTSCPBXUXnUvZ25f7S7MM3u3GeB4SgvBJN37SNRB9MUfUGD5lQorkK3OJd-a-yCEthmqguPahG7P1ir3gHtxg=="
    },
    {
      title: "ground.news",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDG3fAlwu9YkTlA8Vj5xhfO6cZOS_LHUi6Haa9SfhWybbTlO-ugexRP5tc_byI5ChcKC3MTYsXb4-OtFR2imO-APCbnPeITtnl_UjVpNG64jZde-8rePwouU-jdrUkJFJRmHl6N4z67Qr3zSG2UB2lEFkVPXYgIqMTMUj35Z3NUFQLmMpBJCH73UdTE7uSE6eAfiZoXWdXwpBQNBK0CmZKsWnzPEVF5bB_MhDMQ4z6TYu8nz7emE5GPOM6E7PDQQLzm11-GylLUE6VoEkaiEg="
    },
    {
      title: "cruxinvestor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPDp6YdybkRcVovkyW90pizNOvBPto3j9SJkW4Z3dEYLuIjQc0V__yzt2qhfjIcajQpBGZf6SYXzs__K9FovUvu-pwoKbyKxgcyEQ9nfdLMX34_A4K4UO9GDceKjmgVYBovsutsDhWshEiZqLzAhiOp8LA7E5RJ3eZ9MTdJej1Ih1t358o7YQPnWiIT4PmkfvY9l75FR_1b1vsXSJ6Nzwc"
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLm4CuiL0SSXQFvOW3-H5EMoWDuCKh61pJgC8QIUTyiqI0iqlR0DTathEJRPgqe9UjuAUONzDx2w1OJ7ABoKOYFGVBCGTs-S3NsdSgi4IMDPXNPojHmJpkbos_bWenzeHfeOHtqOospL1Aa7bAFSnh9RB8bcI4mI49TUwRySCENw=="
    },
    {
      title: "maaal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqo7lZb3dkU3KODdfvCkT18vX06nZgl7PR4oE_Oeh9iSs-6-N0CuRF6qGPy60t7HxYt7jumd5AZVUJ2gaQyEcdFdPqCSRA-hrz1ePbIx44ku2Qpju9ozahFyR3ZCgWGDyadfvcPkHRq6gNA5XJPQNn0g=="
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjctrdKOMZ2uigZ06Uz6knS8P2ETzz7iDo2AaMmeO4DVTqFpVK1w4NbDVttIo9-Jp9V4XDihKg_um2LJdWHWaGHAEX9V9FJtaHY4Cq9bVVwHDE3a_KJLLlXvJgs2CI0vHbEz_EyFqyXqx7mIMZVCTQ0TaC810wP1bzzCXG1gnhRWhQYA=="
    },
    {
      title: "arabnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGYpuxZnqvWt8MCEl5jUzOCruAGUhiM3a_ssG6doHP4I-fXvsBX3QkPQiTwF80OB_mcXASTrY1PDufXL9DAx6GeOWdmxRmGWUv9oIEPgneH8gqrkoy3q9cw4UhD5Qw7Cnxyu_w0AB_w74IRQ4xyuAI6CxG_CbJi3QwT2qBAJ_Mk_zvnyYLlA46fqqJTando7Dh5X9qfcmAGOS-IZHNJh11y8GpiXLYEbSO2ygEigYM1CFU="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkbtHXV2Cuek4qPQvaUDj4LfL_8UiHka5lhLmP5k_F9mKh90N6Sib99PVk0PRrpiJCXn2MYJzYJEYFCku6oPi345RJaGkHaYhkybxnL_X9pylOOJhg1xpH45G5_Qw="
    }
  ],
  webSearchQueries: [
    "US Iran military Middle East conflict Reuters Bloomberg AP",
    "crude oil prices Reuters Bloomberg Brent WTI November 2024 OR 2026"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-11-16",
  version: "v2.255",
  riskScore: 70,
  change: "none",
  keyChange: "A third US carrier strike group arrives in theater as repeated tanker mine incidents in the Strait of Hormuz sustain a volatile naval blockade standoff.",
  investmentSignal: "→ Maintain base allocations in energy and commodities while adding defensive tail-risk hedges against maritime shockwaves.",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D261",
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
      value: "WTI $85.35–$89.49 · Brent $92.24–$96.76",
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
  warPhase: {
    level: "Maritime Blockade Confrontation",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "The third US carrier strike group reinforces forward air and naval defense networks in the Gulf perimeter.",
      "Strait of Hormuz mine threats severely depress commercial traffic and drive extreme maritime insurance premiums.",
      "Qatari mediation maintains backchannel contact but remains encumbered by fundamental political preconditions."
    ],
    note: "For monitoring only; not investment advice."
  },
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Multi-theater military friction persists with naval posturing and cross-border drone/radar base exchanges.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Navigational safety remains acutely compromised following verified tanker mine strikes, keeping commercial flows below 50%.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "WTI and Brent benchmarks fluctuate within the $85–100/bbl band, balancing war premium against demand headwinds.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "US naval and aerial assets provide sustained operational intelligence, air defense cover, and deterrence presence.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 3.5,
      prev: 3.5,
      weight: 0.2,
      description: "Doha-facilitated indirect communications persist, yet conflicting core demands keep breakthrough probabilities low.",
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
        "Continue: Air defense radar alerts and persistent surveillance sorties dominate Gulf airspace.",
        "Change: The USS Theodore Roosevelt carrier strike group officially reaches assigned operating stations."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Commercial shipping bypasses the primary corridor in favor of Cape routes and secured convoys.",
        "Change: Confirmed mine strikes near primary channels elevate maritime war-risk classifications."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Bunker and crude transport insurance surcharges remain at crisis peaks.",
        "Change: Weakening refinery run data and IEA surplus projections moderate benchmark spikes off daily highs."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Continue: Washington reaffirms strict sanctions enforcement as Tehran pledges full maritime resistance.",
        "Change: Qatari facilitators table an updated phased framework covering nuclear verification and asset relief."
      ]
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Tankers Strike Mines in the Strait of Hormuz",
      description: "IRGC statements and UKMTO maritime alerts corroborate explosions impacting commercial tankers navigating the critical chokepoint.",
      verification: "confirmed",
      timestamp: "2026-11-16T08:30:00Z",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Third US Aircraft Carrier Group Arrives in Theater",
      description: "The USS Theodore Roosevelt and accompanying guided-missile escorts arrive in regional waters to reinforce deterrence and defense.",
      verification: "confirmed",
      timestamp: "2026-11-16T11:15:00Z",
      significance: ""
    },
    {
      id: "EVT-03",
      title: "Bahrain Air Base Radar Targeted in Drone Strike",
      description: "Drone attacks directed at radar installations in Bahrain trigger air defense response and localized facility damage.",
      verification: "partial",
      timestamp: "2026-11-16T05:20:00Z",
      significance: ""
    },
    {
      id: "EVT-04",
      title: "Crude Benchmarks Consolidate within $85–97 Band",
      description: "WTI and Brent futures fluctuate between $85.35 and $96.76 as market participants assess macro surplus forecasts against maritime war risk.",
      verification: "confirmed",
      timestamp: "2026-11-16T14:10:00Z",
      significance: ""
    },
    {
      id: "EVT-05",
      title: "Qatar Tables Phased De-escalation Draft",
      description: "Qatari mediators transmit a phased diplomatic proposal addressing partial economic relief and atomic oversight to Washington and Tehran.",
      verification: "confirmed",
      timestamp: "2026-11-16T16:00:00Z",
      significance: ""
    }
  ],
  coreContradiction: {
    political: [
      "Washington conditions de-escalation on an uncompromising economic blockade, while Tehran insists on sanctions cessation prior to formal talks."
    ],
    military: [
      "US naval deployment seeks full freedom of navigation, challenged by Iranian asymmetric mine warfare and anti-access drone assets."
    ]
  },
  scoreTrend: [
    {
      date: "11-12",
      score: 68
    },
    {
      date: "11-13",
      score: 68
    },
    {
      date: "11-14",
      score: 68
    },
    {
      date: "11-15",
      score: 70
    },
    {
      date: "11-16",
      score: 70,
      active: true
    }
  ],
  prevRiskScore: 70,
  webSources: [
    {
      title: "newsquawk.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxI1Ka_9EgXkMEVe29H2byU6SXM-Hq2uCBDC-ijD4d1OCq7X8ZecvM6D4Xnj63WLqRjlYkJf566zDRviltelZM2jUSxCO_BC2tUJdoh6LG0FU_sS8L3idATbYJPWvyZiUy2IFspc2680_eihOaTBl-pN2y_qvl-r3K5bJLxboPjA6szEC_UetntUk7VOzzMomoE5peiHUR2nYioR7a7e8IbAqZS_1ug3IS3kmcA0CBq2ogSsiy_uG0yYFHJqFBj5Ilr3QhoIM4ZG-dlOFG7fTbToYwRJypWVuPgdJEhA=="
    },
    {
      title: "indianexpress.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEW-ran93ECmN1Zq5zZRkv3psevM9ONr9OZqpjbjy-H527CyTjnvTIUvr93RWE7lJM4VQ6q0AOv_-PzjBjeuv-4mPc7b_smzOivpu4JDGHLZusmPCuGvJ3QbjFI1EtlMksF39Ti4_Y4rmT0mVFXeyjbAv3e4AL-NuYsXFCvuZvRq_ywY3jXoVtm6Jgo7e7El21S8qyS7sjfX2eI8CHjNGPPjx6G2OlAP8zV0EGAP-egxFVFtbTSCPBXUXnUvZ25f7S7MM3u3GeB4SgvBJN37SNRB9MUfUGD5lQorkK3OJd-a-yCEthmqguPahG7P1ir3gHtxg=="
    },
    {
      title: "ground.news",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDG3fAlwu9YkTlA8Vj5xhfO6cZOS_LHUi6Haa9SfhWybbTlO-ugexRP5tc_byI5ChcKC3MTYsXb4-OtFR2imO-APCbnPeITtnl_UjVpNG64jZde-8rePwouU-jdrUkJFJRmHl6N4z67Qr3zSG2UB2lEFkVPXYgIqMTMUj35Z3NUFQLmMpBJCH73UdTE7uSE6eAfiZoXWdXwpBQNBK0CmZKsWnzPEVF5bB_MhDMQ4z6TYu8nz7emE5GPOM6E7PDQQLzm11-GylLUE6VoEkaiEg="
    },
    {
      title: "cruxinvestor.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGPDp6YdybkRcVovkyW90pizNOvBPto3j9SJkW4Z3dEYLuIjQc0V__yzt2qhfjIcajQpBGZf6SYXzs__K9FovUvu-pwoKbyKxgcyEQ9nfdLMX34_A4K4UO9GDceKjmgVYBovsutsDhWshEiZqLzAhiOp8LA7E5RJ3eZ9MTdJej1Ih1t358o7YQPnWiIT4PmkfvY9l75FR_1b1vsXSJ6Nzwc"
    },
    {
      title: "marinelink.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLm4CuiL0SSXQFvOW3-H5EMoWDuCKh61pJgC8QIUTyiqI0iqlR0DTathEJRPgqe9UjuAUONzDx2w1OJ7ABoKOYFGVBCGTs-S3NsdSgi4IMDPXNPojHmJpkbos_bWenzeHfeOHtqOospL1Aa7bAFSnh9RB8bcI4mI49TUwRySCENw=="
    },
    {
      title: "maaal.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFqo7lZb3dkU3KODdfvCkT18vX06nZgl7PR4oE_Oeh9iSs-6-N0CuRF6qGPy60t7HxYt7jumd5AZVUJ2gaQyEcdFdPqCSRA-hrz1ePbIx44ku2Qpju9ozahFyR3ZCgWGDyadfvcPkHRq6gNA5XJPQNn0g=="
    },
    {
      title: "understandingwar.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjctrdKOMZ2uigZ06Uz6knS8P2ETzz7iDo2AaMmeO4DVTqFpVK1w4NbDVttIo9-Jp9V4XDihKg_um2LJdWHWaGHAEX9V9FJtaHY4Cq9bVVwHDE3a_KJLLlXvJgs2CI0vHbEz_EyFqyXqx7mIMZVCTQ0TaC810wP1bzzCXG1gnhRWhQYA=="
    },
    {
      title: "arabnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGYpuxZnqvWt8MCEl5jUzOCruAGUhiM3a_ssG6doHP4I-fXvsBX3QkPQiTwF80OB_mcXASTrY1PDufXL9DAx6GeOWdmxRmGWUv9oIEPgneH8gqrkoy3q9cw4UhD5Qw7Cnxyu_w0AB_w74IRQ4xyuAI6CxG_CbJi3QwT2qBAJ_Mk_zvnyYLlA46fqqJTando7Dh5X9qfcmAGOS-IZHNJh11y8GpiXLYEbSO2ygEigYM1CFU="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFkbtHXV2Cuek4qPQvaUDj4LfL_8UiHka5lhLmP5k_F9mKh90N6Sib99PVk0PRrpiJCXn2MYJzYJEYFCku6oPi345RJaGkHaYhkybxnL_X9pylOOJhg1xpH45G5_Qw="
    }
  ],
  webSearchQueries: [
    "US Iran military Middle East conflict Reuters Bloomberg AP",
    "crude oil prices Reuters Bloomberg Brent WTI November 2024 OR 2026"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "11月16日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.255 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 70（持平）：美军第三支航母打击群抵近就位，霍尔木兹海峡连续发生水雷袭击事件，海空封锁对峙与间接外交斡旋维持胶着平衡。",
    bannerWarning: "→ 维持大宗商品与能源多头底仓，增持地缘尾部风险对冲头寸，防范海峡突发事件导致的短期波动率飙升。",
    deescalationIntent: "美方坚持以长期全面能源封锁迫使伊朗屈服，德黑兰则以海峡控制权为要挟拒绝单边让步。",
    structuralRisk: "海峡水域出现水雷爆炸险情，主流船级社与航运巨头持续暂停常规航线，有效运力跌破50%。",
    contradictionNote: "美方坚持以长期全面能源封锁迫使伊朗屈服，德黑兰则以海峡控制权为要挟拒绝单边让步。；美军海空防空力量强化前沿保护，而伊朗依托不对称水雷战与无人机持续威胁咽喉航道安全。",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第261天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Nov 16 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.255 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 70 (Flat): A third US carrier strike group arrives in theater as repeated tanker mine incidents in the Strait of Hormuz sustain a volatile naval block…",
    bannerWarning: "→ Maintain base allocations in energy and commodities while adding defensive tail-risk hedges against maritime shockwav…",
    deescalationIntent: "Washington conditions de-escalation on an uncompromising economic blockade, whi…",
    structuralRisk: "Navigational safety remains acutely compromised following verified tanker mine strikes, keeping com…",
    contradictionNote: "Washington conditions de-escalation on an uncompromising economic blockade, while Tehran insists on sanctions cessation prior to formal talks.; US naval deploy…",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 261",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
