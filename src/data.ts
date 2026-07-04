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
  date: "2026-07-04",
  version: "v2.115",
  keyStats: [
    {
      label: "冲突天数",
      value: "D126",
      unit: "2月28日起",
      color: "#ff851b"
    },
    {
      label: "评分变化",
      value: "↓4",
      unit: "较上期",
      color: "#ff4136"
    },
    {
      label: "油价",
      value: "WTI $67.59–$68.48 · Brent $70.65–$72.10",
      unit: "参考",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "霍尔木兹",
      value: "主权管制试探",
      unit: "通行状态",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "军事升级烈度",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "虽然停火备忘录维持，但上周末美伊在霍尔木兹沿岸发生精确打击与反击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "霍尔木兹航运扰动",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "伊朗通过军事指挥部强行推行其指定的航行路线，威胁不从者将面临武力打击。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "能源冲击",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "油价回落至战前水平，地缘政治溢价被谈判进展和供应预期对冲。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "大国介入深度",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "美国派遣特使前往多哈，并在该地区保持强大的海空打击力量以威慑伊朗。",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "降级/谈判前景",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "多哈技术性谈判正在进行，虽然无高层直接接触，但停火框架目前依然有效。",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "伊朗发出海峡通行路线强制令",
      description: "伊朗军方警告所有油轮必须使用伊朗指定的 TSS 航路，否则将面临「即刻且强力」的武力回应（半官方通讯社 Tasnim 报道）。",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "多哈技术性谈判启动",
      description: "美国特使 Witkoff 与伊朗官员通过卡塔尔调停人就冻结资产释放与海峡航道定义进行闭门磋商（TIME 报道）。",
      verification: "confirmed",
      timestamp: "2026-07-02",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "谈判窗口期",
    targetLevel: "脆弱平衡",
    title: "美伊地缘风险监测",
    subTitle: "基于公开报道综合研判",
    points: [
      "60天停火协议进入执行中期，冲突重心从战场转向海峡管辖权。",
      "能源溢价基本出清，市场处于「等待协议」的政治真空期。",
      "伊朗通过航道管制权试探美方底线，存在二次摩擦风险。"
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
        "延续：美伊双方保持海上对峙，但未发起新的大规模跨国境空袭。",
        "变化：伊朗无人机开始对不遵守其航道指令的商船进行低空伴飞警告。"
      ]
    },
    {
      title: "航运 / 霍尔木兹",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗试图将海峡内国际航道转变为其实质控制的主权航道。",
        "延续：由于停火，保险费率小幅下行，但针对新指令的法律合规成本上升。"
      ]
    },
    {
      title: "能源市场",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：油价大幅回落，市场开始交易「长期低价」假设，反映了对全面战争风险的排除。",
        "变化：实物贸易对中东供应的依赖性因海峡通行恢复（每日约 30 艘）而缓解。"
      ]
    },
    {
      title: "领导层信号",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "变化：伊朗高层表态聚焦于「航道主权」，暂时回避了直接军事威胁。",
        "延续：特朗普政府通过非正式外交渠道试探伊朗对新伊核协议的底线。"
      ]
    }
  ],
  coreContradiction: {
    political: [
      "伊朗资产解冻进度与美方要求长期安全保证的博弈",
      "海峡国际航道属性与伊朗宣称的主权管辖权冲突"
    ],
    military: [
      "停火协议下的军事威慑平衡与偶发袭船事件的归因困境"
    ]
  },
  scoreTrend: [
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60
    },
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56,
      active: true
    }
  ],
  keyChange: "能源溢价出清导致综合分回落，焦点全面转向海峡主权博弈",
  investmentSignal: "→ 减持能源类避险头寸，维持风险资产的防御性对冲，关注谈判破裂引发的二次冲击风险",
  change: "down",
  prevRiskScore: 60,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHssv4Qk8EKTgg6sb2VWMfose0IaQ9n0Heh9BIfoZHVOhvRqqfRXN9h6JirqRPeCxccmOK1rnNsu2_Za0gHn2DUsZzMlkZ2zywM65yQ_1Y-esEAEgRCnKi_zXzJG_cbcTLrbac2O7aXaSv7F30j4bRme4jb-z_YzdSCnVme21dd"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrOAp5fym6mBewXCPC74RPWQocVgnGkHMG5Zr7fb3_ZJgVeBIwesM6RcTuZv4cwrFiuZlVg4mFL76pG76qZQP4RQp_-JfUPsnJFohMi1ejO-r1I-aVbnX2HqTzyEn7ZMHAQllYK-G2TLCs3kxMCrl0VwXk8EVBiYV1P8_AweXQlCSxV2TrtvPcZtO5LtE="
    },
    {
      title: "hawaiipublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5rK8BONGH82ftWsKJxXGeOaDZFNw31NRv7q7K0QowGjIFzaBN8mNIkrAsD-prjcdmV3KLrjY5AqBAEfkXaPyF3OR8eGRaZFpNmbUnPWdTaG9cTg6_CyhN-6yDOryIshZ5sFKpN0--it9qAUpHy8MS420-0EUWO0x12Bc-v1KgmyKoVHK0typJ_2oCbmAlYn7fCwB_Np-P09C075z-765P6hoh2wyqqEL7BflCu4jYQfX2l28tTHHTivCrgrZdVn6I2OuavcNfzLI="
    },
    {
      title: "thenationalnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGGJFaM4qHqd-P7AQaNjemD1IgIy43j52ocbG0UIlFbKt8nrsC0MvYMzkNAeQxOlGepfs4gKpFA8RnmemClnjsZkzmaG6bAfOUuFhDzLpf-sbddiYDDcHWLb_ELLeppAIa_57fJjmJDaLHIsSLkjeO3Dpk0YGLRWjqnMglcPPECbS6XB4fzBmQ5ackXK3doLpeKITkFPT8OL4_aRS4BMkSrMbEFDfnNs7Ao6NTfNb0="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHT7YaxfY73WsOmRHhRkA0qW97s8_noz_zCSzxRAHBIxhL9I1o_vr2jK_Xy6vTTOxbsRRCILREkmOJ9hMPbHAHsbRdbJ1Oq6Q7LgwJ6QbUJv2-QAxJ9-Waalp3fwm4"
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqNUE5rP3sZ_LMdICKtFbSw9VsGPzvW9LeFt1NSyFwq4MHuN73BBpHseDP1-K97CMmO9dOvp-n4UEYWun9KvNiBAq45EfwzDXDN7hlpd2solBUAAHhKoHxaTEobjlhayTI"
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEzO3g5tc8-0gScLQfSjU5P87Ujzpfcsx_6kKL7Vk35POF9tzG_O7wfiqy6-a0FYwCE9UkxoCwatdOeMTS5pDI9PEMLROTq3xPdCLhYungnOr20xEq_0HzXRrA3pYukOZthHQlVScmKk-pZkqOBK8_S5PYcH2LLlkhgDPtrdTyez0pitkYksWO01HvjAZEGhaTs_JLQYZNqPFLqKy0asiUIV-hulI8Bd_ue8SbIHsM2urGDP_orG8U="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNOeOQ1SRNWHhahkWSj3lzt-waQzRNSilAIomL2Ts9f947Hecr_Tuy8GJdVMFgbdYWXN78ur2-hanDbVgLEBjRkQ3zzhRPXiCqAyc5nFPWL2c5DwmalNoPCwNqGdLLg4LX0op6ma4AM4aep93ebfui"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA0nz-DtT3fYI3fBAQgGXCkVFTXnIQyrwZDsmxP9OtcBt-vqmDrT87yXxd65gOunOEmIooizh2n6JwWW1N7k2Lt3L16wOejd3T0-y0gPWNrr22zp0Y5kHnaeEYYvJ13bg7E_eeHxYNyfC2vKo="
    },
    {
      title: "time.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbHZLQrKF3FdVz_gpxs6waK6e4WrioRczcIMtOpSjNrB-fiPmEJklmmHQ3Dzcr_6xyVH_glscJCkgHofm_fcAwy3TqaxSVtdMBJ33UJ75qmrSyAxHYlneBD_rmMgK9pAGFRaYy0TENHyHzPp7mguHt8QxVxFasccXGG2DLjGgDHnjIB1RN7zI7Pl6_2R80oXurRYoQ5NYdWe3YBxmz"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFB0Do5cd5PwRkoQiHfLaFf0Gykvtjv1r3jYV0PqD_REqsaIJXeOS7Ce7Uw3xCCM4yvY_QFhKRTi5eW5owTNkOzVbZDRrfK0Arjl7X9e7GBFpZCZLrQ6U8qmHhjz6-o3fJs74qX1JlEqBT9lZ5QEtEl"
    },
    {
      title: "un.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFikKoHdseUeloVjgVmBhVDQIJ5Exw4OqmG_20C6JC5dbnT5oau5sekcNnWZOVspysHI8CPP4DR5KM4pcaZGXCsjzy4p-YX2r6Y1wnMrBUn8MaBqpG6pfT51Qkitb290O9C_-c-bCvJkhYIEOwXEDfIGsyXpWHsGVQiTNVFQYpsFKGnylFwBIl2kpvFvh6nng3gAP9kfJWwH1UzwvdgPALVH98CecxGvNbV"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 4 2026 range trend Reuters Bloomberg",
    "US Iran conflict news July 4 2026 military maritime Hormuz Strait",
    "Oman Qatar mediation US Iran July 2026 status"
  ]
};

export const DATA_EN: DashboardData = {
  date: "2026-07-04",
  version: "v2.115",
  keyStats: [
    {
      label: "Conflict Days",
      value: "D126",
      unit: "Since Feb 28",
      color: "#ff851b"
    },
    {
      label: "Score Change",
      value: "↓4",
      unit: "vs Prev",
      color: "#ff4136"
    },
    {
      label: "Oil",
      value: "WTI $67.59–$68.48 · Brent $70.65–$72.10",
      unit: "Ref.",
      color: "#ff4136",
      layout: "unitPrimary"
    },
    {
      label: "Hormuz",
      value: "Sovereignty Testing",
      unit: "Passage Status",
      color: "#ffdc00"
    }
  ],
  riskScore: 56,
  riskFactors: [
    {
      name: "Military Escalation Intensity",
      score: 3,
      prev: 3,
      weight: 0.2,
      description: "Proxy confrontations and precision retaliatory strikes coexist without full-scale escalation.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Hormuz Disruption",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "Iran enforces mandatory traffic separation schemes, threatening forceful responses to non-compliance.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Energy Shock",
      score: 1,
      prev: 2,
      weight: 0.2,
      description: "Oil prices have returned to pre-war levels as negotiation progress offsets supply risk premiums.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "Great Power Involvement",
      score: 4,
      prev: 4,
      weight: 0.2,
      description: "US maintains high-pressure deployment and actively facilitates technical talks in Doha.",
      status: "FAST",
      sourceVerification: "confirmed"
    },
    {
      name: "De-escalation Probability",
      score: 2,
      prev: 2,
      weight: 0.2,
      description: "Technical talks in Doha continue with positive signals regarding the 60-day ceasefire extension.",
      status: "FAST",
      sourceVerification: "confirmed"
    }
  ],
  events: [
    {
      id: "EVT-01",
      title: "Iran Issues Hormuz Route Ultimatum",
      description: "Iranian military warns all tankers must use designated TSS routes or face an 'immediate and forceful' response (Tasnim News).",
      verification: "confirmed",
      timestamp: "2026-07-03",
      significance: "",
      highlight: true,
      critical: true
    },
    {
      id: "EVT-02",
      title: "Technical Peace Talks Commenced in Doha",
      description: "US envoys meet with mediators to discuss frozen assets and navigation protocols while high-level direct talks remain pending (TIME).",
      verification: "confirmed",
      timestamp: "2026-07-02",
      significance: "",
      highlight: true
    }
  ],
  warPhase: {
    level: "Negotiation Window",
    targetLevel: "Fragile Balance",
    title: "US–Iran geo-risk snapshot",
    subTitle: "Synthesized from public sources",
    points: [
      "Ceasefire enters mid-term implementation; focus shifts from battlefields to maritime jurisdiction.",
      "Energy premiums mostly erased; market enters a political vacuum awaiting deal specifics.",
      "Sovereignty friction in the Strait remains the primary trigger for potential secondary shocks."
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
        "Continue: US and Iran maintain naval standoffs without launching new large-scale cross-border airstrikes.",
        "Change: Iranian drones initiating low-altitude warning flights over merchant ships ignoring route directives."
      ]
    },
    {
      title: "Shipping / Hormuz",
      icon: "Shipping",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iran attempting to de facto transform international straits into sovereign controlled corridors.",
        "Continue: Insurance premiums slightly declining due to ceasefire, but compliance costs rising."
      ]
    },
    {
      title: "Energy Market",
      icon: "Energy",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Significant price drop as markets price out all-out war scenarios.",
        "Change: Physical supply dependency on the Middle East eases as vessel transits rebound to ~30/day."
      ]
    },
    {
      title: "Leadership Signals",
      icon: "Leadership",
      tag: "",
      tagColor: "orange",
      points: [
        "Change: Iranian leadership focusing messaging on 'Maritime Sovereignty' while de-emphasizing direct threats.",
        "Continue: Trump administration testing Iranian redlines for a comprehensive new nuclear framework via backchannels."
      ]
    }
  ],
  coreContradiction: {
    political: [
      "Release of Iranian assets vs. US demands for long-term verifiable security guarantees",
      "International navigation rights vs. Iran's declared sovereign jurisdiction in the Strait"
    ],
    military: [
      "Deterrence balance under the interim deal vs. attribution challenges in sporadic maritime incidents"
    ]
  },
  scoreTrend: [
    {
      date: "06-30",
      score: 56
    },
    {
      date: "07-01",
      score: 60
    },
    {
      date: "07-02",
      score: 56
    },
    {
      date: "07-03",
      score: 60
    },
    {
      date: "07-04",
      score: 56,
      active: true
    }
  ],
  keyChange: "Liquidation of energy risk premiums drives score lower as focus shifts to maritime sovereignty disputes.",
  investmentSignal: "→ Reduce energy hedges, maintain defensive posture in risk assets, monitor for secondary shocks from negotiation delays.",
  change: "down",
  prevRiskScore: 60,
  webSources: [
    {
      title: "investing.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHssv4Qk8EKTgg6sb2VWMfose0IaQ9n0Heh9BIfoZHVOhvRqqfRXN9h6JirqRPeCxccmOK1rnNsu2_Za0gHn2DUsZzMlkZ2zywM65yQ_1Y-esEAEgRCnKi_zXzJG_cbcTLrbac2O7aXaSv7F30j4bRme4jb-z_YzdSCnVme21dd"
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGrOAp5fym6mBewXCPC74RPWQocVgnGkHMG5Zr7fb3_ZJgVeBIwesM6RcTuZv4cwrFiuZlVg4mFL76pG76qZQP4RQp_-JfUPsnJFohMi1ejO-r1I-aVbnX2HqTzyEn7ZMHAQllYK-G2TLCs3kxMCrl0VwXk8EVBiYV1P8_AweXQlCSxV2TrtvPcZtO5LtE="
    },
    {
      title: "hawaiipublicradio.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5rK8BONGH82ftWsKJxXGeOaDZFNw31NRv7q7K0QowGjIFzaBN8mNIkrAsD-prjcdmV3KLrjY5AqBAEfkXaPyF3OR8eGRaZFpNmbUnPWdTaG9cTg6_CyhN-6yDOryIshZ5sFKpN0--it9qAUpHy8MS420-0EUWO0x12Bc-v1KgmyKoVHK0typJ_2oCbmAlYn7fCwB_Np-P09C075z-765P6hoh2wyqqEL7BflCu4jYQfX2l28tTHHTivCrgrZdVn6I2OuavcNfzLI="
    },
    {
      title: "thenationalnews.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGGJFaM4qHqd-P7AQaNjemD1IgIy43j52ocbG0UIlFbKt8nrsC0MvYMzkNAeQxOlGepfs4gKpFA8RnmemClnjsZkzmaG6bAfOUuFhDzLpf-sbddiYDDcHWLb_ELLeppAIa_57fJjmJDaLHIsSLkjeO3Dpk0YGLRWjqnMglcPPECbS6XB4fzBmQ5ackXK3doLpeKITkFPT8OL4_aRS4BMkSrMbEFDfnNs7Ao6NTfNb0="
    },
    {
      title: "iranintl.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHT7YaxfY73WsOmRHhRkA0qW97s8_noz_zCSzxRAHBIxhL9I1o_vr2jK_Xy6vTTOxbsRRCILREkmOJ9hMPbHAHsbRdbJ1Oq6Q7LgwJ6QbUJv2-QAxJ9-Waalp3fwm4"
    },
    {
      title: "youtube.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqNUE5rP3sZ_LMdICKtFbSw9VsGPzvW9LeFt1NSyFwq4MHuN73BBpHseDP1-K97CMmO9dOvp-n4UEYWun9KvNiBAq45EfwzDXDN7hlpd2solBUAAHhKoHxaTEobjlhayTI"
    },
    {
      title: "pbs.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEzO3g5tc8-0gScLQfSjU5P87Ujzpfcsx_6kKL7Vk35POF9tzG_O7wfiqy6-a0FYwCE9UkxoCwatdOeMTS5pDI9PEMLROTq3xPdCLhYungnOr20xEq_0HzXRrA3pYukOZthHQlVScmKk-pZkqOBK8_S5PYcH2LLlkhgDPtrdTyez0pitkYksWO01HvjAZEGhaTs_JLQYZNqPFLqKy0asiUIV-hulI8Bd_ue8SbIHsM2urGDP_orG8U="
    },
    {
      title: "wikipedia.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNOeOQ1SRNWHhahkWSj3lzt-waQzRNSilAIomL2Ts9f947Hecr_Tuy8GJdVMFgbdYWXN78ur2-hanDbVgLEBjRkQ3zzhRPXiCqAyc5nFPWL2c5DwmalNoPCwNqGdLLg4LX0op6ma4AM4aep93ebfui"
    },
    {
      title: "tradingeconomics.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA0nz-DtT3fYI3fBAQgGXCkVFTXnIQyrwZDsmxP9OtcBt-vqmDrT87yXxd65gOunOEmIooizh2n6JwWW1N7k2Lt3L16wOejd3T0-y0gPWNrr22zp0Y5kHnaeEYYvJ13bg7E_eeHxYNyfC2vKo="
    },
    {
      title: "time.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbHZLQrKF3FdVz_gpxs6waK6e4WrioRczcIMtOpSjNrB-fiPmEJklmmHQ3Dzcr_6xyVH_glscJCkgHofm_fcAwy3TqaxSVtdMBJ33UJ75qmrSyAxHYlneBD_rmMgK9pAGFRaYy0TENHyHzPp7mguHt8QxVxFasccXGG2DLjGgDHnjIB1RN7zI7Pl6_2R80oXurRYoQ5NYdWe3YBxmz"
    },
    {
      title: "forbes.com",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFB0Do5cd5PwRkoQiHfLaFf0Gykvtjv1r3jYV0PqD_REqsaIJXeOS7Ce7Uw3xCCM4yvY_QFhKRTi5eW5owTNkOzVbZDRrfK0Arjl7X9e7GBFpZCZLrQ6U8qmHhjz6-o3fJs74qX1JlEqBT9lZ5QEtEl"
    },
    {
      title: "un.org",
      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFikKoHdseUeloVjgVmBhVDQIJ5Exw4OqmG_20C6JC5dbnT5oau5sekcNnWZOVspysHI8CPP4DR5KM4pcaZGXCsjzy4p-YX2r6Y1wnMrBUn8MaBqpG6pfT51Qkitb290O9C_-c-bCvJkhYIEOwXEDfIGsyXpWHsGVQiTNVFQYpsFKGnylFwBIl2kpvFvh6nng3gAP9kfJWwH1UzwvdgPALVH98CecxGvNbV"
    }
  ],
  webSearchQueries: [
    "WTI Brent oil price July 4 2026 range trend Reuters Bloomberg",
    "US Iran conflict news July 4 2026 military maritime Hormuz Strait",
    "Oman Qatar mediation US Iran July 2026 status"
  ]
};

export const TRANSLATIONS = {
  zh: {
    title: "AION 地缘冲突监测系统",
    realtime: "实时",
    phaseTransition: "阶段过渡",
    node406: "7月4日节点",
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
    systemInfo: "AION 智能分析系统 · 地缘冲突模块 v2.115 · Daily",
    sources: "来源",
    searchCitations: "当日搜索引用（Google 接地）",
    searchQueriesUsed: "检索词",
    vs: "较",
    bannerSignal: "综合评分 56（↓4）：能源溢价出清导致综合分回落，焦点全面转向海峡主权博弈",
    bannerWarning: "→ 减持能源类避险头寸，维持风险资产的防御性对冲，关注谈判破裂引发的二次冲击风险",
    deescalationIntent: "伊朗资产解冻进度与美方要求长期安全保证的博弈",
    structuralRisk: "伊朗通过军事指挥部强行推行其指定的航行路线，威胁不从者将面临武力打击。",
    contradictionNote: "伊朗资产解冻进度与美方要求长期安全保证的博弈；停火协议下的军事威慑平衡与偶发袭船事件的归因困境",
    energyDeadline: "能源基础设施打击截止日",
    negotiationValidity: "谈判框架有效期",
    signalConfirmation: "此后信号方向才能确认",
    clickExpand: "点击展开详情",
    eventDetails: "详情",
    noEventDescription: "暂无详细说明。",
    conflictName: "美伊冲突",
    dayCount: "第126天",
    weightedFormula: "Σ (评分 × 权重)",
    compositeScore: "加 权 综 合 评 分"
  },
  en: {
    title: "AION Geo-Conflict Monitor",
    realtime: "LIVE",
    phaseTransition: "Phase Transition",
    node406: "Jul 4 Node",
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
    systemInfo: "AION Intelligence System · Geo-Conflict Module v2.115 · Daily",
    sources: "Sources",
    searchCitations: "Grounding sources (Google Search)",
    searchQueriesUsed: "Queries used",
    vs: "vs",
    bannerSignal: "Composite 56 (↓4): Liquidation of energy risk premiums drives score lower as focus shifts to maritime sovereignty disputes.",
    bannerWarning: "→ Reduce energy hedges, maintain defensive posture in risk assets, monitor for secondary shocks from negotiation delays.",
    deescalationIntent: "Release of Iranian assets vs. US demands for long-term verifiable security guar…",
    structuralRisk: "Iran enforces mandatory traffic separation schemes, threatening forceful responses to non-complianc…",
    contradictionNote: "Release of Iranian assets vs. US demands for long-term verifiable security guarantees; Deterrence balance under the interim deal vs. attribution challenges in …",
    energyDeadline: "Energy infrastructure strike deadline",
    negotiationValidity: "Negotiation framework validity",
    signalConfirmation: "Signal direction confirmed thereafter",
    clickExpand: "Click to expand details",
    eventDetails: "Details",
    noEventDescription: "No detailed description available.",
    conflictName: "US-Iran Conflict",
    dayCount: "Day 126",
    weightedFormula: "Σ (Score × Weight)",
    compositeScore: "WEIGHTED COMPOSITE SCORE"
  }
};

export const INITIAL_DATA = DATA_ZH;
