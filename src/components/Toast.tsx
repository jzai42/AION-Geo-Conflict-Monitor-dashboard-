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
        'fixed left-1/2 top-6 z-[200] -translate-x-1/2 rounded-lg border px-4 py-2 font-mono text-[11px]',
        tone === 'success' && 'border-aion-green/40 bg-aion-green/15 text-aion-green',
        tone === 'error' && 'border-aion-red/40 bg-aion-red/15 text-aion-red',
        tone === 'info' && 'border-aion-orange/40 bg-aion-orange/10 text-aion-text'
      )}
      role="status"
    >
      {message}
    </div>
  );
}
