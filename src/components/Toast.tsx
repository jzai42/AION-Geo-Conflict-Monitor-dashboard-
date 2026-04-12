import React, { useEffect } from 'react';
import { cn } from '../lib/utils';

export type ToastTone = 'success' | 'error' | 'info';

export function Toast({
  message,
  tone,
  onClose,
  durationMs = 3200,
}: {
  message: string;
  tone: ToastTone;
  onClose: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [onClose, durationMs]);

  return (
    <div
      className={cn(
        'fixed left-1/2 top-6 z-[200] -translate-x-1/2 px-4 py-2 rounded-sm border font-mono text-[11px] shadow-lg',
        tone === 'success' && 'border-green-500/40 bg-green-500/15 text-green-400',
        tone === 'error' && 'border-aion-red/40 bg-aion-red/15 text-aion-red',
        tone === 'info' && 'border-aion-orange/40 bg-aion-orange/10 text-aion-text'
      )}
      role="status"
    >
      {message}
    </div>
  );
}
