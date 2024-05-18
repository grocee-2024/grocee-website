'use client'

import { FC, Fragment } from 'react'
import { ChevronRight } from '@oleksii-lavka/grocee-icons/icons'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { FocusRing } from 'react-aria'

export type Bredcrumb = {
  id: string
  label: string
  url: string
}

type Props = {
  breadcrumbs: Bredcrumb[]
  className?: string
}

export const Breadcrumbs: FC<Props> = ({ breadcrumbs, className }) => {
  const pathname = usePathname()

  return (
    <ul className={clsx('flex flex-wrap items-center gap-1 tablet:gap-2', className)}>
      {breadcrumbs.map(({ id, label, url }, idx) => (
        <Fragment key={id}>
          <li>
            <FocusRing focusRingClass='ring ring-offset-2'>
              <Link
                className={clsx(
                  'gilroy-sm inline-block font-light !leading-6 no-underline tablet:text-[16px] tablet:leading-[150%]',
                  {
                    'text-gray-900': pathname !== url,
                    'pointer-events-none text-gray-400': pathname === url,
                  },
                )}
                href={url}
              >
                {label}
              </Link>
            </FocusRing>
          </li>
          {idx !== breadcrumbs.length - 1 && (
            <li>
              <ChevronRight className='p-[6px] text-gray-900' size={24} />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  )
}
