/// <reference types="vite/client" />
/// <reference types="@remix-run/node" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}