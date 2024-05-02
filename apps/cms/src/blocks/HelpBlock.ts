import { Block } from 'payload/types'
import { Accordion } from './Accordion'
import { link } from '../fields/link'
import iconPicker from '../fields/iconPicker'

export const HelpBlock: Block = {
  slug: 'HelpBlock',
  interfaceName: 'HelpBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'support',
      type: 'text',
      hidden: true,
    },
    {
      name: 'accordion',
      type: 'blocks',
      blocks: [Accordion],
      required: true,
      maxRows: 1,
    },
  ],
  imageURL: '/previews/help-section.png',
  imageAltText: 'Help Preview',
}
