'use client'

import { Country, Feedback, Product, Taste, Trademark, Unit } from 'cms-types'
import { FC, useMemo, useRef, useState } from 'react'
import { Button } from '../..'
import { Heart, Minus, Plus, StarHalfFilled } from '@oleksii-lavka/grocee-icons/icons'
import { MappedProductForProductCard } from '../../types'
import { useGlobalTypography } from '../../../../apps/web/src/store'
import clsx from 'clsx'
import { AccordionInfo } from './AccordionInfo'
import { ReviewsSlider } from './ReviewsSlider'

type Props = {
  product: Pick<MappedProductForProductCard, 'price' | 'weight'> & Product
  // eslint-disable-next-line no-unused-vars
  fetchReviews: (page: number) => Promise<{
    docs: Feedback[]
    totalDocs: number
    totalPages: number
    limit: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }>
}

export const ProductControls: FC<Props> = ({ product, fetchReviews }) => {
  const quantityStep = useRef(
    (product.productDetails?.weightStep ?? 0) > 0 ? product.productDetails?.weightStep! / 1000 : 1,
  )

  const { productPage, productButtons } = useGlobalTypography()
  const [quantity, setQuantity] = useState(quantityStep.current)

  const productName = !product.productDetails?.weight
    ? `${product.name}, ${product.weight}`
    : product.name

  const generalInfoOptions = useMemo(() => {
    const { country, trademark, taste, alcoholPercentage, weight, unit } = product.productDetails

    const options = [
      {
        label: productPage.generalInfo.country,
        value: (country as Country)?.label,
      },
      {
        label: productPage.generalInfo.trademark,
        value: (trademark as Trademark)?.label,
      },
      {
        label: productPage.generalInfo.weight,
        value: (unit as Unit).label === 'piece' ? (weight! / 1000).toFixed(1) : 1,
      },
    ]

    if ((unit as Unit).label === 'piece') {
      options.push({
        label: productPage.generalInfo.numberOfUnits,
        value: 1,
      })
    }

    if (taste) {
      options.push({
        label: productPage.generalInfo.taste,
        value: (taste as Taste).label,
      })
    }

    if (alcoholPercentage) {
      options.push({
        label: productPage.generalInfo.alcoholPercentage,
        value: alcoholPercentage.toFixed(1),
      })
    }

    return options
  }, [product, productPage.generalInfo])

  const nutritionalInfoOptions = useMemo(() => {
    const { energyValue, carbohydrates, proteins, fats } = product.nutritionalValue

    const options = [
      {
        label: productPage.nutritionalValue.energyValue,
        value: `${energyValue}/${Math.ceil(+energyValue * 4.184)}`,
      },
      {
        label: productPage.nutritionalValue.proteins,
        value: proteins,
      },
      {
        label: productPage.nutritionalValue.fats,
        value: fats,
      },
      {
        label: productPage.nutritionalValue.carbohydrates,
        value: carbohydrates,
      },
    ]

    return options
  }, [product, productPage.nutritionalValue])

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <h3 className='helvetica-xs font-light text-gray-900 tablet:text-[36px] tablet:leading-[122%] tablet:tracking-tightest'>
              {productName}
            </h3>
            <Button className='p-3' variant='secondary' onClick={() => {}}>
              <Heart width={18} height={16} className='text-gray-900' />
            </Button>
          </div>
          <p className='gilroy-xl font-light leading-[133%] text-gray-900 tablet:text-[24px]'>{`${product.price.amount} ${product.price.currency.text}`}</p>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <span className='gilroy-xl text-gray-900'>{productPage.quantityLabel}</span>
          <div className='flex items-center gap-1 rounded bg-gray-25 p-1'>
            <button
              onClick={() => setQuantity(prev => prev - quantityStep.current)}
              className={clsx({
                'pointer-events-none': quantity === quantityStep.current,
              })}
            >
              <Minus
                size={24}
                className={clsx('p-[6px] transition-colors duration-300', {
                  'text-gray-900': quantity !== quantityStep.current,
                  'text-gray-500': quantity === quantityStep.current,
                })}
              />
            </button>
            <span className='gilroy-md flex w-[55px] items-center justify-center font-semibold text-gray-900'>
              {quantity} {(product.productDetails.unit as Unit).text}
            </span>
            <button onClick={() => setQuantity(prev => prev + quantityStep.current)}>
              <Plus size={24} className='p-[6px] text-gray-900' />
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Button variant='primary' standartButton>
            {productButtons.addToCartButton}
          </Button>
          <Button variant='secondary' standartButton>
            {productButtons.buyNowButton}
          </Button>
        </div>

        <div className='flex flex-col gap-6'>
          <AccordionInfo title={productPage.generalInfo.title} options={generalInfoOptions} />
          <AccordionInfo
            title={productPage.nutritionalValue.title}
            options={nutritionalInfoOptions}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h4 className='helvetica-xs font-light text-gray-900'>{productPage.descriptionLabel}</h4>
        <p className='gilroy-sm font-light text-gray-800'>{product.description}</p>
      </div>

      <div className='flex flex-col gap-4'>
        <h4 className='helvetica-xs font-light text-gray-900'>{productPage.deliveryBlock.title}</h4>
        <ul className='flex flex-col gap-2'>
          <li className='justoify-between flex items-center gap-2'>
            <span className='gilroy-sm block grow text-gray-600'>
              {productPage.deliveryBlock.shop}
            </span>
            <span className='gilroy-md block text-gray-700'>The address of the nearest store</span>
          </li>
          <li className='justoify-between flex items-center gap-2'>
            <span className='gilroy-sm block grow text-gray-600'>
              {productPage.deliveryBlock.fastestDeliveryTime}
            </span>
            <span className='gilroy-md block text-gray-700'>16:00</span>
          </li>
          <li className='justoify-between flex items-center gap-2'>
            <span className='gilroy-sm block grow text-gray-600'>
              {productPage.deliveryBlock.shippingCost}
            </span>
            <span className='gilroy-md block text-gray-700'>150 UAH</span>
          </li>
        </ul>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h4 className='helvetica-xs font-light text-gray-900'>
            {productPage.reviewsBlock.title}
          </h4>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx}>
                  <StarHalfFilled width={15} height={14} />
                </div>
              ))}
            </div>

            {product.productDetails.rating}
          </div>
        </div>

        <ReviewsSlider productId={product.id} fetchReviews={fetchReviews} />
      </div>

      <span className='gilroy-md mx-auto text-balance font-light text-gray-800'>
        {productPage.reviewsBlock.logInToLeaveRivewLabel}
      </span>
    </div>
  )
}
