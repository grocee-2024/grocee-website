import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { slugField } from '../../../fields/slug'

export const Countries: CollectionConfig = {
  slug: 'countries',
  auth: false,
  labels: {
    plural: 'Countries',
    singular: 'Country',
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
      required: true,
      localized: true,
    },
    {
      name: 'flag',
      type: 'group',
      fields: [
        {
          name: 'png',
          type: 'text',
        },
        {
          name: 'svg',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
}
