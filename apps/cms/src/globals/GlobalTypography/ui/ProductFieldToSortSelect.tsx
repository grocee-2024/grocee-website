import React, { FC, useEffect, useState } from 'react'
import { Props } from 'payload/components/fields/Text'
import { useField, SelectInput } from 'payload/components/forms'
import { Product } from 'cms-types'

export const ProductFieldToSortSelect: FC<Props> = ({ name, path = '', label }) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  useEffect(() => {
    const fetchProductFields = async () => {
      const data = await (await fetch('/api/products?limit=1')).json()

      const [product] = data.docs as Product[]

      const { category, skipSync, subcategories, productDetails, ...restProduct } = product
      const { image, stripeProductID, unit, weightStep, weight, priceJSON, ...restProductDetails } =
        productDetails

      const productOptions = Object.keys(restProduct).map(option => ({
        label: option[0].toUpperCase() + option.slice(1),
        value: option,
      }))

      const productDetailsOptions = Object.keys(restProductDetails).map(option => ({
        label: option[0].toUpperCase() + option.slice(1),
        value: `productDetails.${option}`,
      }))

      setOptions([...productOptions, ...productDetailsOptions])
    }

    fetchProductFields()
  }, [])

  return (
    <SelectInput
      onChange={data => {
        setValue(data?.value)
      }}
      value={value}
      name={name}
      path={path}
      label={label}
      options={options}
    />
  )
}
