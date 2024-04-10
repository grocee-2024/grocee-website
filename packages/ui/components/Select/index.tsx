/* eslint-disable no-unused-vars */
'use client'

import { useCallback, useEffect, useRef, KeyboardEventHandler, useMemo } from 'react'
import {
  useSelect,
  HiddenSelect,
  AriaSelectOptions,
  mergeProps,
  useHover,
  PressEvent,
} from 'react-aria'
import { SelectState, useSelectState, Item, Node as StatelyNode } from 'react-stately'
import { AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button, ButtonProps, IconProps } from '../Button'
import { SelectOptionType } from './SelectOption'
import { ListOptions } from './ListOptions'
import clsx from 'clsx'
import { useCanHover } from 'ui/hooks'
import { selectKeyManager } from './selectKeyManager'

export type SelectProps<T> = {
  className?: string
  animationOrigin?:
    | 'center'
    | 'top'
    | 'top right'
    | 'right'
    | 'bottom right'
    | 'bottom'
    | 'bottom left'
    | 'left'
    | 'top left'
  listPosition?: {
    horizontal?: 'left' | 'right'
    vertical?: 'top' | 'bottom'
  }
  listWidth?: number
  label: string
  options: SelectOptionType<T>[]
  selectedValue: SelectOptionType<T> | null
  onChange: (option: SelectOptionType<T> | null) => void
  onTrigger?: 'click' | 'hover'
  triggerProps: ButtonProps<SelectState<T>>
  isDisabled?: boolean
}

export function Select<T>(props: SelectProps<T>) {
  const { options } = props

  return (
    <SelectWithItems {...props}>
      {options.map(option => {
        const key = selectKeyManager(option).create()

        return (
          <Item key={key} textValue={option.value as string}>
            {option.label as string}
          </Item>
        )
      })}
    </SelectWithItems>
  )
}

function SelectWithItems<T>(props: SelectProps<T>) {
  const {
    triggerProps,
    onTrigger = 'click',
    options,
    selectedValue,
    onChange,
    className = '',
    animationOrigin,
    listPosition,
    listWidth,
    ...restProps
  } = props

  const selectRef = useRef<HTMLSelectElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const selectState = useSelectState(restProps)

  const { ref: containerRef, inView } = useInView()

  const canHover = useCanHover()

  const triggerType: NonNullable<SelectProps<T>['onTrigger']> = useMemo(() => {
    if (onTrigger === 'click' || !canHover) {
      return 'click'
    }

    return 'hover'
  }, [onTrigger, canHover])

  const { hoverProps } = useHover({
    onHoverStart: () => {
      if (triggerType === 'click') {
        return
      }

      selectState.open()
    },
    onHoverEnd: () => {
      if (triggerType === 'click') {
        return
      }

      selectState.close()
    },
  })

  const onTriggerClick = useCallback(
    (event: PressEvent) => {
      if (triggerType === 'hover' || event.pointerType === 'keyboard') {
        return
      }

      selectState.toggle()
    },
    [selectState.isOpen, selectState.isFocused, triggerType],
  )

  const onHandleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(event => {
    if (event.key !== 'Enter') {
      return
    }

    //@ts-ignore
    const targetType = event.target?.dataset?.type

    if (targetType !== 'selectTrigger') {
      return
    }

    selectState.toggle()

    return
  }, [])

  const onOpenSelectByHover = useCallback(() => {
    if (triggerType === 'click') {
      return
    }

    selectState.open()
  }, [triggerType])

  useEffect(() => {
    const closeSelectList = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      selectState.close()
    }

    window.addEventListener('keyup', closeSelectList)

    return () => {
      window.removeEventListener('keyup', closeSelectList)
    }
  }, [selectState.isOpen, selectState.isFocused])

  useEffect(() => {
    const { key: selectedKey } = [...selectState.collection].find(collectionItem =>
      selectKeyManager(
        selectedValue as SelectOptionType<T>,
        collectionItem as StatelyNode<T>,
      ).compare(),
    ) as StatelyNode<T>

    if (selectedKey) {
      selectState.setSelectedKey(selectedKey)
    }
  }, [])

  useEffect(() => {
    if (inView || !canHover) {
      return
    }

    selectState.close()
  }, [inView, canHover])

  const { menuProps, triggerProps: selectTriggerProps } = useSelect(
    restProps as AriaSelectOptions<T>,
    selectState as unknown as SelectState<T>,
    selectRef,
  )

  const {
    disallowEmptySelection,
    linkBehavior,
    shouldFocusOnHover,
    shouldSelectOnPressUp,
    ...restMenuProps
  } = menuProps

  const { onPressStart, ...restSelectTriggerProps } = selectTriggerProps

  const mappedTriggerProps = useMemo(() => {
    const { leftIcon, rightIcon, ...restTriggerProps } = triggerProps

    // @ts-ignore
    if (leftIcon && 'icon' in leftIcon) {
      // @ts-ignore
      leftIcon.value = selectState
    }

    // @ts-ignore
    if (rightIcon && 'icon' in rightIcon) {
      // @ts-ignore
      rightIcon.value = selectState
    }

    return {
      ...restTriggerProps,
      leftIcon,
      rightIcon,
    }
  }, [triggerProps, selectState])

  return (
    <div
      className={clsx('relative inline-block', className)}
      {...hoverProps}
      onKeyUp={onHandleKeyDown}
      ref={containerRef}
    >
      <HiddenSelect state={selectState} triggerRef={selectRef} isDisabled label={restProps.label} />
      <Button
        {...mergeProps(mappedTriggerProps, restSelectTriggerProps, {
          'data-type': 'selectTrigger',
        })}
        onClick={onTriggerClick as () => void}
        onMouseEnter={onOpenSelectByHover}
        isFocused={selectState.isOpen}
        additionalRef={triggerRef}
      />
      <AnimatePresence>
        {selectState.isOpen && (
          <ListOptions
            {...restMenuProps}
            selectState={selectState}
            onChange={onChange}
            animationOrigin={animationOrigin}
            listPosition={listPosition}
            listWidth={listWidth}
            isDismissable={triggerType === 'click'}
            triggerRef={triggerRef}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
