'use client'

import { FC, useEffect } from 'react'
import { AnyBlock } from '@/cms/blocks'
import { useLastBlockOnPage } from '@/store/lastBlockOnPageStore'

type Props = {
  layout?: AnyBlock[] | null
}

export const SetupLastBlockOnPageStore: FC<Props> = ({ layout }) => {
  const { updateBlock } = useLastBlockOnPage()

  useEffect(() => {
    const lastBlock = !layout?.length ? null : (layout.at(-1)?.blockType as AnyBlock['blockType'])

    updateBlock(lastBlock)
  }, [layout])

  return null
}
