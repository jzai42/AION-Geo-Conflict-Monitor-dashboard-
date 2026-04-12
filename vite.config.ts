import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type {ServerResponse} from 'node:http';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

/** dev / preview 共用：本地 PDF API 未启动时返回 503 JSON，避免裸 500 */
const apiProxy = {
  target: 'http://127.0.0.1:8787',
  changeOrigin: true,
  configure(proxy: {on: (ev: string, fn: (...args: unknown[]) => void) => void}) {
    proxy.on('error', (err, _req, res) => {
      const out = res as ServerResponse | undefined;
      if (out?.headersSent || typeof out?.writeHead !== 'function') return;
      out.writeHead(503, {'Content-Type': 'application/json; charset=utf-8'});
      out.end(
        JSON.stringify({
          error:
            'PDF API 未启动或不可达（127.0.0.1:8787）。请使用 npm run dev 同时启动前端与 PDF 服务，或另开终端运行 npm run dev:api。',
          code: 'PDF_API_DOWN',
          detail: err instanceof Error ? err.message : String(err),
        })
      );
    });
  },
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // GitHub Pages (project site) serves app from:
    // https://<user>.github.io/<repo>/
    // Use an absolute base path to avoid issues when the URL is opened
    // without a trailing "/" (relative "./assets/..." can resolve incorrectly).
    base: '/AION-Geo-Conflict-Monitor-dashboard-/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Allow disabling HMR by setting DISABLE_HMR=true.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {'/api': apiProxy},
    },
    preview: {
      proxy: {'/api': apiProxy},
    },
  };
});
