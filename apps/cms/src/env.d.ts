declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URI: string
    readonly PAYLOAD_SECRET: string
    readonly REVALIDATION_KEY: string
    readonly PAYLOAD_PUBLIC_SERVER_URL: string
    readonly PAYLOAD_PUBLIC_WEBSITE_PUBLIC_URL: string
    readonly PAYLOAD_SEED_LOCAL_DATA: string
    readonly PAYLOAD_SEED_ADMIN_PASSWORD: string
    readonly PAYLOAD_SEED_USER_PASSWORD: string
    readonly STRIPE_SECRET_KEY: string
    readonly PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY: string
  }
}
