import type { ArrayField } from 'payload/dist/fields/config/types'
import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import type { LinkAppearances } from './linkOrButton'
import linkOrButton from './linkOrButton'

type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>
  appearances?: LinkAppearances[]
  overrideLinksField?: Omit<ArrayField, 'name' | 'type' | 'fields'>
}) => Field

const linkGroup: LinkGroupType = ({
  overrides = {},
  overrideLinksField = {},
  appearances,
} = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      linkOrButton({
        appearances,
      }),
    ],
    ...overrideLinksField,
  }

  return deepMerge(generatedLinkGroup, overrides)
}

export default linkGroup
