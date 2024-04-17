'use client'

import clsx from 'clsx'
import { FC, useId, useState } from 'react'
import { Button } from '../Button'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'

type Panel = {
  title: string
  content: (JSX.Element | null)[]
}

type AccordionProps = {
  panels: Panel[]
  className?: string
}

export const AccordionList: FC<AccordionProps> = ({ panels, className = '' }) => {
  const accodriodnId = useId()

  const [openedPanel, setOpenedPanel] = useState<number | null>(null)

  return (
    <ul className={clsx('list-none', className)}>
      {panels.map(({ title, content }, idx) => {
        const headingId = `${accodriodnId}-heading-${idx}`
        const contentId = `${accodriodnId}-content-${idx}`
        const isSelected = idx === openedPanel

        const isLast = idx === panels.length - 1

        const icon: AllIconNames = isSelected ? 'MinusCircle' : 'PlusCircle'

        return (
          <li
            key={headingId}
            className={clsx('flex flex-col overflow-hidden border-t-[1px] border-gray-100 py-8', {
              'border-b-[1px]': isLast,
            })}
          >
            <div className='flex items-center justify-between gap-2'>
              <h3 className='helvetica-xs grow font-light text-gray-900'>{title}</h3>

              <Button
                variant={isSelected ? 'secondary' : 'primary'}
                aria-expanded={isSelected}
                aria-controls={contentId}
                className='rounded-[1000px] p-[15px]'
                leftIcon={{ icon, size: 18 }}
                onClick={() => {
                  setOpenedPanel(isSelected ? null : idx)
                }}
              />
            </div>

            <div
              id={contentId}
              aria-labelledby={headingId}
              aria-hidden={!isSelected}
              className='gilroy-md text-gray-700'
              style={{
                display: 'grid',
                gridTemplateRows: isSelected ? '1fr' : '0fr',
                transition: 'grid-template-rows 300ms',
              }}
            >
              <div className='overflow-hidden'>
                <div className='mt-4'>{content}</div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
