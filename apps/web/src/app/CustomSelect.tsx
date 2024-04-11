'use client'

import { Select } from 'ui'

export const CustomSelect = () => {
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

  // const [value, setValue] = useState<SelectOptionType<string> | null>(options[0])

  return (
    <Select
      animationOrigin='bottom right'
      onTrigger='click'
      listPosition={{
        horizontal: 'left',
        vertical: 'top',
      }}
      name='some-name3'
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
        disableBorder: true,
        style: {
          padding: 0,
          minHeight: 0,
        },
      }}
      useAsTriggerLabel='label'
      listWidth={300}
      options={options}
      label={{
        select: 'sort-products',
        listOptions: 'list-options',
        option: 'option',
      }}
    />
  )
}
