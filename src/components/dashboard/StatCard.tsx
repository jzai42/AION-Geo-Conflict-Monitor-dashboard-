/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StatCardFitLine } from "./StatCardFitLine";

/** 油价卡：拆出 WTI / Brent 两段（忽略后续趋势词） */
function oilPriceSplitParts(raw: string): { wti: string; brent: string } | null {
  const parts = raw
    .split(/\s*·\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
  const wtiIdx = parts.findIndex((p) => /^WTI\b/i.test(p));
  const brentIdx = parts.findIndex((p) => /^Brent\b/i.test(p));
  if (wtiIdx >= 0 && brentIdx >= 0) {
    return { wti: parts[wtiIdx], brent: parts[brentIdx] };
  }
  return null;
}

function oilPriceDisplayCore(raw: string): string {
  const s = oilPriceSplitParts(raw);
  if (s) return `${s.wti} · ${s.brent}`;
  return raw.trim();
}

export function StatCard({
  label,
  value,
  unit,
  color,
  layout = "default",
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
  layout?: "default" | "unitPrimary";
}) {
  if (layout === "unitPrimary") {
    const split = oilPriceSplitParts(value);
    const priceLine = oilPriceDisplayCore(value);
    /** 与默认布局主数字（如评分变化「↓4」）同一套字号上限，视觉权重一致 */
    const priceStyle = { color, textShadow: `0 0 15px ${color}40` } as const;
    return (
      <div
        className="aion-card flex min-h-[140px] min-w-0 flex-col items-center justify-center gap-1.5 text-center group transition-all"
        style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
      >
        {split ? (
          <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 px-0.5">
            <StatCardFitLine
              text={split.wti}
              maxPx={36}
              minPx={8}
              className="font-bold leading-none"
              style={priceStyle}
            />
            <StatCardFitLine
              text={split.brent}
              maxPx={36}
              minPx={8}
              className="mb-1 font-bold leading-none"
              style={priceStyle}
            />
          </div>
        ) : (
          <StatCardFitLine
            text={priceLine}
            maxPx={36}
            minPx={8}
            className="mb-1 font-bold"
            style={priceStyle}
          />
        )}
        <StatCardFitLine
          text={unit}
          maxPx={9}
          minPx={6}
          className="aion-label text-aion-text-dim/60"
        />
        <StatCardFitLine
          text={label}
          maxPx={10}
          minPx={6}
          className="font-mono text-aion-text-dim uppercase tracking-tighter"
        />
      </div>
    );
  }

  return (
    <div
      className="aion-card flex min-h-[120px] min-w-0 flex-col items-center justify-center text-center group transition-all"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
    >
      <StatCardFitLine
        text={value}
        maxPx={36}
        minPx={8}
        className="mb-1 font-bold"
        style={{ color, textShadow: `0 0 15px ${color}40` }}
      />
      <StatCardFitLine
        text={unit}
        maxPx={12}
        minPx={7}
        className="aion-label mb-1"
        style={{ color: `${color}cc` }}
      />
      <StatCardFitLine
        text={label}
        maxPx={10}
        minPx={6}
        className="font-mono text-aion-text-dim uppercase tracking-tighter"
      />
    </div>
  );
}
