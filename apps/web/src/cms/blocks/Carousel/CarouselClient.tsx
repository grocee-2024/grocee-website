'use client'

import { parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { CarouselBlock, Image } from 'cms-types'
import { FC, useMemo } from 'react'
import {
  Card as CardUI,
  Carousel as CarouselUI,
  NewsCard as NewsCardUI,
  ProductCard as ProductCardUI,
} from 'ui'
import { parseIcon } from 'ui/helpers'
import { MappedCard, MappedNewsArticleCard, MappedProductForProductCard } from 'ui/types'

type Settings = Omit<CarouselBlock['settings'], 'type'>

type Props = Pick<CarouselBlock, 'title'> & { settings: Settings } & (
    | {
        type: 'productCard'
        slides: MappedProductForProductCard[]
      }
    | {
        type: 'newsCard'
        slides: MappedNewsArticleCard[]
      }
    | {
        type: 'simpleCard'
        slides: MappedCard[]
      }
  )

export const CarouselClient: FC<Props> = ({ title, settings, type, slides }) => {
  const { icon, link, linkText, loop, showLink, speed, virtual } = settings

  const parsedIcon = parseIcon({ icon: (icon?.icon as AllIconNames) ?? undefined })
  const buttonLink = parsePayloadLink(link)

  const mappedSlides = useMemo(() => {
    if (type === 'productCard') {
      return slides.map(({ id, name, pageUrl, previewImage, price, rating, weight }, idx) => (
        <ProductCardUI
          key={`${id}-${idx}`}
          link={pageUrl}
          price={price}
          rating={rating}
          title={name}
          weight={weight}
          image={previewImage}
          className='grow'
          tag='Tag'
        />
      ))
    }

    if (type === 'simpleCard') {
      return slides.map(({ id, image, link, text }, idx) => (
        <CardUI key={`${id}-${idx}`} href={link} text={text} image={image} />
      ))
    }

    if (type === 'newsCard') {
      return slides.map(({ id, pageUrl, previewImage, title, titleColor }, idx) => (
        <NewsCardUI
          key={`${id}-${idx}`}
          link={pageUrl}
          title={title}
          image={previewImage}
          titleColor={titleColor}
          tag='Tag'
        />
      ))
    }

    return null
  }, [])

  return (
    <CarouselUI
      loop={loop ?? false}
      speed={speed ?? 500}
      virtual={virtual ?? false}
      title={title ?? undefined}
      className='width-limit'
      showLink={showLink ?? false}
      buttonIcon={parsedIcon.icon}
      buttonLink={buttonLink}
      buttonText={linkText ?? ''}
    >
      {mappedSlides}
    </CarouselUI>
  )
}
