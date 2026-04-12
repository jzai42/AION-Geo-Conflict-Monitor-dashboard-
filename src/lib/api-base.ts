/** 后端 API 根路径：开发环境走 Vite 代理；生产可设为完整 API 域名 */
export function getApiBase(): string {
  const v = import.meta.env.VITE_API_BASE;
  return typeof v === 'string' ? v.replace(/\/$/, '') : '';
}
