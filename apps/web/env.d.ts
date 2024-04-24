declare namespace NodeJS {
  interface ProcessEnv {
    readonly WEBSITE_PUBLIC_URL: string
    readonly PAYLOAD_INTERNAL_URL: string
    readonly NEXT_PUBLIC_PAYLOAD_URL: string
    readonly REVALIDATION_KEY: string
    readonly STRIPE_SECRET_KEY: string
  }
}
