import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { slugField } from '../../../fields/slug'

export const ProductPages: CollectionConfig = {
  slug: 'productPages',
  auth: false,
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'Product Page',
    plural: 'Product Pages',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'product', 'updatedAt'],
  },
  access: {
    read: isAnyone,
  },
  fields: [
    slugField(),
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
    },
  ],
}
