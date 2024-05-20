'use client'

import { FC, useRef, useMemo } from 'react'
import { getFilteredProducts } from '@/cms'
import { useGlobalTypography } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import { useSearchParams } from 'next/navigation'
import { Button, Pagination, ProductCard } from 'ui'
import { mapCMSProductsForProductCard } from '@/helpers'
import { ProductCardSkeleton } from 'ui/skeletons'
import { useWindowSize } from 'ui/hooks'

type Props = {
  categoryId: string
}

export const ProductList: FC<Props> = ({ categoryId }) => {
  const searchParams = useSearchParams()
  const { categoryPage } = useGlobalTypography()
  const { windowSize } = useWindowSize()

  const locale = useCookies().get('locale') || 'en'

  const subcategory = searchParams.get('subcat') || null
  const tags = searchParams.get('tags') || null
  const trademarks = searchParams.get('trademarks') || null
  const countries = searchParams.get('countries') || null
  const specials = searchParams.get('specials') || null

  const minPrice = searchParams.get('minPrice') || null
  const maxPrice = searchParams.get('maxPrice') || null

  const sort = searchParams.get('sort') || null
  const order = searchParams.get('order') || 'asc'

  const page = searchParams.get('page') || '1'

  const totalPagesCount = useRef(0)
  const totalProductsCount = useRef(0)

  const disableAddToCartButtonLabel = useMemo(() => {
    const { width } = windowSize

    return !(
      (width >= 320 && width < 420) ||
      (width >= 600 && width < 768) ||
      (width >= 900 && width < 1280) ||
      width >= 1440
    )
  }, [windowSize.width])

  const {
    data: products,
    isError,
    error,
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const filterParams = {
        categoryId,
        subcategorySlug: subcategory,
        tags,
        specials,
        countries,
        trademarks,
        minPrice,
        maxPrice,
      } as Record<string, string | string[]>

      const sortParams = {
        sort,
        order,
      } as Record<string, string | string[]>

      const { docs, totalPages, totalDocs } = await getFilteredProducts({
        filterParams,
        sortParams,
        locale,
        page,
      })
      const products = await mapCMSProductsForProductCard(docs, locale)

      totalPagesCount.current = totalPages
      totalProductsCount.current = totalDocs

      return products
    },
    queryKey: ['filteredProducts', categoryId, searchParams.toString()],
  })

  if (isError) {
    return (
      <div className='flex flex-col gap-4'>
        <h1 className='helvetica font-light text-error-600'>
          {categoryPage.errorMessage || error.message}
        </h1>
        <Button href='/' className='!max-w-fit' standartButton variant='secondary'>
          {categoryPage.backToHomePageLabel}
        </Button>
      </div>
    )
  }

  if (isPending || isFetching || isLoading) {
    return (
      <div className='grid-layout'>
        {Array.from({ length: 12 }, (_, idx) => (
          <div key={idx} className='col-span-2 laptop:col-span-4 desktop:col-span-3'>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className='grid-layout'>
        {products.map((product, idx) => (
          <ProductCard
            key={`${product.id}-${idx}`}
            product={product}
            disableAddToCartButtonLabel={disableAddToCartButtonLabel}
            className='col-span-2 !p-2 laptop:col-span-4 laptop:!p-4 desktop:col-span-3'
          />
        ))}
      </div>
      {(totalPagesCount.current ?? 0) > 1 && (
        <Pagination
          className='mt-4 laptop:mt-8'
          page={+page}
          totalPages={totalPagesCount.current ?? 0}
        />
      )}
    </>
  )
}
