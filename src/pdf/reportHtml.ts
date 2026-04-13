import type { PdfLang, PdfSnapshot } from './types';

/** 页脚展示站点（与模板内容无关，不参与 contentHash） */
const PDF_SITE_URL = 'https://qz-l.com/Q54ahm';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatObsDate(isoDate: string, lang: PdfLang): string {
  const parts = isoDate.split('-').map((x) => parseInt(x, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDate;
  const [, m, d] = parts;
  if (lang === 'zh') return `${m}月${d}日`;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[m - 1]} ${d}, ${parts[0]}`;
}

/** A4 竖版报告 — 浅色卡片式（白底块 + 浅灰底 + 分区色条），便于打印阅读 */
export function renderReportHtml(s: PdfSnapshot): string {
  const titleZh = '地缘冲突监测系统';
  const titleEn = 'Geopolitical Conflict Monitoring';
  const headerSub = s.lang === 'zh' ? titleZh : titleEn;

  const lbl = {
    composite: s.lang === 'zh' ? '综合评分（加权）' : 'Composite score (weighted)',
    phaseTitle: s.lang === 'zh' ? '冲突阶段评估' : 'Conflict phase assessment',
  };

  const cards = s.keyStats
    .map(
      (k) => `
    <div class="kpi-cell">
      <div class="kpi-value">${esc(k.value)}</div>
      <div class="kpi-unit">${esc(k.unit)}</div>
      <div class="kpi-label">${esc(k.label)}</div>
    </div>`
    )
    .join('');

  const pointsList = s.warPhase.points.map((p) => `<li class="phase-b-li">${esc(p)}</li>`).join('');

  const obsLines = s.observationLines
    .map((line) => `<li class="obs-li">${esc(line)}</li>`)
    .join('');

  const obsTitle = s.lang === 'zh' ? '关键观察节点' : 'Key observation nodes';

  return `<!DOCTYPE html>
<html lang="${s.lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>AION Geo-Conflict Monitor · ${esc(s.date)}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html {
      margin: 0;
      padding: 0;
      background: #e8e8ec;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e8e8ec;
      color: #1a1a1a;
      font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", ui-sans-serif, system-ui, sans-serif;
      font-size: 11px;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 0;
      background: #e8e8ec;
      display: flex;
      flex-direction: column;
    }
    .sheet-body {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 0 12mm;
    }
    .sheet-spacer {
      flex: 1 1 auto;
      min-height: 0;
      background: #e8e8ec;
    }

    .card {
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .head {
      padding: 16px 0 12px;
    }
    .head-title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px 14px;
      margin-bottom: 10px;
    }
    .head-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin: 0;
      line-height: 1.2;
    }
    .head-link {
      font-size: 10px;
      font-weight: 600;
      color: #e65100;
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 4px;
      background: #fff8f0;
      border: 1px solid rgba(230, 81, 0, 0.35);
      word-break: break-all;
      line-height: 1.35;
      max-width: 100%;
    }
    .head-sub-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
    }
    .head-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c8c8c8 15%, #c8c8c8 85%, transparent);
      min-width: 24px;
    }
    .head-sub {
      font-size: 12px;
      color: #333333;
      margin: 0;
      font-weight: 500;
      white-space: nowrap;
    }

    .meta-card {
      padding: 12px 14px;
      margin-bottom: 12px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 20px;
      font-size: 10px;
      color: #444444;
    }
    .meta-col { display: flex; flex-direction: column; gap: 6px; }
    .meta-line { font-family: ui-monospace, Menlo, monospace; }
    .meta-line strong { color: #e65100; font-weight: 700; }

    .metrics-wrap { padding: 0 0 10px; }

    .hero-card {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      gap: 16px;
      padding: 16px 16px;
      margin-bottom: 12px;
    }
    .score-circle-wrap {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .score-circle {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: linear-gradient(145deg, #ff9800 0%, #f57c00 55%, #ef6c00 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px;
      box-shadow: 0 4px 14px rgba(245, 124, 0, 0.45);
    }
    .score-circle-num {
      font-size: 30px;
      font-weight: 800;
      line-height: 1;
      color: #ffffff;
      font-variant-numeric: tabular-nums;
    }
    .score-circle-lbl {
      font-size: 8px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      text-align: center;
      line-height: 1.25;
      max-width: 84px;
    }
    .hero-kpis {
      flex: 1 1 200px;
      min-width: 0;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      height: 100%;
    }
    .kpi-cell {
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 10px 8px;
      text-align: center;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-height: 88px;
    }
    .kpi-value {
      font-size: 13px;
      font-weight: 800;
      color: #e65100;
      line-height: 1.25;
      word-break: break-word;
    }
    .kpi-unit {
      font-size: 9.5px;
      color: #bf360c;
      font-weight: 600;
    }
    .kpi-label {
      font-size: 9px;
      color: #616161;
      letter-spacing: 0.03em;
    }

    .block { padding: 8px 0; break-inside: avoid; page-break-inside: avoid; }

    .phase-card { overflow: hidden; margin-bottom: 10px; }

    .sec-head-oran {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 14px;
      background: linear-gradient(90deg, #ff9800 0%, #fb8c00 100%);
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
    .node-pill {
      font-size: 9px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      padding: 4px 10px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.45);
    }

    .phase-status-bar {
      padding: 9px 14px;
      background: #ffa726;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
    }
    .phase-status-bar .ph-a { color: #fffde7; }
    .phase-status-bar .ph-ar { margin: 0 6px; opacity: 0.95; }
    .phase-status-bar .ph-b { color: #e8f5e9; }

    .phase-body {
      padding: 12px 14px;
      background: #f5f5f5;
      border-bottom: 1px solid #eeeeee;
    }
    .phase-title-line {
      font-size: 11px;
      color: #212121;
      margin: 0 0 8px;
      line-height: 1.55;
    }
    .phase-sub {
      font-size: 10.5px;
      color: #e65100;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.04em;
      line-height: 1.5;
    }

    .sec-head-green {
      padding: 8px 14px;
      background: #43a047;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
    }
    .key-body {
      padding: 12px 14px;
      background: #ffffff;
      font-size: 11px;
      color: #212121;
      line-height: 1.6;
      border-bottom: 1px solid #eeeeee;
    }

    .phase-bullets {
      margin: 0;
      padding: 12px 14px 12px 28px;
      background: #ffffff;
      list-style: disc;
    }
    .phase-b-li {
      margin-bottom: 8px;
      font-size: 10.5px;
      line-height: 1.55;
      color: #212121;
    }
    .phase-b-li::marker {
      color: #43a047;
    }

    .obs-card { margin-bottom: 10px; overflow: hidden; }
    .obs-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: #fff8e1;
      border-bottom: 1px solid #ffe082;
      font-size: 10.5px;
      font-weight: 800;
      color: #f57c00;
      letter-spacing: 0.04em;
    }
    .obs-head::before {
      content: "◷";
      font-size: 14px;
      opacity: 0.9;
    }
    .obs-date {
      padding: 10px 14px 6px;
      font-size: 22px;
      font-weight: 800;
      color: #e65100;
      font-variant-numeric: tabular-nums;
    }
    .obs-list {
      margin: 0;
      padding: 4px 14px 14px 28px;
      list-style: disc;
      background: #ffffff;
    }
    .obs-li {
      margin-bottom: 6px;
      font-size: 10.5px;
      line-height: 1.5;
      color: #212121;
    }
    .obs-li::marker {
      color: #ffb300;
    }

    .risk-card { overflow: hidden; margin-bottom: 8px; }
    .sec-head-risk {
      padding: 10px 14px;
      background: linear-gradient(90deg, #e64a19 0%, #d84315 100%);
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
    }
    .risk-body {
      padding: 12px 14px;
      background: #ffffff;
      font-size: 11px;
      color: #212121;
      line-height: 1.6;
    }

    .footer {
      flex-shrink: 0;
      padding: 10px 12mm 12px;
      border-top: 1px solid #d0d0d4;
      font-size: 8.5px;
      color: #757575;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10px;
      background: #e0e0e4;
    }
    .footer-disclaimer { max-width: 48%; }
    .footer-right { text-align: right; max-width: 52%; }
    .footer-snap { color: #9e9e9e; font-weight: 400; }
    @media print {
      html, body { background: #e8e8ec !important; }
    }
  </style>
</head>
<body>
  <div class="sheet">
  <div class="sheet-body">

    <header class="head">
      <div class="head-title-row">
        <h1 class="head-title">AION Geo-Conflict Monitor</h1>
        <a class="head-link" href="${PDF_SITE_URL}">${esc(PDF_SITE_URL)}</a>
      </div>
      <div class="head-sub-wrap">
        <span class="head-line" aria-hidden="true"></span>
        <p class="head-sub">${esc(headerSub)}</p>
        <span class="head-line" aria-hidden="true"></span>
      </div>
    </header>

    <div class="meta-card card">
      <div class="meta-grid">
        <div class="meta-col">
          <div class="meta-line"><strong>${s.lang === 'zh' ? '日期' : 'Date'}</strong> · ${esc(s.date)}</div>
          <div class="meta-line"><strong>UTC</strong> · ${esc(s.utcTime)}</div>
        </div>
        <div class="meta-col">
          <div class="meta-line"><strong>${s.lang === 'zh' ? '版本' : 'Version'}</strong> · ${esc(s.version)}</div>
          <div class="meta-line"><strong>${s.lang === 'zh' ? '语言' : 'Language'}</strong> · ${s.lang === 'zh' ? '中文' : 'English'}</div>
        </div>
      </div>
    </div>

    <section class="metrics-wrap">
      <div class="hero-card card">
        <div class="score-circle-wrap">
          <div class="score-circle">
            <span class="score-circle-num">${esc(String(s.riskScore))}</span>
            <span class="score-circle-lbl">${esc(lbl.composite)}</span>
          </div>
        </div>
        <div class="hero-kpis">
          <div class="kpi-grid">${cards}</div>
        </div>
      </div>
    </section>

    <section class="block phase-card card">
      <div class="sec-head-oran">
        <span>${esc(lbl.phaseTitle)}</span>
        <span class="node-pill">${esc(s.warPhase.nodeLabel)}</span>
      </div>
      <div class="phase-status-bar">
        <span class="ph-a">${esc(s.warPhase.level)}</span>
        <span class="ph-ar">→</span>
        <span class="ph-b">${esc(s.warPhase.targetLevel)}</span>
      </div>
      <div class="phase-body">
        <p class="phase-title-line">${esc(s.warPhase.title)}</p>
        <p class="phase-sub">${esc(s.warPhase.subTitle)}</p>
      </div>
      <div class="sec-head-green">${s.lang === 'zh' ? '关键结构性变化' : 'Key structural change'}</div>
      <div class="key-body">${esc(s.keyChange)}</div>
      <ul class="phase-bullets">${pointsList}</ul>
    </section>

    <section class="block obs-card card">
      <div class="obs-head">${esc(obsTitle)}</div>
      <div class="obs-date">${esc(formatObsDate(s.date, s.lang))}</div>
      <ul class="obs-list">${obsLines}</ul>
    </section>

    <section class="block risk-card card">
      <div class="sec-head-risk">${s.lang === 'zh' ? '投资风险信号' : 'Investment risk signals'}</div>
      <div class="risk-body">${esc(s.investmentSignal)}</div>
    </section>

    <div class="sheet-spacer" aria-hidden="true"></div>
  </div>

    <footer class="footer">
      <span class="footer-disclaimer">${s.lang === 'zh' ? '监测用途，不构成投资建议。' : 'For monitoring only; not investment advice.'}</span>
      <span class="footer-right">
        <span class="footer-snap">snapshot ${esc(s.contentHash.slice(0, 12))}</span>
      </span>
    </footer>
  </div>
</body>
</html>`;
}
