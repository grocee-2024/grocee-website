import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'
import { localizedInput } from '../fields/localizedInput'

export const GlobalTypography: GlobalConfig = {
  slug: 'globalTypography',
  label: 'Global Typography',
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'orderDeliveryForm',
      type: 'group',
      fields: [
        localizedInput({ name: 'firstName' }),
        localizedInput({ name: 'lastName' }),
        localizedInput({ name: 'phoneNumber' }),
        localizedInput({ name: 'shippingAddress' }),
        localizedInput({ name: 'date' }),
        localizedInput({ name: 'time' }),
      ],
    },
  ],
}
