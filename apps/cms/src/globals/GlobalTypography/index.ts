import { GlobalConfig } from 'payload/types'
import { isAdmin } from '../../access/isAdmin'
import { isAnyone } from '../../access/isAnyone'
import { localizedInput } from '../../fields/localizedInput'
import iconPicker from '../../fields/iconPicker'
import { link } from '../../fields/link'
import { ProductFieldToSortSelect } from './ui/ProductFieldToSortSelect'

export const GlobalTypography: GlobalConfig = {
  slug: 'globalTypography',
  label: 'Global Typography',
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  fields: [
    {
      name: 'cart',
      type: 'group',
      fields: [
        {
          label: 'Cart Labels',
          type: 'collapsible',
          fields: [
            {
              name: 'minOrderPrice',
              type: 'group',
              fields: [
                {
                  name: 'uah',
                  label: 'UAH',
                  type: 'number',
                  required: true,
                  min: 0,
                },
              ],
            },
            {
              name: 'minOrderPriceRequiredWarning',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description:
                  'Use the template {{min_price}} to display the min order price for checkout',
              },
            },
            {
              name: 'addToCartSuccess',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'addToCartError',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'goodsAmountLessThanMinError',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'clearBasketLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'createCheckoutError',
              type: 'text',
              localized: true,
            },
            {
              name: 'emptyCartLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'summary',
              type: 'group',
              fields: [
                {
                  label: 'Summary Block',
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'deliveyAmountLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'freeDeliveryLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'goodsAmountLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'discountAmountLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'addPromocodeLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'addCertificateLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'addDiscountButtonLabel',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'totalSumLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'checkoutButtonLabel',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'afterPayment',
              type: 'group',
              fields: [
                {
                  label: 'After Payment Labels',
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'buttons',
                      type: 'group',
                      fields: [
                        {
                          label: 'After Payment Button Labels',
                          type: 'collapsible',
                          fields: [
                            {
                              name: 'downloadInvoiceButton',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'backToHomeLink',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'backToCartLink',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'success',
                      type: 'group',
                      fields: [
                        {
                          label: 'After Payment Success Labels',
                          type: 'collapsible',
                          fields: [
                            {
                              name: 'title',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'description',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'checkoutLoadedError',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'deliveryTime',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'deliveryAddress',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'totalSum',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'canceled',
                      type: 'group',
                      fields: [
                        {
                          label: 'After Payment Canceled Labels',
                          type: 'collapsible',
                          fields: [
                            {
                              name: 'title',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                            {
                              name: 'description',
                              type: 'text',
                              localized: true,
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sendMailLabels',
      type: 'group',
      fields: [
        {
          name: 'success',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'error',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'formErrorLabels',
      type: 'group',
      fields: [
        {
          label: 'Form Error Labels',
          type: 'collapsible',
          fields: [
            {
              name: 'textField',
              type: 'group',
              fields: [
                {
                  name: 'nonEmptyString',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'invalidEmail',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'invalidPhoneNumber',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
            {
              name: 'dateField',
              type: 'group',
              fields: [
                {
                  name: 'invalidTime',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'invalidDate',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'orderDeliveryForm',
      type: 'group',
      fields: [
        {
          label: 'Form Fields',
          type: 'collapsible',
          fields: [
            localizedInput({ name: 'firstName' }),
            localizedInput({ name: 'lastName' }),
            localizedInput({ name: 'phoneNumber' }),
            localizedInput({ name: 'shippingAddress' }),
            localizedInput({ name: 'date' }),
            localizedInput({ name: 'time' }),
          ],
        },
      ],
    },
    {
      name: 'support',
      type: 'group',
      fields: [
        {
          label: 'Support Links',
          type: 'collapsible',
          fields: [
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    {
                      label: 'Email',
                      value: 'email',
                    },
                    {
                      label: 'Phone',
                      value: 'phone',
                    },
                    {
                      label: 'Location',
                      value: 'location',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'info',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '45%',
                      },
                    },
                    {
                      name: 'caption',
                      type: 'text',
                      localized: true,
                      required: true,
                      admin: {
                        width: '45%',
                      },
                    },
                  ],
                },
                {
                  name: 'googleMapsLocation',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'location',
                  },
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
              ],
            },
            link({
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'group',
                  fields: [iconPicker],
                },
              ],
            }),
          ],
        },
      ],
    },
    {
      name: 'account',
      type: 'group',
      fields: [
        {
          label: 'Account Fields',
          type: 'collapsible',
          fields: [
            {
              label: 'Main Menu',
              type: 'collapsible',
              fields: [
                {
                  name: 'mainMenuAccountField',
                  type: 'group',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'description',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    link(),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'productButtons',
      type: 'group',
      fields: [
        {
          label: 'Product Buttons Labels',
          type: 'collapsible',
          fields: [
            {
              name: 'addToCartButton',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'addedToCartButton',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'buyNowButton',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'backButton',
      type: 'group',
      fields: [
        {
          label: 'Back Button Label',
          type: 'collapsible',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              type: 'group',
              fields: [iconPicker],
            },
          ],
        },
      ],
    },
    {
      name: 'contactPage',
      type: 'group',
      fields: [
        {
          label: 'Contact Page Labels',
          type: 'collapsible',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
            },
            localizedInput({ name: 'fullName' }),
            localizedInput({ name: 'email' }),
            localizedInput({ name: 'subject' }),
            localizedInput({ name: 'comment' }),
            {
              name: 'sendButtonLabel',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'searchPage',
      type: 'group',
      fields: [
        {
          label: 'Search Page Titles',
          type: 'collapsible',
          fields: [
            {
              name: 'searchResultTitle',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description:
                  'If you need to insert the search string, you can use this template: "...{{query}}...".',
              },
            },
            {
              name: 'emptySearchResultTitle',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description:
                  'If you need to insert the search string, you can use this template: "...{{query}}...".',
              },
            },
            {
              name: 'errorSearchResultTitle',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'productsCountTitle',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description:
                  'If you need to insert the products count, you can use this template: "...{{count}}...".',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'categoryPage',
      type: 'group',
      fields: [
        {
          label: 'Category Page Labels',
          type: 'collapsible',
          fields: [
            {
              name: 'allSubcategoriesFilterLabel',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'errorMessage',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'notFoundProductsMessage',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'backToHomePageLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'filterProducts',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'applyFilterButtonLabel',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'filterLabels',
                  type: 'group',
                  fields: [
                    {
                      name: 'promotionalOffers',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'trademarks',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'countries',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'specials',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'price',
                      type: 'group',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          localized: true,
                          required: true,
                        },
                        {
                          name: 'minPrice',
                          type: 'text',
                          localized: true,
                          required: true,
                        },
                        {
                          name: 'maxPrice',
                          type: 'text',
                          localized: true,
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'filterParamsChangingMessages',
                  type: 'group',
                  fields: [
                    {
                      name: 'success',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'pending',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'sortProducts',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'applySortButtonLabel',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'sortOptions',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'productFieldToSort',
                      type: 'text',
                      admin: {
                        components: {
                          Field: ProductFieldToSortSelect,
                        },
                      },
                    },
                    {
                      name: 'sortOrder',
                      type: 'select',
                      options: [
                        {
                          label: 'Ascending',
                          value: 'asc',
                        },
                        {
                          label: 'Descending',
                          value: 'desc',
                        },
                      ],
                      defaultValue: 'asc',
                    },
                  ],
                },
                {
                  name: 'sortParamsChangingMessages',
                  type: 'group',
                  fields: [
                    {
                      name: 'success',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'pending',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'productPage',
      type: 'group',
      fields: [
        {
          name: 'generalInfo',
          type: 'group',
          fields: [
            {
              label: 'General Info Labels',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'country',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'trademark',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'weight',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'numberOfUnits',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'taste',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'alcoholPercentage',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          name: 'nutritionalValue',
          type: 'group',
          fields: [
            {
              label: 'Nutritional Value Labels',
              type: 'collapsible',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'energyValue',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'proteins',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'fats',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'carbohydrates',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          name: 'deliveryBlock',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'shop',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'fastestDeliveryTime',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'shippingCost',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'reviewsBlock',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'logInToLeaveRivewLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'emptyReviewListLabel',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'quantityLabel',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'descriptionLabel',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'newsPage',
      type: 'group',
      fields: [
        {
          name: 'errorSearchResultTitle',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
