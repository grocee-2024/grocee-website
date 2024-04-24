'use client'

import { Children, FC, PropsWithChildren, useCallback, useId, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Virtual } from 'swiper/modules'
import { Button } from '../Button'
import { AllIconNames, IconType } from '@oleksii-lavka/grocee-icons'
import clsx from 'clsx'
import { useCanHover } from '../../hooks'

import 'swiper/css'
import 'swiper/css/virtual'

type CarouselProps = PropsWithChildren<{
  title?: string
  showLink?: boolean
  buttonLink?: string
  buttonText?: string
  buttonIcon?: AllIconNames | IconType | null
  speed?: number
  loop?: boolean
  virtual?: boolean
  className?: string
}>

export const Carousel: FC<CarouselProps> = ({
  children,
  title,
  speed = 500,
  buttonLink,
  buttonText,
  buttonIcon,
  className = '',
  loop = false,
  virtual = false,
  showLink = true,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const canHover = useCanHover()
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [disabledNavigation, setDisabledNavigation] = useState<{ prev: boolean; next: boolean }>({
    prev: true,
    next: true,
  })

  const carouselId = useId()

  const onUpdateDisableNavigation = useCallback(
    ({ isBeginning, isEnd }: Pick<SwiperType, 'isBeginning' | 'isEnd'>) => {
      const prev = isBeginning && (!swiper?.originalParams?.loop ?? false)
      const next = isEnd && (!swiper?.originalParams?.loop ?? false)

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
      modules={[Virtual]}
      spaceBetween={24}
      slidesPerView={1}
      virtual={virtual}
      loop={loop}
      allowTouchMove
      onResize={({ isBeginning, isEnd, originalParams }) => {
        const currPrev = isBeginning && (originalParams?.loop ?? false)
        const currNext = isEnd && (originalParams?.loop ?? false)

        if (currPrev !== disabledNavigation.prev || currNext !== disabledNavigation.next) {
          onUpdateDisableNavigation({ isBeginning, isEnd })
        }
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1280: {
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
          {showLink && buttonText && buttonLink && (
            <Button
              href={buttonLink}
              standartButton
              variant='tertiary'
              rightIcon={{
                icon: buttonIcon,
                size: 18,
                animateWhen: value => !!value,
                value: isHovered && canHover,
                animationProps: {
                  initial: {
                    translateX: 3,
                  },
                  exit: {
                    translateX: 0,
                  },
                },
              }}
              onHoverStart={() => {
                setIsHovered(true)
              }}
              onHoverEnd={() => {
                setIsHovered(false)
              }}
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
