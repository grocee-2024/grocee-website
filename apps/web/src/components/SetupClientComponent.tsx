'use client'

import { GlobalTypography } from 'cms-types'
import { useEffect } from 'react'

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

  return null
}

export default SetupClientComponent
