'use client'

import { ComponentProps, FC } from 'react'
import { AccordionList } from 'ui'

type Props = ComponentProps<typeof AccordionList>

export const AccordionClient: FC<Props> = ({ panels, className, link }) => {
  return <AccordionList panels={panels} link={link} className={className} />
}
