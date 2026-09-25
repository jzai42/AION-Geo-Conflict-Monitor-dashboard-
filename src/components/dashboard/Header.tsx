/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import type { DashboardData } from "../../data";
import { cn } from "../../lib/utils";

export function Header({
  date,
  version,
  warPhase,
  language,
  setLanguage,
  t,
  share,
}: {
  date: string;
  version: string;
  warPhase: DashboardData["warPhase"];
  language: "zh" | "en";
  setLanguage: (l: "zh" | "en") => void;
  t: Record<string, string>;
  share: React.ReactNode;
}) {
  const [time, setTime] = useState(new Date().toISOString().replace("T", " ").split(".")[0] + " UTC");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString().replace("T", " ").split(".")[0] + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex min-w-0 flex-col gap-4 border-b border-aion-gray bg-[color:var(--bg-secondary)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-[-0.02em] text-aion-text">{t.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="aion-label text-[9px]">{t.conflictName}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{t.dayCount}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{date}</span>
            <span className="w-1 h-1 rounded-full bg-aion-gray" />
            <span className="aion-label text-[9px]">{version}</span>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 w-full flex-wrap items-center justify-start gap-x-4 gap-y-2 sm:w-auto sm:justify-end sm:gap-6">
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-1 bg-aion-text/5 p-1 rounded-sm border border-aion-gray/50">
            <button
              onClick={() => setLanguage("zh")}
              className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-mono transition-all",
                language === "zh"
                  ? "bg-aion-orange font-bold text-white shadow-[0_0_10px_rgba(255,115,0,0.28)]"
                  : "text-aion-text-dim hover:text-aion-text",
              )}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-mono transition-all",
                language === "en"
                  ? "bg-aion-orange font-bold text-white shadow-[0_0_10px_rgba(255,115,0,0.28)]"
                  : "text-aion-text-dim hover:text-aion-text",
              )}
            >
              EN
            </button>
          </div>
          {share}
        </div>
        <div className="flex min-w-0 max-w-full flex-col items-start gap-1 text-left sm:items-end sm:text-right">
          <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-0.5 font-mono text-[11px] sm:justify-end">
            <div className="aion-live-dot h-2 w-2 shrink-0 rounded-full bg-aion-orange" />
            <span className="text-aion-text-dim">{t.realtime} ·</span>
            <span className="min-w-0 break-words text-aion-text-dim">{time}</span>
          </div>
          <div className="flex max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-0.5 text-[9px] font-mono text-aion-text-dim sm:justify-end">
            <span className="break-words">
              {t.phaseTransition}：{warPhase.level} → {warPhase.targetLevel}
            </span>
            <span className="w-1 h-1 shrink-0 rounded-full bg-aion-gray" />
            <span className="break-words">{t.node406}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
