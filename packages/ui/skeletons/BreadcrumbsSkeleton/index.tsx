'use client'

import Skeleton from 'react-loading-skeleton'

export function BreadcrumbsSkeleton() {
  return (
    <div className='width-limit'>
      <Skeleton height={24} width={350} />
    </div>
  )
}
