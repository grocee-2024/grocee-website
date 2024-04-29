import { Block } from 'payload/types'

export const ProductCard: Block = {
  slug: 'ProductCard',
  interfaceName: 'ProductCardBlock',
  labels: {
    singular: 'Product Card',
    plural: 'Product Cards',
  },
  fields: [
    {
      name: 'page',
      type: 'relationship',
      relationTo: ['productPages'],
      required: true,
    },
  ],
  imageURL: '/previews/product-card.png',
  imageAltText: 'Product Card Preview',
}
