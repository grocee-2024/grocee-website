import type { GlobalConfig } from 'payload/types'

import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'
import { link } from '../fields/link'
import iconPicker from '../fields/iconPicker'
import { Card } from '../blocks/Card'

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
    {
      name: 'defaultMenuHeader',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'categories',
          type: 'group',
          fields: [
            {
              label: 'Categories Navigation Item',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
                {
                  name: 'cardLinks',
                  type: 'blocks',
                  blocks: [Card],
                  required: true,
                  maxRows: 4,
                },
                {
                  name: 'commonLinks',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    link(),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'delivery',
          type: 'group',
          fields: [
            {
              label: 'Delivery Navigation Item',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
              ],
            },
          ],
        },
        {
          name: 'promotions',
          type: 'group',
          fields: [
            {
              label: 'Promotions And Offers Navigation Item',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
                {
                  name: 'cardLinks',
                  type: 'blocks',
                  blocks: [Card],
                  required: true,
                  maxRows: 4,
                },
              ],
            },
          ],
        },
        {
          name: 'integration',
          type: 'group',
          fields: [
            {
              label: 'Integration Navigation Item',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
                {
                  name: 'logos',
                  type: 'array',
                  fields: [
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'images',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'helpNavigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        link(),
      ],
      required: true,
    },
    {
      name: 'backButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          type: 'group',
          fields: [iconPicker],
        },
      ],
    },
  ],
}
