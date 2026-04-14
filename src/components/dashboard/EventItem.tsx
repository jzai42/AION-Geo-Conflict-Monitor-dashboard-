/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { KeyEvent } from "../../data";
import { formatEventTimestamp, asString } from "../../lib/event-helpers";
import { cn } from "../../lib/utils";

export function EventItem({
  event,
  index,
  t,
  reportDate,
  language,
}: {
  event: KeyEvent;
  index: number;
  t: Record<string, string>;
  reportDate: string;
  language: "zh" | "en";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeLine = formatEventTimestamp(event.timestamp, reportDate, language);
  const desc = asString(event.description).trim();

  return (
    <div
      className={cn(
        "border-b border-aion-gray last:border-0 transition-all",
        event.critical && "bg-aion-red/5",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-aion-text/5"
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium leading-snug tracking-tight text-aion-text sm:text-[15px]">
            {event.title?.trim() ? event.title : `${t.event} ${String(index + 1).padStart(2, "0")}`}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="shrink-0 font-mono text-[10px] text-aion-text-dim">
              {t.event} {String(index + 1).padStart(2, "0")}
            </span>
            {event.verification === "confirmed" && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-green-500/30 bg-green-500/10 px-2 py-0.5">
                <CheckCircle2 className="h-2.5 w-2.5 text-green-500" />
                <span className="text-[8px] font-mono uppercase text-green-500">{t.verified}</span>
              </div>
            )}
            {event.verification === "single" && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-red/30 bg-aion-red/10 px-2 py-0.5">
                <AlertCircle className="h-2.5 w-2.5 text-aion-red" />
                <span className="text-[8px] font-mono uppercase text-aion-red">{t.singleSource}</span>
              </div>
            )}
            {event.verification === "partial" && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-orange/30 bg-aion-orange/10 px-2 py-0.5">
                <AlertCircle className="h-2.5 w-2.5 text-aion-orange" />
                <span className="text-[8px] font-mono uppercase text-aion-orange">{t.partialVerify}</span>
              </div>
            )}
            {event.highlight && (
              <div className="flex shrink-0 items-center gap-1 rounded-sm border border-aion-orange/30 bg-aion-orange/10 px-2 py-0.5">
                <Zap className="h-2.5 w-2.5 text-aion-orange" />
                <span className="text-[8px] font-mono uppercase text-aion-orange">{t.keyChange}</span>
              </div>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn("mt-0.5 h-4 w-4 shrink-0 text-aion-text-dim transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-aion-gray/50 px-4 pb-6 pt-3 sm:pl-4">
              <div className="text-[8px] font-mono uppercase tracking-widest text-aion-text-dim mb-2">
                {t.eventDetails}
              </div>
              <p className="mb-4 max-w-3xl text-xs leading-relaxed text-aion-text/80">
                {desc || t.noEventDescription}
              </p>
              {event.significance && (
                <div className="bg-aion-text/5 p-3 rounded-sm border border-aion-gray mb-4">
                  <div className="text-[8px] font-mono text-aion-text-dim uppercase mb-1 tracking-widest">
                    {t.judgementSignificance}
                  </div>
                  <p className="text-[11px] text-aion-text-dim font-mono italic">{event.significance}</p>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-[9px] font-mono text-aion-text-dim uppercase">
                  {t.source}:{" "}
                  {event.verification === "confirmed"
                    ? t.verified
                    : event.verification === "partial"
                      ? t.partialVerify
                      : t.singleSource}
                </span>
                <span className="text-[9px] font-mono text-aion-text-dim">
                  <span className="uppercase">{t.time}</span>
                  {": "}
                  <span className="normal-case text-aion-text/90">{timeLine}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
