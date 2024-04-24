import payload from 'payload'
import { Images } from './images'
import { ProductPages } from './product-pages'
import { News } from './news'

export const createPages = async () => {
  const [homePage] = await Promise.all([
    payload.create({
      collection: 'pages',
      data: {
        slug: 'home',
        meta: {
          title: 'Grocee - healthy products for a healthy life',
          description:
            'Grocee is an online platform for convenient and fast purchases of food and other goods online.',
        },
      },
    }),
  ])

  payload.logger.info('> Created pages')

  return {
    homePageId: homePage.id,
  }
}

export const populatePagesData = async (
  pages: Pages,
  productPages: ProductPages,
  news: News,
  images: Images,
) => {
  await Promise.all([
    payload.update({
      id: pages.homePageId,
      collection: 'pages',
      data: {
        _status: 'published',
        layout: [
          {
            blockType: 'MainSlider',
            slides: [
              {
                image: images.mainGoodsId,
                heading: {
                  title: 'Quick & Convenient: Order Groceries Online',
                  description:
                    'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
                  link: {
                    type: 'link',
                    label: 'Order delivery',
                    isStandartButton: true,
                    appearance: 'primary',
                    linkType: 'custom',
                    url: '/',
                    icons: {
                      rightIcon: {
                        icon: 'ArrowCircleRight',
                        size: {
                          width: 18,
                          height: 18,
                        },
                      },
                    },
                  },
                },
              },
              {
                image: images.mainGoodsId,
                heading: {
                  title: 'Quick & Convenient: Order Groceries Online',
                  description:
                    'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
                  link: {
                    type: 'link',
                    label: 'Order delivery',
                    isStandartButton: true,
                    appearance: 'primary',
                    linkType: 'custom',
                    url: '/',
                    icons: {
                      rightIcon: {
                        icon: 'ArrowCircleRight',
                        size: {
                          width: 18,
                          height: 18,
                        },
                      },
                    },
                  },
                },
              },
              {
                image: images.mainGoodsId,
                heading: {
                  title: 'Quick & Convenient: Order Groceries Online',
                  description:
                    'Free yourself from grocery store lines and stress. Order your favorite groceries conveniently from home and enjoy hassle-free shopping.',
                  link: {
                    type: 'link',
                    label: 'Order delivery',
                    isStandartButton: true,
                    appearance: 'primary',
                    linkType: 'custom',
                    url: '/',
                    icons: {
                      rightIcon: {
                        icon: 'ArrowCircleRight',
                        size: {
                          width: 18,
                          height: 18,
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            blockType: 'Carousel',
            settings: {
              icon: {
                icon: 'ArrowCircleRight',
                size: {
                  height: 18,
                  width: 18,
                },
              },
              link: {
                type: 'custom',
                url: '/',
              },
              linkText: 'All',
              type: 'simpleCard',
              showLink: true,
            },
            title: 'Categories',
            cards: [
              {
                blockType: 'Card',
                image: images.mainGoodsId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.mainGoodsId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.mainGoodsId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.mainGoodsId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                image: images.mainGoodsId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
            ],
          },
          {
            blockType: 'Carousel',
            settings: {
              icon: {
                icon: 'ArrowCircleRight',
                size: {
                  height: 18,
                  width: 18,
                },
              },
              link: {
                type: 'custom',
                url: '/',
              },
              linkText: 'All',
              type: 'productCard',
              showLink: true,
            },
            title: 'Actions',
            products: [
              {
                blockType: 'ProductCard',
                page: {
                  relationTo: 'productPages',
                  value: productPages.potatoPage,
                },
              },
              {
                blockType: 'ProductCard',
                page: {
                  relationTo: 'productPages',
                  value: productPages.potatoPage,
                },
              },
              {
                blockType: 'ProductCard',
                page: {
                  relationTo: 'productPages',
                  value: productPages.potatoPage,
                },
              },
              {
                blockType: 'ProductCard',
                page: {
                  relationTo: 'productPages',
                  value: productPages.potatoPage,
                },
              },
              {
                blockType: 'ProductCard',
                page: {
                  relationTo: 'productPages',
                  value: productPages.potatoPage,
                },
              },
            ],
          },
          {
            blockType: 'Carousel',
            settings: {
              icon: {
                icon: 'ArrowCircleRight',
                size: {
                  height: 18,
                  width: 18,
                },
              },
              link: {
                type: 'custom',
                url: '/',
              },
              linkText: 'All',
              type: 'newsCard',
              showLink: true,
            },
            title: 'News',
            newsCards: [
              {
                blockType: 'NewsCard',
                newsArticle: {
                  relationTo: 'news',
                  value: news[0].id,
                },
              },
              {
                blockType: 'NewsCard',
                newsArticle: {
                  relationTo: 'news',
                  value: news[0].id,
                },
              },
              {
                blockType: 'NewsCard',
                newsArticle: {
                  relationTo: 'news',
                  value: news[0].id,
                },
              },
              {
                blockType: 'NewsCard',
                newsArticle: {
                  relationTo: 'news',
                  value: news[0].id,
                },
              },
              {
                blockType: 'NewsCard',
                newsArticle: {
                  relationTo: 'news',
                  value: news[0].id,
                },
              },
            ],
          },
        ],
      },
    }),
  ])
}

export type Pages = Awaited<ReturnType<typeof createPages>>
