import type { Block } from 'payload/types'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  fields: [
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'media',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          admin: {
            condition: (_, data) => data?.video,
          },
          required: true,
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'videos',
          admin: {
            condition: (_, data) => data?.image,
          },
          required: true,
        },
      ],
    },
  ],
}
