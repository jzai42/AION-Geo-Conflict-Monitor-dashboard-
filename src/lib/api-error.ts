/** 解析 /api 返回的 JSON 错误体，便于 Toast 展示 */
export async function readFetchErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  const isHtml = /<html[\s>]/i.test(text) || text.includes('<!DOCTYPE');
  if (res.status === 405 || (isHtml && (res.status === 404 || res.status === 405))) {
    return (
      '静态托管不支持 PDF API（405/404）。请在本地运行 npm run dev（含 PDF 服务），' +
      '或为线上构建配置环境变量 VITE_API_BASE 指向已部署的 PDF 服务地址。'
    );
  }
  try {
    const j = JSON.parse(text) as { error?: string; code?: string; detail?: string };
    if (j.error) {
      if (j.code === 'PDF_API_DOWN') return j.error;
      return j.error;
    }
  } catch {
    /* 非 JSON */
  }
  if (text && text.length < 800) return text.trim() || `HTTP ${res.status}`;
  return `HTTP ${res.status}`;
}
