import { create } from 'zustand'
import { AnyBlock } from '../cms/blocks'

type Store = {
  lastBlockOnPage: AnyBlock['blockType'] | null
  updateBlock: (block: AnyBlock['blockType'] | null) => void
}

export const useLastBlockOnPage = create<Store>(set => ({
  lastBlockOnPage: null,
  updateBlock: block => {
    set({
      lastBlockOnPage: block,
    })
  },
}))
