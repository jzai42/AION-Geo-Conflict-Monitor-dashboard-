import type { PdfLang, PdfSnapshot } from './types';
import { PDF_TEMPLATE_REVISION } from './template-version';
import { WORLD_MAP } from './world-map';

/** 页脚展示站点（与模板内容无关，不参与 contentHash） */
const PDF_SITE_URL = 'https://qz-l.com/Q54ahm';

/** 社交分享海报尺寸：与批准的 9:16 demo 保持一致。 */
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
  const common = `class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  switch (name) {
    case 'calendar':
      return `<svg ${common}><rect x="3.2" y="4.5" width="17.6" height="16" rx="2.2"/><path d="M3.2 9.2h17.6"/><path d="M8 2.8v3.2M16 2.8v3.2"/></svg>`;
    case 'oil':
      return `<svg ${common}><path d="M8.2 7.1c0-1.3 1.7-2.3 3.8-2.3s3.8 1 3.8 2.3v11.3c0 1.3-1.7 2.3-3.8 2.3s-3.8-1-3.8-2.3V7.1Z"/><path d="M8.2 7.1c0 1.2 1.7 2.2 3.8 2.2s3.8-1 3.8-2.2"/><path d="M8.2 12.4c.8.55 2.2.95 3.8.95s3-.4 3.8-.95"/><path d="M8.2 16.3c.8.55 2.2.95 3.8.95s3-.4 3.8-.95"/></svg>`;
    case 'ship':
      return `<svg ${common}><path d="M3.2 16.4 5.2 11.8h13.6l2 4.6"/><path d="M4.1 16.4h15.8c0 2.3-3.5 3.9-7.9 3.9s-7.9-1.6-7.9-3.9Z"/><path d="M12 7.2V4.2M9.2 7.2h5.6"/><path d="M8.2 11.8V8.4h7.6v3.4"/></svg>`;
    case 'handshake':
      return `<svg ${common}><path d="M12 13.1 9.3 10.4a1.55 1.55 0 0 1 0-2.2l.55-.55 3.35 3.35"/><path d="m12 13.1 2.7-2.7a1.55 1.55 0 0 1 2.2 0l.55.55-3.35 3.35"/><path d="M7.3 11.3 4.9 8.9 3.3 10.5l3.5 3.5 2.15-.75"/><path d="m16.7 11.3 2.4-2.4 1.6 1.6-3.5 3.5-2.15-.75"/><path d="M8.3 8.2 10.6 6.1l1.75 1.55L14.1 6.1 16.3 8.2"/></svg>`;
    case 'bars':
      return `<svg ${common}><path d="M4.2 19V10.5M9.6 19V5M15 19v-6.5M19.8 19V8.5"/></svg>`;
    case 'trend':
      return `<svg ${common}><path d="M4 16.8 9.8 11l3.8 3.1L20 7.2"/><path d="M14.2 7.2H20v5.8"/></svg>`;
  }
}

const MINI_BARS = `<svg class="mini-chart" viewBox="0 0 88 28" aria-hidden="true"><rect x="0" y="16" width="10" height="12" rx="1.5" fill="currentColor"/><rect x="16" y="8" width="10" height="20" rx="1.5" fill="currentColor"/><rect x="32" y="12" width="10" height="16" rx="1.5" fill="currentColor"/><rect x="48" y="4" width="10" height="24" rx="1.5" fill="currentColor"/><rect x="64" y="10" width="10" height="18" rx="1.5" fill="currentColor"/><rect x="80" y="7" width="8" height="21" rx="1.5" fill="currentColor"/></svg>`;

const MINI_SPARK = `<svg class="mini-chart spark" viewBox="0 0 160 36" aria-hidden="true"><path d="M2 28 C18 26 28 22 40 20 C52 18 60 24 72 16 C84 8 96 10 108 12 C120 14 132 6 148 8 L158 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="26" r="2.4" fill="currentColor"/><circle cx="52" cy="18" r="2.4" fill="currentColor"/><circle cx="84" cy="10" r="2.4" fill="currentColor"/><circle cx="120" cy="14" r="2.4" fill="currentColor"/><circle cx="152" cy="7" r="2.4" fill="currentColor"/></svg>`;

/** 深色海报快照：按参考设计复刻版式、色板、地图与评分环，不改内容层级。 */
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
  const scoreLbl = esc(lbl.composite).replace('（', '<br/>（').replace(' (', '<br/>(');

  return `<!DOCTYPE html>
<html lang="${zh ? 'zh-CN' : 'en'}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <title>AION Geo-Conflict Monitor · ${esc(s.date)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    @page { size: ${SNAPSHOT_POSTER_WIDTH}px ${SNAPSHOT_POSTER_HEIGHT}px; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body {
      margin: 0;
      padding: 0;
      color-scheme: dark;
      background: #06111a;
    }
    body {
      font-family: Inter, "SF Pro Display", "PingFang SC", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif;
      color: #f4f7fa;
    }
    .sheet {
      position: relative;
      width: ${SNAPSHOT_POSTER_WIDTH}px;
      min-height: ${SNAPSHOT_POSTER_HEIGHT}px;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 35%, rgba(255, 138, 0, 0.09), transparent 34%),
        radial-gradient(circle at 50% 8%, rgba(15, 67, 92, 0.22), transparent 43%),
        #06111a;
      display: flex;
      flex-direction: column;
    }
    .world-wrap {
      position: absolute;
      left: -8%;
      right: -8%;
      top: 280px;
      height: 720px;
      pointer-events: none;
      opacity: 0.58;
      filter: saturate(0.9) drop-shadow(0 0 18px rgba(255, 138, 0, 0.18));
    }
    .world-wrap::before,
    .world-wrap::after {
      content: "";
      position: absolute;
      inset: 10% 2%;
      pointer-events: none;
    }
    .world-wrap::before {
      background:
        linear-gradient(13deg, transparent 49.82%, rgba(255,94,0,0.28) 49.94%, rgba(255,94,0,0.28) 50.06%, transparent 50.18%),
        linear-gradient(-9deg, transparent 49.86%, rgba(255,138,0,0.18) 49.95%, rgba(255,138,0,0.18) 50.05%, transparent 50.14%);
      opacity: 0.75;
    }
    .world-wrap::after {
      background:
        radial-gradient(circle at 12% 42%, rgba(255,130,0,0.95) 0 2px, rgba(255,90,0,0.28) 3px, transparent 12px),
        radial-gradient(circle at 34% 30%, rgba(255,130,0,0.95) 0 2px, rgba(255,90,0,0.25) 3px, transparent 11px),
        radial-gradient(circle at 52% 48%, rgba(255,130,0,0.95) 0 2px, rgba(255,90,0,0.28) 3px, transparent 13px),
        radial-gradient(circle at 72% 36%, rgba(255,130,0,0.95) 0 2px, rgba(255,90,0,0.24) 3px, transparent 11px),
        radial-gradient(circle at 88% 52%, rgba(255,130,0,0.95) 0 2px, rgba(255,90,0,0.28) 3px, transparent 13px);
    }
    .world-map { width: 100%; height: 100%; display: block; }
    .sheet-inner {
      position: relative;
      z-index: 1;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 44px 52px 34px;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 28px;
    }
    .head-title {
      margin: 0;
      font-size: 35px;
      font-weight: 800;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      line-height: 1.05;
      color: #f4f7fa;
    }
    .brand-accent { color: #ff9e22; }
    .head-sub {
      margin: 12px 0 0;
      font-size: 18px;
      font-weight: 500;
      color: #b8c3cf;
    }
    .head-right { text-align: right; }
    .head-link {
      display: inline-block;
      color: #ff8a00;
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.01em;
      padding: 8px 14px;
      border: 1px solid rgba(255,138,0,0.72);
      border-radius: 8px;
      background: rgba(255,138,0,0.06);
    }
    .head-meta {
      margin-top: 12px;
      font-size: 14px;
      line-height: 1.6;
      color: #7e8b98;
    }
    .head-meta b { color: #b8c3cf; font-weight: 600; }

    .metrics {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    .metric-stack {
      display: grid;
      grid-template-rows: 1.2fr 0.8fr;
      gap: 12px;
      min-height: 196px;
    }
    .metric-card {
      background: #0b1924;
      color: #f4f7fa;
      border: 1px solid #1b3b50;
      border-radius: 14px;
      padding: 24px 26px 20px;
      min-height: 196px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 28px rgba(0,0,0,0.16);
    }
    .metric-card.compact {
      min-height: 0;
      padding: 17px 20px;
      justify-content: center;
    }
    .metric-card.compact .metric-top {
      align-items: center;
    }
    .metric-card.compact .metric-ico {
      width: 30px;
      height: 30px;
      margin-top: 0;
    }
    .metric-top { display: flex; align-items: flex-start; gap: 16px; }
    .metric-ico {
      width: 34px;
      height: 34px;
      color: #69a9d0;
      flex: 0 0 auto;
      margin-top: 6px;
    }
    .metric-value {
      font-size: 48px;
      font-weight: 800;
      line-height: 0.95;
      letter-spacing: -0.04em;
      color: #ff9e22;
    }
    .metric-value.oil {
      font-size: 20px;
      letter-spacing: -0.03em;
      color: #ff9e22;
      line-height: 1.25;
      font-weight: 800;
    }
    .metric-unit {
      margin-top: 8px;
      font-size: 15px;
      color: #7e8b98;
      font-weight: 500;
    }
    .metric-split {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid #1b3b50;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
    }
    .metric-left-lbl {
      font-size: 19px;
      font-weight: 600;
      color: #b8c3cf;
    }
    .metric-right { text-align: right; }
    .metric-delta {
      font-size: 38px;
      font-weight: 800;
      color: #ff9e22;
      line-height: 1;
      letter-spacing: -0.03em;
    }
    .metric-delta-sub {
      margin-top: 5px;
      font-size: 13px;
      color: #7e8b98;
      line-height: 1.3;
    }
    .hormuz-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 700;
      color: #b8c3cf;
    }
    .hormuz-row svg { width: 22px; height: 22px; color: #69a9d0; }
    .hormuz-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .hormuz-card .metric-right {
      padding-left: 18px;
      border-left: 1px solid #1b3b50;
    }

    .score-block {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px 0 24px;
      min-height: 420px;
    }
    .score-halo {
      position: absolute;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,138,0,0.22) 0%, rgba(255,100,0,0.08) 42%, transparent 69%);
      pointer-events: none;
    }
    .score-ring {
      position: relative;
      width: 368px;
      height: 368px;
      border-radius: 50%;
      padding: 14px;
      background: conic-gradient(from 210deg, #ff5a00, #ff9d00, #ffd05a, #ff8a00, #ff5a00);
      box-shadow:
        0 0 32px rgba(255,116,0,0.48),
        0 0 70px rgba(255,100,0,0.20),
        0 0 130px rgba(255,90,0,0.12);
      outline: 1px dotted rgba(255,158,34,0.56);
      outline-offset: 18px;
    }
    .score-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at center, #542000 0%, #291205 48%, #07111a 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow:
        inset 0 0 72px rgba(255,90,0,0.24),
        inset 0 0 28px rgba(0,0,0,0.55);
    }
    .score-num {
      font-size: 108px;
      font-weight: 800;
      line-height: 0.86;
      letter-spacing: -0.05em;
      color: #f4f7fa;
    }
    .score-lbl {
      margin-top: 12px;
      text-align: center;
      font-size: 19px;
      font-weight: 600;
      color: #b8c3cf;
      line-height: 1.25;
    }

    .phase-kicker {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #7e8b98;
      margin: 2px 0 14px;
    }
    .phase-kicker::before,
    .phase-kicker::after {
      content: "";
      width: 245px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,158,34,0.82));
    }
    .phase-kicker::after {
      transform: scaleX(-1);
    }
    .phase-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background:
        radial-gradient(circle at 18% 50%, rgba(255,138,0,0.18), transparent 28%),
        linear-gradient(90deg, rgba(105,40,0,0.78), rgba(45,22,7,0.75));
      color: #f4f7fa;
      border: 1px solid #ff8a00;
      border-radius: 14px;
      min-height: 130px;
      padding: 30px 34px;
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-bottom: 20px;
      box-shadow:
        0 0 24px rgba(255,120,0,0.16),
        inset 0 0 24px rgba(255,138,0,0.05);
    }
    .phase-bar svg {
      width: 48px;
      height: 48px;
      flex: 0 0 auto;
      color: #ff9e22;
      box-sizing: content-box;
      padding-right: 22px;
      border-right: 1px solid rgba(255,158,34,0.42);
    }

    .block {
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .block.structural {
      background: linear-gradient(180deg, rgba(12,72,32,0.55), rgba(5,22,20,0.85));
      border: 1px solid rgba(69,220,88,0.75);
      box-shadow: 0 0 18px rgba(52,220,82,0.08);
    }
    .block.investment {
      background: linear-gradient(180deg, rgba(105,45,0,0.52), rgba(24,17,12,0.88));
      border: 1px solid rgba(255,138,0,0.75);
      box-shadow: 0 0 20px rgba(255,120,0,0.08);
    }
    .block-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 24px;
      color: #f4f7fa;
      font-size: 30px;
      font-weight: 800;
    }
    .block-head svg { width: 28px; height: 28px; flex: 0 0 auto; }
    .block-head .mini-chart {
      margin-left: auto;
      width: 88px;
      height: 28px;
      color: currentColor;
      opacity: 0.32;
    }
    .block-head .mini-chart.spark {
      width: 150px;
      height: 32px;
    }
    .block-head.green {
      color: #f4f7fa;
      background: rgba(7, 35, 22, 0.46);
      border-bottom: 1px solid rgba(69,220,88,0.36);
    }
    .block-head.orange {
      color: #f4f7fa;
      background: rgba(57, 27, 5, 0.40);
      border-bottom: 1px solid rgba(255,138,0,0.36);
    }
    .block-head.green > svg:first-child,
    .block-head.green .mini-chart { color: #56e15f; }
    .block-head.orange > svg:first-child,
    .block-head.orange .mini-chart { color: #ff9e22; }
    .block-body {
      background: transparent;
      color: #b8c3cf;
      padding: 22px 26px 24px;
      font-size: 20px;
      line-height: 1.55;
    }
    .block-body p { margin: 0 0 14px; }
    .block-body ul { list-style: none; margin: 0; padding: 0; }
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
      background: #56e15f;
      flex: 0 0 auto;
      margin-top: 7px;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.7);
    }

    .foot {
      margin-top: 84px;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      font-size: 13px;
      color: #586674;
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
          <h1 class="head-title"><span class="brand-accent">AION</span> Geo-Conflict Monitor</h1>
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
        <div class="metric-stack">
          <article class="metric-card compact">
            <div class="metric-top">
              ${icon('oil', 'metric-ico')}
              <div>
                <div class="metric-value oil">${esc(k2.value)}</div>
                <div class="metric-unit">${esc(k2.unit)} ${esc(k2.label)}</div>
              </div>
            </div>
          </article>
          <article class="metric-card compact hormuz-card">
            <div class="hormuz-row">${icon('ship', '')}<span>${esc(k3.value)} · ${esc(k3.label)}</span></div>
            <div class="metric-right">
              <div class="metric-delta-sub">${esc(k3.unit)}<br/>${esc(lbl.oilRisk)}</div>
            </div>
          </article>
        </div>
      </section>

      <section class="score-block">
        <div class="score-halo" aria-hidden="true"></div>
        <div class="score-ring">
          <div class="score-inner">
            <div class="score-num">${esc(String(s.riskScore))}</div>
            <div class="score-lbl">${scoreLbl}</div>
          </div>
        </div>
      </section>

      <div class="phase-kicker">${esc(lbl.phaseTitle)} ${esc(s.warPhase.nodeLabel)}</div>
      <div class="phase-bar">
        ${icon('handshake', '')}
        <span>${esc(phaseLine)}</span>
      </div>

      <section class="block structural">
        <div class="block-head green">${icon('bars', '')}<span>${esc(lbl.struct)}</span>${MINI_BARS}</div>
        <div class="block-body">
          <p>${esc(s.keyChange)}</p>
          <ul>${points}</ul>
        </div>
      </section>

      <section class="block investment">
        <div class="block-head orange">${icon('trend', '')}<span>${esc(lbl.invest)}</span>${MINI_SPARK}</div>
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
