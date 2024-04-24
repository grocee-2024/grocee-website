import { CollectionConfig } from 'payload/types'
import { isAnyone } from '../access/isAnyone'
import { isAdmin } from '../access/isAdmin'
import { slugField } from '../fields/slug'
import { ALL_BLOCKS } from '../blocks'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'title', 'updatedAt'],
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
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'footerLayout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
    },
  ],
}
