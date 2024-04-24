import { FC } from 'react'
import { NavItems } from './NavItems'
import { SearchInput } from './SearchInput'
import { type Image as PayloadImageType, MainNavigation } from 'cms-types'
import Link from 'next/link'
import { PayloadImage } from '../..'
import { BurgerMenu } from './BurgerMenu'

type Props = Pick<MainNavigation, 'search'> & {
  logo: PayloadImageType
  logoUrl: string
}

export const Navigation: FC<Props> = ({ logo, logoUrl, search }) => {
  return (
    <div className='relative my-[28px] flex items-center justify-between'>
      <BurgerMenu />

      <Link
        className='absolute left-[80px] mt-[-3px] h-[30px] w-[86px] translate-x-[-50%] mobile:left-1/2 tablet:left-[90px]'
        href={logoUrl}
      >
        <PayloadImage className='h-full w-full' src={logo} />
      </Link>

      <SearchInput search={search} />

      <NavItems />
    </div>
  )
}
