/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { RiskFactor } from "../../data";
import { cn } from "../../lib/utils";

export function RiskFactorRow({ factor, t }: { factor: RiskFactor; t: Record<string, string> }) {
  const delta = factor.score - factor.prev;

  return (
    <div className="py-3 border-b border-aion-gray last:border-0">
      <div className="flex items-end justify-between gap-4 mb-2">
        <div className="flex min-h-[2.25rem] flex-wrap items-end gap-x-3 gap-y-1.5">
          <h4 className="text-sm font-mono leading-none tracking-widest text-aion-text">{factor.name}</h4>
          {factor.status === "AT CEILING" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-red/10 border border-aion-red/30 text-aion-red flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5" />
              {t.atCeiling}
            </div>
          )}
          {factor.change === "structural" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-yellow/10 border border-aion-yellow/30 text-aion-yellow flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {t.structuralChange}
            </div>
          )}
          {factor.status === "FAST" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-orange/10 border border-aion-orange/30 text-aion-orange">
              {t.fastVar}
            </div>
          )}
          {factor.status === "SLOW" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400">
              {t.slowVar}
            </div>
          )}
          {factor.sourceVerification === "confirmed" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-green-500/10 border border-green-500/30 text-green-500 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              {t.factorVerified}
            </div>
          )}
          {factor.sourceVerification === "partial" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-orange/10 border border-aion-orange/30 text-aion-orange flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {t.factorPartial}
            </div>
          )}
          {factor.sourceVerification === "unverified" && (
            <div className="px-2 py-0.5 rounded-sm text-[8px] font-mono bg-aion-red/10 border border-aion-red/30 text-aion-red flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {t.factorUnverified}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-end justify-end">
          <div className="text-right">
            <div className="flex items-end gap-2">
              <span className="pb-0.5 text-[9px] font-mono leading-none text-aion-text-dim">
                {t.weight}:{Math.round(factor.weight * 100)}%
              </span>
              {delta !== 0 && (
                <span
                  className={cn(
                    "pb-0.5 text-[10px] font-mono leading-none",
                    delta > 0 ? "text-aion-red" : "text-green-500",
                  )}
                >
                  {delta > 0 ? "▲" : "▼"}
                  {Math.abs(delta).toFixed(1)}
                </span>
              )}
              <span className="text-2xl font-mono font-bold leading-none text-aion-red">
                {(Number.isFinite(Number(factor.score)) ? Number(factor.score) : 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-1.5 bg-aion-gray rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(factor.score / 5) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            factor.status === "AT CEILING" ? "bg-aion-red" : "bg-aion-orange",
          )}
        />
        {factor.status === "AT CEILING" && (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,var(--aion-stripe)_5px,var(--aion-stripe)_10px)]" />
        )}
      </div>

      <p className="text-[10px] text-aion-text-dim font-mono leading-relaxed">{factor.description}</p>
    </div>
  );
}
