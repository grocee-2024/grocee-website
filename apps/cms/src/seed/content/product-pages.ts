import payload from 'payload'
import { Products } from './products'

export const createProductPages = async (products: Products) => {
  const [potato] = await Promise.all([
    payload.create({
      collection: 'productPages',
      data: {
        slug: 'potato',
        product: products.potatoId,
      },
    }),
  ])

  payload.logger.info('> Created product pages')

  return {
    potatoPage: potato.id,
  }
}

export type ProductPages = Awaited<ReturnType<typeof createProductPages>>
