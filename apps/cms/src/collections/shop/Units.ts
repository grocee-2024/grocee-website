import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../access/isAnyone'
import { isAdmin } from '../../access/isAdmin'

export const Units: CollectionConfig = {
  slug: 'units',
  admin: {
    useAsTitle: 'label',
    group: 'Shop',
  },
  labels: {
    plural: 'Units',
    singular: 'Unit',
  },
  versions: {
    drafts: false,
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
