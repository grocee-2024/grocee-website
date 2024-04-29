import payload from 'payload'
import path from 'path'
import fs from 'fs'
import { MongoClient } from 'mongodb'

import { createUsers } from './content/users'
import { createImages } from './content/images'
import { createPages, populatePagesData } from './content/pages'
import { createMainNavigation } from './content/main-navigation'
import { createBottomNavigation } from './content/bottom-navigation'
import { createNews } from './content/news'
import { createProducts } from './content/products'
import { createProductPages } from './content/product-pages'
import { createGlobalTypography } from './content/global-typography'

export const seedLocalData = async () => {
  await dropDataFromMongoDB()

  await createData()
}

async function dropDataFromMongoDB() {
  try {
    payload.logger.info('Dropping local data')

    const client = await MongoClient.connect(process.env.DATABASE_URI)
    const db = client.db(new URL(process.env.DATABASE_URI).pathname.substring(1))

    await db.dropDatabase()

    const mediaDir = path.resolve(__dirname, '../', 'images')

    if (fs.existsSync(mediaDir)) {
      const files = fs.readdirSync(mediaDir)

      for (const file of files) {
        fs.unlinkSync(path.resolve(mediaDir, file))
      }
    }
  } catch (error: unknown) {
    payload.logger.error('Error dropping database: ', error)
    console.error(error)
  }
}

async function dropDataFromSqlDB() {
  payload.logger.info('Dropping local data...')

  try {
    const tables = Object.entries(payload.db.tables)

    for (const [tableName, table] of tables) {
      await payload.db.drizzle.delete(table)

      payload.logger.info(`Table ${tableName} dropped successfully`)
    }

    const mediaDir = path.resolve(__dirname, '../', 'images')

    if (fs.existsSync(mediaDir)) {
      const files = fs.readdirSync(mediaDir)

      for (const file of files) {
        fs.unlinkSync(path.resolve(mediaDir, file))
      }
    }

    payload.logger.info('All tables dropped successfully')
  } catch (error: unknown) {
    payload.logger.error('Error dropping tables: ', error)
  }
}

async function createData() {
  payload.logger.info('Seeding local data')

  try {
    await createUsers()

    const [images, pages] = await Promise.all([createImages(), createPages()])
    const [news, products] = await Promise.all([createNews(images), createProducts(images)])
    const productPages = await createProductPages(products)

    await Promise.all([
      populatePagesData(pages, productPages, news, images),
      createMainNavigation(pages, images),
      createBottomNavigation(pages, images),
      createGlobalTypography(),
    ])
  } catch (error: unknown) {
    payload.logger.error('Error seeding local data:')
    console.error(error)
  }

  payload.logger.info('Done seeding local data.')
}
