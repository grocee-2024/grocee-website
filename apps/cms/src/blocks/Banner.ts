import { Block } from 'payload/types'
import iconPicker from '../fields/iconPicker'
import { link } from '../fields/link'
import linkOrButton from '../fields/linkOrButton'

export const Banner: Block = {
  slug: 'Banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  fields: [
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'heading',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Info',
              value: 'info',
            },
            {
              label: 'Order Delivery',
              value: 'orderDelivery',
            },
          ],
          defaultValue: 'info',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
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
          name: 'info',
          type: 'group',
          fields: [
            {
              name: 'listMarker',
              type: 'group',
              fields: [iconPicker],
            },
            {
              name: 'list',
              type: 'array',
              fields: [
                {
                  name: 'listItem',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
              required: true,
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'info',
          },
        },
        {
          name: 'orderDelivery',
          type: 'group',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'orderDelivery',
          },
        },
        {
          name: 'links',
          type: 'array',
          fields: [linkOrButton()],
          required: true,
          maxRows: 2,
        },
      ],
    },
  ],
  imageURL: '/previews/banner.png',
  imageAltText: 'Banner Preview',
}
