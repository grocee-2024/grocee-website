import iconPicker from '../fields/iconPicker'
import { link } from './../fields/link'
import { Block } from 'payload/types'

export const Accordion: Block = {
  slug: 'Accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'accordionList',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'withoutLink',
      type: 'checkbox',
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
      admin: {
        condition: (_, siblingData) => !siblingData.withoutLink,
      },
    }),
  ],
  imageURL: '/previews/accordion.png',
  imageAltText: 'Accordion Preview',
}
