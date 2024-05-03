import { Fragment, isValidElement } from 'react'
import {
  MainSliderSkeleton,
  CarouselSkeleton,
  BannerSkeleton,
  CooperationSkeleton,
  HelpBlockSkeleton,
} from 'ui/skeletons'

export default function Loading() {
  const blocks = {
    MainSliderSkeleton,
    CarouselSkeleton: <CarouselSkeleton type='simpleCard' />,
    CarouselSkeleton2: <CarouselSkeleton type='productCard' />,
    BannerSkeleton,
    CarouselSkeleton3: <CarouselSkeleton type='productCard' />,
    CarouselSkeleton4: <CarouselSkeleton type='productCard' />,
    CarouselSkeleton5: <CarouselSkeleton type='productCard' />,
    CarouselSkeleton6: <CarouselSkeleton type='productCard' />,
    CarouselSkeleton7: <CarouselSkeleton type='newsCard' />,
    CooperationSkeleton,
    CarouselSkeleton8: <CarouselSkeleton type='productCard' />,
    HelpBlockSkeleton,
    BannerSkeleton2: BannerSkeleton,
  }

  return (
    <div className='flex flex-col gap-16 laptop:gap-20'>
      {Object.entries(blocks).map(([blockName, Block]) => {
        const isJSXElement = isValidElement(Block)

        if (isJSXElement) {
          return <Fragment key={blockName}>{Block}</Fragment>
        }

        // @ts-ignore
        return <Block key={blockName} />
      })}
    </div>
  )
}
