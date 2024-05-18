import React, { FC, useEffect, useState, useMemo } from 'react'
import { useField } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Relationship'
import { SelectComponent } from 'payload/components/fields/Select'
import { Category, Subcategory } from 'cms-types'

type Pagination = {
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: null | number
  page: number
  pagingCounter: number
  prevPage: null | number
  totalDocs: number
  totalPages: number
}

export const SubcategorySelect: FC<Props> = ({ path = '', name, hasMany, label }) => {
  const { value: categoriesIds } = useField<string[]>({ path: 'categories' })

  const [categories, setCategories] = useState<Category[]>([])
  const [finishLoading, setFinishLoading] = useState(true)

  const options = useMemo(() => {
    if (!categories?.length) {
      return []
    }

    return categories.flatMap(({ subcategories }) =>
      subcategories.map(({ id, label }: Subcategory) => ({
        label,
        value: id,
      })),
    )
  }, [categories])

  useEffect(() => {
    if (!categoriesIds?.length) {
      return
    }

    const fetchCategories = async (page?: number) => {
      const currentPage = page || 1

      const { docs, nextPage, hasNextPage } = (await (
        await fetch(
          `/api/categories?[where][id][in]=${categoriesIds.join(',')}&page=${currentPage}`,
        )
      ).json()) as { docs: Category[] } & Pagination

      setCategories(prev => Array.from(new Set([...prev, ...docs])))

      if (hasNextPage) {
        fetchCategories(nextPage)
      }
    }

    try {
      setFinishLoading(false)
      setCategories([])
      fetchCategories()
    } finally {
      setFinishLoading(true)
    }
  }, [categoriesIds])

  return (
    <>
      {finishLoading && categoriesIds?.length > 0 && categories?.length > 0 && (
        <SelectComponent
          name={name}
          label={label}
          path={path}
          hasMany={hasMany}
          options={options}
          required
        />
      )}
    </>
  )
}
