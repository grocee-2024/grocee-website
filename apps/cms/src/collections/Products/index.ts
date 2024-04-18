import type { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access/isAdmin'
import { slugField } from '../../fields/slug'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { ProductSelect } from './ui/ProductSelect'
import { isAnyone } from '../../access/isAnyone'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stripeProductID', '_status'],
    group: 'Shop',
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [beforeProductChange],
    afterChange: [revalidateProduct],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'productDetails',
      type: 'group',
      fields: [
        {
          name: 'stripeProductID',
          label: 'Stripe Product',
          type: 'text',
          admin: {
            components: {
              Field: ProductSelect,
            },
          },
        },
        {
          name: 'priceJSON',
          label: 'Price JSON',
          type: 'textarea',
          admin: {
            readOnly: true,
            hidden: true,
            rows: 10,
          },
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}
