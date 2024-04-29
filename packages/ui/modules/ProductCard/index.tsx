'use client'

import { CSSProperties, FC } from 'react'
import Link from 'next/link'
import { Tag, Button, PayloadImage } from 'ui'
import { Heart, StarHalfFilled, AddShoppingCart } from '@oleksii-lavka/grocee-icons/icons'
import { FocusRing } from 'react-aria'
import { Image as PayloadImageType } from 'cms-types'
import clsx from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'

export type ProductCardProps = {
  tag?: string
  isFavorite?: boolean
  image?: PayloadImageType
  link: string
  title: string
  weight: number | string
  rating: number | string
  price: number | string
  imageHeight?: number
  minImageWidth?: number
  objectFit?: 'cover' | 'contain'
  imageClassName?: string
  className?: string
  style?: CSSProperties
  animationProps?: HTMLMotionProps<'div'>
  onClickLikeButton?: () => void
  onAddToCart?: () => void
}

export const ProductCard: FC<ProductCardProps> = props => {
  const {
    image,
    imageClassName = '',
    className = '',
    tag,
    title,
    rating,
    weight,
    price,
    imageHeight = 176,
    minImageWidth = 0,
    onAddToCart,
    onClickLikeButton,
    link,
    animationProps = {},
    objectFit = 'cover',
  } = props

  return (
    <motion.div
      className={clsx('flex flex-col gap-4 rounded-2xl bg-gray-25 p-4', className)}
      {...animationProps}
    >
      <div className='relative'>
        <FocusRing focusRingClass='ring ring-offset-2'>
          <Link href={link ?? ''} className='inline-block w-full no-underline'>
            {tag && (
              <div className='absolute left-0 top-0 z-10'>
                <Tag text={tag} />
              </div>
            )}

            <div
              className='relative w-full overflow-hidden rounded-lg'
              style={{ paddingBottom: imageHeight, minWidth: minImageWidth }}
            >
              <PayloadImage
                src={image}
                skipBlur
                objectFit={objectFit}
                imgProps={{
                  className: clsx('absolute left-0 top-0 object-cover', imageClassName),
                }}
              />
            </div>
          </Link>
        </FocusRing>

        <div className='absolute right-0 top-0 z-50'>
          <Button className='p-3' variant='tertiary' onClick={onClickLikeButton}>
            <Heart width={18} height={16} className='text-gray-900' />
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='gilroy-xl text-gray-900'>{title}</span>

        <div className='flex justify-between gap-2'>
          <span className='gilroy-sm text-gray-800'>{weight}</span>
          <div className='flex items-center gap-1'>
            <StarHalfFilled width={15} height={14} />
            <span className='gilroy-sm text-gray-800'>{rating}</span>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-2 rounded-[1000px] bg-white pl-6'>
        <span className='gilroy-md text-gray-900'>{price} UAH</span>
        <Button standartButton onClick={onAddToCart}>
          <span>Add to cart</span>
          <AddShoppingCart width={18} height={19} className='text-white' />
        </Button>
      </div>
    </motion.div>
  )
}
