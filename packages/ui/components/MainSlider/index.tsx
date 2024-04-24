'use client'

import 'swiper/css'
import 'swiper/css/virtual'
import 'swiper/css/effect-fade'

import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Virtual, Autoplay, EffectFade } from 'swiper/modules'
import { Button, ButtonProps } from '../Button'
import type { Image as PayloadImageType } from 'cms-types'
import { clsx } from 'clsx'
import { PayloadImage } from '../PayloadImage'
import { useWindowSize } from '../../hooks'

export type SlideProps = {
  id: string
  image: PayloadImageType
  heading?: {
    title?: string | null
    description?: string | null
    button?: {
      props?: ButtonProps<string>
      text?: string
    }
  }
}

export type SliderProps = Pick<
  SwiperProps,
  'autoplay' | 'loop' | 'virtual' | 'speed' | 'effect'
> & {
  className?: string
  slides: SlideProps[]
  slideClassName?: string
  slideHeight?: number
}

export const MainSlider: FC<SliderProps> = ({
  className = '',
  slideClassName = '',
  slides,
  slideHeight,
  ...props
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const { windowSize } = useWindowSize()

  const [disabledNavigation, setDisabledNavigation] = useState<{ prev: boolean; next: boolean }>({
    prev: true,
    next: true,
  })

  const onUpdateDisableNavigation = useCallback(
    ({ isBeginning, isEnd }: Pick<SwiperType, 'isBeginning' | 'isEnd'>) => {
      const prev = isBeginning && (!swiper?.originalParams?.loop || windowSize.width <= 1024)
      const next = isEnd && (!swiper?.originalParams?.loop || windowSize.width <= 1024)

      setDisabledNavigation(prevState => ({
        ...prevState,
        prev,
        next,
      }))
    },
    [swiper],
  )

  return (
    <div className={className}>
      <Swiper
        modules={[Virtual, Autoplay, EffectFade]}
        centeredSlides
        spaceBetween={20}
        allowTouchMove
        breakpoints={{
          1024: {
            loop: false,
          },
          1280: {
            allowTouchMove: false,
          },
        }}
        onSwiper={swiper => {
          setSwiper(swiper)
          onUpdateDisableNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd })
        }}
        onSlideChange={onUpdateDisableNavigation}
        onResize={({ isBeginning, isEnd, originalParams }) => {
          const currPrev = isBeginning && originalParams.loop
          const currNext = isEnd && originalParams.loop

          if (currPrev !== disabledNavigation.prev || currNext !== disabledNavigation.next) {
            onUpdateDisableNavigation({ isBeginning, isEnd })
          }
        }}
        className={'relative rounded-b-[32px] laptop:rounded-[32px]'}
        {...props}
      >
        {slides.map(({ id, ...slide }, idx) => {
          return (
            <SwiperSlide key={id} virtualIndex={idx}>
              <Slide {...slide} slideHeight={slideHeight} slideClassName={slideClassName} />
            </SwiperSlide>
          )
        })}

        <div className='absolute bottom-8 right-[68px] z-20 hidden gap-2 laptop:flex'>
          <PrevSlide isDisabled={disabledNavigation.prev} speed={props?.speed ?? 500} />
          <NextSlide isDisabled={disabledNavigation.next} speed={props?.speed ?? 500} />
        </div>
      </Swiper>
    </div>
  )
}

function Slide({
  heading,
  slideClassName = '',
  slideHeight,
  image,
}: Omit<SlideProps, 'id'> & { slideClassName?: string; slideHeight?: number }) {
  return (
    <div className={clsx('desktop:h-[656px]', slideClassName)}>
      <div style={{ height: slideHeight }}>
        <PayloadImage
          src={image}
          className='!static h-full w-full'
          skipBlur
          imgProps={{
            className: clsx(
              'absolute left-0 top-0 z-10 h-full w-full rounded-b-[32px] object-cover laptop:rounded-[32px]',
            ),
          }}
        />

        {heading && (
          <div className='relative z-20 mx-3 mb-4 mt-32 flex max-w-[496px] flex-col gap-8 rounded-[32px] bg-gray-25 p-4 mobile:p-8 tablet:m-8 tablet:mt-48 laptop:ml-[68px] laptop:mt-64 desktop:absolute desktop:bottom-0 desktop:left-[68px] desktop:mx-0 desktop:mt-0'>
            <div className='flex flex-col gap-2'>
              {heading.title && (
                <h3 className='helvetica-sm font-light text-gray-900'>{heading.title}</h3>
              )}
              {heading.description && (
                <p className='gilroy-sm line-clamp-2 text-gray-700 tablet:line-clamp-none'>
                  {heading.description}
                </p>
              )}
            </div>

            {heading.button && (
              <Button {...heading.button.props}>
                <span className='flex grow justify-start'>{heading.button.text}</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
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
