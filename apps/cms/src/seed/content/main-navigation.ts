import payload from 'payload'
import { Images } from './images'
import { Pages } from './pages'
import { Categories } from './categories'

export const createMainNavigation = async (
  pages: Pages,
  images: Images,
  categories: Categories,
) => {
  await payload.updateGlobal({
    slug: 'mainNavigation',
    data: {
      header: {
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
          clearSearchButtonLabel: 'Clear',
          emptySearchHistoryLabel: "You haven't looked for anything yet",
        },
        navLinks: {
          delivery: {
            defaultIcon: {
              icon: 'Shipping',
              size: {
                width: 20,
                height: 14,
              },
            },
            activeIcon: {
              icon: 'ShippingFilled',
              size: {
                width: 20,
                height: 14,
              },
            },
            link: {
              type: 'custom',
              url: '/delivery',
            },
          },
          cart: {
            defaultIcon: {
              icon: 'ShoppingBasket',
              size: {
                width: 16,
                height: 18,
              },
            },
            activeIcon: {
              icon: 'ShoppingBasketFilled',
              size: {
                width: 16,
                height: 18,
              },
            },
            link: {
              type: 'custom',
              url: '/cart',
            },
          },
          profile: {
            defaultIcon: {
              icon: 'AccountCircle',
              size: {
                width: 18,
                height: 18,
              },
            },
            activeIcon: {
              icon: 'ProfileFilled',
              size: {
                width: 18,
                height: 18,
              },
            },
            link: {
              type: 'custom',
              url: '/profile',
            },
          },
        },
      },
      defaultMenuHeader: 'Main menu',
      navigation: {
        categories: {
          title: 'Categories',
          icon: {
            icon: 'Category',
            size: {
              width: 18,
              height: 18,
            },
          },
          cardLinks: [
            {
              blockType: 'Card',
              gap: 'small',
              image: images.actionsCategoryId,
              text: 'Actions',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.noveltyCategoryId,
              text: 'Novelty',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.cookedFoodCategoryId,
              text: 'Cooked food',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.hitsCategoryId,
              text: 'Hits',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
          ],
          commonLinks: [
            {
              label: 'Fruits, vegetables, pickles',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'categories',
                  value: categories.fruitsVegetablesPicklesId,
                },
              },
            },
            {
              label: 'Dairy products and eggs',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Drinks',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Hygiene and beauty',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Meat products',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Grocery',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Coffee, tea',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'For home',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Fish',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Canned foods, sauces',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Alcohol',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'For garden',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Cheeses',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Sweets',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Frozen products',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: "Children's goods",
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Bread and bakery products',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'Snacks',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: '18+',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              label: 'For animals',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
          ],
        },
        promotions: {
          title: 'Promotions and offers',
          icon: {
            icon: 'WaterDrop',
            size: {
              width: 18,
              height: 18,
            },
          },
          cardLinks: [
            {
              blockType: 'Card',
              gap: 'small',
              image: images.tempImageId,
              text: 'Promotion "Your four-legged friend"',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.tempImageId,
              text: 'Promotion "Farm vegetables"',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.tempImageId,
              text: 'Weekly best price',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
            {
              blockType: 'Card',
              gap: 'small',
              image: images.tempImageId,
              text: 'Other promotional offers',
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: pages.homePageId,
                },
              },
            },
          ],
        },
        integration: {
          title: 'Integration',
          icon: {
            icon: 'Planet',
            size: {
              width: 18,
              height: 18,
            },
          },
          logos: [
            {
              logo: images.cookAndEatLogoId,
            },
            {
              logo: images.logoIpsumLogo1Id,
            },
            {
              logo: images.logoIpsumLogo2Id,
            },
            {
              logo: images.logoIpsumLogo3Id,
            },
            {
              logo: images.logoIpsumLogo4Id,
            },
            {
              logo: images.logoIpsumLogo1Id,
            },
            {
              logo: images.logoIpsumLogo2Id,
            },
            {
              logo: images.logoIpsumLogo3Id,
            },
            {
              logo: images.logoIpsumLogo4Id,
            },
          ],
        },
      },
      helpNavigation: [
        {
          label: 'News',
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: pages.homePageId,
            },
          },
        },
        {
          label: 'Contact us',
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: pages.homePageId,
            },
          },
        },
        {
          label: 'FAQ',
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: pages.homePageId,
            },
          },
        },
        {
          label: 'Privacy policy',
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: pages.homePageId,
            },
          },
        },
      ],
    },
  })

  payload.logger.info('> Created main navigation')
}
