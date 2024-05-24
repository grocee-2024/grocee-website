import payload from 'payload'
import { Images } from './images'
import { ProductPages } from './product-pages'
import { News } from './news'

export const createPages = async () => {
  const [homePage, categoryPage, cartPage, privacyPolicyPage, faqPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      data: {
        slug: 'home',
        breadcrumbsTitle: 'Home page',
        meta: {
          title: 'Grocee - The freshest products with the fastest delivery.',
          description:
            'Grocee is an online platform for convenient and fast purchases of food and other goods online.',
        },
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        slug: 'category',
        breadcrumbsTitle: '{{category}}',
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        slug: 'cart',
        title: 'Cart',
        meta: {
          title: 'Grocee - Cart',
          description:
            'Grocee is an online platform for convenient and fast purchases of food and other goods online.',
        },
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        slug: 'privacy-policy',
        title: 'Privacy policy',
        breadcrumbsTitle: 'Privacy policy',
        subtitle: 'Effective date: April 1, 2024',
        layoutHasWidthLimit: true,
        meta: {
          title: 'Grocee - Privacy policy',
          description:
            'Grocee is an online platform for convenient and fast purchases of food and other goods online.',
        },
      },
    }),
    payload.create({
      collection: 'pages',
      data: {
        slug: 'faq',
        title: 'FAQ',
        breadcrumbsTitle: 'FAQ',
        layoutHasWidthLimit: true,
        meta: {
          title: 'Grocee - FAQ',
          description:
            'Grocee is an online platform for convenient and fast purchases of food and other goods online.',
        },
      },
    }),
  ])

  payload.logger.info('> Created pages')

  return {
    homePageId: homePage.id,
    categoryPageId: categoryPage.id,
    cartPageId: cartPage.id,
    privacyPolicyPageId: privacyPolicyPage.id,
    faqPageId: faqPage.id,
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
    payload.update({
      id: pages.categoryPageId,
      collection: 'pages',
      data: {
        parent: pages.homePageId,
        layout: [
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
    payload.update({
      collection: 'pages',
      id: pages.privacyPolicyPageId,
      data: {
        parent: pages.homePageId,
        layout: [
          {
            content: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Grocee ("us", "we", or "our") operates the website and mobile application (the "Service").',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Information Collection and Use',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h4',
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'We collect several different types of information for various purposes to provide and improve our Service to you.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Types of Data Collected',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h4',
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Email address',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 1,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'First name and last name',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 2,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Phone number',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Address, State, Province, ZIP/Postal code, City',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 4,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'Cookies and Usage Data',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 5,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'list',
                    version: 1,
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                  },

                  {
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Use of Data',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h4',
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'We use the collected data for various purposes:',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To provide and maintain our Service',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 1,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To notify you about changes to our Service',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 2,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To provide customer support',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 3,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To gather analysis or valuable information so that we can improve our Service',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 4,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To monitor the usage of our Service',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 5,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'To detect, prevent and address technical issues',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 6,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'list',
                    version: 1,
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                  },

                  {
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Transfer of Data',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h4',
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'If you are located outside Ukraine and choose to provide information to us, please note that we transfer the data, including Personal Data, to Ukraine and process it there.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Contact Us',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'heading',
                    version: 1,
                    tag: 'h4',
                  },

                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'If you have any questions about this Privacy Policy, please contact us:',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },

                  {
                    children: [
                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'By email: ',
                            type: 'text',
                            version: 1,
                          },

                          {
                            children: [
                              {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'privacy@grocee.com',
                                type: 'text',
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            type: 'autolink',
                            version: 2,

                            fields: {
                              linkType: 'custom',
                              url: 'mailto:privacy@grocee.com',
                            },
                          },

                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: ' ',
                            type: 'text',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 1,
                      },

                      {
                        children: [
                          {
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'By visiting this page on our website: ',
                            type: 'text',
                            version: 1,
                          },

                          {
                            children: [
                              {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'Contact Us',
                                type: 'text',
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            type: 'link',
                            version: 2,

                            fields: {
                              url: 'https://',

                              doc: {
                                value: pages.homePageId,
                                relationTo: 'pages',
                              },
                              newTab: false,
                              linkType: 'custom',
                            },
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'listitem',
                        version: 1,
                        value: 2,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'list',
                    version: 1,
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                  },
                ],
                direction: 'ltr',
              },
            },
            blockType: 'RichText',
          },
        ],
      },
    }),
    payload.update({
      id: pages.faqPageId,
      collection: 'pages',
      data: {
        layout: [
          {
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
            withoutLink: true,

            link: {
              icon: {
                size: {
                  width: 18,
                  height: 18,
                },
              },
              type: 'reference',
            },
            blockType: 'Accordion',
          },
        ],
      },
    }),
  ])
}

export type Pages = Awaited<ReturnType<typeof createPages>>
