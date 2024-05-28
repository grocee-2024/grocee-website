import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { slugField } from '../../../fields/slug'
import { ALL_BLOCKS } from '../../../blocks'
import { isAdmin } from '../../../access/isAdmin'

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
    create: isAdmin,
    update: isAdmin,
  },
  fields: [
    slugField(),
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
    },
    {
      name: 'productIntro',
      type: 'group',
      fields: [
        {
          name: 'images',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'images',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
