'use client'

import { AccordionList, Card, Input } from 'ui'
import { createElement } from 'react'

export default function Home() {
  return (
    <>
      <AccordionList
        panels={[
          {
            title: 'How can I place an order?',
            content: [
              <>
                Placing an order with Grocee is easy! Simply browse our website or app, select the
                items you want, add them to your cart, and proceed to checkout.
              </>,
            ],
          },
          {
            title: 'What payment methods do you accept?',
            content: [
              <>
                djfhdsfhsdfhPlacing an order with Grocee is easy! Simply browse our website or app,
                select the items you want, add them to your cart, and proceed to checkout.ds
              </>,
            ],
          },
          {
            title: 'Can I schedule a delivery time?',
            content: [
              <>
                Placing an order with Grocee is easy! Simply browse our website or app, select the
                items you want, add them to your cart, and proceed to checkout.
              </>,
            ],
          },
        ]}
        className='m-5 w-[604px]'
      />
    </>
  )
}
