import type { GlobalConfig } from 'payload/types'

import linkOrButton from '../fields/linkOrButton'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
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
