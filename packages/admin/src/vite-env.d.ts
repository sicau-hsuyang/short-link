/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 短链解析的host
   */
  VITE_SHORT_LINK_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
