declare namespace NodeJS {
    export interface ProcessEnv {
        readonly UNLEASH_ENABLED: string
        readonly NEXT_PUBLIC_UNLEASH_URL: string
        readonly NEXT_PUBLIC_UNLEASH_CLIENT_KEY: string
        readonly NEXT_PUBLIC_UNLEASH_APP_NAME: string
    }
}