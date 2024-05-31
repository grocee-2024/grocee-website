import path from 'path'

import stripePlugin from '@payloadcms/plugin-stripe'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import seo from '@payloadcms/plugin-seo'
import redirects from '@payloadcms/plugin-redirects'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import {
  lexicalEditor,
  HTMLConverterFeature,
  SlateToLexicalFeature,
  BlocksFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import { Config } from 'cms-types'

import { Users } from './collections/admin/Users'
import { Images } from './collections/media/Images'

import { News } from './collections/News'

import { Products } from './collections/shop/Products'
import { Categories } from './collections/shop/Categories'
import { Subcategories } from './collections/shop/Subcategories'
import { Orders } from './collections/shop/Orders'
import { Units } from './collections/shop/Units'
import { Currencies } from './collections/shop/Currencies'
import { Tastes } from './collections/shop/Tastes'
import { Feedbacks } from './collections/shop/Feedbacks'
import { ShippingRates } from './collections/shop/ShippingRates'

import { Pages } from './collections/pages/Pages'
import { ProductPages } from './collections/pages/ProductPages'
import { NewsPages } from './collections/pages/NewsPages'

import { Countries } from './collections/filters/Countries'
import { Trademarks } from './collections/filters/Trademarks'
import { Tags } from './collections/filters/Tags'
import { Specials } from './collections/filters/Specials'

import { AllBlocks } from './globals/AllBlocks'
import { MainNavigation } from './globals/MainNavigation'
import { BottomNavigation } from './globals/BottomNavigation'
import { GlobalTypography } from './globals/GlobalTypography'

import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'
import { getPageSlug } from './utilities/getPageSlug'
import { getProductsCountByFilters } from './endpoints/getProductsCountByFilters'
import { getSubcategories } from './endpoints/getSubcategories'
import { getFilteredProducts } from './endpoints/getFilteredProducts'
import { shippingRatesProxy } from './endpoints/shipping-rates'
import { ALL_BLOCKS } from './blocks'

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
            [path.resolve(__dirname, 'collections/shop/Products/hooks/beforeChange')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/shop/ShippingRates/hooks/beforeChange')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/admin/Users/hooks/createStripeCustomer')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/admin/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/shipping-rates')]: mockModulePath,
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
      // ! Need to comment the line below for recreating cms types
      BlocksFeature({ blocks: ALL_BLOCKS }),
      LinkFeature({
        enabledCollections: ['pages', 'categories', 'newsPages', 'productPages'],
      }),
    ],
  }),
  collections: [
    Users,
    Products,
    Categories,
    Subcategories,
    Images,
    Orders,
    Pages,
    Units,
    ProductPages,
    NewsPages,
    News,
    Countries,
    Trademarks,
    Tags,
    Specials,
    Currencies,
    Tastes,
    Feedbacks,
    ShippingRates,
  ],
  globals: [MainNavigation, BottomNavigation, GlobalTypography, AllBlocks],
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
      collections: ['pages', 'categories', 'productPages', 'newsPages'],
      uploadsCollection: 'images',
      tabbedUI: true,
    }),
    nestedDocs({
      collections: ['pages'],
      // @ts-ignore
      generateLabel: (_, doc) => doc.breadcrumbsTitle,
      generateURL: docs =>
        docs.reduce(
          (url, doc) => `${url}${url === '/' ? '' : '/'}${getPageSlug(doc.slug as string)}`,
          '',
        ),
    }),
    redirects({
      collections: ['pages', 'productPages', 'categories', 'newsPages'],
    }),
    payloadCloud(),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    connectOptions: {
      dbName: 'grocee-db-test',
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
  cors: [
    'https://checkout.stripe.com',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_WEBSITE_PUBLIC_URL || '',
  ].filter(Boolean),
  csrf: [
    'https://checkout.stripe.com',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_WEBSITE_PUBLIC_URL || '',
  ].filter(Boolean),
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
    {
      path: '/stripe/shipping-rates',
      method: 'get',
      handler: shippingRatesProxy,
    },
    {
      path: '/products-count-by-filters',
      method: 'post',
      handler: getProductsCountByFilters,
    },
    {
      path: '/products-count-by-subcategories',
      method: 'post',
      handler: getSubcategories,
    },
    {
      path: '/filtered-products',
      method: 'post',
      handler: getFilteredProducts,
    },
  ],
  rateLimit: {
    trustProxy: true,
    max: 1000,
    skip: () => true,
    window: 60 * 1000,
  },
})
