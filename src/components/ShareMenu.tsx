import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Share2, Link2, FileDown, Loader2, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import { buildCopyLinkUrl, tabToShareView } from '../lib/share-url';
import type { DashboardData } from '../data';
import { readFetchErrorMessage } from '../lib/api-error';
import { apiAbsoluteUrl, canGeneratePdf } from '../lib/api-url';
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
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

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
  /** MVP：线上静态站以复制链接为主；PDF 需自建 API（VITE_API_BASE）或本地 dev，此时才展示入口 */
  const showPdfActions = canGeneratePdf();

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 rounded-sm border border-aion-gray/50 bg-aion-text/5 px-3 py-1.5',
          'text-[10px] font-mono text-aion-text transition-all hover:border-aion-orange/50 hover:text-aion-orange'
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Share2 className="h-3.5 w-3.5" />
        {language === 'zh' ? '分享' : 'Share'}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-[100] mt-1 min-w-[200px] rounded-sm border border-aion-gray/60 bg-aion-bg py-1 shadow-xl"
          role="menu"
        >
          <MenuRow icon={<Link2 className="h-3.5 w-3.5" />} label={language === 'zh' ? '复制链接' : 'Copy link'} onClick={copyLink} />
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

      {toast && <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />}
    </div>
  );
}

function MenuRow({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
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
