import { getPage } from '@/cms'
import { renderBlocks } from '@/cms/helpers'
import { NextRoute } from '@/types'
import { cookies } from 'next/headers'
import { SetupEdgeBlocksOnPage } from '../components/SetupEdgeBlocksOnPage'
import { SearchPage } from '@/components/SearchPage'
import { parseSearchParams } from 'ui/helpers'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

export default async function HomePage({ searchParams }: NextRoute) {
  const locale = cookies().get('locale')?.value || 'en'

  try {
    if ('search' in searchParams) {
      const query = parseSearchParams(searchParams, 'search')

      return (
        <Suspense fallback={null}>
          <SearchPage query={query} />
        </Suspense>
      )
    }

    const page = await getPage('pages', 'home', { searchParams: { locale }, throwOnNotFound: true })

    return (
      <>
        <SetupEdgeBlocksOnPage layout={page.layout} />
        <div className='flex flex-col gap-16 laptop:gap-20'>{renderBlocks(page.layout)}</div>
      </>
    )
  } catch (err: unknown) {
    notFound()
  }
}
