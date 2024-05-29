import payload from 'payload'
import { Pages } from './pages'

export const createGlobalTypography = async (pages: Pages) => {
  await payload.updateGlobal({
    slug: 'globalTypography',
    data: {
      formErrorLabels: {
        textField: {
          invalidEmail: 'Invalid email address',
          invalidPhoneNumber: 'Invalid phone number',
          nonEmptyString: 'The field cannot be empty',
        },
        dateField: {
          invalidDate: 'Invalid date',
          invalidTime: 'Invalid time',
        },
      },
      sendMailLabels: {
        success: 'The message was sent successfully',
        error: 'An error occurred while sending a message',
      },
      cart: {
        minOrderPrice: {
          uah: 25,
        },
        minOrderPriceRequiredWarning:
          'To create a checkout, you need to add items to your cart totaling {{min_price}} or more',
        summary: {
          title: 'Summary',
          deliveyAmountLabel: 'Delivery',
          goodsAmountLabel: 'Goods',
          discountAmountLabel: 'Discount',
          addPromocodeLabel: 'Promo code',
          addCertificateLabel: 'Certificate',
          totalSumLabel: 'Total',
          addDiscountButtonLabel: 'Add',
          checkoutButtonLabel: 'Checkout',
          freeDeliveryLabel: 'Free Shipping',
        },
        afterPayment: {
          buttons: {
            backToHomeLink: 'On the main page',
            backToCartLink: 'Back to cart',
            downloadInvoiceButton: 'Download invoice',
          },
          success: {
            title: 'Payment Successful!',
            description:
              'Payment successfully completed! Your order has been accepted for processing, expect a message with the status of your order.',
            deliveryTime: 'Delivery time',
            deliveryAddress: 'Delivery address',
            totalSum: 'Sum',
            checkoutLoadedError: 'An unknown error occurred',
          },
          canceled: {
            title: 'An error occurred during the payment!',
            description:
              'There was an error during the payment! Try again later or contact our support.',
          },
        },
        clearBasketLabel: 'Clear the basket',
        createCheckoutError: 'An error occurred while creating a checkout',
        emptyCartLabel: 'Your cart is still empty, add your first good :)',
        addToCartSuccess: 'Successfully added to your cart',
        addToCartError: 'An error occurred while adding to cart',
        goodsAmountLessThanMinError: 'Add more items to your cart for the minimum order',
      },
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
        addedToCartButton: 'Added to cart',
        buyNowButton: 'Buy now',
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
      contactPage: {
        fullName: {
          label: 'Your name',
          placeholder: 'John Doe',
        },
        email: {
          label: 'Your email',
          placeholder: 'example@gmail.com',
        },
        subject: {
          label: 'Subject of appeal',
          placeholder: 'Subject',
        },
        comment: {
          label: 'Your comment',
          placeholder: 'Comment...',
        },
        subtitle: 'Need help?',
        sendButtonLabel: 'Send',
      },
      searchPage: {
        searchResultTitle: 'Search results for "{{query}}"',
        productsCountTitle: 'A total of {{count}} products were found',
        emptySearchResultTitle: 'Nothing was found for the query "{{query}}"',
        errorSearchResultTitle: 'An error occurred while searching, please try again later',
      },
      categoryPage: {
        allSubcategoriesFilterLabel: 'All',
        errorMessage: 'Something went wrong!',
        notFoundProductsMessage: 'No products were found according to your filters',
        backToHomePageLabel: 'Back to Home',
        filterProducts: {
          label: 'Filter',
          applyFilterButtonLabel: 'Apply filters',
          filterLabels: {
            promotionalOffers: 'Promotional offers',
            trademarks: 'Trademark',
            countries: 'Country',
            specials: 'Special',
            price: {
              label: 'Price',
              minPrice: 'Min price',
              maxPrice: 'Max price',
            },
          },
          filterParamsChangingMessages: {
            success: 'The filter parameters have been successfully updated',
            pending: 'Updating the filter parameters...',
          },
        },
        sortProducts: {
          label: 'Sort',
          applySortButtonLabel: 'Apply sort',
          sortOptions: [
            {
              label: 'Popular at first',
              productFieldToSort: 'createdAt',
              sortOrder: 'asc',
            },
            {
              label: 'By rating',
              productFieldToSort: 'productDetails.rating',
              sortOrder: 'asc',
            },
            {
              label: 'From A to Z',
              productFieldToSort: 'name',
              sortOrder: 'asc',
            },
            {
              label: 'From Z to A',
              productFieldToSort: 'name',
              sortOrder: 'desc',
            },
            {
              label: 'Cheaper at first',
              productFieldToSort: 'productDetails.price',
              sortOrder: 'asc',
            },
            {
              label: 'Epensive at first',
              productFieldToSort: 'productDetails.price',
              sortOrder: 'desc',
            },
          ],
          sortParamsChangingMessages: {
            success: 'The sorting parameters have been successfully updated',
            pending: 'Updating the sorting parameters...',
          },
        },
      },
      productPage: {
        generalInfo: {
          title: 'General Info',
          country: 'Country',
          trademark: 'Trademark',
          weight: 'Weight, kg',
          numberOfUnits: 'Number of units',
          taste: 'Taste',
          alcoholPercentage: '% of alcohol',
        },
        nutritionalValue: {
          title: 'Nutritional value per 100 g',
          energyValue: 'Energy value',
          proteins: 'Proteins',
          fats: 'Fats',
          carbohydrates: 'Carbohydrates',
        },
        reviewsBlock: {
          title: 'Reviews',
          logInToLeaveRivewLabel: 'Log in to leave review',
          emptyReviewListLabel: 'There are no reviews here yet',
        },
        descriptionLabel: 'Description',
        quantityLabel: 'Quantity',
        deliveryBlock: {
          title: 'Delivery',
          shop: 'Shop',
          fastestDeliveryTime: 'Fastest delivery time',
          shippingCost: 'Shipping cost',
        },
      },
      newsPage: {
        errorSearchResultTitle: 'An error occurred while searching for news',
      },
    },
  })

  payload.logger.info('> Created global typography')
}
