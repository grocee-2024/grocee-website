import { getCollectionItem } from '@/cms'
import { pageToUrl, resolveRelation } from '@/cms/helpers'
import { Product, ProductCardBlock, ProductPage } from 'cms-types'

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
      const { rating } = productDetails

      return {
        id,
        name,
        rating: rating as number | string,
        pageUrl,
        previewImage,
        price: 10,
        weight: '0.5 kg',
      }
    }),
  )

  return mappedProducts
}
