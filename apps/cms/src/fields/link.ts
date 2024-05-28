import { Field, GroupField } from 'payload/types'

type Props = Partial<
  Pick<GroupField, 'name' | 'admin' | 'fields'> & {
    relationTo?: string[]
  }
>

export const link = (props?: Props): Field => ({
  name: props?.name ?? 'link',
  type: 'group',
  admin: props?.admin ?? {},
  fields: [
    ...(props?.fields ?? []),
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Internal link',
          value: 'reference',
        },
        {
          label: 'Custom URL',
          value: 'custom',
        },
      ],
      defaultValue: 'reference',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          label: 'Document to link to',
          type: 'relationship',
          relationTo: props?.relationTo ?? [
            'pages',
            'categories',
            'news',
            'productPages',
            'newsPages',
          ],
          required: true,
          maxDepth: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
            width: '45%',
          },
        },
        {
          name: 'url',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            width: '45%',
          },
        },
      ],
    },
  ],
})
