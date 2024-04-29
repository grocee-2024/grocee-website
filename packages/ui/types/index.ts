import { BannerBlock } from 'cms-types'
import { mapCMSCards } from './../../../apps/web/src/helpers/mapCMSCards'
import { mapCMSNewsCards } from './../../../apps/web/src/helpers/mapCMSNewsCards'
import { mapCMSProductsForProductCard } from './../../../apps/web/src/helpers/mapCMSProducts'

export type AtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type MappedProductForProductCard = Awaited<
  ReturnType<typeof mapCMSProductsForProductCard>
>[number]

export type MappedNewsArticleCard = Awaited<ReturnType<typeof mapCMSNewsCards>>[number]

export type MappedCard = Awaited<ReturnType<typeof mapCMSCards>>[number]

export type MappedLink = Omit<
  NonNullable<NonNullable<BannerBlock['heading']['links'][number]>['linkOrButton']>,
  'reference' | 'url' | 'linkType'
> & {
  id: string
  linkHref: string
}
