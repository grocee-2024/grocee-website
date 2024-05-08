import type { GlobalConfig } from 'payload/types'

import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'
import { link } from '../fields/link'
import { Card } from '../blocks/Card'
import iconPicker from '../fields/iconPicker'

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
      name: 'header',
      type: 'group',
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
              name: 'clearSearchButtonLabel',
              label: 'Clear Search Button Label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'emptySearchHistoryLabel',
              label: 'Empty Search History Label',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'navLinks',
          type: 'group',
          fields: [
            {
              label: 'Delivery Link',
              type: 'collapsible',
              fields: [
                {
                  name: 'delivery',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'defaultIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                        {
                          name: 'activeIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                      ],
                    },
                    link(),
                  ],
                  admin: {
                    description: 'This link will only appear on navigation on large screens.',
                  },
                },
              ],
            },
            {
              label: 'Cart Link',
              type: 'collapsible',
              fields: [
                {
                  name: 'cart',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'defaultIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                        {
                          name: 'activeIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                      ],
                    },
                    link(),
                  ],
                },
              ],
            },
            {
              label: 'Profile Link',
              type: 'collapsible',
              fields: [
                {
                  name: 'profile',
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'defaultIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                        {
                          name: 'activeIcon',
                          type: 'group',
                          fields: [iconPicker],
                        },
                      ],
                    },
                    link(),
                  ],
                },
              ],
            },
          ],
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
  ],
}
