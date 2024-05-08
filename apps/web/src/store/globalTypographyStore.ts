import { GlobalTypography } from 'cms-types'
import { create } from 'zustand'

export const useGlobalTypography = create<Omit<GlobalTypography, 'id' | 'createdAt' | 'updatedAt'>>(
  () => ({
    orderDeliveryForm: {
      firstName: {
        label: '',
        placeholder: '',
      },
      lastName: {
        label: '',
        placeholder: '',
      },
      phoneNumber: {
        label: '',
        placeholder: '',
      },
      shippingAddress: {
        label: '',
        placeholder: '',
      },
      date: {
        label: '',
        placeholder: '',
      },
      time: {
        label: '',
        placeholder: '',
      },
    },
    support: {
      links: [],
      link: {
        label: '',
        icon: {
          size: {
            width: 18,
            height: 18,
          },
        },
      },
    },
    account: {
      mainMenuAccountField: {
        title: '',
        description: '',
        link: {},
      },
    },
    productButtons: {
      addToCartButton: '',
      buyNowButton: '',
    },
    newsCardButtons: {
      reviewButton: '',
    },
    backButton: {
      label: '',
      icon: {
        icon: '',
        size: {
          width: 16,
          height: 16,
        },
      },
    },
    searchPage: {
      productsCountTitle: '',
      searchResultTitle: '',
      emptySearchResultTitle: '',
      errorSearchResultTitle: '',
    },
  }),
)
