import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Share2, Link2, FileDown, Loader2, Smartphone, ImagePlus, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { buildCopyLinkUrl, buildSnapshotViewUrl, tabToShareView } from '../lib/share-url';
import type { DashboardData } from '../data';
import { readFetchErrorMessage } from '../lib/api-error';
import { apiAbsoluteUrl, canGeneratePdf } from '../lib/api-url';
import { captureDailySnapshotPng } from '../lib/capture-snapshot';
import { canShareFiles, snapshotFilename, snapshotShareText } from '../lib/snapshot-share';
import { SnapshotShareDialog } from './SnapshotShareDialog';
import { Toast, type ToastTone } from './Toast';

type PdfStatusResponse =
  | { status: 'ready'; pdfUrl: string }
  | { status: 'processing' }
  | { status: 'failed'; error?: string };

interface ShareMenuProps {
  data: DashboardData;
  language: 'zh' | 'en';
  activeTab: 'events' | 'factors' | 'situations';
}

export function ShareMenu({ data, language, activeTab }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [snapshotLoading, setSnapshotLoading] = useState(false);
  const [snapshot, setSnapshot] = useState<{ url: string; blob: Blob } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    return () => {
      if (snapshot?.url) URL.revokeObjectURL(snapshot.url);
    };
  }, [snapshot?.url]);

  const copyLink = useCallback(async () => {
    const url = buildCopyLinkUrl();
    try {
      await navigator.clipboard.writeText(url);
      setToast({ message: language === 'zh' ? '已复制当前页面链接' : 'Link copied', tone: 'success' });
    } catch {
      setToast({ message: language === 'zh' ? '复制失败，请手动复制地址栏' : 'Copy failed', tone: 'error' });
    }
    setOpen(false);
  }, [language]);

  const pollStatus = useCallback(
    async (jobId: string): Promise<string> => {
      for (let i = 0; i < 120; i++) {
        const r = await fetch(
          apiAbsoluteUrl(`/api/reports/pdf-status?jobId=${encodeURIComponent(jobId)}`)
        );
        if (!r.ok) throw new Error(await readFetchErrorMessage(r));
        const j = (await r.json()) as PdfStatusResponse;
        if (j.status === 'ready' && j.pdfUrl) return j.pdfUrl;
        if (j.status === 'failed') throw new Error(j.error || 'PDF failed');
        await new Promise((res) => setTimeout(res, 500));
      }
      throw new Error('timeout');
    },
    []
  );

  const triggerDownload = (pdfUrl: string) => {
    const a = document.createElement('a');
    a.href = apiAbsoluteUrl(pdfUrl);
    a.download = `aion-geo-monitor-${data.date}.pdf`;
    a.rel = 'noopener';
    a.click();
  };

  const generatePdf = useCallback(async () => {
    if (!canGeneratePdf()) return;
    setPdfLoading(true);
    try {
      const res = await fetch(apiAbsoluteUrl('/api/reports/generate-pdf'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: data.date,
          lang: language,
          version: data.version,
          view: tabToShareView(activeTab),
        }),
      });
      if (!res.ok) {
        throw new Error(await readFetchErrorMessage(res));
      }
      const body = (await res.json()) as {
        jobId: string;
        status: 'ready' | 'processing';
        pdfUrl?: string;
      };
      let pdfUrl: string | undefined =
        body.status === 'ready' ? body.pdfUrl : undefined;
      if (body.status === 'processing') {
        pdfUrl = await pollStatus(body.jobId);
      }
      if (!pdfUrl) throw new Error('no pdf url');
      triggerDownload(pdfUrl);
      setToast({
        message: language === 'zh' ? 'PDF 已生成并开始下载' : 'PDF ready — downloading',
        tone: 'success',
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setToast({
        message: language === 'zh' ? `生成失败：${msg}` : `Failed: ${msg}`,
        tone: 'error',
      });
    } finally {
      setPdfLoading(false);
      setOpen(false);
    }
  }, [data.date, data.version, language, activeTab, pollStatus]);

  const snapshotPageUrl = buildSnapshotViewUrl({
    lang: language,
    date: data.date,
    version: data.version,
    view: tabToShareView(activeTab),
  });

  const generateSnapshot = useCallback(async () => {
    setOpen(false);
    setSnapshotLoading(true);
    try {
      const blob = await captureDailySnapshotPng(data, language);
      setSnapshot((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return { url: URL.createObjectURL(blob), blob };
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setToast({
        message: language === 'zh' ? `快照生成失败：${msg}` : `Snapshot failed: ${msg}`,
        tone: 'error',
      });
    } finally {
      setSnapshotLoading(false);
    }
  }, [data, language]);

  const closeSnapshot = useCallback(() => {
    setSnapshot((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const shareSnapshot = useCallback(async () => {
    if (!snapshot) return;
    const file = new File([snapshot.blob], snapshotFilename(data.date), { type: 'image/png' });
    const text = snapshotShareText(data.date, language);
    try {
      if (canShareFiles(file)) {
        await navigator.share({
          title: 'AION Geo-Conflict Monitor',
          text,
          files: [file],
        });
        return;
      }
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: 'AION Geo-Conflict Monitor',
          text,
          url: snapshotPageUrl,
        });
        return;
      }
      setToast({
        message: language === 'zh' ? '当前浏览器不支持系统分享，请下载图片或复制链接' : 'System share unavailable — download or copy link',
        tone: 'info',
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setToast({
        message: language === 'zh' ? '分享已取消或失败' : 'Share cancelled or failed',
        tone: 'info',
      });
    }
  }, [snapshot, data.date, language, snapshotPageUrl]);

  const copySnapshotImage = useCallback(async () => {
    if (!snapshot) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': snapshot.blob }),
      ]);
      setToast({
        message: language === 'zh' ? '已复制快照图片，可直接粘贴分享' : 'Snapshot image copied — paste to share',
        tone: 'success',
      });
    } catch {
      setToast({
        message: language === 'zh' ? '复制图片失败，请改用下载' : 'Could not copy image — download instead',
        tone: 'error',
      });
    }
  }, [snapshot, language]);

  const startSnapshotFileDownload = useCallback(
    (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = snapshotFilename(data.date);
      a.rel = 'noopener';
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setToast({
        message: language === 'zh' ? '快照已开始下载' : 'Snapshot downloading',
        tone: 'success',
      });
    },
    [data.date, language]
  );

  const downloadSnapshot = useCallback(() => {
    if (!snapshot) return;
    startSnapshotFileDownload(snapshot.blob);
  }, [snapshot, startSnapshotFileDownload]);

  /** 分享菜单一键下载：生成当日 PNG 并立刻落盘，不打开预览对话框 */
  const downloadSnapshotFromMenu = useCallback(async () => {
    setOpen(false);
    setSnapshotLoading(true);
    try {
      const blob = await captureDailySnapshotPng(data, language);
      startSnapshotFileDownload(blob);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setToast({
        message: language === 'zh' ? `快照下载失败：${msg}` : `Snapshot download failed: ${msg}`,
        tone: 'error',
      });
    } finally {
      setSnapshotLoading(false);
    }
  }, [data, language, startSnapshotFileDownload]);

  const copySnapshotLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snapshotPageUrl);
      setToast({
        message: language === 'zh' ? '已复制当日快照链接' : 'Snapshot link copied',
        tone: 'success',
      });
    } catch {
      setToast({
        message: language === 'zh' ? '复制失败，请手动复制地址栏' : 'Copy failed',
        tone: 'error',
      });
    }
  }, [language, snapshotPageUrl]);

  const systemShare = useCallback(async () => {
    const url = buildCopyLinkUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AION Geo-Conflict Monitor',
          text: language === 'zh' ? '地缘冲突监测快照' : 'Geo-Conflict Monitor snapshot',
          url,
        });
        setOpen(false);
      } catch {
        /* user cancel */
      }
    }
  }, [language]);

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  const snapshotFile = snapshot
    ? new File([snapshot.blob], snapshotFilename(data.date), { type: 'image/png' })
    : null;
  const canShareSnapshot = Boolean(
    snapshotFile && (canShareFiles(snapshotFile) || canShare)
  );
  /** MVP：线上静态站以复制链接为主；PDF 需自建 API（VITE_API_BASE）或本地 dev，此时才展示入口 */
  const showPdfActions = canGeneratePdf();

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        data-testid="share-menu-button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 rounded-sm border border-aion-gray/50 bg-aion-text/5 px-3 py-1.5',
          'text-[10px] font-mono text-aion-text transition-all hover:border-aion-orange/50 hover:text-aion-orange'
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={snapshotLoading}
      >
        {snapshotLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Share2 className="h-3.5 w-3.5" />}
        {snapshotLoading
          ? language === 'zh'
            ? '生成快照中...'
            : 'Capturing...'
          : language === 'zh'
            ? '分享'
            : 'Share'}
      </button>

      {open && (
        <div
          className="absolute left-1/2 top-full z-[100] mt-1 min-w-[220px] -translate-x-1/2 rounded-[14px] border border-aion-gray bg-[color:var(--bg-panel)] py-1 sm:left-auto sm:right-0 sm:translate-x-0"
          role="menu"
        >
          <MenuRow
            icon={<ImagePlus className="h-3.5 w-3.5" />}
            label={language === 'zh' ? '生成当日快照' : "Generate today's snapshot"}
            onClick={() => void generateSnapshot()}
            testId="share-generate-snapshot"
          />
          <MenuRow icon={<Link2 className="h-3.5 w-3.5" />} label={language === 'zh' ? '复制链接' : 'Copy link'} onClick={copyLink} />
          <MenuRow
            icon={snapshotLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            label={
              snapshotLoading
                ? language === 'zh'
                  ? '正在下载快照...'
                  : 'Downloading snapshot...'
                : language === 'zh'
                  ? '下载快照'
                  : 'Download snapshot'
            }
            onClick={() => !snapshotLoading && void downloadSnapshotFromMenu()}
            disabled={snapshotLoading}
            testId="share-download-snapshot"
          />
          {showPdfActions && (
            <MenuRow
              icon={pdfLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileDown className="h-3.5 w-3.5" />}
              label={
                pdfLoading
                  ? language === 'zh'
                    ? '正在生成 PDF...'
                    : 'Generating PDF...'
                  : language === 'zh'
                    ? '生成 PDF'
                    : 'Generate PDF'
              }
              onClick={() => !pdfLoading && void generatePdf()}
              disabled={pdfLoading}
            />
          )}
          {canShare && (
            <MenuRow
              icon={<Smartphone className="h-3.5 w-3.5" />}
              label={language === 'zh' ? '系统分享' : 'Share via system'}
              onClick={() => void systemShare()}
            />
          )}
        </div>
      )}

      {snapshot && (
        <SnapshotShareDialog
          imageUrl={snapshot.url}
          date={data.date}
          language={language}
          canShare={canShareSnapshot}
          onShare={() => void shareSnapshot()}
          onCopyImage={() => void copySnapshotImage()}
          onDownload={downloadSnapshot}
          onCopyLink={() => void copySnapshotLink()}
          onClose={closeSnapshot}
        />
      )}

      {toast && <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />}
    </div>
  );
}

function MenuRow({
  icon,
  label,
  onClick,
  disabled,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  testId?: string;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      data-testid={testId}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] font-mono transition-colors',
        disabled ? 'cursor-not-allowed text-aion-text-dim/50' : 'text-aion-text hover:bg-aion-text/10'
      )}
    >
      <span className="text-aion-orange">{icon}</span>
      {label}
    </button>
  );
}
