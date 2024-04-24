'use client'

import { motion } from 'framer-motion'
import { FC, useState } from 'react'

export const BurgerMenu: FC = () => {
  const [opened, setOpened] = useState(false)

  return (
    <motion.button
      onClick={() => setOpened(prev => !prev)}
      className='relative top-[2px] h-[18px] w-4'
      animate={opened ? 'opened' : 'closed'}
    >
      <motion.span
        variants={{
          opened: {
            rotate: '45deg',
            top: 8.5,
          },
          closed: {
            rotate: '0deg',
            top: 6.5,
          },
        }}
        className='absolute left-0 top-[6.5px] h-[1px] w-full bg-gray-900'
      />
      <motion.span
        variants={{
          opened: {
            rotate: '-45deg',
            bottom: 8.5,
          },
          closed: {
            rotate: '0deg',
            bottom: 6.5,
          },
        }}
        className='absolute bottom-[6.5px] left-0 h-[1px] w-full bg-gray-900'
      />
    </motion.button>
  )
}
