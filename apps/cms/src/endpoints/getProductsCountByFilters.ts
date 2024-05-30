import { Payload } from 'payload'
import { PayloadHandler } from 'payload/config'
import { Where } from 'payload/types'

export const getProductsCountByFilters: PayloadHandler = async (req, res) => {
  const { payload, body } = req

  const {
    categoryId = '',
    subcategorySlug = '',
    tags = [],
    specials = [],
    countries = [],
    trademarks = [],
    price = { min: '', max: '' },
  } = body as Record<string, string | string[]>

  const filterParams = {
    category: {
      categoryId,
    },
    'subcategories.slug': {
      subcategorySlug,
    },
    'productDetails.tag.slug': {
      tags,
    },
    'productDetails.specials.slug': {
      specials,
    },
    'productDetails.country.slug': {
      countries,
    },
    'productDetails.trademark.slug': {
      trademarks,
    },
    'productDetails.price': {
      price,
    },
  }

  try {
    const category = await payload.findByID({
      collection: 'categories',
      id: categoryId as string,
    })

    if (!category) {
      res.status(404).json({ error: 'Category not found' })
      return
    }

    // @ts-ignore
    const filters = await calculateProductCountByDetails(payload, filterParams)

    res.send(filters)
  } catch (error: unknown) {
    res.status(404).json({ error: (error as Error).message })
    return
  }
}

function mapWhereParams(
  params: Record<string, Record<string, string | string[]>>,
  options?: { withoutPrice: boolean },
) {
  const { withoutPrice = false } = options || {}

  const and: Where[] = Object.entries(params).reduce((acc, param) => {
    const [productKey, whereParam] = param

    if (productKey.includes('price')) {
      if (withoutPrice) {
        return acc
      }

      const maxPrice = (whereParam.price as unknown as { min: string; max: string }).max
      const minPrice = (whereParam.price as unknown as { min: string; max: string }).min

      const priceQuery: Where[] = []

      if (maxPrice && (+maxPrice || 0) > 0) {
        const maxPriceQuery: Where = {
          [productKey]: {
            less_than_equal: maxPrice,
          },
        }

        priceQuery.push(maxPriceQuery)
      }

      if (minPrice && (+minPrice || 0) > 0) {
        const minPriceQuery: Where = {
          [productKey]: {
            greater_than_equal: minPrice,
          },
        }

        priceQuery.push(minPriceQuery)
      }

      acc.push(...priceQuery)

      return acc
    }

    const [value] = Object.values(whereParam)

    if (!value?.length || !value) {
      return acc
    }

    const newQuery: Where = {
      [productKey]: {
        in: Array.isArray(value) ? value.join(',') : value,
      },
    }

    acc.push(newQuery)

    return acc
  }, [])

  return { and }
}

async function calculateProductCountByDetails(payload: Payload, params: Record<string, any>) {
  const [
    { data: countries, totalProducts: totalProductsCountries },
    { data: tags, totalProducts: totalProductsTags },
    { data: trademarks, totalProducts: totalProductsTrademarks },
    { data: specials, totalProducts: totalProductsSpecials },
  ] = await Promise.all([
    calculateProductCountByFilter({
      leftParam: 'productDetails.country.slug',
      key: 'productDetails.country',
      params,
      payload,
    }),
    calculateProductCountByFilter({
      leftParam: 'productDetails.tag.slug',
      key: 'productDetails.tag',
      params,
      payload,
    }),
    calculateProductCountByFilter({
      leftParam: 'productDetails.trademark.slug',
      key: 'productDetails.trademark',
      params,
      payload,
    }),
    calculateProductCountByFilter({
      leftParam: 'productDetails.specials.slug',
      key: 'productDetails.specials',
      params,
      payload,
    }),
  ])

  const [minPrice, maxPrice] = await Promise.all([
    payload.find({
      collection: 'products',
      sort: 'productDetails.price',
      limit: 1,
      where: mapWhereParams(params, { withoutPrice: true }),
    }),
    payload.find({
      collection: 'products',
      sort: '-productDetails.price',
      limit: 1,
      where: mapWhereParams(params, { withoutPrice: true }),
    }),
  ])

  return {
    filters: {
      tags,
      countries,
      trademarks,
      specials,
      price: {
        min: minPrice.docs?.[0]?.productDetails.price,
        max: maxPrice.docs?.[0]?.productDetails.price,
      },
    },
    totalProducts: Math.min(
      totalProductsCountries,
      totalProductsTags,
      totalProductsTrademarks,
      totalProductsSpecials,
    ),
  }
}

async function calculateProductCountByFilter<T>(args: {
  payload: Payload
  params: Record<string, Record<string, string | string[]>>
  leftParam: string
  key: string
}) {
  const map = new Map<string, { doc: T; count: number }>()

  const { params, payload, leftParam, key } = args

  const dtoParams = Object.fromEntries(
    Object.entries(params).filter(param => param[0] !== leftParam),
  )

  const mappedWhereParams = mapWhereParams(dtoParams)

  const { docs: products, totalDocs: totalProducts } = await payload.find({
    collection: 'products',
    where: mappedWhereParams,
    pagination: false,
  })

  for (const product of products) {
    const doc = getNestedProperty(product, key) ?? []

    if (Array.isArray(doc) && doc.length > 0) {
      for (const nestedDoc of doc) {
        updateFilterMapValue({ map, doc: nestedDoc })
      }

      continue
    }

    //@ts-ignore
    updateFilterMapValue({ map, doc })
  }

  return { data: Array.from(map.values()), totalProducts }
}

function getNestedProperty<T>(obj: T, key: string) {
  const keys = key.split('.')

  let value = obj

  for (const key of keys) {
    // @ts-ignore
    if (value[key]) {
      value = value[key]
    }
  }

  return value as T
}

function updateFilterMapValue<T extends { slug: string }>({
  map,
  doc,
}: {
  map: Map<
    string,
    {
      doc: T
      count: number
    }
  >
  doc?: T
}) {
  if (!doc || !doc?.slug) {
    return
  }

  if (!map.has(doc.slug)) {
    map.set(doc.slug, { doc, count: 1 })

    return
  }

  const updatedDoc = map.get(doc.slug)
  updatedDoc.count += 1
  map.set(doc.slug, updatedDoc)
}
