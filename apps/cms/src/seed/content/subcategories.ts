import payload from 'payload'

export const createSubcategories = async () => {
  const [fruits, vegetables] = await Promise.all([
    payload.create({
      collection: 'subcategories',
      data: {
        slug: 'fruits',
        label: 'Fruits',
      },
    }),
    payload.create({
      collection: 'subcategories',
      data: {
        slug: 'vegetables',
        label: 'Vegetables',
      },
    }),
  ])

  payload.logger.info('> Created subcategories')

  return {
    fruitsId: fruits.id,
    vegetablesId: vegetables.id,
  }
}

export type Subcategories = Awaited<ReturnType<typeof createSubcategories>>
