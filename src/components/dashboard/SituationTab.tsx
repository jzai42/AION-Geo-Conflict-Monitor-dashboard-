/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, Anchor, Compass, Sword, Zap } from "lucide-react";
import type { DashboardData, SituationCard } from "../../data";
import { cn } from "../../lib/utils";
import {
  situationBulletClasses,
  situationCardToneClasses,
  situationIconAccentClass,
  situationTagPillClasses,
} from "./situation-styles";

export function SituationTab({
  situations,
  coreContradiction,
  t,
}: {
  situations: SituationCard[];
  coreContradiction: DashboardData["coreContradiction"];
  t: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {situations.map((card, i) => (
          <div key={i} className={situationCardToneClasses(card.tagColor)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {card.icon === "Military" && (
                  <Sword className={cn("w-5 h-5", situationIconAccentClass("Military", card.tagColor))} />
                )}
                {card.icon === "Shipping" && (
                  <Anchor className={cn("w-5 h-5", situationIconAccentClass("Shipping", card.tagColor))} />
                )}
                {card.icon === "Energy" && (
                  <Activity className={cn("w-5 h-5", situationIconAccentClass("Energy", card.tagColor))} />
                )}
                {card.icon === "Leadership" && (
                  <Compass className={cn("w-5 h-5", situationIconAccentClass("Leadership", card.tagColor))} />
                )}
                <h4 className="text-sm font-mono font-bold tracking-widest text-aion-text">{card.title}</h4>
              </div>
              {card.tag && <div className={situationTagPillClasses(card.tagColor)}>{card.tag}</div>}
            </div>
            <ul className="space-y-2">
              {card.points.map((p, j) => (
                <li key={j} className="flex items-start gap-2">
                  <div className={situationBulletClasses(card.tagColor)} />
                  <span className="text-[11px] text-aion-text-dim font-mono leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="aion-card border-aion-amber/20 bg-aion-amber/5 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-aion-amber" />
          <span className="aion-label text-aion-amber">{t.coreContradiction}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          <div className="flex-1 w-full bg-green-500/5 border border-green-500/20 p-6 rounded-sm">
            <div className="text-[10px] font-mono text-green-500 uppercase mb-4">{t.politicalLevel}</div>
            <ul className="space-y-2">
              {coreContradiction.political.map((p, i) => (
                <li key={i} className="text-xs text-aion-text/80 font-mono">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[10px] font-mono text-green-500/70">{t.deescalationIntent}</div>
          </div>

          <div className="text-3xl font-mono text-aion-amber">≠</div>

          <div className="flex-1 w-full bg-aion-red/5 border border-aion-red/20 p-6 rounded-sm">
            <div className="text-[10px] font-mono text-aion-red uppercase mb-4">{t.militaryLevel}</div>
            <ul className="space-y-2">
              {coreContradiction.military.map((p, i) => (
                <li key={i} className="text-xs text-aion-text/80 font-mono">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[10px] font-mono text-aion-red/70">{t.structuralRisk}</div>
          </div>
        </div>

        <p className="mt-8 text-[10px] font-mono text-aion-amber/80 italic leading-relaxed">{t.contradictionNote}</p>
      </div>
    </div>
  );
}
