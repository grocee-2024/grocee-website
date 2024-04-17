'use client'

import { FC, ReactNode, useState } from 'react'
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Virtual, Autoplay } from 'swiper/modules'
import { Button, ButtonProps } from '../Button'
import type { Image as PayloadImageType } from 'cms-types'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'

import 'swiper/css'
import 'swiper/css/virtual'

type SlideProps = {
  image: PayloadImageType | string
  heading?: {
    title?: string
    description?: string
    button?: {
      props: ButtonProps<string>
      children: ReactNode
    }
  }
}

type SliderProps = Pick<
  SwiperProps,
  | 'loop'
  | 'autoplay'
  | 'allowTouchMove'
  | 'breakpoints'
  | 'spaceBetween'
  | 'slidesPerView'
  | 'slidesPerGroup'
  | 'virtual'
  | 'speed'
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
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  return (
    <>
      <Swiper
        modules={[Virtual, Autoplay]}
        centeredSlides
        onSwiper={setSwiper}
        onSlideChange={({ activeIndex }) => {
          setActiveIndex(activeIndex)
        }}
        className={clsx('relative rounded-[32px]', className)}
        {...props}
      >
        {slides.map((slide, idx) => {
          return (
            <SwiperSlide key={uuidv4()} virtualIndex={idx}>
              <Slide {...slide} slideHeight={slideHeight} slideClassName={slideClassName} />
            </SwiperSlide>
          )
        })}

        <div className='absolute bottom-8 right-[68px] z-20 hidden gap-2 laptop:flex'>
          <PrevSlide
            isDisabled={Boolean(activeIndex === 0 && !swiper?.originalParams.loop)}
            speed={props?.speed ?? 500}
          />
          <NextSlide
            isDisabled={Boolean(activeIndex === slides.length - 1 && !swiper?.originalParams.loop)}
            speed={props?.speed ?? 500}
          />
        </div>
      </Swiper>
    </>
  )
}

function Slide({
  heading,
  slideClassName = '',
  slideHeight,
}: SlideProps & { slideClassName?: string; slideHeight?: number }) {
  return (
    <div className={clsx('desktop:h-[656px]', slideClassName)}>
      <div className='relative h-full w-full' style={{ height: slideHeight }}>
        <img
          src='/main-section.png'
          className={clsx('absolute left-0 top-0 z-10 h-full w-full rounded-[32px] object-cover')}
          alt='alt'
        />

        {heading && (
          <div className='relative z-20 mx-3 mb-4 mt-32 flex max-w-[496px] flex-col gap-8 rounded-[32px] bg-gray-25 p-4 mobile:p-8 tablet:m-8 tablet:mt-48 laptop:ml-[68px] laptop:mt-64 desktop:absolute desktop:bottom-0 desktop:left-[68px] desktop:mx-0 desktop:mt-0'>
            <div className='flex flex-col gap-2'>
              {heading.title && (
                <h3 className='helvetica-sm font-light text-gray-900'>{heading.title}</h3>
              )}
              {heading.description && (
                <p className='gilroy-sm line-clamp-3 text-gray-700 tablet:line-clamp-none'>
                  {heading.description}
                </p>
              )}
            </div>

            {heading.button && <Button {...heading.button.props}>{heading.button.children}</Button>}
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
