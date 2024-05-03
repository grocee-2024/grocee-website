'use client'

import { useGlobalTypography } from '@/store/globalTypographyStore'
import { FC } from 'react'
import { type BannerProps, Banner as BannerUI } from 'ui'
import { WithSkeletonLoader } from 'ui/hoc'
import { BannerSkeleton } from 'ui/skeletons'

export const BannerClient: FC = WithSkeletonLoader(({ heading, ...props }: BannerProps) => {
  const { orderDeliveryForm } = useGlobalTypography()

  return (
    // @ts-ignore
    <BannerUI {...props} heading={{ ...heading, orderDeliveryFormTypography: orderDeliveryForm }} />
  )
}, BannerSkeleton)
