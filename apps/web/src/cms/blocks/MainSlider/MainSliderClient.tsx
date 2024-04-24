'use client'

import { FC } from 'react'
import { MainSlider as MainSliderUI, SliderProps } from 'ui'

export const MainSliderClient: FC<SliderProps> = props => {
  return <MainSliderUI {...props} />
}
