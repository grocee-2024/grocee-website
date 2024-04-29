'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Image, MainNavigation } from 'cms-types'
import { resolveRelation } from '../helpers'
import { Navigation } from 'ui'
import { useScroll, useTransform, motion } from 'framer-motion'
import { parsePayloadLink } from '@/helpers'
import { useWindowSize } from 'ui/hooks'
import clsx from 'clsx'

export default function MainNavigation({ logo, search }: MainNavigation) {
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const scrollOffset = useRef(0)

  const resolvedLogo = resolveRelation(logo.image)
  const logoUrl = parsePayloadLink(logo.page)

  const { scrollY } = useScroll()
  const { isTablet, isLaptop, isMobile } = useWindowSize()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { headerOffsetTop, minusOffset } = useMemo(() => {
    const offsetTop = {
      mobile: 32,
      tablet: 32,
      laptop: 64,
    }

    const minusOffset = {
      mobile: 32,
      tablet: 32,
      laptop: 96,
    }

    const currentDevice = isMobile ? 'mobile' : isTablet ? 'tablet' : 'laptop'

    return {
      headerOffsetTop: offsetTop[currentDevice],
      minusOffset: minusOffset[currentDevice],
    }
  }, [isTablet, isLaptop, isMobile])

  const transform = useTransform(scrollY, scrollPosition => {
    if (
      !headerRef.current ||
      scrollPosition < (headerOffsetTop + headerRef.current.clientHeight) / 6
    ) {
      return 'translateY(0)'
    }

    if (scrollPosition > scrollOffset.current) {
      scrollOffset.current = scrollPosition

      return 'translateY(-200%)'
    }

    scrollOffset.current = scrollPosition

    return `translateY(${headerOffsetTop - minusOffset}px)`
  })

  return (
    <motion.header
      style={{ transform }}
      ref={headerRef}
      className={clsx(
        'left-4 right-4 top-8 z-50 mx-auto max-h-20 max-w-[1240px] rounded-[1000px] bg-white px-4 shadow-[0_8px_24px_0_rgba(179,179,179,0.2)] transition-transform duration-300 ease-in-out',
        'tablet:left-5 tablet:right-5 tablet:px-6',
        'laptop:left-12 laptop:right-12 laptop:top-16',
        'desktop:left-[100px] desktop:right-[100px]',
        {
          absolute: !mounted,
          fixed: mounted,
        },
      )}
    >
      <Navigation logo={resolvedLogo as Image} logoUrl={logoUrl} search={search} />
    </motion.header>
  )
}
