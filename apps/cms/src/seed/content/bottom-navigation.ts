import payload from 'payload'
import { Images } from './images'
import { Pages } from './pages'

export const createBottomNavigation = async (pages: Pages, images: Images) => {
  await payload.updateGlobal({
    slug: 'bottomNavigation',
    data: {
      logo: {
        image: images.logoLightId,
        page: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: pages.homePageId,
          },
        },
        caption: 'The freshest products with the fastest delivery.',
      },
      navGroups: [
        {
          title: 'Interaction',
          links: [
            {
              page: {
                label: 'Product categories',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              page: {
                label: 'Actions',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              page: {
                label: 'Forming an order',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              page: {
                label: 'Delivery',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
          ],
        },
        {
          title: 'Help',
          links: [
            {
              page: {
                label: 'Contact page',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              page: {
                label: 'FAQ',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              page: {
                label: 'Privacy policy',
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
          ],
        },
      ],
      subscribeSection: {
        title:
          'Subscribe to the newsletter and receive information about new products and promotions.',
        textField: {
          placeholder: 'Enter your email',
          subscribeButtonLabel: 'Subscribe',
        },
      },
      footerInfo: {
        rightsText: '©2024 Grocee. All rights reserved.',
        designedBy: 'Designed by Polina Naumenko',
      },
    },
  })

  payload.logger.info('> Created bottom navigation')
}
