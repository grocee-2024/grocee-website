import { Product } from 'cms-types'
import { PayloadHandler } from 'payload/config'
import { Where } from 'payload/types'

export const getFilteredProducts: PayloadHandler = async (req, res) => {
  const { payload } = req
  const { filterParams = {}, sortParams = {}, locale = 'en', page = 1, limit = 24 } = req.body
  const {
    categoryId = '',
    subcategorySlug = '',
    tags = [],
    specials = [],
    countries = [],
    trademarks = [],
    minPrice = null,
    maxPrice = null,
  } = filterParams as Record<string, string | string[]>

  try {
    const { docs } = await payload.find({ collection: 'products', limit: 1 })
    const [product] = docs

    const mappedSort = mapSortParams(product, sortParams)

    const preparedFilterParams = {
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
        price: {
          min: minPrice,
          max: maxPrice,
        },
      },
    }

    // @ts-ignore
    const mappedWhere = mapWhereParams({ ...preparedFilterParams })
    const filteredProducts = await payload.find({
      collection: 'products',
      where: mappedWhere,
      sort: mappedSort,
      locale,
      page,
      limit,
    })

    res.send(filteredProducts)
  } catch (err: unknown) {
    res.status(404).json({ error: (err as Error).message })
    return
  }
}

function mapSortParams(product: Product, params: { sort?: string; order?: 'asc' | 'desc' }) {
  const { sort = 'id', order = 'asc' } = params

  const { category, skipSync, subcategories, productDetails, ...restProduct } = product
  const { image, stripeProductID, unit, weightStep, weight, priceJSON, ...restProductDetails } =
    productDetails

  const productKeys = Object.keys(restProduct)
  const productDetailsKeys = Object.keys(restProductDetails)

  let normalizedSort = null

  if (productKeys.includes(sort)) {
    normalizedSort = sort
  } else if (productDetailsKeys.includes(sort)) {
    normalizedSort = `productDetails.${sort}`
  } else {
    normalizedSort = null
  }

  if (!normalizedSort) {
    return 'id'
  }

  return order === 'desc' ? `-${normalizedSort}` : normalizedSort
}

function mapWhereParams(params: Record<string, Record<string, string | string[]>>) {
  const and: Where[] = Object.entries(params).reduce((acc, param) => {
    const [productKey, whereParam] = param

    if (productKey.includes('price')) {
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
