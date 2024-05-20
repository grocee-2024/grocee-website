import payload from 'payload'
import { Subcategories } from './subcategories'

export const createCategories = async (subcategories: Subcategories) => {
  const [fruitsVegetablesPickles] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        slug: 'fruits-vegetables-pickles',
        label: 'Fruits, vegetables, pickles',
        subcategories: [subcategories.fruitsId, subcategories.vegetablesId],
      },
    }),
  ])

  payload.logger.info('> Created categories')

  return {
    fruitsVegetablesPicklesId: fruitsVegetablesPickles.id,
  }
}

export type Categories = Awaited<ReturnType<typeof createCategories>>
