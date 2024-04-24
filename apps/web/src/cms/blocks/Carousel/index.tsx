import { CarouselBlock } from 'cms-types'
import { CarouselClient } from './CarouselClient'
import { mapCMSCards, mapCMSNewsCards, mapCMSProductsForProductCard } from '@/helpers'
import { MappedCard, MappedNewsArticleCard, MappedProductForProductCard } from 'ui/types'

export async function Carousel({ settings, cards, products, title, newsCards }: CarouselBlock) {
  const { type } = settings

  let mappedSlides: MappedProductForProductCard[] | MappedNewsArticleCard[] | MappedCard[]

  switch (type) {
    case 'productCard':
      mappedSlides = await mapCMSProductsForProductCard(products!)
      break

    case 'newsCard':
      mappedSlides = await mapCMSNewsCards(newsCards!)
      break

    case 'simpleCard':
      mappedSlides = await mapCMSCards(cards!)
      break

    default:
      mappedSlides = []
  }

  //@ts-ignore
  return <CarouselClient settings={settings} title={title} slides={mappedSlides} type={type} />
}
