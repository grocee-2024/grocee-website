import { Block } from 'payload/types'
import { link } from '../fields/link'
import iconPicker from '../fields/iconPicker'
import { Card } from './Card'
import { ProductCard } from './ProductCard'
import { NewsCard } from './NewsCard'

export const Carousel: Block = {
  slug: 'Carousel',
  interfaceName: 'CarouselBlock',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                {
                  label: 'Product Card',
                  value: 'productCard',
                },
                {
                  label: 'News Card',
                  value: 'newsCard',
                },
                {
                  label: 'Simple Card',
                  value: 'simpleCard',
                },
              ],
              defaultValue: 'productCard',
              required: true,
            },
            {
              name: 'speed',
              type: 'number',
              defaultValue: 500,
              admin: {
                width: '31%',
              },
            },
          ],
        },
        {
          name: 'loop',
          type: 'checkbox',
        },
        {
          name: 'showLink',
          type: 'checkbox',
        },
        {
          name: 'linkText',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.showLink,
          },
        },
        {
          type: 'row',
          fields: [
            link({
              name: 'link',
              admin: {
                condition: (_, siblingData) => siblingData?.showLink,
              },
            }),
            {
              name: 'icon',
              type: 'group',
              admin: {
                condition: (_, siblingData) => siblingData?.showLink,
              },
              fields: [iconPicker],
            },
          ],
        },
      ],
    },
    {
      name: 'products',
      type: 'blocks',
      blocks: [ProductCard],
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.settings?.type === 'productCard',
      },
    },
    {
      name: 'cards',
      type: 'blocks',
      blocks: [Card],
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.settings?.type === 'simpleCard',
      },
    },
    {
      name: 'newsCards',
      type: 'blocks',
      blocks: [NewsCard],
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.settings?.type === 'newsCard',
      },
    },
  ],
  imageURL: '/previews/carousel.png',
  imageAltText: 'Carousel Preview',
}
