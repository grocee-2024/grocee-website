import { parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { HelpBlock } from 'cms-types'
import { HelpBlockClient } from './HelpBlockClient'
import { Accordion } from '../Accordion'

export function HelpBlock({ accordion, title, support, link }: HelpBlock) {
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

  const mappedLink = {
    label: link.label ?? '',
    href: parsePayloadLink(link),
    icon: {
      icon: link.icon.icon as AllIconNames,
      size: link.icon.size,
    },
  }

  const [accordionBlock] = accordion

  return (
    <HelpBlockClient
      title={title ?? ''}
      supportLinks={mappedSupportLinks}
      link={mappedLink}
      accordionBlock={<Accordion {...accordionBlock} />}
    />
  )
}
