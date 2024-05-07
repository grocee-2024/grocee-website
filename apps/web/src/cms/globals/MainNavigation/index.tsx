import { MainNavigation } from 'cms-types'
import { resolveRelation } from '../../helpers'
import { mapCMSCards, parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { MainNavigationClient } from './MainNavigationClient'

export default async function MainNavigation({
  header,
  navigation,
  helpNavigation,
  backButton,
  defaultMenuHeader,
}: MainNavigation) {
  const { logo, navLinks, search } = header

  const resolvedLogo = resolveRelation(logo.image)
  const logoUrl = parsePayloadLink(logo.page)

  const { categories, delivery, integration, promotions } = navigation

  const mappedNavigation = {
    categories: {
      ...categories,
      icon: {
        ...categories.icon,
        icon: categories.icon.icon as AllIconNames,
      },
      cardLinks: await mapCMSCards(categories.cardLinks),
      commonLinks: (categories.commonLinks ?? []).map(({ label, id, link }) => ({
        id: id!,
        label,
        link: parsePayloadLink(link),
      })),
    },
    promotions: {
      ...promotions,
      icon: {
        ...promotions.icon,
        icon: promotions.icon.icon as AllIconNames,
      },
      cardLinks: await mapCMSCards(promotions.cardLinks),
    },
    integration: {
      ...integration,
      icon: {
        ...integration.icon,
        icon: integration.icon.icon as AllIconNames,
      },
      logos: (integration.logos ?? []).map(({ id, logo }) => ({
        id: id!,
        logo: resolveRelation(logo),
      })),
    },
  }

  const mappedNavLinks = Object.entries(navLinks).reduce(
    (acc, [key, value]) => {
      const navLink = key as keyof typeof navLinks
      const { activeIcon, defaultIcon, link } = value

      const parsedLink = parsePayloadLink(link)

      acc[navLink] = {
        link: parsedLink,
        activeIcon: {
          ...activeIcon,
          icon: activeIcon.icon as AllIconNames,
        },
        defaultIcon: {
          ...defaultIcon,
          icon: defaultIcon.icon as AllIconNames,
        },
      }

      return acc
    },
    {} as Record<
      keyof typeof navLinks,
      {
        link: string
        defaultIcon: { icon: AllIconNames; size: { width: number; height: number } }
        activeIcon: { icon: AllIconNames; size: { width: number; height: number } }
      }
    >,
  )

  const mappedHelpNavigation = helpNavigation.map(({ label, id, link }) => ({
    id: id!,
    label,
    link: parsePayloadLink(link),
  }))

  const mappedBackButton = {
    ...backButton,
    icon: {
      icon: backButton.icon.icon as AllIconNames,
      size: backButton.icon.size,
    },
  }

  return (
    <MainNavigationClient
      navLinks={mappedNavLinks}
      defaultMenuHeader={defaultMenuHeader}
      search={search}
      navigation={mappedNavigation}
      helpNavigation={mappedHelpNavigation}
      logo={resolvedLogo!}
      logoUrl={logoUrl}
      backButton={mappedBackButton}
    />
  )
}
