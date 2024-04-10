'use client'
import { useState } from 'react'
import { Select } from 'ui'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()
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

  const [selectedValue, setSelectedValue] = useState<{ label: string; value: string } | null>(
    options[3],
  )

  return (
    <Select
      className='ml-96 mt-[100px]'
      animationOrigin='top right'
      onTrigger='hover'
      listPosition={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      triggerProps={{
        rightIcon: {
          icon: 'SwapVertical',
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
        variant: 'tertiary',
        className: '!bg-gray-100',
        animationProps: {
          whileHover: {
            scale: 0.9,
          },
        },
      }}
      listWidth={300}
      selectedValue={selectedValue}
      options={options}
      label='sort-products'
      onChange={option => {
        setSelectedValue(option)
        push(`?value=${option?.value}&label=${option?.label}`)
      }}
    />
  )
}
