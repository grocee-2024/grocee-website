import { MainNavigation } from 'cms-types'
import { resolveRelation } from '../../helpers'
import { mapCMSCards, parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { MainNavigationClient } from './MainNavigationClient'

export default async function MainNavigation({
  logo,
  navigation,
  helpNavigation,
  backButton,
  ...props
}: MainNavigation) {
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
    delivery: {
      ...delivery,
      icon: {
        ...delivery.icon,
        icon: delivery.icon.icon as AllIconNames,
      },
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
      {...props}
      navigation={mappedNavigation}
      helpNavigation={mappedHelpNavigation}
      logo={resolvedLogo!}
      logoUrl={logoUrl}
      backButton={mappedBackButton}
    />
  )
}
