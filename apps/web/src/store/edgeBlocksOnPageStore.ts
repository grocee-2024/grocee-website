import { create } from 'zustand'
import { AnyBlock } from '../cms/blocks'

type Store = {
  loaded: boolean
  setLoaded: (loaded: boolean) => void
  firstBlockOnPage: AnyBlock['blockType'] | null
  lastBlockOnPage: AnyBlock['blockType'] | null
  updateBlock: (args: {
    firstBlockOnPage?: AnyBlock['blockType'] | null
    lastBlockOnPage?: AnyBlock['blockType'] | null
  }) => void
}

export const useEdgeBlocksOnPage = create<Store>(set => ({
  firstBlockOnPage: null,
  lastBlockOnPage: null,
  loaded: false,
  setLoaded: loaded => {
    set({ loaded })
  },
  updateBlock: ({ firstBlockOnPage, lastBlockOnPage }) => {
    set({
      firstBlockOnPage,
      lastBlockOnPage,
    })
  },
}))
