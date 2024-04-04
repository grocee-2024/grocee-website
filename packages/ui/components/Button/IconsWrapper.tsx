import { FC, PropsWithChildren } from 'react'
import { ButtonProps } from '.'
import { parseIcon } from 'ui/helpers/parseIcon'
import { motion } from 'framer-motion'

type Props = PropsWithChildren &
  Pick<ButtonProps, 'leftIcon' | 'rightIcon'> & {
    className?: string
  }

const mapHoverClassName = (className?: string) => {
  return (className ?? '')
    .split(' ')
    .map(classNameItem => {
      if (classNameItem.startsWith('group-hover/button:')) {
        return classNameItem
      }

      return `group-hover/button:${classNameItem}`
    })
    .join(' ')
}

export const IconsWrapper: FC<Props> = ({ children, leftIcon, rightIcon, className = '' }) => {
  const [
    { icon: LeftIcon, onHoverClassName: onLeftIconHoverClassName },
    { icon: RightIcon, onHoverClassName: onRightIconHoverClassName },
  ] = [parseIcon(leftIcon), parseIcon(rightIcon)]

  return (
    <div className={className}>
      {LeftIcon && (
        <motion.div className={mapHoverClassName(onLeftIconHoverClassName)}>
          <LeftIcon height={12} width={24} />
        </motion.div>
      )}
      {children}
      {RightIcon && (
        <motion.div className={mapHoverClassName(onRightIconHoverClassName)}>
          <RightIcon height={12} width={24} />
        </motion.div>
      )}
    </div>
  )
}
