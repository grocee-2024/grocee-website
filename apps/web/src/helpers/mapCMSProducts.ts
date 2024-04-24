import { getCollectionItem } from '@/cms'
import { pageToUrl, resolveRelation } from '@/cms/helpers'
import { Product, ProductCardBlock, ProductPage } from 'cms-types'

export const mapCMSProductsForProductCard = async (products: ProductCardBlock[]) => {
  const mappedProducts = await Promise.all(
    (products ?? []).map(async ({ page }) => {
      const productPage = resolveRelation(page) as ProductPage

      let product = productPage?.product

      if (typeof product === 'string') {
        product = await getCollectionItem(product, 'products')
      }

      let previewImage = (product as Product).productDetails.image

      if (typeof previewImage === 'string') {
        previewImage = await getCollectionItem(previewImage, 'images')
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
