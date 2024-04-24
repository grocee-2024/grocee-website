import payload from 'payload'
import path from 'path'
import fs from 'fs'
import { createUsers } from './content/users'
import { createImages } from './content/images'
import { createPages, populatePagesData } from './content/pages'
import { createMainNavigation } from './content/main-navigation'
import { createNews } from './content/news'
import { createProducts } from './content/products'
import { createProductPages } from './content/product-pages'

export const seedLocalData = async () => {
  await dropData()
  await createData()
}

async function dropData() {
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

    const news = await createNews(images)
    const products = await createProducts(images)
    const productPages = await createProductPages(products)

    await Promise.all([
      populatePagesData(pages, productPages, news, images),
      createMainNavigation(pages, images),
    ])
  } catch (error: unknown) {
    payload.logger.error('Error seeding local data: ', error)
  }

  payload.logger.info('Done seeding local data.')
}
