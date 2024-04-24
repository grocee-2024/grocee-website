import { iconNames, mapIcon } from '@oleksii-lavka/grocee-icons'
import { ChevronLeft, ChevronRight } from '@oleksii-lavka/grocee-icons/icons'
import { Button } from 'payload/components'
import { TextInput } from 'payload/components/forms'
import React, { useDeferredValue, useMemo, useState } from 'react'
import { getPagination } from './pagination'

type PickIconFormProps = {
  path: string
  onPick: (value: string) => void
}

export default function PickIconForm({ path, onPick }: PickIconFormProps) {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredList = useMemo(() => {
    const normalizedQuery = deferredQuery.toLowerCase()

    return iconNames.filter(iconName =>
      (iconName as unknown as string).toLowerCase().includes(normalizedQuery),
    )
  }, [deferredQuery])

  const { dataToShow, pagination, totalPages } = useMemo(
    () =>
      getPagination(filteredList, {
        page,
        maxItemsPerPage: 15,
      }),
    [page, filteredList],
  )

  return (
    <>
      <TextInput
        placeholder='Search'
        path={path}
        name='Icon Search'
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          setPage(1)
        }}
      />

      <div className='icon-list-wrapper'>
        <ul className='icon-list'>
          {dataToShow.map((iconName, i) => {
            const Icon = mapIcon(iconName as string)

            if (Icon == null) return null

            return (
              <li key={`${iconName as string}-${i}`} className='icon-list-item'>
                <Button
                  className='icon-button'
                  buttonStyle='primary'
                  size='medium'
                  onClick={() => {
                    onPick(iconName as string)
                  }}
                >
                  <Icon size={32} />
                </Button>
              </li>
            )
          })}
        </ul>

        <ul className='pagination-wrapper'>
          <li>
            <Button
              buttonStyle='primary'
              className='pagination-button'
              onClick={() => setPage(page - 1)}
              size='medium'
              disabled={page <= 1}
            >
              <ChevronLeft size={24} />
            </Button>
          </li>

          {pagination.map(item => (
            <li key={item}>
              <Button
                buttonStyle={page === item ? 'secondary' : 'primary'}
                disabled={page === item}
                className='pagination-button'
                onClick={() => setPage(item)}
                size='medium'
              >
                <p className='pagination-item-text'>{item}</p>
              </Button>
            </li>
          ))}

          <li>
            <Button
              buttonStyle='primary'
              className='pagination-button'
              onClick={() => setPage(page + 1)}
              size='medium'
              disabled={page >= totalPages}
            >
              <ChevronRight size={24} />
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}
