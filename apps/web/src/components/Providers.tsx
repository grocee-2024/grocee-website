import 'react-loading-skeleton/dist/skeleton.css'

import { FC, PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SkeletonTheme baseColor='#C6C6C6' highlightColor='#EBEBEB'>
      {children}
    </SkeletonTheme>
  )
}
