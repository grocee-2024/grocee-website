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
          title: 'Grocee - The freshest products with the fastest delivery.',
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
                  showHeading: true,
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
                  showHeading: true,
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
                  showHeading: true,
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
                image: images.tempImageId,
                text: 'Category',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.tempImageId,
                text: 'Category',
                gap: 'big',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.tempImageId,
                text: 'Category',
                gap: 'big',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.tempImageId,
                text: 'Category',
                gap: 'big',
                link: {
                  type: 'custom',
                  url: '/',
                },
              },
              {
                blockType: 'Card',
                image: images.tempImageId,
                text: 'Category',
                gap: 'big',
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
              type: 'productCard',
              showLink: true,
            },
            title: 'Novelty',
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
            blockType: 'Banner',
            previewImage: images.marketBannerId,
            heading: {
              title: 'Discover Grocee: Your Ultimate Grocery Destination',
              logo: {
                image: images.logoDarkId,
                page: {
                  reference: {
                    relationTo: 'pages',
                    value: pages.homePageId,
                  },
                },
              },
              type: 'info',
              info: {
                listMarker: {
                  icon: 'CheckCirleFilled',
                  size: {
                    width: 18,
                    height: 18,
                  },
                },
                list: [
                  {
                    listItem: 'Fresh & Quality Selection',
                  },
                  {
                    listItem: 'Convenient Online Ordering',
                  },
                  {
                    listItem: 'Fast & Reliable Delivery',
                  },
                  {
                    listItem: 'Exceptional Customer Service',
                  },
                ],
              },
              links: [
                {
                  linkOrButton: {
                    appearance: 'primary',
                    linkType: 'reference',
                    reference: {
                      relationTo: 'pages',
                      value: pages.homePageId,
                    },
                    isStandartButton: true,
                    label: 'Shop Now',
                    type: 'link',
                  },
                },
                {
                  linkOrButton: {
                    appearance: 'tertiary',
                    linkType: 'reference',
                    reference: {
                      relationTo: 'pages',
                      value: pages.homePageId,
                    },
                    isStandartButton: true,
                    label: 'Learn More',
                    type: 'link',
                  },
                },
              ],
            },
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
            title: 'Fruits and vegetables',
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
              type: 'productCard',
              showLink: true,
            },
            title: 'Baked goods',
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
              type: 'productCard',
              showLink: true,
            },
            title: 'Meat products',
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
              type: 'productCard',
              showLink: true,
            },
            title: 'Dairy products',
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
          {
            blockType: 'Cooperation',
            title: 'Cooperation',
            logos: [
              {
                logo: images.logoIpsumLogo1Id,
              },
              {
                logo: images.logoIpsumLogo2Id,
              },
              {
                logo: images.logoIpsumLogo3Id,
              },
              {
                logo: images.logoIpsumLogo4Id,
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
            title: 'Cooked food',
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
            blockType: 'HelpBlock',
            title: 'Need Help?',
            accordion: [
              {
                blockType: 'Accordion',
                link: {
                  label: 'See all',
                  icon: {
                    icon: 'ArrowCircleRight',
                    size: {
                      width: 18,
                      height: 18,
                    },
                  },
                  type: 'reference',
                  reference: {
                    relationTo: 'pages',
                    value: pages.homePageId,
                  },
                },
                accordionList: [
                  {
                    title: 'How can I place an order?',
                    content:
                      'Placing an order with Grocee is easy! Simply browse our website or app, select the items you want, add them to your cart, and proceed to checkout.',
                  },
                  {
                    title: 'How can I place an order?',
                    content:
                      'Placing an order with Grocee is easy! Simply browse our website or app, select the items you want, add them to your cart, and proceed to checkout.',
                  },
                  {
                    title: 'How can I place an order?',
                    content:
                      'Placing an order with Grocee is easy! Simply browse our website or app, select the items you want, add them to your cart, and proceed to checkout.',
                  },
                  {
                    title: 'How can I place an order?',
                    content:
                      'Placing an order with Grocee is easy! Simply browse our website or app, select the items you want, add them to your cart, and proceed to checkout.',
                  },
                  {
                    title: 'How can I place an order?',
                    content:
                      'Placing an order with Grocee is easy! Simply browse our website or app, select the items you want, add them to your cart, and proceed to checkout.',
                  },
                ],
              },
            ],
          },
          {
            blockType: 'Banner',
            previewImage: images.deliveryBannerId,
            heading: {
              type: 'orderDelivery',
              title: 'Order delivery',
              logo: {
                image: images.logoDarkId,
                page: {
                  type: 'reference',
                  reference: {
                    relationTo: 'pages',
                    value: pages.homePageId,
                  },
                },
              },
              orderDelivery: {
                subtitle:
                  'Enter your details and delivery address to receive the current product range and prices.',
              },
              links: [
                {
                  linkOrButton: {
                    appearance: 'primary',
                    linkType: 'reference',
                    reference: {
                      relationTo: 'pages',
                      value: pages.homePageId,
                    },
                    isStandartButton: true,
                    label: 'Order Delivery',
                    type: 'link',
                  },
                },
                {
                  linkOrButton: {
                    appearance: 'tertiary',
                    linkType: 'reference',
                    reference: {
                      relationTo: 'pages',
                      value: pages.homePageId,
                    },
                    isStandartButton: true,
                    label: 'Learn More',
                    type: 'link',
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  ])
}

export type Pages = Awaited<ReturnType<typeof createPages>>
