import { getCollectionItem, getCollectionItemByUniqueField, getPage } from '@/cms'
import { pageToUrl, resolveRelation } from '@/cms/helpers'
import { Currency, Image, Product, ProductCardBlock, ProductPage, Unit } from 'cms-types'
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

      const pageUrl = (
        'value' in page && 'relationTo' in page
          ? pageToUrl(page)
          : pageToUrl({ relationTo: 'productPages', value: page })
      ) as string

      const { id, name, productDetails } = product as Product
      const { rating, priceJSON, stripeProductID } = productDetails

      const [price] = (priceJSON as unknown as StripePiceJSON).data
      const priceAmount = (price.unit_amount as number) / 100

      const currency = await getCollectionItemByUniqueField('currencies', 'label', 'uah', {
        searchParams: { locale },
      })

      const weight = !productDetails?.weight
        ? 100
        : productDetails.weight >= 1000
          ? productDetails.weight / 1000
          : productDetails.weight

      const weightUnit = await getCollectionItemByUniqueField(
        'units',
        'label',
        (productDetails?.weight || 100) >= 1000 ? 'kg' : 'g',
        { searchParams: { locale } },
      )

      return {
        id,
        name,
        rating: rating ?? 0,
        pageUrl,
        previewImage: previewImage as Image,
        price: {
          id: price.id,
          amount: productDetails?.weightStep
            ? ((100 / productDetails.weightStep) * priceAmount).toFixed(2)
            : priceAmount,
          currency: currency as Currency,
        },
        stripeProductID,
        weight: `${weight} ${weightUnit.text}`,
        tag: 'Tag',
      }
    }),
  )

  return mappedProducts
}
