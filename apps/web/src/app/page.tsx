import { getPage } from '@/cms'
import { renderBlocks } from '@/cms/helpers'
import { NextRoute } from '@/types'
import { cookies } from 'next/headers'
import { SetupEdgeBlocksOnPageStore } from '../components/SetupEdgeBlocksOnPageStore'
import { SearchPage } from '@/components/SearchPage'
import { parseSearchParams } from 'ui/helpers'

export default async function HomePage({ searchParams }: NextRoute) {
  const locale = cookies().get('locale')?.value || 'en'

  if ('search' in searchParams) {
    const query = parseSearchParams(searchParams, 'search')

    return <SearchPage query={query} />
  }

  const page = await getPage('pages', 'home', { searchParams: { ...searchParams, locale } })

  return (
    <>
      <SetupEdgeBlocksOnPageStore layout={page.layout} />
      <div className='flex flex-col gap-16 laptop:gap-20'>{renderBlocks(page.layout)}</div>
    </>
  )
}
