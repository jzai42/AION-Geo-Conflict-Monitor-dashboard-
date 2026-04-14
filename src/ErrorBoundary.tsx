/**
 * 捕获子树渲染错误，避免整页只剩深色背景（体感「黑屏」）且无任何提示。
 */
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';

function FallbackRender({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 text-left font-mono text-sm text-red-400">
      <h1 className="mb-2 text-base font-bold text-white">页面渲染出错</h1>
      <p className="mb-4 text-gray-500">请打开浏览器开发者工具 (F12) → Console 查看完整堆栈。</p>
      <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap break-words rounded border border-red-500/30 bg-black/40 p-4 text-[11px] text-red-300">
        {error.message}
        {'\n\n'}
        {error.stack ?? ''}
      </pre>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackRender} onError={(e) => console.error('[AION]', e)}>
      {children}
    </ReactErrorBoundary>
  );
}
