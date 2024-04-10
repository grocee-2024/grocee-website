'use client'

import { PropsWithChildren, useEffect } from 'react'
import { ButtonProps, IconProps } from '.'
import { parseIcon } from 'ui/helpers/parseIcon'
import { motion, useAnimate } from 'framer-motion'

type Props<T> = PropsWithChildren &
  Pick<ButtonProps<T>, 'leftIcon' | 'rightIcon'> & {
    className?: string
  }

function Icon<T>({ icon }: { icon?: IconProps<T> }) {
  const { icon: MappedIcon, animateWhen, animationProps, value } = parseIcon(icon)
  const [scope, animate] = useAnimate()

  if (!MappedIcon) {
    return null
  }

  useEffect(() => {
    if (animateWhen(value)) {
      animate(scope.current, animationProps?.initial ?? {})
    } else {
      animate(scope.current, animationProps?.exit ?? {})
    }
  }, [animateWhen, value, animationProps])

  return (
    <motion.div ref={scope}>
      <MappedIcon height={16} width={24} />
    </motion.div>
  )
}

export function IconsWrapper<T>({ children, leftIcon, rightIcon, className = '' }: Props<T>) {
  return (
    <div className={className}>
      <Icon icon={leftIcon} />
      {children}
      <Icon icon={rightIcon} />
    </div>
  )
}
