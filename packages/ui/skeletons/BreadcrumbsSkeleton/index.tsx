'use client'

import Skeleton from 'react-loading-skeleton'

export function BreadcrumbsSkeleton() {
  return (
    <div className='width-limit'>
      <div className='w-3/5'>
        <Skeleton height={24} className='w-full' />
      </div>
    </div>
  )
}
