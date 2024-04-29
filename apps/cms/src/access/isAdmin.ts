import type { AccessArgs } from 'payload/config'

import type { User } from 'cms-types'
import { checkRole } from './checkRole'

type isAdminType = (args: AccessArgs<unknown, User>) => boolean

export const isAdmin: isAdminType = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}
