'use client'

import { useGlobalTypography } from '@/store/globalTypographyStore'
import { FC } from 'react'
import { type BannerProps, Banner as BannerUI } from 'ui'

export const BannerClient: FC<BannerProps> = ({ heading, ...props }) => {
  const { orderDeliveryForm } = useGlobalTypography()

  return (
    // @ts-ignore
    <BannerUI {...props} heading={{ ...heading, orderDeliveryFormTypography: orderDeliveryForm }} />
  )
}
