import { getPage } from '@/cms'
import { renderBlocks } from '@/cms/helpers'
import { NextRoute } from '@/types'
import { cookies } from 'next/headers'

export default async function HomePage({ searchParams }: NextRoute) {
  const locale = cookies().get('locale')?.value || 'en'

  const page = await getPage('pages', 'home', { searchParams: { ...searchParams, locale } })

  return <div className='mb-20 flex flex-col gap-20'>{renderBlocks(page?.layout)}</div>
}
