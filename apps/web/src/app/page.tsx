'use client'

import { Input, NewsCard, ProductCard } from 'ui'
import { action } from './actions'
import { CustomSelect } from './CustomSelect'
import { motion } from 'framer-motion'

export default function Home() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  // return (
  //   <Input
  //     type='time'
  //     ariaLabel='time-picker'
  //     trailingComplex={{ start: 'Clock' }}
  //     label='Choose a time'
  //   />
  // )

  return (
    <motion.div
      className='grid-desktop m-[100px]'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <NewsCard
        link='/'
        title='News'
        tag='Tag'
        titleColor='black'
        animationProps={{ variants: item }}
        className='col-span-3'
      />
      <NewsCard
        link='/'
        title='News'
        tag='Tag'
        titleColor='black'
        animationProps={{ variants: item }}
        className='col-span-3'
      />
      <NewsCard
        link='/'
        title='News'
        titleColor='black'
        tag='Tag'
        animationProps={{ variants: item }}
        className='col-span-3'
      />
      <NewsCard
        link='/'
        title='News'
        titleColor='black'
        tag='Tag'
        animationProps={{ variants: item }}
        className='col-span-3'
      />
    </motion.div>
  )
}
