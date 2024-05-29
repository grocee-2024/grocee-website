/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CartItems".
 */
export type CartItems =
  | {
      product?: (string | null) | Product
      quantity?: number | null
      id?: string | null
    }[]
  | null

export interface Config {
  collections: {
    users: User
    products: Product
    categories: Category
    subcategories: Subcategory
    images: Image
    orders: Order
    pages: Page
    units: Unit
    productPages: ProductPage
    newsPages: NewsPage
    news: News
    countries: Country
    trademarks: Trademark
    tags: Tag
    specials: Special
    currencies: Currency
    tastes: Taste
    feedbacks: Feedback
    shippingRates: ShippingRate
    redirects: Redirect
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    mainNavigation: MainNavigation
    bottomNavigation: BottomNavigation
    globalTypography: GlobalTypography
    allBlocks: AllBlock
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  name: string
  lastName?: string | null
  roles?: ('admin' | 'customer')[] | null
  stripeCustomerID?: string | null
  cart?: {
    items?: CartItems
  }
  skipSync?: boolean | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string
  name: string
  description: string
  productDetails: {
    image: string | Image
    stripeProductID?: string | null
    tag?: (string | null) | Tag
    trademark?: (string | null) | Trademark
    specials?: (string | Special)[] | null
    country?: (string | null) | Country
    taste?: (string | null) | Taste
    alcoholPercentage?: number | null
    weight?: number | null
    weightStep?: number | null
    priceJSON?:
      | {
          [k: string]: unknown
        }
      | unknown[]
      | string
      | number
      | boolean
      | null
    price?: number | null
    unit?: (string | null) | Unit
    rating?: number | null
  }
  nutritionalValue: {
    energyValue: number
    proteins?: number | null
    fats?: number | null
    carbohydrates?: number | null
  }
  category: string | Category
  subcategory?: (string | null) | Subcategory
  skipSync?: boolean | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "images".
 */
export interface Image {
  id: string
  alt: string
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    png_128px?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    png_1024px?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    png_2048px?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string
  slug: string
  label: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "trademarks".
 */
export interface Trademark {
  id: string
  slug: string
  label: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "specials".
 */
export interface Special {
  id: string
  slug: string
  label: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "countries".
 */
export interface Country {
  id: string
  slug: string
  label: string
  flag?: {
    png?: string | null
    svg?: string | null
    alt?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tastes".
 */
export interface Taste {
  id: string
  slug: string
  label: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "units".
 */
export interface Unit {
  id: string
  label: string
  text: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string
  slug: string
  label: string
  subcategories: (string | Subcategory)[]
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Image | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subcategories".
 */
export interface Subcategory {
  id: string
  slug: string
  label: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string
  orderedBy?: (string | null) | User
  stripePaymentIntentID?: string | null
  total: number
  items?:
    | {
        product: string | Product
        price?: number | null
        quantity?: number | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string
  slug: string
  breadcrumbsTitle?: string | null
  title?: string | null
  subtitle?: string | null
  layoutHasWidthLimit?: boolean | null
  layout?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
        | ImageWithTextBlock
      )[]
    | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Image | null
  }
  parent?: (string | null) | Page
  breadcrumbs?:
    | {
        doc?: (string | null) | Page
        url?: string | null
        label?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MainSliderBlock".
 */
export interface MainSliderBlock {
  settings?: {
    speed?: number | null
    effect?: ('slide' | 'fade') | null
    loop?: boolean | null
    autoplay?: boolean | null
  }
  slides?:
    | {
        image: string | Image
        heading?: {
          showHeading?: boolean | null
          title?: string | null
          description?: string | null
          link?: {
            label: string
            type?: ('link' | 'button') | null
            appearance?: ('defaultLink' | 'primary' | 'secondary' | 'tertiary' | 'danger') | null
            isStandartButton?: boolean | null
            linkType?: ('reference' | 'custom') | null
            reference?:
              | ({
                  relationTo: 'pages'
                  value: string | Page
                } | null)
              | ({
                  relationTo: 'categories'
                  value: string | Category
                } | null)
              | ({
                  relationTo: 'news'
                  value: string | News
                } | null)
              | ({
                  relationTo: 'productPages'
                  value: string | ProductPage
                } | null)
              | ({
                  relationTo: 'newsPages'
                  value: string | NewsPage
                } | null)
            url?: string | null
            newTab?: boolean | null
            icons?: {
              leftIcon: {
                icon?: string | null
                size: {
                  width: number
                  height: number
                }
              }
              rightIcon: {
                icon?: string | null
                size: {
                  width: number
                  height: number
                }
              }
            }
          }
        }
        id?: string | null
      }[]
    | null
  id?: string | null
  blockName?: string | null
  blockType: 'MainSlider'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
  id: string
  title: string
  titleColor: 'black' | 'white'
  link: {
    label: string
    type?: ('reference' | 'custom') | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'categories'
          value: string | Category
        } | null)
      | ({
          relationTo: 'news'
          value: string | News
        } | null)
      | ({
          relationTo: 'productPages'
          value: string | ProductPage
        } | null)
      | ({
          relationTo: 'newsPages'
          value: string | NewsPage
        } | null)
    url?: string | null
  }
  previewImage: string | Image
  tag?: (string | null) | Tag
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "productPages".
 */
export interface ProductPage {
  id: string
  slug: string
  product?: (string | null) | Product
  productIntro?: {
    images?:
      | {
          image: string | Image
          id?: string | null
        }[]
      | null
  }
  layout?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
        | ImageWithTextBlock
      )[]
    | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Image | null
  }
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CarouselBlock".
 */
export interface CarouselBlock {
  title?: string | null
  settings: {
    type: 'productCard' | 'newsCard' | 'simpleCard'
    speed?: number | null
    loop?: boolean | null
    showLink?: boolean | null
    linkText?: string | null
    link?: {
      type?: ('reference' | 'custom') | null
      reference?:
        | ({
            relationTo: 'pages'
            value: string | Page
          } | null)
        | ({
            relationTo: 'categories'
            value: string | Category
          } | null)
        | ({
            relationTo: 'news'
            value: string | News
          } | null)
        | ({
            relationTo: 'productPages'
            value: string | ProductPage
          } | null)
        | ({
            relationTo: 'newsPages'
            value: string | NewsPage
          } | null)
      url?: string | null
    }
    icon?: {
      icon?: string | null
      size: {
        width: number
        height: number
      }
    }
  }
  products?: ProductCardBlock[] | null
  cards?: CardBlock[] | null
  newsCards?: NewsCardBlock[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'Carousel'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsPages".
 */
export interface NewsPage {
  id: string
  slug: string
  news?: (string | null) | News
  content?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  layout?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
        | ImageWithTextBlock
      )[]
    | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Image | null
  }
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BannerBlock".
 */
export interface BannerBlock {
  previewImage: string | Image
  heading: {
    type: 'info' | 'orderDelivery'
    title: string
    logo: {
      image: string | Image
      page?: {
        type?: ('reference' | 'custom') | null
        reference?:
          | ({
              relationTo: 'pages'
              value: string | Page
            } | null)
          | ({
              relationTo: 'categories'
              value: string | Category
            } | null)
          | ({
              relationTo: 'news'
              value: string | News
            } | null)
          | ({
              relationTo: 'productPages'
              value: string | ProductPage
            } | null)
          | ({
              relationTo: 'newsPages'
              value: string | NewsPage
            } | null)
        url?: string | null
      }
    }
    info?: {
      listMarker: {
        icon?: string | null
        size: {
          width: number
          height: number
        }
      }
      list: {
        listItem: string
        id?: string | null
      }[]
    }
    orderDelivery?: {
      subtitle: string
    }
    links: {
      linkOrButton: {
        label: string
        type?: ('link' | 'button') | null
        appearance?: ('defaultLink' | 'primary' | 'secondary' | 'tertiary' | 'danger') | null
        isStandartButton?: boolean | null
        linkType?: ('reference' | 'custom') | null
        reference?:
          | ({
              relationTo: 'pages'
              value: string | Page
            } | null)
          | ({
              relationTo: 'categories'
              value: string | Category
            } | null)
          | ({
              relationTo: 'news'
              value: string | News
            } | null)
          | ({
              relationTo: 'productPages'
              value: string | ProductPage
            } | null)
          | ({
              relationTo: 'newsPages'
              value: string | NewsPage
            } | null)
        url?: string | null
        newTab?: boolean | null
        icons?: {
          leftIcon: {
            icon?: string | null
            size: {
              width: number
              height: number
            }
          }
          rightIcon: {
            icon?: string | null
            size: {
              width: number
              height: number
            }
          }
        }
      }
      id?: string | null
    }[]
  }
  id?: string | null
  blockName?: string | null
  blockType: 'Banner'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CooperationBlock".
 */
export interface CooperationBlock {
  title?: string | null
  logos?:
    | {
        logo: string | Image
        id?: string | null
      }[]
    | null
  id?: string | null
  blockName?: string | null
  blockType: 'Cooperation'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AccordionBlock".
 */
export interface AccordionBlock {
  accordionList?:
    | {
        title: string
        content: string
        id?: string | null
      }[]
    | null
  withoutLink?: boolean | null
  link?: {
    label: string
    icon: {
      icon?: string | null
      size: {
        width: number
        height: number
      }
    }
    type?: ('reference' | 'custom') | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'categories'
          value: string | Category
        } | null)
      | ({
          relationTo: 'news'
          value: string | News
        } | null)
      | ({
          relationTo: 'productPages'
          value: string | ProductPage
        } | null)
      | ({
          relationTo: 'newsPages'
          value: string | NewsPage
        } | null)
    url?: string | null
  }
  id?: string | null
  blockName?: string | null
  blockType: 'Accordion'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HelpBlock".
 */
export interface HelpBlock {
  title?: string | null
  support?: string | null
  accordion: AccordionBlock[]
  id?: string | null
  blockName?: string | null
  blockType: 'HelpBlock'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock".
 */
export interface RichTextBlock {
  content?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  id?: string | null
  blockName?: string | null
  blockType: 'RichText'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageWithTextBlock".
 */
export interface ImageWithTextBlock {
  image: string | Image
  content: {
    text: string
    id?: string | null
  }[]
  imagePosition: 'left' | 'right'
  id?: string | null
  blockName?: string | null
  blockType: 'ImageWithText'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ProductCardBlock".
 */
export interface ProductCardBlock {
  page: {
    relationTo: 'productPages'
    value: string | ProductPage
  }
  id?: string | null
  blockName?: string | null
  blockType: 'ProductCard'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CardBlock".
 */
export interface CardBlock {
  text: string
  image: string | Image
  gap?: ('small' | 'big') | null
  link?: {
    type?: ('reference' | 'custom') | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'categories'
          value: string | Category
        } | null)
      | ({
          relationTo: 'news'
          value: string | News
        } | null)
      | ({
          relationTo: 'productPages'
          value: string | ProductPage
        } | null)
      | ({
          relationTo: 'newsPages'
          value: string | NewsPage
        } | null)
    url?: string | null
  }
  id?: string | null
  blockName?: string | null
  blockType: 'Card'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "NewsCardBlock".
 */
export interface NewsCardBlock {
  newsArticle: {
    relationTo: 'news'
    value: string | News
  }
  id?: string | null
  blockName?: string | null
  blockType: 'NewsCard'
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "currencies".
 */
export interface Currency {
  id: string
  label: string
  text: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feedbacks".
 */
export interface Feedback {
  id: string
  rating: number
  review?: string | null
  product: string | Product
  user: string | User
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shippingRates".
 */
export interface ShippingRate {
  id: string
  shippingRateID: string
  deactivated?: boolean | null
  label?: string | null
  minOrderPrice: number
  amount?: number | null
  currency?: (string | null) | Currency
  title?: string | null
  shippingRateJSON?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  skipSync?: boolean | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string
  from: string
  to?: {
    type?: ('reference' | 'custom') | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'productPages'
          value: string | ProductPage
        } | null)
      | ({
          relationTo: 'categories'
          value: string | Category
        } | null)
      | ({
          relationTo: 'newsPages'
          value: string | NewsPage
        } | null)
    url?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainNavigation".
 */
export interface MainNavigation {
  id: string
  header: {
    logo: {
      image: string | Image
      page?: {
        type?: ('reference' | 'custom') | null
        reference?:
          | ({
              relationTo: 'pages'
              value: string | Page
            } | null)
          | ({
              relationTo: 'categories'
              value: string | Category
            } | null)
          | ({
              relationTo: 'news'
              value: string | News
            } | null)
          | ({
              relationTo: 'productPages'
              value: string | ProductPage
            } | null)
          | ({
              relationTo: 'newsPages'
              value: string | NewsPage
            } | null)
        url?: string | null
      }
    }
    search: {
      placeholder: string
      searchButtonLabel: string
      clearSearchButtonLabel: string
      emptySearchHistoryLabel: string
    }
    navLinks: {
      delivery: {
        defaultIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        activeIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        link?: {
          type?: ('reference' | 'custom') | null
          reference?:
            | ({
                relationTo: 'pages'
                value: string | Page
              } | null)
            | ({
                relationTo: 'categories'
                value: string | Category
              } | null)
            | ({
                relationTo: 'news'
                value: string | News
              } | null)
            | ({
                relationTo: 'productPages'
                value: string | ProductPage
              } | null)
            | ({
                relationTo: 'newsPages'
                value: string | NewsPage
              } | null)
          url?: string | null
        }
      }
      cart: {
        defaultIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        activeIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        link?: {
          type?: ('reference' | 'custom') | null
          reference?:
            | ({
                relationTo: 'pages'
                value: string | Page
              } | null)
            | ({
                relationTo: 'categories'
                value: string | Category
              } | null)
            | ({
                relationTo: 'news'
                value: string | News
              } | null)
            | ({
                relationTo: 'productPages'
                value: string | ProductPage
              } | null)
            | ({
                relationTo: 'newsPages'
                value: string | NewsPage
              } | null)
          url?: string | null
        }
      }
      profile: {
        defaultIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        activeIcon: {
          icon?: string | null
          size: {
            width: number
            height: number
          }
        }
        link?: {
          type?: ('reference' | 'custom') | null
          reference?:
            | ({
                relationTo: 'pages'
                value: string | Page
              } | null)
            | ({
                relationTo: 'categories'
                value: string | Category
              } | null)
            | ({
                relationTo: 'news'
                value: string | News
              } | null)
            | ({
                relationTo: 'productPages'
                value: string | ProductPage
              } | null)
            | ({
                relationTo: 'newsPages'
                value: string | NewsPage
              } | null)
          url?: string | null
        }
      }
    }
  }
  defaultMenuHeader: string
  navigation: {
    categories: {
      title: string
      icon: {
        icon?: string | null
        size: {
          width: number
          height: number
        }
      }
      cardLinks: CardBlock[]
      commonLinks?:
        | {
            label: string
            link?: {
              type?: ('reference' | 'custom') | null
              reference?:
                | ({
                    relationTo: 'pages'
                    value: string | Page
                  } | null)
                | ({
                    relationTo: 'categories'
                    value: string | Category
                  } | null)
                | ({
                    relationTo: 'news'
                    value: string | News
                  } | null)
                | ({
                    relationTo: 'productPages'
                    value: string | ProductPage
                  } | null)
                | ({
                    relationTo: 'newsPages'
                    value: string | NewsPage
                  } | null)
              url?: string | null
            }
            id?: string | null
          }[]
        | null
    }
    promotions: {
      title: string
      icon: {
        icon?: string | null
        size: {
          width: number
          height: number
        }
      }
      cardLinks: CardBlock[]
    }
    integration: {
      title: string
      icon: {
        icon?: string | null
        size: {
          width: number
          height: number
        }
      }
      logos?:
        | {
            logo: string | Image
            id?: string | null
          }[]
        | null
    }
  }
  helpNavigation: {
    label: string
    link?: {
      type?: ('reference' | 'custom') | null
      reference?:
        | ({
            relationTo: 'pages'
            value: string | Page
          } | null)
        | ({
            relationTo: 'categories'
            value: string | Category
          } | null)
        | ({
            relationTo: 'news'
            value: string | News
          } | null)
        | ({
            relationTo: 'productPages'
            value: string | ProductPage
          } | null)
        | ({
            relationTo: 'newsPages'
            value: string | NewsPage
          } | null)
      url?: string | null
    }
    id?: string | null
  }[]
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "bottomNavigation".
 */
export interface BottomNavigation {
  id: string
  logo: {
    image: string | Image
    page?: {
      type?: ('reference' | 'custom') | null
      reference?:
        | ({
            relationTo: 'pages'
            value: string | Page
          } | null)
        | ({
            relationTo: 'categories'
            value: string | Category
          } | null)
        | ({
            relationTo: 'news'
            value: string | News
          } | null)
        | ({
            relationTo: 'productPages'
            value: string | ProductPage
          } | null)
        | ({
            relationTo: 'newsPages'
            value: string | NewsPage
          } | null)
      url?: string | null
    }
    caption: string
  }
  navGroups?:
    | {
        title: string
        links?:
          | {
              page: {
                label: string
                type?: ('reference' | 'custom') | null
                reference?:
                  | ({
                      relationTo: 'pages'
                      value: string | Page
                    } | null)
                  | ({
                      relationTo: 'categories'
                      value: string | Category
                    } | null)
                  | ({
                      relationTo: 'news'
                      value: string | News
                    } | null)
                  | ({
                      relationTo: 'productPages'
                      value: string | ProductPage
                    } | null)
                  | ({
                      relationTo: 'newsPages'
                      value: string | NewsPage
                    } | null)
                url?: string | null
              }
              id?: string | null
            }[]
          | null
        id?: string | null
      }[]
    | null
  subscribeSection: {
    title: string
    textField: {
      placeholder: string
      subscribeButtonLabel: string
    }
  }
  footerInfo: {
    rightsText: string
    designedBy?: string | null
  }
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "globalTypography".
 */
export interface GlobalTypography {
  id: string
  cart: {
    minOrderPrice: {
      uah: number
    }
    minOrderPriceRequiredWarning: string
    addToCartSuccess: string
    addToCartError: string
    goodsAmountLessThanMinError: string
    clearBasketLabel: string
    createCheckoutError?: string | null
    emptyCartLabel: string
    summary: {
      title: string
      deliveyAmountLabel: string
      freeDeliveryLabel: string
      goodsAmountLabel: string
      discountAmountLabel: string
      addPromocodeLabel: string
      addCertificateLabel: string
      addDiscountButtonLabel: string
      totalSumLabel: string
      checkoutButtonLabel: string
    }
    afterPayment: {
      buttons: {
        downloadInvoiceButton: string
        backToHomeLink: string
        backToCartLink: string
      }
      success: {
        title: string
        description: string
        checkoutLoadedError: string
        deliveryTime: string
        deliveryAddress: string
        totalSum: string
      }
      canceled: {
        title: string
        description: string
      }
    }
  }
  sendMailLabels: {
    success: string
    error: string
  }
  formErrorLabels: {
    textField: {
      nonEmptyString: string
      invalidEmail: string
      invalidPhoneNumber: string
    }
    dateField: {
      invalidTime: string
      invalidDate: string
    }
  }
  orderDeliveryForm: {
    firstName: {
      label: string
      placeholder: string
    }
    lastName: {
      label: string
      placeholder: string
    }
    phoneNumber: {
      label: string
      placeholder: string
    }
    shippingAddress: {
      label: string
      placeholder: string
    }
    date: {
      label: string
      placeholder: string
    }
    time: {
      label: string
      placeholder: string
    }
  }
  support: {
    links?:
      | {
          type?: ('email' | 'phone' | 'location') | null
          info: string
          caption: string
          googleMapsLocation?: string | null
          icon: {
            icon?: string | null
            size: {
              width: number
              height: number
            }
          }
          id?: string | null
        }[]
      | null
    link: {
      label: string
      icon: {
        icon?: string | null
        size: {
          width: number
          height: number
        }
      }
      type?: ('reference' | 'custom') | null
      reference?:
        | ({
            relationTo: 'pages'
            value: string | Page
          } | null)
        | ({
            relationTo: 'categories'
            value: string | Category
          } | null)
        | ({
            relationTo: 'news'
            value: string | News
          } | null)
        | ({
            relationTo: 'productPages'
            value: string | ProductPage
          } | null)
        | ({
            relationTo: 'newsPages'
            value: string | NewsPage
          } | null)
      url?: string | null
    }
  }
  account: {
    mainMenuAccountField: {
      title: string
      description: string
      link?: {
        type?: ('reference' | 'custom') | null
        reference?:
          | ({
              relationTo: 'pages'
              value: string | Page
            } | null)
          | ({
              relationTo: 'categories'
              value: string | Category
            } | null)
          | ({
              relationTo: 'news'
              value: string | News
            } | null)
          | ({
              relationTo: 'productPages'
              value: string | ProductPage
            } | null)
          | ({
              relationTo: 'newsPages'
              value: string | NewsPage
            } | null)
        url?: string | null
      }
    }
  }
  productButtons: {
    addToCartButton: string
    addedToCartButton: string
    buyNowButton: string
  }
  backButton: {
    label: string
    icon: {
      icon?: string | null
      size: {
        width: number
        height: number
      }
    }
  }
  contactPage: {
    subtitle?: string | null
    fullName: {
      label: string
      placeholder: string
    }
    email: {
      label: string
      placeholder: string
    }
    subject: {
      label: string
      placeholder: string
    }
    comment: {
      label: string
      placeholder: string
    }
    sendButtonLabel: string
  }
  searchPage: {
    searchResultTitle: string
    emptySearchResultTitle: string
    errorSearchResultTitle: string
    productsCountTitle: string
  }
  categoryPage: {
    allSubcategoriesFilterLabel: string
    errorMessage: string
    notFoundProductsMessage: string
    backToHomePageLabel: string
    filterProducts: {
      label: string
      applyFilterButtonLabel: string
      filterLabels: {
        promotionalOffers: string
        trademarks: string
        countries: string
        specials: string
        price: {
          label: string
          minPrice: string
          maxPrice: string
        }
      }
      filterParamsChangingMessages: {
        success: string
        pending: string
      }
    }
    sortProducts: {
      label: string
      applySortButtonLabel: string
      sortOptions?:
        | {
            label: string
            productFieldToSort?: string | null
            sortOrder?: ('asc' | 'desc') | null
            id?: string | null
          }[]
        | null
      sortParamsChangingMessages: {
        success: string
        pending: string
      }
    }
  }
  productPage: {
    generalInfo: {
      title: string
      country: string
      trademark: string
      weight: string
      numberOfUnits: string
      taste: string
      alcoholPercentage: string
    }
    nutritionalValue: {
      title: string
      energyValue: string
      proteins: string
      fats: string
      carbohydrates: string
    }
    deliveryBlock: {
      title: string
      shop: string
      fastestDeliveryTime: string
      shippingCost: string
    }
    reviewsBlock: {
      title: string
      logInToLeaveRivewLabel: string
      emptyReviewListLabel: string
    }
    quantityLabel: string
    descriptionLabel: string
  }
  newsPage: {
    errorSearchResultTitle: string
  }
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "allBlocks".
 */
export interface AllBlock {
  id: string
  blocks?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
        | ImageWithTextBlock
      )[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}
