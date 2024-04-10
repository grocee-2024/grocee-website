/* eslint-disable no-unused-vars */
'use client'

import { useRef } from 'react'
import { Complex, ComplexProps } from './Complex'
import { clsx } from 'clsx'
import { AriaTextFieldOptions, useTextField } from 'react-aria'

type InputProps<T> = {
  type: 'text' | 'password' | 'date' | 'tel' | 'email' | 'time'
  status?: 'success' | 'error'
  isDisabled?: boolean
  label?: string
  placeholder?: string
  errorMessage?: string
  leadingComplex?: Omit<ComplexProps, 'type'>
  trailingComplex?: Omit<ComplexProps, 'type'>
  value?: T
  onChange?: (value: T) => void
}

export function Input<T>(props: InputProps<T>) {
  const {
    status = '',
    isDisabled,
    label,
    errorMessage,
    type,
    leadingComplex,
    trailingComplex,
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { labelProps, inputProps, errorMessageProps } = useTextField(
    props as AriaTextFieldOptions<'input'>,
    inputRef,
  )

  return (
    <div className='m-10 inline-block'>
      {label && (
        <label {...labelProps} className='text-xs text-gray-400'>
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
          className='placeholder:text-md grow text-gray-900 placeholder:text-gray-400'
        />
        <Complex type='right' {...trailingComplex} />
      </div>
      {errorMessageProps && (
        <span {...errorMessageProps} className='text-xs text-error-500'>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
