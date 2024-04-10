'use client'

import { useLayoutEffect, useCallback, useEffect, useRef, MutableRefObject, useState } from 'react'
import { SelectState, Node as StatelyNode } from 'react-stately'
import { FocusScope, useListBox, useOverlay, mergeProps } from 'react-aria'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SelectOption } from './SelectOption'
import { SelectProps } from '.'
import clsx from 'clsx'
import { swapDirection } from './swapDirection'

type ListOptionsProps<T> = {
  selectState: SelectState<unknown>
  isDismissable?: boolean
  triggerRef: MutableRefObject<HTMLButtonElement | null>
} & Pick<SelectProps<T>, 'onChange' | 'animationOrigin' | 'listPosition' | 'listWidth'>

type ListVerticalPosition<T> = {
  position: 'top' | 'bottom'
  height: 'auto' | number
  origin: NonNullable<SelectProps<T>['animationOrigin']>
  triggerHeight?: number
}

export function ListOptions<T>({
  selectState,
  onChange,
  animationOrigin = 'top left',
  listPosition = {
    horizontal: 'left',
    vertical: 'top',
  },
  listWidth,
  isDismissable = true,
  triggerRef,
  ...restProps
}: ListOptionsProps<T>) {
  const [listVerticalPosition, setListVerticalPosition] = useState<ListVerticalPosition<T>>({
    position: listPosition.vertical!,
    height: 'auto',
    origin: animationOrigin,
  })

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const listBoxRef = useRef<HTMLUListElement | null>(null)

  const { ref: inViewRef, entry } = useInView()

  const { listBoxProps } = useListBox(
    {
      autoFocus: false,
    },
    selectState,
    listBoxRef,
  )

  const { overlayProps } = useOverlay(
    {
      isOpen: selectState.isOpen,
      shouldCloseOnBlur: true,
      onClose: selectState.close,
      isDismissable,
    },
    overlayRef,
  )

  const setOverlayRefs = useCallback(
    (node: any) => {
      overlayRef.current = node
      inViewRef(node)
    },
    [inViewRef, overlayRef],
  )

  const setVerticalPosition = useCallback(
    (args: {
      position: ListVerticalPosition<T>['position']
      height: number | 'auto'
      triggerHeight: number
    }) => {
      const { position, height, triggerHeight } = args

      const replaceToDirection = position === 'bottom' ? 'top' : 'bottom'

      setListVerticalPosition(
        prev =>
          ({
            ...prev,
            position,
            height,
            triggerHeight,
            origin: swapDirection(prev.origin!, position, replaceToDirection),
          }) as ListVerticalPosition<T>,
      )
    },
    [],
  )

  const checkDropdownPosition = useCallback(() => {
    if (entry && triggerRef.current) {
      const selectRect = entry.boundingClientRect
      const buttonRect = triggerRef.current.getBoundingClientRect()

      const topButtonOffset = buttonRect.top
      const bottomButtonOffset = window.innerHeight - buttonRect.bottom

      const selectHeight = selectRect.bottom - selectRect.top + selectRect.height
      const buttonHeight = buttonRect.height

      if (bottomButtonOffset > topButtonOffset && topButtonOffset < selectHeight) {
        setVerticalPosition({
          position: 'bottom',
          height: Math.min(selectHeight, bottomButtonOffset - 24),
          triggerHeight: buttonHeight,
        })

        return
      }

      if (bottomButtonOffset < topButtonOffset && bottomButtonOffset < selectHeight) {
        setVerticalPosition({
          position: 'top',
          height: Math.min(selectHeight, topButtonOffset - 24),
          triggerHeight: buttonHeight,
        })

        return
      }
    }
  }, [entry, triggerRef.current])

  useEffect(() => {
    if (triggerRef.current) {
      setVerticalPosition({
        position: listVerticalPosition.position!,
        height: 'auto',
        triggerHeight: triggerRef.current!.getBoundingClientRect().height,
      })
    }
  }, [triggerRef.current])

  useLayoutEffect(() => {
    if (selectState.isOpen && entry && triggerRef.current) {
      checkDropdownPosition()

      window.addEventListener('scroll', checkDropdownPosition)
    }

    return () => {
      window.removeEventListener('scroll', checkDropdownPosition)
    }
  }, [selectState.isOpen, entry, triggerRef.current])

  return (
    <FocusScope restoreFocus>
      {/*@ts-ignore */}
      <motion.div
        {...overlayProps}
        ref={setOverlayRefs}
        key='list-overlay'
        className={clsx('absolute z-50', {
          'pt-2': listVerticalPosition.position === 'bottom',
          'pb-2': listVerticalPosition.position === 'top',
        })}
        style={{
          width: listWidth,
          transformOrigin: listVerticalPosition.origin,
          [listPosition.horizontal!]: 0,
          bottom:
            listVerticalPosition.position === 'top'
              ? listVerticalPosition.triggerHeight
              : undefined,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <ul
          ref={listBoxRef}
          {...mergeProps(restProps, listBoxProps)}
          className='flex flex-col gap-2 overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_4px_16px_0_rgba(105,105,105,0.24)] outline-none'
          style={{ height: listVerticalPosition.height }}
        >
          {[...selectState.collection].map(option => (
            <SelectOption
              key={option.key}
              option={option as StatelyNode<T>}
              selectState={selectState}
              onChange={onChange}
            />
          ))}
        </ul>
      </motion.div>
    </FocusScope>
  )
}
