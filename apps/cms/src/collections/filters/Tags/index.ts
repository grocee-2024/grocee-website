import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { slugField } from '../../../fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  auth: false,
  labels: {
    plural: 'Tags',
    singular: 'Tag',
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
