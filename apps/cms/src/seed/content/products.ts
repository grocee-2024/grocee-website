import payload from 'payload'

import { Images } from './images'
import { Categories } from './categories'
import { Subcategories } from './subcategories'

export const createProducts = async (
  images: Images,
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
          stripeProductID: 'prod_PzMCeis5cSASsB',
        },
        nutritionalValue: {
          energyValue: 10,
          proteins: 10,
          fats: 10,
          carbohydrates: 10,
        },
        category: categories.fruitsVegetablesPicklesId,
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
          stripeProductID: 'prod_Q3wRvzwRTIWpvW',
        },
        nutritionalValue: {
          energyValue: 10,
          proteins: 10,
          fats: 10,
          carbohydrates: 10,
        },
        category: categories.fruitsVegetablesPicklesId,
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
          stripeProductID: 'prod_Q3wSM2ngzIEYOH',
        },
        nutritionalValue: {
          energyValue: 10,
          proteins: 10,
          fats: 10,
          carbohydrates: 10,
        },
        category: categories.fruitsVegetablesPicklesId,
        subcategories: [subcategories.fruitsId],
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        name: 'Milk',
        description: 'Milk',
        productDetails: {
          image: images.milkId,
          stripeProductID: 'prod_Q3wX9LLM7QxbaQ',
        },
        nutritionalValue: {
          energyValue: 10,
          proteins: 10,
          fats: 10,
          carbohydrates: 10,
        },
        category: categories.fruitsVegetablesPicklesId,
        subcategories: [subcategories.fruitsId],
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
