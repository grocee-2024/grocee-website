import type { CollectionConfig } from 'payload/types'
import { isAnyone } from '../../../access/isAnyone'
import { isAdmin } from '../../../access/isAdmin'
import { ShippingRateSelect } from './ui/ShippingRateSelect'
import { beforeChangeHook } from './hooks/beforeChange'

export const ShippingRates: CollectionConfig = {
  slug: 'shippingRates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'shippingRateID', 'amount'],
    group: 'Shop',
  },
  labels: {
    plural: 'ShippingRates',
    singular: 'ShippingRate',
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
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  fields: [
    {
      name: 'shippingRateID',
      label: 'Stripe Shipping Rate',
      type: 'text',
      admin: {
        components: {
          Field: ShippingRateSelect,
        },
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'deactivated',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'label',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Use the templates {{order_amount}} to display the order amount and {{shipping_amount}} to display the shipping amount',
      },
    },
    {
      name: 'minOrderPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
    },
    {
      name: 'currency',
      type: 'relationship',
      relationTo: 'currencies',
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'shippingRateJSON',
      label: 'Shipping Rate JSON',
      type: 'json',
      admin: {
        readOnly: true,
        hidden: true,
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
