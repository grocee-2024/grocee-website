declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_WEBSITE_PUBLIC_URL: string
    readonly PAYLOAD_INTERNAL_URL: string
    readonly NEXT_PUBLIC_PAYLOAD_URL: string
    readonly REVALIDATION_KEY: string
    readonly STRIPE_SECRET_KEY: string
    readonly NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string
    readonly NEXT_PUBLIC_STRIPE_CLIENT_SECRET: string
    readonly EMAIL: string
    readonly EMAIL_PASS: string
  }
}
