import { FC } from 'react'
import { AllIconNames, IconType } from '@oleksii-lavka/grocee-icons'
import { parseIcon } from '../../helpers/parseIcon'
import { clsx } from 'clsx'

export type ComplexProps = {
  type: 'left' | 'right'
  startIcon?: IconType | AllIconNames
  end?: {
    icon: IconType | AllIconNames
    text: string
  }
}

export const Complex: FC<ComplexProps> = ({ type, startIcon, end }) => {
  const [{ icon: StartIcon }, { icon: EndIcon }] = [
    parseIcon(startIcon),
    parseIcon(end?.icon) as { icon: IconType },
  ]

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

      {end && (
        <div className='flex items-center gap-2'>
          <span className='select-none text-sm'>{end.text}</span>
          <EndIcon width={12} height={24} />
        </div>
      )}
    </div>
  )
}
