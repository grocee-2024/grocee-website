'use client'

import { FC, PropsWithChildren, useMemo, useRef } from 'react'
import { AllIconNames, IconType } from '@oleksii-lavka/grocee-icons'
import { FocusRing, useButton, useLink } from 'react-aria'
import { HTMLMotionProps, motion } from 'framer-motion'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { IconsWrapper } from './IconsWrapper'
import { Loader } from 'ui'

export type IconProps =
  | {
      icon: AllIconNames | IconType
      onHoverClassName?: string
    }
  | (AllIconNames | IconType)

export type ButtonProps = PropsWithChildren<{
  className?: string
  leftIcon?: IconProps
  rightIcon?: IconProps
  isLoading?: boolean
  isDisabled?: boolean
  href?: LinkProps['href']
  animationProps?: HTMLMotionProps<'a' | 'button'>
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  tabIndex?: number
  onClick?: () => void
  formAction?: () => void
}>

export const Button: FC<ButtonProps> = props => {
  const {
    variant = 'primary',
    leftIcon,
    rightIcon,
    children,
    href,
    type = 'button',
    formAction,
    isLoading,
    className = '',
    ...restProps
  } = props
  const { isDisabled, onClick, animationProps = {} } = restProps

  const refButton = useRef<HTMLButtonElement | null>(null)
  const refLink = useRef<HTMLAnchorElement | null>(null)

  const isButtonDisabled = isDisabled || isLoading

  const { buttonProps, isPressed: isButtonPressed } = useButton(
    { ...restProps, onPress: onClick, type, isDisabled: isButtonDisabled },
    refButton,
  )
  const { linkProps, isPressed: isLinkPressed } = useLink(
    {
      ...restProps,
      onPress: onClick,
    },
    refLink,
  )

  const isPressed = isButtonPressed || isLinkPressed

  const parentProps = useMemo(
    () => ({
      className: clsx(
        'text-md group/button relative m-12 inline-block min-h-12 touch-none rounded-[1000px] border-transparent px-6 py-3 font-gilroy no-underline transition-colors duration-300 ease-in-out',
        'after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:rounded-[1000px] after:border-[1px] after:transition-colors after:duration-300 after:content-[""]',
        {
          primary: clsx({
            'text-white': !isButtonDisabled,
            'after:border-transparent': !isPressed,
            'bg-gray-900 hover:bg-gray-800': !isPressed && !isButtonDisabled,
            'bg-gray-900 after:border-gray-800': isPressed,
            'bg-gray-200 text-gray-500': isButtonDisabled,
          }),
          secondary: clsx('bg-transparent', {
            'text-gray-800 after:border-gray-800 hover:text-gray-700 hover:after:border-gray-700':
              !isPressed && !isButtonDisabled,
            'text-gray-900 after:border-gray-900': isPressed,
            'text-gray-300 after:border-gray-300': isButtonDisabled,
          }),
          tertiary: clsx('bg-white hover:after:border-gray-800', {
            'after:border-gray-800': isPressed,
            'bg-gray-25 text-gray-200': isButtonDisabled,
            'after:border-transparent': !isPressed,
            'text-gray-900': !isButtonDisabled,
          }),
          danger: clsx('bg-transparent', {
            'text-error-700 after:border-error-700': isPressed && !isButtonDisabled,
            'text-error-500 after:border-error-500 hover:text-error-600 hover:after:border-error-600':
              !isPressed && !isButtonDisabled,
            'text-gray-500 after:border-gray-500': isButtonDisabled,
          }),
        }[variant],
        className,
      ),
      ...animationProps,
    }),
    [variant, isPressed, isButtonDisabled],
  )

  const contnet = (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center gap-2'>
          <Loader size={20} />
        </div>
      ) : (
        <IconsWrapper
          className='flex items-center justify-center gap-2'
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </IconsWrapper>
      )}
    </>
  )

  if (href) {
    const MLink = motion(Link)

    const { onPointerUp, ...restLinkProps } = linkProps

    return (
      <FocusRing focusRingClass='ring ring-offset-2'>
        {/* @ts-ignore */}
        <MLink
          ref={refLink}
          {...restLinkProps}
          {...parentProps}
          onPointerUp={event => {
            onPointerUp && onPointerUp(event)

            event.currentTarget.click()
          }}
          href={href}
          aria-label='link'
        >
          {contnet}
        </MLink>
      </FocusRing>
    )
  }

  // eslint-disable-next-line no-unused-vars
  const { onClick: onButtonClick, onPointerDown, onPointerUp, ...restButtonProps } = buttonProps

  return (
    <FocusRing focusRingClass='ring ring-offset-2'>
      {/* @ts-ignore */}
      <motion.button
        ref={refButton}
        {...restButtonProps}
        {...parentProps}
        onPointerDown={event => {
          onPointerDown && onPointerDown(event)
        }}
        onPointerUp={event => {
          onPointerUp && onPointerUp(event)

          isButtonPressed && event.currentTarget.click()
        }}
        //@ts-ignore
        formAction={formAction}
        aria-label='button'
        aria-disabled={isDisabled || isLoading}
      >
        {contnet}
      </motion.button>
    </FocusRing>
  )
}
