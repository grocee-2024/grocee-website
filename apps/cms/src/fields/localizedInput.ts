import { GroupField } from 'payload/types'

type Props = Omit<GroupField, 'type' | 'fields'>

export const localizedInput = ({ name, ...props }: Props): GroupField => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'placeholder',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
  ...props,
})
