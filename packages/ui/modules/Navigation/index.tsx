import { FC } from 'react'
import { NavItems } from './NavItems'
import { SearchInput } from './SearchInput'
import { type Image as PayloadImageType, MainNavigation } from 'cms-types'
import Link from 'next/link'
import { PayloadImage } from '../..'
import { BurgerMenu } from './BurgerMenu'
import { FocusRing } from 'react-aria'

type Props = Pick<MainNavigation, 'search'> & {
  logo: PayloadImageType
  logoUrl: string
}

export const Navigation: FC<Props> = ({ logo, logoUrl, search }) => {
  return (
    <div className='relative my-[15px] flex w-full items-center justify-between tablet:my-[28px]'>
      <BurgerMenu />

      <FocusRing focusRingClass='ring ring-offset-2'>
        <Link className='absolute left-10 mt-[-3px] h-[30px] w-[86px]' href={logoUrl}>
          <PayloadImage className='h-full w-full' src={logo} />
        </Link>
      </FocusRing>

      <SearchInput search={search} />

      <NavItems />
    </div>
  )
}
