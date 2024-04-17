/* eslint-disable no-unused-vars */
import { AllIconNames, IconType } from '@oleksii-lavka/grocee-icons'
import { parseIcon } from '../../helpers/parseIcon'
import { clsx } from 'clsx'
import { ReactNode, isValidElement } from 'react'

type EndPartObject = {
  icon: IconType | AllIconNames
  text: string
}

export type ComplexProps = {
  type: 'left' | 'right'
  start?: IconType | AllIconNames
  end?: EndPartObject | ReactNode
}

export function Complex({ type, start, end }: ComplexProps) {
  const { icon: StartIcon } = parseIcon(start)

  const endPartIsObject = !!(
    end &&
    typeof end === 'object' &&
    'icon' in end &&
    !isValidElement(end)
  )

  const { icon: EndIcon } = endPartIsObject ? parseIcon(end?.icon) : { icon: null }

  return (
    <div
      className={clsx('flex gap-2 text-gray-800', {
        'pr-2': type === 'left',
        'pl-2': type === 'right',
        'mr-2 border-r-[1px] border-r-gray-100': type === 'left' && end,
        'ml-2 border-l-[1px] border-l-gray-100': type === 'right' && end,
      })}
    >
      {StartIcon && (
        <StartIcon
          width={16}
          height={24}
          className={clsx({
            'text-gray-800': end,
            'text-gray-400': !end && type === 'left',
            'text-gray-200': !end && type === 'right',
          })}
        />
      )}

      {endPartIsObject && EndIcon && (
        <div className='flex items-center gap-2'>
          <span className='select-none text-sm'>{end.text}</span>
          <EndIcon width={16} height={24} />
        </div>
      )}

      {!endPartIsObject && end}
    </div>
  )
}
