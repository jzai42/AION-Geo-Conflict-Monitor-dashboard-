import type { PdfSnapshot } from './types';

/** 页脚展示站点（与模板内容无关，不参与 contentHash） */
const PDF_SITE_URL = 'https://qz-l.com/Q54ahm';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** A4 竖版报告 HTML — 与仪表盘截图布局对齐：元信息两列、综合评分条、2×2 指标、阶段评估、菱形要点 */
export function renderReportHtml(s: PdfSnapshot): string {
  const titleZh = '地缘冲突监测系统';
  const titleEn = 'Geopolitical Conflict Monitoring';
  const headerSub = s.lang === 'zh' ? titleZh : titleEn;

  const lbl = {
    composite: s.lang === 'zh' ? '综合评分（加权）' : 'Composite score (weighted)',
    phaseTitle: s.lang === 'zh' ? '冲突阶段评估' : 'Conflict phase assessment',
  };

  /** 截图顺序：大数值 → 单位行 → 底部标签；与 data.keyStats 四项一一对应 */
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

  const points = s.warPhase.points
    .map(
      (p) => `
    <div class="bullet-box">
      <span class="diamond" aria-hidden="true">◆</span>
      <p class="bullet-txt">${esc(p)}</p>
    </div>`
    )
    .join('');

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
      background: #000000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      padding: 0;
      background: #000000;
      color: #e8e8e8;
      font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", ui-sans-serif, system-ui, sans-serif;
      font-size: 10px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 0;
      background: #000000;
      display: flex;
      flex-direction: column;
    }
    .sheet-body {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 0 14mm;
    }
    .sheet-spacer {
      flex: 1 1 auto;
      min-height: 0;
      background: #000000;
    }

    .head {
      padding: 18px 0 14px;
      border-bottom: 1px solid rgba(255, 140, 0, 0.35);
    }
    .head-title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 10px 14px;
      margin-bottom: 8px;
    }
    .head-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #ffffff;
      margin: 0;
      line-height: 1.15;
    }
    .head-link {
      font-size: 10px;
      font-weight: 700;
      color: #ffcc55;
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 4px;
      background: rgba(255, 136, 0, 0.22);
      border: 1px solid rgba(255, 170, 80, 0.55);
      word-break: break-all;
      line-height: 1.35;
      max-width: 100%;
    }
    .head-sub {
      font-size: 11px;
      color: #f0f0f0;
      margin: 0;
      font-weight: 400;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 24px;
      padding: 12px 0 14px;
      font-size: 9px;
      color: rgba(180, 180, 180, 0.95);
      border-bottom: 1px solid rgba(60, 60, 60, 0.5);
    }
    .meta-col { display: flex; flex-direction: column; gap: 6px; }
    .meta-line { font-family: ui-monospace, Menlo, monospace; }
    .meta-line strong { color: #ff9933; font-weight: 600; }

    .metrics-wrap { padding: 12px 0 10px; }

    /* 整行橙框：左大分、右文案（与截图一致） */
    .score-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
      border: 1px solid rgba(255, 140, 0, 0.55);
      background: rgba(10, 10, 10, 0.95);
      margin-bottom: 12px;
    }
    .score-num {
      font-size: 48px;
      font-weight: 800;
      line-height: 1;
      color: #ff8800;
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .score-lbl {
      font-size: 11px;
      color: rgba(180, 180, 180, 0.9);
      letter-spacing: 0.02em;
    }

    /* 2×2 指标格 */
    .kpi-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 10px;
    }
    .kpi-cell {
      border: 1px solid rgba(100, 100, 100, 0.55);
      padding: 12px 10px;
      text-align: center;
      background: rgba(8, 8, 8, 0.9);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      min-height: 92px;
    }
    .kpi-value {
      font-size: 13px;
      font-weight: 700;
      color: #ff8800;
      line-height: 1.25;
      word-break: break-word;
    }
    .kpi-unit {
      font-size: 9px;
      color: rgba(255, 160, 80, 0.85);
    }
    .kpi-label {
      font-size: 8px;
      color: rgba(150, 150, 150, 0.9);
      letter-spacing: 0.04em;
    }

    .block { padding: 10px 0 8px; break-inside: avoid; page-break-inside: avoid; }

    .phase-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .phase-sec-title {
      font-size: 10px;
      color: rgba(180, 180, 180, 0.95);
      font-weight: 600;
      letter-spacing: 0.12em;
    }
    .node-tag {
      border: 1px solid rgba(255, 140, 0, 0.55);
      color: #ffaa33;
      font-size: 9px;
      padding: 4px 10px;
      font-family: ui-monospace, monospace;
    }

    .phase-headline {
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .phase-a {
      font-size: 13px;
      font-weight: 800;
      color: #ff7733;
    }
    .phase-arrow {
      color: #ff8800;
      margin: 0 4px;
      font-weight: 700;
    }
    .phase-b {
      font-size: 13px;
      font-weight: 800;
      color: #33dd66;
    }
    .phase-title-line {
      font-size: 10px;
      color: rgba(210, 210, 210, 0.9);
      margin-bottom: 4px;
    }
    .phase-sub {
      font-size: 9.5px;
      color: #e6a020;
      letter-spacing: 0.06em;
    }

    .key-box {
      border: 1px solid rgba(50, 200, 100, 0.55);
      background: rgba(0, 40, 20, 0.25);
      padding: 10px 12px;
      margin: 10px 0 12px;
    }
    .key-box .k {
      font-size: 9px;
      color: #55ee88;
      font-weight: 700;
      margin-bottom: 6px;
      letter-spacing: 0.08em;
    }
    .key-box .v {
      font-size: 10.5px;
      color: #f2f2f2;
      line-height: 1.55;
    }

    .bullet-box {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding: 10px 12px;
      margin-bottom: 8px;
      border: 1px solid rgba(80, 80, 80, 0.6);
      background: rgba(12, 12, 12, 0.95);
    }
    .diamond {
      color: rgba(200, 200, 200, 0.75);
      font-size: 8px;
      line-height: 1.6;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .bullet-txt {
      margin: 0;
      flex: 1;
      font-size: 10px;
      line-height: 1.55;
      color: rgba(220, 220, 220, 0.95);
    }

    .risk {
      border: 1px solid rgba(255, 160, 60, 0.5);
      background: rgba(35, 25, 0, 0.35);
      padding: 10px 12px;
      margin-top: 6px;
    }
    .risk .h {
      font-size: 9px;
      color: #ffaa33;
      font-weight: 700;
      margin-bottom: 6px;
      letter-spacing: 0.1em;
    }
    .risk .p {
      margin: 0;
      font-size: 10.5px;
      color: #f0f0f0;
      line-height: 1.55;
    }

    .footer {
      flex-shrink: 0;
      padding: 12px 14mm 14px;
      border-top: 1px solid rgba(60, 60, 60, 0.55);
      font-size: 8px;
      color: rgba(120, 120, 120, 0.95);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10px;
      background: #000000;
    }
    .footer-disclaimer { max-width: 42%; }
    .footer-right { text-align: right; max-width: 58%; }
    .footer-snap { color: rgba(130, 130, 130, 0.95); font-weight: 400; }
    @media print {
      html, body { background: #000000 !important; }
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
      <p class="head-sub">${esc(headerSub)}</p>
    </header>

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

    <section class="metrics-wrap">
      <div class="score-box">
        <div class="score-num">${esc(String(s.riskScore))}</div>
        <div class="score-lbl">${esc(lbl.composite)}</div>
      </div>
      <div class="kpi-grid">${cards}</div>
    </section>

    <section class="block">
      <div class="phase-head">
        <span class="phase-sec-title">${esc(lbl.phaseTitle)}</span>
        <div class="node-tag">${esc(s.warPhase.nodeLabel)}</div>
      </div>

      <div class="phase-headline">
        <span class="phase-a">${esc(s.warPhase.level)}</span>
        <span class="phase-arrow">→</span>
        <span class="phase-b">${esc(s.warPhase.targetLevel)}</span>
      </div>
      <div class="phase-title-line">${esc(s.warPhase.title)}</div>
      <div class="phase-sub">${esc(s.warPhase.subTitle)}</div>

      <div class="key-box">
        <div class="k">${s.lang === 'zh' ? '关键结构性变化' : 'Key structural change'}</div>
        <div class="v">${esc(s.keyChange)}</div>
      </div>

      ${points}
    </section>

    <section class="block">
      <div class="risk">
        <div class="h">${s.lang === 'zh' ? '投资风险信号' : 'Investment risk signals'}</div>
        <p class="p">${esc(s.investmentSignal)}</p>
      </div>
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
