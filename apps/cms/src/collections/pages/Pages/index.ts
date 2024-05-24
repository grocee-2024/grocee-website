import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { slugField } from '../../../fields/slug'
import { ALL_BLOCKS } from '../../../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Pages',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'layout', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: isAnyone,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    slugField(),
    {
      name: 'breadcrumbsTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'layoutHasWidthLimit',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
