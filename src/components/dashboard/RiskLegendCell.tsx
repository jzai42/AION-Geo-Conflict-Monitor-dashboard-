/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "../../lib/utils";
import { StatCardFitLine } from "./StatCardFitLine";

/** 风险档指示条：区间在上、标签在下，字号略大并在格内自适应缩小 */
export function RiskLegendCell({
  range,
  label,
  barClass,
  textClass,
}: {
  range: string;
  label: string;
  barClass: string;
  textClass: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 sm:px-1.5",
        barClass,
      )}
    >
      <StatCardFitLine
        text={range}
        maxPx={15}
        minPx={8}
        className={cn("font-mono font-semibold tabular-nums", textClass)}
      />
      <StatCardFitLine
        text={label}
        maxPx={12}
        minPx={7}
        className={cn("font-mono leading-tight", textClass)}
      />
    </div>
  );
}
