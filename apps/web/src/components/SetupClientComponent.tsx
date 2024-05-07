'use client'

import { GlobalTypography } from 'cms-types'
import { useEffect } from 'react'
import { useGlobalTypography, useSearchHistory } from '@/store'

type SetupClientComponentProps = {
  globalTypography: GlobalTypography
}

const SetupClientComponent = ({ globalTypography }: SetupClientComponentProps) => {
  useEffect(() => {
    useGlobalTypography.setState(globalTypography)
    useSearchHistory.persist.rehydrate()
  }, [globalTypography])

  return null
}

export default SetupClientComponent
