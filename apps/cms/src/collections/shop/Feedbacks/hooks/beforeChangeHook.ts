import { CollectionBeforeChangeHook } from 'payload/types'

export const beforeChangeHook: CollectionBeforeChangeHook = async ({ req, data }) => {
  const { payload } = req

  const { docs: feedbacks, totalDocs } = await payload.find({
    collection: 'feedbacks',
    where: {
      product: {
        equals: (typeof data?.product === 'string' ? data?.product : data?.product?.id) ?? '',
      },
    },
    pagination: false,
  })

  const rating = feedbacks.reduce((acc, review) => acc + review.rating, 0) / totalDocs

  await payload.update({
    collection: 'products',
    data: { productDetails: { rating } },
    where: {
      id: { equals: (typeof data?.product === 'string' ? data?.product : data?.product?.id) ?? '' },
    },
  })

  return data
}
