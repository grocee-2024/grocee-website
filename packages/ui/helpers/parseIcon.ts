/* eslint-disable no-unused-vars */
import { IconType, mapIcon } from '@oleksii-lavka/grocee-icons'
import { IconProps } from 'ui/components/Button'
import { AnimationProps } from 'framer-motion'

export function parseIcon<T>(icon?: IconProps<T>): {
  icon: IconType | null
  animationProps?: Pick<AnimationProps, 'initial' | 'exit'>
  animateWhen?: (value?: T) => boolean
  value?: T
} {
  if (!icon || !icon?.icon) {
    return {
      icon: null,
      animateWhen: () => false,
      animationProps: {
        initial: {},
        exit: {},
      },
    }
  }

  if (typeof icon === 'string') {
    return {
      icon: mapIcon(icon),
      animateWhen: () => false,
      animationProps: {
        initial: {},
        exit: {},
      },
    }
  }

  if ('icon' in icon) {
    return {
      icon: typeof icon.icon === 'string' ? mapIcon(icon.icon) : icon.icon,
      animationProps: icon?.animationProps,
      animateWhen: icon?.animateWhen,
      value: icon?.value,
    }
  }

  return {
    icon: icon as IconType,
    animateWhen: () => false,
    animationProps: {
      initial: {},
      exit: {},
    },
  }
}
