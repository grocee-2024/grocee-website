import payload from 'payload'

import { Images } from './images'

export const createProducts = async (images: Images) => {
  const [potato, apple, bread, milk] = await Promise.all([
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
    payload.create({
      collection: 'products',
      data: {
        name: 'Apple',
        description: 'Apple',
        productDetails: {
          image: images.tempImageId,
          rating: 4,
          stripeProductID: 'prod_Q3wRvzwRTIWpvW',
        },
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        name: 'Bread',
        description: 'Bread',
        productDetails: {
          image: images.tempImageId,
          rating: 4,
          stripeProductID: 'prod_Q3wSM2ngzIEYOH',
        },
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        name: 'Milk',
        description: 'Milk',
        productDetails: {
          image: images.tempImageId,
          rating: 4,
          stripeProductID: 'prod_Q3wX9LLM7QxbaQ',
        },
      },
    }),
  ])

  payload.logger.info('> Created products')

  return {
    potatoId: potato.id,
    appleId: apple.id,
    breadId: bread.id,
    milkId: milk.id,
  }
}

export type Products = Awaited<ReturnType<typeof createProducts>>
