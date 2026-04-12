/**
 * PDF 模板预览：与 reportHtml 同源；用于人工核对版式（?pdf=geo-monitor）
 */
import { DATA_ZH, DATA_EN, TRANSLATIONS } from '../data';
import { buildPdfSnapshot } from '../pdf/buildSnapshot';
import { renderReportHtml } from '../pdf/reportHtml';
import { parseShareUrlState } from '../lib/share-url';

export default function PdfGeoMonitor() {
  const params = parseShareUrlState(typeof window !== 'undefined' ? window.location.search : '');
  const lang = params.lang === 'en' ? 'en' : 'zh';
  const data = lang === 'zh' ? DATA_ZH : DATA_EN;
  const t = TRANSLATIONS[lang];
  const utc = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
  const snap = buildPdfSnapshot(data, lang, utc, t.node406);
  const html = renderReportHtml(snap);

  return (
    <div className="min-h-screen bg-black">
      <iframe title="AION PDF preview" className="h-screen w-full border-0" srcDoc={html} />
    </div>
  );
}
