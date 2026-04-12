/** 解析 /api 返回的 JSON 错误体，便于 Toast 展示 */
export async function readFetchErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
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
