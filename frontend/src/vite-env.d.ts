/// <reference types="vite/client" />

/*
 * All environment variables must be declared in the .env file
 * and must start with the VITE_ prefix to be accessible in the client-side code.
 */

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string
    readonly VITE_BACKEND_API_PREFIX: string
    readonly VITE_BACKEND_API_URL: string
    readonly VITE_LANGUAGE: "he" | "en"
}
