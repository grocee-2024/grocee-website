import { CarouselBlock } from 'cms-types'
import { CarouselClient } from './CarouselClient'
import { mapCMSCards, mapCMSNewsCards, mapCMSProductsForProductCard } from '@/helpers'
import { MappedCard, MappedNewsArticleCard, MappedProductForProductCard } from 'ui/types'
import { getCookies } from 'next-client-cookies/server'

export async function Carousel({ settings, cards, products, title, newsCards }: CarouselBlock) {
  const { type } = settings
  const cookies = getCookies()

  const locale = cookies.get('locale') || 'en'

  let mappedSlides: MappedProductForProductCard[] | MappedNewsArticleCard[] | MappedCard[]

  switch (type) {
    case 'productCard':
      mappedSlides = await mapCMSProductsForProductCard(products!, locale)
      break

    case 'newsCard':
      mappedSlides = await mapCMSNewsCards(newsCards!, locale)
      break

    case 'simpleCard':
      mappedSlides = await mapCMSCards(cards!, locale)
      break

    default:
      mappedSlides = []
  }

  //@ts-ignore
  return <CarouselClient settings={settings} title={title} slides={mappedSlides} type={type} />
}
