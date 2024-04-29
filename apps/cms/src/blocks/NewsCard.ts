import { Block } from 'payload/types'

export const NewsCard: Block = {
  slug: 'NewsCard',
  interfaceName: 'NewsCardBlock',
  labels: {
    singular: 'News Card',
    plural: 'News Cards',
  },
  fields: [
    {
      name: 'newsArticle',
      type: 'relationship',
      relationTo: ['news'],
      required: true,
    },
  ],
  imageURL: '/previews/news-card.png',
  imageAltText: 'News Card Preview',
}
