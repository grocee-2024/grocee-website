import payload from 'payload'
import { Products } from './products'

export const createProductPages = async (products: Products) => {
  const [potato, apple, bread, milk] = await Promise.all([
    payload.create({
      collection: 'productPages',
      data: {
        slug: 'potato',
        product: products.potatoId,
      },
    }),
    payload.create({
      collection: 'productPages',
      data: {
        slug: 'apple',
        product: products.appleId,
      },
    }),
    payload.create({
      collection: 'productPages',
      data: {
        slug: 'bread',
        product: products.breadId,
      },
    }),
    payload.create({
      collection: 'productPages',
      data: {
        slug: 'milk',
        product: products.milkId,
      },
    }),
  ])

  payload.logger.info('> Created product pages')

  return {
    potatoPage: potato.id,
    applePage: apple.id,
    breadPage: bread.id,
    milkPage: milk.id,
  }
}

export type ProductPages = Awaited<ReturnType<typeof createProductPages>>
