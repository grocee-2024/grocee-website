'use client'

import { AccordionList, Card, Carousel, Input, MainSlider, ProductCard } from 'ui'

export default function Home() {
  return (
    <div className=''>
      <Carousel
        className='width-limit'
        title='Categories'
        buttonIcon='ArrowCircleRight'
        buttonText='All'
        buttonLink='/'
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProductCard key={idx} link='/' price={50} rating={5} title='Title' weight='Weight' />
        ))}
      </Carousel>
    </div>
  )
}
