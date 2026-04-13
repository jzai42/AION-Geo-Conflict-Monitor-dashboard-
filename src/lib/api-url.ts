import { getApiBase } from './api-base';

/** 拼接 API 绝对 URL：已配置 VITE_API_BASE 时用其；否则用当前站点 origin（仅本地 dev 时 Vite 会代理 /api） */
export function apiAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  const base = getApiBase();
  if (base) return `${base}${p}`;
  if (typeof window === 'undefined') return p;
  return `${window.location.origin}${p}`;
}

/**
 * 是否具备生成 PDF 的网络条件：
 * - 已设置 VITE_API_BASE（任意线上 PDF 服务），或
 * - 本机 localhost（npm run dev 时代理 /api）
 */
export function canGeneratePdf(): boolean {
  if (getApiBase()) return true;
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}
