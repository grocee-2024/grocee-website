import type { GlobalConfig } from 'payload/types'

import linkOrButton from '../fields/linkOrButton'
import { isAnyone } from '../access/isAnyone'
import { isAdmin } from '../access/isAdmin'

export const BottomNavigation: GlobalConfig = {
  slug: 'bottomNavigation',
  label: 'Bottom',
  admin: {
    group: 'Navigation',
  },
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [linkOrButton()],
    },
  ],
}
