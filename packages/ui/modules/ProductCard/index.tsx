'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Tag, Button, PayloadImage } from 'ui'
import { Heart, StarHalfFilled, AddShoppingCart } from '@oleksii-lavka/grocee-icons/icons'
import { FocusRing } from 'react-aria'
import clsx from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'
import { useGlobalTypography } from '../../../../apps/web/src/store'
import Skeleton from 'react-loading-skeleton'
import { MappedProductForProductCard } from '../../types'

export type ProductCardProps = {
  product: MappedProductForProductCard
  isFavorite?: boolean
  imageHeight?: number
  minImageWidth?: number
  imageClassName?: string
  className?: string
  animationProps?: HTMLMotionProps<'div'>
  onClickLikeButton?: () => void
  onAddToCart?: () => void
  disableAddToCartButtonLabel?: boolean
}

export const ProductCard: FC<ProductCardProps> = props => {
  const {
    product,
    imageClassName = '',
    className = '',
    imageHeight = 176,
    minImageWidth = 0,
    onAddToCart,
    onClickLikeButton,
    animationProps = {},
    disableAddToCartButtonLabel = false,
  } = props

  const { productButtons } = useGlobalTypography()

  return (
    <motion.div
      className={clsx('flex flex-col gap-4 rounded-2xl bg-gray-25 p-4', className)}
      {...animationProps}
    >
      <div className='relative'>
        <FocusRing focusRingClass='ring ring-offset-2'>
          <Link href={product.pageUrl ?? ''} className='inline-block w-full no-underline'>
            {product.tag && (
              <div style={{ zIndex: 2 }} className='absolute left-0 top-0'>
                <Tag text={product.tag} />
              </div>
            )}

            <div
              className='relative w-full overflow-hidden rounded-lg bg-white'
              style={{ paddingBottom: imageHeight, minWidth: minImageWidth }}
            >
              <PayloadImage
                src={product.previewImage}
                skipBlur
                imgProps={{
                  className: clsx(
                    'absolute left-0 top-0 object-contain mix-blend-multiply',
                    imageClassName,
                  ),
                }}
              />
            </div>
          </Link>
        </FocusRing>

        <div style={{ zIndex: 2 }} className='absolute right-0 top-0'>
          <Button className='p-3' variant='tertiary' onClick={onClickLikeButton}>
            <Heart width={18} height={16} className='text-gray-900' />
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='gilroy-xl text-gray-900'>{product.name}</span>

        <div className='flex justify-between gap-2'>
          <span className='gilroy-sm text-gray-800'>{product.weight}</span>
          <div className='flex items-center gap-1'>
            <StarHalfFilled width={15} height={14} />
            <span className='gilroy-sm text-gray-800'>{product.rating}</span>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-1 rounded-[1000px] bg-white pl-6'>
        <span className='gilroy-md text-center text-gray-900'>{product.price.amount} UAH</span>

        {productButtons.addToCartButton ? (
          <Button standartButton onClick={onAddToCart}>
            {!disableAddToCartButtonLabel && <span>{productButtons.addToCartButton}</span>}
            <AddShoppingCart width={18} height={19} className='text-white' />
          </Button>
        ) : (
          <div className='min-h-full w-[120px]'>
            <Skeleton borderRadius={1000} className='inline-block min-h-12 w-full' />
          </div>
        )}
      </div>
    </motion.div>
  )
}
