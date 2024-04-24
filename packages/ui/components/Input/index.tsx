/* eslint-disable no-unused-vars */
'use client'

import { InputHTMLAttributes, useCallback, useRef, useState } from 'react'
import { Complex, ComplexProps } from './Complex'
import { clsx } from 'clsx'
import { AriaTextFieldOptions, useTextField } from 'react-aria'
import { DatePicker, TimePicker, TimePickerProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

export type InputProps<T> = {
  type: 'text' | 'password' | 'date' | 'tel' | 'email' | 'time'
  status?: 'success' | 'error'
  isDisabled?: boolean
  className?: string
  label?: string
  errorMessage?: string
  leadingComplex?: Omit<ComplexProps, 'type'>
  trailingComplex?: Omit<ComplexProps, 'type'>
  value?: T
  onChange?: (value: T) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>

const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
const timeRegexp = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/
const dateFormat = 'DD/MM/YYYY'
const timeFormat = 'HH:mm'

export function Input<T>(props: InputProps<T>) {
  const { type } = props

  const [open, setOpen] = useState(false)
  const [dateStr, setDateStr] = useState<string>('')
  const [date, setDate] = useState<Dayjs | null>(null)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onDateChange = useCallback((date: string) => {
    if (dateRegexp.test(date)) {
      setDateStr(date)
      setDate(dayjs(date))

      return
    }

    if (
      /^\d{0,2}$/.test(date) ||
      /^\d{2}\/\d{0,2}$/.test(date) ||
      /^\d{2}\/\d{2}\/\d{0,4}$/.test(date)
    ) {
      setDateStr(date)
    }
  }, [])

  const onTimeChange = useCallback((date: string) => {
    if (timeRegexp.test(date)) {
      setDateStr(date)
      const [hh, mm] = date.split(':')

      const formattedTime = dayjs()
        .set('hours', +(hh ?? '9'))
        .set('minutes', +(mm ?? '00'))

      setDate(formattedTime)

      return
    }

    if (/^\d{0,2}$/.test(date) || /^\d{2}:\d{0,2}$/.test(date)) {
      setDateStr(date)
    }
  }, [])

  if (type === 'date') {
    return (
      <div className='relative'>
        <CommonInput
          {...props}
          type='text'
          onFocus={onOpen}
          autoComplete='off'
          value={dateStr}
          onChange={onDateChange}
          maxLength={10}
        />
        <DatePicker
          onChange={(date, dateStr) => {
            setDate(date)
            setDateStr(dayjs(dateStr as string).format(dateFormat))
          }}
          onOpenChange={open => {
            if (!open) {
              onClose()
            }
          }}
          value={date}
          open={open}
          style={{ visibility: 'hidden', width: 0 }}
          className='absolute bottom-0 left-0'
          tabIndex={-1}
        />
      </div>
    )
  }

  if (type === 'time') {
    return (
      <div className='relative'>
        <CommonInput
          {...props}
          type='text'
          onFocus={onOpen}
          autoComplete='off'
          value={dateStr}
          onChange={onTimeChange}
          maxLength={5}
        />
        <TimePicker
          onChange={(date, dateStr) => {
            setDate(date)
            setDateStr(dateStr as string)
          }}
          format={timeFormat}
          minuteStep={15}
          disabledTime={() => {
            return {
              disabledHours: () => {
                const hours = []

                for (let i = 0; i < 23; i++) {
                  if (i < 9 || i > 18) {
                    hours.push(i)
                  }
                }

                return hours
              },
            }
          }}
          onOpenChange={open => {
            if (!open) {
              onClose()
            }
          }}
          value={date}
          open={open}
          style={{ visibility: 'hidden', width: 0 }}
          className='absolute bottom-0 left-0'
          tabIndex={-1}
        />
      </div>
    )
  }

  return <CommonInput {...props} />
}

function CommonInput<T>(props: InputProps<T>) {
  const {
    status = '',
    isDisabled,
    label,
    errorMessage,
    type,
    leadingComplex,
    trailingComplex,
    className,
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { labelProps, inputProps, errorMessageProps } = useTextField(
    props as AriaTextFieldOptions<'input'>,
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
          role={props?.role}
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
