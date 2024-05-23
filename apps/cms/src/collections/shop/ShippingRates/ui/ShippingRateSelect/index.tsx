import * as React from 'react'
import { Select, useField } from 'payload/components/forms'
import CopyToClipboard from 'payload/dist/admin/components/elements/CopyToClipboard'
import { Props } from 'payload/components/fields/Text'

import './ShippingRateSelect.css'

export const ShippingRateSelect: React.FC<Props> = props => {
  const { path = '', label } = props
  const [options, setOptions] = React.useState<
    {
      label: string
      value: string
    }[]
  >([])

  const { value: shippingRateID } = useField({ path })

  React.useEffect(() => {
    const getStripeShippingRates = async () => {
      const productsFetch = await fetch('/api/stripe/shipping-rates', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await productsFetch.json()

      if (res?.data) {
        const fetchedShippingRates = res.data.reduce(
          (acc, item) => {
            if (item?.active) {
              acc.push({
                label: item.display_name || item.id,
                value: item.id,
              })
            }

            return acc
          },
          [
            {
              label: 'Select a shipping rate',
              value: '',
            },
          ],
        )

        setOptions(fetchedShippingRates)
      }
    }

    getStripeShippingRates()
  }, [])

  const href = `https://dashboard.stripe.com/${
    process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
  }shipping-rates`

  return (
    <div>
      <p style={{ marginBottom: '0' }}>{typeof label === 'string' ? label : 'Product'}</p>
      <p
        style={{
          marginBottom: '0.75rem',
          color: 'var(--theme-elevation-400)',
        }}
      >
        {`Select the related Stripe shipping rate or `}
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: 'var(--theme-text' }}
        >
          create a new one
        </a>
        {'.'}
      </p>
      <Select {...props} label='' options={options} required />
      {Boolean(shippingRateID) && (
        <div
          style={{
            marginTop: '-1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <span
              className='label'
              style={{
                marginTop: 20,
                color: '#9A9A9A',
              }}
            >
              {`Manage "${
                options.find(option => option.value === shippingRateID)?.label || 'Unknown'
              }" in Stripe`}
            </span>
            <CopyToClipboard value={`${href}/${shippingRateID}`} />
          </div>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '600',
            }}
          >
            <a href={`${href}/${shippingRateID}`} target='_blank' rel='noreferrer noopener'>
              {`${href}/${shippingRateID}`}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
