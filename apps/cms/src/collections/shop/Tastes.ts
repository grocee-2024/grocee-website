import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../access/isAnyone'
import { isAdmin } from '../../access/isAdmin'
import { slugField } from '../../fields/slug'

export const Tastes: CollectionConfig = {
  slug: 'tastes',
  auth: false,
  labels: {
    plural: 'Tastes',
    singular: 'Taste',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  versions: {
    drafts: false,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'updatedAt'],
    group: 'Shop',
  },
  fields: [
    slugField(),
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
