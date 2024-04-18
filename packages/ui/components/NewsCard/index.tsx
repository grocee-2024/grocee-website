import { FC } from 'react'
import { Image as PayloadImageType } from 'cms-types'
import clsx from 'clsx'
import { Tag } from '../Tag'
import { Button } from '../Button'
import { HTMLMotionProps, motion } from 'framer-motion'

type Props = {
  tag?: string
  image?: PayloadImageType
  title: string
  titleColor?: 'white' | 'black'
  height?: number
  minWidth?: number
  link: string
  imageClassName?: string
  className?: string
  animationProps?: HTMLMotionProps<'div'>
}

export const NewsCard: FC<Props> = props => {
  const {
    title,
    link,
    tag,
    titleColor = 'white',
    imageClassName = '',
    className = '',
    height = 384,
    minWidth,
    animationProps = {},
  } = props

  return (
    <motion.div
      className={clsx('relative rounded-2xl', className)}
      style={{ height, minWidth }}
      {...animationProps}
    >
      <div className='absolute h-full w-full overflow-hidden rounded-lg'>
        <img
          src='/temp-image.png'
          alt='product'
          className={clsx('absolute left-0 top-0 h-full w-full object-cover', imageClassName)}
        />
      </div>

      <div className='relative z-10 flex h-full flex-col justify-between gap-4 p-4'>
        {tag && (
          <div>
            <Tag text={tag} />
          </div>
        )}

        <div>
          <h3 className='gilroy-xl mb-4' style={{ color: titleColor }}>
            {title}
          </h3>

          <Button href={link} standartButton variant='tertiary'>
            Review
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
