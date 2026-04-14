/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StatCardFitLine } from "./StatCardFitLine";

export function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
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
