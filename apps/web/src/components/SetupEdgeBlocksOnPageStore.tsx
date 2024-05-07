'use client'

import { FC, useEffect } from 'react'
import { AnyBlock } from '@/cms/blocks'
import { useEdgeBlocksOnPage } from '@/store'

type Props = {
  layout?: AnyBlock[] | null
}

export const SetupEdgeBlocksOnPageStore: FC<Props> = ({ layout }) => {
  const { updateBlock, setLoaded } = useEdgeBlocksOnPage()

  useEffect(() => {
    const firstBlockOnPage = !layout?.length ? null : layout[0].blockType
    const lastBlockOnPage = !layout?.length ? null : layout.at(-1)?.blockType

    updateBlock({ firstBlockOnPage, lastBlockOnPage })
    setLoaded(true)
  }, [layout])

  return null
}
