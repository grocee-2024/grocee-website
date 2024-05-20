import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../access/isAnyone'
import { isAdmin } from '../../access/isAdmin'

export const Currencies: CollectionConfig = {
  slug: 'currencies',
  admin: {
    useAsTitle: 'label',
    group: 'Shop',
  },
  labels: {
    plural: 'Currencies',
    singular: 'Currency',
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
