import type { GlobalConfig } from 'payload/types'

import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'
import { link } from '../fields/link'

export const MainNavigation: GlobalConfig = {
  slug: 'mainNavigation',
  label: 'Main',
  admin: {
    group: 'Navigation',
  },
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
        },
        link({ name: 'page' }),
      ],
    },
    {
      name: 'search',
      type: 'group',
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'searchButtonLabel',
          label: 'Search Button Label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'closeButtonLabel',
          label: 'Close Button Label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
