import type { CollectionConfig } from 'payload/types'

import { isAnyone } from '../access/isAnyone'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: isAnyone,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
