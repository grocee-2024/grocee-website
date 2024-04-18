import type { CollectionConfig } from 'payload/types'

import { isAdmin } from './../../access/isAdmin'
import { slugField } from '../../fields/slug'
import { isAdminOrPublished } from './access/isAdminOrPublished'
import { revalidatePage } from './hooks/revalidatePage'
import { ALL_BLOCKS } from '../../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: isAdminOrPublished,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    slugField(),
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: ALL_BLOCKS,
    },
  ],
}
