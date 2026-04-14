/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/** 单行显示：过长时缩小字号而非换行（用于顶部指标卡） */
export function StatCardFitLine({
  text,
  className,
  style,
  maxPx,
  minPx,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  maxPx: number;
  minPx: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const el = textRef.current;
    if (!wrap || !el) return;

    const fit = () => {
      const w = wrap.clientWidth;
      if (w <= 0) return;
      let size = maxPx;
      el.style.fontSize = `${size}px`;
      while (size > minPx && el.scrollWidth > w) {
        size -= 0.25;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [text, maxPx, minPx]);

  return (
    <div ref={wrapRef} className="w-full min-w-0 max-w-full px-0.5">
      <div
        ref={textRef}
        className={cn("font-mono whitespace-nowrap text-center leading-tight", className)}
        style={{ ...style, fontSize: maxPx }}
      >
        {text}
      </div>
    </div>
  );
}
