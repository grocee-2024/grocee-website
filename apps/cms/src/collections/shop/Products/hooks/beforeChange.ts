import type { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Stripe } from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey || '', { apiVersion: '2022-08-01' })

const logs = false

export const beforeProductChange: BeforeChangeHook = async ({ req, data }) => {
  const { payload } = req

  const newDoc: Record<string, unknown> = {
    ...data,
    skipSync: false, // Set back to 'false' so that all changes continue to sync to Stripe
  }

  if (data?.skipSync) {
    if (logs) payload.logger.info(`Skipping product 'beforeChange' hook`)
    return newDoc
  }

  if (!data?.productDetails?.stripeProductID) {
    if (logs)
      payload.logger.info(
        `No Stripe product assigned to this document, skipping product 'beforeChange' hook`,
      )
    return newDoc
  }

  if (logs) payload.logger.info(`Looking up product from Stripe...`)

  let stripeProduct: Stripe.Response<Stripe.Product> | null = null

  try {
    stripeProduct = await stripe.products.retrieve(data.productDetails?.stripeProductID)
    if (logs) payload.logger.info(`Found product from Stripe: ${stripeProduct.name}`)

    const weight = stripeProduct.metadata?.weight
    const weightStep = stripeProduct.metadata?.weightStep
    const stripeCountry = stripeProduct.metadata?.country

    const stripeUnitLabel = (stripeProduct.unit_label ?? '').replace(/[0-9\s.]/g, '')

    const [targetUnit] = (
      await payload.find({ collection: 'units', where: { label: { equals: stripeUnitLabel } } })
    ).docs
    const targetCountry = (
      await payload.find({ collection: 'countries', pagination: false })
    ).docs.find(({ label, slug }) =>
      [label.toLowerCase(), slug.toLowerCase()].includes(stripeCountry.toLowerCase()),
    )

    if (weight) {
      // @ts-ignore
      newDoc.productDetails.weight = weight
    }

    if (weightStep) {
      // @ts-ignore
      newDoc.productDetails.weightStep = weightStep
    }

    if (targetUnit && newDoc) {
      // @ts-ignore
      newDoc.productDetails.unit = targetUnit.id
    }

    if (targetCountry && newDoc) {
      // @ts-ignore
      newDoc.productDetails.country = targetCountry.id
    }
  } catch (error: unknown) {
    payload.logger.error(`Error fetching product from Stripe: ${error}`)
    return newDoc
  }

  if (logs) payload.logger.info(`Looking up price from Stripe...`)

  try {
    const allPrices = await stripe.prices.list({
      product: data.productDetails.stripeProductID,
      limit: 100,
    })

    const weightStep = stripeProduct?.metadata?.weightStep

    const filteredAllPrices = allPrices.data.filter(({ active }) => active)
    // @ts-ignore
    newDoc.productDetails.priceJSON = { ...allPrices, data: filteredAllPrices }

    const priceAmount = allPrices.data[0].unit_amount / 100
    // @ts-ignore
    newDoc.productDetails.price = (
      weightStep ? (100 / +weightStep) * priceAmount : priceAmount
    ).toFixed(2)
  } catch (error: unknown) {
    payload.logger.error(`Error fetching prices from Stripe: ${error}`)
  }

  return newDoc
}
