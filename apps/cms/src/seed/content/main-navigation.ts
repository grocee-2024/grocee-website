import payload from 'payload'
import { Images } from './images'
import { Pages } from './pages'

export const createMainNavigation = async (pages: Pages, images: Images) => {
  await payload.updateGlobal({
    slug: 'mainNavigation',
    data: {
      logo: {
        image: images.logoId,
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
}
