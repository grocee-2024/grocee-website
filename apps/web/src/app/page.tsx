'use client'

import { Input } from 'ui'

export default function Home() {
  return (
    <>
      <Input
        type='text'
        ariaLabel='time-picker'
        trailingComplex={{ start: 'Clock' }}
        label='Choose a time'
        placeholder='00-00'
      />
    </>
  )
}
