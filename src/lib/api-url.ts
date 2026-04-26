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
 * - 本机 localhost / 127.0.0.1（Vite 代理 /api → 8787），或
 * - Vite 开发模式（import.meta.env.DEV）：即使用局域网 IP 打开（如 http://192.168.x.x:3000），
 *   同源 /api 仍由 dev server 代理，与「仅 localhost 才显示按钮」的旧逻辑不矛盾。
 */
export function canGeneratePdf(): boolean {
  if (getApiBase()) return true;
  if (typeof window === 'undefined') return false;
  if (import.meta.env.DEV) return true;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}
