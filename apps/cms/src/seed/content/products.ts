import payload from 'payload'

import { Images } from './images'
import { Units } from './units'
import { Categories } from './categories'
import { Subcategories } from './subcategories'

export const createProducts = async (
  images: Images,
  units: Units,
  categories: Categories,
  subcategories: Subcategories,
) => {
  const [potato, apple, bread, milk] = await Promise.all([
    payload.create({
      collection: 'products',
      data: {
        name: 'Potato',
        description: 'Potato',
        productDetails: {
          image: images.potatoId,
          rating: 4,
          weightUnit: units.kgId,
          stripeProductID: 'prod_PzMCeis5cSASsB',
        },
        categories: [categories.fruitsVegetablesPicklesId],
        subcategories: [subcategories.vegetablesId],
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        name: 'Apple',
        description: 'Apple',
        productDetails: {
          image: images.appleId,
          rating: 4,
          weightUnit: units.kgId,
          stripeProductID: 'prod_Q3wRvzwRTIWpvW',
        },
        categories: [categories.fruitsVegetablesPicklesId],
        subcategories: [subcategories.fruitsId],
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        name: 'Bread',
        description: 'Bread',
        productDetails: {
          image: images.breadId,
          rating: 4,
          weightUnit: units.kgId,
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
          image: images.milkId,
          rating: 4,
          weightUnit: units.kgId,
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
