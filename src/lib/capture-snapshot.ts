import { toBlob } from 'html-to-image';
import { TRANSLATIONS, type DashboardData } from '../data';
import { buildPdfSnapshot } from '../pdf/buildSnapshot';
import {
  renderReportHtml,
  SNAPSHOT_POSTER_HEIGHT,
  SNAPSHOT_POSTER_WIDTH,
} from '../pdf/reportHtml';

export const SNAPSHOT_WIDTH_PX = SNAPSHOT_POSTER_WIDTH;
export const SNAPSHOT_HEIGHT_PX = SNAPSHOT_POSTER_HEIGHT;

function mountReportOffscreen(html: string): HTMLElement {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const host = document.createElement('div');
  host.setAttribute('data-aion-snapshot-host', '1');
  host.style.cssText = [
    'position:fixed',
    `left:-10000px`,
    'top:0',
    `width:${SNAPSHOT_WIDTH_PX}px`,
    'background:#05070c',
    'pointer-events:none',
    'z-index:-1',
  ].join(';');

  for (const style of parsed.querySelectorAll('style')) {
    host.appendChild(style.cloneNode(true));
  }

  const sheet = parsed.querySelector('.sheet');
  if (!sheet) throw new Error('snapshot sheet missing');
  host.appendChild(document.importNode(sheet, true));
  document.body.appendChild(host);
  return host;
}

/**
 * 用当日仪表盘数据渲染报告模板，并导出 PNG（纯前端，不依赖 PDF API）。
 */
export async function captureDailySnapshotPng(
  data: DashboardData,
  lang: 'zh' | 'en'
): Promise<Blob> {
  const t = TRANSLATIONS[lang];
  const utc = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
  const snap = buildPdfSnapshot(data, lang, utc, t.node406);
  const html = renderReportHtml(snap);
  const host = mountReportOffscreen(html);
  const sheet = host.querySelector('.sheet') as HTMLElement | null;

  try {
    if (!sheet) throw new Error('snapshot sheet missing');
    if (document.fonts?.ready) {
      await document.fonts.ready.catch(() => undefined);
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const height = Math.max(sheet.scrollHeight, SNAPSHOT_HEIGHT_PX);
    const blob = await toBlob(sheet, {
      pixelRatio: 2,
      cacheBust: true,
      width: SNAPSHOT_WIDTH_PX,
      height,
      backgroundColor: '#05070c',
    });
    if (!blob) throw new Error('snapshot empty');
    return blob;
  } finally {
    host.remove();
  }
}
