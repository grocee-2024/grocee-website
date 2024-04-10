/* eslint-disable no-unused-vars */
'use client'

import {
  PropsWithChildren,
  useMemo,
  useEffect,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
  MutableRefObject,
} from 'react'
import { AllIconNames, IconType } from '@oleksii-lavka/grocee-icons'
import { FocusRing, HoverEvents, mergeProps, useButton, useHover, useLink } from 'react-aria'
import { AnimationProps, HTMLMotionProps, motion } from 'framer-motion'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { IconsWrapper } from './IconsWrapper'
import { Loader } from 'ui'

export type IconProps<T> =
  | {
      icon: AllIconNames | IconType
      animationProps: Pick<AnimationProps, 'initial' | 'exit'>
      animateWhen: (value?: T) => boolean
      value?: T
    }
  | (AllIconNames | IconType)

export type ButtonProps<T> = PropsWithChildren<{
  additionalRef?: MutableRefObject<HTMLButtonElement | HTMLAnchorElement | null>
  className?: string
  leftIcon?: IconProps<T>
  rightIcon?: IconProps<T>
  isLoading?: boolean
  isDisabled?: boolean
  href?: LinkProps['href']
  target?: '_self' | '_blank' | '_parent' | '_top'
  animationProps?: HTMLMotionProps<'div' | 'a'>
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  tabIndex?: number
  isFocused?: boolean
  onClick?: () => void
  formAction?: () => void
  onHoverStart?: HoverEvents['onHoverStart']
  onHoverEnd?: HoverEvents['onHoverEnd']
  onKeyPress?: KeyboardEventHandler<HTMLButtonElement | null>
  onMouseEnter?: MouseEventHandler<HTMLButtonElement | null>
}>

export function Button<T>(props: ButtonProps<T>) {
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
    isFocused,
    onHoverStart = () => {},
    onHoverEnd = () => {},
    onMouseEnter = () => {},
    onKeyPress = () => {},
    additionalRef,
    ...restProps
  } = props
  const { isDisabled, onClick, animationProps } = restProps

  const refButton = useRef<HTMLButtonElement | null>(null)
  const refLink = useRef<HTMLAnchorElement | null>(null)

  const { hoverProps, isHovered } = useHover({ onHoverStart, onHoverEnd })

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

  useEffect(() => {
    if (!additionalRef || !('current' in additionalRef)) {
      return
    }

    if (!href && (!refButton || !('current' in refButton))) {
      return
    }

    if (href && (!refLink || !('current' in refLink))) {
      return
    }

    additionalRef.current = refButton.current
  }, [additionalRef?.current, refButton.current, refLink.current, href])

  const isPressed = isButtonPressed || isLinkPressed || isFocused

  const parentProps = useMemo(
    () => ({
      className: clsx(
        'text-md relative inline-block min-h-12 touch-none select-none rounded-[1000px] border-transparent px-6 py-3 font-gilroy no-underline transition-colors duration-300 ease-in-out',
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
    return (
      <FocusRing focusRingClass='ring ring-offset-2'>
        <Link
          ref={refLink}
          {...mergeProps(linkProps, hoverProps)}
          className='inline-block h-full rounded-[1000px]'
          href={href}
        >
          {/* @ts-ignore */}
          <motion.div {...parentProps}>{contnet}</motion.div>
        </Link>
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
        {...mergeProps(restButtonProps, parentProps, hoverProps)}
        onPointerDown={event => {
          if (event.button !== 0) {
            return
          }

          onPointerDown && onPointerDown(event)
        }}
        onPointerUp={event => {
          if (event.button !== 0) {
            return
          }

          onPointerUp && onPointerUp(event)
          isButtonPressed && event.currentTarget.click()
        }}
        onMouseEnter={onMouseEnter}
        onKeyPress={onKeyPress}
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
