import payload from 'payload'
import { Images } from './images'
import { Pages } from './pages'

export const createMainNavigation = async (pages: Pages, images: Images) => {
  await payload.updateGlobal({
    slug: 'mainNavigation',
    data: {
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
      search: {
        placeholder: 'Search...',
        searchButtonLabel: 'Search',
        closeButtonLabel: 'Close search',
      },
    },
  })

  payload.logger.info('> Created main navigation')
}
