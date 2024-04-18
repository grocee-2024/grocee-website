'use client'

import { Children, FC, PropsWithChildren, useCallback, useId, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Virtual, Autoplay } from 'swiper/modules'
import { Button } from '../Button'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import clsx from 'clsx'

import 'swiper/css'
import 'swiper/css/virtual'

type CarouselProps = PropsWithChildren<{
  title?: string
  buttonLink?: string
  buttonText?: string
  buttonIcon?: AllIconNames
  speed?: number
  loop?: boolean
  className?: string
}>

export const Carousel: FC<CarouselProps> = ({
  children,
  title,
  speed,
  buttonLink,
  buttonText,
  buttonIcon,
  className = '',
  loop = false,
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [disabledNavigation, setDisabledNavigation] = useState<{ prev: boolean; next: boolean }>({
    prev: true,
    next: true,
  })
  const carouselId = useId()

  const onUpdateDisableNavigation = useCallback(
    ({ isBeginning, isEnd }: Pick<SwiperType, 'isBeginning' | 'isEnd'>) => {
      const prev = isBeginning && !swiper?.originalParams.loop
      const next = isEnd && !swiper?.originalParams.loop

      setDisabledNavigation(prevState => ({
        ...prevState,
        prev,
        next,
      }))
    },
    [swiper],
  )

  return (
    <Swiper
      modules={[Virtual, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      loop={loop}
      allowTouchMove
      onResize={({ isBeginning, isEnd, originalParams }) => {
        const currPrev = isBeginning && originalParams.loop
        const currNext = isEnd && originalParams.loop

        if (currPrev !== disabledNavigation.prev || currNext !== disabledNavigation.next) {
          onUpdateDisableNavigation({ isBeginning, isEnd })
        }
      }}
      breakpoints={{
        496: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          allowTouchMove: false,
        },
      }}
      onSlideChange={onUpdateDisableNavigation}
      onSwiper={swiper => {
        setSwiper(swiper)
        onUpdateDisableNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd })
      }}
      className={clsx('!flex flex-col-reverse gap-8', className)}
    >
      <div className='flex items-center justify-between gap-4'>
        {title && (
          <h3 className='helvetica-md grow justify-start font-light text-gray-900'>{title}</h3>
        )}

        <div className='flex grow items-center justify-end gap-6'>
          {buttonText && buttonLink && (
            <Button
              href={buttonLink}
              standartButton
              variant='tertiary'
              rightIcon={{ icon: buttonIcon, size: 18 }}
            >
              {buttonText}
            </Button>
          )}

          <div className='hidden gap-2 tablet:flex'>
            <PrevSlide isDisabled={disabledNavigation.prev} speed={speed ?? 500} />
            <NextSlide isDisabled={disabledNavigation.next} speed={speed ?? 500} />
          </div>
        </div>
      </div>

      {Children.map(children, (child, idx) => {
        // @ts-ignore
        const key = child?.key ?? `${carouselId}-${idx}`

        return (
          <SwiperSlide key={key} virtualIndex={idx} className='!flex justify-center mobile:!block'>
            {child}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

function NextSlide({ isDisabled = false, speed }: { isDisabled?: boolean; speed: number }) {
  const swiper = useSwiper()

  return (
    <Button
      onClick={() => {
        swiper.slideNext(speed)
      }}
      isDisabled={isDisabled}
      disableBorder={isDisabled}
      variant='tertiary'
      leftIcon={{ icon: 'ArrowRight', size: { width: 14, height: 10 } }}
      className='h-10 w-10 rounded-[1000px]'
    />
  )
}

function PrevSlide({ isDisabled = false, speed }: { isDisabled?: boolean; speed: number }) {
  const swiper = useSwiper()

  return (
    <Button
      onClick={() => {
        swiper.slidePrev(speed)
      }}
      isDisabled={isDisabled}
      disableBorder={isDisabled}
      variant='tertiary'
      leftIcon={{ icon: 'ArrowLeft', size: { width: 14, height: 10 } }}
      className='h-10 w-10 rounded-[1000px]'
    />
  )
}
