import { IconType, mapIcon } from '@oleksii-lavka/grocee-icons'
import { IconProps } from 'ui/components/Button'

export const parseIcon = (
  icon?: IconProps,
): {
  icon: IconType | null
  onHoverClassName?: string
} => {
  if (!icon) {
    return {
      icon: null,
    }
  }

  if (typeof icon === 'string') {
    return {
      icon: mapIcon(icon),
    }
  }

  if ('icon' in icon) {
    return {
      ...parseIcon(icon.icon),
      onHoverClassName: icon?.onHoverClassName,
    }
  }

  return {
    icon,
  }
}
