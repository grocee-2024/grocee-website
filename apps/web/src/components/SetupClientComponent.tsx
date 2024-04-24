'use client'

import { GlobalTypography } from 'cms-types'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'

import { useGlobalTypography } from '@/store/globalTypographyStore'

type SetupClientComponentProps = {
  globalTypography: GlobalTypography
}

/**
 * This component will setup client side functionality
 */
const SetupClientComponent = ({ globalTypography }: SetupClientComponentProps) => {
  useEffect(() => {
    useGlobalTypography.setState(globalTypography)
  }, [globalTypography])

  return (
    <NextNProgress
      color='#393939'
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow
      options={{ easing: 'ease', speed: 500 }}
    />
  )
}

export default SetupClientComponent
