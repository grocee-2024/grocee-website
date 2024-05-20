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
      addedToCartButton: '',
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
    categoryPage: {
      allSubcategoriesFilterLabel: '',
      errorMessage: '',
      notFoundProductsMessage: '',
      backToHomePageLabel: '',
      filterProducts: {
        label: '',
        applyFilterButtonLabel: '',
        filterLabels: {
          promotionalOffers: '',
          trademarks: '',
          countries: '',
          specials: '',
          price: {
            label: '',
            minPrice: '',
            maxPrice: '',
          },
        },
        filterParamsChangingMessages: {
          success: '',
          pending: '',
        },
      },
      sortProducts: {
        applySortButtonLabel: '',
        label: '',
        sortOptions: [],
        sortParamsChangingMessages: {
          success: '',
          pending: '',
        },
      },
    },
    productPage: {
      generalInfo: {
        title: '',
        country: '',
        trademark: '',
        taste: '',
        alcoholPercentage: '',
        numberOfUnits: '',
        weight: '',
      },
      nutritionalValue: {
        title: '',
        energyValue: '',
        proteins: '',
        fats: '',
        carbohydrates: '',
      },
      reviewsBlock: {
        title: '',
        logInToLeaveRivewLabel: '',
        emptyReviewListLabel: '',
      },
      descriptionLabel: '',
      quantityLabel: '',
      deliveryBlock: {
        title: '',
        shop: '',
        shippingCost: '',
        fastestDeliveryTime: '',
      },
    },
  }),
)
