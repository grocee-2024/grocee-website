import { MainNavigation } from 'cms-types'
import { FC } from 'react'
import { Input } from 'ui'

type Props = Pick<MainNavigation, 'search'>

export const SearchInput: FC<Props> = ({ search }) => {
  return (
    <Input
      className='absolute left-1/2 hidden w-1/2 translate-x-[-50%] tablet:block'
      type='text'
      role='search'
      leadingComplex={{ start: { icon: 'Search' } }}
      placeholder={search.placeholder}
      aria-label={search.searchButtonLabel}
    />
  )
}
