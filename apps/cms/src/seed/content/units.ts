import payload from 'payload'

export const createUnits = async () => {
  const [piece, kg, g] = await Promise.all([
    payload.create({
      collection: 'units',
      data: {
        label: 'piece',
        text: 'pc.',
      },
    }),
    payload.create({
      collection: 'units',
      data: {
        label: 'kg',
        text: 'kg',
      },
    }),
    payload.create({
      collection: 'units',
      data: {
        label: 'g',
        text: 'g',
      },
    }),
  ])

  payload.logger.info('> Created units')

  return {
    pieceId: piece.id,
    kgId: kg.id,
    gId: g.id,
  }
}

export type Units = Awaited<ReturnType<typeof createUnits>>
