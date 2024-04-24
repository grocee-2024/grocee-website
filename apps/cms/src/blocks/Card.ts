import { Block } from 'payload/types'
import { link } from '../fields/link'

export const Card: Block = {
  slug: 'Card',
  interfaceName: 'CardBlock',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    link(),
  ],
}
