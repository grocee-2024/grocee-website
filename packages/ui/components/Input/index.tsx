/* eslint-disable no-unused-vars */
'use client'

import { useRef } from 'react'
import { Complex, ComplexProps } from './Complex'
import { clsx } from 'clsx'
import { AriaTextFieldOptions, useTextField } from 'react-aria'

type InputProps<T, U> = {
  type: 'text' | 'password' | 'date' | 'tel' | 'email' | 'time'
  status?: 'success' | 'error'
  isDisabled?: boolean
  className?: string
  label?: string
  ariaLabel: string
  placeholder?: string
  errorMessage?: string
  leadingComplex?: Omit<ComplexProps<U>, 'type'>
  trailingComplex?: Omit<ComplexProps<U>, 'type'>
  value?: T
  onChange?: (value: T) => void
}

export function Input<T, U>(props: InputProps<T, U>) {
  const {
    status = '',
    isDisabled,
    label,
    ariaLabel,
    errorMessage,
    type,
    leadingComplex,
    trailingComplex,
    className,
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { labelProps, inputProps, errorMessageProps } = useTextField(
    { ...props, 'aria-label': ariaLabel } as AriaTextFieldOptions<'input'>,
    inputRef,
  )

  return (
    <div className={clsx('inline-block', className)}>
      {label && (
        <label {...labelProps} className='gilroy-xs text-gray-400'>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex items-center rounded-[1000px] border-[1px] px-4 py-3 transition-colors duration-300',
          {
            'border-gray-200': !status && !errorMessage,
            'border-primary-500': status === 'success' && !errorMessage && !isDisabled,
            'border-error-500': (status === 'error' || errorMessage) && !isDisabled,
            'focus-within:border-gray-800 hover:border-gray-400 focus-within:hover:border-gray-800':
              !isDisabled && !status && !errorMessage,
          },
        )}
      >
        <Complex type='left' {...leadingComplex} />
        <input
          ref={inputRef}
          {...inputProps}
          type={type}
          className='placeholder:gilroy-md grow text-gray-900 placeholder:text-gray-400'
        />
        <Complex type='right' {...trailingComplex} />
      </div>
      {errorMessageProps && (
        <span {...errorMessageProps} className='gilroy-xs text-error-500'>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
