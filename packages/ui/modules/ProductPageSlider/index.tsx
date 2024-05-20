'use client'

import 'swiper/css/thumbs'

import type { Image as PayloadImageType } from 'cms-types'
import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, PayloadImage } from '../..'
import type { Swiper as SwiperType } from 'swiper'
import { Thumbs } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  productGallery: {
    id: string
    image: PayloadImageType
  }[]
}

export const ProductPageSlider: FC<Props> = ({ productGallery }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const [disabledNavigation, setDisabledNavigation] = useState<{ prev: boolean; next: boolean }>({
    prev: true,
    next: true,
  })

  const onUpdateDisableNavigation = useCallback(
    ({ isBeginning, isEnd }: Pick<SwiperType, 'isBeginning' | 'isEnd'>) => {
      setDisabledNavigation(prevState => ({
        ...prevState,
        prev: isBeginning,
        next: isEnd,
      }))
    },
    [swiper],
  )

  const onSwipeToNextSlide = useCallback(() => {
    if (!swiper) {
      return () => {}
    }

    return swiper.slideNext(500)
  }, [swiper])

  const onSwipeToPrevSlide = useCallback(() => {
    if (!swiper) {
      return () => {}
    }

    return swiper.slidePrev(500)
  }, [swiper])

  return (
    <section>
      <Swiper
        modules={[Thumbs]}
        onSlideChange={swiper => {
          onUpdateDisableNavigation(swiper)
          setActiveSlide(swiper.activeIndex)
        }}
        onSwiper={swiper => {
          setSwiper(swiper)
          onUpdateDisableNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd })
        }}
        speed={500}
        spaceBetween={24}
        slidesPerGroup={1}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {productGallery.map(({ id, image }) => (
          <SwiperSlide key={id}>
            <div className='relative w-full overflow-hidden rounded-[32px] bg-gray-50 pb-[262px]'>
              <PayloadImage
                src={image}
                skipBlur
                imgProps={{
                  className: 'absolute left-0 top-0 object-contain mix-blend-multiply',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-4 flex justify-between gap-4'>
        <div className='!min-w-0'>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            watchSlidesProgress
            slidesPerView={3}
            style={{ marginLeft: 0 }}
            className='max-w-[150px]'
          >
            {productGallery.map(({ id, image }, idx) => (
              <SwiperSlide key={id} className='relative mix-blend-exclusion'>
                <div className='relative !h-10 !w-10 overflow-hidden'>
                  <PayloadImage
                    src={image}
                    skipBlur
                    imgProps={{
                      className: 'absolute left-0 top-0 w-full object-contain mix-blend-multiply',
                    }}
                  />
                </div>
                <AnimatePresence>
                  {idx === activeSlide && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='absolute inset-0 max-w-10 rounded border-[1px] border-gray-900'
                    />
                  )}
                </AnimatePresence>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='flex gap-2'>
          <PrevSlide onSwipe={onSwipeToPrevSlide} isDisabled={disabledNavigation.prev} />
          <NextSlide onSwipe={onSwipeToNextSlide} isDisabled={disabledNavigation.next} />
        </div>
      </div>
    </section>
  )
}

function NextSlide({ isDisabled, onSwipe }: { isDisabled?: boolean; onSwipe: () => void }) {
  return (
    <Button
      onClick={onSwipe}
      isDisabled={isDisabled}
      disableBorder={isDisabled}
      variant='tertiary'
      leftIcon={{ icon: 'ArrowRight', size: { width: 14, height: 10 } }}
      className='h-10 w-10 rounded-[1000px]'
    />
  )
}

function PrevSlide({ isDisabled, onSwipe }: { isDisabled?: boolean; onSwipe: () => void }) {
  return (
    <Button
      onClick={onSwipe}
      isDisabled={isDisabled}
      disableBorder={isDisabled}
      variant='tertiary'
      leftIcon={{ icon: 'ArrowLeft', size: { width: 14, height: 10 } }}
      className='h-10 w-10 rounded-[1000px]'
    />
  )
}
