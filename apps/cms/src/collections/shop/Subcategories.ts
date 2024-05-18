import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../access/isAnyone'
import { isAdmin } from '../../access/isAdmin'
import { slugField } from '../../fields/slug'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
  admin: {
    useAsTitle: 'label',
    group: 'Shop',
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
    slugField(),
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
