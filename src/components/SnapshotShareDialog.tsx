import React, { useEffect } from 'react';
import { Download, Link2, Share2, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SnapshotShareDialogProps {
  imageUrl: string;
  date: string;
  language: 'zh' | 'en';
  canShare: boolean;
  onShare: () => void;
  onDownload: () => void;
  onCopyLink: () => void;
  onClose: () => void;
}

export function SnapshotShareDialog({
  imageUrl,
  date,
  language,
  canShare,
  onShare,
  onDownload,
  onCopyLink,
  onClose,
}: SnapshotShareDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const zh = language === 'zh';

  return (
    <div
      className="fixed inset-0 z-[180] flex items-center justify-center bg-black/70 p-4"
      role="presentation"
      onClick={onClose}
      data-testid="snapshot-dialog-backdrop"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="snapshot-dialog-title"
        data-testid="snapshot-dialog"
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-sm border border-aion-gray bg-aion-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-aion-gray px-4 py-3">
          <h2 id="snapshot-dialog-title" className="font-mono text-[12px] tracking-wide text-aion-text">
            {zh ? `当日快照 · ${date}` : `Today's snapshot · ${date}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-aion-text-dim hover:bg-aion-text/10 hover:text-aion-text"
            aria-label={zh ? '关闭' : 'Close'}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#e9e9e9] p-3">
          <img
            src={imageUrl}
            alt={zh ? `${date} 地缘冲突监测快照` : `Geo-conflict monitor snapshot ${date}`}
            data-testid="snapshot-preview"
            className="mx-auto max-h-[58vh] w-auto max-w-full border border-black/10 shadow-md"
          />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-aion-gray px-4 py-3">
          {canShare && (
            <ActionButton
              testId="snapshot-share"
              icon={<Share2 className="h-3.5 w-3.5" />}
              label={zh ? '分享快照' : 'Share snapshot'}
              onClick={onShare}
              primary
            />
          )}
          <ActionButton
            testId="snapshot-download"
            icon={<Download className="h-3.5 w-3.5" />}
            label={zh ? '下载图片' : 'Download image'}
            onClick={onDownload}
          />
          <ActionButton
            testId="snapshot-copy-link"
            icon={<Link2 className="h-3.5 w-3.5" />}
            label={zh ? '复制快照链接' : 'Copy snapshot link'}
            onClick={onCopyLink}
          />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  primary,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
  testId: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={cn(
        'inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-3 py-2 font-mono text-[10px] transition-colors',
        primary
          ? 'border-aion-orange/70 bg-aion-orange/15 text-aion-orange hover:bg-aion-orange/25'
          : 'border-aion-gray/60 text-aion-text hover:bg-aion-text/10'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
