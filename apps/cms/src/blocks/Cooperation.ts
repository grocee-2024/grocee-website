import { Block } from 'payload/types'

export const Cooperation: Block = {
  slug: 'Cooperation',
  interfaceName: 'CooperationBlock',
  labels: {
    singular: 'Cooperation',
    plural: 'Cooperations',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
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
  imageURL: '/previews/cooperation.png',
  imageAltText: 'Cooperation Preview',
}
