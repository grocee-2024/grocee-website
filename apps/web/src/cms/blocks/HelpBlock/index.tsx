import { HelpBlock as HelpBlockType } from 'cms-types'
import { Accordion } from '../Accordion'
import { useGlobalTypography } from '@/store/globalTypographyStore'
import { HelpBlockClient } from './HelpBlockClient'

export function HelpBlock({ accordion, title }: HelpBlockType) {
  const [accordionBlock] = accordion

  return <HelpBlockClient title={title ?? ''} accordionBlock={<Accordion {...accordionBlock} />} />
}
