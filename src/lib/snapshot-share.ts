/** 当日快照文件名与分享文案（纯函数，便于单测） */

export function snapshotFilename(date: string): string {
  const safe = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : 'latest';
  return `aion-geo-monitor-${safe}.png`;
}

export function snapshotShareText(date: string, lang: 'zh' | 'en'): string {
  return lang === 'zh'
    ? `AION 地缘冲突监测 · ${date} 快照`
    : `AION Geo-Conflict Monitor · ${date} snapshot`;
}

export function canShareFiles(file: File): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false;
  const can = navigator.canShare;
  if (typeof can !== 'function') return false;
  try {
    return can.call(navigator, { files: [file] });
  } catch {
    return false;
  }
}
