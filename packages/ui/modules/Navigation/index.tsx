'use client'

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavItems } from './NavItems'
import { SearchInput } from './SearchInput'
import { type Image as PayloadImageType, MainNavigation } from 'cms-types'
import Link from 'next/link'
import { PayloadImage } from '../..'
import { BurgerMenu } from './BurgerMenu'
import { FocusRing } from 'react-aria'
import { MobileSideBar } from './SideBar/MobileSideBar'
import modalService from '../../service/modalService'
import { useOnClickOutside } from 'usehooks-ts'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { CommonLink, MappedCard } from '../../types'
import { useWindowSize } from '../../hooks'
import { DesktopSideBar } from './SideBar/DesktopSideBar'
import { usePathname } from 'next/navigation'

type CommonNavigationProps = {
  title: string
  icon: {
    icon: AllIconNames
    size: {
      width: number
      height: number
    }
  }
}

type Support = {
  links: {
    id: string
    caption: string
    info: string
    href: string
    icon?: {
      icon?: AllIconNames
      size?: {
        width: number
        height: number
      }
    }
  }[]
}

type NavigationType = {
  categories: CommonNavigationProps & {
    cardLinks: MappedCard[]
    commonLinks: CommonLink[]
  }
  delivery: CommonNavigationProps
  promotions: CommonNavigationProps & {
    cardLinks: MappedCard[]
  }
  integration: CommonNavigationProps & {
    logos: {
      id: string
      logo?: PayloadImageType
    }[]
  }
}

type NavigationProps = Pick<MainNavigation, 'search' | 'defaultMenuHeader'> & {
  logo: PayloadImageType
  logoUrl: string
  navigation: NavigationType
  helpNavigation: CommonLink[]
  accountField: {
    mainMenuAccountField: {
      link: string
      title: string
      description: string
    }
  } | null
  support: Support | null
  backButton: {
    label: string
    icon: {
      icon: AllIconNames
      size: {
        width: number
        height: number
      }
    }
  }
}

export const Navigation: FC<NavigationProps> = ({ logo, logoUrl, search, ...props }) => {
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false)
  const navigationRef = useRef<HTMLDivElement | null>(null)
  const mobileAsideRef = useRef<HTMLElement | null>(null)

  const pathname = usePathname()

  const { isMobile, isTablet, isLaptop, isDesktop, windowSize } = useWindowSize()

  const fade = useMemo(() => (isMobile || isTablet ? 'full' : 'showHeader'), [isMobile, isTablet])

  const addHeaderRightOffset = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const offsetRight = isMobile ? 16 : isTablet ? 20 : isLaptop ? 48 : 100

    const header = document.querySelector('.main-header-navigation') as HTMLElement

    if (scrollbarWidth > 0) {
      header.style.right = `${offsetRight + scrollbarWidth}px`
    }
  }, [isMobile, isDesktop, isLaptop, isDesktop, windowSize.width])

  const clearHeaderRightOffset = useCallback(() => {
    const header = document.querySelector('.main-header-navigation') as HTMLElement

    header.style.right = ''
  }, [isLaptop, isDesktop, windowSize.width])

  const handleOpenBurgerMenu = useCallback(() => {
    addHeaderRightOffset()

    setBurgerMenuOpened(true)
    modalService.changeModalState('burgerMenu', true, { fade })
  }, [fade, windowSize.width])

  const handleCloseBurgerMenu = useCallback(() => {
    clearHeaderRightOffset()

    setBurgerMenuOpened(false)
    modalService.changeModalState('burgerMenu', false, { fade })
  }, [fade, windowSize.width])

  useEffect(() => {
    modalService.addActionOnScreenChange('burgerMenu', {
      onCloseMobile() {
        clearHeaderRightOffset()
        handleCloseBurgerMenu()
        modalService.clearFade()
      },
      onCloseDesktop() {
        clearHeaderRightOffset()
        handleCloseBurgerMenu()
        modalService.clearFade()
      },
    })
  }, [])

  useOnClickOutside(mobileAsideRef, handleCloseBurgerMenu)
  useOnClickOutside(navigationRef, () => {
    if (!isMobile && !isTablet) {
      handleCloseBurgerMenu()
    }
  })

  useEffect(() => {
    if (burgerMenuOpened) {
      handleCloseBurgerMenu()
    }
  }, [pathname])

  return (
    <div ref={navigationRef}>
      <div className='relative z-30 flex h-full w-full items-center justify-between rounded-[1000px] bg-white px-4 py-[15px] shadow-[0_8px_24px_0_rgba(179,179,179,0.3)] tablet:px-6 tablet:py-[28px]'>
        <BurgerMenu
          isOpen={burgerMenuOpened}
          onOpen={handleOpenBurgerMenu}
          onClose={handleCloseBurgerMenu}
        />

        <FocusRing focusRingClass='ring ring-offset-2'>
          <Link
            className='absolute left-12 mt-[-3px] h-[30px] w-[86px] tablet:left-16 laptop:left-[72px]'
            href={logoUrl}
            onClick={() => {
              if (burgerMenuOpened) {
                handleCloseBurgerMenu()
              }
            }}
          >
            <PayloadImage className='h-full w-full' src={logo} />
          </Link>
        </FocusRing>

        <SearchInput search={search} />

        <NavItems
          onClickOnLink={() => {
            if (burgerMenuOpened) {
              handleCloseBurgerMenu()
            }
          }}
        />
      </div>

      <MobileSideBar
        {...props}
        isOpen={burgerMenuOpened}
        ref={mobileAsideRef}
        onClose={handleCloseBurgerMenu}
      />

      <DesktopSideBar {...props} isOpen={burgerMenuOpened} />
    </div>
  )
}
