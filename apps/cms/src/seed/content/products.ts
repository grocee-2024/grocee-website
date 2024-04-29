import payload from 'payload'

import { Images } from './images'

export const createProducts = async (images: Images) => {
  const [potato] = await Promise.all([
    payload.create({
      collection: 'products',
      data: {
        name: 'Potato',
        description: 'Potato',
        productDetails: {
          image: images.tempImageId,
          rating: 4,
          stripeProductID: 'prod_PzMCeis5cSASsB',
        },
      },
    }),
  ])

  payload.logger.info('> Created products')

  return {
    potatoId: potato.id,
  }
}

export type Products = Awaited<ReturnType<typeof createProducts>>
