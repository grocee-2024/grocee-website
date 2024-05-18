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
      name: 'settings',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'speed',
              type: 'number',
              defaultValue: 500,
              admin: {
                width: '45%',
              },
            },
            {
              name: 'effect',
              type: 'select',
              options: [
                {
                  label: 'Slide',
                  value: 'slide',
                },
                {
                  label: 'Fade',
                  value: 'fade',
                },
              ],
              admin: {
                width: '45%',
              },
              defaultValue: 'slide',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'loop',
              type: 'checkbox',
              admin: {
                width: '31%',
              },
            },
            {
              name: 'autoplay',
              type: 'checkbox',
              admin: {
                width: '31%',
              },
            },
          ],
        },
      ],
    },
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
              name: 'showHeading',
              type: 'checkbox',
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.showHeading,
              },
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.showHeading,
              },
            },
            linkOrButton({
              name: 'link',
              label: 'Link',
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData?.showHeading,
                },
              },
            }),
          ],
        },
      ],
    },
  ],
  imageURL: '/previews/main-slider.png',
  imageAltText: 'Main Slider Preview',
}
