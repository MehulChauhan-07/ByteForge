/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other environment variables as needed
}

// No need to redefine ImportMeta as Vite includes it