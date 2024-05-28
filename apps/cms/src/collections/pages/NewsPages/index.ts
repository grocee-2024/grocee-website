import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { slugField } from '../../../fields/slug'
import { ALL_BLOCKS } from '../../../blocks'
import { isAdmin } from '../../../access/isAdmin'

export const NewsPages: CollectionConfig = {
  slug: 'newsPages',
  auth: false,
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'News Page',
    plural: 'News Pages',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'news', 'updatedAt'],
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
  },
  fields: [
    slugField(),
    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: false,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
