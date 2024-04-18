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

import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Images } from './collections/media/Images'
import { Videos } from './collections/media/Videos'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'

import { AllBlocks } from './globals/AllBlocks'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { GlobalTypography } from './globals/GlobalTypography'

import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: config => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
          },
        },
      }
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      SlateToLexicalFeature({}),
      HTMLConverterFeature({}),
    ],
  }),
  collections: [Users, Products, Categories, Images, Videos, Orders, Pages],
  globals: [Header, Footer, GlobalTypography, AllBlocks],
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
      webhooks: {
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      },
    }),
    seo({
      collections: ['pages', 'products', 'productPages'],
      uploadsCollection: 'images',
      tabbedUI: true,
    }),
    nestedDocs({
      collections: ['categories'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: docs => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    redirects({
      collections: ['pages', 'products'],
    }),
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
  endpoints: [
    {
      path: '/create-payment-intent',
      method: 'post',
      handler: createPaymentIntent,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: customersProxy,
    },
    {
      path: '/stripe/products',
      method: 'get',
      handler: productsProxy,
    },
  ],
  // rateLimit: {
  //   trustProxy: true,
  //   max: 1000,
  //   skip: () => true,
  //   window: 60 * 1000,
  // },
})
