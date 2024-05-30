import type { CollectionConfig } from 'payload/types'

import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { ProductSelect } from './ui/ProductSelect'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { SubcategorySelect } from './ui/SubcategorySelect'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'productDetails.stripeProductID', 'updatedAt'],
    group: 'Shop',
  },
  hooks: {
    beforeChange: [beforeProductChange],
    afterDelete: [deleteProductFromCarts],
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
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'productDetails',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
        },
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
          name: 'tag',
          type: 'relationship',
          relationTo: 'tags',
        },
        {
          name: 'trademark',
          type: 'relationship',
          relationTo: 'trademarks',
        },
        {
          name: 'specials',
          type: 'relationship',
          relationTo: 'specials',
          hasMany: true,
        },
        {
          name: 'country',
          type: 'relationship',
          relationTo: 'countries',
        },
        {
          name: 'taste',
          type: 'relationship',
          relationTo: 'tastes',
        },
        {
          name: 'alcoholPercentage',
          type: 'number',
        },
        {
          name: 'weight',
          type: 'number',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: 'weightStep',
          type: 'number',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: 'priceJSON',
          label: 'Price JSON',
          type: 'json',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: 'price',
          type: 'number',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: 'unit',
          type: 'relationship',
          relationTo: 'units',
        },
        {
          name: 'rating',
          type: 'number',
          defaultValue: 0,
          min: 0,
          max: 5,
        },
      ],
    },
    {
      name: 'nutritionalValue',
      type: 'group',
      fields: [
        {
          name: 'energyValue',
          type: 'number',
          required: true,
        },
        {
          name: 'proteins',
          type: 'number',
        },
        {
          name: 'fats',
          type: 'number',
        },
        {
          name: 'carbohydrates',
          type: 'number',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'subcategories',
      type: 'relationship',
      relationTo: 'subcategories',
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: SubcategorySelect,
        },
        condition: (_, siblingData) => !!siblingData?.category,
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
