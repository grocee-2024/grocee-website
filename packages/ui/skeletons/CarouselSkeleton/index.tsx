'use client'

import { CarouselBlock } from 'cms-types'
import Skeleton from 'react-loading-skeleton'
import { CardSkeleton, NewsCardSkeleton, ProductCardSkeleton } from '..'

type Props = Pick<CarouselBlock['settings'], 'type'>

export function CarouselSkeleton({ type }: Props) {
  const CARDS: Record<
    Props['type'],
    // eslint-disable-next-line no-unused-vars
    (...args: any[]) => JSX.Element | null | Promise<JSX.Element | null>
  > = {
    simpleCard: CardSkeleton,
    productCard: ProductCardSkeleton,
    newsCard: NewsCardSkeleton,
  }

  const SkeletonCard = CARDS[type] || null

  return (
    <div className='width-limit flex flex-col gap-6 tablet:gap-8'>
      <div className='flex w-full justify-between gap-6 '>
        <Skeleton className='block h-[32px] min-w-[100px] tablet:h-[44px] tablet:min-w-[130px]' />
        <Skeleton className='block h-[32px] min-w-[70px] tablet:h-[44px] tablet:min-w-[170px]' />
      </div>
      <div className='grid grid-cols-1 grid-rows-1 gap-6 overflow-hidden mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4'>
        <div className='col-span-1'>
          <SkeletonCard />
        </div>
        <div className='col-span-1 hidden mobile:block'>
          <SkeletonCard />
        </div>
        <div className='col-span-1 hidden h-[250px] laptop:block'>
          <SkeletonCard />
        </div>
        <div className='col-span-1 hidden h-[250px] desktop:block'>
          <SkeletonCard />
        </div>
      </div>
    </div>
  )
}
