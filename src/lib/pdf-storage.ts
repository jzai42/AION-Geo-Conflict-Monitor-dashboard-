const KEY = 'aion_pdf_cache_v1';

export interface StoredPdfRef {
  cacheKey: string;
  pdfUrl: string;
  updatedAt: number;
}

export function loadPdfRef(): StoredPdfRef | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as StoredPdfRef;
    if (!p.cacheKey || !p.pdfUrl) return null;
    return p;
  } catch {
    return null;
  }
}

export function savePdfRef(ref: StoredPdfRef): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(ref));
  } catch {
    /* quota / private mode */
  }
}
