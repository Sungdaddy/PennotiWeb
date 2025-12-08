/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENROUTER_API_KEY: string
    readonly VITE_OPENROUTER_MODEL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
