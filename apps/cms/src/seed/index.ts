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
import { createUnits } from './content/units'
import { createSubcategories } from './content/subcategories'
import { createCategories } from './content/categories'
import { createCountries } from './content/countries'
import { createCurrencies } from './content/currencies'

export const seedLocalData = async () => {
  await dropDatabase()

  await createData()
}

async function dropDatabase() {
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

async function createData() {
  payload.logger.info('Seeding local data')

  try {
    await createUsers()

    const [images, subcategories, pages] = await Promise.all([
      createImages(),
      createSubcategories(),
      createPages(),
      createUnits(),
      createCountries(),
      createCurrencies(),
    ])

    const categories = await createCategories(subcategories)

    const [news, products] = await Promise.all([
      createNews(images),
      createProducts(images, categories, subcategories),
    ])

    const productPages = await createProductPages(products)

    await Promise.all([
      populatePagesData(pages, productPages, news, images),
      createMainNavigation(pages, images, categories),
      createBottomNavigation(pages, images),
      createGlobalTypography(pages),
    ])
  } catch (error: unknown) {
    payload.logger.error('Error seeding local data:')
    console.error(error)
  }

  payload.logger.info('Done seeding local data.')
}
