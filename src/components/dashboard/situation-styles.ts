import { cn } from "../../lib/utils";

/** 与原先 SituationTab 中 tagColor 分支逐字相同的 class 片段 */
export const SITUATION_TONE: Record<
  string,
  { card: string; tag: string; bullet: string }
> = {
  red: {
    card: "border-t-aion-red border-x-aion-red/30 border-b-aion-red/30 bg-aion-red/10",
    tag: "bg-aion-red/10 border-aion-red/30 text-aion-red",
    bullet: "bg-aion-red",
  },
  yellow: {
    card: "border-t-aion-yellow border-x-aion-yellow/30 border-b-aion-yellow/30 bg-aion-yellow/10",
    tag: "bg-aion-yellow/10 border-aion-yellow/30 text-aion-yellow",
    bullet: "bg-aion-yellow",
  },
  orange: {
    card: "border-t-aion-orange border-x-aion-orange/30 border-b-aion-orange/30 bg-aion-orange/10",
    tag: "bg-aion-orange/10 border-aion-orange/30 text-aion-orange",
    bullet: "bg-aion-orange",
  },
  green: {
    card: "border-t-aion-green border-x-aion-green/30 border-b-aion-green/30 bg-aion-green/10",
    tag: "bg-green-500/10 border-green-500/30 text-green-500",
    bullet: "bg-aion-green",
  },
};

export function situationCardToneClasses(tagColor: string | undefined) {
  const t = tagColor ? SITUATION_TONE[tagColor] : undefined;
  return cn(
    "aion-card border-t-4 transition-all",
    t?.card,
  );
}

export function situationTagPillClasses(tagColor: string | undefined) {
  const t = tagColor ? SITUATION_TONE[tagColor] : undefined;
  return cn(
    "px-2 py-0.5 rounded-sm text-[8px] font-mono border",
    t?.tag,
  );
}

export function situationBulletClasses(tagColor: string | undefined) {
  const t = tagColor ? SITUATION_TONE[tagColor] : undefined;
  return cn(
    "w-1 h-1 mt-1.5 rotate-45 shrink-0",
    t?.bullet,
  );
}

/** 与原 icon×tagColor 条件一致的强调色（不配时回落为 text-aion-text） */
export function situationIconAccentClass(
  icon: "Military" | "Shipping" | "Energy" | "Leadership",
  tagColor: string | undefined,
): string {
  if (icon === "Military" && tagColor === "red") return "text-aion-red";
  if (icon === "Shipping" && tagColor === "yellow") return "text-aion-yellow";
  if (icon === "Energy" && tagColor === "orange") return "text-aion-orange";
  if (icon === "Leadership" && tagColor === "green") return "text-aion-green";
  return "text-aion-text";
}
