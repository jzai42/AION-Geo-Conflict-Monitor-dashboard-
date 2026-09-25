import type { PdfLang, PdfSnapshot } from './types';
import { PDF_TEMPLATE_REVISION } from './template-version';

/** 页脚展示站点（与模板内容无关，不参与 contentHash） */
const PDF_SITE_URL = 'https://qz-l.com/Q54ahm';

/** 社交分享海报尺寸（与参考设计一致，9:16） */
export const SNAPSHOT_POSTER_WIDTH = 1080;
export const SNAPSHOT_POSTER_HEIGHT = 1920;

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function icon(name: 'calendar' | 'oil' | 'ship' | 'handshake' | 'bars' | 'trend', cls: string): string {
  const common = `class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  switch (name) {
    case 'calendar':
      return `<svg ${common}><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v3M16 3v3"/></svg>`;
    case 'oil':
      return `<svg ${common}><path d="M8 7.2c0-1.2 1.8-2.2 4-2.2s4 1 4 2.2v11.2c0 1.2-1.8 2.2-4 2.2s-4-1-4-2.2V7.2Z"/><path d="M8 7.2c0 1.2 1.8 2.2 4 2.2s4-1 4-2.2"/><path d="M8 12.4c.8.6 2.3 1 4 1s3.2-.4 4-1"/><path d="M8 16.2c.8.6 2.3 1 4 1s3.2-.4 4-1"/></svg>`;
    case 'ship':
      return `<svg ${common}><path d="M3 16.5 5 12h14l2 4.5"/><path d="M4 16.5h16c0 2.4-3.6 4-8 4s-8-1.6-8-4Z"/><path d="M12 7V4M9 7h6"/><path d="M8 12V8h8v4"/></svg>`;
    case 'handshake':
      return `<svg ${common}><path d="M12 13.2 9.2 10.4a1.6 1.6 0 0 1 0-2.3l.6-.6 3.4 3.4"/><path d="m12 13.2 2.8-2.8a1.6 1.6 0 0 1 2.3 0l.6.6-3.4 3.4"/><path d="M7.2 11.4 4.8 9l-1.6 1.6 3.6 3.6 2.2-.8"/><path d="m16.8 11.4 2.4-2.4 1.6 1.6-3.6 3.6-2.2-.8"/><path d="M8.2 8.2 10.6 6l1.8 1.6L14.2 6l2.2 2"/></svg>`;
    case 'bars':
      return `<svg ${common}><path d="M4 19V10M10 19V5M16 19v-7M20 19V8"/></svg>`;
    case 'trend':
      return `<svg ${common}><path d="M4 17 10 11l4 3 6-8"/><path d="M14 6h6v6"/></svg>`;
  }
}

const WORLD_MAP = `<svg class="world-map" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <pattern id="worldDots" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.2" cy="1.2" r="1.05" fill="#ff9a2e"/>
    </pattern>
  </defs>
  <g fill="url(#worldDots)">
    <!-- North America -->
    <path d="M86 62c18-20 46-28 72-22 20 4 36 18 56 20 16 2 30-8 46-6 18 2 28 16 44 22 12 4 26 2 34 12 6 8 4 20-2 28-10 14-28 16-44 20-22 6-44 4-64 12-14 6-22 20-36 26-20 8-44 4-64-4-24-10-52-16-66-38-8-12-8-30 0-42 6-10 12-16 24-28z"/>
    <path d="M198 168c14-8 32-4 44 6 10 8 12 22 6 34-8 14-26 20-42 16-14-4-24-16-22-30 1-10 6-18 14-26z"/>
    <!-- South America -->
    <path d="M268 220c14-10 32-8 44 2 10 8 14 22 10 34-6 22-8 44-18 64-8 16-24 28-42 28-14 0-24-12-26-26-2-20 6-40 12-58 4-14 8-30 20-44z"/>
    <!-- Europe -->
    <path d="M468 78c16-12 36-10 52 0 12 8 18 22 14 36-4 12-16 20-28 24-16 6-34 2-46-8-10-8-12-22-6-34 4-8 8-14 14-18z"/>
    <!-- Africa -->
    <path d="M478 168c16-18 36-28 56-26 16 2 28 14 32 28 6 22 4 46-6 66-8 16-24 28-42 30-16 2-32-6-40-20-10-16-10-36-6-54 2-10 4-18 6-24z"/>
    <!-- Asia -->
    <path d="M560 70c40-18 86-16 126 2 28 12 50 32 80 36 20 3 40-6 60 0 16 4 26 18 40 24 16 8 38 6 50 18 10 10 10 26 2 38-10 16-30 20-48 24-26 6-52-2-78 2-22 4-40 16-62 18-28 4-56-6-82-16-24-10-50-16-68-34-12-12-14-32-6-48 6-12 16-18 26-24 14-8 28-12 40-20z"/>
    <path d="M690 198c18-8 40-4 54 10 12 12 12 30 2 42-12 14-32 18-50 12-16-6-26-20-24-36 1-10 8-20 18-28z"/>
    <!-- Australia -->
    <path d="M812 268c20-8 42-2 54 14 8 12 6 28-6 38-14 12-36 12-52 4-14-8-20-24-12-38 4-8 8-14 16-18z"/>
    <!-- Greenland -->
    <path d="M360 48c10-10 26-10 36-2 8 6 8 18 0 26-8 8-22 10-32 2-8-6-10-16-4-26z"/>
  </g>
</svg>`;

/** 深色海报快照：严格跟随参考设计的版式、色板与分区，不改动内容层级。 */
export function renderReportHtml(s: PdfSnapshot): string {
  const zh = s.lang === 'zh';
  const headerSub = zh ? '地缘冲突监测系统' : 'Geopolitical Conflict Monitoring';
  const lbl = {
    composite: zh ? '综合评分（加权）' : 'Composite score (weighted)',
    phaseTitle: zh ? '冲突阶段评估' : 'Conflict phase assessment',
    struct: zh ? '关键结构性变化' : 'Key structural change',
    invest: zh ? '投资风险信号' : 'Investment risk signals',
    date: zh ? '日期' : 'Date',
    version: zh ? '版本' : 'Version',
    oilRisk: zh ? '油价风险' : 'oil risk',
  };

  const ks = s.keyStats;
  const k0 = ks[0] ?? { label: '—', value: '—', unit: '' };
  const k1 = ks[1] ?? { label: '—', value: '—', unit: '' };
  const k2 = ks[2] ?? { label: '—', value: '—', unit: '' };
  const k3 = ks[3] ?? { label: '—', value: '—', unit: '' };

  const points = s.warPhase.points
    .map((p) => `<li><span class="dot"></span><span>${esc(p)}</span></li>`)
    .join('');

  const disc = zh ? '监测用途，不构成投资建议。' : 'For monitoring only; not investment advice.';
  const phaseLine = `${s.warPhase.level} → ${s.warPhase.targetLevel}`;

  return `<!DOCTYPE html>
<html lang="${zh ? 'zh-CN' : 'en'}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <title>AION Geo-Conflict Monitor · ${esc(s.date)}</title>
  <style>
    @page { size: ${SNAPSHOT_POSTER_WIDTH}px ${SNAPSHOT_POSTER_HEIGHT}px; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body {
      margin: 0;
      padding: 0;
      color-scheme: dark;
      background: #05070c;
    }
    body {
      font-family: "SF Pro Display", "SF Pro Text", "PingFang SC", "Noto Sans SC", Inter, ui-sans-serif, system-ui, sans-serif;
      color: #ffffff;
    }
    .sheet {
      position: relative;
      width: ${SNAPSHOT_POSTER_WIDTH}px;
      min-height: ${SNAPSHOT_POSTER_HEIGHT}px;
      overflow: hidden;
      background:
        radial-gradient(ellipse 80% 50% at 50% 42%, rgba(255, 140, 30, 0.16), transparent 58%),
        radial-gradient(ellipse 70% 40% at 50% 8%, rgba(20, 28, 48, 0.9), transparent 55%),
        #05070c;
      display: flex;
      flex-direction: column;
    }
    .world-wrap {
      position: absolute;
      inset: 18% -8% 22%;
      pointer-events: none;
      opacity: 0.72;
    }
    .world-map { width: 100%; height: 100%; display: block; }
    .sheet-inner {
      position: relative;
      z-index: 1;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 52px 56px 40px;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 36px;
    }
    .head-title {
      margin: 0;
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      line-height: 1.1;
      color: #ffffff;
    }
    .head-sub {
      margin: 10px 0 0;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255,255,255,0.55);
    }
    .head-right { text-align: right; }
    .head-link {
      display: inline-block;
      color: #ff8a1a;
      text-decoration: none;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    .head-meta {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.55;
      color: rgba(255,255,255,0.42);
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
    }
    .head-meta b { color: rgba(255,255,255,0.55); font-weight: 600; }

    .metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
      margin-bottom: 48px;
    }
    .metric-card {
      background: #ffffff;
      color: #111318;
      border-radius: 22px;
      padding: 26px 28px 20px;
      min-height: 188px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 28px rgba(0,0,0,0.28);
    }
    .metric-top { display: flex; align-items: flex-start; gap: 16px; }
    .metric-ico {
      width: 36px;
      height: 36px;
      color: #1a1d24;
      flex: 0 0 auto;
      margin-top: 4px;
    }
    .metric-value {
      font-size: 40px;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
      color: #111318;
    }
    .metric-value.oil {
      font-size: 22px;
      letter-spacing: -0.02em;
      color: #f08a12;
      line-height: 1.25;
      font-weight: 800;
    }
    .metric-unit {
      margin-top: 8px;
      font-size: 15px;
      color: #6b7280;
      font-weight: 500;
    }
    .metric-split {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid #ececec;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
    }
    .metric-left-lbl {
      font-size: 16px;
      font-weight: 600;
      color: #1f2430;
    }
    .metric-right { text-align: right; }
    .metric-delta {
      font-size: 28px;
      font-weight: 800;
      color: #111318;
      line-height: 1;
    }
    .metric-delta-sub {
      margin-top: 4px;
      font-size: 13px;
      color: #6b7280;
      line-height: 1.3;
    }
    .hormuz-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: #1f2430;
    }
    .hormuz-row svg { width: 22px; height: 22px; color: #1a1d24; }

    .score-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 0 28px;
    }
    .score-ring {
      width: 340px;
      height: 340px;
      border-radius: 50%;
      padding: 18px;
      background:
        radial-gradient(circle, transparent 62%, rgba(255,176,40,0.35) 70%, #ff9a1a 78%, #ff7a00 100%);
      box-shadow:
        0 0 28px rgba(255, 150, 30, 0.85),
        0 0 70px rgba(255, 120, 0, 0.45),
        0 0 140px rgba(255, 110, 0, 0.22);
    }
    .score-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 45%, #141821 0%, #0a0d14 70%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 24px rgba(0,0,0,0.45);
    }
    .score-num {
      font-size: 92px;
      font-weight: 800;
      line-height: 0.9;
      letter-spacing: -0.04em;
      color: #ffffff;
    }
    .score-lbl {
      margin-top: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: rgba(255,255,255,0.5);
      line-height: 1.25;
    }

    .phase-kicker {
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: rgba(255,255,255,0.42);
      margin: 6px 0 14px;
    }
    .phase-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      background: linear-gradient(90deg, #ff8c12, #ff9d1f);
      color: #ffffff;
      border-radius: 10px;
      padding: 20px 28px;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 0.01em;
      margin-bottom: 22px;
      box-shadow: 0 8px 24px rgba(255, 120, 0, 0.28);
    }
    .phase-bar svg { width: 34px; height: 34px; flex: 0 0 auto; }

    .block { border-radius: 12px; overflow: hidden; margin-bottom: 22px; }
    .block-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 24px;
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
    }
    .block-head svg { width: 28px; height: 28px; }
    .block-head.green {
      position: relative;
      background: linear-gradient(90deg, #12943a, #17a344);
    }
    .block-head.green::after {
      content: "";
      position: absolute;
      right: 28px;
      bottom: 10px;
      width: 88px;
      height: 28px;
      opacity: 0.28;
      background:
        linear-gradient(#fff, #fff) 0 18px / 10px 10px no-repeat,
        linear-gradient(#fff, #fff) 16px 10px / 10px 18px no-repeat,
        linear-gradient(#fff, #fff) 32px 14px / 10px 14px no-repeat,
        linear-gradient(#fff, #fff) 48px 6px / 10px 22px no-repeat,
        linear-gradient(#fff, #fff) 64px 12px / 10px 16px no-repeat;
      pointer-events: none;
    }
    .block-head.orange {
      position: relative;
      background: linear-gradient(90deg, #ff8a12, #ff9c22);
    }
    .block-head.orange::after {
      content: "";
      position: absolute;
      right: 24px;
      top: 50%;
      width: 160px;
      height: 36px;
      transform: translateY(-50%);
      opacity: 0.28;
      background:
        radial-gradient(6px 18px at 10% 70%, #fff 40%, transparent 42%),
        radial-gradient(8px 22px at 32% 40%, #fff 40%, transparent 42%),
        radial-gradient(7px 16px at 55% 60%, #fff 40%, transparent 42%),
        radial-gradient(9px 24px at 78% 35%, #fff 40%, transparent 42%),
        radial-gradient(6px 14px at 95% 55%, #fff 40%, transparent 42%);
      pointer-events: none;
    }
    .block-body {
      background: #0c1018;
      color: rgba(255,255,255,0.88);
      padding: 22px 26px 24px;
      font-size: 18px;
      line-height: 1.55;
    }
    .block-body p { margin: 0 0 14px; }
    .block-body ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .block-body li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin: 0 0 10px;
    }
    .block-body li:last-child { margin-bottom: 0; }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #22c55e;
      flex: 0 0 auto;
      margin-top: 7px;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.55);
    }

    .foot {
      margin-top: auto;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      font-size: 13px;
      color: rgba(255,255,255,0.32);
    }
    .foot-hash {
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="world-wrap">${WORLD_MAP}</div>
    <div class="sheet-inner">
      <header class="head">
        <div>
          <h1 class="head-title">AION Geo-Conflict Monitor</h1>
          <p class="head-sub">${esc(headerSub)}</p>
        </div>
        <div class="head-right">
          <a class="head-link" href="${PDF_SITE_URL}">${esc(PDF_SITE_URL)}</a>
          <div class="head-meta">
            <div><b>${esc(lbl.date)}</b> · ${esc(s.date)}</div>
            <div><b>UTC</b> · ${esc(s.utcTime)}</div>
            <div><b>${esc(lbl.version)}</b> · ${esc(s.version)}</div>
          </div>
        </div>
      </header>

      <section class="metrics">
        <article class="metric-card">
          <div class="metric-top">
            ${icon('calendar', 'metric-ico')}
            <div>
              <div class="metric-value">${esc(k0.value)}</div>
              <div class="metric-unit">${esc(k0.unit)}</div>
            </div>
          </div>
          <div class="metric-split">
            <div class="metric-left-lbl">${esc(k0.label)}</div>
            <div class="metric-right">
              <div class="metric-delta">${esc(k1.value)}</div>
              <div class="metric-delta-sub">${esc(k1.unit)} ${esc(k1.label)}</div>
            </div>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-top">
            ${icon('oil', 'metric-ico')}
            <div>
              <div class="metric-value oil">${esc(k2.value)}</div>
              <div class="metric-unit">${esc(k2.unit)} ${esc(k2.label)}</div>
            </div>
          </div>
          <div class="metric-split">
            <div class="hormuz-row">${icon('ship', '')}<span>${esc(k3.value)} · ${esc(k3.label)}</span></div>
            <div class="metric-right">
              <div class="metric-delta-sub">${esc(k3.unit)}<br/>${esc(lbl.oilRisk)}</div>
            </div>
          </div>
        </article>
      </section>

      <section class="score-block">
        <div class="score-ring">
          <div class="score-inner">
            <div class="score-num">${esc(String(s.riskScore))}</div>
            <div class="score-lbl">${esc(lbl.composite).replace('（', '<br/>（').replace(' (', '<br/>(')}</div>
          </div>
        </div>
      </section>

      <div class="phase-kicker">${esc(lbl.phaseTitle)} ${esc(s.warPhase.nodeLabel)}</div>
      <div class="phase-bar">
        ${icon('handshake', '')}
        <span>${esc(phaseLine)}</span>
      </div>

      <section class="block">
        <div class="block-head green">${icon('bars', '')}<span>${esc(lbl.struct)}</span></div>
        <div class="block-body">
          <p>${esc(s.keyChange)}</p>
          <ul>${points}</ul>
        </div>
      </section>

      <section class="block">
        <div class="block-head orange">${icon('trend', '')}<span>${esc(lbl.invest)}</span></div>
        <div class="block-body">
          <p style="margin:0">${esc(s.investmentSignal)}</p>
        </div>
      </section>

      <footer class="foot">
        <span>${esc(disc)}</span>
        <span class="foot-hash">snapshot ${esc(s.contentHash.slice(0, 8))}<br/>pdfT${PDF_TEMPLATE_REVISION}</span>
      </footer>
    </div>
  </div>
</body>
</html>`;
}
