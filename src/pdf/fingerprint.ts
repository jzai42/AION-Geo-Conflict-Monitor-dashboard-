/** FNV-1a 风格 32-bit 指纹，浏览器与 Node 通用，用于缓存 key 片段 */
export function fingerprintJson(obj: unknown): string {
  const s = JSON.stringify(obj);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
