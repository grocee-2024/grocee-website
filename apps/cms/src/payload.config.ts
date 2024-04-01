import path from 'path'

import stripePlugin from '@payloadcms/plugin-stripe'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import seo from '@payloadcms/plugin-seo'
import redirects from '@payloadcms/plugin-redirects'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import {
  lexicalEditor,
  HTMLConverterFeature,
  SlateToLexicalFeature,
} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import { Config } from 'cms-types'

import Users from './collections/Users'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      SlateToLexicalFeature({}),
      HTMLConverterFeature({}),
    ],
  }),
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, '../../../packages/cms-types/index.ts'),
    declare: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, '../../../packages/cms-types/schema.graphql'),
  },
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      rest: false,
    }),
    // seo({
    //   collections: ['pages', 'products', 'productPages'],
    //   uploadsCollection: 'images',
    //   tabbedUI: true,
    // }),
    // nestedDocs({
    //   collections: ['pages'],
    //   generateLabel: (_, doc) => doc.title as string,
    //   generateURL: (docs) =>
    //     docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    // }),
    // redirects({
    //   collections: ['pages', 'products'],
    // }),
    payloadCloud(),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  localization: {
    locales: ['en', 'ua'],
    defaultLocale: 'en',
    fallback: true,
  },
  i18n: {
    fallbackLng: 'en',
    supportedLngs: ['en', 'ua'],
    debug: false,
  },
  cors: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  rateLimit: {
    trustProxy: true,
    max: 1000,
    skip: () => true,
    window: 60 * 1000,
  },
})
