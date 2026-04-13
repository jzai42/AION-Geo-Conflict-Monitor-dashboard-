/**
 * PDF / 报告快照：与 DashboardData 解耦，仅保留版式所需字段。
 */
export type PdfLang = 'zh' | 'en';

export interface PdfSnapshot {
  lang: PdfLang;
  date: string;
  version: string;
  utcTime: string;
  riskScore: number;
  /** 顶部四宫格指标 */
  keyStats: { label: string; value: string; unit: string }[];
  warPhase: {
    level: string;
    targetLevel: string;
    title: string;
    subTitle: string;
    points: string[];
    nodeLabel: string;
  };
  keyChange: string;
  investmentSignal: string;
  /** 关键观察节点下三条说明（与仪表盘文案一致） */
  observationLines: [string, string, string];
  /** 用于缓存：内容指纹 */
  contentHash: string;
}
