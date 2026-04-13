/**
 * PDF 生成 API：Puppeteer + 与前端共用的 HTML 模板（src/pdf/reportHtml.ts）
 */
import path from 'node:path';
import fs from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer-core';
import { DATA_ZH, DATA_EN, TRANSLATIONS } from '../src/data.ts';
import { buildPdfSnapshot, getPdfCacheKey } from '../src/pdf/buildSnapshot.ts';
import { renderReportHtml } from '../src/pdf/reportHtml.ts';
import type { PdfLang } from '../src/pdf/types.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'generated-pdfs');

type JobState =
  | { status: 'processing' }
  | { status: 'ready'; pdfUrl: string }
  | { status: 'failed'; error: string };

const jobs = new Map<string, JobState>();

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

/** 使用本机 Chrome/Chromium，避免 puppeteer 捆绑下载失败；Docker/Linux 可装 chromium 并设环境变量 */
function resolveChromeExecutable(): string {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error(
    '未找到 Chrome/Chromium。请安装浏览器或设置环境变量 PUPPETEER_EXECUTABLE_PATH=/path/to/chrome'
  );
}

function cacheFileName(cacheKey: string): string {
  return `${createHash('sha256').update(cacheKey).digest('hex').slice(0, 32)}.pdf`;
}

async function writePdfToFile(html: string, outPath: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: resolveChromeExecutable(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    /** 与屏幕一致，避免 print 媒体下背景色被压成黑/透明（浅色版式依赖背景） */
    await page.emulateMediaType('screen');
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    });
  } finally {
    await browser.close();
  }
}

ensureOutDir();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/reports/pdf-status', (req, res) => {
  const jobId = String(req.query.jobId || '');
  if (!jobId) return res.status(400).json({ error: 'missing jobId' });
  const job = jobs.get(jobId);
  if (!job) return res.status(404).json({ error: 'unknown job' });
  if (job.status === 'ready') return res.json({ status: 'ready', pdfUrl: job.pdfUrl });
  if (job.status === 'failed') return res.json({ status: 'failed', error: job.error });
  return res.json({ status: 'processing' });
});

app.get('/api/reports/pdf/download', (req, res) => {
  const f = String(req.query.f || '');
  if (!/^[\da-f]{32}\.pdf$/.test(f)) return res.status(400).send('invalid file');
  const full = path.join(OUT_DIR, f);
  if (!full.startsWith(OUT_DIR)) return res.status(400).end();
  if (!fs.existsSync(full)) return res.status(404).send('not found');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${f}"`);
  res.sendFile(full);
});

app.post('/api/reports/generate-pdf', async (req, res) => {
  try {
    const { date, lang, version, view } = req.body ?? {};
    if (!date || !lang || !version) {
      return res.status(400).json({ error: 'date, lang, version required' });
    }
    if (lang !== 'zh' && lang !== 'en') {
      return res.status(400).json({ error: 'invalid lang' });
    }
    void view;

    const data = lang === 'zh' ? DATA_ZH : DATA_EN;
    if (data.date !== date) {
      return res.status(400).json({ error: `no dataset for date ${date}` });
    }
    void version;

    const t = TRANSLATIONS[lang as PdfLang];
    const utc = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
    const snapshot = buildPdfSnapshot(data, lang as PdfLang, utc, t.node406);
    const ck = getPdfCacheKey(data, lang as PdfLang);
    const fname = cacheFileName(ck);
    const outPath = path.join(OUT_DIR, fname);
    const pdfUrl = `/api/reports/pdf/download?f=${encodeURIComponent(fname)}`;

    if (fs.existsSync(outPath)) {
      return res.json({ jobId: `cache_${fname.replace('.pdf', '')}`, status: 'ready', pdfUrl });
    }

    const jobId = `pdf_${randomBytes(12).toString('hex')}`;
    jobs.set(jobId, { status: 'processing' });
    res.json({ jobId, status: 'processing' });

    try {
      const html = renderReportHtml(snapshot);
      await writePdfToFile(html, outPath);
      jobs.set(jobId, { status: 'ready', pdfUrl });
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      jobs.set(jobId, { status: 'failed', error: err });
    }
  } catch (e) {
    console.error('[generate-pdf]', e);
    if (!res.headersSent) {
      res.status(500).json({
        error: e instanceof Error ? e.message : String(e),
        code: 'GENERATE_PDF_ERROR',
      });
    }
  }
});

const PORT = Number(process.env.PDF_API_PORT || 8787);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[aion-pdf] listening on http://127.0.0.1:${PORT}`);
});
