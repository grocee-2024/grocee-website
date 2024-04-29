import payload from 'payload'
import { Images } from './images'

export const createNews = async (images: Images) => {
  const [newsArticle] = await Promise.all([
    payload.create({
      collection: 'news',
      data: {
        slug: 'new-seasonal-produce-now-available',
        title: 'New Seasonal Produce Now Available!',
        previewImage: images.tempImageId,
        titleColor: 'white',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: `We're thrilled to announce the arrival of fresh, seasonal produce at Grocee! Our shelves are stocked with an array of vibrant fruits and vegetables, sourced directly from local farms. From crisp apples to juicy tomatoes, there's something for everyone to enjoy. Dive into the flavors of the season and elevate your meals with the finest ingredients nature has to offer. Visit us today and explore our wide selection of seasonal produce. Don't miss out on the opportunity to savor the best of what nature has to offer, only at Grocee!`,
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
            ],
            direction: 'ltr',
          },
        },
      },
    }),
  ])

  payload.logger.info('> Created news')

  return [newsArticle]
}

export type News = Awaited<ReturnType<typeof createNews>>
