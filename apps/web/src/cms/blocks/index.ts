import { Config } from 'cms-types'

import { MainSlider } from './MainSlider'

export type AnyBlock = NonNullable<Config['globals']['allBlocks']['blocks']>[number]

export const blocks: Record<
  AnyBlock['blockType'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => JSX.Element | null | Promise<JSX.Element | null>
> = {
  MainSlider,
}
