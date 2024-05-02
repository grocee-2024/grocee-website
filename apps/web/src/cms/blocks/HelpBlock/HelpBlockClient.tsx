'use client'

import { parsePayloadLink } from '@/helpers'
import { useGlobalTypography } from '@/store/globalTypographyStore'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { FC, ComponentProps } from 'react'
import { HelpBlock as HelpBlockUI } from 'ui'

type Props = Pick<ComponentProps<typeof HelpBlockUI>, 'title' | 'accordionBlock'>

export const HelpBlockClient: FC<Props> = props => {
  const { support } = useGlobalTypography()

  const mappedSupportLinks = (support?.links ?? []).map(
    ({ type, caption, info, googleMapsLocation, id, icon }) => {
      const href =
        type === 'email' ? `mailto:${info}` : type === 'phone' ? `tel:${info}` : googleMapsLocation

      return {
        id: id!,
        caption: caption!,
        href: href ?? '',
        info: info ?? '',
        icon: {
          icon: icon.icon as AllIconNames,
          size: icon.size,
        },
      }
    },
  )

  const mappedSupportLink = {
    label: support.link.label ?? '',
    href: parsePayloadLink(support.link),
    icon: {
      icon: support.link.icon.icon as AllIconNames,
      size: support.link.icon.size,
    },
  }

  return <HelpBlockUI {...props} supportLinks={mappedSupportLinks} link={mappedSupportLink} />
}
