/** 与事件展示相关的纯函数（供 EventItem 使用） */

export function asString(v: unknown, fb = ""): string {
  return typeof v === "string" ? v : fb;
}

export function formatEventTimestamp(
  raw: string | undefined,
  reportDate: string,
  language: "zh" | "en",
) {
  const v = asString(raw).trim();
  if (!v || v === "AUTO") {
    return language === "zh"
      ? `${reportDate}（当日公开报道）`
      : `${reportDate} (same-day reporting)`;
  }
  return v;
}
