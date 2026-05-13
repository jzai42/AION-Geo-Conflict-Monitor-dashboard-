/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import type { DashboardData } from "../../data";
import { cn } from "../../lib/utils";
import { TrendChart } from "./TrendChart";

export function RiskGauge({
  score,
  prev,
  trend,
  t,
  language,
}: {
  score: number;
  prev: number;
  trend: DashboardData["scoreTrend"];
  t: Record<string, string>;
  language: "zh" | "en";
}) {
  const delta = score - prev;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const trail = [...(trend || [])].map((x) => Number(x.score)).filter((x) => Number.isFinite(x));
  let tailFlatBars = 0;
  if (trail.length) {
    const last = trail[trail.length - 1];
    for (let i = trail.length - 1; i >= 0; i--) {
      if (trail[i] !== last) break;
      tailFlatBars += 1;
    }
  }
  const nBars = trail.length || 1;
  const fullWindowFlat = trail.length >= 2 && tailFlatBars === trail.length;
  const confidence =
    delta !== 0
      ? language === "zh"
        ? "高"
        : "High"
      : fullWindowFlat && trail.length >= 4
        ? language === "zh"
          ? "低"
          : "Low"
        : language === "zh"
          ? "中"
          : "Medium";

  return (
    <div className="aion-card flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="aion-label mb-6 text-center whitespace-pre-line">{t.riskScoreTitle}</div>

      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-aion-gray" />
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-aion-orange drop-shadow-[0_0_8px_rgba(255,136,0,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-mono font-bold">{score}</span>
          <span className="aion-label text-[10px] mt-1">{t.weightedScore}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 w-full">
        <div
          className={cn(
            "px-6 py-1 rounded-sm flex items-center gap-2 border",
            delta > 0
              ? "bg-aion-red/10 border-aion-red/30"
              : delta < 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-aion-gray/20 border-aion-gray/40",
          )}
        >
          {delta > 0 ? (
            <ChevronUp className="w-3 h-3 text-aion-red" />
          ) : delta < 0 ? (
            <ChevronDown className="w-3 h-3 text-green-500" />
          ) : null}
          <span
            className={cn(
              "font-mono text-xs",
              delta > 0 ? "text-aion-red" : delta < 0 ? "text-green-500" : "text-aion-text-dim",
            )}
          >
            {delta === 0 ? "—" : Math.abs(delta)} {t.vsPrev}
          </span>
        </div>

        <div className="w-full pt-4 border-t border-aion-gray">
          <div className="aion-label text-[9px] mb-2">{t.trendTitle}</div>
          <TrendChart trend={trend} />
          <div className="mt-2 text-[10px] font-mono text-aion-text-dim leading-tight text-center px-1">
            {language === "zh"
              ? `置信 ${confidence} · 趋势窗末端 ${tailFlatBars}/${nBars} 根同分（柱数≠自然日）`
              : `Conf ${confidence} · ${tailFlatBars}/${nBars} flat bars (trend window ≠ calendar days)`}
          </div>
        </div>
      </div>
    </div>
  );
}
