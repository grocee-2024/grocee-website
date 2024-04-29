import type { GlobalConfig } from 'payload/types'

import { isAnyone } from '../access/isAnyone'
import { isAdmin } from '../access/isAdmin'
import { link } from '../fields/link'

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
        {
          name: 'caption',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'navGroups',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              name: 'page',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            }),
          ],
        },
      ],
      minRows: 2,
      maxRows: 2,
    },
    {
      name: 'subscribeSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'textField',
          type: 'group',
          fields: [
            {
              name: 'placeholder',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'subscribeButtonLabel',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'footerInfo',
      type: 'group',
      fields: [
        {
          name: 'rightsText',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'designedBy',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
