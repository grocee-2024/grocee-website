import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'
import { Stripe } from 'stripe'
import { checkRole } from '../access/checkRole'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
})

const logs = process.env.LOGS_STRIPE_PROXY === '1'

export const shippingRatesProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  if (!req.user || !checkRole(['admin'], req.user)) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access shipping rates` })
    res.status(401).json({ error: 'You are not authorized to access shipping rates' })
    return
  }

  try {
    const shippingRates = await stripe.shippingRates.list({
      limit: 100,
    })

    res.status(200).json(shippingRates)
  } catch (error: unknown) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` })
    res.status(500).json({ error: `Error using Stripe API: ${error}` })
  }
}
