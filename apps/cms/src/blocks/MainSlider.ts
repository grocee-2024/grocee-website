import { Block } from 'payload/types'
import linkOrButton from '../fields/linkOrButton'

export const MainSlider: Block = {
  slug: 'MainSlider',
  interfaceName: 'MainSliderBlock',
  labels: {
    singular: 'Main Slider',
    plural: 'Main Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
        },
        {
          name: 'heading',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
            linkOrButton({ name: 'link', label: 'Link' }),
          ],
        },
      ],
    },
  ],
  imageURL: '/previews/main-slider-preview.png',
  imageAltText: 'Main Slider',
}
