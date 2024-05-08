import payload from 'payload'
import { Pages } from './pages'

export const createGlobalTypography = async (pages: Pages) => {
  await payload.updateGlobal({
    slug: 'globalTypography',
    data: {
      orderDeliveryForm: {
        firstName: {
          label: 'Enter your first name',
          placeholder: 'John',
        },
        lastName: {
          label: 'Enter your last name',
          placeholder: 'Doe',
        },
        phoneNumber: {
          label: 'Enter your phone number',
          placeholder: '000-000-000',
        },
        shippingAddress: {
          label: 'Enter your shipping address',
          placeholder: 'Main street, City',
        },
        date: {
          label: 'Choose a date',
          placeholder: '24/08/2024',
        },
        time: {
          label: 'Choose a time',
          placeholder: '00:00',
        },
      },
      support: {
        links: [
          {
            type: 'email',
            info: 'info@grocee.com',
            caption: 'Support Email',
            icon: {
              icon: 'Mail',
              size: {
                width: 24,
                height: 24,
              },
            },
          },
          {
            type: 'phone',
            info: '1-800-555-GROC (4762)',
            caption: 'Support Hotline',
            icon: {
              icon: 'Phone',
              size: {
                width: 24,
                height: 24,
              },
            },
          },
          {
            type: 'location',
            info: '123 Main Street, Cityville, State, 35721',
            caption: 'Our office',
            googleMapsLocation:
              'https://www.google.com/maps/place/Kharkiv,+Kharkiv+Oblast/@49.9944869,36.1299428,12z/data=!3m1!4b1!4m6!3m5!1s0x4127a09f63ab0f8b:0x2d4c18681aa4be0a!8m2!3d50.0020127!4d36.3073994!16zL20vMDgyc3k5?entry=ttu',
            icon: {
              icon: 'Apartment',
              size: {
                width: 24,
                height: 24,
              },
            },
          },
        ],
        link: {
          label: 'Support',
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
      },
      account: {
        mainMenuAccountField: {
          title: 'Sign in',
          description: 'Log in or create an account to get the most benefits.',
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: pages.homePageId,
            },
          },
        },
      },
      productButtons: {
        addToCartButton: 'Add to cart',
        buyNowButton: 'Buy now',
      },
      newsCardButtons: {
        reviewButton: 'Review',
      },
      backButton: {
        label: 'Back',
        icon: {
          icon: 'ArrowLeft',
          size: {
            width: 16,
            height: 16,
          },
        },
      },
      searchPage: {
        searchResultTitle: 'Search results for "{{query}}"',
        productsCountTitle: 'A total of {{count}} products were found',
        emptySearchResultTitle: 'Nothing was found for the query "{{query}}"',
        errorSearchResultTitle: 'An error occurred while searching, please try again later',
      },
    },
  })

  payload.logger.info('> Created global typography')
}
