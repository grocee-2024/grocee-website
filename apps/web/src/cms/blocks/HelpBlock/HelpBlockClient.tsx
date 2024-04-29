'use client'

import { FC, ComponentProps } from 'react'
import { HelpBlock } from 'ui'

type Props = ComponentProps<typeof HelpBlock>

export const HelpBlockClient: FC<Props> = props => {
  return <HelpBlock {...props} />
}
