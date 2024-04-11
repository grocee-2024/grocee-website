'use client'
import { Button, Input, Select } from 'ui'
import { useState } from 'react'

const CustomSelect = () => {
  const options = [
    {
      label: 'label 1',
      value: 'value 1',
    },
    {
      label: 'label 2',
      value: 'value 2',
    },
    {
      label: 'label 3',
      value: 'value 3',
    },
    {
      label: 'label 4',
      value: 'value 4',
    },
    {
      label: 'label 5',
      value: 'value 5',
    },
    {
      label: 'label 6',
      value: 'value 6',
    },
    {
      label: 'label 7',
      value: 'value 7',
    },
  ]

  return (
    <Select
      animationOrigin='bottom right'
      onTrigger='click'
      listPosition={{
        horizontal: 'left',
        vertical: 'top',
      }}
      triggerProps={{
        rightIcon: {
          icon: 'SwapVertical',
          size: 16,
          animateWhen: state => {
            if (!state || !state.isOpen) {
              return false
            }

            return true
          },
          animationProps: {
            initial: { rotate: 180 },
            exit: { rotate: 0 },
          },
        },
        children: 'Sort',
        variant: 'secondary',
        // className: 'min-h-0 py-0 px-0',
      }}
      listWidth={300}
      options={options}
      label={{
        select: 'sort-products',
        listOptions: 'list-options',
        option: 'option',
      }}
      onChange={option => {
        console.log({ option })
      }}
    />
  )
}

export default function Home() {
  return (
    <div className='m-[1000px] h-[2000px]'>
      <CustomSelect />
    </div>
    // <Input
    //   type='text'
    //   ariaLabel='input'
    //   leadingComplex={{ start: 'Search', end: <CustomSelect /> }}
    // />
  )
}
