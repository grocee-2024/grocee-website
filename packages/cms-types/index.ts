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
    images: Image
    orders: Order
    pages: Page
    productPages: ProductPage
    news: News
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
  name?: string | null
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
    rating?: number | null
  }
  categories?: (string | Category)[] | null
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
 * via the `definition` "categories".
 */
export interface Category {
  id: string
  slug: string
  title?: string | null
  parent?: (string | null) | Category
  breadcrumbs?:
    | {
        doc?: (string | null) | Category
        url?: string | null
        label?: string | null
        id?: string | null
      }[]
    | null
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
  layout?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
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
 * via the `definition` "MainSliderBlock".
 */
export interface MainSliderBlock {
  settings?: {
    speed?: number | null
    effect?: ('slide' | 'fade') | null
    loop?: boolean | null
    autoplay?: boolean | null
    virtual?: boolean | null
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
                  relationTo: 'productPages'
                  value: string | ProductPage
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
 * via the `definition` "productPages".
 */
export interface ProductPage {
  id: string
  slug: string
  product?: (string | null) | Product
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
    loop?: boolean | null
    virtual?: boolean | null
    speed?: number | null
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
            relationTo: 'productPages'
            value: string | ProductPage
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
          relationTo: 'productPages'
          value: string | ProductPage
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
 * via the `definition` "news".
 */
export interface News {
  id: string
  slug: string
  title: string
  titleColor: 'black' | 'white'
  previewImage: string | Image
  content: {
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
  }
  footerLayout?:
    | (
        | MainSliderBlock
        | CarouselBlock
        | BannerBlock
        | CooperationBlock
        | AccordionBlock
        | HelpBlock
        | RichTextBlock
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
              relationTo: 'productPages'
              value: string | ProductPage
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
              relationTo: 'productPages'
              value: string | ProductPage
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
          relationTo: 'productPages'
          value: string | ProductPage
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
          relationTo: 'news'
          value: string | News
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
              relationTo: 'productPages'
              value: string | ProductPage
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
                relationTo: 'productPages'
                value: string | ProductPage
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
                relationTo: 'productPages'
                value: string | ProductPage
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
                relationTo: 'productPages'
                value: string | ProductPage
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
                    relationTo: 'productPages'
                    value: string | ProductPage
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
            relationTo: 'productPages'
            value: string | ProductPage
          } | null)
      url?: string | null
    }
    id?: string | null
  }[]
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
            relationTo: 'productPages'
            value: string | ProductPage
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
                      relationTo: 'productPages'
                      value: string | ProductPage
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
            relationTo: 'productPages'
            value: string | ProductPage
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
              relationTo: 'productPages'
              value: string | ProductPage
            } | null)
        url?: string | null
      }
    }
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
      )[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}
