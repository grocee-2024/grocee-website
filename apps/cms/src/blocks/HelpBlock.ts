import { Block } from 'payload/types'
import { Accordion } from './Accordion'
import { link } from '../fields/link'
import iconPicker from '../fields/iconPicker'

export const HelpBlock: Block = {
  slug: 'HelpBlock',
  interfaceName: 'HelpBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'support',
      type: 'group',
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
    {
      name: 'accordion',
      type: 'blocks',
      blocks: [Accordion],
      required: true,
      maxRows: 1,
    },
  ],
  imageURL: '/previews/help-section.png',
  imageAltText: 'Help Preview',
}
