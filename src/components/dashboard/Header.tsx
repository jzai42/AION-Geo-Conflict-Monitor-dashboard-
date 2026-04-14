/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { DashboardData } from "../../data";
import { cn } from "../../lib/utils";

export function Header({
  date,
  version,
  warPhase,
  language,
  setLanguage,
  theme,
  setTheme,
  t,
  share,
}: {
  date: string;
  version: string;
  warPhase: DashboardData["warPhase"];
  language: "zh" | "en";
  setLanguage: (l: "zh" | "en") => void;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
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
    <header className="flex min-w-0 flex-col gap-4 border-b border-aion-gray bg-aion-bg px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sticky top-0 z-50">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-[0.2em] font-mono text-aion-text">{t.title}</h1>
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
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="shrink-0 rounded-sm border border-aion-gray p-2 text-aion-text-dim transition-colors hover:bg-aion-text/5 hover:text-aion-text"
            title={
              language === "zh"
                ? theme === "dark"
                  ? "切换为浅色模式"
                  : "切换为深色模式"
                : theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-1 bg-aion-text/5 p-1 rounded-sm border border-aion-gray/50">
            <button
              onClick={() => setLanguage("zh")}
              className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-mono transition-all",
                language === "zh"
                  ? "bg-aion-orange text-white font-bold shadow-[0_0_10px_rgba(255,136,0,0.3)]"
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
                  ? "bg-aion-orange text-white font-bold shadow-[0_0_10px_rgba(255,136,0,0.3)]"
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
            <div className="w-2 h-2 shrink-0 rounded-full bg-aion-orange animate-pulse" />
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
