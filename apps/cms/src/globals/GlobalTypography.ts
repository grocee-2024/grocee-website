import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'

export const GlobalTypography: GlobalConfig = {
  slug: 'globalTypography',
  label: 'Global Typography',
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [],
}
