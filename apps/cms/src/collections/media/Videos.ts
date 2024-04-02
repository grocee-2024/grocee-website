import { CollectionConfig } from 'payload/types'
import { useCacheControl } from '../../middleware/useCacheControl'
import { isAnyone } from '../../access/isAnyone'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  admin: {
    group: 'Media',
  },
  access: {
    read: isAnyone,
  },
  upload: {
    staticURL: '/videos',
    staticDir: '../../media/videos/',
    mimeTypes: ['video/*'],
    handlers: [useCacheControl('public, max-age=604800')],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      name: 'caption',
      type: 'richText',
      localized: true,
    },
  ],
}
