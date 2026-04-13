import type { DashboardData } from '../data';
import { TRANSLATIONS } from '../data';
import { fingerprintJson } from './fingerprint';
import type { PdfLang, PdfSnapshot } from './types';
import { PDF_TEMPLATE_REVISION } from './template-version';

function hashSnapshotPayload(data: DashboardData, lang: PdfLang): string {
  const t = TRANSLATIONS[lang];
  const payload = {
    date: data.date,
    version: data.version,
    riskScore: data.riskScore,
    prevRiskScore: data.prevRiskScore,
    keyStats: data.keyStats.map((k) => ({ label: k.label, value: k.value, unit: k.unit })),
    warPhase: data.warPhase,
    keyChange: data.keyChange,
    investmentSignal: data.investmentSignal,
    observationLines: [t.energyDeadline, t.negotiationValidity, t.signalConfirmation] as const,
  };
  return fingerprintJson(payload);
}

/** 从当前仪表盘数据构建 PDF 快照 */
/** 与后端缓存 key 对齐 */
export function getPdfCacheKey(data: DashboardData, lang: PdfLang): string {
  return `${data.date}|${lang}|${data.version}|${hashSnapshotPayload(data, lang)}|pdfT${PDF_TEMPLATE_REVISION}`;
}

export function buildPdfSnapshot(
  data: DashboardData,
  lang: PdfLang,
  utcTime: string,
  nodeLabel: string
): PdfSnapshot {
  const t = TRANSLATIONS[lang];
  return {
    lang,
    date: data.date,
    version: data.version,
    utcTime,
    riskScore: data.riskScore,
    keyStats: data.keyStats.map((k) => ({ label: k.label, value: k.value, unit: k.unit })),
    warPhase: {
      level: data.warPhase.level,
      targetLevel: data.warPhase.targetLevel,
      title: data.warPhase.title,
      subTitle: data.warPhase.subTitle,
      points: data.warPhase.points,
      nodeLabel,
    },
    keyChange: data.keyChange,
    investmentSignal: data.investmentSignal,
    observationLines: [t.energyDeadline, t.negotiationValidity, t.signalConfirmation],
    contentHash: hashSnapshotPayload(data, lang),
  };
}
