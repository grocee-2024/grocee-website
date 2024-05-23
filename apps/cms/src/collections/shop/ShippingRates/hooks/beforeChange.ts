import type { BeforeChangeHook } from 'payload/dist/collections/config/types'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey || '', { apiVersion: '2022-08-01' })

const logs = false

export const beforeChangeHook: BeforeChangeHook = async ({ req, data }) => {
  const { payload } = req

  const newDoc: Record<string, unknown> = {
    ...data,
    skipSync: false, // Set back to 'false' so that all changes continue to sync to Stripe
  }

  if (data?.skipSync) {
    if (logs) payload.logger.info(`skipping shipping rate 'beforeChange' hook`)
    return newDoc
  }

  if (!data?.shippingRateID) {
    if (logs)
      payload.logger.info(
        `No Stripe shipping rate assigned to this document, skipping shipping rate 'beforeChange' hook`,
      )
    return newDoc
  }

  if (logs) payload.logger.info(`Looking up shipping rate from Stripe...`)

  try {
    const shippingRate = await stripe.shippingRates.retrieve(newDoc?.shippingRateID as string)

    if (!shippingRate) {
      return newDoc
    }

    const { amount, currency } = shippingRate.fixed_amount

    const { docs: currentCurrency } = await payload.find({
      collection: 'currencies',
      where: { label: { equals: currency } },
      limit: 1,
    })

    if (currentCurrency) {
      newDoc.currency = currentCurrency[0].id
    }

    newDoc.amount = amount / 100
    newDoc.title = shippingRate.display_name
    newDoc.shippingRateJSON = shippingRate
    newDoc.deactivated = !shippingRate.active
  } catch (error: unknown) {
    payload.logger.error(`Error fetching shipping rate from Stripe: ${error}`)
  }

  return newDoc
}
