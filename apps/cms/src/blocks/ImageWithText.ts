import { Block } from 'payload/types'

export const ImageWithText: Block = {
  slug: 'ImageWithText',
  interfaceName: 'ImageWithTextBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      required: true,
      defaultValue: 'left',
    },
  ],
  imageURL: '/previews/image-with-text-preview.png',
  imageAltText: 'Image With Text Preview',
}
