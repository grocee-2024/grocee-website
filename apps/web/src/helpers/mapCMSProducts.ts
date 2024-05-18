import { getCollectionItem } from '@/cms'
import { pageToUrl, resolveRelation } from '@/cms/helpers'
import { Image, Product, ProductCardBlock, ProductPage, Unit } from 'cms-types'
import { StripePiceJSON } from 'ui/types'

const CMS_URL = process.env.PAYLOAD_INTERNAL_URL ?? process.env.NEXT_PUBLIC_PAYLOAD_URL

export const mapCMSProductsForProductCard = async (
  products: ProductCardBlock[] | Product[],
  locale: string,
) => {
  const mappedProducts = await Promise.all(
    (products ?? []).map(async productData => {
      let product: Product
      let page: ProductCardBlock['page'] | ProductPage

      if ('blockType' in productData && productData?.blockType === 'ProductCard') {
        page = productData.page
        const productPage = resolveRelation(productData.page) as ProductPage

        if (typeof productPage?.product === 'string') {
          product = await getCollectionItem(productPage?.product as string, 'products', {
            searchParams: { locale },
          })
        } else {
          product = productPage?.product as Product
        }
      } else {
        product = productData as Product

        page = await fetch(
          `${CMS_URL}/api/productPages?where[product][in]=${product.id}&locale=${locale}`,
          {
            next: { revalidate: 0 },
          },
        )
          .then(res => res.json() as Promise<{ docs: ProductPage[] }>)
          .then(res => res.docs[0])
      }

      let previewImage = product.productDetails.image

      if (typeof previewImage === 'string') {
        previewImage = await getCollectionItem(previewImage, 'images', {
          searchParams: { locale },
        })
      }

      const pageUrl = pageToUrl(page) as string

      const { id, name, productDetails } = product as Product
      const { rating, priceJSON, stripeProductID, unit, weightUnit } = productDetails

      const resolvedUnit = (
        typeof unit === 'string' ? await getCollectionItem(unit, 'units') : unit
      ) as Unit
      const resolvedWeightUnit = (
        typeof weightUnit === 'string' ? await getCollectionItem(weightUnit, 'units') : weightUnit
      ) as Unit

      const [price] = (priceJSON as unknown as StripePiceJSON).data
      const priceAmount = (price.unit_amount as number) / 100

      return {
        id,
        name,
        rating: rating as number | string,
        pageUrl,
        previewImage: previewImage as Image,
        price: {
          id: price.id,
          amount: productDetails?.weightStep
            ? ((100 / productDetails.weightStep) * priceAmount).toFixed(2)
            : priceAmount,
        },
        stripeProductID,
        weight: `${(productDetails?.weight || 100) / 1000} ${resolvedWeightUnit.text}`,
        unit: resolvedUnit,
        tag: 'Tag',
      }
    }),
  )

  return mappedProducts
}
