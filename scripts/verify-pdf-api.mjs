#!/usr/bin/env node
/**
 * 检测 PDF API 是否可用：健康检查 + 可选完整生成一轮（需本机已装 Chrome 或 Docker 内 Chromium）。
 * 用法：
 *   PDF_API_URL=http://127.0.0.1:8787 node scripts/verify-pdf-api.mjs
 *   VERIFY_PDF_FULL=1 node scripts/verify-pdf-api.mjs   # 会真实生成 PDF，较慢
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const base = (process.env.PDF_API_URL || 'http://127.0.0.1:8787').replace(/\/$/, '');
const full = process.env.VERIFY_PDF_FULL === '1' || process.env.VERIFY_PDF_FULL === 'true';

function readDataZhMeta() {
  const dataTs = fs.readFileSync(path.join(root, 'src/data.ts'), 'utf8');
  const block = dataTs.split('export const DATA_ZH')[1]?.split('export const DATA_EN')[0] || '';
  const date = block.match(/date:\s*"([^"]+)"/)?.[1];
  const version = block.match(/version:\s*"([^"]+)"/)?.[1];
  if (!date || !version) {
    throw new Error('无法在 src/data.ts 中解析 DATA_ZH 的 date/version');
  }
  return { date, version };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`[verify-pdf-api] PDF_API_URL=${base}  VERIFY_PDF_FULL=${full}`);

  let health;
  try {
    health = await fetch(`${base}/api/health`);
  } catch (e) {
    console.error('[verify-pdf-api] 无法连接 PDF API:', e instanceof Error ? e.message : e);
    console.error('请先启动 API：npm run dev:api  或  npm run dev');
    process.exit(1);
  }
  if (!health.ok) {
    console.error(`[verify-pdf-api] 健康检查失败: HTTP ${health.status}`);
    console.error('请先启动 API：npm run dev:api  或  npm run dev');
    process.exit(1);
  }
  const h = await health.json();
  console.log('[verify-pdf-api] 健康检查 OK:', h);

  if (!full) {
    console.log('[verify-pdf-api] 未设置 VERIFY_PDF_FULL=1，跳过生成 PDF。完整检测请执行：');
    console.log('  VERIFY_PDF_FULL=1 node scripts/verify-pdf-api.mjs');
    return;
  }

  const { date, version } = readDataZhMeta();
  console.log(`[verify-pdf-api] 使用 DATA_ZH: date=${date} version=${version}`);

  const post = await fetch(`${base}/api/reports/generate-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, lang: 'zh', version, view: 'summary' }),
  });
  const text = await post.text();
  if (!post.ok) {
    console.error(`[verify-pdf-api] 生成请求失败: HTTP ${post.status}`, text);
    process.exit(1);
  }
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    console.error('[verify-pdf-api] 响应非 JSON:', text);
    process.exit(1);
  }

  let pdfUrl = body.pdfUrl;
  if (body.status === 'processing' && body.jobId) {
    console.log('[verify-pdf-api] 异步任务 jobId=', body.jobId);
    for (let i = 0; i < 90; i++) {
      await sleep(1000);
      const st = await fetch(`${base}/api/reports/pdf-status?jobId=${encodeURIComponent(body.jobId)}`);
      const stText = await st.text();
      if (!st.ok) {
        console.error('[verify-pdf-api] 轮询失败', st.status, stText);
        process.exit(1);
      }
      const j = JSON.parse(stText);
      if (j.status === 'ready' && j.pdfUrl) {
        pdfUrl = j.pdfUrl;
        break;
      }
      if (j.status === 'failed') {
        console.error('[verify-pdf-api] 生成失败:', j.error);
        process.exit(1);
      }
      process.stdout.write('.');
    }
    console.log('');
  }

  if (!pdfUrl) {
    console.error('[verify-pdf-api] 未得到 pdfUrl');
    process.exit(1);
  }

  const dl = new URL(pdfUrl, base + '/').toString();
  const pdf = await fetch(dl);
  if (!pdf.ok || pdf.headers.get('content-type')?.indexOf('pdf') === -1) {
    console.error('[verify-pdf-api] 下载 PDF 失败:', pdf.status, await pdf.text());
    process.exit(1);
  }
  const buf = Buffer.from(await pdf.arrayBuffer());
  console.log(`[verify-pdf-api] PDF 下载 OK，大小 ${buf.length} bytes`);
  console.log('[verify-pdf-api] 全部通过。');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
