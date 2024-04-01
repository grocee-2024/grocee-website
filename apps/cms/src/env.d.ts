declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URI: string
    readonly PAYLOAD_SECRET: string
    readonly PAYLOAD_PUBLIC_SERVER_URL: string
    readonly PAYLOAD_PUBLIC_WEBSITE_PUBLIC_URL: string
    readonly STRIPE_SECRET_KEY: string
    readonly PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY: string
  }
}
