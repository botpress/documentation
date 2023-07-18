declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_UNLEASH_URL: string
    readonly NEXT_PUBLIC_UNLEASH_CLIENT_KEY: string
    readonly NEXT_PUBLIC_UNLEASH_APP_NAME: string
    readonly NEXT_PUBLIC_OPENAI_API_KEY: string
    readonly ENVIRONMENT: 'local' | 'staging' | 'production'
  }
}
