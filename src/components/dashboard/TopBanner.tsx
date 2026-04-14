/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function TopBanner({ t, delta }: { t: Record<string, string>; delta: number }) {
  return (
    <div
      className={cn(
        "border-b px-6 py-1.5 flex items-center justify-between text-[10px] font-mono",
        delta > 0
          ? "bg-aion-red/10 border-aion-red/20"
          : delta < 0
            ? "bg-green-500/10 border-green-500/20"
            : "bg-aion-gray/10 border-aion-gray/20",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          delta > 0 ? "text-aion-red" : delta < 0 ? "text-green-500" : "text-aion-text-dim",
        )}
      >
        {delta > 0 ? <ChevronUp className="w-3 h-3" /> : delta < 0 ? <ChevronDown className="w-3 h-3" /> : null}
        <span>{t.bannerSignal}</span>
      </div>
      <div className="flex items-center gap-2 text-aion-red">
        <AlertTriangle className="w-3 h-3" />
        <span>{t.bannerWarning}</span>
      </div>
    </div>
  );
}
