'use client'

import { FC, useRef } from 'react'
import { ArrowRight } from '@oleksii-lavka/grocee-icons/icons'
import Link from 'next/link'
import clsx from 'clsx'
import { Image as PayloadImageType } from 'cms-types'
import { useHover, useLink } from 'react-aria'

type CardProps = {
  className?: string
  image?: PayloadImageType
  text: string
  href: string
  gap?: 'small' | 'normal'
}

export const Card: FC<CardProps> = props => {
  const { className = '', href, text, gap = 'small' } = props

  const { hoverProps, isHovered } = useHover({})
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  const { linkProps } = useLink(props, linkRef)

  return (
    <Link
      href={href}
      className={clsx(
        'relative m-3 flex flex-col rounded-lg bg-gray-25 p-2',
        {
          'gap-4': gap === 'small',
          'gap-8': gap === 'normal',
        },
        className,
      )}
      {...linkProps}
      {...hoverProps}
      ref={linkRef}
    >
      <div className='grow overflow-hidden rounded-lg'>
        <img
          src='/action.png'
          className={clsx('h-full w-full object-cover transition-transform duration-200', {
            'scale-110': isHovered,
          })}
          alt='alt'
        />
      </div>

      <div className='gilroy-md flex items-center justify-between gap-1 text-gray-900'>
        <span>{text}</span>
        <ArrowRight
          className={clsx('transition-transform duration-200', {
            'translate-x-1': isHovered,
          })}
        />
      </div>
    </Link>
  )
}
