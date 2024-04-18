import { Config, Image, Page } from 'cms-types'
import { createElement } from 'react'

import { AnyBlock, blocks } from './blocks'

export const pageToUrl = (
  page?:
    | string
    | Omit<Page, 'layout'>
    | {
        value: string | Omit<Page, 'layout'>
        relationTo: string
      },
): string | undefined => {
  if (page == null) return undefined
  if (typeof page === 'string') return page

  if ('relationTo' in page) {
    switch (page.relationTo) {
      default:
        return pageToUrl(page.value)
    }
  }

  return page.slug === 'home' ? '/' : `/${page.slug}`
}

export const resolveRelation = <T extends Config['collections'][keyof Config['collections']]>(
  object:
    | undefined
    | string
    | T
    | {
        value: string | T
        relationTo: keyof Config['collections']
      },
): T | undefined => {
  if (typeof object === 'string' || object == null) return undefined

  if ('relationTo' in object) {
    return resolveRelation(object.value)
  }

  return object
}

export const getImage = (image?: string | Image) =>
  image == null ? undefined : typeof image === 'string' ? image : image.url

export const getImageAlt = (image?: string | Image) =>
  image == null || typeof image === 'string' ? undefined : image.alt

export const renderBlock = (block: AnyBlock, key?: string | number) => {
  const BlockComponent = blocks[block.blockType]

  return BlockComponent ? createElement(BlockComponent, { key, ...block }) : null
}

export const renderBlocks = (layout?: AnyBlock[] | null) => {
  return (layout ?? []).map((block, i) => renderBlock(block, i))
}
