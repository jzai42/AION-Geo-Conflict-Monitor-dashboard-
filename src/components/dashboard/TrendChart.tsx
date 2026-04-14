/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import type { DashboardData } from "../../data";
import { cn } from "../../lib/utils";

export function TrendChart({
  trend,
  compact,
}: {
  trend: DashboardData["scoreTrend"];
  compact?: boolean;
}) {
  const scores = (trend ?? []).map((x) => Number(x.score)).filter((n) => Number.isFinite(n));
  const chartBoxClass = cn(
    "flex w-full items-center justify-center px-1 text-[10px] text-aion-text-dim",
    compact ? "mt-2 h-24" : "mt-4 h-28",
  );
  if (scores.length === 0) {
    return (
      <div className={chartBoxClass}>
        —
      </div>
    );
  }
  const minScore = Math.min(...scores) - 5;
  const maxScore = Math.max(...scores) + 5;
  const range = Math.max(maxScore - minScore, 1e-6);

  return (
    <div
      className={cn(
        "flex items-end justify-between gap-1 w-full px-1",
        compact ? "mt-2 h-24" : "mt-4 h-28",
      )}
    >
      {trend.map((t, i) => {
        const sc = Number(t.score);
        const safe = Number.isFinite(sc) ? sc : minScore;
        return (
          <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
            <span
              className={cn(
                "text-[10px] font-mono mb-1 font-bold transition-colors",
                t.active
                  ? "text-aion-green drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]"
                  : "text-aion-text-dim group-hover:text-aion-text/70",
              )}
            >
              {Number.isFinite(sc) ? t.score : "—"}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${((safe - minScore) / range) * 60 + 20}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={cn(
                "w-full max-w-[36px] rounded-t-[4px] transition-all duration-500",
                t.active
                  ? "bg-aion-green shadow-[0_0_20px_rgba(57,255,20,0.6)]"
                  : "bg-aion-gray border-t border-x border-aion-text/5",
              )}
            />
            <span className="text-[8px] font-mono text-aion-text-dim mt-2">{t.date}</span>
          </div>
        );
      })}
    </div>
  );
}
