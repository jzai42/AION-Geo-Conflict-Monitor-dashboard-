/**
 * 删除 server/generated-pdfs 下的缓存 PDF，避免命中旧版式。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'server', 'generated-pdfs');

if (!fs.existsSync(dir)) {
  console.log('[clean:pdf] 目录不存在，跳过:', dir);
  process.exit(0);
}

let n = 0;
for (const f of fs.readdirSync(dir)) {
  if (f.endsWith('.pdf')) {
    fs.unlinkSync(path.join(dir, f));
    n += 1;
  }
}
console.log(`[clean:pdf] 已删除 ${n} 个 PDF 缓存文件 (${dir})`);
