'use client'

import { GlobalTypography } from 'cms-types'
import { useEffect } from 'react'
import { useGlobalTypography, useSearchHistory, usePrevPath } from '@/store'
import { usePathname, useSearchParams } from 'next/navigation'

type SetupClientComponentProps = {
  globalTypography: GlobalTypography
}

const SetupClientComponent = ({ globalTypography }: SetupClientComponentProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { updatePrevPath } = usePrevPath()

  useEffect(() => {
    useGlobalTypography.setState(globalTypography)
    useSearchHistory.persist.rehydrate()
    usePrevPath.persist.rehydrate()
  }, [globalTypography])

  useEffect(() => {
    const search = searchParams.get('search')

    if (!search) {
      updatePrevPath(pathname)
    }
  }, [pathname, searchParams])

  return null
}

export default SetupClientComponent
