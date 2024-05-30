import React, { FC, useEffect, useState, useMemo } from 'react'
import { useField } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Relationship'
import { SelectComponent } from 'payload/components/fields/Select'
import { Category, Subcategory } from 'cms-types'

export const SubcategorySelect: FC<Props> = ({ path = '', name, hasMany, required, label }) => {
  const { value: categoryId } = useField<string>({ path: 'category' })
  const { setValue: setSubcategoriesId } = useField<string[]>({ path })

  const [category, setCategory] = useState<Category | null>(null)
  const [finishLoading, setFinishLoading] = useState(true)

  const options = useMemo(() => {
    if (!category) {
      return null
    }

    return category.subcategories.map(({ id, label }: Subcategory) => ({
      label,
      value: id,
    }))
  }, [category])

  useEffect(() => {
    if (!categoryId) {
      return
    }

    const fetchCategory = async () => {
      const { docs } = (await (
        await fetch(`/api/categories?[where][id][equals]=${categoryId}`)
      ).json()) as { docs: Category[] }

      setCategory(docs?.[0] || null)
    }

    try {
      setFinishLoading(false)
      setCategory(null)
      fetchCategory()
    } finally {
      setFinishLoading(true)
    }
  }, [categoryId])

  useEffect(() => {
    if (category) {
      setSubcategoriesId([])
    }
  }, [categoryId])

  return (
    <>
      {finishLoading && categoryId && category && (
        <SelectComponent
          name={name}
          label={label}
          path={path}
          hasMany={hasMany}
          options={options}
          required={required}
        />
      )}
    </>
  )
}
