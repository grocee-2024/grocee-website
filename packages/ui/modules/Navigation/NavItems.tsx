import { FC } from 'react'
import {
  Shipping,
  ShoppingBasket,
  AccountCircle,
  ShippingFilled,
  ShoppingBasketFilled,
  ProfileFilled,
  Search,
} from '@oleksii-lavka/grocee-icons/icons'
import { NavLink, NavLinkType } from './NavLink'
import { FocusRing } from 'react-aria'

const navLinks: NavLinkType[] = [
  {
    href: '/delivery',
    linkClassName: 'flex h-6 w-6 items-center justify-center pt-[4px]',
    defaultIcon: <Shipping width={20} height={14} />,
    activeIcon: <ShippingFilled width={20} height={14} />,
  },
  {
    href: '/cart',
    linkClassName: 'flex h-6 w-6 items-center justify-center',
    defaultIcon: <ShoppingBasket width={16} height={18} />,
    activeIcon: <ShoppingBasketFilled width={16} height={18} />,
    badge: 3,
  },
  {
    href: '/profile',
    linkClassName: 'flex h-6 w-6 items-center justify-center',
    defaultIcon: <AccountCircle size={18} />,
    activeIcon: <ProfileFilled size={18} />,
  },
]

export const NavItems: FC = () => {
  return (
    <nav>
      <ul className='flex gap-4 mobile:gap-6'>
        <li className='flex items-center justify-center tablet:hidden'>
          <FocusRing focusRingClass='ring ring-offset-2'>
            <button className='border-none bg-transparent outline-none'>
              <Search width={18} height={18} className='text-gray-900' />
            </button>
          </FocusRing>
        </li>
        {navLinks.map((link, idx) => (
          <li key={`${link.href}-${idx}`} className='hidden tablet:block'>
            <NavLink {...link} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
