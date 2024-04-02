import type { Field } from 'payload/types'

import linkGroup from './linkGroup'

export const hero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
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
