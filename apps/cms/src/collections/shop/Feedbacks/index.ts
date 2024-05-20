import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { isAdminOrLoggedIn } from '../../../access/isAdminOrLoggedIn'
import { beforeChangeHook } from './hooks/beforeChangeHook'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'review',
    defaultColumns: ['rating', 'review', 'product', 'user'],
    group: 'Shop',
  },
  labels: {
    plural: 'Feedbacks',
    singular: 'Feedback',
  },
  versions: {
    drafts: false,
  },
  access: {
    read: isAnyone,
    create: isAdminOrLoggedIn,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  fields: [
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'review',
      type: 'textarea',
      admin: {
        rows: 10,
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
