import type { FieldHook } from 'payload/types'

import type { Order } from 'cms-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value) {
    return req.user.id
  }

  return value
}
