/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock } from "lucide-react";
import type { DashboardData } from "../../data";
import { cn } from "../../lib/utils";

export function WarPhase({
  phase,
  keyChange,
  t,
}: {
  phase: DashboardData["warPhase"];
  keyChange: string;
  t: Record<string, string>;
}) {
  // level → targetLevel 表示「当前阶段评估 → 目标/走向」，箭头仅为阶段关系，不是涨跌；勿用 targetLevel.includes('5')（中文阶段名不含数字）
  return (
    <div
      className={cn(
        "aion-card flex-1 flex flex-col p-6 border-t-4 transition-all",
        "border-t-aion-orange border-x-aion-gray/20 border-b-aion-gray/20 bg-aion-text/5",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="aion-label">{t.conflictPhase}</div>
        <div className="flex items-center gap-2 bg-aion-orange/10 border border-aion-orange/30 px-3 py-1 rounded-sm">
          <Clock className="w-3 h-3 text-aion-orange" />
          <span className="text-[10px] font-mono text-aion-orange uppercase tracking-widest">{t.node406}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-2xl font-mono font-bold text-aion-red">{phase.level}</span>
        <span className="text-xl font-mono text-aion-text-dim">→</span>
        <span className="text-2xl font-mono font-bold text-green-500">{phase.targetLevel}</span>
        <span className="text-sm font-mono text-aion-text tracking-widest uppercase ml-2">{phase.title}</span>
      </div>
      <div className="text-xs font-mono text-aion-orange mb-6 tracking-widest">{phase.subTitle}</div>

      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-sm mb-6">
        <div className="text-[9px] font-mono text-green-500 uppercase mb-2 tracking-widest">{t.importantChange}</div>
        <div className="text-sm text-aion-text/90 font-mono leading-relaxed">{keyChange}</div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {phase.points.map((point, i) => (
          <div key={i} className="bg-aion-text/5 border border-aion-gray px-3 py-2 rounded-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-aion-text-dim rotate-45" />
            <span className="text-[10px] text-aion-text-dim">{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 text-aion-orange">
        <span className="text-lg">↳</span>
        <span className="text-[11px] font-mono italic">{phase.note}</span>
      </div>
    </div>
  );
}
