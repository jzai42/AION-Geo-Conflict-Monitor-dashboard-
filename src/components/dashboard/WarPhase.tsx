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
        "border-t-aion-orange border-x-aion-gray/20 border-b-aion-gray/20",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="aion-label">{t.conflictPhase}</div>
        <div className="flex items-center gap-2 bg-aion-orange/10 border border-aion-orange/30 px-3 py-1 rounded-sm">
          <Clock className="w-3 h-3 text-aion-orange" />
          <span className="text-[10px] font-mono text-aion-orange uppercase tracking-widest">{t.node406}</span>
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-4">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:flex sm:w-auto sm:items-baseline sm:gap-4">
          <span className="break-words text-xl font-mono font-bold leading-tight text-aion-red sm:text-2xl">{phase.level}</span>
          <span className="text-lg font-mono text-aion-text-dim sm:text-xl">→</span>
          <span className="break-words text-xl font-mono font-bold leading-tight text-aion-green sm:text-2xl">{phase.targetLevel}</span>
        </div>
        <span className="w-full break-words text-xs font-mono uppercase tracking-[0.16em] text-aion-text sm:ml-2 sm:w-auto sm:text-sm sm:tracking-widest">
          {phase.title}
        </span>
      </div>
      <div className="text-xs font-mono text-aion-orange mb-6 tracking-widest">{phase.subTitle}</div>

      <div className="mb-6 rounded-sm border border-aion-green/20 bg-aion-green/10 p-4">
        <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-aion-green">{t.importantChange}</div>
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
