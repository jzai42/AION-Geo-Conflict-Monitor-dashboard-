/** 可复现 URL：lang / date / version / view / tab */

export type ShareView = 'summary' | 'events' | 'factors' | 'situations';

export interface ShareUrlState {
  lang: 'zh' | 'en';
  /** YYYY-MM-DD，与 data.date 对齐 */
  date: string;
  version: string;
  /**
   * summary：概览（对应默认 events 标签语义）
   * 其它：与底部 Tab 一致
   */
  view: ShareView;
}

const VIEW_TO_TAB: Record<ShareView, 'events' | 'factors' | 'situations'> = {
  summary: 'events',
  events: 'events',
  factors: 'factors',
  situations: 'situations',
};

const TAB_TO_VIEW: Record<'events' | 'factors' | 'situations', ShareView> = {
  events: 'summary',
  factors: 'factors',
  situations: 'situations',
};

export function tabToShareView(tab: 'events' | 'factors' | 'situations'): ShareView {
  return TAB_TO_VIEW[tab];
}

export function shareViewToTab(view: ShareView): 'events' | 'factors' | 'situations' {
  return VIEW_TO_TAB[view];
}

/** 从当前地址解析分享参数（忽略 pdf 专用模式时由调用方处理） */
export function parseShareUrlState(search: string): Partial<ShareUrlState> & { pdf?: string } {
  const sp = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const out: Partial<ShareUrlState> & { pdf?: string } = {};

  const lang = sp.get('lang');
  if (lang === 'zh' || lang === 'en') out.lang = lang;

  const date = sp.get('date');
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) out.date = date;

  const version = sp.get('version');
  if (version) out.version = version;

  const view = sp.get('view');
  if (view === 'summary' || view === 'events' || view === 'factors' || view === 'situations') {
    out.view = view;
  }

  const tab = sp.get('tab');
  if (tab === 'events' || tab === 'factors' || tab === 'situations') {
    out.view = tab === 'events' ? 'summary' : tab;
  }

  const pdf = sp.get('pdf');
  if (pdf) out.pdf = pdf;

  return out;
}

function shareQueryString(state: ShareUrlState): string {
  const sp = new URLSearchParams();
  sp.set('lang', state.lang);
  sp.set('date', state.date);
  sp.set('version', state.version);
  sp.set('view', state.view);
  return sp.toString();
}

/** 构建可分享完整 URL（保留 pathname，替换 query）— 用于地址栏与当前站点一致 */
export function buildShareUrl(state: ShareUrlState): string {
  const u = new URL(typeof window !== 'undefined' ? window.location.href : 'http://localhost/');
  u.search = shareQueryString(state);
  return u.toString();
}

/**
 * 复制链接 / 系统分享用的固定短链（无 query）。可复现状态仍以地址栏 / 完整 GitHub URL 为准。
 * 构建时可设 VITE_SHARE_COPY_URL 覆盖（无尾斜杠），默认 https://qz-l.com/Q54ahm
 */
export function buildCopyLinkUrl(): string {
  const raw = import.meta.env.VITE_SHARE_COPY_URL;
  const base =
    typeof raw === 'string' && raw.trim() !== ''
      ? raw.trim().replace(/\/$/, '')
      : 'https://qz-l.com/Q54ahm';
  const u = new URL(base.startsWith('http') ? base : `https://${base}`);
  u.search = '';
  return u.toString();
}

/** 当前地址栏 query 是否与「应由仪表盘推导出的状态」一致（避免无谓 replace 或来回覆盖） */
export function isLocationSyncedWithState(state: ShareUrlState): boolean {
  if (typeof window === 'undefined') return true;
  const cur = parseShareUrlState(window.location.search);
  return (
    cur.lang === state.lang &&
    cur.date === state.date &&
    cur.version === state.version &&
    cur.view === state.view
  );
}
