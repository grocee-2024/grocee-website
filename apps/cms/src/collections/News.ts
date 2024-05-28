import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../access/isAnyone'
import { isAdmin } from '../access/isAdmin'
import { slugField } from '../fields/slug'
import linkOrButton from '../fields/linkOrButton'
import { link } from '../fields/link'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'updatedAt'],
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
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'titleColor',
          type: 'select',
          options: [
            {
              label: 'Black',
              value: 'black',
            },
            {
              label: 'White',
              value: 'white',
            },
          ],
          required: true,
          defaultValue: 'white',
        },
      ],
    },
    link({ fields: [{ name: 'label', type: 'text', localized: true, required: true }] }),
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tags',
    },
  ],
}
