import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { slugField } from '../../../fields/slug'

export const Specials: CollectionConfig = {
  slug: 'specials',
  auth: false,
  labels: {
    plural: 'Specials',
    singular: 'Special',
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
    group: 'Filters',
  },
  fields: [
    slugField(),
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
