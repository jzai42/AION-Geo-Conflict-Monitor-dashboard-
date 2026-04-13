import type { PdfLang, PdfSnapshot } from './types';
import { PDF_TEMPLATE_REVISION } from './template-version';

/** 页脚展示站点（与模板内容无关，不参与 contentHash） */
const PDF_SITE_URL = 'https://qz-l.com/Q54ahm';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 参考设计：浅灰纸感底、顶栏三列定制布局、阶段标题双线、分区圆角色条卡片 */
export function renderReportHtml(s: PdfSnapshot): string {
  const titleZh = '地缘冲突监测系统';
  const titleEn = 'Geopolitical Conflict Monitoring';
  const headerSub = s.lang === 'zh' ? titleZh : titleEn;

  const lbl = {
    composite: s.lang === 'zh' ? '综合评分（加权）' : 'Composite score (weighted)',
    phaseTitle: s.lang === 'zh' ? '冲突阶段评估' : 'Conflict phase assessment',
  };

  const ks = s.keyStats;
  const k0 = ks[0] ?? { label: '—', value: '—', unit: '' };
  const k1 = ks[1] ?? { label: '—', value: '—', unit: '' };
  const k2 = ks[2] ?? { label: '—', value: '—', unit: '' };
  const k3 = ks[3] ?? { label: '—', value: '—', unit: '' };

  /** 中卡：大字号 D43 + 副行 + 底行两列（冲突天数 | ↑12 评分变化） */
  const heroMid = `
    <div class="hero-panel">
      <div class="hp-big">${esc(k0.value)}</div>
      <div class="hp-sub">${esc(k0.unit)}</div>
      <div class="hp-split">
        <div class="hp-split-cell">
          <span class="hp-split-lbl">${esc(k0.label)}</span>
        </div>
        <div class="hp-split-cell hp-split-right">
          <span class="hp-split-val">${esc(k1.value)}</span>
          <span class="hp-split-meta"><span class="hp-split-unit">${esc(k1.unit)}</span> ${esc(k1.label)}</span>
        </div>
      </div>
    </div>`;

  /** 右卡：油价行 + 底行两列（中等风险·霍尔木兹 | 常态/油价风险） */
  const oilSub =
    s.lang === 'zh'
      ? `${esc(k2.unit)} ${esc(k2.label)}`
      : `${esc(k2.unit)} ${esc(k2.label)}`;
  const riskRight =
    s.lang === 'zh'
      ? `<span class="hp-risk-pct">${esc(k3.unit)}</span><span class="hp-risk-txt"> 油价风险</span>`
      : `<span class="hp-risk-pct">${esc(k3.unit)}</span><span class="hp-risk-txt"> oil risk</span>`;

  const heroRight = `
    <div class="hero-panel">
      <div class="hp-oil-line">${esc(k2.value)}</div>
      <div class="hp-oil-sub">${oilSub}</div>
      <div class="hp-split hp-split-risk">
        <div class="hp-split-cell">
          <span class="hp-risk-combo">${esc(k3.value)} · ${esc(k3.label)}</span>
        </div>
        <div class="hp-split-cell hp-split-right hp-risk-right">
          ${riskRight}
        </div>
      </div>
    </div>`;

  const pointsList = s.warPhase.points.map((p) => `<li class="phase-b-li">${esc(p)}</li>`).join('');

  const phaseTitleCenter = `${lbl.phaseTitle} ${s.warPhase.nodeLabel}`;

  const disc = s.lang === 'zh' ? '监测用途，不构成投资建议。' : 'For monitoring only; not investment advice.';

  return `<!DOCTYPE html>
<html lang="${s.lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="light"/>
  <title>AION Geo-Conflict Monitor · ${esc(s.date)}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html {
      margin: 0;
      padding: 0;
      color-scheme: light;
      background: #e9e9e9 !important;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #e9e9e9 !important;
      background-image:
        repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px);
      color: #212121;
      font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", ui-sans-serif, system-ui, sans-serif;
      font-size: 11px;
      line-height: 1.5;
    }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      flex-direction: column;
    }
    .sheet-body {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 0 11mm;
    }
    .sheet-spacer { flex: 1 1 auto; min-height: 0; }

    .card {
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.06);
    }

    /* —— 页头：标题左 + 右上元信息 + 短链 —— */
    .head {
      padding: 14px 0 10px;
      border-bottom: 1px solid #d0d0d0;
      margin-bottom: 12px;
    }
    .head-row1 {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 10px;
    }
    .head-title-block { flex: 1 1 auto; min-width: 0; }
    .head-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #2c2c2c;
      margin: 0 0 8px;
      line-height: 1.15;
    }
    .head-sub-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
    }
    .head-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #bdbdbd 12%, #bdbdbd 88%, transparent);
      min-width: 16px;
    }
    .head-sub {
      font-size: 12px;
      color: #424242;
      margin: 0;
      font-weight: 500;
      white-space: nowrap;
    }
    .head-right {
      flex: 0 0 auto;
      text-align: right;
      max-width: 48%;
    }
    .head-link {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 600;
      color: #e65100;
      text-decoration: none;
      padding: 4px 9px;
      border-radius: 4px;
      background: #fff8f0;
      border: 1px solid rgba(230, 81, 0, 0.35);
      word-break: break-all;
      margin-bottom: 8px;
      line-height: 1.35;
    }
    .head-meta {
      font-size: 9px;
      color: #757575;
      line-height: 1.55;
      font-family: ui-monospace, Menlo, monospace;
    }
    .head-meta strong { color: #e65100; font-weight: 700; }

    /* —— 顶栏三列 —— */
    .metrics-wrap { padding: 0 0 12px; }
    .hero-card {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;
      gap: 12px;
      padding: 16px 14px;
    }
    .hero-col-score {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-col-stack {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: stretch;
    }
    .score-circle {
      width: 108px;
      height: 108px;
      border-radius: 50%;
      background: linear-gradient(160deg, #ffb74d 0%, #ff9800 40%, #f57c00 100%);
      border: 3px solid #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(245, 124, 0, 0.35);
    }
    .score-circle-num {
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
      color: #ffffff;
      font-variant-numeric: tabular-nums;
    }
    .score-circle-lbl {
      font-size: 8px;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      line-height: 1.25;
      max-width: 90px;
    }

    .hero-panel {
      flex: 1 1 0;
      min-width: 0;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px 12px 10px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }
    .hp-big {
      font-size: 22px;
      font-weight: 800;
      color: #e65100;
      line-height: 1.1;
    }
    .hp-sub {
      font-size: 10px;
      color: #616161;
      margin-bottom: 4px;
    }
    .hp-oil-line {
      font-size: 12px;
      font-weight: 800;
      color: #e65100;
      line-height: 1.3;
    }
    .hp-oil-sub {
      font-size: 9.5px;
      color: #757575;
      margin-bottom: 4px;
    }
    .hp-split {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid #eeeeee;
    }
    .hp-split-risk { border-top: 1px solid #eeeeee; }
    .hp-split-cell { flex: 1 1 0; min-width: 0; }
    .hp-split-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }
    .hp-split-lbl { font-size: 10px; color: #616161; font-weight: 600; }
    .hp-split-val {
      font-size: 15px;
      font-weight: 800;
      color: #e65100;
    }
    .hp-split-meta { font-size: 9.5px; color: #424242; }
    .hp-split-unit { color: #757575; margin-right: 2px; }
    .hp-risk-combo { font-size: 10.5px; font-weight: 700; color: #e65100; }
    .hp-risk-right { color: #212121; }
    .hp-risk-pct { font-size: 12px; font-weight: 800; }
    .hp-risk-txt { font-size: 9.5px; color: #424242; }

    /* —— 阶段评估：标题双线 + 单卡橙条 + 白底正文 —— */
    .phase-title-band {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 4px 0 10px;
    }
    .phase-title-band .tb-line {
      flex: 1;
      height: 1px;
      background: #bdbdbd;
      min-width: 20px;
    }
    .phase-title-band .tb-text {
      font-size: 11px;
      font-weight: 700;
      color: #424242;
      white-space: nowrap;
      letter-spacing: 0.04em;
    }

    .phase-card { overflow: hidden; margin-bottom: 10px; }
    .phase-orange-only {
      padding: 11px 14px;
      background: linear-gradient(90deg, #ff9800, #fb8c00);
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .phase-body-clean {
      padding: 14px 16px 16px;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.65;
      color: #212121;
      border-radius: 0 0 8px 8px;
    }
    .phase-body-clean .p1 { margin: 0 0 10px; }
    .phase-body-clean .p2 {
      margin: 0;
      color: #e65100;
      font-weight: 600;
    }

    /* —— 绿色：独立卡片 —— */
    .struct-card { overflow: hidden; margin-bottom: 10px; }
    .sec-head-green {
      padding: 10px 14px;
      background: #2e7d32;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      border-radius: 8px 8px 0 0;
    }
    .key-body {
      padding: 12px 14px 0;
      background: #ffffff;
      font-size: 10.5px;
      color: #212121;
      line-height: 1.6;
    }
    .phase-bullets {
      margin: 0;
      padding: 8px 14px 14px 26px;
      background: #ffffff;
      list-style: disc;
      border-radius: 0 0 8px 8px;
    }
    .phase-b-li {
      margin-bottom: 7px;
      font-size: 10.5px;
      line-height: 1.55;
      color: #212121;
    }
    .phase-b-li::marker { color: #2e7d32; }

    /* —— 投资风险：橙头 + 正文 + 页脚灰字 + snapshot —— */
    .risk-card { overflow: hidden; margin-bottom: 6px; }
    .sec-head-risk {
      padding: 10px 14px;
      background: linear-gradient(90deg, #ff8f00, #f57c00);
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      border-radius: 8px 8px 0 0;
    }
    .risk-body {
      padding: 14px 16px 12px;
      background: #ffffff;
      font-size: 11px;
      color: #212121;
      line-height: 1.65;
      border-radius: 0 0 8px 8px;
    }
    .risk-foot {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 8px;
      font-size: 8.5px;
      color: #9e9e9e;
    }
    .risk-disc { flex: 1; max-width: 70%; }
    .risk-snap { font-family: ui-monospace, monospace; color: #b0b0b0; }

    .footer-mini {
      flex-shrink: 0;
      padding: 8px 11mm 10px;
      font-size: 8px;
      color: #9e9e9e;
      text-align: right;
      background: transparent;
    }
    @media print {
      html, body { background: #e9e9e9 !important; }
    }
  </style>
</head>
<body style="margin:0;">
  <div class="sheet">
  <div class="sheet-body">

    <header class="head">
      <div class="head-row1">
        <div class="head-title-block">
          <h1 class="head-title">AION Geo-Conflict Monitor</h1>
          <div class="head-sub-wrap">
            <span class="head-line" aria-hidden="true"></span>
            <p class="head-sub">${esc(headerSub)}</p>
            <span class="head-line" aria-hidden="true"></span>
          </div>
        </div>
        <div class="head-right">
          <a class="head-link" href="${PDF_SITE_URL}">${esc(PDF_SITE_URL)}</a>
          <div class="head-meta">
            <div><strong>${s.lang === 'zh' ? '日期' : 'Date'}</strong> · ${esc(s.date)}</div>
            <div><strong>UTC</strong> · ${esc(s.utcTime)}</div>
            <div><strong>${s.lang === 'zh' ? '版本' : 'Version'}</strong> · ${esc(s.version)}</div>
          </div>
        </div>
      </div>
    </header>

    <section class="metrics-wrap">
      <div class="hero-card card">
        <div class="hero-col-score">
          <div class="score-circle">
            <span class="score-circle-num">${esc(String(s.riskScore))}</span>
            <span class="score-circle-lbl">${esc(lbl.composite)}</span>
          </div>
        </div>
        <div class="hero-col-stack">${heroMid}</div>
        <div class="hero-col-stack">${heroRight}</div>
      </div>
    </section>

    <div class="phase-title-band">
      <span class="tb-line" aria-hidden="true"></span>
      <span class="tb-text">${esc(phaseTitleCenter)}</span>
      <span class="tb-line" aria-hidden="true"></span>
    </div>

    <section class="block phase-card card">
      <div class="phase-orange-only">
        ${esc(s.warPhase.level)} → ${esc(s.warPhase.targetLevel)}
      </div>
      <div class="phase-body-clean">
        <p class="p1">${esc(s.warPhase.title)}</p>
        <p class="p2">${esc(s.warPhase.subTitle)}</p>
      </div>
    </section>

    <section class="block struct-card card">
      <div class="sec-head-green">${s.lang === 'zh' ? '关键结构性变化' : 'Key structural change'}</div>
      <div class="key-body">${esc(s.keyChange)}</div>
      <ul class="phase-bullets">${pointsList}</ul>
    </section>

    <section class="block risk-card card">
      <div class="sec-head-risk">${s.lang === 'zh' ? '投资风险信号' : 'Investment risk signals'}</div>
      <div class="risk-body">
        ${esc(s.investmentSignal)}
        <div class="risk-foot">
          <span class="risk-disc">${esc(disc)}</span>
          <span class="risk-snap">snapshot ${esc(s.contentHash.slice(0, 8))}</span>
        </div>
      </div>
    </section>

    <div class="sheet-spacer" aria-hidden="true"></div>
  </div>

    <footer class="footer-mini">pdfT${PDF_TEMPLATE_REVISION}</footer>
  </div>
</body>
</html>`;
}
