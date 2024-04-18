import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'

export const GlobalTypography: GlobalConfig = {
  slug: 'globalTypography',
  label: 'Global Typography',
  access: {
    read: isAdmin,
  },
  fields: [],
}
