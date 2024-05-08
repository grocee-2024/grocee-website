'use client'

import { useEffect, useMemo, useState } from 'react'
import { searchInCollection } from '@/cms'
import { mapCMSProductsForProductCard } from '@/helpers'
import { useCookies } from 'next-client-cookies'
import { useQuery } from '@tanstack/react-query'
import { useEdgeBlocksOnPage, useGlobalTypography, usePrevPath } from '@/store'
import { Pagination, ProductCard as ProductCardUI } from 'ui'
import { useSearchParams } from 'next/navigation'
import { useWindowSize } from 'ui/hooks'
import { SearchPageSkeleton } from './SearchPageSkeleton'
import { mapIcon } from '@oleksii-lavka/grocee-icons'
import { FocusRing } from 'react-aria'
import Link from 'next/link'

type Props = {
  query: string
}

export function SearchPage({ query }: Props) {
  const cookies = useCookies()
  const locale = cookies.get('locale') || 'en'

  const [totalPages, setTotalPages] = useState(0)
  const [startPageChange, setStartPageChange] = useState(false)
  const { updateBlock } = useEdgeBlocksOnPage()
  const searchParams = useSearchParams()
  const { windowSize } = useWindowSize()
  const { searchPage, backButton } = useGlobalTypography()
  const { prevPath } = usePrevPath()

  const page = +(searchParams.get('page') || 1)

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
    isLoading,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ['products', query, page],
    queryFn: async () => {
      const data = await searchInCollection(
        'products',
        {
          key: 'name',
          sort: 'name',
          query,
          limit: 12,
          page,
        },
        { searchParams: { locale } },
      ).then(async ({ docs = [], totalPages }) => {
        const productsForProductCard = await mapCMSProductsForProductCard(docs, locale)

        setTotalPages(totalPages)

        return productsForProductCard
      })

      return data
    },
  })

  const { searchResultTitle, productsCountTitle, emptySearchResultTitle, errorSearchResultTitle } =
    useMemo(() => {
      const searchResultTitle = searchPage.searchResultTitle.replace('{{query}}', query)
      const emptySearchResultTitle = searchPage.emptySearchResultTitle.replace('{{query}}', query)
      const errorSearchResultTitle = searchPage.errorSearchResultTitle
      const productsCountTitle = searchPage.productsCountTitle.replace(
        '{{count}}',
        `${(products ?? []).length}`,
      )

      return {
        searchResultTitle,
        productsCountTitle,
        emptySearchResultTitle,
        errorSearchResultTitle,
      }
    }, [searchPage, query, products])

  const mappedBackButton = useMemo(() => {
    if (!backButton.icon.icon) {
      return null
    }

    const Icon = mapIcon(backButton.icon.icon)

    if (!Icon) {
      return null
    }

    return (
      <FocusRing focusRingClass='ring ring-offset-2'>
        <Link
          href={prevPath ?? '/'}
          className='gilroy-md tablet:gilroy-xl my-4 inline-flex items-center gap-2 border-none bg-transparent font-light text-gray-900 no-underline outline-none'
        >
          <Icon width={backButton.icon.size.width} height={backButton.icon.size.height} />
          <span>{backButton.label}</span>
        </Link>
      </FocusRing>
    )
  }, [backButton])

  useEffect(() => {
    updateBlock({ firstBlockOnPage: null, lastBlockOnPage: null })
  }, [])

  useEffect(() => {
    setStartPageChange(false)
  }, [page])

  if (isError) {
    return (
      <div className='width-limit mt-[120px] tablet:mt-[185px]'>
        <h1 className='helvetica-xs tablet:helvetica-md font-light text-error-600'>
          {errorSearchResultTitle || error.message}
        </h1>
        {mappedBackButton && mappedBackButton}
      </div>
    )
  }

  return (
    <div className='width-limit mt-[120px] tablet:mt-[185px]'>
      {isLoading || isPending || isFetching || startPageChange ? (
        <div className='mt-6 tablet:mt-8'>
          <SearchPageSkeleton />
        </div>
      ) : (
        <>
          <h1 className='helvetica-xs tablet:helvetica-md font-light text-gray-900'>
            {!products?.length
              ? `${emptySearchResultTitle}`
              : `${searchResultTitle} (${productsCountTitle})`}
          </h1>
          {mappedBackButton && mappedBackButton}
          <div className='grid-layout mt-6 tablet:mt-8'>
            {products?.map(({ id, name, pageUrl, previewImage, ...restProduct }) => (
              <ProductCardUI
                className='col-span-2 !p-2 laptop:col-span-4 laptop:!p-4 desktop:col-span-3'
                key={id}
                link={pageUrl}
                title={name}
                image={previewImage}
                tag='Tag'
                disableAddToCartButtonLabel={disableAddToCartButtonLabel}
                {...restProduct}
              />
            ))}
          </div>
        </>
      )}
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </div>
  )
}
