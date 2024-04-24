import { GlobalConfig } from 'payload/types'
import { ALL_BLOCKS } from '../blocks'
import { isAdmin } from '../access/isAdmin'
import { isAnyone } from '../access/isAnyone'

export const AllBlocks: GlobalConfig = {
  slug: 'allBlocks',
  label: 'AllBlocks',
  admin: {
    hidden: true,
  },
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
