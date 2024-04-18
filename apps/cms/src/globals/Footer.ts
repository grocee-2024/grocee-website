import type { GlobalConfig } from 'payload/types'

import linkOrButton from '../fields/linkOrButton'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
