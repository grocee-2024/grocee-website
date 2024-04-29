import type { Access, AccessArgs } from 'payload/config'

import type { User } from 'cms-types'
import { checkRole } from './checkRole'

export const isAdminOrLoggedIn: Access = ({ req }: AccessArgs<User>) => {
  if (checkRole(['admin'], req.user)) {
    return true
  }

  return !!req.user
}
