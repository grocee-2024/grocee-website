import { Field } from 'payload/types'
import IconPicker from './IconPicker'

const iconPicker: Field = {
  admin: {
    components: {
      Field: IconPicker,
    },
  },
  name: 'icon',
  type: 'text',
}

export default iconPicker
