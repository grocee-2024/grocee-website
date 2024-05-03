'use client'

import { ComponentProps, useMemo, useRef } from 'react'
import { Navigation } from 'ui'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useWindowSize } from 'ui/hooks'
import clsx from 'clsx'
import { useSSR } from '@/hooks'
import { useGlobalTypography } from '@/store/globalTypographyStore'
import { parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { useEdgeBlocksOnPage } from '@/store/edgeBlocksOnPage'

type Props = Omit<ComponentProps<typeof Navigation>, 'support' | 'accountField'>

export function MainNavigationClient(props: Props) {
  const { isClient, isServer } = useSSR()
  const headerRef = useRef<HTMLElement>(null)
  const scrollOffset = useRef(0)
  const { account, support } = useGlobalTypography()
  const { firstBlockOnPage } = useEdgeBlocksOnPage()

  const { scrollY } = useScroll()
  const { isTablet, isLaptop, isMobile } = useWindowSize()

  const headerHasOffsetTop = useMemo(
    () => firstBlockOnPage === 'Banner' || firstBlockOnPage === 'MainSlider',
    [firstBlockOnPage],
  )

  const { headerOffsetTop, minusOffset } = useMemo(() => {
    const offsetTop = {
      mobile: 32,
      tablet: 32,
      laptop: 64,
    }

    const minusOffset = {
      mobile: 32,
      tablet: 32,
      laptop: headerHasOffsetTop ? 96 : 64,
    }

    const currentDevice = isMobile ? 'mobile' : isTablet ? 'tablet' : 'laptop'

    return {
      headerOffsetTop: offsetTop[currentDevice],
      minusOffset: minusOffset[currentDevice],
    }
  }, [isTablet, isLaptop, headerHasOffsetTop, isMobile])

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

  const mappedSupport = useMemo(() => {
    if (!support) {
      return null
    }

    const links = (support?.links ?? []).map(
      ({ type, caption, info, googleMapsLocation, id, icon }) => {
        const href =
          type === 'email'
            ? `mailto:${info}`
            : type === 'phone'
              ? `tel:${info}`
              : googleMapsLocation

        return {
          id: id!,
          caption: caption!,
          href: href ?? '',
          info: info ?? '',
          icon: {
            icon: icon.icon as AllIconNames,
            size: icon.size,
          },
        }
      },
    )

    return {
      links,
    }
  }, [support])

  const mappedAccountField = useMemo(() => {
    if (!account) {
      return null
    }

    return {
      mainMenuAccountField: {
        ...account?.mainMenuAccountField,
        link: parsePayloadLink(account?.mainMenuAccountField?.link),
      },
    }
  }, [account])

  return (
    <motion.header
      style={{ transform }}
      ref={headerRef}
      className={clsx(
        'main-header-navigation',
        'left-4 right-4 top-8 z-10 mx-auto max-h-20 max-w-[1240px] bg-transparent transition-transform duration-300 ease-in-out',
        'tablet:left-5 tablet:right-5',
        'laptop:left-12 laptop:right-12',
        'desktop:left-[100px] desktop:right-[100px]',
        {
          'laptop:top-16': headerHasOffsetTop,
          'laptop:top-8': !headerHasOffsetTop,
          hidden: isServer,
          fixed: isClient,
        },
      )}
    >
      <Navigation {...props} accountField={mappedAccountField} support={mappedSupport} />
    </motion.header>
  )
}
