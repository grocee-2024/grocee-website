'use client'

import { ComponentProps, FC } from 'react'
import { ProductControls, ProductPageSlider } from 'ui'

type Props = ComponentProps<typeof ProductPageSlider> & ComponentProps<typeof ProductControls>

export const ProductIntro: FC<Props> = ({ productGallery, product, fetchReviews }) => {
  return (
    <div className='flex flex-col gap-6'>
      {productGallery.length > 0 && <ProductPageSlider productGallery={productGallery} />}
      <ProductControls product={product} fetchReviews={fetchReviews} />
    </div>
  )
}
