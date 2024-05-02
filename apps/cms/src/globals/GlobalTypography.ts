import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'
import { localizedInput } from '../fields/localizedInput'
import iconPicker from '../fields/iconPicker'
import { link } from '../fields/link'

export const GlobalTypography: GlobalConfig = {
  slug: 'globalTypography',
  label: 'Global Typography',
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'orderDeliveryForm',
      type: 'group',
      fields: [
        {
          label: 'Form Fields',
          type: 'collapsible',
          fields: [
            localizedInput({ name: 'firstName' }),
            localizedInput({ name: 'lastName' }),
            localizedInput({ name: 'phoneNumber' }),
            localizedInput({ name: 'shippingAddress' }),
            localizedInput({ name: 'date' }),
            localizedInput({ name: 'time' }),
          ],
        },
      ],
    },
    {
      name: 'support',
      type: 'group',
      fields: [
        {
          label: 'Support Links',
          type: 'collapsible',
          fields: [
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    {
                      label: 'Email',
                      value: 'email',
                    },
                    {
                      label: 'Phone',
                      value: 'phone',
                    },
                    {
                      label: 'Location',
                      value: 'location',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'info',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '45%',
                      },
                    },
                    {
                      name: 'caption',
                      type: 'text',
                      localized: true,
                      required: true,
                      admin: {
                        width: '45%',
                      },
                    },
                  ],
                },
                {
                  name: 'googleMapsLocation',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'location',
                  },
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
              ],
            },
            link({
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
            }),
          ],
        },
      ],
    },
    {
      name: 'account',
      type: 'group',
      fields: [
        {
          label: 'Main Menu',
          type: 'collapsible',
          fields: [
            {
              name: 'mainMenuAccountField',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                link(),
              ],
            },
          ],
        },
      ],
    },
  ],
}
