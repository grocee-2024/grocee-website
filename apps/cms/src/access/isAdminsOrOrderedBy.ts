import type { Access } from 'payload/config'
import { checkRole } from './checkRole'

export const isAdminsOrOrderedBy: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    orderedBy: {
      equals: user?.id,
    },
  }
}
