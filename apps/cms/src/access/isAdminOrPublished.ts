import type { Access } from 'payload/config'
import { checkRole } from './checkRole'

export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
