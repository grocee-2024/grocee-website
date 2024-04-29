import { CollectionConfig } from 'payload/types'
import { useCacheControl } from '../../middleware/useCacheControl'
import { isAnyone } from '../../access/isAnyone'
import { isAdmin } from '../../access/isAdmin'

const AVAILABLE_SIZES =
  process.env.NODE_ENV !== 'production'
    ? [128, 1024, 2048]
    : [32, 64, 128, 256, 512, 768, 1024, 1280, 1536, 1792, 2048, 2560, 3072, 3584, 4096]

const FORMATS =
  process.env.NODE_ENV !== 'production' ? (['png'] as const) : (['png', 'webp', 'avif'] as const)

export const Images: CollectionConfig = {
  slug: 'images',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    group: 'Media',
  },
  access: {
    read: isAnyone,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  upload: {
    staticURL: '/images',
    staticDir: 'images',
    imageSizes: AVAILABLE_SIZES.flatMap(size =>
      FORMATS.map(format => ({
        name: `${format}_${size}px`,
        width: size,
        formatOptions: {
          format,
        },
      })),
    ),
    mimeTypes: ['image/*'],
    handlers: [useCacheControl('public, max-age=604800')],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
