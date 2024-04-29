import { Field } from 'payload/types'
import IconPicker from './IconPicker'

const iconPicker: Field = {
  type: 'row',
  fields: [
    {
      admin: {
        components: {
          Field: IconPicker,
        },
      },
      name: 'icon',
      type: 'text',
    },
    {
      name: 'size',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'width',
              type: 'number',
              defaultValue: 18,
              required: true,
            },
            {
              name: 'height',
              type: 'number',
              defaultValue: 18,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default iconPicker
