'use client'

import { FC, ReactNode, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { FocusRing } from 'react-aria'

export type NavLinkType = {
  href: string
  linkClassName: string
  defaultIcon: ReactNode
  activeIcon: ReactNode
  badge?: number
  onClick?: () => void
}

export const NavLink: FC<NavLinkType> = ({
  activeIcon,
  defaultIcon,
  href,
  linkClassName,
  badge,
  onClick,
}) => {
  const pathname = usePathname()

  const currentIcon = useMemo(
    () => (pathname.startsWith(href) ? activeIcon : defaultIcon),
    [pathname, href, activeIcon, defaultIcon],
  )

  return (
    <FocusRing focusRingClass='ring ring-offset-2'>
      <Link
        onClick={onClick}
        href={href}
        className={clsx(
          'relative transition-colors duration-300 hover:text-gray-700',
          linkClassName,
        )}
      >
        {badge && (
          <span className='gilroy-xs absolute bottom-3 left-3 flex h-[18px] w-[18px] items-center justify-center rounded-[50%] border-[1px] border-white bg-error-500 font-light text-white'>
            {badge}
          </span>
        )}
        {currentIcon}
      </Link>
    </FocusRing>
  )
}
