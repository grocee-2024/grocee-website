import type { CollectionConfig } from 'payload/types'

import { isAdmin } from './../../access/isAdmin'
import { slugField } from '../../fields/slug'
import { ALL_BLOCKS } from '../../blocks'
import { isAnyone } from '../../access/isAnyone'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Pages',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'layout', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: isAnyone,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    slugField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
