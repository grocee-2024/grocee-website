import payload from 'payload'
import { Images } from './images'

export const createNews = async (images: Images) => {
  const [newsArticle] = await Promise.all([
    payload.create({
      collection: 'news',
      data: {
        title: 'New Seasonal Produce Now Available!',
        previewImage: images.tempImageId,
        titleColor: 'white',
        link: {
          type: 'custom',
          url: '/news/new-seasonal-produce-now-available',
          label: 'Review',
        },
      },
    }),
  ])

  payload.logger.info('> Created news')

  return [newsArticle]
}

export type News = Awaited<ReturnType<typeof createNews>>
