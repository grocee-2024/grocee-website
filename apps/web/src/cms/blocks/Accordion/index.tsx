import { parsePayloadLink } from '@/helpers'
import { AllIconNames } from '@oleksii-lavka/grocee-icons'
import { AccordionBlock } from 'cms-types'
import { AccordionClient } from './AccordionClient'

export async function Accordion({ accordionList, link }: AccordionBlock) {
  const mappedPanels = (accordionList ?? []).map(({ id, title, content }) => {
    return {
      id: id!,
      title: title ?? '',
      content: content ?? '',
    }
  })

  const mappedLink = {
    label: link.label ?? '',
    href: parsePayloadLink(link),
    icon: {
      icon: link.icon.icon as AllIconNames,
      size: link.icon.size,
    },
  }

  return <AccordionClient panels={mappedPanels} link={mappedLink} />
}
