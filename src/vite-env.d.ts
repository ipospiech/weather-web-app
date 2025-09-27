interface ImportMetaEnv {
  readonly VITE_GEO_API_URL: string;
  readonly VITE_GEO_API_KEY: string;
  readonly VITE_METEOMATICS_URL: string;
  readonly VITE_METEOMATICS_USER: string;
  readonly VITE_METEOMATICS_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
