import { Block } from 'payload/types'

export const RichText: Block = {
  slug: 'RichText',
  interfaceName: 'RichTextBlock',
  labels: {
    plural: 'RichTexts',
    singular: 'RichText',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
  imageURL: '/previews/rich-text.png',
  imageAltText: 'RichText Preview',
}
