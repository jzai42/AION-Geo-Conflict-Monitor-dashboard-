/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  /** 复制链接使用的固定短链（无尾斜杠、无 query），不设则默认 https://qz-l.com/Q54ahm */
  readonly VITE_SHARE_COPY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
